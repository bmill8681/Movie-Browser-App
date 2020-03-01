import React, { useState } from "react";
import style from "./browse.module.css";
import Header from "./header/Header";
import Favorites from "./favorites/Favorites";
import Default from "./default/Default";
import { Panel } from "office-ui-fabric-react";
import Filter from "./filter/Filter";

/**
 * Browse is the parent for Header, Favorites, and Default components.
 *
 * @param {*} props
 */
const Browse = props => {
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeMovie, setActiveMovie] = useState(null);
  const [movieFilter, setMovieFilter] = useState(() => ({
    title:
      props.location && props.location.state
        ? props.location.state.searchTitle
        : null,
    year: null,
    rating: null
  }));

  const addFavorite = favorite => {
    setFavorites(favorites => {
      if (!favorites.some(movie => movie.id === favorite.id)) {
        return [...favorites, favorite];
      }

      return favorites;
    });

    setFavoritesOpen(true);
  };

  const removeFavorite = favorite => {
    setFavorites(favorites => {
      const copy = favorites.filter(movie => movie.id !== favorite.id);
      if (copy.length === 0) {
        setFavoritesOpen(false);
      }
      return copy;
    });
  };

  const toggleFavorites = () => {
    setFavoritesOpen(!favoritesOpen);
  };

  const onDismiss = () => {
    setSideBarOpen(false);
  };

  return (
    <section
      className={favoritesOpen ? style.favoritesOpen : style.favoritesClosed}
    >
      <header>
        <Header />
        <Favorites
          favorites={favorites}
          removeFavorite={removeFavorite}
          toggleFavorites={toggleFavorites}
          favoritesOpen={favoritesOpen}
          setActiveMovie={setActiveMovie}
        />
      </header>
      <section className={style.BrowseContent}>
        <Panel
          headerText="Movie Filters"
          isOpen={sideBarOpen}
          onDismiss={onDismiss}
          isLightDismiss
          closeButtonAriaLabel="Close"
          overlayProps={{ className: { backgroundColor: "rgba(0,0,0,0.6)" } }}
        >
          <Filter setMovieFilter={setMovieFilter}></Filter>
        </Panel>
        <Default
          sideBarOpen={sideBarOpen}
          setSideBarOpen={setSideBarOpen}
          addFavorite={addFavorite}
          movieFilter={movieFilter}
          activeMovie={activeMovie}
          setActiveMovie={setActiveMovie}
        />
      </section>
    </section>
  );
};

export default Browse;
