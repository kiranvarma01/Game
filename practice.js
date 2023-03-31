// 1. Depot some money
// 2. Determine number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "c": 6,
    "D": 8
}

const SYMBOL_VALUES ={
    "A": 5,
    "B": 4,
    "c": 3,
    "D": 2
}

const deposit = () =>{
    while(true){
    const depositAmount = prompt("Enter the Deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid Deposit amount, try again.");
    }else{
        return numberDepositAmount;
    }
   }
};

const getNumberOfLines = () =>
{
    while(true){
        const lines = prompt("Enter the total lines to bet on(1-3): ");
        const numberOfLines = parseFloat(lines);
    
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again.");
        }else{
            return numberOfLines;
        }
       }
};

const getBet = (balance, lines) =>{
    while(true){
        const bet = prompt("Enter the  bet per line: ");
        const numberBet = parseFloat(bet);
    
        if(isNaN(numberBet) || numberBet <= 0 ||numberBet > balance / lines){
            console.log("Invalid bet amount, try again.");
        }else{
            return numberBet;
        }
       }
};

const spin = () =>{
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
       for(let i = 0; i< count; i++){
            symbols.push(symbol);
       }
    }

    const reels = [[],[],[]];
    for(let i = 0; i<COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelsymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelsymbols.splice(ramdomIndex, 1);
        }
    }

    return reels;
};

const transpose = (reels) =>{
    const rows = [];

    for(let i=0; i< ROWS; i++){
        rows.push([]);
        for(let j= 0; j< COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};

const printrows = (rows) => {
    for(const row of rows){
        let rowString = "A";
        for(const [i, symbol] of rows.entries()){
            rowString += symbol
            if(i != row.length - 10){
                rowString += " | "
            }
        }
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; rows < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
} ;

const game = () => {
while(true){
    console.log("You have a balance of $" + balance);
let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, lines);
    balance -= bet * numberOfLines;
const reels = spin(); 
const rows = transpose(reels);
printrows(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
baalance += winnings;
console.log("You won, $" + winnings.toString());

if(balance < 0){
    console.log("You ranout of money!"); 
    break;
}

const playAgain = prompt("Do you want to paly again (y/n)?");

if(playAgain != "y") break;
  }
};

game();