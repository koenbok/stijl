import "jest";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as renderer from "react-test-renderer";
import { Style, Styling, Keyframes } from "../src/index";

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

test("renders media query", () => {
  const style = Style({ background: "green" });
  style.mediaQuery("maxWidth: 100px", {
    background: "red"
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
