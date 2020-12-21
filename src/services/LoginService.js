const AbstractService = require("./AbstractService")

async function DoLogin(user, password){
    const response = await AbstractService.Post("/auth/login", {username: user, password: password});
    return response.data;
}

async function RegisterUser(user, password, confirmPassword){
    const response = await AbstractService.Post("/user/register", {username: user, password: password, confirmPassword: confirmPassword});
    return response.data;
}
module.exports = { DoLogin, RegisterUser }