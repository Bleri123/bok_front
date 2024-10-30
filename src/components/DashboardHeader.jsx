import PropTypes from "prop-types";
import BOKLogo from "../assets/BOKLOGO.png";

export default function DashboardHeader({ accountNumber }) {
  return (
    <header className="bg-primary h-28 flex">
      <div className="w-[10%] h-full border-r-2 border-b-2 border-stroke hidden">
        <img
          className="w-[100%] h-full"
          src={BOKLogo}
          alt="bank of kosovo logo"
        />
      </div>
      <div>
        <div className="p-2 text-secondary flex-1">
          <div className="flex h-[50%] items-center pr-20 pl-4 pt-2 pb-4 border-b-2 ">
            <h1 className="mr-[auto] text-2xl font-bold w-min">BOK</h1>
            {accountNumber && (
              <p className="text-xl">
                <span>Selected account number: </span> {accountNumber}
              </p>
            )}
          </div>
          <div className="h-[50%] flex items-center justify-center">
            <h1 className="text-2xl font-medium">Bank Of Kosovo</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  accountNumber: PropTypes.string,
};
