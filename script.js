
  const bookForm = document.getElementById("bookForm");
  const bookList = document.getElementById("bookList");
  const search = document.getElementById("search");
  const themeToggle = document.getElementById("themeToggle");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const categoryInput = document.getElementById("category");
  const statusInput = document.getElementById("status");

  let books = JSON.parse(localStorage.getItem("books")) || [];

  function renderBooks(filter = "") {
    bookList.innerHTML = "";
    books
      .filter(b =>
        b.title.toLowerCase().includes(filter.toLowerCase()) ||
        b.author.toLowerCase().includes(filter.toLowerCase())
      )
      .forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.innerHTML = `
          <div>
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p><strong>Status:</strong> ${book.status}</p>
          </div>
          <div class="actions">
            <button onclick="deleteBook(${index})">Delete</button>
          </div>
        `;
        bookList.appendChild(card);
      });
  }

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBook = {
      title: titleInput.value,
      author: authorInput.value,
      category: categoryInput.value,
      status: statusInput.value
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    bookForm.reset();
    renderBooks();
  });

  function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
  }

  search.addEventListener("input", (e) => renderBooks(e.target.value));

  // Dark/Light Mode Toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  });

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  }

  // Initial render
  renderBooks();

