(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '@iosio/redux-assist', './MainComponent', 'react-redux', 'react-jss'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('@iosio/redux-assist'), require('./MainComponent'), require('react-redux'), require('react-jss'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reduxAssist, global.MainComponent, global.reactRedux, global.reactJss);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _reduxAssist, _MainComponent, _reactRedux, _reactJss) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Capsule = exports.CapsuleProvider = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _reactJss2 = _interopRequireDefault(_reactJss);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _jsxFileName = 'src/index.js';

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _ref = new _reduxAssist.StoreModule(),
        reduxAssist = _ref.reduxAssist,
        store = _ref.store;

    var _provide_to_props = {};
    var _provide_to_logic = {};

    var CapsuleProvider = exports.CapsuleProvider = function CapsuleProvider(_ref2) {
        var provide_to_logic = _ref2.provide_to_logic,
            provide_to_props = _ref2.provide_to_props,
            theme = _ref2.theme,
            global_styles = _ref2.global_styles;


        _provide_to_props = provide_to_props;
        _provide_to_logic = provide_to_logic;

        return function (ComposedComponent) {
            console.log('returning Provider _provide_to_props: ', _provide_to_props, ' _provide_to_logic: ', _provide_to_logic);
            return function (_React$PureComponent) {
                _inherits(WithProvider, _React$PureComponent);

                function WithProvider(props) {
                    _classCallCheck(this, WithProvider);

                    var _this = _possibleConstructorReturn(this, (WithProvider.__proto__ || Object.getPrototypeOf(WithProvider)).call(this, props));

                    console.log('provider being constructed');
                    return _this;
                }

                _createClass(WithProvider, [{
                    key: 'render',
                    value: function render() {
                        var props = this.props;
                        return _react2.default.createElement(
                            _MainComponent.MainComponent,
                            Object.assign({}, props, { theme: theme, global_styles: global_styles, store: store, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 28
                                },
                                __self: this
                            }),
                            _react2.default.createElement(ComposedComponent, Object.assign({}, props, {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 29
                                },
                                __self: this
                            }))
                        );
                    }
                }]);

                return WithProvider;
            }(_react2.default.PureComponent);
        };
    };

    var Capsule = exports.Capsule = function Capsule(_ref3) {
        var styles = _ref3.styles,
            reducer_name = _ref3.reducer_name,
            initial_state = _ref3.initial_state,
            logic = _ref3.logic,
            mapStateToProps = _ref3.mapStateToProps;


        var state = reducer_name && initial_state ? reduxAssist(reducer_name, initial_state) : null;

        var getLogic = function getLogic() {
            return logic && logic(Object.assign({ state: state, store: store }, _provide_to_logic));
        };

        return function (ComposedComponent) {

            if (ComposedComponent && styles) {
                //wrap the component with jss styles
                ComposedComponent = (0, _reactJss2.default)(styles)(ComposedComponent);
            }
            if (ComposedComponent) {
                var WithCapsule = function (_React$Component) {
                    _inherits(WithCapsule, _React$Component);

                    function WithCapsule() {
                        _classCallCheck(this, WithCapsule);

                        var _this2 = _possibleConstructorReturn(this, (WithCapsule.__proto__ || Object.getPrototypeOf(WithCapsule)).call(this));

                        console.log('capsule being constructed');
                        return _this2;
                    }

                    _createClass(WithCapsule, [{
                        key: 'render',
                        value: function render() {
                            var props = this.props;
                            return (
                                //pass the logic and any other provided props
                                _react2.default.createElement(ComposedComponent, Object.assign({}, props, {
                                    logic: getLogic()
                                }, _provide_to_props, {
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 63
                                    },
                                    __self: this
                                }))
                            );
                        }
                    }]);

                    return WithCapsule;
                }(_react2.default.Component);
                // mapStateToProps


                return (0, _reactRedux.connect)(mapStateToProps, null)(WithCapsule);
            } else {
                return getLogic();
            }
        };
    };
});