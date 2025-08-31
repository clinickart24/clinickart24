/** @format */

import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="text-center p-2">
      <ClipLoader color="#0D6EFD" />
    </div>
  );
};

const NotFound = () => {
  return <Alert className="w-100">No Data Found</Alert>;
};

export { Loader, NotFound };
