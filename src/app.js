// FILES
import logo from './assets/throwcode.png'
import soundtrack from './assets/amongus.mp3'

// STYLES
import './css/stars.css'
import './css/input.css'
import './css/index.css'
import './css/github-corner.css'

// SCRIPTS
import './js/events'
import students from './assets/students.json'


const ost = document.getElementById('ost')

ost.volume = .2
ost.src = soundtrack
ost.playbackRate = 1.1

document.getElementById('logo').src = logo
document.addEventListener('click', async _ => await ost.play())

const cards = document.getElementsByClassName('copy')

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    let copyButton = card.querySelector('.card-head .copy-clipboard')
    copyButton.addEventListener('click', () => {
        card.querySelector('.card-body .card-content').select()
        document.execCommand('copy')
        copyButton.classList.add('active')
        
        window.getSelection().removeAllRanges()
        setTimeout(() => {
            copyButton.classList.remove('active')
        }, 1000);
    })
}

// LOADING STUDENTS
const ul = document.getElementById('students')
students.forEach(student => {
    if (!document.getElementById(student.name)) {
        ul.innerHTML += (`
            <li id="${student.name}" title="${student.fullName}">
                <img class="student-profile" src=${student.src} alt="#" loading="lazy">
                <a href=${student.github} target="_blank">${student.name}</a>
            </li>
        `)
    }
})