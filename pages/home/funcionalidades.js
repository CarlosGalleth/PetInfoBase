

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
    postBtn.addEventListener('click', async () => {
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

function deletePost(post, li) {
    let alertDeleted = document.getElementById("deleted-alert")
    let deleteModal = document.getElementById("delete-modal")
    let deleteBtn = document.getElementById("delete-post")
    deleteBtn.addEventListener('click', async () => {
        deleteModal.classList.add("hidden")
        await fetch(`${baseURL}/posts/${post.id}`, {
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

    saveEdit.addEventListener('click', async () => {

        let newPost = {
            title: editTitle.value,
            content: editContent.value,
        }

        await fetch(`${baseURL}/posts/${post.id}`, {
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