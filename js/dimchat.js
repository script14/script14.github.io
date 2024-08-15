function _typeof(obj) {
    "@babel/helpers - typeof";
    return ((_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    }
    : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }
    ),
    _typeof(obj));
}
var rectLeft = 80;
function _regeneratorRuntime() {
    "use strict";
    /*!regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE*/
    _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    }
    ;
    var exports = {}
      , Op = Object.prototype
      , hasOwn = Op.hasOwnProperty
      , defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }
      , $Symbol = "function" == typeof Symbol ? Symbol : {}
      , iteratorSymbol = $Symbol.iterator || "@@iterator"
      , asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator"
      , toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return (Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0,
        }),
        obj[key]);
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return (obj[key] = value);
        }
        ;
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator
          , generator = Object.create(protoGenerator.prototype)
          , context = new Context(tryLocsList || []);
        return (defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context),
        }),
        generator);
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf
      , NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype));
    function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg
                  , value = result.value;
                return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    (result.value = unwrapped),
                    resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    }
                    );
                }
                return (previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg());
            },
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state)
                throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method)
                    throw arg;
                return doneResult();
            }
            for (context.method = method,
            context.arg = arg; ; ) {
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel)
                            continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method)
                    context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state)
                        throw ((state = "completed"),
                        context.arg);
                    context.dispatchException(context.arg);
                } else
                    "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (((state = context.done ? "completed" : "suspendedYield"),
                    record.arg === ContinueSentinel))
                        continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && ((state = "completed"),
                (context.method = "throw"),
                (context.arg = record.arg));
            }
        }
        ;
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method
          , method = delegate.iterator[methodName];
        if (undefined === method)
            return ((context.delegate = null),
            ("throw" === methodName && delegate.iterator["return"] && ((context.method = "return"),
            (context.arg = undefined),
            maybeInvokeDelegate(delegate, context),
            "throw" === context.method)) || ("return" !== methodName && ((context.method = "throw"),
            (context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")))),
            ContinueSentinel);
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type)
            return ((context.method = "throw"),
            (context.arg = record.arg),
            (context.delegate = null),
            ContinueSentinel);
        var info = record.arg;
        return info ? info.done ? ((context[delegate.resultName] = info.value),
        (context.next = delegate.nextLoc),
        "return" !== context.method && ((context.method = "next"),
        (context.arg = undefined)),
        (context.delegate = null),
        ContinueSentinel) : info : ((context.method = "throw"),
        (context.arg = new TypeError("iterator result is not an object")),
        (context.delegate = null),
        ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]),
        2 in locs && ((entry.finallyLoc = locs[2]),
        (entry.afterLoc = locs[3])),
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        (record.type = "normal"),
        delete record.arg,
        (entry.completion = record);
    }
    function Context(tryLocsList) {
        (this.tryEntries = [{
            tryLoc: "root"
        }]),
        tryLocsList.forEach(pushTryEntry, this),
        this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod)
                return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next)
                return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1
                  , next = function next() {
                    for (; ++i < iterable.length; )
                        if (hasOwn.call(iterable, i))
                            return (next.value = iterable[i]),
                            (next.done = !1),
                            next;
                    return (next.value = undefined),
                    (next.done = !0),
                    next;
                };
                return (next.next = next);
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return ((GeneratorFunction.prototype = GeneratorFunctionPrototype),
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0,
    }),
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0,
    }),
    (GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction")),
    (exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return (!!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)));
    }
    ),
    (exports.mark = function(genFun) {
        return (Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : ((genFun.__proto__ = GeneratorFunctionPrototype),
        define(genFun, toStringTagSymbol, "GeneratorFunction")),
        (genFun.prototype = Object.create(Gp)),
        genFun);
    }
    ),
    (exports.awrap = function(arg) {
        return {
            __await: arg
        };
    }
    ),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList),PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }
    ),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, "Generator"),
    define(Gp, iteratorSymbol, function() {
        return this;
    }),
    define(Gp, "toString", function() {
        return "[object Generator]";
    }),
    (exports.keys = function(val) {
        var object = Object(val)
          , keys = [];
        for (var key in object)
            keys.push(key);
        return (keys.reverse(),
        function next() {
            for (; keys.length; ) {
                var key = keys.pop();
                if (key in object)
                    return (next.value = key),
                    (next.done = !1),
                    next;
            }
            return (next.done = !0),
            next;
        }
        );
    }
    ),
    (exports.values = values),
    (Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = undefined),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = undefined),
            this.tryEntries.forEach(resetTryEntry),
            !skipTempReset))
                for (var name in this)
                    "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type)
                throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done)
                throw exception;
            var context = this;
            function handle(loc, caught) {
                return ((record.type = "throw"),
                (record.arg = exception),
                (context.next = loc),
                caught && ((context.method = "next"),
                (context.arg = undefined)),
                !!caught);
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i]
                  , record = entry.completion;
                if ("root" === entry.tryLoc)
                    return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc")
                      , hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc)
                            return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc)
                            return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc)
                            return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally)
                            throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc)
                            return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return ((record.type = type),
            (record.arg = arg),
            finallyEntry ? ((this.method = "next"),
            (this.next = finallyEntry.finallyLoc),
            ContinueSentinel) : this.complete(record));
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type)
                throw record.arg;
            return ("break" === record.type || "continue" === record.type ? (this.next = record.arg) : "return" === record.type ? ((this.rval = this.arg = record.arg),
            (this.method = "return"),
            (this.next = "end")) : "normal" === record.type && afterLoc && (this.next = afterLoc),
            ContinueSentinel);
        },
        finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc)
                    return (this.complete(entry.completion, entry.afterLoc),
                    resetTryEntry(entry),
                    ContinueSentinel);
            }
        },
        catch: function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return ((this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc,
            }),
            "next" === this.method && (this.arg = undefined),
            ContinueSentinel);
        },
    }),
    exports);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this
          , args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        }
        );
    }
    ;
}
function _slicedToArray(arr, i) {
    return (_arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest());
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : ("undefined" != typeof Symbol && arr[Symbol.iterator]) || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (((_x = (_i = _i.call(arr)).next),
            0 === i)) {
                if (Object(_i) !== _i)
                    return;
                _n = !1;
            } else
                for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value),
                _arr.length !== i); _n = !0)
                    ;
        } catch (err) {
            (_d = !0),
            (_e = err);
        } finally {
            try {
                if (!_n && null != _i["return"] && ((_r = _i["return"]()),
                Object(_r) !== _r))
                    return;
            } finally {
                if (_d)
                    throw _e;
            }
        }
        return _arr;
    }
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
        return arr;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || (allowArrayLike && o && typeof o.length === "number")) {
            if (it)
                o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length)
                        return {
                            done: true
                        };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e2) {
                    throw _e2;
                },
                f: F,
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e3) {
            didErr = true;
            err = _e3;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null)
                    it["return"]();
            } finally {
                if (didErr)
                    throw err;
            }
        },
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o)
        return;
    if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
        n = o.constructor.name;
    if (n === "Map" || n === "Set")
        return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
        len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
    return arr2;
}
var spoilers_ahead = "Easter egg spoilers ahead!!!!";
function isMobile() {
    var match = window.matchMedia || window.msMatchMedia;
    if (match) {
        var mq = match("(pointer:coarse)");
        return mq.matches;
    }
    return false;
}
var cookies = {};
document.cookie.split(";").forEach(function(cookie) {
    var _cookie$split = cookie.split("=")
      , _cookie$split2 = _slicedToArray(_cookie$split, 2)
      , key = _cookie$split2[0]
      , value = _cookie$split2[1];
    cookies[key.trim()] = value;
});


