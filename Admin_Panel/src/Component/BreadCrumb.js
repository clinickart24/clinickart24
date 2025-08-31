/** @format */

import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title, backtitle, link }) => {
  return (
    <p className="headP">
      <Link to={`/${link}`}>{backtitle}</Link> / {title}{" "}
    </p>
  );
};

export default BreadCrumb;
