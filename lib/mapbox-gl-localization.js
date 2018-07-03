'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var optionsDefault = {
  supportedLanguages: ['en', 'es', 'fr', 'de', 'ru', 'zh', 'ar', 'pt', 'local'],
  language: false,
  fallbackLanguage: 'local'
};

var Localization = function () {
  function Localization() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Localization);

    this.options = Object.assign(optionsDefault, options);
    this.isLanguageField = /^{name/;
    this.localizeStyle = this.localizeStyle.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  _createClass(Localization, [{
    key: 'getLocalizedStyle',
    value: function getLocalizedStyle(language) {
      var _this = this;

      var style = this.map.getStyle();
      if (!language) {
        language = this.browserLanguage();
      }
      if (this.options.supportedLanguages.indexOf(language) === -1) {
        language = this.options.fallbackLanguage;
      }
      var localizedField = language === 'local' ? '{name}' : '{name_' + language + '}';
      style.layers = style.layers.map(function (layer) {
        return _this.localizeLayer(layer, localizedField);
      });
      return style;
    }
  }, {
    key: 'localizeLayer',
    value: function localizeLayer(layer, localizedField) {
      if (layer.layout && layer.layout['text-field']) {
        layer.layout['text-field'] = this.localizeTextField(layer.layout['text-field'], localizedField);
      }
      return layer;
    }
  }, {
    key: 'localizeTextField',
    value: function localizeTextField(field, localizedField) {
      var _this2 = this;

      if (typeof field === 'string' && this.isLanguageField.test(field)) {
        return localizedField;
      } else if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object' && field.stops) {
        return Object.assign({}, field, {
          stops: field.stops.map(function (stop) {
            if (_this2.isLanguageField.test(stop[1])) {
              return [stop[0], localizedField];
            }
            return stop;
          })
        });
      }
      return field;
    }
  }, {
    key: 'localizeStyle',
    value: function localizeStyle() {
      /*
      * Apply styles only once
      * */
      this.map.off('styledata', this.localizeStyle);
      this.setLanguage(this.options.language);
    }
  }, {
    key: 'browserLanguage',
    value: function browserLanguage() {
      var language = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
      var code = language.split('-')[0];
      if (this.options.supportedLanguages.indexOf(code) === -1) {
        return this.options.fallbackLanguage;
      }
      return code;
    }
  }, {
    key: 'onAdd',
    value: function onAdd(map) {
      this.map = map;
      this.container = document.createElement('div');
      this.map.on('styledata', this.localizeStyle);
      this.map.setLanguage = this.setLanguage;
      return this.container;
    }
  }, {
    key: 'onRemove',
    value: function onRemove() {
      this.map.off('styledata', this.localizeStyle);
      this.map.setLanguage = undefined;
      this.map = undefined;
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(language) {
      this.map.setStyle(this.getLocalizedStyle(language));
    }
  }]);

  return Localization;
}();

exports.default = Localization;