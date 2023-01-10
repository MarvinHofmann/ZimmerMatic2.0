const router = require('express').Router();
const mongouitl = require('../mongo_util')
const { register_validation, login_validation } = require('../validation')
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
    const salt = await bcrypt.genSalt(15)
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
        return res.status(400).send(vali.error.details.message);
    }

    //check if user exists
    const user = await mongouitl.mongo_get_user(req.body);
    if (!user) return res.status(400).send("[Username] or password is wrong");

    const valid_password = await bcrypt.compare(req.body.password, user.password);
    if (!valid_password) return res.status(400).send("Username or [password] is wrong");

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
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
    const error = await mongouitl.delete_user(req.body.id);
    console.log(error);
    res.status(200).send(error)
})

router.post("/update", async (req, res) => {
    const error = await mongouitl.mongo_update_user(req.body.id, req.body.username, req.body.name);
    console.log(error);
    res.status(200).send(error)
})
module.exports = router


