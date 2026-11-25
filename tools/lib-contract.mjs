// Đọc schema Prisma và route NestJS của một thư mục apps/api thành dữ liệu so sánh được.
import fs from 'node:fs';
import path from 'node:path';

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'generated') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Trả { enums: {Tên: [giá trị]}, models: {Tên: {trường: {type, optional, list, relation}}} }
export function parseSchema(apiDir) {
  const file = path.join(apiDir, 'prisma', 'schema.prisma');
  const text = fs.readFileSync(file, 'utf8');
  const enums = {};
  for (const m of text.matchAll(/^enum\s+(\w+)\s*\{([\s\S]*?)^\}/gm)) {
    enums[m[1]] = m[2].split('\n').map((l) => l.replace(/\/\/.*/, '').trim()).filter(Boolean);
  }
  const names = [...text.matchAll(/^model\s+(\w+)\s*\{/gm)].map((m) => m[1]);
  const models = {};
  for (const m of text.matchAll(/^model\s+(\w+)\s*\{([\s\S]*?)^\}/gm)) {
    const fields = {};
    for (const raw of m[2].split('\n')) {
      const line = raw.replace(/\/\/.*/, '').trim();
      if (!line || line.startsWith('@@')) continue;
      const f = line.match(/^(\w+)\s+(\w+)(\[\])?(\?)?/);
      if (!f) continue;
      fields[f[1]] = { type: f[2], list: !!f[3], optional: !!f[4], relation: names.includes(f[2]) };
    }
    models[m[1]] = fields;
  }
  return { enums, models };
}

// Trả danh sách "METHOD /đường/dẫn" của mọi controller trong src
export function parseRoutes(apiDir) {
  const routes = new Set();
  for (const file of walk(path.join(apiDir, 'src')).filter((f) => f.endsWith('.controller.ts'))) {
    const text = fs.readFileSync(file, 'utf8');
    const prefix = text.match(/@Controller\(\s*(?:['"`]([^'"`]*)['"`])?\s*\)/)?.[1] ?? '';
    for (const m of text.matchAll(/@(Get|Post|Put|Patch|Delete)\(\s*(?:['"`]([^'"`]*)['"`])?\s*\)/g)) {
      const full = ('/' + [prefix, m[2] ?? ''].filter(Boolean).join('/')).replace(/\/+/g, '/').replace(/\/$/, '') || '/';
      routes.add(`${m[1].toUpperCase()} ${full}`);
    }
  }
  return [...routes].sort();
}

// So actual với contract. Trả danh sách { level: 'lỗi' | 'ghi chú', msg }
export function compare(contract, actual) {
  const out = [];
  const err = (msg) => out.push({ level: 'lỗi', msg });
  const note = (msg) => out.push({ level: 'ghi chú', msg });
  for (const [en, vals] of Object.entries(contract.enums)) {
    const a = actual.enums[en];
    if (!a) { err(`Thiếu enum \`${en}\``); continue; }
    const miss = vals.filter((v) => !a.includes(v));
    if (miss.length) err(`Enum \`${en}\` thiếu giá trị: ${miss.join(', ')}`);
  }
  for (const [mn, fields] of Object.entries(contract.models)) {
    const a = actual.models[mn];
    if (!a) { err(`Thiếu model \`${mn}\``); continue; }
    for (const [fn, spec] of Object.entries(fields)) {
      const af = a[fn];
      if (!af) { err(`\`${mn}.${fn}\` (${spec.type}${spec.optional ? '?' : ''}) có trong hợp đồng nhưng chưa có trong schema`); continue; }
      if (af.type !== spec.type || af.list !== spec.list) err(`\`${mn}.${fn}\` kiểu \`${af.type}${af.list ? '[]' : ''}\`, hợp đồng yêu cầu \`${spec.type}${spec.list ? '[]' : ''}\``);
      else if (af.optional !== spec.optional) err(`\`${mn}.${fn}\` ${af.optional ? 'cho phép rỗng' : 'bắt buộc'}, hợp đồng yêu cầu ${spec.optional ? 'cho phép rỗng' : 'bắt buộc'}`);
    }
    for (const fn of Object.keys(a)) if (!(fn in fields)) note(`\`${mn}.${fn}\` có trong schema nhưng không có trong hợp đồng`);
  }
  for (const mn of Object.keys(actual.models)) if (!(mn in contract.models)) note(`Model \`${mn}\` không có trong hợp đồng`);
  for (const r of contract.routes) if (!actual.routes.includes(r)) err(`Thiếu route \`${r}\``);
  for (const r of actual.routes) if (!contract.routes.includes(r)) note(`Route \`${r}\` không có trong hợp đồng`);
  return out;
}
