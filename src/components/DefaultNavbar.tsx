"use client";

import { Navbar } from "flowbite-react";

export default function DefaultNavbar() {
  return (
    <Navbar fluid>
      <Navbar.Brand href="#"></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active href="#">
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
