/* ==========================================
   AGROWEIBER - SCRIPT.JS
   PARTE 1
   LOADING • MENU • DARK MODE
   SCROLL REVEAL • CONTADORES
   RANKING ESG • BOTÃO TOPO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarLoading();
    iniciarMenuMobile();
    iniciarDarkMode();
    iniciarScrollReveal();
    iniciarContadores();
    iniciarBotaoTopo();
    iniciarRanking();
    iniciarParallax();

});

/* ==========================================
   LOADING SCREEN
========================================== */

function iniciarLoading() {

    const loader = document.querySelector(".loading-screen");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

            setTimeout(() => {

                loader.remove();

            }, 800);

        }, 1200);

    });

}

/* ==========================================
   MENU MOBILE
========================================== */

function iniciarMenuMobile() {

    const menuBtn =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".nav-links");

    if (!menuBtn || !menu) return;

    menuBtn.addEventListener("click", () => {

        menu.classList.toggle("active");
        menuBtn.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("active");
                menuBtn.classList.remove("active");

            });

        });

}

/* ==========================================
   DARK MODE
========================================== */

function iniciarDarkMode() {

    const toggle =
        document.querySelector("#themeToggle");

    const body = document.body;

    const savedTheme =
        localStorage.getItem("agroweiber-theme");

    if (savedTheme === "light") {

        body.classList.add("light-mode");

    }

    if (!toggle) return;

    toggle.addEventListener("click", () => {

        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {

            localStorage.setItem(
                "agroweiber-theme",
                "light"
            );

        } else {

            localStorage.setItem(
                "agroweiber-theme",
                "dark"
            );

        }

    });

}

/* ==========================================
   SCROLL REVEAL
========================================== */

function iniciarScrollReveal() {

    const elementos =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        }, {
            threshold: 0.15
        });

    elementos.forEach(el => {

        observer.observe(el);

    });

}

/* ==========================================
   CONTADORES ANIMADOS
========================================== */

function iniciarContadores() {

    const numeros =
        document.querySelectorAll(".counter");

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const contador =
                    entry.target;

                const alvo =
                    parseInt(
                        contador.dataset.target
                    );

                let atual = 0;

                const incremento =
                    alvo / 100;

                const timer =
                    setInterval(() => {

                        atual += incremento;

                        if (atual >= alvo) {

                            contador.innerText =
                                alvo.toLocaleString();

                            clearInterval(timer);

                        } else {

                            contador.innerText =
                                Math.floor(atual)
                                    .toLocaleString();

                        }

                    }, 20);

                observer.unobserve(contador);

            });

        });

    numeros.forEach(numero => {

        observer.observe(numero);

    });

}

/* ==========================================
   BOTÃO VOLTAR AO TOPO
========================================== */

function iniciarBotaoTopo() {

    const botao =
        document.querySelector(".back-top");

    if (!botao) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            botao.classList.add("show");

        } else {

            botao.classList.remove("show");

        }

    });

    botao.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/* ==========================================
   RANKING ESG
========================================== */

function iniciarRanking() {

    const barras =
        document.querySelectorAll(".progress-fill");

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const barra =
                    entry.target;

                const valor =
                    barra.dataset.progress;

                barra.style.width =
                    valor + "%";

                observer.unobserve(barra);

            });

        }, {
            threshold: 0.2
        });

    barras.forEach(barra => {

        observer.observe(barra);

    });

}

/* ==========================================
   PARALLAX HERO
========================================== */

function iniciarParallax() {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    window.addEventListener("scroll", () => {

        const scroll =
            window.pageYOffset;

        hero.style.backgroundPositionY =
            scroll * 0.4 + "px";

    });

}

/* ==========================================
   SCROLL SUAVE LINKS
========================================== */

document.querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", function(e) {

            e.preventDefault();

            const destino =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (!destino) return;

            destino.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

/* ==========================================
   HEADER DINÂMICO
========================================== */

const header =
    document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/* ==========================================
   MICROANIMAÇÕES CARDS
========================================== */

const cards =
    document.querySelectorAll(
        ".card, .pilar-card, .bio-card, .news-card"
    );

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            (y - centerY) / 20;

        const rotateY =
            (centerX - x) / 20;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});

/* ==========================================
   INDICADOR DE LEITURA
========================================== */

const progressBar =
    document.querySelector(".reading-progress");

window.addEventListener("scroll", () => {

    if (!progressBar) return;

    const alturaPagina =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progresso =
        (window.scrollY / alturaPagina) * 100;

    progressBar.style.width =
        progresso + "%";

});

