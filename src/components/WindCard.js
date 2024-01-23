import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { WindIcon, CompassIcon, CompassArrowIcon } from "./Icons";
import { useSpring, animated } from "react-spring";

const WindCard = ({ windSpeed, windDirection }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setRotation(360 - windDirection);
  }, [windDirection]);

  const springProps = useSpring({
    num: parseFloat(windSpeed) || 0,
    from: { num: 0 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <Card className="border border-white/20 bg-[#48319d]/20 text-white overflow-hidden shadow-inner grow basis-0 backdrop-contrast-10 aspect-square">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-semibold flex items-center gap-1 text-white/75">
          <WindIcon /> Wind
        </p>
      </CardHeader>
      <CardBody className="pt-2 justify-between">
        <div className="relative flex items-center justify-center overflow-hidden">
          <CompassArrowIcon
            className={`absolute w-[80%] rotate-animation`}
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <div className="absolute backdrop-blur-xl rounded-full p-3">
            <animated.p className="text-2xl font-semibold leading-none">
              {springProps.num.to((val) => val.toFixed(1))}
            </animated.p>
            <p className="font-normal text-sm leading-none">km/h</p>
          </div>
          <CompassIcon className="h-full object-contain w-fit" />
        </div>
      </CardBody>
    </Card>
  );
};

export default WindCard;
