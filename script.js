const cores = {
  "vermelho": "red",
  "azul": "blue",
  "verde": "green",
  "amarelo": "yellow",
  "roxo": "purple",
  "laranja": "orange",
  "rosa": "pink",
  "marrom": "brown",
  "cinza": "gray",
  "ciano": "cyan"
};

const listaCores = Object.keys(cores);
const inputCor = document.getElementById('inputCor');
const btnAdivinhar = document.getElementById('btnAdivinhar');
const btnReiniciar = document.getElementById('btnReiniciar');
const mensagem = document.getElementById('mensagem');
const tentativasTexto = document.querySelector('#tentativas span');

let corSorteada;
let tentativas;

function sortearCor() {
  return listaCores[Math.floor(Math.random() * listaCores.length)];
}

function iniciarJogo() {
  corSorteada = sortearCor();
  tentativas = 3;
  tentativasTexto.textContent = tentativas;
  mensagem.textContent = '';
  inputCor.value = '';
  inputCor.disabled = false;
  btnAdivinhar.disabled = false;
  btnReiniciar.classList.add('hidden');
  document.body.style.background = `radial-gradient(circle at top, #0a0f24, #000000)`;
  console.log('Cor secreta:', corSorteada);
}

function verificarCor() {
  let tentativa = inputCor.value.trim().toLowerCase();

  if (!tentativa) {
    mensagem.textContent = 'Digite uma cor!';
    mensagem.style.color = '#ff5555';
    return;
  }

  if (!cores.hasOwnProperty(tentativa)) {
    mensagem.textContent = 'Cor inválida! Tente outra.';
    mensagem.style.color = '#ff5555';
    return;
  }

  if (tentativa === corSorteada) {
    document.body.style.background = cores[corSorteada];
    mensagem.textContent = '🎉 Você acertou!!';
    mensagem.style.color = '#00ffea';
    finalizarJogo();
  } else {
    tentativas--;
    tentativasTexto.textContent = tentativas;

    if (tentativas > 0) {
      mensagem.textContent = `❌ Tentativas restantes: ${tentativas}`;
      mensagem.style.color = '#ff5555';
      inputCor.value = '';
    } else {
      mensagem.textContent = `☠️ Fim do jogo! A cor era: ${corSorteada}`;
      mensagem.style.color = '#ff5555';
      finalizarJogo();
    }
  }
}

function finalizarJogo() {
  inputCor.disabled = true;
  btnAdivinhar.disabled = true;
  btnReiniciar.classList.remove('hidden');
}

btnReiniciar.addEventListener('click', iniciarJogo);
btnAdivinhar.addEventListener('click', verificarCor);
window.onload = iniciarJogo;
