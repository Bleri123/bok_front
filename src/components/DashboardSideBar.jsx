import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";
import removeToken from "../utils/removeToken";

export default function DashboardSideBar({ show, links }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    const token = getToken();
    if (token) removeToken();
    navigate("/login");
  };
  return (
    <div
      className={`w-[200px] bg-primary lg:w-[200px] xl:w-[240px] flex flex-col style="
    height: 100vh; ${show ? "block" : "hidden"} lg:block`}
    >
      <ul className="text-tprimary flex items-center flex-col text-[20px] gap-4 md:w-[200px] lg:w-[200px] lg:text-[30px] xl:w-[240px] min-h-[100vh]">
        {links.map(({ link, text }) => (
          <li key={text}>
            <Link to={link}>{text}</Link>
          </li>
        ))}
        <li className="cursor-pointer" onClick={() => handleLogout()}>
          Logout
        </li>
      </ul>
    </div>
  );
}

DashboardSideBar.propTypes = {
  show: PropTypes.bool,

  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,

      text: PropTypes.string,
    })
  ),
};
