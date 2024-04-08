import { getComments, postComment } from "./api.js";
import { renderContainerPeople } from "./render.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const preloaderElement = document.getElementById("preloader");

function printDate(value) {
  let date = value.getDate();
  let montch = value.getMonth() + 1;
  let year = value.getFullYear();
  let hours = value.getHours();
  let minute = value.getMinutes();
  if (date < 10) {
    date = "0" + date;
  }
  if (montch < 10) {
    montch = "0" + montch;
  }
  if (year < 10) {
    year = "0" + year;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  return date + "." + montch + "." + year + " " + hours + ":" + minute;
}

function getCommentsFromServer() {
  getComments()
    .then((responseData) => {
      console.log(responseData);

      containerPeople = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: printDate(new Date(comment.date)),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
          isEdit: false,
        };
      });
      renderContainerPeople({
        containerPeople,
        listElement,
        initEventListeners,
      });
      preloaderElement.classList.add("hide");
    })
    .catch((error) => {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    });
}

const enterClick = document.querySelector(".add-form");
const redactComment = () => {
  const buttonRedactComments = document.querySelectorAll(".redact");
  for (buttonRedactComment of buttonRedactComments) {
    buttonRedactComment.addEventListener("click", () => {});
  }
};

buttonElement.disabled = true;
const inputValid = (event) => {
  if (event.target.value === "") {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};
nameInputElement.addEventListener("input", inputValid);
commentInputElement.addEventListener("input", inputValid);

let containerPeople = [];

const initEventListeners = () => {
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
        listElement,
        initEventListeners,
      });
    });
  }

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
        listElement,
        initEventListeners,
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
        listElement,
        initEventListeners,
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
        listElement,
        initEventListeners,
      });
    });
  });
};

getCommentsFromServer();

const addComment = () => {
  let date = printDate(new Date());

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

  renderContainerPeople({ containerPeople, listElement, initEventListeners });

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

buttonElement.addEventListener("click", addComment);

enterClick.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addComment();
  }
});
