import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, setCookie} from './CookieHelper';
import "./Style.css";


function App() {
  const [building, setBuilding] = useState("");
  const [userID, setUserID] = useState(null);
  const [util, setUtil] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [requestType, setRequestType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cookieUserID = getCookie("userID");

    if (!cookieUserID) {
      navigate("/login");
      return;
    }
    setUserID(cookieUserID);
  }, [navigate]);


  const makeRequest = async (userID) => {
    if (!building || !util || !description || !requestType) {
      alert("Please fill out every field of the form.");
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'

    try {
      const response = await fetch("/insert-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestDate: today,
          requestDescription: description,
          requestType: requestType,
          amenityType: util,
          buildingName: building,
          userID: userID,
          imageURL: file ? file.name : null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Request submitted successfully!");
      } else {
        alert("Failed to submit request: " + data.message);
      }

    } catch (error) {
      alert("Internal server error: " + error);
    }
  };


  return (
      <div>
        <div className="Navbar">
          <Link to="/">Home</Link>
        </div>
        <div className="App">
          <header className="App-header">
            <p>Make Request</p>
            <input
                type="text"
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="Building Code"
            />
            <select value={util} onChange={(e) => setUtil(e.target.value)}>
              <option value="">Select Amenity</option>
              <option value="Washroom">Washroom</option>
              <option value="WaterFountain">Water Fountain</option>
              <option value="Microwave">Microwave</option>
            </select>

          <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
            <option value="Update">Update</option>
            <option value="Removal">Removal</option>
            <option value="Add New">Add New</option>
          </select>
          <textarea
              onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
                cols={40}
            />
            <div>
              <div className="Login-submit">
                <input
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                />
                {file && <img src={URL.createObjectURL(file)} alt="Selected file" />} {/* Show file preview */}
              </div>
              <div className="Login-submit">
                <button onClick={() => makeRequest(userID)}>Submit Request</button>
              </div>
            </div>
          </header>
        </div>
      </div>
  );
}

export default App;
