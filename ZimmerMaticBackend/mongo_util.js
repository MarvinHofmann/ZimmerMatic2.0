const main = require('./index')

async function mongo_store_user(json) {
    main.app.locals.userdata.insertOne(json, function (err, res) {
        if (err) {
            console.log("Error writing User Data to DB: " + err)
            return {code: 500, message: "DB Error"}
        };
    });
    return {code: 200, message: "Successful Added User"}
}
exports.mongo_store_user = mongo_store_user;

async function mongo_get_user(json){
    return await main.app.locals.userdata.findOne({username: json.username})
}
exports.mongo_get_user = mongo_get_user;

async function mongo_user_exists(username){
    return await main.app.locals.userdata.findOne({username: username})
}
exports.mongo_user_exists = mongo_user_exists;