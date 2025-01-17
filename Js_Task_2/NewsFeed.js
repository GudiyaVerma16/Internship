const articles = [];
const articlesPerPage = 4;
let currentPage = 1;

const form = document.getElementById("article-form");
const newsFeed = document.getElementById("news-feed");
const pagination = document.getElementById("pagination");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("image-url").value;

  articles.push({ title, description, imageUrl });

  form.reset();

  renderArticles();
  renderPagination();
});

function renderArticles() {
  newsFeed.innerHTML = "";

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  currentArticles.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("article");

    if (article.imageUrl) {
      const img = document.createElement("img");
      img.src = article.imageUrl;
      articleDiv.appendChild(img);
    }

    const title = document.createElement("h3");
    title.textContent = article.title;
    articleDiv.appendChild(title);

    const description = document.createElement("p");
    description.textContent = article.description;
    articleDiv.appendChild(description);

    newsFeed.appendChild(articleDiv);
  });
}

function renderPagination() {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    currentPage--;
    renderArticles();
    renderPagination();
  });
  pagination.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderArticles();
      renderPagination();
    });
    pagination.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    currentPage++;
    renderArticles();
    renderPagination();
  });
  pagination.appendChild(nextButton);
}

renderArticles();
renderPagination();
