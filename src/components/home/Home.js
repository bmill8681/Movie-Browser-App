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
      <Stack
        vertical
        tokens={{ childrenGap: 10 }}
        className={style.InnerWrapper}
      >
        <Label className={style.label}>Movie Browser</Label>

        {/**Home page search bar */}
        <SearchBox
          placeholder="Enter a movie title..."
          onSearch={value => setSearchTitle(value)}
          onChange={(event, value) => setSearchTitle(value)}
          value={searchTitle}
          className={style.searchBox}
        />
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          {/**Search button filters search based on search bar input */}
          <Link
            to={{
              pathname: "/browse",
              state: { searchTitle: searchTitle }
            }}
          >
            <DefaultButton text="Search" className={style.button} />
          </Link>

          {/**Browse all button */}
          <Link to="/browse">
            <DefaultButton text="Browse All" className={style.button} />
          </Link>
        </Stack>
      </Stack>
    </main>
  );
};

export default Home;