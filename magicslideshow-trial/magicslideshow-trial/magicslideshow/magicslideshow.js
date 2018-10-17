/*


   Magic Slideshow v3.1.15 DEMO
   Copyright 2018 Magic Toolbox
   Buy a license: www.magictoolbox.com/magicslideshow/
   License agreement: https://www.magictoolbox.com/license/


*/

window.MagicSlideshow = (function() {
    var x, y;
    x = y = (function() {
        var Q = {
            version: "v3.3-b5-1-gac3ac3e",
            UUID: 0,
            storage: {},
            $uuid: function(U) {
                return (U.$J_UUID || (U.$J_UUID = ++K.UUID))
            },
            getStorage: function(U) {
                return (K.storage[U] || (K.storage[U] = {}))
            },
            $F: function() {},
            $false: function() {
                return false
            },
            $true: function() {
                return true
            },
            stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
            defined: function(U) {
                return (undefined != U)
            },
            ifndef: function(V, U) {
                return (undefined != V) ? V : U
            },
            exists: function(U) {
                return !!(U)
            },
            jTypeOf: function(U) {
                if (!K.defined(U)) {
                    return false
                }
                if (U.$J_TYPE) {
                    return U.$J_TYPE
                }
                if (!!U.nodeType) {
                    if (1 == U.nodeType) {
                        return "element"
                    }
                    if (3 == U.nodeType) {
                        return "textnode"
                    }
                }
                if (U.length && U.item) {
                    return "collection"
                }
                if (U.length && U.callee) {
                    return "arguments"
                }
                if ((U instanceof window.Object || U instanceof window.Function) && U.constructor === K.Class) {
                    return "class"
                }
                if (U instanceof window.Array) {
                    return "array"
                }
                if (U instanceof window.Function) {
                    return "function"
                }
                if (U instanceof window.String) {
                    return "string"
                }
                if (K.browser.trident) {
                    if (K.defined(U.cancelBubble)) {
                        return "event"
                    }
                } else {
                    if (U === window.event || U.constructor == window.Event || U.constructor == window.MouseEvent || U.constructor == window.UIEvent || U.constructor == window.KeyboardEvent || U.constructor == window.KeyEvent) {
                        return "event"
                    }
                }
                if (U instanceof window.Date) {
                    return "date"
                }
                if (U instanceof window.RegExp) {
                    return "regexp"
                }
                if (U === window) {
                    return "window"
                }
                if (U === document) {
                    return "document"
                }
                return typeof(U)
            },
            extend: function(Z, Y) {
                if (!(Z instanceof window.Array)) {
                    Z = [Z]
                }
                if (!Y) {
                    return Z[0]
                }
                for (var X = 0, V = Z.length; X < V; X++) {
                    if (!K.defined(Z)) {
                        continue
                    }
                    for (var W in Y) {
                        if (!Object.prototype.hasOwnProperty.call(Y, W)) {
                            continue
                        }
                        try {
                            Z[X][W] = Y[W]
                        } catch (U) {}
                    }
                }
                return Z[0]
            },
            implement: function(Y, X) {
                if (!(Y instanceof window.Array)) {
                    Y = [Y]
                }
                for (var W = 0, U = Y.length; W < U; W++) {
                    if (!K.defined(Y[W])) {
                        continue
                    }
                    if (!Y[W].prototype) {
                        continue
                    }
                    for (var V in (X || {})) {
                        if (!Y[W].prototype[V]) {
                            Y[W].prototype[V] = X[V]
                        }
                    }
                }
                return Y[0]
            },
            nativize: function(W, V) {
                if (!K.defined(W)) {
                    return W
                }
                for (var U in (V || {})) {
                    if (!W[U]) {
                        W[U] = V[U]
                    }
                }
                return W
            },
            $try: function() {
                for (var V = 0, U = arguments.length; V < U; V++) {
                    try {
                        return arguments[V]()
                    } catch (W) {}
                }
                return null
            },
            $A: function(W) {
                if (!K.defined(W)) {
                    return K.$([])
                }
                if (W.toArray) {
                    return K.$(W.toArray())
                }
                if (W.item) {
                    var V = W.length || 0,
                        U = new Array(V);
                    while (V--) {
                        U[V] = W[V]
                    }
                    return K.$(U)
                }
                return K.$(Array.prototype.slice.call(W))
            },
            now: function() {
                return new Date().getTime()
            },
            detach: function(Y) {
                var W;
                switch (K.jTypeOf(Y)) {
                    case "object":
                        W = {};
                        for (var X in Y) {
                            W[X] = K.detach(Y[X])
                        }
                        break;
                    case "array":
                        W = [];
                        for (var V = 0, U = Y.length; V < U; V++) {
                            W[V] = K.detach(Y[V])
                        }
                        break;
                    default:
                        return Y
                }
                return K.$(W)
            },
            $: function(W) {
                var U = true;
                if (!K.defined(W)) {
                    return null
                }
                if (W.$J_EXT) {
                    return W
                }
                switch (K.jTypeOf(W)) {
                    case "array":
                        W = K.nativize(W, K.extend(K.Array, {
                            $J_EXT: K.$F
                        }));
                        W.jEach = W.forEach;
                        return W;
                        break;
                    case "string":
                        var V = document.getElementById(W);
                        if (K.defined(V)) {
                            return K.$(V)
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        K.$uuid(W);
                        W = K.extend(W, K.Doc);
                        break;
                    case "element":
                        K.$uuid(W);
                        W = K.extend(W, K.Element);
                        break;
                    case "event":
                        W = K.extend(W, K.Event);
                        break;
                    case "textnode":
                    case "function":
                    case "array":
                    case "date":
                    default:
                        U = false;
                        break
                }
                if (U) {
                    return K.extend(W, {
                        $J_EXT: K.$F
                    })
                } else {
                    return W
                }
            },
            $new: function(U, W, V) {
                return K.$(K.doc.createElement(U)).setProps(W || {}).jSetCss(V || {})
            },
            addCSS: function(X, Y, V) {
                var U, aa, W, ac = [],
                    ab = -1;
                V || (V = K.stylesId);
                U = K.$(V) || K.$new("style", {
                    id: V,
                    type: "text/css"
                }).jAppendTo((document.head || document.body), "top");
                aa = U.sheet || U.styleSheet;
                if ("string" != K.jTypeOf(Y)) {
                    for (var W in Y) {
                        ac.push(W + ":" + Y[W])
                    }
                    Y = ac.join(";")
                }
                if (aa.insertRule) {
                    ab = aa.insertRule(X + " {" + Y + "}", aa.cssRules.length)
                } else {
                    try {
                        ab = aa.addRule(X, Y, aa.rules.length)
                    } catch (Z) {}
                }
                return ab
            },
            removeCSS: function(X, U) {
                var W, V;
                W = K.$(X);
                if ("element" !== K.jTypeOf(W)) {
                    return
                }
                V = W.sheet || W.styleSheet;
                if (V.deleteRule) {
                    V.deleteRule(U)
                } else {
                    if (V.removeRule) {
                        V.removeRule(U)
                    }
                }
            },
            generateUUID: function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(W) {
                    var V = Math.random() * 16 | 0,
                        U = W == "x" ? V : (V & 3 | 8);
                    return U.toString(16)
                }).toUpperCase()
            },
            getAbsoluteURL: (function() {
                var U;
                return function(V) {
                    if (!U) {
                        U = document.createElement("a")
                    }
                    U.setAttribute("href", V);
                    return ("!!" + U.href).replace("!!", "")
                }
            })(),
            getHashCode: function(W) {
                var X = 0,
                    U = W.length;
                for (var V = 0; V < U; ++V) {
                    X = 31 * X + W.charCodeAt(V);
                    X %= 4294967296
                }
                return X
            }
        };
        var K = Q;
        var L = Q.$;
        if (!window.magicJS) {
            window.magicJS = Q;
            window.$mjs = Q.$
        }
        K.Array = {
            $J_TYPE: "array",
            indexOf: function(X, Y) {
                var U = this.length;
                for (var V = this.length, W = (Y < 0) ? Math.max(0, V + Y) : Y || 0; W < V; W++) {
                    if (this[W] === X) {
                        return W
                    }
                }
                return -1
            },
            contains: function(U, V) {
                return this.indexOf(U, V) != -1
            },
            forEach: function(U, X) {
                for (var W = 0, V = this.length; W < V; W++) {
                    if (W in this) {
                        U.call(X, this[W], W, this)
                    }
                }
            },
            filter: function(U, Z) {
                var Y = [];
                for (var X = 0, V = this.length; X < V; X++) {
                    if (X in this) {
                        var W = this[X];
                        if (U.call(Z, this[X], X, this)) {
                            Y.push(W)
                        }
                    }
                }
                return Y
            },
            map: function(U, Y) {
                var X = [];
                for (var W = 0, V = this.length; W < V; W++) {
                    if (W in this) {
                        X[W] = U.call(Y, this[W], W, this)
                    }
                }
                return X
            }
        };
        K.implement(String, {
            $J_TYPE: "string",
            jTrim: function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function(U, V) {
                return (V || false) ? (this.toString() === U.toString()) : (this.toLowerCase().toString() === U.toLowerCase().toString())
            },
            jCamelize: function() {
                return this.replace(/-\D/g, function(U) {
                    return U.charAt(1).toUpperCase()
                })
            },
            dashize: function() {
                return this.replace(/[A-Z]/g, function(U) {
                    return ("-" + U.charAt(0).toLowerCase())
                })
            },
            jToInt: function(U) {
                return parseInt(this, U || 10)
            },
            toFloat: function() {
                return parseFloat(this)
            },
            jToBool: function() {
                return !this.replace(/true/i, "").jTrim()
            },
            has: function(V, U) {
                U = U || "";
                return (U + this + U).indexOf(U + V + U) > -1
            }
        });
        Q.implement(Function, {
            $J_TYPE: "function",
            jBind: function() {
                var V = K.$A(arguments),
                    U = this,
                    W = V.shift();
                return function() {
                    return U.apply(W || null, V.concat(K.$A(arguments)))
                }
            },
            jBindAsEvent: function() {
                var V = K.$A(arguments),
                    U = this,
                    W = V.shift();
                return function(X) {
                    return U.apply(W || null, K.$([X || (K.browser.ieMode ? window.event : null)]).concat(V))
                }
            },
            jDelay: function() {
                var V = K.$A(arguments),
                    U = this,
                    W = V.shift();
                return window.setTimeout(function() {
                    return U.apply(U, V)
                }, W || 0)
            },
            jDefer: function() {
                var V = K.$A(arguments),
                    U = this;
                return function() {
                    return U.jDelay.apply(U, V)
                }
            },
            interval: function() {
                var V = K.$A(arguments),
                    U = this,
                    W = V.shift();
                return window.setInterval(function() {
                    return U.apply(U, V)
                }, W || 0)
            }
        });
        var R = {},
            J = navigator.userAgent.toLowerCase(),
            I = J.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i),
            N = J.match(/(edge|opr)\/(\d+\.?\d*)/i) || J.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i),
            P = J.match(/version\/(\d+\.?\d*)/i),
            E = document.documentElement.style;

        function F(V) {
            var U = V.charAt(0).toUpperCase() + V.slice(1);
            return V in E || ("Webkit" + U) in E || ("Moz" + U) in E || ("ms" + U) in E || ("O" + U) in E
        }
        K.browser = {
            features: {
                xpath: !!(document.evaluate),
                air: !!(window.runtime),
                query: !!(document.querySelector),
                fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                transition: F("transition"),
                transform: F("transform"),
                perspective: F("perspective"),
                animation: F("animation"),
                requestAnimationFrame: false,
                multibackground: false,
                cssFilters: false,
                canvas: false,
                svg: (function() {
                    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
                })()
            },
            touchScreen: function() {
                return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
            }(),
            mobile: J.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/) ? true : false,
            engine: (I && I[1]) ? I[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (undefined !== document.getBoxObjectFor || null != window.mozInnerScreenY) ? "gecko" : (null !== window.WebKitPoint || !navigator.taintEnabled) ? "webkit" : "unknown",
            version: (I && I[2]) ? parseFloat(I[2]) : 0,
            uaName: (N && N[1]) ? N[1].toLowerCase() : "",
            uaVersion: (N && N[2]) ? parseFloat(N[2]) : 0,
            cssPrefix: "",
            cssDomPrefix: "",
            domPrefix: "",
            ieMode: 0,
            platform: J.match(/ip(?:ad|od|hone)/) ? "ios" : (J.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat: document.compatMode && "backcompat" == document.compatMode.toLowerCase(),
            scrollbarsWidth: 0,
            getDoc: function() {
                return (document.compatMode && "backcompat" == document.compatMode.toLowerCase()) ? document.body : document.documentElement
            },
            requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
            cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
            ready: false,
            onready: function() {
                if (K.browser.ready) {
                    return
                }
                var X, W;
                K.browser.ready = true;
                K.body = K.$(document.body);
                K.win = K.$(window);
                try {
                    var V = K.$new("div").jSetCss({
                        width: 100,
                        height: 100,
                        overflow: "scroll",
                        position: "absolute",
                        top: -9999
                    }).jAppendTo(document.body);
                    K.browser.scrollbarsWidth = V.offsetWidth - V.clientWidth;
                    V.jRemove()
                } catch (U) {}
                try {
                    X = K.$new("div");
                    W = X.style;
                    W.cssText = "background:url(https://),url(https://),red url(https://)";
                    K.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(W.background);
                    W = null;
                    X = null
                } catch (U) {}
                if (!K.browser.cssTransformProp) {
                    K.browser.cssTransformProp = K.normalizeCSS("transform").dashize()
                }
                try {
                    X = K.$new("div");
                    X.style.cssText = K.normalizeCSS("filter").dashize() + ":blur(2px);";
                    K.browser.features.cssFilters = !!X.style.length && (!K.browser.ieMode || K.browser.ieMode > 9);
                    X = null
                } catch (U) {}
                if (!K.browser.features.cssFilters) {
                    K.$(document.documentElement).jAddClass("no-cssfilters-magic")
                }
                try {
                    K.browser.features.canvas = (function() {
                        var Y = K.$new("canvas");
                        return !!(Y.getContext && Y.getContext("2d"))
                    })()
                } catch (U) {}
                if (undefined === window.TransitionEvent && undefined !== window.WebKitTransitionEvent) {
                    R.transitionend = "webkitTransitionEnd"
                }
                K.Doc.jCallEvent.call(K.$(document), "domready")
            }
        };
        (function() {
            var Z = [],
                Y, X, V;

            function U() {
                return !!(arguments.callee.caller)
            }
            switch (K.browser.engine) {
                case "trident":
                    if (!K.browser.version) {
                        K.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
                    }
                    break;
                case "gecko":
                    K.browser.version = (N && N[2]) ? parseFloat(N[2]) : 0;
                    break
            }
            K.browser[K.browser.engine] = true;
            if (N && "crios" === N[1]) {
                K.browser.uaName = "chrome"
            }
            if (!!window.chrome) {
                K.browser.chrome = true
            }
            if (N && "opr" === N[1]) {
                K.browser.uaName = "opera";
                K.browser.opera = true
            }
            if ("safari" === K.browser.uaName && (P && P[1])) {
                K.browser.uaVersion = parseFloat(P[1])
            }
            if ("android" == K.browser.platform && K.browser.webkit && (P && P[1])) {
                K.browser.androidBrowser = true
            }
            Y = ({
                gecko: ["-moz-", "Moz", "moz"],
                webkit: ["-webkit-", "Webkit", "webkit"],
                trident: ["-ms-", "ms", "ms"],
                presto: ["-o-", "O", "o"]
            })[K.browser.engine] || ["", "", ""];
            K.browser.cssPrefix = Y[0];
            K.browser.cssDomPrefix = Y[1];
            K.browser.domPrefix = Y[2];
            K.browser.ieMode = (!K.browser.trident) ? undefined : (document.documentMode) ? document.documentMode : function() {
                var aa = 0;
                if (K.browser.backCompat) {
                    return 5
                }
                switch (K.browser.version) {
                    case 2:
                        aa = 6;
                        break;
                    case 3:
                        aa = 7;
                        break
                }
                return aa
            }();
            Z.push(K.browser.platform + "-magic");
            if (K.browser.mobile) {
                Z.push("mobile-magic")
            }
            if (K.browser.androidBrowser) {
                Z.push("android-browser-magic")
            }
            if (K.browser.ieMode) {
                K.browser.uaName = "ie";
                K.browser.uaVersion = K.browser.ieMode;
                Z.push("ie" + K.browser.ieMode + "-magic");
                for (X = 11; X > K.browser.ieMode; X--) {
                    Z.push("lt-ie" + X + "-magic")
                }
            }
            if (K.browser.webkit && K.browser.version < 536) {
                K.browser.features.fullScreen = false
            }
            if (K.browser.requestAnimationFrame) {
                K.browser.requestAnimationFrame.call(window, function() {
                    K.browser.features.requestAnimationFrame = true
                })
            }
            if (K.browser.features.svg) {
                Z.push("svg-magic")
            } else {
                Z.push("no-svg-magic")
            }
            V = (document.documentElement.className || "").match(/\S+/g) || [];
            document.documentElement.className = K.$(V).concat(Z).join(" ");
            try {
                document.documentElement.setAttribute("data-magic-ua", K.browser.uaName);
                document.documentElement.setAttribute("data-magic-ua-ver", K.browser.uaVersion)
            } catch (W) {}
            if (K.browser.ieMode && K.browser.ieMode < 9) {
                document.createElement("figure");
                document.createElement("figcaption")
            }
        })();
        (function() {
            K.browser.fullScreen = {
                capable: K.browser.features.fullScreen,
                enabled: function() {
                    return !!(document.fullscreenElement || document[K.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[K.browser.domPrefix + "FullScreen"])
                },
                request: function(U, V) {
                    V || (V = {});
                    if (this.capable) {
                        K.$(document).jAddEvent(this.changeEventName, this.onchange = function(W) {
                            if (this.enabled()) {
                                V.onEnter && V.onEnter()
                            } else {
                                K.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                                V.onExit && V.onExit()
                            }
                        }.jBindAsEvent(this));
                        K.$(document).jAddEvent(this.errorEventName, this.onerror = function(W) {
                            V.fallback && V.fallback();
                            K.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                        }.jBindAsEvent(this));
                        (U[K.browser.domPrefix + "RequestFullscreen"] || U[K.browser.domPrefix + "RequestFullScreen"] || U.requestFullscreen || function() {}).call(U)
                    } else {
                        if (V.fallback) {
                            V.fallback()
                        }
                    }
                },
                cancel: (document.exitFullscreen || document.cancelFullScreen || document[K.browser.domPrefix + "ExitFullscreen"] || document[K.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
                changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : K.browser.domPrefix) + "fullscreenchange",
                errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : K.browser.domPrefix) + "fullscreenerror",
                prefix: K.browser.domPrefix,
                activeElement: null
            }
        })();
        var T = /\S+/g,
            H = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
            M = {
                "float": ("undefined" === typeof(E.styleFloat)) ? "cssFloat" : "styleFloat"
            },
            O = {
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                zIndex: true,
                zoom: true
            },
            G = (window.getComputedStyle) ? function(W, U) {
                var V = window.getComputedStyle(W, null);
                return V ? V.getPropertyValue(U) || V[U] : null
            } : function(X, V) {
                var W = X.currentStyle,
                    U = null;
                U = W ? W[V] : null;
                if (null == U && X.style && X.style[V]) {
                    U = X.style[V]
                }
                return U
            };

        function S(W) {
            var U, V;
            V = (K.browser.webkit && "filter" == W) ? false : (W in E);
            if (!V) {
                U = K.browser.cssDomPrefix + W.charAt(0).toUpperCase() + W.slice(1);
                if (U in E) {
                    return U
                }
            }
            return W
        }
        K.normalizeCSS = S;
        K.Element = {
            jHasClass: function(U) {
                return !(U || "").has(" ") && (this.className || "").has(U, " ")
            },
            jAddClass: function(Y) {
                var V = (this.className || "").match(T) || [],
                    X = (Y || "").match(T) || [],
                    U = X.length,
                    W = 0;
                for (; W < U; W++) {
                    if (!K.$(V).contains(X[W])) {
                        V.push(X[W])
                    }
                }
                this.className = V.join(" ");
                return this
            },
            jRemoveClass: function(Z) {
                var V = (this.className || "").match(T) || [],
                    Y = (Z || "").match(T) || [],
                    U = Y.length,
                    X = 0,
                    W;
                for (; X < U; X++) {
                    if ((W = K.$(V).indexOf(Y[X])) > -1) {
                        V.splice(W, 1)
                    }
                }
                this.className = Z ? V.join(" ") : "";
                return this
            },
            jToggleClass: function(U) {
                return this.jHasClass(U) ? this.jRemoveClass(U) : this.jAddClass(U)
            },
            jGetCss: function(V) {
                var W = V.jCamelize(),
                    U = null;
                V = M[W] || (M[W] = S(W));
                U = G(this, V);
                if ("auto" === U) {
                    U = null
                }
                if (null !== U) {
                    if ("opacity" == V) {
                        return K.defined(U) ? parseFloat(U) : 1
                    }
                    if (H.test(V)) {
                        U = parseInt(U, 10) ? U : "0px"
                    }
                }
                return U
            },
            jSetCssProp: function(V, U) {
                var X = V.jCamelize();
                try {
                    if ("opacity" == V) {
                        this.jSetOpacity(U);
                        return this
                    }
                    V = M[X] || (M[X] = S(X));
                    this.style[V] = U + (("number" == K.jTypeOf(U) && !O[X]) ? "px" : "")
                } catch (W) {}
                return this
            },
            jSetCss: function(V) {
                for (var U in V) {
                    this.jSetCssProp(U, V[U])
                }
                return this
            },
            jGetStyles: function() {
                var U = {};
                K.$A(arguments).jEach(function(V) {
                    U[V] = this.jGetCss(V)
                }, this);
                return U
            },
            jSetOpacity: function(W, U) {
                var V;
                U = U || false;
                this.style.opacity = W;
                W = parseInt(parseFloat(W) * 100);
                if (U) {
                    if (0 === W) {
                        if ("hidden" != this.style.visibility) {
                            this.style.visibility = "hidden"
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            this.style.visibility = "visible"
                        }
                    }
                }
                if (K.browser.ieMode && K.browser.ieMode < 9) {
                    if (!isNaN(W)) {
                        if (!~this.style.filter.indexOf("Alpha")) {
                            this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + W + ")"
                        } else {
                            this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + W)
                        }
                    } else {
                        this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                        if ("" === this.style.filter) {
                            this.style.removeAttribute("filter")
                        }
                    }
                }
                return this
            },
            setProps: function(U) {
                for (var V in U) {
                    if ("class" === V) {
                        this.jAddClass("" + U[V])
                    } else {
                        this.setAttribute(V, "" + U[V])
                    }
                }
                return this
            },
            jGetTransitionDuration: function() {
                var V = 0,
                    U = 0;
                V = this.jGetCss("transition-duration");
                U = this.jGetCss("transition-delay");
                V = V.indexOf("ms") > -1 ? parseFloat(V) : V.indexOf("s") > -1 ? parseFloat(V) * 1000 : 0;
                U = U.indexOf("ms") > -1 ? parseFloat(U) : U.indexOf("s") > -1 ? parseFloat(U) * 1000 : 0;
                return V + U
            },
            hide: function() {
                return this.jSetCss({
                    display: "none",
                    visibility: "hidden"
                })
            },
            show: function() {
                return this.jSetCss({
                    display: "",
                    visibility: "visible"
                })
            },
            jGetSize: function() {
                return {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                }
            },
            getInnerSize: function(V) {
                var U = this.jGetSize();
                U.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
                U.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
                if (!V) {
                    U.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                    U.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
                }
                return U
            },
            jGetScroll: function() {
                return {
                    top: this.scrollTop,
                    left: this.scrollLeft
                }
            },
            jGetFullScroll: function() {
                var U = this,
                    V = {
                        top: 0,
                        left: 0
                    };
                do {
                    V.left += U.scrollLeft || 0;
                    V.top += U.scrollTop || 0;
                    U = U.parentNode
                } while (U);
                return V
            },
            jGetPosition: function() {
                var Y = this,
                    V = 0,
                    X = 0;
                if (K.defined(document.documentElement.getBoundingClientRect)) {
                    var U = this.getBoundingClientRect(),
                        W = K.$(document).jGetScroll(),
                        Z = K.browser.getDoc();
                    return {
                        top: U.top + W.y - Z.clientTop,
                        left: U.left + W.x - Z.clientLeft
                    }
                }
                do {
                    V += Y.offsetLeft || 0;
                    X += Y.offsetTop || 0;
                    Y = Y.offsetParent
                } while (Y && !(/^(?:body|html)$/i).test(Y.tagName));
                return {
                    top: X,
                    left: V
                }
            },
            jGetRect: function() {
                var V = this.jGetPosition();
                var U = this.jGetSize();
                return {
                    top: V.top,
                    bottom: V.top + U.height,
                    left: V.left,
                    right: V.left + U.width
                }
            },
            changeContent: function(V) {
                try {
                    this.innerHTML = V
                } catch (U) {
                    this.innerText = V
                }
                return this
            },
            jRemove: function() {
                return (this.parentNode) ? this.parentNode.removeChild(this) : this
            },
            kill: function() {
                K.$A(this.childNodes).jEach(function(U) {
                    if (3 == U.nodeType || 8 == U.nodeType) {
                        return
                    }
                    K.$(U).kill()
                });
                this.jRemove();
                this.jClearEvents();
                if (this.$J_UUID) {
                    K.storage[this.$J_UUID] = null;
                    delete K.storage[this.$J_UUID]
                }
                return null
            },
            append: function(W, V) {
                V = V || "bottom";
                var U = this.firstChild;
                ("top" == V && U) ? this.insertBefore(W, U): this.appendChild(W);
                return this
            },
            jAppendTo: function(W, V) {
                var U = K.$(W).append(this, V);
                return this
            },
            enclose: function(U) {
                this.append(U.parentNode.replaceChild(this, U));
                return this
            },
            hasChild: function(U) {
                if ("element" !== K.jTypeOf("string" == K.jTypeOf(U) ? U = document.getElementById(U) : U)) {
                    return false
                }
                return (this == U) ? false : (this.contains && !(K.browser.webkit419)) ? (this.contains(U)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(U) & 16) : K.$A(this.byTag(U.tagName)).contains(U)
            }
        };
        K.Element.jGetStyle = K.Element.jGetCss;
        K.Element.jSetStyle = K.Element.jSetCss;
        if (!window.Element) {
            window.Element = K.$F;
            if (K.browser.engine.webkit) {
                window.document.createElement("iframe")
            }
            window.Element.prototype = (K.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
        }
        K.implement(window.Element, {
            $J_TYPE: "element"
        });
        K.Doc = {
            jGetSize: function() {
                if (K.browser.touchScreen || K.browser.presto925 || K.browser.webkit419) {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
                return {
                    width: K.browser.getDoc().clientWidth,
                    height: K.browser.getDoc().clientHeight
                }
            },
            jGetScroll: function() {
                return {
                    x: window.pageXOffset || K.browser.getDoc().scrollLeft,
                    y: window.pageYOffset || K.browser.getDoc().scrollTop
                }
            },
            jGetFullSize: function() {
                var U = this.jGetSize();
                return {
                    width: Math.max(K.browser.getDoc().scrollWidth, U.width),
                    height: Math.max(K.browser.getDoc().scrollHeight, U.height)
                }
            }
        };
        K.extend(document, {
            $J_TYPE: "document"
        });
        K.extend(window, {
            $J_TYPE: "window"
        });
        K.extend([K.Element, K.Doc], {
            jFetch: function(X, V) {
                var U = K.getStorage(this.$J_UUID),
                    W = U[X];
                if (undefined !== V && undefined === W) {
                    W = U[X] = V
                }
                return (K.defined(W) ? W : null)
            },
            jStore: function(W, V) {
                var U = K.getStorage(this.$J_UUID);
                U[W] = V;
                return this
            },
            jDel: function(V) {
                var U = K.getStorage(this.$J_UUID);
                delete U[V];
                return this
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            K.extend([K.Element, K.Doc], {
                getElementsByClassName: function(U) {
                    return K.$A(this.getElementsByTagName("*")).filter(function(W) {
                        try {
                            return (1 == W.nodeType && W.className.has(U, " "))
                        } catch (V) {}
                    })
                }
            })
        }
        K.extend([K.Element, K.Doc], {
            byClass: function() {
                return this.getElementsByClassName(arguments[0])
            },
            byTag: function() {
                return this.getElementsByTagName(arguments[0])
            }
        });
        if (K.browser.fullScreen.capable && !document.requestFullScreen) {
            K.Element.requestFullScreen = function() {
                K.browser.fullScreen.request(this)
            }
        }
        K.Event = {
            $J_TYPE: "event",
            isQueueStopped: K.$false,
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                if (this.stopPropagation) {
                    this.stopPropagation()
                } else {
                    this.cancelBubble = true
                }
                return this
            },
            stopDefaults: function() {
                if (this.preventDefault) {
                    this.preventDefault()
                } else {
                    this.returnValue = false
                }
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = K.$true;
                return this
            },
            getClientXY: function() {
                var V, U;
                V = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!K.defined(V)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: V.clientX,
                    y: V.clientY
                }
            },
            jGetPageXY: function() {
                var V, U;
                V = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!K.defined(V)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: V.pageX || V.clientX + K.browser.getDoc().scrollLeft,
                    y: V.pageY || V.clientY + K.browser.getDoc().scrollTop
                }
            },
            getTarget: function() {
                var U = this.target || this.srcElement;
                while (U && 3 == U.nodeType) {
                    U = U.parentNode
                }
                return U
            },
            getRelated: function() {
                var V = null;
                switch (this.type) {
                    case "mouseover":
                    case "pointerover":
                    case "MSPointerOver":
                        V = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        V = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return V
                }
                try {
                    while (V && 3 == V.nodeType) {
                        V = V.parentNode
                    }
                } catch (U) {
                    V = null
                }
                return V
            },
            getButton: function() {
                if (!this.which && this.button !== undefined) {
                    return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
                }
                return this.which
            },
            isTouchEvent: function() {
                return (this.pointerType && ("touch" === this.pointerType || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
            },
            isPrimaryTouch: function() {
                return this.pointerType ? (("touch" === this.pointerType || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary) : 1 === this.changedTouches.length && (this.targetTouches.length ? this.targetTouches[0].identifier == this.changedTouches[0].identifier : true)
            }
        };
        K._event_add_ = "addEventListener";
        K._event_del_ = "removeEventListener";
        K._event_prefix_ = "";
        if (!document.addEventListener) {
            K._event_add_ = "attachEvent";
            K._event_del_ = "detachEvent";
            K._event_prefix_ = "on"
        }
        K.Event.Custom = {
            type: "",
            x: null,
            y: null,
            timeStamp: null,
            button: null,
            target: null,
            relatedTarget: null,
            $J_TYPE: "event.custom",
            isQueueStopped: K.$false,
            events: K.$([]),
            pushToEvents: function(U) {
                var V = U;
                this.events.push(V)
            },
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                this.events.jEach(function(V) {
                    try {
                        V.stopDistribution()
                    } catch (U) {}
                });
                return this
            },
            stopDefaults: function() {
                this.events.jEach(function(V) {
                    try {
                        V.stopDefaults()
                    } catch (U) {}
                });
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = K.$true;
                return this
            },
            getClientXY: function() {
                return {
                    x: this.clientX,
                    y: this.clientY
                }
            },
            jGetPageXY: function() {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            getTarget: function() {
                return this.target
            },
            getRelated: function() {
                return this.relatedTarget
            },
            getButton: function() {
                return this.button
            },
            getOriginalTarget: function() {
                return this.events.length > 0 ? this.events[0].getTarget() : undefined
            }
        };
        K.extend([K.Element, K.Doc], {
            jAddEvent: function(W, Y, Z, ac) {
                var ab, U, X, aa, V;
                if ("string" == K.jTypeOf(W)) {
                    V = W.split(" ");
                    if (V.length > 1) {
                        W = V
                    }
                }
                if (K.jTypeOf(W) == "array") {
                    K.$(W).jEach(this.jAddEvent.jBindAsEvent(this, Y, Z, ac));
                    return this
                }
                if (!W || !Y || K.jTypeOf(W) != "string" || K.jTypeOf(Y) != "function") {
                    return this
                }
                if (W == "domready" && K.browser.ready) {
                    Y.call(this);
                    return this
                }
                W = R[W] || W;
                Z = parseInt(Z || 50);
                if (!Y.$J_EUID) {
                    Y.$J_EUID = Math.floor(Math.random() * K.now())
                }
                ab = K.Doc.jFetch.call(this, "_EVENTS_", {});
                U = ab[W];
                if (!U) {
                    ab[W] = U = K.$([]);
                    X = this;
                    if (K.Event.Custom[W]) {
                        K.Event.Custom[W].handler.add.call(this, ac)
                    } else {
                        U.handle = function(ad) {
                            ad = K.extend(ad || window.e, {
                                $J_TYPE: "event"
                            });
                            K.Doc.jCallEvent.call(X, W, K.$(ad))
                        };
                        this[K._event_add_](K._event_prefix_ + W, U.handle, false)
                    }
                }
                aa = {
                    type: W,
                    fn: Y,
                    priority: Z,
                    euid: Y.$J_EUID
                };
                U.push(aa);
                U.sort(function(ae, ad) {
                    return ae.priority - ad.priority
                });
                return this
            },
            jRemoveEvent: function(aa) {
                var Y = K.Doc.jFetch.call(this, "_EVENTS_", {}),
                    W, U, V, ab, Z, X;
                Z = arguments.length > 1 ? arguments[1] : -100;
                if ("string" == K.jTypeOf(aa)) {
                    X = aa.split(" ");
                    if (X.length > 1) {
                        aa = X
                    }
                }
                if (K.jTypeOf(aa) == "array") {
                    K.$(aa).jEach(this.jRemoveEvent.jBindAsEvent(this, Z));
                    return this
                }
                aa = R[aa] || aa;
                if (!aa || K.jTypeOf(aa) != "string" || !Y || !Y[aa]) {
                    return this
                }
                W = Y[aa] || [];
                for (V = 0; V < W.length; V++) {
                    U = W[V];
                    if (-100 == Z || !!Z && Z.$J_EUID === U.euid) {
                        ab = W.splice(V--, 1)
                    }
                }
                if (0 === W.length) {
                    if (K.Event.Custom[aa]) {
                        K.Event.Custom[aa].handler.jRemove.call(this)
                    } else {
                        this[K._event_del_](K._event_prefix_ + aa, W.handle, false)
                    }
                    delete Y[aa]
                }
                return this
            },
            jCallEvent: function(Y, aa) {
                var X = K.Doc.jFetch.call(this, "_EVENTS_", {}),
                    W, U, V;
                Y = R[Y] || Y;
                if (!Y || K.jTypeOf(Y) != "string" || !X || !X[Y]) {
                    return this
                }
                try {
                    aa = K.extend(aa || {}, {
                        type: Y
                    })
                } catch (Z) {}
                if (undefined === aa.timeStamp) {
                    aa.timeStamp = K.now()
                }
                W = X[Y] || [];
                for (V = 0; V < W.length && !(aa.isQueueStopped && aa.isQueueStopped()); V++) {
                    W[V].fn.call(this, aa)
                }
            },
            jRaiseEvent: function(V, U) {
                var Y = ("domready" == V) ? false : true,
                    X = this,
                    W;
                V = R[V] || V;
                if (!Y) {
                    K.Doc.jCallEvent.call(this, V);
                    return this
                }
                if (X === document && document.createEvent && !X.dispatchEvent) {
                    X = document.documentElement
                }
                if (document.createEvent) {
                    W = document.createEvent(V);
                    W.initEvent(U, true, true)
                } else {
                    W = document.createEventObject();
                    W.eventType = V
                }
                if (document.createEvent) {
                    X.dispatchEvent(W)
                } else {
                    X.fireEvent("on" + U, W)
                }
                return W
            },
            jClearEvents: function() {
                var V = K.Doc.jFetch.call(this, "_EVENTS_");
                if (!V) {
                    return this
                }
                for (var U in V) {
                    K.Doc.jRemoveEvent.call(this, U)
                }
                K.Doc.jDel.call(this, "_EVENTS_");
                return this
            }
        });
        (function(U) {
            if ("complete" === document.readyState) {
                return U.browser.onready.jDelay(1)
            }
            if (U.browser.webkit && U.browser.version < 420) {
                (function() {
                    (U.$(["loaded", "complete"]).contains(document.readyState)) ? U.browser.onready(): arguments.callee.jDelay(50)
                })()
            } else {
                if (U.browser.trident && U.browser.ieMode < 9 && window == top) {
                    (function() {
                        (U.$try(function() {
                            U.browser.getDoc().doScroll("left");
                            return true
                        })) ? U.browser.onready(): arguments.callee.jDelay(50)
                    })()
                } else {
                    U.Doc.jAddEvent.call(U.$(document), "DOMContentLoaded", U.browser.onready);
                    U.Doc.jAddEvent.call(U.$(window), "load", U.browser.onready)
                }
            }
        })(Q);
        K.Class = function() {
            var Y = null,
                V = K.$A(arguments);
            if ("class" == K.jTypeOf(V[0])) {
                Y = V.shift()
            }
            var U = function() {
                for (var ab in this) {
                    this[ab] = K.detach(this[ab])
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var ad = this.constructor.$parent;
                    for (var ac in ad) {
                        var aa = ad[ac];
                        switch (K.jTypeOf(aa)) {
                            case "function":
                                this.$parent[ac] = K.Class.wrap(this, aa);
                                break;
                            case "object":
                                this.$parent[ac] = K.detach(aa);
                                break;
                            case "array":
                                this.$parent[ac] = K.detach(aa);
                                break
                        }
                    }
                }
                var Z = (this.init) ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return Z
            };
            if (!U.prototype.init) {
                U.prototype.init = K.$F
            }
            if (Y) {
                var X = function() {};
                X.prototype = Y.prototype;
                U.prototype = new X;
                U.$parent = {};
                for (var W in Y.prototype) {
                    U.$parent[W] = Y.prototype[W]
                }
            } else {
                U.$parent = null
            }
            U.constructor = K.Class;
            U.prototype.constructor = U;
            K.extend(U.prototype, V[0]);
            K.extend(U, {
                $J_TYPE: "class"
            });
            return U
        };
        Q.Class.wrap = function(U, V) {
            return function() {
                var X = this.caller;
                var W = V.apply(U, arguments);
                return W
            }
        };
        (function(X) {
            var W = X.$;
            var U = 5,
                V = 300;
            X.Event.Custom.btnclick = new X.Class(X.extend(X.Event.Custom, {
                type: "btnclick",
                init: function(aa, Z) {
                    var Y = Z.jGetPageXY();
                    this.x = Y.x;
                    this.y = Y.y;
                    this.clientX = Z.clientX;
                    this.clientY = Z.clientY;
                    this.timeStamp = Z.timeStamp;
                    this.button = Z.getButton();
                    this.target = aa;
                    this.pushToEvents(Z)
                }
            }));
            X.Event.Custom.btnclick.handler = {
                options: {
                    threshold: V,
                    button: 1
                },
                add: function(Y) {
                    this.jStore("event:btnclick:options", X.extend(X.detach(X.Event.Custom.btnclick.handler.options), Y || {}));
                    this.jAddEvent("mousedown", X.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("mouseup", X.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("click", X.Event.Custom.btnclick.handler.onclick, 1);
                    if (X.browser.trident && X.browser.ieMode < 9) {
                        this.jAddEvent("dblclick", X.Event.Custom.btnclick.handler.handle, 1)
                    }
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", X.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("mouseup", X.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("click", X.Event.Custom.btnclick.handler.onclick);
                    if (X.browser.trident && X.browser.ieMode < 9) {
                        this.jRemoveEvent("dblclick", X.Event.Custom.btnclick.handler.handle)
                    }
                },
                onclick: function(Y) {
                    Y.stopDefaults()
                },
                handle: function(ab) {
                    var aa, Y, Z;
                    Y = this.jFetch("event:btnclick:options");
                    if (ab.type != "dblclick" && ab.getButton() != Y.button) {
                        return
                    }
                    if (this.jFetch("event:btnclick:ignore")) {
                        this.jDel("event:btnclick:ignore");
                        return
                    }
                    if ("mousedown" == ab.type) {
                        aa = new X.Event.Custom.btnclick(this, ab);
                        this.jStore("event:btnclick:btnclickEvent", aa)
                    } else {
                        if ("mouseup" == ab.type) {
                            aa = this.jFetch("event:btnclick:btnclickEvent");
                            if (!aa) {
                                return
                            }
                            Z = ab.jGetPageXY();
                            this.jDel("event:btnclick:btnclickEvent");
                            aa.pushToEvents(ab);
                            if (ab.timeStamp - aa.timeStamp <= Y.threshold && Math.sqrt(Math.pow(Z.x - aa.x, 2) + Math.pow(Z.y - aa.y, 2)) <= U) {
                                this.jCallEvent("btnclick", aa)
                            }
                            document.jCallEvent("mouseup", ab)
                        } else {
                            if (ab.type == "dblclick") {
                                aa = new X.Event.Custom.btnclick(this, ab);
                                this.jCallEvent("btnclick", aa)
                            }
                        }
                    }
                }
            }
        })(Q);
        (function(V) {
            var U = V.$;
            V.Event.Custom.mousedrag = new V.Class(V.extend(V.Event.Custom, {
                type: "mousedrag",
                state: "dragstart",
                dragged: false,
                init: function(Z, Y, X) {
                    var W = Y.jGetPageXY();
                    this.x = W.x;
                    this.y = W.y;
                    this.clientX = Y.clientX;
                    this.clientY = Y.clientY;
                    this.timeStamp = Y.timeStamp;
                    this.button = Y.getButton();
                    this.target = Z;
                    this.pushToEvents(Y);
                    this.state = X
                }
            }));
            V.Event.Custom.mousedrag.handler = {
                add: function() {
                    var X = V.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this),
                        W = V.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", V.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                    this.jAddEvent("mouseup", V.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                    document.jAddEvent("mousemove", X, 1);
                    document.jAddEvent("mouseup", W, 1);
                    this.jStore("event:mousedrag:listeners:document:move", X);
                    this.jStore("event:mousedrag:listeners:document:end", W)
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", V.Event.Custom.mousedrag.handler.handleMouseDown);
                    this.jRemoveEvent("mouseup", V.Event.Custom.mousedrag.handler.handleMouseUp);
                    U(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || V.$F);
                    U(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || V.$F);
                    this.jDel("event:mousedrag:listeners:document:move");
                    this.jDel("event:mousedrag:listeners:document:end")
                },
                handleMouseDown: function(X) {
                    var W;
                    if (1 != X.getButton()) {
                        return
                    }
                    W = new V.Event.Custom.mousedrag(this, X, "dragstart");
                    this.jStore("event:mousedrag:dragstart", W)
                },
                handleMouseUp: function(X) {
                    var W;
                    W = this.jFetch("event:mousedrag:dragstart");
                    if (!W) {
                        return
                    }
                    X.stopDefaults();
                    W = new V.Event.Custom.mousedrag(this, X, "dragend");
                    this.jDel("event:mousedrag:dragstart");
                    this.jCallEvent("mousedrag", W)
                },
                handleMouseMove: function(X) {
                    var W;
                    W = this.jFetch("event:mousedrag:dragstart");
                    if (!W) {
                        return
                    }
                    X.stopDefaults();
                    if (!W.dragged) {
                        W.dragged = true;
                        this.jCallEvent("mousedrag", W)
                    }
                    W = new V.Event.Custom.mousedrag(this, X, "dragmove");
                    this.jCallEvent("mousedrag", W)
                }
            }
        })(Q);
        (function(V) {
            var U = V.$;
            V.Event.Custom.dblbtnclick = new V.Class(V.extend(V.Event.Custom, {
                type: "dblbtnclick",
                timedout: false,
                tm: null,
                init: function(Y, X) {
                    var W = X.jGetPageXY();
                    this.x = W.x;
                    this.y = W.y;
                    this.clientX = X.clientX;
                    this.clientY = X.clientY;
                    this.timeStamp = X.timeStamp;
                    this.button = X.getButton();
                    this.target = Y;
                    this.pushToEvents(X)
                }
            }));
            V.Event.Custom.dblbtnclick.handler = {
                options: {
                    threshold: 200
                },
                add: function(W) {
                    this.jStore("event:dblbtnclick:options", V.extend(V.detach(V.Event.Custom.dblbtnclick.handler.options), W || {}));
                    this.jAddEvent("btnclick", V.Event.Custom.dblbtnclick.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent("btnclick", V.Event.Custom.dblbtnclick.handler.handle)
                },
                handle: function(Y) {
                    var X, W;
                    X = this.jFetch("event:dblbtnclick:event");
                    W = this.jFetch("event:dblbtnclick:options");
                    if (!X) {
                        X = new V.Event.Custom.dblbtnclick(this, Y);
                        X.tm = setTimeout(function() {
                            X.timedout = true;
                            Y.isQueueStopped = V.$false;
                            this.jCallEvent("btnclick", Y);
                            this.jDel("event:dblbtnclick:event")
                        }.jBind(this), W.threshold + 10);
                        this.jStore("event:dblbtnclick:event", X);
                        Y.stopQueue()
                    } else {
                        clearTimeout(X.tm);
                        this.jDel("event:dblbtnclick:event");
                        if (!X.timedout) {
                            X.pushToEvents(Y);
                            Y.stopQueue().stop();
                            this.jCallEvent("dblbtnclick", X)
                        } else {}
                    }
                }
            }
        })(Q);
        (function(aa) {
            var Z = aa.$;

            function U(ab) {
                return ab.pointerType ? (("touch" === ab.pointerType || ab.MSPOINTER_TYPE_TOUCH === ab.pointerType) && ab.isPrimary) : 1 === ab.changedTouches.length && (ab.targetTouches.length ? ab.targetTouches[0].identifier == ab.changedTouches[0].identifier : true)
            }

            function W(ab) {
                if (ab.pointerType) {
                    return ("touch" === ab.pointerType || ab.MSPOINTER_TYPE_TOUCH === ab.pointerType) ? ab.pointerId : null
                } else {
                    return ab.changedTouches[0].identifier
                }
            }

            function X(ab) {
                if (ab.pointerType) {
                    return ("touch" === ab.pointerType || ab.MSPOINTER_TYPE_TOUCH === ab.pointerType) ? ab : null
                } else {
                    return ab.changedTouches[0]
                }
            }
            aa.Event.Custom.tap = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "tap",
                id: null,
                init: function(ac, ab) {
                    var ad = X(ab);
                    this.id = ad.pointerId || ad.identifier;
                    this.x = ad.pageX;
                    this.y = ad.pageY;
                    this.pageX = ad.pageX;
                    this.pageY = ad.pageY;
                    this.clientX = ad.clientX;
                    this.clientY = ad.clientY;
                    this.timeStamp = ab.timeStamp;
                    this.button = 0;
                    this.target = ac;
                    this.pushToEvents(ab)
                }
            }));
            var V = 10,
                Y = 200;
            aa.Event.Custom.tap.handler = {
                add: function(ab) {
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], aa.Event.Custom.tap.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], aa.Event.Custom.tap.handler.onTouchEnd, 1);
                    this.jAddEvent("click", aa.Event.Custom.tap.handler.onClick, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], aa.Event.Custom.tap.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], aa.Event.Custom.tap.handler.onTouchEnd);
                    this.jRemoveEvent("click", aa.Event.Custom.tap.handler.onClick)
                },
                onClick: function(ab) {
                    ab.stopDefaults()
                },
                onTouchStart: function(ab) {
                    if (!U(ab)) {
                        this.jDel("event:tap:event");
                        return
                    }
                    this.jStore("event:tap:event", new aa.Event.Custom.tap(this, ab));
                    this.jStore("event:btnclick:ignore", true)
                },
                onTouchEnd: function(ae) {
                    var ac = aa.now(),
                        ad = this.jFetch("event:tap:event"),
                        ab = this.jFetch("event:tap:options");
                    if (!ad || !U(ae)) {
                        return
                    }
                    this.jDel("event:tap:event");
                    if (ad.id == W(ae) && ae.timeStamp - ad.timeStamp <= Y && Math.sqrt(Math.pow(X(ae).pageX - ad.x, 2) + Math.pow(X(ae).pageY - ad.y, 2)) <= V) {
                        this.jDel("event:btnclick:btnclickEvent");
                        ae.stop();
                        ad.pushToEvents(ae);
                        this.jCallEvent("tap", ad)
                    }
                }
            }
        })(Q);
        K.Event.Custom.dbltap = new K.Class(K.extend(K.Event.Custom, {
            type: "dbltap",
            timedout: false,
            tm: null,
            init: function(V, U) {
                this.x = U.x;
                this.y = U.y;
                this.clientX = U.clientX;
                this.clientY = U.clientY;
                this.timeStamp = U.timeStamp;
                this.button = 0;
                this.target = V;
                this.pushToEvents(U)
            }
        }));
        K.Event.Custom.dbltap.handler = {
            options: {
                threshold: 300
            },
            add: function(U) {
                this.jStore("event:dbltap:options", K.extend(K.detach(K.Event.Custom.dbltap.handler.options), U || {}));
                this.jAddEvent("tap", K.Event.Custom.dbltap.handler.handle, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("tap", K.Event.Custom.dbltap.handler.handle)
            },
            handle: function(W) {
                var V, U;
                V = this.jFetch("event:dbltap:event");
                U = this.jFetch("event:dbltap:options");
                if (!V) {
                    V = new K.Event.Custom.dbltap(this, W);
                    V.tm = setTimeout(function() {
                        V.timedout = true;
                        W.isQueueStopped = K.$false;
                        this.jCallEvent("tap", W)
                    }.jBind(this), U.threshold + 10);
                    this.jStore("event:dbltap:event", V);
                    W.stopQueue()
                } else {
                    clearTimeout(V.tm);
                    this.jDel("event:dbltap:event");
                    if (!V.timedout) {
                        V.pushToEvents(W);
                        W.stopQueue().stop();
                        this.jCallEvent("dbltap", V)
                    } else {}
                }
            }
        };
        (function(Z) {
            var Y = Z.$;

            function U(aa) {
                return aa.pointerType ? (("touch" === aa.pointerType || aa.MSPOINTER_TYPE_TOUCH === aa.pointerType) && aa.isPrimary) : 1 === aa.changedTouches.length && (aa.targetTouches.length ? aa.targetTouches[0].identifier == aa.changedTouches[0].identifier : true)
            }

            function W(aa) {
                if (aa.pointerType) {
                    return ("touch" === aa.pointerType || aa.MSPOINTER_TYPE_TOUCH === aa.pointerType) ? aa.pointerId : null
                } else {
                    return aa.changedTouches[0].identifier
                }
            }

            function X(aa) {
                if (aa.pointerType) {
                    return ("touch" === aa.pointerType || aa.MSPOINTER_TYPE_TOUCH === aa.pointerType) ? aa : null
                } else {
                    return aa.changedTouches[0]
                }
            }
            var V = 10;
            Z.Event.Custom.touchdrag = new Z.Class(Z.extend(Z.Event.Custom, {
                type: "touchdrag",
                state: "dragstart",
                id: null,
                dragged: false,
                init: function(ac, ab, aa) {
                    var ad = X(ab);
                    this.id = ad.pointerId || ad.identifier;
                    this.clientX = ad.clientX;
                    this.clientY = ad.clientY;
                    this.pageX = ad.pageX;
                    this.pageY = ad.pageY;
                    this.x = ad.pageX;
                    this.y = ad.pageY;
                    this.timeStamp = ab.timeStamp;
                    this.button = 0;
                    this.target = ac;
                    this.pushToEvents(ab);
                    this.state = aa
                }
            }));
            Z.Event.Custom.touchdrag.handler = {
                add: function() {
                    var ab = Z.Event.Custom.touchdrag.handler.onTouchMove.jBind(this),
                        aa = Z.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], Z.Event.Custom.touchdrag.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], Z.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], Z.Event.Custom.touchdrag.handler.onTouchMove, 1);
                    this.jStore("event:touchdrag:listeners:document:move", ab);
                    this.jStore("event:touchdrag:listeners:document:end", aa);
                    Y(document).jAddEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", ab, 1);
                    Y(document).jAddEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", aa, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], Z.Event.Custom.touchdrag.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], Z.Event.Custom.touchdrag.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], Z.Event.Custom.touchdrag.handler.onTouchMove);
                    Y(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", this.jFetch("event:touchdrag:listeners:document:move") || Z.$F, 1);
                    Y(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", this.jFetch("event:touchdrag:listeners:document:end") || Z.$F, 1);
                    this.jDel("event:touchdrag:listeners:document:move");
                    this.jDel("event:touchdrag:listeners:document:end")
                },
                onTouchStart: function(ab) {
                    var aa;
                    if (!U(ab)) {
                        return
                    }
                    aa = new Z.Event.Custom.touchdrag(this, ab, "dragstart");
                    this.jStore("event:touchdrag:dragstart", aa)
                },
                onTouchEnd: function(ab) {
                    var aa;
                    aa = this.jFetch("event:touchdrag:dragstart");
                    if (!aa || !aa.dragged || aa.id != W(ab)) {
                        return
                    }
                    aa = new Z.Event.Custom.touchdrag(this, ab, "dragend");
                    this.jDel("event:touchdrag:dragstart");
                    this.jCallEvent("touchdrag", aa)
                },
                onTouchMove: function(ab) {
                    var aa;
                    aa = this.jFetch("event:touchdrag:dragstart");
                    if (!aa || !U(ab)) {
                        return
                    }
                    if (aa.id != W(ab)) {
                        this.jDel("event:touchdrag:dragstart");
                        return
                    }
                    if (!aa.dragged && Math.sqrt(Math.pow(X(ab).pageX - aa.x, 2) + Math.pow(X(ab).pageY - aa.y, 2)) > V) {
                        aa.dragged = true;
                        this.jCallEvent("touchdrag", aa)
                    }
                    if (!aa.dragged) {
                        return
                    }
                    aa = new Z.Event.Custom.touchdrag(this, ab, "dragmove");
                    this.jCallEvent("touchdrag", aa)
                }
            }
        })(Q);
        K.Event.Custom.touchpinch = new K.Class(K.extend(K.Event.Custom, {
            type: "touchpinch",
            scale: 1,
            previousScale: 1,
            curScale: 1,
            state: "pinchstart",
            init: function(V, U) {
                this.timeStamp = U.timeStamp;
                this.button = 0;
                this.target = V;
                this.x = U.touches[0].clientX + (U.touches[1].clientX - U.touches[0].clientX) / 2;
                this.y = U.touches[0].clientY + (U.touches[1].clientY - U.touches[0].clientY) / 2;
                this._initialDistance = Math.sqrt(Math.pow(U.touches[0].clientX - U.touches[1].clientX, 2) + Math.pow(U.touches[0].clientY - U.touches[1].clientY, 2));
                this.pushToEvents(U)
            },
            update: function(U) {
                var V;
                this.state = "pinchupdate";
                if (U.changedTouches[0].identifier != this.events[0].touches[0].identifier || U.changedTouches[1].identifier != this.events[0].touches[1].identifier) {
                    return
                }
                V = Math.sqrt(Math.pow(U.changedTouches[0].clientX - U.changedTouches[1].clientX, 2) + Math.pow(U.changedTouches[0].clientY - U.changedTouches[1].clientY, 2));
                this.previousScale = this.scale;
                this.scale = V / this._initialDistance;
                this.curScale = this.scale / this.previousScale;
                this.x = U.changedTouches[0].clientX + (U.changedTouches[1].clientX - U.changedTouches[0].clientX) / 2;
                this.y = U.changedTouches[0].clientY + (U.changedTouches[1].clientY - U.changedTouches[0].clientY) / 2;
                this.pushToEvents(U)
            }
        }));
        K.Event.Custom.touchpinch.handler = {
            add: function() {
                this.jAddEvent("touchstart", K.Event.Custom.touchpinch.handler.handleTouchStart, 1);
                this.jAddEvent("touchend", K.Event.Custom.touchpinch.handler.handleTouchEnd, 1);
                this.jAddEvent("touchmove", K.Event.Custom.touchpinch.handler.handleTouchMove, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("touchstart", K.Event.Custom.touchpinch.handler.handleTouchStart);
                this.jRemoveEvent("touchend", K.Event.Custom.touchpinch.handler.handleTouchEnd);
                this.jRemoveEvent("touchmove", K.Event.Custom.touchpinch.handler.handleTouchMove)
            },
            handleTouchStart: function(V) {
                var U;
                if (V.touches.length != 2) {
                    return
                }
                V.stopDefaults();
                U = new K.Event.Custom.touchpinch(this, V);
                this.jStore("event:touchpinch:event", U)
            },
            handleTouchEnd: function(V) {
                var U;
                U = this.jFetch("event:touchpinch:event");
                if (!U) {
                    return
                }
                V.stopDefaults();
                this.jDel("event:touchpinch:event")
            },
            handleTouchMove: function(V) {
                var U;
                U = this.jFetch("event:touchpinch:event");
                if (!U) {
                    return
                }
                V.stopDefaults();
                U.update(V);
                this.jCallEvent("touchpinch", U)
            }
        };
        (function(Z) {
            var X = Z.$;
            Z.Event.Custom.mousescroll = new Z.Class(Z.extend(Z.Event.Custom, {
                type: "mousescroll",
                init: function(af, ae, ah, ab, aa, ag, ac) {
                    var ad = ae.jGetPageXY();
                    this.x = ad.x;
                    this.y = ad.y;
                    this.timeStamp = ae.timeStamp;
                    this.target = af;
                    this.delta = ah || 0;
                    this.deltaX = ab || 0;
                    this.deltaY = aa || 0;
                    this.deltaZ = ag || 0;
                    this.deltaFactor = ac || 0;
                    this.deltaMode = ae.deltaMode || 0;
                    this.isMouse = false;
                    this.pushToEvents(ae)
                }
            }));
            var Y, V;

            function U() {
                Y = null
            }

            function W(aa, ab) {
                return (aa > 50) || (1 === ab && !("win" == Z.browser.platform && aa < 1)) || (0 === aa % 12) || (0 == aa % 4.000244140625)
            }
            Z.Event.Custom.mousescroll.handler = {
                eventType: "onwheel" in document || Z.browser.ieMode > 8 ? "wheel" : "mousewheel",
                add: function() {
                    this.jAddEvent(Z.Event.Custom.mousescroll.handler.eventType, Z.Event.Custom.mousescroll.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(Z.Event.Custom.mousescroll.handler.eventType, Z.Event.Custom.mousescroll.handler.handle, 1)
                },
                handle: function(af) {
                    var ag = 0,
                        ad = 0,
                        ab = 0,
                        aa = 0,
                        ae, ac;
                    if (af.detail) {
                        ab = af.detail * -1
                    }
                    if (af.wheelDelta !== undefined) {
                        ab = af.wheelDelta
                    }
                    if (af.wheelDeltaY !== undefined) {
                        ab = af.wheelDeltaY
                    }
                    if (af.wheelDeltaX !== undefined) {
                        ad = af.wheelDeltaX * -1
                    }
                    if (af.deltaY) {
                        ab = -1 * af.deltaY
                    }
                    if (af.deltaX) {
                        ad = af.deltaX
                    }
                    if (0 === ab && 0 === ad) {
                        return
                    }
                    ag = 0 === ab ? ad : ab;
                    aa = Math.max(Math.abs(ab), Math.abs(ad));
                    if (!Y || aa < Y) {
                        Y = aa
                    }
                    ae = ag > 0 ? "floor" : "ceil";
                    ag = Math[ae](ag / Y);
                    ad = Math[ae](ad / Y);
                    ab = Math[ae](ab / Y);
                    if (V) {
                        clearTimeout(V)
                    }
                    V = setTimeout(U, 200);
                    ac = new Z.Event.Custom.mousescroll(this, af, ag, ad, ab, 0, Y);
                    ac.isMouse = W(Y, af.deltaMode || 0);
                    this.jCallEvent("mousescroll", ac)
                }
            }
        })(Q);
        K.win = K.$(window);
        K.doc = K.$(document);
        return Q
    })();
    (function(G) {
        if (!G) {
            throw "MagicJS not found"
        }
        var F = G.$;
        var E = window.URL || window.webkitURL || null;
        x.ImageLoader = new G.Class({
            img: null,
            ready: false,
            options: {
                onprogress: G.$F,
                onload: G.$F,
                onabort: G.$F,
                onerror: G.$F,
                oncomplete: G.$F,
                onxhrerror: G.$F,
                xhr: false,
                progressiveLoad: true
            },
            size: null,
            _timer: null,
            loadedBytes: 0,
            _handlers: {
                onprogress: function(H) {
                    if (H.target && (200 === H.target.status || 304 === H.target.status) && H.lengthComputable) {
                        this.options.onprogress.jBind(null, (H.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / H.total).jDelay(1);
                        this.loadedBytes = H.loaded
                    }
                },
                onload: function(H) {
                    if (H) {
                        F(H).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onabort: function(H) {
                    if (H) {
                        F(H).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(H) {
                    if (H) {
                        F(H).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                F(["load", "abort", "error"]).jEach(function(H) {
                    this.img.jAddEvent(H, this._handlers["on" + H].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (H) {}
                    this._timer = null
                }
                F(["load", "abort", "error"]).jEach(function(I) {
                    this.img.jRemoveEvent(I)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var H = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    H.kill()
                }
            },
            loadBlob: function(I) {
                var J = new XMLHttpRequest(),
                    H;
                F(["abort", "progress"]).jEach(function(K) {
                    J["on" + K] = F(function(L) {
                        this._handlers["on" + K].call(this, L)
                    }).jBind(this)
                }, this);
                J.onerror = F(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1);
                    this.options.xhr = false;
                    this._bind();
                    this.img.src = I
                }).jBind(this);
                J.onload = F(function() {
                    if (200 !== J.status && 304 !== J.status) {
                        this._handlers.onerror.call(this);
                        return
                    }
                    H = J.response;
                    this._bind();
                    if (E && !G.browser.trident && !("ios" === G.browser.platform && G.browser.version < 537)) {
                        this.img.setAttribute("src", E.createObjectURL(H))
                    } else {
                        this.img.src = I
                    }
                }).jBind(this);
                J.open("GET", I);
                J.responseType = "blob";
                J.send()
            },
            init: function(I, H) {
                this.options = G.extend(this.options, H);
                this.img = F(I) || G.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).jAppendTo(G.$new("div").jAddClass("magic-temporary-img").jSetCss({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                if (G.browser.features.xhr2 && this.options.xhr && "string" == G.jTypeOf(I)) {
                    this.loadBlob(I);
                    return
                }
                var J = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    J = null
                }.jBind(this);
                this._bind();
                if ("string" == G.jTypeOf(I)) {
                    this.img.src = I
                } else {
                    if (G.browser.trident && 5 == G.browser.version && G.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                J && J()
                            }
                        }.jBind(this)
                    }
                    this.img.src = I.getAttribute("src")
                }
                this.img && this.img.complete && J && (this._timer = J.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var H = this.img;
                return (H.naturalWidth) ? (H.naturalWidth > 0) : (H.readyState) ? ("complete" == H.readyState) : H.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(x);
    (function(F) {
        if (!F) {
            throw "MagicJS not found"
        }
        if (F.FX) {
            return
        }
        var E = F.$;
        F.FX = new F.Class({
            init: function(H, G) {
                var I;
                this.el = F.$(H);
                this.options = F.extend(this.options, G);
                this.timer = false;
                this.easeFn = this.cubicBezierAtTime;
                I = F.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === F.jTypeOf(I)) {
                    this.easeFn = I
                } else {
                    this.cubicBezier = this.parseCubicBezier(I) || this.parseCubicBezier("ease")
                }
                if ("string" == F.jTypeOf(this.options.cycles)) {
                    this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
                }
            },
            options: {
                fps: 60,
                duration: 600,
                transition: "ease",
                cycles: 1,
                direction: "normal",
                onStart: F.$F,
                onComplete: F.$F,
                onBeforeRender: F.$F,
                onAfterRender: F.$F,
                forceAnimation: false,
                roundCss: false
            },
            styles: null,
            cubicBezier: null,
            easeFn: null,
            setTransition: function(G) {
                this.options.transition = G;
                G = F.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === F.jTypeOf(G)) {
                    this.easeFn = G
                } else {
                    this.easeFn = this.cubicBezierAtTime;
                    this.cubicBezier = this.parseCubicBezier(G) || this.parseCubicBezier("ease")
                }
            },
            start: function(I) {
                var G = /\%$/,
                    H;
                this.styles = I || {};
                this.cycle = 0;
                this.state = 0;
                this.curFrame = 0;
                this.pStyles = {};
                this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
                this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
                for (H in this.styles) {
                    G.test(this.styles[H][0]) && (this.pStyles[H] = true);
                    if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                        this.styles[H].reverse()
                    }
                }
                this.startTime = F.now();
                this.finishTime = this.startTime + this.options.duration;
                this.options.onStart.call();
                if (0 === this.options.duration) {
                    this.render(1);
                    this.options.onComplete.call()
                } else {
                    this.loopBind = this.loop.jBind(this);
                    if (!this.options.forceAnimation && F.browser.features.requestAnimationFrame) {
                        this.timer = F.browser.requestAnimationFrame.call(window, this.loopBind)
                    } else {
                        this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                    }
                }
                return this
            },
            stopAnimation: function() {
                if (this.timer) {
                    if (!this.options.forceAnimation && F.browser.features.requestAnimationFrame && F.browser.cancelAnimationFrame) {
                        F.browser.cancelAnimationFrame.call(window, this.timer)
                    } else {
                        clearInterval(this.timer)
                    }
                    this.timer = false
                }
            },
            stop: function(G) {
                G = F.defined(G) ? G : false;
                this.stopAnimation();
                if (G) {
                    this.render(1);
                    this.options.onComplete.jDelay(10)
                }
                return this
            },
            calc: function(I, H, G) {
                I = parseFloat(I);
                H = parseFloat(H);
                return (H - I) * G + I
            },
            loop: function() {
                var H = F.now(),
                    G = (H - this.startTime) / this.options.duration,
                    I = Math.floor(G);
                if (H >= this.finishTime && I >= this.options.cycles) {
                    this.stopAnimation();
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                    return this
                }
                if (this.alternate && this.cycle < I) {
                    for (var J in this.styles) {
                        this.styles[J].reverse()
                    }
                }
                this.cycle = I;
                if (!this.options.forceAnimation && F.browser.features.requestAnimationFrame) {
                    this.timer = F.browser.requestAnimationFrame.call(window, this.loopBind)
                }
                this.render((this.continuous ? I : 0) + this.easeFn(G % 1))
            },
            render: function(G) {
                var H = {},
                    J = G;
                for (var I in this.styles) {
                    if ("opacity" === I) {
                        H[I] = Math.round(this.calc(this.styles[I][0], this.styles[I][1], G) * 100) / 100
                    } else {
                        H[I] = this.calc(this.styles[I][0], this.styles[I][1], G);
                        this.pStyles[I] && (H[I] += "%")
                    }
                }
                this.options.onBeforeRender(H, this.el);
                this.set(H);
                this.options.onAfterRender(H, this.el)
            },
            set: function(G) {
                return this.el.jSetCss(G)
            },
            parseCubicBezier: function(G) {
                var H, I = null;
                if ("string" !== F.jTypeOf(G)) {
                    return null
                }
                switch (G) {
                    case "linear":
                        I = E([0, 0, 1, 1]);
                        break;
                    case "ease":
                        I = E([0.25, 0.1, 0.25, 1]);
                        break;
                    case "ease-in":
                        I = E([0.42, 0, 1, 1]);
                        break;
                    case "ease-out":
                        I = E([0, 0, 0.58, 1]);
                        break;
                    case "ease-in-out":
                        I = E([0.42, 0, 0.58, 1]);
                        break;
                    case "easeInSine":
                        I = E([0.47, 0, 0.745, 0.715]);
                        break;
                    case "easeOutSine":
                        I = E([0.39, 0.575, 0.565, 1]);
                        break;
                    case "easeInOutSine":
                        I = E([0.445, 0.05, 0.55, 0.95]);
                        break;
                    case "easeInQuad":
                        I = E([0.55, 0.085, 0.68, 0.53]);
                        break;
                    case "easeOutQuad":
                        I = E([0.25, 0.46, 0.45, 0.94]);
                        break;
                    case "easeInOutQuad":
                        I = E([0.455, 0.03, 0.515, 0.955]);
                        break;
                    case "easeInCubic":
                        I = E([0.55, 0.055, 0.675, 0.19]);
                        break;
                    case "easeOutCubic":
                        I = E([0.215, 0.61, 0.355, 1]);
                        break;
                    case "easeInOutCubic":
                        I = E([0.645, 0.045, 0.355, 1]);
                        break;
                    case "easeInQuart":
                        I = E([0.895, 0.03, 0.685, 0.22]);
                        break;
                    case "easeOutQuart":
                        I = E([0.165, 0.84, 0.44, 1]);
                        break;
                    case "easeInOutQuart":
                        I = E([0.77, 0, 0.175, 1]);
                        break;
                    case "easeInQuint":
                        I = E([0.755, 0.05, 0.855, 0.06]);
                        break;
                    case "easeOutQuint":
                        I = E([0.23, 1, 0.32, 1]);
                        break;
                    case "easeInOutQuint":
                        I = E([0.86, 0, 0.07, 1]);
                        break;
                    case "easeInExpo":
                        I = E([0.95, 0.05, 0.795, 0.035]);
                        break;
                    case "easeOutExpo":
                        I = E([0.19, 1, 0.22, 1]);
                        break;
                    case "easeInOutExpo":
                        I = E([1, 0, 0, 1]);
                        break;
                    case "easeInCirc":
                        I = E([0.6, 0.04, 0.98, 0.335]);
                        break;
                    case "easeOutCirc":
                        I = E([0.075, 0.82, 0.165, 1]);
                        break;
                    case "easeInOutCirc":
                        I = E([0.785, 0.135, 0.15, 0.86]);
                        break;
                    case "easeInBack":
                        I = E([0.6, -0.28, 0.735, 0.045]);
                        break;
                    case "easeOutBack":
                        I = E([0.175, 0.885, 0.32, 1.275]);
                        break;
                    case "easeInOutBack":
                        I = E([0.68, -0.55, 0.265, 1.55]);
                        break;
                    default:
                        G = G.replace(/\s/g, "");
                        if (G.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                            I = G.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                            for (H = I.length - 1; H >= 0; H--) {
                                I[H] = parseFloat(I[H])
                            }
                        }
                }
                return E(I)
            },
            cubicBezierAtTime: function(S) {
                var G = 0,
                    R = 0,
                    O = 0,
                    T = 0,
                    Q = 0,
                    M = 0,
                    N = this.options.duration;

                function L(U) {
                    return ((G * U + R) * U + O) * U
                }

                function K(U) {
                    return ((T * U + Q) * U + M) * U
                }

                function I(U) {
                    return (3 * G * U + 2 * R) * U + O
                }

                function P(U) {
                    return 1 / (200 * U)
                }

                function H(U, V) {
                    return K(J(U, V))
                }

                function J(ab, ac) {
                    var aa, Z, Y, V, U, X;

                    function W(ad) {
                        if (ad >= 0) {
                            return ad
                        } else {
                            return 0 - ad
                        }
                    }
                    for (Y = ab, X = 0; X < 8; X++) {
                        V = L(Y) - ab;
                        if (W(V) < ac) {
                            return Y
                        }
                        U = I(Y);
                        if (W(U) < 0.000001) {
                            break
                        }
                        Y = Y - V / U
                    }
                    aa = 0;
                    Z = 1;
                    Y = ab;
                    if (Y < aa) {
                        return aa
                    }
                    if (Y > Z) {
                        return Z
                    }
                    while (aa < Z) {
                        V = L(Y);
                        if (W(V - ab) < ac) {
                            return Y
                        }
                        if (ab > V) {
                            aa = Y
                        } else {
                            Z = Y
                        }
                        Y = (Z - aa) * 0.5 + aa
                    }
                    return Y
                }
                O = 3 * this.cubicBezier[0];
                R = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - O;
                G = 1 - O - R;
                M = 3 * this.cubicBezier[1];
                Q = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - M;
                T = 1 - M - Q;
                return H(S, P(N))
            }
        });
        F.FX.Transition = {
            linear: "linear",
            sineIn: "easeInSine",
            sineOut: "easeOutSine",
            expoIn: "easeInExpo",
            expoOut: "easeOutExpo",
            quadIn: "easeInQuad",
            quadOut: "easeOutQuad",
            cubicIn: "easeInCubic",
            cubicOut: "easeOutCubic",
            backIn: "easeInBack",
            backOut: "easeOutBack",
            elasticIn: function(H, G) {
                G = G || [];
                return Math.pow(2, 10 * --H) * Math.cos(20 * H * Math.PI * (G[0] || 1) / 3)
            },
            elasticOut: function(H, G) {
                return 1 - F.FX.Transition.elasticIn(1 - H, G)
            },
            bounceIn: function(I) {
                for (var H = 0, G = 1; 1; H += G, G /= 2) {
                    if (I >= (7 - 4 * H) / 11) {
                        return G * G - Math.pow((11 - 6 * H - 11 * I) / 4, 2)
                    }
                }
            },
            bounceOut: function(G) {
                return 1 - F.FX.Transition.bounceIn(1 - G)
            },
            none: function(G) {
                return 0
            }
        }
    })(x);
    (function(F) {
        if (!F) {
            throw "MagicJS not found"
        }
        if (F.PFX) {
            return
        }
        var E = F.$;
        F.PFX = new F.Class(F.FX, {
            init: function(G, H) {
                this.el_arr = G;
                this.options = F.extend(this.options, H);
                this.timer = false;
                this.$parent.init()
            },
            start: function(K) {
                var G = /\%$/,
                    J, I, H = K.length;
                this.styles_arr = K;
                this.pStyles_arr = new Array(H);
                for (I = 0; I < H; I++) {
                    this.pStyles_arr[I] = {};
                    for (J in K[I]) {
                        G.test(K[I][J][0]) && (this.pStyles_arr[I][J] = true);
                        if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                            this.styles_arr[I][J].reverse()
                        }
                    }
                }
                this.$parent.start({});
                return this
            },
            render: function(G) {
                for (var H = 0; H < this.el_arr.length; H++) {
                    this.el = F.$(this.el_arr[H]);
                    this.styles = this.styles_arr[H];
                    this.pStyles = this.pStyles_arr[H];
                    this.$parent.render(G)
                }
            }
        })
    })(x);
    (function(F) {
        if (!F) {
            throw "MagicJS not found";
            return
        }
        if (F.Tooltip) {
            return
        }
        var E = F.$;
        F.Tooltip = function(H, I) {
            var G = this.tooltip = F.$new("div", null, {
                position: "absolute",
                "z-index": 999
            }).jAddClass("MagicToolboxTooltip");
            F.$(H).jAddEvent("mouseover", function() {
                G.jAppendTo(document.body)
            });
            F.$(H).jAddEvent("mouseout", function() {
                G.jRemove()
            });
            F.$(H).jAddEvent("mousemove", function(N) {
                var P = 20,
                    M = F.$(N).jGetPageXY(),
                    L = G.jGetSize(),
                    K = F.$(window).jGetSize(),
                    O = F.$(window).jGetScroll();

                function J(S, Q, R) {
                    return (R < (S - Q) / 2) ? R : ((R > (S + Q) / 2) ? (R - Q) : (S - Q) / 2)
                }
                G.jSetCss({
                    left: O.x + J(K.width, L.width + 2 * P, M.x - O.x) + P,
                    top: O.y + J(K.height, L.height + 2 * P, M.y - O.y) + P
                })
            });
            this.text(I)
        };
        F.Tooltip.prototype.text = function(G) {
            this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
            this.tooltip.append(document.createTextNode(G))
        }
    })(x);
    (function(F) {
        if (!F) {
            throw "MagicJS not found";
            return
        }
        if (F.MessageBox) {
            return
        }
        var E = F.$;
        F.Message = function(J, I, H, G) {
            this.hideTimer = null;
            this.messageBox = F.$new("span", null, {
                position: "absolute",
                "z-index": 999,
                visibility: "hidden",
                opacity: 0.8
            }).jAddClass(G || "").jAppendTo(H || document.body);
            this.setMessage(J);
            this.show(I)
        };
        F.Message.prototype.show = function(G) {
            this.messageBox.show();
            this.hideTimer = this.hide.jBind(this).jDelay(F.ifndef(G, 5000))
        };
        F.Message.prototype.hide = function(G) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = new x.FX(this.messageBox, {
                    duration: F.ifndef(G, 500),
                    onComplete: function() {
                        this.messageBox.kill();
                        delete this.messageBox;
                        this.hideFX = null
                    }.jBind(this)
                }).start({
                    opacity: [this.messageBox.jGetCss("opacity"), 0]
                })
            }
        };
        F.Message.prototype.setMessage = function(G) {
            this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
            this.messageBox.append(document.createTextNode(G))
        }
    })(x);
    (function(F) {
        if (!F) {
            throw "MagicJS not found"
        }
        if (F.Options) {
            return
        }
        var I = F.$,
            E = null,
            M = {
                "boolean": 1,
                array: 2,
                number: 3,
                "function": 4,
                string: 100
            },
            G = {
                "boolean": function(P, O, N) {
                    if ("boolean" != F.jTypeOf(O)) {
                        if (N || "string" != F.jTypeOf(O)) {
                            return false
                        } else {
                            if (!/^(true|false)$/.test(O)) {
                                return false
                            } else {
                                O = O.jToBool()
                            }
                        }
                    }
                    if (P.hasOwnProperty("enum") && !I(P["enum"]).contains(O)) {
                        return false
                    }
                    E = O;
                    return true
                },
                string: function(P, O, N) {
                    if ("string" !== F.jTypeOf(O)) {
                        return false
                    } else {
                        if (P.hasOwnProperty("enum") && !I(P["enum"]).contains(O)) {
                            return false
                        } else {
                            E = "" + O;
                            return true
                        }
                    }
                },
                number: function(Q, P, O) {
                    var N = false,
                        S = /%$/,
                        R = (F.jTypeOf(P) == "string" && S.test(P));
                    if (O && !"number" == typeof P) {
                        return false
                    }
                    P = parseFloat(P);
                    if (isNaN(P)) {
                        return false
                    }
                    if (isNaN(Q.minimum)) {
                        Q.minimum = Number.NEGATIVE_INFINITY
                    }
                    if (isNaN(Q.maximum)) {
                        Q.maximum = Number.POSITIVE_INFINITY
                    }
                    if (Q.hasOwnProperty("enum") && !I(Q["enum"]).contains(P)) {
                        return false
                    }
                    if (Q.minimum > P || P > Q.maximum) {
                        return false
                    }
                    E = R ? (P + "%") : P;
                    return true
                },
                array: function(Q, O, N) {
                    if ("string" === F.jTypeOf(O)) {
                        try {
                            O = window.JSON.parse(O)
                        } catch (P) {
                            return false
                        }
                    }
                    if (F.jTypeOf(O) === "array") {
                        E = O;
                        return true
                    } else {
                        return false
                    }
                },
                "function": function(P, O, N) {
                    if (F.jTypeOf(O) === "function") {
                        E = O;
                        return true
                    } else {
                        return false
                    }
                }
            },
            H = function(S, R, O) {
                var Q;
                Q = S.hasOwnProperty("oneOf") ? S.oneOf : [S];
                if ("array" != F.jTypeOf(Q)) {
                    return false
                }
                for (var P = 0, N = Q.length - 1; P <= N; P++) {
                    if (G[Q[P].type](Q[P], R, O)) {
                        return true
                    }
                }
                return false
            },
            K = function(S) {
                var Q, P, R, N, O;
                if (S.hasOwnProperty("oneOf")) {
                    N = S.oneOf.length;
                    for (Q = 0; Q < N; Q++) {
                        for (P = Q + 1; P < N; P++) {
                            if (M[S.oneOf[Q]["type"]] > M[S.oneOf[P].type]) {
                                O = S.oneOf[Q];
                                S.oneOf[Q] = S.oneOf[P];
                                S.oneOf[P] = O
                            }
                        }
                    }
                }
                return S
            },
            L = function(Q) {
                var P;
                P = Q.hasOwnProperty("oneOf") ? Q.oneOf : [Q];
                if ("array" != F.jTypeOf(P)) {
                    return false
                }
                for (var O = P.length - 1; O >= 0; O--) {
                    if (!P[O].type || !M.hasOwnProperty(P[O].type)) {
                        return false
                    }
                    if (F.defined(P[O]["enum"])) {
                        if ("array" !== F.jTypeOf(P[O]["enum"])) {
                            return false
                        }
                        for (var N = P[O]["enum"].length - 1; N >= 0; N--) {
                            if (!G[P[O].type]({
                                    type: P[O].type
                                }, P[O]["enum"][N], true)) {
                                return false
                            }
                        }
                    }
                }
                if (Q.hasOwnProperty("default") && !H(Q, Q["default"], true)) {
                    return false
                }
                return true
            },
            J = function(N) {
                this.schema = {};
                this.options = {};
                this.parseSchema(N)
            };
        F.extend(J.prototype, {
            parseSchema: function(P) {
                var O, N, Q;
                for (O in P) {
                    if (!P.hasOwnProperty(O)) {
                        continue
                    }
                    N = (O + "").jTrim().jCamelize();
                    if (!this.schema.hasOwnProperty(N)) {
                        this.schema[N] = K(P[O]);
                        if (!L(this.schema[N])) {
                            throw "Incorrect definition of the '" + O + "' parameter in " + P
                        }
                        this.options[N] = undefined
                    }
                }
            },
            set: function(O, N) {
                O = (O + "").jTrim().jCamelize();
                if (F.jTypeOf(N) == "string") {
                    N = N.jTrim()
                }
                if (this.schema.hasOwnProperty(O)) {
                    E = N;
                    if (H(this.schema[O], N)) {
                        this.options[O] = E
                    }
                    E = null
                }
            },
            get: function(N) {
                N = (N + "").jTrim().jCamelize();
                if (this.schema.hasOwnProperty(N)) {
                    return F.defined(this.options[N]) ? this.options[N] : this.schema[N]["default"]
                }
            },
            fromJSON: function(O) {
                for (var N in O) {
                    this.set(N, O[N])
                }
            },
            getJSON: function() {
                var O = F.extend({}, this.options);
                for (var N in O) {
                    if (undefined === O[N] && undefined !== this.schema[N]["default"]) {
                        O[N] = this.schema[N]["default"]
                    }
                }
                return O
            },
            fromString: function(N) {
                I(N.split(";")).jEach(I(function(O) {
                    O = O.split(":");
                    this.set(O.shift().jTrim(), O.join(":"))
                }).jBind(this))
            },
            exists: function(N) {
                N = (N + "").jTrim().jCamelize();
                return this.schema.hasOwnProperty(N)
            },
            isset: function(N) {
                N = (N + "").jTrim().jCamelize();
                return this.exists(N) && F.defined(this.options[N])
            },
            jRemove: function(N) {
                N = (N + "").jTrim().jCamelize();
                if (this.exists(N)) {
                    delete this.options[N];
                    delete this.schema[N]
                }
            }
        });
        F.Options = J
    }(x));
    (function(F) {
        if (!F) {
            throw "MagicJS not found";
            return
        }
        var E = F.$;
        F.$AA = function(G) {
            var I = [],
                H;
            for (H in G) {
                if (!G.hasOwnProperty(H) || (H + "").substring(0, 2) == "$J") {
                    continue
                }
                I.push(G[H])
            }
            return F.$A(I)
        };
        F.nativeEvents = {
            click: 2,
            dblclick: 2,
            mouseup: 2,
            mousedown: 2,
            contextmenu: 2,
            mousewheel: 2,
            DOMMouseScroll: 2,
            mouseover: 2,
            mouseout: 2,
            mousemove: 2,
            selectstart: 2,
            selectend: 2,
            keydown: 2,
            keypress: 2,
            keyup: 2,
            focus: 2,
            blur: 2,
            change: 2,
            reset: 2,
            select: 2,
            submit: 2,
            load: 1,
            unload: 1,
            beforeunload: 2,
            resize: 1,
            move: 1,
            DOMContentLoaded: 1,
            readystatechange: 1,
            error: 1,
            abort: 1
        };
        F.customEventsAllowed = {
            document: true,
            element: true,
            "class": true,
            object: true
        };
        F.customEvents = {
            bindEvent: function(K, J, H) {
                if (F.jTypeOf(K) == "array") {
                    E(K).jEach(this.bindEvent.jBindAsEvent(this, J, H));
                    return this
                }
                if (!K || !J || F.jTypeOf(K) != "string" || F.jTypeOf(J) != "function") {
                    return this
                }
                if (K == "domready" && F.browser.ready) {
                    J.call(this);
                    return this
                }
                H = parseInt(H || 10);
                if (!J.$J_EUID) {
                    J.$J_EUID = Math.floor(Math.random() * F.now())
                }
                var I = this.jFetch("_events", {});
                I[K] || (I[K] = {});
                I[K][H] || (I[K][H] = {});
                I[K]["orders"] || (I[K]["orders"] = {});
                if (I[K][H][J.$J_EUID]) {
                    return this
                }
                if (I[K]["orders"][J.$J_EUID]) {
                    this.unbindEvent(K, J)
                }
                var G = this,
                    L = function(M) {
                        return J.call(G, E(M))
                    };
                if (F.nativeEvents[K] && !I[K]["function"]) {
                    if (F.nativeEvents[K] == 2) {
                        L = function(M) {
                            M = F.extend(M || window.e, {
                                $J_TYPE: "event"
                            });
                            return J.call(G, E(M))
                        }
                    }
                    I[K]["function"] = function(M) {
                        G.jCallEvent(K, M)
                    };
                    this[F._event_add_](F._event_prefix_ + K, I[K]["function"], false)
                }
                I[K][H][J.$J_EUID] = L;
                I[K]["orders"][J.$J_EUID] = H;
                return this
            },
            jCallEvent: function(H, J) {
                try {
                    J = F.extend(J || {}, {
                        type: H
                    })
                } catch (I) {}
                if (!H || F.jTypeOf(H) != "string") {
                    return this
                }
                var G = this.jFetch("_events", {});
                G[H] || (G[H] = {});
                G[H]["orders"] || (G[H]["orders"] = {});
                F.$AA(G[H]).jEach(function(K) {
                    if (K != G[H]["orders"] && K != G[H]["function"]) {
                        F.$AA(K).jEach(function(L) {
                            L(this)
                        }, this)
                    }
                }, J);
                return this
            },
            unbindEvent: function(J, I) {
                if (!J || !I || F.jTypeOf(J) != "string" || F.jTypeOf(I) != "function") {
                    return this
                }
                if (!I.$J_EUID) {
                    I.$J_EUID = Math.floor(Math.random() * F.now())
                }
                var H = this.jFetch("_events", {});
                H[J] || (H[J] = {});
                H[J]["orders"] || (H[J]["orders"] = {});
                order = H[J]["orders"][I.$J_EUID];
                H[J][order] || (H[J][order] = {});
                if (order >= 0 && H[J][order][I.$J_EUID]) {
                    delete H[J][order][I.$J_EUID];
                    delete H[J]["orders"][I.$J_EUID];
                    if (F.$AA(H[J][order]).length == 0) {
                        delete H[J][order];
                        if (F.nativeEvents[J] && F.$AA(H[J]).length == 0) {
                            var G = this;
                            this[F._event_del_](F._event_prefix_ + J, H[J]["function"], false)
                        }
                    }
                }
                return this
            },
            destroyEvent: function(I) {
                if (!I || F.jTypeOf(I) != "string") {
                    return this
                }
                var H = this.jFetch("_events", {});
                if (F.nativeEvents[I]) {
                    var G = this;
                    this[F._event_del_](F._event_prefix_ + I, H[I]["function"], false)
                }
                H[I] = {};
                return this
            },
            cloneEvents: function(I, H) {
                var G = this.jFetch("_events", {});
                for (t in G) {
                    if (H && t != H) {
                        continue
                    }
                    for (order in G[t]) {
                        if (order == "orders" || order == "function") {
                            continue
                        }
                        for (f in G[t][order]) {
                            E(I).bindEvent(t, G[t][order][f], order)
                        }
                    }
                }
                return this
            },
            jCopyEvents: function(J, I) {
                if (1 !== J.nodeType) {
                    return this
                }
                var H = this.jFetch("events");
                if (!H) {
                    return this
                }
                for (var G in H) {
                    if (I && G != I) {
                        continue
                    }
                    for (var K in H[G]) {
                        E(J).bindEvent(G, H[G][K])
                    }
                }
                return this
            },
            jFetch: F.Element.jFetch,
            jStore: F.Element.jStore
        }
    })(x);
    (function(F) {
        if (!F) {
            throw "MagicJS not found";
            return
        }
        var E = F.$;
        Math.rand = function(H, G) {
            return Math.floor(Math.random() * (G - H + 1)) + H
        };
        Math.range = function(H, G, I) {
            return Math.min(G, Math.max(H, I))
        };
        F.extend = function(N, M) {
            if (!(N instanceof window.Array)) {
                N = [N]
            }
            if (!(M instanceof window.Array)) {
                M = [M]
            }
            for (var K = 0, H = N.length; K < H; K++) {
                if (!F.defined(N[K])) {
                    continue
                }
                for (var J = 0, L = M.length; J < L; J++) {
                    if (!F.defined(M[J])) {
                        continue
                    }
                    for (var I in (M[J] || {})) {
                        try {
                            N[K][I] = M[J][I]
                        } catch (G) {}
                    }
                }
            }
            return N[0]
        };
        F.inherit = function(I, H) {
            function G() {}
            G.prototype = H.prototype;
            I.$parent = H.prototype;
            I.prototype = new G();
            I.prototype.constructor = I
        };
        F.findSrcset = function(K) {
            var I, J, L, H, G = {
                src: null,
                srcset: null
            };
            if (K) {
                L = K.split(",");
                for (I = 0; I < L.length; I++) {
                    J = L[I].jTrim();
                    J = J.replace(/\s+/, " ");
                    if (J.split(" ").length > 1) {
                        G.srcset = K
                    } else {
                        G.src = J
                    }
                }
            }
            return G
        };
        F.extend(F.Array, {
            rand: function() {
                return this[Math.rand(0, this.length - 1)]
            }
        });
        F.extend(F.Element, {
            indoc: function() {
                var G = this;
                while (G.parentNode) {
                    if (G.tagName == "BODY" || G.tagName == "HTML") {
                        return true
                    }
                    G = G.parentNode
                }
                return false
            },
            clone: function(J, I) {
                J == undefined && (J = true);
                I == undefined && (I = true);
                var K = E(this.cloneNode(J));
                if (K.$J_UUID == this.$J_UUID) {
                    K.$J_UUID = false;
                    F.$uuid(K)
                }
                var G = F.$A(K.getElementsByTagName("*"));
                G.push(K);
                var H = F.$A(this.getElementsByTagName("*"));
                H.push(this);
                G.jEach(function(M, L) {
                    M.id = "";
                    if (!F.browser.trident || F.doc.documentMode && F.doc.documentMode >= 9) {
                        E(H[L]).cloneEvents && E(H[L]).cloneEvents(M);
                        E(H[L]).jCopyEvents && E(H[L]).jCopyEvents(M)
                    }
                    if (I) {
                        E(M).jStore("master", H[L]);
                        E(M).jStore("isclone", true);
                        var N = E(H[L]).jFetch("clones", []);
                        N.push(M)
                    }
                });
                return K
            },
            jSetOpacity_: F.Element.jSetOpacity,
            jSetOpacity: function(H, G) {
                if (this.jFetch("isclone")) {
                    if (E(this.jFetch("master")).indoc()) {
                        return this
                    }
                }
                this.jSetOpacity_(H, G);
                E(this.jFetch("clones", [])).jEach(function(I) {
                    I.jSetOpacity_(H, G)
                });
                return this
            },
            addEvent_: F.Element.jAddEvent,
            jAddEvent: function(H, G) {
                if (this.jFetch("isclone")) {
                    if (E(this.jFetch("master")).indoc()) {
                        return this
                    }
                }
                this.addEvent_(H, G);
                E(this.jFetch("clones", [])).jEach(function(I) {
                    I.addEvent_(H, G)
                });
                return this
            }
        })
    })(x);
    y.Modules || (y.Modules = {});
    y.Modules.ArrowsPair = (function() {
        var E = ["next", "prev"];

        function H(I) {
            return y.$new("button", null, {
                visibility: "visible"
            }).jAddClass(this.$o["class"] + "-button").jAddClass(this.$o["class"] + "-arrows-pair").jAddClass(this.$o["class"] + "-arrow-" + I).jAppendTo(this.container)
        }

        function F(I, J) {
            J.stopDistribution();
            this.jCallEvent(I);
            this["forward" === I ? "next" : "prev"].blur()
        }
        var G = function(J, I) {
            y.$uuid(this);
            this._options = {
                "class": "",
                "class-hidden": "",
                "class-disabled": "",
                position: "inside",
                orientation: "mss-horizontal",
                form: "button"
            };
            this.$o = this._options;
            y.extend(this.$o, J);
            this.container = I;
            this.prev = H.call(this, "prev");
            this.next = H.call(this, "next");
            this.next.jAddEvent("click", function(K) {
                K.stop()
            }).jAddEvent("btnclick tap", F.jBind(this, "forward"));
            this.prev.jAddEvent("click", function(K) {
                K.stop()
            }).jAddEvent("btnclick tap", F.jBind(this, "backward"));
            y.$uuid(this)
        };
        G.prototype = {
            disable: function(I) {
                l(I && [I] || E).jEach(function(J) {
                    this[J].jAddClass(this.$o["class-disabled"])
                }, this)
            },
            enable: function(I) {
                l(I && [I] || E).jEach(function(J) {
                    this[J].jRemoveClass(this.$o["class-disabled"])
                }, this)
            },
            hide: function(I) {
                l(I && [I] || E).jEach(function(J) {
                    this[J].jAddClass(this.$o["class-hidden"])
                }, this)
            },
            show: function(I) {
                l(I && [I] || E).jEach(function(J) {
                    this[J].jRemoveClass(this.$o["class-hidden"])
                }, this)
            }
        };
        y.extend(G.prototype, y.customEvents);
        return G
    })();
    y.Modules || (y.Modules = {});
    y.Modules.AutoPlay = (function() {
        var E = function(G, F) {
            y.$uuid(this);
            this._options = {
                time: 1000,
                step: 10,
                showModule: true,
                classHidden: "",
                classDisabled: ""
            };
            this.container = F;
            this.$o = this._options;
            y.extend(this.$o, G);
            this.step = 0;
            this.currentTime = 0;
            this.state = "start";
            this.interval = null;
            this.create()
        };
        E.prototype = {
            create: function() {
                if (this.$o.showModule) {
                    this.wrapper = y.$new("div", {
                        "class": "mss-wrapper-timer"
                    }, {
                        top: "0",
                        left: "0",
                        width: "100%",
                        position: "absolute"
                    });
                    this.progressLine = y.$new("div", {
                        "class": "mss-progress-line"
                    }, {
                        top: "0",
                        left: "0",
                        height: "100%"
                    });
                    this.wrapper.append(this.progressLine);
                    this.container.append(this.wrapper);
                    this.changeLine()
                }
            },
            changeLine: function(F) {
                var G;
                if (this.$o.showModule) {
                    G = F ? 0 : this.currentTime / (this.$o.time / 100);
                    this.progressLine.jSetCssProp("width", G + "%")
                }
            },
            start: function() {
                var F, G;
                if ("playing" !== this.state) {
                    this.state = "playing";
                    if (this.$o.showModule) {
                        this.interval = setInterval(l(function() {
                            var I, H;
                            G = y.now();
                            if (F) {
                                H = G - F
                            } else {
                                H = 0
                            }
                            if (H > this.$o.step * 2) {
                                H = this.$o.step * 2
                            }
                            F = G;
                            this.step += H;
                            this.currentTime += H;
                            I = Math.min(this.$o.step, this.$o.time - this.currentTime);
                            if (this.step >= I) {
                                this.step -= I;
                                this.$o.showModule && this.changeLine()
                            }
                            if (this.currentTime >= this.$o.time) {
                                this.state = "end";
                                this.step = 0;
                                this.currentTime = 0;
                                clearInterval(this.interval);
                                this.interval = null;
                                this.jCallEvent("stopTimer")
                            }
                        }).jBind(this), 10)
                    } else {
                        this.interval = setTimeout(l(function() {
                            this.state = "end";
                            this.step = 0;
                            this.currentTime = 0;
                            clearTimeout(this.interval);
                            this.interval = null;
                            this.jCallEvent("stopTimer")
                        }).jBind(this), this.$o.time)
                    }
                }
            },
            pause: function() {
                if ("playing" === this.state) {
                    this.state = "paused";
                    if (this.$o.showModule) {
                        clearInterval(this.interval)
                    } else {
                        this.stop()
                    }
                }
            },
            stop: function() {
                clearInterval(this.interval);
                clearTimeout(this.interval);
                this.interval = null;
                this.currentTime = 0;
                this.step = 0;
                this.state = "start";
                this.changeLine(true)
            },
            jRemove: function() {
                this.stop();
                if (this.wrapper) {
                    this.wrapper.jRemove();
                    this.wrapper = null
                }
            },
            hide: function() {
                this.wrapper && this.wrapper.jAddClass(this.$o.classHidden)
            },
            show: function() {
                this.wrapper && this.wrapper.jRemoveClass(this.$o.classHidden)
            }
        };
        y.extend(E.prototype, y.customEvents);
        return E
    })();
    y.Modules || (y.Modules = {});
    y.Modules.BulletPreview = (function() {
        var E = function(F, G) {
            var H;
            this.pn = F;
            this.options = {
                side: "top",
                conteinerSpeed: 300,
                imgWrapperSpeed: 300
            };
            y.extend(this.options, G);
            this.s = {
                side: l(["top", "bottom"]).contains(this.options.side) ? "width" : "height",
                pos: l(["top", "bottom"]).contains(this.options.side) ? "left" : "top",
                wrapperPos: 0,
                containerPos: 0,
                containerSize: {
                    width: 0,
                    height: 0
                }
            };
            this.last = 0;
            this.containerFX = null;
            this.imgWrapperFX = null;
            this.timer = null;
            this.items = l([]);
            this.border = null;
            this.container = y.$new("div", {
                "class": "mss-bullets-preview-thumbnail mss-direction-" + this.options.side
            }, {
                "-webkit-transition": this.options.conteinerSpeed + "ms",
                transition: this.options.conteinerSpeed + "ms"
            });
            H = y.$new("div", {
                "class": "mss-bullets-preview-arrow"
            });
            this.imgContainerWrapper = y.$new("div", {}, {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative"
            });
            this.imgContainer = y.$new("div", {
                "class": "mss-bullets-preview-wrapper"
            }, {
                left: 0,
                display: "inline-block",
                "-webkit-transition": this.options.imgWrapperSpeed + "ms",
                transition: this.options.imgWrapperSpeed + "ms"
            });
            this.container.append(H).append(this.imgContainerWrapper.append(this.imgContainer)).jAppendTo(this.pn);
            this.container.jSetOpacity(0);
            this.container.jSetCssProp("visibility", "hidden")
        };
        E.prototype = {
            hide: function() {
                this.timer = setTimeout(l(function() {
                    this.container.jSetOpacity(0);
                    this.container.jSetCssProp("visibility", "hidden")
                }).jBind(this), 100)
            },
            show: function() {
                clearTimeout(this.timer);
                this.container.jSetOpacity(1);
                this.container.jSetCssProp("visibility", "visible")
            },
            push: function(H, G, F) {
                this.items.push({
                    node: H,
                    index: G,
                    motherNucleus: F
                });
                this.imgContainer.append(H)
            },
            jump: function(F) {
                var G, J = 0,
                    H = {},
                    I = this.items[F];
                this.last = F;
                I.nodeSize = I.node.jGetSize()[this.s.side];
                J = (I.node.jGetPosition()[this.s.pos] - I.node.parentNode.jGetPosition()[this.s.pos]) * (-1);
                if (y.browser.ieMode && y.browser.ieMode < 10) {
                    this.containerFX && this.containerFX.stop();
                    this.containerFX = new y.FX(this.container, {
                        duration: this.options.conteinerSpeed
                    });
                    H[this.s.pos] = [this.container.jGetPosition()[this.s.pos] - this.s.wrapperPos, I.motherNucleusPos + I.motherNucleusSize / 2 - I.nodeSize / 2 - this.border[this.s.side]];
                    H[this.s.side] = [this.container.jGetSize()[this.s.side], I.nodeSize];
                    this.containerFX.start(H);
                    this.imgWrapperFX && this.imgWrapperFX.stop();
                    this.imgWrapperFX = new y.FX(this.imgContainer, {
                        duration: this.options.conteinerSpeed
                    });
                    H = {};
                    H[this.s.pos] = [parseInt(this.imgContainer.jGetCss(this.s.pos)), J];
                    this.imgWrapperFX.start(H)
                } else {
                    this.container.jSetCssProp(this.s.pos, I.motherNucleusPos + I.motherNucleusSize / 2 - I.nodeSize / 2 - this.border[this.s.side]);
                    this.container.jSetCssProp(this.s.side, I.nodeSize);
                    this.imgContainer.jSetCssProp(this.s.pos, J)
                }
            },
            onResize: function() {
                var F = 0;
                this.s.wrapperPos = this.items[0].motherNucleus.parentNode.parentNode.jGetPosition()[this.s.pos];
                this.border = {
                    width: parseInt(this.container.jGetCss("border-left-width")) || 0,
                    height: parseInt(this.container.jGetCss("border-top-width")) || 0
                };
                this.items.jEach(l(function(H, G) {
                    H.motherNucleusSize = H.motherNucleus.jGetSize()[this.s.side];
                    H.motherNucleusPos = H.motherNucleus.jGetPosition()[this.s.pos] - this.s.wrapperPos
                }).jBind(this));
                this.s.containerPos = this.container.jGetPosition()[this.s.pos] - this.s.wrapperPos;
                this.s.containerSize = this.container.jGetSize()[this.s.side];
                this.jump(this.last)
            }
        };
        return E
    })();
    y.Effects = {};
    y.Effects.Blank = (function() {
        var E = function(G, F) {
            this.els = [l(G[0]) || null, l(G[1]) || null];
            this.container = $mjs((this.els[1] && this.els[1].parentNode) || (this.els[0] && this.els[1].parentNode));
            this._options = {
                loop: true,
                items: [],
                duration: 500,
                direction: "right",
                cubicBezier: "cubic-bezier(0.7, 0, 1, 1)",
                startPoint: 0
            };
            this.o = this._options;
            y.extend(this.o, F || {});
            this.name = "blank";
            this.flag = false;
            this.actionIndex = 1;
            this.stylesBefore = {};
            this.stylesAfter = {};
            this.stylesReset = {}
        };
        E.prototype = {
            something_: function() {
                l(this.container).offsetHeight;
                this.els[0] && this.els[0].offsetHeight;
                this.els[1] && this.els[1].offsetHeight
            },
            show: function(G, F) {
                G && G.jSetCssProp("visibility", F ? "visible" : "hidden")
            },
            onBeforeRender_: y.$F,
            onAfterRender_: y.$F,
            onComplete_: y.$F,
            onStart_: y.$F,
            transition_: y.FX.Transition.linear,
            prepare_: function() {
                if (this.name == "blank") {
                    return
                }
                if (y.browser.ieMode && y.browser.ieMode < 10 && this.name != "blank") {
                    var F = [];
                    this.els[0] && F.push(this.els[0]);
                    this.els[1] && F.push(this.els[1]);
                    this.ieEff = new y.PFX(F, {
                        duration: this.o.duration,
                        onComplete: this.onComplete_.jBind(this),
                        onBeforeRender: this.onBeforeRender_.jBind(this),
                        onStart: this.onStart_.jBind(this),
                        onAfterRender: this.onAfterRender_.jBind(this),
                        transition: this.transition_
                    })
                } else {
                    this.els[0] && this.els[0].jSetCss(this.stylesBefore.el1);
                    this.els[1] && this.els[1].jSetCss(this.stylesBefore.el2);
                    this.something_()
                }
            },
            jRemoveClasses_: function(F) {
                for (var F = 0; F < 2; F++) {
                    this.els[F] && this.defTrans_(this.els[F]);
                    ((F == 0) && this.els[F]) && this.els[F];
                    this.els[F] && this.els[F].jSetCss(this.stylesReset)
                }
                this.flag = false;
                this.inSide && this.inSide(this)
            },
            defTrans_: function(F) {
                F.jSetCss({
                    transition: "none"
                })
            },
            stop: function(F) {
                var G;
                if (this.flag) {
                    this.ieEff && this.ieEff.stop(true);
                    if (!this.ieEff) {
                        for (G = 0; G < 2; G++) {
                            this.els[G] && this.els[G].jRemoveEvent("transitionend");
                            this.jRemoveClasses_(G)
                        }
                    }
                }
            },
            start: function(H) {
                var G = 0,
                    F = {
                        transition: "all " + this.o.duration + "ms " + this.o.cubicBezier
                    },
                    I = function(J, K) {
                        K.stop();
                        this.els[J].jRemoveEvent(K.type);
                        this.flag = false;
                        this.jRemoveClasses_(J)
                    };
                H.start && H.start();
                H.end && (this.inSide = H.end);
                this.flag = true;
                this.prepare_();
                if (this.name != "blank") {
                    for (; G < 2; G++) {
                        if (!this.els[G]) {
                            if (1 === G && !!this.els[0] && this.actionIndex !== 0) {
                                this.els[0].jAddEvent("transitionend", I.jBind(this, 0))
                            }
                            continue
                        }
                        if (this.actionIndex === G) {
                            this.els[this.actionIndex].jAddEvent("transitionend", I.jBind(this, this.actionIndex))
                        }
                        this.els[G].jSetCss(F).jSetCss(this.stylesAfter["el" + (G + 1)])
                    }
                } else {
                    this.inSide && this.inSide();
                    this.flag = false
                }
            },
            pause: function() {}
        };
        return E
    })();
    y.Effects.Fade = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "fade";
            if (!y.browser.trident || y.browser.trident && y.browser.ieMode > 9) {
                this.stylesBefore = {
                    el1: {
                        "z-index": 30
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 0
                    }
                };
                this.stylesAfter = {
                    el1: {
                        "z-index": 35
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 1
                    }
                };
                this.stylesReset = {
                    "z-index": "",
                    opacity: 1
                }
            }
        };
        y.inherit(E, y.Effects.Blank);
        (y.browser.trident && y.browser.ieMode < 10) && y.extend(E.prototype, {
            onComplete_: function() {
                this.flag = false;
                this.els[0] && this.els[0].show();
                this.els[0].jSetCssProp("z-index", "");
                this.els[1].jSetCssProp("z-index", "");
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onStart_: function() {
                this.flag = true;
                this.els[1] && this.els[1].jSetOpacity(0).jSetCssProp("z-index", 50).show();
                this.els[0] && this.els[0].jSetCssProp("z-index", 30)
            },
            stop: function() {
                this.flag && this.ieEff.stop(true)
            },
            start: function(G) {
                var F = [];
                G.start && G.start();
                G.end && (this.inSide = G.end);
                this.prepare_();
                this.els[0] && F.push({
                    opacity: [1, 1]
                });
                this.els[1] && F.push({
                    opacity: [0, 1]
                });
                this.ieEff.start(F)
            }
        });
        return E
    })();
    y.Effects.FadeUp = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "fade-up";
            if (!y.browser.trident || y.browser.trident && y.browser.ieMode > 9) {
                this.stylesBefore = {
                    el1: {
                        "z-index": 30,
                        opacity: 1,
                        transform: "scale(1)"
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 0,
                        transform: "scale(1.5)"
                    }
                };
                this.stylesAfter = {
                    el1: {
                        "z-index": 35,
                        opacity: 0,
                        transform: "scale(1.5)"
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 1,
                        transform: "scale(1)"
                    }
                };
                this.stylesReset = {
                    "z-index": "",
                    opacity: 1,
                    transform: ""
                }
            }
            this.count = 0
        };
        y.inherit(E, y.Effects.Blank);
        (y.browser.trident && y.browser.ieMode < 10) && y.extend(E.prototype, {
            onComplete_: function() {
                this.flag = false;
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onBeforeRender_: function(F) {
                this.els[this.count].jSetCssProp("transform", "scale(" + F.scale + ")");
                this.count = 0 === this.count ? 1 : 0
            },
            onStart_: function() {
                this.flag = true;
                this.els[0] && this.els[0].jSetCssProp("z-index", 30);
                this.els[1] && this.els[1].jSetCssProp("z-index", 50).jSetOpacity(0)
            },
            stop: function() {
                this.flag && this.ieEff.stop(true)
            },
            start: function(G) {
                var F = [];
                G.start && G.start();
                G.end && (this.inSide = G.end);
                this.prepare_();
                this.els[0] && F.push({
                    opacity: [1, 1],
                    scale: [1, 1.5]
                });
                this.els[1] && F.push({
                    opacity: [0, 1],
                    scale: [1.5, 1]
                });
                this.ieEff.start(F)
            }
        });
        return E
    })();
    y.Effects.FadeDown = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "fade-down";
            if (!y.browser.trident || y.browser.trident && y.browser.ieMode > 9) {
                this.stylesBefore = {
                    el1: {
                        "z-index": 30,
                        opacity: 1,
                        transform: "scale(1)"
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 0,
                        transform: "scale(0.5)"
                    }
                };
                this.stylesAfter = {
                    el1: {
                        "z-index": 35,
                        opacity: 0,
                        transform: "scale(0.5)"
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 1,
                        transform: "scale(1)"
                    }
                };
                this.stylesReset = {
                    "z-index": "",
                    opacity: 1,
                    transform: ""
                }
            }
        };
        y.inherit(E, y.Effects.Blank);
        (y.browser.trident && y.browser.ieMode < 10) && y.extend(E.prototype, {
            onComplete_: function() {
                this.flag = false;
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onBeforeRender_: function(F) {
                this.els[this.count].jSetCssProp("transform", "scale(" + F.scale + ")");
                this.count = 0 === this.count ? 1 : 0
            },
            onStart_: function() {
                this.flag = true;
                this.els[0] && this.els[0].jSetCssProp("z-index", 30);
                this.els[1] && this.els[1].jSetCssProp("z-index", 50).jSetOpacity(0)
            },
            stop: function() {
                this.flag && this.ieEff.stop(true)
            },
            start: function(G) {
                var F = [];
                G.start && G.start();
                G.end && (this.inSide = G.end);
                this.prepare_();
                this.els[0] && F.push({
                    opacity: [1, 1],
                    scale: [1, 0.5]
                });
                this.els[1] && F.push({
                    opacity: [0, 1],
                    scale: [0.5, 1]
                });
                this.ieEff.start(F)
            }
        });
        return E
    })();
    y.Effects.Dissolve = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "dissolve";
            if (!y.browser.trident || y.browser.trident && y.browser.ieMode > 9) {
                this.stylesBefore = {
                    el1: {
                        "z-index": 30,
                        opacity: 1
                    },
                    el2: {
                        "z-index": 50,
                        opacity: 0
                    }
                };
                this.stylesAfter = {
                    el1: {
                        opacity: 0
                    },
                    el2: {
                        opacity: 1
                    }
                };
                this.stylesReset = {
                    "z-index": "",
                    opacity: 1
                }
            }
        };
        y.inherit(E, y.Effects.Blank);
        (y.browser.trident && y.browser.ieMode < 10) && y.extend(E.prototype, {
            onComplete_: function() {
                this.flag = false;
                this.els[0] && this.els[0].show();
                this.els[0].jSetCssProp("z-index", "");
                this.els[1].jSetCssProp("z-index", "");
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onStart_: function() {
                this.flag = true;
                this.els[0] && this.els[0].jSetCssProp("z-index", 30);
                this.els[1] && this.els[1].jSetCssProp("z-index", 50).jSetOpacity(0).show()
            },
            stop: function() {
                this.flag && this.ieEff.stop(true)
            },
            start: function(G) {
                var F = [];
                G.start && G.start();
                G.end && (this.inSide = G.end);
                this.prepare_();
                this.els[0] && F.push({
                    opacity: [1, 0]
                });
                this.els[1] && F.push({
                    opacity: [0, 1]
                });
                this.ieEff.start(F)
            }
        });
        return E
    })();
    y.Effects.Slide = (function() {
        var E = function(K, I) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "slide";
            var H = 0,
                M = 0,
                L = 0,
                G = 0,
                J = 100,
                F = 100;
            if (l(["left", "right"]).contains(this.o.direction)) {
                F = 0;
                H = this.o.startPoint || 0;
                if (this.o.direction == "right") {
                    J *= (-1);
                    L = 100 + H
                } else {
                    L = -100 + H
                }
            } else {
                J = 0;
                M = this.o.startPoint || 0;
                if (this.o.direction == "bottom") {
                    F *= (-1);
                    G = 100 + M
                } else {
                    G = -100 + M
                }
            }
            if (y.browser.gecko) {
                this.stylesBefore = {
                    el1: {
                        transform: "translate(" + H + "%, " + M + "%) rotateZ(0.005deg)"
                    },
                    el2: {
                        transform: "translate(" + L + "%, " + G + "%) rotateZ(0.005deg)"
                    }
                };
                this.stylesAfter = {
                    el1: {
                        transform: "translate(" + J + "%, " + F + "%)"
                    },
                    el2: {
                        transform: "translate(0%, 0%)"
                    }
                }
            } else {
                this.stylesBefore = {
                    el1: {
                        transform: "translate(" + H + "%, " + M + "%)"
                    },
                    el2: {
                        transform: "translate(" + L + "%, " + G + "%)"
                    }
                };
                this.stylesAfter = {
                    el1: {
                        transform: "translate(" + J + "%, " + F + "%)"
                    },
                    el2: {
                        transform: "translate(0%, 0%)"
                    }
                }
            }
            this.stylesReset = {
                transform: ""
            }
        };
        y.inherit(E, y.Effects.Blank);
        if (y.browser.trident && y.browser.ieMode < 10) {
            y.extend(E.prototype, {
                calcDirect_: function() {
                    var H, G, F, I = this.o.direction;
                    F = (this.o.direction == "left" || this.o.direction == "right") ? "left" : "top";
                    switch (I) {
                        case "left":
                        case "top":
                            H = ["0%", "100%"];
                            G = ["-100%", "0%"];
                            break;
                        case "right":
                        case "bottom":
                            H = ["0%", "-100%"];
                            G = ["100%", "0%"];
                            break
                    }
                    this.effMove_ = {
                        el0: H,
                        el1: G,
                        style: F
                    }
                },
                onComplete_: function() {
                    var G = "0%",
                        F;
                    for (F = 0; F < 2; ++F) {
                        this.els[F].jSetCssProp(this.effMove_.style, G)
                    }
                    this.flag = false;
                    this.els[0].jSetCssProp("z-index", "");
                    this.els[1].jSetCssProp("z-index", "");
                    this.inSide && this.inSide(this);
                    this.outSide && this.outSide()
                },
                onStart_: function() {
                    this.els[0].jSetCssProp("z-index", 50);
                    this.els[1].jSetCssProp("z-index", 30).jSetCssProp(this.effMove_.style, this.effMove_.el1[0]);
                    this.flag = true
                },
                transition_: y.FX.Transition.expoOut,
                stop: function() {
                    if (this.flag) {
                        this.ieEff.stop(false);
                        this.onComplete_()
                    }
                },
                start: function(J) {
                    J.start && J.start();
                    J.end && (this.inSide = J.end);
                    this.calcDirect_();
                    var I = this.effMove_.style,
                        H = this.effMove_.el0,
                        G = this.effMove_.el1,
                        F = [{}, {}];
                    this.prepare_();
                    F[0][I] = H;
                    F[1][I] = G;
                    this.ieEff.start(F)
                }
            })
        }
        return E
    })();
    y.Effects.Bars3d = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            y.extend(this._options, {
                cubicBezier: "cubic-bezier(0, 0, 1, 1)"
            });
            this.o = this._options;
            y.extend(this.o, F || {});
            this.name = "bars3d";
            this.os = "X";
            this.deg = 90;
            this.parSize = this.els[0].parentNode.jGetSize();
            this.count = 10
        };
        y.inherit(E, y.Effects.Blank);
        y.extend(E.prototype, {
            prepare_: function() {
                var K, F, J, I, G = 10,
                    H = this.els[0].parentNode.jGetPosition();
                this.els[1].show();
                this.blockTr = new Array(this.count);
                this.cloneFace = new Array(this.count);
                this.cloneNext = new Array(this.count);
                this.os = "X";
                this.deg = 90;
                this.container.jSetCssProp("overflow", "visible");
                this.container.parentNode.jSetCssProp("overflow", "visible");
                this.block = y.$new("div", {}, {
                    top: "0",
                    left: "0",
                    width: this.parSize.width,
                    height: this.parSize.height,
                    position: "absolute",
                    "z-index": 75
                }).jAddClass("defParentDiv");
                F = this.parSize.width / this.count;
                for (J = 0; J < this.count; ++J) {
                    I = (J * F + F);
                    if (J < this.count / 2) {
                        G += 10
                    } else {
                        G -= 10
                    }
                    K = {
                        width: this.parSize.width,
                        height: this.parSize.height,
                        "z-index": G,
                        position: "absolute"
                    };
                    this.blockTr[J] = y.$new("div", {}, K);
                    if (y.browser.engine === "webkit" && !y.browser.chrome) {
                        this.blockTr[J].jSetCssProp(k, "translateZ(" + ((this.parSize.height / 2) * (-1)) + "px)").jSetCssProp(a, "50% 50%").jSetCssProp(d, "none").jSetCssProp(h, "preserve-3d")
                    } else {
                        this.blockTr[J].jSetCssProp(k, "translate3d(0, 0, 0)");
                        this.blockTr[J].jAddClass("transformStyle").jAddClass("defParentDiv");
                        this.container.jAddClass("transformStyle").jAddClass("defParentDiv")
                    }
                    this.cloneFace[J] = this.els[0].cloneNode(true);
                    this.cloneNext[J] = this.els[1].cloneNode(true);
                    l([this.cloneFace, this.cloneNext]).jEach(l(function(M, L) {
                        l(M[J]).jSetCss({
                            "z-index": 50,
                            position: "absolute",
                            clip: "rect(auto, " + (I + 1) + "px, auto, " + ((J * F) - 1) + "px)"
                        });
                        M[J].jSetCssProp(j, "50% 50% " + (this.parSize.height / 2 * (-1)) + "px");
                        if (L) {
                            this.cloneNext[J].jSetCssProp("z-index", 30)
                        }
                        M[J].jAddClass("backface-visHid")
                    }).jBind(this));
                    K = {
                        top: "auto",
                        left: H.left - H.left
                    };
                    l([this.cloneFace, this.cloneNext]).jEach(l(function(M, L) {
                        K[k] = "rotateX(" + (!L ? 0 : this.deg) + "deg)";
                        M[J].jSetCss(K)
                    }).jBind(this))
                }
                if (y.browser.engine === "webkit" && !y.browser.chrome) {
                    this.block.jSetCssProp(d, "1000px")
                }
                for (J = 0; J < this.count; ++J) {
                    this.blockTr[J].append(this.cloneFace[J]).append(this.cloneNext[J]);
                    this.block.append(this.blockTr[J])
                }
                this.els[0].parentNode.append(this.block);
                this.els[0].hide();
                this.els[1].hide();
                this.something_()
            },
            prepareForSafari_: function() {
                var K, F, J, I, G = 10,
                    H = this.els[0].parentNode.jGetPosition();
                this.els[1].show();
                this.blockTr = new Array(this.count);
                this.cloneFace = new Array(this.count);
                this.cloneNext = new Array(this.count);
                this.container.jSetCssProp("overflow", "visible");
                this.container.parentNode.jSetCssProp("overflow", "visible");
                this.block = y.$new("div", {}, {
                    top: "0",
                    left: "0",
                    width: this.parSize.width,
                    height: this.parSize.height,
                    position: "absolute",
                    "z-index": 75
                }).jAddClass("defParentDiv");
                F = this.parSize.width / this.count;
                for (J = 0; J < this.count; ++J) {
                    I = (J * F + F);
                    if (J < this.count / 2) {
                        G += 10
                    } else {
                        G -= 10
                    }
                    this.blockTr[J] = y.$new("div", {}, {
                        width: this.parSize.width,
                        height: this.parSize.height,
                        "z-index": G,
                        position: "absolute"
                    });
                    this.blockTr[J].jSetCssProp(d, "none").jSetCssProp(h, "preserve-3d").jSetCssProp(j, "50% 50% " + (this.parSize.height / 2 * (-1)) + "px");
                    if (!y.browser.gecko) {
                        this.blockTr[J].jSetCssProp(k, "translateZ(" + (this.parSize.height / 2 * (-1)) + "px)")
                    }
                    this.cloneFace[J] = this.els[0].cloneNode(true);
                    this.cloneNext[J] = this.els[1].cloneNode(true);
                    l([this.cloneFace, this.cloneNext]).jEach(l(function(M, L) {
                        l(M[J]).jSetCss({
                            "z-index": 50,
                            top: "auto",
                            left: 0,
                            position: "absolute",
                            clip: "rect(auto, " + (I + 1) + "px, auto, " + ((J * F) - 1) + "px)"
                        });
                        if (L == 0) {
                            M[J].jSetCssProp(k, "rotateX(0deg)").jSetCssProp(j, "50% 50% 0px")
                        } else {
                            M[J].jSetCssProp(k, "translateY(-50%) translateZ(" + (this.parSize.height / 2 * (-1)) + "px) rotateX(" + this.deg + "deg)").jSetCssProp(j, "50% 50%");
                            this.cloneNext[J].jSetCssProp("z-index", 30)
                        }
                        M[J].jAddClass("backface-visHid")
                    }).jBind(this))
                }
                for (J = 0; J < this.count; ++J) {
                    this.blockTr[J].append(this.cloneFace[J]).append(this.cloneNext[J]);
                    this.block.append(this.blockTr[J])
                }
                this.els[0].parentNode.append(this.block);
                this.els[0].hide();
                this.els[1].hide();
                this.something_()
            },
            removeblock_: function() {
                if (this.count_ == this.count) {
                    this.els[0].show();
                    this.els[1].show();
                    this.block.kill();
                    this.container.jSetCssProp("overflow", "");
                    this.container.jRemoveClass("transformStyle").jRemoveClass("defParentDiv");
                    this.container.parentNode.jSetCssProp("overflow", "hidden")
                }
            },
            stop: function() {
                if (!this.flag) {
                    this.flag = true;
                    this.count_ = this.count;
                    this.removeblock_()
                }
            },
            start: function(N) {
                N.start && N.start();
                var M, H = 0,
                    J = l(["top", "left"]).contains(this.o.direction) ? true : false,
                    K = J ? (this.count) : -1,
                    L = J ? 0 : (this.count - 1),
                    I = this.o.duration / (this.count * 2),
                    F = this.o.duration / this.count + I,
                    G = F + (I * (this.count - 1));
                F = F + G / this.count;
                this.count_ = 0;
                this.flag = false;
                if (y.browser.engine === "webkit" && !y.browser.chrome || y.browser.gecko) {
                    this.prepareForSafari_();
                    while (K !== L) {
                        this.blockTr[L].jAddEvent("transitionend", l(function(O, P) {
                            if (P.propertyName === "transform") {
                                P.stop();
                                this.count_++;
                                this.blockTr[O].jRemoveEvent(P.type);
                                if (this.count_ == this.count) {
                                    this.flag = true;
                                    this.removeblock_();
                                    N.end && N.end(this)
                                }
                            }
                        }).jBind(this, L));
                        M = {
                            transition: k + " " + F + "ms " + (I * H) + "ms " + this.o.cubicBezier
                        };
                        if (y.browser.gecko) {
                            M[k] = "rotateX(" + (this.deg * (-1)) + "deg)"
                        } else {
                            M[k] = "translateZ(" + (this.parSize.height / 2 * (-1)) + "px) rotateX(" + (this.deg * (-1)) + "deg)"
                        }
                        this.blockTr[L].jSetCss(M);
                        H += 1;
                        J ? (L += 1) : (L -= 1)
                    }
                } else {
                    this.prepare_();
                    while (K !== L) {
                        M = {
                            transition: k + " " + F + "ms " + (I * H) + "ms " + this.o.cubicBezier
                        };
                        this.cloneNext[L].jAddEvent("transitionend", l(function(O, P) {
                            if (P.propertyName === "transform") {
                                P.stop();
                                this.count_++;
                                this.cloneNext[O].jRemoveEvent(P.type);
                                if (this.count_ == this.count) {
                                    this.flag = true;
                                    this.removeblock_();
                                    N.end && N.end(this)
                                }
                            }
                        }).jBind(this, L));
                        l([this.cloneFace, this.cloneNext]).jEach(l(function(P, O) {
                            M[k] = "rotate" + this.os + "(" + (O ? 0 : (this.deg * (-1))) + "deg)";
                            P[L].jSetCss(M)
                        }).jBind(this));
                        H += 1;
                        J ? (L += 1) : (L -= 1)
                    }
                }
            }
        });
        return E
    })();
    y.Effects.Blinds3d = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            this._options = {
                cubicBezier: "cubic-bezier(0, 0, 1, 1)"
            };
            this.o = this._options;
            y.extend(this.o, F || {});
            this.oduration = 10000;
            this.name = "blinds3d";
            this.count = 5;
            this.imgSize = this.els[0].jGetSize();
            this.cont = this.els[0].parentNode.jGetPosition();
            this.flag = false;
            if (this.o.direction == "right" || this.o.direction == "bottom") {
                this.d = "rb"
            } else {
                this.d = "tl"
            }
        };
        y.inherit(E, y.Effects.Blank);
        y.extend(E.prototype, {
            prepare_: function() {
                var L, H, I, J, M, O, N, G, K = l(["ios", "mac"]).contains(y.browser.platform),
                    F = (this.d) == "rb" ? -180 : 180;
                this.els[1].show();
                this.blocks1 = y.$new("div", {}, {
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    "z-index": 55,
                }).jAddClass("defParentDiv");
                if (y.browser.webkit) {
                    this.blocks1.jSetCssProp(h, "preserve-3d").jSetCssProp(a, "50% 50%")
                }
                this.container.jSetCssProp("overflow", "visible");
                this.container.parentNode.jSetCssProp("overflow", "visible");
                this.imgArray = new Array(this.count);
                this.nextImgArray = new Array(this.count);
                L = this.imgSize.width / this.count;
                if (!K) {
                    L = L - (L % 1)
                }
                for (H = 0; H < this.count; ++H) {
                    I = (H * L + L);
                    M = L;
                    if (H == this.count - 1) {
                        I = this.imgSize.width;
                        M = I - (L * H)
                    }
                    J = {
                        top: 0,
                        left: 0,
                        position: "absolute",
                        clip: "rect(auto, " + (I) + "px, auto, " + (H * L) + "px)"
                    };
                    if (!K) {
                        J.left = (L * H) + "px";
                        J.width = M + "px";
                        J.height = "100%";
                        J.overflow = "hidden";
                        delete J.clip
                    }
                    O = {
                        top: 0,
                        left: (L * H * (-1)) + "px",
                        width: this.imgSize.width + "px",
                        height: this.imgSize.height + "px",
                        position: "absolute",
                        clip: "rect(auto, " + (I) + "px, auto, " + (H * L) + "px)"
                    };
                    G = {};
                    if (K) {
                        N = l(this.els[0].cloneNode(true));
                        G[j] = (H * L + L / 2) + "px 50%"
                    } else {
                        N = y.$new("div").append(l(this.els[0].cloneNode(true)));
                        G[j] = "50% 50%"
                    }
                    N.jSetCss(J).jSetCssProp("z-index", 50).jSetCssProp("backface-visibility", "hidden").jSetCss(G);
                    if (!K) {
                        l(N.firstChild).jSetCss(O)
                    }
                    this.imgArray[H] = N;
                    G = {};
                    if (K) {
                        this.nextImgArray[H] = l(this.els[1].cloneNode(true));
                        N = l(this.els[1].cloneNode(true));
                        G[j] = (H * L + L / 2) + "px 50%"
                    } else {
                        N = y.$new("div").append(l(this.els[1].cloneNode(true)));
                        G[j] = "50% 50%"
                    }
                    N.jSetCss(J).jSetCssProp("z-index", 30).jSetCssProp("backface-visibility", "hidden").jSetCss(G);
                    if (!K) {
                        l(N.firstChild).jSetCss(O)
                    }
                    this.nextImgArray[H] = N;
                    if ("edge" === y.browser.uaName) {
                        this.imgArray[H].jSetCssProp("opacity", 1);
                        this.imgArray[H].jSetCssProp(k, "translateZ(1px) rotateX(0deg) rotateY(0deg)");
                        this.nextImgArray[H].jSetCssProp("opacity", 0);
                        this.nextImgArray[H].jSetCssProp(k, "translateZ(1px) rotateX(0deg) rotateY(" + F + "deg)")
                    } else {
                        this.imgArray[H].jSetCssProp(k, "rotateX(0deg) rotateY(0deg)");
                        this.nextImgArray[H].jSetCssProp(k, "rotateX(0deg) rotateY(" + F + "deg)")
                    }
                    this.blocks1.append(this.imgArray[H]);
                    this.blocks1.append(this.nextImgArray[H])
                }
                this.els[1].parentNode.append(this.blocks1);
                this.els[0].hide();
                this.els[1].hide();
                this.something_()
            },
            removeblock_: function(F) {
                if (this.count_ == this.count) {
                    this.blocks1.kill();
                    this.els[0].show();
                    this.els[1].show();
                    this.flag = false;
                    this.container.jSetCssProp("overflow", "");
                    this.container.parentNode.jSetCssProp("overflow", "hidden")
                }
            },
            stop: function() {
                if (this.flag) {
                    this.count_ = this.count;
                    this.removeblock_()
                }
            },
            start: function(N) {
                N.start && N.start();
                var H = this.o.duration / (this.count * 2),
                    F = this.o.duration / this.count + H,
                    G = F + (H * (this.count - 1)),
                    J, I, K, M, L;
                F = F + G / this.count;
                this.prepare_();
                this.flag = true;
                this.count_ = 0;
                if (this.d == "rb") {
                    J = 180;
                    I = 0
                } else {
                    J = (-180);
                    I = 0
                }
                for (L = 0; L < this.count; ++L) {
                    (this.d == "tl") ? (K = this.count - L - 1) : (K = L);
                    if ("edge" === y.browser.uaName) {
                        this.imgArray[L].jSetCssProp("opacity", 0);
                        this.imgArray[L].jSetCssProp(k, "translateZ(1px) rotateX(0deg) rotateY(" + J + "deg)");
                        this.nextImgArray[L].jSetCssProp("opacity", 1);
                        this.nextImgArray[L].jSetCssProp(k, "translateZ(1px) rotateX(0deg) rotateY(" + I + "deg)")
                    } else {
                        this.imgArray[L].jSetCssProp(k, "rotateX(0deg) rotateY(" + J + "deg)");
                        this.nextImgArray[L].jSetCssProp(k, "rotateX(0deg) rotateY(" + I + "deg)")
                    }
                    M = {
                        "z-index": 30,
                        transition: "all " + F + "ms " + (H * L) + "ms " + this.o.cubicBezier
                    };
                    M[y.browser.cssPrefix + "transition"] = "all " + F + "ms " + (H * L) + "ms " + this.o.cubicBezier;
                    this.imgArray[K].jSetCss(M);
                    M["z-index"] = 50;
                    this.nextImgArray[K].jSetCss(M);
                    this.callback = l(function(O, P) {
                        P.stop();
                        this.count_++;
                        this.imgArray[O].jRemoveEvent(P.type);
                        this.nextImgArray[O].jRemoveEvent(P.type);
                        if (this.count_ == this.count) {
                            this.flag = false;
                            this.removeblock_();
                            N.end && N.end(this)
                        }
                    }).jBind(this, L);
                    this.imgArray[L].jAddEvent("transitionend", this.callback);
                    this.nextImgArray[L].jAddEvent("transitionend", this.callback)
                }
            }
        });
        return E
    })();
    y.Effects.Blocks = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            y.extend(this._options, {
                cubicBezier: "cubic-bezier(0, 0, 1, 1)"
            });
            this.o = this._options;
            y.extend(this.o, F || {});
            this.name = "blocks";
            this.X = 5;
            this.Y = 4;
            this.contPos = this.container.jGetPosition();
            this.flag = false
        };
        y.inherit(E, y.Effects.Blank);
        y.extend(E.prototype, {
            prepare_: function() {
                var J = $mjs(this.els[0]).jGetSize(),
                    I, G, M, K, H, L, F = (y.browser.trident && y.browser.ieMode == 7) ? "" : ",";
                this.blocks = y.$new("div", {}, {
                    top: "0",
                    left: "0",
                    width: J.width,
                    height: J.height,
                    position: "absolute",
                    "z-index": 55
                });
                this.arr = new Array(this.X);
                this.sizeClip = new Array(this.X);
                for (I = 0; I < this.X; ++I) {
                    this.arr[I] = new Array(this.Y);
                    this.sizeClip[I] = new Array(this.Y)
                }
                G = J.width / this.X;
                M = J.height / this.Y;
                for (I = 0, K = 0; K < this.X, I < J.width; I += G, ++K) {
                    for (H = 0, L = 0; L < this.Y, H < J.height; H += M, ++L) {
                        this.sizeClip[K][L] = {
                            Y1: H,
                            X1: I + G,
                            Y2: H + M,
                            X2: I
                        };
                        this.arr[K][L] = $mjs(this.els[0].cloneNode(true));
                        this.arr[K][L].jSetCss({
                            position: "absolute",
                            clip: "rect(" + H + "px" + F + " " + (I + G) + "px" + F + " " + (H + M) + "px" + F + " " + I + "px)",
                            overflow: "hidden",
                            opacity: 1
                        });
                        this.blocks.append(this.arr[K][L])
                    }
                }
                this.els[0].parentNode.append(this.blocks);
                this.blocks.jSetCssProp("z-index", 100).show();
                this.els[0].hide();
                this.els[1].show();
                this.something_()
            },
            removeblock_: function() {
                if (this.count_ + 1 == (this.X + this.Y - 1)) {
                    this.blocks.jRemove();
                    this.els[0].show();
                    this.els[1].show()
                }
            },
            stop: function() {
                if (!this.flag) {
                    this.count_ = this.X + this.Y - 1;
                    if (y.browser.trident && y.browser.ieMode < 10) {
                        for (var F = 0; F < this.count_; ++F) {
                            clearTimeout(this.ieTimeOut[F])
                        }
                    }
                }
                if (this.blocks) {
                    this.blocks.kill();
                    this.blocks = null
                }
            },
            start: function(W) {
                W.start && W.start();
                W.end && (this.inSide = W.end);
                var L = this.o.duration / (this.X + this.Y - 1),
                    I, T = 0,
                    R = 0,
                    S = -1,
                    Q = 0,
                    J = 0,
                    U, O, M, H, N, P, G, K, F, V;
                this.count_ = 0;
                this.prepare_();
                this.flag = false;
                if (y.browser.trident && y.browser.ieMode < 10) {
                    this.ieTimeOut = new Array(this.X + this.Y - 1);
                    this.ieArrEff = new Array(this.X + this.Y - 1);
                    this.arrEl = new Array(this.X + this.Y - 1)
                }
                for (U = 0; U < this.X + this.Y - 1; ++U) {
                    if (U > this.X - 1 || U > this.Y - 1) {
                        T++
                    }
                    if (S < this.X - 1) {
                        S++
                    }
                    if (Q <= this.Y - 1) {
                        Q++
                    }
                    if (U > this.Y) {
                        R++
                    }
                    for (O = S, M = R; O >= T, M < Q; --O, ++M) {
                        if (y.browser.trident && y.browser.ieMode < 10) {
                            !this.ieArrEff[U] && (this.ieArrEff[U] = []);
                            !this.arrEl[U] && (this.arrEl[U] = []);
                            this.ieArrEff[U].push(this.sizeClip[O][M]);
                            this.arrEl[U].push(this.arr[O][M])
                        } else {
                            I = {
                                opacity: 0,
                                clip: "rect(" + (this.sizeClip[O][M].Y1 + 15) + "px, " + (this.sizeClip[O][M].X1 - 15) + "px, " + (this.sizeClip[O][M].Y2 - 15) + "px, " + (this.sizeClip[O][M].X2 + 15) + "px)",
                                transition: "all " + L + "ms " + (U * L) + "ms " + this.o.cubicBezier
                            };
                            I[y.browser.cssPrefix + "transition"] = "all " + L + "ms " + (U * L) + "ms " + this.o.cubicBezier;
                            this.arr[O][M].jSetCss(I);
                            this.callback = l(function(Z, Y, X, aa) {
                                aa.stop();
                                this.arr[Z][Y].jRemoveEvent(aa.type);
                                this.count_ = X;
                                if (this.count_ + 1 == (this.X + this.Y - 1)) {
                                    this.flag = true;
                                    this.removeblock_();
                                    W.end && W.end(this)
                                }
                            }).jBind(this, O, M, U);
                            this.arr[O][M].jAddEvent("transitionend", this.callback)
                        }
                    }
                }
                if (y.browser.trident && y.browser.ieMode < 10) {
                    H = this.X + this.Y - 1;
                    N = new Array(H);
                    V = (y.browser.trident && y.browser.ieMode == 7) ? "" : ",";
                    !this.iePFX && (this.iePFX = new Array(H));
                    for (G = 0; G < H; ++G) {
                        this.iePFX[G] = new y.PFX(this.arrEl[G], {
                            duration: L,
                            onComplete: l(function() {
                                this.count_++;
                                if (this.count_ == H) {
                                    this.flag = true;
                                    this.removeblock_();
                                    this.inSide && this.inSide(this);
                                    this.outSide && this.outSide()
                                }
                            }).jBind(this),
                            onBeforeRender: l(function(X, Y) {
                                Y.jSetCss({
                                    clip: "rect(" + X.clipY1 + "px" + V + " " + X.clipX1 + "px" + V + " " + X.clipY2 + "px" + V + " " + X.clipX2 + "px)"
                                })
                            }).jBind(this),
                            onStart: l(function() {
                                this.flag = false
                            }).jBind(this)
                        });
                        K = this.ieArrEff[G].length;
                        for (F = 0; F < K; ++F) {
                            P = {
                                opacity: [1, 0],
                                clipY1: [this.ieArrEff[G][F].Y1, this.ieArrEff[G][F].Y1 + 15],
                                clipX1: [this.ieArrEff[G][F].X1, this.ieArrEff[G][F].X1 - 15],
                                clipY2: [this.ieArrEff[G][F].Y2, this.ieArrEff[G][F].Y2 - 15],
                                clipX2: [this.ieArrEff[G][F].X2, this.ieArrEff[G][F].X2 + 15]
                            };
                            !N[G] && (N[G] = new Array(K));
                            N[G][F] = P
                        }
                        this.ieTimeOut[G] = setTimeout(l(function(X) {
                            this.iePFX[X].start(N[X])
                        }).jBind(this, G), 0 + G * L)
                    }
                }
            }
        });
        return E
    })();
    y.Effects.Cube = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            y.extend(this._options, {
                cubicBezier: "cubic-bezier(0, 0, 1, 1)"
            });
            this.o = this._options;
            y.extend(this.o, F || {});
            this.name = "cube";
            this.deg = 90;
            this.parSize = this.els[0].parentNode.jGetSize();
            this.side = l(["top", "bottom"]).contains(this.o.direction) ? "height" : "width";
            if (l(["top", "bottom"]).contains(this.o.direction)) {
                this.os = "X"
            } else {
                this.os = "Y"
            }
        };
        y.inherit(E, y.Effects.Blank);
        y.extend(E.prototype, {
            prepare_: function() {
                var F = {
                    top: "0",
                    left: "0",
                    width: this.parSize.width,
                    height: this.parSize.height,
                    position: "absolute"
                };
                this.els[1].show();
                if (l(["right", "bottom"]).contains(this.o.direction)) {
                    this.deg *= (-1)
                }
                if (y.browser.engine === "webkit" && !y.browser.chrome) {
                    this.container.jSetCssProp(k, "translateZ(" + ((this.parSize["X" === this.os ? "height" : "width"] / 2) * (-1)) + "px)").jSetCssProp(d, "none").jSetCssProp(h, "preserve-3d");
                    this.container.parentNode.jSetCssProp(d, "1000px")
                } else {
                    this.container.jSetCssProp(k, "translate3d(0, 0, 0)").jSetCssProp(h, "preserve-3d")
                }
                this.container.jSetCssProp("overflow", "visible").jSetCssProp(a, "50% 50%");
                this.container.parentNode.jSetCssProp("overflow", "visible");
                l(this.els).jEach(l(function(G) {
                    G.jSetCssProp("z-index", 50).jSetCssProp(j, "50% 50% " + (this.parSize["Y" === this.os ? "width" : "height"] / 2 * (-1)) + "px");
                    G.jAddClass("backface-visHid")
                }).jBind(this));
                this.els[0].jSetCssProp(k, "rotate" + this.os + "(0deg)");
                this.els[1].jSetCssProp(k, "rotate" + this.os + "(" + this.deg + "deg)");
                this.something_()
            },
            prepareForSafari_: function() {
                var G = l(["top", "bottom"]).contains(this.o.direction) ? "height" : "width",
                    F = 50;
                this.els[1].show();
                this.container.parentNode.jAddClass("defParentDiv");
                this.container.jSetCssProp(d, "none").jSetCssProp(h, "preserve-3d").jSetCssProp(j, "50% 50% " + (this.parSize[G] / 2 * (-1)) + "px");
                if (!y.browser.gecko) {
                    this.container.jSetCssProp(k, "translateZ(" + (this.parSize[G] / 2 * (-1)) + "px)")
                }
                if (l(["left", "top"]).contains(this.o.direction)) {
                    F *= (-1);
                    this.deg *= (-1)
                }
                l(this.els).jEach(l(function(I, H) {
                    if (H == 0) {
                        I.jSetCssProp(k, "rotate" + this.os + "(0deg)").jSetCssProp(j, "50% 50% 0px")
                    } else {
                        I.jSetCssProp(k, "translate" + ("Y" === this.os ? "X" : "Y") + "(" + F + "%) translateZ(" + (this.parSize[G] / 2 * (-1)) + "px) rotate" + this.os + "(" + this.deg + "deg)").jSetCssProp(j, "50% 50%")
                    }
                    I.jAddClass("backface-visHid")
                }).jBind(this));
                this.something_()
            },
            removeblock_: function() {
                this.clearStyles();
                this.container.parentNode.jSetCssProp("overflow", "hidden");
                this.container.jSetCssProp(a, "")
            },
            clearStyles: function() {
                if (y.browser.engine === "webkit" && !y.browser.chrome || y.browser.gecko) {
                    this.container.parentNode.jRemoveClass("defParentDiv");
                    this.container.jSetCssProp(d, "").jSetCssProp(j, "").jSetCssProp(k, "").jSetCssProp("transition", "").jSetCssProp(h, "");
                    l(this.els).jEach(l(function(F) {
                        F.jSetCssProp(k, "").jSetCssProp(j, "").jRemoveClass("backface-visHid")
                    }).jBind(this))
                } else {
                    l(this.els).jEach(l(function(F) {
                        F.jSetCss({
                            "z-index": "",
                            transition: ""
                        });
                        F.jSetCssProp(k, "").jSetCssProp(j, "");
                        F.jRemoveClass("backface-visHid")
                    }).jBind(this));
                    this.container.jSetCssProp(k, "");
                    if (y.browser.engine === "webkit" && !y.browser.chrome) {
                        this.container.jSetCssProp(d, "").jSetCssProp(h, "");
                        this.container.parentNode.jSetCssProp(d, "").jSetCssProp(k, "")
                    } else {
                        this.container.jSetCssProp("transform-style", "")
                    }
                }
            },
            stop: function() {
                if (!this.flag) {
                    this.flag = true;
                    this.els[1].jRemoveEvent("transitionend");
                    this.removeblock_()
                }
            },
            start: function(H) {
                H.start && H.start();
                var G = parseInt(this.o.duration),
                    F;
                this.flag = false;
                if (y.browser.engine === "webkit" && !y.browser.chrome || y.browser.gecko) {
                    if (l(["bottom", "top"]).contains(this.o.direction)) {
                        this.deg *= (-1)
                    }
                    this.prepareForSafari_();
                    this.container.jAddEvent("transitionend", l(function(I) {
                        if (I.propertyName === "transform") {
                            I.stop();
                            this.flag = true;
                            this.container.jRemoveEvent(I.type);
                            this.removeblock_();
                            H.end && H.end(this)
                        }
                    }).jBind(this));
                    this.container.jSetCssProp("transition", k + " " + G + "ms " + this.o.cubicBezier);
                    if (y.browser.gecko) {
                        this.container.jSetCssProp(k, "rotate" + this.os + "(" + (this.deg * (-1)) + "deg)")
                    } else {
                        this.container.jSetCssProp(k, "translateZ(" + (this.parSize[this.side] / 2 * (-1)) + "px) rotate" + this.os + "(" + (this.deg * (-1)) + "deg)")
                    }
                } else {
                    this.prepare_();
                    this.els[1].jAddEvent("transitionend", l(function(I) {
                        if (I.propertyName === "transform") {
                            I.stop();
                            this.flag = true;
                            this.els[1].jRemoveEvent(I.type);
                            this.removeblock_();
                            H.end && H.end(this)
                        }
                    }).jBind(this));
                    F = {
                        transition: k + " " + G + "ms " + this.o.cubicBezier
                    };
                    l([this.els[0], this.els[1]]).jEach(l(function(J, I) {
                        F[k] = "rotate" + this.os + "(" + (!I ? (this.deg * (-1)) : 0) + "deg)";
                        J.jSetCss(F)
                    }).jBind(this))
                }
            }
        });
        return E
    })();
    y.Effects.Diffusion = (function() {
        var E = function(G, F) {
            y.Effects.Blank.apply(this, arguments);
            y.extend(this._options, {
                cubicBezier: "cubic-bezier(0, 0, 1, 1)"
            });
            this.o = this._options;
            y.extend(this.o, F || {});
            this.name = "diffusion";
            this.count = 5
        };
        y.inherit(E, y.Effects.Blank);
        y.extend(E.prototype, {
            prepare_: function() {
                var J = this.els[0].parentNode.jGetSize(),
                    I = this.els[0].parentNode.jGetPosition(),
                    K, G, H, F = (y.browser.trident && y.browser.ieMode < 8) ? "" : ",";
                this.block = y.$new("div", {}, {
                    top: "0",
                    left: "0",
                    position: "absolute",
                    width: J.width,
                    height: J.height,
                    "z-index": 155
                });
                K = J.height / (this.count * 2 + 1);
                G = J.width / (this.count * 2 + 1);
                this.clone = new Array(this.count);
                for (var H = 0; H < this.count; ++H) {
                    this.clone[H] = this.els[1].cloneNode(true);
                    $mjs(this.clone[H]).jSetCss({
                        position: "absolute",
                        clip: "rect(" + (K * H) + "px" + F + " " + (J.width - (G * H)) + "px" + F + " " + (J.height - (K * H)) + "px" + F + " " + (K * H) + "px)",
                        "z-index": (H + 55),
                        opacity: 0
                    }).show()
                }
                for (H = 0; H < this.count; ++H) {
                    this.block.append(this.clone[H])
                }
                this.els[0].parentNode.append(this.block);
                this.els[1].hide();
                this.something_();
                if (y.browser.trident && y.browser.ieMode < 10) {
                    this.iePFX = new Array(this.count);
                    for (H = this.count - 1; H >= 0; --H) {
                        this.iePFX[this.count - H - 1] = new y.PFX([this.clone[H]], {
                            duration: this.dur_,
                            onComplete: l(function() {
                                this.count_++;
                                if (this.count_ == this.count) {
                                    this.flag = true;
                                    this.removeblock_();
                                    this.inSide && this.inSide(this)
                                }
                            }).jBind(this),
                            onBeforeRender: l(function(L, M) {
                                M.jSetOpacity(L.opacity)
                            }).jBind(this),
                            onStart: l(function() {
                                this.flag = false
                            }).jBind(this)
                        })
                    }
                }
            },
            removeblock_: function() {
                if (this.count == this.count_) {
                    this.els[0].show();
                    this.els[1].show();
                    this.block.jSetCssProp("z-index", 1);
                    this.block.kill()
                }
            },
            stop: function() {
                if (!this.flag) {
                    if (y.browser.trident && y.browser.ieMode < 10) {
                        for (var F = 0; F < this.count; ++F) {
                            clearTimeout(this.ieTimeOut[F])
                        }
                    }
                    this.count_ = this.count;
                    this.flag = true;
                    this.removeblock_()
                }
            },
            start: function(I) {
                I.start && I.start();
                I.end && (this.inSide = I.end);
                this.step_ = this.o.duration / (this.count * 2);
                var H = this.o.duration / this.count + this.step_,
                    J = H + (this.step_ * (this.count - 1)),
                    G, F;
                this.dur_ = H + J / this.count;
                this.count_ = 0;
                this.ieTimeOut = new Array(this.count);
                this.prepare_();
                this.flag = false;
                for (F = this.count - 1; F >= 0; --F) {
                    if (y.browser.trident && y.browser.ieMode < 10) {
                        this.ieTimeOut = setTimeout(l(function(K) {
                            this.iePFX[this.count - K - 1].start([{
                                opacity: [0, 1]
                            }])
                        }).jBind(this, F), this.step_ * (this.count - F - 1))
                    } else {
                        G = {
                            opacity: 1,
                            transition: "all " + this.dur_ + "ms " + (this.step_ * (this.count - F)) + "ms " + this.o.cubicBezier
                        };
                        G[y.browser.cssPrefix + "transition"] = "all " + this.dur_ + "ms " + (this.step_ * (this.count - F)) + "ms " + this.o.cubicBezier;
                        this.clone[F].jSetCss(G);
                        this.callback = l(function(K, L) {
                            L.stop();
                            this.count_++;
                            this.clone[K].jRemoveEvent(L.type);
                            if (this.count == this.count_) {
                                this.flag = true;
                                this.removeblock_();
                                I.end && I.end(this)
                            }
                        }).jBind(this, F);
                        this.clone[F].jAddEvent("transitionend", this.callback)
                    }
                }
            }
        });
        return E
    })();
    y.Effects.Flip = (function() {
        var E = function(K, I) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "flip";
            var H = 0,
                G = 0,
                L = 0,
                J = 0,
                F = 0,
                M = 0;
            if (y.$A(["left", "right"]).contains(this.o.direction)) {
                M = "-180";
                L = (this.o.direction == "left") ? "-180" : "180";
                J = (this.o.direction == "left") ? "-360" : "0"
            } else {
                F = "-180";
                H = (this.o.direction == "top") ? "180" : "-180";
                G = (this.o.direction == "top") ? "0" : "-360"
            }
            this.container.jSetCssProp(k, "translate3d(0,0,0)");
            this.container.jSetCss({
                overflow: "visible",
                "perspective-origin": "50% 50%"
            });
            if (y.browser.engine === "webkit" && y.browser.chrome) {
                this.container.jAddClass("transformStyle")
            }
            this.container.parentNode.jSetCssProp("overflow", "visible");
            this.stylesBefore = {
                el1: {
                    "z-index": 50,
                    transform: "rotateX(0deg) rotateY(0deg)",
                    "backface-visibility": "hidden"
                },
                el2: {
                    "z-index": 30,
                    transform: "rotateX(" + F + "deg) rotateY(" + M + "deg)",
                    "backface-visibility": "hidden"
                }
            };
            this.stylesAfter = {
                el1: {
                    "z-index": 30,
                    transform: "rotateX(" + H + "deg) rotateY(" + L + "deg)",
                    "backface-visibility": "hidden"
                },
                el2: {
                    "z-index": 50,
                    transform: "rotateX(" + G + "deg) rotateY(" + J + "deg)",
                    "backface-visibility": "hidden"
                }
            };
            this.stylesReset = {
                transform: "",
                "z-index": "",
                "backface-visibility": ""
            };
            this.stylesBefore.el1[y.browser.cssPrefix + "transform"] = "rotateX(0deg) rotateY(0deg)";
            this.stylesBefore.el1[y.browser.cssPrefix + "backface-visibility"] = "hidden";
            this.stylesBefore.el2[y.browser.cssPrefix + "transform"] = "rotateX(" + F + "deg) rotateY(" + M + "deg)";
            this.stylesBefore.el2[y.browser.cssPrefix + "backface-visibility"] = "hidden";
            this.stylesAfter.el1[y.browser.cssPrefix + "transform"] = "rotateX(" + H + "deg) rotateY(" + L + "deg)";
            this.stylesAfter.el2[y.browser.cssPrefix + "transform"] = "rotateX(" + G + "deg) rotateY(" + J + "deg)";
            this.stylesReset[y.browser.cssPrefix + "transform"] = "";
            this.stylesReset[y.browser.cssPrefix + "backface-visibility"] = ""
        };
        y.inherit(E, y.Effects.Blank);
        y.extend(E.prototype, {
            jRemoveClasses_: function(F) {
                this.container.jSetCssProp(k, "");
                this.container.jSetCss({
                    "perspective-origin": ""
                });
                this.container.jRemoveClass("transformStyle");
                this.container.parentNode.jSetCssProp("overflow", "hidden");
                E.$parent.jRemoveClasses_.call(this, F)
            }
        });
        return E
    })();
    y.Effects.SlideIn = (function() {
        var E = function(H, G) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "slide-in";
            var F = 100,
                I = 100;
            if (y.$A(["left", "right"]).contains(this.o.direction)) {
                I = 0;
                if (this.o.direction == "left") {
                    F *= (-1)
                }
            } else {
                F = 0;
                if (this.o.direction == "top") {
                    I *= (-1)
                }
            }
            this.stylesBefore = {
                el1: {
                    transform: "translate(0%, 0%)",
                    "z-index": 30
                },
                el2: {
                    transform: "translate(" + F + "%, " + I + "%)",
                    "z-index": 50
                }
            };
            this.stylesAfter = {
                el1: {
                    transform: "translate(0%, 0%)",
                    "z-index": 35
                },
                el2: {
                    transform: "translate(0%, 0%)",
                    "z-index": 50
                }
            };
            this.stylesReset = {
                transform: "",
                "z-index": ""
            };
            this.stylesBefore.el1[y.browser.cssPrefix + "transform"] = "translate(0%, 0%)";
            this.stylesBefore.el2[y.browser.cssPrefix + "transform"] = "translate(" + F + "%, " + I + "%)";
            this.stylesAfter.el1[y.browser.cssPrefix + "transform"] = "translate(0%, 0%)";
            this.stylesAfter.el2[y.browser.cssPrefix + "transform"] = "translate(0%, 0%)";
            this.stylesReset[y.browser.cssPrefix + "transform"] = ""
        };
        y.inherit(E, y.Effects.Blank);
        (y.browser.trident && y.browser.ieMode < 10) && y.extend(E.prototype, {
            calcDirect_: function() {
                var H, G, F, I = this.o.direction;
                F = (this.o.direction == "left" || this.o.direction == "right") ? "left" : "top";
                H = ["0%", "0%"];
                switch (I) {
                    case "left":
                    case "top":
                        G = ["-100%", "0%"];
                        break;
                    case "right":
                    case "bottom":
                        G = ["100%", "0%"];
                        break
                }
                this.effMove_ = {
                    el0: H,
                    el1: G,
                    style: F
                }
            },
            onComplete_: function() {
                this.flag = false;
                var G = "0%",
                    F;
                for (F = 0; F < 2; ++F) {
                    this.els[F].jSetCssProp(this.effMove_.style, G)
                }
                this.els[0].jSetCssProp("z-index", "");
                this.els[1].jSetCssProp("z-index", "");
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onStart_: function() {
                this.flag = true;
                this.els[0].jSetCssProp("z-index", 30);
                this.els[1].jSetCss({
                    "z-index": 50
                });
                this.els[1].jSetCssProp(this.effMove_.style, this.effMove_.el1[0])
            },
            transition_: y.FX.Transition.expoOut,
            stop: function() {
                if (this.flag) {
                    this.ieEff.stop(false);
                    this.onComplete_()
                }
            },
            start: function(J) {
                J.start && J.start();
                J.end && (this.inSide = J.end);
                this.calcDirect_();
                var I = this.effMove_.style,
                    H = this.effMove_.el0,
                    G = this.effMove_.el1,
                    F = [{}, {}];
                this.prepare_();
                F[0][I] = H;
                F[1][I] = G;
                this.ieEff.start(F)
            }
        });
        return E
    })();
    y.Effects.SlideOut = (function() {
        var E = function(H, G) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "slide-out";
            var F = 100,
                J = 100,
                I;
            this.actionIndex = 0;
            if (y.$A(["left", "right"]).contains(this.o.direction)) {
                J = 0;
                if (this.o.direction == "right") {
                    F *= (-1)
                }
            } else {
                F = 0;
                if (this.o.direction == "bottom") {
                    J *= (-1)
                }
            }
            this.stylesBefore = {
                el1: {
                    transform: "translate(0%, 0%)",
                    "z-index": 50
                },
                el2: {
                    transform: "translate(0%, 0%)",
                    "z-index": 30
                }
            };
            this.stylesAfter = {
                el1: {
                    transform: "translate(" + F + "%, " + J + "%)",
                    "z-index": 50
                },
                el2: {
                    transform: "translate(0%, 0%)",
                    "z-index": 35
                }
            };
            this.stylesReset = {
                transform: "",
                "z-index": ""
            };
            I = y.browser.cssPrefix + "transform";
            this.stylesBefore.el1[I] = "translate(0%, 0%)";
            this.stylesBefore.el2[I] = "translate(0%, 0%)";
            this.stylesAfter.el1[I] = "translate(" + F + "%, " + J + "%)";
            this.stylesAfter.el2[I] = "translate(0%, 0%)";
            this.stylesReset[I] = ""
        };
        y.inherit(E, y.Effects.Blank);
        (y.browser.trident && y.browser.ieMode < 10) && y.extend(E.prototype, {
            calcDirect_: function() {
                var H, G, F, I = this.o.direction;
                F = (this.o.direction == "left" || this.o.direction == "right") ? "left" : "top";
                G = ["0%", "0%"];
                switch (I) {
                    case "left":
                    case "top":
                        H = ["0%", "100%"];
                        break;
                    case "right":
                    case "bottom":
                        H = ["0%", "-100%"];
                        break
                }
                this.effMove_ = {
                    el0: H,
                    el1: G,
                    style: F
                }
            },
            onComplete_: function() {
                this.flag = false;
                var G = "0%",
                    F;
                for (F = 0; F < 2; ++F) {
                    this.els[F].jSetCssProp(this.effMove_.style, G)
                }
                this.els[0].jSetCssProp("z-index", "");
                this.els[1].jSetCssProp("z-index", "");
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onStart_: function() {
                this.els[0].jSetCssProp("z-index", 50);
                this.els[1].jSetCss({
                    "z-index": 30
                });
                this.els[1].jSetCssProp(this.effMove_.style, this.effMove_.el1[0]);
                this.flag = true
            },
            transition_: y.FX.Transition.expoOut,
            stop: function() {
                if (this.flag) {
                    this.ieEff.stop(false);
                    this.onComplete_()
                }
            },
            start: function(J) {
                J.start && J.start();
                J.end && (this.inSide = J.end);
                this.calcDirect_();
                var I = this.effMove_.style,
                    H = this.effMove_.el0,
                    G = this.effMove_.el1,
                    F = [{}, {}];
                this.prepare_();
                F[0][I] = H;
                F[1][I] = G;
                this.ieEff.start(F)
            }
        });
        return E
    })();
    y.Effects.SlideChange = (function() {
        var E = function(H, G) {
            y.Effects.Blank.apply(this, arguments);
            this.name = "slide-change";
            var F = 200,
                I = 200;
            if (y.$A(["left", "right"]).contains(this.o.direction)) {
                I = 0;
                if (this.o.direction == "left") {
                    F *= (-1)
                }
            } else {
                F = 0;
                if (this.o.direction == "top") {
                    I *= (-1)
                }
            }
            this.stylesBefore = {
                el1: {
                    transform: "translate(0%, 0%)"
                },
                el2: {
                    transform: "translate(" + F + "%, " + I + "%)"
                }
            };
            this.stylesAfter = {
                el1: {
                    transform: "translate(" + F + "%, " + I + "%)"
                },
                el2: {
                    transform: "translate(0%, 0%)"
                }
            };
            this.stylesReset = {
                transform: ""
            };
            this.stylesBefore.el1[y.browser.cssPrefix + "transform"] = "translate(0%, 0%)";
            this.stylesBefore.el2[y.browser.cssPrefix + "transform"] = "translate(" + F + "%, " + I + "%)";
            this.stylesAfter.el1[y.browser.cssPrefix + "transform"] = "translate(" + F + "%, " + I + "%)";
            this.stylesAfter.el2[y.browser.cssPrefix + "transform"] = "translate(0%, 0%)";
            this.stylesReset[y.browser.cssPrefix + "transform"] = ""
        };
        y.inherit(E, y.Effects.Blank);
        (y.browser.trident && y.browser.ieMode < 10) && y.extend(E.prototype, {
            calcDirect_: function() {
                var H, G, F = this.o.direction;
                H = ["0%", "-200%"];
                G = ["-200%", "0%"];
                this.effMove_ = {
                    el0: H,
                    el1: G,
                    style: F
                }
            },
            onComplete_: function() {
                this.flag = false;
                var G = "0%",
                    F;
                this.els[0].show();
                this.els[1].show();
                for (F = 0; F < 2; ++F) {
                    this.els[F].jSetCssProp(this.effMove_.style, G)
                }
                this.inSide && this.inSide(this);
                this.outSide && this.outSide()
            },
            onStart_: function() {
                var F = {
                    left: "auto",
                    right: "auto",
                    top: "auto",
                    bottom: "auto"
                };
                this.els[0].jSetCss(F);
                this.els[1].jSetCss(F);
                this.els[0].jSetCssProp("z-index", 80).show();
                this.els[1].jSetCssProp("z-index", 80);
                this.els[1].jSetCssProp(this.effMove_.style, this.effMove_.el1[0]);
                this.show(this.els[1], true);
                this.flag = true
            },
            transition_: y.FX.Transition.linear,
            stop: function() {
                if (this.flag) {
                    this.ieEff.stop(false);
                    this.onComplete_()
                }
            },
            start: function(J) {
                J.start && J.start();
                J.end && (this.inSide = J.end);
                this.calcDirect_();
                var I = this.effMove_.style,
                    H = this.effMove_.el0,
                    G = this.effMove_.el1,
                    F = [{}, {}];
                this.prepare_();
                F[0][I] = H;
                F[1][I] = G;
                this.ieEff.start(F)
            }
        });
        return E
    })();
    y.Effects.CaptionEffects = {};
    y.Effects.CaptionEffects.Blank = (function() {
        var E = function(G, H, F) {
            this.name = "blank";
            this.type = H;
            this.phase = "start";
            this.el = l(G);
            this.container = l(this.el.parentNode);
            this._options = {
                outSpeed: 1000,
                outDelay: 0,
                outEasing: "ease",
                outFade: false,
                outOffset: "outside",
                inSpeed: 1000,
                inDelay: 0,
                inEasing: "ease",
                inFade: false,
                inOffset: "outside",
                insideOpacity: null
            };
            this.o = this._options;
            y.extend(this.o, F || {})
        };
        y.extend(E.prototype, {
            getMatrixPosition: function(G) {
                var F = {
                    x: 0,
                    y: 0
                };
                (G.jGetCss(k) || "").replace(/matrix\(([^\)]+)\)/, function(J, I) {
                    var H = I.split(",");
                    F.x += parseInt(H[4], 10);
                    F.y += parseInt(H[5])
                });
                return F
            },
            _render: function() {
                this.container.offsetHeight;
                this.el.offsetHeight
            },
            _out: function(F) {
                this.el.hide();
                this.phase = "end"
            },
            _in: function(F) {
                this.el.show();
                this.phase = "end"
            },
            start: function(F) {
                this["_" + this.type](F)
            },
            stop: function() {}
        });
        return E
    })();
    y.Effects.CaptionEffects.From = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.Blank.apply(this, arguments);
            this.name = "from";
            this.side = null;
            this.elementPosition = this.el.jGetPosition();
            this.elementSize = this.el.jGetSize();
            this.containerPosition = this.container.jGetPosition();
            this.containerSize = this.container.jGetSize();
            this.currentMargin = {};
            if (y.browser.ieMode && y.browser.ieMode < 9) {
                this.from = {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                };
                this.to = {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            } else {
                this.os = {
                    from: {
                        x: 0,
                        y: 0
                    },
                    to: {
                        x: 0,
                        y: 0
                    }
                }
            }
            this.opacityFrom = null;
            this.opacityTo = null
        };
        y.inherit(E, y.Effects.CaptionEffects.Blank);
        y.extend(E.prototype, {
            calcOpacity: function() {
                var F;
                if (this.o[this.type + "Fade"]) {
                    F = this.o.insideOpacity || this.el.jGetCss("opacity") || 1;
                    if ("in" === this.type) {
                        this.opacityFrom = 0;
                        this.opacityTo = F
                    } else {
                        this.opacityFrom = F;
                        this.opacityTo = 0
                    }
                }
            },
            getDistanceIe8: function(F) {
                var I = this.o[this.type + "Offset"],
                    G = l(["top", "bottom"]).contains(F) ? "height" : "width",
                    H = l(["top", "bottom"]).contains(F) ? "top" : "left";
                if (!F) {
                    I = 0
                }
                if ("outside" === I) {
                    if (l(["top", "left"]).contains(F)) {
                        I = this.elementPosition[H] - this.containerPosition[H] + this.elementSize[G]
                    } else {
                        I = this.containerSize[G] - (this.elementPosition[H] - this.containerPosition[H])
                    }
                }
                return I
            },
            getMargin: function(G) {
                var F = G;
                if ("bottom" === G) {
                    G = "top"
                }
                if ("right" === G) {
                    G = "left"
                }
                if ("top" === G) {
                    if (null !== this.el.jGetCss("bottom")) {
                        G = "bottom"
                    }
                } else {
                    if (null !== this.el.jGetCss("right")) {
                        G = "right"
                    }
                }
                this.currentMargin[F] = {};
                this.currentMargin[F].side = G;
                this.currentMargin[F].value = this.el.jGetCss("margin-" + G);
                if (this.currentMargin[F].value) {
                    this.currentMargin[F].value = parseInt(this.currentMargin[F].value)
                } else {
                    this.currentMargin[F].value = 0
                }
            },
            getDistance: function(F) {
                var I = this.o[this.type + "Offset"],
                    H = l(["left", "right"]).contains(F) ? "left" : "top",
                    G = "left" === H ? "width" : "height";
                if (!F) {
                    I = 0
                }
                if ("outside" === I) {
                    if (l(["top", "left"]).contains(F)) {
                        I = this.elementPosition[H] - this.containerPosition[H] + this.elementSize[G]
                    } else {
                        I = this.containerSize[G] - (this.elementPosition[H] - this.containerPosition[H])
                    }
                }
                return I
            },
            calcPosition: function() {
                var G = l(["left", "right"]).contains(this.side) ? "left" : "top",
                    F;
                if (y.browser.ieMode && y.browser.ieMode < 9) {
                    this.side.jEach(l(function(H) {
                        this.getMargin(H);
                        F = this.currentMargin[H].side;
                        if ("in" === this.type) {
                            this.to[F] = this.currentMargin[H].value;
                            if (l(["top", "left"]).contains(F)) {
                                if ("top" === H || "left" === H) {
                                    this.from[F] = this.to[F] - this.getDistanceIe8(H)
                                } else {
                                    this.from[F] = this.to[F] + this.getDistanceIe8(H)
                                }
                            } else {
                                if ("top" === H || "left" === H) {
                                    this.from[F] = this.to[F] + this.getDistanceIe8(H)
                                } else {
                                    this.from[F] = this.to[F] - this.getDistanceIe8(H)
                                }
                            }
                        } else {
                            this.from[F] = this.currentMargin[H].value;
                            if (l(["top", "left"]).contains(F)) {
                                if ("top" === H || "left" === H) {
                                    this.to[F] = this.from[F] - this.getDistanceIe8(H)
                                } else {
                                    this.to[F] = this.from[F] + this.getDistanceIe8(H)
                                }
                            } else {
                                if ("top" === H || "left" === H) {
                                    this.to[F] = this.from[F] + this.getDistanceIe8(H)
                                } else {
                                    this.to[F] = this.from[F] - this.getDistanceIe8(H)
                                }
                            }
                        }
                    }).jBind(this))
                } else {
                    if ("in" === this.type) {
                        this.side.jEach(l(function(H) {
                            var I = l(["left", "right"]).contains(H) ? "x" : "y";
                            this.os.from[I] = this.getDistance(H);
                            if ("top" === H || "left" === H) {
                                this.os.from[I] *= (-1)
                            }
                        }).jBind(this))
                    } else {
                        this.side.jEach(l(function(H) {
                            var I = l(["left", "right"]).contains(H) ? "x" : "y";
                            this.os.to[I] = this.getDistance(H);
                            if ("top" === H || "left" === H) {
                                this.os.to[I] *= (-1)
                            }
                        }).jBind(this))
                    }
                }
            },
            prepare: function(F) {
                F.start(this.type);
                if (this.side) {
                    this.side = l(this.side.split(" "))
                }
                this.calcOpacity();
                if (null !== this.opacityFrom) {
                    this.el.jSetOpacity(this.opacityFrom)
                }
                this.side && this.calcPosition();
                if (y.browser.ieMode && y.browser.ieMode < 10) {
                    if (this.side) {
                        if (9 === y.browser.ieMode) {
                            this.el.jSetCssProp(k, "translateX(" + this.os.from.x + "px) translateY(" + this.os.from.y + "px)")
                        } else {
                            this.side.jEach(l(function(G) {
                                this.el.jSetCssProp("margin-" + this.currentMargin[G].side, this.from[this.currentMargin[G].side] + "px")
                            }).jBind(this))
                        }
                    }
                    this.fx = new y.FX(this.el, {
                        duration: this.o[this.type + "Speed"],
                        transition: this.o[this.type + "Easing"],
                        onStart: l(function() {
                            this.phase = "progress"
                        }).jBind(this),
                        onBeforeRender: l(function(G) {
                            if (9 === y.browser.ieMode && this.side) {
                                this.el.jSetCssProp(k, "translateX(" + G.x + "px) translateY(" + G.y + "px)")
                            }
                        }).jBind(this),
                        onComplete: l(function(G) {
                            if (!this.o.insideOpacity) {
                                this.el.jSetCss({
                                    opacity: "",
                                    filter: ""
                                })
                            } else {
                                this.el.jSetOpacity(this.o.insideOpacity)
                            }
                            if (this.side) {
                                if (y.browser.ieMode < 9) {
                                    this.side.jEach(l(function(H) {
                                        this.el.jSetCssProp("margin-" + this.currentMargin[H].side, this.currentMargin[H].value)
                                    }).jBind(this))
                                } else {
                                    this.el.jSetCssProp(k, "")
                                }
                            }
                            this.phase = "end";
                            G(this.type)
                        }).jBind(this, F.end)
                    })
                } else {
                    this.el.jSetCss("transition", "none");
                    this.side && this.el.jSetCssProp(k, "translate3d(" + this.os.from.x + "px, " + this.os.from.y + "px, 0)");
                    this._render();
                    this.el.jAddEvent("transitionend", l(function(G, H) {
                        if (H.target == this.el) {
                            H.stop();
                            this.el.jRemoveEvent(H.type);
                            this.el.jSetCssProp("transition", "");
                            this.el.jSetCssProp(k, "");
                            if (!this.o.insideOpacity && this.o[this.type + "Fade"]) {
                                this.el.jSetCssProp("opacity", "")
                            } else {
                                this.el.jSetOpacity(this.o.insideOpacity)
                            }
                            this.phase = "end";
                            G(this.type)
                        }
                    }).jBind(this, F.end))
                }
            },
            start: function(F) {
                var H, G, I = this.o[this.type + "Fade"];
                this.prepare(F);
                if (y.browser.ieMode && y.browser.ieMode < 10) {
                    H = {};
                    if (this.side) {
                        if (9 === y.browser.ieMode) {
                            H.x = [this.os.from.x, this.os.to.x];
                            H.y = [this.os.from.y, this.os.to.y]
                        } else {
                            this.side.jEach(l(function(J) {
                                H["margin-" + this.currentMargin[J].side] = [this.from[this.currentMargin[J].side], this.to[this.currentMargin[J].side]]
                            }).jBind(this))
                        }
                    }
                    if (I) {
                        H.opacity = [this.opacityFrom, this.opacityTo]
                    }
                    this.timer = setTimeout(l(function() {
                        this.timer = null;
                        this.fx.start(H)
                    }).jBind(this), this.o[this.type + "Delay"])
                } else {
                    H = "";
                    G = " " + this.o[this.type + "Speed"] + "ms " + this.o[this.type + "Easing"] + " " + this.o[this.type + "Delay"] + "ms";
                    this.side && (H = k + G);
                    if (I) {
                        if (this.side) {
                            H += ", "
                        }
                        H += ("opacity" + G)
                    }
                    this.el.jSetCssProp("transition", H);
                    this.side && this.el.jSetCssProp(k, "translate3d(" + this.os.to.x + "px, " + this.os.to.y + "px, 0)");
                    I && this.el.jSetCssProp("opacity", this.opacityTo);
                    this.phase = "progress"
                }
            },
            stop: function() {
                if ("progress" === this.phase) {
                    if (y.browser.ieMode && y.browser.ieMode < 10) {
                        if (null === this.timer) {
                            clearTimeout(this.timer)
                        } else {
                            this.fx.stop()
                        }
                        this.el.jSetCssProp("margin-" + this.currentMargin.side, this.currentMargin.value)
                    } else {
                        this.el.jRemoveEvent("transitionend");
                        this.el.jSetCssProp("transition", "").jSetCssProp(k, "")
                    }
                    if (this.o[this.type + "Fade"]) {
                        if (!this.o.insideOpacity) {
                            this.el.jSetCss({
                                opacity: "",
                                filter: ""
                            })
                        } else {
                            this.el.jSetOpacity(this.o.insideOpacity)
                        }
                    }
                    this.phase = "end"
                }
            }
        });
        return E
    })();
    y.Effects.CaptionEffects.Fade = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "fade";
            this.side = null
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.Left = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "left";
            this.side = "left"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.Top = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "top";
            this.side = "top"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.Right = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "right";
            this.side = "right"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.Bottom = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "bottom";
            this.side = "bottom"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.TopLeft = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "topLeft";
            this.side = "top left"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.TopRight = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "topRight";
            this.side = "top right"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.BottomLeft = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "bottomLeft";
            this.side = "bottom left"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.CaptionEffects.BottomRight = (function() {
        var E = function(G, H, F) {
            y.Effects.CaptionEffects.From.apply(this, arguments);
            this.name = "bottomRight";
            this.side = "bottom right"
        };
        y.inherit(E, y.Effects.CaptionEffects.From);
        return E
    })();
    y.Effects.KAR = (function() {
        function F(H) {
            var G = {
                x: 0,
                y: 0
            };
            (H.jGetCss(k) || "").replace(/matrix\(([^\)]+)\)/, function(K, J) {
                var I = J.split(",");
                G.x = I[0];
                G.y = I[3]
            });
            return G
        }
        var E = function(H, I, G) {
            this.els = l([l(H), l(I)]);
            this.container = l(H || I).parentNode;
            this.options = {
                jDel: 50,
                direction: "random",
                replace: false,
                kenburns: false,
                replaceSpeed: 2000,
                kenburnsSpeed: 3000,
                timingFunction: "ease"
            };
            this.o = this.options;
            y.extend(this.o, G);
            this.moving = false;
            this.zoomIn = null;
            this.countEvents = 0;
            if (this.o.replace) {
                this.countEvents++;
                this._prepareReplace()
            }
            if (this.o.kenburns) {
                this.countEvents++;
                this.eff = ["c", "tl", "tr", "br", "bl"][Math.rand(0, 4)];
                this._parseOptions();
                if (y.browser.trident && y.browser.ieMode < 10) {
                    this.effMove = this.k_calcSizeIe()
                }
                this._prepareKenburns()
            }
        };
        y.extend(E.prototype, {
            _render: function() {
                this.els[0] && this.els[0].offsetHeight;
                this.els[1] && this.els[1].offsetHeight
            },
            _parseOptions: function() {
                var G;
                if ("random" !== this.o.direction) {
                    G = this.o.direction.split("-");
                    this.zoomIn = "in" === G[1] ? 1 : 0;
                    G.shift();
                    G.shift();
                    this.eff = G.join("-")
                } else {
                    this.zoomIn = Math.rand(0, 1);
                    this.eff = ["top-left", "top-right", "bottom-left", "bottom-right", "center"][Math.rand(0, 4)]
                }
            },
            _prepareKenburns: function() {
                if (y.browser.ieMode && y.browser.ieMode < 10) {
                    if (y.browser.ieMode == 9) {
                        this.els[1].style["-ms-transform"] = "scale(" + (this.effMove.before.scale / 1000) + ")";
                        this.els[1].jSetCss({
                            top: this.effMove.before.translateY / 1000 + "%",
                            left: this.effMove.before.translateX / 1000 + "%"
                        })
                    } else {
                        this.els[1].jSetCss({
                            top: this.effMove.before.translateY / 1000 + "%",
                            left: this.effMove.before.translateX / 1000 + "%",
                            width: (this.normalSize.width * (this.effMove.before.scale / 1000)),
                            height: (this.normalSize.height * (this.effMove.before.scale / 1000)),
                            "max-width": "none",
                            "max-height": "none"
                        })
                    }
                    this.kenburnsFX = new y.PFX([this.els[1]], {
                        fps: (y.browser.ieMode == 9) ? 50 : 20,
                        duration: this.o.kenburnsSpeed - this.o.jDel,
                        transition_: y.FX.Transition.linear,
                        onComplete: l(function() {
                            this.countEvents--;
                            if (this.countEvents) {
                                this.moving = false
                            }
                        }).jBind(this),
                        onBeforeRender: l(function(G, H) {
                            if (y.browser.ieMode == 9) {
                                this.els[1].style["-ms-transform"] = "scale(" + (G.scale / 1000) + ")";
                                this.els[1].jSetCss({
                                    top: G.translateY / 1000 + "%",
                                    left: G.translateX / 1000 + "%"
                                })
                            } else {
                                this.els[1].jSetCss({
                                    width: (this.normalSize.width * (G.scale / 1000)),
                                    height: (this.normalSize.height * (G.scale / 1000)),
                                    top: G.translateY / 1000 + "%",
                                    left: G.translateX / 1000 + "%"
                                })
                            }
                        }).jBind(this)
                    })
                } else {
                    this.effMove = this.k_calcScaleAndPosition();
                    this.els[1].jSetCss({
                        transform: "scale(" + this.effMove.before.scale + ")",
                        "transform-origin": this.effMove.before.origin
                    });
                    this._render()
                }
            },
            recoverySize: function() {
                if (this.o.kenburns) {
                    this.k_stopTransition();
                    this.els[1].jSetCssProp("transform", "");
                    if (y.browser.ieMode && y.browser.ieMode < 10 && this.kenburnsFX) {
                        this.els[1].jSetCss({
                            top: "0%",
                            left: "0%",
                            "max-width": "",
                            "max-height": ""
                        });
                        if (y.browser.ieMode == 9) {
                            this.els[1].style["-ms-transform"] = ""
                        } else {
                            if (y.browser.ieMode == 8) {
                                this.els[1].jSetCss({
                                    width: "",
                                    height: ""
                                })
                            } else {
                                this.els[1].jSetCss({
                                    width: this.normalSize.width,
                                    height: this.normalSize.height
                                })
                            }
                        }
                    }
                }
                if (this.o.replace) {
                    this.r_end();
                    if (this.els[1]) {
                        if (!this.o.kenburns) {
                            this.els[1].jSetCssProp("transition", "")
                        }
                        this.els[1].jSetOpacity(1)
                    }
                }
            },
            k_calcScaleAndPosition: function() {
                var G = "",
                    H = Math.rand(0, 1);
                switch (this.eff) {
                    case "center":
                        G = "50%";
                        break;
                    case "top-left":
                        G = "top left";
                        break;
                    case "top-right":
                        G = "top right";
                        break;
                    case "bottom-right":
                        G = "bottom right";
                        break;
                    case "bottom-left":
                        G = "bottom left";
                        break
                }
                return {
                    before: {
                        scale: this.zoomIn ? 1 : 1.2,
                        origin: G
                    },
                    after: {
                        scale: this.zoomIn ? 1.2 : 1,
                        origin: G
                    }
                }
            },
            k_calcSizeIe: function() {
                this.els[1].parentNode.show();
                this.normalSize = this.els[1].jGetSize();
                var T = this.normalSize,
                    J = this.container.parentNode.jGetSize(),
                    K = Math.rand(0, 1),
                    S = T.width / 100 * 10,
                    N = T.height / 100 * 10,
                    H, Q, I, R, O, L, P, M, G = 2;
                if (y.browser.ieMode == 9) {
                    H = Q = I = R = 1100;
                    O = L = P = M = 1
                } else {
                    O = L = P = M = 0;
                    H = I = T.width + S;
                    Q = R = T.height + N;
                    (y.browser.ieMode == 7) && (G = 1)
                }
                switch (this.eff) {
                    case "top-left":
                        if (y.browser.ieMode == 9) {
                            if (this.zoomIn) {
                                M = 4001;
                                P = 4001
                            } else {
                                L = 4001;
                                O = 4001
                            }
                        } else {
                            if (this.zoomIn) {
                                L = -2001;
                                O = -2001
                            } else {
                                M = -2001;
                                P = -2001
                            }
                        }
                        break;
                    case "top-right":
                        if (y.browser.ieMode == 9) {
                            if (this.zoomIn) {
                                M = 4001;
                                P = -4001
                            } else {
                                L = 4001;
                                O = -4001
                            }
                        } else {
                            if (this.zoomIn) {
                                L = -2001;
                                P = -8001
                            } else {
                                M = -2001;
                                O = -8001
                            }
                        }
                        break;
                    case "bottom-right":
                        if (y.browser.ieMode == 9) {
                            if (this.zoomIn) {
                                M = -4001;
                                P = -4001
                            } else {
                                L = -4001;
                                O = -4001
                            }
                        } else {
                            if (this.zoomIn) {
                                M = -8001;
                                P = -8001
                            } else {
                                L = -8001;
                                O = -8001
                            }
                        }
                        break;
                    case "bottom-left":
                        if (y.browser.ieMode == 9) {
                            if (K) {
                                M = -4001;
                                P = 4001
                            } else {
                                L = -4001;
                                O = 4001
                            }
                        } else {
                            if (this.zoomIn) {
                                M = -8001;
                                O = -2001
                            } else {
                                L = -8001;
                                P = -2001
                            }
                        }
                        break;
                    case "center":
                        if (y.browser.ieMode !== 9) {
                            if (this.zoomIn) {
                                M = -4001;
                                P = -4001
                            } else {
                                L = -4001;
                                O = -4001
                            }
                        }
                        break
                }
                return {
                    before: {
                        scale: this.zoomIn ? 1020 : 1100,
                        scaleX: H,
                        scaleY: Q,
                        translateX: O,
                        translateY: L
                    },
                    after: {
                        scale: this.zoomIn ? 1100 : 1020,
                        scaleX: I,
                        scaleY: R,
                        translateX: P,
                        translateY: M
                    }
                }
            },
            k_stopTransition: function() {
                var G = {
                    transition: k + String.fromCharCode(32) + "0ms"
                };
                G[y.browser.cssPrefix + "transition"] = k + String.fromCharCode(32) + "0ms";
                l(this.els[1]).jSetCss(G)
            },
            _prepareReplace: function() {
                if (this.els[0]) {
                    this.els[0].jSetOpacity(1)
                }
                this.els[1].jSetOpacity(0);
                if (this.els[0]) {
                    this.els[0].jSetCss({
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        top: 0,
                        right: 0,
                        margin: "auto"
                    })
                }
                if (!this.els[1].parentNode) {
                    this.container.appendChild(this.els[1])
                }
                if (y.browser.ieMode && y.browser.ieMode < 10) {
                    if (this.els[0]) {
                        this.replaceFX = new y.PFX(this.els, {
                            duration: this.o.replaceSpeed,
                            onComplete: l(function() {
                                this.countEvents--;
                                if (this.countEvents) {
                                    this.moving = false
                                }
                                this.r_end()
                            }).jBind(this)
                        })
                    }
                } else {
                    this._render()
                }
            },
            r_end: function() {
                if (!this.els[0]) {
                    return
                }
                if (this.els[0].parentNode) {
                    this.els[0].jRemove()
                }
                this.els[0].jSetOpacity(1);
                this.els[0].jSetCss({
                    transition: "",
                    position: "",
                    left: "",
                    bottom: "",
                    top: "",
                    right: "",
                    margin: ""
                })
            },
            start: function() {
                var G = "",
                    H = "";
                if (this.one) {
                    return
                }
                this.one = true;
                this.moving = true;
                if (y.browser.ieMode && y.browser.ieMode < 10) {
                    if (this.o.replace) {
                        this.replaceFX.start([{
                            opacity: [1, 0]
                        }, {
                            opacity: [0, 1]
                        }])
                    }
                    if (this.o.kenburns) {
                        this.timer = setTimeout(l(function() {
                            this.kenburnsFX && this.kenburnsFX.start([{
                                scale: [this.effMove.before.scale, this.effMove.after.scale],
                                translateX: [this.effMove.before.translateX, this.effMove.after.translateX],
                                translateY: [this.effMove.before.translateY, this.effMove.after.translateY]
                            }])
                        }).jBind(this), this.o.jDel)
                    }
                } else {
                    this.els[1].jAddEvent("transitionend", l(function(I) {
                        if (this.els[1] == I.target) {
                            this.countEvents--;
                            if ("opacity" === I.propertyName) {
                                this.r_end()
                            }
                            if (0 === this.countEvents) {
                                this.els[1].jRemoveEvent(I.type);
                                this.moving = false;
                                this.els[1].jSetCssProp("transition", "")
                            }
                        }
                    }).jBind(this));
                    if (this.o.replace) {
                        if (this.els[0]) {
                            this.els[0].jSetCss({
                                transition: "opacity" + String.fromCharCode(32) + this.o.replaceSpeed + "ms",
                                opacity: 0
                            })
                        }
                        G += ("opacity" + String.fromCharCode(32) + this.o.replaceSpeed + "ms");
                        if (this.o.kenburns) {
                            G += ", "
                        }
                    }
                    if (this.o.kenburns) {
                        H += (k + String.fromCharCode(32) + (this.o.kenburnsSpeed - this.o.jDel) + "ms" + String.fromCharCode(32) + this.o.timingFunction + String.fromCharCode(32) + this.o.jDel + "ms")
                    }
                    this.els[1].jSetCssProp("transition", G + H);
                    this._render();
                    if (this.o.replace) {
                        this.els[1].jSetCssProp("opacity", 1)
                    }
                    if (this.o.kenburns) {
                        this.els[1].jSetCss({
                            transform: "scale(" + this.effMove.after.scale + ")",
                            "transform-origin": this.effMove.after.origin
                        })
                    }
                }
            },
            pause: function() {
                if (this.o.kenburns) {
                    if (y.browser.ieMode && y.browser.ieMode < 10) {
                        if (this.kenburnsFX) {
                            this.kenburnsFX.stop()
                        }
                    } else {
                        this.els[1].jSetCssProp("transform", "translateZ(0) scale(" + F(this.els[1]).x + ")")
                    }
                }
            },
            stop: function() {
                if (this.moving) {
                    if (this.o.replace) {
                        if (this.replaceFX) {
                            this.replaceFX.stop()
                        }
                        this.r_end()
                    }
                    if (this.o.kenburns) {
                        if (this.kenburnsFX) {
                            this.kenburnsFX.stop()
                        }
                    }
                    this.els[1].jRemoveEvent("transitionend");
                    this.els[1].jSetCssProp("transition", "");
                    this.moving = false
                }
            }
        });
        return E
    })();
    (function(F) {
        if (!F) {
            throw "MagicJS not found";
            return
        }
        var E = F.$;
        x.ImageLoader = new F.Class({
            img: null,
            ready: false,
            options: {
                onload: F.$F,
                onabort: F.$F,
                onerror: F.$F,
                oncomplete: F.$F
            },
            size: null,
            _timer: null,
            _handlers: {
                onload: function(G) {
                    if (G) {
                        E(G).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onabort: function(G) {
                    if (G) {
                        E(G).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(G) {
                    if (G) {
                        E(G).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                E(["load", "abort", "error"]).jEach(function(G) {
                    this.img.jAddEvent(G, this._handlers["on" + G].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (G) {}
                    this._timer = null
                }
                E(["load", "abort", "error"]).jEach(function(H) {
                    this.img.jRemoveEvent(H)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var G = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    G.kill()
                }
            },
            init: function(H, G) {
                this.options = F.extend(this.options, G);
                if ("string" === F.jTypeOf(H) || "array" === F.jTypeOf(H)) {
                    this.img = F.$new("img", {}, {
                        "max-width": "none",
                        "max-height": "none"
                    }).jAppendTo(F.$new("div").jAddClass("magic-temporary-img").jSetCss({
                        position: "absolute",
                        top: -10000,
                        width: 10,
                        height: 10,
                        overflow: "hidden"
                    }).jAppendTo(document.body)).jStore("new", true)
                } else {
                    this.img = E(H)
                }
                var I = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    I = null
                }.jBind(this);
                this._bind();
                if (!H.src) {
                    if ("array" === F.jTypeOf(H)) {
                        this.img.src = H[0];
                        this.img.setAttribute("srcset", H[1])
                    } else {
                        this.img.src = H
                    }
                } else {
                    if (F.browser.trident900 && F.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                I && I()
                            }
                        }.jBind(this)
                    }
                    this.img.src = H.src
                }
                this.img && this.img.complete && I && (this._timer = I.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var G = this.img;
                return (G.naturalWidth) ? (G.naturalWidth > 0) : (G.readyState) ? ("complete" == G.readyState) : G.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(x);
    (function(E) {
        E.QImageLoader = function(M, H) {
            var G = 0,
                J = [],
                L = this,
                K, I, F;

            function O(P) {
                return function(Q) {
                    J.push(Q.destroy());
                    (H[P] || E.$F).call(L, Q, Q.origItem);
                    G--;
                    N()
                }
            }

            function N() {
                if (!M.length) {} else {
                    if (G < (H.queue || 3)) {
                        K = M.shift();
                        I = new E.ImageLoader(K.img, {
                            onload: O("onload"),
                            onerror: O("onerror"),
                            onabort: O("onabort"),
                            oncomplete: O("oncomplete")
                        });
                        I.origItem = K;
                        G++
                    }
                }
            }
            this.push = function(Q, P) {
                if (!P) {
                    P = Q;
                    Q = false
                }
                if (E.jTypeOf(P.img) == "string" || P.img.tagName.toLowerCase() == "img") {
                    M[Q ? "unshift" : "push"](P);
                    H.delay || N()
                }
                return this
            };
            this.abort = function() {
                I.destroy()
            };
            this.load = N;
            H.delay || M.length && N()
        }
    })(x);
    var o = {
        width: {
            oneOf: [{
                type: "number",
                minimum: 1
            }, {
                type: "string",
                "enum": ["auto"]
            }],
            "default": "auto"
        },
        height: {
            oneOf: [{
                type: "number",
                minimum: 1
            }, {
                type: "string",
                "enum": ["auto", "responsive"]
            }],
            "default": "auto"
        },
        "base-width": {
            type: "number",
            minimum: 1,
            "default": 1000
        },
        "base-height": {
            oneOf: [{
                type: "number",
                minimum: 0
            }, {
                type: "string",
                "enum": ["auto"]
            }],
            "default": "auto"
        },
        orientation: {
            type: "string",
            "enum": ["horizontal", "vertical"],
            "default": "horizontal"
        },
        loop: {
            type: "boolean",
            "default": true
        },
        selectors: {
            oneOf: [{
                type: "string",
                "enum": ["left", "right", "top", "bottom", "none"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "none"
        },
        "selectors-style": {
            type: "string",
            "enum": ["bullets", "thumbnails"],
            "default": "bullets"
        },
        "selectors-size": {
            type: "number",
            minimum: 1,
            "default": 70
        },
        "selectors-eye": {
            type: "boolean",
            "default": true
        },
        "bullets-preview": {
            oneOf: [{
                type: "string",
                "enum": ["top", "bottom", "none"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "top"
        },
        "selectors-fill": {
            type: "boolean",
            "default": false
        },
        caption: {
            type: "boolean",
            "default": true
        },
        arrows: {
            type: "boolean",
            "default": true
        },
        effect: {
            type: "string",
            "enum": ["random", "slide", "fade", "fade-up", "fade-down", "dissolve", "cube", "bars3d", "slide-in", "slide-out", "flip", "blinds3d", "slide-change", "diffusion", "blocks"],
            "default": "slide"
        },
        "effect-speed": {
            type: "number",
            minimum: 1,
            "default": 600
        },
        "effect-easing": {
            type: "string",
            "default": "ease"
        },
        autoplay: {
            type: "boolean",
            "default": true
        },
        "slide-duration": {
            type: "number",
            minimum: 1,
            "default": 6000
        },
        shuffle: {
            type: "boolean",
            "default": false
        },
        kenburns: {
            type: "boolean",
            "default": false
        },
        pause: {
            type: "boolean",
            "default": true
        },
        fullscreen: {
            type: "boolean",
            "default": false
        },
        preload: {
            type: "boolean",
            "default": true
        },
        keyboard: {
            type: "boolean",
            "default": true
        },
        "show-loader": {
            type: "boolean",
            "default": false
        },
        autostart: {
            type: "boolean",
            "default": true
        },
        errorBlock: {
            type: "string",
            "default": '<span class="mss-error-message">Image cannot be loaded</span>'
        },
        onReady: {
            type: "function",
            "default": y.$F
        },
        onPlay: {
            type: "function",
            "default": y.$F
        },
        onPause: {
            type: "function",
            "default": y.$F
        },
        onVideoPlay: {
            type: "function",
            "default": y.$F
        },
        onVideoPause: {
            type: "function",
            "default": y.$F
        },
        onEnterFullscreen: {
            type: "function",
            "default": y.$F
        },
        onExitFullscreen: {
            type: "function",
            "default": y.$F
        },
        onBeforeSlideChange: {
            type: "function",
            "default": y.$F
        },
        onAfterSlideChange: {
            type: "function",
            "default": y.$F
        }
    };
    var n = '.MagicSlideshow,.mss-slider,.mss-slide-wrapper,.mss-slide,.mss-selectors,.mss-selectors-wrapper,.mss-selector,.mss-selector:before,.mss-selector:after,.mss-selectors-eye,.mss-caption,.mss-caption span,.mss-button,.mss-fullscreen {    margin: 0;    padding: 0;    outline: 0 !important;    -webkit-box-sizing: border-box !important;    -moz-box-sizing: border-box !important;    box-sizing: border-box !important;}.MagicSlideshow,.mss-slider,.mss-selectors {    line-height: 100% !important;    vertical-align: top !important;}.mss-slider,.mss-slide,.mss-selectors {    border: none !important;    display: inline-block;    position: absolute !important;}.mss-slide-wrapper,.mss-slide {    direction: ltr !important;    width: 100%;    height: 100%;}.mss-slide-wrapper {    -webkit-perspective: 1000px;    perspective: 1000px;}.mss-slide {    -webkit-backface-visibility: hidden !important;    backface-visibility: hidden !important;}.MagicSlideshow {    width: 100%;    max-width: 100%;    height: auto;    background: transparent;    direction: ltr;    overflow: visible !important;    -webkit-user-select: none !important;    -moz-user-select: none !important;    -ms-user-select: none !important;    user-select: none !important;    -webkit-touch-callout: none !important;    -webkit-tap-highlight-color: transparent !important;    /*-ms-touch-action: none !important;*/    /*touch-action: none !important;*/}.MagicSlideshow:before {    content: "";    display: inline-block;    vertical-align: top;    height: 0;}.mss-slider {    top:0;    bottom: 0;    left: 0;    right: 0;    overflow: hidden;    width: auto;    height: auto;    z-index: 1;}.mss-slide-wrapper {    position: relative !important;    z-index: 1 !important;}.mss-slide {    overflow: hidden;    left: 0;    top: 0;    z-index: 1;}.mss-slide:after {    content: "";    display: inline-block;    height: 100%;    vertical-align: middle;}.mss-content-slide {    text-align: left;}.mss-slide-active {    z-index: 99;}.mss-slide [data-mss-animation-block] {    position: absolute !important;}.mss-centering-img {    top: 0 !important;    left: 0 !important;    right: 0 !important;    bottom: 0 !important;    margin: auto !important;    max-width: 100%;    max-height: 100%;    position: absolute !important;    display: inline-block !important;}.mss-img-vertical {    width: auto;    height: 100%;}.mss-img-horizontal {    width: 100%;    height: auto;}.mss-html-block {    line-height: 1em !important;    font-size-adjust: 0.5 !important;}.mss-html-block p {    /*margin: 1em 0 !important;*/    margin: 0 !important;    /*display: block !important;    -webkit-margin-before: 1em !important;    -webkit-margin-after: 1em !important;    -webkit-margin-start: 0px !important;    -webkit-margin-end: 0px !important;*/}.lt-ie10-magic .mss-fullscreen .mss-slide img {    max-width: 100%;    width: auto;    height: auto;}.mss-slide video, .mss-slide iframe {    display: inline-block;    max-width: 100%;}/*!important - for MagicZoom and MagicZoomPlus*/.mss-fixed-height .mss-slide .mss-content {    height: 100% !important;}.mss-selectors {    display: inline-block !important;    direction: ltr;    z-index: 100;    left: 0;    top: 0;}.mss-bullets {    z-index: 300;}.mss-selectors-horizontal .mss-selectors {    width: 100% !important;    white-space: nowrap;}.mss-selectors-bottom .mss-selectors {    top: auto !important;    bottom: 0 !important;}.mss-selectors-vertical .mss-selectors {    height: 100% !important;}.mss-selectors-right .mss-selectors {    left: auto !important;    right: 0 !important;}.mss-selectors-wrapper {    display: block;    height: 100%;    position: relative !important;    overflow: hidden;    text-align: center;}.mss-selector {    vertical-align: top;    line-height: 100%;    cursor: pointer !important;    display: inline-block !important;}.mss-selector-empty {    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.9);}.mss-selectors-horizontal .mss-selector-empty {    width: 50px;}.mss-selectors-vertical .mss-selector-empty {    height: 50px;}.mss-selectors-eye {    z-index: 10;}/* Thumbnail style selectors */.mss-thumbnails .mss-selectors-container {    display: inline-block;    position: relative;    left: 0;    top: 0;    text-align: left;    -moz-box-sizing: content-box;    box-sizing: content-box;}.mss-selectors-horizontal .mss-thumbnails .mss-selectors-container {    height: 100% !important;}.lt-ie8-magic .mss-selectors-horizontal .mss-thumbnails .mss-selectors-container {    height: auto;    float: left;}.mss-selectors-vertical .mss-thumbnails .mss-selectors-container {    width: 100% !important;    text-align: center !important;}.lt-ie8-magic .mss-selectors-vertical .mss-thumbnails .mss-selectors-container {    width: auto;}.mss-thumbnails .mss-selector {    overflow: hidden;}.mss-selectors-horizontal .mss-thumbnails .mss-selector {    width: auto;    height: 100%;}.mss-selectors-vertical .mss-thumbnails .mss-selector {    width: 100%;    height: auto;}.mss-thumbnails .mss-selectors-container > img {    width: auto;    height: auto;    max-width: 100%;    max-height: 100%;    vertical-align: middle;    margin: 0 1px;}.ie8-magic .mss-thumbnails .mss-selectors-container > img {    max-width: none !important;    max-height: none !important;}/* Bullet style selectors */.mss-bullets .mss-selectors-container {    display: inline-block !important;    text-align: center !important;}.mss-bullets .mss-selectors-wrapper:before {    content: "";    display: inline-block;    vertical-align: middle;    height: 100%;}/** * Full Screen */.mss-fullscreen {    width: 100% !important;    height: 100% !important;    top: 0 !important;    left: 0 !important;    z-index: 2147483647 !important;}.mss-fullscreen .mss-selectors {    display: none !important;}.mss-desktop .mss-fullscreen .mss-selectors {    display: inline-block;}/** * Miscellaneous */.transformStyle {    -webkit-transform-style: preserve-3d !important;    transform-style: preserve-3d !important;}.backface-visHid { /*bars3d, blinds3d, cube, flip*/    -webkit-backface-visibility: hidden !important;    backface-visibility: hidden !important;}.defParentDiv { /*bars3d, blinds3d, cube, flip*/    overflow: visible !important;    -webkit-perspective: 1000px !important;    perspective: 1000px !important;}/*!important - for MagicZoom and MagicZoomPlus*/.mss-content {    width: 100% !important;}.mss-hidden {    display: none !important;    visibility: hidden !important;}.mss-slider:hover .mss-disabled, .mss-selectors .mss-disabled {    opacity: 0.1 !important;    filter: alpha(opacity = 10) !important;}.magic-temporary-img img {    max-height: none !important;    max-width: none !important;}.mss-bullets-preview-thumbnail {    position: absolute !important;}.mss-bullets-preview-arrow {    position: absolute !important;    border-color: transparent;    width: 0;    height: 0;    border-style: solid !important;    -webkit-box-sizing: border-box !important;    box-sizing: border-box !important;}.mss-bullets-preview-wrapper {    position: relative !important;    height: 100% !important;    z-index: 100 !important;}.mss-bullets-preview-wrapper > * {    height: 100% !important;    width: auto !important;    max-width: none !important;}.mss-img-wrapper {    position: relative !important;}.mss-img-wrapper img {    position: absolute !important;    width: auto !important;    height: auto !important;    max-width: 100% !important;    max-height: 100% !important;    line-height: 100% !important;    top: 0 !important;    left: 0 !important;    right: 0 !important;    bottom: 0 !important;    margin: auto !important;    display: inline !important;}.magic-temporary-img img {    position: absolute !important;}.mss-super-opacity,.mss-super-opacity-replace {    opacity: 0 !important;    filter: alpha(opacity = 10) !important;}';
    var D = (function() {
        var E = function(I, G, H) {
            y.$uuid(this);
            this.node = l(I);
            this.container = l(G);
            var F = {
                errorBlock: {
                    type: "string",
                    "default": ""
                },
                caption: {
                    type: "boolean",
                    "default": true
                },
                preload: {
                    type: "boolean",
                    "default": true
                },
                "standard-caption": {
                    type: "boolean",
                    "default": false
                },
                baseWidth: {
                    type: "number",
                    "default": 1000
                },
                kenburns: {
                    type: "boolean",
                    "default": false
                },
                "kenburns-direction": {
                    type: "string",
                    "enum": ["zoom-in-top-left", "zoom-in-top-right", "zoom-in-bottom-left", "zoom-in-bottom-right", "zoom-in-center", "zoom-out-top-left", "zoom-out-top-right", "zoom-out-bottom-left", "zoom-out-bottom-right", "zoom-out-center", "random"],
                    "default": "random"
                },
                "kenburns-speed": {
                    type: "number",
                    "default": 3000
                },
                "in-move": {
                    type: "string",
                    "enum": ["fade", "fixed", "left", "top", "right", "bottom", "top left", "top right", "bottom left", "bottom right"],
                    "default": "fixed"
                },
                "in-speed": {
                    type: "number",
                    "default": 1000
                },
                "in-easing": {
                    type: "string",
                    "default": "ease"
                },
                "in-delay": {
                    type: "number",
                    "default": 0
                },
                "in-fade": {
                    type: "boolean",
                    "default": false
                },
                "in-offset": {
                    oneOf: [{
                        type: "string",
                        "enum": ["outside"]
                    }, {
                        type: "number",
                        minimum: 10
                    }],
                    "default": "outside"
                },
                "out-move": {
                    type: "string",
                    "enum": ["fade", "fixed", "left", "top", "right", "bottom", "top left", "top right", "bottom left", "bottom right"],
                    "default": "fixed"
                },
                "out-speed": {
                    type: "number",
                    "default": 1000
                },
                "out-easing": {
                    type: "string",
                    "default": "ease"
                },
                "out-delay": {
                    type: "number",
                    "default": 0
                },
                "out-fade": {
                    type: "boolean",
                    "default": false
                },
                "out-offset": {
                    oneOf: [{
                        type: "string",
                        "enum": ["outside"]
                    }, {
                        type: "number",
                        minimum: 10
                    }],
                    "default": "outside"
                },
                "out-at": {
                    type: "number",
                    "default": 0
                },
                "video-autoplay": {
                    type: "boolean",
                    "default": false
                },
                "video-fullsize": {
                    type: "boolean",
                    "default": false
                }
            };
            this.options = new y.Options(F);
            this.options.fromJSON(H || {});
            this.o = this.options.get.jBind(this.options);
            this.set = this.options.set.jBind(this.options);
            this.type = "html";
            this.video = null;
            this.html = {
                text: false,
                fontSize: 20,
                paddingTop: null,
                paddingLeft: null,
                paddingRight: null,
                paddingBottom: null,
                img: {
                    img: null,
                    type: "a-img",
                    size: {
                        width: 0,
                        height: 0
                    },
                    proportion: null,
                    load: "notLoaded"
                }
            }, this.img = {
                proportion: null,
                onlyImg: false,
                type: "main",
                main: {
                    shown: false,
                    src: null,
                    srcset: null,
                    img: null,
                    size: {
                        width: 0,
                        height: 0
                    },
                    inDoc: true,
                    documentIndex: null,
                    load: "notLoaded"
                },
                fullscreen: {
                    shown: false,
                    src: null,
                    srcset: null,
                    img: null,
                    size: {
                        width: 0,
                        height: 0
                    },
                    inDoc: false,
                    load: "notLoaded"
                }
            };
            this.isAnimationBlock = false;
            this.isFullscreen = false;
            this.title = null;
            this.text = null;
            this.useMap = null;
            this.styleOpacity = null;
            this.rwd = false;
            this.dataWidth = null;
            this.dataHeight = null;
            this.timeout = null;
            this.effect = null;
            this.kenburns = null;
            this.ready = false;
            this.timerIsEnded = false;
            this.isOutEffect = false;
            this.autoplay = false;
            this.isMoving = false;
            this.isActive = false;
            g.call(this, this.node, F)
        };
        y.extend(E.prototype, {
            done: function() {
                this.setOptions();
                if ("video" !== this.type) {
                    if ("img" === this.type) {
                        if (this.o("preload")) {
                            this.load();
                            if ("img" === this.type) {
                                var F = "fullscreen",
                                    G;
                                if (this.img[F].img && "notLoaded" === this.img[F].load) {
                                    this.img[F].load = "loading";
                                    this.jCallEvent("loading", {
                                        imageType: F
                                    });
                                    G = this.img[F].img.getAttribute("src");
                                    G = this.img[F].srcset ? [G, this.img[F].img.getAttribute("srcset")] : G;
                                    this.imgLoad({
                                        img: G,
                                        type: F
                                    })
                                }
                            }
                        } else {}
                    } else {
                        if (!this.html.img.img) {
                            this.blockReady()
                        }
                    }
                }
            },
            setOptions: function() {
                if ("fixed" !== this.o("out-move")) {
                    this.hide()
                }
                if ("img" !== this.type) {
                    this.set("kenburns", false)
                }
                l(["in-", "out-"]).jEach(l(function(F) {
                    if ("fade" === this.o(F + "move") && !this.o(F + "fade")) {
                        this.set(F + "move", "fixed")
                    }
                    if (this.o(F + "fade") && "fixed" === this.o(F + "move")) {
                        this.set(F + "move", "fade")
                    }
                }).jBind(this));
                if (this.o("kenburns")) {
                    this.set("kenburns-speed", this.o("kenburns-speed") + this.o("out-speed") + 1000)
                }
                if (this.o("standard-caption")) {
                    this.isAnimationBlock = true;
                    this.node.setAttribute("data-mss-animation-block", "");
                    this.set("in-move", "fade");
                    this.set("in-fade", "true");
                    this.set("out-move", "fade");
                    this.set("out-fade", "true")
                }
            },
            hide: function() {
                this.node.jSetCssProp("visibility", "hidden")
            },
            show: function() {
                if (this.ready) {
                    this.node.jSetCssProp("visibility", "visible")
                }
            },
            load: function() {
                if ("img" !== this.type) {
                    return
                }
                var H, G = this.isFullscreen ? "fullscreen" : "main",
                    F = (G === "fullscreen" ? "main" : "fullscreen");
                if (this.isFullscreen && !this.img[G].img) {
                    G = "main"
                }
                if (this.img.onlyImg && !this.img[G].inDoc) {
                    this.img[G].img.jAddClass("mss-super-opacity-replace");
                    this.container.insertBefore(this.img[G].img, this.img[F].img);
                    this.img[G].inDoc = true
                }
                if (this.img[G].load === "notLoaded") {
                    if (G === "main" && this.img.main.src) {
                        this.img.main.img.setAttribute("src", this.img.main.src);
                        if (this.img.main.srcset) {
                            this.img.main.img.setAttribute("srcset", this.img.main.srcset)
                        }
                    }
                    this.img[G].load = "loading";
                    this.jCallEvent("loading", {
                        imageType: G
                    });
                    H = this.img[G].img.getAttribute("src");
                    H = this.img[G].srcset ? [H, this.img[G].img.getAttribute("srcset")] : H;
                    this.imgLoad({
                        img: H,
                        type: G
                    })
                }
            },
            imgLoad: function(G) {
                var F = "a-img" === G.type ? "html" : "img";
                new y.ImageLoader(G.img, {
                    onload: l(function(H, I) {
                        if ("a-img" === H) {
                            this.html.img.load = "loaded";
                            this.html.img.size = I.size;
                            this.html.img.proportion = this.html.img.size.height / this.html.img.size.width
                        } else {
                            this.img[H].load = "loaded";
                            this.img[H].size = I.size;
                            if ("main" === H) {
                                this.img.proportion = this.img[H].size.height / this.img[H].size.width
                            } else {}
                            this.jCallEvent("addImgToCacheBox", {
                                img: I.img
                            })
                        }
                    }).jBind(this, G.type),
                    onerror: l(function(I, J) {
                        if ("a-img" !== I) {
                            var H = y.$new("div", {
                                "class": "mss-error-block"
                            });
                            H.innerHTML = this.o("errorBlock");
                            this.img[I].load = "error";
                            if (this.img[I].inDoc) {
                                this.container.insertBefore(H, this.img[I].img);
                                this.img[I].img.jRemove()
                            }
                            this.img[I].img = H;
                            if (I === "fullscreen") {
                                this.img.fullscreen.src = null;
                                this.img.fullscreen.srcset = null
                            }
                        } else {
                            this.html.img.load = "error"
                        }
                        this.jCallEvent("onImgError", {
                            itemType: I
                        })
                    }).jBind(this, G.type),
                    oncomplete: l(function(H, I) {
                        if (H !== "a-img") {
                            this.onLoadImg(H)
                        }
                        this.blockReady()
                    }).jBind(this, G.type)
                })
            },
            onLoadImg: function(F) {
                if (F === "main") {} else {
                    if (this.isFullscreen) {
                        if (this.img.fullscreen.load === "loaded") {
                            if (this.img.main.inDoc) {
                                this.img.main.img.jRemove();
                                this.img.main.inDoc = false;
                                this.img.main.img.shown = false;
                                this.img.main.img.jRemoveClass("mss-super-opacity-replace")
                            }
                            if (!this.isActive) {
                                this.img.fullscreen.shown = true;
                                this.img.fullscreen.img.jRemoveClass("mss-super-opacity-replace")
                            }
                        } else {
                            if (this.img.fullscreen.load === "error") {
                                if (this.isActive) {
                                    this.recoveryKenburns()
                                }
                                if (this.img.fullscreen.inDoc) {
                                    this.img.fullscreen.img.jRemove();
                                    this.img.fullscreen.inDoc = false;
                                    this.img.fullscreen.img.shown = false;
                                    this.img.fullscreen.img.jRemoveClass("mss-super-opacity-replace")
                                }
                                if (this.isActive) {
                                    this.load();
                                    this.createEffetWithMainImage()
                                }
                            }
                        }
                    }
                }
                if (!this.isMoving) {
                    this.startKenburns()
                }
                this.jCallEvent("onImgLoad", {
                    itemType: F
                })
            },
            parse: function() {
                var H, F, G = this.node;
                if (null !== G.getAttribute("data-mss-animation-block")) {
                    this.isAnimationBlock = true
                }
                this.rwd = (G.getAttribute("data-rwd")) === "true" ? true : false;
                this.dataWidth = !isNaN(parseInt(G.getAttribute("data-width"))) ? parseInt(G.getAttribute("data-width")) : null;
                this.dataHeight = !isNaN(parseInt(G.getAttribute("data-height"))) ? parseInt(G.getAttribute("data-height")) : null;
                H = parseFloat(G.style.opacity);
                this.styleOpacity = (!isNaN(H) && H > 0) ? H : null;
                if (null !== G.getAttribute("data-mss-constr-bg")) {
                    G = l(G.firstChild)
                }
                if ("IMG" === G.tagName) {
                    this.type = "img";
                    this.img.main.img = G;
                    if (!G.getAttribute("src")) {
                        F = y.findSrcset(G.getAttribute("data-image"));
                        this.img.main.src = F.src;
                        this.img.main.srcset = F.srcset
                    }
                    this.img.fullscreen.src = G.getAttribute("data-fullscreen-image");
                    if (this.img.fullscreen.src) {
                        F = y.findSrcset(this.img.fullscreen.src);
                        this.img.fullscreen.src = F.src;
                        this.img.fullscreen.img = y.$new("img", {
                            src: this.img.fullscreen.src,
                            "class": "mss-centering-img"
                        });
                        if (F.srcset) {
                            this.img.fullscreen.srcset = F.srcset;
                            this.img.fullscreen.img.setAttribute("srcset", F.srcset)
                        }
                    }
                    this.img.main.img.jAddClass("mss-super-opacity-replace");
                    if (this.o("caption")) {
                        this.title = G.getAttribute("title");
                        this.text = G.getAttribute("data-caption")
                    }
                    this.useMap = G.getAttribute("usemap")
                } else {
                    if ("IFRAME" === G.tagName || "VIDEO" === G.tagName.toUpperCase()) {
                        this.type = "video";
                        this.parseVideo()
                    } else {
                        G.jAddClass("mss-html-block");
                        this.html.text = true;
                        if ("A" === G.tagName) {
                            y.$A(G.childNodes).jEach(l(function(I) {
                                if ("element" === y.jTypeOf(I) && "IMG" === I.tagName) {
                                    this.html.img.img = I;
                                    this.html.text = false
                                }
                            }).jBind(this));
                            if (this.html.img.img) {
                                this.imgLoad({
                                    img: this.html.img.img.getAttribute("src"),
                                    type: this.html.img.type
                                })
                            }
                        }
                    }
                }
                this.hide()
            },
            parseVideo: function() {
                var F, G = this.node;
                if (/youtube.com/.test(G.getAttribute("src"))) {
                    F = "youtube"
                } else {
                    if (/vimeo.com/.test(G.getAttribute("src"))) {
                        F = "vimeo"
                    } else {
                        F = "video"
                    }
                }
                if (this.o("video-fullsize")) {
                    G.jSetCss({
                        width: "100%",
                        height: "100%"
                    })
                }
                this.video = new c(G, F, this.container, {
                    autoPlay: this.o("video-autoplay"),
                    rel: this.o("video-rel"),
                    loop: this.o("video-loop"),
                    controls: this.o("video-controls")
                });
                this.video.calcProportion(this.dataWidth, this.dataHeight);
                this.video.bindEvent("ready", l(function(H) {
                    this.blockReady()
                }).jBind(this));
                this.video.bindEvent("play", l(function(H) {
                    this.jCallEvent("stateChange", {
                        typeEvent: "play",
                        whoseEvent: H.whoseEvent
                    })
                }).jBind(this));
                this.video.bindEvent("pause", l(function(H) {
                    this.jCallEvent("stateChange", {
                        typeEvent: "pause",
                        whoseEvent: H.whoseEvent
                    })
                }).jBind(this));
                this.video.bindEvent("finish", l(function(H) {
                    this.jCallEvent("stateChange", {
                        typeEvent: "finish",
                        whoseEvent: H.whoseEvent
                    })
                }).jBind(this));
                this.video.init()
            },
            checkCaptionBlock: function() {
                var G, F;
                if (this.o("caption")) {
                    if (this.title || this.text) {
                        F = function(I) {
                            var H = /\[a([^\]]+)\](.*?)\[\/a\]/ig;
                            return I.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(H, "<a $1>$2</a>")
                        };
                        G = y.$new("span");
                        if (this.text) {
                            if (y.jTypeOf(this.text) == "element") {
                                if (this.text.tagName.toLowerCase() == "span") {
                                    G.changeContent(F(this.text.innerHTML));
                                    this.text.parentNode && l(this.text.parentNode).replaceChild(G, this.text)
                                }
                            } else {
                                G.changeContent(F(this.text))
                            }
                        }
                        this.text = l(G);
                        if (this.title) {
                            l(this.text).append(y.$new("b").jAddClass("mss-caption-title").changeContent(this.title), "top")
                        }
                        this.jCallEvent("createNewBlock", {
                            node: y.$new("div", {
                                "class": "mss-caption"
                            }).append(l(this.text))
                        })
                    }
                }
            },
            touchStart: function() {
                if ("fixed" !== this.o("out-move")) {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                    this.isOutEffect = false;
                    this.timerIsEnded = false;
                    this.effect && this.effect.stop()
                }
                if ("fixed" !== this.o("in-move")) {
                    this.hide()
                }
            },
            extraHide: function() {
                if (this.isOutEffect && "fixed" !== this.o("out-move")) {
                    this.hide()
                }
            },
            setAutoplay: function(F) {
                this.autoplay = F;
                if (!F) {
                    clearTimeout(this.timeout);
                    this.timeout = null
                }
                this.isOutEffect = false;
                this.timerIsEnded = false
            },
            play: function(I, K, F, H) {
                var G = ("-" + this.o(I + "Move").replace(/\s+/, "-")).jCamelize(),
                    J = this.o(I + "-move");
                !K && (K = y.$F);
                !F && (F = y.$F);
                !H && (H = {});
                if ("out" === I && this.timeout && !this.isOutEffect) {
                    this.isOutEffect = true;
                    J = "fixed"
                }
                clearTimeout(this.timeout);
                this.timeout = null;
                if ("fixed" !== J) {
                    if ("in" === I) {
                        this.effect && this.effect.stop()
                    }
                    if ("in" === I || "out" === I && !this.isOutEffect && (!this.effect || ("start" !== this.effect.phase && "progress" !== this.effect.phase))) {
                        this.effect = new y.Effects.CaptionEffects[G](this.node, I, y.extend(this.options.getJSON(), [{
                            insideOpacity: this.styleOpacity
                        }, H]));
                        this.effect.start({
                            start: l(function(L) {
                                this.startEffect(L), K(L)
                            }).jBind(this),
                            end: l(function(L) {
                                this.effect = null;
                                this.endEffect(L);
                                F(L)
                            }).jBind(this)
                        })
                    } else {
                        this.effect && this.effect.stop();
                        this.endEffect(I);
                        F(I)
                    }
                } else {
                    K(I);
                    F(I)
                }
            },
            startEffect: function(F) {
                this.isMoving = true;
                if ("out" === F) {
                    this.isOutEffect = true;
                    if (this.video) {
                        this.video.pause()
                    }
                } else {
                    this.isActive = true;
                    this.isOutEffect = false;
                    this.timerIsEnded = false;
                    if (!this.isFullscreen && this.img.main.img && !this.img.fullscreen.img) {
                        this.img.main.img.jRemoveClass("mss-super-opacity-replace")
                    }
                    this.show();
                    this.createEffetWithMainImage();
                    if ("fixed" !== this.o("out-move") && this.autoplay && !this.o("standard-caption")) {
                        this.timeout = setTimeout(l(function() {
                            this.timeout = null;
                            this.timerIsEnded = true;
                            !this.effect && this.play("out", null, null, {
                                outDelay: 0
                            })
                        }).jBind(this), this.o("out-at"))
                    }
                }
            },
            endEffect: function(G, F) {
                this.isMoving = false;
                if ("in" === G) {
                    if (this.video) {
                        this.video.play()
                    }
                    if (this.img.onlyImg && this.img[this.img.type].load === "loaded") {
                        this.startKenburns()
                    }
                    if (this.timerIsEnded) {
                        this.timerIsEnded = false;
                        this.play("out", null, null, {
                            outDelay: 0
                        })
                    }
                } else {
                    this.isActive = false;
                    this.hide();
                    this.recoveryKenburns()
                }
            },
            stopTimer: function() {
                var F = false;
                if (this.video && this.o("video-autoplay")) {} else {
                    if ("img" === this.type) {
                        if (this.isFullscreen) {
                            if (this.img.fullscreen.img) {
                                if ("loaded" !== this.img.fullscreen.load) {
                                    F = true
                                }
                            } else {
                                if ("loaded" !== this.img.main.load) {
                                    F = true
                                }
                            }
                        } else {
                            if ("loaded" !== this.img.main.load && "error" !== this.img.main.load) {
                                F = true
                            }
                        }
                    }
                }
                return F
            },
            createEffetWithMainImage: function() {
                var I = null,
                    H = null,
                    K = null,
                    J = null,
                    F = this.o("kenburns"),
                    G = false;
                if (!this.img.onlyImg || this.kenburns) {
                    return
                }
                if (this.isFullscreen) {
                    if (this.img.fullscreen.inDoc) {
                        H = this.img.fullscreen
                    } else {
                        if (this.img.main.inDoc) {
                            H = this.img.main
                        }
                    }
                } else {
                    if (this.img.fullscreen.inDoc && this.img.fullscreen.load === "loaded" && !l(["loaded", "error"]).contains(this.img.main.load)) {
                        H = this.img.fullscreen
                    } else {
                        if (this.img.main.inDoc && this.img.main.load !== "error") {
                            H = this.img.main
                        }
                    }
                }
                if (I || H) {
                    G = !H.shown;
                    if (this.o("preload") && H === this.img.main) {
                        G = false;
                        H.img.jRemoveClass("mss-super-opacity-replace")
                    }
                    if (I && I.img) {
                        K = I.img
                    }
                    if (H && H.img) {
                        J = H.img
                    }
                    if (H.load === "error") {
                        F = false
                    }
                    if (F || G) {
                        this.setKenburns([K, J], F, G)
                    }
                }
            },
            startKenburns: function() {
                if (this.kenburns && !this.kenburns.moving) {
                    this.kenburns.start();
                    this.img[this.img.type].shown = true
                }
            },
            recoveryKenburns: function() {
                if (this.kenburns) {
                    this.kenburns.recoverySize();
                    this.kenburns = null
                }
            },
            setKenburns: function(G, F, H) {
                if (!this.kenburns && (F || H)) {
                    G[1].jRemoveClass("mss-super-opacity-replace");
                    this.kenburns = new y.Effects.KAR(G[0], G[1], {
                        kenburns: this.o("kenburns") ? F : false,
                        replace: H,
                        direction: this.o("kenburns-direction"),
                        kenburnsSpeed: this.o("kenburns-speed")
                    })
                }
            },
            showCaption: function() {
                if (this.o("standard-caption")) {
                    if (this.effect) {
                        this.effect.stop()
                    }
                    this.play("in")
                }
            },
            isLoading: function() {
                var F = false;
                if (this.img.onlyImg) {
                    if (this.isFullscreen) {
                        if (this.img.fullscreen.img) {
                            if (!l(["loaded", "error"]).contains(this.img.fullscreen.load)) {
                                F = true
                            }
                        } else {
                            if (!l(["loaded", "error"]).contains(this.img.main.load)) {
                                F = true
                            }
                        }
                    } else {
                        if (!l(["loaded", "error"]).contains(this.img.main.load)) {
                            F = true
                        }
                    }
                }
                return F
            },
            beforeEnterFullScreen: function(F) {
                this.isFullscreen = true;
                this.recoveryKenburns();
                if (this.img.onlyImg) {
                    this.quickReplacement();
                    if (this.img.fullscreen.img) {
                        if (this.img.main.inDoc) {
                            this.img.main.img.jAddClass("mss-super-opacity-replace")
                        }
                        this.img.type = "fullscreen"
                    }
                    if (F || this.o("preload")) {
                        this.load();
                        if (F) {
                            this.createEffetWithMainImage()
                        }
                    }
                }
            },
            afterEnterFullScreen: function(F) {
                if (F) {
                    this.showCaption();
                    if (this.img.onlyImg && this.img[this.img.type].load === "loaded") {
                        this.startKenburns()
                    }
                }
            },
            beforeExitFullScreen: function(F) {
                this.isFullscreen = false;
                this.recoveryKenburns();
                if (this.img.onlyImg) {
                    this.quickReplacement();
                    if (this.img.type === "fullscreen") {
                        if (this.img.fullscreen.load !== "loaded") {
                            this.img.type = "main"
                        }
                    }
                    if (F) {
                        this.load();
                        this.createEffetWithMainImage()
                    }
                }
            },
            afterExitFullScreen: function(F) {
                if (F) {
                    this.showCaption();
                    if (this.img.type === "fullscreen") {
                        if (this.img.fullscreen.load !== "loaded") {
                            if (F) {
                                l(this.img.fullscreen.img).jAddClass("mss-super-opacity-replace")
                            }
                        }
                    }
                    if (this.img.onlyImg && this.img[this.img.type].load === "loaded") {
                        this.startKenburns()
                    }
                }
            },
            quickReplacement: function() {
                var G, F;
                if (this.type !== "img") {
                    return
                }
                if (this.img.main.img && l(["loaded", "error"]).contains(this.img.main.load) && this.img.fullscreen.img && l(["loaded", "error"]).contains(this.img.fullscreen.load)) {
                    if (this.isFullscreen) {
                        if (this.img.type === "main") {
                            G = "main";
                            F = "fullscreen"
                        }
                    } else {
                        if (this.img.type === "fullscreen") {
                            G = "fullscreen";
                            F = "main"
                        }
                    }
                }
                if (G && F) {
                    if (y.browser.ieMode < 9) {
                        setTimeout(l(function() {
                            l(this.img[F].img).jRemoveClass("mss-super-opacity-replace")
                        }).jBind(this), 1)
                    } else {
                        l(this.img[F].img).jRemoveClass("mss-super-opacity-replace")
                    }
                    this.container.insertBefore(this.img[F].img, this.img[G].img);
                    this.img[F].inDoc = true;
                    this.img[F].shown = true;
                    this.img.type = F;
                    l(this.img[G].img).jRemove();
                    this.img[G].inDoc = false;
                    this.mapExpand()
                }
            },
            mapExpand: function() {
                var L = this.img.main.size,
                    G = this.img.fullscreen.size,
                    F, M, K, J, H, I;
                if (!this.img.main.img || !L || !G) {
                    return
                }
                M = (this.img[!this.isFullscreen ? "fullscreen" : "main"].img.getAttribute("usemap") || "").replace("#", "");
                F = /-expanded/.test(M);
                if (this.isFullscreen && F || !this.isFullscreen && !F) {
                    return
                }
                if (this.isFullscreen) {
                    if (!this.img.fullscreen.img) {
                        return
                    }
                    if (M && (K = document.getElementsByName(M)) && K.length) {
                        J = G.width / L.width;
                        H = G.height / L.height;
                        this.useMap = $mjs(K[0].cloneNode(true));
                        this.useMap.setAttribute("id", M + "-expanded");
                        this.useMap.setAttribute("name", M + "-expanded");
                        I = y.$A($mjs(K[0]).byTag("area"));
                        y.$A(this.useMap.byTag("area")).jEach(function(O, N) {
                            O.setAttribute("shape", I[N].shape);
                            O.setAttribute("coords", y.$A(I[N].coords.split(",")).map(function(P) {
                                return (P % 2) ? P * H : P * J
                            }).join(","));
                            (y.browser.ieMode && y.browser.ieMode < 9) && $mjs(O).jAddEvent("mouseup", function(P) {
                                P.stop()
                            })
                        });
                        this.useMap.jAppendTo(this.container.parentNode);
                        this.img.fullscreen.img.setAttribute("useMap", "#" + M + "-expanded")
                    }
                } else {
                    this.useMap.jRemove();
                    this.useMap = null;
                    this.img.fullscreen.img.setAttribute("useMap", (this.img.fullscreen.img.getAttribute("usemap").replace("-expanded", "")))
                }
            },
            blockReady: function() {
                if (!this.ready) {
                    this.jCallEvent("blockReady")
                }
            },
            jGetStyles: function() {
                var F;
                if ("html" === this.type) {
                    if (this.html.text) {
                        F = this.node.jGetCss("font-size");
                        if (F && /px/.test(F)) {
                            this.html.fontSize = parseInt(F)
                        }
                        l(["top", "left", "right", "bottom"]).jEach(l(function(G) {
                            F = this.node.jGetCss("padding-" + G);
                            if (F && /px/.test(F)) {
                                this.html["padding" + (("-" + G).jCamelize())] = parseInt(F)
                            }
                        }).jBind(this))
                    }
                } else {
                    if ("video" === this.type) {}
                }
            },
            onResize: function(F) {
                var G;
                if (this.rwd) {
                    if ("img" === this.type) {
                        if (!this.img.onlyImg) {
                            G = (F.width / this.o("baseWidth")) * this.dataWidth;
                            this.node.jSetCss({
                                width: G,
                                height: G * this.img.proportion
                            })
                        }
                    } else {
                        if ("html" === this.type) {
                            if (this.html.text) {
                                G = F.width / this.o("baseWidth");
                                this.node.jSetCssProp("font-size", G * this.html.fontSize);
                                l(["top", "left", "right", "bottom"]).jEach(l(function(H) {
                                    if (this.html["padding" + (("-" + H).jCamelize())]) {
                                        this.node.jSetCssProp("padding-" + H, G * this.html["padding" + (("-" + H).jCamelize())])
                                    }
                                }).jBind(this))
                            } else {
                                if (this.html.img.img) {
                                    G = (F.width / this.o("baseWidth")) * this.dataWidth;
                                    l(this.html.img.img).jSetCss({
                                        width: G,
                                        height: G * this.html.img.proportion
                                    })
                                }
                            }
                        } else {
                            if (this.aImg) {
                                G = (F.width / this.o("baseWidth")) * this.dataWidth;
                                this.node.jSetCss({
                                    width: G,
                                    height: G * this.img.proportion
                                })
                            } else {
                                if (!this.o("video-fullsize")) {
                                    G = (F.width / this.o("baseWidth")) * this.dataWidth;
                                    this.node.jSetCss({
                                        width: G,
                                        height: this.video.proportion * G
                                    })
                                }
                            }
                        }
                    }
                }
            },
            dispose: function() {
                if (this.kenburns) {
                    this.kenburns.stop();
                    this.kenburns.recoverySize()
                }
                this.ready = false;
                this.effect && this.effect.stop();
                this.node.jSetCss({
                    visibility: "",
                    "transform-origin": "",
                    transition: ""
                });
                if ("html" === this.type) {
                    if (this.o("standard-caption")) {
                        this.node.jRemove()
                    }
                } else {
                    if ("img" === this.type) {
                        this.img.main.img.jRemoveClass("mss-centering-img");
                        if (this.img.main.src) {
                            this.img.main.img.removeAttribute("src")
                        }
                        if ("fullscreen" === this.img.type) {
                            this.container.insertBefore(this.img.main.img, this.img.fullscreen.img);
                            this.img.fullscreen.img.jRemove()
                        }
                    } else {
                        if ("video" === this.type) {
                            if (/mss-slideshow/.test(this.video.id)) {
                                this.node.removeAttribute("id")
                            }
                            this.video.dispose()
                        }
                    }
                }
            }
        });
        y.extend(E.prototype, y.customEvents);
        return E
    })();
    var c = (function() {
        var H = function(I) {
                if (I) {
                    I = I.replace(/^(https?:)?(.+)/, "https:\\$2")
                }
                return I
            },
            G = function(J) {
                var I = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
                return I.exec(J)[1]
            },
            F = function(I) {
                var J, K = [];
                for (J in I) {
                    if (I.hasOwnProperty(J)) {
                        K.push(encodeURIComponent(J) + "=" + encodeURIComponent(I[J]))
                    }
                }
                return K.join("&")
            },
            E = function(L, K, I, J) {
                y.$uuid(this);
                this.type = K;
                this.node = L;
                this.container = I;
                this.options = {
                    autoPlay: true
                };
                this.o = this.options;
                y.extend(this.o, J || {});
                this.src = null;
                this.id = null;
                this.videoId = null;
                this.player = null;
                this.state = "unstarted";
                this.ready = false;
                this.apiReady = false;
                this.proportion = null;
                this.myEvent = false;
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
                }
                this.youtubeParams = {
                    enablejsapi: 1,
                    origin: document.location.origin
                };
                this.src = this.node.getAttribute("src");
                this.id = this.node.getAttribute("id") || "mss-slideshow-" + this.type + "-" + Math.floor(Math.random() * y.now());
                this.vimeoParams = {
                    api: 1,
                    player_id: this.id
                }
            };
        y.extend(E.prototype, {
            calcProportion: function(I, J) {
                this.proportion = J / I || ("youtube" === this.type ? (315 / 560) : ("vimeo" === this.type ? (281 / 500) : 0.625))
            },
            init: function() {
                var I;
                if ("youtube" === this.type) {
                    this.initPlayer()
                } else {
                    this.node.setAttribute("id", this.id);
                    this.container && this.container.append(this.node);
                    if ("vimeo" === this.type) {
                        this.src = this.src.replace(/https*:/, "https:");
                        this.src = this.src.split("?")[0] + "?" + F(this.vimeoParams);
                        this.node.setAttribute("src", this.src);
                        this.addEventsVimeo()
                    } else {
                        if (y.browser.ieMode && y.browser.ieMode < 9) {
                            this.o.autoPlay = false;
                            this.node.jSetCss({
                                display: "inline",
                                "line-height": "100%",
                                "text-align": "center",
                                "vertical-align": "middle"
                            }).changeContent("You browser does not support HTML5 video");
                            this.onPlayerReady()
                        } else {
                            if (this.src) {
                                this.node.setAttribute("src", this.src)
                            } else {
                                this.node.setAttribute("src", "");
                                this.node.removeAttribute("src")
                            }
                            this.addEventsVideo()
                        }
                    }
                }
            },
            addEventsVideo: function() {
                this.node.jAddEvent("ended play pause loadeddata loadstart timeupdate", l(function(I) {
                    switch (I.type) {
                        case "ended":
                            this.playerStateChange("finish");
                            break;
                        case "play":
                            this.playerStateChange("play");
                            break;
                        case "pause":
                            this.playerStateChange("pause");
                            break;
                        case "timeupdate":
                            break;
                        case "loadeddata":
                            break;
                        case "loadstart":
                            this.onPlayerReady();
                            break
                    }
                }).jBind(this))
            },
            addEventsVimeo: function() {
                if (!y.browser.ieMode || y.browser.ieMode && y.browser.ieMode > 9) {
                    window.jAddEvent("message", l(function(J) {
                        if ("vimeo" === this.type) {
                            try {
                                var I = JSON.parse(J.data);
                                switch (I.event) {
                                    case "ready":
                                        this.vimeoPost("addEventListener", "pause");
                                        this.vimeoPost("addEventListener", "play");
                                        this.vimeoPost("addEventListener", "finish");
                                        this.onPlayerReady();
                                        break;
                                    case "play":
                                        this.playerStateChange("play");
                                        break;
                                    case "pause":
                                        this.playerStateChange("pause");
                                        break;
                                    case "finish":
                                        this.playerStateChange("finish");
                                        break
                                }
                            } catch (J) {
                                if (I.event === "ready") {
                                    this.onPlayerReady()
                                }
                            }
                        }
                    }).jBind(this))
                } else {
                    if ("vimeo" === this.type) {
                        l(this.node).jAddEvent("load", l(function(I) {
                            this.onPlayerReady()
                        }).jBind(this))
                    }
                }
            },
            vimeoPost: function(L, K) {
                var I, J = {
                    method: L
                };
                if ("vimeo" === this.type) {
                    K && (J.value = K);
                    I = JSON.stringify(J);
                    this.node.contentWindow.postMessage(J, H(this.src.split("?")[0]))
                }
            },
            initPlayer: function() {
                if (!this.player && this.apiReady && window.YT) {
                    this.node.setAttribute("id", this.id);
                    this.videoId = G(this.src);
                    this.src = "https://www.youtube.com/embed/" + this.videoId + "?" + F(this.youtubeParams);
                    this.node.setAttribute("src", this.src);
                    this.container && this.container.append(this.node);
                    this.player = new window.YT.Player(this.id, {
                        videoId: this.videoId,
                        events: {
                            onReady: this.onPlayerReady.jBind(this),
                            onStateChange: this.onPlayerStateChange.jBind(this)
                        }
                    });
                    if (y.browser.ieMode && y.browser.ieMode < 9) {
                        this.onPlayerReady()
                    }
                }
            },
            playerStateChange: function(I) {
                this.state = I;
                this.jCallEvent(I, {
                    typeVideo: this.type,
                    whoseEvent: this.myEvent
                });
                this.myEvent = false
            },
            onPlayerStateChange: function(I) {
                switch (I.target.getPlayerState()) {
                    case 0:
                        this.playerStateChange("finish");
                        break;
                    case 1:
                        this.playerStateChange("play");
                        break;
                    case 2:
                        this.playerStateChange("pause");
                        break;
                    case 3:
                        break;
                    case 5:
                        break
                }
            },
            onPlayerReady: function() {
                this.ready = true;
                this.playerStateChange("ready")
            },
            youtubeApiReady: function() {
                if ("youtube" === this.type) {
                    this.apiReady = true;
                    this.initPlayer()
                }
            },
            play: function() {
                if (this.o.autoPlay) {
                    if ("youtube" === this.type) {
                        if (this.player && this.ready && l(["unstarted", "pause", "finish", "ready"]).contains(this.state)) {
                            if (this.player.playVideo) {
                                this.myEvent = true;
                                this.player.playVideo()
                            }
                        }
                    } else {
                        if ("vimeo" === this.type && this.ready) {
                            this.myEvent = true;
                            this.vimeoPost("play")
                        } else {
                            if ("video" === this.type) {
                                if (y.browser.ieMode && y.browser.ieMode < 9) {} else {
                                    if (this.node.paused) {
                                        this.myEvent = true;
                                        this.node.play()
                                    }
                                }
                            }
                        }
                    }
                }
            },
            pause: function() {
                if ("youtube" === this.type) {
                    if (this.player && this.ready) {
                        if (this.player.pauseVideo) {
                            this.myEvent = true;
                            this.player.pauseVideo()
                        }
                    }
                } else {
                    if ("vimeo" === this.type && this.ready) {
                        this.myEvent = true;
                        this.vimeoPost("pause")
                    } else {
                        if ("video" === this.type) {
                            if (y.browser.ieMode && y.browser.ieMode < 9) {} else {
                                if (!this.node.paused) {
                                    this.myEvent = true;
                                    this.node.pause()
                                }
                            }
                        }
                    }
                }
            },
            dispose: function() {
                var I;
                this.src && this.node.setAttribute("src", this.src.split("?")[0]);
                if ("video" === this.type) {
                    this.node.jRemoveEvent("ended play pause loadeddata loadstart timeupdate")
                } else {
                    if ("vimeo" === this.type) {
                        window.jRemoveEvent("message")
                    } else {
                        if ("youtube" === this.type) {}
                    }
                }
                this.node = null
            }
        });
        y.extend(E.prototype, y.customEvents);
        return E
    })();
    var m = (function() {
        var E = function(I, G, F, H) {
            y.$uuid(this);
            this.originNode = l(I);
            this.container = F;
            this.insideOptions = {
                preload: true,
                selectors: false,
                selectorsStyle: "bullets",
                loader: true,
                caption: true,
                captionEffect: "fade",
                baseWidth: 1000,
                kenburns: false,
                bulletsTooltip: true,
                selectorsFill: false,
            };
            this.io = this.insideOptions;
            y.extend(this.io, H.insideOptions || {});
            this.defaultOptions = {
                effect: {
                    type: "string",
                    "enum": ["random", "slide", "fade", "fade-up", "fade-down", "dissolve", "scroll", "cube", "bars3d", "slide-in", "slide-out", "flip", "blinds3d", "slide-change", "diffusion", "blocks"],
                    "default": "slide"
                },
                "effect-speed": {
                    type: "number",
                    minimum: 1,
                    "default": 600
                },
                "effect-easing": {
                    type: "string",
                    "default": "ease"
                },
                "slide-duration": {
                    type: "number",
                    minimum: 1,
                    "default": 3000
                }
            };
            this.options = new y.Options(this.defaultOptions);
            this.options.fromJSON(H.options || {});
            this.o = this.options.get.jBind(this.options);
            this.set = this.options.set.jBind(this.options);
            this.setOptions();
            this.index = G;
            this.progress = null;
            this.onlyImg = false;
            this.ready = false;
            this.callback = null;
            this.start = false;
            this.fullscreenFlag = false;
            this.slide = y.$new("div", {
                "class": "mss-slide"
            }).jAddClass("mss-slide-" + this.index);
            this.selector = {
                load: "notLoaded",
                node: null,
                previewNode: null,
                insideNode: null
            };
            if (this.io.loader) {
                this.progress = y.$new("div", {
                    "class": "mss-loader"
                }, {
                    position: "absolute",
                    "z-index": "10000"
                });
                this.progress.jAppendTo(this.slide).show();
                if (0 === this.index) {
                    this.progress.show()
                } else {
                    this.progress.hide()
                }
            }
            this.state = "hidden";
            this.animationBlocks = l([]);
            this.countLoadedBlocks = 0;
            this.parse(I);
            this.hide()
        };
        y.extend(E.prototype, {
            setOptions: function() {
                g.call(this, this.originNode, this.defaultOptions);
                if (y.browser.ieMode && y.browser.ieMode <= 9) {
                    if (l(["flip", "fade-up", "fade-down", "swipe", "blinds3d", "cube", "bars3d"]).contains(this.o("effect"))) {
                        this.set("effect", "slide")
                    }
                }
            },
            show: function(F) {
                if (y.browser.ieMode && y.browser.ieMode > 8 || !y.browser.ieMode) {
                    this.slide && this.slide.jRemoveClass("mss-super-opacity")
                }
                if (this.ready) {
                    this.originNode.jSetCssProp("visibility", "visible");
                    if (this.onlyImg && this.onlyImg.img.fullscreen.img) {
                        this.onlyImg.img.fullscreen.img.jSetCssProp("visibility", "visible")
                    }
                    if (F) {
                        this.animationBlocks.jEach(l(function(G) {
                            if ("fixed" === G.o("in-move")) {
                                G.show()
                            }
                        }).jBind(this))
                    }
                }
            },
            hide: function(F) {
                if (y.browser.ieMode && y.browser.ieMode > 8 || !y.browser.ieMode) {
                    this.slide && this.slide.jAddClass("mss-super-opacity")
                }
                this.originNode.jSetCssProp("visibility", "hidden");
                if (this.onlyImg && this.onlyImg.img.fullscreen.img) {
                    this.onlyImg.img.fullscreen.img.jSetCssProp("visibility", "hidden")
                }
                if (F) {
                    this.animationBlocks.jEach(l(function(G) {
                        G.hide()
                    }).jBind(this))
                }
            },
            checkImg: function() {
                var G = false,
                    F = false;
                this.animationBlocks.jEach(l(function(I, H) {
                    if (!G && "img" === I.type && !I.isAnimationBlock) {
                        G = I
                    } else {
                        if (!I.isAnimationBlock) {
                            F = true
                        }
                        if ("img" === I.type) {
                            I.set("kenburns", false)
                        }
                    }
                }).jBind(this));
                this.onlyImg = (G && !F) ? G : false;
                this.onlyImg && (this.onlyImg.img.onlyImg = true)
            },
            parse: function(G) {
                var F = {
                    preload: this.io.preload,
                    kenburns: this.io.kenburns,
                    baseWidth: this.io.baseWidth,
                    "kenburns-speed": this.o("slide-duration"),
                    caption: this.io.caption,
                    errorBlock: this.io.errorBlock
                };
                this.container.append(this.slide);
                if (G.childNodes.length > 0 && "VIDEO" !== G.tagName) {
                    y.$A(G.childNodes).jEach(l(function(H) {
                        if ("element" === y.jTypeOf(H) && "!" !== H.tagName) {
                            if (null === H.getAttribute("data-mss-thumbnail")) {
                                this.initAnimationBlock(H, G, F)
                            } else {
                                this.selector.node = H;
                                this.selector.previewNode = H;
                                this.selector.insideNode = true
                            }
                        }
                    }).jBind(this));
                    G.jAddClass("mss-content")
                } else {
                    if ("element" === y.jTypeOf(G)) {
                        this.initAnimationBlock(G, this.slide, F)
                    }
                }
                this.getSelector(G);
                this.slide.append(G);
                this.animationBlocks.jEach(l(function(H) {
                    H.done()
                }).jBind(this));
                this.checkImg();
                if (this.onlyImg) {
                    this.onlyImg.img.main.img.jAddClass("mss-centering-img");
                    this.onlyImg.img.fullscreen.img && this.onlyImg.img.fullscreen.img.jAddClass("mss-centering-img")
                }
            },
            jGetStyles: function() {
                this.animationBlocks.jEach(l(function(F) {
                    F.jGetStyles()
                }).jBind(this))
            },
            initAnimationBlock: function(H, F, G) {
                var I = new D(H, F, G || {});
                I.bindEvent("createNewBlock", l(function(J) {
                    this.slide.append(J.node);
                    this.initAnimationBlock(J.node, this.slide, y.extend({
                        "standard-caption": true
                    }, G || {}))
                }).jBind(this));
                I.bindEvent("loading", l(function(J) {
                    if ("fullscreen" === J.imageType && "active" === this.state) {
                        this.progress && this.progress.show()
                    }
                }).jBind(this));
                I.bindEvent("onImgLoad", l(function(J) {
                    this.progress && this.progress.hide()
                }).jBind(this));
                I.bindEvent("blockReady", l(function(J) {
                    this.countLoadedBlocks += 1;
                    if (this.countLoadedBlocks === this.animationBlocks.length) {
                        this.ready = true;
                        if (this.start) {
                            this.onResize()
                        }
                        if ("hidden" !== this.state) {
                            this.show()
                        }
                        this.animationBlocks.jEach(l(function(K) {
                            K.ready = true;
                            if ("hidden" !== this.state) {
                                if ("active" === this.state) {
                                    if ("fixed" !== K.o("in-move")) {
                                        K.show()
                                    }
                                } else {
                                    if ("fixed" === K.o("in-move")) {
                                        K.show()
                                    }
                                }
                            }
                        }).jBind(this));
                        this.progress && this.progress.hide();
                        if (this.callback) {
                            this.callback();
                            this.callback = null
                        }
                    }
                }).jBind(this));
                I.bindEvent("addImgToCacheBox", l(function(J) {
                    this.addImgToCacheBox(J.img)
                }).jBind(this));
                I.bindEvent("onImgError", l(function(J) {}).jBind(this));
                I.bindEvent("stateChange", l(function(J) {
                    this.checkPlayPause(J.typeEvent, J.whoseEvent);
                    this.jCallEvent("videoStateChange", {
                        state: J.typeEvent,
                        index: this.index
                    })
                }).jBind(this));
                this.animationBlocks.push(I);
                I.parse();
                if (I.o("video-fullsize") && "video" === I.type) {
                    this.originNode.jSetCss({
                        width: "100%",
                        height: "100%"
                    })
                }
                I.checkCaptionBlock()
            },
            addSelectors: function() {
                var F, G;
                if (this.io.selectors) {
                    this.selector.load = "loading";
                    F = this.io.selectorsStyle;
                    G = this.selector[this.io.bulletsTooltip ? "previewNode" : "node"];
                    if ("thumbnails" === F || this.io.bulletsTooltip) {
                        if ("IMG" === G.tagName) {
                            new y.ImageLoader(G, {
                                onload: l(function(H) {
                                    this.selector.load = "loaded";
                                    this.addImgToCacheBox(H.img)
                                }).jBind(this),
                                oncomplete: l(function(H) {
                                    this.jCallEvent("onSelectorLoad")
                                }).jBind(this)
                            })
                        } else {
                            this.selector.load = "loaded"
                        }
                    }
                    if ("bullets" === F) {
                        this.selector.node = y.$new("div", {
                            "class": "mss-selector-" + this.index
                        });
                        if (this.io.bulletsTooltip) {
                            this.jCallEvent("bulletTooltipJump", {
                                index: this.index
                            })
                        }
                    }
                    l(this.selector.node).jStore("slideshow:item", {
                        index: this.index
                    });
                    this.jCallEvent("addSelector", {
                        selector: this.selector.node,
                        selectorType: F,
                        index: this.index,
                        previewNode: this.selector.previewNode
                    })
                }
            },
            loadSlide: function(F) {
                if (!this.ready) {
                    this.callback = F;
                    this.prepareItem()
                } else {
                    F && F()
                }
            },
            prepareItem: function() {
                if (this.onlyImg) {
                    this.onlyImg.quickReplacement()
                }
                this.animationBlocks.jEach(l(function(G, F) {
                    G.load()
                }).jBind(this))
            },
            activate: function() {
                this.prepareItem()
            },
            getSelector: function(I) {
                var G, H, L, K, F, J;
                if ("thumbnails" === this.io.selectorsStyle || this.io.bulletsTooltip) {
                    if (!this.selector.node) {
                        F = l(function(O) {
                            var M = null,
                                N = y.findSrcset(O.getAttribute("data-thumb-image"));
                            if (N.src) {
                                M = y.$new("img", {
                                    src: N.src
                                });
                                if (N.srcset) {
                                    M.setAttribute("srcset", N.srcset)
                                }
                            }
                            return M
                        }).jBind(this);
                        H = l(function(M) {
                            var N, Q, P, O;
                            N = y.findSrcset(M.img.getAttribute("data-thumb-image"));
                            if (N.src) {
                                P = N.src;
                                O = N.srcset
                            } else {
                                if (M.src) {
                                    P = M.src;
                                    O = M.srcset
                                } else {
                                    P = M.img.getAttribute("src");
                                    N = M.img.getAttribute("srcset");
                                    if (N) {
                                        O = N
                                    }
                                }
                            }
                            Q = y.$new("img", {
                                src: P
                            });
                            O && Q.setAttribute("srcset", O);
                            return Q
                        }).jBind(this);
                        K = l(function(N) {
                            var M;
                            if (this.io.selectorsFill) {
                                M = y.$new("div", {
                                    "class": "mss-img-wrapper"
                                });
                                M.appendChild(N);
                                return M
                            } else {
                                return N
                            }
                        }).jBind(this);
                        J = F(I);
                        if (J) {
                            if (this.io.bulletsTooltip) {
                                this.selector.previewNode = J
                            } else {
                                this.selector.node = K(J)
                            }
                        } else {
                            if (this.onlyImg) {
                                L = H(this.onlyImg.img.main);
                                if (this.io.bulletsTooltip) {
                                    this.selector.previewNode = L
                                } else {
                                    this.selector.node = K(L)
                                }
                            } else {
                                for (G = 0; G < this.animationBlocks.length; G++) {
                                    if (this.animationBlocks[G].img.main.img) {
                                        L = H(this.animationBlocks[G].img.main);
                                        if (this.io.bulletsTooltip) {
                                            this.selector.previewNode = L
                                        } else {
                                            this.selector.node = K(L)
                                        }
                                        break
                                    }
                                }
                                if (!this.selector.node && !this.selector.previewNode) {
                                    L = y.$new("div", {
                                        "class": "mss-selector-empty"
                                    });
                                    if (this.io.bulletsTooltip) {
                                        this.selector.previewNode = L
                                    } else {
                                        this.selector.node = L
                                    }
                                }
                            }
                        }
                    }
                }
            },
            stopTimer: function() {
                var F = false;
                this.animationBlocks.jEach(l(function(G) {
                    if (G.stopTimer()) {
                        F = true
                    }
                }).jBind(this));
                return F
            },
            apiReady: function() {
                this.animationBlocks.jEach(l(function(F) {
                    F.video && F.video.youtubeApiReady()
                }).jBind(this))
            },
            checkYoutubeVideo: function() {
                var F = false;
                this.animationBlocks.jEach(l(function(G) {
                    if (G.video && "youtube" === G.video.type) {
                        F = true
                    }
                }).jBind(this));
                return F
            },
            checkPlayPause: function(H, G) {
                var F = false;
                if ("play" === H) {
                    this.jCallEvent("autoPlayPause", {
                        play: true,
                        video: true
                    })
                } else {
                    if ("pause" === H || "finish" === H) {
                        if ("finish" === H) {
                            G = true
                        }
                        if (this.video) {
                            if (!l(["pause", "finish"]).contains(this.video.state)) {
                                F = true
                            }
                        }
                        this.animationBlocks.jEach(l(function(I) {
                            if (I.video) {
                                if (!l(["pause", "finish"]).contains(I.video.state)) {
                                    F = true
                                }
                            }
                        }).jBind(this));
                        if (!F && G) {
                            this.jCallEvent("autoPlayPause", {
                                play: false,
                                video: true
                            })
                        }
                    }
                }
            },
            checkVideo: function() {
                var F = false;
                this.animationBlocks.jEach(l(function(G) {
                    if ("video" === G.type) {
                        F = true
                    }
                }).jBind(this));
                return F
            },
            jumpAnimationBlock: function(G, H) {
                var F = this.animationBlocks.length;
                if (F > 0) {
                    this.animationBlocks.jEach(l(function(I) {
                        I.play(G, l(function(J) {
                            this.startAnimationBlockEffect(J)
                        }).jBind(this), l(function(J) {
                            F -= 1;
                            if (0 === F) {
                                this.endAnimationBlockEffect(J);
                                H && H()
                            }
                        }).jBind(this))
                    }).jBind(this))
                } else {
                    H && H()
                }
            },
            setAutoplay: function(F) {
                this.animationBlocks.jEach(l(function(G) {
                    G.setAutoplay(F)
                }).jBind(this))
            },
            hideBlocks: function() {
                var F = this.animationBlocks.length;
                if (F > 0) {
                    this.animationBlocks.jEach(l(function(G) {
                        G.extraHide()
                    }).jBind(this))
                }
            },
            startAnimationBlockEffect: function(F) {
                this.jCallEvent("startAnimationBlockEffect", {
                    typeEffect: F
                })
            },
            endAnimationBlockEffect: function(F) {
                this.jCallEvent("endAnimationBlockEffect", {
                    typeEffect: F
                })
            },
            addImgToCacheBox: function(F) {
                this.jCallEvent("addToCacheBox", {
                    img: F
                })
            },
            getHeight: function() {
                var F = 0,
                    G;
                if (this.onlyImg) {
                    F = Math.min(this.onlyImg.img.main.size.width, this.container.jGetSize().width) * this.onlyImg.img.proportion
                } else {
                    F = this.originNode.jGetSize().height;
                    this.animationBlocks.jEach(l(function(H) {
                        if ("video" === H.type && H.o("video-fullsize")) {
                            F = this.container.jGetSize().width * H.video.proportion;
                            return F
                        } else {
                            if ("absolute" !== H.node.jGetCss("display")) {
                                G = H.node.jGetSize().height;
                                if (G > F) {
                                    F = G
                                }
                            }
                        }
                    }).jBind(this))
                }
                return F
            },
            startSlideEffect: function(F) {
                var G = "next" === F ? "in" : "out";
                if ("next" === F) {
                    this.state = "incoming";
                    if (!this.ready || this.onlyImg && this.onlyImg.isLoading()) {
                        this.progress && this.progress.show()
                    }
                    this.show()
                } else {
                    this.state = "outgoing"
                }
                this.animationBlocks.jEach(l(function(H) {
                    if ("fixed" === H.o(G + "-move")) {
                        H.startEffect(G)
                    }
                }).jBind(this))
            },
            endSlideEffect: function(F) {
                var G = false,
                    H = "next" === F ? "in" : "out";
                if ("next" === F) {
                    this.state = "active";
                    if (this.progress) {
                        if (this.ready && !this.onlyImg || this.onlyImg && !this.onlyImg.isLoading()) {
                            this.progress.hide()
                        }
                    }
                } else {
                    this.state = "hidden";
                    this.progress && this.progress.hide();
                    this.hide()
                }
                if ("active" === this.state && this.onlyImg && "fullscreen" !== this.onlyImg.img.type && this.fullscreenFlag) {
                    G = true
                }
                this.animationBlocks.jEach(l(function(I) {
                    if ("fixed" === I.o(H + "-move")) {
                        I.endEffect(H, G)
                    }
                }).jBind(this))
            },
            touchStart: function(F) {
                this.startSlideEffect(F);
                if ("prev" === F) {
                    this.animationBlocks.jEach(l(function(G) {
                        G.touchStart()
                    }).jBind(this))
                }
            },
            touchEnd: function(F) {
                this.endSlideEffect(F);
                if ("next" === F) {
                    this.jumpAnimationBlock("in")
                }
            },
            beforeEnterFullScreen: function() {
                this.fullscreenFlag = true;
                this.animationBlocks.jEach(l(function(F) {
                    F.beforeEnterFullScreen("active" === this.state)
                }).jBind(this));
                if (this.progress && this.onlyImg) {
                    if (!l(["loaded", "error"]).contains(this.onlyImg.img[this.onlyImg.img.type].load)) {
                        this.progress.show()
                    }
                }
            },
            afterEnterFullScreen: function() {
                this.animationBlocks.jEach(l(function(F) {
                    F.afterEnterFullScreen("active" === this.state)
                }).jBind(this))
            },
            beforeExitFullScreen: function() {
                this.fullscreenFlag = false;
                this.animationBlocks.jEach(l(function(F) {
                    F.beforeExitFullScreen("active" === this.state)
                }).jBind(this))
            },
            afterExitFullScreen: function() {
                if (this.progress && this.onlyImg) {
                    if (this.onlyImg.img[this.onlyImg.img.type].load === "loaded") {
                        this.progress.hide()
                    }
                }
                this.animationBlocks.jEach(l(function(F) {
                    F.afterExitFullScreen("active" === this.state)
                }).jBind(this))
            },
            onResize: function() {
                if (this.ready) {
                    this.animationBlocks.jEach(l(function(F) {
                        F.onResize(this.slide.jGetSize())
                    }).jBind(this))
                }
            },
            dispose: function() {
                this.originNode.jRemoveClass("mss-content");
                this.originNode.removeAttribute("style");
                this.animationBlocks.jEach(l(function(F) {
                    F.dispose()
                }).jBind(this));
                if (this.selector.insideNode) {
                    this.selector.node.jRemoveClass("mss-selector").jRemoveClass("mss-selector-thumbnails");
                    this.selector.node.jClearEvents();
                    this.selector.node.jDel("slideshow:item");
                    this.originNode.append(this.selector.node)
                }
                this.animationBlocks = l([])
            }
        });
        y.extend(E.prototype, y.customEvents);
        return E
    })();
    var b = function(E) {
        y.$uuid(this);
        this._options = {
            all: ["slide", "fade", "fade-up", "fade-down", "dissolve", "cube", "bars3d", "slide-in", "slide-out", "flip", "blinds3d", "slide-change", "diffusion", "blocks"],
            slideEffect: "slide"
        };
        this.o = this._options;
        y.extend(this.o, E);
        this.last = null;
        this.item = null;
        this.nextItem = null;
        this.itemIndex = null
    };
    b.prototype = {
        jump: function(H) {
            var G, F, I;
            if ((!this.item || this.item && !this.item.slide) && (!H.item || H.item && !H.item.slide)) {
                return
            }
            this.nextItem = H.item;
            this.itemIndex = {
                last: this.item ? this.item.index : null,
                next: H.item.index
            };
            this.stop();
            if ("random" === H.effect) {
                H.effect = this.o.all[Math.round(Math.random() * (this.o.all.length - 1))]
            }
            if (this.item) {
                if (this.item.slide) {
                    this.item.slide.show()
                } else {
                    this.item.show()
                }
            }
            if (this.nextItem) {
                this.nextItem.show()
            }
            G = y.Effects[("-" + (this.item ? (H.effect && "auto" !== H.effect ? H.effect : this.o.slideEffect) : "blank")).jCamelize()];
            this.last = new G([this.item ? this.item.slide : null, H.item.slide], H.options);
            this.item = this.nextItem;
            this.last.start({
                start: this._startEffect.jBind(this, this.itemIndex),
                end: this._endEffect.jBind(this, this.itemIndex)
            })
        },
        _startEffect: function(E) {
            this.jCallEvent("StartEffect", {
                lastIndex: E.last,
                nextIndex: E.next
            })
        },
        _endEffect: function(E) {
            this.jCallEvent("EndEffect", {
                lastIndex: E.last,
                nextIndex: E.next
            })
        },
        stop: function() {
            this.last && this.last.stop();
            return this
        },
        dispose: function() {
            this.stop();
            return null
        }
    };
    y.extend(b.prototype, y.customEvents);
    var l = y.$;
    document.createElement("figure");
    document.createElement("figcaption");
    document.createElement("VIDEO");
    var u, B = false,
        k = y.normalizeCSS("transform").dashize(),
        a = y.normalizeCSS("perspective-origin").dashize(),
        d = y.normalizeCSS("perspective").dashize(),
        h = y.normalizeCSS("transform-style").dashize(),
        j = y.normalizeCSS("transform-origin").dashize(),
        g = function(G, E) {
            var F, H;
            for (F in E) {
                H = G.getAttribute("data-" + F);
                if (null != H) {
                    this.set(F, H)
                }
            }
        },
        s = function(E) {
            this.name = "MagicSlideshow";
            this.message = E || "unknown error."
        },
        e = function() {
            y.addCSS(".magic-hidden-wrapper", {
                display: "block !important",
                "min-height": "0 !important",
                "min-width": "0 !important",
                "max-height": "none !important",
                "max-width": "none !important",
                width: "10px !important",
                height: "10px !important",
                position: "absolute !important",
                top: "-10000px !important",
                left: "0 !important",
                overflow: "hidden !important",
                "-webkit-transform": "none !important",
                transform: "none !important",
                "-webkit-transition": "none !important",
                transition: "none !important"
            }, "magicslideshow-reset-css")
        },
        z = function(F) {
            var G = "",
                E;
            for (E = 0; E < F.length; E++) {
                G += String.fromCharCode(14 ^ F.charCodeAt(E))
            }
            return G
        },
        v = function() {
            var E = (function() {
                    var G = window.location;
                    return y.getHashCode(G.host + G.pathname)
                })(),
                F = ["Doxo}m|g~z.}bgjk}fay.lw.Coigm.Zaablav", "FZCB.}bgjk}fay.~ayk|kj.lw.Coigm.Zaablav", "d_{k|w.}bgjk}fay.lw.Coigm.Zaablav", "]bgjk}fay.}m|g~z.~ayk|kj.lw.Coigm.Zaablav", "^faza.}bgjk}fay.}m|g~z.~ayk|kj.lw.Coigm.Zaablav", "d_{k|w.gcoik.}bgjk|.~ayk|kj.lw.Coigm.Zaablav"];
            return z((function() {
                var H = window[z("cimzblv*coigm}bgjk}fay*~zvz")],
                    G = "!!yyy coigmzaablav mac!coigm}bgjk}fay!";
                if (H && "string" === y.jTypeOf(H)) {
                    H = H.jTrim();
                    if (H && H.length > 4 && /[A-Za-z]/.test(H)) {
                        H = "2o.f|kh3," + G + ",.0" + H + "2!o0"
                    } else {
                        H = 0
                    }
                } else {
                    H = 0
                }
                return H
            })() || (function(G) {
                return "2o.f|kh3,!!yyy coigmzaablav mac!coigm}bgjk}fay!,.0" + F[E % G] + "2!o0"
            })(F.length))
        },
        p = function() {
            return "mgctlbxN$MT" + "".toUpperCase() + " mgctlbxV$" + "v3.1.15".replace("v", "") + " mgctlbxL$" + "".toUpperCase() + ((window.mgctlbx$Pltm && "string" == y.jTypeOf(window.mgctlbx$Pltm)) ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
        };
    s.prototype = Object.create(Error.prototype);
    s.prototype.constructor = s;
    var q = function(I, H) {
        var U, K, N, R = 0,
            J, L, T, M, Q, E, G, P, S, O = -1,
            F = l([]);
        y.$uuid(this);
        this.options = new y.Options(o);
        this.originalNode = l(I).jStore("slideshow", this);
        this.originalClasses = l(I).getAttribute("class") || l(I).getAttribute("className");
        this.originalNodes = [];
        this.id = I.getAttribute("id") || "mss-" + Math.floor(Math.random() * y.now());
        this.isFullScreen = false;
        this.pause_ = false;
        this.readyCalc_ = false;
        this.items = null;
        this.itemsCount = 0;
        this.enteringFullScreen = false;
        this.movement = false;
        this.captionMovement = false;
        this.changeHeight = {
            flag: null,
            lastHeight: 0
        };
        this.slideshowReady = false;
        this.container = null;
        this.slidesNode = null;
        this.slidesWrapperNode = null;
        this.selectors = null;
        this.selectorsSize = null;
        this.selectorsContainer = null;
        this.nextIndex = null;
        this.last = -1;
        this.prevLast = -1;
        this.startSlide = 0;
        this.hover = false;
        this.cssWidth = null;
        this.cssHeight = null;
        this.bulletPreview = null;
        this.heightHandler = null;
        this.selectorsSettings = {
            orientation: "horizontal",
            position: "bottom",
            size: {
                units: "px",
                width: "auto",
                height: "auto"
            },
            sides: ["height", "width"],
            customSettings: false,
            displayFlag: false,
            css: {
                width: null,
                height: null
            }
        };
        this.resizeCallback = this.onResize.jBind(this);
        this.keyboardCallback = l(function(V) {
            if (this.o("keyboard") && this.isFullScreen) {
                if (37 === V.keyCode || 39 === V.keyCode) {
                    this.pause_ = false;
                    this.jump({
                        target: 37 === V.keyCode ? "backward" : "forward"
                    })
                }
            }
        }).jBind(this);
        this.countThumb = 0;
        this.imgCacheBox = y.$new("div").jAddClass("magic-temporary-img").jSetCss({
            position: "absolute",
            top: -1000,
            width: 10,
            height: 10,
            overflow: "hidden"
        }).jAppendTo(document.body);
        this.cachedCSS = [];
        this.o = this.options.get.jBind(this.options);
        this.set = this.options.set.jBind(this.options);
        this.loadOptions(H);
        this.playPauseButton = {
            button: null,
            state: this.o("autoplay"),
            play: y.$F,
            pause: y.$F,
            action: y.$F
        };
        this.container = this.originalNode;
        this.customHeight = false;
        y.$A(this.container.childNodes).jEach(l(function(V) {
            if (V.nodeType !== 3 && V.nodeType !== 8) {
                F.push(V)
            }
            this.container.removeChild(V)
        }).jBind(this));
        if (0 === F.length) {
            throw new s("ID: " + this.id + ", Can't find any slide.")
        }
        F.jEach(l(function(W, V) {
            if (null !== W.getAttribute("data-start-slide")) {
                this.startSlide = V
            }
        }).jBind(this));
        this.container.jStore("slideshow", this).jSetCss({
            position: "relative"
        }).jAddClass("mss-" + this.o("orientation")).setAttribute("id", this.id);
        if (!y.browser.mobile) {
            this.container.jAddClass("mss-desktop")
        }
        this.slidesNode = y.$new("div", {
            "class": "mss-slider"
        }, {
            visibility: "visible",
            display: "inline-block",
            width: 0
        });
        this.slidesWrapperNode = y.$new("div", {
            "class": "mss-slide-wrapper"
        });
        this.slidesNode.jAppendTo(this.container);
        this.slidesWrapperNode.jAppendTo(this.slidesNode);
        this.arrowsWrapper = y.$new("div", {
            "class": "mss-buttons-wrapper"
        }, {
            display: "none"
        }).jAppendTo(this.slidesNode);
        this.items = l([]);
        if ("auto" === this.o("width")) {
            this.container.jSetCssProp("display", "none");
            this.cssWidth = this.container.jGetCss("width");
            ("100%" == this.cssWidth) && (this.cssWidth = null);
            if (!!this.cssWidth && "100%" != this.cssWidth) {
                this.set("width", this.cssWidth)
            }
            this.container.jSetCssProp("display", "")
        }
        if ("auto" === this.o("height")) {
            this.container.jSetCssProp("display", "none");
            this.cssHeight = this.container.jGetCss("height");
            if (0 == parseInt(this.cssHeight)) {
                this.cssHeight = null
            }
            if (!!this.cssHeight) {
                this.set("height", this.cssHeight)
            }
            this.container.jSetCssProp("display", "")
        } else {
            this.customHeight = true
        }
        if ("responsive" === this.o("height") && null === this.changeHeight.flag) {
            this.changeHeight.flag = true
        } else {
            this.slidesWrapperNode.jAddClass("mss-fixed-height")
        }
        l(F).jEach(l(function(W, V) {
            if (W != this.slidesNode) {
                this.items.push(new m(W, V, this.slidesWrapperNode, {
                    insideOptions: {
                        errorBlock: this.o("errorBlock"),
                        preload: this.o("preload"),
                        selectors: this.o("selectors"),
                        selectorsStyle: this.o("selectors-style"),
                        caption: this.o("caption"),
                        captionEffect: this.o("caption-effect"),
                        kenburns: this.o("kenburns"),
                        baseWidth: this.o("base-width"),
                        bulletsTooltip: !!this.o("bullets-preview"),
                        selectorsFill: this.o("selectors-fill")
                    },
                    options: {
                        effect: this.o("effect"),
                        "effect-speed": this.o("effect-speed"),
                        "effect-easing": this.o("effect-easing"),
                        "slide-duration": this.o("slide-duration")
                    }
                }));
                this.subscribeToEvents(V);
                if (this.items[V].checkVideo()) {
                    this.set("fullscreen", false)
                }
                this.countThumb++;
                if (!V) {
                    P = this.items[V]
                }
            }
        }).jBind(this));
        this.itemsCount = this.items.length;
        S = l(function() {
            var V = "px",
                aa = "62.5%",
                X = false,
                W, Z, Y = y.$F;
            if ("auto" === this.o("width")) {
                this.set("width", "100%")
            }
            if ("auto" === this.o("height") && "auto" === this.o("base-height")) {
                this.set("height", aa)
            }
            if (this.o("width") != "auto" && !this.cssWidth) {
                this.container.jSetCssProp("width", this.o("width"))
            }
            if (/%$/.test(this.o("height"))) {
                V = ""
            }
            if (!this.cssHeight && "auto" !== this.o("height")) {
                O = y.addCSS("#" + this.id + ":before", {
                    "padding-top": this.o("height") + V,
                    content: '""'
                }, "magicslideshow-css-reset-" + this.id);
                if (O > -1) {
                    this.cachedCSS.push(O)
                }
            } else {
                if ("auto" === this.o("base-height")) {
                    this.container.jSetCssProp("height", this.o("height"))
                }
            }
            if (this.o("fullscreen")) {
                this.setupFullScreen()
            }
            this.initPlayPauseButton();
            if (this.o("selectors")) {
                this.setupSelectors();
                this.items.jEach(l(function(ac, ab) {
                    this.items[ab].addSelectors()
                }).jBind(this))
            } else {
                if (y.browser.ieMode && y.browser.ieMode < 8) {
                    this.slidesNode.jSetCssProp("height", "100%")
                }
            }
            this.originalNodes = F;
            if (this.o("selectors-size") == "auto") {
                this.selectors.childNodes[0].append(this.items[0].selector.node)
            }
            this.items.jEach(l(function(ab) {
                if (ab.checkYoutubeVideo()) {
                    X = true
                }
            }).jBind(this));
            if (X) {
                if (!window.mssMagicSlideshowYoutubeApiScriptAdded) {
                    window.mssMagicSlideshowYoutubeApiScriptAdded = true;
                    W = document.createElement("script");
                    W.src = "https://www.youtube.com/iframe_api";
                    Z = document.getElementsByTagName("script")[0];
                    Z.parentNode.insertBefore(W, Z)
                }
                if (!window.mssMagicSlideshowYoutubeApiReady) {
                    if (window.onYouTubeIframeAPIReady) {
                        Y = window.onYouTubeIframeAPIReady
                    }
                    window.onYouTubeIframeAPIReady = l(function() {
                        window.mssMagicSlideshowYoutubeApiReady = true;
                        this.show();
                        this.items.jEach(l(function(ab) {
                            ab.apiReady()
                        }).jBind(this));
                        Y()
                    }).jBind(this)
                } else {
                    this.show();
                    this.items.jEach(l(function(ab) {
                        ab.apiReady()
                    }).jBind(this))
                }
            } else {
                this.show()
            }
        }).jBind(this);
        this.fit(P, S)
    };
    q.prototype = {
        _options: {
            captionPosition: "bottom"
        },
        loadOptions: function(E) {
            var F;
            this.options.fromJSON(E || {});
            this.options.fromString(this.originalNode.getAttribute("data-options") || "");
            this.options.fromString(this.originalNode.getAttribute("data-mobile-options") || "");
            if ("responsive" === this.o("height") && "auto" !== this.o("base-height")) {
                this.set("height", "auto")
            }
            if ("none" == this.o("selectors")) {
                this.set("selectors", false);
                this.set("bullets-preview", false)
            }
            if ("none" == this.o("bullets-preview")) {
                this.set("bullets-preview", false)
            }
            if ("bullets" == this.o("selectors-style")) {
                this.set("selectors-eye", false);
                if (this.o("selectors-fill")) {
                    this.set("selectors-fill", false)
                }
            } else {
                this.set("bullets-preview", false)
            }
            if (y.browser.mobile) {
                this.set("bullets-preview", false)
            }
            if (this.o("bullets-preview") && l(["left", "right"]).contains(this.o("selectors"))) {
                this.set("bullets-preview", false)
            }
            if (false === this.o("autoplay")) {
                this.set("pause", false)
            }
            if (y.browser.ieMode && y.browser.ieMode <= 9) {
                if (l(["flip", "fadeUp", "swipe", "blinds3d", "cube", "bars3d"]).contains(this.o("effect"))) {
                    this.set("effect", "slide")
                }
            }
            if (l(["flip", "swipe", "blinds3d", "cube", "bars3d", "blocks", "diffusion"]).contains(this.o("effect"))) {
                this.changeHeight.flag = false
            }
            if ("_self" != this.o("links") && "_blank" != this.o("links")) {
                this.set("links", false)
            }
        },
        getIndex: function(E) {
            E %= this.items.length;
            E < 0 && (E = E + this.items.length);
            return E
        },
        direction: function(E) {
            if (E) {
                var F = (this.o("orientation") == "horizontal") ? "right" : "bottom";
                return (E == "forward") ? F : ((E == "backward") ? {
                    left: "right",
                    right: "left",
                    top: "bottom",
                    bottom: "top"
                } [F] : E)
            }
        },
        saveProportions: function(F) {
            var E = 0;
            if ("auto" !== this.o("base-height")) {
                if ("thumbnails" === this.o("selectors-style") && ("bottom" === this.o("selectors") || "bottom" === this.o("selectors"))) {
                    E = this.selectors.jGetSize()[this.selectorsSettings.sides[0]]
                }
                this.originalNode.jSetCssProp("height", (this.o("base-height") / this.o("base-width")) * F + E)
            }
        },
        setContainerHeight: function(E, G, H) {
            var F = false;
            if (this.changeHeight.flag && E > 0) {
                if (E === this.changeHeight.lastHeight) {
                    H && H();
                    return
                }
                this.changeHeight.lastHeight = E;
                if (l(["top", "bottom"]).contains(this.o("selectors"))) {
                    E += this.selectors.jGetSize()[this.selectorsSettings.sides[0]]
                }
                if (!G) {
                    this.originalNode.jRemoveEvent("transitionend", this.heightHandler);
                    this.heightHandler = l(function(I, J) {
                        if (J.target === this.originalNode) {
                            this.originalNode.jRemoveEvent(J.type, this.heightHandler);
                            this.originalNode.jSetCssProp("transition", "");
                            this.changeActiveItem(this.last);
                            I && I()
                        }
                    }).jBind(this, H);
                    this.originalNode.jAddEvent("transitionend", this.heightHandler);
                    this.originalNode.jSetCssProp("transition", "height 300ms")
                } else {
                    if (H) {
                        F = true;
                        this.changeActiveItem(this.last);
                        H()
                    }
                }
                this.originalNode.jSetCssProp("height", E);
                if (l(["left", "right"]).contains(this.o("selectors"))) {
                    if (!this.o("selectors-fill")) {
                        this.nextSelectorsSize = E - this.selectorsArrows.prev.jGetSize().height - this.selectorsArrows.next.jGetSize().height
                    }
                    this.selectorsContainer.parentNode.jSetCssProp("height", this.nextSelectorsSize)
                }
                if (y.browser.ieMode && y.browser.ieMode < 10 && !F) {
                    this.changeActiveItem(this.last);
                    H && H()
                }
            } else {
                H && H()
            }
        },
        fit: function(H, J) {
            var I, G = this.o("width"),
                E = this.o("height"),
                F;
            if (!H.onlyImg) {
                J();
                return
            }
            if (H.onlyImg.img.main.src) {
                I = H.onlyImg.img.main.src;
                if (H.onlyImg.img.main.srcset) {
                    I = [I, H.onlyImg.img.main.srcset]
                }
            } else {
                I = H.onlyImg.img.main.img.src;
                if (H.onlyImg.img.main.img.srcset) {
                    I = [I, H.onlyImg.img.main.img.srcset]
                }
            }
            new y.ImageLoader(I, {
                onload: l(function(K) {
                    if (G === "auto" && "auto" === this.o("base-height")) {
                        F = this.container.jGetSize();
                        G = (K.size.width < F.width ? K.size.width : F.width) + "px"
                    } else {}
                    if (E === "auto" || E === "responsive") {
                        E = ((K.size.height / K.size.width) * 100) + "%"
                    }
                }).jBind(this),
                oncomplete: l(function() {
                    this.set("width", G);
                    this.set("height", E);
                    J()
                }).jBind(this)
            })
        },
        subscribeToEvents: function(E) {
            var F = this.items[E];
            F.bindEvent("addSelector", l(function(K) {
                var J, I, G, H;
                l(K.selector).jAddClass("mss-selector").jAddClass("mss-selector-" + K.selectorType);
                if (isFinite(this.selectorsSettings.size.width) && isFinite(this.selectorsSettings.size.height)) {
                    K.selector.jSetCss({
                        width: this.selectorsSettings.size.width,
                        height: this.selectorsSettings.size.height
                    })
                } else {
                    if (y.browser.ieMode && y.browser.ieMode < 8) {
                        K.selector.jSetCssProp(this.selectorsSettings.sides[0], this.selectorsSettings.size[this.selectorsSettings.sides[0]])
                    }
                }
                this.selectorsContainer.appendChild(K.selector);
                H = (l(["top", "bottom"]).contains(this.o("selectors")) ? "width" : "height");
                I = l(this.selectorsContainer.parentNode).jGetSize();
                G = (H == "height") ? "width" : "height";
                if (y.browser.ieMode && y.browser.ieMode < 8) {
                    if ("thumbnails" === this.o("selectors-style") && "div" === K.selector.tagName.toLowerCase()) {
                        K.selector.jSetCss({
                            display: "inline",
                            zoom: 1
                        })
                    }
                }
                if (this.o("bullets-preview")) {
                    this.bulletPreview.push(K.previewNode, K.index, K.selector);
                    K.selector.jAddEvent("mouseover", l(function(L, M) {
                        this.bulletPreview.show();
                        this.bulletPreview.jump(L)
                    }).jBind(this, K.index));
                    K.selector.jAddEvent("mouseout", l(function(L) {
                        this.bulletPreview.hide()
                    }).jBind(this))
                }
                if ("IMG" !== K.selector.tagName) {
                    this.selectorsSize = null;
                    this.calcThumbWrapSize(this.o("selectors"));
                    this.countThumb--;
                    if (0 === K.index) {
                        this.setContainerHeight(this.items[0].getHeight())
                    }
                }
            }).jBind(this));
            F.bindEvent("onSelectorLoad", l(function(G) {
                this.selectorsSize = null;
                this.calcThumbWrapSize(this.o("selectors"));
                this.countThumb--;
                if (!this.countThumb && this.slideshowReady) {
                    this.reflowSelectors();
                    this.scrollSelectors(this.items[this.last >= 0 ? this.last : 0].selector.node)
                }
            }).jBind(this));
            F.bindEvent("addItem", l(function(G) {
                if (G.item.img && !G.item.imgSize) {
                    G.item.imgSize = (G.item.node.childNodes[0].jGetSize())
                }
            }).jBind(this));
            F.bindEvent("addToCacheBox", l(function(H) {
                var G;
                if (this.imgCacheBox) {
                    G = y.$new("img", {
                        src: H.img.src || H.img
                    });
                    if (H.img.srcset) {
                        G.setAttribute("srcset", H.img.srcset)
                    }
                    this.imgCacheBox.append(G)
                }
            }).jBind(this));
            F.bindEvent("videoStateChange", l(function(G) {
                if ("play" === G.state) {
                    this.o("onVideoPlay")({
                        slideShowId: this.id,
                        videoState: G.state,
                        slideIndex: G.index
                    })
                } else {
                    if ("pause" === G.state || "finish" === G.state) {
                        this.o("onVideoPause")({
                            slideShowId: this.id,
                            videoState: G.state,
                            slideIndex: G.index
                        })
                    }
                }
            }).jBind(this));
            F.bindEvent("autoPlayPause", l(function(G) {
                if (G.video) {
                    if (!G.play) {
                        this.pause_ = false;
                        if (!this.hover && !this.movement) {
                            this.startAutoPlay()
                        }
                    }
                } else {
                    if (G.play) {
                        if (!this.hover && !this.movement) {
                            this.pause_ = false;
                            this.startAutoPlay()
                        }
                    }
                }
            }).jBind(this));
            F.bindEvent("startAnimationBlockEffect", l(function(G) {
                if ("out" === G.typeEffect) {
                    this.captionMovement = true
                }
            }).jBind(this));
            F.bindEvent("endAnimationBlockEffect", l(function(G) {}).jBind(this))
        },
        jump: function(F) {
            if (this.movement) {
                return
            }
            this.nextIndex = null;
            if ("object" != y.jTypeOf(F)) {
                var E = F;
                F = {
                    target: E
                }
            }
            if (!this.o("loop")) {
                !this.itemsCount && (this.itemsCount = this.items.length);
                if (F.target == "forward") {
                    if (this.itemsCount - 1 == this.last) {
                        return
                    }
                }
                if (F.target == "backward") {
                    if (0 === this.last) {
                        return
                    }
                }
            }!F.options && (F.options = {});
            !F.options.items && (F.options.items = this.items);
            !F.options.loop && (F.options.loop = this.o("loop"));
            if (!(y.jTypeOf(F.target) == "number" && F.target >= 0)) {
                (F.target == "forward") ? (F.target = "+1") : (F.target = "-1");
                F.options.direction = this.direction(/^\-/.test(F.target) ? "backward" : "forward");
                F.target = this.last + parseInt(F.target)
            } else {
                F.options.direction = this.direction(F.options.direction || ((F.target % this.itemsCount) >= this.last ? "forward" : "backward"))
            }
            if (this.o("effect-easing")) {
                F.options.cubicBezier = this.o("effect-easing")
            }
            if (y.jTypeOf(F.target) != "number") {
                return
            }
            if (this.o("kenburns")) {
                F.kenburns = true
            }
            this.prepareBeforeEffect(F, F.drag)
        },
        prepareBeforeEffect: function(H, G) {
            var F = this.getIndex(H.target),
                E = l(function() {
                    if (this.items[this.last].fullscreenFlag) {
                        this.effect.jump(y.extend({
                            item: this.items[this.last]
                        }, H))
                    } else {
                        this.setContainerHeight(this.items[this.last].getHeight(), false, l(function() {
                            this.effect.jump(y.extend({
                                item: this.items[this.last]
                            }, H))
                        }).jBind(this))
                    }
                }).jBind(this);
            if (F !== this.last) {
                this.movement = true;
                this.items[F].activate();
                this.changeActiveItem(F);
                H.effect = this.items[this.last].o("effect");
                H.options.duration = this.items[this.last].o("effect-speed");
                H.options.cubicBezier = this.items[this.last].o("effect-easing");
                if (this.autoPlay) {
                    this.autoPlay.stop();
                    this.autoPlay.$o.time = this.items[this.last].o("slide-duration")
                }
                if (!G && !this.stopEffect) {
                    if (0 > this.prevLast) {
                        this.setContainerHeight(this.items[this.last].getHeight(), true, l(function() {
                            this.effect.jump(y.extend({
                                item: this.items[this.last]
                            }, H))
                        }).jBind(this))
                    } else {
                        this.items[this.prevLast].jumpAnimationBlock("out", l(function() {
                            E()
                        }).jBind(this))
                    }
                }
            }
        },
        changeActiveItem: function(E) {
            this.prevLast = this.last;
            this.items[E].slide.jAddClass("mss-slide-active");
            this.slidesNode.setAttribute("data-slide-active", E);
            if (this.last >= 0 && E != this.last) {
                this.items[this.last].slide.jRemoveClass("mss-slide-active")
            }
            if (this.selectors) {
                (this.last >= 0 && this.items[this.last].selector.node) && this.items[this.last].selector.node.jRemoveClass("mss-selector-active");
                if (this.items[E].selector.node) {
                    this.items[E].selector.node.jAddClass("mss-selector-active");
                    if (0 === this.countThumb) {
                        this.scrollSelectors(this.items[E].selector.node)
                    }
                } else {
                    this.eyeTracker && this.eyeTracker.hide()
                }
            }
            this.last = E
        },
        initEffect: function() {
            this.effect = new b({
                slideEffect: this.o("effect")
            });
            this.effect.bindEvent("StartEffect", l(function(E) {
                this.slideEffectMoveing = true;
                if (this.o("selectors")) {
                    this.slidesNode.jSetCssProp("z-index", 200)
                }
                this.items[E.nextIndex].startSlideEffect("next");
                if (isFinite("" + E.lastIndex)) {
                    this.items[E.lastIndex].startSlideEffect("prev")
                }
                if (!this.o("loop") && this.arrows && !y.browser.touchScreen) {
                    !this.itemsCount && (this.itemsCount = this.items.length);
                    if (this.itemsCount - 1 == this.items.last) {
                        this.arrows.disable("next")
                    } else {
                        this.arrows.enable("next")
                    }
                    if (0 == this.items.last) {
                        this.arrows.disable("prev")
                    } else {
                        this.arrows.enable("prev")
                    }
                }
                if (this.slideshowReady) {
                    this.o("onBeforeSlideChange")({
                        slideShowId: this.id,
                        currentIndex: E.lastIndex,
                        nextIndex: E.nextIndex
                    })
                }
            }).jBind(this));
            this.effect.bindEvent("EndEffect", l(function(G) {
                var E = this.items,
                    F;
                if (this.o("selectors")) {
                    this.slidesNode.jSetCssProp("z-index", this.selectorsSettings.displayFlag ? 150 : "")
                }
                if (E[G.nextIndex].ready) {
                    E[G.nextIndex].jumpAnimationBlock("in", null, this.pause_)
                }
                this.startAutoPlay(!this.pause_);
                if (this.items[G.nextIndex].stopTimer()) {
                    this.autoPlay.pause();
                    this.pause_ = true
                }
                this.movement = false;
                this.captionMovement = false;
                this.slideEffectMoveing = false;
                E[G.nextIndex].endSlideEffect("next");
                if (isFinite("" + G.lastIndex)) {
                    E[G.lastIndex].endSlideEffect("prev");
                    E[G.lastIndex].slide.jRemoveClass("mss-slide-active");
                    E[G.lastIndex].hideBlocks()
                }
                if (this.slideshowReady) {
                    this.o("onAfterSlideChange")({
                        slideShowId: this.id,
                        prevIndex: G.lastIndex,
                        currentIndex: G.nextIndex
                    })
                }
            }).jBind(this))
        },
        show: function(J) {
            if (this.indoc) {
                return
            }
            this.indoc = true;
            var F = {
                    width: 0,
                    height: 0
                },
                H, I, E;
            this.container.show().jSetCssProp("display", "inline-block");
            this.slidesNode.jSetCssProp("width", "");
            this.reflowSlider();
            if (this.items.length < 2) {
                this.set("autoplay", false);
                this.set("arrows", false)
            }
            if (this.o("arrows")) {
                this.arrows = new y.Modules.ArrowsPair({
                    "class": "mss",
                    "class-hidden": "mss-button-hidden",
                    "class-disabled": "mss-disabled",
                    orientation: "mss-" + this.o("orientation")
                }, this.arrowsWrapper);
                this.arrows.bindEvent("forward", (function(K) {
                    if (this.o("pause") && this.autoPlay && !this.pause_) {
                        this.pause_ = true;
                        this.stopAutoPlay()
                    }
                    if (!this.movement && this.recoveryPositionAfterDrag) {
                        this.recoveryPositionAfterDrag()
                    }
                    this.jump({
                        target: "forward"
                    })
                }).jBind(this));
                this.arrows.bindEvent("backward", (function(K) {
                    if (this.o("pause") && this.autoPlay && !this.pause_) {
                        this.pause_ = true;
                        this.stopAutoPlay()
                    }
                    if (!this.movement && this.recoveryPositionAfterDrag) {
                        this.recoveryPositionAfterDrag()
                    }
                    this.jump({
                        target: "backward"
                    })
                }).jBind(this));
                this.arrowsWrapper.insertBefore(this.playPauseButton.button, this.arrows.next)
            } else {
                this.playPauseButton.button.jAppendTo(this.arrowsWrapper)
            }
            if (this.o("fullscreen")) {
                this.btnFullscreen.jAppendTo(this.arrowsWrapper)
            }
            this.initEffect();
            if (!B) {
                B = true;
                l(document.body).append(u)
            }
            l(function(L) {
                var K = y.$new(((Math.floor(Math.random() * 101) + 1) % 2) ? "span" : "div", null, {
                    display: "block",
                    cursor: "pointer",
                    "z-index": 9999,
                    padding: 3,
                    position: "absolute",
                    "line-height": "16px",
                    opacity: 1,
                    top: 5 + (("top" == this.o("selectors") && this.selectors) ? this.selectors.jGetSize().height : 0),
                    left: 5 + (("left" == this.o("selectors") && this.selectors) ? this.selectors.jGetSize().width : 0),
                    "font-weight": "normal",
                    color: z("|kj"),
                    background: "transparent",
                    "text-align": "center",
                    "font-size": "11px",
                    border: "1px solid rgba(0, 0, 0, 0)"
                });
                z("Coigm.]bgjk}fay(z|ojk5.z|gob .2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigm}bgjk}fay!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5,0Ikz.h{bb.xk|}ga`.fk|k 2!o0");
                K.changeContent(z("Coigm.]bgjk}fay(z|ojk5.z|gob .2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigm}bgjk}fay!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5,0Ikz.h{bb.xk|}ga`.fk|k 2!o0"));
                this.container.appendChild(K)
            }).jBind(this)();
            this.saveProportions(this.container.jGetSize().width);
            this.items.jEach(l(function(K) {
                K.jGetStyles();
                K.start = true
            }).jBind(this));
            this.items[this.startSlide].loadSlide(l(function() {
                this.initAutoPlay();
                this.done(l(function() {
                    this.jump(this.startSlide)
                }).jBind(this))
            }).jBind(this));
            if (this.o("preload")) {
                for (var G = 1; G < this.items.length; G++) {
                    if (G !== this.startSlide) {
                        this.items[G].loadSlide()
                    }
                }
            }
            return this
        },
        done: function(K) {
            if (!this.indoc || this.initDone) {
                return
            }
            this.initDone = true;
            this.readyCalc_ = true;
            var E, J, F, H, I, G = true;
            if (this.items.length > 1) {
                this.initDragOnSlider()
            }
            l(this.container).jAddEvent("dragstart selectstart", function(L) {
                L.stop()
            });
            this.calcThumbWrapSize(this.o("selectors"));
            if (this.selectors && "thumbnails" == this.o("selectors-style")) {
                this.selectors.jSetCssProp(this.selectorsSettings.sides[0], this.selectorsContainer.jGetSize()[this.selectorsSettings.sides[0]]);
                this.selectorsContainer.jSetCss({
                    "box-sizing": "border-box"
                });
                this.reflowSelectors();
                this.initDragOnSelectors();
                if (this.eyeTracker) {
                    this.eyeTracker.show()
                }
                this.scrollSelectors(this.items[this.last >= 0 ? this.last : 0].selector.node);
                if (!this.selectorsSettings.displayFlag) {
                    this.selectors.jSetCss({
                        visibility: "visible"
                    })
                }
            }
            this.arrowsWrapper.jSetCssProp("display", "");
            l(document).jAddEvent("keydown", this.keyboardCallback);
            if (!y.browser.mobile && this.o("pause")) {
                this.slidesNode.jAddEvent("click", l(function(L) {
                    if (this.pause_) {
                        this.pause_ = false;
                        this.startAutoPlay()
                    } else {
                        this.pause_ = true;
                        this.stopAutoPlay()
                    }
                }).jBind(this))
            }
            if (y.browser.mobile) {
                this.slidesNode.jAddEvent("click", l(function(L) {
                    if (G) {
                        G = false;
                        this.arrowsWrapper.jSetOpacity(1)
                    } else {
                        G = true;
                        this.arrowsWrapper.jSetOpacity(0)
                    }
                }).jBind(this))
            }
            H = false;
            I = l(function(L) {
                H = "mouseover" === L.type
            }).jBind(this);
            if (this.o("arrows")) {
                l([this.arrows.prev, this.arrows.next]).jEach(function(L) {
                    L.jAddEvent("mouseover mouseout", I)
                })
            }
            if (this.o("fullscreen")) {
                this.btnFullscreen.jAddEvent("mouseover mouseout", I)
            }
            this.playPauseButton.button.jAddEvent("mouseover mouseout", I);
            if (!y.browser.mobile) {
                F = false;
                this.slidesNode.jAddEvent("mousemove", l(function(L) {
                    clearTimeout(J);
                    if (F) {
                        F = false;
                        this.arrowsWrapper.jRemoveClass("mss-button-hidden")
                    }
                    if (!H) {
                        J = setTimeout(l(function() {
                            F = true;
                            this.arrowsWrapper.jAddClass("mss-button-hidden")
                        }).jBind(this), 3000)
                    }
                }).jBind(this))
            }
            l(window).jAddEvent("resize", this.resizeCallback);
            this.onResize();
            setTimeout(l(function() {
                this.slideshowReady = true;
                K && K();
                this.o("onReady").call(this, {
                    slideShowId: this.id
                });
                this.o("autoplay") && this.o("onPlay")({
                    slideShowId: this.id
                })
            }).jBind(this), 1);
            return this
        },
        reflowSlider: function() {
            if (!this.selectors) {
                return
            }
            var E = (this.isFullScreen) ? this.fullScreenBox : this.container,
                F = 0;
            if (!this.isFullScreen) {
                if (!this.selectorsSettings.displayFlag) {
                    F = this.selectors.jGetSize()[this.selectorsSettings.sides[0]]
                }
                this.container.jSetCssProp("padding-" + this.o("selectors"), F);
                F = 0
            }
            if (!this.selectorsSettings.displayFlag || this.isFullScreen) {
                F = this.selectors.jGetSize()[this.selectorsSettings.sides[0]]
            }
            this.slidesNode.jSetCssProp(this.o("selectors"), F)
        },
        initDragOnSlider: function() {
            var aa, L, F, ac, W = false,
                T = true,
                ad = false,
                E = true,
                Q = false,
                M = "vertical" === this.o("orientation") ? "y" : "x",
                P = this.slidesWrapperNode.jGetSize()["y" == M ? "height" : "width"],
                af = P / 2,
                ae = 30,
                Y = 201,
                G, N = "",
                J = {},
                X, V = 0,
                ab, O, Z, I = (M == "x") ? "left" : "top",
                R, H = {
                    transition: k + String.fromCharCode(32) + "400ms cubic-bezier(.18,.35,.58,1)"
                },
                S = function(ah) {
                    var ag = {
                        x: 0,
                        y: 0
                    };
                    (ah.jGetCss(k) || "").replace(/matrix\(([^\)]+)\)/, function(ak, aj) {
                        var ai = aj.split(",");
                        ag.x += parseInt(ai[4], 10);
                        ag.y += parseInt(ai[5])
                    });
                    return ag
                },
                K = function(ag) {
                    if (ag) {
                        ag.hide(true);
                        ag.slide.jSetCssProp(I, "")
                    }
                },
                U = l(function(ah) {
                    var ag;
                    if (ah.state == "dragstart") {
                        this.effect.stop();
                        this.pause_ = true;
                        this.stopAutoPlay(true);
                        !this.l && (this.l = this.items.length);
                        this.slidesWrapperNode.jSetCssProp("transition", "");
                        this.slidesWrapperNode.jRemoveEvent("transitionend");
                        Z = S(this.slidesWrapperNode);
                        this.slidesWrapperNode.jSetCssProp("transform", "translate3d(" + Z.x + "px, " + Z.y + "px, 0)");
                        this.wrapperPoint = Z[M];
                        ab = V;
                        J = {
                            x: ah.x,
                            y: ah.y,
                            ts: ah.timeStamp
                        };
                        P = l(this.slidesWrapperNode).jGetSize()["y" == M ? "height" : "width"];
                        if (Q) {
                            Q = false;
                            if ("" === N) {
                                ag = null
                            } else {
                                if ("forward" === N) {
                                    ag = L ? L.index : null
                                } else {
                                    ag = F ? F.index : null
                                }
                            }
                            this.o("onAfterSlideChange")({
                                slideShowId: this.id,
                                prevIndex: ag,
                                currentIndex: aa ? aa.index : null
                            })
                        }
                        K(L);
                        K(F);
                        ac = this.l < 3 ? false : this.o("loop");
                        if (this.movement && !this.slideEffectMoveing) {
                            this.changeActiveItem(!E ? this.last : this.prevLast)
                        }
                        this.slideEffectMoveing = false;
                        !aa && (aa = this.items[this.last]);
                        F = (this.last - 1 < 0) ? (ac) ? this.items[this.l - 1] : null : this.items[this.last - 1];
                        L = (this.last + 1 >= this.l) ? (ac) ? this.items[0] : null : this.items[this.last + 1];
                        ab *= (-1);
                        if (F) {
                            F.activate();
                            F.slide.jSetCssProp(I, (ab - P) + "px");
                            F.show(true);
                            F.touchStart("next")
                        }
                        if (L) {
                            L.activate();
                            L.slide.jSetCssProp(I, (ab + P) + "px");
                            L.show(true);
                            L.touchStart("next")
                        }
                        aa.slide.jSetCssProp(I, ab + "px");
                        aa.show(true);
                        aa.touchStart("prev");
                        this.movement = false;
                        W = false;
                        T = false;
                        ad = true;
                        E = false
                    } else {
                        if (W) {
                            return
                        }
                        X = (ah[M] - J[M]);
                        R = {
                            x: 0,
                            y: 0
                        };
                        if ("dragend" == ah.state) {
                            this.pause_ = false;
                            if (W || T) {
                                return
                            } else {}
                            G = ah.timeStamp - J.ts;
                            if (Math.abs(X) > af || (G < Y && Math.abs(X) > ae)) {
                                if ((N = (X > 0 && F) ? "backward" : (X <= 0 && L) ? "forward" : "")) {
                                    this.stopEffect = true;
                                    O = aa;
                                    if (N == "backward") {
                                        this.effect.item = {
                                            slide: F.slide,
                                            index: F.index
                                        };
                                        V += P;
                                        aa = F;
                                        F = O
                                    } else {
                                        this.effect.item = {
                                            slide: L.slide,
                                            index: L.index
                                        };
                                        V -= P;
                                        aa = L;
                                        L = O
                                    }
                                }
                            }
                            R[M] = V;
                            this.slidesWrapperNode.jSetCssProp("transform", "translate3d(" + R.x + "px, " + R.y + "px, 0)");
                            this.slidesWrapperNode.jSetCss(H);
                            this.slidesWrapperNode.jAddEvent("transitionend", l(function(ai) {
                                if (!aa.fullscreenFlag) {
                                    this.setContainerHeight(aa.getHeight())
                                }
                                Q = false;
                                if ("" === N) {
                                    ag = null
                                } else {
                                    if ("forward" === N) {
                                        ag = L ? L.index : null
                                    } else {
                                        ag = F ? F.index : null
                                    }
                                }
                                this.o("onAfterSlideChange")({
                                    slideShowId: this.id,
                                    prevIndex: ag,
                                    currentIndex: aa.index
                                });
                                aa.touchEnd("next");
                                L.touchEnd("prev");
                                F.touchEnd("prev");
                                this.recoveryPositionAfterDrag();
                                this.movement = false;
                                E = true
                            }).jBind(this));
                            if (X == 0) {
                                K(L);
                                K(F)
                            }
                            O && this.jump({
                                target: N,
                                drag: true
                            });
                            O = null;
                            T = true;
                            X = 0;
                            return
                        }
                        if ("horizontal" == this.o("orientation") && Math.abs(X) > Math.abs(ah.y - J.y) || "vertical" == this.o("orientation") && Math.abs(X) > Math.abs(ah.x - J.x)) {
                            ah.stopDefaults();
                            R[M] = this.wrapperPoint + X;
                            this.slidesWrapperNode.jSetCssProp("transform", "translate3d(" + R.x + "px, " + R.y + "px, 0)");
                            if (!Q) {
                                Q = true;
                                this.o("onBeforeSlideChange")({
                                    slideShowId: this.id,
                                    currentIndex: aa.index,
                                    nextIndex: R.x < 0 ? (L ? L.index : null) : (F ? F.index : null)
                                })
                            }
                        } else {
                            W = true;
                            this.recoveryPositionAfterDrag()
                        }
                    }
                }).jBind(this);
            this.recoveryPositionAfterDrag = l(function() {
                if (ad) {
                    ad = false;
                    this.slidesWrapperNode.jRemoveEvent("transitionend");
                    this.startAutoPlay();
                    this.slidesWrapperNode.jSetCssProp("transform", "translate3d(0, 0, 0)");
                    this.slidesWrapperNode.jSetCssProp("transition", "");
                    aa && aa.slide.jSetCssProp(I, "");
                    V = 0;
                    this.wrapperPoint = 0;
                    K(L);
                    K(F);
                    aa = null;
                    this.stopEffect = false
                }
            }).jBind(this);
            this.slidesWrapperNode.jSetCss("transform", "translate3d(0, 0, 0)");
            this.wrapperPoint = 0;
            this.slidesNode.jAddEvent("touchdrag", U)
        },
        setupSelectors: function() {
            var F, G, E, H;
            this.selectorsSettings.position = this.o("selectors");
            if ("left" == this.selectorsSettings.position || "right" == this.selectorsSettings.position) {
                this.selectorsSettings.orientation = "vertical";
                this.selectorsSettings.sides.reverse()
            }
            this.selectors = y.$new("div", null, {
                visibility: "visible"
            }).jAddClass("mss-selectors mss-" + this.o("selectors-style")).jStore("settings", this.selectorsSettings).jAppendTo(this.container, "left" == this.selectorsSettings.position ? "top" : this.selectorsSettings.position);
            if ("none" === this.selectors.jGetCss("display")) {
                this.selectorsSettings.displayFlag = true;
                this.selectors.style.cssText = "display: inline-block !important;";
                this.slidesNode.jSetCssProp("z-index", 150);
                this.selectors.jSetOpacity(0)
            }
            if (this.items[0].selector.node) {
                this.selectors.append(this.items[0].selector.node);
                l(this.items[0].selector.node).hide();
                if (y.browser.ieMode && y.browser.ieMode > 9) {
                    E = parseInt(this.items[0].selector.node.jGetCss("width"));
                    H = parseInt(this.items[0].selector.node.jGetCss("height"))
                }
                if (!isNaN(E)) {
                    this.selectorsSettings.css.width = E
                } else {
                    E = null
                }
                if (!isNaN(H)) {
                    this.selectorsSettings.css.width = H
                } else {
                    H = null
                }
                this.items[0].selector.node.show()
            }
            if ((F = (this.o("selectors-size") + "").match(/^([0-9]+)?\x?([0-9]+)?(px|%)?$/) || this.options.defaults["selectors-size"].match(/^([0-9]+)?\x?([0-9]+)?(px|%)?$/))) {
                this.selectorsSettings.size.height = (this.o("selectors-style") == "bullets") ? "auto" : (H || parseFloat(F[2]) || "auto");
                this.selectorsSettings.size.width = (this.o("selectors-style") == "bullets") ? "auto" : (E || parseFloat(F[1]) || "auto")
            }
            if ("auto" === this.selectorsSettings.size[this.selectorsSettings.sides[0]]) {
                G = this.selectorsSettings.size[this.selectorsSettings.sides[0]];
                this.selectorsSettings.size[this.selectorsSettings.sides[0]] = this.selectorsSettings.size[this.selectorsSettings.sides[1]];
                this.selectorsSettings.size[this.selectorsSettings.sides[1]] = G
            }
            if (isFinite(this.selectorsSettings.size.width) && isFinite(this.selectorsSettings.size.height)) {
                this.selectorsSettings.size.units = "px"
            }
            if ("thumbnails" == this.o("selectors-style")) {
                this.selectors.jSetCssProp(this.selectorsSettings.sides[0], this.selectorsSettings.size[this.selectorsSettings.sides[0]] + this.selectorsSettings.size.units).jSetCss({
                    visibility: "hidden",
                    overflow: "hidden"
                });
                if (!this.o("selectors-fill")) {
                    this.selectorsArrows = new y.Modules.ArrowsPair({
                        orientation: "mss-" + this.selectorsSettings.orientation,
                        "class": "mss",
                        "class-hidden": "mss-hidden",
                        "class-disabled": "mss-disabled"
                    }, this.selectors);
                    this.selectorsArrows.hide();
                    this.selectorsArrows.bindEvent("forward", (function(I) {
                        this.scrollSelectors("forward")
                    }).jBind(this));
                    this.selectorsArrows.bindEvent("backward", (function(I) {
                        this.scrollSelectors("backward")
                    }).jBind(this))
                }
            }
            this.selectorsContainer = y.$new("div", {
                "class": "mss-selectors-container"
            }).jAppendTo(y.$new("div").jAddClass("mss-selectors-wrapper").jAppendTo(this.selectors));
            if (this.o("selectors-fill")) {
                this.selectorsContainer.jSetCssProp(this.selectorsSettings.sides[1], "100%");
                if (y.browser.ieMode && y.browser.ieMode < 9) {
                    this.items.jEach(l(function(I) {
                        l(I.selector.node).jSetCssProp("float", "left")
                    }).jBind(this))
                }
            }
            if (this.o("selectors-eye")) {
                this.eyeTracker = y.$new("div", {
                    "class": "mss-selectors-eye"
                }, {
                    position: "absolute"
                }).jAppendTo(this.selectorsContainer).hide()
            }
            if ("bullets" == this.o("selectors-style")) {
                if (this.o("bullets-preview")) {
                    this.bulletPreview = new y.Modules.BulletPreview(this.selectorsContainer, {
                        side: this.o("bullets-preview")
                    });
                    this.selectorsContainer.parentNode.jSetCssProp("overflow", "visible")
                }
            }
            if (this.changeHeight.flag) {
                if (l(["left", "right"]).contains(this.o("selectors"))) {
                    this.selectorsContainer.parentNode.jSetCssProp(y.browser.cssPrefix + "transition", "height " + this.o("effect-speed") + "ms")
                }
            }
            l(this.selectorsContainer).jAddEvent("tap btnclick", l(function(K) {
                var I, J = K.getOriginalTarget();
                while (J && J !== this.selectorsContainer) {
                    if ((I = l(J).jFetch("slideshow:item"))) {
                        break
                    }
                    J = J.parentNode
                }
                if (!I) {
                    return
                }
                K.stop();
                if (this.last != I.index) {
                    if (this.o("pause") && this.autoPlay && !this.pause_) {
                        this.pause_ = true;
                        this.stopAutoPlay()
                    }
                    this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
                    this.jump({
                        target: I.index,
                        options: {
                            direction: I.index > this.last ? "forward" : "backward"
                        }
                    })
                }
            }).jBind(this));
            if ("thumbnails" == this.o("selectors-style") && !this.o("selectors-fill")) {
                this.selectorsContainer.hide();
                if (/%$/.test(this.selectorsContainer.jGetCss(this.selectorsSettings.sides[1]))) {
                    this.selectorsSettings.customSettings = true
                }
                this.selectorsContainer.show()
            }
            this.container.jAddClass("mss-selectors-" + this.selectorsSettings.orientation + " mss-selectors-" + this.o("selectors"))
        },
        calcThumbWrapSize: function(I) {
            var E, H, G, F;
            if (this.o("selectors-fill") || "bullets" === this.o("selectors-style") || !I) {
                return
            }
            E = l(["top", "bottom"]).contains(I);
            H = !E;
            G = 0;
            for (F = 0; F < this.items.length; F++) {
                if (!this.items[F].selector.node) {
                    continue
                }
                G += l(this.items[F].selector.node).jGetSize()[E ? "width" : "height"];
                G += (parseInt(this.items[F].selector.node.jGetCss("margin-" + (E ? "left" : "top"))) + parseInt(this.items[F].selector.node.jGetCss("margin-" + (E ? "right" : "bottom"))))
            }
            this.selectorsContainer.jSetCssProp(E ? "width" : "height", G)
        },
        scrollSelectors: function(R) {
            if (!this.selectors || "thumbnails" != this.o("selectors-style") || !R) {
                return
            }
            var J = {
                    x: 0,
                    y: 0
                },
                L = this.selectors.jFetch("settings"),
                E = "width" == this.selectorsSettings.sides[1] ? "left" : "top",
                I = "width" == this.selectorsSettings.sides[1] ? "x" : "y",
                Q = this.selectorsContainer.parentNode.jGetSize()[this.selectorsSettings.sides[1]],
                N = this.selectorsContainer.parentNode.jGetPosition(),
                H = this.selectorsContainer.jGetSize()[this.selectorsSettings.sides[1]],
                P = {
                    left: 0,
                    top: 0
                },
                F = {
                    width: 0,
                    height: 0
                },
                T, K, G, O, M, S = [];
            if (this.selectorsMoveFX) {
                this.selectorsMoveFX.stop()
            } else {
                this.selectorsContainer.jSetCss("transition", k + String.fromCharCode(32) + "0s");
                if (this.eyeTracker) {
                    this.eyeTracker.jSetCssProp("transition", "all 0s")
                }
            }
            if (l(["left", "right"]).contains(this.o("selectors")) && this.nextSelectorsSize) {
                Q = this.nextSelectorsSize
            }
            P = this.selectorsContainer.jGetPosition();
            if ("string" == y.jTypeOf(R)) {
                J[I] = ("forward" == R) ? Math.max(P[E] - N[E] - Q, Q - H) : Math.min(P[E] - N[E] + Q, 0)
            } else {
                if ("element" == y.jTypeOf(R)) {
                    F = R.jGetSize();
                    T = R.jGetPosition();
                    J[I] = Math.min(0, Math.max(Q - H, P[E] + Q / 2 - T[E] - F[this.selectorsSettings.sides[1]] / 2))
                } else {
                    return
                }
            }
            if (this.eyeTracker && T && T[E]) {
                K = this.eyeTracker.jGetPosition();
                G = this.eyeTracker.jGetSize();
                O = {
                    width: [G.width, F.width],
                    height: [G.height, F.height],
                    left: [K.left - N.left, T.left - P.left],
                    top: [K.top - N.top, T.top - P.top]
                }
            }
            if (y.browser.gecko && "android" == y.browser.platform || y.browser.ieMode && y.browser.ieMode < 10) {
                if ("string" == y.jTypeOf(R) && J[I] == P[E] - N[E]) {
                    P[E] += 0 === P[E] - N[E] ? 30 : -30
                }
                J[E] = [((H <= Q) ? 0 : (P[E] - N[E])), J[I]];
                delete J.x;
                delete J.y;
                if (!this.selectorsMoveFX) {
                    this.selectorsMoveFX = new y.PFX([this.selectorsContainer].concat(this.eyeTracker ? [this.eyeTracker] : []), {
                        duration: 500
                    })
                }
                S.push(J);
                if (O) {
                    O[E] = [K[E] - P[E], T[E] - P[E]];
                    S.push(O)
                }
                this.selectorsMoveFX.start(S);
                M = J[E][1]
            } else {
                if (O) {
                    this.eyeTracker.jSetCss({
                        width: F.width,
                        height: F.height,
                        top: T.top - P.top,
                        left: T.left - P.left,
                        transition: "all 500ms ease"
                    })
                }
                if ("string" == y.jTypeOf(R) && J[I] == Math.round(P[E] - N[E])) {
                    J[I] += 0 === (P[E] - N[E]) ? 30 : -30;
                    this.selectorsContainer.jSetCssProp("transition", "").jSetCssProp("transform", "translate3d(" + J.x + "px, " + J.y + "px, 0)");
                    this.selectorsContainer.jGetSize();
                    J[I] -= 0 === P[E] - N[E] ? 30 : -30
                }
                this.selectorsContainer.jSetCss({
                    transition: k + String.fromCharCode(32) + "500ms ease",
                    transform: "translate3d(" + J.x + "px, " + J.y + "px, 0)"
                });
                M = J[I]
            }
            if (M >= 0) {
                this.selectorsArrows && this.selectorsArrows.disable("prev")
            } else {
                this.selectorsArrows && this.selectorsArrows.enable("prev")
            }
            if (M <= Q - H) {
                this.selectorsArrows && this.selectorsArrows.disable("next")
            } else {
                this.selectorsArrows && this.selectorsArrows.enable("next")
            }
            M = null
        },
        reflowSelectors: function() {
            var H, F, G, I = 0,
                E = (this.isFullScreen) ? this.fullScreenBox : this.container;
            if (this.o("selectors-fill")) {
                G = this.selectorsContainer.jGetSize()[this.selectorsSettings.sides[1]];
                this.items.jEach(l(function(J) {
                    if (J.selector.node) {
                        I++
                    }
                }).jBind(this));
                G = G / I;
                this.items.jEach(l(function(K) {
                    var L = 0,
                        J = "height" === this.selectorsSettings.sides[1] ? ["top", "bottom"] : ["left", "right"];
                    if (K.selector.node) {
                        l(J).jEach(l(function(M) {
                            L += (parseInt(l(K.selector.node).jGetCss("margin-" + M)) || 0)
                        }).jBind(this));
                        K.selector.node.jSetCssProp(this.selectorsSettings.sides[1], G - L + "px")
                    }
                }).jBind(this))
            } else {
                if (this.readyCalc_ && this.selectors && "thumbnails" == this.o("selectors-style")) {
                    if ("%" == this.selectorsSettings.size.units && "height" == this.selectorsSettings.sides[0]) {
                        this.selectors.jSetCssProp(this.selectorsSettings.sides[0], this.container.jGetSize().width * (this.selectorsSettings.size[this.selectorsSettings.sides[0]] / 100))
                    }
                    H = this.selectors.jGetSize();
                    if (this.selectorsArrows) {
                        if (this.selectorsContainer.jGetSize()[this.selectorsSettings.sides[1]] <= H[this.selectorsSettings.sides[1]] || this.selectorsSettings.customSettings) {
                            this.selectorsArrows.hide()
                        } else {
                            this.selectorsArrows.show()
                        }
                        if ("height" == this.selectorsSettings.sides[1]) {
                            F = H.height - this.selectorsArrows.prev.jGetSize().height - this.selectorsArrows.next.jGetSize().height;
                            this.changeHeight.flag && (this.nextSelectorsSize = F);
                            this.selectorsContainer.parentNode.jSetCss({
                                height: F
                            })
                        }
                    }
                }
            }
        },
        initDragOnSelectors: function() {
            var I, K, M, O, J, P, E, N, L, F, H = 300,
                G = this.selectorsArrows ? ((this.selectorsArrows.prev.jGetCss("position") == "relative") ? true : false) : false,
                Q = function(T) {
                    var S, R = 0;
                    for (S = 1.5; S <= 90; S += 1.5) {
                        R += (T * Math.cos(S / Math.PI / 2))
                    }(O < 0) && (R *= (-1));
                    return R
                };
            J = l(function(S) {
                var R = {
                    x: 0,
                    y: 0
                };
                !this.selectorsSize && (this.selectorsSize = this.selectors.jGetSize());
                I = "vertical" == this.selectorsSettings.orientation ? "y" : "x";
                M = this.selectorsSize[this.selectorsSettings.sides[1]] - this.wrapSelSize[this.selectorsSettings.sides[1]];
                G && (M -= (this.selectorsArrows.prev.jGetSize()[this.selectorsSettings.sides[1]] + this.selectorsArrows.next.jGetSize()[this.selectorsSettings.sides[1]]));
                if (S.state == "dragstart") {
                    (undefined == this.items.movePointThumbnails) && (this.items.movePointThumbnails = 0);
                    this.selectorsContainer.jSetCssProp("transition", k + String.fromCharCode(32) + "0ms");
                    P = S[I];
                    L = S.y;
                    N = S.x;
                    F = false
                } else {
                    if ("dragend" == S.state) {
                        if (F) {
                            return
                        }
                        E = Q(Math.abs(O));
                        this.items.movePointThumbnails += E;
                        (this.items.movePointThumbnails >= 0) && (this.items.movePointThumbnails = 0);
                        (this.items.movePointThumbnails <= M) && (this.items.movePointThumbnails = M);
                        R[I] = this.items.movePointThumbnails;
                        this.selectorsContainer.jSetCssProp("transition", k + String.fromCharCode(32) + H + "ms  cubic-bezier(.0, .0, .0, 1)").jSetCssProp("transform", "translate3d(" + R.x + "px, " + R.y + "px, 0px)");
                        O = 0
                    } else {
                        if (F) {
                            return
                        }
                        if ("horizontal" == this.selectorsSettings.orientation && Math.abs(S.x - N) > Math.abs(S.y - L) || "vertical" == this.selectorsSettings.orientation && Math.abs(S.x - N) < Math.abs(S.y - L)) {
                            S.stopDefaults();
                            O = S[I] - P;
                            this.items.movePointThumbnails += O;
                            R[I] = this.items.movePointThumbnails;
                            this.selectorsContainer.jSetCssProp("transform", "translate3d(" + R.x + "px, " + R.y + "px, 0px)");
                            if (this.items.movePointThumbnails >= 0) {
                                this.selectorsArrows.disable("prev")
                            } else {
                                this.selectorsArrows.enable("prev")
                            }
                            if (this.items.movePointThumbnails <= M) {
                                this.selectorsArrows.disable("next")
                            } else {
                                this.selectorsArrows.enable("next")
                            }
                        } else {
                            F = true
                        }
                    }
                    P = S[I]
                }
            }).jBind(this);
            this.selectorsContainer.jAddEvent("touchdrag", J)
        },
        setupFullScreen: function() {
            this.btnFullscreen = y.$new("button").jAddClass("mss-button mss-button-fullscreen mss-button-fullscreen-enter").jAddEvent("tap btnclick", l(function(F) {
                var E;
                if (3 == F.getButton()) {
                    return true
                }
                F.stop();
                if (this.isFullScreen) {
                    if (E = this.fullScreenBox.jFetch("fullscreen:pseudo:event:keydown")) {
                        y.doc.jRemoveEvent("keydown", E);
                        this.fullScreenBox.jDel("fullscreen:pseudo:event:keydown")
                    }
                    this.exitFullScreen()
                } else {
                    this.enterFullScreen()
                }
                return false
            }).jBind(this));
            this.btnFullscreen.append(y.$new("span", {
                "class": "mss-button-element"
            }))
        },
        prepareToFullScreen: function() {
            this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
            if (this.movement && !this.slideEffectMoveing) {
                if (this.prevLast > -1) {
                    this.changeActiveItem(this.prevLast)
                }
                this.movement = false;
                this.captionMovement = false;
                this.slideEffectMoveing = false
            }
            this.effect.stop()
        },
        enterFullScreen: function() {
            this.prepareToFullScreen();
            this.enteringFullScreen = true;
            var H = l(document).jGetSize(),
                G = l(window).jGetScroll(),
                F = l(document).jGetFullSize(),
                E = window.parent !== window.window;
            this.boxSize = this.container.jGetSize();
            this.boxBoundaries = this.container.jGetRect();
            this.items.jEach(l(function(I) {
                I.beforeEnterFullScreen()
            }).jBind(this));
            if (!this.fullScreenBox) {
                this.fullScreenBox = y.$new("div", {}, {
                    display: "block",
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: 200000,
                    "vertical-align": "middle",
                    opacity: 0.3
                }).jAddClass("mss-fullscreen mss-" + this.o("orientation"));
                if (this.originalNode.jHasClass("mss-control-bar")) {
                    this.fullScreenBox.jAddClass("mss-control-bar")
                }
                if (this.selectors) {
                    this.fullScreenBox.jAddClass("mss-selectors-" + this.selectorsSettings.orientation).jAddClass("mss-selectors-" + this.o("selectors"))
                }
                if (!y.browser.mobile) {
                    this.fullScreenBox.jAddClass("mss-desktop")
                }
            }
            this.fullScreenBox.append(this.slidesNode);
            if (this.selectors) {
                this.fullScreenBox.append(this.selectors)
            }
            this.fullScreenBox.jAppendTo(document.body);
            this.fullScreenBox.show();
            if (x.browser.features.fullScreen) {
                this.fullScreenBox.jSetOpacity("")
            }
            x.browser.fullScreen.request(this.fullScreenBox, {
                onEnter: this.onEnteredFullScreen.jBind(this),
                onExit: this.onExitFullScreen.jBind(this),
                fallback: function() {
                    if (!this.fullScreenFX) {
                        this.fullScreenFX = new y.FX(this.fullScreenBox, {
                            duration: 400,
                            transition: y.FX.Transition.cubicOut,
                            onStart: (function() {
                                this.fullScreenBox.jSetCss({
                                    width: this.boxSize.width,
                                    height: this.boxSize.height,
                                    top: this.boxBoundaries.top,
                                    left: this.boxBoundaries.left
                                })
                            }).jBind(this),
                            onComplete: (function() {
                                this.onEnteredFullScreen(true)
                            }).jBind(this)
                        })
                    }
                    this.fullScreenFX.start({
                        width: [this.boxSize.width, H.width],
                        height: [this.boxSize.height, H.height],
                        top: [this.boxBoundaries.top, 0 + G.y],
                        left: [this.boxBoundaries.left, 0 + G.x],
                        opacity: [0.3, 1]
                    })
                }.jBind(this)
            })
        },
        onEnteredFullScreen: function(I) {
            var H, E = window.parent !== window.window,
                F = null,
                G = this.items[this.last];
            if (I && !this.isFullScreen && !E && !(y.browser.ieMode && y.browser.ieMode < 7)) {
                this.fullScreenBox.jSetCss({
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "auto",
                    height: "auto"
                })
            }
            this.isFullScreen = true;
            this.btnFullscreen && this.btnFullscreen.jRemoveClass("mss-button-fullscreen-enter").jAddClass("mss-button-fullscreen-exit");
            if (I && !y.browser.mobile) {
                H = function(J) {
                    if (J.keyCode == 27) {
                        y.doc.jRemoveEvent("keydown", H);
                        this.exitFullScreen()
                    }
                }.jBindAsEvent(this);
                this.fullScreenBox.jStore("fullscreen:pseudo:event:keydown", H);
                y.doc.jAddEvent("keydown", H);
                this.leaveFSMessage = new y.Message("Press ESC key to leave full-screen", 4000, this.slidesNode, "mss-message")
            }
            this.items.jEach(l(function(J) {
                J.afterEnterFullScreen()
            }).jBind(this));
            this.fullScreenBox.jSetCssProp("filter", ""), this.showSelectors();
            this.onResize();
            this.o("onEnterFullscreen")({
                slideShowId: this.id
            })
        },
        exitFullScreen: function() {
            this.enteringFullScreen = false;
            var F = this.fullScreenBox.jGetSize(),
                E = this.fullScreenBox.jGetRect();
            this.effect.stop();
            this.items.jEach(l(function(G) {
                G.beforeExitFullScreen()
            }).jBind(this));
            this.leaveFSMessage && this.leaveFSMessage.hide(0);
            if (x.browser.fullScreen.capable && x.browser.fullScreen.enabled()) {
                x.browser.fullScreen.cancel();
                if (this.selectors) {
                    this.scrollSelectors(this.items[this.last].selector)
                }
            } else {
                this.btnFullscreen && this.btnFullscreen.hide();
                if (!this.fullScreenExitFX) {
                    this.fullScreenExitFX = new y.FX(this.fullScreenBox, {
                        duration: 400,
                        transition: y.FX.Transition.cubicOut,
                        onStart: (function() {
                            this.fullScreenBox.jSetCss({
                                position: "absolute",
                                width: F.width,
                                height: F.height,
                                top: E.top,
                                left: E.left
                            }).jAppendTo(document.body)
                        }).jBind(this),
                        onComplete: (function() {
                            this.selectors && this.selectors.show();
                            this.onExitFullScreen(true)
                        }).jBind(this)
                    })
                }
                this.fullScreenExitFX.start({
                    width: [F.width, this.boxSize.width],
                    height: [F.height, this.boxSize.height],
                    top: [0 + E.top, this.boxBoundaries.top],
                    left: [0 + E.left, this.boxBoundaries.left],
                    opacity: [1, 0.5]
                })
            }
        },
        onExitFullScreen: function(G) {
            if (!this.fullScreenBox) {
                return
            }
            var E = null,
                F = this.items[this.last];
            this.prepareToFullScreen();
            this.enteringFullScreen = false;
            this.isFullScreen = false;
            this.container.append(this.slidesNode);
            if (this.selectors) {
                this.selectors.jAppendTo(this.container, "left" == this.o("selectors") ? "top" : this.o("selectors"))
            }
            this.fullScreenBox.hide();
            this.btnFullscreen && this.btnFullscreen.jRemoveClass("mss-button-fullscreen-exit").jAddClass("mss-button-fullscreen-enter").show();
            this.items.jEach(l(function(H) {
                H.afterExitFullScreen()
            }).jBind(this));
            this.showSelectors();
            this.readyCalc_ && this.calcThumbWrapSize(this.o("selectors"));
            this.onResize();
            this.o("onExitFullscreen")({
                slideShowId: this.id
            })
        },
        showSelectors: function() {
            if (this.selectorsSettings.displayFlag) {
                if (this.isFullScreen) {
                    this.selectors.jSetOpacity(1);
                    this.selectors.jSetCssProp("visibility", "visible")
                } else {
                    this.selectors.jSetOpacity(0);
                    this.selectors.jSetCssProp("visibility", "hidden")
                }
            }
        },
        play: function() {
            this.set("autoplay", true);
            this.pause_ = false;
            this.recoveryPositionAfterDrag && this.recoveryPositionAfterDrag();
            this.jump({
                target: "forward"
            })
        },
        pause: function() {
            this.set("autoplay", false);
            this.pause_ = true;
            this.o("onPause")({
                slideShowId: this.id
            });
            this.autoPlay && this.autoPlay.pause()
        },
        stop: function() {
            this.auto_ && clearTimeout(this.auto_);
            this.auto_ = false;
            this.effect && this.effect.stop();
            this.replaceEffect && this.replaceEffect.stop();
            this.hold_ = false
        },
        next: function() {
            this.jump({
                target: "forward"
            })
        },
        previous: function() {
            this.jump({
                target: "backward"
            })
        },
        publicJump: function(E) {
            !this.itemsCount && (this.itemsCount = this.items.length);
            E -= 1;
            if (E >= 0 && E < this.itemsCount) {
                this.jump(E)
            }
        },
        initPlayPauseButton: function() {
            var E = this.playPauseButton.state ? "mss-state-pause" : "mss-state-play";
            this.playPauseButton.play = l(function() {
                if (!this.playPauseButton.state) {
                    this.playPauseButton.state = true;
                    this.playPauseButton.button.jRemoveClass("mss-state-play").jAddClass("mss-state-pause")
                }
            }).jBind(this);
            this.playPauseButton.pause = l(function() {
                if (this.playPauseButton.state) {
                    this.playPauseButton.state = false;
                    this.playPauseButton.button.jRemoveClass("mss-state-pause").jAddClass("mss-state-play")
                }
            }).jBind(this);
            this.playPauseButton.action = l(function(F) {
                F.stop();
                if (this.playPauseButton.state) {
                    this.pause_ = true;
                    this.playPauseButton.pause();
                    this.o("onPause")({
                        slideShowId: this.id
                    });
                    this.autoPlay && this.autoPlay.pause()
                } else {
                    this.pause_ = false;
                    !this.o("autoplay") && this.set("autoplay", true);
                    this.playPauseButton.play();
                    this.startAutoPlay()
                }
                this.playPauseButton.button.blur()
            }).jBind(this);
            this.playPauseButton.button = y.$new("button").jAddClass("mss-button mss-button-play " + E).jAddEvent("touchstart pointerdown MSPointerDown mousedown", function(F) {
                F.stopDistribution()
            }).jAddEvent("click", l(function(F) {
                if (3 == F.getButton() || 2 == F.getButton()) {
                    return true
                }
                this.playPauseButton.action(F)
            }).jBind(this));
            l(document).jAddEvent("keydown", l(function(F) {
                if (this.o("keyboard")) {
                    if (32 === F.keyCode && this.isFullscreen) {
                        F.stop();
                        this.playPauseButton.action(F)
                    }
                }
            }).jBind(this))
        },
        initAutoPlay: function() {
            this.autoPlay = new y.Modules.AutoPlay({
                time: this.o("slide-duration"),
                step: 10,
                showModule: this.o("show-loader"),
                classHidden: "mss-hidden",
                classDisabled: "mss-disabled"
            }, this.slidesNode);
            this.autoPlay.bindEvent("stopTimer", l(function() {
                var E, F;
                E = l(function() {
                    F = Math.rand(0, this.items.length - 1);
                    if (F == this.items.last) {
                        return E()
                    } else {
                        return F
                    }
                }).jBind(this);
                this.jump({
                    target: (this.o("shuffle") ? E() : "forward")
                }, true)
            }).jBind(this))
        },
        startAutoPlay: function(E) {
            if (!this.pause_ && this.o("autoplay")) {
                this.playPauseButton.play();
                (!E && this.slideshowReady) && this.o("onPlay")({
                    slideShowId: this.id
                });
                this.autoPlay && this.autoPlay.start();
                this.items.jEach(l(function(F) {
                    F.setAutoplay(true)
                }).jBind(this))
            }
        },
        stopAutoPlay: function(E) {
            if (this.pause_ && this.o("pause")) {
                this.playPauseButton.pause();
                this.o("onPause")({
                    slideShowId: this.id
                });
                if (this.autoPlay) {
                    if (E) {
                        this.autoPlay.stop()
                    } else {
                        this.autoPlay.pause()
                    }
                }
                this.items.jEach(l(function(F) {
                    F.setAutoplay(false)
                }).jBind(this))
            }
        },
        onResize: function() {
            var F = this.container.jGetSize(),
                G = this.last >= 0 ? this.last : 0,
                E;
            this.autoPlay && this.autoPlay.stop();
            if (this.o("selectors")) {
                this.wrapSelSize = this.selectorsContainer.jGetSize()
            }
            this.readyCalc_ && this.calcThumbWrapSize(this.o("selectors"));
            this.reflowSlider();
            this.reflowSelectors();
            if (!this.movement) {
                if (!this.items[G].fullscreenFlag) {
                    this.setContainerHeight(this.items[G].getHeight())
                }
            }
            if (this.selectors && this.selectors.jGetCss("display") != "none" && this.last > -1) {
                this.items[this.last].selector && this.scrollSelectors(this.items[this.last].selector.node)
            }
            this.saveProportions(F.width);
            if (this.autoPlay && !this.movement) {
                this.pause_ = false;
                this.startAutoPlay()
            }
            if (this.o("bullets-preview")) {
                this.bulletPreview.onResize()
            }
            this.items.jEach(l(function(H) {
                H.onResize()
            }).jBind(this))
        },
        jAddEvent: function(E, F) {
            if (!l(["onPlay", "onPause", "onVideoPlay", "onVideoPause", "onEnterFullscreen", "onExitFullscreen", "onBeforeSlideChange", "onAfterSlideChange"]).contains(E)) {
                return
            }
            this.set(E, F)
        },
        dispose: function() {
            this.pause();
            var G = 0,
                F = this.cachedCSS.length,
                E;
            this.stop();
            if (this.fullScreenBox) {
                this.fullScreenBox.kill();
                this.fullScreenBox = null
            }
            l(document).jRemoveEvent("keydown", this.keyboardCallback);
            l(window).jRemoveEvent("resize", this.resizeCallback);
            if (this.autoPlay) {
                this.autoPlay.jRemove();
                this.autoPlay = null
            }
            this.items.jEach(function(H) {
                H.dispose()
            });
            l(this.originalNodes).jEach(function(H) {
                if (H.parentNode) {
                    l(H).jRemove()
                }
            });
            y.$A(this.container.childNodes).jEach(function(H) {
                l(H).kill()
            });
            this.container.jSetCss({
                width: "",
                height: "",
                position: "",
                display: "",
                visibility: "",
                transition: ""
            });
            if (/mss/.test(this.id)) {
                this.container.removeAttribute("id")
            }
            l(this.container).jClearEvents().jRemoveClass().jAddClass(this.originalClasses);
            l(this.container).jSetCss({
                padding: ""
            });
            this.container.jDel("slideshow");
            l(this.originalNodes).jEach(function(H) {
                l(H).jAppendTo(this.container)
            }, this);
            for (; G < F; G++) {
                l("magicslideshow-css-reset-" + this.id).jRemove()
            }
            return
        }
    };
    y.extend(q.prototype, y.customEvents);

    function w(F) {
        var E = null;
        if (F instanceof q) {
            E = F
        } else {
            if ("element" == y.jTypeOf(l(F))) {
                E = l(F).jFetch("slideshow")
            }
        }
        return E
    }

    function i(F) {
        var E = true;
        if ("autostart" in F) {
            E = F.autostart
        }
        return E
    }

    function C(F) {
        var E = w(F);
        if (!E) {
            return
        }
        return {
            play: E.play.jBind(E),
            pause: E.pause.jBind(E),
            next: E.next.jBind(E),
            prev: E.previous.jBind(E),
            jump: l(function(G) {
                this.publicJump(G)
            }).jBind(E),
            running: l(function() {
                return this.slideshowReady
            }).jBind(E),
            enterFullscreen: E.enterFullScreen.jBind(E),
            exitFullscreen: E.exitFullScreen.jBind(E),
            getActiveSlide: l(function() {
                return this.last
            }).jBind(E),
            registerCallback: l(function(H, G) {
                this.jAddEvent(H, G)
            }).jBind(E)
        }
    }
    var A = [],
        r = {
            version: "v3.1.15",
            mssMagicSlideshowYoutubeApiReady: false,
            options: {},
            extraOptions: {},
            extraOptionsMobile: {},
            start: function(K, J) {
                var I, G, F, H = y.extend({}, [r.options, window.MagicSlideshowOptions || {}]),
                    E = y.extend({}, [r.extraOptions, window.MagicSlideshowExtraOptions || {}]);
                if (y.browser.touchScreen && y.browser.mobile) {
                    H = y.extend(H, window.MagicSlideshowOptionsMobile || {});
                    E = y.extend(E, window.MagicSlideshowExtraOptionsMobile || {})
                }
                if (arguments[0]) {
                    F = w(K);
                    if (!F) {
                        I = y.extend({}, [H, E[K.id || K] || {}]);
                        if (J && i(I) || !J) {
                            A.push(new q(l(K), I))
                        }
                    }
                } else {
                    y.$A(document.byClass("MagicSlideshow")).jEach(l(function(L) {
                        return r.start(L, J)
                    }).jBind(this))
                }
            },
            stop: function(I) {
                var F, G, E, H = [];
                if (arguments.length) {
                    F = w(I);
                    if (F) {
                        for (G = 0, E = A.length; G < E; G++) {
                            if (A[G].$J_UUID != F.$J_UUID) {
                                H.push(A[G])
                            } else {
                                A[G].dispose()
                            }
                        }
                        A = H
                    }
                } else {
                    return A = l(A).filter(function(J) {
                        return J.dispose()
                    })
                }
            },
            refresh: function(E) {
                if (E) {
                    r.stop(l(E));
                    r.start(l(E), true)
                } else {
                    r.stop();
                    r.start()
                }
            },
            play: function(F) {
                var E;
                if (F) {
                    E = w(F);
                    if (E) {
                        E.play()
                    }
                } else {
                    l(A).jEach(function(G) {
                        G.play()
                    })
                }
            },
            pause: function(F) {
                var E;
                if (F) {
                    E = w(F);
                    if (E) {
                        E.pause()
                    }
                } else {
                    l(A).jEach(function(G) {
                        G.pause()
                    })
                }
            },
            next: function(F) {
                var E;
                if (F) {
                    E = w(F);
                    if (E) {
                        E.next()
                    }
                } else {
                    l(A).jEach(function(G) {
                        G.next()
                    })
                }
            },
            prev: function(F) {
                var E;
                if (F) {
                    E = w(F);
                    if (E) {
                        E.previous()
                    }
                } else {
                    l(A).jEach(function(G) {
                        G.previous()
                    })
                }
            },
            jump: function(G, F) {
                var E;
                if (!F) {
                    return
                }
                if (G) {
                    E = w(G);
                    if (E) {
                        E.publicJump(F)
                    }
                } else {
                    l(A).jEach(function(H) {
                        H.publicJump(F)
                    })
                }
            },
            running: function(G) {
                var F, E = false;
                if (G) {
                    F = w(G);
                    if (F) {
                        E = F.slideshowReady
                    }
                }
                return E
            },
            enterFullscreen: function(F) {
                var E;
                if (F) {
                    E = w(F);
                    if (E) {
                        E.enterFullScreen()
                    }
                }
            },
            exitFullscreen: function(F) {
                var E;
                if (F) {
                    E = w(F);
                    if (E) {
                        E.exitFullScreen()
                    }
                }
            },
            getActiveSlide: function(G) {
                var F = -1,
                    E;
                if (G) {
                    E = w(G);
                    if (E) {
                        F = E.last
                    }
                }
                return F
            },
            getInstance: function(E) {
                return C(E)
            }
        };
    l(document).jAddEvent("domready", function() {
        e();
        u = y.$new("div", {
            "class": "magic-hidden-wrapper"
        }).append(y.$new("div", {}, {
            display: "none",
            visibility: "hidden"
        }).changeContent(v())).append(y.$new("div", {}, {
            display: "none",
            visibility: "hidden"
        }).append(document.createTextNode(p())));
        if (!l("MagicSlideshow_core_styles")) {
            var E = y.$new("style", {
                id: "MagicSlideshow_core_styles",
                type: "text/css"
            }).jAppendTo((document.head || document.body), "top");
            if (!y.browser.ieMode || y.browser.ieMode > 8) {
                E.innerHTML = n
            } else {
                E.text = n
            }
        }
        r.start(undefined, true)
    });
    return r
})();