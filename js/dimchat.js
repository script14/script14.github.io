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
function updateNewPhotos() {
    if (!cookies["lastPhoto"]) {
        document.getElementById("new-photos").innerText = "(!)";
        document.getElementById("new-photos").textContent = "(!)";
    } else {
        fetch("https://album.dimden.dev/api/lastphoto").then(function(i) {
            return i.json();
        }).then(function(i) {
            if (i.date > parseInt(cookies["lastPhoto"])) {
                document.getElementById("new-photos").innerText = "(!)";
                document.getElementById("new-photos").textContent = "(!)";
            } else {
                document.getElementById("new-photos").innerText = "";
                document.getElementById("new-photos").textContent = "";
            }
        });
    }
}
updateNewPhotos();
setInterval(updateNewPhotos, 1000 * 60 * 5);
var mobile = isMobile();
var isSlow = mobile;
var fps = 0
  , cfps = 0;
if (!isSlow) {
    var before = 0, now;
    var last25 = new Array(25).fill(35);
    var i25 = 0;
    var fpsElement = document.getElementById("fps");
    if (window.requestAnimationFrame)
        window.requestAnimationFrame(function loop(time) {
            now = time;
            fps = Math.round(1000 / (now - before));
            before = now;
            last25.push(fps);
            if (last25.length > 25)
                last25.shift();
            if (i25++ > 10) {
                i25 = 0;
                cfps = Math.round(last25.reduce(function(a, b) {
                    return a + b;
                }, 0) / 25);
                if (!isFinite(cfps)) {
                    fpsElement.innerText = "";
                    fpsElement.textContent = "";
                } else {
                    if (fpsElement.innerText != cfps) {
                        fpsElement.innerText = cfps;
                        fpsElement.textContent = cfps;
                    }
                }
            }
            window.requestAnimationFrame(loop);
        });
    setTimeout(function() {
        var perf = setInterval(function() {
            var lp = Math.round(last25.reduce(function(a, b) {
                return a + b;
            }, 0) / 25);
            if (lp < 30) {
                try {
                    if (!rainStopped) {
                        rainStopped = true;
                        stopRain();
                        document.getElementById("debug").innerText = "Slow device, disabled rain";
                        document.getElementById("debug").textContent = "Slow device, disabled rain";
                        setTimeout(function() {
                            document.getElementById("debug").innerText = "";
                            document.getElementById("debug").textContent = "";
                        }, 5000);
                    }
                } catch (e) {}
            }
            if (lp < 28) {
                clearInterval(perf);
                document.getElementById("debug").innerText = "Slow device, disabled effects";
                document.getElementById("debug").textContent = "Slow device, disabled effects";
                setTimeout(function() {
                    document.getElementById("debug").innerText = "";
                    document.getElementById("debug").textContent = "";
                }, 5000);
                isSlow = true;
                var root = document.querySelector(":root");
                root.style.setProperty("--body-text-shadow", "none");
                root.style.setProperty("--green-text-shadow", "none");
                root.style.setProperty("--firefox-body-shadow", "none");
                root.style.setProperty("--firefox-green-shadow", "none");
                root.style.setProperty("--letter-shadow", "none");
                kelvin.classList.remove("kelvin-light");
            }
        }, 2500);
    }, 2500);
}
if (isSlow) {
    document.getElementById("cool-sites").style.display = "none";
}
var navlinks = document.getElementsByClassName("navlink");
setInterval(function() {
    if (mirror)
        return;
    var random = Math.floor(Math.random() * navlinks.length);
    navlinks[random].style.color = "#2c9080";
    setTimeout(function() {
        navlinks[random].style.color = "white";
    }, 500);
}, 2000);
var switchOn = true;
var beep = document.createElement("audio");
beep.src = "/sounds/beep.mp3";
beep.style.display = "none";
document.body.appendChild(beep);
document.getElementById("switch").onclick = function() {
    switchOn = !switchOn;
    beep.play();
    if (switchOn) {
        document.getElementById("logo").className = "";
        letters.forEach(function(l) {
            if (fell && l.id === "logo-n")
                return;
            l.style.filter = "brightness(1) drop-shadow(0 0 0.75rem rgba(20, 220, 187, 0.35))";
        });
        document.getElementById("switch").src = "/images/electricity_on.png";
    } else {
        letters.forEach(function(l) {
            if (fell && l.id === "logo-n")
                return;
            l.style.filter = "brightness(0.2)";
        });
        document.getElementById("logo").className = "noanimation";
        document.getElementById("switch").src = "/images/electricity_off.png";
    }
}
;
var letters = Array.from(document.getElementsByClassName("letter"));
var d = document.getElementById("logo-d");
var n = document.getElementById("logo-n");
var hotel = document.getElementById("hotel");
var fell = false;
if (!isSlow)
    setInterval(function() {
        if (mirror)
            return;
        if (isSlow)
            return;
        var fn = function fn() {
            if (!switchOn)
                return;
            d.style.filter = "brightness(0)";
            setTimeout(function() {
                return (d.style.filter = "brightness(0.9) drop-shadow(0 0 0.75rem rgba(20, 220, 187, 0.35))");
            }, 30);
        };
        var _int = setInterval(fn, 60);
        setTimeout(function() {
            return clearInterval(_int);
        }, 700 + Math.random() * 500);
    }, 7000);
var c = 0
  , c2 = false;
