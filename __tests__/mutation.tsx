import "jest";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as renderer from "react-test-renderer";
import { Style, Styling } from "../src/index";

const Template = props => {
  return (
    <html>
      <head>
        <Styling body={props.children} />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

test("merge with style object", () => {
  const styleA = Style({
    borderRadius: 4,
    fontWeight: 500,
    "screen and media(maxWidth: 100px)": {
      background: "green",
      padding: 10
    }
  });
  const styleB = {
    borderRadius: 6,
    fontFamily: "sans-serif",
    "screen and media(maxWidth: 100px)": {
      background: "red",
      fontWeight: 600
    }
  };

  const style = styleA.merge(styleB);

  const tree = renderer
    .create(
      <Template>
        <div css={style} />
      </Template>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("merge with Style class", () => {
  const styleA = Style({
    borderRadius: 4,
    fontWeight: 700,
    "screen and media(maxWidth: 100px)": {
      background: "green",
      padding: 10
    }
  });
  const styleB = Style({
    fontSize: 60,
    fontFamily: "Colfax",
    "screen and media(maxWidth: 200px)": {
      background: "red",
      fontWeight: 600
    }
  });

  const style = styleA.merge(styleB);

  const tree = renderer
    .create(
      <Template>
        <div css={style} />
      </Template>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// Update tests to use deep merge
test("update", () => {
  const style = Style({ border: "1px solid red" });

  style.update({ color: "red" });

  expect(style.style).toEqual({
    border: "1px solid red",
    color: "red"
  });

  expect(style).toBe(style);
});

test("copy", () => {
  const styleA = Style({ border: "1px solid red" });
  const styleB = styleA.copy();

  expect(styleA.style).toEqual({
    border: "1px solid red"
  });

  expect(styleB.style).toEqual({
    border: "1px solid red"
  });

  expect(styleA).not.toBe(styleB);
});
