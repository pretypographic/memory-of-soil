"use strict";

// images and videos
import images from "../media/images/data.js";
import bloodstone_v2 from "../media/videos/frame-memory/bloodstone_v2.mp4";
import poster03_blood_stone_v2 from "../media/videos/frame-memory/poster03_blood_stone_v2.jpg";
import poster03_blood_stone_v2gif from "../media/videos/frame-memory/MEMORY_blood stone_v2.gif";
import flower_2 from "../media/videos/frame-illusion/flower 2.mp4";
import poster_flower2 from "../media/videos/frame-illusion/poster_flower2.jpg";
import Polina_1 from "../media/videos/frame-human/Polina_1.mp4";
import poster_Polina_1 from "../media/videos/frame-human/poster_Polina_1.jpg";
import fist_v2 from "../media/videos/frame-conflict/fist_v2.mp4";
import poster_fist_v2 from "../media/videos/frame-conflict/poster_fist_v2.jpg";
import dancing_stone from "../media/videos/frame-movement/dancing_stone.mp4";
import poster_dancing_stone from "../media/videos/frame-movement/poster_dancing_stone.jpg";
import DSCF0823_30sec from "../media/videos/frame-movement/DSCF0823_30sec.mp4";
import poster_DSCF0823_30sec from "../media/videos/frame-movement/poster_DSCF0823_30sec.jpg";
import MVI_5637 from "../media/videos/frame-movement/MVI_5637.mp4";
import poster_MVI_5637 from "../media/videos/frame-movement/poster_MVI_5637.jpg";
import Polina_2v2 from "../media/videos/frame-movement/Polina_2v2.mp4";
import poster_Polina_2v2 from "../media/videos/frame-movement/poster_Polina_2v2.jpg";
import fog from "../media/videos/frame-time/fog.mp4";
import poster_fog from "../media/videos/frame-time/poster_fog.jpg";
import timelapse from "../media/videos/frame-time/timelapse.mp4";
import poster_timelapse from "../media/videos/frame-time/poster_timelapse.jpg";
import phone_bie0m3c0sdoo from "../vendor/icons/phone_bie0m3c0sdoo.svg";
import computer_icn from "../vendor/icons/computer-1294809.svg";
import laptop_icn from "../vendor/icons/laptop-2243898.svg";

// sounds
import тихий_стрекот from "../media/audio/14.тихий стрекот.mp3";
import ZOOM0049_LR from "../media/audio/ZOOM0049_LR.wav";
import птицы from "../media/audio/19.птицы.mp3";
import колокола from "../media/audio/1.колокола.mp3";
import стук_по_меди_статуй from "../media/audio/3.стук по меди статуй.mp3";
import шаги from "../media/audio/8.шаги_человек.mp3";
import стрекот_цикад_4 from "../media/audio/5.стрекот цикад.mp3";
import журчание_воды from "../media/audio/16.журчание воды.mp3";
import стрекот_цикад_5 from "../media/audio/6.стрекот цикад.mp3";

const main = {
  indicator: {
    eng: "loading...",
    rus: "загрузка..."
  },
  coreInterfaceLabels: {
    screen: {
      eng: "expand/collapse screen (F)",
      rus: "развернуть/свернуть экран (F)"
    },
    sound: {
      eng: "on/off sound (M)",
      rus: "вкл/откл звук (M)"
    }
  },
  languages: ["eng", "rus"],
  navElement: {
    eng: "back",
    rus: "обратно"
  },
  about: {      
    eng: "about",
    rus: "о проекте"
  },
  rings: {
    eng: "rings",
    rus: "кольца"
  },
  audio: тихий_стрекот
};

const intro = {
  introduction: {
    rus: "Для лучшего погружения мы рекомендуем использовать ноутбук в полноэкранном режиме и наушники. Вы можете включить/выключить звук и перейти в полноэкранный режим в левом нижнем углу.",
    eng: "For a better immersion experience, we recommend using a laptop in full-screen mode and headphones. You can turn on/off the sound and switch to fullscreen mode in the lower left corner."
  },
  phoneAdvise: {
    rus: "Наш сайт доступен только на компьютере. Для полного погружения, пожалуйста, откройте его на ПК или ноутбуке.",
    eng: "Our website is only available on a desktop. For the best experience, please access it using a computer or laptop."
  },
  partingWords: {
    rus: "Наша история нелинейна. Вы можете просматривать главы (кольца) в любом порядке. Приятного путешествия!",
    eng: "Our story is nonlinear. You are free to explore the chapters (rings) in any order. Have a nice journey!"
  },
  button: {
    rus: "начать",
    eng: "begin"
  },
  imgSrc: laptop_icn
}