/* ==========================================
   DATA ATUAL
========================================== */

const dataAtual =
    document.querySelector("#currentYear");

if (dataAtual) {

    dataAtual.innerText =
        new Date().getFullYear();

            }
/* ==========================================
   AGROWEIBER - SCRIPT.JS
   PARTE 2
   QUIZ • CERTIFICADO • GLOSSÁRIO
   BIBLIOTECA • NOTÍCIAS • MAPA
========================================== */

/* ==========================================
   QUIZ EDUCATIVO
========================================== */

const respostasCorretas = {
    q1: "bioeconomia",
    q2: "bioinsumos",
    q3: "sustentabilidade",
    q4: "economiaCircular",
    q5: "carbono"
};

function corrigirQuiz() {

    let pontos = 0;

    Object.keys(respostasCorretas).forEach(pergunta => {

        const resposta =
            document.querySelector(
                `input[name="${pergunta}"]:checked`
            );

        if (
            resposta &&
            resposta.value === respostasCorretas[pergunta]
        ) {
            pontos++;
        }

    });

    const resultado =
        document.getElementById("quizResult");

    const score =
        document.getElementById("quizScore");

    if (resultado && score) {

        resultado.style.display = "block";

        score.innerText =
            `${pontos}/5`;

        resultado.scrollIntoView({
            behavior: "smooth"
        });

    }

    localStorage.setItem(
        "agroweiber_score",
        pontos
    );

}

/* ==========================================
   CERTIFICADO DIGITAL
========================================== */

function gerarCertificado() {

    const nome =
        document.getElementById("certificateName");

    if (!nome || nome.value.trim() === "") {

        alert("Digite seu nome.");

        return;
    }

    const pontuacao =
        localStorage.getItem(
            "agroweiber_score"
        ) || 0;

    const certificado =
        document.getElementById(
            "certificatePreview"
        );

    if (!certificado) return;

    certificado.innerHTML = `
        <h2>CERTIFICADO DIGITAL</h2>
        <br>
        <p>Certificamos que</p>
        <h1>${nome.value}</h1>
        <p>concluiu com sucesso o módulo:</p>
        <h3>Bioeconomia e Sustentabilidade</h3>
        <br>
        <p>Pontuação obtida: ${pontuacao}/5</p>
        <p>Plataforma AgroWeiber</p>
        <p>${new Date().toLocaleDateString()}</p>
    `;

}

/* ==========================================
   BUSCA GLOSSÁRIO
========================================== */

const glossarySearch =
    document.getElementById(
        "glossarySearch"
    );

if (glossarySearch) {

    glossarySearch.addEventListener(
        "keyup",
        () => {

            const termo =
                glossarySearch.value
                    .toLowerCase();

            document
                .querySelectorAll(
                    ".glossary-card"
                )
                .forEach(card => {

                    const texto =
                        card.innerText
                            .toLowerCase();

                    card.style.display =
                        texto.includes(termo)
                            ? "block"
                            : "none";

                });

        }
    );

}

/* ==========================================
   BUSCA BIBLIOTECA
========================================== */

const librarySearch =
    document.getElementById(
        "librarySearch"
    );

if (librarySearch) {

    librarySearch.addEventListener(
        "keyup",
        () => {

            const termo =
                librarySearch.value
                    .toLowerCase();

            document
                .querySelectorAll(
                    ".library-card"
                )
                .forEach(card => {

                    const texto =
                        card.innerText
                            .toLowerCase();

                    card.style.display =
                        texto.includes(termo)
                            ? "block"
                            : "none";

                });

        }
    );

}

/* ==========================================
   FILTRO DE NOTÍCIAS
========================================== */

const botoesNoticias =
    document.querySelectorAll(
        ".filter-btn"
    );

const noticias =
    document.querySelectorAll(
        ".news-card"
    );

botoesNoticias.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            botoesNoticias.forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );

            botao.classList.add(
                "active"
            );

            const categoria =
                botao.dataset.filter;

            noticias.forEach(noticia => {

                if (
                    categoria === "all"
                ) {

                    noticia.style.display =
                        "block";

                    return;
                }

                noticia.style.display =
                    noticia.dataset.category ===
                    categoria
                        ? "block"
                        : "none";

            });

        }
    );

});

/* ==========================================
   MAPA INTERATIVO
========================================== */

const regioes =
    document.querySelectorAll(
        ".map-region"
    );

