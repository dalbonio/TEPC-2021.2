async function login() {
  const loggedIn = await fetch('/api/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }),
  })

  if (loggedIn.status !== 200) {
    alert('Email ou Senha incorretos')
  } else {
    const res = await loggedIn.json()
    document.cookie = `token=${res.token.token}`
    document.location.href = '/listarTrabalhos'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementsByTagName('form')[0]
  function handleForm(event) {
    event.preventDefault()
  }
  form.addEventListener('submit', handleForm)
})
