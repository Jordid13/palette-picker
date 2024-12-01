import { removePaletteById } from './local-storage'

const deletePalette = (event) => {
  const paletteList = document.getElementById("palettes-list");
  const listItem = paletteList.querySelectorAll(".palette")
  const obsoletePaletteId = event.target.parentElement.dataset.paletteid
  // Iterates through each palette in the list and checks if the id matches the id of the palette that needs to be removed. If it does it removes the parent element which is the li element.
  listItem.forEach((palette) => {
    if (palette.dataset.paletteid === obsoletePaletteId) {
      paletteList.removeChild(palette.parentElement)
    }
  })
  // Removes palette from storage
  removePaletteById(obsoletePaletteId)

  // Add sad face if the length of the list is 0
  if ((listItem.length - 1) === 0) {
    const img = document.createElement('img')
    img.id = `sad-svg`
    img.alt = `Sad Face`
    img.src = `palette-picker/icons/sad.svg`
    paletteList.append(img) 
  }
}

const createParagraphs = (text) => {
  const p = document.createElement('p')
  p.textContent = text
  return p
}

const copyToClipboard = async (event) => {
  // Checks if clipboard is available
  if (!navigator.clipboard) return; 
  // Tries to copy text to the clipboard
  try {
    const text = event.target.textContent
    const colorProperties = [event.target.style.backgroundColor, event.target.style.color]
    const colorHex = `${event.target.dataset.hex}`
    await navigator.clipboard.writeText(colorHex)
    event.target.textContent = `Copied Hex!`
    event.target.style.backgroundColor = `#43AA8B`
    event.target.style.color = `#FFFFFF`
    setTimeout(() => {
      event.target.textContent = text
      event.target.style.backgroundColor = colorProperties[0]
      event.target.style.color = colorProperties[1]
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

const createColors = (colors) => {
  // This div contains ALL the 3 palettes with respective copy buttons
  const colorsContainer = document.createElement('div')
  colorsContainer.className = `colors-container`
  colors.forEach((color) => {
    // Wraps the color as well as the button into a single div
    const colorsWrapper = document.createElement('div')
    // Wraps the text example text box
    const colorsExampleWrapper = document.createElement('div')
    // Wraps the `Text Example` text box
    const colorsExample = document.createElement('div')
    // Copy hex button
    const copyButton = document.createElement('button')
    // Setting class names
    colorsWrapper.className = `colors-palette-wrapper`
    colorsExampleWrapper.className = `text-example-wrapper`
    colorsExample.className = 'text-example'

    // Setting the background color of the text example text box to the user provided color
    colorsExample.style.backgroundColor = `${color}`
    // Hardcoding inner html to display 'text example' text
    colorsExample.innerHTML = `<span style='color:white;'>Text </span><span style='color:black;'>Example</span>`

    // Setting hex data attribute for copy to clipboard functionality to work
    copyButton.setAttribute(`data-hex`, color)
    // Copy buttons for each respective color
    copyButton.textContent = `Copy ${color}`
    // Event listener for copy to clipboard functionality
    copyButton.addEventListener('click', copyToClipboard)
    
    // Append colors and buttons to the colors div
    colorsExampleWrapper.append(colorsExample)
    colorsWrapper.append(colorsExampleWrapper, copyButton)
    colorsContainer.append(colorsWrapper)
  })
  return colorsContainer
}

const temperatureBanner = (temp) => {
  const temperatureWrapper = document.createElement('div')
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
      console.log('Error creating temperature banner')
  }
  colorTemperature.textContent = temp
  colorTemperature.style.color = 'white';  
  colorTemperature.style.backgroundColor = temperatureColor
  temperatureWrapper.className = `temperature-banner`
  temperatureWrapper.append(colorTemperature)
  return temperatureWrapper
}

export { createColors, createParagraphs, temperatureBanner, deletePalette};


