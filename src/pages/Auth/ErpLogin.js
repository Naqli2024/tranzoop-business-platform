export const ErpLogin = (erpName) => {
  if (erpName === "Transport ERP") {
    return "https://tranzoop.com/transport/login";
  }
 
  if (erpName === "Tyre Shop ERP") {
    return "https://tranzoop.com/tyreshop/login";
  }
 
  return "";
};