var r = 4;
n.addEventListener("click", function() {
    if (mirror)
        return;
    if (c2)
        return;
    n.style.transform = "rotate(".concat(r++, "deg)");
    n.style.webkitTransform = "rotate(".concat(r, "deg)");
    if (c++ > 5) {
        n.style.color = "rgba(100, 100, 100, 0.9)";
        var i = 3;
        var f = 0;
        var f2 = true;
        var f3 = true;
        fell = true;
        n.style.filter = "brightness(0.2)";
        n.classList.add("noanimation");
        var _int2 = setInterval(function() {
            if (i > window.screen.availWidth / 4) {
                clearInterval(_int2);
            }
            n.style.top = "".concat((i += f), "px");
            n.style.transform = "rotate(".concat(r++, "deg)");
            c2 = true;
            if (f2) {
                if (f3) {
                    f++;
                    f3 = false;
                } else
                    f3 = true;
                f2 = false;
            } else
                f2 = true;
        }, 5);
    }
});
var playing = false;
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
function fetchListen() {
    fetch("https://dimden.dev/services/nowplaying", {
        headers: {
            "Cache-Control": "no-cache",
        },
    }).then(function(i) {
        return i.json();
    }).then(function(i) {
        if (i["@attr"] && i["@attr"].nowplaying) {
            playing = true;
            document.getElementById("pulser").className = "blob";
            document.getElementById("currentlylistening").innerText = "Current song:";
            document.getElementById("currentlylistening").textContent = "Current song:";
            document.getElementById("status").innerText = "Online!";
            document.getElementById("status").textContent = "Online!";
            document.getElementById("status").style.color = "lime";
            document.getElementById("status").style.textShadow = "rgb(4 255 214 / 0%) 0px 0px 10px, rgb(0 255 236 / 17%) 0px 0px 20px, rgb(2 230 0 / 17%) 0px 0px 30px, rgb(0 230 178 / 0%) 0px 0px 40px, rgb(0 230 27 / 24%) 0px 0px 50px, rgb(0 230 178 / 0%) 0px 0px 60px, rgb(0 230 122 / 0%) 0px 0px 70px";
            document.getElementById("lastplayed").innerText = "";
            document.getElementById("lastplayed").textContent = "";
        } else {
            playing = false;
            document.getElementById("pulser").className = "inblob";
            document.getElementById("currentlylistening").innerText = "Last song:";
            document.getElementById("currentlylistening").textContent = "Last song:";
            if (i.date && i.date.uts) {
                document.getElementById("lastplayed").innerText = "Played ".concat(relativeTime(new Date(+(i.date.uts + "000"))));
                document.getElementById("lastplayed").textContent = "Played ".concat(relativeTime(new Date(+(i.date.uts + "000"))));
            }
        }
        if (i.url)
            document.getElementById("songlink").href = i.url;
        else
            document.getElementById("songlink").href = "#";
        if (i.image && i.image[0] && i.image[0]["#text"])
            document.getElementById("albumcover").src = i.image[0]["#text"];
        else
            document.getElementById("albumcover").src = "/images/defaultmusic.jpg";
        var songname = document.getElementById("songname");
        if (i.name) {
            songname.innerText = i.name;
            songname.textContent = i.name;
            if (i.name.length > 11 && songname.tagName === "SPAN")
                songname.outerHTML = songname.outerHTML.replace(/<span(.*?)/g, "<marquee$1");
            if (i.name.length <= 11 && songname.tagName === "MARQUEE")
                songname.outerHTML = songname.outerHTML.replace(/<marquee(.*?)/g, "<span$1");
        } else {
            songname.innerText = "Undefined";
            songname.textContent = "Undefined";
            if (songname.tagName === "MARQUEE")
                songname.outerHTML = songname.outerHTML.replace(/<marquee(.*?)/g, "<span$1");
        }
        if (i.artist) {
            document.getElementById("artist").innerText = i.artist["#text"];
            document.getElementById("artist").textContent = i.artist["#text"];
        } else {
            document.getElementById("artist").innerText = "Unknown";
            document.getElementById("artist").textContent = "Unknown";
        }
    });
}
setInterval(fetchListen, 7525);
function checkStatus() {
    fetch("https://dimden.dev/services/slave/status/").then(function(i) {
        return i.json();
    }).then(function(i) {
        if (i.dimden === "online" || playing) {
            document.getElementById("status").innerText = "Online!";
            document.getElementById("status").textContent = "Online!";
            document.getElementById("status").style.color = "lime";
            document.getElementById("status").style.textShadow = "rgb(4 255 214 / 0%) 0px 0px 10px, rgb(0 255 236 / 17%) 0px 0px 20px, rgb(2 230 0 / 17%) 0px 0px 30px, rgb(0 230 178 / 0%) 0px 0px 40px, rgb(0 230 27 / 24%) 0px 0px 50px, rgb(0 230 178 / 0%) 0px 0px 60px, rgb(0 230 122 / 0%) 0px 0px 70px";
        } else {
            document.getElementById("status").innerText = "Offline!";
            document.getElementById("status").style.color = "red";
            document.getElementById("status").style.textShadow = "0 0 10px #04ffd518, 0 0 20px #00ffee13, 0 0 30px #e600002f, 0 0 40px #00e6b200, 0 0 50px #e600003d, 0 0 60px #e6000029, 0 0 70px #e6000057";
        }
        if (i.dimdendev === "online") {
            document.getElementById("dimdendev-status").innerText = " OK ";
            document.getElementById("dimdendev-status").textContent = " OK ";
            document.getElementById("dimdendev-status").className = "status-ok";
        } else {
            document.getElementById("dimdendev-status").innerText = "FAIL";
            document.getElementById("dimdendev-status").textContent = "FAIL";
            document.getElementById("dimdendev-status").className = "status-fail";
        }
        if (i.proxy === "online") {
            document.getElementById("proxy-status").innerText = " OK ";
            document.getElementById("proxy-status").textContent = " OK ";
            document.getElementById("proxy-status").className = "status-ok";
        } else {
            document.getElementById("proxy-status").innerText = "FAIL";
            document.getElementById("proxy-status").textContent = "FAIL";
            document.getElementById("proxy-status").className = "status-fail";
        }
        if (i.utix === "online") {
            document.getElementById("utix-status").innerText = " OK ";
            document.getElementById("utix-status").textContent = " OK ";
            document.getElementById("utix-status").className = "status-ok";
        } else {
            document.getElementById("utix-status").innerText = "FAIL";
            document.getElementById("utix-status").textContent = "FAIL";
            document.getElementById("utix-status").className = "status-fail";
        }
        if (i.frizwoods === "online") {
            document.getElementById("frizwoods-status").innerText = " OK ";
            document.getElementById("frizwoods-status").textContent = " OK ";
            document.getElementById("frizwoods-status").className = "status-ok";
        } else {
            document.getElementById("frizwoods-status").innerText = "FAIL";
            document.getElementById("frizwoods-status").textContent = "FAIL";
            document.getElementById("frizwoods-status").className = "status-fail";
        }
        if (i.owopbot === "online") {
            document.getElementById("owopbot-status").innerText = " OK ";
            document.getElementById("owopbot-status").textContent = " OK ";
            document.getElementById("owopbot-status").className = "status-ok";
        } else {
            document.getElementById("owopbot-status").innerText = "FAIL";
            document.getElementById("owopbot-status").textContent = "FAIL";
            document.getElementById("owopbot-status").className = "status-fail";
        }
        if (i.nekoweb === "online") {
            document.getElementById("nekoweb-status").innerText = " OK ";
            document.getElementById("nekoweb-status").textContent = " OK ";
            document.getElementById("nekoweb-status").className = "status-ok";
        } else {
            document.getElementById("nekoweb-status").innerText = "FAIL";
            document.getElementById("nekoweb-status").textContent = "FAIL";
            document.getElementById("nekoweb-status").className = "status-fail";
        }
        if (i.lune === "online") {
            document.getElementById("lune-status").innerText = " OK ";
            document.getElementById("lune-status").textContent = " OK ";
            document.getElementById("lune-status").className = "status-ok";
        } else {
            document.getElementById("lune-status").innerText = "FAIL";
            document.getElementById("lune-status").textContent = "FAIL";
            document.getElementById("lune-status").className = "status-fail";
        }
        if (i.lune !== "online" || i.nekoweb !== "online" || i.owopbot !== "online" || i.frizwoods !== "online" || i.utix !== "online" || i.proxy !== "online" || i.dimdendev !== "online") {
            document.getElementById("system-status").innerText = "NOT OK";
            document.getElementById("system-status").textContent = "NOT OK";
            document.getElementById("system-status").className = "status-fail";
        } else {
            document.getElementById("system-status").innerText = "OK";
            document.getElementById("system-status").textContent = "OK";
            document.getElementById("system-status").className = "status-ok";
        }
        document.getElementById("bot-status").innerText = " OK ";
        document.getElementById("bot-status").textContent = " OK ";
        document.getElementById("bot-status").className = "status-ok";
    })["catch"](function(e) {
        document.getElementById("bot-status").innerText = "FAIL";
        document.getElementById("bot-status").textContent = "FAIL";
        document.getElementById("bot-status").className = "status-fail";
    });
}
setInterval(checkStatus, 30025);
function getTweet() {
    fetch("https://dimden.dev/services/lasttweet").then(function(i) {
        return i.json();
    }).then(function(t) {
        t.date = new Date(t.date);
        document.getElementById("tweet-text").innerText = t.description.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
        document.getElementById("tweet-text").textContent = t.description.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
        document.getElementById("tweet-date").innerText = relativeTime(t.date, relativeTimePeriodsShort, true);
        document.getElementById("tweet-date").textContent = relativeTime(t.date, relativeTimePeriodsShort, true);
    });
}
setInterval(getTweet, 60000);
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
var startEqualizer = function startEqualizer(audio) {
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();
    var audioSrc = ctx.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    var canvas = document.getElementById("doom-canvas")
      , cwidth = canvas.width
      , cheight = canvas.height - 2
      , meterWidth = 10
      , capHeight = 2
      , capStyle = "#fff"
      , meterNum = 800 / (10 + 2)
      , capYPositionArray = [];
    (ctx = canvas.getContext("2d")),
    (gradient = ctx.createLinearGradient(0, 0, 0, 300));
    gradient.addColorStop(1, "#fff");
    gradient.addColorStop(0.8, "#ff0");
    gradient.addColorStop(0.55, "#f00");
    function renderFrame() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / meterNum);
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            }
            ctx.fillStyle = capStyle;
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 12, cheight - --capYPositionArray[i], meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
        }
        requestAnimationFrame(renderFrame);
    }
    renderFrame();
};
var text = "";
var pon = false;
var doomPlaying = false;
if (!isSlow)
    document.onkeydown = function(e) {
        if (mirror)
            return;
        text += e.key.toLowerCase();
        if (text.length > 50)
            text = text.slice(1);
        if (text.endsWith("polybius")) {
            if (pon)
                return;
            pon = true;
            var _letters = Array.from(document.getElementsByClassName("letter"));
            _letters.forEach(function(l) {
                l.style.display = "none";
            });
            document.getElementById("wires").style.display = "none";
            document.getElementById("mewo").style.display = "none";
            document.getElementById("switch").style.display = "none";
            var img = document.createElement("img");
            img.src = "/polybius.webp";
            img.height = "80";
            document.getElementById("logo").appendChild(img);
            document.getElementById("copyright").innerText = "(c) 1981 SINNESLÖSCHEN INC.";
            document.getElementById("copyright").textContent = "(c) 1981 SINNESLÖSCHEN INC.";
        } else if (text.endsWith("lain") && !text.endsWith("explain")) {
            document.body.style.backgroundImage = "url(/images/lain.gif)";
            document.getElementById("bg").src = "/images/lain.gif";
        } else if (text.endsWith("sulfur") || text.endsWith("sulphur") || text.endsWith("brimstone")) {
            document.getElementById("brimstone").hidden = false;
        } else if (text.endsWith("doom")) {
            if (doomPlaying)
                return;
            doomPlaying = true;
            var doom = new Audio("/sounds/theonlythingtheyfearisyou.mp3");
            doom.play();
            startEqualizer(doom);
            doom.onplay = function() {
                setTimeout(function() {
                    document.getElementById("dynamic-style").innerHTML = ".status-ok{color:#ff6f6f!important;text-shadow:0 0 20px #fd3636!important}\n                    h2, a, .chat-name, #hotel {\n                        transition: 0.3s;\n                        color: red !important;\n                    }\n                    #bg {\n                        filter: hue-rotate(145deg);\n                        animation-name: redfade;\n                        animation-duration: 3s;\n                        animation-iteration-count: infinite;\n                    }\n                    #logo {\n                        filter: hue-rotate(192deg);\n                        transition: 0.3s;\n                    }\n                    #dimdengif {\n                        transition: 0.3s;\n                        filter: brightness(0.1) grayscale(1);\n                    }\n                    .moon-icon {\n                        transition: 0.3s;\n                        filter: hue-rotate(295deg);\n                    }\n                    #pre-ad, #projects-banner img, #pre-moon, #buttons-misc, #buttons-sites, #my-button {\n                        transition: 0.3s;\n                        filter: grayscale(1);\n                    }\n                    #pre-hit {\n                        transition: 0.3s;\n                        filter: hue-rotate(232deg);\n                    }\n                    @keyframes redfade {\n                        0% { backdrop-filter: hue-rotate(145deg) }\n                        50% { backdrop-filter: hue-rotate(145deg) brightness(0.4) }\n                        100% { backdrop-filter: hue-rotate(145deg) }\n                    }\n                    #doom-canvas {\n                        position: sticky !important;\n                        margin-top: -1050px;\n                        transition: 0.5s;\n                        height: unset !important;\n                    }\n                ";
                }, 9500);
            }
            ;
            stopRain();
        } else if (text.endsWith("gravity") && document.activeElement !== document.getElementById("message")) {
            var script = document.createElement("script");
            script.src = "/js/gravity.js";
            document.body.appendChild(script);
            stopRain();
        }
    }
    ;
