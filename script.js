/* =========================
   AGROWEIBER
   SCRIPT.JS
========================= */

/* -------------------------
   CALCULADORA DE CARBONO
------------------------- */

function calcularCarbono() {

    let hectares =
        Number(
            document.getElementById("hectares").value
        );

    let resultado =
        document.getElementById(
            "resultadoCarbono"
        );

    if (hectares <= 0 || isNaN(hectares)) {

        resultado.innerHTML =
            "Digite uma quantidade válida.";

        return;
    }

    let carbono = hectares * 12;

    resultado.innerHTML =
        `🌱 Aproximadamente ${carbono} toneladas de carbono podem ser capturadas por ano.`;
}

/* -------------------------
   CONTADORES DASHBOARD
------------------------- */

function animarContador(id, valorFinal) {

    let elemento =
        document.getElementById(id);

    let valor = 0;

    let incremento =
        valorFinal / 100;

    let contador = setInterval(() => {

        valor += incremento;

        elemento.textContent =
            Math.floor(valor);

        if (valor >= valorFinal) {

            elemento.textContent =
                valorFinal;

            clearInterval(contador);
        }

    }, 20);
}

window.addEventListener("load", () => {

    animarContador(
        "preservada",
        8500
    );

    animarContador(
        "agua",
        42000
    );

    animarContador(
        "reciclagem",
        7800
    );

    animarContador(
        "carbono",
        12000
    );

});

/* -------------------------
   GRÁFICO CHART.JS
------------------------- */

const graficoCanvas =
    document.getElementById("grafico");

if (graficoCanvas) {

    new Chart(
        graficoCanvas,
        {
            type: "bar",

            data: {

                labels: [
                    "Área Preservada",
                    "Água",
                    "Reciclagem",
                    "Carbono"
                ],

                datasets: [{

                    label:
                        "Indicadores Sustentáveis",

                    data: [
                        85,
                        92,
                        70,
                        88
                    ],

                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#f1c40f",
                        "#27ae60"
                    ]

                }]
            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        display: false
                    }

                }
            }
        }
    );
}

/* -------------------------
   SIMULADOR AMBIENTAL
------------------------- */

let ambiente = 50;
let economia = 50;
let trabalhador = 50;
let sustentabilidade = 50;

function atualizarPlacar() {

    document.getElementById(
        "ambiente"
    ).textContent = ambiente;

    document.getElementById(
        "economia"
    ).textContent = economia;

    document.getElementById(
        "trabalhador"
    ).textContent = trabalhador;

    document.getElementById(
        "sustentabilidade"
    ).textContent = sustentabilidade;
}

function escolha(tipo) {

    switch (tipo) {

        case "preservar":

            ambiente += 10;
            sustentabilidade += 10;

            break;

        case "desmatar":

            ambiente -= 10;
            economia += 5;
            sustentabilidade -= 10;

            break;

        case "solar":

            ambiente += 5;
            sustentabilidade += 10;
            economia += 5;

            break;

        case "fossil":

            economia += 8;
            ambiente -= 8;
            sustentabilidade -= 10;

            break;
    }

    ambiente =
        Math.max(
            0,
            Math.min(100, ambiente)
        );

    economia =
        Math.max(
            0,
            Math.min(100, economia)
        );

    sustentabilidade =
        Math.max(
            0,
            Math.min(
                100,
                sustentabilidade
            )
        );

    atualizarPlacar();
}

/* -------------------------
   SISTEMA DE PONTOS
------------------------- */

let pontos = 0;

const botaoPontos =
    document.getElementById(
        "ganharPontos"
    );

if (botaoPontos) {

    botaoPontos.addEventListener(
        "click",
        () => {

            pontos += 10;

            document.getElementById(
                "pontos"
            ).textContent = pontos;

            if (pontos >= 100) {

                alert(
                    "🏆 Você completou o Desafio Verde!"
                );
            }
        }
    );
}

/* -------------------------
   CERTIFICADO
------------------------- */

const certificado =
    document.getElementById(
        "certificado"
    );

if (certificado) {

    certificado.addEventListener(
        "click",
        () => {

            if (pontos < 50) {

                alert(
                    "Você precisa de pelo menos 50 pontos para receber o certificado."
                );

                return;
            }

            let nome =
                prompt(
                    "Digite seu nome:"
                );

            if (!nome) return;

            alert(
                `🏆 Certificado emitido!\n\n${nome}\nGuardião do Agro Sustentável`
            );
        }
    );
}

/* -------------------------
   MODAIS
------------------------- */

const modal =
    document.getElementById(
        "modal"
    );

const tituloModal =
    document.getElementById(
        "tituloModal"
    );

const textoModal =
    document.getElementById(
        "textoModal"
    );

const fechar =
    document.querySelector(
        ".fechar"
    );

const textos = {

    solar: {
        titulo:
            "Energia Solar",
        texto:
            "A energia solar reduz emissões de carbono e os custos energéticos das propriedades rurais."
    },

    bio: {
        titulo:
            "Bioinsumos",
        texto:
            "Bioinsumos utilizam organismos vivos para melhorar a produtividade e reduzir químicos."
    },

    compostagem: {
        titulo:
            "Compostagem",
        texto:
            "Transforma resíduos orgânicos em adubo natural rico em nutrientes."
    },

    agrofloresta: {
        titulo:
            "Agroflorestas",
        texto:
            "Integram árvores, culturas agrícolas e biodiversidade em um sistema sustentável."
    },

    reciclagem: {
        titulo:
            "Economia Circular",
        texto:
            "Promove o reaproveitamento de materiais e reduz desperdícios."
    }
};

document
    .querySelectorAll(
        ".modal-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                let tipo =
                    card.dataset.modal;

                tituloModal.innerHTML =
                    textos[tipo].titulo;

                textoModal.innerHTML =
                    textos[tipo].texto;

                modal.style.display =
                    "flex";
            }
        );
    });

if (fechar) {

    fechar.onclick = () => {

        modal.style.display =
            "none";
    };
}

window.onclick = e => {

    if (e.target === modal) {

        modal.style.display =
            "none";
    }
};

/* -------------------------
   REVELAÇÃO AO ROLAR
------------------------- */

const observador =
    new IntersectionObserver(
        entradas => {

            entradas.forEach(
                entrada => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.classList.add(
                            "visivel"
                        );
                    }
                }
            );

        },
        {
            threshold: 0.2
        }
    );

document
    .querySelectorAll(
        ".card, .indicador"
    )
    .forEach(el => {

        observador.observe(el);
    });

/* -------------------------
   FRASE FINAL DINÂMICA
------------------------- */

const frases = [

    "🌱 Sustentabilidade é investir no amanhã.",

    "🌳 Produzir e preservar podem caminhar juntos.",

    "💧 Cada gota economizada faz diferença.",

    "🐝 Sem polinizadores não existe agricultura.",

    "⚖️ Desenvolvimento exige responsabilidade social."
];

let indice = 0;

setInterval(() => {

    const bloco =
        document.querySelector(
            ".frase-final blockquote"
        );

    if (!bloco) return;

    bloco.innerHTML =
        frases[indice];

    indice++;

    if (
        indice >= frases.length
    ) {

        indice = 0;
    }

}, 5000);

/* -------------------------
   MENSAGEM DE BOAS-VINDAS
------------------------- */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            alert(
                "🌱 Bem-vindo ao AgroWeiber!\n\nExplore sustentabilidade, direitos trabalhistas, bioeconomia e inovação no campo."
            );

        }, 1000);
    }
);
