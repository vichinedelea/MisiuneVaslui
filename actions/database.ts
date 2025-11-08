import { kv } from '@vercel/kv';

const PROGRESS_KEY = 'progressValue';

export async function getProgress(): Promise<number> {
  const value = await kv.get(PROGRESS_KEY);
  return value ? Number(value) : 0;
}

export async function setProgress(value: number): Promise<void> {
  await kv.set(PROGRESS_KEY, value);
}
