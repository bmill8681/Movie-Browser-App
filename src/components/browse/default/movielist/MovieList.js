// Framework
import React, { useState, useEffect } from "react";
import { pick } from "lodash";
import {
  buildColumns,
  Image,
  SelectionMode,
  ColumnActionsMode,
  IconButton,
  Rating,
  DetailsList,
  Shimmer,
  Stack
} from "office-ui-fabric-react";
import { Text } from "office-ui-fabric-react/lib/Text";

// CSS
import style from "./movielist.module.css";

const posterSize = 185;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

const extractYear = str => {
  return Number(str.substring(0, 4));
};

const createColumns = movies => {
  const columns = buildColumns(
    movies.map(m =>
      pick(m, [
        "poster",
        "title",
        "ratings",
        "release_date",
        "runtime",
        "revenue",
        "tagline"
      ])
    )
  );

  const columnWidth = 100;

  let column = columns.find(c => c.key === "poster");
  column.name = "";
  column.columnActionsMode = ColumnActionsMode.disabled;
  column.maxWidth = posterSize;

  column = columns.find(c => c.key === "title");
  column.styles = { root: { cursor: "pointer" } };
  column.isSorted = true;
  column.isSortedDescending = false;

  column = columns.find(c => c.key === "release_date");
  column.name = "year";
  column.maxWidth = columnWidth;
  column.styles = { root: { cursor: "pointer" } };

  column = columns.find(c => c.key === "runtime");
  column.maxWidth = columnWidth;
  column.styles = { root: { cursor: "pointer" } };

  column = columns.find(c => c.key === "revenue");
  column.maxWidth = columnWidth;
  column.styles = { root: { cursor: "pointer" } };

  column = columns.find(c => c.key === "ratings");
  column.name = "rating";
  column.maxWidth = columnWidth;
  column.styles = { root: { cursor: "pointer" } };

  column = columns.find(c => c.key === "tagline");
  column.columnActionsMode = ColumnActionsMode.disabled;
  column.isCollapsible = true;
  column.isMultiline = true;
  column.isPadded = true;

  columns.forEach(
    c => (c.name = c.name.charAt(0).toUpperCase() + c.name.substring(1))
  );

  return columns;
};

const sortMovieData = (movieData, fieldName, isSortedDescending) => {
  let copy = movieData.slice(0);

  const sortRatings = (m1, m2) =>
    (isSortedDescending
      ? m1[fieldName].average < m2[fieldName].average
      : m1[fieldName].average > m2[fieldName].average)
      ? 1
      : -1;

  const sortOther = (m1, m2) =>
    (isSortedDescending
      ? m1[fieldName] < m2[fieldName]
      : m1[fieldName] > m2[fieldName])
      ? 1
      : -1;

  fieldName === "ratings" ? copy.sort(sortRatings) : copy.sort(sortOther);

  return copy;
};

const sortColumns = (columns, key, isSortedDescending) => {
  return columns.map(column => {
    column.isSorted = column.key === key;

    if (column.isSorted) {
      column.isSortedDescending = isSortedDescending;
    }

    return column;
  });
};

const createShimmerBars = num => {
  const bars = [];

  for (let i = 0; i < num; i++) {
    bars.push(<Shimmer width="100%" key={"shimmer" + i} />);
  }

  return bars;
};

/**
 * MovieList component displays a list of fetched movie data from a public API.
 *
 * Movies can be clicked to view MovieDetail or to be added to Favorites.
 *
 * @param {*} param0
 */
