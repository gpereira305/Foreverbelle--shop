import { signup } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const SigUpView = {
  switch_render: () => {
    const form = document.getElementById("signup__form");
    const email = document.getElementById("email");
    const name = document.getElementById("name");
    const password = document.getElementById("password");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      showLoading();
      const data = await signup({
        name: name.value,
        email: email.value,
        password: password.value,
      });
      hideLoading();

      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        redirectUser();
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }

    return `
             <section class="register d-flex al-center pr-pl">
                  <form class="register__form" id="signup__form">
                      <div class="register__form--title">
                          <h1>Registre-se</h1>
                      </div>
                      <br>
                      <br>
  
                      <div class="register__form--mail d-flex">
                         <label for="name">Nome</label>
                         <input type="name" name="name" id="name" placeholder="João da silva"/>
                      </div>
  
                      <div class="register__form--mail d-flex">
                         <label for="email">Email</label>
                         <input type="email" name="email" id="email" placeholder="joao@gmail.com"/>
                      </div>
  
                      <div class="register__form--password d-flex">
                         <label for="password">Senha</label>
                         <input type="password" name="password" id="password" placeholder="**********"/>
                      </div>
                      <div class="register__form--password d-flex">
                         <label for="repassword">Confirmar enha</label>
                         <input type="password" name="repassword" id="repassword" placeholder="**********"/>
                      </div>
  
                      <div class="register__form--submit">
                         <button type="submit" class="main-btn filled">Registrar</button>
                      </div>
  
                      <div class="register__form--register d-flex al-center">
                          <h3>Já tem conta?</h3>
                          <a href="/#/signin">Faça o login</a>
                      </div>
                    </form>
             </section>
          `;
  },
};

export default SigUpView;
