async function send_tcc() {
    const tk = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        .split('=')[1]
    const loggedIn = await fetch('/api/createTcc', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tk}`,
      }),
      body: JSON.stringify({
        title: document.getElementById('title').value,
        authors: document.getElementById('authors').value,
        professor: document.getElementById('professor').value,
        researchArea: document.getElementById('research-area').value,
        filename: 'Loren',
        file: document.getElementById('file'),
      }),
    })
  }