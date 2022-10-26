let message;
let nameUser;
login().then(response => {
    console.log(response)
}).catch(error => {
    window.location.reload();
})


msgChegou();

//Atualizar as mensagens
// setInterval(function(){
//     atualizarMsg()
// }, 3000)

setInterval(function () {
    atualizarStatus()
}, 5000)

function atualizarStatus(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status",{
        name: nameUser
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
            renderizarParticipantes();
        }
    )
}

//Iniciar login
function login() {
    nameUser = prompt("Digite seu usuário");
    const particpant = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: nameUser })
    return particpant
}

//Renderizar Participantes na barra lateral
function renderizarParticipantes() {
    let participantes = document.querySelector(".contatos");
    for (let i = 0; i < 10; i++) {
        let participante = message[i];
        participantes.innerHTML += `
        <li class="participante">
            <ion-icon name="person-circle-outline"></ion-icon>
            ${participante.from}
        </li>`;
    }
}

//Enviar mensagem e renderizar na conversa
function sendMsg() {
    let msg = document.querySelector(".message");

    let novoChat = { from: nameUser, to: "Todos", text: msg.value, type: "message" };
    const message = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novoChat)
        .then(response => {
            
            atualizarMsg()


        })
        .catch(error => {
            window.location.reload();
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
                ${mensagemEnviada.text}
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
    else if (mensagem.to == nameUser && mensagem.type == "message") return "privado"
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
}