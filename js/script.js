const usuarioLogado = document.querySelector("#usuarioLogado");
const login = document.querySelector("#login");
const registro = document.querySelector("#registro");
const adicionar = document.querySelector("#adicionar");
const sessionDestroy = document.querySelector("#sessionDestroy");
const formLogin = document.getElementById("formLogin");
const formRegistro = document.getElementById("form");
const sectionAdicionar = document.querySelector("#sectionAdicionar");
const info = document.querySelector("#informar");
let webSocket = new WebSocket("ws://localhost:8080");

const opacity = (element) => {
    const tela = document.querySelector("#tela");
    element.classList.toggle("opacity");
    tela.classList.toggle("opacity");
    document.querySelector("body").classList.toggle("over");
};

const remove = (element) => {
    if (element) {
        const remove = element.querySelector('#remove');
        remove.addEventListener("click", () => {
            opacity(element);
        });
    }
};

function caixa() {
    info.classList.toggle("inform");
}

if (adicionar) {
    adicionar.addEventListener("click", function () {
        opacity(sectionAdicionar);
    });
}
if (login) {
    login.addEventListener("click", function () {
        opacity(formLogin);
    });
}

if (sessionDestroy) {
    sessionDestroy.addEventListener("click", () => {
        window.location.href = 'db/api/sessionDestroy.php';
    });
}

if (registro) {
    registro.addEventListener("click", () => {
        opacity(formRegistro);
    });
}

const createMessageSelfElement = (content) => {
    const label = document.createElement("label");
    label.innerHTML = content;
    label.classList = "mensagem direita";
    return label;
};

const createMessageOtherElement = (content) => {
    const label = document.createElement("label");
    label.innerHTML = content;
    label.classList = "mensagem esquerda";
    return label;
};

// Configura o listener de mensagens logo após abrir a conexão WebSocket
webSocket.onmessage = function (event) {
    const { remetente, content } = JSON.parse(event.data);
    const messageSelf = createMessageSelfElement(content);
    const messageOther = createMessageOtherElement(content);

    const id_remetente = usuarioLogado.getAttribute("data-id");
    const sectionMain = document.querySelector("#sectionMain");

    if (remetente == id_remetente) {
        sectionMain.appendChild(messageSelf);
    } else {
        sectionMain.appendChild(messageOther);
    }
};

remove(formRegistro);
remove(formLogin);
remove(sectionAdicionar);

// Login form submission
formLogin.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault();
    const usuario = formLogin.querySelector("#nome").value;
    const senha = formLogin.querySelector("#senha").value;
    axios.post("db/api/login.php", {
        usuario: usuario,
        senha: senha
    }).then((response) => {
        const data = response.data;
        if (data.login) {
            axios.post("db/api/session.php", {
                usuario: usuario
            }).then((response) => {
                const data = response.data;
                console.log(data.mensagem);
                window.location.href = '';
            });
        } else {
            caixa();
            formLogin.querySelector("#nome").value = "";
            formLogin.querySelector("#senha").value = "";
            info.querySelector("#info p").innerHTML = data.mensagem;
            setTimeout(caixa, 5000);
        }
    });
});

// Registro form submission
formRegistro.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault();
    const usuario = formRegistro.querySelector("#nome").value;
    const senha = formRegistro.querySelector("#senha").value;
    axios.post("db/api/registro.php", {
        usuario: usuario,
        senha: senha
    }).then((response) => {
        const data = response.data;
        if (data.registro) {
            caixa();
            info.querySelector("#info p").innerHTML = data.mensagem;
            setTimeout(caixa, 5000);
            console.log(data.mensagem);
            opacity(formRegistro);
        } else {
            console.log(response);
            caixa();
            info.querySelector("#info p").innerHTML = data.mensagem;
            setTimeout(caixa, 5000);
        }
    });
});

// Process messages for each user chat session
const mensagemArray = document.querySelectorAll("#mensagensBack");

mensagemArray.forEach(mensagens => {
    const span = mensagens.querySelector("span");
    const section = mensagens.querySelector("#mensagensSection");
    const sectionMain = section.querySelector("#sectionMain");
    const id_remetente = usuarioLogado.getAttribute("data-id");

    const enviarMensagem = (input, id_remetente, id_destinatario) => {
        const mensagemDoUsuario = input.value;
        const message = {
            "remetente": id_remetente,
            "content": mensagemDoUsuario
        };

        // Verifica se o WebSocket está aberto antes de enviar
        if (webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify(message));
        } else {
            console.error("WebSocket não está aberto.");
        }

        // Envia mensagem via AJAX para o banco de dados
        axios.post("db/api/mensagem.php", {
            mensagemDoUsuario: mensagemDoUsuario,
            id_remetente: id_remetente,
            id_destinatario: id_destinatario
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error("Erro ao enviar a mensagem: ", error);
        });
        input.value = ""
    };

    remove(section);

    if (span) {
        span.addEventListener("click", () => {
            opacity(section);
        });
    }

    if (section) {
        section.querySelector("button").addEventListener("click", function (event) {
            event.preventDefault();
            const input = section.querySelector("#mensagemDoUsuario");
            const id_destinatario = section.getAttribute("data-id");
            enviarMensagem(input, id_remetente, id_destinatario);
        });
    }
});

// Adicionar usuário como amigo
const adicionarUsuario = document.querySelectorAll('#adicionarUsuario');
adicionarUsuario.forEach(element => {
    element.addEventListener("click", () => {
        const id_usuarioFriend = element.getAttribute("data-id");
        const id_usuario = usuarioLogado.getAttribute("data-id");
        axios.post("db/api/adicionar.php", {
            id_usuario: id_usuario,
            id_usuarioFriend: id_usuarioFriend
        }).then((response) => {
            const data = response.data;
            if (data.adicionado) {
                console.log(data.mensagem);
                const span = element.parentNode;
                span.style.display = "none";
            }
        });
    });
});
