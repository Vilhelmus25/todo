'use strict';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const time = new Date();
const day = dayNames[time.getDay()];                        // a konkrét napot így nyerjük ki
const tempStringDate = time.toLocaleDateString('rus');      // dd.mm.yyyy
const date = tempStringDate.replaceAll('.', '-');           // így már dd-mm-yyyy
let todoItemsCount = 0;

const daySelector = document.querySelector('.day');
const dateSelector = document.querySelector('.date');
const chillPic = document.querySelector('.cheers');
const chillText = document.querySelector('.chill');
daySelector.textContent = day;
dateSelector.textContent = date;

const textArea = document.querySelector('#input__area');
const addButton = document.querySelector('.input__add');

//const divList = document.createElement('div');
const divList = document.querySelector('.list');
const pendingItemsCounter = document.createElement('p');
pendingItemsCounter.classList.add('pendingsCounter');
const pendingItemsCounterSelector = document.querySelector('.pendingsCounter');


let textAreaContent = '';
addButton.addEventListener('click', (event) => {
    textAreaContent = textArea.value;
    todoItemsCount += 1;
    createTodoElement(textAreaContent);
    //console.log(textAreaContent);
});

const createTodoElement = (input) => {
    if (todoItemsCount > 0) {

        // hide img and text

        if (todoItemsCount == 1) {
            hideChill("hidden");
            // showHideClearDiv();
            // creating Bottomdiv and textbuttons 
            // div styles
            createBottomDiv();

            //querySelectors/eventHandling
            const showHideSelector = document.querySelector('.showHide');
            const clearAllSelector = document.querySelector('.clearAll');
            showHideSelector.addEventListener('click', (event) => {
                showHideEvent();
                //  ...
            });
            clearAllSelector.addEventListener('click', (event) => {
                clearAllEvent();
                //  ...
            });
        }

        if (todoItemsCount >= 1) {
            //divList.classList.add('todos');
            divList.appendChild(pendingItemsCounter);

            console.log(refreshPendingItemsCounter());
            pendingItemsCounter.textContent = refreshPendingItemsCounter();

            divList.style.display = "flex";
            divList.style.justifyContent = "center";
            divList.style.alignContent = "center";
            pendingItemsCounter.style.lineheight = "10rem";

        }

    } else {
        hideChill("visible");       // set visible the image and text
        return;
    }

}

const hideChill = (vision) => {
    // chillPic.style.visibility = `${vision}`;
    divList.removeChild(chillPic);
    //chillText.style.visibility = `${vision}`;
    divList.removeChild(chillText);
}

const showHideEvent = () => {
    console.log("object1");
    return;
}
const clearAllEvent = () => {
    console.log("object2");
    return;
}

const createBottomDiv = () => {
    const divFunctions = document.createElement('div');
    divFunctions.classList = 'showHideClear';
    document.body.children.item(1).appendChild(divFunctions);
    let showHide = document.createElement('p');
    const clearAll = document.createElement('p');
    showHide.textContent = 'Show Complete';
    showHide.classList = 'showHide';
    clearAll.textContent = 'Clear All';
    clearAll.classList = 'clearAll';
    divFunctions.appendChild(showHide);             // hozzá csapjuk a divhez a két elemet
    divFunctions.appendChild(clearAll);
    divFunctions.style.display = "flex";
    divFunctions.style.justifyContent = "center";
    divFunctions.style.alignContent = "center";
    divFunctions.style.margin = "3rem";
    // text styles
    showHide.style.marginRight = "2rem";
    clearAll.style.marginLeft = "2rem";
    // let cssTemp = `'.'${showHide}:hover{boxShadow: 0px 0px 5px #5f3300;transition: boxshadow 0.1 ease-in-out;}`
    // showHide.style.cssText = cssTemp;
    showHide.style.cursor = "pointer";
    clearAll.style.cursor = "pointer";

}

const refreshPendingItemsCounter = () => {
    const tempString = `You have ${todoItemsCount} pending items`;
    return tempString;
};
