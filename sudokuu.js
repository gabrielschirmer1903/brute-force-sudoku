(function () {
    var table = document.getElementById("table");

    var x;
    var y;
    var d = '';

    for (y = 0; y < 9; y++) {
        d += "<tr>";
        for (x = 0; x < 9; x++) {
            d += "<td>" + "<input type='number' class='form-control'  max='9' id='" + y + ','+ x + "'>" + "</td>";
        }
        d += "</tr>";
    }
    table.innerHTML = d;

})();



var sudokuTeste = [
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
    for (let i = 0 ; i < 9 ; i++) {
        for (let j = 0 ; j < 9 ; j++) {
            const valor = document.getElementById(i + ',' +j).value
            if(valor===''){
                sudokuTeste[i][j] = 0
            } else if (valor !== ''){
                
                sudokuTeste[i][j] = valor
            }
        }    
    }
    bruteForce(sudokuTeste)
} 

// function gerarSudoku() {
//     (function () {
//         var app = document.getElementById("app");
//         let table = document.createElement('table');
//         app.appendChild(table)
//         table.setAttribute('id', 'tabela_sudoku')

//         for (let i = 0; i < 9; i++) {
//             let tableRow = document.createElement('tr')
//             table.appendChild(tableRow)
//             for (let x = 0; x < 9; x++) {
//             }
//         }

//     })();
// }


function print_board(board) {

    var i, j;
    for (i = 0; i < board.length; i++) {
        if ((i % 3 == 0) && (i != 0)) {
            console.log("- - - - - - - - - - - - - ")
        }

        for (j = 0; j < board.length; j++) {
            if (j % 3 == 0 && j != 0) {
                console.log(" | ")
            }
            if (j == 8) {
                console.log(board[i][j]);
            } else {
                console.log(board[i][j] + " ")
            }
        }
    }
}


// 0 é vazio
function procurarEspacoVazio(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                //retorna a indexação do espaço vazio
                return [i, j]
            }
        }
    }
    return [-1, -1];
}

function checarSolucao(board, linha, coluna, numero) {

    let vetorVerificador = []


    for (let i = 0; i < board[linha].length; i++) {
        //checar linhas
        if ((board[linha][i] === numero)) {
            vetorVerificador.push(false)

        }
    }
    for (let i = 0; i < board.length; i++) {
        //checar colunas
        if ((board[i][coluna] === numero)) {
            vetorVerificador.push(false)
        }
    }
    var caixa_x,
        caixa_y

    caixa_x = Math.floor(linha / 3) * 3
    caixa_y = Math.floor(coluna / 3) * 3

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((board[caixa_x + i][caixa_y + j] === numero)) {
                vetorVerificador.push(false)
            }
        }
    }

    vetorVerificador.push(true)
    // console.log(vetorVerificador)
    return vetorVerificador
}

function checarLinha(board, linha, coluna, numero) {

    for (let i = 0; i < board[linha].length; i++) {
        //checar linhas
        if ((board[linha][i] === numero)) {
            return false

        }
    }
    return true
}


function bruteForce(board) {
    let posicao = procurarEspacoVazio(board)
    let linha,
        coluna


    linha = posicao[0]
    coluna = posicao[1]

    if (coluna === -1) {
        return board
    }



    for (let i = 1; i <= 9; i++) {
        //console.log(checarSolucao(board, linha , coluna, i))
        let ver = checarSolucao(board, linha, coluna, i)
        if (ver[0] === true) {
            board[linha][coluna] = i
            bruteForce(board);
        }
    }

    if (procurarEspacoVazio(board)[0] !== -1) {
        board[linha][coluna] = 0;
    }

    atualizarInterface(board)
}

function atualizarInterface (board) {
    for (let i = 0 ; i < 9 ; i++) {
        for (let j = 0 ; j < 9 ; j++) {
            const valor = document.getElementById(i + ',' +j)
            valor.value = board[i][j];
            valor.readOnly=true
        }    
    }
    let botaoLimpar = document.getElementById('botao-limpar')
    botaoLimpar.disabled = false
}

function limparTabela(){
    for (let i = 0 ; i < 9 ; i++) {
        for (let j = 0 ; j < 9 ; j++) {
            const valor = document.getElementById(i + ',' +j)
            valor.value = ''
            valor.readOnly=false
        }    
    }
    let botaoLimpar = document.getElementById('botao-limpar')
    botaoLimpar.disabled = true
}
// let solved
// solved = bruteForce(sudokuTeste)
// print_board(solved);
