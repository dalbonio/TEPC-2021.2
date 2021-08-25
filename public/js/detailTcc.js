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
  console.log(responseData)
  document.getElementById('field').innerText = responseData.research_area
  document.getElementById('title').innerHTML = `<strong>${responseData.title}</strong>`
  document.getElementById('authors').innerHTML = `<strong>${responseData.author}</strong> Sob orientação de ${responseData.professor}`
  document.getElementById('resumo').innerText = responseData.resumo
  document.getElementById('abstract').innerText = responseData.abstract
  const downloadButton = document.getElementById('download')
  if (downloadButton) {
    downloadButton.addEventListener('click', async () => {
      saveData(`/api/downloadTcc/${id}`, responseData.fileName)
    })
  } else {
    const download = document.getElementById('download-link')
    download.download = responseData.filename
    download.href = `/api/downloadTcc/${id}`
    document.getElementById('filename').innerText = responseData.filename
  }
}

function saveData(url, fileName) {
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  // var url = URL.createObjectURL(blob)
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

document.addEventListener('DOMContentLoaded', detailTcc)
