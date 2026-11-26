#!/usr/bin/env node
// So apps/api với API-CONTRACT.md.
// Dùng: node tools/contract-check.mjs [apps/api] [--contract docs/API-CONTRACT.md]
// Thoát mã 1 nếu có "lỗi"; "ghi chú" chỉ để xem.
import fs from 'node:fs';
import path from 'node:path';
import { parseSchema, parseRoutes, compare } from './lib-contract.mjs';

const args = process.argv.slice(2);
const ci = args.indexOf('--contract');
const contractFile = path.resolve(ci >= 0 ? args[ci + 1] : 'docs/API-CONTRACT.md');
const apiDir = path.resolve(args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? 'apps/api');
const md = fs.readFileSync(contractFile, 'utf8');
const block = md.match(/```json contract-data\r?\n([\s\S]*?)\r?\n```/);
if (!block) {
  console.error('Không thấy khối contract-data trong hợp đồng');
  process.exit(2);
}
const contract = JSON.parse(block[1]);
// --models A,B và --routes /x,/y: chỉ kiểm phần thuộc phase đang làm (phase sau chưa có code nên sẽ báo thiếu)
const list = (k) => (args.includes(k) ? args[args.indexOf(k) + 1].split(',') : null);
const onlyModels = list('--models');
const onlyRoutes = list('--routes');
const actual = { ...parseSchema(apiDir), routes: parseRoutes(apiDir) };
const pick = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => keys.includes(k)));
const inScope = (r) => onlyRoutes.some((p) => r.split(' ')[1] === p || r.split(' ')[1].startsWith(p + '/'));
if (onlyModels) {
  contract.models = pick(contract.models, onlyModels);
  actual.models = pick(actual.models, onlyModels);
}
if (onlyRoutes) {
  contract.routes = contract.routes.filter(inScope);
  actual.routes = actual.routes.filter(inScope);
}
const res = compare(contract, actual);
const errs = res.filter((r) => r.level === 'lỗi');
console.log(`# Kết quả đối chiếu hợp đồng\n\n${errs.length} lỗi, ${res.length - errs.length} ghi chú\n`);
for (const r of res) console.log(`- [${r.level}] ${r.msg}`);
process.exit(errs.length ? 1 : 0);
