const myLibrary = []

function book(name, pages, author, read){
    return{
        name,
        pages,
        author,
        read,
    }
}

let LivroTeste = new book("Memórias Póstumas de Brás Cubas", 320, "Machado de Assis", "on")

const form = document.querySelector('.form')
const Library = document.querySelector('.library')

form.addEventListener("submit", function (e) {
    e.preventDefault() // This prevents the window from reloading
    
    let formdata = new FormData(this);
    let Title = formdata.get("title");
    let Author = formdata.get("author");
    let Pages = formdata.get("pages");
    let Read = formdata.get("read");
    addBookToLibrary(Title, Author, Pages, Read);
    });

function addBookToLibrary(Title, Author, Pages, Read){
    let livro = new book(Title, Pages, Author, `${Read}`)
    console.log(livro)
    displayBooks(livro)
    CloseForm()
}

function displayBooks(item){

    const BookCard = document.createElement('div')
    BookCard.classList.add('book')
    BookCard.setAttribute('id', `${myLibrary.indexOf(item)}`)

    const BookName = document.createElement('div')
    BookName.classList.add('book-name')
    const BookNameSpan = document.createElement('span')
    BookNameSpan.textContent = `${item.name}`
    BookName.appendChild(BookNameSpan)

    const BookAuthor = document.createElement('div')
    BookAuthor.classList.add('book-author')
    const BookAuthorSpan = document.createElement('span')
    BookAuthorSpan.textContent = `${item.author}`
    BookAuthor.appendChild(BookAuthorSpan)

    const BookPages = document.createElement('div')
    BookPages.classList.add('book-pages')
    const BookPagesSpan = document.createElement('span')
    BookPagesSpan.textContent = `${item.pages} pages`
    BookPages.appendChild(BookPagesSpan)

    const BookReadStatus = document.createElement('div')
    BookReadStatus.classList.add('BookReadStatus')
    const BookStatusButton = document.createElement('button')
    BookStatusButton.classList.add('BookStatusButton')
    BookStatusButton.onclick = () => {ReadStatus(item, BookName, BookStatusButton)}
    BookReadStatus.appendChild(BookStatusButton)
    ReadStatus(item, BookName, BookStatusButton)
    

    const RemoveBook = document.createElement('div') 
    RemoveBook.classList.add('RemoveBook')
    const RemoveBookButton = document.createElement('button')
    RemoveBookButton.classList.add('RemoveBookButton')
    RemoveBookButton.textContent = 'Remove Book'
    RemoveBookButton.onclick = () => {ItemRemove(myLibrary.indexOf(item), BookCard.id)}
    RemoveBook.appendChild(RemoveBookButton)


    BookCard.appendChild(BookName)
    BookCard.appendChild(BookAuthor)
    BookCard.appendChild(BookPages)
    BookCard.appendChild(BookReadStatus)
    BookCard.appendChild(RemoveBook)

    Library.appendChild(BookCard)
}

function ItemRemove(ItemID, BookCardID){
    myLibrary.splice(ItemID, 1)
    let RemovedBook = document.getElementById(BookCardID)
    RemovedBook.style.opacity = '0'
    RemovedBook.style.visibility = 'hidden'
    
    setTimeout(() => {
        Library.removeChild(RemovedBook)
    }, 1000);
    
}

function ReadStatus(item, bookname, BookStatusButton){
    console.log("Rodou?")
    if(item.read === 'null'){
        console.log("Caiu em null")
        item.read = 'on'
        console.log(item.read)
        BookStatusButton.textContent = 'Not Read'
        bookname.style.backgroundColor = '#FF8484'
    }

    else if(item.read === 'on'){
        console.log("Caiu em On")
        item.read = 'null'
        console.log(item.read)
        BookStatusButton.textContent = 'Read'
        bookname.style.backgroundColor = '#88FF88'
    }
}

function CloseForm(){
    let FormDisplay = document.querySelector('.add-form')
    let body = document.querySelector('body')
    body.classList.remove('pageblur')
    body.classList.add('pageblur-remove') 
    FormDisplay.style.visibility = 'hidden'
    FormDisplay.style.opacity = '0'
}

function OpenForm(){
    let FormDisplay = document.querySelector('.add-form')
    let body = document.querySelector('body')
    body.classList.remove('pageblur-remove')
    body.classList.add('pageblur')
    FormDisplay.style.visibility = 'visible'
    FormDisplay.style.opacity = '1'
    FormDisplay.style.blur = '0px'
}

for(let item in myLibrary){
    displayBooks(item)
}