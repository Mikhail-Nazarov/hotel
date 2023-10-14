import { FC } from "react";
import "dayjs/locale/ru";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ruRU } from "@mui/x-date-pickers/locales";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./UI.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MyDatePicker: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div className="date-picker">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ru"
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <DatePicker value={dayjs(new Date().toString())} />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
};

export default MyDatePicker;
