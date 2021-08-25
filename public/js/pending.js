async function reject() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const res = await fetch(`/api/deleteTcc/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${tk}`,
    }),
  })

  alert('TCC rejeitado')

  document.location.href = '/listarTrabalhos'
}

async function approve() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const res = await fetch(`/api/approveTcc/${id}`, {
    method: 'PUT',
    headers: new Headers({
      Authorization: `Bearer ${tk}`,
    }),
  })

  if (res.status !== 200) {
    console.error(res)
    return
  }
  alert('TCC aprovado')

  document.location.href = '/listarTrabalhos'
}
