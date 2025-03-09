const email = document.getElementById('email');
const name = document.getElementById('name');
const password = document.getElementById('password');
const passwordAdmit = document.getElementById('passwordAdmit');
const error = document.getElementById('errorText');
const falseSymbols = /[!@#$%^&*+`;<>]/;
const ip = "http://217.16.21.64";
const port = "8080";
const registerUrl = `${ip}:${port}/api/register`;
const loginUrl = `${ip}:${port}/api/login`;

//let infoIcon = (element) => {
//    const img = document.createElement('img');
//    img.src = 'error.svg';
//    img.alt = 'Img';
//    element.prepend(img);
//}

let emptyInput = (errorInput, emailInput, nameInput, passwordInput, passwordAdmitInput) => {
    error.innerText = errorInput;
    email.value = emailInput;
    name.value = nameInput;
    password.value = passwordInput;
    passwordAdmit.value = passwordAdmitInput;
}
let errorColor = (errorInput, emailInput, passwordInput, passwordAdmitInput) => {
    error.style.color = errorInput;
    email.style.border = emailInput;
    password.style.border = passwordInput;
    passwordAdmit.style.border = passwordAdmitInput;
}

let checkPassword = () => {
    if (password.value !== passwordAdmit.value){
        error.style.color = '#CC0202';
        emptyInput('Пароли не совпадают', email.value, name.value, '', '');
        errorColor('none', 'none', 'none', '2px solid #CC0202');
        return false;
    }
    if (password.value.length < 8 || password.value.length > 32) {
//        if (falseSymbols.test(password.value)){
//            error.innerText = 'Пароль не должен содержать символы !@#$%^&*+`;<>!';
//            emptyInput('Пароль должен содержать символы !@#$%^&*+`;<>!', email.value, name.value, '', '');
//            return false;
//        }
        emptyInput('Пароль должен содержать от 8 до 32 символов!', email.value, name.value, '', '');
        errorColor('none', 'none', '2px solid #CC0202', '2px solid #CC0202');
        return false;
        }
    error.innerText = '';
    return true;
}

let btnRegistration = () => {
//    infoIcon(password);
    const button = document.querySelectorAll('button');
    passwordAdmit.style.display = 'block';
    name.style.display = 'block';
    if (button[0].classList.contains('active')) {
        if (checkPassword()){
                error.innerText = '';
                registerUser(email.value, name.value, password.value);
            }
    } else {
        emptyInput('', '', '', '', '');
        errorColor('white', 'none', 'none', 'none');
        button[0].classList.add('active');
        button[1].classList.remove('active');
    }
}

let btnAuthorization = () => {
    const button = document.querySelectorAll('button');
    const window = document.querySelectorAll('.window');
    passwordAdmit.style.display = 'none';
    name.style.display = 'none';

    if (button[1].classList.contains('active')) {
        loginUser(email.value, password.value);
    } else {
        emptyInput('', '', '', '', '');
        errorColor('white', 'none', 'none', 'none');
        button[1].classList.add('active');
        button[0].classList.remove('active');
    }
}

async function registerUser(mail, name, password) {
  const userData = {
    email: mail,
    name: name,
    password: password
  };

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      error.innerText = "Пользователь успешно зарегистрирован";
      errorColor('white', 'none', 'none', 'none');
    } else {
        if (response.status == 404) {
            error.innerText = "Пользователь уже существует";
        } else {
            error.innerText = data.error;
        }
        errorColor('#CC0202', '2px solid #CC0202', 'none', 'none');
    }
  } catch (err) {
//    error.innerText = data.error;
    error.style.color = '#CC0202';
  }
}

async function loginUser (mail, passwordInput) {
  const loginData = {
    email: mail,
    password: passwordInput
  };

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      error.innerText = "Успешный вход";
      errorColor('white', 'none', 'none', 'none');
    } else {
        if (response.status == 404) {
            error.innerText = "Неверные почта или пароль";
        } else {
            error.innerText = data.error;
        }
        errorColor('#CC0202', '2px solid #CC0202', '2px solid #CC0202', 'none');

    }
  } catch (err) {
    error.innerText = "Ошибка сети", err;
    error.style.color = '#CC0202';
  }
};



