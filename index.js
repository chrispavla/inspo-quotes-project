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
}
