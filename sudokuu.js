var sudokuTeste = [
    [1,2,3,4,5,6,7,8,9],
    [10,11,12,13,14,15,16,17,18],
    [19,20,21,22,23,24,25,26,27],
    [28,29,30,31,32,33,34,35,36],
    [37,38,39,40,41,42,43,44,45],
    [46,47,48,49,50,51,52,53,54],
    [55,56,57,58,59,60,61,62,63],
    [64,65,66,67,68,69,70,71,72],
    [73,74,75,76,77,78,79,80,81]
]

function print_board(board) {

    var i , j;
    for (i = 0; i < board.length ; i++){
        if ((i % 3 == 0) && (i !=0)){
            console.log("- - - - - - - - - - - - - ")
        }

        for (j = 0; j < board.length ; j++){
            if (j % 3 == 0 && j != 0){
                process.stdout.write(" | ")
            }
            if (j==8){
                console.log(board[i][j]);
            } else {
                process.stdout.write(board[i][j] + " ")    
                }
        }
    }
}

print_board(sudokuTeste);

// 0 é vazio
var posicaoVazia

posicaoVazia = function procurarEspacoVazio(board) {
    var i , j;
    for (i = 0; i < board.length ; i++){
        for (j = 0; j < board.length ; j++){
            if (board[i][j] == ){
                //retorna a indexação do espaço vazio
                return (i , j);
            }
        }
    }
}

function checarSolucao (board , posicao , numero) {

    for (let i ; i < board.length ; i++) {
        //checar linhas
        if ((board[posicao[0]][i] == numero) && (posicao[1] != 1)){
            return false;
        }
    }
    for (let i ; i < board.length ; i++) {
        //checar colunas
        if ((board[i][posicao[0]] == numero) && (posicao[1] != 1)){
            return false;
        }
    }
    var caixa_x,
        caixa_y

    caixa_x = posicao[1] / 3
    caixa_y = posicao[0] / 3

    for(let i = 0 ; i < (caixa_y*3 + 3); i++){
        for(let j = 0 ; j < (caixa_x * 3 + 3 ) ; j++){
            if((board[i][j] == num) && (i,j) != posicao){
                return false
            }
        }
    }
}

function bruteForce(board) {
    var posicao;
    posicao = procurarEspacoVazio(board)
}

//console.log(sudokuTeste.length);