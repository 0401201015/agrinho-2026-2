/* ==================================================
   AGROWEIBER
   SCRIPT.JS - PARTE 1
   SISTEMA BASE
================================================== */

/* LOADING SCREEN */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }, 2500);

});

/* DARK MODE */

const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme){

    if(theme === "dark"){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

}

const savedTheme =
localStorage.getItem("agroweiber-theme");

if(savedTheme){

    applyTheme(savedTheme);

}

if(themeBtn){

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const theme =
        document.body.classList.contains("dark")
        ? "dark"
        : "light";

        localStorage.setItem(
            "agroweiber-theme",
            theme
        );

    });

}

/* MENU MOBILE */

const mobileMenuBtn =
document.getElementById("mobileMenu");

const nav =
document.querySelector("nav");

if(mobileMenuBtn){

    mobileMenuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

}

document.querySelectorAll("nav a")
.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});

/* SCROLL PROGRESS */

const progressBar =
document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop =
    document.documentElement.scrollTop;

    const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    const progress =
    (scrollTop / scrollHeight) * 100;

    progressBar.style.width =
    progress + "%";

});

/* BACK TO TOP */

const backBtn =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backBtn.classList.add("show");

    }else{

        backBtn.classList.remove("show");

    }

});

if(backBtn){

    backBtn.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* SCROLL REVEAL */

const revealElements =
document.querySelectorAll(".reveal");

function revealOnScroll(){

    revealElements.forEach(el => {

        const top =
        el.getBoundingClientRect().top;

        const trigger =
        window.innerHeight - 100;

        if(top < trigger){

            el.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* CONTADORES */

const counters =
document.querySelectorAll("[data-counter]");

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    const section =
    document.querySelector(
        ".statistics-section"
    );

    if(!section) return;

    const position =
    section.getBoundingClientRect().top;

    if(position < window.innerHeight){

        counterStarted = true;

        counters.forEach(counter => {

            const target =
            Number(
                counter.dataset.counter
            );

            let current = 0;

            const increment =
            target / 120;

            const update = () => {

                current += increment;

                if(current >= target){

                    counter.textContent =
                    target.toLocaleString();

                    return;

                }

                counter.textContent =
                Math.floor(current)
                .toLocaleString();

                requestAnimationFrame(update);

            };

            update();

        });

    }

}

window.addEventListener(
    "scroll",
    startCounters
);

startCounters();

/* PARTICLES */

const particlesContainer =
document.getElementById(
    "particles-container"
);

if(particlesContainer){

    for(let i=0;i<40;i++){

        const particle =
        document.createElement("span");

        particle.classList.add(
            "particle"
        );

        particle.style.position =
        "absolute";

        particle.style.width =
        Math.random()*8+3+"px";

        particle.style.height =
        particle.style.width;

        particle.style.borderRadius =
        "50%";

        particle.style.background =
        "rgba(34,197,94,.15)";

        particle.style.left =
        Math.random()*100+"%";

        particle.style.top =
        Math.random()*100+"%";

        particle.style.animation =
        `float ${
            Math.random()*10+6
        }s infinite`;

        particlesContainer.appendChild(
            particle
        );

    }

}

/* HERO PARALLAX */

const hero =
document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if(!hero) return;

    const offset =
    window.pageYOffset;

    hero.style.backgroundPositionY =
    offset * 0.4 + "px";

});

/* WIDGETS INTELIGENTES */

const liveNumbers =
document.querySelectorAll(".live-number");

function animateLiveNumbers(){

    liveNumbers.forEach(item => {

        const value =
        parseInt(
            item.dataset.value
        );

        let start = 0;

        const speed =
        value / 100;

        const run = () => {

            start += speed;

            if(start >= value){

                item.textContent =
                value.toLocaleString();

                return;

            }

            item.textContent =
            Math.floor(start)
            .toLocaleString();

            requestAnimationFrame(run);

        };

        run();

    });

}

animateLiveNumbers();
/* ==================================================
   AGROWEIBER
   SCRIPT.JS - PARTE 2
   GLOSSÁRIO + BIBLIOTECA + NOTÍCIAS
   MAPA + MODAIS + OBSERVATÓRIO
================================================== */

/* ==========================================
   GLOSSÁRIO AGROVERDE
========================================== */

const glossarySearch =
document.getElementById("glossarySearch");

if(glossarySearch){

    glossarySearch.addEventListener("input", () => {

        const value =
        glossarySearch.value.toLowerCase();

        const items =
        document.querySelectorAll(".glossary-item");

        items.forEach(item => {

            const text =
            item.textContent.toLowerCase();

            item.style.display =
            text.includes(value)
            ? "block"
            : "none";

        });

    });

}

/* ==========================================
   BIBLIOTECA CIENTÍFICA
========================================== */

const librarySearch =
document.getElementById("librarySearch");

if(librarySearch){

    librarySearch.addEventListener("input", () => {

        const value =
        librarySearch.value.toLowerCase();

        document
        .querySelectorAll(".library-card")
        .forEach(card => {

            card.style.display =
            card.textContent
            .toLowerCase()
            .includes(value)
            ? "block"
            : "none";

        });

    });

}

/* ==========================================
   CENTRAL DE NOTÍCIAS
========================================== */

const filterButtons =
document.querySelectorAll(".news-filter");

const newsCards =
document.querySelectorAll(".news-card");

filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        filterButtons.forEach(button => {

            button.classList.remove("active");

        });

        btn.classList.add("active");

        const category =
        btn.dataset.category;

        newsCards.forEach(card => {

            if(
                category === "all" ||
                card.dataset.category === category
            ){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

});

/* ==========================================
   MAPA INTERATIVO DO BRASIL
========================================== */

const regionInfo =
document.getElementById("regionInfo");

const regionData = {

    norte:{

        title:"Região Norte",

        text:`
        Grande potencial em bioeconomia,
        biodiversidade amazônica,
        manejo sustentável e
        desenvolvimento de novos
        bioprodutos.
        `

    },

    nordeste:{

        title:"Região Nordeste",

        text:`
        Destaque para energia renovável,
        fruticultura irrigada e
        agricultura adaptada ao
        semiárido.
        `

    },

    centrooeste:{

        title:"Centro-Oeste",

        text:`
        Maior polo de produção de grãos
        do Brasil, com forte adoção de
        agricultura de precisão.
        `

    },

    sudeste:{

        title:"Sudeste",

        text:`
        Liderança em inovação,
        pesquisa agrícola,
        biotecnologia e
        agronegócio industrial.
        `

    },

    sul:{

        title:"Sul",

        text:`
        Forte presença de cooperativas,
        agricultura familiar,
        pecuária e produção sustentável.
        `

    }

};

document
.querySelectorAll(".region-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const region =
        button.dataset.region;

        if(regionInfo){

            regionInfo.innerHTML = `

            <h3>
                ${regionData[region].title}
            </h3>

            <p>
                ${regionData[region].text}
            </p>

            `;

        }

    });

});

