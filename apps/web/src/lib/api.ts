const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(BASE + path, {
    ...init,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const body: { message?: string } = await response.json().catch(() => ({}));
    throw Object.assign(new Error(body.message ?? `Lỗi ${response.status}`), { body });
  }

  return response.json() as Promise<T>;
}
