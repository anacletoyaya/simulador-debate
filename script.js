const lados = ["A favor", "Contra"];

let intervalo;
let segundosRestantes = 60;
let totalFase = 60;
let cronometroPausado = false;
let fase = null;
let temaAtual = null;
let ladoAtual = null;
let audioCtx = null;

function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function lerSegundos(id) {
  return Number(document.getElementById(id).value);
}

// ---------- Áreas ----------
function preencherAreas() {
  const select = document.getElementById("area");
  const areas = [];

  temas.forEach(function (t) {
    if (!areas.includes(t.area)) {
      areas.push(t.area);
    }
  });

  areas
    .sort(function (a, b) {
      return a.localeCompare(b, "pt-BR");
    })
    .forEach(function (nome) {
      const opcao = document.createElement("option");
      opcao.value = nome;
      opcao.textContent = nome;
      select.appendChild(opcao);
    });
}

// ---------- Som ----------
function prepararAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch (e) {}
}

function tocarSom(tipo) {
  if (!document.getElementById("somAtivo").checked || !audioCtx) {
    return;
  }

  const tons = { aviso: [880], inicio: [1000, 1000], fim: [660, 660, 660] };

  try {
    tons[tipo].forEach(function (frequencia, i) {
      const osc = audioCtx.createOscillator();
      const ganho = audioCtx.createGain();
      const inicio = audioCtx.currentTime + i * 0.25;

      osc.frequency.value = frequencia;
      osc.connect(ganho);
      ganho.connect(audioCtx.destination);
      ganho.gain.setValueAtTime(0.2, inicio);
      ganho.gain.exponentialRampToValueAtTime(0.001, inicio + 0.2);
      osc.start(inicio);
      osc.stop(inicio + 0.22);
    });
  } catch (e) {}
}

// ---------- Textos de apoio ----------
function atualizarRoteiro() {
  const roteiro = document.getElementById("roteiro");

  if (fase === "preparacao") {
    roteiro.textContent =
      "Defina sua tese, escolha 2 argumentos e pense em 1 exemplo.";
  } else if (fase === "fala") {
    const proporcao = (totalFase - segundosRestantes) / totalFase;
    if (proporcao < 0.25) {
      roteiro.textContent =
        "1) Tese: diga com clareza qual lado você defende e por quê.";
    } else if (proporcao < 0.75) {
      roteiro.textContent =
        "2) Argumentos: desenvolva suas ideias, cada uma com um exemplo ou dado.";
    } else {
      roteiro.textContent = "3) Conclusão: retome sua tese e feche com força.";
    }
  } else if (fase === "fim") {
    roteiro.textContent =
      "Fim! Veja o outro lado e pense em como você responderia.";
  } else {
    roteiro.textContent = "";
  }
}

function mostrarFontes(fontes) {
  const caixa = document.getElementById("fontesTema");
  caixa.textContent = "";

  if (!fontes || fontes.length === 0) {
    caixa.hidden = true;
    return;
  }

  caixa.appendChild(document.createTextNode("Fontes: "));

  fontes.forEach(function (fonte, i) {
    const link = document.createElement("a");
    link.href = fonte.url;
    link.textContent = fonte.titulo;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    caixa.appendChild(link);
    if (i < fontes.length - 1) {
      caixa.appendChild(document.createTextNode(" · "));
    }
  });

  caixa.hidden = false;
}

function mostrarLado() {
  const elLado = document.getElementById("lado");
  elLado.textContent = "Você defende: " + ladoAtual;
  elLado.className = ladoAtual === "A favor" ? "favor" : "contra";
}

function esconderAjudas() {
  document.getElementById("dica").hidden = true;
  document.getElementById("contraArg").hidden = true;
  document.getElementById("verDica").textContent = "Ver dica";
  document.getElementById("verContra").textContent = "Ver outro lado";
}

function alternarBotoesDeApoio(ativos) {
  document.getElementById("verDica").disabled = !ativos;
  document.getElementById("verContra").disabled = !ativos;
}

// ---------- Cronômetro ----------
function atualizarTempo() {
  const tempo = document.getElementById("tempo");
  const min = String(Math.floor(segundosRestantes / 60)).padStart(2, "0");
  const seg = String(segundosRestantes % 60).padStart(2, "0");

  tempo.textContent = min + ":" + seg;
  tempo.classList.toggle("urgente", segundosRestantes <= 10);
  document.getElementById("barraPreenchida").style.width =
    (segundosRestantes / totalFase) * 100 + "%";
  atualizarRoteiro();
}