const painelMapa =
    document.getElementById(
        "mapInfo"
    );

const dadosMapa = {

    norte: {
        titulo:
            "Região Norte",
        texto:
            "Projetos focados em bioeconomia amazônica, preservação florestal e biotecnologia."
    },

    nordeste: {
        titulo:
            "Região Nordeste",
        texto:
            "Energia renovável, agricultura resiliente e inovação climática."
    },

    centrooeste: {
        titulo:
            "Centro-Oeste",
        texto:
            "Agronegócio tecnológico, agricultura de precisão e bioinsumos."
    },

    sudeste: {
        titulo:
            "Sudeste",
        texto:
            "Pesquisa científica, startups AgTech e produção sustentável."
    },

    sul: {
        titulo:
            "Sul",
        texto:
            "Cooperativismo, agricultura regenerativa e inovação rural."
    }

};

regioes.forEach(regiao => {

    regiao.addEventListener(
        "click",
        () => {

            const chave =
                regiao.dataset.region;

            if (
                painelMapa &&
                dadosMapa[chave]
            ) {

                painelMapa.innerHTML = `
                <h2>${dadosMapa[chave].titulo}</h2>
                <p>${dadosMapa[chave].texto}</p>
                `;

            }

        }
    );

});

/* ==========================================
   ANIMAÇÃO DOS CARDS
========================================== */

const elementosAnimados =
    document.querySelectorAll(
        ".glossary-card, .library-card, .news-card"
    );

const observerCards =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );

elementosAnimados.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(40px)";

    card.style.transition =
        ".7s ease";

    observerCards.observe(card);

});

/* ==========================================
   CERTIFICADO PDF (SIMULADO)
========================================== */

function exportarCertificado() {

    alert(
        "Versão Premium: exportação PDF habilitada."
    );

}

/* ==========================================
   ESTATÍSTICAS QUIZ
========================================== */

function atualizarEstatisticasQuiz() {

    const score =
        localStorage.getItem(
            "agroweiber_score"
        );

    const campo =
        document.getElementById(
            "lastScore"
        );

    if (
        campo &&
        score !== null
    ) {

        campo.innerText =
            score + "/5";

    }

}

atualizarEstatisticasQuiz();

/* ==========================================
   TOOLTIP GLOSSÁRIO
========================================== */

document
.querySelectorAll(".glossary-card")
.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.borderColor =
                "#14b86e";

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.borderColor =
                "";

        }
    );

});

/* ==========================================
   DESTAQUE DE PESQUISA
========================================== */

