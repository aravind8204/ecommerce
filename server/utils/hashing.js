const bcrypt = require("bcrypt");

const saltRounds = 9;

const hashPassword = async(password) =>{
        let result = await bcrypt.hash(password,saltRounds);
        return result;
}

const comparePassword = async({userPassword,dbPassword}) =>{
        let result = await bcrypt.compare(userPassword,dbPassword);
        return result;
}


module.exports = {hashPassword,comparePassword};