var kirby = document.getElementById("kirby");
kirby.onclick = function() {
    if (mirror)
        return;
    kirby.onclick = null;
    var audio = document.createElement("audio");
    audio.src = "/sounds/kirby.mp3";
    audio.style.display = "none";
    document.body.appendChild(audio);
    audio.play();
    var x = 0;
    var _int3 = setInterval(function() {
        x += 2;
        if (x > 250)
            return clearInterval(_int3);
        var y = -((Math.pow(x - 50, 2) - 1000) / 200);
        kirby.style.left = x + "px";
        kirby.style.top = y + "px";
    }, 10);
}
;
var hotline = false;
setInterval(function() {
    if (mirror)
        return;
    if (hotline) {
        document.getElementById("hotline-previous").innerText = "<--";
        document.getElementById("hotline-previous").textContent = "<--";
        document.getElementById("hotline-next").innerText = "-->";
        document.getElementById("hotline-next").textContent = "-->";
    } else {
        document.getElementById("hotline-previous").innerText = "<-";
        document.getElementById("hotline-previous").textContent = "<-";
        document.getElementById("hotline-next").innerText = "->";
        document.getElementById("hotline-next").textContent = "->";
    }
    hotline = !hotline;
}, 500);
if (!isSlow)
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        document.getElementById("moon-iframe").height = "160";
    }
