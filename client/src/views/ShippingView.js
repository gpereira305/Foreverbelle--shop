import {
  clearUser,
  getUserInfo,
  getShippingInfo,
  setShippingInfo,
} from "../localStorage";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingView = {
  switch_render: () => {
    const form = document.getElementById("shipping__form");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const postalCode = document.getElementById("postalCode");
    const country = document.getElementById("country");

    // ação de coleta de dados de entrega do usuário
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      setShippingInfo({
        address: address.value,
        city: city.value,
        postalCode: postalCode.value,
        country: country.value,
      });
      document.location.hash = "/payment";
    });
  },

  render: () => {
    const { name } = getUserInfo();
    const { address, city, postalCode, country } = getShippingInfo();
    if (!name) {
      document.location.hash = "/";
    }

    return `    
        <section class="register d-flex al-center pr-pl">
            ${CheckoutSteps.render({ step1: true, step2: true })}
            <br>
            <form class="register__form" id="shipping__form">
                <div class="register__form--title">
                    <h1>Frete</h1>
                </div>
                <br>
                <br>

                <div class="register__form--mail d-flex">
                    <label for="address">Endereço</label>
                    <input type="text" name="address" id="address" value="${address}"/>
                </div> 

                <div class="register__form--mail d-flex">
                    <label for="city">Cidade</label>
                    <input type="text" name="city" id="city" value="${city}"/>
                </div> 

                <div class="register__form--mail d-flex">
                    <label for="postalCode">CEP</label>
                    <input type="text" name="postalCode" id="postalCode" value="${postalCode}"/>
                </div> 

                <div class="register__form--mail d-flex">
                    <label for="country">País ou estado</label>
                    <input type="text" name="country" id="country" value="${country}"/>
                </div> 

                <div class="register__form--submit">
                    <button type="submit" class="main-btn filled">Proseguir</button>
                </div>   
            </form>
        </section>
        <br>
        <br>  
     `;
  },
};

export default ShippingView;
