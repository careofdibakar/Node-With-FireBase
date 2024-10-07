const model = require("./../model/common.model");
const formatResponse = require("./../helper/formatResponse");

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

  const { firstName, lastName, age } = req.body.data;

  if (!firstName) {
    return res.status(400).send({
      Error: "First Name is misssing",
    });
  }
  if (!lastName) {
    return res.status(400).send({
      Error: "last Name is misssing",
    });
  }
  if (!age) {
    return res.status(400).send({
      Error: "Age is misssing",
    });
  }

  const newUser = { ...req.body.data };
  newUser.createdAt = new Date("YYYY-MM-DDTHH:MM:SSZ");
  try {
    let response = await model.create(collectionName, newUser);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({
      message: "Error saving user",
      error: error.message,
    });
  }
};

exports.fetch = async (req, res) => {
  let searchParams = {};

  if (req.query) {
    searchParams = req.query;
  }

  const collectionName = "users";

  try {
    let response = await model.getData(searchParams, collectionName);
    if (response == null) {
      res.status(200).json(formatResponse(200, "No Data Found!", {}));
    } else {
      res.status(201).json(formatResponse(201, "Successfull", response));
    }
  } catch (error) {
    res.status(500).send({
      message: "Error fetching data",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      Error: "Empty Content",
    });
  }

  const { documentID, updateData } = req.body;
  const collectionName = "users";

  try {
    let response = await model.edit(documentID, updateData, collectionName);
    if (response == null) {
      res.status(200).json(formatResponse(200, "Error while updation!", {}));
    } else {
      res.status(201).json(formatResponse(201, "Successfull", response));
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating data",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { documentID } = req.query;
  const collectionName = "users";

  try {
    let response = await model.delete(documentID, collectionName);
    if (!response) {
      res.status(404).json(formatResponse(404, "Document not found!", {}));
    } else {
      res
        .status(200)
        .json(formatResponse(200, "Successfully deleted", response));
    }
  } catch (error) {
    res.status(500).send({
      message: "Error deleting data",
      error: error.message,
    });
  }
};
