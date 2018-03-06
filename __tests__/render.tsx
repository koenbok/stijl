import "jest";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as renderer from "react-test-renderer";
import { Style, Styling } from "../src/index";

const Wrapper = props => {
  return <div css={props.css}>{props.children}</div>;
};

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

test("Pass CSS down to children", () => {
  const style = Style({ border: "1px solid red" });

  const tree = renderer
    .create(
      <Template>
        <Wrapper css={style}>Hello</Wrapper>
      </Template>
    )
    .toJSON();

  const styleTag =
    tree.children[0].children[0].props.dangerouslySetInnerHTML.__html;

  expect(styleTag).not.toBe("");
});
