fetch("https://api.quotable.io/random")
  .then((res) => res.json())
  .then((quoteData) => {
    renderQuote(quoteData);
  });

function renderQuote(quoteData) {
  const p = document.querySelector("blockquote p");
  p.textContent = `"${quoteData.content}"`;
  const author = document.querySelector("#author");
  author.textContent = `━ ${quoteData.author}`;

  p.addEventListener("mouseenter", () => {
    p.style.color = "#00796B";
  });

  p.addEventListener("mouseleave", () => {
    p.style.color = "#212121";
  });
}

fetch("https://api.quotable.io/tags")
  .then((res) => res.json())
  .then((list) => renderTags(list));

function renderTags(list) {
  list.forEach((tag) => {
    const ul = document.querySelector("div ul");
    const li = document.createElement("li");
    li.textContent = tag.name;
    ul.append(li);
  });
}
