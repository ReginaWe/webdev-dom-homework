import { postComment, token } from "./api.js";
import { containerPeople, getCommentsFromServer } from "./main.js";
import { renderContainerPeople } from "./render.js";
import { renderLogin } from "./renderLogin.js";

function replayComment() {
  document.querySelectorAll(".comment").forEach((answer) => {
    const index = answer.dataset.index;

    if (containerPeople[index].isEdit) return;

    answer.addEventListener("click", () => {
      const commentInputElement = document.getElementById("comment-input");
      commentInputElement.value = `> ${containerPeople[index].text.replaceAll(
        "&gt;",
        ">"
      )}\n\n${containerPeople[index].name}, `;
    });
  });
}
function likeComment() {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener("click", (event) => {
      const index = likeButtonElement.dataset.index;
      event.stopPropagation();
      if (containerPeople[index].isLiked === false) {
        containerPeople[index].likes++;
        containerPeople[index].isLiked = true;
      } else {
        containerPeople[index].likes--;
        containerPeople[index].isLiked = false;
      }

      renderContainerPeople({
        containerPeople,
      });
    });
  }
}

function editComment() {
  document.querySelectorAll(".save-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      const current = containerPeople[index];
      current.isEdit = false;

      const newValue = document.querySelector(
        `.edit-text[data-index="${index}"]`
      ).value;

      if (newValue !== current.text) {
        current.text = newValue;
      }

      renderContainerPeople({
        containerPeople,
      });
    });
  });

  document.querySelectorAll(".cancel-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      containerPeople[index].isEdit = false;
      renderContainerPeople({
        containerPeople,
      });
    });
  });

  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = button.dataset.index;
      containerPeople[index].isEdit = true;
      renderContainerPeople({
        containerPeople,
      });
    });
  });
}

function addCommentByEnter() {
  const enterClick = document.querySelector(".add-form");

  enterClick.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addComment();
    }
  });
}
export const initEventListeners = () => {
  replayComment();
  likeComment();
  editComment();
};

export function initAddCommentListeners() {
  if (!token) {
    document
      .getElementById("sign-user")
      .addEventListener("click", () => renderLogin({ getCommentsFromServer }));
    return;
  }

  const buttonElement = document.getElementById("add-button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  //   buttonElement.disabled = true;
  const addComment = () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    if (nameInputElement.value.trim() === "") {
      nameInputElement.classList.add("error");
      return;
    }
    if (commentInputElement.value.trim() === "") {
      commentInputElement.classList.add("error");
      return;
    }

    renderContainerPeople({ containerPeople });

    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий загружается";

    postComment({
      text: commentInputElement.value,
      name: nameInputElement.value,
    })
      .then((data) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";

        if (data !== "error") {
          nameInputElement.value = "";
          commentInputElement.value = "";
        }
      })
      .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      });

    buttonElement.disabled = true;
  };
  function inputValid(event) {
    console.log(event.target.value);
    if (event.target.value === "") {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  nameInputElement.addEventListener("input", inputValid);
  commentInputElement.addEventListener("input", inputValid);

  buttonElement.addEventListener("click", addComment);
  addCommentByEnter();
}
