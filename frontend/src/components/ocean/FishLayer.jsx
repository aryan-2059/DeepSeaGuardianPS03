import React, { useMemo } from "react";


/*
========================================================
  SVG CREATURES
========================================================
*/

function Fish({ flip }) {
  return (
    <svg
      width="46"
      height="24"
      viewBox="0 0 46 24"
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >
      <path
        d="M2 12c6-9 22-9 30-2 4-3.5 8-3.5 12-2-2 2-2 6 0 8-4 1.5-8 1.5-12-2-8 7-24 7-30-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <circle
        cx="10"
        cy="11"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}


function Jellyfish() {
  return (
    <svg
      width="32"
      height="45"
      viewBox="0 0 32 45"
      fill="none"
    >
      <path
        d="M4 16c0-8 6-13 12-13s12 5 12 13c0 4-3 6-12 6S4 20 4 16z"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      {[7, 12, 17, 22, 27].map((x, i) => (
        <path
          key={x}
          d={`M${x} 22c1 6-2 7 0 12s-2 7 0 11`}
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.7 - i * 0.1}
        />
      ))}
    </svg>
  );
}


function Turtle({ flip }) {
  return (
    <svg
      width="60"
      height="35"
      viewBox="0 0 60 35"
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >

      <ellipse
        cx="28"
        cy="18"
        rx="15"
        ry="10"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="47"
        cy="18"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="
        M14 15L6 10
        M14 21L6 26
        M40 15L48 10
        M40 21L48 26
        "
        stroke="currentColor"
        strokeWidth="1.4"
      />

    </svg>
  );
}


function Ray({ flip }) {
  return (
    <svg
      width="70"
      height="35"
      viewBox="0 0 70 35"
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >

      <path
        d="
        M5 18
        C20 5 50 5 65 18
        C50 31 20 31 5 18Z
        "
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M60 18L68 30"
        stroke="currentColor"
        strokeWidth="1.3"
      />

    </svg>
  );
}


function Shark({ flip }) {
  return (
    <svg
      width="90"
      height="40"
      viewBox="0 0 90 40"
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >

      <path
        d="
        M5 22
        C25 5 60 8 75 18
        L88 10
        L83 22
        L88 32
        L75 25
        C55 38 20 38 5 22Z
        "
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M48 12L55 3"
        stroke="currentColor"
        strokeWidth="1.2"
      />

    </svg>
  );
}



/*
========================================================
  CREATURE GENERATION
========================================================
*/


const CREATURE_TYPES = [
  {
    name: "fish",
    Component: Fish,
    count: 22,
  },

  {
    name: "jelly",
    Component: Jellyfish,
    count: 8,
  },

  {
    name: "turtle",
    Component: Turtle,
    count: 3,
  },

  {
    name: "ray",
    Component: Ray,
    count: 4,
  },

  {
    name: "shark",
    Component: Shark,
    count: 2,
  },
];



function generateCreatures() {

  let output = [];


  CREATURE_TYPES.forEach(type => {

    for(let i=0;i<type.count;i++){

      output.push({

        id:
          `${type.name}-${i}`,

        Component:
          type.Component,


        top:
          `${Math.random()*90}%`,


        size:
          0.4 + Math.random()*1.4,


        duration:
          14 + Math.random()*22,


        delay:
          -(Math.random()*35),


        opacity:
        0.04 + Math.random()*0.10,


        blur:
          Math.random()>0.75
          ?
          1.5
          :
          0,


        flip:
          Math.random()>0.5,


        direction:
          Math.random()>0.5
          ?
          "right"
          :
          "left"

      });

    }

  });


  return output;

}



/*
========================================================
  COMPONENT
========================================================
*/


export default function FishLayer(){

  const creatures = useMemo(
    ()=>generateCreatures(),
    []
  );


  return (

    <div className="fish-layer">

      {
        creatures.map((c)=>(

          <div
            key={c.id}
            className="fish-track"
            style={{
              top:c.top,
              opacity:c.opacity,
              filter:`blur(${c.blur}px)`
            }}
          >

            <div

              className={
                c.direction==="right"
                ?
                "swim-right"
                :
                "swim-left"
              }


              style={{
                animationDuration:
                  `${c.duration}s`,

                animationDelay:
                  `${c.delay}s`
              }}

            >

              <div
                style={{
                  transform:
                    `scale(${c.size})`
                }}
              >

                <c.Component
                  flip={c.flip}
                />

              </div>


            </div>


          </div>

        ))
      }


    </div>

  );
}