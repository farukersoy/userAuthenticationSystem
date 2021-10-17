const jsonwebtoken = require('jsonwebtoken')
const User = require('../model/User.js');


const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jsonwebtoken.verify(token, process.env.SECRET);

        // find user and delete lastToken for terminate session
        await User.findOneAndUpdate({ _id: decoded.id }, { lastToken: '' });

        res.status(200).json({ desc: "Session terminated" });

    } catch (err) {
        res.status(500).json({ desc: "Something went wrong", error: err.message });
        console.log(`err`, err)
    }
}

module.exports = logout;