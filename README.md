# project-pinhui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

节流：在规定的时间间隔内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
防抖：前面的所有触发都被取消，最后一次执行在 规定的时间之后才会触发，也就是如果连续快速触发，只会执行一次


三级联动路由跳转：
  1.router-link，当服务器返回数据之后，循环出很多的router-link组件，创建组件实例时，一瞬间创建很多的内存，会出现卡顿的现象。
  2.给每个a标签绑定事件，会导致有很多的回调事件，一瞬间创建很多的回调事件，会出现卡顿的现象。
  3.编程式导航 + 事件委派
    给每个a标签加上自定义属性
