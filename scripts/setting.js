'use strict'
const inputPageSize = document.getElementById('input-page-size')
const btnSave = document.getElementById('btn-submit')
const inputCategory = document.getElementById('input-category')

btnSave.addEventListener('click',function(){
    let settings = {
        pageSize: parseInt(inputPageSize.value.trim()),
        category: inputCategory.value
    }
    if(settings.pageSize > 0){
        let currentPageSize = getFromStorage('pageSize') //Get page size
        currentPageSize = settings.pageSize
        saveToStorage('pageSize', JSON.stringify(currentPageSize)) //save page size
        saveToStorage('category', JSON.stringify(settings.category)) //save category
    }else{
        alert('Please input news per page')
    }
})
