let addBookForm = document.getElementById("add-book");
let checkboxReaded = 0;
let bookList = document.getElementById("book-list");
let myLibrary = [];

// add book form submit
addBookForm.addEventListener('submit', (e) => {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let realeaseDate = document.getElementById("date").value;

    const newBook = new Book(title, author, pages, checkboxReaded, realeaseDate);
    newBook.addBookToLibrary();

    document.getElementById("add-book").reset();

    showBook(newBook.getBook());

    e.preventDefault();
});

// book readed click
function bookReadedClick(click){
    let id = click.getAttribute("data-id");
    let readed = click.checked ? 1 : 0;
    readed != myLibrary.find(e => e.id == id ? e.readed : null) ? myLibrary.find(e => e.id == id ? e.readed = readed : null) : null;
}

// handle checkbox form click
function handleCheckboxClick(click){
    if(click.checked){
        checkboxReaded = 1;
    }
}

//delete book

function deleteBook(deleteBook){
    let id = deleteBook.getAttribute("data-id");
    let comfirm = window.confirm('Do you want to delete this book ? ');
    comfirm ? (() => {
        myLibrary.splice(myLibrary.indexOf(myLibrary.find(e => e.id == id)), 1); 
        bookList.deleteRow(id-1);
    })() : null;
}

// show added book 
function showBook(obj){
    // same as showAllBook()
    let row = bookList.insertRow();
    for(const [key, value] of Object.entries(obj)){
        key == 'id' ? row.insertCell().innerHTML = `${value+1}`
        : key == "readed" && value == 1 ? row.insertCell().innerHTML = `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="bookRead" data-id="${obj.id}" onclick="bookReadedClick(this)" checked></div>`
        : key == "readed" && value == 0 ? row.insertCell().innerHTML = `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="bookRead"  onclick="bookReadedClick(this)"></div>`
        : row.insertCell().innerHTML = `${value}`;
    } 
    row.insertCell().innerHTML = `<button type="button" class="text-danger btn-close" data-id="${obj.id}" onclick="deleteBook(this)"></button>`
}

// show all book
function showAllBook(){
    // loop thougth object in array
    myLibrary.map((e, i) => (()=>{
        // insert row form bookList DOM
        let row = bookList.insertRow(i);
        // loop thought object and display table cell 
        for(const [key, value] of Object.entries(e)){
            key == "readed" && value == 1 ? row.insertCell().innerHTML = `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="bookRead" data-id="${e.id}" onclick="bookReadedClick(this)" checked></div>`
            : key == "readed" && value == 0 ? row.insertCell().innerHTML = `<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="bookRead"  onclick="bookReadedClick(this)"></div>`
            : row.insertCell().innerHTML = `${value}`;
        }
        // add delete button at the end of row
        row.insertCell().innerHTML = `<button type="button" class="text-danger btn-close" data-id="${e.id}" onclick="deleteBook(this)"></button>`;
    })())
}

// Book constructor
function Book(title, author, pages, readed, realeaseDate){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
    this.realeaseDate = realeaseDate;
    this.bookId = myLibrary.length;
};

// add book prototype
Book.prototype.addBookToLibrary = function(){
    myLibrary.push({'id' : this.bookId,'title' : this.title, 'author' : this.author, 'pages' : this.pages, 'readed' : this.readed, 'realeaseDate' : this.realeaseDate})
};

//get book prototype
Book.prototype.getBook = function(){
    return {'id' : this.bookId, 'title' : this.title, 'author' : this.author, 'pages' : this.pages, 'readed' : this.readed, 'realeaseDate' : this.realeaseDate}
}