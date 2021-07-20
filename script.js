parentDiv= document.getElementById("parent-div");


currentDiv= 'Square';
var centerImg ;  //image in the center of the screen
var textDiv;     //Text Div on the image
var centerParent; //parent div contaning centerImg and textDiv

setCenterParent();

function setCenterParent(){
    centerParent= document.createElement('div'); //create Centerparent div in html
    centerParent.classList.add("centerParent");  //add css properties of centerParent
    parentDiv.appendChild(centerParent);         // append centerparent onto the main div
    console.log("working");
    setCenterImg(currentDiv);
    SetTextDiv();
}

function setCenterImg(currentDiv){
    centerImg= document.createElement("img");
    centerImg.src ="SVGs/"+currentDiv+"SVG.svg";
    centerImg.classList.add("centerImg");     //add properties of centerImg
    centerParent.appendChild(centerImg);    //append image to the Centerparent

}

function SetTextDiv(){
    textDiv= document.createElement("div");
    textDiv.classList.add("textDiv");
    centerParent.appendChild(textDiv);
    console.log("working");
}



function removeCenterParent(){
    centerParent.remove();
}