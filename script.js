let addBookForm = document.getElementById("add-book-form");
let bookTitleError=document.getElementById("book-title-error");
let bookAuthorError=document.getElementById("book-author-error")
let bookPagesError=document.getElementById("book-pages-error")





let first = new Book("Game of Thrones", "JK Rowling", "1500", "Read")
let second = new Book("Ga", "JK ", "500", "Read")
let third = new Book("Thrones", "Rowling", "700", "Read")
let fourth = new Book("of ", "K Ro", "15", "Read")

let myLibrary = [];

let index = 0;


const cardContainer= document.querySelector(".card-container");



let DeleteButtons = []

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(HandleSubmission()){
    updateCards();}
})


/*function updateDeleteButtons(){
    let newDelButton = document.getElementById(`trash-buttonn${index}`)
    newDelButton.addEventListener("click" , (e) => handleDelClick(e));
    DeleteButtons.push(newDelButton);
    console.log(DeleteButtons[DeleteButtons.length-1].id);
}



function handleDelClick(e) {
    indexPos = e.target.id[e.target.id.length-1]
    console.log(e.target.id);
}
*/



function DeleteCard(id) {
    let cardNode = document.getElementById(id).parentElement.parentElement
    console.log(cardNode);
    cardNode.remove();
}

function updateRead(id) {
    let readNode = document.getElementById(id);
    if (readNode.classList.contains('read-yes')) {
        readNode.classList.remove('read-yes')
        readNode.classList.add('read-no')
        readNode.textContent = "Not Read"
    }
    else{
        readNode.classList.remove('read-no')
        readNode.classList.add('read-yes')  
        readNode.textContent = "Read"; 
    }
}

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return (this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read);
    }
}

function HandleSubmission(){
    let BookTitle = document.getElementById("book-title").value
    let BookAuthor = document.getElementById("book-author").value
    let BookPages = document.getElementById("no-pages").value
    let BookRead = document.getElementById("read").checked
    let valid = validateData(BookTitle,BookAuthor,BookPages);
    if (valid === true) {
        index++;
        closeForm();
        let book = new Book(BookTitle,BookAuthor,BookPages,BookRead);
        myLibrary.push(book);
        return true
    }
}

function openForm() {
    document.getElementById("add-book-form").style.visibility = "visible";
    document.getElementById("add-book-form").style.opacity = "1";
    bookTitleError.textContent = "";
    bookAuthorError.textContent = "";
    bookPagesError.textContent = "";
}

function closeForm() {
    document.getElementById("add-book-form").style.visibility = "hidden";
    document.getElementById("add-book-form").style.opacity = "0";
    addBookForm.reset();
}

function validateTitle(BookTitle) {
    if (BookTitle==='') {
        bookTitleError.textContent = "*Please fill this in"
        return false
    }
    else{
        bookTitleError.textContent = "";
        return true;
    }
}

function validateAuthor(BookAuthor){
    if (BookAuthor==='') {
        bookAuthorError.textContent = "*Please fill this in"
        return false
    }


    else{
        bookAuthorError.textContent = ""
        return true;
    }
}


function validatePages(BookPages) {
    if (BookPages==='') {
        bookPagesError.textContent = "*Please fill this in"
        return false
    }


    else{
        bookPagesError.textContent = ""
        return true;
    }
}

function validateData(BookTitle,BookAuthor,BookPages) {

    validateTitle(BookTitle);
    validateAuthor(BookAuthor);
    validatePages(BookPages);

    if (validateTitle(BookTitle)===false || validateAuthor(BookAuthor)===false || validatePages(BookPages)===false){
        return false;
    }

    else{
        return true;
    }
}

function updateCards() {
    myLibrary.map((book,index1) => {
        if (index1 === myLibrary.length-1) {
        const NewCard = document.createElement("div");
        NewCard.classList.add("card");
        if (book.read) {
        NewCard.innerHTML = `
        <div style="display:flex; justify-content: space-between;"> <div> Book title: </div> <button id="trash-buttonn${index}"  onclick="DeleteCard(this.id)" style="background: none; border: none;"><ion-icon name="trash-outline" style="color: red; font-size: 24px;"></ion-icon></button></div>
        <div class="card-title"> ${book.title} </div>  
        <div> Book Author: </div>
        <div class="card-author">  ${book.author} </div>
        <div> No. Pages: </div>
        <div class="card-pages"> ${book.pages} </div>
        <div>
            <button  onclick="updateRead(this.id)" class="read-button read-yes" id="book${index}"> Read </button>
        </div>  
        `}

        else{
            NewCard.innerHTML = `
            <div style="display:flex; justify-content: space-between;"> <div> Book title: </div> <button id="trash-buttonn${index}" onclick="DeleteCard(this.id)" style="background: none; border: none;"><ion-icon name="trash-outline" style="color: red; font-size: 24px;"></ion-icon></button></div>
            <div class="card-title"> ${book.title} </div>  
            <div> Book Author: </div>
            <div class="card-author">  ${book.author} </div>
            <div> No. Pages: </div>
            <div class="card-pages"> ${book.pages} </div>
            <div>
                <button  onclick="updateRead(this.id)" class="read-button read-no" id="book${index}"> Not Read </button>
            </div>  
        `}
        cardContainer.appendChild(NewCard);}
    })
}
