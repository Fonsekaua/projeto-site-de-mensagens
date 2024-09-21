const opacity = (element) => {
    const tela = document.querySelector("#tela")
    element.classList.toggle("opacity")
    tela.classList.toggle("opacity")
}

const login = document.querySelector("#login")
const registro = document.querySelector("#registro")
const adicionar = document.querySelector("#adicionar")

const form = document.querySelector("form")

login.addEventListener("click",()=>{
    opacity(form)
})

const remove = (element) =>{
    const remove = element.querySelector('#remove')
    remove.addEventListener("click",()=>{
        opacity(element)
    })
}
remove(form)

 form.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault()
    const usuario = document.querySelector("form input").value
    axios.post("login.php", {
        usuario: usuario
    }).then((response) => {
        const data = response.data
        if (data.login) {
            axios.post("session.php", {
                usuario: usuario
            }).then((response) => {
                const data = response.data
                console.log(data.mensagem)
            })
        }
    })
})



const mensagem = document.querySelector("main")
const mensagemArray = Array.from(mensagem.children)

mensagemArray.forEach(mensagens => {
    const span = mensagens.querySelector("span")
    const section = mensagens.querySelector("section")
    remove(section)
    span.addEventListener("click", () => {
        opacity(section)
       
    })

    section.querySelector("#sectionFooter button").addEventListener("click", function (e) {
        e.preventDefault()
        const input = document.querySelector("#mensagemDoUsuario")
        const mensagemDoUsuario = input.value
        const id_remetente = input.getAttribute("data-user")
        const id_destinatario = span.getAttribute("data-id")
        axios.post("mensagem.php", {
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
            }
        })
    })
})