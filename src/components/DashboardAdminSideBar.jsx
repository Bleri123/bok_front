import PropTypes from 'prop-types';
import DashboardSideBar from './DashboardSideBar';

const links = [
  {
    link: '/users',
    text: 'Users',
  },
  {
    link: '/reports',
    text: 'Reports',
  },
];

export default function DashboardAdminSideBar({ show }) {
    console.log('Admin sidebar rendered');
  return <DashboardSideBar show={show} links={links} />;
}

DashboardAdminSideBar.propTypes = {
  show: PropTypes.bool,
};
