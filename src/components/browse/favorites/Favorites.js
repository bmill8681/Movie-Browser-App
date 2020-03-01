import React from "react";
import style from "./favorites.module.css";
import { Icon, Text } from "office-ui-fabric-react";
import FavoriteItem from "./favoriteItem/FavoriteItem";

const posterSize = 92;

/**
 * Favorites component displays favorited movie posters.
 * Clicking a poster will display the MovieDetail for that movie.
 *
 * @param {*} param0
 */
const Favorites = ({
  favorites,
  removeFavorite,
  toggleFavorites,
  favoritesOpen,
  setActiveMovie
}) => {
  return (
    <>
      <section
        className={favoritesOpen ? style.favoritesOpen : style.favoritesClosed}
      >
        <div className={style.scrollContainer}>
          {favorites.length > 0 ? (
            favorites.map((movie, i) => (
              <FavoriteItem
                movie={movie}
                posterSize={posterSize}
                key={movie.id + i}
                setActiveMovie={setActiveMovie}
                removeFavorite={removeFavorite}
              />
            ))
          ) : (
            <Text variant={"xxLarge"} className={style.missing}>
              How can you have any pudding if you don't eat yer meat?
            </Text>
          )}
        </div>
      </section>
      <div className={style.favoritesToggle} onClick={() => toggleFavorites()}>
        <Icon
          iconName="HeartFill"
          className={style.icon}
          styles={{ root: { color: "rgb(202, 97, 97)" } }}
        />
      </div>
    </>
  );
};

export default Favorites;
