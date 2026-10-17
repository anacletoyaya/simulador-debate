const temas = [
  {
    texto: "Deveria haver pena de morte?",
    favor:
      "Justiça proporcional para crimes gravíssimos, possível efeito de dissuasão e fim da reincidência do condenado.",
    contra:
      "Risco irreversível de executar um inocente, falta de evidência forte de que dissuade mais que a prisão perpétua e aplicação desigual da pena.",
  },
  {
    texto: "O homeschooling deveria ser permitido?",
    favor:
      "Ensino personalizado no ritmo do aluno, liberdade das famílias de escolher a educação dos filhos e proteção contra bullying.",
    contra:
      "Perda da convivência com pessoas diferentes, que ensina a lidar com conflitos, e menos fiscalização da qualidade do ensino e do bem-estar da criança.",
  },
  {
    texto: "O voto deveria ser obrigatório?",
    favor:
      "Maior representatividade e legitimidade dos eleitos, e o voto vira hábito cívico em vez de depender só de quem se mobiliza.",
    contra:
      "Liberdade individual inclui o direito de não votar, e obrigar gera votos sem interesse, brancos e nulos, sem aumentar o engajamento real.",
  },
  {
    texto: "O aquecimento global é responsabilidade do ser humano?",
    favor:
      "O consenso científico (IPCC) aponta que o aumento do CO2 acompanha a industrialização e a queima de combustíveis fósseis.",
    contra:
      "Lado mais difícil, pois o consenso é forte. Foque nos ciclos naturais do clima e nas incertezas sobre a magnitude da influência humana.",
  },
  {
    texto: "A legalização da maconha é benéfica para a sociedade?",
    favor:
      "Enfraquece o tráfico, reduz encarceramentos, permite regulação e arrecadação e facilita o uso medicinal.",
    contra:
      "Riscos de dependência e efeitos em adolescentes, possível aumento do consumo e perigo de dirigir sob efeito.",
  },
  {
    texto: "A inteligência artificial representa uma ameaça para a humanidade?",
    favor:
      "Desemprego em massa, desinformação com deepfakes, concentração de poder nas mãos de poucas empresas e sistemas difíceis de controlar.",
    contra:
      "É uma ferramenta com grandes ganhos em saúde e produtividade, pode ser regulada, e tecnologias anteriores também geraram medo e depois novos empregos.",
  },
  {
    texto: "O trabalho remoto é mais produtivo do que o trabalho presencial?",
    favor:
      "Sem tempo perdido no deslocamento, com mais foco, flexibilidade e acesso a talentos de qualquer lugar.",
    contra:
      "Prejudica colaboração e inovação espontânea, dificulta a integração de novos funcionários e pode causar isolamento.",
  },
  {
    texto: "A ONU ainda é eficaz?",
    favor:
      "Mantém um canal diplomático global, tem agências importantes (OMS, UNICEF, ACNUR) e operações de paz que evitam conflitos piores.",
    contra:
      "O veto no Conselho de Segurança paralisa decisões, a ONU não tem poder para impor o que decide e a burocracia é lenta.",
  },
  {
    texto: "Países ricos deveriam pagar mais pelo combate à crise climática?",
    favor:
      "Responsabilidade histórica pelas emissões acumuladas, mais capacidade financeira, e os países pobres são os mais afetados.",
    contra:
      "Hoje grandes emissores são economias emergentes, há risco de mau uso dos recursos, e a responsabilidade deveria ser compartilhada.",
  },
  {
    texto:
      "Sanções econômicas são uma forma justa de pressionar outros países?",
    favor:
      "São uma alternativa à guerra, pressionam sem violência direta e sinalizam condenação internacional, como no caso do apartheid.",
    contra:
      "Atingem mais a população civil que os governos, regimes se adaptam e as sanções podem até fortalecer o regime.",
  },
  {
    texto:
      "Todos os países deveriam ter direito de veto no Conselho de Segurança?",
    favor:
      "Igualdade entre países soberanos, mais legitimidade às decisões e fim do domínio das grandes potências.",
    contra:
      "Com mais vetos o Conselho travaria ainda mais, e as potências com capacidade militar é que sustentam a execução das decisões.",
  },
  {
    texto: "Fronteiras deveriam ser mais abertas para imigrantes?",
    favor:
      "Ganhos econômicos com mão de obra, resposta ao envelhecimento da população e respeito à liberdade de movimento e aos direitos humanos.",
    contra:
      "Pressão sobre serviços públicos, desafios de segurança e controle e dificuldade de integração se a chegada for rápida demais.",
  },
  {
    texto: "A globalização trouxe mais benefícios do que prejuízos?",
    favor:
      "Preços menores, difusão de tecnologia e milhões de pessoas tiradas da pobreza com o comércio internacional.",
    contra:
      "Aumento da desigualdade, desindustrialização de regiões, dependência de cadeias de produção distantes e perda de diversidade cultural.",
  },
  {
    texto: "Políticos deveriam ter salários menores?",
    favor:
      "Reduz gastos públicos, aproxima o político da realidade da população e desestimula quem entra na política só por dinheiro.",
    contra:
      "Afasta pessoas qualificadas, aumenta a dependência de financiadores e corrupção e deixa a política só para quem já é rico.",
  },
];
const lados = ["A favor", "Contra"];
const DURACAO = 120;
const VICIOS = ["né", "tipo", "então", "assim", "aí", "tá", "hum", "ahn"];