/* ==========================================
   LABORATÓRIO DE INOVAÇÃO
========================================== */

const modal =
document.getElementById("innovationModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const innovationData = {

    precisao:`
    <h2>Agricultura de Precisão</h2>
    <p>
    Utiliza sensores, GPS e análise
    de dados para otimizar a produção,
    reduzir desperdícios e aumentar
    a eficiência agrícola.
    </p>
    `,

    drones:`
    <h2>Drones Agrícolas</h2>
    <p>
    Monitoramento aéreo,
    pulverização localizada
    e análise de lavouras
    em tempo real.
    </p>
    `,

    sensores:`
    <h2>Sensoriamento Remoto</h2>
    <p>
    Uso de satélites e sensores para
    monitorar clima, solo e vegetação.
    </p>
    `,

    dados:`
    <h2>Inteligência de Dados</h2>
    <p>
    Big Data e análise preditiva
    auxiliam na tomada de decisão
    estratégica.
    </p>
    `,

    genetica:`
    <h2>Melhoramento Genético</h2>
    <p>
    Desenvolvimento de cultivares
    mais produtivas, resistentes
    e sustentáveis.
    </p>
    `,

    biotecnologia:`
    <h2>Biotecnologia Aplicada</h2>
    <p>
    Soluções inovadoras para
    produção agrícola sustentável,
    bioinsumos e novos materiais.
    </p>
    `

};

