var array = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
//現在動いているブロックがどこにあるかを保持する配列を追加
var move = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
// 動かす対象があるかどうか(0はない、1はあることを示す)
var moveFlag = 0;
// スタートしたかどうか（0してない、1した）
var gamestartFlag = 0;


// 描画処理
function draw() {
    $('#game').find('tr').each(function(i, elemTr) { // trタグそれぞれに対する処理
        $(elemTr).children().each(function(j, elemTd) { // tdタグそれぞれに対する処理
            $(elemTd).removeClass(); // まずはクラスをすべてなしにする
            switch (array[i][j]) {
                case 1:
                    $(elemTd).addClass("stick"); // 1の時にはstickクラスを割り振る
                    break;
                default:
                    $(elemTd).addClass("default"); // それ以外の時にはdefaultクラスを割り振る
            }
        })
    });
}

// 落下処理
function fall() {
    var under = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (var i = 19; i >= 0; i--) {
        for (var j = 0; j < 10; j++) {
            if (under[j] == 0) {
                if (array[i][j] == 0) {
                    // 下に何もなくブロックでもない
                    under[j] = 0;
                } else {
                    // 下に何もなくブロックであるとき
                    array[i + 1][j] = array[i][j];
                    array[i][j] = 0;
                    // moveも一緒に動かす
                    if (move[i][j] == 1) {
                        move[i][j] = 0;
                        move[i + 1][j] = 1;
                    }
                    under[j] = 0;
                }
            } else {
                if (array[i][j] == 0) {
                    // 下がブロックでブロックでないとき
                    under[j] = 0;
                } else {
                    // 下がブロックでブロックのとき
                    if(move[i][j] == 1){
                        resetMove();
                    }
                    under[j] = 1;
                }
            }
        }
    }
}
//ブロックを追加できるように    
function resetMove() {
    moveFlag = 0;
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            move[i][j] = 0;
        }
    }
    genBlock();
}

//ブロックを呼び出す
function genBlock() {
    var blockNum = Math.floor(Math.random() * 7);
    if(moveFlag === 1){
        return;
    }
    switch (blockNum) {
        case 0://I
            array[0][5] =  1;
            array[1][5] =  1;
            array[2][5] =  1;
            array[3][5] =  1;
            // moveも一緒に変更する
            move[0][5] = 1;
            move[1][5] = 1;
            move[2][5] = 1;
            move[3][5] = 1;
            break;
        case 1://T
            array[0][2] =  1;
            array[0][3] =  1;
            array[0][4] =  1;
            array[1][3] =  1;
            // moveも一緒に変更する
            move[0][2] =  1;
            move[0][3] =  1;
            move[0][4] =  1;
            move[1][3] =  1;
            break;
        case 2://□
            array[0][4] =  1;
            array[0][5] =  1;
            array[1][4] =  1;
            array[1][5] =  1;
            // moveも一緒に変更する
             move[0][4] =  1;
             move[0][5] =  1;
             move[1][4] =  1;
             move[1][5] =  1;
            break;
        case 3://_|￣
            array[0][4] =  1;
            array[0][5] =  1;
            array[1][3] =  1;
            array[1][4] =  1;
            // moveも一緒に変更する
            move[0][4] =  1;
            move[0][5] =  1;
            move[1][3] =  1;
            move[1][4] =  1;
            break;
        case 4://￣|_
            array[0][3] =  1;
            array[0][4] =  1;
            array[1][4] =  1;
            array[1][5] =  1;
            // moveも一緒に変更する
            move[0][3] =  1;
            move[0][4] =  1;
            move[1][4] =  1;
            move[1][5] =  1;
            break;
        case 5://L1
            array[0][3] =  1;
            array[0][4] =  1;
            array[0][5] =  1;
            array[1][5] =  1;
            // moveも一緒に変更する
            move[0][3] =  1;
            move[0][4] =  1;
            move[0][5] =  1;
            move[1][5] =  1;
            break;
        case 5://L2
            array[0][5] =  1;
            array[1][3] =  1;
            array[1][4] =  1;
            array[1][5] =  1;
            // moveも一緒に変更する
            move[0][5] =  1;
            move[1][3] =  1;
            move[1][4] =  1;
            move[1][5] =  1;
            break;
    }
    moveFlag = 1;
}

function moveBlockRight() {
    for (var i = 19; i >= 0; i--) {
        var newMove = move[i].concat();
        for (var j = 8; j >= 0; j--) {
            if (move[i][j] == 1) {
                array[i][j + 1] = array[i][j];
                array[i][j] = 0;
                newMove[j + 1] = 1;
                newMove[j] = 0;
            }
        }
        move[i] = newMove;
    }
}

function moveBlockLeft() {
    for (var i = 19; i >= 0; i--) {
        var newMove = move[i].concat();
        for (var j = 1; j < 10; j++) {
            if (move[i][j] == 1) {
                array[i][j - 1] = array[i][j];
                array[i][j] = 0;
                newMove[j - 1] = 1;
                newMove[j] = 0;
            }
        }
        move[i] = newMove;
    }
}
//ブロックを消すか
function checkDelete() {
    for (var i = 19; i >= 0; i--) {
        if (!array[i].includes(0)) {
            for (var j = 0; j < 10; j++) {
                array[i][j] = 0;
            }
        }
    }
}

//キーボード操作
document.onkeydown = function(e) {
    switch (e.code) {
        case "Space":
            genBlock();
            break;
        // ここから下を追加する
        case "ArrowRight":
            moveBlockRight();
            break;
        case "ArrowLeft":
            moveBlockLeft();
            break;
    }
    draw();
}

$(document).ready(function(){
    $(".gameStart").on({
        'click':function(){
            genBlock();
            draw(); // 読込が完了したらまず表示
            setInterval(function() {
                checkDelete();
                fall();
                draw();
            }, 500); // 0.5秒ごとに表示を更新していきます
        },
        'mouseenter':function(){
            console.log("gameStartにマウスが重なった");
        }
    })
  });