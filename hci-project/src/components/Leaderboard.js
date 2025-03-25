import Ranking from "./Ranking"
import ProgressBar from "./ProgressBar";
import ExerciseForm from "./ExerciseForm";

const Leaderboard = ({user}) => {
    return (
        <>
        <ProgressBar username ={user.username} />
            <Ranking user = {user} />
            <ExerciseForm />
            
        </>
    )
}

export default Leaderboard;