(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    ;
    var _appEventListener = (function () {
        function _appEventListener(ln) {
            if (ln) {
                //super();
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
    }());
    exports._appEventListener = _appEventListener;
    var event = (function () {
        function event(src, obj, method) {
            this.src = src;
            this.obj = obj;
            this.method = method;
        }
        event.prototype.exec = function () {
            this.method && this.method.call(this.obj, this.src);
        };
        return event;
    }());
    exports.event = event;
});
//# sourceMappingURL=event.js.map