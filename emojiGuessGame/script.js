const emojiList = [
  {
    "emoji": "😀",
    "answer": "smile"
  },
  {
    "emoji": "😢",
    "answer": "cry"
  },
  {
    "emoji": "❤️",
    "answer": "heart"
  },
  {
    "emoji": "😎",
    "answer": "cool"
  },
  {
    "emoji": "🍕",
    "answer": "pizza"
  },
  {
    "emoji": "🐱",
    "answer": "cat"
  },
  {
    "emoji": "⚽",
    "answer": "football"
  },
  { 
    "emoji": "😀",
    "answer": "smile" 
  },
  {
    "emoji": "😢",
    "answer": "cry"

  },
  {
    "emoji": "❤️",
    "answer": "heart"

  },
  {
    "emoji": "😎",
    "answer": "cool"

  },
  {
    "emoji": "🍕",
    "answer": "pizza"

  },
  {
    "emoji": "🐱",
    "answer": "cat"

  },
  {
    "emoji": "⚽",
    "answer": "football"

  },
  {
    "emoji": "🚗",
    "answer": "car"

  },
  {
    "emoji": "🎵",
    "answer": "music"

  },
  {
    "emoji": "🌞",
    "answer": "sun"

  },
  {
    "emoji": "🌧️",
    "answer": "rain"
    
  },
  {
    "emoji": "🌙",
    "answer": "moon"

  },
  {
    "emoji": "🔥",
    "answer": "fire"

  },
  {
    "emoji": "💧",
    "answer": "water"

  },
  {
    "emoji": "🍎",
    "answer": "apple"

  },
  {
    "emoji": "🍌",
    "answer": "banana"

  },
  {
    "emoji": "🦄",
    "answer": "unicorn"

  },
  {
    "emoji": "👑",
    "answer": "crown"

  },
  {
    "emoji": "✈️",
    "answer": "airplane"

  },
  {
    "emoji": "🎲",
    "answer": "dice"

  }
]

let currentEmoji = {};
let score = 0;

function nextEmoji() {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    currentEmoji = emojiList[randomIndex];
    document.getElementById('emojiDisplay').innerText = currentEmoji.emoji;
    document.getElementById('emojiInput').value = '';
    document.getElementById('result').innerText = '';
}

function checkAnswer() {
    const userAnswer = document.getElementById('emojiInput').value.trim().toLowerCase();
    if (userAnswer === currentEmoji.answer.toLowerCase()) {
        score++;
        document.getElementById('result').innerText = 'Correct!';
    } else {
        document.getElementById('result').innerText = `Wrong! The correct answer was "${currentEmoji.answer}".`;
    }

    document.getElementById('score').innerText = `Score: ${score}`;

    setTimeout(nextEmoji, 1500);
    };

document.getElementById('submitBtn').addEventListener('click', checkAnswer);

document.getElementById('emojiInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }  
});

nextEmoji();
