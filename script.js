let message;
let nameUser;
let checkMarkId = 0;
let destino = "Todos"

function atualizarStatus() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: nameUser
    })
        .then(response => {
            console.log("logado")
        })
        .catch(error => {
            console.log("já está logado")
        })
}

function atualizarMsg() {
    let msg = document.querySelector(".conversa");
    msg.innerHTML = "";
    msgChegou()
}

//Renderizar os do servidor da API
function msgChegou(resposta) {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages").then(
        resposta => {
            message = resposta.data;
            //Chamando as funções de renderização
            renderizarMsg();
        }
    )
}

//Iniciar login
function login() {
    const nameUserLogin = document.getElementsByClassName("loginName")[0].value
    nameUser = nameUserLogin
    msgChegou();
    renderizarParticipantes();
    const particpant = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: nameUserLogin })
    return particpant
}

function loginOk() {
    login().then(response => {
        document.getElementById("container").style.visibility = "hidden";
        // Atualizar as mensagens
        setInterval(function () {
            atualizarMsg()
        }, 3000)

        setInterval(function () {
            atualizarStatus()
        }, 5000)


        setInterval(function () {
            let participantes = document.getElementById("online");
            participantes.innerHTML = "";
            renderizarParticipantes();
        }, 10000)
    }).catch(error => {
        window.location.reload();
    })
}

//Renderizar Participantes na barra lateral
function renderizarParticipantes() {
    axios.get("https://mock-api.driven.com.br/api/v6/uol/participants").then(response => {
        let participantes = document.getElementById("online");
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            let participante = response.data[i];
            console.log(participante)
            participantes.innerHTML += `
            <li onclick="marcar(event)" id="${i}" data-identifier="participant" class="participante">
                <ion-icon name="person-circle-outline"></ion-icon>
                ${participante.name}
            </li>`;
        }
    })

}

function marcar(e) {
    let check = document.getElementById(e.target.id)
    let checkStyle = document.getElementById("check")
    if (checkMarkId == e.target.id && checkStyle != null) {
        checkStyle.style.visibility = "hidden"
        let remove = document.getElementById(`check${checkMarkId}`)
        console.log(remove)
        remove.remove()
    }

    else {
        if (e.target.id != checkMarkId && checkMarkId != 0 && checkStyle != null) {
            checkStyle.style.visibility = "hidden"
            let remove = document.getElementById(`check${checkMarkId}`)
            console.log(remove)
            remove.remove()
        }
        check.innerHTML +=
            `<div class="check" id="check${e.target.id}">
             <ion-icon id="check" name="checkmark">
        </ion-icon></div>`
        check.classList.add("check")
        document.getElementById("check").style.visibility = "visible"
        destino = document.getElementById("destino").innerText = check.innerText
        console.log(check.innerText)
        console.log(check)
        checkMarkId = e.target.id
    }

}



//Enviar mensagem e renderizar na conversa
function sendMsg() {
    let msg = document.querySelector(".message");

    let novoChat = { from: nameUser, to: destino , text: msg.value, type: "message" };
    const message = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novoChat)
        .then(response => {

            atualizarMsg()


        })
        .catch(error => {
            // window.location.reload();
            console.log(error)
        });

    msg.value = ''
}

//Função para renderizar mensagens
function renderizarMsg() {

    let chatRenderizado = document.querySelector(".conversa");
    for (let i = 0; i < message.length; i++) {

        let mensagemEnviada = message[i];
        if (mensagemEnviada.type == "status" || mensagemEnviada.to == "Todos" || mensagemEnviada.to == nameUser || mensagemEnviada.from == nameUser) {
            let tipo = verificarTipo(mensagemEnviada);
            chatRenderizado.innerHTML += `
            <li class="novaMsg" id="${tipo}">
                <span class="hora">(${mensagemEnviada.time})</span>
                <span class="usuario">${mensagemEnviada.from}</span>
                para
                <span class="destinatario">${mensagemEnviada.to}</span>:
                <span class="conteudo">${mensagemEnviada.text}</span>
            </li>`;

        }
    }
    let novoScroll = chatRenderizado.getElementsByClassName("novaMsg");
    novoScroll[novoScroll.length - 1].scrollIntoView();

}

//Verificar tipo das mensagens
function verificarTipo(mensagem) {
    if (mensagem.type == "status") return "status"
    else if (mensagem.to == "Todos" && mensagem.type == "message") return "todos"
    else if (mensagem.from == nameUser && mensagem.type == "message") return "privado"
}

//Abrir e fechar o menu
function abrirSideBar() {
    document.querySelector(".back").style.visibility = "visible";
    document.querySelector(".back").style.transition = "all 0.4s ease-out";
}

function fecharSideBar() {
    document.querySelector(".back").style.visibility = "hidden";
    document.querySelector(".back").style.transition = "all 0.4s";
    document.querySelector(".back").style.transition = "ease-out";
    let removeIcon = document.getElementById(`check${checkMarkId}`)
    removeIcon.remove()
}

window.onload = function () {
    const elem = document.getElementById("inputMessage")
    elem.addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            document.getElementById("sendButton").click();
        }
    })
};
