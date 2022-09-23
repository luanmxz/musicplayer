const music = [
  {
    titulo: "Changes",
    artista: "Hayd",
    srcimagem: "assets/img/moon.jpg",
    srcmusica: "assets/songs/Hayd-Changes.mp3",
  },
  {
    titulo: "Fast Car",
    artista: "Jonas Blue",
    srcimagem: "assets/img/car.jpg",
    srcmusica: "assets/songs/JonasBlue-FastCar.mp3",
  },
  {
    titulo: "Somebody Else",
    artista: "Flora Cash",
    srcimagem: "assets/img/flower.jpg",
    srcmusica: "assets/songs/FloraCash-SomebodyElse.mp3",
  },
];

const playbutton = document.querySelector(".botao-play");
const pausebutton = document.querySelector(".botao-pause");

let musica = document.querySelector(".audio");

let fim = document.querySelector(".fim");
let nomeartista = document.querySelector(".nomeartista");
let nomemusica = document.querySelector(".nomemusica");
let imagem = document.querySelector("img");

var index = 0;

renderMusic(index);

//listeners e arrow functions
playbutton.addEventListener("click", playmusic);

musica.addEventListener("timeupdate", updateProgress);
musica.addEventListener("ended", nextSong);
document.querySelector(".previous").addEventListener("click", previousSong);
document.querySelector(".next").addEventListener("click", nextSong);

pausebutton.addEventListener("click", () => {
  musica.pause();
  pausebutton.style.display = "none";
  playbutton.style.display = "block";
});

//funções
function renderMusic(index) {
  musica.setAttribute("src", music[index].srcmusica);
  musica.addEventListener("loadeddata", () => {
    nomeartista.textContent = music[index].artista;
    nomemusica.textContent = music[index].titulo;
    imagem.setAttribute("src", music[index].srcimagem);
    fim.textContent = convertSecToMinute(Math.floor(musica.duration));
    musica.play();
  });
}

function previousSong() {
  index--;
  if (index < 0) {
    index = music.length - 1;
  }
  renderMusic(index);
}

function nextSong() {
  index++;
  if (index >= music.length) {
    index = 0;
  }
  renderMusic(index);
}

function playmusic() {
  musica.play();
  playbutton.style.display = "none";
  pausebutton.style.display = "block";
}

function updateProgress() {
  let barra = document.querySelector(".barraprogresso");
  barra.style.width =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";
  let inicio = document.querySelector(".inicio");
  inicio.textContent = convertSecToMinute(Math.floor(musica.currentTime));
}

function convertSecToMinute(seconds) {
  let minute = Math.floor(seconds / 60);
  let second = seconds % 60;
  if (second < 10) {
    second = "0" + second;
  }
  return minute + ":" + second;
}
