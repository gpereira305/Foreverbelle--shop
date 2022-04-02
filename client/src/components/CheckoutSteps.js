const CheckoutSteps = {
  render: (props) => {
    return `
           <div class="checkout__steps d-flex sp-between al-center">
              <h4 class="d-flex al-center ${props.step1 ? 'active' : ''}">
                Login
                <span class="material-icons">chevron_right</span>
              </h4>

              <h4 class="d-flex al-center ${props.step2 ? 'active' : ''}">
                Frete
                <span class="material-icons">chevron_right</span>
              </h4>

              <h4 class="d-flex al-center ${props.step3 ? 'active' : ''}">
                Pagamento
                <span class="material-icons">chevron_right</span>
              </h4>

              <h4 class="d-flex al-center ${props.step4 ? 'active' : ''}">
                 Finalizar compra
                 <span class="material-icons">chevron_right</span>
              </h4>
           </div>
        `;
  },
};

export default CheckoutSteps;
