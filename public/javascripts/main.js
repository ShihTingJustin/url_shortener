// copy function
console.log('frontend')
const urls = document.querySelectorAll('.display-shortened-url')
const copyBtn = document.querySelectorAll('.copy-btn')
copyBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    urls.forEach(url => {
      if (url.dataset.id === e.target.dataset.id) {
        url.select()  // select input DOM
        document.execCommand('copy')
        console.log('copied')
      }
    })
  })
})


// check again before delete
function deleteCheckAgain() {
  return window.confirm('Do you really want to delete this shortened URL ?')
}