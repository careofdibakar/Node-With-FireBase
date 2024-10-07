module.exports = (app) => {
  var router = require("express").Router();

  const userController = require("../controller/user.controller.js");

  router.post("/create-user", userController.create);
  router.get("/user", userController.fetch);
  router.put("/update-user", userController.update);
  router.delete("/delete-user", userController.delete);

  app.use("/", router);
};
