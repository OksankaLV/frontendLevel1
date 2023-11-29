// task 1.2

let button1_2 = document.getElementById('deleteWithJs');
button1_2.addEventListener('click', squareDelete);
function squareDelete() {
    document.getElementById('blackSquare').remove();
}

// task 1.3

let button1_3 = document.getElementById('onHidden');
button1_3.addEventListener('click', onHidden);
function onHidden() {
    document.getElementById('blackSquare').className = 'hidden';
}

// task 2

let button2 = document.getElementById('buttonBlock2');
button2.addEventListener('click', viewBlockTwo);
function viewBlockTwo() {
    let elemBlock = document.getElementById('blockTwo').className;
    if (elemBlock === 'hidden') {
        document.getElementById('blockTwo').className = 'view'
        document.getElementById('buttonBlock2').innerHTML='Приховати блок'
    } else {
        document.getElementById('blockTwo').className = 'hidden'
        document.getElementById('buttonBlock2').innerHTML='Показати блок'

    }
}

// task 3

let button3 = document.getElementById('buttonBlock3');
button3.addEventListener('click', changeBlock3)
function changeBlock3() {
    let elemBlocks = document.getElementsByClassName('blackSquare');
    for (let i = 0; i < elemBlocks.length; i++){
        elemBlocks[i].classList.toggle('noneBlock');
    }
}

// task 4

let button4 = document.getElementById('enter');
button4.addEventListener('click', refreshClass);

function refreshClass() {
    let searchClass = document.getElementById('inputSelector').value;
    let elemClass = document.getElementsByClassName(searchClass);
    for (let i = 0; i < elemClass.length; i++){
        elemClass[i].classList.toggle('noneBlock')
    }
}

// task 5

let elemBlock5 = document.getElementById('block5');
elemBlock5.addEventListener('click', oneListener);

function oneListener() {
    alert('Привіт');
    elemBlock5.removeEventListener('click', oneListener)
    elemBlock5.addEventListener('click', twoListener)

    
} 
function twoListener() {
    document.getElementById('block5').classList = 'whiteSquare';
}

// task 6

const elemButton = document.getElementById('button6');
elemButton.addEventListener('mouseenter', classRed);
elemButton.addEventListener('mouseout', classNone);

function classRed() {
    const block = document.getElementById('block6');
    block.classList.add('redSquare');
}

function classNone() {
    const block = document.getElementById('block6');
    block.classList.remove('redSquare');
}
// task 7
const elemInput = document.getElementById('input7');
elemInput.addEventListener('focus', addClassGreen);
elemInput.addEventListener('keypress', removeClassGreen);

function addClassGreen() {
    const block = document.getElementById('block7');
    block.classList.add('greenRectangle');
}
function removeClassGreen() {
    const block = document.getElementById('block7');
    block.classList.remove('greenRectangle');
}

// task 8
const button8 = document.getElementById('viewImgButton');
button8.addEventListener('click', addImage);

function addImage() {
    const src = document.getElementById('input8').value;
    const img = document.getElementById('img8');
    document.createElement("img");
    img.src = src;
}

// task 9
const button9 = document.getElementById('viewAllImg');
button9.addEventListener('click', addManyImage);

function addManyImage() {
    const allSrc = document.getElementById('inputArea').value.split('\n');
    document.getElementById('manyImg').innerHTML = ""; //for delete appendChild

    for (let i = 0; i < allSrc.length; i++){
        const img = document.createElement('img');
            img.src = allSrc[i];
            img.id = "number"+[i];
            img.alt = "не вдалося загрузити зображення";
            img.style.width = "200px";
        const placeForImg = document.getElementById('manyImg');
        placeForImg.appendChild(img);
    }
}

// task 10
document.addEventListener("mousemove", getXY)

function getXY(e){
        document.getElementById("getX").innerHTML = e.pageX;
        document.getElementById("getY").innerHTML = e.pageY;
} 

// task 11
document.getElementById("language").innerHTML = navigator.languages;

