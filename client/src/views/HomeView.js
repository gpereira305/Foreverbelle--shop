import {
  salesProducts,
  customerComments,
  topRatedProducts,
} from "../data/index.js";

const HomeView = {
  render: () => {
    // const { _id, name, image, brand, price } = products;

    return ` 

    <!--++++++++ Nav banner ++++++++-->
    <div class="nav__banner" id="nav-banner">
    <img src="./assets/img/banner-img.jpg" alt="" />
    <div class="nav__banner-text">
      <h1>Clothes to fit every one</h1>
      <button type="button" class="main-btn outline">
        <a href="/#sales">Conferir ofertas</a>
      </button>
    </div>
  </div>
            
      <!--++++++++ Sales grid ++++++++-->
       <section class="sales mt-mb pr-pl" id="sales">
         <div class="sales__title d-flex jc-center al-center m-height">
           <h1 class="upper">Nossas ofertas</h1>
          </div>
            <div class="sales__grid">
               ${salesProducts
                 .map(
                   (product) => `
                <div class="sales__grid--card">
                    <span>Em promoção</span>
                      <a href="/#/product/${product._id}">
                        <img src="${product.image}" alt="${product.name}" />
                      </a>
                    <div class="sales__grid--actions">
                    <span
                        class="material-icons jc-center al-center"
                        title="Favoritar"
                        >favorite</span
                    >
                    <span
                        class="material-icons jc-center al-center"
                        title="Adicionar ao corrinho"
                        >shopping_bag</span
                    >
                    <span class="material-icons jc-center al-center" title="Espiar"
                        >remove_red_eye</span
                    >
                    </div>
                    <div class="sales__grid--info">
                    <h5>${product.brand}</h5>
                    <div class="sales__grid--price">
                        <span>R$ 16.99</span>
                        <span>R$ ${product.price}.99</span>
                    </div>
                    <div class="sales__grid--rating" title="Avaliações de clientes">
                        <span class="material-icons">star</span>
                        <span class="material-icons">star</span>
                        <span class="material-icons">star</span>
                        <span class="material-icons">star</span>
                        <span class="material-icons">star_outline</span>
                    </div>
                    </div>    
                </div>
               `
                 )
                 .join("\n")}
              </div>
            </section>

            <!--++++++++ user comments carousel ++++++++-->
            <section class="customers">
              <div class="d-flex jc-center al-center m-height">
                <h1 class="upper">O que dizem nossos clientes</h1>
              </div>

              <div class="customers__carousel">

                <div class="customers__slides">   
                   ${customerComments
                     .map(
                       (comment) => `
                       <div class="customers__slides--item"> 
                          <img src="${comment.customerImage}" alt="${comment.customerName}" /> 
                            <h4>
                            "${comment.customerComment}" -
                            </h4>
                        <br />
                        <small>${comment.customerName} - Cliente</small>
                        <div>${comment.customerRating}</div> 
                      </div>
                     `
                     )
                     .join("\n")}  
                </div>

                <div class="controls">
                <div class="control prev-slide" title="Voltar slide">&#9668;</div>
                <div class="control next-slide" title="Próximo slide">&#9658;</div>
                </div>
               </div>
            </section>
            
            <!--++++++ Bestsellers ++++++-->
            <section class="sales pr-pl" id="sales">
                <div class="sales__title d-flex jc-center al-center m-height">
                    <h1 class="upper">Mais vendidos</h1>
                </div>
                <div class="sales__grid">
                ${topRatedProducts
                  .map(
                    (topRated) => `
                    <div class="sales__grid--card">
                      <a href="/#/product/${topRated._id}">
                        <img src="${topRated.image}" alt="${topRated.name}" />
                      </a>
                        <div class="sales__grid--actions">
                            <span class="material-icons jc-center al-center" title="Favoritar">favorite</span>
                            <span class="material-icons jc-center al-center"title="Adicionar ao corrinho">shopping_bag</span>
                            <span class="material-icons jc-center al-center" title="Espiar">remove_red_eye</span>
                        </div>
                        <div class="sales__grid--info">
                            <h5>${topRated.brand}</h5>
                            <div class="sales__grid--price">
                                <span>R$ 16.99</span>
                                <span>R$ ${topRated.price}.99</span>
                            </div>
                            <div class="sales__grid--rating" title="Avaliações de clientes">
                                <span class="material-icons">star</span>
                                <span class="material-icons">star</span>
                                <span class="material-icons">star</span>
                                <span class="material-icons">star</span>
                                <span class="material-icons">star</span>
                            </div>
                        </div>
                    </div> 
                `
                  )
                  .join("\n")}
                </div> 
            </section>
        `;
  },
};

export default HomeView;