function destacarPesquisa(
    campo,
    seletor
) {

    const termo =
        campo.value.toLowerCase();

    document
        .querySelectorAll(seletor)
        .forEach(item => {

            if (
                item.innerText
                    .toLowerCase()
                    .includes(termo)
            ) {

                item.style.boxShadow =
                    "0 0 25px rgba(20,184,110,.3)";

            } else {

                item.style.boxShadow =
                    "none";

            }

        });
  
/* ==========================================
   AGROWEIBER - SCRIPT.JS
   PARTE 3A
   SISTEMA PREMIUM
   LOGIN • CADASTRO
   RECEITAS • GASTOS
   LOCAL STORAGE
========================================== */

/* ==========================================
   BANCO LOCAL
========================================== */

let usuarios =
JSON.parse(
localStorage.getItem("agw_users")
) || [];

let receitas =
JSON.parse(
localStorage.getItem("agw_receitas")
) || [];

let gastos =
JSON.parse(
localStorage.getItem("agw_gastos")
) || [];

/* ==========================================
   CADASTRO
========================================== */

function cadastrarUsuario() {

const nome =
document.getElementById("cadNome")
?.value;

const email =
document.getElementById("cadEmail")
?.value;

const senha =
document.getElementById("cadSenha")
?.value;

if (
!nome ||
!email ||
!senha
) {

alert("Preencha todos os campos.");
return;

}

const existe =
usuarios.find(
u => u.email === email
);

if (existe) {

alert("Usuário já cadastrado.");
return;

}

usuarios.push({

nome,
email,
senha,
premium: false

});

localStorage.setItem(
"agw_users",
JSON.stringify(usuarios)
);

alert(
"Cadastro realizado com sucesso!"
);

}

/* ==========================================
   LOGIN
========================================== */

function loginUsuario() {

const email =
document.getElementById("loginEmail")
?.value;

const senha =
document.getElementById("loginSenha")
?.value;

const usuario =
usuarios.find(
u =>
u.email === email &&
u.senha === senha
);

if (!usuario) {

alert("Dados inválidos.");
return;

}

localStorage.setItem(
"agw_usuario_logado",
JSON.stringify(usuario)
);

alert(
"Login realizado com sucesso."
);

mostrarPainelPremium();

}

/* ==========================================
   LOGOUT
========================================== */

function logoutUsuario() {

localStorage.removeItem(
"agw_usuario_logado"
);

location.reload();

}

/* ==========================================
   RECUPERAÇÃO DE SENHA
========================================== */

function recuperarSenha() {

const email =
prompt(
"Digite seu e-mail:"
);

const usuario =
usuarios.find(
u => u.email === email
);

if (!usuario) {

alert(
"E-mail não encontrado."
);

return;

}

alert(
`Sua senha é: ${usuario.senha}`
);

}

/* ==========================================
   MOSTRAR PREMIUM
========================================== */

function mostrarPainelPremium() {

const usuario =
JSON.parse(
localStorage.getItem(
"agw_usuario_logado"
)
);

const area =
document.querySelector(
".premium-area"
);

if (!usuario || !area)
return;

area.style.display =
"block";

}

/* ==========================================
   ATIVAR PREMIUM
========================================== */

function ativarPremium() {

const usuario =
JSON.parse(
localStorage.getItem(
"agw_usuario_logado"
)
);

if (!usuario) {

alert(
"Faça login primeiro."
);

return;

}

usuario.premium = true;

localStorage.setItem(
"agw_usuario_logado",
JSON.stringify(usuario)
);

alert(
"Plano Premium ativado!"
);

}

/* ==========================================
   NOVA RECEITA
========================================== */

function adicionarReceita() {

const data =
document.getElementById(
"receitaData"
).value;

const categoria =
document.getElementById(
"receitaCategoria"
).value;

const descricao =
document.getElementById(
"receitaDescricao"
).value;

const valor =
parseFloat(
document.getElementById(
"receitaValor"
).value
);

if (
!data ||
!descricao ||
!valor
) {

alert(
"Preencha todos os campos."
);

return;

}

receitas.push({

data,
categoria,
descricao,
valor

});

localStorage.setItem(
"agw_receitas",
JSON.stringify(receitas)
);

renderizarReceitas();

}

/* ==========================================
   LISTA RECEITAS
========================================== */

function renderizarReceitas() {

const tabela =
document.getElementById(
"listaReceitas"
);

if (!tabela) return;

tabela.innerHTML = "";

receitas.forEach(
(item, index) => {

tabela.innerHTML += `
<tr>
<td>${item.data}</td>
<td>${item.categoria}</td>
<td>${item.descricao}</td>
<td>R$ ${item.valor.toFixed(2)}</td>
<td>
<button
onclick="removerReceita(${index})">
Excluir
</button>
</td>
</tr>
`;

}
);

}

/* ==========================================
   EXCLUIR RECEITA
========================================== */

function removerReceita(id) {

receitas.splice(id, 1);

localStorage.setItem(
"agw_receitas",
JSON.stringify(receitas)
);

renderizarReceitas();

}

/* ==========================================
   NOVO GASTO
========================================== */

function adicionarGasto() {

const data =
document.getElementById(
"gastoData"
).value;

const categoria =
document.getElementById(
"gastoCategoria"
).value;

const descricao =
document.getElementById(
"gastoDescricao"
).value;

const valor =
parseFloat(
document.getElementById(
"gastoValor"
).value
);

if (
!data ||
!descricao ||
!valor
) {

alert(
"Preencha todos os campos."
);

return;

}

gastos.push({

data,
categoria,
descricao,
valor

});

localStorage.setItem(
"agw_gastos",
JSON.stringify(gastos)
);

renderizarGastos();

}

/* ==========================================
   LISTAR GASTOS
========================================== */

function renderizarGastos() {

const tabela =
document.getElementById(
"listaGastos"
);

if (!tabela) return;

tabela.innerHTML = "";

gastos.forEach(
(item, index) => {

tabela.innerHTML += `
<tr>
<td>${item.data}</td>
<td>${item.categoria}</td>
<td>${item.descricao}</td>
<td>R$ ${item.valor.toFixed(2)}</td>
<td>
<button
onclick="removerGasto(${index})">
Excluir
</button>
</td>
</tr>
`;

}
);

}

/* ==========================================
   REMOVER GASTO
========================================== */

function removerGasto(id) {

gastos.splice(id, 1);

localStorage.setItem(
"agw_gastos",
JSON.stringify(gastos)
);

renderizarGastos();

}

/* ==========================================
   RESUMO FINANCEIRO
========================================== */

function atualizarResumoFinanceiro() {

const receitaTotal =
receitas.reduce(
(total, item) =>
total + item.valor,
0
);

const gastoTotal =
gastos.reduce(
(total, item) =>
total + item.valor,
0
);

const lucro =
receitaTotal -
gastoTotal;

const receitaEl =
document.getElementById(
"receitaTotal"
);

const gastoEl =
document.getElementById(
"gastoTotal"
);

const lucroEl =
document.getElementById(
"lucroTotal"
);

if (receitaEl)
receitaEl.innerText =
`R$ ${receitaTotal.toFixed(2)}`;

if (gastoEl)
gastoEl.innerText =
`R$ ${gastoTotal.toFixed(2)}`;

if (lucroEl)
lucroEl.innerText =
`R$ ${lucro.toFixed(2)}`;

}

/* ==========================================
   ATUALIZAÇÃO AUTOMÁTICA
========================================== */

setInterval(() => {

atualizarResumoFinanceiro();

}, 1000);

/* ==========================================
   INICIALIZAÇÃO
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

mostrarPainelPremium();
renderizarReceitas();
renderizarGastos();
atualizarResumoFinanceiro();

}
);

/* ==========================================
   CONTROLE PREMIUM VISUAL
========================================== */

function verificarPremium() {

const usuario =
JSON.parse(
localStorage.getItem(
"agw_usuario_logado"
)
);

const premium =
document.querySelectorAll(
".premium-only"
);

premium.forEach(item => {

if (
usuario &&
usuario.premium
) {

item.style.display =
"block";

} else {

item.style.display =
"none";

}

});

}

verificarPremium();
  
  }/* ==========================================
   AGROWEIBER - SCRIPT.JS
   PARTE 3B
   DASHBOARD FINANCEIRO
   METAS • RENTABILIDADE
   SIMULADOR • ESG
========================================== */

