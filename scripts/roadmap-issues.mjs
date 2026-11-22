// Tạo GitHub Issue cho mọi task trong docs/ROADMAP.md (bài tập HW-* và đồ án PRJ-*), milestone theo phase.
// Mặc định chỉ in ra (dry run). Tạo thật: npm run roadmap:issues -- --repo owner/repo --apply
// Xem trước một issue: npm run roadmap:issues -- --show PRJ-P1-BD1-1
// Chạy lại an toàn: issue đã có (tiêu đề bắt đầu bằng mã task) thì bỏ qua. Thêm --no-assign để không gán người.
import { members, xlTasks, lpPath, taskGuide, gh, ghJson, flag, option, ROADMAP } from './roadmap-lib.mjs';

const repo = option('repo');
const apply = flag('apply');
if (apply && !repo) { console.error('Thiếu --repo owner/repo'); process.exit(1); }

const people = members();
const tasks = xlTasks();
const ids = new Set(tasks.map(t => t.id));
for (const t of tasks) {
  if (!people[t.role]) throw new Error(`${t.id}: không có vai ${t.role} trong ROLES.md`);
  for (const d of t.deps) if (!ids.has(d)) throw new Error(`${t.id}: phụ thuộc ${d} không có trong ${ROADMAP}`);
}

const title = t => `${t.id} — ${t.task.replace(/`/g, '').replace(/\s*\(\[hướng dẫn\]\([^)]+\)\)/, '')}`;
// "`kit-engine.spec.ts`, `kit-ai.spec.ts`" → ['kit-engine.spec.ts', 'kit-ai.spec.ts']
const specs = t => [...t.test.matchAll(/`([\w.-]+\.spec\.ts)`/g)].map(m => m[1]);
// Bài tập buổi n → docs/BUOI<n>-GUIDE.md
const guideOf = t => { const n = t.task.match(/Buổi (\d+)/)?.[1]; return n ? `docs/SESSION${n}-GUIDE.md` : 'docs/ASSIGNMENTS.md'; };
// Mỗi bước dạng "việc — Xong khi: kiểm tra" thành mục checklist, phần kiểm tra xuống dòng.
const item = (n, text) => { const [work, check] = text.split(' — Xong khi: '); return `- [ ] **${n}.** ${work}${check ? `\n  _Xong khi:_ ${check}` : ''}`; };

function body(t) {
  const member = people[t.role];
  const bt = t.kind === 'homework';
  const { steps, reviewer } = bt ? { steps: [] } : taskGuide(member, t);
  const spec = specs(t);
  const branch = `${bt ? 'hw' : 'prj'}/${t.id.split('-').slice(1).join('-').toLowerCase()}`;
  const guide = bt ? guideOf(t) : lpPath(member, t.phase);
  const all = [
    `Tạo nhánh: \`git checkout main && git pull && git checkout -b ${branch}\` — Xong khi: \`git branch --show-current\` in \`${branch}\``,
    ...(spec.length ? [`Viết test trước: ${spec.map(s => `\`${s}\``).join(', ')} (cạnh file code), commit riêng \`test: thêm test cho ${t.id}\`, nhờ QA duyệt ca test — Xong khi: QA duyệt, \`npm test -w api\` đỏ ở đúng các ca mới`] : []),
    ...(bt ? [`Làm phần của bạn theo \`${guide}\` (bảng phân công, thứ tự làm, prompt từng bước) — Xong khi: đạt checklist của bước đó trong hướng dẫn`]
      : steps.length ? steps : [`Làm theo mục 6 và bước 5 trong \`${guide}\` — Xong khi: đạt tiêu chí trong file đó`]),
    bt ? `Kiểm tra: \`python tools/check-session2.py session2\`${t.test !== '—' ? ` (${t.test.replace(/`/g, '')})` : ''} — Xong khi: không lỗi ở phần của bạn`
      : `Kiểm tra: ${spec.length ? `\`npm test -w api -- ${spec.map(f => f.replace('.spec.ts', '')).join(' ')}\`, ` : ''}\`npm run lint\`, \`npm run build\` — Xong khi: cả ba xanh`,
    `Mở PR về \`main\`: ghi \`Closes #<số issue này>\`, lệnh đã chạy + kết quả, ảnh (nếu là giao diện), link mục nhật ký AI trong \`docs/ai-logs/<tên>.md\`. Reviewer: ${reviewer ?? (bt ? 'theo bảng phân công trong hướng dẫn buổi' : 'theo file LP')} — Xong khi: CI xanh, reviewer duyệt${spec.length ? ', QA xác nhận test không bị nới lỏng sau khi đã duyệt' : ''}`,
  ];
  return [
    `**Người làm:** ${t.person} · **Loại:** ${bt ? 'Bài tập trên lớp (làm trước)' : 'Đồ án'} · **Phase:** ${t.phaseTitle} · **Phải merge trước:** ${t.deps.length ? t.deps.join(', ') : '—'}`,
    `**Việc:** ${t.task}`,
    `**Kiểm chứng:** ${t.test}`,
    '', '## Các bước', '',
    ...all.map((text, i) => item(i + 1, text)),
    '', '## Kẹt thì làm gì',
    `- Hỏi AI bằng prompt trong \`${guide}\` (AI hướng dẫn, bạn tự gõ code).`,
    '- Kẹt quá 1 buổi: hỏi reviewer hoặc PM, ghi chỗ kẹt và cách gỡ vào nhật ký AI.',
  ].join('\n');
}

