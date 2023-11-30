var jwt = require('jsonwebtoken');
const jwt_SECRET = "iamaboy";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, jwt_SECRET);
        req.user = data.id; // Check this line to ensure it's correctly setting req.user
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser
