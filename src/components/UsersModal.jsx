export default function UsersModal({ onClose, email, setEmail, userInfo, loading, error, handleSearch }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#2a3447] rounded-xl w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-2">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="flex justify-center flex-col items-center p-2 gap-5 mx-auto">
          <h1 className="text-white text-center">Enter e-mail to see accounts information</h1>
          
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="placeholder:text-center w-fit p-2"
            placeholder="E-mail"
          />

          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-primary text-white p-2 rounded-xl w-fit px-5 hover:bg-primary/80 transition-colors duration-200"
          >
            {loading ? 'Loading...' : 'Send'}
          </button>

          {error && <p className="text-red-500">{error}</p>}

          {userInfo && (
            <div className="bg-[#2a3447] p-3 sm:p-5 md:p-6 rounded-xl w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
              <h2 className="text-white text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-5">User Information</h2>
              
              {/* Table Layout */}
              <div className="bg-[#1a2332] rounded text-white text-[11px] sm:text-xs md:text-sm">
                <div className="grid grid-cols-2 p-1.5 sm:p-2 md:p-3 border-b border-gray-700">
                  <div className="font-semibold">ID</div>
                  <div>{userInfo.id}</div>
                </div>
                
                <div className="grid grid-cols-2 p-1.5 sm:p-2 md:p-3 border-b border-gray-700">
                  <div className="font-semibold">Name/Surname</div>
                  <div className="break-words">
                    {userInfo.first_name} {userInfo.last_name}
                  </div>
                </div>

                <div className="grid grid-cols-2 p-1.5 sm:p-2 md:p-3 border-b border-gray-700">
                  <div className="font-semibold">Account Type</div>
                  <div>N/A</div>
                </div>

                <div className="grid grid-cols-2 p-1.5 sm:p-2 md:p-3 border-b border-gray-700">
                  <div className="font-semibold">Role</div>
                  <div>N/A</div>
                </div>

                <div className="grid grid-cols-2 p-1.5 sm:p-2 md:p-3">
                  <div className="font-semibold">Status</div>
                  <div>
                    <span className="bg-red-500 px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 rounded text-[9px] sm:text-[10px] md:text-xs">
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}