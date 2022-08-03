let newQuote = document.querySelector('#new-quote-btn')
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
    }

newQuote.addEventListener('click', () => fetchQuotes())

fetchQuotes()

let form = document.querySelector('#reviews')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  buildToDo(e.target.text.value)
  form.reset()
})

function buildToDo(todo) {
  let p = document.createElement('p')
  let btn = document.createElement('button')
  btn.addEventListener('click', handleDelete)
  btn.textContent = 'x '
  p.textContent = `${todo}`
  p.appendChild(btn) 
  document.querySelector('#grateful').appendChild(p)
}

function handleDelete(e) {
  e.target.parentNode.remove()
}

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

// fetch("https://api.quotable.io/tags")
//   .then((res) => res.json())
//   .then((list) => renderTags(list));

// function renderTags(list) {
//   list.forEach((tag) => {
//     const ul = document.querySelector("div ul");
//     const li = document.createElement("li");
//     li.textContent = tag.name;
//     ul.append(li);
//   });
// }

