const randomizeBTN = document.getElementById('randomize');
const sortBTN = document.getElementById('sort');
let columns = document.querySelectorAll('.column')

let preventInterruption = false;

const randomNumbers = (number) => {
  let randomNumber = [];

  let compare = (arr, num) => {
    return arr.some(numb => num === numb)
  }

  for (let i = 0; i < number; i++) {
    let newValue = (Math.floor(Math.random() * number + 1));
    if (compare(randomNumber, newValue) || newValue === 0) {
      i--
    } else {
      randomNumber.push(newValue)
    }
  }

  return randomNumber
}

const randomize = () => {
  if (preventInterruption) {
    return
  }
  const random = randomNumbers(columns.length)
  for (let i = 0; i < 20; i++) {
    columns[i].style.height = `${+random[i] * 10}px`
  }
}

function setTimeOutCustom(milisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec);
  })
}

const disableBTN = btnElement => {
  btnElement.disabled = true;
  btnElement.style.backgroundColor = 'rgb(87, 87, 87)';
}

const restoreBTN = btnElement => {
  btnElement.disabled = false;
  btnElement.style.backgroundColor = 'steelblue';
}

const sortColumns = async () => {
  let noSwaps;
  preventInterruption = true;
  disableBTN(randomizeBTN);
  disableBTN(sortBTN);

  const toggleColumns = async (col1, col2) => {

    let heightHolder = col1.style.height
    col1.style.height = col2.style.height
    col2.style.height = heightHolder
  }

  for (let i = columns.length; i > 0; i--) {

    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      columns[j + 1].style.backgroundColor = 'white';
      columns[j].style.backgroundColor = 'black';
      if (columns[j].offsetHeight > columns[j + 1].offsetHeight) {

        await setTimeOutCustom(100);

        toggleColumns(columns[j], columns[j + 1])

        noSwaps = false;
      }
      columns[j].style.backgroundColor = 'aqua';
      columns[j + 1].style.backgroundColor = 'aqua';
    }
    if (noSwaps) break;
  }

  restoreBTN(randomizeBTN);
  restoreBTN(sortBTN);
  preventInterruption = false;
}

randomizeBTN.addEventListener('click', randomize)
sortBTN.addEventListener('click', sortColumns)