const instruction = {
  column: {
    eng: [
      [
        'Motivation',
        'On the 24th of February 2022, a full invasion of the territory of Ukraine by the army of the Russian Federation began. As we were born and raised in Russia, this conflict has influenced our lives. Mariam moved to Tbilisi in 2014, when Russian troops annexed Crimea, Liza and Polina in the spring of 2022. The war made us think more deeply about the nature of conflicts, historical memory, and peacebuilding.',
      ], [
        'Methods',
        'With this project we wanted to challenge the anthropocentric approach to thinking and perceiving conflict, war, and memories of war. It is an attempt to look at these from the perspective of nature.',
        'When starting this project, we first thought of a toponymy of various locations that are named after battles. One of the most famous historical events in Georgia is the Battle of Didgori between the Georgian army and the Seljuks. There is a monument dedicated to this battle on Didgori Hill in the Kvemo Kartli region of Georgia.',
        'Our method led us to embark on a 3-day journey divided into two parts: first, we explored the monument itself and the surrounding area of Didgori Hill, then we went on a hiking trip to the Algeti National Park located nearby.',
        'Though, it does not matter what battle or monument we choose. The concept stays.',
      ], [
        'Inspiration',
        'The indigenous peoples of North America captured history through small paintings in the form of spirals, it is called Winter Count.',
        'They selected and recorded one event to represent the previous year. This event became central to the Winter Count—drawn at the center of the piece. Additional symbols would follow in a spiral, beginning with the main event and then continuing in chronological order, earliest to latest, as the spiral grew outward.',
        'You may choose your own path to explore the content of the project - from center to the outer edge, vice versa, or in a random order.',
        'There are 9 thematic blocks containing photo, video, audio, and texts.',
        'Enjoy your journey!',
      ]
    ],
    rus: [
      [
        'Мотивация',
        '24 февраля 2022 года армия Российской Федерации начала полномасштабную войну против Украины. Этот конфликт повлиял на нашу жизнь, ведь мы родились и выросли в России. Мариам переехала в Тбилиси ещё в 2014 году, когда российские войска аннексировали Крым. Лиза и Полина — весной 2022 года. Война сподвигла нас глубже исследовать природу конфликтов, историческую память и способы восстановления мира.'
      ], [
        'Методы',
        'Данный проект это попытка уйти от антропоцентрического способа размышления о конфликте, войне и памяти о ней. Мы хотим посмотреть на эти вопросы с точки зрения природы.',
        'Мы начали работу над проектом с анализа топонимов разных мест, названных в честь сражений. В Грузии одним из самых значимых исторических событий считается Дидгорская битва между грузинской армией и сельджуками. Этому сражению посвящен памятник на холме Дидгори, в районе Квемо-Картли, Грузия.',
        'Мы совершили 3-х дневное путешествие в те места и разделили его на 2 части: сначала исследовали сам монумент и окрестности Дидгорского холма, затем отправились в поход в Национальный парк Алгети, который находится поблизости.',
        'В целом, не так важно, о каком сражении или монументе мы говорим. Концепция будет везде схожа.',
      ], [
        'Вдохновение',
        'Есть свидетельства того, что коренные жители Северной Америки записывали историю, делая маленькие рисунки по спирали, это называлось Winter Count.',
        'Они выбирали одно событие, которое было самым значимым в прошедшем году, и оно становилось центральным. Вокруг него по спирали в хронологическом порядке они дорисовывали последующие, и тем самым расширяли круг.',
        'По аналогии с Winter count, мы расположили темы проекта кольцами. Однако вы можете выбрать свой собственный путь для изучения проекта — от центра к краю, наоборот или в произвольном порядке.',
        'Здесь 9 тематических блоков, содержащих фото, видео, аудио и тексты.',
        'Приятного путешествия!',
      ]
    ]
  },
  names: {
    eng: [
      [
        false,
        'author',
        'Liza Tezneva'
      ], [
        false,
        'author',
        'Polina Shubina'
      ], [
        false,
        'author',
        'Mariam Pesvianidze'
      ], [
        false,
        'web',
        'Aleksandr Phess'
      ], [
        false,
        'design',
        'Ilya Zharkin'
      ], [
        false,
        'VFX animation',
        'Emile Khafizov'
      ]
    ],
    rus: [
      [
        false,
        'автор',
        'Лиза Тезнева'
      ], [
        false,
        'автор',
        'Полина Шубина'
      ], [
        false,
        'автор',
        'Мариам Песвианидзе'
      ], [
        false,
        'web',
        'Александр Фэс'
      ], [
        false,
        'дизайн',
        'Илья Жаркин'
      ], [
        false,
        'VFX анимация',
        'Эмиль Хафизов'
      ]
    ]
  }
}

