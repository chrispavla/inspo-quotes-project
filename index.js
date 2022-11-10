let newQuote = document.querySelector("#new-quote-btn");

function fetchQuotes() {
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((quoteData) => {
      renderQuote(quoteData);
    });
}

function renderQuote(quoteData) {
  const p = document.querySelector("blockquote p");
  p.textContent = `"${quoteData.content}"`;
  const author = document.querySelector("#author");
  author.textContent = `━ ${quoteData.author}`;
  const tags = document.querySelector("#tags");
  tags.textContent = `# ${quoteData.tags}`;
  p.addEventListener("mouseenter", () => {
    p.style.color = "#00796B";
    p.style.fontWeight = "700";
  });

  p.addEventListener("mouseleave", () => {
    p.style.color = "#212121";
    p.style.fontWeight = "";
  });

  const tweetButton = document.getElementById("tweet");
  tweetButton.href =
    "https://twitter.com/intent/tweet?text=" +
    quoteData.content +
    " ~ " +
    quoteData.author;
}

newQuote.addEventListener("click", () => fetchQuotes());

fetchQuotes();

let form1 = document.querySelector("#search-form");
form1.addEventListener("input", (e) => {
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
          quotesLI.className = "styling";
          quotesLI.textContent = `"${quote.content}" 
          by ${quote.author}`;
          quotesUL.append(quotesLI);
          searchContainer.append(quotesUL, quotesLI);
        });
      });
  }
});

form1.addEventListener("submit", (e) => {
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
        quotesLI.className = "styling";
        quotesLI.textContent = `"${quote.content}" 
        by ${quote.author}`;
        quotesUL.append(quotesLI);
        searchContainer.append(quotesUL, quotesLI);
      });
    });
});

let tagQuotes;
let filterArray;
let tagResult;
let dropdown = document.querySelector("#keyword-dropdown");

dropdown.addEventListener("change", handleChange);

function handleChange(e) {
  tagResult = e.target.value;
  tagResult.toLowerCase();

  fetch(`http://api.quotable.io/quotes?tags=${tagResult}`)
    .then((res) => res.json())
    .then((data) => renderKeywordQuotes(data));
}
function renderKeywordQuotes(data) {
  tagQuotes = data.results;
  filterArray = tagQuotes.filter((quote) => quote.tags.includes(tagResult));

  let quotesContainer = document.querySelector("#quotes-container");
  quotesContainer.textContent = "";

  filterArray.forEach((quote) => {
    let quotesUL = document.createElement("ul");
    let quotesLI = document.createElement("li");
    quotesLI.className = "styling";
    quotesLI.textContent = `"${quote.content}" 
    by ${quote.author}`;
    quotesUL.append(quotesLI);
    quotesContainer.append(quotesUL, quotesLI);
  });
}

let form = document.querySelector("#reviews");
form.addEventListener("submit", (event) => buildToDo(event));

function buildToDo(event) {
  event.preventDefault();
  let tags = event.target.tagsForm.value;
  let quote = event.target.quoteForm.value;
  let authorInput = event.target.authorForm.value;

  let p = document.createElement("p");
  p.className = "editor fav favQuote";
  let btn = document.createElement("button");
  btn.addEventListener("click", handleDelete);
  btn.textContent = "Delete";
  btn.className = "submit-button fav favButton";
  p.textContent = `"${quote}" ━  ${authorInput} #${tags}
  `;
  p.appendChild(btn);
  document.querySelector("#grateful").appendChild(p);

  form.reset();
}

function handleDelete(e) {
  e.target.parentNode.remove();
}
