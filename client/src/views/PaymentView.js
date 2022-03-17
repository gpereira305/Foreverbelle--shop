import { getUserInfo, setPaymentInfo } from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentView = {
  switch_render: () => {
    const form = document.getElementById("payment__form");
    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    );

    // ação de coleta de dados de entrega do usuário
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      paymentMethod.value;

      setPaymentInfo({ paymentMethod });

      document.location.hash = "/placeorder";
    });
  },

  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }

    return `     
          <section class="register d-flex al-center pr-pl">
              ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
              <br>
              <form class="register__form" id="payment__form">
                  <div class="register__form--title">
                      <h1>Forma de Pagamento</h1>
                  </div>
                  <br>
                  <br>
  
                  <div class="register__payment d-flex">
                     <div>
                          <label for="address">PayPal</label>
                          <input type="radio" name="payment-method" id="paypal" value="Paypal" checked/>
                      </div>
                      <div>
                        <label for="address">Pix</label>
                        <input type="radio" name="payment-method" id="stripe" value="Stripe"/> 
                      </div>
                  </div>  
                  <br>
                  <br>
  
                  <div class="register__form--submit">
                      <button type="submit" class="main-btn filled">Proseguir</button>
                  </div>   
              </form>
          </section> 
       `;
  },
};

export default PaymentView;
