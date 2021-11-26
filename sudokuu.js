(function () {
    var table = document.getElementById("table");

    var x;
    var y;
    var d = '';

    for (y = 0; y < 9; y++) {
        d += "<tr>";
        for (x = 0; x < 9; x++) {
            d += "<td id='td"+ y + x +"'>" + "<input type='number' class='form-control' min='1'  max='9' id='" + y + ',' + x + "'>" + "</td>";
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
                const valorIgual = sudoku[index][i] === sudoku[index][j]
                const valorMaiorqzero = sudoku[index][i] > 0
                if (valorIgual && valorMaiorqzero) {
                    return false
                }
            }
        }
    }
    for (let index = 0; index < 9; index++) {
        for (let i = 0; i < 9; i++) {
            for (let j = i + 1; j < 9; j++) {
                //checar colunas
                const valorIgual = sudoku[i][index] === sudoku[j][index]
                const valorMaiorqzero = sudoku[i][index] > 0
                if (valorIgual && valorMaiorqzero) {
                    return false
                }
            }
        }
    }


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