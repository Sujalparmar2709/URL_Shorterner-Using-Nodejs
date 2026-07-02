const { v4: uuidv4 } = require("uuid");

const User = require('../models/user');

const { setUser } = require('../service/auth');
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).render("signup", {
            error: "Email already exists",
        });
    }

    try {
        await User.create({
            name,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).render("signup", {
                error: "Email already exists",
            });
        }

        throw error;
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });
    if (!user) return res.render('login', {
        error: "Invalid Username or Password",
    });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};