'use strict';

function rotatePiecesT() {
    var currIdx = currentShape.indexes;
    var colors = currentShape.color;
    if (gPressOnKeyT === 0) {
        renderCellRot(0, currIdx[1].i, currIdx[1].j, 'lightcoral')
        currIdx[1].i++
        currIdx[1].j++
        renderCellRot(1, currIdx[1].i, currIdx[1].j, colors)
    } if (gPressOnKeyT === 1) {
        renderCellRot(0, currIdx[0].i, currIdx[0].j, 'lightcoral')
        currIdx[0].i++
        currIdx[0].j--
        renderCellRot(1, currIdx[0].i, currIdx[0].j, colors)
    } if (gPressOnKeyT === 2) {
        renderCellRot(0, currIdx[3].i, currIdx[3].j, 'lightcoral')
        currIdx[3].i--
        currIdx[3].j--
        renderCellRot(1, currIdx[3].i, currIdx[3].j, colors)
    } if (gPressOnKeyT === 3) {
        renderCellRot(0, currIdx[1].i, currIdx[1].j, 'lightcoral')
        currIdx[1].i--
        currIdx[1].j++
        renderCellRot(1, currIdx[1].i, currIdx[1].j, colors)
    }
    movePiece();
    gPressOnKeyT++
}


function rotatePiecesI() {
    var currIdx = currentShape.indexes;
    var colors = currentShape.color;
    console.log('jjjjjjjjjjjjj');
    if (gPressOnKeyI === 0) {
        for (var i = 0; i < 3; i++) {
            renderCellRot(0, currIdx[i].i, currIdx[i].j, 'lightcoral')
        }
        currIdx[0].i += 3
        currIdx[0].j += 3
        currIdx[1].i += 2
        currIdx[1].j += 2
        currIdx[2].i++
        currIdx[2].j++
        renderCellRot(1, currIdx[0].i, currIdx[0].j, colors)
        renderCellRot(1, currIdx[1].i, currIdx[1].j, colors)
        renderCellRot(1, currIdx[2].i, currIdx[2].j, colors)
        // } if (gPressOnKeyI === 1) {
        //     renderCellRot(0, currIdx[0].i, currIdx[0].j, 'lightcoral')
        //     currIdx[0].i++
        //     currIdx[0].j--
        //     renderCellRot(1, currIdx[0].i, currIdx[0].j, colors)
        // }
    }
    movePiece()
    gPressOnKeyI++
}

function renderCellRot(num, i, j, color) {
    gBoard[i][j].number = num
    var elPeice = document.querySelector(`.cell${i}-${j}`)
    elPeice.style.backgroundColor = color
    elPeice.style.boxShadow = 'none'
}

