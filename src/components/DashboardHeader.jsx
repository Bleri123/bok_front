import PropTypes from "prop-types";
import newBOKlogo from "../assets/newBOKlogo.png";
import getSelectedAccount from "../utils/getSelectedAccount";
import { useState } from "react";

export default function DashboardHeader({
  showSideBar,
  sideBarActive,
  isAdmin,
}) {
  const { selectedAccount } = getSelectedAccount();
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <header
      className="bg-primary flex justify-center h-[128px] lg:h-[150px] lg:flex lg:justify-start xl:h-[190px]"
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{ transform: isActive ? "rotate(45deg)" : "none" }}
        onClick={() => {
          showSideBar(!sideBarActive);
        }}
      >
        <svg
          className={`ham hamRotate ml-[53px] w-[40px] sm:w-[80px] lg:hidden ham8 ${
            isActive ? "active" : ""
          }`}
          viewBox="0 0 100 100"
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            transition: "transform 400ms",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <path
            className="line top"
            d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
            style={{
              fill: "none",
              stroke: "#fff",
              strokeWidth: 5.5,
              strokeLinecap: "round",
              transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
              strokeDasharray: isActive ? "40 160" : "40 160",
              strokeDashoffset: isActive ? "-64px" : "0",
            }}
          />
          <path
            className="line middle"
            d="m 30,50 h 40"
            style={{
              fill: "none",
              stroke: "#fff",
              strokeWidth: 5.5,
              strokeLinecap: "round",
              transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
              strokeDasharray: "40 142",
              transformOrigin: "50%",
              transform: isActive ? "rotate(90deg)" : "none",
            }}
          />
          <path
            className="line bottom"
            d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
            style={{
              fill: "none",
              stroke: "#fff",
              strokeWidth: 5.5,
              strokeLinecap: "round",
              transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms",
              strokeDasharray: "40 85",
              strokeDashoffset: isActive ? "-64px" : "0",
            }}
          />
        </svg>
      </div>
      <div>
        <img
          className="hidden md:block w-[140px] h-[110px] md:w-[200px] md:h-[150px] lg:border-b-2 lg:border-r-2 lg:w-[200px] xl:h-[190px] xl:w-[240px]"
          src={newBOKlogo}
          alt="bank of kosovo logo"
        />
      </div>
      <div className="p-2 text-secondary flex-1">
        <div className="flex h-[50%] items-center pr-20 pl-4 pt-2 pb-4 border-b-2 ">
          <h1 className="mr-[auto] text-4xl font-bold w-min">BOK</h1>
          {!isAdmin && selectedAccount && (
            <p className="ml-7 text-[12px]">
              <span>Selected account number: </span>{" "}
              {selectedAccount.account_number}
            </p>
          )}
        </div>
        <div className="h-[50%] flex items-center justify-center">
          <h1 className="text-2xl font-medium">Bank Of Kosovo</h1>
        </div>
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  showSideBar: PropTypes.func,
  sideBarActive: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
