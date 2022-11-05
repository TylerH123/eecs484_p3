// Query 6
// Find the average friend count per user.
// Return a decimal value as the average user friend count of all users in the users collection.

function find_average_friendcount(dbname) {
    db = db.getSiblingDB(dbname);

    // TODO: calculate the average friend count
    // let sum = 0; 
    // let count = db.users.count(); 

    let cursor = db.users.aggregate([{ $group: { "_id": "_id", "average": { $avg: { $size: "$friends" } } } }]);
    let avg = JSON.parse(tojson(cursor.next()));
    print(avg);
    return avg;
}


