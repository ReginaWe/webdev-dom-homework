export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/:regina-kraeva/comments", {
        method: "GET",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
    
          if (response.status === 500) alert("Сервер сломался, попробуй позже");
        })
}

export function postComment({ text, name}) {
    return fetch("https://wedev-api.sky.pro/api/v1/:regina-kraeva/comments", {
    method: "POST",
    body: JSON.stringify({
      text: text
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      name: name
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      //forceError: true,
    }),
  })
    .then((response) => {
      if (response.status === 201) return getCommentsFromServer();

      if (response.status === 500) alert("Сервер сломался, попробуй позже");
      if (response.status === 400)
        alert("Имя и комментарий должны быть не короче 3 символов");

      return "error";
    })
}