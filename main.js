const BGBox = {
  container: document.getElementById('boxes'),
  btn: document.getElementById('btn'),

  createBoxes() {
    for(let column = 0; column < 4; column++) {
      for(let item = 0; item < 4; item++) {
        const box = document.createElement('div')
        box.classList.add('box')
        // item = x, column = y
        box.style.backgroundPosition = `${-item * 125}px ${-column * 125}px`
        BGBox.container.appendChild(box)
      }
    }
  },

  start() {
    BGBox.btn.addEventListener('click', () => BGBox.container.classList.toggle('big'))
    BGBox.createBoxes()
  }
}

BGBox.start()