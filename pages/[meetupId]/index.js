import { Fragment } from "react";
import { MongoClient, ObjectId } from 'mongodb';
import Head from "next/head";
import { Fragment } from "react";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
    <Head>
    <title>{props.meetupData.title}</title>
    <meta name="description" content={props.meetupData.description}/>
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      ttile={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
  );
}


export async function getStaticPaths(){

  const client = await MongoClient.connect (
    'mongodb+srv://8869:Umanand321@cluster0.xrrz76s.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find({}, {_id: 1}).toArray();
  client.close();
  // first bracket means fetcjing all the object no filter criteria
  // second parameter means which should be extracted only include the id not other value
  return {
    fallback: false,
    paths: meetups.map((meetup)=>({
      params: {meetupId: meetup._id.toString()}
      // object with object
    }))
    /*[
      {
        params:{
          meetupId: 'm1',
        }
      },

      {
        params:{
          meetupId: 'm2',
        }
      },
      {
        params:{
          meetupId: 'm3'
        }
      },
    ]*/

  }
}

//Note - We can use useRouter to fetch ID because it gets used in Componenet
// but to use in getStaticprops we need to rely on params

export async function getStaticProps() {

  const meetupId = context.params.meetupId;
  //console.log(meetupId);

  // fetch data for a single meetup
  const client = await MongoClient.connect (
    'mongodb+srv://8869:Umanand321@cluster0.xrrz76s.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupCollection = db.collection('meetups');
  const selectedMeetup = await meetupCollection.find({_id: ObjectId(meetupId) });
  

 
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      }
    },
  };
}

export default MeetupDetails;
