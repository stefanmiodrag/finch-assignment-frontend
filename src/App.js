import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import CameraControls from "./CameraControls";

import { generateBuildingGeometriesFromData } from "./utils/editor3d";
import { loadBuildData } from "./api";
import { Nav, Sidenav } from "./components";

import "./App.css";

THREE.Object3D.DefaultUp.set(0, 0, 1);

const defaultBuildingData = [
  { height: 10000, width: 10000, roofAngle: 30 },
  { height: 30000, width: 10000, roofAngle: 30 },
  { height: 20000, width: 15000, roofAngle: 30 },
];

export default function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(0);
  const [buildingData, setBuildingData] = useState(defaultBuildingData);

  const [buildingGeometries, setBuildingGeometries] = useState();

  useEffect(() => {
    loadBuildData(buildingData)
      .then((data) => generateBuildingGeometriesFromData(data))
      .then((geometries) => setBuildingGeometries(geometries));
  }, [buildingData]);

  function handleChange(e) {
    const newBuildingData = [...buildingData];
    newBuildingData[selectedBuilding] = {
      ...buildingData[selectedBuilding],
      [e.target.name]: Number(e.target.value),
    };
    setBuildingData(newBuildingData);
  }

  return (
    <>
      <Nav />

      <div className="container">
        <Canvas
          style={{ height: "calc(100vh - 60px)", width: "calc(100vw - 250px)" }}
          camera={{
            up: [0, 0, 1],
            position: [50000, 50000, 50000],
            near: 3000,
            far: 400000,
            fov: 70,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor("#eeeeee");
          }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight intensity={0.2} position={[1, 1, 1]} />

          {buildingGeometries &&
            buildingGeometries.length > 0 &&
            buildingGeometries.map((buildingGeometry, index) => {
              return (
                <primitive
                  key={index}
                  object={buildingGeometry}
                  onClick={() => setSelectedBuilding(index)}
                />
              );
            })}
          <CameraControls />
        </Canvas>

        <Sidenav
          selectedBuilding={selectedBuilding}
          buildingData={buildingData}
          handleChange={handleChange}
        />
      </div>
    </>
  );
}
