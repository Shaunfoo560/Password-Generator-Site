const resChar = document.getElementById('result')
const lenChar = document.getElementById('length')
const upperChar = document.getElementById('uppercase')
const lowerChar = document.getElementById('lowercase')
const numChar = document.getElementById('numbers')
const symChar = document.getElementById('symbols')
const genChar = document.getElementById('generate')
const clipboard = document.getElementById('clipboard')

const generator = {
	lower: obtainLower,
	upper: obtainUpper,
	number: obtainNum,
	symbol: obtainSym
}

clipboard.addEventListener('click', () => {
	const textLoc = document.createElement('textArea')
	const password = resChar.innerText
	if(!password) {return}
	textLoc.value = password
	document.body.appendChild(textLoc)
	textLoc.select()
	document.execCommand('copy')
	textLoc.remove()
	alert('Copied to clipboard!')
})

genChar.addEventListener('click', () => {
	const len = lenChar.value
	const lowerPres = lowerChar.checked
	const upperPres = upperChar.checked
	const numberPres = numChar.checked
	const symbolPres = symChar.checked

	resChar.innerText = generatePassword(lowerPres, upperPres, numberPres, symbolPres, len)
})

function generatePassword(lower, upper, number, symbol, length) {
	let genPass = ''
	const typesCount = lower + upper + number + symbol
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
	if(typesCount === 0) {
		return 'Choose at least 1 option'
	}

	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0]
			genPass += generator[funcName]()
		})
	}
	const endPass = genPass.slice(0, length)
	return endPass
}

function obtainLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function obtainUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function obtainNum() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function obtainSym() {
	const symbols = '!@#$%^&*=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)]
}
