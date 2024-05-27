document.addEventListener("DOMContentLoaded", function() {

const Title = document.querySelector("#title")
const Author = document.querySelector("#author")
const Gender = document.querySelector("#gender")
const Year = document.querySelector("#year")
const form = document.querySelector("#form")
const search = document.querySelector("#search")
const searchBtn = document.querySelector("#searchBtn")
const results = document.querySelector("#results")
const Rating = document.querySelector("#rating")
const sortCriteria = document.querySelector("#sortCriteria")

function addToScreen(book, index) {
    console.log("Adding to screen:", book)
    const displayArea = document.createElement('div')
    displayArea.innerHTML = `
        <p>Title: ${book.Title}</p>
        <p>Author: ${book.Author}</p>
        <p>Gender: ${book.Gender}</p>
        <p>Year: ${book.Year}</p>
        <p>Rating: ${book.Rating}</p>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
    `
    results.appendChild(displayArea)
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const obj_book = {
        Title: Title.value,
        Author: Author.value,
        Gender: Gender.value,
        Year: Year.value,
        Rating: Rating.value
    }

    saveBook(obj_book)
    form.reset()

})


function saveBook(book) {
    let books = JSON.parse(localStorage.getItem("books")) || []
    books.push(book)
    localStorage.setItem("books", JSON.stringify(books))

}

window.deleteBook = function(index){
    let books = JSON.parse(localStorage.getItem("books")) || []
    books.splice(index,1)
    localStorage.setItem("books", JSON.stringify(books))

    retrieveInfo()
}

window.editbook = function(index){
    let books = JSON.parse(localStorage.getItem("books")) || []
    const book = books [index]
    Title.value = book.title
    Author.value = book.Author
    Gender.value = book.Gender
    Year.value = book.Year
    Rating.value = book.Rating
    books.splice[index, 1]
    localStorage.setItem("books", JSON.stringify(books))

    retrieveInfo
}

function retrieveInfo() {
    results.innerHTML = ''
    const books = JSON.parse(localStorage.getItem("books")) || []
    books.forEach((book , index) => {
        addToScreen(book,index)
    })
}

searchBtn.addEventListener("click", () => {
    const query = search.value.toLowerCase()

    results.innerHTML = ''
    

    const books = JSON.parse(localStorage.getItem("books")) || []
    const filteredBooks = books.filter(book =>
        book.Title.toLowerCase().includes(query) || 
        book.Author.toLowerCase().includes(query) ||
        book.Gender.toLowerCase().includes(query)
    )

    const sortCriteriaValue = sortCriteria.value
    if(sortCriteriaValue === "title"){
        filteredBooks.sort((a, b)=> a.title.localecompare(b.title))
    }else if(sortCriteriaValue === "author"){
        filteredBooks.sort((a, b)=> a.author.localecompare(b.author))
    } else if (sortCriteriaValue === "year") {
        filteredBooks.sort((a, b) => a.year - b.year)
    }

    filteredBooks.forEach((book, index) => {
        addToScreen(book, index)
    })
})

retrieveInfo()


})
