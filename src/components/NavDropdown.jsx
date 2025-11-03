import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const NavDropdown = ({
  isNavDropdownOpen,
  closeNavDropdown,
  title,
  subsections,
  style,
  setIsNavDropdownOpen,
}) => {
  return (
    <AnimatePresence>
      {isNavDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-[90px] h-[calc(100vh+100px)] inset-0 bg-black bg-opacity-20 z-[1000]"
            onClick={closeNavDropdown}
          ></div>

          {/* Sliding Modal */}
          <motion.div
            className={`${style} bg-white flex justify-center z-[1000] fixed top-[90px] right-[0px] w-screen bg-transparent`}
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="h-full w-full p-10 app__container">
              <div className="flex justify-end">
                <Icon
                  onClick={closeNavDropdown}
                  icon={"si:close-line"}
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
              <div className="flex h-full">
                {subsections
                  .filter((sub) => sub && sub.title)
                  .map((sub, idx) => (
                    <SingleColumn
                      key={sub.title}
                      title={sub.title}
                      style={
                        idx === 0 ? "pr-6" : "px-6 border-l border-l-secondary"
                      }
                      link={sub.dropdownUrl}
                      content={sub.content}
                      services={sub.services}
                      isReadMore={sub.isReadMore}
                      showIcon={sub.showIcon}
                      icon={sub.icon}
                      subsection={sub}
                      setIsNavDropdownOpen={setIsNavDropdownOpen}
                    />
                  ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SingleColumn = ({
  title,
  services,
  style,
  link,
  content,
  subsection,
  setIsNavDropdownOpen,
  isReadMore,
  showIcon,
  icon,
}) => {
  return (
    <div className={`${style} flex-1 h-full`}>
      <div className="text-secondary text-[16px] font-semibold flex items-center ">
        {title}{" "}
        <span>{showIcon && <Icon icon={icon} className="w-5 h-5 ml-4" />}</span>
      </div>

      {/* List */}
      <div className="flex flex-col text-sm">
        {services?.map((service) => {
          return service?.isLink ? (
            <Link
              onClick={() => setIsNavDropdownOpen((prev) => !prev)}
              className="text-sm my-1 hover:text-primary-110 underline"
              to={service?.route}
              key={service?.title}
            >
              {service?.title}
            </Link>
          ) : (
            <div key={service?.title}>{service?.title}</div>
          );
        })}
      </div>

      {/* <!-- Title --> */}
      {!!link && (
        <Link
          onClick={() => setIsNavDropdownOpen((prev) => !prev)}
          state={subsection}
          to={link}
          className={`${
            isReadMore
              ? "hover:font-bold text-primary-110"
              : "text-lg hover:text-primary-110 text-secondary"
          }  w-fit mt-5 cursor-pointer transition-all ease-in-out duration-200   h-[56px] font-bold  mb-2 line-clamp-2`}
        >
          {isReadMore ? "Read More" : content}
        </Link>
      )}
    </div>
  );
};

export default NavDropdown;
