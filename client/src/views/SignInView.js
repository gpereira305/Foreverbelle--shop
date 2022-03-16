import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

const SignInView = {
  switch_render: () => {
    const form = document.getElementById("signin__form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      showLoading();
      const data = await signin({
        email: email.value,
        password: password.value,
      });
      hideLoading();

      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = "/";
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = "/";
    }
    return `
           <section class="register d-flex al-center pr-pl">
                <form class="register__form" id="signin__form">
                    <div class="register__form--title">
                        <h1>Login</h1>
                    </div>
                    <br>
                    <br>

                    <div class="register__form--mail d-flex">
                       <label for="email">Email</label>
                       <input type="email" name="email" id="email" placeholder="joao@gmail.com"/>
                    </div>

                    <div class="register__form--password d-flex">
                       <label for="password">Senha</label>
                       <input type="password" name="password" id="password" placeholder="**********"/>
                    </div>

                    <div class="register__form--submit">
                       <button type="submit" class="main-btn filled">Log in</button>
                    </div>

                    <div class="register__form--register d-flex al-center">
                        <h3>Novo por  aqui?</h3>
                        <a href="/#/signup">Crie sua conta</a>
                    </div>
                  </form>
           </section>
        `;
  },
};

export default SignInView;
