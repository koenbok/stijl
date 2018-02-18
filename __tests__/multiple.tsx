import "jest";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as renderer from "react-test-renderer";
import { Style, Styling } from "../src/index";

test("renders multiple styles", () => {
  const styleA = Style({ background: "red" });
  const styleB = Style({ background: "green" });

  const tree = renderer.create(<div css={[styleA, styleB]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
