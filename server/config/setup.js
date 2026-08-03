import { create } from "node:domain";
import { connectDB } from "./db.js";
import mongoose from "mongoose";

await connectDB();
const client = mongoose.connection.getClient();

try {

  const db = await mongoose.connection.db;

  const command = "collMod"
  //const command = "create"
  //* Users Schema
  await db.command({
    [command]: "users",
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          '_id',
          'name',
          'email',
          // 'password',
        ],
        properties: {
          _id: {
            bsonType: 'objectId'
          },
          name: {
            bsonType: 'string',
            minLength: 4,
            description: "name field should be a string and at least 3 characters"
          },
          email: {
            bsonType: 'string',
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
            description: "Please enter a valid email"
          },
          password: {
            bsonType: 'string',
            minLength: 4
          },
          rootDirId: {
            bsonType: 'objectId'
          },
          picture: {
            bsonType: "string"
          },
          __v: {
            bsonType: "int"
          }
        },
        additionalProperties: false
      },
    },
    validationAction: "error",
    validationLevel: "strict"
  });
} catch (error) {
  console.log("Error while setting up database", error)
} finally {
  await mongoose.disconnect()
}

