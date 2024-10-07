const model = require("../model/common.model");

exports.create = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      Error: "Empty Content",
    });
  }

  const { collectionName } = req.body;
  if (!collectionName) {
    return res.status(400).send({
      Error: "Collection Name is misssing",
    });
  }

  const { eventName, date } = req.body.data;

  if (!eventName) {
    return res.status(400).send({
      Error: "Event Name is misssing",
    });
  }

  if (!date) {
    return res.status(400).send({
      Error: "Date is misssing",
    });
  }

  const newEvent = { ...req.body.data };
  try {
    let response = await model.create(collectionName, newEvent);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({
      message: "Error saving user",
      error: error.message,
    });
  }
};
