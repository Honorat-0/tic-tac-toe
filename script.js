const game = (function() {

    const player = function() {
        let score = 0;
        let track = [];
        return {score, track}
    }

    
    const player1 = player();
    const player2 = player();
    player1.pawn = "x";
    player2.pawn = "o"

    const win = {
        a: [1,2,3],
        b: [4,5,6],
        c: [7,8,9],
        e: [1,5,9],
        f: [3,5,7],
        g: [1,4,7],
        h: [2,5,8],
        i: [3,6,9],
    }

    
    let turn = 0;
    

    const play = function(position, div) {
        if(!(player2.track.includes(position) || player1.track.includes(position)) && turn <= 9) {
            if(turn%2 == 0) {
                player1.track.push(position)
                div.textContent = player1.pawn;
                xTurn.classList.toggle("turn")
                oTurn.classList.toggle("turn")
            } else {
                player2.track.push(position)
                div.textContent = player2.pawn;
                oTurn.classList.toggle("turn")
                xTurn.classList.toggle("turn")
            }    

            turn++;
            check()        
        }

        return {player1, player2, turn}
    }


    const init = function() {
        xTurn.classList.add("turn")
        oTurn.classList.remove("turn")
        dialog.showModal()
        turn = 0;
        player1.track  = [];
        player2.track = [];
    
    }

    const countFn = function(count, player, score) {

        if(count == 3) {
             win[pro].forEach(position => cell[position - 1].className += " win");
             player.score += 1;
             score.textContent = player.score;
             winner = 1;
             decision.textContent = "Winner!"
             info.textContent = player.pawn;
             init() 
        }

    }

    const check = function() {
        for (pro in win) {
            
            let count1 = 0;
            let count2 = 0;

            win[pro].forEach(item=> {
                if(player1.track.includes(item)) {
                    count1++;
                } else if(player2.track.includes(item)) {
                    count2++;
                }
            })  

            countFn(count1, player1, score1);
            countFn(count2, player2, score2);
        }

        if (turn == 9 && winner == 0) {
            decision.textContent = "Draw!"
            info.textContent = "x o"
            init()
        }

        
    }
    

    return {player, play, check}
})()


let winner = 0;

const cell = document.querySelectorAll(".cell")
const score1 = document.querySelector(".player1")
const score2 = document.querySelector(".player2")
const dialog = document.querySelector("dialog")
const btn = document.querySelector("dialog button")
const decision = document.querySelector("dialog .decision")
const info = document.querySelector("dialog .player")
const xTurn = document.querySelector(".x") 
const oTurn = document.querySelector(".o")


cell.forEach((div, index) => div.addEventListener("click", ()=> {
    const choose = index +1;
    game.play(choose, div)    
}))


btn.addEventListener("click", ()=> {
    dialog.close()
    cell.forEach(div => 
        {
            div.textContent = "";
            div.classList.remove("win")
            winner = 0;
        })

})

