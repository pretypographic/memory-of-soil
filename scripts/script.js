document.addEventListener('click', (event) => {
    console.log(event.target)
})

const memoryTree = {
    rings: Array.from(document.querySelectorAll('.memory-ring')), 
    ringsShine: Array.from(document.querySelectorAll('.memory-ring__shine')),
    wavesLit: Array.from(document.querySelectorAll('.memory-wave__lit')),
    wavesShine: Array.from(document.querySelectorAll('.memory-wave__shine')),
    animation: (t, delay, step, iterations, key) => {
        animationType = `shine ${t}s ${delay + step}s ease-in ${iterations} alternate ${key}`;
        return animationType;
    }
}

const shiningRingBreath = (ring) => {
    ring.lastElementChild.style.animation = memoryTree.animation(1, 0, 0, 'infinite', 'forwards');
}

const shiningWaveBreath = () => {
    let step = 0;
    memoryTree.wavesShine.forEach((wave) => {
        wave.style.animation = memoryTree.animation(1, 0, step, 'infinite', 'forwards');
        step = step + 0.1;
    })
}

const shiningRingExhale = (ring) => {
    ring.lastElementChild.style.animation = 'none';
}

const shiningWaveExhale = () => {
    memoryTree.wavesShine.forEach((wave) => {
        wave.style.animation = 'none';
    })
}

const shiningWave = (memoryTree) => {
    memoryTree.rings.forEach((ring) => {
        ring.addEventListener('mouseover', shiningWaveBreath);
        ring.addEventListener('mouseout', shiningWaveExhale);
        ring.addEventListener('mouseover', () => {shiningRingBreath(ring)});
        ring.addEventListener('mouseout', () => {shiningRingExhale(ring)});
    })
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

const memoryBlast = () => {
    const shining = memoryTree.ringsShine.reverse().concat(memoryTree.wavesShine);
    let step = 0;
    shining.forEach((wave) => {
        wave.style.animation = memoryTree.animation(0.5, 0.1, step, 2, 'backwards');
        step = step + 0.05;
    })
    makeRings(memoryTree);
}

const closeYourEyes = (memoryTree) => {
    window.addEventListener('load', memoryBlast);
    setTimeout(() => {shiningWave(memoryTree)}, 1800);
}

closeYourEyes(memoryTree);
