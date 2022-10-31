// Query 8
// Find the city average friend count per user using MapReduce.

var city_average_friendcount_mapper = function () {
    // TODO: Implement the map function
};

var city_average_friendcount_reducer = function (key, values) {
    // TODO: Implement the reduce function
};

var city_average_friendcount_finalizer = function (key, reduceVal) {
    // We've implemented a simple forwarding finalize function. This implementation
    // is naive: it just forwards the reduceVal to the output collection.
    // TODO: Feel free to change it if needed.
    return reduceVal;
};
