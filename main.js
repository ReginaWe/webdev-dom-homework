import { getComments, postComment } from "./api.js";
import { printDate } from "./helpers.js";
import { renderLogin } from "./renderLogin.js";
import { renderContainerPeople } from "./render.js";

export const listElement = document.getElementById("list");
const preloaderElement = document.getElementById("preloader");

export function getCommentsFromServer() {
  preloaderElement.classList.remove("hide");

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
      });
      preloaderElement.classList.add("hide");
    })
    .catch((error) => {
      if (error === "Failed to fetch")
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      else
        throw error
    });
}
// getLogin();

export let containerPeople = [];

getCommentsFromServer();
// renderLogin({ getCommentsFromServer });
