import "jest";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as renderer from "react-test-renderer";
import { Style, Styling } from "../src/index";
import * as pretty from "pretty";

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

test("renders multiple styles", () => {
  const styleA = Style({ background: "red" });
  const styleB = Style({ background: "green" });

  const tree = renderer
    .create(<div css={[styleA, styleB, { color: "blue" }]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
