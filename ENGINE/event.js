var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * Created by YangSir on 2016/8/26.
     */
    var _EventListener = (function () {
        function _EventListener() {
        }
        _EventListener.prototype.onBeforeRender = function () {
            return true;
        };
        ;
        _EventListener.prototype.onAfterRender = function () {
            return true;
        };
        return _EventListener;
    }());
    exports._EventListener = _EventListener;
    var _appEventListener = (function (_super) {
        __extends(_appEventListener, _super);
        function _appEventListener(ln) {
            if (ln) {
                _super.call(this);
                this.enabled = true;
                this.onBeforeRender = ln["onBeforeRender"] || this.onBeforeRender;
                this.onAfterRender = ln["onAfterRender"] || this.onAfterRender;
            }
            else {
            }
        }
        _appEventListener.prototype.onBeforeRender = function () {
            return true;
        };
        _appEventListener.prototype.onAfterRender = function () {
            return true;
        };
        return _appEventListener;
    }(_EventListener));
    exports._appEventListener = _appEventListener;
});
//# sourceMappingURL=event.js.map