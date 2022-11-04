// Query 3
// Create a collection "cities" to store every user that lives in every city. Each document(city) has following schema:
// {
//   _id: city
//   users:[userids]
// }
// Return nothing.

function cities_table(dbname) {
    db = db.getSiblingDB(dbname);

    // TODO: implement cities collection here
    db.createCollection("cities");

    db.users.aggregate({ $group: { _id: "$city", users: {} } }, { $project: { "_id": 0, "user_id": 1, "friends": 1 } }, { $out: "cities" });

    return;
}
