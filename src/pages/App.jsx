import { Header } from "../components/Header";

function App() {
  return (
    <div className="bg-secondary min-h-[100vh]">
      <Header />
      <div id="content" className="flex justify-center mt-12  bg-secondary">
        <div id="left" className="w-[100%] ml-8">
          <div id="Welcome">
            <h1 className="font-bold text-[28px]">Welcome to Bank of Kosovo</h1>
            <p className="text-[15px] w-[65%] text-pretty pl-4">
              Welcome to the Bank Of Kosovo, a professional bank system, made
              for online transactions like a boss.
            </p>
          </div>
          <div id="list" className="mt-8">
            <h1 className="font-bold text-[28px]">Use online banking</h1>
            <ul className="list-disc ml-4 text-[15px] w-[65%] pl-4">
              <li>Receive money</li>
              <li>Send money</li>
              <li>See your balance</li>
              <li>Use online banking</li>
              <li>etc....</li>
            </ul>
          </div>
        </div>
      </div>
      <div id="right" className="w-[100%] flex justify-center">
        <div id="card_photo">
          <img
            src="/images/card.png"
            alt="card"
            className="w-[250px] h-[150px]"
          />
        </div>
      </div>
      <div id="footer" className="text-center text[primary] mt-8">
        <p>@COPYRIGHT 2024 BOK</p>
      </div>
    </div>
  );
}

export default App;
