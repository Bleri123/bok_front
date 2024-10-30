import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div
      id="header"
      className="bg-primary text-white flex items-center sm:h-32 lg:h-[152px] xl:h-[180px]"
    >
      <div id="logo" className="w-[40%] border-r flex justify-center">
        <Link to="/">
          <img
            src="/images/BOK.png"
            alt="BOK"
            className="w-[175px] h-[110px] object-cover lg:w-[200px] lg:h-[145px] xl:w-[300px] xl:h-[220px]"
          />
        </Link>
      </div>
      <div id="nav-bar" className="w-[60%]">
        <ul className="flex gap-3 justify-center text-sm font-bold md:text-xl lg:gap-5 lg:text-2xl xl:gap-7 xl:text-3xl">
          <li className="link-style">
            <Link to="/login">Login</Link>
          </li>
          <li className="link-style">
            <Link to="/about-us">About us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
