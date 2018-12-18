//initiate arrays and other global variables
let boxes = ["emptyBox", 'box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9', 'box10', 'box11', 'box12', 'box13',
    'box14', 'box15'];
let positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let neighbors = [];
let moveCount = 0;
let totalSeconds = 0;
document.timerVar = setInterval(countTimer, 1000);
//set background
function setRandomBG(){
    let BGnum = Math.floor(Math.random() * 4) + 1;
    var styleStr = '';
    switch(BGnum){
        case 1: styleStr = '.box{background: url("atlBackground.jpg");}'; break;
        case 2: styleStr = '.box{background: url("earthBackground.jpg");}'; break;
        case 3: styleStr = '.box{background: url("fishBackground.jpg");}'; break;
        case 4: styleStr = '.box{background: url("mountainBackground.jpg");}'; break;
    }
    var sheet = document.createElement('style');
    sheet.innerHTML = styleStr;
    document.body.appendChild(sheet);
}
//set fifteen boxes in place according to the "positions" array.
function setFifteen(){
    for(let i = 0; i < boxes.length; i++){
        if(positions[i] === 16) continue;
        var box = document.getElementById(boxes[positions[i]]);
        setPos(box, i + 1);
    }
}
//shuffles fifteen boxes by generating an randomized "positions" array
function shuffle(){
    for(let i = 0; i < 500; i++) {
        move(Math.floor(Math.random() * 16) + 1, false);
    }
    totalSeconds = 0;
}
//moves the boxes by creating a neighbor array, and checking if it neighbors the missing box, 16
function move(boxNum, playerMove){
    setNeighbors(positions.indexOf(boxNum) + 1);
    if(neighbors.includes(16)) {
        //swaps positions of moved boxes for the "positions" array
        if(positions.indexOf(boxNum) > positions.indexOf(16)){
            var temp = positions[positions.indexOf(boxNum)];
            positions[positions.indexOf(boxNum)] = 16;
            positions[positions.indexOf(16)] = temp;
        }else{
            positions[positions.indexOf(16)] = positions[positions.indexOf(boxNum)];
            positions[positions.indexOf(boxNum)] = 16;
        }
        setFifteen();   //set fifteen boxes with new position array
        //counts moves and shows popup only if the move is a player move.
        if(playerMove) {
            moveCount++;
            if (solved()) showPopup();   //shows a popup when game is won
        }
    }
}
//method used to set the position of a box
function setPos(box, pos){
    const _1 = "0px";
    const _2 = "100px";
    const _3 = "200px";
    const _4 = "300px";
    let boxPos = {
        row: "",
        col: ""
    };
    switch (pos){
        case 1: boxPos.row = _1; boxPos.col = _1; break;
        case 2: boxPos.row = _1; boxPos.col = _2; break;
        case 3: boxPos.row = _1; boxPos.col = _3; break;
        case 4: boxPos.row = _1; boxPos.col = _4; break;
        case 5: boxPos.row = _2; boxPos.col = _1; break;
        case 6: boxPos.row = _2; boxPos.col = _2; break;
        case 7: boxPos.row = _2; boxPos.col = _3; break;
        case 8: boxPos.row = _2; boxPos.col = _4; break;
        case 9: boxPos.row = _3; boxPos.col = _1; break;
        case 10: boxPos.row = _3; boxPos.col = _2; break;
        case 11: boxPos.row = _3; boxPos.col = _3; break;
        case 12: boxPos.row = _3; boxPos.col = _4; break;
        case 13: boxPos.row = _4; boxPos.col = _1; break;
        case 14: boxPos.row = _4; boxPos.col = _2; break;
        case 15: boxPos.row = _4; boxPos.col = _3; break;
        case 16: boxPos.row = _4; boxPos.col = _4; break;
    }
    box.style.top = boxPos.row;
    box.style.left = boxPos.col;
}
//clears the "neighbor" array, and sets it for provided position
function setNeighbors(position){
    neighbors = [];
    switch(position){
        case 1: neighbors.push(positions[1], positions[4]); break;
        case 2: neighbors.push(positions[0], positions[2], positions[5]); break;
        case 3: neighbors.push(positions[1], positions[3], positions[6]); break;
        case 4: neighbors.push(positions[2], positions[7]); break;
        case 5: neighbors.push(positions[0], positions[5], positions[8]); break;
        case 6: neighbors.push(positions[1], positions[4], positions[6], positions[9]); break;
        case 7: neighbors.push(positions[2], positions[5], positions[7], positions[10]); break;
        case 8: neighbors.push(positions[3], positions[6], positions[11]); break;
        case 9: neighbors.push(positions[4], positions[9], positions[12]); break;
        case 10: neighbors.push(positions[5], positions[8], positions[10], positions[13]); break;
        case 11: neighbors.push(positions[6], positions[9], positions[11], positions[14]); break;
        case 12: neighbors.push(positions[7], positions[10], positions[15]); break;
        case 13: neighbors.push(positions[8], positions[13]); break;
        case 14: neighbors.push(positions[9], positions[12], positions[14]); break;
        case 15: neighbors.push(positions[10], positions[13], positions[15]); break;
        case 16: neighbors.push(positions[11], positions[14]); break;
    }
}
//generates an array of size "n" of random numbers, without repeating
function genUniqueRandArray(n){
    let rand = 0;
    let randArray = [];
    for(let i = 0; i < n; i++){
        rand = Math.floor(Math.random() * n) + 1;
        if(!randArray.includes(rand)) randArray.push(rand);
        else i--;
    }
    return randArray;
}
//checks if the user solved the puzzle after each move
function solved() {
    for (let i = 0; i < 16; i++) {
        if (positions[i] !== i + 1) return false;
    }
    return true;
}
let popup = document.getElementById('newPopup');
function showPopup(){
    popup.style.display = "block";
}

function closePopup() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
};
function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds /3600);
    let minute = Math.floor((totalSeconds - hour*3600)/60);
    let seconds = totalSeconds - (hour*3600 + minute*60);

    document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}