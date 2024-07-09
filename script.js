document.addEventListener("DOMContentLoaded", function() {
  const cells = document.querySelectorAll('.cell');
  const statusDiv = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  const humanBtn = document.getElementById('humanBtn');
  const aiBtn = document.getElementById('aiBtn');
  
  let isGameActive = false;
  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let isHumanOpponent = true;
  
  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];
  
  const handleResultValidation = () => {
      let roundWon = false;
      for (let i = 0; i < 8; i++) {
          const winCondition = winningConditions[i];
          let a = gameState[winCondition[0]];
          let b = gameState[winCondition[1]];
          let c = gameState[winCondition[2]];
          if (a === '' || b === '' || c === '') {
              continue;
          }
          if (a === b && b === c) {
              roundWon = true;
              break;
          }
      }
  
      if (roundWon) {
          statusDiv.innerHTML = `Player ${currentPlayer} has won!`;
          isGameActive = false;
          resetBtn.classList.remove('hidden');
          return;
      }
  
      let roundDraw = !gameState.includes('');
      if (roundDraw) {
          statusDiv.innerHTML = 'Game ended in a draw!';
          isGameActive = false;
          resetBtn.classList.remove('hidden');
          return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (!isHumanOpponent && currentPlayer === 'O') {
          aiMove();
      }
  };
  
  const aiMove = () => {
      let availableCells = [];
      gameState.forEach((cell, index) => {
          if (cell === '') availableCells.push(index);
      });
  
      if (availableCells.length > 0) {
          let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
          gameState[randomIndex] = 'O';
          cells[randomIndex].innerHTML = 'O';
          handleResultValidation();
      }
  };
  
  const handleCellClick = (clickedCellEvent) => {
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      if (gameState[clickedCellIndex] !== '' || !isGameActive) {
          return;
      }
  
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.innerHTML = currentPlayer;
  
      handleResultValidation();
  };
  
  const startGame = (humanOpponent) => {
      gameState = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      currentPlayer = 'X';
      isHumanOpponent = humanOpponent;
      statusDiv.innerHTML = '';
      cells.forEach(cell => cell.innerHTML = '');
      resetBtn.classList.add('hidden');
  };
  
  humanBtn.addEventListener('click', () => startGame(true));
  aiBtn.addEventListener('click', () => startGame(false));
  
  resetBtn.addEventListener('click', () => startGame(isHumanOpponent));
  
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
