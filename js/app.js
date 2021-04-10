console.log("welcome to magicNotes!! created by kr!!");
showNotes();
// if user click on Add notes, first add a note into localStorage
let addbtn = document.getElementById("addbtn");
// console.log(addbtn);


addbtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    // pele thi koi notes available hoy localStorage ma to te pn lai levana
    let addtitle = document.getElementById("addtitle");
    // for title
    let notes = localStorage.getItem("notes");
    let noteObj;
    if (notes == null) {
        noteObj = [];
        // means null hoy to empty array asign kari devanu jani
    }
    else {
        noteObj = JSON.parse(notes);
        // means note ni String male to parse kari devanu tene array ma

    }
    // now push addTxt content on noteObj array
    //  for title you have to push object
    let myObj = {
        title :  addtitle.value,
        text: addTxt.value
    }
    // noteObj.push(addTxt.value);
    noteObj.push(myObj);

    // now update the localStorage 
    // always localStorage store in Strings
    localStorage.setItem("notes", JSON.stringify(noteObj));

    // now addTxt ni value blank 
    //    beacause new note add krva mate

    addTxt.value = "";
    addtitle.value="";
    console.log(noteObj);

    // now we have to display on the website so make showNotes function
    showNotes();
});
function showNotes() {
    // first localStorage ma thi notes levanu & then display on website 
    let notes = localStorage.getItem("notes");

    if (notes == null) {

        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    //  means noteObj array aapse String no,jene aapne card na form ma display krvanu chhe
    let html = "";

    noteObj.forEach(function (element, index) {
        html += ` <div class="card noteCard my-2 mx-2"style="width :18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id=${index} onclick="deleteNote(this.id)"class="btn btn-primary">Delete Note</button>
            </div>
        </div>`
    });
    // this.id means te time ni id
    // we have to do element.title & element.text according to object

    let noteEle = document.getElementById("note");
    // noteEle target karse a div ne jeni id note chhe ,tya display thase content
    if (noteObj.length != 0) {
        noteEle.innerHTML = html;
    }
    else {
        noteEle.innerHTML = `Your Diary is empty. Use  "Add notes", to fill the Diary`;
    }
}

// function to delete note

function deleteNote(index) {
    console.log("I am deleting", index);

    //    now only we have to remove that item into localStorage

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    noteObj.splice(index,1);
    // arr.spice(starting index,ketla remove krva element te)  

    // baki ni item ne localStorage ma fari set karvani
    localStorage.setItem("notes", JSON.stringify(noteObj));

    // & then farithi display karvani showNotes ne
    showNotes();
}

// search functionality 

// first grab serchbox form html

let search=document.getElementById("searchTxt");
// console.log(searchTxt);

// add eventlistener for searchig

search.addEventListener("input",function() {

    let inputVal = search.value.toLowerCase();
    console.log("input event fired!!",inputVal);

    // all showed card have noteCard class so we have to grab it also and compare inputVal & noteCard value,then we have to decide whether we have to show or hide

    let noteCard = document.getElementsByClassName("noteCard");
    // then we have to grab its content
    Array.from(noteCard).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal))
        {   
        element.style.display="block";
        // block=show,none=hide
        }
        else{
                element.style.display = "none";
        }
    })
})
