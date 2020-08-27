const baseURL = 'http://localhost:3001/alunos'

const tabela = document.querySelector('.table')
const formulario = document.registerForm
const botaoCancelar = document.querySelector('.btn-secondary')


const initialState = {
    aluno: {
        id:'',
        nome: '',
        email: '',
        whatsapp: ''
    },
    list: []
}

var state = { ...initialState }


//Listar GET
function mostrarRegistros() {
    fetch(baseURL).then(resp => resp.json())
        .then(alunos => {
            state.list = [...alunos]
            console.log(state)
            const linhas = alunos.reduce(
                (html, aluno) => html + `
                <div class='row' id=${aluno.id}>
                    <div class='col'>${aluno.nome}</div>
                    <div class='col'>${aluno.email}</div>
                    <div class='col'>
                            <a
                            class='btn-whatsapp'
                            href='https://api.whatsapp.com/send?phone=${aluno.whatsapp}&text=Olá, ${aluno.nome}'
                            target='_blank'>
                            <img src='./assets//images/whatsapp-logo-1.png' >    
                            Mensagem
                            </a>
                    </div>
                    <div class="col">
                            <button class="btn-edit" onClick=atualizarCampos(${aluno.id})>Editar</button>
                    </div>
                    <div class="col">
                        <button class="btn-delete" onClick=deletar(${aluno.id})>Excluir</button>
                    </div>
                </div>`, ''
            )
            tabela.insertAdjacentHTML('beforeend', linhas)
        })
        .catch((e) => tabela.innerHTML = "<div class='row'><div class='col'>Carregando...</div></div>")
}

mostrarRegistros()


function atualizarEstado() {
    if (formulario.ident.value != '') state.aluno.id = formulario.ident.value
    state.aluno.nome = formulario.nome.value
    state.aluno.email = formulario.email.value
    state.aluno.whatsapp = formulario.whatsapp.value
}

function atualizarCampos(id) {
    fetch(`${baseURL}/${id}`)
        .then(resp => resp.json())
        .then(aluno => {
            console.log(aluno)
            formulario.ident.value = aluno.id
            formulario.nome.value = aluno.nome
            formulario.email.value = aluno.email
            formulario.whatsapp.value = aluno.whatsapp
        })
    document.getElementById('botaoCadastrar').click()
}

//Salvar POST e PUT
document.registerForm.onsubmit = function (evento) {
    evento.preventDefault()
    atualizarEstado()

    const aluno = state.aluno
    const method = aluno.id ? 'put' : 'post'
    console.log(state)
    console.log(method)
    const url = aluno.id!='' ? `${baseURL}/${aluno.id}` : baseURL

    fetch(url, {
        method,
        body: new URLSearchParams(aluno)
    })
        .then((resp) => resp.json())
        .then(alunoResp => {
            if (method == 'post') {
                tabela.insertAdjacentHTML('beforeend', `
                <div class='row highlight' id=${alunoResp.id}>
                    <div class='col' id='nome'>${alunoResp.nome}</div>
                    <div class='col' id='email'>${alunoResp.email}</div>
                    <div class='col' id='whatsapp'>
                            <a
                            class='btn-whatsapp'
                            href='https://api.whatsapp.com/send?phone=${alunoResp.whatsapp}&text=Olá, ${alunoResp.nome}'
                            target='_blank'>
                            <img src='./assets/images/whatsapp-logo-1.png' >
                            Mensagem
                            </a>
                    </div>
                    <div class="col">
                            <button class="btn-edit" onClick=atualizarCampos(${alunoResp.id})>Editar</button>
                    </div>
                    <div class="col">
                        <button class="btn-delete" onClick=deletar(${alunoResp.id})>Excluir</button>
                    </div>
                </div>`)

            } else {
                document.getElementById(alunoResp.id).classList.add('highlight')
                document.getElementById(alunoResp.id).innerHTML = `
                <div class='col'>${alunoResp.nome}</div>
                <div class='col'>${alunoResp.email}</div>
                <div class='col'>
                        <a
                        class='btn-whatsapp'
                        href='https://api.whatsapp.com/send?phone=${alunoResp.whatsapp}&text=Olá, ${alunoResp.nome}'
                        target='_blank'>
                        <img src='./assets/images/whatsapp-logo-1.png' >
                        Mensagem
                        </a>
                </div>
                <div class="col">
                        <button class="btn-edit" onClick=atualizarCampos(${alunoResp.id})>Editar</button>
                </div>
                <div class="col">
                        <button class="btn-delete" onClick=deletar(${alunoResp.id})>Excluir</button>
                </div>
                `
            }
            botaoCancelar.click()
            setTimeout(() => {
                document.querySelector('.highlight').classList.remove('highlight')
            }, 1000)
        })
        .catch((e) => tabela.innerHTML = `<div class='row'><div class='col'>${e}</div></div>`)
}

//Evento de Cancelar
botaoCancelar.addEventListener('click', () => {
    state.aluno.id = ''
    formulario.ident.value = ''
    formulario.nome.value = ''
    formulario.email.value = ''
    formulario.whatsapp.value = ''
})

// Função de Deletar
function deletar(id) {
    fetch(`${baseURL}/${id}`, {
        method: 'delete'
    })
    document.getElementById(id).classList.add('none')
}



