import React from "react";
import FishLayer from "./FishLayer";
import BubbleLayer from "./BubbleLayer";
import LightRays from "./LightRays";
import PlanktonLayer from "./PlanktonLayer";
import CurrentLayer from "./CurrentLayer";
import CoralLayer from "./CoralLayer";
import SeaweedLayer from "./SeaweedLayer";
import RippleLayer from "./RippleLayer";

import "./ocean.css";


export default function OceanBackground() {

  return (

    <div
      className="ocean-background"
      aria-hidden="true"
    >
      <div className="ocean-overlay"/>

      <CurrentLayer />

      <LightRays />

      <PlanktonLayer count={60} />

      <BubbleLayer count={40} />

      <FishLayer
        fish={22}
        turtles={3}
        rays={4}
        sharks={2}
        jellyfish={8}
      />

      <CoralLayer />

      <SeaweedLayer />

      {/* <RippleLayer /> */}

    </div>

  );

}