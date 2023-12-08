// Alteração no array choices para conter objetos com emojis e URLs de imagens
const choices = [
  {
    emoji: "✊",
    imageUrl:
      "https://wesraiuga.github.io/games/assets/img/jokenpo/jokenpo-user-pedra.png",
  },
  {
    emoji: "🖐️",
    imageUrl:
      "https://wesraiuga.github.io/games/assets/img/jokenpo/jokenpo-user-papel.png",
  },
  {
    emoji: "✌️",
    imageUrl:
      "https://wesraiuga.github.io/games/assets/img/jokenpo/jokenpo-user-tesoura.png",
  },
];

// Troca de nomes de variáveis
let playerWins = 0;
let playerLosses = 0;
let playerDraws = 0;

function computerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex].emoji;
}

function updateScore() {
  document.querySelector("#victory").innerHTML = `Vitórias : ${playerWins}`;
  document.querySelector("#draws").innerHTML = `Empate : ${playerDraws}`;
  document.querySelector("#loss").innerHTML = `Derrotas : ${playerLosses}`;
}

function determineWinner(player, computer) {
  if (player === computer) {
    playerDraws++;
    updateScore();
    return "Empate!";
  } else if (
    (player === "✊" && computer === "✌️") ||
    (player === "🖐️" && computer === "✊") ||
    (player === "✌️" && computer === "🖐️")
  ) {
    playerWins++;
    updateScore();
    return "Você ganhou!";
  } else {
    playerLosses++;
    updateScore();
    return "Você perdeu!";
  }
}

function createImage(choice, containerId) {
  const image = document.createElement("img");
  const choiceObject = choices.find((item) => item.emoji === choice);

  if (choiceObject) {
    image.src = choiceObject.imageUrl;
    image.alt = `Escolha do ${
      containerId === "player-choice" ? "Jogador" : "Computador"
    }`;
    image.classList.add("choice-image");

    const container = document.getElementById(containerId);
    container.innerHTML = "";
    container.appendChild(image);
  }
}

function resetImages() {
  createImage("", "player-choice");
  createImage("", "computer-choice");
}

function playerChoice(choice) {
  resetImages();

  const computer = computerChoice();
  createImage(choice, "player-choice");
  createImage(computer, "computer-choice");

  const result = determineWinner(choice, computer);

  const banner = document.getElementById("result");
  banner.style.display = "block";
  banner.innerHTML = `Você escolheu ${choice}. O computador escolheu ${computer}. ${result}`;

  setTimeout(() => {
    document.getElementById("result").style.display = "none";
    resetImages();
  }, 2000);
}
