const db = require('./db');
function getAllCategories(req, res) {
  const category = db.getCategories();
  res.json(category);
}
function getOneCategory(req, res) {
  const id = +req.params.id;
  const category = db.getCategories();
  const drink = category.find((u) => u.id === id);
  if (drink) {
    res.json(drink)
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}
async function createCategory(req, res) {
  const data =  req.body;
  if (!data) {
    return res.status(403).json({ error: "User data missing" });
  }
  const newDrink = { ...data, id: Date.now() };
  const category = db.getCategories();
  db.saveCategories([...category, newDrink]);
  res.json(newDrink);
}
async function updateOneCategory(req, res) {
  const id = +req.params.id;
  const { name, ingredients, userId, description, recipe } = req.body;
  if (!name || !ingredients || !userId || !description, recipe) {
    return res.status(403).json({ error: "User data missing" });
  }
  const category = db.getCategories();
  const index = category.findIndex((user) => user.id === id);
  if (index > -1) {
    category.splice(index, 1, { name, ingredients, userId, description, recipe, id });
    db.saveCategories(category);
    res.json(category[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}
async function patchOneCategory(req, res) {
  const data = req.body;
  const id = +req.params.id;
  const category = db.getCategories();
  const index = category.findIndex((drink) => drink.id === id);
  if (index > -1) {
    category.splice(index, 1, { ...category[index], ...data })
    db.saveCategories(category);
    res.json(category[index]);
  } else {
    res.status(404).json({ status: "NOT_FOUND" });
  }
}
function deleteOneCategory(req, res) {
  const id = +req.params.id;
  const category = db.getCategories();
  const index = category.findIndex((user) => user.id === id);
  if (index > -1) {
    category.splice(index, 1);
    db.saveCategories(category);
  }
  res.json({ status: "success" });
}
module.exports = { getAllCategories, createCategory, patchOneCategory, getOneCategory, updateOneCategory, deleteOneCategory };