/* ==========================================
   DASHBOARD FINANCEIRO
========================================== */

function atualizarDashboard() {

    const receitas =
        JSON.parse(
            localStorage.getItem(
                "agw_receitas"
            )
        ) || [];

    const gastos =
        JSON.parse(
            localStorage.getItem(
                "agw_gastos"
            )
        ) || [];

    const totalReceitas =
        receitas.reduce(
            (t, r) => t + r.valor,
            0
        );

    const totalGastos =
        gastos.reduce(
            (t, g) => t + g.valor,
            0
        );

    const lucro =
        totalReceitas - totalGastos;

    atualizarCard(
        "dashReceita",
        totalReceitas
    );

    atualizarCard(
        "dashGasto",
        totalGastos
    );

    atualizarCard(
        "dashLucro",
        lucro
    );

    atualizarCard(
        "dashMargem",
        totalReceitas > 0
            ? ((lucro /
                totalReceitas) *
                100
              ).toFixed(1)
            : 0,
        "%"
    );

}

function atualizarCard(
    id,
    valor,
    sufixo = ""
) {

    const el =
        document.getElementById(id);

    if (!el) return;

    el.innerText =
        typeof valor === "number"
            ? valor.toLocaleString(
                  "pt-BR",
                  {
                      style:
                          sufixo === "%"
                              ? "decimal"
                              : "currency",
                      currency:
                          "BRL"
                  }
              ) + sufixo
            : valor;

}

/* ==========================================
   METAS FINANCEIRAS
========================================== */

let metas =
    JSON.parse(
        localStorage.getItem(
            "agw_metas"
        )
    ) || [];

function criarMeta() {

    const nome =
        document.getElementById(
            "metaNome"
        ).value;

    const valor =
        parseFloat(
            document.getElementById(
                "metaValor"
            ).value
        );

    if (!nome || !valor)
        return alert(
            "Preencha os campos."
        );

    metas.push({
        nome,
        valor,
        atual: 0
    });

    salvarMetas();
    renderizarMetas();

}

function adicionarValorMeta(
    indice,
    valor
) {

    metas[indice].atual += valor;

    salvarMetas();
    renderizarMetas();

}

function salvarMetas() {

    localStorage.setItem(
        "agw_metas",
        JSON.stringify(metas)
    );

}

