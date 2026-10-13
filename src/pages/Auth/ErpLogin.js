export const ErpLogin = (erpName) => {
  if (erpName === "Transport ERP") {
    return "https://bizoop.in/transport/login";
  }
 
  if (erpName === "Tyre Shop ERP") {
    return "https://bizoop.in/tyreshop/login";
  }
 
  return "";
};