const MovieList = ({ movieFilter, setActiveMovie, addFavorite }) => {
  const [movieData, setMovieData] = useState([]);
  const [filteredMovieData, setFilteredMovieData] = useState([]);
  const [columnData, setColumnData] = useState([]);

  useEffect(() => {
    const fetchAndSetMovieData = async () => {
      const URL =
        // "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?id=ALL";
        "https://movie-browser-api.herokuapp.com/api/movies"

      const fetchOptions = {
        method: 'POST',
        headers: {
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwNDQ4ZjUxOTUyNDc1NjI1ZGY5Mzk0YmRhOTkwNDkxMiIsImlhdCI6MTU4NTUwMDM2M30.ostbfvpMKsvHTmUbWeMtFx361Sj2JpJdd3G3YNTNflE'
        }
      }
      const response = await fetch(URL, fetchOptions);

      let movies = await response.json();
      movies = sortMovieData(movies, "title", false);

      localStorage.setItem("movies", JSON.stringify(movies));

      const columns = createColumns(movies);

      setMovieData(movies);
      setFilteredMovieData(movies);
      setColumnData(columns);
    };

    let movies = JSON.parse(localStorage.getItem("movies"));

    if (movies) {
      setMovieData(movies);
      setFilteredMovieData(movies);
      setColumnData(createColumns(movies));
    } else {
      fetchAndSetMovieData();
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const {
      title: filterTitle,
      year: filterYear,
      rating: filterRating
    } = movieFilter;

    const predicate = movie => {
      if (
        filterTitle &&
        filterTitle !== "" &&
        !movie.title.toLowerCase().includes(filterTitle.toLowerCase())
      ) {
        return false;
      }

      if (filterYear) {
        const year = extractYear(movie.release_date);

        if (filterYear.type === "before" && year > filterYear.min) {
          return false;
        } else if (filterYear.type === "after" && year < filterYear.min) {
          return false;
        } else if (
          filterYear.type === "between" &&
          (year < filterYear.min || year > filterYear.max)
        ) {
          return false;
        }
      }

      if (filterRating) {
        const rating = movie.ratings.average;

        if (filterRating.type === "above" && rating < filterRating.min) {
          return false;
        } else if (filterRating.type === "below" && rating > filterRating.min) {
          return false;
        } else if (
          filterRating.type === "between" &&
          (rating < filterRating.min || rating > filterRating.max)
        ) {
          return false;
        }
      }

      return true;
    };

    setFilteredMovieData(movieData.filter(predicate));
  }, [movieData, movieFilter]);

  const onRenderItemColumn = (movie, index, column) => {
    switch (column.key) {
      case "poster":
        return (
          <div className={style.posterContainer}>
            <Image
              src={`https://image.tmdb.org/t/p/w${posterSize}${
                movie[column.key]
                }`}
              alt={movie.title}
              title={movie.title}
              height={posterSize}
              onClick={() => setActiveMovie(movie)}
              className={[style.poster, style.clickable, style.grow]}
            />
            <IconButton
              iconProps={{ iconName: "View" }}
              title="View Movie"
              ariaLabel="View Movie"
              checked={true}
              onClick={() => setActiveMovie(movie)}
              className={style.viewButton}
            />
            <IconButton
              iconProps={{ iconName: "HeartFill" }}
              title="Favorite Movie"
              ariaLabel="Favorite Movie"
              checked={true}
              className={style.favButton}
              onClick={() => addFavorite(movie)}
            />
          </div>
        );
      case "title":
        return (
          <div className={style.titleContainer}>
            <Text
              className={[style.clickable, style.titleText]}
              onClick={() => setActiveMovie(movie)}
              variant={"large"}
            >
              {movie[column.key]}
            </Text>
            <Rating
              min={1}
              max={10}
              rating={Math.round(movie.ratings.average * 2) / 2}
              readOnly={true}
              ariaLabelFormat={"Select {0} of {1} stars"}
              className={style.rating}
              styles={{
                ratingStarBack: { color: "#4a4d4b" },
                ratingStarFront: { color: "rgb(121, 121, 0)" }
              }}
            />
          </div>
        );
      case "tagline":
        return <Text variant={"mediumPlus"}>{movie[column.key]}</Text>;
      case "runtime":
        return (
          <Text variant={"mediumPlus"} block>
            {movie[column.key]}
          </Text>
        );
      case "release_date":
        return (
          <Text variant={"mediumPlus"}>
            {movie[column.key].substring(0, 4)}
          </Text>
        );
      case "revenue":
        return (
          <Text variant={"mediumPlus"}>
            {formatter.format(movie[column.key])}
          </Text>
        );
      case "ratings":
        return <Text variant={"mediumPlus"}>{movie[column.key].average}</Text>;
      default:
        return "";
    }
  };

  const onColumnHeaderClick = (event, column) => {
    let isSortedDescending = column.isSorted
      ? !column.isSortedDescending
      : column.isSortedDescending;

    let sortedMovies = sortMovieData(
      filteredMovieData,
      column.fieldName,
      isSortedDescending
    );

    let sortedColumns = sortColumns(columnData, column.key, isSortedDescending);

    setFilteredMovieData(sortedMovies);
    setColumnData(sortedColumns);
  };

  return movieData.length > 0 ? (
    filteredMovieData.length > 0 ? (
      <DetailsList
        items={filteredMovieData}
        columns={columnData}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={onRenderItemColumn}
        onColumnHeaderClick={onColumnHeaderClick}
        ariaLabelForGrid="Movie details"
        listProps={{ usePageCache: true }}
      />
    ) : (
        <div className={style.notFound}>
          <Text variant={"xxLarge"}>No matching movies found.</Text>
        </div>
      )
  ) : (
      <div className={style.progressIndicator}>
        <Stack vertical tokens={{ childrenGap: 50 }}>
          {createShimmerBars(15)}
        </Stack>
      </div>
    );
};

export default MovieList;
