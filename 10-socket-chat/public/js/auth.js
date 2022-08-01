
function handleCredentialResponse(response) {
    //google token : ID_TOKEN
    // console.log('id_token',response.credential)
    const body = {id_token: response.credential}
    const url = 'http://localhost:8085/api/auth/google'

    fetch('http://localhost:8085/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(resp =>{
            console.log(resp)
            localStorage.setItem('email', resp.usuario.correo)
        })
    .catch(console.warn)

}

const button = document.getElementById('google_signout')
button.onclick = () =>{
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'),done =>{
        localStorage.clear()
        location.reload()
    })
}