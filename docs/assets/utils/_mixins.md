# Removed codes in the assets/utils/_mixins

## Responsiveness mixin
### 1.0: Deprecated version
```scss
@use 'breakpoints' as bp;

// Mobile first
@mixin respond-to-mf($breakpoint) {
  @media (min-width: map-get(bp.$breakpoints, $breakpoint)) {
    @content;
  }
}

// Desktop first
@mixin respond-to-df($breakpoint) {
  @media (max-width: map-get(bp.$breakpoints, $breakpoint)) {
    @content;
  }
}
```