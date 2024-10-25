import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div id="header" className="bg-primary text-white flex items-center">
      <div id="logo" className="w-[40%] border-r flex justify-center">
        <Link to="/">
          <img
            src="/images/BOK.png"
            alt="BOK"
            className="w-[400px] h-[250px] object-cover"
          />
        </Link>
      </div>
      <div id="nav-bar" className="w-[60%]">
        <ul className="flex gap-6 ml-28 text-2xl font-bold ">
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
