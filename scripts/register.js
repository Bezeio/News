'use strict';
const inputFirstName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputUserName = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputPasswordConfirm = document.getElementById('input-password-confirm');
const btnSubmit = document.getElementById('btn-submit');

const KEY = "USER_ARRAY";
let userArr = getFromStorage(KEY) || [];

btnSubmit.addEventListener('click', function(){
  let userInput = {
    firstName: inputFirstName.value.trim(),
    lastName: inputLastName.value.trim(),
    username: inputUserName.value.trim(),
    password: inputPassword.value.trim(),
    passwordConfirm: inputPasswordConfirm.value.trim(),
  }

  if (userInput.firstName && userInput.lastName && userInput.username && userInput.password) {
    // Check if the username already exists
    const existedUser = userArr.find(user => user.username === userInput.username);
    if (existedUser) {
      alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
    } else {
      // Create a new User instance and add it to the userArr array
      if (userInput.password === userInput.passwordConfirm) {
        const newUser = new User(userInput.firstName, userInput.lastName, userInput.username, userInput.password);
        userArr.push(newUser);
        saveToStorage(KEY, JSON.stringify(userArr));
        alert('Đăng ký thành công!');
        console.log(userArr);
        window.location.href = 'login.html'; // Redirect to the login page
      }
      else{
        alert('Mật khẩu phải trùng với mật khẩu xác nhận')
      }
    }
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});
