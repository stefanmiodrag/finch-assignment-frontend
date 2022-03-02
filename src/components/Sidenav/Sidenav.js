import React from "react";

import "./Sidenav.css";

const Sidenav = ({ selectedBuilding, buildingData, handleChange }) => (
  <div className="sidenav">
    <span className="sidenav__title">Properties</span>

    <label>
      <span className="sidenav__label">Height</span>
      <input
        className="sidenav__input"
        type="number"
        placeholder="Height..."
        name="height"
        value={buildingData[selectedBuilding].height}
        onChange={handleChange}
      />
    </label>

    <label>
      <span className="sidenav__label">Width</span>
      <input
        className="sidenav__input"
        type="number"
        placeholder="Width..."
        name="width"
        value={buildingData[selectedBuilding].width}
        onChange={handleChange}
      />
    </label>

    <label>
      <span className="sidenav__label">Roof Angle</span>
      <input
        className="sidenav__input"
        type="number"
        placeholder="Roof Angle..."
        name="roofAngle"
        value={buildingData[selectedBuilding].roofAngle}
        onChange={handleChange}
      />
    </label>
  </div>
);

export default Sidenav;
