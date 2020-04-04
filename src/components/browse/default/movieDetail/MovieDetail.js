// Frameworks
import React, { useState, useEffect, Redirect } from "react";
import {
  CommandBar,
  DefaultButton,
  getTheme,
  Label,
  Rating,
  Shimmer,
  Text
} from "office-ui-fabric-react";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";
// Modal
import LargePoster from "./LargePoster";

// Components - Left Side
import CastDetail from "./castDetail/CastDetail";
import MovieInfoItem from "./MovieInfoItem";
import MovieTag from "./MovieTag";
// Components - Right Side
import ExtraDetail from "./extras/ExtraDetail";
// CSS
import styles from "./movieDetail.module.css";

const openTab = {
  cast: "Cast",
  companies: "Companies",
  countries: "Countries",
  crew: "Crew"
};

/**
 * MovieDetail component is the parent for the Movie Details View.
 *
 * @param {*} props
 */
const MovieDetail = props => {
  const [tab, setTab] = useState(openTab.cast);
  const [extraDetails, setExtraDetails] = useState(null);
  const [extras, setExtras] = useState(null);
  const [castDetail, setCastDetail] = useState(null);
  const [hideDialog, setHideDialog] = useState(true);
  const [mobileCastView, setMobileCastView] = useState(true);
  const [auth, setAuth] = useState(true);

  const closeHandler = () => setHideDialog(true);
  const openHandler = () => setHideDialog(false);

  useEffect(() => {
    const fetchAndSetExtraDetails = async () => {
      // const URL = `https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies.php?id=${props.details.id}`;
      const URL = `https://movie-browser-api.herokuapp.com/api/movies/${props.details.id}`
      const opts = {
        method: 'GET',
        headers: {
          'authorization': localStorage.getItem('JWT')
        }
      }
      const response = await fetch(URL, opts);
      if (!response.status === 200) {
        setAuth(false);
      }
      const data = await response.json();
      console.log(data);
      setExtraDetails(data[0]);
    };

    fetchAndSetExtraDetails();
    console.log("Fetched `extraDetails` from API.");
  }, [props.details.id]);

  useEffect(() => {
    const formatExtraDetails = () => {
      if (!extraDetails || !extraDetails.production) return undefined;
      switch (tab) {
        case "Cast":
          if (!extraDetails.production.cast) return undefined;
          extraDetails.production.cast.sort((a, b) => {
            return a.order > b.order ? 1 : -1;
          });
          return extraDetails.production.cast.map((cur, i) => {
            return (
              <ExtraDetail
                title={cur.character}
                text={cur.name}
                buttonIcon="View"
                color=""
                buttonClick={() => {
                  setCastDetail(cur);
                  setMobileCastView(true);
                }}
                key={i}
              />
            );
          });
        case "Crew":
          if (!extraDetails.production.crew) return undefined;
          extraDetails.production.crew.sort((a, b) => {
            return a.department > b.department ? 1 : -1;
          });
          extraDetails.production.crew.sort((a, b) => {
            if (a.department === b.department) {
              return a.name > b.name ? 1 : -1;
            } else return 0;
          });
          return extraDetails.production.crew.map((cur, i) => (
            <ExtraDetail
              title={cur.department}
              text={cur.job}
              textB={cur.name}
              key={i}
            />
          ));
        case "Countries":
          if (!extraDetails.production.countries) return undefined;
          return extraDetails.production.countries.map((cur, i) => (
            <ExtraDetail text={cur.name} key={i} />
          ));
        case "Companies":
          if (!extraDetails.production.companies) return undefined;
          return extraDetails.production.companies.map((cur, i) => (
            <ExtraDetail text={cur.name} key={i} />
          ));
        default:
          return undefined;
      }
    };

    setExtras(formatExtraDetails());
  }, [tab, extraDetails]);

  const tabs = [
    {
      key: "Cast",
      text: "Cast",
      iconProps: { iconName: "Family" },
      onClick: () => setTab(openTab.cast)
    },
    {
      key: "Crew",
      text: "Crew",
      iconProps: { iconName: "Telemarketer" },
      onClick: () => setTab(openTab.crew)
    },
    {
      key: "Companies",
      text: "Companies",
      iconProps: { iconName: "EMI" },
      onClick: () => setTab(openTab.companies)
    },
    {
      key: "Countries",
      text: "Countries",
      iconProps: { iconName: "Globe2" },
      onClick: () => setTab(openTab.countries)
    }
  ];

  const farTabs = [
    {
      key: "Close",
      text: "",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Close",
      iconOnly: true,
      iconProps: { iconName: "Cancel" },
      onClick: () => props.selectMovie(null)
    }
  ];

  const mobileTabsLeft = [
    {
      key: "Movie | Cast Details",
      text: "Movie Details",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Movie Details",
      iconProps: { iconName: "Family" },
      onClick: () => setMobileCastView(true)
    },
    {
      key: "Production Details",
      text: "Production Details",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Production Details",
      iconProps: { iconName: "Telemarketer" },
      onClick: () => setMobileCastView(false)
    }
  ];
  const mobileTabsRight = [
    {
      key: "Close",
      text: "",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Close",
      iconOnly: true,
      iconProps: { iconName: "Cancel" },
      onClick: () => props.selectMovie(null)
    }
  ];

  const theme = getTheme();
  const posterSize = 342;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });

  const buttonStyle = {
    display: "flex",
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  };
  if (auth) {
    return (
      <>
        <LargePoster
          hideDialog={hideDialog}
          closeHandler={closeHandler}
          poster={props.details.poster}
        />
        <div className={styles.OuterWrapper}>
          <CommandBar
            items={mobileTabsLeft}
            farItems={mobileTabsRight}
            ariaLabel="Use left and right arrow keys to navigate between commands"
            style={{
              borderBottom: "1px solid #686b69"
            }}
            className={styles.mobileCommandBar}
          />
          <div className={styles.mobile}>
            <div
              style={!mobileCastView ? { display: "none" } : { display: "block" }}
            >
              {castDetail ? (
                <CastDetail
                  details={castDetail}
                  close={() => setCastDetail(null)}
                />
              ) : (
                  <div className={styles.MovieDetailsWrapper}>
                    <section className={styles.Poster}>
                      <img
                        src={`https://image.tmdb.org/t/p/w${posterSize}${props.details.poster}`}
                        alt=""
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start"
                        }}
                        onClick={openHandler}
                      />
                    </section>
                    <section className={styles.MovieDetails}>
                      <header style={{ padding: "5px" }}>
                        <Label
                          style={{
                            fontSize: FontSizes.size24,
                            color: theme.palette.neutralPrimaryAlt,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {`${
                            props.details.title
                            } (${props.details.release_date.substring(0, 4)})`}
                        </Label>
                        <Text
                          style={{
                            fontSize: FontSizes.size16,
                            color: theme.palette.neutralPrimaryAlt,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {props.details.tagline}
                        </Text>
                      </header>
                      <section className={styles.MovieTags}>
                        <MovieInfoItem title="Ratings">
                          <Rating
                            max={10}
                            rating={
                              Math.round(props.details.ratings.average * 2) / 2
                            }
                            readOnly={true}
                            ariaLabelFormat={"Select {0} of {1} stars"}
                            className={styles.rating}
                            styles={{
                              ratingStarBack: { color: "#4a4d4b" },
                              ratingStarFront: { color: "rgb(121, 121, 0)" }
                            }}
                            onClick={() =>
                              console.log(
                                Math.round(props.details.ratings.average * 2) / 2
                              )
                            }
                          />
                        </MovieInfoItem>
                      </section>
                      <section className={styles.MovieTags}>
                        <MovieInfoItem
                          title="Runtime"
                          text={`${props.details.runtime}m`}
                        />
                        <MovieInfoItem
                          title="Revenue"
                          text={formatter.format(props.details.revenue)}
                        />
                        <MovieInfoItem
                          title="Reviews"
                          text={props.details.ratings.count}
                        />
                        <MovieInfoItem
                          title="Popularity"
                          text={parseFloat(
                            props.details.ratings.popularity
                          ).toFixed(2)}
                        />
                      </section>
                      <section style={{ padding: "5px" }}>
                        <Text>{props.details.overview}</Text>
                      </section>
                      <section className={styles.MovieTags}>
                        <DefaultButton
                          text="IMDB"
                          href={`https://www.imdb.com/title/${props.details.imdb_id}`}
                          target="_blank"
                          style={buttonStyle}
                        />
                        <DefaultButton
                          iconProps={{ iconName: "HeartFill" }}
                          style={buttonStyle}
                          styles={{ icon: { color: "rgb(202, 97, 97)" } }}
                          onClick={() => props.addFavorite(props.details)}
                        />
                        <DefaultButton
                          text="TMDB"
                          href={`https://www.themoviedb.org/movie/${props.details.tmdb_id}`}
                          target="_blank"
                          style={buttonStyle}
                        />
                      </section>

                      <Label>Genres</Label>
                      {extraDetails ? (
                        undefined
                      ) : (
                          <Shimmer width="100%" height="50px" />
                        )}
                      <section
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap"
                        }}
                      >
                        {extraDetails && extraDetails.details.genres
                          ? extraDetails.details.genres.map((cur, i) => (
                            <MovieTag key={i} title={cur.name.toUpperCase()} />
                          ))
                          : undefined}
                      </section>

                      <Label>Keywords</Label>
                      {extraDetails ? (
                        undefined
                      ) : (
                          <Shimmer width="100%" height="50px" />
                        )}
                      <section
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap"
                        }}
                      >
                        {extraDetails && extraDetails.details.keywords
                          ? extraDetails.details.keywords.map((cur, i) => (
                            <MovieTag key={i} title={cur.name.toUpperCase()} />
                          ))
                          : undefined}
                      </section>
                    </section>
                  </div>
                )}
            </div>
            <div
              style={mobileCastView ? { display: "none" } : { display: "block" }}
            >
              <div className={styles.CastDetailsWrapper}>
                <header className={styles.CastTabs}>
                  <CommandBar
                    items={tabs}
                    ariaLabel="Use left and right arrow keys to navigate between commands"
                    style={{
                      borderBottom: "1px solid #686b69"
                    }}
                  />
                </header>
                <section
                  style={{
                    padding: "5px 0px",
                    maxHeight: "100%",
                    overflowY: "auto"
                  }}
                >
                  {extraDetails ? extras : <Shimmer width="100%" height="50px" />}
                </section>
              </div>
            </div>
          </div>
          <div className={styles.desktop}>
            {castDetail ? (
              <CastDetail
                details={castDetail}
                close={() => setCastDetail(null)}
              />
            ) : (
                <div className={styles.MovieDetailsWrapper}>
                  <section className={styles.Poster}>
                    <img
                      src={`https://image.tmdb.org/t/p/w${posterSize}${props.details.poster}`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start"
                      }}
                      onClick={openHandler}
                    />
                  </section>
                  <section className={styles.MovieDetails}>
                    <header style={{ padding: "5px" }}>
                      <Label
                        style={{
                          fontSize: FontSizes.size24,
                          color: theme.palette.neutralPrimaryAlt,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {`${
                          props.details.title
                          } (${props.details.release_date.substring(0, 4)})`}
                      </Label>
                      <Text
                        style={{
                          fontSize: FontSizes.size16,
                          color: theme.palette.neutralPrimaryAlt,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {props.details.tagline}
                      </Text>
                    </header>
                    <section className={styles.MovieTags}>
                      <MovieInfoItem title="Ratings">
                        <Rating
                          max={10}
                          rating={Math.round(props.details.ratings.average * 2) / 2}
                          readOnly={true}
                          ariaLabelFormat={"Select {0} of {1} stars"}
                          className={styles.rating}
                          styles={{
                            ratingStarBack: { color: "#4a4d4b" },
                            ratingStarFront: { color: "rgb(121, 121, 0)" }
                          }}
                          onClick={() =>
                            console.log(
                              Math.round(props.details.ratings.average * 2) / 2
                            )
                          }
                        />
                      </MovieInfoItem>
                    </section>
                    <section className={styles.MovieTags}>
                      <MovieInfoItem
                        title="Runtime"
                        text={`${props.details.runtime}m`}
                      />
                      <MovieInfoItem
                        title="Revenue"
                        text={formatter.format(props.details.revenue)}
                      />
                      <MovieInfoItem
                        title="Reviews"
                        text={props.details.ratings.count}
                      />
                      <MovieInfoItem
                        title="Popularity"
                        text={parseFloat(props.details.ratings.popularity).toFixed(
                          2
                        )}
                      />
                    </section>
                    <section style={{ padding: "5px" }}>
                      <Text>{props.details.overview}</Text>
                    </section>
                    <section className={styles.MovieTags}>
                      <DefaultButton
                        text="IMDB"
                        href={`https://www.imdb.com/title/${props.details.imdb_id}`}
                        target="_blank"
                        style={buttonStyle}
                      />
                      <DefaultButton
                        iconProps={{ iconName: "HeartFill" }}
                        style={buttonStyle}
                        styles={{ icon: { color: "rgb(202, 97, 97)" } }}
                        onClick={() => props.addFavorite(props.details)}
                      />
                      <DefaultButton
                        text="TMDB"
                        href={`https://www.themoviedb.org/movie/${props.details.tmdb_id}`}
                        target="_blank"
                        style={buttonStyle}
                      />
                    </section>

                    <Label>Genres</Label>
                    {extraDetails ? (
                      undefined
                    ) : (
                        <Shimmer width="100%" height="50px" />
                      )}
                    <section
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap"
                      }}
                    >
                      {extraDetails && extraDetails.details.genres
                        ? extraDetails.details.genres.map((cur, i) => (
                          <MovieTag key={i} title={cur.name.toUpperCase()} />
                        ))
                        : undefined}
                    </section>

                    <Label>Keywords</Label>
                    {extraDetails ? (
                      undefined
                    ) : (
                        <Shimmer width="100%" height="50px" />
                      )}
                    <section
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap"
                      }}
                    >
                      {extraDetails && extraDetails.details.keywords
                        ? extraDetails.details.keywords.map((cur, i) => (
                          <MovieTag key={i} title={cur.name.toUpperCase()} />
                        ))
                        : undefined}
                    </section>
                  </section>
                </div>
              )}
          </div>
          <div className={styles.CastDetailsWrapperDesktop}>
            <header className={styles.CastTabs}>
              <CommandBar
                items={tabs}
                farItems={farTabs}
                ariaLabel="Use left and right arrow keys to navigate between commands"
                style={{
                  borderBottom: "1px solid #686b69"
                }}
              />
            </header>
            <section
              style={{ padding: "5px 0px", maxHeight: "100%", overflowY: "auto" }}
            >
              {extraDetails ? extras : <Shimmer width="100%" height="50px" />}
            </section>
          </div>
        </div>
      </>
    )
  }
  else return (<Redirect to="/" />);
};

export default MovieDetail;
