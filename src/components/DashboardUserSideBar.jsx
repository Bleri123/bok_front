import PropTypes from "prop-types";
import DashboardSideBar from "./DashboardSideBar";

const links = [
  {
    link: "Balance",
    text: "Balance",
  },
  {
    link: "withdraw",
    text: "Withdraw",
  },
  {
    link: "transfer",
    text: "Transfer",
  },

  {
    link: "reports",
    text: "Reports",
  },
];

export default function DashboardUserSideBar({ show }) {
  return <DashboardSideBar show={show} links={links} />;
}

DashboardUserSideBar.propTypes = {
  show: PropTypes.bool,
};
