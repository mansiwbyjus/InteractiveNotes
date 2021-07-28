parentDiv = document.getElementById("parent-div");
parentDiv.style.width = '177vh';
parentDiv.style.height = '100vh';


/*VARIABLES */
currentDiv = 'circle';
sides = 5;
grandchildNumberArray = [[1, 1, 1], [1, 1], [1], [], [1, 1, 1, 1], [1, 1, 1, 1, 1]];
centerX = (parseFloat(parentDiv.style.width.replace('vh', '')) / 2);
centerY = (parseFloat(parentDiv.style.height.replace('vh', '')) / 2);
var sideDiv = [];
var grandchildDiv = [];
var sideDivTop;
var sideDivLeft;
var grandChildTop;
var grandChildLeft;
distance = 30;
angle = (360 / sides) * Math.PI / 180;
currentAngle = 0;


/*FUNCTION TO SET THE IMAGE TO DIVS */
function setImg(currentDiv, toAppendDiv) {               //currentDiv holds which shape is used and toAppendDiv holds the div on which the shape/img is to be appened on  
    centerImg = document.createElement("img");
    centerImg.src = "SVGs/" + currentDiv + "SVG.svg";
    centerImg.classList.add("centerImg");                //add css properties class of centerImg
    toAppendDiv.appendChild(centerImg);                  //append image to the Centerparent
}


/*FUNCTION TO SET TEXT TO DIVS */
function SetTextDiv(toAppendDiv, text) {                 // toAppendDiv is the div on which the text is to be added on 
    textDiv = document.createElement("div");
    textDiv.classList.add("textDiv");
    toAppendDiv.appendChild(textDiv);
    if (text != "CENTERPARENT") {                        //argument div is not centerParent then add innerHTML= <index of sideDiv>
        textDiv.innerHTML = text;

    }
    else {
        textDiv.innerHTML = text;
    }

}

/*CONSTRUCTOR fUNCTION TO CONSTRUCT DIVS(CENTER,SIDE AND GRANDCHILD) */
function setDiv(positionX, positionY, size, divElementClass, text, index) {
    divElement = document.createElement('div');
    divElement.index = index;
    divElement.centerX = positionX;                                                    //sets the center of the div to variable centerX and centerY
    divElement.centerY = positionY;
    divElement.style.width = size.toString() + 'vh';
    divElement.style.height = size.toString() + 'vh';
    divElement.style.top = (positionY - (parseFloat(size) / 2)).toString() + 'vh';     //sets the margin top and margin left of the div 
    divElement.style.left = (positionX - (parseFloat(size) / 2)).toString() + 'vh';
    divElement.classList.add(divElementClass);                                          //adds the css properties of respective div's class 
    parentDiv.appendChild(divElement);                                                  //appends the respective div to the parentdiv
    if (divElementClass == 'grandchildDiv') {                                           //incase the div is grandchild, this part will HIDE it's display on screen reload
        divElement.style.display = "block";
        divElement.style.zIndex = '2';
    }
    setImg(currentDiv, divElement);                                                     // calling image and text setting functions with the newly intantiated div
    SetTextDiv(divElement, text);
    return divElement;
}


//INSTANTIATION OF CENTERPARENT OBJECT
var centerParent = new setDiv(centerX, centerY, '30', "centerParent", "CENTERPARENT", 0);


//INSTANTIATION OF  THE SIDEDIV OBJECTS SIDES NO. OF TIMES
for (let i = 0; i < sides; i++) {
    sideDivLeft = centerX + (distance * Math.cos(currentAngle));
    sideDivTop = centerY - (distance * Math.sin(currentAngle));
    sideDiv[i] = new setDiv(sideDivLeft, sideDivTop, '20', "sideDiv", (i).toString(), i);
    currentAngle += (angle);
}


/* ONCLICK OF SIDEDIVS */
console.log("nowPress");
var clicked = 0;
for (let i = 0; i < sides; i++) {
    sideDiv[i].onclick = function () {
        x = -(parseFloat(sideDiv[i].centerX) - centerX) + 'vh';                               //THE AMOUNT TO WHICH THE SIDE DIV IS TRANLATED TO 
        y = -(parseFloat(sideDiv[i].centerY) - centerY) + 'vh';

        //PART TO SHOW THE SIDE DIVS AND GRANDCHILDREN
        if (clicked == 0) {
            this.style.transform = "scale(1.5)";
            this.style.transition = "transform 0.70s ease-in-out";
            parentDiv.style.transform = 'translate(' + x.toString() + ',' + y.toString() + ')';
            parentDiv.style.transition = "transform 0.70s ease-in-out";
            this.style.zIndex = '2';

            //CHANGING THE OPACITY OF BACKGROUND DIVS TO 0.1
            for (j = 0; j < sides; j++) {
                if (j == sideDiv[i].index) {                                                    //IF THE J = THE CURRENTLY CLICKED DIV THE OPACTIY SHOULD REMAIN 1 
                    sideDiv[i].style.opacity = '1';
                }
                else {
                    sideDiv[j].style.opacity = '0.05';                                          //ELSE OPACITY SHOULD BE 0.1
                    centerParent.style.opacity = '0.1';
                }
            }

            //PART THAT INSTANTIATE THE GRANDCHILDREN OBJECTS SIDES NO. OF TIMES
            noOfGrandChild = grandchildNumberArray[i].length;
            console.log(noOfGrandChild);
            gcurrentAngle = 0;
            gAngle = angle = (360 / noOfGrandChild) * Math.PI / 180;
            for (k = 0; k < noOfGrandChild; k++) {
                grandChildLeft = sideDiv[i].centerX + (distance * Math.cos(gcurrentAngle));
                grandChildTop = sideDiv[i].centerY - (distance * Math.sin(gcurrentAngle));
                grandchildDiv[k] = new setDiv(grandChildLeft, grandChildTop, '17', "grandchildDiv", ("Hello" + (k).toString()), k);
                gcurrentAngle += (gAngle);
            }
            //grandchildren clicked scale to 1.5
            gClicked = 0;
            for (k = 0; k < noOfGrandChild; k++) {
                grandchildDiv[k].onclick = function () {
                    if (gClicked == 0) { this.style.transform = 'scale(1.5)'; gClicked = 1; }
                    else { this.style.transform = 'scale(1)'; gClicked = 0; }
                }
            }

            clicked = 1;
        }




        /* PART TO HIDE THE OTHER SIDEDIVS */

        else {
            //HIDING THE GRANDCHILD DIVS
            for (k = 0; k < noOfGrandChild; k++) {
                grandchildDiv[k].style.display = 'none';
            }
            this.style.transform = 'scale(1)';
            this.style.transition = "transform 0.70s ease-in-out";
            parentDiv.style.transform = 'translate(0,0)';
            parentDiv.style.transition = "transform 0.70s ease-in-out";
            this.style.zIndex = '1';

            //CHANGING THE OPACITY OF BACKGROUND DIVS TO NORMAL
            centerParent.style.opacity = '1';
            for (j = 0; j < sides; j++) {
                sideDiv[j].style.opacity = '1';
            }
            clicked = 0;
        }
    }
}