let intervalo;
let segundosRestantes = DURACAO;
let cronometroPausado = false;
let temaAtual = null;
let ladoAtual = null;

// ---------- Microfone ----------
const Reconhecimento =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let reconhecimento = null;
let ouvindo = false;
let textoFinal = "";
let textoParcial = "";

function mostrarAviso(mensagem) {
  const aviso = document.getElementById("avisoMicrofone");
  aviso.textContent = mensagem;
  aviso.hidden = false;
}

function mostrarTranscricao() {
  const caixa = document.getElementById("transcricao");
  caixa.textContent =
    textoFinal + textoParcial ||
    "Sua fala vai aparecer aqui enquanto você fala.";
  caixa.scrollTop = caixa.scrollHeight;
}

function formatarTrecho(trecho) {
  let t = trecho.trim();
  if (!t) {
    return "";
  }
  t = t.charAt(0).toUpperCase() + t.slice(1);
  if (!/[.!?]$/.test(t)) {
    t += ".";
  }
  return t + " ";
}

function criarReconhecimento() {
  const r = new Reconhecimento();
  r.lang = "pt-BR";
  r.continuous = true;
  r.interimResults = true;

  r.onresult = function (evento) {
    let parcial = "";
    for (let i = evento.resultIndex; i < evento.results.length; i++) {
      const trecho = evento.results[i][0].transcript;
      if (evento.results[i].isFinal) {
        textoFinal += formatarTrecho(trecho);
      } else {
        parcial += trecho;
      }
    }
    textoParcial = parcial;
    mostrarTranscricao();
  };

  r.onerror = function (evento) {
    if (
      evento.error === "not-allowed" ||
      evento.error === "service-not-allowed"
    ) {
      ouvindo = false;
      mostrarAviso(
        "Permissão do microfone negada. Libere o microfone no navegador e sorteie de novo.",
      );
    }
  };

  // O Chrome encerra sozinho após silêncios; aqui ele é religado.
  r.onend = function () {
    if (ouvindo) {
      try {
        r.start();
      } catch (e) {}
    }
  };

  return r;
}

function iniciarMicrofone() {
  textoFinal = "";
  textoParcial = "";
  mostrarTranscricao();
  document.getElementById("resultado").hidden = true;
  document.getElementById("avisoMicrofone").hidden = true;

  if (!Reconhecimento) {
    mostrarAviso(
      "Seu navegador não suporta transcrição de voz. Use o Chrome ou o Edge.",
    );
    return;
  }

  pararMicrofone();
  reconhecimento = criarReconhecimento();
  ouvindo = true;
  try {
    reconhecimento.start();
  } catch (e) {}
}

function pausarMicrofone() {
  ouvindo = false;
  if (reconhecimento) {
    reconhecimento.stop();
  }
}

function retomarMicrofone() {
  if (!reconhecimento) {
    return;
  }
  ouvindo = true;
  try {
    reconhecimento.start();
  } catch (e) {}
}

function pararMicrofone() {
  ouvindo = false;
  if (reconhecimento) {
    reconhecimento.onend = null;
    reconhecimento.stop();
    reconhecimento = null;
  }
}

