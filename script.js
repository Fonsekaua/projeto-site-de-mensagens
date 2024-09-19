document.querySelector("#sectionFooter button").addEventListener("click",function(e){
    e.preventDefault()
    const input = document.querySelector("#mensagemDoUsuario")
    const mensagemDoUsuario = input.value
    const id_remetente = input.getAttribute("data-user")
     axios.post("mensagem.php",{
        mensagemDoUsuario: mensagemDoUsuario,
        id_remetente: id_remetente
    }).then((response)=>{
        const data = response.data
        if(data.envio){
            const sectionMain = document.querySelector("#sectionMain")
            const label = document.createElement("label")
            label.innerHTML = data.mensagemDoUsuario
            label.classList = "mensagem direita"
            sectionMain.appendChild(label)
        }
     })
})

document.querySelector("form button").addEventListener("click",function(e){
    e.preventDefault()
    const usuario = document.querySelector("form input").value
    axios.post("login.php",{
        usuario:usuario
    }).then((response)=>{
        const data = response.data
        if(data.login){
            axios.post("session.php",{
                usuario:usuario
            }).then((response)=>{
                const data = response.data
                console.log(data.mensagem)
            })
        }
    })
})