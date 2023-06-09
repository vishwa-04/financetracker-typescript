import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../user/css/transactiontable.css";
import { deleteTransaction } from "../Redux/Transactionduck";
// import { RootState } from "../Redux/store";
import { months } from "../defaultvalue";
import { useAppDispatch } from "../Redux/hooks";
import { formValue } from "../models/interface";

export const Transaction = (props: { getData: formValue[] }) => {
  // const transaction_redux = useAppSelector(
  //   (state: RootState) => state.transaction
  // );

  const dispatch = useAppDispatch();

  const sortOrder = useRef("");
  const [lastSortKey, setlastSortKey] = useState("");

  const [getData, setGetData] = useState(props.getData);

  useEffect(() => {
    setGetData(props.getData);
  }, [props.getData]);

  const sorter = (a: { month: string }, b: { month: string }) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
  };
  const sorterReverse = (a: { month: string }, b: { month: string }) => {
    return months.indexOf(b.month) - months.indexOf(a.month);
  };

  function requestSort(currentKey: string, type: string | undefined) {
    setCurrentPage(1);
    if (sortOrder.current === "asc" && lastSortKey === currentKey) {
      sortOrder.current = "desc";
    } else if (sortOrder.current === "desc" && lastSortKey === currentKey) {
      sortOrder.current = "";
    } else {
      sortOrder.current = "asc";
      setlastSortKey(currentKey);
    }
    sortingCondition(currentKey, type);
  }

  function sortingCondition(currentKey: string, type: undefined | string) {
    if (sortOrder.current === "asc" && type === undefined) {
      let sort = [...getData].sort((a, b) =>
        a[currentKey].localeCompare(b[currentKey])
      );
      setGetData(sort);
    } else if (sortOrder.current === "desc" && type === undefined) {
      let sort = [...getData].sort((a, b) =>
        b[currentKey].localeCompare(a[currentKey])
      );
      setGetData(sort);
    } else if (sortOrder.current === "" && type === undefined) {
      let sort = props.getData;

      setGetData(sort);
    }

    if (sortOrder.current === "asc" && type === "number") {
      let sort = [...getData].sort(function (a, b) {
        return a[currentKey] - b[currentKey];
      });
      setGetData(sort);
    } else if (sortOrder.current === "desc" && type === "number") {
      let sort = [...getData].sort(function (a, b) {
        return b[currentKey] - a[currentKey];
      });
      setGetData(sort);
    }
    if (sortOrder.current === "" && type === "number") {
      let sort = props.getData;
      setGetData(sort);
    }
    if (sortOrder.current === "asc" && type === "month") {
      let sort = [...getData].sort(sorter);
      setGetData(sort);
    } else if (sortOrder.current === "desc" && type === "month") {
      let sort = [...getData].sort(sorterReverse);
      setGetData(sort);
    } else if (sortOrder.current === "" && type === "month") {
      let sort = props.getData;
      setGetData(sort);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  let recordsPerPage = 3;
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const totalPages = Math.ceil(getData && getData.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  // const months = props.months;

  function prePage() {
    setCurrentPage(currentPage - 1);
  }

  function changeCurrentPage(id: number) {
    setCurrentPage(id);
  }

  function NextPage() {
    setCurrentPage(currentPage + 1);
  }

  function filterBySearch(e: React.ChangeEvent<HTMLInputElement>) {
    let querySearch = e.target.value;
    let filterData = [...props.getData];
    if (querySearch !== "") {
      const filterTable = filterData.filter((items) => {
        return Object.keys(items).some(
          (data) =>
            data !== "filename" &&
            data !== "id" &&
            String(items[data])
              .toLowerCase()
              .includes(querySearch.trim().toLowerCase())
        );
      });
      setGetData(filterTable);
    } else {
      setGetData(props.getData);
    }
  }

  function deleteRecord(id: number) {
    dispatch(deleteTransaction(id));
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search.."
          onChange={(e) => filterBySearch(e)}
        />
      </div>
      <table className="table table-secondary">
        <thead>
          <tr>
            <th
              onClick={() => requestSort("transDate", undefined)}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Transaction Date
            </th>
            <th
              onClick={() => requestSort("month", "month")}
              style={{ cursor: "pointer" }}
            >
              Month
            </th>
            <th
              onClick={() => requestSort("transType", undefined)}
              style={{ cursor: "pointer" }}
            >
              Transaction Type
            </th>
            <th
              onClick={() => requestSort("frmAcc", undefined)}
              style={{ cursor: "pointer" }}
            >
              From Account
            </th>
            <th
              onClick={() => requestSort("toAcc", undefined)}
              style={{ cursor: "pointer" }}
            >
              To Account
            </th>
            <th
              onClick={() => requestSort("amount", "number")}
              style={{ cursor: "pointer" }}
            >
              Amount
            </th>
            <th>Filename</th>
            <th
              onClick={() => requestSort("notes", undefined)}
              style={{ cursor: "pointer" }}
            >
              Notes
            </th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <>
            {getData ? (
              getData
                .slice(firstIndex, lastIndex)
                .map((data: formValue, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{data.transDate}</td>
                      <td>{data.month}</td>
                      <td>{data.transType}</td>
                      <td>{data.frmAcc}</td>
                      <td>{data.toAcc}</td>
                      <td>
                        {Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 0,
                        }).format(parseInt(data.amount))}
                      </td>
                      <td>
                        <img
                          src={data.filename}
                          alt="img"
                          height="50px"
                          width="50px"
                        ></img>
                      </td>
                      <td>{data.notes}</td>
                      <td>
                        {" "}
                        <Link to={`${data.id}`}>View</Link>
                      </td>
                      <td>
                        {" "}
                        <Link to={`update/${data.id}`}>Update</Link>
                      </td>
                      <td onClick={() => deleteRecord(Number(data.id))}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <h1>No Data Found</h1>
            )}
          </>
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <span
              className={`page-link ${currentPage === 1 ? "disable" : ""}`}
              onClick={prePage}
              style={{ cursor: "pointer" }}
            >
              Prev
            </span>
          </li>
          {numbers.map((n, index) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={index}
            >
              <span
                className="page-link"
                onClick={() => changeCurrentPage(n)}
                style={{ cursor: "pointer" }}
              >
                {n}
              </span>
            </li>
          ))}

          <li className="page-item">
            <span
              className={`page-link ${
                currentPage === totalPages ? "disable" : ""
              }`}
              onClick={NextPage}
              style={{ cursor: "pointer" }}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};
