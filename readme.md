<h1 align="center">De Stijl</h1>

<div align="center">
  An opinionated way to style React components.
</div>

<br />
<hr />

#### Overview

De Stijl is a very thin layer on top of Glamor to provide a preferred way of working with css in React. It scopes de-duplicates and prefixes css, and allows hovers, media queries and psuedo selectors.

#### Quick start

* `yarn add --dev destijl`
* `import { Style, Styling } from "destijl";`

Write inline styles using the `Style` function. You can optionally add hovers, media queries and psuedo css selectors. Then, use them in a React component. Every html tag now accepts a `css` property that you can use to set the style directly on any html element.

```tsx
const style = Style({ border: "1px solid red" });

style.hover({ border: "1px solid green" });

const tree = <div css={style} />;
```

Use the Styling tag in your html `head`, which generates the css for all the children.

```tsx
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
```

#### Why is it great?

* It provide a very natural way for designers to write css.
* It allows for hovers, media queries and psuedo selectors, unlike inline css.
* It relies on TypeScript types to assist with writing css.
* By relying on Glamor, it scopes, de-duplicates and prefixes css, avoiding many common errors.

#### Gotcha's

* Stijl monkey patches `React.createElement` to allow each html tag to use a convenience `css` property.
