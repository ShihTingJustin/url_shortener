// copy function
console.log('frontend')
const url = document.querySelector('.valid-input-area')
const copyBtn = document.querySelector('.copy-btn')
copyBtn.addEventListener('click', () => {
  url.select()  // select input DOM
  document.execCommand('copy')
})

// check again before delete
function deleteCheckAgain() {
  return window.confirm('Do you really want to delete this shortened URL ?')
}