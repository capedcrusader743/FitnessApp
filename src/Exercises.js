import React, { useEffect, useState } from 'react'
import { db, auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { query, collection, getDocs, where, doc, deleteDoc, onSnapshot, orderBy } from 'firebase/firestore';
import ButtonAppBar from './ButtonAppBar';
import Stack from '@mui/material/Stack';
import CreateExercise from './CreateExercise';
import ExerciseGroup from './ExerciseGroup';

function Exercises() {
  const navigate = useNavigate();
  // if (location.state == null) {
  //   console.log("null");
  // }
  //let { from } = location.state;
  let { from } = useParams();
  console.log(from);


  const [user, loading] = useAuthState(auth);
  const [exercise_list, setexercise_list] = useState([]);
  const [name, setName] = useState("");

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

  const fetchExercise = async () => {
     try {
       const exerciseRef = query(
         collection(db, 'Workouts'), 
         where('user', '==', user?.uid),
         where('category', '==', from),
         orderBy('name', 'asc')
       );

       const unsubscribe = onSnapshot(exerciseRef, snapshot => {
         setexercise_list(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
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
    fetchExercise();
  }, [user, loading]);

  function addExercise(inputText) {
    // console.log(inputText);
    setexercise_list(prevExercise => {
      return [...prevExercise, inputText];
    });
  }

  function deleteExercise(id) {
    // console.log(e);
    const docRef = doc(db, 'Workouts', id);
    // console.log(key);
    console.log(docRef);
    deleteDoc(docRef)
      .then(() => console.log('Document deleted'))
      .catch(error => console.log(error.message));
  }


  return (
    <div className='ExercisePage'>
      <ButtonAppBar />
      <p>Logged in as</p> 
      <div>{name}</div>
      <div>UserID: {user?.uid}</div>
      <div>{user?.email}</div>
      <div>What exercise will you do today?</div>
      <CreateExercise cat={from} onAdd={addExercise} />
      <Stack spacing={2} direction="column">
        {exercise_list.map((exercise) => {
          return (
            <ExerciseGroup 
              key={exercise.id}
              id={exercise.id}
              cat={from}
              // muscle={muscleItem.data}
              // id={muscleItem.id}
              name={exercise.data.name}
              onDelete={deleteExercise}
            />
          );
        })}
      </Stack>
    </div>
  )
}

export default Exercises