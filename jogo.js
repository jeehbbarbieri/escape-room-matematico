const botaoIniciar = document.getElementById("btnIniciar");
const telaInicial = document.getElementById("telaInicial");
const telaJogo = document.getElementById("telaJogo");

const tituloDesafio = document.getElementById("tituloDesafio");
const perguntaDesafio = document.getElementById("perguntaDesafio");
const respostaDesafio = document.getElementById("respostaDesafio");
const botaoResponderDesafio = document.getElementById("btnResponderDesafio");
const mensagemDesafio = document.getElementById("mensagemDesafio");
const botaoProximo = document.getElementById("btnProximo");
const botaoDica = document.getElementById("btnDica");
const dicaDesafio = document.getElementById("dicaDesafio");
const progresso = document.getElementById("progresso");
const botaoEditar = document.getElementById("btnEditar");
const telaEditor = document.getElementById("telaEditor");
const botaoVoltar = document.getElementById("btnVoltar");
const campoTitulo = document.getElementById("campoTitulo");
const botaoSalvarTitulo = document.getElementById("btnSalvarTitulo");
const mensagemEditor = document.getElementById("mensagemEditor");
const tituloJogo = document.getElementById("tituloJogo");
const seletorDesafio = document.getElementById("seletorDesafio");
const campoTituloDesafio = document.getElementById("campoTituloDesafio");
const campoPerguntaDesafio = document.getElementById("campoPerguntaDesafio");
const campoRespostaDesafio = document.getElementById("campoRespostaDesafio");
const campoDicaDesafio = document.getElementById("campoDicaDesafio");
const botaoSalvarDesafio = document.getElementById("btnSalvarDesafio");
const mensagemDesafioEditor = document.getElementById("mensagemDesafioEditor");
const botaoNovoDesafio = document.getElementById("btnNovoDesafio");
const botaoExcluirDesafio = document.getElementById("btnExcluirDesafio");
const cronometro = document.getElementById("cronometro");
const telaFinal = document.getElementById("telaFinal");
const tempoFinal = document.getElementById("tempoFinal");
const botaoJogarNovamente = document.getElementById("btnJogarNovamente");
const jogoSalvo = localStorage.getItem("escapeRoomJogo");
const botaoOuvirDesafio = document.getElementById("btnOuvirDesafio");
const somAmbiente = document.getElementById("somAmbiente");
const botaoExportarJogo = document.getElementById("btnExportarJogo");
const botaoImportarJogo = document.getElementById("btnImportarJogo");
const arquivoImportarJogo = document.getElementById("arquivoImportarJogo");
const botaoBancoSalas = document.getElementById("btnBancoSalas");
const telaBancoSalas = document.getElementById("telaBancoSalas");
const botaoVoltarBanco = document.getElementById("btnVoltarBanco");
const botoesAnoBanco = document.querySelectorAll(".btnAnoBanco");
const telaConteudosBanco = document.getElementById("telaConteudosBanco");
const tituloAnoBanco = document.getElementById("tituloAnoBanco");
const listaConteudosBanco = document.getElementById("listaConteudosBanco");
const botaoVoltarAnos = document.getElementById("btnVoltarAnos");
const botaoAtivarLeitura = document.getElementById("btnAtivarLeitura");

let leituraAtivada = false;

if (jogoSalvo) {
    const dadosSalvos = JSON.parse(jogoSalvo);

    jogo.titulo = dadosSalvos.titulo;
    jogo.desafios = dadosSalvos.desafios;
}

let desafioAtual = 0;

let jogandoSalaBanco = false;
let jogoAntesDoBanco = null;let segundos = 0;
let intervaloCronometro;

function carregarListaDesafios() {

    seletorDesafio.innerHTML = "";

    jogo.desafios.forEach(function (desafio, indice) {

        const opcao = document.createElement("option");

        opcao.value = indice;
        opcao.textContent = desafio.titulo;

        seletorDesafio.appendChild(opcao);
    });

    carregarCamposDesafio();
}


