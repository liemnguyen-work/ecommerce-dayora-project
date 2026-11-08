// Báo cáo tiến độ repo chung từ GitHub: task bài tập/đồ án đã đóng, PR đã merge, số commit của từng người.
// Chạy: npm run roadmap:report -- --repo owner/repo  (ghi docs/PROGRESS.md; thêm --out <file> để ghi chỗ khác)
// Issue đóng = task xong (PR ghi "Closes #n" rồi merge). File sinh tự động, đừng sửa tay.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { ORDER, members, xlTasks, gh, ghJson, option } from './roadmap-lib.mjs';

const repo = option('repo');
if (!repo) { console.error('Thiếu --repo owner/repo'); process.exit(1); }
const out = option('out') ?? 'docs/PROGRESS.md';
const roadmapLink = path.relative(path.dirname(path.resolve(out)), path.resolve('docs/ROADMAP.md')).split(path.sep).join('/');

const people = members();
const tasks = xlTasks();
const issues = new Map(ghJson('issue', 'list', '--repo', repo, '--label', 'roadmap', '--state', 'all', '--limit', '500', '--json', 'title,state,closedAt,number')
  .map(i => [i.title.split(' ')[0], i]));
const prs = ghJson('pr', 'list', '--repo', repo, '--state', 'merged', '--limit', '1000', '--json', 'author,mergedAt');
// Số commit lấy theo GitHub login (git log local chỉ có tên/email, không khớp chắc chắn với login).
const commits = login => login ? gh('api', '--paginate', `repos/${repo}/commits?author=${login}&per_page=100`, '--jq', '.[].sha').split('\n').filter(Boolean).length : 0;

const done = t => issues.get(t.id)?.state === 'CLOSED';
const ratio = list => `${list.filter(done).length}/${list.length}`;
const phases = [...new Set(tasks.map(t => t.phase))];
const rows = ORDER.filter(r => people[r]).map(role => {
  const p = people[role];
  const mine = tasks.filter(t => t.role === role);
  const last = mine.map(t => issues.get(t.id)?.closedAt).filter(Boolean).sort().at(-1);
  return { role, p, mine, last, merged: prs.filter(pr => pr.author?.login === p.login).length, commits: commits(p.login) };
});
const ready = tasks.filter(t => !done(t) && t.deps.every(d => done(tasks.find(x => x.id === d))));
const line = t => `- ${t.id} (${t.role}) ${t.task.replace(/\s*\(\[hướng dẫn\]\([^)]+\)\)/, '')}${issues.get(t.id) ? ` · #${issues.get(t.id).number}` : ''}`;

const missing = tasks.filter(t => !issues.has(t.id)).length;
const lines = [
  '---', 'tags: [progress, generated]', '---',
  '# Tiến độ repo chung (sinh tự động)', '',
  `> Sinh bởi \`npm run roadmap:report\` từ \`${repo}\` lúc ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}. Đừng sửa tay. Bảng task: [ROADMAP](${roadmapLink}).`,
  ...(missing ? ['', `> [!WARNING] ${missing} task chưa có issue. Chạy \`npm run roadmap:issues -- --repo ${repo} --apply\`.`] : []),
  '', '## Tổng quan', '',
  `Bài tập: ${ratio(tasks.filter(t => t.kind === 'homework'))} · Đồ án: ${ratio(tasks.filter(t => t.kind === 'project'))}`, '',
  '| Vai | Thành viên | Bài tập xong | Đồ án xong | PR đã merge | Commit | Xong gần nhất |', '|---|---|---|---|---|---|---|',
  ...rows.map(r => `| ${r.role} | ${r.p.name} (\`${r.p.login}\`) | ${ratio(r.mine.filter(t => t.kind === 'homework'))} | ${ratio(r.mine.filter(t => t.kind === 'project'))} | ${r.merged} | ${r.commits} | ${r.last ? r.last.slice(0, 10) : '—'} |`),
  '', '## Theo phase (xong/tổng, gồm bài tập)', '',
  `| Vai | ${phases.map(n => `P${n}`).join(' | ')} |`, `|---|${phases.map(() => '---').join('|')}|`,
  ...rows.map(r => `| ${r.role} | ${phases.map(n => { const ts = r.mine.filter(t => t.phase === n); return ts.length ? ratio(ts) : '—'; }).join(' | ')} |`),
  '', '## Làm được ngay (mọi phụ thuộc đã xong)', '',
  '### Bài tập (ưu tiên)', '', ...(ready.filter(t => t.kind === 'homework').map(line).join('\n') || '- Không có').split('\n'),
  '', '### Đồ án', '', ...(ready.filter(t => t.kind === 'project').map(line).join('\n') || '- Không có').split('\n'),
  '',
];
writeFileSync(out, lines.join('\n'));
console.log('Đã ghi', out);
