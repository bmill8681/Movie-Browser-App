import React from "react";
import { getTheme, Text } from "office-ui-fabric-react";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";

/**
 * MovieInfoItem contains information about a movie.
 *
 * @param {*} props
 */
const MovieInfoItem = props => {
  const theme = getTheme();

  const smallText = {
    fontSize: FontSizes.size14,
    color: theme.palette.neutralPrimaryAlt,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    wordBreak: "none"
  };

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <section style={mainStyle}>
      {props.title ? <Text style={smallText}>{props.title}</Text> : undefined}
      {props.text ? <Text style={smallText}>{props.text}</Text> : undefined}
      {props.link ? (
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <Text>{props.linkLabel}</Text>
        </a>
      ) : (
        undefined
      )}
      {props.children}
    </section>
  );
};

export default MovieInfoItem;
