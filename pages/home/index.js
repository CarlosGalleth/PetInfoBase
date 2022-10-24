
const baseURL = "http://localhost:3333"
let userToken = localStorage.getItem("usuarioPetinfo")
let mainUser = ""
 
let date = new Date()
let currentYear = date.getFullYear()
let currentMonth = date.getMonth()
let arrMonth = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
let atualMonth = arrMonth[currentMonth]

async function getUser() {
    const user = await fetch(`${baseURL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${userToken}`, 
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          window.location.assign("../login/index.html")
        }
        let respJSON = response.json()
        return respJSON
      })
      .then((reposonseJson) => {
        renderizarUsuario(reposonseJson)
      });
}

function renderizarUsuario(user){
  mainUser = user
  console.log(user)
    let titleInput = document.getElementsByClassName("create-title")[0]
    let discriptionInput = document.getElementsByClassName("create-discription")[0]
    let userDisconnect = document.getElementById("user-disconnect")
    let userImg = document.getElementById("user-img")
    userImg.src = user.avatar

    userImg.addEventListener('click', () => { 
      mostrarModalDisconnect()
      userDisconnect.innerText = `@${user.username}`
    })

    let createPostBtn = document.getElementById("create-post")
    createPostBtn.addEventListener('click', () => {
      titleInput.value = ""
      discriptionInput.value = ""
      let createModal = document.getElementById("create-modal")
      createModal.classList.remove("hidden")
    })
    criarPost()
}

function mostrarModalDisconnect() {
  let modalDisconnect = document.getElementsByClassName("disconnect")[0]
  modalDisconnect.classList.toggle("hidden")
}

function disconectar() {
  let btnDisconnect = document.getElementById("disconnect")
  btnDisconnect.addEventListener('click', () => {
    localStorage.removeItem("usuarioPetinfo")
    window.location.assign("../login/index.html")
  })
}
disconectar()

async function renderizarTodosPosts() {
  await fetch(`${baseURL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${userToken}`
    },
  }
)
  .then((response) => response.json())
  .then((responseJson) => responseJson.forEach((elem) => {renderizarPost(elem)}))
}

function renderizarPost(post){
  let createModal = document.getElementById("create-modal")
  let postsList = document.getElementsByClassName("posts-list")[0]
  let li = document.createElement("li")
  li.classList = "post flex flex-col"

  let divMaster = document.createElement("div")
  let divUserInfo = document.createElement("div")
  let imgUser = document.createElement("img")
  let h4NameUser = document.createElement("h4")
  let divDivider = document.createElement("div")
  let pDate = document.createElement("p")

  divMaster.classList = "master-box flex justify-between align-center"
  divUserInfo.classList = "user-info-box flex align-center"
  imgUser.src = post.user.avatar
  h4NameUser.innerText = post.user.username
  divDivider.innerText = "|"
  pDate.innerText = `${atualMonth} de ${currentYear}`
  divUserInfo.append(imgUser, h4NameUser, divDivider, pDate)

  let divPostBtns = document.createElement("div")
  let btnEdit = document.createElement("button")
  let btnDelete = document.createElement("button")

  divPostBtns.classList = "post-buttons flex"
  btnEdit.classList = "choosed"
  btnEdit.innerText = "Editar"
  btnDelete.classList = "unchoosed"
  btnDelete.innerText = "Excluir"
  divPostBtns.append(btnEdit, btnDelete)
  divMaster.append(divUserInfo,divPostBtns)

  let divPostTitle = document.createElement("div")
  let h3Title = document.createElement("h3")
  divPostTitle.classList = "post-title"
  h3Title.innerText = post.title
  divPostTitle.append(h3Title)

  let divPostDescription = document.createElement("div") 
  let h4Description = document.createElement("h4")
  divPostDescription.classList = "post-description"
  h4Description.innerText = post.content
  divPostDescription.append(h4Description)

  let btnAccess = document.createElement("button")
  btnAccess.classList = "access-post"
  btnAccess.innerText = "Acessar publicação"

  createModal.classList.add("hidden")
  
  if (post.user.id !== mainUser.id) {
    btnEdit.classList.add("hidden")
    btnDelete.classList.add("hidden")
  }

  if (post.content.length >= 145) {
    let limitedContent = post.content.substr(0, 145)
    h4Description.innerText = limitedContent + " ..."
  }
  if (post.title.length >= 145) {
    let limitedTitle = post.title.substr(0, 145)
    h3Title.innerText = limitedTitle + " ..."
  }

  li.append(divMaster, divPostTitle, divPostDescription, btnAccess)
  postsList.append(li)

  btnEdit.addEventListener('click', () => {
    let editTitle = document.getElementById("edit-title")
    let editContent = document.getElementById("edit-content")

    editTitle.value = post.title
    editContent.value = post.content

    let modalEdit = document.getElementById("edit-modal")
    modalEdit.classList.remove("hidden")
    editPost(post)
  })

  btnDelete.addEventListener('click', () => {
    let modalDelete = document.getElementById("delete-modal")
    modalDelete.classList.remove("hidden")
    deletePost(post, li)
  })

  btnAccess.addEventListener('click', () => {
    let modalAccess = document.getElementById("access-modal")
    modalAccess.classList.remove("hidden")
    accessPost(post, pDate.innerText)
  })
  return post
}

getUser()
renderizarTodosPosts()
