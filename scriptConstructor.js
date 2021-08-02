
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
    textDiv.innerHTML = text;

}

divsArray=[];
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

    if (divElementClass == 'sideDiv') {                                           //incase the div is grandchild, this part will HIDE it's display on screen reload
        divElement.style.opacity='0';
        divElement.style.zIndex = '2';
    }

    if (divElementClass == 'grandchildDiv') {                                           //incase the div is grandchild, this part will HIDE it's display on screen reload
        divElement.style.display = "block";
        divElement.style.zIndex = '2';
    }

    setImg(currentDiv, divElement);                                                     // calling image and text setting functions with the newly intantiated div
    //SetTextDiv(divElement, text);
    this.textDiv = document.createElement("div");
    this.textDiv.index=index;
    this.textDiv.classList.add("textDiv");
    divElement.appendChild(this.textDiv);
    this.textDiv.innerHTML = text;

    return divElement;
}


//INSTANTIATION OF CENTERPARENT OBJECT
var centerParent = new setDiv(centerX, centerY, '30', "centerParent", centerParentText[0], [1,-1,-1]);
centerParent.style.transform='scale(2)';
console.log("centerParentIndex",centerParent.index);

//INSTANTIATION OF  THE SIDEDIV OBJECTS SIDES NO. OF TIMES
for (let i = 0; i < sides; i++) {
    sideDivLeft = centerX + (distance * Math.cos(currentAngle));
    sideDivTop = centerY - (distance * Math.sin(currentAngle));
    sideDiv[i] = new setDiv(sideDivLeft, sideDivTop, '20', "sideDiv", sideDivText[i], [1,i,-1]);
    currentAngle += (angle);
}

//ONCLICK OF CENTERDIV SHOW SIDEDIVS
console.log("clickCenterDiv");
centerParent.onclick =function(){
    this.style.transition="transform 0.70s ease-in-out";
    this.style.transform='scale(1)';
    for(i=0;i<sides;i++){
        sideDiv[i].style.opacity='1';
    }
}




/* ONCLICK OF SIDEDIVS */
console.log("nowPress");
var sideDivclicked = 0;
//grandChildData=[];
for (let i = 0; i < sides; i++) {
    //tempGrandChildData=[];
    sideDiv[i].onclick = function () {
        //console.log("sideParentIndexClicked",this.index);
        x = -(parseFloat(sideDiv[i].centerX) - centerX) + 'vh';                               //THE AMOUNT TO WHICH THE SIDE DIV IS TRANLATED TO 
        y = -(parseFloat(sideDiv[i].centerY) - centerY) + 'vh';

        //PART TO SHOW THE SIDE DIVS AND GRANDCHILDREN
        if (sideDivclicked == 0) {
            this.style.transform = "scale(1.5)";
            this.style.transition = "transform 0.70s ease-in-out";
            parentDiv.style.transform = 'translate(' + x.toString() + ',' + y.toString() + ')';
            parentDiv.style.transition = "transform 0.70s ease-in-out";
            this.style.zIndex = '2';

            //CHANGING THE OPACITY OF BACKGROUND DIVS TO 0.1
            for (j = 0; j < sides; j++) {
                if (j == sideDiv[i].index[1]) {                                                    //IF THE J = THE CURRENTLY CLICKED DIV THE OPACTIY SHOULD REMAIN 1 
                    sideDiv[i].style.opacity = '1';
                }
                else {
                    sideDiv[j].style.opacity = '0.05';                                          //ELSE OPACITY SHOULD BE 0.1
                    centerParent.style.opacity = '0.05';
                }
            }

            //PART THAT INSTANTIATE THE GRANDCHILDREN OBJECTS SIDES NO. OF TIMES
            noOfGrandChild = grandchildTextMatrix[i].length;
            gcurrentAngle = 0;
            gAngle = angle = (360 / noOfGrandChild) * Math.PI / 180;
            for (k = 0; k < noOfGrandChild; k++) {
                grandChildLeft = sideDiv[i].centerX + (distance * Math.cos(gcurrentAngle));
                grandChildTop = sideDiv[i].centerY - (distance * Math.sin(gcurrentAngle));
                //grandchildDiv[k] = new setDiv(grandChildLeft, grandChildTop, '17', "grandchildDiv", grandchildHeading[i][k], [1,i,k]);
                if(grandchildDiv[i].length<noOfGrandChild){
                 temp= new setDiv(grandChildLeft, grandChildTop, '17', "grandchildDiv", grandchildHeading[i][k], [1,i,k]);
                 grandchildDiv[i].push(temp);
                }
                else{
                    for (k = 0; k < grandchildDiv[i].length; k++) {
                        grandchildDiv[this.index[1]][k].style.display = 'block';
                    }
                }
                
                   
                 
               // tempGrandChildData.push(grandchildDiv[k]);
                gcurrentAngle += (gAngle);
            }
          //  grandChildData.push(tempGrandChildData);

            //grandchildren clicked scale to 1.5
            gClicked = 0;
            for (k = 0; k < noOfGrandChild; k++) {
                grandchildDiv[this.index[1]][k].onclick = function () {
                    console.log("i=",this.index[1]);
                    w = -(parseFloat(grandchildDiv[this.index[1]][this.index[2]].centerX) - sideDiv[this.index[1]].centerX ) + 'vh';
                    z = -(parseFloat(grandchildDiv[this.index[1]][this.index[2]].centerY) - sideDiv[this.index[1]].centerY ) + 'vh';
                    if (gClicked == 0) {
                        //this.style.fontSize = '2vh';
                        grandchildDiv[this.index[1]][this.index[2]].childNodes[1].style.fontSize='1vh';
                        parentDiv.style.transform = 'translate(' + w.toString() + ',' + z.toString() + ')';
                        parentDiv.style.transition = "transform 0.70s ease-in-out";
                        this.style.transform = "scale(3)";
                        this.style.zIndex='3';
                        // SetTextDiv(grandchildDiv[k],grandchildTextMatrix[i][k]);
                       // console.log("grandChildIndex",grandchildDiv[i][k]);
                        //console.log(grandchildDiv[this.index[1]][this.index[2]].childNodes[1]);
                        grandchildDiv[this.index[1]][this.index[2]].childNodes[1].innerHTML=grandchildTextMatrix[this.index[1]][this.index[2]];  //childNode[1] = TextDiv of grandchildDiv
                        gClicked = 1;
                    }
                    else {
                        grandchildDiv[this.index[1]][this.index[2]].childNodes[1].innerHTML=grandchildHeading[this.index[1]][this.index[2]];
                        grandchildDiv[this.index[1]][this.index[2]].childNodes[1].style.fontSize='2vh';

                        this.style.transform = 'scale(1)';
                        this.style.transition = "transform 0.70s ease-in-out";
                        parentDiv.style.transform = 'translate(0,0)';
                        parentDiv.style.transition = "transform 0.70s ease-in-out";
                        this.style.zIndex = '1';
                        gClicked = 0;
                    }
                }
            }

            sideDivclicked = 1;
        }




        /* PART TO HIDE THE OTHER SIDEDIVS */
        else {
            //HIDING THE GRANDCHILD DIVS
            for (k = 0; k < noOfGrandChild; k++) {
                grandchildDiv[this.index[1]][k].style.display = 'none';
                //grandchildDiv[this.index[1]][k].remove(divElement);
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
            sideDivclicked = 0;
        }
    }
}

