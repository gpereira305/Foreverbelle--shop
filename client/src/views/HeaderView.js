import { getUserInfo } from "../localStorage";
import {toUpper} from '../config'

const HeaderView = {
  switch_render: () => {},
  render: () => {
    const { name } = getUserInfo();
    // limita a quntidade de caracteres do nome do usuário
     const reducedName = name.length > 10 ? name.substring(0, 10) + "..." : name;

 
    return ` 
        <div class="nav__logo" title="Home | Forever Belle">
            <h1>
               <a href="/#/">Forever Belle</a>
            </h1>
        </div>

         <div class="nav__menu" id="nav__menu">
            <ul class="d-flex sp-between al-center"> 
               <li class="d-flex al-center">
                  ${name ? 
                  `<a href="/#/profile" title="${toUpper(name)}">
                      Olá, ${toUpper(reducedName)}
                      <span class="material-icons">person</span>
                   </a> 
                   `: 
                    ` <a href="/#/signin">
                          Log in
                          <span class="material-icons">person</span>
                      </a> `
                  } 
               </li>  
                 <li class="d-flex al-center" title="Ver carrinho">
                   <a href="/#/cart">
                     Carrinho
                     <span class="material-icons">shopping_bag</span>
                   </a>
                </li>
             </ul> 
             </div>
             <!--- mobile menu icon--->
              <div class="mobile-menu" id="mobile-menu">
                  <span class="material-icons">
                    menu
                 </span>
               </div>

        `;
  }, 
};

export default HeaderView;
