const db = require('./db');
function getAllDrinks(req, res) {
  const drinks = db.getDrinks();
  res.json(drinks);
}
function getOneDrink(req, res) {
  const id = +req.params.id;
  const drinks = db.getDrinks();
  const drink = drinks.find((u) => u.id === id);
  if (drink) {
    res.json(drink)
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}
async function createDrink(req, res) {
  const data =  req.body;
  if (!data) {
    return res.status(403).json({ error: "User data missing" });
  }
  const newDrink = { ...data, id: Date.now() };
  const drinks = db.getDrinks();
  db.saveDrinks([...drinks, newDrink]);
  res.json(newDrink);
}
async function updateOneDrink(req, res) {
  const id = +req.params.id;
  const { name, ingredients, userId, description, recipe } = req.body;
  if (!name || !ingredients || !userId || !description, recipe) {
    return res.status(403).json({ error: "User data missing" });
  }
  const drinks = db.getDrinks();
  const index = drinks.findIndex((user) => user.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { name, ingredients, userId, description, recipe, id });
    db.saveDrinks(drinks);
    res.json(drinks[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}
async function patchOneDrink(req, res) {
  const data = req.body;
  const id = +req.params.id;
  const drinks = db.getDrinks();
  const index = drinks.findIndex((drink) => drink.id === id);
  if (index > -1) {
    drinks.splice(index, 1, { ...drinks[index], ...data })
    db.saveDrinks(drinks);
    res.json(drinks[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}
function deleteOneDrink(req, res) {
  const id = +req.params.id;
  const drinks = db.getDrinks();
  const index = drinks.findIndex((user) => user.id === id);
  if (index > -1) {
    drinks.splice(index, 1);
    db.saveDrinks(drinks);
  }
  res.json({ status: "success" });
}
module.exports = { getAllDrinks, createDrink, patchOneDrink, getOneDrink, updateOneDrink, deleteOneDrink };





// const db = require("./db");
 
// function getAllDrinks(req, res) {
//     const drinks = db.getDrinks();
//     res.json(drinks);
// }

// async function createDrink(req, res) {
//     const data = req.body;
//     const drinks = db.getDrinks();
//     drinks.push({...data, id: Date.now()})
//     db.saveDrinks(drinks);
//     res.json(drinks.pop())
// }

// async function patchOnDrink(req, res) {
//     const data = req.body;
//     const id = +req.params.id;
//     const drinks =  db.getDrinks();
//     const index = drinks.findIndex((drink) => drink.id === id);
//     if (index > -1) {
//         drinks.splice(index, 1, {...drinks[index], ...data});
//         db.saveDrinks(drinks);
//         res.json(drinks[index]);
//     }else {
//         res.status(404).json( { status: "NOT_FOUND" });
//     }
// }

// module.exports = { getAllDrinks, createDrink, patchOnDrink }