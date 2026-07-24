import React from "react";


function Coral({
  left,
  scale,
  rotate,
  opacity
}) {

  return (

    <svg

      width="160"
      height="170"

      viewBox="0 0 160 170"

      fill="none"

      style={{

        position:"absolute",

        bottom:0,

        left,

        transform:
          `scale(${scale}) rotate(${rotate}deg)`,

        opacity

      }}

    >

      {/* main coral branches */}

      <path

        d="
        M80 170
        C75 130 85 110 70 80
        C60 55 65 30 75 5

        M80 170
        C90 135 110 120 115 90
        C120 60 105 40 110 20

        M75 95
        C45 80 30 55 35 30

        M95 120
        C125 100 140 75 135 50
        "

        stroke="currentColor"

        strokeWidth="4"

        strokeLinecap="round"

      />


      {/* coral tips */}

      <circle
        cx="75"
        cy="7"
        r="5"
        fill="currentColor"
      />

      <circle
        cx="110"
        cy="22"
        r="5"
        fill="currentColor"
      />

      <circle
        cx="35"
        cy="30"
        r="4"
        fill="currentColor"
      />

      <circle
        cx="135"
        cy="50"
        r="4"
        fill="currentColor"
      />


      {/* small branches */}

      <path

        d="
        M70 80L45 65
        M70 65L55 45
        M115 90L130 70
        M110 70L120 45
        "

        stroke="currentColor"

        strokeWidth="3"

        strokeLinecap="round"

      />

    </svg>

  );

}



const CORALS = [

  {
    left:"2%",
    scale:1.2,
    rotate:-4,
    opacity:0.35
  },

  {
    left:"18%",
    scale:0.8,
    rotate:3,
    opacity:0.25
  },

  {
    left:"72%",
    scale:1.1,
    rotate:-6,
    opacity:0.3
  },

  {
    left:"88%",
    scale:0.7,
    rotate:5,
    opacity:0.22
  }

];



export default function CoralLayer(){


  return (

    <div

      className="coral-layer"

      aria-hidden="true"

    >

      {

        CORALS.map((coral,index)=>(

          <Coral

            key={index}

            {...coral}

          />

        ))

      }


    </div>

  );

}