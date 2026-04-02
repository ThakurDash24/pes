import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '30d'
    });
};

export default generateToken;