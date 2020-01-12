function getDataFromLocalStorage(key) {
  try {
    let data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (err) {
    console.log('Get state error: ', err);
  }
}

function setDataToLocalStorage(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error('Set state error: ', err);
  }
}

export { getDataFromLocalStorage, setDataToLocalStorage };
