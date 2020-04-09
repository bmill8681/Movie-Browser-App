import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import About from "./about/About";
import Profile from './profile/Profile';
import { Label, getTheme } from "office-ui-fabric-react";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";

/**
 * Header component contains the site logo and About component.
 * @param {*} props
 */
const Header = props => {
  const theme = getTheme();
  return (
    <section className={style.header}>
      <Link to="/">
        <Label
          style={{
            fontSize: FontSizes.size24,
            color: theme.palette.neutralPrimaryAlt,
            cursor: "pointer"
          }}
        >
          Movie Browser
        </Label>
      </Link>
      <section className={style.farButtons}>
        <Profile />
        <About />
      </section>
    </section>
  );
};

export default Header;
