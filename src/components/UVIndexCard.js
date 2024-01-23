import React from "react";
import { Card, CardBody, CardHeader, Slider } from "@nextui-org/react";
import { SunIcon } from "./Icons";
import { useSpring, animated } from "react-spring";

export default function UVIndexCard({ indexLevel }) {
  function getIndexDescription(index) {
    if (index <= 2) return "Low";
    else if (index <= 5) return "Moderate";
    else if (index <= 7) return "High";
    else return "Very High";
  }

  const springProps = useSpring({
    num: parseInt(indexLevel) || 0, 
    from: { num: 0 },
    config: { tension: 120, friction: 14 },
  });


  return (
    <Card className="border border-white/20 bg-[#48319d]/20 text-white overflow-hidden shadow-inner grow basis-0 backdrop-contrast-10 aspect-square">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-semibold flex items-center gap-1 text-white/75">
          <SunIcon /> UV Index
        </p>
      </CardHeader>
      <CardBody className="pt-2 justify-between">
        <div>
          <animated.p className='text-2xl font-semibold leading-none'>
              {springProps.num.to((indexLevel) => parseInt(indexLevel))}
            </animated.p>
          <p className="font-semibold leading-none">
            {getIndexDescription(indexLevel)}
          </p>
        </div>
        <Slider
          size="sm"
          maxValue={10}
          minValue={0}
          value={indexLevel}
          disableThumbScale={true}
          classNames={{
            base: "mt-4",
            track: "bg-gradient-to-r from-blue-500 to-indigo-400 to-red-500",
            filler: "hidden",
            thumb: "cursor-default data-[dragging=true]:cursor-default",
          }}
        />
      </CardBody>
    </Card>
  );
}
