// Task 11.1 — Understanding Async

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// Callback example

function loadUser(userId, callback) {

    setTimeout(() => {

        const user = {
            id: userId,
            name: "User " + userId,
            age: 25
        };

        callback(user);

    }, 1500);

}

loadUser(1, function(user){
    console.log("Loaded user:", user);
});
// Task 11.2 — Callback Hell Example

function getUserData(userId, callback) {

    setTimeout(() => {
        console.log("Fetched user data");

        callback({
            id: userId,
            name: "Fabby"
        });

    }, 1000);
}

function getUserPosts(userId, callback) {

    setTimeout(() => {
        console.log("Fetched user posts");

        callback([
            "Post 1",
            "Post 2",
            "Post 3"
        ]);

    }, 1000);
}

function getPostComments(post, callback) {

    setTimeout(() => {
        console.log("Fetched comments for", post);

        callback([
            "Nice post!",
            "Great work!"
        ]);

    }, 1000);
}


// CALLBACK HELL

getUserData(1, (user) => {

    getUserPosts(user.id, (posts) => {

        getPostComments(posts[0], (comments) => {

            console.log("User:", user);
            console.log("Posts:", posts);
            console.log("Comments:", comments);

        });

    });

});
// Task 11.3 — Promises Version

function getUserDataPromise(userId) {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Fetched user data (Promise)");

            resolve({
                id: userId,
                name: "Fabby"
            });

        }, 1000);

    });

}

function getUserPostsPromise(userId) {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Fetched user posts (Promise)");

            resolve([
                "Post 1",
                "Post 2",
                "Post 3"
            ]);

        }, 1000);

    });

}

function getPostCommentsPromise(post) {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Fetched comments for", post);

            resolve([
                "Nice post!",
                "Great work!"
            ]);

        }, 1000);

    });

}


// Using Promise chaining

getUserDataPromise(1)
.then(user => {

    return getUserPostsPromise(user.id);

})
.then(posts => {

    return getPostCommentsPromise(posts[0]);

})
.then(comments => {

    console.log("Comments:", comments);

})
.catch(error => {

    console.log("Error:", error);

});
// Task 11.4 — Async / Await

async function fetchUserData() {

    try {

        const user = await getUserDataPromise(1);
        console.log("User:", user);

        const posts = await getUserPostsPromise(user.id);
        console.log("Posts:", posts);

        const comments = await getPostCommentsPromise(posts[0]);
        console.log("Comments:", comments);

    } catch (error) {

        console.log("Error:", error);

    }

}

fetchUserData();

// Task 12.1 — Fetch API Basics

fetch("https://jsonplaceholder.typicode.com/users/1")
.then(response => {

    console.log("Response object:", response);
    console.log("Status:", response.status);
    console.log("OK:", response.ok);

    return response.json();

})
.then(data => {

    console.log("User data:", data);

})
.catch(error => {

    console.error("Fetch error:", error);

});

// Task 12.1 Practice — Fetch Single User

async function getUser(id) {

    try {

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        const data = await response.json();

        console.log("Single user:", data);

    } catch (error) {

        console.error("Error:", error);

    }

}

getUser(1);

// Fetch all users

async function getAllUsers() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        console.log("All users:", users);

    } catch (error) {

        console.error("Error:", error);

    }

}

getAllUsers();

// Fetch posts for user 1

async function getUserPosts() {

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users/1/posts");

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();

        console.log("User posts:", posts);

    } catch (error) {

        console.error("Error:", error);

    }

}

getUserPosts();

// Task 12.2 — Display API Data in DOM

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

async function loadUsers() {

    try {

        showLoading();

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        displayUsers(users);

    } catch (error) {

        showError(error.message);

    } finally {

        hideLoading();

    }

}
function showLoading() {

    loading.classList.remove("hidden");
    container.innerHTML = "";

}

function hideLoading() {

    loading.classList.add("hidden");

}

function showError(message) {

    errorDiv.textContent = "Error: " + message;
    errorDiv.classList.remove("hidden");

}
function displayUsers(users) {

    container.innerHTML = users.map(user => `

        <div class="user-card">
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Company: ${user.company.name}</p>
            <p>City: ${user.address.city}</p>
        </div>

    `).join("");

}
loadUsers();
const form = document.getElementById("post-form");
const resultDiv = document.getElementById("post-result");
async function createPost(title, body, userId) {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            body,
            userId
        })

    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const userId = document.getElementById("userId").value;

    try {

        const newPost = await createPost(title, body, userId);

        resultDiv.innerHTML = `
            <h3>Post Created!</h3>
            <p>ID: ${newPost.id}</p>
            <p>Title: ${newPost.title}</p>
            <p>${newPost.body}</p>
        `;

    } catch (error) {

        resultDiv.innerHTML = "Error creating post";

    }

});
