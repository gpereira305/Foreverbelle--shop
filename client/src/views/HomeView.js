import { customerComments, instagramPosts } from "../data";
import {showLoading, hideLoading } from "../utils";  

import Rating from "../components/Rating.js";
import axios from "axios";

const HomeView = {
  switch_render: () => {
    const iconBtns = document.querySelectorAll(".icon__btn");
    iconBtns.forEach((iconBtn) => {
      iconBtn.onclick = () => {
        window.scrollTo(0, 0);
      };
    });
  },

  render: async () => {
    showLoading();
    const resource = await axios({
      url: "http://localhost:5000/api/products",
      headers: {
        "Content-Type": "application/json",
      },
    });
    hideLoading();

    if (!resource || resource.statusText !== "OK") {
      return `
         <div class="error d-flex al-center pr-pl">
             <h2>Erro ao receber dados!</h2>
         </div>
      `;
    }
    const products = resource.data;

  return ` 
    <!--++++++++ Nav banner ++++++++-->
    <div class="nav__banner" id="nav-banner"> 
        <div class="nav__banner-text"> 
        <h1>The perfect outfit to suit you're personality</h1>  
           <button type="button" class="main-btn outline" >
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
               ${products.filter((product) => 
                 product.price < 62).map(product => `
                    <div class="sales__grid--card">
                        <span>Em promoção</span>
                        <div class="sales__grid--card_img">
                            <img src="${product.image}" alt="${product.name}" />
                            <img class="image-alt" src="${product.imageAlt}" alt="${product.name}" />
                        </div>
    
                        <div class="sales__grid--actions">  
                          ${product.countStock < 1 ? 
                            `<span class="shopping__btn icon__btn" title="Produto indisponível">
                                <span class="material-icons">
                                  remove_shopping_cart
                                </span>
                             </span>
                            ` : 
                            ` <a href="/#/cart/${product._id}" class="shopping__btn icon__btn" title="Adicionar ao carrinho">
                                <span class="material-icons">
                                    shopping_cart
                                </span>
                              </a> 
                             `}  
                              <a href="/#/product/${product._id}" class="icon__btn" title="Ver detalhes">
                                <span class="material-icons">
                                    visibility
                                </span>
                              </a> 
                        </div>

                        <div class="sales__grid--info">
                          <p>${product.name}</p>
                          <div class="sales__grid--price">
                              <span class="old-price">
                                R$ ${product.price}</span> 
                              <span>
                                 R$ ${(product.price - (product.price - (72 / 100) * product.price)).toFixed(2)}
                              </span>  
                          </div>
                          <div class="sales__grid--rating" title="Avaliações de clientes">
                              ${Rating.render({ value: product.rating })}
                          </div>
                        </div>    
                    </div> 
                 ` ).join("\n")}
              </div>
            </section>

            <!--++++++++ user comments carousel ++++++++-->
            <section class="carousel pr-pl">
                <div class="d-flex jc-center al-center m-height">
                  <h1 class="upper">O que dizem nossos clientes</h1>
                </div>
               
                <div class="carousel__slider" id="homepage-slider"> 
                  <input type="radio" class="carousel__slider--radio radio" name="slider" id="slide1"/>
                  <input type="radio" class="carousel__slider--radio radio" name="slider" id="slide2"/>
                  <input type="radio" class="carousel__slider--radio radio" name="slider" id="slide3"/>
                  <input type="radio" class="carousel__slider--radio radio" name="slider" id="play1" checked=""/> 
                   <div class="carousel__images">
                     <div class="carousel__images--inner">  
                         ${customerComments.map((comment) => `
                          <div class="carousel__images--slide"> 
                              <img src="${comment.customerImage}" alt="Cliente" /> 
                              <h4>
                                "${comment.customerComment}"
                              </h4>
                                <br />
                               <small>${comment.customerName} - Cliente</small>
                               <span>
                                ${Rating.render({value: comment.customerRating})}
                               </span>   
                          </div> 
                    `).join("\n")}
                  </div>
                </div> 
              </div> 
            </section>
            
            <!--++++++ Bestsellers ++++++-->
            <section class="sales pr-pl" id="sales">
                <div class="sales__title d-flex jc-center al-center m-height">
                    <h1 class="upper">Mais vendidos</h1>
                </div>
                <div class="sales__grid">
                  ${products.filter((product) => 
                     product.price > 62).map((product) => `
                      <div class="sales__grid--card">
                        <div class="sales__grid--card_img">
                            <img src="${product.image}" alt="${product.name}" />
                            <img class="image-alt" src="${product.imageAlt}" alt="${product.name}" />
                        </div>
                        <div class="sales__grid--actions">  
                          ${product.countStock < 1 ? `
                            <span class="shopping__btn icon__btn" title="Produto indisponível">
                                <span class="material-icons">
                                  remove_shopping_cart
                                </span>
                            </span>
                            ` : 
                            `<a href="/#/cart/${product._id}" class="shopping__btn icon__btn" title="Adicionar ao carrinho">
                                <span class="material-icons">
                                    shopping_cart
                                </span>
                            </a> 
                          `} 
                            <a href="/#/product/${product._id}" class="icon__btn" title="Ver detalhes">
                                <span class="material-icons">
                                    visibility
                                </span>
                            </a> 
                        </div>

                        <div class="sales__grid--info">
                            <p>${product.name}</p>
                            <div class="sales__grid--price"> 
                                <span>R$ ${product.price}</span>
                            </div>
                            <div class="sales__grid--rating" title="Avaliações de clientes">
                               ${Rating.render({ value: product.rating })}
                            </div>
                        </div>
                    </div>  
                `).join("\n")}
                </div>   

                <!--++++++++ Instagram posts carousel ++++++++-->
                <section class="instagram__slider">
                    <div class="instagram__slider--title d-flex jc-center al-center">
                        <h1 class="upper">Nosso Instagram</h1>
                    </div>

                    <div class="instagram__slider--track">
                        ${instagramPosts.map(post => `
                          <div class="instagram__slider--slide"  title="Post do Instagram">
                            <span>
                              <img src="${post.instaLogo}" alt="Instagram"/>
                            </span>
                            <img src="${post.instaImg}" alt="Post do Instagram" />
                          </div> 
                        `).join("\n")} 
                    </div>
                  </section> 
            </section> 
        `;

  },
};

export default HomeView;