document
.querySelectorAll(".innovation-card")
.forEach(card => {

    card.addEventListener("click", () => {

        const topic =
        card.dataset.topic;

        modalBody.innerHTML =
        innovationData[topic];

        modal.classList.add("active");

    });

});

if(closeModal){

    closeModal.addEventListener("click", () => {

        modal.classList.remove("active");

    });

}

window.addEventListener("click", e => {

    if(e.target === modal){

        modal.classList.remove("active");

    }

});

/* ==========================================
   OBSERVATÓRIO DA BIOECONOMIA
========================================== */

const observatoryCanvas =
document.getElementById(
    "observatoryChart"
);

if(observatoryCanvas){

    const ctx =
    observatoryCanvas.getContext("2d");

    function drawObservatory(){

        const data =
        [60,80,75,90,70];

        const labels = [

            "Circular",
            "Energia",
            "Biomassa",
            "Materiais",
            "Inovação"

        ];

        ctx.clearRect(
            0,
            0,
            observatoryCanvas.width,
            observatoryCanvas.height
        );

        const barWidth = 70;

        data.forEach((value,index) => {

            const x =
            70 + (index * 120);

            const y =
            320 - (value * 2);

            ctx.fillStyle =
            "#16a34a";

            ctx.fillRect(
                x,
                y,
                barWidth,
                value * 2
            );

            ctx.fillStyle =
            "#334155";

            ctx.font =
            "14px Arial";

            ctx.fillText(
                labels[index],
                x,
                350
            );

        });

    }

    drawObservatory();

}

/* ==========================================
   INDICADOR VISUAL DE MENU ATIVO
========================================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
        section.offsetTop - 150;

        const height =
        section.offsetHeight;

        if(window.scrollY >= top){

            current =
            section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") ===
            "#" + current
        ){

            link.classList.add("active");

        }

    });

});
/* ==================================================
   AGROWEIBER
   SCRIPT.JS - PARTE 3
   QUIZ + RESULTADOS + CERTIFICADO
================================================== */

/* ==========================================
   BANCO DE QUESTÕES
========================================== */

const quizQuestions = [

    {
        question:
        "O que é bioeconomia?",

        options:[
            "Uso sustentável de recursos biológicos para gerar valor econômico",
            "Produção exclusiva de combustíveis fósseis",
            "Exploração ilimitada de recursos naturais",
            "Substituição da agricultura por indústria"
        ],

        answer:0
    },

    {
        question:
        "Qual é uma vantagem dos bioinsumos?",

        options:[
            "Aumento do uso de químicos",
            "Maior impacto ambiental",
            "Redução da dependência de insumos químicos",
            "Eliminação da biodiversidade"
        ],

        answer:2
    },

    {
        question:
        "O que significa ESG?",

        options:[
            "Estratégia Geral Sustentável",
            "Environmental, Social and Governance",
            "Energia Sustentável Global",
            "Economia Social Governamental"
        ],

        answer:1
    },

    {
        question:
        "Qual prática favorece a conservação do solo?",

        options:[
            "Desmatamento",
            "Queimadas",
            "Plantio Direto",
            "Monocultura intensiva"
        ],

        answer:2
    },

    {
        question:
        "A agricultura regenerativa busca:",

        options:[
            "Recuperar ecossistemas e melhorar a saúde do solo",
            "Aumentar erosão",
            "Expandir queimadas",
            "Reduzir biodiversidade"
        ],

        answer:0
    }

];

/* ==========================================
   ELEMENTOS
========================================== */

const quizBox =
document.getElementById("quizBox");

const nextQuestionBtn =
document.getElementById("nextQuestion");

const quizResult =
document.getElementById("quizResult");

const participantInput =
document.getElementById("participantName");

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

/* ==========================================
   CARREGAR QUESTÃO
========================================== */

