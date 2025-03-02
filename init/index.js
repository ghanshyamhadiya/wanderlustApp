const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js")

main()
.then(res => console.log("connection"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj) => ({...obj, owner: "67bb1e661fc3513a3b424b88"}))
    await Listing.insertMany(initData.data)
    console.log("data was intialize")
}
initDB()