import * as React from "react";
import { css as glamor } from "glamor";

import { renderToString } from "react-dom/server";
import { renderStatic } from "glamor/server";

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

  merge(css: React.CSSProperties) {
    return new StylingRule(Object.assign({}, this._style, css));
  }

  // Special selector helpers

  mediaQuery(query: string, css: React.CSSProperties) {
    this._style[`@media only screen and (${query})`] = css;
    return this;
  }

  hover(css: React.CSSProperties) {
    this._style[":hover"] = css;
    return this;
  }

  active(css: React.CSSProperties) {
    this._style[":active"] = css;
    return this;
  }

  placeholder(css: React.CSSProperties) {
    this._style[":placeholder"] = css;
    return this;
  }

  before(css: React.CSSProperties) {
    this._style[":before"] = css;
    return this;
  }
}

export const Style = (css: React.CSSProperties) => new StylingRule(css);

export const Styling = (props: { body: any }) => {
  let { html, css, ids } = renderStatic(() => renderToString(props.body));
  return React.createElement("style", {
    dangerouslySetInnerHTML: { __html: css }
  });
};
