import React, { useState, Redirect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  DefaultButton,
  Dialog,
  DialogFooter,
  ChoiceGroup,
  Icon,
  Persona,
  PersonaSize,
  Link
} from "office-ui-fabric-react";
import style from "./about.module.css";
import { Text } from "office-ui-fabric-react/lib/Text";
import user from "./user.png";
import user2 from "../../../../images/user2.png";

/**
 * The About component displays information relating to the web application.
 *
 * @param {*} props
 */
const About = props => {
  const [hideDialog, setHideDialog] = useState(true);
  const [optionSelected, setOptionSelected] = useState("1");

  const closeHandler = () => setHideDialog(true);
  const openHandler = () => setHideDialog(false);
  const changeHandler = (event, option) => setOptionSelected(option.key);
  const logoutHandler = () => {
    localStorage.removeItem('JWT');
    closeHandler();
  }

  return (
    <div>
      <DefaultButton
        text="About"
        className={style.about}
        onClick={openHandler}
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={closeHandler}
        modalProps={{
          isBlocking: false,
          topOffsetFixed: true,
          isDarkOverlay: true
        }}
      >
        <ChoiceGroup
          label="Category"
          options={[
            {
              key: "1",
              iconProps: { iconName: "Info" },
              text: "Info",
              checked: optionSelected === "1"
            },
            {
              key: "2",
              iconProps: { iconName: "ContactInfo" },
              text: "Contact",
              checked: optionSelected === "2"
            },
            {
              key: "3",
              iconProps: { iconName: "OpenSource" },
              text: "Sources",
              checked: optionSelected === "3"
            }
          ]}
          onChange={changeHandler}
          required={false}
        />
        {optionSelected === "1" && (
          <>
            <Text block className={style.text}>
              COMP 4513
            </Text>
            <Text block>Mount Royal University</Text>
            <Icon iconName="MyMoviesTV" className={[style.icon, style.text]} />
            <Text block className={style.text}>
              Browse movies, ratings, and cast information.
            </Text>
            <Text block>A single-page web application.</Text>
            <Text block>Built with React.</Text>
            <br />
            <Link href="https://github.com/dutta64/4513-assign1">
              GitHub Repository
            </Link>
          </>
        )}
        {optionSelected === "2" && (
          <>
            <Persona
              size={PersonaSize.size56}
              imageAlt=""
              imageUrl={user}
              imageInitials={"RD"}
              text={"Raj Dutta"}
              secondaryText={"Site Author"}
              className={style.text}
            ></Persona>
            <Text block className={style.text}>
              Bachelor of Computer Info. Systems
            </Text>
            <Text block>Bachelor of Commerce</Text>
            <Text block>Junior Software Developer</Text>
            <br />
            <Link href="https://github.com/dutta64">
              https://github.com/dutta64
            </Link>
            <Persona
              size={PersonaSize.size56}
              imageAlt=""
              imageUrl={user2}
              imageInitials={"BM"}
              text={"Brett Miller"}
              secondaryText={"Site Author"}
              className={style.text}
            ></Persona>
            <Text block className={style.text}>
              Bachelor of Computer Info. Systems
              <br />
              Minor - Innovation & Entrepreneurship
              <br />
              Full Stack Developer
            </Text>
            <br />
            <Link href="http://www.llimb.com" target="_blank">
              www.LLimb.com
            </Link>
          </>
        )}
        {optionSelected === "3" && (
          <>
            <Text block className={style.text}>
              Third party sources and packages used:
            </Text>
            <br />
            <Link href="https://w.wallhaven.cc/full/0w/wallhaven-0w2de6.jpg">
              <Text block>Wallhaven Image</Text>
            </Link>
            <Link href="https://github.com/OfficeDev/office-ui-fabric-react">
              <Text block>Office UI Fabric</Text>
            </Link>
            <Link href="https://github.com/reactjs/react-transition-group">
              <Text block>React Transition Group</Text>
            </Link>
            <Link href="https://github.com/balloob/react-sidebar#readme">
              <Text block>React Sidebar</Text>
            </Link>
            <Link href="https://github.com/ReactTraining/react-router">
              <Text block>React Router</Text>
            </Link>
            <Link href="https://github.com/facebook/react">
              <Text block>React</Text>
            </Link>
          </>
        )}
        <DialogFooter>
          <DefaultButton onClick={closeHandler} text="Close" />
          <RouterLink to="/" onClick={logoutHandler}>
            <DefaultButton text="Logout" />
          </RouterLink>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default About;
