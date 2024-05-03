const select = 'SELECT'

export const challengesList = [
  {
    id: 1,
    lessonId: 1,
    type: 'SELECT' as typeof select,
    order: 1,
    question: 'Which one of these is "apple"',
  },
  {
    id: 2,
    lessonId: 1,
    type: 'SELECT' as typeof select,
    order: 2,
    question: 'Which one of these is "apple"',
  },
]

export const challengeOptionsList = [
  {
    id: 1,
    challengeId: 1,
    correct: true,
    text: 'manzana',
    imageSrc: '/man.svg',
    audioSrc: '/es_apple.mp3',
  },
  {
    id: 2,
    challengeId: 1,
    correct: false,
    text: 'banano',
    imageSrc: '/woman.svg',
    audioSrc: '/es_banana.mp3',
  },
  {
    id: 3,
    challengeId: 1,
    correct: false,
    text: 'sandia',
    imageSrc: '/watermelon.svg',
    audioSrc: '/es_watermelon.mp3',
  },
]
