const readList = document.getElementById("read-list");
const unreadList = document.getElementById("unread-list");
const insertButton = document.getElementById("insert-button");

const data = localStorage.getItem("books");
let books = JSON.parse(data);

const createElement = (id, titleValue, authorValue, yearValue, isCompleted) => {
  const div = document.createElement("DIV");
  div.setAttribute("class", "book-item");

  const idInput = document.createElement("INPUT");
  idInput.setAttribute("type", "hidden");
  idInput.value = id;

  const title = document.createElement("H4");
  title.setAttribute("class", "text-bold");
  title.innerText = titleValue;

  const author = document.createElement("P");
  author.innerText = "Penulis: " + authorValue;

  const year = document.createElement("P");
  year.innerText = "Tahun: " + yearValue;

  const updateButton = document.createElement("BUTTON");
  updateButton.setAttribute("class", "btn btn-orange update-button");
  updateButton.addEventListener("click", (e) =>
    updateIsCompletedItem(e, isCompleted)
  );
  updateButton.innerText =
    isCompleted === true ? "Belum Selesai Dibaca" : "Selesai Dibaca";

  const deleteButton = document.createElement("BUTTON");
  deleteButton.setAttribute("class", "btn btn-delete delete-button");
  deleteButton.addEventListener("click", deleteItem);
  deleteButton.innerText = "Hapus";

  div.appendChild(idInput);
  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(year);
  div.appendChild(updateButton);
  div.appendChild(deleteButton);

  if (isCompleted) readList.appendChild(div);
  else unreadList.appendChild(div);
};

const deleteItem = (e) => {
  const parent = e.target.parentNode;
  const itemId = parent.children[0].value;

  deleteItemFromArrayById(itemId);

  parent.remove();
};

// Show Book List on Page Load
books.map((book) => {
  createElement(book.id, book.title, book.author, book.year, book.isCompleted);
});

const deleteItemFromArrayById = (id) => {
  books = books.filter((book) => book.id != id);

  localStorage.setItem("books", JSON.stringify(books));
};

const updateIsCompletedStatus = (id, isCompleted) => {
  let getBook;

  books.map((book) => {
    if (book.id == id) {
      book.isCompleted = isCompleted;
      getBook = book;
    }
  });

  localStorage.setItem("books", JSON.stringify(books));

  return getBook;
};

const updateIsCompletedItem = (e, isCompleted) => {
  const parent = e.target.parentNode;
  const itemId = parent.children[0].value;

  const updatedItem = updateIsCompletedStatus(
    itemId,
    isCompleted == true ? false : true
  );

  parent.remove();

  createElement(
    updatedItem.id,
    updatedItem.title,
    updatedItem.author,
    updatedItem.year,
    updatedItem.isCompleted
  );
};

// Insert Book Button On Click Listener
insertButton.addEventListener("click", (e) => {
  const titleValue = document.getElementById("title").value;
  const authorValue = document.getElementById("author").value;
  const yearValue = document.getElementById("year").value;
  const isCompleted = document.getElementById("isCompleted").checked;
  const id = Date.now();

  books.push({
    id: id,
    title: titleValue,
    author: authorValue,
    year: yearValue,
    isCompleted: isCompleted,
  });

  localStorage.setItem("books", JSON.stringify(books));

  createElement(id, titleValue, authorValue, yearValue, isCompleted);

  e.preventDefault();
});
