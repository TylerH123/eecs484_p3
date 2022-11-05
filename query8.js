// Query 8
// Find the city average friend count per user using MapReduce.

var city_average_friendcount_mapper = function () {
    // TODO: Implement the map function
    emit(this.hometown.city, [1, this.friends.length]);
};

var city_average_friendcount_reducer = function (key, values) {
    // TODO: Implement the reduce function
    let total = [0, 0]
    values.forEach((i) => {
        total = [total[0] + i[0], total[1] + i[1]];
    });
    return total;
};

var city_average_friendcount_finalizer = function (key, reduceVal) {
    // We've implemented a simple forwarding finalize function. This implementation
    // is naive: it just forwards the reduceVal to the output collection.
    // TODO: Feel free to change it if needed.
    return reduceVal[1] / reduceVal[0];
};
