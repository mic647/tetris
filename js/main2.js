'use stricr';

var cell;
var gBoard;
var gNextBoard;
var gPiece;
var nextBoardSize = 5;
var SIZE = 14;
var shapes = [];
var currentShape;
var nextShape;
var idxAndColor = []
var state = 1;
var colors = ['green', 'red', 'blue', 'yellow'];
var move = 0;
var direction = '';
var gScore = 0;
var gInterval;
var isOn = false;
var speed = 1000;
var gStartTime;
var gTime;
var boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
var I;
var O;
var T;
var L;
var S;
var J;
var Z;


function init() {
    gNextBoard = buildBoard(nextBoardSize, 1)
    renderBoard(gNextBoard, 'cellNext', '.next-board');
    gBoard = buildBoard(SIZE, 2);
    renderBoard(gBoard, 'cell', '.board');
    updateScore(0);
    createShapes();
    clearInterval(gInterval);
    clearInterval(gTime);
    document.querySelector('.time span').innerText = '00:00';
    // createNextShape();
}

function startGame() {
    init()
    createShapes();
    createNextShape();
    createShape();
    gScore = 0;
    updateScore(0)
    hideBtn('.btn-st', 'none')
    hideBtn('.btn-pu', 'inline-block')
    startTime()
    modal(0, 'none')
    isOn = true;
    gInterval = setInterval(() => {
        direction = 'down'
        movePiece()
    }, speed);
}

function levelGame(elBtn) {
    if (isOn) return;
    if (elBtn.innerText === 'Level 1') speed = 1000;
    if (elBtn.innerText === 'Level 2') speed = 600;
    if (elBtn.innerText === 'Level 3') speed = 300;
    hideBtn('.btn-st', ' inline-block')
    hideBtn('.reset', ' inline-block')

}

function buildBoard(size, secSize) {
    var board = [];
    for (var i = 0; i < size * secSize; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            cell = {
                number: 0,
                isOn: true
            }
            board[i][j] = cell;

        }
    }
    return board;
}


