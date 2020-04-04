import React, { useState, useEffect } from "react";
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
  const url = "https://movie-browser-api.herokuapp.com/api";

  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [getFavorites, setGetFavorites] = useState(true);
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

  const [sampleFilter, setSampleFilter] = useState(null);
  const [sampleFilterURL, setSampleFilterURL] = useState({ url: "", opts: {} });

  useEffect(() => {
    async function filterTheMovies() {
      await filterMovies();
    }
    if (sampleFilter !== null) filterTheMovies();

  }, [sampleFilter]);

  const getSampleFilterYears = year => {
    switch (year.type) {
      case "before":
        return `0/${year.min}`
      case "after":
        return `${year.min}`
      case "between":
        return `${year.min}/${year.max}`
    }
  }

  const getSampleFilterRatings = rating => {
    switch (rating.type) {
      case "above":
        return `${rating.min}`
      case "below":
        return `0/${rating.min}`
      case "between":
        return `${rating.min}/${rating.max}`
    }
  }

  function filterMovies() {
    const opts = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        mode: "cors",
        'authorization': localStorage.getItem('JWT'),
      }
    }
    let filterURL;
    if (sampleFilter.year) {
      filterURL = `${url}/find/year/${getSampleFilterYears(sampleFilter.year)}`
    }
    if (sampleFilter.title) {
      filterURL = `${url}/find/title/${sampleFilter.title}`
    }
    if (sampleFilter.rating) {
      filterURL = `${url}/find/rating/${getSampleFilterRatings(sampleFilter.rating)}`
    }
    setSampleFilterURL({ url: filterURL, opts })
  }

  async function fetchFavorites() {
    let opts = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        mode: "cors",
        'authorization': localStorage.getItem('JWT'),
      }
    }
    await fetch(`${url}/favorites`, opts)
      .then(data => data.json())
      .then(response => {
        setFavorites(response.favorites);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    async function getFavs() {
      await fetchFavorites();
    }
    getFavs();
  }, []);

  const addFavorite = async (favorite) => {
    // TODO
    // Update this - should get the info from the API
    // setFavorites(favorites => {
    //   if (!favorites.some(movie => movie.id === favorite.id)) {
    //     return [...favorites, favorite];
    //   }

    //   return favorites;
    // });
    const opts = {
      method: "POST",
      body: JSON.stringify({ favorite: favorite.id }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        mode: "cors",
        'authorization': localStorage.getItem('JWT'),
      }
    }
    await fetch(url, opts)
      .then(data => data.json())
      .then(response => {
        console.log(response);
      });
    await fetchFavorites();
  };

  const removeFavorite = async favorite => {
    const opts = {
      method: "DELETE",
      body: JSON.stringify({ favorite: favorite.id }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        mode: "cors",
        'authorization': localStorage.getItem('JWT'),
      }
    }
    await fetch(url, opts)
      .then(data => data.json())
      .then(response => {
        if (response.success) {
          if (favorites.length === 0) {
            setFavoritesOpen(false);
          }
        }
        else console.error(response.message)
      });
    await fetchFavorites();

    // setFavorites(favorites => {
    //   const copy = favorites.filter(movie => movie.id !== favorite.id);
    //   if (copy.length === 0) {
    //     setFavoritesOpen(false);
    //   }
    //   return copy;
    // });
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
          <Filter setMovieFilter={setMovieFilter} setSampleFilter={setSampleFilter} searchByTitle={props.location.searchTitle}></Filter>
        </Panel>
        <Default
          sideBarOpen={sideBarOpen}
          setSideBarOpen={setSideBarOpen}
          addFavorite={addFavorite}
          movieFilter={movieFilter}
          activeMovie={activeMovie}
          setActiveMovie={setActiveMovie}
          searchByTitle={props.location.searchTitle}
          sampleFilterURL={sampleFilterURL}
        />
      </section>
    </section>
  );
};

export default Browse;
