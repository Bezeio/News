'use strict'

function saveToStorage(key, value) {
    localStorage.setItem(key, value);
  }
  
  function getFromStorage(key, defaultValue) {
    const value = localStorage.getItem(key);
    return value === null ? defaultValue : JSON.parse(value);
  }
  
  