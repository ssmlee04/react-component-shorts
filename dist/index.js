"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NumberOfEmployees = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactChartjs = require("react-chartjs-2");

var _reactCopyToClipboard = require("react-copy-to-clipboard");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _dayjsPluginUtc = _interopRequireDefault(require("dayjs-plugin-utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

_dayjs["default"].extend(_dayjsPluginUtc["default"]);

var NumberOfEmployees =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberOfEmployees, _React$Component);

  function NumberOfEmployees(props) {
    var _this;

    _classCallCheck(this, NumberOfEmployees);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberOfEmployees).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(NumberOfEmployees, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var profile = this.props.profile;
      if (!profile) return true;
      if (nextState.copied) return true;
      if (profile.ticker !== nextProps.profile.ticker) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          profile = _this$props.profile,
          _this$props$imgProp = _this$props.imgProp,
          imgProp = _this$props$imgProp === void 0 ? 'shorts_img' : _this$props$imgProp;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 8
          }
        }, "Not available at this time... ");
      }

      if (profile[imgProp] && profile[imgProp].url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-8' : 'react-components-show-url btn btn-sm btn-warning font-8';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " Shorts Analysis"),
          src: profile[imgProp].url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile[imgProp].url || '',
          onCopy: function onCopy() {
            return _this2.setState({
              copied: true
            });
          }
        }, _react["default"].createElement("button", {
          className: btnClass,
          value: btnText
        }, btnText)));
      }

      if (!profile || !profile.numbers || !profile.numbers.short_pct_float_ts) return null;
      if (!profile || !profile.numbers || !profile.numbers.shares_short_ts) return null;
      var short_pct_float_ts = profile.numbers.short_pct_float_ts || [];
      var shares_short_ts = profile.numbers.shares_short_ts || [];
      var short_pct_float = short_pct_float_ts.map(function (d) {
        return d.v;
      });
      var shares_short = shares_short_ts.map(function (d) {
        return d.v;
      });
      var data = {
        labels: short_pct_float_ts.map(function (d) {
          return _dayjs["default"].utc(d.ts).format('YYYYMM');
        }),
        datasets: [{
          yAxisID: '1',
          type: 'line',
          fill: false,
          backgroundColor: 'crimson',
          borderColor: 'crimson',
          lineTension: 0.3,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 2,
          data: short_pct_float,
          label: 'Short Percent Float'
        }, {
          yAxisID: '2',
          type: 'bar',
          fill: false,
          backgroundColor: 'lightgray',
          borderColor: 'lightgray',
          lineTension: 0.3,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointRadius: 2,
          pointHoverRadius: 2,
          data: shares_short,
          label: 'Shares Short'
        }]
      };
      var options = {
        legend: {
          labels: {
            fontSize: 8,
            boxWidth: 10
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 8
            },
            barPercentage: 0.4
          }],
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: '1',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            ticks: {
              fontColor: 'crimson',
              maxTicksLimit: 6,
              stepSize: 0.01,
              fontSize: 8,
              callback: function callback(label, index, labels) {
                return Math.floor(label);
              }
            }
          }, {
            type: 'linear',
            display: true,
            position: 'right',
            id: '2',
            labels: {
              show: true
            },
            ticks: {
              fontColor: 'lightgray',
              fontSize: 8,
              // min: 0,
              callback: function callback(label, index, labels) {
                return Math.floor(label);
              }
            }
          }]
        }
      };
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5,
          fontSize: 8
        }
      }, _react["default"].createElement("div", {
        style: {
          color: 'darkred',
          fontWeight: 'bold'
        }
      }, profile.ticker, " - ", profile.name, " ", _react["default"].createElement("span", {
        className: "green"
      }, "Shorts Analysis")), _react["default"].createElement(_reactChartjs.Bar, {
        data: data,
        height: 170,
        options: options
      }), _react["default"].createElement("div", {
        style: {
          fontSize: 8,
          color: 'gray'
        }
      }, "Generated by ", _react["default"].createElement("span", {
        style: {
          color: 'darkred'
        }
      }, "@earningsfly"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 8,
          color: 'red'
        }
      }, "\uD83D\uDE80")));
    }
  }]);

  return NumberOfEmployees;
}(_react["default"].Component);

exports.NumberOfEmployees = NumberOfEmployees;
var _default = NumberOfEmployees;
exports["default"] = _default;