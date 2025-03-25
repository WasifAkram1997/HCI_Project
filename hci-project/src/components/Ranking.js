import React, { useEffect, useState } from "react";
import { Table, Container, Card } from "reactstrap";

const Ranking = ({ user }) => {
  const [users, setUsers] = useState([]);
  const highlightName = user.username; // Name to highlight

  useEffect(() => {
    fetch("http://localhost:5000/users") // Fetch data from JSON server
      .then((response) => response.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Function to get medal emoji based on score
  const getMedal = (score) => {
    if (score < 200) return "🥉"; // Bronze
    if (score >= 200 && score < 500) return "🥈"; // Silver
    if (score >= 500 && score < 1000) return "🥇"; // Gold
    if (score >= 1000 && score < 1500) return "💎"; // Diamond
    return "🏆"; // Platinum
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="p-4 shadow-lg w-100"
        style={{
          maxWidth: "1200px", // Wider for large screens
          width: "95%", // Auto-adjust for smaller screens
          background: "#f8f9fa",
          borderRadius: "15px",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#343a40" }}
        >
          🏆 Leaderboard
        </h2>
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            borderRadius: "10px",
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: "#ccc #f8f9fa",
          }}
        >
          <Table striped bordered hover responsive className="bg-white text-center">
            <thead className="thead-dark">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((player, index) => (
                <tr
                  key={player.id}
                  className={player.username === highlightName ? "table-warning font-weight-bold" : ""}
                  style={{
                    fontSize: "1.1rem",
                    transition: "0.3s",
                    cursor: "pointer",
                  }}
                >
                  <td style={{ fontWeight: "bold" }}>{index + 1}</td>
                  <td>
                    {getMedal(player.score)} {player.name} 
                  </td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
};

export default Ranking;
