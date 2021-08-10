async function detailTcc() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const res = await fetch(`/api/detailTcc/${id}`, {
    headers: new Headers({
      Authorization: `Bearer ${tk}`,
    }),
  })

  const responseData = await res.json()
  document.getElementById('field').innerText = responseData.research_area
  document.getElementById('title').innerHTML = `<strong>${responseData.title}</strong>`
  document.getElementById('authors').innerHTML = `<strong>${responseData.author}</strong> Sob orientação de ${responseData.professor}`
  document.getElementById('resumo').innerText = responseData.resumo
  document.getElementById('abstract').innerText = responseData.abstract
  document.getElementById('download').addEventListener('click', () => {
    document.location.href = `/api/downloadTcc/${id}`
  })

}

document.addEventListener('DOMContentLoaded', detailTcc)
