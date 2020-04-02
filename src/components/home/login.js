import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "office-ui-fabric-react/lib/Label";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { DefaultButton, Stack } from "office-ui-fabric-react";
import style from "./home.module.css";

/**
 * Home Component contains a search bar to initiate movie browsing.
 * Filters search results based on input into search bar.
 *
 * @param {*} props
 */
const Home = props => {
    const [searchTitle, setSearchTitle] = useState("");

    return (
        <main className={style.OuterWrapper}>
            {/* Login detail stuff here  - store JWT in local storage*/}
        </main>
    );
};

export default Home;
