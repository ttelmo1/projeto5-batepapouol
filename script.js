let message = [];


function sendMsg(){
    let msg = document.querySelector(".message").value;

    let novoChat = {mensagem: msg};

    message.push(novoChat);
    
    renderizarMsg();

    msg = '';
}

function renderizarMsg(){

    let chatRenderizado = document.querySelector(".conversa");

    for(let i = 0; i < message.length; i++){

        let mensagemEnviada = message[i];

        chatRenderizado.innerHTML += `
        <li>
            ${mensagemEnviada.mensagem}
        </li>
    `;
    }
    
}
renderizarMsg();

function abrirSideBar(){
    document.querySelector(".back").style.visibility="visible";
    document.querySelector(".back").style.transition= "all 0.4s ease-out";
}

function fecharSideBar(){
    document.querySelector(".back").style.visibility="hidden";
    document.querySelector(".back").style.transition= "all 0.4s";
    document.querySelector(".back").style.transition= "ease-out";
}