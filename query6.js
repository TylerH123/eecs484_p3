// Query 6
// Find the average friend count per user.
// Return a decimal value as the average user friend count of all users in the users collection.

function find_average_friendcount(dbname) {
    db = db.getSiblingDB(dbname);

    // TODO: calculate the average friend count
    // let sum = 0; 
    // let count = db.users.count(); 

    let avg = db.users.aggregate([{ $group: { "_id": "_id", AverageFriends: { $avg: { $size: "$friends" } } } }]);
    print(JSON.stringify(element));
    return 0;
}


