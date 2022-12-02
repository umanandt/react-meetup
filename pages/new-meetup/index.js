import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';
function NewMeetupPage() {

 const routerr =  useRouter();
  async function addMeetupHandler(MeetupData) {
    const response = await fetch('/api/new-meetupp', {
      method: "POST",
      body: JSON.stringify(MeetupData),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    })
    const data =  await response.json();
    console.log(data);   

   routerr.push('/');
  
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
