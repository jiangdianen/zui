import 'bootstrap-datetime-picker/css/bootstrap-datetimepicker.min.css';
import 'bootstrap-datetime-picker/js/bootstrap-datetimepicker.min';
import moment from 'moment';
import base from 'common/base';
import utils from 'utils';

$.widget('zui.datetime', base, {
  options: {
    datetimeOptions: {
      format: 'yyyy-mm-dd hh:ss'
    },
    lang: utils.LANGUAGE,
    extendLocale: {},
    isDpFormat: false,
    change: date => {},
    hide: date => {}
  },
  _init() {
    this._super();
    if (this.options.datetimeOptions) {
      if (!this.options.isDpFormat) {
        this.options.datetimeOptions.format = this._getDatetimePickerFormat(
          this.options.datetimeOptions.format
        );
      }
    }
    this._mergeI18nLocale();
    this._initDateTimePicker();
    if (this.options.value) {
      this.setValue(this.options.value);
    }
  },
  // 合并i18n语言包
  _mergeI18nLocale() {
    console.log($.fn.datetimepicker, this.options.lang, this.options.extendLocale, this);
    const {
      options: { lang, extendLocale }
    } = this;
    const languageRes = require(`./i18n/${lang}.js`);
    $.extend($.fn.datetimepicker.default.tooltips, languageRes, extendLocale);
  },
  // private
  _getDatetimePickerFormat(format) {
    if (!format) return null;
    // format = format.replace('yyyy', 'YYYY')
    // format = format.replace('dd', 'DD')
    return format;
  },
  _initDateTimePicker() {
    var that = this;
    var dateTimeOpts = $.extend(
      {
        showTodayButton: true,
        showClear: true,
        showClose: true,
        useCurrent: false,
        allowInputToggle: true
      },
      this.options.datetimeOptions
    );
    var $dateElement = this.element
      .addClass('form-control')
      .wrap("<div class='input-group input-append date' />")
      .after(
        '<span class="add-on"><i class="icon-remove"></i></span><span class="add-on"><i class="icon-th"></i></span>'
      )
      .parent();
    // 事件
    $dateElement
      .datetimepicker(dateTimeOpts)
      .on('changeDate', e => {
        that.element.val(moment(e.date).format('YYYY-MM-DD HH:ss'));
        that._trigger('change', e, e.data);
      })
      .on('hide', e => {
        that._trigger('hide', e, e.data);
      })
      .on('show', e => {
        that._trigger('show', e);
      })
      .on('update', e => {
        that._trigger('update', e, e.data);
      });
    this._dateTimePicker = $dateElement.data('DateTimePicker');
  },

  // API
  /**
   * 设置控件的值
   */
  setValue(value) {
    this._dateTimePicker.date(value);
  },
  /**
   * 获取控件的值
   */
  getValue() {
    return this.element.val();
  }
});