function renderBoard(board, cellName, str) {
    var strHTML = '<tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            // var cell = board[i][j];
            var className = `${cellName} ${cellName}${i}-${j}`;
            strHTML += `<td class="${className}"></td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody>';
    var elContainer = document.querySelector(str);
    elContainer.innerHTML = strHTML;
}


function createShapes() {
    T = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ]; // 't' shape
    I = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]; // line
    O = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
    ]; // 4 x 4 square
    J = [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]; // 'L' shape
    L = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ]; // 'L' shape
    S = [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ];
    Z = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ];

    shapes.push(T);
    shapes.push(I);
    shapes.push(O);
    shapes.push(L);
    shapes.push(J);
    shapes.push(S);
    shapes.push(Z);
}

function createNextShape() {
    var randomShape = Math.floor(Math.random() * shapes.length);
    var randomColor = Math.floor(Math.random() * colors.length);
    var shape = shapes[randomShape];

    nextShape = {
        shape: shape,
        color: colors[randomColor],
        indexes: []
    }
    setNextIndexes()
}

function setNextIndexes() {
    for (var i = 0; i < nextShape.shape.length; i++) {
        for (var j = 0; j < nextShape.shape[0].length; j++) {
            if (nextShape.shape[i][j] === 1) {
                gNextBoard[i][j + 1].number = 1
                nextShape.indexes.push({ i: i, j: j + 1 });
            }
        }
    }
    console.log(nextShape);
    renderNextCell(nextShape.color, '.cellNext')
}

function createShape() {
    renderNextCell('white', '.cellNext')
    var location = { i: 0, j: getRandomInt(0, gBoard[0].length - nextShape.shape[0].length) };
    currentShape = {
        shape: nextShape.shape,
        color: nextShape.color,
        location: location,
        indexes: []
    };
    createNextShape()
    setIndexes()
}



function setIndexes() {
    for (var i = 0; i < currentShape.shape.length; i++) {
        for (var j = 0; j < currentShape.shape[0].length; j++) {
            if (currentShape.shape[i][j] === 1) {
                gBoard[i][j + currentShape.location.j].number = 1
                currentShape.indexes.push({ i: i, j: j + currentShape.location.j });


            }
        }
    }

    renderCell(currentShape.color, '.cell', boxShadow)
}

function movePiece() {
    if (!isOn) return;
    var currIdx = currentShape.indexes;
    if (!checkRows()) return;
    checkCompeitRows();
    for (var i = 0; i < currIdx.length; i++) {
        gBoard[currIdx[i].i][currIdx[i].j].number = 0;
    }
    if (direction === 'down') {
        for (var i = 0; i < currIdx.length; i++) {
            renderCell('lightcoral', '.cell', 'none');
            currIdx[i].i++;
        }
    }
    if (direction === 'left') {
        for (var i = 0; i < currIdx.length; i++) {
            renderCell('lightcoral', '.cell', 'none');
            currIdx[i].j--;
        }
    }
    if (direction === 'right') {
        for (var i = 0; i < currIdx.length; i++) {
            renderCell('lightcoral', '.cell','none');
            currIdx[i].j++;
        }
    }
    for (var i = 0; i < currIdx.length; i++) {
        gBoard[currIdx[i].i][currIdx[i].j].number = 1;
    }
    renderCell(currentShape.color, '.cell', boxShadow);
}

function checkRows() {
    var currIdx = currentShape.indexes
    // console.log(currIdx);
    for (var i = 0; i < currIdx.length; i++) {
        if (direction === 'down' && currIdx[i].i === gBoard.length - 1) {
            gBoard[currIdx[i].i][currIdx[i].j].number = 0;
            for (var i = 0; i < currIdx.length; i++) {
                gBoard[currIdx[i].i][currIdx[i].j].number = 2
                idxAndColor.push({ color: currentShape.color, i: currIdx[i].i, j: currIdx[i].j })
            }
            checkGameOver();
            if (!isOn) return;
            checkCompeitRows();
            gPressOnKey = 0;
            createShape();
            return false;
        }
        if (direction === 'down' && gBoard[currIdx[i].i + 1][currIdx[i].j].number === 2) {
            for (var i = 0; i < currentShape.indexes.length; i++) {
                gBoard[currIdx[i].i][currIdx[i].j].number = 2
                idxAndColor.push({ color: currentShape.color, i: currIdx[i].i, j: currIdx[i].j })
            }
            checkGameOver();
            if (!isOn) return;
            checkCompeitRows();
            gPressOnKey = 0;
            createShape();
            return false;
        }
        if (direction === 'left' && currIdx[i].j === 0 || direction === 'right' && currIdx[i].j === gBoard[0].length - 1 || direction === 'right' && gBoard[currIdx[i].i][currIdx[i].j + 1].number === 2 || direction === 'left' && gBoard[currIdx[i].i][currIdx[i].j - 1].number === 2) {
            return false;
        };
    }
    return true;
}

function checkCompeitRows() {
    var nums = -1;
    var rowI;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].number === 2) {
                nums++;
            }
            if (nums === gBoard[0].length - 1) {
                rowI = i
                for (var j = 0; j < gBoard[0].length; j++) {
                    gBoard[i][j].number = 0;
                    renderRow(i, j);
                    updateScore(10)
                }
                setTimeout(() => {
                    rowDowm(rowI)
                }, 1000);
            }
        }
        nums = -1;
    }
}

function rowDowm(idx) {
    for (var i = 0; i < idxAndColor.length; i++) {
        if (idxAndColor[i].i === idx) {
            idxAndColor[i].i = -1
        }
    }
    for (var i = 0; i < idxAndColor.length; i++) {
        if (idxAndColor[i].i < idx && idxAndColor[i].i > -1) {
            gBoard[idxAndColor[i].i][idxAndColor[i].j].number = 0
            renderBoardColor([i], 'lightcoral')
            idxAndColor[i].i++
            gBoard[idxAndColor[i].i][idxAndColor[i].j].number = 2
            renderBoardColor([i], idxAndColor[i].color);
        }
    }
}

// Move the player by keyboard arrows
function handleKey(event) {
    switch (event.key) {
        case 'ArrowDown':
            direction = 'down';
            movePiece()
            break;
        case 'ArrowLeft':
            direction = 'left';
            movePiece()
            break;
        case 'ArrowRight':
            direction = 'right';
            movePiece()
            break;
        case 'ArrowUp':
            direction = 'up';
            rotatePieces();
            break;
    }
}


var gPressOnKey = 0
function rotatePieces() {
    var currIdx = currentShape.indexes;
    var colors = currentShape.color;
    if (currentShape.shape === T) {
        if (gPressOnKey === 0) {
            console.log(currIdx);
            renderCellRot(0, currIdx[1].i, currIdx[1].j, 'lightcoral')
            currIdx[1].i++
            currIdx[1].j++
            renderCellRot(1, currIdx[1].i, currIdx[1].j, colors)
            console.log(currIdx);

        } if (gPressOnKey === 1) {
            renderCellRot(0, currIdx[0].i, currIdx[0].j, 'lightcoral')
            currIdx[0].i++
            currIdx[0].j--
            renderCellRot(1, currIdx[0].i, currIdx[0].j, colors)
            console.log(currIdx);
        } if (gPressOnKey === 2) {
            renderCellRot(0, currIdx[3].i, currIdx[3].j, 'lightcoral')
            currIdx[3].i--
            currIdx[3].j--
            renderCellRot(1, currIdx[3].i, currIdx[3].j, colors)
            console.log(currIdx);
        } if (gPressOnKey === 3) {
            renderCellRot(0, currIdx[1].i, currIdx[1].j, 'lightcoral')
            currIdx[1].i--
            currIdx[1].j++
            renderCellRot(1, currIdx[1].i, currIdx[1].j, colors)
            console.log(currIdx);
        }
        movePiece();
    }
    gPressOnKey++
    console.log(gPressOnKey);

}

function renderCellRot(num, i, j, color) {
    gBoard[i][j].number = num
    var elPeice = document.querySelector(`.cell${i}-${j}`)
    elPeice.style.backgroundColor = color
}

function renderCell(color, selector, shadow) {
    var currIdx = currentShape.indexes;
    for (var i = 0; i < currIdx.length; i++) {
        var elPeice = document.querySelector(`${selector}${currentShape.indexes[i].i}-${currentShape.indexes[i].j}`)
        elPeice.style.backgroundColor = color
        elPeice.style. boxShadow = shadow

    }
}

function checkGameOver() {
    for (var i = 0; i < gBoard[0].length; i++) {
        if (gBoard[0][i].number === 2) {
            console.log('GA');
            clearInterval(gInterval);
            isOn = false;
            hideBtn('.btn-pu', 'none')
            hideBtn('.btn-st', 'block')
            modal(99, 'block')
        }
    }

}



function renderNextCell(color, selector) {
    var currIdx = nextShape.indexes;
    for (var i = 0; i < currIdx.length; i++) {
        var elPeice = document.querySelector(`${selector}${nextShape.indexes[i].i}-${nextShape.indexes[i].j}`)
        elPeice.style.backgroundColor = color
    }
}

function renderRow(i, j) {
    var elPeice = document.querySelector(`.cell${i}-${j}`)
    elPeice.style.backgroundColor = 'lightcoral'
}


function renderBoardColor(iRow, color) {
    var elPeice = document.querySelector(`.cell${idxAndColor[iRow].i}-${idxAndColor[iRow].j}`)
    elPeice.style.backgroundColor = color
}

function updateScore(value) {
    var elInnerText = document.querySelector('.score span');
    gScore += value;
    elInnerText.innerText = gScore;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function modal(zIndex, display) {
    var elModal = document.querySelector('.modal');
    elModal.style.zIndex = zIndex;
    elModal.style.display = display;
    elModal.innerText = `Game over!!! your score is  ${gScore}! `
}

function yesSure() {
    var elModal = document.querySelector('.open-game')
    elModal.style.display = 'none'

}

function hideBtn(selector, display) {
    var elBtn = document.querySelector(`${selector}`)
    elBtn.style.display = display
}


function puseGame() {
    hideBtn('.btn-pu', 'none')
    hideBtn('.btn-ke', 'inline-block')
    clearInterval(gTime)
    isOn = false;
}

function keepGame() {
    hideBtn('.btn-pu', 'inline-block')
    hideBtn('.btn-ke', 'none')
    gTime = setInterval(setTimeCounter, 1000)
    isOn = true;
}

function reset() {
    init();
    hideBtn('.btn-st', 'none')
    hideBtn('.btn-pu', 'none')
    hideBtn('.btn-ke', 'none')
    hideBtn('.reset', 'none')
}

function startTime() {
    gStartTime = Math.floor(Date.now() / 1000);
    gTime = setInterval(setTimeCounter, 1000)
}

function setTimeCounter() {
    if (isOn) {
        var now = Math.floor(Date.now() / 1000);
        var diff = now - gStartTime;
        var m = Math.floor(diff / 60);
        var s = Math.floor(diff % 60);
        m = checkTime(m);
        s = checkTime(s);
        document.querySelector('.time span').innerHTML = m + ":" + s;
    } else {
        gStartTime = Math.floor(Date.now() / 1000);
    }
}

function checkTime(i) {
    if (i < 10) { i = '0' + i };
    return i;
}

function arrowclicked(elBtn) {
    if (elBtn.innerText === '↓') {
        direction = 'down'
        movePiece()
    }
    if (elBtn.innerText === '←') {
        direction = 'left'
        movePiece()
    }
    if (elBtn.innerText === '→') {
        direction = 'right'
        movePiece()
    }
}

function resetTime() {
    clearInterval(gGame.secsPassed);
    document.querySelector('.btn-on-3 span').innerText = '00:00';
    gStartTime = Math.floor(Date.now() / 1000);
}