function renderizarMetas() {

    const area =
        document.getElementById(
            "metasContainer"
        );

    if (!area) return;

    area.innerHTML = "";

    metas.forEach(
        (meta, index) => {

            const progresso =
                Math.min(
                    (
                        meta.atual /
                        meta.valor
                    ) * 100,
                    100
                );

            area.innerHTML += `
            <div class="goal-card">
                <h3>${meta.nome}</h3>

                <p>
                R$ ${meta.atual.toFixed(
                    2
                )} / 
                R$ ${meta.valor.toFixed(
                    2
                )}
                </p>

                <div class="goal-bar">
                    <div
                    class="goal-fill"
                    style="width:${progresso}%">
                    </div>
                </div>

                <button
                onclick="adicionarValorMeta(${index},1000)">
                + R$1000
                </button>
            </div>
            `;
        }
    );

}

/* ==========================================
   CALCULADORA RENTABILIDADE
========================================== */

function calcularRentabilidade() {

    const custo =
        parseFloat(
            document.getElementById(
                "custoHectare"
            ).value
        );

    const receita =
        parseFloat(
            document.getElementById(
                "receitaHectare"
            ).value
        );

    if (
        isNaN(custo) ||
        isNaN(receita)
    )
        return;

    const lucro =
        receita - custo;

    const margem =
        (
            (lucro / receita) *
            100
        ).toFixed(1);

    document.getElementById(
        "resultadoLucro"
    ).innerText =
        "R$ " +
        lucro.toFixed(2);

    document.getElementById(
        "resultadoMargem"
    ).innerText =
        margem + "%";

}

/* ==========================================
   SIMULADOR DE SAFRA
========================================== */

function simularSafra() {

    const area =
        parseFloat(
            document.getElementById(
                "safraArea"
            ).value
        );

    const produtividade =
        parseFloat(
            document.getElementById(
                "safraProdutividade"
            ).value
        );

    const preco =
        parseFloat(
            document.getElementById(
                "safraPreco"
            ).value
        );

    const custo =
        parseFloat(
            document.getElementById(
                "safraCusto"
            ).value
        );

    if (
        isNaN(area) ||
        isNaN(produtividade) ||
        isNaN(preco)
    )
        return;

    const producao =
        area *
        produtividade;

    const receita =
        producao * preco;

    const lucro =
        receita - custo;

    document.getElementById(
        "safraReceita"
    ).innerText =
        receita.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    document.getElementById(
        "safraLucro"
    ).innerText =
        lucro.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

}

/* ==========================================
   INDICADORES ESG
========================================== */

function atualizarESG() {

    const agua =
        Math.floor(
            Math.random() * 30 + 70
        );

    const carbono =
        Math.floor(
            Math.random() * 25 + 75
        );

    const solo =
        Math.floor(
            Math.random() * 20 + 80
        );

    const bioinsumos =
        Math.floor(
            Math.random() * 15 + 85
        );

    atualizarBarraESG(
        "aguaFill",
        agua
    );

    atualizarBarraESG(
        "carbonoFill",
        carbono
    );

    atualizarBarraESG(
        "soloFill",
        solo
    );

    atualizarBarraESG(
        "bioFill",
        bioinsumos
    );

}

function atualizarBarraESG(
    id,
    valor
) {

    const barra =
        document.getElementById(id);

    if (!barra) return;

    barra.style.width =
        valor + "%";

    barra.innerText =
        valor + "%";

}

/* ==========================================
   RANKING SUSTENTABILIDADE
========================================== */

function gerarRanking() {

    const ranking = [

        {
            nome:
                "Uso de Bioinsumos",
            valor: 95
        },

        {
            nome:
                "Economia de Água",
            valor: 91
        },

        {
            nome:
                "Conservação do Solo",
            valor: 88
        },

        {
            nome:
                "Redução de Carbono",
            valor: 84
        }

    ];

    const area =
        document.getElementById(
            "rankingContainer"
        );

    if (!area) return;

    area.innerHTML = "";

    ranking.forEach(item => {

        area.innerHTML += `
        <div class="ranking-item">

            <span>
            ${item.nome}
            </span>

            <strong>
            ${item.valor}%
            </strong>

        </div>
        `;
    });

}

/* ==========================================
   MINI GRÁFICO FINANCEIRO
========================================== */