function loadQuestion(){

    if(!quizBox) return;

    const q =
    quizQuestions[currentQuestion];

    quizBox.innerHTML = `

        <div class="quiz-question">
            ${q.question}
        </div>

        <div class="quiz-options">

            ${q.options.map((option,index)=>`

                <div
                class="quiz-option"
                data-index="${index}">

                    ${option}

                </div>

            `).join("")}

        </div>

    `;

    document
    .querySelectorAll(".quiz-option")
    .forEach(option => {

        option.addEventListener("click", () => {

            document
            .querySelectorAll(".quiz-option")
            .forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });

            option.classList.add(
                "selected"
            );

            selectedAnswer =
            Number(
                option.dataset.index
            );

        });

    });

}

if(quizBox){

    loadQuestion();

}

/* ==========================================
   AVANÇAR QUESTÃO
========================================== */

if(nextQuestionBtn){

    nextQuestionBtn.addEventListener("click", () => {

        if(selectedAnswer === null){

            alert(
                "Selecione uma alternativa."
            );

            return;

        }

        if(
            selectedAnswer ===
            quizQuestions[currentQuestion].answer
        ){

            score++;

        }

        currentQuestion++;

        selectedAnswer = null;

        if(
            currentQuestion <
            quizQuestions.length
        ){

            loadQuestion();

        }else{

            finishQuiz();

        }

    });

}

/* ==========================================
   FINALIZAR QUIZ
========================================== */

function finishQuiz(){

    const percentage =
    Math.round(
        (score / quizQuestions.length) * 100
    );

    let performance = "";

    if(percentage >= 90){

        performance = "Excelente";

    }else if(percentage >= 70){

        performance = "Muito Bom";

    }else if(percentage >= 50){

        performance = "Bom";

    }else{

        performance = "Precisa Aprimorar";

    }

    quizBox.innerHTML = "";

    nextQuestionBtn.style.display =
    "none";

    quizResult.innerHTML = `

        <h3>Quiz Finalizado</h3>

        <p>
            Acertos:
            <strong>
                ${score}
            </strong>
            de
            <strong>
                ${quizQuestions.length}
            </strong>
        </p>

        <p>
            Desempenho:
            <strong>
                ${performance}
            </strong>
        </p>

        <p>
            Aproveitamento:
            <strong>
                ${percentage}%
            </strong>
        </p>

    `;

    generateCertificate(
        percentage,
        performance
    );

}

/* ==========================================
   CERTIFICADO
========================================== */

function generateCertificate(
    percentage,
    performance
){

    const certificate =
    document.getElementById(
        "certificate"
    );

    const certificateName =
    document.getElementById(
        "certificateName"
    );

    const certificateDate =
    document.getElementById(
        "certificateDate"
    );

    const certificateScore =
    document.getElementById(
        "certificateScore"
    );

    if(
        !certificate ||
        !certificateName
    ) return;

    const participantName =
    participantInput?.value.trim()
    || "Participante";

    const today =
    new Date();

    const formattedDate =
    today.toLocaleDateString(
        "pt-BR"
    );

    certificate.style.display =
    "block";

    certificateName.textContent =
    participantName;

    certificateDate.textContent =
    "Emitido em: " + formattedDate;

    certificateScore.innerHTML = `

        Curso:
        <strong>
        Fundamentos da Bioeconomia e
        Sustentabilidade no Agro
        </strong>

        <br><br>

        Resultado:
        <strong>
        ${percentage}%
        </strong>

        <br><br>

        Avaliação:
        <strong>
        ${performance}
        </strong>

    `;

}

/* ==========================================
   ESTATÍSTICAS DO QUIZ
========================================== */

const quizStats = {

    totalTentativas:0,

    melhorResultado:0

};

function saveQuizStats(result){

    quizStats.totalTentativas++;

    if(
        result >
        quizStats.melhorResultado
    ){

        quizStats.melhorResultado =
        result;

    }

    localStorage.setItem(
        "agroweiberQuizStats",
        JSON.stringify(quizStats)
    );

}

const savedStats =
localStorage.getItem(
    "agroweiberQuizStats"
);

