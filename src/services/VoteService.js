const AbstractService = require("./AbstractService")
const axios = require('axios');

async function RegisterVote(placeId){
    return await AbstractService.Post("/vote/register", {placeId: placeId});
}

async function GetVotes(){
    return await AbstractService.GetAll("/vote/");
}

async function GetUserVote(){
    let response = await AbstractService.GetAll("/vote/user");
    return response.data;
}

async function CancelVote(){
    const headers = await AbstractService.GetHeaders();
    return axios.delete(process.env.VUE_APP_API_URL + '/vote', {headers});
}

module.exports = { RegisterVote, GetVotes, GetUserVote, CancelVote }