function decrementarTempo() {
  if (cronometroPausado || segundosRestantes <= 0) {
    return;
  }

  segundosRestantes--;
  atualizarTempo();

  if (segundosRestantes === 30 && totalFase > 30) {
    tocarSom("aviso");
  }

  if (segundosRestantes <= 0) {
    clearInterval(intervalo);
    intervalo = null;

    if (fase === "preparacao") {
      iniciarFase("fala");
      return;
    }

    fase = "fim";
    const tempo = document.getElementById("tempo");
    tempo.textContent = "Tempo esgotado!";
    tempo.classList.add("esgotado");
    document.getElementById("fase").textContent = "Fim do debate";
    document.body.dataset.fase = "fim";
    document.getElementById("pausarTempo").disabled = true;
    atualizarRoteiro();
    tocarSom("fim");
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
  totalFase = segundos;
  cronometroPausado = false;
  document.getElementById("tempo").classList.remove("esgotado");
  const botaoPausa = document.getElementById("pausarTempo");
  botaoPausa.textContent = "Pausar tempo";
  botaoPausa.disabled = false;
  atualizarTempo();
  intervalo = setInterval(decrementarTempo, 1000);
}

function iniciarFase(nome) {
  fase = nome;
  document.body.dataset.fase = nome;
  const rotulo = document.getElementById("fase");
  const botaoPular = document.getElementById("pularPrep");

  if (nome === "preparacao") {
    rotulo.textContent = "Preparação: organize suas ideias";
    botaoPular.disabled = false;
    iniciarCronometro(lerSegundos("selPrep"));
  } else {
    rotulo.textContent = "Fala: é a sua vez!";
    botaoPular.disabled = true;
    iniciarCronometro(lerSegundos("selFala"));
    tocarSom("inicio");
  }
}

// Mostra o tempo de preparação escolhido enquanto nenhum debate começou
function atualizarTempoInicial() {
  if (fase !== null) {
    return;
  }
  segundosRestantes = lerSegundos("selPrep");
  totalFase = segundosRestantes;
  atualizarTempo();
}

// ---------- Sorteio e tema próprio ----------
function limparParaSorteio() {
  clearInterval(intervalo);
  intervalo = null;
  fase = null;

  document.getElementById("sortear").disabled = true;
  document.getElementById("usarMeuTema").disabled = true;
  document.getElementById("pausarTempo").disabled = true;
  document.getElementById("pularPrep").disabled = true;
  alternarBotoesDeApoio(false);
  esconderAjudas();

  document.getElementById("anotacoes").value = "";
  document.getElementById("roteiro").textContent = "";
  document.getElementById("areaTema").textContent = "";
  document.getElementById("avisoTema").hidden = true;
  mostrarFontes(null);

  const elLado = document.getElementById("lado");
  elLado.textContent = "";
  elLado.className = "";
}

function comecarDebate() {
  const proprio = temaAtual.proprio === true;
  const elTema = document.getElementById("tema");

  elTema.classList.remove("girando");
  elTema.textContent = temaAtual.texto;
  document.getElementById("areaTema").textContent = temaAtual.area;
  mostrarFontes(temaAtual.fontes);
  mostrarLado();
  document.getElementById("avisoTema").hidden = !proprio;

  document.getElementById("sortear").disabled = false;
  document.getElementById("usarMeuTema").disabled = false;
  alternarBotoesDeApoio(!proprio);

  iniciarFase("preparacao");
}

function sortear() {
  prepararAudio();

  const areaEscolhida = document.getElementById("area").value;
  const opcoes = areaEscolhida
    ? temas.filter(function (t) {
        return t.area === areaEscolhida;
      })
    : temas;

  limparParaSorteio();
  document.getElementById("tema").classList.add("girando");

  temaAtual = escolher(opcoes);
  ladoAtual = escolher(lados);

  let giros = 0;
  const roleta = setInterval(function () {
    document.getElementById("tema").textContent = escolher(opcoes).texto;
    giros++;

    if (giros >= 12) {
      clearInterval(roleta);
      comecarDebate();
    }
  }, 90);
}

function usarTemaProprio() {
  const campo = document.getElementById("temaProprio");
  const texto = campo.value.trim();

  if (!texto) {
    campo.focus();
    return;
  }

  prepararAudio();
  limparParaSorteio();

  temaAtual = { area: "Tema próprio", texto: texto, proprio: true };
  ladoAtual = escolher(lados);
  comecarDebate();
}

// ---------- Eventos ----------
document.getElementById("sortear").addEventListener("click", sortear);
document
  .getElementById("usarMeuTema")
  .addEventListener("click", usarTemaProprio);
document
  .getElementById("temaProprio")
  .addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      usarTemaProprio();
    }
  });

document
  .getElementById("pausarTempo")
  .addEventListener("click", alternarPausaCronometro);

document.getElementById("pularPrep").addEventListener("click", function () {
  iniciarFase("fala");
});

document
  .getElementById("selPrep")
  .addEventListener("change", atualizarTempoInicial);

document.getElementById("verDica").addEventListener("click", function () {
  const dica = document.getElementById("dica");
  if (dica.hidden) {
    const texto = ladoAtual === "A favor" ? temaAtual.favor : temaAtual.contra;
    dica.textContent = "Argumentos comuns para esse lado: " + texto;
    dica.hidden = false;
    this.textContent = "Esconder dica";
  } else {
    dica.hidden = true;
    this.textContent = "Ver dica";
  }
});

document.getElementById("verContra").addEventListener("click", function () {
  const caixa = document.getElementById("contraArg");
  if (caixa.hidden) {
    const texto = ladoAtual === "A favor" ? temaAtual.contra : temaAtual.favor;
    caixa.textContent = "Argumentos do outro lado: " + texto;
    caixa.hidden = false;
    this.textContent = "Esconder outro lado";
  } else {
    caixa.hidden = true;
    this.textContent = "Ver outro lado";
  }
});

// ---------- Início ----------
preencherAreas();
atualizarTempoInicial();
