const opacity = (element) => {
    const tela = document.querySelector("#tela")
    element.classList.toggle("opacity")
    tela.classList.toggle("opacity")
    document.querySelector("body").classList.toggle("over")
}
const usuarioLogado = document.querySelector("#usuarioLogado")
const login = document.querySelector("#login")
const registro = document.querySelector("#registro")
const adicionar = document.querySelector("#adicionar")
const sessionDestroy = document.querySelector("#sessionDestroy")
const form = document.querySelector("form")
const sectionAdicionar = document.querySelector("#sectionAdicionar")
if(adicionar){
    adicionar.addEventListener("click",function(){
        opacity(sectionAdicionar)
    })
}
if(login){
    login.addEventListener("click",function(){
    opacity(form)
})
}
if(sessionDestroy){
    sessionDestroy.addEventListener("click",()=>{
        window.location.href = 'db/api/sessionDestroy.php';
        sessionDestroy
    
    })
}
const remove = (element) =>{
    
    if(element){
    const remove = element.querySelector('#remove') 
    remove.addEventListener("click",()=>{
        opacity(element)
    })}
}

remove(form)
remove(sectionAdicionar)
 form.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault()
    const usuario = document.querySelector("form input").value
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



const mensagem = document.querySelector("main")
const mensagemArray = Array.from(mensagem.children)

mensagemArray.forEach(mensagens => {
    const span = mensagens.querySelectorAll("span")
    const section = mensagens.querySelector("#mensagensSection")
    remove(section)
    if(span){
        span.forEach(elementSpan => {
            elementSpan.addEventListener("click", () => {
                opacity(section)
            })
        })
    }

    if(section){
        section.querySelector("#sectionFooter button").addEventListener("click", function (e) {
            e.preventDefault()
            const input = document.querySelector("#mensagemDoUsuario")
            const mensagemDoUsuario = input.value
            const id_remetente = usuarioLogado.getAttribute("data-id")
            const id_destinatario = span.getAttribute("data-id")
            axios.post("db/api/mensagem.php", {
                mensagemDoUsuario: mensagemDoUsuario,
                id_remetente: id_remetente,
                id_destinatario: id_destinatario
            }).then((response) => {
                const data = response.data
                if (data.envio) {
                    const sectionMain = document.querySelector("#sectionMain")
                    const label = document.createElement("label")
                    label.innerHTML = data.mensagemDoUsuario
                    label.classList = "mensagem direita"
                    sectionMain.appendChild(label)
                    input.value = ""
                }
            })
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