var relativeTimePeriods = [[31536000, "year"], [2419200, "month"], [604800, "week"], [86400, "day"], [3600, "hour"], [60, "minute"], [1, "second"], ];
var relativeTimePeriodsShort = [[31536000, "y"], [2419200, "m"], [604800, "w"], [86400, "d"], [3600, "h"], [60, "m"], [1, "s"], ];
function relativeTime(date, period, short) {
    if (!period)
        period = relativeTimePeriods;
    if (!(date instanceof Date))
        date = new Date(date * 1000);
    var seconds = (new Date() - date) / 1000;
    var _iterator = _createForOfIteratorHelper(period), _step;
    try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2)
              , secondsPer = _step$value[0]
              , name = _step$value[1];
            if (seconds >= secondsPer) {
                var amount = Math.floor(seconds / secondsPer);
                if (short)
                    return "".concat(amount).concat(name);
                return "".concat(amount, " ").concat(name).concat(amount && amount !== 1 ? "s" : "", " ago");
            }
        }
    } catch (err) {
        _iterator.e(err);
    } finally {
        _iterator.f();
    }
    return "Just now";
}


var text = "";
var pon = false;



var client, chatJoin = 0, currentId = undefined;
var cursors = [];
var ignoreLocals = 0;
















function escapeHTML(unsafe) {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "’");
}
if (localStorage.admin) {
    document.getElementById("messages2").maxLength = 99999;
}
var isTabFocused = true;
function connectChat() {
    client = new WebSocket("wss://dimden.dev/services/chat/");
    client.binaryType = "arraybuffer";
    client.onmessage = function(msg) {
        if (typeof msg.data !== "string") {
            var data = new Int32Array(msg.data);
            var id = data[0];
            var x = data[1];
            var y = data[2];
            var h = data[3];
            x = Math.min(x, innerWidth - rectLeft - 50);
            y = Math.min(y, window.document.body.clientHeight - 100);
            if (id === currentId)
                return;
            var _c2 = cursors.find(function(c) {
                return c.id === id;
            });
            if (!_c2) {
                var cursor = document.createElement("img");
                cursor.src = "/images/cur.png";
                cursor.className = "cursor";
                cursor.id = "cursor-".concat(joinedId);
                cursorsDiv.appendChild(cursor);
                _c2 = {
                    id: id,
                    cursor: cursor,
                    x: x,
                    y: y,
                    h: h,
                };
                cursors.push(_c2);
            }
            _c2.x = x;
            _c2.y = y;
            _c2.h = h;
            _c2.lastMove = Date.now();
            var ratio = document.body.clientHeight / h;
            _c2.cursor.style.left = x + "px";
            _c2.cursor.style.top = y * ratio + "px";
            _c2.cursor.hidden = false;
            if (x === 0 && y === 0)
                _c2.cursor.hidden = true;
            else
                _c2.cursor.hidden = false;
            return;
        }
        if (msg.data.length === 0)
            return;
        if (msg.data.startsWith("Your ID: ")) {
            currentId = +msg.data.split(": ")[1];
            return;
        }
        if (msg.data.startsWith("Joined: ")) {
            var _msg$data$split$1$spl = msg.data.split(": ")[1].split(",").map(Number)
              , _msg$data$split$1$spl2 = _slicedToArray(_msg$data$split$1$spl, 4)
              , _joinedId = _msg$data$split$1$spl2[0]
              , _x2 = _msg$data$split$1$spl2[1]
              , _y = _msg$data$split$1$spl2[2]
              , _h = _msg$data$split$1$spl2[3];
            if (_joinedId === currentId)
                return;
            _x2 = Math.min(_x2, innerWidth - rectLeft - 50);
            _y = Math.min(_y, window.document.body.clientHeight - 100);
            var _cursor = document.createElement("img");
            _cursor.src = "/images/cur.png";
            _cursor.className = "cursor";
            var _ratio = document.body.clientHeight / _h;
            _cursor.style.left = _x2 + "px";
            _cursor.style.top = _y * _ratio + "px";
            _cursor.hidden = true;
            if (_x2 === 0 && _y === 0)
                _cursor.hidden = true;
            else
                _cursor.hidden = false;
            _cursor.id = "cursor-".concat(_joinedId);
            cursorsDiv.appendChild(_cursor);
            cursors.push({
                id: _joinedId,
                cursor: _cursor,
                x: _x2,
                y: _y,
                h: _h,
                lastMove: Date.now() - 61000,
            });
            return;
        }
        if (msg.data.startsWith("Left: ")) {
            var leftId = +msg.data.split(": ")[1];
            if (leftId === currentId)
                return;
            var _cursor2 = document.getElementById("cursor-".concat(leftId));
            if (_cursor2) {
                _cursor2.remove();
            }
            cursors = cursors.filter(function(c) {
                return c.id !== leftId;
            });
            return;
        }
        var admin = msg.data.startsWith("!");
        var name = document.createElement("span");
        name.innerText = msg.data.split(">")[0] + "> ";
        name.textContent = msg.data.split(">")[0] + "> ";
        name.className = "chat-name";
        if (admin)
            name.className = "chat-name chat-name-admin";
        if (name.textContent.endsWith("[D]> ") && !admin)
            name.className = "chat-name chat-name-discord";
        if (msg.data.startsWith("<LOCAL>")) {
            if (ignoreLocals > Date.now() && !msg.data.includes("Disconnected"))
                return;
            name.className = "chat-name chat-name-local";
        } else {
            if (!isTabFocused || document.activeElement.id !== "messages2") {
                if (Date.now() - chatJoin > 2500 && localStorage.mutechat != "1")
                    newmsgsound.play();
            }
        }
        var text = document.createElement("span");
        text.innerHTML = admin ? msg.data.split(">").slice(1).join(">").split(" | ").slice(0, -1).join(" | ") : escapeHTML(msg.data.split(">").slice(1).join(">").split(" | ").slice(0, -1).join(" | "));
        text.innerHTML = text.innerHTML.replace(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g, "<a href='$1' target='_blank'>$1</a>");
        text.innerHTML = text.innerHTML.replace(/(?:&lt;|<):([A-Z-a-z\-_~0-9]+?):([0-9]+)(?:&gt;|>)/g, '<img class="emote" title="$1" src="https://cdn.discordapp.com/emojis/$2.png?v=1">');
        text.innerHTML = text.innerHTML.replace(/(?:&lt;|<)a:([A-Z-a-z\-_~0-9]+?):([0-9]+)(?:&gt;|>)/g, '<img class="emote" title="$1" src="https://cdn.discordapp.com/emojis/$2.gif?v=1">');
        text.className = "chat-msg ".concat(msg.data.startsWith("<LOCAL>") ? "chat-msg-local" : "");
        var date = document.createElement("span");
        var d = new Date(+msg.data.split(" | ").slice(-1));
        var rd = new Date();
        date.innerText = " " + (rd.getDate() === d.getDate() ? d.toLocaleTimeString() : d.toLocaleString());
        date.textContent = " " + (rd.getDate() === d.getDate() ? d.toLocaleTimeString() : d.toLocaleString());
        date.className = "chat-date";
        try {
            date.title = "".concat(new Date(+msg.data.split(" | ").slice(-1)).toLocaleTimeString([], {
                timeZone: "Europe/Kiev",
                hour12: false,
            }), " in Ukraine");
        } catch (e) {}
        var message = document.createElement("div");
        message.className = "chat-message";
        var messages = document.getElementById("messages2");
        message.appendChild(name);
        message.appendChild(text);
        message.appendChild(date);
        messages.appendChild(message);
        setTimeout(function() {
            if (messages.scrollHeight - messages.scrollTop < 300 || Date.now() - chatJoin < 5000)
                messages.scrollTop = messages.scrollHeight;
        });
        if (messages.childElementCount > 100) {
            messages.firstChild.remove();
        }
    }
    ;
    client.onopen = function() {
        chatJoin = Date.now();
        setTimeout(function() {
            if (localStorage.admin) {
                client.send(JSON.stringify({
                    operation: "admin",
                    value: localStorage.admin,
                }));
            }
            if (localStorage.nick) {
                client.send(JSON.stringify({
                    operation: "nick",
                    value: localStorage.nick,
                }));
            }
        }, 100);
    }
    ;
    client.onclose = function() {
        currentId = undefined;
        var messages = document.getElementById("messages2");
        messages.innerText = "";
        messages.textContent = "";
        if (client.onmessage) {
            client.onmessage({
                data: "<LOCAL> Disconnected from chat. | ".concat(Date.now()),
            });
        }
        setTimeout(connectChat, 1000);
        var _iterator3 = _createForOfIteratorHelper(cursors), _step3;
        try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var _c3 = _step3.value;
                _c3.cursor.remove();
            }
        } catch (err) {
            _iterator3.e(err);
        } finally {
            _iterator3.f();
        }
        cursors = [];
    }
    ;
}
setInterval(function() {
    if (client.readyState === WebSocket.OPEN)
        client.send(JSON.stringify({
            operation: "ping",
            value: Date.now().toString(),
        }));
}, 1000);
connectChat();
let lastMessageSentDate = 0;

