let a = 0;
let map = new Map();

const memoryTree = {
    step: 0,
    rings: Array.from(document.querySelectorAll('.memory-ring')), 
    ringsShine: Array.from(document.querySelectorAll('.memory-ring__shine')),
    wavesShine: Array.from(document.querySelectorAll('.memory-wave__shine')),
    blackout: document.querySelector('.blackout'),
    animation: (t, delay, step, iterations, key) => {
        animationType = `shine ${t}s ${delay + step}s ease-in ${iterations} alternate ${key}`;
        return animationType;
    }
}

const shining = memoryTree.ringsShine.reverse().concat(memoryTree.wavesShine);
shining.forEach((ring) => {
    map.set(a, ring);
    a++;
});

const shiningRingBreath = (ring) => {
    ring.lastElementChild.style.animation = memoryTree.animation(1, 0, 0, 'infinite', 'forwards');
    ring.style.cursor = 'pointer';
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
    ring.style.cursor = 'default';
}

const shiningWaveExhale = () => {
    memoryTree.wavesShine.forEach((wave) => {
        wave.style.animation = 'none';
    })
}

const shiningWave = (memoryTree) => {
    memoryTree.rings.forEach((ring) => {
        ring.addEventListener('mouseover', () => {shiningRingBreath(ring)});
        ring.addEventListener('mouseout', () => {shiningRingExhale(ring)});
        ring.addEventListener('mouseover', shiningWaveBreath);
        ring.addEventListener('mouseout', shiningWaveExhale);
    })
}

const makeRings = (memoryTree) => {
    memoryTree.step = 0;
    memoryTree.rings.forEach((ring) => {
        ring.style.width = `${99 - memoryTree.step}vh`;
        ring.style.height = `${99 - memoryTree.step}vh`;
        ring.style.top = `${memoryTree.step/2}vh`;
        if (memoryTree.step === 0) {
            // второе кольцо
            memoryTree.step = memoryTree.step + 13;
        } else if (memoryTree.step === 13) {
            // третье кольцо
            memoryTree.step = memoryTree.step + 11;
        } else if (memoryTree.step === 24) {
            // четвёртое кольцо
            memoryTree.step = memoryTree.step + 5;
        } else if (memoryTree.step === 29) {
            // пятое кольцо
            memoryTree.step = memoryTree.step + 7;
        } else if (memoryTree.step === 36) {
            // шестое кольцо
            memoryTree.step = memoryTree.step + 14;
        } else if (memoryTree.step === 50) {
            // седьмое кольцо
            memoryTree.step = memoryTree.step + 13;
        } else if (memoryTree.step === 63) {
            // восьмое кольцо
            memoryTree.step = memoryTree.step + 9;
        } else {
            // девятое кольцо
            memoryTree.step = memoryTree.step + 12;
        }
        ring.addEventListener('click', (event) => {
            event.preventDefault();
            ring.firstElementChild.classList.add('memory-ring__lit_fade');
            memoryTree.blackout.classList.add('blackout_go');
            map.forEach((ring) => {
                ring.style.animation = 'none';
            })
            setTimeout(() => {memoryCollapse(memoryTree)}, 50);
            setTimeout(() => {
                location.href = ring.getAttribute('href');
                console.log(ring);
            }, 3200);
        })
    })
}

const memoryBlast = (memoryTree) => {
    memoryTree.step = 0;
    map.forEach((wave) => {
        wave.style.animation = memoryTree.animation(0.5, 0.1, memoryTree.step, 2, 'backwards');
        memoryTree.step = memoryTree.step + 0.05;
    })
    makeRings(memoryTree);
}

const memoryCollapse = (memoryTree) => {
    memoryTree.step = 0;
    map.forEach((wave) => {
        wave.style.animation = memoryTree.animation(0.5, 0.1, memoryTree.step, 2, 'backwards');
        memoryTree.step = memoryTree.step + 0.1;
    })
}

const closeYourEyes = (memoryTree) => {
    window.addEventListener('load', () => memoryBlast(memoryTree));
    setTimeout(() => {shiningWave(memoryTree)}, 1900);
}

closeYourEyes(memoryTree);
