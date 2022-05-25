import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from './firebaseConfig';
import { query, collection, getDocs, where } from 'firebase/firestore';
import ButtonAppBar from './ButtonAppBar';
import MuscleGroup from './MuscleGroup';
import CreateMuscle from './CreateMuscle';

function Home() {

  const [user, loading, error] = useAuthState(auth);
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
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  function addMuscleGroup(newMuscleGroup) {
    setMuscleGroup(prevMuscleGroup => {
      return [...prevMuscleGroup, newMuscleGroup];
    });
  }



  return (

    <div className='homepage'>
      <div className='homepage_container'>
        <ButtonAppBar />
        <p>Logged in as</p> 
        <div>{name}</div>
        <div>{user?.email}</div>
        <h1>Pick your muscle group</h1>
        <CreateMuscle onAdd={addMuscleGroup} />
        {muscleGroup.map((muscleItem, index) => {
          return (
            <MuscleGroup
              key={index}
              id={index}
              muscle={muscleItem.muscle}
            />
          );
        })}
      </div>
    </div>

  )
}

export default Home