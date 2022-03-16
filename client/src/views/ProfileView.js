import { update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

const ProfileView = {
  switch_render: () => {
    const form = document.getElementById("profile__form");
    const email = document.getElementById("email");
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const signout = document.getElementById("signout__btn");

    // ação de atualização de dados do usuário
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      showLoading();
      const data = await update({
        name: name.value,
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

    // ação de logout
    signout.onclick = () => {
      clearUser();
      document.location.hash = "/";
    };
  },
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }

    return `
        <section class="register d-flex al-center pr-pl">
            <form class="register__form" id="profile__form">
                <div class="register__form--title">
                    <h1>Perfil do usuário</h1>
                </div>
                <br>
                <br>

                <div class="register__form--mail d-flex">
                    <label for="name">Nome</label>
                    <input type="name" name="name" id="name" value="${name}"/>
                </div>

                <div class="register__form--mail d-flex">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" value="${email}"/>
                </div>

                <div class="register__form--password d-flex">
                    <label for="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="**********"/>
                </div> 

                <div class="register__form--submit">
                    <button type="submit" class="main-btn filled">Atualizar</button>
                </div>  
                <div class="register__form--submit">
                    <button type="button" class="main-btn outlined" id="signout__btn">Logout</button>
                </div> 
            </form>
        </section>
          `;
  },
};

export default ProfileView;
