(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/chat/chat"],{

/***/ 55:
/*!*******************************************************************!*\
  !*** E:/键盘敲烂/ourChat - H5/main.js?{"page":"pages%2Fchat%2Fchat"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _chat = _interopRequireDefault(__webpack_require__(/*! ./pages/chat/chat.vue */ 56));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_chat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 56:
/*!************************************************!*\
  !*** E:/键盘敲烂/ourChat - H5/pages/chat/chat.vue ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.vue?vue&type=template&id=bf16e7f4&scoped=true& */ 57);
/* harmony import */ var _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.vue?vue&type=script&lang=js& */ 59);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _chat_vue_vue_type_style_index_0_id_bf16e7f4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.vue?vue&type=style&index=0&id=bf16e7f4&scoped=true&lang=css& */ 61);
/* harmony import */ var _XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs





/* normalize component */

var component = Object(_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "bf16e7f4",
  null,
  false,
  _chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/chat/chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 57:
/*!*******************************************************************************************!*\
  !*** E:/键盘敲烂/ourChat - H5/pages/chat/chat.vue?vue&type=template&id=bf16e7f4&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=template&id=bf16e7f4&scoped=true& */ 58);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_bf16e7f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 58:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/键盘敲烂/ourChat - H5/pages/chat/chat.vue?vue&type=template&id=bf16e7f4&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.mode = "text"
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 59:
/*!*************************************************************************!*\
  !*** E:/键盘敲烂/ourChat - H5/pages/chat/chat.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XB_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=script&lang=js& */ 60);
/* harmony import */ var _XB_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_XB_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _XB_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _XB_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_XB_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 60:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/键盘敲烂/ourChat - H5/pages/chat/chat.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;





































































var _vuex = __webpack_require__(/*! vuex */ 13);









