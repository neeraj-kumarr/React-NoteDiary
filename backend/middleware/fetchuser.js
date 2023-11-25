var jwt = require('jsonwebtoken');
const jwt_SECRET = "iamaboy";

const fetchuser = (req, res, next) => {
    // Get user from jwt and add id to object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }

    try {
        const data = jwt.verify(token, jwt_SECRET);
        req.user = data.id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
}

module.exports = fetchuser