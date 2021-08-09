async function register() {
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const registrationNumber = document.getElementById('registration')
  const password = document.getElementById('password')

  const student = {
    name: name.value,
    email: email.value,
    registrationNumber: registrationNumber.value,
    password: password.value,
  }

  if (name.value.length < 3) {
    openDialog('Digite seu nome completo', '', ' Ok ', null)
  } else if (!email.checkValidity()) {
    openDialog('Digite um e-mail válido', 'O e-mail digitado não é válido', ' Ok ', null)
  } else if (password.value !== confirmPassword.value) {
    openDialog('Confira as senhas', 'As senhas digitadas não batem', ' Ok ', null)
  } else if (!registrationNumber.checkValidity()) {
    openDialog(
      'Confira sua matrícula',
      'A matrícula deve ser uma sequencia de 10 ou 11 dígitos',
      ' Ok ',
      null
    )
  } else {
    const res = await fetch('/api/createStudent', {
      method: 'POST',
      body: JSON.stringify(student),
    })

    if (res.error) {
      openDialog('Erro ao cadastrar', res.error, ' Ok ', null)
    } else {
      openDialog(
        'Cadastro realizado com sucesso',
        'Por favor efetue o login, você será redirecionado automaticamente',
        ' Ok ',
        null
      )
      setTimeout(() => (document.location.href = '/login'), 2000)
    }
  }

  return true
}