if(savedStats){

    const parsed =
    JSON.parse(savedStats);

    quizStats.totalTentativas =
    parsed.totalTentativas || 0;

    quizStats.melhorResultado =
    parsed.melhorResultado || 0;

}

/* ==========================================
   SALVAR AO FINALIZAR
========================================== */

const originalFinishQuiz =
finishQuiz;

finishQuiz = function(){

    const percentage =
    Math.round(
        (score / quizQuestions.length) * 100
    );

    saveQuizStats(percentage);

    originalFinishQuiz();

};

/* ==========================================
   EXIBIR ESTATÍSTICAS
========================================== */

const statsBox =
document.getElementById(
    "quizStats"
);

if(statsBox){

    statsBox.innerHTML = `

        <p>
            Tentativas:
            <strong>
            ${quizStats.totalTentativas}
            </strong>
        </p>

        <p>
            Melhor Resultado:
            <strong>
            ${quizStats.melhorResultado}%
            </strong>
        </p>

    `;

      }
/* ==================================================
   AGROWEIBER
   SCRIPT.JS - PARTE 4
   AGROFINANCE + DASHBOARD + LOCALSTORAGE
================================================== */

/* ==========================================
   BANCO DE DADOS LOCAL
========================================== */

let receitas =
JSON.parse(
    localStorage.getItem(
        "agroweiber_receitas"
    )
) || [];

let gastos =
JSON.parse(
    localStorage.getItem(
        "agroweiber_gastos"
    )
) || [];

/* ==========================================
   ELEMENTOS
========================================== */

const receitaForm =
document.getElementById(
    "receitaForm"
);

const gastoForm =
document.getElementById(
    "gastoForm"
);

const receitaTotalEl =
document.getElementById(
    "receitaTotal"
);

const gastoTotalEl =
document.getElementById(
    "gastoTotal"
);

const lucroTotalEl =
document.getElementById(
    "lucroTotal"
);

const historicoReceitas =
document.getElementById(
    "historicoReceitas"
);

const historicoGastos =
document.getElementById(
    "historicoGastos"
);

/* ==========================================
   SALVAR DADOS
========================================== */

function salvarFinanceiro(){

    localStorage.setItem(
        "agroweiber_receitas",
        JSON.stringify(receitas)
    );

    localStorage.setItem(
        "agroweiber_gastos",
        JSON.stringify(gastos)
    );

}

/* ==========================================
   CALCULAR TOTAIS
========================================== */

function calcularTotais(){

    const totalReceitas =
    receitas.reduce(
        (acc,item)=>
        acc + Number(item.valor),
        0
    );

    const totalGastos =
    gastos.reduce(
        (acc,item)=>
        acc + Number(item.valor),
        0
    );

    const lucro =
    totalReceitas - totalGastos;

    if(receitaTotalEl){

        receitaTotalEl.textContent =
        "R$ " +
        totalReceitas.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits:2
            }
        );

    }

    if(gastoTotalEl){

        gastoTotalEl.textContent =
        "R$ " +
        totalGastos.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits:2
            }
        );

    }

    if(lucroTotalEl){

        lucroTotalEl.textContent =
        "R$ " +
        lucro.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits:2
            }
        );

    }

    desenharGraficoFinanceiro(
        totalReceitas,
        totalGastos
    );

}

/* ==========================================
   RENDER HISTÓRICO
========================================== */

function renderHistoricos(){

    if(historicoReceitas){

        historicoReceitas.innerHTML =
        receitas.map(item => `

            <div class="finance-item">

                <strong>
                    ${item.categoria}
                </strong>

                <br>

                ${item.descricao}

                <br>

                ${item.data}

                <br>

                R$ ${Number(item.valor)
                .toLocaleString(
                    "pt-BR",
                    {
                        minimumFractionDigits:2
                    }
                )}

            </div>

        `).join("");

    }

    if(historicoGastos){

        historicoGastos.innerHTML =
        gastos.map(item => `

            <div class="finance-item">

                <strong>
                    ${item.categoria}
                </strong>

                <br>

                ${item.descricao}

                <br>

                ${item.data}

                <br>

                R$ ${Number(item.valor)
                .toLocaleString(
                    "pt-BR",
                    {
                        minimumFractionDigits:2
                    }
                )}

            </div>

        `).join("");

    }

}

