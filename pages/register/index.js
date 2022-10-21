
const baseURL = "http://localhost:3333"

function retornarAoLogin() {
    let btnReturn = document.querySelectorAll(".back-to-login")

    btnReturn.forEach((elem) => {
        elem.addEventListener('click', () => {
            window.location.assign("../login/index.html")
        })
    })
}
retornarAoLogin()

async function registrarUsuario() {
    let createdAccModal = document.getElementsByClassName("created-acc-modal")[0]
    let btnRegister = document.getElementsByClassName("register-button")[0]
    let userName = document.getElementById("user-input")
    let userEmail = document.getElementById("email-input")
    let userAvatarUrl = document.getElementById("img-input")
    let userPassword = document.getElementById("password-input")
    let allInputs = [userName, userEmail, userAvatarUrl, userPassword]

    /* ------------------------------------------------------------Lógica--------------------------------------------------------------- */

    if (userName.value == "" || userEmail.value == "" || userAvatarUrl.value == "" || userPassword.value == "") {
        btnRegister.disabled = true
    }
    else{
        btnRegister.disabled = false
    }

    allInputs.forEach((elem) => {
        elem.addEventListener('input', () => {
            if (userName.value == "" || userEmail.value == "" || userAvatarUrl.value == "" || userPassword.value == "") {
                btnRegister.disabled = true
            }
            else{
                btnRegister.disabled = false
            }

            if (btnRegister.disabled !== false) {
                btnRegister.classList.add("disabled-button")
            }
            else{
                btnRegister.classList.remove("disabled-button")
            }
        })
        if (btnRegister.disabled !== false) {
            btnRegister.classList.add("disabled-button")
        }
    })

    await btnRegister.addEventListener("click", () => {
        let div = document.createElement("div")
        div.classList = "spinner"
        div.innerText = "•"
        btnRegister.innerText = ""
        btnRegister.append(div)

        setTimeout(() => {
            btnRegister.innerText = ""
            btnRegister.innerText = "Cadastrar"
        }, 1500)

        let userData = {
            "username": userName.value,
            "email": userEmail.value,
            "password": userPassword.value,
            "avatar": userAvatarUrl.value
        }

        const response = fetch(`${baseURL}/users/create`,{
            method: "POST", 
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(userData), 
        })
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => error);
    
        createdAccModal.classList.remove("hidden")
        return response
    })

}
registrarUsuario()