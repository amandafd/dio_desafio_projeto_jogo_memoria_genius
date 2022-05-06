let order = []; //ordem aleatória a ser seguida pelo jogador
let clickedOrder = []; //ordem dos cliques feita pelo jogador
let score = 0; //pontuação iniciada em 0, reinicia se o jogador errar

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

//selecionando cores do html
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//sorteando um dos números relacionados as cores, definindo a ordem
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4); //* 4, pois 4 números (0 a 3)
  order[order.length] = colorOrder; //estamos atribuindo o indice do array com as respectivas cores
  clickedOrder = [];
 
  //acendendo as cores, usamos o for, pois ele percorre o array para usar um indice aqui
  for (let i in order) {
    let elementColor = createColorElement(order[i]); //cada vez que rodar, esse i será o indice do array a ser colocado nessa variável
    lightColor(elementColor, Number(i) + 1); //soma o i com 1 para que exista na lista de cores(?)
  }
};

//acende a proxima cor
let lightColor = (element, number) => {
  number = number * 700;
  setTimeout(() => { //função nativa do js que executa um código/função após o tempo passado
    element.classList.add('selected');
  }, number - 500);
  setTimeout(() => {
    element.classList.remove('selected'); //ativa o selected e passado aquele tempo, o remove
  }, number);
};

//verifica se a ordem clicada corresponde a ordem que acendeu aleatoriamente
let checkOrder = () => {
  for (let i in clickedOrder) { //para cada i dentro do clickedOrder fara tal coisa
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break; //break para  interação de for
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Você acertou!\nIniciando próximo nível!`);
    nextLevel();
  }
};

//função para o clique do usuário
let click = color => {
  clickedOrder[clickedOrder.length] = color; //a posição clicada será a cor atribuida
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder(); //depois de clicar em todas as cores pedidas, verifica se a ordem está correta
  }, 250);
};

//funcao que retorna a cor
let createColorElement = color => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

//função para próximo nível do jogo, aumentar pontução e gerar nova ordem
let nextLevel = () => {
  score++;
  shuffleOrder();
};

//funcao para game over
let gameOver = () => {
  alert(`Você perdeu o jogo!\nClique em OK para iniciar um novo jogo.`);
  order = [];
  clickedOrder = [];
  score = 0;
};

//funcao de inicio do jogo
let playGame = () => { //zera a pontuação e roda a função de prox. sequência
  alert('Bem vindo ao Genius Game!\nIniciando novo jogo!');
  score = 0;
  order = [];
  clickedOrder = [];
  nextLevel();
};


//ativando o clique das cores, computando resultados
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playGame();