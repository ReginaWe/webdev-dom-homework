import { login, registr, setToken, setUserName, token } from "./api.js";
import { renderLogin } from "./renderLogin.js";

export const renderReg = ({ getCommentsFromServer }) => {
  const appElement = document.getElementById("app");
  const loginHtml = `
    <div class="container">
      <div class="add-form">
        <a class="link-sign-in" id="sign-in" href="#">Войти</a>
        <h3>Форма регистрации</h3>
        <input
          type="text"
          id="name-input"
          value=""
          class="add-form-reg"
          placeholder="Введите имя"
        />
        <input
          type="text"
          id="login-input"
          class="add-form-reg"
          placeholder="Введите логин"
        />
        <input
          type="text"
          id="password-input"
          class="add-form-reg"
          placeholder="Введите пароль"
        />
        <button id="login-button" class="reg-button">Зарегистрироваться</button>
      </div>
    </div>`;

  appElement.innerHTML = loginHtml;

  const link = document.getElementById("sign-in");
  const buttonElement = document.getElementById("login-button");
  const nameInputElement = document.getElementById("name-input");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  link.addEventListener("click", () => renderLogin({ getCommentsFromServer }));

  buttonElement.addEventListener("click", () => {
    registr({
      name: nameInputElement.value
        .trim()
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      login: loginInputElement.value
        .trim()
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      password: passwordInputElement.value
        .trim()
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
    })
      .then((responseData) => {
        if (responseData === "error") return Promise.reject();
        console.log(token);
        setToken(responseData.user.token);
        setUserName(responseData.user.name);
        console.log(token);
      })
      .then(() => {
        getCommentsFromServer();
      });
  });
};
