(function () {
    var table = document.getElementById("table");

    var x;
    var y;
    var d = '';

    for (y = 0; y < 9; y++) {
        d += "<tr>";
        for (x = 0; x < 9; x++) {
            d += "<td>" + "<input type='number' class='form-control' min='1'  max='9' id='" + y + ',' + x + "'>" + "</td>";
        }
        d += "</tr>";
    }
    table.innerHTML = d;

})();



var sudokuTemplate = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function resolverSudoku() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const valor = document.getElementById(i + ',' + j).value
            if (valor === '') {
                sudokuTemplate[i][j] = 0
            } else if (valor !== '') {

                sudokuTemplate[i][j] = parseInt(valor)
            }
        }
    }
    let validacao = validarInput(sudokuTemplate)
    //console.log(validacao)
    if (validacao) {
        let sudokuResolvido = bruteForce(sudokuTemplate)
        atualizarInterface(sudokuResolvido);
    } else {
        aviso = document.getElementById('warning-txt')
        spop({
            template:'<strong>Valores inseridos incorretamente, limpe e insira novamente os valores.</strong>', 
            style:'error',
            autoclose: 4000
          });

        let botaoLimpar = document.getElementById('botao-limpar')
        botaoLimpar.disabled = false

        return false
    }
}

function validarInput(sudoku) {
    for (let index = 0; index < 9; index++) {
        for (let i = 0; i < 9; i++) {
            for (let j = i + 1; j < 9; j++) {
                //checar linhas
                if ((sudoku[index][i] === sudoku[index][j]) && sudoku[index][i] > 0) {

                    // console.log("sudoku[index][i]: " + sudoku[index][i])
                    // console.log("sudoku[index][j]: " + sudoku[index][j])
                    return false
                }
            }
        }
    }
    for (let index = 0; index < 9; index++) {
        for (let i = 0; i < 9; i++) {
            for (let j = i + 1; j < 9; j++) {
                //checar linhas
                if ((sudoku[i][index] === sudoku[j][index]) && sudoku[i][index] > 0) {

                    // console.log("sudoku[i][index]: " + sudoku[i][index])
                    // console.log("sudoku[j][index]: " + sudoku[j][index])
                    return false
                }
            }
        }
    }


    // var caixa_x,
    //     caixa_y

    // caixa_x = Math.floor(linha / 3) * 3
    // caixa_y = Math.floor(coluna / 3) * 3
    // for (let index = 0; index < 9; index++) {
    //     for (let l = 0; l < 3; l++) {
    //         for (let col = 0; col < 3; col++) {
    //             for (let i = l + 1; i < 3; i++) {
    //                 for (let j = col + 1; j < 3; j++) {
    //                     if ((sudoku[caixa_x + l][caixa_y + col] === sudoku[caixa_x + i][caixa_y + j])) {

    //                         return false
    //                     }
    //                 }
    //             }
    //         }
    //     }

    // }

    for (let row = 0; row < 9; row = row + 3) {

        for (let col = 0; col < 9; col = col + 3) {
            let arr = []
            for (let r = row; r < row + 3; r++) {
                for (let c = col; c < col + 3; c++) {
                    arr.push(sudoku[r][c])
                }
            }
            let checkVal = validarQuadrados(arr)
            if (checkVal === false) {
                console.log(checkVal)
                return false
            }
        }
    }
    return true
}

function validarQuadrados(arr) {
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            //checar linhas
            if (arr[i] === arr[j] && arr[i] > 0) {

                // console.log("arr 1: " + arr[i])
                // console.log("arr j: " + arr[j])
                return false
            }
        }
    }
}
























// function print_board(board) {

//     var i, j;
//     for (i = 0; i < board.length; i++) {
//         if ((i % 3 == 0) && (i != 0)) {
//             console.log("- - - - - - - - - - - - - ")
//         }

//         for (j = 0; j < board.length; j++) {
//             if (j % 3 == 0 && j != 0) {
//                 console.log(" | ")
//             }
//             if (j == 8) {
//                 console.log(board[i][j]);
//             } else {
//                 console.log(board[i][j] + " ")
//             }
//         }
//     }
// }


// 0 é vazio
function procurarEspacoVazio(sudoku) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === 0) {
                //retorna a indexação do espaço vazio
                return [i, j]
            }
        }
    }
    return [-1, -1];
}

function checarSolucao(sudoku, linha, coluna, numero) {

    let vetorVerificador = []


    for (let col = 0; col < sudoku[linha].length; col++) {
        //checar linhas
        if ((sudoku[linha][col] === numero)) {
            vetorVerificador.push(false)

        }
    }
    for (let l = 0; l < sudoku.length; l++) {
        //checar colunas
        if ((sudoku[l][coluna] === numero)) {
            vetorVerificador.push(false)
        }
    }
    var caixa_x,
        caixa_y

    caixa_x = Math.floor(linha / 3) * 3
    caixa_y = Math.floor(coluna / 3) * 3

    for (let l = 0; l < 3; l++) {
        for (let col = 0; col < 3; col++) {
            if ((sudoku[caixa_x + l][caixa_y + col] === numero)) {
                vetorVerificador.push(false)
            }
        }
    }

    vetorVerificador.push(true)
    return vetorVerificador
}

