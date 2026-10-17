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
const PREPARACAO = 60;
const DURACAO = 120;

let intervalo;
let segundosRestantes = PREPARACAO;
let totalFase = PREPARACAO;
let cronometroPausado = false;
let fase = null;
let temaAtual = null;
let ladoAtual = null;

function escolher(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function atualizarTempo() {
  const tempo = document.getElementById("tempo");
  const min = String(Math.floor(segundosRestantes / 60)).padStart(2, "0");
  const seg = String(segundosRestantes % 60).padStart(2, "0");

  tempo.textContent = min + ":" + seg;
  tempo.classList.toggle("urgente", segundosRestantes <= 10);
  document.getElementById("barraPreenchida").style.width =
    (segundosRestantes / totalFase) * 100 + "%";
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

    if (fase === "preparacao") {
      iniciarFase("fala");
      return;
    }

    const tempo = document.getElementById("tempo");
    tempo.textContent = "Tempo esgotado!";
    tempo.classList.add("esgotado");
    document.getElementById("fase").textContent = "Fim do debate";
    document.body.dataset.fase = "fim";
    document.getElementById("pausarTempo").disabled = true;
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
    iniciarCronometro(PREPARACAO);
  } else {
    rotulo.textContent = "Fala: é a sua vez!";
    botaoPular.disabled = true;
    iniciarCronometro(DURACAO);
  }
}

function sortear() {
  const botao = document.getElementById("sortear");
  const elTema = document.getElementById("tema");
  const elLado = document.getElementById("lado");
  const botaoDica = document.getElementById("verDica");

  clearInterval(intervalo);
  intervalo = null;
  botao.disabled = true;
  document.getElementById("pausarTempo").disabled = true;
  document.getElementById("pularPrep").disabled = true;
  botaoDica.disabled = true;
  document.getElementById("dica").hidden = true;
  elLado.textContent = "";
  elLado.className = "";
  elTema.classList.add("girando");

  temaAtual = escolher(temas);
  ladoAtual = escolher(lados);

  let giros = 0;
  const roleta = setInterval(function () {
    elTema.textContent = escolher(temas).texto;
    giros++;

    if (giros >= 12) {
      clearInterval(roleta);
      elTema.classList.remove("girando");
      elTema.textContent = temaAtual.texto;
      elLado.textContent = "Você defende: " + ladoAtual;
      elLado.className = ladoAtual === "A favor" ? "favor" : "contra";
      botao.disabled = false;
      botaoDica.textContent = "Ver dica";
      botaoDica.disabled = false;
      iniciarFase("preparacao");
    }
  }, 90);
}

document.getElementById("sortear").addEventListener("click", sortear);

document
  .getElementById("pausarTempo")
  .addEventListener("click", alternarPausaCronometro);

document.getElementById("pularPrep").addEventListener("click", function () {
  iniciarFase("fala");
});

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