function desenharGraficoFinanceiro() {

    const canvas =
        document.getElementById(
            "financeChart"
        );

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    const dados =
        [30, 80, 55, 120, 100, 160];

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.beginPath();

    dados.forEach(
        (valor, i) => {

            const x =
                i * 80 + 20;

            const y =
                220 - valor;

            if (i === 0)
                ctx.moveTo(x, y);

            else
                ctx.lineTo(x, y);

        }
    );

    ctx.lineWidth = 4;
    ctx.stroke();

}

/* ==========================================
   AUTO START
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarDashboard();

        renderizarMetas();

        atualizarESG();

        gerarRanking();

        desenharGraficoFinanceiro();

    }
);/* ==========================================
   AGROWEIBER - SCRIPT.JS
   PARTE 3C
   AGROIA • AGROIA FINANCEIRA
   RELATÓRIOS • PDF
   INSIGHTS • ANALYTICS
========================================== */

/* ==========================================
   AGROIA
========================================== */

const respostasAgroIA = {

"bioeconomia":
"A bioeconomia utiliza recursos biológicos renováveis para gerar alimentos, energia, materiais e inovação sustentável.",

"esg":
"ESG representa práticas ambientais, sociais e de governança adotadas pelas organizações.",

"bioinsumos":
"Bioinsumos são produtos biológicos que substituem ou complementam insumos químicos tradicionais.",

"carbono":
"A redução de carbono ajuda a combater as mudanças climáticas e aumenta a sustentabilidade da produção.",

"sustentabilidade":
"Sustentabilidade significa produzir hoje preservando os recursos para as próximas gerações.",

"agricultura regenerativa":
"Conjunto de práticas que recuperam o solo, aumentam a biodiversidade e fortalecem a produção agrícola."

};

function enviarMensagemAgroIA() {

const input =
document.getElementById("agroiaInput");

const chat =
document.getElementById("agroiaMessages");

if (!input || !chat) return;

const pergunta =
input.value.trim();

if (pergunta === "") return;

chat.innerHTML += `
<div class="user-message">
${pergunta}
</div>
`;

let resposta =
"Não encontrei uma resposta específica. Recomendo consultar a Biblioteca Científica AgroWeiber.";

const texto =
pergunta.toLowerCase();

for (const chave in respostasAgroIA) {

if (texto.includes(chave)) {

resposta =
respostasAgroIA[chave];

break;

}

}

setTimeout(() => {

chat.innerHTML += `
<div class="ai-message">
🤖 ${resposta}
</div>
`;

chat.scrollTop =
chat.scrollHeight;

}, 700);

input.value = "";

}

/* ==========================================
   AGROIA FINANCEIRA
========================================== */

function analisarFinanceiro() {

const receitas =
JSON.parse(
localStorage.getItem(
"agw_receitas"
)
) || [];

const gastos =
JSON.parse(
localStorage.getItem(
"agw_gastos"
)
) || [];

let totalReceitas = 0;
let totalGastos = 0;

receitas.forEach(item => {

totalReceitas += item.valor;

});

gastos.forEach(item => {

totalGastos += item.valor;

});

const lucro =
totalReceitas - totalGastos;

let diagnostico = "";

if (lucro <= 0) {

diagnostico =
"⚠️ Sua propriedade está operando sem lucro. Avalie custos operacionais e desperdícios.";

} else if (lucro < totalReceitas * 0.15) {

diagnostico =
"📊 Sua margem está baixa. Revise gastos com combustível, transporte e manutenção.";

} else {

diagnostico =
"✅ Sua propriedade apresenta boa saúde financeira e potencial de crescimento sustentável.";

}

const resultado =
document.getElementById(
"agroiaFinanceira"
);

if (resultado) {

resultado.innerHTML = `

<h3>Análise AgroIA Financeira</h3>

<p><strong>Receitas:</strong>
R$ ${totalReceitas.toFixed(2)}</p>

<p><strong>Gastos:</strong>
R$ ${totalGastos.toFixed(2)}</p>

<p><strong>Lucro:</strong>
R$ ${lucro.toFixed(2)}</p>

<p>${diagnostico}</p>

`;

}

}

/* ==========================================
   RELATÓRIOS INTELIGENTES
========================================== */

