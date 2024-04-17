import { getCommentsFromServer } from "./main.js";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v1/:regina-kraeva/comments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200) return response.json();

    if (response.status === 500) alert("Сервер сломался, попробуй позже");
  });
}

export function postComment({ text, name }) {
  return fetch("https://wedev-api.sky.pro/api/v1/:regina-kraeva/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      //forceError: true,
    }),
  }).then((response) => {
    if (response.status === 201) return getCommentsFromServer();

    if (response.status === 500) alert("Сервер сломался, попробуй позже");
    if (response.status === 400)
      alert("Имя и комментарий должны быть не короче 3 символов");

    return "error";
  });
}

export function login(login, password) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      //forceError: true,
    }),
  }).then((response) => {
    if (response.status === 201) return getCommentsFromServer();

    if (response.status === 500) alert("Сервер сломался, попробуй позже");
    if (response.status === 400) alert("Введен ннверный логин или пароль");

    return "error";
  });
}
