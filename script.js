document.addEventListener('DOMContentLoaded', function () {
  // Esta função será executada quando o DOM (Document Object Model) estiver completamente carregado.

  const tabuleiro = document.getElementById('tabuleiro');
  const status = document.getElementById('status');
  const Reiniciar = document.getElementById('Reiniciar');

  // Aqui, são obtidos elementos do DOM usando seus IDs. O 'tabuleiro representa o tabuleiro, 'status' exibe o status do jogo
  // e 'Reiniciar' é o botão de reinício.

  let currentPlayer = 'X';
  let gametabuleiro = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  // Variáveis que mantêm o estado do jogo. 'currentPlayer' guarda o jogador atual ('X' ou 'O'), 'tabuleiro' representa
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
      if (gametabuleiro[a] && gametabuleiro[a] === gametabuleiro[b] && gametabuleiro[a] === gametabuleiro[c]) {
        return pattern; // Retorna as células da linha vencedora
      }
    }

    if (!gametabuleiro.includes('')) {
      return 'draw'; // Retorna 'draw' se não houver vencedor e o tabuleiro estiver cheio.
    }

    return null; // Retorna null se o jogo ainda estiver em andamento.
  }

  function highlightWinningbotõess(botõess) {
    // Adiciona uma classe para destacar as células vencedoras.
    botõess.forEach((botõesIndex) => {
      const botõesElement = document.getElementById(`botões${botõesIndex}`);
      botõesElement.classList.add('winning-botões');
    });
  }

  function removeHighlight() {
    // Remove a classe de destaque das células do tabuleiro.
    const botõess = document.querySelectorAll('.botões');
    botões.forEach((botões) => {
      botões.classList.remove('winning-botões');
    });
  }

  function handleClick(index) {
    // Manipula o clique nas células do tabuleiro.
    if (!gameActive || gametabuleiro[index] !== '') return;

    gametabuleiro[index] = currentPlayer;
    updatetabuleiro();

    const winnerbotõess = checkWinner();
    if (winnerbotõess) {
      highlightWinningbotõess(winnerbotõess);
      endGame(gametabuleiro[winnerbotõess[0]]);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Vez do Jogador ${currentPlayer}`;
    }
  }

  function updatetabuleiro() {
    // Atualiza o conteúdo das células do tabuleiro no DOM.
    for (let i = 0; i < 9; i++) {
      const botõesElement = document.getElementById(`botões${i}`);
      botõesElement.textContent = gametabuleiro[i];
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
    gametabuleiro = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Vez do Jogador X';
    removeHighlight();
    updatetabuleiro();
  }

  function initializetabuleiro() {
    // Inicializa o tabuleiro, adiciona eventos de clique e reinício.
    for (let i = 0; i < 9; i++) {
      const botões = document.createElement('div');
      botões.className = 'botões';
      botões.id = `botões${i}`;
      botões.addEventListener('click', () => handleClick(i));
      tabuleiro.appendChild(botões);
    }

    Reiniciar.addEventListener('click', resetGame); // Adiciona um evento de clique ao botão de reinício.
  }

  initializetabuleiro(); // Chama a função para iniciar o tabuleiro quando o DOM estiver pronto.
});
