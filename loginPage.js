import { login, setToken, token } from "./api.js";

export const renderLogin = () => {
  const appElement = document.getElementById("app");
  const loginHtml = `
  <div class="container">
  <div class="add-form">
    <h3>Форма входа</h3>
    <input
      type="text"
      id="login-input"
      value=""
      class="add-form-login"
      placeholder="Ваш логин"
    />
    <input
      type="text"
      id="password-input"
      class="add-form-login"
      placeholder="Ваш пароль"
    />
    <button id="login-button" class="login-button">Войти</button>
    <a href="reg.html">Зарегистрироваться</a>
  </div>
</div>`;

  appElement.innerHTML = loginHtml;

  const buttonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  buttonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value
        .trim()
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      password: passwordInputElement.value
        .trim()
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
    }).then((responseData) => {
      console.log(token);
      setToken(responseData.user.token);
      console.log(token);
    });
  });
};
