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
      <body>{props.children}</body>a
    </html>
  );
};
test("renders :last-child", () => {
  const style = Style({ background: "red" });
  style.lastChild({ background: "green" });

  const tree = renderer
    .create(
      <Template>
        <div css={style} />
      </Template>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
