const express = require("express");
const cors = require("cors");
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  patchOnUser,
  deleteOneUser,
} = require("./users");
const {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  patchOneDrink,
  deleteOneDrink,
} = require("./drinks");
const {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateOneCategory,
  patchOneCategory,
  deleteOneCategory,
} = require("./category");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEYS = ["1", "2", "3", "4", "5"]

app.use(function (req, res, next) {
  const { apiKey } = req.query;
  const key = req.get("x-api-key")
  if (API_KEYS.includes(apiKey) || API_KEYS.includes(key)) {
    next();
  } else {
    res.sendStatus(403);
  }
})

// app.use(function(req, res, next){
//   console.log(`${new Date().toTimeString()}   ${req.originalUrl}`)
// })

app.get("/users", getAllUsers);
app.post("/users", createUser);
app.get("/users/:id", getOneUser);
app.put("/users/:id", updateOneUser);
app.patch("/users/:id", patchOnUser);
app.delete("/users/:id", deleteOneUser);

app.get("/drinks", getAllDrinks);
app.post("/drinks", createDrink);
app.get("/drinks/:id", getOneDrink);
app.put("/drinks/:id", updateOneDrink);
app.patch("/drinks/:id", patchOneDrink);
app.delete("/drinks/:id", deleteOneDrink);

app.get("/category", getAllCategories);
app.post("/category", createCategory);
app.get("/category/:id", getOneCategory);
app.put("/category/:id", updateOneCategory);
app.patch("/category/:id", patchOneCategory);
app.delete("/category/:id", deleteOneCategory);

app.listen(8000, function () {
  console.log("Running on port 8000")
});

// function registerRoute(routePrefix, handler, req, res) {
//   const { pathname } = parse(req.url);
//   if (pathname.startsWith(routePrefix)) {
//     handler(pathname, req, res)
//   }
// }


// function throw404(res) {
//   writeJson(res, { status: "Resource not found" }, 404);
// }

// function handleDrinksRequest(pathname, req, res) {
//   if (pathname === "/drinks") {
//     if (req.method === "GET") {
//       getAllDrinks(req, res)
//     } else if (req.method === "POST") {
//       createDrink(req, res)
//     }
//   } else if (pathname.split("/").length === 3) {
//     switch (req.method) {
//       case "GET":
//         return; // handle get one
//       case "PUT":
//         return; // handle put one
//       case "PATCH":
//         return patchOneDrink(res, req);
//       // handle patch one
//       case "DELETE":
//         return; // handle delete one
//       default:
//         break;
//     }
//   }
// }

// function handleUsersRequest(req, res) {
//   const { pathname } = parse(req.url);
//   const { method } = req;
//   if (pathname === "/users") {
//     if (method === "GET") {
//       return getAllUsers(req, res);
//     } else if (method === "POST") {
//       return createUser(req, res);
//     }
//   } else if (pathname.split("/").length === 3) {
//     switch (method.toLowerCase()) {
//       case "get":
//         return getOneUser(req, res);
//       case "put":
//         return updateOneUser(req, res);
//       case "patch":
//         return patchOnUser(req, res);
//       case "delete":
//         return deleteOneUser(req, res);
//       default:
//         break;
//     }
//   }

//   throw404(res);
// }
