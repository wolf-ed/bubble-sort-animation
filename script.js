
const randomizeBTN = document.getElementById('randomize');
const sortBTN = document.getElementById('sort');


let columns = document.querySelectorAll('.column')
const randomHeights = (arr) => {
  let randomNumber = [];

  let compare = (arr, num) => {
    return arr.some(numb => num === numb)
  }

  for (let i = 0; i < arr.length; i++) {
    let newValue = (Math.floor(Math.random() * arr.length + 1)) * 10;
    if (compare(randomNumber, newValue) || newValue === 0) {
      i--
    } else {
      randomNumber.push(newValue)
    }
  }

  return randomNumber
}







const shorterBubbleSort = arr => {
  let noSwaps;
  const swap = (arr, first, second) => {
    [arr[first], arr[second]] = [arr[second], arr[first]]
  }
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr
}


const randomize = () => {
  const random = randomHeights(columns)
  for (let i = 0; i < 20; i++) {
    columns[i].style.left = `${+random[i]}px`
  }
}

function waitforme(milisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec);
  })
}


const sortColumns = async () => {
  let noSwaps;

  const toggleColumns = async (col1, col2) => {

    let holderLeft = col1.style.left
    col1.style.left = col2.style.left
    col2.style.left = holderLeft

  }

  for (let i = columns.length; i > 0; i--) {

    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {

      if (columns[j].offsetLeft > columns[j + 1].offsetLeft) {

        columns[j + 1].style.backgroundColor = 'white';
        columns[j].style.backgroundColor = 'black';
        await waitforme(100);
        columns[j].style.backgroundColor = 'aqua';
        columns[j + 1].style.backgroundColor = 'aqua';

        toggleColumns(columns[j], columns[j + 1])

        noSwaps = false;
      }

    }
    if (noSwaps) break;
  }

}

randomizeBTN.addEventListener('click', randomize)
sortBTN.addEventListener('click', sortColumns)