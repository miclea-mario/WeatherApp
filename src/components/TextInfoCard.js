import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSpring, animated } from "react-spring";

export default function TextInfoCard({
  Icon,
  category,
  value,
  unit,
  subtitle,
  bottomText,
}) {
  const springProps = useSpring({
    num: parseFloat(value) || 0, // Ensure value is a number or default to 0
    from: { num: 0 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <Card className="border border-white/20 bg-[#48319d]/20 text-white overflow-hidden shadow-inner grow basis-0 backdrop-contrast-10 aspect-square">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-semibold flex items-center gap-1 text-white/75">
          <Icon /> {category}
        </p>
      </CardHeader>
      <CardBody className="pt-2 justify-between">
        <div>
          <p className="text-2xl font-semibold leading-none flex">
            <animated.p>
              {springProps.num.to((animatedValue) => animatedValue.toFixed(1))}
            </animated.p>
            <span>{unit}</span>
          </p>
          <p className="font-semibold leading-none">{subtitle}</p>
        </div>
        <p className="font-light text-xs leading-tight">{bottomText}</p>
      </CardBody>
    </Card>
  );
}
