import Mock from "mockjs";

Mock.mock("/time", "get", {
    // "hour|1": [-1, 0, 1, 2],
    // "hour|1": [-1],
    "hour|1": [0],
    "minu|1": [0],
    "seco|1": [10],
    // "seco|0-59": 1
});

Mock.mock("/time/exam", "get", {
    "minu|1": [0],
    "seco|10-59": 1,
})