function carregarCamposDesafio() {

    const indice = seletorDesafio.value;
    const desafio = jogo.desafios[indice];

    campoTituloDesafio.value = desafio.titulo;
    campoPerguntaDesafio.value = desafio.pergunta;
    campoRespostaDesafio.value = desafio.resposta;
    campoDicaDesafio.value = desafio.dica;
}
function iniciarCronometro() {

    clearInterval(intervaloCronometro);

    segundos = 0;

    intervaloCronometro = setInterval(function () {
        segundos++;

        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;

        const minutosFormatados = String(minutos).padStart(2, "0");
        const segundosFormatados = String(segundosRestantes).padStart(2, "0");

        cronometro.textContent =
            "⏱️ Tempo: " + minutosFormatados + ":" + segundosFormatados;

    }, 1000);
}
seletorDesafio.addEventListener("change", carregarCamposDesafio);

function carregarDesafio() {
    const desafio = jogo.desafios[desafioAtual];
progresso.textContent =
    "Desafio " + (desafioAtual + 1) + " de " + jogo.desafios.length;
    dicaDesafio.textContent = "";
    dicaDesafio.style.display = "none";

    tituloDesafio.textContent = desafio.titulo;
    perguntaDesafio.textContent = desafio.pergunta;

    respostaDesafio.value = "";
    mensagemDesafio.textContent = "";
    botaoProximo.style.display = "none";
}

botaoOuvirDesafio.addEventListener("click", function () {

    const desafio = jogo.desafios[desafioAtual];

const perguntaFalavel = desafio.pergunta
    .replace(/\s*[xX×]\s*/g, " vezes ")
    .replaceAll("÷", " dividido por ")
    .replaceAll("+", " mais ")
    .replaceAll("-", " menos ")
    .replaceAll("=", " igual a ");

const textoParaLer =
    desafio.titulo + ". " +
    perguntaFalavel;

    const fala = new SpeechSynthesisUtterance(textoParaLer);

    fala.lang = "pt-BR";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);

});

botaoIniciar.addEventListener("click", function () {

    somAmbiente.volume = 0.12;

somAmbiente.play().catch(function (erro) {
    console.log("Não foi possível iniciar o som ambiente.", erro);
});


    telaInicial.style.display = "none";
    telaJogo.style.display = "block";

    carregarDesafio();
    iniciarCronometro();
});

botaoNovoDesafio.addEventListener("click", function () {

    const novoDesafio = {
        titulo: "Nova sala",
        pergunta: "Digite a pergunta",
        resposta: "",
        dica: ""
    };

    jogo.desafios.push(novoDesafio);

    localStorage.setItem("escapeRoomJogo", JSON.stringify(jogo));

    carregarListaDesafios();

    seletorDesafio.value = jogo.desafios.length - 1;

    carregarCamposDesafio();
});
botaoExcluirDesafio.addEventListener("click", function () {

    if (jogo.desafios.length <= 1) {
        alert("O jogo precisa ter pelo menos um desafio.");
        return;
    }

    const indice = seletorDesafio.value;

    jogo.desafios.splice(indice, 1);

    localStorage.setItem("escapeRoomJogo", JSON.stringify(jogo));

    carregarListaDesafios();

    mensagemDesafioEditor.textContent = "Desafio excluído com sucesso! 🗑️";
});

botaoSalvarDesafio.addEventListener("click", function () {

    const indice = seletorDesafio.value;

    jogo.desafios[indice].titulo = campoTituloDesafio.value;
    jogo.desafios[indice].pergunta = campoPerguntaDesafio.value;
    jogo.desafios[indice].resposta = campoRespostaDesafio.value;
    jogo.desafios[indice].dica = campoDicaDesafio.value;

localStorage.setItem("escapeRoomJogo", JSON.stringify(jogo));

    mensagemDesafioEditor.textContent = "Desafio salvo com sucesso! ✅";

    carregarListaDesafios();
});

botaoEditar.addEventListener("click", function () {
    telaInicial.style.display = "none";
    telaEditor.style.display = "block";
campoTitulo.value = jogo.titulo;
carregarListaDesafios();
});

