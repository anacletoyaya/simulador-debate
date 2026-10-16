const temas = [
  "Deveria haver pena de morte?",
  "O homeschooling deveria ser permitido?",
  "O voto deveria ser obrigatório?",
  "O aquecimento global é responsabilidade do ser humano?",
  "A legalização da maconha é benéfica para a sociedade?",
  "A inteligência artificial representa uma ameaça para a humanidade?",
  "O trabalho remoto é mais produtivo do que o trabalho presencial?",
  "A ONU ainda é eficaz?",
  "Países ricos deveriam pagar mais pelo combate à crise climática?",
  "Sanções econômicas são uma forma justa de pressionar outros países?",
  "Todos os países deveriam ter direito de veto no Conselho de Segurança?",
  "Fronteiras deveriam ser mais abertas para imigrantes?",
  "A globalização trouxe mais benefícios do que prejuízos?",
  "Políticos deveriam ter salários menores?",
];
const lados = ["A favor", "Contra"];

let intervalo;
let segundosRestantes = 120;
let cronometroPausado = false;

function atualizarTempo() {
  const tempo = document.getElementById("tempo");
  const min = String(Math.floor(segundosRestantes / 60)).padStart(2, "0");
  const seg = String(segundosRestantes % 60).padStart(2, "0");

  tempo.textContent = min + ":" + seg;
  tempo.style.color = segundosRestantes <= 10 ? "red" : "#1b2a41";
}

function decrementarTempo() {
  if (cronometroPausado || segundosRestantes <= 0) {
    return;
  }

  segundosRestantes--;
  atualizarTempo();

  if (segundosRestantes <= 0) {
    clearInterval(intervalo);
    intervalo = null;
    document.getElementById("tempo").textContent = "Tempo esgotado!";
  }
}

function alternarPausaCronometro() {
  const botao = document.getElementById("pausarTempo");

  if (segundosRestantes <= 0) {
    return;
  }

  cronometroPausado = !cronometroPausado;
  botao.textContent = cronometroPausado ? "Continuar tempo" : "Pausar tempo";

  if (cronometroPausado) {
    clearInterval(intervalo);
    intervalo = null;
    return;
  }

  intervalo = setInterval(decrementarTempo, 1000);
}

function iniciarCronometro(segundos) {
  clearInterval(intervalo);
  intervalo = null;
  segundosRestantes = segundos;
  cronometroPausado = false;
  document.getElementById("pausarTempo").textContent = "Pausar tempo";
  atualizarTempo();
  intervalo = setInterval(decrementarTempo, 1000);
}

document.getElementById("sortear").addEventListener("click", function () {
  const tema = temas[Math.floor(Math.random() * temas.length)];
  const lado = lados[Math.floor(Math.random() * lados.length)];
  document.getElementById("tema").textContent = tema;
  document.getElementById("lado").textContent = "Você defende: " + lado;
  const elementoLado = document.getElementById("lado");
  if (lado === "A favor") {
    elementoLado.style.color = "green";
  } else if (lado === "Contra") {
    elementoLado.style.color = "red";
  }

  iniciarCronometro(120);
});

document
  .getElementById("pausarTempo")
  .addEventListener("click", alternarPausaCronometro);
