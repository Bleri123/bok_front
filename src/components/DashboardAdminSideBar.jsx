import PropTypes from "prop-types";
import DashboardSideBar from "./DashboardSideBar";

const links = [
  {
    link: "/dashboard/users",
    text: "Users",
  },
  {
    link: "/dashboard/user-report",
    text: "Reports",
  },
];

export default function DashboardAdminSideBar({ show }) {
  return <DashboardSideBar show={show} links={links} />;
}

DashboardAdminSideBar.propTypes = {
  show: PropTypes.bool,
};
