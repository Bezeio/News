"use strict"

const news = document.getElementById("news-container");
const inputQuery = document.getElementById('input-query')
const btnSubmit = document.getElementById('btn-submit')

const pageSize = getFromStorage('pageSize') || 3
let currentPage = 1;
const totalResults = 10;

//Handle submitbutton
btnSubmit.addEventListener('click', function(){
    let input = inputQuery.value.trim()
    if(input !== ''){
        saveToStorage('search', JSON.stringify(input)) //save input to storage
        getNewsData()
        inputQuery.value = '' //Reset value when submit
    }
    else{
        alert('Làm ơn điền vào trước khi nhấn Search')
    }
})

//Get news data from API
const getNewsData = async () => {
  try {
    const search = getFromStorage('search')
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=61a9170707e5499a99e3b282c27f0f28&sortBy=popularity&pageSize=${pageSize}&page=${currentPage}`
    );
    const data = await response.json();
    renderTableData(data.articles);
    renderPagination();
  } catch (error) {
    console.log("Error fetching news data", error);
  }
};


const renderTableData = (articles) => {
  let html = "";
  articles.forEach((newData) => {
    html += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${newData.urlToImage}"
                    class="card-img"
                    alt="${newData.title}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${newData.title}</h5>
                    <p class="card-text">${newData.description}</p>
                    <a class="btn btn-primary" href="${newData.url}">View</a>
                </div>
            </div>
        </div>
    </div>
`;
  });
  news.innerHTML = html;
};

//Handle pagination
const renderPagination = () => {
  const totalPages = Math.ceil(totalResults / pageSize);

  const paginationContainer = document.createElement("nav");
  paginationContainer.innerHTML = `
          <ul class="pagination justify-content-center">
            <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
              <button class="page-link" href="#" id="btn-prev">Previous</button>
            </li>
            <li class="page-item disabled">
              <a class="page-link" id="page-num">${currentPage}</a>
            </li>
            <li class="page-item ${
              currentPage === totalPages ? "disabled" : ""
            }">
              <button class="page-link" id="btn-next">Next</button>
            </li>
          </ul>
        `;

  const btnPrev = paginationContainer.querySelector("#btn-prev");
  const btnNext = paginationContainer.querySelector("#btn-next");

  //Handle prev button and next button
  btnPrev.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      getNewsData();
    }
  });
  btnNext.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      getNewsData();
    }
  });
  news.appendChild(paginationContainer);
};
getNewsData();
