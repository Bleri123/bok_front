import { createContext, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import axios from "axios";
import getToken from "../utils/getToken";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardUserSideBar from "../components/DashboardUserSideBar";
import DashboardAdminSideBar from "../components/DashboardAdminSideBar";

export const AccountsContext = createContext([]);
export const SelectedAccountContext = createContext(null);

export default function Dashboard() {
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [showSideBarMobile, setshowSideBarMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (isAdmin === null) {
      async function fetch() {
        const token = getToken();
        try {
          const res = await axios.get("http://localhost:5000/auth/isAdmin", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAdmin(res.data.isAdmin);
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          setIsAdmin(false);
        }
      }
      fetch();
    }
  }, [isAdmin]);

  if (!getToken()) {
    return <Navigate to="/" replace></Navigate>;
  }

  return (
    <div>
      <SelectedAccountContext.Provider
        value={{ selectedAccountIndex, setSelectedAccountIndex }}
      >
        <DashboardHeader
          showSideBar={setshowSideBarMobile}
          sideBarActive={showSideBarMobile}
          isAdmin={isAdmin}
        />
        <div className="flex min-h-full align-baseline">
          {isAdmin ? (
            <DashboardAdminSideBar show={showSideBarMobile} />
          ) : (
            <DashboardUserSideBar show={showSideBarMobile} />
          )}
          {/*QYTY BAHET RENDER CHILD PSH WITHDRAW*/}
          <Outlet context={{ isAdmin }} />
        </div>
      </SelectedAccountContext.Provider>
    </div>
  );
}
