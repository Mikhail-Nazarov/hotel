import { FC, forwardRef, useState } from "react";
import ru from "date-fns/locale/ru";
import dayjs, { Dayjs } from "dayjs";
import "./UI.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

type modalProps = {
  dates: (Date | null)[];
  setDates: (dates: (Date | null)[]) => void;
  busyDates: Date[][];
  isValid: boolean;
  setIsValid: (value: boolean) => void;
};

const MyDateRangePicker: FC<modalProps> = ({
  dates,
  setDates,
  busyDates,
  isValid,
  setIsValid,
}) => {
  const [highlightDates, setHighlightDates] = useState<any[]>([]);

  registerLocale("ru", ru);
  const onChange = (dates) => {
    const [start, end] = dates;
    let check = true;
    setDates([start, end]);
    const hDays = [];
    for (const busyDate of busyDates) {
      let loop = new Date(busyDate[0]);
      while (loop <= busyDate[1]) {
        if (loop >= start && loop <= end) {
          hDays.push(new Date(loop));
          check = false;
          setIsValid(false);
        }
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }
    }
    if (check) {
      setIsValid(true);
    }
    setHighlightDates(hDays);
    console.log("hDays", hDays);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className={isValid || !value ? "primary-button" : "primary-button error"}
      onClick={onClick}
      ref={ref}
    >
      {value
        ? isValid
          ? value
          : "Даты заняты"
        : "Выберите даты бронирования..."}
    </button>
  ));

  return (
    <DatePicker
      shouldCloseOnSelect={false}
      onChange={onChange}
      startDate={dates[0]}
      endDate={dates[1]}
      selectsRange
      minDate={new Date()}
      highlightDates={highlightDates}
      dateFormat="dd.MM.yyyy"
      locale="ru"
      placeholderText="Выберите даты бронирования..."
      customInput={<ExampleCustomInput />}
      excludeDateIntervals={busyDates.map((date) => {
        return { start: date[0], end: date[1] };
      })}
    />
  );
};

export default MyDateRangePicker;