if (!apply) {
  const show = option('show');
  if (show) { const t = tasks.find(x => x.id === show); if (!t) throw new Error(`Không có task ${show}`); console.log(`# ${title(t)}\n\n${body(t)}`); process.exit(0); }
  for (const t of tasks) console.log(`[P${t.phase}] ${title(t)}  → @${people[t.role].login || '?'} · ${t.kind === 'homework' ? 'bài tập' : `${taskGuide(people[t.role], t).steps.length} bước`}`);
  const bt = tasks.filter(t => t.kind === 'homework').length;
  console.log(`\n${tasks.length} task (${bt} bài tập, ${tasks.length - bt} đồ án). Dry run, chưa tạo gì. Tạo thật: npm run roadmap:issues -- --repo owner/repo --apply`);
  process.exit(0);
}

const labels = ['roadmap', 'homework', 'project', ...new Set(tasks.map(t => `phase/P${t.phase}`)), ...new Set(tasks.map(t => `role/${t.role}`))];
const color = { 'roadmap': '0e8a16', 'homework': 'd93f0b', 'project': '1d76db' };
for (const name of labels) gh('label', 'create', name, '--repo', repo, '--force', '--color', color[name] ?? 'c5def5');

const milestones = new Set(ghJson('api', `repos/${repo}/milestones?state=all&per_page=100`).map(m => m.title));
for (const phaseTitle of new Set(tasks.map(t => t.phaseTitle))) {
  if (!milestones.has(phaseTitle)) gh('api', `repos/${repo}/milestones`, '-f', `title=${phaseTitle}`);
}

const existing = new Set(ghJson('issue', 'list', '--repo', repo, '--label', 'roadmap', '--state', 'all', '--limit', '500', '--json', 'title').map(i => i.title.split(' ')[0]));
let created = 0;
for (const t of tasks) {
  if (existing.has(t.id)) continue;
  const args = ['issue', 'create', '--repo', repo, '--title', title(t), '--body', body(t), '--label', `roadmap,${t.kind},phase/P${t.phase},role/${t.role}`, '--milestone', t.phaseTitle];
  if (!flag('no-assign') && people[t.role].login) args.push('--assignee', people[t.role].login);
  console.log(gh(...args).trim());
  created++;
}
console.log(`Đã tạo ${created} issue, bỏ qua ${tasks.length - created} issue đã có.`);
