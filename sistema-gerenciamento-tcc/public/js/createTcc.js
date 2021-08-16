function on_file_change() {
  const file = document.getElementById('file').files[0]
  document.getElementsByClassName('file-name')[0].innerText = file.name
}

async function send_tcc() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const fileInput = document.getElementById('file')

  const formData = new FormData()
  formData.append('title', document.getElementById('title').value)
  formData.append('authors', document.getElementById('authors').value)
  formData.append('professor', document.getElementById('professor').value)
  formData.append('research_area', document.getElementById('research-area').value)
  formData.append('resumo', document.getElementById('resumo').value)
  formData.append('abstract', document.getElementById('abstract').value)
  formData.append('filename', fileInput.files[0].name)
  formData.append('file', fileInput.files[0], fileInput.files[0].name)

  const tccRes = await fetch('/api/createTcc', {
    method: 'POST',
    headers: new Headers({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${tk}`,
    }),
    body: formData,
    /*body: JSON.stringify({
      title: document.getElementById('title').value,
      authors: document.getElementById('authors').value,
      professor: document.getElementById('professor').value,
      research_area: document.getElementById('research-area').value,
      filename: fileInput.files[0].name,
      file: fileInput.files[0],
    }),*/
  })

  if (tccRes.status >= 400 && tccRes.status < 600) {
    tccRes.text().then((text) => {
      alert(text)
    })
  } else {
    alert('TCC Foi criado com sucesso')
  }
}