var client, chatJoin = 0, currentId = undefined;
var cursors = [];
var ignoreLocals = 0;
var newmsgsound = new Audio("/sounds/imrcv.mp3");
newmsgsound.volume = 0.1;
document.body.appendChild(newmsgsound);
var cursorsDiv = document.getElementById("cursors");
setInterval(function() {
    var _iterator2 = _createForOfIteratorHelper(cursors), _step2;
    try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var _c = _step2.value;
            if (Date.now() - _c.lastMove > 60000) {
                if (!_c.cursor.hidden)
                    _c.cursor.hidden = true;
            } else {
                if (_c.cursor.hidden)
                    _c.cursor.hidden = false;
            }
        }
    } catch (err) {
        _iterator2.e(err);
    } finally {
        _iterator2.f();
    }
}, 1000);
function escapeHTML(unsafe) {
    return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "’");
}
if (localStorage.admin) {
    document.getElementById("message").maxLength = 99999;
}
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
            if (!isTabFocused || document.activeElement.id !== "message") {
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
        var messages = document.getElementById("messages");
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
        var messages = document.getElementById("messages");
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
document.getElementById("message").onkeydown = function(e) {
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
var elementD = document.getElementById("logo-d");
var elementD0 = document.getElementById("logo-d0");
var elementN = document.getElementById("logo-n");
var buzz = document.createElement("audio");
buzz.id = "buzz";
buzz.src = "/sounds/ElectHum.mp3";
buzz.loop = true;
buzz.volume = 0;
buzz.style.display = "none";
document.body.appendChild(buzz);
var bp = buzz.play();
if (bp && bp.catch) {
    bp["catch"](function(e) {
        document.onclick = function() {
            document.getElementById("debug").innerText = "Sounds ON";
            document.getElementById("debug").textContent = "Sounds ON";
            setTimeout(function() {
                document.getElementById("debug").innerText = "";
                document.getElementById("debug").textContent = "";
            }, 2500);
            buzz.play();
            document.onclick = null;
        }
        ;
    });
}
function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
}
function calculateDistance(elem, mouseX, mouseY, isLogo) {
    var offset = getOffset(elem);
    return Math.floor(Math.sqrt(Math.pow(mouseX - (offset.left + (elem.width ? elem.width : 100) / 2), 2) + Math.pow(mouseY - (offset.top + (elem.height ? elem.height : 1) / 2), 2)));
}
var lastVolumeEdit = Date.now();
if (!isSlow)
    document.addEventListener("mousemove", function(e) {
        if (lastVolumeEdit + 25 > Date.now())
            return;
        lastVolumeEdit = Date.now();
        var mX = e.pageX;
        var mY = e.pageY;
        var distance1 = calculateDistance(elementD, mX, mY, true);
        var distance2 = calculateDistance(elementD0, mX, mY, true);
        var distance3 = calculateDistance(elementN, mX, mY, true);
        var distance4 = calculateDistance(hotel, mX, mY, true);
        if (Math.min(distance1, distance2, distance3, distance4) !== distance4 && !switchOn) {
            return (buzz.volume = 0);
        }
        var volume = +((-Math.sqrt(50 * Math.min(distance1, distance2, fell ? 999999 : distance3, distance4)) + 100) / 100).toFixed(3);
        if (volume < 0)
            volume = 0;
        if (volume > 0.6)
            volume = 0.6;
        buzz.volume = volume;
    });
function onVisibilityChange(callback) {
    var visible = true;
    if (!callback) {
        throw new Error("no callback given");
    }
    function focused() {
        if (!visible) {
            callback((visible = true));
        }
    }
    function unfocused() {
        if (visible) {
            callback((visible = false));
        }
    }
    if ("hidden"in document) {
        visible = !document.hidden;
        document.addEventListener("visibilitychange", function() {
            (document.hidden ? unfocused : focused)();
        });
    }
    if ("mozHidden"in document) {
        visible = !document.mozHidden;
        document.addEventListener("mozvisibilitychange", function() {
            (document.mozHidden ? unfocused : focused)();
        });
    }
    if ("webkitHidden"in document) {
        visible = !document.webkitHidden;
        document.addEventListener("webkitvisibilitychange", function() {
            (document.webkitHidden ? unfocused : focused)();
        });
    }
    if ("msHidden"in document) {
        visible = !document.msHidden;
        document.addEventListener("msvisibilitychange", function() {
            (document.msHidden ? unfocused : focused)();
        });
    }
    if ("onfocusin"in document) {
        document.onfocusin = focused;
        document.onfocusout = unfocused;
    }
    window.onpageshow = window.onfocus = focused;
    window.onpagehide = window.onblur = unfocused;
}
var isTabFocused = true;
onVisibilityChange((function() {
    var _ref = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(visible) {
        var rects;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1)
                switch ((_context.prev = _context.next)) {
                case 0:
                    isTabFocused = visible;
                    if (visible) {
                        _context.next = 7;
                        break;
                    }
                    buzz.src = "";
                    buzz.remove();
                    if (window.bgm)
                        bgm.volume = 0;
                    _context.next = 25;
                    break;
                case 7:
                    buzz = document.createElement("audio");
                    buzz.src = "/sounds/ElectHum.mp3";
                    buzz.loop = true;
                    buzz.volume = 0;
                    buzz.style.display = "none";
                    _context.prev = 12;
                    _context.next = 15;
                    return buzz.play();
                case 15:
                    _context.next = 19;
                    break;
                case 17:
                    _context.prev = 17;
                    _context.t0 = _context["catch"](12);
                case 19:
                    document.body.appendChild(buzz);
                    if (bgm)
                        bgm.volume = 1;
                    rects = kelvin.getBoundingClientRect();
                    localStorage.kelvinX = rects.x;
                    localStorage.kelvinY = rects.y;
                    kelvinBus.postMessage({
                        x: rects.x,
                        y: rects.y,
                    });
                case 25:
                case "end":
                    return _context.stop();
                }
        }, _callee, null, [[12, 17]]);
    }));
    return function(_x3) {
        return _ref.apply(this, arguments);
    }
    ;
}
)());
var mewoSound;
if (localStorage.punishment)
    document.getElementById("mewo").src = "/images/mewo_cut.png";
