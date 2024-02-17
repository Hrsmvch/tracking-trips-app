import React from "react";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import NavLinks from "./NavLinks";
import NavigationContainer from "../Containers/NavigationContainer";

export default function Navigation() {
  return (
    <NavigationContainer>
      <NavLinks />
      <AuthLinks />
    </NavigationContainer>
  );
}
