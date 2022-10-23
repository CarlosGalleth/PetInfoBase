
const baseURL = "http://localhost:3333"
let userToken = localStorage.getItem("usuarioPetinfo")
 
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

    // ----------------Fechar modal de criar post----------------------------------
    let closeCreateModal = document.querySelectorAll("#close-create")
    let createModal = document.getElementById("create-modal")
    closeCreateModal.forEach((elem) => {
        elem.addEventListener('click', () => {
            createModal.classList.add("hidden")
        })
    })
    // ----------------Fechar modal de editar post---------------------------------
    let closeEditModal = document.querySelectorAll("#close-edit")
    let editModal = document.getElementById("edit-modal")
    closeEditModal.forEach((elem) => {
      elem.addEventListener('click', () => {
        editModal.classList.add("hidden")
      })
    })
    // ----------------Fechar modal de acessar post---------------------------------
    let closeAccessModal = document.getElementById("close-access")
    let accessModal = document.getElementById("access-modal")
    closeAccessModal.addEventListener('click', () => {
      accessModal.classList.add("hidden")
    })
    // ----------------Fechar modal de deletar post---------------------------------
    let closeDeleteModal = document.querySelectorAll("#close-delete")
    let deleteModal = document.getElementById("delete-modal")
    closeDeleteModal.forEach((elem) => {
      elem.addEventListener('click', () => {
        deleteModal.classList.add("hidden")
      })
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

function criarPost() {
  let postsList = document.getElementsByClassName("posts-list")[0]
  postsList.innerHTML = ""

  let createModal = document.getElementById("create-modal")
  let createPostBtn = document.getElementById("create-post")
  createPostBtn.addEventListener('click', () => {
    createModal.classList.remove("hidden")
  })

  let createTitle = document.getElementsByClassName("create-title")[0]
  let createDiscription = document.getElementsByClassName("create-discription")[0]

  let postBtn = document.getElementById("post-button")
   postBtn.addEventListener('click', async() => {
    createModal.classList.add("hidden")

    let post = {
      title: createTitle.value,
      content: createDiscription.value,
    }
  
    await fetch(`${baseURL}/posts/create`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify(post), 
    })
    .then((response) => response.json())
    .then((responseJson) => renderizarPost(responseJson)) 
  })
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

function deletePost(post, li) {
  let alertDeleted = document.getElementById("deleted-alert")
  let deleteModal = document.getElementById("delete-modal")
  let deleteBtn = document.getElementById("delete-post")
  deleteBtn.addEventListener('click', () => {
    deleteModal.classList.add("hidden")
    fetch(`${baseURL}/posts/${post.id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, 
      },
    })
    .then((response) => response.json())
    .then((reposonseJson) => reposonseJson);

    li.remove()

    alertDeleted.classList.remove("hidden")

    setTimeout(() => {
      alertDeleted.classList.add("hidden")
    }, 4000)
  })
}

function accessPost(post, date) {
  let accessAvatar = document.getElementById("access-img-modal")
  let accessName = document.getElementById("access-name-modal")
  let accessDate = document.getElementById("access-date-modal")
  let accessTitle = document.getElementById("access-title-modal")
  let accessDescription = document.getElementById("access-description-modal")

  accessAvatar.src = post.user.avatar
  accessName.innerText = post.user.username
  accessDate.innerText = date
  accessTitle.innerText = post.title
  accessDescription.innerText = post.content
}

function editPost(post) {
  let modalEdit = document.getElementById("edit-modal")
  let editTitle = document.getElementById("edit-title")
  let editContent = document.getElementById("edit-content")
  let saveEdit = document.getElementById("save-edited-post")

  saveEdit.addEventListener('click', async() => {

    let newPost = {
      title: editTitle.value,
      content: editContent.value,
    }

    await fetch(`${baseURL}/posts/${post.id}`,{
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(newPost),
    })
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    modalEdit.classList.add("hidden")
    window.location.assign("./index.html")
  })
}

getUser()
renderizarTodosPosts()
