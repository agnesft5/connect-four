const squares = document.querySelectorAll('.square');
const result = document.querySelector('#result');
const resultContainer = document.querySelector('#container');
const printCurrentPlayer = document.querySelector('#current-player');

let currentPlayer = 1;
let alreadyClickedArray = []
let alreadyClicked;

//TUTORIAL
// for (let i = 0; i < squares.length; i++)
//     (function (index) {
//         squares[i].onclick = () => {
//             if (squares[index + 7].classList.contains('taken')) {
//                 if (currentPlayer == 1) {
//                     squares[index].classList.add('taken');
//                     squares[index].classList.add('player-one');
//                     currentPlayer = 2
//                     printCurrentPlayer.textContent = currentPlayer;
//                 } else if (currentPlayer == 2) {
//                     squares[index].classList.add('taken');
//                     squares[index].classList.add('player-two');
//                     currentPlayer = 1
//                     printCurrentPlayer.textContent = currentPlayer;
//                 }
//             } else {
//                 alert('Can not go here!')
//             }
//         }
//     })(i);


function checkClick(index) {
    if (alreadyClickedArray.length == 0) {
        alreadyClicked = false;
    } else {
        let check = alreadyClickedArray.indexOf(index);
        if (check != -1) {
            alreadyClicked = true
        } else {
            alreadyClicked = false
        }
    }
}


function build() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].onclick = () => {
            checkClick(i)
            if (squares[i + 6].classList.contains('taken')) {
                if (currentPlayer == 1 && !alreadyClicked) {
                    squares[i].classList.add('taken');
                    squares[i].classList.add('player-one');
                    alreadyClickedArray.push(i);
                    currentPlayer = 2
                    printCurrentPlayer.textContent = currentPlayer;
                    printCurrentPlayer.classList.remove('current-one');
                    printCurrentPlayer.classList.add('current-two');
                } else if (currentPlayer == 1 && alreadyClicked) {
                    result.textContent = 'Already clicked! Try again';
                    resultContainer.classList.remove('displayNone');
                    result.classList.add('current-one');
                    setTimeout(() => {
                        result.textContent = '';
                        resultContainer.classList.add('displayNone');
                        result.classList.remove('current-one');
                    }, 1500);
                    currentPlayer = 1
                    printCurrentPlayer.textContent = currentPlayer;
                } else if (currentPlayer == 2 && !alreadyClicked) {
                    squares[i].classList.add('taken');
                    squares[i].classList.add('player-two');
                    alreadyClickedArray.push(i);
                    currentPlayer = 1
                    printCurrentPlayer.textContent = currentPlayer;
                    printCurrentPlayer.classList.remove('current-two');
                    printCurrentPlayer.classList.add('current-one');
                } else if (currentPlayer == 2 && alreadyClicked) {
                    result.textContent = 'Already clicked! Try again';
                    resultContainer.classList.remove('displayNone');
                    result.classList.add('current-two');
                    setTimeout(() => {
                        result.textContent = '';
                        resultContainer.classList.add('displayNone');
                        result.classList.remove('current-two');
                    }, 1500);
                    currentPlayer = 2
                    printCurrentPlayer.textContent = currentPlayer;
                }
            } else {
                alert('Can not go here!')
            }
        }
    }
}

function checkStatus() {
    let status = result.textContent;
    if (status == 'Player one wins!' || status == 'Player two wins!') {
        setTimeout(() => {
            result.textContent = 'Play again';
            result.classList.add('clickable');
            result.addEventListener('click', reload);
        }, 3000);
    }
}

function checkConnect() {
    const winningArrays = [
        [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
        [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
        [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
        [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
        [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
        [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
        [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
        [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
        [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
        [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
    ];

    for (let j = 0; j < winningArrays.length; j++) {
        let square1 = squares[winningArrays[j][0]];
        let square2 = squares[winningArrays[j][1]];
        let square3 = squares[winningArrays[j][2]];
        let square4 = squares[winningArrays[j][3]];

        if (square1.classList.contains('player-one') && square2.classList.contains('player-one') && square3.classList.contains('player-one') && square4.classList.contains('player-one')) {
            resultContainer.classList.remove('displayNone');
            result.textContent = "Player one wins!";
            result.classList.add('current-one')
            for (let i = 0; i < squares.length; i++) {
                squares[i].onclick = null;
            }
        } else if (square1.classList.contains('player-two') && square2.classList.contains('player-two') && square3.classList.contains('player-two') && square4.classList.contains('player-two')) {
            resultContainer.classList.remove('displayNone');
            result.textContent = "Player two wins!";
            result.classList.add('current-two')
            for (let i = 0; i < squares.length; i++) {
                squares[i].onclick = null;
            }
        }
    }
    checkStatus();
}

function load() {
    build();
    squares.forEach(square => square.addEventListener('click', checkConnect));
}

function reload() {
    currentPlayer = 1;
    printCurrentPlayer.textContent = currentPlayer;
    printCurrentPlayer.classList.remove('current-two');
    printCurrentPlayer.classList.add('current-one');
    alreadyClickedArray = []
    alreadyClicked;
    result.textContent = ""
    resultContainer.classList.add('displayNone');
    result.classList.remove('current-one', 'current-two');
    for (let k = 0; k < squares.length; k++) {
        if (k < 36) {
            squares[k].classList.remove('taken', 'player-one', 'player-two');
        }
    }
    load();
}


load();