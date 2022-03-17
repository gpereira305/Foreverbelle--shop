import { getCartItems, getShippingInfo, getPaymentInfo } from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";

const convertCartItemsToOrder = () => {
  const orderItems = getCartItems();
  const shipping = getShippingInfo();
  const payment = getPaymentInfo();

  console.log(payment);

  if (orderItems.length === 0) {
    document.location.hash = "/";
  } else if (!shipping.address) {
    document.location.hash = "/shipping";
  } else if (!payment.paymentMethod) {
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
  switch_render: () => {},

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
                        <h5>Cidade: <span>${shipping.city}</span></h5>
                        <h5>Endereço: <span>${shipping.address}</span></h5>
                        <h5>CEP: <span>${shipping.postalCode}</span></h5>
                        <h5>País: <span>${shipping.country}</span></h5>   
                    </div>

                    <div class="placeorder__payment">
                        <h1>Pagamento</h1>
                        <h5>${payment.paymentMethod}</h5> 
                    </div>

                    <div class="placeorder__cart d-flex">
                        <h1>Itens no carrinho</h1>

                          ${orderItems
                            .map(
                              (item) => `
                            <div class="placeorder__cart--detail d-flex">
                                <div class="placeorder__cart--img">
                                   <img src="${item.image}" alt="${item.name}"/>
                                </div> 
                                <div class="placeorder__cart--info">
                                    <h4>${item.name}</h4>
                                    <h4>
                                    Quantidade:
                                    <span>${item.qty} itens</span>
                                    <span>Cor: ${item.color}</span>
                                    </h4>
    
                                    <h3>Preço: R$ ${item.price}</h3>
                                </div>
                            </div>  
                          `
                            )
                            .join("\n")}
                    </div>
                  </div>

                  <div class="placeorder__pay"> 
                    <div class=""> 
                        <h2>
                          Total de itens: 
                          <span>(${orderItems.reduce(
                            (a, c) => a + c.qty,
                            0
                          )})</span> 
                        </h2>
                        <h3>
                           Valor total: 
                           <span>R$ ${calcItemsPrice} à vista</span>
                        </h3> 
                           <p>Ou 6x sem juros</p>
                           <button type="button" class="main-btn filled" id="checkout-btn">
                             Ir para checkout
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
