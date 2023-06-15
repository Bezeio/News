"use strict";
const loginModal = document.getElementById("login-modal");
const logoutModal = document.getElementById("main-content");
const para = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout')

const KEY = "currentUser";
let currentUser = getFromStorage(KEY);

//Check does have login or not
if (currentUser) {
  loginModal.hidden = true;
  const node = document.createTextNode(`Welcome ${currentUser.firstName}`);
  para.appendChild(node);
  logoutBtn.addEventListener('click', function(){
    localStorage.removeItem(KEY)
    window.location.href = 'pages/login.html';
  })
} else {
  logoutModal.hidden = true;
  console.log(currentUser);
}
