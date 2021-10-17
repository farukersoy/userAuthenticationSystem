const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv');

const sendMail = require('../modules/sendMail.js');
const User = require('../model/User.js');
dotenv.config();

const secret = process.env.SECRET;

const signup = async (req, res) => {
    const { firstName, lastName, email, password, mobile } = req.body;

    try {
        // is email exist?
        const isExist = await User.findOne({ email });
        if (isExist) return res.status(400).json({ desc: "User already exists" });

        const hashedPass = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPass, firstName, lastName, mobile, lastToken: '' });
        result.password = '*****';

        const token = jsonwebtoken.sign({ email: result.email, id: result._id }, secret, { expiresIn: "12h" });

        // update token as lastToken
        await User.findOneAndUpdate({ email: email }, { lastToken: token });

        await sendMail(email, firstName, lastName)

        res.status(201).json({ result, token });

    } catch (err) {
        res.status(500).json({ desc: err.message });
        console.log(`err`, err)
    }
}

module.exports = signup;