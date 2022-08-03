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

let form = document.querySelector("#search-form");
form.addEventListener("input", (e) => {
  e.preventDefault();
  let searchResult = document.querySelector("#search-bar").value.toLowerCase();
  let searchContainer = document.querySelector("#searchResultContainer");
  searchContainer.textContent = "";
  if (searchResult === "") {
    console.log("undefined");
  } else {
    fetch(
      `http://api.quotable.io/search/quotes?query=${searchResult}&fields=author&limit=3`
    )
      .then((res) => res.json())
      .then((searchData) => {
        searchData.results.forEach((quote) => {
          let quotesUL = document.createElement("ul");
          let quotesLI = document.createElement("li");
          quotesLI.textContent = `${quote.content} by ${quote.author}`;
          quotesUL.append(quotesLI);
          searchContainer.append(quotesUL, quotesLI);
        });
      });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchResult = document.querySelector("#search-bar").value.toLowerCase();
  let searchContainer = document.querySelector("#searchResultContainer");
  searchContainer.textContent = "";
  fetch(
    `http://api.quotable.io/search/quotes?query=${searchResult}&fields=author`
  )
    .then((res) => res.json())
    .then((searchData) => {
      searchData.results.forEach((quote) => {
        let quotesUL = document.createElement("ul");
        let quotesLI = document.createElement("li");
        quotesLI.textContent = `${quote.content} by ${quote.author}`;
        quotesUL.append(quotesLI);
        searchContainer.append(quotesUL, quotesLI);
      });
    });
});

let tagQuotes;
let filterArray;
let tagResult;
let dropdown = document.querySelector("#keyword-dropdown");

fetch(`http://api.quotable.io/quotes?tags=${tagResult}`)
  .then((res) => res.json())
  .then((data) => renderKeywordQuotes(data));

function renderKeywordQuotes(data) {
  tagQuotes = data.results;
  filterArray.forEach((quote) => {
    let quotesContainer = document.querySelector("#quotes-container");
    let quotesUL = document.createElement("ul");
    let quotesLI = document.createElement("li");
    quotesLI.textContent = `${quote.content} by ${quote.author}`;
    quotesUL.append(quotesLI);
    quotesContainer.append(quotesUL, quotesLI);
  });
}

dropdown.addEventListener("change", handleChange);

function handleChange(e) {
  tagResult = e.target.value;
  filterArray = tagQuotes.filter((quote) => quote.includes(tagResult));
  console.log(filterArray);
}