const data = {
  memory: {
    title: {
      rus: 'память',
      eng: 'memory',
    },
    images: images.frames.memory,
    video: [
      {
        video: bloodstone_v2,
        image: poster03_blood_stone_v2,
        format: 'viewing__video_type_a'
      }
    ],
    texts: {
      rus: [
        [false, `Природа помнит, и накапливает «культурный слой» памяти о войне, о сражениях. Люди возводят монументы в память о погибших, восхваляя смелость и героизм павших, но природа упускается, как участник, пострадавший от военных действий. Мы хотим показать память, которую хранит земля, деревья. Под таким углом зрения теряется величие человека, павшие воины становятся удобрением для почвы, а цель их борьбы растворяется в просторе ландшафта.`],
        [false, `Гигантские мечи. В детстве мама рассказывала про атлантов, которые населяли Землю. Не могу отделаться от мысли, что это они оставили свое оружие. Хотя раньше всегда представляла атлантов безоружными. (Лиза)`],
        [false, `Войны былых поколений врастают памятниками на тихих лугах и здесь тот самый случай. Почва принимает всех и вся, не делая исключений. Испытывает ли она боль от людских конфликтов? Есть ощущение, что нет. Ибо на любое действие, у природы есть противодействие, мудрый и расчетливый ответ.`],
        [false, `«Лес - это очень важно. Он дает дому тепло и уют, дарит нам чистый воздух, физическое и психическое здоровье, приключения и свободу. В лесу были побеждены римляне, лес служил основой немецкой экономики, под деревьями зародился романтизм 18-ого века, и экологические движения 20-ого века» (отрывок из книги “Тайная жизнь деревьев” Петера Вольлебена)`],
        [false, `Запоминает ли земля ужас войны? Остаются ли у нее своеобразные антропологические шрамы? Или же ее фантастическая способность к регенерации способна нивелировать прошлое?`],
      ],
      eng: [
        [false, `Nature remembers and accumulates a "cultural layer" of memory about war and battles. Humans construct monuments to remember the fallen and praise the bravery and heroism of those who lost their lives. The battles are often held in natural surroundings. However, nature is overlooked as a participant and a sufferer in these actions. We want to highlight the memory preserved by the earth and trees. From this perspective, the grandeur of humans is lost, fallen warriors become fertilizers for the soil, and the purpose of their struggle dissolves in the vastness of the landscape.`],
        [false, `Giant swords. In my childhood, my mom used to tell me about the Atlanteans who inhabited the Earth. I can't shake the thought that it was they who left behind their weapons, although I always imagined the Atlanteans as unarmed. (Liza)`],
        [false, `Wars of past generations grow into monuments on quiet meadows, and here is one such case. The soil embraces everyone and everything, making no exceptions. Does it feel the pain of human conflicts? There is a feeling that it does not. For every action, nature has a counteraction, a wise and calculated response.`],
        [false, `"The forest is incredibly important. It provides warmth and coziness to our homes, gives us clean air, physical and mental health, adventures, and freedom. In the forest, the Romans were defeated, the German economy was built upon its resources, the Romanticism of the 18th century emerged under its trees, and the environmental movements of the 20th century were born." (extract from the book ‘The Hidden Life of Trees’ by Peter Wohlleben)`],
        [false, `Does the soil remember the horror of war? Does it bear anthropological scars? Or does its fantastic regenerative ability have the power to neutralize the past?`],
      ]
    },
    textStyleType: 'a',
    sound: тихий_стрекот
  },
  illusion: {
    title: {
      rus: 'иллюзия',
      eng: 'illusion',
    },
    images: images.frames.illusion,
    video: [
      {
        video: flower_2,
        image: poster_flower2,
        format: 'viewing__video_type_b'
      }
    ],
    texts: {
      rus: [
        [false, `В голову затекает река и мыслей не остается.`],
        [false, `Основные чувства и эмоции - обман зрения, иллюзия присутствия. В конце поездки нас подвозил человек, который в свое время участвовал в строительстве монумента Дидгори и он рассказал нам, что на самом деле битва была в каком-то совершенно другом месте. На территории, определенной под монумент не было найдено ни человеческих останков, ни оружия, ничего.`],
        [false, `Доносится шум воды издалека`,
        `До водопада пол часа`,
        `Думали мы тогда`],
        [false, `Доверившись картам google, мы смело устремились к водопаду Тавкавта. Мы шли по  раскаленному асфальту и голым травянистым холмам, затем зашли в лесную чащу. Мы шли четвертый час, но к нашему разочарованию дорога закончилась вершиной, на которой нас встретили свежепокрашенный красный крест, крепость и недостроенная церковь. Никакого водопада поблизости мы так и не обнаружили. Но зато там была отличная сотовая связь, которой не было большую часть пути.`],
        [false, `К нам подошла женщина и позвала к столу, по-английски. Было неловко отказаться, мы пошли. Когда нас спросили и услышали в ответ, откуда мы, повисла неловкая пауза и ощущение дискомфорта и разочарования. Мужчина, который был главным по приему гостей, попросил меня сказать тост по-английски несмотря на то, что весь стол очевидно говорил только по-грузински и по-русски. Я пыталась говорить хорошие слова про культуру, природу и людей Грузии. Но меня не понимали. Когда я завершила тост, никто кроме меня бокал не поднял. (Полина)`],
      ],
      eng: [
        [false, `The river flows into my mind, and there are no thoughts left.`],
        [false, `The main feelings and emotions - visual deception, the illusion of presence. At the end of the trip, we were given a ride by a man who had been involved in the construction of the Didgori monument, and he told us that the battle actually took place in a completely different location. There were no human remains, no weapons, nothing found in the area designated for the monument.`],
        [false, `The sound of water can be heard from afar`, 
        `It's half an hour to the waterfall`,
        `That's what we then thought`],
        [false, `Trusting Google Maps, we boldly set off towards the Tavkavta Waterfall. We walked along scorching asphalt and bare grassy hills, then entered a forested area. We walked for four hours, but to our disappointment, the road ended at a peak where we were greeted by a freshly painted red cross, a fortress, and an unfinished church. We never discovered any nearby waterfall. However, there was excellent cell phone reception there, which was absent for most of the way.`],
        [false, `A woman approached us speaking English and invited us to a table. It felt awkward to refuse, so we went along. When we were asked about our origins and they heard our response, an uncomfortable pause hung in the air, accompanied by a sense of discomfort and disappointment. The man in charge of receiving guests asked me to make a toast in English, despite the fact that everyone at the table clearly spoke only Georgian and Russian. I tried to speak kind words about the culture, nature, and people of Georgia, but I wasn't understood. When I finished the toast, no one raised their glass except for me. (Polina)`],
      ]
    },
    textStyleType: 'c',
    sound: ZOOM0049_LR
  },
  revelations: {
    title: {
      rus: 'откровения',
      eng: 'revelations',
    },
    images: images.frames.revelations,
    video: false,
    texts: {
      rus: [
        [false, `Я трусиха. Я бесконечно люблю природу, ценю ее, пытаюсь постоянно осознавать, что я ее часть, но оставшись с ней наедине, я робею.`,
        `Мне становится страшно как только приходит темнота, я боюсь хищников, я боюcь насекомых. В связке с этим, я осознала, насколько природа мощная и самостоятельная. Насколько она подвижная и адаптивная. Природа - не незабытая жертва, а забытый участник. Природа - не фон для человеческих передряг, а среда, обстоятельства и последствия. (Полина)`],
        [false, `Не могу найти хаос здесь. Видимо не так глубоко зашли, поэтому все кажется слишком гармоничным. (Лиза)`],
        [false, `Чувство голода приятно, чувство жажды ужасно и пугающе. (Лиза)`],
        [false, `Ощущение, что я кого-то не встретила. Кажется, что это чувство появляется при каждом походе в лес. (Лиза)`],
        [false, `Открытия - всегда проверяй точку, найденную на google картах дополнительным поиском, и набирай воду в каждом встречном источнике. (Мари)`],
        [false, `Мы были внимательны к природе. Мы прислушивались, присматривались и наблюдали. Это сказалось и на наших межличностных отношениях. Мы были очень спокойны и адаптивны, мы поддерживали, но при этом были независимы и самостоятельны. (Полина)`],
        [false, `Рокот насекомых повсюду`,
        `Мы следуем по маршруту`,
        `Сквозь цветения буйство`],
      ],
      eng: [
        [false, `I am a coward. I love nature endlessly, I value it, and I constantly try to remind myself that I am a part of it. However, when I find myself alone with nature, I become timid.`, 
        `As soon as darkness falls, I become afraid. I fear wild animals, I fear insects. In parallel with this, I have realized how powerful and independent nature is. How it is mobile and adaptable. Nature is not a forgotten victim but a forgotten participant. Nature is not a backdrop for human troubles but an environment, circumstances, and consequences. (Polina)`],
        [false, `I cannot find chaos here. Perhaps we haven't delved deep enough, so everything seems too harmonious. (Liza)`],
        [false, `The feeling of hunger is pleasant, while the feeling of thirst is awful and frightening. (Liza)`],
        [false, `I feel like I haven't met someone. It seems that this sensation arises with every trip to the forest. (Liza)`],
        [false, `Discoveries - always verify the location found on Google Maps with additional research, and fill up water at every water source you encounter. (Mari)`],
        [false, `We were attentive to nature. We listened, observed, and paid close attention. This had an impact on our interpersonal relationships. We were very calm and adaptable, providing support while also being independent and self-reliant. (Polina)`],
        [false, `The buzzing of insects is everywhere`,
        `We follow the route`,
        `Through the riot of blossoms`],
      ]
    },
    textStyleType: 'c',
    sound: птицы
  },
  monument: {
    title: {
      rus: 'монумент',
      eng: 'monument',
    },
    images: images.frames.monument,
    video: false,
    texts: {
      rus: [
        [false, `Очень жарко, горячий бетон. Сверчки. Мухи. Ящерицы. Множество полевых цветов.`,
        `Шоти (хлеб) под крестом. 43 огромных меча, будто ножи, вонзаются в тело холма. Больно смотреть.`],
        [false, `Огромных масштабов монумент. Античность, величие, монументальность. Длинная лестница восходящая к вершине холма. Бетонная сцена, колонны, которые подпирают пустоту. На сцене – акустика создающая эхо.`],
        [false, `Дидгорская битва — сражение, которое произошло 12 августа 1121 года между войсками Грузинского царства и сельджукскими войсками. Сражение привело к разгрому сельджукской армии и освобождению Тбилиси, который стал столицей страны. С этого момента начался «Золотой Век» грузинской истории. Битва широко упоминается в грузинском фольклоре и культуре.`],
      ],
      eng: [
        [false, `It's very hot. Concrete is scorching. Crickets, flies and a lizard. Multitude of wildflowers.`,
        `There's "shoti" bread placed under the main cross. Forty-three enormous swords, like knives, are cutting through the body of the hill. It's painful to see.`],
        [false, `It is a monument of immense scale. Antiquity, grandeur, and monumentality. A long staircase ascends to the top of the hill. There is a concrete stage with columns that support the void. On the stage, the acoustics creates echoes.`],
        [false, `The Battle of Didgori was a conflict that occurred on August 12, 1121, between the forces of the Georgian Kingdom and the Seljuks. The battle resulted in the defeat of the Seljuk army and the liberation of Tbilisi, which became the capital of the country. From that moment, the "Golden Age" of Georgian history began. The battle is widely mentioned in Georgian folklore and culture.`],
      ]
    },
    textStyleType: 'b',
    sound: колокола
  },
  war: {
    title: {
      rus: 'война',
      eng: 'war',
    },
    images: images.frames.war,
    video: false,
    texts: {
      rus: [
        [false, 'Одно из самых разрушительных и жестоких людских проявлений – это война. И здесь природа в очередной раз оказывается на втором плане. Открытые пространства используют, как «поля битвы», леса и овраги, как укрытие. И если до ХХ века самым страшным военным орудием были огонь и пушки, последние 100 с лишним лет человечество значительно обогатило арсенал взаимного уничтожения ядерным, водородным и химическим оружием.'],
        [false, 'Вокруг разбросаны бронзовые абстрактные и полу-абстрактные фигуры. Напоминают костяшки, позвонки, бедра. Непогребенные кости воинов или коней, которым пришлось участвовать в сражении людей. Что-то в этих фигурах было инородное, другая эстетика, непонятность, абсурдность, как и суть войны/сражений.'],
        [false, 'Один мужчина нарушил повисшее молчание, и предложил выпить “за нашу страну Грузию, ее культуру и историю”. Затем, второй предложил выпить за Грузию, у которой было много великих побед и будет еще.. После этого нам намекнули, что ритуал окончен и нам можно уходить.'],
      ],
      eng: [
        [false, 'One of the most destructive and cruel human manifestations is war, and once again, nature finds itself in the background. Open spaces are used as "battlefields," forests and ravines as hiding places. While fire and cannons were once the most terrifying military weapons until the 20th century, in the past century humanity has significantly enriched its arsenal of mutual destruction with nuclear, hydrogen, and chemical weapons.'],
        [false, 'Scattered around are bronze abstract and semi-abstract figures. They resemble bone fragments, vertebrae, and femurs. Unburied bones of warriors or horses forced to participate in human battles. There is something foreign in these figures, a different aesthetic, an incomprehensibility, an absurdity, much like the essence of war and conflict itself.'],
        [false, 'The silence was broken by one man who suggested raising a toast ‘to our country, Georgia, its culture, and its history’. Then the other proposed to drink ‘to Georgia, which had achieved many great victories and would continue to do so.’ After that, we were subtly signaled that the ritual was over and we could leave.'],
      ]
    },
    textStyleType: 'b',
    sound: стук_по_меди_статуй
  },
  human: {
    title: {
      rus: 'человек',
      eng: 'human',
    },
    images: images.frames.human,
    video: [
      {
        video: Polina_1,
        image: poster_Polina_1,
        format: 'viewing__video_type_c'
      }
    ],
    texts: {
      rus: [
        [false, `Человек чаще воспринимает природу, как фон, а не, как главного героя своей деятельности. Тем временем мир вокруг нас живой и он чувствует и понимает не меньше, а то и больше, чем нам позволяют наши ограниченные формы восприятия.`],
        [false, `Зачем нужны чучела животных? Экспонат репрезентирует объект, существо, которое существует в природе. Но это чучело никак не отображает реальное животное. Скорее эти чучела показывают, как люди полвека назад представляли животных, словно выкопанные из-под земли предметы быта – древние ложки и оружие. Как интересно и точно смотрелись бы кадры с фотоловушек в музее.`,
        `Узнавание растений. Мы вырвали растения из своей привычной жизни и пришли в музей узнать, как же их на самом деле зовут. Звучит довольно кровожадно.`],
        [false, `Поход не кажется легким и тело постоянно болит, но без острой боли.`],
        [false, `В пути мы так и не встретили других людей (что впрочем нас обрадовало), но следы былого присутствия человека нам попадались: редкий мусор, следы от автомобиля, места для очага, поле, усеянное картошкой и древние каменные постройки. Из-за жары и тяжелых рюкзаков идти было сложно, но нас манила идея водопада.`],
      ],
      eng: [
        [false, `A person often perceives nature as a backdrop rather than the main protagonist of their activities. Meanwhile, the world around us is vibrant, and it feels and understands no less, if not more, than our limited forms of perception allow us.`],
        [false, `What is the purpose of animal taxidermy? The exhibit represents an object, a creature that exists in nature. However, this taxidermy does not accurately depict the real animal. Instead, these specimens show how people imagined animals half a century ago, like household objects dug up from the ground — ancient spoons and weapons. How interesting and accurate it would be to have camera trap footage in the museum.`,
        `Plant identification. We have uprooted plants from their natural habitat and came to the museum to learn their true names. Sounds quite bloodthirsty.`],
        [false, `The hike doesn't feel easy, and my body is constantly aching, but without sharp pain.`],
        [false, `During our journey, we didn't encounter any other people (which actually pleased us), but we came across traces of human presence: occasional litter, tire tracks, fire pits, a field sown with potatoes, and ancient stone structures. It was difficult to walk due to the heat and heavy backpacks, but the idea of reaching a waterfall strengthened us.`],
      ]
    },
    textStyleType: 'c',
    sound: шаги
  },
  conflict: {
    title: {
      rus: 'конфликт',
      eng: 'conflict',
    },
    images: images.frames.conflict,
    video: [
      {
        video: fist_v2,
        image: poster_fist_v2,
        format: 'viewing__video_type_a'
      }
    ],
    texts: {
      rus: [
        [false, `Деревья - это не личности, это множественность. И они живут понятием “мы”, а не “я”. Таким образом и конфликт перестает быть “личным”.`],
        [false, `Кажется, гармония построена в том числе на мелких конфликтах. Сосуществование, наверное, невозможно без конфликтов? Развитие, возможно не будет происходить без них? Борьба за солнце, за еду, за лучшее местечко в лесу. Но эти конфликты не переходят границы реальных потребностей. И нередко, один осознав свое бессилие, безропотно отступает. Конфликты неминуемы. Они происходят постоянно, на микроуровне, изредка переходя в макро.`],
        [false, `Вьюн вьется вокруг дерева. Дерево не убегает, оно подчиняется. Умирая они продолжают сосуществовать. Дерево умирает “в объятиях” вьюна.`],
        [false, `Конфликт естественен. Возможен ли баланс в конфликте? Конфликт – это убийство и соперничество или это подавление чужих интересов?`,
        `Конфликт – это насилие. Природа невозможна без насилия.`,
        `Сильный убивает слабого – закон сформированный природой. Но сформулировал его человек. Возможна ли свобода в природе или все подчинено строгим законам? Может быть, при отклонении от этого закона возникает конфликт?`,
        `Конфликт и гармония противоположны или могут сосуществовать?`,
        `Конфликт оставляет след, память.`],
        [false, `На третий день мы играли в “Морской бой”.`,
        `Думаю, что конфликт это основа бытия. Борьба света и тьмы, как концепция и в целом противостояние, как состояние. Этот мир не может пребывать в абсолютной безмятежности. Даже, если в нем все спокойно с точки зрения событий, контраст/конфликт будет в цвете, свете, композиции или звуке. Эта “сильная доля” все равно будет возникать. И, кстати, я выиграла в “Морской бой”. Но надо отдать должное - я же и предложила в него играть. (Мариам)`],
      ],
      eng: [
        [false, `Trees are not individual entities; they are a plurality. And they live by the notion of "we" rather than "I." Thus, conflicts cease to be "personal."`],
        [false, `It seems that harmony is built, in part, on minor conflicts. Perhaps coexistence is impossible without conflicts? Is it possible that progress will not occur without them? The struggle for sunlight, for food, for the best spot in the forest. However, these conflicts do not surpass the boundaries of real needs. And often one, realizing their powerlessness, retreats without resistance. Conflicts are inevitable. They occur constantly, at a micro level, occasionally escalating to a macro level.`],
        [false, `The vine twines around the tree. The tree does not flee; it obeys. Even after death, they continue to coexist. The tree dies "in the embrace" of the vine.`],
        [false, `Conflict is natural. Is balance possible in conflict?`, 
        `Conflict is violence. Nature is impossible without violence.`,
        `The strong kill the weak - a law formed by nature. But it was formulated by humans.`,
        `Is freedom possible in nature, or is everything subject to strict laws? Perhaps conflict arises when deviating from this law?`,
        `Are conflict and harmony opposite or can they coexist?`,
        `Conflict always leaves a trace, a memory. What is the purpose of conflict?`],
        [false, `On the third day we played "Battleship."`,
        `I believe that conflict is the foundation of existence. The struggle between light and darkness, as a concept and as a state of opposition in general. This world cannot exist in absolute tranquility. Even if everything is calm in terms of events, there will still be contrast/conflict in color, light, composition, or sound. That "strong element" will inevitably arise. By the way, I won in "Battleship." It should be mentioned though, I was the one who suggested playing it. (Mariam)`],
      ]
    },
    textStyleType: 'b',
    sound: стрекот_цикад_4
  },
  movement: {
    title: {
      rus: 'движение',
      eng: 'movement',
    },
    images: false,
    video: [
      {
        video: dancing_stone,
        image: poster_dancing_stone,
        format: 'viewing__video_type_a'
      }, {
        video: DSCF0823_30sec,
        image: poster_DSCF0823_30sec,
        format: 'viewing__video_type_c'
      }, {
        video: MVI_5637,
        image: poster_MVI_5637,
        format: 'viewing__video_type_c'
      }, {
        video: Polina_2v2,
        image: poster_Polina_2v2,
        format: 'viewing__video_type_c'
      }
    ],
    texts: {
      rus: [
        [false, `Природа владеет невероятным балансом, вестибулярным аппаратом, подвижностью, адаптивностью. Так как она расслаблена и состоит из множества разрозненных элементов.`,
        `Это как в танце - если быть напряженным, и стоять колом, ты очень неустойчив. Если иметь мягкое тело, подвижность, адаптивность, а еще лучше танцевать не “против”, а “вместе” с полом, стульями, людьми вокруг, стенами или землей, деревьями, водой, танец может быть бесконечным и ошеломляюще красивым.`],
        [false, `Утро тумана. На горы сверху спускается густой туман. Только один раз увидела сквозь облака белый круг солнца. Птицы с раннего утра заняты своими делами - кто-то летит по долине между холмов, кто-то парит в небе, кто-то бегал по камню как ящерица, кто-то стучит по дереву. (Полина)`],
        [false, `Для меня самый понятный, натуральный способ общения/взаимодействия с природой - это движение: бегать, танцевать, лежать, ползать, подражать, повторять линии, повторять движения, повторять характер. (Полина)`],
        [false, `Вода в разных фазах реки падает с разным звуком и ритмом.`],
      ],
      eng: [
        [false, `Nature possesses an incredible balance, a vestibular system, mobility, and adaptability. It is relaxed and consists of a multitude diverse elements.`,
        `It is like a dance - if you're tense and standing rigid, you're very unstable. But if you have a soft body and dance not "against" but "with" the floor, chairs, people, walls, or earth, trees, and water, the dance can be endless and stunningly beautiful.`],
        [false, `Misty morning. Dense fog descends upon the mountains from above. Only once did I catch a glimpse of the white circle of the sun through the clouds. Birds are busy with their early morning affairs  - some fly through the valley between hills, some glide in the sky, some run across the rocks like lizards, and some peck at the trees. (Polina)`],
        [false, `For me, the most comprehensible and natural way to communicate/interact with nature is through movement: running, dancing, lying down, crawling, imitating, repeating lines, movements, the character. (Polina)`],
        [false, `Water in different phases of a river falls with different sounds and rhythms.`],
      ]
    },
    textStyleType: 'c',
    sound: журчание_воды
  },
  time: {
    title: {
      rus: 'время',
      eng: 'time',
    },
    images: images.frames.time,
    video: [
      {
        video: fog,
        image: poster_fog,
        format: 'viewing__video_type_b'
      }, {
        video: timelapse,
        image: poster_timelapse,
        format: 'viewing__video_type_c'
      }
    ],
    texts: {
      rus: [
        [false, 'Нужно отойти от линейности событий. Для природы прошлое, настоящее и будущее едины.'],
        [false, '"Древесное время цикличное, периодически повторяющееся, многолетнее; прошлое и будущее дышат одновременно, и настоящее совершенно необязательно течет в одном направлении; наоборот, оно чертит круги внутри кругов, похожих на древесные кольца – те, что вы видите, срубив дерево. Древесное время эквивалентно времени рассказанной истории, и, как все истории, оно не развивается по идеальной прямой, безупречной кривой или под правильным углом, но изгибается и разветвляется, принимая фантастические формы, порождая чудесные ответвления и потрясающие воображение дуги. Человеческое время и древесное время – понятия несовместимые" (Отрывок из книги Элифа Шафака “Остров пропавших деревьев”)'],
        [false, 'Поразил Petrified wood - Окаменелое дерево. Сколько ему веков? Минеральная мумификация дерева..Растительный мир был представлен гербарием, образцы которого датировались начиная с конца 19 века. Пожелтевшая бумага и потерявшие почти весь пигмент цветы. Сравнивая с фотографией, мы с трудом узнавали образцы. Интересно, как эти засохшие цветы в рамочке могут помочь людям познакомиться с биоразнообразием?'],
        [false, 'Природа представляет из себя мудро устроенную экосистему в которой все подчиняется строго определенной логике. Один из таких законов - всё когда-то родившееся, однажды умирает и отдает свою последнюю честь земле, запуская новый цикл жизни для других существ. Антропогенное воздействие внесло свои коррективы во многие ранее устоявшиеся природные традиции, но закон жизни и смерти актуален, как и раньше.'],
      ],
      eng: [
        [false, 'We need to move away from the linearity of events. For nature, the past, present, and future are unified.'],
        [false, '“Arboreal-time is cyclical, recurrent, perennial; the past and the future breathe within this moment, and the present does not necessarily flow in one direction; instead it draws circles within circles, like the rings you find when you cut us down. Arboreal-time is equivalent to story-time — and, like a story, a tree does not grow in perfectly straight lines, flawless curves or exact right angles, but bends and twists and bifurcates into fantastical shapes, throwing out branches of wonder and arcs of invention. They are incompatible, human-time and tree-time” (excerpt from the book ‘The Island of Missing Trees’ by Elif Shafak)'],
        [false, `Petrified wood is fascinating. How many centuries does it span? Mineral mummification of the wood…The plant world was represented through a herbarium, including samples dating back to the late 19th century. The yellowed paper and faded flowers, almost devoid of pigment, made it difficult to recognize the specimens when comparing them to the photographs. It's interesting to think about how these dried flowers in a frame can help people explore biodiversity.`],
        [false, 'Nature represents a wisely organized ecosystem in which everything adheres to a strictly defined logic. One such laws is that everything which is born eventually dies, paying its final tribute to the Earth and launching a new cycle of life for other beings.. Anthropogenic impact has made corrections to many previously established natural traditions, but the law of life and death remains relevant, just as it always has.'],
      ]
    },
    textStyleType: 'b',
    sound: стрекот_цикад_5
  }
};

export { main, intro, instruction, data };
