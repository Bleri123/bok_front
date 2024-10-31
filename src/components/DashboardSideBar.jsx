import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function DashboardSideBar({ show, links }) {
  return (
    <div
      className={`w-[200px] h-[100vh] bg-primary lg:w-[200px] xl:w-[240px] ${
        show ? 'block' : 'hidden'
      } lg:block`}
    >
      <ul className="text-tprimary flex items-center flex-col text-[25px] gap-4 lg:text-[35px]">
        {links.map(({link, text}) => (
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
