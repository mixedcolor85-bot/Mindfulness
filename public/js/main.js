// 상단바 링크 이동
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = link.getAttribute('href');
  });
});

// 목표 완료 예시
async function completeGoal(goalId, userId) {
  const res = await fetch('/api/completeGoal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goalId, userId })
  });
  const data = await res.json();
  if(data.success) {
    alert('오늘 목표 완료!');
    location.reload();
  }
}
