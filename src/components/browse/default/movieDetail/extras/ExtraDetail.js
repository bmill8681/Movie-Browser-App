// Frameworks
import React from "react";
import { IconButton, Text, getTheme } from "office-ui-fabric-react";
// Custom Components

// CSS
import styles from "../movieDetail.module.css";

const ExtraDetail = props => {
  const theme = getTheme();
  return (
    <div
      style={{
        padding: "10px",
        margin: "5px",
        border: `1px solid ${theme.palette.neutralLight}`,
        borderRadius: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div>
        <Text style={{ paddingRight: "10px" }}>{props.title}</Text>{" "}
        {props.title && `|`}
        <Text style={{ paddingLeft: "10px" }}>{props.text}</Text>{" "}
        {props.textB && `|`}
        {props.textB ? (
          <Text style={{ paddingLeft: "10px" }}>{props.textB}</Text>
        ) : (
          undefined
        )}
      </div>
      <div>
        {props.buttonIcon ? (
          <span style={{ float: "right", height: "100%", margin: "auto" }}>
            <IconButton
              iconProps={{ iconName: props.buttonIcon }}
              title="View Movie"
              ariaLabel="View Movie"
              checked={true}
              onClick={props.buttonClick}
              className={styles.viewButton}
            />
          </span>
        ) : (
          undefined
        )}
      </div>
    </div>
  );
};

export default ExtraDetail;
