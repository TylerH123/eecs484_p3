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

    // db.createCollection("flat_users");

    // db.users.aggregate({ $unwind: "$friends" }, { $project: { "_id": 0, "user_id": 1, "friends": 1 } }, { $out: "flat_users" });

    const resultAges = {};

    db.users.find({ "friends": { $not: { $size: 0 } } }).forEach(element => {
        const user = JSON.parse(JSON.stringify(element));
        let oldest = -1;
        let oldestYOB = Number.MAX_VALUE;
        const cursor = db.users.find({ "user_id": { $in: user.friends } }, { "user_id": 1, "YOB": 1 });
        while (cursor.hasNext()) {
            let temp = JSON.parse(JSON.stringify(cursor.next()));
            if (temp.YOB < oldestYOB) {
                oldest = temp.user_id;
                oldestYOB = temp.YOB;
            }
            else if (temp.YOB === oldestYOB && temp.user_id < oldest) {
                oldest = temp.user_id;
            }
        }

        results[user.user_id] = oldest;
        resultAges[user.user_id] = oldestYOB;
    });




    const cursor = db.flat_users.aggregate({ $group: { _id: "$friends", users: { $push: "$user_id" } } });
    while (cursor.hasNext()) {
        let data = JSON.parse(tojson(cursor.next())); // { "_id" : 291, "users" : [236, 252, 187, 283, 22, 44, 21, 140, 55, 95] } 
        let oldestID = -1;
        let oldestYOB = Infinity;
        if (data._id in results) {
            oldestYOB = resultAges[data._id];
            oldestID = results[data._id];
        }

        data.users.forEach(friend => {
            let temp = JSON.parse(JSON.stringify(db.users.find({ "user_id": friend })[0]));
            if (temp.YOB < oldestYOB) {
                oldestID = temp.user_id;
                oldestYOB = temp.YOB;
            }
            else if (temp.YOB === oldestYOB && temp.user_id < oldestID) {
                oldestID = temp.user_id;
            }
        });
        results[data._id] = oldestID;
    }

    return results;
}
