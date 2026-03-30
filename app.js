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