module.exports = {
  extends: "stylelint-config-recommended",
  plugins: ["stylelint-order"],
  rules: {
    "indentation": 2,
    "max-empty-lines": 1,
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-named": "never",
    "color-no-invalid-hex": true,

    "order/order": ["custom-properties", "declarations", "rules"],

    "comment-no-empty": true,

    "block-no-empty": true,

    "no-duplicate-selectors": true,

    "no-extra-semicolons": true,

    "shorthand-property-no-redundant-values": true,

    "number-leading-zero": "never",

    "length-zero-no-unit": true,

    "unit-case": "lower",
    "property-case": "lower",
    "value-keyword-case": "lower",
    "selector-pseudo-element-case": "lower",
    "selector-type-case": "lower",

    "declaration-colon-space-before": "never",
    "declaration-colon-space-after": "always",
    "declaration-block-trailing-semicolon": "always",
    "declaration-block-semicolon-newline-after": "always",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-single-line-max-declarations": 1,

    "block-closing-brace-newline-before": "always",
    "block-opening-brace-newline-after": "always",
    "block-opening-brace-space-before": "always",

    "selector-pseudo-element-colon-notation": "double",
    "selector-list-comma-newline-after": "always",

    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-range-operator-space-after": "always",
    "media-feature-range-operator-space-before": "always",

    "at-rule-no-unknown": null,
    "no-descending-specificity": null,

    "rule-empty-line-before": [
      "always",
      { except: ["after-single-line-comment", "first-nested"] }
    ],
  },
};
