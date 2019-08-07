# 基于express与react的开发环境模板

## 2019-08-07
- 新增[@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties), 支持 `class` 中使用箭头函数  

```js
class HelloWorld extends Component {
  ...
  hello = () => {
    console.log(123)
  }
  ...
}
```

- 新增`babel-eslint`作为`standardjs` parser, 防止 `class` 中使用箭头函数导致报错  

```js
"standard": {
  "parser": "babel-eslint"
}
```
