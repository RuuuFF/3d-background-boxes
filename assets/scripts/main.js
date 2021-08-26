const BGBox = {
  container: document.getElementById('boxes'),
  btn: document.getElementById('btn'),

  createBoxes() {
    BGBox.container.innerHTML = ''

    for(let column = 0; column < 4; column++) {
      for(let item = 0; item < 4; item++) {
        const box = document.createElement('div')
        const position = ResponsiveAdjust.callScaleWithParameters(62.5, 125)
        box.classList.add('box')
        box.style.backgroundPosition = `${-item * position}px ${-column * position}px`
        BGBox.container.appendChild(box)
      }
    }
  },

  start() {
    BGBox.btn.addEventListener('click', () => BGBox.container.classList.toggle('big'))
    BGBox.createBoxes()
  }
}

const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "px"
}

const CSSDeclarations = [
  {
    selector: ".magic",
    propAndValue: [
      { property: "padding-top", min: 8, max: 12 },
      { property: "padding-right", min: 12, max: 20 },
      { property: "padding-bottom", min: 8, max: 12 },
      { property: "padding-left", min: 12, max: 20 },
      { property: "font-size", min: 14, max: 16 }
    ]
  },

  {
    selector: ".boxes",
    propAndValue: [
      { property: "width", min: 250, max: 500 },
      { property: "height", min: 250, max: 500 }
    ]
  },

  {
    selector: ".boxes.big",
    propAndValue: [
      { property: "width", min: 300, max: 600 },
      { property: "height", min: 300, max: 600 }
    ]
  },
  
  {
    selector: ".box",
    propAndValue: [
      { property: "background-size", min: 250, max: 500 },
      { property: "width", min: 62.5, max: 125 },
      { property: "height", min: 62.5, max: 125 }
    ]
  }
]

const ResponsiveAdjust = {
  createStyleEl() {
    const styleEl = document.createElement('style')
    styleEl.setAttribute("id", "responsive-adjust")
    document.querySelector('head').appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by ResponsiveAdjust (github.com/ruuuff/responsive-adjust) -->")
  },

  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value

    return value
  },

  callScaleWithParameters(min, max) {
    return ResponsiveAdjust.scale(Number(document.documentElement.clientWidth), Number(Options.minWidth), Number(Options.maxWidth), Number(min), Number(max))
  },

  formatSize(sizeToFormat) {
    return parseFloat(sizeToFormat.toFixed(3))
  },

  innerStyles() {
    const style = document.querySelector('head style#responsive-adjust')
    style.innerHTML = ""

    CSSDeclarations.forEach(({ selector, propAndValue }, index) => {
      style.insertAdjacentHTML("beforeend", `${selector} {`)

      propAndValue.forEach(({ property, min, max }) => {
        const size = ResponsiveAdjust.formatSize(ResponsiveAdjust.callScaleWithParameters(min, max))

        style.insertAdjacentHTML("beforeend", `  ${property}: ${size + Options.measure};`)
      })
      style.insertAdjacentHTML("beforeend", index !== CSSDeclarations.length - 1 ? `}
      ` : `}`)
    })
  }
}

ResponsiveAdjust.createStyleEl()
ResponsiveAdjust.innerStyles()
BGBox.start()

window.addEventListener('resize', () => {
  ResponsiveAdjust.innerStyles()
  BGBox.createBoxes()
})