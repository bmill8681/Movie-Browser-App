import React, { useState } from "react";
import style from "./filter.module.css";
import { FontSizes } from "@uifabric/fluent-theme/lib/fluent/FluentType";
import { Label } from "office-ui-fabric-react/lib/Label";
import { getTheme } from "office-ui-fabric-react/lib/Styling";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { ChoiceGroup } from "office-ui-fabric-react/lib/ChoiceGroup";
import { SpinButton } from "office-ui-fabric-react/lib/SpinButton";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { DefaultButton } from "office-ui-fabric-react";

const maxYear = new Date().getFullYear();
const minYear = maxYear - 100;
const minRating = 0;
const maxRating = 10;

const dropDownOptionsYear = [
  { key: "before", text: "Before" },
  { key: "after", text: "After" }
];

const dropDownOptionsRating = [
  { key: "above", text: "Above" },
  { key: "below", text: "Below" }
];

const yearValiateHandler = (str, val, func) => {
  if (!Number(str) || str < minYear || str > maxYear) {
    func(val);
    return val;
  }

  func(+str);
  return +str;
};

const ratingValidateHandler = (str, val, func) => {
  let float = parseFloat(str);

  if (isNaN(float) || float < minRating || float > maxRating) {
    func(val);
    return val;
  }

  func(float);
  return float;
};

/**
 * The Filter component is used to filter the movies displayed in MovieList.
 * A filter object is generated based on user input and passed to consumers via callback and props.
 *
 * @param {*} props
 */
