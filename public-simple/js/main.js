'use strict'




function onGetCars() {
     const elPre = document.querySelector('pre')

    fetch('/api/bug')
        .then(res => res.json())
        .then(bugs => elPre.innerText = JSON.stringify(bugs, null, 4))
}