function gerarRelatorio() {

const receitas =
JSON.parse(
localStorage.getItem(
"agw_receitas"
)
) || [];

const gastos =
JSON.parse(
localStorage.getItem(
"agw_gastos"
)
) || [];

const totalReceitas =
receitas.reduce(
(a,b) => a + b.valor,
0
);

const totalGastos =
gastos.reduce(
(a,b) => a + b.valor,
0
);

const lucro =
totalReceitas - totalGastos;

const relatorio =
document.getElementById(
"relatorioResultado"
);

if (!relatorio) return;

relatorio.innerHTML = `

<h2>Relatório Inteligente</h2>

<p>
Receita Total:
<strong>
R$ ${totalReceitas.toFixed(2)}
</strong>
</p>

<p>
Gastos Totais:
<strong>
R$ ${totalGastos.toFixed(2)}
</strong>
</p>

<p>
Lucro Líquido:
<strong>
R$ ${lucro.toFixed(2)}
</strong>
</p>

<p>
Eficiência Financeira:
<strong>
${((lucro/Math.max(totalReceitas,1))*100).toFixed(1)}%
</strong>
</p>

`;

}

/* ==========================================
   EXPORTAÇÃO PDF
========================================== */

function exportarPDF() {

const conteudo =
document.getElementById(
"relatorioResultado"
);

if (!conteudo) return;

const janela =
window.open(
"",
"_blank"
);

janela.document.write(`
<html>
<head>
<title>Relatório AgroWeiber</title>
</head>
<body>
${conteudo.innerHTML}
</body>
</html>
`);

janela.print();

}

/* ==========================================
   INSIGHTS AUTOMÁTICOS
========================================== */

function gerarInsights() {

const area =
document.getElementById(
"insightsContainer"
);

if (!area) return;

const insights = [

"🌱 O uso de bioinsumos pode reduzir custos operacionais.",

"💧 Sistemas de irrigação inteligente aumentam a eficiência hídrica.",

"📈 A bioeconomia apresenta forte crescimento global.",

"♻️ Economia circular gera novas fontes de receita.",

"🚜 Agricultura de precisão reduz desperdícios."

];

area.innerHTML = "";

insights.forEach(item => {

area.innerHTML += `
<div class="insight-card">
${item}
</div>
`;

});

}

/* ==========================================
   ANALYTICS ESG
========================================== */

function atualizarAnalytics() {

const agua =
Math.floor(
Math.random()*20+80
);

const carbono =
Math.floor(
Math.random()*20+75
);

const solo =
Math.floor(
Math.random()*15+85
);

const biodiversidade =
Math.floor(
Math.random()*10+90
);

const painel =
document.getElementById(
"analyticsESG"
);

if (!painel) return;

painel.innerHTML = `

<div class="analytics-item">
💧 Água: ${agua}%
</div>

<div class="analytics-item">
🌎 Carbono: ${carbono}%
</div>

<div class="analytics-item">
🌱 Solo: ${solo}%
</div>

<div class="analytics-item">
🦋 Biodiversidade: ${biodiversidade}%
</div>

`;

}

/* ==========================================
   RECOMENDAÇÕES SUSTENTÁVEIS
========================================== */

function gerarRecomendacoes() {

const area =
document.getElementById(
"recomendacoes"
);

if (!area) return;

const lista = [

"Adotar bioinsumos certificados.",

"Expandir práticas de agricultura regenerativa.",

"Investir em energia solar rural.",

"Implementar monitoramento climático.",

"Reduzir uso de defensivos químicos."

];

area.innerHTML = "";

lista.forEach(item => {

area.innerHTML += `
<li>${item}</li>
`;

});

}

/* ==========================================
   MONITOR DE MERCADO
========================================== */

function atualizarMercado() {

const area =
document.getElementById(
"mercadoWidget"
);

if (!area) return;

area.innerHTML = `

<div>
🌽 Soja:
R$ ${(120 + Math.random()*20).toFixed(2)}
</div>

<div>
🌾 Milho:
R$ ${(65 + Math.random()*10).toFixed(2)}
</div>

<div>
☕ Café:
R$ ${(780 + Math.random()*50).toFixed(2)}
</div>

<div>
🥛 Leite:
R$ ${(2 + Math.random()).toFixed(2)}
</div>

`;

}

/* ==========================================
   EVENTOS
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

gerarInsights();

atualizarAnalytics();

gerarRecomendacoes();

atualizarMercado();

setInterval(
atualizarMercado,
10000
);

}
);

/* ==========================================
   ENTER NO CHAT AGROIA
========================================== */

const campoAgroIA =
document.getElementById(
"agroiaInput"
);

if (campoAgroIA) {

campoAgroIA.addEventListener(
"keypress",
e => {

if (e.key === "Enter") {

enviarMensagemAgroIA();

}

}
);

}

/* ==========================================
   FIM AGROWEIBER
========================================== */
