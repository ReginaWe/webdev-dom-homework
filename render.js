import { initAddCommentListeners, initEventListeners } from "./listeners.js";
import { listElement } from "./main.js";

export const renderContainerPeople = ({ containerPeople }) => {
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
  console.log(containerPeople);

  listElement.innerHTML = containerPeopleHtml;

  initEventListeners();
  initAddCommentListeners();
};
