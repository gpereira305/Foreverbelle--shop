export const getCartItems = () => {
  // pega o item do localstorage e 'parseia' para object
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  return cartItems;
};

export const setCartItems = (cartItems) => {
  // pega o item e 'estringuifica' o item para ser enviado ao localstorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
