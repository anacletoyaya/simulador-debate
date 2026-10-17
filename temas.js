const temas = [
  // ---------- Política ----------
  {
    area: "Política",
    texto: "O voto deveria ser obrigatório?",
    favor:
      "Maior representatividade e legitimidade dos eleitos, e o voto vira hábito cívico em vez de depender só de quem se mobiliza.",
    contra:
      "Liberdade individual inclui o direito de não votar, e obrigar gera votos sem interesse, brancos e nulos, sem aumentar o engajamento real.",
  },
  {
    area: "Política",
    texto: "Políticos deveriam ter salários menores?",
    favor:
      "Reduz gastos públicos, aproxima o político da realidade da população e desestimula quem entra na política só por dinheiro.",
    contra:
      "Pode afastar pessoas qualificadas, aumentar a dependência de financiadores e restringir a política a quem já tem patrimônio.",
  },
  {
    area: "Política",
    texto: "Deveria haver limite de reeleições para cargos políticos?",
    favor:
      "Evita a perpetuação no poder, renova ideias e reduz o uso da máquina pública a favor de quem já está no cargo.",
    contra:
      "Tira do eleitor o direito de reeleger quem aprova e faz o país perder a experiência acumulada de bons governantes.",
  },
  {
    area: "Política",
    texto: "O financiamento público de campanhas eleitorais é justo?",
    favor:
      "Reduz a dependência de grandes doadores privados e dá condições mais iguais de disputa entre os candidatos.",
    contra:
      "Usa dinheiro público que poderia ir para saúde e educação, e a divisão dos recursos pode favorecer os partidos maiores.",
  },

  // ---------- Relações Internacionais ----------
  {
    area: "Relações Internacionais",
    texto: "A ONU ainda é eficaz?",
    favor:
      "Mantém um canal diplomático global, tem agências importantes (OMS, UNICEF, ACNUR) e operações de paz que ajudam a conter conflitos.",
    contra:
      "O veto no Conselho de Segurança pode paralisar decisões, a ONU não tem poder próprio para impor o que decide e a burocracia é lenta.",
  },
  {
    area: "Relações Internacionais",
    texto:
      "Sanções econômicas são uma forma justa de pressionar outros países?",
    favor:
      "São uma alternativa à guerra, pressionam sem violência direta e sinalizam condenação internacional, como as aplicadas à África do Sul durante o apartheid.",
    contra:
      "Costumam atingir a população civil, há debate sobre se realmente mudam o comportamento dos governos e os regimes podem se adaptar.",
  },
  {
    area: "Relações Internacionais",
    texto:
      "Todos os países deveriam ter direito de veto no Conselho de Segurança?",
    favor:
      "Hoje só cinco países têm esse poder. Estendê-lo daria igualdade entre Estados soberanos e mais legitimidade às decisões.",
    contra:
      "Com mais vetos o Conselho travaria ainda mais, e as potências com maior capacidade militar é que sustentam a execução das decisões.",
    fontes: [
      {
        titulo: "Al Jazeera: veto no Conselho de Segurança",
        url: "https://www.aljazeera.com/features/2012/2/5/veto-power-at-the-un-security-council",
      },
    ],
  },
  {
    area: "Relações Internacionais",
    texto: "Fronteiras deveriam ser mais abertas para imigrantes?",
    favor:
      "Ganhos econômicos com mão de obra, resposta ao envelhecimento da população e respeito à liberdade de movimento e aos direitos humanos.",
    contra:
      "Pressão sobre serviços públicos, desafios de segurança e controle e dificuldade de integração se a chegada for rápida demais.",
  },
  {
    area: "Relações Internacionais",
    texto:
      "Um país deveria poder intervir em outro para impedir violações graves de direitos humanos?",
    favor:
      "A comunidade internacional não pode assistir a genocídios e massacres, e a soberania não deveria proteger quem comete crimes contra a população.",
    contra:
      "Intervenções podem esconder interesses políticos e econômicos, violam a soberania e algumas são criticadas por terem deixado instabilidade duradoura.",
  },

  // ---------- Meio Ambiente ----------
  {
    area: "Meio Ambiente",
    texto: "O aquecimento global é responsabilidade do ser humano?",
    favor:
      "O IPCC (2021) conclui que é inequívoco que a influência humana aqueceu a atmosfera, os oceanos e a terra, e que o aumento dos gases de efeito estufa desde cerca de 1750 vem das atividades humanas.",
    contra:
      "Lado muito difícil, pois a evidência é forte. Os espaços de debate estão nas incertezas das projeções, na velocidade do aquecimento e nas respostas políticas. Evite negar a influência humana.",
    fontes: [
      {
        titulo: "IPCC AR6: Resumo para Formuladores de Políticas (2021)",
        url: "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/",
      },
    ],
  },
  {
    area: "Meio Ambiente",
    texto: "Países ricos deveriam pagar mais pelo combate à crise climática?",
    favor:
      "Responsabilidade histórica pelas emissões acumuladas, mais capacidade financeira, e os países mais pobres são muito vulneráveis aos efeitos do clima.",
    contra:
      "Hoje China e Índia estão entre os três maiores emissores do mundo, há risco de mau uso dos recursos, e a responsabilidade deveria ser compartilhada.",
    fontes: [
      {
        titulo: "Emissões por país em 2023 (Statista, dados do UNEP)",
        url: "https://statista.com/chart/33335/total-and-per-capita-greenhouse-gas-emissions-of-selected-countries-and-regions",
      },
    ],
  },
  {
    area: "Meio Ambiente",
    texto:
      "A energia nuclear deveria ser ampliada para combater a crise climática?",
    favor:
      "Gera eletricidade de forma contínua e, ao longo do ciclo de vida, emite poucos gases de efeito estufa em comparação com os combustíveis fósseis.",
    contra:
      "Tem custo alto e obras demoradas, gera rejeitos radioativos e carrega o risco de acidentes graves, mesmo que raros.",
    fontes: [
      {
        titulo:
          "Revisão de emissões do ciclo de vida da energia nuclear (OSTI)",
        url: "https://www.osti.gov/biblio/1040918",
      },
      {
        titulo: "Pomponi e Hart (2021): usina europeia",
        url: "https://napier-repository.worktribe.com/output/2774108/the-greenhouse-gas-emissions-of-nuclear-energy-life-cycle-assessment-of-a-european-pressurised-reactor",
      },
    ],
  },
  {
    area: "Meio Ambiente",
    texto: "O consumo de carne deveria ser reduzido por razões ambientais?",
    favor:
      "Segundo a FAO (2013), a pecuária responde por cerca de 14,5% das emissões de gases de efeito estufa causadas por humanos e é um fator importante do desmatamento.",
    contra:
      "A FAO estima que boas práticas poderiam reduzir as emissões da pecuária em até 30%, e a carne é fonte importante de nutrientes, renda e cultura.",
    fontes: [
      {
        titulo: "FAO: emissões da pecuária (notícia AFP, 2013)",
        url: "https://phys.org/news/2013-09-livestock-major-contributor-global.html",
      },
    ],
  },

  // ---------- Tecnologia ----------
  {
    area: "Tecnologia",
    texto: "A inteligência artificial representa uma ameaça para a humanidade?",
    favor:
      "Desemprego em massa, desinformação com deepfakes, concentração de poder nas mãos de poucas empresas e sistemas difíceis de controlar.",
    contra:
      "É uma ferramenta com grandes ganhos em saúde e produtividade, pode ser regulada, e tecnologias anteriores também geraram medo e depois novos empregos.",
  },
  {
    area: "Tecnologia",
    texto: "As redes sociais deveriam ser proibidas para menores de 16 anos?",
    favor:
      "Há preocupação com saúde mental, vício em telas e exposição a conteúdos impróprios, e a proteção de menores justifica limites.",
    contra:
      "É difícil fiscalizar, os jovens perdem acesso a informação e comunidades, e a responsabilidade deveria recair sobre as plataformas e as famílias.",
  },
  {
    area: "Tecnologia",
    texto: "A polícia deveria usar reconhecimento facial?",
    favor:
      "Ajuda a identificar procurados e a resolver crimes com mais rapidez, aumentando a segurança.",
    contra:
      "Um estudo do NIST (2019) achou diferenças de erro entre grupos demográficos na maioria dos algoritmos testados, o que pode causar falsas acusações, além de ameaçar a privacidade e abrir caminho para a vigilância em massa.",
    fontes: [
      {
        titulo: "NIST: FRVT Parte 3, efeitos demográficos (2019)",
        url: "https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf",
      },
    ],
  },
  {
    area: "Tecnologia",
    texto: "Carros autônomos deveriam ser liberados nas ruas?",
    favor:
      "O erro humano é fator importante nos acidentes, e a tecnologia tem potencial de reduzir mortes e liberar tempo das pessoas.",
    contra:
      "Há dúvidas sobre quem é responsável em um acidente, falhas imprevisíveis e o impacto sobre os empregos de motoristas.",
  },

  // ---------- Educação ----------
  {
    area: "Educação",
    texto: "O homeschooling deveria ser permitido?",
    favor:
      "Ensino personalizado no ritmo do aluno, liberdade das famílias de escolher a educação dos filhos e proteção contra bullying.",
    contra:
      "Perda da convivência com pessoas diferentes, que ensina a lidar com conflitos, e menos fiscalização da qualidade do ensino e do bem-estar da criança.",
  },
  {
    area: "Educação",
    texto:
      "O ensino em tempo integral deveria ser adotado em todas as escolas públicas?",
    favor:
      "Mais tempo de aprendizagem e atividades, e proteção para jovens que ficariam sem supervisão no contraturno.",
    contra:
      "Custo alto de estrutura e professores, e dificuldade para estudantes que precisam trabalhar ou ajudar em casa.",
  },
  {
    area: "Educação",
    texto: "As provas e o vestibular são a melhor forma de avaliar estudantes?",
    favor:
      "Oferecem um critério objetivo e igual para todos, o que reduz favorecimentos.",
    contra:
      "Medem principalmente memorização e desempenho sob pressão, ignoram outras habilidades e geram muita ansiedade.",
  },
  {
    area: "Educação",
    texto: "O uso de celular deveria ser proibido nas escolas?",
    favor:
      "Reduz distração em sala, melhora a atenção e favorece a convivência entre os alunos.",
    contra:
      "Pode ser ferramenta de aprendizagem, e ensinar o uso responsável vale mais do que simplesmente proibir.",
  },

  // ---------- Economia e Trabalho ----------
  {
    area: "Economia e Trabalho",
    texto: "O trabalho remoto é mais produtivo do que o trabalho presencial?",
    favor:
      "Sem tempo perdido no deslocamento, com mais foco, flexibilidade e acesso a talentos de qualquer lugar.",
    contra:
      "Prejudica colaboração e inovação espontânea, dificulta a integração de novos funcionários e pode causar isolamento.",
  },
  {
    area: "Economia e Trabalho",
    texto: "A globalização trouxe mais benefícios do que prejuízos?",
    favor:
      "Preços menores, difusão de tecnologia e milhões de pessoas tiradas da pobreza com o comércio internacional.",
    contra:
      "Aumento da desigualdade, desindustrialização de regiões, dependência de cadeias de produção distantes e perda de diversidade cultural.",
  },
  {
    area: "Economia e Trabalho",
    texto:
      "A jornada de trabalho deveria ser reduzida para quatro dias por semana?",
    favor:
      "No maior piloto do Reino Unido (61 empresas, 2022), 56 mantiveram a semana de quatro dias, e as empresas relataram produtividade mantida e receita estável ou um pouco maior.",
    contra:
      "As empresas do piloto se inscreveram e os resultados foram relatados por elas. Nem todos os setores conseguem adotar (saúde e serviços, por exemplo), e a mudança pode pesar para pequenas empresas.",
    fontes: [
      {
        titulo: "WGBH: piloto de quatro dias no Reino Unido",
        url: "https://wgbh.org/news/2023-02-21/dozens-of-u-k-companies-will-keep-the-4-day-workweek-after-a-pilot-program-ends",
      },
      {
        titulo: "Time Out: 12 conclusões do experimento",
        url: "https://timeout.com/uk/news/12-takeaways-from-the-uks-four-day-working-week-experiment-022123",
      },
    ],
  },
  {
    area: "Economia e Trabalho",
    texto: "A renda básica universal seria uma boa política?",
    favor:
      "Reduz a pobreza, dá segurança diante de crises e do avanço da automação e simplifica a assistência social.",
    contra:
      "Tem custo muito alto, pode desestimular parte do trabalho e talvez fosse mais eficiente ajudar quem mais precisa.",
  },

  // ---------- Sociedade ----------
  {
    area: "Sociedade",
    texto: "Deveria haver pena de morte?",
    favor:
      "Defensores argumentam que é uma pena proporcional aos crimes mais graves, que pode dissuadir e que impede a reincidência do condenado.",
    contra:
      "Risco irreversível de executar um inocente, aplicação desigual da pena e, segundo o National Research Council dos EUA (2012), as pesquisas não conseguem mostrar que ela dissuade mais do que outras penas.",
    fontes: [
      {
        titulo:
          "National Research Council: Deterrence and the Death Penalty (2012)",
        url: "https://nap.nationalacademies.org/13363",
      },
    ],
  },
  {
    area: "Sociedade",
    texto: "Zoológicos deveriam ser extintos?",
    favor:
      "Manter animais em cativeiro compromete o bem-estar deles, e existem formas de ver a vida selvagem sem prendê-la.",
    contra:
      "Alguns zoológicos participam de programas de reprodução e conservação de espécies ameaçadas e fazem pesquisa e educação ambiental.",
  },
  {
    area: "Sociedade",
    texto: "As cotas nas universidades públicas são uma boa política?",
    favor:
      "Corrigem desigualdades históricas de acesso e ampliam a diversidade. Estudos em universidades brasileiras mostram diferenças pequenas de desempenho entre cotistas e não cotistas, que variam conforme o curso.",
    contra:
      "Há quem defenda que critérios de renda seriam mais justos e quem tema que as cotas reforcem divisões. Alguns estudos acham desempenho médio um pouco maior entre não cotistas.",
    fontes: [
      {
        titulo: "UFBA: cotas e coeficientes de rendimento",
        url: "https://doaj.org/article/446a60cee60d4636be6ffe7f3fd06d55",
      },
      {
        titulo: "UFPE: desempenho de cotistas (2018 a 2022)",
        url: "https://www.ipea.gov.br/ppp/index.php/PPP/article/view/1881",
      },
    ],
  },
  {
    area: "Sociedade",
    texto: "O serviço militar deveria ser obrigatório?",
    favor:
      "Forma cidadãos, fortalece a defesa nacional e integra jovens de origens diferentes.",
    contra:
      "Limita a liberdade individual, tem custo alto e forças armadas profissionais tendem a ser mais preparadas.",
  },

  // ---------- Saúde ----------
  {
    area: "Saúde",
    texto: "A legalização da maconha é benéfica para a sociedade?",
    favor:
      "Defensores apontam que pode enfraquecer o tráfico, reduzir prisões por porte e permitir regulação, arrecadação e uso medicinal.",
    contra:
      "Riscos de dependência e de efeitos em adolescentes, possível aumento do consumo e perigo de dirigir sob efeito.",
  },
  {
    area: "Saúde",
    texto: "A vacinação deveria ser obrigatória?",
    favor:
      "Protege toda a comunidade, inclusive quem não pode se vacinar (imunidade coletiva), e foi central para controlar doenças como o sarampo e a poliomielite.",
    contra:
      "Interfere na autonomia sobre o próprio corpo, e informação e confiança podem convencer mais do que a obrigação.",
    fontes: [
      {
        titulo: "Our World in Data: vacinação",
        url: "https://ourworldindata.org/vaccination",
      },
    ],
  },
  {
    area: "Saúde",
    texto: "O sistema de saúde deveria ser totalmente público?",
    favor:
      "Garante acesso universal e igualitário, sem depender da renda de cada pessoa.",
    contra:
      "Corre o risco de sobrecarga e falta de recursos, e a participação do setor privado amplia a oferta e a escolha.",
  },
  {
    area: "Saúde",
    texto: "Os cigarros eletrônicos deveriam ser liberados?",
    favor:
      "Defensores veem uma alternativa de redução de danos para quem já fuma, com regulação e controle de qualidade.",
    contra:
      "Trazem riscos à saúde, atraem jovens para a nicotina e faltam estudos sobre os efeitos a longo prazo.",
  },
];
