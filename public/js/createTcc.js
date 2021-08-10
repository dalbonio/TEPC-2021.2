async function send_tcc() {
    const tk = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        .split('=')[1]
    
    const tccRes = await fetch('/api/createTcc', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tk}`,
      }),
      body: JSON.stringify({
        title: document.getElementById('title').value,
        authors: document.getElementById('authors').value,
        professor: document.getElementById('professor').value,
        research_area: document.getElementById('research-area').value,
        filename: 'Loren',
        file: document.getElementById('file'),
      }),
    })

    if (tccRes.status >= 400 && tccRes.status < 600) {
      tccRes.text().then(text => {alert(text)})
    }
    else{
      alert("TCC Foi criado com sucesso")
    }
  }