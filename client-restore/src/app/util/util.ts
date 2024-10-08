export const getCookie = (key: string) => {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};

export const currencyFormat = (amount: number) => {
  return (amount/100).toLocaleString("th-TH", {style: "currency", currency: "THB"})
}
