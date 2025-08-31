/** @format */
import { Table } from "react-bootstrap";
import HOC from "../../Layout/HOC";

const Payment = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
           Manage Transactions (Total : 1)
          </span>
        </div>
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input type="search" placeholder="" />
        </div>
        <div className="searchByDate">
          <div>
            <label>Starting Date </label>
            <input type="date" />
          </div>

          <div>
            <label>Ending Date </label>
            <input type="date" />
          </div>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Vendor</th>
                <th>Vendor Number</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>638984128</td>
                <td>Basic</td>
                <td>
                  <i className="fa-solid fa-indian-rupee-sign"></i>1000
                </td>
                <td>Cash</td>

                <td>01/22/2024</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Payment);
