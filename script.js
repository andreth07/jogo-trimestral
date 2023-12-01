document.addEventListener('DOMContentLoaded', function () {
  // Esta função será executada quando o DOM (Document Object Model) estiver completamente carregado.

  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const Reiniciar = document.getElementById('Reiniciar');

  // Aqui, são obtidos elementos do DOM usando seus IDs. O 'board' representa o tabuleiro, 'status' exibe o status do jogo
  // e 'Reiniciar' é o botão de reinício.

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  // Variáveis que mantêm o estado do jogo. 'currentPlayer' guarda o jogador atual ('X' ou 'O'), 'gameBoard' representa
  // o estado atual do tabuleiro e 'gameActive' indica se o jogo está ativo.

  function checkWinner() {
    // Função para verificar se há um vencedor ou empate.
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
      [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return pattern; // Retorna as células da linha vencedora
      }
    }

    if (!gameBoard.includes('')) {
      return 'draw'; // Retorna 'draw' se não houver vencedor e o tabuleiro estiver cheio.
    }

    return null; // Retorna null se o jogo ainda estiver em andamento.
  }

  function highlightWinningCels(cels) {
    // Adiciona uma classe para destacar as células vencedoras.
    cels.forEach((celIndex) => {
      const celElement = document.getElementById(`cel${celIndex}`);
      celElement.classList.add('winning-cel');
    });
  }

  function removeHighlight() {
    // Remove a classe de destaque das células do tabuleiro.
    const cels = document.querySelectorAll('.cel');
    cels.forEach((cel) => {
      cel.classList.remove('winning-cel');
    });
  }

  function handleClick(index) {
    // Manipula o clique nas células do tabuleiro.
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    updateBoard();

    const winnerCels = checkWinner();
    if (winnerCels) {
      highlightWinningCels(winnerCels);
      endGame(gameBoard[winnerCels[0]]);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Vez do Jogador ${currentPlayer}`;
    }
  }

  function updateBoard() {
    // Atualiza o conteúdo das células do tabuleiro no DOM.
    for (let i = 0; i < 9; i++) {
      const celElement = document.getElementById(`cel${i}`);
      celElement.textContent = gameBoard[i];
    }
  }

  function endGame(result) {
    // Finaliza o jogo exibindo uma mensagem com o resultado.
    if (result === 'draw') {
      status.textContent = 'Empate! O jogo acabou.';
    } else {
      status.textContent = `Jogador ${result} venceu!`;
    }
    gameActive = false; // Desativa o jogo.
  }

  function resetGame() {
    // Reinicia o jogo, resetando todas as variáveis.
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Vez do Jogador X';
    removeHighlight();
    updateBoard();
  }

  function initializeBoard() {
    // Inicializa o tabuleiro, adiciona eventos de clique e reinício.
    for (let i = 0; i < 9; i++) {
      const cel = document.createElement('div');
      cel.className = 'cel';
      cel.id = `cel${i}`;
      cel.addEventListener('click', () => handleClick(i));
      board.appendChild(cel);
    }

    Reiniciar.addEventListener('click', resetGame); // Adiciona um evento de clique ao botão de reinício.
  }

  initializeBoard(); // Chama a função para iniciar o tabuleiro quando o DOM estiver pronto.
});