/* ==========================================
   NOVA RECEITA
========================================== */

if(receitaForm){

    receitaForm.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const data =
            receitaForm.querySelector(
                "[name='data']"
            ).value;

            const categoria =
            receitaForm.querySelector(
                "[name='categoria']"
            ).value;

            const descricao =
            receitaForm.querySelector(
                "[name='descricao']"
            ).value;

            const valor =
            receitaForm.querySelector(
                "[name='valor']"
            ).value;

            receitas.push({

                data,
                categoria,
                descricao,
                valor

            });

            salvarFinanceiro();

            renderHistoricos();

            calcularTotais();

            receitaForm.reset();

        }
    );

}

/* ==========================================
   NOVO GASTO
========================================== */

if(gastoForm){

    gastoForm.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const data =
            gastoForm.querySelector(
                "[name='data']"
            ).value;

            const categoria =
            gastoForm.querySelector(
                "[name='categoria']"
            ).value;

            const descricao =
            gastoForm.querySelector(
                "[name='descricao']"
            ).value;

            const valor =
            gastoForm.querySelector(
                "[name='valor']"
            ).value;

            gastos.push({

                data,
                categoria,
                descricao,
                valor

            });

            salvarFinanceiro();

            renderHistoricos();

            calcularTotais();

            gastoForm.reset();

        }
    );

}

/* ==========================================
   GRÁFICO FINANCEIRO CANVAS
========================================== */

function desenharGraficoFinanceiro(
    receitasValor,
    gastosValor
){

    const canvas =
    document.getElementById(
        "financeChart"
    );

    if(!canvas) return;

    const ctx =
    canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const baseY = 320;

    const escala =
    Math.max(
        receitasValor,
        gastosValor,
        1
    );

    const receitaAltura =
    (receitasValor / escala) * 220;

    const gastoAltura =
    (gastosValor / escala) * 220;

    /* RECEITAS */

    ctx.fillStyle =
    "#16a34a";

    ctx.fillRect(
        120,
        baseY - receitaAltura,
        120,
        receitaAltura
    );

    /* GASTOS */

    ctx.fillStyle =
    "#ef4444";

    ctx.fillRect(
        320,
        baseY - gastoAltura,
        120,
        gastoAltura
    );

    /* TEXTOS */

    ctx.fillStyle =
    "#334155";

    ctx.font =
    "16px Arial";

    ctx.fillText(
        "Receitas",
        135,
        350
    );

    ctx.fillText(
        "Gastos",
        350,
        350
    );

    ctx.fillText(
        "R$ " +
        receitasValor.toFixed(0),
        120,
        baseY -
        receitaAltura -
        15
    );

    ctx.fillText(
        "R$ " +
        gastosValor.toFixed(0),
        320,
        baseY -
        gastoAltura -
        15
    );

}

/* ==========================================
   EXPORTAR RESUMO
========================================== */

const exportBtn =
document.getElementById(
    "exportFinance"
);

if(exportBtn){

    exportBtn.addEventListener(
        "click",
        () => {

            const resumo = {

                receitas,
                gastos

            };

            const blob =
            new Blob(

                [
                    JSON.stringify(
                        resumo,
                        null,
                        2
                    )
                ],

                {
                    type:
                    "application/json"
                }

            );

            const link =
            document.createElement("a");

            link.href =
            URL.createObjectURL(blob);

            link.download =
            "agroweiber-financas.json";

            link.click();

        }
    );

}

/* ==========================================
   INICIALIZAÇÃO
========================================== */

renderHistoricos();

calcularTotais();
/* ==================================================
   AGROWEIBER
   SCRIPT.JS - PARTE 5 FINAL
   METAS + CALCULADORAS + ESG + AMBIENTAL
================================================== */

/* ==========================================
   METAS FINANCEIRAS
========================================== */

let metas =
JSON.parse(
localStorage.getItem(
"agroweiber_metas"
)
) || [];

const goalForm =
document.getElementById(
"goalForm"
);

const goalsContainer =
document.getElementById(
"goalsContainer"
);

