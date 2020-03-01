import React, { useState } from "react";
import style from "./favoriteItem.module.css";
import { Image } from "office-ui-fabric-react";
import { CSSTransition } from "react-transition-group";
import "./transitions.css";

/**
 * An individual Favorite movie poster.
 *
 * @param {*} param0
 */
const FavoriteItem = ({
  movie,
  posterSize,
  setActiveMovie,
  removeFavorite
}) => {
  const [hidden, setHidden] = useState(true);
  const [inProp, setInProp] = useState(true);

  return (
    <div className={style.favoriteItemContainer}>
      <CSSTransition
        unmountOnExit
        in={inProp}
        timeout={300}
        classNames="my-node"
      >
        <div>
          <div
            className={[
              style.close,
              hidden ? style.hidden : style.visible
            ].join(" ")}
            onClick={() => {
              setInProp(false);
              setTimeout(() => removeFavorite(movie), 300);
            }}
            onMouseOver={() => setHidden(false)}
          ></div>
          <Image
            src={`https://image.tmdb.org/t/p/w${posterSize}${movie.poster}`}
            alt={movie.title}
            title={movie.title}
            className={style.poster}
            onClick={() => setActiveMovie(movie)}
            onMouseOver={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default FavoriteItem;
