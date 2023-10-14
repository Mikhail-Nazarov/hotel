import { FC, useState } from "react";
import Button from "../../UI/Button";
import "./AdminTable.scss";

type tableProps = {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any>>;
  addRow: (e: any) => void;
};

const AdminTable: FC<tableProps> = ({ data, setData, addRow }) => {
  const [current, setCurrent] = useState<number>(-1);

  const onChange = (e: any) => {
    const dataClone = [...data];
    const item = dataClone[Number(e.target.id)];
    (item as any)[e.target.name] = e.target.value;
    setData(dataClone);
  };

  const delRow = (e) => {
    const dataClone = [...data];
    dataClone.splice(current, 1);
    setData(dataClone);
  };

  return (
    <>
      {data[0] && (
        <div>
          <div
            className="admin-table"
            style={{
              gridTemplateColumns: `repeat(${
                Object.keys(data[0]).length
              }, minMax(0,auto))`,
            }}
          >
            {Object.keys(data[0]).map((key) => {
              return <th>{key}</th>;
            })}

            {data.map((item, index) => {
              return (
                <>
                  {Object.keys(item).map((key) => {
                    if (!item[key]) item[key] = "";

                    console.log(item);
                    switch (typeof item[key]) {
                      default:
                        return (
                          <input
                            readOnly={key === "id"}
                            className={index === current ? "current-row" : ""}
                            id={index.toString()}
                            name={key}
                            value={item[key]}
                            onChange={onChange}
                            onFocus={(e) => setCurrent(Number(e.target.id))}
                          />
                        );
                      case "number":
                        return (
                          <input
                            type="number"
                            readOnly={key === "id"}
                            className={index === current ? "current-row" : ""}
                            id={index.toString()}
                            name={key}
                            value={item[key]}
                            onChange={onChange}
                            onFocus={(e) => setCurrent(Number(e.target.id))}
                          />
                        );
                    }
                  })}
                </>
              );
            })}
          </div>
        </div>
      )}
      <div className="rows-count-control">
        <Button onClick={addRow}>+</Button>
        <Button onClick={delRow}>-</Button>
      </div>
    </>
  );
};
export default AdminTable;
