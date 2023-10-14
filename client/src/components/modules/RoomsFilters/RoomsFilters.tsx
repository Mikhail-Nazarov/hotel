import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { footerData, sortingVariants } from "../../../data";
import { IRoom, IRoomType } from "../../../interfaces/interfaces";
import {
  getRooms,
  getRoomsWithFilters,
} from "../../../Pages/AdminPage/AdminApi";
import { getRoomsTypes } from "../../../Pages/homePage/HomeApi";
import Button from "../../UI/Button";
import MyInput from "../../UI/MyInput";
import "./RoomsFilters.scss";
import { getMaxPrice } from "../../../Pages/RoomsPage/RoomsApi";
import MySlider from "../../UI/MySlider";

type filtersProps = {
  rooms: IRoom[];
};

export interface IRoomsFilters {
  sortBy?: string | undefined;
  price?: [number | undefined | null] | undefined;
  type?: [number] | undefined;
}

const RoomsFilters: FC = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();
  const setPrice = async () => {
    const priceMass = query.price?.split("-");
    const temp = priceMass
      ? [Number(priceMass[0]) || null, Number(priceMass[1]) || null]
      : [0, maxPrice];
    setPriceRange(temp);
  };
  const [sortBy, setSortBy] = useState<string>(
    query.sortBy || sortingVariants[0].key
  );
  const [priceRange, setPriceRange] = useState<(number | null)[]>([null, null]);
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const init = async () => {
    const types = await getRoomsTypes();
    const _max_Price = await getMaxPrice();
    setMaxPrice(_max_Price);
    setRoomTypes(types);
  };

  useEffect(() => {
    setPrice();
  }, [maxPrice]);

  useEffect(() => {
    init();
  }, []);

  const applyFilters = () => {
    const priceStr =
      priceRange[0] || priceRange[1]
        ? `&price=${priceRange[0]}-${priceRange[1]}`
        : "";
    navigate(`?page=0&sortBy=${sortBy}` + priceStr);
  };

  return (
    <div className="filters-wrapper">
      <MyInput
        type="select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        label={"Сортировка по..."}
      >
        {sortingVariants}
      </MyInput>
      <MySlider
        value={[priceRange[0] || 0, priceRange[1] || 10]}
        onChange={(event: Event, newValue: number | number[]) =>
          setPriceRange(newValue as number[])
        }
        label={"Цена"}
        valuesRange={[0, maxPrice]}
      >
        {sortingVariants}
      </MySlider>

      {/* <MyInput type="checkboxGroup" label="Тип номера" value={roomTypes}>
        {roomTypes.map((type) => {
          return {
            key: type.id.toString(),
            value: type.id.toString(),
            text: type.name.toString(),
          };
        })}
      </MyInput> */}
      <Button onClick={applyFilters}>Применить</Button>
    </div>
  );
};

export default RoomsFilters;
