// ابتدا متغیرهایی که ثابت هستند را به صورت گلوبال ایجاد می کنیم
const textInput = document.querySelector("#add-book input");
const link = document.querySelector("#add-book button");
const ul = document.querySelector("ul");
const spanDelete = `<span class="delete delete-classes">حذف</span>`;
const checkBox = document.querySelector("#hide input");
const searchInput = document.querySelector("#search-books input");

//دکمه اضافه
link.addEventListener("click", function (e) {
  let spanName = document.createElement("span");
  spanName.className = "name name-classes";
  spanName.innerHTML = textInput.value;

  let li = document.createElement("li");
  li.className = "li-classes";
  li.appendChild(spanName);
  li.innerHTML += spanDelete;

  ul.appendChild(li);

  saveLocalStorage(textInput.value);

  textInput.value = "";
  e.preventDefault();
});

function saveLocalStorage(book) {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = localStorage.getItem("books").split(",");
  }

  books.push(book);
  localStorage.setItem("books", books);
}

document.addEventListener("DOMContentLoaded", function (e) {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = localStorage.getItem("books").split(",");
  }

  for (let book of books) {
    let spanName = document.createElement("span");
    spanName.className = "name name-classes";
    spanName.innerHTML = book;

    let li = document.createElement("li");
    li.className = "li-classes";
    li.appendChild(spanName);
    li.innerHTML += spanDelete;

    ul.appendChild(li);
  }
  e.preventDefault();
});

//دکمه حذف
ul.addEventListener("click", function (e) {
  // if (e.target.className === "delete") {
  if (e.target.className.includes("delete")) {
    e.target.parentElement.remove(); //parentElement=li
    removeFromLocalStorage(e.target.parentElement.firstChild.innerHTML);
  }
  e.preventDefault();
});

function removeFromLocalStorage(book) {
  let books;

  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = localStorage.getItem("books").split(",");
  }

  for (let i = 0; i < books.length; i++) {
    if (books[i] === book) books.splice(i, 1);
  }

  if (books.length === 0) localStorage.clear();
  else localStorage.setItem("books", books);
}

checkBox.addEventListener("change", function (e) {
  if (checkBox.checked) ul.style.display = "none";
  else ul.style.display = "block";
});

//سرچ
searchInput.addEventListener("keyup", function (e) {
  for (let li of ul.children) {
    if (li.firstElementChild.textContent.indexOf(searchInput.value) !== -1)
      li.style.display = "flex"; //block
    else li.style.display = "none";
  }
});
