// post/api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://8869:Umanand321@cluster0.xrrz76s.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup Inserted!" });
  }
}

export default handler;

// All code is for database connect and checking request and response
// fetching data from mongoDB