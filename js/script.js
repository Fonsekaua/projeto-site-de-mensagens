const usuarioLogado = document.querySelector("#usuarioLogado")
const login = document.querySelector("#login")
const registro = document.querySelector("#registro")
const adicionar = document.querySelector("#adicionar")
const sessionDestroy = document.querySelector("#sessionDestroy")
const formLogin = document.getElementById("formLogin")
const formRegistro = document.getElementById("form")
const sectionAdicionar = document.querySelector("#sectionAdicionar")
const info = document.querySelector("#informar")
let webSocket

const opacity = (element) => {
    const tela = document.querySelector("#tela")
    element.classList.toggle("opacity")
    tela.classList.toggle("opacity")
    document.querySelector("body").classList.toggle("over")
    
}

const remove = (element) =>{
    
    if(element){
    const remove = element.querySelector('#remove') 
    remove.addEventListener("click",()=>{
        opacity(element)
    })}
}

function caixa () {
    info.classList.toggle("inform")
}
if(adicionar){
    adicionar.addEventListener("click",function(){
        opacity(sectionAdicionar)
    })
}
if(login){
    login.addEventListener("click",function(){
    opacity(formLogin)
})
}

if(sessionDestroy){
    sessionDestroy.addEventListener("click",()=>{
        window.location.href = 'db/api/sessionDestroy.php';
        sessionDestroy
    
    })
}
if(registro){
    registro.addEventListener("click",()=>{
        opacity(formRegistro)
    })
}
function messageSend (remetente, destinatario, content) {
    const label = document.createElement("label")
    label.id = destinatario  
    sectionMain.appendChild(label)
    if(remetente == id){
        label.innerHTML = content
        label.classList = "mensagem direita"
    }
}

const processMessage = ({data}) => {
    const {remetente, destinatario, content} = JSON.parse(data)

}


remove(formRegistro)
remove(formLogin)
remove(sectionAdicionar)
 formLogin.querySelector("button").addEventListener("click", function (e) {
    
    e.preventDefault()
    const usuario = formLogin.querySelector("#nome").value
    const senha = formLogin.querySelector("#senha").value
    axios.post("db/api/login.php", {
        usuario: usuario,
        senha:senha
    }).then((response) => {
        const data = response.data
        if (data.login) {

            axios.post("db/api/session.php", {
                usuario: usuario
            }).then((response) => {
                const data = response.data
                console.log(data.mensagem)
                window.location.href = '';
                
            })
        }
        else{

            caixa()
        formLogin.querySelector("#nome").value = "";
        formLogin.querySelector("#senha").value = "";

            info.querySelector("#info p").innerHTML = data.mensagem
            setTimeout(caixa,5000);
        }
    })
})

formRegistro.querySelector("button").addEventListener("click", function (e) {
    
    e.preventDefault()
    const usuario = formRegistro.querySelector("#nome").value
    const senha = formRegistro.querySelector("#senha").value
    axios.post("db/api/registro.php", {
        usuario: usuario,
        senha:senha
    }).then((response) => {
        const data = response.data
        if (data.registro) {
            caixa()
            info.querySelector("#info p").innerHTML = data.mensagem
            setTimeout(caixa,5000);
            console.log(data.mensagem)
            opacity(formRegistro)
            
        }
        else{
            console.log(response)
            caixa()
         
            info.querySelector("#info p").innerHTML = data.mensagem
            setTimeout(caixa,5000);
        }
    })
})


const mensagemArray = document.querySelectorAll("#mensagensBack")

mensagemArray.forEach(mensagens => { 
    const span = mensagens.querySelector("span")
    const section = mensagens.querySelector("#mensagensSection")
    const sectionMain = section.querySelector("#sectionMain")


    remove(section) 
    if(span){
            span.addEventListener("click", () => {
                opacity(section)
        })
    }

    if (section) {
        
        section.querySelector("button").addEventListener("click", async function (event) {
            event.preventDefault()

            try {
            const input = section.querySelector("#mensagemDoUsuario")
            const mensagemDoUsuario = input.value
            const id_remetente = usuarioLogado.getAttribute("data-id")
            const id_destinatario = section.getAttribute("data-id")



                const response = await axios.post("db/api/mensagem.php", {
                    mensagemDoUsuario: mensagemDoUsuario,
                    id_remetente: id_remetente,
                    id_destinatario: id_destinatario
                })
    
                const data = response.data
                console.log(data)
    
                if (data.envio) {
                    const message = {
                        "remetente": id_remetente,
                        "destinatario": id_destinatario,
                        "content": mensagemDoUsuario
                    }
                    webSocket = new WebSocket("ws://localhost:8080")
                    webSocket.onopen = () => webSocket.send(JSON.stringify(message))
                    webSocket.onmessage = processMessage

                    const label = document.createElement("label")
                    label.innerHTML = data.mensagemDoUsuario
                    label.classList = "mensagem direita"
                    sectionMain.appendChild(label)

                  
                    caixa()
                    info.querySelector("#info p").innerHTML = data.mensagem
                    setTimeout(caixa,5000);
                }
                else{
                    caixa()
                    info.querySelector("#info p").innerHTML = data.mensagem
                    setTimeout(caixa,5000);
                }
        
            } catch ($error) {
                console.error("Ocorreu um erro: ", $error)
            }
            
        })
    }
    
})
const adicionarUsuario = document.querySelectorAll('#adicionarUsuario')
adicionarUsuario.forEach(element =>{
    element.addEventListener("click",()=>{
        const id_usuarioFriend = element.getAttribute("data-id")
        const id_usuario = usuarioLogado.getAttribute("data-id")
        axios.post("db/api/adicionar.php", {
            id_usuario: id_usuario,
            id_usuarioFriend: id_usuarioFriend
        }).then((response) => {
            const data = response.data
            if (data.adicionado) {
               console.log(data.mensagem)
               const span = element.parentNode
               span.style.display = "none"
            }
        })
    })
})