function salvarMetas(){

localStorage.setItem(
"agroweiber_metas",
JSON.stringify(metas)
);

}

function renderMetas(){

if(!goalsContainer) return;

goalsContainer.innerHTML =
metas.map(meta=>{

const progresso =
Math.min(
(meta.atual/meta.alvo)*100,
100
);

return `

<div class="goal-card">

<h3>${meta.nome}</h3>

<p>
R$ ${Number(meta.atual)
.toLocaleString("pt-BR")}
 /
R$ ${Number(meta.alvo)
.toLocaleString("pt-BR")}
</p>

<div class="goal-progress">

<div
class="goal-progress-fill"
style="
width:${progresso}%">
</div>

</div>

<p>
${progresso.toFixed(1)}%
concluído
</p>

</div>

`;

}).join("");

}

if(goalForm){

goalForm.addEventListener(
"submit",
e=>{

e.preventDefault();

const nome =
document.getElementById(
"goalName"
).value;

const alvo =
Number(
document.getElementById(
"goalTarget"
).value
);

const atual =
Number(
document.getElementById(
"goalCurrent"
).value
);

metas.push({

nome,
alvo,
atual

});

salvarMetas();

renderMetas();

goalForm.reset();

}
);

}

renderMetas();

/* ==========================================
   CALCULADORA RENTABILIDADE
========================================== */

const rentabilidadeBtn =
document.getElementById(
"calculateProfitability"
);

if(rentabilidadeBtn){

rentabilidadeBtn
.addEventListener(
"click",
()=>{

const custo =
Number(
document.getElementById(
"costPerHectare"
).value
);

const receita =
Number(
document.getElementById(
"revenuePerHectare"
).value
);

const lucro =
receita - custo;

const margem =
receita > 0
?
(lucro/receita)*100
:
0;

document.getElementById(
"profitabilityResult"
).innerHTML = `

<p>
Custo/ha:
<strong>
R$ ${custo.toFixed(2)}
</strong>
</p>

<p>
Receita/ha:
<strong>
R$ ${receita.toFixed(2)}
</strong>
</p>

<p>
Lucro/ha:
<strong>
R$ ${lucro.toFixed(2)}
</strong>
</p>

<p>
Margem:
<strong>
${margem.toFixed(1)}%
</strong>
</p>

`;

});
}

/* ==========================================
   SIMULADOR DE SAFRA
========================================== */

const harvestBtn =
document.getElementById(
"simulateHarvest"
);

if(harvestBtn){

harvestBtn.addEventListener(
"click",
()=>{

const area =
Number(
document.getElementById(
"harvestArea"
).value
);

const produtividade =
Number(
document.getElementById(
"harvestYield"
).value
);

const preco =
Number(
document.getElementById(
"harvestPrice"
).value
);

const receita =
area *
produtividade *
preco;

const custo =
receita * 0.45;

const lucro =
receita - custo;

document.getElementById(
"harvestResult"
).innerHTML = `

<p>
Receita Estimada:
<strong>
R$ ${receita.toLocaleString("pt-BR")}
</strong>
</p>

<p>
Custos Estimados:
<strong>
R$ ${custo.toLocaleString("pt-BR")}
</strong>
</p>

<p>
Lucro Projetado:
<strong>
R$ ${lucro.toLocaleString("pt-BR")}
</strong>
</p>

`;

});
}

/* ==========================================
   CALCULADORA AMBIENTAL
========================================== */

const environmentBtn =
document.getElementById(
"calculateEnvironment"
);

if(environmentBtn){

environmentBtn.addEventListener(
"click",
()=>{

const agua =
Number(
document.getElementById(
"waterSaving"
).value
);

const carbono =
Number(
document.getElementById(
"carbonReduction"
).value
);

const bioinsumos =
Number(
document.getElementById(
"bioInputUse"
).value
);

const solo =
Number(
document.getElementById(
"soilConservation"
).value
);

document.getElementById(
"environmentResult"
).innerHTML = `

<p>
Economia de Água:
<strong>${agua}%</strong>
</p>

<p>
Redução de Carbono:
<strong>${carbono}%</strong>
</p>

<p>
Uso de Bioinsumos:
<strong>${bioinsumos}%</strong>
</p>

<p>
Conservação do Solo:
<strong>${solo}%</strong>
</p>

`;

drawEnvironmentalChart(
agua,
carbono,
bioinsumos,
solo
);

updateESG(
agua,
carbono,
bioinsumos,
solo
);

});
}

