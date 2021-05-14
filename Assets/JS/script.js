const amountRange = document.getElementById('amountRange')
const amountNumber = document.getElementById('amountNumber')
const uppercaseElement = document.getElementById('uppercase')
const numbersElement = document.getElementById('numbers')
const symbolsElement = document.getElementById('symbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')

const UPPER_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWER_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUM_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYM_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)

amountNumber.addEventListener('input', syncCharAmount)
amountRange.addEventListener('input', syncCharAmount)


form.addEventListener('submit', e => {
  e.preventDefault()
  const charAmount = amountNumber.value
  const uppercase = uppercaseElement.checked
  const numbers = numbersElement.checked
  const symbols = symbolsElement.checked
  const password = generatePassword(charAmount, uppercase, numbers, symbols)
  passwordDisplay.innerText = password
})

function generatePassword(characterAmount, uppercase, numbers, symbols) {
  let charCodes = LOWER_CHAR_CODES
  if (uppercase) charCodes = charCodes.concat(UPPER_CHAR_CODES)
  if (symbols) charCodes = charCodes.concat(SYM_CHAR_CODES)
  if (numbers) charCodes = charCodes.concat(NUM_CHAR_CODES)
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharAmount(e) {
  const value = e.target.value
  amountNumber.value = value
  amountRange.value = value
}