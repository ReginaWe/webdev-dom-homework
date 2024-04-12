import { getComments, postComment } from "./api.js";
import { printDate } from "./helpers.js";
import { renderContainerPeople } from "./render.js";

export const listElement = document.getElementById("list");
const preloaderElement = document.getElementById("preloader");


export function getCommentsFromServer() {
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
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    });
}

export let containerPeople = [];

getCommentsFromServer();



