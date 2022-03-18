import { parseRequestUrl, showLoading, hideLoading } from "../utils";
import { getProduct } from "../api";
import Rating from "../components/Rating";

const ProductView = {
  switch_render: () => {
    const request = parseRequestUrl();
    const addBtn = document.getElementById("add-button");
    addBtn.onclick = () => (document.location.hash = `/cart/${request.id}`);
  },

  render: async () => {
    showLoading();
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return ` 
         <section class="product d-flex al-center pr-pl">
            <h1>${product.error}</h1>
          </section>
      `;
    } else {
      hideLoading();
      return `
          <section class="product d-flex al-center pr-pl">
              <div class="product__back d-flex">
                 <span class="material-icons">
                   chevron_left
                 </span>
                 <a href="/#/" title="Voltar à home">Voltar</a>
              </div>  

            <div class="product__detail d-flex"> 
              <div class="product__detail--image" id="product__container">
                  <img src="${product.image}" alt="${product.name}" id="product__img"/>
              </div>

                <div class="product__detail--info">
                  <h1>${product.name}</h1>   
                  ${Rating.render({ value: product.rating })}

                    <div class="product__detail--stock">
                    <span class="success">Em estoque</span>
                      <br />

                        <div class="product__detail--price d-flex">
                          <div class="d-flex">
                                ${
                                  product.price < 62
                                    ? `
                                <h3 class="old-price">R$ ${product.price}</h3>

                                <h3>R$ ${(
                                  product.price -
                                  (product.price - (72 / 100) * product.price)
                                ).toFixed(2)}<span> à vista</span>
                                </h3> 
                                `
                                    : `<span>R$ ${product.price}</span>`
                                }
                          </div>
                          <h4>ou 6x sem juros</h4>

                          <h5>Cor: ${product.color}</h5>
                        </div>

                    </div>  
                    
                    <div class="product__detail--button"> 
                        <button 
                            type="button" 
                            id="add-button" 
                            class="main-btn filled "  
                            title="Adicionar ao carrinho">
                            Adicionar ao carrinho
                        </button>  
                    </div>
                    <br>

                    <div class="product__description">
                      <h3>Descrição:</h3>
                      <small>${product.description}</small> 

                      <h5>Tags:<span> ${product.tag}</span></h5>

                      <br>
                      <br>
                      <div class="product__description-media">
                        <h4>Siga nos:</h4>
                          <div class="product__description-icons d-flex al-center sp-between">
                          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/icons/facebook.svg" alt="Facebook" title="Facebook"/>
                          </a>

                          <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/icons/twitter.svg" alt="Twitter" title="Twitter"/>
                          </a>

                          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/icons/instagram.svg" alt="Instagram" title="Instagram"/>
                          </a>

                          <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer">
                            <img src="../../assets/icons/pinterest.svg" alt="Pinterest" title="Pinterest"/>
                          </a> 
                          </div>
                      </div>
                    </div>
                </div>  
            </div> 
       </section> 
      `;
    }
  },
};
export default ProductView;
