export default {
    input: 'dist/index.js',
    output: 'dist/ng-alogy.min.js',
    sourcemap: false,
    output: {
      format: 'amd',
    },
    name: 'ng-alogy',
    globals: {
        'rxjs/Observable': 'Rx',
        'rxjs/ReplaySubject': 'Rx',
        'rxjs/add/operator/map': 'Rx.Observable.prototype',
        'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
        'rxjs/add/observable/fromEvent': 'Rx.Observable',
        'rxjs/add/observable/of': 'Rx.Observable'
    }
}
