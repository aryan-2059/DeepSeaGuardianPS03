import React, { useMemo } from "react";


function createBubbles(count) {

  return Array.from({ length: count }, (_, i) => ({

    id: i,

    left: `${Math.random() * 100}%`,

    size:
      3 + Math.random() * 18,

    duration:
      8 + Math.random() * 18,

    delay:
      -(Math.random() * 20),

    opacity:
      0.15 + Math.random() * 0.5,

    drift:
      -30 + Math.random() * 60,

    wobble:
      1 + Math.random() * 3,

  }));

}



export default function BubbleLayer({
  count = 120
}) {


  const bubbles = useMemo(
    () => createBubbles(count),
    [count]
  );


  return (

    <div
      className="bubble-layer"
      aria-hidden="true"
    >

      {
        bubbles.map((bubble)=>(

          <span

            key={bubble.id}

            className="bubble"

            style={{

              left:
                bubble.left,


              width:
                `${bubble.size}px`,


              height:
                `${bubble.size}px`,


              opacity:
                bubble.opacity,


              animationDuration:
                `${bubble.duration}s`,


              animationDelay:
                `${bubble.delay}s`,


              "--drift":
                `${bubble.drift}px`,


              "--wobble":
                `${bubble.wobble}s`

            }}

          />

        ))

      }

    </div>

  );
}