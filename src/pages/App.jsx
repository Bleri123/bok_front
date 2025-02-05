import { Header } from "../components/Header";
function App() {
  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <Header />
      <div
        id="content"
        className="flex flex-col lg:flex-row justify-center mt-12 bg-secondary px-4 flex-grow"
      >
        <div
          id="left"
          className="ml-3 w-full lg:w-[50%] flex flex-col xl:w-[60%] 2xl:ml-8"
        >
          <div id="Welcome">
            <h1 className="font-bold text-[28px] md:text-5xl xl:text-6xl">
              Welcome to Bank of Kosovo
            </h1>
            <p className="mt-4 text-[15px] w-full text-pretty pl-4 md:text-2xl md:w-[550px] xl:text-3xl xl:w-[650px]">
              Welcome to the Bank Of Kosovo, a professional bank system, made
              for online transactions like a boss.
            </p>
          </div>
          <div id="list" className="mt-8">
            <h1 className="font-bold text-[28px] md:text-5xl xl:text-6xl 2xl:mt-8">
              Use online banking
            </h1>
            <ul className="mt-4 list-disc text-[15px] w-full pl-4 md:text-2xl xl:text-3xl">
              <li>Receive money</li>
              <li>Send money</li>
              <li>See your balance</li>
              <li>Use online banking</li>
              <li>etc....</li>
            </ul>
          </div>
        </div>
        <div
          id="right"
          className="w-full lg:w-[50%] flex justify-center items-center xl:w-[40%]"
        >
          <div id="card_photo">
            <img
              src="/images/card.png"
              alt="card"
              className="w-[250px] h-[150px] md:w-[340px] md:h-[240px] lg:w-[420px] lg:h-[330px] 2xl:w-[620px] 2xl:h-[430px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
