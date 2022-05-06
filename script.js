function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}
function resetForm() {
    title.value = null;
    author.value = null;
    pages.value = null;
    isRead.value = null;
}
function removeAllCards() {
    const allBooks = document.querySelectorAll('.bookCard');
    allBooks.forEach((book) => {
        main.removeChild(book);
    });
}
function addAllCards() {
    for (i = 0; i < bookList.length; i++) {
        newBookCard = cardSample.cloneNode(true);
        const cardTitle = newBookCard.querySelector('.cardTitle');
        const cardAuthor = newBookCard.querySelector('.cardAuthor');
        const cardPages = newBookCard.querySelector('.cardPages');
        const cardIsRead = newBookCard.querySelector('.cardIsRead');
        cardTitle.textContent = bookList[i].title
        cardAuthor.textContent = bookList[i].author;
        cardPages.textContent = bookList[i].pages + " pages";
        cardIsRead.textContent = bookList[i].isRead ? "Read" : "Not Read";
        cardIsRead.style.color = bookList[i].isRead ? "#30B06A" : "#ee6055";
        newBookCard.classList.remove('cardSample');
        newBookCard.dataset.index = i;
        // Buttons setup
        cardIsRead.addEventListener('click', () => {
            targetIndex = cardIsRead.parentNode.dataset.index;
            bookList[targetIndex].isRead = bookList[targetIndex].isRead ? false : true;
            removeAllCards();
            addAllCards();
        });
        const removeButton = newBookCard.querySelector('.removeButton');
        removeButton.addEventListener('click', () => {
            targetIndex = removeButton.parentNode.parentNode.dataset.index;
            bookList.splice(targetIndex, 1);
            removeAllCards();
            addAllCards();
        });
        const editButton = newBookCard.querySelector('.editButton');
        editButton.addEventListener('click', () => {
            addButton.removeEventListener('click', addButtonDefault);
            targetIndex = editButton.parentNode.parentNode.dataset.index;
            title.value = bookList[targetIndex].title;
            author.value = bookList[targetIndex].author;
            pages.value = bookList[targetIndex].pages;
            isRead.checked = bookList[targetIndex].isRead;
            popUpSpace.classList.remove('hidden');
            legend.textContent = "Edit the book's info";
            addButton.textContent = "Edit";
            addButton.addEventListener('click', (e) => {
                legend.textContent = "Insert the book's info";
                addButton.textContent = "Add";
                if (e.isTrusted === true || e.cancelable === true) {
                    if (title.value.length > 0 && title.value.length < 30) {
                        if (author.value.length > 0 && author.value.length < 30) {
                            if (parseInt(pages.value) > 0 && parseInt(pages.value) < 1000000) {
                                bookList[targetIndex].title = title.value;
                                bookList[targetIndex].author = author.value;
                                bookList[targetIndex].pages = pages.value;
                                bookList[targetIndex].isRead = isRead.checked;
                                removeAllCards();
                                addAllCards();
                                resetForm();
                                popUpSpace.classList.add('hidden');
                            }
                        }
                    }
                }
            }, { once: true })
        });
        main.appendChild(newBookCard);
    }
}
const addButtonDefault = function (e) {
    if (e.isTrusted === true || e.cancelable === true) {
        if (title.value.length > 0 && title.value.length < 30) {
            if (author.value.length > 0 && author.value.length < 30) {
                if (parseInt(pages.value) > 0 && parseInt(pages.value) < 1000000) {
                    const newBook = new Book(title.value, author.value, pages.value, isRead.checked);
                    bookList.push(newBook);
                    removeAllCards();
                    addAllCards();
                    resetForm();
                    popUpSpace.classList.add('hidden');
                }
            }
        }
    }
}


const bookList = [];
const legend = document.querySelector('legend');
const main = document.querySelector('main');
const cardSample = document.querySelector('.cardSample');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const isRead = document.querySelector('#isRead');
const popUpSpace = document.querySelector("#popUpSpace");
popUpSpace.addEventListener('click', (e) => {
    if (e.target === popUpSpace) {
        fakeClick = new Event('click');
        addButton.dispatchEvent(fakeClick);
        resetForm();
        popUpSpace.classList.add('hidden');
    }
})
const cancelButton = document.querySelector('#buttonReset');
cancelButton.addEventListener('click', () => {
    resetForm();
    popUpSpace.classList.add('hidden');
})
const addButton = document.querySelector('#buttonSubmit');
addButton.addEventListener('click', addButtonDefault);
const plusButton = document.querySelector("#plusButton");
plusButton.addEventListener('click', () => {
    popUpSpace.classList.remove('hidden');
    addButton.addEventListener('click', addButtonDefault);
})