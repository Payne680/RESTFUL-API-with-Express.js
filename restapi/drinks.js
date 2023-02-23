const { saveDrinks } = require("./db");
const db = require("./db");
const { writeJson, readRequestData, getIdFromUrl} = require("./utils");
 
function getAllDrinks(req, res) {
    const drinks = db.getDrinks();
    writeJson(res, drinks);
}

async function createDrink(req, res) {
    const data = await readRequestData(req);
    const drinks = db.getDrinks();
    drinks.push({...data, id: Date.now()})
    db.saveDrinks(drinks);
    writeJson(res, drinks.pop())
}

async function patchOneDrink(req, res) {
    const data =  await readRequestData(req);
    const id = getIdFromUrl(req.url);
    const drinks =  db.getDrinks();
    const index = drinks.findIndex((drink) => drink.id === id);
    if (index > -1) {
        drinks.splice(index, 1, {...drinks[index], ...data});
        db.saveDrinks(drinks);
        writeJson(res, drinks[index]);
    }else {
        writeJson(res, { status: "Not Found"}, 404)
    }
}

module.exports = { getAllDrinks, createDrink, patchOneDrink }