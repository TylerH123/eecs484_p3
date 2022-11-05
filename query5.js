// Query 5
// Find the oldest friend for each user who has a friend. For simplicity,
// use only year of birth to determine age, if there is a tie, use the
// one with smallest user_id. You may find query 2 and query 3 helpful.
// You can create selections if you want. Do not modify users collection.
// Return a javascript object : key is the user_id and the value is the oldest_friend id.
// You should return something like this (order does not matter):
// {user1:userx1, user2:userx2, user3:userx3,...}

function oldest_friend(dbname) {
    db = db.getSiblingDB(dbname);

    var results = {};
    // TODO: implement oldest friends
    db.users.find({ "friends": { $not: { $size: 0 } } }).forEach(element => {
        const user = JSON.parse(JSON.stringify(element));
        let oldest = -1;
        let oldestYOB = 0;
        user.friends.forEach(friend => {
            let temp = JSON.parse(JSON.stringify(db.users.find({ "user_id": friend })));
            if (temp.YOB > oldestYOB) {
                oldest = temp.user_id;
                oldestYOB = temp.YOB;
            }
        });
        results[user.user_id] = oldest;
    });
    return results;
}
