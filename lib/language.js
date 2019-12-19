function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'ru', 'zh', 'pt', 'ar', 'ja', 'ko', 'mul'];

function getLanguageField(lang) {
  if (lang === 'mul') {
    return 'name';
  }

  return "name_".concat(lang);
}

function localizeTextField(field, lang) {
  if (typeof field === 'string') {
    return field.replace(/{name.*?}/, "{".concat(lang, "}"));
  }

  var str = JSON.stringify(field);

  if (Array.isArray(field)) {
    return JSON.parse(str.replace(/"coalesce",\["get","name.*?"]/g, "\"coalesce\",[\"get\",\"".concat(lang, "\"]")));
  }

  return JSON.parse(str.replace(/{name.*?}/g, "{".concat(lang, "}")));
}
/**
 * Localize map. Language can be set dynamically with `.setLanguage(lang)` method.
 * @param {Object} options
 * @param {Array} [options.supportedLanguages] - (Supported languages)[https://docs.mapbox.com/help/troubleshooting/change-language/]
 * @param {String} [options.language] - One of the supported languages to apply
 * @param {Array} [options.excludedLayerIds=[]] - Array of layer id to exclude from localization
 * @param {Function} [options.getLanguageField] - Accepts language and returns language field
 * By default fields are `name_LANGUAGE` and `name` for multi language (mul)
 */


var LanguageControl =
/*#__PURE__*/
function () {
  function LanguageControl() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, LanguageControl);

    this.container = document.createElement('div');
    this.supportedLanguages = options.supportedLanguages || SUPPORTED_LANGUAGES;
    this.language = options.language;
    this.getLanguageField = options.getLanguageField || getLanguageField;
    this.excludedLayerIds = options.excludedLayerIds || [];
    this.styleChangeListener = this.styleChangeListener.bind(this);
  }

  _createClass(LanguageControl, [{
    key: "onAdd",
    value: function onAdd(map) {
      this.map = map;
      this.map.on('styledata', this.styleChangeListener);
      return this.container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this.map.off('styledata', this.styleChangeListener);
      this.map = undefined;
    }
  }, {
    key: "styleChangeListener",
    value: function styleChangeListener() {
      this.map.off('styledata', this.styleChangeListener);
      this.setLanguage(this.language);
    }
  }, {
    key: "setLanguage",
    value: function setLanguage() {
      var _this = this;

      var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.browserLanguage();
      var language = this.supportedLanguages.indexOf(lang) < 0 ? 'mul' : lang;
      var style = this.map.getStyle();
      var languageField = this.getLanguageField(language);
      var layers = style.layers.map(function (layer) {
        if (layer.type !== 'symbol') return layer;
        if (!layer.layout || !layer.layout['text-field']) return layer;
        if (_this.excludedLayerIds.indexOf(layer.id) !== -1) return layer;
        var textField = layer.layout['text-field'];
        var textFieldLocalized = localizeTextField(textField, languageField);
        return _objectSpread2({}, layer, {
          layout: _objectSpread2({}, layer.layout, {
            'text-field': textFieldLocalized
          })
        });
      });
      this.map.setStyle(_objectSpread2({}, style, {
        layers: layers
      }));
    }
  }, {
    key: "browserLanguage",
    value: function browserLanguage() {
      var language = navigator.languages ? navigator.languages[0] : navigator.language;
      var parts = language.split('-');
      var languageCode = parts.length > 1 ? parts[0] : language;

      if (this.supportedLanguages.indexOf(languageCode) > -1) {
        return languageCode;
      }

      return 'mul';
    }
  }]);

  return LanguageControl;
}();

export default LanguageControl;
