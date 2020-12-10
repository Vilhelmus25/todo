'use strict';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const time = new Date();
const day = dayNames[time.getDay()];                        // a konkrét napot így nyerjük ki
const tempStringDate = time.toLocaleDateString('rus');      // dd.mm.yyyy
const date = tempStringDate.replaceAll('.', '-');           // így már dd-mm-yyyy
let todoItemsCount = 0;
let todoItemArray = [];
let cheersVisible = true;

// date selectors
const daySelector = document.querySelector('.day');
const dateSelector = document.querySelector('.date');
daySelector.textContent = day;
dateSelector.textContent = date;

// selectors
const textArea = document.querySelector('#input__area');
const addButton = document.querySelector('.input__add');
const mainContainer = document.querySelector('.main-container');
const cheersContainer = document.querySelector('.cheers-container');
const chillPic = document.querySelector('.cheers');
const chillText = document.querySelector('.chill');

// pendingItemCounter
const pendingItemsCounter = document.createElement('p');
pendingItemsCounter.classList.add('pendingsCounter');
const pendingItemsCounterSelector = document.querySelector('.pendingsCounter');
const divForPendingCounter = document.createElement('div');
divForPendingCounter.classList.add('divForPendingCounter');
mainContainer.appendChild(divForPendingCounter);
divForPendingCounter.appendChild(pendingItemsCounter);

// divList Container
const divList = document.createElement('div');
divList.classList.add('.divList');
const divListSelector = document.querySelector('divList');
mainContainer.appendChild(divList);


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

        if (cheersVisible == true) {
            hideChill();
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

        if (todoItemsCount >= 0) {
            //divList.classList.add('todos');
            cheersVisible = false;
            pendingItemsCounterStyle();                              // a pending számláló formázása
            refreshPendingItemsCounter();
            //console.log(refreshPendingItemsCounter());
            divListStyle();
            divListAddTodoElement(textArea.value);                  // átadjuk a beírt teendő szövegét
            textArea.value = '';                                    // töröljük a textAreába beírt szöveget.

        }

    } else {
        // hideChill();    
        cheersVisible = true;
        return;
    }

}

const hideChill = () => {
    // chillPic.style.visibility = `${vision}`;
    cheersContainer.removeChild(chillPic);
    //chillText.style.visibility = `${vision}`;
    cheersContainer.removeChild(chillText);

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
    divBottomStyle.classList.add('showHideClear');
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
    pendingItemsCounter.textContent = tempString;
};

const pendingItemsCounterStyle = () => {
    pendingItemsCounter.style.display = "flex";
    pendingItemsCounter.style.justifyContent = "left";
    pendingItemsCounter.style.alignContent = "left";
    pendingItemsCounter.style.marginLeft = "2rem";
    pendingItemsCounter.style.marginTop = "2rem";
}

const divListStyle = () => {
    // css
    divList.style.display = "flex";
    divList.style.flexDirection = "column";
    divList.style.flexWrap = "wrap";
    divList.style.justifyContent = "center";
    divList.style.alignContent = "center";
    pendingItemsCounter.style.lineheight = "10rem";
}

const divListAddTodoElement = (text) => {
    todoItemArray.push(text);           // betesszük a tömbünkbe a szöveget
    //todoDivContainer
    const todoDivContainer = document.createElement('div');
    todoDivContainer.classList.add('todoDivContainer');
    divList.prepend(todoDivContainer);                                  // prepend appendChild helyett, ez felülre teszi és nem alulra! :)
    //checkbox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkBox';
    todoDivContainer.appendChild(checkBox);
    // text
    const todoText = document.createElement('p');
    todoText.classList.add('todoText');
    todoText.textContent = text;
    todoDivContainer.appendChild(todoText);
    //trashbin
    const trashBinBtn = document.createElement('button');
    const trashBinIcon = document.createElement('i');
    trashBinBtn.classList.add('trashBinBtn');
    trashBinIcon.classList.add('fa', 'fa-trash');               // fontos a helyes szintaktika ha osztályokat sorolunk fel js-ben, itt ','-vel van elválasztva és minden class item külön kaparásban van
    trashBinBtn.appendChild(trashBinIcon);
    todoDivContainer.appendChild(trashBinBtn);

    //css
    //container
    todoDivContainer.style.display = "flex";
    todoDivContainer.style.flexDirection = "row";
    todoDivContainer.style.flexWrap = "nowrap";
    todoDivContainer.style.justifyContent = "center";
    todoDivContainer.style.alignContent = "center";
    todoDivContainer.style.background = "#b2cdda";
    todoDivContainer.style.padding = "0.5rem";
    todoDivContainer.style.margin = "0.5rem";
    //   todoDivContainer.style.borderRadius = "5%";
    //checkbox
    checkBox.marginLeft = "1rem";
    checkBox.style.width = "25px";
    checkBox.style.height = "25px";
    checkBox.style.marginRight = "1rem";
    checkBox.style.cursor = "pointer";
    //text
    todoText.style.width = "40vh";
    todoText.style.lineHeight = "2rem";
    todoText.style.lineheight = "10rem";
    todoText.style.margin = "auto";

    // trashbin
    trashBinIcon.style.color = "#eeeeee";
    trashBinIcon.style.fontSize = "1rem";
    trashBinBtn.style.backgroundColor = "#f8542b";
    trashBinBtn.style.border = "none";
    trashBinBtn.style.width = "30px";
    trashBinBtn.style.height = "30px";
    trashBinBtn.style.margin = "auto";
    trashBinBtn.style.cursor = "pointer";
    trashBinBtn.style.visibility = "hidden";                                                            // alapból nem látszódik
    todoDivContainer.addEventListener('mouseenter', () => trashBinBtn.style.visibility = "visible");    // ha belép a divbe az egér, akkor látszik
    todoDivContainer.addEventListener('mouseleave', () => trashBinBtn.style.visibility = "hidden");     // ha kilép akkor eltűnik

    const trashBinBtnSelector = document.querySelector('.trashBinBtn');
    trashBinBtnSelector.addEventListener("click", (event) => {
        todoDivContainer.remove(mainContainer);
        todoItemsCount -= 1;
        refreshPendingItemsCounter();
    });   // ha a kukára nyomunk oda is kerül a div, csökkentjük eggyel a pendingek számát

};


