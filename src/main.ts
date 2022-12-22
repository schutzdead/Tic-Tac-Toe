import './style.css'

const buttonPlay = document.querySelector('.reset') as HTMLElement;
const croix = document.querySelector('.croix') as HTMLElement;
const rond = document.querySelector('.rond') as HTMLElement;
const finalDiv = document.querySelector('.winnerDiv') as HTMLElement;
const finalMessage = document.querySelector('.winnerMessage') as HTMLElement;
const computerStart = document.querySelector('.campTitle') as HTMLElement;

let computerChoice:number = 0;
let winner:string = '';
let fullOrNot:number = 0;

const players = (team:string) => {
    return {
        team:team,
    };
};

let playerOne=players('X');
let IA = players('O');

const modulBoard = (() => {
    let boardCase = Array(9);
    const board = document.querySelector('.board');
    for(let i = 0; i<9; i++){
        boardCase[i]=document.createElement('div');
        board?.appendChild(boardCase[i]);
        boardCase[i].classList.add('boardDesign');
        boardCase[i].classList.add(`boardDesign${i}`);
    };
    return boardCase;  
})();

const displayController = (() => {
    const boardCase = document.querySelectorAll('.boardDesign');
    const checkO = (currentValue:string) => currentValue === 'O';
    const checkX = (currentValue:string) => currentValue === 'X';

    const result = (orientation:any) => {
        if(orientation.every(checkX)){
            winner = 'X'; 
        } else if (orientation.every(checkO)) {
            winner ='O';
        };
    };

    const checkRow = () => {
        for(let i=0;i<3;i++){
            let row:any = [];
            for(let j=i*3;j<i*3+3;j++){
                row.push(boardCase[j].textContent);
            };        
        result(row);
        };
    };

    const checkColumn = () => {
        for(let i=0;i<3;i++){
            let column:any = [];
            for(let j=0;j<3;j++){
                column.push(boardCase[i+3*j].textContent);
            };
            result(column);
        };
    };

    const checkDiagonal = () => {
        let diagonal1:any = [boardCase[0].textContent,boardCase[4].textContent,boardCase[8].textContent];
        let diagonal2:any = [boardCase[2].textContent,boardCase[4].textContent,boardCase[6].textContent];
        result(diagonal1);
        result(diagonal2);
    };

    const formClass = (form1:any, form2:any) => {
        form1.classList.add('contour');
        form2.classList.remove('contour');
    };

    croix.addEventListener('click', () => {
        reset();
        formClass(croix, rond);
        playerOne.team='X';
        IA.team='O';
    });

    rond.addEventListener('click', () => {
        reset();
        formClass(rond, croix);
        playerOne.team='O';
        IA.team='X';
    });

    buttonPlay.addEventListener('click', () => {
        reset();
    });
    
    computerStart.addEventListener('click', () =>{
        reset();
        for(let i=0;i<9;i++){
            if (boardCase[i].textContent !== "") return;
        };
        randomPosition();
        boardCase[computerChoice].textContent = IA.team;
    });

    const reduceWin = (text:string) => {
        finalMessage.textContent=`You are the fucking ${text} bro !`;
        finalDiv.style.display="flex";
    };

    const win = () => {
        if(winner===playerOne.team){
            reduceWin('winner');
        }else if(winner===IA.team){
            reduceWin('looser');
        };
    };

    const randomPosition = () => {
        computerChoice=Math.floor(Math.random()*8);  
    };

    const matchNull = () => {
        for(let i=0;i<9;i++){
            if (boardCase[i].textContent !== "") fullOrNot+=1
        }
        if (fullOrNot===25) {
            finalMessage.textContent=`No fucking winner`;
            finalDiv.style.display="flex";
        }
    }

    //il ne me compte pas le dernier
    boardCase.forEach(element => element.addEventListener('click', () => {
        if(element.textContent===IA.team) return;
        if(element.textContent===playerOne.team) return;
        element.textContent=playerOne.team;
        randomPosition();
        matchNull();
        checkRow();
        checkColumn();
        checkDiagonal();  
        win(); 
        for(let i=0;i<9;i++){
            if(computerChoice===9) computerChoice=0;
            if (boardCase[computerChoice].textContent === ""){
                boardCase[computerChoice].textContent = IA.team;     
                return;
            }else{
                computerChoice += 1;
            };
        };
    }));

    const reset = () => {
        for(let i = 0;i<9;i++){
            boardCase[i].textContent="";
            finalDiv.style.display="none";
            winner="";
            fullOrNot=0;
        };    
    };
})();