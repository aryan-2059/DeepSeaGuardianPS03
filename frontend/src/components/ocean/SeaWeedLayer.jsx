import React from "react";


function Seaweed({
  left,
  height,
  width,
  delay,
  duration,
  opacity
}) {

  return (

    <div

      className="seaweed"

      style={{

        left,

        height,

        width,

        opacity,

        animationDelay:
          delay,

        animationDuration:
          duration

      }}

    >

      <span />

      <span />

      <span />

    </div>

  );

}



const SEAWEEDS = [

  {
    left:"4%",
    height:"180px",
    width:"18px",
    delay:"-2s",
    duration:"7s",
    opacity:0.35
  },

  {
    left:"12%",
    height:"240px",
    width:"22px",
    delay:"-5s",
    duration:"9s",
    opacity:0.28
  },

  {
    left:"25%",
    height:"140px",
    width:"14px",
    delay:"-7s",
    duration:"6s",
    opacity:0.32
  },

  {
    left:"68%",
    height:"220px",
    width:"20px",
    delay:"-3s",
    duration:"8s",
    opacity:0.3
  },

  {
    left:"78%",
    height:"170px",
    width:"16px",
    delay:"-6s",
    duration:"7s",
    opacity:0.25
  },

  {
    left:"92%",
    height:"260px",
    width:"24px",
    delay:"-1s",
    duration:"10s",
    opacity:0.35
  }

];



export default function SeaweedLayer(){

  return (

    <div

      className="seaweed-layer"

      aria-hidden="true"

    >

      {
        SEAWEEDS.map((plant,index)=>(

          <Seaweed

            key={index}

            {...plant}

          />

        ))
      }

    </div>

  );

}