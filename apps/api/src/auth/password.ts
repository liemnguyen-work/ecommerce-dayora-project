import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';

// Chuyển scrypt sang dạng có thể dùng với await.
const scrypt = promisify(scryptCallback);

// Băm mật khẩu và tạo salt mới cho mỗi lần gọi.
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const key = (await scrypt(password, salt, 64)) as Buffer;

  // Lưu salt cùng chuỗi băm để có thể kiểm tra mật khẩu sau này.
  return `${salt}:${key.toString('hex')}`;
}

// Kiểm tra mật khẩu nhập vào với chuỗi đã lưu.
export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.split(':');

  // Chuỗi hợp lệ phải có đúng hai phần: salt và hash.
  if (parts.length !== 2) {
    return false;
  }

  const [salt, hash] = parts;

  // Kiểm tra đúng độ dài và chỉ chứa ký tự hex.
  if (!/^[0-9a-f]{32}$/i.test(salt) || !/^[0-9a-f]{128}$/i.test(hash)) {
    return false;
  }

  const keyNhapVao = (await scrypt(password, salt, 64)) as Buffer;
  const keyDaLuu = Buffer.from(hash, 'hex');

  return timingSafeEqual(keyNhapVao, keyDaLuu);
}
