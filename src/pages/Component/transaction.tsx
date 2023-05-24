import { useParams } from "react-router-dom";
import { RootState } from "../Redux/store";
import { useAppSelector } from "../Redux/hooks";

const ViewTransaction = () => {
  const { id } = useParams();
  const transaction_redux = useAppSelector((state: RootState) =>
    state.transaction.find((ele: any) => ele.id == id)
  );

  return (
    <>
      {[transaction_redux].map((data: any, index) => {
        return (
          <div className="container">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Details</h5>

                <div>
                  <label>Trans Date:</label>
                  <span className="card-text">{data.transDate}</span>
                </div>
                <br />

                <div>
                  <label>Month:</label>
                  <span className="card-text">{data.month}</span>
                </div>
                <br />
                <div>
                  <label>Trans Type:</label>
                  <span className="card-text">{data.transType}</span>
                </div>
                <br />
                <div>
                  <label>From Account:</label>
                  <span className="card-text">{data.frmAcc}</span>
                </div>
                <br />
                <div>
                  <label>To Account:</label>
                  <span className="card-text">{data.toAcc}</span>
                </div>
                <br />
                <div>
                  <label>Amount:</label>
                  <span className="card-text">{data.amount}</span>
                </div>
                <br />
                <div>
                  <label>Reciept:</label>
                  <img
                    src={data.filename}
                    alt="img"
                    height="70px"
                    width="70px"
                  ></img>
                </div>
                <br />
                <div>
                  <label>Notes:</label>
                  <span className="card-text">{data.notes}</span>
                </div>
                <br />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ViewTransaction;
