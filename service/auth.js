const jwt = require("jsonwebtoken");
const secret = "Sujal$2709@";


function setUser(user){
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        }, 
        secret
    );  
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);   
    } catch (error) {
        return null;
    }
    return jwt.verify(token, secret)
}

module.exports = {
    setUser, 
    getUser,
};