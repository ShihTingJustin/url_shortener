function shortener() {
  let shorten = []
  shorten.push(Math.floor(Math.random() * 10))
  
  for (let i = 0; i < 4; i++) {
    // random number
    const randomNum = Math.floor(Math.random() * 10)

    // random upper case
    let randomAtoZ = Math.floor(Math.random() * 26)
    const upperCase = String.fromCharCode(65 + randomAtoZ)

    // random lower case
    randomAtoZ = Math.floor(Math.random() * 26)
    const lowerCase = String.fromCharCode(65 + randomAtoZ).toLowerCase()

    // generate random character
    const randomIdx = Math.floor(Math.random()
      * 3)
    switch (randomIdx) {
      case 0:
        shorten.push(randomNum)
        break

      case 1:
        shorten.push(upperCase)
        break

      case 2:
        shorten.push(lowerCase)
    }
  }
  // array to string without commas 
  shorten = shorten.join('')
  return shorten
}

module.exports = shortener