var _auth = _interopRequireDefault(__webpack_require__(/*! ../../common/mixin/auth.js */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var freePopup = function freePopup() {__webpack_require__.e(/*! require.ensure | components/free-ui/free-popup */ "components/free-ui/free-popup").then((function () {return resolve(__webpack_require__(/*! ../../components/free-ui/free-popup.vue */ 217));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var chatItem = function chatItem() {Promise.all(/*! require.ensure | components/free-ui/chat-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/free-ui/chat-item")]).then((function () {return resolve(__webpack_require__(/*! ../../components/free-ui/chat-item.vue */ 264));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var freeAvatar = function freeAvatar() {__webpack_require__.e(/*! require.ensure | components/free-ui/free-avatar */ "components/free-ui/free-avatar").then((function () {return resolve(__webpack_require__(/*! ../../components/free-ui/free-avatar.vue */ 249));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var freeIconButton = function freeIconButton() {__webpack_require__.e(/*! require.ensure | components/free-ui/free-icon-button */ "components/free-ui/free-icon-button").then((function () {return resolve(__webpack_require__(/*! ../../components/free-ui/free-icon-button.vue */ 271));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var navBar = function navBar() {__webpack_require__.e(/*! require.ensure | components/free-ui/free-nav */ "components/free-ui/free-nav").then((function () {return resolve(__webpack_require__(/*! @/components/free-ui/free-nav.vue */ 232));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =
{
  components: {
    navBar: navBar,
    freeIconButton: freeIconButton,
    freeAvatar: freeAvatar,
    chatItem: chatItem,
    freePopup: freePopup },


  mixins: [_auth.default],
  mounted: function mounted() {var _this = this;
    if (!this.Record) this.$store.commit('initRecord');
    this.getStatusBarHeight();
    uni.onKeyboardHeightChange(function (res) {
      if (_this.mode !== 'action' && _this.mode !== 'emoticon') {
        _this.changePositionHeight(res.height);
        if (res.height > 0) _this.scrollToBottom();
        return;
      }
    });
    var info = uni.getSystemInfoSync();
    this.positionX = info.screenWidth;
    this.positionY = info.screenHeight;
    this.$store.commit('regSend', function (url) {
      _this.send('audio', url, _this.RecordTime);
      _this.$store.commit('clearTimer');
    });
    uni.$on('changeGroupName', function (res) {
      _this.detail.name = res;
    });
    if (this.chatList.length) this.scrollToBottom();
    uni.$on('clearChatList', function () {
      _this.chatList = [];
    });
    uni.$on('sendItem', this.sendItem);
    uni.$on('sendCard', this.sendCard);
  },
  beforeDestroy: function beforeDestroy() {
    this.chat.destoryChatObject();
    uni.offKeyboardHeightChange(function () {});
    uni.$off('clearChatList', function () {});
  },
  destroyed: function destroyed() {
    uni.$off('sendCard', this.sendCard);
    uni.$off('onMessage', function () {});
    uni.$off('changeGroupName', function () {});
    uni.$off('sendItem', this.sendItem);
  },

  methods: {
    sendCard: function sendCard(params) {
      this.send('card', '', JSON.stringify(params));
    },
    sendItem: function sendItem(e) {
      this.send(e.type, e.data);
    },
    navTo: function navTo() {


      uni.navigateTo({
        url: 'chat_msg?params=' + encodeURIComponent(JSON.stringify({
          id: this.detail.id,
          chat_type: this.detail.chat_type,
          avatar: this.detail.avatar })) });



    },
    // ======音频=========
    startRecord: function startRecord(e) {
      console.log(e);
      this.Record.start({
        format: 'mp3' });

      this.startY = e.changedTouches[0].pageY;
      this.isRecording = true;
      this.$store.commit('startRecord');

    },
    endRecord: function endRecord() {
      // console.log('end')
      this.Record.stop();

      if (this.recordTimer) {
        this.$store.commit('clearTimer');
      }
      this.isRecording = false;
    },
    cancelRecord: function cancelRecord() {
      // console.log('cancel')
      try {
        this.$store.commit('changePause', true);
        this.Record.stop();
      }
      catch (err) {
        console.log(JSON.stringify(err));
      }

      console.log(this.Record);
      this.$store.commit('clearTimer');
      this.isRecording = false;

    },
    moveRecord: function moveRecord(e) {
      console.log('move');
      if (Math.abs(e.changedTouches[0].pageY - this.startY) >= 80) {
        this.$store.commit('changePause', true);
        this.isRecording = false;
        this.Record.stop();
        this.$store.commit('clearTimer');
      }
    },
    // ======音频=========
    // 改变状态
    changeRecord: function changeRecord() {
      this.mode = this.mode !== 'text' && this.mode !== '' ? 'text' : 'audio';
    },
    // 预览照片
    preview: function preview(url) {
      uni.previewImage({
        current: url,
        urls: this.imageList,
        fail: function fail(err) {
          // console.log(err)
        } });

    },
    // 发送表情包或者使用扩展程序
    actionOrEmoticonEvent: function actionOrEmoticonEvent(item) {

      switch (item.event) {
        case 'emoticon':
          this.send(item.event, item.icon);
          break;
        case 'image':
          this.send(item.event);
          break;
        case 'video':
          this.send(item.event);
          break;
        // console.log('video1')
        case 'openFava':
          uni.navigateTo({
            url: '../my/my_favor?type=send' });

          break;
        case 'card':
          uni.navigateTo({
            url: 'chat_share?type=card' });

          break;
        default:
          console.log(item.event);
          break;}

    },
    // 改变一些高度
    changePositionHeight: function changePositionHeight(height) {
      this.bottom = "bottom:" + (uni.upx2px(105) + height) + "px;";
      this.keyBoardToBottom = height;
    },
    // 隐藏更多功能
    hideMoreFunc: function hideMoreFunc() {
      this.changePositionHeight(0);
      this.mode = '';
    },
    // 更多
    moreFunc: function moreFunc() {var _this2 = this;var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'action';
      this.mode = mode;
      setTimeout(function () {
        uni.hideKeyboard();
        _this2.changePositionHeight(uni.upx2px(580));
        _this2.scrollToBottom();
      }, 50);
    },
    getStatusBarHeight: function getStatusBarHeight() {




    },
    remove: function remove(e) {var _this3 = this;
      console.log(e.item, e.index);
      uni.showModal({
        title: '提示',
        content: '该记录不会出现在你的聊天记录中',
        confirmColor: '#007BFF',
        confirmText: '确定',
        cancelText: '取消',
        success: function success(res) {
          if (res.confirm) {
            _this3.chat.removeChatItem(e.item);
            _this3.chatList.splice(e.index, 1);
            // 最后一个 更新会话列表
            console.log(e.item);
            if (e.index === _this3.chatList.length) {
              _this3.chat.updateChatItem({
                id: _this3.detail.id,
                chat_type: e.item.chat_type },
              function (v) {
                var data = '';
                if (e.index !== 0) {
                  var pre = _this3.chatList[e.index - 1];
                  data = _this3.chat.formatChatItemData(pre);
                  v.data = data;
                }
                return v;
              });
            }
          }
        } });

    },
    // 撤回
    withDraw: function withDraw(index) {
      // 发送请求
      var info = _objectSpread(_objectSpread({}, this.chatList[index]), {}, { isremove: true });
      this.chatList.splice(index, 1, info);
    },
    popEvent: function popEvent(event) {
      switch (event) {
        case 'isTop':
          this.$emit('changeTop', this.index);
          break;
        case 'video':
          this.send('video');}


    },
    // 滑动到底部
    scrollToBottom: function scrollToBottom() {
      var last = this.chatList.length ? this.chatList.length - 1 : 0;
      if (last) {






        this.scrollInto = 'id' + last;

      }
    },

    send: function send(type) {var _this4 = this;var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var options = {};


      switch (type) {

        case 'image':
          if (type && data)
          {
            var _message = this.chat.formatSendData({ type: type, data: data, options: options });
            this.chatList.push(_message);
            var _onProgress = function _onProgress(progress) {
              console.log('上传进度 ', progress);
            };
            this.finalSend(_message, _onProgress);
            return;
          }
          uni.chooseImage({
            count: 9,
            success: function success(res) {
              res.tempFilePaths.forEach(function (v) {
                var message = _this4.chat.formatSendData({ type: type, data: v, options: options });
                _this4.chatList.push(message);
                var onProgress = function onProgress(progress) {
                  console.log('上传进度 ', progress);
                };
                _this4.finalSend(message, onProgress);
              });

            } });

          break;
        case 'video':
          if (type && data)
          {
            var _message2 = this.chat.formatSendData({ type: type, data: data, options: options });
            this.chatList.push(_message2);
            var _onProgress2 = function _onProgress2(progress) {
              console.log('上传进度 ', progress);
            };
            this.finalSend(_message2, _onProgress2);
            return;
          }
          uni.chooseVideo({
            count: 1,
            duration: 12,
            sourceType: ['camera', 'album'],
            success: function success(res) {
              var message = _this4.chat.formatSendData({ type: type, data: res.tempFilePath, options: options });
              _this4.chatList.push(message);
              // obj.content = e.tempFilePath
              var onProgress = function onProgress(progress) {
                console.log('上传进度 ', progress);
              };
              _this4.finalSend(message, onProgress);
            } });

          break;
        case 'card':
          var op = time;
          console.log('type', type, 'data', data, 'options', op);
          data = '[名片]';
          var info = this.chat.formatSendData({ type: type, data: data, options: op });
          this.chatList.push(info);
          var p = function p(progress) {
            console.log('上传进度 ', progress);
          };
          this.finalSend(info, p);
          break;
        // this.send('audio',url,this.RecordTime)
        case 'audio':
          options.time = time;
          var message = this.chat.formatSendData({ type: type, data: data, options: options });
          this.chatList.push(message);
          var onProgress = function onProgress(progress) {
            console.log('上传进度 ', progress);
          };
          this.finalSend(message, onProgress);
          break;

        default: //文字和表情包
          data = data || this.text;

          var mes = this.chat.formatSendData({ type: type, data: data, options: options });
          this.chatList.push(mes);
          this.finalSend(mes);
          return;}





    },
    finalSend: function finalSend(message) {var _this5 = this;var onProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.chat.send(message, onProgress).
      then(function (res) {
        console.log(res);
        _this5.text = '';
        if (message.type === 'card') {
          _this5.toast('发送成功');
        }
        _this5.scrollToBottom();
      }).
      catch(function (err) {
        console.log('errrrr', err);
        _this5.text = '';
        _this5.toast(JSON.stringify(err));
      });
    },
    __init: function __init() {
      try {
        var list = [];
        var total = 20;
        var page = Math.ceil(total / 8);
        for (var i = 0; i < page; i++)
        {
          list.push([]);
          for (var j = 0; j < 8; j++) {
            if (j + i * 8 + 1 > total) continue;
            list[i].push({
              icon: '../../static/5497/' + (j + i * 8) + '.gif',
              name: '图片' + (j + i * 8 + 1),
              event: 'emoticon' });

          }
        }
        this.chat.initChatListItem({
          chat_type: this.detail.chat_type,
          to_id: this.detail.id,
          to_name: this.detail.name,
          to_avatar: this.detail.avatar,
          data: this.detail.chat_type === 'user' ? '你们已经是好友了,可以开始聊天了' : '你已加入群聊,可以开聊天了' });

        this.emoticonList = list;
      }
      catch (err) {
        console.log(JSON.stringify(err));
      }
    } },

  computed: _objectSpread(_objectSpread({},
  (0, _vuex.mapState)({
    Record: function Record(state) {return state.audio.Record;},
    RecordTimer: function RecordTimer(state) {return state.audio.RecordTimer;},
    RecordTime: function RecordTime(state) {return state.audio.RecordTime;},
    chat: function chat(state) {return state.user.chat;},
    totalNoreadnum: function totalNoreadnum(state) {return state.user.totalNoreadnum;},
    conversation: function conversation(state) {return state.user.chatList;} })), {}, {

    currentChat: function currentChat() {var _this6 = this;
      var index = this.conversation.findIndex(function (v) {
        return v.id == _this6.detail.id && v.chat_type === _this6.detail.chat_type;
      });

      if (index === -1) return {};
      return this.conversation[index];
    },
    positionStyle: function positionStyle() {
      var x = this.positionX / 2 - uni.upx2px(180);
      var y = this.positionY / 2 - uni.upx2px(180);
      console.log("x\u662F", x, 'y是', y);
      return "left: ".concat(x, "px;top: ").concat(y, "px;");
    },
    topStyle: function topStyle() {
      return 'top:' + (this.sHeight + uni.upx2px(90)) + 'px;';
    },
    getHeight: function getHeight() {
      return this.menu.length * 100;
    },
    renderList: function renderList() {
      return this[this.mode + 'List'];
    },
    imageList: function imageList() {
      var list = [];
      this.chatList.forEach(function (v) {
        if (v.type === 'emoticon' || v.type === 'image')
        list.push(v.data);
      });
      return list;
    } }),

  watch: {
    text: function text(val, oldVal) {
      if (val && !oldVal) {
        this.showSendButton = true;
      }
      if (!val) this.showSendButton = false;
    } },

  created: function created() {
    this.__init();
  },
  onLoad: function onLoad(e) {var _this7 = this;
    if (!e.params) {
      uni.navigateBack({
        delta: 1 });

      this.toast('非法参数');
    }
    try {
      this.detail = JSON.parse(decodeURIComponent(e.params));
      console.log(this.detail);
      this.chat.createChatObject(this.detail);
      this.chatList = this.chat.getChatDetail();
      console.log('当前聊天列表', this.chatList);
      uni.$on('onMessage', function (message) {
        // console.log('onMessage',message)
        // console.log('message.chat_type === "group" && message.to_id === this.detail.id',message.chat_type === 'group' && message.to_id === this.detail.id)
        if (message.from_id == _this7.detail.id && message.chat_type === 'user' || message.chat_type === 'group' && message.to_id == _this7.detail.id)
        {
          if (message.isremove !== 1)
          {
            _this7.chatList.push(message);
            setTimeout(function () {
              _this7.scrollToBottom();
            }, 100);
            // console.log('onMessage判断2')
          } else
          {
            // console.log('onMessage判断3	')
            var index = _this7.chatList.findIndex(function (v) {return v.id - 0 === message.id - 0;});
            if (index !== -1) {
              _this7.chatList[index].isremove = 1;
              _this7.chatList[index].update_time = message.update_time;

            }
          }


        }
        //置于底部
      });
    }
    catch (err) {
      console.log(err);
    }
  },
  data: function data() {
    return {
      scrollInto: '',
      timer: 0,
      startY: 0,
      positionX: 200,
      positionY: 200,
      isRecording: false,
      mode: '',
      text: '',
      showSendButton: false,
      keyBoardToBottom: 0, //距离底部的距离
      sHeight: 0,
      bottom: "bottom:" + uni.upx2px(105) + "px;",
      emoticonList: [],
      actionList: [
      [
      {
        name: '相册',
        icon: '../../static/extends/pic.png',
        event: 'image' },

      {
        name: '拍摄',
        icon: '../../static/extends/video.png',
        event: 'video' },

      {
        name: '收藏',
        icon: '../../static/extends/shoucan.png',
        event: 'openFava' },

      {
        name: '名片',
        icon: '../../static/extends/man.png',
        event: 'card' },

      {
        name: '语音通话',
        icon: '../../static/extends/phone.png',
        event: '' },

      {
        name: '位置',
        icon: '../../static/extends/path.png',
        event: '' }]],



      detail: {},
      chatList: [],


      menu: [
      {
        name: '复制',
        event: 'copy' },

      {
        name: '转发',
        event: "sendToFriends" },

      {
        name: '收藏',
        event: "store" },

      {
        name: '删除',
        event: "remove" },

      {
        name: '撤回',
        event: "withdraw" },

      {
        name: '多选',
        event: "checkMore" }] };



  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 61:
/*!*********************************************************************************************************!*\
  !*** E:/键盘敲烂/ourChat - H5/pages/chat/chat.vue?vue&type=style&index=0&id=bf16e7f4&scoped=true&lang=css& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XB_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_XB_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_bf16e7f4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../XB/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=style&index=0&id=bf16e7f4&scoped=true&lang=css& */ 62);
/* harmony import */ var _XB_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_XB_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_bf16e7f4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_XB_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_XB_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_bf16e7f4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _XB_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_XB_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_bf16e7f4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _XB_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_XB_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_bf16e7f4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_XB_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_XB_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_XB_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_XB_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_id_bf16e7f4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 62:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/键盘敲烂/ourChat - H5/pages/chat/chat.vue?vue&type=style&index=0&id=bf16e7f4&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[55,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chat/chat.js.map