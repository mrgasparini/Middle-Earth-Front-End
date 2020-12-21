const AbstractService = require("./AbstractService")

async function GetAllPlaces(){
    const response = await AbstractService.GetAll("/place");
    return response.data;
}

async function RegisterPlace(place){
    return await AbstractService.Post("/place/register", {place: place});
}

async function UpdatePlace(place){
    return await AbstractService.Post("/place/update", {place: place});
}

async function DeletePlace(placeId){
    return await AbstractService.Delete("/place", placeId);
}

module.exports = { GetAllPlaces, RegisterPlace, UpdatePlace, DeletePlace}