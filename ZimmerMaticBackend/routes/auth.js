const router = require('express').Router();
const mongouitl = require('../mongo_util')
const { register_validation, login_validation, username_validation, pw_validation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post("/register", async function (req, res) {
    //Validate data
    const { username, password, name, role } = req.body;
    const vali = register_validation(req.body)
    if (vali.error != null) {
        return res.status(400).send(vali.error.details);
    }
    //check if user exists
    const user_exists = await mongouitl.mongo_user_exists(username);
    if (user_exists) {
        return res.status(400).send("User already exists");
    }

    //Hash pass
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    let register_res = await mongouitl.mongo_store_user({
        username: username,
        password: hashPassword,
        name: name,
        role: role,
        date: new Date()
    })
    res.status(register_res.code).send(register_res.message)
});

router.post("/login", async (req, res) => {
    const vali = login_validation(req.body);
    if (vali.error != null) {
        return res.status(400).send(vali.error.details[0].message);
    }
    //check if user exists
    const user = await mongouitl.mongo_get_user(req.body);
    if (!user) return res.status(400).send("[Username] or password is wrong");

    const valid_password = await bcrypt.compare(req.body.password, user.password);
    if (!valid_password) return res.status(400).send("Username or [password] is wrong");

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    console.log(new Date())
    res.header("auth-token", token).send({
        user: {
            username: user.username,
            name: user.name,
            role: user.role
        },
        token: token,
        message: "success"
    })
})


router.get("/getAllUser", async (req, res) => {
    const user = await mongouitl.mongo_get_all_user_data();
    res.status(200).send(user)
})

router.post("/delete", async (req, res) => {
    const mongo_res = await mongouitl.delete_user(req.body.id);
    console.log(mongo_res);
    res.status(200).send(mongo_res)
})

router.post("/update", async (req, res) => {
    const user = await mongouitl.mongo_user_exists(req.body.username);
    if (!user) return res.status(400).send("No user with this username");

    const vali = username_validation({ username: req.body.username })
    if (vali.error != null) return res.status(400).send(vali.error.details[0].message);

    const mongo_res = await mongouitl.mongo_update_user(req.body.id, req.body.username, req.body.name);
    res.status(200).send(mongo_res)
})

router.post("/change_pw", async (req, res) => {
    //check if user exists
    const user = await mongouitl.mongo_user_exists(req.body.username);
    if (!user) return res.status(400).send("No user with this username");

    //check if old password correct
    const valid_password = await bcrypt.compare(req.body.old_password, user.password);
    if (!valid_password) return res.status(400).send("The old password is wrong");

    const vali = pw_validation({ password: req.body.new_password })
    if (vali.error != null) return res.status(400).send(vali.error.details[0].message);

    //Hash pass
    const salt = await bcrypt.genSalt(15)
    const hashPassword = await bcrypt.hash(req.body.new_password, salt)

    const mongo_res = await mongouitl.mongo_update_password(req.body.username, hashPassword)
    res.status(200).send(mongo_res)
})

module.exports = router


