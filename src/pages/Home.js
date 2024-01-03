import {useEffect} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () =>{

    // const [workouts,setWorkouts] = useState(null)  no longer need this local state as custom context hook is used
    const {workouts, dispatch} = useWorkoutsContext()

    const {user} = useAuthContext()

    //try fetching all workout and list them in all of the homepage
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch('https://mern-pr-backend.onrender.com/api/workouts',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json=await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})   //fire workoutsReducer in WorkoutContext.js  
            }
        }

        if(user){
            fetchWorkouts()
        }
        
    },[dispatch,user]) //[]-->fire once      disaptch wriiten here bcoz of react warning
    //user added as dependency of useEffect

    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home