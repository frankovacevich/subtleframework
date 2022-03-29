# subtleframework
A css and javascript framework for IoT front end.

## Build from source

```
browserify src/js/bundler.js -s Subtle -p tinyify -o dist/js/subtleframe.min.js
sass src/css/bundle.scss dist/css/subtleframe.min.css --style compressed
```

