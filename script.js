function addCard() {

}

const popUpSpace = document.querySelector("#popUpSpace");
popUpSpace.addEventListener('click', (e) => {
    if (e.target === popUpSpace) {
        popUpSpace.classList.toggle('hidden');
    }
})
const plusButton = document.querySelector("#plusButton");
plusButton.addEventListener('click', () => {
    popUpSpace.classList.toggle('hidden');
})