document.getElementById("mewo").onclick = function() {
    if (localStorage.punishment) {
        return alert("Look what you've done.");
    }
    if (!mewoSound)
        mewoSound = new Audio("/sounds/mewo.mp3");
    mewoSound.play();
}
;
if (!navigator.userAgent.includes("PaleMoon")) {
    var miscButtons = document.getElementById("buttons-misc");
    var siteButtons = document.getElementById("buttons-sites");
    Array.from(miscButtons.children).forEach(function(e) {
        var newButton = e.cloneNode(true);
        miscButtons.appendChild(newButton);
    });
    Array.from(siteButtons.children).forEach(function(e) {
        var newButton = e.cloneNode(true);
        if (newButton.href === "https://melankorin.net/") {
            newButton.children[0].src = "https://melankorin.net/assets/img/buttons/button-2.gif";
        } else if (newButton.href === "https://dokodemo.neocities.org/") {
            newButton.children[0].src = "https://dokode.moe/media/mine/88x31/dokodemobutton2.gif";
        } else if (newButton.href === "https://melps.neocities.org/") {
            newButton.children[0].src = "https://melps.neocities.org/limk2.jpg";
        } else if (newButton.href === "https://cinni.net/") {
            newButton.children[0].src = "https://cinni.net/images/cinni_button.2.png";
        }
        siteButtons.appendChild(newButton);
    });
} else {
    document.getElementById("cool-sites").hidden = true;
    document.getElementById("buttons-misc").hidden = true;
    document.getElementById("buttons-sites").hidden = true;
}
var mirror = false;
var bgm;
var heartbeat = new Audio("/sounds/heartbeat.mp3");
document.getElementById("mute").onclick = function() {
    if (bgm.paused) {
        bgm.play();
        document.getElementById("mute").innerText = "[mute]";
        document.getElementById("mute").textContent = "[mute]";
    } else {
        bgm.pause();
        document.getElementById("mute").innerText = "[play]";
        document.getElementById("mute").textContent = "[play]";
    }
}
;
document.getElementById("brimstone").onclick = function() {
    if (mirror)
        return;
    stopRain();
    mirror = true;
    bgm = new Audio("/sounds/YES.mp3");
    bgm.loop = true;
    var noise = new Audio("/sounds/snd_noise.mp3");
    heartbeat.play();
    document.getElementById("hidden-sulphur-1").id = "hidden-sulphur-2";
    document.getElementById("sulphur").style.opacity = "0";
    document.getElementById("dynamic-style").innerHTML = "\n        * {\n            transition: 0.5s;\n            color: red !important;\n        }\n    ";
    setTimeout(function() {
        var red = setInterval(function() {
            document.getElementById("dynamic-style").innerHTML = "";
            setTimeout(function() {
                document.getElementById("dynamic-style").innerHTML = "\n                    * {\n                        color: red !important;\n                    }\n                ";
            }, 70);
        }, 120);
        setTimeout(function() {
            return clearInterval(red);
        }, 300);
        setTimeout(function() {
            document.getElementById("dynamic-style").innerHTML = "\n                * {\n                    transition: 0;\n                }\n                body {\n                    transition: 1s ease-in-out;\n                    filter: grayscale(1);\n                }\n            ";
            setTimeout(function() {
                document.getElementById("dynamic-style").innerHTML = "\n                    body {\n                        transition: 3s ease-in-out;\n                        filter: grayscale(0);\n                    }\n                    #container {\n                        transition: transform 3s ease-in-out 0s;\n                        transform: rotateY(180deg);\n                    }\n                    .box {\n                        transition: filter 0s linear 1.5s;\n                        filter: brightness(0.3);\n                    }\n                    div .chat-msg-local, div .chat-name {\n                        transition: color 0s linear 1.5s;\n                        color: transparent !important;\n                    }\n                ";
                setTimeout(function() {
                    document.getElementById("dynamic-style").innerHTML += "\n                   * {\n                        transition: color 0s linear 0s;\n                        color: transparent !important;\n                    }\n                    ";
                    var imgs = Array.from(document.getElementsByTagName("img"));
                    imgs.forEach(function(img) {
                        if (img.closest("#backside"))
                            return;
                        img.style.filter = "brightness(0.1) grayscale(1)";
                    });
                    document.getElementById("pre-banner").style.filter = "brightness(0)";
                    document.getElementById("pre-moon").style.filter = "brightness(0)";
                    document.getElementById("pre-hit").style.filter = "brightness(0)";
                    document.getElementById("buttons-misc").style.filter = "brightness(0)";
                    document.getElementById("buttons-sites").style.filter = "brightness(0)";
                    document.getElementById("dimdengif").style.filter = "brightness(0)";
                    document.getElementById("projects-banner").style.filter = "brightness(0)";
                    document.getElementById("mewo").style.display = "none";
                    document.getElementById("hotel").style.filter = "brightness(0)";
                    document.getElementById("message").style.filter = "brightness(0)";
                    for (var _i2 in letters) {
                        letters[_i2].style.filter = "brightness(0.1) grayscale(1)";
                    }
                    document.getElementById("flickering-style").innerHTML = "";
                    setTimeout(function() {
                        noise.play();
                        document.body.style.backgroundSize = "10000%";
                        document.body.style.backgroundImage = "url(/images/bg_glitch.gif)";
                        document.getElementById("dynamic-style").innerHTML += "\n                            footer span {\n                                color: gray !important;\n                            }\n                            footer a {\n                                color: #2c9080 !important;\n                            }\n                            #cool-sites {\n                                color: #5a5a5a !important;\n                            }\n                            body {\n                                transition: 0s;\n                                filter: brightness(0);\n                            }\n                        ";
                        setTimeout(function() {
                            noise.play();
                            document.body.style.backgroundSize = "cover";
                            document.getElementById("bg").remove();
                            document.getElementById("dynamic-style").innerHTML = document.getElementById("dynamic-style").innerHTML.split("\n").slice(0, -5).join("\n");
                            bgm.play();
                            document.getElementById("backside").hidden = false;
                            document.getElementById("backside").style.zIndex = 1;
                        }, 400);
                    }, 2500);
                }, 1500);
            }, 1000);
        }, 750);
    }, 2000);
}
;
var butlerClicks = 0;
document.getElementById("butler").onclick = function() {
    if (butlerClicks++ === 3 && !localStorage.punishment) {
        var blood = confirm("MEWO has been very, very bad. Do you want to punish her?");
        if (blood) {
            bgm.src = "/sounds/mewohasbeenveryverybad.mp3";
            bgm.play();
            localStorage.punishment = 1;
        }
    } else {
        alert("Waiting for something to happen?");
    }
}
;
var bannerDiv = document.getElementById("projects-banner");
var projects = [["/images/banners/neocities.gif", "https://neocities.org/site/dimden"], ["/images/banners/discord.png", "https://discord.gg/yaqzbDBaAA"], ["/images/banners/nekoweb.jpg", "https://nekoweb.org"], ["/images/banners/oldtwitter.gif", "https://github.com/dimdenGD/OldTwitter"], ];
var bannerIndex = Math.floor(Math.random() * projects.length);
bannerDiv.children[0].hidden = bannerIndex !== 0;
for (var _i3 in projects) {
    if (_i3 == 0)
        continue;
    var p = projects[_i3];
    var a = document.createElement("a");
    a.href = p[1];
    a.target = "_blank";
    var media = document.createElement(p[0].endsWith(".mp4") ? "video" : "img");
    media.src = p[0];
    media.width = "650";
    media.height = "77";
    media.loading = "lazy";
    if (p[0].endsWith(".mp4")) {
        media.loop = true;
        media.autoplay = true;
        media.muted = true;
    }
    if (+_i3 !== bannerIndex) {
        a.hidden = true;
    }
    a.appendChild(media);
    bannerDiv.appendChild(a);
}
setInterval(function() {
    var a = bannerDiv.children[bannerIndex];
    a.hidden = true;
    var random = Math.floor(Math.random() * projects.length);
    while (random === bannerIndex) {
        random = Math.floor(Math.random() * projects.length);
    }
    bannerIndex = random;
    a = bannerDiv.children[bannerIndex];
    a.hidden = false;
}, 25000);
var hmc = document.getElementById("hidemycursor");
var cursorHidden = localStorage.cursorHidden === "1";
hmc.checked = cursorHidden;
hmc.addEventListener("change", function() {
    if (hmc.checked) {
        localStorage.cursorHidden = 1;
        cursorHidden = true;
        var ab = new Int16Array(3);
        ab[0] = 0;
        ab[1] = 0;
        ab[2] = document.body.clientHeight;
        client.send(ab);
    } else {
        localStorage.cursorHidden = 0;
        cursorHidden = false;
    }
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
var muterain = document.getElementById("muterain");
muterain.checked = localStorage.muterain === "1";
muterain.addEventListener("change", function() {
    if (muterain.checked) {
        localStorage.muterain = 1;
        rainBgm.pause();
        if (window.snowBgm)
            snowBgm.pause();
        if (thunderBgm)
            thunderBgm.pause();
    } else {
        delete localStorage.muterain;
        rainBgm.play();
        if (window.snowBgm)
            snowBgm.play();
        if (thunderBgm)
            thunderBgm.play();
    }
});
var disablerain = document.getElementById("disablerain");
disablerain.checked = localStorage.disablerain === "1";
disablerain.addEventListener("change", function() {
    if (disablerain.checked) {
        localStorage.disablerain = 1;
        rainStopped = true;
        let c = document.getElementById("rain-canvas");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        rainBgm.pause();
        if (window.snowBgm)
            snowBgm.pause();
        document.getElementById('snow').hidden = true;
    } else {
        delete localStorage.disablerain;
        rainStopped = false;
        rainBgm.play();
        if (window.snowBgm)
            snowBgm.play();
        document.getElementById('snow').hidden = false;
        updateRain();
    }
});
var hidecursors = document.getElementById("hidecursors");
hidecursors.checked = localStorage.hidecursors === "1";
hidecursors.addEventListener("change", function() {
    if (hidecursors.checked) {
        localStorage.hidecursors = 1;
        let style = document.createElement("style");
        style.id = "hidecursors-style";
        style.innerHTML = `
    .cursor {
      display: none !important;
    }
    `;
        document.head.appendChild(style);
        cursorHidden = true;
    } else {
        delete localStorage.hidecursors;
        if (document.getElementById("hidecursors-style"))
            document.getElementById("hidecursors-style").remove();
        cursorHidden = false;
    }
});
var moons = Array.from(document.getElementsByClassName("moon-icon"));
var _loop = function _loop() {
    var moon = moons[_i4];
    moon.onclick = function() {
        if (!moon.style.transform) {
            moon.style.transform = "rotate(90deg)";
        } else {
            moon.style.transform = "rotate(".concat(parseInt(moon.style.transform.split("(")[1].split("deg")[0]) + 90, "deg)");
        }
    }
    ;
};
for (var _i4 in moons) {
    _loop();
}
var kelvin = document.getElementById("kelvin");
var kelvinBus = new BroadcastChannel("kelvin");
if (isSlow) {
    kelvin.classList.remove("kelvin-light");
}
window.addEventListener("scroll", function() {
    var rects = kelvin.getBoundingClientRect();
    localStorage.kelvinX = rects.x;
    localStorage.kelvinY = rects.y;
    kelvinBus.postMessage({
        x: rects.x,
        y: rects.y,
    });
}, {
    passive: true,
});
function detectAdblock(callback) {
    fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
    }).then(function(response) {
        callback(response.redirected);
    })["catch"](function() {
        callback(true);
    });
}
if (!localStorage.okblock)
    detectAdblock(function(res) {
        if (res) {
            document.getElementById("blocknotice").hidden = false;
        }
    });
