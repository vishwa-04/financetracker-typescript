import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Transaction } from "./transactiontable";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { RootState } from "../Redux/store";


const ShowTable = () => {
  const transaction_redux = useSelector(
    (state: RootState) => state.transaction
  );

  const cookie = new Cookies();

  //   const [data, setData] = useState(transaction_redux);
  const [groupData, setGroupData] = useState([]);
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
  }, [getData]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement> | string) {
    let storeResult: any = {};
    let array = [...getData];
    setIsGrouped(true);
    if (typeof e !== "string") {
      if (e.target) {
        let Groupvalue = e.target.value;
        setGroupValue(Groupvalue);
        if (Groupvalue !== "") {
          array.forEach((item:any) => {
            let result = item[Groupvalue];
            storeResult[result] = storeResult[result] ?? [];
            storeResult[result].push(item);
          });
          setGroupData(storeResult);
        } else {
          setIsGrouped(false);
          setGroupData([]);
        }
      }
    } else {
      if (e) {
        array.forEach((item:any) => {
          let result = item[e];
          storeResult[result] = storeResult[result] ?? [];
          storeResult[result].push(item);
        });
        setGroupData(storeResult);
      } else {
        setIsGrouped(false);
        setGroupData([]);
      }
    }
  }
  function handleLogout() {
    cookie.remove("mycookie");
    navigate("/login");
  }

  return (
    <>
      <div>
        <input type="button" onClick={handleLogout} value="Logout" />
      </div>

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

            {groupData.length !== 0 &&
              Object.keys(groupData).map(
                (data:any) =>
                  data !== "undefined" && (
                    <>
                      <h2>{data}</h2>

                      <>
                        <Transaction
                          getData={groupData[data]}
                          
                        ></Transaction>
                      </>
                    </>
                  )
              )}
          </>
        ) : (
          <span>No data found</span>
        )}
      </>

      <Link to={"create"} className="btn btn-secondary">
        Create Transaction
      </Link>
    </>
  );
};
export default ShowTable;