const Filter = props => {
  const [filterTitle, setFilterTitle] = useState("");

  const [choiceGroupYear, setChoiceGroupYear] = useState("beforeAfter");
  const [choiceGroupRating, setChoiceGroupRating] = useState("aboveBelow");

  const [dropDownOptionYear, setDropDownOptionYear] = useState(
    dropDownOptionsYear[0]
  );
  const [dropDownOptionRating, setDropDownOptionRating] = useState(
    dropDownOptionsRating[0]
  );

  const [beforeAfterYear, setBeforeAfterYear] = useState(maxYear);
  const [aboveBelowRating, setAboveBelowRating] = useState(minRating);

  const [betweenMinYear, setBetweenMinYear] = useState(minYear);
  const [betweenMaxYear, setBetweenMaxYear] = useState(maxYear);

  const [betweenMinRating, setBetweenMinRating] = useState(minRating);
  const [betweenMaxRating, setBetweenMaxRating] = useState(maxRating);

  const theme = getTheme();

  const filterYearOptions = [
    {
      key: "beforeAfter",
      text: "Before or After",
      onRenderField: (props, render) => (
        <div className={style.choiceContainer}>
          {render(props)}
          <Dropdown
            selectedKey={
              dropDownOptionYear ? dropDownOptionYear.key : undefined
            }
            options={dropDownOptionsYear}
            onChange={(event, item) => setDropDownOptionYear(item)}
          />
          <SpinButton
            value={beforeAfterYear}
            max={maxYear}
            min={minYear}
            step={1}
            onIncrement={str =>
              str >= maxYear
                ? setBeforeAfterYear(+str)
                : setBeforeAfterYear(++str)
            }
            onDecrement={str =>
              str <= minYear
                ? setBeforeAfterYear(+str)
                : setBeforeAfterYear(--str)
            }
            onValidate={str =>
              yearValiateHandler(str, maxYear, setBeforeAfterYear)
            }
          />
        </div>
      )
    },
    {
      key: "between",
      text: "Between",
      onRenderField: (props, render) => (
        <div className={style.choiceContainer}>
          {render(props)}
          <SpinButton
            value={betweenMinYear}
            max={maxYear}
            min={minYear}
            step={1}
            onIncrement={str =>
              str >= maxYear
                ? setBetweenMinYear(+str)
                : setBetweenMinYear(++str)
            }
            onDecrement={str =>
              str <= minYear
                ? setBetweenMinYear(+str)
                : setBetweenMinYear(--str)
            }
            onValidate={str =>
              yearValiateHandler(str, minYear, setBetweenMinYear)
            }
          />
          <SpinButton
            value={betweenMaxYear}
            max={maxYear}
            min={minYear}
            step={1}
            onIncrement={str =>
              str >= maxYear
                ? setBetweenMaxYear(+str)
                : setBetweenMaxYear(++str)
            }
            onDecrement={str =>
              str <= minYear
                ? setBetweenMaxYear(+str)
                : setBetweenMaxYear(--str)
            }
            onValidate={str =>
              yearValiateHandler(str, maxYear, setBetweenMaxYear)
            }
          />
        </div>
      )
    }
  ];

  const filterRatingOptions = [
    {
      key: "aboveBelow",
      text: "Above or Below",
      onRenderField: (props, render) => (
        <div className={style.choiceContainer}>
          {render(props)}
          <Dropdown
            selectedKey={
              dropDownOptionRating ? dropDownOptionRating.key : undefined
            }
            options={dropDownOptionsRating}
            onChange={(event, item) => setDropDownOptionRating(item)}
          />
          <SpinButton
            value={aboveBelowRating}
            min={minRating}
            max={maxRating}
            step={0.1}
            precision={1}
            onIncrement={str =>
              str >= maxRating
                ? setAboveBelowRating(+str)
                : setAboveBelowRating((+str + 0.1).toFixed(1))
            }
            onDecrement={str =>
              str <= minRating
                ? setAboveBelowRating(+str)
                : setAboveBelowRating((+str - 0.1).toFixed(1))
            }
            onValidate={str =>
              ratingValidateHandler(str, minRating, setAboveBelowRating)
            }
          />
        </div>
      )
    },
    {
      key: "between",
      text: "Between",
      onRenderField: (props, render) => (
        <div className={style.choiceContainer}>
          {render(props)}
          <SpinButton
            value={betweenMinRating}
            min={minRating}
            max={maxRating}
            step={0.1}
            precision={1}
            onIncrement={str =>
              str >= maxRating
                ? setBetweenMinRating(+str)
                : setBetweenMinRating((+str + 0.1).toFixed(1))
            }
            onDecrement={str =>
              str <= minRating
                ? setBetweenMinRating(+str)
                : setBetweenMinRating((+str - 0.1).toFixed(1))
            }
            onValidate={str =>
              ratingValidateHandler(str, minRating, setBetweenMinRating)
            }
          />
          <SpinButton
            value={betweenMaxRating}
            min={minRating}
            max={maxRating}
            step={0.1}
            precision={1}
            onIncrement={str =>
              str >= maxRating
                ? setBetweenMaxRating(+str)
                : setBetweenMaxRating((+str + 0.1).toFixed(1))
            }
            onDecrement={str =>
              str <= minRating
                ? setBetweenMaxRating(+str)
                : setBetweenMaxRating((+str - 0.1).toFixed(1))
            }
            onValidate={str =>
              ratingValidateHandler(str, maxRating, setBetweenMaxRating)
            }
          />
        </div>
      )
    }
  ];

  const filterHandler = () => {
    props.setMovieFilter(createFilter());
  };

  const resetHandler = () => {
    setFilterTitle("");

    setChoiceGroupYear("beforeAfter");
    setDropDownOptionYear(dropDownOptionsYear[0]);
    setBeforeAfterYear(maxYear);
    setBetweenMinYear(minYear);
    setBetweenMaxYear(maxYear);

    setChoiceGroupRating("aboveBelow");
    setDropDownOptionRating(dropDownOptionsRating[0]);
    setAboveBelowRating(minRating);
    setBetweenMinRating(minRating);
    setBetweenMaxRating(maxRating);

    props.setMovieFilter({ title: null, year: null, rating: null });
  };

  const createFilter = () => {
    return {
      title: filterTitle,
      year: {
        type:
          choiceGroupYear === "beforeAfter"
            ? dropDownOptionYear.key
            : "between",
        min:
          choiceGroupYear === "beforeAfter" ? beforeAfterYear : betweenMinYear,
        max: choiceGroupYear === "beforeAfter" ? null : betweenMaxYear
      },
      rating: {
        type:
          choiceGroupRating === "aboveBelow"
            ? dropDownOptionRating.key
            : "between",
        min:
          choiceGroupRating === "aboveBelow"
            ? aboveBelowRating
            : betweenMinRating,
        max: choiceGroupRating === "aboveBelow" ? null : betweenMaxRating
      }
    };
  };

  return (
    <form className={style.movieFilter}>
      <Label
        style={{
          fontSize: FontSizes.size14,
          color: theme.palette.neutralPrimaryAlt
        }}
      >
        Title
      </Label>
      <SearchBox
        placeholder="Enter title..."
        onSearch={value => {
          setFilterTitle(value);
          filterHandler();
        }}
        onChange={(event, value) => setFilterTitle(value)}
        value={filterTitle}
        iconProps={{ iconName: "Filter" }}
      />
      <ChoiceGroup
        label="Year"
        selectedKey={choiceGroupYear}
        options={filterYearOptions}
        onChange={(event, option) => setChoiceGroupYear(option.key)}
      />
      <ChoiceGroup
        label="Rating"
        selectedKey={choiceGroupRating}
        options={filterRatingOptions}
        onChange={(event, option) => setChoiceGroupRating(option.key)}
      />
      <div className={style.buttonContainer}>
        <DefaultButton text="Apply" onClick={filterHandler} />
        <DefaultButton text="Reset" onClick={resetHandler} />
      </div>
    </form>
  );
};

export default Filter;
