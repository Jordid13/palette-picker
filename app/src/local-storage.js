const getLocalStorageKey = (key) => {
  const storedValue = localStorage.getItem(key);
  return JSON.parse(storedValue);
}

const setPalettes = (newPalettes) => {
    localStorage.setItem('userPalettes', JSON.stringify(newPalettes))
}

const getPalettes = () => {
    const obj = JSON.parse(localStorage.getItem('userPalettes'))
    return obj
}

const addPalette = (newPalette) => {
    let userPalettesObj = getPalettes();
    userPalettesObj[newPalette.uuid] = newPalette
    setPalettes(userPalettesObj);
};
    
const removePaletteById = (uuid) => {
    console.log(uuid)
    const userPalettesObj = getPalettes();
    for (let palettesID in userPalettesObj) {
        if (palettesID === uuid) {
            delete userPalettesObj[palettesID]
            setPalettes(userPalettesObj)
        }
    }
}

export { addPalette, removePaletteById, getLocalStorageKey }