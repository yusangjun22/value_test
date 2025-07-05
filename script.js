const questions = [
  { text: "칭찬을 들으면 더 열심히 하게 된다.", value: "Honor" },
  { text: "연애를 통해 나를 더 잘 알게 되는 것 같다.", value: "Romance" },
  { text: "하나님과의 관계가 삶의 중심에 있다고 느낀다.", value: "God" },
  { text: "부자가 되면 진짜 자유로워질 수 있을 것 같다.", value: "Money" },
  { text: "친구가 힘들어할 때 도와주고 싶은 마음이 든다.", value: "Relationship" },
  { text: "나답게 사는 것이 인생에서 가장 중요하다고 느낀다.", value: "Self" },
  { text: "내가 원하는 걸 사지 못하면 자존감이 낮아지는 것 같다.", value: "Money" },
  { text: "다른 사람보다 잘해야 내 가치를 느낄 수 있다.", value: "Honor" },
  { text: "연애는 삶에서 중요한 감정 경험이라고 생각한다.", value: "Romance" },
  { text: "내가 하는 모든 선택에 하나님의 뜻을 고려하려고 한다.", value: "God" },
  { text: "경쟁을 통해 더 나은 사람이 될 수 있다고 믿는다.", value: "Self" },
  { text: "다른 사람을 위해 내 시간을 희생하는 게 의미 있다고 느낀다.", value: "Relationship" },
  { text: "돈 때문에 꿈을 포기하거나 바꿔야 할 것 같다고 느낀 적이 있다.", value: "Money" },
  { text: "이성 친구와의 관계가 삶의 만족도에 큰 영향을 미친다.", value: "Romance" },
  { text: "예배나 기도를 드릴 때 마음이 평안해진다.", value: "God" },
  { text: "주변 사람들과의 관계가 삶의 행복에 중요한 요소라고 느낀다.", value: "Relationship" },
  { text: "친구들 사이에서 인정받고 싶다는 생각이 자주 든다.", value: "Honor" },
  { text: "내가 원하는 삶을 살기 위해 노력하고 있다.", value: "Self" },
  { text: "연애를 하면 외로움이 줄어든다고 생각한다.", value: "Romance" },
  { text: "모르는 사람이라도 도움이 필요하면 도와주려고 한다.", value: "Relationship" },
  { text: "돈을 많이 버는 직업이 좋은 직업이라고 생각한다.", value: "Money" },
  { text: "내가 다른 사람보다 나 자신을 더 우선시해야 한다고 생각한다.", value: "Self" },
  { text: "내 신앙을 주변 사람들에게 자연스럽게 드러낼 수 있다.", value: "God" },
  { text: "SNS에 올린 게시물의 반응이 나에게 큰 영향을 준다.", value: "Honor" },
  { text: "연애로 인해 다른 일에 집중하기 어려워질 때가 있다.", value: "Romance" },
  { text: "친구들이 나를 필요로 하면 기분이 좋아진다.", value: "Relationship" },
  { text: "실패하면 다른 사람들에게 창피할까 봐 걱정된다.", value: "Honor" },
  { text: "친구들과의 관계보다 하나님과의 관계가 더 중요하다고 느낀다.", value: "God" },
  { text: "나의 목표를 이루는 것이 가장 중요하다.", value: "Self" },
  { text: "돈이 많으면 친구도 더 생길 것 같다.", value: "Money" }
];

const choices = ["매우 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"];

const quizForm = document.getElementById('quiz-form');

questions.forEach((q, index) => {
  const div = document.createElement('div');
  div.classList.add('question');
  div.innerHTML = `<p>${index + 1}. ${q.text}</p>`;
  const options = document.createElement('div');
  options.classList.add('options');
  choices.forEach((choice, i) => {
    const inputId = `q${index}_opt${i}`;
    options.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${i + 1}" required>
        ${choice}
      </label>
    `;
  });
  div.appendChild(options);
  quizForm.appendChild(div);
});

document.getElementById('submit-btn').addEventListener('click', () => {
  event.preventDefault();
  const formData = new FormData(quizForm);
  const scores = { God: [], Romance: [], Self: [], Relationship: [], Money: [], Honor: [] };

  questions.forEach((q, i) => {
    const val = parseInt(formData.get(`q${i}`));
    if (!isNaN(val)) scores[q.value].push(val);
  });

  const labels = Object.keys(scores);
  const data = labels.map(label => {
    const arr = scores[label];
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  });

  renderChart(labels, data);
});

function renderChart(labels, data) {
  const ctx = document.getElementById('resultChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: '내 가치 우선순위',
        data,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff'
      }]
    },
    options: {
      scales: {
        r: {
          suggestedMin: 1,
          suggestedMax: 5
        }
      }
    }
  });
}
