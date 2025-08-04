import { initializeApp } from "firebase/app";
import{getDatabase,ref,set} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCBGTeMkmfjdBzRJz4LtJCs59c0OcswhlU",
  authDomain: "instagram-486e8.firebaseapp.com",
  databaseURL: "https://instagram-486e8-default-rtdb.firebaseio.com",
  projectId: "instagram-486e8",
  storageBucket: "instagram-486e8.firebasestorage.app",
  messagingSenderId: "166042914656",
  appId: "1:166042914656:web:18d79e987d9216b4ffd805",
  measurementId: "G-0X08KLSVC8"
};
const app=initializeApp(firebaseConfig);

function writeUserData(userId,email,name,imageUrl){
  const db=getDatabase();
  const reference=ref(db,'users/' + userId)

  set(reference,{
    username:name,
    email:email,
    prpfile_picture:imageUrl
  })

}
writeUserData('ahmed',"awu","ah1585229@gmail.com","asasf,asa//htp")
