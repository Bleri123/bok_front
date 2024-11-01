import { Navigate, useOutletContext } from "react-router-dom";
import getSelectedAccount from "../../utils/getSelectedAccount";
import { Footer } from "../../components/Footer";

export default function Withdraw() {
  const { error } = getSelectedAccount();
  const { isAdmin } = useOutletContext();

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <div className="bg-balancebg2 min-h-screen w-[100vw] flex flex-col justify-between overflow-hidden">
      <div className="w-4/5 flex flex-col gap-4 mx-auto">
        <h1 className="text-center text-2xl font-bold text-tprimary mt-6 md:text-4xl md:mb-5">
          Withdrawal
        </h1>
        <div className="flex justify-center mb-4 gap-4">
          <button className="bg-primary text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl">
            10
          </button>
          <button className="bg-primary text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl">
            150
          </button>
        </div>
        <div className="flex justify-center mb-4 gap-4">
          <button className="bg-primary text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl">
            50
          </button>
          <button className="bg-primary text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl">
            200
          </button>
        </div>
        <div className="flex justify-center mb-4 gap-4">
          <button className="bg-primary text-white p-3 w-full max-w-[140px] rounded-md md:max-w-[300px] md:h-[70px] md:text-2xl">
            100
          </button>
          <button className="bg-primary text-white p-3 w-full max-w-[140px] rounded-md text-sm md:max-w-[300px] md:h-[70px] md:text-2xl">
            Enter Number
          </button>
        </div>
        <button className="bg-primary text-white p-3 mt-4 w-full max-w-[180px] mx-auto rounded-md md:text-xl md:max-w-[400px]">
          Withdraw
        </button>
      </div>
      <Footer />
    </div>
  );
}
