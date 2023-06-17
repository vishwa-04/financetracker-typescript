import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Transaction } from "./transactiontable";
import { useAppSelector } from "../Redux/hooks";
import { Cookies } from "react-cookie";
import { RootState } from "../Redux/store";
import { formValue } from "../models/interface";

const ShowTable = () => {
  const transaction_redux = useAppSelector(
    (state: RootState) => state.transaction
  );

  const cookie = new Cookies();

  //   const [data, setData] = useState(transaction_redux);
  const [groupData, setGroupData] = useState<{ [key: string]: formValue[] }>(
    {}
  );
  const [getData, setgetData] = useState(transaction_redux);
  const navigate = useNavigate();

  useEffect(() => {
    setgetData(transaction_redux);
  }, [transaction_redux]);

  const [groupValue, setGroupValue] = useState("");
  const [isGrouped, setIsGrouped] = useState(false);

  useEffect(() => {
    if (isGrouped === true) {
      handleChange(groupValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement> | string) {
    let storeResult: { [key: string]: formValue[] } = {};
    let array = [...getData];
    setIsGrouped(true);
    if (typeof e !== "string") {
      if (e.target) {
        let Groupvalue = e.target.value;
        setGroupValue(Groupvalue);
        if (Groupvalue !== "") {
          array.forEach((item) => {
            let result = item[Groupvalue];
            storeResult[result] = storeResult[result] ?? [];
            storeResult[result].push(item);
          });
          setGroupData(storeResult);
        } else {
          setIsGrouped(false);
          setGroupData({});
        }
      }
    } else {
      if (e) {
        array.forEach((item) => {
          let result = item[e];
          storeResult[result] = storeResult[result] ?? [];
          storeResult[result].push(item);
        });
        setGroupData(storeResult);
      } else {
        setIsGrouped(false);
        setGroupData({});
      }
    }
  }
  function handleLogout() {
    cookie.remove("mycookie");
    navigate("/login");
  }

  return (
    <>
      <>
        {getData ? (
          <>
            <tr>
              <td>
                <label>Transaction Type</label>
              </td>
              <td>
                <select
                  id="transactionType"
                  name="transType"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="groupby">--Group By--</option>
                  <option value="none">None</option>
                  <option value="month">Month Year</option>
                  <option value="transType">Transaction Type</option>
                  <option value="frmAcc">From Account</option>
                  <option value="toAcc">To Account</option>
                </select>
              </td>

              {/* eslint-disable-next-line */}
            </tr>
            <Transaction getData={getData}></Transaction>

            {Object.keys(groupData).map(
              (data) =>
                data !== "undefined" && (
                  <>
                    <h2>{data}</h2>

                    <>
                      <Transaction getData={groupData[data]}></Transaction>
                    </>
                  </>
                )
            )}
          </>
        ) : (
          <span>No data found</span>
        )}
      </>

      <Link to={"create"} className="btn btn-secondary ">
        Create Transaction
      </Link>
      <div>
        <input
          type="button"
          className="btn btn-primary mt-2"
          onClick={handleLogout}
          value="Logout"
        />
      </div>
    </>
  );
};
export default ShowTable;
