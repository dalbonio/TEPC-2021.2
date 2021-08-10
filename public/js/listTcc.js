async function loadTccs() {
  const tk = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    .split('=')[1]

  const res = await fetch(`/api/listTcc?page=${currentPage}`, {
    headers: new Headers({
      Authorization: `Bearer ${tk}`,
    }),
  })

  const responseData = await res.json()
  setupPagination(responseData.meta)
  console.log(responseData.data)
}

function setupPagination(pagination) {
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

document.addEventListener('DOMContentLoaded', loadTccs)
