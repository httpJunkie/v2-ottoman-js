var express = require('express');
var app = express();
var add = function (x) {
    return x.a + x.b;
};
app.get("/", function (req) {
    add({ a: 1, b: 1 });
});
app.listen(3001, function () {
    console.log("started");
});
