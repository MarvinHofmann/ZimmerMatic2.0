const { ObjectID } = require('bson');
const main = require('./index')

async function mongo_store_user(json) {
    main.app.locals.userdata.insertOne(json, function (err, res) {
        if (err) {
            console.log("Error writing User Data to DB: " + err)
            return { code: 500, message: "DB Error" }
        };
    });
    return { code: 200, message: "Successful Added User" }
}
exports.mongo_store_user = mongo_store_user;

async function mongo_get_user(json) {
    return await main.app.locals.userdata.findOne({ username: json.username })
}
exports.mongo_get_user = mongo_get_user;

async function mongo_get_all_user_data() {
    return await main.app.locals.userdata.find({}).project({ password: 0 }).toArray()
}
exports.mongo_get_all_user_data = mongo_get_all_user_data;

async function delete_user(id) {
    await main.app.locals.userdata.deleteOne({ _id: ObjectID(id) }, function (err, obj) {
        if (err) {
            console.log("Error writing User Data to DB: " + err)
            //return { code: 500, message: "DB Error" }
        };
    })
    return { code: 200, message: "Successful Added User" }
}
exports.delete_user = delete_user;

async function mongo_user_exists(username) {
    return await main.app.locals.userdata.findOne({ username: username })
}
exports.mongo_user_exists = mongo_user_exists;


async function mongo_update_user(id, username, name) {
    return await main.app.locals.userdata.updateOne({ _id: ObjectID(id) }, {$set: {
        username: username,
        name: name,
    }}, {upsert: false})
}
exports.mongo_update_user = mongo_update_user;