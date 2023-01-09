const settings = {
    images: ['url(./images/frame-memory/IMG_2098.JPG)', 'url(./images/frame-memory/IMG_2125.JPG)', 'url(./images/frame-memory/IMG_2173.JPG)', 'url(./images/frame-memory/IMG_2231.JPG)', 'url(./images/frame-memory/IMG_2232.JPG)'],
    texts: ['«Лес - это очень важно. Он дает дому тепло и уют, дарит нам чистый воздух, физическое и психическое здоровье, приключения и свободу. В лесу были побеждены римляне, лес служил основой немецкой экономики, под деревьями зародился романтизм 18-ого века, и экологические движения 20-ого века»', 'Это попытка разговора о войне, о памяти о войне с точки зрения природы. Природа тоже участвует в военных действиях людей в качестве «театра действий», «поля действий», жертвы, порой используется как инструмент поражения (нефть, горящие леса, уничтоженные посадки и тд). А природа помнит, и накапливает «культурный слой» памяти о войне, о сражениях. Люди вводят монументы в память о погибших и восхваляя смелость и героизм павших людей, часто это происходит тоже на природе, но природа упускается как участник и пострадавший от этих действий. Мы хотим показать память, которую хранит земля, деревья. Под таким углом зрения теряется величие человека, павшие воины становятся удобрением для почвы, а цель их борьбы растворяется в просторе ландшафта.', 'Одно из самых разрушительных и жестоких людских проявлений – это война. И здесь природа в очередной раз оказывается на втором плане. Открытые пространства используют, как «поля битвы», леса и овраги, как укрытие. И если до ХХ века самым страшным военным орудием были огонь и пушки, последние 100 с лишним лет человечество значительно обогатило арсенал взаимного уничтожения ядерным, водородным и химическим оружием. Запоминает ли земля боль и ужас войны? Остаются ли у нее своеобразные антропологические шрамы? Или же ее фантастическая способность к регенерации способна нивелировать прошлое?', 'Гигантские мечи. В детстве мама рассказывала про атлантов, которые населяли Землю. Не могу отделаться от мысли, что это они оставили свое оружие. Хотя раньше всегда представляла атлантов безоружными.'],
    headerTitle: document.querySelector('.header__title'),
    visual: document.querySelector('.visual'),
    journals: document.querySelector('.journals'),
    popup: document.querySelector('.popup'),
    popupImage: document.querySelector('.popup__image'),
    popupText: document.querySelector('.popup__text')
}

const getImages = (settings) => {
    settings.images.reverse().forEach((image) => {
        const visualBlock = document.createElement('div');
        visualBlock.classList.add('visual__block');
        settings.visual.prepend(visualBlock);
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('visual__image');
        imageDiv.style.backgroundImage = `${image}`;
        visualBlock.append(imageDiv);
    });
}

const getJournals = (settings) => {
    settings.texts.forEach((text) => {
        const journalBlock = document.createElement('div');
        journalBlock.classList.add('journals__block');
        settings.journals.append(journalBlock);
        const journalParagraph = document.createElement('p');
        journalParagraph.classList.add('journal');
        journalParagraph.textContent = text;
        journalBlock.append(journalParagraph);
        const ournalDivMark = document.createElement('div');
        ournalDivMark.classList.add('journals__mark');
        journalBlock.append(ournalDivMark);
    });
}

const makeShrinkMouseover = (event) => {
    event.currentTarget.style.flexShrink = '9';
}

const makeShrinkMouseout = (event) => {
    event.currentTarget.style.flexShrink = null;
}

const makeShrinkClick = (element) => {
    if (!element.classList.contains('journals')) {
        event.currentTarget.style.flexShrink = null;         
    }
    if (element.classList.contains('visual__block_open')) {
        element.removeEventListener('mouseover', makeShrinkMouseover);
        element.removeEventListener('mouseout', makeShrinkMouseout);
    } else {
        element.addEventListener('mouseover', makeShrinkMouseover);
        element.addEventListener('mouseout', makeShrinkMouseout);
    }
}

const makeShrink = (settings) => {
    const visualElements = Array.from(settings.visual.children)
    visualElements.forEach((element) => {
        element.addEventListener('mouseover', makeShrinkMouseover);
        element.addEventListener('mouseout', makeShrinkMouseout);
        element.addEventListener('click', () => {makeShrinkClick(element)});
    })
}

const makeAnimation = () => {
    const journalArrey = Array.from(document.querySelectorAll('.journal'));
    journalArrey.forEach((journal, sequence) => {
        if ((sequence + 1) % 2 === 0) {
            journal.style.animationDirection = 'alternate-reverse';
        }
    })
}

const closePopup = () => {
    settings.popup.classList.remove('popup_condition_opened');
    settings.popup.classList.add('popup_condition_closed');
    settings.popupImage.style.backgroundImage = '';
    settings.popupText.textContent = '';
    closeVisualBlock();
}

const closeVisualBlock = () => {
    const visualBlocks = Array.from(document.querySelectorAll('.visual__block'));
    if (visualBlocks.some(block => {
        return block.classList.contains('visual__block_open');
    })) {
        visualBlocks.forEach((block) => {
            block.classList.remove('visual__block_open');
            block.firstElementChild.classList.remove('visual__image__in-color');
            settings.headerTitle.classList.remove('header__title_disappeared');
        })
    }
}

settings.popup.addEventListener('click', closePopup)

const makeImagesActive = (settings) => {
    const visualBlocks = Array.from(document.querySelectorAll('.visual__block'));
    visualBlocks.forEach((block) => {
        block.addEventListener('click', () => {
            block.classList.add('visual__block_open');
            block.firstElementChild.classList.add('visual__image__in-color');
            settings.headerTitle.classList.add('header__title_disappeared');
            settings.popupImage.style.backgroundImage = block.querySelector('.visual__image').style.backgroundImage;
            settings.popup.classList.remove('popup_condition_closed');
            settings.popup.classList.add('popup_condition_opened');
        })
    })
}

const makeJournalsActive = (settings) => {
    const journalsBlocks = Array.from(document.querySelectorAll('.journals__block'));
    journalsBlocks.forEach((block) => {
        block.addEventListener('click', () => {
            settings.popup.classList.remove('popup_condition_closed');
            settings.popup.classList.add('popup_condition_opened');
            settings.popupText.textContent = block.querySelector('.journal').textContent;
        })
    })
}

getImages(settings);

makeShrink(settings);

getJournals(settings);

makeAnimation();

makeImagesActive(settings);

makeJournalsActive(settings);