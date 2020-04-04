// Frameworks
import React, { useEffect } from "react";
import { DefaultButton } from "office-ui-fabric-react";

// Custom Components
import MovieList from "./movielist/MovieList";
import MovieDetail from "./movieDetail/MovieDetail";

// CSS/Style
import style from "./default.module.css";

/**
 * The Default component is the parent of MovieDetail and MovieList components.
 * Either component is rendered conditionally whether or not the user has selected a movie.
 *
 * @param {*} props
 */
const Default = props => {
  return (
    <main className={style.default}>
      <section
        className={
          props.activeMovie ? style.showMovieDetails : style.showMovieList
        }
      >
        {props.activeMovie ? (
          <MovieDetail
            details={props.activeMovie}
            selectMovie={props.setActiveMovie}
            addFavorite={props.addFavorite}
          />
        ) : (
            <section className={style.movieListContainer}>
              <DefaultButton
                text="Filter"
                onClick={() => props.setSideBarOpen(!props.sideBarOpen)}
                className={style.filterButton}
              />
              <MovieList
                setActiveMovie={props.setActiveMovie}
                addFavorite={props.addFavorite}
                movieFilter={props.movieFilter}
                searchByTitle={props.searchByTitle}
                sampleFilterURL={props.sampleFilterURL}
              />
            </section>
          )}
      </section>
    </main>
  );
};

export default Default;
