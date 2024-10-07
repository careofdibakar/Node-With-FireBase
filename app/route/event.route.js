module.exports = (app) => {
  var router = require("express").Router();

  const eventController = require("../controller/event.controller.js");

  router.post("/create-event", eventController.create);

  // router.get("/user", userController.show);
  // router.put("/update-user", userController.update);
  // router.delete("/delete-user", userController.delete);

  app.use("/", router);
};
