import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { IoIosArrowDown } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { MdKeyboardArrowUp } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import SearchBar from "./SearchBar";

const nestedMenuItems = [
  {
    title: "Hero",
  },
  {
    title: "Features",
  },
  {
    title: "Testimonials",
  },
  {
    title: "Ecommerce",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setopenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = nestedMenuItems.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem>{title}</MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="paragraph" className="font-medium ">
            <ListItem
              className="flex  items-center gap-2 px-8 text-black  hover:bg-slate-100 hover:rounded-3xl"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Categories
              <IoIosArrowDown
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <IoIosArrowDown
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block">
          <Menu
            placement="right-start"
            allowHover
            offset={15}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between">
              <MenuItem>
                Figma
                <MdKeyboardArrowUp
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    isMenuOpen ? "rotate-90" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="rounded-xl">{renderItems}</MenuList>
          </Menu>
          <MenuItem>
            <Link to={"/category/sport"}>Sport</Link>
          </MenuItem>
          <MenuItem>
            <Link to={"/category/learning"}>Learning</Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <div className="block text-black lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between text-black">
              <MenuItem>
                Figma
                <MdKeyboardArrowUp
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    isMenuOpen ? "rotate-90" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="block rounded-xl lg:hidden">
              {renderItems}
            </MenuList>
          </Menu>
          <MenuItem>React</MenuItem>
          <MenuItem>TailwindCSS</MenuItem>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      <Link
        to="/"
        className="flex items-center gap-2 py-2  px-4 text-black font-medium hover:bg-slate-100 hover:rounded-3xl"
      >
        Home
      </Link>
      <Link
        to="about"
        className="flex items-center gap-2 py-2 px-4 text-black  font-medium hover:bg-slate-100 hover:rounded-3xl"
      >
        About
      </Link>
      <NavListMenu />
      <Link
        to="about"
        className="flex items-center gap-2 py-2 px-4 text-black font-medium hover:bg-slate-100 hover:rounded-3xl"
      >
        Contact
      </Link>
    </List>
  );
}

export default function NavigationbarWithDropdownMultilevelMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar
      className={`${
        scrolled ? "stick" : ""
      } mx-auto  px-4 py-2 bg-white rounded-none head`}
    >
      <div className="flex items-center justify-between w-11/12 mx-auto">
        <img src={logo} className=" w-36" alt="logo" />
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <SearchBar />
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <FaXmark className="h-6 w-6" strokeWidth={2} />
          ) : (
            <CiMenuFries className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
