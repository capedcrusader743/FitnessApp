import React, { useEffect, useState } from 'react'
import { db, auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { query, collection, where, onSnapshot, orderBy, getDoc, getDocs, doc } from 'firebase/firestore';
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
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();

//   console.log(exercise.progress);


  // fetch progresses here
  const fetchProgresses = async () => {
      try {
          const progressesRef = query(
              collection(db, 'Progress'),
              where('user', '==', user?.uid),
              where('w_name', '==', exercise.progress),
              orderBy('date', 'asc')
          )

          const unsubscribe = onSnapshot(progressesRef, snapshot => {
              setProgresses(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
              setSeries(snapshot.docs.map(doc => ({date: doc.data().date, set: doc.data().set})))
          })

          return () => {
              unsubscribe();
            //   unsub();
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



    let datas = {
    labels: series.map((data) => data.date),
    datasets: [
      {
        label: "Max Weight",
        data: series.map((data) => parseInt(data.set.split("/")[0])),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
          label: "Max Reps",
          data: series.map((data) => parseInt(data.set.split("/")[1])),
          fill: false,
          backgroundColor: "rgba(59,196,63,0.2)",
          borderColor: "rgba(59,196,63,1)"          
      }
    ]
    };
    // console.log(series);

  return (
    <div>
        <ButtonAppBar />
        <h1>{exercise.progress}</h1>
        <Line data={datas}></Line>
        <CreateProgress  />
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