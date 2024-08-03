import { Link } from "react-router-dom";
import { useState } from "react";
import "./Style.css";

const testUtils = [
  {
    utilID: 1,
    type: "washroom",
    rating: 3.2,
    building: "iccs",
    location: "top floor",
  },
  {
    utilID: 2,
    type: "washroom",
    rating: 5.0,
    building: "cbe",
    location: "beside the water fountain",
  },
  {
    utilID: 3,
    type: "microwave",
    rating: 1.7,
    building: "iccs",
    location: "inside a large closet",
  },
  {
    utilID: 4,
    type: "waterfountain",
    rating: 4.1,
    building: "fsc",
    location: "at the end of a rainbow",
  },
  {
    utilID: 5,
    type: "microwave",
    rating: 2.8,
    building: "heb",
    location: "inside the space that cannot be seen",
  },
];

function Util(prop) {
  const util = prop.util;
  return (
    <div>
      <p>Type: {util.type}</p>
      <p>Rating: {util.rating}</p>
      <p>
        Located: {util.building} {util.location}
      </p>
    </div>
  );
}

function App() {
  const [showWash, setShowWash] = useState(false);
  const [showWater, setShowWater] = useState(false);
  const [showMicro, setShowMicro] = useState(false);
  return (
    <div>
      <div className="Navbar">
        <Link to="/">Home</Link>
      </div>
      <label>
        <input
          type="checkbox"
          checked={showWash}
          onChange={() => {
            setShowWash(!showWash);
          }}
        />
        Washrooms
      </label>
      <label>
        <input
          type="checkbox"
          checked={showWater}
          onChange={() => {
            setShowWater(!showWater);
          }}
        />
        Water Fountains
      </label>
      <label>
        <input
          type="checkbox"
          checked={showMicro}
          onChange={() => {
            setShowMicro(!showMicro);
          }}
        />
        Microwaves
      </label>
      {testUtils.map((util) => {
        if (util.type === "washroom" && showWash) {
          return <Util util={util} />;
        }
        if (util.type === "waterfountain" && showWater) {
          return <Util util={util} />;
        }
        if (util.type === "microwave" && showMicro) {
          return <Util util={util} />;
        }
        return null;
      })}
    </div>
  );
}

export default App;