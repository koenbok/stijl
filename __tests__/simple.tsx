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

test("renders using spread", () => {
  const style = Style({ border: "1px solid red" });

  const tree = renderer
    .create(
      <Template>
        <div {...style.css()} />
      </Template>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders using css property", () => {
  const style = Style({ border: "1px solid red" });

  const tree = renderer
    .create(
      <Template>
        <div css={style} />
      </Template>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders hovers", () => {
  const style = Style({ border: "1px solid red" });

  style.hover({
    border: "1px solid green"
  });

  const tree = renderer
    .create(
      <Template>
        <div css={style} />
      </Template>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("update", () => {
  const style = Style({ border: "1px solid red" });

  style.update({ color: "red" });

  expect(style.style).toEqual({
    border: "1px solid red",
    color: "red"
  });

  expect(style).toBe(style);
});

test("merge", () => {
  const styleA = Style({ border: "1px solid red" });
  const styleB = styleA.merge({ color: "red" });

  expect(styleA.style).toEqual({
    border: "1px solid red"
  });

  expect(styleB.style).toEqual({
    border: "1px solid red",
    color: "red"
  });
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

test("::placeholder", () => {
  const styleA = Style({});
  styleA.placeholder({ color: "red" });

  expect(styleA.style).toEqual({
    "::placeholder": { color: "red" }
  });
});
