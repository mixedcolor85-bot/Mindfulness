const body = document.getElementById('body');
const darkBtn = document.getElementById('darkMode');
const lightBtn = document.getElementById('lightMode');

// 페이지 로드 시 localStorage 값으로 초기 모드 설정
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  body.classList.remove('bg-white', 'text-gray-900');
  body.classList.add('bg-gray-900', 'text-gray-100');
} else {
  body.classList.remove('dark');
  body.classList.remove('bg-gray-900', 'text-gray-100');
  body.classList.add('bg-white', 'text-gray-900');
}

// 버튼 클릭 이벤트
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
