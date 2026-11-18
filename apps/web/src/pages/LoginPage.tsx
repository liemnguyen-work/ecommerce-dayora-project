import { useRef, useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';

type FormErrors = { fullName?: string; email?: string; password?: string };

function safeNext(value: string | null): string {
  if (
    !value ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    Array.from(value).some(character => {
      const code = character.charCodeAt(0);
      return code <= 31 || code === 127;
    })
  ) {
    return '/';
  }

  try {
    const url = new URL(value, window.location.origin);
    return url.origin === window.location.origin ? value : '/';
  } catch {
    return '/';
  }
}

export function AuthPage({ register = false }: { register?: boolean }) {
  const { user, loading, login, register: createAccount } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const otherRoute = `${register ? '/dang-nhap' : '/dang-ky'}?next=${encodeURIComponent(next)}`;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [sending, setSending] = useState(false);
  // Khóa ngay lập tức, kể cả khi React chưa render lại nút disabled.
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const nextErrors: FormErrors = {};
    const normalizedEmail = email.trim();
    if (register && !fullName.trim()) {
      nextErrors.fullName = 'Vui lòng nhập họ và tên.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = 'Vui lòng nhập email hợp lệ.';
    }
    if (password.length < 8) {
      nextErrors.password = 'Mật khẩu cần có ít nhất 8 ký tự.';
    }
    setErrors(nextErrors);
    setServerError('');
    if (Object.keys(nextErrors).length) return;

    submitting.current = true;
    setSending(true);
    try {
      if (register) {
        await createAccount(fullName.trim(), normalizedEmail, password);
      } else {
        await login(normalizedEmail, password);
      }
      navigate(next, { replace: true });
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : 'Không thể gửi yêu cầu. Vui lòng thử lại.');
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }

  const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-ink/30 bg-paper px-4 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

  if (!loading && user) {
    return <Navigate to={next} replace />;
  }

  return (
    <main className="min-h-[65vh] bg-paper px-4 py-12 text-ink sm:px-6 sm:py-16">
      <section aria-labelledby="auth-title" className="mx-auto max-w-md rounded-3xl border border-ink/15 bg-leaf/20 p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-widest">DAYORA</p>
        <h1 id="auth-title" className="mt-3 text-3xl font-extrabold">{register ? 'Tạo tài khoản' : 'Đăng nhập'}</h1>
        <p className="mt-3 text-sm">{register ? 'Tạo tài khoản để chuẩn bị cho những chuyến đi cùng DAYORA.' : 'Chào mừng bạn trở lại DAYORA.'}</p>

        <form noValidate onSubmit={submit} aria-busy={sending} className="mt-8 space-y-5">
          <fieldset disabled={sending} className="min-w-0 space-y-5 border-0 p-0">
            <legend className="sr-only">{register ? 'Thông tin đăng ký' : 'Thông tin đăng nhập'}</legend>
          {register && (
            <div>
              <label htmlFor="auth-full-name" className="font-semibold">Họ và tên</label>
              <input id="auth-full-name" name="fullName" type="text" autoComplete="name" required value={fullName} onChange={event => setFullName(event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'auth-full-name-error' : undefined} className={inputClass} />
              {errors.fullName && <p id="auth-full-name-error" className="mt-2 text-sm text-berry">{errors.fullName}</p>}
            </div>
          )}
          <div>
            <label htmlFor="auth-email" className="font-semibold">Email</label>
            <input id="auth-email" name="email" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'auth-email-error' : undefined} className={inputClass} />
            {errors.email && <p id="auth-email-error" className="mt-2 text-sm text-berry">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="auth-password" className="font-semibold">Mật khẩu</label>
            <input id="auth-password" name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} required minLength={8} value={password} onChange={event => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby="auth-password-help auth-password-error" className={inputClass} />
            <p id="auth-password-help" className="mt-2 text-sm">Ít nhất 8 ký tự.</p>
            <p id="auth-password-error" className="mt-1 text-sm text-berry">{errors.password}</p>
          </div>
          {serverError && <p role="alert" className="border-l-2 border-berry bg-berry/10 px-4 py-3 text-left text-sm leading-6 text-ink">{serverError}</p>}
          <button type="submit" disabled={sending} className="min-h-12 w-full rounded-full bg-berry px-6 py-3 font-semibold text-paper hover:bg-[#A93A30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60">
            {sending ? 'Đang xử lý…' : register ? 'Tạo tài khoản' : 'Đăng nhập'}
          </button>
          </fieldset>
        </form>

        <p className="mt-6 text-sm">
          {register ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <Link to={otherRoute} className="rounded font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            {register ? 'Đăng nhập' : 'Đăng ký'}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return <AuthPage />;
}
