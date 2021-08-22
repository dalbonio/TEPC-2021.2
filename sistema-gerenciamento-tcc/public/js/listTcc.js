async function loadTccs() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const pageParam = currentPage !== 1 ? `page=${currentPage}` : ''
  const queryParam = currentQuery.length > 0 ? `query=${encodeURI(currentQuery)}` : ''
  const fieldParam = currentField.length > 0 ? `field=${encodeURI(currentField)}` : ''
  const hiddenParam = viewPending ? `pending=true` : ''

  let params = '?'
  if (pageParam.length > 0) params += pageParam + '&'
  if (queryParam.length > 0) params += queryParam + '&'
  if (fieldParam.length > 0) params += fieldParam + '&'
  if (hiddenParam.length > 0) params += hiddenParam + '&'
  params = params.slice(0, -1)

  const res = await fetch(`/api/listTcc${params}`, {
    headers: new Headers({
      Authorization: `Bearer ${tk}`,
    }),
  })

  const responseData = await res.json()
  setupList(responseData.data)
  setupPagination(responseData.meta)
}

async function setupList(tccList) {
  const listElement = document.getElementsByTagName('ul')[0]
  tccList.forEach((tcc) => {
    const li = makeTccListItem(tcc.research_area, tcc.title, tcc.author, tcc.professor, tcc.id)
    listElement.appendChild(li)
  })
}

function cleanList() {
  const listElement = document.getElementsByTagName('ul')[0]
  const tccs = Array(...listElement.children)
  tccs.forEach((li) => li.remove())
}

async function filter() {
  currentQuery = document.getElementById('query').value.trim()
  currentField = document.getElementById('field').value

  cleanList()
  await loadTccs()
}

document.addEventListener('DOMContentLoaded', loadTccs)
