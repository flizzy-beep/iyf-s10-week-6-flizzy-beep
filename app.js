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