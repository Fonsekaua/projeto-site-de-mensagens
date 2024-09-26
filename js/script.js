const opacity = (element) => {
    const tela = document.querySelector("#tela")
    element.classList.toggle("opacity")
    tela.classList.toggle("opacity")
}

const login = document.querySelector("#login")
const registro = document.querySelector("#registro")
const adicionar = document.querySelector("#adicionar")
const sessionDestroy = document.querySelector("#sessionDestroy")
const form = document.querySelector("form")

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
    const remove = element.querySelector('#remove')
    remove.addEventListener("click",()=>{
        opacity(element)
    })
}
remove(form)

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
        axios.post("db/api/mensagem.php", {
            mensagemDoUsuario: mensagemDoUsuario,
            id_remetente: id_remetente,
            id_destinatario: id_destinatario
        }).then((response) => {
            const data = response.data
            if (data.envio) {
                const sectionMain = document.querySelector("#sectionMain")
                const label = document.createElement("label")
                label.innerHTML = data.mensagem
                label.classList = "mensagem direita"
                sectionMain.appendChild(label)

            }
        })
    })
})

                
/*

"<br />
<b>Warning</b>:  include(/db_actions.php): Failed to open stream: No such file or directory in <b>C:\xampp\htdocs\what\db\api\login.php</b> on line <b>2</b><br />
<br />
<b>Warning</b>:  include(): Failed opening '/db_actions.php' for inclusion (include_path='\xampp\php\PEAR') in <b>C:\xampp\htdocs\what\db\api\login.php</b> on line <b>2</b><br />
<br />
<b>Fatal error</b>:  Uncaught Error: Call to undefined function fazerLogin() in C:\xampp\htdocs\what\db\api\login.php:8
Stack trace:
#0 {main}
  thrown in <b>C:\xampp\htdocs\what\db\api\login.php</b> on line <b>8</b><br />
"
*/