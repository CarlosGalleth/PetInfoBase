
const baseURL = "http://localhost:3333"
let userToken = localStorage.getItem("usuarioPetinfo")

async function getUser() {

    const user = await fetch(`${baseURL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${userToken}`, 
      },
    })
      .then((response) => response.json())
      .then((reposonseJson) => {
        renderizarUsuario(reposonseJson)
      });
    return user;
}

function renderizarUsuario(user){
  console.log(user)
    let userImg = document.getElementById("user-img")
    userImg.src = user.avatar

    let createPostBtn = document.getElementById("create-post")
    createPostBtn.addEventListener('click', () => {
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
    criarNovoPost(user)
}

function criarNovoPost(user){
    let createModal = document.getElementById("create-modal")
    let titleInput = document.getElementsByClassName("create-title")[0]
    let descriptionInput = document.getElementsByClassName("create-description")[0]
    let postButton = document.getElementById("post-button")
    let postsList = document.getElementsByClassName("posts-list")[0]
    titleInput.value = ""
    descriptionInput.value = ""

    postButton.addEventListener('click', () => {

      //----------------------Datas-------------------------------
      let date = new Date()
      let currentYear = date.getFullYear()
      let currentMonth = date.getMonth()+1
 
      //-----------------Criando Novo post--------------------------------

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
      imgUser.src = user.avatar
      h4NameUser.innerText = user.username
      divDivider.innerText = "|"
      pDate.innerText = `${currentMonth} de ${currentYear}`
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
      h3Title.innerText = titleInput.value
      divPostTitle.append(h3Title)

      let divPostDescription = document.createElement("div") 
      let h4Description = document.createElement("h4")
      divPostDescription.classList = "post-description"
      h4Description.innerText = descriptionInput.value
      divPostDescription.append(h4Description)

      let btnAccess = document.createElement("button")
      btnAccess.classList = "access-post"
      btnAccess.innerText = "Acessar publicação"

      createModal.classList.add("hidden")
      
      li.append(divMaster, divPostTitle, divPostDescription, btnAccess)

      btnEdit.addEventListener('click', () => {
        editarPost(btnEdit, h3Title, h4Description, titleInput, descriptionInput)
      })
      btnDelete.addEventListener('click', () => {
        deletePost(btnDelete, li)
      })
      btnAccess.addEventListener('click', () => {
        accessPost(btnAccess, imgUser, h4NameUser, h3Title, h4Description)
      })

      postsList.append(li)
    })

      //---------------------Editar Post-----------------------------------------------------
      
      function editarPost(btnEdit, title, description, titleInput, descriptionInput) {
        let editTitle = document.getElementById("edit-title")
        let editDescription = document.getElementById("edit-content")
        let editModal = document.getElementById("edit-modal")
        btnEdit.addEventListener('click', () => {
          editModal.classList.remove("hidden")
          editTitle.value = titleInput.value
          editDescription.value = descriptionInput.value
        })

        let btnSave = document.getElementById("save-edited-post")
        btnSave.addEventListener('click', () => {
          title.innerText = editTitle.value
          description.innerText = editDescription.value
          editModal.classList.add("hidden")
        })
      }

      //---------------------Deletar Post-----------------------------------------------------

      function deletePost(btnDelete, li) {
        btnDelete.addEventListener('click', () => {
          let modalDelete = document.getElementById("delete-modal")
          modalDelete.classList.remove("hidden")
        })
  
        let deletedAlert = document.getElementById("deleted-alert")
        let deleteModal = document.getElementById("delete-modal")
        let btnDeletePost = document.getElementById("delete-post")
        btnDeletePost.addEventListener('click', () => {
          li.remove()
          deleteModal.classList.add("hidden")
          deletedAlert.classList.remove("hidden")
  
          setTimeout(() => {
            deletedAlert.classList.add("hidden")
          }, 5000)
        })
      }

      //---------------------Acessar Post-----------------------------------------------------
      
      function accessPost(btnAccess, imgUser, h4NameUser, h3Title, h4Description) {
        let date = new Date()
        let currentYear = date.getFullYear()
        let currentMonth = date.getMonth()+1

        btnAccess.addEventListener('click', () => {
          let modalAccess = document.getElementById("access-modal")
          modalAccess.classList.remove("hidden")
  
          let imgAccess = document.getElementById("access-img-modal")
          let nameAccess = document.getElementById("access-name-modal")
          let dateAccess = document.getElementById("access-date-modal")
          let titleAccess = document.getElementById("access-title-modal")
          let descriptionAccess = document.getElementById("access-description-modal")
  
          imgAccess.src = imgUser.src
          nameAccess.innerText = h4NameUser.innerText
          dateAccess.innerText = `${currentMonth} de ${currentYear}`
          titleAccess.innerText = h3Title.innerText
          descriptionAccess.innerText = h4Description.innerText
        })
      }
    
}
getUser()