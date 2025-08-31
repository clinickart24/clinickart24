/** @format */

import React from "react";
import { Table } from "react-bootstrap";
import { Loader, NotFound } from "./HelpingComponents";

const TableLayout = ({ thead, tbody, className, loading }) => {

  return loading ? (
    <Loader />
  ) : (
    <div className="overFlowCont">
      <Table className={className ? className : ""}>
        <thead>
          <tr>
            {thead?.map((i, index) => (
              <th key={`thead${index}`}> {i} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody?.map((rowData, rowIndex) => (
            <tr key={`row${rowIndex}`}>
              {rowData?.map((cellData, cellIndex) => (
                <td key={`cell${cellIndex}`}>{cellData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {tbody?.length === 0 && <NotFound />}
    </div>
  );
};
export default TableLayout;
