import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, handleModalOpen, logoutUser }) => {
  // Your header component code goes here
  return (
    <header className="text-gray-400 bg-#EBEBEB body-font" style={{ position: 'fixed', width: '100%', justifyContent: 'space-between', padding: '0 20px', backgroundColor: '#ebebeb', zIndex: 9999 }}>
    <div className="mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center justify-between" style={{ zIndex: 9999 }}>
      {/* Logo */}

      {(results || page !== "home") && (
        <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img src={imag} alt="My Image" style={{ width: 'auto', height: '50px' }} onClick={() => { handlePageChange("home"); setResults(null)}} />
        </div>
      )}

      {/* Menu or User Actions */}
      <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-gray-700 flex flex-wrap items-center text-base justify-between w-3/5">
        <p onClick={() => handlePageChange("about-us")} className="relative">About Us</p>
        <p onClick={() => handlePageChange("about-us")} className="relative">Contact Us</p>
        <p onClick={() => handlePageChange("pricing")} className="relative">Pricing</p>
        <p onClick={() => handlePageChange("tnc")} className="relative">Terms & Conditions</p>
        <p onClick={() => handlePageChange("privacypolicy")} className="relative">Privacy Policy</p>
      </nav>


      {/* User Login/Logout */}
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <div className="text-gray-900 mr-2">Welcome, {user.name}!</div>
        ) : (
          <button onClick={handleModalOpen} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-green-700 rounded text-base mt-4 md:mt-0">
            Login
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}

        {user && (
          <button onClick={logoutUser} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-white mt-2 md:mt-0">
            Logout
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div> */}

      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 9999 }}>
        {user ? (
          <div className="relative">
            <div
              ref={avatarRef}
              className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full cursor-pointer"
              onClick={toggleDropdown}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="fixed w-40 bg-white border rounded-lg shadow-lg"
                style={{ top: dropdownPosition.top, left: dropdownPosition.left, zIndex: 1000 }}
              >
                <div>
                  <div className="text-gray-900 p-2">Welcome {user.name}</div>
                </div>
                <div >
                  <button
                    onClick={logoutUser}
                    className=" px-2 py-1 flex items-center justify-between border rounded-b-lg bg-red-600 focus:outline-none hover:bg-red-700 text-white w-full"
                  //  style={{ padding: '0', borderRadius: '0 0 10px 10px' }}
                  >
                    Logout
                    <div >
                      <svg width="26" height="15" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5478 19.2357C18.5527 18.6014 18.138 18.1612 17.5628 18.1676C16.9974 18.174 16.6008 18.6092 16.5979 19.2328C16.5949 19.8021 16.5979 20.3719 16.5969 20.9412C16.5949 22.2245 15.7743 23.0461 14.4909 23.0466C11.3261 23.0476 8.16081 23.0476 4.996 23.0466C3.6975 23.0466 2.87781 22.2274 2.87781 20.9289C2.87732 15.308 2.87732 9.68702 2.87781 4.06606C2.87781 2.78272 3.69995 1.9601 4.98279 1.95961C8.15592 1.95863 11.329 1.95814 14.5022 1.95961C15.7689 1.9601 16.5935 2.78615 16.5969 4.05188C16.5984 4.66175 16.5881 5.27212 16.6018 5.882C16.614 6.42732 17.0449 6.83912 17.5741 6.83863C18.1032 6.83863 18.5366 6.42683 18.5449 5.88102C18.5561 5.14105 18.5693 4.39961 18.5361 3.66061C18.4632 2.02319 17.2498 0.550088 15.6569 0.15198C15.3209 0.0678586 14.9678 0.0135711 14.6225 0.0125929C11.3682 0.00232233 8.11337 -0.00990459 4.85906 0.013082C3.2006 0.025798 1.99552 0.824949 1.27853 2.3181C1.10637 2.67708 1.03986 3.08693 0.924927 3.4733V21.5344C1.05013 21.9413 1.1274 22.3712 1.30983 22.7507C1.90846 23.9993 2.91009 24.7354 4.28293 24.9565C4.32058 24.9623 4.35531 24.9853 4.3915 25H15.0837C15.1282 24.9843 15.1712 24.9604 15.2172 24.9535C16.9373 24.6948 18.3013 23.3474 18.495 21.6234C18.5835 20.8355 18.5424 20.0324 18.5483 19.2357H18.5478Z" fill="white" />
                        <path d="M25.1592 10.7723C24.4534 10.1106 23.7863 9.40775 23.1011 8.72353C23.0551 8.67756 23.0087 8.6311 22.9583 8.59051C22.6453 8.33912 22.2995 8.27896 21.9322 8.44623C21.5664 8.613 21.3737 8.90987 21.359 9.31091C21.3473 9.62295 21.4872 9.87189 21.7063 10.0876C22.1914 10.5644 22.6712 11.0466 23.2019 11.5753H22.8546C19.1372 11.5753 15.4192 11.5753 11.7017 11.5753C11.5961 11.5753 11.4895 11.57 11.3848 11.5822C10.9867 11.6291 10.7001 11.838 10.5592 12.2131C10.4213 12.5794 10.4966 12.9208 10.7568 13.2113C10.9852 13.4661 11.2865 13.5302 11.6191 13.5297C15.3693 13.5263 19.1195 13.5272 22.8698 13.5272H23.2033C22.6712 14.0569 22.1841 14.5245 21.72 15.014C21.5747 15.1671 21.4451 15.3662 21.3898 15.5662C21.2725 15.9907 21.4818 16.4123 21.8574 16.6211C22.2447 16.8363 22.6874 16.783 23.0229 16.4529C23.7418 15.7457 24.4363 15.0126 25.1689 14.32C26.1256 13.4162 26.127 11.6785 25.1592 10.7708V10.7723Z" fill="white" />
                      </svg>
                    </div>

                  </button>
                </div>
              </div>

            )}
          </div>
        ) : (
          <button
            onClick={handleModalOpen}
            className="inline-flex items-center bg-[#343434] border-0 py-1 px-3 focus:outline-none hover:bg-green-700 rounded text-white mt-4 md:mt-0"
          >
            Login
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>

    </div>
  </header>
  );
};

export default Header;