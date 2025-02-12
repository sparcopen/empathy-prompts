function getHash() {
    return window.location.hash.replace(/^\#/, "")
}! function(t) {
    "function" == typeof define && define.amd ? define(["shoestring"], t) : "object" == typeof module && module.exports ? module.exports = t() : t()
}(function() {
    function t(e, n) {
        var i, r = typeof e,
            s = [];
        if (!e) return new h(s);
        if (e.call) return t.ready(e);
        if (e.constructor === h && !n) return e;
        if ("string" === r && 0 === e.indexOf("<")) {
            var c = a.createElement("div");
            return c.innerHTML = e, t(c).children().each(function() {
                c.removeChild(this)
            })
        }
        return "string" === r ? n ? t(n).find(e) : (i = a.querySelectorAll(e), new h(i, e)) : "[object Array]" === Object.prototype.toString.call(r) || o.NodeList && e instanceof o.NodeList ? new h(e, e) : e.constructor === Array ? new h(e, e) : new h([e], e)
    }

    function e(t, e) {
        var n = !1;
        return t.each(function() {
            for (var t = 0; t < e.length;) this === e[t] && (n = !0), t++
        }), n
    }

    function n(t, e) {
        t.shoestringData || (t.shoestringData = {}), t.shoestringData.events || (t.shoestringData.events = {}), t.shoestringData.loop || (t.shoestringData.loop = {}), t.shoestringData.events[e] || (t.shoestringData.events[e] = [])
    }

    function i(t, e, n) {
        var i = {};
        i.isCustomEvent = n.isCustomEvent, i.callback = n.callfunc, i.originalCallback = n.originalCallback, i.namespace = n.namespace, t.shoestringData.events[e].push(i), n.customEventLoop && (t.shoestringData.loop[e] = n.customEventLoop)
    }

    function r(t, e, n) {
        var i = this.shoestringData.events[t];
        if (i && i.length) {
            var r, s, o = [];
            for (r = 0, s = i.length; r < s; r++) e && e !== i[r].namespace || void 0 !== n && n !== i[r].originalCallback || (this.removeEventListener(t, i[r].callback, !1), o.push(r));
            for (r = 0, s = o.length; r < s; r++) this.shoestringData.events[t].splice(r, 1)
        }
    }

    function s(t, e) {
        for (var n in this.shoestringData.events) r.call(this, n, t, e)
    }
    var o = "undefined" != typeof window ? window : this,
        a = o.document,
        h = function(e, n) {
            this.length = 0, this.selector = n, t.merge(this, e)
        };
    h.prototype.reverse = [].reverse, t.fn = h.prototype, t.Shoestring = h, t.extend = function(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }, t.merge = function(t, e) {
        var n, i, r;
        for (n = +e.length, i = 0, r = t.length; i < n; i++) t[r++] = e[i];
        return t.length = r, t
    }, o.shoestring = t;
    var c = function() {
        try {
            return new XMLHttpRequest
        } catch (t) {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    };
    t.ajax = function(e, n) {
        var i, r, s = "",
            o = c();
        if (i = t.extend({}, t.ajax.settings), n && t.extend(i, n), e || (e = i.url), o && e) {
            if (i.data)
                for (r in i.data) i.data.hasOwnProperty(r) && ("" !== s && (s += "&"), s += encodeURIComponent(r) + "=" + encodeURIComponent(i.data[r]));
            if ("GET" === i.method && s && (e += "?" + s), o.open(i.method, e, i.async), o.setRequestHeader) {
                o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "POST" === i.method && s && o.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                for (r in i.headers) i.headers.hasOwnProperty(r) && o.setRequestHeader(r, i.headers[r])
            }
            return o.onreadystatechange = function() {
                if (4 === o.readyState) {
                    var t = (o.responseText || "").replace(/^\s+|\s+$/g, "");
                    if (0 === o.status.toString().indexOf("0")) return i.cancel(t, o.status, o);
                    if (o.status.toString().match(/^(4|5)/) && RegExp.$1) return i.error(t, o.status, o);
                    if (i.success) return i.success(t, o.status, o)
                }
            }, 4 === o.readyState ? o : ("POST" === i.method && s ? o.send(s) : o.send(), o)
        }
    }, t.ajax.settings = {
        success: function() {},
        error: function() {},
        cancel: function() {},
        method: "GET",
        async: !0,
        data: null,
        headers: {}
    }, t.get = function(e, n) {
        return t.ajax(e, {
            success: n
        })
    }, t.fn.load = function(e, n) {
        var i = this,
            r = arguments,
            s = function(e) {
                i.each(function() {
                    t(this).html(e)
                }), n && n.apply(i, r)
            };
        return t.ajax(e, {
            success: s
        }), this
    }, t.post = function(e, n, i) {
        return t.ajax(e, {
            data: n,
            method: "POST",
            success: i
        })
    }, t.fn.each = function(e) {
        return t.each(this, e)
    }, t.each = function(t, e) {
        for (var n, i = 0, r = t.length; i < r && (n = e.call(t[i], i, t[i]), n !== !1); i++);
        return t
    }, t.inArray = function(t, e) {
        for (var n = -1, i = 0, r = e.length; i < r; i++) e.hasOwnProperty(i) && e[i] === t && (n = i);
        return n
    }, t.ready = function(t) {
        return u && t ? t.call(a) : t ? f.push(t) : l(), [a]
    }, t.fn.ready = function(e) {
        return t.ready(e), this
    };
    var u = !1,
        f = [],
        l = function() {
            if (!u) {
                for (; f.length;) f.shift().call(a);
                u = !0
            }
        };
    (a.attachEvent ? "complete" === a.readyState : "loading" !== a.readyState) ? l(): (a.addEventListener("DOMContentLoaded", l, !1), a.addEventListener("readystatechange", l, !1), o.addEventListener("load", l, !1)), t.fn.is = function(n) {
            var i, r, s = !1,
                o = this;
            return "string" != typeof n ? (r = n.length && n[0] ? n : [n], e(this, r)) : (i = this.parent(), i.length || (i = t(a)), i.each(function(t, i) {
                var r;
                r = i.querySelectorAll(n), s = e(o, r)
            }), s)
        }, t.fn.data = function(t, e) {
            return void 0 === t ? this[0] ? this[0].shoestringData || {} : void 0 : void 0 !== e ? this.each(function() {
                this.shoestringData || (this.shoestringData = {}), this.shoestringData[t] = e
            }) : this[0] && this[0].shoestringData ? this[0].shoestringData[t] : void 0
        }, t.fn.removeData = function(t) {
            return this.each(function() {
                void 0 !== t && this.shoestringData ? (this.shoestringData[t] = void 0, delete this.shoestringData[t]) : this[0].shoestringData = {}
            })
        }, o.$ = t, t.fn.addClass = function(t) {
            var e = t.replace(/^\s+|\s+$/g, "").split(" ");
            return this.each(function() {
                for (var t = 0, n = e.length; t < n; t++) void 0 === this.className || "" !== this.className && this.className.match(new RegExp("(^|\\s)" + e[t] + "($|\\s)")) || (this.className += " " + e[t])
            })
        }, t.fn.add = function(e) {
            var n = [];
            return this.each(function() {
                n.push(this)
            }), t(e).each(function() {
                n.push(this)
            }), t(n)
        }, t.fn.after = function(e) {
            return "string" != typeof e && void 0 === e.nodeType || (e = t(e)), e.length > 1 && (e = e.reverse()), this.each(function(t) {
                for (var n = 0, i = e.length; n < i; n++) {
                    var r = t > 0 ? e[n].cloneNode(!0) : e[n];
                    this.parentNode.insertBefore(r, this.nextSibling)
                }
            })
        }, t.fn.append = function(e) {
            return "string" != typeof e && void 0 === e.nodeType || (e = t(e)), this.each(function(t) {
                for (var n = 0, i = e.length; n < i; n++) this.appendChild(t > 0 ? e[n].cloneNode(!0) : e[n])
            })
        }, t.fn.appendTo = function(e) {
            return this.each(function() {
                t(e).append(this)
            })
        }, t.fn.attr = function(t, e) {
            var n = "string" == typeof t;
            return void 0 === e && n ? this[0] ? this[0].getAttribute(t) : void 0 : this.each(function() {
                if (n) this.setAttribute(t, e);
                else
                    for (var i in t) t.hasOwnProperty(i) && this.setAttribute(i, t[i])
            })
        }, t.fn.before = function(e) {
            return "string" != typeof e && void 0 === e.nodeType || (e = t(e)), this.each(function(t) {
                for (var n = 0, i = e.length; n < i; n++) this.parentNode.insertBefore(t > 0 ? e[n].cloneNode(!0) : e[n], this)
            })
        }, t.fn.children = function() {
            var e, n, i = [];
            return this.each(function() {
                for (e = this.children, n = -1; n++ < e.length - 1;) t.inArray(e[n], i) === -1 && i.push(e[n])
            }), t(i)
        }, t.fn.clone = function() {
            var e = [];
            return this.each(function() {
                e.push(this.cloneNode(!0))
            }), t(e)
        }, t.fn.closest = function(e) {
            var n = [];
            return e ? (this.each(function() {
                var i, r = t(i = this);
                if (r.is(e)) return void n.push(this);
                for (; i.parentElement;) {
                    if (t(i.parentElement).is(e)) {
                        n.push(i.parentElement);
                        break
                    }
                    i = i.parentElement
                }
            }), t(n)) : t(n)
        }, t.cssExceptions = {
            "float": ["cssFloat"]
        },
        function() {
            function e(t) {
                return t.replace(/\-([A-Za-z])/g, function(t, e) {
                    return e.toUpperCase()
                })
            }

            function n(t, e) {
                return o.getComputedStyle(t, null).getPropertyValue(e)
            }
            var i = t.cssExceptions,
                r = ["", "-webkit-", "-ms-", "-moz-", "-o-", "-khtml-"];
            t._getStyle = function(t, s) {
                var o, a, h, c;
                if (i[s])
                    for (h = 0, c = i[s].length; h < c; h++)
                        if (a = n(t, i[s][h])) return a;
                for (h = 0, c = r.length; h < c; h++)
                    if (o = e(r[h] + s), a = n(t, o), o !== s && (a = a || n(t, s)), r[h] && (a = a || n(t, r[h] + s)), a) return a
            }
        }(),
        function() {
            function e(t) {
                return t.replace(/\-([A-Za-z])/g, function(t, e) {
                    return e.toUpperCase()
                })
            }
            var n = t.cssExceptions;
            t._setStyle = function(t, i, r) {
                var s = e(i);
                if (t.style[i] = r, s !== i && (t.style[s] = r), n[i])
                    for (var o = 0, a = n[i].length; o < a; o++) t.style[n[i][o]] = r
            }
        }(), t.fn.css = function(e, n) {
            if (this[0]) return "object" == typeof e ? this.each(function() {
                for (var n in e) e.hasOwnProperty(n) && t._setStyle(this, n, e[n])
            }) : void 0 !== n ? this.each(function() {
                t._setStyle(this, e, n)
            }) : t._getStyle(this[0], e)
        }, t.fn.eq = function(e) {
            return t(this[e] ? this[e] : [])
        }, t.fn.filter = function(e) {
            var n = [];
            return this.each(function(i) {
                var r;
                if ("function" == typeof e) e.call(this, i) !== !1 && n.push(this);
                else {
                    if (this.parentNode) r = t(e, this.parentNode);
                    else {
                        var s = t(a.createDocumentFragment());
                        s[0].appendChild(this), r = t(e, s)
                    }
                    t.inArray(this, r) > -1 && n.push(this)
                }
            }), t(n)
        }, t.fn.find = function(e) {
            var n, i = [];
            return this.each(function() {
                n = this.querySelectorAll(e);
                for (var t = 0, r = n.length; t < r; t++) i = i.concat(n[t])
            }), t(i)
        }, t.fn.first = function() {
            return this.eq(0)
        }, t.fn.get = function(t) {
            if (void 0 === t) {
                for (var e = [], n = 0; n < this.length; n++) e.push(this[n]);
                return e
            }
            return this[t]
        }, t._dimension = function(t, e, n) {
            var i;
            return void 0 === n ? (i = e.replace(/^[a-z]/, function(t) {
                return t.toUpperCase()
            }), t[0]["offset" + i]) : (n = "string" == typeof n ? n : n + "px", t.each(function() {
                this.style[e] = n
            }))
        }, t.fn.height = function(e) {
            return t._dimension(this, "height", e)
        };
    var d = function(t) {
        if ("string" == typeof t || "number" == typeof t) return this.each(function() {
            this.innerHTML = "" + t
        });
        var e = "";
        if ("undefined" != typeof t.length)
            for (var n = 0, i = t.length; n < i; n++) e += t[n].outerHTML;
        else e = t.outerHTML;
        return this.each(function() {
            this.innerHTML = e
        })
    };
    t.fn.html = function(t) {
            if ("undefined" != typeof t) return d.call(this, t);
            var e = "";
            return this.each(function() {
                e += this.innerHTML
            }), e
        },
        function() {
            function e(t, e) {
                var n, i, r;
                for (n = i = 0; n < t.length; n++) {
                    if (r = t.item ? t.item(n) : t[n], e(r)) return i;
                    1 === r.nodeType && i++
                }
                return -1
            }
            t.fn.index = function(n) {
                var i, r;
                return i = this, void 0 === n ? (r = (this[0] && this[0].parentNode || a.documentElement).childNodes, e(r, function(t) {
                    return i[0] === t
                })) : e(i, function(e) {
                    return e === t(n, e.parentNode)[0]
                })
            }
        }(), t.fn.insertAfter = function(e) {
            return this.each(function() {
                t(e).after(this)
            })
        }, t.fn.insertBefore = function(e) {
            return this.each(function() {
                t(e).before(this)
            })
        }, t.fn.last = function() {
            return this.eq(this.length - 1)
        }, t.fn.next = function() {
            var e = [];
            return this.each(function() {
                var n, i, r;
                n = t(this.parentNode)[0].childNodes;
                for (var s = 0; s < n.length; s++) {
                    if (i = n.item(s), r && 1 === i.nodeType) {
                        e.push(i);
                        break
                    }
                    i === this && (r = !0)
                }
            }), t(e)
        }, t.fn.not = function(e) {
            var n = [];
            return this.each(function() {
                var i = t(e, this.parentNode);
                t.inArray(this, i) === -1 && n.push(this)
            }), t(n)
        }, t.fn.offset = function() {
            return {
                top: this[0].offsetTop,
                left: this[0].offsetLeft
            }
        }, t.fn.parent = function() {
            var e, n = [];
            return this.each(function() {
                e = this === a.documentElement ? a : this.parentNode, e && 11 !== e.nodeType && n.push(e)
            }), t(n)
        }, t.fn.parents = function(e) {
            var n = [];
            return this.each(function() {
                for (var i, r = this; r.parentElement && !i;) r = r.parentElement, e ? r === t(e)[0] && (i = !0, t.inArray(r, n) === -1 && n.push(r)) : t.inArray(r, n) === -1 && n.push(r)
            }), t(n)
        }, t.fn.prepend = function(e) {
            return "string" != typeof e && void 0 === e.nodeType || (e = t(e)), this.each(function(t) {
                for (var n = 0, i = e.length; n < i; n++) {
                    var r = t > 0 ? e[n].cloneNode(!0) : e[n];
                    this.firstChild ? this.insertBefore(r, this.firstChild) : this.appendChild(r)
                }
            })
        }, t.fn.prependTo = function(e) {
            return this.each(function() {
                t(e).prepend(this)
            })
        }, t.fn.prev = function() {
            var e = [];
            return this.each(function() {
                var n, i, r;
                n = t(this.parentNode)[0].childNodes;
                for (var s = n.length - 1; s >= 0; s--) {
                    if (i = n.item(s), r && 1 === i.nodeType) {
                        e.push(i);
                        break
                    }
                    i === this && (r = !0)
                }
            }), t(e)
        }, t.fn.prevAll = function() {
            var e = [];
            return this.each(function() {
                for (var n = t(this).prev(); n.length;) e.push(n[0]), n = n.prev()
            }), t(e)
        }, t.propFix = {
            "class": "className",
            contenteditable: "contentEditable",
            "for": "htmlFor",
            readonly: "readOnly",
            tabindex: "tabIndex"
        }, t.fn.prop = function(e, n) {
            if (this[0]) return e = t.propFix[e] || e, void 0 !== n ? this.each(function() {
                this[e] = n
            }) : this[0][e]
        }, t.fn.removeAttr = function(t) {
            return this.each(function() {
                this.removeAttribute(t)
            })
        }, t.fn.removeClass = function(t) {
            var e = t.replace(/^\s+|\s+$/g, "").split(" ");
            return this.each(function() {
                for (var t, n, i = 0, r = e.length; i < r; i++) void 0 !== this.className && (n = new RegExp("(^|\\s)" + e[i] + "($|\\s)", "gmi"), t = this.className.replace(n, " "), this.className = t.replace(/^\s+|\s+$/g, ""))
            })
        }, t.fn.remove = function() {
            return this.each(function() {
                this.parentNode && this.parentNode.removeChild(this)
            })
        }, t.fn.removeProp = function(e) {
            var n = t.propFix[e] || e;
            return this.each(function() {
                this[n] = void 0, delete this[n]
            })
        }, t.fn.replaceWith = function(e) {
            "string" == typeof e && (e = t(e));
            var n = [];
            return e.length > 1 && (e = e.reverse()), this.each(function(t) {
                var i, r = this.cloneNode(!0);
                if (n.push(r), this.parentNode)
                    if (1 === e.length) i = t > 0 ? e[0].cloneNode(!0) : e[0], this.parentNode.replaceChild(i, this);
                    else {
                        for (var s = 0, o = e.length; s < o; s++) i = t > 0 ? e[s].cloneNode(!0) : e[s], this.parentNode.insertBefore(i, this.nextSibling);
                        this.parentNode.removeChild(this)
                    }
            }), t(n)
        }, t.inputTypes = ["text", "hidden", "password", "color", "date", "datetime", "email", "month", "number", "range", "search", "tel", "time", "url", "week"], t.inputTypeTest = new RegExp(t.inputTypes.join("|")), t.fn.serialize = function() {
            var e = {};
            return t("input, select", this).each(function() {
                var n = this.type,
                    i = this.name,
                    r = this.value;
                t.inputTypeTest.test(n) || ("checkbox" === n || "radio" === n) && this.checked ? e[i] = r : "SELECT" === this.nodeName && (e[i] = this.options[this.selectedIndex].nodeValue)
            }), e
        }, t.fn.siblings = function() {
            if (!this.length) return t([]);
            var e = [],
                n = this[0].parentNode.firstChild;
            do 1 === n.nodeType && n !== this[0] && e.push(n), n = n.nextSibling; while (n);
            return t(e)
        };
    var p = function(t) {
        var e, n = "",
            i = 0,
            r = t.nodeType;
        if (r) {
            if (1 === r || 9 === r || 11 === r) {
                if ("string" == typeof t.textContent) return t.textContent;
                for (t = t.firstChild; t; t = t.nextSibling) n += p(t)
            } else if (3 === r || 4 === r) return t.nodeValue
        } else
            for (; e = t[i++];) n += p(e);
        return n
    };
    return t.fn.text = function() {
        return p(this)
    }, t.fn.val = function(e) {
        var n;
        return void 0 !== e ? this.each(function() {
            if ("SELECT" === this.tagName) {
                var n, i, r, s = this.options,
                    o = [],
                    a = s.length;
                for (o[0] = e; a--;) i = s[a], (i.selected = t.inArray(i.value, o) >= 0) && (n = !0, r = a);
                n ? this.selectedIndex = r : this.selectedIndex = -1
            } else this.value = e
        }) : (n = this[0], "SELECT" === n.tagName ? n.selectedIndex < 0 ? "" : n.options[n.selectedIndex].value : n.value)
    }, t.fn.width = function(e) {
        return t._dimension(this, "width", e)
    }, t.fn.wrapInner = function(e) {
        return this.each(function() {
            var n = this.innerHTML;
            this.innerHTML = "", t(this).append(t(e).html(n))
        })
    }, t.fn.bind = function(t, e, r) {
        function s(t, n, i) {
            var s;
            if (!t._namespace || t._namespace === n) {
                t.data = e, t.namespace = t._namespace;
                var o = function() {
                    return !0
                };
                t.isDefaultPrevented = function() {
                    return !1
                };
                var a = t.preventDefault,
                    h = function() {
                        return a ? function() {
                            t.isDefaultPrevented = o, a.call(t)
                        } : function() {
                            t.isDefaultPrevented = o, t.returnValue = !1
                        }
                    };
                return t.target = i || t.target || t.srcElement, t.preventDefault = h(), t.stopPropagation = t.stopPropagation || function() {
                    t.cancelBubble = !0
                }, s = r.apply(this, [t].concat(t._args)), s === !1 && (t.preventDefault(), t.stopPropagation()), s
            }
        }
        "function" == typeof e && (r = e, e = null);
        var o = t.split(" ");
        return this.each(function() {
            for (var t, e, a, h = this, c = 0, u = o.length; c < u; c++) {
                var f = o[c].split("."),
                    l = f[0],
                    d = f.length > 0 ? f[1] : null;
                t = function(t) {
                    return h.ssEventTrigger && (t._namespace = h.ssEventTrigger._namespace, t._args = h.ssEventTrigger._args, h.ssEventTrigger = null), s.call(h, t, d)
                }, e = null, a = null, n(this, l), this.addEventListener(l, t, !1), i(this, l, {
                    callfunc: e || t,
                    isCustomEvent: !!e,
                    customEventLoop: a,
                    originalCallback: r,
                    namespace: d
                })
            }
        })
    }, t.fn.on = t.fn.bind, t.fn.unbind = function(t, e) {
        var n = t ? t.split(" ") : [];
        return this.each(function() {
            if (this.shoestringData && this.shoestringData.events)
                if (n.length)
                    for (var t, i, o, a = 0, h = n.length; a < h; a++) t = n[a].split("."), i = t[0], o = t.length > 0 ? t[1] : null, i ? r.call(this, i, o, e) : s.call(this, o, e);
                else s.call(this)
        })
    }, t.fn.off = t.fn.unbind, t.fn.one = function(e, n) {
        var i = e.split(" ");
        return this.each(function() {
            for (var e, r = {}, s = t(this), o = 0, a = i.length; o < a; o++) e = i[o], r[e] = function(e) {
                var i = t(this);
                for (var s in r) i.unbind(s, r[s]);
                return n.apply(this, [e].concat(e._args))
            }, s.bind(e, r[e])
        })
    }, t.fn.triggerHandler = function(t, e) {
        var n, i = t.split(" ")[0],
            r = this[0];
        if (a.createEvent && r.shoestringData && r.shoestringData.events && r.shoestringData.events[i]) {
            var s = r.shoestringData.events[i];
            for (var o in s) s.hasOwnProperty(o) && (t = a.createEvent("Event"), t.initEvent(i, !0, !0), t._args = e, e.unshift(t), n = s[o].originalCallback.apply(t.target, e))
        }
        return n
    }, t.fn.trigger = function(t, e) {
        var n = t.split(" ");
        return this.each(function() {
            for (var t, i, r, s = 0, o = n.length; s < o; s++) {
                if (t = n[s].split("."), i = t[0], r = t.length > 0 ? t[1] : null, "click" === i && "INPUT" === this.tagName && "checkbox" === this.type && this.click) return this.click(), !1;
                if (a.createEvent) {
                    var h = a.createEvent("Event");
                    h.initEvent(i, !0, !0), h._args = e, h._namespace = r, this.dispatchEvent(h)
                }
            }
        })
    }, t
});
var Konami = function(t) {
        var e = {
            addEvent: function(t, e, n, i) {
                t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && (t["e" + e + n] = n, t[e + n] = function() {
                    t["e" + e + n](window.event, i)
                }, t.attachEvent("on" + e, t[e + n]))
            },
            input: "",
            pattern: "38384040373937396665",
            load: function(t) {
                this.addEvent(document, "keydown", function(n, i) {
                    if (i && (e = i), e.input += n ? n.keyCode : event.keyCode, e.input.length > e.pattern.length && (e.input = e.input.substr(e.input.length - e.pattern.length)), e.input == e.pattern) return e.code(t), e.input = "", n.preventDefault(), !1
                }, this), this.iphone.load(t)
            },
            code: function(t) {
                window.location = t
            },
            iphone: {
                start_x: 0,
                start_y: 0,
                stop_x: 0,
                stop_y: 0,
                tap: !1,
                capture: !1,
                orig_keys: "",
                keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
                code: function(t) {
                    e.code(t)
                },
                load: function(t) {
                    this.orig_keys = this.keys, e.addEvent(document, "touchmove", function(t) {
                        if (1 == t.touches.length && 1 == e.iphone.capture) {
                            var n = t.touches[0];
                            e.iphone.stop_x = n.pageX, e.iphone.stop_y = n.pageY, e.iphone.tap = !1, e.iphone.capture = !1, e.iphone.check_direction()
                        }
                    }), e.addEvent(document, "touchend", function(n) {
                        1 == e.iphone.tap && e.iphone.check_direction(t)
                    }, !1), e.addEvent(document, "touchstart", function(t) {
                        e.iphone.start_x = t.changedTouches[0].pageX, e.iphone.start_y = t.changedTouches[0].pageY, e.iphone.tap = !0, e.iphone.capture = !0
                    })
                },
                check_direction: function(t) {
                    x_magnitude = Math.abs(this.start_x - this.stop_x), y_magnitude = Math.abs(this.start_y - this.stop_y), x = this.start_x - this.stop_x < 0 ? "RIGHT" : "LEFT", y = this.start_y - this.stop_y < 0 ? "DOWN" : "UP", result = x_magnitude > y_magnitude ? x : y, result = 1 == this.tap ? "TAP" : result, result == this.keys[0] && (this.keys = this.keys.slice(1, this.keys.length)), 0 == this.keys.length && (this.keys = this.orig_keys, this.code(t))
                }
            }
        };
        return "string" == typeof t && e.load(t), "function" == typeof t && (e.code = t, e.load()), e
    },
    requestedPageId = getHash();
$.get("./content.json", function(t) {
    function e() {
        var e = getHash();
        _.each(n, function(t) {
            $("#" + t).prop("hidden", !0)
        }), $("title").html("Open For Whom: " + _.get(t, e + ".condition", "")), $("#" + e).prop("hidden", !1), $("body").attr("class", "t-" + e), $("#title-" + e).attr("tabindex", "0").get(0).focus()
    }
    t = JSON.parse(t);
    var n = _.shuffle(_.keys(t)),
        i = n.indexOf(requestedPageId);
    window.addEventListener("hashchange", e), window.addEventListener("load", e), requestedPageId && i >= 0 ? n = _.union(_.pullAt(n, i), n) : "about" !== requestedPageId && (window.location.href = "#" + n[0]), $("#show-another").on("click", function(t) {
        var e = getHash(),
            i = n.indexOf(e);
        window.location.href = "#" + _.get(n, i + 1, n[0])
    })
}), $("#share").on("click", function(t) {
    window.prompt("Tweet at #OpenForWhom or copy this URL and paste it into the sharing site of your choice:", window.location)
}), Konami(function() {
    $("[hidden]").removeProp("hidden"), $("body").removeAttr("class"), $("body").addClass("t-konami"), $("#nav").remove()
});
