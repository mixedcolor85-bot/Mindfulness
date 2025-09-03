const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cardsFile = path.join(__dirname, '../data/cards.json');

// 메인 페이지
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// 카드 상세 페이지
router.get('/card/:id', (req, res) => {
  let cards;
  try {
    cards = JSON.parse(fs.readFileSync(cardsFile));
  } catch (err) {
    console.error('JSON 파싱 오류', err);
    return res.status(500).send('JSON 파싱 오류');
  }

  const card = cards.find(c => c.id === req.params.id);
  if (!card) return res.status(404).send('Card not found');

  // MD 파일 읽기
  const mdPath = path.join(__dirname, '../data', card.file);
  let mdContent = '';
  try {
    mdContent = fs.readFileSync(mdPath, 'utf-8');
  } catch (err) {
    console.error('MD 파일 읽기 오류', err);
    return res.status(500).send('MD 파일 읽기 오류');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${card.title}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="../public/css/style.css">
      <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    </head>
    <body id="body" class="bg-white text-gray-900 transition-colors duration-500 min-h-screen p-6">

      <header class="flex justify-between items-center mb-10 max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold">${card.title}</h1>
        <div class="flex space-x-2">
          <button id="lightMode" class="p-2 rounded-full bg-yellow-200 hover:bg-yellow-300 transition">☀️</button>
          <button id="darkMode" class="p-2 rounded-full bg-gray-400 hover:bg-gray-600 transition">🌙</button>
        </div>
      </header>

      <main class="max-w-3xl mx-auto">
        <div class="card bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-2xl shadow-md mb-6">
          <div id="mdContent"></div>
        </div>
        <a href="/" class="text-blue-500 hover:underline">← Back to Main</a>
      </main>

      <script>
        const body = document.getElementById('body');
        const darkBtn = document.getElementById('darkMode');
        const lightBtn = document.getElementById('lightMode');

        // 로컬스토리지 기반 모드
        if (localStorage.getItem('theme') === 'dark') {
          body.classList.add('dark');
          body.classList.remove('bg-white', 'text-gray-900');
          body.classList.add('bg-gray-900', 'text-gray-100');
        }

        darkBtn.addEventListener('click', () => {
          body.classList.add('dark');
          body.classList.remove('bg-white', 'text-gray-900');
          body.classList.add('bg-gray-900', 'text-gray-100');
          localStorage.setItem('theme', 'dark');
        });

        lightBtn.addEventListener('click', () => {
          body.classList.remove('dark');
          body.classList.remove('bg-gray-900', 'text-gray-100');
          body.classList.add('bg-white', 'text-gray-900');
          localStorage.setItem('theme', 'light');
        });

        // MD 렌더링
        const md = \`${mdContent}\`;
        document.getElementById('mdContent').innerHTML = marked.parse(md);
      </script>

    </body>
    </html>
  `);
});

module.exports = router;
