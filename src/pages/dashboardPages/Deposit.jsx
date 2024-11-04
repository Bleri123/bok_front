import { Footer } from "../../components/Footer";

export default function Deposit() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex-grow flex flex-col items-center mt-11">
        <h1 className="mb-1 text-tprimary text-3xl lg:text-5xl">Deposit</h1>
        <div
          id="Cards"
          className="flex flex-col bg-secondary items-center p-4 w-[200px] rounded-md mt-6 md:w-[450px] lg:w-[670px]"
        >
          <div id="card" className="flex flex-col items-center mb-4">
            <button className="bg-primary text-white p-2 rounded w-[150px] h-[70px] text-2xl md:w-[350px] md:h-[100px] md:text-3xl lg:w-[450px] lg:text-4xl mt-5">
              Credit
            </button>
            <p className="text-lg md:text-2xl lg:text-3xl">400,00€</p>
          </div>
          <div id="card" className="flex flex-col items-center mb-4">
            <button className="bg-primary text-white p-2 rounded w-[150px] h-[70px] text-2xl md:w-[350px] md:h-[100px] md:text-3xl lg:w-[450px] lg:text-4xl">
              Debit
            </button>
            <p className="text-lg md:text-2xl lg:text-3xl">20,00€</p>
          </div>
          <div id="card" className="flex flex-col items-center mb-4">
            <button className="bg-primary text-white p-2 rounded w-[150px] h-[70px] text-2xl md:w-[350px] md:h-[100px] md:text-3xl lg:w-[450px] lg:text-4xl">
              Savings
            </button>
            <p className="text-lg md:text-2xl lg:text-3xl">1600,00€</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
