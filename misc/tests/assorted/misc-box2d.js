var saved = {print: print, printErr: printErr};
print = function() {};
printErr = function() {};

function ea(b) {
  throw b;
}

var ra = void 0, Ra = !0, rb = null, yb = !1;

function zb() {
  return (function() {});
}

function Kb(b) {
  return (function() {
    return b;
  });
}

var Mb = [], Qb = "object" === typeof process, Tb = "object" === typeof window, Ub = "function" === typeof importScripts, ac = !Tb && !Qb && !Ub;

if (Qb) {
  print = (function(b) {
    process.stdout.write(b + "\n");
  });
  printErr = (function(b) {
    process.stderr.write(b + "\n");
  });
  var bc = require("fs");
  read = (function(b) {
    var d = bc.readFileSync(b).toString();
    !d && "/" != b[0] && (b = __dirname.split("/").slice(0, -1).join("/") + "/src/" + b, d = bc.readFileSync(b).toString());
    return d;
  });
  Mb = process.argv.slice(2);
} else {
  ac ? (this.read || (read = (function(b) {
    snarf(b);
  })), Mb = this.arguments ? arguments : scriptArgs) : Tb ? (print = printErr = (function(b) {
    console.log(b);
  }), read = (function(b) {
    var d = new XMLHttpRequest;
    d.open("GET", b, yb);
    d.send(rb);
    return d.responseText;
  }), this.arguments && (Mb = arguments)) : Ub ? load = importScripts : ea("Unknown runtime environment. Where are we?");
}

function cc(b) {
  eval.call(rb, b);
}

"undefined" == typeof load && "undefined" != typeof read && (load = (function(b) {
  cc(read(b));
}));

"undefined" === typeof printErr && (printErr = zb());

"undefined" === typeof print && (print = printErr);

try {
  this.Module = Module;
} catch (ic) {
  this.Module = Module = {};
}

Module.arguments || (Module.arguments = Mb);

Module.print && (print = Module.print);

var oc = {
  i1: 0,
  i8: 0,
  i16: 0,
  i32: 0,
  i64: 0
}, Ac = {
  "float": 0,
  "double": 0
};

function Dc(b) {
  if (1 == Ec) {
    return 1;
  }
  var d = {
    "%i1": 1,
    "%i8": 1,
    "%i16": 2,
    "%i32": 4,
    "%i64": 8,
    "%float": 4,
    "%double": 8
  }["%" + b];
  d || ("*" == b[b.length - 1] ? d = Ec : "i" == b[0] && (b = parseInt(b.substr(1)), Gc(0 == b % 8), d = b / 8));
  return d;
}

function Nc(b) {
  var d = {};
  b.filter((function(b) {
    return d[b] ? yb : d[b] = Ra;
  }));
}

function Uc() {
  var b, d, e;
  d = b = 0;
  var f = [], g = -1;
  e = [ "i32", "i32" ].map((function(e) {
    var i, k;
    e in oc || e in Ac || "*" == e[e.length - 1] ? k = i = Dc(e) : (isPointerType(e) ? 0 : /^\[\d+\ x\ (.*)\]/.test(e) || /<?{ [^}]* }>?/.test(e) || "%" == e[0]) ? (i = Types.types[e].Lg, k = Types.types[e].Kg) : ea("Unclear type in struct: " + e + ", in undefined :: " + dump(Types.types[ra]));
    k = Math.min(k, Ec);
    d = Math.max(d, k);
    e = id(b, k);
    b = e + i;
    0 <= g && f.push(e - g);
    return g = e;
  }));
  b = id(b, d);
  0 == f.length || Nc(f);
  return e;
}

function jd(b) {
  var d = a;
  a += b;
  a = a + 3 >> 2 << 2;
  return d;
}

function yd(b) {
  var d = zd;
  zd += b;
  zd = zd + 3 >> 2 << 2;
  if (zd >= Ad) {
    for (; Ad <= zd; ) {
      Ad = Math.ceil(2 * Ad / Fd) * Fd;
    }
    var b = c, e = new ArrayBuffer(Ad);
    c = new Int8Array(e);
    j = new Int16Array(e);
    l = new Int32Array(e);
    Gd = new Uint8Array(e);
    Kd = new Uint16Array(e);
    o = new Uint32Array(e);
    p = new Float32Array(e);
    c.set(b);
  }
  return d;
}

function id(b, d) {
  return Math.ceil(b / (d ? d : 4)) * (d ? d : 4);
}

var Ec = 4, Ld = {}, $d, s;

function ae(b) {
  print(b + ":\n" + Error().stack);
  ea("Assertion: " + b);
}

function Gc(b, d) {
  b || ae("Assertion failed: " + d);
}

var ge = this;

Module.ccall = (function(b, d, e, f) {
  try {
    var g = eval("_" + b);
  } catch (h) {
    try {
      g = ge.Module["_" + b];
    } catch (i) {}
  }
  Gc(g, "Cannot call unknown function " + b + " (perhaps LLVM optimizations or closure removed it?)");
  var k = 0, b = f ? f.map((function(b) {
    if ("string" == e[k++]) {
      var d = a;
      jd(b.length + 1);
      he(b, d);
      b = d;
    }
    return b;
  })) : [];
  return (function(b, d) {
    return "string" == d ? ie(b) : b;
  })(g.apply(rb, b), d);
});

function se(b, d, e) {
  e = e || "i8";
  "*" === e[e.length - 1] && (e = "i32");
  switch (e) {
   case "i1":
    c[b] = d;
    break;
   case "i8":
    c[b] = d;
    break;
   case "i16":
    j[b >> 1] = d;
    break;
   case "i32":
    l[b >> 2] = d;
    break;
   case "i64":
    l[b >> 2] = d;
    break;
   case "float":
    p[b >> 2] = d;
    break;
   case "double":
    te[0] = d;
    l[b >> 2] = w[0];
    l[b + 4 >> 2] = w[1];
    break;
   default:
    ae("invalid type for setValue: " + e);
  }
}

Module.setValue = se;

function ue(b, d) {
  d = d || "i8";
  "*" === d[d.length - 1] && (d = "i32");
  switch (d) {
   case "i1":
    return c[b];
   case "i8":
    return c[b];
   case "i16":
    return j[b >> 1];
   case "i32":
    return l[b >> 2];
   case "i64":
    return l[b >> 2];
   case "float":
    return p[b >> 2];
   case "double":
    return w[0] = l[b >> 2], w[1] = l[b + 4 >> 2], te[0];
   default:
    ae("invalid type for setValue: " + d);
  }
  return rb;
}

Module.getValue = ue;

var Ne = 1, x = 2;

Module.ALLOC_NORMAL = 0;

Module.ALLOC_STACK = Ne;

Module.ALLOC_STATIC = x;

function D(b, d, e) {
  var f, g;
  "number" === typeof b ? (f = Ra, g = b) : (f = yb, g = b.length);
  var h = "string" === typeof d ? d : rb, e = [ Oe, jd, yd ][e === ra ? x : e](Math.max(g, h ? 1 : d.length));
  if (f) {
    return Ze(e, g), e;
  }
  f = 0;
  for (var i; f < g; ) {
    var k = b[f];
    "function" === typeof k && (k = Ld.Mg(k));
    i = h || d[f];
    0 === i ? f++ : ("i64" == i && (i = "i32"), se(e + f, k, i), f += Dc(i));
  }
  return e;
}

Module.allocate = D;

function ie(b, d) {
  for (var e = "undefined" == typeof d, f = "", g = 0, h, i = String.fromCharCode(0); ; ) {
    h = String.fromCharCode(Gd[b + g]);
    if (e && h == i) {
      break;
    }
    f += h;
    g += 1;
    if (!e && g == d) {
      break;
    }
  }
  return f;
}

Module.Pointer_stringify = ie;

Module.Array_stringify = (function(b) {
  for (var d = "", e = 0; e < b.length; e++) {
    d += String.fromCharCode(b[e]);
  }
  return d;
});

var K, Fd = 4096, c, Gd, j, Kd, l, o, p, a, $e, zd, af = Module.TOTAL_STACK || 5242880, Ad = Module.TOTAL_MEMORY || 10485760;

Gc(!!Int32Array && !!Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "Cannot fallback to non-typed array case: Code is too specialized");

var bf = new ArrayBuffer(Ad);

c = new Int8Array(bf);

j = new Int16Array(bf);

l = new Int32Array(bf);

Gd = new Uint8Array(bf);

Kd = new Uint16Array(bf);

o = new Uint32Array(bf);

p = new Float32Array(bf);

l[0] = 255;

Gc(255 === Gd[0] && 0 === Gd[3], "Typed arrays 2 must be run on a little-endian system");

var df = cf("(null)");

zd = df.length;

for (var ef = 0; ef < df.length; ef++) {
  c[ef] = df[ef];
}

Module.HEAP = ra;

Module.HEAP8 = c;

Module.HEAP16 = j;

Module.HEAP32 = l;

Module.HEAPU8 = Gd;

Module.HEAPU16 = Kd;

Module.HEAPU32 = o;

Module.HEAPF32 = p;

$e = (a = id(zd)) + af;

var ff = id($e, 8);

c.subarray(ff);

var w = l.subarray(ff >> 2), N = p.subarray(ff >> 2), te = (new Float64Array(c.buffer)).subarray(ff >> 3);

$e = ff + 8;

zd = Math.ceil($e / Fd) * Fd;

function xf(b) {
  for (; 0 < b.length; ) {
    var d = b.shift(), e = d.Zb;
    "number" === typeof e && (e = K[e]);
    e(d.mg === ra ? rb : d.mg);
  }
}

var yf = [], zf = [];

function Af(b, d) {
  return Array.prototype.slice.call(c.subarray(b, b + d));
}

Module.Array_copy = Af;

Module.TypedArray_copy = (function(b, d) {
  for (var e = new Uint8Array(d), f = 0; f < d; ++f) {
    e[f] = c[b + f];
  }
  return e.buffer;
});

function Bf(b) {
  for (var d = 0; c[b + d]; ) {
    d++;
  }
  return d;
}

Module.String_len = Bf;

function $f(b, d) {
  var e = Bf(b);
  d && e++;
  var f = Af(b, e);
  d && (f[e - 1] = 0);
  return f;
}

Module.String_copy = $f;

function cf(b, d) {
  for (var e = [], f = 0; f < b.length; ) {
    var g = b.charCodeAt(f);
    255 < g && (g &= 255);
    e.push(g);
    f += 1;
  }
  d || e.push(0);
  return e;
}

Module.intArrayFromString = cf;

Module.intArrayToString = (function(b) {
  for (var d = [], e = 0; e < b.length; e++) {
    var f = b[e];
    255 < f && (f &= 255);
    d.push(String.fromCharCode(f));
  }
  return d.join("");
});

function he(b, d, e) {
  for (var f = 0; f < b.length; ) {
    var g = b.charCodeAt(f);
    255 < g && (g &= 255);
    c[d + f] = g;
    f += 1;
  }
  e || (c[d + f] = 0);
}

Module.writeStringToMemory = he;

var O = [];

function ag(b, d) {
  return 0 <= b ? b : 32 >= d ? 2 * Math.abs(1 << d - 1) + b : Math.pow(2, d) + b;
}

function bg(b, d) {
  if (0 >= b) {
    return b;
  }
  var e = 32 >= d ? Math.abs(1 << d - 1) : Math.pow(2, d - 1);
  if (b >= e && (32 >= d || b > e)) {
    b = -2 * e + b;
  }
  return b;
}

function yg(b) {
  var d, e = b >> 2;
  l[e] = -1;
  d = (b + 12 | 0) >> 2;
  l[d] = 16;
  l[e + 2] = 0;
  var f = Oe(576), b = (b + 4 | 0) >> 2;
  l[b] = f;
  Ze(f, 36 * l[d] | 0);
  var f = l[d] - 1 | 0, g = 0 < (f | 0);
  a : do {
    if (g) {
      for (var h = 0; ; ) {
        var i = h + 1 | 0;
        l[(l[b] + 36 * h + 20 | 0) >> 2] = i;
        l[(l[b] + 36 * h + 32 | 0) >> 2] = -1;
        h = l[d] - 1 | 0;
        if ((i | 0) >= (h | 0)) {
          var k = h;
          break a;
        }
        h = i;
      }
    } else {
      k = f;
    }
  } while (0);
  l[(l[b] + 36 * k + 20 | 0) >> 2] = -1;
  l[(l[b] + 36 * (l[d] - 1) + 32 | 0) >> 2] = -1;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[e + 12] = 16;
  l[e + 13] = 0;
  d = Oe(192);
  l[e + 11] = d;
  l[e + 9] = 16;
  l[e + 10] = 0;
  d = Oe(64);
  l[e + 8] = d;
}

function zg(b, d, e) {
  var f, g = b | 0, h = Xg(g);
  f = (b + 4 | 0) >> 2;
  var i = p[d + 4 >> 2] - .10000000149011612, k = l[f] + 36 * h | 0, m = (N[0] = p[d >> 2] - .10000000149011612, w[0]), i = (N[0] = i, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | m;
  l[(k + 4 | 0) >> 2] = i;
  m = p[d + 12 >> 2] + .10000000149011612;
  k = l[f] + 36 * h + 8 | 0;
  d = (N[0] = p[d + 8 >> 2] + .10000000149011612, w[0]);
  m = (N[0] = m, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | d;
  l[(k + 4 | 0) >> 2] = m;
  l[(l[f] + 36 * h + 16 | 0) >> 2] = e;
  l[(l[f] + 36 * h + 32 | 0) >> 2] = 0;
  Yg(g, h);
  e = b + 28 | 0;
  l[e >> 2] = l[e >> 2] + 1 | 0;
  e = (b + 40 | 0) >> 2;
  d = l[e];
  f = b + 36 | 0;
  g = l[f >> 2];
  b = (b + 32 | 0) >> 2;
  (d | 0) == (g | 0) ? (d = l[b], l[f >> 2] = g << 1, f = Oe(g << 3), l[b] = f, Zg(f, d, l[e] << 2), Fh(d), f = l[e]) : f = d;
  l[((f << 2) + l[b] | 0) >> 2] = h;
  l[e] = l[e] + 1 | 0;
  return h;
}

function Gh(b, d, e, f, g) {
  var h, i = b >> 2;
  h = (b + 60 | 0) >> 2;
  l[h] = 0;
  var k = f + 12 | 0, m = p[g + 12 >> 2], n = p[k >> 2], q = p[g + 8 >> 2], r = p[f + 16 >> 2], t = m * n - q * r + p[g >> 2] - p[e >> 2], g = q * n + m * r + p[g + 4 >> 2] - p[e + 4 >> 2], m = p[e + 12 >> 2], n = p[e + 8 >> 2], e = m * t + n * g, t = t * -n + m * g, m = d + 12 | 0, g = o[m >> 2], m = o[m + 4 >> 2], n = (w[0] = g, N[0]), q = (w[0] = m, N[0]), u = d + 20 | 0, r = o[u >> 2], u = o[u + 4 >> 2], v = (w[0] = r, N[0]), A = (w[0] = u, N[0]), C = v - n, B = A - q, y = C * (v - e) + B * (A - t), z = e - n, F = t - q, G = C * z + B * F, f = p[d + 8 >> 2] + p[f + 8 >> 2], H = 0 < G;
  do {
    if (H) {
      if (0 < y) {
        var E = C * C + B * B;
        0 < E || S(O.td | 0, 127, O.Nc | 0, O.ud | 0);
        var I = 1 / E, E = e - (n * y + v * G) * I, I = t - (q * y + A * G) * I;
        if (E * E + I * I <= f * f) {
          E = -B;
          0 > z * E + C * F ? (I = B, E = -C) : (I = E, E = C);
          var J = Hh(I * I + E * E);
          1.1920928955078125e-7 > J ? J = E : (J = 1 / J, I *= J, J *= E);
          l[h] = 1;
          l[i + 14] = 1;
          E = b + 40 | 0;
          I = (N[0] = I, w[0]);
          J = (N[0] = J, w[0]) | 0;
          l[E >> 2] = 0 | I;
          l[E + 4 >> 2] = J;
          E = b + 48 | 0;
          l[E >> 2] = g;
          l[E + 4 >> 2] = m;
          E = b + 16 | 0;
          l[E >> 2] = 0;
          I = E;
          c[E] = 0;
          c[I + 1 | 0] = 0;
          c[I + 2 | 0] = 1;
          c[I + 3 | 0] = 0;
          E = k;
          I = b;
          J = l[E + 4 >> 2];
          l[I >> 2] = l[E >> 2];
          l[I + 4 >> 2] = J;
        }
      } else {
        if (E = e - v, I = t - A, E * E + I * I <= f * f) {
          if (0 != (c[d + 45 | 0] & 1) << 24 >> 24) {
            var L = d + 36 | 0, J = L | 0, L = L + 4 | 0, L = l[L >> 2], J = (w[0] = l[J >> 2], N[0]), L = (w[0] = L, N[0]);
            if (0 < (J - v) * E + (L - A) * I) {
              break;
            }
          }
          l[h] = 1;
          l[i + 14] = 0;
          p[i + 10] = 0;
          p[i + 11] = 0;
          I = b + 48 | 0;
          E = I | 0;
          l[E >> 2] = r;
          E = I + 4 | 0;
          l[E >> 2] = u;
          E = b + 16 | 0;
          l[E >> 2] = 0;
          I = E;
          c[E] = 1;
          c[I + 1 | 0] = 0;
          c[I + 2 | 0] = 0;
          c[I + 3 | 0] = 0;
          I = k;
          J = b;
          E = I | 0;
          I = I + 4 | 0;
          L = l[I >> 2];
          I = J | 0;
          l[I >> 2] = l[E >> 2];
          E = J + 4 | 0;
          l[E >> 2] = L;
        }
      }
    } else {
      if (z * z + F * F <= f * f) {
        if (0 != (c[d + 44 | 0] & 1) << 24 >> 24 && (E = d + 28 | 0, J = E | 0, L = E + 4 | 0, E = l[L >> 2], I = (w[0] = l[J >> 2], N[0]), E = (w[0] = E, N[0]), 0 < (n - I) * (n - e) + (q - E) * (q - t))) {
          break;
        }
        l[h] = 1;
        l[i + 14] = 0;
        p[i + 10] = 0;
        p[i + 11] = 0;
        I = b + 48 | 0;
        E = I | 0;
        l[E >> 2] = g;
        E = I + 4 | 0;
        l[E >> 2] = m;
        E = b + 16 | 0;
        l[E >> 2] = 0;
        I = E;
        c[E] = 0;
        c[I + 1 | 0] = 0;
        c[I + 2 | 0] = 0;
        c[I + 3 | 0] = 0;
        I = k;
        J = b;
        E = I | 0;
        E = l[E >> 2];
        I = I + 4 | 0;
        L = l[I >> 2];
        I = J | 0;
        l[I >> 2] = E;
        E = J + 4 | 0;
        l[E >> 2] = L;
      }
    }
  } while (0);
}

function Ih(b, d, e, f, g, h) {
  var i, k, m, n, q, r, t, u, v, A, C, B, y, z, F, G, H, E, I, J, L, M, V, Q, T, Y, R, P, aa, W, da, sa, ta, ja, ua, ha, wa, oa, Aa, Fa, La, xa, ca, Z, la, ya, fa, $, eb, Sa, Da, na, ma, Ba, za, Ha, jb = g >> 2, Ia = b >> 2, $a = a;
  a += 84;
  var ba;
  Ha = $a >> 2;
  var qa = $a + 12, ka = $a + 36;
  za = ka >> 2;
  var ia = $a + 60;
  Ba = ia >> 2;
  var va = b + 132 | 0, Oa = p[f + 12 >> 2], Pa = p[h + 8 >> 2], Ta = p[f + 8 >> 2], Xa = p[h + 12 >> 2], ab = Oa * Pa - Ta * Xa, kb = Oa * Xa + Ta * Pa, mb = (N[0] = ab, w[0]), Qa = (N[0] = kb, w[0]), Ma = 0 | mb, bb = Qa | 0, Va = p[h >> 2] - p[f >> 2], Ja = p[h + 4 >> 2] - p[f + 4 >> 2], ga = Oa * Va + Ta * Ja, cb = Va * -Ta + Oa * Ja, gb = (N[0] = ga, w[0]), db = (N[0] = cb, w[0]) | 0, Ya = va | 0;
  l[Ya >> 2] = 0 | gb;
  var Ka = va + 4 | 0;
  l[Ka >> 2] = db;
  var Ga = b + 140 | 0;
  l[Ga >> 2] = Ma;
  l[Ga + 4 >> 2] = bb;
  ma = (b + 144 | 0) >> 2;
  var fb = p[jb + 3];
  na = (b + 140 | 0) >> 2;
  var Ea = p[jb + 4];
  Da = (va | 0) >> 2;
  var Ua = kb * fb - ab * Ea + ga;
  Sa = (b + 136 | 0) >> 2;
  var ob = ab * fb + kb * Ea + cb, Na = b + 148 | 0, Wa = (N[0] = Ua, w[0]), nb = (N[0] = ob, w[0]) | 0;
  l[Na >> 2] = 0 | Wa;
  l[Na + 4 >> 2] = nb;
  var pa = e + 28 | 0, hb = b + 156 | 0, Ca = l[pa >> 2], ib = l[pa + 4 >> 2];
  l[hb >> 2] = Ca;
  l[hb + 4 >> 2] = ib;
  var Za = e + 12 | 0, lb = b + 164 | 0, qb = l[Za >> 2], vb = l[Za + 4 >> 2];
  l[lb >> 2] = qb;
  l[lb + 4 >> 2] = vb;
  var sb = e + 20 | 0, Ab = b + 172 | 0, Bb = l[sb >> 2], Gb = l[sb + 4 >> 2];
  l[Ab >> 2] = Bb;
  l[Ab + 4 >> 2] = Gb;
  var Cb = e + 36 | 0, pb = b + 180 | 0, ub = l[Cb >> 2], Eb = l[Cb + 4 >> 2];
  l[pb >> 2] = ub;
  l[pb + 4 >> 2] = Eb;
  var Db = c[e + 44 | 0] & 1, wb = 0 != Db << 24 >> 24, Hb = c[e + 45 | 0], tb = 0 != (Hb & 1) << 24 >> 24, xb = (w[0] = Bb, N[0]), Ib = (w[0] = qb, N[0]), Jb = xb - Ib, Lb = (w[0] = Gb, N[0]), Xb = b + 168 | 0, Nb = (w[0] = vb, N[0]), Sb = Lb - Nb, Ob = Hh(Jb * Jb + Sb * Sb), Vb = 1.1920928955078125e-7 > Ob, Zb = (w[0] = Ca, N[0]), dc = (w[0] = ib, N[0]), fc = (w[0] = ub, N[0]), kc = (w[0] = Eb, N[0]);
  if (Vb) {
    var Fb = Jb, Wb = Sb;
  } else {
    var vc = 1 / Ob, Fb = Jb * vc, Wb = Sb * vc;
  }
  var $b = b + 196 | 0, Yb = -Fb;
  eb = ($b | 0) >> 2;
  p[eb] = Wb;
  $ = (b + 200 | 0) >> 2;
  p[$] = Yb;
  var wc = Wb * (Ua - Ib) + (ob - Nb) * Yb;
  if (wb) {
    var xc = Ib - Zb, Hc = Nb - dc, Bd = Hh(xc * xc + Hc * Hc);
    if (1.1920928955078125e-7 > Bd) {
      var rc = xc, Rc = Hc;
    } else {
      var Ic = 1 / Bd, rc = xc * Ic, Rc = Hc * Ic;
    }
    var ad = -rc;
    p[Ia + 47] = Rc;
    p[Ia + 48] = ad;
    var pc = 0 <= rc * Wb - Rc * Fb, Pb = Rc * (Ua - Zb) + (ob - dc) * ad;
  } else {
    Pb = pc = 0;
  }
  a : do {
    if (tb) {
      var Rb = fc - xb, bd = kc - Lb, sc = Hh(Rb * Rb + bd * bd);
      if (1.1920928955078125e-7 > sc) {
        var mc = Rb, yc = bd;
      } else {
        var tc = 1 / sc, mc = Rb * tc, yc = bd * tc;
      }
      var Jc = -mc;
      fa = (b + 204 | 0) >> 2;
      p[fa] = yc;
      ya = (b + 208 | 0) >> 2;
      p[ya] = Jc;
      var uc = 0 < Fb * yc - Wb * mc, ec = yc * (Ua - xb) + (ob - Lb) * Jc;
      if (0 == (Db & Hb) << 24 >> 24) {
        var Oc = ec, Sc = uc;
        ba = 37;
      } else {
        if (pc & uc) {
          var lc = 0 > Pb & 0 > wc;
          do {
            if (lc) {
              var Kc = 0 <= ec;
              c[b + 248 | 0] = Kc & 1;
              var rd = b + 212 | 0;
              if (Kc) {
                var Cd = rd;
                break;
              }
              var kd = rd, sd = (N[0] = -Wb, w[0]), Md = (N[0] = Fb, w[0]), Nd = 0 | sd, Vc = Md | 0, Fc = kd | 0;
              la = Fc >> 2;
              l[la] = Nd;
              var nc = kd + 4 | 0;
              Z = nc >> 2;
              l[Z] = Vc;
              var jc = b + 228 | 0, gc = jc | 0;
              ca = gc >> 2;
              l[ca] = Nd;
              var Od = jc + 4 | 0;
              xa = Od >> 2;
              l[xa] = Vc;
              var Ae = b + 236 | 0, cd = Ae | 0;
              La = cd >> 2;
              l[La] = Nd;
              var dd = Ae + 4 | 0;
              Fa = dd >> 2;
              l[Fa] = Vc;
              ba = 64;
              break a;
            }
            c[b + 248 | 0] = 1;
            Cd = b + 212 | 0;
          } while (0);
          var Bc = $b, qc = Cd, zc = Bc | 0;
          Aa = zc >> 2;
          var td = l[Aa], Cc = Bc + 4 | 0;
          oa = Cc >> 2;
          var gf = l[oa], Wc = qc | 0;
          wa = Wc >> 2;
          l[wa] = td;
          var ld = qc + 4 | 0;
          ha = ld >> 2;
          l[ha] = gf;
          var Pd = b + 188 | 0, be = b + 228 | 0, Qd = Pd | 0;
          ua = Qd >> 2;
          var Hd = l[ua], ed = Pd + 4 | 0;
          ja = ed >> 2;
          var Be = l[ja], md = be | 0;
          ta = md >> 2;
          l[ta] = Hd;
          var Pc = be + 4 | 0;
          sa = Pc >> 2;
          l[sa] = Be;
          var je = b + 204 | 0, ce = b + 236 | 0, ke = je | 0;
          da = ke >> 2;
          var Cf = l[da], le = je + 4 | 0;
          W = le >> 2;
          var hf = l[W];
          l[ce >> 2] = Cf;
          l[ce + 4 >> 2] = hf;
        } else {
          if (pc) {
            var Id = 0 > Pb;
            do {
              if (Id) {
                if (0 > wc) {
                  c[b + 248 | 0] = 0;
                  var Qc = b + 212 | 0;
                } else {
                  var me = 0 <= ec;
                  c[b + 248 | 0] = me & 1;
                  var Rd = b + 212 | 0;
                  if (me) {
                    var ve = Rd;
                    break;
                  }
                  Qc = Rd;
                }
                var we = Qc, Pe = (N[0] = -Wb, w[0]), Ce = (N[0] = Fb, w[0]) | 0, Tc = we | 0;
                aa = Tc >> 2;
                l[aa] = 0 | Pe;
                var hc = we + 4 | 0;
                P = hc >> 2;
                l[P] = Ce;
                var ud = -p[ya], Sd = b + 228 | 0, Df = (N[0] = -p[fa], w[0]), Qe = (N[0] = ud, w[0]) | 0, Dd = Sd | 0;
                R = Dd >> 2;
                l[R] = 0 | Df;
                var Jd = Sd + 4 | 0;
                Y = Jd >> 2;
                l[Y] = Qe;
                var jf = -p[$], kf = b + 236 | 0, Xc = (N[0] = -p[eb], w[0]), xe = (N[0] = jf, w[0]) | 0;
                l[kf >> 2] = 0 | Xc;
                l[kf + 4 >> 2] = xe;
                ba = 64;
                break a;
              }
              c[b + 248 | 0] = 1;
              ve = b + 212 | 0;
            } while (0);
            var vd = $b, Td = ve, zc = vd | 0;
            Aa = zc >> 2;
            var Ef = l[Aa], Cc = vd + 4 | 0;
            oa = Cc >> 2;
            var Lc = l[oa], Wc = Td | 0;
            wa = Wc >> 2;
            l[wa] = Ef;
            ld = Td + 4 | 0;
            ha = ld >> 2;
            l[ha] = Lc;
            var ne = b + 188 | 0, Yc = b + 228 | 0, Qd = ne | 0;
            ua = Qd >> 2;
            var De = l[ua], ed = ne + 4 | 0;
            ja = ed >> 2;
            var de = l[ja], md = Yc | 0;
            ta = md >> 2;
            l[ta] = De;
            Pc = Yc + 4 | 0;
            sa = Pc >> 2;
            l[sa] = de;
            var Ee = b + 236 | 0, Zc = vd | 0;
            T = Zc >> 2;
            var cg = l[T], oe = vd + 4 | 0;
            Q = oe >> 2;
            var Fe = l[Q], wd = Ee | 0;
            V = wd >> 2;
            l[V] = cg;
            var pe = Ee + 4 | 0;
            M = pe >> 2;
            l[M] = Fe;
          } else {
            if (uc) {
              var Ag = 0 > ec;
              do {
                if (Ag) {
                  if (0 > Pb) {
                    c[b + 248 | 0] = 0;
                    var Re = b + 212 | 0;
                  } else {
                    var lf = 0 <= wc;
                    c[b + 248 | 0] = lf & 1;
                    var dg = b + 212 | 0;
                    if (lf) {
                      var Bg = dg;
                      break;
                    }
                    Re = dg;
                  }
                  var Ge = Re, He = (N[0] = -Wb, w[0]), eg = (N[0] = Fb, w[0]) | 0, Tc = Ge | 0;
                  aa = Tc >> 2;
                  l[aa] = 0 | He;
                  hc = Ge + 4 | 0;
                  P = hc >> 2;
                  l[P] = eg;
                  var Se = -p[$], fg = b + 228 | 0, yi = (N[0] = -p[eb], w[0]), $g = (N[0] = Se, w[0]) | 0, Dd = fg | 0;
                  R = Dd >> 2;
                  l[R] = 0 | yi;
                  Jd = fg + 4 | 0;
                  Y = Jd >> 2;
                  l[Y] = $g;
                  var zi = -p[Ia + 48], Mh = b + 236 | 0, mf = (N[0] = -p[Ia + 47], w[0]), ah = (N[0] = zi, w[0]) | 0, gg = Mh | 0;
                  l[gg >> 2] = 0 | mf;
                  var Ff = Mh + 4 | 0;
                  l[Ff >> 2] = ah;
                  ba = 64;
                  break a;
                }
                c[b + 248 | 0] = 1;
                Bg = b + 212 | 0;
              } while (0);
              var hg = $b, Gf = Bg, zc = hg | 0;
              Aa = zc >> 2;
              var Te = l[Aa], Cc = hg + 4 | 0;
              oa = Cc >> 2;
              var Nh = l[oa], Wc = Gf | 0;
              wa = Wc >> 2;
              l[wa] = Te;
              ld = Gf + 4 | 0;
              ha = ld >> 2;
              l[ha] = Nh;
              var Oh = b + 228 | 0, Tc = hg | 0;
              aa = Tc >> 2;
              var bh = l[aa], hc = hg + 4 | 0;
              P = hc >> 2;
              var nf = l[P];
              l[Oh >> 2] = bh;
              l[Oh + 4 >> 2] = nf;
              var Ph = b + 204 | 0, Qh = b + 236 | 0, Zc = Ph | 0;
              T = Zc >> 2;
              var ch = l[T], oe = Ph + 4 | 0;
              Q = oe >> 2;
              var dh = l[Q], wd = Qh | 0;
              V = wd >> 2;
              l[V] = ch;
              pe = Qh + 4 | 0;
              M = pe >> 2;
              l[M] = dh;
            } else {
              var Cg = 0 > Pb | 0 > wc;
              do {
                if (!Cg) {
                  var of = 0 <= ec;
                  c[b + 248 | 0] = of & 1;
                  var ig = b + 212 | 0;
                  if (!of) {
                    var Dg = ig;
                    break;
                  }
                  var Eg = $b, Fg = ig, xd = Eg | 0;
                  L = xd >> 2;
                  var ee = o[L], nd = Eg + 4 | 0;
                  J = nd >> 2;
                  var Hf = o[J], Ud = Fg | 0;
                  I = Ud >> 2;
                  l[I] = ee;
                  var Ed = Fg + 4 | 0;
                  E = Ed >> 2;
                  l[E] = Hf;
                  var jg = b + 228 | 0, Fc = jg | 0;
                  la = Fc >> 2;
                  l[la] = ee;
                  nc = jg + 4 | 0;
                  Z = nc >> 2;
                  l[Z] = Hf;
                  var Ai = b + 236 | 0, gc = Ai | 0;
                  ca = gc >> 2;
                  l[ca] = ee;
                  Od = Ai + 4 | 0;
                  xa = Od >> 2;
                  l[xa] = Hf;
                  ba = 64;
                  break a;
                }
                c[b + 248 | 0] = 0;
                Dg = b + 212 | 0;
              } while (0);
              var kg = Dg, If = (N[0] = -Wb, w[0]), Vd = (N[0] = Fb, w[0]) | 0, Tc = kg | 0;
              aa = Tc >> 2;
              l[aa] = 0 | If;
              hc = kg + 4 | 0;
              P = hc >> 2;
              l[P] = Vd;
              var Mc = -p[ya], eh = b + 228 | 0, Bi = (N[0] = -p[fa], w[0]), Rh = (N[0] = Mc, w[0]) | 0, Dd = eh | 0;
              R = Dd >> 2;
              l[R] = 0 | Bi;
              Jd = eh + 4 | 0;
              Y = Jd >> 2;
              l[Y] = Rh;
              var pf = -p[Ia + 48], Jf = b + 236 | 0, fh = (N[0] = -p[Ia + 47], w[0]), Kf = (N[0] = pf, w[0]) | 0, gg = Jf | 0;
              l[gg >> 2] = 0 | fh;
              Ff = Jf + 4 | 0;
              l[Ff >> 2] = Kf;
            }
          }
        }
        ba = 64;
      }
    } else {
      Sc = Oc = 0, ba = 37;
    }
  } while (0);
  a : do {
    if (37 == ba) {
      if (wb) {
        var gh = 0 <= Pb;
        if (pc) {
          do {
            if (!gh) {
              var hh = 0 <= wc;
              c[b + 248 | 0] = hh & 1;
              var Gg = b + 212 | 0;
              if (hh) {
                var fd = Gg;
                break;
              }
              var Sh = Gg, Th = (N[0] = -Wb, w[0]), ih = (N[0] = Fb, w[0]), qf = ih | 0, Fc = Sh | 0;
              la = Fc >> 2;
              l[la] = 0 | Th;
              nc = Sh + 4 | 0;
              Z = nc >> 2;
              l[Z] = qf;
              var Uh = $b, Vh = b + 228 | 0, md = Uh | 0;
              ta = md >> 2;
              var Ci = l[ta], Pc = Uh + 4 | 0;
              sa = Pc >> 2;
              var ye = l[sa], rf = Vh | 0;
              H = rf >> 2;
              l[H] = Ci;
              var Ie = Vh + 4 | 0;
              G = Ie >> 2;
              l[G] = ye;
              var Di = b + 236 | 0, Hg = -(w[0] = Ci, N[0]), Wh = Di, Je = 0 | (N[0] = Hg, w[0]), Lf = ih | 0;
              l[Wh >> 2] = Je;
              l[Wh + 4 >> 2] = Lf;
              break a;
            }
            c[b + 248 | 0] = 1;
            fd = b + 212 | 0;
          } while (0);
          var gd = $b, Mf = fd, zc = gd | 0;
          Aa = zc >> 2;
          var jh = l[Aa], Cc = gd + 4 | 0;
          oa = Cc >> 2;
          var kh = l[oa], Wc = Mf | 0;
          wa = Wc >> 2;
          l[wa] = jh;
          ld = Mf + 4 | 0;
          ha = ld >> 2;
          l[ha] = kh;
          var lh = b + 188 | 0, mh = b + 228 | 0, Qd = lh | 0;
          ua = Qd >> 2;
          var Ei = l[ua], ed = lh + 4 | 0;
          ja = ed >> 2;
          var Nf = l[ja], md = mh | 0;
          ta = md >> 2;
          l[ta] = Ei;
          Pc = mh + 4 | 0;
          sa = Pc >> 2;
          l[sa] = Nf;
          var nh = -p[$], Ke = b + 236 | 0, Ig = (N[0] = -p[eb], w[0]), Fi = (N[0] = nh, w[0]) | 0, lg = Ke | 0;
          l[lg >> 2] = 0 | Ig;
          var oh = Ke + 4 | 0;
          l[oh >> 2] = Fi;
        } else {
          do {
            if (gh) {
              var Ue = 0 <= wc;
              c[b + 248 | 0] = Ue & 1;
              var Xh = b + 212 | 0;
              if (!Ue) {
                var ph = Xh;
                break;
              }
              var qh = $b, Yh = Xh, xd = qh | 0;
              L = xd >> 2;
              var Of = o[L], nd = qh + 4 | 0;
              J = nd >> 2;
              var rh = o[J], Ud = Yh | 0;
              I = Ud >> 2;
              l[I] = Of;
              Ed = Yh + 4 | 0;
              E = Ed >> 2;
              l[E] = rh;
              var Zh = b + 228 | 0, Fc = Zh | 0;
              la = Fc >> 2;
              l[la] = Of;
              nc = Zh + 4 | 0;
              Z = nc >> 2;
              l[Z] = rh;
              var rj = b + 236 | 0, sh = -(w[0] = Of, N[0]), sf = rj, $h = (N[0] = sh, w[0]), Gi = (N[0] = Fb, w[0]) | 0, mg = sf | 0;
              F = mg >> 2;
              l[F] = 0 | $h;
              var od = sf + 4 | 0;
              z = od >> 2;
              l[z] = Gi;
              break a;
            }
            c[b + 248 | 0] = 0;
            ph = b + 212 | 0;
          } while (0);
          var Wd = ph, tf = (N[0] = -Wb, w[0]), ng = (N[0] = Fb, w[0]) | 0, Tc = Wd | 0;
          aa = Tc >> 2;
          l[aa] = 0 | tf;
          hc = Wd + 4 | 0;
          P = hc >> 2;
          l[P] = ng;
          var Ve = $b, og = b + 228 | 0, pg = Ve | 0;
          y = pg >> 2;
          var sj = l[y], Le = Ve + 4 | 0;
          B = Le >> 2;
          var Hi = l[B], cd = og | 0;
          La = cd >> 2;
          l[La] = sj;
          dd = og + 4 | 0;
          Fa = dd >> 2;
          l[Fa] = Hi;
          var ai = -p[Ia + 48], th = b + 236 | 0, Xd = (N[0] = -p[Ia + 47], w[0]), qg = (N[0] = ai, w[0]) | 0, We = th | 0;
          l[We >> 2] = 0 | Xd;
          var Jg = th + 4 | 0;
          l[Jg >> 2] = qg;
        }
      } else {
        var Pf = 0 <= wc;
        if (tb) {
          if (Sc) {
            do {
              if (!Pf) {
                var Yd = 0 <= Oc;
                c[b + 248 | 0] = Yd & 1;
                var Kg = b + 212 | 0;
                if (Yd) {
                  var Xe = Kg;
                  break;
                }
                var bi = Kg, rg = (N[0] = -Wb, w[0]), Lg = (N[0] = Fb, w[0]), uh = 0 | rg, Ii = Lg | 0, Fc = bi | 0;
                la = Fc >> 2;
                l[la] = uh;
                nc = bi + 4 | 0;
                Z = nc >> 2;
                l[Z] = Ii;
                var Mg = b + 228 | 0, gc = Mg | 0;
                ca = gc >> 2;
                l[ca] = uh;
                Od = Mg + 4 | 0;
                xa = Od >> 2;
                l[xa] = Ii;
                var Ng = $b, vh = b + 236 | 0, Zc = Ng | 0;
                T = Zc >> 2;
                var qe = l[T], oe = Ng + 4 | 0;
                Q = oe >> 2;
                var ci = l[Q], wd = vh | 0;
                V = wd >> 2;
                l[V] = qe;
                pe = vh + 4 | 0;
                M = pe >> 2;
                l[M] = ci;
                break a;
              }
              c[b + 248 | 0] = 1;
              Xe = b + 212 | 0;
            } while (0);
            var wh = $b, tj = Xe, zc = wh | 0;
            Aa = zc >> 2;
            var Dk = l[Aa], Cc = wh + 4 | 0;
            oa = Cc >> 2;
            var uj = l[oa], Wc = tj | 0;
            wa = Wc >> 2;
            l[wa] = Dk;
            ld = tj + 4 | 0;
            ha = ld >> 2;
            l[ha] = uj;
            var vj = -p[$], wj = b + 228 | 0, di = (N[0] = -p[eb], w[0]), Ek = (N[0] = vj, w[0]) | 0, ke = wj | 0;
            da = ke >> 2;
            l[da] = 0 | di;
            le = wj + 4 | 0;
            W = le >> 2;
            l[W] = Ek;
            var sg = b + 204 | 0, Ji = b + 236 | 0, Qf = sg | 0, Fk = l[Qf >> 2], Ki = sg + 4 | 0, Ql = l[Ki >> 2], lg = Ji | 0;
            l[lg >> 2] = Fk;
            oh = Ji + 4 | 0;
            l[oh >> 2] = Ql;
          } else {
            do {
              if (Pf) {
                var xj = 0 <= Oc;
                c[b + 248 | 0] = xj & 1;
                var yj = b + 212 | 0;
                if (!xj) {
                  var zj = yj;
                  break;
                }
                var Aj = $b, ei = yj, xd = Aj | 0;
                L = xd >> 2;
                var xh = o[L], nd = Aj + 4 | 0;
                J = nd >> 2;
                var yh = o[J], Ud = ei | 0;
                I = Ud >> 2;
                l[I] = xh;
                Ed = ei + 4 | 0;
                E = Ed >> 2;
                l[E] = yh;
                var Rf = b + 228 | 0, Li = -(w[0] = xh, N[0]), zh = Rf, Bj = (N[0] = Li, w[0]), Gk = (N[0] = Fb, w[0]) | 0, Ah = zh | 0;
                l[Ah >> 2] = 0 | Bj;
                var fi = zh + 4 | 0;
                l[fi >> 2] = Gk;
                var tg = b + 236 | 0, mg = tg | 0;
                F = mg >> 2;
                l[F] = xh;
                od = tg + 4 | 0;
                z = od >> 2;
                l[z] = yh;
                break a;
              }
              c[b + 248 | 0] = 0;
              zj = b + 212 | 0;
            } while (0);
            var gi = zj, Hk = (N[0] = -Wb, w[0]), Rl = (N[0] = Fb, w[0]) | 0, Tc = gi | 0;
            aa = Tc >> 2;
            l[aa] = 0 | Hk;
            hc = gi + 4 | 0;
            P = hc >> 2;
            l[P] = Rl;
            var Cj = -p[Ia + 52], Mi = b + 228 | 0, Sl = (N[0] = -p[Ia + 51], w[0]), Tl = (N[0] = Cj, w[0]) | 0, Qf = Mi | 0;
            l[Qf >> 2] = 0 | Sl;
            Ki = Mi + 4 | 0;
            l[Ki >> 2] = Tl;
            var Ik = $b, Ni = b + 236 | 0, Og = l[Ik >> 2], Ul = l[Ik + 4 >> 2], We = Ni | 0;
            l[We >> 2] = Og;
            Jg = Ni + 4 | 0;
            l[Jg >> 2] = Ul;
          }
        } else {
          c[b + 248 | 0] = Pf & 1;
          var Jk = b + 212 | 0;
          if (Pf) {
            var Dj = $b, hi = Jk, xd = Dj | 0;
            L = xd >> 2;
            var Ej = o[L], nd = Dj + 4 | 0;
            J = nd >> 2;
            var Kk = l[J], Ud = hi | 0;
            I = Ud >> 2;
            l[I] = Ej;
            Ed = hi + 4 | 0;
            E = Ed >> 2;
            l[E] = Kk;
            var Vl = b + 228 | 0, Fj = -(w[0] = Ej, N[0]), Gj = Vl, Me = (N[0] = Fj, w[0]), Wl = (N[0] = Fb, w[0]), Hj = 0 | Me, Oi = Wl | 0, Ah = Gj | 0;
            l[Ah >> 2] = Hj;
            fi = Gj + 4 | 0;
            l[fi >> 2] = Oi;
            var Ij = b + 236 | 0, mg = Ij | 0;
            F = mg >> 2;
            l[F] = Hj;
            od = Ij + 4 | 0;
            z = od >> 2;
            l[z] = Oi;
          } else {
            var Jj = Jk, Pi = (N[0] = -Wb, w[0]), ii = (N[0] = Fb, w[0]) | 0, Fc = Jj | 0;
            la = Fc >> 2;
            l[la] = 0 | Pi;
            nc = Jj + 4 | 0;
            Z = nc >> 2;
            l[Z] = ii;
            var Kj = $b, Lj = b + 228 | 0, md = Kj | 0;
            ta = md >> 2;
            var Mj = l[ta], Pc = Kj + 4 | 0;
            sa = Pc >> 2;
            var ji = l[sa], rf = Lj | 0;
            H = rf >> 2;
            l[H] = Mj;
            Ie = Lj + 4 | 0;
            G = Ie >> 2;
            l[G] = ji;
            var Qi = b + 236 | 0, wd = Qi | 0;
            V = wd >> 2;
            l[V] = Mj;
            pe = Qi + 4 | 0;
            M = pe >> 2;
            l[M] = ji;
          }
        }
      }
    }
  } while (0);
  C = (g + 148 | 0) >> 2;
  var Pg = l[C];
  A = (b + 128 | 0) >> 2;
  l[A] = Pg;
  var Lk = 0 < (l[C] | 0);
  a : do {
    if (Lk) {
      for (var Sf = 0; ; ) {
        var Nj = p[ma], Oj = p[((Sf << 3) + 20 >> 2) + jb], Pj = p[na], Qj = p[((Sf << 3) + 24 >> 2) + jb], Rj = Pj * Oj + Nj * Qj + p[Sa], Ri = (Sf << 3) + b | 0, Mk = (N[0] = Nj * Oj - Pj * Qj + p[Da], w[0]), Sj = (N[0] = Rj, w[0]) | 0, wd = Ri | 0;
        V = wd >> 2;
        l[V] = 0 | Mk;
        pe = Ri + 4 | 0;
        M = pe >> 2;
        l[M] = Sj;
        var Qg = p[ma], Nk = p[((Sf << 3) + 84 >> 2) + jb], Si = p[na], Ok = p[((Sf << 3) + 88 >> 2) + jb], dn = Si * Nk + Qg * Ok, Ti = (Sf << 3) + b + 64 | 0, Pk = (N[0] = Qg * Nk - Si * Ok, w[0]), Ui = (N[0] = dn, w[0]) | 0, Ya = Ti | 0;
        l[Ya >> 2] = 0 | Pk;
        Ka = Ti + 4 | 0;
        l[Ka >> 2] = Ui;
        var Vi = Sf + 1 | 0;
        if ((Vi | 0) >= (l[C] | 0)) {
          break a;
        }
        Sf = Vi;
      }
    }
  } while (0);
  v = (b + 244 | 0) >> 2;
  p[v] = .019999999552965164;
  var Wi = d + 60 | 0;
  l[Wi >> 2] = 0;
  var Xl = b + 248 | 0, Xi = l[A], Yi = 0 < (Xi | 0);
  a : do {
    if (Yi) {
      for (var Qk = p[Ia + 41], Rg = p[Xb >> 2], Yl = p[Ia + 53], tp = p[Ia + 54], Rk = 0, Zl = 3.4028234663852886e+38; ; ) {
        var en = Yl * (p[(Rk << 3 >> 2) + Ia] - Qk) + tp * (p[((Rk << 3) + 4 >> 2) + Ia] - Rg), $l = en < Zl ? en : Zl, fn = Rk + 1 | 0;
        if ((fn | 0) == (Xi | 0)) {
          var am = $l;
          break a;
        }
        Rk = fn;
        Zl = $l;
      }
    } else {
      am = 3.4028234663852886e+38;
    }
  } while (0);
  var $r = am > p[v];
  a : do {
    if (!$r) {
      var Sk = $a, Tf = b, bm = ra, Tk = ra, Uk = ra, Zi = Tf >> 2, cm = ra, Uk = (Sk | 0) >> 2;
      l[Uk] = 0;
      Tk = (Sk + 4 | 0) >> 2;
      l[Tk] = -1;
      bm = (Sk + 8 | 0) >> 2;
      p[bm] = -3.4028234663852886e+38;
      for (var gn = p[Zi + 54], hn = p[Zi + 53], up = l[Zi + 32], as = Tf + 164 | 0, bs = Tf + 168 | 0, vp = Tf + 172 | 0, wp = Tf + 176 | 0, xp = Tf + 244 | 0, cs = Tf + 228 | 0, ds = Tf + 232 | 0, Tj = Tf + 236 | 0, es = Tf + 240 | 0, ug = 0, Vk = -3.4028234663852886e+38; (ug | 0) < (up | 0); ) {
        var $i = p[((ug << 3) + 64 >> 2) + Zi], Wk = -$i, Uj = -p[((ug << 3) + 68 >> 2) + Zi], jn = p[(ug << 3 >> 2) + Zi], kn = p[((ug << 3) + 4 >> 2) + Zi], Xk = (jn - p[as >> 2]) * Wk + (kn - p[bs >> 2]) * Uj, dm = (jn - p[vp >> 2]) * Wk + (kn - p[wp >> 2]) * Uj, vg = Xk < dm ? Xk : dm;
        if (vg > p[xp >> 2]) {
          l[Uk] = 2;
          l[Tk] = ug;
          p[bm] = vg;
          break;
        }
        var fs = 0 > $i * gn + hn * Uj;
        do {
          if (fs) {
            if (-.03490658849477768 <= (Wk - p[cs >> 2]) * hn + (Uj - p[ds >> 2]) * gn & vg > Vk) {
              cm = 7;
              break;
            }
            var Vj = Vk;
          } else {
            if (-.03490658849477768 <= (Wk - p[Tj >> 2]) * hn + (Uj - p[es >> 2]) * gn & vg > Vk) {
              cm = 7;
              break;
            }
            Vj = Vk;
          }
          cm = 8;
        } while (0);
        7 == cm && (l[Uk] = 2, l[Tk] = ug, Vj = p[bm] = vg);
        ug = ug + 1 | 0;
        Vk = Vj;
      }
      var yp = l[Ha], zp = 0 == (yp | 0);
      do {
        if (zp) {
          ba = 73;
        } else {
          var ln = p[Ha + 2];
          if (ln > p[v]) {
            break a;
          }
          if (ln > .9800000190734863 * am + .0010000000474974513) {
            var Wj = o[Ha + 1], mn = d + 56 | 0;
            if (1 == (yp | 0)) {
              var em = mn;
              ba = 75;
            } else {
              l[mn >> 2] = 2;
              var nn = qa, xd = lb | 0;
              L = xd >> 2;
              var on = l[L], nd = lb + 4 | 0;
              J = nd >> 2;
              var fm = l[J], Ud = nn | 0;
              I = Ud >> 2;
              l[I] = on;
              Ed = nn + 4 | 0;
              E = Ed >> 2;
              l[E] = fm;
              var pn = qa + 8 | 0, gm = pn;
              c[pn] = 0;
              var hm = Wj & 255;
              c[gm + 1 | 0] = hm;
              c[gm + 2 | 0] = 0;
              c[gm + 3 | 0] = 1;
              var qn = qa + 12 | 0, rf = Ab | 0;
              H = rf >> 2;
              var rn = l[H], Ie = Ab + 4 | 0;
              G = Ie >> 2;
              var Ap = l[G], ke = qn | 0;
              da = ke >> 2;
              l[da] = rn;
              le = qn + 4 | 0;
              W = le >> 2;
              l[W] = Ap;
              var im = qa + 20 | 0, jm = im;
              c[im] = 0;
              c[jm + 1 | 0] = hm;
              c[jm + 2 | 0] = 0;
              c[jm + 3 | 0] = 1;
              var sn = Wj + 1 | 0, tn = (sn | 0) < (l[A] | 0) ? sn : 0, Bp = (Wj << 3) + b | 0, un = l[Bp >> 2], gs = l[Bp + 4 >> 2], Cp = (tn << 3) + b | 0, hs = l[Cp >> 2], Dp = l[Cp + 4 >> 2], uf = (Wj << 3) + b + 64 | 0, is = l[uf >> 2], Ep = l[uf + 4 >> 2], vn = tn & 255, wn = (w[0] = on, N[0]), Fp = (w[0] = fm, N[0]), Gp = (w[0] = rn, N[0]), js = (w[0] = Ap, N[0]), Yk = Wj, xn = vn, km = un, Zk = gs, yn = hs, $k = Dp, al = is, ki = Ep, lm = Gp, mm = wn, bl = js, nm = Fp, cl = hm, aj = 0;
              ba = 82;
            }
          } else {
            ba = 73;
          }
        }
      } while (0);
      73 == ba && (em = d + 56 | 0, ba = 75);
      if (75 == ba) {
        l[em >> 2] = 1;
        var Xj = l[A], Sg = 1 < (Xj | 0);
        b : do {
          if (Sg) {
            for (var Yj = p[Ia + 54], bj = p[Ia + 53], cj = 0, li = bj * p[Ia + 16] + Yj * p[Ia + 17], Bh = 1; ; ) {
              var Zj = bj * p[((Bh << 3) + 64 >> 2) + Ia] + Yj * p[((Bh << 3) + 68 >> 2) + Ia], $j = Zj < li, dl = $j ? Bh : cj, el = $j ? Zj : li, ak = Bh + 1 | 0;
              if ((ak | 0) >= (Xj | 0)) {
                var dj = dl;
                break b;
              }
              cj = dl;
              li = el;
              Bh = ak;
            }
          } else {
            dj = 0;
          }
        } while (0);
        var bk = dj + 1 | 0, ck = (bk | 0) < (Xj | 0) ? bk : 0, ej = (dj << 3) + b | 0, Ch = qa, Wc = ej | 0;
        wa = Wc >> 2;
        var Dh = l[wa], ld = ej + 4 | 0;
        ha = ld >> 2;
        var fj = l[ha];
        l[Ch >> 2] = Dh;
        l[Ch + 4 >> 2] = fj;
        var gj = qa + 8 | 0, hj = gj;
        c[gj] = 0;
        var dk = dj & 255;
        c[hj + 1 | 0] = dk;
        c[hj + 2 | 0] = 1;
        c[hj + 3 | 0] = 0;
        var ek = (ck << 3) + b | 0, fl = qa + 12 | 0, fk = l[ek >> 2], gk = l[ek + 4 >> 2];
        l[fl >> 2] = fk;
        l[fl + 4 >> 2] = gk;
        var hk = qa + 20 | 0, mi = hk;
        c[hk] = 0;
        c[mi + 1 | 0] = ck & 255;
        c[mi + 2 | 0] = 1;
        c[mi + 3 | 0] = 0;
        var gl = 0 == (c[Xl] & 1) << 24 >> 24, hl = (w[0] = Dh, N[0]), il = (w[0] = fj, N[0]), om = (w[0] = fk, N[0]), jl = (w[0] = gk, N[0]);
        if (gl) {
          var ij = Ab | 0, Tg = Ab + 4 | 0, pm = l[ij >> 2], ik = l[Tg >> 2], jj = lb | 0, Ug = lb + 4 | 0, kl = l[jj >> 2], qm = l[Ug >> 2], ll = -p[$], wg = (N[0] = -p[eb], w[0]), rm = (N[0] = ll, w[0]), Yk = 1, xn = 0, km = pm, Zk = ik, yn = kl, $k = qm, al = wg, ki = rm;
        } else {
          var ij = lb | 0, Tg = lb + 4 | 0, jj = Ab | 0, Ug = Ab + 4 | 0, xg = $b, Yk = 0, xn = 1, km = l[ij >> 2], Zk = l[Tg >> 2], yn = l[jj >> 2], $k = l[Ug >> 2], al = l[xg >> 2], ki = l[xg + 4 >> 2];
        }
        lm = om;
        mm = hl;
        bl = jl;
        nm = il;
        cl = dk;
        aj = 1;
      }
      var Ye = (w[0] = km, N[0]), ml = (w[0] = Zk, N[0]), zn = (w[0] = $k, N[0]), Uf = (w[0] = al, N[0]), jk = (w[0] = ki, N[0]), sm = -Uf, An = jk * Ye + ml * sm, ks = Uf * zn, tm = (w[0] = yn, N[0]), um = -jk, Hp = tm * um + ks, kj = jk * mm + nm * sm - An, Ip = qa + 12 | 0, vm = jk * lm + bl * sm - An;
      if (0 < kj) {
        var kk = 0;
      } else {
        u = ka >> 2, t = qa >> 2, l[u] = l[t], l[u + 1] = l[t + 1], l[u + 2] = l[t + 2], kk = 1;
      }
      if (0 < vm) {
        var lk = kk;
      } else {
        r = (ka + 12 * kk | 0) >> 2, q = Ip >> 2, l[r] = l[q], l[r + 1] = l[q + 1], l[r + 2] = l[q + 2], lk = kk + 1 | 0;
      }
      if (0 > kj * vm) {
        var nl = kj / (kj - vm), Jp = nm + (bl - nm) * nl, Bn = ka + 12 * lk | 0, ls = (N[0] = mm + (lm - mm) * nl, w[0]), ms = (N[0] = Jp, w[0]) | 0, pg = Bn | 0;
        y = pg >> 2;
        l[y] = 0 | ls;
        Le = Bn + 4 | 0;
        B = Le >> 2;
        l[B] = ms;
        var Kp = ka + 12 * lk + 8 | 0, Cn = Kp;
        c[Kp] = Yk & 255;
        c[Cn + 1 | 0] = cl;
        c[Cn + 2 | 0] = 0;
        c[Cn + 3 | 0] = 1;
        var Lp = lk + 1 | 0;
      } else {
        Lp = lk;
      }
      if (2 <= (Lp | 0)) {
        var Dn = p[za], En = p[za + 1], wm = Dn * um + Uf * En - Hp, Mp = ka + 12 | 0, Np = p[Mp >> 2], Op = p[za + 4], Fn = Np * um + Uf * Op - Hp;
        if (0 < wm) {
          var xm = 0;
        } else {
          n = ia >> 2, m = ka >> 2, l[n] = l[m], l[n + 1] = l[m + 1], l[n + 2] = l[m + 2], xm = 1;
        }
        if (0 < Fn) {
          var ol = xm;
        } else {
          k = (ia + 12 * xm | 0) >> 2, i = Mp >> 2, l[k] = l[i], l[k + 1] = l[i + 1], l[k + 2] = l[i + 2], ol = xm + 1 | 0;
        }
        if (0 > wm * Fn) {
          var Gn = wm / (wm - Fn), Pp = En + (Op - En) * Gn, Qp = ia + 12 * ol | 0, ns = (N[0] = Dn + (Np - Dn) * Gn, w[0]), os = (N[0] = Pp, w[0]) | 0, pg = Qp | 0;
          y = pg >> 2;
          l[y] = 0 | ns;
          Le = Qp + 4 | 0;
          B = Le >> 2;
          l[B] = os;
          var Rp = ia + 12 * ol + 8 | 0, Hn = Rp;
          c[Rp] = xn;
          c[Hn + 1 | 0] = c[ka + 9 | 0];
          c[Hn + 2 | 0] = 0;
          c[Hn + 3 | 0] = 1;
          var Sp = ol + 1 | 0;
        } else {
          Sp = ol;
        }
        if (2 <= (Sp | 0)) {
          var Tp = d + 40 | 0;
          if (aj) {
            var Up = Tp;
            l[Up >> 2] = 0 | al;
            l[Up + 4 >> 2] = ki | 0;
            var Vp = d + 48 | 0, rf = Vp | 0;
            H = rf >> 2;
            l[H] = 0 | km;
            Ie = Vp + 4 | 0;
            G = Ie >> 2;
            l[G] = Zk | 0;
          } else {
            var Wp = (Yk << 3) + g + 84 | 0, Xp = Tp, zc = Wp | 0;
            Aa = zc >> 2;
            var ps = l[Aa], Cc = Wp + 4 | 0;
            oa = Cc >> 2;
            var qs = l[oa], Wc = Xp | 0;
            wa = Wc >> 2;
            l[wa] = ps;
            ld = Xp + 4 | 0;
            ha = ld >> 2;
            l[ha] = qs;
            var re = (Yk << 3) + g + 20 | 0, Zd = d + 48 | 0, Qd = re | 0;
            ua = Qd >> 2;
            var In = l[ua], ed = re + 4 | 0;
            ja = ed >> 2;
            var pl = l[ja], md = Zd | 0;
            ta = md >> 2;
            l[ta] = In;
            Pc = Zd + 4 | 0;
            sa = Pc >> 2;
            l[sa] = pl;
          }
          var Jn = p[Ba], Kn = p[Ba + 1], pd = p[v];
          if (Uf * (Jn - Ye) + jk * (Kn - ml) > pd) {
            var hd = 0, Ln = pd;
          } else {
            if (aj) {
              var Mn = Jn - p[Da], Nn = Kn - p[Sa], On = p[ma], Pn = p[na], Yp = Mn * -Pn + On * Nn, Qn = d, Zp = (N[0] = On * Mn + Pn * Nn, w[0]), $p = (N[0] = Yp, w[0]) | 0, cd = Qn | 0;
              La = cd >> 2;
              l[La] = 0 | Zp;
              dd = Qn + 4 | 0;
              Fa = dd >> 2;
              l[Fa] = $p;
              l[d + 16 >> 2] = l[Ba + 2];
            } else {
              var ym = ia, aq = d, xd = ym | 0;
              L = xd >> 2;
              var rs = l[L], nd = ym + 4 | 0;
              J = nd >> 2;
              var bq = l[J], Ud = aq | 0;
              I = Ud >> 2;
              l[I] = rs;
              Ed = aq + 4 | 0;
              E = Ed >> 2;
              l[E] = bq;
              var cq = ia + 8 | 0, Rn = cq, dq = d + 16 | 0, Sn = dq;
              c[Sn + 2 | 0] = c[Rn + 3 | 0];
              c[Sn + 3 | 0] = c[Rn + 2 | 0];
              c[dq] = c[Rn + 1 | 0];
              c[Sn + 1 | 0] = c[cq];
            }
            hd = 1;
            Ln = p[v];
          }
          var eq = ia + 12 | 0, fq = p[eq >> 2], gq = p[Ba + 4];
          if (Uf * (fq - Ye) + jk * (gq - ml) > Ln) {
            var zm = hd;
          } else {
            var Tn = d + 20 * hd | 0;
            if (aj) {
              var Un = fq - p[Da], Vn = gq - p[Sa], Wn = p[ma], Xn = p[na], hq = Un * -Xn + Wn * Vn, Am = Tn, Yn = (N[0] = Wn * Un + Xn * Vn, w[0]), iq = (N[0] = hq, w[0]) | 0, cd = Am | 0;
              La = cd >> 2;
              l[La] = 0 | Yn;
              dd = Am + 4 | 0;
              Fa = dd >> 2;
              l[Fa] = iq;
              l[(d + 16 >> 2) + (5 * hd | 0)] = l[Ba + 5];
            } else {
              var Zn = eq, ql = Tn, xd = Zn | 0;
              L = xd >> 2;
              var $n = l[L], nd = Zn + 4 | 0;
              J = nd >> 2;
              var jq = l[J], Ud = ql | 0;
              I = Ud >> 2;
              l[I] = $n;
              Ed = ql + 4 | 0;
              E = Ed >> 2;
              l[E] = jq;
              var ao = ia + 20 | 0, Bm = ao, kq = d + 20 * hd + 16 | 0, bo = kq;
              c[bo + 2 | 0] = c[Bm + 3 | 0];
              c[bo + 3 | 0] = c[Bm + 2 | 0];
              c[kq] = c[Bm + 1 | 0];
              c[bo + 1 | 0] = c[ao];
            }
            zm = hd + 1 | 0;
          }
          l[Wi >> 2] = zm;
        }
      }
    }
  } while (0);
  a = $a;
}

function Jh(b, d, e, f, g) {
  var h = d >> 2, i = l[h + 37], k = p[g + 12 >> 2], m = p[f + 12 >> 2], n = p[g + 8 >> 2], q = p[f + 16 >> 2], r = p[e + 12 >> 2], t = p[h + 3], u = p[e + 8 >> 2], v = p[h + 4], A = k * m - n * q + p[g >> 2] - (r * t - u * v + p[e >> 2]), m = n * m + k * q + p[g + 4 >> 2] - (u * t + r * v + p[e + 4 >> 2]), k = r * A + u * m, r = A * -u + r * m, u = 0 < (i | 0);
  a : do {
    if (u) {
      A = 0;
      m = -3.4028234663852886e+38;
      for (n = 0; ; ) {
        if (q = p[((n << 3) + 84 >> 2) + h] * k + p[((n << 3) + 88 >> 2) + h] * r, A = (t = q > m) ? n : A, m = t ? q : m, n = n + 1 | 0, (n | 0) == (i | 0)) {
          var C = A;
          break a;
        }
      }
    } else {
      C = 0;
    }
  } while (0);
  h = Kh(d, e, C, f, g);
  k = (0 < (C | 0) ? C : i) - 1 | 0;
  r = Kh(d, e, k, f, g);
  u = C + 1 | 0;
  u = (u | 0) < (i | 0) ? u : 0;
  A = Kh(d, e, u, f, g);
  m = r > h & r > A;
  a : do {
    if (m) {
      n = r;
      for (q = k; ; ) {
        t = (0 < (q | 0) ? q : i) - 1 | 0;
        v = Kh(d, e, t, f, g);
        if (v <= n) {
          var B = n, y = q;
          break a;
        }
        n = v;
        q = t;
      }
    } else {
      if (A > h) {
        n = A;
        for (q = u; ; ) {
          t = q + 1 | 0;
          t = (t | 0) < (i | 0) ? t : 0;
          v = Kh(d, e, t, f, g);
          if (v <= n) {
            B = n;
            y = q;
            break a;
          }
          n = v;
          q = t;
        }
      } else {
        B = h, y = C;
      }
    }
  } while (0);
  l[b >> 2] = y;
  return B;
}

function Kh(b, d, e, f, g) {
  var f = f >> 2, h = b >> 2, i = l[f + 37];
  2 == (-1 < (e | 0) ? (l[h + 37] | 0) > (e | 0) ? 3 : 2 : 2) && S(O.Gb | 0, 32, O.Oc | 0, O.Cb | 0);
  var b = p[d + 12 >> 2], k = p[((e << 3) + 84 >> 2) + h], m = p[d + 8 >> 2], n = p[((e << 3) + 88 >> 2) + h], q = b * k - m * n, k = m * k + b * n, n = p[g + 12 >> 2], r = p[g + 8 >> 2], t = n * q + r * k, u = q * -r + n * k, v = 0 < (i | 0);
  a : do {
    if (v) {
      for (var A = 0, C = 3.4028234663852886e+38, B = 0; ; ) {
        var y = p[((B << 3) + 20 >> 2) + f] * t + p[((B << 3) + 24 >> 2) + f] * u, z = y < C, A = z ? B : A, C = z ? y : C, B = B + 1 | 0;
        if ((B | 0) == (i | 0)) {
          var F = A;
          break a;
        }
      }
    } else {
      F = 0;
    }
  } while (0);
  i = p[((e << 3) + 20 >> 2) + h];
  e = p[((e << 3) + 24 >> 2) + h];
  h = p[((F << 3) + 20 >> 2) + f];
  F = p[((F << 3) + 24 >> 2) + f];
  return (n * h - r * F + p[g >> 2] - (b * i - m * e + p[d >> 2])) * q + (r * h + n * F + p[g + 4 >> 2] - (m * i + b * e + p[d + 4 >> 2])) * k;
}

function Lh(b, d, e, f, g, h) {
  var i, k = g >> 2, m = e >> 2, n = d >> 2;
  i = (d + 60 | 0) >> 2;
  var q = 0 == (l[i] | 0);
  a : do {
    if (!q) {
      var r = l[n + 14];
      if (0 == r) {
        var t = b | 0;
        p[t >> 2] = 1;
        var u = b + 4 | 0;
        p[u >> 2] = 0;
        var v = p[m + 3], A = p[n + 12], C = p[m + 2], B = p[n + 13], y = v * A - C * B + p[m], z = C * A + v * B + p[m + 1], F = p[k + 3], G = p[n], H = p[k + 2], E = p[n + 1], I = F * G - H * E + p[k], J = H * G + F * E + p[k + 1], L = y - I, M = z - J;
        if (1.4210854715202004e-14 < L * L + M * M) {
          var V = I - y, Q = J - z, T = b, Y = (N[0] = V, w[0]), R = (N[0] = Q, w[0]) | 0;
          l[T >> 2] = 0 | Y;
          l[T + 4 >> 2] = R;
          var P = Hh(V * V + Q * Q);
          if (1.1920928955078125e-7 > P) {
            var aa = V, W = Q;
          } else {
            var da = 1 / P, sa = V * da;
            p[t >> 2] = sa;
            var ta = Q * da;
            p[u >> 2] = ta;
            aa = sa;
            W = ta;
          }
        } else {
          aa = 1, W = 0;
        }
        var ja = .5 * (z + W * f + (J - W * h)), ua = b + 8 | 0, ha = (N[0] = .5 * (y + aa * f + (I - aa * h)), w[0]), wa = (N[0] = ja, w[0]) | 0;
        l[ua >> 2] = 0 | ha;
        l[ua + 4 >> 2] = wa;
      } else {
        if (1 == r) {
          var oa = e + 12 | 0, Aa = p[oa >> 2], Fa = p[n + 10], La = e + 8 | 0, xa = p[La >> 2], ca = p[n + 11], Z = Aa * Fa - xa * ca, la = xa * Fa + Aa * ca, ya = b, fa = (N[0] = Z, w[0]), $ = (N[0] = la, w[0]) | 0, eb = ya | 0;
          l[eb >> 2] = 0 | fa;
          var Sa = ya + 4 | 0;
          l[Sa >> 2] = $;
          var Da = p[oa >> 2], na = p[n + 12], ma = p[La >> 2], Ba = p[n + 13], za = Da * na - ma * Ba + p[m], Ha = ma * na + Da * Ba + p[m + 1];
          if (0 < (l[i] | 0)) {
            for (var jb = g + 12 | 0, Ia = g + 8 | 0, $a = g | 0, ba = g + 4 | 0, qa = b | 0, ka = b + 4 | 0, ia = 0, va = Z, Oa = la; ; ) {
              var Pa = p[jb >> 2], Ta = p[n + (5 * ia | 0)], Xa = p[Ia >> 2], ab = p[n + (5 * ia | 0) + 1], kb = Pa * Ta - Xa * ab + p[$a >> 2], mb = Xa * Ta + Pa * ab + p[ba >> 2], Qa = f - ((kb - za) * va + (mb - Ha) * Oa), Ma = .5 * (mb + Oa * Qa + (mb - Oa * h)), bb = (ia << 3) + b + 8 | 0, Va = (N[0] = .5 * (kb + va * Qa + (kb - va * h)), w[0]), Ja = (N[0] = Ma, w[0]) | 0, ga = bb | 0;
              l[ga >> 2] = 0 | Va;
              var cb = bb + 4 | 0;
              l[cb >> 2] = Ja;
              var gb = ia + 1 | 0;
              if ((gb | 0) >= (l[i] | 0)) {
                break a;
              }
              ia = gb;
              va = p[qa >> 2];
              Oa = p[ka >> 2];
            }
          }
        } else {
          if (2 == r) {
            var db = g + 12 | 0, Ya = p[db >> 2], Ka = p[n + 10], Ga = g + 8 | 0, fb = p[Ga >> 2], Ea = p[n + 11], Ua = Ya * Ka - fb * Ea, ob = fb * Ka + Ya * Ea, Na = b, Wa = (N[0] = Ua, w[0]), nb = (N[0] = ob, w[0]) | 0, eb = Na | 0;
            l[eb >> 2] = 0 | Wa;
            Sa = Na + 4 | 0;
            l[Sa >> 2] = nb;
            var pa = p[db >> 2], hb = p[n + 12], Ca = p[Ga >> 2], ib = p[n + 13], Za = pa * hb - Ca * ib + p[k], lb = Ca * hb + pa * ib + p[k + 1], qb = 0 < (l[i] | 0);
            b : do {
              if (qb) {
                for (var vb = e + 12 | 0, sb = e + 8 | 0, Ab = e | 0, Bb = e + 4 | 0, Gb = b | 0, Cb = b + 4 | 0, pb = 0, ub = Ua, Eb = ob; ; ) {
                  var Db = p[vb >> 2], wb = p[n + (5 * pb | 0)], Hb = p[sb >> 2], tb = p[n + (5 * pb | 0) + 1], xb = Db * wb - Hb * tb + p[Ab >> 2], Ib = Hb * wb + Db * tb + p[Bb >> 2], Jb = h - ((xb - Za) * ub + (Ib - lb) * Eb), Lb = .5 * (Ib - Eb * f + Ib + Eb * Jb), Xb = (pb << 3) + b + 8 | 0, Nb = (N[0] = .5 * (xb - ub * f + xb + ub * Jb), w[0]), Sb = (N[0] = Lb, w[0]) | 0, ga = Xb | 0;
                  l[ga >> 2] = 0 | Nb;
                  cb = Xb + 4 | 0;
                  l[cb >> 2] = Sb;
                  var Ob = pb + 1 | 0, Vb = p[Gb >> 2], Zb = p[Cb >> 2];
                  if ((Ob | 0) >= (l[i] | 0)) {
                    var dc = Vb, fc = Zb;
                    break b;
                  }
                  pb = Ob;
                  ub = Vb;
                  Eb = Zb;
                }
              } else {
                dc = Ua, fc = ob;
              }
            } while (0);
            var kc = (N[0] = -dc, w[0]), Fb = (N[0] = -fc, w[0]) | 0;
            l[Na >> 2] = 0 | kc;
            l[Na + 4 >> 2] = Fb;
          }
        }
      }
    }
  } while (0);
}

function xi(b, d, e) {
  var f = d >> 2, g = b >> 2, h, i = l[f + 1];
  if (0 == i) {
    l[g + 4] = d + 12 | 0, l[g + 5] = 1, p[g + 6] = p[f + 2];
  } else {
    if (2 == i) {
      l[g + 4] = d + 20 | 0, l[g + 5] = l[f + 37], p[g + 6] = p[f + 2];
    } else {
      if (3 == i) {
        i = d + 16 | 0;
        h = -1 < (e | 0) ? (l[i >> 2] | 0) > (e | 0) ? 6 : 5 : 5;
        5 == h && S(O.q | 0, 53, O.mb | 0, O.je | 0);
        d = d + 12 | 0;
        h = (e << 3) + l[d >> 2] | 0;
        var k = l[(h + 4 | 0) >> 2];
        l[b >> 2] = l[(h | 0) >> 2];
        l[b + 4 >> 2] = k;
        h = e + 1 | 0;
        e = b + 8 | 0;
        d = l[d >> 2];
        (h | 0) < (l[i >> 2] | 0) ? (d = (h << 3) + d | 0, i = l[d >> 2], d = l[d + 4 >> 2], l[(e | 0) >> 2] = i, l[(e + 4 | 0) >> 2] = d) : (i = l[d + 4 >> 2], l[e >> 2] = l[d >> 2], l[e + 4 >> 2] = i);
        l[g + 4] = b | 0;
        l[g + 5] = 2;
        p[g + 6] = p[f + 2];
      } else {
        1 == i ? (l[g + 4] = d + 12 | 0, l[g + 5] = 2, p[g + 6] = p[f + 2]) : S(O.q | 0, 81, O.mb | 0, O.k | 0);
      }
    }
  }
}

function mk(b, d, e) {
  var f, g, h, i, k, m, n, q, r, t, u, v, A, C, B, y, z, F = a;
  a += 168;
  var G, H = F + 16, E = F + 32, I = F + 144, J = F + 156;
  l[yk >> 2] = l[yk >> 2] + 1 | 0;
  var L = e | 0, M = e + 28 | 0;
  z = F >> 2;
  y = (e + 56 | 0) >> 2;
  l[z] = l[y];
  l[z + 1] = l[y + 1];
  l[z + 2] = l[y + 2];
  l[z + 3] = l[y + 3];
  B = H >> 2;
  C = (e + 72 | 0) >> 2;
  l[B] = l[C];
  l[B + 1] = l[C + 1];
  l[B + 2] = l[C + 2];
  l[B + 3] = l[C + 3];
  var V, Q, T, Y, R = E >> 2, P, aa = d + 4 | 0, W = Kd[aa >> 1];
  if (4 > (W & 65535)) {
    var da = W;
  } else {
    S(O.q | 0, 102, O.jd | 0, O.Kf | 0), da = j[aa >> 1];
  }
  var sa = da & 65535;
  Y = (E + 108 | 0) >> 2;
  l[Y] = sa;
  var ta = E | 0;
  T = ta >> 2;
  var ja = 0 == da << 16 >> 16;
  a : do {
    if (ja) {
      var ua = sa;
    } else {
      for (var ha = L + 20 | 0, wa = L + 16 | 0, oa = M + 20 | 0, Aa = M + 16 | 0, Fa = F + 12 | 0, La = F + 8 | 0, xa = F | 0, ca = F + 4 | 0, Z = H + 12 | 0, la = H + 8 | 0, ya = H | 0, fa = H + 4 | 0, $ = 0; ; ) {
        var eb = ta + 36 * $ | 0, Sa = Gd[d + ($ + 6) | 0] & 255;
        l[T + (9 * $ | 0) + 7] = Sa;
        var Da = Gd[d + ($ + 9) | 0] & 255, na = ta + 36 * $ + 32 | 0;
        l[na >> 2] = Da;
        if ((l[ha >> 2] | 0) > (Sa | 0)) {
          var ma = Da;
        } else {
          S(O.i | 0, 103, O.h | 0, O.j | 0), ma = l[na >> 2];
        }
        var Ba = (Sa << 3) + l[wa >> 2] | 0, za = l[Ba + 4 >> 2], Ha = (w[0] = l[Ba >> 2], N[0]), jb = (w[0] = za, N[0]);
        P = -1 < (ma | 0) ? (l[oa >> 2] | 0) > (ma | 0) ? 9 : 8 : 8;
        8 == P && S(O.i | 0, 103, O.h | 0, O.j | 0);
        var Ia = (ma << 3) + l[Aa >> 2] | 0, $a = Ia | 0;
        Q = $a >> 2;
        var ba = Ia + 4 | 0;
        V = ba >> 2;
        var qa = l[V], ka = (w[0] = l[Q], N[0]), ia = (w[0] = qa, N[0]), va = p[Fa >> 2], Oa = p[La >> 2], Pa = va * Ha - Oa * jb + p[xa >> 2], Ta = Oa * Ha + va * jb + p[ca >> 2], Xa = eb, ab = (N[0] = Pa, w[0]), kb = (N[0] = Ta, w[0]) | 0;
        l[Xa >> 2] = 0 | ab;
        l[Xa + 4 >> 2] = kb;
        var mb = p[Z >> 2], Qa = p[la >> 2], Ma = mb * ka - Qa * ia + p[ya >> 2], bb = Qa * ka + mb * ia + p[fa >> 2], Va = ta + 36 * $ + 8 | 0, Ja = (N[0] = Ma, w[0]), ga = (N[0] = bb, w[0]) | 0;
        l[Va >> 2] = 0 | Ja;
        l[Va + 4 >> 2] = ga;
        var cb = p[T + (9 * $ | 0) + 3] - p[T + (9 * $ | 0) + 1], gb = ta + 36 * $ + 16 | 0, db = (N[0] = Ma - Pa, w[0]), Ya = (N[0] = cb, w[0]) | 0;
        l[gb >> 2] = 0 | db;
        l[gb + 4 >> 2] = Ya;
        p[T + (9 * $ | 0) + 6] = 0;
        var Ka = $ + 1 | 0, Ga = l[Y];
        if ((Ka | 0) >= (Ga | 0)) {
          ua = Ga;
          break a;
        }
        $ = Ka;
      }
    }
  } while (0);
  var fb = 1 < (ua | 0);
  a : do {
    if (fb) {
      var Ea = p[d >> 2];
      if (0 == ua) {
        S(O.q | 0, 246, O.oa | 0, O.k | 0);
        var Ua = 0;
      } else {
        if (1 == ua) {
          Ua = 0;
        } else {
          if (2 == ua) {
            var ob = p[R + 4] - p[R + 13], Na = p[R + 5] - p[R + 14], Ua = Hh(ob * ob + Na * Na);
          } else {
            if (3 == ua) {
              var Wa = p[R + 4], nb = p[R + 5], Ua = (p[R + 13] - Wa) * (p[R + 23] - nb) - (p[R + 14] - nb) * (p[R + 22] - Wa);
            } else {
              S(O.q | 0, 259, O.oa | 0, O.k | 0), Ua = 0;
            }
          }
        }
      }
      var pa = Ua < .5 * Ea;
      do {
        if (!pa && !(2 * Ea < Ua | 1.1920928955078125e-7 > Ua)) {
          var hb = l[Y];
          P = 20;
          break a;
        }
      } while (0);
      l[Y] = 0;
      P = 21;
    } else {
      hb = ua, P = 20;
    }
  } while (0);
  20 == P && (P = 0 == (hb | 0) ? 21 : 26);
  if (21 == P) {
    l[R + 7] = 0;
    l[R + 8] = 0;
    0 < (l[L + 20 >> 2] | 0) || S(O.i | 0, 103, O.h | 0, O.j | 0);
    var Ca = l[L + 16 >> 2], $a = Ca | 0;
    Q = $a >> 2;
    ba = Ca + 4 | 0;
    V = ba >> 2;
    var ib = l[V], Za = (w[0] = l[Q], N[0]), lb = (w[0] = ib, N[0]);
    0 < (l[M + 20 >> 2] | 0) || S(O.i | 0, 103, O.h | 0, O.j | 0);
    var qb = l[M + 16 >> 2], $a = qb | 0;
    Q = $a >> 2;
    ba = qb + 4 | 0;
    V = ba >> 2;
    var vb = l[V], sb = (w[0] = l[Q], N[0]), Ab = (w[0] = vb, N[0]), Bb = p[F + 12 >> 2], Gb = p[F + 8 >> 2], Cb = Bb * Za - Gb * lb + p[F >> 2], pb = Gb * Za + Bb * lb + p[F + 4 >> 2], ub = (N[0] = Cb, w[0]), Eb = (N[0] = pb, w[0]) | 0;
    l[E >> 2] = 0 | ub;
    l[E + 4 >> 2] = Eb;
    var Db = p[H + 12 >> 2], wb = p[H + 8 >> 2], Hb = Db * sb - wb * Ab + p[H >> 2], tb = wb * sb + Db * Ab + p[H + 4 >> 2], xb = E + 8 | 0, Ib = (N[0] = Hb, w[0]), Jb = (N[0] = tb, w[0]) | 0;
    l[xb >> 2] = 0 | Ib;
    l[xb + 4 >> 2] = Jb;
    var Lb = tb - pb, Xb = E + 16 | 0, Nb = (N[0] = Hb - Cb, w[0]), Sb = (N[0] = Lb, w[0]) | 0;
    l[Xb >> 2] = 0 | Nb;
    l[Xb + 4 >> 2] = Sb;
    l[Y] = 1;
  }
  var Ob = E | 0;
  A = Ob >> 2;
  v = (E + 108 | 0) >> 2;
  var Vb = l[v];
  0 == Vb ? S(O.q | 0, 194, O.na | 0, O.k | 0) : 1 == Vb || 2 == Vb || 3 == Vb || S(O.q | 0, 207, O.na | 0, O.k | 0);
  var Zb = F + 12 | 0, dc = F + 8 | 0, fc = e + 16 | 0, kc = e + 20 | 0, Fb = F | 0, Wb = F + 4 | 0, vc = H + 12 | 0, $b = H + 8 | 0, Yb = e + 44 | 0, wc = e + 48 | 0, xc = H | 0, Hc = H + 4 | 0;
  u = (E + 16 | 0) >> 2;
  t = (E + 20 | 0) >> 2;
  r = (E + 52 | 0) >> 2;
  q = (E + 56 | 0) >> 2;
  var Bd = E + 16 | 0, rc = E + 52 | 0, Rc = E + 24 | 0, Ic = E + 60 | 0, ad = E + 36 | 0, pc = 0;
  a : for (;;) {
    if (20 <= (pc | 0)) {
      var Pb = pc;
      break;
    }
    var Rb = o[v], bd = 0 < (Rb | 0);
    b : do {
      if (bd) {
        for (var sc = 0; ; ) {
          l[I + (sc << 2) >> 2] = l[A + (9 * sc | 0) + 7];
          l[J + (sc << 2) >> 2] = l[A + (9 * sc | 0) + 8];
          var mc = sc + 1 | 0;
          if ((mc | 0) == (Rb | 0)) {
            break b;
          }
          sc = mc;
        }
      } else {
        G = 7;
      }
    } while (0);
    do {
      if (1 == Rb) {
        G = 18;
      } else {
        if (2 == Rb) {
          var yc = l[Bd + 4 >> 2], tc = (w[0] = l[Bd >> 2], N[0]), Jc = (w[0] = yc, N[0]), uc = l[rc + 4 >> 2], ec = (w[0] = l[rc >> 2], N[0]), Oc = (w[0] = uc, N[0]), Sc = ec - tc, lc = Oc - Jc, Kc = tc * Sc + Jc * lc, rd = -Kc;
          if (0 <= Kc) {
            p[Rc >> 2] = 1;
            l[v] = 1;
            var Cd = tc;
            G = 22;
            break;
          }
          var kd = ec * Sc + Oc * lc;
          if (0 < kd) {
            var sd = 1 / (kd - Kc);
            p[Rc >> 2] = kd * sd;
            p[Ic >> 2] = sd * rd;
            l[v] = 2;
            var Md = ec, Nd = tc;
            G = 23;
            break;
          }
          p[Ic >> 2] = 1;
          l[v] = 1;
          for (var Vc = ad >> 2, Fc = E >> 2, nc = Vc + 9; Vc < nc; Vc++, Fc++) {
            l[Fc] = l[Vc];
          }
        } else {
          if (3 == Rb) {
            var jc = E, gc = jc >> 2, Od = jc + 16 | 0, Ae = l[Od + 4 >> 2], cd = (w[0] = l[Od >> 2], N[0]), dd = (w[0] = Ae, N[0]), Bc = jc + 36 | 0, qc = jc + 52 | 0, zc = l[qc + 4 >> 2], td = (w[0] = l[qc >> 2], N[0]), Cc = (w[0] = zc, N[0]), gf = jc + 72 | 0, Wc = jc + 88 | 0, ld = l[Wc + 4 >> 2], Pd = (w[0] = l[Wc >> 2], N[0]), be = (w[0] = ld, N[0]), Qd = td - cd, Hd = Cc - dd, ed = cd * Qd + dd * Hd, Be = td * Qd + Cc * Hd, md = -ed, Pc = Pd - cd, je = be - dd, ce = cd * Pc + dd * je, ke = Pd * Pc + be * je, Cf = -ce, le = Pd - td, hf = be - Cc, Id = td * le + Cc * hf, Qc = Pd * le + be * hf, me = -Id, Rd = Qd * je - Hd * Pc, ve = Rd * (td * be - Cc * Pd), we = Rd * (Pd * dd - be * cd), Pe = Rd * (cd * Cc - dd * td);
            if (0 > ed | 0 > ce) {
              if (0 <= ed | 0 >= Be | 0 < Pe) {
                if (0 <= ce | 0 >= ke | 0 < we) {
                  if (0 < Be | 0 > Id) {
                    if (0 < ke | 0 < Qc) {
                      if (0 <= Id | 0 >= Qc | 0 < ve) {
                        var Ce = 1 / (ve + we + Pe);
                        p[gc + 6] = ve * Ce;
                        p[gc + 15] = we * Ce;
                        p[gc + 24] = Pe * Ce;
                        l[gc + 27] = 3;
                      } else {
                        var Tc = 1 / (Qc - Id);
                        p[gc + 15] = Qc * Tc;
                        p[gc + 24] = Tc * me;
                        l[gc + 27] = 2;
                        for (var hc = gf >> 2, ud = jc >> 2, Sd = hc + 9; hc < Sd; hc++, ud++) {
                          l[ud] = l[hc];
                        }
                      }
                    } else {
                      p[gc + 24] = 1;
                      l[gc + 27] = 1;
                      hc = gf >> 2;
                      ud = jc >> 2;
                      for (Sd = hc + 9; hc < Sd; hc++, ud++) {
                        l[ud] = l[hc];
                      }
                    }
                  } else {
                    p[gc + 15] = 1;
                    l[gc + 27] = 1;
                    hc = Bc >> 2;
                    ud = jc >> 2;
                    for (Sd = hc + 9; hc < Sd; hc++, ud++) {
                      l[ud] = l[hc];
                    }
                  }
                } else {
                  var Df = 1 / (ke - ce);
                  p[gc + 6] = ke * Df;
                  p[gc + 24] = Df * Cf;
                  l[gc + 27] = 2;
                  hc = gf >> 2;
                  ud = Bc >> 2;
                  for (Sd = hc + 9; hc < Sd; hc++, ud++) {
                    l[ud] = l[hc];
                  }
                }
              } else {
                var Qe = 1 / (Be - ed);
                p[gc + 6] = Be * Qe;
                p[gc + 15] = Qe * md;
                l[gc + 27] = 2;
              }
            } else {
              p[gc + 6] = 1, l[gc + 27] = 1;
            }
          } else {
            S(O.q | 0, 498, O.Lc | 0, O.k | 0);
          }
        }
        G = 15;
      }
    } while (0);
    do {
      if (15 == G) {
        var Dd = l[v];
        if (3 == Dd) {
          Pb = pc;
          break a;
        } else {
          if (0 == Dd) {
            S(O.q | 0, 194, O.na | 0, O.k | 0), G = 18;
          } else {
            if (1 == Dd || 2 == Dd) {
              var Jd = Dd;
              G = 19;
            } else {
              S(O.q | 0, 207, O.na | 0, O.k | 0), G = 18;
            }
          }
        }
      }
    } while (0);
    18 == G && (Jd = l[v], G = 19);
    if (19 == G) {
      if (1 == Jd) {
        Cd = p[u], G = 22;
      } else {
        if (2 == Jd) {
          Md = p[r], Nd = p[u], G = 23;
        } else {
          S(O.q | 0, 184, O.sd | 0, O.k | 0);
          var jf = zk, kf = l[jf + 4 >> 2], Xc = (w[0] = l[jf >> 2], N[0]), xe = (w[0] = kf, N[0]), vd = Xc, Td = xe;
          G = 27;
        }
      }
    }
    if (22 == G) {
      vd = -Cd, Td = -p[t];
    } else {
      if (23 == G) {
        var Ef = Md - Nd, Lc = p[t], ne = p[q] - Lc;
        0 < Ef * -Lc - ne * -Nd ? (vd = -1 * ne, Td = Ef) : (vd = ne, Td = -1 * Ef);
      }
    }
    if (1.4210854715202004e-14 > vd * vd + Td * Td) {
      Pb = pc;
      break;
    }
    var Yc = o[v], De = Ob + 36 * Yc | 0, de = -Td, Ee = p[Zb >> 2], Zc = p[dc >> 2], cg = Ee * -vd + Zc * de, oe = vd * Zc + Ee * de, Fe = l[fc >> 2];
    n = Fe >> 2;
    var wd = l[kc >> 2], pe = 1 < (wd | 0);
    do {
      if (pe) {
        for (var Ag = 0, Re = p[n] * cg + p[n + 1] * oe, lf = 1; ; ) {
          var dg = p[(lf << 3 >> 2) + n] * cg + p[((lf << 3) + 4 >> 2) + n] * oe, Bg = dg > Re, Ge = Bg ? lf : Ag, He = Bg ? dg : Re, eg = lf + 1 | 0;
          if ((eg | 0) == (wd | 0)) {
            break;
          }
          Ag = Ge;
          Re = He;
          lf = eg;
        }
        var Se = Ob + 36 * Yc + 28 | 0;
        l[Se >> 2] = Ge;
        var fg = De | 0;
        if (-1 < (Ge | 0)) {
          mf = Ge, ah = Se, gg = fg, G = 33;
        } else {
          var yi = Ge, $g = Se, zi = fg;
          G = 34;
        }
      } else {
        var Mh = Ob + 36 * Yc + 28 | 0, mf = l[Mh >> 2] = 0, ah = Mh, gg = De | 0;
        G = 33;
      }
    } while (0);
    if (33 == G) {
      if ((wd | 0) > (mf | 0)) {
        var Ff = mf, hg = ah, Gf = gg, Te = Fe;
        G = 35;
      } else {
        yi = mf, $g = ah, zi = gg, G = 34;
      }
    }
    34 == G && (S(O.i | 0, 103, O.h | 0, O.j | 0), Ff = yi, hg = $g, Gf = zi, Te = l[fc >> 2]);
    var Nh = p[Te + (Ff << 3) >> 2], Oh = p[Te + (Ff << 3) + 4 >> 2], bh = Zc * Nh + Ee * Oh + p[Wb >> 2], nf = De, Ph = (N[0] = Ee * Nh - Zc * Oh + p[Fb >> 2], w[0]), Qh = (N[0] = bh, w[0]) | 0, ch = nf | 0;
    l[ch >> 2] = 0 | Ph;
    var dh = nf + 4 | 0;
    l[dh >> 2] = Qh;
    var Cg = p[vc >> 2], of = p[$b >> 2], ig = Cg * vd + of * Td, Dg = vd * -of + Cg * Td, Eg = l[Yb >> 2];
    m = Eg >> 2;
    var Fg = l[wc >> 2], xd = 1 < (Fg | 0);
    do {
      if (xd) {
        for (var ee = 0, nd = p[m] * ig + p[m + 1] * Dg, Hf = 1; ; ) {
          var Ud = p[(Hf << 3 >> 2) + m] * ig + p[((Hf << 3) + 4 >> 2) + m] * Dg, Ed = Ud > nd, jg = Ed ? Hf : ee, Ai = Ed ? Ud : nd, kg = Hf + 1 | 0;
          if ((kg | 0) == (Fg | 0)) {
            break;
          }
          ee = jg;
          nd = Ai;
          Hf = kg;
        }
        var If = Ob + 36 * Yc + 32 | 0;
        l[If >> 2] = jg;
        var Vd = Ob + 36 * Yc + 8 | 0;
        if (-1 < (jg | 0)) {
          pf = jg, Jf = If, fh = Vd, G = 40;
        } else {
          var Mc = jg, eh = If, Bi = Vd;
          G = 41;
        }
      } else {
        var Rh = Ob + 36 * Yc + 32 | 0, pf = l[Rh >> 2] = 0, Jf = Rh, fh = Ob + 36 * Yc + 8 | 0;
        G = 40;
      }
    } while (0);
    if (40 == G) {
      if ((Fg | 0) > (pf | 0)) {
        var Kf = pf, gh = Jf, hh = fh, Gg = Eg;
        G = 42;
      } else {
        Mc = pf, eh = Jf, Bi = fh, G = 41;
      }
    }
    41 == G && (S(O.i | 0, 103, O.h | 0, O.j | 0), Kf = Mc, gh = eh, hh = Bi, Gg = l[Yb >> 2]);
    var fd = p[Gg + (Kf << 3) >> 2], Sh = p[Gg + (Kf << 3) + 4 >> 2], Th = Cg * fd - of * Sh + p[xc >> 2], ih = of * fd + Cg * Sh + p[Hc >> 2], qf = hh, Uh = (N[0] = Th, w[0]), Vh = (N[0] = ih, w[0]) | 0, ch = qf | 0;
    l[ch >> 2] = 0 | Uh;
    dh = qf + 4 | 0;
    l[dh >> 2] = Vh;
    var Ci = ih - p[Gf + 4 >> 2], ye = Ob + 36 * Yc + 16 | 0, rf = (N[0] = Th - p[Gf >> 2], w[0]), Ie = (N[0] = Ci, w[0]) | 0;
    l[ye >> 2] = 0 | rf;
    l[ye + 4 >> 2] = Ie;
    var Di = pc + 1 | 0;
    l[Ak >> 2] = l[Ak >> 2] + 1 | 0;
    for (var Hg = 0; (Hg | 0) < (Rb | 0); ) {
      if ((l[hg >> 2] | 0) == (l[I + (Hg << 2) >> 2] | 0) && (l[gh >> 2] | 0) == (l[J + (Hg << 2) >> 2] | 0)) {
        Pb = Di;
        break a;
      }
      Hg = Hg + 1 | 0;
    }
    l[v] = l[v] + 1 | 0;
    pc = Di;
  }
  var Wh = l[Bk >> 2];
  l[Bk >> 2] = (Wh | 0) > (Pb | 0) ? Wh : Pb;
  var Je = b + 8 | 0, Lf = b | 0, gd = E >> 2, Mf = l[gd + 27];
  if (0 == Mf) {
    S(O.q | 0, 217, O.xb | 0, O.k | 0);
  } else {
    if (1 == Mf) {
      var jh = l[E + 4 >> 2];
      l[Lf >> 2] = l[E >> 2];
      l[Lf + 4 >> 2] = jh;
      var kh = E + 8 | 0, lh = l[kh + 4 >> 2];
      l[Je >> 2] = l[kh >> 2];
      l[Je + 4 >> 2] = lh;
    } else {
      if (2 == Mf) {
        var mh = E + 24 | 0, Ei = p[mh >> 2], Nf = E + 60 | 0, nh = p[Nf >> 2], Ke = p[gd + 1] * Ei + p[gd + 10] * nh, Ig = (N[0] = p[gd] * Ei + p[gd + 9] * nh, w[0]), Fi = (N[0] = Ke, w[0]) | 0;
        l[Lf >> 2] = 0 | Ig;
        l[Lf + 4 >> 2] = Fi;
        var lg = p[mh >> 2], oh = p[Nf >> 2], Ue = p[gd + 3] * lg + p[gd + 12] * oh, Xh = (N[0] = p[gd + 2] * lg + p[gd + 11] * oh, w[0]), ph = (N[0] = Ue, w[0]) | 0;
        l[Je >> 2] = 0 | Xh;
        l[Je + 4 >> 2] = ph;
      } else {
        if (3 == Mf) {
          var qh = p[gd + 6], Yh = p[gd + 15], Of = p[gd + 24], rh = p[gd + 1] * qh + p[gd + 10] * Yh + p[gd + 19] * Of, Zh = (N[0] = p[gd] * qh + p[gd + 9] * Yh + p[gd + 18] * Of, w[0]), rj = (N[0] = rh, w[0]), sh = 0 | Zh, sf = rj | 0;
          l[Lf >> 2] = sh;
          l[Lf + 4 >> 2] = sf;
          l[Je >> 2] = sh;
          l[Je + 4 >> 2] = sf;
        } else {
          S(O.q | 0, 236, O.xb | 0, O.k | 0);
        }
      }
    }
  }
  k = (b | 0) >> 2;
  i = (Je | 0) >> 2;
  var $h = p[k] - p[i];
  h = (b + 4 | 0) >> 2;
  g = (b + 12 | 0) >> 2;
  var Gi = p[h] - p[g], mg = Hh($h * $h + Gi * Gi);
  f = (b + 16 | 0) >> 2;
  p[f] = mg;
  l[b + 20 >> 2] = Pb;
  var od = l[v];
  if (0 == od) {
    S(O.q | 0, 246, O.oa | 0, O.k | 0);
    var Wd = 0;
  } else {
    if (1 == od) {
      Wd = 0;
    } else {
      if (2 == od) {
        var tf = p[u] - p[r], ng = p[t] - p[q], Wd = Hh(tf * tf + ng * ng);
      } else {
        if (3 == od) {
          var Ve = p[u], og = p[t], Wd = (p[r] - Ve) * (p[E + 92 >> 2] - og) - (p[q] - og) * (p[E + 88 >> 2] - Ve);
        } else {
          S(O.q | 0, 259, O.oa | 0, O.k | 0), Wd = 0;
        }
      }
    }
  }
  p[d >> 2] = Wd;
  var pg = l[v];
  j[d + 4 >> 1] = pg & 65535;
  var sj = 0 < (pg | 0);
  a : do {
    if (sj) {
      for (var Le = 0; ; ) {
        c[d + (Le + 6) | 0] = l[A + (9 * Le | 0) + 7] & 255;
        c[d + (Le + 9) | 0] = l[A + (9 * Le | 0) + 8] & 255;
        var Hi = Le + 1 | 0;
        if ((Hi | 0) >= (pg | 0)) {
          break a;
        }
        Le = Hi;
      }
    }
  } while (0);
  if (0 != (c[e + 88 | 0] & 1) << 24 >> 24) {
    var ai = p[e + 24 >> 2], th = p[e + 52 >> 2], Xd = p[f], qg = ai + th;
    if (Xd > qg & 1.1920928955078125e-7 < Xd) {
      p[f] = Xd - qg;
      var We = p[i], Jg = p[k], Pf = We - Jg, Yd = p[g], Kg = p[h], Xe = Yd - Kg, bi = Hh(Pf * Pf + Xe * Xe);
      if (1.1920928955078125e-7 > bi) {
        var rg = Pf, Lg = Xe;
      } else {
        var uh = 1 / bi, rg = Pf * uh, Lg = Xe * uh;
      }
      var Ii = Lg * ai;
      p[k] = Jg + rg * ai;
      p[h] = Kg + Ii;
      var Mg = Lg * th;
      p[i] = We - rg * th;
      p[g] = Yd - Mg;
    } else {
      var Ng = .5 * (p[h] + p[g]), vh = (N[0] = .5 * (p[k] + p[i]), w[0]), qe = (N[0] = Ng, w[0]), ci = 0 | vh, wh = qe | 0;
      l[b >> 2] = ci;
      l[b + 4 >> 2] = wh;
      l[Je >> 2] = ci;
      l[Je + 4 >> 2] = wh;
      p[f] = 0;
    }
  }
  a = F;
}

function Xg(b) {
  var d, e, f, g;
  g = (b + 16 | 0) >> 2;
  var h = l[g];
  if (-1 == (h | 0)) {
    h = b + 8 | 0;
    f = h >> 2;
    d = (b + 12 | 0) >> 2;
    e = l[d];
    if ((l[f] | 0) == (e | 0)) {
      var i = e;
    } else {
      S(O.c | 0, 61, O.Rc | 0, O.Hd | 0), i = l[d];
    }
    b = b + 4 | 0;
    e = b >> 2;
    var k = l[e];
    l[d] = i << 1;
    i = Oe(72 * i | 0);
    l[e] = i;
    Zg(i, k, 36 * l[f] | 0);
    Fh(k);
    var i = l[f], k = l[d] - 1 | 0, m = (i | 0) < (k | 0);
    a : do {
      if (m) {
        for (var n = i; ; ) {
          var q = n + 1 | 0;
          l[(l[e] + 36 * n + 20 | 0) >> 2] = q;
          l[(l[e] + 36 * n + 32 | 0) >> 2] = -1;
          n = l[d] - 1 | 0;
          if ((q | 0) >= (n | 0)) {
            var r = n;
            break a;
          }
          n = q;
        }
      } else {
        r = k;
      }
    } while (0);
    l[(l[e] + 36 * r + 20 | 0) >> 2] = -1;
    l[(l[e] + 36 * (l[d] - 1) + 32 | 0) >> 2] = -1;
    r = l[f];
    l[g] = r;
    d = b >> 2;
  } else {
    r = h, d = (b + 4 | 0) >> 2, h = b + 8 | 0;
  }
  f = l[d] + 36 * r + 20 | 0;
  l[g] = l[f >> 2];
  l[f >> 2] = -1;
  l[(l[d] + 36 * r + 24 | 0) >> 2] = -1;
  l[(l[d] + 36 * r + 28 | 0) >> 2] = -1;
  l[(l[d] + 36 * r + 32 | 0) >> 2] = 0;
  l[(l[d] + 36 * r + 16 | 0) >> 2] = 0;
  l[h >> 2] = l[h >> 2] + 1 | 0;
  return r;
}

function Yg(b, d) {
  var e, f, g, h, i;
  h = b + 24 | 0;
  l[h >> 2] = l[h >> 2] + 1 | 0;
  i = (b | 0) >> 2;
  var k = l[i], m = -1 == (k | 0);
  a : do {
    if (m) {
      l[i] = d, l[(l[b + 4 >> 2] + 36 * d + 20 | 0) >> 2] = -1;
    } else {
      h = (b + 4 | 0) >> 2;
      g = l[h] >> 2;
      var n = p[g + (9 * d | 0)];
      e = p[g + (9 * d | 0) + 1];
      for (var q = p[g + (9 * d | 0) + 2], r = p[g + (9 * d | 0) + 3], t = k; ; ) {
        var u = l[g + (9 * t | 0) + 6];
        if (-1 == (u | 0)) {
          break;
        }
        var v = l[g + (9 * t | 0) + 7], A = p[g + (9 * t | 0) + 2], C = p[g + (9 * t | 0)], B = p[g + (9 * t | 0) + 3], y = p[g + (9 * t | 0) + 1], z = 2 * ((A > q ? A : q) - (C < n ? C : n) + ((B > r ? B : r) - (y < e ? y : e)));
        f = 2 * z;
        var A = 2 * (z - 2 * (A - C + (B - y))), C = p[g + (9 * u | 0)], B = n < C ? n : C, y = p[g + (9 * u | 0) + 1], z = e < y ? e : y, F = p[g + (9 * u | 0) + 2], G = q > F ? q : F, H = p[g + (9 * u | 0) + 3], E = r > H ? r : H, C = (-1 == (l[g + (9 * u | 0) + 6] | 0) ? 2 * (G - B + (E - z)) : 2 * (G - B + (E - z)) - 2 * (F - C + (H - y))) + A, B = p[g + (9 * v | 0)], y = n < B ? n : B, z = p[g + (9 * v | 0) + 1], F = e < z ? e : z, G = p[g + (9 * v | 0) + 2], H = q > G ? q : G, E = p[g + (9 * v | 0) + 3], I = r > E ? r : E, A = (-1 == (l[g + (9 * v | 0) + 6] | 0) ? 2 * (H - y + (I - F)) : 2 * (H - y + (I - F)) - 2 * (G - B + (E - z))) + A;
        if (f < C & f < A) {
          break;
        }
        t = C < A ? u : v;
      }
      g = l[g + (9 * t | 0) + 5];
      u = Xg(b);
      l[(l[h] + 36 * u + 20 | 0) >> 2] = g;
      l[(l[h] + 36 * u + 16 | 0) >> 2] = 0;
      v = l[h];
      f = v >> 2;
      A = p[f + (9 * t | 0)];
      C = p[f + (9 * t | 0) + 1];
      C = e < C ? e : C;
      e = v + 36 * u | 0;
      n = (N[0] = n < A ? n : A, w[0]);
      A = (N[0] = C, w[0]) | 0;
      l[(e | 0) >> 2] = 0 | n;
      l[(e + 4 | 0) >> 2] = A;
      n = p[f + (9 * t | 0) + 2];
      e = p[f + (9 * t | 0) + 3];
      r = r > e ? r : e;
      e = v + 36 * u + 8 | 0;
      q = (N[0] = q > n ? q : n, w[0]);
      r = (N[0] = r, w[0]) | 0;
      l[(e | 0) >> 2] = 0 | q;
      l[(e + 4 | 0) >> 2] = r;
      q = l[h];
      l[(q + 36 * u + 32 | 0) >> 2] = l[(q + 32 >> 2) + (9 * t | 0)] + 1 | 0;
      q = l[h];
      -1 == (g | 0) ? (l[(q + 36 * u + 24 | 0) >> 2] = t, l[(l[h] + 36 * u + 28 | 0) >> 2] = d, l[(l[h] + 36 * t + 20 | 0) >> 2] = u, l[(l[h] + 36 * d + 20 | 0) >> 2] = u, l[i] = u) : (r = q + 36 * g + 24 | 0, (l[r >> 2] | 0) == (t | 0) ? l[r >> 2] = u : l[(q + 36 * g + 28 | 0) >> 2] = u, l[(l[h] + 36 * u + 24 | 0) >> 2] = t, l[(l[h] + 36 * u + 28 | 0) >> 2] = d, l[(l[h] + 36 * t + 20 | 0) >> 2] = u, l[(l[h] + 36 * d + 20 | 0) >> 2] = u);
      t = l[(l[h] + 20 >> 2) + (9 * d | 0)];
      if (-1 != (t | 0)) {
        for (;;) {
          if (t = Ck(b, t), r = l[h], q = l[(r + 24 >> 2) + (9 * t | 0)], r = l[(r + 28 >> 2) + (9 * t | 0)], -1 == (q | 0) && S(O.c | 0, 307, O.hb | 0, O.Tf | 0), -1 == (r | 0) && S(O.c | 0, 308, O.hb | 0, O.Yf | 0), n = l[h], e = l[(n + 32 >> 2) + (9 * q | 0)], g = l[(n + 32 >> 2) + (9 * r | 0)], l[(n + 36 * t + 32 | 0) >> 2] = ((e | 0) > (g | 0) ? e : g) + 1 | 0, n = l[h], e = n >> 2, g = p[e + (9 * q | 0)], u = p[e + (9 * r | 0)], v = p[e + (9 * q | 0) + 1], f = p[e + (9 * r | 0) + 1], f = v < f ? v : f, v = n + 36 * t | 0, g = (N[0] = g < u ? g : u, w[0]), u = (N[0] = f, w[0]) | 0, l[(v | 0) >> 2] = 0 | g, l[(v + 4 | 0) >> 2] = u, g = p[e + (9 * q | 0) + 2], u = p[e + (9 * r | 0) + 2], q = p[e + (9 * q | 0) + 3], r = p[e + (9 * r | 0) + 3], q = q > r ? q : r, r = n + 36 * t + 8 | 0, n = (N[0] = g > u ? g : u, w[0]), q = (N[0] = q, w[0]) | 0, l[(r | 0) >> 2] = 0 | n, l[(r + 4 | 0) >> 2] = q, t = l[(l[h] + 20 >> 2) + (9 * t | 0)], -1 == (t | 0)) {
            break a;
          }
        }
      }
    }
  } while (0);
}

function rl(b, d) {
  var e, f, g = -1 < (d | 0);
  e = g ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2;
  2 == e && S(O.c | 0, 126, O.ib | 0, O.n | 0);
  f = (b + 4 | 0) >> 2;
  -1 != (l[(l[f] + 24 >> 2) + (9 * d | 0)] | 0) && S(O.c | 0, 127, O.ib | 0, O.Rb | 0);
  Jl(b, d);
  e = g ? (l[b + 12 >> 2] | 0) > (d | 0) ? 8 : 7 : 7;
  7 == e && S(O.c | 0, 97, O.G | 0, O.Y | 0);
  e = (b + 8 | 0) >> 2;
  0 < (l[e] | 0) || S(O.c | 0, 98, O.G | 0, O.Ba | 0);
  g = b + 16 | 0;
  l[(l[f] + 36 * d + 20 | 0) >> 2] = l[g >> 2];
  l[(l[f] + 36 * d + 32 | 0) >> 2] = -1;
  l[g >> 2] = d;
  l[e] = l[e] - 1 | 0;
}

function Jl(b, d) {
  var e, f, g, h, i, k;
  k = (b | 0) >> 2;
  var m = (l[k] | 0) == (d | 0);
  a : do {
    if (m) {
      l[k] = -1;
    } else {
      i = (b + 4 | 0) >> 2;
      f = l[i];
      h = f >> 2;
      var n = l[h + (9 * d | 0) + 5];
      g = l[h + (9 * n | 0) + 5];
      e = l[h + (9 * n | 0) + 6];
      h = (e | 0) == (d | 0) ? l[h + (9 * n | 0) + 7] : e;
      if (-1 == (g | 0)) {
        l[k] = h, l[(f + 36 * h + 20 | 0) >> 2] = -1, f = -1 < (n | 0) ? (l[b + 12 >> 2] | 0) > (n | 0) ? 18 : 17 : 17, 17 == f && S(O.c | 0, 97, O.G | 0, O.Y | 0), g = (b + 8 | 0) >> 2, 0 < (l[g] | 0) || S(O.c | 0, 98, O.G | 0, O.Ba | 0), f = b + 16 | 0, l[(l[i] + 36 * n + 20 | 0) >> 2] = l[f >> 2], l[(l[i] + 36 * n + 32 | 0) >> 2] = -1, l[f >> 2] = n, l[g] = l[g] - 1 | 0;
      } else {
        e = f + 36 * g + 24 | 0;
        (l[e >> 2] | 0) == (n | 0) ? l[e >> 2] = h : l[(f + 36 * g + 28 | 0) >> 2] = h;
        l[(l[i] + 36 * h + 20 | 0) >> 2] = g;
        f = -1 < (n | 0) ? (l[b + 12 >> 2] | 0) > (n | 0) ? 11 : 10 : 10;
        10 == f && S(O.c | 0, 97, O.G | 0, O.Y | 0);
        f = (b + 8 | 0) >> 2;
        0 < (l[f] | 0) || S(O.c | 0, 98, O.G | 0, O.Ba | 0);
        h = b + 16 | 0;
        l[(l[i] + 36 * n + 20 | 0) >> 2] = l[h >> 2];
        l[(l[i] + 36 * n + 32 | 0) >> 2] = -1;
        l[h >> 2] = n;
        l[f] = l[f] - 1 | 0;
        for (n = g; ; ) {
          n = Ck(b, n);
          h = l[i];
          e = h >> 2;
          f = l[e + (9 * n | 0) + 6];
          g = l[e + (9 * n | 0) + 7];
          var q = p[e + (9 * f | 0)], r = p[e + (9 * g | 0)], t = p[e + (9 * f | 0) + 1], u = p[e + (9 * g | 0) + 1], u = t < u ? t : u, t = h + 36 * n | 0, q = (N[0] = q < r ? q : r, w[0]), r = (N[0] = u, w[0]) | 0;
          l[(t | 0) >> 2] = 0 | q;
          l[(t + 4 | 0) >> 2] = r;
          q = p[e + (9 * f | 0) + 2];
          r = p[e + (9 * g | 0) + 2];
          t = p[e + (9 * f | 0) + 3];
          e = p[e + (9 * g | 0) + 3];
          e = t > e ? t : e;
          h = h + 36 * n + 8 | 0;
          q = (N[0] = q > r ? q : r, w[0]);
          e = (N[0] = e, w[0]) | 0;
          l[(h | 0) >> 2] = 0 | q;
          l[(h + 4 | 0) >> 2] = e;
          h = l[i];
          f = l[(h + 32 >> 2) + (9 * f | 0)];
          g = l[(h + 32 >> 2) + (9 * g | 0)];
          l[(h + 36 * n + 32 | 0) >> 2] = ((f | 0) > (g | 0) ? f : g) + 1 | 0;
          n = l[(l[i] + 20 >> 2) + (9 * n | 0)];
          if (-1 == (n | 0)) {
            break a;
          }
        }
      }
    }
  } while (0);
}

function Kl(b, d, e, f) {
  var g, h;
  h = -1 < (d | 0) ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2;
  2 == h && S(O.c | 0, 135, O.jb | 0, O.n | 0);
  g = (b + 4 | 0) >> 2;
  var i = l[g];
  -1 != (l[(i + 24 >> 2) + (9 * d | 0)] | 0) && (S(O.c | 0, 137, O.jb | 0, O.Rb | 0), i = l[g]);
  h = i >> 2;
  i = e | 0;
  if (p[h + (9 * d | 0)] > p[i >> 2]) {
    var k = e + 4 | 0;
    h = 10;
  } else {
    var m = e + 4 | 0;
    if (p[h + (9 * d | 0) + 1] > p[m >> 2]) {
      k = m, h = 10;
    } else {
      if (p[e + 8 >> 2] > p[h + (9 * d | 0) + 2]) {
        k = m, h = 10;
      } else {
        if (p[e + 12 >> 2] > p[h + (9 * d | 0) + 3]) {
          k = m, h = 10;
        } else {
          var n = 0;
          h = 17;
        }
      }
    }
  }
  10 == h && (Jl(b, d), n = p[i >> 2] - .10000000149011612, k = p[k >> 2] - .10000000149011612, i = p[e + 8 >> 2] + .10000000149011612, e = p[e + 12 >> 2] + .10000000149011612, m = 2 * p[f >> 2], h = 2 * p[f + 4 >> 2], 0 > m ? (f = n + m, n = i) : (f = n, n = i + m), 0 > h ? k += h : e += h, g = l[g] >> 2, p[g + (9 * d | 0)] = f, p[g + (9 * d | 0) + 1] = k, p[g + (9 * d | 0) + 2] = n, p[g + (9 * d | 0) + 3] = e, Yg(b, d), n = 1);
  return n;
}

function Ck(b, d) {
  var e, f, g, h, i, k, m, n, q, r, t, u, v, A, C, B, y, z, F, G, H, E, I, J, L = b >> 2, M;
  -1 == (d | 0) && S(O.c | 0, 382, O.v | 0, O.ag | 0);
  J = (b + 4 | 0) >> 2;
  var V = l[J];
  I = V >> 2;
  var Q = V + 36 * d | 0;
  E = (V + 36 * d + 24 | 0) >> 2;
  var T = l[E];
  if (-1 == (T | 0)) {
    var Y = d;
  } else {
    if (H = (V + 36 * d + 32 | 0) >> 2, 2 > (l[H] | 0)) {
      Y = d;
    } else {
      G = (V + 36 * d + 28 | 0) >> 2;
      var R = l[G];
      M = -1 < (T | 0) ? (T | 0) < (l[L + 3] | 0) ? 7 : 6 : 6;
      6 == M && S(O.c | 0, 392, O.v | 0, O.gg | 0);
      M = -1 < (R | 0) ? (R | 0) < (l[L + 3] | 0) ? 10 : 9 : 9;
      9 == M && S(O.c | 0, 393, O.v | 0, O.vd | 0);
      var P = l[J];
      F = P >> 2;
      var aa = P + 36 * T | 0, W = P + 36 * R | 0;
      z = (P + 36 * R + 32 | 0) >> 2;
      y = (P + 36 * T + 32 | 0) >> 2;
      var da = l[z] - l[y] | 0;
      if (1 < (da | 0)) {
        var sa = P + 36 * R + 24 | 0, ta = l[sa >> 2];
        B = (P + 36 * R + 28 | 0) >> 2;
        var ja = l[B], ua = P + 36 * ta | 0, ha = P + 36 * ja | 0;
        M = -1 < (ta | 0) ? (ta | 0) < (l[L + 3] | 0) ? 14 : 13 : 13;
        13 == M && S(O.c | 0, 407, O.v | 0, O.Bd | 0);
        M = -1 < (ja | 0) ? (ja | 0) < (l[L + 3] | 0) ? 17 : 16 : 16;
        16 == M && S(O.c | 0, 408, O.v | 0, O.Kd | 0);
        l[sa >> 2] = d;
        var wa = V + 36 * d + 20 | 0, oa = l[wa >> 2];
        C = (P + 36 * R + 20 | 0) >> 2;
        l[C] = oa;
        l[wa >> 2] = R;
        var Aa = l[C];
        if (-1 == (Aa | 0)) {
          l[L] = R;
        } else {
          var Fa = l[J], La = Fa + 36 * Aa + 24 | 0;
          if ((l[La >> 2] | 0) == (d | 0)) {
            l[La >> 2] = R;
          } else {
            if ((l[(Fa + 28 >> 2) + (9 * Aa | 0)] | 0) == (d | 0)) {
              var xa = Aa, ca = Fa;
            } else {
              S(O.c | 0, 424, O.v | 0, O.Sd | 0), xa = l[C], ca = l[J];
            }
            l[(ca + 28 >> 2) + (9 * xa | 0)] = R;
          }
        }
        A = (P + 36 * ta + 32 | 0) >> 2;
        v = (P + 36 * ja + 32 | 0) >> 2;
        if ((l[A] | 0) > (l[v] | 0)) {
          l[B] = ta;
          l[G] = ja;
          l[(P + 36 * ja + 20 | 0) >> 2] = d;
          var Z = p[aa >> 2], la = p[ha >> 2], ya = Z < la ? Z : la, fa = p[F + (9 * T | 0) + 1], $ = p[F + (9 * ja | 0) + 1], eb = fa < $ ? fa : $, Sa = (N[0] = ya, w[0]), Da = (N[0] = eb, w[0]), na = 0 | Sa, ma = Da | 0, Ba = Q | 0;
          u = Ba >> 2;
          l[u] = na;
          var za = Q + 4 | 0;
          t = za >> 2;
          l[t] = ma;
          var Ha = p[F + (9 * T | 0) + 2], jb = p[F + (9 * ja | 0) + 2], Ia = p[F + (9 * T | 0) + 3], $a = p[F + (9 * ja | 0) + 3], ba = Ia > $a ? Ia : $a, qa = V + 36 * d + 8 | 0, ka = (N[0] = Ha > jb ? Ha : jb, w[0]), ia = (N[0] = ba, w[0]), va = 0 | ka, Oa = ia | 0, Pa = qa | 0;
          r = Pa >> 2;
          l[r] = va;
          var Ta = qa + 4 | 0;
          q = Ta >> 2;
          l[q] = Oa;
          var Xa = p[ua >> 2], ab = p[I + (9 * d | 0) + 1], kb = p[F + (9 * ta | 0) + 1], mb = ab < kb ? ab : kb, Qa = (N[0] = ya < Xa ? ya : Xa, w[0]), Ma = (N[0] = mb, w[0]), bb = 0 | Qa, Va = Ma | 0, Ja = W | 0;
          n = Ja >> 2;
          l[n] = bb;
          var ga = W + 4 | 0;
          m = ga >> 2;
          l[m] = Va;
          var cb = p[I + (9 * d | 0) + 2], gb = p[F + (9 * ta | 0) + 2], db = p[I + (9 * d | 0) + 3], Ya = p[F + (9 * ta | 0) + 3], Ka = db > Ya ? db : Ya, Ga = P + 36 * R + 8 | 0, fb = (N[0] = cb > gb ? cb : gb, w[0]), Ea = (N[0] = Ka, w[0]), Ua = 0 | fb, ob = Ea | 0, Na = Ga | 0;
          k = Na >> 2;
          l[k] = Ua;
          var Wa = Ga + 4 | 0;
          i = Wa >> 2;
          l[i] = ob;
          var nb = l[y], pa = l[v], hb = ((nb | 0) > (pa | 0) ? nb : pa) + 1 | 0;
          l[H] = hb;
          var Ca = l[A], ib = (hb | 0) > (Ca | 0) ? hb : Ca;
        } else {
          l[B] = ja;
          l[G] = ta;
          l[(P + 36 * ta + 20 | 0) >> 2] = d;
          var Za = p[aa >> 2], lb = p[ua >> 2], qb = Za < lb ? Za : lb, vb = p[F + (9 * T | 0) + 1], sb = p[F + (9 * ta | 0) + 1], Ab = vb < sb ? vb : sb, Bb = (N[0] = qb, w[0]), Gb = (N[0] = Ab, w[0]), Cb = 0 | Bb, pb = Gb | 0, Ba = Q | 0;
          u = Ba >> 2;
          l[u] = Cb;
          za = Q + 4 | 0;
          t = za >> 2;
          l[t] = pb;
          var ub = p[F + (9 * T | 0) + 2], Eb = p[F + (9 * ta | 0) + 2], Db = p[F + (9 * T | 0) + 3], wb = p[F + (9 * ta | 0) + 3], Hb = Db > wb ? Db : wb, tb = V + 36 * d + 8 | 0, xb = (N[0] = ub > Eb ? ub : Eb, w[0]), Ib = (N[0] = Hb, w[0]), Jb = 0 | xb, Lb = Ib | 0, Pa = tb | 0;
          r = Pa >> 2;
          l[r] = Jb;
          Ta = tb + 4 | 0;
          q = Ta >> 2;
          l[q] = Lb;
          var Xb = p[ha >> 2], Nb = p[I + (9 * d | 0) + 1], Sb = p[F + (9 * ja | 0) + 1], Ob = Nb < Sb ? Nb : Sb, Vb = (N[0] = qb < Xb ? qb : Xb, w[0]), Zb = (N[0] = Ob, w[0]), dc = 0 | Vb, fc = Zb | 0, Ja = W | 0;
          n = Ja >> 2;
          l[n] = dc;
          ga = W + 4 | 0;
          m = ga >> 2;
          l[m] = fc;
          var kc = p[I + (9 * d | 0) + 2], Fb = p[F + (9 * ja | 0) + 2], Wb = p[I + (9 * d | 0) + 3], vc = p[F + (9 * ja | 0) + 3], $b = Wb > vc ? Wb : vc, Yb = P + 36 * R + 8 | 0, wc = (N[0] = kc > Fb ? kc : Fb, w[0]), xc = (N[0] = $b, w[0]), Hc = 0 | wc, Bd = xc | 0, Na = Yb | 0;
          k = Na >> 2;
          l[k] = Hc;
          Wa = Yb + 4 | 0;
          i = Wa >> 2;
          l[i] = Bd;
          var rc = l[y], Rc = l[A], Ic = ((rc | 0) > (Rc | 0) ? rc : Rc) + 1 | 0;
          l[H] = Ic;
          var ad = l[v], ib = (Ic | 0) > (ad | 0) ? Ic : ad;
        }
        l[z] = ib + 1 | 0;
        Y = R;
      } else {
        if (-1 > (da | 0)) {
          var pc = P + 36 * T + 24 | 0, Pb = l[pc >> 2];
          h = (P + 36 * T + 28 | 0) >> 2;
          var Rb = l[h], bd = P + 36 * Pb | 0, sc = P + 36 * Rb | 0;
          M = -1 < (Pb | 0) ? (Pb | 0) < (l[L + 3] | 0) ? 32 : 31 : 31;
          31 == M && S(O.c | 0, 467, O.v | 0, O.Xd | 0);
          M = -1 < (Rb | 0) ? (Rb | 0) < (l[L + 3] | 0) ? 35 : 34 : 34;
          34 == M && S(O.c | 0, 468, O.v | 0, O.$d | 0);
          l[pc >> 2] = d;
          var mc = V + 36 * d + 20 | 0, yc = l[mc >> 2];
          g = (P + 36 * T + 20 | 0) >> 2;
          l[g] = yc;
          l[mc >> 2] = T;
          var tc = l[g];
          if (-1 == (tc | 0)) {
            l[L] = T;
          } else {
            var Jc = l[J], uc = Jc + 36 * tc + 24 | 0;
            if ((l[uc >> 2] | 0) == (d | 0)) {
              l[uc >> 2] = T;
            } else {
              if ((l[(Jc + 28 >> 2) + (9 * tc | 0)] | 0) == (d | 0)) {
                var ec = tc, Oc = Jc;
              } else {
                S(O.c | 0, 484, O.v | 0, O.fe | 0), ec = l[g], Oc = l[J];
              }
              l[(Oc + 28 >> 2) + (9 * ec | 0)] = T;
            }
          }
          f = (P + 36 * Pb + 32 | 0) >> 2;
          e = (P + 36 * Rb + 32 | 0) >> 2;
          if ((l[f] | 0) > (l[e] | 0)) {
            l[h] = Pb;
            l[E] = Rb;
            l[(P + 36 * Rb + 20 | 0) >> 2] = d;
            var Sc = p[W >> 2], lc = p[sc >> 2], Kc = Sc < lc ? Sc : lc, rd = p[F + (9 * R | 0) + 1], Cd = p[F + (9 * Rb | 0) + 1], kd = rd < Cd ? rd : Cd, sd = (N[0] = Kc, w[0]), Md = (N[0] = kd, w[0]), Nd = 0 | sd, Vc = Md | 0, Ba = Q | 0;
            u = Ba >> 2;
            l[u] = Nd;
            za = Q + 4 | 0;
            t = za >> 2;
            l[t] = Vc;
            var Fc = p[F + (9 * R | 0) + 2], nc = p[F + (9 * Rb | 0) + 2], jc = p[F + (9 * R | 0) + 3], gc = p[F + (9 * Rb | 0) + 3], Od = jc > gc ? jc : gc, Ae = V + 36 * d + 8 | 0, cd = (N[0] = Fc > nc ? Fc : nc, w[0]), dd = (N[0] = Od, w[0]), Bc = 0 | cd, qc = dd | 0, Pa = Ae | 0;
            r = Pa >> 2;
            l[r] = Bc;
            Ta = Ae + 4 | 0;
            q = Ta >> 2;
            l[q] = qc;
            var zc = p[bd >> 2], td = p[I + (9 * d | 0) + 1], Cc = p[F + (9 * Pb | 0) + 1], gf = td < Cc ? td : Cc, Wc = (N[0] = Kc < zc ? Kc : zc, w[0]), ld = (N[0] = gf, w[0]), Pd = 0 | Wc, be = ld | 0, Ja = aa | 0;
            n = Ja >> 2;
            l[n] = Pd;
            ga = aa + 4 | 0;
            m = ga >> 2;
            l[m] = be;
            var Qd = p[I + (9 * d | 0) + 2], Hd = p[F + (9 * Pb | 0) + 2], ed = p[I + (9 * d | 0) + 3], Be = p[F + (9 * Pb | 0) + 3], md = ed > Be ? ed : Be, Pc = P + 36 * T + 8 | 0, je = (N[0] = Qd > Hd ? Qd : Hd, w[0]), ce = (N[0] = md, w[0]), ke = 0 | je, Cf = ce | 0, Na = Pc | 0;
            k = Na >> 2;
            l[k] = ke;
            Wa = Pc + 4 | 0;
            i = Wa >> 2;
            l[i] = Cf;
            var le = l[z], hf = l[e], Id = ((le | 0) > (hf | 0) ? le : hf) + 1 | 0;
            l[H] = Id;
            var Qc = l[f], me = (Id | 0) > (Qc | 0) ? Id : Qc;
          } else {
            l[h] = Rb;
            l[E] = Pb;
            l[(P + 36 * Pb + 20 | 0) >> 2] = d;
            var Rd = p[W >> 2], ve = p[bd >> 2], we = Rd < ve ? Rd : ve, Pe = p[F + (9 * R | 0) + 1], Ce = p[F + (9 * Pb | 0) + 1], Tc = Pe < Ce ? Pe : Ce, hc = (N[0] = we, w[0]), ud = (N[0] = Tc, w[0]), Sd = 0 | hc, Df = ud | 0, Ba = Q | 0;
            u = Ba >> 2;
            l[u] = Sd;
            za = Q + 4 | 0;
            t = za >> 2;
            l[t] = Df;
            var Qe = p[F + (9 * R | 0) + 2], Dd = p[F + (9 * Pb | 0) + 2], Jd = p[F + (9 * R | 0) + 3], jf = p[F + (9 * Pb | 0) + 3], kf = Jd > jf ? Jd : jf, Xc = V + 36 * d + 8 | 0, xe = (N[0] = Qe > Dd ? Qe : Dd, w[0]), vd = (N[0] = kf, w[0]), Td = 0 | xe, Ef = vd | 0, Pa = Xc | 0;
            r = Pa >> 2;
            l[r] = Td;
            Ta = Xc + 4 | 0;
            q = Ta >> 2;
            l[q] = Ef;
            var Lc = p[sc >> 2], ne = p[I + (9 * d | 0) + 1], Yc = p[F + (9 * Rb | 0) + 1], De = ne < Yc ? ne : Yc, de = (N[0] = we < Lc ? we : Lc, w[0]), Ee = (N[0] = De, w[0]), Zc = 0 | de, cg = Ee | 0, Ja = aa | 0;
            n = Ja >> 2;
            l[n] = Zc;
            ga = aa + 4 | 0;
            m = ga >> 2;
            l[m] = cg;
            var oe = p[I + (9 * d | 0) + 2], Fe = p[F + (9 * Rb | 0) + 2], wd = p[I + (9 * d | 0) + 3], pe = p[F + (9 * Rb | 0) + 3], Ag = wd > pe ? wd : pe, Re = P + 36 * T + 8 | 0, lf = (N[0] = oe > Fe ? oe : Fe, w[0]), dg = (N[0] = Ag, w[0]), Bg = 0 | lf, Ge = dg | 0, Na = Re | 0;
            k = Na >> 2;
            l[k] = Bg;
            Wa = Re + 4 | 0;
            i = Wa >> 2;
            l[i] = Ge;
            var He = l[z], eg = l[f], Se = ((He | 0) > (eg | 0) ? He : eg) + 1 | 0;
            l[H] = Se;
            var fg = l[e], me = (Se | 0) > (fg | 0) ? Se : fg;
          }
          l[y] = me + 1 | 0;
          Y = T;
        } else {
          Y = d;
        }
      }
    }
  }
  return Y;
}

function Ll(b, d) {
  2 == (-1 < (d | 0) ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2) && S(O.c | 0, 563, O.nd | 0, O.Y | 0);
  var e = l[b + 4 >> 2], f = l[(e + 24 >> 2) + (9 * d | 0)];
  if (-1 == (f | 0)) {
    return 0;
  }
  f = Ll(b, f);
  e = Ll(b, l[(e + 28 >> 2) + (9 * d | 0)]);
  return ((f | 0) > (e | 0) ? f : e) + 1 | 0;
}

function Ml(b, d) {
  var e, f, g = b | 0;
  f = (b + 4 | 0) >> 2;
  for (var h = b + 12 | 0, i = d; -1 != (i | 0); ) {
    (l[g >> 2] | 0) == (i | 0) && -1 != (l[(l[f] + 20 >> 2) + (9 * i | 0)] | 0) && S(O.c | 0, 591, O.N | 0, O.me | 0);
    e = l[f] >> 2;
    var k = l[e + (9 * i | 0) + 6], m = l[e + (9 * i | 0) + 7];
    if (-1 == (k | 0)) {
      -1 != (m | 0) && S(O.c | 0, 602, O.N | 0, O.Fb | 0);
      if (0 == (l[e + (9 * i | 0) + 8] | 0)) {
        break;
      }
      S(O.c | 0, 603, O.N | 0, O.Hb | 0);
      break;
    }
    e = -1 < (k | 0) ? (k | 0) < (l[h >> 2] | 0) ? 13 : 12 : 12;
    12 == e && S(O.c | 0, 607, O.N | 0, O.Ib | 0);
    e = -1 < (m | 0) ? (m | 0) < (l[h >> 2] | 0) ? 16 : 15 : 15;
    15 == e && S(O.c | 0, 608, O.N | 0, O.Jb | 0);
    e = l[f];
    (l[(e + 20 >> 2) + (9 * k | 0)] | 0) != (i | 0) && (S(O.c | 0, 610, O.N | 0, O.Ee | 0), e = l[f]);
    (l[(e + 20 >> 2) + (9 * m | 0)] | 0) != (i | 0) && S(O.c | 0, 611, O.N | 0, O.Le | 0);
    Ml(b, k);
    i = m;
  }
}

function Nl(b, d) {
  var e, f, g, h;
  g = (b + 4 | 0) >> 2;
  for (var i = b + 12 | 0, k = d; -1 != (k | 0); ) {
    f = l[g] >> 2;
    var m = l[f + (9 * k | 0) + 6], n = l[f + (9 * k | 0) + 7];
    if (-1 == (m | 0)) {
      -1 != (n | 0) && S(O.c | 0, 632, O.M | 0, O.Fb | 0);
      if (0 == (l[f + (9 * k | 0) + 8] | 0)) {
        break;
      }
      S(O.c | 0, 633, O.M | 0, O.Hb | 0);
      break;
    }
    h = -1 < (m | 0) ? (m | 0) < (l[i >> 2] | 0) ? 10 : 9 : 9;
    9 == h && S(O.c | 0, 637, O.M | 0, O.Ib | 0);
    h = -1 < (n | 0) ? (n | 0) < (l[i >> 2] | 0) ? 13 : 12 : 12;
    12 == h && S(O.c | 0, 638, O.M | 0, O.Jb | 0);
    h = l[g];
    var q = l[(h + 32 >> 2) + (9 * m | 0)], r = l[(h + 32 >> 2) + (9 * n | 0)];
    if ((l[f + (9 * k | 0) + 8] | 0) != (((q | 0) > (r | 0) ? q : r) + 1 | 0)) {
      S(O.c | 0, 644, O.M | 0, O.Oe | 0), h = l[g];
    }
    e = h >> 2;
    h = p[e + (9 * m | 0)];
    var q = p[e + (9 * n | 0)], r = p[e + (9 * m | 0) + 1], t = p[e + (9 * n | 0) + 1], u = p[e + (9 * m | 0) + 2], v = p[e + (9 * n | 0) + 2], u = u > v ? u : v, v = p[e + (9 * m | 0) + 3];
    e = p[e + (9 * n | 0) + 3];
    e = v > e ? v : e;
    h = (h < q ? h : q) == p[f + (9 * k | 0)] ? (r < t ? r : t) == p[f + (9 * k | 0) + 1] ? 18 : 17 : 17;
    17 == h && S(O.c | 0, 649, O.M | 0, O.Se | 0);
    h = u == p[f + (9 * k | 0) + 2] ? e == p[f + (9 * k | 0) + 3] ? 21 : 20 : 20;
    20 == h && S(O.c | 0, 650, O.M | 0, O.We | 0);
    Nl(b, m);
    k = n;
  }
}

function Ol(b) {
  var d, e;
  d = (b | 0) >> 2;
  Ml(b, l[d]);
  Nl(b, l[d]);
  var f = l[b + 16 >> 2], g = -1 == (f | 0);
  a : do {
    if (g) {
      var h = 0;
    } else {
      for (var i = b + 12 | 0, k = b + 4 | 0, m = 0, n = f; ; ) {
        if (e = -1 < (n | 0) ? (n | 0) < (l[i >> 2] | 0) ? 5 : 4 : 4, 4 == e && S(O.c | 0, 665, O.La | 0, O.cf | 0), m = m + 1 | 0, n = l[(l[k >> 2] + 20 >> 2) + (9 * n | 0)], -1 == (n | 0)) {
          h = m;
          break a;
        }
      }
    }
  } while (0);
  f = l[d];
  d = -1 == (f | 0) ? 0 : l[(l[b + 4 >> 2] + 32 >> 2) + (9 * f | 0)];
  f = Ll(b, f);
  (d | 0) != (f | 0) && S(O.c | 0, 670, O.La | 0, O.df | 0);
  (l[b + 8 >> 2] + h | 0) != (l[b + 12 >> 2] | 0) && S(O.c | 0, 672, O.La | 0, O.ff | 0);
}

function Pl(b) {
  var d, e, f, g;
  g = (b + 8 | 0) >> 2;
  var h = Oe(l[g] << 2);
  f = h >> 2;
  var i = b + 12 | 0, k = l[i >> 2], m = 0 < (k | 0);
  a : do {
    if (m) {
      e = (b + 4 | 0) >> 2;
      var n = b + 16 | 0, q = 0;
      d = 0;
      for (var r = k; ; ) {
        var t = l[e];
        0 > (l[(t + 32 >> 2) + (9 * q | 0)] | 0) ? t = d : -1 == (l[(t + 24 >> 2) + (9 * q | 0)] | 0) ? (l[(t + 36 * q + 20 | 0) >> 2] = -1, l[((d << 2) + h | 0) >> 2] = q, t = d + 1 | 0) : ((r | 0) > (q | 0) || S(O.c | 0, 97, O.G | 0, O.Y | 0), 0 < (l[g] | 0) || S(O.c | 0, 98, O.G | 0, O.Ba | 0), l[(l[e] + 36 * q + 20 | 0) >> 2] = l[n >> 2], l[(l[e] + 36 * q + 32 | 0) >> 2] = -1, l[n >> 2] = q, l[g] = l[g] - 1 | 0, t = d);
        q = q + 1 | 0;
        r = l[i >> 2];
        if ((q | 0) >= (r | 0)) {
          break;
        }
        d = t;
      }
      if (1 < (t | 0)) {
        for (n = t; ; ) {
          q = l[e];
          d = q >> 2;
          for (var u = r = -1, v = 3.4028234663852886e+38, A = 0; ; ) {
            var C = l[(A << 2 >> 2) + f], B = p[d + (9 * C | 0)], y = p[d + (9 * C | 0) + 1], z = p[d + (9 * C | 0) + 2], C = p[d + (9 * C | 0) + 3], F = A + 1 | 0, G = (F | 0) < (n | 0);
            b : do {
              if (G) {
                for (var H = r, E = u, I = v, J = F; ; ) {
                  var L = l[(J << 2 >> 2) + f], M = p[d + (9 * L | 0)], V = p[d + (9 * L | 0) + 1], Q = p[d + (9 * L | 0) + 2], L = p[d + (9 * L | 0) + 3], M = 2 * ((z > Q ? z : Q) - (B < M ? B : M) + ((C > L ? C : L) - (y < V ? y : V))), H = (V = M < I) ? J : H, E = V ? A : E, I = V ? M : I, J = J + 1 | 0;
                  if ((J | 0) == (n | 0)) {
                    var T = H, Y = E, R = I;
                    break b;
                  }
                }
              } else {
                T = r, Y = u, R = v;
              }
            } while (0);
            if ((F | 0) == (n | 0)) {
              break;
            }
            r = T;
            u = Y;
            v = R;
            A = F;
          }
          r = (Y << 2) + h | 0;
          A = l[r >> 2];
          u = (T << 2) + h | 0;
          B = l[u >> 2];
          v = Xg(b);
          y = l[e];
          l[(y + 36 * v + 24 | 0) >> 2] = A;
          l[(y + 36 * v + 28 | 0) >> 2] = B;
          z = l[d + (9 * A | 0) + 8];
          C = l[d + (9 * B | 0) + 8];
          l[(y + 36 * v + 32 | 0) >> 2] = ((z | 0) > (C | 0) ? z : C) + 1 | 0;
          z = p[d + (9 * A | 0)];
          C = p[d + (9 * B | 0)];
          F = p[d + (9 * A | 0) + 1];
          G = p[d + (9 * B | 0) + 1];
          G = F < G ? F : G;
          F = y + 36 * v | 0;
          z = (N[0] = z < C ? z : C, w[0]);
          C = (N[0] = G, w[0]) | 0;
          l[(F | 0) >> 2] = 0 | z;
          l[(F + 4 | 0) >> 2] = C;
          z = p[d + (9 * A | 0) + 2];
          C = p[d + (9 * B | 0) + 2];
          F = p[d + (9 * A | 0) + 3];
          d = p[d + (9 * B | 0) + 3];
          F = F > d ? F : d;
          d = y + 36 * v + 8 | 0;
          z = (N[0] = z > C ? z : C, w[0]);
          C = (N[0] = F, w[0]) | 0;
          l[(d | 0) >> 2] = 0 | z;
          l[(d + 4 | 0) >> 2] = C;
          l[(y + 36 * v + 20 | 0) >> 2] = -1;
          l[(q + 36 * A + 20 | 0) >> 2] = v;
          l[(q + 36 * B + 20 | 0) >> 2] = v;
          n = n - 1 | 0;
          l[u >> 2] = l[(n << 2 >> 2) + f];
          l[r >> 2] = v;
          if (1 >= (n | 0)) {
            break a;
          }
        }
      }
    }
  } while (0);
  l[b >> 2] = l[f];
  Fh(h);
  Ol(b);
}

function Cm(b, d, e, f) {
  var g = b >> 2, h = 1 - f, i = p[g + 4] * h + p[g + 6] * f, k = p[g + 5] * h + p[g + 7] * f, m = h * p[g + 8] + p[g + 9] * f, n = Dm(m), m = Em(m), q = p[g + 2], r = p[g + 3], i = i - (m * q - n * r), k = k - (n * q + m * r), q = p[g + 13] * h + p[g + 15] * f, r = p[g + 14] * h + p[g + 16] * f, h = h * p[g + 17] + p[g + 18] * f, f = Dm(h), h = Em(h), t = p[g + 11], u = p[g + 12], q = q - (h * t - f * u), r = r - (f * t + h * u), t = l[g + 20];
  if (0 == t) {
    var t = b + 92 | 0, u = b + 96 | 0, v = l[g], b = -1 < (d | 0) ? (l[v + 20 >> 2] | 0) > (d | 0) ? 4 : 3 : 3;
    3 == b && S(O.i | 0, 103, O.h | 0, O.j | 0);
    d = (d << 3) + l[v + 16 >> 2] | 0;
    b = l[(d + 4 | 0) >> 2];
    d = (w[0] = l[(d | 0) >> 2], N[0]);
    v = (w[0] = b, N[0]);
    g = l[g + 1];
    b = -1 < (e | 0) ? (l[g + 20 >> 2] | 0) > (e | 0) ? 7 : 6 : 6;
    6 == b && S(O.i | 0, 103, O.h | 0, O.j | 0);
    e = (e << 3) + l[g + 16 >> 2] | 0;
    g = l[(e + 4 | 0) >> 2];
    e = (w[0] = l[(e | 0) >> 2], N[0]);
    g = (w[0] = g, N[0]);
    n = (h * e - f * g + q - (m * d - n * v + i)) * p[t >> 2] + (f * e + h * g + r - (n * d + m * v + k)) * p[u >> 2];
  } else {
    1 == t ? (b = p[g + 23], t = p[g + 24], d = m * b - n * t, t = n * b + m * t, b = p[g + 21], u = p[g + 22], i = m * b - n * u + i, n = n * b + m * u + k, m = l[g + 1], b = -1 < (e | 0) ? (l[m + 20 >> 2] | 0) > (e | 0) ? 11 : 10 : 10, 10 == b && S(O.i | 0, 103, O.h | 0, O.j | 0), k = (e << 3) + l[m + 16 >> 2] | 0, m = l[(k + 4 | 0) >> 2], k = (w[0] = l[(k | 0) >> 2], N[0]), m = (w[0] = m, N[0]), n = (h * k - f * m + q - i) * d + (f * k + h * m + r - n) * t) : 2 == t ? (b = p[g + 23], t = p[g + 24], e = h * b - f * t, t = f * b + h * t, b = p[g + 21], u = p[g + 22], q = h * b - f * u + q, f = f * b + h * u + r, h = l[g], b = -1 < (d | 0) ? (l[h + 20 >> 2] | 0) > (d | 0) ? 15 : 14 : 14, 14 == b && S(O.i | 0, 103, O.h | 0, O.j | 0), g = (d << 3) + l[h + 16 >> 2] | 0, h = l[(g + 4 | 0) >> 2], g = (w[0] = l[(g | 0) >> 2], N[0]), h = (w[0] = h, N[0]), n = (m * g - n * h + i - q) * e + (n * g + m * h + k - f) * t) : (S(O.Ca | 0, 242, O.rd | 0, O.k | 0), n = 0);
  }
  return n;
}

function Fm(b, d, e) {
  var f;
  2 == (-1 < (e | 0) ? (l[b + 16 >> 2] - 1 | 0) > (e | 0) ? 3 : 2 : 2) && S(O.F | 0, 89, O.ld | 0, O.Ff | 0);
  l[d + 4 >> 2] = 1;
  p[d + 8 >> 2] = p[b + 8 >> 2];
  f = (b + 12 | 0) >> 2;
  var g = (e << 3) + l[f] | 0, h = d + 12 | 0, i = l[g + 4 >> 2];
  l[h >> 2] = l[g >> 2];
  l[h + 4 >> 2] = i;
  g = (e + 1 << 3) + l[f] | 0;
  h = d + 20 | 0;
  i = l[g + 4 >> 2];
  l[h >> 2] = l[g >> 2];
  l[h + 4 >> 2] = i;
  g = d + 28 | 0;
  0 < (e | 0) ? (h = (e - 1 << 3) + l[f] | 0, i = l[(h + 4 | 0) >> 2], l[(g | 0) >> 2] = l[(h | 0) >> 2], l[(g + 4 | 0) >> 2] = i, c[d + 44 | 0] = 1) : (h = b + 20 | 0, i = l[(h + 4 | 0) >> 2], l[(g | 0) >> 2] = l[(h | 0) >> 2], l[(g + 4 | 0) >> 2] = i, c[d + 44 | 0] = c[b + 36 | 0] & 1);
  g = d + 36 | 0;
  (l[b + 16 >> 2] - 2 | 0) > (e | 0) ? (e = (e + 2 << 3) + l[f] | 0, b = l[(e | 0) >> 2], e = l[(e + 4 | 0) >> 2], l[(g | 0) >> 2] = b, l[(g + 4 | 0) >> 2] = e, c[d + 45 | 0] = 1) : (f = b + 28 | 0, e = l[(f | 0) >> 2], f = l[(f + 4 | 0) >> 2], l[(g | 0) >> 2] = e, l[(g + 4 | 0) >> 2] = f, c[d + 45 | 0] = c[b + 37 | 0] & 1);
}

function Xm(b, d, e, f) {
  var e = e >> 2, g = p[f >> 2], h = p[e] - g, i = p[f + 4 >> 2], k = p[e + 1] - i, m = p[f + 12 >> 2], n = p[f + 8 >> 2], f = m * h + n * k, q = -n, h = h * q + m * k, g = p[e + 2] - g, k = p[e + 3] - i, i = m * g + n * k - f, m = g * q + m * k - h, q = b + 12 | 0, n = l[q + 4 >> 2], q = (w[0] = l[q >> 2], N[0]), n = (w[0] = n, N[0]), g = b + 20 | 0, b = l[g + 4 >> 2], g = (w[0] = l[g >> 2], N[0]), k = (w[0] = b, N[0]), b = g - q, g = k - n, r = -b, t = g * g, u = b * b, k = Hh(t + u);
  if (1.1920928955078125e-7 > k) {
    k = g;
  } else {
    var v = 1 / k, k = g * v, r = v * r;
  }
  var v = k * (q - f) + r * (n - h), A = k * i + r * m;
  0 == A ? d = 0 : (A = v / A, 0 > A ? d = 0 : p[e + 4] < A ? d = 0 : (e = u + t, 0 == e ? d = 0 : (e = ((f + i * A - q) * b + (h + m * A - n) * g) / e, 0 > e | 1 < e ? d = 0 : (p[d + 8 >> 2] = A, 0 < v ? (e = (N[0] = -k, w[0]), f = (N[0] = -r, w[0]) | 0) : (e = (N[0] = k, w[0]), f = (N[0] = r, w[0]) | 0), l[d >> 2] = 0 | e, l[d + 4 >> 2] = f, d = 1))));
  return d;
}

function Ym(b, d, e, f, g) {
  var h = b >> 2, i = b + 148 | 0;
  l[i >> 2] = 4;
  var k = -d, m = -e;
  p[h + 5] = k;
  p[h + 6] = m;
  p[h + 7] = d;
  p[h + 8] = m;
  p[h + 9] = d;
  p[h + 10] = e;
  p[h + 11] = k;
  p[h + 12] = e;
  p[h + 21] = 0;
  p[h + 22] = -1;
  p[h + 23] = 1;
  p[h + 24] = 0;
  p[h + 25] = 0;
  p[h + 26] = 1;
  p[h + 27] = -1;
  p[h + 28] = 0;
  d = f >> 2;
  e = b + 12 | 0;
  f = l[d + 1];
  l[e >> 2] = l[d];
  l[e + 4 >> 2] = f;
  for (var e = l[d + 1], d = (w[0] = l[d], N[0]), e = (w[0] = e, N[0]), f = Dm(g), g = Em(g), k = 0, n = m, m = -1; ; ) {
    var q = (k << 3) + b + 20 | 0, r = p[q >> 2], t = f * r + g * n + e, n = (N[0] = g * r - f * n + d, w[0]), t = (N[0] = t, w[0]) | 0;
    l[q >> 2] = 0 | n;
    l[q + 4 >> 2] = t;
    t = (k << 3) + b + 84 | 0;
    q = p[t >> 2];
    n = f * q + g * m;
    m = (N[0] = g * q - f * m, w[0]);
    n = (N[0] = n, w[0]) | 0;
    l[t >> 2] = 0 | m;
    l[t + 4 >> 2] = n;
    k = k + 1 | 0;
    if ((k | 0) >= (l[i >> 2] | 0)) {
      break;
    }
    n = p[((k << 3) + 24 >> 2) + h];
    m = p[((k << 3) + 88 >> 2) + h];
  }
}

function Zm(b, d, e) {
  var f, g;
  6 > (e - 3 | 0) >>> 0 || S(O.O | 0, 122, O.kb | 0, O.ce | 0);
  f = (b + 148 | 0) >> 2;
  l[f] = e;
  var h = 0 < (e | 0);
  do {
    if (h) {
      for (g = 0; ; ) {
        var i = (g << 3) + d | 0, k = (g << 3) + b + 20 | 0, m = l[i + 4 >> 2];
        l[k >> 2] = l[i >> 2];
        l[k + 4 >> 2] = m;
        g = g + 1 | 0;
        i = o[f];
        if ((g | 0) >= (i | 0)) {
          break;
        }
      }
      if (0 < (i | 0)) {
        k = i;
        for (m = 0; ; ) {
          g = m + 1 | 0;
          var n = (g | 0) < (k | 0) ? g : 0, q = p[b + (n << 3) + 20 >> 2] - p[b + (m << 3) + 20 >> 2], n = p[b + (n << 3) + 24 >> 2] - p[b + (m << 3) + 24 >> 2], r = n * n;
          1.4210854715202004e-14 < q * q + r || S(O.O | 0, 137, O.kb | 0, O.Re | 0);
          var k = (m << 3) + b + 84 | 0, t = -1 * q, q = k, u = (N[0] = n, w[0]), t = (N[0] = t, w[0]) | 0;
          l[q >> 2] = 0 | u;
          l[q + 4 >> 2] = t;
          m = (m << 3) + b + 88 | 0;
          q = p[m >> 2];
          r = Hh(r + q * q);
          1.1920928955078125e-7 > r || (r = 1 / r, p[k >> 2] = n * r, p[m >> 2] = q * r);
          n = o[f];
          if ((g | 0) >= (n | 0)) {
            break;
          }
          k = n;
          m = g;
        }
        g = b + 12 | 0;
        k = b + 20 | 0;
        if (2 < (n | 0)) {
          var v = n, A = g, C = k;
          g = 13;
        } else {
          var B = n, y = g, z = k;
          g = 12;
        }
      } else {
        var F = i;
        g = 10;
      }
    } else {
      F = e, g = 10;
    }
  } while (0);
  10 == g && (B = F, y = b + 12 | 0, z = b + 20 | 0, g = 12);
  if (12 == g) {
    if (S(O.O | 0, 76, O.eb | 0, O.Vb | 0), 0 < (B | 0)) {
      v = B, A = y, C = z, g = 13;
    } else {
      var G = 0, H = 0, E = 0, I = y;
      g = 18;
    }
  }
  do {
    if (13 == g) {
      for (e = d = h = f = 0; ; ) {
        var J = (h << 3) + b + 20 | 0, L = l[J + 4 >> 2], J = (w[0] = l[J >> 2], N[0]), M = (w[0] = L, N[0]), h = h + 1 | 0, B = (h | 0) < (v | 0) ? (h << 3) + b + 20 | 0 : C, L = l[B + 4 >> 2], B = (w[0] = l[B >> 2], N[0]), y = (w[0] = L, N[0]), z = .5 * (J * y - M * B), L = f + z;
        f = .3333333432674408 * z;
        J = d + (J + B) * f;
        M = e + (M + y) * f;
        if ((h | 0) == (v | 0)) {
          break;
        }
        f = L;
        d = J;
        e = M;
      }
      if (1.1920928955078125e-7 < L) {
        var V = M, Q = J, T = L, Y = A;
        g = 19;
      } else {
        G = M, H = J, E = L, I = A, g = 18;
      }
    }
  } while (0);
  18 == g && (S(O.O | 0, 115, O.eb | 0, O.Tb | 0), V = G, Q = H, T = E, Y = I);
  b = 1 / T;
  Q = (N[0] = Q * b, w[0]);
  V = (N[0] = V * b, w[0]) | 0;
  l[Y >> 2] = 0 | Q;
  l[Y + 4 >> 2] = V;
}

function $m(b, d, e) {
  var f = d >> 2, d = p[f + 4], g = p[f + 8], h = p[f + 5], i = p[f + 7], k = d * g - h * i, m = p[f + 6], n = p[f + 3], q = h * m - n * g, r = n * i - d * m, t = p[f], u = p[f + 1], f = p[f + 2], v = t * k + u * q + f * r, v = 0 != v ? 1 / v : v, A = p[e >> 2], C = p[e + 4 >> 2], e = p[e + 8 >> 2];
  p[b >> 2] = v * (A * k + C * q + e * r);
  p[b + 4 >> 2] = v * (t * (C * g - e * i) + u * (e * m - A * g) + f * (A * i - C * m));
  p[b + 8 >> 2] = v * (t * (d * e - h * C) + u * (h * A - n * e) + f * (n * C - d * A));
}

function an(b, d) {
  var e, f, g, h = 0 == (d | 0);
  a : do {
    if (h) {
      g = 0;
    } else {
      g = 0 < (d | 0);
      do {
        if (g) {
          if (640 >= (d | 0)) {
            break;
          }
          g = Oe(d);
          break a;
        }
        S(O.e | 0, 104, O.Fa | 0, O.Ua | 0);
      } while (0);
      g = Gd[bn + d | 0];
      var i = g & 255;
      14 > (g & 255) || S(O.e | 0, 112, O.Fa | 0, O.g | 0);
      g = ((i << 2) + b + 12 | 0) >> 2;
      f = o[g];
      if (0 == (f | 0)) {
        f = (b + 4 | 0) >> 2;
        var k = o[f], m = b + 8 | 0, n = l[m >> 2];
        e = (b | 0) >> 2;
        (k | 0) == (n | 0) ? (k = l[e], n = n + 128 | 0, l[m >> 2] = n, m = Oe(n << 3), l[e] = m, Zg(m, k, l[f] << 3), Ze((l[f] << 3) + l[e] | 0, 1024), Fh(k), m = l[f]) : m = k;
        n = l[e];
        k = Oe(16384);
        e = ((m << 3) + n + 4 | 0) >> 2;
        l[e] = k;
        i = l[cn + (i << 2) >> 2];
        l[((m << 3) + n | 0) >> 2] = i;
        m = 16384 / i | 0;
        16385 > (m * i | 0) ? n = k : (S(O.e | 0, 140, O.Fa | 0, O.Hf | 0), n = l[e]);
        m = m - 1 | 0;
        k = 0 < (m | 0);
        b : do {
          if (k) {
            for (var q = 0, r = n; ; ) {
              var t = q + 1 | 0;
              l[(r + q * i | 0) >> 2] = r + t * i | 0;
              r = l[e];
              if ((t | 0) == (m | 0)) {
                var u = r;
                break b;
              }
              q = t;
            }
          } else {
            u = n;
          }
        } while (0);
        l[(u + m * i | 0) >> 2] = 0;
        l[g] = l[l[e] >> 2];
        l[f] = l[f] + 1 | 0;
        g = l[e];
      } else {
        l[g] = l[f >> 2], g = f;
      }
    }
  } while (0);
  return g;
}

function U(b) {
  var d = a;
  a += 4;
  l[d >> 2] = arguments[U.length];
  var e = l[co >> 2], f = eo(b, l[d >> 2]), g = a;
  var h = D(f, "i8", Ne), f = 1 * f.length;
  0 != f && -1 == fo(e, h, f) && go[e] && (go[e].error = Ra);
  a = g;
  a = d;
}

function ho(b, d) {
  var e;
  e = (b + 102796 | 0) >> 2;
  var f = l[e];
  0 < (f | 0) || (S(O.m | 0, 63, O.nb | 0, O.If | 0), f = l[e]);
  f = f - 1 | 0;
  (l[(b + 102412 >> 2) + (3 * f | 0)] | 0) != (d | 0) && S(O.m | 0, 65, O.nb | 0, O.Pf | 0);
  if (0 == (c[b + 12 * f + 102420 | 0] & 1) << 24 >> 24) {
    var f = b + 12 * f + 102416 | 0, g = b + 102400 | 0;
    l[g >> 2] = l[g >> 2] - l[f >> 2] | 0;
  } else {
    Fh(d), f = b + 12 * f + 102416 | 0;
  }
  g = b + 102404 | 0;
  l[g >> 2] = l[g >> 2] - l[f >> 2] | 0;
  l[e] = l[e] - 1 | 0;
}

function No(b, d, e) {
  var f, g, h = d >> 2, i = b >> 2, k = b + 12 | 0, m = b + 64 | 0, n = d + 4 | 0, q = p[n >> 2];
  (!isNaN(q) && !isNaN(0)) & -Infinity < q & Infinity > q ? (q = p[h + 2], g = (!isNaN(q) && !isNaN(0)) & -Infinity < q & Infinity > q ? 3 : 2) : g = 2;
  2 == g && S(O.l | 0, 27, O.Q | 0, O.ne | 0);
  q = d + 16 | 0;
  g = p[q >> 2];
  (!isNaN(g) && !isNaN(0)) & -Infinity < g & Infinity > g ? (g = p[h + 5], g = (!isNaN(g) && !isNaN(0)) & -Infinity < g & Infinity > g ? 6 : 5) : g = 5;
  5 == g && S(O.l | 0, 28, O.Q | 0, O.Ze | 0);
  g = (d + 12 | 0) >> 2;
  var r = p[g];
  (!isNaN(r) && !isNaN(0)) & -Infinity < r & Infinity > r || S(O.l | 0, 29, O.Q | 0, O.wf | 0);
  var r = d + 24 | 0, t = p[r >> 2];
  (!isNaN(t) && !isNaN(0)) & -Infinity < t & Infinity > t || S(O.l | 0, 30, O.Q | 0, O.Jf | 0);
  var t = d + 32 | 0, u = p[t >> 2];
  0 > u | (!isNaN(u) && !isNaN(0)) & -Infinity < u & Infinity > u ^ 1 && S(O.l | 0, 31, O.Q | 0, O.Qf | 0);
  u = d + 28 | 0;
  f = p[u >> 2];
  0 > f | (!isNaN(f) && !isNaN(0)) & -Infinity < f & Infinity > f ^ 1 && S(O.l | 0, 32, O.Q | 0, O.Xf | 0);
  f = (b + 4 | 0) >> 1;
  j[f] = 0;
  var v = 0 == (c[d + 39 | 0] & 1) << 24 >> 24 ? 0 : j[f] = 8;
  0 != (c[d + 38 | 0] & 1) << 24 >> 24 && (v |= 16, j[f] = v);
  0 != (c[d + 36 | 0] & 1) << 24 >> 24 && (v |= 4, j[f] = v);
  0 != (c[d + 37 | 0] & 1) << 24 >> 24 && (v |= 2, j[f] = v);
  0 != (c[d + 40 | 0] & 1) << 24 >> 24 && (j[f] = v | 32);
  l[i + 22] = e;
  d = l[n >> 2];
  n = l[n + 4 >> 2];
  l[k >> 2] = d;
  l[k + 4 >> 2] = n;
  k = p[g];
  e = Dm(k);
  p[i + 5] = e;
  k = Em(k);
  p[i + 6] = k;
  p[i + 7] = 0;
  p[i + 8] = 0;
  k = b + 36 | 0;
  l[k >> 2] = d;
  l[k + 4 >> 2] = n;
  k = b + 44 | 0;
  l[k >> 2] = d;
  l[k + 4 >> 2] = n;
  p[i + 13] = p[g];
  p[i + 14] = p[g];
  p[i + 15] = 0;
  l[i + 27] = 0;
  l[i + 28] = 0;
  l[i + 23] = 0;
  l[i + 24] = 0;
  g = l[q + 4 >> 2];
  l[m >> 2] = l[q >> 2];
  l[m + 4 >> 2] = g;
  p[i + 18] = p[r >> 2];
  p[i + 33] = p[u >> 2];
  p[i + 34] = p[t >> 2];
  p[i + 35] = p[h + 12];
  p[i + 19] = 0;
  p[i + 20] = 0;
  p[i + 21] = 0;
  p[i + 36] = 0;
  m = l[h];
  l[i] = m;
  b = b + 116 | 0;
  2 == (m | 0) ? (p[b >> 2] = 1, p[i + 30] = 1) : (p[b >> 2] = 0, p[i + 30] = 0);
  p[i + 31] = 0;
  p[i + 32] = 0;
  l[i + 37] = l[h + 11];
  l[i + 25] = 0;
  l[i + 26] = 0;
}

function Po(b, d) {
  var e, f, g = b >> 2, h = a;
  a += 16;
  f = (b + 88 | 0) >> 2;
  var i = l[l[f] + 102868 >> 2];
  0 != (i & 2 | 0) && (S(O.l | 0, 115, O.$c | 0, O.U | 0), i = l[l[f] + 102868 >> 2]);
  i = 0 == (i & 2 | 0);
  a : do {
    if (i && (e = (b | 0) >> 2, (l[e] | 0) != (d | 0))) {
      l[e] = d;
      Qo(b);
      e = 0 == (l[e] | 0);
      b : do {
        if (e) {
          p[g + 16] = 0;
          p[g + 17] = 0;
          p[g + 18] = 0;
          var k = p[g + 14];
          p[g + 13] = k;
          var m = b + 44 | 0, n = b + 36 | 0, q = l[m >> 2], m = l[m + 4 >> 2];
          l[n >> 2] = q;
          l[n + 4 >> 2] = m;
          n = Dm(k);
          p[h + 8 >> 2] = n;
          var r = Em(k);
          p[h + 12 >> 2] = r;
          var t = p[g + 7], u = p[g + 8], k = r * t - n * u, n = n * t + r * u, q = (w[0] = q, N[0]) - k, n = (w[0] = m, N[0]) - n, m = h, q = (N[0] = q, w[0]), n = (N[0] = n, w[0]) | 0;
          l[m >> 2] = 0 | q;
          l[m + 4 >> 2] = n;
          q = l[f] + 102872 | 0;
          n = l[g + 25];
          if (0 != (n | 0)) {
            for (m = b + 12 | 0; ; ) {
              if (Ro(n, q, h, m), n = l[n + 4 >> 2], 0 == (n | 0)) {
                break b;
              }
            }
          }
        }
      } while (0);
      e = b + 4 | 0;
      q = j[e >> 1];
      0 == (q & 2) << 16 >> 16 && (j[e >> 1] = q | 2, p[g + 36] = 0);
      p[g + 19] = 0;
      p[g + 20] = 0;
      p[g + 21] = 0;
      e = l[g + 25];
      if (0 != (e | 0)) {
        for (;;) {
          var q = e, v = ra, r = ra, m = q + 8 | 0, n = l[m >> 2], k = 0 == (n | 0);
          b : do {
            if (!k) {
              r = l[n + 112 >> 2];
              if (0 == (r | 0)) {
                r = n;
              } else {
                for (; !(t = l[r + 4 >> 2], (l[t + 48 >> 2] | 0) == (q | 0) | (l[t + 52 >> 2] | 0) == (q | 0) && (t = t + 4 | 0, l[t >> 2] |= 8), r = l[r + 12 >> 2], 0 == (r | 0)); ) {}
                r = l[m >> 2];
              }
              v = l[r + 88 >> 2];
              if (0 != (v | 0) && (t = q + 28 | 0, 0 < (l[t >> 2] | 0))) {
                for (var u = q + 24 | 0, r = (v + 102912 | 0) >> 2, A = v + 102908 | 0, v = (v + 102904 | 0) >> 2, C = 0, B = l[r]; ; ) {
                  var y = l[(l[u >> 2] + 24 >> 2) + (7 * C | 0)], z = l[A >> 2];
                  (B | 0) == (z | 0) ? (B = l[v], l[A >> 2] = z << 1, z = Oe(z << 3), l[v] = z, Zg(z, B, l[r] << 2), Fh(B), z = l[r]) : z = B;
                  l[((z << 2) + l[v] | 0) >> 2] = y;
                  y = l[r] + 1 | 0;
                  l[r] = y;
                  C = C + 1 | 0;
                  if ((C | 0) >= (l[t >> 2] | 0)) {
                    break b;
                  }
                  B = y;
                }
              }
            }
          } while (0);
          e = l[e + 4 >> 2];
          if (0 == (e | 0)) {
            break a;
          }
        }
      }
    }
  } while (0);
  a = h;
}

function Qo(b) {
  var d, e, f, g, h = a;
  a += 16;
  var i;
  g = (b + 116 | 0) >> 2;
  p[g] = 0;
  f = (b + 120 | 0) >> 2;
  p[f] = 0;
  e = (b + 124 | 0) >> 2;
  p[e] = 0;
  var k = b + 128 | 0;
  p[k >> 2] = 0;
  var m = b + 28 | 0;
  p[m >> 2] = 0;
  p[b + 32 >> 2] = 0;
  i = l[b >> 2];
  if (0 == i || 1 == i) {
    var n = b + 12 | 0, q = b + 36 | 0;
    i = l[(n | 0) >> 2];
    n = l[(n + 4 | 0) >> 2];
    l[q >> 2] = i;
    l[q + 4 >> 2] = n;
    q = b + 44 | 0;
    l[q >> 2] = i;
    l[q + 4 >> 2] = n;
    p[b + 52 >> 2] = p[b + 56 >> 2];
    i = 18;
  } else {
    2 != i && S(O.l | 0, 284, O.pb | 0, O.Jd | 0), i = 3;
  }
  if (3 == i) {
    i = zk;
    q = l[i + 4 >> 2];
    i = (w[0] = l[i >> 2], N[0]);
    var q = (w[0] = q, N[0]), n = l[b + 100 >> 2], r = 0 == (n | 0);
    a : do {
      if (r) {
        var t = q, u = i;
      } else {
        var v = h | 0, A = h + 4 | 0, C = h + 8 | 0, B = h + 12 | 0, y = q, z = i;
        d = n;
        for (d >>= 2; ; ) {
          var F = p[d];
          if (0 != F) {
            var G = l[d + 3];
            K[l[l[G >> 2] + 28 >> 2]](G, h, F);
            F = p[v >> 2];
            p[g] += F;
            z += p[A >> 2] * F;
            y += p[C >> 2] * F;
            p[e] += p[B >> 2];
          }
          d = l[d + 1];
          if (0 == (d | 0)) {
            t = y;
            u = z;
            break a;
          }
          d >>= 2;
        }
      }
    } while (0);
    i = p[g];
    0 < i ? (g = 1 / i, p[f] = g, f = u * g, t *= g, u = i) : (p[g] = 1, p[f] = 1, f = u, u = 1);
    g = p[e];
    if (0 < g) {
      if (0 != (j[b + 4 >> 1] & 16) << 16 >> 16) {
        i = 16;
      } else {
        var H = g - u * (f * f + t * t);
        p[e] = H;
        0 < H || (S(O.l | 0, 319, O.pb | 0, O.Bb | 0), H = p[e]);
        H = 1 / H;
        i = 17;
      }
    } else {
      i = 16;
    }
    16 == i && (H = p[e] = 0);
    p[k >> 2] = H;
    H = b + 44 | 0;
    k = l[(H + 4 | 0) >> 2];
    e = (w[0] = l[(H | 0) >> 2], N[0]);
    k = (w[0] = k, N[0]);
    u = (N[0] = f, w[0]);
    g = (N[0] = t, w[0]) | 0;
    l[m >> 2] = 0 | u;
    l[m + 4 >> 2] = g;
    u = b + 36 | 0;
    g = p[b + 24 >> 2];
    i = p[b + 20 >> 2];
    m = g * f - i * t + p[b + 12 >> 2];
    t = i * f + g * t + p[b + 16 >> 2];
    g = (N[0] = m, w[0]);
    f = (N[0] = t, w[0]);
    g |= 0;
    f |= 0;
    l[H >> 2] = g;
    l[H + 4 >> 2] = f;
    l[u >> 2] = g;
    l[u + 4 >> 2] = f;
    H = p[b + 72 >> 2];
    f = b + 64 | 0;
    p[f >> 2] += (t - k) * -H;
    b = b + 68 | 0;
    p[b >> 2] += (m - e) * H;
  }
  a = h;
}

function So(b, d) {
  var e, f, g, h, i, k = d >> 2;
  i = (b + 88 | 0) >> 2;
  var m = l[i], n = l[m + 102868 >> 2];
  0 != (n & 2 | 0) && (S(O.l | 0, 153, O.Zc | 0, O.U | 0), m = n = l[i], n = l[n + 102868 >> 2]);
  if (0 == (n & 2 | 0)) {
    e = m | 0;
    m = an(e, 44);
    0 == (m | 0) ? m = 0 : (j[m + 32 >> 1] = 1, j[m + 34 >> 1] = -1, j[m + 36 >> 1] = 0, l[m + 40 >> 2] = 0, l[m + 8 >> 2] = 0, l[m + 4 >> 2] = 0, l[m + 24 >> 2] = 0, l[m + 28 >> 2] = 0, l[m + 12 >> 2] = 0, p[m >> 2] = 0);
    h = m >> 2;
    l[h + 10] = l[k + 1];
    p[h + 4] = p[k + 2];
    p[h + 5] = p[k + 3];
    n = m + 8 | 0;
    l[n >> 2] = b;
    var q = m + 4 | 0;
    l[q >> 2] = 0;
    g = (m + 32 | 0) >> 1;
    f = (d + 22 | 0) >> 1;
    j[g] = j[f];
    j[g + 1] = j[f + 1];
    j[g + 2] = j[f + 2];
    c[m + 38 | 0] = c[d + 20 | 0] & 1;
    f = l[k];
    f = K[l[l[f >> 2] + 8 >> 2]](f, e);
    l[h + 3] = f;
    f = K[l[l[f >> 2] + 12 >> 2]](f);
    g = an(e, 28 * f | 0);
    e = (m + 24 | 0) >> 2;
    l[e] = g;
    var r = 0 < (f | 0);
    a : do {
      if (r && (l[(g + 16 | 0) >> 2] = 0, l[(l[e] + 24 | 0) >> 2] = -1, 1 != (f | 0))) {
        for (var t = 1; ; ) {
          if (l[(l[e] + 28 * t + 16 | 0) >> 2] = 0, l[(l[e] + 28 * t + 24 | 0) >> 2] = -1, t = t + 1 | 0, (t | 0) == (f | 0)) {
            break a;
          }
        }
      }
    } while (0);
    l[h + 7] = 0;
    h = m | 0;
    p[h >> 2] = p[k + 4];
    0 != (j[b + 4 >> 1] & 32) << 16 >> 16 && To(m, l[i] + 102872 | 0, b + 12 | 0);
    k = b + 100 | 0;
    l[q >> 2] = l[k >> 2];
    l[k >> 2] = m;
    k = b + 104 | 0;
    l[k >> 2] = l[k >> 2] + 1 | 0;
    l[n >> 2] = b;
    0 < p[h >> 2] && Qo(b);
    i = l[i] + 102868 | 0;
    l[i >> 2] |= 1;
    i = m;
  } else {
    i = 0;
  }
  return i;
}

function Uo(b, d) {
  var e, f, g;
  g = (b + 88 | 0) >> 2;
  f = l[l[g] + 102868 >> 2];
  0 != (f & 2 | 0) && (S(O.l | 0, 201, O.la | 0, O.U | 0), f = l[l[g] + 102868 >> 2]);
  if (0 == (f & 2 | 0)) {
    var h = d + 8 | 0;
    (l[h >> 2] | 0) != (b | 0) && S(O.l | 0, 207, O.la | 0, O.fg | 0);
    f = (b + 104 | 0) >> 2;
    0 < (l[f] | 0) || S(O.l | 0, 210, O.la | 0, O.lg | 0);
    for (e = b + 100 | 0; ; ) {
      var i = l[e >> 2];
      if (0 == (i | 0)) {
        S(O.l | 0, 226, O.la | 0, O.Ad | 0);
        break;
      }
      if ((i | 0) == (d | 0)) {
        l[e >> 2] = l[d + 4 >> 2];
        break;
      }
      e = i + 4 | 0;
    }
    e = l[b + 112 >> 2];
    i = 0 == (e | 0);
    a : do {
      if (!i) {
        for (var k = e; ; ) {
          var m = l[k + 4 >> 2], k = l[k + 12 >> 2];
          (l[m + 48 >> 2] | 0) == (d | 0) | (l[m + 52 >> 2] | 0) == (d | 0) && Vo(l[g] + 102872 | 0, m);
          if (0 == (k | 0)) {
            break a;
          }
        }
      }
    } while (0);
    g = o[g];
    i = g | 0;
    if (0 != (j[b + 4 >> 1] & 32) << 16 >> 16) {
      e = (d + 28 | 0) >> 2;
      m = 0 < (l[e] | 0);
      a : do {
        if (m) {
          for (var k = d + 24 | 0, n = g + 102912 | 0, q = g + 102904 | 0, r = g + 102900 | 0, t = g + 102872 | 0, u = 0; ; ) {
            for (var v = l[k >> 2] + 28 * u + 24 | 0, A = l[v >> 2], C = l[n >> 2], B = 0; (B | 0) < (C | 0); ) {
              var y = (B << 2) + l[q >> 2] | 0;
              if ((l[y >> 2] | 0) == (A | 0)) {
                l[y >> 2] = -1;
                break;
              }
              B = B + 1 | 0;
            }
            l[r >> 2] = l[r >> 2] - 1 | 0;
            rl(t, A);
            l[v >> 2] = -1;
            u = u + 1 | 0;
            if ((u | 0) >= (l[e] | 0)) {
              break a;
            }
          }
        }
      } while (0);
      l[e] = 0;
    }
    Wo(d, i);
    l[h >> 2] = 0;
    l[d + 4 >> 2] = 0;
    h = Gd[bn + 44 | 0];
    e = h & 255;
    14 > (h & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
    h = (e << 2) + g + 12 | 0;
    l[d >> 2] = l[h >> 2];
    l[h >> 2] = d;
    l[f] = l[f] - 1 | 0;
    Qo(b);
  }
}

function Xo(b, d) {
  var e, f, g = b + 88 | 0;
  f = l[l[g >> 2] + 102868 >> 2];
  0 == (f & 2 | 0) ? g = f : (S(O.l | 0, 340, O.ob | 0, O.U | 0), g = l[l[g >> 2] + 102868 >> 2]);
  if (0 == (g & 2 | 0) && 2 == (l[b >> 2] | 0)) {
    var h = b + 120 | 0;
    p[h >> 2] = 0;
    f = (b + 124 | 0) >> 2;
    p[f] = 0;
    g = b + 128 | 0;
    p[g >> 2] = 0;
    e = p[d >> 2];
    e = 0 < e ? e : 1;
    p[b + 116 >> 2] = e;
    p[h >> 2] = 1 / e;
    h = p[d + 12 >> 2];
    if (0 < h && 0 == (j[b + 4 >> 1] & 16) << 16 >> 16) {
      var i = p[d + 4 >> 2], k = p[d + 8 >> 2];
      e = h - e * (i * i + k * k);
      p[f] = e;
      0 < e ? f = e : (S(O.l | 0, 366, O.ob | 0, O.Bb | 0), f = p[f]);
      p[g >> 2] = 1 / f;
    }
    i = b + 28 | 0;
    e = (b + 44 | 0) >> 2;
    f = l[e + 1];
    g = (w[0] = l[e], N[0]);
    f = (w[0] = f, N[0]);
    var h = d + 4 | 0, m = l[h >> 2], h = l[h + 4 >> 2];
    l[i >> 2] = m;
    l[i + 4 >> 2] = h;
    var i = b + 36 | 0, k = p[b + 24 >> 2], m = (w[0] = m, N[0]), n = p[b + 20 >> 2], q = (w[0] = h, N[0]), h = k * m - n * q + p[b + 12 >> 2], k = n * m + k * q + p[b + 16 >> 2], n = (N[0] = h, w[0]), m = (N[0] = k, w[0]), n = 0 | n, m = m | 0;
    l[e] = n;
    l[e + 1] = m;
    l[i >> 2] = n;
    l[i + 4 >> 2] = m;
    e = p[b + 72 >> 2];
    i = b + 64 | 0;
    p[i >> 2] += (k - f) * -e;
    f = b + 68 | 0;
    p[f >> 2] += (h - g) * e;
  }
}

function Yo(b, d, e) {
  var f, g = b >> 2;
  f = (b + 88 | 0) >> 2;
  var h = l[f], i = l[h + 102868 >> 2];
  0 != (i & 2 | 0) && (S(O.l | 0, 404, O.Yc | 0, O.U | 0), h = i = l[f], i = l[i + 102868 >> 2]);
  if (0 == (i & 2 | 0)) {
    var i = b + 12 | 0, k = Dm(e);
    p[g + 5] = k;
    var m = Em(e);
    p[g + 6] = m;
    var n = l[d >> 2], q = l[d + 4 >> 2];
    l[i >> 2] = n;
    l[i + 4 >> 2] = q;
    var d = b + 44 | 0, r = p[g + 7], t = p[g + 8], n = (w[0] = n, N[0]), q = (w[0] = q, N[0]), n = (N[0] = m * r - k * t + n, w[0]), m = (N[0] = k * r + m * t + q, w[0]), k = 0 | n, m = m | 0;
    l[d >> 2] = k;
    l[d + 4 >> 2] = m;
    p[g + 14] = e;
    b = b + 36 | 0;
    l[b >> 2] = k;
    l[b + 4 >> 2] = m;
    p[g + 13] = e;
    e = h + 102872 | 0;
    g = l[g + 25];
    if (0 == (g | 0)) {
      f = h;
    } else {
      for (; !(Ro(g, e, i, i), g = l[g + 4 >> 2], 0 == (g | 0)); ) {}
      f = l[f];
    }
    f = f + 102872 | 0;
    Zo(f, f);
  }
}

function $o(b, d) {
  var e, f, g;
  g = (b + 88 | 0) >> 2;
  0 != (l[l[g] + 102868 >> 2] & 2 | 0) && S(O.l | 0, 443, O.ad | 0, O.U | 0);
  f = (b + 4 | 0) >> 1;
  var h = j[f], i = 0 != (h & 32) << 16 >> 16 ^ d;
  a : do {
    if (i) {
      if (d) {
        j[f] = h | 32;
        var k = l[g] + 102872 | 0, m = l[b + 100 >> 2];
        if (0 != (m | 0)) {
          for (var n = b + 12 | 0; ; ) {
            if (To(m, k, n), m = l[m + 4 >> 2], 0 == (m | 0)) {
              break a;
            }
          }
        }
      } else {
        j[f] = h & -33;
        k = l[g];
        n = l[b + 100 >> 2];
        m = 0 == (n | 0);
        b : do {
          if (!m) {
            for (var q = k + 102912 | 0, r = k + 102904 | 0, t = k + 102900 | 0, u = k + 102872 | 0, v = n; ; ) {
              e = (v + 28 | 0) >> 2;
              var A = 0 < (l[e] | 0);
              c : do {
                if (A) {
                  for (var C = v + 24 | 0, B = 0; ; ) {
                    for (var y = l[C >> 2] + 28 * B + 24 | 0, z = l[y >> 2], F = l[q >> 2], G = 0; (G | 0) < (F | 0); ) {
                      var H = (G << 2) + l[r >> 2] | 0;
                      if ((l[H >> 2] | 0) == (z | 0)) {
                        l[H >> 2] = -1;
                        break;
                      }
                      G = G + 1 | 0;
                    }
                    l[t >> 2] = l[t >> 2] - 1 | 0;
                    rl(u, z);
                    l[y >> 2] = -1;
                    B = B + 1 | 0;
                    if ((B | 0) >= (l[e] | 0)) {
                      break c;
                    }
                  }
                }
              } while (0);
              l[e] = 0;
              e = l[v + 4 >> 2];
              if (0 == (e | 0)) {
                break b;
              }
              v = e;
            }
          }
        } while (0);
        k = b + 112 | 0;
        n = l[k >> 2];
        m = 0 == (n | 0);
        b : do {
          if (!m) {
            for (q = n; ; ) {
              r = l[q + 12 >> 2];
              Vo(l[g] + 102872 | 0, l[q + 4 >> 2]);
              if (0 == (r | 0)) {
                break b;
              }
              q = r;
            }
          }
        } while (0);
        l[k >> 2] = 0;
      }
    }
  } while (0);
}

function ap(b) {
  var d = b >> 2, e = a, f = b + 8 | 0, g = l[f >> 2];
  U(O.Pa | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.Zd | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  var h = l[d];
  U(O.ee | 0, (s = a, a += 4, l[s >> 2] = h, s));
  var h = p[d + 3], i = p[d + 4];
  U(O.ie | 0, (s = a, a += 16, te[0] = h, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = i, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  h = p[d + 14];
  U(O.oe | 0, (s = a, a += 8, te[0] = h, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  h = p[d + 16];
  i = p[d + 17];
  U(O.re | 0, (s = a, a += 16, te[0] = h, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = i, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  h = p[d + 18];
  U(O.te | 0, (s = a, a += 8, te[0] = h, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  h = p[d + 33];
  U(O.we | 0, (s = a, a += 8, te[0] = h, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  h = p[d + 34];
  U(O.Ae | 0, (s = a, a += 8, te[0] = h, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = (b + 4 | 0) >> 1;
  h = Kd[b] & 4;
  U(O.Be | 0, (s = a, a += 4, l[s >> 2] = h, s));
  h = Kd[b] & 2;
  U(O.Ge | 0, (s = a, a += 4, l[s >> 2] = h, s));
  h = Kd[b] & 16;
  U(O.Me | 0, (s = a, a += 4, l[s >> 2] = h, s));
  h = Kd[b] & 8;
  U(O.Pe | 0, (s = a, a += 4, l[s >> 2] = h, s));
  b = Kd[b] & 32;
  U(O.Te | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 35];
  U(O.Xe | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  f = l[f >> 2];
  U(O.af | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.Ya | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  d = l[d + 25];
  f = 0 == (d | 0);
  a : do {
    if (!f) {
      for (b = d; ; ) {
        U(O.gf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
        var k = b, h = g, m = ra, n = ra, i = a, q = ra;
        U(O.kf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
        n = p[k + 16 >> 2];
        U(O.zf | 0, (s = a, a += 8, te[0] = n, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
        n = p[k + 20 >> 2];
        U(O.Lf | 0, (s = a, a += 8, te[0] = n, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
        n = p[k >> 2];
        U(O.Rf | 0, (s = a, a += 8, te[0] = n, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
        n = c[k + 38 | 0] & 1;
        U(O.Zf | 0, (s = a, a += 4, l[s >> 2] = n, s));
        n = Kd[k + 32 >> 1] & 65535;
        U(O.bg | 0, (s = a, a += 4, l[s >> 2] = n, s));
        n = Kd[k + 34 >> 1] & 65535;
        U(O.hg | 0, (s = a, a += 4, l[s >> 2] = n, s));
        n = j[k + 36 >> 1] << 16 >> 16;
        U(O.wd | 0, (s = a, a += 4, l[s >> 2] = n, s));
        var k = o[k + 12 >> 2], n = k >> 2, r = l[n + 1];
        do {
          if (0 == r) {
            U(O.Cd | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)), q = p[n + 2], U(O.zb | 0, (s = a, a += 8, te[0] = q, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s)), q = p[n + 3], m = p[n + 4], U(O.Rd | 0, (s = a, a += 16, te[0] = q, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = m, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s)), q = 11;
          } else {
            if (1 == r) {
              q = k;
              U(O.Wd | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
              m = p[n + 2];
              U(O.zb | 0, (s = a, a += 8, te[0] = m, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
              var t = k + 28 | 0, m = p[t >> 2], t = p[t + 4 >> 2];
              U(O.ae | 0, (s = a, a += 16, te[0] = m, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = t, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
              m = p[n + 3];
              t = p[n + 4];
              U(O.ge | 0, (s = a, a += 16, te[0] = m, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = t, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
              t = k + 20 | 0;
              m = p[t >> 2];
              t = p[t + 4 >> 2];
              U(O.ke | 0, (s = a, a += 16, te[0] = m, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = t, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
              m = p[n + 9];
              t = p[n + 10];
              U(O.pe | 0, (s = a, a += 16, te[0] = m, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = t, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
              m = c[k + 44 | 0] & 1;
              U(O.se | 0, (s = a, a += 4, l[s >> 2] = m, s));
              q = c[q + 45 | 0] & 1;
              U(O.ue | 0, (s = a, a += 4, l[s >> 2] = q, s));
              q = 11;
            } else {
              if (2 == r) {
                U(O.xe | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
                U(O.Kb | 0, (s = a, a += 4, l[s >> 2] = 8, s));
                q = k + 148 | 0;
                m = o[q >> 2];
                t = 0 < (m | 0);
                b : do {
                  if (t) {
                    for (var u = k + 20 | 0, v = 0; ; ) {
                      var A = p[u + (v << 3) >> 2], C = p[u + (v << 3) + 4 >> 2];
                      U(O.Lb | 0, (s = a, a += 20, l[s >> 2] = v, te[0] = A, l[s + 4 >> 2] = w[0], l[s + 8 >> 2] = w[1], te[0] = C, l[s + 12 >> 2] = w[0], l[s + 16 >> 2] = w[1], s));
                      v = v + 1 | 0;
                      A = l[q >> 2];
                      if ((v | 0) >= (A | 0)) {
                        var B = A;
                        break b;
                      }
                    }
                  } else {
                    B = m;
                  }
                } while (0);
                U(O.Ne | 0, (s = a, a += 4, l[s >> 2] = B, s));
                q = 11;
              } else {
                if (3 == r) {
                  q = k;
                  U(O.Qe | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
                  m = (k + 16 | 0) >> 2;
                  t = l[m];
                  U(O.Kb | 0, (s = a, a += 4, l[s >> 2] = t, s));
                  t = l[m];
                  u = 0 < (t | 0);
                  b : do {
                    if (u) {
                      v = k + 12 | 0;
                      for (A = 0; ; ) {
                        var y = l[v >> 2], C = p[y + (A << 3) >> 2], y = p[y + (A << 3) + 4 >> 2];
                        U(O.Lb | 0, (s = a, a += 20, l[s >> 2] = A, te[0] = C, l[s + 4 >> 2] = w[0], l[s + 8 >> 2] = w[1], te[0] = y, l[s + 12 >> 2] = w[0], l[s + 16 >> 2] = w[1], s));
                        A = A + 1 | 0;
                        C = l[m];
                        if ((A | 0) >= (C | 0)) {
                          var z = C;
                          break b;
                        }
                      }
                    } else {
                      z = t;
                    }
                  } while (0);
                  U(O.Ue | 0, (s = a, a += 4, l[s >> 2] = z, s));
                  t = k + 20 | 0;
                  m = p[t >> 2];
                  t = p[t + 4 >> 2];
                  U(O.Ye | 0, (s = a, a += 16, te[0] = m, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = t, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
                  t = k + 28 | 0;
                  m = p[t >> 2];
                  t = p[t + 4 >> 2];
                  U(O.bf | 0, (s = a, a += 16, te[0] = m, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = t, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
                  m = c[k + 36 | 0] & 1;
                  U(O.ef | 0, (s = a, a += 4, l[s >> 2] = m, s));
                  q = c[q + 37 | 0] & 1;
                  U(O.hf | 0, (s = a, a += 4, l[s >> 2] = q, s));
                  q = 11;
                } else {
                  q = 12;
                }
              }
            }
          }
        } while (0);
        11 == q && (U(O.Ya | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)), U(O.mf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)), U(O.Ya | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)), U(O.qf | 0, (s = a, a += 4, l[s >> 2] = h, s)));
        a = i;
        U(O.jf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
        b = l[b + 4 >> 2];
        if (0 == (b | 0)) {
          break a;
        }
      }
    }
  } while (0);
  U(O.Qa | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  a = e;
}

function Vo(b, d) {
  var e, f;
  e = l[l[d + 48 >> 2] + 8 >> 2];
  var g = l[l[d + 52 >> 2] + 8 >> 2];
  f = l[b + 72 >> 2];
  if (0 != (f | 0) && 0 != (l[d + 4 >> 2] & 2 | 0)) {
    K[l[l[f >> 2] + 12 >> 2]](f, d);
  }
  var h = d + 8 | 0, i = l[h >> 2];
  f = (d + 12 | 0) >> 2;
  0 != (i | 0) && (l[(i + 12 | 0) >> 2] = l[f]);
  i = l[f];
  0 != (i | 0) && (l[(i + 8 | 0) >> 2] = l[h >> 2]);
  h = b + 60 | 0;
  (l[h >> 2] | 0) == (d | 0) && (l[h >> 2] = l[f]);
  h = d + 24 | 0;
  i = l[h >> 2];
  f = (d + 28 | 0) >> 2;
  0 != (i | 0) && (l[(i + 12 | 0) >> 2] = l[f]);
  i = l[f];
  0 != (i | 0) && (l[(i + 8 | 0) >> 2] = l[h >> 2]);
  e = e + 112 | 0;
  (d + 16 | 0) == (l[e >> 2] | 0) && (l[e >> 2] = l[f]);
  f = d + 40 | 0;
  h = l[f >> 2];
  e = (d + 44 | 0) >> 2;
  0 != (h | 0) && (l[(h + 12 | 0) >> 2] = l[e]);
  h = l[e];
  0 != (h | 0) && (l[(h + 8 | 0) >> 2] = l[f >> 2]);
  g = g + 112 | 0;
  (d + 32 | 0) == (l[g >> 2] | 0) && (l[g >> 2] = l[e]);
  g = l[b + 76 >> 2];
  0 == (c[bp] & 1) << 24 >> 24 && S(O.Z | 0, 103, O.Ja | 0, O.nf | 0);
  e = d + 48 | 0;
  if (0 < (l[d + 124 >> 2] | 0)) {
    f = l[l[e >> 2] + 8 >> 2];
    h = f + 4 | 0;
    i = j[h >> 1];
    0 == (i & 2) << 16 >> 16 && (j[h >> 1] = i | 2, p[f + 144 >> 2] = 0);
    f = d + 52 | 0;
    var h = l[l[f >> 2] + 8 >> 2], i = h + 4 | 0, k = j[i >> 1];
    0 == (k & 2) << 16 >> 16 && (j[i >> 1] = k | 2, p[h + 144 >> 2] = 0);
  } else {
    f = d + 52 | 0;
  }
  e = l[l[l[e >> 2] + 12 >> 2] + 4 >> 2];
  f = l[l[l[f >> 2] + 12 >> 2] + 4 >> 2];
  -1 < (e | 0) & 4 > (f | 0) || (S(O.Z | 0, 114, O.Ja | 0, O.Pb | 0), S(O.Z | 0, 115, O.Ja | 0, O.Pb | 0));
  K[l[(cp + 4 >> 2) + (12 * e | 0) + (3 * f | 0)]](d, g);
  g = b + 64 | 0;
  l[g >> 2] = l[g >> 2] - 1 | 0;
}

function dp(b) {
  var d, e, f, g, h, i = l[b + 60 >> 2], k = 0 == (i | 0);
  a : do {
    if (!k) {
      var m = b + 12 | 0, n = b + 4 | 0, q = b + 72 | 0, r = b + 68 | 0, t = i;
      for (g = t >> 2; ; ) {
        var u = l[g + 12];
        e = l[g + 13];
        var v = l[g + 14], A = l[g + 15], C = l[u + 8 >> 2], B = l[e + 8 >> 2];
        f = (t + 4 | 0) >> 2;
        var y = l[f], z = 0 == (y & 8 | 0);
        b : do {
          if (z) {
            h = 17;
          } else {
            var F = C;
            h = 2 == (l[B >> 2] | 0) ? 5 : 2 == (l[C >> 2] | 0) ? 5 : 10;
            c : do {
              if (5 == h) {
                for (h = B + 108 | 0; ; ) {
                  h = l[h >> 2];
                  if (0 == (h | 0)) {
                    break;
                  }
                  if ((l[h >> 2] | 0) == (F | 0) && 0 == (c[l[h + 4 >> 2] + 61 | 0] & 1) << 24 >> 24) {
                    break c;
                  }
                  h = h + 12 | 0;
                }
                h = l[r >> 2];
                if (0 != (h | 0)) {
                  if (!K[l[l[h >> 2] + 8 >> 2]](h, u, e)) {
                    f = l[g + 3];
                    Vo(b, t);
                    var G = f;
                    h = 11;
                    break b;
                  }
                  y = l[f];
                }
                l[f] = y & -9;
                h = 17;
                break b;
              }
            } while (0);
            G = l[g + 3];
            Vo(b, t);
            h = 11;
          }
        } while (0);
        17 == h && ((0 == (j[C + 4 >> 1] & 2) << 16 >> 16 ? 0 : 0 != (l[C >> 2] | 0)) | (0 == (j[B + 4 >> 1] & 2) << 16 >> 16 ? 0 : 0 != (l[B >> 2] | 0)) ? (u = l[(l[u + 24 >> 2] + 24 >> 2) + (7 * v | 0)], A = l[(l[e + 24 >> 2] + 24 >> 2) + (7 * A | 0)], h = -1 < (u | 0) ? (l[m >> 2] | 0) > (u | 0) ? 26 : 25 : 25, 25 == h && S(O.p | 0, 159, O.H | 0, O.n | 0), v = l[n >> 2], e = v >> 2, -1 < (A | 0) ? (l[m >> 2] | 0) > (A | 0) ? (d = v, d >>= 2, h = 29) : h = 28 : h = 28, 28 == h && (S(O.p | 0, 159, O.H | 0, O.n | 0), d = l[n >> 2], d >>= 2), 0 < p[d + (9 * A | 0)] - p[e + (9 * u | 0) + 2] | 0 < p[d + (9 * A | 0) + 1] - p[e + (9 * u | 0) + 3] | 0 < p[e + (9 * u | 0)] - p[d + (9 * A | 0) + 2] | 0 < p[e + (9 * u | 0) + 1] - p[d + (9 * A | 0) + 3] ? (g = l[g + 3], Vo(b, t), G = g) : (ep(t, l[q >> 2]), G = l[g + 3])) : G = l[g + 3]);
        if (0 == (G | 0)) {
          break a;
        }
        t = G;
        g = t >> 2;
      }
    }
  } while (0);
}

function Zo(b, d) {
  var e, f, g = a;
  a += 4;
  var h;
  f = (b + 52 | 0) >> 2;
  l[f] = 0;
  e = (b + 40 | 0) >> 2;
  h = l[e];
  if (0 < (h | 0)) {
    for (var i = b + 32 | 0, k = b + 56 | 0, m = b | 0, n = b + 12 | 0, q = b + 4 | 0, r = 0; ; ) {
      var t = l[l[i >> 2] + (r << 2) >> 2];
      l[k >> 2] = t;
      if (-1 != (t | 0)) {
        h = -1 < (t | 0) ? (l[n >> 2] | 0) > (t | 0) ? 6 : 5 : 5;
        5 == h && S(O.p | 0, 159, O.H | 0, O.n | 0);
        var u = m, v = b, A = l[q >> 2] + 36 * t | 0, C = ra, B = t = h = ra, y = ra, z = ra, F = ra, G = a;
        a += 1036;
        var H = G + 4 | 0, F = (G | 0) >> 2;
        l[F] = H;
        z = (G + 1028 | 0) >> 2;
        y = (G + 1032 | 0) >> 2;
        l[y] = 256;
        l[H >> 2] = l[u >> 2];
        l[z] = 1;
        var u = u + 4 | 0, E = A | 0, I = A + 4 | 0, J = A + 8 | 0, A = A + 12 | 0, B = (v + 56 | 0) >> 2, t = (v + 52 | 0) >> 2, L = v + 48 | 0;
        h = (v + 44 | 0) >> 2;
        for (var M = 1, v = H; ; ) {
          var V = M - 1 | 0;
          l[z] = V;
          var Q = l[v + (V << 2) >> 2];
          if (-1 == (Q | 0)) {
            v = V;
          } else {
            if (M = l[u >> 2], C = M >> 2, 0 < p[E >> 2] - p[C + (9 * Q | 0) + 2] | 0 < p[I >> 2] - p[C + (9 * Q | 0) + 3] | 0 < p[C + (9 * Q | 0)] - p[J >> 2] | 0 < p[C + (9 * Q | 0) + 1] - p[A >> 2]) {
              v = V;
            } else {
              if (C = M + 36 * Q + 24 | 0, -1 == (l[C >> 2] | 0)) {
                v = l[B], (v | 0) == (Q | 0) ? v = V : (M = l[t], C = l[L >> 2], (M | 0) == (C | 0) && (v = l[h], l[L >> 2] = C << 1, M = Oe(24 * C | 0), l[h] = M, Zg(M, v, 12 * l[t] | 0), Fh(v), v = l[B], M = l[t]), l[(l[h] + 12 * M | 0) >> 2] = (v | 0) > (Q | 0) ? Q : v, v = l[B], l[(l[h] + 12 * l[t] + 4 | 0) >> 2] = (v | 0) < (Q | 0) ? Q : v, l[t] = l[t] + 1 | 0, v = l[z]);
              } else {
                var T = l[y];
                (V | 0) == (T | 0) && (l[y] = T << 1, V = Oe(T << 3), l[F] = V, T = v, Zg(V, T, l[z] << 2), (v | 0) != (H | 0) && Fh(T));
                l[((l[z] << 2) + l[F] | 0) >> 2] = l[C >> 2];
                v = l[z] + 1 | 0;
                l[z] = v;
                Q = M + 36 * Q + 28 | 0;
                M = l[y];
                (v | 0) == (M | 0) && (v = l[F], l[y] = M << 1, M = Oe(M << 3), l[F] = M, C = v, Zg(M, C, l[z] << 2), (v | 0) != (H | 0) && Fh(C));
                l[((l[z] << 2) + l[F] | 0) >> 2] = l[Q >> 2];
                Q = l[z] + 1 | 0;
                v = l[z] = Q;
              }
            }
          }
          Q = l[F];
          if (0 >= (v | 0)) {
            break;
          }
          M = v;
          v = Q;
        }
        (Q | 0) != (H | 0) && (Fh(Q), l[F] = 0);
        a = G;
        h = l[e];
      }
      r = r + 1 | 0;
      if ((r | 0) >= (h | 0)) {
        break;
      }
    }
    i = l[f];
  } else {
    i = 0;
  }
  l[e] = 0;
  e = (b + 44 | 0) >> 2;
  k = l[e];
  l[g >> 2] = 2;
  fp(k, k + 12 * i | 0, g);
  i = 0 < (l[f] | 0);
  a : do {
    if (i) {
      k = b + 12 | 0;
      m = b + 4 | 0;
      r = l[e];
      n = 0;
      q = r;
      r = l[r >> 2];
      b : for (;;) {
        t = q + 12 * n | 0;
        h = -1 < (r | 0) ? (l[k >> 2] | 0) > (r | 0) ? 14 : 13 : 13;
        13 == h && S(O.p | 0, 153, O.R | 0, O.n | 0);
        h = l[m >> 2];
        y = l[(h + 16 >> 2) + (9 * r | 0)];
        B = q + 12 * n + 4 | 0;
        z = l[B >> 2];
        if (-1 < (z | 0)) {
          if ((l[k >> 2] | 0) > (z | 0)) {
            var Y = h;
            h = 17;
          } else {
            h = 16;
          }
        } else {
          h = 16;
        }
        16 == h && (S(O.p | 0, 153, O.R | 0, O.n | 0), Y = l[m >> 2]);
        gp(d, y, l[(Y + 16 >> 2) + (9 * z | 0)]);
        h = l[f];
        for (y = n; ; ) {
          y = y + 1 | 0;
          if ((y | 0) >= (h | 0)) {
            break a;
          }
          z = l[e];
          F = l[(z >> 2) + (3 * y | 0)];
          if ((F | 0) != (l[t >> 2] | 0)) {
            n = y;
            q = z;
            r = F;
            continue b;
          }
          if ((l[(z + 4 >> 2) + (3 * y | 0)] | 0) != (l[B >> 2] | 0)) {
            n = y;
            q = z;
            r = F;
            continue b;
          }
        }
      }
    }
  } while (0);
  a = g;
}

function gp(b, d, e) {
  var f, g, h = l[d + 16 >> 2], i = l[e + 16 >> 2], d = l[d + 20 >> 2], e = l[e + 20 >> 2], k = l[h + 8 >> 2], m = l[i + 8 >> 2], n = (k | 0) == (m | 0);
  a : do {
    if (!n) {
      for (var q = m + 112 | 0; ; ) {
        q = l[q >> 2];
        if (0 == (q | 0)) {
          break;
        }
        if ((l[q >> 2] | 0) == (k | 0)) {
          g = l[q + 4 >> 2] >> 2;
          var r = l[g + 12], t = l[g + 13];
          f = l[g + 14];
          g = l[g + 15];
          if ((r | 0) == (h | 0) & (t | 0) == (i | 0) & (f | 0) == (d | 0) & (g | 0) == (e | 0)) {
            break a;
          }
          if ((r | 0) == (i | 0) & (t | 0) == (h | 0) & (f | 0) == (e | 0) & (g | 0) == (d | 0)) {
            break a;
          }
        }
        q = q + 12 | 0;
      }
      q = k;
      if (!(2 != (l[m >> 2] | 0) && 2 != (l[k >> 2] | 0))) {
        for (r = m + 108 | 0; ; ) {
          r = l[r >> 2];
          if (0 == (r | 0)) {
            break;
          }
          if ((l[r >> 2] | 0) == (q | 0) && 0 == (c[l[r + 4 >> 2] + 61 | 0] & 1) << 24 >> 24) {
            break a;
          }
          r = r + 12 | 0;
        }
        q = l[b + 68 >> 2];
        if (0 == (q | 0) || K[l[l[q >> 2] + 8 >> 2]](q, h, i)) {
          q = h;
          r = d;
          t = i;
          f = e;
          g = l[b + 76 >> 2];
          0 == (c[bp] & 1) << 24 >> 24 && (l[cp >> 2] = 4, l[cp + 4 >> 2] = 6, c[cp + 8 | 0] = 1, l[cp + 96 >> 2] = 8, l[cp + 100 >> 2] = 10, c[cp + 104 | 0] = 1, l[cp + 24 >> 2] = 8, l[cp + 28 >> 2] = 10, c[cp + 32 | 0] = 0, l[cp + 120 >> 2] = 12, l[cp + 124 >> 2] = 14, c[cp + 128 | 0] = 1, l[cp + 48 >> 2] = 16, l[cp + 52 >> 2] = 18, c[cp + 56 | 0] = 1, l[cp + 12 >> 2] = 16, l[cp + 16 >> 2] = 18, c[cp + 20 | 0] = 0, l[cp + 72 >> 2] = 20, l[cp + 76 >> 2] = 22, c[cp + 80 | 0] = 1, l[cp + 108 >> 2] = 20, l[cp + 112 >> 2] = 22, c[cp + 116 | 0] = 0, l[cp + 144 >> 2] = 24, l[cp + 148 >> 2] = 26, c[cp + 152 | 0] = 1, l[cp + 36 >> 2] = 24, l[cp + 40 >> 2] = 26, c[cp + 44 | 0] = 0, l[cp + 168 >> 2] = 28, l[cp + 172 >> 2] = 30, c[cp + 176 | 0] = 1, l[cp + 132 >> 2] = 28, l[cp + 136 >> 2] = 30, c[cp + 140 | 0] = 0, c[bp] = 1);
          var u = o[l[q + 12 >> 2] + 4 >> 2], v = o[l[t + 12 >> 2] + 4 >> 2];
          4 > u >>> 0 || S(O.Z | 0, 80, O.ub | 0, O.Ld | 0);
          4 > v >>> 0 || S(O.Z | 0, 81, O.ub | 0, O.Ce | 0);
          var A = o[(cp >> 2) + (12 * u | 0) + (3 * v | 0)];
          g = t = 0 == (A | 0) ? 0 : 0 == (c[cp + 48 * u + 12 * v + 8 | 0] & 1) << 24 >> 24 ? K[A](t, f, q, r, g) : K[A](q, r, t, f, g);
          0 != (t | 0) && (r = l[l[t + 48 >> 2] + 8 >> 2], q = l[l[t + 52 >> 2] + 8 >> 2], l[(t + 8 | 0) >> 2] = 0, f = (b + 60 | 0) >> 2, l[(t + 12 | 0) >> 2] = l[f], u = l[f], 0 != (u | 0) && (l[(u + 8 | 0) >> 2] = g), l[f] = g, g = t + 16 | 0, l[(t + 20 | 0) >> 2] = t, l[(g | 0) >> 2] = q, l[(t + 24 | 0) >> 2] = 0, f = (r + 112 | 0) >> 2, l[(t + 28 | 0) >> 2] = l[f], u = l[f], 0 != (u | 0) && (l[(u + 8 | 0) >> 2] = g), l[f] = g, g = t + 32 | 0, l[(t + 36 | 0) >> 2] = t, l[(g | 0) >> 2] = r, l[(t + 40 | 0) >> 2] = 0, f = (q + 112 | 0) >> 2, l[(t + 44 | 0) >> 2] = l[f], t = l[f], 0 != (t | 0) && (l[(t + 8 | 0) >> 2] = g), l[f] = g, t = r + 4 | 0, f = j[t >> 1], 0 == (f & 2) << 16 >> 16 && (j[t >> 1] = f | 2, p[r + 144 >> 2] = 0), r = q + 4 | 0, t = j[r >> 1], 0 == (t & 2) << 16 >> 16 && (j[r >> 1] = t | 2, p[q + 144 >> 2] = 0), q = b + 64 | 0, l[q >> 2] = l[q >> 2] + 1 | 0);
        }
      }
    }
  } while (0);
}

function fp(b, d, e) {
  var f, g, h, i, k, m, n, q, r, t, u, v, A, C, B, y, z, F, G, H, E = e >> 2, I = a;
  a += 12;
  var J, L = d, M = b;
  a : for (;;) {
    var V = M, Q = M + 12 | 0, T = M | 0, Y = M + 4 | 0, R = M + 8 | 0;
    H = M >> 2;
    var P = L;
    b : for (;;) {
      var aa = P, W = aa - V | 0, da = W / 12 | 0;
      if (0 == da || 1 == da) {
        J = 52;
        break a;
      } else {
        if (2 == da) {
          var sa = P - 12 | 0;
          if (!K[l[E]](sa, M)) {
            J = 52;
            break a;
          }
          var ta = l[T >> 2], ja = l[Y >> 2], ua = l[R >> 2];
          G = sa >> 2;
          l[H] = l[G];
          l[H + 1] = l[G + 1];
          l[H + 2] = l[G + 2];
          l[sa >> 2] = ta;
          l[P - 12 + 4 >> 2] = ja;
          l[P - 12 + 8 >> 2] = ua;
          J = 52;
          break a;
        } else {
          if (3 == da) {
            hp(M, Q, P - 12 | 0, e);
            J = 52;
            break a;
          } else {
            if (4 == da) {
              ip(M, Q, M + 24 | 0, P - 12 | 0, e);
              J = 52;
              break a;
            } else {
              if (5 == da) {
                jp(M, Q, M + 24 | 0, M + 36 | 0, P - 12 | 0, e);
                J = 52;
                break a;
              } else {
                if (372 > (W | 0)) {
                  J = 9;
                  break a;
                }
                var ha = P - 12 | 0, wa = W / 24 | 0, oa = M + 12 * wa | 0;
                if (11988 < (W | 0)) {
                  var Aa = W / 48 | 0, Fa = jp(M, M + 12 * Aa | 0, oa, M + 12 * (Aa + wa) | 0, ha, e);
                } else {
                  Fa = hp(M, oa, ha, e);
                }
                if (K[l[E]](M, oa)) {
                  var La = ha, xa = Fa;
                } else {
                  for (var ca = ha; ; ) {
                    var Z = ca - 12 | 0, la = o[E];
                    if ((M | 0) == (Z | 0)) {
                      break b;
                    }
                    if (K[la](Z, oa)) {
                      break;
                    }
                    ca = Z;
                  }
                  var ya = l[T >> 2], fa = l[Y >> 2], $ = l[R >> 2];
                  F = Z >> 2;
                  l[H] = l[F];
                  l[H + 1] = l[F + 1];
                  l[H + 2] = l[F + 2];
                  l[Z >> 2] = ya;
                  l[ca - 12 + 4 >> 2] = fa;
                  l[ca - 12 + 8 >> 2] = $;
                  La = Z;
                  xa = Fa + 1 | 0;
                }
                var eb = Q >>> 0 < La >>> 0;
                c : do {
                  if (eb) {
                    for (var Sa = La, Da = Q, na = xa, ma = oa; ; ) {
                      var Ba = K[l[E]](Da, ma);
                      d : do {
                        if (Ba) {
                          for (var za = Da; ; ) {
                            var Ha = za + 12 | 0;
                            if (!K[l[E]](Ha, ma)) {
                              var jb = Ha;
                              z = jb >> 2;
                              break d;
                            }
                            za = Ha;
                          }
                        } else {
                          jb = Da, z = jb >> 2;
                        }
                      } while (0);
                      for (var Ia = Sa; ; ) {
                        var $a = Ia - 12 | 0;
                        if (K[l[E]]($a, ma)) {
                          break;
                        }
                        Ia = $a;
                      }
                      if (jb >>> 0 > $a >>> 0) {
                        var ba = jb;
                        y = ba >> 2;
                        var qa = na, ka = ma;
                        B = ka >> 2;
                        break c;
                      }
                      var ia = l[z], va = l[z + 1], Oa = l[z + 2];
                      C = jb >> 2;
                      A = $a >> 2;
                      l[C] = l[A];
                      l[C + 1] = l[A + 1];
                      l[C + 2] = l[A + 2];
                      l[$a >> 2] = ia;
                      l[Ia - 12 + 4 >> 2] = va;
                      l[Ia - 12 + 8 >> 2] = Oa;
                      var Pa = (ma | 0) == (jb | 0) ? $a : ma, Sa = $a, Da = jb + 12 | 0, na = na + 1 | 0, ma = Pa;
                    }
                  } else {
                    ba = Q, y = ba >> 2, qa = xa, ka = oa, B = ka >> 2;
                  }
                } while (0);
                if ((ba | 0) == (ka | 0)) {
                  var Ta = qa;
                } else {
                  if (K[l[E]](ka, ba)) {
                    var Xa = l[y], ab = l[y + 1], kb = l[y + 2];
                    v = ba >> 2;
                    u = ka >> 2;
                    l[v] = l[u];
                    l[v + 1] = l[u + 1];
                    l[v + 2] = l[u + 2];
                    l[B] = Xa;
                    l[B + 1] = ab;
                    l[B + 2] = kb;
                    Ta = qa + 1 | 0;
                  } else {
                    Ta = qa;
                  }
                }
                if (0 == (Ta | 0)) {
                  var mb = kp(M, ba, e), Qa = ba + 12 | 0;
                  if (kp(Qa, P, e)) {
                    if (mb) {
                      J = 52;
                      break a;
                    }
                    P = ba;
                    continue;
                  } else {
                    if (mb) {
                      L = P;
                      M = Qa;
                      continue a;
                    }
                  }
                }
                var Ma = ba;
                if ((Ma - V | 0) < (aa - Ma | 0)) {
                  fp(M, ba, e);
                  L = P;
                  M = ba + 12 | 0;
                  continue a;
                }
                fp(ba + 12 | 0, P, e);
                P = ba;
              }
            }
          }
        }
      }
    }
    if (K[la](M, ha)) {
      var bb = Q;
    } else {
      var Va = Q;
      for (t = Va >> 2; ; ) {
        if ((Va | 0) == (ha | 0)) {
          J = 52;
          break a;
        }
        if (K[l[E]](M, Va)) {
          break;
        }
        Va = Va + 12 | 0;
        t = Va >> 2;
      }
      var Ja = l[t], ga = l[t + 1], cb = l[t + 2];
      r = Va >> 2;
      q = ha >> 2;
      l[r] = l[q];
      l[r + 1] = l[q + 1];
      l[r + 2] = l[q + 2];
      l[ha >> 2] = Ja;
      l[P - 12 + 4 >> 2] = ga;
      l[P - 12 + 8 >> 2] = cb;
      bb = Va + 12 | 0;
    }
    if ((bb | 0) == (ha | 0)) {
      J = 52;
      break;
    }
    for (var gb = ha, db = bb; ; ) {
      var Ya = K[l[E]](M, db);
      b : do {
        if (Ya) {
          var Ka = db;
          n = Ka >> 2;
        } else {
          for (var Ga = db; ; ) {
            var fb = Ga + 12 | 0;
            if (K[l[E]](M, fb)) {
              Ka = fb;
              n = Ka >> 2;
              break b;
            }
            Ga = fb;
          }
        }
      } while (0);
      for (var Ea = gb; ; ) {
        var Ua = Ea - 12 | 0;
        if (!K[l[E]](M, Ua)) {
          break;
        }
        Ea = Ua;
      }
      if (Ka >>> 0 >= Ua >>> 0) {
        L = P;
        M = Ka;
        continue a;
      }
      var ob = l[n], Na = l[n + 1], Wa = l[n + 2];
      m = Ka >> 2;
      k = Ua >> 2;
      l[m] = l[k];
      l[m + 1] = l[k + 1];
      l[m + 2] = l[k + 2];
      l[Ua >> 2] = ob;
      l[Ea - 12 + 4 >> 2] = Na;
      l[Ea - 12 + 8 >> 2] = Wa;
      gb = Ua;
      db = Ka + 12 | 0;
    }
  }
  a : do {
    if (9 == J) {
      i = I >> 2;
      var nb = M + 24 | 0;
      hp(M, Q, nb, e);
      var pa = M + 36 | 0;
      if ((pa | 0) != (P | 0)) {
        for (var hb = nb, Ca = pa; ; ) {
          if (K[l[E]](Ca, hb)) {
            h = Ca >> 2;
            l[i] = l[h];
            l[i + 1] = l[h + 1];
            l[i + 2] = l[h + 2];
            for (var ib = hb, Za = Ca; ; ) {
              g = Za >> 2;
              f = ib >> 2;
              l[g] = l[f];
              l[g + 1] = l[f + 1];
              l[g + 2] = l[f + 2];
              if ((ib | 0) == (M | 0)) {
                break;
              }
              var lb = ib - 12 | 0;
              if (!K[l[E]](I, lb)) {
                break;
              }
              Za = ib;
              ib = lb;
            }
            l[f] = l[i];
            l[f + 1] = l[i + 1];
            l[f + 2] = l[i + 2];
          }
          var qb = Ca + 12 | 0;
          if ((qb | 0) == (P | 0)) {
            break a;
          }
          hb = Ca;
          Ca = qb;
        }
      }
    }
  } while (0);
  a = I;
}

function hp(b, d, e, f) {
  var g, h, i = e >> 2, k = b >> 2;
  g = K[l[f >> 2]](d, b);
  var m = K[l[f >> 2]](e, d);
  if (g) {
    var n = l[k];
    g = l[k + 1];
    k = l[k + 2];
    h = b >> 2;
    m ? (e >>= 2, l[h] = l[e], l[h + 1] = l[e + 1], l[h + 2] = l[e + 2], l[i] = n, l[i + 1] = g, l[i + 2] = k, i = 1) : (b = d >> 2, l[h] = l[b], l[h + 1] = l[b + 1], l[h + 2] = l[b + 2], m = d | 0, l[m >> 2] = n, n = d + 4 | 0, l[n >> 2] = g, g = d + 8 | 0, l[g >> 2] = k, K[l[f >> 2]](e, d) ? (d = l[m >> 2], f = l[n >> 2], k = l[g >> 2], e >>= 2, l[b] = l[e], l[b + 1] = l[e + 1], l[b + 2] = l[e + 2], l[i] = d, l[i + 1] = f, l[i + 2] = k, i = 2) : i = 1);
  } else {
    if (m) {
      var n = d | 0, q = l[n >> 2], m = d + 4 | 0, r = l[m >> 2];
      h = d + 8 | 0;
      var t = l[h >> 2];
      g = d >> 2;
      e >>= 2;
      l[g] = l[e];
      l[g + 1] = l[e + 1];
      l[g + 2] = l[e + 2];
      l[i] = q;
      l[i + 1] = r;
      l[i + 2] = t;
      K[l[f >> 2]](d, b) ? (i = l[k], e = l[k + 1], d = l[k + 2], f = b >> 2, l[f] = l[g], l[f + 1] = l[g + 1], l[f + 2] = l[g + 2], l[n >> 2] = i, l[m >> 2] = e, l[h >> 2] = d, i = 2) : i = 1;
    } else {
      i = 0;
    }
  }
  return i;
}

function ip(b, d, e, f, g) {
  var h, i, k = hp(b, d, e, g);
  if (K[l[g >> 2]](f, e)) {
    var m = e | 0, n = l[m >> 2], q = e + 4 | 0, r = l[q >> 2], t = e + 8 | 0, u = l[t >> 2];
    i = e >> 2;
    h = f >> 2;
    l[i] = l[h];
    l[i + 1] = l[h + 1];
    l[i + 2] = l[h + 2];
    l[f >> 2] = n;
    l[f + 4 >> 2] = r;
    l[f + 8 >> 2] = u;
    f = k + 1 | 0;
    if (K[l[g >> 2]](e, d)) {
      f = d | 0;
      r = l[f >> 2];
      h = d + 4 | 0;
      var u = l[h >> 2], n = d + 8 | 0, v = l[n >> 2], e = d >> 2;
      l[e] = l[i];
      l[e + 1] = l[i + 1];
      l[e + 2] = l[i + 2];
      l[m >> 2] = r;
      l[q >> 2] = u;
      l[t >> 2] = v;
      i = k + 2 | 0;
      K[l[g >> 2]](d, b) ? (d = l[b >> 2], g = l[b + 4 >> 2], i = l[b + 8 >> 2], b >>= 2, l[b] = l[e], l[b + 1] = l[e + 1], l[b + 2] = l[e + 2], l[f >> 2] = d, l[h >> 2] = g, l[n >> 2] = i, k = k + 3 | 0) : k = i;
    } else {
      k = f;
    }
  }
  return k;
}

function jp(b, d, e, f, g, h) {
  var i, k, m = ip(b, d, e, f, h);
  if (K[l[h >> 2]](g, f)) {
    var n = f | 0, q = l[n >> 2], r = f + 4 | 0, t = l[r >> 2], u = f + 8 | 0, v = l[u >> 2];
    k = f >> 2;
    i = g >> 2;
    l[k] = l[i];
    l[k + 1] = l[i + 1];
    l[k + 2] = l[i + 2];
    l[g >> 2] = q;
    l[g + 4 >> 2] = t;
    l[g + 8 >> 2] = v;
    g = m + 1 | 0;
    if (K[l[h >> 2]](f, e)) {
      g = e | 0;
      t = l[g >> 2];
      i = e + 4 | 0;
      var v = l[i >> 2], q = e + 8 | 0, A = l[q >> 2], f = e >> 2;
      l[f] = l[k];
      l[f + 1] = l[k + 1];
      l[f + 2] = l[k + 2];
      l[n >> 2] = t;
      l[r >> 2] = v;
      l[u >> 2] = A;
      k = m + 2 | 0;
      K[l[h >> 2]](e, d) ? (k = d | 0, u = l[k >> 2], n = d + 4 | 0, t = l[n >> 2], r = d + 8 | 0, v = l[r >> 2], e = d >> 2, l[e] = l[f], l[e + 1] = l[f + 1], l[e + 2] = l[f + 2], l[g >> 2] = u, l[i >> 2] = t, l[q >> 2] = v, f = m + 3 | 0, K[l[h >> 2]](d, b) ? (d = l[b >> 2], h = l[b + 4 >> 2], f = l[b + 8 >> 2], b >>= 2, l[b] = l[e], l[b + 1] = l[e + 1], l[b + 2] = l[e + 2], l[k >> 2] = d, l[n >> 2] = h, l[r >> 2] = f, m = m + 4 | 0) : m = f) : m = k;
    } else {
      m = g;
    }
  }
  return m;
}

function kp(b, d, e) {
  var f, g, h, i, k = a;
  a += 12;
  var m = (d - b) / 12 | 0;
  a : do {
    if (0 == m || 1 == m) {
      h = 1;
    } else {
      if (2 == m) {
        var n = d - 12 | 0;
        if (K[l[e >> 2]](n, b)) {
          var q = l[b >> 2];
          g = l[b + 4 >> 2];
          var r = l[b + 8 >> 2];
          i = b >> 2;
          h = n >> 2;
          l[i] = l[h];
          l[i + 1] = l[h + 1];
          l[i + 2] = l[h + 2];
          l[n >> 2] = q;
          l[d - 12 + 4 >> 2] = g;
          l[d - 12 + 8 >> 2] = r;
        }
        h = 1;
      } else {
        if (3 == m) {
          hp(b, b + 12 | 0, d - 12 | 0, e), h = 1;
        } else {
          if (4 == m) {
            ip(b, b + 12 | 0, b + 24 | 0, d - 12 | 0, e), h = 1;
          } else {
            if (5 == m) {
              jp(b, b + 12 | 0, b + 24 | 0, b + 36 | 0, d - 12 | 0, e), h = 1;
            } else {
              q = b + 24 | 0;
              hp(b, b + 12 | 0, q, e);
              h = k >> 2;
              i = b + 36 | 0;
              for (n = 0; ; ) {
                if ((i | 0) == (d | 0)) {
                  h = 1;
                  break a;
                }
                if (K[l[e >> 2]](i, q)) {
                  g = i >> 2;
                  l[h] = l[g];
                  l[h + 1] = l[g + 1];
                  l[h + 2] = l[g + 2];
                  for (g = i; ; ) {
                    g >>= 2;
                    f = q >> 2;
                    l[g] = l[f];
                    l[g + 1] = l[f + 1];
                    l[g + 2] = l[f + 2];
                    if ((q | 0) == (b | 0)) {
                      break;
                    }
                    r = q - 12 | 0;
                    if (!K[l[e >> 2]](k, r)) {
                      break;
                    }
                    g = q;
                    q = r;
                  }
                  l[f] = l[h];
                  l[f + 1] = l[h + 1];
                  l[f + 2] = l[h + 2];
                  n = n + 1 | 0;
                  if (8 == (n | 0)) {
                    break;
                  }
                }
                q = i;
                i = i + 12 | 0;
              }
              h = (i + 12 | 0) == (d | 0);
            }
          }
        }
      }
    }
  } while (0);
  a = k;
  return h;
}

function Wo(b, d) {
  var e, f;
  0 != (l[b + 28 >> 2] | 0) && S(O.Oa | 0, 72, O.vb | 0, O.yb | 0);
  f = (b + 12 | 0) >> 2;
  e = l[f];
  var g = K[l[l[e >> 2] + 12 >> 2]](e);
  e = b + 24 | 0;
  var h = o[e >> 2], g = 28 * g | 0, i = 0 == (g | 0);
  a : do {
    if (!i) {
      var k = 0 < (g | 0);
      do {
        if (k) {
          if (640 >= (g | 0)) {
            break;
          }
          Fh(h);
          break a;
        }
        S(O.e | 0, 164, O.f | 0, O.Ua | 0);
      } while (0);
      var m = Gd[bn + g | 0], k = m & 255;
      14 > (m & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
      m = h;
      k = (k << 2) + d + 12 | 0;
      l[h >> 2] = l[k >> 2];
      l[k >> 2] = m;
    }
  } while (0);
  l[e >> 2] = 0;
  h = o[f];
  e = h >> 2;
  g = l[e + 1];
  0 == g ? (K[l[l[e] >> 2]](h), g = Gd[bn + 20 | 0], i = g & 255, 14 > (g & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), g = (i << 2) + d + 12 | 0, l[e] = l[g >> 2], l[g >> 2] = h) : 1 == g ? (K[l[l[e] >> 2]](h), g = Gd[bn + 48 | 0], i = g & 255, 14 > (g & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), g = (i << 2) + d + 12 | 0, l[e] = l[g >> 2], l[g >> 2] = h) : 2 == g ? (K[l[l[e] >> 2]](h), g = Gd[bn + 152 | 0], i = g & 255, 14 > (g & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), g = (i << 2) + d + 12 | 0, l[e] = l[g >> 2], l[g >> 2] = h) : 3 == g ? (K[l[l[e] >> 2]](h), g = Gd[bn + 40 | 0], i = g & 255, 14 > (g & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), g = (i << 2) + d + 12 | 0, l[e] = l[g >> 2], l[g >> 2] = h) : S(O.Oa | 0, 115, O.vb | 0, O.k | 0);
  l[f] = 0;
}

function To(b, d, e) {
  var f;
  f = (b + 28 | 0) >> 2;
  0 != (l[f] | 0) && S(O.Oa | 0, 124, O.hd | 0, O.yb | 0);
  var g = b + 12 | 0, h = l[g >> 2], h = K[l[l[h >> 2] + 12 >> 2]](h);
  l[f] = h;
  h = 0 < (h | 0);
  a : do {
    if (h) {
      for (var i = b + 24 | 0, k = d, m = 0; ; ) {
        var n = l[i >> 2], q = n + 28 * m | 0, r = l[g >> 2];
        K[l[l[r >> 2] + 24 >> 2]](r, q | 0, e, m);
        q = zg(k, q, q);
        l[(n + 28 * m + 24 | 0) >> 2] = q;
        l[(n + 28 * m + 16 | 0) >> 2] = b;
        l[(n + 28 * m + 20 | 0) >> 2] = m;
        m = m + 1 | 0;
        if ((m | 0) >= (l[f] | 0)) {
          break a;
        }
      }
    }
  } while (0);
}

function Ro(b, d, e, f) {
  var g, h, i = a;
  a += 40;
  var k = i + 16, m = i + 32, n = b + 28 | 0, q = 0 < (l[n >> 2] | 0);
  a : do {
    if (q) {
      var r = b + 24 | 0, t = b + 12 | 0, u = i | 0, v = k | 0, A = i + 4 | 0, C = k + 4 | 0, B = i + 8 | 0, y = k + 8 | 0, z = i + 12 | 0, F = k + 12 | 0, G = f | 0, H = e | 0, E = f + 4 | 0, I = e + 4 | 0, J = m | 0, L = m + 4 | 0, M = m, V = d;
      h = (d + 40 | 0) >> 2;
      var Q = d + 36 | 0;
      g = (d + 32 | 0) >> 2;
      for (var T = 0; ; ) {
        var Y = l[r >> 2], R = Y + 28 * T | 0, P = l[t >> 2], aa = Y + 28 * T + 20 | 0;
        K[l[l[P >> 2] + 24 >> 2]](P, i, e, l[aa >> 2]);
        P = l[t >> 2];
        K[l[l[P >> 2] + 24 >> 2]](P, k, f, l[aa >> 2]);
        var aa = R, P = p[u >> 2], W = p[v >> 2], da = p[A >> 2], sa = p[C >> 2], da = da < sa ? da : sa, P = (N[0] = P < W ? P : W, w[0]), W = (N[0] = da, w[0]) | 0;
        l[(R | 0) >> 2] = 0 | P;
        l[(R + 4 | 0) >> 2] = W;
        R = p[B >> 2];
        P = p[y >> 2];
        W = p[z >> 2];
        da = p[F >> 2];
        da = W > da ? W : da;
        W = Y + 28 * T + 8 | 0;
        R = (N[0] = R > P ? R : P, w[0]);
        P = (N[0] = da, w[0]) | 0;
        l[(W | 0) >> 2] = 0 | R;
        l[(W + 4 | 0) >> 2] = P;
        R = p[E >> 2] - p[I >> 2];
        p[J >> 2] = p[G >> 2] - p[H >> 2];
        p[L >> 2] = R;
        Y = l[(Y + 24 >> 2) + (7 * T | 0)];
        Kl(V, Y, aa, M) && (R = l[h], aa = l[Q >> 2], (R | 0) == (aa | 0) ? (R = l[g], l[Q >> 2] = aa << 1, aa = Oe(aa << 3), l[g] = aa, Zg(aa, R, l[h] << 2), Fh(R), aa = l[h]) : aa = R, l[((aa << 2) + l[g] | 0) >> 2] = Y, l[h] = l[h] + 1 | 0);
        T = T + 1 | 0;
        if ((T | 0) >= (l[n >> 2] | 0)) {
          break a;
        }
      }
    }
  } while (0);
  a = i;
}

function lp(b, d, e, f, g, h) {
  var i, k, m, n, q = b >> 2;
  i = (b + 40 | 0) >> 2;
  l[i] = d;
  l[q + 11] = e;
  l[q + 12] = f;
  l[q + 7] = 0;
  l[q + 9] = 0;
  l[q + 8] = 0;
  b = (b | 0) >> 2;
  l[b] = g;
  l[q + 1] = h;
  k = d << 2;
  d = (g + 102796 | 0) >> 2;
  h = l[d];
  32 > (h | 0) ? m = h : (S(O.m | 0, 38, O.w | 0, O.D | 0), m = l[d]);
  h = (g + 12 * m + 102412 | 0) >> 2;
  l[(g + 102416 >> 2) + (3 * m | 0)] = k;
  n = (g + 102400 | 0) >> 2;
  var r = l[n];
  102400 < (r + k | 0) ? (n = Oe(k), l[h] = n, c[g + 12 * m + 102420 | 0] = 1) : (l[h] = g + r | 0, c[g + 12 * m + 102420 | 0] = 0, l[n] = l[n] + k | 0);
  m = g + 102404 | 0;
  k = l[m >> 2] + k | 0;
  l[m >> 2] = k;
  g = g + 102408 | 0;
  m = l[g >> 2];
  l[g >> 2] = (m | 0) > (k | 0) ? m : k;
  l[d] = l[d] + 1 | 0;
  l[q + 2] = l[h];
  g = l[b];
  h = e << 2;
  e = (g + 102796 | 0) >> 2;
  d = l[e];
  32 > (d | 0) ? k = d : (S(O.m | 0, 38, O.w | 0, O.D | 0), k = l[e]);
  d = g + 12 * k + 102412 | 0;
  l[(g + 12 * k + 102416 | 0) >> 2] = h;
  m = (g + 102400 | 0) >> 2;
  n = l[m];
  102400 < (n + h | 0) ? (m = Oe(h), l[(d | 0) >> 2] = m, c[g + 12 * k + 102420 | 0] = 1) : (l[(d | 0) >> 2] = g + n | 0, c[g + 12 * k + 102420 | 0] = 0, l[m] = l[m] + h | 0);
  k = g + 102404 | 0;
  h = l[k >> 2] + h | 0;
  l[k >> 2] = h;
  g = g + 102408 | 0;
  k = l[g >> 2];
  l[g >> 2] = (k | 0) > (h | 0) ? k : h;
  l[e] = l[e] + 1 | 0;
  l[q + 3] = l[d >> 2];
  e = l[b];
  d = f << 2;
  f = (e + 102796 | 0) >> 2;
  g = l[f];
  32 > (g | 0) ? h = g : (S(O.m | 0, 38, O.w | 0, O.D | 0), h = l[f]);
  g = e + 12 * h + 102412 | 0;
  l[(e + 12 * h + 102416 | 0) >> 2] = d;
  k = (e + 102400 | 0) >> 2;
  m = l[k];
  102400 < (m + d | 0) ? (k = Oe(d), l[(g | 0) >> 2] = k, c[e + 12 * h + 102420 | 0] = 1) : (l[(g | 0) >> 2] = e + m | 0, c[e + 12 * h + 102420 | 0] = 0, l[k] = l[k] + d | 0);
  h = e + 102404 | 0;
  d = l[h >> 2] + d | 0;
  l[h >> 2] = d;
  e = e + 102408 | 0;
  h = l[e >> 2];
  l[e >> 2] = (h | 0) > (d | 0) ? h : d;
  l[f] = l[f] + 1 | 0;
  l[q + 4] = l[g >> 2];
  g = l[b];
  d = 12 * l[i] | 0;
  f = (g + 102796 | 0) >> 2;
  e = l[f];
  32 > (e | 0) ? h = e : (S(O.m | 0, 38, O.w | 0, O.D | 0), h = l[f]);
  e = g + 12 * h + 102412 | 0;
  l[(g + 12 * h + 102416 | 0) >> 2] = d;
  k = (g + 102400 | 0) >> 2;
  m = l[k];
  102400 < (m + d | 0) ? (k = Oe(d), l[(e | 0) >> 2] = k, c[g + 12 * h + 102420 | 0] = 1) : (l[(e | 0) >> 2] = g + m | 0, c[g + 12 * h + 102420 | 0] = 0, l[k] = l[k] + d | 0);
  h = g + 102404 | 0;
  d = l[h >> 2] + d | 0;
  l[h >> 2] = d;
  g = g + 102408 | 0;
  h = l[g >> 2];
  l[g >> 2] = (h | 0) > (d | 0) ? h : d;
  l[f] = l[f] + 1 | 0;
  l[q + 6] = l[e >> 2];
  b = l[b];
  e = 12 * l[i] | 0;
  i = (b + 102796 | 0) >> 2;
  f = l[i];
  32 > (f | 0) ? g = f : (S(O.m | 0, 38, O.w | 0, O.D | 0), g = l[i]);
  f = b + 12 * g + 102412 | 0;
  l[(b + 12 * g + 102416 | 0) >> 2] = e;
  d = (b + 102400 | 0) >> 2;
  h = l[d];
  102400 < (h + e | 0) ? (d = Oe(e), l[(f | 0) >> 2] = d, c[b + 12 * g + 102420 | 0] = 1) : (l[(f | 0) >> 2] = b + h | 0, c[b + 12 * g + 102420 | 0] = 0, l[d] = l[d] + e | 0);
  g = b + 102404 | 0;
  e = l[g >> 2] + e | 0;
  l[g >> 2] = e;
  b = b + 102408 | 0;
  g = l[b >> 2];
  l[b >> 2] = (g | 0) > (e | 0) ? g : e;
  l[i] = l[i] + 1 | 0;
  l[q + 5] = l[f >> 2];
}

function mp(b, d) {
  var e = b >> 2, f = b | 0, g = b + 8 | 0;
  l[g >> 2] = 128;
  l[e + 1] = 0;
  var h = Oe(1024);
  l[e] = h;
  Ze(h, l[g >> 2] << 3);
  Ze(b + 12 | 0, 56);
  if (0 == (c[np] & 1) << 24 >> 24) {
    h = 0;
    for (g = 1; !(14 > (h | 0) || S(O.e | 0, 73, O.Ga | 0, O.Sa | 0), (g | 0) > (l[cn + (h << 2) >> 2] | 0) && (h = h + 1 | 0), c[bn + g | 0] = h & 255, g = g + 1 | 0, 641 == (g | 0)); ) {}
    c[np] = 1;
  }
  l[e + 25617] = 0;
  l[e + 25618] = 0;
  l[e + 25619] = 0;
  l[e + 25716] = 0;
  yg(b + 102872 | 0);
  l[e + 25733] = 0;
  l[e + 25734] = 0;
  l[e + 25735] = op;
  l[e + 25736] = pp;
  g = b + 102948 | 0;
  l[g >> 2] = 0;
  h = b + 102968 | 0;
  l[e + 25745] = 0;
  l[e + 25746] = 0;
  l[e + 25738] = 0;
  l[e + 25739] = 0;
  l[e + 25740] = 0;
  l[e + 25741] = 0;
  c[b + 102992 | 0] = 1;
  c[b + 102993 | 0] = 1;
  c[b + 102994 | 0] = 0;
  c[b + 102995 | 0] = 1;
  c[b + 102976 | 0] = 1;
  var i = l[d + 4 >> 2];
  l[h >> 2] = l[d >> 2];
  l[h + 4 >> 2] = i;
  l[e + 25717] = 4;
  p[e + 25747] = 0;
  l[g >> 2] = f;
  Ze(b + 102996 | 0, 32);
}

function qp(b) {
  var d = b >> 2, e = b | 0, f = l[d + 25738];
  a : for (; 0 != (f | 0); ) {
    for (var g = l[f + 96 >> 2], h = l[f + 100 >> 2]; ; ) {
      if (0 == (h | 0)) {
        f = g;
        continue a;
      }
      var i = l[h + 4 >> 2];
      l[h + 28 >> 2] = 0;
      Wo(h, e);
      h = i;
    }
  }
  Fh(l[d + 25726]);
  Fh(l[d + 25729]);
  Fh(l[d + 25719]);
  0 != (l[d + 25617] | 0) && S(O.m | 0, 32, O.P | 0, O.Ta | 0);
  0 != (l[d + 25716] | 0) && S(O.m | 0, 33, O.P | 0, O.Wa | 0);
  d = b + 4 | 0;
  e = 0 < (l[d >> 2] | 0);
  b |= 0;
  f = l[b >> 2];
  a : do {
    if (e) {
      g = 0;
      for (h = f; ; ) {
        if (Fh(l[h + (g << 3) + 4 >> 2]), g = g + 1 | 0, h = l[b >> 2], (g | 0) >= (l[d >> 2] | 0)) {
          var k = h;
          break a;
        }
      }
    } else {
      k = f;
    }
  } while (0);
  Fh(k);
}

function rp(b, d) {
  var e, f, g, h;
  h = (b + 102960 | 0) >> 2;
  0 < (l[h] | 0) || S(O.t | 0, 133, O.qb | 0, O.ze | 0);
  g = b + 102868 | 0;
  var i = l[g >> 2];
  0 == (i & 2 | 0) ? g = i : (S(O.t | 0, 134, O.qb | 0, O.pa | 0), g = l[g >> 2]);
  if (0 == (g & 2 | 0)) {
    g = (d + 108 | 0) >> 2;
    var i = l[g], k = 0 == (i | 0);
    a : do {
      if (!k) {
        for (var m = b + 102980 | 0, n = i; ; ) {
          var q = l[n + 12 >> 2], r = l[m >> 2];
          0 == (r | 0) ? r = n + 4 | 0 : (n = n + 4 | 0, K[l[l[r >> 2] + 8 >> 2]](r, l[n >> 2]), r = n);
          sp(b, l[r >> 2]);
          l[g] = q;
          if (0 == (q | 0)) {
            break a;
          }
          n = q;
        }
      }
    } while (0);
    l[g] = 0;
    g = d + 112 | 0;
    i = l[g >> 2];
    k = 0 == (i | 0);
    a : do {
      if (!k) {
        m = b + 102872 | 0;
        for (q = i; ; ) {
          r = l[q + 12 >> 2];
          Vo(m, l[q + 4 >> 2]);
          if (0 == (r | 0)) {
            break a;
          }
          q = r;
        }
      }
    } while (0);
    l[g >> 2] = 0;
    g = (d + 100 | 0) >> 2;
    i = l[g];
    k = 0 == (i | 0);
    a : do {
      if (k) {
        e = d + 104 | 0;
      } else {
        for (var m = b + 102980 | 0, q = b + 102912 | 0, r = b + 102904 | 0, n = b + 102900 | 0, t = b + 102872 | 0, u = b | 0, v = d + 104 | 0, A = i; ; ) {
          var C = o[A + 4 >> 2];
          f = l[m >> 2];
          if (0 != (f | 0)) {
            K[l[l[f >> 2] + 12 >> 2]](f, A);
          }
          var B = A;
          f = (A + 28 | 0) >> 2;
          var y = 0 < (l[f] | 0);
          b : do {
            if (y) {
              for (var z = A + 24 | 0, F = 0; ; ) {
                for (var G = l[z >> 2] + 28 * F + 24 | 0, H = l[G >> 2], E = l[q >> 2], I = 0; (I | 0) < (E | 0); ) {
                  var J = (I << 2) + l[r >> 2] | 0;
                  if ((l[J >> 2] | 0) == (H | 0)) {
                    l[J >> 2] = -1;
                    break;
                  }
                  I = I + 1 | 0;
                }
                l[n >> 2] = l[n >> 2] - 1 | 0;
                rl(t, H);
                l[G >> 2] = -1;
                F = F + 1 | 0;
                if ((F | 0) >= (l[f] | 0)) {
                  break b;
                }
              }
            }
          } while (0);
          l[f] = 0;
          Wo(B, u);
          f = Gd[bn + 44 | 0];
          B = f & 255;
          14 > (f & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
          f = (B << 2) + b + 12 | 0;
          l[A >> 2] = l[f >> 2];
          l[f >> 2] = A;
          l[g] = C;
          l[v >> 2] = l[v >> 2] - 1 | 0;
          if (0 == (C | 0)) {
            e = v;
            break a;
          }
          A = C;
        }
      }
    } while (0);
    l[g] = 0;
    l[e >> 2] = 0;
    g = d + 92 | 0;
    i = l[g >> 2];
    e = (d + 96 | 0) >> 2;
    0 != (i | 0) && (l[(i + 96 | 0) >> 2] = l[e]);
    i = l[e];
    0 != (i | 0) && (l[(i + 92 | 0) >> 2] = l[g >> 2]);
    g = b + 102952 | 0;
    (l[g >> 2] | 0) == (d | 0) && (l[g >> 2] = l[e]);
    l[h] = l[h] - 1 | 0;
    h = Gd[bn + 152 | 0];
    e = h & 255;
    14 > (h & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
    h = (e << 2) + b + 12 | 0;
    l[d >> 2] = l[h >> 2];
    l[h >> 2] = d;
  }
}

function sp(b, d) {
  var e, f, g, h, i = b + 102868 | 0;
  e = l[i >> 2];
  0 == (e & 2 | 0) ? i = e : (S(O.t | 0, 274, O.rb | 0, O.pa | 0), i = l[i >> 2]);
  i = 0 == (i & 2 | 0);
  a : do {
    if (i) {
      e = c[d + 61 | 0] & 1;
      var k = d + 8 | 0;
      f = l[k >> 2];
      h = (d + 12 | 0) >> 2;
      0 != (f | 0) && (l[(f + 12 | 0) >> 2] = l[h]);
      f = l[h];
      0 != (f | 0) && (l[(f + 8 | 0) >> 2] = l[k >> 2]);
      k = b + 102956 | 0;
      (l[k >> 2] | 0) == (d | 0) && (l[k >> 2] = l[h]);
      h = l[d + 48 >> 2];
      k = l[d + 52 >> 2];
      f = h + 4 | 0;
      g = j[f >> 1];
      0 == (g & 2) << 16 >> 16 && (j[f >> 1] = g | 2, p[h + 144 >> 2] = 0);
      f = k + 4 | 0;
      g = j[f >> 1];
      0 == (g & 2) << 16 >> 16 && (j[f >> 1] = g | 2, p[k + 144 >> 2] = 0);
      var m = d + 16 | 0;
      g = (d + 24 | 0) >> 2;
      var n = l[g];
      f = (d + 28 | 0) >> 2;
      0 != (n | 0) && (l[(n + 12 | 0) >> 2] = l[f]);
      n = l[f];
      0 != (n | 0) && (l[(n + 8 | 0) >> 2] = l[g]);
      n = h + 108 | 0;
      (m | 0) == (l[n >> 2] | 0) && (l[n >> 2] = l[f]);
      l[g] = 0;
      l[f] = 0;
      m = d + 32 | 0;
      g = (d + 40 | 0) >> 2;
      n = l[g];
      f = (d + 44 | 0) >> 2;
      0 != (n | 0) && (l[(n + 12 | 0) >> 2] = l[f]);
      n = l[f];
      0 != (n | 0) && (l[(n + 8 | 0) >> 2] = l[g]);
      n = k + 108 | 0;
      (m | 0) == (l[n >> 2] | 0) && (l[n >> 2] = l[f]);
      l[g] = 0;
      l[f] = 0;
      f = d;
      m = b | 0;
      g = f >> 2;
      K[l[l[g] + 20 >> 2]](f);
      n = l[g + 1];
      if (3 == n) {
        var n = Gd[bn + 176 | 0], q = n & 255;
        14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
        m = (q << 2) + m + 12 | 0;
        l[g] = l[m >> 2];
        l[m >> 2] = f;
      } else {
        5 == n ? (n = Gd[bn + 168 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 2 == n ? (n = Gd[bn + 256 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 1 == n ? (n = Gd[bn + 228 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 4 == n ? (n = Gd[bn + 196 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 6 == n ? (n = Gd[bn + 276 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 7 == n ? (n = Gd[bn + 224 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 8 == n ? (n = Gd[bn + 208 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 9 == n ? (n = Gd[bn + 180 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : 10 == n ? (n = Gd[bn + 168 | 0], q = n & 255, 14 > (n & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0), m = (q << 2) + m + 12 | 0, l[g] = l[m >> 2], l[m >> 2] = f) : S(O.o | 0, 166, O.cd | 0, O.k | 0);
      }
      f = (b + 102964 | 0) >> 2;
      g = l[f];
      0 < (g | 0) || (S(O.t | 0, 346, O.rb | 0, O.lf | 0), g = l[f]);
      l[f] = g - 1 | 0;
      if (0 == e << 24 >> 24 && (e = l[k + 112 >> 2], 0 != (e | 0))) {
        for (e >>= 2; ; ) {
          (l[e] | 0) == (h | 0) && (k = l[e + 1] + 4 | 0, l[k >> 2] |= 8);
          e = l[e + 3];
          if (0 == (e | 0)) {
            break a;
          }
          e >>= 2;
        }
      }
    }
  } while (0);
}

function lq(b, d) {
  var e, f, g, h, i, k = b + 102868 | 0, m = l[k >> 2];
  if (0 == (m & 2 | 0)) {
    var n = m;
  } else {
    S(O.t | 0, 214, O.ed | 0, O.pa | 0), n = l[k >> 2];
  }
  var q = 0 == (n & 2 | 0);
  a : do {
    if (q) {
      var r, t = d, u = b | 0, v = ra, A = ra, C = ra, B = ra, y = ra, z = ra, F = ra, G = ra, H = ra, E = ra, I = ra, J = ra, L = ra, M = ra, V = ra, Q = ra, T = ra, Y = t >> 2, T = (t | 0) >> 2, R = l[T];
      if (3 == R) {
        var P = an(u, 176), Q = P >> 2;
        if (0 == (P | 0)) {
          var aa = 0;
        } else {
          l[P >> 2] = mq + 8 | 0;
          var W = t + 8 | 0, da = t + 12 | 0;
          (l[W >> 2] | 0) == (l[da >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
          l[Q + 1] = l[T];
          l[Q + 2] = 0;
          l[Q + 3] = 0;
          l[Q + 12] = l[W >> 2];
          l[Q + 13] = l[da >> 2];
          l[Q + 14] = 0;
          c[P + 61 | 0] = c[t + 16 | 0] & 1;
          c[P + 60 | 0] = 0;
          l[Q + 16] = l[Y + 1];
          V = (P + 16 | 0) >> 2;
          l[V] = 0;
          l[V + 1] = 0;
          l[V + 2] = 0;
          l[V + 3] = 0;
          l[V + 4] = 0;
          l[V + 5] = 0;
          l[V + 6] = 0;
          l[V + 7] = 0;
          l[P >> 2] = nq + 8 | 0;
          var sa = P + 88 | 0, ta = t + 20 | 0, ja = P + 80 | 0, ua = ta | 0, M = ua >> 2, ha = l[M], wa = ta + 4 | 0, L = wa >> 2, oa = l[L], Aa = ja | 0, J = Aa >> 2;
          l[J] = ha;
          var Fa = ja + 4 | 0, I = Fa >> 2;
          l[I] = oa;
          var La = t + 28 | 0, xa = La | 0, E = xa >> 2, ca = l[E], Z = La + 4 | 0, H = Z >> 2, la = l[H], ya = sa | 0, G = ya >> 2;
          l[G] = ca;
          var fa = sa + 4 | 0, F = fa >> 2;
          l[F] = la;
          p[Q + 26] = p[Y + 9];
          p[Q + 17] = p[Y + 10];
          p[Q + 18] = p[Y + 11];
          p[Q + 25] = 0;
          p[Q + 24] = 0;
          p[Q + 19] = 0;
          aa = P;
        }
        var $ = aa | 0;
      } else {
        if (5 == R) {
          var eb = an(u, 168);
          if (0 == (eb | 0)) {
            var Sa = 0;
          } else {
            oq(eb, t), Sa = eb;
          }
          $ = Sa | 0;
        } else {
          if (2 == R) {
            var Da = an(u, 256);
            if (0 == (Da | 0)) {
              var na = 0;
            } else {
              pq(Da, t), na = Da;
            }
            $ = na | 0;
          } else {
            if (1 == R) {
              var ma = an(u, 228);
              if (0 == (ma | 0)) {
                var Ba = 0;
              } else {
                qq(ma, t), Ba = ma;
              }
              $ = Ba | 0;
            } else {
              if (4 == R) {
                var za = an(u, 196);
                if (0 == (za | 0)) {
                  var Ha = 0;
                } else {
                  rq(za, t), Ha = za;
                }
                $ = Ha | 0;
              } else {
                if (6 == R) {
                  var jb = an(u, 276);
                  if (0 == (jb | 0)) {
                    var Ia = 0;
                  } else {
                    sq(jb, t), Ia = jb;
                  }
                  $ = Ia | 0;
                } else {
                  if (7 == R) {
                    var $a = an(u, 224);
                    if (0 == ($a | 0)) {
                      var ba = 0;
                    } else {
                      tq($a, t), ba = $a;
                    }
                    $ = ba | 0;
                  } else {
                    if (8 == R) {
                      var qa = an(u, 208), z = qa >> 2;
                      if (0 == (qa | 0)) {
                        var ka = 0;
                      } else {
                        l[qa >> 2] = mq + 8 | 0;
                        var ia = t + 8 | 0, va = t + 12 | 0;
                        (l[ia >> 2] | 0) == (l[va >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
                        l[z + 1] = l[T];
                        l[z + 2] = 0;
                        l[z + 3] = 0;
                        l[z + 12] = l[ia >> 2];
                        l[z + 13] = l[va >> 2];
                        l[z + 14] = 0;
                        c[qa + 61 | 0] = c[t + 16 | 0] & 1;
                        c[qa + 60 | 0] = 0;
                        l[z + 16] = l[Y + 1];
                        y = (qa + 16 | 0) >> 2;
                        l[y] = 0;
                        l[y + 1] = 0;
                        l[y + 2] = 0;
                        l[y + 3] = 0;
                        l[y + 4] = 0;
                        l[y + 5] = 0;
                        l[y + 6] = 0;
                        l[y + 7] = 0;
                        l[qa >> 2] = Cr + 8 | 0;
                        var Oa = qa + 88 | 0, Pa = t + 20 | 0, Ta = qa + 80 | 0, ua = Pa | 0, M = ua >> 2, Xa = l[M], wa = Pa + 4 | 0, L = wa >> 2, ab = l[L], Aa = Ta | 0, J = Aa >> 2;
                        l[J] = Xa;
                        Fa = Ta + 4 | 0;
                        I = Fa >> 2;
                        l[I] = ab;
                        var kb = t + 28 | 0, xa = kb | 0, E = xa >> 2, mb = l[E], Z = kb + 4 | 0, H = Z >> 2, Qa = l[H], ya = Oa | 0, G = ya >> 2;
                        l[G] = mb;
                        fa = Oa + 4 | 0;
                        F = fa >> 2;
                        l[F] = Qa;
                        p[z + 24] = p[Y + 9];
                        p[z + 17] = p[Y + 10];
                        p[z + 18] = p[Y + 11];
                        p[z + 26] = 0;
                        p[z + 27] = 0;
                        p[z + 28] = 0;
                        ka = qa;
                      }
                      $ = ka | 0;
                    } else {
                      if (9 == R) {
                        var Ma = an(u, 180), B = Ma >> 2;
                        if (0 == (Ma | 0)) {
                          var bb = 0;
                        } else {
                          l[Ma >> 2] = mq + 8 | 0;
                          var Va = t + 8 | 0, Ja = t + 12 | 0;
                          (l[Va >> 2] | 0) == (l[Ja >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
                          l[B + 1] = l[T];
                          l[B + 2] = 0;
                          l[B + 3] = 0;
                          l[B + 12] = l[Va >> 2];
                          l[B + 13] = l[Ja >> 2];
                          l[B + 14] = 0;
                          c[Ma + 61 | 0] = c[t + 16 | 0] & 1;
                          c[Ma + 60 | 0] = 0;
                          l[B + 16] = l[Y + 1];
                          C = (Ma + 16 | 0) >> 2;
                          l[C] = 0;
                          l[C + 1] = 0;
                          l[C + 2] = 0;
                          l[C + 3] = 0;
                          l[C + 4] = 0;
                          l[C + 5] = 0;
                          l[C + 6] = 0;
                          l[C + 7] = 0;
                          l[Ma >> 2] = Dr + 8 | 0;
                          var ga = Ma + 76 | 0, cb = t + 20 | 0, gb = Ma + 68 | 0, ua = cb | 0, M = ua >> 2, db = l[M], wa = cb + 4 | 0, L = wa >> 2, Ya = l[L], Aa = gb | 0, J = Aa >> 2;
                          l[J] = db;
                          Fa = gb + 4 | 0;
                          I = Fa >> 2;
                          l[I] = Ya;
                          var Ka = t + 28 | 0, xa = Ka | 0, E = xa >> 2, Ga = l[E], Z = Ka + 4 | 0, H = Z >> 2, fb = l[H], ya = ga | 0, G = ya >> 2;
                          l[G] = Ga;
                          fa = ga + 4 | 0;
                          F = fa >> 2;
                          l[F] = fb;
                          p[B + 21] = 0;
                          p[B + 22] = 0;
                          p[B + 23] = 0;
                          p[B + 24] = p[Y + 9];
                          p[B + 25] = p[Y + 10];
                          bb = Ma;
                        }
                        $ = bb | 0;
                      } else {
                        if (10 == R) {
                          var Ea = an(u, 168), A = Ea >> 2;
                          if (0 == (Ea | 0)) {
                            var Ua = 0;
                          } else {
                            l[Ea >> 2] = mq + 8 | 0;
                            var ob = t + 8 | 0, Na = t + 12 | 0;
                            (l[ob >> 2] | 0) == (l[Na >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
                            l[A + 1] = l[T];
                            l[A + 2] = 0;
                            l[A + 3] = 0;
                            l[A + 12] = l[ob >> 2];
                            l[A + 13] = l[Na >> 2];
                            l[A + 14] = 0;
                            c[Ea + 61 | 0] = c[t + 16 | 0] & 1;
                            c[Ea + 60 | 0] = 0;
                            l[A + 16] = l[Y + 1];
                            v = (Ea + 16 | 0) >> 2;
                            l[v] = 0;
                            l[v + 1] = 0;
                            l[v + 2] = 0;
                            l[v + 3] = 0;
                            l[v + 4] = 0;
                            l[v + 5] = 0;
                            l[v + 6] = 0;
                            l[v + 7] = 0;
                            l[Ea >> 2] = Er + 8 | 0;
                            var Wa = Ea + 76 | 0, nb = t + 20 | 0, pa = Ea + 68 | 0, hb = l[nb + 4 >> 2];
                            l[pa >> 2] = l[nb >> 2];
                            l[pa + 4 >> 2] = hb;
                            var Ca = t + 28 | 0, ib = l[Ca + 4 >> 2];
                            l[Wa >> 2] = l[Ca >> 2];
                            l[Wa + 4 >> 2] = ib;
                            p[A + 21] = p[Y + 9];
                            p[A + 40] = 0;
                            p[A + 23] = 0;
                            l[A + 41] = 0;
                            p[A + 22] = 0;
                            Ua = Ea;
                          }
                          $ = Ua | 0;
                        } else {
                          S(O.o | 0, 113, O.bd | 0, O.k | 0), $ = 0;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      r = $;
      i = r >> 2;
      l[i + 2] = 0;
      h = (b + 102956 | 0) >> 2;
      l[i + 3] = l[h];
      var Za = l[h];
      0 != (Za | 0) && (l[(Za + 8 | 0) >> 2] = r);
      l[h] = r;
      var lb = b + 102964 | 0;
      l[lb >> 2] = l[lb >> 2] + 1 | 0;
      var qb = r + 16 | 0;
      l[i + 5] = r;
      g = (r + 52 | 0) >> 2;
      l[qb >> 2] = l[g];
      l[i + 6] = 0;
      f = (r + 48 | 0) >> 2;
      var vb = l[f], sb = vb + 108 | 0;
      l[i + 7] = l[sb >> 2];
      var Ab = l[sb >> 2];
      if (0 == (Ab | 0)) {
        var Bb = vb;
      } else {
        l[(Ab + 8 | 0) >> 2] = qb, Bb = l[f];
      }
      l[Bb + 108 >> 2] = qb;
      var Gb = r + 32 | 0;
      l[i + 9] = r;
      l[Gb >> 2] = l[f];
      l[i + 10] = 0;
      var Cb = l[g], pb = Cb + 108 | 0;
      l[i + 11] = l[pb >> 2];
      var ub = l[pb >> 2];
      if (0 == (ub | 0)) {
        var Eb = Cb;
      } else {
        l[(ub + 8 | 0) >> 2] = Gb, Eb = l[g];
      }
      l[Eb + 108 >> 2] = Gb;
      var Db = l[d + 8 >> 2];
      if (0 != (c[d + 16 | 0] & 1) << 24 >> 24) {
        var wb = r;
      } else {
        var Hb = l[l[d + 12 >> 2] + 112 >> 2];
        if (0 == (Hb | 0)) {
          wb = r;
        } else {
          var tb = Hb;
          for (e = tb >> 2; ; ) {
            if ((l[e] | 0) == (Db | 0)) {
              var xb = l[e + 1] + 4 | 0;
              l[xb >> 2] |= 8;
            }
            var Ib = l[e + 3];
            if (0 == (Ib | 0)) {
              wb = r;
              break a;
            }
            tb = Ib;
            e = tb >> 2;
          }
        }
      }
    } else {
      wb = 0;
    }
  } while (0);
  return wb;
}

function Fr(b, d, e, f) {
  var g, h, i, k, m = b >> 2, n = a;
  a += 88;
  var q, r = n + 8, t = n + 16, u = n + 24, v = n + 32, A = n + 40, C = n + 48, B = n + 56, y = n + 64;
  k = y >> 2;
  Gr(B);
  var z = l[B >> 2], F = .0010000000474974513 * (l[B + 4 >> 2] | 0), G = 0 <= F ? Math.floor(F) : Math.ceil(F);
  i = (b + 102868 | 0) >> 2;
  var H = l[i];
  if (0 == (H & 1 | 0)) {
    var E = H;
  } else {
    var I = b + 102872 | 0;
    Zo(I, I);
    var J = l[i] & -2, E = l[i] = J;
  }
  l[i] = E | 2;
  h = (y | 0) >> 2;
  p[h] = d;
  l[k + 3] = e;
  l[k + 4] = f;
  var L = 0 < d;
  p[k + 1] = L ? 1 / d : 0;
  var M = b + 102988 | 0;
  p[k + 2] = p[M >> 2] * d;
  c[y + 20 | 0] = c[b + 102992 | 0] & 1;
  Gr(C);
  var V = l[C >> 2], Q = .0010000000474974513 * (l[C + 4 >> 2] | 0), T = 0 <= Q ? Math.floor(Q) : Math.ceil(Q);
  dp(b + 102872 | 0);
  Gr(A);
  p[m + 25750] = ((1e3 * (l[A >> 2] - V) | 0) >>> 0) + .0010000000474974513 * (l[A + 4 >> 2] | 0) - (T >>> 0);
  if (!(0 == (c[b + 102995 | 0] & 1) << 24 >> 24 | L ^ 1)) {
    Gr(v);
    var Y = l[v >> 2], R = .0010000000474974513 * (l[v + 4 >> 2] | 0), P = 0 <= R ? Math.floor(R) : Math.ceil(R), aa, W, da, sa, ta, ja, ua, ha, wa, oa, Aa, Fa, La, xa, ca = b >> 2, Z = a;
    a += 116;
    var la = Z + 16, ya = Z + 24, fa = Z + 32;
    xa = fa >> 2;
    var $ = Z + 84;
    La = (b + 103008 | 0) >> 2;
    p[La] = 0;
    Fa = (b + 103012 | 0) >> 2;
    p[Fa] = 0;
    Aa = (b + 103016 | 0) >> 2;
    p[Aa] = 0;
    var eb = b + 102960 | 0, Sa = b + 102872 | 0, Da = b + 68 | 0;
    lp(fa, l[eb >> 2], l[ca + 25734], l[ca + 25741], Da, l[ca + 25736]);
    var na = b + 102952 | 0, ma = l[na >> 2], Ba = 0 == (ma | 0);
    a : do {
      if (!Ba) {
        for (var za = ma; ; ) {
          var Ha = za + 4 | 0;
          j[Ha >> 1] &= -2;
          var jb = l[za + 96 >> 2];
          if (0 == (jb | 0)) {
            break a;
          }
          za = jb;
        }
      }
    } while (0);
    var Ia = l[ca + 25733], $a = 0 == (Ia | 0);
    a : do {
      if (!$a) {
        for (var ba = Ia; ; ) {
          var qa = ba + 4 | 0;
          l[qa >> 2] &= -2;
          var ka = l[ba + 12 >> 2];
          if (0 == (ka | 0)) {
            break a;
          }
          ba = ka;
        }
      }
    } while (0);
    var ia = l[ca + 25739], va = 0 == (ia | 0);
    a : do {
      if (!va) {
        for (var Oa = ia; ; ) {
          c[Oa + 60 | 0] = 0;
          var Pa = l[Oa + 12 >> 2];
          if (0 == (Pa | 0)) {
            break a;
          }
          Oa = Pa;
        }
      }
    } while (0);
    var Ta = l[eb >> 2], Xa = Ta << 2;
    oa = (b + 102864 | 0) >> 2;
    var ab = l[oa];
    if (32 > (ab | 0)) {
      var kb = ab;
    } else {
      S(O.m | 0, 38, O.w | 0, O.D | 0), kb = l[oa];
    }
    wa = (b + 12 * kb + 102480 | 0) >> 2;
    l[ca + (3 * kb | 0) + 25621] = Xa;
    ha = (b + 102468 | 0) >> 2;
    var mb = l[ha];
    if (102400 < (mb + Xa | 0)) {
      var Qa = Oe(Xa);
      l[wa] = Qa;
      c[b + 12 * kb + 102488 | 0] = 1;
    } else {
      l[wa] = b + (mb + 68) | 0, c[b + 12 * kb + 102488 | 0] = 0, l[ha] = l[ha] + Xa | 0;
    }
    var Ma = b + 102472 | 0, bb = l[Ma >> 2] + Xa | 0;
    l[Ma >> 2] = bb;
    var Va = b + 102476 | 0, Ja = l[Va >> 2];
    l[Va >> 2] = (Ja | 0) > (bb | 0) ? Ja : bb;
    l[oa] = l[oa] + 1 | 0;
    var ga = l[wa];
    ua = (fa + 28 | 0) >> 2;
    var cb = fa + 36 | 0, gb = fa + 32 | 0, db = fa + 40 | 0;
    ja = (fa + 8 | 0) >> 2;
    for (var Ya = fa + 44 | 0, Ka = fa + 12 | 0, Ga = fa + 48 | 0, fb = fa + 16 | 0, Ea = b + 102968 | 0, Ua = b + 102976 | 0, ob = $ + 12 | 0, Na = $ + 16 | 0, Wa = $ + 20 | 0, nb = na; ; ) {
      var pa = l[nb >> 2];
      if (0 == (pa | 0)) {
        break;
      }
      ta = (pa + 4 | 0) >> 1;
      var hb = 34 == (j[ta] & 35) << 16 >> 16;
      a : do {
        if (hb && 0 != (l[pa >> 2] | 0)) {
          l[ua] = 0;
          l[cb >> 2] = 0;
          l[gb >> 2] = 0;
          l[ga >> 2] = pa;
          j[ta] |= 1;
          var Ca = l[db >> 2], ib = l[ja], Za = l[Ya >> 2], lb = l[Ka >> 2], qb = l[Ga >> 2], vb = l[fb >> 2], sb = 1, Ab = 0, Bb = 0, Gb = 0;
          b : for (;;) {
            for (var Cb = sb, pb = Ab; ; ) {
              if (0 >= (Cb | 0)) {
                break b;
              }
              var ub = Cb - 1 | 0, Eb = l[ga + (ub << 2) >> 2];
              sa = (Eb + 4 | 0) >> 1;
              0 == (j[sa] & 32) << 16 >> 16 && S(O.t | 0, 445, O.Ha | 0, O.Bf | 0);
              (pb | 0) < (Ca | 0) || S(O.J | 0, 54, O.ma | 0, O.Aa | 0);
              l[(Eb + 8 | 0) >> 2] = pb;
              l[((pb << 2) + ib | 0) >> 2] = Eb;
              var Db = pb + 1 | 0;
              l[ua] = Db;
              var wb = j[sa];
              0 == (wb & 2) << 16 >> 16 && (j[sa] = wb | 2, p[Eb + 144 >> 2] = 0);
              if (0 != (l[Eb >> 2] | 0)) {
                break;
              }
              Cb = ub;
              pb = Db;
            }
            for (var Hb = Eb + 112 | 0, tb = ub, xb = Gb; ; ) {
              var Ib = l[Hb >> 2];
              if (0 == (Ib | 0)) {
                break;
              }
              var Jb = l[Ib + 4 >> 2];
              da = (Jb + 4 | 0) >> 2;
              if (6 == (l[da] & 7 | 0)) {
                if (0 != (c[l[Jb + 48 >> 2] + 38 | 0] & 1) << 24 >> 24) {
                  var Lb = tb, Xb = xb;
                } else {
                  if (0 != (c[l[Jb + 52 >> 2] + 38 | 0] & 1) << 24 >> 24) {
                    Lb = tb, Xb = xb;
                  } else {
                    (xb | 0) < (Za | 0) || S(O.J | 0, 62, O.Ia | 0, O.Va | 0);
                    var Nb = xb + 1 | 0;
                    l[cb >> 2] = Nb;
                    l[((xb << 2) + lb | 0) >> 2] = Jb;
                    l[da] |= 1;
                    var Sb = l[Ib >> 2];
                    W = (Sb + 4 | 0) >> 1;
                    0 != (j[W] & 1) << 16 >> 16 ? Lb = tb : ((tb | 0) < (Ta | 0) || S(O.t | 0, 495, O.Ha | 0, O.Qb | 0), l[((tb << 2) + ga | 0) >> 2] = Sb, j[W] |= 1, Lb = tb + 1 | 0);
                    Xb = Nb;
                  }
                }
              } else {
                Lb = tb, Xb = xb;
              }
              Hb = Ib + 12 | 0;
              tb = Lb;
              xb = Xb;
            }
            for (var Ob = Eb + 108 | 0, Vb = tb, Zb = Bb; ; ) {
              var dc = l[Ob >> 2];
              if (0 == (dc | 0)) {
                sb = Vb;
                Ab = Db;
                Bb = Zb;
                Gb = xb;
                continue b;
              }
              var fc = dc + 4 | 0, kc = l[fc >> 2];
              if (0 == (c[kc + 60 | 0] & 1) << 24 >> 24) {
                var Fb = l[dc >> 2];
                aa = (Fb + 4 | 0) >> 1;
                if (0 == (j[aa] & 32) << 16 >> 16) {
                  var Wb = Vb, vc = Zb;
                } else {
                  (Zb | 0) < (qb | 0) || S(O.J | 0, 68, O.gd | 0, O.Ve | 0);
                  var $b = Zb + 1 | 0;
                  l[gb >> 2] = $b;
                  l[((Zb << 2) + vb | 0) >> 2] = kc;
                  c[l[fc >> 2] + 60 | 0] = 1;
                  0 != (j[aa] & 1) << 16 >> 16 ? Wb = Vb : ((Vb | 0) < (Ta | 0) || S(O.t | 0, 524, O.Ha | 0, O.Qb | 0), l[((Vb << 2) + ga | 0) >> 2] = Fb, j[aa] |= 1, Wb = Vb + 1 | 0);
                  vc = $b;
                }
              } else {
                Wb = Vb, vc = Zb;
              }
              Ob = dc + 12 | 0;
              Vb = Wb;
              Zb = vc;
            }
          }
          var Yb = fa, wc = $, xc = y, Hc = Ea, Bd = 0 != (c[Ua] & 1) << 24 >> 24, rc = ra, Rc = ra, Ic = ra, ad = ra, pc = ra, Pb = ra, Rb = ra, bd = ra, sc = ra, mc = ra, yc = ra, tc = ra, Jc = ra, uc = ra, ec = ra, Oc = ra, Sc = ra, lc = a;
          a += 204;
          var Kc = lc + 8, rd = lc + 16, Cd = lc + 24, kd = lc + 32, sd = lc + 40, Md = lc + 48, Nd = lc + 68, Vc = lc + 76, Fc = lc + 108, Sc = Fc >> 2, nc = lc + 152, Oc = nc >> 2;
          Gr(Nd);
          var jc = p[xc >> 2], ec = (Yb + 28 | 0) >> 2, gc = 0 < (l[ec] | 0);
          b : do {
            if (gc) {
              for (var Od = Yb + 8 | 0, Ae = Hc | 0, cd = Hc + 4 | 0, dd = Yb + 20 | 0, Bc = Yb + 24 | 0, qc = 0; ; ) {
                var zc = l[l[Od >> 2] + (qc << 2) >> 2], uc = zc >> 2, td = zc + 44 | 0, Cc = p[td >> 2], gf = p[uc + 12], Wc = p[uc + 14], ld = zc + 64 | 0, Pd = ld | 0, be = ld + 4 | 0, Qd = l[be >> 2], Hd = (w[0] = l[Pd >> 2], N[0]), ed = (w[0] = Qd, N[0]), Be = p[uc + 18], md = td, Pc = zc + 36 | 0, je = l[md + 4 >> 2];
                l[(Pc | 0) >> 2] = l[md >> 2];
                l[(Pc + 4 | 0) >> 2] = je;
                p[uc + 13] = Wc;
                if (2 == (l[uc] | 0)) {
                  var ce = p[uc + 35], ke = p[uc + 30], Cf = 1 - jc * p[uc + 33], le = 1 > Cf ? Cf : 1, hf = 0 > le ? 0 : le, Id = 1 - jc * p[uc + 34], Qc = 1 > Id ? Id : 1, me = (Be + jc * p[uc + 32] * p[uc + 21]) * (0 > Qc ? 0 : Qc), Rd = (Hd + (p[Ae >> 2] * ce + p[uc + 19] * ke) * jc) * hf, ve = (ed + (p[cd >> 2] * ce + p[uc + 20] * ke) * jc) * hf;
                } else {
                  me = Be, Rd = Hd, ve = ed;
                }
                var we = l[dd >> 2];
                p[(we >> 2) + (3 * qc | 0)] = Cc;
                p[(we + 4 >> 2) + (3 * qc | 0)] = gf;
                p[(l[dd >> 2] + 8 >> 2) + (3 * qc | 0)] = Wc;
                var Pe = l[Bc >> 2] + 12 * qc | 0, Ce = (N[0] = Rd, w[0]), Tc = (N[0] = ve, w[0]) | 0;
                l[(Pe | 0) >> 2] = 0 | Ce;
                l[(Pe + 4 | 0) >> 2] = Tc;
                p[(l[Bc >> 2] + 8 >> 2) + (3 * qc | 0)] = me;
                var hc = qc + 1 | 0;
                if ((hc | 0) >= (l[ec] | 0)) {
                  var ud = dd, Jc = ud >> 2, Sd = Bc, tc = Sd >> 2;
                  break b;
                }
                qc = hc;
              }
            } else {
              ud = Yb + 20 | 0, Jc = ud >> 2, Sd = Yb + 24 | 0, tc = Sd >> 2;
            }
          } while (0);
          Gr(kd);
          var Df = l[kd >> 2], Qe = .0010000000474974513 * (l[kd + 4 >> 2] | 0), Dd = 0 <= Qe ? Math.floor(Qe) : Math.ceil(Qe), yc = Vc >> 2, mc = xc >> 2;
          l[yc] = l[mc];
          l[yc + 1] = l[mc + 1];
          l[yc + 2] = l[mc + 2];
          l[yc + 3] = l[mc + 3];
          l[yc + 4] = l[mc + 4];
          l[yc + 5] = l[mc + 5];
          var Jd = l[Jc];
          l[Vc + 24 >> 2] = Jd;
          var jf = l[tc];
          l[Vc + 28 >> 2] = jf;
          sc = Fc >> 2;
          l[sc] = l[mc];
          l[sc + 1] = l[mc + 1];
          l[sc + 2] = l[mc + 2];
          l[sc + 3] = l[mc + 3];
          l[sc + 4] = l[mc + 4];
          l[sc + 5] = l[mc + 5];
          var kf = Yb + 12 | 0;
          l[Sc + 6] = l[kf >> 2];
          bd = (Yb + 36 | 0) >> 2;
          l[Sc + 7] = l[bd];
          l[Sc + 8] = Jd;
          l[Sc + 9] = jf;
          l[Sc + 10] = l[Yb >> 2];
          Hr(nc, Fc);
          Ir(nc);
          if (0 != (c[xc + 20 | 0] & 1) << 24 >> 24) {
            var Xc = ra, xe = ra, vd = nc + 48 | 0, Td = 0 < (l[vd >> 2] | 0);
            b : do {
              if (Td) {
                for (var Ef = nc + 40 | 0, xe = (nc + 28 | 0) >> 2, Lc = 0; ; ) {
                  var ne = l[Ef >> 2], Xc = ne >> 2, Yc = l[Xc + (38 * Lc | 0) + 28], De = l[Xc + (38 * Lc | 0) + 29], de = p[Xc + (38 * Lc | 0) + 30], Ee = p[Xc + (38 * Lc | 0) + 32], Zc = p[Xc + (38 * Lc | 0) + 31], cg = p[Xc + (38 * Lc | 0) + 33], oe = l[Xc + (38 * Lc | 0) + 36], Fe = l[xe], wd = Fe + 12 * Yc | 0, pe = l[wd + 4 >> 2], Ag = (w[0] = l[wd >> 2], N[0]), Re = (w[0] = pe, N[0]), lf = p[(Fe + 8 >> 2) + (3 * Yc | 0)], dg = Fe + 12 * De | 0, Bg = l[dg + 4 >> 2], Ge = (w[0] = l[dg >> 2], N[0]), He = (w[0] = Bg, N[0]), eg = p[(Fe + 8 >> 2) + (3 * De | 0)], Se = ne + 152 * Lc + 72 | 0, fg = l[Se + 4 >> 2], yi = (w[0] = l[Se >> 2], N[0]), $g = (w[0] = fg, N[0]), zi = -1 * yi, Mh = 0 < (oe | 0);
                  c : do {
                    if (Mh) {
                      for (var mf = He, ah = Ge, gg = Re, Ff = Ag, hg = lf, Gf = eg, Te = 0; ; ) {
                        var Nh = p[Xc + (38 * Lc | 0) + (9 * Te | 0) + 4], Oh = p[Xc + (38 * Lc | 0) + (9 * Te | 0) + 5], bh = yi * Nh + $g * Oh, nf = $g * Nh + zi * Oh, Ph = hg - Ee * (p[Xc + (38 * Lc | 0) + (9 * Te | 0)] * nf - p[Xc + (38 * Lc | 0) + (9 * Te | 0) + 1] * bh), Qh = Ff - bh * de, ch = gg - nf * de, dh = Gf + cg * (p[Xc + (38 * Lc | 0) + (9 * Te | 0) + 2] * nf - p[Xc + (38 * Lc | 0) + (9 * Te | 0) + 3] * bh), Cg = ah + bh * Zc, of = mf + nf * Zc, ig = Te + 1 | 0;
                        if ((ig | 0) == (oe | 0)) {
                          var Dg = of, Eg = Cg, Fg = ch, xd = Qh, ee = Ph, nd = dh;
                          break c;
                        }
                        mf = of;
                        ah = Cg;
                        gg = ch;
                        Ff = Qh;
                        hg = Ph;
                        Gf = dh;
                        Te = ig;
                      }
                    } else {
                      Dg = He, Eg = Ge, Fg = Re, xd = Ag, ee = lf, nd = eg;
                    }
                  } while (0);
                  var Hf = (N[0] = xd, w[0]), Ud = (N[0] = Fg, w[0]) | 0;
                  l[(wd | 0) >> 2] = 0 | Hf;
                  l[(wd + 4 | 0) >> 2] = Ud;
                  p[(l[xe] + 8 >> 2) + (3 * Yc | 0)] = ee;
                  var Ed = l[xe] + 12 * De | 0, jg = (N[0] = Eg, w[0]), Ai = (N[0] = Dg, w[0]) | 0;
                  l[(Ed | 0) >> 2] = 0 | jg;
                  l[(Ed + 4 | 0) >> 2] = Ai;
                  p[(l[xe] + 8 >> 2) + (3 * De | 0)] = nd;
                  var kg = Lc + 1 | 0;
                  if ((kg | 0) >= (l[vd >> 2] | 0)) {
                    break b;
                  }
                  Lc = kg;
                }
              }
            } while (0);
          }
          for (var Rb = (Yb + 32 | 0) >> 2, Pb = (Yb + 16 | 0) >> 2, If = 0; (If | 0) < (l[Rb] | 0); ) {
            var Vd = l[l[Pb] + (If << 2) >> 2];
            K[l[l[Vd >> 2] + 28 >> 2]](Vd, Vc);
            If = If + 1 | 0;
          }
          Gr(Cd);
          p[wc + 12 >> 2] = ((1e3 * (l[Cd >> 2] - Df) | 0) >>> 0) + .0010000000474974513 * (l[Cd + 4 >> 2] | 0) - (Dd >>> 0);
          Gr(rd);
          for (var Mc = l[rd >> 2], eh = .0010000000474974513 * (l[rd + 4 >> 2] | 0), Bi = 0 <= eh ? Math.floor(eh) : Math.ceil(eh), Rh = xc + 12 | 0, pf = 0; (pf | 0) < (l[Rh >> 2] | 0); ) {
            for (var Jf = 0; (Jf | 0) < (l[Rb] | 0); ) {
              var fh = l[l[Pb] + (Jf << 2) >> 2];
              K[l[l[fh >> 2] + 32 >> 2]](fh, Vc);
              Jf = Jf + 1 | 0;
            }
            Jr(nc);
            pf = pf + 1 | 0;
          }
          var Kf = l[Oc + 12], gh = 0 < (Kf | 0);
          b : do {
            if (gh) {
              for (var hh = l[Oc + 10], pc = hh >> 2, Gg = l[Oc + 11], fd = 0; ; ) {
                var Sh = l[Gg + (l[pc + (38 * fd | 0) + 37] << 2) >> 2], Th = hh + 152 * fd + 144 | 0, ih = 0 < (l[Th >> 2] | 0);
                c : do {
                  if (ih) {
                    for (var qf = 0; ; ) {
                      p[(Sh + 72 >> 2) + (5 * qf | 0)] = p[pc + (38 * fd | 0) + (9 * qf | 0) + 4];
                      p[(Sh + 76 >> 2) + (5 * qf | 0)] = p[pc + (38 * fd | 0) + (9 * qf | 0) + 5];
                      var Uh = qf + 1 | 0;
                      if ((Uh | 0) >= (l[Th >> 2] | 0)) {
                        break c;
                      }
                      qf = Uh;
                    }
                  }
                } while (0);
                var Vh = fd + 1 | 0;
                if ((Vh | 0) >= (Kf | 0)) {
                  break b;
                }
                fd = Vh;
              }
            }
          } while (0);
          Gr(Kc);
          p[wc + 16 >> 2] = ((1e3 * (l[Kc >> 2] - Mc) | 0) >>> 0) + .0010000000474974513 * (l[Kc + 4 >> 2] | 0) - (Bi >>> 0);
          var Ci = 0 < (l[ec] | 0);
          b : do {
            if (Ci) {
              for (var ye = 0; ; ) {
                var rf = o[Jc], ad = (rf + 12 * ye | 0) >> 2, Ie = l[ad + 1], Di = (w[0] = l[ad], N[0]), Hg = (w[0] = Ie, N[0]), Wh = p[(rf + 8 >> 2) + (3 * ye | 0)], Je = l[tc], Lf = Je + 12 * ye | 0, gd = l[Lf + 4 >> 2], Mf = (w[0] = l[Lf >> 2], N[0]), jh = (w[0] = gd, N[0]), kh = p[(Je + 8 >> 2) + (3 * ye | 0)], lh = Mf * jc, mh = jh * jc, Ei = lh * lh + mh * mh;
                if (4 < Ei) {
                  var Nf = 2 / Hh(Ei), nh = Mf * Nf, Ke = jh * Nf;
                } else {
                  nh = Mf, Ke = jh;
                }
                var Ig = jc * kh, Fi = 2.4674012660980225 < Ig * Ig ? kh * (1.5707963705062866 / (0 < Ig ? Ig : -Ig)) : kh, lg = Hg + Ke * jc, oh = Wh + jc * Fi, Ue = (N[0] = Di + nh * jc, w[0]), Xh = (N[0] = lg, w[0]) | 0;
                l[ad] = 0 | Ue;
                l[ad + 1] = Xh;
                p[(l[Jc] + 8 >> 2) + (3 * ye | 0)] = oh;
                var ph = l[tc] + 12 * ye | 0, qh = (N[0] = nh, w[0]), Yh = (N[0] = Ke, w[0]) | 0;
                l[(ph | 0) >> 2] = 0 | qh;
                l[(ph + 4 | 0) >> 2] = Yh;
                p[(l[tc] + 8 >> 2) + (3 * ye | 0)] = Fi;
                var Of = ye + 1 | 0;
                if ((Of | 0) >= (l[ec] | 0)) {
                  break b;
                }
                ye = Of;
              }
            }
          } while (0);
          Gr(lc);
          for (var rh = l[lc >> 2], Zh = .0010000000474974513 * (l[lc + 4 >> 2] | 0), rj = 0 <= Zh ? Math.floor(Zh) : Math.ceil(Zh), sh = xc + 16 | 0, sf = 0; ; ) {
            if ((sf | 0) >= (l[sh >> 2] | 0)) {
              var $h = 1;
              break;
            }
            var Gi, mg = nc, od = ra, Wd = ra, tf = a;
            a += 52;
            var ng = tf + 16, Ve = tf + 32, og = mg + 48 | 0, pg = 0 < (l[og >> 2] | 0);
            b : do {
              if (pg) {
                for (var sj = mg + 36 | 0, Wd = (mg + 24 | 0) >> 2, Le = tf + 8 | 0, Hi = tf + 12 | 0, ai = ng + 8 | 0, th = ng + 12 | 0, Xd = tf, qg = ng, We = Ve, Jg = Ve + 8 | 0, Pf = Ve + 16 | 0, Yd = 0, Kg = 0; ; ) {
                  var Xe = l[sj >> 2], od = Xe >> 2, bi = Xe + 88 * Yd | 0, rg = l[od + (22 * Yd | 0) + 8], Lg = l[od + (22 * Yd | 0) + 9], uh = Xe + 88 * Yd + 48 | 0, Ii = l[uh + 4 >> 2], Mg = (w[0] = l[uh >> 2], N[0]), Ng = (w[0] = Ii, N[0]), vh = p[od + (22 * Yd | 0) + 10], qe = p[od + (22 * Yd | 0) + 16], ci = Xe + 88 * Yd + 56 | 0, wh = l[ci + 4 >> 2], tj = (w[0] = l[ci >> 2], N[0]), Dk = (w[0] = wh, N[0]), uj = p[od + (22 * Yd | 0) + 11], vj = p[od + (22 * Yd | 0) + 17], wj = l[od + (22 * Yd | 0) + 21], di = l[Wd], Ek = di + 12 * rg | 0, sg = l[Ek + 4 >> 2], Ji = (w[0] = l[Ek >> 2], N[0]), Qf = (w[0] = sg, N[0]), Fk = p[(di + 8 >> 2) + (3 * rg | 0)], Ki = di + 12 * Lg | 0, Ql = l[Ki + 4 >> 2], xj = (w[0] = l[Ki >> 2], N[0]), yj = (w[0] = Ql, N[0]), zj = p[(di + 8 >> 2) + (3 * Lg | 0)];
                  if (0 < (wj | 0)) {
                    for (var Aj = vh + uj, ei = yj, xh = xj, yh = Qf, Rf = Ji, Li = Fk, zh = zj, Bj = Kg, Gk = 0; ; ) {
                      var Ah = Dm(Li);
                      p[Le >> 2] = Ah;
                      var fi = Em(Li);
                      p[Hi >> 2] = fi;
                      var tg = Dm(zh);
                      p[ai >> 2] = tg;
                      var gi = Em(zh);
                      p[th >> 2] = gi;
                      var Hk = yh - (Ah * Mg + fi * Ng), Rl = (N[0] = Rf - (fi * Mg - Ah * Ng), w[0]), Cj = (N[0] = Hk, w[0]) | 0;
                      l[Xd >> 2] = 0 | Rl;
                      l[Xd + 4 >> 2] = Cj;
                      var Mi = ei - (tg * tj + gi * Dk), Sl = (N[0] = xh - (gi * tj - tg * Dk), w[0]), Tl = (N[0] = Mi, w[0]) | 0;
                      l[qg >> 2] = 0 | Sl;
                      l[qg + 4 >> 2] = Tl;
                      Kr(Ve, bi, tf, ng, Gk);
                      var Ik = l[We + 4 >> 2], Ni = (w[0] = l[We >> 2], N[0]), Og = (w[0] = Ik, N[0]), Ul = l[Jg + 4 >> 2], Jk = (w[0] = l[Jg >> 2], N[0]), Dj = (w[0] = Ul, N[0]), hi = p[Pf >> 2], Ej = Jk - Rf, Kk = Dj - yh, Vl = Jk - xh, Fj = Dj - ei, Gj = Bj < hi ? Bj : hi, Me = .20000000298023224 * (hi + .004999999888241291), Wl = 0 > Me ? Me : 0, Hj = Ej * Og - Kk * Ni, Oi = Vl * Og - Fj * Ni, Ij = Aj + qe * Hj * Hj + vj * Oi * Oi, Jj = 0 < Ij ? -(-.20000000298023224 > Wl ? -.20000000298023224 : Wl) / Ij : 0, Pi = Ni * Jj, ii = Og * Jj, Kj = Rf - Pi * vh, Lj = yh - ii * vh, Mj = Li - qe * (Ej * ii - Kk * Pi), ji = xh + Pi * uj, Qi = ei + ii * uj, Pg = zh + vj * (Vl * ii - Fj * Pi), Lk = Gk + 1 | 0;
                      if ((Lk | 0) == (wj | 0)) {
                        break;
                      }
                      ei = Qi;
                      xh = ji;
                      yh = Lj;
                      Rf = Kj;
                      Li = Mj;
                      zh = Pg;
                      Bj = Gj;
                      Gk = Lk;
                    }
                    var Sf = Qi, Nj = ji, Oj = Lj, Pj = Kj, Qj = Mj, Rj = Pg, Ri = Gj, Mk = l[Wd];
                  } else {
                    Sf = yj, Nj = xj, Oj = Qf, Pj = Ji, Qj = Fk, Rj = zj, Ri = Kg, Mk = di;
                  }
                  var Sj = Mk + 12 * rg | 0, Qg = (N[0] = Pj, w[0]), Nk = (N[0] = Oj, w[0]) | 0;
                  l[(Sj | 0) >> 2] = 0 | Qg;
                  l[(Sj + 4 | 0) >> 2] = Nk;
                  p[(l[Wd] + 8 >> 2) + (3 * rg | 0)] = Qj;
                  var Si = l[Wd] + 12 * Lg | 0, Ok = (N[0] = Nj, w[0]), dn = (N[0] = Sf, w[0]) | 0;
                  l[(Si | 0) >> 2] = 0 | Ok;
                  l[(Si + 4 | 0) >> 2] = dn;
                  p[(l[Wd] + 8 >> 2) + (3 * Lg | 0)] = Rj;
                  var Ti = Yd + 1 | 0;
                  if ((Ti | 0) >= (l[og >> 2] | 0)) {
                    var Pk = Ri;
                    break b;
                  }
                  Yd = Ti;
                  Kg = Ri;
                }
              } else {
                Pk = 0;
              }
            } while (0);
            a = tf;
            Gi = -.014999999664723873 <= Pk;
            for (var Ui = 0, Vi = 1; (Ui | 0) < (l[Rb] | 0); ) {
              var Wi = l[l[Pb] + (Ui << 2) >> 2], Xl = K[l[l[Wi >> 2] + 36 >> 2]](Wi, Vc), Xi = Vi & Xl, Ui = Ui + 1 | 0, Vi = Xi;
            }
            if (Gi & Vi) {
              $h = 0;
              break;
            }
            sf = sf + 1 | 0;
          }
          var Yi = 0 < (l[ec] | 0);
          b : do {
            if (Yi) {
              for (var Qk = Yb + 8 | 0, Rg = 0; ; ) {
                var Yl = l[l[Qk >> 2] + (Rg << 2) >> 2], Ic = Yl >> 2, tp = l[Jc] + 12 * Rg | 0, Rk = Yl + 44 | 0, Zl = l[tp >> 2], en = l[tp + 4 >> 2], Pd = Rk | 0;
                l[Pd >> 2] = Zl;
                be = Rk + 4 | 0;
                l[be >> 2] = en;
                var $l = p[(l[Jc] + 8 >> 2) + (3 * Rg | 0)];
                p[Ic + 14] = $l;
                var fn = l[tc] + 12 * Rg | 0, am = Yl + 64 | 0, $r = l[fn + 4 >> 2];
                l[(am | 0) >> 2] = l[fn >> 2];
                l[(am + 4 | 0) >> 2] = $r;
                p[Ic + 18] = p[(l[tc] + 8 >> 2) + (3 * Rg | 0)];
                var Sk = Dm($l);
                p[Ic + 5] = Sk;
                var Tf = Em($l);
                p[Ic + 6] = Tf;
                var bm = Yl + 12 | 0, Tk = p[Ic + 7], Uk = p[Ic + 8], Zi = Tf * Tk - Sk * Uk, cm = Sk * Tk + Tf * Uk, gn = (w[0] = Zl, N[0]) - Zi, hn = (w[0] = en, N[0]) - cm, up = bm, as = (N[0] = gn, w[0]), bs = (N[0] = hn, w[0]) | 0;
                l[(up | 0) >> 2] = 0 | as;
                l[(up + 4 | 0) >> 2] = bs;
                var vp = Rg + 1 | 0;
                if ((vp | 0) >= (l[ec] | 0)) {
                  break b;
                }
                Rg = vp;
              }
            }
          } while (0);
          Gr(sd);
          p[wc + 20 >> 2] = ((1e3 * (l[sd >> 2] - rh) | 0) >>> 0) + .0010000000474974513 * (l[sd + 4 >> 2] | 0) - (rj >>> 0);
          var wp = o[Oc + 10], Rc = wp >> 2, xp = Yb + 4 | 0, cs = 0 == (l[xp >> 2] | 0);
          b : do {
            if (!cs && 0 < (l[bd] | 0)) {
              for (var ds = Md + 16 | 0, Tj = 0; ; ) {
                var es = l[l[kf >> 2] + (Tj << 2) >> 2], ug = l[Rc + (38 * Tj | 0) + 36];
                l[ds >> 2] = ug;
                var Vk = 0 < (ug | 0);
                c : do {
                  if (Vk) {
                    for (var $i = 0; ; ) {
                      p[Md + ($i << 2) >> 2] = p[Rc + (38 * Tj | 0) + (9 * $i | 0) + 4];
                      p[Md + ($i << 2) + 8 >> 2] = p[Rc + (38 * Tj | 0) + (9 * $i | 0) + 5];
                      var Wk = $i + 1 | 0;
                      if ((Wk | 0) == (ug | 0)) {
                        break c;
                      }
                      $i = Wk;
                    }
                  }
                } while (0);
                var Uj = l[xp >> 2];
                K[l[l[Uj >> 2] + 20 >> 2]](Uj, es, Md);
                var jn = Tj + 1 | 0;
                if ((jn | 0) >= (l[bd] | 0)) {
                  break b;
                }
                Tj = jn;
              }
            }
          } while (0);
          b : do {
            if (Bd && 0 < (l[ec] | 0)) {
              for (var kn = Yb + 8 | 0, Xk = 3.4028234663852886e+38, dm = 0; ; ) {
                var vg = l[l[kn >> 2] + (dm << 2) >> 2], fs = 0 == (l[vg >> 2] | 0);
                c : do {
                  if (fs) {
                    var Vj = Xk;
                  } else {
                    var yp = 0 == (j[vg + 4 >> 1] & 4) << 16 >> 16;
                    do {
                      if (!yp) {
                        var zp = p[vg + 72 >> 2];
                        if (.001218469929881394 >= zp * zp) {
                          var ln = p[vg + 64 >> 2], Wj = p[vg + 68 >> 2];
                          if (9999999747378752e-20 >= ln * ln + Wj * Wj) {
                            var mn = vg + 144 | 0, em = p[mn >> 2] + jc;
                            p[mn >> 2] = em;
                            Vj = Xk < em ? Xk : em;
                            break c;
                          }
                        }
                      }
                    } while (0);
                    Vj = p[vg + 144 >> 2] = 0;
                  }
                } while (0);
                var nn = dm + 1 | 0, on = o[ec];
                if ((nn | 0) >= (on | 0)) {
                  break;
                }
                Xk = Vj;
                dm = nn;
              }
              if (0 < (on | 0) & ((.5 > Vj | $h) ^ 1)) {
                for (var fm = 0; ; ) {
                  var pn = o[l[kn >> 2] + (fm << 2) >> 2], rc = pn >> 2, gm = pn + 4 | 0;
                  j[gm >> 1] &= -3;
                  p[rc + 36] = 0;
                  p[rc + 16] = 0;
                  p[rc + 17] = 0;
                  p[rc + 18] = 0;
                  p[rc + 19] = 0;
                  p[rc + 20] = 0;
                  p[rc + 21] = 0;
                  var hm = fm + 1 | 0;
                  if ((hm | 0) >= (l[ec] | 0)) {
                    break b;
                  }
                  fm = hm;
                }
              }
            }
          } while (0);
          var qn = l[Oc + 8];
          ho(qn, wp);
          ho(qn, l[Oc + 9]);
          a = lc;
          p[La] += p[ob >> 2];
          p[Fa] += p[Na >> 2];
          p[Aa] += p[Wa >> 2];
          var rn = l[ua];
          if (0 < (rn | 0)) {
            for (var Ap = l[ja], im = 0; ; ) {
              var jm = l[Ap + (im << 2) >> 2];
              if (0 == (l[jm >> 2] | 0)) {
                var sn = jm + 4 | 0;
                j[sn >> 1] &= -2;
              }
              var tn = im + 1 | 0;
              if ((tn | 0) >= (rn | 0)) {
                break a;
              }
              im = tn;
            }
          }
        }
      } while (0);
      nb = pa + 96 | 0;
    }
    ho(Da, ga);
    Gr(la);
    for (var Bp = l[la >> 2], un = .0010000000474974513 * (l[la + 4 >> 2] | 0), gs = 0 <= un ? Math.floor(un) : Math.ceil(un), Cp = Z + 8 | 0, hs = Z + 12 | 0, Dp = na; ; ) {
      var uf = l[Dp >> 2];
      if (0 == (uf | 0)) {
        break;
      }
      var is = 0 == (j[uf + 4 >> 1] & 1) << 16 >> 16;
      a : do {
        if (!is && 0 != (l[uf >> 2] | 0)) {
          var Ep = p[uf + 52 >> 2], vn = Dm(Ep);
          p[Cp >> 2] = vn;
          var wn = Em(Ep);
          p[hs >> 2] = wn;
          var Fp = p[uf + 28 >> 2], Gp = p[uf + 32 >> 2], js = p[uf + 40 >> 2] - (vn * Fp + wn * Gp), Yk = (N[0] = p[uf + 36 >> 2] - (wn * Fp - vn * Gp), w[0]), xn = (N[0] = js, w[0]) | 0;
          l[Z >> 2] = 0 | Yk;
          l[Z + 4 >> 2] = xn;
          var km = l[uf + 88 >> 2] + 102872 | 0, Zk = l[uf + 100 >> 2];
          if (0 != (Zk | 0)) {
            for (var yn = uf + 12 | 0, $k = Zk; ; ) {
              Ro($k, km, Z, yn);
              var al = l[$k + 4 >> 2];
              if (0 == (al | 0)) {
                break a;
              }
              $k = al;
            }
          }
        }
      } while (0);
      Dp = uf + 96 | 0;
    }
    Zo(Sa, Sa);
    Gr(ya);
    p[ca + 25755] = ((1e3 * (l[ya >> 2] - Bp) | 0) >>> 0) + .0010000000474974513 * (l[ya + 4 >> 2] | 0) - (gs >>> 0);
    var ki = o[xa];
    ho(ki, l[xa + 5]);
    ho(ki, l[xa + 6]);
    ho(ki, l[fb >> 2]);
    ho(ki, l[Ka >> 2]);
    ho(ki, l[ja]);
    a = Z;
    Gr(u);
    p[m + 25751] = ((1e3 * (l[u >> 2] - Y) | 0) >>> 0) + .0010000000474974513 * (l[u + 4 >> 2] | 0) - (P >>> 0);
  }
  if (0 == (c[b + 102993 | 0] & 1) << 24 >> 24) {
    q = 10;
  } else {
    var lm = p[h];
    if (0 < lm) {
      Gr(t);
      var mm = l[t >> 2], bl = .0010000000474974513 * (l[t + 4 >> 2] | 0), nm = 0 <= bl ? Math.floor(bl) : Math.ceil(bl), cl, aj, Xj, Sg, Yj, bj, cj, li, Bh, Zj, $j, dl, el, ak, dj, bk, ck, ej, Ch, Dh, fj, gj, hj, dk, ek, fl, fk, gk, hk, mi, gl, hl, il, om, jl, ij, Tg, pm, ik, jj, Ug, kl, qm, ll, wg = a;
      a += 240;
      var rm, xg = wg + 16;
      ll = xg >> 2;
      var Ye = wg + 68, ml = wg + 200, zn = wg + 208, Uf = wg + 216, jk = b + 68 | 0, sm = b + 102872 | 0;
      qm = (b + 102944 | 0) >> 2;
      lp(xg, 64, 32, 0, jk, l[qm]);
      var An = b + 102995 | 0, ks = 0 == (c[An] & 1) << 24 >> 24;
      a : do {
        if (ks) {
          var tm = b + 102932 | 0;
        } else {
          var um = l[b + 102952 >> 2], Hp = 0 == (um | 0);
          b : do {
            if (!Hp) {
              for (var kj = um; ; ) {
                var Ip = kj + 4 | 0;
                j[Ip >> 1] &= -2;
                p[kj + 60 >> 2] = 0;
                var vm = l[kj + 96 >> 2];
                if (0 == (vm | 0)) {
                  break b;
                }
                kj = vm;
              }
            }
          } while (0);
          var kk = b + 102932 | 0, lk = l[kk >> 2];
          if (0 == (lk | 0)) {
            tm = kk;
          } else {
            var nl = lk;
            for (kl = nl >> 2; ; ) {
              var Jp = nl + 4 | 0;
              l[Jp >> 2] &= -34;
              l[kl + 32] = 0;
              p[kl + 33] = 1;
              var Bn = l[kl + 3];
              if (0 == (Bn | 0)) {
                tm = kk;
                break a;
              }
              nl = Bn;
              kl = nl >> 2;
            }
          }
        }
      } while (0);
      var ls = Ye + 16 | 0, ms = Ye + 20 | 0, Kp = Ye + 24 | 0, Cn = Ye + 44 | 0, Lp = Ye + 48 | 0, Dn = Ye + 52 | 0, En = Ye | 0, wm = Ye + 28 | 0, Mp = Ye + 56 | 0, Np = Ye + 92 | 0, Op = Ye + 128 | 0, Fn = ml | 0, xm = ml + 4 | 0;
      Ug = (xg + 28 | 0) >> 2;
      jj = (xg + 36 | 0) >> 2;
      var ol = xg + 32 | 0, Gn = xg + 40 | 0;
      ik = (xg + 8 | 0) >> 2;
      var Pp = xg + 44 | 0;
      pm = (xg + 12 | 0) >> 2;
      for (var Qp = zn | 0, ns = zn + 4 | 0, os = y | 0, Rp = Uf | 0, Hn = Uf + 4 | 0, Sp = Uf + 8 | 0, Tp = Uf + 16 | 0, Up = y + 12 | 0, Vp = Uf + 12 | 0, Wp = Uf + 20 | 0, Xp = wg + 8 | 0, ps = wg + 12 | 0, qs = b + 102994 | 0, re = 0, Zd = 1, In = tm; ; ) {
        var pl = l[In >> 2];
        Tg = pl >> 2;
        if (0 == (pl | 0)) {
          if (0 == (re | 0) | .9999988079071045 < Zd) {
            var Jn = 1, Kn = l[ik];
            break;
          }
          var pd = l[l[re + 48 >> 2] + 8 >> 2], hd = l[l[re + 52 >> 2] + 8 >> 2];
          ij = (pd + 28 | 0) >> 2;
          var Ln = p[ij];
          jl = (pd + 32 | 0) >> 2;
          var Mn = p[jl], Nn = pd + 36 | 0, On = p[Nn >> 2];
          om = (pd + 40 | 0) >> 2;
          var Pn = p[om];
          il = (pd + 44 | 0) >> 2;
          var Yp = p[il];
          hl = (pd + 48 | 0) >> 2;
          var Qn = p[hl];
          gl = (pd + 52 | 0) >> 2;
          var Zp = p[gl];
          mi = (pd + 56 | 0) >> 2;
          var $p = p[mi];
          hk = (pd + 60 | 0) >> 2;
          var ym = p[hk];
          gk = (hd + 28 | 0) >> 2;
          var aq = p[gk];
          fk = (hd + 32 | 0) >> 2;
          var rs = p[fk], bq = hd + 36 | 0, cq = p[bq >> 2];
          fl = (hd + 40 | 0) >> 2;
          var Rn = p[fl];
          ek = (hd + 44 | 0) >> 2;
          var dq = p[ek];
          dk = (hd + 48 | 0) >> 2;
          var Sn = p[dk];
          hj = (hd + 52 | 0) >> 2;
          var eq = p[hj];
          gj = (hd + 56 | 0) >> 2;
          var fq = p[gj];
          fj = (hd + 60 | 0) >> 2;
          var gq = p[fj];
          if (1 > ym) {
            var zm = ym, Tn = On, Un = Pn, Vn = Yp, Wn = Qn, Xn = Zp, hq = $p, Am = Ln, Yn = Mn, iq = pd + 36 | 0;
          } else {
            S(O.aa | 0, 723, O.X | 0, O.T | 0);
            var Zn = pd + 36 | 0, zm = p[hk], Tn = p[Zn >> 2], Un = p[om], Vn = p[il], Wn = p[hl], Xn = p[gl], hq = p[mi], Am = p[ij], Yn = p[jl], iq = Zn;
          }
          var ql = (Zd - zm) / (1 - zm), $n = 1 - ql, jq = Tn * $n + Vn * ql, ao = Un * $n + Wn * ql, Bm = iq, kq = (N[0] = jq, w[0]), bo = (N[0] = ao, w[0]), rx = 0 | kq, sx = bo | 0, sl = Bm | 0;
          Dh = sl >> 2;
          l[Dh] = rx;
          var tl = Bm + 4 | 0;
          Ch = tl >> 2;
          l[Ch] = sx;
          var uq = $n * Xn + ql * hq;
          p[gl] = uq;
          p[hk] = Zd;
          var tx = pd + 44 | 0, Ks = tx | 0;
          l[Ks >> 2] = rx;
          var Ls = tx + 4 | 0;
          l[Ls >> 2] = sx;
          p[mi] = uq;
          var Ms = Dm(uq), ux = pd + 20 | 0;
          p[ux >> 2] = Ms;
          var Ns = Em(uq), vx = pd + 24 | 0;
          p[vx >> 2] = Ns;
          var pO = ao - (Ms * Am + Ns * Yn), vq = pd + 12 | 0, qO = (N[0] = jq - (Ns * Am - Ms * Yn), w[0]), rO = (N[0] = pO, w[0]) | 0, Os = vq | 0;
          l[Os >> 2] = 0 | qO;
          var Ps = vq + 4 | 0;
          l[Ps >> 2] = rO;
          var wx = p[fj];
          if (1 > wx) {
            var Qs = wx;
          } else {
            S(O.aa | 0, 723, O.X | 0, O.T | 0), Qs = p[fj];
          }
          var wq = (Zd - Qs) / (1 - Qs), xx = hd + 36 | 0, Rs = 1 - wq, yx = p[xx >> 2] * Rs + p[ek] * wq, zx = p[fl] * Rs + p[dk] * wq, Ax = xx, sO = (N[0] = yx, w[0]), tO = (N[0] = zx, w[0]), Bx = 0 | sO, Cx = tO | 0;
          l[(Ax | 0) >> 2] = Bx;
          l[(Ax + 4 | 0) >> 2] = Cx;
          var xq = Rs * p[hj] + wq * p[gj];
          p[hj] = xq;
          p[fj] = Zd;
          var Dx = hd + 44 | 0;
          l[(Dx | 0) >> 2] = Bx;
          l[(Dx + 4 | 0) >> 2] = Cx;
          p[gj] = xq;
          var Ss = Dm(xq), Ex = hd + 20 | 0;
          p[Ex >> 2] = Ss;
          var Ts = Em(xq), Fx = hd + 24 | 0;
          p[Fx >> 2] = Ts;
          var Gx = p[gk], Hx = p[fk], uO = zx - (Ss * Gx + Ts * Hx), yq = hd + 12 | 0, vO = (N[0] = yx - (Ts * Gx - Ss * Hx), w[0]), wO = (N[0] = uO, w[0]) | 0;
          l[(yq | 0) >> 2] = 0 | vO;
          l[(yq + 4 | 0) >> 2] = wO;
          ep(re, l[qm]);
          ej = (re + 4 | 0) >> 2;
          var Us = l[ej];
          l[ej] = Us & -33;
          var Ix = re + 128 | 0;
          l[Ix >> 2] = l[Ix >> 2] + 1 | 0;
          if (6 == (Us & 6 | 0)) {
            ck = (pd + 4 | 0) >> 1;
            var Jx = j[ck];
            0 == (Jx & 2) << 16 >> 16 && (j[ck] = Jx | 2, p[pd + 144 >> 2] = 0);
            bk = (hd + 4 | 0) >> 1;
            var Kx = j[bk];
            0 == (Kx & 2) << 16 >> 16 && (j[bk] = Kx | 2, p[hd + 144 >> 2] = 0);
            l[Ug] = 0;
            l[jj] = 0;
            l[ol >> 2] = 0;
            var Lx = l[Gn >> 2];
            if (0 < (Lx | 0)) {
              var Vs = pd + 8 | 0;
              l[Vs >> 2] = 0;
              var Ws = l[ik];
              l[Ws >> 2] = pd;
              l[Ug] = 1;
              if (1 < (Lx | 0)) {
                var Mx = Vs, Nx = Ws;
                rm = 69;
              } else {
                Ox = Vs, Px = Ws, rm = 68;
              }
            } else {
              S(O.J | 0, 54, O.ma | 0, O.Aa | 0);
              var Qx = pd + 8 | 0;
              l[Qx >> 2] = 0;
              var Rx = l[ik];
              l[Rx >> 2] = pd;
              l[Ug] = 1;
              var Ox = Qx, Px = Rx;
              rm = 68;
            }
            68 == rm && (S(O.J | 0, 54, O.ma | 0, O.Aa | 0), Mx = Ox, Nx = Px);
            var Sx = hd + 8 | 0;
            l[Sx >> 2] = 1;
            l[Nx + 4 >> 2] = hd;
            l[Ug] = 2;
            0 < (l[Pp >> 2] | 0) || S(O.J | 0, 62, O.Ia | 0, O.Va | 0);
            l[jj] = 1;
            l[l[pm] >> 2] = re;
            j[ck] |= 1;
            j[bk] |= 1;
            l[ej] |= 1;
            l[Qp >> 2] = pd;
            l[ns >> 2] = hd;
            for (var Tx = l[Gn >> 2], Ux = l[Pp >> 2], xO = l[pm], yO = l[ik], zq = 0; 2 > (zq | 0); ) {
              var Xs = l[zn + (zq << 2) >> 2], zO = 2 == (l[Xs >> 2] | 0);
              a : do {
                if (zO) {
                  for (var AO = Xs + 4 | 0, Vx = Xs + 112 | 0; ; ) {
                    var Aq = l[Vx >> 2];
                    if (0 == (Aq | 0)) {
                      break a;
                    }
                    var io = l[Ug];
                    if ((io | 0) == (Tx | 0)) {
                      break a;
                    }
                    var Bq = l[jj];
                    if ((Bq | 0) == (Ux | 0)) {
                      break a;
                    }
                    var jo = l[Aq + 4 >> 2];
                    dj = (jo + 4 | 0) >> 2;
                    var BO = 0 == (l[dj] & 1 | 0);
                    b : do {
                      if (BO) {
                        var $c = l[Aq >> 2], Wx = $c | 0, CO = 2 == (l[Wx >> 2] | 0);
                        do {
                          if (CO && 0 == (j[AO >> 1] & 8) << 16 >> 16 && 0 == (j[$c + 4 >> 1] & 8) << 16 >> 16) {
                            break b;
                          }
                        } while (0);
                        if (0 == (c[l[jo + 48 >> 2] + 38 | 0] & 1) << 24 >> 24 && 0 == (c[l[jo + 52 >> 2] + 38 | 0] & 1) << 24 >> 24) {
                          ak = ($c + 28 | 0) >> 2;
                          var ul = p[ak];
                          el = ($c + 32 | 0) >> 2;
                          var vl = p[el];
                          dl = ($c + 36 | 0) >> 2;
                          var Ys = p[dl];
                          $j = ($c + 40 | 0) >> 2;
                          var Zs = p[$j];
                          Zj = ($c + 44 | 0) >> 2;
                          var ko = p[Zj];
                          Bh = ($c + 48 | 0) >> 2;
                          var lo = p[Bh];
                          li = ($c + 52 | 0) >> 2;
                          var $s = p[li];
                          cj = ($c + 56 | 0) >> 2;
                          var wl = p[cj];
                          bj = ($c + 60 | 0) >> 2;
                          var Cq = p[bj];
                          Yj = ($c + 4 | 0) >> 1;
                          if (0 == (j[Yj] & 1) << 16 >> 16) {
                            if (1 > Cq) {
                              var at = Cq, Xx = Ys, Yx = Zs, Zx = ko, $x = lo, ay = $s, by = wl, bt = ul, ct = vl, cy = $c + 36 | 0;
                            } else {
                              S(O.aa | 0, 723, O.X | 0, O.T | 0);
                              var dy = $c + 36 | 0, at = p[bj], Xx = p[dy >> 2], Yx = p[$j], Zx = p[Zj], $x = p[Bh], ay = p[li], by = p[cj], bt = p[ak], ct = p[el], cy = dy;
                            }
                            var Dq = (Zd - at) / (1 - at), dt = 1 - Dq, ey = Xx * dt + Zx * Dq, fy = Yx * dt + $x * Dq, gy = cy, DO = (N[0] = ey, w[0]), EO = (N[0] = fy, w[0]), hy = 0 | DO, iy = EO | 0, sl = gy | 0;
                            Dh = sl >> 2;
                            l[Dh] = hy;
                            tl = gy + 4 | 0;
                            Ch = tl >> 2;
                            l[Ch] = iy;
                            var Eq = dt * ay + Dq * by;
                            p[li] = Eq;
                            p[bj] = Zd;
                            var jy = $c + 44 | 0, Ks = jy | 0;
                            l[Ks >> 2] = hy;
                            Ls = jy + 4 | 0;
                            l[Ls >> 2] = iy;
                            p[cj] = Eq;
                            var et = Dm(Eq);
                            p[$c + 20 >> 2] = et;
                            var ft = Em(Eq);
                            p[$c + 24 >> 2] = ft;
                            var FO = fy - (et * bt + ft * ct), ky = $c + 12 | 0, GO = (N[0] = ey - (ft * bt - et * ct), w[0]), HO = (N[0] = FO, w[0]) | 0, Os = ky | 0;
                            l[Os >> 2] = 0 | GO;
                            Ps = ky + 4 | 0;
                            l[Ps >> 2] = HO;
                          }
                          ep(jo, l[qm]);
                          var gt = l[dj];
                          if (0 == (gt & 4 | 0)) {
                            p[ak] = ul;
                            p[el] = vl;
                            p[dl] = Ys;
                            p[$j] = Zs;
                            p[Zj] = ko;
                            p[Bh] = lo;
                            p[li] = $s;
                            p[cj] = wl;
                            p[bj] = Cq;
                            var ht = Dm(wl);
                            p[$c + 20 >> 2] = ht;
                            var it = Em(wl);
                            p[$c + 24 >> 2] = it;
                            var IO = lo - (ht * ul + it * vl), ly = $c + 12 | 0, JO = (N[0] = ko - (it * ul - ht * vl), w[0]), KO = (N[0] = IO, w[0]) | 0, jt = ly | 0;
                            l[jt >> 2] = 0 | JO;
                            var kt = ly + 4 | 0;
                            l[kt >> 2] = KO;
                          } else {
                            if (0 == (gt & 2 | 0)) {
                              p[ak] = ul;
                              p[el] = vl;
                              p[dl] = Ys;
                              p[$j] = Zs;
                              p[Zj] = ko;
                              p[Bh] = lo;
                              p[li] = $s;
                              p[cj] = wl;
                              p[bj] = Cq;
                              var lt = Dm(wl);
                              p[$c + 20 >> 2] = lt;
                              var mt = Em(wl);
                              p[$c + 24 >> 2] = mt;
                              var LO = lo - (lt * ul + mt * vl), my = $c + 12 | 0, MO = (N[0] = ko - (mt * ul - lt * vl), w[0]), NO = (N[0] = LO, w[0]) | 0, jt = my | 0;
                              l[jt >> 2] = 0 | MO;
                              kt = my + 4 | 0;
                              l[kt >> 2] = NO;
                            } else {
                              l[dj] = gt | 1;
                              (Bq | 0) < (Ux | 0) || S(O.J | 0, 62, O.Ia | 0, O.Va | 0);
                              l[jj] = Bq + 1 | 0;
                              l[((Bq << 2) + xO | 0) >> 2] = jo;
                              var Fq = j[Yj];
                              0 == (Fq & 1) << 16 >> 16 && (j[Yj] = Fq | 1, 0 != (l[Wx >> 2] | 0) && 0 == (Fq & 2) << 16 >> 16 && (j[Yj] = Fq | 3, p[$c + 144 >> 2] = 0), (io | 0) < (Tx | 0) || S(O.J | 0, 54, O.ma | 0, O.Aa | 0), l[($c + 8 | 0) >> 2] = io, l[((io << 2) + yO | 0) >> 2] = $c, l[Ug] = io + 1 | 0);
                            }
                          }
                        }
                      }
                    } while (0);
                    Vx = Aq + 12 | 0;
                  }
                }
              } while (0);
              zq = zq + 1 | 0;
            }
            var ny = (1 - Zd) * p[os >> 2];
            p[Rp >> 2] = ny;
            p[Hn >> 2] = 1 / ny;
            p[Sp >> 2] = 1;
            l[Tp >> 2] = 20;
            l[Vp >> 2] = l[Up >> 2];
            c[Wp] = 0;
            var Eh = xg, Gq = Uf, Gm = l[Mx >> 2], Hm = l[Sx >> 2], Hq = ra, xl = ra, Im = ra, yl = ra, zl = ra, Iq = ra, Jm = ra, lj = ra, Al = ra, Jq = ra, Km = ra, Bl = a;
            a += 116;
            var nt = Bl + 20, Km = nt >> 2, mo = Bl + 64, Jq = mo >> 2, Al = (Eh + 28 | 0) >> 2, oy = l[Al];
            if ((oy | 0) > (Gm | 0)) {
              var ot = oy;
            } else {
              S(O.Eb | 0, 386, O.tb | 0, O.Id | 0), ot = l[Al];
            }
            if ((ot | 0) > (Hm | 0)) {
              var py = ot;
            } else {
              S(O.Eb | 0, 387, O.tb | 0, O.ye | 0), py = l[Al];
            }
            var OO = 0 < (py | 0);
            a : do {
              if (OO) {
                for (var PO = Eh + 8 | 0, pt = Eh + 20 | 0, qt = Eh + 24 | 0, Cl = 0; ; ) {
                  var Kq = l[l[PO >> 2] + (Cl << 2) >> 2], qy = Kq + 44 | 0, ry = l[pt >> 2] + 12 * Cl | 0, rt = qy | 0, st = qy + 4 | 0, QO = l[st >> 2], tt = ry | 0;
                  l[tt >> 2] = l[rt >> 2];
                  var ut = ry + 4 | 0;
                  l[ut >> 2] = QO;
                  p[(l[pt >> 2] + 8 >> 2) + (3 * Cl | 0)] = p[Kq + 56 >> 2];
                  var sy = Kq + 64 | 0, ty = l[qt >> 2] + 12 * Cl | 0, RO = l[sy + 4 >> 2];
                  l[(ty | 0) >> 2] = l[sy >> 2];
                  l[(ty + 4 | 0) >> 2] = RO;
                  p[(l[qt >> 2] + 8 >> 2) + (3 * Cl | 0)] = p[Kq + 72 >> 2];
                  var uy = Cl + 1 | 0;
                  if ((uy | 0) >= (l[Al] | 0)) {
                    var vt = pt, lj = vt >> 2, wt = qt, Jm = wt >> 2;
                    break a;
                  }
                  Cl = uy;
                }
              } else {
                vt = Eh + 20 | 0, lj = vt >> 2, wt = Eh + 24 | 0, Jm = wt >> 2;
              }
            } while (0);
            var vy = Eh + 12 | 0;
            l[Km + 6] = l[vy >> 2];
            Iq = (Eh + 36 | 0) >> 2;
            l[Km + 7] = l[Iq];
            l[Km + 10] = l[Eh >> 2];
            zl = nt >> 2;
            yl = Gq >> 2;
            l[zl] = l[yl];
            l[zl + 1] = l[yl + 1];
            l[zl + 2] = l[yl + 2];
            l[zl + 3] = l[yl + 3];
            l[zl + 4] = l[yl + 4];
            l[zl + 5] = l[yl + 5];
            l[Km + 8] = l[lj];
            l[Km + 9] = l[Jm];
            Hr(mo, nt);
            for (var SO = Gq + 16 | 0, xt = 0; (xt | 0) < (l[SO >> 2] | 0); ) {
              var yt = mo, TO = Gm, UO = Hm, nk = ra, Lm = ra, Dl = a;
              a += 52;
              var Lq = Dl + 16, Mq = Dl + 32, wy = yt + 48 | 0, VO = 0 < (l[wy >> 2] | 0);
              a : do {
                if (VO) {
                  for (var WO = yt + 36 | 0, Lm = (yt + 24 | 0) >> 2, XO = Dl + 8 | 0, YO = Dl + 12 | 0, ZO = Lq + 8 | 0, $O = Lq + 12 | 0, xy = Dl, yy = Lq, zy = Mq, Ay = Mq + 8 | 0, aP = Mq + 16 | 0, Vg = 0, zt = 0; ; ) {
                    var Nq = l[WO >> 2], nk = Nq >> 2, bP = Nq + 88 * Vg | 0, Mm = l[nk + (22 * Vg | 0) + 8], Oq = l[nk + (22 * Vg | 0) + 9], By = Nq + 88 * Vg + 48 | 0, cP = l[By + 4 >> 2], Cy = (w[0] = l[By >> 2], N[0]), Dy = (w[0] = cP, N[0]), Ey = Nq + 88 * Vg + 56 | 0, dP = l[Ey + 4 >> 2], Fy = (w[0] = l[Ey >> 2], N[0]), Gy = (w[0] = dP, N[0]), Hy = l[nk + (22 * Vg | 0) + 21];
                    if ((Mm | 0) == (TO | 0) | (Mm | 0) == (UO | 0)) {
                      var At = p[nk + (22 * Vg | 0) + 16], Pq = p[nk + (22 * Vg | 0) + 10];
                    } else {
                      Pq = At = 0;
                    }
                    var Iy = p[nk + (22 * Vg | 0) + 17], Bt = p[nk + (22 * Vg | 0) + 11], no = l[Lm], Jy = no + 12 * Mm | 0, eP = l[Jy + 4 >> 2], Ky = (w[0] = l[Jy >> 2], N[0]), Ly = (w[0] = eP, N[0]), My = p[(no + 8 >> 2) + (3 * Mm | 0)], Ny = no + 12 * Oq | 0, fP = l[Ny + 4 >> 2], Oy = (w[0] = l[Ny >> 2], N[0]), Py = (w[0] = fP, N[0]), Qy = p[(no + 8 >> 2) + (3 * Oq | 0)];
                    if (0 < (Hy | 0)) {
                      for (var gP = Pq + Bt, Qq = Py, Rq = Oy, Sq = Ly, Tq = Ky, Ct = zt, Uq = My, Vq = Qy, Dt = 0; ; ) {
                        var Et = Dm(Uq);
                        p[XO >> 2] = Et;
                        var Ft = Em(Uq);
                        p[YO >> 2] = Ft;
                        var Gt = Dm(Vq);
                        p[ZO >> 2] = Gt;
                        var Ht = Em(Vq);
                        p[$O >> 2] = Ht;
                        var hP = Sq - (Et * Cy + Ft * Dy), iP = (N[0] = Tq - (Ft * Cy - Et * Dy), w[0]), jP = (N[0] = hP, w[0]) | 0;
                        l[xy >> 2] = 0 | iP;
                        l[xy + 4 >> 2] = jP;
                        var kP = Qq - (Gt * Fy + Ht * Gy), lP = (N[0] = Rq - (Ht * Fy - Gt * Gy), w[0]), mP = (N[0] = kP, w[0]) | 0;
                        l[yy >> 2] = 0 | lP;
                        l[yy + 4 >> 2] = mP;
                        Kr(Mq, bP, Dl, Lq, Dt);
                        var nP = l[zy + 4 >> 2], It = (w[0] = l[zy >> 2], N[0]), Jt = (w[0] = nP, N[0]), oP = l[Ay + 4 >> 2], Ry = (w[0] = l[Ay >> 2], N[0]), Sy = (w[0] = oP, N[0]), Kt = p[aP >> 2], Ty = Ry - Tq, Uy = Sy - Sq, Vy = Ry - Rq, Wy = Sy - Qq, Xy = Ct < Kt ? Ct : Kt, Yy = .75 * (Kt + .004999999888241291), Zy = 0 > Yy ? Yy : 0, $y = Ty * Jt - Uy * It, az = Vy * Jt - Wy * It, bz = gP + At * $y * $y + Iy * az * az, cz = 0 < bz ? -(-.20000000298023224 > Zy ? -.20000000298023224 : Zy) / bz : 0, Wq = It * cz, Xq = Jt * cz, dz = Tq - Wq * Pq, ez = Sq - Xq * Pq, fz = Uq - At * (Ty * Xq - Uy * Wq), gz = Rq + Wq * Bt, hz = Qq + Xq * Bt, iz = Vq + Iy * (Vy * Xq - Wy * Wq), jz = Dt + 1 | 0;
                        if ((jz | 0) == (Hy | 0)) {
                          break;
                        }
                        Qq = hz;
                        Rq = gz;
                        Sq = ez;
                        Tq = dz;
                        Ct = Xy;
                        Uq = fz;
                        Vq = iz;
                        Dt = jz;
                      }
                      var kz = hz, lz = gz, mz = ez, nz = dz, Lt = Xy, oz = fz, pz = iz, qz = l[Lm];
                    } else {
                      kz = Py, lz = Oy, mz = Ly, nz = Ky, Lt = zt, oz = My, pz = Qy, qz = no;
                    }
                    var rz = qz + 12 * Mm | 0, pP = (N[0] = nz, w[0]), qP = (N[0] = mz, w[0]) | 0;
                    l[(rz | 0) >> 2] = 0 | pP;
                    l[(rz + 4 | 0) >> 2] = qP;
                    p[(l[Lm] + 8 >> 2) + (3 * Mm | 0)] = oz;
                    var sz = l[Lm] + 12 * Oq | 0, rP = (N[0] = lz, w[0]), sP = (N[0] = kz, w[0]) | 0;
                    l[(sz | 0) >> 2] = 0 | rP;
                    l[(sz + 4 | 0) >> 2] = sP;
                    p[(l[Lm] + 8 >> 2) + (3 * Oq | 0)] = pz;
                    var tz = Vg + 1 | 0;
                    if ((tz | 0) >= (l[wy >> 2] | 0)) {
                      var uz = Lt;
                      break a;
                    }
                    Vg = tz;
                    zt = Lt;
                  }
                } else {
                  uz = 0;
                }
              } while (0);
              a = Dl;
              if (-.007499999832361937 <= uz) {
                break;
              }
              xt = xt + 1 | 0;
            }
            var Im = (Eh + 8 | 0) >> 2, vz = l[lj] + 12 * Gm | 0, wz = l[l[Im] + (Gm << 2) >> 2] + 36 | 0, rt = vz | 0, tP = l[rt >> 2], st = vz + 4 | 0, uP = l[st >> 2], tt = wz | 0;
            l[tt >> 2] = tP;
            ut = wz + 4 | 0;
            l[ut >> 2] = uP;
            p[l[l[Im] + (Gm << 2) >> 2] + 52 >> 2] = p[(l[lj] + 8 >> 2) + (3 * Gm | 0)];
            var xz = l[lj] + 12 * Hm | 0, yz = l[l[Im] + (Hm << 2) >> 2] + 36 | 0, vP = l[xz + 4 >> 2], Mt = yz | 0;
            l[Mt >> 2] = l[xz >> 2];
            var Nt = yz + 4 | 0;
            l[Nt >> 2] = vP;
            p[l[l[Im] + (Hm << 2) >> 2] + 52 >> 2] = p[(l[lj] + 8 >> 2) + (3 * Hm | 0)];
            Ir(mo);
            for (var wP = Gq + 12 | 0, Ot = 0; (Ot | 0) < (l[wP >> 2] | 0); ) {
              Jr(mo);
              Ot = Ot + 1 | 0;
            }
            var Nm = p[Gq >> 2], xP = 0 < (l[Al] | 0);
            a : do {
              if (xP) {
                for (var ni = 0; ; ) {
                  var zz = l[lj], Yq = zz + 12 * ni | 0, yP = l[Yq + 4 >> 2], zP = (w[0] = l[Yq >> 2], N[0]), AP = (w[0] = yP, N[0]), BP = p[(zz + 8 >> 2) + (3 * ni | 0)], Az = l[Jm], Bz = Az + 12 * ni | 0, CP = l[Bz + 4 >> 2], Pt = (w[0] = l[Bz >> 2], N[0]), Qt = (w[0] = CP, N[0]), Rt = p[(Az + 8 >> 2) + (3 * ni | 0)], Cz = Pt * Nm, Dz = Qt * Nm, Ez = Cz * Cz + Dz * Dz;
                  if (4 < Ez) {
                    var Fz = 2 / Hh(Ez), St = Pt * Fz, Tt = Qt * Fz;
                  } else {
                    St = Pt, Tt = Qt;
                  }
                  var oo = Nm * Rt, Ut = 2.4674012660980225 < oo * oo ? Rt * (1.5707963705062866 / (0 < oo ? oo : -oo)) : Rt, Gz = zP + St * Nm, Hz = AP + Tt * Nm, Zq = BP + Nm * Ut, DP = (N[0] = Gz, w[0]), EP = (N[0] = Hz, w[0]), Iz = 0 | DP, Jz = EP | 0;
                  l[(Yq | 0) >> 2] = Iz;
                  l[(Yq + 4 | 0) >> 2] = Jz;
                  p[(l[lj] + 8 >> 2) + (3 * ni | 0)] = Zq;
                  var Kz = l[Jm] + 12 * ni | 0, FP = (N[0] = St, w[0]), GP = (N[0] = Tt, w[0]), Lz = 0 | FP, Mz = GP | 0, Mt = Kz | 0;
                  l[Mt >> 2] = Lz;
                  Nt = Kz + 4 | 0;
                  l[Nt >> 2] = Mz;
                  p[(l[Jm] + 8 >> 2) + (3 * ni | 0)] = Ut;
                  var $q = l[l[Im] + (ni << 2) >> 2], xl = $q >> 2, Nz = $q + 44 | 0;
                  l[(Nz | 0) >> 2] = Iz;
                  l[(Nz + 4 | 0) >> 2] = Jz;
                  p[xl + 14] = Zq;
                  var Oz = $q + 64 | 0;
                  l[(Oz | 0) >> 2] = Lz;
                  l[(Oz + 4 | 0) >> 2] = Mz;
                  p[xl + 18] = Ut;
                  var Vt = Dm(Zq);
                  p[xl + 5] = Vt;
                  var Wt = Em(Zq);
                  p[xl + 6] = Wt;
                  var Pz = p[xl + 7], Qz = p[xl + 8], HP = Hz - (Vt * Pz + Wt * Qz), Rz = $q + 12 | 0, IP = (N[0] = Gz - (Wt * Pz - Vt * Qz), w[0]), JP = (N[0] = HP, w[0]) | 0;
                  l[(Rz | 0) >> 2] = 0 | IP;
                  l[(Rz + 4 | 0) >> 2] = JP;
                  var Sz = ni + 1 | 0;
                  if ((Sz | 0) >= (l[Al] | 0)) {
                    break a;
                  }
                  ni = Sz;
                }
              }
            } while (0);
            var Tz = l[Jq + 10], Hq = Tz >> 2, Uz = Eh + 4 | 0, KP = 0 == (l[Uz >> 2] | 0);
            a : do {
              if (!KP && 0 < (l[Iq] | 0)) {
                for (var LP = Bl + 16 | 0, Om = 0; ; ) {
                  var MP = l[l[vy >> 2] + (Om << 2) >> 2], Xt = l[Hq + (38 * Om | 0) + 36];
                  l[LP >> 2] = Xt;
                  var NP = 0 < (Xt | 0);
                  b : do {
                    if (NP) {
                      for (var Pm = 0; ; ) {
                        p[Bl + (Pm << 2) >> 2] = p[Hq + (38 * Om | 0) + (9 * Pm | 0) + 4];
                        p[Bl + (Pm << 2) + 8 >> 2] = p[Hq + (38 * Om | 0) + (9 * Pm | 0) + 5];
                        var Vz = Pm + 1 | 0;
                        if ((Vz | 0) == (Xt | 0)) {
                          break b;
                        }
                        Pm = Vz;
                      }
                    }
                  } while (0);
                  var Wz = l[Uz >> 2];
                  K[l[l[Wz >> 2] + 20 >> 2]](Wz, MP, Bl);
                  var Xz = Om + 1 | 0;
                  if ((Xz | 0) >= (l[Iq] | 0)) {
                    break a;
                  }
                  Om = Xz;
                }
              }
            } while (0);
            var Yz = l[Jq + 8];
            ho(Yz, Tz);
            ho(Yz, l[Jq + 9]);
            a = Bl;
            for (var OP = l[Ug], Zz = l[ik], ar = 0; (ar | 0) < (OP | 0); ) {
              var Yt = l[Zz + (ar << 2) >> 2];
              Sg = Yt >> 2;
              var $z = Yt + 4 | 0;
              j[$z >> 1] &= -2;
              var PP = 2 == (l[Sg] | 0);
              a : do {
                if (PP) {
                  var aA = p[Sg + 13], Zt = Dm(aA);
                  p[Xp >> 2] = Zt;
                  var $t = Em(aA);
                  p[ps >> 2] = $t;
                  var bA = p[Sg + 7], cA = p[Sg + 8], QP = p[Sg + 10] - (Zt * bA + $t * cA), RP = (N[0] = p[Sg + 9] - ($t * bA - Zt * cA), w[0]), SP = (N[0] = QP, w[0]) | 0;
                  l[wg >> 2] = 0 | RP;
                  l[wg + 4 >> 2] = SP;
                  var TP = l[Sg + 22] + 102872 | 0, dA = l[Sg + 25], UP = 0 == (dA | 0);
                  b : do {
                    if (!UP) {
                      for (var VP = Yt + 12 | 0, au = dA; ; ) {
                        Ro(au, TP, wg, VP);
                        var eA = l[au + 4 >> 2];
                        if (0 == (eA | 0)) {
                          break b;
                        }
                        au = eA;
                      }
                    }
                  } while (0);
                  var fA = l[Sg + 28];
                  if (0 != (fA | 0)) {
                    for (var bu = fA; ; ) {
                      var gA = l[bu + 4 >> 2] + 4 | 0;
                      l[gA >> 2] &= -34;
                      var hA = l[bu + 12 >> 2];
                      if (0 == (hA | 0)) {
                        break a;
                      }
                      bu = hA;
                    }
                  }
                }
              } while (0);
              ar = ar + 1 | 0;
            }
            Zo(sm, sm);
            if (0 != (c[qs] & 1) << 24 >> 24) {
              Jn = 0;
              Kn = Zz;
              break;
            }
          } else {
            l[ej] = Us & -37;
            p[ij] = Ln;
            p[jl] = Mn;
            p[Nn >> 2] = On;
            p[om] = Pn;
            p[il] = Yp;
            p[hl] = Qn;
            p[gl] = Zp;
            p[mi] = $p;
            p[hk] = ym;
            p[gk] = aq;
            p[fk] = rs;
            p[bq >> 2] = cq;
            p[fl] = Rn;
            p[ek] = dq;
            p[dk] = Sn;
            p[hj] = eq;
            p[gj] = fq;
            p[fj] = gq;
            var iA = p[mi], cu = Dm(iA);
            p[ux >> 2] = cu;
            var du = Em(iA);
            p[vx >> 2] = du;
            var jA = p[ij], kA = p[jl], WP = p[hl] - (cu * jA + du * kA), XP = (N[0] = p[il] - (du * jA - cu * kA), w[0]), YP = (N[0] = WP, w[0]) | 0;
            l[(vq | 0) >> 2] = 0 | XP;
            l[(vq + 4 | 0) >> 2] = YP;
            var lA = p[gj], eu = Dm(lA);
            p[Ex >> 2] = eu;
            var fu = Em(lA);
            p[Fx >> 2] = fu;
            var mA = p[gk], nA = p[fk], ZP = p[dk] - (eu * mA + fu * nA), $P = (N[0] = p[ek] - (fu * mA - eu * nA), w[0]), aQ = (N[0] = ZP, w[0]) | 0;
            l[(yq | 0) >> 2] = 0 | $P;
            l[(yq + 4 | 0) >> 2] = aQ;
          }
          re = 0;
          Zd = 1;
          In = tm;
        } else {
          Xj = (pl + 4 | 0) >> 2;
          var oA = l[Xj], bQ = 0 == (oA & 4 | 0);
          do {
            if (bQ) {
              var ok = re, pk = Zd;
            } else {
              if (8 < (l[Tg + 32] | 0)) {
                ok = re, pk = Zd;
              } else {
                if (0 == (oA & 32 | 0)) {
                  var gu = l[Tg + 12], hu = l[Tg + 13];
                  if (0 != (c[gu + 38 | 0] & 1) << 24 >> 24) {
                    ok = re;
                    pk = Zd;
                    break;
                  }
                  if (0 != (c[hu + 38 | 0] & 1) << 24 >> 24) {
                    ok = re;
                    pk = Zd;
                    break;
                  }
                  var oi = l[gu + 8 >> 2], pi = l[hu + 8 >> 2], iu = l[oi >> 2], ju = l[pi >> 2];
                  2 == (iu | 0) | 2 == (ju | 0) || S(O.t | 0, 641, O.sb | 0, O.Sf | 0);
                  var pA = j[oi + 4 >> 1], qA = j[pi + 4 >> 1];
                  if (!(0 != (pA & 2) << 16 >> 16 & 0 != (iu | 0) | 0 != (qA & 2) << 16 >> 16 & 0 != (ju | 0))) {
                    ok = re;
                    pk = Zd;
                    break;
                  }
                  if (!(0 != (pA & 8) << 16 >> 16 | 2 != (iu | 0) | 0 != (qA & 8) << 16 >> 16 | 2 != (ju | 0))) {
                    ok = re;
                    pk = Zd;
                    break;
                  }
                  var cQ = oi + 28 | 0;
                  aj = (oi + 60 | 0) >> 2;
                  var El = p[aj], dQ = pi + 28 | 0;
                  cl = (pi + 60 | 0) >> 2;
                  var Qm = p[cl];
                  if (El < Qm) {
                    if (1 > El) {
                      var ku = El;
                    } else {
                      S(O.aa | 0, 723, O.X | 0, O.T | 0), ku = p[aj];
                    }
                    var br = (Qm - ku) / (1 - ku), rA = oi + 36 | 0, lu = 1 - br, eQ = p[oi + 40 >> 2] * lu + p[oi + 48 >> 2] * br, sA = rA, fQ = (N[0] = p[rA >> 2] * lu + p[oi + 44 >> 2] * br, w[0]), gQ = (N[0] = eQ, w[0]), hQ = 0 | fQ, iQ = gQ | 0, sl = sA | 0;
                    Dh = sl >> 2;
                    l[Dh] = hQ;
                    tl = sA + 4 | 0;
                    Ch = tl >> 2;
                    l[Ch] = iQ;
                    var tA = oi + 52 | 0;
                    p[tA >> 2] = lu * p[tA >> 2] + br * p[oi + 56 >> 2];
                    var cr = p[aj] = Qm;
                  } else {
                    if (Qm < El) {
                      if (1 > Qm) {
                        var mu = Qm;
                      } else {
                        S(O.aa | 0, 723, O.X | 0, O.T | 0), mu = p[cl];
                      }
                      var dr = (El - mu) / (1 - mu), uA = pi + 36 | 0, nu = 1 - dr, jQ = p[pi + 40 >> 2] * nu + p[pi + 48 >> 2] * dr, vA = uA, kQ = (N[0] = p[uA >> 2] * nu + p[pi + 44 >> 2] * dr, w[0]), lQ = (N[0] = jQ, w[0]), mQ = 0 | kQ, nQ = lQ | 0, sl = vA | 0;
                      Dh = sl >> 2;
                      l[Dh] = mQ;
                      tl = vA + 4 | 0;
                      Ch = tl >> 2;
                      l[Ch] = nQ;
                      var wA = pi + 52 | 0;
                      p[wA >> 2] = nu * p[wA >> 2] + dr * p[pi + 56 >> 2];
                      p[cl] = El;
                    }
                    cr = El;
                  }
                  1 > cr || S(O.t | 0, 676, O.sb | 0, O.T | 0);
                  var oQ = l[Tg + 14], pQ = l[Tg + 15];
                  l[ls >> 2] = 0;
                  l[ms >> 2] = 0;
                  p[Kp >> 2] = 0;
                  l[Cn >> 2] = 0;
                  l[Lp >> 2] = 0;
                  p[Dn >> 2] = 0;
                  xi(En, l[gu + 12 >> 2], oQ);
                  xi(wm, l[hu + 12 >> 2], pQ);
                  for (var mj = cQ >> 2, po = Mp >> 2, ou = mj + 9; mj < ou; mj++, po++) {
                    l[po] = l[mj];
                  }
                  mj = dQ >> 2;
                  po = Np >> 2;
                  for (ou = mj + 9; mj < ou; mj++, po++) {
                    l[po] = l[mj];
                  }
                  p[Op >> 2] = 1;
                  var xA = ml, qk = Ye, rk = ra, sk = ra, tk = ra, uk = ra, er = ra, fr = ra, gr = ra, hr = ra, vk = ra, wk = ra, ze = a;
                  a += 308;
                  var Fl = ra, qi = ze + 36, pu = ze + 72, Wg = ze + 84, yA = ze + 176, ir = ze + 200, zA = ze + 300, AA = ze + 304;
                  l[Lr >> 2] = l[Lr >> 2] + 1 | 0;
                  wk = (xA | 0) >> 2;
                  l[wk] = 0;
                  var BA = qk + 128 | 0, qQ = p[BA >> 2], vk = (xA + 4 | 0) >> 2;
                  p[vk] = qQ;
                  for (var rQ = qk | 0, CA = qk + 28 | 0, nj = (qk + 56 | 0) >> 2, qo = ze >> 2, ru = nj + 9; nj < ru; nj++, qo++) {
                    l[qo] = l[nj];
                  }
                  nj = (qk + 92 | 0) >> 2;
                  qo = qi >> 2;
                  for (ru = nj + 9; nj < ru; nj++, qo++) {
                    l[qo] = l[nj];
                  }
                  var hr = (ze + 24 | 0) >> 2, DA = p[hr], FA = 6.2831854820251465 * Mr(DA / 6.2831854820251465), GA = DA - FA;
                  p[hr] = GA;
                  var gr = (ze + 28 | 0) >> 2, HA = p[gr] - FA;
                  p[gr] = HA;
                  var fr = (qi + 24 | 0) >> 2, IA = p[fr], JA = 6.2831854820251465 * Mr(IA / 6.2831854820251465), KA = IA - JA;
                  p[fr] = KA;
                  var er = (qi + 28 | 0) >> 2, LA = p[er] - JA;
                  p[er] = LA;
                  var MA = p[BA >> 2], NA = p[qk + 24 >> 2] + p[qk + 52 >> 2] - .014999999664723873, Rm = .004999999888241291 > NA ? .004999999888241291 : NA;
                  .0012499999720603228 < Rm || S(O.Ca | 0, 280, O.Mc | 0, O.Vd | 0);
                  j[pu + 4 >> 1] = 0;
                  uk = Wg >> 2;
                  tk = qk >> 2;
                  l[uk] = l[tk];
                  l[uk + 1] = l[tk + 1];
                  l[uk + 2] = l[tk + 2];
                  l[uk + 3] = l[tk + 3];
                  l[uk + 4] = l[tk + 4];
                  l[uk + 5] = l[tk + 5];
                  l[uk + 6] = l[tk + 6];
                  sk = (Wg + 28 | 0) >> 2;
                  rk = CA >> 2;
                  l[sk] = l[rk];
                  l[sk + 1] = l[rk + 1];
                  l[sk + 2] = l[rk + 2];
                  l[sk + 3] = l[rk + 3];
                  l[sk + 4] = l[rk + 4];
                  l[sk + 5] = l[rk + 5];
                  l[sk + 6] = l[rk + 6];
                  c[Wg + 88 | 0] = 0;
                  var sQ = ze + 8 | 0, tQ = ze + 12 | 0, uQ = ze + 16 | 0, vQ = ze + 20 | 0, wQ = ze | 0, xQ = ze + 4 | 0, yQ = qi + 8 | 0, zQ = qi + 12 | 0, AQ = qi + 16 | 0, BQ = qi + 20 | 0, CQ = qi | 0, DQ = qi + 4 | 0, EQ = Wg + 56 | 0, FQ = Wg + 60 | 0, GQ = Wg + 64 | 0, HQ = Wg + 68 | 0, IQ = Wg + 72 | 0, JQ = Wg + 76 | 0, KQ = Wg + 80 | 0, LQ = Wg + 84 | 0, MQ = yA + 16 | 0, su = Rm + .0012499999720603228, OA = Rm - .0012499999720603228, vf = 0, ro = 0, PA = GA, QA = HA, RA = KA, SA = LA;
                  a : for (;;) {
                    var Sm = 1 - vf, NQ = p[sQ >> 2] * Sm + p[uQ >> 2] * vf, OQ = p[tQ >> 2] * Sm + p[vQ >> 2] * vf, TA = Sm * PA + QA * vf, tu = Dm(TA), uu = Em(TA), UA = p[wQ >> 2], VA = p[xQ >> 2], PQ = NQ - (uu * UA - tu * VA), QQ = OQ - (tu * UA + uu * VA), RQ = p[yQ >> 2] * Sm + p[AQ >> 2] * vf, SQ = p[zQ >> 2] * Sm + p[BQ >> 2] * vf, WA = Sm * RA + SA * vf, vu = Dm(WA), wu = Em(WA), XA = p[CQ >> 2], YA = p[DQ >> 2], TQ = RQ - (wu * XA - vu * YA), UQ = SQ - (vu * XA + wu * YA);
                    p[EQ >> 2] = PQ;
                    p[FQ >> 2] = QQ;
                    p[GQ >> 2] = tu;
                    p[HQ >> 2] = uu;
                    p[IQ >> 2] = TQ;
                    p[JQ >> 2] = UQ;
                    p[KQ >> 2] = vu;
                    p[LQ >> 2] = wu;
                    mk(yA, pu, Wg);
                    var ZA = p[MQ >> 2];
                    if (0 >= ZA) {
                      l[wk] = 2;
                      p[vk] = 0;
                      var so = ro, Fl = 27;
                      break;
                    }
                    if (ZA < su) {
                      l[wk] = 3;
                      p[vk] = vf;
                      so = ro;
                      Fl = 27;
                      break;
                    }
                    var Vf = ir, xk = pu, xu = rQ, VQ = ze, yu = CA, WQ = qi, Gl = vf, ri = ra, si = ra, jr = ra, to = ra, wf = Vf >> 2, to = (Vf | 0) >> 2;
                    l[to] = xu;
                    jr = (Vf + 4 | 0) >> 2;
                    l[jr] = yu;
                    var zu = Kd[xk + 4 >> 1];
                    0 != zu << 16 >> 16 & 3 > (zu & 65535) || S(O.Ca | 0, 50, O.Wc | 0, O.Of | 0);
                    for (var $A = Vf + 8 | 0, oj = VQ >> 2, uo = $A >> 2, Au = oj + 9; oj < Au; oj++, uo++) {
                      l[uo] = l[oj];
                    }
                    for (var aB = Vf + 44 | 0, oj = WQ >> 2, uo = aB >> 2, Au = oj + 9; oj < Au; oj++, uo++) {
                      l[uo] = l[oj];
                    }
                    var Tm = 1 - Gl, XQ = p[wf + 4] * Tm + p[wf + 6] * Gl, YQ = p[wf + 5] * Tm + p[wf + 7] * Gl, bB = Tm * p[wf + 8] + p[wf + 9] * Gl, ti = Dm(bB), ui = Em(bB), cB = p[$A >> 2], dB = p[wf + 3], Bu = XQ - (ui * cB - ti * dB), Cu = YQ - (ti * cB + ui * dB), ZQ = p[wf + 13] * Tm + p[wf + 15] * Gl, $Q = p[wf + 14] * Tm + p[wf + 16] * Gl, eB = Tm * p[wf + 17] + p[wf + 18] * Gl, vi = Dm(eB), wi = Em(eB), fB = p[aB >> 2], gB = p[wf + 12], Du = ZQ - (wi * fB - vi * gB), Eu = $Q - (vi * fB + wi * gB);
                    if (1 == zu << 16 >> 16) {
                      l[wf + 20] = 0;
                      var hB = l[to], iB = Gd[xk + 6 | 0] & 255;
                      (l[hB + 20 >> 2] | 0) > (iB | 0) || S(O.i | 0, 103, O.h | 0, O.j | 0);
                      var jB = (iB << 3) + l[hB + 16 >> 2] | 0, pj = jB | 0, si = pj >> 2, qj = jB + 4 | 0, ri = qj >> 2, aR = l[ri], kB = (w[0] = l[si], N[0]), lB = (w[0] = aR, N[0]), mB = l[jr], nB = Gd[xk + 9 | 0] & 255;
                      (l[mB + 20 >> 2] | 0) > (nB | 0) || S(O.i | 0, 103, O.h | 0, O.j | 0);
                      var oB = (nB << 3) + l[mB + 16 >> 2] | 0, pj = oB | 0, si = pj >> 2, qj = oB + 4 | 0, ri = qj >> 2, bR = l[ri], pB = (w[0] = l[si], N[0]), qB = (w[0] = bR, N[0]), Fu = Vf + 92 | 0, kr = wi * pB - vi * qB + Du - (ui * kB - ti * lB + Bu), lr = vi * pB + wi * qB + Eu - (ti * kB + ui * lB + Cu), cR = (N[0] = kr, w[0]), dR = (N[0] = lr, w[0]) | 0;
                      l[Fu >> 2] = 0 | cR;
                      l[Fu + 4 >> 2] = dR;
                      var rB = Hh(kr * kr + lr * lr);
                      if (1.1920928955078125e-7 <= rB) {
                        var eR = Vf + 96 | 0, sB = 1 / rB;
                        p[Fu >> 2] = kr * sB;
                        p[eR >> 2] = lr * sB;
                      }
                    } else {
                      var Gu = xk + 6 | 0, tB = xk + 7 | 0, uB = Vf + 80 | 0;
                      if (c[Gu] << 24 >> 24 == c[tB] << 24 >> 24) {
                        l[uB >> 2] = 2;
                        var vB = Gd[xk + 9 | 0] & 255, wB = yu + 20 | 0, xB = o[wB >> 2];
                        if ((xB | 0) > (vB | 0)) {
                          var yB = xB;
                        } else {
                          S(O.i | 0, 103, O.h | 0, O.j | 0), yB = l[wB >> 2];
                        }
                        var zB = yu + 16 | 0, AB = o[zB >> 2], BB = (vB << 3) + AB | 0, fR = l[BB + 4 >> 2], CB = (w[0] = l[BB >> 2], N[0]), DB = (w[0] = fR, N[0]), EB = Gd[xk + 10 | 0] & 255;
                        if ((yB | 0) > (EB | 0)) {
                          var FB = AB;
                        } else {
                          S(O.i | 0, 103, O.h | 0, O.j | 0), FB = l[zB >> 2];
                        }
                        var GB = (EB << 3) + FB | 0, gR = l[GB + 4 >> 2], HB = (w[0] = l[GB >> 2], N[0]), IB = (w[0] = gR, N[0]), vo = Vf + 92 | 0, wo = IB - DB, xo = -1 * (HB - CB), hR = (N[0] = wo, w[0]), iR = (N[0] = xo, w[0]) | 0;
                        l[vo >> 2] = 0 | hR;
                        l[vo + 4 >> 2] = iR;
                        var JB = vo | 0, KB = Vf + 96 | 0, LB = Hh(wo * wo + xo * xo);
                        if (1.1920928955078125e-7 > LB) {
                          var Hu = wo, Iu = xo;
                        } else {
                          var MB = 1 / LB, NB = wo * MB;
                          p[JB >> 2] = NB;
                          var OB = xo * MB;
                          p[KB >> 2] = OB;
                          Hu = NB;
                          Iu = OB;
                        }
                        var jR = wi * Hu - vi * Iu, kR = vi * Hu + wi * Iu, Ju = .5 * (CB + HB), Ku = .5 * (DB + IB), PB = Vf + 84 | 0, lR = (N[0] = Ju, w[0]), mR = (N[0] = Ku, w[0]) | 0, Lu = PB | 0;
                        l[Lu >> 2] = 0 | lR;
                        var Mu = PB + 4 | 0;
                        l[Mu >> 2] = mR;
                        var nR = wi * Ju - vi * Ku + Du, oR = vi * Ju + wi * Ku + Eu, QB = Gd[Gu] & 255;
                        (l[xu + 20 >> 2] | 0) > (QB | 0) || S(O.i | 0, 103, O.h | 0, O.j | 0);
                        var RB = (QB << 3) + l[xu + 16 >> 2] | 0, pj = RB | 0, si = pj >> 2, qj = RB + 4 | 0, ri = qj >> 2, pR = l[ri], SB = (w[0] = l[si], N[0]), TB = (w[0] = pR, N[0]);
                        if (0 > (ui * SB - ti * TB + Bu - nR) * jR + (ti * SB + ui * TB + Cu - oR) * kR) {
                          var qR = -p[KB >> 2], rR = (N[0] = -p[JB >> 2], w[0]), sR = (N[0] = qR, w[0]) | 0, Nu = vo | 0;
                          l[Nu >> 2] = 0 | rR;
                          var Ou = vo + 4 | 0;
                          l[Ou >> 2] = sR;
                        }
                      } else {
                        l[uB >> 2] = 1;
                        var Pu = l[to], UB = Gd[Gu] & 255, VB = o[Pu + 20 >> 2];
                        if ((VB | 0) > (UB | 0)) {
                          var WB = Pu, XB = VB;
                        } else {
                          S(O.i | 0, 103, O.h | 0, O.j | 0);
                          var YB = l[to], WB = YB, XB = l[YB + 20 >> 2];
                        }
                        var ZB = (UB << 3) + l[Pu + 16 >> 2] | 0, tR = l[ZB + 4 >> 2], $B = (w[0] = l[ZB >> 2], N[0]), aC = (w[0] = tR, N[0]), bC = Gd[tB] & 255;
                        (XB | 0) > (bC | 0) || S(O.i | 0, 103, O.h | 0, O.j | 0);
                        var cC = (bC << 3) + l[WB + 16 >> 2] | 0, pj = cC | 0, si = pj >> 2, qj = cC + 4 | 0, ri = qj >> 2, uR = l[ri], dC = (w[0] = l[si], N[0]), eC = (w[0] = uR, N[0]), yo = Vf + 92 | 0, zo = eC - aC, Ao = -1 * (dC - $B), vR = (N[0] = zo, w[0]), wR = (N[0] = Ao, w[0]) | 0;
                        l[yo >> 2] = 0 | vR;
                        l[yo + 4 >> 2] = wR;
                        var fC = yo | 0, gC = Vf + 96 | 0, hC = Hh(zo * zo + Ao * Ao);
                        if (1.1920928955078125e-7 > hC) {
                          var Qu = zo, Ru = Ao;
                        } else {
                          var iC = 1 / hC, jC = zo * iC;
                          p[fC >> 2] = jC;
                          var kC = Ao * iC;
                          p[gC >> 2] = kC;
                          Qu = jC;
                          Ru = kC;
                        }
                        var xR = ui * Qu - ti * Ru, yR = ti * Qu + ui * Ru, Su = .5 * ($B + dC), Tu = .5 * (aC + eC), lC = Vf + 84 | 0, zR = (N[0] = Su, w[0]), AR = (N[0] = Tu, w[0]), BR = 0 | zR, CR = AR | 0, Lu = lC | 0;
                        l[Lu >> 2] = BR;
                        Mu = lC + 4 | 0;
                        l[Mu >> 2] = CR;
                        var DR = ui * Su - ti * Tu + Bu, ER = ti * Su + ui * Tu + Cu, mC = l[jr], nC = Gd[xk + 9 | 0] & 255;
                        (l[mC + 20 >> 2] | 0) > (nC | 0) || S(O.i | 0, 103, O.h | 0, O.j | 0);
                        var oC = (nC << 3) + l[mC + 16 >> 2] | 0, pj = oC | 0, si = pj >> 2, qj = oC + 4 | 0, ri = qj >> 2, FR = l[ri], pC = (w[0] = l[si], N[0]), qC = (w[0] = FR, N[0]);
                        if (0 > (wi * pC - vi * qC + Du - DR) * xR + (vi * pC + wi * qC + Eu - ER) * yR) {
                          var GR = -p[gC >> 2], HR = (N[0] = -p[fC >> 2], w[0]), IR = (N[0] = GR, w[0]) | 0, Nu = yo | 0;
                          l[Nu >> 2] = 0 | HR;
                          Ou = yo + 4 | 0;
                          l[Ou >> 2] = IR;
                        }
                      }
                    }
                    for (var rC = 0, Bo = MA; ; ) {
                      var mr, Hl = ir, Il = Bo, Co = ra, nr = ra, Do = ra, or = ra, Eo = ra, Fo = ra, Um = AA >> 2, Vm = zA >> 2, qd = Hl >> 2, fe = ra, Wm = 1 - Il, JR = p[qd + 4] * Wm + p[qd + 6] * Il, KR = p[qd + 5] * Wm + p[qd + 7] * Il, sC = Wm * p[qd + 8] + p[qd + 9] * Il, Wf = Dm(sC), Xf = Em(sC), tC = p[qd + 2], uC = p[qd + 3], Uu = JR - (Xf * tC - Wf * uC), Vu = KR - (Wf * tC + Xf * uC), LR = p[qd + 13] * Wm + p[qd + 15] * Il, MR = p[qd + 14] * Wm + p[qd + 16] * Il, vC = Wm * p[qd + 17] + p[qd + 18] * Il, Yf = Dm(vC), Zf = Em(vC), wC = p[qd + 11], xC = p[qd + 12], Wu = LR - (Zf * wC - Yf * xC), Xu = MR - (Yf * wC + Zf * xC), Yu = l[qd + 20];
                      if (0 == Yu) {
                        var yC = Hl + 92 | 0, pr = p[yC >> 2], zC = Hl + 96 | 0, Zu = p[zC >> 2], AC = Xf * pr + Wf * Zu, BC = pr * -Wf + Xf * Zu, CC = -Zu, DC = Zf * -pr + Yf * CC, EC = pr * Yf + Zf * CC, FC = Hl | 0, GC = l[FC >> 2], Fo = l[GC + 16 >> 2] >> 2, HC = l[GC + 20 >> 2], NR = 1 < (HC | 0);
                        b : do {
                          if (NR) {
                            for (var IC = 0, $u = p[Fo] * AC + p[Fo + 1] * BC, Go = 1; ; ) {
                              var JC = p[(Go << 3 >> 2) + Fo] * AC + p[((Go << 3) + 4 >> 2) + Fo] * BC, KC = JC > $u, LC = KC ? Go : IC, OR = KC ? JC : $u, MC = Go + 1 | 0;
                              if ((MC | 0) == (HC | 0)) {
                                var NC = LC;
                                break b;
                              }
                              IC = LC;
                              $u = OR;
                              Go = MC;
                            }
                          } else {
                            NC = 0;
                          }
                        } while (0);
                        l[Vm] = NC;
                        var OC = Hl + 4 | 0, PC = l[OC >> 2], Eo = l[PC + 16 >> 2] >> 2, QC = l[PC + 20 >> 2], PR = 1 < (QC | 0);
                        b : do {
                          if (PR) {
                            for (var RC = 0, av = p[Eo] * DC + p[Eo + 1] * EC, Ho = 1; ; ) {
                              var SC = p[(Ho << 3 >> 2) + Eo] * DC + p[((Ho << 3) + 4 >> 2) + Eo] * EC, TC = SC > av, UC = TC ? Ho : RC, QR = TC ? SC : av, VC = Ho + 1 | 0;
                              if ((VC | 0) == (QC | 0)) {
                                var bv = UC;
                                break b;
                              }
                              RC = UC;
                              av = QR;
                              Ho = VC;
                            }
                          } else {
                            bv = 0;
                          }
                        } while (0);
                        l[Um] = bv;
                        var WC = l[FC >> 2], cv = l[Vm];
                        if (-1 < (cv | 0)) {
                          if ((l[WC + 20 >> 2] | 0) > (cv | 0)) {
                            var qr = bv, fe = 10;
                          } else {
                            fe = 9;
                          }
                        } else {
                          fe = 9;
                        }
                        9 == fe && (S(O.i | 0, 103, O.h | 0, O.j | 0), qr = l[Um]);
                        var XC = (cv << 3) + l[WC + 16 >> 2] | 0, RR = l[XC + 4 >> 2], YC = (w[0] = l[XC >> 2], N[0]), ZC = (w[0] = RR, N[0]), $C = l[OC >> 2], fe = -1 < (qr | 0) ? (l[$C + 20 >> 2] | 0) > (qr | 0) ? 13 : 12 : 12;
                        12 == fe && S(O.i | 0, 103, O.h | 0, O.j | 0);
                        var aD = (qr << 3) + l[$C + 16 >> 2] | 0, SR = l[aD + 4 >> 2], bD = (w[0] = l[aD >> 2], N[0]), cD = (w[0] = SR, N[0]), rr = (Zf * bD - Yf * cD + Wu - (Xf * YC - Wf * ZC + Uu)) * p[yC >> 2] + (Yf * bD + Zf * cD + Xu - (Wf * YC + Xf * ZC + Vu)) * p[zC >> 2];
                      } else {
                        if (1 == Yu) {
                          var dD = p[qd + 23], eD = p[qd + 24], dv = Xf * dD - Wf * eD, fD = Wf * dD + Xf * eD, gD = p[qd + 21], hD = p[qd + 22], TR = Xf * gD - Wf * hD + Uu, UR = Wf * gD + Xf * hD + Vu, iD = -fD, jD = Zf * -dv + Yf * iD, kD = dv * Yf + Zf * iD;
                          l[Vm] = -1;
                          var or = (Hl + 4 | 0) >> 2, lD = l[or], Do = l[lD + 16 >> 2] >> 2, mD = l[lD + 20 >> 2], VR = 1 < (mD | 0);
                          do {
                            if (VR) {
                              for (var nD = 0, ev = p[Do] * jD + p[Do + 1] * kD, Io = 1; ; ) {
                                var oD = p[(Io << 3 >> 2) + Do] * jD + p[((Io << 3) + 4 >> 2) + Do] * kD, pD = oD > ev, Jo = pD ? Io : nD, WR = pD ? oD : ev, qD = Io + 1 | 0;
                                if ((qD | 0) == (mD | 0)) {
                                  break;
                                }
                                nD = Jo;
                                ev = WR;
                                Io = qD;
                              }
                              l[Um] = Jo;
                              var rD = l[or];
                              if (-1 < (Jo | 0)) {
                                sr = Jo, tr = rD, fe = 19;
                              } else {
                                var sD = Jo, tD = rD, fe = 20;
                              }
                            } else {
                              var sr = l[Um] = 0, tr = l[or], fe = 19;
                            }
                          } while (0);
                          if (19 == fe) {
                            if ((l[tr + 20 >> 2] | 0) > (sr | 0)) {
                              var uD = sr, vD = tr, fe = 21;
                            } else {
                              sD = sr, tD = tr, fe = 20;
                            }
                          }
                          20 == fe && (S(O.i | 0, 103, O.h | 0, O.j | 0), uD = sD, vD = tD);
                          var wD = (uD << 3) + l[vD + 16 >> 2] | 0, fv = wD | 0, gv = wD + 4 | 0, XR = l[gv >> 2], xD = (w[0] = l[fv >> 2], N[0]), yD = (w[0] = XR, N[0]), rr = (Zf * xD - Yf * yD + Wu - TR) * dv + (Yf * xD + Zf * yD + Xu - UR) * fD;
                        } else {
                          if (2 == Yu) {
                            var zD = p[qd + 23], AD = p[qd + 24], hv = Zf * zD - Yf * AD, BD = Yf * zD + Zf * AD, CD = p[qd + 21], DD = p[qd + 22], YR = Zf * CD - Yf * DD + Wu, ZR = Yf * CD + Zf * DD + Xu, ED = -BD, FD = Xf * -hv + Wf * ED, GD = hv * Wf + Xf * ED;
                            l[Um] = -1;
                            var nr = (Hl | 0) >> 2, HD = l[nr], Co = l[HD + 16 >> 2] >> 2, ID = l[HD + 20 >> 2], $R = 1 < (ID | 0);
                            do {
                              if ($R) {
                                for (var JD = 0, iv = p[Co] * FD + p[Co + 1] * GD, Ko = 1; ; ) {
                                  var KD = p[(Ko << 3 >> 2) + Co] * FD + p[((Ko << 3) + 4 >> 2) + Co] * GD, LD = KD > iv, Lo = LD ? Ko : JD, aS = LD ? KD : iv, MD = Ko + 1 | 0;
                                  if ((MD | 0) == (ID | 0)) {
                                    break;
                                  }
                                  JD = Lo;
                                  iv = aS;
                                  Ko = MD;
                                }
                                l[Vm] = Lo;
                                var ND = l[nr];
                                if (-1 < (Lo | 0)) {
                                  ur = Lo, vr = ND, fe = 27;
                                } else {
                                  var OD = Lo, PD = ND, fe = 28;
                                }
                              } else {
                                var ur = l[Vm] = 0, vr = l[nr], fe = 27;
                              }
                            } while (0);
                            if (27 == fe) {
                              if ((l[vr + 20 >> 2] | 0) > (ur | 0)) {
                                var QD = ur, RD = vr, fe = 29;
                              } else {
                                OD = ur, PD = vr, fe = 28;
                              }
                            }
                            28 == fe && (S(O.i | 0, 103, O.h | 0, O.j | 0), QD = OD, RD = PD);
                            var SD = (QD << 3) + l[RD + 16 >> 2] | 0, fv = SD | 0, gv = SD + 4 | 0, bS = l[gv >> 2], TD = (w[0] = l[fv >> 2], N[0]), UD = (w[0] = bS, N[0]), rr = (Xf * TD - Wf * UD + Uu - YR) * hv + (Wf * TD + Xf * UD + Vu - ZR) * BD;
                          } else {
                            S(O.Ca | 0, 183, O.qd | 0, O.k | 0), l[Vm] = -1, l[Um] = -1, rr = 0;
                          }
                        }
                      }
                      mr = rr;
                      if (mr > su) {
                        l[wk] = 4;
                        p[vk] = MA;
                        Fl = 23;
                        break a;
                      }
                      if (mr > OA) {
                        var jv = Bo;
                      } else {
                        var VD = o[zA >> 2], WD = o[AA >> 2], kv = Cm(ir, VD, WD, vf);
                        if (kv < OA) {
                          l[wk] = 1;
                          p[vk] = vf;
                          Fl = 23;
                          break a;
                        }
                        if (kv <= su) {
                          l[wk] = 3;
                          p[vk] = vf;
                          Fl = 23;
                          break a;
                        }
                        for (var wr = Bo, Mo = vf, xr = 0, yr = kv, lv = mr; ; ) {
                          var zr = 0 == (xr & 1 | 0) ? .5 * (Mo + wr) : Mo + (Rm - yr) * (wr - Mo) / (lv - yr), Ar = Cm(ir, VD, WD, zr), mv = Ar - Rm;
                          if (.0012499999720603228 > (0 < mv ? mv : -mv)) {
                            var nv = xr, XD = zr;
                            break;
                          }
                          var Br = Ar > Rm, cS = Br ? lv : Ar, dS = Br ? Ar : yr, eS = Br ? zr : Mo, fS = Br ? wr : zr, YD = xr + 1 | 0;
                          l[Nr >> 2] = l[Nr >> 2] + 1 | 0;
                          if (50 == (YD | 0)) {
                            nv = 50;
                            XD = Bo;
                            break;
                          }
                          wr = fS;
                          Mo = eS;
                          xr = YD;
                          yr = dS;
                          lv = cS;
                        }
                        var ZD = l[Or >> 2];
                        l[Or >> 2] = (ZD | 0) > (nv | 0) ? ZD : nv;
                        var $D = rC + 1 | 0;
                        if (8 != ($D | 0)) {
                          rC = $D;
                          Bo = XD;
                          continue;
                        }
                        jv = vf;
                      }
                      var aE = ro + 1 | 0;
                      l[Pr >> 2] = l[Pr >> 2] + 1 | 0;
                      if (20 == (aE | 0)) {
                        l[wk] = 1;
                        p[vk] = jv;
                        so = 20;
                        Fl = 27;
                        break a;
                      }
                      vf = jv;
                      ro = aE;
                      PA = p[hr];
                      QA = p[gr];
                      RA = p[fr];
                      SA = p[er];
                      continue a;
                    }
                  }
                  23 == Fl && (l[Pr >> 2] = l[Pr >> 2] + 1 | 0, so = ro + 1 | 0);
                  var bE = l[Qr >> 2];
                  l[Qr >> 2] = (bE | 0) > (so | 0) ? bE : so;
                  a = ze;
                  if (3 == (l[Fn >> 2] | 0)) {
                    var cE = cr + (1 - cr) * p[xm >> 2], rv = 1 > cE ? cE : 1;
                  } else {
                    rv = 1;
                  }
                  p[Tg + 33] = rv;
                  l[Xj] |= 32;
                  var sv = rv;
                } else {
                  sv = p[Tg + 33];
                }
                sv < Zd ? (ok = pl, pk = sv) : (ok = re, pk = Zd);
              }
            }
          } while (0);
          re = ok;
          Zd = pk;
          In = pl + 12 | 0;
        }
      }
      c[An] = Jn;
      var Oo = l[ll];
      ho(Oo, l[ll + 5]);
      ho(Oo, l[ll + 6]);
      ho(Oo, l[ll + 4]);
      ho(Oo, l[pm]);
      ho(Oo, Kn);
      a = wg;
      Gr(r);
      p[m + 25756] = ((1e3 * (l[r >> 2] - mm) | 0) >>> 0) + .0010000000474974513 * (l[r + 4 >> 2] | 0) - (nm >>> 0);
      q = 10;
    } else {
      var dE = lm;
      q = 11;
    }
  }
  10 == q && (dE = p[h]);
  0 < dE && (p[M >> 2] = p[k + 1]);
  var tv = o[i], gS = 0 == (tv & 4 | 0);
  do {
    if (gS) {
      var uv = tv;
    } else {
      var eE = l[m + 25738];
      if (0 == (eE | 0)) {
        uv = tv;
      } else {
        var vv = eE;
        for (g = vv >> 2; ; ) {
          p[g + 19] = 0;
          p[g + 20] = 0;
          p[g + 21] = 0;
          var fE = l[g + 24];
          if (0 == (fE | 0)) {
            break;
          }
          vv = fE;
          g = vv >> 2;
        }
        uv = l[i];
      }
    }
  } while (0);
  l[i] = uv & -3;
  Gr(n);
  p[m + 25749] = ((1e3 * (l[n >> 2] - z) | 0) >>> 0) + .0010000000474974513 * (l[n + 4 >> 2] | 0) - (G >>> 0);
  a = n;
}

function Rr(b, d, e, f) {
  var g, h = e >> 2, i = a;
  a += 112;
  var k, m = i + 8, n = i + 16, q = i + 24, r = i + 32, t = i + 40, u = i + 48, v = l[d + 12 >> 2], d = v >> 2, A = l[d + 1];
  a : do {
    if (0 == A) {
      g = p[h + 3];
      var C = p[d + 3];
      k = p[h + 2];
      var B = p[d + 4], y = k * C + g * B + p[h + 1];
      p[i >> 2] = g * C - k * B + p[h];
      p[i + 4 >> 2] = y;
      C = p[d + 2];
      p[m >> 2] = g - 0;
      p[m + 4 >> 2] = k;
      g = l[b + 102984 >> 2];
      K[l[l[g >> 2] + 20 >> 2]](g, i, C, m, f);
    } else {
      if (1 == A) {
        g = p[h + 3];
        y = p[d + 3];
        k = p[h + 2];
        var z = p[d + 4], C = p[h], B = p[h + 1], F = k * y + g * z + B;
        p[n >> 2] = g * y - k * z + C;
        p[n + 4 >> 2] = F;
        z = v + 20 | 0;
        y = p[z >> 2];
        z = p[z + 4 >> 2];
        B = k * y + g * z + B;
        p[q >> 2] = g * y - k * z + C;
        p[q + 4 >> 2] = B;
        g = l[b + 102984 >> 2];
        K[l[l[g >> 2] + 24 >> 2]](g, n, q, f);
      } else {
        if (3 == A) {
          k = l[d + 4];
          g = l[d + 3] >> 2;
          var C = e + 12 | 0, G = p[C >> 2], F = p[g], B = e + 8 | 0, H = p[B >> 2], E = p[g + 1], y = e | 0, I = p[y >> 2], z = e + 4 | 0, J = p[z >> 2], L = H * F + G * E + J;
          p[r >> 2] = G * F - H * E + I;
          p[r + 4 >> 2] = L;
          if (1 < (k | 0)) {
            for (var F = t | 0, E = t + 4 | 0, L = b + 102984 | 0, M = t, V = r, Q = 1, T = J; ; ) {
              var J = p[(Q << 3 >> 2) + g], Y = p[((Q << 3) + 4 >> 2) + g], T = H * J + G * Y + T;
              p[F >> 2] = G * J - H * Y + I;
              p[E >> 2] = T;
              J = l[L >> 2];
              K[l[l[J >> 2] + 24 >> 2]](J, r, t, f);
              J = l[L >> 2];
              K[l[l[J >> 2] + 16 >> 2]](J, r, .05000000074505806, f);
              J = l[M + 4 >> 2];
              l[V >> 2] = l[M >> 2];
              l[V + 4 >> 2] = J;
              Q = Q + 1 | 0;
              if ((Q | 0) == (k | 0)) {
                break a;
              }
              G = p[C >> 2];
              H = p[B >> 2];
              I = p[y >> 2];
              T = p[z >> 2];
            }
          }
        } else {
          if (2 == A) {
            g = l[d + 37];
            if (9 > (g | 0)) {
              if (k = u | 0, 0 < (g | 0)) {
                P = k, k = 10;
              } else {
                var R = k;
                k = 12;
              }
            } else {
              S(O.t | 0, 1077, O.fd | 0, O.cg | 0);
              var P = u | 0;
              k = 10;
            }
            b : do {
              if (10 == k) {
                C = v + 20 | 0;
                B = p[h + 3];
                y = p[h + 2];
                z = p[h];
                F = p[h + 1];
                for (E = 0; ; ) {
                  if (V = p[C + (E << 3) >> 2], Q = p[C + (E << 3) + 4 >> 2], M = y * V + B * Q + F, L = (E << 3) + u | 0, V = (N[0] = B * V - y * Q + z, w[0]), M = (N[0] = M, w[0]) | 0, l[L >> 2] = 0 | V, l[L + 4 >> 2] = M, E = E + 1 | 0, (E | 0) == (g | 0)) {
                    R = P;
                    break b;
                  }
                }
              }
            } while (0);
            k = l[b + 102984 >> 2];
            K[l[l[k >> 2] + 12 >> 2]](k, R, g, f);
          }
        }
      }
    }
  } while (0);
  a = i;
}

function Sr(b) {
  var d, e, f, g, h, i = b >> 2, k = a;
  a += 120;
  var m, n = k + 12, q = k + 24, r = k + 36, t = k + 48, u = k + 60;
  h = u >> 2;
  var v = k + 72, A = k + 104;
  g = (b + 102984 | 0) >> 2;
  var C = l[g], B = 0 == (C | 0);
  a : do {
    if (!B) {
      var y = l[C + 4 >> 2], z = 0 == (y & 1 | 0);
      b : do {
        if (!z) {
          var F = l[i + 25738];
          if (0 != (F | 0)) {
            for (var G = k | 0, H = k + 4 | 0, E = k + 8 | 0, I = r | 0, J = r + 4 | 0, L = r + 8 | 0, M = t | 0, V = t + 4 | 0, Q = t + 8 | 0, T = n | 0, Y = n + 4 | 0, R = n + 8 | 0, P = q | 0, aa = q + 4 | 0, W = q + 8 | 0, da = F; ; ) {
              var sa = da + 12 | 0, ta = l[da + 100 >> 2], ja = 0 == (ta | 0);
              c : do {
                if (!ja) {
                  for (var ua = da + 4 | 0, ha = da | 0, wa = ta; ; ) {
                    var oa = j[ua >> 1];
                    if (0 == (oa & 32) << 16 >> 16) {
                      p[G >> 2] = .5, p[H >> 2] = .5, p[E >> 2] = .30000001192092896, Rr(b, wa, sa, k);
                    } else {
                      var Aa = l[ha >> 2];
                      0 == Aa ? (p[T >> 2] = .5, p[Y >> 2] = .8999999761581421, p[R >> 2] = .5, Rr(b, wa, sa, n)) : 1 == Aa ? (p[P >> 2] = .5, p[aa >> 2] = .5, p[W >> 2] = .8999999761581421, Rr(b, wa, sa, q)) : 0 == (oa & 2) << 16 >> 16 ? (p[I >> 2] = .6000000238418579, p[J >> 2] = .6000000238418579, p[L >> 2] = .6000000238418579, Rr(b, wa, sa, r)) : (p[M >> 2] = .8999999761581421, p[V >> 2] = .699999988079071, p[Q >> 2] = .699999988079071, Rr(b, wa, sa, t));
                    }
                    var Fa = l[wa + 4 >> 2];
                    if (0 == (Fa | 0)) {
                      break c;
                    }
                    wa = Fa;
                  }
                }
              } while (0);
              var La = l[da + 96 >> 2];
              if (0 == (La | 0)) {
                break b;
              }
              da = La;
            }
          }
        }
      } while (0);
      var xa = 0 == (y & 2 | 0);
      b : do {
        if (!xa) {
          var ca = l[i + 25739];
          if (0 != (ca | 0)) {
            for (var Z = ca; ; ) {
              var la = b, ya = Z, fa = ra, $ = ra, eb = ra, Sa = a;
              a += 60;
              var Da = Sa + 8, na = Sa + 16, ma = Sa + 24, Ba = Sa + 32, eb = Ba >> 2, za = Sa + 44, Ha = Sa + 52, jb = l[ya + 52 >> 2] + 12 | 0, Ia = l[ya + 48 >> 2] + 12 | 0, $a = l[Ia + 4 >> 2];
              l[Sa >> 2] = l[Ia >> 2];
              l[Sa + 4 >> 2] = $a;
              var ba = l[jb + 4 >> 2];
              l[Da >> 2] = l[jb >> 2];
              l[Da + 4 >> 2] = ba;
              K[l[l[ya >> 2] >> 2]](na, ya);
              K[l[l[ya >> 2] + 4 >> 2]](ma, ya);
              p[eb] = .5;
              p[eb + 1] = .800000011920929;
              p[eb + 2] = .800000011920929;
              var qa = l[ya + 4 >> 2];
              if (3 == qa) {
                var ka = l[la + 102984 >> 2];
                K[l[l[ka >> 2] + 24 >> 2]](ka, na, ma, Ba);
              } else {
                if (4 == qa) {
                  var ia = ya + 68 | 0, va = l[ia + 4 >> 2];
                  l[za >> 2] = l[ia >> 2];
                  l[za + 4 >> 2] = va;
                  var Oa = ya + 76 | 0, Pa = l[Oa + 4 >> 2];
                  l[Ha >> 2] = l[Oa >> 2];
                  l[Ha + 4 >> 2] = Pa;
                  var $ = (la + 102984 | 0) >> 2, Ta = l[$];
                  K[l[l[Ta >> 2] + 24 >> 2]](Ta, za, na, Ba);
                  var Xa = l[$];
                  K[l[l[Xa >> 2] + 24 >> 2]](Xa, Ha, ma, Ba);
                  var ab = l[$];
                  K[l[l[ab >> 2] + 24 >> 2]](ab, za, Ha, Ba);
                } else {
                  if (5 != qa) {
                    var fa = (la + 102984 | 0) >> 2, kb = l[fa];
                    K[l[l[kb >> 2] + 24 >> 2]](kb, Sa, na, Ba);
                    var mb = l[fa];
                    K[l[l[mb >> 2] + 24 >> 2]](mb, na, ma, Ba);
                    var Qa = l[fa];
                    K[l[l[Qa >> 2] + 24 >> 2]](Qa, Da, ma, Ba);
                  }
                }
              }
              a = Sa;
              var Ma = l[Z + 12 >> 2];
              if (0 == (Ma | 0)) {
                break b;
              }
              Z = Ma;
            }
          }
        }
      } while (0);
      var bb = 0 == (y & 8 | 0);
      b : do {
        if (!bb) {
          var Va = l[i + 25733];
          if (0 != (Va | 0)) {
            for (var Ja = Va; ; ) {
              var ga = l[Ja + 12 >> 2];
              if (0 == (ga | 0)) {
                break b;
              }
              Ja = ga;
            }
          }
        }
      } while (0);
      var cb = 0 == (y & 4 | 0);
      b : do {
        if (!cb) {
          p[h] = .8999999761581421;
          p[h + 1] = .30000001192092896;
          p[h + 2] = .8999999761581421;
          var gb = l[i + 25738];
          if (0 != (gb | 0)) {
            for (var db = b + 102884 | 0, Ya = b + 102876 | 0, Ka = v | 0, Ga = v | 0, fb = v + 4 | 0, Ea = v + 8 | 0, Ua = v + 12 | 0, ob = v + 16 | 0, Na = v + 20 | 0, Wa = v + 24 | 0, nb = v + 28 | 0, pa = gb; ; ) {
              var hb = 0 == (j[pa + 4 >> 1] & 32) << 16 >> 16;
              c : do {
                if (!hb) {
                  var Ca = l[pa + 100 >> 2];
                  if (0 != (Ca | 0)) {
                    for (var ib = Ca; ; ) {
                      var Za = ib + 28 | 0, lb = 0 < (l[Za >> 2] | 0);
                      d : do {
                        if (lb) {
                          for (var qb = ib + 24 | 0, vb = 0; ; ) {
                            var sb = l[(l[qb >> 2] + 24 >> 2) + (7 * vb | 0)];
                            m = -1 < (sb | 0) ? (l[db >> 2] | 0) > (sb | 0) ? 32 : 31 : 31;
                            31 == m && S(O.p | 0, 159, O.H | 0, O.n | 0);
                            f = l[Ya >> 2] >> 2;
                            var Ab = p[f + (9 * sb | 0)], Bb = p[f + (9 * sb | 0) + 1], Gb = p[f + (9 * sb | 0) + 2], Cb = p[f + (9 * sb | 0) + 3];
                            p[Ga >> 2] = Ab;
                            p[fb >> 2] = Bb;
                            p[Ea >> 2] = Gb;
                            p[Ua >> 2] = Bb;
                            p[ob >> 2] = Gb;
                            p[Na >> 2] = Cb;
                            p[Wa >> 2] = Ab;
                            p[nb >> 2] = Cb;
                            var pb = l[g];
                            K[l[l[pb >> 2] + 8 >> 2]](pb, Ka, 4, u);
                            var ub = vb + 1 | 0;
                            if ((ub | 0) >= (l[Za >> 2] | 0)) {
                              break d;
                            }
                            vb = ub;
                          }
                        }
                      } while (0);
                      var Eb = l[ib + 4 >> 2];
                      if (0 == (Eb | 0)) {
                        break c;
                      }
                      ib = Eb;
                    }
                  }
                }
              } while (0);
              var Db = l[pa + 96 >> 2];
              if (0 == (Db | 0)) {
                break b;
              }
              pa = Db;
            }
          }
        }
      } while (0);
      if (0 != (y & 16 | 0)) {
        var wb = l[i + 25738];
        if (0 != (wb | 0)) {
          e = A >> 2;
          for (var Hb = A, tb = wb; ; ) {
            d = (tb + 12 | 0) >> 2;
            l[e] = l[d];
            l[e + 1] = l[d + 1];
            l[e + 2] = l[d + 2];
            l[e + 3] = l[d + 3];
            var xb = tb + 44 | 0, Ib = l[xb + 4 >> 2];
            l[Hb >> 2] = l[xb >> 2];
            l[Hb + 4 >> 2] = Ib;
            var Jb = l[g];
            K[l[l[Jb >> 2] + 28 >> 2]](Jb, A);
            var Lb = l[tb + 96 >> 2];
            if (0 == (Lb | 0)) {
              break a;
            }
            tb = Lb;
          }
        }
      }
    }
  } while (0);
  a = k;
}

function Tr(b) {
  var d, e = b >> 2;
  if (0 == (l[e + 25717] & 2 | 0)) {
    var f = p[e + 25742];
    d = p[e + 25743];
    U(O.ig | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = d, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
    U(O.xd | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
    f = l[e + 25740];
    U(O.Dd | 0, (s = a, a += 4, l[s >> 2] = f, s));
    f = l[e + 25741];
    U(O.Md | 0, (s = a, a += 4, l[s >> 2] = f, s));
    e = l[e + 25738];
    f = 0 == (e | 0);
    a : do {
      if (!f) {
        d = 0;
        for (var g = e; ; ) {
          l[g + 8 >> 2] = d;
          ap(g);
          g = l[g + 96 >> 2];
          if (0 == (g | 0)) {
            break a;
          }
          d = d + 1 | 0;
        }
      }
    } while (0);
    b = (b + 102956 | 0) >> 2;
    e = l[b];
    f = 0 == (e | 0);
    a : do {
      if (!f) {
        d = 0;
        for (g = e; ; ) {
          l[g + 56 >> 2] = d;
          g = l[g + 12 >> 2];
          if (0 == (g | 0)) {
            break;
          }
          d = d + 1 | 0;
        }
        d = l[b];
        if (0 != (d | 0)) {
          g = d;
          for (d = g >> 2; ; ) {
            6 != (l[d + 1] | 0) && (U(O.Pa | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)), K[l[l[d] + 16 >> 2]](g), U(O.Qa | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)));
            d = l[d + 3];
            if (0 == (d | 0)) {
              break;
            }
            g = d;
            d = g >> 2;
          }
          d = l[b];
          if (0 != (d | 0)) {
            g = d;
            for (d = g >> 2; ; ) {
              6 == (l[d + 1] | 0) && (U(O.Pa | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)), K[l[l[d] + 16 >> 2]](g), U(O.Qa | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s)));
              d = l[d + 3];
              if (0 == (d | 0)) {
                break a;
              }
              g = d;
              d = g >> 2;
            }
          }
        }
      }
    } while (0);
    U(O.be | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
    U(O.he | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
    U(O.le | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
    U(O.qe | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  }
}

function ep(b, d) {
  var e, f, g, h, i, k = b >> 2, m = a;
  a += 192;
  i = m >> 2;
  var n = m + 92, q = m + 104, r = m + 128;
  h = r >> 2;
  var t = b + 64 | 0, u = t >> 2;
  g = r >> 2;
  for (var v = u + 16; u < v; u++, g++) {
    l[g] = l[u];
  }
  g = (b + 4 | 0) >> 2;
  u = o[g];
  l[g] = u | 4;
  var v = u >>> 1, A = o[k + 12], C = o[k + 13], u = 0 != ((c[C + 38 | 0] | c[A + 38 | 0]) & 1) << 24 >> 24, B = o[A + 8 >> 2], y = o[C + 8 >> 2], z = B + 12 | 0, F = y + 12 | 0;
  do {
    if (u) {
      e = l[A + 12 >> 2];
      f = l[C + 12 >> 2];
      var G = l[k + 14], H = l[k + 15];
      l[i + 4] = 0;
      l[i + 5] = 0;
      p[i + 6] = 0;
      l[i + 11] = 0;
      l[i + 12] = 0;
      p[i + 13] = 0;
      xi(m | 0, e, G);
      xi(m + 28 | 0, f, H);
      f = (m + 56 | 0) >> 2;
      e = z >> 2;
      l[f] = l[e];
      l[f + 1] = l[e + 1];
      l[f + 2] = l[e + 2];
      l[f + 3] = l[e + 3];
      f = (m + 72 | 0) >> 2;
      e = F >> 2;
      l[f] = l[e];
      l[f + 1] = l[e + 1];
      l[f + 2] = l[e + 2];
      l[f + 3] = l[e + 3];
      c[m + 88 | 0] = 1;
      j[n + 4 >> 1] = 0;
      mk(q, n, m);
      e = 11920928955078125e-22 > p[q + 16 >> 2] & 1;
      l[k + 31] = 0;
      f = e;
      e = v & 1;
    } else {
      K[l[l[k] >> 2]](b, t, z, F);
      G = b + 124 | 0;
      f = 0 < (l[G >> 2] | 0);
      e = f & 1;
      a : do {
        if (f) {
          for (var H = l[h + 15], E = 0; ; ) {
            var I = b + 20 * E + 72 | 0;
            p[I >> 2] = 0;
            var J = b + 20 * E + 76 | 0;
            p[J >> 2] = 0;
            for (var L = l[k + (5 * E | 0) + 20], M = 0; (M | 0) < (H | 0); ) {
              if ((l[h + (5 * M | 0) + 4] | 0) == (L | 0)) {
                p[I >> 2] = p[h + (5 * M | 0) + 2];
                p[J >> 2] = p[h + (5 * M | 0) + 3];
                break;
              }
              M = M + 1 | 0;
            }
            E = E + 1 | 0;
            if ((E | 0) >= (l[G >> 2] | 0)) {
              break a;
            }
          }
        }
      } while (0);
      G = v & 1;
      (f & 1 | 0) != (G | 0) && (f = B + 4 | 0, H = j[f >> 1], 0 == (H & 2) << 16 >> 16 && (j[f >> 1] = H | 2, p[B + 144 >> 2] = 0), f = y + 4 | 0, H = j[f >> 1], 0 == (H & 2) << 16 >> 16 && (j[f >> 1] = H | 2, p[y + 144 >> 2] = 0));
      f = e;
      e = G;
    }
  } while (0);
  h = 0 != f << 24 >> 24;
  i = l[g];
  l[g] = h ? i | 2 : i & -3;
  i = h ^ 1;
  k = 0 == (d | 0);
  if (!(0 != (e | 0) | i | k)) {
    K[l[l[d >> 2] + 8 >> 2]](d, b);
  }
  if (!(h | 0 == (e | 0) | k)) {
    K[l[l[d >> 2] + 12 >> 2]](d, b);
  }
  if (!(u | i | k)) {
    K[l[l[d >> 2] + 16 >> 2]](d, b, r);
  }
  a = m;
}

function Hr(b, d) {
  var e, f, g, h, i, k, m, n, q = d >> 2;
  m = b >> 2;
  n = d >> 2;
  l[m] = l[n];
  l[m + 1] = l[n + 1];
  l[m + 2] = l[n + 2];
  l[m + 3] = l[n + 3];
  l[m + 4] = l[n + 4];
  l[m + 5] = l[n + 5];
  var r = l[q + 10];
  k = b + 32 | 0;
  l[k >> 2] = r;
  m = l[q + 7];
  n = (b + 48 | 0) >> 2;
  l[n] = m;
  var t = 88 * m | 0;
  m = (r + 102796 | 0) >> 2;
  var u = l[m];
  if (32 > (u | 0)) {
    var v = u;
  } else {
    S(O.m | 0, 38, O.w | 0, O.D | 0), v = l[m];
  }
  u = r + 12 * v + 102412 | 0;
  l[(r + 12 * v + 102416 | 0) >> 2] = t;
  i = (r + 102400 | 0) >> 2;
  h = l[i];
  102400 < (h + t | 0) ? (i = Oe(t), l[(u | 0) >> 2] = i, c[r + 12 * v + 102420 | 0] = 1) : (l[(u | 0) >> 2] = r + h | 0, c[r + 12 * v + 102420 | 0] = 0, l[i] = l[i] + t | 0);
  v = r + 102404 | 0;
  t = l[v >> 2] + t | 0;
  l[v >> 2] = t;
  r = r + 102408 | 0;
  v = l[r >> 2];
  l[r >> 2] = (v | 0) > (t | 0) ? v : t;
  l[m] = l[m] + 1 | 0;
  m = b + 36 | 0;
  l[m >> 2] = l[u >> 2];
  r = l[k >> 2];
  t = 152 * l[n] | 0;
  k = (r + 102796 | 0) >> 2;
  u = l[k];
  32 > (u | 0) ? v = u : (S(O.m | 0, 38, O.w | 0, O.D | 0), v = l[k]);
  u = r + 12 * v + 102412 | 0;
  l[(r + 12 * v + 102416 | 0) >> 2] = t;
  i = (r + 102400 | 0) >> 2;
  h = l[i];
  102400 < (h + t | 0) ? (i = Oe(t), l[(u | 0) >> 2] = i, c[r + 12 * v + 102420 | 0] = 1) : (l[(u | 0) >> 2] = r + h | 0, c[r + 12 * v + 102420 | 0] = 0, l[i] = l[i] + t | 0);
  v = r + 102404 | 0;
  t = l[v >> 2] + t | 0;
  l[v >> 2] = t;
  r = r + 102408 | 0;
  v = l[r >> 2];
  l[r >> 2] = (v | 0) > (t | 0) ? v : t;
  l[k] = l[k] + 1 | 0;
  k = b + 40 | 0;
  l[k >> 2] = l[u >> 2];
  l[b + 24 >> 2] = l[q + 8];
  l[b + 28 >> 2] = l[q + 9];
  q = l[q + 6];
  u = b + 44 | 0;
  l[u >> 2] = q;
  r = 0 < (l[n] | 0);
  a : do {
    if (r) {
      t = b + 20 | 0;
      v = b + 8 | 0;
      i = 0;
      for (h = q; ; ) {
        var A = l[h + (i << 2) >> 2];
        h = A >> 2;
        var C = l[h + 12];
        g = l[h + 13];
        var B = p[l[C + 12 >> 2] + 8 >> 2], y = p[l[g + 12 >> 2] + 8 >> 2], z = l[C + 8 >> 2], F = l[g + 8 >> 2], C = l[h + 31], G = 0 < (C | 0);
        G || S(O.$ | 0, 71, O.Uc | 0, O.Nd | 0);
        f = l[k >> 2];
        g = f >> 2;
        p[g + (38 * i | 0) + 34] = p[h + 34];
        p[g + (38 * i | 0) + 35] = p[h + 35];
        var H = z + 8 | 0;
        l[(f + 152 * i + 112 | 0) >> 2] = l[H >> 2];
        var E = F + 8 | 0;
        l[(f + 152 * i + 116 | 0) >> 2] = l[E >> 2];
        var I = z + 120 | 0;
        p[g + (38 * i | 0) + 30] = p[I >> 2];
        var J = F + 120 | 0;
        p[g + (38 * i | 0) + 31] = p[J >> 2];
        var L = z + 128 | 0;
        p[g + (38 * i | 0) + 32] = p[L >> 2];
        var M = F + 128 | 0;
        p[g + (38 * i | 0) + 33] = p[M >> 2];
        l[(f + 152 * i + 148 | 0) >> 2] = i;
        l[(f + 152 * i + 144 | 0) >> 2] = C;
        f = (f + 152 * i + 80 | 0) >> 2;
        l[f] = 0;
        l[f + 1] = 0;
        l[f + 2] = 0;
        l[f + 3] = 0;
        l[f + 4] = 0;
        l[f + 5] = 0;
        l[f + 6] = 0;
        l[f + 7] = 0;
        f = l[m >> 2];
        e = f >> 2;
        l[(f + 88 * i + 32 | 0) >> 2] = l[H >> 2];
        l[(f + 88 * i + 36 | 0) >> 2] = l[E >> 2];
        p[e + (22 * i | 0) + 10] = p[I >> 2];
        p[e + (22 * i | 0) + 11] = p[J >> 2];
        z = z + 28 | 0;
        H = f + 88 * i + 48 | 0;
        E = l[z + 4 >> 2];
        l[(H | 0) >> 2] = l[z >> 2];
        l[(H + 4 | 0) >> 2] = E;
        F = F + 28 | 0;
        z = f + 88 * i + 56 | 0;
        H = l[F + 4 >> 2];
        l[(z | 0) >> 2] = l[F >> 2];
        l[(z + 4 | 0) >> 2] = H;
        p[e + (22 * i | 0) + 16] = p[L >> 2];
        p[e + (22 * i | 0) + 17] = p[M >> 2];
        L = A + 104 | 0;
        M = f + 88 * i + 16 | 0;
        F = l[L + 4 >> 2];
        l[(M | 0) >> 2] = l[L >> 2];
        l[(M + 4 | 0) >> 2] = F;
        L = A + 112 | 0;
        M = f + 88 * i + 24 | 0;
        F = l[L + 4 >> 2];
        l[(M | 0) >> 2] = l[L >> 2];
        l[(M + 4 | 0) >> 2] = F;
        l[(f + 88 * i + 84 | 0) >> 2] = C;
        p[e + (22 * i | 0) + 19] = B;
        p[e + (22 * i | 0) + 20] = y;
        l[(f + 88 * i + 72 | 0) >> 2] = l[h + 30];
        b : do {
          if (G) {
            for (B = 0; ; ) {
              if (y = A + 20 * B + 64 | 0, 0 == (c[t] & 1) << 24 >> 24 ? (p[g + (38 * i | 0) + (9 * B | 0) + 4] = 0, p[g + (38 * i | 0) + (9 * B | 0) + 5] = 0) : (p[g + (38 * i | 0) + (9 * B | 0) + 4] = p[v >> 2] * p[h + (5 * B | 0) + 18], p[g + (38 * i | 0) + (9 * B | 0) + 5] = p[v >> 2] * p[h + (5 * B | 0) + 19]), p[g + (38 * i | 0) + (9 * B | 0)] = 0, p[g + (38 * i | 0) + (9 * B | 0) + 1] = 0, p[g + (38 * i | 0) + (9 * B | 0) + 2] = 0, p[g + (38 * i | 0) + (9 * B | 0) + 3] = 0, p[g + (38 * i | 0) + (9 * B | 0) + 6] = 0, p[g + (38 * i | 0) + (9 * B | 0) + 7] = 0, p[g + (38 * i | 0) + (9 * B | 0) + 8] = 0, e = (B << 3) + f + 88 * i | 0, L = l[y + 4 >> 2], l[(e | 0) >> 2] = l[y >> 2], l[(e + 4 | 0) >> 2] = L, B = B + 1 | 0, (B | 0) == (C | 0)) {
                break b;
              }
            }
          }
        } while (0);
        i = i + 1 | 0;
        if ((i | 0) >= (l[n] | 0)) {
          break a;
        }
        h = l[u >> 2];
      }
    }
  } while (0);
}

function Ir(b) {
  var d, e, f, g, h = a;
  a += 56;
  var i = h + 16, k = h + 32, m = b + 48 | 0, n = 0 < (l[m >> 2] | 0);
  a : do {
    if (n) {
      for (var q = b + 40 | 0, r = b + 36 | 0, t = b + 44 | 0, u = b + 24 | 0, v = b + 28 | 0, A = h + 8 | 0, C = h + 12 | 0, B = i + 8 | 0, y = i + 12 | 0, z = h, F = i, G = k, H = k, E = 0; ; ) {
        var I = o[q >> 2];
        g = I >> 2;
        var J = l[r >> 2], L = p[(J + 76 >> 2) + (22 * E | 0)], M = p[(J + 80 >> 2) + (22 * E | 0)], V = l[l[t >> 2] + (l[g + (38 * E | 0) + 37] << 2) >> 2], Q = V + 64 | 0, T = l[g + (38 * E | 0) + 28], Y = l[g + (38 * E | 0) + 29], R = p[g + (38 * E | 0) + 30], P = p[g + (38 * E | 0) + 31], aa = p[g + (38 * E | 0) + 32], W = p[g + (38 * E | 0) + 33], da = J + 88 * E + 48 | 0, sa = l[da + 4 >> 2], ta = (w[0] = l[da >> 2], N[0]), ja = (w[0] = sa, N[0]), ua = J + 88 * E + 56 | 0, ha = l[ua + 4 >> 2], wa = (w[0] = l[ua >> 2], N[0]), oa = (w[0] = ha, N[0]), Aa = l[u >> 2], Fa = Aa + 12 * T | 0, La = Fa | 0, xa = Fa + 4 | 0, ca = l[xa >> 2], Z = (w[0] = l[La >> 2], N[0]), la = (w[0] = ca, N[0]), ya = p[(Aa + 8 >> 2) + (3 * T | 0)], fa = l[v >> 2], $ = fa + 12 * T | 0, eb = l[$ + 4 >> 2], Sa = (w[0] = l[$ >> 2], N[0]), Da = (w[0] = eb, N[0]), na = p[(fa + 8 >> 2) + (3 * T | 0)], ma = Aa + 12 * Y | 0, Ba = l[ma + 4 >> 2], za = (w[0] = l[ma >> 2], N[0]), Ha = (w[0] = Ba, N[0]), jb = p[(Aa + 8 >> 2) + (3 * Y | 0)], Ia = fa + 12 * Y | 0, $a = l[Ia + 4 >> 2], ba = (w[0] = l[Ia >> 2], N[0]), qa = (w[0] = $a, N[0]), ka = p[(fa + 8 >> 2) + (3 * Y | 0)];
        0 < (l[V + 124 >> 2] | 0) || S(O.$ | 0, 168, O.Tc | 0, O.De | 0);
        var ia = Dm(ya);
        p[A >> 2] = ia;
        var va = Em(ya);
        p[C >> 2] = va;
        var Oa = Dm(jb);
        p[B >> 2] = Oa;
        var Pa = Em(jb);
        p[y >> 2] = Pa;
        var Ta = la - (ia * ta + va * ja), Xa = (N[0] = Z - (va * ta - ia * ja), w[0]), ab = (N[0] = Ta, w[0]) | 0;
        l[z >> 2] = 0 | Xa;
        l[z + 4 >> 2] = ab;
        var kb = Ha - (Oa * wa + Pa * oa), mb = (N[0] = za - (Pa * wa - Oa * oa), w[0]), Qa = (N[0] = kb, w[0]) | 0;
        l[F >> 2] = 0 | mb;
        l[F + 4 >> 2] = Qa;
        Lh(G, Q, h, L, i, M);
        var Ma = I + 152 * E + 72 | 0, bb = Ma, La = H | 0, Va = l[La >> 2], xa = H + 4 | 0, Ja = l[xa >> 2];
        l[bb >> 2] = Va;
        l[bb + 4 >> 2] = Ja;
        f = (I + 152 * E + 144 | 0) >> 2;
        var ga = l[f], cb = 0 < (ga | 0);
        do {
          if (cb) {
            e = (I + 152 * E + 76 | 0) >> 2;
            d = (Ma | 0) >> 2;
            for (var gb = R + P, db = -ka, Ya = -na, Ka = I + 152 * E + 140 | 0, Ga = 0; ; ) {
              var fb = p[k + (Ga << 3) + 8 >> 2], Ea = fb - Z, Ua = p[k + (Ga << 3) + 12 >> 2], ob = Ua - la, Na = I + 152 * E + 36 * Ga | 0, Wa = (N[0] = Ea, w[0]), nb = (N[0] = ob, w[0]) | 0;
              l[Na >> 2] = 0 | Wa;
              l[Na + 4 >> 2] = nb;
              var pa = fb - za, hb = Ua - Ha, Ca = I + 152 * E + 36 * Ga + 8 | 0, ib = (N[0] = pa, w[0]), Za = (N[0] = hb, w[0]) | 0;
              l[Ca >> 2] = 0 | ib;
              l[Ca + 4 >> 2] = Za;
              var lb = p[e], qb = p[g + (38 * E | 0) + (9 * Ga | 0) + 1], vb = p[d], sb = Ea * lb - qb * vb, Ab = p[g + (38 * E | 0) + (9 * Ga | 0) + 3], Bb = pa * lb - Ab * vb, Gb = gb + aa * sb * sb + W * Bb * Bb;
              p[g + (38 * E | 0) + (9 * Ga | 0) + 6] = 0 < Gb ? 1 / Gb : 0;
              var Cb = p[e], pb = -1 * p[d], ub = Ea * pb - qb * Cb, Eb = pa * pb - Ab * Cb, Db = gb + aa * ub * ub + W * Eb * Eb;
              p[g + (38 * E | 0) + (9 * Ga | 0) + 7] = 0 < Db ? 1 / Db : 0;
              var wb = I + 152 * E + 36 * Ga + 32 | 0;
              p[wb >> 2] = 0;
              var Hb = p[d] * (ba + Ab * db - Sa - qb * Ya) + p[e] * (qa + pa * ka - Da - Ea * na);
              -1 > Hb && (p[wb >> 2] = Hb * -p[Ka >> 2]);
              var tb = Ga + 1 | 0;
              if ((tb | 0) == (ga | 0)) {
                break;
              }
              Ga = tb;
            }
            if (2 == (l[f] | 0)) {
              var xb = p[e], Ib = p[d], Jb = p[g + (38 * E | 0)] * xb - p[g + (38 * E | 0) + 1] * Ib, Lb = p[g + (38 * E | 0) + 2] * xb - p[g + (38 * E | 0) + 3] * Ib, Xb = p[g + (38 * E | 0) + 9] * xb - p[g + (38 * E | 0) + 10] * Ib, Nb = p[g + (38 * E | 0) + 11] * xb - p[g + (38 * E | 0) + 12] * Ib, Sb = aa * Jb, Ob = W * Lb, Vb = gb + Sb * Jb + Ob * Lb, Zb = gb + aa * Xb * Xb + W * Nb * Nb, dc = gb + Sb * Xb + Ob * Nb, fc = Vb * Zb - dc * dc;
              if (Vb * Vb < 1e3 * fc) {
                p[g + (38 * E | 0) + 24] = Vb;
                p[g + (38 * E | 0) + 25] = dc;
                p[g + (38 * E | 0) + 26] = dc;
                p[g + (38 * E | 0) + 27] = Zb;
                var kc = 0 != fc ? 1 / fc : fc, Fb = dc * -kc, Wb = kc * Vb;
                p[g + (38 * E | 0) + 20] = kc * Zb;
                p[g + (38 * E | 0) + 21] = Fb;
                p[g + (38 * E | 0) + 22] = Fb;
                p[g + (38 * E | 0) + 23] = Wb;
              } else {
                l[f] = 1;
              }
            }
          }
        } while (0);
        var vc = E + 1 | 0;
        if ((vc | 0) >= (l[m >> 2] | 0)) {
          break a;
        }
        E = vc;
      }
    }
  } while (0);
  a = h;
}

function Jr(b) {
  var d, e, f, g, h = b + 48 | 0, i = 0 < (l[h >> 2] | 0);
  a : do {
    if (i) {
      var k = b + 40 | 0;
      g = (b + 28 | 0) >> 2;
      for (var m = 0; ; ) {
        var n = o[k >> 2];
        f = n >> 2;
        var q = n + 152 * m | 0, r = o[f + (38 * m | 0) + 28], t = o[f + (38 * m | 0) + 29], u = p[f + (38 * m | 0) + 30], v = p[f + (38 * m | 0) + 32], A = p[f + (38 * m | 0) + 31], C = p[f + (38 * m | 0) + 33], B = n + 152 * m + 144 | 0, y = o[B >> 2], z = l[g], F = z + 12 * r | 0, G = l[F + 4 >> 2], H = (w[0] = l[F >> 2], N[0]), E = (w[0] = G, N[0]), I = p[(z + 8 >> 2) + (3 * r | 0)], J = z + 12 * t | 0, L = l[J + 4 >> 2], M = (w[0] = l[J >> 2], N[0]), V = (w[0] = L, N[0]), Q = p[(z + 8 >> 2) + (3 * t | 0)], T = n + 152 * m + 72 | 0, Y = l[T + 4 >> 2], R = (w[0] = l[T >> 2], N[0]), P = (w[0] = Y, N[0]), aa = -1 * R, W = p[f + (38 * m | 0) + 34];
        2 > (y - 1 | 0) >>> 0 || S(O.$ | 0, 311, O.lb | 0, O.of | 0);
        var da = 0 < (y | 0);
        b : do {
          if (da) {
            for (var sa = V, ta = M, ja = E, ua = H, ha = I, wa = Q, oa = 0; ; ) {
              var Aa = p[f + (38 * m | 0) + (9 * oa | 0) + 3], Fa = p[f + (38 * m | 0) + (9 * oa | 0) + 2], La = p[f + (38 * m | 0) + (9 * oa | 0) + 1], xa = p[f + (38 * m | 0) + (9 * oa | 0)], ca = W * p[f + (38 * m | 0) + (9 * oa | 0) + 4], Z = n + 152 * m + 36 * oa + 20 | 0, la = p[Z >> 2], ya = la + p[f + (38 * m | 0) + (9 * oa | 0) + 7] * -((ta + Aa * -wa - ua - La * -ha) * P + (sa + Fa * wa - ja - xa * ha) * aa), fa = -ca, $ = ya < ca ? ya : ca, eb = $ < fa ? fa : $, Sa = eb - la;
              p[Z >> 2] = eb;
              var Da = P * Sa, na = aa * Sa, ma = ua - Da * u, Ba = ja - na * u, za = ha - v * (xa * na - La * Da), Ha = ta + Da * A, jb = sa + na * A, Ia = wa + C * (Fa * na - Aa * Da), $a = oa + 1 | 0;
              if (($a | 0) == (y | 0)) {
                var ba = jb, qa = Ha, ka = Ba, ia = ma, va = za, Oa = Ia;
                break b;
              }
              sa = jb;
              ta = Ha;
              ja = Ba;
              ua = ma;
              ha = za;
              wa = Ia;
              oa = $a;
            }
          } else {
            ba = V, qa = M, ka = E, ia = H, va = I, Oa = Q;
          }
        } while (0);
        var Pa = 1 == (l[B >> 2] | 0);
        b : do {
          if (Pa) {
            var Ta = p[f + (38 * m | 0) + 3], Xa = p[f + (38 * m | 0) + 2], ab = p[f + (38 * m | 0) + 1], kb = p[q >> 2], mb = n + 152 * m + 16 | 0, Qa = p[mb >> 2], Ma = Qa + ((qa + Ta * -Oa - ia - ab * -va) * R + (ba + Xa * Oa - ka - kb * va) * P - p[f + (38 * m | 0) + 8]) * -p[f + (38 * m | 0) + 6], bb = 0 < Ma ? Ma : 0, Va = bb - Qa;
            p[mb >> 2] = bb;
            var Ja = R * Va, ga = P * Va, cb = Oa + C * (Xa * ga - Ta * Ja), gb = va - v * (kb * ga - ab * Ja), db = ia - Ja * u, Ya = ka - ga * u, Ka = qa + Ja * A, Ga = ba + ga * A;
          } else {
            e = (n + 152 * m + 16 | 0) >> 2;
            var fb = p[e];
            d = (n + 152 * m + 52 | 0) >> 2;
            var Ea = p[d];
            0 > fb | 0 > Ea && S(O.$ | 0, 406, O.lb | 0, O.Cf | 0);
            var Ua = -Oa, ob = p[f + (38 * m | 0) + 3], Na = p[f + (38 * m | 0) + 2], Wa = -va, nb = p[f + (38 * m | 0) + 1], pa = p[q >> 2], hb = p[f + (38 * m | 0) + 12], Ca = p[f + (38 * m | 0) + 11], ib = p[f + (38 * m | 0) + 10], Za = p[f + (38 * m | 0) + 9], lb = p[f + (38 * m | 0) + 26], qb = p[f + (38 * m | 0) + 25], vb = (qa + ob * Ua - ia - nb * Wa) * R + (ba + Na * Oa - ka - pa * va) * P - p[f + (38 * m | 0) + 8] - (p[f + (38 * m | 0) + 24] * fb + lb * Ea), sb = (qa + hb * Ua - ia - ib * Wa) * R + (ba + Ca * Oa - ka - Za * va) * P - p[f + (38 * m | 0) + 17] - (qb * fb + p[f + (38 * m | 0) + 27] * Ea), Ab = p[f + (38 * m | 0) + 20] * vb + p[f + (38 * m | 0) + 22] * sb, Bb = p[f + (38 * m | 0) + 21] * vb + p[f + (38 * m | 0) + 23] * sb, Gb = -Ab, Cb = -Bb;
            if (0 < Ab | 0 < Bb) {
              var pb = vb * -p[f + (38 * m | 0) + 6], ub = 0 > pb;
              do {
                if (!ub && 0 <= qb * pb + sb) {
                  var Eb = pb - fb, Db = -Ea, wb = R * Eb, Hb = P * Eb, tb = R * Db, xb = P * Db, Ib = wb + tb, Jb = Hb + xb, Lb = ia - Ib * u, Xb = ka - Jb * u, Nb = va - v * (pa * Hb - nb * wb + (Za * xb - ib * tb)), Sb = qa + Ib * A, Ob = ba + Jb * A, Vb = Oa + C * (Na * Hb - ob * wb + (Ca * xb - hb * tb));
                  p[e] = pb;
                  p[d] = 0;
                  cb = Vb;
                  gb = Nb;
                  db = Lb;
                  Ya = Xb;
                  Ka = Sb;
                  Ga = Ob;
                  break b;
                }
              } while (0);
              var Zb = sb * -p[f + (38 * m | 0) + 15], dc = 0 > Zb;
              do {
                if (!dc && 0 <= lb * Zb + vb) {
                  var fc = -fb, kc = Zb - Ea, Fb = R * fc, Wb = P * fc, vc = R * kc, $b = P * kc, Yb = Fb + vc, wc = Wb + $b, xc = ia - Yb * u, Hc = ka - wc * u, Bd = va - v * (pa * Wb - nb * Fb + (Za * $b - ib * vc)), rc = qa + Yb * A, Rc = ba + wc * A, Ic = Oa + C * (Na * Wb - ob * Fb + (Ca * $b - hb * vc));
                  p[e] = 0;
                  p[d] = Zb;
                  cb = Ic;
                  gb = Bd;
                  db = xc;
                  Ya = Hc;
                  Ka = rc;
                  Ga = Rc;
                  break b;
                }
              } while (0);
              if (0 > vb | 0 > sb) {
                cb = Oa, gb = va, db = ia, Ya = ka, Ka = qa, Ga = ba;
              } else {
                var ad = -fb, pc = -Ea, Pb = R * ad, Rb = P * ad, bd = R * pc, sc = P * pc, mc = Pb + bd, yc = Rb + sc, tc = ia - mc * u, Jc = ka - yc * u, uc = va - v * (pa * Rb - nb * Pb + (Za * sc - ib * bd)), ec = qa + mc * A, Oc = ba + yc * A, Sc = Oa + C * (Na * Rb - ob * Pb + (Ca * sc - hb * bd));
                p[e] = 0;
                p[d] = 0;
                cb = Sc;
                gb = uc;
                db = tc;
                Ya = Jc;
                Ka = ec;
                Ga = Oc;
              }
            } else {
              var lc = Gb - fb, Kc = Cb - Ea, rd = R * lc, Cd = P * lc, kd = R * Kc, sd = P * Kc, Md = rd + kd, Nd = Cd + sd, Vc = ia - Md * u, Fc = ka - Nd * u, nc = va - v * (pa * Cd - nb * rd + (Za * sd - ib * kd)), jc = qa + Md * A, gc = ba + Nd * A, Od = Oa + C * (Na * Cd - ob * rd + (Ca * sd - hb * kd));
              p[e] = Gb;
              p[d] = Cb;
              cb = Od;
              gb = nc;
              db = Vc;
              Ya = Fc;
              Ka = jc;
              Ga = gc;
            }
          }
        } while (0);
        var Ae = l[g] + 12 * r | 0, cd = (N[0] = db, w[0]), dd = (N[0] = Ya, w[0]) | 0;
        l[(Ae | 0) >> 2] = 0 | cd;
        l[(Ae + 4 | 0) >> 2] = dd;
        p[(l[g] + 8 >> 2) + (3 * r | 0)] = gb;
        var Bc = l[g] + 12 * t | 0, qc = (N[0] = Ka, w[0]), zc = (N[0] = Ga, w[0]) | 0;
        l[(Bc | 0) >> 2] = 0 | qc;
        l[(Bc + 4 | 0) >> 2] = zc;
        p[(l[g] + 8 >> 2) + (3 * t | 0)] = cb;
        var td = m + 1 | 0;
        if ((td | 0) >= (l[h >> 2] | 0)) {
          break a;
        }
        m = td;
      }
    }
  } while (0);
}

function Kr(b, d, e, f, g) {
  var h = f >> 2, i = e >> 2, d = d >> 2;
  0 < (l[d + 21] | 0) || S(O.$ | 0, 617, O.Xc | 0, O.Mf | 0);
  var k = l[d + 18];
  if (0 == k) {
    var e = p[i + 3], k = p[d + 6], m = p[i + 2], n = p[d + 7], g = e * k - m * n + p[i], i = m * k + e * n + p[i + 1], k = p[h + 3], m = p[d], n = p[h + 2], f = p[d + 1], e = k * m - n * f + p[h], m = n * m + k * f + p[h + 1], h = e - g, k = m - i, n = (N[0] = h, w[0]), f = (N[0] = k, w[0]) | 0;
    l[b >> 2] = 0 | n;
    l[b + 4 >> 2] = f;
    n = Hh(h * h + k * k);
    1.1920928955078125e-7 > n ? (n = h, f = k) : (f = 1 / n, n = h * f, p[b >> 2] = n, f *= k, p[(b + 4 | 0) >> 2] = f);
    var q = b + 8 | 0, g = (N[0] = .5 * (g + e), w[0]), i = (N[0] = .5 * (i + m), w[0]) | 0;
    l[q >> 2] = 0 | g;
    l[q + 4 >> 2] = i;
    p[b + 16 >> 2] = h * n + k * f - p[d + 19] - p[d + 20];
  } else {
    if (1 == k) {
      var m = e + 12 | 0, k = p[m >> 2], n = p[d + 4], f = e + 8 | 0, q = p[f >> 2], r = p[d + 5], e = k * n - q * r, k = q * n + k * r, n = (N[0] = e, w[0]), q = (N[0] = k, w[0]) | 0;
      l[(b | 0) >> 2] = 0 | n;
      l[(b + 4 | 0) >> 2] = q;
      var m = p[m >> 2], n = p[d + 6], f = p[f >> 2], q = p[d + 7], r = p[h + 3], t = p[(g << 3 >> 2) + d], u = p[h + 2], v = p[((g << 3) + 4 >> 2) + d], g = r * t - u * v + p[h], h = u * t + r * v + p[h + 1];
      p[b + 16 >> 2] = (g - (m * n - f * q + p[i])) * e + (h - (f * n + m * q + p[i + 1])) * k - p[d + 19] - p[d + 20];
      b = b + 8 | 0;
      d = (N[0] = g, w[0]);
      h = (N[0] = h, w[0]) | 0;
      l[(b | 0) >> 2] = 0 | d;
      l[(b + 4 | 0) >> 2] = h;
    } else {
      2 == k && (m = f + 12 | 0, k = p[m >> 2], n = p[d + 4], f = f + 8 | 0, q = p[f >> 2], r = p[d + 5], e = k * n - q * r, k = q * n + k * r, n = (N[0] = e, w[0]), q = (N[0] = k, w[0]) | 0, l[(b | 0) >> 2] = 0 | n, l[(b + 4 | 0) >> 2] = q, m = p[m >> 2], n = p[d + 6], f = p[f >> 2], q = p[d + 7], r = p[i + 3], t = p[(g << 3 >> 2) + d], u = p[i + 2], v = p[((g << 3) + 4 >> 2) + d], g = r * t - u * v + p[i], i = u * t + r * v + p[i + 1], p[b + 16 >> 2] = (g - (m * n - f * q + p[h])) * e + (i - (f * n + m * q + p[h + 1])) * k - p[d + 19] - p[d + 20], d = b + 8 | 0, h = (N[0] = g, w[0]), i = (N[0] = i, w[0]) | 0, l[(d | 0) >> 2] = 0 | h, l[(d + 4 | 0) >> 2] = i, d = (N[0] = -e, w[0]), h = (N[0] = -k, w[0]) | 0, l[b >> 2] = 0 | d, l[b + 4 >> 2] = h);
    }
  }
}

function sq(b, d) {
  var e, f, g, h, i, k, m, n, q, r, t = b >> 2, u = b | 0;
  l[u >> 2] = mq + 8 | 0;
  var v = d + 8 | 0, A = d + 12 | 0;
  (l[v >> 2] | 0) == (l[A >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[t + 1] = l[d >> 2];
  l[t + 2] = 0;
  l[t + 3] = 0;
  var C = b + 48 | 0;
  l[C >> 2] = l[v >> 2];
  var B = b + 52 | 0;
  l[B >> 2] = l[A >> 2];
  l[t + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[t + 16] = l[d + 4 >> 2];
  r = (b + 16 | 0) >> 2;
  l[r] = 0;
  l[r + 1] = 0;
  l[r + 2] = 0;
  l[r + 3] = 0;
  l[r + 4] = 0;
  l[r + 5] = 0;
  l[r + 6] = 0;
  l[r + 7] = 0;
  l[u >> 2] = Ur + 8 | 0;
  var y = b + 92 | 0, z = b + 100 | 0, F = b + 108 | 0, G = b + 116 | 0, H = b + 124 | 0, E = b + 132 | 0, I = d + 20 | 0, J = l[I >> 2], L = b + 68 | 0;
  l[L >> 2] = J;
  var M = d + 24 | 0, V = l[M >> 2], Q = b + 72 | 0;
  l[Q >> 2] = V;
  var T = l[J + 4 >> 2], Y = b + 76 | 0;
  l[Y >> 2] = T;
  var R = o[V + 4 >> 2];
  q = (b + 80 | 0) >> 2;
  l[q] = R;
  if (2 > (T - 1 | 0) >>> 0) {
    var P = R;
  } else {
    S(O.Mb | 0, 53, O.fb | 0, O.Qd | 0), P = l[q];
  }
  2 > (P - 1 | 0) >>> 0 || S(O.Mb | 0, 54, O.fb | 0, O.Fe | 0);
  var aa = o[L >> 2], W = o[aa + 48 >> 2];
  n = W >> 2;
  l[t + 21] = W;
  var da = o[aa + 52 >> 2];
  m = da >> 2;
  l[C >> 2] = da;
  var sa = p[m + 5], ta = p[m + 6], ja = p[n + 5], ua = p[n + 6], ha = o[I >> 2];
  if (1 == (l[Y >> 2] | 0)) {
    var wa = p[m + 14], oa = p[n + 14], Aa = ha + 68 | 0, Fa = Aa | 0, La = l[Fa >> 2], xa = Aa + 4 | 0, ca = l[xa >> 2], Z = F | 0;
    k = Z >> 2;
    l[k] = La;
    var la = F + 4 | 0;
    i = la >> 2;
    l[i] = ca;
    var ya = ha + 76 | 0, fa = ya | 0, $ = l[fa >> 2], eb = ya + 4 | 0, Sa = l[eb >> 2], Da = y | 0;
    h = Da >> 2;
    l[h] = $;
    var na = y + 4 | 0;
    g = na >> 2;
    l[g] = Sa;
    var ma = p[ha + 116 >> 2];
    p[t + 35] = ma;
    p[H >> 2] = 0;
    p[t + 32] = 0;
    var Ba = wa - oa - ma;
  } else {
    var za = p[n + 4], Ha = p[n + 3], jb = p[m + 4], Ia = p[m + 3], $a = ha + 68 | 0, Z = $a | 0;
    k = Z >> 2;
    var ba = l[k], la = $a + 4 | 0;
    i = la >> 2;
    var qa = l[i], ka = F | 0;
    l[ka >> 2] = ba;
    var ia = F + 4 | 0;
    l[ia >> 2] = qa;
    var va = ha + 76 | 0, Da = va | 0;
    h = Da >> 2;
    var Oa = l[h], na = va + 4 | 0;
    g = na >> 2;
    var Pa = l[g], Ta = y | 0;
    l[Ta >> 2] = Oa;
    var Xa = y + 4 | 0;
    l[Xa >> 2] = Pa;
    p[t + 35] = p[ha + 100 >> 2];
    var ab = ha + 84 | 0, kb = ab | 0, mb = l[kb >> 2], Qa = ab + 4 | 0, Ma = l[Qa >> 2], bb = H | 0;
    l[bb >> 2] = mb;
    var Va = H + 4 | 0;
    l[Va >> 2] = Ma;
    var Ja = (w[0] = ba, N[0]), ga = (w[0] = qa, N[0]), cb = (w[0] = Oa, N[0]), gb = ta * cb, db = (w[0] = Pa, N[0]), Ya = gb - sa * db + (Ia - Ha), Ka = sa * cb + ta * db + (jb - za), Ga = ua * Ya + ja * Ka - Ja, fb = Ya * -ja + ua * Ka - ga, Ea = (w[0] = mb, N[0]), Ua = Ga * Ea, ob = (w[0] = Ma, N[0]), Ba = Ua + fb * ob;
  }
  var Na = l[Q >> 2], Wa = l[Na + 48 >> 2];
  f = Wa >> 2;
  l[t + 22] = Wa;
  var nb = l[Na + 52 >> 2];
  e = nb >> 2;
  l[B >> 2] = nb;
  var pa = p[e + 5], hb = p[e + 6], Ca = p[f + 5], ib = p[f + 6], Za = l[M >> 2];
  if (1 == (l[q] | 0)) {
    var lb = p[e + 14], qb = p[f + 14], vb = Za + 68 | 0, Fa = vb | 0, sb = l[Fa >> 2], xa = vb + 4 | 0, Ab = l[xa >> 2], Z = G | 0;
    k = Z >> 2;
    l[k] = sb;
    la = G + 4 | 0;
    i = la >> 2;
    l[i] = Ab;
    var Bb = Za + 76 | 0, fa = Bb | 0, Gb = l[fa >> 2], eb = Bb + 4 | 0, Cb = l[eb >> 2], Da = z | 0;
    h = Da >> 2;
    l[h] = Gb;
    na = z + 4 | 0;
    g = na >> 2;
    l[g] = Cb;
    var pb = p[Za + 116 >> 2];
    p[t + 36] = pb;
    p[E >> 2] = 0;
    p[t + 34] = 0;
    var ub = lb - qb - pb;
  } else {
    var Eb = p[f + 4], Db = p[f + 3], wb = p[e + 4], Hb = p[e + 3], tb = Za + 68 | 0, Z = tb | 0;
    k = Z >> 2;
    var xb = l[k], la = tb + 4 | 0;
    i = la >> 2;
    var Ib = l[i], ka = G | 0;
    l[ka >> 2] = xb;
    ia = G + 4 | 0;
    l[ia >> 2] = Ib;
    var Jb = Za + 76 | 0, Da = Jb | 0;
    h = Da >> 2;
    var Lb = l[h], na = Jb + 4 | 0;
    g = na >> 2;
    var Xb = l[g], Ta = z | 0;
    l[Ta >> 2] = Lb;
    Xa = z + 4 | 0;
    l[Xa >> 2] = Xb;
    p[t + 36] = p[Za + 100 >> 2];
    var Nb = Za + 84 | 0, kb = Nb | 0, Sb = l[kb >> 2], Qa = Nb + 4 | 0, Ob = l[Qa >> 2], bb = E | 0;
    l[bb >> 2] = Sb;
    Va = E + 4 | 0;
    l[Va >> 2] = Ob;
    var Vb = (w[0] = xb, N[0]), Zb = (w[0] = Ib, N[0]), dc = (w[0] = Lb, N[0]), fc = hb * dc, kc = (w[0] = Xb, N[0]), Fb = fc - pa * kc + (Hb - Db), Wb = pa * dc + hb * kc + (wb - Eb), vc = ib * Fb + Ca * Wb - Vb, $b = Fb * -Ca + ib * Wb - Zb, Yb = (w[0] = Sb, N[0]), wc = vc * Yb, xc = (w[0] = Ob, N[0]), ub = wc + $b * xc;
  }
  var Hc = p[d + 28 >> 2];
  p[t + 38] = Hc;
  p[t + 37] = Ba + Hc * ub;
  p[t + 39] = 0;
}

function oq(b, d) {
  var e, f, g = b >> 2, h = b | 0;
  l[h >> 2] = mq + 8 | 0;
  var i = d + 8 | 0;
  f = d + 12 | 0;
  (l[i >> 2] | 0) == (l[f >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[g + 1] = l[d >> 2];
  l[g + 2] = 0;
  l[g + 3] = 0;
  l[g + 12] = l[i >> 2];
  i = b + 52 | 0;
  l[i >> 2] = l[f >> 2];
  l[g + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[g + 16] = l[d + 4 >> 2];
  f = (b + 16 | 0) >> 2;
  l[f] = 0;
  l[f + 1] = 0;
  l[f + 2] = 0;
  l[f + 3] = 0;
  l[f + 4] = 0;
  l[f + 5] = 0;
  l[f + 6] = 0;
  l[f + 7] = 0;
  l[h >> 2] = Vr + 8 | 0;
  h = b + 68 | 0;
  e = b + 76 | 0;
  var k = d + 20 | 0;
  f = p[k >> 2];
  (!isNaN(f) && !isNaN(0)) & -Infinity < f & Infinity > f ? (f = p[d + 24 >> 2], f = (!isNaN(f) && !isNaN(0)) & -Infinity < f & Infinity > f ? 5 : 4) : f = 4;
  4 == f && S(O.ba | 0, 34, O.da | 0, O.Td | 0);
  f = d + 28 | 0;
  var m = p[f >> 2];
  0 > m | (!isNaN(m) && !isNaN(0)) & -Infinity < m & Infinity > m ^ 1 && S(O.ba | 0, 35, O.da | 0, O.He | 0);
  var m = d + 32 | 0, n = p[m >> 2];
  0 > n | (!isNaN(n) && !isNaN(0)) & -Infinity < n & Infinity > n ^ 1 && S(O.ba | 0, 36, O.da | 0, O.sf | 0);
  var n = d + 36 | 0, q = p[n >> 2];
  0 > q | (!isNaN(q) && !isNaN(0)) & -Infinity < q & Infinity > q ^ 1 && S(O.ba | 0, 37, O.da | 0, O.Ef | 0);
  q = o[k >> 2];
  k = o[k + 4 >> 2];
  l[e >> 2] = q;
  l[e + 4 >> 2] = k;
  e = o[i >> 2] >> 2;
  var i = (w[0] = q, N[0]) - p[e + 3], k = (w[0] = k, N[0]) - p[e + 4], q = p[e + 6], r = p[e + 5];
  e = (N[0] = q * i + r * k, w[0]);
  i = (N[0] = i * -r + q * k, w[0]) | 0;
  l[h >> 2] = 0 | e;
  l[h + 4 >> 2] = i;
  p[g + 26] = p[f >> 2];
  p[g + 24] = 0;
  p[g + 25] = 0;
  p[g + 21] = p[m >> 2];
  p[g + 22] = p[n >> 2];
  p[g + 23] = 0;
  p[g + 27] = 0;
}

function pq(b, d) {
  var e, f = d >> 2, g = b >> 2, h = b | 0;
  l[h >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var i = d + 12 | 0;
  (l[e >> 2] | 0) == (l[i >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[g + 1] = l[f];
  l[g + 2] = 0;
  l[g + 3] = 0;
  l[g + 12] = l[e >> 2];
  l[g + 13] = l[i >> 2];
  l[g + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[g + 16] = l[f + 1];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[h >> 2] = Wr + 8 | 0;
  i = b + 76 | 0;
  e = b + 84 | 0;
  var h = b + 92 | 0, k = d + 20 | 0, m = b + 68 | 0, n = l[k + 4 >> 2];
  l[m >> 2] = l[k >> 2];
  l[m + 4 >> 2] = n;
  k = d + 28 | 0;
  m = l[k + 4 >> 2];
  l[i >> 2] = l[k >> 2];
  l[i + 4 >> 2] = m;
  k = d + 36 | 0;
  i = l[k >> 2];
  k = l[k + 4 >> 2];
  l[e >> 2] = i;
  l[e + 4 >> 2] = k;
  i = (w[0] = i, N[0]);
  k = (w[0] = k, N[0]);
  m = Hh(i * i + k * k);
  1.1920928955078125e-7 > m ? e = k : (m = 1 / m, i *= m, p[e >> 2] = i, e = k * m, p[(b + 88 | 0) >> 2] = e);
  e = (N[0] = -1 * e, w[0]);
  i = (N[0] = i, w[0]) | 0;
  l[h >> 2] = 0 | e;
  l[h + 4 >> 2] = i;
  p[g + 25] = p[f + 11];
  p[g + 26] = 0;
  p[g + 27] = 0;
  p[g + 28] = 0;
  p[g + 63] = 0;
  p[g + 29] = 0;
  p[g + 30] = p[f + 13];
  p[g + 31] = p[f + 14];
  p[g + 32] = p[f + 16];
  p[g + 33] = p[f + 17];
  c[b + 136 | 0] = c[d + 48 | 0] & 1;
  c[b + 137 | 0] = c[d + 60 | 0] & 1;
  l[g + 35] = 0;
  p[g + 46] = 0;
  p[g + 47] = 0;
  p[g + 48] = 0;
  p[g + 49] = 0;
}

function Xr(b, d, e, f, g, h, i, k) {
  var m = b >> 2;
  l[m + 2] = d;
  l[m + 3] = e;
  var n = b + 20 | 0, q = l[f + 4 >> 2];
  l[n >> 2] = l[f >> 2];
  l[n + 4 >> 2] = q;
  n = b + 28 | 0;
  q = l[g + 4 >> 2];
  l[n >> 2] = l[g >> 2];
  l[n + 4 >> 2] = q;
  var n = h | 0, q = p[n >> 2] - p[d + 12 >> 2], h = h + 4 | 0, r = p[h >> 2] - p[d + 16 >> 2], t = p[d + 24 >> 2], u = p[d + 20 >> 2], d = b + 36 | 0, v = (N[0] = t * q + u * r, w[0]), q = (N[0] = q * -u + t * r, w[0]) | 0;
  l[d >> 2] = 0 | v;
  l[d + 4 >> 2] = q;
  d = i | 0;
  q = p[d >> 2] - p[e + 12 >> 2];
  i = i + 4 | 0;
  r = p[i >> 2] - p[e + 16 >> 2];
  t = p[e + 24 >> 2];
  e = p[e + 20 >> 2];
  b = b + 44 | 0;
  v = (N[0] = t * q + e * r, w[0]);
  e = (N[0] = q * -e + t * r, w[0]) | 0;
  l[b >> 2] = 0 | v;
  l[b + 4 >> 2] = e;
  b = p[n >> 2] - p[f >> 2];
  f = p[h >> 2] - p[f + 4 >> 2];
  f = Hh(b * b + f * f);
  p[m + 13] = f;
  f = p[d >> 2] - p[g >> 2];
  g = p[i >> 2] - p[g + 4 >> 2];
  g = Hh(f * f + g * g);
  p[m + 14] = g;
  p[m + 15] = k;
  1.1920928955078125e-7 < k || S(O.Ob | 0, 51, O.Vc | 0, O.Ud | 0);
}

function rq(b, d) {
  var e, f = b >> 2, g = b | 0;
  l[g >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var h = d + 12 | 0;
  (l[e >> 2] | 0) == (l[h >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[f + 1] = l[d >> 2];
  l[f + 2] = 0;
  l[f + 3] = 0;
  l[f + 12] = l[e >> 2];
  l[f + 13] = l[h >> 2];
  l[f + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[f + 16] = l[d + 4 >> 2];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[g >> 2] = Yr + 8 | 0;
  h = b + 76 | 0;
  e = b + 92 | 0;
  var g = b + 100 | 0, i = d + 20 | 0, k = b + 68 | 0, m = l[i + 4 >> 2];
  l[k >> 2] = l[i >> 2];
  l[k + 4 >> 2] = m;
  i = d + 28 | 0;
  k = l[i + 4 >> 2];
  l[h >> 2] = l[i >> 2];
  l[h + 4 >> 2] = k;
  h = d + 36 | 0;
  i = l[h + 4 >> 2];
  l[e >> 2] = l[h >> 2];
  l[e + 4 >> 2] = i;
  e = d + 44 | 0;
  h = l[e + 4 >> 2];
  l[g >> 2] = l[e >> 2];
  l[g + 4 >> 2] = h;
  g = d + 52 | 0;
  p[f + 21] = p[g >> 2];
  e = d + 56 | 0;
  p[f + 22] = p[e >> 2];
  h = d + 60 | 0;
  i = p[h >> 2];
  0 != i ? h = i : (S(O.Ob | 0, 65, O.Sc | 0, O.Je | 0), h = p[h >> 2]);
  p[f + 28] = h;
  p[f + 27] = p[g >> 2] + h * p[e >> 2];
  p[f + 29] = 0;
}

function qq(b, d) {
  var e, f = d >> 2, g = b >> 2, h = b | 0;
  l[h >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var i = d + 12 | 0;
  (l[e >> 2] | 0) == (l[i >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[g + 1] = l[f];
  l[g + 2] = 0;
  l[g + 3] = 0;
  l[g + 12] = l[e >> 2];
  l[g + 13] = l[i >> 2];
  l[g + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[g + 16] = l[f + 1];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[h >> 2] = Zr + 8 | 0;
  h = b + 76 | 0;
  e = d + 20 | 0;
  var i = b + 68 | 0, k = l[e + 4 >> 2];
  l[i >> 2] = l[e >> 2];
  l[i + 4 >> 2] = k;
  e = d + 28 | 0;
  i = l[e + 4 >> 2];
  l[h >> 2] = l[e >> 2];
  l[h + 4 >> 2] = i;
  p[g + 29] = p[f + 9];
  p[g + 21] = 0;
  p[g + 22] = 0;
  p[g + 23] = 0;
  p[g + 24] = 0;
  p[g + 30] = p[f + 11];
  p[g + 31] = p[f + 12];
  p[g + 26] = p[f + 15];
  p[g + 27] = p[f + 14];
  c[b + 112 | 0] = c[d + 40 | 0] & 1;
  c[b + 100 | 0] = c[d + 52 | 0] & 1;
  l[g + 56] = 0;
}

function tq(b, d) {
  var e, f = d >> 2, g = b >> 2, h = b | 0;
  l[h >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var i = d + 12 | 0;
  (l[e >> 2] | 0) == (l[i >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[g + 1] = l[f];
  l[g + 2] = 0;
  l[g + 3] = 0;
  l[g + 12] = l[e >> 2];
  l[g + 13] = l[i >> 2];
  l[g + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[g + 16] = l[f + 1];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[h >> 2] = ss + 8 | 0;
  i = b + 84 | 0;
  e = b + 92 | 0;
  var h = b + 100 | 0, k = d + 20 | 0, m = b + 76 | 0, n = l[k + 4 >> 2];
  l[m >> 2] = l[k >> 2];
  l[m + 4 >> 2] = n;
  k = d + 28 | 0;
  m = l[k + 4 >> 2];
  l[i >> 2] = l[k >> 2];
  l[i + 4 >> 2] = m;
  k = d + 36 | 0;
  i = l[k >> 2];
  k = l[k + 4 >> 2];
  l[e >> 2] = i;
  l[e + 4 >> 2] = k;
  e = -1 * (w[0] = k, N[0]);
  e = 0 | (N[0] = e, w[0]);
  l[h >> 2] = e;
  l[h + 4 >> 2] = i | 0;
  p[g + 51] = 0;
  p[g + 27] = 0;
  p[g + 52] = 0;
  p[g + 28] = 0;
  p[g + 53] = 0;
  p[g + 29] = 0;
  p[g + 30] = p[f + 12];
  p[g + 31] = p[f + 13];
  c[b + 128 | 0] = c[d + 44 | 0] & 1;
  p[g + 17] = p[f + 14];
  p[g + 18] = p[f + 15];
  p[g + 54] = 0;
  p[g + 55] = 0;
  p[g + 43] = 0;
  p[g + 44] = 0;
  p[g + 45] = 0;
  p[g + 46] = 0;
}

function ts(b) {
  return l[b + 68 >> 2];
}

function us(b) {
  return l[b + 64 >> 2];
}

function vs(b, d) {
  l[b + 68 >> 2] = d;
}

function ws(b, d) {
  l[b + 76 >> 2] = d;
}

function xs(b, d) {
  l[b + 64 >> 2] = d;
}

function ys(b, d) {
  l[b + 60 >> 2] = d;
}

function zs() {
  var b, d = As(80);
  b = d >> 2;
  yg(d);
  l[b + 15] = 0;
  l[b + 16] = 0;
  l[b + 17] = op;
  l[b + 18] = pp;
  l[b + 19] = 0;
  return d;
}

function Bs(b) {
  return l[b + 72 >> 2];
}

function Cs(b, d) {
  l[b + 72 >> 2] = d;
}

function Ds(b) {
  return l[b + 60 >> 2];
}

function Es(b) {
  return l[b + 76 >> 2];
}

function Fs(b) {
  var d, e = l[b >> 2];
  if (-1 == (e | 0)) {
    d = 0;
  } else {
    d = l[b + 4 >> 2] >> 2;
    var e = 2 * (p[d + (9 * e | 0) + 2] - p[d + (9 * e | 0)] + (p[d + (9 * e | 0) + 3] - p[d + (9 * e | 0) + 1])), b = l[b + 12 >> 2], f = 0 < (b | 0);
    a : do {
      if (f) {
        for (var g = 0, h = 0; ; ) {
          if (g = 0 > (l[d + (9 * h | 0) + 8] | 0) ? g : g + 2 * (p[d + (9 * h | 0) + 2] - p[d + (9 * h | 0)] + (p[d + (9 * h | 0) + 3] - p[d + (9 * h | 0) + 1])), h = h + 1 | 0, (h | 0) == (b | 0)) {
            var i = g;
            break a;
          }
        }
      } else {
        i = 0;
      }
    } while (0);
    d = i / e;
  }
  return d;
}

function Gs(b) {
  var d = l[b >> 2];
  return -1 == (d | 0) ? 0 : l[(l[b + 4 >> 2] + 32 >> 2) + (9 * d | 0)];
}

function Hs(b) {
  return l[b + 28 >> 2];
}

function Is(b, d) {
  c[b + 102994 | 0] = d & 1;
}

function Js(b) {
  var d, e = l[b + 102872 >> 2];
  if (-1 == (e | 0)) {
    d = 0;
  } else {
    d = l[b + 102876 >> 2] >> 2;
    var e = 2 * (p[d + (9 * e | 0) + 2] - p[d + (9 * e | 0)] + (p[d + (9 * e | 0) + 3] - p[d + (9 * e | 0) + 1])), b = l[b + 102884 >> 2], f = 0 < (b | 0);
    a : do {
      if (f) {
        for (var g = 0, h = 0; ; ) {
          if (g = 0 > (l[d + (9 * h | 0) + 8] | 0) ? g : g + 2 * (p[d + (9 * h | 0) + 2] - p[d + (9 * h | 0)] + (p[d + (9 * h | 0) + 3] - p[d + (9 * h | 0) + 1])), h = h + 1 | 0, (h | 0) == (b | 0)) {
            var i = g;
            break a;
          }
        }
      } else {
        i = 0;
      }
    } while (0);
    d = i / e;
  }
  return d;
}

function qu(b) {
  var d = l[b + 102872 >> 2];
  return -1 == (d | 0) ? 0 : l[(l[b + 102876 >> 2] + 32 >> 2) + (9 * d | 0)];
}

function ov(b) {
  return b + 102996 | 0;
}

function pv(b) {
  return 0 != (c[b + 102994 | 0] & 1) << 24 >> 24;
}

function qv(b) {
  return b + 102872 | 0;
}

function wv(b, d) {
  l[b + 102944 >> 2] = d;
}

function xv(b, d) {
  c[b + 102993 | 0] = d & 1;
}

function yv(b, d) {
  var e = b + 102968 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function zv(b) {
  return l[b + 102960 >> 2];
}

function Av(b) {
  return 0 != (l[b + 102868 >> 2] & 4 | 0);
}

function Bv(b) {
  return 0 != (c[b + 102993 | 0] & 1) << 24 >> 24;
}

function Cv(b) {
  return l[b + 102956 >> 2];
}

function Dv(b) {
  return l[b + 102952 >> 2];
}

function Ev(b, d) {
  l[b + 102980 >> 2] = d;
}

function Fv(b) {
  return l[b + 102964 >> 2];
}

function Gv(b) {
  var d, b = l[b + 102952 >> 2], e = 0 == (b | 0);
  a : do {
    if (!e) {
      d = b;
      for (d >>= 2; ; ) {
        p[d + 19] = 0;
        p[d + 20] = 0;
        p[d + 21] = 0;
        d = l[d + 24];
        if (0 == (d | 0)) {
          break a;
        }
        d >>= 2;
      }
    }
  } while (0);
}

function Hv(b) {
  return 0 != (c[b + 102992 | 0] & 1) << 24 >> 24;
}

function Iv(b, d) {
  var e = b + 102976 | 0, f = (d & 1 | 0) == (c[e] & 1 | 0);
  a : do {
    if (!f && (c[e] = d & 1, !d)) {
      var g = l[b + 102952 >> 2];
      if (0 != (g | 0)) {
        for (;;) {
          var h = g + 4 | 0, i = j[h >> 1];
          0 == (i & 2) << 16 >> 16 && (j[h >> 1] = i | 2, p[g + 144 >> 2] = 0);
          g = l[g + 96 >> 2];
          if (0 == (g | 0)) {
            break a;
          }
        }
      }
    }
  } while (0);
}

function Jv(b) {
  return 0 != (c[b + 102976 | 0] & 1) << 24 >> 24;
}

function Kv(b) {
  return l[b + 102900 >> 2];
}

function Lv(b) {
  Zo(b, b);
}

function Mv(b) {
  0 != (b | 0) && (Fh(l[b + 32 >> 2]), Fh(l[b + 44 >> 2]), Fh(l[b + 4 >> 2]), Nv(b));
}

function Ov(b, d) {
  for (var e = d >> 2, f = b >> 2, g = e + 15; e < g; e++, f++) {
    l[f] = l[e];
  }
}

function Pv(b, d) {
  2 == (-1 < (d | 0) ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2) && S(O.p | 0, 159, O.H | 0, O.n | 0);
  return l[b + 4 >> 2] + 36 * d | 0;
}

function Qv(b, d) {
  2 == (-1 < (d | 0) ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2) && S(O.p | 0, 153, O.R | 0, O.n | 0);
  return l[(l[b + 4 >> 2] + 16 >> 2) + (9 * d | 0)];
}

function Rv(b) {
  0 != (b | 0) && (Fh(l[b + 32 >> 2]), Fh(l[b + 44 >> 2]), Fh(l[b + 4 >> 2]), Nv(b));
}

function Sv() {
  var b = As(60);
  yg(b);
  return b;
}

function Tv(b) {
  var d = b + 12 | 0, e = l[d >> 2], f = 0 < (e | 0);
  a : do {
    if (f) {
      for (var g = b + 4 | 0, h = 0, i = 0, k = l[g >> 2], m = e; ; ) {
        if (2 <= (l[(k + 32 >> 2) + (9 * i | 0)] | 0)) {
          var n = k + 36 * i + 24 | 0, q = l[n >> 2];
          -1 == (q | 0) ? (S(O.c | 0, 686, O.Ka | 0, O.Xa | 0), q = l[n >> 2], n = l[g >> 2], m = l[d >> 2]) : n = k;
          k = l[(n + 32 >> 2) + (9 * l[(k + 28 >> 2) + (9 * i | 0)] | 0)] - l[(n + 32 >> 2) + (9 * q | 0)] | 0;
          k = 0 < (k | 0) ? k : -k | 0;
          h = (h | 0) > (k | 0) ? h : k;
          k = n;
        }
        i = i + 1 | 0;
        if ((i | 0) >= (m | 0)) {
          var r = h;
          break a;
        }
      }
    } else {
      r = 0;
    }
  } while (0);
  return r;
}

function Uv(b, d, e) {
  var f, g, h;
  h = -1 < (d | 0) ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2;
  2 == h && S(O.p | 0, 159, O.H | 0, O.n | 0);
  var i = b + 4 | 0;
  h = l[i >> 2];
  g = h >> 2;
  -1 < (e | 0) ? (l[b + 12 >> 2] | 0) > (e | 0) ? (f = h >> 2, h = 6) : h = 5 : h = 5;
  5 == h && (S(O.p | 0, 159, O.H | 0, O.n | 0), b = l[i >> 2], f = b >> 2);
  return 0 < p[f + (9 * e | 0)] - p[g + (9 * d | 0) + 2] | 0 < p[f + (9 * e | 0) + 1] - p[g + (9 * d | 0) + 3] | 0 < p[g + (9 * d | 0)] - p[f + (9 * e | 0) + 2] | 0 < p[g + (9 * d | 0) + 1] - p[f + (9 * e | 0) + 3] ? 0 : 1;
}

function Vv(b, d) {
  var e, f;
  f = (b + 40 | 0) >> 2;
  var g = l[f], h = b + 36 | 0, i = l[h >> 2];
  e = (b + 32 | 0) >> 2;
  (g | 0) == (i | 0) ? (g = l[e], l[h >> 2] = i << 1, h = Oe(i << 3), l[e] = h, Zg(h, g, l[f] << 2), Fh(g), h = l[f]) : h = g;
  l[((h << 2) + l[e] | 0) >> 2] = d;
  l[f] = l[f] + 1 | 0;
}

function Wv(b, d, e, f) {
  if (Kl(b, d, e, f)) {
    var e = (b + 40 | 0) >> 2, g = l[e], f = b + 36 | 0, h = l[f >> 2], b = (b + 32 | 0) >> 2;
    (g | 0) == (h | 0) ? (g = l[b], l[f >> 2] = h << 1, f = Oe(h << 3), l[b] = f, Zg(f, g, l[e] << 2), Fh(g), f = l[e]) : f = g;
    l[((f << 2) + l[b] | 0) >> 2] = d;
    l[e] = l[e] + 1 | 0;
  }
}

function Xv(b, d) {
  for (var e = l[b + 40 >> 2], f = b + 32 | 0, g = 0; (g | 0) < (e | 0); ) {
    var h = (g << 2) + l[f >> 2] | 0;
    if ((l[h >> 2] | 0) == (d | 0)) {
      l[h >> 2] = -1;
      break;
    }
    g = g + 1 | 0;
  }
  e = b + 28 | 0;
  l[e >> 2] = l[e >> 2] - 1 | 0;
  rl(b, d);
}

function Yv(b, d, e) {
  var f = a;
  a += 8;
  b = b + 102872 | 0;
  l[f >> 2] = b;
  l[f + 4 >> 2] = d;
  var g = b | 0, h, i, k, b = a;
  a += 1036;
  var m, n = b + 4 | 0, d = (b | 0) >> 2;
  l[d] = n;
  k = (b + 1028 | 0) >> 2;
  i = (b + 1032 | 0) >> 2;
  l[i] = 256;
  l[n >> 2] = l[g >> 2];
  l[k] = 1;
  for (var g = g + 4 | 0, q = e | 0, r = e + 4 | 0, t = e + 8 | 0, e = e + 12 | 0, u = f | 0, v = f + 4 | 0, A = 1; 0 < (A | 0); ) {
    var C = A - 1 | 0;
    l[k] = C;
    m = l[d];
    A = l[m + (C << 2) >> 2];
    if (-1 == (A | 0)) {
      A = C;
    } else {
      var B = l[g >> 2];
      h = B >> 2;
      if (0 < p[q >> 2] - p[h + (9 * A | 0) + 2] | 0 < p[r >> 2] - p[h + (9 * A | 0) + 3] | 0 < p[h + (9 * A | 0)] - p[t >> 2] | 0 < p[h + (9 * A | 0) + 1] - p[e >> 2]) {
        A = C;
      } else {
        if (h = B + 36 * A + 24 | 0, -1 == (l[h >> 2] | 0)) {
          B = l[u >> 2];
          m = -1 < (A | 0) ? (l[B + 12 >> 2] | 0) > (A | 0) ? 10 : 9 : 9;
          9 == m && S(O.p | 0, 153, O.R | 0, O.n | 0);
          m = l[v >> 2];
          if (!K[l[l[m >> 2] + 8 >> 2]](m, l[l[(l[B + 4 >> 2] + 16 >> 2) + (9 * A | 0)] + 16 >> 2])) {
            break;
          }
          A = l[k];
        } else {
          var y = l[i];
          (C | 0) == (y | 0) && (l[i] = y << 1, C = Oe(y << 3), l[d] = C, y = m, Zg(C, y, l[k] << 2), (m | 0) != (n | 0) && Fh(y));
          l[((l[k] << 2) + l[d] | 0) >> 2] = l[h >> 2];
          m = l[k] + 1 | 0;
          l[k] = m;
          A = B + 36 * A + 28 | 0;
          h = l[i];
          (m | 0) == (h | 0) && (B = l[d], l[i] = h << 1, m = Oe(h << 3), l[d] = m, h = B, Zg(m, h, l[k] << 2), (B | 0) != (n | 0) && Fh(h));
          l[((l[k] << 2) + l[d] | 0) >> 2] = l[A >> 2];
          A = l[k] + 1 | 0;
          l[k] = A;
        }
      }
    }
  }
  i = l[d];
  (i | 0) != (n | 0) && (Fh(i), l[d] = 0);
  a = b;
  a = f;
}

function Zv(b) {
  var d = b + 102884 | 0, e = l[d >> 2], f = 0 < (e | 0);
  a : do {
    if (f) {
      for (var g = b + 102876 | 0, h = 0, i = 0, k = l[g >> 2], m = e; ; ) {
        if (2 <= (l[(k + 32 >> 2) + (9 * i | 0)] | 0)) {
          var n = k + 36 * i + 24 | 0, q = l[n >> 2];
          -1 == (q | 0) ? (S(O.c | 0, 686, O.Ka | 0, O.Xa | 0), q = l[n >> 2], n = l[g >> 2], m = l[d >> 2]) : n = k;
          k = l[(n + 32 >> 2) + (9 * l[(k + 28 >> 2) + (9 * i | 0)] | 0)] - l[(n + 32 >> 2) + (9 * q | 0)] | 0;
          k = 0 < (k | 0) ? k : -k | 0;
          h = (h | 0) > (k | 0) ? h : k;
          k = n;
        }
        i = i + 1 | 0;
        if ((i | 0) >= (m | 0)) {
          var r = h;
          break a;
        }
      }
    } else {
      r = 0;
    }
  } while (0);
  return r;
}

function $v(b, d) {
  var e, f = b + 102868 | 0;
  e = l[f >> 2];
  0 == (e & 2 | 0) ? f = e : (S(O.t | 0, 109, O.dd | 0, O.pa | 0), f = l[f >> 2]);
  if (0 == (f & 2 | 0)) {
    f = an(b | 0, 152);
    0 == (f | 0) ? f = 0 : No(f, d, b);
    l[f + 92 >> 2] = 0;
    e = (b + 102952 | 0) >> 2;
    l[f + 96 >> 2] = l[e];
    var g = l[e];
    0 != (g | 0) && (l[(g + 92 | 0) >> 2] = f);
    l[e] = f;
    e = b + 102960 | 0;
    l[e >> 2] = l[e >> 2] + 1 | 0;
  } else {
    f = 0;
  }
  return f;
}

function aw(b) {
  var d = As(103028);
  mp(d, b);
  return d;
}

function bw(b, d, e, f) {
  var g = a;
  a += 28;
  var h = g + 8, i = b + 102872 | 0;
  l[g >> 2] = i;
  l[g + 4 >> 2] = d;
  p[h + 16 >> 2] = 1;
  var k = l[e + 4 >> 2];
  l[h >> 2] = l[e >> 2];
  l[h + 4 >> 2] = k;
  var m = h + 8 | 0, n = l[f + 4 >> 2];
  l[m >> 2] = l[f >> 2];
  l[m + 4 >> 2] = n;
  var q = i | 0, r, t, u, v, A, C, B = a;
  a += 1056;
  var y = B + 1036;
  C = h >> 2;
  var z = l[C], F = (w[0] = l[C + 1], N[0]);
  A = (h + 8 | 0) >> 2;
  var G = l[A + 1], H = (w[0] = l[A], N[0]), E = (w[0] = G, N[0]), I = (w[0] = z, N[0]), J = H - I, L = E - F, M = J * J + L * L;
  0 < M || S(O.p | 0, 204, O.od | 0, O.ve | 0);
  var V = Hh(M);
  if (1.1920928955078125e-7 > V) {
    var Q = J, T = L;
  } else {
    var Y = 1 / V, Q = J * Y, T = L * Y;
  }
  var R = -1 * T, P = 0 < R ? R : -R, aa = 0 < Q ? Q : -Q, W = p[h + 16 >> 2], da = I + J * W, sa = F + L * W, ta = F < sa ? F : sa, ja = (N[0] = I < da ? I : da, w[0]), ua = I > da ? I : da, ha = F > sa ? F : sa, wa = B + 4 | 0;
  v = (B | 0) >> 2;
  l[v] = wa;
  u = (B + 1028 | 0) >> 2;
  t = (B + 1032 | 0) >> 2;
  l[t] = 256;
  l[wa >> 2] = l[q >> 2];
  l[u] = 1;
  var oa = q + 4 | 0, Aa = y + 8 | 0, Fa = y + 16 | 0, La = W, xa = ja, ca = ta, Z = ua, la = ha, ya = 1;
  a : for (;;) {
    for (var fa = (w[0] = xa, N[0]), $ = ya; ; ) {
      if (0 >= ($ | 0)) {
        break a;
      }
      var eb = $ - 1 | 0;
      l[u] = eb;
      var Sa = l[v], Da = l[Sa + (eb << 2) >> 2];
      if (-1 == (Da | 0)) {
        var na = La, ma = xa, Ba = ca, za = Z, Ha = la;
        break;
      }
      var jb = l[oa >> 2];
      r = jb >> 2;
      var Ia = p[r + (9 * Da | 0) + 2], $a = p[r + (9 * Da | 0) + 3], ba = p[r + (9 * Da | 0)], qa = p[r + (9 * Da | 0) + 1];
      if (0 < fa - Ia | 0 < ca - $a | 0 < ba - Z | 0 < qa - la) {
        na = La;
        ma = xa;
        Ba = ca;
        za = Z;
        Ha = la;
        break;
      }
      var ka = R * (I - .5 * (ba + Ia)) + Q * (F - .5 * (qa + $a));
      if (0 < (0 < ka ? ka : -ka) - (.5 * P * (Ia - ba) + .5 * aa * ($a - qa))) {
        na = La;
        ma = xa;
        Ba = ca;
        za = Z;
        Ha = la;
        break;
      }
      var ia = jb + 36 * Da + 24 | 0;
      if (-1 == (l[ia >> 2] | 0)) {
        var va = l[C + 1];
        l[y >> 2] = l[C];
        l[y + 4 >> 2] = va;
        var Oa = l[A + 1];
        l[Aa >> 2] = l[A];
        l[Aa + 4 >> 2] = Oa;
        p[Fa >> 2] = La;
        var Pa, Ta = g, Xa = y, ab = Da, kb = Xa >> 2, mb = a;
        a += 20;
        var Qa = mb + 12, Ma = l[Ta >> 2];
        2 == (-1 < (ab | 0) ? (l[Ma + 12 >> 2] | 0) > (ab | 0) ? 3 : 2 : 2) && S(O.p | 0, 153, O.R | 0, O.n | 0);
        var bb = l[(l[Ma + 4 >> 2] + 16 >> 2) + (9 * ab | 0)], Va = l[bb + 16 >> 2], Ja = l[Va + 12 >> 2];
        if (K[l[l[Ja >> 2] + 20 >> 2]](Ja, mb, Xa, l[Va + 8 >> 2] + 12 | 0, l[bb + 20 >> 2])) {
          var ga = p[mb + 8 >> 2], cb = 1 - ga, gb = p[kb + 1] * cb + p[kb + 3] * ga;
          p[Qa >> 2] = p[kb] * cb + p[kb + 2] * ga;
          p[Qa + 4 >> 2] = gb;
          var db = l[Ta + 4 >> 2], Ya = K[l[l[db >> 2] + 8 >> 2]](db, Va, Qa, mb | 0, ga);
        } else {
          Ya = p[kb + 4];
        }
        a = mb;
        Pa = Ya;
        if (0 == Pa) {
          break a;
        }
        if (0 >= Pa) {
          na = La;
          ma = xa;
          Ba = ca;
          za = Z;
          Ha = la;
          break;
        }
        var Ka = I + J * Pa, Ga = F + L * Pa, fb = F < Ga ? F : Ga, Ea = (N[0] = I < Ka ? I : Ka, w[0]), Ua = I > Ka ? I : Ka, ob = F > Ga ? F : Ga, na = Pa, ma = Ea, Ba = fb, za = Ua, Ha = ob;
        break;
      }
      var Na = l[t];
      if ((eb | 0) == (Na | 0)) {
        l[t] = Na << 1;
        var Wa = Oe(Na << 3);
        l[v] = Wa;
        var nb = Sa;
        Zg(Wa, nb, l[u] << 2);
        (Sa | 0) != (wa | 0) && Fh(nb);
      }
      l[((l[u] << 2) + l[v] | 0) >> 2] = l[ia >> 2];
      var pa = l[u] + 1 | 0;
      l[u] = pa;
      var hb = jb + 36 * Da + 28 | 0, Ca = l[t];
      if ((pa | 0) == (Ca | 0)) {
        var ib = l[v];
        l[t] = Ca << 1;
        var Za = Oe(Ca << 3);
        l[v] = Za;
        var lb = ib;
        Zg(Za, lb, l[u] << 2);
        (ib | 0) != (wa | 0) && Fh(lb);
      }
      l[((l[u] << 2) + l[v] | 0) >> 2] = l[hb >> 2];
      var qb = l[u] + 1 | 0, $ = l[u] = qb;
    }
    La = na;
    xa = ma;
    ca = Ba;
    Z = za;
    la = Ha;
    ya = l[u];
  }
  var vb = l[v];
  (vb | 0) != (wa | 0) && (Fh(vb), l[v] = 0);
  a = B;
  a = g;
}

function cw(b) {
  return 0 != (l[b + 102868 >> 2] & 2 | 0);
}

function dw(b) {
  return l[b + 102932 >> 2];
}

function ew(b, d) {
  l[b + 102984 >> 2] = d;
}

function fw(b, d) {
  var e = b + 102868 | 0, f = l[e >> 2];
  l[e >> 2] = d ? f | 4 : f & -5;
}

function gw(b) {
  return l[b + 102936 >> 2];
}

function hw(b, d) {
  c[b + 102992 | 0] = d & 1;
}

function iw(b, d) {
  l[b + 102940 >> 2] = d;
}

function jw(b) {
  return l[b + 4 >> 2];
}

function kw(b, d) {
  p[b + 8 >> 2] = d;
}

function lw(b) {
  return p[b + 8 >> 2];
}

function mw(b) {
  return b + 12 | 0;
}

function nw(b) {
  return b + 12 | 0;
}

function ow(b, d) {
  var e = b + 12 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function pw(b) {
  return b + 12 | 0;
}

function qw(b, d) {
  var e = b + 4 | 0;
  l[e >> 2] |= d;
}

function rw(b, d) {
  var e = b + 4 | 0;
  l[e >> 2] &= d ^ -1;
}

function sw(b, d) {
  l[b + 4 >> 2] = d;
}

function tw(b) {
  return l[b + 4 >> 2];
}

function uw(b) {
  return l[b + 12 >> 2];
}

function vw(b) {
  return l[b + 48 >> 2];
}

function ww(b) {
  return l[b + 52 >> 2];
}

function xw(b) {
  return l[b + 64 >> 2];
}

function yw(b) {
  return l[b + 4 >> 2];
}

function zw(b, d) {
  l[b + 64 >> 2] = d;
}

function Aw(b) {
  return 0 != (c[b + 61 | 0] & 1) << 24 >> 24;
}

function Bw(b) {
  return 0 == (j[l[b + 48 >> 2] + 4 >> 1] & 32) << 16 >> 16 ? 0 : 0 != (j[l[b + 52 >> 2] + 4 >> 1] & 32) << 16 >> 16;
}

function Cw(b) {
  var d = l[b >> 2];
  return -1 == (d | 0) ? 0 : l[(l[b + 4 >> 2] + 32 >> 2) + (9 * d | 0)];
}

function Dw(b) {
  var d, e = l[b >> 2];
  if (-1 == (e | 0)) {
    d = 0;
  } else {
    d = l[b + 4 >> 2] >> 2;
    var e = 2 * (p[d + (9 * e | 0) + 2] - p[d + (9 * e | 0)] + (p[d + (9 * e | 0) + 3] - p[d + (9 * e | 0) + 1])), b = l[b + 12 >> 2], f = 0 < (b | 0);
    a : do {
      if (f) {
        for (var g = 0, h = 0; ; ) {
          if (g = 0 > (l[d + (9 * h | 0) + 8] | 0) ? g : g + 2 * (p[d + (9 * h | 0) + 2] - p[d + (9 * h | 0)] + (p[d + (9 * h | 0) + 3] - p[d + (9 * h | 0) + 1])), h = h + 1 | 0, (h | 0) == (b | 0)) {
            var i = g;
            break a;
          }
        }
      } else {
        i = 0;
      }
    } while (0);
    d = i / e;
  }
  return d;
}

function Ew(b) {
  return l[b + 4 >> 2];
}

function Fw(b, d) {
  p[b + 8 >> 2] = d;
}

function Gw(b) {
  0 != (b | 0) && (qp(b), Nv(b));
}

function Hw(b) {
  0 == c[Iw] << 24 >> 24 && Jw(Iw);
  var b = b + 102968 | 0, d = l[b + 4 >> 2], e = Kw;
  l[e >> 2] = l[b >> 2];
  l[e + 4 >> 2] = d;
  return Kw;
}

function Lw(b) {
  if (0 != (b | 0)) {
    K[l[l[b >> 2] + 4 >> 2]](b);
  }
}

function Mw(b, d, e) {
  K[l[l[b >> 2] + 28 >> 2]](b, d, e);
}

function Nw(b, d) {
  return K[l[l[b >> 2] + 8 >> 2]](b, d);
}

function Ow(b, d, e, f, g) {
  return K[l[l[b >> 2] + 20 >> 2]](b, d, e, f, g);
}

function Pw(b, d, e, f) {
  K[l[l[b >> 2] + 24 >> 2]](b, d, e, f);
}

function Qw(b) {
  return K[l[l[b >> 2] + 12 >> 2]](b);
}

function Rw(b, d, e) {
  return K[l[l[b >> 2] + 16 >> 2]](b, d, e);
}

function Sw() {
  var b, d = As(20);
  b = d >> 2;
  l[b] = Tw + 8 | 0;
  l[b + 1] = 0;
  p[b + 2] = 0;
  p[b + 3] = 0;
  p[b + 4] = 0;
  return d;
}

function Uw(b, d) {
  K[l[l[b >> 2] + 28 >> 2]](b, d);
}

function Vw(b, d, e, f) {
  K[l[l[b >> 2] + 8 >> 2]](b, d, e, f);
}

function Ww(b, d, e, f, g) {
  K[l[l[b >> 2] + 20 >> 2]](b, d, e, f, g);
}

function Xw(b, d, e, f) {
  K[l[l[b >> 2] + 12 >> 2]](b, d, e, f);
}

function Yw(b, d, e, f) {
  K[l[l[b >> 2] + 16 >> 2]](b, d, e, f);
}

function Zw(b, d, e, f) {
  K[l[l[b >> 2] + 24 >> 2]](b, d, e, f);
}

function $w(b, d) {
  return K[l[l[b >> 2] + 12 >> 2]](b, d);
}

function ax(b) {
  var d = a;
  a += 8;
  0 == c[bx] << 24 >> 24 && Jw(bx);
  K[l[l[b >> 2] >> 2]](d, b);
  var b = l[d + 4 >> 2], e = cx;
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = b;
  a = d;
  return cx;
}

function dx(b) {
  K[l[l[b >> 2] + 16 >> 2]](b);
}

function ex(b) {
  var d = a;
  a += 8;
  0 == c[fx] << 24 >> 24 && Jw(fx);
  K[l[l[b >> 2] + 4 >> 2]](d, b);
  var b = l[d + 4 >> 2], e = gx;
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = b;
  a = d;
  return gx;
}

function hx(b, d) {
  var e = a;
  a += 8;
  0 == c[ix] << 24 >> 24 && Jw(ix);
  K[l[l[b >> 2] + 8 >> 2]](e, b, d);
  var f = l[e + 4 >> 2], g = jx;
  l[g >> 2] = l[e >> 2];
  l[g + 4 >> 2] = f;
  a = e;
  return jx;
}

function kx(b, d, e, f, g) {
  return K[l[l[b >> 2] + 8 >> 2]](b, d, e, f, g);
}

function lx(b) {
  0 != (b | 0) && (Fh(l[b + 4 >> 2]), Nv(b));
}

function mx() {
  var b, d = As(28);
  b = d >> 2;
  l[b] = -1;
  l[b + 3] = 16;
  l[b + 2] = 0;
  var e = Oe(576);
  l[b + 1] = e;
  Ze(e, 576);
  for (var f = 0; ; ) {
    var g = f + 1 | 0;
    l[(e + 20 >> 2) + (9 * f | 0)] = g;
    l[(e + 32 >> 2) + (9 * f | 0)] = -1;
    if (15 <= (g | 0)) {
      break;
    }
    f = g;
  }
  l[e + 560 >> 2] = -1;
  l[e + 572 >> 2] = -1;
  l[b + 4] = 0;
  l[b + 5] = 0;
  l[b + 6] = 0;
  return d;
}

function nx(b, d) {
  2 == (-1 < (d | 0) ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2) && S(O.p | 0, 159, O.H | 0, O.n | 0);
  return l[b + 4 >> 2] + 36 * d | 0;
}

function ox(b, d) {
  2 == (-1 < (d | 0) ? (l[b + 12 >> 2] | 0) > (d | 0) ? 3 : 2 : 2) && S(O.p | 0, 153, O.R | 0, O.n | 0);
  return l[(l[b + 4 >> 2] + 16 >> 2) + (9 * d | 0)];
}

function px(b) {
  var d = b + 12 | 0, e = l[d >> 2], f = 0 < (e | 0);
  a : do {
    if (f) {
      for (var g = b + 4 | 0, h = 0, i = 0, k = l[g >> 2], m = e; ; ) {
        if (2 <= (l[(k + 32 >> 2) + (9 * i | 0)] | 0)) {
          var n = k + 36 * i + 24 | 0, q = l[n >> 2];
          -1 == (q | 0) ? (S(O.c | 0, 686, O.Ka | 0, O.Xa | 0), q = l[n >> 2], n = l[g >> 2], m = l[d >> 2]) : n = k;
          k = l[(n + 32 >> 2) + (9 * l[(k + 28 >> 2) + (9 * i | 0)] | 0)] - l[(n + 32 >> 2) + (9 * q | 0)] | 0;
          k = 0 < (k | 0) ? k : -k | 0;
          h = (h | 0) > (k | 0) ? h : k;
          k = n;
        }
        i = i + 1 | 0;
        if ((i | 0) >= (m | 0)) {
          var r = h;
          break a;
        }
      }
    } else {
      r = 0;
    }
  } while (0);
  return r;
}

function qx(b, d, e) {
  var f, g = Xg(b);
  f = (b + 4 | 0) >> 2;
  var h = p[d + 4 >> 2] - .10000000149011612, i = l[f] + 36 * g | 0, k = (N[0] = p[d >> 2] - .10000000149011612, w[0]), h = (N[0] = h, w[0]) | 0;
  l[(i | 0) >> 2] = 0 | k;
  l[(i + 4 | 0) >> 2] = h;
  k = p[d + 12 >> 2] + .10000000149011612;
  i = l[f] + 36 * g + 8 | 0;
  d = (N[0] = p[d + 8 >> 2] + .10000000149011612, w[0]);
  k = (N[0] = k, w[0]) | 0;
  l[(i | 0) >> 2] = 0 | d;
  l[(i + 4 | 0) >> 2] = k;
  l[(l[f] + 36 * g + 16 | 0) >> 2] = e;
  l[(l[f] + 36 * g + 32 | 0) >> 2] = 0;
  Yg(b, g);
  return g;
}

function EA() {
  var b = a;
  a += 8;
  var d = As(8);
  Gr(b);
  l[d >> 2] = l[b >> 2];
  var e = .0010000000474974513 * (l[b + 4 >> 2] | 0);
  l[d + 4 >> 2] = 0 <= e ? Math.floor(e) : Math.ceil(e);
  a = b;
  return d;
}

function gE(b) {
  var d = a;
  a += 8;
  Gr(d);
  l[b >> 2] = l[d >> 2];
  var e = .0010000000474974513 * (l[d + 4 >> 2] | 0);
  l[b + 4 >> 2] = 0 <= e ? Math.floor(e) : Math.ceil(e);
  a = d;
}

function hE(b) {
  0 != (b | 0) && Nv(b);
}

function iE(b) {
  var d = a;
  a += 8;
  Gr(d);
  b = ((1e3 * (l[d >> 2] - l[b >> 2]) | 0) >>> 0) + .0010000000474974513 * (l[d + 4 >> 2] | 0) - (o[b + 4 >> 2] >>> 0);
  a = d;
  return b;
}

function jE(b) {
  if (0 != (b | 0)) {
    K[l[l[b >> 2] + 4 >> 2]](b);
  }
}

function kE(b, d, e) {
  var f = b + 12 | 0;
  2 == (0 == (l[f >> 2] | 0) ? 0 == (l[b + 16 >> 2] | 0) ? 3 : 2 : 2) && S(O.F | 0, 48, O.ca | 0, O.Ra | 0);
  1 < (e | 0) || S(O.F | 0, 49, O.ca | 0, O.Nb | 0);
  var g = b + 16 | 0;
  l[g >> 2] = e;
  e = Oe(e << 3);
  l[f >> 2] = e;
  Zg(e, d, l[g >> 2] << 3);
  c[b + 36 | 0] = 0;
  c[b + 37 | 0] = 0;
}

function lE(b) {
  return p[b + 8 >> 2];
}

function mE(b) {
  return l[b + 12 >> 2];
}

function nE(b) {
  return l[b + 16 >> 2];
}

function oE(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
  c[b + 36 | 0] = 1;
}

function pE(b, d) {
  l[b + 12 >> 2] = d;
}

function qE(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
  c[b + 37 | 0] = 1;
}

function rE(b, d) {
  l[b + 16 >> 2] = d;
}

function sE(b, d) {
  p[b + 8 >> 2] = d;
}

function tE(b) {
  return p[b + 8 >> 2];
}

function uE(b, d) {
  return (d << 3) + b + 20 | 0;
}

function vE(b, d, e) {
  b >>= 2;
  l[b + 37] = 4;
  var f = -d, g = -e;
  p[b + 5] = f;
  p[b + 6] = g;
  p[b + 7] = d;
  p[b + 8] = g;
  p[b + 9] = d;
  p[b + 10] = e;
  p[b + 11] = f;
  p[b + 12] = e;
  p[b + 21] = 0;
  p[b + 22] = -1;
  p[b + 23] = 1;
  p[b + 24] = 0;
  p[b + 25] = 0;
  p[b + 26] = 1;
  p[b + 27] = -1;
  p[b + 28] = 0;
  p[b + 3] = 0;
  p[b + 4] = 0;
}

function wE(b, d) {
  var e = b + 12 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function xE(b, d) {
  l[b + 148 >> 2] = d;
}

function yE(b) {
  return l[b + 148 >> 2];
}

function zE(b) {
  return l[b + 4 >> 2];
}

function AE(b) {
  return l[b + 148 >> 2];
}

function BE(b) {
  return b + 12 | 0;
}

function CE(b, d, e) {
  var f = b + 12 | 0, g = l[d + 4 >> 2];
  l[f >> 2] = l[d >> 2];
  l[f + 4 >> 2] = g;
  d = b + 20 | 0;
  f = l[e + 4 >> 2];
  l[d >> 2] = l[e >> 2];
  l[d + 4 >> 2] = f;
  c[b + 44 | 0] = 0;
  c[b + 45 | 0] = 0;
}

function DE(b, d) {
  p[b + 8 >> 2] = d;
}

function EE(b) {
  return p[b + 8 >> 2];
}

function FE(b) {
  return l[b + 4 >> 2];
}

function GE(b) {
  return l[b + 12 >> 2];
}

function HE(b, d) {
  var e = b + 4 | 0, f = l[e >> 2];
  l[e >> 2] = d ? f | 4 : f & -5;
}

function IE(b) {
  return p[b + 140 >> 2];
}

function JE(b) {
  return p[b + 136 >> 2];
}

function KE(b) {
  return 0 != (l[b + 4 >> 2] & 2 | 0);
}

function LE(b) {
  return 0 != (l[b + 4 >> 2] & 4 | 0);
}

function ME(b) {
  return l[b + 52 >> 2];
}

function NE(b, d) {
  p[b + 136 >> 2] = d;
}

function OE(b) {
  return l[b + 48 >> 2];
}

function PE(b) {
  return l[b + 56 >> 2];
}

function QE(b) {
  return l[b + 60 >> 2];
}

function RE(b, d) {
  p[b + 140 >> 2] = d;
}

function SE(b) {
  return b + 64 | 0;
}

function TE(b) {
  var d = p[l[b + 48 >> 2] + 20 >> 2], e = p[l[b + 52 >> 2] + 20 >> 2];
  p[b + 140 >> 2] = d > e ? d : e;
}

function UE(b) {
  return p[b + 8 >> 2];
}

function VE(b, d) {
  p[b + 8 >> 2] = d;
}

function WE(b) {
  return l[b + 4 >> 2];
}

function XE(b) {
  return p[b + 56 >> 2];
}

function YE(b) {
  return l[b + 148 >> 2];
}

function ZE(b) {
  return 0 != (j[b + 4 >> 1] & 4) << 16 >> 16;
}

function $E(b, d) {
  p[b + 136 >> 2] = d;
}

function aF(b, d, e) {
  K[l[l[b >> 2] + 28 >> 2]](b, d, e);
}

function bF(b, d) {
  return K[l[l[b >> 2] + 8 >> 2]](b, d);
}

function cF() {
  var b, d = As(40);
  b = d >> 2;
  l[b] = dF + 8 | 0;
  l[b + 1] = 3;
  p[b + 2] = .009999999776482582;
  l[b + 3] = 0;
  l[b + 4] = 0;
  c[d + 36 | 0] = 0;
  c[d + 37 | 0] = 0;
  return d;
}

function eF(b, d, e, f) {
  K[l[l[b >> 2] + 24 >> 2]](b, d, e, f);
}

function fF(b, d, e, f, g) {
  return K[l[l[b >> 2] + 20 >> 2]](b, d, e, f, g);
}

function gF(b) {
  return K[l[l[b >> 2] + 12 >> 2]](b);
}

function hF(b, d, e) {
  return K[l[l[b >> 2] + 16 >> 2]](b, d, e);
}

function iF(b, d, e) {
  var f;
  f = (b + 12 | 0) >> 2;
  2 == (0 == (l[f] | 0) ? 0 == (l[b + 16 >> 2] | 0) ? 3 : 2 : 2) && S(O.F | 0, 34, O.gb | 0, O.Ra | 0);
  2 < (e | 0) || S(O.F | 0, 35, O.gb | 0, O.Vb | 0);
  var g = e + 1 | 0, h = b + 16 | 0;
  l[h >> 2] = g;
  g = Oe(g << 3);
  l[f] = g;
  Zg(g, d, e << 3);
  d = l[f];
  e = (e << 3) + d | 0;
  g = l[d + 4 >> 2];
  l[(e | 0) >> 2] = l[d >> 2];
  l[(e + 4 | 0) >> 2] = g;
  f = l[f];
  h = (l[h >> 2] - 2 << 3) + f | 0;
  e = b + 20 | 0;
  d = l[h + 4 >> 2];
  l[e >> 2] = l[h >> 2];
  l[e + 4 >> 2] = d;
  h = f + 8 | 0;
  f = b + 28 | 0;
  e = l[h + 4 >> 2];
  l[f >> 2] = l[h >> 2];
  l[f + 4 >> 2] = e;
  c[b + 36 | 0] = 1;
  c[b + 37 | 0] = 1;
}

function jF(b, d) {
  return K[l[l[b >> 2] + 8 >> 2]](b, d);
}

function kF(b) {
  if (0 != (b | 0)) {
    var d = b + 4 | 0, e = 0 < (l[d >> 2] | 0), f = b | 0, g = l[f >> 2];
    a : do {
      if (e) {
        for (var h = 0, i = g; ; ) {
          if (Fh(l[i + (h << 3) + 4 >> 2]), h = h + 1 | 0, i = l[f >> 2], (h | 0) >= (l[d >> 2] | 0)) {
            var k = i;
            break a;
          }
        }
      } else {
        k = g;
      }
    } while (0);
    Fh(k);
    Nv(b);
  }
}

function lF(b) {
  var d;
  d = (b + 4 | 0) >> 2;
  var e = 0 < (l[d] | 0), f = b | 0;
  a : do {
    if (e) {
      for (var g = 0; ; ) {
        if (Fh(l[l[f >> 2] + (g << 3) + 4 >> 2]), g = g + 1 | 0, (g | 0) >= (l[d] | 0)) {
          break a;
        }
      }
    }
  } while (0);
  l[d] = 0;
  Ze(l[f >> 2], l[b + 8 >> 2] << 3);
  Ze(b + 12 | 0, 56);
}

function mF(b, d, e) {
  var f = 0 == (e | 0);
  a : do {
    if (!f) {
      var g = 0 < (e | 0);
      do {
        if (g) {
          if (640 >= (e | 0)) {
            break;
          }
          Fh(d);
          break a;
        }
        S(O.e | 0, 164, O.f | 0, O.Ua | 0);
      } while (0);
      var h = Gd[bn + e | 0], g = h & 255;
      14 > (h & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
      h = d;
      g = (g << 2) + b + 12 | 0;
      l[d >> 2] = l[g >> 2];
      l[g >> 2] = h;
    }
  } while (0);
}

function nF() {
  var b = As(68), d = b + 8 | 0;
  l[d >> 2] = 128;
  l[b + 4 >> 2] = 0;
  var e = Oe(1024);
  l[b >> 2] = e;
  Ze(e, l[d >> 2] << 3);
  Ze(b + 12 | 0, 56);
  if (0 == (c[np] & 1) << 24 >> 24) {
    e = 0;
    for (d = 1; !(14 > (e | 0) || S(O.e | 0, 73, O.Ga | 0, O.Sa | 0), (d | 0) > (l[cn + (e << 2) >> 2] | 0) && (e = e + 1 | 0), c[bn + d | 0] = e & 255, d = d + 1 | 0, 641 == (d | 0)); ) {}
    c[np] = 1;
  }
  return b;
}

function oF(b) {
  if (0 != (b | 0)) {
    K[l[l[b >> 2] + 4 >> 2]](b);
  }
}

function pF(b, d, e) {
  K[l[l[b >> 2] + 28 >> 2]](b, d, e);
}

function qF(b, d) {
  return K[l[l[b >> 2] + 8 >> 2]](b, d);
}

function rF(b, d, e, f, g) {
  return K[l[l[b >> 2] + 20 >> 2]](b, d, e, f, g);
}

function sF(b, d, e, f) {
  K[l[l[b >> 2] + 24 >> 2]](b, d, e, f);
}

function tF(b) {
  return K[l[l[b >> 2] + 12 >> 2]](b);
}

function uF(b, d, e) {
  return K[l[l[b >> 2] + 16 >> 2]](b, d, e);
}

function vF() {
  var b, d = As(152);
  b = d >> 2;
  l[b] = wF + 8 | 0;
  l[b + 1] = 2;
  p[b + 2] = .009999999776482582;
  l[b + 37] = 0;
  p[b + 3] = 0;
  p[b + 4] = 0;
  return d;
}

function xF(b) {
  if (0 != (b | 0)) {
    K[l[l[b >> 2] + 4 >> 2]](b);
  }
}

function yF(b, d, e) {
  K[l[l[b >> 2] + 28 >> 2]](b, d, e);
}

function zF(b, d) {
  return K[l[l[b >> 2] + 8 >> 2]](b, d);
}

function AF(b, d, e, f, g) {
  return K[l[l[b >> 2] + 20 >> 2]](b, d, e, f, g);
}

function BF(b, d, e, f) {
  K[l[l[b >> 2] + 24 >> 2]](b, d, e, f);
}

function CF(b) {
  return K[l[l[b >> 2] + 12 >> 2]](b);
}

function DF(b, d, e) {
  return K[l[l[b >> 2] + 16 >> 2]](b, d, e);
}

function EF() {
  var b, d = As(48);
  b = d >> 2;
  l[b] = FF + 8 | 0;
  l[b + 1] = 1;
  p[b + 2] = .009999999776482582;
  p[b + 7] = 0;
  p[b + 8] = 0;
  p[b + 9] = 0;
  p[b + 10] = 0;
  c[d + 44 | 0] = 0;
  c[d + 45 | 0] = 0;
  return d;
}

function GF(b, d) {
  var e = l[b + 48 >> 2], f = l[b + 52 >> 2];
  Lh(d, b + 64 | 0, l[e + 8 >> 2] + 12 | 0, p[l[e + 12 >> 2] + 8 >> 2], l[f + 8 >> 2] + 12 | 0, p[l[f + 12 >> 2] + 8 >> 2]);
}

function HF(b) {
  var d = Hh(p[l[b + 48 >> 2] + 16 >> 2] * p[l[b + 52 >> 2] + 16 >> 2]);
  p[b + 136 >> 2] = d;
}

function IF(b, d, e, f) {
  K[l[l[b >> 2] >> 2]](b, d, e, f);
}

function JF(b, d, e) {
  K[l[l[b >> 2] + 28 >> 2]](b, d, e);
}

function KF(b, d) {
  return K[l[l[b >> 2] + 8 >> 2]](b, d);
}

function LF(b, d, e, f, g) {
  return K[l[l[b >> 2] + 20 >> 2]](b, d, e, f, g);
}

function MF(b, d, e, f) {
  K[l[l[b >> 2] + 24 >> 2]](b, d, e, f);
}

function NF(b) {
  return K[l[l[b >> 2] + 12 >> 2]](b);
}

function OF(b, d, e) {
  return K[l[l[b >> 2] + 16 >> 2]](b, d, e);
}

function PF(b, d) {
  p[b + 140 >> 2] = d;
}

function QF(b, d) {
  l[b + 148 >> 2] = d;
}

function RF(b) {
  return p[b + 72 >> 2];
}

function SF(b) {
  return l[b + 100 >> 2];
}

function TF(b, d, e) {
  if (2 == (l[b >> 2] | 0)) {
    var f = b + 4 | 0, g = j[f >> 1];
    0 == (g & 2) << 16 >> 16 && (j[f >> 1] = g | 2, p[b + 144 >> 2] = 0);
    f = d | 0;
    g = b + 76 | 0;
    p[g >> 2] += p[f >> 2];
    d = d + 4 | 0;
    g = b + 80 | 0;
    p[g >> 2] += p[d >> 2];
    g = b + 84 | 0;
    p[g >> 2] += (p[e >> 2] - p[b + 44 >> 2]) * p[d >> 2] - (p[e + 4 >> 2] - p[b + 48 >> 2]) * p[f >> 2];
  }
}

function UF(b, d) {
  if (0 != (l[b >> 2] | 0)) {
    var e = p[d >> 2], f = p[d + 4 >> 2];
    0 < e * e + f * f && (e = b + 4 | 0, f = j[e >> 1], 0 == (f & 2) << 16 >> 16 && (j[e >> 1] = f | 2, p[b + 144 >> 2] = 0));
    e = b + 64 | 0;
    f = l[d + 4 >> 2];
    l[e >> 2] = l[d >> 2];
    l[e + 4 >> 2] = f;
  }
}

function VF(b) {
  return l[b + 108 >> 2];
}

function WF(b) {
  return l[b + 96 >> 2];
}

function XF(b, d) {
  var e;
  e = (b + 4 | 0) >> 1;
  var f = j[e];
  if (d) {
    j[e] = f | 4;
  } else {
    var g = f & -5;
    j[e] = g;
    0 == (f & 2) << 16 >> 16 && (j[e] = g | 2, p[b + 144 >> 2] = 0);
  }
}

function YF(b) {
  return p[b + 116 >> 2];
}

function ZF(b, d) {
  if (0 != (l[b >> 2] | 0)) {
    if (0 < d * d) {
      var e = b + 4 | 0, f = j[e >> 1];
      0 == (f & 2) << 16 >> 16 && (j[e >> 1] = f | 2, p[b + 144 >> 2] = 0);
    }
    p[b + 72 >> 2] = d;
  }
}

function $F(b, d) {
  var e = b + 116 | 0;
  p[d >> 2] = p[e >> 2];
  var f = b + 28 | 0, g = p[f >> 2], h = p[b + 32 >> 2];
  p[d + 12 >> 2] = p[b + 124 >> 2] + p[e >> 2] * (g * g + h * h);
  e = d + 4 | 0;
  g = l[f + 4 >> 2];
  l[e >> 2] = l[f >> 2];
  l[e + 4 >> 2] = g;
}

function aG(b, d) {
  if (2 == (l[b >> 2] | 0)) {
    var e = b + 4 | 0, f = j[e >> 1];
    0 == (f & 2) << 16 >> 16 && (j[e >> 1] = f | 2, p[b + 144 >> 2] = 0);
    e = b + 76 | 0;
    p[e >> 2] += p[d >> 2];
    e = b + 80 | 0;
    p[e >> 2] += p[d + 4 >> 2];
  }
}

function bG(b, d) {
  if (2 == (l[b >> 2] | 0)) {
    var e = b + 4 | 0, f = j[e >> 1];
    0 == (f & 2) << 16 >> 16 && (j[e >> 1] = f | 2, p[b + 144 >> 2] = 0);
    e = b + 84 | 0;
    p[e >> 2] += d;
  }
}

function cG(b) {
  return 0 != (j[b + 4 >> 1] & 2) << 16 >> 16;
}

function dG(b) {
  return b + 12 | 0;
}

function eG(b) {
  return b + 44 | 0;
}

function fG(b) {
  return p[b + 136 >> 2];
}

function gG(b, d, e) {
  var f = b >> 2;
  if (2 == (l[f] | 0)) {
    var g = b + 4 | 0, h = j[g >> 1];
    0 == (h & 2) << 16 >> 16 && (j[g >> 1] = h | 2, p[f + 36] = 0);
    var h = p[f + 30], g = d | 0, d = d + 4 | 0, i = p[d >> 2] * h, k = b + 64 | 0;
    p[k >> 2] += p[g >> 2] * h;
    h = b + 68 | 0;
    p[h >> 2] += i;
    b = b + 72 | 0;
    p[b >> 2] += p[f + 32] * ((p[e >> 2] - p[f + 11]) * p[d >> 2] - (p[e + 4 >> 2] - p[f + 12]) * p[g >> 2]);
  }
}

function hG(b) {
  return 0 != (j[b + 4 >> 1] & 16) << 16 >> 16;
}

function iG(b) {
  return b + 28 | 0;
}

function jG(b) {
  return l[b + 112 >> 2];
}

function kG(b, d) {
  var e, f = b >> 2;
  e = (b + 4 | 0) >> 1;
  var g = j[e];
  d ? 0 == (g & 2) << 16 >> 16 && (j[e] = g | 2, p[f + 36] = 0) : (j[e] = g & -3, p[f + 36] = 0, p[f + 16] = 0, p[f + 17] = 0, p[f + 18] = 0, p[f + 19] = 0, p[f + 20] = 0, p[f + 21] = 0);
}

function lG(b) {
  return p[b + 132 >> 2];
}

function mG(b) {
  return 0 != (j[b + 4 >> 1] & 8) << 16 >> 16;
}

function nG(b) {
  return l[b + 88 >> 2];
}

function oG(b, d) {
  p[b + 132 >> 2] = d;
}

function pG(b, d) {
  var e = b + 4 | 0, f = j[e >> 1];
  j[e >> 1] = d ? f | 8 : f & -9;
}

function qG(b) {
  return l[b >> 2];
}

function rG(b) {
  return p[b + 140 >> 2];
}

function sG(b) {
  var d = p[b + 28 >> 2], e = p[b + 32 >> 2];
  return p[b + 124 >> 2] + p[b + 116 >> 2] * (d * d + e * e);
}

function tG(b) {
  return 0 != (j[b + 4 >> 1] & 32) << 16 >> 16;
}

function uG(b, d) {
  if (2 == (l[b >> 2] | 0)) {
    var e = b + 4 | 0, f = j[e >> 1];
    0 == (f & 2) << 16 >> 16 && (j[e >> 1] = f | 2, p[b + 144 >> 2] = 0);
    e = b + 72 | 0;
    p[e >> 2] += p[b + 128 >> 2] * d;
  }
}

function vG(b) {
  return b + 12 | 0;
}

function wG(b) {
  return l[b + 102408 >> 2];
}

function xG(b, d) {
  0 == c[yG] << 24 >> 24 && Jw(yG);
  var e = p[d >> 2] - p[b + 12 >> 2], f = p[d + 4 >> 2] - p[b + 16 >> 2], g = p[b + 24 >> 2], h = p[b + 20 >> 2], i = (N[0] = g * e + h * f, w[0]), e = (N[0] = e * -h + g * f, w[0]) | 0, f = zG;
  l[f >> 2] = 0 | i;
  l[f + 4 >> 2] = e;
  return zG;
}

function AG(b) {
  0 == c[BG] << 24 >> 24 && Jw(BG);
  var b = b + 64 | 0, d = l[b + 4 >> 2], e = CG;
  l[e >> 2] = l[b >> 2];
  l[e + 4 >> 2] = d;
  return CG;
}

function DG(b, d) {
  var e = b >> 2;
  0 == c[EG] << 24 >> 24 && Jw(EG);
  var f = p[e + 18], g = p[e + 17] + (p[d >> 2] - p[e + 11]) * f, e = (N[0] = p[e + 16] + (p[d + 4 >> 2] - p[e + 12]) * -f, w[0]), g = (N[0] = g, w[0]) | 0, f = FG;
  l[f >> 2] = 0 | e;
  l[f + 4 >> 2] = g;
  return FG;
}

function GG(b, d, e) {
  var f = a;
  a += 28;
  j[f + 22 >> 1] = 1;
  j[f + 24 >> 1] = -1;
  j[f + 26 >> 1] = 0;
  l[f + 4 >> 2] = 0;
  p[f + 8 >> 2] = .20000000298023224;
  p[f + 12 >> 2] = 0;
  c[f + 20 | 0] = 0;
  l[(f | 0) >> 2] = d;
  p[(f + 16 | 0) >> 2] = e;
  b = So(b, f);
  a = f;
  return b;
}

function HG(b, d) {
  0 == c[IG] << 24 >> 24 && Jw(IG);
  var e = p[b + 24 >> 2], f = p[d >> 2], g = p[b + 20 >> 2], h = p[d + 4 >> 2], i = (N[0] = e * f - g * h, w[0]), e = (N[0] = g * f + e * h, w[0]) | 0, f = JG;
  l[f >> 2] = 0 | i;
  l[f + 4 >> 2] = e;
  return JG;
}

function KG(b, d) {
  var e = b >> 2;
  0 == c[LG] << 24 >> 24 && Jw(LG);
  var f = p[e + 6], g = p[d >> 2], h = p[e + 5], i = p[d + 4 >> 2], k = p[e + 18], m = p[e + 17] + (f * g - h * i + p[e + 3] - p[e + 11]) * k, e = (N[0] = p[e + 16] + (h * g + f * i + p[e + 4] - p[e + 12]) * -k, w[0]), m = (N[0] = m, w[0]) | 0, f = MG;
  l[f >> 2] = 0 | e;
  l[f + 4 >> 2] = m;
  return MG;
}

function NG(b, d) {
  0 == c[OG] << 24 >> 24 && Jw(OG);
  var e = p[b + 24 >> 2], f = p[d >> 2], g = p[b + 20 >> 2], h = p[d + 4 >> 2], i = g * f + e * h + p[b + 16 >> 2], e = (N[0] = e * f - g * h + p[b + 12 >> 2], w[0]), i = (N[0] = i, w[0]) | 0, f = PG;
  l[f >> 2] = 0 | e;
  l[f + 4 >> 2] = i;
  return PG;
}

function QG(b, d) {
  0 == c[RG] << 24 >> 24 && Jw(RG);
  var e = p[b + 24 >> 2], f = p[d >> 2], g = p[b + 20 >> 2], h = p[d + 4 >> 2], i = (N[0] = e * f + g * h, w[0]), e = (N[0] = f * -g + e * h, w[0]) | 0, f = SG;
  l[f >> 2] = 0 | i;
  l[f + 4 >> 2] = e;
  return SG;
}

function TG(b, d) {
  var e = b + 4 | 0, f = j[e >> 1];
  j[e >> 1] = d ? f | 16 : f & -17;
  Qo(b);
}

function UG(b) {
  0 != (b | 0) && (0 != (l[b + 102400 >> 2] | 0) && S(O.m | 0, 32, O.P | 0, O.Ta | 0), 0 != (l[b + 102796 >> 2] | 0) && S(O.m | 0, 33, O.P | 0, O.Wa | 0), Nv(b | 0));
}

function VG(b, d) {
  j[b + 2 >> 1] = d;
}

function WG(b, d) {
  j[b >> 1] = d;
}

function XG(b) {
  return j[b + 4 >> 1];
}

function YG(b, d) {
  j[b + 4 >> 1] = d;
}

function ZG(b) {
  return j[b + 2 >> 1];
}

function $G(b) {
  return j[b >> 1];
}

function aH(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function bH(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function cH(b) {
  return p[b + 36 >> 2];
}

function dH(b) {
  return b + 20 | 0;
}

function eH(b, d) {
  p[b + 36 >> 2] = d;
}

function fH(b) {
  return b + 28 | 0;
}

function gH(b, d) {
  p[b + 40 >> 2] = d;
}

function hH(b) {
  return p[b + 40 >> 2];
}

function iH(b, d, e, f) {
  l[b + 8 >> 2] = d;
  l[b + 12 >> 2] = e;
  var g = f | 0, h = p[g >> 2] - p[d + 12 >> 2], f = f + 4 | 0, i = p[f >> 2] - p[d + 16 >> 2], k = p[d + 24 >> 2], m = p[d + 20 >> 2], d = b + 20 | 0, n = (N[0] = k * h + m * i, w[0]), h = (N[0] = h * -m + k * i, w[0]) | 0;
  l[d >> 2] = 0 | n;
  l[d + 4 >> 2] = h;
  g = p[g >> 2] - p[e + 12 >> 2];
  f = p[f >> 2] - p[e + 16 >> 2];
  h = p[e + 24 >> 2];
  e = p[e + 20 >> 2];
  b = b + 28 | 0;
  i = (N[0] = h * g + e * f, w[0]);
  e = (N[0] = g * -e + h * f, w[0]) | 0;
  l[b >> 2] = 0 | i;
  l[b + 4 >> 2] = e;
}

function jH(b) {
  return p[b + 28 >> 2];
}

function kH(b) {
  return 0 != (c[b + 37 | 0] & 1) << 24 >> 24;
}

function lH(b) {
  return l[b >> 2];
}

function mH(b) {
  return 0 != (c[b + 36 | 0] & 1) << 24 >> 24;
}

function nH(b, d) {
  var e = b + 4 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function oH(b, d) {
  var e = b + 16 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function pH(b) {
  return 0 != (c[b + 39 | 0] & 1) << 24 >> 24;
}

function qH(b) {
  return l[b + 44 >> 2];
}

function rH(b, d) {
  p[b + 32 >> 2] = d;
}

function sH(b, d) {
  c[b + 38 | 0] = d & 1;
}

function tH(b, d) {
  c[b + 36 | 0] = d & 1;
}

function uH(b) {
  return p[b + 48 >> 2];
}

function vH(b, d) {
  p[b + 24 >> 2] = d;
}

function wH(b, d) {
  l[b + 44 >> 2] = d;
}

function xH(b, d) {
  l[b >> 2] = d;
}

function yH(b, d) {
  p[b + 48 >> 2] = d;
}

function zH(b) {
  return p[b + 32 >> 2];
}

function AH(b, d) {
  c[b + 39 | 0] = d & 1;
}

function BH(b, d) {
  c[b + 40 | 0] = d & 1;
}

function CH(b, d) {
  p[b + 12 >> 2] = d;
}

function DH(b) {
  return p[b + 12 >> 2];
}

function EH(b) {
  return p[b + 24 >> 2];
}

function FH(b) {
  return b + 16 | 0;
}

function GH(b) {
  return 0 != (c[b + 40 | 0] & 1) << 24 >> 24;
}

function HH(b, d) {
  p[b + 28 >> 2] = d;
}

function IH(b) {
  return 0 != (c[b + 38 | 0] & 1) << 24 >> 24;
}

function JH(b, d) {
  c[b + 37 | 0] = d & 1;
}

function KH(b, d) {
  p[b >> 2] = d;
}

function LH(b, d, e) {
  p[b >> 2] = d;
  p[b + 4 >> 2] = e;
}

function MH(b) {
  return p[b >> 2];
}

function NH(b) {
  return p[b + 4 >> 2];
}

function OH(b, d) {
  p[b + 4 >> 2] = d;
}

function PH(b) {
  var d = p[b >> 2];
  (!isNaN(d) && !isNaN(0)) & -Infinity < d & Infinity > d ? (b = p[b + 4 >> 2], b = (!isNaN(b) && !isNaN(0)) & -Infinity < b ? Infinity > b : 0) : b = 0;
  return b;
}

function QH(b) {
  var d = p[b >> 2], b = p[b + 4 >> 2];
  return d * d + b * b;
}

function RH(b, d) {
  var e = b | 0;
  p[e >> 2] += p[d >> 2];
  e = b + 4 | 0;
  p[e >> 2] += p[d + 4 >> 2];
}

function SH(b) {
  p[b >> 2] = 0;
  p[b + 4 >> 2] = 0;
}

function TH(b, d) {
  var e = b | 0;
  p[e >> 2] *= d;
  e = b + 4 | 0;
  p[e >> 2] *= d;
}

function UH(b, d) {
  p[b + 8 >> 2] = d;
}

function VH(b, d, e, f) {
  p[b >> 2] = d;
  p[b + 4 >> 2] = e;
  p[b + 8 >> 2] = f;
}

function WH(b) {
  return p[b + 8 >> 2];
}

function XH(b, d) {
  var e = b | 0;
  p[e >> 2] += p[d >> 2];
  e = b + 4 | 0;
  p[e >> 2] += p[d + 4 >> 2];
  e = b + 8 | 0;
  p[e >> 2] += p[d + 8 >> 2];
}

function YH(b) {
  p[b >> 2] = 0;
  p[b + 4 >> 2] = 0;
  p[b + 8 >> 2] = 0;
}

function ZH(b, d) {
  var e = b | 0;
  p[e >> 2] *= d;
  e = b + 4 | 0;
  p[e >> 2] *= d;
  e = b + 8 | 0;
  p[e >> 2] *= d;
}

function $H(b) {
  return p[b + 24 >> 2];
}

function aI(b, d) {
  p[b + 24 >> 2] = d;
}

function bI(b) {
  return l[b + 16 >> 2];
}

function cI() {
  var b, d = As(102800);
  b = d >> 2;
  l[b + 25600] = 0;
  l[b + 25601] = 0;
  l[b + 25602] = 0;
  l[b + 25699] = 0;
  return d;
}

function dI(b, d) {
  var e, f, g;
  g = (b + 102796 | 0) >> 2;
  f = l[g];
  if (32 > (f | 0)) {
    var h = f;
  } else {
    S(O.m | 0, 38, O.w | 0, O.D | 0), h = l[g];
  }
  f = (b + 12 * h + 102412 | 0) >> 2;
  l[(b + 102416 >> 2) + (3 * h | 0)] = d;
  e = (b + 102400 | 0) >> 2;
  var i = l[e];
  102400 < (i + d | 0) ? (e = Oe(d), l[f] = e, c[b + 12 * h + 102420 | 0] = 1) : (l[f] = b + i | 0, c[b + 12 * h + 102420 | 0] = 0, l[e] = l[e] + d | 0);
  e = b + 102404 | 0;
  h = l[e >> 2] + d | 0;
  l[e >> 2] = h;
  e = b + 102408 | 0;
  i = l[e >> 2];
  l[e >> 2] = (i | 0) > (h | 0) ? i : h;
  l[g] = l[g] + 1 | 0;
  return l[f];
}

function eI(b, d) {
  K[l[l[b >> 2] + 8 >> 2]](b, d);
}

function fI(b) {
  0 != (b | 0) && Nv(b);
}

function gI() {
  var b, d = As(6);
  b = d >> 1;
  j[b] = 1;
  j[b + 1] = -1;
  j[b + 2] = 0;
  return d;
}

function hI(b) {
  0 != (b | 0) && Nv(b);
}

function iI() {
  var b, d = As(44);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 9;
  p[b + 5] = 0;
  p[b + 6] = 0;
  p[b + 7] = 0;
  p[b + 8] = 0;
  p[b + 9] = 0;
  p[b + 10] = 0;
  return d;
}

function jI() {
  var b, d, e = As(52);
  d = e >> 2;
  l[d + 11] = 0;
  b = (e + 4 | 0) >> 2;
  l[b] = 0;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  l[b + 4] = 0;
  l[b + 5] = 0;
  l[b + 6] = 0;
  l[b + 7] = 0;
  c[e + 36 | 0] = 1;
  c[e + 37 | 0] = 1;
  c[e + 38 | 0] = 0;
  c[e + 39 | 0] = 0;
  l[d] = 0;
  c[e + 40 | 0] = 1;
  p[d + 12] = 1;
  return e;
}

function kI(b) {
  0 != (b | 0) && Nv(b);
}

function lI(b) {
  var d = b | 0, e = p[d >> 2], b = b + 4 | 0, f = p[b >> 2], g = Hh(e * e + f * f);
  if (1.1920928955078125e-7 > g) {
    d = 0;
  } else {
    var h = 1 / g;
    p[d >> 2] = e * h;
    p[b >> 2] = f * h;
    d = g;
  }
  return d;
}

function mI() {
  return As(8);
}

function nI(b, d) {
  var e = As(8);
  p[e >> 2] = b;
  p[e + 4 >> 2] = d;
  return e;
}

function oI(b) {
  0 == c[pI] << 24 >> 24 && Jw(pI);
  var d = p[b >> 2], b = (N[0] = -p[b + 4 >> 2], w[0]), d = (N[0] = d, w[0]) | 0, e = qI;
  l[e >> 2] = 0 | b;
  l[e + 4 >> 2] = d;
  return qI;
}

function rI(b) {
  var d = p[b >> 2], b = p[b + 4 >> 2];
  return Hh(d * d + b * b);
}

function sI(b) {
  0 != (b | 0) && Nv(b);
}

function tI(b) {
  0 == c[uI] << 24 >> 24 && Jw(uI);
  var d = -p[b + 4 >> 2], b = (N[0] = -p[b >> 2], w[0]), d = (N[0] = d, w[0]) | 0, e = vI;
  l[e >> 2] = 0 | b;
  l[e + 4 >> 2] = d;
  return vI;
}

function wI(b) {
  0 != (b | 0) && Nv(b);
}

function xI() {
  return As(12);
}

function yI(b, d, e) {
  var f, g = As(12);
  f = g >> 2;
  p[f] = b;
  p[f + 1] = d;
  p[f + 2] = e;
  return g;
}

function zI(b) {
  0 == c[AI] << 24 >> 24 && Jw(AI);
  var d = -p[b + 4 >> 2], e = -p[b + 8 >> 2];
  p[BI >> 2] = -p[b >> 2];
  p[BI + 4 >> 2] = d;
  p[BI + 8 >> 2] = e;
  return BI;
}

function CI() {
  var b, d = As(28);
  b = d >> 2;
  l[b + 4] = 0;
  l[b + 5] = 0;
  p[b + 6] = 0;
  return d;
}

function DI(b) {
  0 != (b | 0) && Nv(b);
}

function EI(b, d) {
  var e, f = l[b + 16 >> 2];
  e = f >> 2;
  var g = l[b + 20 >> 2], h = 1 < (g | 0);
  a : do {
    if (h) {
      for (var i = p[d + 4 >> 2], k = p[d >> 2], m = 0, n = p[e] * k + p[e + 1] * i, q = 1; ; ) {
        var r = p[(q << 3 >> 2) + e] * k + p[((q << 3) + 4 >> 2) + e] * i, t = r > n, m = t ? q : m, n = t ? r : n, q = q + 1 | 0;
        if ((q | 0) == (g | 0)) {
          var u = m;
          break a;
        }
      }
    } else {
      u = 0;
    }
  } while (0);
  return (u << 3) + f | 0;
}

function FI(b) {
  return l[b + 20 >> 2];
}

function GI(b) {
  return l[b + 20 >> 2];
}

function HI(b, d) {
  var e;
  e = l[b + 16 >> 2] >> 2;
  var f = l[b + 20 >> 2], g = 1 < (f | 0);
  a : do {
    if (g) {
      for (var h = p[d + 4 >> 2], i = p[d >> 2], k = 0, m = p[e] * i + p[e + 1] * h, n = 1; ; ) {
        var q = p[(n << 3 >> 2) + e] * i + p[((n << 3) + 4 >> 2) + e] * h, r = q > m, k = r ? n : k, m = r ? q : m, n = n + 1 | 0;
        if ((n | 0) == (f | 0)) {
          var t = k;
          break a;
        }
      }
    } else {
      t = 0;
    }
  } while (0);
  return t;
}

function II(b, d) {
  l[b + 16 >> 2] = d;
}

function JI(b, d) {
  l[b + 20 >> 2] = d;
}

function KI(b) {
  return 0 != (c[b + 20 | 0] & 1) << 24 >> 24;
}

function LI(b, d) {
  l[b + 4 >> 2] = d;
}

function MI(b, d) {
  l[b >> 2] = d;
}

function NI(b) {
  return p[b + 16 >> 2];
}

function OI(b) {
  return l[b >> 2];
}

function PI(b, d) {
  p[b + 16 >> 2] = d;
}

function QI(b, d) {
  p[b + 12 >> 2] = d;
}

function RI(b) {
  return p[b + 12 >> 2];
}

function SI(b, d) {
  c[b + 20 | 0] = d & 1;
}

function TI(b) {
  return b + 22 | 0;
}

function UI(b) {
  return p[b + 8 >> 2];
}

function VI(b, d) {
  p[b + 8 >> 2] = d;
}

function WI(b) {
  return l[b + 4 >> 2];
}

function XI(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function YI(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function ZI(b) {
  return p[b + 68 >> 2];
}

function $I(b) {
  return 0 != (c[b + 60 | 0] & 1) << 24 >> 24;
}

function aJ(b) {
  return p[b + 44 >> 2];
}

function bJ(b, d) {
  c[b + 48 | 0] = d & 1;
}

function cJ(b, d) {
  p[b + 68 >> 2] = d;
}

function dJ(b) {
  return b + 36 | 0;
}

function eJ(b, d) {
  p[b + 56 >> 2] = d;
}

function fJ(b, d, e, f, g) {
  var h = e >> 2;
  l[b + 8 >> 2] = d;
  l[b + 12 >> 2] = e;
  var i = f | 0, k = p[i >> 2] - p[d + 12 >> 2], m = f + 4 | 0, n = p[m >> 2] - p[d + 16 >> 2], e = d + 24 | 0, q = p[e >> 2], f = d + 20 | 0, r = p[f >> 2], t = b + 20 | 0, u = (N[0] = q * k + r * n, w[0]), k = (N[0] = k * -r + q * n, w[0]) | 0;
  l[t >> 2] = 0 | u;
  l[t + 4 >> 2] = k;
  i = p[i >> 2] - p[h + 3];
  t = p[m >> 2] - p[h + 4];
  u = p[h + 6];
  n = p[h + 5];
  m = b + 28 | 0;
  k = (N[0] = u * i + n * t, w[0]);
  i = (N[0] = i * -n + u * t, w[0]) | 0;
  l[m >> 2] = 0 | k;
  l[m + 4 >> 2] = i;
  e = p[e >> 2];
  i = p[g >> 2];
  f = p[f >> 2];
  k = p[g + 4 >> 2];
  g = b + 36 | 0;
  m = (N[0] = e * i + f * k, w[0]);
  f = (N[0] = i * -f + e * k, w[0]) | 0;
  l[g >> 2] = 0 | m;
  l[g + 4 >> 2] = f;
  p[b + 44 >> 2] = p[h + 14] - p[d + 56 >> 2];
}

function gJ(b, d) {
  p[b + 52 >> 2] = d;
}

function hJ(b) {
  return p[b + 56 >> 2];
}

function iJ(b) {
  return 0 != (c[b + 48 | 0] & 1) << 24 >> 24;
}

function jJ(b, d) {
  p[b + 44 >> 2] = d;
}

function kJ(b) {
  return b + 20 | 0;
}

function lJ(b) {
  return b + 28 | 0;
}

function mJ(b) {
  return p[b + 64 >> 2];
}

function nJ(b, d) {
  p[b + 64 >> 2] = d;
}

function oJ(b, d) {
  c[b + 60 | 0] = d & 1;
}

function pJ(b) {
  return p[b + 52 >> 2];
}

function qJ(b, d) {
  var e = b + 36 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function rJ(b, d) {
  p[b + 4 >> 2] = d;
}

function sJ(b) {
  p[b >> 2] = 0;
  p[b + 4 >> 2] = 1;
}

function tJ(b) {
  return p[b + 4 >> 2];
}

function uJ(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function vJ(b, d) {
  p[b + 52 >> 2] = d;
}

function wJ(b) {
  return b + 36 | 0;
}

function xJ(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function yJ(b) {
  return p[b + 56 >> 2];
}

function zJ(b, d) {
  p[b + 48 >> 2] = d;
}

function AJ(b) {
  return 0 != (c[b + 44 | 0] & 1) << 24 >> 24;
}

function BJ(b) {
  return b + 20 | 0;
}

function CJ(b) {
  return p[b + 48 >> 2];
}

function DJ(b) {
  return b + 28 | 0;
}

function EJ(b) {
  return p[b + 60 >> 2];
}

function FJ(b, d) {
  c[b + 44 | 0] = d & 1;
}

function GJ(b, d) {
  p[b + 56 >> 2] = d;
}

function HJ(b, d, e, f, g) {
  l[b + 8 >> 2] = d;
  l[b + 12 >> 2] = e;
  var h = f | 0, i = p[h >> 2] - p[d + 12 >> 2], k = f + 4 | 0, m = p[k >> 2] - p[d + 16 >> 2], f = d + 24 | 0, n = p[f >> 2], d = d + 20 | 0, q = p[d >> 2], r = b + 20 | 0, t = (N[0] = n * i + q * m, w[0]), i = (N[0] = i * -q + n * m, w[0]) | 0;
  l[r >> 2] = 0 | t;
  l[r + 4 >> 2] = i;
  h = p[h >> 2] - p[e + 12 >> 2];
  k = p[k >> 2] - p[e + 16 >> 2];
  i = p[e + 24 >> 2];
  n = p[e + 20 >> 2];
  e = b + 28 | 0;
  m = (N[0] = i * h + n * k, w[0]);
  h = (N[0] = h * -n + i * k, w[0]) | 0;
  l[e >> 2] = 0 | m;
  l[e + 4 >> 2] = h;
  f = p[f >> 2];
  e = p[g >> 2];
  d = p[d >> 2];
  g = p[g + 4 >> 2];
  b = b + 36 | 0;
  h = (N[0] = f * e + d * g, w[0]);
  g = (N[0] = e * -d + f * g, w[0]) | 0;
  l[b >> 2] = 0 | h;
  l[b + 4 >> 2] = g;
}

function IJ(b, d) {
  p[b + 60 >> 2] = d;
}

function JJ(b, d) {
  var e = b + 36 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function KJ(b) {
  return p[b + 52 >> 2];
}

function LJ(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function MJ(b) {
  return p[b + 44 >> 2];
}

function NJ(b, d) {
  p[b + 48 >> 2] = d;
}

function OJ(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function PJ(b) {
  return 0 != (c[b + 40 | 0] & 1) << 24 >> 24;
}

function QJ(b, d) {
  p[b + 44 >> 2] = d;
}

function RJ(b, d) {
  2 == (-1 < (d | 0) ? (l[b + 20 >> 2] | 0) > (d | 0) ? 3 : 2 : 2) && S(O.i | 0, 103, O.h | 0, O.j | 0);
  return (d << 3) + l[b + 16 >> 2] | 0;
}

function SJ(b) {
  0 != (b | 0) && Nv(b);
}

function TJ() {
  var b = As(28);
  j[b + 22 >> 1] = 1;
  j[b + 24 >> 1] = -1;
  j[b + 26 >> 1] = 0;
  l[b >> 2] = 0;
  l[b + 4 >> 2] = 0;
  p[b + 8 >> 2] = .20000000298023224;
  p[b + 12 >> 2] = 0;
  p[b + 16 >> 2] = 0;
  c[b + 20 | 0] = 0;
  return b;
}

function UJ(b, d) {
  var e, f;
  f = (b + 22 | 0) >> 1;
  e = d >> 1;
  j[f] = j[e];
  j[f + 1] = j[e + 1];
  j[f + 2] = j[e + 2];
}

function VJ() {
  var b, d = As(72);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 2;
  p[b + 5] = 0;
  p[b + 6] = 0;
  p[b + 7] = 0;
  p[b + 8] = 0;
  p[b + 9] = 1;
  p[b + 10] = 0;
  p[b + 11] = 0;
  c[d + 48 | 0] = 0;
  p[b + 13] = 0;
  p[b + 14] = 0;
  c[d + 60 | 0] = 0;
  p[b + 16] = 0;
  p[b + 17] = 0;
  return d;
}

function WJ(b) {
  0 != (b | 0) && Nv(b);
}

function XJ(b) {
  0 != (b | 0) && Nv(b);
}

function YJ(b, d) {
  var e = Dm(d);
  p[b >> 2] = e;
  e = Em(d);
  p[b + 4 >> 2] = e;
}

function ZJ(b) {
  return $J(p[b >> 2], p[b + 4 >> 2]);
}

function aK(b) {
  0 == c[bK] << 24 >> 24 && Jw(bK);
  var d = p[b + 4 >> 2], b = (N[0] = -p[b >> 2], w[0]), d = (N[0] = d, w[0]) | 0, e = cK;
  l[e >> 2] = 0 | b;
  l[e + 4 >> 2] = d;
  return cK;
}

function dK(b) {
  0 == c[eK] << 24 >> 24 && Jw(eK);
  var d = p[b >> 2], b = (N[0] = p[b + 4 >> 2], w[0]), d = (N[0] = d, w[0]) | 0, e = fK;
  l[e >> 2] = 0 | b;
  l[e + 4 >> 2] = d;
  return fK;
}

function gK() {
  return As(8);
}

function hK(b) {
  var d = As(8), e = Dm(b);
  p[d >> 2] = e;
  b = Em(b);
  p[d + 4 >> 2] = b;
  return d;
}

function iK(b) {
  0 != (b | 0) && Nv(b);
}

function jK() {
  var b, d = As(64);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 7;
  p[b + 5] = 0;
  p[b + 6] = 0;
  p[b + 7] = 0;
  p[b + 8] = 0;
  p[b + 9] = 1;
  p[b + 10] = 0;
  c[d + 44 | 0] = 0;
  p[b + 12] = 0;
  p[b + 13] = 0;
  p[b + 14] = 2;
  p[b + 15] = .699999988079071;
  return d;
}

function kK(b) {
  return 0 != (c[b + 52 | 0] & 1) << 24 >> 24;
}

function lK(b, d) {
  p[b + 56 >> 2] = d;
}

function mK(b) {
  return p[b + 48 >> 2];
}

function nK(b, d) {
  p[b + 36 >> 2] = d;
}

function oK(b, d) {
  p[b + 60 >> 2] = d;
}

function pK(b) {
  return b + 20 | 0;
}

function qK(b) {
  return p[b + 36 >> 2];
}

function rK(b) {
  return b + 28 | 0;
}

function sK(b, d) {
  c[b + 40 | 0] = d & 1;
}

function tK(b, d) {
  c[b + 52 | 0] = d & 1;
}

function uK(b, d, e, f) {
  var g = e >> 2, h = d >> 2;
  l[b + 8 >> 2] = d;
  l[b + 12 >> 2] = e;
  var d = f | 0, e = p[d >> 2] - p[h + 3], f = f + 4 | 0, i = p[f >> 2] - p[h + 4], k = p[h + 6], m = p[h + 5], n = b + 20 | 0, q = (N[0] = k * e + m * i, w[0]), e = (N[0] = e * -m + k * i, w[0]) | 0;
  l[n >> 2] = 0 | q;
  l[n + 4 >> 2] = e;
  d = p[d >> 2] - p[g + 3];
  n = p[f >> 2] - p[g + 4];
  q = p[g + 6];
  i = p[g + 5];
  f = b + 28 | 0;
  e = (N[0] = q * d + i * n, w[0]);
  d = (N[0] = d * -i + q * n, w[0]) | 0;
  l[f >> 2] = 0 | e;
  l[f + 4 >> 2] = d;
  p[b + 36 >> 2] = p[g + 14] - p[h + 14];
}

function vK(b) {
  return p[b + 60 >> 2];
}

function wK(b) {
  return p[b + 56 >> 2];
}

function xK(b, d) {
  var e = b + 36 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function yK(b, d) {
  var e = b + 44 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function zK(b) {
  return p[b + 60 >> 2];
}

function AK(b) {
  return p[b + 56 >> 2];
}

function BK(b) {
  return p[b + 52 >> 2];
}

function CK(b) {
  return b + 36 | 0;
}

function DK(b, d) {
  p[b + 60 >> 2] = d;
}

function EK(b) {
  return b + 44 | 0;
}

function FK(b) {
  return b + 28 | 0;
}

function GK(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function HK(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function IK(b, d) {
  p[b + 56 >> 2] = d;
}

function JK(b, d) {
  p[b + 52 >> 2] = d;
}

function KK(b) {
  return b + 20 | 0;
}

function LK(b) {
  return l[b + 8 >> 2];
}

function MK(b, d) {
  l[b + 4 >> 2] = d;
}

function NK(b, d) {
  l[b + 8 >> 2] = d;
}

function OK(b, d) {
  l[b + 12 >> 2] = d;
}

function PK(b) {
  return l[b + 12 >> 2];
}

function QK(b, d) {
  l[b >> 2] = d;
}

function RK(b) {
  return 0 != (c[b + 16 | 0] & 1) << 24 >> 24;
}

function SK(b) {
  return l[b >> 2];
}

function TK(b, d) {
  c[b + 16 | 0] = d & 1;
}

function UK(b) {
  return l[b + 4 >> 2];
}

function VK(b, d) {
  var e = l[d + 4 >> 2];
  l[b >> 2] = l[d >> 2];
  l[b + 4 >> 2] = e;
}

function WK(b, d) {
  var e = b + 8 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function XK(b) {
  p[b >> 2] = 0;
  p[b + 4 >> 2] = 0;
  p[b + 8 >> 2] = 0;
  p[b + 12 >> 2] = 1;
}

function YK(b, d) {
  p[b + 8 >> 2] = d;
}

function ZK(b, d, e, f) {
  p[b >> 2] = d;
  p[b + 4 >> 2] = e;
  p[b + 8 >> 2] = f;
}

function $K(b) {
  return p[b + 8 >> 2];
}

function aL(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function bL(b) {
  return p[b + 40 >> 2];
}

function cL(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function dL(b, d) {
  p[b + 44 >> 2] = d;
}

function eL(b, d) {
  p[b + 36 >> 2] = d;
}

function fL(b) {
  return b + 20 | 0;
}

function gL(b) {
  return p[b + 36 >> 2];
}

function hL(b) {
  return b + 28 | 0;
}

function iL(b) {
  return p[b + 44 >> 2];
}

function jL(b, d) {
  p[b + 40 >> 2] = d;
}

function kL(b, d, e, f) {
  var g = e >> 2, h = d >> 2;
  l[b + 8 >> 2] = d;
  l[b + 12 >> 2] = e;
  var d = f | 0, e = p[d >> 2] - p[h + 3], f = f + 4 | 0, i = p[f >> 2] - p[h + 4], k = p[h + 6], m = p[h + 5], n = b + 20 | 0, q = (N[0] = k * e + m * i, w[0]), e = (N[0] = e * -m + k * i, w[0]) | 0;
  l[n >> 2] = 0 | q;
  l[n + 4 >> 2] = e;
  d = p[d >> 2] - p[g + 3];
  n = p[f >> 2] - p[g + 4];
  q = p[g + 6];
  i = p[g + 5];
  f = b + 28 | 0;
  e = (N[0] = q * d + i * n, w[0]);
  d = (N[0] = d * -i + q * n, w[0]) | 0;
  l[f >> 2] = 0 | e;
  l[f + 4 >> 2] = d;
  p[b + 36 >> 2] = p[g + 14] - p[h + 14];
}

function lL(b) {
  return p[b + 32 >> 2];
}

function mL(b, d) {
  p[b + 36 >> 2] = d;
}

function nL(b) {
  return p[b + 28 >> 2];
}

function oL(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function pL(b, d) {
  p[b + 28 >> 2] = d;
}

function qL(b) {
  return b + 20 | 0;
}

function rL(b, d) {
  p[b + 32 >> 2] = d;
}

function sL(b) {
  return p[b + 36 >> 2];
}

function tL(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function uL(b) {
  return p[b + 36 >> 2];
}

function vL(b) {
  return p[b + 40 >> 2];
}

function wL(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function xL(b, d) {
  p[b + 44 >> 2] = d;
}

function yL(b) {
  return b + 20 | 0;
}

function zL(b) {
  return b + 28 | 0;
}

function AL(b) {
  return p[b + 44 >> 2];
}

function BL(b) {
  0 != (b | 0) && Nv(b);
}

function CL() {
  var b, d = As(64);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 1;
  p[b + 5] = 0;
  p[b + 6] = 0;
  p[b + 7] = 0;
  p[b + 8] = 0;
  p[b + 9] = 0;
  p[b + 11] = 0;
  p[b + 12] = 0;
  p[b + 15] = 0;
  p[b + 14] = 0;
  c[d + 40 | 0] = 0;
  c[d + 52 | 0] = 0;
  return d;
}

function DL(b) {
  0 != (b | 0) && Nv(b);
}

function EL() {
  var b, d = As(64);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  l[d >> 2] = 4;
  p[b + 5] = -1;
  p[b + 6] = 1;
  p[b + 7] = 1;
  p[b + 8] = 1;
  p[b + 9] = -1;
  p[b + 10] = 0;
  p[b + 11] = 1;
  p[b + 12] = 0;
  p[b + 13] = 0;
  p[b + 14] = 0;
  p[b + 15] = 1;
  c[d + 16 | 0] = 1;
  return d;
}

function FL(b) {
  0 != (b | 0) && Nv(b);
}

function GL() {
  var b, d = As(20);
  b = d >> 2;
  l[b] = 0;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  return d;
}

function HL(b) {
  0 != (b | 0) && Nv(b);
}

function IL(b, d, e) {
  var f = l[d + 4 >> 2];
  l[b >> 2] = l[d >> 2];
  l[b + 4 >> 2] = f;
  d = Dm(e);
  p[b + 8 >> 2] = d;
  e = Em(e);
  p[b + 12 >> 2] = e;
}

function JL() {
  return As(16);
}

function KL(b, d) {
  var e = As(16), f = l[b + 4 >> 2];
  l[e >> 2] = l[b >> 2];
  l[e + 4 >> 2] = f;
  var f = e + 8 | 0, g = l[d + 4 >> 2];
  l[f >> 2] = l[d >> 2];
  l[f + 4 >> 2] = g;
  return e;
}

function LL(b) {
  0 != (b | 0) && Nv(b);
}

function ML() {
  return As(12);
}

function NL(b, d, e) {
  var f, g = As(12);
  f = g >> 2;
  p[f] = b;
  p[f + 1] = d;
  p[f + 2] = e;
  return g;
}

function OL(b) {
  0 != (b | 0) && Nv(b);
}

function PL() {
  var b, d = As(48);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 8;
  p[b + 5] = 0;
  p[b + 6] = 0;
  p[b + 7] = 0;
  p[b + 8] = 0;
  p[b + 9] = 0;
  p[b + 10] = 0;
  p[b + 11] = 0;
  return d;
}

function QL(b) {
  0 != (b | 0) && Nv(b);
}

function RL() {
  var b, d = As(40);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 5;
  p[b + 5] = 0;
  p[b + 6] = 0;
  p[b + 7] = 0;
  p[b + 8] = 5;
  p[b + 9] = .699999988079071;
  return d;
}

function SL(b) {
  0 != (b | 0) && Nv(b);
}

function TL(b, d) {
  p[b + 36 >> 2] = d;
}

function UL(b, d) {
  p[b + 40 >> 2] = d;
}

function VL(b, d) {
  l[b + 20 >> 2] = d;
}

function WL(b, d) {
  l[b + 24 >> 2] = d;
}

function XL(b, d) {
  p[b + 28 >> 2] = d;
}

function YL(b) {
  return l[b + 20 >> 2];
}

function ZL(b) {
  return l[b + 24 >> 2];
}

function $L(b) {
  return p[b + 28 >> 2];
}

function aM(b, d) {
  var e = b + 20 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function bM(b) {
  return p[b + 36 >> 2];
}

function cM(b, d) {
  var e = b + 28 | 0, f = l[d + 4 >> 2];
  l[e >> 2] = l[d >> 2];
  l[e + 4 >> 2] = f;
}

function dM(b) {
  return b + 20 | 0;
}

function eM(b) {
  return b + 28 | 0;
}

function fM(b, d) {
  p[b + 36 >> 2] = d;
}

function gM() {
  var b, d = As(48);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 3;
  p[b + 5] = 0;
  p[b + 6] = 0;
  p[b + 7] = 0;
  p[b + 8] = 0;
  p[b + 9] = 1;
  p[b + 10] = 0;
  p[b + 11] = 0;
  return d;
}

function hM(b, d, e, f, g) {
  l[b + 8 >> 2] = d;
  l[b + 12 >> 2] = e;
  var h = f | 0, i = p[h >> 2] - p[d + 12 >> 2], f = f + 4 | 0, k = p[f >> 2] - p[d + 16 >> 2], m = p[d + 24 >> 2], n = p[d + 20 >> 2], d = b + 20 | 0, q = (N[0] = m * i + n * k, w[0]), i = (N[0] = i * -n + m * k, w[0]) | 0;
  l[d >> 2] = 0 | q;
  l[d + 4 >> 2] = i;
  i = g | 0;
  k = p[i >> 2] - p[e + 12 >> 2];
  g = g + 4 | 0;
  m = p[g >> 2] - p[e + 16 >> 2];
  d = p[e + 24 >> 2];
  n = p[e + 20 >> 2];
  e = b + 28 | 0;
  q = (N[0] = d * k + n * m, w[0]);
  k = (N[0] = k * -n + d * m, w[0]) | 0;
  l[e >> 2] = 0 | q;
  l[e + 4 >> 2] = k;
  h = p[i >> 2] - p[h >> 2];
  f = p[g >> 2] - p[f >> 2];
  h = Hh(h * h + f * f);
  p[b + 36 >> 2] = h;
}

function iM(b) {
  0 != (b | 0) && Nv(b);
}

function jM() {
  var b, d = As(32);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 6;
  l[b + 5] = 0;
  l[b + 6] = 0;
  p[b + 7] = 1;
  return d;
}

function kM(b) {
  0 != (b | 0) && Nv(b);
}

function lM() {
  var b, d = As(40);
  b = d >> 2;
  l[b + 1] = 0;
  l[b + 2] = 0;
  l[b + 3] = 0;
  c[d + 16 | 0] = 0;
  l[d >> 2] = 10;
  p[b + 5] = -1;
  p[b + 6] = 0;
  p[b + 7] = 1;
  p[b + 8] = 0;
  p[b + 9] = 0;
  return d;
}

function Oe(b) {
  var d, e, f, g, h, i, k, m, n, q, r, t, u, v, A, C, B, y, z, F = 245 > b >>> 0;
  a : do {
    if (F) {
      var G = 11 > b >>> 0 ? 16 : b + 11 & -8, H = G >>> 3, E = o[X >> 2], I = E >>> (H >>> 0);
      if (0 != (I & 3 | 0)) {
        var J = (I & 1 ^ 1) + H | 0, L = J << 1, M = (L << 2) + X + 40 | 0, V = (L + 2 << 2) + X + 40 | 0, Q = o[V >> 2], T = Q + 8 | 0, Y = o[T >> 2];
        (M | 0) == (Y | 0) ? l[X >> 2] = E & (1 << J ^ -1) : (Y >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[V >> 2] = Y, l[Y + 12 >> 2] = M);
        var R = J << 3;
        l[Q + 4 >> 2] = R | 3;
        var P = Q + (R | 4) | 0;
        l[P >> 2] |= 1;
        var aa = T;
        z = 334;
        break;
      }
      if (G >>> 0 <= o[X + 8 >> 2] >>> 0) {
        var W = G;
        y = W >> 2;
        z = 156;
        break;
      }
      if (0 != (I | 0)) {
        var da = 2 << H, sa = I << H & (da | -da), ta = (sa & -sa) - 1 | 0, ja = ta >>> 12 & 16, ua = ta >>> (ja >>> 0), ha = ua >>> 5 & 8, wa = ua >>> (ha >>> 0), oa = wa >>> 2 & 4, Aa = wa >>> (oa >>> 0), Fa = Aa >>> 1 & 2, La = Aa >>> (Fa >>> 0), xa = La >>> 1 & 1, ca = (ha | ja | oa | Fa | xa) + (La >>> (xa >>> 0)) | 0, Z = ca << 1, la = (Z << 2) + X + 40 | 0, ya = (Z + 2 << 2) + X + 40 | 0, fa = o[ya >> 2], $ = fa + 8 | 0, eb = o[$ >> 2];
        (la | 0) == (eb | 0) ? l[X >> 2] = E & (1 << ca ^ -1) : (eb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[ya >> 2] = eb, l[eb + 12 >> 2] = la);
        var Sa = ca << 3, Da = Sa - G | 0;
        l[fa + 4 >> 2] = G | 3;
        var na = fa, ma = na + G | 0;
        l[na + (G | 4) >> 2] = Da | 1;
        l[na + Sa >> 2] = Da;
        var Ba = o[X + 8 >> 2];
        if (0 != (Ba | 0)) {
          var za = l[X + 20 >> 2], Ha = Ba >>> 2 & 1073741822, jb = (Ha << 2) + X + 40 | 0, Ia = o[X >> 2], $a = 1 << (Ba >>> 3);
          if (0 == (Ia & $a | 0)) {
            l[X >> 2] = Ia | $a;
            var ba = jb, qa = (Ha + 2 << 2) + X + 40 | 0;
          } else {
            var ka = (Ha + 2 << 2) + X + 40 | 0, ia = o[ka >> 2];
            ia >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
            ba = ia;
            qa = ka;
          }
          l[qa >> 2] = za;
          l[ba + 12 >> 2] = za;
          l[(za + 8 | 0) >> 2] = ba;
          l[(za + 12 | 0) >> 2] = jb;
        }
        l[X + 8 >> 2] = Da;
        l[X + 20 >> 2] = ma;
        aa = $;
        z = 334;
        break;
      }
      var va = l[X + 4 >> 2];
      if (0 == (va | 0)) {
        W = G;
        y = W >> 2;
        z = 156;
        break;
      }
      var Oa = (va & -va) - 1 | 0, Pa = Oa >>> 12 & 16, Ta = Oa >>> (Pa >>> 0), Xa = Ta >>> 5 & 8, ab = Ta >>> (Xa >>> 0), kb = ab >>> 2 & 4, mb = ab >>> (kb >>> 0), Qa = mb >>> 1 & 2, Ma = mb >>> (Qa >>> 0), bb = Ma >>> 1 & 1, Va = o[X + ((Xa | Pa | kb | Qa | bb) + (Ma >>> (bb >>> 0)) << 2) + 304 >> 2], Ja = Va;
      B = Ja >> 2;
      var ga = (l[Va + 4 >> 2] & -8) - G | 0;
      b : for (;;) {
        for (var cb = Ja; ; ) {
          var gb = l[cb + 16 >> 2];
          if (0 == (gb | 0)) {
            var db = l[cb + 20 >> 2];
            if (0 == (db | 0)) {
              break b;
            }
            var Ya = db;
          } else {
            Ya = gb;
          }
          var Ka = (l[Ya + 4 >> 2] & -8) - G | 0;
          if (Ka >>> 0 < ga >>> 0) {
            Ja = Ya;
            B = Ja >> 2;
            ga = Ka;
            continue b;
          }
          cb = Ya;
        }
      }
      var Ga = Ja, fb = o[X + 16 >> 2], Ea = Ga >>> 0 < fb >>> 0;
      do {
        if (!Ea) {
          var Ua = Ga + G | 0, ob = Ua;
          if (Ga >>> 0 < Ua >>> 0) {
            var Na = o[B + 6], Wa = o[B + 3], nb = (Wa | 0) == (Ja | 0);
            do {
              if (nb) {
                var pa = Ja + 20 | 0, hb = l[pa >> 2];
                if (0 == (hb | 0)) {
                  var Ca = Ja + 16 | 0, ib = l[Ca >> 2];
                  if (0 == (ib | 0)) {
                    var Za = 0;
                    C = Za >> 2;
                    break;
                  }
                  var lb = Ca, qb = ib;
                } else {
                  lb = pa, qb = hb, z = 38;
                }
                for (;;) {
                  var vb = qb + 20 | 0, sb = l[vb >> 2];
                  if (0 != (sb | 0)) {
                    lb = vb, qb = sb;
                  } else {
                    var Ab = qb + 16 | 0, Bb = o[Ab >> 2];
                    if (0 == (Bb | 0)) {
                      break;
                    }
                    lb = Ab;
                    qb = Bb;
                  }
                }
                lb >>> 0 < fb >>> 0 && (mM(), ea("Reached an unreachable!"));
                l[lb >> 2] = 0;
                Za = qb;
              } else {
                var Gb = o[B + 2];
                Gb >>> 0 < fb >>> 0 && (mM(), ea("Reached an unreachable!"));
                l[Gb + 12 >> 2] = Wa;
                l[Wa + 8 >> 2] = Gb;
                Za = Wa;
              }
              C = Za >> 2;
            } while (0);
            var Cb = 0 == (Na | 0);
            b : do {
              if (!Cb) {
                var pb = Ja + 28 | 0, ub = (l[pb >> 2] << 2) + X + 304 | 0, Eb = (Ja | 0) == (l[ub >> 2] | 0);
                do {
                  if (Eb) {
                    l[ub >> 2] = Za;
                    if (0 != (Za | 0)) {
                      break;
                    }
                    l[X + 4 >> 2] &= 1 << l[pb >> 2] ^ -1;
                    break b;
                  }
                  Na >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                  var Db = Na + 16 | 0;
                  (l[Db >> 2] | 0) == (Ja | 0) ? l[Db >> 2] = Za : l[Na + 20 >> 2] = Za;
                  if (0 == (Za | 0)) {
                    break b;
                  }
                } while (0);
                Za >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                l[C + 6] = Na;
                var wb = o[B + 4];
                0 != (wb | 0) && (wb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[C + 4] = wb, l[wb + 24 >> 2] = Za);
                var Hb = o[B + 5];
                0 != (Hb | 0) && (Hb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[C + 5] = Hb, l[Hb + 24 >> 2] = Za);
              }
            } while (0);
            if (16 > ga >>> 0) {
              var tb = ga + G | 0;
              l[B + 1] = tb | 3;
              var xb = tb + (Ga + 4) | 0;
              l[xb >> 2] |= 1;
            } else {
              l[B + 1] = G | 3;
              l[Ga + (G | 4) >> 2] = ga | 1;
              l[Ga + ga + G >> 2] = ga;
              var Ib = o[X + 8 >> 2];
              if (0 != (Ib | 0)) {
                var Jb = o[X + 20 >> 2], Lb = Ib >>> 2 & 1073741822, Xb = (Lb << 2) + X + 40 | 0, Nb = o[X >> 2], Sb = 1 << (Ib >>> 3);
                if (0 == (Nb & Sb | 0)) {
                  l[X >> 2] = Nb | Sb;
                  var Ob = Xb, Vb = (Lb + 2 << 2) + X + 40 | 0;
                } else {
                  var Zb = (Lb + 2 << 2) + X + 40 | 0, dc = o[Zb >> 2];
                  dc >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                  Ob = dc;
                  Vb = Zb;
                }
                l[Vb >> 2] = Jb;
                l[Ob + 12 >> 2] = Jb;
                l[Jb + 8 >> 2] = Ob;
                l[Jb + 12 >> 2] = Xb;
              }
              l[X + 8 >> 2] = ga;
              l[X + 20 >> 2] = ob;
            }
            var fc = Ja + 8 | 0;
            if (0 == (fc | 0)) {
              W = G;
              y = W >> 2;
              z = 156;
              break a;
            }
            aa = fc;
            z = 334;
            break a;
          }
        }
      } while (0);
    } else {
      if (4294967231 < b >>> 0) {
        W = -1;
        y = W >> 2;
        z = 156;
        break;
      }
      var kc = b + 11 | 0, Fb = kc & -8;
      A = Fb >> 2;
      var Wb = o[X + 4 >> 2];
      if (0 == (Wb | 0)) {
        W = Fb;
        y = W >> 2;
        z = 156;
        break;
      }
      var vc = -Fb | 0, $b = kc >>> 8;
      if (0 == ($b | 0)) {
        var Yb = 0;
      } else {
        if (16777215 < Fb >>> 0) {
          Yb = 31;
        } else {
          var wc = ($b + 1048320 | 0) >>> 16 & 8, xc = $b << wc, Hc = (xc + 520192 | 0) >>> 16 & 4, Bd = xc << Hc, rc = (Bd + 245760 | 0) >>> 16 & 2, Rc = 14 - (Hc | wc | rc) + (Bd << rc >>> 15) | 0, Yb = Fb >>> ((Rc + 7 | 0) >>> 0) & 1 | Rc << 1;
        }
      }
      var Ic = o[X + (Yb << 2) + 304 >> 2], ad = 0 == (Ic | 0);
      b : do {
        if (ad) {
          var pc = 0, Pb = vc, Rb = 0;
        } else {
          var bd = 31 == (Yb | 0) ? 0 : 25 - (Yb >>> 1) | 0, sc = 0, mc = vc, yc = Ic;
          v = yc >> 2;
          for (var tc = Fb << bd, Jc = 0; ; ) {
            var uc = l[v + 1] & -8, ec = uc - Fb | 0;
            if (ec >>> 0 < mc >>> 0) {
              if ((uc | 0) == (Fb | 0)) {
                pc = yc;
                Pb = ec;
                Rb = yc;
                break b;
              }
              var Oc = yc, Sc = ec;
            } else {
              Oc = sc, Sc = mc;
            }
            var lc = o[v + 5], Kc = o[((tc >>> 31 << 2) + 16 >> 2) + v], rd = 0 == (lc | 0) | (lc | 0) == (Kc | 0) ? Jc : lc;
            if (0 == (Kc | 0)) {
              pc = Oc;
              Pb = Sc;
              Rb = rd;
              break b;
            }
            sc = Oc;
            mc = Sc;
            yc = Kc;
            v = yc >> 2;
            tc <<= 1;
            Jc = rd;
          }
        }
      } while (0);
      if (0 == (Rb | 0) & 0 == (pc | 0)) {
        var Cd = 2 << Yb, kd = Wb & (Cd | -Cd);
        if (0 == (kd | 0)) {
          var sd = Rb;
        } else {
          var Md = (kd & -kd) - 1 | 0, Nd = Md >>> 12 & 16, Vc = Md >>> (Nd >>> 0), Fc = Vc >>> 5 & 8, nc = Vc >>> (Fc >>> 0), jc = nc >>> 2 & 4, gc = nc >>> (jc >>> 0), Od = gc >>> 1 & 2, Ae = gc >>> (Od >>> 0), cd = Ae >>> 1 & 1, sd = l[X + ((Fc | Nd | jc | Od | cd) + (Ae >>> (cd >>> 0)) << 2) + 304 >> 2];
        }
      } else {
        sd = Rb;
      }
      var dd = 0 == (sd | 0);
      b : do {
        if (dd) {
          var Bc = Pb, qc = pc;
          u = qc >> 2;
        } else {
          var zc = sd;
          t = zc >> 2;
          for (var td = Pb, Cc = pc; ; ) {
            var gf = (l[t + 1] & -8) - Fb | 0, Wc = gf >>> 0 < td >>> 0, ld = Wc ? gf : td, Pd = Wc ? zc : Cc, be = o[t + 4];
            if (0 != (be | 0)) {
              zc = be;
            } else {
              var Qd = o[t + 5];
              if (0 == (Qd | 0)) {
                Bc = ld;
                qc = Pd;
                u = qc >> 2;
                break b;
              }
              zc = Qd;
            }
            t = zc >> 2;
            td = ld;
            Cc = Pd;
          }
        }
      } while (0);
      if (0 == (qc | 0)) {
        W = Fb;
        y = W >> 2;
        z = 156;
        break;
      }
      if (Bc >>> 0 >= (l[X + 8 >> 2] - Fb | 0) >>> 0) {
        W = Fb;
        y = W >> 2;
        z = 156;
        break;
      }
      var Hd = qc;
      r = Hd >> 2;
      var ed = o[X + 16 >> 2], Be = Hd >>> 0 < ed >>> 0;
      do {
        if (!Be) {
          var md = Hd + Fb | 0, Pc = md;
          if (Hd >>> 0 < md >>> 0) {
            var je = o[u + 6], ce = o[u + 3], ke = (ce | 0) == (qc | 0);
            do {
              if (ke) {
                var Cf = qc + 20 | 0, le = l[Cf >> 2];
                if (0 == (le | 0)) {
                  var hf = qc + 16 | 0, Id = l[hf >> 2];
                  if (0 == (Id | 0)) {
                    var Qc = 0;
                    q = Qc >> 2;
                    break;
                  }
                  var me = hf, Rd = Id;
                } else {
                  me = Cf, Rd = le, z = 103;
                }
                for (;;) {
                  var ve = Rd + 20 | 0, we = l[ve >> 2];
                  if (0 != (we | 0)) {
                    me = ve, Rd = we;
                  } else {
                    var Pe = Rd + 16 | 0, Ce = o[Pe >> 2];
                    if (0 == (Ce | 0)) {
                      break;
                    }
                    me = Pe;
                    Rd = Ce;
                  }
                }
                me >>> 0 < ed >>> 0 && (mM(), ea("Reached an unreachable!"));
                l[me >> 2] = 0;
                Qc = Rd;
              } else {
                var Tc = o[u + 2];
                Tc >>> 0 < ed >>> 0 && (mM(), ea("Reached an unreachable!"));
                l[Tc + 12 >> 2] = ce;
                l[ce + 8 >> 2] = Tc;
                Qc = ce;
              }
              q = Qc >> 2;
            } while (0);
            var hc = 0 == (je | 0);
            b : do {
              if (!hc) {
                var ud = qc + 28 | 0, Sd = (l[ud >> 2] << 2) + X + 304 | 0, Df = (qc | 0) == (l[Sd >> 2] | 0);
                do {
                  if (Df) {
                    l[Sd >> 2] = Qc;
                    if (0 != (Qc | 0)) {
                      break;
                    }
                    l[X + 4 >> 2] &= 1 << l[ud >> 2] ^ -1;
                    break b;
                  }
                  je >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                  var Qe = je + 16 | 0;
                  (l[Qe >> 2] | 0) == (qc | 0) ? l[Qe >> 2] = Qc : l[je + 20 >> 2] = Qc;
                  if (0 == (Qc | 0)) {
                    break b;
                  }
                } while (0);
                Qc >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                l[q + 6] = je;
                var Dd = o[u + 4];
                0 != (Dd | 0) && (Dd >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[q + 4] = Dd, l[Dd + 24 >> 2] = Qc);
                var Jd = o[u + 5];
                0 != (Jd | 0) && (Jd >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[q + 5] = Jd, l[Jd + 24 >> 2] = Qc);
              }
            } while (0);
            var jf = 16 > Bc >>> 0;
            b : do {
              if (jf) {
                var kf = Bc + Fb | 0;
                l[u + 1] = kf | 3;
                var Xc = kf + (Hd + 4) | 0;
                l[Xc >> 2] |= 1;
              } else {
                if (l[u + 1] = Fb | 3, l[((Fb | 4) >> 2) + r] = Bc | 1, l[(Bc >> 2) + r + A] = Bc, 256 > Bc >>> 0) {
                  var xe = Bc >>> 2 & 1073741822, vd = (xe << 2) + X + 40 | 0, Td = o[X >> 2], Ef = 1 << (Bc >>> 3);
                  if (0 == (Td & Ef | 0)) {
                    l[X >> 2] = Td | Ef;
                    var Lc = vd, ne = (xe + 2 << 2) + X + 40 | 0;
                  } else {
                    var Yc = (xe + 2 << 2) + X + 40 | 0, De = o[Yc >> 2];
                    De >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                    Lc = De;
                    ne = Yc;
                  }
                  l[ne >> 2] = Pc;
                  l[Lc + 12 >> 2] = Pc;
                  l[A + (r + 2)] = Lc;
                  l[A + (r + 3)] = vd;
                } else {
                  var de = md, Ee = Bc >>> 8;
                  if (0 == (Ee | 0)) {
                    var Zc = 0;
                  } else {
                    if (16777215 < Bc >>> 0) {
                      Zc = 31;
                    } else {
                      var cg = (Ee + 1048320 | 0) >>> 16 & 8, oe = Ee << cg, Fe = (oe + 520192 | 0) >>> 16 & 4, wd = oe << Fe, pe = (wd + 245760 | 0) >>> 16 & 2, Ag = 14 - (Fe | cg | pe) + (wd << pe >>> 15) | 0, Zc = Bc >>> ((Ag + 7 | 0) >>> 0) & 1 | Ag << 1;
                    }
                  }
                  var Re = (Zc << 2) + X + 304 | 0;
                  l[A + (r + 7)] = Zc;
                  var lf = Fb + (Hd + 16) | 0;
                  l[A + (r + 5)] = 0;
                  l[lf >> 2] = 0;
                  var dg = l[X + 4 >> 2], Bg = 1 << Zc;
                  if (0 == (dg & Bg | 0)) {
                    l[X + 4 >> 2] = dg | Bg, l[Re >> 2] = de, l[A + (r + 6)] = Re, l[A + (r + 3)] = de, l[A + (r + 2)] = de;
                  } else {
                    for (var Ge = Bc << (31 == (Zc | 0) ? 0 : 25 - (Zc >>> 1) | 0), He = l[Re >> 2]; ; ) {
                      if ((l[He + 4 >> 2] & -8 | 0) == (Bc | 0)) {
                        var eg = He + 8 | 0, Se = o[eg >> 2], fg = o[X + 16 >> 2], yi = He >>> 0 < fg >>> 0;
                        do {
                          if (!yi && Se >>> 0 >= fg >>> 0) {
                            l[Se + 12 >> 2] = de;
                            l[eg >> 2] = de;
                            l[A + (r + 2)] = Se;
                            l[A + (r + 3)] = He;
                            l[A + (r + 6)] = 0;
                            break b;
                          }
                        } while (0);
                        mM();
                        ea("Reached an unreachable!");
                      }
                      var $g = (Ge >>> 31 << 2) + He + 16 | 0, zi = o[$g >> 2];
                      if (0 == (zi | 0)) {
                        if ($g >>> 0 >= o[X + 16 >> 2] >>> 0) {
                          l[$g >> 2] = de;
                          l[A + (r + 6)] = He;
                          l[A + (r + 3)] = de;
                          l[A + (r + 2)] = de;
                          break b;
                        }
                        mM();
                        ea("Reached an unreachable!");
                      }
                      Ge <<= 1;
                      He = zi;
                    }
                  }
                }
              }
            } while (0);
            var Mh = qc + 8 | 0;
            if (0 == (Mh | 0)) {
              W = Fb;
              y = W >> 2;
              z = 156;
              break a;
            }
            aa = Mh;
            z = 334;
            break a;
          }
        }
      } while (0);
    }
    mM();
    ea("Reached an unreachable!");
  } while (0);
  a : do {
    if (156 == z) {
      var mf = o[X + 8 >> 2];
      if (W >>> 0 > mf >>> 0) {
        var ah = o[X + 12 >> 2];
        if (W >>> 0 < ah >>> 0) {
          var gg = ah - W | 0;
          l[X + 12 >> 2] = gg;
          var Ff = o[X + 24 >> 2], hg = Ff;
          l[X + 24 >> 2] = hg + W | 0;
          l[(hg + 4 >> 2) + y] = gg | 1;
          l[Ff + 4 >> 2] = W | 3;
          aa = Ff + 8 | 0;
        } else {
          if (0 == (l[nM >> 2] | 0) && 0 == (l[nM >> 2] | 0)) {
            var Gf = oM();
            0 == (Gf - 1 & Gf | 0) ? (l[nM + 8 >> 2] = Gf, l[nM + 4 >> 2] = Gf, l[nM + 12 >> 2] = -1, l[nM + 16 >> 2] = 2097152, l[nM + 20 >> 2] = 0, l[X + 440 >> 2] = 0, l[nM >> 2] = Math.floor(Date.now() / 1e3) & -16 ^ 1431655768) : (mM(), ea("Reached an unreachable!"));
          }
          var Te = 0 == (l[X + 440 >> 2] & 4 | 0);
          do {
            if (Te) {
              var Nh = l[X + 24 >> 2], Oh = 0 == (Nh | 0);
              b : do {
                if (Oh) {
                  z = 175;
                } else {
                  for (var bh = Nh, nf = X + 444 | 0; ; ) {
                    var Ph = nf | 0, Qh = o[Ph >> 2];
                    if (Qh >>> 0 <= bh >>> 0) {
                      var ch = nf + 4 | 0;
                      if ((Qh + l[ch >> 2] | 0) >>> 0 > bh >>> 0) {
                        break;
                      }
                    }
                    var dh = o[nf + 8 >> 2];
                    if (0 == (dh | 0)) {
                      z = 175;
                      break b;
                    }
                    nf = dh;
                  }
                  if (0 == (nf | 0)) {
                    z = 175;
                  } else {
                    var Cg = l[nM + 8 >> 2], of = W + 47 - l[X + 12 >> 2] + Cg & -Cg;
                    if (2147483647 > of >>> 0) {
                      var ig = pM(of);
                      if ((ig | 0) == (l[Ph >> 2] + l[ch >> 2] | 0)) {
                        var Dg = ig, Eg = of, Fg = ig;
                        z = 182;
                      } else {
                        var xd = ig, ee = of;
                        z = 184;
                      }
                    } else {
                      z = 183;
                    }
                  }
                }
              } while (0);
              if (175 == z) {
                var nd = pM(0);
                if (-1 == (nd | 0)) {
                  z = 183;
                } else {
                  var Hf = l[nM + 8 >> 2], Ud = Hf + (W + 47) & -Hf, Ed = nd, jg = l[nM + 4 >> 2], Ai = jg - 1 | 0, kg = 0 == (Ai & Ed | 0) ? Ud : Ud - Ed + (Ai + Ed & -jg) | 0;
                  if (2147483647 > kg >>> 0) {
                    var If = pM(kg);
                    (If | 0) == (nd | 0) ? (Dg = nd, Eg = kg, Fg = If, z = 182) : (xd = If, ee = kg, z = 184);
                  } else {
                    z = 183;
                  }
                }
              }
              if (183 == z) {
                l[X + 440 >> 2] |= 4, z = 192;
              } else {
                if (182 == z) {
                  if (-1 != (Dg | 0)) {
                    var Vd = Eg, Mc = Dg;
                    n = Mc >> 2;
                    z = 195;
                    break;
                  }
                  xd = Fg;
                  ee = Eg;
                }
                var eh = -ee | 0;
                if (-1 != (xd | 0) & 2147483647 > ee >>> 0) {
                  if (ee >>> 0 < (W + 48 | 0) >>> 0) {
                    var Bi = l[nM + 8 >> 2], Rh = W + 47 - ee + Bi & -Bi;
                    2147483647 > Rh >>> 0 ? -1 == (pM(Rh) | 0) ? (pM(eh), z = 191) : (pf = Rh + ee | 0, z = 190) : (pf = ee, z = 190);
                  } else {
                    var pf = ee;
                    z = 190;
                  }
                } else {
                  pf = ee, z = 190;
                }
                190 == z && -1 != (xd | 0) ? (Vd = pf, Mc = xd, n = Mc >> 2, z = 195) : (l[X + 440 >> 2] |= 4, z = 192);
              }
            } else {
              z = 192;
            }
          } while (0);
          if (192 == z) {
            var Jf = l[nM + 8 >> 2], fh = Jf + (W + 47) & -Jf;
            if (2147483647 > fh >>> 0) {
              var Kf = pM(fh), gh = pM(0);
              if (-1 != (gh | 0) & -1 != (Kf | 0) & Kf >>> 0 < gh >>> 0) {
                var hh = gh - Kf | 0;
                hh >>> 0 <= (W + 40 | 0) >>> 0 | -1 == (Kf | 0) ? z = 333 : (Vd = hh, Mc = Kf, n = Mc >> 2, z = 195);
              } else {
                z = 333;
              }
            } else {
              z = 333;
            }
          }
          do {
            if (195 == z) {
              var Gg = l[X + 432 >> 2] + Vd | 0;
              l[X + 432 >> 2] = Gg;
              Gg >>> 0 > o[X + 436 >> 2] >>> 0 && (l[X + 436 >> 2] = Gg);
              var fd = o[X + 24 >> 2];
              m = fd >> 2;
              var Sh = 0 == (fd | 0);
              b : do {
                if (Sh) {
                  var Th = o[X + 16 >> 2];
                  0 == (Th | 0) | Mc >>> 0 < Th >>> 0 && (l[X + 16 >> 2] = Mc);
                  l[X + 444 >> 2] = Mc;
                  l[X + 448 >> 2] = Vd;
                  l[X + 456 >> 2] = 0;
                  l[X + 36 >> 2] = l[nM >> 2];
                  l[X + 32 >> 2] = -1;
                  for (var ih = 0; ; ) {
                    var qf = ih << 1, Uh = (qf << 2) + X + 40 | 0;
                    l[X + (qf + 3 << 2) + 40 >> 2] = Uh;
                    l[X + (qf + 2 << 2) + 40 >> 2] = Uh;
                    var Vh = ih + 1 | 0;
                    if (32 == (Vh | 0)) {
                      break;
                    }
                    ih = Vh;
                  }
                  var Ci = Mc + 8 | 0, ye = 0 == (Ci & 7 | 0) ? 0 : -Ci & 7, rf = Vd - 40 - ye | 0;
                  l[X + 24 >> 2] = Mc + ye | 0;
                  l[X + 12 >> 2] = rf;
                  l[(ye + 4 >> 2) + n] = rf | 1;
                  l[(Vd - 36 >> 2) + n] = 40;
                  l[X + 28 >> 2] = l[nM + 16 >> 2];
                } else {
                  var Ie = X + 444 | 0;
                  for (k = Ie >> 2; 0 != (Ie | 0); ) {
                    var Di = o[k], Hg = Ie + 4 | 0, Wh = o[Hg >> 2], Je = Di + Wh | 0;
                    if ((Mc | 0) == (Je | 0)) {
                      if (0 != (l[k + 3] & 8 | 0)) {
                        break;
                      }
                      var Lf = fd;
                      if (!(Lf >>> 0 >= Di >>> 0 & Lf >>> 0 < Je >>> 0)) {
                        break;
                      }
                      l[Hg >> 2] = Wh + Vd | 0;
                      var gd = l[X + 24 >> 2], Mf = l[X + 12 >> 2] + Vd | 0, jh = gd, kh = gd + 8 | 0, lh = 0 == (kh & 7 | 0) ? 0 : -kh & 7, mh = Mf - lh | 0;
                      l[X + 24 >> 2] = jh + lh | 0;
                      l[X + 12 >> 2] = mh;
                      l[(lh + (jh + 4) | 0) >> 2] = mh | 1;
                      l[(Mf + (jh + 4) | 0) >> 2] = 40;
                      l[X + 28 >> 2] = l[nM + 16 >> 2];
                      break b;
                    }
                    Ie = l[k + 2];
                    k = Ie >> 2;
                  }
                  Mc >>> 0 < o[X + 16 >> 2] >>> 0 && (l[X + 16 >> 2] = Mc);
                  for (var Ei = Mc + Vd | 0, Nf = X + 444 | 0; ; ) {
                    if (0 == (Nf | 0)) {
                      z = 295;
                      break;
                    }
                    var nh = Nf | 0, Ke = o[nh >> 2];
                    i = Ke >> 2;
                    if ((Ke | 0) == (Ei | 0)) {
                      z = 219;
                      break;
                    }
                    Nf = l[Nf + 8 >> 2];
                  }
                  do {
                    if (219 == z && 0 == (l[Nf + 12 >> 2] & 8 | 0)) {
                      l[nh >> 2] = Mc;
                      var Ig = Nf + 4 | 0;
                      l[Ig >> 2] = l[Ig >> 2] + Vd | 0;
                      var Fi = Mc + 8 | 0, lg = 0 == (Fi & 7 | 0) ? 0 : -Fi & 7, oh = Ke + 8 | 0, Ue = 0 == (oh & 7 | 0) ? 0 : -oh & 7;
                      h = Ue >> 2;
                      var Xh = Ke + Ue | 0, ph = Xh, qh = lg + W | 0;
                      g = qh >> 2;
                      var Yh = Mc + qh | 0, Of = Yh, rh = Xh - (Mc + lg) - W | 0;
                      l[(lg + 4 >> 2) + n] = W | 3;
                      var Zh = (ph | 0) == (l[X + 24 >> 2] | 0);
                      c : do {
                        if (Zh) {
                          var rj = l[X + 12 >> 2] + rh | 0;
                          l[X + 12 >> 2] = rj;
                          l[X + 24 >> 2] = Of;
                          l[g + (n + 1)] = rj | 1;
                        } else {
                          if ((ph | 0) == (l[X + 20 >> 2] | 0)) {
                            var sh = l[X + 8 >> 2] + rh | 0;
                            l[X + 8 >> 2] = sh;
                            l[X + 20 >> 2] = Of;
                            l[g + (n + 1)] = sh | 1;
                            l[(Mc + sh + qh | 0) >> 2] = sh;
                          } else {
                            var sf = o[h + (i + 1)];
                            if (1 == (sf & 3 | 0)) {
                              var $h = sf & -8, Gi = sf >>> 3, mg = 256 > sf >>> 0;
                              d : do {
                                if (mg) {
                                  var od = o[((Ue | 8) >> 2) + i], Wd = o[h + (i + 3)];
                                  if ((od | 0) == (Wd | 0)) {
                                    l[X >> 2] &= 1 << Gi ^ -1;
                                  } else {
                                    var tf = ((sf >>> 2 & 1073741822) << 2) + X + 40 | 0;
                                    z = (od | 0) == (tf | 0) ? 234 : od >>> 0 < o[X + 16 >> 2] >>> 0 ? 237 : 234;
                                    do {
                                      if (234 == z && !((Wd | 0) != (tf | 0) && Wd >>> 0 < o[X + 16 >> 2] >>> 0)) {
                                        l[od + 12 >> 2] = Wd;
                                        l[Wd + 8 >> 2] = od;
                                        break d;
                                      }
                                    } while (0);
                                    mM();
                                    ea("Reached an unreachable!");
                                  }
                                } else {
                                  var ng = Xh, Ve = o[((Ue | 24) >> 2) + i], og = o[h + (i + 3)], pg = (og | 0) == (ng | 0);
                                  do {
                                    if (pg) {
                                      var sj = Ue | 16, Le = sj + (Ke + 4) | 0, Hi = l[Le >> 2];
                                      if (0 == (Hi | 0)) {
                                        var ai = Ke + sj | 0, th = l[ai >> 2];
                                        if (0 == (th | 0)) {
                                          var Xd = 0;
                                          f = Xd >> 2;
                                          break;
                                        }
                                        var qg = ai, We = th;
                                      } else {
                                        qg = Le, We = Hi, z = 244;
                                      }
                                      for (;;) {
                                        var Jg = We + 20 | 0, Pf = l[Jg >> 2];
                                        if (0 != (Pf | 0)) {
                                          qg = Jg, We = Pf;
                                        } else {
                                          var Yd = We + 16 | 0, Kg = o[Yd >> 2];
                                          if (0 == (Kg | 0)) {
                                            break;
                                          }
                                          qg = Yd;
                                          We = Kg;
                                        }
                                      }
                                      qg >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                                      l[qg >> 2] = 0;
                                      Xd = We;
                                    } else {
                                      var Xe = o[((Ue | 8) >> 2) + i];
                                      Xe >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                                      l[Xe + 12 >> 2] = og;
                                      l[og + 8 >> 2] = Xe;
                                      Xd = og;
                                    }
                                    f = Xd >> 2;
                                  } while (0);
                                  if (0 != (Ve | 0)) {
                                    var bi = Ue + (Ke + 28) | 0, rg = (l[bi >> 2] << 2) + X + 304 | 0, Lg = (ng | 0) == (l[rg >> 2] | 0);
                                    do {
                                      if (Lg) {
                                        l[rg >> 2] = Xd;
                                        if (0 != (Xd | 0)) {
                                          break;
                                        }
                                        l[X + 4 >> 2] &= 1 << l[bi >> 2] ^ -1;
                                        break d;
                                      }
                                      Ve >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                                      var uh = Ve + 16 | 0;
                                      (l[uh >> 2] | 0) == (ng | 0) ? l[uh >> 2] = Xd : l[Ve + 20 >> 2] = Xd;
                                      if (0 == (Xd | 0)) {
                                        break d;
                                      }
                                    } while (0);
                                    Xd >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                                    l[f + 6] = Ve;
                                    var Ii = Ue | 16, Mg = o[(Ii >> 2) + i];
                                    0 != (Mg | 0) && (Mg >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[f + 4] = Mg, l[Mg + 24 >> 2] = Xd);
                                    var Ng = o[(Ii + 4 >> 2) + i];
                                    0 != (Ng | 0) && (Ng >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[f + 5] = Ng, l[Ng + 24 >> 2] = Xd);
                                  }
                                }
                              } while (0);
                              var vh = Ke + ($h | Ue) | 0, qe = $h + rh | 0;
                            } else {
                              vh = ph, qe = rh;
                            }
                            var ci = vh + 4 | 0;
                            l[ci >> 2] &= -2;
                            l[g + (n + 1)] = qe | 1;
                            l[(qe >> 2) + n + g] = qe;
                            if (256 > qe >>> 0) {
                              var wh = qe >>> 2 & 1073741822, tj = (wh << 2) + X + 40 | 0, Dk = o[X >> 2], uj = 1 << (qe >>> 3);
                              if (0 == (Dk & uj | 0)) {
                                l[X >> 2] = Dk | uj;
                                var vj = tj, wj = (wh + 2 << 2) + X + 40 | 0;
                              } else {
                                var di = (wh + 2 << 2) + X + 40 | 0, Ek = o[di >> 2];
                                Ek >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                                vj = Ek;
                                wj = di;
                              }
                              l[wj >> 2] = Of;
                              l[vj + 12 >> 2] = Of;
                              l[g + (n + 2)] = vj;
                              l[g + (n + 3)] = tj;
                            } else {
                              var sg = Yh, Ji = qe >>> 8;
                              if (0 == (Ji | 0)) {
                                var Qf = 0;
                              } else {
                                if (16777215 < qe >>> 0) {
                                  Qf = 31;
                                } else {
                                  var Fk = (Ji + 1048320 | 0) >>> 16 & 8, Ki = Ji << Fk, Ql = (Ki + 520192 | 0) >>> 16 & 4, xj = Ki << Ql, yj = (xj + 245760 | 0) >>> 16 & 2, zj = 14 - (Ql | Fk | yj) + (xj << yj >>> 15) | 0, Qf = qe >>> ((zj + 7 | 0) >>> 0) & 1 | zj << 1;
                                }
                              }
                              var Aj = (Qf << 2) + X + 304 | 0;
                              l[g + (n + 7)] = Qf;
                              l[g + (n + 5)] = 0;
                              l[g + (n + 4)] = 0;
                              var ei = l[X + 4 >> 2], xh = 1 << Qf;
                              if (0 == (ei & xh | 0)) {
                                l[X + 4 >> 2] = ei | xh, l[Aj >> 2] = sg, l[g + (n + 6)] = Aj, l[g + (n + 3)] = sg, l[g + (n + 2)] = sg;
                              } else {
                                for (var yh = qe << (31 == (Qf | 0) ? 0 : 25 - (Qf >>> 1) | 0), Rf = l[Aj >> 2]; ; ) {
                                  if ((l[Rf + 4 >> 2] & -8 | 0) == (qe | 0)) {
                                    var Li = Rf + 8 | 0, zh = o[Li >> 2], Bj = o[X + 16 >> 2], Gk = Rf >>> 0 < Bj >>> 0;
                                    do {
                                      if (!Gk && zh >>> 0 >= Bj >>> 0) {
                                        l[zh + 12 >> 2] = sg;
                                        l[Li >> 2] = sg;
                                        l[g + (n + 2)] = zh;
                                        l[g + (n + 3)] = Rf;
                                        l[g + (n + 6)] = 0;
                                        break c;
                                      }
                                    } while (0);
                                    mM();
                                    ea("Reached an unreachable!");
                                  }
                                  var Ah = (yh >>> 31 << 2) + Rf + 16 | 0, fi = o[Ah >> 2];
                                  if (0 == (fi | 0)) {
                                    if (Ah >>> 0 >= o[X + 16 >> 2] >>> 0) {
                                      l[Ah >> 2] = sg;
                                      l[g + (n + 6)] = Rf;
                                      l[g + (n + 3)] = sg;
                                      l[g + (n + 2)] = sg;
                                      break c;
                                    }
                                    mM();
                                    ea("Reached an unreachable!");
                                  }
                                  yh <<= 1;
                                  Rf = fi;
                                }
                              }
                            }
                          }
                        }
                      } while (0);
                      aa = Mc + (lg | 8) | 0;
                      break a;
                    }
                  } while (0);
                  var tg = fd, gi = X + 444 | 0;
                  for (e = gi >> 2; ; ) {
                    var Hk = o[e];
                    if (Hk >>> 0 <= tg >>> 0) {
                      var Rl = o[e + 1];
                      if ((Hk + Rl | 0) >>> 0 > tg >>> 0) {
                        var Cj = Hk, Mi = Rl;
                        break;
                      }
                    }
                    var Sl = o[e + 2];
                    if (0 != (Sl | 0)) {
                      gi = Sl, e = gi >> 2;
                    } else {
                      Cj = 0;
                      Mi = 4;
                      break;
                    }
                  }
                  var Tl = Cj + Mi | 0, Ik = Cj + (Mi - 39) | 0, Ni = Cj + (Mi - 47) + (0 == (Ik & 7 | 0) ? 0 : -Ik & 7) | 0, Og = Ni >>> 0 < (fd + 16 | 0) >>> 0 ? tg : Ni, Ul = Og + 8 | 0;
                  d = Ul >> 2;
                  var Jk = Ul, Dj = Mc + 8 | 0, hi = 0 == (Dj & 7 | 0) ? 0 : -Dj & 7, Ej = Vd - 40 - hi | 0;
                  l[X + 24 >> 2] = Mc + hi | 0;
                  l[X + 12 >> 2] = Ej;
                  l[(hi + 4 >> 2) + n] = Ej | 1;
                  l[(Vd - 36 >> 2) + n] = 40;
                  l[X + 28 >> 2] = l[nM + 16 >> 2];
                  l[Og + 4 >> 2] = 27;
                  l[d] = l[X + 444 >> 2];
                  l[d + 1] = l[X + 448 >> 2];
                  l[d + 2] = l[X + 452 >> 2];
                  l[d + 3] = l[X + 456 >> 2];
                  l[X + 444 >> 2] = Mc;
                  l[X + 448 >> 2] = Vd;
                  l[X + 456 >> 2] = 0;
                  l[X + 452 >> 2] = Jk;
                  var Kk = Og + 28 | 0;
                  l[Kk >> 2] = 7;
                  var Vl = (Og + 32 | 0) >>> 0 < Tl >>> 0;
                  c : do {
                    if (Vl) {
                      for (var Fj = Kk; ; ) {
                        var Gj = Fj + 4 | 0;
                        l[Gj >> 2] = 7;
                        if ((Fj + 8 | 0) >>> 0 >= Tl >>> 0) {
                          break c;
                        }
                        Fj = Gj;
                      }
                    }
                  } while (0);
                  if ((Og | 0) != (tg | 0)) {
                    var Me = Og - fd | 0, Wl = tg + Me | 0, Hj = Me + (tg + 4) | 0;
                    l[Hj >> 2] &= -2;
                    l[m + 1] = Me | 1;
                    l[Wl >> 2] = Me;
                    if (256 > Me >>> 0) {
                      var Oi = Me >>> 2 & 1073741822, Ij = (Oi << 2) + X + 40 | 0, Jj = o[X >> 2], Pi = 1 << (Me >>> 3);
                      if (0 == (Jj & Pi | 0)) {
                        l[X >> 2] = Jj | Pi;
                        var ii = Ij, Kj = (Oi + 2 << 2) + X + 40 | 0;
                      } else {
                        var Lj = (Oi + 2 << 2) + X + 40 | 0, Mj = o[Lj >> 2];
                        Mj >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                        ii = Mj;
                        Kj = Lj;
                      }
                      l[Kj >> 2] = fd;
                      l[ii + 12 >> 2] = fd;
                      l[m + 2] = ii;
                      l[m + 3] = Ij;
                    } else {
                      var ji = fd, Qi = Me >>> 8;
                      if (0 == (Qi | 0)) {
                        var Pg = 0;
                      } else {
                        if (16777215 < Me >>> 0) {
                          Pg = 31;
                        } else {
                          var Lk = (Qi + 1048320 | 0) >>> 16 & 8, Sf = Qi << Lk, Nj = (Sf + 520192 | 0) >>> 16 & 4, Oj = Sf << Nj, Pj = (Oj + 245760 | 0) >>> 16 & 2, Qj = 14 - (Nj | Lk | Pj) + (Oj << Pj >>> 15) | 0, Pg = Me >>> ((Qj + 7 | 0) >>> 0) & 1 | Qj << 1;
                        }
                      }
                      var Rj = (Pg << 2) + X + 304 | 0;
                      l[m + 7] = Pg;
                      l[m + 5] = 0;
                      l[m + 4] = 0;
                      var Ri = l[X + 4 >> 2], Mk = 1 << Pg;
                      if (0 == (Ri & Mk | 0)) {
                        l[X + 4 >> 2] = Ri | Mk, l[Rj >> 2] = ji, l[m + 6] = Rj, l[m + 3] = fd, l[m + 2] = fd;
                      } else {
                        for (var Sj = Me << (31 == (Pg | 0) ? 0 : 25 - (Pg >>> 1) | 0), Qg = l[Rj >> 2]; ; ) {
                          if ((l[Qg + 4 >> 2] & -8 | 0) == (Me | 0)) {
                            var Nk = Qg + 8 | 0, Si = o[Nk >> 2], Ok = o[X + 16 >> 2], dn = Qg >>> 0 < Ok >>> 0;
                            do {
                              if (!dn && Si >>> 0 >= Ok >>> 0) {
                                l[Si + 12 >> 2] = ji;
                                l[Nk >> 2] = ji;
                                l[m + 2] = Si;
                                l[m + 3] = Qg;
                                l[m + 6] = 0;
                                break b;
                              }
                            } while (0);
                            mM();
                            ea("Reached an unreachable!");
                          }
                          var Ti = (Sj >>> 31 << 2) + Qg + 16 | 0, Pk = o[Ti >> 2];
                          if (0 == (Pk | 0)) {
                            if (Ti >>> 0 >= o[X + 16 >> 2] >>> 0) {
                              l[Ti >> 2] = ji;
                              l[m + 6] = Qg;
                              l[m + 3] = fd;
                              l[m + 2] = fd;
                              break b;
                            }
                            mM();
                            ea("Reached an unreachable!");
                          }
                          Sj <<= 1;
                          Qg = Pk;
                        }
                      }
                    }
                  }
                }
              } while (0);
              var Ui = o[X + 12 >> 2];
              if (Ui >>> 0 > W >>> 0) {
                var Vi = Ui - W | 0;
                l[X + 12 >> 2] = Vi;
                var Wi = o[X + 24 >> 2], Xl = Wi;
                l[X + 24 >> 2] = Xl + W | 0;
                l[(Xl + 4 >> 2) + y] = Vi | 1;
                l[Wi + 4 >> 2] = W | 3;
                aa = Wi + 8 | 0;
                break a;
              }
            }
          } while (0);
          l[qM >> 2] = 12;
          aa = 0;
        }
      } else {
        var Xi = mf - W | 0, Yi = o[X + 20 >> 2];
        if (15 < Xi >>> 0) {
          var Qk = Yi;
          l[X + 20 >> 2] = Qk + W | 0;
          l[X + 8 >> 2] = Xi;
          l[(Qk + 4 >> 2) + y] = Xi | 1;
          l[Qk + mf >> 2] = Xi;
          l[Yi + 4 >> 2] = W | 3;
        } else {
          l[X + 8 >> 2] = 0;
          l[X + 20 >> 2] = 0;
          l[Yi + 4 >> 2] = mf | 3;
          var Rg = mf + (Yi + 4) | 0;
          l[Rg >> 2] |= 1;
        }
        aa = Yi + 8 | 0;
      }
    }
  } while (0);
  return aa;
}

function Fh(b) {
  var d, e, f, g, h, i, k = b >> 2, m, n = 0 == (b | 0);
  a : do {
    if (!n) {
      var q = b - 8 | 0, r = q, t = o[X + 16 >> 2], u = q >>> 0 < t >>> 0;
      b : do {
        if (!u) {
          var v = o[b - 4 >> 2], A = v & 3;
          if (1 != (A | 0)) {
            var C = v & -8;
            i = C >> 2;
            var B = b + (C - 8) | 0, y = B, z = 0 == (v & 1 | 0);
            c : do {
              if (z) {
                var F = o[q >> 2];
                if (0 == (A | 0)) {
                  break a;
                }
                var G = -8 - F | 0;
                h = G >> 2;
                var H = b + G | 0, E = H, I = F + C | 0;
                if (H >>> 0 < t >>> 0) {
                  break b;
                }
                if ((E | 0) == (l[X + 20 >> 2] | 0)) {
                  g = (b + (C - 4) | 0) >> 2;
                  if (3 != (l[g] & 3 | 0)) {
                    var J = E;
                    f = J >> 2;
                    var L = I;
                    break;
                  }
                  l[X + 8 >> 2] = I;
                  l[g] &= -2;
                  l[h + (k + 1)] = I | 1;
                  l[B >> 2] = I;
                  break a;
                }
                if (256 > F >>> 0) {
                  var M = o[h + (k + 2)], V = o[h + (k + 3)];
                  if ((M | 0) == (V | 0)) {
                    l[X >> 2] &= 1 << (F >>> 3) ^ -1, J = E, f = J >> 2, L = I;
                  } else {
                    var Q = ((F >>> 2 & 1073741822) << 2) + X + 40 | 0, T = (M | 0) != (Q | 0) & M >>> 0 < t >>> 0;
                    do {
                      if (!T && (V | 0) == (Q | 0) | V >>> 0 >= t >>> 0) {
                        l[M + 12 >> 2] = V;
                        l[V + 8 >> 2] = M;
                        J = E;
                        f = J >> 2;
                        L = I;
                        break c;
                      }
                    } while (0);
                    mM();
                    ea("Reached an unreachable!");
                  }
                } else {
                  var Y = H, R = o[h + (k + 6)], P = o[h + (k + 3)], aa = (P | 0) == (Y | 0);
                  do {
                    if (aa) {
                      var W = G + (b + 20) | 0, da = l[W >> 2];
                      if (0 == (da | 0)) {
                        var sa = G + (b + 16) | 0, ta = l[sa >> 2];
                        if (0 == (ta | 0)) {
                          var ja = 0;
                          e = ja >> 2;
                          break;
                        }
                        var ua = sa, ha = ta;
                      } else {
                        ua = W, ha = da, m = 20;
                      }
                      for (;;) {
                        var wa = ha + 20 | 0, oa = l[wa >> 2];
                        if (0 != (oa | 0)) {
                          ua = wa, ha = oa;
                        } else {
                          var Aa = ha + 16 | 0, Fa = o[Aa >> 2];
                          if (0 == (Fa | 0)) {
                            break;
                          }
                          ua = Aa;
                          ha = Fa;
                        }
                      }
                      ua >>> 0 < t >>> 0 && (mM(), ea("Reached an unreachable!"));
                      l[ua >> 2] = 0;
                      ja = ha;
                    } else {
                      var La = o[h + (k + 2)];
                      La >>> 0 < t >>> 0 && (mM(), ea("Reached an unreachable!"));
                      l[La + 12 >> 2] = P;
                      l[P + 8 >> 2] = La;
                      ja = P;
                    }
                    e = ja >> 2;
                  } while (0);
                  if (0 != (R | 0)) {
                    var xa = G + (b + 28) | 0, ca = (l[xa >> 2] << 2) + X + 304 | 0, Z = (Y | 0) == (l[ca >> 2] | 0);
                    do {
                      if (Z) {
                        l[ca >> 2] = ja;
                        if (0 != (ja | 0)) {
                          break;
                        }
                        l[X + 4 >> 2] &= 1 << l[xa >> 2] ^ -1;
                        J = E;
                        f = J >> 2;
                        L = I;
                        break c;
                      }
                      R >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                      var la = R + 16 | 0;
                      (l[la >> 2] | 0) == (Y | 0) ? l[la >> 2] = ja : l[R + 20 >> 2] = ja;
                      if (0 == (ja | 0)) {
                        J = E;
                        f = J >> 2;
                        L = I;
                        break c;
                      }
                    } while (0);
                    ja >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                    l[e + 6] = R;
                    var ya = o[h + (k + 4)];
                    0 != (ya | 0) && (ya >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[e + 4] = ya, l[ya + 24 >> 2] = ja);
                    var fa = o[h + (k + 5)];
                    0 != (fa | 0) && (fa >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[e + 5] = fa, l[fa + 24 >> 2] = ja);
                  }
                  J = E;
                  f = J >> 2;
                  L = I;
                }
              } else {
                J = r, f = J >> 2, L = C;
              }
            } while (0);
            var $ = J;
            if ($ >>> 0 < B >>> 0) {
              var eb = b + (C - 4) | 0, Sa = o[eb >> 2];
              if (0 != (Sa & 1 | 0)) {
                var Da = 0 == (Sa & 2 | 0);
                do {
                  if (Da) {
                    if ((y | 0) == (l[X + 24 >> 2] | 0)) {
                      var na = l[X + 12 >> 2] + L | 0;
                      l[X + 12 >> 2] = na;
                      l[X + 24 >> 2] = J;
                      l[f + 1] = na | 1;
                      (J | 0) == (l[X + 20 >> 2] | 0) && (l[X + 20 >> 2] = 0, l[X + 8 >> 2] = 0);
                      if (na >>> 0 <= o[X + 28 >> 2] >>> 0) {
                        break a;
                      }
                      var ma = ra, Ba = ra;
                      if (0 == (l[nM >> 2] | 0) && 0 == (l[nM >> 2] | 0)) {
                        var za = oM();
                        0 == (za - 1 & za | 0) ? (l[nM + 8 >> 2] = za, l[nM + 4 >> 2] = za, l[nM + 12 >> 2] = -1, l[nM + 16 >> 2] = 2097152, l[nM + 20 >> 2] = 0, l[X + 440 >> 2] = 0, l[nM >> 2] = Math.floor(Date.now() / 1e3) & -16 ^ 1431655768) : (mM(), ea("Reached an unreachable!"));
                      }
                      c : do {
                        var Ha = o[X + 24 >> 2];
                        if (0 != (Ha | 0)) {
                          var jb = o[X + 12 >> 2], Ia = 40 < jb >>> 0;
                          do {
                            if (Ia) {
                              for (var $a = o[nM + 8 >> 2], ba = (Math.floor(((-41 + jb + $a | 0) >>> 0) / ($a >>> 0)) - 1) * $a | 0, qa = Ha, ka = X + 444 | 0, Ba = ka >> 2; ; ) {
                                var ia = o[Ba];
                                if (ia >>> 0 <= qa >>> 0 && (ia + l[Ba + 1] | 0) >>> 0 > qa >>> 0) {
                                  var va = ka;
                                  break;
                                }
                                var Oa = o[Ba + 2];
                                if (0 == (Oa | 0)) {
                                  va = 0;
                                  break;
                                }
                                ka = Oa;
                                Ba = ka >> 2;
                              }
                              if (0 == (l[va + 12 >> 2] & 8 | 0)) {
                                var Pa = pM(0), ma = (va + 4 | 0) >> 2;
                                if ((Pa | 0) == (l[va >> 2] + l[ma] | 0)) {
                                  var Ta = pM(-(2147483646 < ba >>> 0 ? -2147483648 - $a | 0 : ba) | 0), Xa = pM(0);
                                  if (-1 != (Ta | 0) & Xa >>> 0 < Pa >>> 0) {
                                    var ab = Pa - Xa | 0;
                                    if ((Pa | 0) != (Xa | 0)) {
                                      l[ma] = l[ma] - ab | 0;
                                      l[X + 432 >> 2] = l[X + 432 >> 2] - ab | 0;
                                      var kb = l[X + 24 >> 2], mb = l[X + 12 >> 2] - ab | 0, Qa = kb, Ma = kb + 8 | 0, bb = 0 == (Ma & 7 | 0) ? 0 : -Ma & 7, Va = mb - bb | 0;
                                      l[X + 24 >> 2] = Qa + bb | 0;
                                      l[X + 12 >> 2] = Va;
                                      l[(bb + (Qa + 4) | 0) >> 2] = Va | 1;
                                      l[(mb + (Qa + 4) | 0) >> 2] = 40;
                                      l[X + 28 >> 2] = l[nM + 16 >> 2];
                                      break c;
                                    }
                                  }
                                }
                              }
                            }
                          } while (0);
                          o[X + 12 >> 2] >>> 0 > o[X + 28 >> 2] >>> 0 && (l[X + 28 >> 2] = -1);
                        }
                      } while (0);
                      break a;
                    }
                    if ((y | 0) == (l[X + 20 >> 2] | 0)) {
                      var Ja = l[X + 8 >> 2] + L | 0;
                      l[X + 8 >> 2] = Ja;
                      l[X + 20 >> 2] = J;
                      l[f + 1] = Ja | 1;
                      l[($ + Ja | 0) >> 2] = Ja;
                      break a;
                    }
                    var ga = (Sa & -8) + L | 0, cb = Sa >>> 3, gb = 256 > Sa >>> 0;
                    c : do {
                      if (gb) {
                        var db = o[k + i], Ya = o[((C | 4) >> 2) + k];
                        if ((db | 0) == (Ya | 0)) {
                          l[X >> 2] &= 1 << cb ^ -1;
                        } else {
                          var Ka = ((Sa >>> 2 & 1073741822) << 2) + X + 40 | 0;
                          m = (db | 0) == (Ka | 0) ? 62 : db >>> 0 < o[X + 16 >> 2] >>> 0 ? 65 : 62;
                          do {
                            if (62 == m && !((Ya | 0) != (Ka | 0) && Ya >>> 0 < o[X + 16 >> 2] >>> 0)) {
                              l[db + 12 >> 2] = Ya;
                              l[Ya + 8 >> 2] = db;
                              break c;
                            }
                          } while (0);
                          mM();
                          ea("Reached an unreachable!");
                        }
                      } else {
                        var Ga = B, fb = o[i + (k + 4)], Ea = o[((C | 4) >> 2) + k], Ua = (Ea | 0) == (Ga | 0);
                        do {
                          if (Ua) {
                            var ob = C + (b + 12) | 0, Na = l[ob >> 2];
                            if (0 == (Na | 0)) {
                              var Wa = C + (b + 8) | 0, nb = l[Wa >> 2];
                              if (0 == (nb | 0)) {
                                var pa = 0;
                                d = pa >> 2;
                                break;
                              }
                              var hb = Wa, Ca = nb;
                            } else {
                              hb = ob, Ca = Na, m = 72;
                            }
                            for (;;) {
                              var ib = Ca + 20 | 0, Za = l[ib >> 2];
                              if (0 != (Za | 0)) {
                                hb = ib, Ca = Za;
                              } else {
                                var lb = Ca + 16 | 0, qb = o[lb >> 2];
                                if (0 == (qb | 0)) {
                                  break;
                                }
                                hb = lb;
                                Ca = qb;
                              }
                            }
                            hb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                            l[hb >> 2] = 0;
                            pa = Ca;
                          } else {
                            var vb = o[k + i];
                            vb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                            l[vb + 12 >> 2] = Ea;
                            l[Ea + 8 >> 2] = vb;
                            pa = Ea;
                          }
                          d = pa >> 2;
                        } while (0);
                        if (0 != (fb | 0)) {
                          var sb = C + (b + 20) | 0, Ab = (l[sb >> 2] << 2) + X + 304 | 0, Bb = (Ga | 0) == (l[Ab >> 2] | 0);
                          do {
                            if (Bb) {
                              l[Ab >> 2] = pa;
                              if (0 != (pa | 0)) {
                                break;
                              }
                              l[X + 4 >> 2] &= 1 << l[sb >> 2] ^ -1;
                              break c;
                            }
                            fb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                            var Gb = fb + 16 | 0;
                            (l[Gb >> 2] | 0) == (Ga | 0) ? l[Gb >> 2] = pa : l[fb + 20 >> 2] = pa;
                            if (0 == (pa | 0)) {
                              break c;
                            }
                          } while (0);
                          pa >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                          l[d + 6] = fb;
                          var Cb = o[i + (k + 2)];
                          0 != (Cb | 0) && (Cb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[d + 4] = Cb, l[Cb + 24 >> 2] = pa);
                          var pb = o[i + (k + 3)];
                          0 != (pb | 0) && (pb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!")), l[d + 5] = pb, l[pb + 24 >> 2] = pa);
                        }
                      }
                    } while (0);
                    l[f + 1] = ga | 1;
                    l[$ + ga >> 2] = ga;
                    if ((J | 0) != (l[X + 20 >> 2] | 0)) {
                      var ub = ga;
                    } else {
                      l[X + 8 >> 2] = ga;
                      break a;
                    }
                  } else {
                    l[eb >> 2] = Sa & -2, l[f + 1] = L | 1, ub = l[$ + L >> 2] = L;
                  }
                } while (0);
                if (256 > ub >>> 0) {
                  var Eb = ub >>> 2 & 1073741822, Db = (Eb << 2) + X + 40 | 0, wb = o[X >> 2], Hb = 1 << (ub >>> 3);
                  if (0 == (wb & Hb | 0)) {
                    l[X >> 2] = wb | Hb;
                    var tb = Db, xb = (Eb + 2 << 2) + X + 40 | 0;
                  } else {
                    var Ib = (Eb + 2 << 2) + X + 40 | 0, Jb = o[Ib >> 2];
                    Jb >>> 0 < o[X + 16 >> 2] >>> 0 && (mM(), ea("Reached an unreachable!"));
                    tb = Jb;
                    xb = Ib;
                  }
                  l[xb >> 2] = J;
                  l[tb + 12 >> 2] = J;
                  l[f + 2] = tb;
                  l[f + 3] = Db;
                  break a;
                }
                var Lb = J, Xb = ub >>> 8;
                if (0 == (Xb | 0)) {
                  var Nb = 0;
                } else {
                  if (16777215 < ub >>> 0) {
                    Nb = 31;
                  } else {
                    var Sb = (Xb + 1048320 | 0) >>> 16 & 8, Ob = Xb << Sb, Vb = (Ob + 520192 | 0) >>> 16 & 4, Zb = Ob << Vb, dc = (Zb + 245760 | 0) >>> 16 & 2, fc = 14 - (Vb | Sb | dc) + (Zb << dc >>> 15) | 0, Nb = ub >>> ((fc + 7 | 0) >>> 0) & 1 | fc << 1;
                  }
                }
                var kc = (Nb << 2) + X + 304 | 0;
                l[f + 7] = Nb;
                l[f + 5] = 0;
                l[f + 4] = 0;
                var Fb = l[X + 4 >> 2], Wb = 1 << Nb, vc = 0 == (Fb & Wb | 0);
                c : do {
                  if (vc) {
                    l[X + 4 >> 2] = Fb | Wb, l[kc >> 2] = Lb, l[f + 6] = kc, l[f + 3] = J, l[f + 2] = J;
                  } else {
                    for (var $b = ub << (31 == (Nb | 0) ? 0 : 25 - (Nb >>> 1) | 0), Yb = l[kc >> 2]; ; ) {
                      if ((l[Yb + 4 >> 2] & -8 | 0) == (ub | 0)) {
                        var wc = Yb + 8 | 0, xc = o[wc >> 2], Hc = o[X + 16 >> 2], Bd = Yb >>> 0 < Hc >>> 0;
                        do {
                          if (!Bd && xc >>> 0 >= Hc >>> 0) {
                            l[xc + 12 >> 2] = Lb;
                            l[wc >> 2] = Lb;
                            l[f + 2] = xc;
                            l[f + 3] = Yb;
                            l[f + 6] = 0;
                            break c;
                          }
                        } while (0);
                        mM();
                        ea("Reached an unreachable!");
                      }
                      var rc = ($b >>> 31 << 2) + Yb + 16 | 0, Rc = o[rc >> 2];
                      if (0 == (Rc | 0)) {
                        if (rc >>> 0 >= o[X + 16 >> 2] >>> 0) {
                          l[rc >> 2] = Lb;
                          l[f + 6] = Yb;
                          l[f + 3] = J;
                          l[f + 2] = J;
                          break c;
                        }
                        mM();
                        ea("Reached an unreachable!");
                      }
                      $b <<= 1;
                      Yb = Rc;
                    }
                  }
                } while (0);
                var Ic = l[X + 32 >> 2] - 1 | 0;
                l[X + 32 >> 2] = Ic;
                if (0 != (Ic | 0)) {
                  break a;
                }
                var ad = l[X + 452 >> 2], pc = 0 == (ad | 0);
                c : do {
                  if (!pc) {
                    for (var Pb = ad; ; ) {
                      var Rb = l[Pb + 8 >> 2];
                      if (0 == (Rb | 0)) {
                        break c;
                      }
                      Pb = Rb;
                    }
                  }
                } while (0);
                l[X + 32 >> 2] = -1;
                break a;
              }
            }
          }
        }
      } while (0);
      mM();
      ea("Reached an unreachable!");
    }
  } while (0);
}

function Nv(b) {
  0 != (b | 0) && Fh(b);
}

function As(b) {
  for (b = 0 == (b | 0) ? 1 : b; ; ) {
    var d = Oe(b);
    if (0 == (d | 0)) {
      d = ($d = l[rM >> 2], l[rM >> 2] = $d, $d);
      if (0 == (d | 0)) {
        var e = Oe(4);
        l[e >> 2] = sM + 8 | 0;
        var f = tM;
        print("Compiled code throwing an exception, " + [ e, f, 32 ] + ", at " + Error().stack);
        l[uM >> 2] = e;
        l[uM + 4 >> 2] = f;
        l[uM + 8 >> 2] = 32;
        "uncaught_exception" in vM ? vM.gc++ : vM.gc = 1;
        ea(e);
        ea("Reached an unreachable!");
      }
      K[d]();
    } else {
      return d;
    }
  }
  return rb;
}

function Zg(b, d, e) {
  if (20 <= e && d % 2 == b % 2) {
    if (d % 4 == b % 4) {
      for (e = d + e; d % 4; ) {
        c[b++] = c[d++];
      }
      for (var d = d >> 2, b = b >> 2, f = e >> 2; d < f; ) {
        l[b++] = l[d++];
      }
      d <<= 2;
      for (b <<= 2; d < e; ) {
        c[b++] = c[d++];
      }
    } else {
      e = d + e;
      d % 2 && (c[b++] = c[d++]);
      d >>= 1;
      b >>= 1;
      for (f = e >> 1; d < f; ) {
        j[b++] = j[d++];
      }
      d <<= 1;
      b <<= 1;
      d < e && (c[b++] = c[d++]);
    }
  } else {
    for (; e--; ) {
      c[b++] = c[d++];
    }
  }
}

var Hh = Math.sqrt;

function S(b, d, e, f) {
  ea("Assertion failed: " + ie(f) + ", at: " + [ ie(b), d, ie(e) ]);
}

function Ze(b, d) {
  var e = 0;
  if (20 <= d) {
    for (var f = b + d; b % 4; ) {
      c[b++] = e;
    }
    0 > e && (e += 256);
    for (var g = b >> 2, h = f >> 2, i = e | e << 8 | e << 16 | e << 24; g < h; ) {
      l[g++] = i;
    }
    for (b = g << 2; b < f; ) {
      c[b++] = e;
    }
  } else {
    for (; d--; ) {
      c[b++] = e;
    }
  }
}

var Dm = Math.sin, Em = Math.cos, Mr = Math.floor, wM = 13, xM = 9, yM = 22, zM = 5, AM = 21, BM = 6;

function CM(b) {
  qM || (qM = D([ 0 ], "i32", x));
  l[qM >> 2] = b;
}

var qM, DM = 0, co = 0, EM = 0, FM = 2, go = [ rb ], GM = Ra;

function HM(b, d) {
  if ("string" !== typeof b) {
    return rb;
  }
  d === ra && (d = "/");
  b && "/" == b[0] && (d = "");
  for (var e = (d + "/" + b).split("/").reverse(), f = [ "" ]; e.length; ) {
    var g = e.pop();
    "" == g || "." == g || (".." == g ? 1 < f.length && f.pop() : f.push(g));
  }
  return 1 == f.length ? "/" : f.join("/");
}

function IM(b, d, e) {
  var f = {
    pg: yb,
    cb: yb,
    error: 0,
    name: rb,
    path: rb,
    object: rb,
    bc: yb,
    dc: rb,
    cc: rb
  }, b = HM(b);
  if ("/" == b) {
    f.pg = Ra, f.cb = f.bc = Ra, f.name = "/", f.path = f.dc = "/", f.object = f.cc = JM;
  } else {
    if (b !== rb) {
      for (var e = e || 0, b = b.slice(1).split("/"), g = JM, h = [ "" ]; b.length; ) {
        1 == b.length && g.V && (f.bc = Ra, f.dc = 1 == h.length ? "/" : h.join("/"), f.cc = g, f.name = b[0]);
        var i = b.shift();
        if (g.V) {
          if (g.fc) {
            if (!g.u.hasOwnProperty(i)) {
              f.error = 2;
              break;
            }
          } else {
            f.error = wM;
            break;
          }
        } else {
          f.error = 20;
          break;
        }
        g = g.u[i];
        if (g.link && !(d && 0 == b.length)) {
          if (40 < e) {
            f.error = 40;
            break;
          }
          f = HM(g.link, h.join("/"));
          return IM([ f ].concat(b).join("/"), d, e + 1);
        }
        h.push(i);
        0 == b.length && (f.cb = Ra, f.path = h.join("/"), f.object = g);
      }
    }
  }
  return f;
}

function KM(b) {
  LM();
  b = IM(b, ra);
  if (b.cb) {
    return b.object;
  }
  CM(b.error);
  return rb;
}

function MM(b, d, e, f, g) {
  b || (b = "/");
  "string" === typeof b && (b = KM(b));
  b || (CM(wM), ea(Error("Parent path must exist.")));
  b.V || (CM(20), ea(Error("Parent must be a folder.")));
  !b.write && !GM && (CM(wM), ea(Error("Parent folder must be writeable.")));
  if (!d || "." == d || ".." == d) {
    CM(2), ea(Error("Name must not be empty."));
  }
  b.u.hasOwnProperty(d) && (CM(17), ea(Error("Can't overwrite object.")));
  b.u[d] = {
    fc: f === ra ? Ra : f,
    write: g === ra ? yb : g,
    timestamp: Date.now(),
    og: FM++
  };
  for (var h in e) {
    e.hasOwnProperty(h) && (b.u[d][h] = e[h]);
  }
  return b.u[d];
}

function NM(b, d) {
  return MM(b, d, {
    V: Ra,
    Da: yb,
    u: {}
  }, Ra, Ra);
}

function OM() {
  var b = "dev/shm/tmp", d = KM("/");
  d === rb && ea(Error("Invalid parent."));
  for (b = b.split("/").reverse(); b.length; ) {
    var e = b.pop();
    e && (d.u.hasOwnProperty(e) || NM(d, e), d = d.u[e]);
  }
}

function PM(b, d, e, f) {
  !e && !f && ea(Error("A device must have at least one callback defined."));
  var g = {
    Da: Ra,
    input: e,
    W: f
  };
  g.V = yb;
  return MM(b, d, g, Boolean(e), Boolean(f));
}

function LM() {
  JM || (JM = {
    fc: Ra,
    write: Ra,
    V: Ra,
    Da: yb,
    timestamp: Date.now(),
    og: 1,
    u: {}
  });
}

function QM() {
  var b, d, e;
  Gc(!RM, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  RM = Ra;
  LM();
  b || (b = (function() {
    if (!b.bb || !b.bb.length) {
      var d;
      "undefined" != typeof window && "function" == typeof window.prompt ? d = window.prompt("Input: ") : "function" == typeof readline && (d = readline());
      d || (d = "");
      b.bb = cf(d + "\n", Ra);
    }
    return b.bb.shift();
  }));
  d || (d = (function(b) {
    b === rb || 10 === b ? (d.ec(d.buffer.join("")), d.buffer = []) : d.buffer.push(String.fromCharCode(b));
  }));
  d.ec || (d.ec = print);
  d.buffer || (d.buffer = []);
  e || (e = d);
  NM("/", "tmp");
  var f = NM("/", "dev"), g = PM(f, "stdin", b), h = PM(f, "stdout", rb, d);
  e = PM(f, "stderr", rb, e);
  PM(f, "tty", b, d);
  go[1] = {
    path: "/dev/stdin",
    object: g,
    position: 0,
    ac: Ra,
    Ea: yb,
    $b: yb,
    error: yb,
    Yb: yb,
    hc: []
  };
  go[2] = {
    path: "/dev/stdout",
    object: h,
    position: 0,
    ac: yb,
    Ea: Ra,
    $b: yb,
    error: yb,
    Yb: yb,
    hc: []
  };
  go[3] = {
    path: "/dev/stderr",
    object: e,
    position: 0,
    ac: yb,
    Ea: Ra,
    $b: yb,
    error: yb,
    Yb: yb,
    hc: []
  };
  DM = D([ 1 ], "void*", x);
  co = D([ 2 ], "void*", x);
  EM = D([ 3 ], "void*", x);
  OM();
  go[DM] = go[1];
  go[co] = go[2];
  go[EM] = go[3];
  D([ D([ 0, 0, 0, 0, DM, 0, 0, 0, co, 0, 0, 0, EM, 0, 0, 0 ], "void*", x) ], "void*", x);
}

var RM, JM;

function fo(b, d, e) {
  var f = go[b];
  if (f) {
    if (f.Ea) {
      if (0 > e) {
        return CM(yM), -1;
      }
      if (f.object.Da) {
        if (f.object.W) {
          for (var g = 0; g < e; g++) {
            try {
              f.object.W(c[d + g]);
            } catch (h) {
              return CM(zM), -1;
            }
          }
          f.object.timestamp = Date.now();
          return g;
        }
        CM(BM);
        return -1;
      }
      g = f.position;
      b = go[b];
      if (!b || b.object.Da) {
        CM(xM), d = -1;
      } else {
        if (b.Ea) {
          if (b.object.V) {
            CM(AM), d = -1;
          } else {
            if (0 > e || 0 > g) {
              CM(yM), d = -1;
            } else {
              for (var i = b.object.u; i.length < g; ) {
                i.push(0);
              }
              for (var k = 0; k < e; k++) {
                i[g + k] = Gd[d + k];
              }
              b.object.timestamp = Date.now();
              d = k;
            }
          }
        } else {
          CM(wM), d = -1;
        }
      }
      -1 != d && (f.position += d);
      return d;
    }
    CM(wM);
    return -1;
  }
  CM(xM);
  return -1;
}

function eo(b, d) {
  function e(b) {
    var e;
    "double" === b ? e = (w[0] = l[d + g >> 2], w[1] = l[d + g + 4 >> 2], te[0]) : "i64" == b ? e = [ l[d + g >> 2], l[d + g + 4 >> 2] ] : (b = "i32", e = l[d + g >> 2]);
    g += Math.max(Dc(b), Ec);
    return e;
  }
  for (var f = b, g = 0, h = [], i, k; ; ) {
    var m = f;
    i = c[f];
    if (0 === i) {
      break;
    }
    k = c[f + 1];
    if (37 == i) {
      var n = yb, q = yb, r = yb, t = yb;
      a : for (;;) {
        switch (k) {
         case 43:
          n = Ra;
          break;
         case 45:
          q = Ra;
          break;
         case 35:
          r = Ra;
          break;
         case 48:
          if (t) {
            break a;
          } else {
            t = Ra;
            break;
          }
         default:
          break a;
        }
        f++;
        k = c[f + 1];
      }
      var u = 0;
      if (42 == k) {
        u = e("i32"), f++, k = c[f + 1];
      } else {
        for (; 48 <= k && 57 >= k; ) {
          u = 10 * u + (k - 48), f++, k = c[f + 1];
        }
      }
      var v = yb;
      if (46 == k) {
        var A = 0, v = Ra;
        f++;
        k = c[f + 1];
        if (42 == k) {
          A = e("i32"), f++;
        } else {
          for (;;) {
            k = c[f + 1];
            if (48 > k || 57 < k) {
              break;
            }
            A = 10 * A + (k - 48);
            f++;
          }
        }
        k = c[f + 1];
      } else {
        A = 6;
      }
      var C;
      switch (String.fromCharCode(k)) {
       case "h":
        k = c[f + 2];
        104 == k ? (f++, C = 1) : C = 2;
        break;
       case "l":
        k = c[f + 2];
        108 == k ? (f++, C = 8) : C = 4;
        break;
       case "L":
       case "q":
       case "j":
        C = 8;
        break;
       case "z":
       case "t":
       case "I":
        C = 4;
        break;
       default:
        C = rb;
      }
      C && f++;
      k = c[f + 1];
      if (-1 != "d,i,u,o,x,X,p".split(",").indexOf(String.fromCharCode(k))) {
        m = 100 == k || 105 == k;
        C = C || 4;
        i = e("i" + 8 * C);
        8 == C && (i = 117 == k ? (i[0] >>> 0) + 4294967296 * (i[1] >>> 0) : (i[0] >>> 0) + 4294967296 * (i[1] | 0));
        4 >= C && (i = (m ? bg : ag)(i & Math.pow(256, C) - 1, 8 * C));
        var B = Math.abs(i), y, m = "";
        if (100 == k || 105 == k) {
          y = bg(i, 8 * C).toString(10);
        } else {
          if (117 == k) {
            y = ag(i, 8 * C).toString(10), i = Math.abs(i);
          } else {
            if (111 == k) {
              y = (r ? "0" : "") + B.toString(8);
            } else {
              if (120 == k || 88 == k) {
                m = r ? "0x" : "";
                if (0 > i) {
                  i = -i;
                  y = (B - 1).toString(16);
                  r = [];
                  for (B = 0; B < y.length; B++) {
                    r.push((15 - parseInt(y[B], 16)).toString(16));
                  }
                  for (y = r.join(""); y.length < 2 * C; ) {
                    y = "f" + y;
                  }
                } else {
                  y = B.toString(16);
                }
                88 == k && (m = m.toUpperCase(), y = y.toUpperCase());
              } else {
                112 == k && (0 === B ? y = "(nil)" : (m = "0x", y = B.toString(16)));
              }
            }
          }
        }
        if (v) {
          for (; y.length < A; ) {
            y = "0" + y;
          }
        }
        for (n && (m = 0 > i ? "-" + m : "+" + m); m.length + y.length < u; ) {
          q ? y += " " : t ? y = "0" + y : m = " " + m;
        }
        y = m + y;
        y.split("").forEach((function(b) {
          h.push(b.charCodeAt(0));
        }));
      } else {
        if (-1 != "f,F,e,E,g,G".split(",").indexOf(String.fromCharCode(k))) {
          i = e("double");
          if (isNaN(i)) {
            y = "nan", t = yb;
          } else {
            if (isFinite(i)) {
              v = yb;
              C = Math.min(A, 20);
              if (103 == k || 71 == k) {
                v = Ra, A = A || 1, C = parseInt(i.toExponential(C).split("e")[1], 10), A > C && -4 <= C ? (k = (103 == k ? "f" : "F").charCodeAt(0), A -= C + 1) : (k = (103 == k ? "e" : "E").charCodeAt(0), A--), C = Math.min(A, 20);
              }
              if (101 == k || 69 == k) {
                y = i.toExponential(C), /[eE][-+]\d$/.test(y) && (y = y.slice(0, -1) + "0" + y.slice(-1));
              } else {
                if (102 == k || 70 == k) {
                  y = i.toFixed(C);
                }
              }
              m = y.split("e");
              if (v && !r) {
                for (; 1 < m[0].length && -1 != m[0].indexOf(".") && ("0" == m[0].slice(-1) || "." == m[0].slice(-1)); ) {
                  m[0] = m[0].slice(0, -1);
                }
              } else {
                for (r && -1 == y.indexOf(".") && (m[0] += "."); A > C++; ) {
                  m[0] += "0";
                }
              }
              y = m[0] + (1 < m.length ? "e" + m[1] : "");
              69 == k && (y = y.toUpperCase());
              n && 0 <= i && (y = "+" + y);
            } else {
              y = (0 > i ? "-" : "") + "inf", t = yb;
            }
          }
          for (; y.length < u; ) {
            y = q ? y + " " : t && ("-" == y[0] || "+" == y[0]) ? y[0] + "0" + y.slice(1) : (t ? "0" : " ") + y;
          }
          97 > k && (y = y.toUpperCase());
          y.split("").forEach((function(b) {
            h.push(b.charCodeAt(0));
          }));
        } else {
          if (115 == k) {
            (n = e("i8*")) ? (n = $f(n), v && n.length > A && (n = n.slice(0, A))) : n = cf("(null)", Ra);
            if (!q) {
              for (; n.length < u--; ) {
                h.push(32);
              }
            }
            h = h.concat(n);
            if (q) {
              for (; n.length < u--; ) {
                h.push(32);
              }
            }
          } else {
            if (99 == k) {
              for (q && h.push(e("i8")); 0 < --u; ) {
                h.push(32);
              }
              q || h.push(e("i8"));
            } else {
              if (110 == k) {
                q = e("i32*"), l[q >> 2] = h.length;
              } else {
                if (37 == k) {
                  h.push(i);
                } else {
                  for (B = m; B < f + 2; B++) {
                    h.push(c[B]);
                  }
                }
              }
            }
          }
        }
      }
      f += 2;
    } else {
      h.push(i), f += 1;
    }
  }
  return h;
}

function Gr(b) {
  var d = Uc(), e = Date.now();
  l[b + d[0] >> 2] = Math.floor(e / 1e3);
  l[b + d[1] >> 2] = Math.floor(1e3 * (e - 1e3 * Math.floor(e / 1e3)));
}

var $J = Math.atan2;

function Jw(b) {
  c[b] || (c[b] = 1);
}

function mM() {
  ea("ABORT: undefined, at " + Error().stack);
}

function oM() {
  switch (8) {
   case 8:
    return Fd;
   case 54:
   case 56:
   case 21:
   case 61:
   case 63:
   case 22:
   case 67:
   case 23:
   case 24:
   case 25:
   case 26:
   case 27:
   case 69:
   case 28:
   case 101:
   case 70:
   case 71:
   case 29:
   case 30:
   case 199:
   case 75:
   case 76:
   case 32:
   case 43:
   case 44:
   case 80:
   case 46:
   case 47:
   case 45:
   case 48:
   case 49:
   case 42:
   case 82:
   case 33:
   case 7:
   case 108:
   case 109:
   case 107:
   case 112:
   case 119:
   case 121:
    return 200809;
   case 13:
   case 104:
   case 94:
   case 95:
   case 34:
   case 35:
   case 77:
   case 81:
   case 83:
   case 84:
   case 85:
   case 86:
   case 87:
   case 88:
   case 89:
   case 90:
   case 91:
   case 94:
   case 95:
   case 110:
   case 111:
   case 113:
   case 114:
   case 115:
   case 116:
   case 117:
   case 118:
   case 120:
   case 40:
   case 16:
   case 79:
   case 19:
    return -1;
   case 92:
   case 93:
   case 5:
   case 72:
   case 6:
   case 74:
   case 92:
   case 93:
   case 96:
   case 97:
   case 98:
   case 99:
   case 102:
   case 103:
   case 105:
    return 1;
   case 38:
   case 66:
   case 50:
   case 51:
   case 4:
    return 1024;
   case 15:
   case 64:
   case 41:
    return 32;
   case 55:
   case 37:
   case 17:
    return 2147483647;
   case 18:
   case 1:
    return 47839;
   case 59:
   case 57:
    return 99;
   case 68:
   case 58:
    return 2048;
   case 0:
    return 2097152;
   case 3:
    return 65536;
   case 14:
    return 32768;
   case 73:
    return 32767;
   case 39:
    return 16384;
   case 60:
    return 1e3;
   case 106:
    return 700;
   case 52:
    return 256;
   case 62:
    return 255;
   case 2:
    return 100;
   case 65:
    return 64;
   case 36:
    return 20;
   case 100:
    return 16;
   case 20:
    return 6;
   case 53:
    return 4;
  }
  CM(yM);
  return -1;
}

function pM(b) {
  SM || (zd = Math.ceil(zd / Fd) * Fd, SM = Ra);
  var d = zd;
  0 != b && yd(b);
  return d;
}

var SM;

function vM() {
  return !!vM.gc;
}

yf.unshift({
  Zb: (function() {
    GM = yb;
    RM || QM();
  })
});

zf.push({
  Zb: (function() {
    RM && (0 < go[2].object.W.buffer.length && go[2].object.W(10), 0 < go[3].object.W.buffer.length && go[3].object.W(10));
  })
});

CM(0);

var uM = D(12, "void*", x);

Module.ng = (function(b) {
  function d() {
    for (var b = 0; 3 > b; b++) {
      f.push(0);
    }
  }
  var e = b.length + 1, f = [ D(cf("/bin/this.program"), "i8", x) ];
  d();
  for (var g = 0; g < e - 1; g += 1) {
    f.push(D(cf(b[g]), "i8", x)), d();
  }
  f.push(0);
  f = D(f, "i32", x);
  return _main(e, f, 0);
});

var yk, Ak, Bk, Lr, Pr, Qr, Nr, Or, dF, TM, UM, VM, WM, Tw, XM, FF, YM, wF, ZM, cn, bn, np, $M, aN, zk, yf = yf.concat([]), op, pp, bN, cN, dN, eN, fN, gN, hN, iN, jN, kN, lN, cp, bp, mN, nN, oN, pN, qN, rN, sN, tN, uN, nq, vN, wN, Dr, xN, Ur, yN, mq, Vr, zN, Wr, AN, Yr, BN, Zr, CN, Er, DN, Cr, EN, ss, FN, Kw, Iw, cx, bx, gx, fx, jx, ix, zG, yG, CG, BG, FG, EG, JG, IG, MG, LG, PG, OG, SG, RG, qI, pI, vI, uI, BI, AI, cK, bK, fK, eK, X, nM, rM, sM, GN, tM, HN;

O.td = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 67, 111, 108, 108, 105, 100, 101, 69, 100, 103, 101, 46, 99, 112, 112, 0 ], "i8", x);

O.Nc = D([ 118, 111, 105, 100, 32, 98, 50, 67, 111, 108, 108, 105, 100, 101, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 40, 98, 50, 77, 97, 110, 105, 102, 111, 108, 100, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 69, 100, 103, 101, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 67, 105, 114, 99, 108, 101, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", x);

O.ud = D([ 100, 101, 110, 32, 62, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.Gb = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 67, 111, 108, 108, 105, 100, 101, 80, 111, 108, 121, 103, 111, 110, 46, 99, 112, 112, 0 ], "i8", x);

O.Pc = D([ 118, 111, 105, 100, 32, 98, 50, 70, 105, 110, 100, 73, 110, 99, 105, 100, 101, 110, 116, 69, 100, 103, 101, 40, 98, 50, 67, 108, 105, 112, 86, 101, 114, 116, 101, 120, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", x);

O.Cb = D([ 48, 32, 60, 61, 32, 101, 100, 103, 101, 49, 32, 38, 38, 32, 101, 100, 103, 101, 49, 32, 60, 32, 112, 111, 108, 121, 49, 45, 62, 109, 95, 118, 101, 114, 116, 101, 120, 67, 111, 117, 110, 116, 0 ], "i8", x);

O.Oc = D([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 69, 100, 103, 101, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 40, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", x);

yk = D(1, "i32", x);

Ak = D(1, "i32", x);

Bk = D(1, "i32", x);

O.q = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 46, 99, 112, 112, 0 ], "i8", x);

O.mb = D([ 118, 111, 105, 100, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 58, 58, 83, 101, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 83, 104, 97, 112, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.je = D([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 99, 104, 97, 105, 110, 45, 62, 109, 95, 99, 111, 117, 110, 116, 0 ], "i8", x);

O.Lc = D([ 118, 111, 105, 100, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 40, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 79, 117, 116, 112, 117, 116, 32, 42, 44, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 67, 97, 99, 104, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 73, 110, 112, 117, 116, 32, 42, 41, 0 ], "i8", x);

O.oa = D([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 77, 101, 116, 114, 105, 99, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.xb = D([ 118, 111, 105, 100, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 87, 105, 116, 110, 101, 115, 115, 80, 111, 105, 110, 116, 115, 40, 98, 50, 86, 101, 99, 50, 32, 42, 44, 32, 98, 50, 86, 101, 99, 50, 32, 42, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.i = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 46, 104, 0 ], "i8", x);

O.h = D([ 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 58, 58, 71, 101, 116, 86, 101, 114, 116, 101, 120, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.j = D([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 109, 95, 99, 111, 117, 110, 116, 0 ], "i8", x);

O.sd = D([ 98, 50, 86, 101, 99, 50, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 83, 101, 97, 114, 99, 104, 68, 105, 114, 101, 99, 116, 105, 111, 110, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.na = D([ 98, 50, 86, 101, 99, 50, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 67, 108, 111, 115, 101, 115, 116, 80, 111, 105, 110, 116, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.jd = D([ 118, 111, 105, 100, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 82, 101, 97, 100, 67, 97, 99, 104, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 67, 97, 99, 104, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", x);

O.Kf = D([ 99, 97, 99, 104, 101, 45, 62, 99, 111, 117, 110, 116, 32, 60, 61, 32, 51, 0 ], "i8", x);

O.c = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 46, 99, 112, 112, 0 ], "i8", x);

O.Rc = D([ 105, 110, 116, 51, 50, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 65, 108, 108, 111, 99, 97, 116, 101, 78, 111, 100, 101, 40, 41, 0 ], "i8", x);

O.Hd = D([ 109, 95, 110, 111, 100, 101, 67, 111, 117, 110, 116, 32, 61, 61, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.G = D([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 70, 114, 101, 101, 78, 111, 100, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Y = D([ 48, 32, 60, 61, 32, 110, 111, 100, 101, 73, 100, 32, 38, 38, 32, 110, 111, 100, 101, 73, 100, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Ba = D([ 48, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 111, 117, 110, 116, 0 ], "i8", x);

O.ib = D([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 68, 101, 115, 116, 114, 111, 121, 80, 114, 111, 120, 121, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Rb = D([ 109, 95, 110, 111, 100, 101, 115, 91, 112, 114, 111, 120, 121, 73, 100, 93, 46, 73, 115, 76, 101, 97, 102, 40, 41, 0 ], "i8", x);

O.jb = D([ 98, 111, 111, 108, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 77, 111, 118, 101, 80, 114, 111, 120, 121, 40, 105, 110, 116, 51, 50, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 65, 65, 66, 66, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 41, 0 ], "i8", x);

O.hb = D([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 73, 110, 115, 101, 114, 116, 76, 101, 97, 102, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Tf = D([ 99, 104, 105, 108, 100, 49, 32, 33, 61, 32, 40, 45, 49, 41, 0 ], "i8", x);

O.Yf = D([ 99, 104, 105, 108, 100, 50, 32, 33, 61, 32, 40, 45, 49, 41, 0 ], "i8", x);

O.v = D([ 105, 110, 116, 51, 50, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 66, 97, 108, 97, 110, 99, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.ag = D([ 105, 65, 32, 33, 61, 32, 40, 45, 49, 41, 0 ], "i8", x);

O.gg = D([ 48, 32, 60, 61, 32, 105, 66, 32, 38, 38, 32, 105, 66, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.vd = D([ 48, 32, 60, 61, 32, 105, 67, 32, 38, 38, 32, 105, 67, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Bd = D([ 48, 32, 60, 61, 32, 105, 70, 32, 38, 38, 32, 105, 70, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Kd = D([ 48, 32, 60, 61, 32, 105, 71, 32, 38, 38, 32, 105, 71, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Sd = D([ 109, 95, 110, 111, 100, 101, 115, 91, 67, 45, 62, 112, 97, 114, 101, 110, 116, 93, 46, 99, 104, 105, 108, 100, 50, 32, 61, 61, 32, 105, 65, 0 ], "i8", x);

O.Xd = D([ 48, 32, 60, 61, 32, 105, 68, 32, 38, 38, 32, 105, 68, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.$d = D([ 48, 32, 60, 61, 32, 105, 69, 32, 38, 38, 32, 105, 69, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.fe = D([ 109, 95, 110, 111, 100, 101, 115, 91, 66, 45, 62, 112, 97, 114, 101, 110, 116, 93, 46, 99, 104, 105, 108, 100, 50, 32, 61, 61, 32, 105, 65, 0 ], "i8", x);

O.nd = D([ 105, 110, 116, 51, 50, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 67, 111, 109, 112, 117, 116, 101, 72, 101, 105, 103, 104, 116, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.N = D([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 86, 97, 108, 105, 100, 97, 116, 101, 83, 116, 114, 117, 99, 116, 117, 114, 101, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.me = D([ 109, 95, 110, 111, 100, 101, 115, 91, 105, 110, 100, 101, 120, 93, 46, 112, 97, 114, 101, 110, 116, 32, 61, 61, 32, 40, 45, 49, 41, 0 ], "i8", x);

O.Fb = D([ 99, 104, 105, 108, 100, 50, 32, 61, 61, 32, 40, 45, 49, 41, 0 ], "i8", x);

O.Hb = D([ 110, 111, 100, 101, 45, 62, 104, 101, 105, 103, 104, 116, 32, 61, 61, 32, 48, 0 ], "i8", x);

O.Ib = D([ 48, 32, 60, 61, 32, 99, 104, 105, 108, 100, 49, 32, 38, 38, 32, 99, 104, 105, 108, 100, 49, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Jb = D([ 48, 32, 60, 61, 32, 99, 104, 105, 108, 100, 50, 32, 38, 38, 32, 99, 104, 105, 108, 100, 50, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Ee = D([ 109, 95, 110, 111, 100, 101, 115, 91, 99, 104, 105, 108, 100, 49, 93, 46, 112, 97, 114, 101, 110, 116, 32, 61, 61, 32, 105, 110, 100, 101, 120, 0 ], "i8", x);

O.Le = D([ 109, 95, 110, 111, 100, 101, 115, 91, 99, 104, 105, 108, 100, 50, 93, 46, 112, 97, 114, 101, 110, 116, 32, 61, 61, 32, 105, 110, 100, 101, 120, 0 ], "i8", x);

O.M = D([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 86, 97, 108, 105, 100, 97, 116, 101, 77, 101, 116, 114, 105, 99, 115, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.Oe = D([ 110, 111, 100, 101, 45, 62, 104, 101, 105, 103, 104, 116, 32, 61, 61, 32, 104, 101, 105, 103, 104, 116, 0 ], "i8", x);

O.Se = D([ 97, 97, 98, 98, 46, 108, 111, 119, 101, 114, 66, 111, 117, 110, 100, 32, 61, 61, 32, 110, 111, 100, 101, 45, 62, 97, 97, 98, 98, 46, 108, 111, 119, 101, 114, 66, 111, 117, 110, 100, 0 ], "i8", x);

O.We = D([ 97, 97, 98, 98, 46, 117, 112, 112, 101, 114, 66, 111, 117, 110, 100, 32, 61, 61, 32, 110, 111, 100, 101, 45, 62, 97, 97, 98, 98, 46, 117, 112, 112, 101, 114, 66, 111, 117, 110, 100, 0 ], "i8", x);

O.La = D([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 86, 97, 108, 105, 100, 97, 116, 101, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.cf = D([ 48, 32, 60, 61, 32, 102, 114, 101, 101, 73, 110, 100, 101, 120, 32, 38, 38, 32, 102, 114, 101, 101, 73, 110, 100, 101, 120, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.df = D([ 71, 101, 116, 72, 101, 105, 103, 104, 116, 40, 41, 32, 61, 61, 32, 67, 111, 109, 112, 117, 116, 101, 72, 101, 105, 103, 104, 116, 40, 41, 0 ], "i8", x);

O.ff = D([ 109, 95, 110, 111, 100, 101, 67, 111, 117, 110, 116, 32, 43, 32, 102, 114, 101, 101, 67, 111, 117, 110, 116, 32, 61, 61, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Ka = D([ 105, 110, 116, 51, 50, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 71, 101, 116, 77, 97, 120, 66, 97, 108, 97, 110, 99, 101, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.Xa = D([ 110, 111, 100, 101, 45, 62, 73, 115, 76, 101, 97, 102, 40, 41, 32, 61, 61, 32, 102, 97, 108, 115, 101, 0 ], "i8", x);

Lr = D(1, "i32", x);

Pr = D(1, "i32", x);

Qr = D(1, "i32", x);

Nr = D(1, "i32", x);

Or = D(1, "i32", x);

O.Ca = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 84, 105, 109, 101, 79, 102, 73, 109, 112, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.Mc = D([ 118, 111, 105, 100, 32, 98, 50, 84, 105, 109, 101, 79, 102, 73, 109, 112, 97, 99, 116, 40, 98, 50, 84, 79, 73, 79, 117, 116, 112, 117, 116, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 79, 73, 73, 110, 112, 117, 116, 32, 42, 41, 0 ], "i8", x);

O.Vd = D([ 116, 97, 114, 103, 101, 116, 32, 62, 32, 116, 111, 108, 101, 114, 97, 110, 99, 101, 0 ], "i8", x);

O.rd = D([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 70, 117, 110, 99, 116, 105, 111, 110, 58, 58, 69, 118, 97, 108, 117, 97, 116, 101, 40, 105, 110, 116, 51, 50, 44, 32, 105, 110, 116, 51, 50, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.qd = D([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 70, 117, 110, 99, 116, 105, 111, 110, 58, 58, 70, 105, 110, 100, 77, 105, 110, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 40, 105, 110, 116, 51, 50, 32, 42, 44, 32, 105, 110, 116, 51, 50, 32, 42, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.Wc = D([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 70, 117, 110, 99, 116, 105, 111, 110, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 67, 97, 99, 104, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 83, 119, 101, 101, 112, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 83, 119, 101, 101, 112, 32, 38, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.Of = D([ 48, 32, 60, 32, 99, 111, 117, 110, 116, 32, 38, 38, 32, 99, 111, 117, 110, 116, 32, 60, 32, 51, 0 ], "i8", x);

dF = D([ 0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 0, 0, 36, 0, 0, 0, 38, 0, 0, 0, 40, 0, 0, 0, 42, 0, 0, 0, 44, 0, 0, 0, 46, 0, 0, 0, 48, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.F = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 83, 104, 97, 112, 101, 115, 47, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 46, 99, 112, 112, 0 ], "i8", x);

O.gb = D([ 118, 111, 105, 100, 32, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 58, 58, 67, 114, 101, 97, 116, 101, 76, 111, 111, 112, 40, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Ra = D([ 109, 95, 118, 101, 114, 116, 105, 99, 101, 115, 32, 61, 61, 32, 95, 95, 110, 117, 108, 108, 32, 38, 38, 32, 109, 95, 99, 111, 117, 110, 116, 32, 61, 61, 32, 48, 0 ], "i8", x);

O.ca = D([ 118, 111, 105, 100, 32, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 58, 58, 67, 114, 101, 97, 116, 101, 67, 104, 97, 105, 110, 40, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Nb = D([ 99, 111, 117, 110, 116, 32, 62, 61, 32, 50, 0 ], "i8", x);

O.ld = D([ 118, 111, 105, 100, 32, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 58, 58, 71, 101, 116, 67, 104, 105, 108, 100, 69, 100, 103, 101, 40, 98, 50, 69, 100, 103, 101, 83, 104, 97, 112, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.Ff = D([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 109, 95, 99, 111, 117, 110, 116, 32, 45, 32, 49, 0 ], "i8", x);

O.md = D([ 118, 105, 114, 116, 117, 97, 108, 32, 98, 111, 111, 108, 32, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 58, 58, 82, 97, 121, 67, 97, 115, 116, 40, 98, 50, 82, 97, 121, 67, 97, 115, 116, 79, 117, 116, 112, 117, 116, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 82, 97, 121, 67, 97, 115, 116, 73, 110, 112, 117, 116, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.Sb = D([ 99, 104, 105, 108, 100, 73, 110, 100, 101, 120, 32, 60, 32, 109, 95, 99, 111, 117, 110, 116, 0 ], "i8", x);

O.kd = D([ 118, 105, 114, 116, 117, 97, 108, 32, 118, 111, 105, 100, 32, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 58, 58, 67, 111, 109, 112, 117, 116, 101, 65, 65, 66, 66, 40, 98, 50, 65, 65, 66, 66, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.mc = D([ 49, 50, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 0 ], "i8", x);

O.Hc = D([ 55, 98, 50, 83, 104, 97, 112, 101, 0 ], "i8", x);

VM = D(8, "*", x);

WM = D(12, "*", x);

Tw = D([ 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 52, 0, 0, 0, 54, 0, 0, 0, 56, 0, 0, 0, 58, 0, 0, 0, 60, 0, 0, 0, 62, 0, 0, 0, 64, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.pc = D([ 49, 51, 98, 50, 67, 105, 114, 99, 108, 101, 83, 104, 97, 112, 101, 0 ], "i8", x);

XM = D(12, "*", x);

FF = D([ 0, 0, 0, 0, 0, 0, 0, 0, 66, 0, 0, 0, 68, 0, 0, 0, 70, 0, 0, 0, 72, 0, 0, 0, 74, 0, 0, 0, 76, 0, 0, 0, 78, 0, 0, 0, 80, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.ic = D([ 49, 49, 98, 50, 69, 100, 103, 101, 83, 104, 97, 112, 101, 0 ], "i8", x);

YM = D(12, "*", x);

O.O = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 83, 104, 97, 112, 101, 115, 47, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 46, 99, 112, 112, 0 ], "i8", x);

O.kb = D([ 118, 111, 105, 100, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 58, 58, 83, 101, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.ce = D([ 51, 32, 60, 61, 32, 99, 111, 117, 110, 116, 32, 38, 38, 32, 99, 111, 117, 110, 116, 32, 60, 61, 32, 56, 0 ], "i8", x);

O.Re = D([ 101, 100, 103, 101, 46, 76, 101, 110, 103, 116, 104, 83, 113, 117, 97, 114, 101, 100, 40, 41, 32, 62, 32, 49, 46, 49, 57, 50, 48, 57, 50, 57, 48, 69, 45, 48, 55, 70, 32, 42, 32, 49, 46, 49, 57, 50, 48, 57, 50, 57, 48, 69, 45, 48, 55, 70, 0 ], "i8", x);

O.pd = D([ 118, 105, 114, 116, 117, 97, 108, 32, 98, 111, 111, 108, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 58, 58, 82, 97, 121, 67, 97, 115, 116, 40, 98, 50, 82, 97, 121, 67, 97, 115, 116, 79, 117, 116, 112, 117, 116, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 82, 97, 121, 67, 97, 115, 116, 73, 110, 112, 117, 116, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.vf = D([ 48, 46, 48, 102, 32, 60, 61, 32, 108, 111, 119, 101, 114, 32, 38, 38, 32, 108, 111, 119, 101, 114, 32, 60, 61, 32, 105, 110, 112, 117, 116, 46, 109, 97, 120, 70, 114, 97, 99, 116, 105, 111, 110, 0 ], "i8", x);

O.wb = D([ 118, 105, 114, 116, 117, 97, 108, 32, 118, 111, 105, 100, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 58, 58, 67, 111, 109, 112, 117, 116, 101, 77, 97, 115, 115, 40, 98, 50, 77, 97, 115, 115, 68, 97, 116, 97, 32, 42, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.Gf = D([ 109, 95, 118, 101, 114, 116, 101, 120, 67, 111, 117, 110, 116, 32, 62, 61, 32, 51, 0 ], "i8", x);

O.Tb = D([ 97, 114, 101, 97, 32, 62, 32, 49, 46, 49, 57, 50, 48, 57, 50, 57, 48, 69, 45, 48, 55, 70, 0 ], "i8", x);

wF = D([ 0, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 84, 0, 0, 0, 86, 0, 0, 0, 88, 0, 0, 0, 90, 0, 0, 0, 92, 0, 0, 0, 94, 0, 0, 0, 96, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.rc = D([ 49, 52, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 0 ], "i8", x);

ZM = D(12, "*", x);

O.eb = D([ 98, 50, 86, 101, 99, 50, 32, 67, 111, 109, 112, 117, 116, 101, 67, 101, 110, 116, 114, 111, 105, 100, 40, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Vb = D([ 99, 111, 117, 110, 116, 32, 62, 61, 32, 51, 0 ], "i8", x);

cn = D([ 16, 0, 0, 0, 32, 0, 0, 0, 64, 0, 0, 0, 96, 0, 0, 0, 128, 0, 0, 0, 160, 0, 0, 0, 192, 0, 0, 0, 224, 0, 0, 0, 256, 0, 0, 0, 320, 0, 0, 0, 384, 0, 0, 0, 448, 0, 0, 0, 512, 0, 0, 0, 640, 0, 0, 0 ], [ "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0 ], x);

bn = D(641, "i8", x);

np = D(1, "i8", x);

O.e = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 109, 109, 111, 110, 47, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 46, 99, 112, 112, 0 ], "i8", x);

O.Ga = D([ 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 40, 41, 0 ], "i8", x);

O.Sa = D([ 106, 32, 60, 32, 98, 50, 95, 98, 108, 111, 99, 107, 83, 105, 122, 101, 115, 0 ], "i8", x);

O.Fa = D([ 118, 111, 105, 100, 32, 42, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 65, 108, 108, 111, 99, 97, 116, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Ua = D([ 48, 32, 60, 32, 115, 105, 122, 101, 0 ], "i8", x);

O.g = D([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 98, 50, 95, 98, 108, 111, 99, 107, 83, 105, 122, 101, 115, 0 ], "i8", x);

O.Hf = D([ 98, 108, 111, 99, 107, 67, 111, 117, 110, 116, 32, 42, 32, 98, 108, 111, 99, 107, 83, 105, 122, 101, 32, 60, 61, 32, 98, 50, 95, 99, 104, 117, 110, 107, 83, 105, 122, 101, 0 ], "i8", x);

O.f = D([ 118, 111, 105, 100, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 70, 114, 101, 101, 40, 118, 111, 105, 100, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

$M = D([ 0, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 100, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Fc = D([ 54, 98, 50, 68, 114, 97, 119, 0 ], "i8", x);

aN = D(8, "*", x);

zk = D(8, "float", x);

D([ 2, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0 ], [ "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0 ], x);

O.m = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 109, 109, 111, 110, 47, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 46, 99, 112, 112, 0 ], "i8", x);

O.P = D([ 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 126, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 40, 41, 0 ], "i8", x);

O.Ta = D([ 109, 95, 105, 110, 100, 101, 120, 32, 61, 61, 32, 48, 0 ], "i8", x);

O.Wa = D([ 109, 95, 101, 110, 116, 114, 121, 67, 111, 117, 110, 116, 32, 61, 61, 32, 48, 0 ], "i8", x);

O.w = D([ 118, 111, 105, 100, 32, 42, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 65, 108, 108, 111, 99, 97, 116, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.D = D([ 109, 95, 101, 110, 116, 114, 121, 67, 111, 117, 110, 116, 32, 60, 32, 98, 50, 95, 109, 97, 120, 83, 116, 97, 99, 107, 69, 110, 116, 114, 105, 101, 115, 0 ], "i8", x);

O.nb = D([ 118, 111, 105, 100, 32, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 70, 114, 101, 101, 40, 118, 111, 105, 100, 32, 42, 41, 0 ], "i8", x);

O.If = D([ 109, 95, 101, 110, 116, 114, 121, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", x);

O.Pf = D([ 112, 32, 61, 61, 32, 101, 110, 116, 114, 121, 45, 62, 100, 97, 116, 97, 0 ], "i8", x);

O.l = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 66, 111, 100, 121, 46, 99, 112, 112, 0 ], "i8", x);

O.Q = D([ 98, 50, 66, 111, 100, 121, 58, 58, 98, 50, 66, 111, 100, 121, 40, 99, 111, 110, 115, 116, 32, 98, 50, 66, 111, 100, 121, 68, 101, 102, 32, 42, 44, 32, 98, 50, 87, 111, 114, 108, 100, 32, 42, 41, 0 ], "i8", x);

O.ne = D([ 98, 100, 45, 62, 112, 111, 115, 105, 116, 105, 111, 110, 46, 73, 115, 86, 97, 108, 105, 100, 40, 41, 0 ], "i8", x);

O.Ze = D([ 98, 100, 45, 62, 108, 105, 110, 101, 97, 114, 86, 101, 108, 111, 99, 105, 116, 121, 46, 73, 115, 86, 97, 108, 105, 100, 40, 41, 0 ], "i8", x);

O.wf = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 97, 110, 103, 108, 101, 41, 0 ], "i8", x);

O.Jf = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 97, 110, 103, 117, 108, 97, 114, 86, 101, 108, 111, 99, 105, 116, 121, 41, 0 ], "i8", x);

O.Qf = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 97, 110, 103, 117, 108, 97, 114, 68, 97, 109, 112, 105, 110, 103, 41, 32, 38, 38, 32, 98, 100, 45, 62, 97, 110, 103, 117, 108, 97, 114, 68, 97, 109, 112, 105, 110, 103, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.Xf = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 108, 105, 110, 101, 97, 114, 68, 97, 109, 112, 105, 110, 103, 41, 32, 38, 38, 32, 98, 100, 45, 62, 108, 105, 110, 101, 97, 114, 68, 97, 109, 112, 105, 110, 103, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.$c = D([ 118, 111, 105, 100, 32, 98, 50, 66, 111, 100, 121, 58, 58, 83, 101, 116, 84, 121, 112, 101, 40, 98, 50, 66, 111, 100, 121, 84, 121, 112, 101, 41, 0 ], "i8", x);

O.U = D([ 109, 95, 119, 111, 114, 108, 100, 45, 62, 73, 115, 76, 111, 99, 107, 101, 100, 40, 41, 32, 61, 61, 32, 102, 97, 108, 115, 101, 0 ], "i8", x);

O.Zc = D([ 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 98, 50, 66, 111, 100, 121, 58, 58, 67, 114, 101, 97, 116, 101, 70, 105, 120, 116, 117, 114, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.la = D([ 118, 111, 105, 100, 32, 98, 50, 66, 111, 100, 121, 58, 58, 68, 101, 115, 116, 114, 111, 121, 70, 105, 120, 116, 117, 114, 101, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", x);

O.fg = D([ 102, 105, 120, 116, 117, 114, 101, 45, 62, 109, 95, 98, 111, 100, 121, 32, 61, 61, 32, 116, 104, 105, 115, 0 ], "i8", x);

O.lg = D([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", x);

O.Ad = D([ 102, 111, 117, 110, 100, 0 ], "i8", x);

O.pb = D([ 118, 111, 105, 100, 32, 98, 50, 66, 111, 100, 121, 58, 58, 82, 101, 115, 101, 116, 77, 97, 115, 115, 68, 97, 116, 97, 40, 41, 0 ], "i8", x);

O.Jd = D([ 109, 95, 116, 121, 112, 101, 32, 61, 61, 32, 98, 50, 95, 100, 121, 110, 97, 109, 105, 99, 66, 111, 100, 121, 0 ], "i8", x);

O.Bb = D([ 109, 95, 73, 32, 62, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.ob = D([ 118, 111, 105, 100, 32, 98, 50, 66, 111, 100, 121, 58, 58, 83, 101, 116, 77, 97, 115, 115, 68, 97, 116, 97, 40, 99, 111, 110, 115, 116, 32, 98, 50, 77, 97, 115, 115, 68, 97, 116, 97, 32, 42, 41, 0 ], "i8", x);

O.Yc = D([ 118, 111, 105, 100, 32, 98, 50, 66, 111, 100, 121, 58, 58, 83, 101, 116, 84, 114, 97, 110, 115, 102, 111, 114, 109, 40, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.ad = D([ 118, 111, 105, 100, 32, 98, 50, 66, 111, 100, 121, 58, 58, 83, 101, 116, 65, 99, 116, 105, 118, 101, 40, 98, 111, 111, 108, 41, 0 ], "i8", x);

O.Zd = D([ 32, 32, 98, 50, 66, 111, 100, 121, 68, 101, 102, 32, 98, 100, 59, 10, 0 ], "i8", x);

O.ee = D([ 32, 32, 98, 100, 46, 116, 121, 112, 101, 32, 61, 32, 98, 50, 66, 111, 100, 121, 84, 121, 112, 101, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.ie = D([ 32, 32, 98, 100, 46, 112, 111, 115, 105, 116, 105, 111, 110, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.oe = D([ 32, 32, 98, 100, 46, 97, 110, 103, 108, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.re = D([ 32, 32, 98, 100, 46, 108, 105, 110, 101, 97, 114, 86, 101, 108, 111, 99, 105, 116, 121, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.te = D([ 32, 32, 98, 100, 46, 97, 110, 103, 117, 108, 97, 114, 86, 101, 108, 111, 99, 105, 116, 121, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.we = D([ 32, 32, 98, 100, 46, 108, 105, 110, 101, 97, 114, 68, 97, 109, 112, 105, 110, 103, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Ae = D([ 32, 32, 98, 100, 46, 97, 110, 103, 117, 108, 97, 114, 68, 97, 109, 112, 105, 110, 103, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Be = D([ 32, 32, 98, 100, 46, 97, 108, 108, 111, 119, 83, 108, 101, 101, 112, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Ge = D([ 32, 32, 98, 100, 46, 97, 119, 97, 107, 101, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Me = D([ 32, 32, 98, 100, 46, 102, 105, 120, 101, 100, 82, 111, 116, 97, 116, 105, 111, 110, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Pe = D([ 32, 32, 98, 100, 46, 98, 117, 108, 108, 101, 116, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Te = D([ 32, 32, 98, 100, 46, 97, 99, 116, 105, 118, 101, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Xe = D([ 32, 32, 98, 100, 46, 103, 114, 97, 118, 105, 116, 121, 83, 99, 97, 108, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.af = D([ 32, 32, 98, 111, 100, 105, 101, 115, 91, 37, 100, 93, 32, 61, 32, 109, 95, 119, 111, 114, 108, 100, 45, 62, 67, 114, 101, 97, 116, 101, 66, 111, 100, 121, 40, 38, 98, 100, 41, 59, 10, 0 ], "i8", x);

O.gf = D([ 32, 32, 123, 10, 0 ], "i8", x);

O.jf = D([ 32, 32, 125, 10, 0 ], "i8", x);

op = D(4, "*", x);

pp = D(4, "*", x);

O.R = D([ 118, 111, 105, 100, 32, 42, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 71, 101, 116, 85, 115, 101, 114, 68, 97, 116, 97, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.n = D([ 48, 32, 60, 61, 32, 112, 114, 111, 120, 121, 73, 100, 32, 38, 38, 32, 112, 114, 111, 120, 121, 73, 100, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.H = D([ 99, 111, 110, 115, 116, 32, 98, 50, 65, 65, 66, 66, 32, 38, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 71, 101, 116, 70, 97, 116, 65, 65, 66, 66, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

bN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 106, 0, 0, 0, 108, 0, 0, 0, 110, 0, 0, 0, 112, 0, 0, 0, 114, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.zc = D([ 49, 55, 98, 50, 67, 111, 110, 116, 97, 99, 116, 76, 105, 115, 116, 101, 110, 101, 114, 0 ], "i8", x);

cN = D(8, "*", x);

O.Oa = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 70, 105, 120, 116, 117, 114, 101, 46, 99, 112, 112, 0 ], "i8", x);

O.vb = D([ 118, 111, 105, 100, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 58, 58, 68, 101, 115, 116, 114, 111, 121, 40, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", x);

O.yb = D([ 109, 95, 112, 114, 111, 120, 121, 67, 111, 117, 110, 116, 32, 61, 61, 32, 48, 0 ], "i8", x);

O.hd = D([ 118, 111, 105, 100, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 58, 58, 67, 114, 101, 97, 116, 101, 80, 114, 111, 120, 105, 101, 115, 40, 98, 50, 66, 114, 111, 97, 100, 80, 104, 97, 115, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", x);

O.kf = D([ 32, 32, 32, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 68, 101, 102, 32, 102, 100, 59, 10, 0 ], "i8", x);

O.zf = D([ 32, 32, 32, 32, 102, 100, 46, 102, 114, 105, 99, 116, 105, 111, 110, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Lf = D([ 32, 32, 32, 32, 102, 100, 46, 114, 101, 115, 116, 105, 116, 117, 116, 105, 111, 110, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Rf = D([ 32, 32, 32, 32, 102, 100, 46, 100, 101, 110, 115, 105, 116, 121, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Zf = D([ 32, 32, 32, 32, 102, 100, 46, 105, 115, 83, 101, 110, 115, 111, 114, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.bg = D([ 32, 32, 32, 32, 102, 100, 46, 102, 105, 108, 116, 101, 114, 46, 99, 97, 116, 101, 103, 111, 114, 121, 66, 105, 116, 115, 32, 61, 32, 117, 105, 110, 116, 49, 54, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.hg = D([ 32, 32, 32, 32, 102, 100, 46, 102, 105, 108, 116, 101, 114, 46, 109, 97, 115, 107, 66, 105, 116, 115, 32, 61, 32, 117, 105, 110, 116, 49, 54, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.wd = D([ 32, 32, 32, 32, 102, 100, 46, 102, 105, 108, 116, 101, 114, 46, 103, 114, 111, 117, 112, 73, 110, 100, 101, 120, 32, 61, 32, 105, 110, 116, 49, 54, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Cd = D([ 32, 32, 32, 32, 98, 50, 67, 105, 114, 99, 108, 101, 83, 104, 97, 112, 101, 32, 115, 104, 97, 112, 101, 59, 10, 0 ], "i8", x);

O.zb = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 114, 97, 100, 105, 117, 115, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Rd = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 112, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.Wd = D([ 32, 32, 32, 32, 98, 50, 69, 100, 103, 101, 83, 104, 97, 112, 101, 32, 115, 104, 97, 112, 101, 59, 10, 0 ], "i8", x);

O.ae = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 118, 101, 114, 116, 101, 120, 48, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.ge = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 118, 101, 114, 116, 101, 120, 49, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.ke = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 118, 101, 114, 116, 101, 120, 50, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.pe = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 118, 101, 114, 116, 101, 120, 51, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.se = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 104, 97, 115, 86, 101, 114, 116, 101, 120, 48, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.ue = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 104, 97, 115, 86, 101, 114, 116, 101, 120, 51, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.xe = D([ 32, 32, 32, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 115, 104, 97, 112, 101, 59, 10, 0 ], "i8", x);

O.Kb = D([ 32, 32, 32, 32, 98, 50, 86, 101, 99, 50, 32, 118, 115, 91, 37, 100, 93, 59, 10, 0 ], "i8", x);

O.Lb = D([ 32, 32, 32, 32, 118, 115, 91, 37, 100, 93, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.Ne = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 83, 101, 116, 40, 118, 115, 44, 32, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Qe = D([ 32, 32, 32, 32, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 32, 115, 104, 97, 112, 101, 59, 10, 0 ], "i8", x);

O.Ue = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 67, 114, 101, 97, 116, 101, 67, 104, 97, 105, 110, 40, 118, 115, 44, 32, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Ye = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 112, 114, 101, 118, 86, 101, 114, 116, 101, 120, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.bf = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 110, 101, 120, 116, 86, 101, 114, 116, 101, 120, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.ef = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 104, 97, 115, 80, 114, 101, 118, 86, 101, 114, 116, 101, 120, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.hf = D([ 32, 32, 32, 32, 115, 104, 97, 112, 101, 46, 109, 95, 104, 97, 115, 78, 101, 120, 116, 86, 101, 114, 116, 101, 120, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.Ya = D([ 10, 0 ], "i8", x);

O.mf = D([ 32, 32, 32, 32, 102, 100, 46, 115, 104, 97, 112, 101, 32, 61, 32, 38, 115, 104, 97, 112, 101, 59, 10, 0 ], "i8", x);

O.qf = D([ 32, 32, 32, 32, 98, 111, 100, 105, 101, 115, 91, 37, 100, 93, 45, 62, 67, 114, 101, 97, 116, 101, 70, 105, 120, 116, 117, 114, 101, 40, 38, 102, 100, 41, 59, 10, 0 ], "i8", x);

O.Eb = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 73, 115, 108, 97, 110, 100, 46, 99, 112, 112, 0 ], "i8", x);

O.tb = D([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 83, 111, 108, 118, 101, 84, 79, 73, 40, 99, 111, 110, 115, 116, 32, 98, 50, 84, 105, 109, 101, 83, 116, 101, 112, 32, 38, 44, 32, 105, 110, 116, 51, 50, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Id = D([ 116, 111, 105, 73, 110, 100, 101, 120, 65, 32, 60, 32, 109, 95, 98, 111, 100, 121, 67, 111, 117, 110, 116, 0 ], "i8", x);

O.ye = D([ 116, 111, 105, 73, 110, 100, 101, 120, 66, 32, 60, 32, 109, 95, 98, 111, 100, 121, 67, 111, 117, 110, 116, 0 ], "i8", x);

O.t = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 87, 111, 114, 108, 100, 46, 99, 112, 112, 0 ], "i8", x);

O.dd = D([ 98, 50, 66, 111, 100, 121, 32, 42, 98, 50, 87, 111, 114, 108, 100, 58, 58, 67, 114, 101, 97, 116, 101, 66, 111, 100, 121, 40, 99, 111, 110, 115, 116, 32, 98, 50, 66, 111, 100, 121, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.pa = D([ 73, 115, 76, 111, 99, 107, 101, 100, 40, 41, 32, 61, 61, 32, 102, 97, 108, 115, 101, 0 ], "i8", x);

O.qb = D([ 118, 111, 105, 100, 32, 98, 50, 87, 111, 114, 108, 100, 58, 58, 68, 101, 115, 116, 114, 111, 121, 66, 111, 100, 121, 40, 98, 50, 66, 111, 100, 121, 32, 42, 41, 0 ], "i8", x);

O.ze = D([ 109, 95, 98, 111, 100, 121, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", x);

O.ed = D([ 98, 50, 74, 111, 105, 110, 116, 32, 42, 98, 50, 87, 111, 114, 108, 100, 58, 58, 67, 114, 101, 97, 116, 101, 74, 111, 105, 110, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 74, 111, 105, 110, 116, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.rb = D([ 118, 111, 105, 100, 32, 98, 50, 87, 111, 114, 108, 100, 58, 58, 68, 101, 115, 116, 114, 111, 121, 74, 111, 105, 110, 116, 40, 98, 50, 74, 111, 105, 110, 116, 32, 42, 41, 0 ], "i8", x);

O.lf = D([ 109, 95, 106, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", x);

O.Ha = D([ 118, 111, 105, 100, 32, 98, 50, 87, 111, 114, 108, 100, 58, 58, 83, 111, 108, 118, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 84, 105, 109, 101, 83, 116, 101, 112, 32, 38, 41, 0 ], "i8", x);

O.Bf = D([ 98, 45, 62, 73, 115, 65, 99, 116, 105, 118, 101, 40, 41, 32, 61, 61, 32, 116, 114, 117, 101, 0 ], "i8", x);

O.Qb = D([ 115, 116, 97, 99, 107, 67, 111, 117, 110, 116, 32, 60, 32, 115, 116, 97, 99, 107, 83, 105, 122, 101, 0 ], "i8", x);

O.sb = D([ 118, 111, 105, 100, 32, 98, 50, 87, 111, 114, 108, 100, 58, 58, 83, 111, 108, 118, 101, 84, 79, 73, 40, 99, 111, 110, 115, 116, 32, 98, 50, 84, 105, 109, 101, 83, 116, 101, 112, 32, 38, 41, 0 ], "i8", x);

O.Sf = D([ 116, 121, 112, 101, 65, 32, 61, 61, 32, 98, 50, 95, 100, 121, 110, 97, 109, 105, 99, 66, 111, 100, 121, 32, 124, 124, 32, 116, 121, 112, 101, 66, 32, 61, 61, 32, 98, 50, 95, 100, 121, 110, 97, 109, 105, 99, 66, 111, 100, 121, 0 ], "i8", x);

O.T = D([ 97, 108, 112, 104, 97, 48, 32, 60, 32, 49, 46, 48, 102, 0 ], "i8", x);

O.fd = D([ 118, 111, 105, 100, 32, 98, 50, 87, 111, 114, 108, 100, 58, 58, 68, 114, 97, 119, 83, 104, 97, 112, 101, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 67, 111, 108, 111, 114, 32, 38, 41, 0 ], "i8", x);

O.cg = D([ 118, 101, 114, 116, 101, 120, 67, 111, 117, 110, 116, 32, 60, 61, 32, 56, 0 ], "i8", x);

O.ig = D([ 98, 50, 86, 101, 99, 50, 32, 103, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.xd = D([ 109, 95, 119, 111, 114, 108, 100, 45, 62, 83, 101, 116, 71, 114, 97, 118, 105, 116, 121, 40, 103, 41, 59, 10, 0 ], "i8", x);

O.Dd = D([ 98, 50, 66, 111, 100, 121, 42, 42, 32, 98, 111, 100, 105, 101, 115, 32, 61, 32, 40, 98, 50, 66, 111, 100, 121, 42, 42, 41, 98, 50, 65, 108, 108, 111, 99, 40, 37, 100, 32, 42, 32, 115, 105, 122, 101, 111, 102, 40, 98, 50, 66, 111, 100, 121, 42, 41, 41, 59, 10, 0 ], "i8", x);

O.Md = D([ 98, 50, 74, 111, 105, 110, 116, 42, 42, 32, 106, 111, 105, 110, 116, 115, 32, 61, 32, 40, 98, 50, 74, 111, 105, 110, 116, 42, 42, 41, 98, 50, 65, 108, 108, 111, 99, 40, 37, 100, 32, 42, 32, 115, 105, 122, 101, 111, 102, 40, 98, 50, 74, 111, 105, 110, 116, 42, 41, 41, 59, 10, 0 ], "i8", x);

O.Pa = D([ 123, 10, 0 ], "i8", x);

O.Qa = D([ 125, 10, 0 ], "i8", x);

O.be = D([ 98, 50, 70, 114, 101, 101, 40, 106, 111, 105, 110, 116, 115, 41, 59, 10, 0 ], "i8", x);

O.he = D([ 98, 50, 70, 114, 101, 101, 40, 98, 111, 100, 105, 101, 115, 41, 59, 10, 0 ], "i8", x);

O.le = D([ 106, 111, 105, 110, 116, 115, 32, 61, 32, 78, 85, 76, 76, 59, 10, 0 ], "i8", x);

O.qe = D([ 98, 111, 100, 105, 101, 115, 32, 61, 32, 78, 85, 76, 76, 59, 10, 0 ], "i8", x);

O.p = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 46, 104, 0 ], "i8", x);

O.od = D([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 82, 97, 121, 67, 97, 115, 116, 40, 98, 50, 87, 111, 114, 108, 100, 82, 97, 121, 67, 97, 115, 116, 87, 114, 97, 112, 112, 101, 114, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 82, 97, 121, 67, 97, 115, 116, 73, 110, 112, 117, 116, 32, 38, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", x);

O.ve = D([ 114, 46, 76, 101, 110, 103, 116, 104, 83, 113, 117, 97, 114, 101, 100, 40, 41, 32, 62, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.aa = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 109, 109, 111, 110, 47, 98, 50, 77, 97, 116, 104, 46, 104, 0 ], "i8", x);

O.X = D([ 118, 111, 105, 100, 32, 98, 50, 83, 119, 101, 101, 112, 58, 58, 65, 100, 118, 97, 110, 99, 101, 40, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.J = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 73, 115, 108, 97, 110, 100, 46, 104, 0 ], "i8", x);

O.gd = D([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 65, 100, 100, 40, 98, 50, 74, 111, 105, 110, 116, 32, 42, 41, 0 ], "i8", x);

O.Ve = D([ 109, 95, 106, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 60, 32, 109, 95, 106, 111, 105, 110, 116, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.Ia = D([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 65, 100, 100, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 32, 42, 41, 0 ], "i8", x);

O.Va = D([ 109, 95, 99, 111, 110, 116, 97, 99, 116, 67, 111, 117, 110, 116, 32, 60, 32, 109, 95, 99, 111, 110, 116, 97, 99, 116, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

O.ma = D([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 65, 100, 100, 40, 98, 50, 66, 111, 100, 121, 32, 42, 41, 0 ], "i8", x);

O.Aa = D([ 109, 95, 98, 111, 100, 121, 67, 111, 117, 110, 116, 32, 60, 32, 109, 95, 98, 111, 100, 121, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", x);

dN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 116, 0, 0, 0, 118, 0, 0, 0, 120, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.tc = D([ 49, 53, 98, 50, 67, 111, 110, 116, 97, 99, 116, 70, 105, 108, 116, 101, 114, 0 ], "i8", x);

eN = D(8, "*", x);

fN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 122, 0, 0, 0, 124, 0, 0, 0, 126, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.ta = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.ha = D([ 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Bc = D([ 50, 51, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

O.Ic = D([ 57, 98, 50, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

gN = D(8, "*", x);

hN = D(12, "*", x);

iN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 130, 0, 0, 0, 132, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.ua = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.ja = D([ 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.qa = D([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 99, 104, 97, 105, 110, 0 ], "i8", x);

O.Dc = D([ 50, 52, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

jN = D(12, "*", x);

kN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 134, 0, 0, 0, 136, 0, 0, 0, 138, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.va = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.ea = D([ 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", x);

O.Ab = D([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 99, 105, 114, 99, 108, 101, 0 ], "i8", x);

O.sc = D([ 49, 53, 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

lN = D(12, "*", x);

cp = D(192, [ "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0 ], x);

bp = D(1, "i8", x);

O.Z = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.xg = D([ 115, 116, 97, 116, 105, 99, 32, 118, 111, 105, 100, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 58, 58, 65, 100, 100, 84, 121, 112, 101, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 67, 114, 101, 97, 116, 101, 70, 99, 110, 32, 42, 44, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 68, 101, 115, 116, 114, 111, 121, 70, 99, 110, 32, 42, 44, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 84, 121, 112, 101, 44, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 84, 121, 112, 101, 41, 0 ], "i8", x);

O.Ld = D([ 48, 32, 60, 61, 32, 116, 121, 112, 101, 49, 32, 38, 38, 32, 116, 121, 112, 101, 49, 32, 60, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 116, 121, 112, 101, 67, 111, 117, 110, 116, 0 ], "i8", x);

O.Ce = D([ 48, 32, 60, 61, 32, 116, 121, 112, 101, 50, 32, 38, 38, 32, 116, 121, 112, 101, 50, 32, 60, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 116, 121, 112, 101, 67, 111, 117, 110, 116, 0 ], "i8", x);

O.ub = D([ 115, 116, 97, 116, 105, 99, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 32, 42, 98, 50, 67, 111, 110, 116, 97, 99, 116, 58, 58, 67, 114, 101, 97, 116, 101, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", x);

O.Ja = D([ 115, 116, 97, 116, 105, 99, 32, 118, 111, 105, 100, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 58, 58, 68, 101, 115, 116, 114, 111, 121, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 32, 42, 44, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", x);

O.nf = D([ 115, 95, 105, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 32, 61, 61, 32, 116, 114, 117, 101, 0 ], "i8", x);

O.Pb = D([ 48, 32, 60, 61, 32, 116, 121, 112, 101, 65, 32, 38, 38, 32, 116, 121, 112, 101, 66, 32, 60, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 116, 121, 112, 101, 67, 111, 117, 110, 116, 0 ], "i8", x);

mN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 140, 0, 0, 0, 142, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.$ = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 46, 99, 112, 112, 0 ], "i8", x);

O.Uc = D([ 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 58, 58, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.Nd = D([ 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", x);

O.Tc = D([ 118, 111, 105, 100, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 86, 101, 108, 111, 99, 105, 116, 121, 67, 111, 110, 115, 116, 114, 97, 105, 110, 116, 115, 40, 41, 0 ], "i8", x);

O.De = D([ 109, 97, 110, 105, 102, 111, 108, 100, 45, 62, 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", x);

O.lb = D([ 118, 111, 105, 100, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 58, 58, 83, 111, 108, 118, 101, 86, 101, 108, 111, 99, 105, 116, 121, 67, 111, 110, 115, 116, 114, 97, 105, 110, 116, 115, 40, 41, 0 ], "i8", x);

O.of = D([ 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 61, 61, 32, 49, 32, 124, 124, 32, 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 61, 61, 32, 50, 0 ], "i8", x);

O.Cf = D([ 97, 46, 120, 32, 62, 61, 32, 48, 46, 48, 102, 32, 38, 38, 32, 97, 46, 121, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.Xc = D([ 118, 111, 105, 100, 32, 98, 50, 80, 111, 115, 105, 116, 105, 111, 110, 83, 111, 108, 118, 101, 114, 77, 97, 110, 105, 102, 111, 108, 100, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 80, 111, 115, 105, 116, 105, 111, 110, 67, 111, 110, 115, 116, 114, 97, 105, 110, 116, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", x);

O.Mf = D([ 112, 99, 45, 62, 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", x);

nN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 144, 0, 0, 0, 146, 0, 0, 0, 148, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.wa = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.ga = D([ 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", x);

O.Ac = D([ 50, 50, 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

oN = D(12, "*", x);

pN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 150, 0, 0, 0, 152, 0, 0, 0, 154, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.xa = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.ia = D([ 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", x);

O.ra = D([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 101, 100, 103, 101, 0 ], "i8", x);

O.Cc = D([ 50, 51, 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

qN = D(12, "*", x);

rN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 156, 0, 0, 0, 158, 0, 0, 0, 160, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.ya = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.ka = D([ 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", x);

O.I = D([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 66, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 99, 105, 114, 99, 108, 101, 0 ], "i8", x);

O.Ec = D([ 50, 53, 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

sN = D(12, "*", x);

tN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 0, 164, 0, 0, 0, 166, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.za = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.fa = D([ 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", x);

O.sa = D([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 112, 111, 108, 121, 103, 111, 110, 0 ], "i8", x);

O.S = D([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 66, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 112, 111, 108, 121, 103, 111, 110, 0 ], "i8", x);

O.xc = D([ 49, 54, 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", x);

uN = D(12, "*", x);

nq = D([ 0, 0, 0, 0, 0, 0, 0, 0, 168, 0, 0, 0, 170, 0, 0, 0, 172, 0, 0, 0, 174, 0, 0, 0, 176, 0, 0, 0, 178, 0, 0, 0, 180, 0, 0, 0, 182, 0, 0, 0, 184, 0, 0, 0, 186, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.$e = D([ 32, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.Uf = D([ 32, 32, 106, 100, 46, 108, 101, 110, 103, 116, 104, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.uc = D([ 49, 53, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 74, 111, 105, 110, 116, 0 ], "i8", x);

O.Gc = D([ 55, 98, 50, 74, 111, 105, 110, 116, 0 ], "i8", x);

vN = D(8, "*", x);

wN = D(12, "*", x);

Dr = D([ 0, 0, 0, 0, 0, 0, 0, 0, 188, 0, 0, 0, 190, 0, 0, 0, 192, 0, 0, 0, 194, 0, 0, 0, 196, 0, 0, 0, 198, 0, 0, 0, 200, 0, 0, 0, 202, 0, 0, 0, 204, 0, 0, 0, 206, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Eg = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 74, 111, 105, 110, 116, 115, 47, 98, 50, 70, 114, 105, 99, 116, 105, 111, 110, 74, 111, 105, 110, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.sg = D([ 118, 111, 105, 100, 32, 98, 50, 70, 114, 105, 99, 116, 105, 111, 110, 74, 111, 105, 110, 116, 58, 58, 83, 101, 116, 77, 97, 120, 70, 111, 114, 99, 101, 40, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.yg = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 102, 111, 114, 99, 101, 41, 32, 38, 38, 32, 102, 111, 114, 99, 101, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.tg = D([ 118, 111, 105, 100, 32, 98, 50, 70, 114, 105, 99, 116, 105, 111, 110, 74, 111, 105, 110, 116, 58, 58, 83, 101, 116, 77, 97, 120, 84, 111, 114, 113, 117, 101, 40, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.Cg = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 116, 111, 114, 113, 117, 101, 41, 32, 38, 38, 32, 116, 111, 114, 113, 117, 101, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.pf = D([ 32, 32, 98, 50, 70, 114, 105, 99, 116, 105, 111, 110, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.jg = D([ 32, 32, 106, 100, 46, 109, 97, 120, 70, 111, 114, 99, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.yd = D([ 32, 32, 106, 100, 46, 109, 97, 120, 84, 111, 114, 113, 117, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.vc = D([ 49, 53, 98, 50, 70, 114, 105, 99, 116, 105, 111, 110, 74, 111, 105, 110, 116, 0 ], "i8", x);

xN = D(12, "*", x);

Ur = D([ 0, 0, 0, 0, 0, 0, 0, 0, 208, 0, 0, 0, 210, 0, 0, 0, 212, 0, 0, 0, 214, 0, 0, 0, 216, 0, 0, 0, 218, 0, 0, 0, 220, 0, 0, 0, 222, 0, 0, 0, 224, 0, 0, 0, 226, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Mb = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 74, 111, 105, 110, 116, 115, 47, 98, 50, 71, 101, 97, 114, 74, 111, 105, 110, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.fb = D([ 98, 50, 71, 101, 97, 114, 74, 111, 105, 110, 116, 58, 58, 98, 50, 71, 101, 97, 114, 74, 111, 105, 110, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 71, 101, 97, 114, 74, 111, 105, 110, 116, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.Qd = D([ 109, 95, 116, 121, 112, 101, 65, 32, 61, 61, 32, 101, 95, 114, 101, 118, 111, 108, 117, 116, 101, 74, 111, 105, 110, 116, 32, 124, 124, 32, 109, 95, 116, 121, 112, 101, 65, 32, 61, 61, 32, 101, 95, 112, 114, 105, 115, 109, 97, 116, 105, 99, 74, 111, 105, 110, 116, 0 ], "i8", x);

O.Fe = D([ 109, 95, 116, 121, 112, 101, 66, 32, 61, 61, 32, 101, 95, 114, 101, 118, 111, 108, 117, 116, 101, 74, 111, 105, 110, 116, 32, 124, 124, 32, 109, 95, 116, 121, 112, 101, 66, 32, 61, 61, 32, 101, 95, 112, 114, 105, 115, 109, 97, 116, 105, 99, 74, 111, 105, 110, 116, 0 ], "i8", x);

O.rg = D([ 118, 111, 105, 100, 32, 98, 50, 71, 101, 97, 114, 74, 111, 105, 110, 116, 58, 58, 83, 101, 116, 82, 97, 116, 105, 111, 40, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.Fg = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 114, 97, 116, 105, 111, 41, 0 ], "i8", x);

O.Df = D([ 32, 32, 98, 50, 71, 101, 97, 114, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.dg = D([ 32, 32, 106, 100, 46, 106, 111, 105, 110, 116, 49, 32, 61, 32, 106, 111, 105, 110, 116, 115, 91, 37, 100, 93, 59, 10, 0 ], "i8", x);

O.kg = D([ 32, 32, 106, 100, 46, 106, 111, 105, 110, 116, 50, 32, 61, 32, 106, 111, 105, 110, 116, 115, 91, 37, 100, 93, 59, 10, 0 ], "i8", x);

O.jc = D([ 49, 49, 98, 50, 71, 101, 97, 114, 74, 111, 105, 110, 116, 0 ], "i8", x);

yN = D(12, "*", x);

O.o = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 74, 111, 105, 110, 116, 115, 47, 98, 50, 74, 111, 105, 110, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.bd = D([ 115, 116, 97, 116, 105, 99, 32, 98, 50, 74, 111, 105, 110, 116, 32, 42, 98, 50, 74, 111, 105, 110, 116, 58, 58, 67, 114, 101, 97, 116, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 74, 111, 105, 110, 116, 68, 101, 102, 32, 42, 44, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", x);

O.k = D([ 102, 97, 108, 115, 101, 0 ], "i8", x);

O.cd = D([ 115, 116, 97, 116, 105, 99, 32, 118, 111, 105, 100, 32, 98, 50, 74, 111, 105, 110, 116, 58, 58, 68, 101, 115, 116, 114, 111, 121, 40, 98, 50, 74, 111, 105, 110, 116, 32, 42, 44, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", x);

mq = D([ 0, 0, 0, 0, 0, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 228, 0, 0, 0, 230, 0, 0, 0, 232, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0, 102, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.r = D([ 98, 50, 74, 111, 105, 110, 116, 58, 58, 98, 50, 74, 111, 105, 110, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 74, 111, 105, 110, 116, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.s = D([ 100, 101, 102, 45, 62, 98, 111, 100, 121, 65, 32, 33, 61, 32, 100, 101, 102, 45, 62, 98, 111, 100, 121, 66, 0 ], "i8", x);

O.rf = D([ 47, 47, 32, 68, 117, 109, 112, 32, 105, 115, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 102, 111, 114, 32, 116, 104, 105, 115, 32, 106, 111, 105, 110, 116, 32, 116, 121, 112, 101, 46, 10, 0 ], "i8", x);

Vr = D([ 0, 0, 0, 0, 0, 0, 0, 0, 234, 0, 0, 0, 236, 0, 0, 0, 238, 0, 0, 0, 240, 0, 0, 0, 242, 0, 0, 0, 244, 0, 0, 0, 246, 0, 0, 0, 248, 0, 0, 0, 250, 0, 0, 0, 252, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.ba = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 74, 111, 105, 110, 116, 115, 47, 98, 50, 77, 111, 117, 115, 101, 74, 111, 105, 110, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.da = D([ 98, 50, 77, 111, 117, 115, 101, 74, 111, 105, 110, 116, 58, 58, 98, 50, 77, 111, 117, 115, 101, 74, 111, 105, 110, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 77, 111, 117, 115, 101, 74, 111, 105, 110, 116, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.Td = D([ 100, 101, 102, 45, 62, 116, 97, 114, 103, 101, 116, 46, 73, 115, 86, 97, 108, 105, 100, 40, 41, 0 ], "i8", x);

O.He = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 100, 101, 102, 45, 62, 109, 97, 120, 70, 111, 114, 99, 101, 41, 32, 38, 38, 32, 100, 101, 102, 45, 62, 109, 97, 120, 70, 111, 114, 99, 101, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.sf = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 100, 101, 102, 45, 62, 102, 114, 101, 113, 117, 101, 110, 99, 121, 72, 122, 41, 32, 38, 38, 32, 100, 101, 102, 45, 62, 102, 114, 101, 113, 117, 101, 110, 99, 121, 72, 122, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.Ef = D([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 100, 101, 102, 45, 62, 100, 97, 109, 112, 105, 110, 103, 82, 97, 116, 105, 111, 41, 32, 38, 38, 32, 100, 101, 102, 45, 62, 100, 97, 109, 112, 105, 110, 103, 82, 97, 116, 105, 111, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.Qc = D([ 118, 105, 114, 116, 117, 97, 108, 32, 118, 111, 105, 100, 32, 98, 50, 77, 111, 117, 115, 101, 74, 111, 105, 110, 116, 58, 58, 73, 110, 105, 116, 86, 101, 108, 111, 99, 105, 116, 121, 67, 111, 110, 115, 116, 114, 97, 105, 110, 116, 115, 40, 99, 111, 110, 115, 116, 32, 98, 50, 83, 111, 108, 118, 101, 114, 68, 97, 116, 97, 32, 38, 41, 0 ], "i8", x);

O.Nf = D([ 100, 32, 43, 32, 104, 32, 42, 32, 107, 32, 62, 32, 49, 46, 49, 57, 50, 48, 57, 50, 57, 48, 69, 45, 48, 55, 70, 0 ], "i8", x);

O.nc = D([ 49, 50, 98, 50, 77, 111, 117, 115, 101, 74, 111, 105, 110, 116, 0 ], "i8", x);

zN = D(12, "*", x);

O.Vf = D([ 77, 111, 117, 115, 101, 32, 106, 111, 105, 110, 116, 32, 100, 117, 109, 112, 105, 110, 103, 32, 105, 115, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 46, 10, 0 ], "i8", x);

Wr = D([ 0, 0, 0, 0, 0, 0, 0, 0, 254, 0, 0, 0, 256, 0, 0, 0, 258, 0, 0, 0, 260, 0, 0, 0, 262, 0, 0, 0, 264, 0, 0, 0, 266, 0, 0, 0, 268, 0, 0, 0, 270, 0, 0, 0, 272, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Gg = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 74, 111, 105, 110, 116, 115, 47, 98, 50, 80, 114, 105, 115, 109, 97, 116, 105, 99, 74, 111, 105, 110, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.vg = D([ 118, 111, 105, 100, 32, 98, 50, 80, 114, 105, 115, 109, 97, 116, 105, 99, 74, 111, 105, 110, 116, 58, 58, 83, 101, 116, 76, 105, 109, 105, 116, 115, 40, 102, 108, 111, 97, 116, 51, 50, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.Ie = D([ 32, 32, 98, 50, 80, 114, 105, 115, 109, 97, 116, 105, 99, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.Ed = D([ 32, 32, 106, 100, 46, 108, 111, 119, 101, 114, 84, 114, 97, 110, 115, 108, 97, 116, 105, 111, 110, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Od = D([ 32, 32, 106, 100, 46, 117, 112, 112, 101, 114, 84, 114, 97, 110, 115, 108, 97, 116, 105, 111, 110, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.de = D([ 32, 32, 106, 100, 46, 109, 97, 120, 77, 111, 116, 111, 114, 70, 111, 114, 99, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.yc = D([ 49, 54, 98, 50, 80, 114, 105, 115, 109, 97, 116, 105, 99, 74, 111, 105, 110, 116, 0 ], "i8", x);

AN = D(12, "*", x);

O.Ob = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 74, 111, 105, 110, 116, 115, 47, 98, 50, 80, 117, 108, 108, 101, 121, 74, 111, 105, 110, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.Vc = D([ 118, 111, 105, 100, 32, 98, 50, 80, 117, 108, 108, 101, 121, 74, 111, 105, 110, 116, 68, 101, 102, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 40, 98, 50, 66, 111, 100, 121, 32, 42, 44, 32, 98, 50, 66, 111, 100, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.Ud = D([ 114, 97, 116, 105, 111, 32, 62, 32, 49, 46, 49, 57, 50, 48, 57, 50, 57, 48, 69, 45, 48, 55, 70, 0 ], "i8", x);

Yr = D([ 0, 0, 0, 0, 0, 0, 0, 0, 274, 0, 0, 0, 276, 0, 0, 0, 278, 0, 0, 0, 280, 0, 0, 0, 282, 0, 0, 0, 284, 0, 0, 0, 286, 0, 0, 0, 288, 0, 0, 0, 290, 0, 0, 0, 292, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Sc = D([ 98, 50, 80, 117, 108, 108, 101, 121, 74, 111, 105, 110, 116, 58, 58, 98, 50, 80, 117, 108, 108, 101, 121, 74, 111, 105, 110, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 80, 117, 108, 108, 101, 121, 74, 111, 105, 110, 116, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.Je = D([ 100, 101, 102, 45, 62, 114, 97, 116, 105, 111, 32, 33, 61, 32, 48, 46, 48, 102, 0 ], "i8", x);

O.tf = D([ 32, 32, 98, 50, 80, 117, 108, 108, 101, 121, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.$f = D([ 32, 32, 106, 100, 46, 103, 114, 111, 117, 110, 100, 65, 110, 99, 104, 111, 114, 65, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.eg = D([ 32, 32, 106, 100, 46, 103, 114, 111, 117, 110, 100, 65, 110, 99, 104, 111, 114, 66, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.Fd = D([ 32, 32, 106, 100, 46, 108, 101, 110, 103, 116, 104, 65, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Pd = D([ 32, 32, 106, 100, 46, 108, 101, 110, 103, 116, 104, 66, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Db = D([ 32, 32, 106, 100, 46, 114, 97, 116, 105, 111, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.qc = D([ 49, 51, 98, 50, 80, 117, 108, 108, 101, 121, 74, 111, 105, 110, 116, 0 ], "i8", x);

BN = D(12, "*", x);

Zr = D([ 0, 0, 0, 0, 0, 0, 0, 0, 294, 0, 0, 0, 296, 0, 0, 0, 298, 0, 0, 0, 300, 0, 0, 0, 302, 0, 0, 0, 304, 0, 0, 0, 306, 0, 0, 0, 308, 0, 0, 0, 310, 0, 0, 0, 312, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Ig = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 74, 111, 105, 110, 116, 115, 47, 98, 50, 82, 101, 118, 111, 108, 117, 116, 101, 74, 111, 105, 110, 116, 46, 99, 112, 112, 0 ], "i8", x);

O.ug = D([ 118, 111, 105, 100, 32, 98, 50, 82, 101, 118, 111, 108, 117, 116, 101, 74, 111, 105, 110, 116, 58, 58, 83, 101, 116, 76, 105, 109, 105, 116, 115, 40, 102, 108, 111, 97, 116, 51, 50, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", x);

O.Ag = D([ 108, 111, 119, 101, 114, 32, 60, 61, 32, 117, 112, 112, 101, 114, 0 ], "i8", x);

O.Ke = D([ 32, 32, 98, 50, 82, 101, 118, 111, 108, 117, 116, 101, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.Wb = D([ 32, 32, 106, 100, 46, 101, 110, 97, 98, 108, 101, 76, 105, 109, 105, 116, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.zd = D([ 32, 32, 106, 100, 46, 108, 111, 119, 101, 114, 65, 110, 103, 108, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Gd = D([ 32, 32, 106, 100, 46, 117, 112, 112, 101, 114, 65, 110, 103, 108, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.wc = D([ 49, 53, 98, 50, 82, 101, 118, 111, 108, 117, 116, 101, 74, 111, 105, 110, 116, 0 ], "i8", x);

CN = D(12, "*", x);

Er = D([ 0, 0, 0, 0, 0, 0, 0, 0, 314, 0, 0, 0, 316, 0, 0, 0, 318, 0, 0, 0, 320, 0, 0, 0, 322, 0, 0, 0, 324, 0, 0, 0, 326, 0, 0, 0, 328, 0, 0, 0, 330, 0, 0, 0, 332, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.xf = D([ 32, 32, 98, 50, 82, 111, 112, 101, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.Wf = D([ 32, 32, 106, 100, 46, 109, 97, 120, 76, 101, 110, 103, 116, 104, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.kc = D([ 49, 49, 98, 50, 82, 111, 112, 101, 74, 111, 105, 110, 116, 0 ], "i8", x);

DN = D(12, "*", x);

Cr = D([ 0, 0, 0, 0, 0, 0, 0, 0, 334, 0, 0, 0, 336, 0, 0, 0, 338, 0, 0, 0, 340, 0, 0, 0, 342, 0, 0, 0, 344, 0, 0, 0, 346, 0, 0, 0, 348, 0, 0, 0, 350, 0, 0, 0, 352, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.yf = D([ 32, 32, 98, 50, 87, 101, 108, 100, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.Za = D([ 32, 32, 106, 100, 46, 114, 101, 102, 101, 114, 101, 110, 99, 101, 65, 110, 103, 108, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.lc = D([ 49, 49, 98, 50, 87, 101, 108, 100, 74, 111, 105, 110, 116, 0 ], "i8", x);

EN = D(12, "*", x);

ss = D([ 0, 0, 0, 0, 0, 0, 0, 0, 354, 0, 0, 0, 356, 0, 0, 0, 358, 0, 0, 0, 360, 0, 0, 0, 362, 0, 0, 0, 364, 0, 0, 0, 366, 0, 0, 0, 368, 0, 0, 0, 370, 0, 0, 0, 372, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Af = D([ 32, 32, 98, 50, 87, 104, 101, 101, 108, 74, 111, 105, 110, 116, 68, 101, 102, 32, 106, 100, 59, 10, 0 ], "i8", x);

O.A = D([ 32, 32, 106, 100, 46, 98, 111, 100, 121, 65, 32, 61, 32, 98, 111, 100, 105, 101, 115, 91, 37, 100, 93, 59, 10, 0 ], "i8", x);

O.B = D([ 32, 32, 106, 100, 46, 98, 111, 100, 121, 66, 32, 61, 32, 98, 111, 100, 105, 101, 115, 91, 37, 100, 93, 59, 10, 0 ], "i8", x);

O.C = D([ 32, 32, 106, 100, 46, 99, 111, 108, 108, 105, 100, 101, 67, 111, 110, 110, 101, 99, 116, 101, 100, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.K = D([ 32, 32, 106, 100, 46, 108, 111, 99, 97, 108, 65, 110, 99, 104, 111, 114, 65, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.L = D([ 32, 32, 106, 100, 46, 108, 111, 99, 97, 108, 65, 110, 99, 104, 111, 114, 66, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.Ub = D([ 32, 32, 106, 100, 46, 108, 111, 99, 97, 108, 65, 120, 105, 115, 65, 46, 83, 101, 116, 40, 37, 46, 49, 53, 108, 101, 102, 44, 32, 37, 46, 49, 53, 108, 101, 102, 41, 59, 10, 0 ], "i8", x);

O.$a = D([ 32, 32, 106, 100, 46, 101, 110, 97, 98, 108, 101, 77, 111, 116, 111, 114, 32, 61, 32, 98, 111, 111, 108, 40, 37, 100, 41, 59, 10, 0 ], "i8", x);

O.ab = D([ 32, 32, 106, 100, 46, 109, 111, 116, 111, 114, 83, 112, 101, 101, 100, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Xb = D([ 32, 32, 106, 100, 46, 109, 97, 120, 77, 111, 116, 111, 114, 84, 111, 114, 113, 117, 101, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Ma = D([ 32, 32, 106, 100, 46, 102, 114, 101, 113, 117, 101, 110, 99, 121, 72, 122, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.Na = D([ 32, 32, 106, 100, 46, 100, 97, 109, 112, 105, 110, 103, 82, 97, 116, 105, 111, 32, 61, 32, 37, 46, 49, 53, 108, 101, 102, 59, 10, 0 ], "i8", x);

O.z = D([ 32, 32, 106, 111, 105, 110, 116, 115, 91, 37, 100, 93, 32, 61, 32, 109, 95, 119, 111, 114, 108, 100, 45, 62, 67, 114, 101, 97, 116, 101, 74, 111, 105, 110, 116, 40, 38, 106, 100, 41, 59, 10, 0 ], "i8", x);

O.oc = D([ 49, 50, 98, 50, 87, 104, 101, 101, 108, 74, 111, 105, 110, 116, 0 ], "i8", x);

FN = D(12, "*", x);

O.Jg = D([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 82, 111, 112, 101, 47, 98, 50, 82, 111, 112, 101, 46, 99, 112, 112, 0 ], "i8", x);

O.wg = D([ 118, 111, 105, 100, 32, 98, 50, 82, 111, 112, 101, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 82, 111, 112, 101, 68, 101, 102, 32, 42, 41, 0 ], "i8", x);

O.Bg = D([ 100, 101, 102, 45, 62, 99, 111, 117, 110, 116, 32, 62, 61, 32, 51, 0 ], "i8", x);

Kw = D(8, "float", x);

Iw = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

cx = D(8, "float", x);

bx = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

gx = D(8, "float", x);

fx = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

jx = D(8, "float", x);

ix = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

zG = D(8, "float", x);

yG = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

CG = D(8, "float", x);

BG = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

FG = D(8, "float", x);

EG = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

JG = D(8, "float", x);

IG = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

MG = D(8, "float", x);

LG = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

PG = D(8, "float", x);

OG = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

SG = D(8, "float", x);

RG = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

qI = D(8, "float", x);

pI = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

vI = D(8, "float", x);

uI = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

BI = D(12, "float", x);

AI = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

cK = D(8, "float", x);

bK = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

fK = D(8, "float", x);

eK = D(1, [ "i64", 0, 0, 0, "i32", 0, 0, 0 ], x);

D([ 374, 0, 0, 0, 376, 0, 0, 0, 378, 0, 0, 0, 380, 0, 0, 0, 382, 0, 0, 0, 384, 0, 0, 0, 386, 0, 0, 0, 388, 0, 0, 0, 390, 0, 0, 0, 392, 0, 0, 0, 394, 0, 0, 0, 396, 0, 0, 0, 398, 0, 0, 0, 400, 0, 0, 0, 402, 0, 0, 0, 404, 0, 0, 0, 406, 0, 0, 0, 408, 0, 0, 0, 410, 0, 0, 0, 412, 0, 0, 0, 414, 0, 0, 0, 416, 0, 0, 0, 418, 0, 0, 0, 420, 0, 0, 0, 422, 0, 0, 0, 424, 0, 0, 0, 426, 0, 0, 0, 428, 0, 0, 0, 430, 0, 0, 0, 432, 0, 0, 0, 434, 0, 0, 0, 436, 0, 0, 0, 438, 0, 0, 0, 440, 0, 0, 0, 442, 0, 0, 0, 444, 0, 0, 0, 446, 0, 0, 0, 448, 0, 0, 0, 450, 0, 0, 0, 452, 0, 0, 0, 454, 0, 0, 0, 456, 0, 0, 0, 458, 0, 0, 0, 460, 0, 0, 0, 462, 0, 0, 0, 464, 0, 0, 0, 466, 0, 0, 0, 468, 0, 0, 0, 470, 0, 0, 0, 472, 0, 0, 0, 474, 0, 0, 0, 476, 0, 0, 0, 478, 0, 0, 0, 480, 0, 0, 0, 482, 0, 0, 0, 484, 0, 0, 0, 486, 0, 0, 0, 488, 0, 0, 0, 490, 0, 0, 0, 492, 0, 0, 0, 494, 0, 0, 0, 496, 0, 0, 0, 498, 0, 0, 0, 500, 0, 0, 0, 502, 0, 0, 0, 504, 0, 0, 0, 506, 0, 0, 0, 508, 0, 0, 0, 510, 0, 0, 0, 512, 0, 0, 0, 514, 0, 0, 0, 516, 0, 0, 0, 518, 0, 0, 0, 520, 0, 0, 0, 522, 0, 0, 0, 524, 0, 0, 0, 526, 0, 0, 0, 528, 0, 0, 0, 530, 0, 0, 0, 532, 0, 0, 0, 534, 0, 0, 0, 536, 0, 0, 0, 538, 0, 0, 0, 540, 0, 0, 0, 542, 0, 0, 0, 544, 0, 0, 0, 546, 0, 0, 0, 548, 0, 0, 0, 550, 0, 0, 0, 552, 0, 0, 0, 554, 0, 0, 0, 556, 0, 0, 0, 558, 0, 0, 0, 560, 0, 0, 0, 562, 0, 0, 0, 564, 0, 0, 0, 566, 0, 0, 0, 568, 0, 0, 0, 570, 0, 0, 0, 572, 0, 0, 0, 574, 0, 0, 0, 576, 0, 0, 0, 578, 0, 0, 0, 580, 0, 0, 0, 582, 0, 0, 0, 584, 0, 0, 0, 586, 0, 0, 0, 588, 0, 0, 0, 590, 0, 0, 0, 592, 0, 0, 0, 594, 0, 0, 0, 596, 0, 0, 0, 598, 0, 0, 0, 600, 0, 0, 0, 602, 0, 0, 0, 604, 0, 0, 0, 606, 0, 0, 0, 608, 0, 0, 0, 610, 0, 0, 0, 612, 0, 0, 0, 614, 0, 0, 0, 616, 0, 0, 0, 618, 0, 0, 0, 620, 0, 0, 0, 622, 0, 0, 0, 624, 0, 0, 0, 626, 0, 0, 0, 628, 0, 0, 0, 630, 0, 0, 0, 632, 0, 0, 0, 634, 0, 0, 0, 636, 0, 0, 0, 638, 0, 0, 0, 640, 0, 0, 0, 642, 0, 0, 0, 644, 0, 0, 0, 646, 0, 0, 0, 648, 0, 0, 0, 650, 0, 0, 0, 652, 0, 0, 0, 654, 0, 0, 0, 656, 0, 0, 0, 658, 0, 0, 0, 660, 0, 0, 0, 662, 0, 0, 0, 664, 0, 0, 0, 666, 0, 0, 0, 668, 0, 0, 0, 670, 0, 0, 0, 672, 0, 0, 0, 674, 0, 0, 0, 676, 0, 0, 0, 678, 0, 0, 0, 680, 0, 0, 0, 682, 0, 0, 0, 684, 0, 0, 0, 686, 0, 0, 0, 688, 0, 0, 0, 690, 0, 0, 0, 692, 0, 0, 0, 694, 0, 0, 0, 696, 0, 0, 0, 698, 0, 0, 0, 700, 0, 0, 0, 702, 0, 0, 0, 704, 0, 0, 0, 706, 0, 0, 0, 708, 0, 0, 0, 710, 0, 0, 0, 712, 0, 0, 0, 714, 0, 0, 0, 716, 0, 0, 0, 718, 0, 0, 0, 720, 0, 0, 0, 722, 0, 0, 0, 724, 0, 0, 0, 726, 0, 0, 0, 728, 0, 0, 0, 730, 0, 0, 0, 732, 0, 0, 0, 734, 0, 0, 0, 736, 0, 0, 0, 738, 0, 0, 0, 740, 0, 0, 0, 742, 0, 0, 0, 744, 0, 0, 0, 746, 0, 0, 0, 748, 0, 0, 0, 750, 0, 0, 0, 752, 0, 0, 0, 754, 0, 0, 0, 756, 0, 0, 0, 758, 0, 0, 0, 760, 0, 0, 0, 762, 0, 0, 0, 764, 0, 0, 0, 766, 0, 0, 0, 768, 0, 0, 0, 770, 0, 0, 0, 772, 0, 0, 0, 774, 0, 0, 0, 776, 0, 0, 0, 778, 0, 0, 0, 780, 0, 0, 0, 782, 0, 0, 0, 784, 0, 0, 0, 786, 0, 0, 0, 788, 0, 0, 0, 790, 0, 0, 0, 792, 0, 0, 0, 794, 0, 0, 0, 796, 0, 0, 0, 798, 0, 0, 0, 800, 0, 0, 0, 802, 0, 0, 0, 804, 0, 0, 0, 806, 0, 0, 0, 808, 0, 0, 0, 810, 0, 0, 0, 812, 0, 0, 0, 814, 0, 0, 0, 816, 0, 0, 0, 818, 0, 0, 0, 820, 0, 0, 0, 822, 0, 0, 0, 824, 0, 0, 0, 826, 0, 0, 0, 828, 0, 0, 0, 830, 0, 0, 0, 832, 0, 0, 0, 834, 0, 0, 0, 836, 0, 0, 0, 838, 0, 0, 0, 840, 0, 0, 0, 842, 0, 0, 0, 844, 0, 0, 0, 846, 0, 0, 0, 848, 0, 0, 0, 850, 0, 0, 0, 852, 0, 0, 0, 854, 0, 0, 0, 856, 0, 0, 0, 858, 0, 0, 0, 860, 0, 0, 0, 862, 0, 0, 0, 864, 0, 0, 0, 866, 0, 0, 0, 868, 0, 0, 0, 870, 0, 0, 0, 872, 0, 0, 0, 874, 0, 0, 0, 876, 0, 0, 0, 878, 0, 0, 0, 880, 0, 0, 0, 882, 0, 0, 0, 884, 0, 0, 0, 886, 0, 0, 0, 888, 0, 0, 0, 890, 0, 0, 0, 892, 0, 0, 0, 894, 0, 0, 0, 896, 0, 0, 0, 898, 0, 0, 0, 900, 0, 0, 0, 902, 0, 0, 0, 904, 0, 0, 0, 906, 0, 0, 0, 908, 0, 0, 0, 910, 0, 0, 0, 912, 0, 0, 0, 914, 0, 0, 0, 916, 0, 0, 0, 918, 0, 0, 0, 920, 0, 0, 0, 922, 0, 0, 0, 924, 0, 0, 0, 926, 0, 0, 0, 928, 0, 0, 0, 930, 0, 0, 0, 932, 0, 0, 0, 934, 0, 0, 0, 936, 0, 0, 0, 938, 0, 0, 0, 940, 0, 0, 0, 942, 0, 0, 0, 944, 0, 0, 0, 946, 0, 0, 0, 948, 0, 0, 0, 950, 0, 0, 0, 952, 0, 0, 0, 954, 0, 0, 0, 956, 0, 0, 0, 958, 0, 0, 0, 960, 0, 0, 0, 962, 0, 0, 0, 964, 0, 0, 0, 966, 0, 0, 0, 968, 0, 0, 0, 970, 0, 0, 0, 972, 0, 0, 0, 974, 0, 0, 0, 976, 0, 0, 0, 978, 0, 0, 0, 980, 0, 0, 0, 982, 0, 0, 0, 984, 0, 0, 0, 986, 0, 0, 0, 988, 0, 0, 0, 990, 0, 0, 0, 992, 0, 0, 0, 994, 0, 0, 0, 996, 0, 0, 0, 998, 0, 0, 0, 1e3, 0, 0, 0, 1002, 0, 0, 0, 1004, 0, 0, 0, 1006, 0, 0, 0, 1008, 0, 0, 0, 1010, 0, 0, 0, 1012, 0, 0, 0, 1014, 0, 0, 0, 1016, 0, 0, 0, 1018, 0, 0, 0, 1020, 0, 0, 0, 1022, 0, 0, 0, 1024, 0, 0, 0, 1026, 0, 0, 0, 1028, 0, 0, 0, 1030, 0, 0, 0, 1032, 0, 0, 0, 1034, 0, 0, 0, 1036, 0, 0, 0, 1038, 0, 0, 0, 1040, 0, 0, 0, 1042, 0, 0, 0, 1044, 0, 0, 0, 1046, 0, 0, 0, 1048, 0, 0, 0, 1050, 0, 0, 0, 1052, 0, 0, 0, 1054, 0, 0, 0, 1056, 0, 0, 0, 1058, 0, 0, 0, 1060, 0, 0, 0, 1062, 0, 0, 0, 1064, 0, 0, 0, 1066, 0, 0, 0, 1068, 0, 0, 0, 1070, 0, 0, 0, 1072, 0, 0, 0, 1074, 0, 0, 0, 1076, 0, 0, 0, 1078, 0, 0, 0, 1080, 0, 0, 0, 1082, 0, 0, 0, 1084, 0, 0, 0, 1086, 0, 0, 0, 1088, 0, 0, 0, 1090, 0, 0, 0, 1092, 0, 0, 0, 1094, 0, 0, 0, 1096, 0, 0, 0, 1098, 0, 0, 0, 1100, 0, 0, 0, 1102, 0, 0, 0, 1104, 0, 0, 0, 1106, 0, 0, 0, 1108, 0, 0, 0, 1110, 0, 0, 0, 1112, 0, 0, 0, 1114, 0, 0, 0, 1116, 0, 0, 0, 1118, 0, 0, 0, 1120, 0, 0, 0, 1122, 0, 0, 0, 1124, 0, 0, 0, 1126, 0, 0, 0, 1128, 0, 0, 0, 1130, 0, 0, 0, 1132, 0, 0, 0, 1134, 0, 0, 0, 1136, 0, 0, 0, 1138, 0, 0, 0, 1140, 0, 0, 0, 1142, 0, 0, 0, 1144, 0, 0, 0, 1146, 0, 0, 0, 1148, 0, 0, 0, 1150, 0, 0, 0, 1152, 0, 0, 0, 1154, 0, 0, 0, 1156, 0, 0, 0, 1158, 0, 0, 0, 1160, 0, 0, 0, 1162, 0, 0, 0, 1164, 0, 0, 0, 1166, 0, 0, 0, 1168, 0, 0, 0, 1170, 0, 0, 0, 1172, 0, 0, 0, 1174, 0, 0, 0, 1176, 0, 0, 0, 1178, 0, 0, 0, 1180, 0, 0, 0, 1182, 0, 0, 0, 1184, 0, 0, 0, 1186, 0, 0, 0, 1188, 0, 0, 0, 1190, 0, 0, 0, 1192, 0, 0, 0, 1194, 0, 0, 0, 1196, 0, 0, 0, 1198, 0, 0, 0, 1200, 0, 0, 0, 1202, 0, 0, 0, 1204, 0, 0, 0, 1206, 0, 0, 0, 1208, 0, 0, 0, 1210, 0, 0, 0, 1212, 0, 0, 0, 1214, 0, 0, 0, 1216, 0, 0, 0, 1218, 0, 0, 0, 1220, 0, 0, 0, 1222, 0, 0, 0, 1224, 0, 0, 0, 1226, 0, 0, 0, 1228, 0, 0, 0, 1230, 0, 0, 0, 1232, 0, 0, 0, 1234, 0, 0, 0, 1236, 0, 0, 0, 1238, 0, 0, 0, 1240, 0, 0, 0, 1242, 0, 0, 0, 1244, 0, 0, 0, 1246, 0, 0, 0, 1248, 0, 0, 0, 1250, 0, 0, 0, 1252, 0, 0, 0, 1254, 0, 0, 0, 1256, 0, 0, 0, 1258, 0, 0, 0, 1260, 0, 0, 0, 1262, 0, 0, 0, 1264, 0, 0, 0, 1266, 0, 0, 0, 1268, 0, 0, 0, 1270, 0, 0, 0, 1272, 0, 0, 0, 1274, 0, 0, 0, 1276, 0, 0, 0, 1278, 0, 0, 0, 1280, 0, 0, 0, 1282, 0, 0, 0, 1284, 0, 0, 0, 1286, 0, 0, 0, 1288, 0, 0, 0, 1290, 0, 0, 0, 1292, 0, 0, 0, 1294, 0, 0, 0, 1296, 0, 0, 0, 1298, 0, 0, 0, 1300, 0, 0, 0, 1302, 0, 0, 0, 1304, 0, 0, 0, 1306, 0, 0, 0, 1308, 0, 0, 0, 1310, 0, 0, 0, 1312, 0, 0, 0, 1314, 0, 0, 0, 1316, 0, 0, 0, 1318, 0, 0, 0, 1320, 0, 0, 0, 1322, 0, 0, 0, 1324, 0, 0, 0, 1326, 0, 0, 0, 1328, 0, 0, 0, 1330, 0, 0, 0, 1332, 0, 0, 0, 1334, 0, 0, 0, 1336, 0, 0, 0, 1338, 0, 0, 0, 1340, 0, 0, 0, 1342, 0, 0, 0, 1344, 0, 0, 0, 1346, 0, 0, 0, 1348, 0, 0, 0, 1350, 0, 0, 0, 1352, 0, 0, 0, 1354, 0, 0, 0, 1356, 0, 0, 0, 1358, 0, 0, 0, 1360, 0, 0, 0, 1362, 0, 0, 0, 1364, 0, 0, 0, 1366, 0, 0, 0, 1368, 0, 0, 0, 1370, 0, 0, 0, 1372, 0, 0, 0, 1374, 0, 0, 0, 1376, 0, 0, 0, 1378, 0, 0, 0, 1380, 0, 0, 0, 1382, 0, 0, 0, 1384, 0, 0, 0, 1386, 0, 0, 0, 1388, 0, 0, 0, 1390, 0, 0, 0, 1392, 0, 0, 0, 1394, 0, 0, 0, 1396, 0, 0, 0, 1398, 0, 0, 0, 1400, 0, 0, 0, 1402, 0, 0, 0, 1404, 0, 0, 0, 1406, 0, 0, 0, 1408, 0, 0, 0, 1410, 0, 0, 0, 1412, 0, 0, 0, 1414, 0, 0, 0, 1416, 0, 0, 0, 1418, 0, 0, 0, 1420, 0, 0, 0, 1422, 0, 0, 0, 1424, 0, 0, 0, 1426, 0, 0, 0, 1428, 0, 0, 0, 1430, 0, 0, 0, 1432, 0, 0, 0, 1434, 0, 0, 0, 1436, 0, 0, 0, 1438, 0, 0, 0, 1440, 0, 0, 0, 1442, 0, 0, 0, 1444, 0, 0, 0, 1446, 0, 0, 0, 1448, 0, 0, 0, 1450, 0, 0, 0, 1452, 0, 0, 0, 1454, 0, 0, 0, 1456, 0, 0, 0, 1458, 0, 0, 0, 1460, 0, 0, 0, 1462, 0, 0, 0, 1464, 0, 0, 0, 1466, 0, 0, 0, 1468, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

X = D(468, [ "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0 ], x);

nM = D(24, "i32", x);

O.Hg = D([ 109, 97, 120, 32, 115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0 ], "i8", x);

O.zg = D([ 115, 121, 115, 116, 101, 109, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0 ], "i8", x);

O.Dg = D([ 105, 110, 32, 117, 115, 101, 32, 98, 121, 116, 101, 115, 32, 32, 32, 32, 32, 61, 32, 37, 49, 48, 108, 117, 10, 0 ], "i8", x);

D([ 0 ], "i8", x);

rM = D(1, "void ()*", x);

sM = D([ 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 1470, 0, 0, 0, 1472, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.uf = D([ 115, 116, 100, 58, 58, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0 ], "i8", x);

GN = D([ 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 1474, 0, 0, 0, 1476, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], x);

D(1, "void*", x);

O.Yd = D([ 98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0 ], "i8", x);

O.Kc = D([ 83, 116, 57, 98, 97, 100, 95, 97, 108, 108, 111, 99, 0 ], "i8", x);

tM = D(12, "*", x);

O.Jc = D([ 83, 116, 50, 48, 98, 97, 100, 95, 97, 114, 114, 97, 121, 95, 110, 101, 119, 95, 108, 101, 110, 103, 116, 104, 0 ], "i8", x);

HN = D(12, "*", x);

l[dF + 4 >> 2] = WM;

TM = D([ 2, 0, 0, 0, 0 ], [ "i8*", 0, 0, 0, 0 ], x);

UM = D([ 1, 0, 0, 0, 0 ], [ "i8*", 0, 0, 0, 0 ], x);

l[VM >> 2] = UM + 8 | 0;

l[VM + 4 >> 2] = O.Hc | 0;

l[WM >> 2] = TM + 8 | 0;

l[WM + 4 >> 2] = O.mc | 0;

l[WM + 8 >> 2] = VM;

l[Tw + 4 >> 2] = XM;

l[XM >> 2] = TM + 8 | 0;

l[XM + 4 >> 2] = O.pc | 0;

l[XM + 8 >> 2] = VM;

l[FF + 4 >> 2] = YM;

l[YM >> 2] = TM + 8 | 0;

l[YM + 4 >> 2] = O.ic | 0;

l[YM + 8 >> 2] = VM;

l[wF + 4 >> 2] = ZM;

l[ZM >> 2] = TM + 8 | 0;

l[ZM + 4 >> 2] = O.rc | 0;

l[ZM + 8 >> 2] = VM;

l[$M + 4 >> 2] = aN;

l[aN >> 2] = UM + 8 | 0;

l[aN + 4 >> 2] = O.Fc | 0;

l[op >> 2] = dN + 8 | 0;

l[pp >> 2] = bN + 8 | 0;

l[bN + 4 >> 2] = cN;

l[cN >> 2] = UM + 8 | 0;

l[cN + 4 >> 2] = O.zc | 0;

l[dN + 4 >> 2] = eN;

l[eN >> 2] = UM + 8 | 0;

l[eN + 4 >> 2] = O.tc | 0;

l[fN + 4 >> 2] = hN;

l[gN >> 2] = UM + 8 | 0;

l[gN + 4 >> 2] = O.Ic | 0;

l[hN >> 2] = TM + 8 | 0;

l[hN + 4 >> 2] = O.Bc | 0;

l[hN + 8 >> 2] = gN;

l[iN + 4 >> 2] = jN;

l[jN >> 2] = TM + 8 | 0;

l[jN + 4 >> 2] = O.Dc | 0;

l[jN + 8 >> 2] = gN;

l[kN + 4 >> 2] = lN;

l[lN >> 2] = TM + 8 | 0;

l[lN + 4 >> 2] = O.sc | 0;

l[lN + 8 >> 2] = gN;

l[mN + 4 >> 2] = gN;

l[nN + 4 >> 2] = oN;

l[oN >> 2] = TM + 8 | 0;

l[oN + 4 >> 2] = O.Ac | 0;

l[oN + 8 >> 2] = gN;

l[pN + 4 >> 2] = qN;

l[qN >> 2] = TM + 8 | 0;

l[qN + 4 >> 2] = O.Cc | 0;

l[qN + 8 >> 2] = gN;

l[rN + 4 >> 2] = sN;

l[sN >> 2] = TM + 8 | 0;

l[sN + 4 >> 2] = O.Ec | 0;

l[sN + 8 >> 2] = gN;

l[tN + 4 >> 2] = uN;

l[uN >> 2] = TM + 8 | 0;

l[uN + 4 >> 2] = O.xc | 0;

l[uN + 8 >> 2] = gN;

l[nq + 4 >> 2] = wN;

l[vN >> 2] = UM + 8 | 0;

l[vN + 4 >> 2] = O.Gc | 0;

l[wN >> 2] = TM + 8 | 0;

l[wN + 4 >> 2] = O.uc | 0;

l[wN + 8 >> 2] = vN;

l[Dr + 4 >> 2] = xN;

l[xN >> 2] = TM + 8 | 0;

l[xN + 4 >> 2] = O.vc | 0;

l[xN + 8 >> 2] = vN;

l[Ur + 4 >> 2] = yN;

l[yN >> 2] = TM + 8 | 0;

l[yN + 4 >> 2] = O.jc | 0;

l[yN + 8 >> 2] = vN;

l[mq + 4 >> 2] = vN;

l[Vr + 4 >> 2] = zN;

l[zN >> 2] = TM + 8 | 0;

l[zN + 4 >> 2] = O.nc | 0;

l[zN + 8 >> 2] = vN;

l[Wr + 4 >> 2] = AN;

l[AN >> 2] = TM + 8 | 0;

l[AN + 4 >> 2] = O.yc | 0;

l[AN + 8 >> 2] = vN;

l[Yr + 4 >> 2] = BN;

l[BN >> 2] = TM + 8 | 0;

l[BN + 4 >> 2] = O.qc | 0;

l[BN + 8 >> 2] = vN;

l[Zr + 4 >> 2] = CN;

l[CN >> 2] = TM + 8 | 0;

l[CN + 4 >> 2] = O.wc | 0;

l[CN + 8 >> 2] = vN;

l[Er + 4 >> 2] = DN;

l[DN >> 2] = TM + 8 | 0;

l[DN + 4 >> 2] = O.kc | 0;

l[DN + 8 >> 2] = vN;

l[Cr + 4 >> 2] = EN;

l[EN >> 2] = TM + 8 | 0;

l[EN + 4 >> 2] = O.lc | 0;

l[EN + 8 >> 2] = vN;

l[ss + 4 >> 2] = FN;

l[FN >> 2] = TM + 8 | 0;

l[FN + 4 >> 2] = O.oc | 0;

l[FN + 8 >> 2] = vN;

l[sM + 4 >> 2] = tM;

l[GN + 4 >> 2] = HN;

l[tM >> 2] = TM + 8 | 0;

l[tM + 4 >> 2] = O.Kc | 0;

l[tM + 8 >> 2] = ra;

l[HN >> 2] = TM + 8 | 0;

l[HN + 4 >> 2] = O.Jc | 0;

l[HN + 8 >> 2] = tM;

K = [ 0, 0, (function(b, d) {
  var e = l[b >> 2], f = l[d >> 2];
  return (e | 0) < (f | 0) ? 1 : (e | 0) != (f | 0) ? 0 : (l[b + 4 >> 2] | 0) < (l[d + 4 >> 2] | 0);
}), 0, (function(b, d, e, f, g) {
  d = an(g, 144);
  f = d >> 2;
  if (0 == (d | 0)) {
    b = 0;
  } else {
    l[d >> 2] = mN + 8 | 0;
    l[f + 1] = 4;
    l[f + 12] = b;
    g = d + 52 | 0;
    l[g >> 2] = e;
    l[f + 14] = 0;
    l[f + 15] = 0;
    l[f + 31] = 0;
    l[f + 32] = 0;
    for (var h = (d + 8 | 0) >> 2, i = h + 10; h < i; h++) {
      l[h] = 0;
    }
    h = Hh(p[(b + 16 | 0) >> 2] * p[e + 16 >> 2]);
    p[f + 34] = h;
    h = p[b + 20 >> 2];
    i = p[e + 20 >> 2];
    p[f + 35] = h > i ? h : i;
    l[d >> 2] = kN + 8 | 0;
    0 == (l[l[b + 12 >> 2] + 4 >> 2] | 0) ? b = e : (S(O.va | 0, 44, O.ea | 0, O.Ab | 0), b = l[g >> 2]);
    0 != (l[l[b + 12 >> 2] + 4 >> 2] | 0) && S(O.va | 0, 45, O.ea | 0, O.I | 0);
    b = d;
  }
  return b | 0;
}), 0, (function(b, d) {
  K[l[l[b >> 2] + 4 >> 2]](b);
  var e = Gd[bn + 144 | 0], f = e & 255;
  14 > (e & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
  e = (f << 2) + d + 12 | 0;
  l[b >> 2] = l[e >> 2];
  l[e >> 2] = b;
}), 0, (function(b, d, e, f, g) {
  d = an(g, 144);
  f = d >> 2;
  if (0 == (d | 0)) {
    b = 0;
  } else {
    l[d >> 2] = mN + 8 | 0;
    l[f + 1] = 4;
    l[f + 12] = b;
    g = d + 52 | 0;
    l[g >> 2] = e;
    l[f + 14] = 0;
    l[f + 15] = 0;
    l[f + 31] = 0;
    l[f + 32] = 0;
    for (var h = (d + 8 | 0) >> 2, i = h + 10; h < i; h++) {
      l[h] = 0;
    }
    h = Hh(p[(b + 16 | 0) >> 2] * p[e + 16 >> 2]);
    p[f + 34] = h;
    h = p[b + 20 >> 2];
    i = p[e + 20 >> 2];
    p[f + 35] = h > i ? h : i;
    l[d >> 2] = rN + 8 | 0;
    2 == (l[l[b + 12 >> 2] + 4 >> 2] | 0) ? b = e : (S(O.ya | 0, 41, O.ka | 0, O.sa | 0), b = l[g >> 2]);
    0 != (l[l[b + 12 >> 2] + 4 >> 2] | 0) && S(O.ya | 0, 42, O.ka | 0, O.I | 0);
    b = d;
  }
  return b | 0;
}), 0, (function(b, d) {
  K[l[l[b >> 2] + 4 >> 2]](b);
  var e = Gd[bn + 144 | 0], f = e & 255;
  14 > (e & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
  e = (f << 2) + d + 12 | 0;
  l[b >> 2] = l[e >> 2];
  l[e >> 2] = b;
}), 0, (function(b, d, e, f, g) {
  d = an(g, 144);
  f = d >> 2;
  if (0 == (d | 0)) {
    b = 0;
  } else {
    l[d >> 2] = mN + 8 | 0;
    l[f + 1] = 4;
    l[f + 12] = b;
    g = d + 52 | 0;
    l[g >> 2] = e;
    l[f + 14] = 0;
    l[f + 15] = 0;
    l[f + 31] = 0;
    l[f + 32] = 0;
    for (var h = (d + 8 | 0) >> 2, i = h + 10; h < i; h++) {
      l[h] = 0;
    }
    h = Hh(p[(b + 16 | 0) >> 2] * p[e + 16 >> 2]);
    p[f + 34] = h;
    h = p[b + 20 >> 2];
    i = p[e + 20 >> 2];
    p[f + 35] = h > i ? h : i;
    l[d >> 2] = tN + 8 | 0;
    2 == (l[l[b + 12 >> 2] + 4 >> 2] | 0) ? b = e : (S(O.za | 0, 44, O.fa | 0, O.sa | 0), b = l[g >> 2]);
    2 != (l[l[b + 12 >> 2] + 4 >> 2] | 0) && S(O.za | 0, 45, O.fa | 0, O.S | 0);
    b = d;
  }
  return b | 0;
}), 0, (function(b, d) {
  K[l[l[b >> 2] + 4 >> 2]](b);
  var e = Gd[bn + 144 | 0], f = e & 255;
  14 > (e & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
  e = (f << 2) + d + 12 | 0;
  l[b >> 2] = l[e >> 2];
  l[e >> 2] = b;
}), 0, (function(b, d, e, f, g) {
  d = an(g, 144);
  f = d >> 2;
  if (0 == (d | 0)) {
    b = 0;
  } else {
    l[d >> 2] = mN + 8 | 0;
    l[f + 1] = 4;
    l[f + 12] = b;
    g = d + 52 | 0;
    l[g >> 2] = e;
    l[f + 14] = 0;
    l[f + 15] = 0;
    l[f + 31] = 0;
    l[f + 32] = 0;
    for (var h = (d + 8 | 0) >> 2, i = h + 10; h < i; h++) {
      l[h] = 0;
    }
    h = Hh(p[(b + 16 | 0) >> 2] * p[e + 16 >> 2]);
    p[f + 34] = h;
    h = p[b + 20 >> 2];
    i = p[e + 20 >> 2];
    p[f + 35] = h > i ? h : i;
    l[d >> 2] = nN + 8 | 0;
    1 == (l[l[b + 12 >> 2] + 4 >> 2] | 0) ? b = e : (S(O.wa | 0, 41, O.ga | 0, O.ra | 0), b = l[g >> 2]);
    0 != (l[l[b + 12 >> 2] + 4 >> 2] | 0) && S(O.wa | 0, 42, O.ga | 0, O.I | 0);
    b = d;
  }
  return b | 0;
}), 0, (function(b, d) {
  K[l[l[b >> 2] + 4 >> 2]](b);
  var e = Gd[bn + 144 | 0], f = e & 255;
  14 > (e & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
  e = (f << 2) + d + 12 | 0;
  l[b >> 2] = l[e >> 2];
  l[e >> 2] = b;
}), 0, (function(b, d, e, f, g) {
  d = an(g, 144);
  f = d >> 2;
  if (0 == (d | 0)) {
    b = 0;
  } else {
    l[d >> 2] = mN + 8 | 0;
    l[f + 1] = 4;
    l[f + 12] = b;
    g = d + 52 | 0;
    l[g >> 2] = e;
    l[f + 14] = 0;
    l[f + 15] = 0;
    l[f + 31] = 0;
    l[f + 32] = 0;
    for (var h = (d + 8 | 0) >> 2, i = h + 10; h < i; h++) {
      l[h] = 0;
    }
    h = Hh(p[(b + 16 | 0) >> 2] * p[e + 16 >> 2]);
    p[f + 34] = h;
    h = p[b + 20 >> 2];
    i = p[e + 20 >> 2];
    p[f + 35] = h > i ? h : i;
    l[d >> 2] = pN + 8 | 0;
    1 == (l[l[b + 12 >> 2] + 4 >> 2] | 0) ? b = e : (S(O.xa | 0, 41, O.ia | 0, O.ra | 0), b = l[g >> 2]);
    2 != (l[l[b + 12 >> 2] + 4 >> 2] | 0) && S(O.xa | 0, 42, O.ia | 0, O.S | 0);
    b = d;
  }
  return b | 0;
}), 0, (function(b, d) {
  K[l[l[b >> 2] + 4 >> 2]](b);
  var e = Gd[bn + 144 | 0], f = e & 255;
  14 > (e & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
  e = (f << 2) + d + 12 | 0;
  l[b >> 2] = l[e >> 2];
  l[e >> 2] = b;
}), 0, (function(b, d, e, f, g) {
  var h, g = an(g, 144);
  h = g >> 2;
  if (0 == (g | 0)) {
    b = 0;
  } else {
    l[g >> 2] = mN + 8 | 0;
    l[h + 1] = 4;
    l[h + 12] = b;
    var i = g + 52 | 0;
    l[i >> 2] = e;
    l[h + 14] = d;
    l[h + 15] = f;
    l[h + 31] = 0;
    l[h + 32] = 0;
    d = (g + 8 | 0) >> 2;
    for (f = d + 10; d < f; d++) {
      l[d] = 0;
    }
    d = Hh(p[(b + 16 | 0) >> 2] * p[e + 16 >> 2]);
    p[h + 34] = d;
    d = p[b + 20 >> 2];
    f = p[e + 20 >> 2];
    p[h + 35] = d > f ? d : f;
    l[g >> 2] = fN + 8 | 0;
    3 == (l[l[b + 12 >> 2] + 4 >> 2] | 0) ? b = e : (S(O.ta | 0, 43, O.ha | 0, O.qa | 0), b = l[i >> 2]);
    0 != (l[l[b + 12 >> 2] + 4 >> 2] | 0) && S(O.ta | 0, 44, O.ha | 0, O.I | 0);
    b = g;
  }
  return b | 0;
}), 0, (function(b, d) {
  K[l[l[b >> 2] + 4 >> 2]](b);
  var e = Gd[bn + 144 | 0], f = e & 255;
  14 > (e & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
  e = (f << 2) + d + 12 | 0;
  l[b >> 2] = l[e >> 2];
  l[e >> 2] = b;
}), 0, (function(b, d, e, f, g) {
  var h, g = an(g, 144);
  h = g >> 2;
  if (0 == (g | 0)) {
    b = 0;
  } else {
    l[g >> 2] = mN + 8 | 0;
    l[h + 1] = 4;
    l[h + 12] = b;
    var i = g + 52 | 0;
    l[i >> 2] = e;
    l[h + 14] = d;
    l[h + 15] = f;
    l[h + 31] = 0;
    l[h + 32] = 0;
    d = (g + 8 | 0) >> 2;
    for (f = d + 10; d < f; d++) {
      l[d] = 0;
    }
    d = Hh(p[(b + 16 | 0) >> 2] * p[e + 16 >> 2]);
    p[h + 34] = d;
    d = p[b + 20 >> 2];
    f = p[e + 20 >> 2];
    p[h + 35] = d > f ? d : f;
    l[g >> 2] = iN + 8 | 0;
    3 == (l[l[b + 12 >> 2] + 4 >> 2] | 0) ? b = e : (S(O.ua | 0, 43, O.ja | 0, O.qa | 0), b = l[i >> 2]);
    2 != (l[l[b + 12 >> 2] + 4 >> 2] | 0) && S(O.ua | 0, 44, O.ja | 0, O.S | 0);
    b = g;
  }
  return b | 0;
}), 0, (function(b, d) {
  K[l[l[b >> 2] + 4 >> 2]](b);
  var e = Gd[bn + 144 | 0], f = e & 255;
  14 > (e & 255) || S(O.e | 0, 173, O.f | 0, O.g | 0);
  e = (f << 2) + d + 12 | 0;
  l[b >> 2] = l[e >> 2];
  l[e >> 2] = b;
}), 0, (function(b) {
  ra(b | 0);
}), 0, (function(b) {
  l[b >> 2] = dF + 8 | 0;
  var d = b + 12 | 0;
  Fh(l[d >> 2]);
  l[d >> 2] = 0;
  l[b + 16 >> 2] = 0;
}), 0, (function(b) {
  l[b >> 2] = dF + 8 | 0;
  var d = b + 12 | 0;
  Fh(l[d >> 2]);
  l[d >> 2] = 0;
  l[b + 16 >> 2] = 0;
  Nv(b);
}), 0, (function(b, d) {
  var e, f = an(d, 40);
  e = f >> 2;
  0 == (f | 0) ? e = 0 : (l[e] = dF + 8 | 0, l[e + 1] = 3, p[e + 2] = .009999999776482582, l[e + 3] = 0, l[e + 4] = 0, c[f + 36 | 0] = 0, c[f + 37 | 0] = 0, e = f);
  var f = l[b + 12 >> 2], g = l[b + 16 >> 2], h = e + 12 | 0;
  4 == (0 == (l[h >> 2] | 0) ? 0 == (l[e + 16 >> 2] | 0) ? 5 : 4 : 4) && S(O.F | 0, 48, O.ca | 0, O.Ra | 0);
  1 < (g | 0) || S(O.F | 0, 49, O.ca | 0, O.Nb | 0);
  var i = e + 16 | 0;
  l[i >> 2] = g;
  g = Oe(g << 3);
  l[h >> 2] = g;
  Zg(g, f, l[i >> 2] << 3);
  f = e + 36 | 0;
  c[f] = 0;
  h = e + 37 | 0;
  c[h] = 0;
  var i = b + 20 | 0, g = e + 20 | 0, k = l[i + 4 >> 2];
  l[g >> 2] = l[i >> 2];
  l[g + 4 >> 2] = k;
  i = b + 28 | 0;
  g = e + 28 | 0;
  k = l[i + 4 >> 2];
  l[g >> 2] = l[i >> 2];
  l[g + 4 >> 2] = k;
  c[f] = c[b + 36 | 0] & 1;
  c[h] = c[b + 37 | 0] & 1;
  return e | 0;
}), 0, (function(b) {
  return l[b + 16 >> 2] - 1 | 0;
}), 0, Kb(0), 0, (function(b, d, e, f, g) {
  var h, i = a;
  a += 48;
  h = i >> 2;
  var k = b + 16 | 0, m = l[k >> 2];
  (m | 0) > (g | 0) ? k = m : (S(O.F | 0, 129, O.md | 0, O.Sb | 0), k = l[k >> 2]);
  l[h] = FF + 8 | 0;
  l[h + 1] = 1;
  p[h + 2] = .009999999776482582;
  p[h + 7] = 0;
  p[h + 8] = 0;
  p[h + 9] = 0;
  p[h + 10] = 0;
  c[i + 44 | 0] = 0;
  c[i + 45 | 0] = 0;
  h = g + 1 | 0;
  var b = l[b + 12 >> 2], g = (g << 3) + b | 0, m = i + 12 | 0, n = l[g + 4 >> 2];
  l[m >> 2] = l[g >> 2];
  l[m + 4 >> 2] = n;
  k = (((h | 0) == (k | 0) ? 0 : h) << 3) + b | 0;
  g = i + 20 | 0;
  h = l[k + 4 >> 2];
  l[g >> 2] = l[k >> 2];
  l[g + 4 >> 2] = h;
  d = Xm(i, d, e, f);
  a = i;
  return d;
}), 0, (function(b, d, e, f) {
  var g, h = b + 16 | 0, i = l[h >> 2];
  (i | 0) > (f | 0) ? h = i : (S(O.F | 0, 148, O.kd | 0, O.Sb | 0), h = l[h >> 2]);
  i = f + 1 | 0;
  i = (i | 0) == (h | 0) ? 0 : i;
  g = l[b + 12 >> 2] >> 2;
  var b = p[e + 12 >> 2], k = p[(f << 3 >> 2) + g], h = p[e + 8 >> 2], m = p[((f << 3) + 4 >> 2) + g], n = p[e >> 2], f = b * k - h * m + n, q = p[e + 4 >> 2], e = h * k + b * m + q, k = p[(i << 3 >> 2) + g];
  g = p[((i << 3) + 4 >> 2) + g];
  i = b * k - h * g + n;
  b = h * k + b * g + q;
  h = (N[0] = f < i ? f : i, w[0]);
  g = (N[0] = e < b ? e : b, w[0]) | 0;
  l[d >> 2] = 0 | h;
  l[d + 4 >> 2] = g;
  d = d + 8 | 0;
  f = (N[0] = f > i ? f : i, w[0]);
  e = (N[0] = e > b ? e : b, w[0]) | 0;
  l[d >> 2] = 0 | f;
  l[d + 4 >> 2] = e;
}), 0, (function(b, d) {
  p[d >> 2] = 0;
  p[d + 4 >> 2] = 0;
  p[d + 8 >> 2] = 0;
  p[d + 12 >> 2] = 0;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f = an(d, 20);
  e = f >> 2;
  0 == (f | 0) ? e = 0 : (l[e] = Tw + 8 | 0, l[e + 1] = 0, p[e + 2] = 0, p[e + 3] = 0, p[e + 4] = 0, e = f);
  l[e + 4 >> 2] = l[b + 4 >> 2];
  p[e + 8 >> 2] = p[b + 8 >> 2];
  var f = b + 12 | 0, g = e + 12 | 0, h = l[f + 4 >> 2];
  l[g >> 2] = l[f >> 2];
  l[g + 4 >> 2] = h;
  return e | 0;
}), 0, Kb(1), 0, (function(b, d, e) {
  var f = p[d + 12 >> 2], g = p[b + 12 >> 2], h = p[d + 8 >> 2], i = p[b + 16 >> 2], k = p[e >> 2] - (p[d >> 2] + (f * g - h * i)), d = p[e + 4 >> 2] - (p[d + 4 >> 2] + h * g + f * i), b = p[b + 8 >> 2];
  return k * k + d * d <= b * b;
}), 0, (function(b, d, e, f) {
  var g = e >> 2, h = p[f + 12 >> 2], i = p[b + 12 >> 2], k = p[f + 8 >> 2], m = p[b + 16 >> 2], n = p[g], e = n - (p[f >> 2] + (h * i - k * m)), q = p[g + 1], f = q - (p[f + 4 >> 2] + k * i + h * m), h = p[b + 8 >> 2], b = p[g + 2] - n, q = p[g + 3] - q, i = e * b + f * q, n = b * b + q * q, h = i * i - n * (e * e + f * f - h * h);
  0 > h | 1.1920928955078125e-7 > n ? d = 0 : (h = Hh(h), h = i + h, i = -h, 0 < h ? d = 0 : p[g + 4] * n < i ? d = 0 : (g = i / n, p[d + 8 >> 2] = g, e += b * g, g = f + q * g, f = (N[0] = e, w[0]), b = (N[0] = g, w[0]) | 0, l[d >> 2] = 0 | f, l[d + 4 >> 2] = b, f = Hh(e * e + g * g), 1.1920928955078125e-7 > f || (f = 1 / f, p[d >> 2] = e * f, p[(d + 4 | 0) >> 2] = g * f), d = 1));
  return d;
}), 0, (function(b, d, e) {
  var f = p[e + 12 >> 2], g = p[b + 12 >> 2], h = p[e + 8 >> 2], i = p[b + 16 >> 2], k = p[e >> 2] + (f * g - h * i), e = p[e + 4 >> 2] + h * g + f * i, b = b + 8 | 0, f = p[b >> 2];
  p[d >> 2] = k - f;
  p[d + 4 >> 2] = e - f;
  b = p[b >> 2];
  p[d + 8 >> 2] = k + b;
  p[d + 12 >> 2] = e + b;
}), 0, (function(b, d, e) {
  var f = b + 8 | 0, g = p[f >> 2], e = 3.1415927410125732 * e * g * g;
  p[d >> 2] = e;
  var g = b + 12 | 0, h = d + 4 | 0, i = l[g + 4 >> 2];
  l[h >> 2] = l[g >> 2];
  l[h + 4 >> 2] = i;
  f = p[f >> 2];
  g = p[g >> 2];
  b = p[b + 16 >> 2];
  p[d + 12 >> 2] = e * (.5 * f * f + g * g + b * b);
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f = an(d, 48);
  e = f >> 2;
  0 == (f | 0) ? e = 0 : (l[e] = FF + 8 | 0, l[e + 1] = 1, p[e + 2] = .009999999776482582, p[e + 7] = 0, p[e + 8] = 0, p[e + 9] = 0, p[e + 10] = 0, c[f + 44 | 0] = 0, c[f + 45 | 0] = 0, e = f);
  l[e + 4 >> 2] = l[b + 4 >> 2];
  p[e + 8 >> 2] = p[b + 8 >> 2];
  var f = b + 12 | 0, g = e + 12 | 0, h = l[f + 4 >> 2];
  l[g >> 2] = l[f >> 2];
  l[g + 4 >> 2] = h;
  f = b + 20 | 0;
  g = e + 20 | 0;
  h = l[f + 4 >> 2];
  l[g >> 2] = l[f >> 2];
  l[g + 4 >> 2] = h;
  f = b + 28 | 0;
  g = e + 28 | 0;
  h = l[f + 4 >> 2];
  l[g >> 2] = l[f >> 2];
  l[g + 4 >> 2] = h;
  f = b + 36 | 0;
  g = e + 36 | 0;
  h = l[f + 4 >> 2];
  l[g >> 2] = l[f >> 2];
  l[g + 4 >> 2] = h;
  c[e + 44 | 0] = c[b + 44 | 0] & 1;
  c[e + 45 | 0] = c[b + 45 | 0] & 1;
  return e | 0;
}), 0, Kb(1), 0, Kb(0), 0, Xm, 0, (function(b, d, e) {
  var f = b >> 2, g = p[e + 12 >> 2], h = p[f + 3], i = p[e + 8 >> 2], k = p[f + 4], m = p[e >> 2], b = g * h - i * k + m, n = p[e + 4 >> 2], e = i * h + g * k + n, h = p[f + 5], k = p[f + 6], m = g * h - i * k + m, g = i * h + g * k + n, f = p[f + 2], i = (N[0] = (b < m ? b : m) - f, w[0]), n = (N[0] = (e < g ? e : g) - f, w[0]) | 0;
  l[d >> 2] = 0 | i;
  l[d + 4 >> 2] = n;
  d = d + 8 | 0;
  b = (N[0] = (b > m ? b : m) + f, w[0]);
  e = (N[0] = (e > g ? e : g) + f, w[0]) | 0;
  l[d >> 2] = 0 | b;
  l[d + 4 >> 2] = e;
}), 0, (function(b, d) {
  p[d >> 2] = 0;
  var e = .5 * (p[b + 16 >> 2] + p[b + 24 >> 2]), f = d + 4 | 0, g = (N[0] = .5 * (p[b + 12 >> 2] + p[b + 20 >> 2]), w[0]), e = (N[0] = e, w[0]) | 0;
  l[f >> 2] = 0 | g;
  l[f + 4 >> 2] = e;
  p[d + 12 >> 2] = 0;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f = an(d, 152);
  e = f >> 2;
  0 == (f | 0) ? f = 0 : (l[e] = wF + 8 | 0, l[e + 1] = 2, p[e + 2] = .009999999776482582, l[e + 37] = 0, p[e + 3] = 0, p[e + 4] = 0);
  e = f >> 2;
  l[e + 1] = l[b + 4 >> 2];
  p[e + 2] = p[b + 8 >> 2];
  var g = b + 12 | 0, h = f + 12 | 0, i = l[g + 4 >> 2];
  l[h >> 2] = l[g >> 2];
  l[h + 4 >> 2] = i;
  Zg(f + 20 | 0, b + 20 | 0, 64);
  Zg(f + 84 | 0, b + 84 | 0, 64);
  l[e + 37] = l[b + 148 >> 2];
  return f | 0;
}), 0, Kb(1), 0, (function(b, d, e) {
  for (var b = b >> 2, f = p[e >> 2] - p[d >> 2], e = p[e + 4 >> 2] - p[d + 4 >> 2], g = p[d + 12 >> 2], h = p[d + 8 >> 2], d = g * f + h * e, f = f * -h + g * e, e = l[b + 37], g = 0; ; ) {
    if ((g | 0) >= (e | 0)) {
      var i = 1;
      break;
    }
    if (0 < p[((g << 3) + 84 >> 2) + b] * (d - p[((g << 3) + 20 >> 2) + b]) + p[((g << 3) + 88 >> 2) + b] * (f - p[((g << 3) + 24 >> 2) + b])) {
      i = 0;
      break;
    }
    g = g + 1 | 0;
  }
  return i;
}), 0, (function(b, d, e, f) {
  var g = e >> 2, b = b >> 2, h = p[f >> 2], i = p[g] - h, k = p[f + 4 >> 2], m = p[g + 1] - k, e = f + 12 | 0, n = p[e >> 2], f = f + 8 | 0, q = p[f >> 2], r = n * i + q * m, t = -q, i = i * t + n * m, h = p[g + 2] - h, m = p[g + 3] - k, k = n * h + q * m - r, n = h * t + n * m - i, t = p[g + 4], q = l[b + 37], h = 0, g = -1, m = t, u = 0;
  a : for (;;) {
    if ((h | 0) >= (q | 0)) {
      0 > u | u > t && S(O.O | 0, 249, O.pd | 0, O.vf | 0);
      if (-1 >= (g | 0)) {
        var v = 0;
        break;
      }
      p[d + 8 >> 2] = u;
      v = p[e >> 2];
      e = p[((g << 3) + 84 >> 2) + b];
      f = p[f >> 2];
      r = p[((g << 3) + 88 >> 2) + b];
      b = f * e + v * r;
      v = (N[0] = v * e - f * r, w[0]);
      b = (N[0] = b, w[0]) | 0;
      l[d >> 2] = 0 | v;
      l[d + 4 >> 2] = b;
      v = 1;
      break;
    }
    var A = p[((h << 3) + 84 >> 2) + b], C = p[((h << 3) + 88 >> 2) + b], B = A * (p[((h << 3) + 20 >> 2) + b] - r) + C * (p[((h << 3) + 24 >> 2) + b] - i), A = A * k + C * n, C = 0 == A;
    b : do {
      if (C) {
        if (0 > B) {
          v = 0;
          break a;
        }
        var y = g, z = m, F = u;
      } else {
        y = 0 > A;
        do {
          if (y && B < u * A) {
            y = h;
            z = m;
            F = B / A;
            break b;
          }
        } while (0);
        0 < A ? B < m * A ? (y = g, z = B / A) : (y = g, z = m) : (y = g, z = m);
        F = u;
      }
    } while (0);
    if (z < F) {
      v = 0;
      break;
    }
    h = h + 1 | 0;
    g = y;
    m = z;
    u = F;
  }
  return v;
}), 0, (function(b, d, e) {
  var b = b >> 2, f = p[e + 12 >> 2], g = p[b + 5], h = p[e + 8 >> 2], i = p[b + 6], k = p[e >> 2], m = f * g - h * i + k, e = p[e + 4 >> 2], g = h * g + f * i + e, i = l[b + 37], n = 1 < (i | 0);
  a : do {
    if (n) {
      for (var q = g, r = g, t = m, u = m, v = 1; ; ) {
        var A = p[((v << 3) + 20 >> 2) + b], C = p[((v << 3) + 24 >> 2) + b], B = f * A - h * C + k, A = h * A + f * C + e, u = u < B ? u : B, r = r < A ? r : A, t = t > B ? t : B, q = q > A ? q : A, v = v + 1 | 0;
        if ((v | 0) >= (i | 0)) {
          var y = q, z = r, F = t, G = u;
          break a;
        }
      }
    } else {
      z = y = g, G = F = m;
    }
  } while (0);
  b = p[b + 2];
  G = (N[0] = G - b, w[0]);
  z = (N[0] = z - b, w[0]) | 0;
  l[d >> 2] = 0 | G;
  l[d + 4 >> 2] = z;
  d = d + 8 | 0;
  F = (N[0] = F + b, w[0]);
  y = (N[0] = y + b, w[0]) | 0;
  l[d >> 2] = 0 | F;
  l[d + 4 >> 2] = y;
}), 0, (function(b, d, e) {
  var f;
  f = b + 148 | 0;
  var g = l[f >> 2];
  if (2 < (g | 0)) {
    h = g, f = 3;
  } else {
    if (S(O.O | 0, 306, O.wb | 0, O.Gf | 0), f = l[f >> 2], 0 < (f | 0)) {
      var h = f;
      f = 3;
    } else {
      var i = d | 0, k = p[i >> 2] = 0, m = 0, n = 0, q = 0, r = 0, t = 0;
      f = 10;
    }
  }
  do {
    if (3 == f) {
      for (var u = g = f = 0; ; ) {
        var v = g + p[b + (u << 3) + 20 >> 2], A = f + p[b + (u << 3) + 24 >> 2], u = u + 1 | 0;
        if ((u | 0) >= (h | 0)) {
          break;
        }
        f = A;
        g = v;
      }
      g = 1 / (h | 0);
      f = v * g;
      for (var g = A * g, u = b + 20 | 0, C = b + 24 | 0, B = 0, y = 0, z = 0, F = 0, G = 0; ; ) {
        var H = p[b + (G << 3) + 20 >> 2] - f, E = p[b + (G << 3) + 24 >> 2] - g, G = G + 1 | 0, I = (G | 0) < (h | 0);
        if (I) {
          var J = (G << 3) + b + 20 | 0, L = (G << 3) + b + 24 | 0;
        } else {
          J = u, L = C;
        }
        var M = p[J >> 2] - f, V = p[L >> 2] - g, Q = H * V - E * M, J = .5 * Q, L = z + J, T = .3333333432674408 * J, J = y + (H + M) * T, T = B + (E + V) * T, H = F + .0833333358168602 * Q * (H * H + M * H + M * M + E * E + V * E + V * V);
        if (!I) {
          break;
        }
        B = T;
        y = J;
        z = L;
        F = H;
      }
      u = L * e;
      C = d | 0;
      p[C >> 2] = u;
      if (1.1920928955078125e-7 < L) {
        var Y = u, R = g, P = f, aa = H, W = L, da = J, sa = T;
        f = 11;
      } else {
        k = g, m = f, n = H, q = L, r = J, t = T, i = C, f = 10;
      }
    }
  } while (0);
  10 == f && (S(O.O | 0, 352, O.wb | 0, O.Tb | 0), Y = p[i >> 2], R = k, P = m, aa = n, W = q, da = r, sa = t);
  b = 1 / W;
  da *= b;
  sa *= b;
  P = da + P;
  R = sa + R;
  b = d + 4 | 0;
  h = (N[0] = P, w[0]);
  k = (N[0] = R, w[0]) | 0;
  l[b >> 2] = 0 | h;
  l[b + 4 >> 2] = k;
  p[d + 12 >> 2] = aa * e + Y * (P * P + R * R - (da * da + sa * sa));
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function() {
  ea("Pure virtual function called!");
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, zb(), 0, zb(), 0, zb(), 0, zb(), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d, e) {
  b = j[d + 36 >> 1];
  return b << 16 >> 16 != j[e + 36 >> 1] << 16 >> 16 | 0 == b << 16 >> 16 ? 0 == (j[e + 32 >> 1] & j[d + 34 >> 1]) << 16 >> 16 ? 0 : 0 != (j[e + 34 >> 1] & j[d + 32 >> 1]) << 16 >> 16 : 0 < b << 16 >> 16;
}), 0, (function(b, d, e, f) {
  var g, h = a;
  a += 48;
  g = h >> 2;
  var i = l[l[b + 48 >> 2] + 12 >> 2];
  l[g] = FF + 8 | 0;
  l[g + 1] = 1;
  p[g + 2] = .009999999776482582;
  p[g + 7] = 0;
  p[g + 8] = 0;
  p[g + 9] = 0;
  p[g + 10] = 0;
  c[h + 44 | 0] = 0;
  c[h + 45 | 0] = 0;
  Fm(i, h, l[b + 56 >> 2]);
  Gh(d, h, e, l[l[b + 52 >> 2] + 12 >> 2], f);
  a = h;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d, e, f) {
  var g, h = a;
  a += 300;
  var i = h + 252;
  g = i >> 2;
  var k = l[l[b + 48 >> 2] + 12 >> 2];
  l[g] = FF + 8 | 0;
  l[g + 1] = 1;
  p[g + 2] = .009999999776482582;
  p[g + 7] = 0;
  p[g + 8] = 0;
  p[g + 9] = 0;
  p[g + 10] = 0;
  c[i + 44 | 0] = 0;
  c[i + 45 | 0] = 0;
  Fm(k, i, l[b + 56 >> 2]);
  Ih(h, d, i, e, l[l[b + 52 >> 2] + 12 >> 2], f);
  a = h;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d, e, f) {
  var g = l[l[b + 48 >> 2] + 12 >> 2], h = l[l[b + 52 >> 2] + 12 >> 2], i = d + 60 | 0;
  l[i >> 2] = 0;
  var k = g + 12 | 0, m = p[e + 12 >> 2], n = p[k >> 2], q = p[e + 8 >> 2], r = p[g + 16 >> 2], b = h + 12 | 0, t = p[f + 12 >> 2], u = p[b >> 2], v = p[f + 8 >> 2], A = p[h + 16 >> 2], C = t * u - v * A + p[f >> 2] - (m * n - q * r + p[e >> 2]), e = v * u + t * A + p[f + 4 >> 2] - (q * n + m * r + p[e + 4 >> 2]), g = p[g + 8 >> 2] + p[h + 8 >> 2];
  C * C + e * e > g * g || (l[d + 56 >> 2] = 0, g = d + 48 | 0, C = l[k + 4 >> 2], l[g >> 2] = l[k >> 2], l[g + 4 >> 2] = C, p[d + 40 >> 2] = 0, p[d + 44 >> 2] = 0, l[i >> 2] = 1, i = l[b + 4 >> 2], l[d >> 2] = l[b >> 2], l[d + 4 >> 2] = i, l[d + 16 >> 2] = 0);
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d, e, f) {
  Gh(d, l[l[b + 48 >> 2] + 12 >> 2], e, l[l[b + 52 >> 2] + 12 >> 2], f);
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d, e, f) {
  var g = a;
  a += 252;
  Ih(g, d, l[l[b + 48 >> 2] + 12 >> 2], e, l[l[b + 52 >> 2] + 12 >> 2], f);
  a = g;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d, e, f) {
  var g = l[l[b + 48 >> 2] + 12 >> 2], h = l[l[b + 52 >> 2] + 12 >> 2], i, k = g >> 2, m = d >> 2;
  i = (d + 60 | 0) >> 2;
  l[i] = 0;
  for (var n = h + 12 | 0, q = p[f + 12 >> 2], r = p[n >> 2], t = p[f + 8 >> 2], u = p[h + 16 >> 2], v = q * r - t * u + p[f >> 2] - p[e >> 2], A = t * r + q * u + p[f + 4 >> 2] - p[e + 4 >> 2], C = p[e + 12 >> 2], B = p[e + 8 >> 2], y = C * v + B * A, z = v * -B + C * A, F = p[k + 2] + p[h + 8 >> 2], G = l[k + 37], H = 0, E = -3.4028234663852886e+38, I = 0; ; ) {
    if ((H | 0) < (G | 0)) {
      var J = p[((H << 3) + 84 >> 2) + k] * (y - p[((H << 3) + 20 >> 2) + k]) + p[((H << 3) + 88 >> 2) + k] * (z - p[((H << 3) + 24 >> 2) + k]);
      if (J > F) {
        break;
      }
      var L = J > E, M = L ? H : I, V = L ? J : E, H = H + 1 | 0, E = V, I = M;
    } else {
      var Q = I + 1 | 0, T = (Q | 0) < (G | 0) ? Q : 0, Y = (I << 3) + g + 20 | 0, R = o[Y >> 2], P = o[Y + 4 >> 2], aa = (w[0] = R, N[0]), W = (w[0] = P, N[0]), da = (T << 3) + g + 20 | 0, sa = o[da >> 2], ta = o[da + 4 >> 2], ja = (w[0] = sa, N[0]), ua = (w[0] = ta, N[0]);
      if (1.1920928955078125e-7 > E) {
        l[i] = 1;
        l[m + 14] = 1;
        var ha = (I << 3) + g + 84 | 0, wa = d + 40 | 0, oa = l[ha + 4 >> 2];
        l[wa >> 2] = l[ha >> 2];
        l[wa + 4 >> 2] = oa;
        var Aa = .5 * (W + ua), Fa = d + 48 | 0, La = (N[0] = .5 * (aa + ja), w[0]), xa = (N[0] = Aa, w[0]) | 0;
        l[Fa >> 2] = 0 | La;
        l[Fa + 4 >> 2] = xa;
        var ca = n, Z = d, la = l[ca + 4 >> 2];
        l[Z >> 2] = l[ca >> 2];
        l[Z + 4 >> 2] = la;
        l[m + 4] = 0;
        break;
      }
      var ya = y - aa, fa = z - W, $ = y - ja, eb = z - ua;
      if (0 >= ya * (ja - aa) + fa * (ua - W)) {
        var Sa = ya * ya + fa * fa;
        if (Sa > F * F) {
          break;
        }
        l[i] = 1;
        l[m + 14] = 1;
        var Da = d + 40 | 0, na = Da, ma = (N[0] = ya, w[0]), Ba = (N[0] = fa, w[0]) | 0, za = na | 0;
        l[za >> 2] = 0 | ma;
        var Ha = na + 4 | 0;
        l[Ha >> 2] = Ba;
        var jb = Hh(Sa);
        if (1.1920928955078125e-7 <= jb) {
          var Ia = d + 44 | 0, $a = 1 / jb;
          p[Da >> 2] = ya * $a;
          p[Ia >> 2] = fa * $a;
        }
        var ba = d + 48 | 0, qa = ba | 0;
        l[qa >> 2] = R;
        var ka = ba + 4 | 0;
        l[ka >> 2] = P;
        var ia = n, va = d, Oa = ia | 0, Pa = ia + 4 | 0, Ta = l[Pa >> 2], Xa = va | 0;
        l[Xa >> 2] = l[Oa >> 2];
        var ab = va + 4 | 0;
        l[ab >> 2] = Ta;
        l[m + 4] = 0;
        break;
      }
      if (0 < $ * (aa - ja) + eb * (W - ua)) {
        var kb = .5 * (aa + ja), mb = .5 * (W + ua), Qa = (I << 3) + g + 84 | 0;
        if ((y - kb) * p[Qa >> 2] + (z - mb) * p[((I << 3) + 88 >> 2) + k] > F) {
          break;
        }
        l[i] = 1;
        l[m + 14] = 1;
        var Ma = Qa, bb = d + 40 | 0, Va = l[Ma + 4 >> 2];
        l[bb >> 2] = l[Ma >> 2];
        l[bb + 4 >> 2] = Va;
        var Ja = d + 48 | 0, ga = (N[0] = kb, w[0]), cb = (N[0] = mb, w[0]) | 0;
        l[Ja >> 2] = 0 | ga;
        l[Ja + 4 >> 2] = cb;
        var gb = n, db = d, Ya = l[gb + 4 >> 2];
        l[db >> 2] = l[gb >> 2];
        l[db + 4 >> 2] = Ya;
        l[m + 4] = 0;
        break;
      }
      var Ka = $ * $ + eb * eb;
      if (Ka > F * F) {
        break;
      }
      l[i] = 1;
      l[m + 14] = 1;
      var Ga = d + 40 | 0, fb = Ga, Ea = (N[0] = $, w[0]), Ua = (N[0] = eb, w[0]), ob = 0 | Ea, Na = Ua | 0, za = fb | 0;
      l[za >> 2] = ob;
      Ha = fb + 4 | 0;
      l[Ha >> 2] = Na;
      var Wa = Hh(Ka);
      if (1.1920928955078125e-7 <= Wa) {
        var nb = d + 44 | 0, pa = 1 / Wa;
        p[Ga >> 2] = $ * pa;
        p[nb >> 2] = eb * pa;
      }
      var hb = d + 48 | 0, qa = hb | 0;
      l[qa >> 2] = sa;
      ka = hb + 4 | 0;
      l[ka >> 2] = ta;
      var Ca = n, ib = d, Oa = Ca | 0, Za = l[Oa >> 2], Pa = Ca + 4 | 0, lb = l[Pa >> 2], Xa = ib | 0;
      l[Xa >> 2] = Za;
      ab = ib + 4 | 0;
      l[ab >> 2] = lb;
      l[m + 4] = 0;
      break;
    }
  }
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d, e, f) {
  var g = l[l[b + 48 >> 2] + 12 >> 2], h = l[l[b + 52 >> 2] + 12 >> 2], i, k, m, n, q, r, t, u, v, A, C, B, y, z, F = f >> 2, G = e >> 2, H = a;
  a += 80;
  var E, I = H + 4, J = H + 8, L = H + 32;
  z = L >> 2;
  var M = H + 56;
  y = M >> 2;
  var V = d + 60 | 0;
  l[V >> 2] = 0;
  var Q = p[g + 8 >> 2] + p[h + 8 >> 2];
  l[H >> 2] = 0;
  var T = Jh(H, g, e, h, f), Y = T > Q;
  do {
    if (!Y) {
      l[I >> 2] = 0;
      var R = Jh(I, h, f, g, e);
      if (R <= Q) {
        if (R > .9800000190734863 * T + .0010000000474974513) {
          var P = p[F], aa = p[F + 1], W = p[F + 2], da = p[F + 3], sa = p[G], ta = p[G + 1], ja = p[G + 2], ua = p[G + 3], ha = l[I >> 2];
          l[d + 56 >> 2] = 2;
          var wa = 1, oa = ha, Aa = g;
          B = Aa >> 2;
          var Fa = h;
          C = Fa >> 2;
          var La = P, xa = aa, ca = W, Z = da, la = sa, ya = ta, fa = ja, $ = ua;
        } else {
          var eb = p[G], Sa = p[G + 1], Da = p[G + 2], na = p[G + 3], ma = p[F], Ba = p[F + 1], za = p[F + 2], Ha = p[F + 3], jb = l[H >> 2];
          l[d + 56 >> 2] = 1;
          wa = 0;
          oa = jb;
          Aa = h;
          B = Aa >> 2;
          Fa = g;
          C = Fa >> 2;
          La = eb;
          xa = Sa;
          ca = Da;
          Z = na;
          la = ma;
          ya = Ba;
          fa = za;
          $ = Ha;
        }
        var Ia = l[B + 37];
        E = -1 < (oa | 0) ? (l[C + 37] | 0) > (oa | 0) ? 8 : 7 : 7;
        7 == E && S(O.Gb | 0, 151, O.Pc | 0, O.Cb | 0);
        var $a = p[((oa << 3) + 84 >> 2) + C], ba = p[((oa << 3) + 88 >> 2) + C], qa = Z * $a - ca * ba, ka = ca * $a + Z * ba, ia = $ * qa + fa * ka, va = -fa, Oa = qa * va + $ * ka, Pa = 0 < (Ia | 0);
        a : do {
          if (Pa) {
            for (var Ta = 0, Xa = 3.4028234663852886e+38, ab = 0; ; ) {
              var kb = ia * p[((ab << 3) + 84 >> 2) + B] + Oa * p[((ab << 3) + 88 >> 2) + B], mb = kb < Xa, Qa = mb ? ab : Ta, Ma = mb ? kb : Xa, bb = ab + 1 | 0;
              if ((bb | 0) == (Ia | 0)) {
                var Va = Qa;
                break a;
              }
              Ta = Qa;
              Xa = Ma;
              ab = bb;
            }
          } else {
            Va = 0;
          }
        } while (0);
        var Ja = Va + 1 | 0, ga = (Ja | 0) < (Ia | 0) ? Ja : 0, cb = p[((Va << 3) + 20 >> 2) + B], gb = p[((Va << 3) + 24 >> 2) + B], db = $ * cb - fa * gb + la, Ya = fa * cb + $ * gb + ya, Ka = J, Ga = (N[0] = db, w[0]), fb = (N[0] = Ya, w[0]) | 0;
        l[Ka >> 2] = 0 | Ga;
        l[Ka + 4 >> 2] = fb;
        var Ea = oa & 255, Ua = J + 8 | 0, ob = Ua;
        c[Ua] = Ea;
        var Na = Va & 255;
        c[ob + 1 | 0] = Na;
        c[ob + 2 | 0] = 1;
        c[ob + 3 | 0] = 0;
        var Wa = J + 12 | 0, nb = p[((ga << 3) + 20 >> 2) + B], pa = p[((ga << 3) + 24 >> 2) + B], hb = $ * nb - fa * pa + la, Ca = fa * nb + $ * pa + ya, ib = Wa, Za = (N[0] = hb, w[0]), lb = (N[0] = Ca, w[0]) | 0;
        l[ib >> 2] = 0 | Za;
        l[ib + 4 >> 2] = lb;
        var qb = J + 20 | 0, vb = qb;
        c[qb] = Ea;
        c[vb + 1 | 0] = ga & 255;
        c[vb + 2 | 0] = 1;
        c[vb + 3 | 0] = 0;
        var sb = oa + 1 | 0, Ab = (sb | 0) < (l[C + 37] | 0) ? sb : 0, Bb = (oa << 3) + Fa + 20 | 0, Gb = l[Bb + 4 >> 2], Cb = (w[0] = l[Bb >> 2], N[0]), pb = (w[0] = Gb, N[0]), ub = (Ab << 3) + Fa + 20 | 0, Eb = l[ub + 4 >> 2], Db = (w[0] = l[ub >> 2], N[0]), wb = (w[0] = Eb, N[0]), Hb = Db - Cb, tb = wb - pb, xb = Hh(Hb * Hb + tb * tb);
        if (1.1920928955078125e-7 > xb) {
          var Ib = Hb, Jb = tb;
        } else {
          var Lb = 1 / xb, Ib = Hb * Lb, Jb = tb * Lb;
        }
        var Xb = .5 * (Cb + Db), Nb = Z * Ib - ca * Jb, Sb = ca * Ib + Z * Jb, Ob = -1 * Nb, Vb = Z * Cb - ca * pb + La, Zb = ca * Cb + Z * pb + xa, dc = .5 * (pb + wb), fc = Sb * Vb + Ob * Zb, kc = Q - (Nb * Vb + Sb * Zb), Fb = Nb * (Z * Db - ca * wb + La) + Sb * (ca * Db + Z * wb + xa) + Q, Wb = -Nb, vc = -Sb, $b = db * Wb + Ya * vc - kc, Yb = hb * Wb + Ca * vc - kc;
        if (0 < $b) {
          var wc = 0;
        } else {
          A = L >> 2, v = J >> 2, l[A] = l[v], l[A + 1] = l[v + 1], l[A + 2] = l[v + 2], wc = 1;
        }
        if (0 < Yb) {
          var xc = wc;
        } else {
          u = (L + 12 * wc | 0) >> 2, t = Wa >> 2, l[u] = l[t], l[u + 1] = l[t + 1], l[u + 2] = l[t + 2], xc = wc + 1 | 0;
        }
        if (0 > $b * Yb) {
          var Hc = $b / ($b - Yb), Bd = Ya + (Ca - Ya) * Hc, rc = L + 12 * xc | 0, Rc = (N[0] = db + (hb - db) * Hc, w[0]), Ic = (N[0] = Bd, w[0]), ad = 0 | Rc, pc = Ic | 0, Pb = rc | 0;
          r = Pb >> 2;
          l[r] = ad;
          var Rb = rc + 4 | 0;
          q = Rb >> 2;
          l[q] = pc;
          var bd = L + 12 * xc + 8 | 0, sc = bd;
          c[bd] = Ea;
          c[sc + 1 | 0] = Na;
          c[sc + 2 | 0] = 0;
          c[sc + 3 | 0] = 1;
          var mc = xc + 1 | 0;
        } else {
          mc = xc;
        }
        if (2 <= (mc | 0)) {
          var yc = p[z], tc = p[z + 1], Jc = Nb * yc + Sb * tc - Fb, uc = L + 12 | 0, ec = p[uc >> 2], Oc = p[z + 4], Sc = Nb * ec + Sb * Oc - Fb;
          if (0 < Jc) {
            var lc = 0;
          } else {
            n = M >> 2, m = L >> 2, l[n] = l[m], l[n + 1] = l[m + 1], l[n + 2] = l[m + 2], lc = 1;
          }
          if (0 < Sc) {
            var Kc = lc;
          } else {
            k = (M + 12 * lc | 0) >> 2, i = uc >> 2, l[k] = l[i], l[k + 1] = l[i + 1], l[k + 2] = l[i + 2], Kc = lc + 1 | 0;
          }
          if (0 > Jc * Sc) {
            var rd = Jc / (Jc - Sc), Cd = tc + (Oc - tc) * rd, kd = M + 12 * Kc | 0, sd = (N[0] = yc + (ec - yc) * rd, w[0]), Md = (N[0] = Cd, w[0]), Nd = 0 | sd, Vc = Md | 0, Pb = kd | 0;
            r = Pb >> 2;
            l[r] = Nd;
            Rb = kd + 4 | 0;
            q = Rb >> 2;
            l[q] = Vc;
            var Fc = M + 12 * Kc + 8 | 0, nc = Fc;
            c[Fc] = Ab & 255;
            c[nc + 1 | 0] = c[L + 9 | 0];
            c[nc + 2 | 0] = 0;
            c[nc + 3 | 0] = 1;
            var jc = Kc + 1 | 0;
          } else {
            jc = Kc;
          }
          if (2 <= (jc | 0)) {
            var gc = d + 40 | 0, Od = (N[0] = Jb, w[0]), Ae = (N[0] = -1 * Ib, w[0]) | 0;
            l[gc >> 2] = 0 | Od;
            l[gc + 4 >> 2] = Ae;
            var cd = d + 48 | 0, dd = (N[0] = Xb, w[0]), Bc = (N[0] = dc, w[0]) | 0;
            l[cd >> 2] = 0 | dd;
            l[cd + 4 >> 2] = Bc;
            var qc = p[y], zc = p[y + 1], td = Sb * qc + Ob * zc - fc > Q;
            if (0 == wa << 24 >> 24) {
              if (td) {
                var Cc = 0;
              } else {
                var gf = qc - la, Wc = zc - ya, ld = gf * va + $ * Wc, Pd = d, be = (N[0] = $ * gf + fa * Wc, w[0]), Qd = (N[0] = ld, w[0]) | 0, Hd = Pd | 0;
                l[Hd >> 2] = 0 | be;
                var ed = Pd + 4 | 0;
                l[ed >> 2] = Qd;
                l[d + 16 >> 2] = l[y + 2];
                Cc = 1;
              }
              var Be = p[y + 3], md = p[y + 4];
              if (Sb * Be + Ob * md - fc > Q) {
                var Pc = Cc;
              } else {
                var je = Be - la, ce = md - ya, ke = je * va + $ * ce, Cf = d + 20 * Cc | 0, le = (N[0] = $ * je + fa * ce, w[0]), hf = (N[0] = ke, w[0]) | 0, Pb = Cf | 0;
                r = Pb >> 2;
                l[r] = 0 | le;
                Rb = Cf + 4 | 0;
                q = Rb >> 2;
                l[q] = hf;
                l[(d + 16 >> 2) + (5 * Cc | 0)] = l[y + 5];
                Pc = Cc + 1 | 0;
              }
            } else {
              if (td) {
                var Id = 0;
              } else {
                var Qc = qc - la, me = zc - ya, Rd = Qc * va + $ * me, ve = d, we = (N[0] = $ * Qc + fa * me, w[0]), Pe = (N[0] = Rd, w[0]) | 0, Hd = ve | 0;
                l[Hd >> 2] = 0 | we;
                ed = ve + 4 | 0;
                l[ed >> 2] = Pe;
                var Ce = d + 16 | 0, Tc = o[y + 2];
                l[Ce >> 2] = Tc;
                var hc = Tc >>> 24 & 255, ud = Tc >>> 16 & 255, Sd = Tc & 255, Df = Ce, Qe = Df + 1 | 0, Dd = Df + 2 | 0, Jd = Df + 3 | 0;
                c[Ce] = Tc >>> 8 & 255;
                c[Qe] = Sd;
                c[Dd] = hc;
                c[Jd] = ud;
                Id = 1;
              }
              var jf = p[y + 3], kf = p[y + 4];
              if (Sb * jf + Ob * kf - fc > Q) {
                Pc = Id;
              } else {
                var Xc = jf - la, xe = kf - ya, vd = Xc * va + $ * xe, Td = d + 20 * Id | 0, Ef = (N[0] = $ * Xc + fa * xe, w[0]), Lc = (N[0] = vd, w[0]) | 0, Pb = Td | 0;
                r = Pb >> 2;
                l[r] = 0 | Ef;
                Rb = Td + 4 | 0;
                q = Rb >> 2;
                l[q] = Lc;
                var ne = d + 20 * Id + 16 | 0, Yc = o[y + 5];
                l[ne >> 2] = Yc;
                var De = Yc >>> 24 & 255, de = Yc >>> 16 & 255, Ee = Yc & 255, Zc = ne, cg = Zc + 1 | 0, oe = Zc + 2 | 0, Fe = Zc + 3 | 0;
                c[ne] = Yc >>> 8 & 255;
                c[cg] = Ee;
                c[oe] = De;
                c[Fe] = de;
                Pc = Id + 1 | 0;
              }
            }
            l[V >> 2] = Pc;
          }
        }
      }
    }
  } while (0);
  a = H;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 80 >> 2], h = p[e + 5], i = p[d + 84 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 88 >> 2], h = p[e + 5], i = p[d + 92 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var e = p[d + 100 >> 2] * e, f = p[d + 120 >> 2] * e;
  p[b >> 2] = p[d + 116 >> 2] * e;
  p[b + 4 >> 2] = f;
}), 0, Kb(0), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.$e | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  b = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 20];
  f = p[d + 21];
  U(O.K | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 22];
  f = p[d + 23];
  U(O.L | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 26];
  U(O.Uf | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 17];
  U(O.Ma | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 18];
  U(O.Na | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i = b >> 2, k = l[i + 12];
  h = k >> 2;
  var m = o[h + 2], n = b + 108 | 0;
  l[n >> 2] = m;
  var q = l[i + 13];
  g = q >> 2;
  var r = l[g + 2];
  f = (b + 112 | 0) >> 2;
  l[f] = r;
  var t = k + 28 | 0, u = b + 140 | 0, v = l[t >> 2], A = l[t + 4 >> 2];
  l[u >> 2] = v;
  l[u + 4 >> 2] = A;
  var C = q + 28 | 0, B = b + 148 | 0, y = l[C >> 2], z = l[C + 4 >> 2];
  l[B >> 2] = y;
  l[B + 4 >> 2] = z;
  var F = p[h + 30];
  p[i + 39] = F;
  var G = p[g + 30];
  p[i + 40] = G;
  var H = p[h + 32];
  p[i + 41] = H;
  var E = p[g + 32];
  p[i + 42] = E;
  var I = l[d + 24 >> 2], J = I + 12 * m | 0, L = l[J + 4 >> 2], M = (w[0] = l[J >> 2], N[0]), V = (w[0] = L, N[0]), Q = p[(I + 8 >> 2) + (3 * m | 0)];
  e = (d + 28 | 0) >> 2;
  var T = l[e], Y = T + 12 * m | 0, R = l[Y + 4 >> 2], P = (w[0] = l[Y >> 2], N[0]), aa = (w[0] = R, N[0]), W = p[(T + 8 >> 2) + (3 * m | 0)], da = I + 12 * r | 0, sa = l[da + 4 >> 2], ta = (w[0] = l[da >> 2], N[0]), ja = (w[0] = sa, N[0]), ua = p[(I + 8 >> 2) + (3 * r | 0)], ha = T + 12 * r | 0, wa = l[ha + 4 >> 2], oa = (w[0] = l[ha >> 2], N[0]), Aa = (w[0] = wa, N[0]), Fa = p[(T + 8 >> 2) + (3 * r | 0)], La = Dm(Q), xa = Em(Q), ca = Dm(ua), Z = Em(ua), la = b + 124 | 0, ya = p[i + 20], fa = (w[0] = v, N[0]), $ = ya - fa, eb = p[i + 21], Sa = (w[0] = A, N[0]), Da = eb - Sa, na = xa * $ - La * Da, ma = La * $ + xa * Da, Ba = (N[0] = na, w[0]), za = (N[0] = ma, w[0]) | 0;
  l[la >> 2] = 0 | Ba;
  l[la + 4 >> 2] = za;
  var Ha = b + 132 | 0, jb = p[i + 22], Ia = (w[0] = y, N[0]), $a = jb - Ia, ba = p[i + 23], qa = (w[0] = z, N[0]), ka = ba - qa, ia = Z * $a - ca * ka, va = ca * $a + Z * ka, Oa = (N[0] = ia, w[0]), Pa = (N[0] = va, w[0]) | 0;
  l[Ha >> 2] = 0 | Oa;
  l[Ha + 4 >> 2] = Pa;
  var Ta = b + 116 | 0, Xa = ta + ia - M - na, ab = ja + va - V - ma, kb = (N[0] = Xa, w[0]), mb = (N[0] = ab, w[0]) | 0;
  l[Ta >> 2] = 0 | kb;
  l[Ta + 4 >> 2] = mb;
  var Qa = Ta | 0, Ma = b + 120 | 0, bb = Hh(Xa * Xa + ab * ab);
  if (.004999999888241291 < bb) {
    var Va = 1 / bb, Ja = Xa * Va;
    p[Qa >> 2] = Ja;
    var ga = ab * Va, cb = Ja;
  } else {
    cb = ga = p[Qa >> 2] = 0;
  }
  p[Ma >> 2] = ga;
  var gb = na * ga - ma * cb, db = ia * ga - va * cb, Ya = F + H * gb * gb + G + E * db * db, Ka = 0 != Ya ? 1 / Ya : 0, Ga = b + 172 | 0;
  p[Ga >> 2] = Ka;
  var fb = p[i + 17];
  if (0 < fb) {
    var Ea = bb - p[i + 26], Ua = 6.2831854820251465 * fb, ob = Ka * Ua * Ua, Na = p[d >> 2], Wa = Na * (2 * Ka * p[i + 18] * Ua + Na * ob), nb = b + 96 | 0;
    p[nb >> 2] = Wa;
    var pa = 0 != Wa ? 1 / Wa : 0;
    p[nb >> 2] = pa;
    p[i + 19] = Ea * Na * ob * pa;
    var hb = Ya + pa;
    p[Ga >> 2] = 0 != hb ? 1 / hb : 0;
  } else {
    p[i + 24] = 0, p[i + 19] = 0;
  }
  if (0 == (c[d + 20 | 0] & 1) << 24 >> 24) {
    p[i + 25] = 0;
    var Ca = Fa, ib = W, Za = P, lb = aa, qb = oa, vb = Aa;
  } else {
    var sb = b + 100 | 0, Ab = p[sb >> 2] * p[d + 8 >> 2];
    p[sb >> 2] = Ab;
    var Bb = cb * Ab, Gb = ga * Ab, Ca = Fa + E * (ia * Gb - va * Bb), ib = W - H * (na * Gb - ma * Bb), Za = P - Bb * F, lb = aa - Gb * F, qb = oa + Bb * G, vb = Aa + Gb * G;
  }
  var Cb = l[e] + 12 * m | 0, pb = (N[0] = Za, w[0]), ub = (N[0] = lb, w[0]) | 0;
  l[(Cb | 0) >> 2] = 0 | pb;
  l[(Cb + 4 | 0) >> 2] = ub;
  p[(l[e] + 8 >> 2) + (3 * l[n >> 2] | 0)] = ib;
  var Eb = l[e] + 12 * l[f] | 0, Db = (N[0] = qb, w[0]), wb = (N[0] = vb, w[0]) | 0;
  l[(Eb | 0) >> 2] = 0 | Db;
  l[(Eb + 4 | 0) >> 2] = wb;
  p[(l[e] + 8 >> 2) + (3 * l[f] | 0)] = Ca;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 108 | 0, i = l[h >> 2];
  f = (d + 28 | 0) >> 2;
  var k = l[f], m = k + 12 * i | 0;
  e = l[m + 4 >> 2];
  var n = (w[0] = l[m >> 2], N[0]), q = (w[0] = e, N[0]), r = p[(k + 8 >> 2) + (3 * i | 0)];
  e = (b + 112 | 0) >> 2;
  var t = l[e], m = k + 12 * t | 0, u = l[m + 4 >> 2], m = (w[0] = l[m >> 2], N[0]), u = (w[0] = u, N[0]), v = p[(k + 8 >> 2) + (3 * t | 0)], A = p[g + 32], C = p[g + 31], B = p[g + 34], y = p[g + 33], k = p[g + 29], t = p[g + 30], z = b + 100 | 0, F = p[z >> 2], G = (k * (m + B * -v - (n + A * -r)) + t * (u + y * v - (q + C * r)) + p[g + 19] + p[g + 24] * F) * -p[g + 43];
  p[z >> 2] = F + G;
  k *= G;
  t *= G;
  G = p[g + 39];
  A = r - p[g + 41] * (C * t - A * k);
  r = p[g + 40];
  g = v + p[g + 42] * (y * t - B * k);
  i = l[f] + 12 * i | 0;
  n = (N[0] = n - k * G, w[0]);
  q = (N[0] = q - t * G, w[0]) | 0;
  l[(i | 0) >> 2] = 0 | n;
  l[(i + 4 | 0) >> 2] = q;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = A;
  h = l[f] + 12 * l[e] | 0;
  m = (N[0] = m + k * r, w[0]);
  u = (N[0] = u + t * r, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | m;
  l[(h + 4 | 0) >> 2] = u;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = g;
}), 0, (function(b, d) {
  var e, f, g = b >> 2;
  if (0 < p[g + 17]) {
    f = 1;
  } else {
    var h = b + 108 | 0;
    e = l[h >> 2];
    f = (d + 24 | 0) >> 2;
    var i = l[f], k = i + 12 * e | 0, m = l[k + 4 >> 2], n = (w[0] = l[k >> 2], N[0]), m = (w[0] = m, N[0]), q = p[(i + 8 >> 2) + (3 * e | 0)];
    e = (b + 112 | 0) >> 2;
    var r = l[e], t = i + 12 * r | 0, u = l[t + 4 >> 2], t = (w[0] = l[t >> 2], N[0]), u = (w[0] = u, N[0]), i = p[(i + 8 >> 2) + (3 * r | 0)], v = Dm(q), A = Em(q), C = Dm(i), B = Em(i), y = p[g + 20] - p[g + 35], z = p[g + 21] - p[g + 36], r = A * y - v * z, A = v * y + A * z, y = p[g + 22] - p[g + 37], z = p[g + 23] - p[g + 38], v = B * y - C * z, C = C * y + B * z, y = t + v - n - r, B = u + C - m - A, F = Hh(y * y + B * B);
    1.1920928955078125e-7 > F ? (F = 0, z = B) : (z = 1 / F, y *= z, z *= B);
    B = F - p[g + 26];
    B = .20000000298023224 > B ? B : .20000000298023224;
    B = -.20000000298023224 > B ? -.20000000298023224 : B;
    F = B * -p[g + 43];
    y *= F;
    z *= F;
    F = p[g + 39];
    r = q - p[g + 41] * (r * z - A * y);
    q = p[g + 40];
    g = i + p[g + 42] * (v * z - C * y);
    n = (N[0] = n - y * F, w[0]);
    m = (N[0] = m - z * F, w[0]) | 0;
    l[(k | 0) >> 2] = 0 | n;
    l[(k + 4 | 0) >> 2] = m;
    p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = r;
    h = l[f] + 12 * l[e] | 0;
    k = (N[0] = t + y * q, w[0]);
    n = (N[0] = u + z * q, w[0]) | 0;
    l[(h | 0) >> 2] = 0 | k;
    l[(h + 4 | 0) >> 2] = n;
    p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = g;
    f = .004999999888241291 > (0 < B ? B : -B);
  }
  return f;
}), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 68 >> 2], h = p[e + 5], i = p[d + 72 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 76 >> 2], h = p[e + 5], i = p[d + 80 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var f = p[d + 88 >> 2] * e;
  p[b >> 2] = p[d + 84 >> 2] * e;
  p[b + 4 >> 2] = f;
}), 0, (function(b, d) {
  return p[b + 92 >> 2] * d;
}), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.pf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  b = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 17];
  f = p[d + 18];
  U(O.K | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 19];
  f = p[d + 20];
  U(O.L | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 24];
  U(O.jg | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 25];
  U(O.yd | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h = b >> 2, i = l[h + 12];
  g = i >> 2;
  var k = o[g + 2], m = b + 104 | 0;
  l[m >> 2] = k;
  var n = l[h + 13];
  e = n >> 2;
  var q = l[e + 2];
  f = (b + 108 | 0) >> 2;
  l[f] = q;
  var r = i + 28 | 0, i = b + 128 | 0, t = l[r >> 2], u = l[r + 4 >> 2];
  l[i >> 2] = t;
  l[i + 4 >> 2] = u;
  var i = n + 28 | 0, n = b + 136 | 0, v = l[i >> 2], A = l[i + 4 >> 2];
  l[n >> 2] = v;
  l[n + 4 >> 2] = A;
  i = p[g + 30];
  p[h + 36] = i;
  n = p[e + 30];
  p[h + 37] = n;
  g = p[g + 32];
  p[h + 38] = g;
  var C = p[e + 32];
  p[h + 39] = C;
  var B = l[d + 24 >> 2], y = p[(B + 8 >> 2) + (3 * k | 0)];
  e = (d + 28 | 0) >> 2;
  var z = l[e], r = z + 12 * k | 0, F = l[r + 4 >> 2], r = (w[0] = l[r >> 2], N[0]), F = (w[0] = F, N[0]), G = p[(z + 8 >> 2) + (3 * k | 0)], H = p[(B + 8 >> 2) + (3 * q | 0)], B = z + 12 * q | 0, E = l[B + 4 >> 2], B = (w[0] = l[B >> 2], N[0]), E = (w[0] = E, N[0]), q = p[(z + 8 >> 2) + (3 * q | 0)], I = Dm(y), J = Em(y), y = Dm(H), H = Em(H), z = b + 112 | 0, L = p[h + 17], t = (w[0] = t, N[0]), t = L - t, L = p[h + 18], u = (w[0] = u, N[0]), L = L - u, u = J * t - I * L, t = I * t + J * L, I = (N[0] = u, w[0]), J = (N[0] = t, w[0]) | 0;
  l[z >> 2] = 0 | I;
  l[z + 4 >> 2] = J;
  z = b + 120 | 0;
  I = p[h + 19];
  v = (w[0] = v, N[0]);
  v = I - v;
  I = p[h + 20];
  A = (w[0] = A, N[0]);
  I -= A;
  A = H * v - y * I;
  v = y * v + H * I;
  y = (N[0] = A, w[0]);
  H = (N[0] = v, w[0]) | 0;
  l[z >> 2] = 0 | y;
  l[z + 4 >> 2] = H;
  z = i + n;
  y = z + g * t * t + C * v * v;
  I = C * A;
  H = u * -g * t - I * v;
  z = z + g * u * u + I * A;
  I = y * z - H * H;
  I = 0 != I ? 1 / I : I;
  H *= -I;
  p[h + 40] = I * z;
  p[h + 41] = H;
  p[h + 42] = H;
  p[h + 43] = I * y;
  y = g + C;
  p[h + 44] = 0 < y ? 1 / y : y;
  z = b + 84 | 0;
  0 == (c[d + 20 | 0] & 1) << 24 >> 24 ? (p[z >> 2] = 0, p[h + 22] = 0, p[h + 23] = 0, C = q, g = G, i = F, F = B, n = E) : (H = d + 8 | 0, y = p[H >> 2], z |= 0, h = p[z >> 2] * y, p[z >> 2] = h, z = b + 88 | 0, y *= p[z >> 2], p[z >> 2] = y, z = b + 92 | 0, H = p[z >> 2] * p[H >> 2], p[z >> 2] = H, C = q + C * (A * y - v * h + H), g = G - g * (u * y - t * h + H), r -= h * i, i = F - y * i, F = B + h * n, n = E + y * n);
  k = l[e] + 12 * k | 0;
  r = (N[0] = r, w[0]);
  i = (N[0] = i, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | r;
  l[(k + 4 | 0) >> 2] = i;
  p[(l[e] + 8 >> 2) + (3 * l[m >> 2] | 0)] = g;
  m = l[e] + 12 * l[f] | 0;
  k = (N[0] = F, w[0]);
  n = (N[0] = n, w[0]) | 0;
  l[(m | 0) >> 2] = 0 | k;
  l[(m + 4 | 0) >> 2] = n;
  p[(l[e] + 8 >> 2) + (3 * l[f] | 0)] = C;
}), 0, (function(b, d) {
  var e, f, g, h, i = b >> 2, k = b + 104 | 0, m = l[k >> 2];
  h = (d + 28 | 0) >> 2;
  var n = l[h], q = n + 12 * m | 0;
  g = l[q + 4 >> 2];
  var r = (w[0] = l[q >> 2], N[0]), t = (w[0] = g, N[0]), u = p[(n + 8 >> 2) + (3 * m | 0)];
  g = (b + 108 | 0) >> 2;
  var v = l[g], q = n + 12 * v | 0, A = l[q + 4 >> 2], q = (w[0] = l[q >> 2], N[0]), A = (w[0] = A, N[0]), C = p[(n + 8 >> 2) + (3 * v | 0)], B = p[i + 36], v = p[i + 37], y = p[i + 38], n = p[i + 39], z = p[d >> 2], F = b + 92 | 0, G = p[F >> 2], H = z * p[i + 25], E = G + (C - u) * -p[i + 44], I = -H, H = E < H ? E : H, I = H < I ? I : H;
  p[F >> 2] = I;
  var F = I - G, G = u - y * F, u = C + n * F, C = p[i + 31], F = p[i + 30], I = p[i + 29], H = p[i + 28], E = q + C * -u - r - I * -G, J = A + F * u - t - H * G;
  e = p[i + 40] * E + p[i + 42] * J;
  var L = p[i + 41] * E + p[i + 43] * J;
  f = b + 84 | 0;
  J = l[f + 4 >> 2];
  E = (w[0] = l[f >> 2], N[0]);
  J = (w[0] = J, N[0]);
  f = (f | 0) >> 2;
  var M = E - e;
  p[f] = M;
  e = (b + 88 | 0) >> 2;
  L = p[e] - L;
  p[e] = L;
  i = z * p[i + 24];
  z = M * M + L * L;
  z > i * i ? (z = Hh(z), 1.1920928955078125e-7 > z || (z = 1 / z, M *= z, p[f] = M, L *= z, p[e] = L), z = M, z *= i, p[f] = z, i *= L, e = p[e] = i) : (z = M, e = L);
  i = z - E;
  z = e - J;
  m = l[h] + 12 * m | 0;
  r = (N[0] = r - i * B, w[0]);
  t = (N[0] = t - z * B, w[0]) | 0;
  l[(m | 0) >> 2] = 0 | r;
  l[(m + 4 | 0) >> 2] = t;
  p[(l[h] + 8 >> 2) + (3 * l[k >> 2] | 0)] = G - y * (H * z - I * i);
  k = l[h] + 12 * l[g] | 0;
  q = (N[0] = q + i * v, w[0]);
  A = (N[0] = A + z * v, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | q;
  l[(k + 4 | 0) >> 2] = A;
  p[(l[h] + 8 >> 2) + (3 * l[g] | 0)] = u + n * (F * z - C * i);
}), 0, Kb(1), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 92 >> 2], h = p[e + 5], i = p[d + 96 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 100 >> 2], h = p[e + 5], i = p[d + 104 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var f = p[d + 156 >> 2], g = p[d + 244 >> 2] * f * e;
  p[b >> 2] = p[d + 240 >> 2] * f * e;
  p[b + 4 >> 2] = g;
}), 0, (function(b, d) {
  return p[b + 156 >> 2] * p[b + 256 >> 2] * d;
}), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2], h = l[l[d + 17] + 56 >> 2], i = l[l[d + 18] + 56 >> 2];
  U(O.Df | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  b = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = b, s));
  U(O.dg | 0, (s = a, a += 4, l[s >> 2] = h, s));
  U(O.kg | 0, (s = a, a += 4, l[s >> 2] = i, s));
  h = p[d + 38];
  U(O.Db | 0, (s = a, a += 8, te[0] = h, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i, k, m, n, q, r, t, u = b >> 2, v = l[u + 12];
  t = v >> 2;
  var A = l[t + 2], C = b + 160 | 0;
  l[C >> 2] = A;
  var B = l[u + 13];
  r = B >> 2;
  var y = l[r + 2];
  q = (b + 164 | 0) >> 2;
  l[q] = y;
  var z = l[u + 21];
  n = z >> 2;
  var F = l[n + 2];
  m = (b + 168 | 0) >> 2;
  l[m] = F;
  var G = l[u + 22];
  k = G >> 2;
  var H = l[k + 2];
  i = (b + 172 | 0) >> 2;
  l[i] = H;
  var E = v + 28 | 0, I = b + 176 | 0, J = l[E >> 2], L = l[E + 4 >> 2];
  l[I >> 2] = J;
  l[I + 4 >> 2] = L;
  var M = B + 28 | 0, V = b + 184 | 0, Q = l[M >> 2], T = l[M + 4 >> 2];
  l[V >> 2] = Q;
  l[V + 4 >> 2] = T;
  var Y = z + 28 | 0, R = b + 192 | 0, P = l[Y >> 2], aa = l[Y + 4 >> 2];
  l[R >> 2] = P;
  l[R + 4 >> 2] = aa;
  var W = G + 28 | 0, da = b + 200 | 0, sa = l[W >> 2], ta = l[W + 4 >> 2];
  l[da >> 2] = sa;
  l[da + 4 >> 2] = ta;
  var ja = p[t + 30];
  p[u + 52] = ja;
  var ua = p[r + 30];
  p[u + 53] = ua;
  var ha = p[n + 30];
  p[u + 54] = ha;
  var wa = p[k + 30];
  p[u + 55] = wa;
  var oa = p[t + 32];
  p[u + 56] = oa;
  var Aa = p[r + 32];
  p[u + 57] = Aa;
  var Fa = p[n + 32];
  p[u + 58] = Fa;
  var La = p[k + 32];
  p[u + 59] = La;
  h = l[d + 24 >> 2] >> 2;
  var xa = p[h + (3 * A | 0) + 2];
  g = (d + 28 | 0) >> 2;
  var ca = l[g];
  f = ca >> 2;
  var Z = ca + 12 * A | 0, la = l[Z + 4 >> 2], ya = (w[0] = l[Z >> 2], N[0]), fa = (w[0] = la, N[0]), $ = p[f + (3 * A | 0) + 2], eb = p[h + (3 * y | 0) + 2], Sa = ca + 12 * y | 0, Da = l[Sa + 4 >> 2], na = (w[0] = l[Sa >> 2], N[0]), ma = (w[0] = Da, N[0]), Ba = p[f + (3 * y | 0) + 2], za = p[h + (3 * F | 0) + 2], Ha = ca + 12 * F | 0, jb = l[Ha + 4 >> 2], Ia = (w[0] = l[Ha >> 2], N[0]), $a = (w[0] = jb, N[0]), ba = p[f + (3 * F | 0) + 2], qa = p[h + (3 * H | 0) + 2], ka = ca + 12 * H | 0, ia = l[ka + 4 >> 2], va = (w[0] = l[ka >> 2], N[0]), Oa = (w[0] = ia, N[0]), Pa = p[f + (3 * H | 0) + 2], Ta = Dm(xa), Xa = Em(xa), ab = Dm(eb), kb = Em(eb), mb = Dm(za), Qa = Em(za), Ma = Dm(qa), bb = Em(qa);
  e = (b + 272 | 0) >> 2;
  p[e] = 0;
  var Va = 1 == (l[u + 19] | 0), Ja = (w[0] = sa, N[0]), ga = (w[0] = ta, N[0]), cb = (w[0] = Q, N[0]), gb = (w[0] = T, N[0]);
  if (Va) {
    p[u + 60] = 0;
    p[u + 61] = 0;
    p[u + 64] = 1;
    p[u + 66] = 1;
    var db = oa + Fa, Ya = 0, Ka = 0, Ga = 1, fb = 1;
  } else {
    var Ea = (w[0] = L, N[0]), Ua = (w[0] = J, N[0]), ob = (w[0] = aa, N[0]), Na = (w[0] = P, N[0]), Wa = p[u + 31], nb = p[u + 32], pa = Qa * Wa - mb * nb, hb = mb * Wa + Qa * nb, Ca = p[u + 27] - Na, ib = p[u + 28] - ob, Za = Qa * Ca - mb * ib, lb = mb * Ca + Qa * ib, qb = p[u + 23] - Ua, vb = p[u + 24] - Ea, sb = Xa * qb - Ta * vb, Ab = Ta * qb + Xa * vb, Bb = b + 240 | 0, Gb = (N[0] = pa, w[0]), Cb = (N[0] = hb, w[0]) | 0;
    l[Bb >> 2] = 0 | Gb;
    l[Bb + 4 >> 2] = Cb;
    var pb = Za * hb - lb * pa;
    p[u + 66] = pb;
    var ub = sb * hb - Ab * pa;
    p[u + 64] = ub;
    db = ha + ja + Fa * pb * pb + oa * ub * ub;
    Ya = pa;
    Ka = hb;
    Ga = ub;
    fb = pb;
  }
  var Eb = db;
  p[e] = Eb;
  if (1 == (l[u + 20] | 0)) {
    p[u + 62] = 0;
    p[u + 63] = 0;
    var Db = p[u + 38];
    p[u + 65] = Db;
    p[u + 67] = Db;
    var wb = Db * Db * (Aa + La), Hb = 0, tb = 0, xb = Db, Ib = Db;
  } else {
    var Jb = p[u + 33], Lb = p[u + 34], Xb = bb * Jb - Ma * Lb, Nb = Ma * Jb + bb * Lb, Sb = p[u + 29] - Ja, Ob = p[u + 30] - ga, Vb = bb * Sb - Ma * Ob, Zb = Ma * Sb + bb * Ob, dc = p[u + 25] - cb, fc = p[u + 26] - gb, kc = kb * dc - ab * fc, Fb = ab * dc + kb * fc, Wb = p[u + 38], vc = Xb * Wb, $b = Nb * Wb, Yb = b + 248 | 0, wc = (N[0] = vc, w[0]), xc = (N[0] = $b, w[0]) | 0;
    l[Yb >> 2] = 0 | wc;
    l[Yb + 4 >> 2] = xc;
    var Hc = Wb * (Vb * Nb - Zb * Xb);
    p[u + 67] = Hc;
    var Bd = Wb * (kc * Nb - Fb * Xb);
    p[u + 65] = Bd;
    wb = Wb * Wb * (wa + ua) + La * Hc * Hc + Aa * Bd * Bd;
    Hb = vc;
    tb = $b;
    xb = Bd;
    Ib = Hc;
  }
  var rc = Eb + wb;
  p[e] = rc;
  p[e] = 0 < rc ? 1 / rc : 0;
  var Rc = b + 156 | 0;
  if (0 == (c[d + 20 | 0] & 1) << 24 >> 24) {
    p[Rc >> 2] = 0;
    var Ic = Pa, ad = ba, pc = Ba, Pb = $, Rb = ya, bd = fa, sc = na, mc = ma, yc = Ia, tc = $a, Jc = va, uc = Oa;
  } else {
    var ec = p[Rc >> 2], Oc = ja * ec, Sc = ua * ec, lc = ha * ec, Kc = wa * ec, Ic = Pa - La * ec * Ib, ad = ba - Fa * ec * fb, pc = Ba + Aa * ec * xb, Pb = $ + oa * ec * Ga, Rb = ya + Ya * Oc, bd = fa + Ka * Oc, sc = na + Hb * Sc, mc = ma + tb * Sc, yc = Ia - Ya * lc, tc = $a - Ka * lc, Jc = va - Hb * Kc, uc = Oa - tb * Kc;
  }
  var rd = l[g] + 12 * A | 0, Cd = (N[0] = Rb, w[0]), kd = (N[0] = bd, w[0]) | 0;
  l[(rd | 0) >> 2] = 0 | Cd;
  l[(rd + 4 | 0) >> 2] = kd;
  p[(l[g] + 8 >> 2) + (3 * l[C >> 2] | 0)] = Pb;
  var sd = l[g] + 12 * l[q] | 0, Md = (N[0] = sc, w[0]), Nd = (N[0] = mc, w[0]) | 0;
  l[(sd | 0) >> 2] = 0 | Md;
  l[(sd + 4 | 0) >> 2] = Nd;
  p[(l[g] + 8 >> 2) + (3 * l[q] | 0)] = pc;
  var Vc = l[g] + 12 * l[m] | 0, Fc = (N[0] = yc, w[0]), nc = (N[0] = tc, w[0]) | 0;
  l[(Vc | 0) >> 2] = 0 | Fc;
  l[(Vc + 4 | 0) >> 2] = nc;
  p[(l[g] + 8 >> 2) + (3 * l[m] | 0)] = ad;
  var jc = l[g] + 12 * l[i] | 0, gc = (N[0] = Jc, w[0]), Od = (N[0] = uc, w[0]) | 0;
  l[(jc | 0) >> 2] = 0 | gc;
  l[(jc + 4 | 0) >> 2] = Od;
  p[(l[g] + 8 >> 2) + (3 * l[i] | 0)] = Ic;
}), 0, (function(b, d) {
  var e, f, g, h, i, k = b >> 2, m = b + 160 | 0, n = l[m >> 2];
  i = (d + 28 | 0) >> 2;
  var q = l[i];
  h = q >> 2;
  f = q + 12 * n | 0;
  e = l[f + 4 >> 2];
  var r = (w[0] = l[f >> 2], N[0]), t = (w[0] = e, N[0]), u = p[h + (3 * n | 0) + 2];
  g = (b + 164 | 0) >> 2;
  e = l[g];
  var v = q + 12 * e | 0;
  f = l[v + 4 >> 2];
  var v = (w[0] = l[v >> 2], N[0]), A = (w[0] = f, N[0]), C = p[h + (3 * e | 0) + 2];
  f = (b + 168 | 0) >> 2;
  e = l[f];
  var B = q + 12 * e | 0, y = l[B + 4 >> 2], B = (w[0] = l[B >> 2], N[0]), y = (w[0] = y, N[0]), z = p[h + (3 * e | 0) + 2];
  e = (b + 172 | 0) >> 2;
  var F = l[e], q = q + 12 * F | 0, G = l[q + 4 >> 2], q = (w[0] = l[q >> 2], N[0]), G = (w[0] = G, N[0]), H = p[h + (3 * F | 0) + 2], E = p[k + 60], I = p[k + 61], F = p[k + 62];
  h = p[k + 63];
  var J = p[k + 64], L = p[k + 66], M = p[k + 65], V = p[k + 67], Q = (E * (r - B) + I * (t - y) + F * (v - q) + h * (A - G) + (J * u - L * z) + (M * C - V * H)) * -p[k + 68], T = b + 156 | 0;
  p[T >> 2] += Q;
  var T = p[k + 52] * Q, Y = u + p[k + 56] * Q * J, J = p[k + 53] * Q, M = C + p[k + 57] * Q * M, C = p[k + 54] * Q, z = z - p[k + 58] * Q * L, u = p[k + 55] * Q, k = H - p[k + 59] * Q * V, n = l[i] + 12 * n | 0, r = (N[0] = r + E * T, w[0]), t = (N[0] = t + I * T, w[0]) | 0;
  l[(n | 0) >> 2] = 0 | r;
  l[(n + 4 | 0) >> 2] = t;
  p[(l[i] + 8 >> 2) + (3 * l[m >> 2] | 0)] = Y;
  m = l[i] + 12 * l[g] | 0;
  v = (N[0] = v + F * J, w[0]);
  A = (N[0] = A + h * J, w[0]) | 0;
  l[(m | 0) >> 2] = 0 | v;
  l[(m + 4 | 0) >> 2] = A;
  p[(l[i] + 8 >> 2) + (3 * l[g] | 0)] = M;
  g = l[i] + 12 * l[f] | 0;
  m = (N[0] = B - E * C, w[0]);
  v = (N[0] = y - I * C, w[0]) | 0;
  l[(g | 0) >> 2] = 0 | m;
  l[(g + 4 | 0) >> 2] = v;
  p[(l[i] + 8 >> 2) + (3 * l[f] | 0)] = z;
  f = l[i] + 12 * l[e] | 0;
  g = (N[0] = q - F * u, w[0]);
  m = (N[0] = G - h * u, w[0]) | 0;
  l[(f | 0) >> 2] = 0 | g;
  l[(f + 4 | 0) >> 2] = m;
  p[(l[i] + 8 >> 2) + (3 * l[e] | 0)] = k;
}), 0, (function(b, d) {
  var e, f, g, h, i, k = b >> 2, m = b + 160 | 0, n = l[m >> 2];
  i = (d + 24 | 0) >> 2;
  var q = l[i];
  h = q >> 2;
  var r = q + 12 * n | 0, t = l[r + 4 >> 2], u = (w[0] = l[r >> 2], N[0]), v = (w[0] = t, N[0]), A = p[h + (3 * n | 0) + 2];
  g = (b + 164 | 0) >> 2;
  var C = l[g], B = q + 12 * C | 0, y = l[B + 4 >> 2], z = (w[0] = l[B >> 2], N[0]), F = (w[0] = y, N[0]), G = p[h + (3 * C | 0) + 2];
  f = (b + 168 | 0) >> 2;
  var H = l[f], E = q + 12 * H | 0, I = l[E + 4 >> 2], J = (w[0] = l[E >> 2], N[0]), L = (w[0] = I, N[0]), M = p[h + (3 * H | 0) + 2];
  e = (b + 172 | 0) >> 2;
  var V = l[e], Q = q + 12 * V | 0, T = l[Q + 4 >> 2], Y = (w[0] = l[Q >> 2], N[0]), R = (w[0] = T, N[0]), P = p[h + (3 * V | 0) + 2], aa = Dm(A), W = Em(A), da = Dm(G), sa = Em(G), ta = Dm(M), ja = Em(M), ua = Dm(P), ha = Em(P);
  if (1 == (l[k + 19] | 0)) {
    var wa = p[k + 56], oa = p[k + 58], Aa = wa + oa, Fa = A - M - p[k + 35], La = 1, xa = 1, ca = 0, Z = 0, la = wa, ya = oa;
  } else {
    var fa = p[k + 31], $ = p[k + 32], eb = ja * fa - ta * $, Sa = ta * fa + ja * $, Da = p[k + 27] - p[k + 48], na = p[k + 28] - p[k + 49], ma = p[k + 23] - p[k + 44], Ba = p[k + 24] - p[k + 45], za = W * ma - aa * Ba, Ha = aa * ma + W * Ba, jb = (ja * Da - ta * na) * Sa - (ta * Da + ja * na) * eb, Ia = za * Sa - Ha * eb, $a = p[k + 58], ba = p[k + 56], qa = za + (u - J), ka = Ha + (v - L), Aa = p[k + 54] + p[k + 52] + $a * jb * jb + ba * Ia * Ia, Fa = (ja * qa + ta * ka - Da) * fa + (qa * -ta + ja * ka - na) * $, La = Ia, xa = jb, ca = eb, Z = Sa, la = ba, ya = $a;
  }
  if (1 == (l[k + 20] | 0)) {
    var ia = p[k + 38], va = p[k + 57], Oa = p[k + 59], Pa = ia * ia * (va + Oa), Ta = ia, Xa = G - P - p[k + 36], ab = ia, kb = 0, mb = 0, Qa = ia, Ma = va, bb = Oa;
  } else {
    var Va = p[k + 33], Ja = p[k + 34], ga = ha * Va - ua * Ja, cb = ua * Va + ha * Ja, gb = p[k + 29] - p[k + 50], db = p[k + 30] - p[k + 51], Ya = p[k + 25] - p[k + 46], Ka = p[k + 26] - p[k + 47], Ga = sa * Ya - da * Ka, fb = da * Ya + sa * Ka, Ea = p[k + 38], Ua = Ea * ((ha * gb - ua * db) * cb - (ua * gb + ha * db) * ga), ob = Ea * (Ga * cb - fb * ga), Na = p[k + 59], Wa = p[k + 57], nb = Ga + (z - Y), pa = fb + (F - R), Pa = Ea * Ea * (p[k + 55] + p[k + 53]) + Na * Ua * Ua + Wa * ob * ob, Ta = Ua, Xa = (ha * nb + ua * pa - gb) * Va + (nb * -ua + ha * pa - db) * Ja, ab = ob, kb = ga * Ea, mb = cb * Ea, Qa = Ea, Ma = Wa, bb = Na;
  }
  var hb = Aa + Pa, Ca = 0 < hb ? -(Fa + Qa * Xa - p[k + 37]) / hb : 0, ib = p[k + 52] * Ca, Za = v + Z * ib, lb = A + la * Ca * La, qb = p[k + 53] * Ca, vb = z + kb * qb, sb = F + mb * qb, Ab = G + Ma * Ca * ab, Bb = p[k + 54] * Ca, Gb = J - ca * Bb, Cb = L - Z * Bb, pb = M - ya * Ca * xa, ub = p[k + 55] * Ca, Eb = Y - kb * ub, Db = R - mb * ub, wb = P - bb * Ca * Ta, Hb = (N[0] = u + ca * ib, w[0]), tb = (N[0] = Za, w[0]) | 0;
  l[(r | 0) >> 2] = 0 | Hb;
  l[(r + 4 | 0) >> 2] = tb;
  p[(l[i] + 8 >> 2) + (3 * l[m >> 2] | 0)] = lb;
  var xb = l[i] + 12 * l[g] | 0, Ib = (N[0] = vb, w[0]), Jb = (N[0] = sb, w[0]) | 0;
  l[(xb | 0) >> 2] = 0 | Ib;
  l[(xb + 4 | 0) >> 2] = Jb;
  p[(l[i] + 8 >> 2) + (3 * l[g] | 0)] = Ab;
  var Lb = l[i] + 12 * l[f] | 0, Xb = (N[0] = Gb, w[0]), Nb = (N[0] = Cb, w[0]) | 0;
  l[(Lb | 0) >> 2] = 0 | Xb;
  l[(Lb + 4 | 0) >> 2] = Nb;
  p[(l[i] + 8 >> 2) + (3 * l[f] | 0)] = pb;
  var Sb = l[i] + 12 * l[e] | 0, Ob = (N[0] = Eb, w[0]), Vb = (N[0] = Db, w[0]) | 0;
  l[(Sb | 0) >> 2] = 0 | Ob;
  l[(Sb + 4 | 0) >> 2] = Vb;
  p[(l[i] + 8 >> 2) + (3 * l[e] | 0)] = wb;
  return 1;
}), 0, (function() {
  var b = a;
  U(O.rf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  a = b;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e = d + 76 | 0, f = l[e + 4 >> 2];
  l[b >> 2] = l[e >> 2];
  l[b + 4 >> 2] = f;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 68 >> 2], h = p[e + 5], i = p[d + 72 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var f = p[d + 100 >> 2] * e;
  p[b >> 2] = p[d + 96 >> 2] * e;
  p[b + 4 >> 2] = f;
}), 0, Kb(0), 0, (function() {
  var b = a;
  U(O.Vf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  a = b;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h = b >> 2;
  e = l[h + 13];
  g = e >> 2;
  var i = l[g + 2];
  f = (b + 116 | 0) >> 2;
  l[f] = i;
  var k = b + 128 | 0;
  e = e + 28 | 0;
  var m = l[e + 4 >> 2];
  l[k >> 2] = l[e >> 2];
  l[k + 4 >> 2] = m;
  var n = b + 136 | 0;
  p[n >> 2] = p[g + 30];
  var q = b + 140 | 0;
  p[q >> 2] = p[g + 32];
  e = l[d + 24 >> 2];
  var r = e + 12 * i | 0, m = l[r + 4 >> 2], t = (w[0] = l[r >> 2], N[0]), u = (w[0] = m, N[0]), v = p[(e + 8 >> 2) + (3 * i | 0)];
  e = (d + 28 | 0) >> 2;
  var A = l[e], m = A + 12 * i | 0, r = l[m + 4 >> 2], m = (w[0] = l[m >> 2], N[0]), r = (w[0] = r, N[0]), i = p[(A + 8 >> 2) + (3 * i | 0)], A = Dm(v), C = Em(v), B = p[g + 29], y = 6.2831854820251465 * p[h + 21], v = p[d >> 2];
  g = v * B * y * y;
  B = 2 * B * p[h + 22] * y + g;
  1.1920928955078125e-7 < B || S(O.ba | 0, 125, O.Qc | 0, O.Nf | 0);
  v *= B;
  v = 0 != v ? 1 / v : v;
  p[h + 27] = v;
  g *= v;
  p[h + 23] = g;
  B = p[h + 17] - p[k >> 2];
  y = p[h + 18] - p[h + 33];
  k = C * B - A * y;
  A = A * B + C * y;
  C = b + 120 | 0;
  B = (N[0] = k, w[0]);
  y = (N[0] = A, w[0]) | 0;
  l[(C | 0) >> 2] = 0 | B;
  l[(C + 4 | 0) >> 2] = y;
  n = p[n >> 2];
  q = p[q >> 2];
  C = n + q * A * A + v;
  B = k * -q * A;
  v = n + q * k * k + v;
  y = C * v - B * B;
  y = 0 != y ? 1 / y : y;
  B *= -y;
  p[h + 36] = y * v;
  p[h + 37] = B;
  p[h + 38] = B;
  p[h + 39] = y * C;
  v = b + 160 | 0;
  t = t + k - p[h + 19];
  u = u + A - p[h + 20];
  C = (N[0] = t, w[0]);
  B = (N[0] = u, w[0]);
  l[(v | 0) >> 2] = 0 | C;
  l[(v + 4 | 0) >> 2] = B | 0;
  p[v >> 2] = t * g;
  p[h + 41] = u * g;
  t = .9800000190734863 * i;
  i = b + 96 | 0;
  0 == (c[d + 20 | 0] & 1) << 24 >> 24 ? (p[i >> 2] = 0, p[h + 25] = 0, h = m) : (u = p[d + 8 >> 2], i |= 0, h = p[i >> 2] * u, p[i >> 2] = h, i = b + 100 | 0, u *= p[i >> 2], p[i >> 2] = u, t += q * (k * u - A * h), h = m + h * n, r += u * n);
  m = l[e] + 12 * l[f] | 0;
  h = (N[0] = h, w[0]);
  r = (N[0] = r, w[0]) | 0;
  l[(m | 0) >> 2] = 0 | h;
  l[(m + 4 | 0) >> 2] = r;
  p[(l[e] + 8 >> 2) + (3 * l[f] | 0)] = t;
}), 0, (function(b, d) {
  var e, f, g, h = b >> 2, i = b + 116 | 0, k = l[i >> 2];
  g = (d + 28 | 0) >> 2;
  var m = l[g], n = m + 12 * k | 0, q = l[n + 4 >> 2], n = (w[0] = l[n >> 2], N[0]), q = (w[0] = q, N[0]), m = p[(m + 8 >> 2) + (3 * k | 0)], r = p[h + 31], t = p[h + 30], u = p[h + 27], v = b + 96 | 0;
  f = (v | 0) >> 2;
  var A = p[f];
  e = (b + 100 | 0) >> 2;
  var C = p[e], B = -(n + r * -m + p[h + 40] + A * u), y = -(q + t * m + p[h + 41] + C * u), u = p[h + 36] * B + p[h + 38] * y, y = p[h + 37] * B + p[h + 39] * y, B = l[v + 4 >> 2], v = (w[0] = l[v >> 2], N[0]), B = (w[0] = B, N[0]), A = A + u;
  p[f] = A;
  C += y;
  p[e] = C;
  u = p[d >> 2] * p[h + 26];
  y = A * A + C * C;
  y > u * u ? (y = Hh(y), u /= y, A *= u, p[f] = A, f = C * u, p[e] = f, e = A) : (e = A, f = C);
  e -= v;
  f -= B;
  v = p[h + 34];
  h = m + p[h + 35] * (t * f - r * e);
  k = l[g] + 12 * k | 0;
  n = (N[0] = n + e * v, w[0]);
  q = (N[0] = q + f * v, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | n;
  l[(k + 4 | 0) >> 2] = q;
  p[(l[g] + 8 >> 2) + (3 * l[i >> 2] | 0)] = h;
}), 0, Kb(1), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 68 >> 2], h = p[e + 5], i = p[d + 72 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 76 >> 2], h = p[e + 5], i = p[d + 80 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var d = d >> 2, f = p[d + 26], g = p[d + 29] + p[d + 28], h = (p[d + 49] * f + p[d + 47] * g) * e;
  p[b >> 2] = (p[d + 48] * f + p[d + 46] * g) * e;
  p[b + 4 >> 2] = h;
}), 0, (function(b, d) {
  return p[b + 108 >> 2] * d;
}), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.Ie | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  f = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = f, s));
  f = p[d + 17];
  g = p[d + 18];
  U(O.K | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  f = p[d + 19];
  g = p[d + 20];
  U(O.L | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  f = p[d + 21];
  g = p[d + 22];
  U(O.Ub | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  f = p[d + 25];
  U(O.Za | 0, (s = a, a += 8, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  f = c[b + 136 | 0] & 1;
  U(O.Wb | 0, (s = a, a += 4, l[s >> 2] = f, s));
  f = p[d + 30];
  U(O.Ed | 0, (s = a, a += 8, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  f = p[d + 31];
  U(O.Od | 0, (s = a, a += 8, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = c[b + 137 | 0] & 1;
  U(O.$a | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 33];
  U(O.ab | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 32];
  U(O.de | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i, k = b >> 2, m = l[k + 12];
  i = m >> 2;
  var n = o[i + 2], q = b + 144 | 0;
  l[q >> 2] = n;
  var r = l[k + 13];
  h = r >> 2;
  var t = l[h + 2];
  g = (b + 148 | 0) >> 2;
  l[g] = t;
  var u = m + 28 | 0, v = b + 152 | 0, A = l[u >> 2], C = l[u + 4 >> 2];
  l[v >> 2] = A;
  l[v + 4 >> 2] = C;
  var B = r + 28 | 0, y = b + 160 | 0, z = l[B >> 2], F = l[B + 4 >> 2];
  l[y >> 2] = z;
  l[y + 4 >> 2] = F;
  var G = p[i + 30];
  p[k + 42] = G;
  var H = p[h + 30];
  p[k + 43] = H;
  var E = p[i + 32];
  p[k + 44] = E;
  var I = p[h + 32];
  p[k + 45] = I;
  var J = l[d + 24 >> 2], L = J + 12 * n | 0, M = l[L + 4 >> 2], V = (w[0] = l[L >> 2], N[0]), Q = (w[0] = M, N[0]), T = p[(J + 8 >> 2) + (3 * n | 0)];
  f = (d + 28 | 0) >> 2;
  var Y = l[f], R = Y + 12 * n | 0, P = l[R + 4 >> 2], aa = (w[0] = l[R >> 2], N[0]), W = (w[0] = P, N[0]), da = p[(Y + 8 >> 2) + (3 * n | 0)], sa = J + 12 * t | 0, ta = l[sa + 4 >> 2], ja = (w[0] = l[sa >> 2], N[0]), ua = (w[0] = ta, N[0]), ha = p[(J + 8 >> 2) + (3 * t | 0)], wa = Y + 12 * t | 0, oa = l[wa + 4 >> 2], Aa = (w[0] = l[wa >> 2], N[0]), Fa = (w[0] = oa, N[0]), La = p[(Y + 8 >> 2) + (3 * t | 0)], xa = Dm(T), ca = Em(T), Z = Dm(ha), la = Em(ha), ya = p[k + 17], fa = (w[0] = A, N[0]), $ = ya - fa, eb = p[k + 18], Sa = (w[0] = C, N[0]), Da = eb - Sa, na = ca * $ - xa * Da, ma = xa * $ + ca * Da, Ba = p[k + 19], za = (w[0] = z, N[0]), Ha = Ba - za, jb = p[k + 20], Ia = (w[0] = F, N[0]), $a = jb - Ia, ba = la * Ha - Z * $a, qa = Z * Ha + la * $a, ka = ja - V + ba - na, ia = ua - Q + qa - ma, va = p[k + 21], Oa = p[k + 22], Pa = ca * va - xa * Oa, Ta = xa * va + ca * Oa, Xa = b + 184 | 0, ab = (N[0] = Pa, w[0]), kb = (N[0] = Ta, w[0]) | 0;
  l[Xa >> 2] = 0 | ab;
  l[Xa + 4 >> 2] = kb;
  var mb = ka + na, Qa = ia + ma, Ma = mb * Ta - Qa * Pa;
  p[k + 52] = Ma;
  var bb = ba * Ta - qa * Pa;
  p[k + 53] = bb;
  var Va = G + H, Ja = E * Ma, ga = I * bb, cb = Va + Ja * Ma + ga * bb;
  p[k + 63] = 0 < cb ? 1 / cb : cb;
  var gb = p[k + 23], db = p[k + 24], Ya = ca * gb - xa * db, Ka = xa * gb + ca * db, Ga = b + 192 | 0, fb = (N[0] = Ya, w[0]), Ea = (N[0] = Ka, w[0]) | 0;
  l[Ga >> 2] = 0 | fb;
  l[Ga + 4 >> 2] = Ea;
  var Ua = mb * Ka - Qa * Ya;
  p[k + 50] = Ua;
  var ob = ba * Ka - qa * Ya;
  p[k + 51] = ob;
  var Na = E * Ua, Wa = I * ob, nb = Na + Wa, pa = Na * Ma + Wa * bb, hb = E + I, Ca = 0 == hb ? 1 : hb, ib = Ja + ga;
  p[k + 54] = Va + Na * Ua + Wa * ob;
  p[k + 55] = nb;
  p[k + 56] = pa;
  p[k + 57] = nb;
  p[k + 58] = Ca;
  p[k + 59] = ib;
  p[k + 60] = pa;
  p[k + 61] = ib;
  p[k + 62] = cb;
  var Za = 0 == (c[b + 136 | 0] & 1) << 24 >> 24;
  do {
    if (Za) {
      l[k + 35] = 0, p[k + 28] = 0;
    } else {
      var lb = Pa * ka + Ta * ia, qb = p[k + 31], vb = p[k + 30], sb = qb - vb;
      if (.009999999776482582 > (0 < sb ? sb : -sb)) {
        l[k + 35] = 3;
      } else {
        if (lb > vb) {
          if (e = (b + 140 | 0) >> 2, lb < qb) {
            l[e] = 0;
          } else {
            if (2 == (l[e] | 0)) {
              break;
            }
            l[e] = 2;
          }
        } else {
          var Ab = b + 140 | 0;
          if (1 == (l[Ab >> 2] | 0)) {
            break;
          }
          l[Ab >> 2] = 1;
        }
        p[k + 28] = 0;
      }
    }
  } while (0);
  0 == (c[b + 137 | 0] & 1) << 24 >> 24 && (p[k + 29] = 0);
  var Bb = b + 104 | 0;
  if (0 == (c[d + 20 | 0] & 1) << 24 >> 24) {
    p[Bb >> 2] = 0;
    p[k + 27] = 0;
    p[k + 28] = 0;
    p[k + 29] = 0;
    var Gb = La, Cb = da, pb = aa, ub = W, Eb = Aa, Db = Fa;
  } else {
    var wb = d + 8 | 0, Hb = p[wb >> 2], tb = Bb | 0, xb = p[tb >> 2] * Hb;
    p[tb >> 2] = xb;
    var Ib = b + 108 | 0, Jb = p[Ib >> 2] * Hb;
    p[Ib >> 2] = Jb;
    var Lb = b + 112 | 0, Xb = p[Lb >> 2] * Hb;
    p[Lb >> 2] = Xb;
    var Nb = b + 116 | 0, Sb = p[Nb >> 2] * p[wb >> 2];
    p[Nb >> 2] = Sb;
    var Ob = Sb + Xb, Vb = Ya * xb + Pa * Ob, Zb = Ka * xb + Ta * Ob, Gb = La + I * (xb * ob + Jb + Ob * bb), Cb = da - E * (xb * Ua + Jb + Ob * Ma), pb = aa - Vb * G, ub = W - Zb * G, Eb = Aa + Vb * H, Db = Fa + Zb * H;
  }
  var dc = l[f] + 12 * n | 0, fc = (N[0] = pb, w[0]), kc = (N[0] = ub, w[0]) | 0;
  l[(dc | 0) >> 2] = 0 | fc;
  l[(dc + 4 | 0) >> 2] = kc;
  p[(l[f] + 8 >> 2) + (3 * l[q >> 2] | 0)] = Cb;
  var Fb = l[f] + 12 * l[g] | 0, Wb = (N[0] = Eb, w[0]), vc = (N[0] = Db, w[0]) | 0;
  l[(Fb | 0) >> 2] = 0 | Wb;
  l[(Fb + 4 | 0) >> 2] = vc;
  p[(l[f] + 8 >> 2) + (3 * l[g] | 0)] = Gb;
}), 0, (function(b, d) {
  var e, f, g, h, i, k, m, n = b >> 2, q = a;
  a += 24;
  var r, t = q + 12;
  m = t >> 2;
  k = (b + 144 | 0) >> 2;
  var u = o[k];
  i = (d + 28 | 0) >> 2;
  var v = l[i], A = v + 12 * u | 0, C = l[A + 4 >> 2], B = (w[0] = l[A >> 2], N[0]), y = (w[0] = C, N[0]), z = p[(v + 8 >> 2) + (3 * u | 0)];
  h = (b + 148 | 0) >> 2;
  var F = l[h], G = v + 12 * F | 0, H = l[G + 4 >> 2], E = (w[0] = l[G >> 2], N[0]), I = (w[0] = H, N[0]), J = p[(v + 8 >> 2) + (3 * F | 0)], L = p[n + 42], M = p[n + 43], V = p[n + 44], Q = p[n + 45];
  if (0 == (c[b + 137 | 0] & 1) << 24 >> 24) {
    var T = J, Y = z, R = B, P = y, aa = E, W = I;
  } else {
    if (3 == (l[n + 35] | 0)) {
      T = J, Y = z, R = B, P = y, aa = E, W = I;
    } else {
      var da = p[n + 46], sa = p[n + 47], ta = p[n + 53], ja = p[n + 52], ua = b + 116 | 0, ha = p[ua >> 2], wa = p[d >> 2] * p[n + 32], oa = ha + p[n + 63] * (p[n + 33] - (da * (E - B) + sa * (I - y) + ta * J - ja * z)), Aa = -wa, Fa = oa < wa ? oa : wa, La = Fa < Aa ? Aa : Fa;
      p[ua >> 2] = La;
      var xa = La - ha, ca = da * xa, Z = sa * xa, T = J + Q * xa * ta, Y = z - V * xa * ja, R = B - ca * L, P = y - Z * L, aa = E + ca * M, W = I + Z * M;
    }
  }
  var la = aa - R, ya = W - P, fa = b + 192 | 0, $ = p[fa >> 2], eb = b + 196 | 0, Sa = p[eb >> 2], Da = b + 204 | 0, na = p[Da >> 2], ma = b + 200 | 0, Ba = p[ma >> 2], za = $ * la + Sa * ya + na * T - Ba * Y, Ha = T - Y;
  if (0 == (c[b + 136 | 0] & 1) << 24 >> 24) {
    r = 11;
  } else {
    var jb = b + 140 | 0;
    if (0 == (l[jb >> 2] | 0)) {
      r = 11;
    } else {
      var Ia = b + 184 | 0, $a = b + 188 | 0, ba = b + 212 | 0, qa = b + 208 | 0;
      g = (b + 104 | 0) >> 2;
      var ka = p[g];
      f = (b + 108 | 0) >> 2;
      var ia = p[f];
      e = (b + 112 | 0) >> 2;
      var va = p[e], Oa = b + 216 | 0, Pa = -za, Ta = -Ha, Xa = -(p[Ia >> 2] * la + p[$a >> 2] * ya + p[ba >> 2] * T - p[qa >> 2] * Y);
      p[m] = Pa;
      p[m + 1] = Ta;
      p[m + 2] = Xa;
      $m(q, Oa, t);
      var ab = q | 0;
      p[g] += p[ab >> 2];
      var kb = q + 4 | 0;
      p[f] += p[kb >> 2];
      var mb = q + 8 | 0, Qa = p[e] + p[mb >> 2];
      p[e] = Qa;
      var Ma = l[jb >> 2];
      if (1 == Ma) {
        var bb = 0 < Qa ? Qa : 0, Va = p[e] = bb;
      } else {
        if (2 == Ma) {
          var Ja = 0 > Qa ? Qa : 0, Va = p[e] = Ja;
        } else {
          Va = Qa;
        }
      }
      var ga = Va - va, cb = Pa - p[n + 60] * ga, gb = Ta - p[n + 61] * ga, db = p[Oa >> 2], Ya = p[n + 57], Ka = p[n + 55], Ga = p[n + 58], fb = db * Ga - Ya * Ka, Ea = 0 != fb ? 1 / fb : fb, Ua = Ea * (Ga * cb - Ya * gb) + ka, ob = Ea * (db * gb - Ka * cb) + ia;
      p[g] = Ua;
      p[f] = ob;
      var Na = Ua - ka, Wa = ob - ia;
      p[ab >> 2] = Na;
      p[kb >> 2] = Wa;
      p[mb >> 2] = ga;
      var nb = Na * p[Da >> 2] + Wa + ga * p[ba >> 2], pa = Na * p[ma >> 2] + Wa + ga * p[qa >> 2], hb = p[fa >> 2] * Na + p[Ia >> 2] * ga, Ca = p[eb >> 2] * Na + p[$a >> 2] * ga, ib = l[k];
      r = 14;
    }
  }
  if (11 == r) {
    var Za = -za, lb = -Ha, qb = p[n + 54], vb = p[n + 57], sb = p[n + 55], Ab = p[n + 58], Bb = qb * Ab - vb * sb, Gb = 0 != Bb ? 1 / Bb : Bb, Cb = Gb * (Ab * Za - vb * lb), pb = Gb * (qb * lb - sb * Za), ub = b + 104 | 0;
    p[ub >> 2] += Cb;
    var Eb = b + 108 | 0;
    p[Eb >> 2] += pb;
    nb = Cb * na + pb;
    pa = Cb * Ba + pb;
    hb = $ * Cb;
    Ca = Sa * Cb;
    ib = u;
  }
  var Db = T + Q * nb, wb = Y - V * pa, Hb = P - Ca * L, tb = aa + hb * M, xb = W + Ca * M, Ib = l[i] + 12 * ib | 0, Jb = (N[0] = R - hb * L, w[0]), Lb = (N[0] = Hb, w[0]) | 0;
  l[(Ib | 0) >> 2] = 0 | Jb;
  l[(Ib + 4 | 0) >> 2] = Lb;
  p[(l[i] + 8 >> 2) + (3 * l[k] | 0)] = wb;
  var Xb = l[i] + 12 * l[h] | 0, Nb = (N[0] = tb, w[0]), Sb = (N[0] = xb, w[0]) | 0;
  l[(Xb | 0) >> 2] = 0 | Nb;
  l[(Xb + 4 | 0) >> 2] = Sb;
  p[(l[i] + 8 >> 2) + (3 * l[h] | 0)] = Db;
  a = q;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 144 | 0, i = l[h >> 2];
  f = (d + 24 | 0) >> 2;
  var k = l[f], m = k + 12 * i | 0, n = l[m + 4 >> 2], q = (w[0] = l[m >> 2], N[0]), r = (w[0] = n, N[0]), t = p[(k + 8 >> 2) + (3 * i | 0)];
  e = (b + 148 | 0) >> 2;
  var u = l[e], v = k + 12 * u | 0, A = l[v + 4 >> 2], C = (w[0] = l[v >> 2], N[0]), B = (w[0] = A, N[0]), y = p[(k + 8 >> 2) + (3 * u | 0)], z = Dm(t), F = Em(t), G = Dm(y), H = Em(y), E = p[g + 42], I = p[g + 43], J = p[g + 44], L = p[g + 45], M = p[g + 17] - p[g + 38], V = p[g + 18] - p[g + 39], Q = F * M - z * V, T = z * M + F * V, Y = p[g + 19] - p[g + 40], R = p[g + 20] - p[g + 41], P = H * Y - G * R, aa = G * Y + H * R, W = C + P - q - Q, da = B + aa - r - T, sa = p[g + 21], ta = p[g + 22], ja = F * sa - z * ta, ua = z * sa + F * ta, ha = W + Q, wa = da + T, oa = ha * ua - wa * ja, Aa = P * ua - aa * ja, Fa = p[g + 23], La = p[g + 24], xa = F * Fa - z * La, ca = z * Fa + F * La, Z = ha * ca - wa * xa, la = P * ca - aa * xa, ya = xa * W + ca * da, fa = y - t - p[g + 25], $ = 0 < ya ? ya : -ya, eb = 0 < fa ? fa : -fa;
  if (0 == (c[b + 136 | 0] & 1) << 24 >> 24) {
    var Sa = 0, Da = 0, na = $;
  } else {
    var ma = ja * W + ua * da, Ba = p[g + 31], za = p[g + 30], Ha = Ba - za;
    if (.009999999776482582 > (0 < Ha ? Ha : -Ha)) {
      var jb = .20000000298023224 > ma ? ma : .20000000298023224, Ia = 0 < ma ? ma : -ma, $a = $ > Ia ? $ : Ia, Sa = -.20000000298023224 > jb ? -.20000000298023224 : jb, Da = 1, na = $a;
    } else {
      if (ma > za) {
        if (ma < Ba) {
          Da = Sa = 0, na = $;
        } else {
          var ba = ma - Ba, qa = ba - .004999999888241291, ka = .20000000298023224 > qa ? qa : .20000000298023224, ia = $ > ba ? $ : ba, Sa = 0 > ka ? 0 : ka, Da = 1, na = ia;
        }
      } else {
        var va = ma - za + .004999999888241291, Oa = 0 > va ? va : 0, Pa = za - ma, Ta = $ > Pa ? $ : Pa, Sa = -.20000000298023224 > Oa ? -.20000000298023224 : Oa, Da = 1, na = Ta;
      }
    }
  }
  var Xa = E + I, ab = J * Z, kb = L * la, mb = Xa + ab * Z + kb * la, Qa = ab + kb;
  if (Da) {
    var Ma = ab * oa + kb * Aa, bb = J + L, Va = 0 == bb ? 1 : bb, Ja = J * oa, ga = L * Aa, cb = Ja + ga, gb = Xa + Ja * oa + ga * Aa, db = -ya, Ya = -fa, Ka = -Sa, Ga = Va * gb - cb * cb, fb = cb * Ma - Qa * gb, Ea = Qa * cb - Va * Ma, Ua = mb * Ga + Qa * fb + Ma * Ea, ob = 0 != Ua ? 1 / Ua : Ua, Na = cb * db, Wa = ob * (Ga * db + fb * Ya + Ea * Ka), nb = ob * (mb * (gb * Ya - cb * Ka) + Qa * (Ma * Ka - gb * db) + Ma * (Na - Ma * Ya)), pa = ob * (mb * (Va * Ka - cb * Ya) + Qa * (Na - Qa * Ka) + Ma * (Qa * Ya - Va * db));
  } else {
    var hb = J + L, Ca = 0 == hb ? 1 : hb, ib = -ya, Za = -fa, lb = mb * Ca - Qa * Qa, qb = 0 != lb ? 1 / lb : lb, Wa = qb * (Ca * ib - Qa * Za), nb = qb * (mb * Za - Qa * ib), pa = 0;
  }
  var vb = xa * Wa + ja * pa, sb = ca * Wa + ua * pa, Ab = r - sb * E, Bb = t - J * (Wa * Z + nb + pa * oa), Gb = C + vb * I, Cb = B + sb * I, pb = y + L * (Wa * la + nb + pa * Aa), ub = (N[0] = q - vb * E, w[0]), Eb = (N[0] = Ab, w[0]) | 0;
  l[(m | 0) >> 2] = 0 | ub;
  l[(m + 4 | 0) >> 2] = Eb;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = Bb;
  var Db = l[f] + 12 * l[e] | 0, wb = (N[0] = Gb, w[0]), Hb = (N[0] = Cb, w[0]) | 0;
  l[(Db | 0) >> 2] = 0 | wb;
  l[(Db + 4 | 0) >> 2] = Hb;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = pb;
  return .004999999888241291 < na ? 0 : .03490658849477768 >= eb;
}), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 92 >> 2], h = p[e + 5], i = p[d + 96 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 100 >> 2], h = p[e + 5], i = p[d + 104 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var f = p[d + 116 >> 2], g = p[d + 140 >> 2] * f * e;
  p[b >> 2] = p[d + 136 >> 2] * f * e;
  p[b + 4 >> 2] = g;
}), 0, Kb(0), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.tf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  b = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 17];
  f = p[d + 18];
  U(O.$f | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 19];
  f = p[d + 20];
  U(O.eg | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 23];
  f = p[d + 24];
  U(O.K | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 25];
  f = p[d + 26];
  U(O.L | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 21];
  U(O.Fd | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 22];
  U(O.Pd | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 28];
  U(O.Db | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i = b >> 2, k = l[i + 12];
  h = k >> 2;
  var m = l[h + 2], n = b + 120 | 0;
  l[n >> 2] = m;
  var q = l[i + 13];
  g = q >> 2;
  var r = l[g + 2];
  f = (b + 124 | 0) >> 2;
  l[f] = r;
  var t = k + 28 | 0, u = b + 160 | 0, v = l[t >> 2], A = l[t + 4 >> 2];
  l[u >> 2] = v;
  l[u + 4 >> 2] = A;
  var C = q + 28 | 0, B = b + 168 | 0, y = l[C >> 2], z = l[C + 4 >> 2];
  l[B >> 2] = y;
  l[B + 4 >> 2] = z;
  var F = p[h + 30];
  p[i + 44] = F;
  var G = p[g + 30];
  p[i + 45] = G;
  var H = p[h + 32];
  p[i + 46] = H;
  var E = p[g + 32];
  p[i + 47] = E;
  var I = l[d + 24 >> 2], J = I + 12 * m | 0, L = l[J + 4 >> 2], M = (w[0] = l[J >> 2], N[0]), V = (w[0] = L, N[0]), Q = p[(I + 8 >> 2) + (3 * m | 0)];
  e = (d + 28 | 0) >> 2;
  var T = l[e], Y = T + 12 * m | 0, R = l[Y + 4 >> 2], P = (w[0] = l[Y >> 2], N[0]), aa = (w[0] = R, N[0]), W = p[(T + 8 >> 2) + (3 * m | 0)], da = I + 12 * r | 0, sa = l[da + 4 >> 2], ta = (w[0] = l[da >> 2], N[0]), ja = (w[0] = sa, N[0]), ua = p[(I + 8 >> 2) + (3 * r | 0)], ha = T + 12 * r | 0, wa = l[ha + 4 >> 2], oa = (w[0] = l[ha >> 2], N[0]), Aa = (w[0] = wa, N[0]), Fa = p[(T + 8 >> 2) + (3 * r | 0)], La = Dm(Q), xa = Em(Q), ca = Dm(ua), Z = Em(ua), la = b + 144 | 0, ya = p[i + 23], fa = (w[0] = v, N[0]), $ = ya - fa, eb = p[i + 24], Sa = (w[0] = A, N[0]), Da = eb - Sa, na = xa * $ - La * Da, ma = La * $ + xa * Da, Ba = (N[0] = na, w[0]), za = (N[0] = ma, w[0]) | 0;
  l[la >> 2] = 0 | Ba;
  l[la + 4 >> 2] = za;
  var Ha = b + 152 | 0, jb = p[i + 25], Ia = (w[0] = y, N[0]), $a = jb - Ia, ba = p[i + 26], qa = (w[0] = z, N[0]), ka = ba - qa, ia = Z * $a - ca * ka, va = ca * $a + Z * ka, Oa = (N[0] = ia, w[0]), Pa = (N[0] = va, w[0]) | 0;
  l[Ha >> 2] = 0 | Oa;
  l[Ha + 4 >> 2] = Pa;
  var Ta = b + 128 | 0, Xa = M + na - p[i + 17], ab = V + ma - p[i + 18], kb = (N[0] = Xa, w[0]), mb = (N[0] = ab, w[0]) | 0;
  l[Ta >> 2] = 0 | kb;
  l[Ta + 4 >> 2] = mb;
  var Qa = b + 136 | 0, Ma = ta + ia - p[i + 19], bb = ja + va - p[i + 20], Va = (N[0] = Ma, w[0]), Ja = (N[0] = bb, w[0]) | 0;
  l[Qa >> 2] = 0 | Va;
  l[Qa + 4 >> 2] = Ja;
  var ga = Ta | 0, cb = b + 132 | 0, gb = Hh(Xa * Xa + ab * ab), db = Qa | 0, Ya = b + 140 | 0, Ka = Hh(Ma * Ma + bb * bb);
  if (.04999999701976776 < gb) {
    var Ga = 1 / gb, fb = Xa * Ga;
    p[ga >> 2] = fb;
    var Ea = ab * Ga, Ua = fb;
  } else {
    Ua = Ea = p[ga >> 2] = 0;
  }
  p[cb >> 2] = Ea;
  if (.04999999701976776 < Ka) {
    var ob = 1 / Ka, Na = Ma * ob;
    p[db >> 2] = Na;
    var Wa = bb * ob, nb = Na;
  } else {
    nb = Wa = p[db >> 2] = 0;
  }
  p[Ya >> 2] = Wa;
  var pa = na * Ea - ma * Ua, hb = ia * Wa - va * nb, Ca = p[i + 28], ib = F + H * pa * pa + Ca * Ca * (G + E * hb * hb);
  p[i + 48] = 0 < ib ? 1 / ib : ib;
  if (0 == (c[d + 20 | 0] & 1) << 24 >> 24) {
    p[i + 29] = 0;
    var Za = Fa, lb = W, qb = P, vb = aa, sb = oa, Ab = Aa;
  } else {
    var Bb = b + 116 | 0, Gb = p[Bb >> 2] * p[d + 8 >> 2];
    p[Bb >> 2] = Gb;
    var Cb = -Gb, pb = Ua * Cb, ub = Ea * Cb, Eb = Gb * -Ca, Db = nb * Eb, wb = Wa * Eb, Za = Fa + E * (ia * wb - va * Db), lb = W + H * (na * ub - ma * pb), qb = P + pb * F, vb = aa + ub * F, sb = oa + Db * G, Ab = Aa + wb * G;
  }
  var Hb = l[e] + 12 * m | 0, tb = (N[0] = qb, w[0]), xb = (N[0] = vb, w[0]) | 0;
  l[(Hb | 0) >> 2] = 0 | tb;
  l[(Hb + 4 | 0) >> 2] = xb;
  p[(l[e] + 8 >> 2) + (3 * l[n >> 2] | 0)] = lb;
  var Ib = l[e] + 12 * l[f] | 0, Jb = (N[0] = sb, w[0]), Lb = (N[0] = Ab, w[0]) | 0;
  l[(Ib | 0) >> 2] = 0 | Jb;
  l[(Ib + 4 | 0) >> 2] = Lb;
  p[(l[e] + 8 >> 2) + (3 * l[f] | 0)] = Za;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 120 | 0, i = l[h >> 2];
  f = (d + 28 | 0) >> 2;
  var k = l[f], m = k + 12 * i | 0;
  e = l[m + 4 >> 2];
  var n = (w[0] = l[m >> 2], N[0]), q = (w[0] = e, N[0]), r = p[(k + 8 >> 2) + (3 * i | 0)];
  e = (b + 124 | 0) >> 2;
  var t = l[e], m = k + 12 * t | 0, u = l[m + 4 >> 2], m = (w[0] = l[m >> 2], N[0]), u = (w[0] = u, N[0]), k = p[(k + 8 >> 2) + (3 * t | 0)], v = p[g + 37], A = p[g + 36], t = p[g + 39], C = p[g + 38], B = p[g + 32], y = p[g + 33], z = p[g + 28], F = p[g + 34], G = p[g + 35], H = (-(B * (n + v * -r) + y * (q + A * r)) - z * (F * (m + t * -k) + G * (u + C * k))) * -p[g + 48], E = b + 116 | 0;
  p[E >> 2] += H;
  E = -H;
  B *= E;
  y *= E;
  z = H * -z;
  F *= z;
  G *= z;
  z = p[g + 44];
  v = r + p[g + 46] * (A * y - v * B);
  r = p[g + 45];
  g = k + p[g + 47] * (C * G - t * F);
  i = l[f] + 12 * i | 0;
  n = (N[0] = n + B * z, w[0]);
  q = (N[0] = q + y * z, w[0]) | 0;
  l[(i | 0) >> 2] = 0 | n;
  l[(i + 4 | 0) >> 2] = q;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = v;
  h = l[f] + 12 * l[e] | 0;
  m = (N[0] = m + F * r, w[0]);
  u = (N[0] = u + G * r, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | m;
  l[(h + 4 | 0) >> 2] = u;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = g;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 120 | 0;
  e = l[h >> 2];
  f = (d + 24 | 0) >> 2;
  var i = l[f], k = i + 12 * e | 0, m = l[k + 4 >> 2], n = (w[0] = l[k >> 2], N[0]), m = (w[0] = m, N[0]), q = p[(i + 8 >> 2) + (3 * e | 0)];
  e = (b + 124 | 0) >> 2;
  var r = l[e], t = i + 12 * r | 0, u = l[t + 4 >> 2], t = (w[0] = l[t >> 2], N[0]), u = (w[0] = u, N[0]), i = p[(i + 8 >> 2) + (3 * r | 0)], v = Dm(q), A = Em(q), C = Dm(i), B = Em(i), y = p[g + 23] - p[g + 40], z = p[g + 24] - p[g + 41], r = A * y - v * z, A = v * y + A * z, y = p[g + 25] - p[g + 42], z = p[g + 26] - p[g + 43], v = B * y - C * z, C = C * y + B * z, F = n + r - p[g + 17], z = m + A - p[g + 18], y = t + v - p[g + 19], B = u + C - p[g + 20], G = Hh(F * F + z * z), H = Hh(y * y + B * B);
  if (.04999999701976776 < G) {
    var E = 1 / G, F = F * E, I = z * E;
  } else {
    I = F = 0;
  }
  if (.04999999701976776 < H) {
    var z = 1 / H, J = y * z, L = B * z;
  } else {
    L = J = 0;
  }
  var M = r * I - A * F, V = v * L - C * J, E = p[g + 44], z = p[g + 46], y = p[g + 45], B = p[g + 47], Q = p[g + 28], M = E + z * M * M + Q * Q * (y + B * V * V), g = p[g + 27] - G - Q * H, G = g * -(0 < M ? 1 / M : M), H = -G, F = F * H, I = I * H, G = G * -Q, J = J * G, L = L * G, n = (N[0] = n + F * E, w[0]), m = (N[0] = m + I * E, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | n;
  l[(k + 4 | 0) >> 2] = m;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = q + z * (r * I - A * F);
  h = l[f] + 12 * l[e] | 0;
  k = (N[0] = t + J * y, w[0]);
  n = (N[0] = u + L * y, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | k;
  l[(h + 4 | 0) >> 2] = n;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = i + B * (v * L - C * J);
  return .004999999888241291 > (0 < g ? g : -g);
}), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 68 >> 2], h = p[e + 5], i = p[d + 72 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 76 >> 2], h = p[e + 5], i = p[d + 80 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var f = p[d + 88 >> 2] * e;
  p[b >> 2] = p[d + 84 >> 2] * e;
  p[b + 4 >> 2] = f;
}), 0, (function(b, d) {
  return p[b + 92 >> 2] * d;
}), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.Ke | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  f = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = f, s));
  f = p[d + 17];
  g = p[d + 18];
  U(O.K | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  f = p[d + 19];
  g = p[d + 20];
  U(O.L | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  f = p[d + 29];
  U(O.Za | 0, (s = a, a += 8, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  f = c[b + 112 | 0] & 1;
  U(O.Wb | 0, (s = a, a += 4, l[s >> 2] = f, s));
  f = p[d + 30];
  U(O.zd | 0, (s = a, a += 8, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  f = p[d + 31];
  U(O.Gd | 0, (s = a, a += 8, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = c[b + 100 | 0] & 1;
  U(O.$a | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 27];
  U(O.ab | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 26];
  U(O.Xb | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i = b >> 2, k = l[i + 12];
  h = k >> 2;
  var m = o[h + 2], n = b + 128 | 0;
  l[n >> 2] = m;
  var q = l[i + 13];
  f = q >> 2;
  var r = l[f + 2];
  g = (b + 132 | 0) >> 2;
  l[g] = r;
  var t = k + 28 | 0, k = b + 152 | 0, u = l[t >> 2], v = l[t + 4 >> 2];
  l[k >> 2] = u;
  l[k + 4 >> 2] = v;
  var k = q + 28 | 0, q = b + 160 | 0, A = l[k >> 2], C = l[k + 4 >> 2];
  l[q >> 2] = A;
  l[q + 4 >> 2] = C;
  k = p[h + 30];
  p[i + 42] = k;
  q = p[f + 30];
  p[i + 43] = q;
  h = p[h + 32];
  p[i + 44] = h;
  var B = p[f + 32];
  p[i + 45] = B;
  var y = l[d + 24 >> 2], z = p[(y + 8 >> 2) + (3 * m | 0)];
  f = (d + 28 | 0) >> 2;
  e = l[f];
  var t = e + 12 * m | 0, F = l[t + 4 >> 2], t = (w[0] = l[t >> 2], N[0]), F = (w[0] = F, N[0]), G = p[(e + 8 >> 2) + (3 * m | 0)], H = p[(y + 8 >> 2) + (3 * r | 0)], y = e + 12 * r | 0, E = l[y + 4 >> 2], y = (w[0] = l[y >> 2], N[0]), E = (w[0] = E, N[0]), r = p[(e + 8 >> 2) + (3 * r | 0)], I = Dm(z), J = Em(z);
  e = Dm(H);
  var L = Em(H), M = b + 136 | 0, V = p[i + 17], u = (w[0] = u, N[0]), u = V - u, V = p[i + 18], v = (w[0] = v, N[0]), V = V - v, v = J * u - I * V, u = I * u + J * V, I = (N[0] = v, w[0]), J = (N[0] = u, w[0]) | 0;
  l[M >> 2] = 0 | I;
  l[M + 4 >> 2] = J;
  M = b + 144 | 0;
  I = p[i + 19];
  A = (w[0] = A, N[0]);
  A = I - A;
  I = p[i + 20];
  C = (w[0] = C, N[0]);
  I -= C;
  C = L * A - e * I;
  A = e * A + L * I;
  e = (N[0] = C, w[0]);
  L = (N[0] = A, w[0]) | 0;
  l[M >> 2] = 0 | e;
  l[M + 4 >> 2] = L;
  e = h + B;
  L = 0 == e;
  M = k + q;
  p[i + 46] = M + u * u * h + A * A * B;
  J = -u;
  I = v * J * h - A * C * B;
  p[i + 49] = I;
  J = h * J - A * B;
  p[i + 52] = J;
  p[i + 47] = I;
  p[i + 50] = M + v * v * h + C * C * B;
  M = v * h + C * B;
  p[i + 53] = M;
  p[i + 48] = J;
  p[i + 51] = M;
  p[i + 54] = e;
  p[i + 55] = 0 < e ? 1 / e : e;
  0 == (c[b + 100 | 0] & 1) << 24 >> 24 | L && (p[i + 24] = 0);
  0 == (c[b + 112 | 0] & 1) << 24 >> 24 | L ? l[i + 56] = 0 : (z = H - z - p[i + 29], H = p[i + 31], e = p[i + 30], L = H - e, .06981317698955536 > (0 < L ? L : -L) ? l[i + 56] = 3 : z > e ? (e = (b + 224 | 0) >> 2, z < H ? (l[e] = 0, p[i + 23] = 0) : (2 != (l[e] | 0) && (p[i + 23] = 0), l[e] = 2)) : (z = b + 224 | 0, 1 != (l[z >> 2] | 0) && (p[i + 23] = 0), l[z >> 2] = 1));
  z = b + 84 | 0;
  0 == (c[d + 20 | 0] & 1) << 24 >> 24 ? (p[z >> 2] = 0, p[i + 22] = 0, p[i + 23] = 0, p[i + 24] = 0, B = r, h = G, k = F, F = y, q = E) : (H = d + 8 | 0, e = p[H >> 2], z |= 0, i = p[z >> 2] * e, p[z >> 2] = i, L = b + 88 | 0, z = p[L >> 2] * e, p[L >> 2] = z, L = b + 92 | 0, e *= p[L >> 2], p[L >> 2] = e, L = b + 96 | 0, H = p[L >> 2] * p[H >> 2], p[L >> 2] = H, B = r + B * (C * z - A * i + H + e), h = G - h * (v * z - u * i + H + e), t -= i * k, k = F - z * k, F = y + i * q, q = E + z * q);
  m = l[f] + 12 * m | 0;
  t = (N[0] = t, w[0]);
  k = (N[0] = k, w[0]) | 0;
  l[(m | 0) >> 2] = 0 | t;
  l[(m + 4 | 0) >> 2] = k;
  p[(l[f] + 8 >> 2) + (3 * l[n >> 2] | 0)] = h;
  n = l[f] + 12 * l[g] | 0;
  m = (N[0] = F, w[0]);
  q = (N[0] = q, w[0]) | 0;
  l[(n | 0) >> 2] = 0 | m;
  l[(n + 4 | 0) >> 2] = q;
  p[(l[f] + 8 >> 2) + (3 * l[g] | 0)] = B;
}), 0, (function(b, d) {
  var e, f, g, h, i, k, m, n = b >> 2, q = a;
  a += 24;
  var r;
  m = q >> 2;
  var t = q + 12;
  k = t >> 2;
  i = (b + 128 | 0) >> 2;
  var u = o[i];
  h = (d + 28 | 0) >> 2;
  var v = l[h], A = v + 12 * u | 0, C = l[A + 4 >> 2], B = (w[0] = l[A >> 2], N[0]), y = (w[0] = C, N[0]), z = p[(v + 8 >> 2) + (3 * u | 0)];
  g = (b + 132 | 0) >> 2;
  var F = l[g], G = v + 12 * F | 0, H = l[G + 4 >> 2], E = (w[0] = l[G >> 2], N[0]), I = (w[0] = H, N[0]), J = p[(v + 8 >> 2) + (3 * F | 0)], L = p[n + 42], M = p[n + 43], V = p[n + 44], Q = p[n + 45], T = 0 == V + Q;
  if (0 == (c[b + 100 | 0] & 1) << 24 >> 24) {
    var Y = J, R = z;
  } else {
    if (3 == (l[n + 56] | 0) | T) {
      Y = J, R = z;
    } else {
      var P = b + 96 | 0, aa = p[P >> 2], W = p[d >> 2] * p[n + 26], da = aa + (J - z - p[n + 27]) * -p[n + 55], sa = -W, ta = da < W ? da : W, ja = ta < sa ? sa : ta;
      p[P >> 2] = ja;
      var ua = ja - aa, Y = J + Q * ua, R = z - V * ua;
    }
  }
  if (0 == (c[b + 112 | 0] & 1) << 24 >> 24) {
    r = 18;
  } else {
    var ha = b + 224 | 0;
    if (0 == (l[ha >> 2] | 0) | T) {
      r = 18;
    } else {
      var wa = b + 148 | 0, oa = b + 144 | 0, Aa = b + 140 | 0, Fa = b + 136 | 0, La = E + p[wa >> 2] * -Y - B - p[Aa >> 2] * -R, xa = I + p[oa >> 2] * Y - y - p[Fa >> 2] * R;
      p[m] = La;
      p[m + 1] = xa;
      p[m + 2] = Y - R;
      var ca = b + 184 | 0;
      $m(t, ca, q);
      var Z = p[k], la = -Z, ya = p[k + 1], fa = -ya, $ = p[k + 2], eb = -$, Sa = l[ha >> 2];
      if (3 == Sa) {
        var Da = b + 84 | 0;
        p[Da >> 2] -= Z;
        var na = b + 88 | 0;
        p[na >> 2] -= ya;
        var ma = b + 92 | 0;
        p[ma >> 2] -= $;
        var Ba = la, za = fa, Ha = eb;
      } else {
        if (1 == Sa) {
          var jb = b + 84 | 0;
          f = (b + 92 | 0) >> 2;
          var Ia = p[f], $a = Ia - $;
          if (0 > $a) {
            var ba = p[n + 52] * Ia - La, qa = p[n + 53] * Ia - xa, ka = p[ca >> 2], ia = p[n + 49], va = p[n + 47], Oa = p[n + 50], Pa = ka * Oa - ia * va, Ta = 0 != Pa ? 1 / Pa : Pa, Xa = Ta * (Oa * ba - ia * qa), ab = Ta * (ka * qa - va * ba), kb = -Ia, mb = jb | 0;
            p[mb >> 2] += Xa;
            var Qa = b + 88 | 0;
            p[Qa >> 2] += ab;
            p[f] = 0;
            Ba = Xa;
            za = ab;
            Ha = kb;
          } else {
            var Ma = jb | 0;
            p[Ma >> 2] -= Z;
            var bb = b + 88 | 0;
            p[bb >> 2] -= ya;
            p[f] = $a;
            Ba = la;
            za = fa;
            Ha = eb;
          }
        } else {
          if (2 == Sa) {
            var Va = b + 84 | 0;
            e = (b + 92 | 0) >> 2;
            var Ja = p[e], ga = Ja - $;
            if (0 < ga) {
              var cb = p[n + 52] * Ja - La, gb = p[n + 53] * Ja - xa, db = p[ca >> 2], Ya = p[n + 49], Ka = p[n + 47], Ga = p[n + 50], fb = db * Ga - Ya * Ka, Ea = 0 != fb ? 1 / fb : fb, Ua = Ea * (Ga * cb - Ya * gb), ob = Ea * (db * gb - Ka * cb), Na = -Ja, Wa = Va | 0;
              p[Wa >> 2] += Ua;
              var nb = b + 88 | 0;
              p[nb >> 2] += ob;
              p[e] = 0;
              Ba = Ua;
              za = ob;
              Ha = Na;
            } else {
              var pa = Va | 0;
              p[pa >> 2] -= Z;
              var hb = b + 88 | 0;
              p[hb >> 2] -= ya;
              p[e] = ga;
              Ba = la;
              za = fa;
              Ha = eb;
            }
          } else {
            Ba = la, za = fa, Ha = eb;
          }
        }
      }
      var Ca = p[oa >> 2] * za - p[wa >> 2] * Ba + Ha, ib = p[Fa >> 2] * za - p[Aa >> 2] * Ba + Ha, Za = Ba, lb = za, qb = l[i];
      r = 21;
    }
  }
  if (18 == r) {
    var vb = p[n + 37], sb = p[n + 36], Ab = p[n + 35], Bb = p[n + 34], Gb = -(E + vb * -Y - B - Ab * -R), Cb = -(I + sb * Y - y - Bb * R), pb = p[n + 46], ub = p[n + 49], Eb = p[n + 47], Db = p[n + 50], wb = pb * Db - ub * Eb, Hb = 0 != wb ? 1 / wb : wb, tb = Hb * (Db * Gb - ub * Cb), xb = Hb * (pb * Cb - Eb * Gb), Ib = b + 84 | 0;
    p[Ib >> 2] += tb;
    var Jb = b + 88 | 0;
    p[Jb >> 2] += xb;
    Ca = sb * xb - vb * tb;
    ib = Bb * xb - Ab * tb;
    Za = tb;
    lb = xb;
    qb = u;
  }
  var Lb = y - lb * L, Xb = E + Za * M, Nb = I + lb * M, Sb = Y + Q * Ca, Ob = R - V * ib, Vb = l[h] + 12 * qb | 0, Zb = (N[0] = B - Za * L, w[0]), dc = (N[0] = Lb, w[0]) | 0;
  l[(Vb | 0) >> 2] = 0 | Zb;
  l[(Vb + 4 | 0) >> 2] = dc;
  p[(l[h] + 8 >> 2) + (3 * l[i] | 0)] = Ob;
  var fc = l[h] + 12 * l[g] | 0, kc = (N[0] = Xb, w[0]), Fb = (N[0] = Nb, w[0]) | 0;
  l[(fc | 0) >> 2] = 0 | kc;
  l[(fc + 4 | 0) >> 2] = Fb;
  p[(l[h] + 8 >> 2) + (3 * l[g] | 0)] = Sb;
  a = q;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 128 | 0;
  e = l[h >> 2];
  f = (d + 24 | 0) >> 2;
  var i = l[f], k = i + 12 * e | 0, m = l[k + 4 >> 2], n = (w[0] = l[k >> 2], N[0]), m = (w[0] = m, N[0]), q = p[(i + 8 >> 2) + (3 * e | 0)];
  e = (b + 132 | 0) >> 2;
  var r = l[e], t = i + 12 * r | 0, u = l[t + 4 >> 2], t = (w[0] = l[t >> 2], N[0]), u = (w[0] = u, N[0]), r = p[(i + 8 >> 2) + (3 * r | 0)], v = b + 176 | 0, A = b + 180 | 0;
  if (0 == (c[b + 112 | 0] & 1) << 24 >> 24) {
    i = q, q = r, r = 0, v = p[v >> 2], A = p[A >> 2];
  } else {
    if (A = p[A >> 2], v = p[v >> 2], i = l[g + 56], 0 == (i | 0) | 0 == v + A) {
      i = q, q = r, r = 0;
    } else {
      var C = r - q - p[g + 29];
      if (3 == i) {
        var i = C - p[g + 30], i = .13962635397911072 > i ? i : .13962635397911072, i = -.13962635397911072 > i ? -.13962635397911072 : i, C = i * -p[g + 55], B = 0 < i ? i : -i;
      } else {
        1 == i ? (i = C - p[g + 30], C = i + .03490658849477768, C = 0 > C ? C : 0, C = (-.13962635397911072 > C ? -.13962635397911072 : C) * -p[g + 55], B = -i) : 2 == i ? (i = C - p[g + 31], C = i - .03490658849477768, C = .13962635397911072 > C ? C : .13962635397911072, C = (0 > C ? 0 : C) * -p[g + 55], B = i) : B = C = 0;
      }
      i = q - v * C;
      q = r + A * C;
      r = B;
    }
  }
  var B = Dm(i), y = Em(i), z = Dm(q), F = Em(q), G = p[g + 17] - p[g + 38], H = p[g + 18] - p[g + 39], C = y * G - B * H, y = B * G + y * H, G = p[g + 19] - p[g + 40], H = p[g + 20] - p[g + 41], B = F * G - z * H, z = z * G + F * H, E = t + B - n - C, I = u + z - m - y, F = Hh(E * E + I * I), G = p[g + 42], g = p[g + 43], H = G + g, J = H + v * y * y + A * z * z, L = A * B, M = C * -v * y - L * z, H = H + v * C * C + L * B, L = J * H - M * M, L = 0 != L ? 1 / L : L, H = -(L * (H * E - M * I)), E = -(L * (J * I - M * E)), n = (N[0] = n - G * H, w[0]), m = (N[0] = m - G * E, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | n;
  l[(k + 4 | 0) >> 2] = m;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = i - v * (C * E - y * H);
  h = l[f] + 12 * l[e] | 0;
  k = (N[0] = t + g * H, w[0]);
  n = (N[0] = u + g * E, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | k;
  l[(h + 4 | 0) >> 2] = n;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = q + A * (B * E - z * H);
  return .004999999888241291 < F ? 0 : .03490658849477768 >= r;
}), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 68 >> 2], h = p[e + 5], i = p[d + 72 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 76 >> 2], h = p[e + 5], i = p[d + 80 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var e = p[d + 92 >> 2] * e, f = p[d + 108 >> 2] * e;
  p[b >> 2] = p[d + 104 >> 2] * e;
  p[b + 4 >> 2] = f;
}), 0, Kb(0), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.xf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  b = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 17];
  f = p[d + 18];
  U(O.K | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 19];
  f = p[d + 20];
  U(O.L | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 21];
  U(O.Wf | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i = b >> 2, k = l[i + 12];
  h = k >> 2;
  var m = o[h + 2], n = b + 96 | 0;
  l[n >> 2] = m;
  var q = l[i + 13];
  g = q >> 2;
  var r = l[g + 2];
  f = (b + 100 | 0) >> 2;
  l[f] = r;
  var t = k + 28 | 0, u = b + 128 | 0, v = l[t >> 2], A = l[t + 4 >> 2];
  l[u >> 2] = v;
  l[u + 4 >> 2] = A;
  var C = q + 28 | 0, B = b + 136 | 0, y = l[C >> 2], z = l[C + 4 >> 2];
  l[B >> 2] = y;
  l[B + 4 >> 2] = z;
  var F = p[h + 30];
  p[i + 36] = F;
  var G = p[g + 30];
  p[i + 37] = G;
  var H = p[h + 32];
  p[i + 38] = H;
  var E = p[g + 32];
  p[i + 39] = E;
  var I = l[d + 24 >> 2], J = I + 12 * m | 0, L = l[J + 4 >> 2], M = (w[0] = l[J >> 2], N[0]), V = (w[0] = L, N[0]), Q = p[(I + 8 >> 2) + (3 * m | 0)];
  e = (d + 28 | 0) >> 2;
  var T = l[e], Y = T + 12 * m | 0, R = l[Y + 4 >> 2], P = (w[0] = l[Y >> 2], N[0]), aa = (w[0] = R, N[0]), W = p[(T + 8 >> 2) + (3 * m | 0)], da = I + 12 * r | 0, sa = l[da + 4 >> 2], ta = (w[0] = l[da >> 2], N[0]), ja = (w[0] = sa, N[0]), ua = p[(I + 8 >> 2) + (3 * r | 0)], ha = T + 12 * r | 0, wa = l[ha + 4 >> 2], oa = (w[0] = l[ha >> 2], N[0]), Aa = (w[0] = wa, N[0]), Fa = p[(T + 8 >> 2) + (3 * r | 0)], La = Dm(Q), xa = Em(Q), ca = Dm(ua), Z = Em(ua), la = b + 112 | 0, ya = p[i + 17], fa = (w[0] = v, N[0]), $ = ya - fa, eb = p[i + 18], Sa = (w[0] = A, N[0]), Da = eb - Sa, na = xa * $ - La * Da, ma = La * $ + xa * Da, Ba = (N[0] = na, w[0]), za = (N[0] = ma, w[0]) | 0;
  l[la >> 2] = 0 | Ba;
  l[la + 4 >> 2] = za;
  var Ha = b + 120 | 0, jb = p[i + 19], Ia = (w[0] = y, N[0]), $a = jb - Ia, ba = p[i + 20], qa = (w[0] = z, N[0]), ka = ba - qa, ia = Z * $a - ca * ka, va = ca * $a + Z * ka, Oa = (N[0] = ia, w[0]), Pa = (N[0] = va, w[0]) | 0;
  l[Ha >> 2] = 0 | Oa;
  l[Ha + 4 >> 2] = Pa;
  var Ta = b + 104 | 0, Xa = ta + ia - M - na, ab = ja + va - V - ma, kb = (N[0] = Xa, w[0]), mb = (N[0] = ab, w[0]) | 0;
  l[Ta >> 2] = 0 | kb;
  l[Ta + 4 >> 2] = mb;
  var Qa = Ta | 0, Ma = b + 108 | 0, bb = Hh(Xa * Xa + ab * ab);
  p[i + 22] = bb;
  l[i + 41] = 0 < bb - p[i + 21] ? 2 : 0;
  if (.004999999888241291 < bb) {
    var Va = 1 / bb, Ja = Xa * Va;
    p[Qa >> 2] = Ja;
    var ga = ab * Va;
    p[Ma >> 2] = ga;
    var cb = na * ga - ma * Ja, gb = ia * ga - va * Ja, db = F + H * cb * cb + G + E * gb * gb;
    p[i + 40] = 0 != db ? 1 / db : 0;
    if (0 == (c[d + 20 | 0] & 1) << 24 >> 24) {
      p[i + 23] = 0;
      var Ya = Fa, Ka = W, Ga = P, fb = aa, Ea = oa, Ua = Aa;
    } else {
      var ob = b + 92 | 0, Na = p[ob >> 2] * p[d + 8 >> 2];
      p[ob >> 2] = Na;
      var Wa = Ja * Na, nb = ga * Na, Ya = Fa + E * (ia * nb - va * Wa), Ka = W - H * (na * nb - ma * Wa), Ga = P - Wa * F, fb = aa - nb * F, Ea = oa + Wa * G, Ua = Aa + nb * G;
    }
    var pa = l[e] + 12 * m | 0, hb = (N[0] = Ga, w[0]), Ca = (N[0] = fb, w[0]) | 0;
    l[(pa | 0) >> 2] = 0 | hb;
    l[(pa + 4 | 0) >> 2] = Ca;
    p[(l[e] + 8 >> 2) + (3 * l[n >> 2] | 0)] = Ka;
    var ib = l[e] + 12 * l[f] | 0, Za = (N[0] = Ea, w[0]), lb = (N[0] = Ua, w[0]) | 0;
    l[(ib | 0) >> 2] = 0 | Za;
    l[(ib + 4 | 0) >> 2] = lb;
    p[(l[e] + 8 >> 2) + (3 * l[f] | 0)] = Ya;
  } else {
    p[Qa >> 2] = 0, p[Ma >> 2] = 0, p[i + 40] = 0, p[i + 23] = 0;
  }
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 96 | 0, i = l[h >> 2];
  f = (d + 28 | 0) >> 2;
  var k = l[f], m = k + 12 * i | 0;
  e = l[m + 4 >> 2];
  var n = (w[0] = l[m >> 2], N[0]), q = (w[0] = e, N[0]), r = p[(k + 8 >> 2) + (3 * i | 0)];
  e = (b + 100 | 0) >> 2;
  var t = l[e], m = k + 12 * t | 0, u = l[m + 4 >> 2], m = (w[0] = l[m >> 2], N[0]), u = (w[0] = u, N[0]), k = p[(k + 8 >> 2) + (3 * t | 0)], v = p[g + 29], A = p[g + 28], t = p[g + 31], C = p[g + 30], B = p[g + 22] - p[g + 21], y = p[g + 26], z = p[g + 27], F = y * (m + t * -k - (n + v * -r)) + z * (u + C * k - (q + A * r)), G = b + 92 | 0, H = p[G >> 2], B = H + (0 > B ? F + p[d + 4 >> 2] * B : F) * -p[g + 40], B = 0 < B ? 0 : B;
  p[G >> 2] = B;
  G = B - H;
  y *= G;
  z *= G;
  G = p[g + 36];
  v = r - p[g + 38] * (A * z - v * y);
  r = p[g + 37];
  g = k + p[g + 39] * (C * z - t * y);
  i = l[f] + 12 * i | 0;
  n = (N[0] = n - y * G, w[0]);
  q = (N[0] = q - z * G, w[0]) | 0;
  l[(i | 0) >> 2] = 0 | n;
  l[(i + 4 | 0) >> 2] = q;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = v;
  h = l[f] + 12 * l[e] | 0;
  m = (N[0] = m + y * r, w[0]);
  u = (N[0] = u + z * r, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | m;
  l[(h + 4 | 0) >> 2] = u;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = g;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 96 | 0;
  e = l[h >> 2];
  f = (d + 24 | 0) >> 2;
  var i = l[f], k = i + 12 * e | 0, m = l[k + 4 >> 2], n = (w[0] = l[k >> 2], N[0]), m = (w[0] = m, N[0]), q = p[(i + 8 >> 2) + (3 * e | 0)];
  e = (b + 100 | 0) >> 2;
  var r = l[e], t = i + 12 * r | 0, u = l[t + 4 >> 2], t = (w[0] = l[t >> 2], N[0]), u = (w[0] = u, N[0]), i = p[(i + 8 >> 2) + (3 * r | 0)], v = Dm(q), A = Em(q), C = Dm(i), B = Em(i), y = p[g + 17] - p[g + 32], z = p[g + 18] - p[g + 33], r = A * y - v * z, A = v * y + A * z, y = p[g + 19] - p[g + 34], z = p[g + 20] - p[g + 35], v = B * y - C * z, y = C * y + B * z, z = t + v - n - r, B = u + y - m - A, C = Hh(z * z + B * B);
  if (1.1920928955078125e-7 > C) {
    var C = 0, F = B;
  } else {
    F = 1 / C, z *= F, F *= B;
  }
  var B = b + 84 | 0, G = C - p[B >> 2], G = .20000000298023224 > G ? G : .20000000298023224, G = (0 > G ? 0 : G) * -p[g + 40], z = z * G, F = F * G, G = p[g + 36], r = q - p[g + 38] * (r * F - A * z), q = p[g + 37], g = i + p[g + 39] * (v * F - y * z), n = (N[0] = n - z * G, w[0]), m = (N[0] = m - F * G, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | n;
  l[(k + 4 | 0) >> 2] = m;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = r;
  h = l[f] + 12 * l[e] | 0;
  k = (N[0] = t + z * q, w[0]);
  n = (N[0] = u + F * q, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | k;
  l[(h + 4 | 0) >> 2] = n;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = g;
  return .004999999888241291 > C - p[B >> 2];
}), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 80 >> 2], h = p[e + 5], i = p[d + 84 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 88 >> 2], h = p[e + 5], i = p[d + 92 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var f = p[d + 108 >> 2] * e;
  p[b >> 2] = p[d + 104 >> 2] * e;
  p[b + 4 >> 2] = f;
}), 0, (function(b, d) {
  return p[b + 112 >> 2] * d;
}), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.yf | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  b = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 20];
  f = p[d + 21];
  U(O.K | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 22];
  f = p[d + 23];
  U(O.L | 0, (s = a, a += 16, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = f, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = p[d + 24];
  U(O.Za | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 17];
  U(O.Ma | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 18];
  U(O.Na | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i = b >> 2, k = l[i + 12];
  h = k >> 2;
  var m = o[h + 2], n = b + 116 | 0;
  l[n >> 2] = m;
  var q = l[i + 13];
  g = q >> 2;
  var r = l[g + 2];
  f = (b + 120 | 0) >> 2;
  l[f] = r;
  var t = k + 28 | 0, u = b + 140 | 0, v = l[t >> 2], A = l[t + 4 >> 2];
  l[u >> 2] = v;
  l[u + 4 >> 2] = A;
  var C = q + 28 | 0, B = b + 148 | 0, y = l[C >> 2], z = l[C + 4 >> 2];
  l[B >> 2] = y;
  l[B + 4 >> 2] = z;
  var F = p[h + 30];
  p[i + 39] = F;
  var G = p[g + 30];
  p[i + 40] = G;
  var H = p[h + 32];
  p[i + 41] = H;
  var E = p[g + 32];
  p[i + 42] = E;
  var I = l[d + 24 >> 2], J = p[(I + 8 >> 2) + (3 * m | 0)];
  e = (d + 28 | 0) >> 2;
  var L = l[e], M = L + 12 * m | 0, V = l[M + 4 >> 2], Q = (w[0] = l[M >> 2], N[0]), T = (w[0] = V, N[0]), Y = p[(L + 8 >> 2) + (3 * m | 0)], R = p[(I + 8 >> 2) + (3 * r | 0)], P = L + 12 * r | 0, aa = l[P + 4 >> 2], W = (w[0] = l[P >> 2], N[0]), da = (w[0] = aa, N[0]), sa = p[(L + 8 >> 2) + (3 * r | 0)], ta = Dm(J), ja = Em(J), ua = Dm(R), ha = Em(R), wa = b + 124 | 0, oa = p[i + 20], Aa = (w[0] = v, N[0]), Fa = oa - Aa, La = p[i + 21], xa = (w[0] = A, N[0]), ca = La - xa, Z = ja * Fa - ta * ca, la = ta * Fa + ja * ca, ya = (N[0] = Z, w[0]), fa = (N[0] = la, w[0]) | 0;
  l[wa >> 2] = 0 | ya;
  l[wa + 4 >> 2] = fa;
  var $ = b + 132 | 0, eb = p[i + 22], Sa = (w[0] = y, N[0]), Da = eb - Sa, na = p[i + 23], ma = (w[0] = z, N[0]), Ba = na - ma, za = ha * Da - ua * Ba, Ha = ua * Da + ha * Ba, jb = (N[0] = za, w[0]), Ia = (N[0] = Ha, w[0]) | 0;
  l[$ >> 2] = 0 | jb;
  l[$ + 4 >> 2] = Ia;
  var $a = F + G, ba = $a + la * la * H + Ha * Ha * E, qa = -la, ka = Z * qa * H - Ha * za * E, ia = H * qa - Ha * E, va = $a + Z * Z * H + za * za * E, Oa = Z * H + za * E, Pa = H + E, Ta = p[i + 17], Xa = b + 172 | 0;
  if (0 < Ta) {
    var ab = ba * va - ka * ka, kb = 0 != ab ? 1 / ab : ab;
    p[Xa >> 2] = kb * va;
    var mb = ka * -kb;
    p[i + 46] = mb;
    p[i + 45] = 0;
    p[i + 44] = mb;
    p[i + 47] = kb * ba;
    p[i + 48] = 0;
    p[i + 49] = 0;
    p[i + 50] = 0;
    var Qa = b + 204 | 0;
    p[Qa >> 2] = 0;
    var Ma = 0 < Pa ? 1 / Pa : 0, bb = R - J - p[i + 24], Va = 6.2831854820251465 * Ta, Ja = Ma * Va * Va, ga = p[d >> 2], cb = ga * (2 * Ma * p[i + 18] * Va + ga * Ja), gb = b + 100 | 0;
    p[gb >> 2] = cb;
    var db = 0 != cb ? 1 / cb : 0;
    p[gb >> 2] = db;
    p[i + 19] = bb * ga * Ja * db;
    var Ya = Pa + db;
    p[Qa >> 2] = 0 != Ya ? 1 / Ya : 0;
  } else {
    var Ka = va * Pa - Oa * Oa, Ga = ka * Pa, fb = ka * Oa, Ea = ba * Ka + ka * (Oa * ia - Ga) + ia * (fb - va * ia), Ua = 0 != Ea ? 1 / Ea : Ea;
    p[Xa >> 2] = Ua * Ka;
    var ob = Ua * (ia * Oa - Ga);
    p[i + 44] = ob;
    var Na = Ua * (fb - ia * va);
    p[i + 45] = Na;
    p[i + 46] = ob;
    p[i + 47] = Ua * (ba * Pa - ia * ia);
    var Wa = Ua * (ia * ka - ba * Oa);
    p[i + 48] = Wa;
    p[i + 49] = Na;
    p[i + 50] = Wa;
    p[i + 51] = Ua * (ba * va - ka * ka);
    p[i + 25] = 0;
    p[i + 19] = 0;
  }
  var nb = b + 104 | 0;
  if (0 == (c[d + 20 | 0] & 1) << 24 >> 24) {
    p[nb >> 2] = 0;
    p[i + 27] = 0;
    p[i + 28] = 0;
    var pa = sa, hb = Y, Ca = Q, ib = T, Za = W, lb = da;
  } else {
    var qb = p[d + 8 >> 2], vb = nb | 0, sb = p[vb >> 2] * qb;
    p[vb >> 2] = sb;
    var Ab = b + 108 | 0, Bb = p[Ab >> 2] * qb;
    p[Ab >> 2] = Bb;
    var Gb = b + 112 | 0, Cb = p[Gb >> 2] * qb;
    p[Gb >> 2] = Cb;
    pa = sa + E * (za * Bb - Ha * sb + Cb);
    hb = Y - H * (Z * Bb - la * sb + Cb);
    Ca = Q - sb * F;
    ib = T - Bb * F;
    Za = W + sb * G;
    lb = da + Bb * G;
  }
  var pb = l[e] + 12 * m | 0, ub = (N[0] = Ca, w[0]), Eb = (N[0] = ib, w[0]) | 0;
  l[(pb | 0) >> 2] = 0 | ub;
  l[(pb + 4 | 0) >> 2] = Eb;
  p[(l[e] + 8 >> 2) + (3 * l[n >> 2] | 0)] = hb;
  var Db = l[e] + 12 * l[f] | 0, wb = (N[0] = Za, w[0]), Hb = (N[0] = lb, w[0]) | 0;
  l[(Db | 0) >> 2] = 0 | wb;
  l[(Db + 4 | 0) >> 2] = Hb;
  p[(l[e] + 8 >> 2) + (3 * l[f] | 0)] = pa;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 116 | 0, i = l[h >> 2];
  f = (d + 28 | 0) >> 2;
  var k = l[f], m = k + 12 * i | 0;
  e = l[m + 4 >> 2];
  var n = (w[0] = l[m >> 2], N[0]), q = (w[0] = e, N[0]), r = p[(k + 8 >> 2) + (3 * i | 0)];
  e = (b + 120 | 0) >> 2;
  var t = l[e], m = k + 12 * t | 0, u = l[m + 4 >> 2], m = (w[0] = l[m >> 2], N[0]), u = (w[0] = u, N[0]), v = p[(k + 8 >> 2) + (3 * t | 0)], t = p[g + 39], k = p[g + 40], A = p[g + 41], C = p[g + 42];
  if (0 < p[g + 17]) {
    var B = b + 112 | 0, y = p[B >> 2], z = (v - r + p[g + 19] + p[g + 25] * y) * -p[g + 51];
    p[B >> 2] = y + z;
    var r = r - A * z, B = v + C * z, y = p[g + 34], F = p[g + 33], v = p[g + 32], z = p[g + 31], G = m + y * -B - n - v * -r, H = u + F * B - q - z * r, E = p[g + 43] * G + p[g + 46] * H, H = p[g + 44] * G + p[g + 47] * H, G = -E, g = -H, I = b + 104 | 0;
    p[I >> 2] -= E;
    E = b + 108 | 0;
    p[E >> 2] -= H;
    C = B + C * (F * g - y * G);
    A = r - A * (z * g - v * G);
    r = G;
  } else {
    var y = p[g + 34], F = p[g + 33], z = p[g + 32], B = p[g + 31], H = m + y * -v - n - z * -r, I = u + F * v - q - B * r, J = v - r, G = p[g + 43] * H + p[g + 46] * I + p[g + 49] * J, E = p[g + 44] * H + p[g + 47] * I + p[g + 50] * J, I = p[g + 45] * H + p[g + 48] * I + p[g + 51] * J, H = -G, g = -E, J = b + 104 | 0;
    p[J >> 2] -= G;
    G = b + 108 | 0;
    p[G >> 2] -= E;
    E = b + 112 | 0;
    p[E >> 2] -= I;
    C = v + C * (F * g - y * H - I);
    A = r - A * (B * g - z * H - I);
    r = H;
  }
  i = l[f] + 12 * i | 0;
  n = (N[0] = n - t * r, w[0]);
  q = (N[0] = q - t * g, w[0]) | 0;
  l[(i | 0) >> 2] = 0 | n;
  l[(i + 4 | 0) >> 2] = q;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = A;
  h = l[f] + 12 * l[e] | 0;
  m = (N[0] = m + k * r, w[0]);
  u = (N[0] = u + k * g, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | m;
  l[(h + 4 | 0) >> 2] = u;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = C;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 116 | 0;
  e = l[h >> 2];
  f = (d + 24 | 0) >> 2;
  var i = l[f], k = i + 12 * e | 0, m = l[k + 4 >> 2], n = (w[0] = l[k >> 2], N[0]), m = (w[0] = m, N[0]), q = p[(i + 8 >> 2) + (3 * e | 0)];
  e = (b + 120 | 0) >> 2;
  var r = l[e], t = i + 12 * r | 0, u = l[t + 4 >> 2], t = (w[0] = l[t >> 2], N[0]), u = (w[0] = u, N[0]), i = p[(i + 8 >> 2) + (3 * r | 0)], v = Dm(q), A = Em(q), C = Dm(i), B = Em(i), y = p[g + 39], z = p[g + 40], F = p[g + 41], r = p[g + 42], G = p[g + 20] - p[g + 35], H = p[g + 21] - p[g + 36], E = A * G - v * H, A = v * G + A * H, G = p[g + 22] - p[g + 37], H = p[g + 23] - p[g + 38], v = B * G - C * H, C = C * G + B * H, H = y + z, B = H + A * A * F + C * C * r, I = -A, G = E * I * F - C * v * r, J = F * I - C * r, L = H + E * E * F + v * v * r, M = E * F + v * r, V = F + r, H = t + v - n - E, I = u + C - m - A;
  if (0 < p[g + 17]) {
    g = Hh(H * H + I * I), J = B * L - G * G, M = 0 != J ? 1 / J : J, J = -(M * (L * H - G * I)), G = -(M * (B * I - G * H)), B = 0, E = E * G - A * J, v = v * G - C * J, A = J;
  } else {
    var Q = i - q - p[g + 24], g = Hh(H * H + I * I), T = L * V - M * M, Y = M * J - G * V, R = G * M - L * J, P = B * T + G * Y + J * R, P = 0 != P ? 1 / P : P, L = P * (B * (L * Q - M * I) + G * (M * H - G * Q) + J * (G * I - L * H)), T = -(P * (H * T + I * Y + Q * R)), G = -(P * (B * (I * V - Q * M) + G * (Q * J - H * V) + J * (H * M - I * J))), B = 0 < Q ? Q : -Q, E = E * G - A * T - L, v = v * G - C * T - L, A = T;
  }
  C = G;
  n = (N[0] = n - y * A, w[0]);
  m = (N[0] = m - y * C, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | n;
  l[(k + 4 | 0) >> 2] = m;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = q - F * E;
  h = l[f] + 12 * l[e] | 0;
  k = (N[0] = t + z * A, w[0]);
  n = (N[0] = u + z * C, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | k;
  l[(h + 4 | 0) >> 2] = n;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = i + r * v;
  return .004999999888241291 < g ? 0 : .03490658849477768 >= B;
}), 0, (function(b, d) {
  var e;
  e = l[d + 48 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 76 >> 2], h = p[e + 5], i = p[d + 80 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d) {
  var e;
  e = l[d + 52 >> 2] >> 2;
  var f = p[e + 6], g = p[d + 84 >> 2], h = p[e + 5], i = p[d + 88 >> 2], k = h * g + f * i + p[e + 4];
  p[b >> 2] = f * g - h * i + p[e + 3];
  p[b + 4 >> 2] = k;
}), 0, (function(b, d, e) {
  var d = d >> 2, f = p[d + 27], g = p[d + 29], h = (p[d + 46] * f + p[d + 44] * g) * e;
  p[b >> 2] = (p[d + 45] * f + p[d + 43] * g) * e;
  p[b + 4 >> 2] = h;
}), 0, (function(b, d) {
  return p[b + 112 >> 2] * d;
}), 0, (function(b) {
  var d = b >> 2, e = a, f = l[l[d + 12] + 8 >> 2], g = l[l[d + 13] + 8 >> 2];
  U(O.Af | 0, (s = a, a += 1, a = a + 3 >> 2 << 2, l[s >> 2] = 0, s));
  U(O.A | 0, (s = a, a += 4, l[s >> 2] = f, s));
  U(O.B | 0, (s = a, a += 4, l[s >> 2] = g, s));
  f = c[b + 61 | 0] & 1;
  U(O.C | 0, (s = a, a += 4, l[s >> 2] = f, s));
  f = p[d + 19];
  g = p[d + 20];
  U(O.K | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  f = p[d + 21];
  g = p[d + 22];
  U(O.L | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  f = p[d + 23];
  g = p[d + 24];
  U(O.Ub | 0, (s = a, a += 16, te[0] = f, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], te[0] = g, l[s + 8 >> 2] = w[0], l[s + 12 >> 2] = w[1], s));
  b = c[b + 128 | 0] & 1;
  U(O.$a | 0, (s = a, a += 4, l[s >> 2] = b, s));
  b = p[d + 31];
  U(O.ab | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 30];
  U(O.Xb | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 17];
  U(O.Ma | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  b = p[d + 18];
  U(O.Na | 0, (s = a, a += 8, te[0] = b, l[s >> 2] = w[0], l[s + 4 >> 2] = w[1], s));
  d = l[d + 14];
  U(O.z | 0, (s = a, a += 4, l[s >> 2] = d, s));
  a = e;
}), 0, zb(), 0, (function(b) {
  Nv(b);
}), 0, (function(b, d) {
  var e, f, g, h, i, k, m = b >> 2, n = l[m + 12];
  k = n >> 2;
  var q = l[k + 2], r = b + 132 | 0;
  l[r >> 2] = q;
  var t = l[m + 13];
  i = t >> 2;
  var u = l[i + 2];
  h = (b + 136 | 0) >> 2;
  l[h] = u;
  var v = n + 28 | 0, A = b + 140 | 0, C = l[v >> 2], B = l[v + 4 >> 2];
  l[A >> 2] = C;
  l[A + 4 >> 2] = B;
  var y = t + 28 | 0, z = b + 148 | 0, F = l[y >> 2], G = l[y + 4 >> 2];
  l[z >> 2] = F;
  l[z + 4 >> 2] = G;
  var H = p[k + 30];
  p[m + 39] = H;
  var E = p[i + 30];
  p[m + 40] = E;
  var I = p[k + 32];
  p[m + 41] = I;
  var J = p[i + 32];
  p[m + 42] = J;
  var L = l[d + 24 >> 2], M = L + 12 * q | 0, V = l[M + 4 >> 2], Q = (w[0] = l[M >> 2], N[0]), T = (w[0] = V, N[0]), Y = p[(L + 8 >> 2) + (3 * q | 0)];
  g = (d + 28 | 0) >> 2;
  var R = l[g], P = R + 12 * q | 0, aa = l[P + 4 >> 2], W = (w[0] = l[P >> 2], N[0]), da = (w[0] = aa, N[0]), sa = p[(R + 8 >> 2) + (3 * q | 0)], ta = L + 12 * u | 0, ja = l[ta + 4 >> 2], ua = (w[0] = l[ta >> 2], N[0]), ha = (w[0] = ja, N[0]), wa = p[(L + 8 >> 2) + (3 * u | 0)], oa = R + 12 * u | 0, Aa = l[oa + 4 >> 2], Fa = (w[0] = l[oa >> 2], N[0]), La = (w[0] = Aa, N[0]), xa = p[(R + 8 >> 2) + (3 * u | 0)], ca = Dm(Y), Z = Em(Y), la = Dm(wa), ya = Em(wa), fa = p[m + 19], $ = (w[0] = C, N[0]), eb = fa - $, Sa = p[m + 20], Da = (w[0] = B, N[0]), na = Sa - Da, ma = Z * eb - ca * na, Ba = ca * eb + Z * na, za = p[m + 21], Ha = (w[0] = F, N[0]), jb = za - Ha, Ia = p[m + 22], $a = (w[0] = G, N[0]), ba = Ia - $a, qa = ya * jb - la * ba, ka = la * jb + ya * ba, ia = ua + qa - Q - ma, va = ha + ka - T - Ba, Oa = p[m + 25], Pa = p[m + 26], Ta = Z * Oa - ca * Pa, Xa = ca * Oa + Z * Pa, ab = b + 180 | 0, kb = (N[0] = Ta, w[0]), mb = (N[0] = Xa, w[0]) | 0;
  l[ab >> 2] = 0 | kb;
  l[ab + 4 >> 2] = mb;
  var Qa = ia + ma, Ma = va + Ba, bb = Qa * Xa - Ma * Ta;
  p[m + 49] = bb;
  var Va = qa * Xa - ka * Ta;
  p[m + 50] = Va;
  var Ja = H + E, ga = Ja + I * bb * bb + J * Va * Va;
  p[m + 51] = 0 < ga ? 1 / ga : ga;
  f = (b + 212 | 0) >> 2;
  p[f] = 0;
  var cb = b + 216 | 0;
  p[cb >> 2] = 0;
  var gb = b + 220 | 0;
  p[gb >> 2] = 0;
  var db = p[m + 17];
  if (0 < db) {
    var Ya = p[m + 23], Ka = p[m + 24], Ga = Z * Ya - ca * Ka, fb = ca * Ya + Z * Ka, Ea = b + 172 | 0, Ua = (N[0] = Ga, w[0]), ob = (N[0] = fb, w[0]) | 0;
    l[Ea >> 2] = 0 | Ua;
    l[Ea + 4 >> 2] = ob;
    var Na = Qa * fb - Ma * Ga;
    p[m + 47] = Na;
    var Wa = qa * fb - ka * Ga;
    p[m + 48] = Wa;
    var nb = Ja + I * Na * Na + J * Wa * Wa;
    if (0 < nb) {
      var pa = 1 / nb;
      p[f] = pa;
      var hb = ia * Ga + va * fb, Ca = 6.2831854820251465 * db, ib = pa * Ca * Ca, Za = p[d >> 2], lb = Za * (2 * pa * p[m + 18] * Ca + Za * ib), qb = 0 < lb ? 1 / lb : lb;
      p[gb >> 2] = qb;
      p[cb >> 2] = hb * Za * ib * qb;
      var vb = nb + qb;
      p[f] = vb;
      0 < vb && (p[f] = 1 / vb);
    }
  } else {
    p[m + 29] = 0;
  }
  if (0 == (c[b + 128 | 0] & 1) << 24 >> 24) {
    p[m + 52] = 0, p[m + 28] = 0;
  } else {
    var sb = I + J, Ab = b + 208 | 0;
    p[Ab >> 2] = sb;
    0 < sb && (p[Ab >> 2] = 1 / sb);
  }
  if (0 == (c[d + 20 | 0] & 1) << 24 >> 24) {
    p[m + 27] = 0;
    p[m + 29] = 0;
    p[m + 28] = 0;
    var Bb = xa, Gb = sa, Cb = W, pb = da, ub = Fa, Eb = La;
  } else {
    e = (d + 8 | 0) >> 2;
    var Db = b + 108 | 0, wb = p[Db >> 2] * p[e];
    p[Db >> 2] = wb;
    var Hb = b + 116 | 0, tb = p[Hb >> 2] * p[e];
    p[Hb >> 2] = tb;
    var xb = b + 112 | 0, Ib = p[xb >> 2] * p[e];
    p[xb >> 2] = Ib;
    var Jb = Ta * wb + p[m + 43] * tb, Lb = Xa * wb + p[m + 44] * tb, Bb = xa + J * (wb * Va + tb * p[m + 48] + Ib), Gb = sa - I * (wb * bb + tb * p[m + 47] + Ib), Cb = W - Jb * H, pb = da - Lb * H, ub = Fa + Jb * E, Eb = La + Lb * E;
  }
  var Xb = l[g] + 12 * q | 0, Nb = (N[0] = Cb, w[0]), Sb = (N[0] = pb, w[0]) | 0;
  l[(Xb | 0) >> 2] = 0 | Nb;
  l[(Xb + 4 | 0) >> 2] = Sb;
  p[(l[g] + 8 >> 2) + (3 * l[r >> 2] | 0)] = Gb;
  var Ob = l[g] + 12 * l[h] | 0, Vb = (N[0] = ub, w[0]), Zb = (N[0] = Eb, w[0]) | 0;
  l[(Ob | 0) >> 2] = 0 | Vb;
  l[(Ob + 4 | 0) >> 2] = Zb;
  p[(l[g] + 8 >> 2) + (3 * l[h] | 0)] = Bb;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = p[g + 39], i = p[g + 40], k = p[g + 41], m = p[g + 42], n = b + 132 | 0, q = l[n >> 2];
  f = (d + 28 | 0) >> 2;
  var r = l[f], t = r + 12 * q | 0;
  e = l[t + 4 >> 2];
  var t = (w[0] = l[t >> 2], N[0]), u = (w[0] = e, N[0]), v = p[(r + 8 >> 2) + (3 * q | 0)];
  e = (b + 136 | 0) >> 2;
  var A = l[e], C = r + 12 * A | 0, B = l[C + 4 >> 2], C = (w[0] = l[C >> 2], N[0]), B = (w[0] = B, N[0]), A = p[(r + 8 >> 2) + (3 * A | 0)], y = p[g + 43], z = p[g + 44], F = p[g + 48], r = p[g + 47], G = b + 116 | 0, H = p[G >> 2], E = (y * (C - t) + z * (B - u) + F * A - r * v + p[g + 54] + p[g + 55] * H) * -p[g + 53];
  p[G >> 2] = H + E;
  y *= E;
  z *= E;
  t -= y * h;
  u -= z * h;
  r = v - k * E * r;
  v = C + y * i;
  C = B + z * i;
  B = A + m * E * F;
  A = b + 112 | 0;
  F = p[A >> 2];
  y = p[d >> 2] * p[g + 30];
  z = F + (B - r - p[g + 31]) * -p[g + 52];
  E = -y;
  y = z < y ? z : y;
  E = y < E ? E : y;
  p[A >> 2] = E;
  F = E - F;
  A = r - k * F;
  B += m * F;
  E = p[g + 45];
  y = p[g + 46];
  r = p[g + 50];
  F = p[g + 49];
  g = (E * (v - t) + y * (C - u) + r * B - F * A) * -p[g + 51];
  z = b + 108 | 0;
  p[z >> 2] += g;
  E *= g;
  y *= g;
  q = l[f] + 12 * q | 0;
  t = (N[0] = t - E * h, w[0]);
  h = (N[0] = u - y * h, w[0]) | 0;
  l[(q | 0) >> 2] = 0 | t;
  l[(q + 4 | 0) >> 2] = h;
  p[(l[f] + 8 >> 2) + (3 * l[n >> 2] | 0)] = A - k * g * F;
  k = l[f] + 12 * l[e] | 0;
  n = (N[0] = v + E * i, w[0]);
  i = (N[0] = C + y * i, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | n;
  l[(k + 4 | 0) >> 2] = i;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = B + m * g * r;
}), 0, (function(b, d) {
  var e, f, g = b >> 2, h = b + 132 | 0;
  e = l[h >> 2];
  f = (d + 24 | 0) >> 2;
  var i = l[f], k = i + 12 * e | 0, m = l[k + 4 >> 2], n = (w[0] = l[k >> 2], N[0]), m = (w[0] = m, N[0]), q = p[(i + 8 >> 2) + (3 * e | 0)];
  e = (b + 136 | 0) >> 2;
  var r = l[e], t = i + 12 * r | 0, u = l[t + 4 >> 2], t = (w[0] = l[t >> 2], N[0]), u = (w[0] = u, N[0]), i = p[(i + 8 >> 2) + (3 * r | 0)], v = Dm(q), A = Em(q), C = Dm(i), B = Em(i), r = p[g + 19] - p[g + 35], y = p[g + 20] - p[g + 36], z = A * r - v * y, y = v * r + A * y, F = p[g + 21] - p[g + 37], G = p[g + 22] - p[g + 38], r = B * F - C * G, C = C * F + B * G, F = t - n + r - z, G = u - m + C - y, H = p[g + 25], E = p[g + 26], B = A * H - v * E, v = v * H + A * E, A = F * B + G * v, I = p[g + 39], E = p[g + 40], J = p[g + 41], L = p[g + 49], H = p[g + 42], g = p[g + 50], g = I + E + J * L * L + H * g * g, g = 0 != g ? -A / g : 0, M = B * g, L = v * g, n = (N[0] = n - M * I, w[0]), m = (N[0] = m - L * I, w[0]) | 0;
  l[(k | 0) >> 2] = 0 | n;
  l[(k + 4 | 0) >> 2] = m;
  p[(l[f] + 8 >> 2) + (3 * l[h >> 2] | 0)] = q - J * g * ((F + z) * v - (G + y) * B);
  h = l[f] + 12 * l[e] | 0;
  k = (N[0] = t + M * E, w[0]);
  n = (N[0] = u + L * E, w[0]) | 0;
  l[(h | 0) >> 2] = 0 | k;
  l[(h + 4 | 0) >> 2] = n;
  p[(l[f] + 8 >> 2) + (3 * l[e] | 0)] = i + H * g * (r * v - C * B);
  return .004999999888241291 >= (0 < A ? A : -A);
}), 0, ts, 0, us, 0, vs, 0, zs, 0, (function(b, d, e) {
  gp(b, d, e);
}), 0, ws, 0, xs, 0, (function(b) {
  dp(b);
}), 0, ys, 0, Lv, 0, Bs, 0, Mv, 0, Cs, 0, (function(b) {
  return b | 0;
}), 0, (function(b, d) {
  Vo(b, d);
}), 0, Ov, 0, Ds, 0, Es, 0, Fs, 0, Pv, 0, Qv, 0, Rv, 0, Gs, 0, Sv, 0, Hs, 0, Tv, 0, Uv, 0, Vv, 0, (function(b, d, e) {
  return zg(b, d, e);
}), 0, Wv, 0, Xv, 0, Yv, 0, Is, 0, Js, 0, qu, 0, ov, 0, Zv, 0, pv, 0, qv, 0, wv, 0, (function(b) {
  Sr(b);
}), 0, xv, 0, yv, 0, zv, 0, Av, 0, Bv, 0, Cv, 0, $v, 0, Dv, 0, Ev, 0, (function(b, d) {
  sp(b, d);
}), 0, aw, 0, Fv, 0, (function(b, d, e, f) {
  Fr(b, d, e, f);
}), 0, Gv, 0, Hv, 0, Iv, 0, (function(b, d) {
  rp(b, d);
}), 0, Jv, 0, (function(b, d) {
  return lq(b, d);
}), 0, Kv, 0, bw, 0, cw, 0, dw, 0, ew, 0, Gw, 0, (function(b) {
  Tr(b);
}), 0, fw, 0, Hw, 0, gw, 0, hw, 0, iw, 0, Lw, 0, jw, 0, Mw, 0, kw, 0, lw, 0, mw, 0, Nw, 0, nw, 0, Ow, 0, Pw, 0, Kb(1), 0, Qw, 0, Rw, 0, Sw, 0, Kb(0), 0, ow, 0, pw, 0, qw, 0, Uw, 0, rw, 0, Vw, 0, Ww, 0, Xw, 0, Yw, 0, sw, 0, Zw, 0, tw, 0, uw, 0, vw, 0, ww, 0, $w, 0, ax, 0, xw, 0, yw, 0, zw, 0, Aw, 0, dx, 0, ex, 0, hx, 0, Bw, 0, kx, 0, lx, 0, mx, 0, nx, 0, ox, 0, px, 0, Cw, 0, Dw, 0, (function(b) {
  Pl(b);
}), 0, qx, 0, (function(b, d, e, f) {
  return Kl(b, d, e, f);
}), 0, (function(b) {
  Ol(b);
}), 0, (function(b, d) {
  rl(b, d);
}), 0, EA, 0, gE, 0, hE, 0, iE, 0, jE, 0, Ew, 0, kE, 0, Fw, 0, lE, 0, mE, 0, aF, 0, bF, 0, nE, 0, (function(b, d, e) {
  Fm(b, d, e);
}), 0, cF, 0, eF, 0, fF, 0, gF, 0, hF, 0, oE, 0, iF, 0, pE, 0, qE, 0, rE, 0, jF, 0, kF, 0, lF, 0, mF, 0, (function(b, d) {
  return an(b, d);
}), 0, nF, 0, oF, 0, (function(b, d, e) {
  Zm(b, d, e);
}), 0, pF, 0, sE, 0, tE, 0, qF, 0, uE, 0, rF, 0, vE, 0, (function(b, d, e, f, g) {
  Ym(b, d, e, f, g);
}), 0, wE, 0, sF, 0, xE, 0, yE, 0, tF, 0, uF, 0, zE, 0, vF, 0, AE, 0, BE, 0, xF, 0, CE, 0, yF, 0, DE, 0, EE, 0, zF, 0, FE, 0, AF, 0, BF, 0, CF, 0, DF, 0, EF, 0, GE, 0, HE, 0, GF, 0, IE, 0, HF, 0, JE, 0, KE, 0, LE, 0, ME, 0, NE, 0, OE, 0, PE, 0, QE, 0, IF, 0, RE, 0, SE, 0, TE, 0, UE, 0, JF, 0, VE, 0, KF, 0, WE, 0, LF, 0, MF, 0, NF, 0, OF, 0, XE, 0, YE, 0, ZE, 0, $E, 0, (function(b, d) {
  $o(b, d);
}), 0, PF, 0, QF, 0, RF, 0, SF, 0, TF, 0, xG, 0, UF, 0, VF, 0, AG, 0, WF, 0, XF, 0, (function(b, d, e) {
  Yo(b, d, e);
}), 0, YF, 0, ZF, 0, $F, 0, DG, 0, (function(b) {
  Qo(b);
}), 0, aG, 0, bG, 0, cG, 0, (function(b, d) {
  Po(b, d);
}), 0, (function(b, d) {
  return So(b, d);
}), 0, GG, 0, (function(b, d) {
  Xo(b, d);
}), 0, dG, 0, eG, 0, fG, 0, gG, 0, hG, 0, iG, 0, HG, 0, KG, 0, jG, 0, NG, 0, kG, 0, lG, 0, mG, 0, nG, 0, QG, 0, oG, 0, (function(b) {
  ap(b);
}), 0, pG, 0, qG, 0, rG, 0, (function(b, d) {
  Uo(b, d);
}), 0, sG, 0, tG, 0, TG, 0, uG, 0, vG, 0, wG, 0, UG, 0, cI, 0, dI, 0, (function(b, d) {
  ho(b, d);
}), 0, eI, 0, fI, 0, VG, 0, WG, 0, XG, 0, YG, 0, ZG, 0, gI, 0, $G, 0, aH, 0, hI, 0, bH, 0, cH, 0, iI, 0, dH, 0, eH, 0, fH, 0, gH, 0, hH, 0, iH, 0, jH, 0, kH, 0, lH, 0, mH, 0, nH, 0, oH, 0, jI, 0, pH, 0, qH, 0, rH, 0, sH, 0, tH, 0, uH, 0, vH, 0, wH, 0, (function(b) {
  return b + 4 | 0;
}), 0, kI, 0, xH, 0, yH, 0, zH, 0, AH, 0, BH, 0, CH, 0, DH, 0, EH, 0, FH, 0, GH, 0, HH, 0, IH, 0, JH, 0, lI, 0, KH, 0, mI, 0, nI, 0, LH, 0, MH, 0, NH, 0, OH, 0, PH, 0, oI, 0, QH, 0, RH, 0, SH, 0, rI, 0, sI, 0, TH, 0, tI, 0, wI, 0, UH, 0, VH, 0, WH, 0, XH, 0, YH, 0, xI, 0, yI, 0, ZH, 0, zI, 0, $H, 0, (function(b, d, e) {
  xi(b, d, e);
}), 0, CI, 0, aI, 0, DI, 0, bI, 0, EI, 0, FI, 0, GI, 0, RJ, 0, HI, 0, II, 0, JI, 0, SJ, 0, KI, 0, LI, 0, MI, 0, NI, 0, OI, 0, TJ, 0, PI, 0, QI, 0, RI, 0, SI, 0, TI, 0, UI, 0, VI, 0, WI, 0, UJ, 0, XI, 0, YI, 0, ZI, 0, $I, 0, aJ, 0, bJ, 0, cJ, 0, dJ, 0, eJ, 0, VJ, 0, fJ, 0, gJ, 0, hJ, 0, iJ, 0, jJ, 0, kJ, 0, lJ, 0, WJ, 0, mJ, 0, nJ, 0, oJ, 0, pJ, 0, qJ, 0, XJ, 0, YJ, 0, ZJ, 0, aK, 0, dK, 0, rJ, 0, sJ, 0, gK, 0, hK, 0, tJ, 0, uJ, 0, vJ, 0, wJ, 0, xJ, 0, yJ, 0, zJ, 0, AJ, 0, iK, 0, BJ, 0, CJ, 0, DJ, 0, EJ, 0, FJ, 0, GJ, 0, HJ, 0, IJ, 0, jK, 0, JJ, 0, KJ, 0, LJ, 0, MJ, 0, NJ, 0, OJ, 0, PJ, 0, QJ, 0, kK, 0, lK, 0, mK, 0, nK, 0, oK, 0, pK, 0, qK, 0, rK, 0, sK, 0, tK, 0, BL, 0, CL, 0, uK, 0, vK, 0, wK, 0, xK, 0, DL, 0, yK, 0, zK, 0, AK, 0, BK, 0, CK, 0, DK, 0, EK, 0, FK, 0, GK, 0, EL, 0, HK, 0, (function(b, d, e, f, g, h, i, k) {
  Xr(b, d, e, f, g, h, i, k);
}), 0, IK, 0, JK, 0, KK, 0, LK, 0, MK, 0, NK, 0, OK, 0, FL, 0, PK, 0, QK, 0, RK, 0, SK, 0, TK, 0, GL, 0, UK, 0, HL, 0, IL, 0, VK, 0, WK, 0, (function(b) {
  return b | 0;
}), 0, (function(b) {
  return b + 8 | 0;
}), 0, JL, 0, KL, 0, XK, 0, LL, 0, YK, 0, ZK, 0, $K, 0, ML, 0, NL, 0, aL, 0, OL, 0, bL, 0, cL, 0, dL, 0, eL, 0, fL, 0, gL, 0, hL, 0, iL, 0, jL, 0, kL, 0, PL, 0, QL, 0, lL, 0, mL, 0, RL, 0, nL, 0, oL, 0, pL, 0, qL, 0, rL, 0, sL, 0, tL, 0, uL, 0, vL, 0, wL, 0, xL, 0, SL, 0, yL, 0, zL, 0, AL, 0, gM, 0, TL, 0, UL, 0, hM, 0, iM, 0, VL, 0, WL, 0, XL, 0, YL, 0, ZL, 0, jM, 0, $L, 0, aM, 0, kM, 0, bM, 0, cM, 0, dM, 0, eM, 0, lM, 0, fM, 0, (function(b) {
  ra(b | 0);
  Nv(b);
}), 0, (function() {
  return O.uf | 0;
}), 0, (function(b) {
  ra(b | 0);
  Nv(b);
}), 0, (function() {
  return O.Yd | 0;
}), 0, yg, 0, (function(b) {
  Fh(l[b + 32 >> 2]);
  Fh(l[b + 44 >> 2]);
  Fh(l[b + 4 >> 2]);
}), 0, (function(b) {
  var d, e = b >> 2;
  l[e] = -1;
  d = (b + 12 | 0) >> 2;
  l[d] = 16;
  l[e + 2] = 0;
  var f = Oe(576), b = (b + 4 | 0) >> 2;
  l[b] = f;
  Ze(f, 36 * l[d] | 0);
  var f = l[d] - 1 | 0, g = 0 < (f | 0);
  a : do {
    if (g) {
      for (var h = 0; ; ) {
        var i = h + 1 | 0;
        l[(l[b] + 36 * h + 20 | 0) >> 2] = i;
        l[(l[b] + 36 * h + 32 | 0) >> 2] = -1;
        h = l[d] - 1 | 0;
        if ((i | 0) >= (h | 0)) {
          var k = h;
          break a;
        }
        h = i;
      }
    } else {
      k = f;
    }
  } while (0);
  l[(l[b] + 36 * k + 20 | 0) >> 2] = -1;
  l[(l[b] + 36 * (l[d] - 1) + 32 | 0) >> 2] = -1;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
}), 0, (function(b) {
  Fh(l[b + 4 >> 2]);
}), 0, (function(b) {
  var d = b + 8 | 0;
  l[d >> 2] = 128;
  l[b + 4 >> 2] = 0;
  var e = Oe(1024);
  l[b >> 2] = e;
  Ze(e, l[d >> 2] << 3);
  Ze(b + 12 | 0, 56);
  if (0 == (c[np] & 1) << 24 >> 24) {
    d = 0;
    for (b = 1; !(14 > (d | 0) || S(O.e | 0, 73, O.Ga | 0, O.Sa | 0), (b | 0) > (l[cn + (d << 2) >> 2] | 0) && (d = d + 1 | 0), c[bn + b | 0] = d & 255, b = b + 1 | 0, 641 == (b | 0)); ) {}
    c[np] = 1;
  }
}), 0, (function(b) {
  var d = b + 4 | 0, e = 0 < (l[d >> 2] | 0), b = b | 0, f = l[b >> 2];
  a : do {
    if (e) {
      for (var g = 0, h = f; ; ) {
        if (Fh(l[h + (g << 3) + 4 >> 2]), g = g + 1 | 0, h = l[b >> 2], (g | 0) >= (l[d >> 2] | 0)) {
          var i = h;
          break a;
        }
      }
    } else {
      i = f;
    }
  } while (0);
  Fh(i);
}), 0, (function(b) {
  l[b + 102400 >> 2] = 0;
  l[b + 102404 >> 2] = 0;
  l[b + 102408 >> 2] = 0;
  l[b + 102796 >> 2] = 0;
}), 0, (function(b) {
  0 != (l[b + 102400 >> 2] | 0) && S(O.m | 0, 32, O.P | 0, O.Ta | 0);
  0 != (l[b + 102796 >> 2] | 0) && S(O.m | 0, 33, O.P | 0, O.Wa | 0);
}), 0, (function(b) {
  var d = a;
  a += 8;
  Gr(d);
  l[b >> 2] = l[d >> 2];
  var e = .0010000000474974513 * (l[d + 4 >> 2] | 0);
  l[b + 4 >> 2] = 0 <= e ? Math.floor(e) : Math.ceil(e);
  a = d;
}), 0, No, 0, zb(), 0, (function(b) {
  var d = b >> 2;
  yg(b | 0);
  l[d + 15] = 0;
  l[d + 16] = 0;
  l[d + 17] = op;
  l[d + 18] = pp;
  l[d + 19] = 0;
}), 0, (function(b) {
  j[b + 32 >> 1] = 1;
  j[b + 34 >> 1] = -1;
  j[b + 36 >> 1] = 0;
  l[b + 40 >> 2] = 0;
  l[b + 8 >> 2] = 0;
  l[b + 4 >> 2] = 0;
  l[b + 24 >> 2] = 0;
  l[b + 28 >> 2] = 0;
  l[b + 12 >> 2] = 0;
  p[b >> 2] = 0;
}), 0, lp, 0, (function(b) {
  var d = b >> 2, b = (b | 0) >> 2;
  ho(l[b], l[d + 5]);
  ho(l[b], l[d + 6]);
  ho(l[b], l[d + 4]);
  ho(l[b], l[d + 3]);
  ho(l[b], l[d + 2]);
}), 0, mp, 0, qp, 0, (function(b, d, e, f, g) {
  var h = b >> 2, i = b | 0;
  l[i >> 2] = mN + 8 | 0;
  l[h + 1] = 4;
  l[h + 12] = d;
  var k = b + 52 | 0;
  l[k >> 2] = f;
  l[h + 14] = e;
  l[h + 15] = g;
  l[h + 31] = 0;
  l[h + 32] = 0;
  b = (b + 8 | 0) >> 2;
  for (e = b + 10; b < e; b++) {
    l[b] = 0;
  }
  b = Hh(p[(d + 16 | 0) >> 2] * p[f + 16 >> 2]);
  p[h + 34] = b;
  b = p[d + 20 >> 2];
  e = p[f + 20 >> 2];
  p[h + 35] = b > e ? b : e;
  l[i >> 2] = fN + 8 | 0;
  3 == (l[l[d + 12 >> 2] + 4 >> 2] | 0) ? d = f : (S(O.ta | 0, 43, O.ha | 0, O.qa | 0), d = l[k >> 2]);
  0 != (l[l[d + 12 >> 2] + 4 >> 2] | 0) && S(O.ta | 0, 44, O.ha | 0, O.I | 0);
}), 0, (function(b, d, e, f, g) {
  var h = b >> 2, i = b | 0;
  l[i >> 2] = mN + 8 | 0;
  l[h + 1] = 4;
  l[h + 12] = d;
  var k = b + 52 | 0;
  l[k >> 2] = f;
  l[h + 14] = e;
  l[h + 15] = g;
  l[h + 31] = 0;
  l[h + 32] = 0;
  b = (b + 8 | 0) >> 2;
  for (e = b + 10; b < e; b++) {
    l[b] = 0;
  }
  b = Hh(p[(d + 16 | 0) >> 2] * p[f + 16 >> 2]);
  p[h + 34] = b;
  b = p[d + 20 >> 2];
  e = p[f + 20 >> 2];
  p[h + 35] = b > e ? b : e;
  l[i >> 2] = iN + 8 | 0;
  3 == (l[l[d + 12 >> 2] + 4 >> 2] | 0) ? d = f : (S(O.ua | 0, 43, O.ja | 0, O.qa | 0), d = l[k >> 2]);
  2 != (l[l[d + 12 >> 2] + 4 >> 2] | 0) && S(O.ua | 0, 44, O.ja | 0, O.S | 0);
}), 0, (function(b, d, e) {
  var f = b >> 2, g = b | 0;
  l[g >> 2] = mN + 8 | 0;
  l[f + 1] = 4;
  l[f + 12] = d;
  var h = b + 52 | 0;
  l[h >> 2] = e;
  l[f + 14] = 0;
  l[f + 15] = 0;
  l[f + 31] = 0;
  l[f + 32] = 0;
  for (var b = (b + 8 | 0) >> 2, i = b + 10; b < i; b++) {
    l[b] = 0;
  }
  b = Hh(p[(d + 16 | 0) >> 2] * p[e + 16 >> 2]);
  p[f + 34] = b;
  b = p[d + 20 >> 2];
  i = p[e + 20 >> 2];
  p[f + 35] = b > i ? b : i;
  l[g >> 2] = kN + 8 | 0;
  0 == (l[l[d + 12 >> 2] + 4 >> 2] | 0) ? d = e : (S(O.va | 0, 44, O.ea | 0, O.Ab | 0), d = l[h >> 2]);
  0 != (l[l[d + 12 >> 2] + 4 >> 2] | 0) && S(O.va | 0, 45, O.ea | 0, O.I | 0);
}), 0, Hr, 0, (function(b) {
  var d = b + 32 | 0;
  ho(l[d >> 2], l[b + 40 >> 2]);
  ho(l[d >> 2], l[b + 36 >> 2]);
}), 0, (function(b, d, e) {
  var f = b >> 2, g = b | 0;
  l[g >> 2] = mN + 8 | 0;
  l[f + 1] = 4;
  l[f + 12] = d;
  var h = b + 52 | 0;
  l[h >> 2] = e;
  l[f + 14] = 0;
  l[f + 15] = 0;
  l[f + 31] = 0;
  l[f + 32] = 0;
  for (var b = (b + 8 | 0) >> 2, i = b + 10; b < i; b++) {
    l[b] = 0;
  }
  b = Hh(p[(d + 16 | 0) >> 2] * p[e + 16 >> 2]);
  p[f + 34] = b;
  b = p[d + 20 >> 2];
  i = p[e + 20 >> 2];
  p[f + 35] = b > i ? b : i;
  l[g >> 2] = nN + 8 | 0;
  1 == (l[l[d + 12 >> 2] + 4 >> 2] | 0) ? d = e : (S(O.wa | 0, 41, O.ga | 0, O.ra | 0), d = l[h >> 2]);
  0 != (l[l[d + 12 >> 2] + 4 >> 2] | 0) && S(O.wa | 0, 42, O.ga | 0, O.I | 0);
}), 0, (function(b, d, e) {
  var f = b >> 2, g = b | 0;
  l[g >> 2] = mN + 8 | 0;
  l[f + 1] = 4;
  l[f + 12] = d;
  var h = b + 52 | 0;
  l[h >> 2] = e;
  l[f + 14] = 0;
  l[f + 15] = 0;
  l[f + 31] = 0;
  l[f + 32] = 0;
  for (var b = (b + 8 | 0) >> 2, i = b + 10; b < i; b++) {
    l[b] = 0;
  }
  b = Hh(p[(d + 16 | 0) >> 2] * p[e + 16 >> 2]);
  p[f + 34] = b;
  b = p[d + 20 >> 2];
  i = p[e + 20 >> 2];
  p[f + 35] = b > i ? b : i;
  l[g >> 2] = pN + 8 | 0;
  1 == (l[l[d + 12 >> 2] + 4 >> 2] | 0) ? d = e : (S(O.xa | 0, 41, O.ia | 0, O.ra | 0), d = l[h >> 2]);
  2 != (l[l[d + 12 >> 2] + 4 >> 2] | 0) && S(O.xa | 0, 42, O.ia | 0, O.S | 0);
}), 0, (function(b, d, e) {
  var f = b >> 2, g = b | 0;
  l[g >> 2] = mN + 8 | 0;
  l[f + 1] = 4;
  l[f + 12] = d;
  var h = b + 52 | 0;
  l[h >> 2] = e;
  l[f + 14] = 0;
  l[f + 15] = 0;
  l[f + 31] = 0;
  l[f + 32] = 0;
  for (var b = (b + 8 | 0) >> 2, i = b + 10; b < i; b++) {
    l[b] = 0;
  }
  b = Hh(p[(d + 16 | 0) >> 2] * p[e + 16 >> 2]);
  p[f + 34] = b;
  b = p[d + 20 >> 2];
  i = p[e + 20 >> 2];
  p[f + 35] = b > i ? b : i;
  l[g >> 2] = rN + 8 | 0;
  2 == (l[l[d + 12 >> 2] + 4 >> 2] | 0) ? d = e : (S(O.ya | 0, 41, O.ka | 0, O.sa | 0), d = l[h >> 2]);
  0 != (l[l[d + 12 >> 2] + 4 >> 2] | 0) && S(O.ya | 0, 42, O.ka | 0, O.I | 0);
}), 0, (function(b, d, e) {
  var f = b >> 2, g = b | 0;
  l[g >> 2] = mN + 8 | 0;
  l[f + 1] = 4;
  l[f + 12] = d;
  var h = b + 52 | 0;
  l[h >> 2] = e;
  l[f + 14] = 0;
  l[f + 15] = 0;
  l[f + 31] = 0;
  l[f + 32] = 0;
  for (var b = (b + 8 | 0) >> 2, i = b + 10; b < i; b++) {
    l[b] = 0;
  }
  b = Hh(p[(d + 16 | 0) >> 2] * p[e + 16 >> 2]);
  p[f + 34] = b;
  b = p[d + 20 >> 2];
  i = p[e + 20 >> 2];
  p[f + 35] = b > i ? b : i;
  l[g >> 2] = tN + 8 | 0;
  2 == (l[l[d + 12 >> 2] + 4 >> 2] | 0) ? d = e : (S(O.za | 0, 44, O.fa | 0, O.sa | 0), d = l[h >> 2]);
  2 != (l[l[d + 12 >> 2] + 4 >> 2] | 0) && S(O.za | 0, 45, O.fa | 0, O.S | 0);
}), 0, (function(b, d) {
  var e, f = d >> 2, g = b >> 2, h = b | 0;
  l[h >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var i = d + 12 | 0;
  (l[e >> 2] | 0) == (l[i >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[g + 1] = l[f];
  l[g + 2] = 0;
  l[g + 3] = 0;
  l[g + 12] = l[e >> 2];
  l[g + 13] = l[i >> 2];
  l[g + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[g + 16] = l[f + 1];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[h >> 2] = nq + 8 | 0;
  h = b + 88 | 0;
  e = d + 20 | 0;
  var i = b + 80 | 0, k = l[e + 4 >> 2];
  l[i >> 2] = l[e >> 2];
  l[i + 4 >> 2] = k;
  e = d + 28 | 0;
  i = l[e + 4 >> 2];
  l[h >> 2] = l[e >> 2];
  l[h + 4 >> 2] = i;
  p[g + 26] = p[f + 9];
  p[g + 17] = p[f + 10];
  p[g + 18] = p[f + 11];
  p[g + 25] = 0;
  p[g + 24] = 0;
  p[g + 19] = 0;
}), 0, (function(b, d) {
  var e, f = b >> 2, g = b | 0;
  l[g >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var h = d + 12 | 0;
  (l[e >> 2] | 0) == (l[h >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[f + 1] = l[d >> 2];
  l[f + 2] = 0;
  l[f + 3] = 0;
  l[f + 12] = l[e >> 2];
  l[f + 13] = l[h >> 2];
  l[f + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[f + 16] = l[d + 4 >> 2];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[g >> 2] = Dr + 8 | 0;
  g = b + 76 | 0;
  e = d + 20 | 0;
  var h = b + 68 | 0, i = l[e + 4 >> 2];
  l[h >> 2] = l[e >> 2];
  l[h + 4 >> 2] = i;
  e = d + 28 | 0;
  h = l[e + 4 >> 2];
  l[g >> 2] = l[e >> 2];
  l[g + 4 >> 2] = h;
  p[f + 21] = 0;
  p[f + 22] = 0;
  p[f + 23] = 0;
  p[f + 24] = p[d + 36 >> 2];
  p[f + 25] = p[d + 40 >> 2];
}), 0, sq, 0, oq, 0, pq, 0, rq, 0, qq, 0, (function(b, d) {
  var e, f = b >> 2, g = b | 0;
  l[g >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var h = d + 12 | 0;
  (l[e >> 2] | 0) == (l[h >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[f + 1] = l[d >> 2];
  l[f + 2] = 0;
  l[f + 3] = 0;
  l[f + 12] = l[e >> 2];
  l[f + 13] = l[h >> 2];
  l[f + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[f + 16] = l[d + 4 >> 2];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[g >> 2] = Er + 8 | 0;
  g = b + 76 | 0;
  e = d + 20 | 0;
  var h = b + 68 | 0, i = l[e + 4 >> 2];
  l[h >> 2] = l[e >> 2];
  l[h + 4 >> 2] = i;
  e = d + 28 | 0;
  h = l[e + 4 >> 2];
  l[g >> 2] = l[e >> 2];
  l[g + 4 >> 2] = h;
  p[f + 21] = p[d + 36 >> 2];
  p[f + 40] = 0;
  p[f + 23] = 0;
  l[f + 41] = 0;
  p[f + 22] = 0;
}), 0, (function(b, d) {
  var e, f = d >> 2, g = b >> 2, h = b | 0;
  l[h >> 2] = mq + 8 | 0;
  e = d + 8 | 0;
  var i = d + 12 | 0;
  (l[e >> 2] | 0) == (l[i >> 2] | 0) && S(O.o | 0, 173, O.r | 0, O.s | 0);
  l[g + 1] = l[f];
  l[g + 2] = 0;
  l[g + 3] = 0;
  l[g + 12] = l[e >> 2];
  l[g + 13] = l[i >> 2];
  l[g + 14] = 0;
  c[b + 61 | 0] = c[d + 16 | 0] & 1;
  c[b + 60 | 0] = 0;
  l[g + 16] = l[f + 1];
  e = (b + 16 | 0) >> 2;
  l[e] = 0;
  l[e + 1] = 0;
  l[e + 2] = 0;
  l[e + 3] = 0;
  l[e + 4] = 0;
  l[e + 5] = 0;
  l[e + 6] = 0;
  l[e + 7] = 0;
  l[h >> 2] = Cr + 8 | 0;
  h = b + 88 | 0;
  e = d + 20 | 0;
  var i = b + 80 | 0, k = l[e + 4 >> 2];
  l[i >> 2] = l[e >> 2];
  l[i + 4 >> 2] = k;
  e = d + 28 | 0;
  i = l[e + 4 >> 2];
  l[h >> 2] = l[e >> 2];
  l[h + 4 >> 2] = i;
  p[g + 24] = p[f + 9];
  p[g + 17] = p[f + 10];
  p[g + 18] = p[f + 11];
  p[g + 26] = 0;
  p[g + 27] = 0;
  p[g + 28] = 0;
}), 0, tq, 0, (function(b) {
  for (var d = b >> 2, e = d + 9; d < e; d++) {
    l[d] = 0;
  }
  p[(b + 40 | 0) >> 2] = 1;
  p[b + 44 >> 2] = .10000000149011612;
}), 0, (function(b) {
  b >>= 2;
  Fh(l[b + 1]);
  Fh(l[b + 2]);
  Fh(l[b + 3]);
  Fh(l[b + 4]);
  Fh(l[b + 5]);
  Fh(l[b + 6]);
}), 0, (function(b) {
  l[b >> 2] = sM + 8 | 0;
}), 0, (function(b) {
  l[b >> 2] = GN + 8 | 0;
}), 0 ];

Module.FUNCTION_TABLE = K;

function IN(b) {
  b = b || Module.arguments;
  xf(yf);
  var d = rb;
  Module._main && (d = Module.ng(b), xf(zf));
  return d;
}

Module.run = IN;

Module.preRun && Module.preRun();

Module.noInitialRun || IN();

Module.postRun && Module.postRun();

var JN = {};

function KN(b, d) {
  var e = d ? d.prototype.b : JN, f = e[b];
  if (f) {
    return f;
  }
  d = d || Object;
  f = Object.create(d.prototype);
  f.a = b;
  f.d = d;
  return e[b] = f;
}

Module.wrapPointer = KN;

Module.castObject = (function(b, d) {
  return KN(b.a, d);
});

Module.NULL = KN(0);

Module.destroy = (function(b) {
  b.__destroy__ || ea("Error: Cannot destroy object. (Did you create it yourself?)");
  b.__destroy__();
  b.d !== Object ? delete b.d.prototype.b[b.a] : delete JN[b.a];
});

Module.compare = (function(b, d) {
  return b.a === d.a;
});

Module.getPointer = (function(b) {
  return b.a;
});

Module.getClass = (function(b) {
  return b.d;
});

Module.customizeVTable = (function(b, d) {
  for (var e = ue(b.a, "void*"), f = 0; ue(e + Ec * f, "void*"); ) {
    f++;
  }
  var g = Oe(f * Ec);
  se(b.a, g, "void*");
  for (var h, i = K.length, k = 0; k < f; k++) {
    var m = K.length;
    ((function(b) {
      K.push((function() {
        h = b;
      }));
    }))(k);
    K.push(0);
    se(g + Ec * k, m, "void*");
  }
  var n = [ {
    a: 0
  } ];
  d.forEach((function(d) {
    for (;;) {
      try {
        d.original.apply(b, n);
        break;
      } catch (f) {
        n.push(n[0]);
      }
    }
    d.qg = ue(e + h * Ec, "void*");
  }));
  K = K.slice(0, i);
  var q = {};
  d.forEach((function(b) {
    var d = K.length;
    K.push(b.replacement);
    K.push(0);
    q[b.qg] = d;
  }));
  for (k = 0; k < f; k++) {
    i = ue(e + Ec * k, "void*"), i in q && (i = q[i]), se(g + Ec * k, i, "void*");
  }
  return b;
});

LN.prototype.get_m_contactFilter = (function() {
  return KN(ts(this.a), Module.b2ContactFilter);
});

LN.prototype.get_m_contactCount = (function() {
  return us(this.a);
});

LN.prototype.set_m_contactFilter = (function(b) {
  vs(this.a, b.a);
});

function LN() {
  this.a = zs();
  LN.prototype.b[this.a] = this;
  this.d = LN;
}

LN.prototype.b = {};

Module.b2ContactManager = LN;

LN.prototype.AddPair = (function(b, d) {
  gp(this.a, b, d);
});

LN.prototype.set_m_allocator = (function(b) {
  ws(this.a, b.a);
});

LN.prototype.set_m_contactCount = (function(b) {
  xs(this.a, b);
});

LN.prototype.Collide = (function() {
  dp(this.a);
});

LN.prototype.set_m_contactList = (function(b) {
  ys(this.a, b.a);
});

LN.prototype.FindNewContacts = (function() {
  Lv(this.a);
});

LN.prototype.get_m_contactListener = (function() {
  return KN(Bs(this.a), Module.b2ContactListener);
});

LN.prototype.__destroy__ = (function() {
  Mv(this.a);
});

LN.prototype.set_m_contactListener = (function(b) {
  Cs(this.a, b.a);
});

LN.prototype.get_m_broadPhase = (function() {
  return KN(this.a | 0, Module.b2BroadPhase);
});

LN.prototype.Destroy = (function(b) {
  Vo(this.a, b.a);
});

LN.prototype.set_m_broadPhase = (function(b) {
  Ov(this.a, b.a);
});

LN.prototype.get_m_contactList = (function() {
  return KN(Ds(this.a), Module.b2Contact);
});

LN.prototype.get_m_allocator = (function() {
  return KN(Es(this.a), Module.b2BlockAllocator);
});

MN.prototype.GetTreeQuality = (function() {
  return Fs(this.a);
});

MN.prototype.GetFatAABB = (function(b) {
  return KN(Pv(this.a, b), Module.b2AABB);
});

MN.prototype.GetUserData = (function(b) {
  return Qv(this.a, b);
});

MN.prototype.__destroy__ = (function() {
  Rv(this.a);
});

MN.prototype.GetTreeHeight = (function() {
  return Gs(this.a);
});

function MN() {
  this.a = Sv();
  MN.prototype.b[this.a] = this;
  this.d = MN;
}

MN.prototype.b = {};

Module.b2BroadPhase = MN;

MN.prototype.GetProxyCount = (function() {
  return Hs(this.a);
});

MN.prototype.GetTreeBalance = (function() {
  return Tv(this.a);
});

MN.prototype.TestOverlap = (function(b, d) {
  return Uv(this.a, b, d);
});

MN.prototype.TouchProxy = (function(b) {
  Vv(this.a, b);
});

MN.prototype.CreateProxy = (function(b, d) {
  return zg(this.a, b.a, d);
});

MN.prototype.MoveProxy = (function(b, d, e) {
  Wv(this.a, b, d.a, e.a);
});

MN.prototype.DestroyProxy = (function(b) {
  Xv(this.a, b);
});

NN.prototype.QueryAABB = (function(b, d) {
  Yv(this.a, b.a, d.a);
});

NN.prototype.SetSubStepping = (function(b) {
  Is(this.a, b);
});

NN.prototype.GetTreeQuality = (function() {
  return Js(this.a);
});

NN.prototype.GetTreeHeight = (function() {
  return qu(this.a);
});

NN.prototype.GetProfile = (function() {
  return KN(ov(this.a), Module.b2Profile);
});

NN.prototype.GetTreeBalance = (function() {
  return Zv(this.a);
});

NN.prototype.GetSubStepping = (function() {
  return pv(this.a);
});

NN.prototype.GetContactManager = (function() {
  return KN(qv(this.a), Module.b2ContactManager);
});

NN.prototype.SetContactListener = (function(b) {
  wv(this.a, b.a);
});

NN.prototype.DrawDebugData = (function() {
  Sr(this.a);
});

NN.prototype.SetContinuousPhysics = (function(b) {
  xv(this.a, b);
});

NN.prototype.SetGravity = (function(b) {
  yv(this.a, b.a);
});

NN.prototype.GetBodyCount = (function() {
  return zv(this.a);
});

NN.prototype.GetAutoClearForces = (function() {
  return Av(this.a);
});

NN.prototype.GetContinuousPhysics = (function() {
  return Bv(this.a);
});

NN.prototype.GetJointList = (function() {
  return KN(Cv(this.a), Module.b2Joint);
});

NN.prototype.CreateBody = (function(b) {
  return KN($v(this.a, b.a), Module.b2Body);
});

NN.prototype.GetBodyList = (function() {
  return KN(Dv(this.a), Module.b2Body);
});

NN.prototype.SetDestructionListener = (function(b) {
  Ev(this.a, b.a);
});

NN.prototype.DestroyJoint = (function(b) {
  sp(this.a, b.a);
});

function NN(b) {
  this.a = aw(b.a);
  NN.prototype.b[this.a] = this;
  this.d = NN;
}

NN.prototype.b = {};

Module.b2World = NN;

NN.prototype.GetJointCount = (function() {
  return Fv(this.a);
});

NN.prototype.Step = (function(b, d, e) {
  Fr(this.a, b, d, e);
});

NN.prototype.ClearForces = (function() {
  Gv(this.a);
});

NN.prototype.GetWarmStarting = (function() {
  return Hv(this.a);
});

NN.prototype.SetAllowSleeping = (function(b) {
  Iv(this.a, b);
});

NN.prototype.DestroyBody = (function(b) {
  rp(this.a, b.a);
});

NN.prototype.GetAllowSleeping = (function() {
  return Jv(this.a);
});

NN.prototype.CreateJoint = (function(b) {
  return KN(lq(this.a, b.a), Module.b2Joint);
});

NN.prototype.GetProxyCount = (function() {
  return Kv(this.a);
});

NN.prototype.RayCast = (function(b, d, e) {
  bw(this.a, b.a, d.a, e.a);
});

NN.prototype.IsLocked = (function() {
  return cw(this.a);
});

NN.prototype.GetContactList = (function() {
  return KN(dw(this.a), Module.b2Contact);
});

NN.prototype.SetDebugDraw = (function(b) {
  ew(this.a, b.a);
});

NN.prototype.__destroy__ = (function() {
  Gw(this.a);
});

NN.prototype.Dump = (function() {
  Tr(this.a);
});

NN.prototype.SetAutoClearForces = (function(b) {
  fw(this.a, b);
});

NN.prototype.GetGravity = (function() {
  return KN(Hw(this.a), Module.b2Vec2);
});

NN.prototype.GetContactCount = (function() {
  return gw(this.a);
});

NN.prototype.SetWarmStarting = (function(b) {
  hw(this.a, b);
});

NN.prototype.SetContactFilter = (function(b) {
  iw(this.a, b.a);
});

ON.prototype.__destroy__ = (function() {
  Lw(this.a);
});

ON.prototype.GetType = (function() {
  return jw(this.a);
});

ON.prototype.ComputeMass = (function(b, d) {
  Mw(this.a, b.a, d);
});

ON.prototype.set_m_radius = (function(b) {
  kw(this.a, b);
});

ON.prototype.get_m_radius = (function() {
  return lw(this.a);
});

ON.prototype.GetVertex = (function() {
  return KN(mw(this.a), Module.b2Vec2);
});

ON.prototype.Clone = (function(b) {
  return KN(Nw(this.a, b.a), Module.b2Shape);
});

ON.prototype.GetSupportVertex = (function() {
  return KN(nw(this.a), Module.b2Vec2);
});

ON.prototype.RayCast = (function(b, d, e, f) {
  return Ow(this.a, b.a, d.a, e.a, f);
});

ON.prototype.ComputeAABB = (function(b, d, e) {
  Pw(this.a, b.a, d.a, e);
});

ON.prototype.GetVertexCount = Kb(1);

ON.prototype.GetChildCount = (function() {
  return Qw(this.a);
});

ON.prototype.TestPoint = (function(b, d) {
  return Rw(this.a, b.a, d.a);
});

function ON() {
  this.a = Sw();
  ON.prototype.b[this.a] = this;
  this.d = ON;
}

ON.prototype.b = {};

Module.b2CircleShape = ON;

ON.prototype.GetSupport = Kb(0);

ON.prototype.set_m_p = (function(b) {
  ow(this.a, b.a);
});

ON.prototype.get_m_p = (function() {
  return KN(pw(this.a), Module.b2Vec2);
});

function PN() {
  ea("b2Draw is abstract!");
}

PN.prototype.b = {};

Module.b2Draw = PN;

PN.prototype.AppendFlags = (function(b) {
  qw(this.a, b);
});

PN.prototype.DrawTransform = (function(b) {
  Uw(this.a, b.a);
});

PN.prototype.ClearFlags = (function(b) {
  rw(this.a, b);
});

PN.prototype.DrawPolygon = (function(b, d, e) {
  Vw(this.a, b.a, d, e.a);
});

PN.prototype.DrawSolidCircle = (function(b, d, e, f) {
  Ww(this.a, b.a, d, e.a, f.a);
});

PN.prototype.DrawSolidPolygon = (function(b, d, e) {
  Xw(this.a, b.a, d, e.a);
});

PN.prototype.DrawCircle = (function(b, d, e) {
  Yw(this.a, b.a, d, e.a);
});

PN.prototype.SetFlags = (function(b) {
  sw(this.a, b);
});

PN.prototype.DrawSegment = (function(b, d, e) {
  Zw(this.a, b.a, d.a, e.a);
});

PN.prototype.GetFlags = (function() {
  return tw(this.a);
});

function QN() {
  ea("b2Joint is abstract!");
}

QN.prototype.b = {};

Module.b2Joint = QN;

QN.prototype.GetNext = (function() {
  return KN(uw(this.a), Module.b2Joint);
});

QN.prototype.GetBodyA = (function() {
  return KN(vw(this.a), Module.b2Body);
});

QN.prototype.GetBodyB = (function() {
  return KN(ww(this.a), Module.b2Body);
});

QN.prototype.GetReactionTorque = (function(b) {
  return $w(this.a, b);
});

QN.prototype.GetAnchorA = (function() {
  return KN(ax(this.a), Module.b2Vec2);
});

QN.prototype.GetUserData = (function() {
  return xw(this.a);
});

QN.prototype.GetType = (function() {
  return yw(this.a);
});

QN.prototype.SetUserData = (function(b) {
  zw(this.a, b);
});

QN.prototype.GetCollideConnected = (function() {
  return Aw(this.a);
});

QN.prototype.Dump = (function() {
  dx(this.a);
});

QN.prototype.GetAnchorB = (function() {
  return KN(ex(this.a), Module.b2Vec2);
});

QN.prototype.GetReactionForce = (function(b) {
  return KN(hx(this.a, b), Module.b2Vec2);
});

QN.prototype.IsActive = (function() {
  return Bw(this.a);
});

function RN() {
  ea("b2RayCastCallback is abstract!");
}

RN.prototype.b = {};

Module.b2RayCastCallback = RN;

RN.prototype.ReportFixture = (function(b, d, e, f) {
  return kx(this.a, b.a, d.a, e.a, f);
});

SN.prototype.__destroy__ = (function() {
  lx(this.a);
});

function SN() {
  this.a = mx();
  SN.prototype.b[this.a] = this;
  this.d = SN;
}

SN.prototype.b = {};

Module.b2DynamicTree = SN;

SN.prototype.GetFatAABB = (function(b) {
  return KN(nx(this.a, b), Module.b2AABB);
});

SN.prototype.GetUserData = (function(b) {
  return ox(this.a, b);
});

SN.prototype.GetMaxBalance = (function() {
  return px(this.a);
});

SN.prototype.GetHeight = (function() {
  return Cw(this.a);
});

SN.prototype.GetAreaRatio = (function() {
  return Dw(this.a);
});

SN.prototype.RebuildBottomUp = (function() {
  Pl(this.a);
});

SN.prototype.CreateProxy = (function(b, d) {
  return qx(this.a, b.a, d);
});

SN.prototype.MoveProxy = (function(b, d, e) {
  return Kl(this.a, b, d.a, e.a);
});

SN.prototype.Validate = (function() {
  Ol(this.a);
});

SN.prototype.DestroyProxy = (function(b) {
  rl(this.a, b);
});

function TN() {
  this.a = EA();
  TN.prototype.b[this.a] = this;
  this.d = TN;
}

TN.prototype.b = {};

Module.b2Timer = TN;

TN.prototype.Reset = (function() {
  gE(this.a);
});

TN.prototype.__destroy__ = (function() {
  hE(this.a);
});

TN.prototype.GetMilliseconds = (function() {
  return iE(this.a);
});

UN.prototype.__destroy__ = (function() {
  jE(this.a);
});

UN.prototype.GetType = (function() {
  return Ew(this.a);
});

UN.prototype.CreateChain = (function(b, d) {
  kE(this.a, b.a, d);
});

UN.prototype.set_m_radius = (function(b) {
  Fw(this.a, b);
});

UN.prototype.get_m_radius = (function() {
  return lE(this.a);
});

UN.prototype.get_m_vertices = (function() {
  return KN(mE(this.a), Module.b2Vec2);
});

UN.prototype.ComputeMass = (function(b, d) {
  aF(this.a, b.a, d);
});

UN.prototype.Clone = (function(b) {
  return KN(bF(this.a, b.a), Module.b2Shape);
});

UN.prototype.get_m_count = (function() {
  return nE(this.a);
});

UN.prototype.GetChildEdge = (function(b, d) {
  Fm(this.a, b.a, d);
});

function UN() {
  this.a = cF();
  UN.prototype.b[this.a] = this;
  this.d = UN;
}

UN.prototype.b = {};

Module.b2ChainShape = UN;

UN.prototype.ComputeAABB = (function(b, d, e) {
  eF(this.a, b.a, d.a, e);
});

UN.prototype.RayCast = (function(b, d, e, f) {
  return fF(this.a, b.a, d.a, e.a, f);
});

UN.prototype.GetChildCount = (function() {
  return gF(this.a);
});

UN.prototype.TestPoint = (function(b, d) {
  return hF(this.a, b.a, d.a);
});

UN.prototype.SetPrevVertex = (function(b) {
  oE(this.a, b.a);
});

UN.prototype.CreateLoop = (function(b, d) {
  iF(this.a, b.a, d);
});

UN.prototype.set_m_vertices = (function(b) {
  pE(this.a, b.a);
});

UN.prototype.SetNextVertex = (function(b) {
  qE(this.a, b.a);
});

UN.prototype.set_m_count = (function(b) {
  rE(this.a, b);
});

function VN() {
  ea("b2QueryCallback is abstract!");
}

VN.prototype.b = {};

Module.b2QueryCallback = VN;

VN.prototype.ReportFixture = (function(b) {
  return jF(this.a, b.a);
});

WN.prototype.__destroy__ = (function() {
  kF(this.a);
});

WN.prototype.Clear = (function() {
  lF(this.a);
});

WN.prototype.Free = (function(b, d) {
  mF(this.a, b, d);
});

WN.prototype.Allocate = (function(b) {
  return an(this.a, b);
});

function WN() {
  this.a = nF();
  WN.prototype.b[this.a] = this;
  this.d = WN;
}

WN.prototype.b = {};

Module.b2BlockAllocator = WN;

XN.prototype.__destroy__ = (function() {
  oF(this.a);
});

XN.prototype.Set = (function(b, d) {
  Zm(this.a, b.a, d);
});

XN.prototype.ComputeMass = (function(b, d) {
  pF(this.a, b.a, d);
});

XN.prototype.set_m_radius = (function(b) {
  sE(this.a, b);
});

XN.prototype.get_m_radius = (function() {
  return tE(this.a);
});

XN.prototype.Clone = (function(b) {
  return KN(qF(this.a, b.a), Module.b2Shape);
});

XN.prototype.GetVertex = (function(b) {
  return KN(uE(this.a, b), Module.b2Vec2);
});

XN.prototype.RayCast = (function(b, d, e, f) {
  return rF(this.a, b.a, d.a, e.a, f);
});

XN.prototype.SetAsBox = (function(b, d, e, f) {
  e === ra ? vE(this.a, b, d) : Ym(this.a, b, d, e.a, f);
});

XN.prototype.set_m_centroid = (function(b) {
  wE(this.a, b.a);
});

XN.prototype.ComputeAABB = (function(b, d, e) {
  sF(this.a, b.a, d.a, e);
});

XN.prototype.set_m_vertexCount = (function(b) {
  xE(this.a, b);
});

XN.prototype.GetVertexCount = (function() {
  return yE(this.a);
});

XN.prototype.GetChildCount = (function() {
  return tF(this.a);
});

XN.prototype.TestPoint = (function(b, d) {
  return uF(this.a, b.a, d.a);
});

XN.prototype.GetType = (function() {
  return zE(this.a);
});

function XN() {
  this.a = vF();
  XN.prototype.b[this.a] = this;
  this.d = XN;
}

XN.prototype.b = {};

Module.b2PolygonShape = XN;

XN.prototype.get_m_vertexCount = (function() {
  return AE(this.a);
});

XN.prototype.get_m_centroid = (function() {
  return KN(BE(this.a), Module.b2Vec2);
});

YN.prototype.__destroy__ = (function() {
  xF(this.a);
});

YN.prototype.Set = (function(b, d) {
  CE(this.a, b.a, d.a);
});

YN.prototype.ComputeMass = (function(b, d) {
  yF(this.a, b.a, d);
});

YN.prototype.set_m_radius = (function(b) {
  DE(this.a, b);
});

YN.prototype.get_m_radius = (function() {
  return EE(this.a);
});

YN.prototype.Clone = (function(b) {
  return KN(zF(this.a, b.a), Module.b2Shape);
});

YN.prototype.GetType = (function() {
  return FE(this.a);
});

YN.prototype.RayCast = (function(b, d, e, f) {
  return AF(this.a, b.a, d.a, e.a, f);
});

YN.prototype.ComputeAABB = (function(b, d, e) {
  BF(this.a, b.a, d.a, e);
});

YN.prototype.GetChildCount = (function() {
  return CF(this.a);
});

YN.prototype.TestPoint = (function(b, d) {
  return DF(this.a, b.a, d.a);
});

function YN() {
  this.a = EF();
  YN.prototype.b[this.a] = this;
  this.d = YN;
}

YN.prototype.b = {};

Module.b2EdgeShape = YN;

function ZN() {
  ea("b2Contact is abstract!");
}

ZN.prototype.b = {};

Module.b2Contact = ZN;

ZN.prototype.GetNext = (function() {
  return KN(GE(this.a), Module.b2Contact);
});

ZN.prototype.SetEnabled = (function(b) {
  HE(this.a, b);
});

ZN.prototype.GetWorldManifold = (function(b) {
  GF(this.a, b.a);
});

ZN.prototype.GetRestitution = (function() {
  return IE(this.a);
});

ZN.prototype.ResetFriction = (function() {
  HF(this.a);
});

ZN.prototype.GetFriction = (function() {
  return JE(this.a);
});

ZN.prototype.IsTouching = (function() {
  return KE(this.a);
});

ZN.prototype.IsEnabled = (function() {
  return LE(this.a);
});

ZN.prototype.GetFixtureB = (function() {
  return KN(ME(this.a), Module.b2Fixture);
});

ZN.prototype.SetFriction = (function(b) {
  NE(this.a, b);
});

ZN.prototype.GetFixtureA = (function() {
  return KN(OE(this.a), Module.b2Fixture);
});

ZN.prototype.GetChildIndexA = (function() {
  return PE(this.a);
});

ZN.prototype.GetChildIndexB = (function() {
  return QE(this.a);
});

ZN.prototype.Evaluate = (function(b, d, e) {
  IF(this.a, b.a, d.a, e.a);
});

ZN.prototype.SetRestitution = (function(b) {
  RE(this.a, b);
});

ZN.prototype.GetManifold = (function() {
  return KN(SE(this.a), Module.b2Manifold);
});

ZN.prototype.ResetRestitution = (function() {
  TE(this.a);
});

function $N() {
  ea("b2Shape is abstract!");
}

$N.prototype.b = {};

Module.b2Shape = $N;

$N.prototype.get_m_radius = (function() {
  return UE(this.a);
});

$N.prototype.ComputeMass = (function(b, d) {
  JF(this.a, b.a, d);
});

$N.prototype.set_m_radius = (function(b) {
  VE(this.a, b);
});

$N.prototype.Clone = (function(b) {
  return KN(KF(this.a, b.a), Module.b2Shape);
});

$N.prototype.GetType = (function() {
  return WE(this.a);
});

$N.prototype.RayCast = (function(b, d, e, f) {
  return LF(this.a, b.a, d.a, e.a, f);
});

$N.prototype.ComputeAABB = (function(b, d, e) {
  MF(this.a, b.a, d.a, e);
});

$N.prototype.GetChildCount = (function() {
  return NF(this.a);
});

$N.prototype.TestPoint = (function(b, d) {
  return OF(this.a, b.a, d.a);
});

function aO() {
  ea("b2Body is abstract!");
}

aO.prototype.b = {};

Module.b2Body = aO;

aO.prototype.GetAngle = (function() {
  return XE(this.a);
});

aO.prototype.GetUserData = (function() {
  return YE(this.a);
});

aO.prototype.IsSleepingAllowed = (function() {
  return ZE(this.a);
});

aO.prototype.SetAngularDamping = (function(b) {
  $E(this.a, b);
});

aO.prototype.SetActive = (function(b) {
  $o(this.a, b);
});

aO.prototype.SetGravityScale = (function(b) {
  PF(this.a, b);
});

aO.prototype.SetUserData = (function(b) {
  QF(this.a, b);
});

aO.prototype.GetAngularVelocity = (function() {
  return RF(this.a);
});

aO.prototype.GetFixtureList = (function() {
  return KN(SF(this.a), Module.b2Fixture);
});

aO.prototype.ApplyForce = (function(b, d) {
  TF(this.a, b.a, d.a);
});

aO.prototype.GetLocalPoint = (function(b) {
  return KN(xG(this.a, b.a), Module.b2Vec2);
});

aO.prototype.SetLinearVelocity = (function(b) {
  UF(this.a, b.a);
});

aO.prototype.GetJointList = (function() {
  return KN(VF(this.a), Module.b2JointEdge);
});

aO.prototype.GetLinearVelocity = (function() {
  return KN(AG(this.a), Module.b2Vec2);
});

aO.prototype.GetNext = (function() {
  return KN(WF(this.a), Module.b2Body);
});

aO.prototype.SetSleepingAllowed = (function(b) {
  XF(this.a, b);
});

aO.prototype.SetTransform = (function(b, d) {
  Yo(this.a, b.a, d);
});

aO.prototype.GetMass = (function() {
  return YF(this.a);
});

aO.prototype.SetAngularVelocity = (function(b) {
  ZF(this.a, b);
});

aO.prototype.GetMassData = (function(b) {
  $F(this.a, b.a);
});

aO.prototype.GetLinearVelocityFromWorldPoint = (function(b) {
  return KN(DG(this.a, b.a), Module.b2Vec2);
});

aO.prototype.ResetMassData = (function() {
  Qo(this.a);
});

aO.prototype.ApplyForceToCenter = (function(b) {
  aG(this.a, b.a);
});

aO.prototype.ApplyTorque = (function(b) {
  bG(this.a, b);
});

aO.prototype.IsAwake = (function() {
  return cG(this.a);
});

aO.prototype.SetType = (function(b) {
  Po(this.a, b);
});

aO.prototype.CreateFixture = (function(b, d) {
  return d === ra ? KN(So(this.a, b.a), Module.b2Fixture) : KN(GG(this.a, b.a, d), Module.b2Fixture);
});

aO.prototype.SetMassData = (function(b) {
  Xo(this.a, b.a);
});

aO.prototype.GetTransform = (function() {
  return KN(dG(this.a), Module.b2Transform);
});

aO.prototype.GetWorldCenter = (function() {
  return KN(eG(this.a), Module.b2Vec2);
});

aO.prototype.GetAngularDamping = (function() {
  return fG(this.a);
});

aO.prototype.ApplyLinearImpulse = (function(b, d) {
  gG(this.a, b.a, d.a);
});

aO.prototype.IsFixedRotation = (function() {
  return hG(this.a);
});

aO.prototype.GetLocalCenter = (function() {
  return KN(iG(this.a), Module.b2Vec2);
});

aO.prototype.GetWorldVector = (function(b) {
  return KN(HG(this.a, b.a), Module.b2Vec2);
});

aO.prototype.GetLinearVelocityFromLocalPoint = (function(b) {
  return KN(KG(this.a, b.a), Module.b2Vec2);
});

aO.prototype.GetContactList = (function() {
  return KN(jG(this.a), Module.b2ContactEdge);
});

aO.prototype.GetWorldPoint = (function(b) {
  return KN(NG(this.a, b.a), Module.b2Vec2);
});

aO.prototype.SetAwake = (function(b) {
  kG(this.a, b);
});

aO.prototype.GetLinearDamping = (function() {
  return lG(this.a);
});

aO.prototype.IsBullet = (function() {
  return mG(this.a);
});

aO.prototype.GetWorld = (function() {
  return KN(nG(this.a), Module.b2World);
});

aO.prototype.GetLocalVector = (function(b) {
  return KN(QG(this.a, b.a), Module.b2Vec2);
});

aO.prototype.SetLinearDamping = (function(b) {
  oG(this.a, b);
});

aO.prototype.Dump = (function() {
  ap(this.a);
});

aO.prototype.SetBullet = (function(b) {
  pG(this.a, b);
});

aO.prototype.GetType = (function() {
  return qG(this.a);
});

aO.prototype.GetGravityScale = (function() {
  return rG(this.a);
});

aO.prototype.DestroyFixture = (function(b) {
  Uo(this.a, b.a);
});

aO.prototype.GetInertia = (function() {
  return sG(this.a);
});

aO.prototype.IsActive = (function() {
  return tG(this.a);
});

aO.prototype.SetFixedRotation = (function(b) {
  TG(this.a, b);
});

aO.prototype.ApplyAngularImpulse = (function(b) {
  uG(this.a, b);
});

aO.prototype.GetPosition = (function() {
  return KN(vG(this.a), Module.b2Vec2);
});

bO.prototype.GetMaxAllocation = (function() {
  return wG(this.a);
});

bO.prototype.__destroy__ = (function() {
  UG(this.a);
});

function bO() {
  this.a = cI();
  bO.prototype.b[this.a] = this;
  this.d = bO;
}

bO.prototype.b = {};

Module.b2StackAllocator = bO;

bO.prototype.Allocate = (function(b) {
  return dI(this.a, b);
});

bO.prototype.Free = (function(b) {
  ho(this.a, b);
});

function cO() {
  ea("b2DestructionListener is abstract!");
}

cO.prototype.b = {};

Module.b2DestructionListener = cO;

cO.prototype.SayGoodbye = (function(b) {
  eI(this.a, b.a);
});

dO.prototype.__destroy__ = (function() {
  fI(this.a);
});

dO.prototype.set_maskBits = (function(b) {
  VG(this.a, b);
});

dO.prototype.set_categoryBits = (function(b) {
  WG(this.a, b);
});

dO.prototype.get_groupIndex = (function() {
  return XG(this.a);
});

dO.prototype.set_groupIndex = (function(b) {
  YG(this.a, b);
});

dO.prototype.get_maskBits = (function() {
  return ZG(this.a);
});

function dO() {
  this.a = gI();
  dO.prototype.b[this.a] = this;
  this.d = dO;
}

dO.prototype.b = {};

Module.b2Filter = dO;

dO.prototype.get_categoryBits = (function() {
  return $G(this.a);
});

eO.prototype.set_localAnchorA = (function(b) {
  aH(this.a, b.a);
});

eO.prototype.__destroy__ = (function() {
  hI(this.a);
});

eO.prototype.set_localAnchorB = (function(b) {
  bH(this.a, b.a);
});

eO.prototype.get_maxForce = (function() {
  return cH(this.a);
});

function eO() {
  this.a = iI();
  eO.prototype.b[this.a] = this;
  this.d = eO;
}

eO.prototype.b = {};

Module.b2FrictionJointDef = eO;

eO.prototype.get_localAnchorA = (function() {
  return KN(dH(this.a), Module.b2Vec2);
});

eO.prototype.set_maxForce = (function(b) {
  eH(this.a, b);
});

eO.prototype.get_localAnchorB = (function() {
  return KN(fH(this.a), Module.b2Vec2);
});

eO.prototype.set_maxTorque = (function(b) {
  gH(this.a, b);
});

eO.prototype.get_maxTorque = (function() {
  return hH(this.a);
});

eO.prototype.Initialize = (function(b, d, e) {
  iH(this.a, b.a, d.a, e.a);
});

fO.prototype.get_linearDamping = (function() {
  return jH(this.a);
});

fO.prototype.get_awake = (function() {
  return kH(this.a);
});

fO.prototype.get_type = (function() {
  return lH(this.a);
});

fO.prototype.get_allowSleep = (function() {
  return mH(this.a);
});

fO.prototype.set_position = (function(b) {
  nH(this.a, b.a);
});

fO.prototype.set_linearVelocity = (function(b) {
  oH(this.a, b.a);
});

function fO() {
  this.a = jI();
  fO.prototype.b[this.a] = this;
  this.d = fO;
}

fO.prototype.b = {};

Module.b2BodyDef = fO;

fO.prototype.get_bullet = (function() {
  return pH(this.a);
});

fO.prototype.get_userData = (function() {
  return qH(this.a);
});

fO.prototype.set_angularDamping = (function(b) {
  rH(this.a, b);
});

fO.prototype.set_fixedRotation = (function(b) {
  sH(this.a, b);
});

fO.prototype.set_allowSleep = (function(b) {
  tH(this.a, b);
});

fO.prototype.get_gravityScale = (function() {
  return uH(this.a);
});

fO.prototype.set_angularVelocity = (function(b) {
  vH(this.a, b);
});

fO.prototype.set_userData = (function(b) {
  wH(this.a, b);
});

fO.prototype.get_position = (function() {
  return KN(this.a + 4 | 0, Module.b2Vec2);
});

fO.prototype.__destroy__ = (function() {
  kI(this.a);
});

fO.prototype.set_type = (function(b) {
  xH(this.a, b);
});

fO.prototype.set_gravityScale = (function(b) {
  yH(this.a, b);
});

fO.prototype.get_angularDamping = (function() {
  return zH(this.a);
});

fO.prototype.set_bullet = (function(b) {
  AH(this.a, b);
});

fO.prototype.set_active = (function(b) {
  BH(this.a, b);
});

fO.prototype.set_angle = (function(b) {
  CH(this.a, b);
});

fO.prototype.get_angle = (function() {
  return DH(this.a);
});

fO.prototype.get_angularVelocity = (function() {
  return EH(this.a);
});

fO.prototype.get_linearVelocity = (function() {
  return KN(FH(this.a), Module.b2Vec2);
});

fO.prototype.get_active = (function() {
  return GH(this.a);
});

fO.prototype.set_linearDamping = (function(b) {
  HH(this.a, b);
});

fO.prototype.get_fixedRotation = (function() {
  return IH(this.a);
});

fO.prototype.set_awake = (function(b) {
  JH(this.a, b);
});

gO.prototype.Normalize = (function() {
  return lI(this.a);
});

gO.prototype.set_x = (function(b) {
  KH(this.a, b);
});

function gO(b, d) {
  this.a = b === ra ? mI() : nI(b, d);
  gO.prototype.b[this.a] = this;
  this.d = gO;
}

gO.prototype.b = {};

Module.b2Vec2 = gO;

gO.prototype.Set = (function(b, d) {
  LH(this.a, b, d);
});

gO.prototype.get_x = (function() {
  return MH(this.a);
});

gO.prototype.get_y = (function() {
  return NH(this.a);
});

gO.prototype.set_y = (function(b) {
  OH(this.a, b);
});

gO.prototype.IsValid = (function() {
  return PH(this.a);
});

gO.prototype.Skew = (function() {
  return KN(oI(this.a), Module.b2Vec2);
});

gO.prototype.LengthSquared = (function() {
  return QH(this.a);
});

gO.prototype.op_add = (function(b) {
  RH(this.a, b.a);
});

gO.prototype.SetZero = (function() {
  SH(this.a);
});

gO.prototype.Length = (function() {
  return rI(this.a);
});

gO.prototype.__destroy__ = (function() {
  sI(this.a);
});

gO.prototype.op_mul = (function(b) {
  TH(this.a, b);
});

gO.prototype.op_sub = (function() {
  return KN(tI(this.a), Module.b2Vec2);
});

hO.prototype.__destroy__ = (function() {
  wI(this.a);
});

hO.prototype.set_z = (function(b) {
  UH(this.a, b);
});

hO.prototype.Set = (function(b, d, e) {
  VH(this.a, b, d, e);
});

hO.prototype.get_z = (function() {
  return WH(this.a);
});

hO.prototype.op_add = (function(b) {
  XH(this.a, b.a);
});

hO.prototype.SetZero = (function() {
  YH(this.a);
});

function hO(b, d, e) {
  this.a = b === ra ? xI() : yI(b, d, e);
  hO.prototype.b[this.a] = this;
  this.d = hO;
}

hO.prototype.b = {};

Module.b2Vec3 = hO;

hO.prototype.op_mul = (function(b) {
  ZH(this.a, b);
});

hO.prototype.op_sub = (function() {
  return KN(zI(this.a), Module.b2Vec3);
});

iO.prototype.get_m_radius = (function() {
  return $H(this.a);
});

iO.prototype.Set = (function(b, d) {
  xi(this.a, b.a, d);
});

function iO() {
  this.a = CI();
  iO.prototype.b[this.a] = this;
  this.d = iO;
}

iO.prototype.b = {};

Module.b2DistanceProxy = iO;

iO.prototype.set_m_radius = (function(b) {
  aI(this.a, b);
});

iO.prototype.__destroy__ = (function() {
  DI(this.a);
});

iO.prototype.get_m_vertices = (function() {
  return bI(this.a);
});

iO.prototype.GetSupportVertex = (function(b) {
  return KN(EI(this.a, b.a), Module.b2Vec2);
});

iO.prototype.get_m_count = (function() {
  return FI(this.a);
});

iO.prototype.GetVertexCount = (function() {
  return GI(this.a);
});

iO.prototype.GetVertex = (function(b) {
  return KN(RJ(this.a, b), Module.b2Vec2);
});

iO.prototype.GetSupport = (function(b) {
  return HI(this.a, b.a);
});

iO.prototype.set_m_vertices = (function(b) {
  II(this.a, b.a);
});

iO.prototype.set_m_count = (function(b) {
  JI(this.a, b);
});

jO.prototype.__destroy__ = (function() {
  SJ(this.a);
});

jO.prototype.get_isSensor = (function() {
  return KI(this.a);
});

jO.prototype.set_userData = (function(b) {
  LI(this.a, b);
});

jO.prototype.set_shape = (function(b) {
  MI(this.a, b.a);
});

jO.prototype.get_density = (function() {
  return NI(this.a);
});

jO.prototype.get_shape = (function() {
  return OI(this.a);
});

function jO() {
  this.a = TJ();
  jO.prototype.b[this.a] = this;
  this.d = jO;
}

jO.prototype.b = {};

Module.b2FixtureDef = jO;

jO.prototype.set_density = (function(b) {
  PI(this.a, b);
});

jO.prototype.set_restitution = (function(b) {
  QI(this.a, b);
});

jO.prototype.get_restitution = (function() {
  return RI(this.a);
});

jO.prototype.set_isSensor = (function(b) {
  SI(this.a, b);
});

jO.prototype.get_filter = (function() {
  return KN(TI(this.a), Module.b2Filter);
});

jO.prototype.get_friction = (function() {
  return UI(this.a);
});

jO.prototype.set_friction = (function(b) {
  VI(this.a, b);
});

jO.prototype.get_userData = (function() {
  return WI(this.a);
});

jO.prototype.set_filter = (function(b) {
  UJ(this.a, b.a);
});

kO.prototype.set_localAnchorA = (function(b) {
  XI(this.a, b.a);
});

kO.prototype.set_localAnchorB = (function(b) {
  YI(this.a, b.a);
});

kO.prototype.get_motorSpeed = (function() {
  return ZI(this.a);
});

kO.prototype.get_enableMotor = (function() {
  return $I(this.a);
});

kO.prototype.get_referenceAngle = (function() {
  return aJ(this.a);
});

kO.prototype.set_enableLimit = (function(b) {
  bJ(this.a, b);
});

kO.prototype.set_motorSpeed = (function(b) {
  cJ(this.a, b);
});

kO.prototype.get_localAxisA = (function() {
  return KN(dJ(this.a), Module.b2Vec2);
});

kO.prototype.set_upperTranslation = (function(b) {
  eJ(this.a, b);
});

function kO() {
  this.a = VJ();
  kO.prototype.b[this.a] = this;
  this.d = kO;
}

kO.prototype.b = {};

Module.b2PrismaticJointDef = kO;

kO.prototype.Initialize = (function(b, d, e, f) {
  fJ(this.a, b.a, d.a, e.a, f.a);
});

kO.prototype.set_lowerTranslation = (function(b) {
  gJ(this.a, b);
});

kO.prototype.get_upperTranslation = (function() {
  return hJ(this.a);
});

kO.prototype.get_enableLimit = (function() {
  return iJ(this.a);
});

kO.prototype.set_referenceAngle = (function(b) {
  jJ(this.a, b);
});

kO.prototype.get_localAnchorA = (function() {
  return KN(kJ(this.a), Module.b2Vec2);
});

kO.prototype.get_localAnchorB = (function() {
  return KN(lJ(this.a), Module.b2Vec2);
});

kO.prototype.__destroy__ = (function() {
  WJ(this.a);
});

kO.prototype.get_maxMotorForce = (function() {
  return mJ(this.a);
});

kO.prototype.set_maxMotorForce = (function(b) {
  nJ(this.a, b);
});

kO.prototype.set_enableMotor = (function(b) {
  oJ(this.a, b);
});

kO.prototype.get_lowerTranslation = (function() {
  return pJ(this.a);
});

kO.prototype.set_localAxisA = (function(b) {
  qJ(this.a, b.a);
});

lO.prototype.__destroy__ = (function() {
  XJ(this.a);
});

lO.prototype.Set = (function(b) {
  YJ(this.a, b);
});

lO.prototype.GetAngle = (function() {
  return ZJ(this.a);
});

lO.prototype.GetYAxis = (function() {
  return KN(aK(this.a), Module.b2Vec2);
});

lO.prototype.GetXAxis = (function() {
  return KN(dK(this.a), Module.b2Vec2);
});

lO.prototype.set_c = (function(b) {
  rJ(this.a, b);
});

lO.prototype.SetIdentity = (function() {
  sJ(this.a);
});

function lO(b) {
  this.a = b === ra ? gK() : hK(b);
  lO.prototype.b[this.a] = this;
  this.d = lO;
}

lO.prototype.b = {};

Module.b2Rot = lO;

lO.prototype.get_c = (function() {
  return tJ(this.a);
});

mO.prototype.set_localAnchorA = (function(b) {
  uJ(this.a, b.a);
});

mO.prototype.set_motorSpeed = (function(b) {
  vJ(this.a, b);
});

mO.prototype.get_localAxisA = (function() {
  return KN(wJ(this.a), Module.b2Vec2);
});

mO.prototype.set_localAnchorB = (function(b) {
  xJ(this.a, b.a);
});

mO.prototype.get_frequencyHz = (function() {
  return yJ(this.a);
});

mO.prototype.set_maxMotorTorque = (function(b) {
  zJ(this.a, b);
});

mO.prototype.get_enableMotor = (function() {
  return AJ(this.a);
});

mO.prototype.__destroy__ = (function() {
  iK(this.a);
});

mO.prototype.get_localAnchorA = (function() {
  return KN(BJ(this.a), Module.b2Vec2);
});

mO.prototype.get_maxMotorTorque = (function() {
  return CJ(this.a);
});

mO.prototype.get_localAnchorB = (function() {
  return KN(DJ(this.a), Module.b2Vec2);
});

mO.prototype.get_dampingRatio = (function() {
  return EJ(this.a);
});

mO.prototype.set_enableMotor = (function(b) {
  FJ(this.a, b);
});

mO.prototype.set_frequencyHz = (function(b) {
  GJ(this.a, b);
});

mO.prototype.Initialize = (function(b, d, e, f) {
  HJ(this.a, b.a, d.a, e.a, f.a);
});

mO.prototype.set_dampingRatio = (function(b) {
  IJ(this.a, b);
});

function mO() {
  this.a = jK();
  mO.prototype.b[this.a] = this;
  this.d = mO;
}

mO.prototype.b = {};

Module.b2WheelJointDef = mO;

mO.prototype.set_localAxisA = (function(b) {
  JJ(this.a, b.a);
});

mO.prototype.get_motorSpeed = (function() {
  return KJ(this.a);
});

nO.prototype.set_localAnchorA = (function(b) {
  LJ(this.a, b.a);
});

nO.prototype.get_lowerAngle = (function() {
  return MJ(this.a);
});

nO.prototype.set_upperAngle = (function(b) {
  NJ(this.a, b);
});

nO.prototype.set_localAnchorB = (function(b) {
  OJ(this.a, b.a);
});

nO.prototype.get_enableLimit = (function() {
  return PJ(this.a);
});

nO.prototype.set_lowerAngle = (function(b) {
  QJ(this.a, b);
});

nO.prototype.get_enableMotor = (function() {
  return kK(this.a);
});

nO.prototype.set_motorSpeed = (function(b) {
  lK(this.a, b);
});

nO.prototype.get_upperAngle = (function() {
  return mK(this.a);
});

nO.prototype.set_referenceAngle = (function(b) {
  nK(this.a, b);
});

nO.prototype.set_maxMotorTorque = (function(b) {
  oK(this.a, b);
});

nO.prototype.get_localAnchorA = (function() {
  return KN(pK(this.a), Module.b2Vec2);
});

nO.prototype.get_referenceAngle = (function() {
  return qK(this.a);
});

nO.prototype.get_localAnchorB = (function() {
  return KN(rK(this.a), Module.b2Vec2);
});

nO.prototype.set_enableLimit = (function(b) {
  sK(this.a, b);
});

nO.prototype.set_enableMotor = (function(b) {
  tK(this.a, b);
});

nO.prototype.__destroy__ = (function() {
  BL(this.a);
});

function nO() {
  this.a = CL();
  nO.prototype.b[this.a] = this;
  this.d = nO;
}

nO.prototype.b = {};

Module.b2RevoluteJointDef = nO;

nO.prototype.Initialize = (function(b, d, e) {
  uK(this.a, b.a, d.a, e.a);
});

nO.prototype.get_maxMotorTorque = (function() {
  return vK(this.a);
});

nO.prototype.get_motorSpeed = (function() {
  return wK(this.a);
});

oO.prototype.set_localAnchorA = (function(b) {
  xK(this.a, b.a);
});

oO.prototype.__destroy__ = (function() {
  DL(this.a);
});

oO.prototype.set_localAnchorB = (function(b) {
  yK(this.a, b.a);
});

oO.prototype.get_ratio = (function() {
  return zK(this.a);
});

oO.prototype.get_lengthB = (function() {
  return AK(this.a);
});

oO.prototype.get_lengthA = (function() {
  return BK(this.a);
});

oO.prototype.get_localAnchorA = (function() {
  return KN(CK(this.a), Module.b2Vec2);
});

oO.prototype.set_ratio = (function(b) {
  DK(this.a, b);
});

oO.prototype.get_localAnchorB = (function() {
  return KN(EK(this.a), Module.b2Vec2);
});

oO.prototype.get_groundAnchorB = (function() {
  return KN(FK(this.a), Module.b2Vec2);
});

oO.prototype.set_groundAnchorB = (function(b) {
  GK(this.a, b.a);
});

function oO() {
  this.a = EL();
  oO.prototype.b[this.a] = this;
  this.d = oO;
}

oO.prototype.b = {};

Module.b2PulleyJointDef = oO;

oO.prototype.set_groundAnchorA = (function(b) {
  HK(this.a, b.a);
});

oO.prototype.Initialize = (function(b, d, e, f, g, h, i) {
  Xr(this.a, b.a, d.a, e.a, f.a, g.a, h.a, i);
});

oO.prototype.set_lengthB = (function(b) {
  IK(this.a, b);
});

oO.prototype.set_lengthA = (function(b) {
  JK(this.a, b);
});

oO.prototype.get_groundAnchorA = (function() {
  return KN(KK(this.a), Module.b2Vec2);
});

hS.prototype.get_bodyA = (function() {
  return KN(LK(this.a), Module.b2Body);
});

hS.prototype.set_userData = (function(b) {
  MK(this.a, b);
});

hS.prototype.set_bodyA = (function(b) {
  NK(this.a, b.a);
});

hS.prototype.set_bodyB = (function(b) {
  OK(this.a, b.a);
});

hS.prototype.__destroy__ = (function() {
  FL(this.a);
});

hS.prototype.get_bodyB = (function() {
  return KN(PK(this.a), Module.b2Body);
});

hS.prototype.set_type = (function(b) {
  QK(this.a, b);
});

hS.prototype.get_collideConnected = (function() {
  return RK(this.a);
});

hS.prototype.get_type = (function() {
  return SK(this.a);
});

hS.prototype.set_collideConnected = (function(b) {
  TK(this.a, b);
});

function hS() {
  this.a = GL();
  hS.prototype.b[this.a] = this;
  this.d = hS;
}

hS.prototype.b = {};

Module.b2JointDef = hS;

hS.prototype.get_userData = (function() {
  return UK(this.a);
});

iS.prototype.__destroy__ = (function() {
  HL(this.a);
});

iS.prototype.Set = (function(b, d) {
  IL(this.a, b.a, d);
});

iS.prototype.set_p = (function(b) {
  VK(this.a, b.a);
});

iS.prototype.set_q = (function(b) {
  WK(this.a, b.a);
});

iS.prototype.get_p = (function() {
  return KN(this.a | 0, Module.b2Vec2);
});

iS.prototype.get_q = (function() {
  return KN(this.a + 8 | 0, Module.b2Rot);
});

function iS(b, d) {
  this.a = b === ra ? JL() : KL(b.a, d.a);
  iS.prototype.b[this.a] = this;
  this.d = iS;
}

iS.prototype.b = {};

Module.b2Transform = iS;

iS.prototype.SetIdentity = (function() {
  XK(this.a);
});

jS.prototype.__destroy__ = (function() {
  LL(this.a);
});

jS.prototype.set_b = (function(b) {
  YK(this.a, b);
});

jS.prototype.Set = (function(b, d, e) {
  ZK(this.a, b, d, e);
});

jS.prototype.get_b = (function() {
  return $K(this.a);
});

function jS(b, d, e) {
  this.a = b === ra ? ML() : NL(b, d, e);
  jS.prototype.b[this.a] = this;
  this.d = jS;
}

jS.prototype.b = {};

Module.b2Color = jS;

kS.prototype.set_localAnchorA = (function(b) {
  aL(this.a, b.a);
});

kS.prototype.__destroy__ = (function() {
  OL(this.a);
});

kS.prototype.get_frequencyHz = (function() {
  return bL(this.a);
});

kS.prototype.set_localAnchorB = (function(b) {
  cL(this.a, b.a);
});

kS.prototype.set_dampingRatio = (function(b) {
  dL(this.a, b);
});

kS.prototype.set_referenceAngle = (function(b) {
  eL(this.a, b);
});

kS.prototype.get_localAnchorA = (function() {
  return KN(fL(this.a), Module.b2Vec2);
});

kS.prototype.get_referenceAngle = (function() {
  return gL(this.a);
});

kS.prototype.get_localAnchorB = (function() {
  return KN(hL(this.a), Module.b2Vec2);
});

kS.prototype.get_dampingRatio = (function() {
  return iL(this.a);
});

kS.prototype.set_frequencyHz = (function(b) {
  jL(this.a, b);
});

kS.prototype.Initialize = (function(b, d, e) {
  kL(this.a, b.a, d.a, e.a);
});

function kS() {
  this.a = PL();
  kS.prototype.b[this.a] = this;
  this.d = kS;
}

kS.prototype.b = {};

Module.b2WeldJointDef = kS;

lS.prototype.__destroy__ = (function() {
  QL(this.a);
});

lS.prototype.get_frequencyHz = (function() {
  return lL(this.a);
});

lS.prototype.set_dampingRatio = (function(b) {
  mL(this.a, b);
});

function lS() {
  this.a = RL();
  lS.prototype.b[this.a] = this;
  this.d = lS;
}

lS.prototype.b = {};

Module.b2MouseJointDef = lS;

lS.prototype.get_maxForce = (function() {
  return nL(this.a);
});

lS.prototype.set_target = (function(b) {
  oL(this.a, b.a);
});

lS.prototype.set_maxForce = (function(b) {
  pL(this.a, b);
});

lS.prototype.get_target = (function() {
  return KN(qL(this.a), Module.b2Vec2);
});

lS.prototype.set_frequencyHz = (function(b) {
  rL(this.a, b);
});

lS.prototype.get_dampingRatio = (function() {
  return sL(this.a);
});

mS.prototype.set_localAnchorA = (function(b) {
  tL(this.a, b.a);
});

mS.prototype.get_length = (function() {
  return uL(this.a);
});

mS.prototype.get_frequencyHz = (function() {
  return vL(this.a);
});

mS.prototype.set_localAnchorB = (function(b) {
  wL(this.a, b.a);
});

mS.prototype.set_dampingRatio = (function(b) {
  xL(this.a, b);
});

mS.prototype.__destroy__ = (function() {
  SL(this.a);
});

mS.prototype.get_localAnchorA = (function() {
  return KN(yL(this.a), Module.b2Vec2);
});

mS.prototype.get_localAnchorB = (function() {
  return KN(zL(this.a), Module.b2Vec2);
});

mS.prototype.get_dampingRatio = (function() {
  return AL(this.a);
});

function mS() {
  this.a = gM();
  mS.prototype.b[this.a] = this;
  this.d = mS;
}

mS.prototype.b = {};

Module.b2DistanceJointDef = mS;

mS.prototype.set_length = (function(b) {
  TL(this.a, b);
});

mS.prototype.set_frequencyHz = (function(b) {
  UL(this.a, b);
});

mS.prototype.Initialize = (function(b, d, e, f) {
  hM(this.a, b.a, d.a, e.a, f.a);
});

nS.prototype.__destroy__ = (function() {
  iM(this.a);
});

nS.prototype.set_joint1 = (function(b) {
  VL(this.a, b.a);
});

nS.prototype.set_joint2 = (function(b) {
  WL(this.a, b.a);
});

nS.prototype.set_ratio = (function(b) {
  XL(this.a, b);
});

nS.prototype.get_joint1 = (function() {
  return KN(YL(this.a), Module.b2Joint);
});

nS.prototype.get_joint2 = (function() {
  return KN(ZL(this.a), Module.b2Joint);
});

function nS() {
  this.a = jM();
  nS.prototype.b[this.a] = this;
  this.d = nS;
}

nS.prototype.b = {};

Module.b2GearJointDef = nS;

nS.prototype.get_ratio = (function() {
  return $L(this.a);
});

oS.prototype.set_localAnchorA = (function(b) {
  aM(this.a, b.a);
});

oS.prototype.__destroy__ = (function() {
  kM(this.a);
});

oS.prototype.get_maxLength = (function() {
  return bM(this.a);
});

oS.prototype.set_localAnchorB = (function(b) {
  cM(this.a, b.a);
});

oS.prototype.get_localAnchorA = (function() {
  return KN(dM(this.a), Module.b2Vec2);
});

oS.prototype.get_localAnchorB = (function() {
  return KN(eM(this.a), Module.b2Vec2);
});

function oS() {
  this.a = lM();
  oS.prototype.b[this.a] = this;
  this.d = oS;
}

oS.prototype.b = {};

Module.b2RopeJointDef = oS;

oS.prototype.set_maxLength = (function(b) {
  fM(this.a, b);
});

this.Box2D = Module;

Module.b2_staticBody = 0;

Module.b2_kinematicBody = 1;

Module.b2_dynamicBody = 2;

function clock() {
  return Date.now();
}

var DEBUG = 0;

var WARMUP = 80;

var FRAMES = 80;

var ITERATIONS = WARMUP + FRAMES;

var e_count = 40;

function bench() {
  var gravity = new Box2D.b2Vec2(0, -10);
  var world = new Box2D.b2World(gravity);
  world.SetAllowSleeping(false);
  var bd = new Box2D.b2BodyDef;
  var ground = world.CreateBody(bd);
  var shape0 = new Box2D.b2EdgeShape;
  shape0.Set(new Box2D.b2Vec2(-40, 0), new Box2D.b2Vec2(40, 0));
  ground.CreateFixture(shape0, 0);
  var topBody;
  var a = .5;
  var shape = new Box2D.b2PolygonShape;
  shape.SetAsBox(a, a);
  var x = new Box2D.b2Vec2(-7, .75);
  var y = new Box2D.b2Vec2;
  var deltaX = new Box2D.b2Vec2(.5625, 1);
  var deltaY = new Box2D.b2Vec2(1.125, 0);
  for (var i = 0; i < e_count; ++i) {
    y.set_x(x.get_x());
    y.set_y(x.get_y());
    for (var j = i; j < e_count; ++j) {
      var bd = new Box2D.b2BodyDef;
      bd.set_type(Box2D.b2_dynamicBody);
      bd.set_position(y);
      var body = world.CreateBody(bd);
      body.CreateFixture(shape, 5);
      topBody = body;
      y.op_add(deltaY);
    }
    x.op_add(deltaX);
  }
  var times = [];
  for (var i = 0; i < ITERATIONS; ++i) {
    var start = clock();
    world.Step(1 / 60, 3, 3);
    var end = clock();
    times.push(end - start);
    if (DEBUG) print([ topBody.GetPosition().get_y(), topBody.GetMass() ]);
  }
  times = times.slice(WARMUP);
  //print(times);
  var total = 0;
  for (var i = 0; i < times.length; ++i) {
    total += times[i];
  }
  //print(total / FRAMES);
}

bench();

print = saved.print;
printErr = saved.printErr;