export default function DashboardSideBar() {
  return (
    <div className="w-[200px] h-[100vh] bg-primary lg:w-[200px] xl:w-[240px]">
      <ul className="text-tprimary flex items-center flex-col text-[25px] gap-4 lg:text-[35px]">
        <li className="border-b-2">Balance</li>
        <li>Withdraw</li>
        <li>Deposit</li>
        <li>Reports</li>
        <li>Accounts</li>
      </ul>
    </div>
  );
}
