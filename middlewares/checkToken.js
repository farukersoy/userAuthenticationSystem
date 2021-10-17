const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
    try {
        if (!(req.headers.authorization.split(" ")[1])) res.status(401).json("token does not exist");

        const token = req.headers.authorization.split(" ")[1];

        if (token) {
            jwt.verify(token, process.env.SECRET);
        }

        next();
    } catch (err) {
        console.log({ err: err.message });
        res.status(401).json({ desc: err.message });
    }
}

module.exports = checkToken;
