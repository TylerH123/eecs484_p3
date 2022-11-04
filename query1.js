// Query 1
// Find users who live in city "city".
// Return an array of user_ids. The order does not matter.

function find_user(city, dbname) {
    db = db.getSiblingDB(dbname);

    var results = [];

    // TODO: find all users who live in city
    db.users.find({ "current.city": city }, { "user_id": 1, "_id": 0, "current.city": 1 }).forEach(element => {
        const obj = JSON.parse(JSON.stringify(element));
        results.push(obj.user_id);
    });


    // See test.js for a partial correctness check.

    return results;
}