// task 12
navigator.geolocation.getCurrentPosition(position=>{
        document.getElementById("latitude").innerHTML = position.coords.latitude;
        document.getElementById("longitude").innerHTML = position.coords.longitude;
    });

//task 13
//Save with localStorage
document.getElementById("textLocalStorage").addEventListener("input", saveStorage);
getTextStorage()

function saveStorage() {
    localStorage.setItem("textStorage", document.getElementById("textLocalStorage").value);
}

function getTextStorage() {
    let text = localStorage.getItem("textStorage");
    document.getElementById("textLocalStorage").value = text;
}

//Save with cookies
document.getElementById("textCookies").addEventListener("input", saveCookie);
getTextCookie()

function saveCookie() {
    let text = document.getElementById("textCookies").value
    document.cookie = encodeURIComponent(text);
}

function getTextCookie() {
    let text = decodeURIComponent(document.cookie);
    document.getElementById("textCookies").value = text;
}

//Save with sessionStorage
document.getElementById("textSessionStorage").addEventListener("input", saveSessionStorage);
getSessionStorage()

function saveSessionStorage() {
    sessionStorage.setItem("textStorage", document.getElementById("textSessionStorage").value);
}

function getSessionStorage() {
    let text = sessionStorage.getItem("textStorage");
    document.getElementById("textSessionStorage").value = text;
}

// Task 14.
document.addEventListener("scroll", viewButtonBack)

function viewButtonBack() {
    document.getElementById("back").className = "viewButtonBack";
}

document.getElementById("back").addEventListener("click", scrollPage)
function scrollPage(){
        if (document.documentElement.scrollTop!=0)
            { document.documentElement.scrollTop -= 10;
        setTimeout(scrollPage, 10);
    }
    document.getElementById("back").classList.remove("viewButtonBack");
}

// Task 15

document.getElementById("block2").addEventListener("click", function () {
    alert("You click block2")
})

document.getElementById("block1").addEventListener("click", function () {
    alert("You click block1")
})

// Task 16
document.getElementById("greyScreenButton").addEventListener("click", blockScreen)
document.getElementById("greyScreen").addEventListener("click", resetGreyScreen)

function blockScreen() {
    document.getElementById("greyScreen").classList.add("greyScreen");
    document.body.style.overflow = "hidden";
}
function resetGreyScreen() {
    document.getElementById("greyScreen").classList.remove("greyScreen");
    document.body.style.overflow = "scroll";
}

// Task 17

document.addEventListener('dragover', ev => ev.preventDefault())
document.addEventListener('drop', ev => ev.preventDefault())

const elemDragNDrop = document.getElementById("dragAndDrop");
const inputElem = document.getElementById("inputDragAndDrop");

elemDragNDrop.addEventListener("click", () => {
    inputElem.click();
    inputElem.addEventListener("change", () => {
        console.log(inputElem.files)
        file = inputElem.files[0];
        console.log(file)
        openFile(file)
    })
});
 function openFile(file) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file)
    img.alt = file.name;
    img.className = "infoFile";
    const name = document.createElement("p");
    name.innerHTML=file.name + ` size: ${file.size} Kb`;
    const thereImage = document.getElementById("infoFile");
            thereImage.appendChild(name);
            thereImage.appendChild(img)
        }

elemDragNDrop.addEventListener("dragover", styleForDragover, false);
elemDragNDrop.addEventListener("drop", styleForDrop, false);
elemDragNDrop.addEventListener("dragleave", delStyleForDragover, false);


    function styleForDragover(el) {
        el.preventDefault();
        elemDragNDrop.classList.add("styleForDragover");
        el.stopPropagation();
    } 
    function styleForDrop(el){
        elemDragNDrop.classList.remove("dragAndDropStart");
        elemDragNDrop.classList.add("styleForDrop");
        el.preventDefault();
        console.log(JSON.stringify(el.dataTransfer))
        const file = el.dataTransfer.files[0];
        openFile(file);
        el.stopPropagation();
    }
    function delStyleForDragover(el){
        elemDragNDrop.classList.remove("styleForDragover");
         elemDragNDrop.classList.add("dragAndDropStart");
        el.stopPropagation();
    }    