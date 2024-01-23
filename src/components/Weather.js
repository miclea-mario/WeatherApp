import React, { useState } from "react";
import { Input, Card, CardBody, Button, Divider } from "@nextui-org/react";
import UVIndexCard from "./UVIndexCard";
import TextInfoCard from "./TextInfoCard";
import WindCard from "./WindCard";
import {
  HumidityIcon,
  TemperatureIcon,
  DropletIcon,
  MoonIcon,
  SunIcon,
  NightCloudyIcon,
  SunCloudyIcon,
  CloudyIcon,
  WindIcon,
  FogIcon,
  SnowIcon,
  RainIcon,
  LocationIcon,
  SearchIcon,
} from "./Icons";

export default function Weather(props) {
  const [inputValue, setInputValue] = useState(props.searchValue);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getConditionIcon = (condition, size = "6xl") => {
    const baseClassName = `text-${size} text-slate-700`;

    const conditionIcons = {
      snow: <SnowIcon className={baseClassName} />,
      fog: <FogIcon className={baseClassName} />,
      wind: <WindIcon className={baseClassName} />,
      cloudy: <CloudyIcon className={baseClassName} />,
      rain: <RainIcon className={baseClassName} />,
      "partly-cloudy-day": <SunCloudyIcon className={baseClassName} />,
      "partly-cloudy-night": <NightCloudyIcon className={baseClassName} />,
      "clear-day": <SunIcon className={`text-${size} text-orange-400`} />,
      "clear-night": <MoonIcon className={baseClassName} />,
    };

    return conditionIcons[condition] || null;
  };

  const toFahrenheit = (temperature) => {
    if (props.unit === "°F") return (temperature * 1.8 + 32).toFixed(1);
    return temperature;
  };

  const dayCards = props.weatherData.days
    .filter((day, idx) => idx < 7)
    .map((day) => {
      let date = new Date(day.datetime);
      return (
        <Card className="border border-white/20 bg-[#48319d]/20 text-white overflow-hidden shadow-inner grow basis-0 backdrop-contrast-10">
          <CardBody className="flex items-center gap-1">
            <p>{weekDays[date.getDay()]}</p>
            {getConditionIcon(day.icon, "2xl")}
            <p>{toFahrenheit(day.temp)}</p>
          </CardBody>
        </Card>
      );
    });

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-[1200px] min-w-[900px]"
      shadow="lg"
    >
      <CardBody className="p-0">
        <div className="flex items-center">
          <div className="grid gap-2 bg-white/25 p-4 w-3/12">
            <div className="flex items-center gap-4">
              <Input
                label="Search"
                isClearable
                radius="lg"
                value={inputValue}
                onClear={() => setInputValue("")}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-slate-700/50",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-md",
                    "bg-default-200/10",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "group-data-[focused=true]:bg-default-200/50",
                    "!cursor-text",
                  ],
                }}
                placeholder="Type to search..."
                startContent={
                  <LocationIcon className="text-slate-700/50 mb-0.5 text-slate-700 pointer-events-none flex-shrink-0" />
                }
              />
              <Button
                isIconOnly
                color="primary"
                onPress={() => {
                  props.onSearchChange(inputValue);
                }}
              >
                <SearchIcon />
              </Button>
            </div>

            <h1 className="text-lg">
              {props.weatherData.resolvedAddress || "Getting location..."}
            </h1>
            {getConditionIcon(props.weatherData.currentConditions.icon)}
            <h2 className="text-6xl font-thin">
              {toFahrenheit(props.weatherData.currentConditions.temp)}
              <span className="text-xl align-super">{props.unit}</span>
            </h2>
            <p>{props.weatherData.currentConditions.conditions}</p>
            <Divider className="my-4" />
            <p>{props.date}</p>
          </div>
          <div className="w-9/12 p-4 flex flex-col gap-4">
            <div>
              <Button isIconOnly onPress={() => props.onUnitChange()}>
                {props.unit}
              </Button>
            </div>
            <div className="flex gap-4 flex-wrap justify-between">
              {dayCards}
            </div>
            <div className="grid grid-cols-5 gap-4">
              <UVIndexCard
                indexLevel={props.weatherData.currentConditions.uvindex}
              />
              <TextInfoCard
                Icon={DropletIcon}
                category="Rainfall"
                value={
                  props.weatherData.currentConditions.precip
                    ? `${props.weatherData.currentConditions.precip.toFixed(1)}`
                    : `0`
                }
                unit=" mm"
                subtitle="in last hour"
                bottomText={`${props.weatherData.days[1].precip} mm expected in next 24h.`}
              />
              <TextInfoCard
                Icon={TemperatureIcon}
                category="Feels Like"
                value={`${toFahrenheit(
                  props.weatherData.currentConditions.feelslike
                )}`}
                unit={`${props.unit}`}
                bottomText={props.weatherData.description}
              />
              <TextInfoCard
                Icon={HumidityIcon}
                category="Humidity"
                value={`${props.weatherData.currentConditions.humidity}`}
                unit="%"
                bottomText={`The dew point is ${props.weatherData.currentConditions.dew} right now.`}
              />
              <WindCard
                windSpeed={props.weatherData.currentConditions.windspeed}
                windDirection={props.weatherData.currentConditions.winddir}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
