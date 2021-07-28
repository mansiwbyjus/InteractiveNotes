parentDiv = document.getElementById("parent-div");
parentDiv.style.width = '177vh';
parentDiv.style.height = '100vh';


currentDiv = 'circle';
sides = 5;
distance = 30;
var centerImg;  //image in the center of the screen
var textDiv;     //Text Div on the image
var centerParent; //parent div contaning centerImg and textDiv
sideDiv = [];     //SubDiv to centerParent
var divPosX, divPosY;

angle = (360 / sides) * Math.PI / 180; //   pi/3= 60deg
console.log(angle);    //in rad
currentAngle = 0;

centerParent = document.createElement('div'); //create Centerparent div in html
centerParent.style.width = '30vh';
centerParent.style.height = '30vh';


centerX = (parseFloat(parentDiv.style.width.replace('vh', '')) / 2);
centerY = (parseFloat(parentDiv.style.height.replace('vh', '')) / 2);
console.log("ParentDiv center" + centerX, centerY);
setCenterParent();

//FUNCTION TO APPEND CENTER PARENT
function setCenterParent() {
    centerParent.style.top = (centerY - (parseFloat(centerParent.style.width.replace('vh', '')) / 2)) + 'vh';
    centerParent.style.left = (centerX - (parseFloat(centerParent.style.height.replace('vh', '')) / 2)) + 'vh';
    centerParent.classList.add("centerParent");  //add css properties of centerParent
    parentDiv.appendChild(centerParent);         // append centerparent onto the main div
    console.log("working");
    setCenterImg(currentDiv, centerParent);
    SetTextDiv(centerParent);
}


//FUNCTION TO ADD SHAPE IMAGE TO CENTERPARENT AND SIDEDIV
function setCenterImg(currentDiv, toAppendDiv) {
    centerImg = document.createElement("img");
    centerImg.src = "SVGs/" + currentDiv + "SVG.svg";
    centerImg.classList.add("centerImg");     //add properties of centerImg
    toAppendDiv.appendChild(centerImg);    //append image to the Centerparent
}


//FUNCTION TO ADD TEXT TO IMAGE TO CENTERPARENT AND SIDEDIV
function SetTextDiv(toAppendDiv, sideDivIndex) {
    textDiv = document.createElement("div");
    textDiv.classList.add("textDiv");
    toAppendDiv.appendChild(textDiv);
    if (toAppendDiv != centerParent) {             //argument div is not centerParent then innerHTML "index of sideDiv"
        textDiv.innerHTML = sideDivIndex;
        console.log(sideDivIndex);
    }
    else {
        textDiv.innerHTML = "Centerparent";
    }
    console.log("TextDiv working");
}


// function removeCenterParent() {
//     centerParent.remove();
// }



for (let i = 0; i < sides; i++) {
    sideDiv[i] = document.createElement('div');
    sideDiv[i].style.width = '20vh';
    sideDiv[i].style.height = '20vh';

    setCenterImg(currentDiv, sideDiv[i]);   //set shape image to sidediv
    SetTextDiv(sideDiv[i], i);               // set text to sidediv
    setSideDivPostion(sideDiv[i]);          //set position of side div 

    parentDiv.appendChild(sideDiv[i]);
    sideDiv[i].classList.add('sideDiv');
    currentAngle += (angle);
}

//FUNCTION TO SET POSTION OF SIDE DIV
function setSideDivPostion(div){
    divPosX = centerX + (distance * Math.cos(currentAngle)) - (parseFloat(div.style.width.replace('vh', '')) / 2);
    divPosY = centerY - (distance * Math.sin(currentAngle)) - (parseFloat(div.style.height.replace('vh', '')) / 2);
    console.log("side div positions" + divPosX, divPosY);
    console.log("current Angle=" + currentAngle);
    div.style.top = divPosY.toString() + 'vh';
    div.style.left = divPosX.toString() + 'vh';
}


for (i = 0; i < sides; i++) {
    centerParent.style.opacity = '1';
    sideDiv[i].onclick = function () {
        this.style.transform = "scale(2)";
        this.style.zIndex = '2';
        centerParent.style.opacity='0.1';
         for(let j=0;j<sides;j++){
            if(j==i){
                
                sideDiv[i].style.opacity='1';
            }
            else{
                sideDiv[j].style.opacity='0.1';
            }
        }
    }
    sideDiv[i].onmouseout = function () {
        this.style.transform = "scale(1)";
        centerParent.style.opacity='1';
        for (j = 0; j < sides; j++) {
            sideDiv[j].style.opacity = '1';
        }

    }

}


