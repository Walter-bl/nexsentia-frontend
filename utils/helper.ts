export const daysAgo = (date: string | Date): number => {
  const now = new Date();
  const target = new Date(date);

  const diffTime = now.getTime() - target.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
