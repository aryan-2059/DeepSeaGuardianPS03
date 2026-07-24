import React, { useMemo } from "react";


function generateParticles(count) {

  return Array.from({ length: count }, (_, i) => ({

    id: i,

    left:
      `${Math.random() * 100}%`,

    top:
      `${Math.random() * 100}%`,

    size:
      1 + Math.random() * 3.5,

    duration:
      15 + Math.random() * 35,

    delay:
      -(Math.random() * 40),

    opacity:
      0.08 + Math.random() * 0.25,

    drift:
      -40 + Math.random() * 80,

    glow:
      Math.random() > 0.75,

  }));

}



export default function PlanktonLayer({
  count = 250
}) {


  const particles = useMemo(
    () => generateParticles(count),
    [count]
  );


  return (

    <div
      className="plankton-layer"
      aria-hidden="true"
    >

      {
        particles.map((particle)=>(

          <span

            key={particle.id}

            className={
              particle.glow
              ?
              "plankton plankton-glow"
              :
              "plankton"
            }

            style={{

              left:
                particle.left,


              top:
                particle.top,


              width:
                `${particle.size}px`,


              height:
                `${particle.size}px`,


              opacity:
                particle.opacity,


              animationDuration:
                `${particle.duration}s`,


              animationDelay:
                `${particle.delay}s`,


              "--drift":
                `${particle.drift}px`

            }}

          />

        ))
      }


    </div>

  );

}