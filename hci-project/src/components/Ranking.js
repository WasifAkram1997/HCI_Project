import React, { useEffect, useState } from "react";
import { Table, Container, Card } from "reactstrap";

const Ranking = ({ user }) => {
  const [users, setUsers] = useState([]);
  const highlightName = user.id

  useEffect(() => {
    fetch("http://localhost:5000/users") // Fetch data from JSON server
      .then((response) => response.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [user]);

  // Function to get medal emoji based on score
  const getMedal = (score) => {
    if (score < 200) return "🥉"; // Bronze
    if (score >= 200 && score < 400) return "🥈"; // Silver
    if (score >= 400 && score < 600) return "🥇"; // Gold
    if (score >= 600 && score < 800) return "💎"; // Diamond
    return "🏆"; // Platinum
  };

  return (
    // <Container className="mt-5 d-flex justify-content-center">
      <Container >
        <h4 className="mb-4">🏆 Leaderboard </h4>
        {/* <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            borderRadius: "10px",
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: "#ccc #f8f9fa",
          }}
        > */}
          <Table bordered hover responsive>
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
                  className={player.id === highlightName ? "table-secondary font-weight-bold" : ""}
                  style={{
                    fontSize: "1.1rem",
                    transition: "0.3s",
                    cursor: "pointer",
                  }}
                >
                  <td style={{ fontWeight: "bold" }}>{index + 1}</td>
                  <td>
                    {getMedal(player.score)} {player.firstName + " " + player.lastName} 
                  </td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        {/* </div> */}
      
    </Container>
  );
};

export default Ranking;
