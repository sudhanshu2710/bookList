const btn = document.querySelector(".btn");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  const book = document.querySelector(".input__book").value;
  const aut = document.querySelector(".input__aut").value;
  const comment = document.querySelector(".input__com").value;

  let data_ = {
    book: book,
    author: aut,
    comments: [comment],
  };
  fetch(`http://localhost:3000/posts`, {
    method: "POST",
    body: JSON.stringify(data_),
    headers: { "content-type": "application/json;charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      fetchData();
    })
    .catch((err) => console.log(err));
});

//-----------------------------------------------------
const fetchData = async function () {
  await fetch(`http://localhost:3000/posts`, {
    method: "GET",
    headers: { "content-type": "application/json;charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      display(data);
    })
    .catch((err) => console.log(err));
};

fetchData();
function display(data_) {
  console.log("--------------");
  console.log(data_);
  data_.forEach((data) => {
    const container = document.querySelector(".container");
    const html = `<div class="card"> <div>book:   ${data.book}</div>
  <div>author:   ${data.author}</div>

  <div>comments:   ${data.comments}</div>
  <form>
  <input class="edit_comment${data.id}" type="text">
  <button class="btn-edit${data.id}">Edit Comment</button></form>
  
  </div>
 `;
    container.insertAdjacentHTML("beforeend", html);
    const edit = document.querySelector(`.btn-edit${data.id}`);
    edit.addEventListener("click", function (e) {
      e.preventDefault();
      const com = document.querySelector(`.edit_comment${data.id}`).value;
      console.log(data.comments);

      fetch(`http://localhost:3000/posts/${data.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
          book: data.book,
          author: data.author,
          comments: [com, ...data.comments],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          fetchData();
        })
        .catch((err) => console.log(err));
    });
  });
}
