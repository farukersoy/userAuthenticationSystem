const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv');

const User = require('../model/User.js');
dotenv.config();

const secret = process.env.SECRET;

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // is email exist?
        const isExist = await User.findOne({ email });
        if (!isExist) return res.status(400).json({ desc: "User does not exist" });

        // is password correct?
        const isCorrect = await bcrypt.compare(password, isExist.password);
        if (!isCorrect) return res.status(400).json({ desc: "Invalid credentials" });

        const token = jsonwebtoken.sign({ email, id: isExist._id }, secret, { expiresIn: "12h" });

        // update token as lastToken
        await User.findOneAndUpdate({ email }, { lastToken: token });
        res.status(201).json({ token });

    } catch (err) {
        res.status(500).json({ desc: "Something went wrong", error: err.message });
        console.log(`err`, err)
    }
}

module.exports = login;