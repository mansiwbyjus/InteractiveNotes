parentDiv = document.getElementById("parent-div");
parentDiv.style.width = '177vh';
parentDiv.style.height = '100vh';


/*VARIABLES */
currentDiv = 'circle';                                                                 //change the shape of svg here
sides = 5;                                                                             //cahnge its no of sides here


centerX = (parseFloat(parentDiv.style.width.replace('vh', '')) / 2);
centerY = (parseFloat(parentDiv.style.height.replace('vh', '')) / 2);
var sideDiv = [];
var grandchildDiv =[
    [],
    [],
    [],
    [],
    []
];
var sideDivTop;
var sideDivLeft;
var grandChildTop;
var grandChildLeft;
distance = 30;
angle = (360 / sides) * Math.PI / 180;
currentAngle = 0;
// textDiv=[
//     [
//         [1,2,3],[1,2,3]
//     ],
//     [
//         [1,2,3],[1,2,3]
//     ],
//     [
//         [1,2,3],[1,2,3]
//     ]
// ];
//sconsole.log(textDiv[0][0][0]);


centerParentText = ["Refraction And Dispersion Of Light Through A Prism"];

sideDivText = [
    "Rainbow",
    "What is Dispersion of Light?",
    "Refraction Of Light Through Prism",
    "Visible Light Spectrum",
    "Prism Experiment"
];

grandchildHeading=[
   ["Splitting","Prism","Rainbow"],
   [],
   [],
   [],
   [],
   [],
   [],
   [],
];
grandchildTextMatrix = [
    ["Splitting of white light into seven constituent colours when passed through the prism.", "Prism is an optical element which is transparent with flat, polished surfaces that refract light.", 1],
    [1, 1],
    [1],
    [],
    [1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [],
    [],
    []
];








// child background
// background-image: linear-gradient(#CF47FF, #7E00EE);
//background-image: linear-gradient(#10dca3,#3988fa)


//background
//background-image: radial-gradient(119.99% 62.42% at 50% 36.33%, #7B16E1 0%, #000E87 100%);