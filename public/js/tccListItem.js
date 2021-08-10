function makeTccListItem(researchArea, title, authors, professor, id) {
  const li = document.createElement('li')

  const descriptionDiv = document.createElement('div')
  descriptionDiv.className = 'description'
  li.appendChild(descriptionDiv)

  const overlineSpan = document.createElement('span')
  overlineSpan.className = 'overline'
  overlineSpan.innerText = researchArea
  descriptionDiv.appendChild(overlineSpan)

  const titleSpan = document.createElement('span')
  titleSpan.className = 'title'
  titleSpan.innerText = title
  descriptionDiv.appendChild(titleSpan)

  const textSpan = document.createElement('span')
  textSpan.className = 'text'
  textSpan.innerHTML = `${authors.join(' e ')}<br>Sob orientação de ${professor}`
  descriptionDiv.appendChild(textSpan)

  const actionDiv = document.createElement('div')
  actionDiv.className = 'action'
  li.appendChild(actionDiv)

  const openButton = document.createElement('button')
  openButton.className = 'text'
  openButton.addEventListener('click', () => {
    document.location.href = `/verTrabalho?tcc=${id}`
  })
  actionDiv.appendChild(openButton)

  const icon = document.createElement('span')
  icon.className = 'material-icons'
  icon.innerText = 'open_in_new'
  openButton.appendChild(icon)

  return li
}
