import React from "react";
import { Dialog } from "office-ui-fabric-react";

/**
 * LargePoster component displays a poster image for a movie.
 *
 * @param {*} props
 */
const LargePoster = props => {
  return (
    <Dialog
      hidden={props.hideDialog}
      onDismiss={props.closeHandler}
      minWidth={300}
      maxWidth={"100%"}
      modalProps={{
        isBlocking: false,
        topOffsetFixed: true,
        isDarkOverlay: true,
        styles: { main: { maxWidth: "90%", height: "auto", padding: 20 } }
      }}
    >
      <br />
      <img
        src={`https://image.tmdb.org/t/p/w500${props.poster}`}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start"
        }}
      />
    </Dialog>
  );
};
export default LargePoster;
