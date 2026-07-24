import React from "react";


const RAYS = [
  {
    left: "5%",
    width: "120px",
    rotate: "-18deg",
    duration: "18s",
    delay: "-4s",
    opacity: 0.12,
  },

  {
    left: "22%",
    width: "180px",
    rotate: "-12deg",
    duration: "26s",
    delay: "-10s",
    opacity: 0.09,
  },

  {
    left: "42%",
    width: "140px",
    rotate: "8deg",
    duration: "22s",
    delay: "-7s",
    opacity: 0.14,
  },

  {
    left: "65%",
    width: "200px",
    rotate: "15deg",
    duration: "30s",
    delay: "-15s",
    opacity: 0.1,
  },

  {
    left: "82%",
    width: "110px",
    rotate: "20deg",
    duration: "20s",
    delay: "-3s",
    opacity: 0.13,
  },
];


export default function LightRays() {

  return (

    <div
      className="light-ray-layer"
      aria-hidden="true"
    >

      {
        RAYS.map((ray, index)=>(

          <div

            key={index}

            className="light-ray"

            style={{

              left:
                ray.left,

              width:
                ray.width,

              opacity:
                ray.opacity,

              transform:
                `rotate(${ray.rotate})`,

              animationDuration:
                ray.duration,

              animationDelay:
                ray.delay,

            }}

          />

        ))
      }


    </div>

  );

}