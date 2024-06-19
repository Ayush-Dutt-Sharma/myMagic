(() => {
  var e = { 256: () => {} },
    t = {};
  function r(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var o = (t[n] = { exports: {} });
    return e[n](o, o.exports, r), o.exports;
  }
  (() => {
    "use strict";
    var e, t;
    /*! https://mths.be/codepointat v0.2.0 by @mathias */
    String.prototype.codePointAt ||
      ((e = (function () {
        try {
          var e = {},
            t = Object.defineProperty,
            r = t(e, e, e) && t;
        } catch (e) {}
        return r;
      })()),
      (t = function (e) {
        if (null == this) throw TypeError();
        var t = String(this),
          r = t.length,
          n = e ? Number(e) : 0;
        if ((n != n && (n = 0), !(n < 0 || n >= r))) {
          var a,
            o = t.charCodeAt(n);
          return o >= 55296 &&
            o <= 56319 &&
            r > n + 1 &&
            (a = t.charCodeAt(n + 1)) >= 56320 &&
            a <= 57343
            ? 1024 * (o - 55296) + a - 56320 + 65536
            : o;
        }
      }),
      e
        ? e(String.prototype, "codePointAt", {
            value: t,
            configurable: !0,
            writable: !0,
          })
        : (String.prototype.codePointAt = t));
    var n = 0,
      a = -3;
    function o() {
      (this.table = new Uint16Array(16)), (this.trans = new Uint16Array(288));
    }
    function s(e, t) {
      (this.source = e),
        (this.sourceIndex = 0),
        (this.tag = 0),
        (this.bitcount = 0),
        (this.dest = t),
        (this.destLen = 0),
        (this.ltree = new o()),
        (this.dtree = new o());
    }
    var i = new o(),
      u = new o(),
      l = new Uint8Array(30),
      p = new Uint16Array(30),
      c = new Uint8Array(30),
      h = new Uint16Array(30),
      f = new Uint8Array([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ]),
      d = new o(),
      g = new Uint8Array(320);
    function v(e, t, r, n) {
      var a, o;
      for (a = 0; a < r; ++a) e[a] = 0;
      for (a = 0; a < 30 - r; ++a) e[a + r] = (a / r) | 0;
      for (o = n, a = 0; a < 30; ++a) (t[a] = o), (o += 1 << e[a]);
    }
    var m = new Uint16Array(16);
    function y(e, t, r, n) {
      var a, o;
      for (a = 0; a < 16; ++a) e.table[a] = 0;
      for (a = 0; a < n; ++a) e.table[t[r + a]]++;
      for (e.table[0] = 0, o = 0, a = 0; a < 16; ++a)
        (m[a] = o), (o += e.table[a]);
      for (a = 0; a < n; ++a) t[r + a] && (e.trans[m[t[r + a]]++] = a);
    }
    function b(e) {
      e.bitcount-- || ((e.tag = e.source[e.sourceIndex++]), (e.bitcount = 7));
      var t = 1 & e.tag;
      return (e.tag >>>= 1), t;
    }
    function x(e, t, r) {
      if (!t) return r;
      for (; e.bitcount < 24; )
        (e.tag |= e.source[e.sourceIndex++] << e.bitcount), (e.bitcount += 8);
      var n = e.tag & (65535 >>> (16 - t));
      return (e.tag >>>= t), (e.bitcount -= t), n + r;
    }
    function S(e, t) {
      for (; e.bitcount < 24; )
        (e.tag |= e.source[e.sourceIndex++] << e.bitcount), (e.bitcount += 8);
      var r = 0,
        n = 0,
        a = 0,
        o = e.tag;
      do {
        (n = 2 * n + (1 & o)),
          (o >>>= 1),
          ++a,
          (r += t.table[a]),
          (n -= t.table[a]);
      } while (n >= 0);
      return (e.tag = o), (e.bitcount -= a), t.trans[r + n];
    }
    function T(e, t, r) {
      var n, a, o, s, i, u;
      for (n = x(e, 5, 257), a = x(e, 5, 1), o = x(e, 4, 4), s = 0; s < 19; ++s)
        g[s] = 0;
      for (s = 0; s < o; ++s) {
        var l = x(e, 3, 0);
        g[f[s]] = l;
      }
      for (y(d, g, 0, 19), i = 0; i < n + a; ) {
        var p = S(e, d);
        switch (p) {
          case 16:
            var c = g[i - 1];
            for (u = x(e, 2, 3); u; --u) g[i++] = c;
            break;
          case 17:
            for (u = x(e, 3, 3); u; --u) g[i++] = 0;
            break;
          case 18:
            for (u = x(e, 7, 11); u; --u) g[i++] = 0;
            break;
          default:
            g[i++] = p;
        }
      }
      y(t, g, 0, n), y(r, g, n, a);
    }
    function U(e, t, r) {
      for (;;) {
        var a,
          o,
          s,
          i,
          u = S(e, t);
        if (256 === u) return n;
        if (u < 256) e.dest[e.destLen++] = u;
        else
          for (
            a = x(e, l[(u -= 257)], p[u]),
              o = S(e, r),
              i = s = e.destLen - x(e, c[o], h[o]);
            i < s + a;
            ++i
          )
            e.dest[e.destLen++] = e.dest[i];
      }
    }
    function k(e) {
      for (var t, r; e.bitcount > 8; ) e.sourceIndex--, (e.bitcount -= 8);
      if (
        (t =
          256 * (t = e.source[e.sourceIndex + 1]) + e.source[e.sourceIndex]) !==
        (65535 &
          ~(256 * e.source[e.sourceIndex + 3] + e.source[e.sourceIndex + 2]))
      )
        return a;
      for (e.sourceIndex += 4, r = t; r; --r)
        e.dest[e.destLen++] = e.source[e.sourceIndex++];
      return (e.bitcount = 0), n;
    }
    !(function (e, t) {
      var r;
      for (r = 0; r < 7; ++r) e.table[r] = 0;
      for (
        e.table[7] = 24, e.table[8] = 152, e.table[9] = 112, r = 0;
        r < 24;
        ++r
      )
        e.trans[r] = 256 + r;
      for (r = 0; r < 144; ++r) e.trans[24 + r] = r;
      for (r = 0; r < 8; ++r) e.trans[168 + r] = 280 + r;
      for (r = 0; r < 112; ++r) e.trans[176 + r] = 144 + r;
      for (r = 0; r < 5; ++r) t.table[r] = 0;
      for (t.table[5] = 32, r = 0; r < 32; ++r) t.trans[r] = r;
    })(i, u),
      v(l, p, 4, 3),
      v(c, h, 2, 1),
      (l[28] = 0),
      (p[28] = 258);
    var O = function (e, t) {
      var r,
        o,
        l = new s(e, t);
      do {
        switch (((r = b(l)), x(l, 2, 0))) {
          case 0:
            o = k(l);
            break;
          case 1:
            o = U(l, i, u);
            break;
          case 2:
            T(l, l.ltree, l.dtree), (o = U(l, l.ltree, l.dtree));
            break;
          default:
            o = a;
        }
        if (o !== n) throw new Error("Data error");
      } while (!r);
      return l.destLen < l.dest.length
        ? "function" == typeof l.dest.slice
          ? l.dest.slice(0, l.destLen)
          : l.dest.subarray(0, l.destLen)
        : l.dest;
    };
    function E(e, t, r, n, a) {
      return (
        Math.pow(1 - a, 3) * e +
        3 * Math.pow(1 - a, 2) * a * t +
        3 * (1 - a) * Math.pow(a, 2) * r +
        Math.pow(a, 3) * n
      );
    }
    function R() {
      (this.x1 = Number.NaN),
        (this.y1 = Number.NaN),
        (this.x2 = Number.NaN),
        (this.y2 = Number.NaN);
    }
    function L() {
      (this.commands = []),
        (this.fill = "black"),
        (this.stroke = null),
        (this.strokeWidth = 1);
    }
    function w(e) {
      throw new Error(e);
    }
    function C(e, t) {
      e || w(t);
    }
    (R.prototype.isEmpty = function () {
      return (
        isNaN(this.x1) || isNaN(this.y1) || isNaN(this.x2) || isNaN(this.y2)
      );
    }),
      (R.prototype.addPoint = function (e, t) {
        "number" == typeof e &&
          ((isNaN(this.x1) || isNaN(this.x2)) && ((this.x1 = e), (this.x2 = e)),
          e < this.x1 && (this.x1 = e),
          e > this.x2 && (this.x2 = e)),
          "number" == typeof t &&
            ((isNaN(this.y1) || isNaN(this.y2)) &&
              ((this.y1 = t), (this.y2 = t)),
            t < this.y1 && (this.y1 = t),
            t > this.y2 && (this.y2 = t));
      }),
      (R.prototype.addX = function (e) {
        this.addPoint(e, null);
      }),
      (R.prototype.addY = function (e) {
        this.addPoint(null, e);
      }),
      (R.prototype.addBezier = function (e, t, r, n, a, o, s, i) {
        var u = [e, t],
          l = [r, n],
          p = [a, o],
          c = [s, i];
        this.addPoint(e, t), this.addPoint(s, i);
        for (var h = 0; h <= 1; h++) {
          var f = 6 * u[h] - 12 * l[h] + 6 * p[h],
            d = -3 * u[h] + 9 * l[h] - 9 * p[h] + 3 * c[h],
            g = 3 * l[h] - 3 * u[h];
          if (0 !== d) {
            var v = Math.pow(f, 2) - 4 * g * d;
            if (!(v < 0)) {
              var m = (-f + Math.sqrt(v)) / (2 * d);
              0 < m &&
                m < 1 &&
                (0 === h && this.addX(E(u[h], l[h], p[h], c[h], m)),
                1 === h && this.addY(E(u[h], l[h], p[h], c[h], m)));
              var y = (-f - Math.sqrt(v)) / (2 * d);
              0 < y &&
                y < 1 &&
                (0 === h && this.addX(E(u[h], l[h], p[h], c[h], y)),
                1 === h && this.addY(E(u[h], l[h], p[h], c[h], y)));
            }
          } else {
            if (0 === f) continue;
            var b = -g / f;
            0 < b &&
              b < 1 &&
              (0 === h && this.addX(E(u[h], l[h], p[h], c[h], b)),
              1 === h && this.addY(E(u[h], l[h], p[h], c[h], b)));
          }
        }
      }),
      (R.prototype.addQuad = function (e, t, r, n, a, o) {
        var s = e + (2 / 3) * (r - e),
          i = t + (2 / 3) * (n - t),
          u = s + (1 / 3) * (a - e),
          l = i + (1 / 3) * (o - t);
        this.addBezier(e, t, s, i, u, l, a, o);
      }),
      (L.prototype.moveTo = function (e, t) {
        this.commands.push({ type: "M", x: e, y: t });
      }),
      (L.prototype.lineTo = function (e, t) {
        this.commands.push({ type: "L", x: e, y: t });
      }),
      (L.prototype.curveTo = L.prototype.bezierCurveTo =
        function (e, t, r, n, a, o) {
          this.commands.push({
            type: "C",
            x1: e,
            y1: t,
            x2: r,
            y2: n,
            x: a,
            y: o,
          });
        }),
      (L.prototype.quadTo = L.prototype.quadraticCurveTo =
        function (e, t, r, n) {
          this.commands.push({ type: "Q", x1: e, y1: t, x: r, y: n });
        }),
      (L.prototype.close = L.prototype.closePath =
        function () {
          this.commands.push({ type: "Z" });
        }),
      (L.prototype.extend = function (e) {
        if (e.commands) e = e.commands;
        else if (e instanceof R) {
          var t = e;
          return (
            this.moveTo(t.x1, t.y1),
            this.lineTo(t.x2, t.y1),
            this.lineTo(t.x2, t.y2),
            this.lineTo(t.x1, t.y2),
            void this.close()
          );
        }
        Array.prototype.push.apply(this.commands, e);
      }),
      (L.prototype.getBoundingBox = function () {
        for (
          var e = new R(), t = 0, r = 0, n = 0, a = 0, o = 0;
          o < this.commands.length;
          o++
        ) {
          var s = this.commands[o];
          switch (s.type) {
            case "M":
              e.addPoint(s.x, s.y), (t = n = s.x), (r = a = s.y);
              break;
            case "L":
              e.addPoint(s.x, s.y), (n = s.x), (a = s.y);
              break;
            case "Q":
              e.addQuad(n, a, s.x1, s.y1, s.x, s.y), (n = s.x), (a = s.y);
              break;
            case "C":
              e.addBezier(n, a, s.x1, s.y1, s.x2, s.y2, s.x, s.y),
                (n = s.x),
                (a = s.y);
              break;
            case "Z":
              (n = t), (a = r);
              break;
            default:
              throw new Error("Unexpected path command " + s.type);
          }
        }
        return e.isEmpty() && e.addPoint(0, 0), e;
      }),
      (L.prototype.draw = function (e) {
        e.beginPath();
        for (var t = 0; t < this.commands.length; t += 1) {
          var r = this.commands[t];
          "M" === r.type
            ? e.moveTo(r.x, r.y)
            : "L" === r.type
            ? e.lineTo(r.x, r.y)
            : "C" === r.type
            ? e.bezierCurveTo(r.x1, r.y1, r.x2, r.y2, r.x, r.y)
            : "Q" === r.type
            ? e.quadraticCurveTo(r.x1, r.y1, r.x, r.y)
            : "Z" === r.type && e.closePath();
        }
        this.fill && ((e.fillStyle = this.fill), e.fill()),
          this.stroke &&
            ((e.strokeStyle = this.stroke),
            (e.lineWidth = this.strokeWidth),
            e.stroke());
      }),
      (L.prototype.toPathData = function (e) {
        function t(t) {
          return Math.round(t) === t ? "" + Math.round(t) : t.toFixed(e);
        }
        function r() {
          for (var e = arguments, r = "", n = 0; n < arguments.length; n += 1) {
            var a = e[n];
            a >= 0 && n > 0 && (r += " "), (r += t(a));
          }
          return r;
        }
        e = void 0 !== e ? e : 2;
        for (var n = "", a = 0; a < this.commands.length; a += 1) {
          var o = this.commands[a];
          "M" === o.type
            ? (n += "M" + r(o.x, o.y))
            : "L" === o.type
            ? (n += "L" + r(o.x, o.y))
            : "C" === o.type
            ? (n += "C" + r(o.x1, o.y1, o.x2, o.y2, o.x, o.y))
            : "Q" === o.type
            ? (n += "Q" + r(o.x1, o.y1, o.x, o.y))
            : "Z" === o.type && (n += "Z");
        }
        return n;
      }),
      (L.prototype.toSVG = function (e) {
        var t = '<path d="';
        return (
          (t += this.toPathData(e)),
          (t += '"'),
          this.fill &&
            "black" !== this.fill &&
            (null === this.fill
              ? (t += ' fill="none"')
              : (t += ' fill="' + this.fill + '"')),
          this.stroke &&
            (t +=
              ' stroke="' +
              this.stroke +
              '" stroke-width="' +
              this.strokeWidth +
              '"'),
          (t += "/>")
        );
      }),
      (L.prototype.toDOMElement = function (e) {
        var t = this.toPathData(e),
          r = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return r.setAttribute("d", t), r;
      });
    var D = { fail: w, argument: C, assert: C },
      I = 2147483648,
      M = {},
      G = {},
      N = {};
    function F(e) {
      return function () {
        return e;
      };
    }
    (G.BYTE = function (e) {
      return (
        D.argument(
          e >= 0 && e <= 255,
          "Byte value should be between 0 and 255."
        ),
        [e]
      );
    }),
      (N.BYTE = F(1)),
      (G.CHAR = function (e) {
        return [e.charCodeAt(0)];
      }),
      (N.CHAR = F(1)),
      (G.CHARARRAY = function (e) {
        void 0 === e &&
          ((e = ""),
          console.warn(
            "Undefined CHARARRAY encountered and treated as an empty string. This is probably caused by a missing glyph name."
          ));
        for (var t = [], r = 0; r < e.length; r += 1) t[r] = e.charCodeAt(r);
        return t;
      }),
      (N.CHARARRAY = function (e) {
        return void 0 === e ? 0 : e.length;
      }),
      (G.USHORT = function (e) {
        return [(e >> 8) & 255, 255 & e];
      }),
      (N.USHORT = F(2)),
      (G.SHORT = function (e) {
        return e >= 32768 && (e = -(65536 - e)), [(e >> 8) & 255, 255 & e];
      }),
      (N.SHORT = F(2)),
      (G.UINT24 = function (e) {
        return [(e >> 16) & 255, (e >> 8) & 255, 255 & e];
      }),
      (N.UINT24 = F(3)),
      (G.ULONG = function (e) {
        return [(e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255, 255 & e];
      }),
      (N.ULONG = F(4)),
      (G.LONG = function (e) {
        return (
          e >= I && (e = -(2 * I - e)),
          [(e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255, 255 & e]
        );
      }),
      (N.LONG = F(4)),
      (G.FIXED = G.ULONG),
      (N.FIXED = N.ULONG),
      (G.FWORD = G.SHORT),
      (N.FWORD = N.SHORT),
      (G.UFWORD = G.USHORT),
      (N.UFWORD = N.USHORT),
      (G.LONGDATETIME = function (e) {
        return [
          0,
          0,
          0,
          0,
          (e >> 24) & 255,
          (e >> 16) & 255,
          (e >> 8) & 255,
          255 & e,
        ];
      }),
      (N.LONGDATETIME = F(8)),
      (G.TAG = function (e) {
        return (
          D.argument(
            4 === e.length,
            "Tag should be exactly 4 ASCII characters."
          ),
          [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]
        );
      }),
      (N.TAG = F(4)),
      (G.Card8 = G.BYTE),
      (N.Card8 = N.BYTE),
      (G.Card16 = G.USHORT),
      (N.Card16 = N.USHORT),
      (G.OffSize = G.BYTE),
      (N.OffSize = N.BYTE),
      (G.SID = G.USHORT),
      (N.SID = N.USHORT),
      (G.NUMBER = function (e) {
        return e >= -107 && e <= 107
          ? [e + 139]
          : e >= 108 && e <= 1131
          ? [247 + ((e -= 108) >> 8), 255 & e]
          : e >= -1131 && e <= -108
          ? [251 + ((e = -e - 108) >> 8), 255 & e]
          : e >= -32768 && e <= 32767
          ? G.NUMBER16(e)
          : G.NUMBER32(e);
      }),
      (N.NUMBER = function (e) {
        return G.NUMBER(e).length;
      }),
      (G.NUMBER16 = function (e) {
        return [28, (e >> 8) & 255, 255 & e];
      }),
      (N.NUMBER16 = F(3)),
      (G.NUMBER32 = function (e) {
        return [29, (e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255, 255 & e];
      }),
      (N.NUMBER32 = F(5)),
      (G.REAL = function (e) {
        var t = e.toString(),
          r = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t);
        if (r) {
          var n = parseFloat("1e" + ((r[2] ? +r[2] : 0) + r[1].length));
          t = (Math.round(e * n) / n).toString();
        }
        for (var a = "", o = 0, s = t.length; o < s; o += 1) {
          var i = t[o];
          a +=
            "e" === i
              ? "-" === t[++o]
                ? "c"
                : "b"
              : "." === i
              ? "a"
              : "-" === i
              ? "e"
              : i;
        }
        for (
          var u = [30], l = 0, p = (a += 1 & a.length ? "f" : "ff").length;
          l < p;
          l += 2
        )
          u.push(parseInt(a.substr(l, 2), 16));
        return u;
      }),
      (N.REAL = function (e) {
        return G.REAL(e).length;
      }),
      (G.NAME = G.CHARARRAY),
      (N.NAME = N.CHARARRAY),
      (G.STRING = G.CHARARRAY),
      (N.STRING = N.CHARARRAY),
      (M.UTF8 = function (e, t, r) {
        for (var n = [], a = r, o = 0; o < a; o++, t += 1) n[o] = e.getUint8(t);
        return String.fromCharCode.apply(null, n);
      }),
      (M.UTF16 = function (e, t, r) {
        for (var n = [], a = r / 2, o = 0; o < a; o++, t += 2)
          n[o] = e.getUint16(t);
        return String.fromCharCode.apply(null, n);
      }),
      (G.UTF16 = function (e) {
        for (var t = [], r = 0; r < e.length; r += 1) {
          var n = e.charCodeAt(r);
          (t[t.length] = (n >> 8) & 255), (t[t.length] = 255 & n);
        }
        return t;
      }),
      (N.UTF16 = function (e) {
        return 2 * e.length;
      });
    var B = {
      "x-mac-croatian":
        "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ",
      "x-mac-cyrillic":
        "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю",
      "x-mac-gaelic":
        "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ",
      "x-mac-greek":
        "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­",
      "x-mac-icelandic":
        "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
      "x-mac-inuit":
        "ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł",
      "x-mac-ce":
        "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",
      macintosh:
        "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
      "x-mac-romanian":
        "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
      "x-mac-turkish":
        "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ",
    };
    M.MACSTRING = function (e, t, r, n) {
      var a = B[n];
      if (void 0 !== a) {
        for (var o = "", s = 0; s < r; s++) {
          var i = e.getUint8(t + s);
          o += i <= 127 ? String.fromCharCode(i) : a[127 & i];
        }
        return o;
      }
    };
    var A,
      P = "function" == typeof WeakMap && new WeakMap();
    function H(e) {
      return e >= -128 && e <= 127;
    }
    function z(e, t, r) {
      for (var n = 0, a = e.length; t < a && n < 64 && 0 === e[t]; ) ++t, ++n;
      return r.push(128 | (n - 1)), t;
    }
    function W(e, t, r) {
      for (var n = 0, a = e.length, o = t; o < a && n < 64; ) {
        var s = e[o];
        if (!H(s)) break;
        if (0 === s && o + 1 < a && 0 === e[o + 1]) break;
        ++o, ++n;
      }
      r.push(n - 1);
      for (var i = t; i < o; ++i) r.push((e[i] + 256) & 255);
      return o;
    }
    function _(e, t, r) {
      for (var n = 0, a = e.length, o = t; o < a && n < 64; ) {
        var s = e[o];
        if (0 === s) break;
        if (H(s) && o + 1 < a && H(e[o + 1])) break;
        ++o, ++n;
      }
      r.push(64 | (n - 1));
      for (var i = t; i < o; ++i) {
        var u = e[i];
        r.push(((u + 65536) >> 8) & 255, (u + 256) & 255);
      }
      return o;
    }
    (G.MACSTRING = function (e, t) {
      var r = (function (e) {
        if (!A) for (var t in ((A = {}), B)) A[t] = new String(t);
        var r = A[e];
        if (void 0 !== r) {
          if (P) {
            var n = P.get(r);
            if (void 0 !== n) return n;
          }
          var a = B[e];
          if (void 0 !== a) {
            for (var o = {}, s = 0; s < a.length; s++)
              o[a.charCodeAt(s)] = s + 128;
            return P && P.set(r, o), o;
          }
        }
      })(t);
      if (void 0 !== r) {
        for (var n = [], a = 0; a < e.length; a++) {
          var o = e.charCodeAt(a);
          if (o >= 128 && void 0 === (o = r[o])) return;
          n[a] = o;
        }
        return n;
      }
    }),
      (N.MACSTRING = function (e, t) {
        var r = G.MACSTRING(e, t);
        return void 0 !== r ? r.length : 0;
      }),
      (G.VARDELTAS = function (e) {
        for (var t = 0, r = []; t < e.length; ) {
          var n = e[t];
          t =
            0 === n
              ? z(e, t, r)
              : n >= -128 && n <= 127
              ? W(e, t, r)
              : _(e, t, r);
        }
        return r;
      }),
      (G.INDEX = function (e) {
        for (var t = 1, r = [t], n = [], a = 0; a < e.length; a += 1) {
          var o = G.OBJECT(e[a]);
          Array.prototype.push.apply(n, o), (t += o.length), r.push(t);
        }
        if (0 === n.length) return [0, 0];
        for (
          var s = [],
            i = (1 + Math.floor(Math.log(t) / Math.log(2)) / 8) | 0,
            u = [void 0, G.BYTE, G.USHORT, G.UINT24, G.ULONG][i],
            l = 0;
          l < r.length;
          l += 1
        ) {
          var p = u(r[l]);
          Array.prototype.push.apply(s, p);
        }
        return Array.prototype.concat(G.Card16(e.length), G.OffSize(i), s, n);
      }),
      (N.INDEX = function (e) {
        return G.INDEX(e).length;
      }),
      (G.DICT = function (e) {
        for (
          var t = [], r = Object.keys(e), n = r.length, a = 0;
          a < n;
          a += 1
        ) {
          var o = parseInt(r[a], 0),
            s = e[o];
          t = (t = t.concat(G.OPERAND(s.value, s.type))).concat(G.OPERATOR(o));
        }
        return t;
      }),
      (N.DICT = function (e) {
        return G.DICT(e).length;
      }),
      (G.OPERATOR = function (e) {
        return e < 1200 ? [e] : [12, e - 1200];
      }),
      (G.OPERAND = function (e, t) {
        var r = [];
        if (Array.isArray(t))
          for (var n = 0; n < t.length; n += 1)
            D.argument(
              e.length === t.length,
              "Not enough arguments given for type" + t
            ),
              (r = r.concat(G.OPERAND(e[n], t[n])));
        else if ("SID" === t) r = r.concat(G.NUMBER(e));
        else if ("offset" === t) r = r.concat(G.NUMBER32(e));
        else if ("number" === t) r = r.concat(G.NUMBER(e));
        else {
          if ("real" !== t) throw new Error("Unknown operand type " + t);
          r = r.concat(G.REAL(e));
        }
        return r;
      }),
      (G.OP = G.BYTE),
      (N.OP = N.BYTE);
    var q = "function" == typeof WeakMap && new WeakMap();
    function j(e, t, r) {
      if (t.length && ("coverageFormat" !== t[0].name || 1 === t[0].value))
        for (var n = 0; n < t.length; n += 1) {
          var a = t[n];
          this[a.name] = a.value;
        }
      if (((this.tableName = e), (this.fields = t), r))
        for (var o = Object.keys(r), s = 0; s < o.length; s += 1) {
          var i = o[s],
            u = r[i];
          void 0 !== this[i] && (this[i] = u);
        }
    }
    function X(e, t, r) {
      void 0 === r && (r = t.length);
      var n = new Array(t.length + 1);
      n[0] = { name: e + "Count", type: "USHORT", value: r };
      for (var a = 0; a < t.length; a++)
        n[a + 1] = { name: e + a, type: "USHORT", value: t[a] };
      return n;
    }
    function Y(e, t, r) {
      var n = t.length,
        a = new Array(n + 1);
      a[0] = { name: e + "Count", type: "USHORT", value: n };
      for (var o = 0; o < n; o++)
        a[o + 1] = { name: e + o, type: "TABLE", value: r(t[o], o) };
      return a;
    }
    function V(e, t, r) {
      var n = t.length,
        a = [];
      a[0] = { name: e + "Count", type: "USHORT", value: n };
      for (var o = 0; o < n; o++) a = a.concat(r(t[o], o));
      return a;
    }
    function Z(e) {
      1 === e.format
        ? j.call(
            this,
            "coverageTable",
            [{ name: "coverageFormat", type: "USHORT", value: 1 }].concat(
              X("glyph", e.glyphs)
            )
          )
        : 2 === e.format
        ? j.call(
            this,
            "coverageTable",
            [{ name: "coverageFormat", type: "USHORT", value: 2 }].concat(
              V("rangeRecord", e.ranges, function (e) {
                return [
                  { name: "startGlyphID", type: "USHORT", value: e.start },
                  { name: "endGlyphID", type: "USHORT", value: e.end },
                  {
                    name: "startCoverageIndex",
                    type: "USHORT",
                    value: e.index,
                  },
                ];
              })
            )
          )
        : D.assert(!1, "Coverage format must be 1 or 2.");
    }
    function Q(e) {
      j.call(
        this,
        "scriptListTable",
        V("scriptRecord", e, function (e, t) {
          var r = e.script,
            n = r.defaultLangSys;
          return (
            D.assert(
              !!n,
              "Unable to write GSUB: script " +
                e.tag +
                " has no default language system."
            ),
            [
              { name: "scriptTag" + t, type: "TAG", value: e.tag },
              {
                name: "script" + t,
                type: "TABLE",
                value: new j(
                  "scriptTable",
                  [
                    {
                      name: "defaultLangSys",
                      type: "TABLE",
                      value: new j(
                        "defaultLangSys",
                        [
                          { name: "lookupOrder", type: "USHORT", value: 0 },
                          {
                            name: "reqFeatureIndex",
                            type: "USHORT",
                            value: n.reqFeatureIndex,
                          },
                        ].concat(X("featureIndex", n.featureIndexes))
                      ),
                    },
                  ].concat(
                    V("langSys", r.langSysRecords, function (e, t) {
                      var r = e.langSys;
                      return [
                        { name: "langSysTag" + t, type: "TAG", value: e.tag },
                        {
                          name: "langSys" + t,
                          type: "TABLE",
                          value: new j(
                            "langSys",
                            [
                              { name: "lookupOrder", type: "USHORT", value: 0 },
                              {
                                name: "reqFeatureIndex",
                                type: "USHORT",
                                value: r.reqFeatureIndex,
                              },
                            ].concat(X("featureIndex", r.featureIndexes))
                          ),
                        },
                      ];
                    })
                  )
                ),
              },
            ]
          );
        })
      );
    }
    function J(e) {
      j.call(
        this,
        "featureListTable",
        V("featureRecord", e, function (e, t) {
          var r = e.feature;
          return [
            { name: "featureTag" + t, type: "TAG", value: e.tag },
            {
              name: "feature" + t,
              type: "TABLE",
              value: new j(
                "featureTable",
                [
                  {
                    name: "featureParams",
                    type: "USHORT",
                    value: r.featureParams,
                  },
                ].concat(X("lookupListIndex", r.lookupListIndexes))
              ),
            },
          ];
        })
      );
    }
    function K(e, t) {
      j.call(
        this,
        "lookupListTable",
        Y("lookup", e, function (e) {
          var r = t[e.lookupType];
          return (
            D.assert(
              !!r,
              "Unable to write GSUB lookup type " + e.lookupType + " tables."
            ),
            new j(
              "lookupTable",
              [
                { name: "lookupType", type: "USHORT", value: e.lookupType },
                { name: "lookupFlag", type: "USHORT", value: e.lookupFlag },
              ].concat(Y("subtable", e.subtables, r))
            )
          );
        })
      );
    }
    (G.CHARSTRING = function (e) {
      if (q) {
        var t = q.get(e);
        if (void 0 !== t) return t;
      }
      for (var r = [], n = e.length, a = 0; a < n; a += 1) {
        var o = e[a];
        r = r.concat(G[o.type](o.value));
      }
      return q && q.set(e, r), r;
    }),
      (N.CHARSTRING = function (e) {
        return G.CHARSTRING(e).length;
      }),
      (G.OBJECT = function (e) {
        var t = G[e.type];
        return (
          D.argument(void 0 !== t, "No encoding function for type " + e.type),
          t(e.value)
        );
      }),
      (N.OBJECT = function (e) {
        var t = N[e.type];
        return (
          D.argument(void 0 !== t, "No sizeOf function for type " + e.type),
          t(e.value)
        );
      }),
      (G.TABLE = function (e) {
        for (
          var t = [], r = e.fields.length, n = [], a = [], o = 0;
          o < r;
          o += 1
        ) {
          var s = e.fields[o],
            i = G[s.type];
          D.argument(
            void 0 !== i,
            "No encoding function for field type " +
              s.type +
              " (" +
              s.name +
              ")"
          );
          var u = e[s.name];
          void 0 === u && (u = s.value);
          var l = i(u);
          "TABLE" === s.type
            ? (a.push(t.length), (t = t.concat([0, 0])), n.push(l))
            : (t = t.concat(l));
        }
        for (var p = 0; p < n.length; p += 1) {
          var c = a[p],
            h = t.length;
          D.argument(h < 65536, "Table " + e.tableName + " too big."),
            (t[c] = h >> 8),
            (t[c + 1] = 255 & h),
            (t = t.concat(n[p]));
        }
        return t;
      }),
      (N.TABLE = function (e) {
        for (var t = 0, r = e.fields.length, n = 0; n < r; n += 1) {
          var a = e.fields[n],
            o = N[a.type];
          D.argument(
            void 0 !== o,
            "No sizeOf function for field type " + a.type + " (" + a.name + ")"
          );
          var s = e[a.name];
          void 0 === s && (s = a.value),
            (t += o(s)),
            "TABLE" === a.type && (t += 2);
        }
        return t;
      }),
      (G.RECORD = G.TABLE),
      (N.RECORD = N.TABLE),
      (G.LITERAL = function (e) {
        return e;
      }),
      (N.LITERAL = function (e) {
        return e.length;
      }),
      (j.prototype.encode = function () {
        return G.TABLE(this);
      }),
      (j.prototype.sizeOf = function () {
        return N.TABLE(this);
      }),
      (Z.prototype = Object.create(j.prototype)),
      (Z.prototype.constructor = Z),
      (Q.prototype = Object.create(j.prototype)),
      (Q.prototype.constructor = Q),
      (J.prototype = Object.create(j.prototype)),
      (J.prototype.constructor = J),
      (K.prototype = Object.create(j.prototype)),
      (K.prototype.constructor = K);
    var $ = {
      Table: j,
      Record: j,
      Coverage: Z,
      ScriptList: Q,
      FeatureList: J,
      LookupList: K,
      ushortList: X,
      tableList: Y,
      recordList: V,
    };
    function ee(e, t) {
      return e.getUint8(t);
    }
    function te(e, t) {
      return e.getUint16(t, !1);
    }
    function re(e, t) {
      return e.getUint32(t, !1);
    }
    function ne(e, t) {
      return e.getInt16(t, !1) + e.getUint16(t + 2, !1) / 65535;
    }
    var ae = {
      byte: 1,
      uShort: 2,
      short: 2,
      uLong: 4,
      fixed: 4,
      longDateTime: 8,
      tag: 4,
    };
    function oe(e, t) {
      (this.data = e), (this.offset = t), (this.relativeOffset = 0);
    }
    (oe.prototype.parseByte = function () {
      var e = this.data.getUint8(this.offset + this.relativeOffset);
      return (this.relativeOffset += 1), e;
    }),
      (oe.prototype.parseChar = function () {
        var e = this.data.getInt8(this.offset + this.relativeOffset);
        return (this.relativeOffset += 1), e;
      }),
      (oe.prototype.parseCard8 = oe.prototype.parseByte),
      (oe.prototype.parseUShort = function () {
        var e = this.data.getUint16(this.offset + this.relativeOffset);
        return (this.relativeOffset += 2), e;
      }),
      (oe.prototype.parseCard16 = oe.prototype.parseUShort),
      (oe.prototype.parseSID = oe.prototype.parseUShort),
      (oe.prototype.parseOffset16 = oe.prototype.parseUShort),
      (oe.prototype.parseShort = function () {
        var e = this.data.getInt16(this.offset + this.relativeOffset);
        return (this.relativeOffset += 2), e;
      }),
      (oe.prototype.parseF2Dot14 = function () {
        var e = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
        return (this.relativeOffset += 2), e;
      }),
      (oe.prototype.parseULong = function () {
        var e = re(this.data, this.offset + this.relativeOffset);
        return (this.relativeOffset += 4), e;
      }),
      (oe.prototype.parseOffset32 = oe.prototype.parseULong),
      (oe.prototype.parseFixed = function () {
        var e = ne(this.data, this.offset + this.relativeOffset);
        return (this.relativeOffset += 4), e;
      }),
      (oe.prototype.parseString = function (e) {
        var t = this.data,
          r = this.offset + this.relativeOffset,
          n = "";
        this.relativeOffset += e;
        for (var a = 0; a < e; a++) n += String.fromCharCode(t.getUint8(r + a));
        return n;
      }),
      (oe.prototype.parseTag = function () {
        return this.parseString(4);
      }),
      (oe.prototype.parseLongDateTime = function () {
        var e = re(this.data, this.offset + this.relativeOffset + 4);
        return (e -= 2082844800), (this.relativeOffset += 8), e;
      }),
      (oe.prototype.parseVersion = function (e) {
        var t = te(this.data, this.offset + this.relativeOffset),
          r = te(this.data, this.offset + this.relativeOffset + 2);
        return (
          (this.relativeOffset += 4), void 0 === e && (e = 4096), t + r / e / 10
        );
      }),
      (oe.prototype.skip = function (e, t) {
        void 0 === t && (t = 1), (this.relativeOffset += ae[e] * t);
      }),
      (oe.prototype.parseULongList = function (e) {
        void 0 === e && (e = this.parseULong());
        for (
          var t = new Array(e),
            r = this.data,
            n = this.offset + this.relativeOffset,
            a = 0;
          a < e;
          a++
        )
          (t[a] = r.getUint32(n)), (n += 4);
        return (this.relativeOffset += 4 * e), t;
      }),
      (oe.prototype.parseOffset16List = oe.prototype.parseUShortList =
        function (e) {
          void 0 === e && (e = this.parseUShort());
          for (
            var t = new Array(e),
              r = this.data,
              n = this.offset + this.relativeOffset,
              a = 0;
            a < e;
            a++
          )
            (t[a] = r.getUint16(n)), (n += 2);
          return (this.relativeOffset += 2 * e), t;
        }),
      (oe.prototype.parseShortList = function (e) {
        for (
          var t = new Array(e),
            r = this.data,
            n = this.offset + this.relativeOffset,
            a = 0;
          a < e;
          a++
        )
          (t[a] = r.getInt16(n)), (n += 2);
        return (this.relativeOffset += 2 * e), t;
      }),
      (oe.prototype.parseByteList = function (e) {
        for (
          var t = new Array(e),
            r = this.data,
            n = this.offset + this.relativeOffset,
            a = 0;
          a < e;
          a++
        )
          t[a] = r.getUint8(n++);
        return (this.relativeOffset += e), t;
      }),
      (oe.prototype.parseList = function (e, t) {
        t || ((t = e), (e = this.parseUShort()));
        for (var r = new Array(e), n = 0; n < e; n++) r[n] = t.call(this);
        return r;
      }),
      (oe.prototype.parseList32 = function (e, t) {
        t || ((t = e), (e = this.parseULong()));
        for (var r = new Array(e), n = 0; n < e; n++) r[n] = t.call(this);
        return r;
      }),
      (oe.prototype.parseRecordList = function (e, t) {
        t || ((t = e), (e = this.parseUShort()));
        for (var r = new Array(e), n = Object.keys(t), a = 0; a < e; a++) {
          for (var o = {}, s = 0; s < n.length; s++) {
            var i = n[s],
              u = t[i];
            o[i] = u.call(this);
          }
          r[a] = o;
        }
        return r;
      }),
      (oe.prototype.parseRecordList32 = function (e, t) {
        t || ((t = e), (e = this.parseULong()));
        for (var r = new Array(e), n = Object.keys(t), a = 0; a < e; a++) {
          for (var o = {}, s = 0; s < n.length; s++) {
            var i = n[s],
              u = t[i];
            o[i] = u.call(this);
          }
          r[a] = o;
        }
        return r;
      }),
      (oe.prototype.parseStruct = function (e) {
        if ("function" == typeof e) return e.call(this);
        for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
          var a = t[n],
            o = e[a];
          r[a] = o.call(this);
        }
        return r;
      }),
      (oe.prototype.parseValueRecord = function (e) {
        if ((void 0 === e && (e = this.parseUShort()), 0 !== e)) {
          var t = {};
          return (
            1 & e && (t.xPlacement = this.parseShort()),
            2 & e && (t.yPlacement = this.parseShort()),
            4 & e && (t.xAdvance = this.parseShort()),
            8 & e && (t.yAdvance = this.parseShort()),
            16 & e && ((t.xPlaDevice = void 0), this.parseShort()),
            32 & e && ((t.yPlaDevice = void 0), this.parseShort()),
            64 & e && ((t.xAdvDevice = void 0), this.parseShort()),
            128 & e && ((t.yAdvDevice = void 0), this.parseShort()),
            t
          );
        }
      }),
      (oe.prototype.parseValueRecordList = function () {
        for (
          var e = this.parseUShort(),
            t = this.parseUShort(),
            r = new Array(t),
            n = 0;
          n < t;
          n++
        )
          r[n] = this.parseValueRecord(e);
        return r;
      }),
      (oe.prototype.parsePointer = function (e) {
        var t = this.parseOffset16();
        if (t > 0) return new oe(this.data, this.offset + t).parseStruct(e);
      }),
      (oe.prototype.parsePointer32 = function (e) {
        var t = this.parseOffset32();
        if (t > 0) return new oe(this.data, this.offset + t).parseStruct(e);
      }),
      (oe.prototype.parseListOfLists = function (e) {
        for (
          var t = this.parseOffset16List(),
            r = t.length,
            n = this.relativeOffset,
            a = new Array(r),
            o = 0;
          o < r;
          o++
        ) {
          var s = t[o];
          if (0 !== s)
            if (((this.relativeOffset = s), e)) {
              for (
                var i = this.parseOffset16List(),
                  u = new Array(i.length),
                  l = 0;
                l < i.length;
                l++
              )
                (this.relativeOffset = s + i[l]), (u[l] = e.call(this));
              a[o] = u;
            } else a[o] = this.parseUShortList();
          else a[o] = void 0;
        }
        return (this.relativeOffset = n), a;
      }),
      (oe.prototype.parseCoverage = function () {
        var e = this.offset + this.relativeOffset,
          t = this.parseUShort(),
          r = this.parseUShort();
        if (1 === t) return { format: 1, glyphs: this.parseUShortList(r) };
        if (2 === t) {
          for (var n = new Array(r), a = 0; a < r; a++)
            n[a] = {
              start: this.parseUShort(),
              end: this.parseUShort(),
              index: this.parseUShort(),
            };
          return { format: 2, ranges: n };
        }
        throw new Error(
          "0x" + e.toString(16) + ": Coverage format must be 1 or 2."
        );
      }),
      (oe.prototype.parseClassDef = function () {
        var e = this.offset + this.relativeOffset,
          t = this.parseUShort();
        if (1 === t)
          return {
            format: 1,
            startGlyph: this.parseUShort(),
            classes: this.parseUShortList(),
          };
        if (2 === t)
          return {
            format: 2,
            ranges: this.parseRecordList({
              start: oe.uShort,
              end: oe.uShort,
              classId: oe.uShort,
            }),
          };
        throw new Error(
          "0x" + e.toString(16) + ": ClassDef format must be 1 or 2."
        );
      }),
      (oe.list = function (e, t) {
        return function () {
          return this.parseList(e, t);
        };
      }),
      (oe.list32 = function (e, t) {
        return function () {
          return this.parseList32(e, t);
        };
      }),
      (oe.recordList = function (e, t) {
        return function () {
          return this.parseRecordList(e, t);
        };
      }),
      (oe.recordList32 = function (e, t) {
        return function () {
          return this.parseRecordList32(e, t);
        };
      }),
      (oe.pointer = function (e) {
        return function () {
          return this.parsePointer(e);
        };
      }),
      (oe.pointer32 = function (e) {
        return function () {
          return this.parsePointer32(e);
        };
      }),
      (oe.tag = oe.prototype.parseTag),
      (oe.byte = oe.prototype.parseByte),
      (oe.uShort = oe.offset16 = oe.prototype.parseUShort),
      (oe.uShortList = oe.prototype.parseUShortList),
      (oe.uLong = oe.offset32 = oe.prototype.parseULong),
      (oe.uLongList = oe.prototype.parseULongList),
      (oe.struct = oe.prototype.parseStruct),
      (oe.coverage = oe.prototype.parseCoverage),
      (oe.classDef = oe.prototype.parseClassDef);
    var se = {
      reserved: oe.uShort,
      reqFeatureIndex: oe.uShort,
      featureIndexes: oe.uShortList,
    };
    (oe.prototype.parseScriptList = function () {
      return (
        this.parsePointer(
          oe.recordList({
            tag: oe.tag,
            script: oe.pointer({
              defaultLangSys: oe.pointer(se),
              langSysRecords: oe.recordList({
                tag: oe.tag,
                langSys: oe.pointer(se),
              }),
            }),
          })
        ) || []
      );
    }),
      (oe.prototype.parseFeatureList = function () {
        return (
          this.parsePointer(
            oe.recordList({
              tag: oe.tag,
              feature: oe.pointer({
                featureParams: oe.offset16,
                lookupListIndexes: oe.uShortList,
              }),
            })
          ) || []
        );
      }),
      (oe.prototype.parseLookupList = function (e) {
        return (
          this.parsePointer(
            oe.list(
              oe.pointer(function () {
                var t = this.parseUShort();
                D.argument(
                  1 <= t && t <= 9,
                  "GPOS/GSUB lookup type " + t + " unknown."
                );
                var r = this.parseUShort(),
                  n = 16 & r;
                return {
                  lookupType: t,
                  lookupFlag: r,
                  subtables: this.parseList(oe.pointer(e[t])),
                  markFilteringSet: n ? this.parseUShort() : void 0,
                };
              })
            )
          ) || []
        );
      }),
      (oe.prototype.parseFeatureVariationsList = function () {
        return (
          this.parsePointer32(function () {
            var e = this.parseUShort(),
              t = this.parseUShort();
            return (
              D.argument(
                1 === e && t < 1,
                "GPOS/GSUB feature variations table unknown."
              ),
              this.parseRecordList32({
                conditionSetOffset: oe.offset32,
                featureTableSubstitutionOffset: oe.offset32,
              })
            );
          }) || []
        );
      });
    var ie = {
      getByte: ee,
      getCard8: ee,
      getUShort: te,
      getCard16: te,
      getShort: function (e, t) {
        return e.getInt16(t, !1);
      },
      getULong: re,
      getFixed: ne,
      getTag: function (e, t) {
        for (var r = "", n = t; n < t + 4; n += 1)
          r += String.fromCharCode(e.getInt8(n));
        return r;
      },
      getOffset: function (e, t, r) {
        for (var n = 0, a = 0; a < r; a += 1)
          (n <<= 8), (n += e.getUint8(t + a));
        return n;
      },
      getBytes: function (e, t, r) {
        for (var n = [], a = t; a < r; a += 1) n.push(e.getUint8(a));
        return n;
      },
      bytesToString: function (e) {
        for (var t = "", r = 0; r < e.length; r += 1)
          t += String.fromCharCode(e[r]);
        return t;
      },
      Parser: oe,
    };
    function ue(e, t, r) {
      e.segments.push({
        end: t,
        start: t,
        delta: -(t - r),
        offset: 0,
        glyphIndex: r,
      });
    }
    var le = {
        parse: function (e, t) {
          var r = {};
          (r.version = ie.getUShort(e, t)),
            D.argument(0 === r.version, "cmap table version should be 0."),
            (r.numTables = ie.getUShort(e, t + 2));
          for (var n = -1, a = r.numTables - 1; a >= 0; a -= 1) {
            var o = ie.getUShort(e, t + 4 + 8 * a),
              s = ie.getUShort(e, t + 4 + 8 * a + 2);
            if (
              (3 === o && (0 === s || 1 === s || 10 === s)) ||
              (0 === o && (0 === s || 1 === s || 2 === s || 3 === s || 4 === s))
            ) {
              n = ie.getULong(e, t + 4 + 8 * a + 4);
              break;
            }
          }
          if (-1 === n) throw new Error("No valid cmap sub-tables found.");
          var i = new ie.Parser(e, t + n);
          if (((r.format = i.parseUShort()), 12 === r.format))
            !(function (e, t) {
              var r;
              t.parseUShort(),
                (e.length = t.parseULong()),
                (e.language = t.parseULong()),
                (e.groupCount = r = t.parseULong()),
                (e.glyphIndexMap = {});
              for (var n = 0; n < r; n += 1)
                for (
                  var a = t.parseULong(),
                    o = t.parseULong(),
                    s = t.parseULong(),
                    i = a;
                  i <= o;
                  i += 1
                )
                  (e.glyphIndexMap[i] = s), s++;
            })(r, i);
          else {
            if (4 !== r.format)
              throw new Error(
                "Only format 4 and 12 cmap tables are supported (found format " +
                  r.format +
                  ")."
              );
            !(function (e, t, r, n, a) {
              var o;
              (e.length = t.parseUShort()),
                (e.language = t.parseUShort()),
                (e.segCount = o = t.parseUShort() >> 1),
                t.skip("uShort", 3),
                (e.glyphIndexMap = {});
              for (
                var s = new ie.Parser(r, n + a + 14),
                  i = new ie.Parser(r, n + a + 16 + 2 * o),
                  u = new ie.Parser(r, n + a + 16 + 4 * o),
                  l = new ie.Parser(r, n + a + 16 + 6 * o),
                  p = n + a + 16 + 8 * o,
                  c = 0;
                c < o - 1;
                c += 1
              )
                for (
                  var h = void 0,
                    f = s.parseUShort(),
                    d = i.parseUShort(),
                    g = u.parseShort(),
                    v = l.parseUShort(),
                    m = d;
                  m <= f;
                  m += 1
                )
                  0 !== v
                    ? ((p = l.offset + l.relativeOffset - 2),
                      (p += v),
                      (p += 2 * (m - d)),
                      0 !== (h = ie.getUShort(r, p)) && (h = (h + g) & 65535))
                    : (h = (m + g) & 65535),
                    (e.glyphIndexMap[m] = h);
            })(r, i, e, t, n);
          }
          return r;
        },
        make: function (e) {
          var t,
            r = !0;
          for (t = e.length - 1; t > 0; t -= 1) {
            if (e.get(t).unicode > 65535) {
              console.log("Adding CMAP format 12 (needed!)"), (r = !1);
              break;
            }
          }
          var n = [
            { name: "version", type: "USHORT", value: 0 },
            { name: "numTables", type: "USHORT", value: r ? 1 : 2 },
            { name: "platformID", type: "USHORT", value: 3 },
            { name: "encodingID", type: "USHORT", value: 1 },
            { name: "offset", type: "ULONG", value: r ? 12 : 20 },
          ];
          r ||
            (n = n.concat([
              { name: "cmap12PlatformID", type: "USHORT", value: 3 },
              { name: "cmap12EncodingID", type: "USHORT", value: 10 },
              { name: "cmap12Offset", type: "ULONG", value: 0 },
            ])),
            (n = n.concat([
              { name: "format", type: "USHORT", value: 4 },
              { name: "cmap4Length", type: "USHORT", value: 0 },
              { name: "language", type: "USHORT", value: 0 },
              { name: "segCountX2", type: "USHORT", value: 0 },
              { name: "searchRange", type: "USHORT", value: 0 },
              { name: "entrySelector", type: "USHORT", value: 0 },
              { name: "rangeShift", type: "USHORT", value: 0 },
            ]));
          var a = new $.Table("cmap", n);
          for (a.segments = [], t = 0; t < e.length; t += 1) {
            for (var o = e.get(t), s = 0; s < o.unicodes.length; s += 1)
              ue(a, o.unicodes[s], t);
            a.segments = a.segments.sort(function (e, t) {
              return e.start - t.start;
            });
          }
          !(function (e) {
            e.segments.push({ end: 65535, start: 65535, delta: 1, offset: 0 });
          })(a);
          var i = a.segments.length,
            u = 0,
            l = [],
            p = [],
            c = [],
            h = [],
            f = [],
            d = [];
          for (t = 0; t < i; t += 1) {
            var g = a.segments[t];
            g.end <= 65535 && g.start <= 65535
              ? ((l = l.concat({
                  name: "end_" + t,
                  type: "USHORT",
                  value: g.end,
                })),
                (p = p.concat({
                  name: "start_" + t,
                  type: "USHORT",
                  value: g.start,
                })),
                (c = c.concat({
                  name: "idDelta_" + t,
                  type: "SHORT",
                  value: g.delta,
                })),
                (h = h.concat({
                  name: "idRangeOffset_" + t,
                  type: "USHORT",
                  value: g.offset,
                })),
                void 0 !== g.glyphId &&
                  (f = f.concat({
                    name: "glyph_" + t,
                    type: "USHORT",
                    value: g.glyphId,
                  })))
              : (u += 1),
              r ||
                void 0 === g.glyphIndex ||
                (d = (d = (d = d.concat({
                  name: "cmap12Start_" + t,
                  type: "ULONG",
                  value: g.start,
                })).concat({
                  name: "cmap12End_" + t,
                  type: "ULONG",
                  value: g.end,
                })).concat({
                  name: "cmap12Glyph_" + t,
                  type: "ULONG",
                  value: g.glyphIndex,
                }));
          }
          if (
            ((a.segCountX2 = 2 * (i - u)),
            (a.searchRange =
              2 * Math.pow(2, Math.floor(Math.log(i - u) / Math.log(2)))),
            (a.entrySelector = Math.log(a.searchRange / 2) / Math.log(2)),
            (a.rangeShift = a.segCountX2 - a.searchRange),
            (a.fields = a.fields.concat(l)),
            a.fields.push({ name: "reservedPad", type: "USHORT", value: 0 }),
            (a.fields = a.fields.concat(p)),
            (a.fields = a.fields.concat(c)),
            (a.fields = a.fields.concat(h)),
            (a.fields = a.fields.concat(f)),
            (a.cmap4Length =
              14 +
              2 * l.length +
              2 +
              2 * p.length +
              2 * c.length +
              2 * h.length +
              2 * f.length),
            !r)
          ) {
            var v = 16 + 4 * d.length;
            (a.cmap12Offset = 20 + a.cmap4Length),
              (a.fields = a.fields.concat([
                { name: "cmap12Format", type: "USHORT", value: 12 },
                { name: "cmap12Reserved", type: "USHORT", value: 0 },
                { name: "cmap12Length", type: "ULONG", value: v },
                { name: "cmap12Language", type: "ULONG", value: 0 },
                { name: "cmap12nGroups", type: "ULONG", value: d.length / 3 },
              ])),
              (a.fields = a.fields.concat(d));
          }
          return a;
        },
      },
      pe = [
        ".notdef",
        "space",
        "exclam",
        "quotedbl",
        "numbersign",
        "dollar",
        "percent",
        "ampersand",
        "quoteright",
        "parenleft",
        "parenright",
        "asterisk",
        "plus",
        "comma",
        "hyphen",
        "period",
        "slash",
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "colon",
        "semicolon",
        "less",
        "equal",
        "greater",
        "question",
        "at",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "bracketleft",
        "backslash",
        "bracketright",
        "asciicircum",
        "underscore",
        "quoteleft",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "braceleft",
        "bar",
        "braceright",
        "asciitilde",
        "exclamdown",
        "cent",
        "sterling",
        "fraction",
        "yen",
        "florin",
        "section",
        "currency",
        "quotesingle",
        "quotedblleft",
        "guillemotleft",
        "guilsinglleft",
        "guilsinglright",
        "fi",
        "fl",
        "endash",
        "dagger",
        "daggerdbl",
        "periodcentered",
        "paragraph",
        "bullet",
        "quotesinglbase",
        "quotedblbase",
        "quotedblright",
        "guillemotright",
        "ellipsis",
        "perthousand",
        "questiondown",
        "grave",
        "acute",
        "circumflex",
        "tilde",
        "macron",
        "breve",
        "dotaccent",
        "dieresis",
        "ring",
        "cedilla",
        "hungarumlaut",
        "ogonek",
        "caron",
        "emdash",
        "AE",
        "ordfeminine",
        "Lslash",
        "Oslash",
        "OE",
        "ordmasculine",
        "ae",
        "dotlessi",
        "lslash",
        "oslash",
        "oe",
        "germandbls",
        "onesuperior",
        "logicalnot",
        "mu",
        "trademark",
        "Eth",
        "onehalf",
        "plusminus",
        "Thorn",
        "onequarter",
        "divide",
        "brokenbar",
        "degree",
        "thorn",
        "threequarters",
        "twosuperior",
        "registered",
        "minus",
        "eth",
        "multiply",
        "threesuperior",
        "copyright",
        "Aacute",
        "Acircumflex",
        "Adieresis",
        "Agrave",
        "Aring",
        "Atilde",
        "Ccedilla",
        "Eacute",
        "Ecircumflex",
        "Edieresis",
        "Egrave",
        "Iacute",
        "Icircumflex",
        "Idieresis",
        "Igrave",
        "Ntilde",
        "Oacute",
        "Ocircumflex",
        "Odieresis",
        "Ograve",
        "Otilde",
        "Scaron",
        "Uacute",
        "Ucircumflex",
        "Udieresis",
        "Ugrave",
        "Yacute",
        "Ydieresis",
        "Zcaron",
        "aacute",
        "acircumflex",
        "adieresis",
        "agrave",
        "aring",
        "atilde",
        "ccedilla",
        "eacute",
        "ecircumflex",
        "edieresis",
        "egrave",
        "iacute",
        "icircumflex",
        "idieresis",
        "igrave",
        "ntilde",
        "oacute",
        "ocircumflex",
        "odieresis",
        "ograve",
        "otilde",
        "scaron",
        "uacute",
        "ucircumflex",
        "udieresis",
        "ugrave",
        "yacute",
        "ydieresis",
        "zcaron",
        "exclamsmall",
        "Hungarumlautsmall",
        "dollaroldstyle",
        "dollarsuperior",
        "ampersandsmall",
        "Acutesmall",
        "parenleftsuperior",
        "parenrightsuperior",
        "266 ff",
        "onedotenleader",
        "zerooldstyle",
        "oneoldstyle",
        "twooldstyle",
        "threeoldstyle",
        "fouroldstyle",
        "fiveoldstyle",
        "sixoldstyle",
        "sevenoldstyle",
        "eightoldstyle",
        "nineoldstyle",
        "commasuperior",
        "threequartersemdash",
        "periodsuperior",
        "questionsmall",
        "asuperior",
        "bsuperior",
        "centsuperior",
        "dsuperior",
        "esuperior",
        "isuperior",
        "lsuperior",
        "msuperior",
        "nsuperior",
        "osuperior",
        "rsuperior",
        "ssuperior",
        "tsuperior",
        "ff",
        "ffi",
        "ffl",
        "parenleftinferior",
        "parenrightinferior",
        "Circumflexsmall",
        "hyphensuperior",
        "Gravesmall",
        "Asmall",
        "Bsmall",
        "Csmall",
        "Dsmall",
        "Esmall",
        "Fsmall",
        "Gsmall",
        "Hsmall",
        "Ismall",
        "Jsmall",
        "Ksmall",
        "Lsmall",
        "Msmall",
        "Nsmall",
        "Osmall",
        "Psmall",
        "Qsmall",
        "Rsmall",
        "Ssmall",
        "Tsmall",
        "Usmall",
        "Vsmall",
        "Wsmall",
        "Xsmall",
        "Ysmall",
        "Zsmall",
        "colonmonetary",
        "onefitted",
        "rupiah",
        "Tildesmall",
        "exclamdownsmall",
        "centoldstyle",
        "Lslashsmall",
        "Scaronsmall",
        "Zcaronsmall",
        "Dieresissmall",
        "Brevesmall",
        "Caronsmall",
        "Dotaccentsmall",
        "Macronsmall",
        "figuredash",
        "hypheninferior",
        "Ogoneksmall",
        "Ringsmall",
        "Cedillasmall",
        "questiondownsmall",
        "oneeighth",
        "threeeighths",
        "fiveeighths",
        "seveneighths",
        "onethird",
        "twothirds",
        "zerosuperior",
        "foursuperior",
        "fivesuperior",
        "sixsuperior",
        "sevensuperior",
        "eightsuperior",
        "ninesuperior",
        "zeroinferior",
        "oneinferior",
        "twoinferior",
        "threeinferior",
        "fourinferior",
        "fiveinferior",
        "sixinferior",
        "seveninferior",
        "eightinferior",
        "nineinferior",
        "centinferior",
        "dollarinferior",
        "periodinferior",
        "commainferior",
        "Agravesmall",
        "Aacutesmall",
        "Acircumflexsmall",
        "Atildesmall",
        "Adieresissmall",
        "Aringsmall",
        "AEsmall",
        "Ccedillasmall",
        "Egravesmall",
        "Eacutesmall",
        "Ecircumflexsmall",
        "Edieresissmall",
        "Igravesmall",
        "Iacutesmall",
        "Icircumflexsmall",
        "Idieresissmall",
        "Ethsmall",
        "Ntildesmall",
        "Ogravesmall",
        "Oacutesmall",
        "Ocircumflexsmall",
        "Otildesmall",
        "Odieresissmall",
        "OEsmall",
        "Oslashsmall",
        "Ugravesmall",
        "Uacutesmall",
        "Ucircumflexsmall",
        "Udieresissmall",
        "Yacutesmall",
        "Thornsmall",
        "Ydieresissmall",
        "001.000",
        "001.001",
        "001.002",
        "001.003",
        "Black",
        "Bold",
        "Book",
        "Light",
        "Medium",
        "Regular",
        "Roman",
        "Semibold",
      ],
      ce = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "space",
        "exclam",
        "quotedbl",
        "numbersign",
        "dollar",
        "percent",
        "ampersand",
        "quoteright",
        "parenleft",
        "parenright",
        "asterisk",
        "plus",
        "comma",
        "hyphen",
        "period",
        "slash",
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "colon",
        "semicolon",
        "less",
        "equal",
        "greater",
        "question",
        "at",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "bracketleft",
        "backslash",
        "bracketright",
        "asciicircum",
        "underscore",
        "quoteleft",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "braceleft",
        "bar",
        "braceright",
        "asciitilde",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "exclamdown",
        "cent",
        "sterling",
        "fraction",
        "yen",
        "florin",
        "section",
        "currency",
        "quotesingle",
        "quotedblleft",
        "guillemotleft",
        "guilsinglleft",
        "guilsinglright",
        "fi",
        "fl",
        "",
        "endash",
        "dagger",
        "daggerdbl",
        "periodcentered",
        "",
        "paragraph",
        "bullet",
        "quotesinglbase",
        "quotedblbase",
        "quotedblright",
        "guillemotright",
        "ellipsis",
        "perthousand",
        "",
        "questiondown",
        "",
        "grave",
        "acute",
        "circumflex",
        "tilde",
        "macron",
        "breve",
        "dotaccent",
        "dieresis",
        "",
        "ring",
        "cedilla",
        "",
        "hungarumlaut",
        "ogonek",
        "caron",
        "emdash",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "AE",
        "",
        "ordfeminine",
        "",
        "",
        "",
        "",
        "Lslash",
        "Oslash",
        "OE",
        "ordmasculine",
        "",
        "",
        "",
        "",
        "",
        "ae",
        "",
        "",
        "",
        "dotlessi",
        "",
        "",
        "lslash",
        "oslash",
        "oe",
        "germandbls",
      ],
      he = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "space",
        "exclamsmall",
        "Hungarumlautsmall",
        "",
        "dollaroldstyle",
        "dollarsuperior",
        "ampersandsmall",
        "Acutesmall",
        "parenleftsuperior",
        "parenrightsuperior",
        "twodotenleader",
        "onedotenleader",
        "comma",
        "hyphen",
        "period",
        "fraction",
        "zerooldstyle",
        "oneoldstyle",
        "twooldstyle",
        "threeoldstyle",
        "fouroldstyle",
        "fiveoldstyle",
        "sixoldstyle",
        "sevenoldstyle",
        "eightoldstyle",
        "nineoldstyle",
        "colon",
        "semicolon",
        "commasuperior",
        "threequartersemdash",
        "periodsuperior",
        "questionsmall",
        "",
        "asuperior",
        "bsuperior",
        "centsuperior",
        "dsuperior",
        "esuperior",
        "",
        "",
        "isuperior",
        "",
        "",
        "lsuperior",
        "msuperior",
        "nsuperior",
        "osuperior",
        "",
        "",
        "rsuperior",
        "ssuperior",
        "tsuperior",
        "",
        "ff",
        "fi",
        "fl",
        "ffi",
        "ffl",
        "parenleftinferior",
        "",
        "parenrightinferior",
        "Circumflexsmall",
        "hyphensuperior",
        "Gravesmall",
        "Asmall",
        "Bsmall",
        "Csmall",
        "Dsmall",
        "Esmall",
        "Fsmall",
        "Gsmall",
        "Hsmall",
        "Ismall",
        "Jsmall",
        "Ksmall",
        "Lsmall",
        "Msmall",
        "Nsmall",
        "Osmall",
        "Psmall",
        "Qsmall",
        "Rsmall",
        "Ssmall",
        "Tsmall",
        "Usmall",
        "Vsmall",
        "Wsmall",
        "Xsmall",
        "Ysmall",
        "Zsmall",
        "colonmonetary",
        "onefitted",
        "rupiah",
        "Tildesmall",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "exclamdownsmall",
        "centoldstyle",
        "Lslashsmall",
        "",
        "",
        "Scaronsmall",
        "Zcaronsmall",
        "Dieresissmall",
        "Brevesmall",
        "Caronsmall",
        "",
        "Dotaccentsmall",
        "",
        "",
        "Macronsmall",
        "",
        "",
        "figuredash",
        "hypheninferior",
        "",
        "",
        "Ogoneksmall",
        "Ringsmall",
        "Cedillasmall",
        "",
        "",
        "",
        "onequarter",
        "onehalf",
        "threequarters",
        "questiondownsmall",
        "oneeighth",
        "threeeighths",
        "fiveeighths",
        "seveneighths",
        "onethird",
        "twothirds",
        "",
        "",
        "zerosuperior",
        "onesuperior",
        "twosuperior",
        "threesuperior",
        "foursuperior",
        "fivesuperior",
        "sixsuperior",
        "sevensuperior",
        "eightsuperior",
        "ninesuperior",
        "zeroinferior",
        "oneinferior",
        "twoinferior",
        "threeinferior",
        "fourinferior",
        "fiveinferior",
        "sixinferior",
        "seveninferior",
        "eightinferior",
        "nineinferior",
        "centinferior",
        "dollarinferior",
        "periodinferior",
        "commainferior",
        "Agravesmall",
        "Aacutesmall",
        "Acircumflexsmall",
        "Atildesmall",
        "Adieresissmall",
        "Aringsmall",
        "AEsmall",
        "Ccedillasmall",
        "Egravesmall",
        "Eacutesmall",
        "Ecircumflexsmall",
        "Edieresissmall",
        "Igravesmall",
        "Iacutesmall",
        "Icircumflexsmall",
        "Idieresissmall",
        "Ethsmall",
        "Ntildesmall",
        "Ogravesmall",
        "Oacutesmall",
        "Ocircumflexsmall",
        "Otildesmall",
        "Odieresissmall",
        "OEsmall",
        "Oslashsmall",
        "Ugravesmall",
        "Uacutesmall",
        "Ucircumflexsmall",
        "Udieresissmall",
        "Yacutesmall",
        "Thornsmall",
        "Ydieresissmall",
      ],
      fe = [
        ".notdef",
        ".null",
        "nonmarkingreturn",
        "space",
        "exclam",
        "quotedbl",
        "numbersign",
        "dollar",
        "percent",
        "ampersand",
        "quotesingle",
        "parenleft",
        "parenright",
        "asterisk",
        "plus",
        "comma",
        "hyphen",
        "period",
        "slash",
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "colon",
        "semicolon",
        "less",
        "equal",
        "greater",
        "question",
        "at",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "bracketleft",
        "backslash",
        "bracketright",
        "asciicircum",
        "underscore",
        "grave",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "braceleft",
        "bar",
        "braceright",
        "asciitilde",
        "Adieresis",
        "Aring",
        "Ccedilla",
        "Eacute",
        "Ntilde",
        "Odieresis",
        "Udieresis",
        "aacute",
        "agrave",
        "acircumflex",
        "adieresis",
        "atilde",
        "aring",
        "ccedilla",
        "eacute",
        "egrave",
        "ecircumflex",
        "edieresis",
        "iacute",
        "igrave",
        "icircumflex",
        "idieresis",
        "ntilde",
        "oacute",
        "ograve",
        "ocircumflex",
        "odieresis",
        "otilde",
        "uacute",
        "ugrave",
        "ucircumflex",
        "udieresis",
        "dagger",
        "degree",
        "cent",
        "sterling",
        "section",
        "bullet",
        "paragraph",
        "germandbls",
        "registered",
        "copyright",
        "trademark",
        "acute",
        "dieresis",
        "notequal",
        "AE",
        "Oslash",
        "infinity",
        "plusminus",
        "lessequal",
        "greaterequal",
        "yen",
        "mu",
        "partialdiff",
        "summation",
        "product",
        "pi",
        "integral",
        "ordfeminine",
        "ordmasculine",
        "Omega",
        "ae",
        "oslash",
        "questiondown",
        "exclamdown",
        "logicalnot",
        "radical",
        "florin",
        "approxequal",
        "Delta",
        "guillemotleft",
        "guillemotright",
        "ellipsis",
        "nonbreakingspace",
        "Agrave",
        "Atilde",
        "Otilde",
        "OE",
        "oe",
        "endash",
        "emdash",
        "quotedblleft",
        "quotedblright",
        "quoteleft",
        "quoteright",
        "divide",
        "lozenge",
        "ydieresis",
        "Ydieresis",
        "fraction",
        "currency",
        "guilsinglleft",
        "guilsinglright",
        "fi",
        "fl",
        "daggerdbl",
        "periodcentered",
        "quotesinglbase",
        "quotedblbase",
        "perthousand",
        "Acircumflex",
        "Ecircumflex",
        "Aacute",
        "Edieresis",
        "Egrave",
        "Iacute",
        "Icircumflex",
        "Idieresis",
        "Igrave",
        "Oacute",
        "Ocircumflex",
        "apple",
        "Ograve",
        "Uacute",
        "Ucircumflex",
        "Ugrave",
        "dotlessi",
        "circumflex",
        "tilde",
        "macron",
        "breve",
        "dotaccent",
        "ring",
        "cedilla",
        "hungarumlaut",
        "ogonek",
        "caron",
        "Lslash",
        "lslash",
        "Scaron",
        "scaron",
        "Zcaron",
        "zcaron",
        "brokenbar",
        "Eth",
        "eth",
        "Yacute",
        "yacute",
        "Thorn",
        "thorn",
        "minus",
        "multiply",
        "onesuperior",
        "twosuperior",
        "threesuperior",
        "onehalf",
        "onequarter",
        "threequarters",
        "franc",
        "Gbreve",
        "gbreve",
        "Idotaccent",
        "Scedilla",
        "scedilla",
        "Cacute",
        "cacute",
        "Ccaron",
        "ccaron",
        "dcroat",
      ];
    function de(e) {
      this.font = e;
    }
    function ge(e) {
      this.cmap = e;
    }
    function ve(e, t) {
      (this.encoding = e), (this.charset = t);
    }
    function me(e) {
      switch (e.version) {
        case 1:
          this.names = fe.slice();
          break;
        case 2:
          this.names = new Array(e.numberOfGlyphs);
          for (var t = 0; t < e.numberOfGlyphs; t++)
            e.glyphNameIndex[t] < fe.length
              ? (this.names[t] = fe[e.glyphNameIndex[t]])
              : (this.names[t] = e.names[e.glyphNameIndex[t] - fe.length]);
          break;
        case 2.5:
          this.names = new Array(e.numberOfGlyphs);
          for (var r = 0; r < e.numberOfGlyphs; r++)
            this.names[r] = fe[r + e.glyphNameIndex[r]];
          break;
        default:
          this.names = [];
      }
    }
    function ye(e, t) {
      t.lowMemory
        ? (function (e) {
            e._IndexToUnicodeMap = {};
            for (
              var t = e.tables.cmap.glyphIndexMap, r = Object.keys(t), n = 0;
              n < r.length;
              n += 1
            ) {
              var a = r[n],
                o = t[a];
              void 0 === e._IndexToUnicodeMap[o]
                ? (e._IndexToUnicodeMap[o] = { unicodes: [parseInt(a)] })
                : e._IndexToUnicodeMap[o].unicodes.push(parseInt(a));
            }
          })(e)
        : (function (e) {
            for (
              var t, r = e.tables.cmap.glyphIndexMap, n = Object.keys(r), a = 0;
              a < n.length;
              a += 1
            ) {
              var o = n[a],
                s = r[o];
              (t = e.glyphs.get(s)).addUnicode(parseInt(o));
            }
            for (var i = 0; i < e.glyphs.length; i += 1)
              (t = e.glyphs.get(i)),
                e.cffEncoding
                  ? e.isCIDFont
                    ? (t.name = "gid" + i)
                    : (t.name = e.cffEncoding.charset[i])
                  : e.glyphNames.names &&
                    (t.name = e.glyphNames.glyphIndexToName(i));
          })(e);
    }
    (de.prototype.charToGlyphIndex = function (e) {
      var t = e.codePointAt(0),
        r = this.font.glyphs;
      if (r)
        for (var n = 0; n < r.length; n += 1)
          for (var a = r.get(n), o = 0; o < a.unicodes.length; o += 1)
            if (a.unicodes[o] === t) return n;
      return null;
    }),
      (ge.prototype.charToGlyphIndex = function (e) {
        return this.cmap.glyphIndexMap[e.codePointAt(0)] || 0;
      }),
      (ve.prototype.charToGlyphIndex = function (e) {
        var t = e.codePointAt(0),
          r = this.encoding[t];
        return this.charset.indexOf(r);
      }),
      (me.prototype.nameToGlyphIndex = function (e) {
        return this.names.indexOf(e);
      }),
      (me.prototype.glyphIndexToName = function (e) {
        return this.names[e];
      });
    var be = {
      line: function (e, t, r, n, a) {
        e.beginPath(), e.moveTo(t, r), e.lineTo(n, a), e.stroke();
      },
    };
    function xe(e) {
      this.bindConstructorValues(e);
    }
    function Se(e, t, r) {
      Object.defineProperty(e, t, {
        get: function () {
          return e.path, e[r];
        },
        set: function (t) {
          e[r] = t;
        },
        enumerable: !0,
        configurable: !0,
      });
    }
    function Te(e, t) {
      if (((this.font = e), (this.glyphs = {}), Array.isArray(t)))
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.path.unitsPerEm = e.unitsPerEm), (this.glyphs[r] = n);
        }
      this.length = (t && t.length) || 0;
    }
    (xe.prototype.bindConstructorValues = function (e) {
      var t, r;
      (this.index = e.index || 0),
        (this.name = e.name || null),
        (this.unicode = e.unicode || void 0),
        (this.unicodes = e.unicodes || void 0 !== e.unicode ? [e.unicode] : []),
        "xMin" in e && (this.xMin = e.xMin),
        "yMin" in e && (this.yMin = e.yMin),
        "xMax" in e && (this.xMax = e.xMax),
        "yMax" in e && (this.yMax = e.yMax),
        "advanceWidth" in e && (this.advanceWidth = e.advanceWidth),
        Object.defineProperty(
          this,
          "path",
          ((t = e.path),
          (r = t || new L()),
          {
            configurable: !0,
            get: function () {
              return "function" == typeof r && (r = r()), r;
            },
            set: function (e) {
              r = e;
            },
          })
        );
    }),
      (xe.prototype.addUnicode = function (e) {
        0 === this.unicodes.length && (this.unicode = e), this.unicodes.push(e);
      }),
      (xe.prototype.getBoundingBox = function () {
        return this.path.getBoundingBox();
      }),
      (xe.prototype.getPath = function (e, t, r, n, a) {
        var o, s;
        (e = void 0 !== e ? e : 0),
          (t = void 0 !== t ? t : 0),
          (r = void 0 !== r ? r : 72),
          n || (n = {});
        var i = n.xScale,
          u = n.yScale;
        if (
          (n.hinting &&
            a &&
            a.hinting &&
            (s = this.path && a.hinting.exec(this, r)),
          s)
        )
          (o = a.hinting.getCommands(s)),
            (e = Math.round(e)),
            (t = Math.round(t)),
            (i = u = 1);
        else {
          o = this.path.commands;
          var l = (1 / (this.path.unitsPerEm || 1e3)) * r;
          void 0 === i && (i = l), void 0 === u && (u = l);
        }
        for (var p = new L(), c = 0; c < o.length; c += 1) {
          var h = o[c];
          "M" === h.type
            ? p.moveTo(e + h.x * i, t + -h.y * u)
            : "L" === h.type
            ? p.lineTo(e + h.x * i, t + -h.y * u)
            : "Q" === h.type
            ? p.quadraticCurveTo(
                e + h.x1 * i,
                t + -h.y1 * u,
                e + h.x * i,
                t + -h.y * u
              )
            : "C" === h.type
            ? p.curveTo(
                e + h.x1 * i,
                t + -h.y1 * u,
                e + h.x2 * i,
                t + -h.y2 * u,
                e + h.x * i,
                t + -h.y * u
              )
            : "Z" === h.type && p.closePath();
        }
        return p;
      }),
      (xe.prototype.getContours = function () {
        if (void 0 === this.points) return [];
        for (var e = [], t = [], r = 0; r < this.points.length; r += 1) {
          var n = this.points[r];
          t.push(n), n.lastPointOfContour && (e.push(t), (t = []));
        }
        return (
          D.argument(
            0 === t.length,
            "There are still points left in the current contour."
          ),
          e
        );
      }),
      (xe.prototype.getMetrics = function () {
        for (
          var e = this.path.commands, t = [], r = [], n = 0;
          n < e.length;
          n += 1
        ) {
          var a = e[n];
          "Z" !== a.type && (t.push(a.x), r.push(a.y)),
            ("Q" !== a.type && "C" !== a.type) || (t.push(a.x1), r.push(a.y1)),
            "C" === a.type && (t.push(a.x2), r.push(a.y2));
        }
        var o = {
          xMin: Math.min.apply(null, t),
          yMin: Math.min.apply(null, r),
          xMax: Math.max.apply(null, t),
          yMax: Math.max.apply(null, r),
          leftSideBearing: this.leftSideBearing,
        };
        return (
          isFinite(o.xMin) || (o.xMin = 0),
          isFinite(o.xMax) || (o.xMax = this.advanceWidth),
          isFinite(o.yMin) || (o.yMin = 0),
          isFinite(o.yMax) || (o.yMax = 0),
          (o.rightSideBearing =
            this.advanceWidth - o.leftSideBearing - (o.xMax - o.xMin)),
          o
        );
      }),
      (xe.prototype.draw = function (e, t, r, n, a) {
        this.getPath(t, r, n, a).draw(e);
      }),
      (xe.prototype.drawPoints = function (e, t, r, n) {
        function a(t, r, n, a) {
          e.beginPath();
          for (var o = 0; o < t.length; o += 1)
            e.moveTo(r + t[o].x * a, n + t[o].y * a),
              e.arc(r + t[o].x * a, n + t[o].y * a, 2, 0, 2 * Math.PI, !1);
          e.closePath(), e.fill();
        }
        (t = void 0 !== t ? t : 0),
          (r = void 0 !== r ? r : 0),
          (n = void 0 !== n ? n : 24);
        for (
          var o = (1 / this.path.unitsPerEm) * n,
            s = [],
            i = [],
            u = this.path,
            l = 0;
          l < u.commands.length;
          l += 1
        ) {
          var p = u.commands[l];
          void 0 !== p.x && s.push({ x: p.x, y: -p.y }),
            void 0 !== p.x1 && i.push({ x: p.x1, y: -p.y1 }),
            void 0 !== p.x2 && i.push({ x: p.x2, y: -p.y2 });
        }
        (e.fillStyle = "blue"),
          a(s, t, r, o),
          (e.fillStyle = "red"),
          a(i, t, r, o);
      }),
      (xe.prototype.drawMetrics = function (e, t, r, n) {
        var a;
        (t = void 0 !== t ? t : 0),
          (r = void 0 !== r ? r : 0),
          (n = void 0 !== n ? n : 24),
          (a = (1 / this.path.unitsPerEm) * n),
          (e.lineWidth = 1),
          (e.strokeStyle = "black"),
          be.line(e, t, -1e4, t, 1e4),
          be.line(e, -1e4, r, 1e4, r);
        var o = this.xMin || 0,
          s = this.yMin || 0,
          i = this.xMax || 0,
          u = this.yMax || 0,
          l = this.advanceWidth || 0;
        (e.strokeStyle = "blue"),
          be.line(e, t + o * a, -1e4, t + o * a, 1e4),
          be.line(e, t + i * a, -1e4, t + i * a, 1e4),
          be.line(e, -1e4, r + -s * a, 1e4, r + -s * a),
          be.line(e, -1e4, r + -u * a, 1e4, r + -u * a),
          (e.strokeStyle = "green"),
          be.line(e, t + l * a, -1e4, t + l * a, 1e4);
      }),
      (Te.prototype.get = function (e) {
        if (void 0 === this.glyphs[e]) {
          this.font._push(e),
            "function" == typeof this.glyphs[e] &&
              (this.glyphs[e] = this.glyphs[e]());
          var t = this.glyphs[e],
            r = this.font._IndexToUnicodeMap[e];
          if (r)
            for (var n = 0; n < r.unicodes.length; n++)
              t.addUnicode(r.unicodes[n]);
          this.font.cffEncoding
            ? this.font.isCIDFont
              ? (t.name = "gid" + e)
              : (t.name = this.font.cffEncoding.charset[e])
            : this.font.glyphNames.names &&
              (t.name = this.font.glyphNames.glyphIndexToName(e)),
            (this.glyphs[e].advanceWidth =
              this.font._hmtxTableData[e].advanceWidth),
            (this.glyphs[e].leftSideBearing =
              this.font._hmtxTableData[e].leftSideBearing);
        } else
          "function" == typeof this.glyphs[e] &&
            (this.glyphs[e] = this.glyphs[e]());
        return this.glyphs[e];
      }),
      (Te.prototype.push = function (e, t) {
        (this.glyphs[e] = t), this.length++;
      });
    var Ue = {
      GlyphSet: Te,
      glyphLoader: function (e, t) {
        return new xe({ index: t, font: e });
      },
      ttfGlyphLoader: function (e, t, r, n, a, o) {
        return function () {
          var s = new xe({ index: t, font: e });
          return (
            (s.path = function () {
              r(s, n, a);
              var t = o(e.glyphs, s);
              return (t.unitsPerEm = e.unitsPerEm), t;
            }),
            Se(s, "xMin", "_xMin"),
            Se(s, "xMax", "_xMax"),
            Se(s, "yMin", "_yMin"),
            Se(s, "yMax", "_yMax"),
            s
          );
        };
      },
      cffGlyphLoader: function (e, t, r, n) {
        return function () {
          var a = new xe({ index: t, font: e });
          return (
            (a.path = function () {
              var t = r(e, a, n);
              return (t.unitsPerEm = e.unitsPerEm), t;
            }),
            a
          );
        };
      },
    };
    function ke(e, t) {
      if (e === t) return !0;
      if (Array.isArray(e) && Array.isArray(t)) {
        if (e.length !== t.length) return !1;
        for (var r = 0; r < e.length; r += 1) if (!ke(e[r], t[r])) return !1;
        return !0;
      }
      return !1;
    }
    function Oe(e) {
      return e.length < 1240 ? 107 : e.length < 33900 ? 1131 : 32768;
    }
    function Ee(e, t, r) {
      var n,
        a,
        o = [],
        s = [],
        i = ie.getCard16(e, t);
      if (0 !== i) {
        var u = ie.getByte(e, t + 2);
        n = t + (i + 1) * u + 2;
        for (var l = t + 3, p = 0; p < i + 1; p += 1)
          o.push(ie.getOffset(e, l, u)), (l += u);
        a = n + o[i];
      } else a = t + 2;
      for (var c = 0; c < o.length - 1; c += 1) {
        var h = ie.getBytes(e, n + o[c], n + o[c + 1]);
        r && (h = r(h)), s.push(h);
      }
      return { objects: s, startOffset: t, endOffset: a };
    }
    function Re(e, t) {
      if (28 === t) return (e.parseByte() << 8) | e.parseByte();
      if (29 === t)
        return (
          (e.parseByte() << 24) |
          (e.parseByte() << 16) |
          (e.parseByte() << 8) |
          e.parseByte()
        );
      if (30 === t)
        return (function (e) {
          for (
            var t = "",
              r = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                ".",
                "E",
                "E-",
                null,
                "-",
              ];
            ;

          ) {
            var n = e.parseByte(),
              a = n >> 4,
              o = 15 & n;
            if (15 === a) break;
            if (((t += r[a]), 15 === o)) break;
            t += r[o];
          }
          return parseFloat(t);
        })(e);
      if (t >= 32 && t <= 246) return t - 139;
      if (t >= 247 && t <= 250) return 256 * (t - 247) + e.parseByte() + 108;
      if (t >= 251 && t <= 254) return 256 * -(t - 251) - e.parseByte() - 108;
      throw new Error("Invalid b0 " + t);
    }
    function Le(e, t, r) {
      t = void 0 !== t ? t : 0;
      var n = new ie.Parser(e, t),
        a = [],
        o = [];
      for (r = void 0 !== r ? r : e.length; n.relativeOffset < r; ) {
        var s = n.parseByte();
        s <= 21
          ? (12 === s && (s = 1200 + n.parseByte()), a.push([s, o]), (o = []))
          : o.push(Re(n, s));
      }
      return (function (e) {
        for (var t = {}, r = 0; r < e.length; r += 1) {
          var n = e[r][0],
            a = e[r][1],
            o = void 0;
          if (
            ((o = 1 === a.length ? a[0] : a),
            t.hasOwnProperty(n) && !isNaN(t[n]))
          )
            throw new Error("Object " + t + " already has key " + n);
          t[n] = o;
        }
        return t;
      })(a);
    }
    function we(e, t) {
      return (t = t <= 390 ? pe[t] : e[t - 391]);
    }
    function Ce(e, t, r) {
      for (var n, a = {}, o = 0; o < t.length; o += 1) {
        var s = t[o];
        if (Array.isArray(s.type)) {
          var i = [];
          i.length = s.type.length;
          for (var u = 0; u < s.type.length; u++)
            void 0 === (n = void 0 !== e[s.op] ? e[s.op][u] : void 0) &&
              (n =
                void 0 !== s.value && void 0 !== s.value[u]
                  ? s.value[u]
                  : null),
              "SID" === s.type[u] && (n = we(r, n)),
              (i[u] = n);
          a[s.name] = i;
        } else
          void 0 === (n = e[s.op]) && (n = void 0 !== s.value ? s.value : null),
            "SID" === s.type && (n = we(r, n)),
            (a[s.name] = n);
      }
      return a;
    }
    var De = [
        { name: "version", op: 0, type: "SID" },
        { name: "notice", op: 1, type: "SID" },
        { name: "copyright", op: 1200, type: "SID" },
        { name: "fullName", op: 2, type: "SID" },
        { name: "familyName", op: 3, type: "SID" },
        { name: "weight", op: 4, type: "SID" },
        { name: "isFixedPitch", op: 1201, type: "number", value: 0 },
        { name: "italicAngle", op: 1202, type: "number", value: 0 },
        { name: "underlinePosition", op: 1203, type: "number", value: -100 },
        { name: "underlineThickness", op: 1204, type: "number", value: 50 },
        { name: "paintType", op: 1205, type: "number", value: 0 },
        { name: "charstringType", op: 1206, type: "number", value: 2 },
        {
          name: "fontMatrix",
          op: 1207,
          type: ["real", "real", "real", "real", "real", "real"],
          value: [0.001, 0, 0, 0.001, 0, 0],
        },
        { name: "uniqueId", op: 13, type: "number" },
        {
          name: "fontBBox",
          op: 5,
          type: ["number", "number", "number", "number"],
          value: [0, 0, 0, 0],
        },
        { name: "strokeWidth", op: 1208, type: "number", value: 0 },
        { name: "xuid", op: 14, type: [], value: null },
        { name: "charset", op: 15, type: "offset", value: 0 },
        { name: "encoding", op: 16, type: "offset", value: 0 },
        { name: "charStrings", op: 17, type: "offset", value: 0 },
        { name: "private", op: 18, type: ["number", "offset"], value: [0, 0] },
        { name: "ros", op: 1230, type: ["SID", "SID", "number"] },
        { name: "cidFontVersion", op: 1231, type: "number", value: 0 },
        { name: "cidFontRevision", op: 1232, type: "number", value: 0 },
        { name: "cidFontType", op: 1233, type: "number", value: 0 },
        { name: "cidCount", op: 1234, type: "number", value: 8720 },
        { name: "uidBase", op: 1235, type: "number" },
        { name: "fdArray", op: 1236, type: "offset" },
        { name: "fdSelect", op: 1237, type: "offset" },
        { name: "fontName", op: 1238, type: "SID" },
      ],
      Ie = [
        { name: "subrs", op: 19, type: "offset", value: 0 },
        { name: "defaultWidthX", op: 20, type: "number", value: 0 },
        { name: "nominalWidthX", op: 21, type: "number", value: 0 },
      ];
    function Me(e, t) {
      return Ce(Le(e, 0, e.byteLength), De, t);
    }
    function Ge(e, t, r, n) {
      return Ce(Le(e, t, r), Ie, n);
    }
    function Ne(e, t, r, n) {
      for (var a = [], o = 0; o < r.length; o += 1) {
        var s = Me(new DataView(new Uint8Array(r[o]).buffer), n);
        (s._subrs = []),
          (s._subrsBias = 0),
          (s._defaultWidthX = 0),
          (s._nominalWidthX = 0);
        var i = s.private[0],
          u = s.private[1];
        if (0 !== i && 0 !== u) {
          var l = Ge(e, u + t, i, n);
          if (
            ((s._defaultWidthX = l.defaultWidthX),
            (s._nominalWidthX = l.nominalWidthX),
            0 !== l.subrs)
          ) {
            var p = Ee(e, u + l.subrs + t);
            (s._subrs = p.objects), (s._subrsBias = Oe(s._subrs));
          }
          s._privateDict = l;
        }
        a.push(s);
      }
      return a;
    }
    function Fe(e, t, r) {
      var n,
        a,
        o,
        s,
        i,
        u,
        l,
        p,
        c = new L(),
        h = [],
        f = 0,
        d = !1,
        g = !1,
        v = 0,
        m = 0;
      if (e.isCIDFont) {
        var y = e.tables.cff.topDict._fdSelect[t.index],
          b = e.tables.cff.topDict._fdArray[y];
        (i = b._subrs),
          (u = b._subrsBias),
          (l = b._defaultWidthX),
          (p = b._nominalWidthX);
      } else
        (i = e.tables.cff.topDict._subrs),
          (u = e.tables.cff.topDict._subrsBias),
          (l = e.tables.cff.topDict._defaultWidthX),
          (p = e.tables.cff.topDict._nominalWidthX);
      var x = l;
      function S(e, t) {
        g && c.closePath(), c.moveTo(e, t), (g = !0);
      }
      function T() {
        h.length % 2 != 0 && !d && (x = h.shift() + p),
          (f += h.length >> 1),
          (h.length = 0),
          (d = !0);
      }
      return (
        (function r(l) {
          for (var y, b, U, k, O, E, R, L, w, C, D, I, M = 0; M < l.length; ) {
            var G = l[M];
            switch (((M += 1), G)) {
              case 1:
              case 3:
              case 18:
              case 23:
                T();
                break;
              case 4:
                h.length > 1 && !d && ((x = h.shift() + p), (d = !0)),
                  (m += h.pop()),
                  S(v, m);
                break;
              case 5:
                for (; h.length > 0; )
                  (v += h.shift()), (m += h.shift()), c.lineTo(v, m);
                break;
              case 6:
                for (
                  ;
                  h.length > 0 &&
                  ((v += h.shift()), c.lineTo(v, m), 0 !== h.length);

                )
                  (m += h.shift()), c.lineTo(v, m);
                break;
              case 7:
                for (
                  ;
                  h.length > 0 &&
                  ((m += h.shift()), c.lineTo(v, m), 0 !== h.length);

                )
                  (v += h.shift()), c.lineTo(v, m);
                break;
              case 8:
                for (; h.length > 0; )
                  (n = v + h.shift()),
                    (a = m + h.shift()),
                    (o = n + h.shift()),
                    (s = a + h.shift()),
                    (v = o + h.shift()),
                    (m = s + h.shift()),
                    c.curveTo(n, a, o, s, v, m);
                break;
              case 10:
                (O = h.pop() + u), (E = i[O]) && r(E);
                break;
              case 11:
                return;
              case 12:
                switch (((G = l[M]), (M += 1), G)) {
                  case 35:
                    (n = v + h.shift()),
                      (a = m + h.shift()),
                      (o = n + h.shift()),
                      (s = a + h.shift()),
                      (R = o + h.shift()),
                      (L = s + h.shift()),
                      (w = R + h.shift()),
                      (C = L + h.shift()),
                      (D = w + h.shift()),
                      (I = C + h.shift()),
                      (v = D + h.shift()),
                      (m = I + h.shift()),
                      h.shift(),
                      c.curveTo(n, a, o, s, R, L),
                      c.curveTo(w, C, D, I, v, m);
                    break;
                  case 34:
                    (n = v + h.shift()),
                      (a = m),
                      (o = n + h.shift()),
                      (s = a + h.shift()),
                      (R = o + h.shift()),
                      (L = s),
                      (w = R + h.shift()),
                      (C = s),
                      (D = w + h.shift()),
                      (I = m),
                      (v = D + h.shift()),
                      c.curveTo(n, a, o, s, R, L),
                      c.curveTo(w, C, D, I, v, m);
                    break;
                  case 36:
                    (n = v + h.shift()),
                      (a = m + h.shift()),
                      (o = n + h.shift()),
                      (s = a + h.shift()),
                      (R = o + h.shift()),
                      (L = s),
                      (w = R + h.shift()),
                      (C = s),
                      (D = w + h.shift()),
                      (I = C + h.shift()),
                      (v = D + h.shift()),
                      c.curveTo(n, a, o, s, R, L),
                      c.curveTo(w, C, D, I, v, m);
                    break;
                  case 37:
                    (n = v + h.shift()),
                      (a = m + h.shift()),
                      (o = n + h.shift()),
                      (s = a + h.shift()),
                      (R = o + h.shift()),
                      (L = s + h.shift()),
                      (w = R + h.shift()),
                      (C = L + h.shift()),
                      (D = w + h.shift()),
                      (I = C + h.shift()),
                      Math.abs(D - v) > Math.abs(I - m)
                        ? (v = D + h.shift())
                        : (m = I + h.shift()),
                      c.curveTo(n, a, o, s, R, L),
                      c.curveTo(w, C, D, I, v, m);
                    break;
                  default:
                    console.log(
                      "Glyph " + t.index + ": unknown operator 1200" + G
                    ),
                      (h.length = 0);
                }
                break;
              case 14:
                h.length > 0 && !d && ((x = h.shift() + p), (d = !0)),
                  g && (c.closePath(), (g = !1));
                break;
              case 19:
              case 20:
                T(), (M += (f + 7) >> 3);
                break;
              case 21:
                h.length > 2 && !d && ((x = h.shift() + p), (d = !0)),
                  (m += h.pop()),
                  S((v += h.pop()), m);
                break;
              case 22:
                h.length > 1 && !d && ((x = h.shift() + p), (d = !0)),
                  S((v += h.pop()), m);
                break;
              case 24:
                for (; h.length > 2; )
                  (n = v + h.shift()),
                    (a = m + h.shift()),
                    (o = n + h.shift()),
                    (s = a + h.shift()),
                    (v = o + h.shift()),
                    (m = s + h.shift()),
                    c.curveTo(n, a, o, s, v, m);
                (v += h.shift()), (m += h.shift()), c.lineTo(v, m);
                break;
              case 25:
                for (; h.length > 6; )
                  (v += h.shift()), (m += h.shift()), c.lineTo(v, m);
                (n = v + h.shift()),
                  (a = m + h.shift()),
                  (o = n + h.shift()),
                  (s = a + h.shift()),
                  (v = o + h.shift()),
                  (m = s + h.shift()),
                  c.curveTo(n, a, o, s, v, m);
                break;
              case 26:
                for (h.length % 2 && (v += h.shift()); h.length > 0; )
                  (n = v),
                    (a = m + h.shift()),
                    (o = n + h.shift()),
                    (s = a + h.shift()),
                    (v = o),
                    (m = s + h.shift()),
                    c.curveTo(n, a, o, s, v, m);
                break;
              case 27:
                for (h.length % 2 && (m += h.shift()); h.length > 0; )
                  (n = v + h.shift()),
                    (a = m),
                    (o = n + h.shift()),
                    (s = a + h.shift()),
                    (v = o + h.shift()),
                    (m = s),
                    c.curveTo(n, a, o, s, v, m);
                break;
              case 28:
                (y = l[M]),
                  (b = l[M + 1]),
                  h.push(((y << 24) | (b << 16)) >> 16),
                  (M += 2);
                break;
              case 29:
                (O = h.pop() + e.gsubrsBias), (E = e.gsubrs[O]) && r(E);
                break;
              case 30:
                for (
                  ;
                  h.length > 0 &&
                  ((n = v),
                  (a = m + h.shift()),
                  (o = n + h.shift()),
                  (s = a + h.shift()),
                  (v = o + h.shift()),
                  (m = s + (1 === h.length ? h.shift() : 0)),
                  c.curveTo(n, a, o, s, v, m),
                  0 !== h.length);

                )
                  (n = v + h.shift()),
                    (a = m),
                    (o = n + h.shift()),
                    (s = a + h.shift()),
                    (m = s + h.shift()),
                    (v = o + (1 === h.length ? h.shift() : 0)),
                    c.curveTo(n, a, o, s, v, m);
                break;
              case 31:
                for (
                  ;
                  h.length > 0 &&
                  ((n = v + h.shift()),
                  (a = m),
                  (o = n + h.shift()),
                  (s = a + h.shift()),
                  (m = s + h.shift()),
                  (v = o + (1 === h.length ? h.shift() : 0)),
                  c.curveTo(n, a, o, s, v, m),
                  0 !== h.length);

                )
                  (n = v),
                    (a = m + h.shift()),
                    (o = n + h.shift()),
                    (s = a + h.shift()),
                    (v = o + h.shift()),
                    (m = s + (1 === h.length ? h.shift() : 0)),
                    c.curveTo(n, a, o, s, v, m);
                break;
              default:
                G < 32
                  ? console.log("Glyph " + t.index + ": unknown operator " + G)
                  : G < 247
                  ? h.push(G - 139)
                  : G < 251
                  ? ((y = l[M]), (M += 1), h.push(256 * (G - 247) + y + 108))
                  : G < 255
                  ? ((y = l[M]), (M += 1), h.push(256 * -(G - 251) - y - 108))
                  : ((y = l[M]),
                    (b = l[M + 1]),
                    (U = l[M + 2]),
                    (k = l[M + 3]),
                    (M += 4),
                    h.push(((y << 24) | (b << 16) | (U << 8) | k) / 65536));
            }
          }
        })(r),
        (t.advanceWidth = x),
        c
      );
    }
    function Be(e, t) {
      var r,
        n = pe.indexOf(e);
      return (
        n >= 0 && (r = n),
        (n = t.indexOf(e)) >= 0
          ? (r = n + pe.length)
          : ((r = pe.length + t.length), t.push(e)),
        r
      );
    }
    function Ae(e, t, r) {
      for (var n = {}, a = 0; a < e.length; a += 1) {
        var o = e[a],
          s = t[o.name];
        void 0 === s ||
          ke(s, o.value) ||
          ("SID" === o.type && (s = Be(s, r)),
          (n[o.op] = { name: o.name, type: o.type, value: s }));
      }
      return n;
    }
    function Pe(e, t) {
      var r = new $.Record("Top DICT", [
        { name: "dict", type: "DICT", value: {} },
      ]);
      return (r.dict = Ae(De, e, t)), r;
    }
    function He(e) {
      var t = new $.Record("Top DICT INDEX", [
        { name: "topDicts", type: "INDEX", value: [] },
      ]);
      return (t.topDicts = [{ name: "topDict_0", type: "TABLE", value: e }]), t;
    }
    function ze(e) {
      var t = [],
        r = e.path;
      t.push({ name: "width", type: "NUMBER", value: e.advanceWidth });
      for (var n = 0, a = 0, o = 0; o < r.commands.length; o += 1) {
        var s = void 0,
          i = void 0,
          u = r.commands[o];
        if ("Q" === u.type) {
          var l = 1 / 3,
            p = 2 / 3;
          u = {
            type: "C",
            x: u.x,
            y: u.y,
            x1: Math.round(l * n + p * u.x1),
            y1: Math.round(l * a + p * u.y1),
            x2: Math.round(l * u.x + p * u.x1),
            y2: Math.round(l * u.y + p * u.y1),
          };
        }
        if ("M" === u.type)
          (s = Math.round(u.x - n)),
            (i = Math.round(u.y - a)),
            t.push({ name: "dx", type: "NUMBER", value: s }),
            t.push({ name: "dy", type: "NUMBER", value: i }),
            t.push({ name: "rmoveto", type: "OP", value: 21 }),
            (n = Math.round(u.x)),
            (a = Math.round(u.y));
        else if ("L" === u.type)
          (s = Math.round(u.x - n)),
            (i = Math.round(u.y - a)),
            t.push({ name: "dx", type: "NUMBER", value: s }),
            t.push({ name: "dy", type: "NUMBER", value: i }),
            t.push({ name: "rlineto", type: "OP", value: 5 }),
            (n = Math.round(u.x)),
            (a = Math.round(u.y));
        else if ("C" === u.type) {
          var c = Math.round(u.x1 - n),
            h = Math.round(u.y1 - a),
            f = Math.round(u.x2 - u.x1),
            d = Math.round(u.y2 - u.y1);
          (s = Math.round(u.x - u.x2)),
            (i = Math.round(u.y - u.y2)),
            t.push({ name: "dx1", type: "NUMBER", value: c }),
            t.push({ name: "dy1", type: "NUMBER", value: h }),
            t.push({ name: "dx2", type: "NUMBER", value: f }),
            t.push({ name: "dy2", type: "NUMBER", value: d }),
            t.push({ name: "dx", type: "NUMBER", value: s }),
            t.push({ name: "dy", type: "NUMBER", value: i }),
            t.push({ name: "rrcurveto", type: "OP", value: 8 }),
            (n = Math.round(u.x)),
            (a = Math.round(u.y));
        }
      }
      return t.push({ name: "endchar", type: "OP", value: 14 }), t;
    }
    var We = {
      parse: function (e, t, r, n) {
        r.tables.cff = {};
        var a = (function (e, t) {
            var r = {};
            return (
              (r.formatMajor = ie.getCard8(e, t)),
              (r.formatMinor = ie.getCard8(e, t + 1)),
              (r.size = ie.getCard8(e, t + 2)),
              (r.offsetSize = ie.getCard8(e, t + 3)),
              (r.startOffset = t),
              (r.endOffset = t + 4),
              r
            );
          })(e, t),
          o = Ee(e, a.endOffset, ie.bytesToString),
          s = Ee(e, o.endOffset),
          i = Ee(e, s.endOffset, ie.bytesToString),
          u = Ee(e, i.endOffset);
        (r.gsubrs = u.objects), (r.gsubrsBias = Oe(r.gsubrs));
        var l = Ne(e, t, s.objects, i.objects);
        if (1 !== l.length)
          throw new Error(
            "CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = " +
              l.length
          );
        var p = l[0];
        if (
          ((r.tables.cff.topDict = p),
          p._privateDict &&
            ((r.defaultWidthX = p._privateDict.defaultWidthX),
            (r.nominalWidthX = p._privateDict.nominalWidthX)),
          void 0 !== p.ros[0] && void 0 !== p.ros[1] && (r.isCIDFont = !0),
          r.isCIDFont)
        ) {
          var c = p.fdArray,
            h = p.fdSelect;
          if (0 === c || 0 === h)
            throw new Error(
              "Font is marked as a CID font, but FDArray and/or FDSelect information is missing"
            );
          var f = Ee(e, (c += t)),
            d = Ne(e, t, f.objects, i.objects);
          (p._fdArray = d),
            (h += t),
            (p._fdSelect = (function (e, t, r, n) {
              var a,
                o = [],
                s = new ie.Parser(e, t),
                i = s.parseCard8();
              if (0 === i)
                for (var u = 0; u < r; u++) {
                  if ((a = s.parseCard8()) >= n)
                    throw new Error(
                      "CFF table CID Font FDSelect has bad FD index value " +
                        a +
                        " (FD count " +
                        n +
                        ")"
                    );
                  o.push(a);
                }
              else {
                if (3 !== i)
                  throw new Error(
                    "CFF Table CID Font FDSelect table has unsupported format " +
                      i
                  );
                var l,
                  p = s.parseCard16(),
                  c = s.parseCard16();
                if (0 !== c)
                  throw new Error(
                    "CFF Table CID Font FDSelect format 3 range has bad initial GID " +
                      c
                  );
                for (var h = 0; h < p; h++) {
                  if (((a = s.parseCard8()), (l = s.parseCard16()), a >= n))
                    throw new Error(
                      "CFF table CID Font FDSelect has bad FD index value " +
                        a +
                        " (FD count " +
                        n +
                        ")"
                    );
                  if (l > r)
                    throw new Error(
                      "CFF Table CID Font FDSelect format 3 range has bad GID " +
                        l
                    );
                  for (; c < l; c++) o.push(a);
                  c = l;
                }
                if (l !== r)
                  throw new Error(
                    "CFF Table CID Font FDSelect format 3 range has bad final GID " +
                      l
                  );
              }
              return o;
            })(e, h, r.numGlyphs, d.length));
        }
        var g,
          v = t + p.private[1],
          m = Ge(e, v, p.private[0], i.objects);
        if (
          ((r.defaultWidthX = m.defaultWidthX),
          (r.nominalWidthX = m.nominalWidthX),
          0 !== m.subrs)
        ) {
          var y = v + m.subrs,
            b = Ee(e, y);
          (r.subrs = b.objects), (r.subrsBias = Oe(r.subrs));
        } else (r.subrs = []), (r.subrsBias = 0);
        n.lowMemory
          ? ((g = (function (e, t) {
              var r,
                n,
                a = [],
                o = ie.getCard16(e, t);
              if (0 !== o) {
                var s = ie.getByte(e, t + 2);
                r = t + (o + 1) * s + 2;
                for (var i = t + 3, u = 0; u < o + 1; u += 1)
                  a.push(ie.getOffset(e, i, s)), (i += s);
                n = r + a[o];
              } else n = t + 2;
              return { offsets: a, startOffset: t, endOffset: n };
            })(e, t + p.charStrings)),
            (r.nGlyphs = g.offsets.length))
          : ((g = Ee(e, t + p.charStrings)), (r.nGlyphs = g.objects.length));
        var x = (function (e, t, r, n) {
          var a,
            o,
            s = new ie.Parser(e, t);
          r -= 1;
          var i = [".notdef"],
            u = s.parseCard8();
          if (0 === u)
            for (var l = 0; l < r; l += 1) (a = s.parseSID()), i.push(we(n, a));
          else if (1 === u)
            for (; i.length <= r; ) {
              (a = s.parseSID()), (o = s.parseCard8());
              for (var p = 0; p <= o; p += 1) i.push(we(n, a)), (a += 1);
            }
          else {
            if (2 !== u) throw new Error("Unknown charset format " + u);
            for (; i.length <= r; ) {
              (a = s.parseSID()), (o = s.parseCard16());
              for (var c = 0; c <= o; c += 1) i.push(we(n, a)), (a += 1);
            }
          }
          return i;
        })(e, t + p.charset, r.nGlyphs, i.objects);
        if (
          (0 === p.encoding
            ? (r.cffEncoding = new ve(ce, x))
            : 1 === p.encoding
            ? (r.cffEncoding = new ve(he, x))
            : (r.cffEncoding = (function (e, t, r) {
                var n,
                  a = {},
                  o = new ie.Parser(e, t),
                  s = o.parseCard8();
                if (0 === s)
                  for (var i = o.parseCard8(), u = 0; u < i; u += 1)
                    a[(n = o.parseCard8())] = u;
                else {
                  if (1 !== s) throw new Error("Unknown encoding format " + s);
                  var l = o.parseCard8();
                  n = 1;
                  for (var p = 0; p < l; p += 1)
                    for (
                      var c = o.parseCard8(), h = o.parseCard8(), f = c;
                      f <= c + h;
                      f += 1
                    )
                      (a[f] = n), (n += 1);
                }
                return new ve(a, r);
              })(e, t + p.encoding, x)),
          (r.encoding = r.encoding || r.cffEncoding),
          (r.glyphs = new Ue.GlyphSet(r)),
          n.lowMemory)
        )
          r._push = function (n) {
            var a = (function (e, t, r, n, a) {
              var o = ie.getCard16(r, n),
                s = 0;
              0 !== o && (s = n + (o + 1) * ie.getByte(r, n + 2) + 2);
              var i = ie.getBytes(r, s + t[e], s + t[e + 1]);
              return a && (i = a(i)), i;
            })(n, g.offsets, e, t + p.charStrings);
            r.glyphs.push(n, Ue.cffGlyphLoader(r, n, Fe, a));
          };
        else
          for (var S = 0; S < r.nGlyphs; S += 1) {
            var T = g.objects[S];
            r.glyphs.push(S, Ue.cffGlyphLoader(r, S, Fe, T));
          }
      },
      make: function (e, t) {
        for (
          var r,
            n = new $.Table("CFF ", [
              { name: "header", type: "RECORD" },
              { name: "nameIndex", type: "RECORD" },
              { name: "topDictIndex", type: "RECORD" },
              { name: "stringIndex", type: "RECORD" },
              { name: "globalSubrIndex", type: "RECORD" },
              { name: "charsets", type: "RECORD" },
              { name: "charStringsIndex", type: "RECORD" },
              { name: "privateDict", type: "RECORD" },
            ]),
            a = 1 / t.unitsPerEm,
            o = {
              version: t.version,
              fullName: t.fullName,
              familyName: t.familyName,
              weight: t.weightName,
              fontBBox: t.fontBBox || [0, 0, 0, 0],
              fontMatrix: [a, 0, 0, a, 0, 0],
              charset: 999,
              encoding: 0,
              charStrings: 999,
              private: [0, 999],
            },
            s = [],
            i = 1;
          i < e.length;
          i += 1
        )
          (r = e.get(i)), s.push(r.name);
        var u = [];
        (n.header = new $.Record("Header", [
          { name: "major", type: "Card8", value: 1 },
          { name: "minor", type: "Card8", value: 0 },
          { name: "hdrSize", type: "Card8", value: 4 },
          { name: "major", type: "Card8", value: 1 },
        ])),
          (n.nameIndex = (function (e) {
            var t = new $.Record("Name INDEX", [
              { name: "names", type: "INDEX", value: [] },
            ]);
            t.names = [];
            for (var r = 0; r < e.length; r += 1)
              t.names.push({ name: "name_" + r, type: "NAME", value: e[r] });
            return t;
          })([t.postScriptName]));
        var l = Pe(o, u);
        (n.topDictIndex = He(l)),
          (n.globalSubrIndex = new $.Record("Global Subr INDEX", [
            { name: "subrs", type: "INDEX", value: [] },
          ])),
          (n.charsets = (function (e, t) {
            for (
              var r = new $.Record("Charsets", [
                  { name: "format", type: "Card8", value: 0 },
                ]),
                n = 0;
              n < e.length;
              n += 1
            ) {
              var a = Be(e[n], t);
              r.fields.push({ name: "glyph_" + n, type: "SID", value: a });
            }
            return r;
          })(s, u)),
          (n.charStringsIndex = (function (e) {
            for (
              var t = new $.Record("CharStrings INDEX", [
                  { name: "charStrings", type: "INDEX", value: [] },
                ]),
                r = 0;
              r < e.length;
              r += 1
            ) {
              var n = e.get(r),
                a = ze(n);
              t.charStrings.push({
                name: n.name,
                type: "CHARSTRING",
                value: a,
              });
            }
            return t;
          })(e)),
          (n.privateDict = (function (e, t) {
            var r = new $.Record("Private DICT", [
              { name: "dict", type: "DICT", value: {} },
            ]);
            return (r.dict = Ae(Ie, e, t)), r;
          })({}, u)),
          (n.stringIndex = (function (e) {
            var t = new $.Record("String INDEX", [
              { name: "strings", type: "INDEX", value: [] },
            ]);
            t.strings = [];
            for (var r = 0; r < e.length; r += 1)
              t.strings.push({
                name: "string_" + r,
                type: "STRING",
                value: e[r],
              });
            return t;
          })(u));
        var p =
          n.header.sizeOf() +
          n.nameIndex.sizeOf() +
          n.topDictIndex.sizeOf() +
          n.stringIndex.sizeOf() +
          n.globalSubrIndex.sizeOf();
        return (
          (o.charset = p),
          (o.encoding = 0),
          (o.charStrings = o.charset + n.charsets.sizeOf()),
          (o.private[1] = o.charStrings + n.charStringsIndex.sizeOf()),
          (l = Pe(o, u)),
          (n.topDictIndex = He(l)),
          n
        );
      },
    };
    var _e = {
      parse: function (e, t) {
        var r = {},
          n = new ie.Parser(e, t);
        return (
          (r.version = n.parseVersion()),
          (r.fontRevision = Math.round(1e3 * n.parseFixed()) / 1e3),
          (r.checkSumAdjustment = n.parseULong()),
          (r.magicNumber = n.parseULong()),
          D.argument(
            1594834165 === r.magicNumber,
            "Font header has wrong magic number."
          ),
          (r.flags = n.parseUShort()),
          (r.unitsPerEm = n.parseUShort()),
          (r.created = n.parseLongDateTime()),
          (r.modified = n.parseLongDateTime()),
          (r.xMin = n.parseShort()),
          (r.yMin = n.parseShort()),
          (r.xMax = n.parseShort()),
          (r.yMax = n.parseShort()),
          (r.macStyle = n.parseUShort()),
          (r.lowestRecPPEM = n.parseUShort()),
          (r.fontDirectionHint = n.parseShort()),
          (r.indexToLocFormat = n.parseShort()),
          (r.glyphDataFormat = n.parseShort()),
          r
        );
      },
      make: function (e) {
        var t = Math.round(new Date().getTime() / 1e3) + 2082844800,
          r = t;
        return (
          e.createdTimestamp && (r = e.createdTimestamp + 2082844800),
          new $.Table(
            "head",
            [
              { name: "version", type: "FIXED", value: 65536 },
              { name: "fontRevision", type: "FIXED", value: 65536 },
              { name: "checkSumAdjustment", type: "ULONG", value: 0 },
              { name: "magicNumber", type: "ULONG", value: 1594834165 },
              { name: "flags", type: "USHORT", value: 0 },
              { name: "unitsPerEm", type: "USHORT", value: 1e3 },
              { name: "created", type: "LONGDATETIME", value: r },
              { name: "modified", type: "LONGDATETIME", value: t },
              { name: "xMin", type: "SHORT", value: 0 },
              { name: "yMin", type: "SHORT", value: 0 },
              { name: "xMax", type: "SHORT", value: 0 },
              { name: "yMax", type: "SHORT", value: 0 },
              { name: "macStyle", type: "USHORT", value: 0 },
              { name: "lowestRecPPEM", type: "USHORT", value: 0 },
              { name: "fontDirectionHint", type: "SHORT", value: 2 },
              { name: "indexToLocFormat", type: "SHORT", value: 0 },
              { name: "glyphDataFormat", type: "SHORT", value: 0 },
            ],
            e
          )
        );
      },
    };
    var qe = {
      parse: function (e, t) {
        var r = {},
          n = new ie.Parser(e, t);
        return (
          (r.version = n.parseVersion()),
          (r.ascender = n.parseShort()),
          (r.descender = n.parseShort()),
          (r.lineGap = n.parseShort()),
          (r.advanceWidthMax = n.parseUShort()),
          (r.minLeftSideBearing = n.parseShort()),
          (r.minRightSideBearing = n.parseShort()),
          (r.xMaxExtent = n.parseShort()),
          (r.caretSlopeRise = n.parseShort()),
          (r.caretSlopeRun = n.parseShort()),
          (r.caretOffset = n.parseShort()),
          (n.relativeOffset += 8),
          (r.metricDataFormat = n.parseShort()),
          (r.numberOfHMetrics = n.parseUShort()),
          r
        );
      },
      make: function (e) {
        return new $.Table(
          "hhea",
          [
            { name: "version", type: "FIXED", value: 65536 },
            { name: "ascender", type: "FWORD", value: 0 },
            { name: "descender", type: "FWORD", value: 0 },
            { name: "lineGap", type: "FWORD", value: 0 },
            { name: "advanceWidthMax", type: "UFWORD", value: 0 },
            { name: "minLeftSideBearing", type: "FWORD", value: 0 },
            { name: "minRightSideBearing", type: "FWORD", value: 0 },
            { name: "xMaxExtent", type: "FWORD", value: 0 },
            { name: "caretSlopeRise", type: "SHORT", value: 1 },
            { name: "caretSlopeRun", type: "SHORT", value: 0 },
            { name: "caretOffset", type: "SHORT", value: 0 },
            { name: "reserved1", type: "SHORT", value: 0 },
            { name: "reserved2", type: "SHORT", value: 0 },
            { name: "reserved3", type: "SHORT", value: 0 },
            { name: "reserved4", type: "SHORT", value: 0 },
            { name: "metricDataFormat", type: "SHORT", value: 0 },
            { name: "numberOfHMetrics", type: "USHORT", value: 0 },
          ],
          e
        );
      },
    };
    var je = {
      parse: function (e, t, r, n, a, o, s) {
        s.lowMemory
          ? (function (e, t, r, n, a) {
              var o, s;
              e._hmtxTableData = {};
              for (var i = new ie.Parser(t, r), u = 0; u < a; u += 1)
                u < n && ((o = i.parseUShort()), (s = i.parseShort())),
                  (e._hmtxTableData[u] = {
                    advanceWidth: o,
                    leftSideBearing: s,
                  });
            })(e, t, r, n, a)
          : (function (e, t, r, n, a) {
              for (var o, s, i = new ie.Parser(e, t), u = 0; u < n; u += 1) {
                u < r && ((o = i.parseUShort()), (s = i.parseShort()));
                var l = a.get(u);
                (l.advanceWidth = o), (l.leftSideBearing = s);
              }
            })(t, r, n, a, o);
      },
      make: function (e) {
        for (var t = new $.Table("hmtx", []), r = 0; r < e.length; r += 1) {
          var n = e.get(r),
            a = n.advanceWidth || 0,
            o = n.leftSideBearing || 0;
          t.fields.push({
            name: "advanceWidth_" + r,
            type: "USHORT",
            value: a,
          }),
            t.fields.push({
              name: "leftSideBearing_" + r,
              type: "SHORT",
              value: o,
            });
        }
        return t;
      },
    };
    var Xe = {
      make: function (e) {
        for (
          var t = new $.Table("ltag", [
              { name: "version", type: "ULONG", value: 1 },
              { name: "flags", type: "ULONG", value: 0 },
              { name: "numTags", type: "ULONG", value: e.length },
            ]),
            r = "",
            n = 12 + 4 * e.length,
            a = 0;
          a < e.length;
          ++a
        ) {
          var o = r.indexOf(e[a]);
          o < 0 && ((o = r.length), (r += e[a])),
            t.fields.push({
              name: "offset " + a,
              type: "USHORT",
              value: n + o,
            }),
            t.fields.push({
              name: "length " + a,
              type: "USHORT",
              value: e[a].length,
            });
        }
        return (
          t.fields.push({ name: "stringPool", type: "CHARARRAY", value: r }), t
        );
      },
      parse: function (e, t) {
        var r = new ie.Parser(e, t),
          n = r.parseULong();
        D.argument(1 === n, "Unsupported ltag table version."),
          r.skip("uLong", 1);
        for (var a = r.parseULong(), o = [], s = 0; s < a; s++) {
          for (
            var i = "", u = t + r.parseUShort(), l = r.parseUShort(), p = u;
            p < u + l;
            ++p
          )
            i += String.fromCharCode(e.getInt8(p));
          o.push(i);
        }
        return o;
      },
    };
    var Ye = {
        parse: function (e, t) {
          var r = {},
            n = new ie.Parser(e, t);
          return (
            (r.version = n.parseVersion()),
            (r.numGlyphs = n.parseUShort()),
            1 === r.version &&
              ((r.maxPoints = n.parseUShort()),
              (r.maxContours = n.parseUShort()),
              (r.maxCompositePoints = n.parseUShort()),
              (r.maxCompositeContours = n.parseUShort()),
              (r.maxZones = n.parseUShort()),
              (r.maxTwilightPoints = n.parseUShort()),
              (r.maxStorage = n.parseUShort()),
              (r.maxFunctionDefs = n.parseUShort()),
              (r.maxInstructionDefs = n.parseUShort()),
              (r.maxStackElements = n.parseUShort()),
              (r.maxSizeOfInstructions = n.parseUShort()),
              (r.maxComponentElements = n.parseUShort()),
              (r.maxComponentDepth = n.parseUShort())),
            r
          );
        },
        make: function (e) {
          return new $.Table("maxp", [
            { name: "version", type: "FIXED", value: 20480 },
            { name: "numGlyphs", type: "USHORT", value: e },
          ]);
        },
      },
      Ve = [
        "copyright",
        "fontFamily",
        "fontSubfamily",
        "uniqueID",
        "fullName",
        "version",
        "postScriptName",
        "trademark",
        "manufacturer",
        "designer",
        "description",
        "manufacturerURL",
        "designerURL",
        "license",
        "licenseURL",
        "reserved",
        "preferredFamily",
        "preferredSubfamily",
        "compatibleFullName",
        "sampleText",
        "postScriptFindFontName",
        "wwsFamily",
        "wwsSubfamily",
      ],
      Ze = {
        0: "en",
        1: "fr",
        2: "de",
        3: "it",
        4: "nl",
        5: "sv",
        6: "es",
        7: "da",
        8: "pt",
        9: "no",
        10: "he",
        11: "ja",
        12: "ar",
        13: "fi",
        14: "el",
        15: "is",
        16: "mt",
        17: "tr",
        18: "hr",
        19: "zh-Hant",
        20: "ur",
        21: "hi",
        22: "th",
        23: "ko",
        24: "lt",
        25: "pl",
        26: "hu",
        27: "es",
        28: "lv",
        29: "se",
        30: "fo",
        31: "fa",
        32: "ru",
        33: "zh",
        34: "nl-BE",
        35: "ga",
        36: "sq",
        37: "ro",
        38: "cz",
        39: "sk",
        40: "si",
        41: "yi",
        42: "sr",
        43: "mk",
        44: "bg",
        45: "uk",
        46: "be",
        47: "uz",
        48: "kk",
        49: "az-Cyrl",
        50: "az-Arab",
        51: "hy",
        52: "ka",
        53: "mo",
        54: "ky",
        55: "tg",
        56: "tk",
        57: "mn-CN",
        58: "mn",
        59: "ps",
        60: "ks",
        61: "ku",
        62: "sd",
        63: "bo",
        64: "ne",
        65: "sa",
        66: "mr",
        67: "bn",
        68: "as",
        69: "gu",
        70: "pa",
        71: "or",
        72: "ml",
        73: "kn",
        74: "ta",
        75: "te",
        76: "si",
        77: "my",
        78: "km",
        79: "lo",
        80: "vi",
        81: "id",
        82: "tl",
        83: "ms",
        84: "ms-Arab",
        85: "am",
        86: "ti",
        87: "om",
        88: "so",
        89: "sw",
        90: "rw",
        91: "rn",
        92: "ny",
        93: "mg",
        94: "eo",
        128: "cy",
        129: "eu",
        130: "ca",
        131: "la",
        132: "qu",
        133: "gn",
        134: "ay",
        135: "tt",
        136: "ug",
        137: "dz",
        138: "jv",
        139: "su",
        140: "gl",
        141: "af",
        142: "br",
        143: "iu",
        144: "gd",
        145: "gv",
        146: "ga",
        147: "to",
        148: "el-polyton",
        149: "kl",
        150: "az",
        151: "nn",
      },
      Qe = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 5,
        11: 1,
        12: 4,
        13: 0,
        14: 6,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 2,
        20: 4,
        21: 9,
        22: 21,
        23: 3,
        24: 29,
        25: 29,
        26: 29,
        27: 29,
        28: 29,
        29: 0,
        30: 0,
        31: 4,
        32: 7,
        33: 25,
        34: 0,
        35: 0,
        36: 0,
        37: 0,
        38: 29,
        39: 29,
        40: 0,
        41: 5,
        42: 7,
        43: 7,
        44: 7,
        45: 7,
        46: 7,
        47: 7,
        48: 7,
        49: 7,
        50: 4,
        51: 24,
        52: 23,
        53: 7,
        54: 7,
        55: 7,
        56: 7,
        57: 27,
        58: 7,
        59: 4,
        60: 4,
        61: 4,
        62: 4,
        63: 26,
        64: 9,
        65: 9,
        66: 9,
        67: 13,
        68: 13,
        69: 11,
        70: 10,
        71: 12,
        72: 17,
        73: 16,
        74: 14,
        75: 15,
        76: 18,
        77: 19,
        78: 20,
        79: 22,
        80: 30,
        81: 0,
        82: 0,
        83: 0,
        84: 4,
        85: 28,
        86: 28,
        87: 28,
        88: 0,
        89: 0,
        90: 0,
        91: 0,
        92: 0,
        93: 0,
        94: 0,
        128: 0,
        129: 0,
        130: 0,
        131: 0,
        132: 0,
        133: 0,
        134: 0,
        135: 7,
        136: 4,
        137: 26,
        138: 0,
        139: 0,
        140: 0,
        141: 0,
        142: 0,
        143: 28,
        144: 0,
        145: 0,
        146: 0,
        147: 0,
        148: 6,
        149: 0,
        150: 0,
        151: 0,
      },
      Je = {
        1078: "af",
        1052: "sq",
        1156: "gsw",
        1118: "am",
        5121: "ar-DZ",
        15361: "ar-BH",
        3073: "ar",
        2049: "ar-IQ",
        11265: "ar-JO",
        13313: "ar-KW",
        12289: "ar-LB",
        4097: "ar-LY",
        6145: "ary",
        8193: "ar-OM",
        16385: "ar-QA",
        1025: "ar-SA",
        10241: "ar-SY",
        7169: "aeb",
        14337: "ar-AE",
        9217: "ar-YE",
        1067: "hy",
        1101: "as",
        2092: "az-Cyrl",
        1068: "az",
        1133: "ba",
        1069: "eu",
        1059: "be",
        2117: "bn",
        1093: "bn-IN",
        8218: "bs-Cyrl",
        5146: "bs",
        1150: "br",
        1026: "bg",
        1027: "ca",
        3076: "zh-HK",
        5124: "zh-MO",
        2052: "zh",
        4100: "zh-SG",
        1028: "zh-TW",
        1155: "co",
        1050: "hr",
        4122: "hr-BA",
        1029: "cs",
        1030: "da",
        1164: "prs",
        1125: "dv",
        2067: "nl-BE",
        1043: "nl",
        3081: "en-AU",
        10249: "en-BZ",
        4105: "en-CA",
        9225: "en-029",
        16393: "en-IN",
        6153: "en-IE",
        8201: "en-JM",
        17417: "en-MY",
        5129: "en-NZ",
        13321: "en-PH",
        18441: "en-SG",
        7177: "en-ZA",
        11273: "en-TT",
        2057: "en-GB",
        1033: "en",
        12297: "en-ZW",
        1061: "et",
        1080: "fo",
        1124: "fil",
        1035: "fi",
        2060: "fr-BE",
        3084: "fr-CA",
        1036: "fr",
        5132: "fr-LU",
        6156: "fr-MC",
        4108: "fr-CH",
        1122: "fy",
        1110: "gl",
        1079: "ka",
        3079: "de-AT",
        1031: "de",
        5127: "de-LI",
        4103: "de-LU",
        2055: "de-CH",
        1032: "el",
        1135: "kl",
        1095: "gu",
        1128: "ha",
        1037: "he",
        1081: "hi",
        1038: "hu",
        1039: "is",
        1136: "ig",
        1057: "id",
        1117: "iu",
        2141: "iu-Latn",
        2108: "ga",
        1076: "xh",
        1077: "zu",
        1040: "it",
        2064: "it-CH",
        1041: "ja",
        1099: "kn",
        1087: "kk",
        1107: "km",
        1158: "quc",
        1159: "rw",
        1089: "sw",
        1111: "kok",
        1042: "ko",
        1088: "ky",
        1108: "lo",
        1062: "lv",
        1063: "lt",
        2094: "dsb",
        1134: "lb",
        1071: "mk",
        2110: "ms-BN",
        1086: "ms",
        1100: "ml",
        1082: "mt",
        1153: "mi",
        1146: "arn",
        1102: "mr",
        1148: "moh",
        1104: "mn",
        2128: "mn-CN",
        1121: "ne",
        1044: "nb",
        2068: "nn",
        1154: "oc",
        1096: "or",
        1123: "ps",
        1045: "pl",
        1046: "pt",
        2070: "pt-PT",
        1094: "pa",
        1131: "qu-BO",
        2155: "qu-EC",
        3179: "qu",
        1048: "ro",
        1047: "rm",
        1049: "ru",
        9275: "smn",
        4155: "smj-NO",
        5179: "smj",
        3131: "se-FI",
        1083: "se",
        2107: "se-SE",
        8251: "sms",
        6203: "sma-NO",
        7227: "sms",
        1103: "sa",
        7194: "sr-Cyrl-BA",
        3098: "sr",
        6170: "sr-Latn-BA",
        2074: "sr-Latn",
        1132: "nso",
        1074: "tn",
        1115: "si",
        1051: "sk",
        1060: "sl",
        11274: "es-AR",
        16394: "es-BO",
        13322: "es-CL",
        9226: "es-CO",
        5130: "es-CR",
        7178: "es-DO",
        12298: "es-EC",
        17418: "es-SV",
        4106: "es-GT",
        18442: "es-HN",
        2058: "es-MX",
        19466: "es-NI",
        6154: "es-PA",
        15370: "es-PY",
        10250: "es-PE",
        20490: "es-PR",
        3082: "es",
        1034: "es",
        21514: "es-US",
        14346: "es-UY",
        8202: "es-VE",
        2077: "sv-FI",
        1053: "sv",
        1114: "syr",
        1064: "tg",
        2143: "tzm",
        1097: "ta",
        1092: "tt",
        1098: "te",
        1054: "th",
        1105: "bo",
        1055: "tr",
        1090: "tk",
        1152: "ug",
        1058: "uk",
        1070: "hsb",
        1056: "ur",
        2115: "uz-Cyrl",
        1091: "uz",
        1066: "vi",
        1106: "cy",
        1160: "wo",
        1157: "sah",
        1144: "ii",
        1130: "yo",
      };
    function Ke(e, t, r) {
      switch (e) {
        case 0:
          if (65535 === t) return "und";
          if (r) return r[t];
          break;
        case 1:
          return Ze[t];
        case 3:
          return Je[t];
      }
    }
    var $e = "utf-16",
      et = {
        0: "macintosh",
        1: "x-mac-japanese",
        2: "x-mac-chinesetrad",
        3: "x-mac-korean",
        6: "x-mac-greek",
        7: "x-mac-cyrillic",
        9: "x-mac-devanagai",
        10: "x-mac-gurmukhi",
        11: "x-mac-gujarati",
        12: "x-mac-oriya",
        13: "x-mac-bengali",
        14: "x-mac-tamil",
        15: "x-mac-telugu",
        16: "x-mac-kannada",
        17: "x-mac-malayalam",
        18: "x-mac-sinhalese",
        19: "x-mac-burmese",
        20: "x-mac-khmer",
        21: "x-mac-thai",
        22: "x-mac-lao",
        23: "x-mac-georgian",
        24: "x-mac-armenian",
        25: "x-mac-chinesesimp",
        26: "x-mac-tibetan",
        27: "x-mac-mongolian",
        28: "x-mac-ethiopic",
        29: "x-mac-ce",
        30: "x-mac-vietnamese",
        31: "x-mac-extarabic",
      },
      tt = {
        15: "x-mac-icelandic",
        17: "x-mac-turkish",
        18: "x-mac-croatian",
        24: "x-mac-ce",
        25: "x-mac-ce",
        26: "x-mac-ce",
        27: "x-mac-ce",
        28: "x-mac-ce",
        30: "x-mac-icelandic",
        37: "x-mac-romanian",
        38: "x-mac-ce",
        39: "x-mac-ce",
        40: "x-mac-ce",
        143: "x-mac-inuit",
        146: "x-mac-gaelic",
      };
    function rt(e, t, r) {
      switch (e) {
        case 0:
          return $e;
        case 1:
          return tt[r] || et[t];
        case 3:
          if (1 === t || 10 === t) return $e;
      }
    }
    function nt(e) {
      var t = {};
      for (var r in e) t[e[r]] = parseInt(r);
      return t;
    }
    function at(e, t, r, n, a, o) {
      return new $.Record("NameRecord", [
        { name: "platformID", type: "USHORT", value: e },
        { name: "encodingID", type: "USHORT", value: t },
        { name: "languageID", type: "USHORT", value: r },
        { name: "nameID", type: "USHORT", value: n },
        { name: "length", type: "USHORT", value: a },
        { name: "offset", type: "USHORT", value: o },
      ]);
    }
    function ot(e, t) {
      var r = (function (e, t) {
        var r = e.length,
          n = t.length - r + 1;
        e: for (var a = 0; a < n; a++)
          for (; a < n; a++) {
            for (var o = 0; o < r; o++) if (t[a + o] !== e[o]) continue e;
            return a;
          }
        return -1;
      })(e, t);
      if (r < 0) {
        r = t.length;
        for (var n = 0, a = e.length; n < a; ++n) t.push(e[n]);
      }
      return r;
    }
    var st = {
        parse: function (e, t, r) {
          for (
            var n = {},
              a = new ie.Parser(e, t),
              o = a.parseUShort(),
              s = a.parseUShort(),
              i = a.offset + a.parseUShort(),
              u = 0;
            u < s;
            u++
          ) {
            var l = a.parseUShort(),
              p = a.parseUShort(),
              c = a.parseUShort(),
              h = a.parseUShort(),
              f = Ve[h] || h,
              d = a.parseUShort(),
              g = a.parseUShort(),
              v = Ke(l, c, r),
              m = rt(l, p, c);
            if (void 0 !== m && void 0 !== v) {
              var y = void 0;
              if (
                (y =
                  m === $e ? M.UTF16(e, i + g, d) : M.MACSTRING(e, i + g, d, m))
              ) {
                var b = n[f];
                void 0 === b && (b = n[f] = {}), (b[v] = y);
              }
            }
          }
          return 1 === o && a.parseUShort(), n;
        },
        make: function (e, t) {
          var r,
            n = [],
            a = {},
            o = nt(Ve);
          for (var s in e) {
            var i = o[s];
            if ((void 0 === i && (i = s), (r = parseInt(i)), isNaN(r)))
              throw new Error(
                'Name table entry "' +
                  s +
                  '" does not exist, see nameTableNames for complete list.'
              );
            (a[r] = e[s]), n.push(r);
          }
          for (
            var u = nt(Ze), l = nt(Je), p = [], c = [], h = 0;
            h < n.length;
            h++
          ) {
            var f = a[(r = n[h])];
            for (var d in f) {
              var g = f[d],
                v = 1,
                m = u[d],
                y = Qe[m],
                b = rt(v, y, m),
                x = G.MACSTRING(g, b);
              void 0 === x &&
                ((v = 0),
                (m = t.indexOf(d)) < 0 && ((m = t.length), t.push(d)),
                (y = 4),
                (x = G.UTF16(g)));
              var S = ot(x, c);
              p.push(at(v, y, m, r, x.length, S));
              var T = l[d];
              if (void 0 !== T) {
                var U = G.UTF16(g),
                  k = ot(U, c);
                p.push(at(3, 1, T, r, U.length, k));
              }
            }
          }
          p.sort(function (e, t) {
            return (
              e.platformID - t.platformID ||
              e.encodingID - t.encodingID ||
              e.languageID - t.languageID ||
              e.nameID - t.nameID
            );
          });
          for (
            var O = new $.Table("name", [
                { name: "format", type: "USHORT", value: 0 },
                { name: "count", type: "USHORT", value: p.length },
                {
                  name: "stringOffset",
                  type: "USHORT",
                  value: 6 + 12 * p.length,
                },
              ]),
              E = 0;
            E < p.length;
            E++
          )
            O.fields.push({ name: "record_" + E, type: "RECORD", value: p[E] });
          return (
            O.fields.push({ name: "strings", type: "LITERAL", value: c }), O
          );
        },
      },
      it = [
        { begin: 0, end: 127 },
        { begin: 128, end: 255 },
        { begin: 256, end: 383 },
        { begin: 384, end: 591 },
        { begin: 592, end: 687 },
        { begin: 688, end: 767 },
        { begin: 768, end: 879 },
        { begin: 880, end: 1023 },
        { begin: 11392, end: 11519 },
        { begin: 1024, end: 1279 },
        { begin: 1328, end: 1423 },
        { begin: 1424, end: 1535 },
        { begin: 42240, end: 42559 },
        { begin: 1536, end: 1791 },
        { begin: 1984, end: 2047 },
        { begin: 2304, end: 2431 },
        { begin: 2432, end: 2559 },
        { begin: 2560, end: 2687 },
        { begin: 2688, end: 2815 },
        { begin: 2816, end: 2943 },
        { begin: 2944, end: 3071 },
        { begin: 3072, end: 3199 },
        { begin: 3200, end: 3327 },
        { begin: 3328, end: 3455 },
        { begin: 3584, end: 3711 },
        { begin: 3712, end: 3839 },
        { begin: 4256, end: 4351 },
        { begin: 6912, end: 7039 },
        { begin: 4352, end: 4607 },
        { begin: 7680, end: 7935 },
        { begin: 7936, end: 8191 },
        { begin: 8192, end: 8303 },
        { begin: 8304, end: 8351 },
        { begin: 8352, end: 8399 },
        { begin: 8400, end: 8447 },
        { begin: 8448, end: 8527 },
        { begin: 8528, end: 8591 },
        { begin: 8592, end: 8703 },
        { begin: 8704, end: 8959 },
        { begin: 8960, end: 9215 },
        { begin: 9216, end: 9279 },
        { begin: 9280, end: 9311 },
        { begin: 9312, end: 9471 },
        { begin: 9472, end: 9599 },
        { begin: 9600, end: 9631 },
        { begin: 9632, end: 9727 },
        { begin: 9728, end: 9983 },
        { begin: 9984, end: 10175 },
        { begin: 12288, end: 12351 },
        { begin: 12352, end: 12447 },
        { begin: 12448, end: 12543 },
        { begin: 12544, end: 12591 },
        { begin: 12592, end: 12687 },
        { begin: 43072, end: 43135 },
        { begin: 12800, end: 13055 },
        { begin: 13056, end: 13311 },
        { begin: 44032, end: 55215 },
        { begin: 55296, end: 57343 },
        { begin: 67840, end: 67871 },
        { begin: 19968, end: 40959 },
        { begin: 57344, end: 63743 },
        { begin: 12736, end: 12783 },
        { begin: 64256, end: 64335 },
        { begin: 64336, end: 65023 },
        { begin: 65056, end: 65071 },
        { begin: 65040, end: 65055 },
        { begin: 65104, end: 65135 },
        { begin: 65136, end: 65279 },
        { begin: 65280, end: 65519 },
        { begin: 65520, end: 65535 },
        { begin: 3840, end: 4095 },
        { begin: 1792, end: 1871 },
        { begin: 1920, end: 1983 },
        { begin: 3456, end: 3583 },
        { begin: 4096, end: 4255 },
        { begin: 4608, end: 4991 },
        { begin: 5024, end: 5119 },
        { begin: 5120, end: 5759 },
        { begin: 5760, end: 5791 },
        { begin: 5792, end: 5887 },
        { begin: 6016, end: 6143 },
        { begin: 6144, end: 6319 },
        { begin: 10240, end: 10495 },
        { begin: 40960, end: 42127 },
        { begin: 5888, end: 5919 },
        { begin: 66304, end: 66351 },
        { begin: 66352, end: 66383 },
        { begin: 66560, end: 66639 },
        { begin: 118784, end: 119039 },
        { begin: 119808, end: 120831 },
        { begin: 1044480, end: 1048573 },
        { begin: 65024, end: 65039 },
        { begin: 917504, end: 917631 },
        { begin: 6400, end: 6479 },
        { begin: 6480, end: 6527 },
        { begin: 6528, end: 6623 },
        { begin: 6656, end: 6687 },
        { begin: 11264, end: 11359 },
        { begin: 11568, end: 11647 },
        { begin: 19904, end: 19967 },
        { begin: 43008, end: 43055 },
        { begin: 65536, end: 65663 },
        { begin: 65856, end: 65935 },
        { begin: 66432, end: 66463 },
        { begin: 66464, end: 66527 },
        { begin: 66640, end: 66687 },
        { begin: 66688, end: 66735 },
        { begin: 67584, end: 67647 },
        { begin: 68096, end: 68191 },
        { begin: 119552, end: 119647 },
        { begin: 73728, end: 74751 },
        { begin: 119648, end: 119679 },
        { begin: 7040, end: 7103 },
        { begin: 7168, end: 7247 },
        { begin: 7248, end: 7295 },
        { begin: 43136, end: 43231 },
        { begin: 43264, end: 43311 },
        { begin: 43312, end: 43359 },
        { begin: 43520, end: 43615 },
        { begin: 65936, end: 65999 },
        { begin: 66e3, end: 66047 },
        { begin: 66208, end: 66271 },
        { begin: 127024, end: 127135 },
      ];
    var ut = {
      parse: function (e, t) {
        var r = {},
          n = new ie.Parser(e, t);
        (r.version = n.parseUShort()),
          (r.xAvgCharWidth = n.parseShort()),
          (r.usWeightClass = n.parseUShort()),
          (r.usWidthClass = n.parseUShort()),
          (r.fsType = n.parseUShort()),
          (r.ySubscriptXSize = n.parseShort()),
          (r.ySubscriptYSize = n.parseShort()),
          (r.ySubscriptXOffset = n.parseShort()),
          (r.ySubscriptYOffset = n.parseShort()),
          (r.ySuperscriptXSize = n.parseShort()),
          (r.ySuperscriptYSize = n.parseShort()),
          (r.ySuperscriptXOffset = n.parseShort()),
          (r.ySuperscriptYOffset = n.parseShort()),
          (r.yStrikeoutSize = n.parseShort()),
          (r.yStrikeoutPosition = n.parseShort()),
          (r.sFamilyClass = n.parseShort()),
          (r.panose = []);
        for (var a = 0; a < 10; a++) r.panose[a] = n.parseByte();
        return (
          (r.ulUnicodeRange1 = n.parseULong()),
          (r.ulUnicodeRange2 = n.parseULong()),
          (r.ulUnicodeRange3 = n.parseULong()),
          (r.ulUnicodeRange4 = n.parseULong()),
          (r.achVendID = String.fromCharCode(
            n.parseByte(),
            n.parseByte(),
            n.parseByte(),
            n.parseByte()
          )),
          (r.fsSelection = n.parseUShort()),
          (r.usFirstCharIndex = n.parseUShort()),
          (r.usLastCharIndex = n.parseUShort()),
          (r.sTypoAscender = n.parseShort()),
          (r.sTypoDescender = n.parseShort()),
          (r.sTypoLineGap = n.parseShort()),
          (r.usWinAscent = n.parseUShort()),
          (r.usWinDescent = n.parseUShort()),
          r.version >= 1 &&
            ((r.ulCodePageRange1 = n.parseULong()),
            (r.ulCodePageRange2 = n.parseULong())),
          r.version >= 2 &&
            ((r.sxHeight = n.parseShort()),
            (r.sCapHeight = n.parseShort()),
            (r.usDefaultChar = n.parseUShort()),
            (r.usBreakChar = n.parseUShort()),
            (r.usMaxContent = n.parseUShort())),
          r
        );
      },
      make: function (e) {
        return new $.Table(
          "OS/2",
          [
            { name: "version", type: "USHORT", value: 3 },
            { name: "xAvgCharWidth", type: "SHORT", value: 0 },
            { name: "usWeightClass", type: "USHORT", value: 0 },
            { name: "usWidthClass", type: "USHORT", value: 0 },
            { name: "fsType", type: "USHORT", value: 0 },
            { name: "ySubscriptXSize", type: "SHORT", value: 650 },
            { name: "ySubscriptYSize", type: "SHORT", value: 699 },
            { name: "ySubscriptXOffset", type: "SHORT", value: 0 },
            { name: "ySubscriptYOffset", type: "SHORT", value: 140 },
            { name: "ySuperscriptXSize", type: "SHORT", value: 650 },
            { name: "ySuperscriptYSize", type: "SHORT", value: 699 },
            { name: "ySuperscriptXOffset", type: "SHORT", value: 0 },
            { name: "ySuperscriptYOffset", type: "SHORT", value: 479 },
            { name: "yStrikeoutSize", type: "SHORT", value: 49 },
            { name: "yStrikeoutPosition", type: "SHORT", value: 258 },
            { name: "sFamilyClass", type: "SHORT", value: 0 },
            { name: "bFamilyType", type: "BYTE", value: 0 },
            { name: "bSerifStyle", type: "BYTE", value: 0 },
            { name: "bWeight", type: "BYTE", value: 0 },
            { name: "bProportion", type: "BYTE", value: 0 },
            { name: "bContrast", type: "BYTE", value: 0 },
            { name: "bStrokeVariation", type: "BYTE", value: 0 },
            { name: "bArmStyle", type: "BYTE", value: 0 },
            { name: "bLetterform", type: "BYTE", value: 0 },
            { name: "bMidline", type: "BYTE", value: 0 },
            { name: "bXHeight", type: "BYTE", value: 0 },
            { name: "ulUnicodeRange1", type: "ULONG", value: 0 },
            { name: "ulUnicodeRange2", type: "ULONG", value: 0 },
            { name: "ulUnicodeRange3", type: "ULONG", value: 0 },
            { name: "ulUnicodeRange4", type: "ULONG", value: 0 },
            { name: "achVendID", type: "CHARARRAY", value: "XXXX" },
            { name: "fsSelection", type: "USHORT", value: 0 },
            { name: "usFirstCharIndex", type: "USHORT", value: 0 },
            { name: "usLastCharIndex", type: "USHORT", value: 0 },
            { name: "sTypoAscender", type: "SHORT", value: 0 },
            { name: "sTypoDescender", type: "SHORT", value: 0 },
            { name: "sTypoLineGap", type: "SHORT", value: 0 },
            { name: "usWinAscent", type: "USHORT", value: 0 },
            { name: "usWinDescent", type: "USHORT", value: 0 },
            { name: "ulCodePageRange1", type: "ULONG", value: 0 },
            { name: "ulCodePageRange2", type: "ULONG", value: 0 },
            { name: "sxHeight", type: "SHORT", value: 0 },
            { name: "sCapHeight", type: "SHORT", value: 0 },
            { name: "usDefaultChar", type: "USHORT", value: 0 },
            { name: "usBreakChar", type: "USHORT", value: 0 },
            { name: "usMaxContext", type: "USHORT", value: 0 },
          ],
          e
        );
      },
      unicodeRanges: it,
      getUnicodeRange: function (e) {
        for (var t = 0; t < it.length; t += 1) {
          var r = it[t];
          if (e >= r.begin && e < r.end) return t;
        }
        return -1;
      },
    };
    var lt = {
        parse: function (e, t) {
          var r = {},
            n = new ie.Parser(e, t);
          switch (
            ((r.version = n.parseVersion()),
            (r.italicAngle = n.parseFixed()),
            (r.underlinePosition = n.parseShort()),
            (r.underlineThickness = n.parseShort()),
            (r.isFixedPitch = n.parseULong()),
            (r.minMemType42 = n.parseULong()),
            (r.maxMemType42 = n.parseULong()),
            (r.minMemType1 = n.parseULong()),
            (r.maxMemType1 = n.parseULong()),
            r.version)
          ) {
            case 1:
              r.names = fe.slice();
              break;
            case 2:
              (r.numberOfGlyphs = n.parseUShort()),
                (r.glyphNameIndex = new Array(r.numberOfGlyphs));
              for (var a = 0; a < r.numberOfGlyphs; a++)
                r.glyphNameIndex[a] = n.parseUShort();
              r.names = [];
              for (var o = 0; o < r.numberOfGlyphs; o++)
                if (r.glyphNameIndex[o] >= fe.length) {
                  var s = n.parseChar();
                  r.names.push(n.parseString(s));
                }
              break;
            case 2.5:
              (r.numberOfGlyphs = n.parseUShort()),
                (r.offset = new Array(r.numberOfGlyphs));
              for (var i = 0; i < r.numberOfGlyphs; i++)
                r.offset[i] = n.parseChar();
          }
          return r;
        },
        make: function () {
          return new $.Table("post", [
            { name: "version", type: "FIXED", value: 196608 },
            { name: "italicAngle", type: "FIXED", value: 0 },
            { name: "underlinePosition", type: "FWORD", value: 0 },
            { name: "underlineThickness", type: "FWORD", value: 0 },
            { name: "isFixedPitch", type: "ULONG", value: 0 },
            { name: "minMemType42", type: "ULONG", value: 0 },
            { name: "maxMemType42", type: "ULONG", value: 0 },
            { name: "minMemType1", type: "ULONG", value: 0 },
            { name: "maxMemType1", type: "ULONG", value: 0 },
          ]);
        },
      },
      pt = new Array(9);
    (pt[1] = function () {
      var e = this.offset + this.relativeOffset,
        t = this.parseUShort();
      return 1 === t
        ? {
            substFormat: 1,
            coverage: this.parsePointer(oe.coverage),
            deltaGlyphId: this.parseUShort(),
          }
        : 2 === t
        ? {
            substFormat: 2,
            coverage: this.parsePointer(oe.coverage),
            substitute: this.parseOffset16List(),
          }
        : void D.assert(
            !1,
            "0x" + e.toString(16) + ": lookup type 1 format must be 1 or 2."
          );
    }),
      (pt[2] = function () {
        var e = this.parseUShort();
        return (
          D.argument(
            1 === e,
            "GSUB Multiple Substitution Subtable identifier-format must be 1"
          ),
          {
            substFormat: e,
            coverage: this.parsePointer(oe.coverage),
            sequences: this.parseListOfLists(),
          }
        );
      }),
      (pt[3] = function () {
        var e = this.parseUShort();
        return (
          D.argument(
            1 === e,
            "GSUB Alternate Substitution Subtable identifier-format must be 1"
          ),
          {
            substFormat: e,
            coverage: this.parsePointer(oe.coverage),
            alternateSets: this.parseListOfLists(),
          }
        );
      }),
      (pt[4] = function () {
        var e = this.parseUShort();
        return (
          D.argument(
            1 === e,
            "GSUB ligature table identifier-format must be 1"
          ),
          {
            substFormat: e,
            coverage: this.parsePointer(oe.coverage),
            ligatureSets: this.parseListOfLists(function () {
              return {
                ligGlyph: this.parseUShort(),
                components: this.parseUShortList(this.parseUShort() - 1),
              };
            }),
          }
        );
      });
    var ct = { sequenceIndex: oe.uShort, lookupListIndex: oe.uShort };
    (pt[5] = function () {
      var e = this.offset + this.relativeOffset,
        t = this.parseUShort();
      if (1 === t)
        return {
          substFormat: t,
          coverage: this.parsePointer(oe.coverage),
          ruleSets: this.parseListOfLists(function () {
            var e = this.parseUShort(),
              t = this.parseUShort();
            return {
              input: this.parseUShortList(e - 1),
              lookupRecords: this.parseRecordList(t, ct),
            };
          }),
        };
      if (2 === t)
        return {
          substFormat: t,
          coverage: this.parsePointer(oe.coverage),
          classDef: this.parsePointer(oe.classDef),
          classSets: this.parseListOfLists(function () {
            var e = this.parseUShort(),
              t = this.parseUShort();
            return {
              classes: this.parseUShortList(e - 1),
              lookupRecords: this.parseRecordList(t, ct),
            };
          }),
        };
      if (3 === t) {
        var r = this.parseUShort(),
          n = this.parseUShort();
        return {
          substFormat: t,
          coverages: this.parseList(r, oe.pointer(oe.coverage)),
          lookupRecords: this.parseRecordList(n, ct),
        };
      }
      D.assert(
        !1,
        "0x" + e.toString(16) + ": lookup type 5 format must be 1, 2 or 3."
      );
    }),
      (pt[6] = function () {
        var e = this.offset + this.relativeOffset,
          t = this.parseUShort();
        return 1 === t
          ? {
              substFormat: 1,
              coverage: this.parsePointer(oe.coverage),
              chainRuleSets: this.parseListOfLists(function () {
                return {
                  backtrack: this.parseUShortList(),
                  input: this.parseUShortList(this.parseShort() - 1),
                  lookahead: this.parseUShortList(),
                  lookupRecords: this.parseRecordList(ct),
                };
              }),
            }
          : 2 === t
          ? {
              substFormat: 2,
              coverage: this.parsePointer(oe.coverage),
              backtrackClassDef: this.parsePointer(oe.classDef),
              inputClassDef: this.parsePointer(oe.classDef),
              lookaheadClassDef: this.parsePointer(oe.classDef),
              chainClassSet: this.parseListOfLists(function () {
                return {
                  backtrack: this.parseUShortList(),
                  input: this.parseUShortList(this.parseShort() - 1),
                  lookahead: this.parseUShortList(),
                  lookupRecords: this.parseRecordList(ct),
                };
              }),
            }
          : 3 === t
          ? {
              substFormat: 3,
              backtrackCoverage: this.parseList(oe.pointer(oe.coverage)),
              inputCoverage: this.parseList(oe.pointer(oe.coverage)),
              lookaheadCoverage: this.parseList(oe.pointer(oe.coverage)),
              lookupRecords: this.parseRecordList(ct),
            }
          : void D.assert(
              !1,
              "0x" +
                e.toString(16) +
                ": lookup type 6 format must be 1, 2 or 3."
            );
      }),
      (pt[7] = function () {
        var e = this.parseUShort();
        D.argument(
          1 === e,
          "GSUB Extension Substitution subtable identifier-format must be 1"
        );
        var t = this.parseUShort(),
          r = new oe(this.data, this.offset + this.parseULong());
        return { substFormat: 1, lookupType: t, extension: pt[t].call(r) };
      }),
      (pt[8] = function () {
        var e = this.parseUShort();
        return (
          D.argument(
            1 === e,
            "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"
          ),
          {
            substFormat: e,
            coverage: this.parsePointer(oe.coverage),
            backtrackCoverage: this.parseList(oe.pointer(oe.coverage)),
            lookaheadCoverage: this.parseList(oe.pointer(oe.coverage)),
            substitutes: this.parseUShortList(),
          }
        );
      });
    var ht = new Array(9);
    (ht[1] = function (e) {
      return 1 === e.substFormat
        ? new $.Table("substitutionTable", [
            { name: "substFormat", type: "USHORT", value: 1 },
            {
              name: "coverage",
              type: "TABLE",
              value: new $.Coverage(e.coverage),
            },
            { name: "deltaGlyphID", type: "USHORT", value: e.deltaGlyphId },
          ])
        : new $.Table(
            "substitutionTable",
            [
              { name: "substFormat", type: "USHORT", value: 2 },
              {
                name: "coverage",
                type: "TABLE",
                value: new $.Coverage(e.coverage),
              },
            ].concat($.ushortList("substitute", e.substitute))
          );
    }),
      (ht[2] = function (e) {
        return (
          D.assert(1 === e.substFormat, "Lookup type 2 substFormat must be 1."),
          new $.Table(
            "substitutionTable",
            [
              { name: "substFormat", type: "USHORT", value: 1 },
              {
                name: "coverage",
                type: "TABLE",
                value: new $.Coverage(e.coverage),
              },
            ].concat(
              $.tableList("seqSet", e.sequences, function (e) {
                return new $.Table(
                  "sequenceSetTable",
                  $.ushortList("sequence", e)
                );
              })
            )
          )
        );
      }),
      (ht[3] = function (e) {
        return (
          D.assert(1 === e.substFormat, "Lookup type 3 substFormat must be 1."),
          new $.Table(
            "substitutionTable",
            [
              { name: "substFormat", type: "USHORT", value: 1 },
              {
                name: "coverage",
                type: "TABLE",
                value: new $.Coverage(e.coverage),
              },
            ].concat(
              $.tableList("altSet", e.alternateSets, function (e) {
                return new $.Table(
                  "alternateSetTable",
                  $.ushortList("alternate", e)
                );
              })
            )
          )
        );
      }),
      (ht[4] = function (e) {
        return (
          D.assert(1 === e.substFormat, "Lookup type 4 substFormat must be 1."),
          new $.Table(
            "substitutionTable",
            [
              { name: "substFormat", type: "USHORT", value: 1 },
              {
                name: "coverage",
                type: "TABLE",
                value: new $.Coverage(e.coverage),
              },
            ].concat(
              $.tableList("ligSet", e.ligatureSets, function (e) {
                return new $.Table(
                  "ligatureSetTable",
                  $.tableList("ligature", e, function (e) {
                    return new $.Table(
                      "ligatureTable",
                      [
                        { name: "ligGlyph", type: "USHORT", value: e.ligGlyph },
                      ].concat(
                        $.ushortList(
                          "component",
                          e.components,
                          e.components.length + 1
                        )
                      )
                    );
                  })
                );
              })
            )
          )
        );
      }),
      (ht[6] = function (e) {
        if (1 === e.substFormat) {
          var t = new $.Table(
            "chainContextTable",
            [
              { name: "substFormat", type: "USHORT", value: e.substFormat },
              {
                name: "coverage",
                type: "TABLE",
                value: new $.Coverage(e.coverage),
              },
            ].concat(
              $.tableList("chainRuleSet", e.chainRuleSets, function (e) {
                return new $.Table(
                  "chainRuleSetTable",
                  $.tableList("chainRule", e, function (e) {
                    var t = $.ushortList(
                      "backtrackGlyph",
                      e.backtrack,
                      e.backtrack.length
                    )
                      .concat(
                        $.ushortList("inputGlyph", e.input, e.input.length + 1)
                      )
                      .concat(
                        $.ushortList(
                          "lookaheadGlyph",
                          e.lookahead,
                          e.lookahead.length
                        )
                      )
                      .concat(
                        $.ushortList("substitution", [], e.lookupRecords.length)
                      );
                    return (
                      e.lookupRecords.forEach(function (e, r) {
                        t = t
                          .concat({
                            name: "sequenceIndex" + r,
                            type: "USHORT",
                            value: e.sequenceIndex,
                          })
                          .concat({
                            name: "lookupListIndex" + r,
                            type: "USHORT",
                            value: e.lookupListIndex,
                          });
                      }),
                      new $.Table("chainRuleTable", t)
                    );
                  })
                );
              })
            )
          );
          return t;
        }
        if (2 === e.substFormat)
          D.assert(!1, "lookup type 6 format 2 is not yet supported.");
        else if (3 === e.substFormat) {
          var r = [
            { name: "substFormat", type: "USHORT", value: e.substFormat },
          ];
          return (
            r.push({
              name: "backtrackGlyphCount",
              type: "USHORT",
              value: e.backtrackCoverage.length,
            }),
            e.backtrackCoverage.forEach(function (e, t) {
              r.push({
                name: "backtrackCoverage" + t,
                type: "TABLE",
                value: new $.Coverage(e),
              });
            }),
            r.push({
              name: "inputGlyphCount",
              type: "USHORT",
              value: e.inputCoverage.length,
            }),
            e.inputCoverage.forEach(function (e, t) {
              r.push({
                name: "inputCoverage" + t,
                type: "TABLE",
                value: new $.Coverage(e),
              });
            }),
            r.push({
              name: "lookaheadGlyphCount",
              type: "USHORT",
              value: e.lookaheadCoverage.length,
            }),
            e.lookaheadCoverage.forEach(function (e, t) {
              r.push({
                name: "lookaheadCoverage" + t,
                type: "TABLE",
                value: new $.Coverage(e),
              });
            }),
            r.push({
              name: "substitutionCount",
              type: "USHORT",
              value: e.lookupRecords.length,
            }),
            e.lookupRecords.forEach(function (e, t) {
              r = r
                .concat({
                  name: "sequenceIndex" + t,
                  type: "USHORT",
                  value: e.sequenceIndex,
                })
                .concat({
                  name: "lookupListIndex" + t,
                  type: "USHORT",
                  value: e.lookupListIndex,
                });
            }),
            new $.Table("chainContextTable", r)
          );
        }
        D.assert(!1, "lookup type 6 format must be 1, 2 or 3.");
      });
    var ft = {
      parse: function (e, t) {
        var r = new oe(e, (t = t || 0)),
          n = r.parseVersion(1);
        return (
          D.argument(1 === n || 1.1 === n, "Unsupported GSUB table version."),
          1 === n
            ? {
                version: n,
                scripts: r.parseScriptList(),
                features: r.parseFeatureList(),
                lookups: r.parseLookupList(pt),
              }
            : {
                version: n,
                scripts: r.parseScriptList(),
                features: r.parseFeatureList(),
                lookups: r.parseLookupList(pt),
                variations: r.parseFeatureVariationsList(),
              }
        );
      },
      make: function (e) {
        return new $.Table("GSUB", [
          { name: "version", type: "ULONG", value: 65536 },
          {
            name: "scripts",
            type: "TABLE",
            value: new $.ScriptList(e.scripts),
          },
          {
            name: "features",
            type: "TABLE",
            value: new $.FeatureList(e.features),
          },
          {
            name: "lookups",
            type: "TABLE",
            value: new $.LookupList(e.lookups, ht),
          },
        ]);
      },
    };
    var dt = {
      parse: function (e, t) {
        var r = new ie.Parser(e, t),
          n = r.parseULong();
        D.argument(1 === n, "Unsupported META table version."),
          r.parseULong(),
          r.parseULong();
        for (var a = r.parseULong(), o = {}, s = 0; s < a; s++) {
          var i = r.parseTag(),
            u = r.parseULong(),
            l = r.parseULong(),
            p = M.UTF8(e, t + u, l);
          o[i] = p;
        }
        return o;
      },
      make: function (e) {
        var t = Object.keys(e).length,
          r = "",
          n = 16 + 12 * t,
          a = new $.Table("meta", [
            { name: "version", type: "ULONG", value: 1 },
            { name: "flags", type: "ULONG", value: 0 },
            { name: "offset", type: "ULONG", value: n },
            { name: "numTags", type: "ULONG", value: t },
          ]);
        for (var o in e) {
          var s = r.length;
          (r += e[o]),
            a.fields.push({ name: "tag " + o, type: "TAG", value: o }),
            a.fields.push({ name: "offset " + o, type: "ULONG", value: n + s }),
            a.fields.push({
              name: "length " + o,
              type: "ULONG",
              value: e[o].length,
            });
        }
        return (
          a.fields.push({ name: "stringPool", type: "CHARARRAY", value: r }), a
        );
      },
    };
    function gt(e) {
      return (Math.log(e) / Math.log(2)) | 0;
    }
    function vt(e) {
      for (; e.length % 4 != 0; ) e.push(0);
      for (var t = 0, r = 0; r < e.length; r += 4)
        t += (e[r] << 24) + (e[r + 1] << 16) + (e[r + 2] << 8) + e[r + 3];
      return (t %= Math.pow(2, 32));
    }
    function mt(e, t, r, n) {
      return new $.Record("Table Record", [
        { name: "tag", type: "TAG", value: void 0 !== e ? e : "" },
        { name: "checkSum", type: "ULONG", value: void 0 !== t ? t : 0 },
        { name: "offset", type: "ULONG", value: void 0 !== r ? r : 0 },
        { name: "length", type: "ULONG", value: void 0 !== n ? n : 0 },
      ]);
    }
    function yt(e) {
      var t = new $.Table("sfnt", [
        { name: "version", type: "TAG", value: "OTTO" },
        { name: "numTables", type: "USHORT", value: 0 },
        { name: "searchRange", type: "USHORT", value: 0 },
        { name: "entrySelector", type: "USHORT", value: 0 },
        { name: "rangeShift", type: "USHORT", value: 0 },
      ]);
      (t.tables = e), (t.numTables = e.length);
      var r = Math.pow(2, gt(t.numTables));
      (t.searchRange = 16 * r),
        (t.entrySelector = gt(r)),
        (t.rangeShift = 16 * t.numTables - t.searchRange);
      for (
        var n = [], a = [], o = t.sizeOf() + mt().sizeOf() * t.numTables;
        o % 4 != 0;

      )
        (o += 1), a.push({ name: "padding", type: "BYTE", value: 0 });
      for (var s = 0; s < e.length; s += 1) {
        var i = e[s];
        D.argument(
          4 === i.tableName.length,
          "Table name" + i.tableName + " is invalid."
        );
        var u = i.sizeOf(),
          l = mt(i.tableName, vt(i.encode()), o, u);
        for (
          n.push({ name: l.tag + " Table Record", type: "RECORD", value: l }),
            a.push({ name: i.tableName + " table", type: "RECORD", value: i }),
            o += u,
            D.argument(
              !isNaN(o),
              "Something went wrong calculating the offset."
            );
          o % 4 != 0;

        )
          (o += 1), a.push({ name: "padding", type: "BYTE", value: 0 });
      }
      return (
        n.sort(function (e, t) {
          return e.value.tag > t.value.tag ? 1 : -1;
        }),
        (t.fields = t.fields.concat(n)),
        (t.fields = t.fields.concat(a)),
        t
      );
    }
    function bt(e, t, r) {
      for (var n = 0; n < t.length; n += 1) {
        var a = e.charToGlyphIndex(t[n]);
        if (a > 0) return e.glyphs.get(a).getMetrics();
      }
      return r;
    }
    function xt(e) {
      for (var t = 0, r = 0; r < e.length; r += 1) t += e[r];
      return t / e.length;
    }
    var St = {
      make: yt,
      fontToTable: function (e) {
        for (
          var t,
            r = [],
            n = [],
            a = [],
            o = [],
            s = [],
            i = [],
            u = [],
            l = 0,
            p = 0,
            c = 0,
            h = 0,
            f = 0,
            d = 0;
          d < e.glyphs.length;
          d += 1
        ) {
          var g = e.glyphs.get(d),
            v = 0 | g.unicode;
          if (isNaN(g.advanceWidth))
            throw new Error(
              "Glyph " + g.name + " (" + d + "): advanceWidth is not a number."
            );
          (t > v || void 0 === t) && v > 0 && (t = v), l < v && (l = v);
          var m = ut.getUnicodeRange(v);
          if (m < 32) p |= 1 << m;
          else if (m < 64) c |= 1 << (m - 32);
          else if (m < 96) h |= 1 << (m - 64);
          else {
            if (!(m < 123))
              throw new Error(
                "Unicode ranges bits > 123 are reserved for internal usage"
              );
            f |= 1 << (m - 96);
          }
          if (".notdef" !== g.name) {
            var y = g.getMetrics();
            r.push(y.xMin),
              n.push(y.yMin),
              a.push(y.xMax),
              o.push(y.yMax),
              i.push(y.leftSideBearing),
              u.push(y.rightSideBearing),
              s.push(g.advanceWidth);
          }
        }
        var b = {
          xMin: Math.min.apply(null, r),
          yMin: Math.min.apply(null, n),
          xMax: Math.max.apply(null, a),
          yMax: Math.max.apply(null, o),
          advanceWidthMax: Math.max.apply(null, s),
          advanceWidthAvg: xt(s),
          minLeftSideBearing: Math.min.apply(null, i),
          maxLeftSideBearing: Math.max.apply(null, i),
          minRightSideBearing: Math.min.apply(null, u),
        };
        (b.ascender = e.ascender), (b.descender = e.descender);
        var x = _e.make({
            flags: 3,
            unitsPerEm: e.unitsPerEm,
            xMin: b.xMin,
            yMin: b.yMin,
            xMax: b.xMax,
            yMax: b.yMax,
            lowestRecPPEM: 3,
            createdTimestamp: e.createdTimestamp,
          }),
          S = qe.make({
            ascender: b.ascender,
            descender: b.descender,
            advanceWidthMax: b.advanceWidthMax,
            minLeftSideBearing: b.minLeftSideBearing,
            minRightSideBearing: b.minRightSideBearing,
            xMaxExtent: b.maxLeftSideBearing + (b.xMax - b.xMin),
            numberOfHMetrics: e.glyphs.length,
          }),
          T = Ye.make(e.glyphs.length),
          U = ut.make(
            Object.assign(
              {
                xAvgCharWidth: Math.round(b.advanceWidthAvg),
                usFirstCharIndex: t,
                usLastCharIndex: l,
                ulUnicodeRange1: p,
                ulUnicodeRange2: c,
                ulUnicodeRange3: h,
                ulUnicodeRange4: f,
                sTypoAscender: b.ascender,
                sTypoDescender: b.descender,
                sTypoLineGap: 0,
                usWinAscent: b.yMax,
                usWinDescent: Math.abs(b.yMin),
                ulCodePageRange1: 1,
                sxHeight: bt(e, "xyvw", { yMax: Math.round(b.ascender / 2) })
                  .yMax,
                sCapHeight: bt(e, "HIKLEFJMNTZBDPRAGOQSUVWXY", b).yMax,
                usDefaultChar: e.hasChar(" ") ? 32 : 0,
                usBreakChar: e.hasChar(" ") ? 32 : 0,
              },
              e.tables.os2
            )
          ),
          k = je.make(e.glyphs),
          O = le.make(e.glyphs),
          E = e.getEnglishName("fontFamily"),
          R = e.getEnglishName("fontSubfamily"),
          L = E + " " + R,
          w = e.getEnglishName("postScriptName");
        w || (w = E.replace(/\s/g, "") + "-" + R);
        var C = {};
        for (var D in e.names) C[D] = e.names[D];
        C.uniqueID ||
          (C.uniqueID = { en: e.getEnglishName("manufacturer") + ":" + L }),
          C.postScriptName || (C.postScriptName = { en: w }),
          C.preferredFamily || (C.preferredFamily = e.names.fontFamily),
          C.preferredSubfamily ||
            (C.preferredSubfamily = e.names.fontSubfamily);
        var I = [],
          M = st.make(C, I),
          G = I.length > 0 ? Xe.make(I) : void 0,
          N = lt.make(),
          F = We.make(e.glyphs, {
            version: e.getEnglishName("version"),
            fullName: L,
            familyName: E,
            weightName: R,
            postScriptName: w,
            unitsPerEm: e.unitsPerEm,
            fontBBox: [0, b.yMin, b.ascender, b.advanceWidthMax],
          }),
          B =
            e.metas && Object.keys(e.metas).length > 0
              ? dt.make(e.metas)
              : void 0,
          A = [x, S, T, U, M, O, N, F, k];
        G && A.push(G),
          e.tables.gsub && A.push(ft.make(e.tables.gsub)),
          B && A.push(B);
        for (
          var P = yt(A), H = vt(P.encode()), z = P.fields, W = !1, _ = 0;
          _ < z.length;
          _ += 1
        )
          if ("head table" === z[_].name) {
            (z[_].value.checkSumAdjustment = 2981146554 - H), (W = !0);
            break;
          }
        if (!W)
          throw new Error("Could not find head table with checkSum to adjust.");
        return P;
      },
      computeCheckSum: vt,
    };
    function Tt(e, t) {
      for (var r = 0, n = e.length - 1; r <= n; ) {
        var a = (r + n) >>> 1,
          o = e[a].tag;
        if (o === t) return a;
        o < t ? (r = a + 1) : (n = a - 1);
      }
      return -r - 1;
    }
    function Ut(e, t) {
      for (var r = 0, n = e.length - 1; r <= n; ) {
        var a = (r + n) >>> 1,
          o = e[a];
        if (o === t) return a;
        o < t ? (r = a + 1) : (n = a - 1);
      }
      return -r - 1;
    }
    function kt(e, t) {
      for (var r, n = 0, a = e.length - 1; n <= a; ) {
        var o = (n + a) >>> 1,
          s = (r = e[o]).start;
        if (s === t) return r;
        s < t ? (n = o + 1) : (a = o - 1);
      }
      if (n > 0) return t > (r = e[n - 1]).end ? 0 : r;
    }
    function Ot(e, t) {
      (this.font = e), (this.tableName = t);
    }
    function Et(e) {
      Ot.call(this, e, "gpos");
    }
    function Rt(e) {
      Ot.call(this, e, "gsub");
    }
    function Lt(e, t) {
      var r = e.length;
      if (r !== t.length) return !1;
      for (var n = 0; n < r; n++) if (e[n] !== t[n]) return !1;
      return !0;
    }
    function wt(e, t, r) {
      for (var n = e.subtables, a = 0; a < n.length; a++) {
        var o = n[a];
        if (o.substFormat === t) return o;
      }
      if (r) return n.push(r), r;
    }
    function Ct(e) {
      for (
        var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0;
        n < e.length;
        ++n
      )
        r[n] = e[n];
      return t;
    }
    function Dt(e, t) {
      if (!e) throw t;
    }
    function It(e, t, r, n, a) {
      var o;
      return (
        (t & n) > 0
          ? ((o = e.parseByte()), 0 == (t & a) && (o = -o), (o = r + o))
          : (o = (t & a) > 0 ? r : r + e.parseShort()),
        o
      );
    }
    function Mt(e, t, r) {
      var n,
        a,
        o = new ie.Parser(t, r);
      if (
        ((e.numberOfContours = o.parseShort()),
        (e._xMin = o.parseShort()),
        (e._yMin = o.parseShort()),
        (e._xMax = o.parseShort()),
        (e._yMax = o.parseShort()),
        e.numberOfContours > 0)
      ) {
        for (
          var s = (e.endPointIndices = []), i = 0;
          i < e.numberOfContours;
          i += 1
        )
          s.push(o.parseUShort());
        (e.instructionLength = o.parseUShort()), (e.instructions = []);
        for (var u = 0; u < e.instructionLength; u += 1)
          e.instructions.push(o.parseByte());
        var l = s[s.length - 1] + 1;
        n = [];
        for (var p = 0; p < l; p += 1)
          if (((a = o.parseByte()), n.push(a), (8 & a) > 0))
            for (var c = o.parseByte(), h = 0; h < c; h += 1)
              n.push(a), (p += 1);
        if ((D.argument(n.length === l, "Bad flags."), s.length > 0)) {
          var f,
            d = [];
          if (l > 0) {
            for (var g = 0; g < l; g += 1)
              (a = n[g]),
                ((f = {}).onCurve = !!(1 & a)),
                (f.lastPointOfContour = s.indexOf(g) >= 0),
                d.push(f);
            for (var v = 0, m = 0; m < l; m += 1)
              (a = n[m]), ((f = d[m]).x = It(o, a, v, 2, 16)), (v = f.x);
            for (var y = 0, b = 0; b < l; b += 1)
              (a = n[b]), ((f = d[b]).y = It(o, a, y, 4, 32)), (y = f.y);
          }
          e.points = d;
        } else e.points = [];
      } else if (0 === e.numberOfContours) e.points = [];
      else {
        (e.isComposite = !0), (e.points = []), (e.components = []);
        for (var x = !0; x; ) {
          n = o.parseUShort();
          var S = {
            glyphIndex: o.parseUShort(),
            xScale: 1,
            scale01: 0,
            scale10: 0,
            yScale: 1,
            dx: 0,
            dy: 0,
          };
          (1 & n) > 0
            ? (2 & n) > 0
              ? ((S.dx = o.parseShort()), (S.dy = o.parseShort()))
              : (S.matchedPoints = [o.parseUShort(), o.parseUShort()])
            : (2 & n) > 0
            ? ((S.dx = o.parseChar()), (S.dy = o.parseChar()))
            : (S.matchedPoints = [o.parseByte(), o.parseByte()]),
            (8 & n) > 0
              ? (S.xScale = S.yScale = o.parseF2Dot14())
              : (64 & n) > 0
              ? ((S.xScale = o.parseF2Dot14()), (S.yScale = o.parseF2Dot14()))
              : (128 & n) > 0 &&
                ((S.xScale = o.parseF2Dot14()),
                (S.scale01 = o.parseF2Dot14()),
                (S.scale10 = o.parseF2Dot14()),
                (S.yScale = o.parseF2Dot14())),
            e.components.push(S),
            (x = !!(32 & n));
        }
        if (256 & n) {
          (e.instructionLength = o.parseUShort()), (e.instructions = []);
          for (var T = 0; T < e.instructionLength; T += 1)
            e.instructions.push(o.parseByte());
        }
      }
    }
    function Gt(e, t) {
      for (var r = [], n = 0; n < e.length; n += 1) {
        var a = e[n],
          o = {
            x: t.xScale * a.x + t.scale01 * a.y + t.dx,
            y: t.scale10 * a.x + t.yScale * a.y + t.dy,
            onCurve: a.onCurve,
            lastPointOfContour: a.lastPointOfContour,
          };
        r.push(o);
      }
      return r;
    }
    function Nt(e) {
      var t = new L();
      if (!e) return t;
      for (
        var r = (function (e) {
            for (var t = [], r = [], n = 0; n < e.length; n += 1) {
              var a = e[n];
              r.push(a), a.lastPointOfContour && (t.push(r), (r = []));
            }
            return (
              D.argument(
                0 === r.length,
                "There are still points left in the current contour."
              ),
              t
            );
          })(e),
          n = 0;
        n < r.length;
        ++n
      ) {
        var a = r[n],
          o = null,
          s = a[a.length - 1],
          i = a[0];
        if (s.onCurve) t.moveTo(s.x, s.y);
        else if (i.onCurve) t.moveTo(i.x, i.y);
        else {
          var u = { x: 0.5 * (s.x + i.x), y: 0.5 * (s.y + i.y) };
          t.moveTo(u.x, u.y);
        }
        for (var l = 0; l < a.length; ++l)
          if (((o = s), (s = i), (i = a[(l + 1) % a.length]), s.onCurve))
            t.lineTo(s.x, s.y);
          else {
            var p = i;
            o.onCurve || { x: 0.5 * (s.x + o.x), y: 0.5 * (s.y + o.y) },
              i.onCurve || (p = { x: 0.5 * (s.x + i.x), y: 0.5 * (s.y + i.y) }),
              t.quadraticCurveTo(s.x, s.y, p.x, p.y);
          }
        t.closePath();
      }
      return t;
    }
    function Ft(e, t) {
      if (t.isComposite)
        for (var r = 0; r < t.components.length; r += 1) {
          var n = t.components[r],
            a = e.get(n.glyphIndex);
          if ((a.getPath(), a.points)) {
            var o = void 0;
            if (void 0 === n.matchedPoints) o = Gt(a.points, n);
            else {
              if (
                n.matchedPoints[0] > t.points.length - 1 ||
                n.matchedPoints[1] > a.points.length - 1
              )
                throw Error("Matched points out of range in " + t.name);
              var s = t.points[n.matchedPoints[0]],
                i = a.points[n.matchedPoints[1]],
                u = {
                  xScale: n.xScale,
                  scale01: n.scale01,
                  scale10: n.scale10,
                  yScale: n.yScale,
                  dx: 0,
                  dy: 0,
                };
              (i = Gt([i], u)[0]),
                (u.dx = s.x - i.x),
                (u.dy = s.y - i.y),
                (o = Gt(a.points, u));
            }
            t.points = t.points.concat(o);
          }
        }
      return Nt(t.points);
    }
    (Ot.prototype = {
      searchTag: Tt,
      binSearch: Ut,
      getTable: function (e) {
        var t = this.font.tables[this.tableName];
        return (
          !t &&
            e &&
            (t = this.font.tables[this.tableName] = this.createDefaultTable()),
          t
        );
      },
      getScriptNames: function () {
        var e = this.getTable();
        return e
          ? e.scripts.map(function (e) {
              return e.tag;
            })
          : [];
      },
      getDefaultScriptName: function () {
        var e = this.getTable();
        if (e) {
          for (var t = !1, r = 0; r < e.scripts.length; r++) {
            var n = e.scripts[r].tag;
            if ("DFLT" === n) return n;
            "latn" === n && (t = !0);
          }
          return t ? "latn" : void 0;
        }
      },
      getScriptTable: function (e, t) {
        var r = this.getTable(t);
        if (r) {
          e = e || "DFLT";
          var n = r.scripts,
            a = Tt(r.scripts, e);
          if (a >= 0) return n[a].script;
          if (t) {
            var o = {
              tag: e,
              script: {
                defaultLangSys: {
                  reserved: 0,
                  reqFeatureIndex: 65535,
                  featureIndexes: [],
                },
                langSysRecords: [],
              },
            };
            return n.splice(-1 - a, 0, o), o.script;
          }
        }
      },
      getLangSysTable: function (e, t, r) {
        var n = this.getScriptTable(e, r);
        if (n) {
          if (!t || "dflt" === t || "DFLT" === t) return n.defaultLangSys;
          var a = Tt(n.langSysRecords, t);
          if (a >= 0) return n.langSysRecords[a].langSys;
          if (r) {
            var o = {
              tag: t,
              langSys: {
                reserved: 0,
                reqFeatureIndex: 65535,
                featureIndexes: [],
              },
            };
            return n.langSysRecords.splice(-1 - a, 0, o), o.langSys;
          }
        }
      },
      getFeatureTable: function (e, t, r, n) {
        var a = this.getLangSysTable(e, t, n);
        if (a) {
          for (
            var o,
              s = a.featureIndexes,
              i = this.font.tables[this.tableName].features,
              u = 0;
            u < s.length;
            u++
          )
            if ((o = i[s[u]]).tag === r) return o.feature;
          if (n) {
            var l = i.length;
            return (
              D.assert(
                0 === l || r >= i[l - 1].tag,
                "Features must be added in alphabetical order."
              ),
              (o = { tag: r, feature: { params: 0, lookupListIndexes: [] } }),
              i.push(o),
              s.push(l),
              o.feature
            );
          }
        }
      },
      getLookupTables: function (e, t, r, n, a) {
        var o = this.getFeatureTable(e, t, r, a),
          s = [];
        if (o) {
          for (
            var i,
              u = o.lookupListIndexes,
              l = this.font.tables[this.tableName].lookups,
              p = 0;
            p < u.length;
            p++
          )
            (i = l[u[p]]).lookupType === n && s.push(i);
          if (0 === s.length && a) {
            i = {
              lookupType: n,
              lookupFlag: 0,
              subtables: [],
              markFilteringSet: void 0,
            };
            var c = l.length;
            return l.push(i), u.push(c), [i];
          }
        }
        return s;
      },
      getGlyphClass: function (e, t) {
        switch (e.format) {
          case 1:
            return e.startGlyph <= t && t < e.startGlyph + e.classes.length
              ? e.classes[t - e.startGlyph]
              : 0;
          case 2:
            var r = kt(e.ranges, t);
            return r ? r.classId : 0;
        }
      },
      getCoverageIndex: function (e, t) {
        switch (e.format) {
          case 1:
            var r = Ut(e.glyphs, t);
            return r >= 0 ? r : -1;
          case 2:
            var n = kt(e.ranges, t);
            return n ? n.index + t - n.start : -1;
        }
      },
      expandCoverage: function (e) {
        if (1 === e.format) return e.glyphs;
        for (var t = [], r = e.ranges, n = 0; n < r.length; n++)
          for (var a = r[n], o = a.start, s = a.end, i = o; i <= s; i++)
            t.push(i);
        return t;
      },
    }),
      (Et.prototype = Ot.prototype),
      (Et.prototype.init = function () {
        var e = this.getDefaultScriptName();
        this.defaultKerningTables = this.getKerningTables(e);
      }),
      (Et.prototype.getKerningValue = function (e, t, r) {
        for (var n = 0; n < e.length; n++)
          for (var a = e[n].subtables, o = 0; o < a.length; o++) {
            var s = a[o],
              i = this.getCoverageIndex(s.coverage, t);
            if (!(i < 0))
              switch (s.posFormat) {
                case 1:
                  for (var u = s.pairSets[i], l = 0; l < u.length; l++) {
                    var p = u[l];
                    if (p.secondGlyph === r)
                      return (p.value1 && p.value1.xAdvance) || 0;
                  }
                  break;
                case 2:
                  var c = this.getGlyphClass(s.classDef1, t),
                    h = this.getGlyphClass(s.classDef2, r),
                    f = s.classRecords[c][h];
                  return (f.value1 && f.value1.xAdvance) || 0;
              }
          }
        return 0;
      }),
      (Et.prototype.getKerningTables = function (e, t) {
        if (this.font.tables.gpos) return this.getLookupTables(e, t, "kern", 2);
      }),
      (Rt.prototype = Ot.prototype),
      (Rt.prototype.createDefaultTable = function () {
        return {
          version: 1,
          scripts: [
            {
              tag: "DFLT",
              script: {
                defaultLangSys: {
                  reserved: 0,
                  reqFeatureIndex: 65535,
                  featureIndexes: [],
                },
                langSysRecords: [],
              },
            },
          ],
          features: [],
          lookups: [],
        };
      }),
      (Rt.prototype.getSingle = function (e, t, r) {
        for (
          var n = [], a = this.getLookupTables(t, r, e, 1), o = 0;
          o < a.length;
          o++
        )
          for (var s = a[o].subtables, i = 0; i < s.length; i++) {
            var u = s[i],
              l = this.expandCoverage(u.coverage),
              p = void 0;
            if (1 === u.substFormat) {
              var c = u.deltaGlyphId;
              for (p = 0; p < l.length; p++) {
                var h = l[p];
                n.push({ sub: h, by: h + c });
              }
            } else {
              var f = u.substitute;
              for (p = 0; p < l.length; p++) n.push({ sub: l[p], by: f[p] });
            }
          }
        return n;
      }),
      (Rt.prototype.getMultiple = function (e, t, r) {
        for (
          var n = [], a = this.getLookupTables(t, r, e, 2), o = 0;
          o < a.length;
          o++
        )
          for (var s = a[o].subtables, i = 0; i < s.length; i++) {
            var u = s[i],
              l = this.expandCoverage(u.coverage),
              p = void 0;
            for (p = 0; p < l.length; p++) {
              var c = l[p],
                h = u.sequences[p];
              n.push({ sub: c, by: h });
            }
          }
        return n;
      }),
      (Rt.prototype.getAlternates = function (e, t, r) {
        for (
          var n = [], a = this.getLookupTables(t, r, e, 3), o = 0;
          o < a.length;
          o++
        )
          for (var s = a[o].subtables, i = 0; i < s.length; i++)
            for (
              var u = s[i],
                l = this.expandCoverage(u.coverage),
                p = u.alternateSets,
                c = 0;
              c < l.length;
              c++
            )
              n.push({ sub: l[c], by: p[c] });
        return n;
      }),
      (Rt.prototype.getLigatures = function (e, t, r) {
        for (
          var n = [], a = this.getLookupTables(t, r, e, 4), o = 0;
          o < a.length;
          o++
        )
          for (var s = a[o].subtables, i = 0; i < s.length; i++)
            for (
              var u = s[i],
                l = this.expandCoverage(u.coverage),
                p = u.ligatureSets,
                c = 0;
              c < l.length;
              c++
            )
              for (var h = l[c], f = p[c], d = 0; d < f.length; d++) {
                var g = f[d];
                n.push({ sub: [h].concat(g.components), by: g.ligGlyph });
              }
        return n;
      }),
      (Rt.prototype.addSingle = function (e, t, r, n) {
        var a = wt(this.getLookupTables(r, n, e, 1, !0)[0], 2, {
          substFormat: 2,
          coverage: { format: 1, glyphs: [] },
          substitute: [],
        });
        D.assert(
          1 === a.coverage.format,
          "Single: unable to modify coverage table format " + a.coverage.format
        );
        var o = t.sub,
          s = this.binSearch(a.coverage.glyphs, o);
        s < 0 &&
          ((s = -1 - s),
          a.coverage.glyphs.splice(s, 0, o),
          a.substitute.splice(s, 0, 0)),
          (a.substitute[s] = t.by);
      }),
      (Rt.prototype.addMultiple = function (e, t, r, n) {
        D.assert(
          t.by instanceof Array && t.by.length > 1,
          'Multiple: "by" must be an array of two or more ids'
        );
        var a = wt(this.getLookupTables(r, n, e, 2, !0)[0], 1, {
          substFormat: 1,
          coverage: { format: 1, glyphs: [] },
          sequences: [],
        });
        D.assert(
          1 === a.coverage.format,
          "Multiple: unable to modify coverage table format " +
            a.coverage.format
        );
        var o = t.sub,
          s = this.binSearch(a.coverage.glyphs, o);
        s < 0 &&
          ((s = -1 - s),
          a.coverage.glyphs.splice(s, 0, o),
          a.sequences.splice(s, 0, 0)),
          (a.sequences[s] = t.by);
      }),
      (Rt.prototype.addAlternate = function (e, t, r, n) {
        var a = wt(this.getLookupTables(r, n, e, 3, !0)[0], 1, {
          substFormat: 1,
          coverage: { format: 1, glyphs: [] },
          alternateSets: [],
        });
        D.assert(
          1 === a.coverage.format,
          "Alternate: unable to modify coverage table format " +
            a.coverage.format
        );
        var o = t.sub,
          s = this.binSearch(a.coverage.glyphs, o);
        s < 0 &&
          ((s = -1 - s),
          a.coverage.glyphs.splice(s, 0, o),
          a.alternateSets.splice(s, 0, 0)),
          (a.alternateSets[s] = t.by);
      }),
      (Rt.prototype.addLigature = function (e, t, r, n) {
        var a = this.getLookupTables(r, n, e, 4, !0)[0],
          o = a.subtables[0];
        o ||
          ((o = {
            substFormat: 1,
            coverage: { format: 1, glyphs: [] },
            ligatureSets: [],
          }),
          (a.subtables[0] = o)),
          D.assert(
            1 === o.coverage.format,
            "Ligature: unable to modify coverage table format " +
              o.coverage.format
          );
        var s = t.sub[0],
          i = t.sub.slice(1),
          u = { ligGlyph: t.by, components: i },
          l = this.binSearch(o.coverage.glyphs, s);
        if (l >= 0) {
          for (var p = o.ligatureSets[l], c = 0; c < p.length; c++)
            if (Lt(p[c].components, i)) return;
          p.push(u);
        } else
          (l = -1 - l),
            o.coverage.glyphs.splice(l, 0, s),
            o.ligatureSets.splice(l, 0, [u]);
      }),
      (Rt.prototype.getFeature = function (e, t, r) {
        if (/ss\d\d/.test(e)) return this.getSingle(e, t, r);
        switch (e) {
          case "aalt":
          case "salt":
            return this.getSingle(e, t, r).concat(this.getAlternates(e, t, r));
          case "dlig":
          case "liga":
          case "rlig":
            return this.getLigatures(e, t, r);
          case "ccmp":
            return this.getMultiple(e, t, r).concat(this.getLigatures(e, t, r));
          case "stch":
            return this.getMultiple(e, t, r);
        }
      }),
      (Rt.prototype.add = function (e, t, r, n) {
        if (/ss\d\d/.test(e)) return this.addSingle(e, t, r, n);
        switch (e) {
          case "aalt":
          case "salt":
            return "number" == typeof t.by
              ? this.addSingle(e, t, r, n)
              : this.addAlternate(e, t, r, n);
          case "dlig":
          case "liga":
          case "rlig":
            return this.addLigature(e, t, r, n);
          case "ccmp":
            return t.by instanceof Array
              ? this.addMultiple(e, t, r, n)
              : this.addLigature(e, t, r, n);
        }
      });
    var Bt,
      At,
      Pt,
      Ht,
      zt = {
        getPath: Nt,
        parse: function (e, t, r, n, a) {
          return a.lowMemory
            ? (function (e, t, r, n) {
                var a = new Ue.GlyphSet(n);
                return (
                  (n._push = function (o) {
                    var s = r[o];
                    s !== r[o + 1]
                      ? a.push(o, Ue.ttfGlyphLoader(n, o, Mt, e, t + s, Ft))
                      : a.push(o, Ue.glyphLoader(n, o));
                  }),
                  a
                );
              })(e, t, r, n)
            : (function (e, t, r, n) {
                for (
                  var a = new Ue.GlyphSet(n), o = 0;
                  o < r.length - 1;
                  o += 1
                ) {
                  var s = r[o];
                  s !== r[o + 1]
                    ? a.push(o, Ue.ttfGlyphLoader(n, o, Mt, e, t + s, Ft))
                    : a.push(o, Ue.glyphLoader(n, o));
                }
                return a;
              })(e, t, r, n);
        },
      };
    function Wt(e) {
      (this.font = e),
        (this.getCommands = function (e) {
          return zt.getPath(e).commands;
        }),
        (this._fpgmState = this._prepState = void 0),
        (this._errorState = 0);
    }
    function _t(e) {
      return e;
    }
    function qt(e) {
      return Math.sign(e) * Math.round(Math.abs(e));
    }
    function jt(e) {
      return (Math.sign(e) * Math.round(Math.abs(2 * e))) / 2;
    }
    function Xt(e) {
      return Math.sign(e) * (Math.round(Math.abs(e) + 0.5) - 0.5);
    }
    function Yt(e) {
      return Math.sign(e) * Math.ceil(Math.abs(e));
    }
    function Vt(e) {
      return Math.sign(e) * Math.floor(Math.abs(e));
    }
    var Zt = function (e) {
        var t = this.srPeriod,
          r = this.srPhase,
          n = 1;
        return (
          e < 0 && ((e = -e), (n = -1)),
          (e += this.srThreshold - r),
          (e = Math.trunc(e / t) * t),
          (e += r) < 0 ? r * n : e * n
        );
      },
      Qt = {
        x: 1,
        y: 0,
        axis: "x",
        distance: function (e, t, r, n) {
          return (r ? e.xo : e.x) - (n ? t.xo : t.x);
        },
        interpolate: function (e, t, r, n) {
          var a, o, s, i, u, l, p;
          if (!n || n === this)
            return (
              (a = e.xo - t.xo),
              (o = e.xo - r.xo),
              (u = t.x - t.xo),
              (l = r.x - r.xo),
              0 === (p = (s = Math.abs(a)) + (i = Math.abs(o)))
                ? void (e.x = e.xo + (u + l) / 2)
                : void (e.x = e.xo + (u * i + l * s) / p)
            );
          (a = n.distance(e, t, !0, !0)),
            (o = n.distance(e, r, !0, !0)),
            (u = n.distance(t, t, !1, !0)),
            (l = n.distance(r, r, !1, !0)),
            0 !== (p = (s = Math.abs(a)) + (i = Math.abs(o)))
              ? Qt.setRelative(e, e, (u * i + l * s) / p, n, !0)
              : Qt.setRelative(e, e, (u + l) / 2, n, !0);
        },
        normalSlope: Number.NEGATIVE_INFINITY,
        setRelative: function (e, t, r, n, a) {
          if (n && n !== this) {
            var o = a ? t.xo : t.x,
              s = a ? t.yo : t.y,
              i = o + r * n.x,
              u = s + r * n.y;
            e.x = i + (e.y - u) / n.normalSlope;
          } else e.x = (a ? t.xo : t.x) + r;
        },
        slope: 0,
        touch: function (e) {
          e.xTouched = !0;
        },
        touched: function (e) {
          return e.xTouched;
        },
        untouch: function (e) {
          e.xTouched = !1;
        },
      },
      Jt = {
        x: 0,
        y: 1,
        axis: "y",
        distance: function (e, t, r, n) {
          return (r ? e.yo : e.y) - (n ? t.yo : t.y);
        },
        interpolate: function (e, t, r, n) {
          var a, o, s, i, u, l, p;
          if (!n || n === this)
            return (
              (a = e.yo - t.yo),
              (o = e.yo - r.yo),
              (u = t.y - t.yo),
              (l = r.y - r.yo),
              0 === (p = (s = Math.abs(a)) + (i = Math.abs(o)))
                ? void (e.y = e.yo + (u + l) / 2)
                : void (e.y = e.yo + (u * i + l * s) / p)
            );
          (a = n.distance(e, t, !0, !0)),
            (o = n.distance(e, r, !0, !0)),
            (u = n.distance(t, t, !1, !0)),
            (l = n.distance(r, r, !1, !0)),
            0 !== (p = (s = Math.abs(a)) + (i = Math.abs(o)))
              ? Jt.setRelative(e, e, (u * i + l * s) / p, n, !0)
              : Jt.setRelative(e, e, (u + l) / 2, n, !0);
        },
        normalSlope: 0,
        setRelative: function (e, t, r, n, a) {
          if (n && n !== this) {
            var o = a ? t.xo : t.x,
              s = a ? t.yo : t.y,
              i = o + r * n.x,
              u = s + r * n.y;
            e.y = u + n.normalSlope * (e.x - i);
          } else e.y = (a ? t.yo : t.y) + r;
        },
        slope: Number.POSITIVE_INFINITY,
        touch: function (e) {
          e.yTouched = !0;
        },
        touched: function (e) {
          return e.yTouched;
        },
        untouch: function (e) {
          e.yTouched = !1;
        },
      };
    function Kt(e, t) {
      (this.x = e),
        (this.y = t),
        (this.axis = void 0),
        (this.slope = t / e),
        (this.normalSlope = -e / t),
        Object.freeze(this);
    }
    function $t(e, t) {
      var r = Math.sqrt(e * e + t * t);
      return (
        (t /= r),
        1 === (e /= r) && 0 === t ? Qt : 0 === e && 1 === t ? Jt : new Kt(e, t)
      );
    }
    function er(e, t, r, n) {
      (this.x = this.xo = Math.round(64 * e) / 64),
        (this.y = this.yo = Math.round(64 * t) / 64),
        (this.lastPointOfContour = r),
        (this.onCurve = n),
        (this.prevPointOnContour = void 0),
        (this.nextPointOnContour = void 0),
        (this.xTouched = !1),
        (this.yTouched = !1),
        Object.preventExtensions(this);
    }
    Object.freeze(Qt),
      Object.freeze(Jt),
      (Kt.prototype.distance = function (e, t, r, n) {
        return (
          this.x * Qt.distance(e, t, r, n) + this.y * Jt.distance(e, t, r, n)
        );
      }),
      (Kt.prototype.interpolate = function (e, t, r, n) {
        var a, o, s, i, u, l, p;
        (s = n.distance(e, t, !0, !0)),
          (i = n.distance(e, r, !0, !0)),
          (a = n.distance(t, t, !1, !0)),
          (o = n.distance(r, r, !1, !0)),
          0 !== (p = (u = Math.abs(s)) + (l = Math.abs(i)))
            ? this.setRelative(e, e, (a * l + o * u) / p, n, !0)
            : this.setRelative(e, e, (a + o) / 2, n, !0);
      }),
      (Kt.prototype.setRelative = function (e, t, r, n, a) {
        n = n || this;
        var o = a ? t.xo : t.x,
          s = a ? t.yo : t.y,
          i = o + r * n.x,
          u = s + r * n.y,
          l = n.normalSlope,
          p = this.slope,
          c = e.x,
          h = e.y;
        (e.x = (p * c - l * i + u - h) / (p - l)), (e.y = p * (e.x - c) + h);
      }),
      (Kt.prototype.touch = function (e) {
        (e.xTouched = !0), (e.yTouched = !0);
      }),
      (er.prototype.nextTouched = function (e) {
        for (var t = this.nextPointOnContour; !e.touched(t) && t !== this; )
          t = t.nextPointOnContour;
        return t;
      }),
      (er.prototype.prevTouched = function (e) {
        for (var t = this.prevPointOnContour; !e.touched(t) && t !== this; )
          t = t.prevPointOnContour;
        return t;
      });
    var tr = Object.freeze(new er(0, 0)),
      rr = {
        cvCutIn: 17 / 16,
        deltaBase: 9,
        deltaShift: 0.125,
        loop: 1,
        minDis: 1,
        autoFlip: !0,
      };
    function nr(e, t) {
      switch (((this.env = e), (this.stack = []), (this.prog = t), e)) {
        case "glyf":
          (this.zp0 = this.zp1 = this.zp2 = 1),
            (this.rp0 = this.rp1 = this.rp2 = 0);
        case "prep":
          (this.fv = this.pv = this.dpv = Qt), (this.round = qt);
      }
    }
    function ar(e) {
      for (
        var t = (e.tZone = new Array(e.gZone.length)), r = 0;
        r < t.length;
        r++
      )
        t[r] = new er(0, 0);
    }
    function or(e, t) {
      var r,
        n = e.prog,
        a = e.ip,
        o = 1;
      do {
        if (88 === (r = n[++a])) o++;
        else if (89 === r) o--;
        else if (64 === r) a += n[a + 1] + 1;
        else if (65 === r) a += 2 * n[a + 1] + 1;
        else if (r >= 176 && r <= 183) a += r - 176 + 1;
        else if (r >= 184 && r <= 191) a += 2 * (r - 184 + 1);
        else if (t && 1 === o && 27 === r) break;
      } while (o > 0);
      e.ip = a;
    }
    function sr(e, t) {
      exports.DEBUG && console.log(t.step, "SVTCA[" + e.axis + "]"),
        (t.fv = t.pv = t.dpv = e);
    }
    function ir(e, t) {
      exports.DEBUG && console.log(t.step, "SPVTCA[" + e.axis + "]"),
        (t.pv = t.dpv = e);
    }
    function ur(e, t) {
      exports.DEBUG && console.log(t.step, "SFVTCA[" + e.axis + "]"),
        (t.fv = e);
    }
    function lr(e, t) {
      var r,
        n,
        a = t.stack,
        o = a.pop(),
        s = a.pop(),
        i = t.z2[o],
        u = t.z1[s];
      exports.DEBUG && console.log("SPVTL[" + e + "]", o, s),
        e
          ? ((r = i.y - u.y), (n = u.x - i.x))
          : ((r = u.x - i.x), (n = u.y - i.y)),
        (t.pv = t.dpv = $t(r, n));
    }
    function pr(e, t) {
      var r,
        n,
        a = t.stack,
        o = a.pop(),
        s = a.pop(),
        i = t.z2[o],
        u = t.z1[s];
      exports.DEBUG && console.log("SFVTL[" + e + "]", o, s),
        e
          ? ((r = i.y - u.y), (n = u.x - i.x))
          : ((r = u.x - i.x), (n = u.y - i.y)),
        (t.fv = $t(r, n));
    }
    function cr(e) {
      exports.DEBUG && console.log(e.step, "POP[]"), e.stack.pop();
    }
    function hr(e, t) {
      var r = t.stack.pop(),
        n = t.z0[r],
        a = t.fv,
        o = t.pv;
      exports.DEBUG && console.log(t.step, "MDAP[" + e + "]", r);
      var s = o.distance(n, tr);
      e && (s = t.round(s)),
        a.setRelative(n, tr, s, o),
        a.touch(n),
        (t.rp0 = t.rp1 = r);
    }
    function fr(e, t) {
      var r,
        n,
        a,
        o = t.z2,
        s = o.length - 2;
      exports.DEBUG && console.log(t.step, "IUP[" + e.axis + "]");
      for (var i = 0; i < s; i++)
        (r = o[i]),
          e.touched(r) ||
            ((n = r.prevTouched(e)) !== r &&
              (n === (a = r.nextTouched(e)) &&
                e.setRelative(r, r, e.distance(n, n, !1, !0), e, !0),
              e.interpolate(r, n, a, e)));
    }
    function dr(e, t) {
      for (
        var r = t.stack,
          n = e ? t.rp1 : t.rp2,
          a = (e ? t.z0 : t.z1)[n],
          o = t.fv,
          s = t.pv,
          i = t.loop,
          u = t.z2;
        i--;

      ) {
        var l = r.pop(),
          p = u[l],
          c = s.distance(a, a, !1, !0);
        o.setRelative(p, p, c, s),
          o.touch(p),
          exports.DEBUG &&
            console.log(
              t.step,
              (t.loop > 1 ? "loop " + (t.loop - i) + ": " : "") +
                "SHP[" +
                (e ? "rp1" : "rp2") +
                "]",
              l
            );
      }
      t.loop = 1;
    }
    function gr(e, t) {
      var r = t.stack,
        n = e ? t.rp1 : t.rp2,
        a = (e ? t.z0 : t.z1)[n],
        o = t.fv,
        s = t.pv,
        i = r.pop(),
        u = t.z2[t.contours[i]],
        l = u;
      exports.DEBUG && console.log(t.step, "SHC[" + e + "]", i);
      var p = s.distance(a, a, !1, !0);
      do {
        l !== a && o.setRelative(l, l, p, s), (l = l.nextPointOnContour);
      } while (l !== u);
    }
    function vr(e, t) {
      var r,
        n,
        a = t.stack,
        o = e ? t.rp1 : t.rp2,
        s = (e ? t.z0 : t.z1)[o],
        i = t.fv,
        u = t.pv,
        l = a.pop();
      switch ((exports.DEBUG && console.log(t.step, "SHZ[" + e + "]", l), l)) {
        case 0:
          r = t.tZone;
          break;
        case 1:
          r = t.gZone;
          break;
        default:
          throw new Error("Invalid zone");
      }
      for (
        var p = u.distance(s, s, !1, !0), c = r.length - 2, h = 0;
        h < c;
        h++
      )
        (n = r[h]), i.setRelative(n, n, p, u);
    }
    function mr(e, t) {
      var r = t.stack,
        n = r.pop() / 64,
        a = r.pop(),
        o = t.z1[a],
        s = t.z0[t.rp0],
        i = t.fv,
        u = t.pv;
      i.setRelative(o, s, n, u),
        i.touch(o),
        exports.DEBUG && console.log(t.step, "MSIRP[" + e + "]", n, a),
        (t.rp1 = t.rp0),
        (t.rp2 = a),
        e && (t.rp0 = a);
    }
    function yr(e, t) {
      var r = t.stack,
        n = r.pop(),
        a = r.pop(),
        o = t.z0[a],
        s = t.fv,
        i = t.pv,
        u = t.cvt[n];
      exports.DEBUG &&
        console.log(t.step, "MIAP[" + e + "]", n, "(", u, ")", a);
      var l = i.distance(o, tr);
      e && (Math.abs(l - u) < t.cvCutIn && (l = u), (l = t.round(l))),
        s.setRelative(o, tr, l, i),
        0 === t.zp0 && ((o.xo = o.x), (o.yo = o.y)),
        s.touch(o),
        (t.rp0 = t.rp1 = a);
    }
    function br(e, t) {
      var r = t.stack,
        n = r.pop(),
        a = t.z2[n];
      exports.DEBUG && console.log(t.step, "GC[" + e + "]", n),
        r.push(64 * t.dpv.distance(a, tr, e, !1));
    }
    function xr(e, t) {
      var r = t.stack,
        n = r.pop(),
        a = r.pop(),
        o = t.z1[n],
        s = t.z0[a],
        i = t.dpv.distance(s, o, e, e);
      exports.DEBUG && console.log(t.step, "MD[" + e + "]", n, a, "->", i),
        t.stack.push(Math.round(64 * i));
    }
    function Sr(e, t) {
      var r = t.stack,
        n = r.pop(),
        a = t.fv,
        o = t.pv,
        s = t.ppem,
        i = t.deltaBase + 16 * (e - 1),
        u = t.deltaShift,
        l = t.z0;
      exports.DEBUG && console.log(t.step, "DELTAP[" + e + "]", n, r);
      for (var p = 0; p < n; p++) {
        var c = r.pop(),
          h = r.pop();
        if (i + ((240 & h) >> 4) === s) {
          var f = (15 & h) - 8;
          f >= 0 && f++,
            exports.DEBUG && console.log(t.step, "DELTAPFIX", c, "by", f * u);
          var d = l[c];
          a.setRelative(d, d, f * u, o);
        }
      }
    }
    function Tr(e, t) {
      var r = t.stack,
        n = r.pop();
      exports.DEBUG && console.log(t.step, "ROUND[]"),
        r.push(64 * t.round(n / 64));
    }
    function Ur(e, t) {
      var r = t.stack,
        n = r.pop(),
        a = t.ppem,
        o = t.deltaBase + 16 * (e - 1),
        s = t.deltaShift;
      exports.DEBUG && console.log(t.step, "DELTAC[" + e + "]", n, r);
      for (var i = 0; i < n; i++) {
        var u = r.pop(),
          l = r.pop();
        if (o + ((240 & l) >> 4) === a) {
          var p = (15 & l) - 8;
          p >= 0 && p++;
          var c = p * s;
          exports.DEBUG && console.log(t.step, "DELTACFIX", u, "by", c),
            (t.cvt[u] += c);
        }
      }
    }
    function kr(e, t) {
      var r,
        n,
        a = t.stack,
        o = a.pop(),
        s = a.pop(),
        i = t.z2[o],
        u = t.z1[s];
      exports.DEBUG && console.log(t.step, "SDPVTL[" + e + "]", o, s),
        e
          ? ((r = i.y - u.y), (n = u.x - i.x))
          : ((r = u.x - i.x), (n = u.y - i.y)),
        (t.dpv = $t(r, n));
    }
    function Or(e, t) {
      var r = t.stack,
        n = t.prog,
        a = t.ip;
      exports.DEBUG && console.log(t.step, "PUSHB[" + e + "]");
      for (var o = 0; o < e; o++) r.push(n[++a]);
      t.ip = a;
    }
    function Er(e, t) {
      var r = t.ip,
        n = t.prog,
        a = t.stack;
      exports.DEBUG && console.log(t.ip, "PUSHW[" + e + "]");
      for (var o = 0; o < e; o++) {
        var s = (n[++r] << 8) | n[++r];
        32768 & s && (s = -(1 + (65535 ^ s))), a.push(s);
      }
      t.ip = r;
    }
    function Rr(e, t, r, n, a, o) {
      var s,
        i,
        u,
        l,
        p = o.stack,
        c = e && p.pop(),
        h = p.pop(),
        f = o.rp0,
        d = o.z0[f],
        g = o.z1[h],
        v = o.minDis,
        m = o.fv,
        y = o.dpv;
      (u = (i = s = y.distance(g, d, !0, !0)) >= 0 ? 1 : -1),
        (i = Math.abs(i)),
        e && ((l = o.cvt[c]), n && Math.abs(i - l) < o.cvCutIn && (i = l)),
        r && i < v && (i = v),
        n && (i = o.round(i)),
        m.setRelative(g, d, u * i, y),
        m.touch(g),
        exports.DEBUG &&
          console.log(
            o.step,
            (e ? "MIRP[" : "MDRP[") +
              (t ? "M" : "m") +
              (r ? ">" : "_") +
              (n ? "R" : "_") +
              (0 === a ? "Gr" : 1 === a ? "Bl" : 2 === a ? "Wh" : "") +
              "]",
            e ? c + "(" + o.cvt[c] + "," + l + ")" : "",
            h,
            "(d =",
            s,
            "->",
            u * i,
            ")"
          ),
        (o.rp1 = o.rp0),
        (o.rp2 = h),
        t && (o.rp0 = h);
    }
    function Lr(e) {
      (this.char = e), (this.state = {}), (this.activeState = null);
    }
    function wr(e, t, r) {
      (this.contextName = r), (this.startIndex = e), (this.endOffset = t);
    }
    function Cr(e, t, r) {
      (this.contextName = e),
        (this.openRange = null),
        (this.ranges = []),
        (this.checkStart = t),
        (this.checkEnd = r);
    }
    function Dr(e, t) {
      (this.context = e),
        (this.index = t),
        (this.length = e.length),
        (this.current = e[t]),
        (this.backtrack = e.slice(0, t)),
        (this.lookahead = e.slice(t + 1));
    }
    function Ir(e) {
      (this.eventId = e), (this.subscribers = []);
    }
    function Mr(e) {
      var t = this,
        r = [
          "start",
          "end",
          "next",
          "newToken",
          "contextStart",
          "contextEnd",
          "insertToken",
          "removeToken",
          "removeRange",
          "replaceToken",
          "replaceRange",
          "composeRUD",
          "updateContextsRanges",
        ];
      r.forEach(function (e) {
        Object.defineProperty(t.events, e, { value: new Ir(e) });
      }),
        e &&
          r.forEach(function (r) {
            var n = e[r];
            "function" == typeof n && t.events[r].subscribe(n);
          });
      [
        "insertToken",
        "removeToken",
        "removeRange",
        "replaceToken",
        "replaceRange",
        "composeRUD",
      ].forEach(function (e) {
        t.events[e].subscribe(t.updateContextsRanges);
      });
    }
    function Gr(e) {
      (this.tokens = []),
        (this.registeredContexts = {}),
        (this.contextCheckers = []),
        (this.events = {}),
        (this.registeredModifiers = []),
        Mr.call(this, e);
    }
    function Nr(e) {
      return /[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(e);
    }
    function Fr(e) {
      return /[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(
        e
      );
    }
    function Br(e) {
      return /[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(
        e
      );
    }
    function Ar(e) {
      return /[A-z]/.test(e);
    }
    function Pr(e) {
      (this.font = e), (this.features = {});
    }
    function Hr(e) {
      (this.id = e.id),
        (this.tag = e.tag),
        (this.substitution = e.substitution);
    }
    function zr(e, t) {
      if (!e) return -1;
      switch (t.format) {
        case 1:
          return t.glyphs.indexOf(e);
        case 2:
          for (var r = t.ranges, n = 0; n < r.length; n++) {
            var a = r[n];
            if (e >= a.start && e <= a.end) {
              var o = e - a.start;
              return a.index + o;
            }
          }
          break;
        default:
          return -1;
      }
      return -1;
    }
    function Wr(e, t) {
      return -1 === zr(e, t.coverage) ? null : e + t.deltaGlyphId;
    }
    function _r(e, t) {
      var r = zr(e, t.coverage);
      return -1 === r ? null : t.substitute[r];
    }
    function qr(e, t) {
      for (var r = [], n = 0; n < e.length; n++) {
        var a = e[n],
          o = t.current,
          s = zr((o = Array.isArray(o) ? o[0] : o), a);
        -1 !== s && r.push(s);
      }
      return r.length !== e.length ? -1 : r;
    }
    function jr(e, t) {
      var r =
        t.inputCoverage.length +
        t.lookaheadCoverage.length +
        t.backtrackCoverage.length;
      if (e.context.length < r) return [];
      var n = qr(t.inputCoverage, e);
      if (-1 === n) return [];
      var a = t.inputCoverage.length - 1;
      if (e.lookahead.length < t.lookaheadCoverage.length) return [];
      for (var o = e.lookahead.slice(a); o.length && Br(o[0].char); ) o.shift();
      var s = new Dr(o, 0),
        i = qr(t.lookaheadCoverage, s),
        u = [].concat(e.backtrack);
      for (u.reverse(); u.length && Br(u[0].char); ) u.shift();
      if (u.length < t.backtrackCoverage.length) return [];
      var l = new Dr(u, 0),
        p = qr(t.backtrackCoverage, l),
        c = [];
      if (
        n.length === t.inputCoverage.length &&
        i.length === t.lookaheadCoverage.length &&
        p.length === t.backtrackCoverage.length
      )
        for (var h = 0; h < t.lookupRecords.length; h++)
          for (
            var f = t.lookupRecords[h].lookupListIndex,
              d = this.getLookupByIndex(f),
              g = 0;
            g < d.subtables.length;
            g++
          ) {
            var v = d.subtables[g],
              m = this.getLookupMethod(d, v);
            if ("12" === this.getSubstitutionType(d, v))
              for (var y = 0; y < n.length; y++) {
                var b = m(e.get(y));
                b && c.push(b);
              }
          }
      return c;
    }
    function Xr(e, t) {
      var r,
        n = zr(e.current, t.coverage);
      if (-1 === n) return null;
      for (var a = t.ligatureSets[n], o = 0; o < a.length; o++) {
        r = a[o];
        for (var s = 0; s < r.components.length; s++) {
          if (e.lookahead[s] !== r.components[s]) break;
          if (s === r.components.length - 1) return r;
        }
      }
      return null;
    }
    function Yr(e, t) {
      var r = zr(e, t.coverage);
      return -1 === r ? null : t.sequences[r];
    }
    (Wt.prototype.exec = function (e, t) {
      if ("number" != typeof t) throw new Error("Point size is not a number!");
      if (!(this._errorState > 2)) {
        var r = this.font,
          n = this._prepState;
        if (!n || n.ppem !== t) {
          var a = this._fpgmState;
          if (!a) {
            (nr.prototype = rr),
              ((a = this._fpgmState = new nr("fpgm", r.tables.fpgm)).funcs =
                []),
              (a.font = r),
              exports.DEBUG && (console.log("---EXEC FPGM---"), (a.step = -1));
            try {
              At(a);
            } catch (e) {
              return (
                console.log("Hinting error in FPGM:" + e),
                void (this._errorState = 3)
              );
            }
          }
          (nr.prototype = a),
            ((n = this._prepState = new nr("prep", r.tables.prep)).ppem = t);
          var o = r.tables.cvt;
          if (o)
            for (
              var s = (n.cvt = new Array(o.length)),
                i = t / r.unitsPerEm,
                u = 0;
              u < o.length;
              u++
            )
              s[u] = o[u] * i;
          else n.cvt = [];
          exports.DEBUG && (console.log("---EXEC PREP---"), (n.step = -1));
          try {
            At(n);
          } catch (e) {
            this._errorState < 2 && console.log("Hinting error in PREP:" + e),
              (this._errorState = 2);
          }
        }
        if (!(this._errorState > 1))
          try {
            return Pt(e, n);
          } catch (e) {
            return (
              this._errorState < 1 &&
                (console.log("Hinting error:" + e),
                console.log("Note: further hinting errors are silenced")),
              void (this._errorState = 1)
            );
          }
      }
    }),
      (Pt = function (e, t) {
        var r,
          n,
          a,
          o = t.ppem / t.font.unitsPerEm,
          s = o,
          i = e.components;
        if (((nr.prototype = t), i)) {
          var u = t.font;
          (n = []), (r = []);
          for (var l = 0; l < i.length; l++) {
            var p = i[l],
              c = u.glyphs.get(p.glyphIndex);
            (a = new nr("glyf", c.instructions)),
              exports.DEBUG &&
                (console.log("---EXEC COMP " + l + "---"), (a.step = -1)),
              Ht(c, a, o, s);
            for (
              var h = Math.round(p.dx * o),
                f = Math.round(p.dy * s),
                d = a.gZone,
                g = a.contours,
                v = 0;
              v < d.length;
              v++
            ) {
              var m = d[v];
              (m.xTouched = m.yTouched = !1),
                (m.xo = m.x = m.x + h),
                (m.yo = m.y = m.y + f);
            }
            var y = n.length;
            n.push.apply(n, d);
            for (var b = 0; b < g.length; b++) r.push(g[b] + y);
          }
          e.instructions &&
            !a.inhibitGridFit &&
            (((a = new nr("glyf", e.instructions)).gZone =
              a.z0 =
              a.z1 =
              a.z2 =
                n),
            (a.contours = r),
            n.push(new er(0, 0), new er(Math.round(e.advanceWidth * o), 0)),
            exports.DEBUG &&
              (console.log("---EXEC COMPOSITE---"), (a.step = -1)),
            At(a),
            (n.length -= 2));
        } else
          (a = new nr("glyf", e.instructions)),
            exports.DEBUG && (console.log("---EXEC GLYPH---"), (a.step = -1)),
            Ht(e, a, o, s),
            (n = a.gZone);
        return n;
      }),
      (Ht = function (e, t, r, n) {
        for (
          var a,
            o,
            s,
            i = e.points || [],
            u = i.length,
            l = (t.gZone = t.z0 = t.z1 = t.z2 = []),
            p = (t.contours = []),
            c = 0;
          c < u;
          c++
        )
          (a = i[c]),
            (l[c] = new er(a.x * r, a.y * n, a.lastPointOfContour, a.onCurve));
        for (var h = 0; h < u; h++)
          (a = l[h]),
            o || ((o = a), p.push(h)),
            a.lastPointOfContour
              ? ((a.nextPointOnContour = o),
                (o.prevPointOnContour = a),
                (o = void 0))
              : ((s = l[h + 1]),
                (a.nextPointOnContour = s),
                (s.prevPointOnContour = a));
        if (!t.inhibitGridFit) {
          if (exports.DEBUG) {
            console.log("PROCESSING GLYPH", t.stack);
            for (var f = 0; f < u; f++) console.log(f, l[f].x, l[f].y);
          }
          if (
            (l.push(new er(0, 0), new er(Math.round(e.advanceWidth * r), 0)),
            At(t),
            (l.length -= 2),
            exports.DEBUG)
          ) {
            console.log("FINISHED GLYPH", t.stack);
            for (var d = 0; d < u; d++) console.log(d, l[d].x, l[d].y);
          }
        }
      }),
      (At = function (e) {
        var t = e.prog;
        if (t) {
          var r,
            n = t.length;
          for (e.ip = 0; e.ip < n; e.ip++) {
            if ((exports.DEBUG && e.step++, !(r = Bt[t[e.ip]])))
              throw new Error(
                "unknown instruction: 0x" + Number(t[e.ip]).toString(16)
              );
            r(e);
          }
        }
      }),
      (Bt = [
        sr.bind(void 0, Jt),
        sr.bind(void 0, Qt),
        ir.bind(void 0, Jt),
        ir.bind(void 0, Qt),
        ur.bind(void 0, Jt),
        ur.bind(void 0, Qt),
        lr.bind(void 0, 0),
        lr.bind(void 0, 1),
        pr.bind(void 0, 0),
        pr.bind(void 0, 1),
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "SPVFS[]", r, n),
            (e.pv = e.dpv = $t(n, r));
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "SPVFS[]", r, n),
            (e.fv = $t(n, r));
        },
        function (e) {
          var t = e.stack,
            r = e.pv;
          exports.DEBUG && console.log(e.step, "GPV[]"),
            t.push(16384 * r.x),
            t.push(16384 * r.y);
        },
        function (e) {
          var t = e.stack,
            r = e.fv;
          exports.DEBUG && console.log(e.step, "GFV[]"),
            t.push(16384 * r.x),
            t.push(16384 * r.y);
        },
        function (e) {
          (e.fv = e.pv), exports.DEBUG && console.log(e.step, "SFVTPV[]");
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop(),
            a = t.pop(),
            o = t.pop(),
            s = t.pop(),
            i = e.z0,
            u = e.z1,
            l = i[r],
            p = i[n],
            c = u[a],
            h = u[o],
            f = e.z2[s];
          exports.DEBUG && console.log("ISECT[], ", r, n, a, o, s);
          var d = l.x,
            g = l.y,
            v = p.x,
            m = p.y,
            y = c.x,
            b = c.y,
            x = h.x,
            S = h.y,
            T = (d - v) * (b - S) - (g - m) * (y - x),
            U = d * m - g * v,
            k = y * S - b * x;
          (f.x = (U * (y - x) - k * (d - v)) / T),
            (f.y = (U * (b - S) - k * (g - m)) / T);
        },
        function (e) {
          (e.rp0 = e.stack.pop()),
            exports.DEBUG && console.log(e.step, "SRP0[]", e.rp0);
        },
        function (e) {
          (e.rp1 = e.stack.pop()),
            exports.DEBUG && console.log(e.step, "SRP1[]", e.rp1);
        },
        function (e) {
          (e.rp2 = e.stack.pop()),
            exports.DEBUG && console.log(e.step, "SRP2[]", e.rp2);
        },
        function (e) {
          var t = e.stack.pop();
          switch (
            (exports.DEBUG && console.log(e.step, "SZP0[]", t), (e.zp0 = t), t)
          ) {
            case 0:
              e.tZone || ar(e), (e.z0 = e.tZone);
              break;
            case 1:
              e.z0 = e.gZone;
              break;
            default:
              throw new Error("Invalid zone pointer");
          }
        },
        function (e) {
          var t = e.stack.pop();
          switch (
            (exports.DEBUG && console.log(e.step, "SZP1[]", t), (e.zp1 = t), t)
          ) {
            case 0:
              e.tZone || ar(e), (e.z1 = e.tZone);
              break;
            case 1:
              e.z1 = e.gZone;
              break;
            default:
              throw new Error("Invalid zone pointer");
          }
        },
        function (e) {
          var t = e.stack.pop();
          switch (
            (exports.DEBUG && console.log(e.step, "SZP2[]", t), (e.zp2 = t), t)
          ) {
            case 0:
              e.tZone || ar(e), (e.z2 = e.tZone);
              break;
            case 1:
              e.z2 = e.gZone;
              break;
            default:
              throw new Error("Invalid zone pointer");
          }
        },
        function (e) {
          var t = e.stack.pop();
          switch (
            (exports.DEBUG && console.log(e.step, "SZPS[]", t),
            (e.zp0 = e.zp1 = e.zp2 = t),
            t)
          ) {
            case 0:
              e.tZone || ar(e), (e.z0 = e.z1 = e.z2 = e.tZone);
              break;
            case 1:
              e.z0 = e.z1 = e.z2 = e.gZone;
              break;
            default:
              throw new Error("Invalid zone pointer");
          }
        },
        function (e) {
          (e.loop = e.stack.pop()),
            exports.DEBUG && console.log(e.step, "SLOOP[]", e.loop);
        },
        function (e) {
          exports.DEBUG && console.log(e.step, "RTG[]"), (e.round = qt);
        },
        function (e) {
          exports.DEBUG && console.log(e.step, "RTHG[]"), (e.round = Xt);
        },
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "SMD[]", t), (e.minDis = t / 64);
        },
        function (e) {
          exports.DEBUG && console.log(e.step, "ELSE[]"), or(e, !1);
        },
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "JMPR[]", t), (e.ip += t - 1);
        },
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "SCVTCI[]", t),
            (e.cvCutIn = t / 64);
        },
        void 0,
        void 0,
        function (e) {
          var t = e.stack;
          exports.DEBUG && console.log(e.step, "DUP[]"),
            t.push(t[t.length - 1]);
        },
        cr,
        function (e) {
          exports.DEBUG && console.log(e.step, "CLEAR[]"), (e.stack.length = 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "SWAP[]"), t.push(r), t.push(n);
        },
        function (e) {
          var t = e.stack;
          exports.DEBUG && console.log(e.step, "DEPTH[]"), t.push(t.length);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "CINDEX[]", r),
            t.push(t[t.length - r]);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "MINDEX[]", r),
            t.push(t.splice(t.length - r, 1)[0]);
        },
        void 0,
        void 0,
        void 0,
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "LOOPCALL[]", r, n);
          var a = e.ip,
            o = e.prog;
          e.prog = e.funcs[r];
          for (var s = 0; s < n; s++)
            At(e),
              exports.DEBUG &&
                console.log(
                  ++e.step,
                  s + 1 < n ? "next loopcall" : "done loopcall",
                  s
                );
          (e.ip = a), (e.prog = o);
        },
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "CALL[]", t);
          var r = e.ip,
            n = e.prog;
          (e.prog = e.funcs[t]),
            At(e),
            (e.ip = r),
            (e.prog = n),
            exports.DEBUG && console.log(++e.step, "returning from", t);
        },
        function (e) {
          if ("fpgm" !== e.env) throw new Error("FDEF not allowed here");
          var t = e.stack,
            r = e.prog,
            n = e.ip,
            a = t.pop(),
            o = n;
          for (
            exports.DEBUG && console.log(e.step, "FDEF[]", a);
            45 !== r[++n];

          );
          (e.ip = n), (e.funcs[a] = r.slice(o + 1, n));
        },
        void 0,
        hr.bind(void 0, 0),
        hr.bind(void 0, 1),
        fr.bind(void 0, Jt),
        fr.bind(void 0, Qt),
        dr.bind(void 0, 0),
        dr.bind(void 0, 1),
        gr.bind(void 0, 0),
        gr.bind(void 0, 1),
        vr.bind(void 0, 0),
        vr.bind(void 0, 1),
        function (e) {
          for (
            var t = e.stack, r = e.loop, n = e.fv, a = t.pop() / 64, o = e.z2;
            r--;

          ) {
            var s = t.pop(),
              i = o[s];
            exports.DEBUG &&
              console.log(
                e.step,
                (e.loop > 1 ? "loop " + (e.loop - r) + ": " : "") + "SHPIX[]",
                s,
                a
              ),
              n.setRelative(i, i, a),
              n.touch(i);
          }
          e.loop = 1;
        },
        function (e) {
          for (
            var t = e.stack,
              r = e.rp1,
              n = e.rp2,
              a = e.loop,
              o = e.z0[r],
              s = e.z1[n],
              i = e.fv,
              u = e.dpv,
              l = e.z2;
            a--;

          ) {
            var p = t.pop(),
              c = l[p];
            exports.DEBUG &&
              console.log(
                e.step,
                (e.loop > 1 ? "loop " + (e.loop - a) + ": " : "") + "IP[]",
                p,
                r,
                "<->",
                n
              ),
              i.interpolate(c, o, s, u),
              i.touch(c);
          }
          e.loop = 1;
        },
        mr.bind(void 0, 0),
        mr.bind(void 0, 1),
        function (e) {
          for (
            var t = e.stack,
              r = e.rp0,
              n = e.z0[r],
              a = e.loop,
              o = e.fv,
              s = e.pv,
              i = e.z1;
            a--;

          ) {
            var u = t.pop(),
              l = i[u];
            exports.DEBUG &&
              console.log(
                e.step,
                (e.loop > 1 ? "loop " + (e.loop - a) + ": " : "") + "ALIGNRP[]",
                u
              ),
              o.setRelative(l, n, 0, s),
              o.touch(l);
          }
          e.loop = 1;
        },
        function (e) {
          exports.DEBUG && console.log(e.step, "RTDG[]"), (e.round = jt);
        },
        yr.bind(void 0, 0),
        yr.bind(void 0, 1),
        function (e) {
          var t = e.prog,
            r = e.ip,
            n = e.stack,
            a = t[++r];
          exports.DEBUG && console.log(e.step, "NPUSHB[]", a);
          for (var o = 0; o < a; o++) n.push(t[++r]);
          e.ip = r;
        },
        function (e) {
          var t = e.ip,
            r = e.prog,
            n = e.stack,
            a = r[++t];
          exports.DEBUG && console.log(e.step, "NPUSHW[]", a);
          for (var o = 0; o < a; o++) {
            var s = (r[++t] << 8) | r[++t];
            32768 & s && (s = -(1 + (65535 ^ s))), n.push(s);
          }
          e.ip = t;
        },
        function (e) {
          var t = e.stack,
            r = e.store;
          r || (r = e.store = []);
          var n = t.pop(),
            a = t.pop();
          exports.DEBUG && console.log(e.step, "WS", n, a), (r[a] = n);
        },
        function (e) {
          var t = e.stack,
            r = e.store,
            n = t.pop();
          exports.DEBUG && console.log(e.step, "RS", n);
          var a = (r && r[n]) || 0;
          t.push(a);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "WCVTP", r, n),
            (e.cvt[n] = r / 64);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "RCVT", r),
            t.push(64 * e.cvt[r]);
        },
        br.bind(void 0, 0),
        br.bind(void 0, 1),
        void 0,
        xr.bind(void 0, 0),
        xr.bind(void 0, 1),
        function (e) {
          exports.DEBUG && console.log(e.step, "MPPEM[]"), e.stack.push(e.ppem);
        },
        void 0,
        function (e) {
          exports.DEBUG && console.log(e.step, "FLIPON[]"), (e.autoFlip = !0);
        },
        void 0,
        void 0,
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "LT[]", r, n),
            t.push(n < r ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "LTEQ[]", r, n),
            t.push(n <= r ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "GT[]", r, n),
            t.push(n > r ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "GTEQ[]", r, n),
            t.push(n >= r ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "EQ[]", r, n),
            t.push(r === n ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "NEQ[]", r, n),
            t.push(r !== n ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "ODD[]", r),
            t.push(Math.trunc(r) % 2 ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "EVEN[]", r),
            t.push(Math.trunc(r) % 2 ? 0 : 1);
        },
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "IF[]", t),
            t || (or(e, !0), exports.DEBUG && console.log(e.step, "EIF[]"));
        },
        function (e) {
          exports.DEBUG && console.log(e.step, "EIF[]");
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "AND[]", r, n),
            t.push(r && n ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "OR[]", r, n),
            t.push(r || n ? 1 : 0);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "NOT[]", r), t.push(r ? 0 : 1);
        },
        Sr.bind(void 0, 1),
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "SDB[]", t), (e.deltaBase = t);
        },
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "SDS[]", t),
            (e.deltaShift = Math.pow(0.5, t));
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "ADD[]", r, n), t.push(n + r);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "SUB[]", r, n), t.push(n - r);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "DIV[]", r, n),
            t.push((64 * n) / r);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "MUL[]", r, n),
            t.push((n * r) / 64);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "ABS[]", r), t.push(Math.abs(r));
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "NEG[]", r), t.push(-r);
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "FLOOR[]", r),
            t.push(64 * Math.floor(r / 64));
        },
        function (e) {
          var t = e.stack,
            r = t.pop();
          exports.DEBUG && console.log(e.step, "CEILING[]", r),
            t.push(64 * Math.ceil(r / 64));
        },
        Tr.bind(void 0, 0),
        Tr.bind(void 0, 1),
        Tr.bind(void 0, 2),
        Tr.bind(void 0, 3),
        void 0,
        void 0,
        void 0,
        void 0,
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "WCVTF[]", r, n),
            (e.cvt[n] = (r * e.ppem) / e.font.unitsPerEm);
        },
        Sr.bind(void 0, 2),
        Sr.bind(void 0, 3),
        Ur.bind(void 0, 1),
        Ur.bind(void 0, 2),
        Ur.bind(void 0, 3),
        function (e) {
          var t,
            r = e.stack.pop();
          switch (
            (exports.DEBUG && console.log(e.step, "SROUND[]", r),
            (e.round = Zt),
            192 & r)
          ) {
            case 0:
              t = 0.5;
              break;
            case 64:
              t = 1;
              break;
            case 128:
              t = 2;
              break;
            default:
              throw new Error("invalid SROUND value");
          }
          switch (((e.srPeriod = t), 48 & r)) {
            case 0:
              e.srPhase = 0;
              break;
            case 16:
              e.srPhase = 0.25 * t;
              break;
            case 32:
              e.srPhase = 0.5 * t;
              break;
            case 48:
              e.srPhase = 0.75 * t;
              break;
            default:
              throw new Error("invalid SROUND value");
          }
          (r &= 15), (e.srThreshold = 0 === r ? 0 : (r / 8 - 0.5) * t);
        },
        function (e) {
          var t,
            r = e.stack.pop();
          switch (
            (exports.DEBUG && console.log(e.step, "S45ROUND[]", r),
            (e.round = Zt),
            192 & r)
          ) {
            case 0:
              t = Math.sqrt(2) / 2;
              break;
            case 64:
              t = Math.sqrt(2);
              break;
            case 128:
              t = 2 * Math.sqrt(2);
              break;
            default:
              throw new Error("invalid S45ROUND value");
          }
          switch (((e.srPeriod = t), 48 & r)) {
            case 0:
              e.srPhase = 0;
              break;
            case 16:
              e.srPhase = 0.25 * t;
              break;
            case 32:
              e.srPhase = 0.5 * t;
              break;
            case 48:
              e.srPhase = 0.75 * t;
              break;
            default:
              throw new Error("invalid S45ROUND value");
          }
          (r &= 15), (e.srThreshold = 0 === r ? 0 : (r / 8 - 0.5) * t);
        },
        void 0,
        void 0,
        function (e) {
          exports.DEBUG && console.log(e.step, "ROFF[]"), (e.round = _t);
        },
        void 0,
        function (e) {
          exports.DEBUG && console.log(e.step, "RUTG[]"), (e.round = Yt);
        },
        function (e) {
          exports.DEBUG && console.log(e.step, "RDTG[]"), (e.round = Vt);
        },
        cr,
        cr,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "SCANCTRL[]", t);
        },
        kr.bind(void 0, 0),
        kr.bind(void 0, 1),
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = 0;
          exports.DEBUG && console.log(e.step, "GETINFO[]", r),
            1 & r && (n = 35),
            32 & r && (n |= 4096),
            t.push(n);
        },
        void 0,
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop(),
            a = t.pop();
          exports.DEBUG && console.log(e.step, "ROLL[]"),
            t.push(n),
            t.push(r),
            t.push(a);
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "MAX[]", r, n),
            t.push(Math.max(n, r));
        },
        function (e) {
          var t = e.stack,
            r = t.pop(),
            n = t.pop();
          exports.DEBUG && console.log(e.step, "MIN[]", r, n),
            t.push(Math.min(n, r));
        },
        function (e) {
          var t = e.stack.pop();
          exports.DEBUG && console.log(e.step, "SCANTYPE[]", t);
        },
        function (e) {
          var t = e.stack.pop(),
            r = e.stack.pop();
          switch (
            (exports.DEBUG && console.log(e.step, "INSTCTRL[]", t, r), t)
          ) {
            case 1:
              return void (e.inhibitGridFit = !!r);
            case 2:
              return void (e.ignoreCvt = !!r);
            default:
              throw new Error("invalid INSTCTRL[] selector");
          }
        },
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        Or.bind(void 0, 1),
        Or.bind(void 0, 2),
        Or.bind(void 0, 3),
        Or.bind(void 0, 4),
        Or.bind(void 0, 5),
        Or.bind(void 0, 6),
        Or.bind(void 0, 7),
        Or.bind(void 0, 8),
        Er.bind(void 0, 1),
        Er.bind(void 0, 2),
        Er.bind(void 0, 3),
        Er.bind(void 0, 4),
        Er.bind(void 0, 5),
        Er.bind(void 0, 6),
        Er.bind(void 0, 7),
        Er.bind(void 0, 8),
        Rr.bind(void 0, 0, 0, 0, 0, 0),
        Rr.bind(void 0, 0, 0, 0, 0, 1),
        Rr.bind(void 0, 0, 0, 0, 0, 2),
        Rr.bind(void 0, 0, 0, 0, 0, 3),
        Rr.bind(void 0, 0, 0, 0, 1, 0),
        Rr.bind(void 0, 0, 0, 0, 1, 1),
        Rr.bind(void 0, 0, 0, 0, 1, 2),
        Rr.bind(void 0, 0, 0, 0, 1, 3),
        Rr.bind(void 0, 0, 0, 1, 0, 0),
        Rr.bind(void 0, 0, 0, 1, 0, 1),
        Rr.bind(void 0, 0, 0, 1, 0, 2),
        Rr.bind(void 0, 0, 0, 1, 0, 3),
        Rr.bind(void 0, 0, 0, 1, 1, 0),
        Rr.bind(void 0, 0, 0, 1, 1, 1),
        Rr.bind(void 0, 0, 0, 1, 1, 2),
        Rr.bind(void 0, 0, 0, 1, 1, 3),
        Rr.bind(void 0, 0, 1, 0, 0, 0),
        Rr.bind(void 0, 0, 1, 0, 0, 1),
        Rr.bind(void 0, 0, 1, 0, 0, 2),
        Rr.bind(void 0, 0, 1, 0, 0, 3),
        Rr.bind(void 0, 0, 1, 0, 1, 0),
        Rr.bind(void 0, 0, 1, 0, 1, 1),
        Rr.bind(void 0, 0, 1, 0, 1, 2),
        Rr.bind(void 0, 0, 1, 0, 1, 3),
        Rr.bind(void 0, 0, 1, 1, 0, 0),
        Rr.bind(void 0, 0, 1, 1, 0, 1),
        Rr.bind(void 0, 0, 1, 1, 0, 2),
        Rr.bind(void 0, 0, 1, 1, 0, 3),
        Rr.bind(void 0, 0, 1, 1, 1, 0),
        Rr.bind(void 0, 0, 1, 1, 1, 1),
        Rr.bind(void 0, 0, 1, 1, 1, 2),
        Rr.bind(void 0, 0, 1, 1, 1, 3),
        Rr.bind(void 0, 1, 0, 0, 0, 0),
        Rr.bind(void 0, 1, 0, 0, 0, 1),
        Rr.bind(void 0, 1, 0, 0, 0, 2),
        Rr.bind(void 0, 1, 0, 0, 0, 3),
        Rr.bind(void 0, 1, 0, 0, 1, 0),
        Rr.bind(void 0, 1, 0, 0, 1, 1),
        Rr.bind(void 0, 1, 0, 0, 1, 2),
        Rr.bind(void 0, 1, 0, 0, 1, 3),
        Rr.bind(void 0, 1, 0, 1, 0, 0),
        Rr.bind(void 0, 1, 0, 1, 0, 1),
        Rr.bind(void 0, 1, 0, 1, 0, 2),
        Rr.bind(void 0, 1, 0, 1, 0, 3),
        Rr.bind(void 0, 1, 0, 1, 1, 0),
        Rr.bind(void 0, 1, 0, 1, 1, 1),
        Rr.bind(void 0, 1, 0, 1, 1, 2),
        Rr.bind(void 0, 1, 0, 1, 1, 3),
        Rr.bind(void 0, 1, 1, 0, 0, 0),
        Rr.bind(void 0, 1, 1, 0, 0, 1),
        Rr.bind(void 0, 1, 1, 0, 0, 2),
        Rr.bind(void 0, 1, 1, 0, 0, 3),
        Rr.bind(void 0, 1, 1, 0, 1, 0),
        Rr.bind(void 0, 1, 1, 0, 1, 1),
        Rr.bind(void 0, 1, 1, 0, 1, 2),
        Rr.bind(void 0, 1, 1, 0, 1, 3),
        Rr.bind(void 0, 1, 1, 1, 0, 0),
        Rr.bind(void 0, 1, 1, 1, 0, 1),
        Rr.bind(void 0, 1, 1, 1, 0, 2),
        Rr.bind(void 0, 1, 1, 1, 0, 3),
        Rr.bind(void 0, 1, 1, 1, 1, 0),
        Rr.bind(void 0, 1, 1, 1, 1, 1),
        Rr.bind(void 0, 1, 1, 1, 1, 2),
        Rr.bind(void 0, 1, 1, 1, 1, 3),
      ]),
      (Lr.prototype.setState = function (e, t) {
        return (
          (this.state[e] = t),
          (this.activeState = { key: e, value: this.state[e] }),
          this.activeState
        );
      }),
      (Lr.prototype.getState = function (e) {
        return this.state[e] || null;
      }),
      (Gr.prototype.inboundIndex = function (e) {
        return e >= 0 && e < this.tokens.length;
      }),
      (Gr.prototype.composeRUD = function (e) {
        var t = this,
          r = e.map(function (e) {
            return t[e[0]].apply(t, e.slice(1).concat(true));
          }),
          n = function (e) {
            return "object" == typeof e && e.hasOwnProperty("FAIL");
          };
        if (r.every(n))
          return {
            FAIL: "composeRUD: one or more operations hasn't completed successfully",
            report: r.filter(n),
          };
        this.dispatch("composeRUD", [
          r.filter(function (e) {
            return !n(e);
          }),
        ]);
      }),
      (Gr.prototype.replaceRange = function (e, t, r, n) {
        t = null !== t ? t : this.tokens.length;
        var a = r.every(function (e) {
          return e instanceof Lr;
        });
        if (!isNaN(e) && this.inboundIndex(e) && a) {
          var o = this.tokens.splice.apply(this.tokens, [e, t].concat(r));
          return n || this.dispatch("replaceToken", [e, t, r]), [o, r];
        }
        return { FAIL: "replaceRange: invalid tokens or startIndex." };
      }),
      (Gr.prototype.replaceToken = function (e, t, r) {
        if (!isNaN(e) && this.inboundIndex(e) && t instanceof Lr) {
          var n = this.tokens.splice(e, 1, t);
          return r || this.dispatch("replaceToken", [e, t]), [n[0], t];
        }
        return { FAIL: "replaceToken: invalid token or index." };
      }),
      (Gr.prototype.removeRange = function (e, t, r) {
        t = isNaN(t) ? this.tokens.length : t;
        var n = this.tokens.splice(e, t);
        return r || this.dispatch("removeRange", [n, e, t]), n;
      }),
      (Gr.prototype.removeToken = function (e, t) {
        if (!isNaN(e) && this.inboundIndex(e)) {
          var r = this.tokens.splice(e, 1);
          return t || this.dispatch("removeToken", [r, e]), r;
        }
        return { FAIL: "removeToken: invalid token index." };
      }),
      (Gr.prototype.insertToken = function (e, t, r) {
        return e.every(function (e) {
          return e instanceof Lr;
        })
          ? (this.tokens.splice.apply(this.tokens, [t, 0].concat(e)),
            r || this.dispatch("insertToken", [e, t]),
            e)
          : { FAIL: "insertToken: invalid token(s)." };
      }),
      (Gr.prototype.registerModifier = function (e, t, r) {
        this.events.newToken.subscribe(function (n, a) {
          var o = [n, a],
            s = [n, a];
          if (null === t || !0 === t.apply(this, o)) {
            var i = r.apply(this, s);
            n.setState(e, i);
          }
        }),
          this.registeredModifiers.push(e);
      }),
      (Ir.prototype.subscribe = function (e) {
        return "function" == typeof e
          ? this.subscribers.push(e) - 1
          : { FAIL: "invalid '" + this.eventId + "' event handler" };
      }),
      (Ir.prototype.unsubscribe = function (e) {
        this.subscribers.splice(e, 1);
      }),
      (Dr.prototype.setCurrentIndex = function (e) {
        (this.index = e),
          (this.current = this.context[e]),
          (this.backtrack = this.context.slice(0, e)),
          (this.lookahead = this.context.slice(e + 1));
      }),
      (Dr.prototype.get = function (e) {
        switch (!0) {
          case 0 === e:
            return this.current;
          case e < 0 && Math.abs(e) <= this.backtrack.length:
            return this.backtrack.slice(e)[0];
          case e > 0 && e <= this.lookahead.length:
            return this.lookahead[e - 1];
          default:
            return null;
        }
      }),
      (Gr.prototype.rangeToText = function (e) {
        if (e instanceof wr)
          return this.getRangeTokens(e)
            .map(function (e) {
              return e.char;
            })
            .join("");
      }),
      (Gr.prototype.getText = function () {
        return this.tokens
          .map(function (e) {
            return e.char;
          })
          .join("");
      }),
      (Gr.prototype.getContext = function (e) {
        var t = this.registeredContexts[e];
        return t || null;
      }),
      (Gr.prototype.on = function (e, t) {
        var r = this.events[e];
        return r ? r.subscribe(t) : null;
      }),
      (Gr.prototype.dispatch = function (e, t) {
        var r = this,
          n = this.events[e];
        n instanceof Ir &&
          n.subscribers.forEach(function (e) {
            e.apply(r, t || []);
          });
      }),
      (Gr.prototype.registerContextChecker = function (e, t, r) {
        if (this.getContext(e))
          return { FAIL: "context name '" + e + "' is already registered." };
        if ("function" != typeof t)
          return { FAIL: "missing context start check." };
        if ("function" != typeof r)
          return { FAIL: "missing context end check." };
        var n = new Cr(e, t, r);
        return (
          (this.registeredContexts[e] = n), this.contextCheckers.push(n), n
        );
      }),
      (Gr.prototype.getRangeTokens = function (e) {
        var t = e.startIndex + e.endOffset;
        return [].concat(this.tokens.slice(e.startIndex, t));
      }),
      (Gr.prototype.getContextRanges = function (e) {
        var t = this.getContext(e);
        return t
          ? t.ranges
          : { FAIL: "context checker '" + e + "' is not registered." };
      }),
      (Gr.prototype.resetContextsRanges = function () {
        var e = this.registeredContexts;
        for (var t in e) {
          if (e.hasOwnProperty(t)) e[t].ranges = [];
        }
      }),
      (Gr.prototype.updateContextsRanges = function () {
        this.resetContextsRanges();
        for (
          var e = this.tokens.map(function (e) {
              return e.char;
            }),
            t = 0;
          t < e.length;
          t++
        ) {
          var r = new Dr(e, t);
          this.runContextCheck(r);
        }
        this.dispatch("updateContextsRanges", [this.registeredContexts]);
      }),
      (Gr.prototype.setEndOffset = function (e, t) {
        var r = new wr(this.getContext(t).openRange.startIndex, e, t),
          n = this.getContext(t).ranges;
        return (
          (r.rangeId = t + "." + n.length),
          n.push(r),
          (this.getContext(t).openRange = null),
          r
        );
      }),
      (Gr.prototype.runContextCheck = function (e) {
        var t = this,
          r = e.index;
        this.contextCheckers.forEach(function (n) {
          var a = n.contextName,
            o = t.getContext(a).openRange;
          if (
            (!o &&
              n.checkStart(e) &&
              ((o = new wr(r, null, a)),
              (t.getContext(a).openRange = o),
              t.dispatch("contextStart", [a, r])),
            o && n.checkEnd(e))
          ) {
            var s = r - o.startIndex + 1,
              i = t.setEndOffset(s, a);
            t.dispatch("contextEnd", [a, i]);
          }
        });
      }),
      (Gr.prototype.tokenize = function (e) {
        (this.tokens = []), this.resetContextsRanges();
        var t = Array.from(e);
        this.dispatch("start");
        for (var r = 0; r < t.length; r++) {
          var n = t[r],
            a = new Dr(t, r);
          this.dispatch("next", [a]), this.runContextCheck(a);
          var o = new Lr(n);
          this.tokens.push(o), this.dispatch("newToken", [o, a]);
        }
        return this.dispatch("end", [this.tokens]), this.tokens;
      }),
      (Pr.prototype.getDefaultScriptFeaturesIndexes = function () {
        for (var e = this.font.tables.gsub.scripts, t = 0; t < e.length; t++) {
          var r = e[t];
          if ("DFLT" === r.tag) return r.script.defaultLangSys.featureIndexes;
        }
        return [];
      }),
      (Pr.prototype.getScriptFeaturesIndexes = function (e) {
        if (!this.font.tables.gsub) return [];
        if (!e) return this.getDefaultScriptFeaturesIndexes();
        for (var t = this.font.tables.gsub.scripts, r = 0; r < t.length; r++) {
          var n = t[r];
          if (n.tag === e && n.script.defaultLangSys)
            return n.script.defaultLangSys.featureIndexes;
          var a = n.langSysRecords;
          if (a)
            for (var o = 0; o < a.length; o++) {
              var s = a[o];
              if (s.tag === e) return s.langSys.featureIndexes;
            }
        }
        return this.getDefaultScriptFeaturesIndexes();
      }),
      (Pr.prototype.mapTagsToFeatures = function (e, t) {
        for (var r = {}, n = 0; n < e.length; n++) {
          var a = e[n].tag,
            o = e[n].feature;
          r[a] = o;
        }
        this.features[t].tags = r;
      }),
      (Pr.prototype.getScriptFeatures = function (e) {
        var t = this.features[e];
        if (this.features.hasOwnProperty(e)) return t;
        var r = this.getScriptFeaturesIndexes(e);
        if (!r) return null;
        var n = this.font.tables.gsub;
        return (
          (t = r.map(function (e) {
            return n.features[e];
          })),
          (this.features[e] = t),
          this.mapTagsToFeatures(t, e),
          t
        );
      }),
      (Pr.prototype.getSubstitutionType = function (e, t) {
        return e.lookupType.toString() + t.substFormat.toString();
      }),
      (Pr.prototype.getLookupMethod = function (e, t) {
        var r = this;
        switch (this.getSubstitutionType(e, t)) {
          case "11":
            return function (e) {
              return Wr.apply(r, [e, t]);
            };
          case "12":
            return function (e) {
              return _r.apply(r, [e, t]);
            };
          case "63":
            return function (e) {
              return jr.apply(r, [e, t]);
            };
          case "41":
            return function (e) {
              return Xr.apply(r, [e, t]);
            };
          case "21":
            return function (e) {
              return Yr.apply(r, [e, t]);
            };
          default:
            throw new Error(
              "lookupType: " +
                e.lookupType +
                " - substFormat: " +
                t.substFormat +
                " is not yet supported"
            );
        }
      }),
      (Pr.prototype.lookupFeature = function (e) {
        var t = e.contextParams,
          r = t.index,
          n = this.getFeature({ tag: e.tag, script: e.script });
        if (!n)
          return new Error(
            "font '" +
              this.font.names.fullName.en +
              "' doesn't support feature '" +
              e.tag +
              "' for script '" +
              e.script +
              "'."
          );
        for (
          var a = this.getFeatureLookups(n), o = [].concat(t.context), s = 0;
          s < a.length;
          s++
        )
          for (
            var i = a[s], u = this.getLookupSubtables(i), l = 0;
            l < u.length;
            l++
          ) {
            var p = u[l],
              c = this.getSubstitutionType(i, p),
              h = this.getLookupMethod(i, p),
              f = void 0;
            switch (c) {
              case "11":
                (f = h(t.current)) &&
                  o.splice(
                    r,
                    1,
                    new Hr({ id: 11, tag: e.tag, substitution: f })
                  );
                break;
              case "12":
                (f = h(t.current)) &&
                  o.splice(
                    r,
                    1,
                    new Hr({ id: 12, tag: e.tag, substitution: f })
                  );
                break;
              case "63":
                (f = h(t)),
                  Array.isArray(f) &&
                    f.length &&
                    o.splice(
                      r,
                      1,
                      new Hr({ id: 63, tag: e.tag, substitution: f })
                    );
                break;
              case "41":
                (f = h(t)) &&
                  o.splice(
                    r,
                    1,
                    new Hr({ id: 41, tag: e.tag, substitution: f })
                  );
                break;
              case "21":
                (f = h(t.current)) &&
                  o.splice(
                    r,
                    1,
                    new Hr({ id: 21, tag: e.tag, substitution: f })
                  );
            }
            (t = new Dr(o, r)), (Array.isArray(f) && !f.length) || (f = null);
          }
        return o.length ? o : null;
      }),
      (Pr.prototype.supports = function (e) {
        if (!e.script) return !1;
        this.getScriptFeatures(e.script);
        var t = this.features.hasOwnProperty(e.script);
        if (!e.tag) return t;
        var r = this.features[e.script].some(function (t) {
          return t.tag === e.tag;
        });
        return t && r;
      }),
      (Pr.prototype.getLookupSubtables = function (e) {
        return e.subtables || null;
      }),
      (Pr.prototype.getLookupByIndex = function (e) {
        return this.font.tables.gsub.lookups[e] || null;
      }),
      (Pr.prototype.getFeatureLookups = function (e) {
        return e.lookupListIndexes.map(this.getLookupByIndex.bind(this));
      }),
      (Pr.prototype.getFeature = function (e) {
        if (!this.font) return { FAIL: "No font was found" };
        this.features.hasOwnProperty(e.script) ||
          this.getScriptFeatures(e.script);
        var t = this.features[e.script];
        return t
          ? t.tags[e.tag]
            ? this.features[e.script].tags[e.tag]
            : null
          : { FAIL: "No feature for script " + e.script };
      });
    var Vr = {
      startCheck: function (e) {
        var t = e.current,
          r = e.get(-1);
        return (null === r && Nr(t)) || (!Nr(r) && Nr(t));
      },
      endCheck: function (e) {
        var t = e.get(1);
        return null === t || !Nr(t);
      },
    };
    var Zr = {
      startCheck: function (e) {
        var t = e.current,
          r = e.get(-1);
        return (Nr(t) || Br(t)) && !Nr(r);
      },
      endCheck: function (e) {
        var t = e.get(1);
        switch (!0) {
          case null === t:
            return !0;
          case !Nr(t) && !Br(t):
            var r = /\s/.test(t);
            if (!r) return !0;
            if (r) {
              var n;
              if (
                ((n = e.lookahead.some(function (e) {
                  return Nr(e) || Br(e);
                })),
                !n)
              )
                return !0;
            }
            break;
          default:
            return !1;
        }
      },
    };
    var Qr = {
      11: function (e, t, r) {
        t[r].setState(e.tag, e.substitution);
      },
      12: function (e, t, r) {
        t[r].setState(e.tag, e.substitution);
      },
      63: function (e, t, r) {
        e.substitution.forEach(function (n, a) {
          t[r + a].setState(e.tag, n);
        });
      },
      41: function (e, t, r) {
        var n = t[r];
        n.setState(e.tag, e.substitution.ligGlyph);
        for (var a = e.substitution.components.length, o = 0; o < a; o++)
          (n = t[r + o + 1]).setState("deleted", !0);
      },
    };
    function Jr(e, t, r) {
      e instanceof Hr && Qr[e.id] && Qr[e.id](e, t, r);
    }
    function Kr(e) {
      var t = this,
        r = "arab",
        n = this.featuresTags[r],
        a = this.tokenizer.getRangeTokens(e);
      if (1 !== a.length) {
        var o = new Dr(
            a.map(function (e) {
              return e.getState("glyphIndex");
            }),
            0
          ),
          s = new Dr(
            a.map(function (e) {
              return e.char;
            }),
            0
          );
        a.forEach(function (e, i) {
          if (!Br(e.char)) {
            o.setCurrentIndex(i), s.setCurrentIndex(i);
            var u,
              l = 0;
            switch (
              ((function (e) {
                for (
                  var t = [].concat(e.backtrack), r = t.length - 1;
                  r >= 0;
                  r--
                ) {
                  var n = t[r],
                    a = Fr(n),
                    o = Br(n);
                  if (!a && !o) return !0;
                  if (a) return !1;
                }
                return !1;
              })(s) && (l |= 1),
              (function (e) {
                if (Fr(e.current)) return !1;
                for (var t = 0; t < e.lookahead.length; t++)
                  if (!Br(e.lookahead[t])) return !0;
                return !1;
              })(s) && (l |= 2),
              l)
            ) {
              case 1:
                u = "fina";
                break;
              case 2:
                u = "init";
                break;
              case 3:
                u = "medi";
            }
            if (-1 !== n.indexOf(u)) {
              var p = t.query.lookupFeature({
                tag: u,
                script: r,
                contextParams: o,
              });
              if (p instanceof Error) return console.info(p.message);
              p.forEach(function (e, t) {
                e instanceof Hr &&
                  (Jr(e, a, t), (o.context[t] = e.substitution));
              });
            }
          }
        });
      }
    }
    function $r(e, t) {
      return new Dr(
        e.map(function (e) {
          return e.activeState.value;
        }),
        t || 0
      );
    }
    function en(e) {
      var t = this,
        r = this.tokenizer.getRangeTokens(e),
        n = $r(r);
      n.context.forEach(function (e, a) {
        n.setCurrentIndex(a);
        var o = t.query.lookupFeature({
          tag: "rlig",
          script: "arab",
          contextParams: n,
        });
        o.length &&
          (o.forEach(function (e) {
            return Jr(e, r, a);
          }),
          (n = $r(r)));
      });
    }
    var tn = {
      startCheck: function (e) {
        var t = e.current,
          r = e.get(-1);
        return (null === r && Ar(t)) || (!Ar(r) && Ar(t));
      },
      endCheck: function (e) {
        var t = e.get(1);
        return null === t || !Ar(t);
      },
    };
    function rn(e, t) {
      return new Dr(
        e.map(function (e) {
          return e.activeState.value;
        }),
        t || 0
      );
    }
    function nn(e) {
      var t = this,
        r = this.tokenizer.getRangeTokens(e),
        n = rn(r);
      n.context.forEach(function (e, a) {
        n.setCurrentIndex(a);
        var o = t.query.lookupFeature({
          tag: "liga",
          script: "latn",
          contextParams: n,
        });
        o.length &&
          (o.forEach(function (e) {
            return Jr(e, r, a);
          }),
          (n = rn(r)));
      });
    }
    function an(e) {
      (this.baseDir = e || "ltr"),
        (this.tokenizer = new Gr()),
        (this.featuresTags = {});
    }
    function on(e) {
      var t = this.contextChecks[e + "Check"];
      return this.tokenizer.registerContextChecker(e, t.startCheck, t.endCheck);
    }
    function sn() {
      return (
        on.call(this, "latinWord"),
        on.call(this, "arabicWord"),
        on.call(this, "arabicSentence"),
        this.tokenizer.tokenize(this.text)
      );
    }
    function un() {
      var e = this;
      this.tokenizer.getContextRanges("arabicSentence").forEach(function (t) {
        var r = e.tokenizer.getRangeTokens(t);
        e.tokenizer.replaceRange(t.startIndex, t.endOffset, r.reverse());
      });
    }
    function ln() {
      if (-1 === this.tokenizer.registeredModifiers.indexOf("glyphIndex"))
        throw new Error(
          "glyphIndex modifier is required to apply arabic presentation features."
        );
    }
    function pn() {
      var e = this;
      this.featuresTags.hasOwnProperty("arab") &&
        (ln.call(this),
        this.tokenizer.getContextRanges("arabicWord").forEach(function (t) {
          Kr.call(e, t);
        }));
    }
    function cn() {
      var e = this,
        t = "arab";
      this.featuresTags.hasOwnProperty(t) &&
        -1 !== this.featuresTags[t].indexOf("rlig") &&
        (ln.call(this),
        this.tokenizer.getContextRanges("arabicWord").forEach(function (t) {
          en.call(e, t);
        }));
    }
    function hn() {
      var e = this,
        t = "latn";
      this.featuresTags.hasOwnProperty(t) &&
        -1 !== this.featuresTags[t].indexOf("liga") &&
        (ln.call(this),
        this.tokenizer.getContextRanges("latinWord").forEach(function (t) {
          nn.call(e, t);
        }));
    }
    function fn(e) {
      ((e = e || {}).tables = e.tables || {}),
        e.empty ||
          (Dt(
            e.familyName,
            "When creating a new Font object, familyName is required."
          ),
          Dt(
            e.styleName,
            "When creating a new Font object, styleName is required."
          ),
          Dt(
            e.unitsPerEm,
            "When creating a new Font object, unitsPerEm is required."
          ),
          Dt(
            e.ascender,
            "When creating a new Font object, ascender is required."
          ),
          Dt(
            e.descender <= 0,
            "When creating a new Font object, negative descender value is required."
          ),
          (this.names = {
            fontFamily: { en: e.familyName || " " },
            fontSubfamily: { en: e.styleName || " " },
            fullName: { en: e.fullName || e.familyName + " " + e.styleName },
            postScriptName: {
              en:
                e.postScriptName ||
                (e.familyName + e.styleName).replace(/\s/g, ""),
            },
            designer: { en: e.designer || " " },
            designerURL: { en: e.designerURL || " " },
            manufacturer: { en: e.manufacturer || " " },
            manufacturerURL: { en: e.manufacturerURL || " " },
            license: { en: e.license || " " },
            licenseURL: { en: e.licenseURL || " " },
            version: { en: e.version || "Version 0.1" },
            description: { en: e.description || " " },
            copyright: { en: e.copyright || " " },
            trademark: { en: e.trademark || " " },
          }),
          (this.unitsPerEm = e.unitsPerEm || 1e3),
          (this.ascender = e.ascender),
          (this.descender = e.descender),
          (this.createdTimestamp = e.createdTimestamp),
          (this.tables = Object.assign(e.tables, {
            os2: Object.assign(
              {
                usWeightClass: e.weightClass || this.usWeightClasses.MEDIUM,
                usWidthClass: e.widthClass || this.usWidthClasses.MEDIUM,
                fsSelection: e.fsSelection || this.fsSelectionValues.REGULAR,
              },
              e.tables.os2
            ),
          }))),
        (this.supported = !0),
        (this.glyphs = new Ue.GlyphSet(this, e.glyphs || [])),
        (this.encoding = new de(this)),
        (this.position = new Et(this)),
        (this.substitution = new Rt(this)),
        (this.tables = this.tables || {}),
        (this._push = null),
        (this._hmtxTableData = {}),
        Object.defineProperty(this, "hinting", {
          get: function () {
            return this._hinting
              ? this._hinting
              : "truetype" === this.outlinesFormat
              ? (this._hinting = new Wt(this))
              : void 0;
          },
        });
    }
    function dn(e, t) {
      var r = JSON.stringify(e),
        n = 256;
      for (var a in t) {
        var o = parseInt(a);
        if (o && !(o < 256)) {
          if (JSON.stringify(t[a]) === r) return o;
          n <= o && (n = o + 1);
        }
      }
      return (t[n] = e), n;
    }
    function gn(e, t, r) {
      var n = dn(t.name, r);
      return [
        { name: "tag_" + e, type: "TAG", value: t.tag },
        { name: "minValue_" + e, type: "FIXED", value: t.minValue << 16 },
        {
          name: "defaultValue_" + e,
          type: "FIXED",
          value: t.defaultValue << 16,
        },
        { name: "maxValue_" + e, type: "FIXED", value: t.maxValue << 16 },
        { name: "flags_" + e, type: "USHORT", value: 0 },
        { name: "nameID_" + e, type: "USHORT", value: n },
      ];
    }
    function vn(e, t, r) {
      var n = {},
        a = new ie.Parser(e, t);
      return (
        (n.tag = a.parseTag()),
        (n.minValue = a.parseFixed()),
        (n.defaultValue = a.parseFixed()),
        (n.maxValue = a.parseFixed()),
        a.skip("uShort", 1),
        (n.name = r[a.parseUShort()] || {}),
        n
      );
    }
    function mn(e, t, r, n) {
      for (
        var a = [
            { name: "nameID_" + e, type: "USHORT", value: dn(t.name, n) },
            { name: "flags_" + e, type: "USHORT", value: 0 },
          ],
          o = 0;
        o < r.length;
        ++o
      ) {
        var s = r[o].tag;
        a.push({
          name: "axis_" + e + " " + s,
          type: "FIXED",
          value: t.coordinates[s] << 16,
        });
      }
      return a;
    }
    function yn(e, t, r, n) {
      var a = {},
        o = new ie.Parser(e, t);
      (a.name = n[o.parseUShort()] || {}),
        o.skip("uShort", 1),
        (a.coordinates = {});
      for (var s = 0; s < r.length; ++s)
        a.coordinates[r[s].tag] = o.parseFixed();
      return a;
    }
    (an.prototype.setText = function (e) {
      this.text = e;
    }),
      (an.prototype.contextChecks = {
        latinWordCheck: tn,
        arabicWordCheck: Vr,
        arabicSentenceCheck: Zr,
      }),
      (an.prototype.registerFeatures = function (e, t) {
        var r = this,
          n = t.filter(function (t) {
            return r.query.supports({ script: e, tag: t });
          });
        this.featuresTags.hasOwnProperty(e)
          ? (this.featuresTags[e] = this.featuresTags[e].concat(n))
          : (this.featuresTags[e] = n);
      }),
      (an.prototype.applyFeatures = function (e, t) {
        if (!e) throw new Error("No valid font was provided to apply features");
        this.query || (this.query = new Pr(e));
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          this.query.supports({ script: n.script }) &&
            this.registerFeatures(n.script, n.tags);
        }
      }),
      (an.prototype.registerModifier = function (e, t, r) {
        this.tokenizer.registerModifier(e, t, r);
      }),
      (an.prototype.checkContextReady = function (e) {
        return !!this.tokenizer.getContext(e);
      }),
      (an.prototype.applyFeaturesToContexts = function () {
        this.checkContextReady("arabicWord") && (pn.call(this), cn.call(this)),
          this.checkContextReady("latinWord") && hn.call(this),
          this.checkContextReady("arabicSentence") && un.call(this);
      }),
      (an.prototype.processText = function (e) {
        (this.text && this.text === e) ||
          (this.setText(e), sn.call(this), this.applyFeaturesToContexts());
      }),
      (an.prototype.getBidiText = function (e) {
        return this.processText(e), this.tokenizer.getText();
      }),
      (an.prototype.getTextGlyphs = function (e) {
        this.processText(e);
        for (var t = [], r = 0; r < this.tokenizer.tokens.length; r++) {
          var n = this.tokenizer.tokens[r];
          if (!n.state.deleted) {
            var a = n.activeState.value;
            t.push(Array.isArray(a) ? a[0] : a);
          }
        }
        return t;
      }),
      (fn.prototype.hasChar = function (e) {
        return null !== this.encoding.charToGlyphIndex(e);
      }),
      (fn.prototype.charToGlyphIndex = function (e) {
        return this.encoding.charToGlyphIndex(e);
      }),
      (fn.prototype.charToGlyph = function (e) {
        var t = this.charToGlyphIndex(e),
          r = this.glyphs.get(t);
        return r || (r = this.glyphs.get(0)), r;
      }),
      (fn.prototype.updateFeatures = function (e) {
        return this.defaultRenderOptions.features.map(function (t) {
          return "latn" === t.script
            ? {
                script: "latn",
                tags: t.tags.filter(function (t) {
                  return e[t];
                }),
              }
            : t;
        });
      }),
      (fn.prototype.stringToGlyphs = function (e, t) {
        var r = this,
          n = new an();
        n.registerModifier("glyphIndex", null, function (e) {
          return r.charToGlyphIndex(e.char);
        });
        var a = t
          ? this.updateFeatures(t.features)
          : this.defaultRenderOptions.features;
        n.applyFeatures(this, a);
        for (
          var o = n.getTextGlyphs(e),
            s = o.length,
            i = new Array(s),
            u = this.glyphs.get(0),
            l = 0;
          l < s;
          l += 1
        )
          i[l] = this.glyphs.get(o[l]) || u;
        return i;
      }),
      (fn.prototype.nameToGlyphIndex = function (e) {
        return this.glyphNames.nameToGlyphIndex(e);
      }),
      (fn.prototype.nameToGlyph = function (e) {
        var t = this.nameToGlyphIndex(e),
          r = this.glyphs.get(t);
        return r || (r = this.glyphs.get(0)), r;
      }),
      (fn.prototype.glyphIndexToName = function (e) {
        return this.glyphNames.glyphIndexToName
          ? this.glyphNames.glyphIndexToName(e)
          : "";
      }),
      (fn.prototype.getKerningValue = function (e, t) {
        (e = e.index || e), (t = t.index || t);
        var r = this.position.defaultKerningTables;
        return r
          ? this.position.getKerningValue(r, e, t)
          : this.kerningPairs[e + "," + t] || 0;
      }),
      (fn.prototype.defaultRenderOptions = {
        kerning: !0,
        features: [
          { script: "arab", tags: ["init", "medi", "fina", "rlig"] },
          { script: "latn", tags: ["liga", "rlig"] },
        ],
      }),
      (fn.prototype.forEachGlyph = function (e, t, r, n, a, o) {
        (t = void 0 !== t ? t : 0),
          (r = void 0 !== r ? r : 0),
          (n = void 0 !== n ? n : 72),
          (a = Object.assign({}, this.defaultRenderOptions, a));
        var s,
          i = (1 / this.unitsPerEm) * n,
          u = this.stringToGlyphs(e, a);
        if (a.kerning) {
          var l = a.script || this.position.getDefaultScriptName();
          s = this.position.getKerningTables(l, a.language);
        }
        for (var p = 0; p < u.length; p += 1) {
          var c = u[p];
          if (
            (o.call(this, c, t, r, n, a),
            c.advanceWidth && (t += c.advanceWidth * i),
            a.kerning && p < u.length - 1)
          )
            t +=
              (s
                ? this.position.getKerningValue(s, c.index, u[p + 1].index)
                : this.getKerningValue(c, u[p + 1])) * i;
          a.letterSpacing
            ? (t += a.letterSpacing * n)
            : a.tracking && (t += (a.tracking / 1e3) * n);
        }
        return t;
      }),
      (fn.prototype.getPath = function (e, t, r, n, a) {
        var o = new L();
        return (
          this.forEachGlyph(e, t, r, n, a, function (e, t, r, n) {
            var s = e.getPath(t, r, n, a, this);
            o.extend(s);
          }),
          o
        );
      }),
      (fn.prototype.getPaths = function (e, t, r, n, a) {
        var o = [];
        return (
          this.forEachGlyph(e, t, r, n, a, function (e, t, r, n) {
            var s = e.getPath(t, r, n, a, this);
            o.push(s);
          }),
          o
        );
      }),
      (fn.prototype.getAdvanceWidth = function (e, t, r) {
        return this.forEachGlyph(e, 0, 0, t, r, function () {});
      }),
      (fn.prototype.draw = function (e, t, r, n, a, o) {
        this.getPath(t, r, n, a, o).draw(e);
      }),
      (fn.prototype.drawPoints = function (e, t, r, n, a, o) {
        this.forEachGlyph(t, r, n, a, o, function (t, r, n, a) {
          t.drawPoints(e, r, n, a);
        });
      }),
      (fn.prototype.drawMetrics = function (e, t, r, n, a, o) {
        this.forEachGlyph(t, r, n, a, o, function (t, r, n, a) {
          t.drawMetrics(e, r, n, a);
        });
      }),
      (fn.prototype.getEnglishName = function (e) {
        var t = this.names[e];
        if (t) return t.en;
      }),
      (fn.prototype.validate = function () {
        var e = this;
        function t(t) {
          var r = e.getEnglishName(t);
          r && r.trim().length;
        }
        t("fontFamily"),
          t("weightName"),
          t("manufacturer"),
          t("copyright"),
          t("version"),
          this.unitsPerEm;
      }),
      (fn.prototype.toTables = function () {
        return St.fontToTable(this);
      }),
      (fn.prototype.toBuffer = function () {
        return (
          console.warn(
            "Font.toBuffer is deprecated. Use Font.toArrayBuffer instead."
          ),
          this.toArrayBuffer()
        );
      }),
      (fn.prototype.toArrayBuffer = function () {
        for (
          var e = this.toTables().encode(),
            t = new ArrayBuffer(e.length),
            r = new Uint8Array(t),
            n = 0;
          n < e.length;
          n++
        )
          r[n] = e[n];
        return t;
      }),
      (fn.prototype.download = function (e) {
        var t = this.getEnglishName("fontFamily"),
          n = this.getEnglishName("fontSubfamily");
        e = e || t.replace(/\s/g, "") + "-" + n + ".otf";
        var a = this.toArrayBuffer();
        if ("undefined" != typeof window)
          if (((window.URL = window.URL || window.webkitURL), window.URL)) {
            var o = new DataView(a),
              s = new Blob([o], { type: "font/opentype" }),
              i = document.createElement("a");
            (i.href = window.URL.createObjectURL(s)), (i.download = e);
            var u = document.createEvent("MouseEvents");
            u.initEvent("click", !0, !1), i.dispatchEvent(u);
          } else
            console.warn(
              "Font file could not be downloaded. Try using a different browser."
            );
        else {
          var l = r(256),
            p = (function (e) {
              for (
                var t = new Buffer(e.byteLength), r = new Uint8Array(e), n = 0;
                n < t.length;
                ++n
              )
                t[n] = r[n];
              return t;
            })(a);
          l.writeFileSync(e, p);
        }
      }),
      (fn.prototype.fsSelectionValues = {
        ITALIC: 1,
        UNDERSCORE: 2,
        NEGATIVE: 4,
        OUTLINED: 8,
        STRIKEOUT: 16,
        BOLD: 32,
        REGULAR: 64,
        USER_TYPO_METRICS: 128,
        WWS: 256,
        OBLIQUE: 512,
      }),
      (fn.prototype.usWidthClasses = {
        ULTRA_CONDENSED: 1,
        EXTRA_CONDENSED: 2,
        CONDENSED: 3,
        SEMI_CONDENSED: 4,
        MEDIUM: 5,
        SEMI_EXPANDED: 6,
        EXPANDED: 7,
        EXTRA_EXPANDED: 8,
        ULTRA_EXPANDED: 9,
      }),
      (fn.prototype.usWeightClasses = {
        THIN: 100,
        EXTRA_LIGHT: 200,
        LIGHT: 300,
        NORMAL: 400,
        MEDIUM: 500,
        SEMI_BOLD: 600,
        BOLD: 700,
        EXTRA_BOLD: 800,
        BLACK: 900,
      });
    var bn = {
        make: function (e, t) {
          var r = new $.Table("fvar", [
            { name: "version", type: "ULONG", value: 65536 },
            { name: "offsetToData", type: "USHORT", value: 0 },
            { name: "countSizePairs", type: "USHORT", value: 2 },
            { name: "axisCount", type: "USHORT", value: e.axes.length },
            { name: "axisSize", type: "USHORT", value: 20 },
            {
              name: "instanceCount",
              type: "USHORT",
              value: e.instances.length,
            },
            {
              name: "instanceSize",
              type: "USHORT",
              value: 4 + 4 * e.axes.length,
            },
          ]);
          r.offsetToData = r.sizeOf();
          for (var n = 0; n < e.axes.length; n++)
            r.fields = r.fields.concat(gn(n, e.axes[n], t));
          for (var a = 0; a < e.instances.length; a++)
            r.fields = r.fields.concat(mn(a, e.instances[a], e.axes, t));
          return r;
        },
        parse: function (e, t, r) {
          var n = new ie.Parser(e, t),
            a = n.parseULong();
          D.argument(65536 === a, "Unsupported fvar table version.");
          var o = n.parseOffset16();
          n.skip("uShort", 1);
          for (
            var s = n.parseUShort(),
              i = n.parseUShort(),
              u = n.parseUShort(),
              l = n.parseUShort(),
              p = [],
              c = 0;
            c < s;
            c++
          )
            p.push(vn(e, t + o + c * i, r));
          for (var h = [], f = t + o + s * i, d = 0; d < u; d++)
            h.push(yn(e, f + d * l, p, r));
          return { axes: p, instances: h };
        },
      },
      xn = function () {
        return {
          coverage: this.parsePointer(oe.coverage),
          attachPoints: this.parseList(oe.pointer(oe.uShortList)),
        };
      },
      Sn = function () {
        var e = this.parseUShort();
        return (
          D.argument(
            1 === e || 2 === e || 3 === e,
            "Unsupported CaretValue table version."
          ),
          1 === e
            ? { coordinate: this.parseShort() }
            : 2 === e
            ? { pointindex: this.parseShort() }
            : 3 === e
            ? { coordinate: this.parseShort() }
            : void 0
        );
      },
      Tn = function () {
        return this.parseList(oe.pointer(Sn));
      },
      Un = function () {
        return {
          coverage: this.parsePointer(oe.coverage),
          ligGlyphs: this.parseList(oe.pointer(Tn)),
        };
      },
      kn = function () {
        return this.parseUShort(), this.parseList(oe.pointer(oe.coverage));
      };
    var On = {
        parse: function (e, t) {
          var r = new oe(e, (t = t || 0)),
            n = r.parseVersion(1);
          D.argument(
            1 === n || 1.2 === n || 1.3 === n,
            "Unsupported GDEF table version."
          );
          var a = {
            version: n,
            classDef: r.parsePointer(oe.classDef),
            attachList: r.parsePointer(xn),
            ligCaretList: r.parsePointer(Un),
            markAttachClassDef: r.parsePointer(oe.classDef),
          };
          return n >= 1.2 && (a.markGlyphSets = r.parsePointer(kn)), a;
        },
      },
      En = new Array(10);
    (En[1] = function () {
      var e = this.offset + this.relativeOffset,
        t = this.parseUShort();
      return 1 === t
        ? {
            posFormat: 1,
            coverage: this.parsePointer(oe.coverage),
            value: this.parseValueRecord(),
          }
        : 2 === t
        ? {
            posFormat: 2,
            coverage: this.parsePointer(oe.coverage),
            values: this.parseValueRecordList(),
          }
        : void D.assert(
            !1,
            "0x" +
              e.toString(16) +
              ": GPOS lookup type 1 format must be 1 or 2."
          );
    }),
      (En[2] = function () {
        var e = this.offset + this.relativeOffset,
          t = this.parseUShort();
        D.assert(
          1 === t || 2 === t,
          "0x" + e.toString(16) + ": GPOS lookup type 2 format must be 1 or 2."
        );
        var r = this.parsePointer(oe.coverage),
          n = this.parseUShort(),
          a = this.parseUShort();
        if (1 === t)
          return {
            posFormat: t,
            coverage: r,
            valueFormat1: n,
            valueFormat2: a,
            pairSets: this.parseList(
              oe.pointer(
                oe.list(function () {
                  return {
                    secondGlyph: this.parseUShort(),
                    value1: this.parseValueRecord(n),
                    value2: this.parseValueRecord(a),
                  };
                })
              )
            ),
          };
        if (2 === t) {
          var o = this.parsePointer(oe.classDef),
            s = this.parsePointer(oe.classDef),
            i = this.parseUShort(),
            u = this.parseUShort();
          return {
            posFormat: t,
            coverage: r,
            valueFormat1: n,
            valueFormat2: a,
            classDef1: o,
            classDef2: s,
            class1Count: i,
            class2Count: u,
            classRecords: this.parseList(
              i,
              oe.list(u, function () {
                return {
                  value1: this.parseValueRecord(n),
                  value2: this.parseValueRecord(a),
                };
              })
            ),
          };
        }
      }),
      (En[3] = function () {
        return { error: "GPOS Lookup 3 not supported" };
      }),
      (En[4] = function () {
        return { error: "GPOS Lookup 4 not supported" };
      }),
      (En[5] = function () {
        return { error: "GPOS Lookup 5 not supported" };
      }),
      (En[6] = function () {
        return { error: "GPOS Lookup 6 not supported" };
      }),
      (En[7] = function () {
        return { error: "GPOS Lookup 7 not supported" };
      }),
      (En[8] = function () {
        return { error: "GPOS Lookup 8 not supported" };
      }),
      (En[9] = function () {
        return { error: "GPOS Lookup 9 not supported" };
      });
    var Rn = new Array(10);
    var Ln = {
      parse: function (e, t) {
        var r = new oe(e, (t = t || 0)),
          n = r.parseVersion(1);
        return (
          D.argument(
            1 === n || 1.1 === n,
            "Unsupported GPOS table version " + n
          ),
          1 === n
            ? {
                version: n,
                scripts: r.parseScriptList(),
                features: r.parseFeatureList(),
                lookups: r.parseLookupList(En),
              }
            : {
                version: n,
                scripts: r.parseScriptList(),
                features: r.parseFeatureList(),
                lookups: r.parseLookupList(En),
                variations: r.parseFeatureVariationsList(),
              }
        );
      },
      make: function (e) {
        return new $.Table("GPOS", [
          { name: "version", type: "ULONG", value: 65536 },
          {
            name: "scripts",
            type: "TABLE",
            value: new $.ScriptList(e.scripts),
          },
          {
            name: "features",
            type: "TABLE",
            value: new $.FeatureList(e.features),
          },
          {
            name: "lookups",
            type: "TABLE",
            value: new $.LookupList(e.lookups, Rn),
          },
        ]);
      },
    };
    var wn = {
      parse: function (e, t) {
        var r = new ie.Parser(e, t),
          n = r.parseUShort();
        if (0 === n)
          return (function (e) {
            var t = {};
            e.skip("uShort");
            var r = e.parseUShort();
            D.argument(0 === r, "Unsupported kern sub-table version."),
              e.skip("uShort", 2);
            var n = e.parseUShort();
            e.skip("uShort", 3);
            for (var a = 0; a < n; a += 1) {
              var o = e.parseUShort(),
                s = e.parseUShort(),
                i = e.parseShort();
              t[o + "," + s] = i;
            }
            return t;
          })(r);
        if (1 === n)
          return (function (e) {
            var t = {};
            e.skip("uShort"),
              e.parseULong() > 1 &&
                console.warn("Only the first kern subtable is supported."),
              e.skip("uLong");
            var r = 255 & e.parseUShort();
            if ((e.skip("uShort"), 0 === r)) {
              var n = e.parseUShort();
              e.skip("uShort", 3);
              for (var a = 0; a < n; a += 1) {
                var o = e.parseUShort(),
                  s = e.parseUShort(),
                  i = e.parseShort();
                t[o + "," + s] = i;
              }
            }
            return t;
          })(r);
        throw new Error("Unsupported kern table version (" + n + ").");
      },
    };
    var Cn = {
      parse: function (e, t, r, n) {
        for (
          var a = new ie.Parser(e, t),
            o = n ? a.parseUShort : a.parseULong,
            s = [],
            i = 0;
          i < r + 1;
          i += 1
        ) {
          var u = o.call(a);
          n && (u *= 2), s.push(u);
        }
        return s;
      },
    };
    function Dn(e, t) {
      r(256).readFile(e, function (e, r) {
        if (e) return t(e.message);
        t(null, Ct(r));
      });
    }
    function In(e, t) {
      var r = new XMLHttpRequest();
      r.open("get", e, !0),
        (r.responseType = "arraybuffer"),
        (r.onload = function () {
          return r.response
            ? t(null, r.response)
            : t("Font could not be loaded: " + r.statusText);
        }),
        (r.onerror = function () {
          t("Font could not be loaded");
        }),
        r.send();
    }
    function Mn(e, t) {
      for (var r = [], n = 12, a = 0; a < t; a += 1) {
        var o = ie.getTag(e, n),
          s = ie.getULong(e, n + 4),
          i = ie.getULong(e, n + 8),
          u = ie.getULong(e, n + 12);
        r.push({ tag: o, checksum: s, offset: i, length: u, compression: !1 }),
          (n += 16);
      }
      return r;
    }
    function Gn(e, t) {
      if ("WOFF" === t.compression) {
        var r = new Uint8Array(e.buffer, t.offset + 2, t.compressedLength - 2),
          n = new Uint8Array(t.length);
        if ((O(r, n), n.byteLength !== t.length))
          throw new Error(
            "Decompression error: " +
              t.tag +
              " decompressed length doesn't match recorded length"
          );
        return { data: new DataView(n.buffer, 0), offset: 0 };
      }
      return { data: e, offset: t.offset };
    }
    function Nn(e, t) {
      var r, n;
      t = null == t ? {} : t;
      var a,
        o,
        s,
        i,
        u,
        l,
        p,
        c,
        h,
        f,
        d,
        g,
        v,
        m = new fn({ empty: !0 }),
        y = new DataView(e, 0),
        b = [],
        x = ie.getTag(y, 0);
      if (x === String.fromCharCode(0, 1, 0, 0) || "true" === x || "typ1" === x)
        (m.outlinesFormat = "truetype"), (b = Mn(y, (a = ie.getUShort(y, 4))));
      else if ("OTTO" === x)
        (m.outlinesFormat = "cff"), (b = Mn(y, (a = ie.getUShort(y, 4))));
      else {
        if ("wOFF" !== x)
          throw new Error("Unsupported OpenType signature " + x);
        var S = ie.getTag(y, 4);
        if (S === String.fromCharCode(0, 1, 0, 0))
          m.outlinesFormat = "truetype";
        else {
          if ("OTTO" !== S) throw new Error("Unsupported OpenType flavor " + x);
          m.outlinesFormat = "cff";
        }
        b = (function (e, t) {
          for (var r = [], n = 44, a = 0; a < t; a += 1) {
            var o = ie.getTag(e, n),
              s = ie.getULong(e, n + 4),
              i = ie.getULong(e, n + 8),
              u = ie.getULong(e, n + 12),
              l = void 0;
            (l = i < u && "WOFF"),
              r.push({
                tag: o,
                offset: s,
                compression: l,
                compressedLength: i,
                length: u,
              }),
              (n += 20);
          }
          return r;
        })(y, (a = ie.getUShort(y, 12)));
      }
      for (var T = 0; T < a; T += 1) {
        var U = b[T],
          k = void 0;
        switch (U.tag) {
          case "cmap":
            (k = Gn(y, U)),
              (m.tables.cmap = le.parse(k.data, k.offset)),
              (m.encoding = new ge(m.tables.cmap));
            break;
          case "cvt ":
            (k = Gn(y, U)),
              (v = new ie.Parser(k.data, k.offset)),
              (m.tables.cvt = v.parseShortList(U.length / 2));
            break;
          case "fvar":
            s = U;
            break;
          case "fpgm":
            (k = Gn(y, U)),
              (v = new ie.Parser(k.data, k.offset)),
              (m.tables.fpgm = v.parseByteList(U.length));
            break;
          case "head":
            (k = Gn(y, U)),
              (m.tables.head = _e.parse(k.data, k.offset)),
              (m.unitsPerEm = m.tables.head.unitsPerEm),
              (r = m.tables.head.indexToLocFormat);
            break;
          case "hhea":
            (k = Gn(y, U)),
              (m.tables.hhea = qe.parse(k.data, k.offset)),
              (m.ascender = m.tables.hhea.ascender),
              (m.descender = m.tables.hhea.descender),
              (m.numberOfHMetrics = m.tables.hhea.numberOfHMetrics);
            break;
          case "hmtx":
            c = U;
            break;
          case "ltag":
            (k = Gn(y, U)), (n = Xe.parse(k.data, k.offset));
            break;
          case "maxp":
            (k = Gn(y, U)),
              (m.tables.maxp = Ye.parse(k.data, k.offset)),
              (m.numGlyphs = m.tables.maxp.numGlyphs);
            break;
          case "name":
            d = U;
            break;
          case "OS/2":
            (k = Gn(y, U)), (m.tables.os2 = ut.parse(k.data, k.offset));
            break;
          case "post":
            (k = Gn(y, U)),
              (m.tables.post = lt.parse(k.data, k.offset)),
              (m.glyphNames = new me(m.tables.post));
            break;
          case "prep":
            (k = Gn(y, U)),
              (v = new ie.Parser(k.data, k.offset)),
              (m.tables.prep = v.parseByteList(U.length));
            break;
          case "glyf":
            i = U;
            break;
          case "loca":
            f = U;
            break;
          case "CFF ":
            o = U;
            break;
          case "kern":
            h = U;
            break;
          case "GDEF":
            u = U;
            break;
          case "GPOS":
            l = U;
            break;
          case "GSUB":
            p = U;
            break;
          case "meta":
            g = U;
        }
      }
      var O = Gn(y, d);
      if (
        ((m.tables.name = st.parse(O.data, O.offset, n)),
        (m.names = m.tables.name),
        i && f)
      ) {
        var E = 0 === r,
          R = Gn(y, f),
          L = Cn.parse(R.data, R.offset, m.numGlyphs, E),
          w = Gn(y, i);
        m.glyphs = zt.parse(w.data, w.offset, L, m, t);
      } else {
        if (!o)
          throw new Error("Font doesn't contain TrueType or CFF outlines.");
        var C = Gn(y, o);
        We.parse(C.data, C.offset, m, t);
      }
      var D = Gn(y, c);
      if (
        (je.parse(
          m,
          D.data,
          D.offset,
          m.numberOfHMetrics,
          m.numGlyphs,
          m.glyphs,
          t
        ),
        ye(m, t),
        h)
      ) {
        var I = Gn(y, h);
        m.kerningPairs = wn.parse(I.data, I.offset);
      } else m.kerningPairs = {};
      if (u) {
        var M = Gn(y, u);
        m.tables.gdef = On.parse(M.data, M.offset);
      }
      if (l) {
        var G = Gn(y, l);
        (m.tables.gpos = Ln.parse(G.data, G.offset)), m.position.init();
      }
      if (p) {
        var N = Gn(y, p);
        m.tables.gsub = ft.parse(N.data, N.offset);
      }
      if (s) {
        var F = Gn(y, s);
        m.tables.fvar = bn.parse(F.data, F.offset, m.names);
      }
      if (g) {
        var B = Gn(y, g);
        (m.tables.meta = dt.parse(B.data, B.offset)), (m.metas = m.tables.meta);
      }
      return m;
    }
    const Fn = Object.freeze({
      __proto__: null,
      Font: fn,
      Glyph: xe,
      Path: L,
      BoundingBox: R,
      _parse: ie,
      parse: Nn,
      load: function (e, t, r) {
        r = null == r ? {} : r;
        var n = "undefined" == typeof window && !r.isUrl ? Dn : In;
        return new Promise(function (a, o) {
          n(e, function (e, n) {
            if (e) {
              if (t) return t(e);
              o(e);
            }
            var s;
            try {
              s = Nn(n, r);
            } catch (e) {
              if (t) return t(e, null);
              o(e);
            }
            if (t) return t(null, s);
            a(s);
          });
        });
      },
      loadSync: function (e, t) {
        return Nn(Ct(r(256).readFileSync(e)), t);
      },
    });
    let Bn = null;
    Bn = chrome;
    atob("SWxHOU5ybEI"),
      atob(
        "ZjkyN2JiNTA5ZGZhYWZjMTAyZTgxMzEzYjQwODZlZGUwYjgxNTRmMTEwODNkNGZmNTQ3ZDk0NzJhZjA5MjIxNg"
      ),
      atob(
        "YTQ3M2EzODlhZDc4ZTgxODEzYjNkMDI1ZjgwYjE4Yzk2MDk4Njk4NjMxODc1MDgxNzJkNTdkNWU4NGYxMGE1Mg"
      ),
      atob(
        "ODQ2MzlhMGM0YWU2Y2FmMjgwZDljMDI1Mjg5YzNjN2I0OTQxY2QxMmNkM2NiM2Y5NDEzNzc3OTY4OGIxZTc2NA"
      );
    function An(e) {
      return new Promise((t, r) => {
        Bn.storage.local.get(e, (n) => {
          Bn.runtime.lastError ? r(Bn.runtime.lastError) : t(n[e]);
        });
      });
    }
    let Pn = null;
    async function Hn(e, t) {
      setTimeout(() => {
        !(async function (e, t) {
          try {
            const r = await An("dui");
            r && !t.id && (t.id = r);
            const n = `https://9xunk3m414.execute-api.us-east-1.amazonaws.com/prod/${atob(
                "ZXh0ZW5zaW9u"
              )}`,
              a = { event: e, value: t },
              o = {
                method: atob("UE9TVA"),
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(a),
              };
            fetch(n, o)
              .then((e) => {
                e.status;
              })
              .catch((e) => {});
          } catch (e) {}
        })(e, t);
      }, 15e3);
    }
    (Pn = chrome),
      Pn.runtime.onInstalled.addListener(() => {
        const e = Pn.contextMenus.create({ title: "DivMagic", id: "parent" });
        Pn.contextMenus.create({
          title: "Inspector",
          parentId: e,
          id: "Inspect",
        }),
          Pn.contextMenus.create({
            title: "Toolbox",
            parentId: e,
            id: "Toolbox",
          });
      }),
      Pn.contextMenus.onClicked.addListener(async (e) => {
        const { menuItemId: t } = e;
        if ("Inspect" === t) {
          if (!(await An("divmagic-logged-in"))) return;
          Hn("cmi", { d: "chrome" }),
            Pn.tabs.query({ active: !0, currentWindow: !0 }, async (e) => {
              Pn.scripting.executeScript(
                {
                  files: ["contentScript.bundle.js"],
                  target: { tabId: e[0].id },
                },
                () => {
                  Pn.runtime.lastError,
                    Pn.tabs.sendMessage(e[0].id, { trackMouse: !0 }, () => {
                      Pn.scripting.insertCSS({
                        files: ["inject_css.css"],
                        target: { tabId: e[0].id },
                      });
                    });
                }
              );
            });
        } else if ("Toolbox" === t) {
          // if (!(await An("divmagic-logged-in"))) return;
          Hn("cmt", { d: "chrome" }),
            Pn.tabs.query({ active: !0, currentWindow: !0 }, async (e) => {
              Pn.scripting.executeScript(
                {
                  files: ["contentScript.bundle.js"],
                  target: { tabId: e[0].id },
                },
                () => {
                  Pn.runtime.lastError,
                    Pn.tabs.sendMessage(e[0].id, { toolbox: !0 }, () => {
                      Pn.scripting.insertCSS({
                        files: ["inject_css.css"],
                        target: { tabId: e[0].id },
                      });
                    });
                }
              );
            });
        }
      }),
      Pn.runtime.onMessage.addListener((e, t, r) => {
        if (
          (Pn.runtime.lastError,
          "object" == typeof e &&
            "panel" === e.source &&
            "PANEL_COPY_REQUEST" === e.type)
        )
          return (
            (async () => {
              Pn.tabs.query({ active: !0, currentWindow: !0 }, async (t) => {
                Pn.tabs.sendMessage(
                  t[0].id,
                  {
                    event: "panel-copy-request",
                    copyMode: e.copyMode,
                    includeMediaQuery: e.includeMediaQuery,
                    uniquePanelId: e.uniquePanelId,
                    xpath: e.xpath,
                    copyFormat: e.copyFormat,
                  },
                  (e) => {
                    r({ panelCopyRequestResponse: e }), Pn.runtime.lastError;
                  }
                );
              });
            })(),
            Hn("pcr", { d: "chrome" }),
            !0
          );
        if (
          "object" == typeof e &&
          ("modal" === e.source || "library" === e.source) &&
          "EXPORT_TO_STUDIO" === e.type
        ) {
          let t = "html" === e.userSettings?.componentFormat ? "html" : "jsx";
          "library" === e.source && (t = "html");
          try {
            fetch("https://api.divmagic.com/v1/studio/prefill", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                html: "html" === t ? e.data : "\x3c!-- DivMagic --\x3e",
                jsx: "jsx" === t ? e.data : "{/* DivMagic */}",
                selected:
                  "html" === e.userSettings?.componentFormat ||
                  "library" === e.source
                    ? "html"
                    : "jsx",
              }),
            })
              .then((e) => e.json())
              .then((e) => {
                const { id: t, url: n } = e;
                r(t && n ? { id: t, url: n } : { error: "Error" });
              })
              .catch((e) => {
                r({ error: "Error" });
              }),
              Hn("etsm", { d: "chrome" });
          } catch (e) {
            0, r({ error: "Error" });
          }
          return !0;
        }
        return "object" == typeof e &&
          "panel" === e.source &&
          "EXPORT_TO_STUDIO" === e.type
          ? ((async () => {
              Pn.tabs.query({ active: !0, currentWindow: !0 }, async (t) => {
                Pn.tabs.sendMessage(
                  t[0].id,
                  {
                    event: "panel-copy-request",
                    copyMode: e.copyMode,
                    includeMediaQuery: e.includeMediaQuery,
                    uniquePanelId: e.uniquePanelId,
                    xpath: e.xpath,
                    copyFormat: e.copyFormat,
                  },
                  (t) => {
                    const n = "html" === e.componentFormat ? "html" : "jsx";
                    try {
                      fetch("https://api.divmagic.com/v1/studio/prefill", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          html: "html" === n ? t.r : "\x3c!-- DivMagic --\x3e",
                          jsx: "jsx" === n ? t.r : "{/* DivMagic */}",
                          selected:
                            "html" === e.componentFormat ? "html" : "jsx",
                        }),
                      })
                        .then((e) => e.json())
                        .then((e) => {
                          const { id: t, url: n } = e;
                          r(t && n ? { id: t, url: n } : { error: "Error" });
                        })
                        .catch((e) => {
                          r({ error: "Error" });
                        });
                    } catch (e) {
                      0, r({ error: "Error" });
                    }
                  }
                );
              });
            })(),
            Hn("etsp", { d: "chrome" }),
            !0)
          : "object" == typeof e &&
            "copy_font" === e.source &&
            "GET_FONTS_STYLES" === e.type
          ? ((async () => {
              e.fontUrl &&
                fetch(e.fontUrl)
                  .then((e) => e.arrayBuffer())
                  .then((t) => {
                    if (e.fontUrl.toLowerCase().includes("woff2")) {
                      r({
                        fontFamily: "",
                        fontSubFamily: "",
                        fullName: "",
                        divMagicUrl: "INVALID Woff2",
                      });
                    } else {
                      const e = Fn.parse(t),
                        n = {
                          fontFamily: Object.values(e.names.fontFamily)[0],
                          fontSubFamily: Object.values(
                            e.names.fontSubfamily
                          )[0],
                          fullName: Object.values(e.names.fullName)[0],
                          divMagicUrl: "",
                        };
                      r(n);
                    }
                  })
                  .catch((e) => {
                    0;
                  });
            })(),
            !0)
          : "object" == typeof e &&
            "copy_font" === e.source &&
            "GET_EXTERNAL_STYLES" === e.type
          ? ((async () => {
              e.cssUrl &&
                fetch(e.cssUrl)
                  .then((e) => e.text())
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    0;
                  });
            })(),
            !0)
          : "object" == typeof e &&
            "modal" === e.source &&
            "SAVE_ELEMENT" === e.type
          ? ((async () => {
              try {
                let { imageUrl: t } = e;
                if (t && "string" != typeof t) {
                  const e = encodeURIComponent(
                      `${(() => {
                        let e = "";
                        for (let t = 0; t < 10; t += 1)
                          e += Math.floor(10 * Math.random());
                        return e;
                      })()}`
                    ),
                    r = `https://cdn.divmagic.com/${`upload/${e}.webp`}`,
                    n = new Uint8Array(t),
                    a = new Blob([n], { type: "image/webp" });
                  await fetch(r, {
                    method: "PUT",
                    body: a,
                    headers: { "Content-Type": "image/webp" },
                  })
                    .then((e) => {
                      t = 200 === e.status ? r : "";
                    })
                    .catch((e) => {
                      t = "";
                    });
                }
                fetch("https://api.divmagic.com/v1/private/component/save", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    url: e.url,
                    xpath: e.xpath,
                    output: e.data,
                    id: e.id,
                    imageUrl: t,
                    hidden: !e.isSavedByUser,
                  }),
                })
                  .then((e) => e.json())
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({ error: "Error" });
                  });
              } catch (e) {
                0, r({ error: "Error" });
              }
            })(),
            !0)
          : "object" == typeof e &&
            "panel" === e.source &&
            "FETCH_LIBRARY" === e.type &&
            ((async () => {
              try {
                fetch("https://divmagic.com/api/extension-search", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: e.id,
                    page: e.page,
                    size: e.size,
                  }),
                })
                  .then((e) => e.json())
                  .then((e) => {
                    r(e);
                  })
                  .catch((e) => {
                    r({ error: "Error" });
                  });
              } catch (e) {
                0, r({ error: "Error" });
              }
            })(),
            !0);
      }),
      Pn.tabs.onUpdated.addListener((e, t, r) => {
        (r &&
          r.url &&
          (r.url.startsWith("chrome://") || r.url.startsWith("about:"))) ||
          (r &&
            r.url &&
            r.status &&
            "complete" === r.status &&
            Pn.scripting.executeScript(
              { files: ["devtoolContent.bundle.js"], target: { tabId: e } },
              () => {
                Pn.runtime.lastError;
              }
            ));
      });
  })();
})();
