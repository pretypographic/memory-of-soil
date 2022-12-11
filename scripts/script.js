document.addEventListener('click', (event) => {
    console.log(event.target)
})

const memoryTree = {
    rings: Array.from(document.querySelectorAll('.memory-ring')), 
    wavesLit: Array.from(document.querySelectorAll('.memory-wave__lit')),
    wavesShine: Array.from(document.querySelectorAll('.memory-wave__shine'))
}

const makeRings = (memoryTree) => {
    let step = 0;
    memoryTree.rings.forEach((ring) => {
        ring.style.width = `${99 - step}vh`;
        ring.style.height = `${99 - step}vh`;
        ring.style.top = `${step/2}vh`;
        if (step === 0) {
            // второе кольцо
            step = step + 13;
        } else if (step === 13) {
            // третье кольцо
            step = step + 11;
        } else if (step === 24) {
            // четвёртое кольцо
            step = step + 5;
        } else if (step === 29) {
            // пятое кольцо
            step = step + 7;
        } else if (step === 36) {
            // шестое кольцо
            step = step + 14;
        } else if (step === 50) {
            // седьмое кольцо
            step = step + 13;
        } else if (step === 63) {
            // восьмое кольцо
            step = step + 9;
        } else {
            // девятое кольцо
            step = step + 12;
        }
    })
}

makeRings(memoryTree);

const shiningWaveBreath = () => {
    let step = 0;
    // memoryTree.wavesLit.forEach((wave) => {wave.style.opacity = 0.9;})
    memoryTree.wavesShine.forEach((wave) => {
        wave.style.animation = `shine 1s ${0.6 + step}s ease-out infinite alternate forwards`;
        step = step + 0.2;
    })
}

const shiningWaveExhale = () => {
    // memoryTree.wavesLit.forEach((wave) => {wave.style.opacity = 0;})
    memoryTree.wavesShine.forEach((wave) => {
        wave.style.animation = 'none';
    })
}

const shiningWave = (memoryTree) => {
    memoryTree.rings.forEach((ring) => {
        ring.addEventListener('mouseover', shiningWaveBreath)
        ring.addEventListener('mouseout', shiningWaveExhale)
    })
}

shiningWave(memoryTree);