async function loadTccs() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const pageParam = currentPage !== 1 ? `page=${currentPage}` : ''
  const queryParam = currentQuery.length > 0 ? `query=${encodeURI(currentQuery)}` : ''
  const fieldParam = currentField.length > 0 ? `field=${encodeURI(currentField)}` : ''

  let params = '?'
  if (pageParam.length > 0) params += pageParam + '&'
  if (queryParam.length > 0) params += queryParam + '&'
  if (fieldParam.length > 0) params += fieldParam + '&'
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

async function setupPagination(pagination) {
  const pagElement = document.getElementsByClassName('pagination')[0]
  if (pagination.first_page === pagination.current_page) {
    pagElement.firstElementChild.className = 'unavailable'
    pagElement.firstElementChild.href = '#'
  } else {
    pagElement.firstElementChild.className = ''
    pagElement.firstElementChild.href = '/listarTrabalhos' + pagination.first_page_url.slice(1)
  }

  if (pagination.last_page === pagination.current_page) {
    pagElement.lastElementChild.className = 'unavailable'
    pagElement.lastElementChild.href = '#'
  } else {
    pagElement.lastElementChild.className = ''
    pagElement.lastElementChild.href = '/listarTrabalhos' + pagination.last_page_url.slice(1)
  }

  if (pagination.prev_page_url) {
    pagElement.children[1].className = ''
    pagElement.children[1].href = '/listarTrabalhos' + pagination.prev_page_url.slice(1)
  } else {
    pagElement.children[1].className = 'unavailable'
    pagElement.children[1].href = '#'
  }

  if (pagination.next_page_url) {
    pagElement.children[pagElement.childElementCount - 2].className = ''
    pagElement.children[pagElement.childElementCount - 2].href = '/listarTrabalhos' + pagination.next_page_url.slice(1)
  } else {
    pagElement.children[pagElement.childElementCount - 2].className = 'unavailable'
    pagElement.children[pagElement.childElementCount - 2].href = '#'
  }

  for (let i = 0; i < 5; i++) {
    const link = pagElement.children[i + 2]
    if (
      i < pagination.last_page ||
      (i + 1 === pagination.last_page && i + 1 === pagination.first_page)
    ) {
      link.hidden = false
      link.href = `/listarTrabalhos?page=${i + 1}`
    } else {
      link.hidden = true
      link.href = `#`
    }

    link.className = ''
    if (i + 1 === pagination.current_page) {
      link.className = 'selected'
    }
  }
}

async function filter() {
  currentQuery = document.getElementById('query').value.trim()
  currentField = document.getElementById('field').value

  cleanList()
  await loadTccs()
}

document.addEventListener('DOMContentLoaded', loadTccs)