botaoVoltar.addEventListener("click", function () {
    telaEditor.style.display = "none";
    telaInicial.style.display = "block";
campoTitulo.value = jogo.titulo;
});

botaoDica.addEventListener("click", function () {

    const desafio = jogo.desafios[desafioAtual];

    dicaDesafio.textContent = "💡 Dica: " + desafio.dica;
    dicaDesafio.style.display = "block";

    const falaDica = new SpeechSynthesisUtterance(
        "Dica. " + desafio.dica
    );

    falaDica.lang = "pt-BR";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(falaDica);

});
botaoIniciar.addEventListener("click", function () {
    telaInicial.style.display = "none";
    telaJogo.style.display = "block";

    carregarDesafio();
iniciarCronometro();
});

botaoSalvarTitulo.addEventListener("click", function () {
    jogo.titulo = campoTitulo.value;

tituloJogo.textContent = jogo.titulo;

    mensagemEditor.textContent = "Título alterado com sucesso! ✅";
});

function somAcessoNegado() {

    const contextoAudio = new AudioContext();
    const oscilador = contextoAudio.createOscillator();
    const volume = contextoAudio.createGain();

    oscilador.connect(volume);
    volume.connect(contextoAudio.destination);

    oscilador.frequency.value = 180;
    oscilador.type = "square";

    volume.gain.setValueAtTime(0.15, contextoAudio.currentTime);
    volume.gain.exponentialRampToValueAtTime(
        0.01,
        contextoAudio.currentTime + 0.3
    );

    oscilador.start();
    oscilador.stop(contextoAudio.currentTime + 0.3);
}

function somVitoria() {

    const contextoAudio = new AudioContext();

    function tocarNota(frequencia, inicio, duracao) {

        const oscilador = contextoAudio.createOscillator();
        const volume = contextoAudio.createGain();

        oscilador.connect(volume);
        volume.connect(contextoAudio.destination);

        oscilador.type = "sine";
        oscilador.frequency.value = frequencia;

        volume.gain.setValueAtTime(
            0.15,
            contextoAudio.currentTime + inicio
        );

        volume.gain.exponentialRampToValueAtTime(
            0.01,
            contextoAudio.currentTime + inicio + duracao
        );

        oscilador.start(contextoAudio.currentTime + inicio);
        oscilador.stop(contextoAudio.currentTime + inicio + duracao);
    }

    tocarNota(523, 0, 0.18);
    tocarNota(659, 0.20, 0.18);
    tocarNota(784, 0.40, 0.18);
    tocarNota(1046, 0.60, 0.50);
}

botaoResponderDesafio.addEventListener("click", function () {
    const desafio = jogo.desafios[desafioAtual];

    window.speechSynthesis.cancel();

if (respostaDesafio.value.trim() === desafio.resposta.trim()) {
        mensagemDesafio.textContent = "🔓 ACESSO LIBERADO";
        mensagemDesafio.className = "mensagem-correta";

        botaoProximo.style.display = "inline-block";
somAcessoLiberado();

        const falaCorreta = new SpeechSynthesisUtterance(
            "Acesso liberado. Você pode avançar."
        );

        falaCorreta.lang = "pt-BR";
setTimeout(function () {
    window.speechSynthesis.speak(falaCorreta);
}, 500);
    } else {

        mensagemDesafio.textContent =
            "⚠️ ACESSO NEGADO — TENTE NOVAMENTE";

        mensagemDesafio.className = "mensagem-incorreta";
somAcessoNegado();

        const falaIncorreta = new SpeechSynthesisUtterance(
            "Acesso negado. Tente novamente."
        );

        falaIncorreta.lang = "pt-BR";
setTimeout(function () {
    window.speechSynthesis.speak(falaIncorreta);
}, 500);
    }
});
function somAcessoLiberado() {

    const contextoAudio = new AudioContext();

    function tocarTom(frequencia, inicio) {
        const oscilador = contextoAudio.createOscillator();
        const volume = contextoAudio.createGain();

        oscilador.connect(volume);
        volume.connect(contextoAudio.destination);

        oscilador.frequency.value = frequencia;
        oscilador.type = "sine";

        volume.gain.setValueAtTime(
            0.12,
            contextoAudio.currentTime + inicio
        );

        volume.gain.exponentialRampToValueAtTime(
            0.01,
            contextoAudio.currentTime + inicio + 0.18
        );

        oscilador.start(contextoAudio.currentTime + inicio);
        oscilador.stop(contextoAudio.currentTime + inicio + 0.18);
    }

    tocarTom(500, 0);
    tocarTom(750, 0.20);
}

