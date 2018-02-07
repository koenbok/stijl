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
