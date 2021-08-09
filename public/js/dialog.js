function openDialog(title, msg, positiveBtn = 'Ok', negativeBtn = 'Cancelar') {
  let dialog = document.querySelector('dialog')
  dialog.children[0].innerText = title
  dialog.children[1].innerText = msg
  if (positiveBtn) {
    dialog.children[2].hidden = false
    dialog.children[2].innerText = positiveBtn
  } else {
    dialog.children[2].hidden = true
  }

  if (negativeBtn) {
    dialog.children[3].hidden = false
    dialog.children[3].innerText = negativeBtn
  } else {
    dialog.children[3].hidden = true
  }

  dialog.showModal()
}

function closeDialog() {
  let dialog = document.querySelector('dialog')
  dialog.close()
}
