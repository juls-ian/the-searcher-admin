# Removed codes in the assets/utils/_spacing

## Spacing simple variables
```scss
$spacing-0: 0;
$spacing-1: 0.4rem; // 4px
$spacing-2: 0.8rem; // 8px
$spacing-3: 1.2rem; // 12px
$spacing-4: 1.6rem; // 16px
$spacing-5: 2rem; // 20px
$spacing-6: 2.4rem; // 24px
$spacing-7: 2.8rem; // 28 px
$spacing-8: 3.2rem; // 32px
$spacing-10: 4rem; // 40px
$spacing-12: 4.8rem; // 48px
$spacing-16: 6.4rem; // 64px
$spacing-20: 8rem; // 80px
$spacing-24: 9.6rem; // 96px
$spacing-32: 12.8rem; // 128px
```

## Loop for generating utility classes
```scss
/* 
Generate padding utilities
$key = the map key (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32)
$value = the corresponding value (0, 0.4rem, 0.8rem, 1.2rem, etc.)
*/

// Padding utilities
@each $key, $value in $spacers {
  .p-#{$key} {
    padding: $value !important;
  }
  .pt-#{$key} {
    padding-top: $value !important;
  }
  .pr-#{$key} {
    padding-right: $value !important;
  }
  .pb-#{$key} {
    padding-bottom: $value !important;
  }
  .pl-#{$key} {
    padding-left: $value !important;
  }
  .px-#{$key} {
    padding-left: $value !important;
    padding-right: $value !important;
  }
  .py-#{$key} {
    padding-top: $value !important;
    padding-bottom: $value !important;
  }

  // Negative padding utilities (useful for overlapping elements)
  @each $key, $value in $spacers {
    @if $key != 0 {
      // Skip negative zero
      .-p-#{$key} {
        margin: -$value !important;
      }
      .-pt-#{$key} {
        margin-top: -$value !important;
      }
      .-pr-#{$key} {
        margin-right: -$value !important;
      }
      .-pb-#{$key} {
        margin-bottom: -$value !important;
      }
      .-pl-#{$key} {
        margin-left: -$value !important;
      }
      .-px-#{$key} {
        margin-left: -$value !important;
        margin-right: -$value !important;
      }
      .-py-#{$key} {
        margin-top: -$value !important;
        margin-bottom: -$value !important;
      }
    }
  }
}

// Margin utilities
@each $key, $value in $spacers {
  .m-#{$key} {
    margin: $value !important;
  }
  .mt-#{$key} {
    margin-top: $value !important;
  }
  .mr-#{$key} {
    margin-right: $value !important;
  }
  .mb-#{$key} {
    margin-bottom: $value !important;
  }
  .ml-#{$key} {
    margin-left: $value !important;
  }
  .mx-#{$key} {
    margin-left: $value !important;
    margin-right: $value !important;
  }
  .my-#{$key} {
    margin-top: $value !important;
    margin-bottom: $value !important;
  }

  // Generate negative margin utilities (useful for overlapping elements)
  @each $key, $value in $spacers {
    @if $key != 0 {
      // Skip negative zero
      .-m-#{$key} {
        margin: -$value !important;
      }
      .-mt-#{$key} {
        margin-top: -$value !important;
      }
      .-mr-#{$key} {
        margin-right: -$value !important;
      }
      .-mb-#{$key} {
        margin-bottom: -$value !important;
      }
      .-ml-#{$key} {
        margin-left: -$value !important;
      }
      .-mx-#{$key} {
        margin-left: -$value !important;
        margin-right: -$value !important;
      }
      .-my-#{$key} {
        margin-top: -$value !important;
        margin-bottom: -$value !important;
      }
    }
  }
}
```



