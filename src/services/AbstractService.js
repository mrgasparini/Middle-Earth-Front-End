const axios = require('axios');
const baseUrl = process.env.VUE_APP_API_URL;

async function GetHeaders(){
    if(localStorage.token)
    return { "x-access-token": localStorage.token }
    return {}
}

async function Get(url, id){
    const headers = await GetHeaders();
    return axios.get(baseUrl + url + `${id}`, {headers});
}

async function GetAll(url){
    const headers = await GetHeaders();
    return axios.get(baseUrl + url, {headers});
}

async function Post(url, model){
    const headers = await GetHeaders();
    return axios.post(baseUrl + url, model, {headers});
}

async function Delete(url, id){
    const headers = await GetHeaders();
    return axios.delete(baseUrl + url + `/${id}`, {headers});
}

module.exports = { Get, GetAll, Post, Delete, GetHeaders }