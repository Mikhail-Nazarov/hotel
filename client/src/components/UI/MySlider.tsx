import { ChangeEvent, FC } from "react";
import { Slider, Box, Typography } from "@mui/material";

type sliderProps = {
  label?: string;
  width?: string;
  value: any;
  valuesRange?: number[];
  onChange: (e: ChangeEvent) => void;
};

const MySlider: FC<sliderProps> = ({
  label,
  width,
  value,
  onChange,
  valuesRange,
}) => {
  const marks = [
    {
      value: valuesRange ? valuesRange[0] : 0,
      label: valuesRange ? valuesRange[0] : 0,
    },
    {
      value: valuesRange ? valuesRange[1] : 10000,
      label: valuesRange ? valuesRange[1] : 10000,
    },
  ];

  return (
    <Box>
      <Typography id="input-slider" color="common.black">
        {label}
      </Typography>
      <Slider
        min={valuesRange ? valuesRange[0] : 0}
        max={valuesRange ? valuesRange[1] : 10000}
        getAriaLabel={() => label}
        value={value}
        marks={marks}
        onChange={onChange}
        valueLabelDisplay="auto"
        aria-label="Temperature"
      />
    </Box>
  );
};

export default MySlider;
