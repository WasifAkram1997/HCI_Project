import Ranking from "./Ranking"
import ProgressBar from "./ProgressBar";
import ExerciseForm from "./ExerciseForm";
import { Table } from "reactstrap";
import ExerciseTable from "./ExcerciseTable";
import { useEffect, useState } from "react";

const Leaderboard = ({user, setUser}) => {
    // const[user1, setUser1] = useState(user);
    useEffect(() => {}, [user])
    return (
        // <div className="w-100 d-flex flex-row justify-content-center">
            <div className=" d-flex flex-column justify-content-around vh-100">
                <ProgressBar user={user} />
                <Ranking user = {user} />
                <ExerciseTable user={user} setUser={setUser}/>
                

                {/* <Table /> */}
                {/* <ExerciseForm /> */}
            
            {/* </div> */}
        </div>
    )
}

export default Leaderboard;