function checarLinha(sudoku, linha, coluna, numero) {

    for (let i = 0; i < sudoku[linha].length; i++) {
        //checar linhas
        if ((sudoku[linha][i] === numero)) {
            return false
        }
    }
    return true
}


function bruteForce(sudoku) {
    let posicao = procurarEspacoVazio(sudoku)
    let linha,
        coluna


    linha = posicao[0]
    coluna = posicao[1]

    if (coluna === -1) {
        return sudoku
    }



    for (let i = 1; i <= 9; i++) {
        //console.log(checarSolucao(board, linha , coluna, i))
        let ver = checarSolucao(sudoku, linha, coluna, i)
        if (ver[0] === true) {
            sudoku[linha][coluna] = i
            bruteForce(sudoku);
        }
    }

    if (procurarEspacoVazio(sudoku)[0] !== -1) {
        sudoku[linha][coluna] = 0;
    }
    return sudoku
}

function atualizarInterface(sudoku) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const valor = document.getElementById(i + ',' + j)
            valor.value = sudoku[i][j];
            valor.readOnly = true
        }
    }
    let botaoLimpar = document.getElementById('botao-limpar')
    botaoLimpar.disabled = false
}

function limparTabela() {

    let aviso = document.getElementById('warning-txt')
    aviso.textContent = ''

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const valor = document.getElementById(i + ',' + j)
            valor.value = ''
            valor.readOnly = false
        }
    }
    let botaoLimpar = document.getElementById('botao-limpar')
    botaoLimpar.disabled = true
}
// let solved
// solved = bruteForce(sudokuTeste)
// print_board(solved);









// var sudokuTeste = [
//     [4,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,4,0,0],
//     [0,0,2,0,0,0,0,0,0]
// ]


// function gerarSudoku(){
//     (function () {
//         var app = document.getElementById("app");
//         let table = document.createElement('table');
//         app.appendChild(table)
//         table.setAttribute('id' , 'tabela_sudoku')

//         for (let i = 0; i < 9; i++) {
//             let tableRow = document.createElement('tr')
//             table.appendChild(tableRow)
//           for (let x = 0; x < 9; x++) {
//           }
//         }

//       })();
// }


// function print_board(board) {

//     var i , j;
//     for (i = 0; i < board.length ; i++){
//         if ((i % 3 == 0) && (i !=0)){
//             console.log("- - - - - - - - - - - - - ")
//         }

//         for (j = 0; j < board.length ; j++){
//             if (j % 3 == 0 && j != 0){
//                 process.stdout.write(" | ")
//             }
//             if (j==8){
//                 console.log(board[i][j]);
//             } else {
//                 process.stdout.write(board[i][j] + " ")    
//                 }
//         }
//     }
// }


// // 0 é vazio
// function procurarEspacoVazio(board) {
//     for (let i = 0; i < 9 ; i++){
//         for (let j = 0; j < 9 ; j++){
//             if (board[i][j] === 0){
//                 //retorna a indexação do espaço vazio
//                 return [i , j]
//             }
//         }
//     }
//     return [-1 , -1];
// }

// function checarSolucao (board , linha , coluna , numero) {

//     let vetorVerificador = []


//     for (let i = 0 ; i < board[linha].length ; i++) {
//         //checar linhas
//         if ((board[linha][i] === numero)){
//             vetorVerificador.push(false)

//         }
//     }
//     for (let i = 0 ; i < board.length ; i++) {
//         //checar colunas
//         if ((board[i][coluna] === numero)){
//             vetorVerificador.push(false)
//         }
//     }
//     var caixa_x,
//         caixa_y

//     caixa_x = Math.floor(linha / 3) * 3
//     caixa_y = Math.floor(coluna / 3) * 3

//     for(let i = 0 ; i < 3; i++){
//         for(let j = 0 ; j < 3 ; j++){
//             if((board[caixa_x + i][caixa_y + j] === numero)){
//                 vetorVerificador.push(false)
//             }
//         }
//     }

//     vetorVerificador.push(true)
//     // console.log(vetorVerificador)
//     return vetorVerificador
// }

// function checarLinha(board , linha , coluna , numero) {

//         for (let i = 0 ; i < board[linha].length ; i++) {
//         //checar linhas
//         if ((board[linha][i] === numero)){
//             return false

//         }
//     }
//     return true
// }


// function bruteForce(board) {
//     let posicao = procurarEspacoVazio(board)
//     let linha, 
//         coluna


//         linha = posicao[0]
//         coluna = posicao[1]

//         if (coluna === -1) {
//             return board
//         }



//     for (let i=1; i <= 9 ; i++) {
//         //console.log(checarSolucao(board, linha , coluna, i))
//         let ver = checarSolucao(board, linha, coluna, i)
//         if(ver[0] === true){
//             board[linha][coluna] = i
//             bruteForce(board);            
//         }
//     }

//     if (procurarEspacoVazio(board)[0] !== -1){
//         board[linha][coluna] = 0;
//     }

//     return board
// }
// let solved
// solved = bruteForce(sudokuTeste)
// print_board(solved);
