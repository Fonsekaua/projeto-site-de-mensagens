const opacity = (element) => {
    const tela = document.querySelector("#tela")
    element.classList.toggle("opacity")
    tela.classList.toggle("opacity")
    
}

const remove = (element) =>{
    
    if(element){
    const remove = element.querySelector('#remove') 
    remove.addEventListener("click",()=>{
        opacity(element)
    })}
}
const usuarioLogado = document.querySelector("#usuarioLogado")
const login = document.querySelector("#login")
const registro = document.querySelector("#registro")
const adicionar = document.querySelector("#adicionar")
const sessionDestroy = document.querySelector("#sessionDestroy")
const formLogin = document.getElementById("formLogin")
const formRegistro = document.getElementById("form")
const sectionAdicionar = document.querySelector("#sectionAdicionar")

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

remove(formRegistro)
remove(formLogin)
remove(sectionAdicionar)
 formLogin.querySelector("button").addEventListener("click", function (e) {
    
    e.preventDefault()
    const usuario = document.querySelector("#formLogin input").value
    axios.post("db/api/login.php", {
        usuario: usuario
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
            console.log(response)
        }
    })
})

formRegistro.querySelector("button").addEventListener("click", function (e) {
    
    e.preventDefault()
    const usuario = document.querySelector("#form input").value
    axios.post("db/api/registro.php", {
        usuario: usuario
    }).then((response) => {
        const data = response.data
        if (data.registro) {
            console.log(data.mensagem)
            opacity(formRegistro)
            
        }
        else{
            console.log(response)
        }
    })
})


const mensagemArray = document.querySelectorAll("#mensagensBack")

mensagemArray.forEach(mensagens => {
    console.log(mensagens)
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
                    const label = document.createElement("label")
                    label.innerHTML = data.mensagemDoUsuario
                    label.classList = "mensagem direita"
                    sectionMain.appendChild(label)
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