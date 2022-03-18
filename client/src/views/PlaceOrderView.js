import {
  getCartItems,
  getShippingInfo,
  getPaymentInfo,
  clearCartItems,
} from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";
import { toUpper } from "../config";
import { createOrder } from "../api";
import { showLoading, hideLoading, showMessage } from "../utils";

const convertCartItemsToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = "/cart";
  }

  const shipping = getShippingInfo();
  if (!shipping.address) {
    document.location.hash = "/shipping";
  }

  const payment = getPaymentInfo();
  if (!payment.paymentMethod) {
    document.location.hash = "/payment";
  }

  const calcItemsPrice = orderItems.reduce(
    (acc, cur) => acc + cur.price * cur.qty,
    0
  );

  return {
    orderItems,
    calcItemsPrice,
    payment,
    shipping,
  };
};

const PlaceOrderView = {
  switch_render: async () => {
    const handlePlaceOrder = document.getElementById("placeorder-btn");
    handlePlaceOrder.onclick = async () => {
      const order = convertCartItemsToOrder();
      showLoading();
      const data = await createOrder(order);
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        clearCartItems();
        showLoading();
        setTimeout(() => {
          document.location.hash = `/order/${data.order._id}`;
        }, 2500);
      }
    };
  },

  render: () => {
    const { orderItems, calcItemsPrice, payment, shipping } =
      convertCartItemsToOrder();
    return `
         <section class="placeorder d-flex pr-pl"> 
           <div class="placeorder__header--steps">
                ${CheckoutSteps.render({
                  step1: true,
                  step2: true,
                  step3: true,
                  step4: true,
                })}
            </div>
             <br>
             <br>
          
             <div class="placeorder__contents d-flex">
                <div class="placeorder__info">
                    <div class="placeorder__info--shipping">
                        <h1>Endereço de entrega</h1> 
                        <h5>Cidade: <span>${toUpper(shipping.city)}</span></h5>
                        <h5>Endereço: <span>${toUpper(
                          shipping.address
                        )}</span></h5>
                        <h5>CEP: <span>${toUpper(
                          shipping.postalCode
                        )}</span></h5>
                        <h5>País: <span>${toUpper(
                          shipping.country
                        )}</span></h5>   
                    </div>

                    <div class="placeorder__payment">
                        <h1>Forma de pagamento</h1>
                        <h5>${payment.paymentMethod}</h5> 
                    </div>

                    <div class="placeorder__cart d-flex">
                        <h1>Itens no seu carrinho</h1>

                          ${orderItems
                            .map(
                              (item) => `
                                <div class="placeorder__cart--detail d-flex">
                                    <div class="placeorder__cart--img">
                                      <img src="${item.image}" alt="${
                                item.name
                              }"/>
                                    </div> 
                                    <div class="placeorder__cart--info">
                                        <h4>${item.name}</h4>
                                        <h3>
                                           Quantidade:
                                          <span>${item.qty} ${
                                item.qty > 1 ? "itens" : "item"
                              }</span>  
                                        </h3>
                                        <h3>Cor: <span> ${
                                          item.color
                                        }</span></h3>
        
                                        <h3>Preço: <span> R$ ${item.price.toFixed(
                                          2
                                        )} à vista</span></h3>
                                    </div>
                                </div>  
                          `
                            )
                            .join("\n")}
                    </div>
                  </div>

                  <div class="placeorder__pay"> 
                     <h1>Resumo da compra</h1>
                    <h2>
                      Total: 
                      <span>
                        ${orderItems.reduce((a, c) => a + c.qty, 0)} 
                        ${orderItems.length > 1 ? "itens" : "item"}
                      </span> 
                    </h2> 

                     <div class="placeorder__pay-total">
                        <h2>
                            Valor total: 
                            <span>R$ ${calcItemsPrice.toFixed(2)} à vista</span>
                        </h2> 
                        
                        <p>Ou 6x sem juros</p>
                        <br>
                        <button type="button" 
                          class="main-btn filled" 
                          id="placeorder-btn"
                          title="Finalizar compra"
                        >
                          Finalizar compra  
                      </button> 
                     </div>
                 </div> 
               </div>  
           </div> 
         </section>
      `;
  },
};
export default PlaceOrderView;
