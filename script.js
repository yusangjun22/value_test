const questions = [
  { text: "친구가 주말에 여행 가자고 했지만, 나는 미리 정해진 약속을 지키기 위해 거절했다.", value: "God" },
  { text: "많은 사람이 나의 게시물을 보고 반응해줄 때 기분이 정말 좋아진다.", value: "Honor" },
  { text: "어려운 친구에게 도움을 주고 난 후, 오히려 내가 더 큰 기쁨을 느낄 때가 있다.", value: "Neighbor" },
  { text: "내가 가진 것을 나누면 손해 보는 느낌이 들어 꺼려진다.", value: "Money" },
  { text: "부모님의 기대와 다르게 내 길을 선택하려 할 때, 갈등이 생긴다.", value: "Family" },
  { text: "팀 과제에서 내 이름이 빠지면 서운하고 억울한 마음이 든다.", value: "Honor" },
  { text: "경제적으로 여유가 있다면 내 삶이 더 자유롭고 행복할 것 같다.", value: "Money" },
  { text: "가끔은 주일예배보다 친구들과의 모임이 더 끌릴 때가 있다.", value: "God" },
  { text: "남들이 나를 어떻게 볼까 하는 생각을 자주 한다.", value: "Honor" },
  { text: "내게 힘든 일이 생기면 제일 먼저 가족이 떠오른다.", value: "Family" },
  { text: "내가 잘되는 것이 가장 중요하다고 생각한다.", value: "World" },
  { text: "나보다 더 부족한 친구를 보면 도와주고 싶은 마음이 든다.", value: "Neighbor" },
  { text: "돈이 많으면 하고 싶은 일도, 나누는 일도 더 쉽게 할 수 있다.", value: "Money" },
  { text: "나를 인정해주는 사람들 앞에서는 더 열심히 하게 된다.", value: "Honor" },
  { text: "세상에서 성공한 사람들의 이야기를 들으면 나도 그런 삶을 꿈꾸게 된다.", value: "World" },
  { text: "하루 중 가장 평안한 시간은 하나님과 대화할 때이다.", value: "God" },
  { text: "가족과 보내는 시간이 늘 즐겁지는 않지만, 그래도 중요하다고 생각한다.", value: "Family" },
  { text: "누군가 어려운 일을 겪고 있을 때, 내가 도울 수 있는 일이 무엇인지 고민한다.", value: "Neighbor" },
  { text: "내가 가진 목표를 위해서라면 어느 정도의 경쟁은 괜찮다고 생각한다.", value: "World" },
  { text: "내가 하나님을 믿는다는 사실을 주변 사람들에게 드러내는 것이 조금은 부담스럽다.", value: "God" }
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
  const scores = { God: [], World: [], Neighbor: [], Family: [], Money: [], Honor: [] };

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
