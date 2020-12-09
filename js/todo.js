'use strict';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const time = new Date();
const day = dayNames[time.getDay()];                        // a konkrét napot így nyerjük ki
const tempStringDate = time.toLocaleDateString('rus');      // dd.mm.yyyy
const date = tempStringDate.replaceAll('.', '-');           // így már dd-mm-yyyy
let todoItemsCount = 0;
let todoItemArray = [];

const daySelector = document.querySelector('.day');
const dateSelector = document.querySelector('.date');
const chillPic = document.querySelector('.cheers');
const chillText = document.querySelector('.chill');
daySelector.textContent = day;
dateSelector.textContent = date;

const textArea = document.querySelector('#input__area');
const addButton = document.querySelector('.input__add');
const mainContainer = document.querySelector('.main-container');

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
            createBottomDivStyle();

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
            pendingItemsCounterStyle();                              // a pending számláló formázása
            //console.log(refreshPendingItemsCounter());
            pendingItemsCounter.textContent = refreshPendingItemsCounter();
            divListStyle();
            divListAddTodoElement(textArea.value);                  // átadjuk a beírt teendő szövegét
            textArea.value = '';                                    // töröljük a textAreába beírt szöveget.

        }

    } else {
        hideChill();       // set visible the image and text
        return;
    }

}

const hideChill = () => {
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

const createBottomDivStyle = () => {                             // az alsó divet csinálja meg a két "gombnak"
    // creating html content
    mainContainer.style.position = "relative";
    const divBottomStyle = document.createElement('div');
    divBottomStyle.classList = 'showHideClear';
    document.body.children.item(1).appendChild(divBottomStyle);
    let showHide = document.createElement('p');
    const clearAll = document.createElement('p');
    showHide.textContent = 'Show Complete';
    showHide.classList = 'showHide';
    clearAll.textContent = 'Clear All';
    clearAll.classList = 'clearAll';
    divBottomStyle.appendChild(showHide);             // hozzá csapjuk a divhez a két elemet
    divBottomStyle.appendChild(clearAll);

    // css
    divBottomStyle.style.margin = "auto";
    divBottomStyle.style.position = "absolute";
    divBottomStyle.style.bottom = "0";                    // ez teszi alulra a diven belül, kell hogy az őse relativ legyen, ez pedig abszolút
    //divBottomStyle.style.alignContent = "auto";
    divBottomStyle.style.display = "flex";
    divBottomStyle.style.flexDirection = "row";
    divBottomStyle.style.justifyContent = "center";
    divBottomStyle.style.alignSelf = "center";

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

const pendingItemsCounterStyle = () => {
    pendingItemsCounter.style.display = "flex";
    pendingItemsCounter.style.justifyContent = "left";
    pendingItemsCounter.style.alignContent = "left";
    pendingItemsCounter.style.marginLeft = "1rem";
    pendingItemsCounter.style.marginTop = "2rem";
}

const divListStyle = () => {
    // css
    divList.style.display = "flex";
    divList.style.justifyContent = "center";
    divList.style.alignContent = "center";
    pendingItemsCounter.style.lineheight = "10rem";
}

const divListAddTodoElement = (text) => {
    todoItemArray.push(text);           // betesszük a tömbünkbe a szöveget
    //todoDivContainer
    const todoDivContainer = document.createElement('div');
    todoDivContainer.classList.add('todoDivContainer');
    divList.appendChild(todoDivContainer);
    //checkbox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkBox';
    todoDivContainer.appendChild(checkBox);
    // text
    const todoText = document.createElement('p');
    todoText.classList.add('todoText');
    todoText.value = text;
    todoDivContainer.appendChild(todoText);

    //css
    todoDivContainer.style.display = "flex";
    todoDivContainer.style.flexDirection = "column-reverse";                        ////                !!!!!!!!!!!!!!      Itt Tartok          !!!!!!!!!
    todoDivContainer.style.justifyContent = "left";
    todoDivContainer.style.alignContent = "center";
    checkBox.marginLeft = "1rem";
    todoText.style.width = "40vh";
    todoText.style.lineHeight = "2rem";
    todoText.style.lineheight = "10rem";

}

