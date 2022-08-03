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