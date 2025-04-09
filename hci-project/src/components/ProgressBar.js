import React, { useEffect, useState } from "react";
import { Progress, Container, Card } from "reactstrap";

const ProgressBar = ({ user }) => {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState("Bronze");
  const [nextRank, setNextRank] = useState("Silver");
  const [pointsToNext, setPointsToNext] = useState(200);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch user's score from API
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const userdata = data.find((u) => u.id == user.id);
        if (userdata) {
          // console.log(user)
          calculateProgress(userdata.score);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [user]);

  const calculateProgress = (score) => {
    setScore(score);
    let rankName = "Bronze",
      nextRankName = "Silver",
      nextThreshold = 200,
      percentage = (score / 200) * 100;

    if (score >= 200 && score < 400) {
      rankName = "Silver";
      nextRankName = "Gold";
      nextThreshold = 400;
      percentage = 100 - (score  / 400) * 100;
    } else if (score >= 400 && score < 600) {
      rankName = "Gold";
      nextRankName = "Diamond";
      nextThreshold = 600;
      percentage = 100 - (score  / 600) * 100;
    } else if (score >= 600 && score < 800) {
      rankName = "Diamond";
      nextRankName = "Platinum";
      nextThreshold = 800;
      percentage = 100 - (score  / 800) * 100;
    } else if (score >= 800) {
      rankName = "Platinum";
      nextRankName = "Max Rank!";
      // nextThreshold = 1500;
      percentage = 100;
    }

    setRank(rankName);
    setNextRank(nextRankName);
    setPointsToNext(nextThreshold - score);
    setProgress(percentage);
  };

  return (
    <Container>
      {/* <Card
        // className="shadow-lg"
        className="p-4 border-0"
        style={{
          // maxWidth: "700px",
          // width: "95%",
          // background: "#f8f9fa",
          // borderRadius: "15px",
        }}
      > */}
      <div className="d-flex flex-row align-items-center">
        <h5 className="mr-2">
          🎖 Your Rank: {rank}
        </h5>
        <h6 className="ml-2">
          {nextRank !== "Max Rank!" ? `(You need ${pointsToNext} more points for ${nextRank})` : "(You have reached the highest rank!)"}
        </h6>
      </div>
        

        
       

        <div className="mt-3">
          <Progress
            animated
            color={rankColor(rank)}
            value={progress}
            style={{
              height: "30px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {progress.toFixed(1)}%
          </Progress>
        </div>
      {/* </Card> */}
    </Container>
  );
};

// Function to determine progress bar color
const rankColor = (rank) => {
  switch (rank) {
    case "Bronze":
      return "warning"; // Yellowish
    case "Silver":
      return "secondary"; // Grey
    case "Gold":
      return "gold"; // Gold
    case "Diamond":
      return "info"; // Blue
    case "Platinum":
      return "success"; // Green
    default:
      return "dark";
  }
};

export default ProgressBar;
