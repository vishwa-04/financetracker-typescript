import React from "react";
import { Link } from "react-router-dom";
import "../user/css/error.css";

const Error = () => {
  return (
    <>
      <div className="errorBody">
        <div className="jc-elevator">
          <div id="myBtn" className="jc-floor">
            <h3>404</h3>
          </div>
          <div id="doors" className="jc-doors">
            <div>Ops... Wrong floor</div>
          </div>

          <div className="jc-switch">
            <Link to={"/showTable"}></Link>
            {/* <a href="#"></a> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Error;
