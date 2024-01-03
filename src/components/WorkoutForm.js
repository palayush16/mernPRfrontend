import { useState } from "react"
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext"
import Stats from './Stats';

const WorkoutForm=()=>{
    const{dispatch} =useWorkoutsContext()
    const{user}=useAuthContext()

    const [title,setTitle] = useState('');
    const [load,setLoad] = useState('');
    const [reps,setReps] = useState('');
    const [error,setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);  //required as we our making custom error message

    const handleSubmit= async (e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in')
            return
        }

        const workout={title,load,reps};
        console.log(workout);

        const response = await fetch('https://mern-pr-backend.onrender.com/api/workouts',{
            method: 'POST',
            body: JSON.stringify({title: title,load: load,reps: reps}),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();
        
        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log("new workout added",json);
            dispatch({type: 'CREATE_WORKOUT', payload: json }) ;//updates the global context about new workout added
        }
    }

    return(
        <div>
            <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Excercise Title</label>
            <input 
                type="text" 
                onChange={(e)=>{setTitle(e.target.value)}}
                value={title}
                className={emptyFields.includes('title')? 'error' : ''}
            />
            <label>Load(in Kg)</label>
            <input 
                type="number" 
                onChange={(e)=>{setLoad(e.target.value)}}
                value={load}
                className={emptyFields.includes('load')? 'error' : ''}
            />
            <label>Reps</label>
            <input 
                type="number" 
                onChange={(e)=>{setReps(e.target.value)}}
                value={reps}
                className={emptyFields.includes('reps')? 'error' : ''}
            />

            <button >Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
        <div>
            <Stats />
        </div>
        </div>
    )
}

export default WorkoutForm;