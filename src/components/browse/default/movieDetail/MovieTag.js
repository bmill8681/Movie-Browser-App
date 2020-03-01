import React from "react";
import { getTheme, Text } from "office-ui-fabric-react";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";

/**
 * MovieTag component represents the tag of a movie.
 * @param {*} props
 */
const MovieTag = props => {
  const theme = getTheme();

  const smallText = {
    fontSize: FontSizes.size14,
    color: theme.palette.neutralPrimaryAlt,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #f4ede0",
    borderRadius: "3px",
    margin: "5px",
    backgroundColor: theme.palette.neutralLight
  };

  return (
    <section style={mainStyle}>
      <Text style={smallText}>{props.title}</Text>
    </section>
  );
};

export default MovieTag;
