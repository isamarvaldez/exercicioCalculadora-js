//Algoritmo
//1. Pegar os valores dos imputs
//2. Fazer o calculo do IMC->  valorIMC
//3. Gerar a classificacao IMC -> classificacaoIMC
//4. Organizar os dados do usuarios para salvar na lista e gerar a  data de cadastro
//5. Inserir o usuario na lista (salvar no localStorage)
//6. Funcao para carregar os usuarios (localStorage), chamar ao carregar a pagina
//7. Renderizar o conteudo da tabela com os usuarios cadastrados
//8. Botao para limpar os registros (localStorage)


function calcular(event) {
    // previne recarregar a pagina
    event.preventDefault()
    console.log("foi executada a funcao executar")
//paso 1
    let usuario = receberValores()
    //paso 2
    let imcCalculado = calcularIMC(usuario.altura, usuario.peso)
    //paso 3
    let classificacaoIMC = classificarImc(imcCalculado)

    console.log(classificacaoIMC) 

//paso 4
    usuario = organizarDados(usuario, imcCalculado, classificacaoIMC)

//paso 5
cadastrarUsuario(usuario)

    function receberValores() {
        let nomeRecebido = document.getElementById("nome").value.trim()
        let alturaRecebida = document.getElementById("altura").value
        let pesoRecebido = document.getElementById("peso").value

        let dadosUsuario = {
            nome: nomeRecebido,
            altura: alturaRecebida,
            peso: pesoRecebido

        }

        // console.log(nomeRecebido)
        // console.log(alturaRcebida)
        //console.log(pesoRecebido)
        console.log(dadosUsuario)

        return dadosUsuario
    }
    function calcularIMC(altura, peso) {
        let imc = peso / (altura * altura)

        console.log(imc)

        return imc
    }
}
function classificarImc(imc) {
    /* 
    Resultado                                         Situacao
    Entre 18.5                                        Abaixo do peso
    Entre 18.5 e 24.99                                Peso normal
    Entre 25 e 29.99                                  Sobrepeso   
    Acima de 30                                       Obesidade          
    */


if (imc < 18.5) {
    return "Abaixo do peso"

} else if (imc >= 18.5 && imc < 25) {
    return "peso normal"

} else if (imc >= 25 && imc < 30) {

    return "Sobrepeso"
} else {
    return "obessidade"
}
}

function organizarDados(dadosUsuario, valorIMC, classificacaoIMC) {
    //pegar a dataHoraAtual
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', {timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

    console.log(dataHoraAtual);

//organizando objeto para atualizar
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorIMC,
        situacaoImc: classificacaoIMC,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;

}
function cadastrarUsuario(dadosUsuario){
let listaUsuarios = []    // <===LISTA VAZIA OBS: DE ISAMAR


if (localStorage.getItem("usuariosCadastrados") != null) {
    listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
}

//adiciona o usuaro na lista de usuarios
listaUsuarios.push(dadosUsuario)



//localStorage.setItem()      //("nomedeusuario", "thiago") EXEMPLO

    //if (localStorage.getItem("usuariosCadastrados") != null){
   //     listaUsuarios = localStorage.getItem("usuariosCadastrados")


   //salva a listaUsuarios no localStorage
localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

    }
function  carregarUsuarios(){
    listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null){
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))

            }
        if(listaCarregada.length == 0) {
            //se nao tiver  nehum usuario cadastrado, mostrar mensagem
            let tabela = document.getElementById("vorpo-tabela")

            tabela.innerHTML = "nenhum usuario carregado"
        }

            console.log(listaCarregada)
 }
 window.addEventListener("DOMcontentLoaded", () => carregarUsuarios())