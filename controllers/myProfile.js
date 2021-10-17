const jsonwebtoken = require('jsonwebtoken')
const User = require('../model/User.js');


const myProfile = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jsonwebtoken.verify(token, process.env.SECRET);

    const { lastToken } = await User.findOne({ _id: decoded.id })

    if (token !== lastToken) {
        res.status(401).json({ desc: "Session terminated, please login" });
    } else {
        // update token as lastToken
        const updatedUser = await User.findOneAndUpdate({ _id: decoded.id }, { lastToken: token });

        res.status(200).json({ desc: updatedUser });
    }

}

module.exports = myProfile;