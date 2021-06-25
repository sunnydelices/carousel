'use strict'

import '@fortawesome/fontawesome-free/css/all.css'
import './style.scss'
import Flickity from 'flickity'
import 'flickity/css/flickity.css'

function addCell(i) {
    const divElement = document.createElement('div')
    divElement.classList.add(`carousel-cell`)
    divElement.classList.add(`cell-${i}`)
    const loaderElement = document.createElement("div");
    loaderElement.classList.add("loader")
    divElement.appendChild(loaderElement)
    document.querySelector('.carousel')?.appendChild(divElement)
}

async function getImageUrl() {
    try {
        const response = await fetch('https://picsum.photos/300/300')
        return response.url
    } catch (error) {
        console.log(error)
    }
}

async function loadImage (i) {
    const imgElement = document.createElement('img')
    imgElement.classList.add('carousel-cell-image')
    const urlImg = await getImageUrl()
    imgElement.setAttribute('src', urlImg)
    const cellElement = document.querySelector(`.cell-${i}`)
    cellElement.removeChild(cellElement.querySelector(`.loader`))
    cellElement.appendChild(imgElement)
}

function initCarousel (nbImages) {
    for (let i = 0; i < nbImages; i++) {
        addCell(i)
        loadImage(i)
    }
    const flkty = new Flickity('.carousel', {
        "wrapAround": true
    })
}

const ready = (callback) => {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    /* Do things after DOM has fully loaded */
    initCarousel(10)
})


