let message = [];
let nameUser = prompt("Digite seu usuário")


const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

promessa.then(msgChegou);

function msgChegou(resposta){
    console.log(resposta);
    console.log(resposta.data);
    message = resposta.data;

    renderizarMsg();
}

function sendMsg(){
    let msg = document.querySelector(".message").value;

    let novoChat = {mensagem: msg};

    message.push(novoChat);
    
    renderizarMsg();

    rolar();

    msg = "";
}

function renderizarMsg(){

    let chatRenderizado = document.querySelector(".conversa");

    chatRenderizado.innerHTML = "";

    let d = new Date();
    let h = d.toLocaleTimeString();

    for(let i = 0; i < message.length; i++){

        let mensagemEnviada = message[i];
        let d = new Date();
        let h = d.toLocaleTimeString();

        chatRenderizado.innerHTML += `
        <li class="novaMsg">
            (${h})
            <span>${nameUser}</span>
            para
            Todos:
            ${mensagemEnviada.mensagem}
        </li>
    `;
    
    chatRenderizado.scrollIntoView();
    } 
}
renderizarMsg();

function rolar(){
    let conversa = document.querySelector(".rolar");
    conversa.scrollIntoView();
}

function abrirSideBar(){
    document.querySelector(".back").style.visibility="visible";
    document.querySelector(".back").style.transition= "all 0.4s ease-out";
}

function fecharSideBar(){
    document.querySelector(".back").style.visibility="hidden";
    document.querySelector(".back").style.transition= "all 0.4s";
    document.querySelector(".back").style.transition= "ease-out";
}