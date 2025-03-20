export const formatNumber = (num) => {
  if (num >= 1e7) return (num / 1e7).toFixed(3) + " Cr"; 
  if (num >= 1e5) return (num / 1e5).toFixed(3) + " L"; 
  if (num >= 1e3) return (num / 1e3).toFixed(1) + " K"; 
  return num.toLocaleString("en-IN"); 
};

export const formatCrNumber = (value) => {
  if (!value) return "0";

  const croreValue = value / 10000000;
  return croreValue % 1 === 0 ? croreValue.toFixed(0) : croreValue.toFixed(1);
};
export const formatKNumber =(value) => {
  if (!value) return "0";

  const kValue = value/1000;
  return kValue % 1 === 0 ? kValue.toFixed(0) : kValue.toFixed(1);
}

