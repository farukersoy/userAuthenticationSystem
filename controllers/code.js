const jsonwebtoken = require('jsonwebtoken');
const User = require('../model/User.js');

const getSortedDiffArray = (name) => {
    let array = [];
    for (var i = 0; i < name.length; i++) {
        if (name.charCodeAt(i + 1) > name.charCodeAt(i)) {
            array.push({ i: i, diff: (name.charCodeAt(i + 1) - name.charCodeAt(i)) })
        }
    }
    array.sort((a, b) => a.diff - b.diff)
    return array;
}

const replace = (index, replacement, word) => {
    return word.substring(0, index) + replacement + word.substring(index + 1);
}


const code = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jsonwebtoken.verify(token, process.env.SECRET);

    const { firstName, lastName } = await User.findOne({ email: decoded.email });

    let fullName = (firstName.concat(lastName)).toLowerCase();

    const sorted = getSortedDiffArray(fullName);

    const newName = replace(sorted[0].i, fullName[(sorted[0].i) + 1], fullName);
    const newName1 = replace((sorted[0].i + 1), fullName[sorted[0].i], newName);

    res.status(200).json({ desc: newName1 });
}

module.exports = code;