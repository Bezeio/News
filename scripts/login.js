"use strict";
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

const KEY = "USER_ARRAY";
let userArr = getFromStorage(KEY) || [];

//Handle submit button
btnSubmit.addEventListener("click", function () {
  let userInput = {
    username: inputUserName.value.trim(),
    password: inputPassword.value.trim(),
  };
  if (userInput.username && userInput.password) {
    //Find storage have same username or not
    const foundUser = userArr.find(
      user => user.username === userInput.username
    );
    if (foundUser) {
      //Check password
      if (foundUser.password === userInput.password) {
        //Save login of currentUser
        saveToStorage('currentUser', JSON.stringify(foundUser))

        //Save todo list of current user
        let userTodoList = getFromStorage(foundUser.username) || [];
        saveToStorage('TODO_LIST', JSON.stringify(userTodoList));

        alert("Đăng nhập thành công!");
        window.location.href = '../index.html'
      } else {
        // Password does not match
        alert("Sai mật khẩu.");
      }
    }
    else{
        alert('Tài khoản không tồn tại.');
    }
  }
});
