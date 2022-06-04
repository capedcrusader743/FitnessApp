import React, { useEffect, useState } from 'react'
import { db, auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { query, collection, getDocs, where, doc, deleteDoc, onSnapshot, orderBy } from 'firebase/firestore';
import Stack from '@mui/material/Stack';
import ButtonAppBar from './ButtonAppBar';
import './ExerciseProgress.css';
import CreateProgress from './CreateProgress';
import Progress from './Progress';
import {Line} from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';


function ExerciseProgress() {

  const exercise = useParams();
  const [user, loading] = useAuthState(auth);
  const [progresses, setProgresses] = useState([]);
  const navigate = useNavigate();



  // fetch progresses here
  const fetchProgresses = async () => {
      try {
          const progressesRef = query(
              collection(db, 'Progress'),
              where('user', '==', user?.uid)
          )

          const unsubscribe = onSnapshot(progressesRef, snapshot => {
              setProgresses(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
          })
          return () => {
              unsubscribe();
          }
      } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
      }
  }

  // then use useEffect to display both of those data
  useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchProgresses();
  }, [user,loading]);

  function addProgresses(inputText) {
      setProgresses(prevProgresses => {
          return [...prevProgresses, inputText];
      });
  }

//     const datas = {
//     labels: [progresses[0].data.date, progresses[1].data.date, progresses[2].data.date, progresses[3].data.date],
//     datasets: [
//       {
//         label: "First dataset",
//         data: [progresses[0].data.set, progresses[1].data.set, progresses[2].data.set, progresses[3].data.set],
//         fill: true,
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)"
//       }
//     ]
//   };
//   console.log(progresses[0].data.date);
//   const datas = progresses.map((progress) => {
//       labels: progress.data.date
//       datasets: [
//           {
//               label: "first dataset",
//               data: progress.data.set,
//               fill: true,
//               backgroundColor: "rgba(75,192,192,0.2)",
//               borderColor: "rgba(75,192,192,1)"
//           }
//       ]
//   });

  return (
    <div>
        <ButtonAppBar />
        <h1>{exercise.progress}</h1>
        {/* <Line data={datas}></Line> */}
        <CreateProgress onAdd={addProgresses} />
        <Stack spacing={2} direction="column">
            {progresses.map((progress) => {
                return (
                    <Progress
                        key={progress.id}
                        id={progress.id}
                        date={progress.data.date}
                        set={progress.data.set}
                    />
                )
            })}
        </Stack>

    </div>
  )
}

export default ExerciseProgress