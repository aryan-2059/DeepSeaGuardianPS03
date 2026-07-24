import React from "react";


const CURRENT_STREAMS = [
  {
    top: "18%",
    height: "140px",
    duration: "38s",
    delay: "-10s",
    rotate: "-8deg",
    opacity: 0.12,
  },

  {
    top: "42%",
    height: "180px",
    duration: "55s",
    delay: "-25s",
    rotate: "6deg",
    opacity: 0.09,
  },

  {
    top: "65%",
    height: "120px",
    duration: "45s",
    delay: "-18s",
    rotate: "-4deg",
    opacity: 0.1,
  },

];


export default function CurrentLayer() {


  return (

    <div
      className="current-layer"
      aria-hidden="true"
    >

      {
        CURRENT_STREAMS.map((stream,index)=>(

          <div

            key={index}

            className="ocean-current"

            style={{

              top:
                stream.top,


              height:
                stream.height,


              opacity:
                stream.opacity,


              transform:
                `rotate(${stream.rotate})`,


              animationDuration:
                stream.duration,


              animationDelay:
                stream.delay,

            }}

          />

        ))
      }

    </div>

  );

}