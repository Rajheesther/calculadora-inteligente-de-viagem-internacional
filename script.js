// ======= CALCULADORA DE VIAGEM =======
document.getElementById('calcularBtn').addEventListener('click', async () => {
  const origem = document.getElementById('origem').value.toUpperCase();
  const destino = document.getElementById('destino').value.toUpperCase();
  const dias = parseInt(document.getElementById('dias').value);
  const gastoDiario = parseFloat(document.getElementById('gastoDiario').value);
  const dataViagem = new Date(document.getElementById('dataViagem').value);
  const hoje = new Date();

  // Validação dos campos
  if (!origem || !destino || !dias || !gastoDiario || !dataViagem) {
    alert('⚠️ Preencha todos os campos!');
    return;
  }

  try {
    // API de câmbio
    const url = `https://api.exchangerate-api.com/v4/latest/${destino}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.rates[origem]) {
      alert('⚠️ Moeda inválida. Use códigos como BRL, USD, EUR.');
      return;
    }

    const taxaCambio = data.rates[origem];
    const custoTotalDestino = dias * gastoDiario;
    const custoTotalOrigem = custoTotalDestino * taxaCambio;

    // Cálculo de economia diária até a viagem
    const diasRestantes = Math.ceil((dataViagem - hoje) / (1000 * 60 * 60 * 24));
    const economiaDiaria = (custoTotalOrigem / diasRestantes).toFixed(2);

    document.getElementById('resultado').innerHTML = `
      🌍 Taxa de câmbio ${destino} ➡ ${origem}: <strong>${taxaCambio.toFixed(2)}</strong><br>
      💵 Custo total na moeda de destino: <strong>${custoTotalDestino} ${destino}</strong><br>
      💰 Custo total convertido: <strong>${custoTotalOrigem.toFixed(2)} ${origem}</strong><br>
      📅 Você tem <strong>${diasRestantes}</strong> dias até a viagem.<br>
      🏦 Economize <strong>${economiaDiaria} ${origem}</strong> por dia para alcançar o valor!
    `;
  } catch (error) {
    alert('❌ Erro ao buscar taxas de câmbio. Tente novamente mais tarde.');
    console.error(error);
  }
});

// ======= FUNDO COM PARTÍCULAS NEON =======
const canvas = document.createElement("canvas");
canvas.id = "backgroundCanvas";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2,
    color: ["#00f9ff", "#ff00c8", "#39ff14", "#f7ff00"][Math.floor(Math.random() * 4)]
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 15;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Ajustar canvas ao redimensionar a tela
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});