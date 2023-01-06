/* eslint-disable prettier/prettier */
export function generatePasswords(totalPasswords, totalWords) {
  var randomWords = require('random-words')

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function randomSpecialChar() {
    var s = '!@#$%&*'
    return s.substr(Math.floor(s.length * Math.random()), 1)
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function randomConcat(string1, string2, string3) {
    let stringArray = []
    stringArray.push(string1)
    stringArray.push(string2)
    stringArray.push(string3)
    return shuffle(stringArray).join('')
  }

  let passwordCount = 0
  let passwordsArray = []
  while (passwordCount < totalPasswords) {
    passwordCount = passwordCount + 1
    let words = randomWords({
      exactly: 1,
      wordsPerString: totalWords,
      maxLength: 12,
      join: '',
      formatter: (word) => word.charAt(0).toUpperCase() + word.slice(1),
    }).replace(/\s+/g, '')
    let numbers = getRandomInt(100).toString()
    let char = randomSpecialChar()

    let pass = randomConcat(char, numbers, words)
    passwordsArray.push(pass)
  }

  return passwordsArray
}