document.getElementById("close-notice").addEventListener("click", function() {
    localStorage.okblock = "1";
    document.getElementById("blocknotice").hidden = true;
});
var blogArrows = Array.from(document.getElementsByClassName("blog-arrow"));
var blogIndex = 0;
setInterval(function() {
    for (var i = 0; i < blogArrows.length; i++) {
        blogArrows[i].innerText = "-";
        blogArrows[i].textContent = "-";
    }
    blogArrows[blogIndex].innerText = ">";
    blogArrows[blogIndex].textContent = ">";
    blogIndex++;
    if (blogIndex >= blogArrows.length)
        blogIndex = 0;
}, 1000);
function getMoodInfo(pleasantness, energy) {
    if (energy >= 0.67) {
        if (pleasantness >= 0.67) {
            return ["Ecstatic", "ffde59", "bigsmile"];
        } else if (pleasantness >= 0.33) {
            return ["Festive", "febd59", "bigsmile"];
        } else if (pleasantness >= 0) {
            return ["Manic", "ff914c", "pacman"];
        } else if (pleasantness >= -0.33) {
            return ["Shocked", "e64f22", "scared"];
        } else if (pleasantness >= -0.67) {
            return ["Angry", "d72121", "anger"];
        } else {
            return ["Enraged", "9b0b00", "anger"];
        }
    } else if (energy >= 0.33) {
        if (pleasantness >= 0.67) {
            return ["Excited", "ffde59", "o"];
        } else if (pleasantness >= 0.33) {
            return ["Motivated", "febd59", "fine"];
        } else if (pleasantness >= 0) {
            return ["Energized", "ff914c", "fine"];
        } else if (pleasantness >= -0.33) {
            return ["Restless", "e64f22", "confused"];
        } else if (pleasantness >= -0.67) {
            return ["Stressed", "d72121", "sad"];
        } else {
            return ["Fuming", "9b0b00", "wa"];
        }
    } else if (energy >= 0) {
        if (pleasantness >= 0.67) {
            return ["Blissful", "ffde59", "o"];
        } else if (pleasantness >= 0.33) {
            return ["Cheerful", "febd59", "smile"];
        } else if (pleasantness >= 0) {
            return ["Pleasant", "ff914c", "fine"];
        } else if (pleasantness >= -0.33) {
            return ["Uneasy", "e64f22", "confused"];
        } else if (pleasantness >= -0.67) {
            return ["Worried", "d72121", "cry"];
        } else {
            return ["Anxious,", "9b0b00", "cry"];
        }
    } else if (energy >= -0.33) {
        if (pleasantness >= 0.67) {
            return ["Fulfilled", "6b7a41", "cat"];
        } else if (pleasantness >= 0.33) {
            return ["Content", "a1ad7e", "cute"];
        } else if (pleasantness >= 0) {
            return ["At ease", "c3d098", "fine"];
        } else if (pleasantness >= -0.33) {
            return ["Apathetic", "d1dae6", "neutral"];
        } else if (pleasantness >= -0.67) {
            return ["Down", "89b1cb", "sad"];
        } else {
            return ["Anxious", "688ca9", "cry"];
        }
    } else if (energy >= -0.67) {
        if (pleasantness >= 0.67) {
            return ["Satisfied", "6b7a41", "cat"];
        } else if (pleasantness >= 0.33) {
            return ["Restful", "a1ad7e", "satisfied"];
        } else if (pleasantness >= 0) {
            return ["Relaxed", "c3d098", "sus"];
        } else if (pleasantness >= -0.33) {
            return ["Tired", "d1dae6", "confused"];
        } else if (pleasantness >= -0.67) {
            return ["Sad", "89b1cb", "sad"];
        } else {
            return ["Miserable", "688ca9", "cry"];
        }
    } else {
        if (pleasantness >= 0.67) {
            return ["Serene", "6b7a41", "cat"];
        } else if (pleasantness >= 0.33) {
            return ["Tranquil", "a1ad7e", "satisfied"];
        } else if (pleasantness >= 0) {
            return ["Sleepy", "c3d098", "sus"];
        } else if (pleasantness >= -0.33) {
            return ["Drained", "d1dae6", "sus"];
        } else if (pleasantness >= -0.67) {
            return ["Desolate", "89b1cb", "wa"];
        } else {
            return ["Despair", "688ca9", "cry"];
        }
    }
    return ["Unknown", "ffffff", "neutral"];
}
var mood = document.getElementById("mood");
var moodDiv = document.getElementById("mood-div");
var dimdenGif = document.getElementById("dimdengif");
function updateMood() {
    fetch("https://mood.dimden.dev/services/mood/get").then(function(r) {
        return r.json();
    }).then(function(m) {
        var info = getMoodInfo(m.pleasantness, m.energy);
        mood.innerText = (m.pleasantness > 0 ? "+" : "") + m.pleasantness.toFixed(2) + " / " + (m.energy > 0 ? "+" : "") + m.energy.toFixed(2);
        mood.textContent = (m.pleasantness > 0 ? "+" : "") + m.pleasantness.toFixed(2) + " / " + (m.energy > 0 ? "+" : "") + m.energy.toFixed(2);
        mood.style.color = "#" + info[1];
        document.getElementById("mood-emoji").src = "https://mood.dimden.dev/fbemoji/" + info[2] + ".png";
        moodDiv.title = "Last update: " + new Date(m.timestamp).toLocaleString();
        if (m.pleasantness < -0.5 && m.energy < 0.33) {
            if (dimdenGif.src !== "https://dimden.dev/images/aaa.png") {
                dimdenGif.src = "https://dimden.dev/images/aaa.png";
            }
        } else {
            if (dimdenGif.src !== "https://dimden.dev/images/dimden.gif") {
                dimdenGif.src = "https://dimden.dev/images/dimden.gif";
            }
        }
    });
}
setInterval(updateMood, 1000 * 60);
