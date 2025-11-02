let progressValue = 0; // initial value

export async function getProgress(): Promise<number> {
  return progressValue;
}

export async function setProgress(value: number): Promise<void> {
  progressValue = value;
}
