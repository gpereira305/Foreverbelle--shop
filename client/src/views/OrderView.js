import { toUpper } from "../config";
import { getOrder } from "../api"; 
import {parseRequestUrl, showLoading, hideLoading, showMessage } from "../utils";

const OrderView = {
   switch_render:  () => {
    // ao concluir a compra o usuário será direcionado à home 
    const handleFinalizeOrder = document.getElementById("finalizeorder-btn");
    handleFinalizeOrder.onclick = () => {
      showLoading();
      const message = 'Pagamento realizado com sucesso!'  

      setTimeout(() => {  
        showMessage(message);   
        setTimeout(()=> {
          document.location.hash = '/';
        }, 4000)
      }, 4500);  
    }
   },

  render: async () => {
    const request = parseRequestUrl();
    const { 
       _id, 
       shipping, 
       payment, 
       orderItems, 
       isDelivered, 
       deliveredAt, 
       isPaid
    } = await getOrder(request.id); 
 

      // calcula o total do valor ds produtos no carrinho
      const calcTotalPrice = orderItems.reduce(
        (acc, cur) => acc + cur.price * cur.qty,
        0
      );  

     // calcula a quantidade de produtos no carrinho
      const totalProductPrice = orderItems.reduce((a, c) => a + c.qty, 0) 

      // adiciona o ícone do pagamento escolhido
      const checkPaymentMethod = () => {
        if(payment.paymentMethod === 'Pix') {
          return  `<i class="fa-brands fa-pix"></i>` 
        } else if (payment.paymentMethod === 'Paypal') { 
          return  `<i class="fa-brands fa-paypal"></i>` 
        }
         return  `<i class="fa-brands fa-bitcoin"></i>`
      } 
 
    return `
           <section class="placeorder d-flex pr-pl">   
               <br> 
               <div class="placeorder__contents d-flex">
                  <div class="placeorder__info">
                      <div class="placeorder__info--shipping">
                          <h1>Dados para entrega do seu pedido </h1> 
                          <h5>Cidade: <span>${toUpper(shipping.city)}</span></h5>
                          <h5>Endereço: <span>${toUpper(shipping.address)}</span></h5>
                          <h5>CEP: <span>${toUpper(shipping.postalCode)}</span></h5>
                          <h5>País ou estado: <span>${toUpper(shipping.country)}</span></h5> 
                          <div>
                             <h5>
                               Status: ${isDelivered ? 
                                `<span class="success">${deliveredAt}</span>` : 
                                `<span class="error">Em processo</span>`}
                              </h5> 
                          </div>
                           
                          <h5 style="margin-top: 20px">ID da Compra: <span>(${_id})</span></h5>  
                          <br> 
                      </div>
  
                      <div class="placeorder__payment">
                          <h1>Pagamento escolhido</h1> 
                            <h5 class="paymentIcon">${payment.paymentMethod}  ${checkPaymentMethod()}</h5>  
                           

                          <div style="margin-top: 10px">
                            <h5 style="font-weight: bold">
                             Status: ${isPaid ? 
                             `<span class="success">Pago - ${paidAt}</span>` : 
                             `<span class="error">Aguardando pagamento</span>`}
                            </h5> 
                          </div>
                      </div>
  
                      <div class="placeorder__cart d-flex">
                          <h1>Itens no seu carrinho</h1>
  
                            ${orderItems.map((item) => `
                              <div class="placeorder__cart--detail d-flex">
                                  <div class="placeorder__cart--img">
                                    <img src="${item.image}" alt="${item.name}"/>
                                  </div> 
                                  <div class="placeorder__cart--info">
                                      <h4>${item.name}</h4>
                                         <h3> 
                                            Qde: <span>${item.qty} ${item.qty > 1 ? "unidades" : "unidade"}</span>  
                                         </h3> 
                                      <h3>Preço unidade: <span> R$ ${item.price} à vista</span></h3>
                                  </div>
                              </div>  
                            `).join("\n")}
                      </div>
                    </div>
  
                    <div class="placeorder__pay"> 
                       <h1>Resumo da compra</h1>
                      <h2>
                        Total Qde: 
                        <span>
                        ${totalProductPrice}
                        ${totalProductPrice > 1
                            ? "unidades"
                            : "unidade"
                         } 
                        </span> 
                      </h2> 
  
                       <div class="placeorder__pay-total">
                          <h2>
                              Valor total: 
                              <span>R$ ${calcTotalPrice} à vista</span>
                          </h2>   
                          <br>
                        <button type="button" 
                          class="main-btn filled" 
                          id="finalizeorder-btn"
                          title="Finalizar compra"
                        >
                          Pagar e finalizar compra
                      </button> 
                       </div>
                   </div> 
                 </div>  
             </div> 
           </section>
        `;
  },
};
export default OrderView;
