import * as React from "react";
import { merge } from "lodash";
import { css as glamor, keyframes } from "glamor";

import { renderToString } from "react-dom/server";
import { renderStaticOptimized } from "glamor/server";

// TODO: Warn if there is a parent styling component through contexts
// TODO: Add cool types for media queries
// TODO: Add more psuedo css helpers

declare module "react" {
  interface HTMLAttributes<T> {
    css?: StylingRule;
  }

  interface SVGAttributes<T> {
    css?: StylingRule;
  }
}

const patchCreateElement = () => {
  const _createElement = React.createElement;

  const createElement = (...args) => {
    const props = Array.isArray(args) ? args[1] : args["props"];

    if (props && props.css && props.css instanceof StylingRule) {
      Object.assign(props, props.css.css());
      delete props["css"];
    }

    return _createElement.apply(this, args);
  };

  (React as any).createElement = createElement;
};

patchCreateElement();

export class StylingRule {
  private _style = {};

  constructor(css: React.CSSProperties) {
    this._style = css;
  }

  css() {
    return glamor(this._style) as any;
  }

  get style() {
    return this._style;
  }

  update(css: React.CSSProperties) {
    Object.assign(this._style, css);
  }

  copy() {
    return new StylingRule(this._style);
  }

  merge(style: React.CSSProperties | StylingRule) {
    if (style instanceof StylingRule) {
      style = style.style;
    }
    return new StylingRule(merge(this._style, style));
  }

  // Special selector helpers
  active(css: React.CSSProperties) {
    this._style[":active"] = css;
    return this;
  }

  after(css: React.CSSProperties) {
    this._style[":after"] = css;
    return this;
  }

  before(css: React.CSSProperties) {
    this._style[":before"] = css;
    return this;
  }

  checked(css: React.CSSProperties) {
    this._style[":checked"] = css;
    return this;
  }

  disabled(css: React.CSSProperties) {
    this._style[":disabled"] = css;
    return this;
  }

  firstChild(css: React.CSSProperties) {
    this._style[":first-child"] = css;
    return this;
  }

  focus(css: React.CSSProperties) {
    this._style[":focus"] = css;
    return this;
  }

  hover(css: React.CSSProperties) {
    this._style[":hover"] = css;
    return this;
  }

  lastChild(css: React.CSSProperties) {
    this._style[":last-child"] = css;
    return this;
  }

  mediaQuery(query: string, css: React.CSSProperties) {
    this._style[`@media only screen and (${query})`] = css;
    return this;
  }

  nthChild(pattern: string, css: React.CSSProperties) {
    this._style[`:nth-child(${pattern})`] = css;
    return this;
  }

  placeholder(css: React.CSSProperties) {
    this._style["::placeholder"] = css;
    return this;
  }

  visited(css: React.CSSProperties) {
    this._style[":visited"] = css;
    return this;
  }
}

export const Style = (css: React.CSSProperties) => new StylingRule(css);
export const Keyframes = (css: React.CSSProperties) => keyframes(css);

export const Styling = (props: { body: any }) => {
  let { html, css, ids } = renderStaticOptimized(() =>
    renderToString(props.body)
  );
  return React.createElement("style", {
    dangerouslySetInnerHTML: { __html: css }
  });
};