botaoProximo.addEventListener("click", function () {

    if (desafioAtual < jogo.desafios.length - 1) {

        desafioAtual++;
        carregarDesafio();

    } else {

        clearInterval(intervaloCronometro);

        telaJogo.style.display = "none";
        telaFinal.style.display = "block";

        tempoFinal.textContent =
            "⏱️ Seu tempo foi: " +
            cronometro.textContent.replace("⏱️ Tempo: ", "");

        try {
            somVitoria();
        } catch (erro) {
            console.log("Som de vitória não pôde ser reproduzido.");
        }

        setTimeout(function () {

            const falaFinal = new SpeechSynthesisUtterance(
                "Parabéns! Você conseguiu escapar! " +
                "Seu tempo foi " +
                cronometro.textContent
                    .replace("⏱️ Tempo: ", "")
                    .replace(":", " minutos e ") +
                " segundos."
            );

            falaFinal.lang = "pt-BR";

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(falaFinal);

        }, 1400);
    }

});
botaoJogarNovamente.addEventListener("click", function () {

    desafioAtual = 0;
    segundos = 0;

    telaFinal.style.display = "none";
    telaJogo.style.display = "none";

    cronometro.textContent = "⏱️ Tempo: 00:00";

    if (jogandoSalaBanco) {

        // Volta para o Banco de Salas
        telaBancoSalas.style.display = "block";
        telaInicial.style.display = "none";

        // Restaura o jogo personalizado
        if (jogoAntesDoBanco) {

            jogo.titulo = jogoAntesDoBanco.titulo;

            jogo.desafios = jogoAntesDoBanco.desafios.map(function (desafio) {
                return { ...desafio };
            });

            tituloJogo.textContent = jogo.titulo;

            jogoAntesDoBanco = null;
        }

        jogandoSalaBanco = false;

    } else {

        // Veio do jogo personalizado
        telaInicial.style.display = "block";

    }

});respostaDesafio.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        if (botaoProximo.style.display !== "none") {
            botaoProximo.click();
        } else {
            botaoResponderDesafio.click();
        }

    }

});
botaoBancoSalas.addEventListener("click", function () {

    telaInicial.style.display = "none";
    telaBancoSalas.style.display = "block";

});
botaoVoltarBanco.addEventListener("click", function () {

    telaBancoSalas.style.display = "none";
    telaInicial.style.display = "block";

});

botoesAnoBanco.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const anoEscolhido = botao.dataset.ano;
        const dadosAno = bancoDesafios[anoEscolhido];

        tituloAnoBanco.textContent = dadosAno.titulo;

        listaConteudosBanco.innerHTML = "";

        Object.keys(dadosAno.conteudos).forEach(function (chaveConteudo) {

            const conteudo = dadosAno.conteudos[chaveConteudo];

            const botaoConteudo = document.createElement("button");

            botaoConteudo.textContent = "🔐 " + conteudo.titulo;
            botaoConteudo.className = "btnConteudoBanco";
botaoConteudo.addEventListener("mouseenter", function () {

    if (!leituraAtivada) {
        return;
    }

    window.speechSynthesis.cancel();

    const fala =
        new SpeechSynthesisUtterance(conteudo.titulo);

    fala.lang = "pt-BR";

    window.speechSynthesis.speak(fala);

});

            botaoConteudo.dataset.ano = anoEscolhido;
            botaoConteudo.dataset.conteudo = chaveConteudo;

            listaConteudosBanco.appendChild(botaoConteudo);

        });

        telaBancoSalas.style.display = "none";
        telaConteudosBanco.style.display = "block";

    });

});
botaoVoltarAnos.addEventListener("click", function () {

    telaConteudosBanco.style.display = "none";
    telaBancoSalas.style.display = "block";

});

