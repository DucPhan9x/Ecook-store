import mongoose from "mongoose";
export const dbConnection = async (uri) => {
  try {
    console.log(uri);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.once("open", () => {
      console.log("Connected to database");
    });
  } catch (error) {
    console.log(error);
  }
};
const addDefaultPermission = async () => {
  const csv = require("csvtojson/v2");

  const data = await csv().fromFile("permissions.csv");
  console.log(data);
  await Permission.insertMany(data);
};
