import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function DashboardSideBar({ show, links }) {
  return (
    <div
      className={`w-[200px] bg-primary lg:w-[200px] xl:w-[240px] flex flex-col style="
    height: 100vh; ${show ? "block" : "hidden"} lg:block`}
    >
      <ul className="text-tprimary flex items-center flex-col text-[20px] gap-4 md:w-[200px] lg:w-[200px] lg:text-[30px] xl:w-[240px]">
        {links.map(({ link, text }) => (
          <li key={text}>
            <Link to={link}>{text}</Link>
          </li>
        ))}
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
