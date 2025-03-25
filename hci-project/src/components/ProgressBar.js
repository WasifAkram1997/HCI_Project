import React, { useEffect, useState } from "react";
import { Progress, Container, Card } from "reactstrap";

const ProgressBar = ({ username }) => {
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
        const user = data.find((u) => u.username === username);
        if (user) {
          calculateProgress(user.score);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [username]);

  const calculateProgress = (score) => {
    setScore(score);
    let rankName = "Bronze",
      nextRankName = "Silver",
      nextThreshold = 200,
      percentage = (score / 200) * 100;

    if (score >= 200 && score < 500) {
      rankName = "Silver";
      nextRankName = "Gold";
      nextThreshold = 500;
      percentage = ((score - 200) / 300) * 100;
    } else if (score >= 500 && score < 1000) {
      rankName = "Gold";
      nextRankName = "Diamond";
      nextThreshold = 1000;
      percentage = ((score - 500) / 500) * 100;
    } else if (score >= 1000 && score < 1500) {
      rankName = "Diamond";
      nextRankName = "Platinum";
      nextThreshold = 1500;
      percentage = ((score - 1000) / 500) * 100;
    } else if (score >= 1500) {
      rankName = "Platinum";
      nextRankName = "Max Rank!";
      nextThreshold = 1500;
      percentage = 100;
    }

    setRank(rankName);
    setNextRank(nextRankName);
    setPointsToNext(nextThreshold - score);
    setProgress(percentage);
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card
        className="p-4 shadow-lg w-100"
        style={{
          maxWidth: "700px",
          width: "95%",
          background: "#f8f9fa",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-3" style={{ fontWeight: "bold", color: "#343a40" }}>
          🎖 Your Rank: {rank}
        </h3>
        <h5 className="text-center text-muted">
          {nextRank !== "Max Rank!" ? `You need ${pointsToNext} more points for ${nextRank}` : "You have reached the highest rank!"}
        </h5>

        <div className="progress-container mt-4">
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
      </Card>
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
