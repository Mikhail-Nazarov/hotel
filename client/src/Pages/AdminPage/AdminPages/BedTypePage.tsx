import { ChangeEvent, FC, useEffect, useState } from "react";
import AdminTable from "../../../components/modules/AdminTable/AdminTable";
import Button from "../../../components/UI/Button";
import { IBedType } from "../../../interfaces/interfaces";
import { getRoomsTypes } from "../../homePage/HomeApi";
import { getBedsTypes, saveBedsTypes, setRoomsTypes } from "../AdminApi";

const BedTypePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bedTypes, setbedTypes] = useState<IBedType[]>([]);
  const [current, setCurrent] = useState<number>(-1);

  const init = async () => {
    const data = await getBedsTypes();
    setbedTypes(data);
    console.log("getBedsTypes", data);
    setIsLoading(true);
  };
  useEffect(() => {
    if (!isLoading) init();
  }, []);

  const onChange = (e: any) => {
    const bedTypesClone = [...bedTypes];
    const item = bedTypesClone[Number(e.target.id)];
    (item as any)[e.target.name] = e.target.value;
    setbedTypes(bedTypesClone);
  };

  const addRow = (e) => {
    const bedTypesClone = [...bedTypes];
    bedTypesClone.push({ id: 0, size: 0 });
    setbedTypes(bedTypesClone);
  };
  const delRow = (e) => {
    const bedTypesClone = [...bedTypes];
    bedTypesClone.splice(current, 1);
    setbedTypes(bedTypesClone);
  };

  if (isLoading && bedTypes.length)
    return (
      <div>
        <AdminTable addRow={addRow} data={bedTypes} setData={setbedTypes} />
        <Button
          onClick={async (e) => {
            await saveBedsTypes(bedTypes);
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
export default BedTypePage;
