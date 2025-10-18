import { useEffect, useState } from "react";
import { navbarData, subsidiaries } from "../utils/data";
import { Link, NavLink, useLocation } from "react-router-dom";
import { equiserveLogo } from "../assets/images";
import { AnimatePresence, motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { Icon } from "@iconify/react";
import { analytics, searchNormal } from "../assets/icons";
import FAQCard from "./FAQCard";
import NavDropdown from "./NavDropdown";

const Navbar = ({ nav }) => {
  const isActive = false;

  const location = useLocation();

  // Selected Subsidiary
  const [selectedItem, setSelectedItem] = useState(null);

  // Subsidiary list
  const [subsidiariesList, setSubsidiariesList] = useState(subsidiaries);

  // Search menu visibility state
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  // Navdar dropdown visibility state
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);

  // Selected navbar dropdown
  const [selectedNavItem, setSelectedNavItem] = useState(null);

  //   Handles mobile screen nav visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleWidth = 1024;

  // Navbar visibility state
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //    Function that handles mobile screen visibility toggle on windows resize
  const handleResize = () => {
    // Toggle state based on the screen width
    if (window.innerWidth >= toggleWidth) setIsMobileMenuOpen(false);
  };

  // Function to handle the expansion and contraction of a section
  const handleToggleSection = (item) => {
    if (item?.id === selectedItem?.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };
  // End of unction to handle the expansion and contraction of a section

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to toggle search menu
  const handleSearchMenuClick = () => {
    // Set profile visibility state to true
    setIsSearchMenuOpen(true);
  };
  // End of function to toggle search menu

  // Function to handle input change
  const handleInputChange = (e) => {
    const filteredSub = subsidiaries?.filter((subsidiary) =>
      subsidiary?.title.toLowerCase()?.includes(e?.target?.value?.toLowerCase())
    );

    setSubsidiariesList(filteredSub);
  };
  // End of function to handle input change

  // Close search menu menu
  const closeSearchMenu = (e) => {
    // Prevent event bubbling
    e.stopPropagation();

    // Set search menu visibility state to true
    setIsSearchMenuOpen(false);
  };
  // End of function to close search menu

  // Close nav dropdown
  const closeNavDropdown = (e) => {
    // Prevent event bubbling
    e.stopPropagation();

    // Set search menu visibility state to true
    setIsNavDropdownOpen(false);
  };
  // End of function to close nav dropdown

  // Function to handle dropdown Item click
  const handleDropdownItemClick = (id) => {
    // Toggle nav dropdown
    // If the clicked item is the currently active item, close  the
    // navdropdown, else leave it open

    if (selectedNavItem?.id === id) {
      setIsNavDropdownOpen((prev) => !prev);
    } else {
      if (!isNavDropdownOpen) {
        setIsNavDropdownOpen(true);
      }
    }

    const clickedNavDropdown = navbarData?.find(
      (navbarDatum) => navbarDatum?.id === id
    );
    setSelectedNavItem(clickedNavDropdown);
  };
  // End of function to handle dropdown Item click

  //   Useffect to exit mobile screen mode
  useEffect(() => {
    // Initial check on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // Scrolling down - hide navbar
      setIsNavbarVisible(false);
    } else {
      // Scrolling up - show navbar
      setIsNavbarVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed top-0 z-[100] h-[65px] lg:h-[90px] w-full flex items-center justify-center border-b border-secondary transition-transform duration-300 ease-in-out ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        } ${nav === "transparent" ? "bg-transparent" : "bg-white"}`}
      >
        <div className="h-full app__container w-full bg-transparent px-5 lg:px-[48px] flex items-center justify-between ">
          {/* LHS (LOGO) */}
          <div className="flex  items-center gap-10">
            {/* LHS (LOGO) */}
            <Link to={"/"}>
              <img
                src={equiserveLogo}
                alt="Logo"
                className="w-[120px] xl:w-[140px]"
              />
            </Link>

            {/* MIDDLE  */}
            <div className="hidden lg:flex gap-[32px] ">
              {navbarData?.map(({ id, title, url, type, subsections }) => {
                if (type === "link") {
                  return (
                    <NavLink to={url} key={id}>
                      {({ isActive }) => (
                        <NavbarLinkItem
                          title={title}
                          url={url}
                          key={id}
                          isActive={isActive}
                        />
                      )}
                    </NavLink>
                  );
                } else if (type === "navDropdown") {
                  return (
                    <NavLink
                      key={id}
                      to={url}
                      onClick={(e) => e.preventDefault()}
                    >
                      {({ isActive }) => (
                        <NavbarLinkItem
                          title={title}
                          url={url}
                          key={id}
                          isActive={isActive}
                          handleClick={() => handleDropdownItemClick(id)}
                        />
                      )}
                    </NavLink>
                  );
                } else if (type === "newLink") {
                  return (
                    <NavLink
                      to={url}
                      key={id}
                      onClick={() => setIsNavDropdownOpen(false)}
                    >
                      {({ isActive }) => (
                        <NavbarLinkItem
                          title={title}
                          url={url}
                          key={id}
                          isActive={isActive}
                        />
                      )}
                    </NavLink>
                  );
                }
              })}
            </div>
          </div>

          {/* RHS */}
          <div className="hidden lg:flex gap-5">
            {/* <div
              className={`${
                isActive
                  ? "b-20-24-600"
                  : "text-secondary text-[16px] font-semibold"
              } hover:text-primary-110 gap-2 w-fit cursor-pointer flex items-center relative text-left transition-all duration-200 ease-linear group`}
            >
              <div className=""> Contact</div>

              <div
                className={`h-[2px] bg-primary-110 text-primary-110 w-[0px] group-hover:w-full rounded-[100px] absolute left-0 -bottom-[10px] transition-all duration-300 ease-linear`}
              ></div>
            </div> */}
            <NavLink to={"/contact"}>
              {({ isActive }) => (
                <NavbarLinkItem title={"Contact"} isActive={isActive} />
              )}
            </NavLink>{" "}
            <div className="relative">
              <div
                className="flex items-center group relative gap-2"
                onClick={handleSearchMenuClick}
              >
                <div
                  className={`text-secondary text-[16px] font-semibold group-hover:text-primary-110 w-fit cursor-pointer flex items-center relative text-left transition-all duration-200 ease-linear group`}
                >
                  <div className={`font-semibold`}>Operations</div>
                </div>
                <Icon
                  icon={"lets-icons:world-2-light"}
                  className="cursor-pointer text-secondary group-hover:text-primary-110 transition-all ease-in-out duration-300 w-6 h-6"
                />
                <div
                  className={`!h-[2px] bg-primary-110 text-primary-110 w-[0px] group-hover:w-full rounded-[100px] absolute left-0 -bottom-[10px] z-10 transition-all duration-300 ease-linear`}
                ></div>
              </div>

              <SearchMenu
                closeSearchMenu={(e) => closeSearchMenu(e)}
                isSearchMenuOpen={isSearchMenuOpen}
              >
                <div className="flex items-center justify-center w-full h-[300px]  flex-col gap-[1px] ">
                  {/* Top - */}
                  {/* <div className="w-full px-[14px] pt-4 pb-5 bg-white">
                    <div className="text-sm font-semibold !text-primary-110 leading-6">
                      Current Subsidiary
                    </div>
                    <div className="font-medium text-md  text-secondary flex mt-0">
                      <div className="flex gap-2 items-center">
                        <Icon icon="twemoji:flag-nigeria" className="w-5 h-5" />{" "}
                        <span>Nigeria - </span>
                      </div>
                      <div className="">&nbsp;Equiserve</div>
                    </div>
                  </div> */}

                  {/* Bottom */}
                  <div className="w-full flex flex-col bg-white flex-1  h-full px-[14px] pt-4 pb-5 overflow-auto">
                    {/* Search Input */}
                    <div className="mb-6 h-[44px] flex items-center justify-center px-4 gap-[10px] w-full focus-within:ring-primary ring-transparent ring-2 ring-offset-2   border border-neutral-20 rounded-[8px]">
                      <img src={searchNormal} alt="lens" className="w-5 h-5" />
                      <input
                        type="text"
                        placeholder={"Find Subsidiary"}
                        onChange={(e) => handleInputChange(e)}
                        className="h-full flex-1 text-sm text-gray-400 outline-none border-none bg-transparent"
                      />
                    </div>
                    <div className="overflow-auto h-[calc(100%-68px)]">
                      {subsidiariesList?.length > 0 ? (
                        subsidiariesList.map((subsidiary) => (
                          <FAQCard
                            key={subsidiary?.id}
                            icon={subsidiary?.icon}
                            subsidiary={subsidiary}
                            title={subsidiary?.title}
                            selectedItem={selectedItem}
                            handleToggleSection={handleToggleSection}
                            hasSubSections={subsidiary?.subsections}
                            subsections={subsidiary?.subsections}
                            id={subsidiary?.id}
                            url={subsidiary.url}
                          />
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                          <p className="text-gray-700 text-lg">
                            No matching items found
                          </p>
                          <p className="text-gray-400 text-sm">
                            Try adjusting your search term
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SearchMenu>
            </div>
          </div>
          {/* Nav Dropdown */}
          <NavDropdown
            isNavDropdownOpen={isNavDropdownOpen}
            closeNavDropdown={closeNavDropdown}
            style={"h-[380px] xl:h-[280px]"}
            title={selectedNavItem?.id}
            subsections={selectedNavItem?.subsections}
            setIsNavDropdownOpen={setIsNavDropdownOpen}
          />

          {/* HAMBURGER MENU */}
          <img
            src={analytics}
            alt="menu"
            className="lg:hidden cursor-pointer rotate-90 h-[30px]"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        handleInputChange={handleInputChange}
        subsidiariesList={subsidiariesList}
        toggleMenu={toggleMobileMenu}
        navbarData={navbarData}
      />
    </>
  );
};

export default Navbar;

// Navbar link item
const NavbarLinkItem = ({ title, url, isActive, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={`${
        isActive
          ? "text-primary-110 text-[16px] font-semibold"
          : "text-secondary text-[16px] font-semibold"
      } hover:text-primary-110 w-fit cursor-pointer flex items-center relative text-left transition-all duration-200 ease-linear group`}
    >
      <div className={`${isActive ? "font-semibold" : "font-semibold"} `}>
        {title}
      </div>
      <div
        className={`!h-[2px] bg-primary-110 text-primary-110 w-[0px] group-hover:w-full rounded-[100px] absolute left-0 -bottom-[10px] z-10 transition-all duration-300 ease-linear`}
      ></div>
    </div>
  );
};

const SearchMenu = ({ isSearchMenuOpen, closeSearchMenu, children }) => {
  return (
    <AnimatePresence>
      {isSearchMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed h-[calc(100vh+100px)] inset-0 bg-black bg-opacity-20 z-[1000]"
            onClick={closeSearchMenu}
          ></div>

          {/* Sliding Modal */}
          <motion.div
            className="z-[1000] absolute top-[60px] right-[0px] h-[370px] w-[320px] bg-transparent"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="h-full w-full">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
