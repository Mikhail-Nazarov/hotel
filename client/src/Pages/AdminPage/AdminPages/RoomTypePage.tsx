import { ChangeEvent, FC, useEffect, useState } from "react";
import AdminTable from "../../../components/modules/AdminTable/AdminTable";
import Button from "../../../components/UI/Button";
import { IRoomType } from "../../../interfaces/interfaces";
import { getRoomsTypes } from "../../homePage/HomeApi";
import { setRoomsTypes } from "../AdminApi";

const RoomTypePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([]);
  const [current, setCurrent] = useState<number>(-1);

  const init = async () => {
    const data = await getRoomsTypes();
    setRoomTypes(data);
    setIsLoading(true);
  };
  useEffect(() => {
    if (!isLoading) init();
  }, []);

  const onChange = (e: any) => {
    const roomTypesClone = [...roomTypes];
    const item = roomTypesClone[Number(e.target.id)];
    (item as any)[e.target.name] = e.target.value;
    setRoomTypes(roomTypesClone);
  };

  const addRow = (e) => {
    const roomTypesClone = [...roomTypes];
    roomTypesClone.push({ id: 0, name: "", description: "" });
    setRoomTypes(roomTypesClone);
  };
  const delRow = (e) => {
    const roomTypesClone = [...roomTypes];
    roomTypesClone.splice(current, 1);
    setRoomTypes(roomTypesClone);
  };

  if (isLoading)
    return (
      <div>
        <AdminTable addRow={addRow} data={roomTypes} setData={setRoomTypes} />
        <Button
          onClick={async (e) => {
            await setRoomsTypes(roomTypes);
            init();
          }}
        >
          Сохранить
        </Button>
        <Button
          onClick={(e) => {
            init();
          }}
        >
          Отмена
        </Button>
      </div>
    );
};
export default RoomTypePage;
