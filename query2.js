// Query 2
// Unwind friends and create a collection called 'flat_users' where each document has the following schema:
// {
//   user_id:xxx
//   friends:xxx
// }
// Return nothing.

function unwind_friends(dbname) {
    db = db.getSiblingDB(dbname);

    // TODO: unwind friends
    db.createCollection("flat_users");

    db.users.aggregate([{ $unwind: "$friends" }]).forEach(element => {
        const obj = JSON.parse(JSON.stringify(element));
        db.flat_users.insertOne({ "user_id": obj.user_id, "friends": obj.friends });
    });

    print(db.flat_users.find().length);


    return;
}
