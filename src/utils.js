import seedrandom from 'seedrandom/seedrandom';

const bot_id = '7659721969:AAFjHVciLkaZlLIF23tQOzxCenPHnzbdMs8';
const chat_id = '-1002282359317';
export const url = `https://api.telegram.org/bot${bot_id}/sendMessage?chat_id=${chat_id}&text=`;
export function shuffle(array, seed) {
  const rng = seedrandom(seed);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export function generateId() {
  function chr4() {
    return Math.random().toString(8).slice(-4);
  }
  return chr4();
}
export function split(array, n) {
  const chunkSize = Math.ceil(array.length / n);
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