listaConteudosBanco.addEventListener("click", function (event) {

    const botao = event.target.closest(".btnConteudoBanco");

    if (!botao) {
        return;
    }

    const anoEscolhido = botao.dataset.ano;
    const conteudoEscolhido = botao.dataset.conteudo;

    const sala =
        bancoDesafios[anoEscolhido]
        .conteudos[conteudoEscolhido];
    jogoAntesDoBanco = {
        titulo: jogo.titulo,
        desafios: jogo.desafios.map(function (desafio) {
            return { ...desafio };
        })
    };

    jogandoSalaBanco = true;

    // Carrega os desafios da sala escolhida
    jogo.titulo = sala.titulo;

jogo.desafios = sala.desafios.map(function (desafio) {
    return { ...desafio };
});

    // Começa sempre pelo primeiro desafio
    desafioAtual = 0;

    // Atualiza o título
    tituloJogo.textContent = sala.titulo;

    // Sai do banco e abre o jogo
    telaConteudosBanco.style.display = "none";
    telaJogo.style.display = "block";

    carregarDesafio();
    iniciarCronometro();

});
const todosOsBotoes = document.querySelectorAll("button");

todosOsBotoes.forEach(function (botao) {

    function lerBotao() {

        if (!leituraAtivada) {
            return;
        }

        const textoBotao =
    botao.dataset.fala ||
    botao.textContent
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
        .replace(/\uFE0F/g, "")
        .trim();

        window.speechSynthesis.cancel();

        const falaBotao =
            new SpeechSynthesisUtterance(textoBotao);

        falaBotao.lang = "pt-BR";

        window.speechSynthesis.speak(falaBotao);
    }

    botao.addEventListener("mouseenter", lerBotao);
    botao.addEventListener("focus", lerBotao);

});
botaoAtivarLeitura.addEventListener("click", function () {

    leituraAtivada = true;

    window.speechSynthesis.cancel();

    const falaAtivacao =
        new SpeechSynthesisUtterance("Leitura dos botões ativada.");

    falaAtivacao.lang = "pt-BR";

    window.speechSynthesis.speak(falaAtivacao);

    botaoAtivarLeitura.textContent = "✓ Leitura ativada";
    botaoAtivarLeitura.dataset.fala = "Leitura ativada";

});
botaoExportarJogo.addEventListener("click", function () {

    const dadosDoJogo = JSON.stringify(jogo, null, 2);

    const arquivo = new Blob(
        [dadosDoJogo],
        { type: "application/json" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivo);
    link.download = "escape-room-matematico.json";

    link.click();

    URL.revokeObjectURL(link.href);
});

botaoImportarJogo.addEventListener("click", function () {
    arquivoImportarJogo.click();
});

arquivoImportarJogo.addEventListener("change", function () {

    const arquivo = arquivoImportarJogo.files[0];

    if (!arquivo) {
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (evento) {

        try {

            const dadosImportados = JSON.parse(evento.target.result);

            if (
                !dadosImportados.titulo ||
                !Array.isArray(dadosImportados.desafios)
            ) {
                alert("Arquivo de jogo inválido.");
                return;
            }

            jogo.titulo = dadosImportados.titulo;
            jogo.desafios = dadosImportados.desafios;

            localStorage.setItem(
                "escapeRoomJogo",
                JSON.stringify(jogo)
            );

            tituloJogo.textContent = jogo.titulo;
            campoTitulo.value = jogo.titulo;

            carregarListaDesafios();

            alert("Jogo importado com sucesso! 📂");

        } catch (erro) {

            alert("Não foi possível importar este arquivo.");

        }
    };

    leitor.readAsText(arquivo);
});

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("./service-worker.js")
            .then(function () {
                console.log("Modo offline ativado com sucesso!");
            })
            .catch(function (erro) {
                console.log("Erro ao ativar modo offline:", erro);
            });

    });

}