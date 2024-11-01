// import { Navigate, useOutletContext } from "react-router-dom";

// import getSelectedAccount from "../../utils/getSelectedAccount";
// import { Footer } from "../../components/Footer";

// export default function Balance() {
//   const { error, selectedAccount } = getSelectedAccount();

//   const { isAdmin } = useOutletContext();

//   if (isAdmin) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (error) {
//     return <h1 className="text-red-500">{error}</h1>;
//   }

//   return (
//     <div className="bg-balancebg2 min-h-screen flex flex-col justify-between overflow-hidden">
//       <div className="flex-grow">
//         <div className="bg-balancebg w-screen h-[120px] flex flex-col justify-center items-center lg:w-[860px] lg:h-[200px] lg:items-center xl:w-[1230px] xl:h-[320px] 2xl:w-screen">
//           <h1 className="text-3xl font-bold text-white lg:text-5xl xl:text-7xl">
//             Cash / Bank Balance
//           </h1>

//           <h2 className="text-3xl text-white mt-2 lg:text-5xl xl:text-7xl">
//             {selectedAccount.balance} $
//           </h2>
//         </div>
//         <div className="mt-4 px-4 flex flex-col justify-center items-center">
//           <div className="flex flex-row justify-between w-full pb-2">
//             <p className="text-tprimary flex-1 pr-2 text-md lg:text-xl xl:text-3xl">
//               Withdraw <span className="text-red-500">-150,0$</span>
//             </p>
//             <div className="border-l-2 border-gray-300 h-6 mx-2" />{" "}
//             <p className="text-tprimary flex-1 pl-2 text-md lg:text-xl xl:text-3xl">
//               BANK FEE <span className="text-red-500">-5,0$</span>
//             </p>
//           </div>
//           <div className="border-b-2 border-gray-300 w-full my-2" />{" "}
//           <div className="flex flex-row justify-between w-full pb-2">
//             <p className="text-tprimary flex-1 pr-2 text-md lg:text-xl xl:text-3xl">
//               Deposited <span className="text-green-500">+33,0$</span>
//             </p>
//             <div className="border-l-2 border-gray-300 h-6 mx-2" />{" "}
//             <p className="text-tprimary flex-1 pl-2 text-md lg:text-xl xl:text-3xl">
//               BANK FEE <span className="text-green-500">0,0$</span>
//             </p>
//           </div>
//           <div className="border-b-2 border-gray-300 w-full my-2" />{" "}
//           <div className="flex flex-row justify-between w-full pb-2">
//             <p className="text-tprimary flex-1 pr-2 text-sm md:text-lg lg:text-xl xl:text-3xl">
//               Transaction <span className="text-red-500">-50,0$</span>
//             </p>
//             <div className="border-l-2 border-gray-300 h-6 mx-2" />{" "}
//             <p className="text-tprimary flex-1 pl-2 text-md lg:text-xl xl:text-3xl">
//               BANK FEE <span className="text-red-500">-5,0$</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
import { Navigate, useOutletContext } from "react-router-dom";
import getSelectedAccount from "../../utils/getSelectedAccount";
import { Footer } from "../../components/Footer";

export default function Balance() {
  const { error, selectedAccount } = getSelectedAccount();
  const { isAdmin } = useOutletContext();

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return <h1 className="text-red-500">{error}</h1>;
  }

  return (
    <div className="bg-balancebg2 min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="flex-grow">
        <div className="bg-balancebg w-screen h-[120px] flex flex-col justify-center items-center overflow-hidden lg:w-[860px] lg:h-[200px] xl:w-[1230px] xl:h-[320px] 2xl:w-screen">
          <div className="flex flex-col items-center justify-center w-full h-full 2xl:translate-x-[-100px]">
            <h1 className="text-3xl font-bold text-white lg:text-5xl xl:text-7xl text-center">
              Cash / Bank Balance
            </h1>
            <h2 className="text-3xl text-white mt-2 lg:text-5xl xl:text-7xl text-center">
              {selectedAccount.balance} $
            </h2>
          </div>
        </div>
        <div className="mt-4 px-4 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between w-full pb-2">
            <p className="text-tprimary flex-1 pr-2 text-md lg:text-xl xl:text-3xl">
              Withdraw <span className="text-red-500">-150,0$</span>
            </p>
            <div className="border-l-2 border-gray-300 h-6 mx-2" />{" "}
            <p className="text-tprimary flex-1 pl-2 text-md lg:text-xl xl:text-3xl">
              Bank Fee <span className="text-red-500">-5,0$</span>
            </p>
          </div>
          <div className="border-b-2 border-gray-300 w-full my-2" />{" "}
          <div className="flex flex-row justify-between w-full pb-2">
            <p className="text-tprimary flex-1 pr-2 text-md lg:text-xl xl:text-3xl">
              Deposited <span className="text-green-500">+33,0$</span>
            </p>
            <div className="border-l-2 border-gray-300 h-6 mx-2" />{" "}
            <p className="text-tprimary flex-1 pl-2 text-md lg:text-xl xl:text-3xl">
              Bank Fee <span className="text-green-500">0,0$</span>
            </p>
          </div>
          <div className="border-b-2 border-gray-300 w-full my-2" />{" "}
          <div className="flex flex-row justify-between w-full pb-2">
            <p className="text-tprimary flex-1 pr-2 text-sm md:text-lg lg:text-xl xl:text-3xl">
              Transaction <span className="text-red-500">-50,0$</span>
            </p>
            <div className="border-l-2 border-gray-300 h-6 mx-2" />{" "}
            <p className="text-tprimary flex-1 pl-2 text-md lg:text-xl xl:text-3xl">
              Bank Fee <span className="text-red-500">-5,0$</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
