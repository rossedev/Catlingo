const select = 'SELECT'

export const challengesList = [
  {
    id: 1,
    lessonId: 1,
    type: 'SELECT' as typeof select,
    order: 1,
    question: 'Which one of these is "apple"?',
  },
  {
    id: 2,
    lessonId: 1,
    type: 'ASSIST' as typeof select,
    order: 2,
    question: 'the apple',
  },
  {
    id: 3,
    lessonId: 1,
    type: 'SELECT' as typeof select,
    order: 3,
    question: 'Which one of these is "watermelon"?',
  },
]

export const challengeOptionsList = [
  {
    id: 1,
    challengeId: 1,
    correct: true,
    text: 'la manzana',
    imageSrc: '/icons/apple.svg',
    audioSrc: '/voices/es_apple.mp3',
  },
  {
    id: 2,
    challengeId: 1,
    correct: false,
    text: 'el banano',
    imageSrc: '/icons/banana.svg',
    audioSrc: '/voices/es_banana.mp3',
  },
  {
    id: 3,
    challengeId: 1,
    correct: false,
    text: 'la sandia',
    imageSrc: '/icons/watermelon.svg',
    audioSrc: '/voices/es_watermelon.mp3',
  },
  {
    id: 4,
    challengeId: 2,
    correct: true,
    text: 'la manzana',
    audioSrc: '/voices/es_apple.mp3',
  },
  {
    id: 5,
    challengeId: 2,
    correct: false,
    text: 'el banano',
    audioSrc: '/voices/es_banana.mp3',
  },
  {
    id: 6,
    challengeId: 2,
    correct: false,
    text: 'la sandia',
    audioSrc: '/voices/es_watermelon.mp3',
  },
  {
    id: 7,
    challengeId: 3,
    correct: false,
    text: 'la manzana',
    imageSrc: '/icons/apple.svg',
    audioSrc: '/voices/es_apple.mp3',
  },
  {
    id: 8,
    challengeId: 3,
    correct: false,
    text: 'el banano',
    imageSrc: '/icons/banana.svg',
    audioSrc: '/voices/es_banana.mp3',
  },
  {
    id: 9,
    challengeId: 3,
    correct: true,
    text: 'la sandia',
    imageSrc: '/icons/watermelon.svg',
    audioSrc: '/voices/es_watermelon.mp3',
  },
]
