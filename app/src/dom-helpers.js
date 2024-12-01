import { removePaletteById } from './local-storage'

const deletePalette = (event) => {
  const paletteList = document.getElementById("palettes-list");
  const listItem = paletteList.querySelectorAll(".palette")
  const paletteID = event.target.parentElement.dataset.paletteid
  for (let i = 0; i < listItem.length; i++) {
     if (listItem[i].dataset.paletteid === paletteID) {
         paletteList.removeChild(listItem[i].parentElement)
     }
  }
  removePaletteById(paletteID)
}

const createParagraphs = (text) => {
  const p = document.createElement('p')
  p.textContent = text
  return p
}

const copyToClipboard = async (event) => {
  if (!navigator.clipboard) return; // Clipboard is not available
  try {
    const text = event.target.textContent
    const colorHex = `${event.target.dataset.hex}`
    await navigator.clipboard.writeText(colorHex)
    event.target.textContent = `Copied hex!`
    setTimeout(() => {
      event.target.textContent = text
    }, 1000)
  } catch (error) {
    console.log('Error')
  }
}

const createColors = (colors) => {
  // This div contains the 3 palettes with respective copy buttons
  const colorsContainer = document.createElement('div')
  colorsContainer.className = `colors-container`
  colors.forEach((color) => {
    // "Text Example" Text boxes for the 3 colors
    const colorsWrapper = document.createElement('div')
    const colorsExampleWrapper = document.createElement('div')
    const colorsExample = document.createElement('div')
    const copyButton = document.createElement('button')
    colorsWrapper.className = `colors-palette-wrapper`

    colorsExample.innerHTML = `<span style='color:white;'>Text </span><span style='color:black;'>Example</span>`
    colorsExample.style.backgroundColor = `${color}`
    colorsExample.className = 'text-example'
    colorsExampleWrapper.className = `text-example-wrapper`

    
    // Adding hex value to each button
    copyButton.setAttribute(`data-hex`, color)
    // Copy buttons for each respective color
    copyButton.textContent = `Copy ${color}`
    // Important to add event listener for copy to clipboard functionality
    copyButton.addEventListener('click', copyToClipboard)
    // Append colors and buttons to the colors div

    colorsExampleWrapper.append(colorsExample)

    colorsWrapper.append(colorsExampleWrapper, copyButton)

    colorsContainer.append(colorsWrapper)
    
  })
  return colorsContainer
}

const temperatureBanner = (temp) => {
  const div = document.createElement('div')
  const colorTemperature = document.createElement('p');
  let temperatureColor
  switch (temp) {
    case 'neutral':
      temperatureColor = `#4F5D75`
      break;
    case 'cool':
      temperatureColor = `#3AAED8`
      break;
    case 'warm':
      temperatureColor = `#AF082A`
      break;
    default :
      console.log('Error')
  }
  colorTemperature.style.color = 'white';  
  colorTemperature.textContent = temp
  colorTemperature.style.backgroundColor = temperatureColor
  div.className = `temperature-banner`
  div.append(colorTemperature)
  return div
}

export { createColors, createParagraphs, temperatureBanner, deletePalette};


