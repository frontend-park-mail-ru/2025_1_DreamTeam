const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordAdmit = document.getElementById('passwordAdmit');
const error = document.getElementById('errorText');
const falseSymbols = /[!@#$%^&*+`;<>]/;
const ip = "http://217.16.21.64";
const port = "8080";
const registerUrl = `${ip}:${port}/api/register`;
const loginUrl = `${ip}:${port}/api/login`;

let checkPassword = () => {
    if (password.value !== passwordAdmit.value){
        error.innerText = 'Пароли не совпадают';
        password.value = '';
        passwordAdmit.value = '';
        return false;
    }
    if (password.value.length < 8 || password.value.length > 32) {
//        if (falseSymbols.test(password.value)){
//            error.innerText = 'Пароль не должен содержать символы !@#$%^&*+`;<>!';
//            password.value = '';
//            passwordAdmit.value = '';
//            return false;
//        }
        error.innerText = 'Пароль должен содержать от 8 до 32 символов!';
        password.value = '';
        passwordAdmit.value = '';
        return false;
        }
    error.innerText = '';
    return true;
}

let btnRegistration = () => {
    const button = document.querySelectorAll('button');
    passwordAdmit.style.display = 'block';
    if (button[0].classList.contains('active')) {
        if (checkPassword()){
                error.innerText = '';
                registerUser(email.value, "User", password.value)
            }
    } else {
        error.innerText = '';
        email.value = '';
        passwordAdmit.value = '';
        password.value = '';
        button[0].classList.add('active');
        button[1].classList.remove('active');
    }
}

let btnAuthorization = () => {
    const button = document.querySelectorAll('button');
    const window = document.querySelectorAll('.window');
    passwordAdmit.style.display = 'none';

    if (button[1].classList.contains('active')) {
        loginUser(email.value, password.value)
    } else {
        error.innerText = '';
        email.value = '';
        passwordAdmit.value = '';
        password.value = '';
        button[1].classList.add('active');
        button[0].classList.remove('active');
    }
}

async function registerUser(email, name, password) {
  const userData = {
    email: email,
    name: name,
    password: password
  };

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      error.innerText = "Пользователь успешно зарегистрирован";
      alert("Регистрация прошла успешно!");  // Уведомление об успешной регистрации
    } else {
      error.innerText = "Ошибка при регистрации";
      alert(`Ошибка регистрации: ${data.error}`);  // Уведомление об ошибке
    }
  } catch (error) {
    error.innerText = "Ошибка сети";
    alert("Произошла ошибка сети.");
  }
}

async function loginUser (email, password) {
  const loginData = {
    email: email,
    password: password
  };

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      error.innerText = "Успешный вход";
      alert("Вход выполнен успешно!");
    } else {
      error.innerText = "Ошибка при входе";

    }
  } catch (error) {
    error.innerText = "Ошибка сети", error;
    alert("Произошла ошибка сети.");
  }
};



