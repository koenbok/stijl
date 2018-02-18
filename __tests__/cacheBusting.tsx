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
test("renders with clean glamor cache", () => {
  const styleA = Style({ background: "red" });
  const styleB = Style({ background: "green" });

  const treeA = renderer
    .create(
      <Template>
        <div css={styleA} />
      </Template>
    )
    .toJSON();

  expect(treeA).toMatchSnapshot();

  const treeB = renderer
    .create(
      <Template>
        <div css={styleB} />
      </Template>
    )
    .toJSON();

  expect(treeB).toMatchSnapshot();
});