document.getElementById("send").onclick = function() {
    var msg = document.getElementById("message").value;
    if (msg.startsWith("/nick ")) {
        localStorage.setItem("nick", msg.slice(6));
        client.send(JSON.stringify({
            operation: "nick",
            value: msg.slice(6),
        }));
    } else if (msg.startsWith("/ban ")) {
        client.send(JSON.stringify({
            operation: "ban",
            value: msg.slice(5),
        }));
    } else if (msg.startsWith("/unban ")) {
        client.send(JSON.stringify({
            operation: "unban",
            value: msg.slice(7),
        }));
    } else {
        if (msg.startsWith("/"))
            return;
        if (Date.now() - lastMessageSentDate < 1000)
            return;
        lastMessageSentDate = Date.now();
        client.send(JSON.stringify({
            operation: "send",
            value: msg,
        }));
    }
    document.getElementById("message").value = "";
}
;

document.getElementById("send").onclick = function() {
    var msg = document.getElementById("messages2").value;
    if (msg.startsWith("/nick ")) {
        localStorage.setItem("nick", msg.slice(6));
        client.send(JSON.stringify({
            operation: "nick",
            value: msg.slice(6),
        }));
    } else if (msg.startsWith("/ban ")) {
        client.send(JSON.stringify({
            operation: "ban",
            value: msg.slice(5),
        }));
    } else if (msg.startsWith("/unban ")) {
        client.send(JSON.stringify({
            operation: "unban",
            value: msg.slice(7),
        }));
    } else {
        if (msg.startsWith("/"))
            return;
        if (Date.now() - lastMessageSentDate < 1000)
            return;
        lastMessageSentDate = Date.now();
        client.send(JSON.stringify({
            operation: "send",
            value: msg,
        }));
    }
    document.getElementById("messages2").value = "";
}
;
document.getElementById("messages2").onkeydown = function(e) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
        document.getElementById("send").click();
    }
}
;
function getRects() {
    var b00 = document.getElementById("mainbox").getBoundingClientRect();
    var b01 = document.getElementById("linksdiv").getBoundingClientRect();
    window.rectLeft = b00.left;
    window.rectRight = b01.right;
    window.rectTop = b00.top;
    window.rectWidth = rectRight - rectLeft;
    window.rectHeight = document.body.clientHeight;
}
getRects();
window.addEventListener("resize", getRects, {
    passive: true,
});
window.addEventListener("scroll", getRects, {
    passive: true,
});
setInterval(getRects, 1000);
window.xPercent = 0;
window.yPercent = 0;
var lastSend = Date.now();
document.addEventListener("mousemove", function(e) {
    if (cursorHidden || mobile)
        return;
    var x = e.pageX - rectLeft;
    var y = e.pageY - rectTop - window.scrollY;
    if (Date.now() - lastSend > 25 && client.readyState === WebSocket.OPEN) {
        lastSend = Date.now();
        var ab = new Int16Array(3);
        ab[0] = x;
        ab[1] = y;
        ab[2] = document.body.clientHeight;
        client.send(ab);
    }
}, {
    passive: true,
});













var mutechat = document.getElementById("mutechat");
mutechat.checked = localStorage.mutechat === "1";
mutechat.addEventListener("change", function() {
    if (mutechat.checked) {
        localStorage.mutechat = 1;
    } else {
        delete localStorage.mutechat;
    }
});