// ---------- Resultado ----------
function normalizarPalavras(texto) {
  return texto
    .toLowerCase()
    .replace(/[.,!?;:()"']/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function mostrarResultado(segundosFalados) {
  const resultado = document.getElementById("resultado");
  const palavras = normalizarPalavras(textoFinal + textoParcial);

  if (palavras.length === 0) {
    resultado.innerHTML =
      "<strong>Resultado</strong><br>Não captei nenhuma fala. Verifique se o microfone está liberado e funcionando.";
    resultado.hidden = false;
    return;
  }

  const minutos = Math.max(segundosFalados, 1) / 60;
  const ritmo = Math.round(palavras.length / minutos);

  const contagem = {};
  palavras.forEach(function (p) {
    if (VICIOS.includes(p)) {
      contagem[p] = (contagem[p] || 0) + 1;
    }
  });
  const totalVicios = Object.values(contagem).reduce(function (a, b) {
    return a + b;
  }, 0);
  const lista = Object.keys(contagem)
    .map(function (p) {
      return p + " (" + contagem[p] + "x)";
    })
    .join(", ");

  resultado.innerHTML =
    "<strong>Resultado</strong><br>" +
    "Palavras: " +
    palavras.length +
    "<br>" +
    "Ritmo: " +
    ritmo +
    " palavras por minuto<br>" +
    "Vícios de linguagem: " +
    (totalVicios > 0 ? totalVicios + " — " + lista : "nenhum detectado");
  resultado.hidden = false;
}

function finalizarFala() {
  if (!Reconhecimento) {
    return;
  }
  const segundosFalados = DURACAO - segundosRestantes;
  pararMicrofone();
  // Espera um instante para chegarem as últimas palavras transcritas.
  setTimeout(function () {
    mostrarResultado(segundosFalados);
  }, 600);
}

// ---------- Cronômetro ----------
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
    const tempo = document.getElementById("tempo");
    tempo.textContent = "Tempo esgotado!";
    tempo.classList.add("esgotado");
    document.getElementById("pausarTempo").disabled = true;
    document.getElementById("encerrar").disabled = true;
    finalizarFala();
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
    pausarMicrofone();
    return;
  }

  intervalo = setInterval(decrementarTempo, 1000);
  retomarMicrofone();
}

function iniciarCronometro(segundos) {
  clearInterval(intervalo);
  intervalo = null;
  segundosRestantes = segundos;
  cronometroPausado = false;
  document.getElementById("tempo").classList.remove("esgotado");
  const botaoPausa = document.getElementById("pausarTempo");
  botaoPausa.textContent = "Pausar tempo";
  botaoPausa.disabled = false;
  atualizarTempo();
  intervalo = setInterval(decrementarTempo, 1000);
}

// ---------- Botões ----------
document.getElementById("sortear").addEventListener("click", function () {
  temaAtual = temas[Math.floor(Math.random() * temas.length)];
  ladoAtual = lados[Math.floor(Math.random() * lados.length)];
  document.getElementById("tema").textContent = temaAtual.texto;
  document.getElementById("lado").textContent = "Você defende: " + ladoAtual;
  document.getElementById("lado").style.color =
    ladoAtual === "A favor" ? "green" : "red";

  document.getElementById("dica").hidden = true;
  const botaoDica = document.getElementById("verDica");
  botaoDica.textContent = "Ver dica";
  botaoDica.disabled = false;
  document.getElementById("encerrar").disabled = false;

  iniciarCronometro(DURACAO);
  iniciarMicrofone();
});

document
  .getElementById("pausarTempo")
  .addEventListener("click", alternarPausaCronometro);

document.getElementById("verDica").addEventListener("click", function () {
  const dica = document.getElementById("dica");
  if (dica.hidden) {
    dica.textContent =
      ladoAtual === "A favor" ? temaAtual.favor : temaAtual.contra;
    dica.hidden = false;
    this.textContent = "Esconder dica";
  } else {
    dica.hidden = true;
    this.textContent = "Ver dica";
  }
});

document.getElementById("encerrar").addEventListener("click", function () {
  clearInterval(intervalo);
  intervalo = null;
  cronometroPausado = false;
  const botaoPausa = document.getElementById("pausarTempo");
  botaoPausa.textContent = "Pausar tempo";
  botaoPausa.disabled = true;
  this.disabled = true;
  finalizarFala();
});
