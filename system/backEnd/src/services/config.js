import dotenv from 'dotenv';
dotenv.config();
module.exports = {
  mode: process.env.NODE_ENV || "production",
  port: process.env.PORT || 3000,
  urlmongodb: process.env.MONGO_URL || "localhost:27017/",
  namedb: process.env.MONGO_NAMEDB || "dbsistema",
  secret_token:process.env.SECRET_TOKEN
};