/* ==========================================
   GRÁFICO AMBIENTAL
========================================== */

function drawEnvironmentalChart(
agua,
carbono,
bioinsumos,
solo
){

const canvas =
document.getElementById(
"environmentChart"
);

if(!canvas) return;

const ctx =
canvas.getContext("2d");

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

const valores =

[
agua,
carbono,
bioinsumos,
solo
];

const labels =

[
"Água",
"Carbono",
"Bioinsumos",
"Solo"
];

valores.forEach(
(valor,index)=>{

const x =
80 +
(index * 140);

const altura =
valor * 2;

ctx.fillStyle =
"#16a34a";

ctx.fillRect(

x,

320-altura,

80,

altura

);

ctx.fillStyle =
"#334155";

ctx.fillText(

labels[index],

x,

350

);

ctx.fillText(

valor+"%",

x,

300-altura

);

}
);

}

/* ==========================================
   RANKING ESG
========================================== */

function updateESG(

agua,
carbono,
bioinsumos,
solo

){

const score =

(
agua +
carbono +
bioinsumos +
solo
) / 4;

const waterEl =
document.getElementById(
"waterRank"
);

const carbonEl =
document.getElementById(
"carbonRank"
);

const bioEl =
document.getElementById(
"bioRank"
);

const soilEl =
document.getElementById(
"soilRank"
);

const totalEl =
document.getElementById(
"esgScore"
);

if(waterEl)
waterEl.textContent =
agua + "%";

if(carbonEl)
carbonEl.textContent =
carbono + "%";

if(bioEl)
bioEl.textContent =
bioinsumos + "%";

if(soilEl)
soilEl.textContent =
solo + "%";

if(totalEl)
totalEl.textContent =
score.toFixed(1) + "%";

}

/* ==========================================
   INDICADORES EM TEMPO REAL
========================================== */

const indicators =
document.querySelectorAll(
".live-indicator"
);

function randomIndicator(){

indicators.forEach(item=>{

let value =
parseInt(
item.textContent
);

value +=
Math.floor(
Math.random()*4
);

item.textContent =
value;

});

}

setInterval(
randomIndicator,
5000
);

/* ==========================================
   SALVAR ESG
========================================== */

function saveESGData(data){

localStorage.setItem(

"agroweiber_esg",

JSON.stringify(data)

);

}

const saveESGBtn =
document.getElementById(
"saveESG"
);

if(saveESGBtn){

saveESGBtn.addEventListener(
"click",
()=>{

const dados = {

agua:
document.getElementById(
"waterRank"
)?.textContent,

carbono:
document.getElementById(
"carbonRank"
)?.textContent,

bioinsumos:
document.getElementById(
"bioRank"
)?.textContent,

solo:
document.getElementById(
"soilRank"
)?.textContent,

score:
document.getElementById(
"esgScore"
)?.textContent

};

saveESGData(dados);

alert(
"Indicadores ESG salvos!"
);

});
}

/* ==========================================
   RESTAURAR ESG
========================================== */

const savedESG =
JSON.parse(
localStorage.getItem(
"agroweiber_esg"
)
);

if(savedESG){

document.getElementById(
"waterRank"
).textContent =
savedESG.agua;

document.getElementById(
"carbonRank"
).textContent =
savedESG.carbono;

document.getElementById(
"bioRank"
).textContent =
savedESG.bioinsumos;

document.getElementById(
"soilRank"
).textContent =
savedESG.solo;

document.getElementById(
"esgScore"
).textContent =
savedESG.score;

}

/* ==========================================
   AGROWEIBER FINALIZADO
========================================== */

console.log(
"%c AgroWeiber carregado com sucesso",
"color:#16a34a;font-size:18px;font-weight:bold;"
);
