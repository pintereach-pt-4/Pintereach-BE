const db = require("../../db");

const getUsers = () => {
  return db("users");
};

// Function to Test Database Helper Methods
const execute = async () => {
  const data = await getUsers();
  console.log(data);
};

execute();
