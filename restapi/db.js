const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "./db.json");
const DRINK_DB_FILE = path.join(__dirname, "./drinks.db.json");
const CATEGORY_DB_FILE = path.join(__dirname, "./category.db.json");

function getUsers() {
  try {
    const data = readFileSync(DB_FILE) || "[]";
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return [];
  }
}

function saveUsers(users = []) {
  try {
    const data = JSON.stringify(users, null, 4);
    writeFileSync(DB_FILE, data);
  } catch (e) {
    throw new Error("Database write error");
  }
}

function getDrinks() {
  try {
    const data = readFileSync(DRINK_DB_FILE) || "[]";
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return [];
  }
}

function saveDrinks(drinks = []) {
  try {
    const data = JSON.stringify(drinks, null, 4);
    writeFileSync(DRINK_DB_FILE, data);
  } catch (e) {
    throw new Error("Database write error");
  }
}

function getCategories() {
  try {
    const data = readFileSync(CATEGORY_DB_FILE) || "[]";
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return [];
  }
}

function saveCategories(drinks = []) {
  try {
    const data = JSON.stringify(drinks, null, 4);
    writeFileSync(CATEGORY_DB_FILE, data);
  } catch (e) {
    throw new Error("Database write error");
  }
}

const db = { saveUsers, getUsers, getDrinks, saveDrinks, getCategories, saveCategories }

module.exports = db;
