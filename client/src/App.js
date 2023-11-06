import { useEffect } from "react";
import "./App.css";
import baseUrl from "./baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { AppBanner, LeftSideBar } from './components'

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/get-users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <AppBanner />

      <div className="background">
        <div className="testRead">
          <h1>READ THIS</h1>
          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <div>
                  <h3>
                    {user.name} {user.lastName}
                  </h3>
                </div>
              );
            })}
        </div>
      </div>
      <div className="foreground">
        <LeftSideBar />
      </div>

      <button onClick={() => navigate("create")}>Create</button>
    </div>
  );
}

export default App;
