// Frameworks
import React, { useState, useEffect } from "react";
import {
  CommandBar,
  DefaultButton,
  Label,
  Shimmer,
  Text,
  getTheme
} from "office-ui-fabric-react";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";
// Custom Componenets

// CSS
import styles from "../movieDetail.module.css";
const buttonStyle = {
  display: "flex",
  width: "30%",
  justifyContent: "center",
  alignItems: "center"
};

const CastDetail = props => {
  let imdbUrl = "https://www.imdb.com/name/";
  let posterUrl = "https://image.tmdb.org/t/p/w185";
  const [loading, setLoading] = useState(true);
  const [castDetails, setCastDetails] = useState(null);
  const theme = getTheme();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/person/${props.details.id}?api_key=15a5193e81432545bde1dbc9f37db644`;
    setLoading(true);
    setCastDetails(null);
    fetch(url)
      .then(data => data.json())
      .then(data => {
        setCastDetails(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [props.details]);

  const farTabs = [
    {
      key: "Close",
      text: "",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Close",
      iconOnly: true,
      iconProps: { iconName: "Cancel" },
      onClick: () => props.close()
    }
  ];

  return (
    <div className={styles.CastDetailsWrapper}>
      <CommandBar
        farItems={farTabs}
        ariaLabel="Use left and right arrow keys to navigate between commands"
        style={{
          borderBottom: "1px solid #686b69"
        }}
      />
      {loading ? (
        <Shimmer />
      ) : (
        <div className={styles.MovieDetailsWrapper}>
          <section className={styles.Poster}>
            {castDetails.profile_path ? (
              <img
                src={`${posterUrl}${castDetails.profile_path}`}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              />
            ) : (
              <Text>No Photo Available</Text>
            )}
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
                {castDetails.name}
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
                {`DOB: ${
                  castDetails.birthday ? castDetails.birthday : "Unknown!"
                }`}
              </Text>
              <Text
                style={{
                  fontSize: FontSizes.size16,
                  color: theme.palette.neutralPrimaryAlt,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {castDetails.place_of_birth
                  ? castDetails.place_of_birth
                  : undefined}
              </Text>
            </header>
            <section className={styles.MovieTags}>
              <DefaultButton
                text="IMDB"
                href={`${imdbUrl}${castDetails.imdb_id}`}
                target="_blank"
                style={buttonStyle}
              />
            </section>
            <section style={{ padding: "5px" }}>
              <Label>Biography: </Label>
              <Text>
                {castDetails.biography ? castDetails.biography : "Unavailable"}
              </Text>
            </section>
          </section>
        </div>
      )}
    </div>
  );
};

export default CastDetail;
