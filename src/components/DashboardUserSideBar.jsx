import PropTypes from 'prop-types';
import DashboardSideBar from './DashboardSideBar';

const links = [
  {
    link: '/withdraw',
    text: 'Withdraw',
  },
  {
    link: '/deposit',
    text: 'Deposit',
  },
  {
    link: '/reports',
    text: 'Reports',
  },
  {
    link: '/accounts',
    text: 'Accounts',
  },
];

export default function DashboardUserSideBar({ show }) {
  return <DashboardSideBar show={show} links={links} />;
}

DashboardUserSideBar.propTypes = {
  show: PropTypes.bool,
};
