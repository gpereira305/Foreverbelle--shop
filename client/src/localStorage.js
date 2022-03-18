// pega o item do localstorage e 'parseia' para object
export const getCartItems = () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  return cartItems;
};

// pega o item e 'estringuifica' o item para ser enviado ao localstorage
export const setCartItems = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// todos os dados do usuário serão alocados em locastorage
export const setUserInfo = ({
  _id = "",
  name = "",
  email = "",
  password = "",
  token = "",
  isAdmin = false,
}) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ _id, name, email, password, token, isAdmin })
  );
};

// remove os dados cadastrados do usuário
export const clearUser = () => {
  localStorage.removeItem("userInfo");
};

// busca por dados do usuário no localstorage caso esteja salvo
export const getUserInfo = () => {
  return localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : { name: "", email: "", password: "" };
};

// adiciona dados de entrega do usuário se houver no localStorage
export const getShippingInfo = () => {
  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : { address: "", city: "", postalCode: "", country: "" };

  return shipping;
};

// coleta tos dados de entrega do usuário
export const setShippingInfo = ({
  address = "",
  city = "",
  postalCode = "",
  country = "",
}) => {
  localStorage.setItem(
    "shipping",
    JSON.stringify({ address, city, postalCode, country })
  );
};

// adiciona dados de pagamento do usuário se houver no localStorage
export const getPaymentInfo = () => {
  const payment = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : { paymentMethod: "paypal" };

  return payment;
};

// coleta os dados de pagamento do usuário
export const setPaymentInfo = ({ paymentMethod = "paypal" }) => {
  localStorage.setItem("payment", JSON.stringify({ paymentMethod }));
};

// remove todos os itens do carrinho
export const clearCartItems = () => localStorage.removeItem('cartItems')