import { Navigate, useOutletContext } from 'react-router-dom';

export default function Home() {
  const { isAdmin } = useOutletContext();

  if (isAdmin) {
    return <Navigate to="users" replace />;
  }
  return <Navigate to="balance" />;
}
