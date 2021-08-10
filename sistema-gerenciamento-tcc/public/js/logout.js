async function logout() {
  const res = await fetch('/api/logout', {
    method: 'POST',
  })
  if (res.status !== 200) {
    console.error(res.body)
  }
  document.cookie = 'token=0'
  document.location.href = '/login'
}
