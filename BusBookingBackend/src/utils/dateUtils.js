export const formatYYYYMMDD = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return null;
  return d.toISOString().split("T")[0];
};