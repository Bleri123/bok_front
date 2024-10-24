import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="bg-secondary min-h-[100vh]">
      <div id="header" className="bg-primary text-white flex items-center">
        <div id="logo" className="w-[40%] border-r flex justify-center">
          <img
            src="/images/BOK.png"
            alt="BOK"
            className="w-[400px] h-[250px] object-cover"
          />
        </div>
        <div id="nav-bar" className="w-[60%]">
          <ul className="flex gap-6 ml-28 text-2xl font-bold">
            <li className="border-b[primary]">
              <Link to="/login">Login</Link>
            </li>
            <li className="border-b[primary]">
              <Link to="/Aboutus">About us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div id="content" className="flex justify-center mt-12  bg-secondary">
        <div id="left" className="w-[60%] ml-8">
          <div id="Welcome">
            <h1 className="font-bold text-[57px]">Welcome to Bank of Kosovo</h1>
            <p className="text-[28px] w-[55%] text-pretty pl-6">
              Welcome to the Bank Of Kosovo, a professional bank system, made
              for online transactions like a boss.
            </p>
          </div>
          <div id="list" className="mt-8">
            <h1 className="font-bold text-[57px]">Use online banking</h1>
            <ul className="list-disc ml-4 text-[28px] w-[50%] pl-6">
              <li>Receive money</li>
              <li>Send money</li>
              <li>See your balance</li>
              <li>Use online banking</li>
              <li>etc....</li>
            </ul>
          </div>
        </div>
        <div id="right">
          <div id="card_photo">
            <img
              src="/images/card.png"
              alt="card"
              className="w-[490px] h-[480px]"
            />
          </div>
        </div>
      </div>
      <div id="footer" className="text-center text[primary] mt-8">
        <p>@COPYRIGHT 2024 BOK</p>
      </div>
    </div>
  );
}

export default App;
