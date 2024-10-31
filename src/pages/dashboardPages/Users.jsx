import { Navigate, useOutletContext } from 'react-router-dom';

export default function Users() {
  const { isAdmin } = useOutletContext();

  if(!isAdmin){
    return <Navigate to='/dashboard' replace/>
  }

  return <h1>Users</h1>;
}

