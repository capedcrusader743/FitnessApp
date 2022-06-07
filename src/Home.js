import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebaseConfig';
import { query, collection, getDocs, where, doc, deleteDoc, onSnapshot, orderBy, getDoc } from 'firebase/firestore';
import ButtonAppBar from './ButtonAppBar';
import MuscleGroup from './MuscleGroup';
import CreateMuscle from './CreateMuscle';
import Stack from '@mui/material/Stack';
import "./Home.css";


function Home() {

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [muscleGroup, setMuscleGroup] = useState([]);
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // order the collection by alpha ascending
  const fetchMuscleGroup = async () => {
    try {
      const muscleGroupRef = query(
        collection(db, 'Categories'), 
        where('user', '==', user?.uid),
        orderBy('name', 'asc')
      );
  
      const unsubscribe = onSnapshot(muscleGroupRef, snapshot => {
        setMuscleGroup(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      })
      return () => {
        unsubscribe();
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    fetchMuscleGroup();
  }, [user, loading]);


  function addMuscleGroup(inputText) {
    // console.log(inputText);
    setMuscleGroup(prevMuscleGroup => {
      return [...prevMuscleGroup, inputText];
    });
  }

  function deleteMuscleGroup(id) {

    const docRef = doc(db, 'Categories', id);
    // console.log(key);
    console.log(docRef);
    deleteDoc(docRef)
      .then(() => console.log('Document deleted'))
      .catch(error => console.log(error.message));
  }

  return (

    <div className='homepage'>
      <div className='homepage_container'>
        <ButtonAppBar />
        <p>Logged in as</p> 
        <div>{name}</div>
        <div>UserID: {user?.uid}</div>
        <div>{user?.email}</div>
        <h1>Pick your muscle group</h1>
        <CreateMuscle onAdd={addMuscleGroup} />
        <Stack spacing={2} direction="column">
          {muscleGroup.map((muscleItem) => {
          return (
            <MuscleGroup 
              key={muscleItem.id}
              id={muscleItem.id}
              // muscle={muscleItem.data}
              // id={muscleItem.id}
              name={muscleItem.data.name}
              onDelete={deleteMuscleGroup}
            />
          );
        })}
        </Stack>
        {/* <ul>
          {muscleGroup.map(muscleItem => (
            <li key={muscleItem.id}>
              {muscleItem.data.muscle}
            </li>
          ))}
        </ul> */}
      </div>
    </div>

  )
}

export default Home