# Removed codes in the assets/utils/_functions

## Spacing function 
### 1.0: Deprecated version
```scss
@use 'spacing' as *;

@function spacing($key) {
  @return map-get($spacers, $key);
}

```
### 1.1: Only positive values
```ssss
@use 'sass:map';
@use 'spacing' as *;

@function spacing($key) {
  @return map.get($spacers, $key);
}
```


