// Đọc bảng task (docs/ROADMAP.md) và GitHub username (docs/ROLES.md) cho roadmap-issues.mjs, roadmap-report.mjs.
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

export const ORDER = ['PM', 'PD', 'FD1', 'FD2', 'BD1', 'BD2', 'QA', 'DO'];
export const ROADMAP = 'docs/ROADMAP.md';
const cells = line => line.split('|').slice(1, -1).map(c => c.trim());
const clean = s => s.replace(/`/g, '').trim();
const ID = /(PRJ|HW)-P\d-[A-Z0-9]+-\d+/g;

// { PM: { name: 'Liêm', login: 'liemnguyen-work', folder: 'PM-Liem' }, ... }
export function members() {
  const folders = readdirSync('docs/learning').filter(d => ORDER.includes(d.split('-')[0]));
  const out = {};
  for (const line of readFileSync('docs/ROLES.md', 'utf8').split(/\r?\n/)) {
    const [role, , name, login] = cells(line);
    if (!ORDER.includes(role)) continue;
    out[role] = { name, login: clean(login ?? ''), folder: folders.find(f => f.startsWith(`${role}-`)) };
  }
  return out;
}

// [{ id: 'HW-P0-DO-1', kind: 'homework' | 'project', phase: 0, phaseTitle: 'P0 Khởi động (28/10–03/11)', role: 'DO', task, test, deps }]
export function xlTasks() {
  const tasks = [];
  let phaseTitle = '';
  for (const line of readFileSync(ROADMAP, 'utf8').split(/\r?\n/)) {
    const heading = line.match(/^### (P\d .*)$/);
    if (heading) { phaseTitle = heading[1].trim(); continue; }
    if (!/^\| (PRJ|HW)-/.test(line)) continue;
    const [id, person, task, test, deps] = cells(line);
    const m = id.match(/^(PRJ|HW)-P(\d)-([A-Z0-9]+)-\d+$/);
    if (!m) throw new Error(`Mã task lạ: ${id}`);
    tasks.push({ id, kind: m[1] === 'HW' ? 'homework' : 'project', phase: Number(m[2]), phaseTitle, role: m[3], person, task, test, deps: deps.match(ID) ?? [] });
  }
  return tasks;
}

// Tên file lộ trình chứa chi tiết task PRJ: P0 nằm trong file tổng, phase khác trong file -P<số>.
export function lpPath(member, phase) {
  const base = `docs/learning/${member.folder}/LP-${member.folder}`;
  return phase === 0 ? `${base}.md` : `${base}-P${phase}.md`;
}

// Khối của task trong mục 6 file LP: các bước ("**Các bước:**"), file phải viết, reviewer.
export function taskGuide(member, task) {
  let text;
  try { text = readFileSync(lpPath(member, task.phase), 'utf8'); } catch { return { steps: [], files: [] }; }
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(l => l.startsWith(`### ${task.id} `));
  if (start === -1) return { steps: [], files: [] };
  const end = lines.findIndex((l, i) => i > start && /^##/.test(l));
  const block = lines.slice(start + 1, end === -1 ? undefined : end);
  const steps = block.filter(l => /^\s+- \[ \] \d+\. /.test(l)).map(l => l.replace(/^\s+- \[ \] \d+\. /, ''));
  // Đường dẫn trong dòng "File phải viết" (bỏ mục không phải đường dẫn như "GitHub Issues + Projects").
  const filesLine = block.find(l => l.includes('**File phải viết:**')) ?? '';
  const files = [...filesLine.matchAll(/`([^`]+)`/g)].flatMap(m => m[1].split(',')).map(f => f.trim()).filter(f => f && !f.includes(' '));
  const reviewer = block.join('\n').match(/\*\*Reviewer:\*\* ([^·\n]+)/)?.[1].trim();
  return { steps, files, reviewer };
}

export const gh = (...args) => execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
export const ghJson = (...args) => JSON.parse(gh(...args) || 'null');

export const flag = name => process.argv.includes(`--${name}`);
export function option(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}
