async function reject() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const res = await fetch(`/api/deleteTcc/${id}`, {
    headers: new Headers({
      Authorization: `Bearer ${tk}`,
    }),
  })

  document.location.href = '/listarTrabalhos'
}

async function approve() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const res = await fetch(`/api/deleteTcc/${id}`, {
    headers: new Headers({
      Authorization: `Bearer ${tk}`,
    }),
  })

  document.location.href = '/listarTrabalhos'
}
