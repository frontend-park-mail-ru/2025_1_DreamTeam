function btnRegistration(){
    const password = document.getElementById('password');
    const passwordAdmit = document.getElementById('passwordAdmit');
    console.log(password);
    const error = document.getElementById('errorText');
    if (password.value != passwordAdmit.value){
        error.innerText = 'Пароли не совпадают';
        password.value = '';
        passwordAdmit.value = '';
    } else {
        error.innerText = '';
    }
}