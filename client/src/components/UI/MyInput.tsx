import { ChangeEvent, FC, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Input,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  FilledInput,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Slider,
  Checkbox,
  FormLabel,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./UI.scss";
import { isValid } from "../../interfaces/interfaces";

type inputProps = {
  type: string;
  label?: string;
  width?: string;
  value: any;
  onChange: (e: ChangeEvent) => void;
  isValid?: isValid;
  isDarkTheme?: boolean;
  minValue?: number;
  maxValue?: number;
};

const slotProps = {
  textField: { variant: "outlined", fullWidth: true },
};

const MyInput: FC<inputProps> = ({
  type,
  label,
  width,
  value,
  onChange,
  children,
  isValid,
  isDarkTheme = false,
  minValue,
  maxValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
    },
  });

  const getInputElement = () => {
    switch (type) {
      case "select":
        return (
          <FormControl style={{ width: "100%" }}>
            <InputLabel>{label}</InputLabel>
            <Select
              onChange={onChange}
              label={label}
              value={value}
              defaultValue={children[0].value}
              slotProps={slotProps}
            >
              {children.map(
                (item: { key: string; value: string; text: string }) => {
                  return (
                    <MenuItem key={item.key} value={item.value}>
                      {item.text}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        );
      case "password":
        return (
          <TextField
            id="password"
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            helperText={isValid?.isValid ? "" : isValid?.errorMessage}
            error={isValid && !isValid?.isValid}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      // case "email":
      //   return (
      //     <TextField
      //       label={label}
      //       value={value}
      //       helperText={isValid?.isValid ? "" : isValid?.errorMessage}
      //       error={!isValid?.isValid}
      //       onChange={(e) => {
      //         onChange(e);
      //       }}
      //       fullWidth
      //     />
      //   );

      case "checkboxGroup":
        return (
          <FormControl style={{ width: "100%" }}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {children.map(
                (item: { key: string; value: string; text: string }) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox name="gilad" />}
                      label={item.text}
                    />
                  );
                }
              )}
            </FormGroup>
          </FormControl>
        );

      case "number":
        return (
          <TextField
            number
            InputProps={{ inputProps: { min: minValue, max: maxValue } }}
            value={value}
            helperText={isValid?.isValid ? "" : isValid?.errorMessage}
            error={isValid && !isValid?.isValid}
            label={label}
            type={type}
            onChange={onChange}
            fullWidth
          />
        );
      default:
        return (
          <TextField
            value={value}
            helperText={isValid?.isValid ? "" : isValid?.errorMessage}
            error={isValid && !isValid?.isValid}
            label={label}
            type={type}
            onChange={onChange}
            fullWidth
          />
        );
    }
  };

  return (
    <Box
      sx={{
        mb: "15px",
        width: width,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {getInputElement()}
      </ThemeProvider>
    </Box>
  );
};

export default MyInput;
