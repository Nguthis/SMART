
// fetch("https://jsonplaceholder.typicode.com/posts")
//     .then(res => res.json())
//     .then(data => {
//         const postsArr = data.slice(0, 5) // Get first 5 posts
//         let html = ""
//         for (let post of postsArr) {
//             html += `
//                 <div class="post" id="post-${post.id}">
//                     <h3>${post.title}</h3>
//                     <p>${post.body}</p>
//                     <button onclick="deletePost(${post.id})">Delete</button>
//                     <hr />
//                 </div>
//             `
//         }
//         document.getElementById("blog-list").innerHTML = html
//     })
//     .catch(err => console.error("Error fetching posts:", err))

// document.getElementById("new-post").addEventListener("submit", function(e) {
//     e.preventDefault()
    
//     const postTitle = document.getElementById("post-title").value.trim()
//     const postBody = document.getElementById("post-body").value.trim()
    
//     if (!postTitle || !postBody) {
//         alert("Title and body cannot be empty!")
//         return
//     }

//     const data = {
//         title: postTitle,
//         body: postBody
//     }
    
//     const options = {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }
    
//     fetch("https://jsonplaceholder.typicode.com/posts", options)
//         .then(res => res.json())
//         .then(post => {
//             const blogList = document.getElementById("blog-list")
//             const newPostHtml = `
//                 <div class="post" id="post-${post.id}">
//                     <h3 class="blah">${post.title}</h3>
//                     <p>${post.body}</p>
//                     <button onclick="deletePost(${post.id})">Delete</button>
//                     <hr />
//                 </div>
//             `
//             blogList.innerHTML = newPostHtml + blogList.innerHTML // Prepend new post
//         })
//         .catch(err => console.error("Error posting new blog:", err))
// })

// // Delete Post Function
// function deletePost(postId) {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
//         method: "DELETE"
//     })
//     .then(res => {
//         if (res.ok) {
//             document.getElementById(`post-${postId}`).remove()
//         } else {
//             alert("Error deleting post!")
//         }
//     })
//     .catch(err => console.error("Error deleting post:", err))
// }
// Fetch and display posts
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
        const postsArr = data.slice(0, 5) // Get first 5 posts
        let html = ""
        for (let post of postsArr) {
            html += createPostHTML(post)
        }
        document.getElementById("blog-list").innerHTML = html
    })
    .catch(err => console.error("Error fetching posts:", err))

document.getElementById("new-post").addEventListener("submit", function(e) {
    e.preventDefault()
    
    const postTitle = document.getElementById("post-title").value.trim()
    const postBody = document.getElementById("post-body").value.trim()
    
    if (!postTitle || !postBody) {
        alert("Title and body cannot be empty!")
        return
    }

    const data = {
        title: postTitle,
        body: postBody
    }
    
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(post => {
        const blogList = document.getElementById("blog-list")
        blogList.innerHTML = createPostHTML(post) + blogList.innerHTML // Prepend new post
    })
    .catch(err => console.error("Error posting new blog:", err))
})

// Delete Post Function
function deletePost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE"
    })
    .then(res => {
        if (res.ok) {
            document.getElementById(`post-${postId}`).remove()
        } else {
            alert("Error deleting post!")
        }
    })
    .catch(err => console.error("Error deleting post:", err))
}

// Edit Post Function
function editPost(postId) {
    const postElement = document.getElementById(`post-${postId}`)
    const postTitle = postElement.querySelector("h3").innerText
    const postBody = postElement.querySelector("p").innerText
    
    // Replace post content with an edit form
    postElement.innerHTML = `
        <input type="text" id="edit-title-${postId}" value="${postTitle}" />
        <textarea id="edit-body-${postId}">${postBody}</textarea>
        <button onclick="saveEdit(${postId})">Save</button>
        <button onclick="cancelEdit(${postId}, '${postTitle}', '${postBody}')">Cancel</button>
    `
}

// Save Edited Post
function saveEdit(postId) {
    const newTitle = document.getElementById(`edit-title-${postId}`).value.trim()
    const newBody = document.getElementById(`edit-body-${postId}`).value.trim()
    
    if (!newTitle || !newBody) {
        alert("Title and body cannot be empty!")
        return
    }

    const data = {
        title: newTitle,
        body: newBody
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(updatedPost => {
        document.getElementById(`post-${postId}`).innerHTML = createPostHTML(updatedPost)
    })
    .catch(err => console.error("Error updating post:", err))
}

// Cancel Edit
function cancelEdit(postId, title, body) {
    document.getElementById(`post-${postId}`).innerHTML = `
        <h3>${title}</h3>
        <p>${body}</p>
        <button onclick="editPost(${postId})">Edit</button>
        <button onclick="deletePost(${postId})">Delete</button>
        <hr />
    `
}

// Function to create post HTML
function createPostHTML(post) {
    return `
        <div class="post" id="post-${post.id}">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
            <hr />
        </div>
    `
}
