// Data
const sentences = [
	'he jugado al ajedrez',
	'he roto un vaso',
	'he llamado mamá/papá a un/a profesor/a'
]

let current_index = 0

// Useful functions
const getNextSentence = ()=> {
	const sentence = sentences[current_index]
	current_index++
	if (current_index >= sentences.length) current_index = 0
	return sentence
}

const getRandomSentence = ()=> {
	const random_index = Math.floor(Math.random()*sentences.length)
	current_index = random_index+1
	return sentences[random_index]
}

// DOM Elements
const next = document.querySelector('#next')
const random = document.querySelector('#random')
const voice = document.querySelector('#audio')
const content = document.querySelector('#content')

// TTS checking
if (!('speechSynthesis' in window)) {
	voice.className += ' disabled'
}

next.onclick = ()=> {
	const sentence = random.className.includes('active') ? getRandomSentence() : getNextSentence()
	content.textContent = sentence
}

voice.onclick = ()=> {
	if (voice.className.includes('disabled')) return
	if (voice.className.includes('active')) {
		window.speechSynthesis.cancel()
	}
	else {
		voice.className += ' active'
		const voices = window.speechSynthesis.getVoices().filter(voice=> voice.lang === 'es-ES')
		const random_index = Math.floor(Math.random()*voices.length)
		const utterance = new SpeechSynthesisUtterance(`yo nunca ${content.textContent}`)
	  utterance.voice = voices[random_index]
	  utterance.onend = event=> voice.classList.remove('active')
		utterance.onerror = event=> voice.classList.remove('active')
		window.speechSynthesis.speak(utterance)
	}
}

random.onclick = ()=> random.classList.toggle('active')

next.onclick()