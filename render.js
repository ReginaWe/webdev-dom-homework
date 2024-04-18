import { initAddCommentListeners, initEventListeners } from "./listeners.js";
import { listElement } from "./main.js";

export const renderContainerPeople = ({ containerPeople }) => {
  const appElement = document.getElementById("app");
  const containerPeopleHtml = containerPeople
    .map((people, index) => {
      const attrIndex = `data-index="${index}"`;
      const isActiveLike = `${people.isLiked ? "-active-like" : ""}`;

      return `<li ${attrIndex} class="comment">
            <div class="comment-header">
              <div>${people.name}</div>
              <div>${people.date}</div>
            </div>
            <div class="comment-body">
              ${
                people.isEdit
                  ? `<textarea class="edit-text" rows="4" ${attrIndex}>${people.text}</textarea>`
                  : `<div class="comment-text">
                ${people.text}
              </div>`
              }
            </div>
            <div class="comment-footer">
              ${
                people.isEdit
                  ? `<button class="save-button" ${attrIndex}>Сохранить</button>
                  <button class="cancel-button" ${attrIndex}>Отменить</button>`
                  : `<button class="edit-button" ${attrIndex}>Редактировать</button>`
              }
              <div class="likes">
                <span class="likes-counter">${people.likes}</span>
                <button ${attrIndex} class= "like-button ${isActiveLike}"></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  const appHtml = `
  <div class="container">
  <span id="preloader">Загрузка страницы комментариев...</span>
  <ul id="list" class="comments">${containerPeopleHtml}</ul>
  <div class="add-form">
    <input
      type="text"
      id="name-input"
      value=""
      class="add-form-name"
      placeholder="Введите ваше имя"
    />
    <textarea
      type="textarea"
      id="comment-input"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button id="add-button" disabled class="add-form-button">
        Написать
      </button>
    </div>
    <a href="login.html">перейти</a>
  </div>
</div>`;
  console.log(containerPeople);

  appElement.innerHTML = appHtml;

  initEventListeners();
  initAddCommentListeners();
};
