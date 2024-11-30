import { createParagraphs, createColors, temperatureBanner, deletePalette } from "./dom-helpers";
import { addPalette, getLocalStorageKey } from "./local-storage";
import { v4 as generateUUID } from 'uuid';
import palettes from './palettes.json'

const createNewPalette = ({ title, colors, temperature, uuid }) => {
    const newPaletteID = generateUUID();
    // Grab Palettes List
    const paletteList = document.getElementById("palettes-list");
    // Create list element for palette
    const paletteListItem = document.createElement('li')
    // This div contains everything inside of the palette "card"
    const paletteContent = document.createElement("div");
    paletteContent.className = 'palette'
    // This p tag goes inside the parent div for the title
    const paletteTitle = createParagraphs(title);
    paletteTitle.className = `palette-title`
    // Delete button goes inside the parentDiv
    const deleteButton = document.createElement('button')
    deleteButton.textContent = `Delete Palette`
    deleteButton.addEventListener('click', deletePalette)
    // This div contains the 3 palettes with respective copy buttons
    const paletteColors = createColors(colors)
    // Temperature banner which does inside the parent div
    const colorTemperature = temperatureBanner(temperature);
    //Append the 3 user colors along buttons to the parent div
    paletteContent.append(paletteTitle, paletteColors, deleteButton, colorTemperature)
    // Append parent div to palette list item
    paletteListItem.append(paletteContent)
    paletteList.appendChild(paletteListItem);

    //STORAGE ONLY BELOW (DO NOT TOUCH)
    // If the uuid argument is not passed it means it does not exist in the local storage therefore we can add it to our storage
    if (!uuid) {
        paletteContent.setAttribute('data-paletteId', newPaletteID)
        const obj = {
            "uuid": newPaletteID,
            "title": title,
            "colors": [colors[0], colors[1], colors[2]],
            "temperature": temperature
        }
        addPalette(obj);
    } else {
        paletteContent.setAttribute('data-paletteId', uuid)
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData)
    const paletteData = {
        "title": formObject.paletteTitle,
        "colors": [formObject.colorOne, formObject.colorTwo, formObject.colorThree],
        "temperature": formObject.temperature
    }
    console.log(paletteData)
    createNewPalette(paletteData);
};

const fetchSavedPalettes = () => {
    if (localStorage.getItem('userPalettes') === null) {
        localStorage.setItem('userPalettes', JSON.stringify(new Object));
    } else {
        const savedPalettes = getLocalStorageKey('userPalettes')
        if (Object.keys(savedPalettes).length === 0) {
            for (let palettesID in palettes) {
                createNewPalette(palettes[palettesID])
                addPalette(palettes[palettesID])
            }
        } else {
            for (let palettesID in savedPalettes) {
                createNewPalette(savedPalettes[palettesID])
            }
        }
    }
}

const paletteForm = document.getElementById("palette-form");
paletteForm.addEventListener("submit", handleSubmit);
fetchSavedPalettes();