import { parseRequestUrl, rerender } from "../utils";
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";

// adiciona items ao carrinho, varifica se já tem algo no localstorage
const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existingItem = cartItems.find(
    (exItem) => exItem.product === item.product
  );

  //  caso o item já esteja no carrinho não será adiconado 2x ou será adicionado aos já existentes
  if (existingItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((cartItem) =>
        cartItem.product === existingItem.product ? item : cartItem
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartView);
  }
};

// Remve o item do carrinho e do localStorage
const removeItemFromCart = (id) => {
  setCartItems(getCartItems().filter((i) => i.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    rerender(CartView);
  }
};

const CartView = {
  switch_render: () => {
    // Ao ser selecionado no select a qde de itens no carrinho alterada
    const qtySelects = document.getElementsByClassName(
      "cart__img--select-selector"
    );
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.onchange = (e) => {
        const item = getCartItems().find((i) => i.product === qtySelect.id);
        addToCart(
          {
            ...item,
            qty: Number(e.target.value),
          },
          true
        );
      };
    });

    // deleta o item do carrinho
    const deleteItems = document.getElementsByClassName("delete-btn");
    Array.from(deleteItems).forEach((deleteItem) => {
      deleteItem.onclick = () => {
        if (confirm("Deseja mesmo remover esse item?")) {
          removeItemFromCart(deleteItem.id);
        }
      };

      // redireciona o usuário pra o cadastro na loja antes do checkout
      const checkoutItem = document.getElementById("checkout-btn");
      checkoutItem.onclick = () => {
        document.location.hash = "/signin";
      };
    });
  },
  render: async () => {
    const request = parseRequestUrl();

    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        color: product.color,
        countStock: product.countStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
      return `  
          <section class="empty d-flex al-center">
            <div class="empty__text">
                  <h1>Seu carrinho está vazio</h1>
                <a href="/#/">Vá às compras</a>
            </div>
          </section>
      `;
    } else {
      return `
      <section class="cart d-flex al-center pr-pl">   
          <div class="cart__back d-flex">
              <span class="material-icons">
                chevron_left
              </span>
             <a href="/#/" title="Voltar à home">Voltar</a>
          </div>  
            <br>
            <br>
            <br>
           <div>
              <h1>Seu carrinho</h1>
           </div>
              <br>
              <br>
              <br>

             <div class="cart__container d-flex">
                <div class="cart__item d-flex"> 
                ${cartItems
                  .map(
                    (item) => `
                  <div class="cart__img d-flex">
                  <span class="material-icons delete-btn" title="Remover item" id="${
                    item.product
                  }">cancel</span>
                      <img src="${item.image}" alt="${item.name}">

                      <div class="cart__img-info">
                          <h3>
                             <a href="/#/product/${
                               item.product
                             }" title="Ver datalhes desse produto">${item.name}
                              </a> 
                          </h3>
                          <h4>Cor: <span>${item.color}</span></h4>

                          <div>
                             <h4>Preço: <span>R$ ${
                               item.price
                             }</span><span class="italic"> à vista</span> </h4>
                              
                             <div class="cart__img--select d-flex al-center">
                                <label>Quantidade:</label>
                                <select class="cart__img--select-selector" id="${
                                  item.product
                                }">
                                  ${[...Array(item.countStock).keys()].map(
                                    (x) =>
                                      item.qty === x + 1
                                        ? ` <option selected value="${x + 1}">${
                                            x + 1
                                          }</option>`
                                        : ` <option value="${x + 1}">${
                                            x + 1
                                          }</option>`
                                  )}
                                </select>
                             </div>
                          </div>
                      </div>
                  </div> 
                `
                  )
                  .join("\n")}
                </div>
                
                <div class="cart__info d-flex">
                   <div>
                       <h2>
                         Total de unidades: 
                         <span>(${cartItems.reduce(
                           (a, c) => a + c.qty,
                           0
                         )})</span>
                      </h2>
                        <h3>
                          Total a pagar: 
                          <span>R$ ${cartItems
                            .reduce((a, c) => a + c.price * c.qty, 0)
                            .toFixed(2)} à vista</span>
                        </h3> 
                        <p>Ou 6x sem juros</p>
                        <button type="button" class="main-btn filled" id="checkout-btn">
                          Ir para checkout
                        </button>
                   </div>
                </div>
             </div>
      </section>
      <br>
      <br>
      <br> 
      `;
    }
  },
};

export default CartView;
