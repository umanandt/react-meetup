//import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

/*const Dummy_Meetups = [
  {
    id: "1",
    title: "A first Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",

    address: "Some address 5, 12345",
    description: "I love meetips",
  },
  {
    id: "2",
    title: "A first Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",

    address: "Some address 5, 12345",
    description: "I love meetips",
  },

  {
    id: "3",
    title: "A first Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211153",

    address: "Some address 5, 12345",
    description: "I love meetips",
  },
];*/

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title> React Meetups </title>
        <meta
          name="description"
          content="A great tool to setup your Meetups with your friends"
        />
      </Head>

      <MeetupList meetups={props.meetups} />
    </Fragment>
  );

  // this main function will use props
  // which it is getting from the getSataticProos
  // in the form of object that contains props
}

// Connection mongo server to get data

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://8869:Umanand321@cluster0.xrrz76s.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// It can be asynce to return data and promise
// it means NEXT js will wait for data
// It executes during build process
//First this function executes
// It returns object only
// Data fetching for pre-rendering in one of the main features

/*export async function getServerSideProps(context) {
  
  const req = context.req;
  const res = context.res;
  
  // fetch data from an API
  return {
    props: {
      meetups: Dummy_Meetups,
    },
  };
}*/

// it runs on every incoming request
// no use of revalidate
// run always on the server after deployment

export default HomePage;
