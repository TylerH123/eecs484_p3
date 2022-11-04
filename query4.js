// Query 4
// Find user pairs (A,B) that meet the following constraints:
// i) user A is male and user B is female
// ii) their Year_Of_Birth difference is less than year_diff
// iii) user A and B are not friends
// iv) user A and B are from the same hometown city
// The following is the schema for output pairs:
// [
//      [user_id1, user_id2],
//      [user_id1, user_id3],
//      [user_id4, user_id2],
//      ...
//  ]
// user_id is the field from the users collection. Do not use the _id field in users.
// Return an array of arrays.

function suggest_friends(year_diff, dbname) {
    db = db.getSiblingDB(dbname);

    var pairs = [];
    // TODO: implement suggest friends

    db.users.find().forEach(element => {
        const obj = JSON.parse(JSON.stringify(element));
        if (obj.gender === "male") {
            db.users.find({
                "gender": "female", "YOB": { $gt: obj.YOB - year_diff, $lt: obj.YOB + year_diff }, "hometown.city": obj.hometown.city, $where: function () {
                    return this.friends.indexOf(obj.user_id) === -1 && obj.friends.indexOf(this.user_id) === -1;
                }
            }).forEach((e) => {
                pairs.push([obj.user_id, e.user_id]);
                print(obj.gender, e.gender);
            });
        }
    });;

    return pairs;
}
