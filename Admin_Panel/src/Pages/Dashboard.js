/** @format */

import React, { useEffect, useState } from "react";
import { DashboardCards } from "../Component/Cards";
import HOC from "../Layout/HOC";
import { getApi } from "../Repository/Repository";
import ReactApexChart from "react-apexcharts";

const series = [
  {
    name: "series1",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "series2",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

const options = {
  chart: {
    height: 350,
    width: "100%",
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

const series2 = [
  {
    name: "Sales",
    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
  },
];

const options2 = {
  chart: {
    height: 350,
    type: "line",
  },
  forecastDataPoints: {
    count: 7,
  },
  stroke: {
    width: 5,
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "1/11/2000",
      "2/11/2000",
      "3/11/2000",
      "4/11/2000",
      "5/11/2000",
      "6/11/2000",
      "7/11/2000",
      "8/11/2000",
      "9/11/2000",
      "10/11/2000",
      "11/11/2000",
      "12/11/2000",
      "1/11/2001",
      "2/11/2001",
      "3/11/2001",
      "4/11/2001",
      "5/11/2001",
      "6/11/2001",
    ],
    tickAmount: 10,
    labels: {
      formatter: function (value, timestamp, opts) {
        return opts.dateFormatter(new Date(timestamp), "dd MMM");
      },
    },
  },
  title: {
    text: "Forecast",
    align: "left",
    style: {
      fontSize: "16px",
      color: "#666",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#FDD835"],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
};

const Dashboard = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    getApi({
      url: "api/v1/admin/dashboard",
      setResponse,
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const card = [
    {
      title: "Total Customers",
      number: response?.data?.userCount,
      icon: <i className="fa-solid fa-user text-2xl text-[#03AED2]"></i>,
      bg: "#03AED2",
      link: "/users",
    },
    {
      title: "Total New Customers",
      number: response?.data?.newCustomersCount,
      icon: <i className="fa-solid fa-user text-2xl text-[#03AED2]"></i>,
      bg: "#2C4E80",
      link: "/users",
    },
    {
      title: "Total Vendors",
      number: response?.data?.vendorCount,
      icon: <i className="fa-solid fa-user-tie text-2xl text-[#00215E]"></i>,
      bg: "#00215E",
      link: "/vendors",
    },
    {
      title: "Blocked Vendors",
      number: response?.data?.blockedVendorsCount,
      icon: <i className="fa-solid fa-ban text-2xl text-[#4D869C]"></i>,
      bg: "#4D869C",
      link: "/blockedvendors",
    },

    {
      title: "Total Products",
      number: response?.data?.productCount,
      icon: <i className="fa-solid fa-box text-2xl text-[#2C4E80]"></i>,
      bg: "#2C4E80",
      link: "/Product",
    },

  ];

  return (
    <>
      <section className="CardDiv_Container">
        {card.map((card, index) =>
          card.title ? (
            <DashboardCards
              bg={card.bg}
              link={card.link}
              title={card.title}
              number={card.number}
              icon={card.icon}
              key={index}
            />
          ) : (
            <div style={{ width: "350px" }}></div>
          )
        )}
      </section>{" "}
      {/* <div className="charts-container">
        <div className="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
        <div className="chart">
          <ReactApexChart
            options={options2}
            series={series2}
            type="line"
            height={350}
          />
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <ReactApexChart
            options={options2}
            series={series2}
            type="line"
            height={350}
          />
        </div>
        <div className="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div> */}
    </>
  );
};

export default HOC(Dashboard);
