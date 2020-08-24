const url = 'http://localhost:3001/alunos'
const table = document.querySelector('.table')
const cancelButton = document.querySelector('.btn-secondary')




//AJAX para renderixar os dados na tabela
fetch(url).then(resp => resp.json())
    .then(alunos => {
        const linhas = alunos.reduce(
            (html, aluno) => html + `
                <div class='row' key=${aluno.id}>
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
                </div>`, ''
        )
        table.insertAdjacentHTML('beforeend', linhas)
    })

//AJAX para fazer o POST
document.registerForm.onsubmit = async e => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    const options = {
        method: form.method,
        body: new URLSearchParams(data)
    }

    try {
        const resp = await fetch(form.action, options)
        const aluno = await resp.json()
        table.insertAdjacentHTML('beforeend', `
            <div class='row highlight' key=${aluno.id}>
                <div class='col'>${aluno.nome}</div>
                <div class='col'>${aluno.email}</div>
                <div class='col'>
                        <a
                        class='btn-whatsapp'
                        href='https://api.whatsapp.com/send?phone=${aluno.whatsapp}&text=Olá, ${aluno.nome}'
                        target='_blank'>
                        <img src='./assets/images/whatsapp-logo-1.png' >    
                        Mensagem
                        </a>
                </div>
            </div>`)
        cancelButton.click()
        setTimeout(() => {
            document.querySelector('.highlight').classList.remove('highlight')
        }, 1000)
    } catch (e) {
        table.innerHTML = "<div class='row'><div class='col'>Erro</div></div>"
    }
}

cancelButton.addEventListener('click', () => {
    document.registerForm.nome.value = ''
    document.registerForm.email.value = ''
    document.registerForm.whatsapp.value = ''
})

