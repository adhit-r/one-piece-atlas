var Q_ = Object.create;
var {
  getPrototypeOf: $_,
  defineProperty: Tc,
  getOwnPropertyNames: U_,
} = Object;
var W_ = Object.prototype.hasOwnProperty;
var R = (u, n, f) => {
  f = u != null ? Q_($_(u)) : {};
  let l =
    n || !u || !u.__esModule
      ? Tc(f, 'default', { value: u, enumerable: !0 })
      : f;
  for (let t of U_(u))
    if (!W_.call(l, t)) Tc(l, t, { get: () => u[t], enumerable: !0 });
  return l;
};
var b1 = (u, n) => () => (n || u((n = { exports: {} }).exports, n), n.exports);
var Z_ = (u, n) => {
  for (var f in n)
    Tc(u, f, {
      get: n[f],
      enumerable: !0,
      configurable: !0,
      set: l => (n[f] = () => l),
    });
};
var J_ = (u, n) => () => (u && (n = u((u = 0))), n);
var Y_ = (u =>
  typeof require !== 'undefined'
    ? require
    : typeof Proxy !== 'undefined'
      ? new Proxy(u, {
          get: (n, f) => (typeof require !== 'undefined' ? require : n)[f],
        })
      : u)(function (u) {
  if (typeof require !== 'undefined') return require.apply(this, arguments);
  throw Error('Dynamic require of "' + u + '" is not supported');
});
var g = b1(P_ => {
  var Ol = Symbol.for('react.element'),
    H_ = Symbol.for('react.portal'),
    I_ = Symbol.for('react.fragment'),
    X_ = Symbol.for('react.strict_mode'),
    L_ = Symbol.for('react.profiler'),
    O_ = Symbol.for('react.provider'),
    F_ = Symbol.for('react.context'),
    E_ = Symbol.for('react.forward_ref'),
    q_ = Symbol.for('react.suspense'),
    M_ = Symbol.for('react.memo'),
    S_ = Symbol.for('react.lazy'),
    D3 = Symbol.iterator;
  function B_(u) {
    if (u === null || typeof u !== 'object') return null;
    return (
      (u = (D3 && u[D3]) || u['@@iterator']),
      typeof u === 'function' ? u : null
    );
  }
  var A3 = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    R3 = Object.assign,
    k3 = {};
  function _f(u, n, f) {
    ((this.props = u),
      (this.context = n),
      (this.refs = k3),
      (this.updater = f || A3));
  }
  _f.prototype.isReactComponent = {};
  _f.prototype.setState = function (u, n) {
    if (typeof u !== 'object' && typeof u !== 'function' && u != null)
      throw Error(
        'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
      );
    this.updater.enqueueSetState(this, u, n, 'setState');
  };
  _f.prototype.forceUpdate = function (u) {
    this.updater.enqueueForceUpdate(this, u, 'forceUpdate');
  };
  function g3() {}
  g3.prototype = _f.prototype;
  function jc(u, n, f) {
    ((this.props = u),
      (this.context = n),
      (this.refs = k3),
      (this.updater = f || A3));
  }
  var oc = (jc.prototype = new g3());
  oc.constructor = jc;
  R3(oc, _f.prototype);
  oc.isPureReactComponent = !0;
  var K3 = Array.isArray,
    T3 = Object.prototype.hasOwnProperty,
    xc = { current: null },
    d3 = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j3(u, n, f) {
    var l,
      t = {},
      r = null,
      c = null;
    if (n != null)
      for (l in (n.ref !== void 0 && (c = n.ref),
      n.key !== void 0 && (r = '' + n.key),
      n))
        T3.call(n, l) && !d3.hasOwnProperty(l) && (t[l] = n[l]);
    var h = arguments.length - 2;
    if (h === 1) t.children = f;
    else if (1 < h) {
      for (var w = Array(h), z = 0; z < h; z++) w[z] = arguments[z + 2];
      t.children = w;
    }
    if (u && u.defaultProps)
      for (l in ((h = u.defaultProps), h)) t[l] === void 0 && (t[l] = h[l]);
    return {
      $$typeof: Ol,
      type: u,
      key: r,
      ref: c,
      props: t,
      _owner: xc.current,
    };
  }
  function G_(u, n) {
    return {
      $$typeof: Ol,
      type: u.type,
      key: n,
      ref: u.ref,
      props: u.props,
      _owner: u._owner,
    };
  }
  function Vc(u) {
    return typeof u === 'object' && u !== null && u.$$typeof === Ol;
  }
  function C_(u) {
    var n = { '=': '=0', ':': '=2' };
    return (
      '$' +
      u.replace(/[=:]/g, function (f) {
        return n[f];
      })
    );
  }
  var P3 = /\/+/g;
  function dc(u, n) {
    return typeof u === 'object' && u !== null && u.key != null
      ? C_('' + u.key)
      : n.toString(36);
  }
  function e1(u, n, f, l, t) {
    var r = typeof u;
    if (r === 'undefined' || r === 'boolean') u = null;
    var c = !1;
    if (u === null) c = !0;
    else
      switch (r) {
        case 'string':
        case 'number':
          c = !0;
          break;
        case 'object':
          switch (u.$$typeof) {
            case Ol:
            case H_:
              c = !0;
          }
      }
    if (c)
      return (
        (c = u),
        (t = t(c)),
        (u = l === '' ? '.' + dc(c, 0) : l),
        K3(t)
          ? ((f = ''),
            u != null && (f = u.replace(P3, '$&/') + '/'),
            e1(t, n, f, '', function (z) {
              return z;
            }))
          : t != null &&
            (Vc(t) &&
              (t = G_(
                t,
                f +
                  (!t.key || (c && c.key === t.key)
                    ? ''
                    : ('' + t.key).replace(P3, '$&/') + '/') +
                  u
              )),
            n.push(t)),
        1
      );
    if (((c = 0), (l = l === '' ? '.' : l + ':'), K3(u)))
      for (var h = 0; h < u.length; h++) {
        r = u[h];
        var w = l + dc(r, h);
        c += e1(r, n, f, w, t);
      }
    else if (((w = B_(u)), typeof w === 'function'))
      for (u = w.call(u), h = 0; !(r = u.next()).done; )
        ((r = r.value), (w = l + dc(r, h++)), (c += e1(r, n, f, w, t)));
    else if (r === 'object')
      throw (
        (n = String(u)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (n === '[object Object]'
              ? 'object with keys {' + Object.keys(u).join(', ') + '}'
              : n) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    return c;
  }
  function m1(u, n, f) {
    if (u == null) return u;
    var l = [],
      t = 0;
    return (
      e1(u, l, '', '', function (r) {
        return n.call(f, r, t++);
      }),
      l
    );
  }
  function D_(u) {
    if (u._status === -1) {
      var n = u._result;
      ((n = n()),
        n.then(
          function (f) {
            if (u._status === 0 || u._status === -1)
              ((u._status = 1), (u._result = f));
          },
          function (f) {
            if (u._status === 0 || u._status === -1)
              ((u._status = 2), (u._result = f));
          }
        ),
        u._status === -1 && ((u._status = 0), (u._result = n)));
    }
    if (u._status === 1) return u._result.default;
    throw u._result;
  }
  var qu = { current: null },
    s1 = { transition: null },
    K_ = {
      ReactCurrentDispatcher: qu,
      ReactCurrentBatchConfig: s1,
      ReactCurrentOwner: xc,
    };
  function o3() {
    throw Error('act(...) is not supported in production builds of React.');
  }
  P_.Children = {
    map: m1,
    forEach: function (u, n, f) {
      m1(
        u,
        function () {
          n.apply(this, arguments);
        },
        f
      );
    },
    count: function (u) {
      var n = 0;
      return (
        m1(u, function () {
          n++;
        }),
        n
      );
    },
    toArray: function (u) {
      return (
        m1(u, function (n) {
          return n;
        }) || []
      );
    },
    only: function (u) {
      if (!Vc(u))
        throw Error(
          'React.Children.only expected to receive a single React element child.'
        );
      return u;
    },
  };
  P_.Component = _f;
  P_.Fragment = I_;
  P_.Profiler = L_;
  P_.PureComponent = jc;
  P_.StrictMode = X_;
  P_.Suspense = q_;
  P_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K_;
  P_.act = o3;
  P_.cloneElement = function (u, n, f) {
    if (u === null || u === void 0)
      throw Error(
        'React.cloneElement(...): The argument must be a React element, but you passed ' +
          u +
          '.'
      );
    var l = R3({}, u.props),
      t = u.key,
      r = u.ref,
      c = u._owner;
    if (n != null) {
      if (
        (n.ref !== void 0 && ((r = n.ref), (c = xc.current)),
        n.key !== void 0 && (t = '' + n.key),
        u.type && u.type.defaultProps)
      )
        var h = u.type.defaultProps;
      for (w in n)
        T3.call(n, w) &&
          !d3.hasOwnProperty(w) &&
          (l[w] = n[w] === void 0 && h !== void 0 ? h[w] : n[w]);
    }
    var w = arguments.length - 2;
    if (w === 1) l.children = f;
    else if (1 < w) {
      h = Array(w);
      for (var z = 0; z < w; z++) h[z] = arguments[z + 2];
      l.children = h;
    }
    return { $$typeof: Ol, type: u.type, key: t, ref: r, props: l, _owner: c };
  };
  P_.createContext = function (u) {
    return (
      (u = {
        $$typeof: F_,
        _currentValue: u,
        _currentValue2: u,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }),
      (u.Provider = { $$typeof: O_, _context: u }),
      (u.Consumer = u)
    );
  };
  P_.createElement = j3;
  P_.createFactory = function (u) {
    var n = j3.bind(null, u);
    return ((n.type = u), n);
  };
  P_.createRef = function () {
    return { current: null };
  };
  P_.forwardRef = function (u) {
    return { $$typeof: E_, render: u };
  };
  P_.isValidElement = Vc;
  P_.lazy = function (u) {
    return { $$typeof: S_, _payload: { _status: -1, _result: u }, _init: D_ };
  };
  P_.memo = function (u, n) {
    return { $$typeof: M_, type: u, compare: n === void 0 ? null : n };
  };
  P_.startTransition = function (u) {
    var n = s1.transition;
    s1.transition = {};
    try {
      u();
    } finally {
      s1.transition = n;
    }
  };
  P_.unstable_act = o3;
  P_.useCallback = function (u, n) {
    return qu.current.useCallback(u, n);
  };
  P_.useContext = function (u) {
    return qu.current.useContext(u);
  };
  P_.useDebugValue = function () {};
  P_.useDeferredValue = function (u) {
    return qu.current.useDeferredValue(u);
  };
  P_.useEffect = function (u, n) {
    return qu.current.useEffect(u, n);
  };
  P_.useId = function () {
    return qu.current.useId();
  };
  P_.useImperativeHandle = function (u, n, f) {
    return qu.current.useImperativeHandle(u, n, f);
  };
  P_.useInsertionEffect = function (u, n) {
    return qu.current.useInsertionEffect(u, n);
  };
  P_.useLayoutEffect = function (u, n) {
    return qu.current.useLayoutEffect(u, n);
  };
  P_.useMemo = function (u, n) {
    return qu.current.useMemo(u, n);
  };
  P_.useReducer = function (u, n, f) {
    return qu.current.useReducer(u, n, f);
  };
  P_.useRef = function (u) {
    return qu.current.useRef(u);
  };
  P_.useState = function (u) {
    return qu.current.useState(u);
  };
  P_.useSyncExternalStore = function (u, n, f) {
    return qu.current.useSyncExternalStore(u, n, f);
  };
  P_.useTransition = function () {
    return qu.current.useTransition();
  };
  P_.version = '18.3.1';
});
var b3 = b1(YN => {
  function yc(u, n) {
    var f = u.length;
    u.push(n);
    u: for (; 0 < f; ) {
      var l = (f - 1) >>> 1,
        t = u[l];
      if (0 < a1(t, n)) ((u[l] = n), (u[f] = t), (f = l));
      else break u;
    }
  }
  function hn(u) {
    return u.length === 0 ? null : u[0];
  }
  function lt(u) {
    if (u.length === 0) return null;
    var n = u[0],
      f = u.pop();
    if (f !== n) {
      u[0] = f;
      u: for (var l = 0, t = u.length, r = t >>> 1; l < r; ) {
        var c = 2 * (l + 1) - 1,
          h = u[c],
          w = c + 1,
          z = u[w];
        if (0 > a1(h, f))
          w < t && 0 > a1(z, h)
            ? ((u[l] = z), (u[w] = f), (l = w))
            : ((u[l] = h), (u[c] = f), (l = c));
        else if (w < t && 0 > a1(z, f)) ((u[l] = z), (u[w] = f), (l = w));
        else break u;
      }
    }
    return n;
  }
  function a1(u, n) {
    var f = u.sortIndex - n.sortIndex;
    return f !== 0 ? f : u.id - n.id;
  }
  if (typeof performance === 'object' && typeof performance.now === 'function')
    ((pc = performance),
      (YN.unstable_now = function () {
        return pc.now();
      }));
  else
    ((ut = Date),
      (ic = ut.now()),
      (YN.unstable_now = function () {
        return ut.now() - ic;
      }));
  var pc,
    ut,
    ic,
    Wn = [],
    pn = [],
    JN = 1,
    mu = null,
    Yu = 3,
    tt = !1,
    B0 = !1,
    El = !1,
    V3 = typeof setTimeout === 'function' ? setTimeout : null,
    v3 = typeof clearTimeout === 'function' ? clearTimeout : null,
    x3 = typeof setImmediate !== 'undefined' ? setImmediate : null;
  typeof navigator !== 'undefined' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function bc(u) {
    for (var n = hn(pn); n !== null; ) {
      if (n.callback === null) lt(pn);
      else if (n.startTime <= u)
        (lt(pn), (n.sortIndex = n.expirationTime), yc(Wn, n));
      else break;
      n = hn(pn);
    }
  }
  function ec(u) {
    if (((El = !1), bc(u), !B0))
      if (hn(Wn) !== null) ((B0 = !0), ac(sc));
      else {
        var n = hn(pn);
        n !== null && uh(ec, n.startTime - u);
      }
  }
  function sc(u, n) {
    ((B0 = !1), El && ((El = !1), v3(ql), (ql = -1)), (tt = !0));
    var f = Yu;
    try {
      bc(n);
      for (
        mu = hn(Wn);
        mu !== null && (!(mu.expirationTime > n) || (u && !i3()));
      ) {
        var l = mu.callback;
        if (typeof l === 'function') {
          ((mu.callback = null), (Yu = mu.priorityLevel));
          var t = l(mu.expirationTime <= n);
          ((n = YN.unstable_now()),
            typeof t === 'function'
              ? (mu.callback = t)
              : mu === hn(Wn) && lt(Wn),
            bc(n));
        } else lt(Wn);
        mu = hn(Wn);
      }
      if (mu !== null) var r = !0;
      else {
        var c = hn(pn);
        (c !== null && uh(ec, c.startTime - n), (r = !1));
      }
      return r;
    } finally {
      ((mu = null), (Yu = f), (tt = !1));
    }
  }
  var rt = !1,
    nt = null,
    ql = -1,
    y3 = 5,
    p3 = -1;
  function i3() {
    return YN.unstable_now() - p3 < y3 ? !1 : !0;
  }
  function vc() {
    if (nt !== null) {
      var u = YN.unstable_now();
      p3 = u;
      var n = !0;
      try {
        n = nt(!0, u);
      } finally {
        n ? Fl() : ((rt = !1), (nt = null));
      }
    } else rt = !1;
  }
  var Fl;
  if (typeof x3 === 'function')
    Fl = function () {
      x3(vc);
    };
  else if (typeof MessageChannel !== 'undefined')
    ((ft = new MessageChannel()),
      (mc = ft.port2),
      (ft.port1.onmessage = vc),
      (Fl = function () {
        mc.postMessage(null);
      }));
  else
    Fl = function () {
      V3(vc, 0);
    };
  var ft, mc;
  function ac(u) {
    ((nt = u), rt || ((rt = !0), Fl()));
  }
  function uh(u, n) {
    ql = V3(function () {
      u(YN.unstable_now());
    }, n);
  }
  YN.unstable_IdlePriority = 5;
  YN.unstable_ImmediatePriority = 1;
  YN.unstable_LowPriority = 4;
  YN.unstable_NormalPriority = 3;
  YN.unstable_Profiling = null;
  YN.unstable_UserBlockingPriority = 2;
  YN.unstable_cancelCallback = function (u) {
    u.callback = null;
  };
  YN.unstable_continueExecution = function () {
    B0 || tt || ((B0 = !0), ac(sc));
  };
  YN.unstable_forceFrameRate = function (u) {
    0 > u || 125 < u
      ? console.error(
          'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
        )
      : (y3 = 0 < u ? Math.floor(1000 / u) : 5);
  };
  YN.unstable_getCurrentPriorityLevel = function () {
    return Yu;
  };
  YN.unstable_getFirstCallbackNode = function () {
    return hn(Wn);
  };
  YN.unstable_next = function (u) {
    switch (Yu) {
      case 1:
      case 2:
      case 3:
        var n = 3;
        break;
      default:
        n = Yu;
    }
    var f = Yu;
    Yu = n;
    try {
      return u();
    } finally {
      Yu = f;
    }
  };
  YN.unstable_pauseExecution = function () {};
  YN.unstable_requestPaint = function () {};
  YN.unstable_runWithPriority = function (u, n) {
    switch (u) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        u = 3;
    }
    var f = Yu;
    Yu = u;
    try {
      return n();
    } finally {
      Yu = f;
    }
  };
  YN.unstable_scheduleCallback = function (u, n, f) {
    var l = YN.unstable_now();
    switch (
      (typeof f === 'object' && f !== null
        ? ((f = f.delay), (f = typeof f === 'number' && 0 < f ? l + f : l))
        : (f = l),
      u)
    ) {
      case 1:
        var t = -1;
        break;
      case 2:
        t = 250;
        break;
      case 5:
        t = 1073741823;
        break;
      case 4:
        t = 1e4;
        break;
      default:
        t = 5000;
    }
    return (
      (t = f + t),
      (u = {
        id: JN++,
        callback: n,
        priorityLevel: u,
        startTime: f,
        expirationTime: t,
        sortIndex: -1,
      }),
      f > l
        ? ((u.sortIndex = f),
          yc(pn, u),
          hn(Wn) === null &&
            u === hn(pn) &&
            (El ? (v3(ql), (ql = -1)) : (El = !0), uh(ec, f - l)))
        : ((u.sortIndex = t), yc(Wn, u), B0 || tt || ((B0 = !0), ac(sc))),
      u
    );
  };
  YN.unstable_shouldYield = i3;
  YN.unstable_wrapCallback = function (u) {
    var n = Yu;
    return function () {
      var f = Yu;
      Yu = n;
      try {
        return u.apply(this, arguments);
      } finally {
        Yu = f;
      }
    };
  };
});
var cw = {};
Z_(cw, {
  version: () => z6,
  unstable_renderSubtreeIntoContainer: () => w6,
  unstable_batchedUpdates: () => h6,
  unmountComponentAtNode: () => c6,
  render: () => r6,
  hydrateRoot: () => t6,
  hydrate: () => l6,
  flushSync: () => f6,
  findDOMNode: () => n6,
  createRoot: () => u6,
  createPortal: () => a5,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => s5,
});
function L(u) {
  for (
    var n = 'https://reactjs.org/docs/error-decoder.html?invariant=' + u, f = 1;
    f < arguments.length;
    f++
  )
    n += '&args[]=' + encodeURIComponent(arguments[f]);
  return (
    'Minified React error #' +
    u +
    '; visit ' +
    n +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
function x0(u, n) {
  (Df(u, n), Df(u + 'Capture', n));
}
function Df(u, n) {
  el[u] = n;
  for (u = 0; u < n.length; u++) n8.add(n[u]);
}
function gN(u) {
  if (Lh.call(e3, u)) return !0;
  if (Lh.call(m3, u)) return !1;
  if (kN.test(u)) return (e3[u] = !0);
  return ((m3[u] = !0), !1);
}
function TN(u, n, f, l) {
  if (f !== null && f.type === 0) return !1;
  switch (typeof n) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      if (l) return !1;
      if (f !== null) return !f.acceptsBooleans;
      return (
        (u = u.toLowerCase().slice(0, 5)),
        u !== 'data-' && u !== 'aria-'
      );
    default:
      return !1;
  }
}
function dN(u, n, f, l) {
  if (n === null || typeof n === 'undefined' || TN(u, n, f, l)) return !0;
  if (l) return !1;
  if (f !== null)
    switch (f.type) {
      case 3:
        return !n;
      case 4:
        return n === !1;
      case 5:
        return isNaN(n);
      case 6:
        return isNaN(n) || 1 > n;
    }
  return !1;
}
function Bu(u, n, f, l, t, r, c) {
  ((this.acceptsBooleans = n === 2 || n === 3 || n === 4),
    (this.attributeName = l),
    (this.attributeNamespace = t),
    (this.mustUseProperty = f),
    (this.propertyName = u),
    (this.type = n),
    (this.sanitizeURL = r),
    (this.removeEmptyString = c));
}
function J2(u) {
  return u[1].toUpperCase();
}
function Y2(u, n, f, l) {
  var t = $u.hasOwnProperty(n) ? $u[n] : null;
  if (
    t !== null
      ? t.type !== 0
      : l ||
        !(2 < n.length) ||
        (n[0] !== 'o' && n[0] !== 'O') ||
        (n[1] !== 'n' && n[1] !== 'N')
  )
    (dN(n, f, t, l) && (f = null),
      l || t === null
        ? gN(n) &&
          (f === null ? u.removeAttribute(n) : u.setAttribute(n, '' + f))
        : t.mustUseProperty
          ? (u[t.propertyName] = f === null ? (t.type === 3 ? !1 : '') : f)
          : ((n = t.attributeName),
            (l = t.attributeNamespace),
            f === null
              ? u.removeAttribute(n)
              : ((t = t.type),
                (f = t === 3 || (t === 4 && f === !0) ? '' : '' + f),
                l ? u.setAttributeNS(l, n, f) : u.setAttribute(n, f))));
}
function Ml(u) {
  if (u === null || typeof u !== 'object') return null;
  return (
    (u = (s3 && u[s3]) || u['@@iterator']),
    typeof u === 'function' ? u : null
  );
}
function Pl(u) {
  if (nh === void 0)
    try {
      throw Error();
    } catch (f) {
      var n = f.stack.trim().match(/\n( *(at )?)/);
      nh = (n && n[1]) || '';
    }
  return (
    `
` +
    nh +
    u
  );
}
function lh(u, n) {
  if (!u || fh) return '';
  fh = !0;
  var f = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (n)
      if (
        ((n = function () {
          throw Error();
        }),
        Object.defineProperty(n.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect === 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(n, []);
        } catch (z) {
          var l = z;
        }
        Reflect.construct(u, [], n);
      } else {
        try {
          n.call();
        } catch (z) {
          l = z;
        }
        u.call(n.prototype);
      }
    else {
      try {
        throw Error();
      } catch (z) {
        l = z;
      }
      u();
    }
  } catch (z) {
    if (z && l && typeof z.stack === 'string') {
      for (
        var t = z.stack.split(`
`),
          r = l.stack.split(`
`),
          c = t.length - 1,
          h = r.length - 1;
        1 <= c && 0 <= h && t[c] !== r[h];
      )
        h--;
      for (; 1 <= c && 0 <= h; c--, h--)
        if (t[c] !== r[h]) {
          if (c !== 1 || h !== 1)
            do
              if ((c--, h--, 0 > h || t[c] !== r[h])) {
                var w =
                  `
` + t[c].replace(' at new ', ' at ');
                return (
                  u.displayName &&
                    w.includes('<anonymous>') &&
                    (w = w.replace('<anonymous>', u.displayName)),
                  w
                );
              }
            while (1 <= c && 0 <= h);
          break;
        }
    }
  } finally {
    ((fh = !1), (Error.prepareStackTrace = f));
  }
  return (u = u ? u.displayName || u.name : '') ? Pl(u) : '';
}
function jN(u) {
  switch (u.tag) {
    case 5:
      return Pl(u.type);
    case 16:
      return Pl('Lazy');
    case 13:
      return Pl('Suspense');
    case 19:
      return Pl('SuspenseList');
    case 0:
    case 2:
    case 15:
      return ((u = lh(u.type, !1)), u);
    case 11:
      return ((u = lh(u.type.render, !1)), u);
    case 1:
      return ((u = lh(u.type, !0)), u);
    default:
      return '';
  }
}
function qh(u) {
  if (u == null) return null;
  if (typeof u === 'function') return u.displayName || u.name || null;
  if (typeof u === 'string') return u;
  switch (u) {
    case Wf:
      return 'Fragment';
    case Uf:
      return 'Portal';
    case Oh:
      return 'Profiler';
    case H2:
      return 'StrictMode';
    case Fh:
      return 'Suspense';
    case Eh:
      return 'SuspenseList';
  }
  if (typeof u === 'object')
    switch (u.$$typeof) {
      case l8:
        return (u.displayName || 'Context') + '.Consumer';
      case f8:
        return (u._context.displayName || 'Context') + '.Provider';
      case I2:
        var n = u.render;
        return (
          (u = u.displayName),
          u ||
            ((u = n.displayName || n.name || ''),
            (u = u !== '' ? 'ForwardRef(' + u + ')' : 'ForwardRef')),
          u
        );
      case X2:
        return (
          (n = u.displayName || null),
          n !== null ? n : qh(u.type) || 'Memo'
        );
      case mn:
        ((n = u._payload), (u = u._init));
        try {
          return qh(u(n));
        } catch (f) {}
    }
  return null;
}
function oN(u) {
  var n = u.type;
  switch (u.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (n.displayName || 'Context') + '.Consumer';
    case 10:
      return (n._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (u = n.render),
        (u = u.displayName || u.name || ''),
        n.displayName || (u !== '' ? 'ForwardRef(' + u + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return n;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return qh(n);
    case 8:
      return n === H2 ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof n === 'function') return n.displayName || n.name || null;
      if (typeof n === 'string') return n;
  }
  return null;
}
function _0(u) {
  switch (typeof u) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return u;
    case 'object':
      return u;
    default:
      return '';
  }
}
function r8(u) {
  var n = u.type;
  return (
    (u = u.nodeName) &&
    u.toLowerCase() === 'input' &&
    (n === 'checkbox' || n === 'radio')
  );
}
function xN(u) {
  var n = r8(u) ? 'checked' : 'value',
    f = Object.getOwnPropertyDescriptor(u.constructor.prototype, n),
    l = '' + u[n];
  if (
    !u.hasOwnProperty(n) &&
    typeof f !== 'undefined' &&
    typeof f.get === 'function' &&
    typeof f.set === 'function'
  ) {
    var { get: t, set: r } = f;
    return (
      Object.defineProperty(u, n, {
        configurable: !0,
        get: function () {
          return t.call(this);
        },
        set: function (c) {
          ((l = '' + c), r.call(this, c));
        },
      }),
      Object.defineProperty(u, n, { enumerable: f.enumerable }),
      {
        getValue: function () {
          return l;
        },
        setValue: function (c) {
          l = '' + c;
        },
        stopTracking: function () {
          ((u._valueTracker = null), delete u[n]);
        },
      }
    );
  }
}
function ht(u) {
  u._valueTracker || (u._valueTracker = xN(u));
}
function c8(u) {
  if (!u) return !1;
  var n = u._valueTracker;
  if (!n) return !0;
  var f = n.getValue(),
    l = '';
  return (
    u && (l = r8(u) ? (u.checked ? 'true' : 'false') : u.value),
    (u = l),
    u !== f ? (n.setValue(u), !0) : !1
  );
}
function Dt(u) {
  if (
    ((u = u || (typeof document !== 'undefined' ? document : void 0)),
    typeof u === 'undefined')
  )
    return null;
  try {
    return u.activeElement || u.body;
  } catch (n) {
    return u.body;
  }
}
function Mh(u, n) {
  var f = n.checked;
  return e({}, n, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: f != null ? f : u._wrapperState.initialChecked,
  });
}
function a3(u, n) {
  var f = n.defaultValue == null ? '' : n.defaultValue,
    l = n.checked != null ? n.checked : n.defaultChecked;
  ((f = _0(n.value != null ? n.value : f)),
    (u._wrapperState = {
      initialChecked: l,
      initialValue: f,
      controlled:
        n.type === 'checkbox' || n.type === 'radio'
          ? n.checked != null
          : n.value != null,
    }));
}
function h8(u, n) {
  ((n = n.checked), n != null && Y2(u, 'checked', n, !1));
}
function Sh(u, n) {
  h8(u, n);
  var f = _0(n.value),
    l = n.type;
  if (f != null)
    if (l === 'number') {
      if ((f === 0 && u.value === '') || u.value != f) u.value = '' + f;
    } else u.value !== '' + f && (u.value = '' + f);
  else if (l === 'submit' || l === 'reset') {
    u.removeAttribute('value');
    return;
  }
  (n.hasOwnProperty('value')
    ? Bh(u, n.type, f)
    : n.hasOwnProperty('defaultValue') && Bh(u, n.type, _0(n.defaultValue)),
    n.checked == null &&
      n.defaultChecked != null &&
      (u.defaultChecked = !!n.defaultChecked));
}
function u4(u, n, f) {
  if (n.hasOwnProperty('value') || n.hasOwnProperty('defaultValue')) {
    var l = n.type;
    if (
      !(
        (l !== 'submit' && l !== 'reset') ||
        (n.value !== void 0 && n.value !== null)
      )
    )
      return;
    ((n = '' + u._wrapperState.initialValue),
      f || n === u.value || (u.value = n),
      (u.defaultValue = n));
  }
  ((f = u.name),
    f !== '' && (u.name = ''),
    (u.defaultChecked = !!u._wrapperState.initialChecked),
    f !== '' && (u.name = f));
}
function Bh(u, n, f) {
  if (n !== 'number' || Dt(u.ownerDocument) !== u)
    f == null
      ? (u.defaultValue = '' + u._wrapperState.initialValue)
      : u.defaultValue !== '' + f && (u.defaultValue = '' + f);
}
function qf(u, n, f, l) {
  if (((u = u.options), n)) {
    n = {};
    for (var t = 0; t < f.length; t++) n['$' + f[t]] = !0;
    for (f = 0; f < u.length; f++)
      ((t = n.hasOwnProperty('$' + u[f].value)),
        u[f].selected !== t && (u[f].selected = t),
        t && l && (u[f].defaultSelected = !0));
  } else {
    ((f = '' + _0(f)), (n = null));
    for (t = 0; t < u.length; t++) {
      if (u[t].value === f) {
        ((u[t].selected = !0), l && (u[t].defaultSelected = !0));
        return;
      }
      n !== null || u[t].disabled || (n = u[t]);
    }
    n !== null && (n.selected = !0);
  }
}
function Gh(u, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(L(91));
  return e({}, n, {
    value: void 0,
    defaultValue: void 0,
    children: '' + u._wrapperState.initialValue,
  });
}
function n4(u, n) {
  var f = n.value;
  if (f == null) {
    if (((f = n.children), (n = n.defaultValue), f != null)) {
      if (n != null) throw Error(L(92));
      if (Al(f)) {
        if (1 < f.length) throw Error(L(93));
        f = f[0];
      }
      n = f;
    }
    (n == null && (n = ''), (f = n));
  }
  u._wrapperState = { initialValue: _0(f) };
}
function w8(u, n) {
  var f = _0(n.value),
    l = _0(n.defaultValue);
  (f != null &&
    ((f = '' + f),
    f !== u.value && (u.value = f),
    n.defaultValue == null && u.defaultValue !== f && (u.defaultValue = f)),
    l != null && (u.defaultValue = '' + l));
}
function f4(u) {
  var n = u.textContent;
  n === u._wrapperState.initialValue && n !== '' && n !== null && (u.value = n);
}
function z8(u) {
  switch (u) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Ch(u, n) {
  return u == null || u === 'http://www.w3.org/1999/xhtml'
    ? z8(n)
    : u === 'http://www.w3.org/2000/svg' && n === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : u;
}
function sl(u, n) {
  if (n) {
    var f = u.firstChild;
    if (f && f === u.lastChild && f.nodeType === 3) {
      f.nodeValue = n;
      return;
    }
  }
  u.textContent = n;
}
function N8(u, n, f) {
  return n == null || typeof n === 'boolean' || n === ''
    ? ''
    : f || typeof n !== 'number' || n === 0 || (ol.hasOwnProperty(u) && ol[u])
      ? ('' + n).trim()
      : n + 'px';
}
function Q8(u, n) {
  u = u.style;
  for (var f in n)
    if (n.hasOwnProperty(f)) {
      var l = f.indexOf('--') === 0,
        t = N8(f, n[f], l);
      (f === 'float' && (f = 'cssFloat'), l ? u.setProperty(f, t) : (u[f] = t));
    }
}
function Dh(u, n) {
  if (n) {
    if (vN[u] && (n.children != null || n.dangerouslySetInnerHTML != null))
      throw Error(L(137, u));
    if (n.dangerouslySetInnerHTML != null) {
      if (n.children != null) throw Error(L(60));
      if (
        typeof n.dangerouslySetInnerHTML !== 'object' ||
        !('__html' in n.dangerouslySetInnerHTML)
      )
        throw Error(L(61));
    }
    if (n.style != null && typeof n.style !== 'object') throw Error(L(62));
  }
}
function Kh(u, n) {
  if (u.indexOf('-') === -1) return typeof n.is === 'string';
  switch (u) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
function L2(u) {
  return (
    (u = u.target || u.srcElement || window),
    u.correspondingUseElement && (u = u.correspondingUseElement),
    u.nodeType === 3 ? u.parentNode : u
  );
}
function l4(u) {
  if ((u = Z1(u))) {
    if (typeof Ah !== 'function') throw Error(L(280));
    var n = u.stateNode;
    n && ((n = cr(n)), Ah(u.stateNode, u.type, n));
  }
}
function $8(u) {
  Mf ? (Sf ? Sf.push(u) : (Sf = [u])) : (Mf = u);
}
function U8() {
  if (Mf) {
    var u = Mf,
      n = Sf;
    if (((Sf = Mf = null), l4(u), n)) for (u = 0; u < n.length; u++) l4(n[u]);
  }
}
function W8(u, n) {
  return u(n);
}
function Z8() {}
function J8(u, n, f) {
  if (th) return u(n, f);
  th = !0;
  try {
    return W8(u, n, f);
  } finally {
    if (((th = !1), Mf !== null || Sf !== null)) (Z8(), U8());
  }
}
function al(u, n) {
  var f = u.stateNode;
  if (f === null) return null;
  var l = cr(f);
  if (l === null) return null;
  f = l[n];
  u: switch (n) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ((l = !l.disabled) ||
        ((u = u.type),
        (l = !(
          u === 'button' ||
          u === 'input' ||
          u === 'select' ||
          u === 'textarea'
        ))),
        (u = !l));
      break u;
    default:
      u = !1;
  }
  if (u) return null;
  if (f && typeof f !== 'function') throw Error(L(231, n, typeof f));
  return f;
}
function yN(u, n, f, l, t, r, c, h, w) {
  var z = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(f, z);
  } catch (_) {
    this.onError(_);
  }
}
function iN(u, n, f, l, t, r, c, h, w) {
  ((xl = !1), (Kt = null), yN.apply(pN, arguments));
}
function bN(u, n, f, l, t, r, c, h, w) {
  if ((iN.apply(this, arguments), xl)) {
    if (xl) {
      var z = Kt;
      ((xl = !1), (Kt = null));
    } else throw Error(L(198));
    Pt || ((Pt = !0), (kh = z));
  }
}
function V0(u) {
  var n = u,
    f = u;
  if (u.alternate) for (; n.return; ) n = n.return;
  else {
    u = n;
    do ((n = u), (n.flags & 4098) !== 0 && (f = n.return), (u = n.return));
    while (u);
  }
  return n.tag === 3 ? f : null;
}
function Y8(u) {
  if (u.tag === 13) {
    var n = u.memoizedState;
    if (
      (n === null && ((u = u.alternate), u !== null && (n = u.memoizedState)),
      n !== null)
    )
      return n.dehydrated;
  }
  return null;
}
function t4(u) {
  if (V0(u) !== u) throw Error(L(188));
}
function mN(u) {
  var n = u.alternate;
  if (!n) {
    if (((n = V0(u)), n === null)) throw Error(L(188));
    return n !== u ? null : u;
  }
  for (var f = u, l = n; ; ) {
    var t = f.return;
    if (t === null) break;
    var r = t.alternate;
    if (r === null) {
      if (((l = t.return), l !== null)) {
        f = l;
        continue;
      }
      break;
    }
    if (t.child === r.child) {
      for (r = t.child; r; ) {
        if (r === f) return (t4(t), u);
        if (r === l) return (t4(t), n);
        r = r.sibling;
      }
      throw Error(L(188));
    }
    if (f.return !== l.return) ((f = t), (l = r));
    else {
      for (var c = !1, h = t.child; h; ) {
        if (h === f) {
          ((c = !0), (f = t), (l = r));
          break;
        }
        if (h === l) {
          ((c = !0), (l = t), (f = r));
          break;
        }
        h = h.sibling;
      }
      if (!c) {
        for (h = r.child; h; ) {
          if (h === f) {
            ((c = !0), (f = r), (l = t));
            break;
          }
          if (h === l) {
            ((c = !0), (l = r), (f = t));
            break;
          }
          h = h.sibling;
        }
        if (!c) throw Error(L(189));
      }
    }
    if (f.alternate !== l) throw Error(L(190));
  }
  if (f.tag !== 3) throw Error(L(188));
  return f.stateNode.current === f ? u : n;
}
function H8(u) {
  return ((u = mN(u)), u !== null ? I8(u) : null);
}
function I8(u) {
  if (u.tag === 5 || u.tag === 6) return u;
  for (u = u.child; u !== null; ) {
    var n = I8(u);
    if (n !== null) return n;
    u = u.sibling;
  }
  return null;
}
function nQ(u) {
  if (Hn && typeof Hn.onCommitFiberRoot === 'function')
    try {
      Hn.onCommitFiberRoot(fr, u, void 0, (u.current.flags & 128) === 128);
    } catch (n) {}
}
function tQ(u) {
  return ((u >>>= 0), u === 0 ? 32 : (31 - ((fQ(u) / lQ) | 0)) | 0);
}
function Rl(u) {
  switch (u & -u) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return u & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return u & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return u;
  }
}
function Rt(u, n) {
  var f = u.pendingLanes;
  if (f === 0) return 0;
  var l = 0,
    t = u.suspendedLanes,
    r = u.pingedLanes,
    c = f & 268435455;
  if (c !== 0) {
    var h = c & ~t;
    h !== 0 ? (l = Rl(h)) : ((r &= c), r !== 0 && (l = Rl(r)));
  } else ((c = f & ~t), c !== 0 ? (l = Rl(c)) : r !== 0 && (l = Rl(r)));
  if (l === 0) return 0;
  if (
    n !== 0 &&
    n !== l &&
    (n & t) === 0 &&
    ((t = l & -l), (r = n & -n), t >= r || (t === 16 && (r & 4194240) !== 0))
  )
    return n;
  if (((l & 4) !== 0 && (l |= f & 16), (n = u.entangledLanes), n !== 0))
    for (u = u.entanglements, n &= l; 0 < n; )
      ((f = 31 - Qn(n)), (t = 1 << f), (l |= u[f]), (n &= ~t));
  return l;
}
function rQ(u, n) {
  switch (u) {
    case 1:
    case 2:
    case 4:
      return n + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return n + 5000;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function cQ(u, n) {
  for (
    var {
      suspendedLanes: f,
      pingedLanes: l,
      expirationTimes: t,
      pendingLanes: r,
    } = u;
    0 < r;
  ) {
    var c = 31 - Qn(r),
      h = 1 << c,
      w = t[c];
    if (w === -1) {
      if ((h & f) === 0 || (h & l) !== 0) t[c] = rQ(h, n);
    } else w <= n && (u.expiredLanes |= h);
    r &= ~h;
  }
}
function gh(u) {
  return (
    (u = u.pendingLanes & -1073741825),
    u !== 0 ? u : u & 1073741824 ? 1073741824 : 0
  );
}
function F8() {
  var u = zt;
  return ((zt <<= 1), (zt & 4194240) === 0 && (zt = 64), u);
}
function rh(u) {
  for (var n = [], f = 0; 31 > f; f++) n.push(u);
  return n;
}
function U1(u, n, f) {
  ((u.pendingLanes |= n),
    n !== 536870912 && ((u.suspendedLanes = 0), (u.pingedLanes = 0)),
    (u = u.eventTimes),
    (n = 31 - Qn(n)),
    (u[n] = f));
}
function hQ(u, n) {
  var f = u.pendingLanes & ~n;
  ((u.pendingLanes = n),
    (u.suspendedLanes = 0),
    (u.pingedLanes = 0),
    (u.expiredLanes &= n),
    (u.mutableReadLanes &= n),
    (u.entangledLanes &= n),
    (n = u.entanglements));
  var l = u.eventTimes;
  for (u = u.expirationTimes; 0 < f; ) {
    var t = 31 - Qn(f),
      r = 1 << t;
    ((n[t] = 0), (l[t] = -1), (u[t] = -1), (f &= ~r));
  }
}
function F2(u, n) {
  var f = (u.entangledLanes |= n);
  for (u = u.entanglements; f; ) {
    var l = 31 - Qn(f),
      t = 1 << l;
    ((t & n) | (u[l] & n) && (u[l] |= n), (f &= ~t));
  }
}
function E8(u) {
  return (
    (u &= -u),
    1 < u ? (4 < u ? ((u & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
  );
}
function c4(u, n) {
  switch (u) {
    case 'focusin':
    case 'focusout':
      f0 = null;
      break;
    case 'dragenter':
    case 'dragleave':
      l0 = null;
      break;
    case 'mouseover':
    case 'mouseout':
      t0 = null;
      break;
    case 'pointerover':
    case 'pointerout':
      u1.delete(n.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      n1.delete(n.pointerId);
  }
}
function Sl(u, n, f, l, t, r) {
  if (u === null || u.nativeEvent !== r)
    return (
      (u = {
        blockedOn: n,
        domEventName: f,
        eventSystemFlags: l,
        nativeEvent: r,
        targetContainers: [t],
      }),
      n !== null && ((n = Z1(n)), n !== null && E2(n)),
      u
    );
  return (
    (u.eventSystemFlags |= l),
    (n = u.targetContainers),
    t !== null && n.indexOf(t) === -1 && n.push(t),
    u
  );
}
function zQ(u, n, f, l, t) {
  switch (n) {
    case 'focusin':
      return ((f0 = Sl(f0, u, n, f, l, t)), !0);
    case 'dragenter':
      return ((l0 = Sl(l0, u, n, f, l, t)), !0);
    case 'mouseover':
      return ((t0 = Sl(t0, u, n, f, l, t)), !0);
    case 'pointerover':
      var r = t.pointerId;
      return (u1.set(r, Sl(u1.get(r) || null, u, n, f, l, t)), !0);
    case 'gotpointercapture':
      return (
        (r = t.pointerId),
        n1.set(r, Sl(n1.get(r) || null, u, n, f, l, t)),
        !0
      );
  }
  return !1;
}
function G8(u) {
  var n = K0(u.target);
  if (n !== null) {
    var f = V0(n);
    if (f !== null) {
      if (((n = f.tag), n === 13)) {
        if (((n = Y8(f)), n !== null)) {
          ((u.blockedOn = n),
            B8(u.priority, function () {
              M8(f);
            }));
          return;
        }
      } else if (n === 3 && f.stateNode.current.memoizedState.isDehydrated) {
        u.blockedOn = f.tag === 3 ? f.stateNode.containerInfo : null;
        return;
      }
    }
  }
  u.blockedOn = null;
}
function Xt(u) {
  if (u.blockedOn !== null) return !1;
  for (var n = u.targetContainers; 0 < n.length; ) {
    var f = dh(u.domEventName, u.eventSystemFlags, n[0], u.nativeEvent);
    if (f === null) {
      f = u.nativeEvent;
      var l = new f.constructor(f.type, f);
      ((Ph = l), f.target.dispatchEvent(l), (Ph = null));
    } else return ((n = Z1(f)), n !== null && E2(n), (u.blockedOn = f), !1);
    n.shift();
  }
  return !0;
}
function h4(u, n, f) {
  Xt(u) && f.delete(n);
}
function _Q() {
  ((Th = !1),
    f0 !== null && Xt(f0) && (f0 = null),
    l0 !== null && Xt(l0) && (l0 = null),
    t0 !== null && Xt(t0) && (t0 = null),
    u1.forEach(h4),
    n1.forEach(h4));
}
function Bl(u, n) {
  u.blockedOn === n &&
    ((u.blockedOn = null),
    Th ||
      ((Th = !0), i.unstable_scheduleCallback(i.unstable_NormalPriority, _Q)));
}
function f1(u) {
  function n(t) {
    return Bl(t, u);
  }
  if (0 < Nt.length) {
    Bl(Nt[0], u);
    for (var f = 1; f < Nt.length; f++) {
      var l = Nt[f];
      l.blockedOn === u && (l.blockedOn = null);
    }
  }
  (f0 !== null && Bl(f0, u),
    l0 !== null && Bl(l0, u),
    t0 !== null && Bl(t0, u),
    u1.forEach(n),
    n1.forEach(n));
  for (f = 0; f < sn.length; f++)
    ((l = sn[f]), l.blockedOn === u && (l.blockedOn = null));
  for (; 0 < sn.length && ((f = sn[0]), f.blockedOn === null); )
    (G8(f), f.blockedOn === null && sn.shift());
}
function NQ(u, n, f, l) {
  var t = k,
    r = Bf.transition;
  Bf.transition = null;
  try {
    ((k = 1), q2(u, n, f, l));
  } finally {
    ((k = t), (Bf.transition = r));
  }
}
function QQ(u, n, f, l) {
  var t = k,
    r = Bf.transition;
  Bf.transition = null;
  try {
    ((k = 4), q2(u, n, f, l));
  } finally {
    ((k = t), (Bf.transition = r));
  }
}
function q2(u, n, f, l) {
  if (kt) {
    var t = dh(u, n, f, l);
    if (t === null) (Nh(u, n, l, gt, f), c4(u, l));
    else if (zQ(t, u, n, f, l)) l.stopPropagation();
    else if ((c4(u, l), n & 4 && -1 < wQ.indexOf(u))) {
      for (; t !== null; ) {
        var r = Z1(t);
        if (
          (r !== null && q8(r),
          (r = dh(u, n, f, l)),
          r === null && Nh(u, n, l, gt, f),
          r === t)
        )
          break;
        t = r;
      }
      t !== null && l.stopPropagation();
    } else Nh(u, n, l, null, f);
  }
}
function dh(u, n, f, l) {
  if (((gt = null), (u = L2(l)), (u = K0(u)), u !== null))
    if (((n = V0(u)), n === null)) u = null;
    else if (((f = n.tag), f === 13)) {
      if (((u = Y8(n)), u !== null)) return u;
      u = null;
    } else if (f === 3) {
      if (n.stateNode.current.memoizedState.isDehydrated)
        return n.tag === 3 ? n.stateNode.containerInfo : null;
      u = null;
    } else n !== u && (u = null);
  return ((gt = u), null);
}
function C8(u) {
  switch (u) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (aN()) {
        case O2:
          return 1;
        case L8:
          return 4;
        case At:
        case uQ:
          return 16;
        case O8:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
function D8() {
  if (Lt) return Lt;
  var u,
    n = M2,
    f = n.length,
    l,
    t = 'value' in u0 ? u0.value : u0.textContent,
    r = t.length;
  for (u = 0; u < f && n[u] === t[u]; u++);
  var c = f - u;
  for (l = 1; l <= c && n[f - l] === t[r - l]; l++);
  return (Lt = t.slice(u, 1 < l ? 1 - l : void 0));
}
function Ot(u) {
  var n = u.keyCode;
  return (
    'charCode' in u
      ? ((u = u.charCode), u === 0 && n === 13 && (u = 13))
      : (u = n),
    u === 10 && (u = 13),
    32 <= u || u === 13 ? u : 0
  );
}
function Qt() {
  return !0;
}
function w4() {
  return !1;
}
function Vu(u) {
  function n(f, l, t, r, c) {
    ((this._reactName = f),
      (this._targetInst = t),
      (this.type = l),
      (this.nativeEvent = r),
      (this.target = c),
      (this.currentTarget = null));
    for (var h in u)
      u.hasOwnProperty(h) && ((f = u[h]), (this[h] = f ? f(r) : r[h]));
    return (
      (this.isDefaultPrevented = (
        r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1
      )
        ? Qt
        : w4),
      (this.isPropagationStopped = w4),
      this
    );
  }
  return (
    e(n.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var f = this.nativeEvent;
        f &&
          (f.preventDefault
            ? f.preventDefault()
            : typeof f.returnValue !== 'unknown' && (f.returnValue = !1),
          (this.isDefaultPrevented = Qt));
      },
      stopPropagation: function () {
        var f = this.nativeEvent;
        f &&
          (f.stopPropagation
            ? f.stopPropagation()
            : typeof f.cancelBubble !== 'unknown' && (f.cancelBubble = !0),
          (this.isPropagationStopped = Qt));
      },
      persist: function () {},
      isPersistent: Qt,
    }),
    n
  );
}
function EQ(u) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(u) : (u = FQ[u]) ? !!n[u] : !1;
}
function B2() {
  return EQ;
}
function P8(u, n) {
  switch (u) {
    case 'keyup':
      return AQ.indexOf(n.keyCode) !== -1;
    case 'keydown':
      return n.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function A8(u) {
  return ((u = u.detail), typeof u === 'object' && 'data' in u ? u.data : null);
}
function kQ(u, n) {
  switch (u) {
    case 'compositionend':
      return A8(n);
    case 'keypress':
      if (n.which !== 32) return null;
      return (($4 = !0), Q4);
    case 'textInput':
      return ((u = n.data), u === Q4 && $4 ? null : u);
    default:
      return null;
  }
}
function gQ(u, n) {
  if (Zf)
    return u === 'compositionend' || (!G2 && P8(u, n))
      ? ((u = D8()), (Lt = M2 = u0 = null), (Zf = !1), u)
      : null;
  switch (u) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
        if (n.char && 1 < n.char.length) return n.char;
        if (n.which) return String.fromCharCode(n.which);
      }
      return null;
    case 'compositionend':
      return K8 && n.locale !== 'ko' ? null : n.data;
    default:
      return null;
  }
}
function U4(u) {
  var n = u && u.nodeName && u.nodeName.toLowerCase();
  return n === 'input' ? !!TQ[u.type] : n === 'textarea' ? !0 : !1;
}
function R8(u, n, f, l) {
  ($8(l),
    (n = Tt(n, 'onChange')),
    0 < n.length &&
      ((f = new S2('onChange', 'change', null, f, l)),
      u.push({ event: f, listeners: n })));
}
function dQ(u) {
  p8(u, 0);
}
function tr(u) {
  var n = Hf(u);
  if (c8(n)) return u;
}
function jQ(u, n) {
  if (u === 'change') return n;
}
function W4() {
  vl && (vl.detachEvent('onpropertychange', g8), (l1 = vl = null));
}
function g8(u) {
  if (u.propertyName === 'value' && tr(l1)) {
    var n = [];
    (R8(n, l1, u, L2(u)), J8(dQ, n));
  }
}
function oQ(u, n, f) {
  u === 'focusin'
    ? (W4(), (vl = n), (l1 = f), vl.attachEvent('onpropertychange', g8))
    : u === 'focusout' && W4();
}
function xQ(u) {
  if (u === 'selectionchange' || u === 'keyup' || u === 'keydown')
    return tr(l1);
}
function VQ(u, n) {
  if (u === 'click') return tr(n);
}
function vQ(u, n) {
  if (u === 'input' || u === 'change') return tr(n);
}
function yQ(u, n) {
  return (u === n && (u !== 0 || 1 / u === 1 / n)) || (u !== u && n !== n);
}
function t1(u, n) {
  if (Un(u, n)) return !0;
  if (
    typeof u !== 'object' ||
    u === null ||
    typeof n !== 'object' ||
    n === null
  )
    return !1;
  var f = Object.keys(u),
    l = Object.keys(n);
  if (f.length !== l.length) return !1;
  for (l = 0; l < f.length; l++) {
    var t = f[l];
    if (!Lh.call(n, t) || !Un(u[t], n[t])) return !1;
  }
  return !0;
}
function Z4(u) {
  for (; u && u.firstChild; ) u = u.firstChild;
  return u;
}
function J4(u, n) {
  var f = Z4(u);
  u = 0;
  for (var l; f; ) {
    if (f.nodeType === 3) {
      if (((l = u + f.textContent.length), u <= n && l >= n))
        return { node: f, offset: n - u };
      u = l;
    }
    u: {
      for (; f; ) {
        if (f.nextSibling) {
          f = f.nextSibling;
          break u;
        }
        f = f.parentNode;
      }
      f = void 0;
    }
    f = Z4(f);
  }
}
function T8(u, n) {
  return u && n
    ? u === n
      ? !0
      : u && u.nodeType === 3
        ? !1
        : n && n.nodeType === 3
          ? T8(u, n.parentNode)
          : 'contains' in u
            ? u.contains(n)
            : u.compareDocumentPosition
              ? !!(u.compareDocumentPosition(n) & 16)
              : !1
    : !1;
}
function d8() {
  for (var u = window, n = Dt(); n instanceof u.HTMLIFrameElement; ) {
    try {
      var f = typeof n.contentWindow.location.href === 'string';
    } catch (l) {
      f = !1;
    }
    if (f) u = n.contentWindow;
    else break;
    n = Dt(u.document);
  }
  return n;
}
function C2(u) {
  var n = u && u.nodeName && u.nodeName.toLowerCase();
  return (
    n &&
    ((n === 'input' &&
      (u.type === 'text' ||
        u.type === 'search' ||
        u.type === 'tel' ||
        u.type === 'url' ||
        u.type === 'password')) ||
      n === 'textarea' ||
      u.contentEditable === 'true')
  );
}
function pQ(u) {
  var n = d8(),
    f = u.focusedElem,
    l = u.selectionRange;
  if (
    n !== f &&
    f &&
    f.ownerDocument &&
    T8(f.ownerDocument.documentElement, f)
  ) {
    if (l !== null && C2(f)) {
      if (
        ((n = l.start),
        (u = l.end),
        u === void 0 && (u = n),
        'selectionStart' in f)
      )
        ((f.selectionStart = n),
          (f.selectionEnd = Math.min(u, f.value.length)));
      else if (
        ((u = ((n = f.ownerDocument || document) && n.defaultView) || window),
        u.getSelection)
      ) {
        u = u.getSelection();
        var t = f.textContent.length,
          r = Math.min(l.start, t);
        ((l = l.end === void 0 ? r : Math.min(l.end, t)),
          !u.extend && r > l && ((t = l), (l = r), (r = t)),
          (t = J4(f, r)));
        var c = J4(f, l);
        t &&
          c &&
          (u.rangeCount !== 1 ||
            u.anchorNode !== t.node ||
            u.anchorOffset !== t.offset ||
            u.focusNode !== c.node ||
            u.focusOffset !== c.offset) &&
          ((n = n.createRange()),
          n.setStart(t.node, t.offset),
          u.removeAllRanges(),
          r > l
            ? (u.addRange(n), u.extend(c.node, c.offset))
            : (n.setEnd(c.node, c.offset), u.addRange(n)));
      }
    }
    n = [];
    for (u = f; (u = u.parentNode); )
      u.nodeType === 1 &&
        n.push({ element: u, left: u.scrollLeft, top: u.scrollTop });
    typeof f.focus === 'function' && f.focus();
    for (f = 0; f < n.length; f++)
      ((u = n[f]),
        (u.element.scrollLeft = u.left),
        (u.element.scrollTop = u.top));
  }
}
function Y4(u, n, f) {
  var l = f.window === f ? f.document : f.nodeType === 9 ? f : f.ownerDocument;
  oh ||
    Jf == null ||
    Jf !== Dt(l) ||
    ((l = Jf),
    'selectionStart' in l && C2(l)
      ? (l = { start: l.selectionStart, end: l.selectionEnd })
      : ((l = (
          (l.ownerDocument && l.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (l = {
          anchorNode: l.anchorNode,
          anchorOffset: l.anchorOffset,
          focusNode: l.focusNode,
          focusOffset: l.focusOffset,
        })),
    (yl && t1(yl, l)) ||
      ((yl = l),
      (l = Tt(jh, 'onSelect')),
      0 < l.length &&
        ((n = new S2('onSelect', 'select', null, n, f)),
        u.push({ event: n, listeners: l }),
        (n.target = Jf))));
}
function $t(u, n) {
  var f = {};
  return (
    (f[u.toLowerCase()] = n.toLowerCase()),
    (f['Webkit' + u] = 'webkit' + n),
    (f['Moz' + u] = 'moz' + n),
    f
  );
}
function rr(u) {
  if (zh[u]) return zh[u];
  if (!Yf[u]) return u;
  var n = Yf[u],
    f;
  for (f in n) if (n.hasOwnProperty(f) && f in j8) return (zh[u] = n[f]);
  return u;
}
function Q0(u, n) {
  (y8.set(u, n), x0(n, [u]));
}
function I4(u, n, f) {
  var l = u.type || 'unknown-event';
  ((u.currentTarget = f), bN(l, n, void 0, u), (u.currentTarget = null));
}
function p8(u, n) {
  n = (n & 4) !== 0;
  for (var f = 0; f < u.length; f++) {
    var l = u[f],
      t = l.event;
    l = l.listeners;
    u: {
      var r = void 0;
      if (n)
        for (var c = l.length - 1; 0 <= c; c--) {
          var h = l[c],
            w = h.instance,
            z = h.currentTarget;
          if (((h = h.listener), w !== r && t.isPropagationStopped())) break u;
          (I4(t, h, z), (r = w));
        }
      else
        for (c = 0; c < l.length; c++) {
          if (
            ((h = l[c]),
            (w = h.instance),
            (z = h.currentTarget),
            (h = h.listener),
            w !== r && t.isPropagationStopped())
          )
            break u;
          (I4(t, h, z), (r = w));
        }
    }
  }
  if (Pt) throw ((u = kh), (Pt = !1), (kh = null), u);
}
function o(u, n) {
  var f = n[bh];
  f === void 0 && (f = n[bh] = new Set());
  var l = u + '__bubble';
  f.has(l) || (i8(n, u, 2, !1), f.add(l));
}
function _h(u, n, f) {
  var l = 0;
  (n && (l |= 4), i8(f, u, l, n));
}
function r1(u) {
  if (!u[Ut]) {
    ((u[Ut] = !0),
      n8.forEach(function (f) {
        f !== 'selectionchange' && (bQ.has(f) || _h(f, !1, u), _h(f, !0, u));
      }));
    var n = u.nodeType === 9 ? u : u.ownerDocument;
    n === null || n[Ut] || ((n[Ut] = !0), _h('selectionchange', !1, n));
  }
}
function i8(u, n, f, l) {
  switch (C8(n)) {
    case 1:
      var t = NQ;
      break;
    case 4:
      t = QQ;
      break;
    default:
      t = q2;
  }
  ((f = t.bind(null, n, f, u)),
    (t = void 0),
    !Rh ||
      (n !== 'touchstart' && n !== 'touchmove' && n !== 'wheel') ||
      (t = !0),
    l
      ? t !== void 0
        ? u.addEventListener(n, f, { capture: !0, passive: t })
        : u.addEventListener(n, f, !0)
      : t !== void 0
        ? u.addEventListener(n, f, { passive: t })
        : u.addEventListener(n, f, !1));
}
function Nh(u, n, f, l, t) {
  var r = l;
  if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
    u: for (;;) {
      if (l === null) return;
      var c = l.tag;
      if (c === 3 || c === 4) {
        var h = l.stateNode.containerInfo;
        if (h === t || (h.nodeType === 8 && h.parentNode === t)) break;
        if (c === 4)
          for (c = l.return; c !== null; ) {
            var w = c.tag;
            if (w === 3 || w === 4) {
              if (
                ((w = c.stateNode.containerInfo),
                w === t || (w.nodeType === 8 && w.parentNode === t))
              )
                return;
            }
            c = c.return;
          }
        for (; h !== null; ) {
          if (((c = K0(h)), c === null)) return;
          if (((w = c.tag), w === 5 || w === 6)) {
            l = r = c;
            continue u;
          }
          h = h.parentNode;
        }
      }
      l = l.return;
    }
  J8(function () {
    var z = r,
      _ = L2(f),
      N = [];
    u: {
      var Q = y8.get(u);
      if (Q !== void 0) {
        var Z = S2,
          Y = u;
        switch (u) {
          case 'keypress':
            if (Ot(f) === 0) break u;
          case 'keydown':
          case 'keyup':
            Z = MQ;
            break;
          case 'focusin':
            ((Y = 'focus'), (Z = wh));
            break;
          case 'focusout':
            ((Y = 'blur'), (Z = wh));
            break;
          case 'beforeblur':
          case 'afterblur':
            Z = wh;
            break;
          case 'click':
            if (f.button === 2) break u;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            Z = z4;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            Z = WQ;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            Z = GQ;
            break;
          case o8:
          case x8:
          case V8:
            Z = YQ;
            break;
          case v8:
            Z = DQ;
            break;
          case 'scroll':
            Z = $Q;
            break;
          case 'wheel':
            Z = PQ;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            Z = IQ;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            Z = N4;
        }
        var H = (n & 4) !== 0,
          F = !H && u === 'scroll',
          U = H ? (Q !== null ? Q + 'Capture' : null) : Q;
        H = [];
        for (var $ = z, W; $ !== null; ) {
          W = $;
          var J = W.stateNode;
          if (
            (W.tag === 5 &&
              J !== null &&
              ((W = J),
              U !== null && ((J = al($, U)), J != null && H.push(c1($, J, W)))),
            F)
          )
            break;
          $ = $.return;
        }
        0 < H.length &&
          ((Q = new Z(Q, Y, null, f, _)), N.push({ event: Q, listeners: H }));
      }
    }
    if ((n & 7) === 0) {
      u: {
        if (
          ((Q = u === 'mouseover' || u === 'pointerover'),
          (Z = u === 'mouseout' || u === 'pointerout'),
          Q &&
            f !== Ph &&
            (Y = f.relatedTarget || f.fromElement) &&
            (K0(Y) || Y[An]))
        )
          break u;
        if (Z || Q) {
          if (
            ((Q =
              _.window === _
                ? _
                : (Q = _.ownerDocument)
                  ? Q.defaultView || Q.parentWindow
                  : window),
            Z)
          ) {
            if (
              ((Y = f.relatedTarget || f.toElement),
              (Z = z),
              (Y = Y ? K0(Y) : null),
              Y !== null &&
                ((F = V0(Y)), Y !== F || (Y.tag !== 5 && Y.tag !== 6)))
            )
              Y = null;
          } else ((Z = null), (Y = z));
          if (Z !== Y) {
            if (
              ((H = z4),
              (J = 'onMouseLeave'),
              (U = 'onMouseEnter'),
              ($ = 'mouse'),
              u === 'pointerout' || u === 'pointerover')
            )
              ((H = N4),
                (J = 'onPointerLeave'),
                (U = 'onPointerEnter'),
                ($ = 'pointer'));
            if (
              ((F = Z == null ? Q : Hf(Z)),
              (W = Y == null ? Q : Hf(Y)),
              (Q = new H(J, $ + 'leave', Z, f, _)),
              (Q.target = F),
              (Q.relatedTarget = W),
              (J = null),
              K0(_) === z &&
                ((H = new H(U, $ + 'enter', Y, f, _)),
                (H.target = W),
                (H.relatedTarget = F),
                (J = H)),
              (F = J),
              Z && Y)
            )
              n: {
                ((H = Z), (U = Y), ($ = 0));
                for (W = H; W; W = Qf(W)) $++;
                W = 0;
                for (J = U; J; J = Qf(J)) W++;
                for (; 0 < $ - W; ) ((H = Qf(H)), $--);
                for (; 0 < W - $; ) ((U = Qf(U)), W--);
                for (; $--; ) {
                  if (H === U || (U !== null && H === U.alternate)) break n;
                  ((H = Qf(H)), (U = Qf(U)));
                }
                H = null;
              }
            else H = null;
            (Z !== null && X4(N, Q, Z, H, !1),
              Y !== null && F !== null && X4(N, F, Y, H, !0));
          }
        }
      }
      u: {
        if (
          ((Q = z ? Hf(z) : window),
          (Z = Q.nodeName && Q.nodeName.toLowerCase()),
          Z === 'select' || (Z === 'input' && Q.type === 'file'))
        )
          var I = jQ;
        else if (U4(Q))
          if (k8) I = vQ;
          else {
            I = xQ;
            var X = oQ;
          }
        else
          (Z = Q.nodeName) &&
            Z.toLowerCase() === 'input' &&
            (Q.type === 'checkbox' || Q.type === 'radio') &&
            (I = VQ);
        if (I && (I = I(u, z))) {
          R8(N, I, f, _);
          break u;
        }
        (X && X(u, Q, z),
          u === 'focusout' &&
            (X = Q._wrapperState) &&
            X.controlled &&
            Q.type === 'number' &&
            Bh(Q, 'number', Q.value));
      }
      switch (((X = z ? Hf(z) : window), u)) {
        case 'focusin':
          if (U4(X) || X.contentEditable === 'true')
            ((Jf = X), (jh = z), (yl = null));
          break;
        case 'focusout':
          yl = jh = Jf = null;
          break;
        case 'mousedown':
          oh = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ((oh = !1), Y4(N, f, _));
          break;
        case 'selectionchange':
          if (iQ) break;
        case 'keydown':
        case 'keyup':
          Y4(N, f, _);
      }
      var E;
      if (G2)
        u: {
          switch (u) {
            case 'compositionstart':
              var O = 'onCompositionStart';
              break u;
            case 'compositionend':
              O = 'onCompositionEnd';
              break u;
            case 'compositionupdate':
              O = 'onCompositionUpdate';
              break u;
          }
          O = void 0;
        }
      else
        Zf
          ? P8(u, f) && (O = 'onCompositionEnd')
          : u === 'keydown' && f.keyCode === 229 && (O = 'onCompositionStart');
      if (
        (O &&
          (K8 &&
            f.locale !== 'ko' &&
            (Zf || O !== 'onCompositionStart'
              ? O === 'onCompositionEnd' && Zf && (E = D8())
              : ((u0 = _),
                (M2 = 'value' in u0 ? u0.value : u0.textContent),
                (Zf = !0))),
          (X = Tt(z, O)),
          0 < X.length &&
            ((O = new _4(O, u, null, f, _)),
            N.push({ event: O, listeners: X }),
            E ? (O.data = E) : ((E = A8(f)), E !== null && (O.data = E)))),
        (E = RQ ? kQ(u, f) : gQ(u, f)))
      )
        ((z = Tt(z, 'onBeforeInput')),
          0 < z.length &&
            ((_ = new _4('onBeforeInput', 'beforeinput', null, f, _)),
            N.push({ event: _, listeners: z }),
            (_.data = E)));
    }
    p8(N, n);
  });
}
function c1(u, n, f) {
  return { instance: u, listener: n, currentTarget: f };
}
function Tt(u, n) {
  for (var f = n + 'Capture', l = []; u !== null; ) {
    var t = u,
      r = t.stateNode;
    (t.tag === 5 &&
      r !== null &&
      ((t = r),
      (r = al(u, f)),
      r != null && l.unshift(c1(u, r, t)),
      (r = al(u, n)),
      r != null && l.push(c1(u, r, t))),
      (u = u.return));
  }
  return l;
}
function Qf(u) {
  if (u === null) return null;
  do u = u.return;
  while (u && u.tag !== 5);
  return u ? u : null;
}
function X4(u, n, f, l, t) {
  for (var r = n._reactName, c = []; f !== null && f !== l; ) {
    var h = f,
      w = h.alternate,
      z = h.stateNode;
    if (w !== null && w === l) break;
    (h.tag === 5 &&
      z !== null &&
      ((h = z),
      t
        ? ((w = al(f, r)), w != null && c.unshift(c1(f, w, h)))
        : t || ((w = al(f, r)), w != null && c.push(c1(f, w, h)))),
      (f = f.return));
  }
  c.length !== 0 && u.push({ event: n, listeners: c });
}
function L4(u) {
  return (typeof u === 'string' ? u : '' + u)
    .replace(
      mQ,
      `
`
    )
    .replace(eQ, '');
}
function Wt(u, n, f) {
  if (((n = L4(n)), L4(u) !== n && f)) throw Error(L(425));
}
function dt() {}
function ph(u, n) {
  return (
    u === 'textarea' ||
    u === 'noscript' ||
    typeof n.children === 'string' ||
    typeof n.children === 'number' ||
    (typeof n.dangerouslySetInnerHTML === 'object' &&
      n.dangerouslySetInnerHTML !== null &&
      n.dangerouslySetInnerHTML.__html != null)
  );
}
function u$(u) {
  setTimeout(function () {
    throw u;
  });
}
function Qh(u, n) {
  var f = n,
    l = 0;
  do {
    var t = f.nextSibling;
    if ((u.removeChild(f), t && t.nodeType === 8))
      if (((f = t.data), f === '/$')) {
        if (l === 0) {
          (u.removeChild(t), f1(n));
          return;
        }
        l--;
      } else (f !== '$' && f !== '$?' && f !== '$!') || l++;
    f = t;
  } while (f);
  f1(n);
}
function r0(u) {
  for (; u != null; u = u.nextSibling) {
    var n = u.nodeType;
    if (n === 1 || n === 3) break;
    if (n === 8) {
      if (((n = u.data), n === '$' || n === '$!' || n === '$?')) break;
      if (n === '/$') return null;
    }
  }
  return u;
}
function F4(u) {
  u = u.previousSibling;
  for (var n = 0; u; ) {
    if (u.nodeType === 8) {
      var f = u.data;
      if (f === '$' || f === '$!' || f === '$?') {
        if (n === 0) return u;
        n--;
      } else f === '/$' && n++;
    }
    u = u.previousSibling;
  }
  return null;
}
function K0(u) {
  var n = u[Yn];
  if (n) return n;
  for (var f = u.parentNode; f; ) {
    if ((n = f[An] || f[Yn])) {
      if (
        ((f = n.alternate),
        n.child !== null || (f !== null && f.child !== null))
      )
        for (u = F4(u); u !== null; ) {
          if ((f = u[Yn])) return f;
          u = F4(u);
        }
      return n;
    }
    ((u = f), (f = u.parentNode));
  }
  return null;
}
function Z1(u) {
  return (
    (u = u[Yn] || u[An]),
    !u || (u.tag !== 5 && u.tag !== 6 && u.tag !== 13 && u.tag !== 3) ? null : u
  );
}
function Hf(u) {
  if (u.tag === 5 || u.tag === 6) return u.stateNode;
  throw Error(L(33));
}
function cr(u) {
  return u[h1] || null;
}
function $0(u) {
  return { current: u };
}
function x(u) {
  0 > If || ((u.current = mh[If]), (mh[If] = null), If--);
}
function d(u, n) {
  (If++, (mh[If] = u.current), (u.current = n));
}
function Kf(u, n) {
  var f = u.type.contextTypes;
  if (!f) return N0;
  var l = u.stateNode;
  if (l && l.__reactInternalMemoizedUnmaskedChildContext === n)
    return l.__reactInternalMemoizedMaskedChildContext;
  var t = {},
    r;
  for (r in f) t[r] = n[r];
  return (
    l &&
      ((u = u.stateNode),
      (u.__reactInternalMemoizedUnmaskedChildContext = n),
      (u.__reactInternalMemoizedMaskedChildContext = t)),
    t
  );
}
function Ru(u) {
  return ((u = u.childContextTypes), u !== null && u !== void 0);
}
function jt() {
  (x(Au), x(Lu));
}
function E4(u, n, f) {
  if (Lu.current !== N0) throw Error(L(168));
  (d(Lu, n), d(Au, f));
}
function b8(u, n, f) {
  var l = u.stateNode;
  if (((n = n.childContextTypes), typeof l.getChildContext !== 'function'))
    return f;
  l = l.getChildContext();
  for (var t in l) if (!(t in n)) throw Error(L(108, oN(u) || 'Unknown', t));
  return e({}, f, l);
}
function ot(u) {
  return (
    (u =
      ((u = u.stateNode) && u.__reactInternalMemoizedMergedChildContext) || N0),
    (g0 = Lu.current),
    d(Lu, u),
    d(Au, Au.current),
    !0
  );
}
function q4(u, n, f) {
  var l = u.stateNode;
  if (!l) throw Error(L(169));
  (f
    ? ((u = b8(u, n, g0)),
      (l.__reactInternalMemoizedMergedChildContext = u),
      x(Au),
      x(Lu),
      d(Lu, u))
    : x(Au),
    d(Au, f));
}
function m8(u) {
  Gn === null ? (Gn = [u]) : Gn.push(u);
}
function l$(u) {
  ((hr = !0), m8(u));
}
function U0() {
  if (!$h && Gn !== null) {
    $h = !0;
    var u = 0,
      n = k;
    try {
      var f = Gn;
      for (k = 1; u < f.length; u++) {
        var l = f[u];
        do l = l(!0);
        while (l !== null);
      }
      ((Gn = null), (hr = !1));
    } catch (t) {
      throw (Gn !== null && (Gn = Gn.slice(u + 1)), X8(O2, U0), t);
    } finally {
      ((k = n), ($h = !1));
    }
  }
  return null;
}
function C0(u, n) {
  ((Xf[Lf++] = Vt), (Xf[Lf++] = xt), (xt = u), (Vt = n));
}
function e8(u, n, f) {
  ((eu[su++] = Cn), (eu[su++] = Dn), (eu[su++] = T0), (T0 = u));
  var l = Cn;
  u = Dn;
  var t = 32 - Qn(l) - 1;
  ((l &= ~(1 << t)), (f += 1));
  var r = 32 - Qn(n) + t;
  if (30 < r) {
    var c = t - (t % 5);
    ((r = (l & ((1 << c) - 1)).toString(32)),
      (l >>= c),
      (t -= c),
      (Cn = (1 << (32 - Qn(n) + t)) | (f << t) | l),
      (Dn = r + u));
  } else ((Cn = (1 << r) | (f << t) | l), (Dn = u));
}
function D2(u) {
  u.return !== null && (C0(u, 1), e8(u, 1, 0));
}
function K2(u) {
  for (; u === xt; )
    ((xt = Xf[--Lf]), (Xf[Lf] = null), (Vt = Xf[--Lf]), (Xf[Lf] = null));
  for (; u === T0; )
    ((T0 = eu[--su]),
      (eu[su] = null),
      (Dn = eu[--su]),
      (eu[su] = null),
      (Cn = eu[--su]),
      (eu[su] = null));
}
function s8(u, n) {
  var f = au(5, null, null, 0);
  ((f.elementType = 'DELETED'),
    (f.stateNode = n),
    (f.return = u),
    (n = u.deletions),
    n === null ? ((u.deletions = [f]), (u.flags |= 16)) : n.push(f));
}
function M4(u, n) {
  switch (u.tag) {
    case 5:
      var f = u.type;
      return (
        (n =
          n.nodeType !== 1 || f.toLowerCase() !== n.nodeName.toLowerCase()
            ? null
            : n),
        n !== null
          ? ((u.stateNode = n), (xu = u), (ou = r0(n.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (n = u.pendingProps === '' || n.nodeType !== 3 ? null : n),
        n !== null ? ((u.stateNode = n), (xu = u), (ou = null), !0) : !1
      );
    case 13:
      return (
        (n = n.nodeType !== 8 ? null : n),
        n !== null
          ? ((f = T0 !== null ? { id: Cn, overflow: Dn } : null),
            (u.memoizedState = {
              dehydrated: n,
              treeContext: f,
              retryLane: 1073741824,
            }),
            (f = au(18, null, null, 0)),
            (f.stateNode = n),
            (f.return = u),
            (u.child = f),
            (xu = u),
            (ou = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function eh(u) {
  return (u.mode & 1) !== 0 && (u.flags & 128) === 0;
}
function sh(u) {
  if (p) {
    var n = ou;
    if (n) {
      var f = n;
      if (!M4(u, n)) {
        if (eh(u)) throw Error(L(418));
        n = r0(f.nextSibling);
        var l = xu;
        n && M4(u, n)
          ? s8(l, f)
          : ((u.flags = (u.flags & -4097) | 2), (p = !1), (xu = u));
      }
    } else {
      if (eh(u)) throw Error(L(418));
      ((u.flags = (u.flags & -4097) | 2), (p = !1), (xu = u));
    }
  }
}
function S4(u) {
  for (u = u.return; u !== null && u.tag !== 5 && u.tag !== 3 && u.tag !== 13; )
    u = u.return;
  xu = u;
}
function Zt(u) {
  if (u !== xu) return !1;
  if (!p) return (S4(u), (p = !0), !1);
  var n;
  if (
    ((n = u.tag !== 3) &&
      !(n = u.tag !== 5) &&
      ((n = u.type),
      (n = n !== 'head' && n !== 'body' && !ph(u.type, u.memoizedProps))),
    n && (n = ou))
  ) {
    if (eh(u)) throw (a8(), Error(L(418)));
    for (; n; ) (s8(u, n), (n = r0(n.nextSibling)));
  }
  if ((S4(u), u.tag === 13)) {
    if (((u = u.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
      throw Error(L(317));
    u: {
      u = u.nextSibling;
      for (n = 0; u; ) {
        if (u.nodeType === 8) {
          var f = u.data;
          if (f === '/$') {
            if (n === 0) {
              ou = r0(u.nextSibling);
              break u;
            }
            n--;
          } else (f !== '$' && f !== '$!' && f !== '$?') || n++;
        }
        u = u.nextSibling;
      }
      ou = null;
    }
  } else ou = xu ? r0(u.stateNode.nextSibling) : null;
  return !0;
}
function a8() {
  for (var u = ou; u; ) u = r0(u.nextSibling);
}
function Pf() {
  ((ou = xu = null), (p = !1));
}
function P2(u) {
  Nn === null ? (Nn = [u]) : Nn.push(u);
}
function Cl(u, n, f) {
  if (
    ((u = f.ref),
    u !== null && typeof u !== 'function' && typeof u !== 'object')
  ) {
    if (f._owner) {
      if (((f = f._owner), f)) {
        if (f.tag !== 1) throw Error(L(309));
        var l = f.stateNode;
      }
      if (!l) throw Error(L(147, u));
      var t = l,
        r = '' + u;
      if (
        n !== null &&
        n.ref !== null &&
        typeof n.ref === 'function' &&
        n.ref._stringRef === r
      )
        return n.ref;
      return (
        (n = function (c) {
          var h = t.refs;
          c === null ? delete h[r] : (h[r] = c);
        }),
        (n._stringRef = r),
        n
      );
    }
    if (typeof u !== 'string') throw Error(L(284));
    if (!f._owner) throw Error(L(290, u));
  }
  return u;
}
function Jt(u, n) {
  throw (
    (u = Object.prototype.toString.call(n)),
    Error(
      L(
        31,
        u === '[object Object]'
          ? 'object with keys {' + Object.keys(n).join(', ') + '}'
          : u
      )
    )
  );
}
function B4(u) {
  var n = u._init;
  return n(u._payload);
}
function u5(u) {
  function n(U, $) {
    if (u) {
      var W = U.deletions;
      W === null ? ((U.deletions = [$]), (U.flags |= 16)) : W.push($);
    }
  }
  function f(U, $) {
    if (!u) return null;
    for (; $ !== null; ) (n(U, $), ($ = $.sibling));
    return null;
  }
  function l(U, $) {
    for (U = new Map(); $ !== null; )
      ($.key !== null ? U.set($.key, $) : U.set($.index, $), ($ = $.sibling));
    return U;
  }
  function t(U, $) {
    return ((U = z0(U, $)), (U.index = 0), (U.sibling = null), U);
  }
  function r(U, $, W) {
    if (((U.index = W), !u)) return ((U.flags |= 1048576), $);
    if (((W = U.alternate), W !== null))
      return ((W = W.index), W < $ ? ((U.flags |= 2), $) : W);
    return ((U.flags |= 2), $);
  }
  function c(U) {
    return (u && U.alternate === null && (U.flags |= 2), U);
  }
  function h(U, $, W, J) {
    if ($ === null || $.tag !== 6)
      return (($ = Ih(W, U.mode, J)), ($.return = U), $);
    return (($ = t($, W)), ($.return = U), $);
  }
  function w(U, $, W, J) {
    var I = W.type;
    if (I === Wf) return _(U, $, W.props.children, J, W.key);
    if (
      $ !== null &&
      ($.elementType === I ||
        (typeof I === 'object' &&
          I !== null &&
          I.$$typeof === mn &&
          B4(I) === $.type))
    )
      return ((J = t($, W.props)), (J.ref = Cl(U, $, W)), (J.return = U), J);
    return (
      (J = Ct(W.type, W.key, W.props, null, U.mode, J)),
      (J.ref = Cl(U, $, W)),
      (J.return = U),
      J
    );
  }
  function z(U, $, W, J) {
    if (
      $ === null ||
      $.tag !== 4 ||
      $.stateNode.containerInfo !== W.containerInfo ||
      $.stateNode.implementation !== W.implementation
    )
      return (($ = Xh(W, U.mode, J)), ($.return = U), $);
    return (($ = t($, W.children || [])), ($.return = U), $);
  }
  function _(U, $, W, J, I) {
    if ($ === null || $.tag !== 7)
      return (($ = k0(W, U.mode, J, I)), ($.return = U), $);
    return (($ = t($, W)), ($.return = U), $);
  }
  function N(U, $, W) {
    if ((typeof $ === 'string' && $ !== '') || typeof $ === 'number')
      return (($ = Ih('' + $, U.mode, W)), ($.return = U), $);
    if (typeof $ === 'object' && $ !== null) {
      switch ($.$$typeof) {
        case ct:
          return (
            (W = Ct($.type, $.key, $.props, null, U.mode, W)),
            (W.ref = Cl(U, null, $)),
            (W.return = U),
            W
          );
        case Uf:
          return (($ = Xh($, U.mode, W)), ($.return = U), $);
        case mn:
          var J = $._init;
          return N(U, J($._payload), W);
      }
      if (Al($) || Ml($))
        return (($ = k0($, U.mode, W, null)), ($.return = U), $);
      Jt(U, $);
    }
    return null;
  }
  function Q(U, $, W, J) {
    var I = $ !== null ? $.key : null;
    if ((typeof W === 'string' && W !== '') || typeof W === 'number')
      return I !== null ? null : h(U, $, '' + W, J);
    if (typeof W === 'object' && W !== null) {
      switch (W.$$typeof) {
        case ct:
          return W.key === I ? w(U, $, W, J) : null;
        case Uf:
          return W.key === I ? z(U, $, W, J) : null;
        case mn:
          return ((I = W._init), Q(U, $, I(W._payload), J));
      }
      if (Al(W) || Ml(W)) return I !== null ? null : _(U, $, W, J, null);
      Jt(U, W);
    }
    return null;
  }
  function Z(U, $, W, J, I) {
    if ((typeof J === 'string' && J !== '') || typeof J === 'number')
      return ((U = U.get(W) || null), h($, U, '' + J, I));
    if (typeof J === 'object' && J !== null) {
      switch (J.$$typeof) {
        case ct:
          return (
            (U = U.get(J.key === null ? W : J.key) || null),
            w($, U, J, I)
          );
        case Uf:
          return (
            (U = U.get(J.key === null ? W : J.key) || null),
            z($, U, J, I)
          );
        case mn:
          var X = J._init;
          return Z(U, $, W, X(J._payload), I);
      }
      if (Al(J) || Ml(J)) return ((U = U.get(W) || null), _($, U, J, I, null));
      Jt($, J);
    }
    return null;
  }
  function Y(U, $, W, J) {
    for (
      var I = null, X = null, E = $, O = ($ = 0), G = null;
      E !== null && O < W.length;
      O++
    ) {
      E.index > O ? ((G = E), (E = null)) : (G = E.sibling);
      var M = Q(U, E, W[O], J);
      if (M === null) {
        E === null && (E = G);
        break;
      }
      (u && E && M.alternate === null && n(U, E),
        ($ = r(M, $, O)),
        X === null ? (I = M) : (X.sibling = M),
        (X = M),
        (E = G));
    }
    if (O === W.length) return (f(U, E), p && C0(U, O), I);
    if (E === null) {
      for (; O < W.length; O++)
        ((E = N(U, W[O], J)),
          E !== null &&
            (($ = r(E, $, O)),
            X === null ? (I = E) : (X.sibling = E),
            (X = E)));
      return (p && C0(U, O), I);
    }
    for (E = l(U, E); O < W.length; O++)
      ((G = Z(E, U, O, W[O], J)),
        G !== null &&
          (u && G.alternate !== null && E.delete(G.key === null ? O : G.key),
          ($ = r(G, $, O)),
          X === null ? (I = G) : (X.sibling = G),
          (X = G)));
    return (
      u &&
        E.forEach(function (K) {
          return n(U, K);
        }),
      p && C0(U, O),
      I
    );
  }
  function H(U, $, W, J) {
    var I = Ml(W);
    if (typeof I !== 'function') throw Error(L(150));
    if (((W = I.call(W)), W == null)) throw Error(L(151));
    for (
      var X = (I = null), E = $, O = ($ = 0), G = null, M = W.next();
      E !== null && !M.done;
      O++, M = W.next()
    ) {
      E.index > O ? ((G = E), (E = null)) : (G = E.sibling);
      var K = Q(U, E, M.value, J);
      if (K === null) {
        E === null && (E = G);
        break;
      }
      (u && E && K.alternate === null && n(U, E),
        ($ = r(K, $, O)),
        X === null ? (I = K) : (X.sibling = K),
        (X = K),
        (E = G));
    }
    if (M.done) return (f(U, E), p && C0(U, O), I);
    if (E === null) {
      for (; !M.done; O++, M = W.next())
        ((M = N(U, M.value, J)),
          M !== null &&
            (($ = r(M, $, O)),
            X === null ? (I = M) : (X.sibling = M),
            (X = M)));
      return (p && C0(U, O), I);
    }
    for (E = l(U, E); !M.done; O++, M = W.next())
      ((M = Z(E, U, O, M.value, J)),
        M !== null &&
          (u && M.alternate !== null && E.delete(M.key === null ? O : M.key),
          ($ = r(M, $, O)),
          X === null ? (I = M) : (X.sibling = M),
          (X = M)));
    return (
      u &&
        E.forEach(function (cf) {
          return n(U, cf);
        }),
      p && C0(U, O),
      I
    );
  }
  function F(U, $, W, J) {
    if (
      (typeof W === 'object' &&
        W !== null &&
        W.type === Wf &&
        W.key === null &&
        (W = W.props.children),
      typeof W === 'object' && W !== null)
    ) {
      switch (W.$$typeof) {
        case ct:
          u: {
            for (var I = W.key, X = $; X !== null; ) {
              if (X.key === I) {
                if (((I = W.type), I === Wf)) {
                  if (X.tag === 7) {
                    (f(U, X.sibling),
                      ($ = t(X, W.props.children)),
                      ($.return = U),
                      (U = $));
                    break u;
                  }
                } else if (
                  X.elementType === I ||
                  (typeof I === 'object' &&
                    I !== null &&
                    I.$$typeof === mn &&
                    B4(I) === X.type)
                ) {
                  (f(U, X.sibling),
                    ($ = t(X, W.props)),
                    ($.ref = Cl(U, X, W)),
                    ($.return = U),
                    (U = $));
                  break u;
                }
                f(U, X);
                break;
              } else n(U, X);
              X = X.sibling;
            }
            W.type === Wf
              ? (($ = k0(W.props.children, U.mode, J, W.key)),
                ($.return = U),
                (U = $))
              : ((J = Ct(W.type, W.key, W.props, null, U.mode, J)),
                (J.ref = Cl(U, $, W)),
                (J.return = U),
                (U = J));
          }
          return c(U);
        case Uf:
          u: {
            for (X = W.key; $ !== null; ) {
              if ($.key === X)
                if (
                  $.tag === 4 &&
                  $.stateNode.containerInfo === W.containerInfo &&
                  $.stateNode.implementation === W.implementation
                ) {
                  (f(U, $.sibling),
                    ($ = t($, W.children || [])),
                    ($.return = U),
                    (U = $));
                  break u;
                } else {
                  f(U, $);
                  break;
                }
              else n(U, $);
              $ = $.sibling;
            }
            (($ = Xh(W, U.mode, J)), ($.return = U), (U = $));
          }
          return c(U);
        case mn:
          return ((X = W._init), F(U, $, X(W._payload), J));
      }
      if (Al(W)) return Y(U, $, W, J);
      if (Ml(W)) return H(U, $, W, J);
      Jt(U, W);
    }
    return (typeof W === 'string' && W !== '') || typeof W === 'number'
      ? ((W = '' + W),
        $ !== null && $.tag === 6
          ? (f(U, $.sibling), ($ = t($, W)), ($.return = U), (U = $))
          : (f(U, $), ($ = Ih(W, U.mode, J)), ($.return = U), (U = $)),
        c(U))
      : f(U, $);
  }
  return F;
}
function R2() {
  A2 = Of = yt = null;
}
function k2(u) {
  var n = vt.current;
  (x(vt), (u._currentValue = n));
}
function ah(u, n, f) {
  for (; u !== null; ) {
    var l = u.alternate;
    if (
      ((u.childLanes & n) !== n
        ? ((u.childLanes |= n), l !== null && (l.childLanes |= n))
        : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n),
      u === f)
    )
      break;
    u = u.return;
  }
}
function Gf(u, n) {
  ((yt = u),
    (A2 = Of = null),
    (u = u.dependencies),
    u !== null &&
      u.firstContext !== null &&
      ((u.lanes & n) !== 0 && (Pu = !0), (u.firstContext = null)));
}
function nn(u) {
  var n = u._currentValue;
  if (A2 !== u)
    if (((u = { context: u, memoizedValue: n, next: null }), Of === null)) {
      if (yt === null) throw Error(L(308));
      ((Of = u), (yt.dependencies = { lanes: 0, firstContext: u }));
    } else Of = Of.next = u;
  return n;
}
function g2(u) {
  P0 === null ? (P0 = [u]) : P0.push(u);
}
function f5(u, n, f, l) {
  var t = n.interleaved;
  return (
    t === null ? ((f.next = f), g2(n)) : ((f.next = t.next), (t.next = f)),
    (n.interleaved = f),
    Rn(u, l)
  );
}
function Rn(u, n) {
  u.lanes |= n;
  var f = u.alternate;
  (f !== null && (f.lanes |= n), (f = u));
  for (u = u.return; u !== null; )
    ((u.childLanes |= n),
      (f = u.alternate),
      f !== null && (f.childLanes |= n),
      (f = u),
      (u = u.return));
  return f.tag === 3 ? f.stateNode : null;
}
function T2(u) {
  u.updateQueue = {
    baseState: u.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function l5(u, n) {
  ((u = u.updateQueue),
    n.updateQueue === u &&
      (n.updateQueue = {
        baseState: u.baseState,
        firstBaseUpdate: u.firstBaseUpdate,
        lastBaseUpdate: u.lastBaseUpdate,
        shared: u.shared,
        effects: u.effects,
      }));
}
function Kn(u, n) {
  return {
    eventTime: u,
    lane: n,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function c0(u, n, f) {
  var l = u.updateQueue;
  if (l === null) return null;
  if (((l = l.shared), (A & 2) !== 0)) {
    var t = l.pending;
    return (
      t === null ? (n.next = n) : ((n.next = t.next), (t.next = n)),
      (l.pending = n),
      Rn(u, f)
    );
  }
  return (
    (t = l.interleaved),
    t === null ? ((n.next = n), g2(l)) : ((n.next = t.next), (t.next = n)),
    (l.interleaved = n),
    Rn(u, f)
  );
}
function Et(u, n, f) {
  if (
    ((n = n.updateQueue), n !== null && ((n = n.shared), (f & 4194240) !== 0))
  ) {
    var l = n.lanes;
    ((l &= u.pendingLanes), (f |= l), (n.lanes = f), F2(u, f));
  }
}
function G4(u, n) {
  var { updateQueue: f, alternate: l } = u;
  if (l !== null && ((l = l.updateQueue), f === l)) {
    var t = null,
      r = null;
    if (((f = f.firstBaseUpdate), f !== null)) {
      do {
        var c = {
          eventTime: f.eventTime,
          lane: f.lane,
          tag: f.tag,
          payload: f.payload,
          callback: f.callback,
          next: null,
        };
        (r === null ? (t = r = c) : (r = r.next = c), (f = f.next));
      } while (f !== null);
      r === null ? (t = r = n) : (r = r.next = n);
    } else t = r = n;
    ((f = {
      baseState: l.baseState,
      firstBaseUpdate: t,
      lastBaseUpdate: r,
      shared: l.shared,
      effects: l.effects,
    }),
      (u.updateQueue = f));
    return;
  }
  ((u = f.lastBaseUpdate),
    u === null ? (f.firstBaseUpdate = n) : (u.next = n),
    (f.lastBaseUpdate = n));
}
function pt(u, n, f, l) {
  var t = u.updateQueue;
  en = !1;
  var { firstBaseUpdate: r, lastBaseUpdate: c } = t,
    h = t.shared.pending;
  if (h !== null) {
    t.shared.pending = null;
    var w = h,
      z = w.next;
    ((w.next = null), c === null ? (r = z) : (c.next = z), (c = w));
    var _ = u.alternate;
    _ !== null &&
      ((_ = _.updateQueue),
      (h = _.lastBaseUpdate),
      h !== c &&
        (h === null ? (_.firstBaseUpdate = z) : (h.next = z),
        (_.lastBaseUpdate = w)));
  }
  if (r !== null) {
    var N = t.baseState;
    ((c = 0), (_ = z = w = null), (h = r));
    do {
      var { lane: Q, eventTime: Z } = h;
      if ((l & Q) === Q) {
        _ !== null &&
          (_ = _.next =
            {
              eventTime: Z,
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null,
            });
        u: {
          var Y = u,
            H = h;
          switch (((Q = n), (Z = f), H.tag)) {
            case 1:
              if (((Y = H.payload), typeof Y === 'function')) {
                N = Y.call(Z, N, Q);
                break u;
              }
              N = Y;
              break u;
            case 3:
              Y.flags = (Y.flags & -65537) | 128;
            case 0:
              if (
                ((Y = H.payload),
                (Q = typeof Y === 'function' ? Y.call(Z, N, Q) : Y),
                Q === null || Q === void 0)
              )
                break u;
              N = e({}, N, Q);
              break u;
            case 2:
              en = !0;
          }
        }
        h.callback !== null &&
          h.lane !== 0 &&
          ((u.flags |= 64),
          (Q = t.effects),
          Q === null ? (t.effects = [h]) : Q.push(h));
      } else
        ((Z = {
          eventTime: Z,
          lane: Q,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null,
        }),
          _ === null ? ((z = _ = Z), (w = N)) : (_ = _.next = Z),
          (c |= Q));
      if (((h = h.next), h === null))
        if (((h = t.shared.pending), h === null)) break;
        else
          ((Q = h),
            (h = Q.next),
            (Q.next = null),
            (t.lastBaseUpdate = Q),
            (t.shared.pending = null));
    } while (1);
    if (
      (_ === null && (w = N),
      (t.baseState = w),
      (t.firstBaseUpdate = z),
      (t.lastBaseUpdate = _),
      (n = t.shared.interleaved),
      n !== null)
    ) {
      t = n;
      do ((c |= t.lane), (t = t.next));
      while (t !== n);
    } else r === null && (t.shared.lanes = 0);
    ((j0 |= c), (u.lanes = c), (u.memoizedState = N));
  }
}
function C4(u, n, f) {
  if (((u = n.effects), (n.effects = null), u !== null))
    for (n = 0; n < u.length; n++) {
      var l = u[n],
        t = l.callback;
      if (t !== null) {
        if (((l.callback = null), (l = f), typeof t !== 'function'))
          throw Error(L(191, t));
        t.call(l);
      }
    }
}
function A0(u) {
  if (u === J1) throw Error(L(174));
  return u;
}
function d2(u, n) {
  switch ((d(z1, n), d(w1, u), d(In, J1), (u = n.nodeType), u)) {
    case 9:
    case 11:
      n = (n = n.documentElement) ? n.namespaceURI : Ch(null, '');
      break;
    default:
      ((u = u === 8 ? n.parentNode : n),
        (n = u.namespaceURI || null),
        (u = u.tagName),
        (n = Ch(n, u)));
  }
  (x(In), d(In, n));
}
function Rf() {
  (x(In), x(w1), x(z1));
}
function t5(u) {
  A0(z1.current);
  var n = A0(In.current),
    f = Ch(n, u.type);
  n !== f && (d(w1, u), d(In, f));
}
function j2(u) {
  w1.current === u && (x(In), x(w1));
}
function it(u) {
  for (var n = u; n !== null; ) {
    if (n.tag === 13) {
      var f = n.memoizedState;
      if (
        f !== null &&
        ((f = f.dehydrated), f === null || f.data === '$?' || f.data === '$!')
      )
        return n;
    } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
      if ((n.flags & 128) !== 0) return n;
    } else if (n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === u) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === u) return null;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
  return null;
}
function o2() {
  for (var u = 0; u < Uh.length; u++)
    Uh[u]._workInProgressVersionPrimary = null;
  Uh.length = 0;
}
function Hu() {
  throw Error(L(321));
}
function x2(u, n) {
  if (n === null) return !1;
  for (var f = 0; f < n.length && f < u.length; f++)
    if (!Un(u[f], n[f])) return !1;
  return !0;
}
function V2(u, n, f, l, t, r) {
  if (
    ((d0 = r),
    (m = n),
    (n.memoizedState = null),
    (n.updateQueue = null),
    (n.lanes = 0),
    (qt.current = u === null || u.memoizedState === null ? z$ : _$),
    (u = f(l, t)),
    pl)
  ) {
    r = 0;
    do {
      if (((pl = !1), (_1 = 0), 25 <= r)) throw Error(L(301));
      ((r += 1),
        (wu = cu = null),
        (n.updateQueue = null),
        (qt.current = N$),
        (u = f(l, t)));
    } while (pl);
  }
  if (
    ((qt.current = mt),
    (n = cu !== null && cu.next !== null),
    (d0 = 0),
    (wu = cu = m = null),
    (bt = !1),
    n)
  )
    throw Error(L(300));
  return u;
}
function v2() {
  var u = _1 !== 0;
  return ((_1 = 0), u);
}
function Jn() {
  var u = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (wu === null ? (m.memoizedState = wu = u) : (wu = wu.next = u), wu);
}
function fn() {
  if (cu === null) {
    var u = m.alternate;
    u = u !== null ? u.memoizedState : null;
  } else u = cu.next;
  var n = wu === null ? m.memoizedState : wu.next;
  if (n !== null) ((wu = n), (cu = u));
  else {
    if (u === null) throw Error(L(310));
    ((cu = u),
      (u = {
        memoizedState: cu.memoizedState,
        baseState: cu.baseState,
        baseQueue: cu.baseQueue,
        queue: cu.queue,
        next: null,
      }),
      wu === null ? (m.memoizedState = wu = u) : (wu = wu.next = u));
  }
  return wu;
}
function N1(u, n) {
  return typeof n === 'function' ? n(u) : n;
}
function Zh(u) {
  var n = fn(),
    f = n.queue;
  if (f === null) throw Error(L(311));
  f.lastRenderedReducer = u;
  var l = cu,
    t = l.baseQueue,
    r = f.pending;
  if (r !== null) {
    if (t !== null) {
      var c = t.next;
      ((t.next = r.next), (r.next = c));
    }
    ((l.baseQueue = t = r), (f.pending = null));
  }
  if (t !== null) {
    ((r = t.next), (l = l.baseState));
    var h = (c = null),
      w = null,
      z = r;
    do {
      var _ = z.lane;
      if ((d0 & _) === _)
        (w !== null &&
          (w = w.next =
            {
              lane: 0,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
          (l = z.hasEagerState ? z.eagerState : u(l, z.action)));
      else {
        var N = {
          lane: _,
          action: z.action,
          hasEagerState: z.hasEagerState,
          eagerState: z.eagerState,
          next: null,
        };
        (w === null ? ((h = w = N), (c = l)) : (w = w.next = N),
          (m.lanes |= _),
          (j0 |= _));
      }
      z = z.next;
    } while (z !== null && z !== r);
    (w === null ? (c = l) : (w.next = h),
      Un(l, n.memoizedState) || (Pu = !0),
      (n.memoizedState = l),
      (n.baseState = c),
      (n.baseQueue = w),
      (f.lastRenderedState = l));
  }
  if (((u = f.interleaved), u !== null)) {
    t = u;
    do ((r = t.lane), (m.lanes |= r), (j0 |= r), (t = t.next));
    while (t !== u);
  } else t === null && (f.lanes = 0);
  return [n.memoizedState, f.dispatch];
}
function Jh(u) {
  var n = fn(),
    f = n.queue;
  if (f === null) throw Error(L(311));
  f.lastRenderedReducer = u;
  var { dispatch: l, pending: t } = f,
    r = n.memoizedState;
  if (t !== null) {
    f.pending = null;
    var c = (t = t.next);
    do ((r = u(r, c.action)), (c = c.next));
    while (c !== t);
    (Un(r, n.memoizedState) || (Pu = !0),
      (n.memoizedState = r),
      n.baseQueue === null && (n.baseState = r),
      (f.lastRenderedState = r));
  }
  return [r, l];
}
function r5() {}
function c5(u, n) {
  var f = m,
    l = fn(),
    t = n(),
    r = !Un(l.memoizedState, t);
  if (
    (r && ((l.memoizedState = t), (Pu = !0)),
    (l = l.queue),
    y2(z5.bind(null, f, l, u), [u]),
    l.getSnapshot !== n || r || (wu !== null && wu.memoizedState.tag & 1))
  ) {
    if (
      ((f.flags |= 2048),
      Q1(9, w5.bind(null, f, l, t, n), void 0, null),
      zu === null)
    )
      throw Error(L(349));
    (d0 & 30) !== 0 || h5(f, n, t);
  }
  return t;
}
function h5(u, n, f) {
  ((u.flags |= 16384),
    (u = { getSnapshot: n, value: f }),
    (n = m.updateQueue),
    n === null
      ? ((n = { lastEffect: null, stores: null }),
        (m.updateQueue = n),
        (n.stores = [u]))
      : ((f = n.stores), f === null ? (n.stores = [u]) : f.push(u)));
}
function w5(u, n, f, l) {
  ((n.value = f), (n.getSnapshot = l), _5(n) && N5(u));
}
function z5(u, n, f) {
  return f(function () {
    _5(n) && N5(u);
  });
}
function _5(u) {
  var n = u.getSnapshot;
  u = u.value;
  try {
    var f = n();
    return !Un(u, f);
  } catch (l) {
    return !0;
  }
}
function N5(u) {
  var n = Rn(u, 1);
  n !== null && $n(n, u, 1, -1);
}
function D4(u) {
  var n = Jn();
  return (
    typeof u === 'function' && (u = u()),
    (n.memoizedState = n.baseState = u),
    (u = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: N1,
      lastRenderedState: u,
    }),
    (n.queue = u),
    (u = u.dispatch = w$.bind(null, m, u)),
    [n.memoizedState, u]
  );
}
function Q1(u, n, f, l) {
  return (
    (u = { tag: u, create: n, destroy: f, deps: l, next: null }),
    (n = m.updateQueue),
    n === null
      ? ((n = { lastEffect: null, stores: null }),
        (m.updateQueue = n),
        (n.lastEffect = u.next = u))
      : ((f = n.lastEffect),
        f === null
          ? (n.lastEffect = u.next = u)
          : ((l = f.next), (f.next = u), (u.next = l), (n.lastEffect = u))),
    u
  );
}
function Q5() {
  return fn().memoizedState;
}
function Mt(u, n, f, l) {
  var t = Jn();
  ((m.flags |= u),
    (t.memoizedState = Q1(1 | n, f, void 0, l === void 0 ? null : l)));
}
function wr(u, n, f, l) {
  var t = fn();
  l = l === void 0 ? null : l;
  var r = void 0;
  if (cu !== null) {
    var c = cu.memoizedState;
    if (((r = c.destroy), l !== null && x2(l, c.deps))) {
      t.memoizedState = Q1(n, f, r, l);
      return;
    }
  }
  ((m.flags |= u), (t.memoizedState = Q1(1 | n, f, r, l)));
}
function K4(u, n) {
  return Mt(8390656, 8, u, n);
}
function y2(u, n) {
  return wr(2048, 8, u, n);
}
function $5(u, n) {
  return wr(4, 2, u, n);
}
function U5(u, n) {
  return wr(4, 4, u, n);
}
function W5(u, n) {
  if (typeof n === 'function')
    return (
      (u = u()),
      n(u),
      function () {
        n(null);
      }
    );
  if (n !== null && n !== void 0)
    return (
      (u = u()),
      (n.current = u),
      function () {
        n.current = null;
      }
    );
}
function Z5(u, n, f) {
  return (
    (f = f !== null && f !== void 0 ? f.concat([u]) : null),
    wr(4, 4, W5.bind(null, n, u), f)
  );
}
function p2() {}
function J5(u, n) {
  var f = fn();
  n = n === void 0 ? null : n;
  var l = f.memoizedState;
  if (l !== null && n !== null && x2(n, l[1])) return l[0];
  return ((f.memoizedState = [u, n]), u);
}
function Y5(u, n) {
  var f = fn();
  n = n === void 0 ? null : n;
  var l = f.memoizedState;
  if (l !== null && n !== null && x2(n, l[1])) return l[0];
  return ((u = u()), (f.memoizedState = [u, n]), u);
}
function H5(u, n, f) {
  if ((d0 & 21) === 0)
    return (
      u.baseState && ((u.baseState = !1), (Pu = !0)),
      (u.memoizedState = f)
    );
  return (
    Un(f, n) || ((f = F8()), (m.lanes |= f), (j0 |= f), (u.baseState = !0)),
    n
  );
}
function c$(u, n) {
  var f = k;
  ((k = f !== 0 && 4 > f ? f : 4), u(!0));
  var l = Wh.transition;
  Wh.transition = {};
  try {
    (u(!1), n());
  } finally {
    ((k = f), (Wh.transition = l));
  }
}
function I5() {
  return fn().memoizedState;
}
function h$(u, n, f) {
  var l = w0(u);
  if (
    ((f = {
      lane: l,
      action: f,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    X5(u))
  )
    L5(n, f);
  else if (((f = f5(u, n, f, l)), f !== null)) {
    var t = Su();
    ($n(f, u, l, t), O5(f, n, l));
  }
}
function w$(u, n, f) {
  var l = w0(u),
    t = { lane: l, action: f, hasEagerState: !1, eagerState: null, next: null };
  if (X5(u)) L5(n, t);
  else {
    var r = u.alternate;
    if (
      u.lanes === 0 &&
      (r === null || r.lanes === 0) &&
      ((r = n.lastRenderedReducer), r !== null)
    )
      try {
        var c = n.lastRenderedState,
          h = r(c, f);
        if (((t.hasEagerState = !0), (t.eagerState = h), Un(h, c))) {
          var w = n.interleaved;
          (w === null
            ? ((t.next = t), g2(n))
            : ((t.next = w.next), (w.next = t)),
            (n.interleaved = t));
          return;
        }
      } catch (z) {
      } finally {
      }
    ((f = f5(u, n, t, l)),
      f !== null && ((t = Su()), $n(f, u, l, t), O5(f, n, l)));
  }
}
function X5(u) {
  var n = u.alternate;
  return u === m || (n !== null && n === m);
}
function L5(u, n) {
  pl = bt = !0;
  var f = u.pending;
  (f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
    (u.pending = n));
}
function O5(u, n, f) {
  if ((f & 4194240) !== 0) {
    var l = n.lanes;
    ((l &= u.pendingLanes), (f |= l), (n.lanes = f), F2(u, f));
  }
}
function zn(u, n) {
  if (u && u.defaultProps) {
    ((n = e({}, n)), (u = u.defaultProps));
    for (var f in u) n[f] === void 0 && (n[f] = u[f]);
    return n;
  }
  return n;
}
function u2(u, n, f, l) {
  ((n = u.memoizedState),
    (f = f(l, n)),
    (f = f === null || f === void 0 ? n : e({}, n, f)),
    (u.memoizedState = f),
    u.lanes === 0 && (u.updateQueue.baseState = f));
}
function P4(u, n, f, l, t, r, c) {
  return (
    (u = u.stateNode),
    typeof u.shouldComponentUpdate === 'function'
      ? u.shouldComponentUpdate(l, r, c)
      : n.prototype && n.prototype.isPureReactComponent
        ? !t1(f, l) || !t1(t, r)
        : !0
  );
}
function F5(u, n, f) {
  var l = !1,
    t = N0,
    r = n.contextType;
  return (
    typeof r === 'object' && r !== null
      ? (r = nn(r))
      : ((t = Ru(n) ? g0 : Lu.current),
        (l = n.contextTypes),
        (r = (l = l !== null && l !== void 0) ? Kf(u, t) : N0)),
    (n = new n(f, r)),
    (u.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
    (n.updater = zr),
    (u.stateNode = n),
    (n._reactInternals = u),
    l &&
      ((u = u.stateNode),
      (u.__reactInternalMemoizedUnmaskedChildContext = t),
      (u.__reactInternalMemoizedMaskedChildContext = r)),
    n
  );
}
function A4(u, n, f, l) {
  ((u = n.state),
    typeof n.componentWillReceiveProps === 'function' &&
      n.componentWillReceiveProps(f, l),
    typeof n.UNSAFE_componentWillReceiveProps === 'function' &&
      n.UNSAFE_componentWillReceiveProps(f, l),
    n.state !== u && zr.enqueueReplaceState(n, n.state, null));
}
function n2(u, n, f, l) {
  var t = u.stateNode;
  ((t.props = f), (t.state = u.memoizedState), (t.refs = {}), T2(u));
  var r = n.contextType;
  (typeof r === 'object' && r !== null
    ? (t.context = nn(r))
    : ((r = Ru(n) ? g0 : Lu.current), (t.context = Kf(u, r))),
    (t.state = u.memoizedState),
    (r = n.getDerivedStateFromProps),
    typeof r === 'function' && (u2(u, n, r, f), (t.state = u.memoizedState)),
    typeof n.getDerivedStateFromProps === 'function' ||
      typeof t.getSnapshotBeforeUpdate === 'function' ||
      (typeof t.UNSAFE_componentWillMount !== 'function' &&
        typeof t.componentWillMount !== 'function') ||
      ((n = t.state),
      typeof t.componentWillMount === 'function' && t.componentWillMount(),
      typeof t.UNSAFE_componentWillMount === 'function' &&
        t.UNSAFE_componentWillMount(),
      n !== t.state && zr.enqueueReplaceState(t, t.state, null),
      pt(u, f, t, l),
      (t.state = u.memoizedState)),
    typeof t.componentDidMount === 'function' && (u.flags |= 4194308));
}
function kf(u, n) {
  try {
    var f = '',
      l = n;
    do ((f += jN(l)), (l = l.return));
    while (l);
    var t = f;
  } catch (r) {
    t =
      `
Error generating stack: ` +
      r.message +
      `
` +
      r.stack;
  }
  return { value: u, source: n, stack: t, digest: null };
}
function Yh(u, n, f) {
  return {
    value: u,
    source: null,
    stack: f != null ? f : null,
    digest: n != null ? n : null,
  };
}
function f2(u, n) {
  try {
    console.error(n.value);
  } catch (f) {
    setTimeout(function () {
      throw f;
    });
  }
}
function E5(u, n, f) {
  ((f = Kn(-1, f)), (f.tag = 3), (f.payload = { element: null }));
  var l = n.value;
  return (
    (f.callback = function () {
      (st || ((st = !0), (Q2 = l)), f2(u, n));
    }),
    f
  );
}
function q5(u, n, f) {
  ((f = Kn(-1, f)), (f.tag = 3));
  var l = u.type.getDerivedStateFromError;
  if (typeof l === 'function') {
    var t = n.value;
    ((f.payload = function () {
      return l(t);
    }),
      (f.callback = function () {
        f2(u, n);
      }));
  }
  var r = u.stateNode;
  return (
    r !== null &&
      typeof r.componentDidCatch === 'function' &&
      (f.callback = function () {
        (f2(u, n),
          typeof l !== 'function' &&
            (h0 === null ? (h0 = new Set([this])) : h0.add(this)));
        var c = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: c !== null ? c : '',
        });
      }),
    f
  );
}
function R4(u, n, f) {
  var l = u.pingCache;
  if (l === null) {
    l = u.pingCache = new Q$();
    var t = new Set();
    l.set(n, t);
  } else ((t = l.get(n)), t === void 0 && ((t = new Set()), l.set(n, t)));
  t.has(f) || (t.add(f), (u = q$.bind(null, u, n, f)), n.then(u, u));
}
function k4(u) {
  do {
    var n;
    if ((n = u.tag === 13))
      ((n = u.memoizedState),
        (n = n !== null ? (n.dehydrated !== null ? !0 : !1) : !0));
    if (n) return u;
    u = u.return;
  } while (u !== null);
  return null;
}
function g4(u, n, f, l, t) {
  if ((u.mode & 1) === 0)
    return (
      u === n
        ? (u.flags |= 65536)
        : ((u.flags |= 128),
          (f.flags |= 131072),
          (f.flags &= -52805),
          f.tag === 1 &&
            (f.alternate === null
              ? (f.tag = 17)
              : ((n = Kn(-1, 1)), (n.tag = 2), c0(f, n, 1))),
          (f.lanes |= 1)),
      u
    );
  return ((u.flags |= 65536), (u.lanes = t), u);
}
function Mu(u, n, f, l) {
  n.child = u === null ? n5(n, null, f, l) : Af(n, u.child, f, l);
}
function T4(u, n, f, l, t) {
  f = f.render;
  var r = n.ref;
  if ((Gf(n, t), (l = V2(u, n, f, l, r, t)), (f = v2()), u !== null && !Pu))
    return (
      (n.updateQueue = u.updateQueue),
      (n.flags &= -2053),
      (u.lanes &= ~t),
      kn(u, n, t)
    );
  return (p && f && D2(n), (n.flags |= 1), Mu(u, n, l, t), n.child);
}
function d4(u, n, f, l, t) {
  if (u === null) {
    var r = f.type;
    if (
      typeof r === 'function' &&
      !nw(r) &&
      r.defaultProps === void 0 &&
      f.compare === null &&
      f.defaultProps === void 0
    )
      return ((n.tag = 15), (n.type = r), M5(u, n, r, l, t));
    return (
      (u = Ct(f.type, null, l, n, n.mode, t)),
      (u.ref = n.ref),
      (u.return = n),
      (n.child = u)
    );
  }
  if (((r = u.child), (u.lanes & t) === 0)) {
    var c = r.memoizedProps;
    if (
      ((f = f.compare), (f = f !== null ? f : t1), f(c, l) && u.ref === n.ref)
    )
      return kn(u, n, t);
  }
  return (
    (n.flags |= 1),
    (u = z0(r, l)),
    (u.ref = n.ref),
    (u.return = n),
    (n.child = u)
  );
}
function M5(u, n, f, l, t) {
  if (u !== null) {
    var r = u.memoizedProps;
    if (t1(r, l) && u.ref === n.ref)
      if (((Pu = !1), (n.pendingProps = l = r), (u.lanes & t) !== 0))
        (u.flags & 131072) !== 0 && (Pu = !0);
      else return ((n.lanes = u.lanes), kn(u, n, t));
  }
  return l2(u, n, f, l, t);
}
function S5(u, n, f) {
  var l = n.pendingProps,
    t = l.children,
    r = u !== null ? u.memoizedState : null;
  if (l.mode === 'hidden')
    if ((n.mode & 1) === 0)
      ((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        d(Ef, ju),
        (ju |= f));
    else {
      if ((f & 1073741824) === 0)
        return (
          (u = r !== null ? r.baseLanes | f : f),
          (n.lanes = n.childLanes = 1073741824),
          (n.memoizedState = {
            baseLanes: u,
            cachePool: null,
            transitions: null,
          }),
          (n.updateQueue = null),
          d(Ef, ju),
          (ju |= u),
          null
        );
      ((n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (l = r !== null ? r.baseLanes : f),
        d(Ef, ju),
        (ju |= l));
    }
  else
    (r !== null ? ((l = r.baseLanes | f), (n.memoizedState = null)) : (l = f),
      d(Ef, ju),
      (ju |= l));
  return (Mu(u, n, t, f), n.child);
}
function B5(u, n) {
  var f = n.ref;
  if ((u === null && f !== null) || (u !== null && u.ref !== f))
    ((n.flags |= 512), (n.flags |= 2097152));
}
function l2(u, n, f, l, t) {
  var r = Ru(f) ? g0 : Lu.current;
  if (
    ((r = Kf(n, r)),
    Gf(n, t),
    (f = V2(u, n, f, l, r, t)),
    (l = v2()),
    u !== null && !Pu)
  )
    return (
      (n.updateQueue = u.updateQueue),
      (n.flags &= -2053),
      (u.lanes &= ~t),
      kn(u, n, t)
    );
  return (p && l && D2(n), (n.flags |= 1), Mu(u, n, f, t), n.child);
}
function j4(u, n, f, l, t) {
  if (Ru(f)) {
    var r = !0;
    ot(n);
  } else r = !1;
  if ((Gf(n, t), n.stateNode === null))
    (St(u, n), F5(n, f, l), n2(n, f, l, t), (l = !0));
  else if (u === null) {
    var { stateNode: c, memoizedProps: h } = n;
    c.props = h;
    var w = c.context,
      z = f.contextType;
    typeof z === 'object' && z !== null
      ? (z = nn(z))
      : ((z = Ru(f) ? g0 : Lu.current), (z = Kf(n, z)));
    var _ = f.getDerivedStateFromProps,
      N =
        typeof _ === 'function' ||
        typeof c.getSnapshotBeforeUpdate === 'function';
    (N ||
      (typeof c.UNSAFE_componentWillReceiveProps !== 'function' &&
        typeof c.componentWillReceiveProps !== 'function') ||
      ((h !== l || w !== z) && A4(n, c, l, z)),
      (en = !1));
    var Q = n.memoizedState;
    ((c.state = Q),
      pt(n, l, c, t),
      (w = n.memoizedState),
      h !== l || Q !== w || Au.current || en
        ? (typeof _ === 'function' && (u2(n, f, _, l), (w = n.memoizedState)),
          (h = en || P4(n, f, h, l, Q, w, z))
            ? (N ||
                (typeof c.UNSAFE_componentWillMount !== 'function' &&
                  typeof c.componentWillMount !== 'function') ||
                (typeof c.componentWillMount === 'function' &&
                  c.componentWillMount(),
                typeof c.UNSAFE_componentWillMount === 'function' &&
                  c.UNSAFE_componentWillMount()),
              typeof c.componentDidMount === 'function' && (n.flags |= 4194308))
            : (typeof c.componentDidMount === 'function' &&
                (n.flags |= 4194308),
              (n.memoizedProps = l),
              (n.memoizedState = w)),
          (c.props = l),
          (c.state = w),
          (c.context = z),
          (l = h))
        : (typeof c.componentDidMount === 'function' && (n.flags |= 4194308),
          (l = !1)));
  } else {
    ((c = n.stateNode),
      l5(u, n),
      (h = n.memoizedProps),
      (z = n.type === n.elementType ? h : zn(n.type, h)),
      (c.props = z),
      (N = n.pendingProps),
      (Q = c.context),
      (w = f.contextType),
      typeof w === 'object' && w !== null
        ? (w = nn(w))
        : ((w = Ru(f) ? g0 : Lu.current), (w = Kf(n, w))));
    var Z = f.getDerivedStateFromProps;
    ((_ =
      typeof Z === 'function' ||
      typeof c.getSnapshotBeforeUpdate === 'function') ||
      (typeof c.UNSAFE_componentWillReceiveProps !== 'function' &&
        typeof c.componentWillReceiveProps !== 'function') ||
      ((h !== N || Q !== w) && A4(n, c, l, w)),
      (en = !1),
      (Q = n.memoizedState),
      (c.state = Q),
      pt(n, l, c, t));
    var Y = n.memoizedState;
    h !== N || Q !== Y || Au.current || en
      ? (typeof Z === 'function' && (u2(n, f, Z, l), (Y = n.memoizedState)),
        (z = en || P4(n, f, z, l, Q, Y, w) || !1)
          ? (_ ||
              (typeof c.UNSAFE_componentWillUpdate !== 'function' &&
                typeof c.componentWillUpdate !== 'function') ||
              (typeof c.componentWillUpdate === 'function' &&
                c.componentWillUpdate(l, Y, w),
              typeof c.UNSAFE_componentWillUpdate === 'function' &&
                c.UNSAFE_componentWillUpdate(l, Y, w)),
            typeof c.componentDidUpdate === 'function' && (n.flags |= 4),
            typeof c.getSnapshotBeforeUpdate === 'function' &&
              (n.flags |= 1024))
          : (typeof c.componentDidUpdate !== 'function' ||
              (h === u.memoizedProps && Q === u.memoizedState) ||
              (n.flags |= 4),
            typeof c.getSnapshotBeforeUpdate !== 'function' ||
              (h === u.memoizedProps && Q === u.memoizedState) ||
              (n.flags |= 1024),
            (n.memoizedProps = l),
            (n.memoizedState = Y)),
        (c.props = l),
        (c.state = Y),
        (c.context = w),
        (l = z))
      : (typeof c.componentDidUpdate !== 'function' ||
          (h === u.memoizedProps && Q === u.memoizedState) ||
          (n.flags |= 4),
        typeof c.getSnapshotBeforeUpdate !== 'function' ||
          (h === u.memoizedProps && Q === u.memoizedState) ||
          (n.flags |= 1024),
        (l = !1));
  }
  return t2(u, n, f, l, r, t);
}
function t2(u, n, f, l, t, r) {
  B5(u, n);
  var c = (n.flags & 128) !== 0;
  if (!l && !c) return (t && q4(n, f, !1), kn(u, n, r));
  ((l = n.stateNode), ($$.current = n));
  var h =
    c && typeof f.getDerivedStateFromError !== 'function' ? null : l.render();
  return (
    (n.flags |= 1),
    u !== null && c
      ? ((n.child = Af(n, u.child, null, r)), (n.child = Af(n, null, h, r)))
      : Mu(u, n, h, r),
    (n.memoizedState = l.state),
    t && q4(n, f, !0),
    n.child
  );
}
function G5(u) {
  var n = u.stateNode;
  (n.pendingContext
    ? E4(u, n.pendingContext, n.pendingContext !== n.context)
    : n.context && E4(u, n.context, !1),
    d2(u, n.containerInfo));
}
function o4(u, n, f, l, t) {
  return (Pf(), P2(t), (n.flags |= 256), Mu(u, n, f, l), n.child);
}
function c2(u) {
  return { baseLanes: u, cachePool: null, transitions: null };
}
function C5(u, n, f) {
  var l = n.pendingProps,
    t = b.current,
    r = !1,
    c = (n.flags & 128) !== 0,
    h;
  if (
    ((h = c) ||
      (h = u !== null && u.memoizedState === null ? !1 : (t & 2) !== 0),
    h)
  )
    ((r = !0), (n.flags &= -129));
  else if (u === null || u.memoizedState !== null) t |= 1;
  if ((d(b, t & 1), u === null)) {
    if (
      (sh(n),
      (u = n.memoizedState),
      u !== null && ((u = u.dehydrated), u !== null))
    )
      return (
        (n.mode & 1) === 0
          ? (n.lanes = 1)
          : u.data === '$!'
            ? (n.lanes = 8)
            : (n.lanes = 1073741824),
        null
      );
    return (
      (c = l.children),
      (u = l.fallback),
      r
        ? ((l = n.mode),
          (r = n.child),
          (c = { mode: 'hidden', children: c }),
          (l & 1) === 0 && r !== null
            ? ((r.childLanes = 0), (r.pendingProps = c))
            : (r = Qr(c, l, 0, null)),
          (u = k0(u, l, f, null)),
          (r.return = n),
          (u.return = n),
          (r.sibling = u),
          (n.child = r),
          (n.child.memoizedState = c2(f)),
          (n.memoizedState = r2),
          u)
        : i2(n, c)
    );
  }
  if (((t = u.memoizedState), t !== null && ((h = t.dehydrated), h !== null)))
    return U$(u, n, c, l, h, t, f);
  if (r) {
    ((r = l.fallback), (c = n.mode), (t = u.child), (h = t.sibling));
    var w = { mode: 'hidden', children: l.children };
    return (
      (c & 1) === 0 && n.child !== t
        ? ((l = n.child),
          (l.childLanes = 0),
          (l.pendingProps = w),
          (n.deletions = null))
        : ((l = z0(t, w)), (l.subtreeFlags = t.subtreeFlags & 14680064)),
      h !== null ? (r = z0(h, r)) : ((r = k0(r, c, f, null)), (r.flags |= 2)),
      (r.return = n),
      (l.return = n),
      (l.sibling = r),
      (n.child = l),
      (l = r),
      (r = n.child),
      (c = u.child.memoizedState),
      (c =
        c === null
          ? c2(f)
          : {
              baseLanes: c.baseLanes | f,
              cachePool: null,
              transitions: c.transitions,
            }),
      (r.memoizedState = c),
      (r.childLanes = u.childLanes & ~f),
      (n.memoizedState = r2),
      l
    );
  }
  return (
    (r = u.child),
    (u = r.sibling),
    (l = z0(r, { mode: 'visible', children: l.children })),
    (n.mode & 1) === 0 && (l.lanes = f),
    (l.return = n),
    (l.sibling = null),
    u !== null &&
      ((f = n.deletions),
      f === null ? ((n.deletions = [u]), (n.flags |= 16)) : f.push(u)),
    (n.child = l),
    (n.memoizedState = null),
    l
  );
}
function i2(u, n) {
  return (
    (n = Qr({ mode: 'visible', children: n }, u.mode, 0, null)),
    (n.return = u),
    (u.child = n)
  );
}
function Yt(u, n, f, l) {
  return (
    l !== null && P2(l),
    Af(n, u.child, null, f),
    (u = i2(n, n.pendingProps.children)),
    (u.flags |= 2),
    (n.memoizedState = null),
    u
  );
}
function U$(u, n, f, l, t, r, c) {
  if (f) {
    if (n.flags & 256)
      return ((n.flags &= -257), (l = Yh(Error(L(422)))), Yt(u, n, c, l));
    if (n.memoizedState !== null)
      return ((n.child = u.child), (n.flags |= 128), null);
    return (
      (r = l.fallback),
      (t = n.mode),
      (l = Qr({ mode: 'visible', children: l.children }, t, 0, null)),
      (r = k0(r, t, c, null)),
      (r.flags |= 2),
      (l.return = n),
      (r.return = n),
      (l.sibling = r),
      (n.child = l),
      (n.mode & 1) !== 0 && Af(n, u.child, null, c),
      (n.child.memoizedState = c2(c)),
      (n.memoizedState = r2),
      r
    );
  }
  if ((n.mode & 1) === 0) return Yt(u, n, c, null);
  if (t.data === '$!') {
    if (((l = t.nextSibling && t.nextSibling.dataset), l)) var h = l.dgst;
    return (
      (l = h),
      (r = Error(L(419))),
      (l = Yh(r, l, void 0)),
      Yt(u, n, c, l)
    );
  }
  if (((h = (c & u.childLanes) !== 0), Pu || h)) {
    if (((l = zu), l !== null)) {
      switch (c & -c) {
        case 4:
          t = 2;
          break;
        case 16:
          t = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          t = 32;
          break;
        case 536870912:
          t = 268435456;
          break;
        default:
          t = 0;
      }
      ((t = (t & (l.suspendedLanes | c)) !== 0 ? 0 : t),
        t !== 0 &&
          t !== r.retryLane &&
          ((r.retryLane = t), Rn(u, t), $n(l, u, t, -1)));
    }
    return (uw(), (l = Yh(Error(L(421)))), Yt(u, n, c, l));
  }
  if (t.data === '$?')
    return (
      (n.flags |= 128),
      (n.child = u.child),
      (n = M$.bind(null, u)),
      (t._reactRetry = n),
      null
    );
  return (
    (u = r.treeContext),
    (ou = r0(t.nextSibling)),
    (xu = n),
    (p = !0),
    (Nn = null),
    u !== null &&
      ((eu[su++] = Cn),
      (eu[su++] = Dn),
      (eu[su++] = T0),
      (Cn = u.id),
      (Dn = u.overflow),
      (T0 = n)),
    (n = i2(n, l.children)),
    (n.flags |= 4096),
    n
  );
}
function x4(u, n, f) {
  u.lanes |= n;
  var l = u.alternate;
  (l !== null && (l.lanes |= n), ah(u.return, n, f));
}
function Hh(u, n, f, l, t) {
  var r = u.memoizedState;
  r === null
    ? (u.memoizedState = {
        isBackwards: n,
        rendering: null,
        renderingStartTime: 0,
        last: l,
        tail: f,
        tailMode: t,
      })
    : ((r.isBackwards = n),
      (r.rendering = null),
      (r.renderingStartTime = 0),
      (r.last = l),
      (r.tail = f),
      (r.tailMode = t));
}
function D5(u, n, f) {
  var l = n.pendingProps,
    t = l.revealOrder,
    r = l.tail;
  if ((Mu(u, n, l.children, f), (l = b.current), (l & 2) !== 0))
    ((l = (l & 1) | 2), (n.flags |= 128));
  else {
    if (u !== null && (u.flags & 128) !== 0)
      u: for (u = n.child; u !== null; ) {
        if (u.tag === 13) u.memoizedState !== null && x4(u, f, n);
        else if (u.tag === 19) x4(u, f, n);
        else if (u.child !== null) {
          ((u.child.return = u), (u = u.child));
          continue;
        }
        if (u === n) break u;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === n) break u;
          u = u.return;
        }
        ((u.sibling.return = u.return), (u = u.sibling));
      }
    l &= 1;
  }
  if ((d(b, l), (n.mode & 1) === 0)) n.memoizedState = null;
  else
    switch (t) {
      case 'forwards':
        f = n.child;
        for (t = null; f !== null; )
          ((u = f.alternate),
            u !== null && it(u) === null && (t = f),
            (f = f.sibling));
        ((f = t),
          f === null
            ? ((t = n.child), (n.child = null))
            : ((t = f.sibling), (f.sibling = null)),
          Hh(n, !1, t, f, r));
        break;
      case 'backwards':
        ((f = null), (t = n.child));
        for (n.child = null; t !== null; ) {
          if (((u = t.alternate), u !== null && it(u) === null)) {
            n.child = t;
            break;
          }
          ((u = t.sibling), (t.sibling = f), (f = t), (t = u));
        }
        Hh(n, !0, f, null, r);
        break;
      case 'together':
        Hh(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
  return n.child;
}
function St(u, n) {
  (n.mode & 1) === 0 &&
    u !== null &&
    ((u.alternate = null), (n.alternate = null), (n.flags |= 2));
}
function kn(u, n, f) {
  if (
    (u !== null && (n.dependencies = u.dependencies),
    (j0 |= n.lanes),
    (f & n.childLanes) === 0)
  )
    return null;
  if (u !== null && n.child !== u.child) throw Error(L(153));
  if (n.child !== null) {
    ((u = n.child), (f = z0(u, u.pendingProps)), (n.child = f));
    for (f.return = n; u.sibling !== null; )
      ((u = u.sibling),
        (f = f.sibling = z0(u, u.pendingProps)),
        (f.return = n));
    f.sibling = null;
  }
  return n.child;
}
function W$(u, n, f) {
  switch (n.tag) {
    case 3:
      (G5(n), Pf());
      break;
    case 5:
      t5(n);
      break;
    case 1:
      Ru(n.type) && ot(n);
      break;
    case 4:
      d2(n, n.stateNode.containerInfo);
      break;
    case 10:
      var l = n.type._context,
        t = n.memoizedProps.value;
      (d(vt, l._currentValue), (l._currentValue = t));
      break;
    case 13:
      if (((l = n.memoizedState), l !== null)) {
        if (l.dehydrated !== null)
          return (d(b, b.current & 1), (n.flags |= 128), null);
        if ((f & n.child.childLanes) !== 0) return C5(u, n, f);
        return (
          d(b, b.current & 1),
          (u = kn(u, n, f)),
          u !== null ? u.sibling : null
        );
      }
      d(b, b.current & 1);
      break;
    case 19:
      if (((l = (f & n.childLanes) !== 0), (u.flags & 128) !== 0)) {
        if (l) return D5(u, n, f);
        n.flags |= 128;
      }
      if (
        ((t = n.memoizedState),
        t !== null &&
          ((t.rendering = null), (t.tail = null), (t.lastEffect = null)),
        d(b, b.current),
        l)
      )
        break;
      else return null;
    case 22:
    case 23:
      return ((n.lanes = 0), S5(u, n, f));
  }
  return kn(u, n, f);
}
function Dl(u, n) {
  if (!p)
    switch (u.tailMode) {
      case 'hidden':
        n = u.tail;
        for (var f = null; n !== null; )
          (n.alternate !== null && (f = n), (n = n.sibling));
        f === null ? (u.tail = null) : (f.sibling = null);
        break;
      case 'collapsed':
        f = u.tail;
        for (var l = null; f !== null; )
          (f.alternate !== null && (l = f), (f = f.sibling));
        l === null
          ? n || u.tail === null
            ? (u.tail = null)
            : (u.tail.sibling = null)
          : (l.sibling = null);
    }
}
function Iu(u) {
  var n = u.alternate !== null && u.alternate.child === u.child,
    f = 0,
    l = 0;
  if (n)
    for (var t = u.child; t !== null; )
      ((f |= t.lanes | t.childLanes),
        (l |= t.subtreeFlags & 14680064),
        (l |= t.flags & 14680064),
        (t.return = u),
        (t = t.sibling));
  else
    for (t = u.child; t !== null; )
      ((f |= t.lanes | t.childLanes),
        (l |= t.subtreeFlags),
        (l |= t.flags),
        (t.return = u),
        (t = t.sibling));
  return ((u.subtreeFlags |= l), (u.childLanes = f), n);
}
function Z$(u, n, f) {
  var l = n.pendingProps;
  switch ((K2(n), n.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (Iu(n), null);
    case 1:
      return (Ru(n.type) && jt(), Iu(n), null);
    case 3:
      if (
        ((l = n.stateNode),
        Rf(),
        x(Au),
        x(Lu),
        o2(),
        l.pendingContext &&
          ((l.context = l.pendingContext), (l.pendingContext = null)),
        u === null || u.child === null)
      )
        Zt(n)
          ? (n.flags |= 4)
          : u === null ||
            (u.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
            ((n.flags |= 1024), Nn !== null && (W2(Nn), (Nn = null)));
      return (h2(u, n), Iu(n), null);
    case 5:
      j2(n);
      var t = A0(z1.current);
      if (((f = n.type), u !== null && n.stateNode != null))
        (P5(u, n, f, l, t),
          u.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152)));
      else {
        if (!l) {
          if (n.stateNode === null) throw Error(L(166));
          return (Iu(n), null);
        }
        if (((u = A0(In.current)), Zt(n))) {
          ((l = n.stateNode), (f = n.type));
          var r = n.memoizedProps;
          switch (((l[Yn] = n), (l[h1] = r), (u = (n.mode & 1) !== 0), f)) {
            case 'dialog':
              (o('cancel', l), o('close', l));
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              o('load', l);
              break;
            case 'video':
            case 'audio':
              for (t = 0; t < jl.length; t++) o(jl[t], l);
              break;
            case 'source':
              o('error', l);
              break;
            case 'img':
            case 'image':
            case 'link':
              (o('error', l), o('load', l));
              break;
            case 'details':
              o('toggle', l);
              break;
            case 'input':
              (a3(l, r), o('invalid', l));
              break;
            case 'select':
              ((l._wrapperState = { wasMultiple: !!r.multiple }),
                o('invalid', l));
              break;
            case 'textarea':
              (n4(l, r), o('invalid', l));
          }
          (Dh(f, r), (t = null));
          for (var c in r)
            if (r.hasOwnProperty(c)) {
              var h = r[c];
              c === 'children'
                ? typeof h === 'string'
                  ? l.textContent !== h &&
                    (r.suppressHydrationWarning !== !0 &&
                      Wt(l.textContent, h, u),
                    (t = ['children', h]))
                  : typeof h === 'number' &&
                    l.textContent !== '' + h &&
                    (r.suppressHydrationWarning !== !0 &&
                      Wt(l.textContent, h, u),
                    (t = ['children', '' + h]))
                : el.hasOwnProperty(c) &&
                  h != null &&
                  c === 'onScroll' &&
                  o('scroll', l);
            }
          switch (f) {
            case 'input':
              (ht(l), u4(l, r, !0));
              break;
            case 'textarea':
              (ht(l), f4(l));
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof r.onClick === 'function' && (l.onclick = dt);
          }
          ((l = t), (n.updateQueue = l), l !== null && (n.flags |= 4));
        } else {
          ((c = t.nodeType === 9 ? t : t.ownerDocument),
            u === 'http://www.w3.org/1999/xhtml' && (u = z8(f)),
            u === 'http://www.w3.org/1999/xhtml'
              ? f === 'script'
                ? ((u = c.createElement('div')),
                  (u.innerHTML = '<script></script>'),
                  (u = u.removeChild(u.firstChild)))
                : typeof l.is === 'string'
                  ? (u = c.createElement(f, { is: l.is }))
                  : ((u = c.createElement(f)),
                    f === 'select' &&
                      ((c = u),
                      l.multiple
                        ? (c.multiple = !0)
                        : l.size && (c.size = l.size)))
              : (u = c.createElementNS(u, f)),
            (u[Yn] = n),
            (u[h1] = l),
            K5(u, n, !1, !1),
            (n.stateNode = u));
          u: {
            switch (((c = Kh(f, l)), f)) {
              case 'dialog':
                (o('cancel', u), o('close', u), (t = l));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                (o('load', u), (t = l));
                break;
              case 'video':
              case 'audio':
                for (t = 0; t < jl.length; t++) o(jl[t], u);
                t = l;
                break;
              case 'source':
                (o('error', u), (t = l));
                break;
              case 'img':
              case 'image':
              case 'link':
                (o('error', u), o('load', u), (t = l));
                break;
              case 'details':
                (o('toggle', u), (t = l));
                break;
              case 'input':
                (a3(u, l), (t = Mh(u, l)), o('invalid', u));
                break;
              case 'option':
                t = l;
                break;
              case 'select':
                ((u._wrapperState = { wasMultiple: !!l.multiple }),
                  (t = e({}, l, { value: void 0 })),
                  o('invalid', u));
                break;
              case 'textarea':
                (n4(u, l), (t = Gh(u, l)), o('invalid', u));
                break;
              default:
                t = l;
            }
            (Dh(f, t), (h = t));
            for (r in h)
              if (h.hasOwnProperty(r)) {
                var w = h[r];
                r === 'style'
                  ? Q8(u, w)
                  : r === 'dangerouslySetInnerHTML'
                    ? ((w = w ? w.__html : void 0), w != null && _8(u, w))
                    : r === 'children'
                      ? typeof w === 'string'
                        ? (f !== 'textarea' || w !== '') && sl(u, w)
                        : typeof w === 'number' && sl(u, '' + w)
                      : r !== 'suppressContentEditableWarning' &&
                        r !== 'suppressHydrationWarning' &&
                        r !== 'autoFocus' &&
                        (el.hasOwnProperty(r)
                          ? w != null && r === 'onScroll' && o('scroll', u)
                          : w != null && Y2(u, r, w, c));
              }
            switch (f) {
              case 'input':
                (ht(u), u4(u, l, !1));
                break;
              case 'textarea':
                (ht(u), f4(u));
                break;
              case 'option':
                l.value != null && u.setAttribute('value', '' + _0(l.value));
                break;
              case 'select':
                ((u.multiple = !!l.multiple),
                  (r = l.value),
                  r != null
                    ? qf(u, !!l.multiple, r, !1)
                    : l.defaultValue != null &&
                      qf(u, !!l.multiple, l.defaultValue, !0));
                break;
              default:
                typeof t.onClick === 'function' && (u.onclick = dt);
            }
            switch (f) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                l = !!l.autoFocus;
                break u;
              case 'img':
                l = !0;
                break u;
              default:
                l = !1;
            }
          }
          l && (n.flags |= 4);
        }
        n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152));
      }
      return (Iu(n), null);
    case 6:
      if (u && n.stateNode != null) A5(u, n, u.memoizedProps, l);
      else {
        if (typeof l !== 'string' && n.stateNode === null) throw Error(L(166));
        if (((f = A0(z1.current)), A0(In.current), Zt(n))) {
          if (
            ((l = n.stateNode),
            (f = n.memoizedProps),
            (l[Yn] = n),
            (r = l.nodeValue !== f))
          ) {
            if (((u = xu), u !== null))
              switch (u.tag) {
                case 3:
                  Wt(l.nodeValue, f, (u.mode & 1) !== 0);
                  break;
                case 5:
                  u.memoizedProps.suppressHydrationWarning !== !0 &&
                    Wt(l.nodeValue, f, (u.mode & 1) !== 0);
              }
          }
          r && (n.flags |= 4);
        } else
          ((l = (f.nodeType === 9 ? f : f.ownerDocument).createTextNode(l)),
            (l[Yn] = n),
            (n.stateNode = l));
      }
      return (Iu(n), null);
    case 13:
      if (
        (x(b),
        (l = n.memoizedState),
        u === null ||
          (u.memoizedState !== null && u.memoizedState.dehydrated !== null))
      ) {
        if (p && ou !== null && (n.mode & 1) !== 0 && (n.flags & 128) === 0)
          (a8(), Pf(), (n.flags |= 98560), (r = !1));
        else if (((r = Zt(n)), l !== null && l.dehydrated !== null)) {
          if (u === null) {
            if (!r) throw Error(L(318));
            if (
              ((r = n.memoizedState),
              (r = r !== null ? r.dehydrated : null),
              !r)
            )
              throw Error(L(317));
            r[Yn] = n;
          } else
            (Pf(),
              (n.flags & 128) === 0 && (n.memoizedState = null),
              (n.flags |= 4));
          (Iu(n), (r = !1));
        } else (Nn !== null && (W2(Nn), (Nn = null)), (r = !0));
        if (!r) return n.flags & 65536 ? n : null;
      }
      if ((n.flags & 128) !== 0) return ((n.lanes = f), n);
      return (
        (l = l !== null),
        l !== (u !== null && u.memoizedState !== null) &&
          l &&
          ((n.child.flags |= 8192),
          (n.mode & 1) !== 0 &&
            (u === null || (b.current & 1) !== 0
              ? hu === 0 && (hu = 3)
              : uw())),
        n.updateQueue !== null && (n.flags |= 4),
        Iu(n),
        null
      );
    case 4:
      return (
        Rf(),
        h2(u, n),
        u === null && r1(n.stateNode.containerInfo),
        Iu(n),
        null
      );
    case 10:
      return (k2(n.type._context), Iu(n), null);
    case 17:
      return (Ru(n.type) && jt(), Iu(n), null);
    case 19:
      if ((x(b), (r = n.memoizedState), r === null)) return (Iu(n), null);
      if (((l = (n.flags & 128) !== 0), (c = r.rendering), c === null))
        if (l) Dl(r, !1);
        else {
          if (hu !== 0 || (u !== null && (u.flags & 128) !== 0))
            for (u = n.child; u !== null; ) {
              if (((c = it(u)), c !== null)) {
                ((n.flags |= 128),
                  Dl(r, !1),
                  (l = c.updateQueue),
                  l !== null && ((n.updateQueue = l), (n.flags |= 4)),
                  (n.subtreeFlags = 0),
                  (l = f));
                for (f = n.child; f !== null; )
                  ((r = f),
                    (u = l),
                    (r.flags &= 14680066),
                    (c = r.alternate),
                    c === null
                      ? ((r.childLanes = 0),
                        (r.lanes = u),
                        (r.child = null),
                        (r.subtreeFlags = 0),
                        (r.memoizedProps = null),
                        (r.memoizedState = null),
                        (r.updateQueue = null),
                        (r.dependencies = null),
                        (r.stateNode = null))
                      : ((r.childLanes = c.childLanes),
                        (r.lanes = c.lanes),
                        (r.child = c.child),
                        (r.subtreeFlags = 0),
                        (r.deletions = null),
                        (r.memoizedProps = c.memoizedProps),
                        (r.memoizedState = c.memoizedState),
                        (r.updateQueue = c.updateQueue),
                        (r.type = c.type),
                        (u = c.dependencies),
                        (r.dependencies =
                          u === null
                            ? null
                            : {
                                lanes: u.lanes,
                                firstContext: u.firstContext,
                              })),
                    (f = f.sibling));
                return (d(b, (b.current & 1) | 2), n.child);
              }
              u = u.sibling;
            }
          r.tail !== null &&
            a() > gf &&
            ((n.flags |= 128), (l = !0), Dl(r, !1), (n.lanes = 4194304));
        }
      else {
        if (!l)
          if (((u = it(c)), u !== null)) {
            if (
              ((n.flags |= 128),
              (l = !0),
              (f = u.updateQueue),
              f !== null && ((n.updateQueue = f), (n.flags |= 4)),
              Dl(r, !0),
              r.tail === null && r.tailMode === 'hidden' && !c.alternate && !p)
            )
              return (Iu(n), null);
          } else
            2 * a() - r.renderingStartTime > gf &&
              f !== 1073741824 &&
              ((n.flags |= 128), (l = !0), Dl(r, !1), (n.lanes = 4194304));
        r.isBackwards
          ? ((c.sibling = n.child), (n.child = c))
          : ((f = r.last),
            f !== null ? (f.sibling = c) : (n.child = c),
            (r.last = c));
      }
      if (r.tail !== null)
        return (
          (n = r.tail),
          (r.rendering = n),
          (r.tail = n.sibling),
          (r.renderingStartTime = a()),
          (n.sibling = null),
          (f = b.current),
          d(b, l ? (f & 1) | 2 : f & 1),
          n
        );
      return (Iu(n), null);
    case 22:
    case 23:
      return (
        a2(),
        (l = n.memoizedState !== null),
        u !== null && (u.memoizedState !== null) !== l && (n.flags |= 8192),
        l && (n.mode & 1) !== 0
          ? (ju & 1073741824) !== 0 &&
            (Iu(n), n.subtreeFlags & 6 && (n.flags |= 8192))
          : Iu(n),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(L(156, n.tag));
}
function J$(u, n) {
  switch ((K2(n), n.tag)) {
    case 1:
      return (
        Ru(n.type) && jt(),
        (u = n.flags),
        u & 65536 ? ((n.flags = (u & -65537) | 128), n) : null
      );
    case 3:
      return (
        Rf(),
        x(Au),
        x(Lu),
        o2(),
        (u = n.flags),
        (u & 65536) !== 0 && (u & 128) === 0
          ? ((n.flags = (u & -65537) | 128), n)
          : null
      );
    case 5:
      return (j2(n), null);
    case 13:
      if ((x(b), (u = n.memoizedState), u !== null && u.dehydrated !== null)) {
        if (n.alternate === null) throw Error(L(340));
        Pf();
      }
      return (
        (u = n.flags),
        u & 65536 ? ((n.flags = (u & -65537) | 128), n) : null
      );
    case 19:
      return (x(b), null);
    case 4:
      return (Rf(), null);
    case 10:
      return (k2(n.type._context), null);
    case 22:
    case 23:
      return (a2(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
function Ff(u, n) {
  var f = u.ref;
  if (f !== null)
    if (typeof f === 'function')
      try {
        f(null);
      } catch (l) {
        s(u, n, l);
      }
    else f.current = null;
}
function w2(u, n, f) {
  try {
    f();
  } catch (l) {
    s(u, n, l);
  }
}
function H$(u, n) {
  if (((vh = kt), (u = d8()), C2(u))) {
    if ('selectionStart' in u)
      var f = { start: u.selectionStart, end: u.selectionEnd };
    else
      u: {
        f = ((f = u.ownerDocument) && f.defaultView) || window;
        var l = f.getSelection && f.getSelection();
        if (l && l.rangeCount !== 0) {
          f = l.anchorNode;
          var { anchorOffset: t, focusNode: r } = l;
          l = l.focusOffset;
          try {
            (f.nodeType, r.nodeType);
          } catch (J) {
            f = null;
            break u;
          }
          var c = 0,
            h = -1,
            w = -1,
            z = 0,
            _ = 0,
            N = u,
            Q = null;
          n: for (;;) {
            for (var Z; ; ) {
              if (
                (N !== f || (t !== 0 && N.nodeType !== 3) || (h = c + t),
                N !== r || (l !== 0 && N.nodeType !== 3) || (w = c + l),
                N.nodeType === 3 && (c += N.nodeValue.length),
                (Z = N.firstChild) === null)
              )
                break;
              ((Q = N), (N = Z));
            }
            for (;;) {
              if (N === u) break n;
              if (
                (Q === f && ++z === t && (h = c),
                Q === r && ++_ === l && (w = c),
                (Z = N.nextSibling) !== null)
              )
                break;
              ((N = Q), (Q = N.parentNode));
            }
            N = Z;
          }
          f = h === -1 || w === -1 ? null : { start: h, end: w };
        } else f = null;
      }
    f = f || { start: 0, end: 0 };
  } else f = null;
  ((yh = { focusedElem: u, selectionRange: f }), (kt = !1));
  for (q = n; q !== null; )
    if (((n = q), (u = n.child), (n.subtreeFlags & 1028) !== 0 && u !== null))
      ((u.return = n), (q = u));
    else
      for (; q !== null; ) {
        n = q;
        try {
          var Y = n.alternate;
          if ((n.flags & 1024) !== 0)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (Y !== null) {
                  var { memoizedProps: H, memoizedState: F } = Y,
                    U = n.stateNode,
                    $ = U.getSnapshotBeforeUpdate(
                      n.elementType === n.type ? H : zn(n.type, H),
                      F
                    );
                  U.__reactInternalSnapshotBeforeUpdate = $;
                }
                break;
              case 3:
                var W = n.stateNode.containerInfo;
                W.nodeType === 1
                  ? (W.textContent = '')
                  : W.nodeType === 9 &&
                    W.documentElement &&
                    W.removeChild(W.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(L(163));
            }
        } catch (J) {
          s(n, n.return, J);
        }
        if (((u = n.sibling), u !== null)) {
          ((u.return = n.return), (q = u));
          break;
        }
        q = n.return;
      }
  return ((Y = V4), (V4 = !1), Y);
}
function il(u, n, f) {
  var l = n.updateQueue;
  if (((l = l !== null ? l.lastEffect : null), l !== null)) {
    var t = (l = l.next);
    do {
      if ((t.tag & u) === u) {
        var r = t.destroy;
        ((t.destroy = void 0), r !== void 0 && w2(n, f, r));
      }
      t = t.next;
    } while (t !== l);
  }
}
function _r(u, n) {
  if (
    ((n = n.updateQueue), (n = n !== null ? n.lastEffect : null), n !== null)
  ) {
    var f = (n = n.next);
    do {
      if ((f.tag & u) === u) {
        var l = f.create;
        f.destroy = l();
      }
      f = f.next;
    } while (f !== n);
  }
}
function z2(u) {
  var n = u.ref;
  if (n !== null) {
    var f = u.stateNode;
    switch (u.tag) {
      case 5:
        u = f;
        break;
      default:
        u = f;
    }
    typeof n === 'function' ? n(u) : (n.current = u);
  }
}
function R5(u) {
  var n = u.alternate;
  (n !== null && ((u.alternate = null), R5(n)),
    (u.child = null),
    (u.deletions = null),
    (u.sibling = null),
    u.tag === 5 &&
      ((n = u.stateNode),
      n !== null &&
        (delete n[Yn], delete n[h1], delete n[bh], delete n[n$], delete n[f$])),
    (u.stateNode = null),
    (u.return = null),
    (u.dependencies = null),
    (u.memoizedProps = null),
    (u.memoizedState = null),
    (u.pendingProps = null),
    (u.stateNode = null),
    (u.updateQueue = null));
}
function k5(u) {
  return u.tag === 5 || u.tag === 3 || u.tag === 4;
}
function v4(u) {
  u: for (;;) {
    for (; u.sibling === null; ) {
      if (u.return === null || k5(u.return)) return null;
      u = u.return;
    }
    u.sibling.return = u.return;
    for (u = u.sibling; u.tag !== 5 && u.tag !== 6 && u.tag !== 18; ) {
      if (u.flags & 2) continue u;
      if (u.child === null || u.tag === 4) continue u;
      else ((u.child.return = u), (u = u.child));
    }
    if (!(u.flags & 2)) return u.stateNode;
  }
}
function _2(u, n, f) {
  var l = u.tag;
  if (l === 5 || l === 6)
    ((u = u.stateNode),
      n
        ? f.nodeType === 8
          ? f.parentNode.insertBefore(u, n)
          : f.insertBefore(u, n)
        : (f.nodeType === 8
            ? ((n = f.parentNode), n.insertBefore(u, f))
            : ((n = f), n.appendChild(u)),
          (f = f._reactRootContainer),
          (f !== null && f !== void 0) ||
            n.onclick !== null ||
            (n.onclick = dt)));
  else if (l !== 4 && ((u = u.child), u !== null))
    for (_2(u, n, f), u = u.sibling; u !== null; )
      (_2(u, n, f), (u = u.sibling));
}
function N2(u, n, f) {
  var l = u.tag;
  if (l === 5 || l === 6)
    ((u = u.stateNode), n ? f.insertBefore(u, n) : f.appendChild(u));
  else if (l !== 4 && ((u = u.child), u !== null))
    for (N2(u, n, f), u = u.sibling; u !== null; )
      (N2(u, n, f), (u = u.sibling));
}
function bn(u, n, f) {
  for (f = f.child; f !== null; ) (g5(u, n, f), (f = f.sibling));
}
function g5(u, n, f) {
  if (Hn && typeof Hn.onCommitFiberUnmount === 'function')
    try {
      Hn.onCommitFiberUnmount(fr, f);
    } catch (h) {}
  switch (f.tag) {
    case 5:
      Xu || Ff(f, n);
    case 6:
      var l = Nu,
        t = _n;
      ((Nu = null),
        bn(u, n, f),
        (Nu = l),
        (_n = t),
        Nu !== null &&
          (_n
            ? ((u = Nu),
              (f = f.stateNode),
              u.nodeType === 8 ? u.parentNode.removeChild(f) : u.removeChild(f))
            : Nu.removeChild(f.stateNode)));
      break;
    case 18:
      Nu !== null &&
        (_n
          ? ((u = Nu),
            (f = f.stateNode),
            u.nodeType === 8
              ? Qh(u.parentNode, f)
              : u.nodeType === 1 && Qh(u, f),
            f1(u))
          : Qh(Nu, f.stateNode));
      break;
    case 4:
      ((l = Nu),
        (t = _n),
        (Nu = f.stateNode.containerInfo),
        (_n = !0),
        bn(u, n, f),
        (Nu = l),
        (_n = t));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Xu &&
        ((l = f.updateQueue), l !== null && ((l = l.lastEffect), l !== null))
      ) {
        t = l = l.next;
        do {
          var r = t,
            c = r.destroy;
          ((r = r.tag),
            c !== void 0 &&
              ((r & 2) !== 0 ? w2(f, n, c) : (r & 4) !== 0 && w2(f, n, c)),
            (t = t.next));
        } while (t !== l);
      }
      bn(u, n, f);
      break;
    case 1:
      if (
        !Xu &&
        (Ff(f, n),
        (l = f.stateNode),
        typeof l.componentWillUnmount === 'function')
      )
        try {
          ((l.props = f.memoizedProps),
            (l.state = f.memoizedState),
            l.componentWillUnmount());
        } catch (h) {
          s(f, n, h);
        }
      bn(u, n, f);
      break;
    case 21:
      bn(u, n, f);
      break;
    case 22:
      f.mode & 1
        ? ((Xu = (l = Xu) || f.memoizedState !== null), bn(u, n, f), (Xu = l))
        : bn(u, n, f);
      break;
    default:
      bn(u, n, f);
  }
}
function y4(u) {
  var n = u.updateQueue;
  if (n !== null) {
    u.updateQueue = null;
    var f = u.stateNode;
    (f === null && (f = u.stateNode = new Y$()),
      n.forEach(function (l) {
        var t = S$.bind(null, u, l);
        f.has(l) || (f.add(l), l.then(t, t));
      }));
  }
}
function wn(u, n) {
  var f = n.deletions;
  if (f !== null)
    for (var l = 0; l < f.length; l++) {
      var t = f[l];
      try {
        var r = u,
          c = n,
          h = c;
        u: for (; h !== null; ) {
          switch (h.tag) {
            case 5:
              ((Nu = h.stateNode), (_n = !1));
              break u;
            case 3:
              ((Nu = h.stateNode.containerInfo), (_n = !0));
              break u;
            case 4:
              ((Nu = h.stateNode.containerInfo), (_n = !0));
              break u;
          }
          h = h.return;
        }
        if (Nu === null) throw Error(L(160));
        (g5(r, c, t), (Nu = null), (_n = !1));
        var w = t.alternate;
        (w !== null && (w.return = null), (t.return = null));
      } catch (z) {
        s(t, n, z);
      }
    }
  if (n.subtreeFlags & 12854)
    for (n = n.child; n !== null; ) (T5(n, u), (n = n.sibling));
}
function T5(u, n) {
  var { alternate: f, flags: l } = u;
  switch (u.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((wn(n, u), Zn(u), l & 4)) {
        try {
          (il(3, u, u.return), _r(3, u));
        } catch (H) {
          s(u, u.return, H);
        }
        try {
          il(5, u, u.return);
        } catch (H) {
          s(u, u.return, H);
        }
      }
      break;
    case 1:
      (wn(n, u), Zn(u), l & 512 && f !== null && Ff(f, f.return));
      break;
    case 5:
      if (
        (wn(n, u),
        Zn(u),
        l & 512 && f !== null && Ff(f, f.return),
        u.flags & 32)
      ) {
        var t = u.stateNode;
        try {
          sl(t, '');
        } catch (H) {
          s(u, u.return, H);
        }
      }
      if (l & 4 && ((t = u.stateNode), t != null)) {
        var r = u.memoizedProps,
          c = f !== null ? f.memoizedProps : r,
          h = u.type,
          w = u.updateQueue;
        if (((u.updateQueue = null), w !== null))
          try {
            (h === 'input' && r.type === 'radio' && r.name != null && h8(t, r),
              Kh(h, c));
            var z = Kh(h, r);
            for (c = 0; c < w.length; c += 2) {
              var _ = w[c],
                N = w[c + 1];
              _ === 'style'
                ? Q8(t, N)
                : _ === 'dangerouslySetInnerHTML'
                  ? _8(t, N)
                  : _ === 'children'
                    ? sl(t, N)
                    : Y2(t, _, N, z);
            }
            switch (h) {
              case 'input':
                Sh(t, r);
                break;
              case 'textarea':
                w8(t, r);
                break;
              case 'select':
                var Q = t._wrapperState.wasMultiple;
                t._wrapperState.wasMultiple = !!r.multiple;
                var Z = r.value;
                Z != null
                  ? qf(t, !!r.multiple, Z, !1)
                  : Q !== !!r.multiple &&
                    (r.defaultValue != null
                      ? qf(t, !!r.multiple, r.defaultValue, !0)
                      : qf(t, !!r.multiple, r.multiple ? [] : '', !1));
            }
            t[h1] = r;
          } catch (H) {
            s(u, u.return, H);
          }
      }
      break;
    case 6:
      if ((wn(n, u), Zn(u), l & 4)) {
        if (u.stateNode === null) throw Error(L(162));
        ((t = u.stateNode), (r = u.memoizedProps));
        try {
          t.nodeValue = r;
        } catch (H) {
          s(u, u.return, H);
        }
      }
      break;
    case 3:
      if (
        (wn(n, u), Zn(u), l & 4 && f !== null && f.memoizedState.isDehydrated)
      )
        try {
          f1(n.containerInfo);
        } catch (H) {
          s(u, u.return, H);
        }
      break;
    case 4:
      (wn(n, u), Zn(u));
      break;
    case 13:
      (wn(n, u),
        Zn(u),
        (t = u.child),
        t.flags & 8192 &&
          ((r = t.memoizedState !== null),
          (t.stateNode.isHidden = r),
          !r ||
            (t.alternate !== null && t.alternate.memoizedState !== null) ||
            (e2 = a())),
        l & 4 && y4(u));
      break;
    case 22:
      if (
        ((_ = f !== null && f.memoizedState !== null),
        u.mode & 1 ? ((Xu = (z = Xu) || _), wn(n, u), (Xu = z)) : wn(n, u),
        Zn(u),
        l & 8192)
      ) {
        if (
          ((z = u.memoizedState !== null),
          (u.stateNode.isHidden = z) && !_ && (u.mode & 1) !== 0)
        )
          for (q = u, _ = u.child; _ !== null; ) {
            for (N = q = _; q !== null; ) {
              switch (((Q = q), (Z = Q.child), Q.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  il(4, Q, Q.return);
                  break;
                case 1:
                  Ff(Q, Q.return);
                  var Y = Q.stateNode;
                  if (typeof Y.componentWillUnmount === 'function') {
                    ((l = Q), (f = Q.return));
                    try {
                      ((n = l),
                        (Y.props = n.memoizedProps),
                        (Y.state = n.memoizedState),
                        Y.componentWillUnmount());
                    } catch (H) {
                      s(l, f, H);
                    }
                  }
                  break;
                case 5:
                  Ff(Q, Q.return);
                  break;
                case 22:
                  if (Q.memoizedState !== null) {
                    i4(N);
                    continue;
                  }
              }
              Z !== null ? ((Z.return = Q), (q = Z)) : i4(N);
            }
            _ = _.sibling;
          }
        u: for (_ = null, N = u; ; ) {
          if (N.tag === 5) {
            if (_ === null) {
              _ = N;
              try {
                ((t = N.stateNode),
                  z
                    ? ((r = t.style),
                      typeof r.setProperty === 'function'
                        ? r.setProperty('display', 'none', 'important')
                        : (r.display = 'none'))
                    : ((h = N.stateNode),
                      (w = N.memoizedProps.style),
                      (c =
                        w !== void 0 &&
                        w !== null &&
                        w.hasOwnProperty('display')
                          ? w.display
                          : null),
                      (h.style.display = N8('display', c))));
              } catch (H) {
                s(u, u.return, H);
              }
            }
          } else if (N.tag === 6) {
            if (_ === null)
              try {
                N.stateNode.nodeValue = z ? '' : N.memoizedProps;
              } catch (H) {
                s(u, u.return, H);
              }
          } else if (
            ((N.tag !== 22 && N.tag !== 23) ||
              N.memoizedState === null ||
              N === u) &&
            N.child !== null
          ) {
            ((N.child.return = N), (N = N.child));
            continue;
          }
          if (N === u) break u;
          for (; N.sibling === null; ) {
            if (N.return === null || N.return === u) break u;
            (_ === N && (_ = null), (N = N.return));
          }
          (_ === N && (_ = null),
            (N.sibling.return = N.return),
            (N = N.sibling));
        }
      }
      break;
    case 19:
      (wn(n, u), Zn(u), l & 4 && y4(u));
      break;
    case 21:
      break;
    default:
      (wn(n, u), Zn(u));
  }
}
function Zn(u) {
  var n = u.flags;
  if (n & 2) {
    try {
      u: {
        for (var f = u.return; f !== null; ) {
          if (k5(f)) {
            var l = f;
            break u;
          }
          f = f.return;
        }
        throw Error(L(160));
      }
      switch (l.tag) {
        case 5:
          var t = l.stateNode;
          l.flags & 32 && (sl(t, ''), (l.flags &= -33));
          var r = v4(u);
          N2(u, r, t);
          break;
        case 3:
        case 4:
          var c = l.stateNode.containerInfo,
            h = v4(u);
          _2(u, h, c);
          break;
        default:
          throw Error(L(161));
      }
    } catch (w) {
      s(u, u.return, w);
    }
    u.flags &= -3;
  }
  n & 4096 && (u.flags &= -4097);
}
function I$(u, n, f) {
  ((q = u), d5(u, n, f));
}
function d5(u, n, f) {
  for (var l = (u.mode & 1) !== 0; q !== null; ) {
    var t = q,
      r = t.child;
    if (t.tag === 22 && l) {
      var c = t.memoizedState !== null || Ht;
      if (!c) {
        var h = t.alternate,
          w = (h !== null && h.memoizedState !== null) || Xu;
        h = Ht;
        var z = Xu;
        if (((Ht = c), (Xu = w) && !z))
          for (q = t; q !== null; )
            ((c = q),
              (w = c.child),
              c.tag === 22 && c.memoizedState !== null
                ? b4(t)
                : w !== null
                  ? ((w.return = c), (q = w))
                  : b4(t));
        for (; r !== null; ) ((q = r), d5(r, n, f), (r = r.sibling));
        ((q = t), (Ht = h), (Xu = z));
      }
      p4(u, n, f);
    } else
      (t.subtreeFlags & 8772) !== 0 && r !== null
        ? ((r.return = t), (q = r))
        : p4(u, n, f);
  }
}
function p4(u) {
  for (; q !== null; ) {
    var n = q;
    if ((n.flags & 8772) !== 0) {
      var f = n.alternate;
      try {
        if ((n.flags & 8772) !== 0)
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
              Xu || _r(5, n);
              break;
            case 1:
              var l = n.stateNode;
              if (n.flags & 4 && !Xu)
                if (f === null) l.componentDidMount();
                else {
                  var t =
                    n.elementType === n.type
                      ? f.memoizedProps
                      : zn(n.type, f.memoizedProps);
                  l.componentDidUpdate(
                    t,
                    f.memoizedState,
                    l.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var r = n.updateQueue;
              r !== null && C4(n, r, l);
              break;
            case 3:
              var c = n.updateQueue;
              if (c !== null) {
                if (((f = null), n.child !== null))
                  switch (n.child.tag) {
                    case 5:
                      f = n.child.stateNode;
                      break;
                    case 1:
                      f = n.child.stateNode;
                  }
                C4(n, c, f);
              }
              break;
            case 5:
              var h = n.stateNode;
              if (f === null && n.flags & 4) {
                f = h;
                var w = n.memoizedProps;
                switch (n.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    w.autoFocus && f.focus();
                    break;
                  case 'img':
                    w.src && (f.src = w.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (n.memoizedState === null) {
                var z = n.alternate;
                if (z !== null) {
                  var _ = z.memoizedState;
                  if (_ !== null) {
                    var N = _.dehydrated;
                    N !== null && f1(N);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(L(163));
          }
        Xu || (n.flags & 512 && z2(n));
      } catch (Q) {
        s(n, n.return, Q);
      }
    }
    if (n === u) {
      q = null;
      break;
    }
    if (((f = n.sibling), f !== null)) {
      ((f.return = n.return), (q = f));
      break;
    }
    q = n.return;
  }
}
function i4(u) {
  for (; q !== null; ) {
    var n = q;
    if (n === u) {
      q = null;
      break;
    }
    var f = n.sibling;
    if (f !== null) {
      ((f.return = n.return), (q = f));
      break;
    }
    q = n.return;
  }
}
function b4(u) {
  for (; q !== null; ) {
    var n = q;
    try {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          var f = n.return;
          try {
            _r(4, n);
          } catch (w) {
            s(n, f, w);
          }
          break;
        case 1:
          var l = n.stateNode;
          if (typeof l.componentDidMount === 'function') {
            var t = n.return;
            try {
              l.componentDidMount();
            } catch (w) {
              s(n, t, w);
            }
          }
          var r = n.return;
          try {
            z2(n);
          } catch (w) {
            s(n, r, w);
          }
          break;
        case 5:
          var c = n.return;
          try {
            z2(n);
          } catch (w) {
            s(n, c, w);
          }
      }
    } catch (w) {
      s(n, n.return, w);
    }
    if (n === u) {
      q = null;
      break;
    }
    var h = n.sibling;
    if (h !== null) {
      ((h.return = n.return), (q = h));
      break;
    }
    q = n.return;
  }
}
function Su() {
  return (A & 6) !== 0 ? a() : Bt !== -1 ? Bt : (Bt = a());
}
function w0(u) {
  if ((u.mode & 1) === 0) return 1;
  if ((A & 2) !== 0 && Qu !== 0) return Qu & -Qu;
  if (t$.transition !== null) return (Gt === 0 && (Gt = F8()), Gt);
  if (((u = k), u !== 0)) return u;
  return ((u = window.event), (u = u === void 0 ? 16 : C8(u.type)), u);
}
function $n(u, n, f, l) {
  if (50 < ml) throw ((ml = 0), ($2 = null), Error(L(185)));
  if ((U1(u, f, l), (A & 2) === 0 || u !== zu))
    (u === zu && ((A & 2) === 0 && (Nr |= f), hu === 4 && an(u, Qu)),
      ku(u, l),
      f === 1 &&
        A === 0 &&
        (n.mode & 1) === 0 &&
        ((gf = a() + 500), hr && U0()));
}
function ku(u, n) {
  var f = u.callbackNode;
  cQ(u, n);
  var l = Rt(u, u === zu ? Qu : 0);
  if (l === 0)
    (f !== null && r4(f), (u.callbackNode = null), (u.callbackPriority = 0));
  else if (((n = l & -l), u.callbackPriority !== n)) {
    if ((f != null && r4(f), n === 1))
      (u.tag === 0 ? l$(m4.bind(null, u)) : m8(m4.bind(null, u)),
        aQ(function () {
          (A & 6) === 0 && U0();
        }),
        (f = null));
    else {
      switch (E8(l)) {
        case 1:
          f = O2;
          break;
        case 4:
          f = L8;
          break;
        case 16:
          f = At;
          break;
        case 536870912:
          f = O8;
          break;
        default:
          f = At;
      }
      f = i5(f, j5.bind(null, u));
    }
    ((u.callbackPriority = n), (u.callbackNode = f));
  }
}
function j5(u, n) {
  if (((Bt = -1), (Gt = 0), (A & 6) !== 0)) throw Error(L(327));
  var f = u.callbackNode;
  if (Cf() && u.callbackNode !== f) return null;
  var l = Rt(u, u === zu ? Qu : 0);
  if (l === 0) return null;
  if ((l & 30) !== 0 || (l & u.expiredLanes) !== 0 || n) n = ur(u, l);
  else {
    n = l;
    var t = A;
    A |= 2;
    var r = x5();
    if (zu !== u || Qu !== n) ((Bn = null), (gf = a() + 500), R0(u, n));
    do
      try {
        F$();
        break;
      } catch (h) {
        o5(u, h);
      }
    while (1);
    (R2(),
      (et.current = r),
      (A = t),
      tu !== null ? (n = 0) : ((zu = null), (Qu = 0), (n = hu)));
  }
  if (n !== 0) {
    if (
      (n === 2 && ((t = gh(u)), t !== 0 && ((l = t), (n = U2(u, t)))), n === 1)
    )
      throw ((f = $1), R0(u, 0), an(u, l), ku(u, a()), f);
    if (n === 6) an(u, l);
    else {
      if (
        ((t = u.current.alternate),
        (l & 30) === 0 &&
          !L$(t) &&
          ((n = ur(u, l)),
          n === 2 && ((r = gh(u)), r !== 0 && ((l = r), (n = U2(u, r)))),
          n === 1))
      )
        throw ((f = $1), R0(u, 0), an(u, l), ku(u, a()), f);
      switch (((u.finishedWork = t), (u.finishedLanes = l), n)) {
        case 0:
        case 1:
          throw Error(L(345));
        case 2:
          D0(u, Ku, Bn);
          break;
        case 3:
          if (
            (an(u, l), (l & 130023424) === l && ((n = e2 + 500 - a()), 10 < n))
          ) {
            if (Rt(u, 0) !== 0) break;
            if (((t = u.suspendedLanes), (t & l) !== l)) {
              (Su(), (u.pingedLanes |= u.suspendedLanes & t));
              break;
            }
            u.timeoutHandle = ih(D0.bind(null, u, Ku, Bn), n);
            break;
          }
          D0(u, Ku, Bn);
          break;
        case 4:
          if ((an(u, l), (l & 4194240) === l)) break;
          n = u.eventTimes;
          for (t = -1; 0 < l; ) {
            var c = 31 - Qn(l);
            ((r = 1 << c), (c = n[c]), c > t && (t = c), (l &= ~r));
          }
          if (
            ((l = t),
            (l = a() - l),
            (l =
              (120 > l
                ? 120
                : 480 > l
                  ? 480
                  : 1080 > l
                    ? 1080
                    : 1920 > l
                      ? 1920
                      : 3000 > l
                        ? 3000
                        : 4320 > l
                          ? 4320
                          : 1960 * X$(l / 1960)) - l),
            10 < l)
          ) {
            u.timeoutHandle = ih(D0.bind(null, u, Ku, Bn), l);
            break;
          }
          D0(u, Ku, Bn);
          break;
        case 5:
          D0(u, Ku, Bn);
          break;
        default:
          throw Error(L(329));
      }
    }
  }
  return (ku(u, a()), u.callbackNode === f ? j5.bind(null, u) : null);
}
function U2(u, n) {
  var f = bl;
  return (
    u.current.memoizedState.isDehydrated && (R0(u, n).flags |= 256),
    (u = ur(u, n)),
    u !== 2 && ((n = Ku), (Ku = f), n !== null && W2(n)),
    u
  );
}
function W2(u) {
  Ku === null ? (Ku = u) : Ku.push.apply(Ku, u);
}
function L$(u) {
  for (var n = u; ; ) {
    if (n.flags & 16384) {
      var f = n.updateQueue;
      if (f !== null && ((f = f.stores), f !== null))
        for (var l = 0; l < f.length; l++) {
          var t = f[l],
            r = t.getSnapshot;
          t = t.value;
          try {
            if (!Un(r(), t)) return !1;
          } catch (c) {
            return !1;
          }
        }
    }
    if (((f = n.child), n.subtreeFlags & 16384 && f !== null))
      ((f.return = n), (n = f));
    else {
      if (n === u) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === u) return !0;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  }
  return !0;
}
function an(u, n) {
  ((n &= ~m2), (n &= ~Nr), (u.suspendedLanes |= n), (u.pingedLanes &= ~n));
  for (u = u.expirationTimes; 0 < n; ) {
    var f = 31 - Qn(n),
      l = 1 << f;
    ((u[f] = -1), (n &= ~l));
  }
}
function m4(u) {
  if ((A & 6) !== 0) throw Error(L(327));
  Cf();
  var n = Rt(u, 0);
  if ((n & 1) === 0) return (ku(u, a()), null);
  var f = ur(u, n);
  if (u.tag !== 0 && f === 2) {
    var l = gh(u);
    l !== 0 && ((n = l), (f = U2(u, l)));
  }
  if (f === 1) throw ((f = $1), R0(u, 0), an(u, n), ku(u, a()), f);
  if (f === 6) throw Error(L(345));
  return (
    (u.finishedWork = u.current.alternate),
    (u.finishedLanes = n),
    D0(u, Ku, Bn),
    ku(u, a()),
    null
  );
}
function s2(u, n) {
  var f = A;
  A |= 1;
  try {
    return u(n);
  } finally {
    ((A = f), A === 0 && ((gf = a() + 500), hr && U0()));
  }
}
function o0(u) {
  n0 !== null && n0.tag === 0 && (A & 6) === 0 && Cf();
  var n = A;
  A |= 1;
  var f = un.transition,
    l = k;
  try {
    if (((un.transition = null), (k = 1), u)) return u();
  } finally {
    ((k = l), (un.transition = f), (A = n), (A & 6) === 0 && U0());
  }
}
function a2() {
  ((ju = Ef.current), x(Ef));
}
function R0(u, n) {
  ((u.finishedWork = null), (u.finishedLanes = 0));
  var f = u.timeoutHandle;
  if ((f !== -1 && ((u.timeoutHandle = -1), sQ(f)), tu !== null))
    for (f = tu.return; f !== null; ) {
      var l = f;
      switch ((K2(l), l.tag)) {
        case 1:
          ((l = l.type.childContextTypes), l !== null && l !== void 0 && jt());
          break;
        case 3:
          (Rf(), x(Au), x(Lu), o2());
          break;
        case 5:
          j2(l);
          break;
        case 4:
          Rf();
          break;
        case 13:
          x(b);
          break;
        case 19:
          x(b);
          break;
        case 10:
          k2(l.type._context);
          break;
        case 22:
        case 23:
          a2();
      }
      f = f.return;
    }
  if (
    ((zu = u),
    (tu = u = z0(u.current, null)),
    (Qu = ju = n),
    (hu = 0),
    ($1 = null),
    (m2 = Nr = j0 = 0),
    (Ku = bl = null),
    P0 !== null)
  ) {
    for (n = 0; n < P0.length; n++)
      if (((f = P0[n]), (l = f.interleaved), l !== null)) {
        f.interleaved = null;
        var t = l.next,
          r = f.pending;
        if (r !== null) {
          var c = r.next;
          ((r.next = t), (l.next = c));
        }
        f.pending = l;
      }
    P0 = null;
  }
  return u;
}
function o5(u, n) {
  do {
    var f = tu;
    try {
      if ((R2(), (qt.current = mt), bt)) {
        for (var l = m.memoizedState; l !== null; ) {
          var t = l.queue;
          (t !== null && (t.pending = null), (l = l.next));
        }
        bt = !1;
      }
      if (
        ((d0 = 0),
        (wu = cu = m = null),
        (pl = !1),
        (_1 = 0),
        (b2.current = null),
        f === null || f.return === null)
      ) {
        ((hu = 1), ($1 = n), (tu = null));
        break;
      }
      u: {
        var r = u,
          c = f.return,
          h = f,
          w = n;
        if (
          ((n = Qu),
          (h.flags |= 32768),
          w !== null && typeof w === 'object' && typeof w.then === 'function')
        ) {
          var z = w,
            _ = h,
            N = _.tag;
          if ((_.mode & 1) === 0 && (N === 0 || N === 11 || N === 15)) {
            var Q = _.alternate;
            Q
              ? ((_.updateQueue = Q.updateQueue),
                (_.memoizedState = Q.memoizedState),
                (_.lanes = Q.lanes))
              : ((_.updateQueue = null), (_.memoizedState = null));
          }
          var Z = k4(c);
          if (Z !== null) {
            ((Z.flags &= -257),
              g4(Z, c, h, r, n),
              Z.mode & 1 && R4(r, z, n),
              (n = Z),
              (w = z));
            var Y = n.updateQueue;
            if (Y === null) {
              var H = new Set();
              (H.add(w), (n.updateQueue = H));
            } else Y.add(w);
            break u;
          } else {
            if ((n & 1) === 0) {
              (R4(r, z, n), uw());
              break u;
            }
            w = Error(L(426));
          }
        } else if (p && h.mode & 1) {
          var F = k4(c);
          if (F !== null) {
            ((F.flags & 65536) === 0 && (F.flags |= 256),
              g4(F, c, h, r, n),
              P2(kf(w, h)));
            break u;
          }
        }
        ((r = w = kf(w, h)),
          hu !== 4 && (hu = 2),
          bl === null ? (bl = [r]) : bl.push(r),
          (r = c));
        do {
          switch (r.tag) {
            case 3:
              ((r.flags |= 65536), (n &= -n), (r.lanes |= n));
              var U = E5(r, w, n);
              G4(r, U);
              break u;
            case 1:
              h = w;
              var { type: $, stateNode: W } = r;
              if (
                (r.flags & 128) === 0 &&
                (typeof $.getDerivedStateFromError === 'function' ||
                  (W !== null &&
                    typeof W.componentDidCatch === 'function' &&
                    (h0 === null || !h0.has(W))))
              ) {
                ((r.flags |= 65536), (n &= -n), (r.lanes |= n));
                var J = q5(r, h, n);
                G4(r, J);
                break u;
              }
          }
          r = r.return;
        } while (r !== null);
      }
      v5(f);
    } catch (I) {
      ((n = I), tu === f && f !== null && (tu = f = f.return));
      continue;
    }
    break;
  } while (1);
}
function x5() {
  var u = et.current;
  return ((et.current = mt), u === null ? mt : u);
}
function uw() {
  if (hu === 0 || hu === 3 || hu === 2) hu = 4;
  zu === null ||
    ((j0 & 268435455) === 0 && (Nr & 268435455) === 0) ||
    an(zu, Qu);
}
function ur(u, n) {
  var f = A;
  A |= 2;
  var l = x5();
  if (zu !== u || Qu !== n) ((Bn = null), R0(u, n));
  do
    try {
      O$();
      break;
    } catch (t) {
      o5(u, t);
    }
  while (1);
  if ((R2(), (A = f), (et.current = l), tu !== null)) throw Error(L(261));
  return ((zu = null), (Qu = 0), hu);
}
function O$() {
  for (; tu !== null; ) V5(tu);
}
function F$() {
  for (; tu !== null && !eN(); ) V5(tu);
}
function V5(u) {
  var n = p5(u.alternate, u, ju);
  ((u.memoizedProps = u.pendingProps),
    n === null ? v5(u) : (tu = n),
    (b2.current = null));
}
function v5(u) {
  var n = u;
  do {
    var f = n.alternate;
    if (((u = n.return), (n.flags & 32768) === 0)) {
      if (((f = Z$(f, n, ju)), f !== null)) {
        tu = f;
        return;
      }
    } else {
      if (((f = J$(f, n)), f !== null)) {
        ((f.flags &= 32767), (tu = f));
        return;
      }
      if (u !== null)
        ((u.flags |= 32768), (u.subtreeFlags = 0), (u.deletions = null));
      else {
        ((hu = 6), (tu = null));
        return;
      }
    }
    if (((n = n.sibling), n !== null)) {
      tu = n;
      return;
    }
    tu = n = u;
  } while (n !== null);
  hu === 0 && (hu = 5);
}
function D0(u, n, f) {
  var l = k,
    t = un.transition;
  try {
    ((un.transition = null), (k = 1), E$(u, n, f, l));
  } finally {
    ((un.transition = t), (k = l));
  }
  return null;
}
function E$(u, n, f, l) {
  do Cf();
  while (n0 !== null);
  if ((A & 6) !== 0) throw Error(L(327));
  f = u.finishedWork;
  var t = u.finishedLanes;
  if (f === null) return null;
  if (((u.finishedWork = null), (u.finishedLanes = 0), f === u.current))
    throw Error(L(177));
  ((u.callbackNode = null), (u.callbackPriority = 0));
  var r = f.lanes | f.childLanes;
  if (
    (hQ(u, r),
    u === zu && ((tu = zu = null), (Qu = 0)),
    ((f.subtreeFlags & 2064) === 0 && (f.flags & 2064) === 0) ||
      It ||
      ((It = !0),
      i5(At, function () {
        return (Cf(), null);
      })),
    (r = (f.flags & 15990) !== 0),
    (f.subtreeFlags & 15990) !== 0 || r)
  ) {
    ((r = un.transition), (un.transition = null));
    var c = k;
    k = 1;
    var h = A;
    ((A |= 4),
      (b2.current = null),
      H$(u, f),
      T5(f, u),
      pQ(yh),
      (kt = !!vh),
      (yh = vh = null),
      (u.current = f),
      I$(f, u, t),
      sN(),
      (A = h),
      (k = c),
      (un.transition = r));
  } else u.current = f;
  if (
    (It && ((It = !1), (n0 = u), (at = t)),
    (r = u.pendingLanes),
    r === 0 && (h0 = null),
    nQ(f.stateNode, l),
    ku(u, a()),
    n !== null)
  )
    for (l = u.onRecoverableError, f = 0; f < n.length; f++)
      ((t = n[f]), l(t.value, { componentStack: t.stack, digest: t.digest }));
  if (st) throw ((st = !1), (u = Q2), (Q2 = null), u);
  return (
    (at & 1) !== 0 && u.tag !== 0 && Cf(),
    (r = u.pendingLanes),
    (r & 1) !== 0 ? (u === $2 ? ml++ : ((ml = 0), ($2 = u))) : (ml = 0),
    U0(),
    null
  );
}
function Cf() {
  if (n0 !== null) {
    var u = E8(at),
      n = un.transition,
      f = k;
    try {
      if (((un.transition = null), (k = 16 > u ? 16 : u), n0 === null))
        var l = !1;
      else {
        if (((u = n0), (n0 = null), (at = 0), (A & 6) !== 0))
          throw Error(L(331));
        var t = A;
        A |= 4;
        for (q = u.current; q !== null; ) {
          var r = q,
            c = r.child;
          if ((q.flags & 16) !== 0) {
            var h = r.deletions;
            if (h !== null) {
              for (var w = 0; w < h.length; w++) {
                var z = h[w];
                for (q = z; q !== null; ) {
                  var _ = q;
                  switch (_.tag) {
                    case 0:
                    case 11:
                    case 15:
                      il(8, _, r);
                  }
                  var N = _.child;
                  if (N !== null) ((N.return = _), (q = N));
                  else
                    for (; q !== null; ) {
                      _ = q;
                      var { sibling: Q, return: Z } = _;
                      if ((R5(_), _ === z)) {
                        q = null;
                        break;
                      }
                      if (Q !== null) {
                        ((Q.return = Z), (q = Q));
                        break;
                      }
                      q = Z;
                    }
                }
              }
              var Y = r.alternate;
              if (Y !== null) {
                var H = Y.child;
                if (H !== null) {
                  Y.child = null;
                  do {
                    var F = H.sibling;
                    ((H.sibling = null), (H = F));
                  } while (H !== null);
                }
              }
              q = r;
            }
          }
          if ((r.subtreeFlags & 2064) !== 0 && c !== null)
            ((c.return = r), (q = c));
          else
            u: for (; q !== null; ) {
              if (((r = q), (r.flags & 2048) !== 0))
                switch (r.tag) {
                  case 0:
                  case 11:
                  case 15:
                    il(9, r, r.return);
                }
              var U = r.sibling;
              if (U !== null) {
                ((U.return = r.return), (q = U));
                break u;
              }
              q = r.return;
            }
        }
        var $ = u.current;
        for (q = $; q !== null; ) {
          c = q;
          var W = c.child;
          if ((c.subtreeFlags & 2064) !== 0 && W !== null)
            ((W.return = c), (q = W));
          else
            u: for (c = $; q !== null; ) {
              if (((h = q), (h.flags & 2048) !== 0))
                try {
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      _r(9, h);
                  }
                } catch (I) {
                  s(h, h.return, I);
                }
              if (h === c) {
                q = null;
                break u;
              }
              var J = h.sibling;
              if (J !== null) {
                ((J.return = h.return), (q = J));
                break u;
              }
              q = h.return;
            }
        }
        if (
          ((A = t), U0(), Hn && typeof Hn.onPostCommitFiberRoot === 'function')
        )
          try {
            Hn.onPostCommitFiberRoot(fr, u);
          } catch (I) {}
        l = !0;
      }
      return l;
    } finally {
      ((k = f), (un.transition = n));
    }
  }
  return !1;
}
function e4(u, n, f) {
  ((n = kf(f, n)),
    (n = E5(u, n, 1)),
    (u = c0(u, n, 1)),
    (n = Su()),
    u !== null && (U1(u, 1, n), ku(u, n)));
}
function s(u, n, f) {
  if (u.tag === 3) e4(u, u, f);
  else
    for (; n !== null; ) {
      if (n.tag === 3) {
        e4(n, u, f);
        break;
      } else if (n.tag === 1) {
        var l = n.stateNode;
        if (
          typeof n.type.getDerivedStateFromError === 'function' ||
          (typeof l.componentDidCatch === 'function' &&
            (h0 === null || !h0.has(l)))
        ) {
          ((u = kf(f, u)),
            (u = q5(n, u, 1)),
            (n = c0(n, u, 1)),
            (u = Su()),
            n !== null && (U1(n, 1, u), ku(n, u)));
          break;
        }
      }
      n = n.return;
    }
}
function q$(u, n, f) {
  var l = u.pingCache;
  (l !== null && l.delete(n),
    (n = Su()),
    (u.pingedLanes |= u.suspendedLanes & f),
    zu === u &&
      (Qu & f) === f &&
      (hu === 4 || (hu === 3 && (Qu & 130023424) === Qu && 500 > a() - e2)
        ? R0(u, 0)
        : (m2 |= f)),
    ku(u, n));
}
function y5(u, n) {
  n === 0 &&
    ((u.mode & 1) === 0
      ? (n = 1)
      : ((n = _t), (_t <<= 1), (_t & 130023424) === 0 && (_t = 4194304)));
  var f = Su();
  ((u = Rn(u, n)), u !== null && (U1(u, n, f), ku(u, f)));
}
function M$(u) {
  var n = u.memoizedState,
    f = 0;
  (n !== null && (f = n.retryLane), y5(u, f));
}
function S$(u, n) {
  var f = 0;
  switch (u.tag) {
    case 13:
      var { stateNode: l, memoizedState: t } = u;
      t !== null && (f = t.retryLane);
      break;
    case 19:
      l = u.stateNode;
      break;
    default:
      throw Error(L(314));
  }
  (l !== null && l.delete(n), y5(u, f));
}
function i5(u, n) {
  return X8(u, n);
}
function B$(u, n, f, l) {
  ((this.tag = u),
    (this.key = f),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = n),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = l),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function au(u, n, f, l) {
  return new B$(u, n, f, l);
}
function nw(u) {
  return ((u = u.prototype), !(!u || !u.isReactComponent));
}
function G$(u) {
  if (typeof u === 'function') return nw(u) ? 1 : 0;
  if (u !== void 0 && u !== null) {
    if (((u = u.$$typeof), u === I2)) return 11;
    if (u === X2) return 14;
  }
  return 2;
}
function z0(u, n) {
  var f = u.alternate;
  return (
    f === null
      ? ((f = au(u.tag, n, u.key, u.mode)),
        (f.elementType = u.elementType),
        (f.type = u.type),
        (f.stateNode = u.stateNode),
        (f.alternate = u),
        (u.alternate = f))
      : ((f.pendingProps = n),
        (f.type = u.type),
        (f.flags = 0),
        (f.subtreeFlags = 0),
        (f.deletions = null)),
    (f.flags = u.flags & 14680064),
    (f.childLanes = u.childLanes),
    (f.lanes = u.lanes),
    (f.child = u.child),
    (f.memoizedProps = u.memoizedProps),
    (f.memoizedState = u.memoizedState),
    (f.updateQueue = u.updateQueue),
    (n = u.dependencies),
    (f.dependencies =
      n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
    (f.sibling = u.sibling),
    (f.index = u.index),
    (f.ref = u.ref),
    f
  );
}
function Ct(u, n, f, l, t, r) {
  var c = 2;
  if (((l = u), typeof u === 'function')) nw(u) && (c = 1);
  else if (typeof u === 'string') c = 5;
  else
    u: switch (u) {
      case Wf:
        return k0(f.children, t, r, n);
      case H2:
        ((c = 8), (t |= 8));
        break;
      case Oh:
        return (
          (u = au(12, f, n, t | 2)),
          (u.elementType = Oh),
          (u.lanes = r),
          u
        );
      case Fh:
        return ((u = au(13, f, n, t)), (u.elementType = Fh), (u.lanes = r), u);
      case Eh:
        return ((u = au(19, f, n, t)), (u.elementType = Eh), (u.lanes = r), u);
      case t8:
        return Qr(f, t, r, n);
      default:
        if (typeof u === 'object' && u !== null)
          switch (u.$$typeof) {
            case f8:
              c = 10;
              break u;
            case l8:
              c = 9;
              break u;
            case I2:
              c = 11;
              break u;
            case X2:
              c = 14;
              break u;
            case mn:
              ((c = 16), (l = null));
              break u;
          }
        throw Error(L(130, u == null ? u : typeof u, ''));
    }
  return (
    (n = au(c, f, n, t)),
    (n.elementType = u),
    (n.type = l),
    (n.lanes = r),
    n
  );
}
function k0(u, n, f, l) {
  return ((u = au(7, u, l, n)), (u.lanes = f), u);
}
function Qr(u, n, f, l) {
  return (
    (u = au(22, u, l, n)),
    (u.elementType = t8),
    (u.lanes = f),
    (u.stateNode = { isHidden: !1 }),
    u
  );
}
function Ih(u, n, f) {
  return ((u = au(6, u, null, n)), (u.lanes = f), u);
}
function Xh(u, n, f) {
  return (
    (n = au(4, u.children !== null ? u.children : [], u.key, n)),
    (n.lanes = f),
    (n.stateNode = {
      containerInfo: u.containerInfo,
      pendingChildren: null,
      implementation: u.implementation,
    }),
    n
  );
}
function C$(u, n, f, l, t) {
  ((this.tag = n),
    (this.containerInfo = u),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = rh(0)),
    (this.expirationTimes = rh(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = rh(0)),
    (this.identifierPrefix = l),
    (this.onRecoverableError = t),
    (this.mutableSourceEagerHydrationData = null));
}
function fw(u, n, f, l, t, r, c, h, w) {
  return (
    (u = new C$(u, n, f, h, w)),
    n === 1 ? ((n = 1), r === !0 && (n |= 8)) : (n = 0),
    (r = au(3, null, null, n)),
    (u.current = r),
    (r.stateNode = u),
    (r.memoizedState = {
      element: l,
      isDehydrated: f,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    T2(r),
    u
  );
}
function D$(u, n, f) {
  var l = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Uf,
    key: l == null ? null : '' + l,
    children: u,
    containerInfo: n,
    implementation: f,
  };
}
function b5(u) {
  if (!u) return N0;
  u = u._reactInternals;
  u: {
    if (V0(u) !== u || u.tag !== 1) throw Error(L(170));
    var n = u;
    do {
      switch (n.tag) {
        case 3:
          n = n.stateNode.context;
          break u;
        case 1:
          if (Ru(n.type)) {
            n = n.stateNode.__reactInternalMemoizedMergedChildContext;
            break u;
          }
      }
      n = n.return;
    } while (n !== null);
    throw Error(L(171));
  }
  if (u.tag === 1) {
    var f = u.type;
    if (Ru(f)) return b8(u, f, n);
  }
  return n;
}
function m5(u, n, f, l, t, r, c, h, w) {
  return (
    (u = fw(f, l, !0, u, t, r, c, h, w)),
    (u.context = b5(null)),
    (f = u.current),
    (l = Su()),
    (t = w0(f)),
    (r = Kn(l, t)),
    (r.callback = n !== void 0 && n !== null ? n : null),
    c0(f, r, t),
    (u.current.lanes = t),
    U1(u, t, l),
    ku(u, l),
    u
  );
}
function $r(u, n, f, l) {
  var t = n.current,
    r = Su(),
    c = w0(t);
  return (
    (f = b5(f)),
    n.context === null ? (n.context = f) : (n.pendingContext = f),
    (n = Kn(r, c)),
    (n.payload = { element: u }),
    (l = l === void 0 ? null : l),
    l !== null && (n.callback = l),
    (u = c0(t, n, c)),
    u !== null && ($n(u, t, c, r), Et(u, t, c)),
    c
  );
}
function nr(u) {
  if (((u = u.current), !u.child)) return null;
  switch (u.child.tag) {
    case 5:
      return u.child.stateNode;
    default:
      return u.child.stateNode;
  }
}
function s4(u, n) {
  if (((u = u.memoizedState), u !== null && u.dehydrated !== null)) {
    var f = u.retryLane;
    u.retryLane = f !== 0 && f < n ? f : n;
  }
}
function lw(u, n) {
  (s4(u, n), (u = u.alternate) && s4(u, n));
}
function K$() {
  return null;
}
function tw(u) {
  this._internalRoot = u;
}
function Ur(u) {
  this._internalRoot = u;
}
function rw(u) {
  return !(!u || (u.nodeType !== 1 && u.nodeType !== 9 && u.nodeType !== 11));
}
function Wr(u) {
  return !(
    !u ||
    (u.nodeType !== 1 &&
      u.nodeType !== 9 &&
      u.nodeType !== 11 &&
      (u.nodeType !== 8 || u.nodeValue !== ' react-mount-point-unstable '))
  );
}
function a4() {}
function P$(u, n, f, l, t) {
  if (t) {
    if (typeof l === 'function') {
      var r = l;
      l = function () {
        var z = nr(c);
        r.call(z);
      };
    }
    var c = m5(n, l, u, 0, null, !1, !1, '', a4);
    return (
      (u._reactRootContainer = c),
      (u[An] = c.current),
      r1(u.nodeType === 8 ? u.parentNode : u),
      o0(),
      c
    );
  }
  for (; (t = u.lastChild); ) u.removeChild(t);
  if (typeof l === 'function') {
    var h = l;
    l = function () {
      var z = nr(w);
      h.call(z);
    };
  }
  var w = fw(u, 0, !1, null, null, !1, !1, '', a4);
  return (
    (u._reactRootContainer = w),
    (u[An] = w.current),
    r1(u.nodeType === 8 ? u.parentNode : u),
    o0(function () {
      $r(n, w, f, l);
    }),
    w
  );
}
function Zr(u, n, f, l, t) {
  var r = f._reactRootContainer;
  if (r) {
    var c = r;
    if (typeof t === 'function') {
      var h = t;
      t = function () {
        var w = nr(c);
        h.call(w);
      };
    }
    $r(n, c, u, t);
  } else c = P$(f, n, u, t, l);
  return nr(c);
}
var u8,
  i,
  n8,
  el,
  Pn,
  Lh,
  kN,
  m3,
  e3,
  $u,
  Z2,
  gn,
  ct,
  Uf,
  Wf,
  H2,
  Oh,
  f8,
  l8,
  I2,
  Fh,
  Eh,
  X2,
  mn,
  t8,
  s3,
  e,
  nh,
  fh = !1,
  Al,
  wt,
  _8,
  ol,
  VN,
  vN,
  Ph = null,
  Ah = null,
  Mf = null,
  Sf = null,
  th = !1,
  Rh = !1,
  G0,
  xl = !1,
  Kt = null,
  Pt = !1,
  kh = null,
  pN,
  X8,
  r4,
  eN,
  sN,
  a,
  aN,
  O2,
  L8,
  At,
  uQ,
  O8,
  fr = null,
  Hn = null,
  Qn,
  fQ,
  lQ,
  zt = 64,
  _t = 4194304,
  k = 0,
  q8,
  E2,
  M8,
  S8,
  B8,
  Th = !1,
  Nt,
  f0 = null,
  l0 = null,
  t0 = null,
  u1,
  n1,
  sn,
  wQ,
  Bf,
  kt = !0,
  gt = null,
  u0 = null,
  M2 = null,
  Lt = null,
  Tf,
  S2,
  W1,
  $Q,
  ch,
  hh,
  Gl,
  lr,
  z4,
  UQ,
  WQ,
  ZQ,
  wh,
  JQ,
  YQ,
  HQ,
  IQ,
  XQ,
  _4,
  LQ,
  OQ,
  FQ,
  qQ,
  MQ,
  SQ,
  N4,
  BQ,
  GQ,
  CQ,
  DQ,
  KQ,
  PQ,
  AQ,
  G2,
  Vl = null,
  RQ,
  K8,
  Q4,
  $4 = !1,
  Zf = !1,
  TQ,
  vl = null,
  l1 = null,
  k8 = !1,
  kl,
  gl,
  Ft,
  Un,
  iQ,
  Jf = null,
  jh = null,
  yl = null,
  oh = !1,
  Yf,
  zh,
  j8,
  o8,
  x8,
  V8,
  v8,
  y8,
  H4,
  dl,
  xh,
  Vh,
  Tl,
  jl,
  bQ,
  Ut,
  mQ,
  eQ,
  vh = null,
  yh = null,
  ih,
  sQ,
  O4,
  aQ,
  df,
  Yn,
  h1,
  An,
  bh,
  n$,
  f$,
  mh,
  If = -1,
  N0,
  Lu,
  Au,
  g0,
  Gn = null,
  hr = !1,
  $h = !1,
  Xf,
  Lf = 0,
  xt = null,
  Vt = 0,
  eu,
  su = 0,
  T0 = null,
  Cn = 1,
  Dn = '',
  xu = null,
  ou = null,
  p = !1,
  Nn = null,
  t$,
  Af,
  n5,
  vt,
  yt = null,
  Of = null,
  A2 = null,
  P0 = null,
  en = !1,
  J1,
  In,
  w1,
  z1,
  b,
  Uh,
  qt,
  Wh,
  d0 = 0,
  m = null,
  cu = null,
  wu = null,
  bt = !1,
  pl = !1,
  _1 = 0,
  r$ = 0,
  mt,
  z$,
  _$,
  N$,
  zr,
  Q$,
  $$,
  Pu = !1,
  r2,
  K5,
  h2,
  P5,
  A5,
  Ht = !1,
  Xu = !1,
  Y$,
  q = null,
  V4 = !1,
  Nu = null,
  _n = !1,
  X$,
  et,
  b2,
  un,
  A = 0,
  zu = null,
  tu = null,
  Qu = 0,
  ju = 0,
  Ef,
  hu = 0,
  $1 = null,
  j0 = 0,
  Nr = 0,
  m2 = 0,
  bl = null,
  Ku = null,
  e2 = 0,
  gf = 1 / 0,
  Bn = null,
  st = !1,
  Q2 = null,
  h0 = null,
  It = !1,
  n0 = null,
  at = 0,
  ml = 0,
  $2 = null,
  Bt = -1,
  Gt = 0,
  p5,
  e5,
  A$,
  Kl,
  R$,
  $f,
  s5,
  a5 = function (u, n) {
    var f =
      2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!rw(n)) throw Error(L(200));
    return D$(u, n, null, f);
  },
  u6 = function (u, n) {
    if (!rw(u)) throw Error(L(299));
    var f = !1,
      l = '',
      t = e5;
    return (
      n !== null &&
        n !== void 0 &&
        (n.unstable_strictMode === !0 && (f = !0),
        n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
        n.onRecoverableError !== void 0 && (t = n.onRecoverableError)),
      (n = fw(u, 1, !1, null, null, f, !1, l, t)),
      (u[An] = n.current),
      r1(u.nodeType === 8 ? u.parentNode : u),
      new tw(n)
    );
  },
  n6 = function (u) {
    if (u == null) return null;
    if (u.nodeType === 1) return u;
    var n = u._reactInternals;
    if (n === void 0) {
      if (typeof u.render === 'function') throw Error(L(188));
      throw ((u = Object.keys(u).join(',')), Error(L(268, u)));
    }
    return ((u = H8(n)), (u = u === null ? null : u.stateNode), u);
  },
  f6 = function (u) {
    return o0(u);
  },
  l6 = function (u, n, f) {
    if (!Wr(n)) throw Error(L(200));
    return Zr(null, u, n, !0, f);
  },
  t6 = function (u, n, f) {
    if (!rw(u)) throw Error(L(405));
    var l = (f != null && f.hydratedSources) || null,
      t = !1,
      r = '',
      c = e5;
    if (
      (f !== null &&
        f !== void 0 &&
        (f.unstable_strictMode === !0 && (t = !0),
        f.identifierPrefix !== void 0 && (r = f.identifierPrefix),
        f.onRecoverableError !== void 0 && (c = f.onRecoverableError)),
      (n = m5(n, null, u, 1, f != null ? f : null, t, !1, r, c)),
      (u[An] = n.current),
      r1(u),
      l)
    )
      for (u = 0; u < l.length; u++)
        ((f = l[u]),
          (t = f._getVersion),
          (t = t(f._source)),
          n.mutableSourceEagerHydrationData == null
            ? (n.mutableSourceEagerHydrationData = [f, t])
            : n.mutableSourceEagerHydrationData.push(f, t));
    return new Ur(n);
  },
  r6 = function (u, n, f) {
    if (!Wr(n)) throw Error(L(200));
    return Zr(null, u, n, !1, f);
  },
  c6 = function (u) {
    if (!Wr(u)) throw Error(L(40));
    return u._reactRootContainer
      ? (o0(function () {
          Zr(null, null, u, !1, function () {
            ((u._reactRootContainer = null), (u[An] = null));
          });
        }),
        !0)
      : !1;
  },
  h6,
  w6 = function (u, n, f, l) {
    if (!Wr(f)) throw Error(L(200));
    if (u == null || u._reactInternals === void 0) throw Error(L(38));
    return Zr(u, n, f, !1, l);
  },
  z6 = '18.3.1-next-f1338f8080-20240426';
var _6 = J_(() => {
  ((u8 = R(g(), 1)), (i = R(b3(), 1)));
  ((n8 = new Set()), (el = {}));
  ((Pn = !(
    typeof window === 'undefined' ||
    typeof window.document === 'undefined' ||
    typeof window.document.createElement === 'undefined'
  )),
    (Lh = Object.prototype.hasOwnProperty),
    (kN =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/),
    (m3 = {}),
    (e3 = {}));
  $u = {};
  'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (u) {
      $u[u] = new Bu(u, 0, !1, u, null, !1, !1);
    });
  [
    ['acceptCharset', 'accept-charset'],
    ['className', 'class'],
    ['htmlFor', 'for'],
    ['httpEquiv', 'http-equiv'],
  ].forEach(function (u) {
    var n = u[0];
    $u[n] = new Bu(n, 1, !1, u[1], null, !1, !1);
  });
  ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (u) {
    $u[u] = new Bu(u, 2, !1, u.toLowerCase(), null, !1, !1);
  });
  [
    'autoReverse',
    'externalResourcesRequired',
    'focusable',
    'preserveAlpha',
  ].forEach(function (u) {
    $u[u] = new Bu(u, 2, !1, u, null, !1, !1);
  });
  'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
    .split(' ')
    .forEach(function (u) {
      $u[u] = new Bu(u, 3, !1, u.toLowerCase(), null, !1, !1);
    });
  ['checked', 'multiple', 'muted', 'selected'].forEach(function (u) {
    $u[u] = new Bu(u, 3, !0, u, null, !1, !1);
  });
  ['capture', 'download'].forEach(function (u) {
    $u[u] = new Bu(u, 4, !1, u, null, !1, !1);
  });
  ['cols', 'rows', 'size', 'span'].forEach(function (u) {
    $u[u] = new Bu(u, 6, !1, u, null, !1, !1);
  });
  ['rowSpan', 'start'].forEach(function (u) {
    $u[u] = new Bu(u, 5, !1, u.toLowerCase(), null, !1, !1);
  });
  Z2 = /[\-:]([a-z])/g;
  'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (u) {
      var n = u.replace(Z2, J2);
      $u[n] = new Bu(n, 1, !1, u, null, !1, !1);
    });
  'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
    .split(' ')
    .forEach(function (u) {
      var n = u.replace(Z2, J2);
      $u[n] = new Bu(n, 1, !1, u, 'http://www.w3.org/1999/xlink', !1, !1);
    });
  ['xml:base', 'xml:lang', 'xml:space'].forEach(function (u) {
    var n = u.replace(Z2, J2);
    $u[n] = new Bu(n, 1, !1, u, 'http://www.w3.org/XML/1998/namespace', !1, !1);
  });
  ['tabIndex', 'crossOrigin'].forEach(function (u) {
    $u[u] = new Bu(u, 1, !1, u.toLowerCase(), null, !1, !1);
  });
  $u.xlinkHref = new Bu(
    'xlinkHref',
    1,
    !1,
    'xlink:href',
    'http://www.w3.org/1999/xlink',
    !0,
    !1
  );
  ['src', 'href', 'action', 'formAction'].forEach(function (u) {
    $u[u] = new Bu(u, 1, !1, u.toLowerCase(), null, !0, !0);
  });
  ((gn = u8.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED),
    (ct = Symbol.for('react.element')),
    (Uf = Symbol.for('react.portal')),
    (Wf = Symbol.for('react.fragment')),
    (H2 = Symbol.for('react.strict_mode')),
    (Oh = Symbol.for('react.profiler')),
    (f8 = Symbol.for('react.provider')),
    (l8 = Symbol.for('react.context')),
    (I2 = Symbol.for('react.forward_ref')),
    (Fh = Symbol.for('react.suspense')),
    (Eh = Symbol.for('react.suspense_list')),
    (X2 = Symbol.for('react.memo')),
    (mn = Symbol.for('react.lazy')),
    (t8 = Symbol.for('react.offscreen')),
    (s3 = Symbol.iterator));
  e = Object.assign;
  Al = Array.isArray;
  _8 = (function (u) {
    return typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction
      ? function (n, f, l, t) {
          MSApp.execUnsafeLocalFunction(function () {
            return u(n, f, l, t);
          });
        }
      : u;
  })(function (u, n) {
    if (u.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in u)
      u.innerHTML = n;
    else {
      ((wt = wt || document.createElement('div')),
        (wt.innerHTML = '<svg>' + n.valueOf().toString() + '</svg>'));
      for (n = wt.firstChild; u.firstChild; ) u.removeChild(u.firstChild);
      for (; n.firstChild; ) u.appendChild(n.firstChild);
    }
  });
  ((ol = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  }),
    (VN = ['Webkit', 'ms', 'Moz', 'O']));
  Object.keys(ol).forEach(function (u) {
    VN.forEach(function (n) {
      ((n = n + u.charAt(0).toUpperCase() + u.substring(1)), (ol[n] = ol[u]));
    });
  });
  vN = e(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  if (Pn)
    try {
      ((G0 = {}),
        Object.defineProperty(G0, 'passive', {
          get: function () {
            Rh = !0;
          },
        }),
        window.addEventListener('test', G0, G0),
        window.removeEventListener('test', G0, G0));
    } catch (u) {
      Rh = !1;
    }
  pN = {
    onError: function (u) {
      ((xl = !0), (Kt = u));
    },
  };
  ((X8 = i.unstable_scheduleCallback),
    (r4 = i.unstable_cancelCallback),
    (eN = i.unstable_shouldYield),
    (sN = i.unstable_requestPaint),
    (a = i.unstable_now),
    (aN = i.unstable_getCurrentPriorityLevel),
    (O2 = i.unstable_ImmediatePriority),
    (L8 = i.unstable_UserBlockingPriority),
    (At = i.unstable_NormalPriority),
    (uQ = i.unstable_LowPriority),
    (O8 = i.unstable_IdlePriority));
  ((Qn = Math.clz32 ? Math.clz32 : tQ), (fQ = Math.log), (lQ = Math.LN2));
  ((Nt = []),
    (u1 = new Map()),
    (n1 = new Map()),
    (sn = []),
    (wQ =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' '
      )));
  Bf = gn.ReactCurrentBatchConfig;
  ((Tf = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (u) {
      return u.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  }),
    (S2 = Vu(Tf)),
    (W1 = e({}, Tf, { view: 0, detail: 0 })),
    ($Q = Vu(W1)),
    (lr = e({}, W1, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: B2,
      button: 0,
      buttons: 0,
      relatedTarget: function (u) {
        return u.relatedTarget === void 0
          ? u.fromElement === u.srcElement
            ? u.toElement
            : u.fromElement
          : u.relatedTarget;
      },
      movementX: function (u) {
        if ('movementX' in u) return u.movementX;
        return (
          u !== Gl &&
            (Gl && u.type === 'mousemove'
              ? ((ch = u.screenX - Gl.screenX), (hh = u.screenY - Gl.screenY))
              : (hh = ch = 0),
            (Gl = u)),
          ch
        );
      },
      movementY: function (u) {
        return 'movementY' in u ? u.movementY : hh;
      },
    })),
    (z4 = Vu(lr)),
    (UQ = e({}, lr, { dataTransfer: 0 })),
    (WQ = Vu(UQ)),
    (ZQ = e({}, W1, { relatedTarget: 0 })),
    (wh = Vu(ZQ)),
    (JQ = e({}, Tf, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
    (YQ = Vu(JQ)),
    (HQ = e({}, Tf, {
      clipboardData: function (u) {
        return 'clipboardData' in u ? u.clipboardData : window.clipboardData;
      },
    })),
    (IQ = Vu(HQ)),
    (XQ = e({}, Tf, { data: 0 })),
    (_4 = Vu(XQ)),
    (LQ = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    }),
    (OQ = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    }),
    (FQ = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    }));
  ((qQ = e({}, W1, {
    key: function (u) {
      if (u.key) {
        var n = LQ[u.key] || u.key;
        if (n !== 'Unidentified') return n;
      }
      return u.type === 'keypress'
        ? ((u = Ot(u)), u === 13 ? 'Enter' : String.fromCharCode(u))
        : u.type === 'keydown' || u.type === 'keyup'
          ? OQ[u.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: B2,
    charCode: function (u) {
      return u.type === 'keypress' ? Ot(u) : 0;
    },
    keyCode: function (u) {
      return u.type === 'keydown' || u.type === 'keyup' ? u.keyCode : 0;
    },
    which: function (u) {
      return u.type === 'keypress'
        ? Ot(u)
        : u.type === 'keydown' || u.type === 'keyup'
          ? u.keyCode
          : 0;
    },
  })),
    (MQ = Vu(qQ)),
    (SQ = e({}, lr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    })),
    (N4 = Vu(SQ)),
    (BQ = e({}, W1, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: B2,
    })),
    (GQ = Vu(BQ)),
    (CQ = e({}, Tf, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
    (DQ = Vu(CQ)),
    (KQ = e({}, lr, {
      deltaX: function (u) {
        return 'deltaX' in u
          ? u.deltaX
          : 'wheelDeltaX' in u
            ? -u.wheelDeltaX
            : 0;
      },
      deltaY: function (u) {
        return 'deltaY' in u
          ? u.deltaY
          : 'wheelDeltaY' in u
            ? -u.wheelDeltaY
            : 'wheelDelta' in u
              ? -u.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    })),
    (PQ = Vu(KQ)),
    (AQ = [9, 13, 27, 32]),
    (G2 = Pn && 'CompositionEvent' in window));
  Pn && 'documentMode' in document && (Vl = document.documentMode);
  ((RQ = Pn && 'TextEvent' in window && !Vl),
    (K8 = Pn && (!G2 || (Vl && 8 < Vl && 11 >= Vl))),
    (Q4 = String.fromCharCode(32)));
  TQ = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  if (Pn) {
    if (Pn) {
      if (((gl = 'oninput' in document), !gl))
        ((Ft = document.createElement('div')),
          Ft.setAttribute('oninput', 'return;'),
          (gl = typeof Ft.oninput === 'function'));
      kl = gl;
    } else kl = !1;
    k8 = kl && (!document.documentMode || 9 < document.documentMode);
  }
  Un = typeof Object.is === 'function' ? Object.is : yQ;
  iQ = Pn && 'documentMode' in document && 11 >= document.documentMode;
  ((Yf = {
    animationend: $t('Animation', 'AnimationEnd'),
    animationiteration: $t('Animation', 'AnimationIteration'),
    animationstart: $t('Animation', 'AnimationStart'),
    transitionend: $t('Transition', 'TransitionEnd'),
  }),
    (zh = {}),
    (j8 = {}));
  Pn &&
    ((j8 = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Yf.animationend.animation,
      delete Yf.animationiteration.animation,
      delete Yf.animationstart.animation),
    'TransitionEvent' in window || delete Yf.transitionend.transition);
  ((o8 = rr('animationend')),
    (x8 = rr('animationiteration')),
    (V8 = rr('animationstart')),
    (v8 = rr('transitionend')),
    (y8 = new Map()),
    (H4 =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      )));
  for (Tl = 0; Tl < H4.length; Tl++)
    ((dl = H4[Tl]),
      (xh = dl.toLowerCase()),
      (Vh = dl[0].toUpperCase() + dl.slice(1)),
      Q0(xh, 'on' + Vh));
  Q0(o8, 'onAnimationEnd');
  Q0(x8, 'onAnimationIteration');
  Q0(V8, 'onAnimationStart');
  Q0('dblclick', 'onDoubleClick');
  Q0('focusin', 'onFocus');
  Q0('focusout', 'onBlur');
  Q0(v8, 'onTransitionEnd');
  Df('onMouseEnter', ['mouseout', 'mouseover']);
  Df('onMouseLeave', ['mouseout', 'mouseover']);
  Df('onPointerEnter', ['pointerout', 'pointerover']);
  Df('onPointerLeave', ['pointerout', 'pointerover']);
  x0(
    'onChange',
    'change click focusin focusout input keydown keyup selectionchange'.split(
      ' '
    )
  );
  x0(
    'onSelect',
    'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
      ' '
    )
  );
  x0('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
  x0(
    'onCompositionEnd',
    'compositionend focusout keydown keypress keyup mousedown'.split(' ')
  );
  x0(
    'onCompositionStart',
    'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
  );
  x0(
    'onCompositionUpdate',
    'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
  );
  ((jl =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    )),
    (bQ = new Set(
      'cancel close invalid load scroll toggle'.split(' ').concat(jl)
    )));
  Ut = '_reactListening' + Math.random().toString(36).slice(2);
  ((mQ = /\r\n?/g), (eQ = /\u0000|\uFFFD/g));
  ((ih = typeof setTimeout === 'function' ? setTimeout : void 0),
    (sQ = typeof clearTimeout === 'function' ? clearTimeout : void 0),
    (O4 = typeof Promise === 'function' ? Promise : void 0),
    (aQ =
      typeof queueMicrotask === 'function'
        ? queueMicrotask
        : typeof O4 !== 'undefined'
          ? function (u) {
              return O4.resolve(null).then(u).catch(u$);
            }
          : ih));
  ((df = Math.random().toString(36).slice(2)),
    (Yn = '__reactFiber$' + df),
    (h1 = '__reactProps$' + df),
    (An = '__reactContainer$' + df),
    (bh = '__reactEvents$' + df),
    (n$ = '__reactListeners$' + df),
    (f$ = '__reactHandles$' + df));
  mh = [];
  ((N0 = {}), (Lu = $0(N0)), (Au = $0(!1)), (g0 = N0));
  ((Xf = []), (eu = []));
  t$ = gn.ReactCurrentBatchConfig;
  ((Af = u5(!0)), (n5 = u5(!1)), (vt = $0(null)));
  ((J1 = {}), (In = $0(J1)), (w1 = $0(J1)), (z1 = $0(J1)));
  b = $0(0);
  Uh = [];
  ((qt = gn.ReactCurrentDispatcher), (Wh = gn.ReactCurrentBatchConfig));
  ((mt = {
    readContext: nn,
    useCallback: Hu,
    useContext: Hu,
    useEffect: Hu,
    useImperativeHandle: Hu,
    useInsertionEffect: Hu,
    useLayoutEffect: Hu,
    useMemo: Hu,
    useReducer: Hu,
    useRef: Hu,
    useState: Hu,
    useDebugValue: Hu,
    useDeferredValue: Hu,
    useTransition: Hu,
    useMutableSource: Hu,
    useSyncExternalStore: Hu,
    useId: Hu,
    unstable_isNewReconciler: !1,
  }),
    (z$ = {
      readContext: nn,
      useCallback: function (u, n) {
        return ((Jn().memoizedState = [u, n === void 0 ? null : n]), u);
      },
      useContext: nn,
      useEffect: K4,
      useImperativeHandle: function (u, n, f) {
        return (
          (f = f !== null && f !== void 0 ? f.concat([u]) : null),
          Mt(4194308, 4, W5.bind(null, n, u), f)
        );
      },
      useLayoutEffect: function (u, n) {
        return Mt(4194308, 4, u, n);
      },
      useInsertionEffect: function (u, n) {
        return Mt(4, 2, u, n);
      },
      useMemo: function (u, n) {
        var f = Jn();
        return (
          (n = n === void 0 ? null : n),
          (u = u()),
          (f.memoizedState = [u, n]),
          u
        );
      },
      useReducer: function (u, n, f) {
        var l = Jn();
        return (
          (n = f !== void 0 ? f(n) : n),
          (l.memoizedState = l.baseState = n),
          (u = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: u,
            lastRenderedState: n,
          }),
          (l.queue = u),
          (u = u.dispatch = h$.bind(null, m, u)),
          [l.memoizedState, u]
        );
      },
      useRef: function (u) {
        var n = Jn();
        return ((u = { current: u }), (n.memoizedState = u));
      },
      useState: D4,
      useDebugValue: p2,
      useDeferredValue: function (u) {
        return (Jn().memoizedState = u);
      },
      useTransition: function () {
        var u = D4(!1),
          n = u[0];
        return ((u = c$.bind(null, u[1])), (Jn().memoizedState = u), [n, u]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (u, n, f) {
        var l = m,
          t = Jn();
        if (p) {
          if (f === void 0) throw Error(L(407));
          f = f();
        } else {
          if (((f = n()), zu === null)) throw Error(L(349));
          (d0 & 30) !== 0 || h5(l, n, f);
        }
        t.memoizedState = f;
        var r = { value: f, getSnapshot: n };
        return (
          (t.queue = r),
          K4(z5.bind(null, l, r, u), [u]),
          (l.flags |= 2048),
          Q1(9, w5.bind(null, l, r, f, n), void 0, null),
          f
        );
      },
      useId: function () {
        var u = Jn(),
          n = zu.identifierPrefix;
        if (p) {
          var f = Dn,
            l = Cn;
          ((f = (l & ~(1 << (32 - Qn(l) - 1))).toString(32) + f),
            (n = ':' + n + 'R' + f),
            (f = _1++),
            0 < f && (n += 'H' + f.toString(32)),
            (n += ':'));
        } else ((f = r$++), (n = ':' + n + 'r' + f.toString(32) + ':'));
        return (u.memoizedState = n);
      },
      unstable_isNewReconciler: !1,
    }),
    (_$ = {
      readContext: nn,
      useCallback: J5,
      useContext: nn,
      useEffect: y2,
      useImperativeHandle: Z5,
      useInsertionEffect: $5,
      useLayoutEffect: U5,
      useMemo: Y5,
      useReducer: Zh,
      useRef: Q5,
      useState: function () {
        return Zh(N1);
      },
      useDebugValue: p2,
      useDeferredValue: function (u) {
        var n = fn();
        return H5(n, cu.memoizedState, u);
      },
      useTransition: function () {
        var u = Zh(N1)[0],
          n = fn().memoizedState;
        return [u, n];
      },
      useMutableSource: r5,
      useSyncExternalStore: c5,
      useId: I5,
      unstable_isNewReconciler: !1,
    }),
    (N$ = {
      readContext: nn,
      useCallback: J5,
      useContext: nn,
      useEffect: y2,
      useImperativeHandle: Z5,
      useInsertionEffect: $5,
      useLayoutEffect: U5,
      useMemo: Y5,
      useReducer: Jh,
      useRef: Q5,
      useState: function () {
        return Jh(N1);
      },
      useDebugValue: p2,
      useDeferredValue: function (u) {
        var n = fn();
        return cu === null ? (n.memoizedState = u) : H5(n, cu.memoizedState, u);
      },
      useTransition: function () {
        var u = Jh(N1)[0],
          n = fn().memoizedState;
        return [u, n];
      },
      useMutableSource: r5,
      useSyncExternalStore: c5,
      useId: I5,
      unstable_isNewReconciler: !1,
    }));
  zr = {
    isMounted: function (u) {
      return (u = u._reactInternals) ? V0(u) === u : !1;
    },
    enqueueSetState: function (u, n, f) {
      u = u._reactInternals;
      var l = Su(),
        t = w0(u),
        r = Kn(l, t);
      ((r.payload = n),
        f !== void 0 && f !== null && (r.callback = f),
        (n = c0(u, r, t)),
        n !== null && ($n(n, u, t, l), Et(n, u, t)));
    },
    enqueueReplaceState: function (u, n, f) {
      u = u._reactInternals;
      var l = Su(),
        t = w0(u),
        r = Kn(l, t);
      ((r.tag = 1),
        (r.payload = n),
        f !== void 0 && f !== null && (r.callback = f),
        (n = c0(u, r, t)),
        n !== null && ($n(n, u, t, l), Et(n, u, t)));
    },
    enqueueForceUpdate: function (u, n) {
      u = u._reactInternals;
      var f = Su(),
        l = w0(u),
        t = Kn(f, l);
      ((t.tag = 2),
        n !== void 0 && n !== null && (t.callback = n),
        (n = c0(u, t, l)),
        n !== null && ($n(n, u, l, f), Et(n, u, l)));
    },
  };
  Q$ = typeof WeakMap === 'function' ? WeakMap : Map;
  $$ = gn.ReactCurrentOwner;
  r2 = { dehydrated: null, treeContext: null, retryLane: 0 };
  K5 = function (u, n) {
    for (var f = n.child; f !== null; ) {
      if (f.tag === 5 || f.tag === 6) u.appendChild(f.stateNode);
      else if (f.tag !== 4 && f.child !== null) {
        ((f.child.return = f), (f = f.child));
        continue;
      }
      if (f === n) break;
      for (; f.sibling === null; ) {
        if (f.return === null || f.return === n) return;
        f = f.return;
      }
      ((f.sibling.return = f.return), (f = f.sibling));
    }
  };
  h2 = function () {};
  P5 = function (u, n, f, l) {
    var t = u.memoizedProps;
    if (t !== l) {
      ((u = n.stateNode), A0(In.current));
      var r = null;
      switch (f) {
        case 'input':
          ((t = Mh(u, t)), (l = Mh(u, l)), (r = []));
          break;
        case 'select':
          ((t = e({}, t, { value: void 0 })),
            (l = e({}, l, { value: void 0 })),
            (r = []));
          break;
        case 'textarea':
          ((t = Gh(u, t)), (l = Gh(u, l)), (r = []));
          break;
        default:
          typeof t.onClick !== 'function' &&
            typeof l.onClick === 'function' &&
            (u.onclick = dt);
      }
      Dh(f, l);
      var c;
      f = null;
      for (z in t)
        if (!l.hasOwnProperty(z) && t.hasOwnProperty(z) && t[z] != null)
          if (z === 'style') {
            var h = t[z];
            for (c in h) h.hasOwnProperty(c) && (f || (f = {}), (f[c] = ''));
          } else
            z !== 'dangerouslySetInnerHTML' &&
              z !== 'children' &&
              z !== 'suppressContentEditableWarning' &&
              z !== 'suppressHydrationWarning' &&
              z !== 'autoFocus' &&
              (el.hasOwnProperty(z)
                ? r || (r = [])
                : (r = r || []).push(z, null));
      for (z in l) {
        var w = l[z];
        if (
          ((h = t != null ? t[z] : void 0),
          l.hasOwnProperty(z) && w !== h && (w != null || h != null))
        )
          if (z === 'style')
            if (h) {
              for (c in h)
                !h.hasOwnProperty(c) ||
                  (w && w.hasOwnProperty(c)) ||
                  (f || (f = {}), (f[c] = ''));
              for (c in w)
                w.hasOwnProperty(c) &&
                  h[c] !== w[c] &&
                  (f || (f = {}), (f[c] = w[c]));
            } else (f || (r || (r = []), r.push(z, f)), (f = w));
          else
            z === 'dangerouslySetInnerHTML'
              ? ((w = w ? w.__html : void 0),
                (h = h ? h.__html : void 0),
                w != null && h !== w && (r = r || []).push(z, w))
              : z === 'children'
                ? (typeof w !== 'string' && typeof w !== 'number') ||
                  (r = r || []).push(z, '' + w)
                : z !== 'suppressContentEditableWarning' &&
                  z !== 'suppressHydrationWarning' &&
                  (el.hasOwnProperty(z)
                    ? (w != null && z === 'onScroll' && o('scroll', u),
                      r || h === w || (r = []))
                    : (r = r || []).push(z, w));
      }
      f && (r = r || []).push('style', f);
      var z = r;
      if ((n.updateQueue = z)) n.flags |= 4;
    }
  };
  A5 = function (u, n, f, l) {
    f !== l && (n.flags |= 4);
  };
  Y$ = typeof WeakSet === 'function' ? WeakSet : Set;
  ((X$ = Math.ceil),
    (et = gn.ReactCurrentDispatcher),
    (b2 = gn.ReactCurrentOwner),
    (un = gn.ReactCurrentBatchConfig),
    (Ef = $0(0)));
  p5 = function (u, n, f) {
    if (u !== null)
      if (u.memoizedProps !== n.pendingProps || Au.current) Pu = !0;
      else {
        if ((u.lanes & f) === 0 && (n.flags & 128) === 0)
          return ((Pu = !1), W$(u, n, f));
        Pu = (u.flags & 131072) !== 0 ? !0 : !1;
      }
    else ((Pu = !1), p && (n.flags & 1048576) !== 0 && e8(n, Vt, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 2:
        var l = n.type;
        (St(u, n), (u = n.pendingProps));
        var t = Kf(n, Lu.current);
        (Gf(n, f), (t = V2(null, n, l, u, t, f)));
        var r = v2();
        return (
          (n.flags |= 1),
          typeof t === 'object' &&
          t !== null &&
          typeof t.render === 'function' &&
          t.$$typeof === void 0
            ? ((n.tag = 1),
              (n.memoizedState = null),
              (n.updateQueue = null),
              Ru(l) ? ((r = !0), ot(n)) : (r = !1),
              (n.memoizedState =
                t.state !== null && t.state !== void 0 ? t.state : null),
              T2(n),
              (t.updater = zr),
              (n.stateNode = t),
              (t._reactInternals = n),
              n2(n, l, u, f),
              (n = t2(null, n, l, !0, r, f)))
            : ((n.tag = 0), p && r && D2(n), Mu(null, n, t, f), (n = n.child)),
          n
        );
      case 16:
        l = n.elementType;
        u: {
          switch (
            (St(u, n),
            (u = n.pendingProps),
            (t = l._init),
            (l = t(l._payload)),
            (n.type = l),
            (t = n.tag = G$(l)),
            (u = zn(l, u)),
            t)
          ) {
            case 0:
              n = l2(null, n, l, u, f);
              break u;
            case 1:
              n = j4(null, n, l, u, f);
              break u;
            case 11:
              n = T4(null, n, l, u, f);
              break u;
            case 14:
              n = d4(null, n, l, zn(l.type, u), f);
              break u;
          }
          throw Error(L(306, l, ''));
        }
        return n;
      case 0:
        return (
          (l = n.type),
          (t = n.pendingProps),
          (t = n.elementType === l ? t : zn(l, t)),
          l2(u, n, l, t, f)
        );
      case 1:
        return (
          (l = n.type),
          (t = n.pendingProps),
          (t = n.elementType === l ? t : zn(l, t)),
          j4(u, n, l, t, f)
        );
      case 3:
        u: {
          if ((G5(n), u === null)) throw Error(L(387));
          ((l = n.pendingProps),
            (r = n.memoizedState),
            (t = r.element),
            l5(u, n),
            pt(n, l, null, f));
          var c = n.memoizedState;
          if (((l = c.element), r.isDehydrated))
            if (
              ((r = {
                element: l,
                isDehydrated: !1,
                cache: c.cache,
                pendingSuspenseBoundaries: c.pendingSuspenseBoundaries,
                transitions: c.transitions,
              }),
              (n.updateQueue.baseState = r),
              (n.memoizedState = r),
              n.flags & 256)
            ) {
              ((t = kf(Error(L(423)), n)), (n = o4(u, n, l, f, t)));
              break u;
            } else if (l !== t) {
              ((t = kf(Error(L(424)), n)), (n = o4(u, n, l, f, t)));
              break u;
            } else
              for (
                ou = r0(n.stateNode.containerInfo.firstChild),
                  xu = n,
                  p = !0,
                  Nn = null,
                  f = n5(n, null, l, f),
                  n.child = f;
                f;
              )
                ((f.flags = (f.flags & -3) | 4096), (f = f.sibling));
          else {
            if ((Pf(), l === t)) {
              n = kn(u, n, f);
              break u;
            }
            Mu(u, n, l, f);
          }
          n = n.child;
        }
        return n;
      case 5:
        return (
          t5(n),
          u === null && sh(n),
          (l = n.type),
          (t = n.pendingProps),
          (r = u !== null ? u.memoizedProps : null),
          (c = t.children),
          ph(l, t) ? (c = null) : r !== null && ph(l, r) && (n.flags |= 32),
          B5(u, n),
          Mu(u, n, c, f),
          n.child
        );
      case 6:
        return (u === null && sh(n), null);
      case 13:
        return C5(u, n, f);
      case 4:
        return (
          d2(n, n.stateNode.containerInfo),
          (l = n.pendingProps),
          u === null ? (n.child = Af(n, null, l, f)) : Mu(u, n, l, f),
          n.child
        );
      case 11:
        return (
          (l = n.type),
          (t = n.pendingProps),
          (t = n.elementType === l ? t : zn(l, t)),
          T4(u, n, l, t, f)
        );
      case 7:
        return (Mu(u, n, n.pendingProps, f), n.child);
      case 8:
        return (Mu(u, n, n.pendingProps.children, f), n.child);
      case 12:
        return (Mu(u, n, n.pendingProps.children, f), n.child);
      case 10:
        u: {
          if (
            ((l = n.type._context),
            (t = n.pendingProps),
            (r = n.memoizedProps),
            (c = t.value),
            d(vt, l._currentValue),
            (l._currentValue = c),
            r !== null)
          )
            if (Un(r.value, c)) {
              if (r.children === t.children && !Au.current) {
                n = kn(u, n, f);
                break u;
              }
            } else
              for (r = n.child, r !== null && (r.return = n); r !== null; ) {
                var h = r.dependencies;
                if (h !== null) {
                  c = r.child;
                  for (var w = h.firstContext; w !== null; ) {
                    if (w.context === l) {
                      if (r.tag === 1) {
                        ((w = Kn(-1, f & -f)), (w.tag = 2));
                        var z = r.updateQueue;
                        if (z !== null) {
                          z = z.shared;
                          var _ = z.pending;
                          (_ === null
                            ? (w.next = w)
                            : ((w.next = _.next), (_.next = w)),
                            (z.pending = w));
                        }
                      }
                      ((r.lanes |= f),
                        (w = r.alternate),
                        w !== null && (w.lanes |= f),
                        ah(r.return, f, n),
                        (h.lanes |= f));
                      break;
                    }
                    w = w.next;
                  }
                } else if (r.tag === 10) c = r.type === n.type ? null : r.child;
                else if (r.tag === 18) {
                  if (((c = r.return), c === null)) throw Error(L(341));
                  ((c.lanes |= f),
                    (h = c.alternate),
                    h !== null && (h.lanes |= f),
                    ah(c, f, n),
                    (c = r.sibling));
                } else c = r.child;
                if (c !== null) c.return = r;
                else
                  for (c = r; c !== null; ) {
                    if (c === n) {
                      c = null;
                      break;
                    }
                    if (((r = c.sibling), r !== null)) {
                      ((r.return = c.return), (c = r));
                      break;
                    }
                    c = c.return;
                  }
                r = c;
              }
          (Mu(u, n, t.children, f), (n = n.child));
        }
        return n;
      case 9:
        return (
          (t = n.type),
          (l = n.pendingProps.children),
          Gf(n, f),
          (t = nn(t)),
          (l = l(t)),
          (n.flags |= 1),
          Mu(u, n, l, f),
          n.child
        );
      case 14:
        return (
          (l = n.type),
          (t = zn(l, n.pendingProps)),
          (t = zn(l.type, t)),
          d4(u, n, l, t, f)
        );
      case 15:
        return M5(u, n, n.type, n.pendingProps, f);
      case 17:
        return (
          (l = n.type),
          (t = n.pendingProps),
          (t = n.elementType === l ? t : zn(l, t)),
          St(u, n),
          (n.tag = 1),
          Ru(l) ? ((u = !0), ot(n)) : (u = !1),
          Gf(n, f),
          F5(n, l, t),
          n2(n, l, t, f),
          t2(null, n, l, !0, u, f)
        );
      case 19:
        return D5(u, n, f);
      case 22:
        return S5(u, n, f);
    }
    throw Error(L(156, n.tag));
  };
  e5 =
    typeof reportError === 'function'
      ? reportError
      : function (u) {
          console.error(u);
        };
  Ur.prototype.render = tw.prototype.render = function (u) {
    var n = this._internalRoot;
    if (n === null) throw Error(L(409));
    $r(u, n, null, null);
  };
  Ur.prototype.unmount = tw.prototype.unmount = function () {
    var u = this._internalRoot;
    if (u !== null) {
      this._internalRoot = null;
      var n = u.containerInfo;
      (o0(function () {
        $r(null, u, null, null);
      }),
        (n[An] = null));
    }
  };
  Ur.prototype.unstable_scheduleHydration = function (u) {
    if (u) {
      var n = S8();
      u = { blockedOn: null, target: u, priority: n };
      for (var f = 0; f < sn.length && n !== 0 && n < sn[f].priority; f++);
      (sn.splice(f, 0, u), f === 0 && G8(u));
    }
  };
  q8 = function (u) {
    switch (u.tag) {
      case 3:
        var n = u.stateNode;
        if (n.current.memoizedState.isDehydrated) {
          var f = Rl(n.pendingLanes);
          f !== 0 &&
            (F2(n, f | 1),
            ku(n, a()),
            (A & 6) === 0 && ((gf = a() + 500), U0()));
        }
        break;
      case 13:
        (o0(function () {
          var l = Rn(u, 1);
          if (l !== null) {
            var t = Su();
            $n(l, u, 1, t);
          }
        }),
          lw(u, 1));
    }
  };
  E2 = function (u) {
    if (u.tag === 13) {
      var n = Rn(u, 134217728);
      if (n !== null) {
        var f = Su();
        $n(n, u, 134217728, f);
      }
      lw(u, 134217728);
    }
  };
  M8 = function (u) {
    if (u.tag === 13) {
      var n = w0(u),
        f = Rn(u, n);
      if (f !== null) {
        var l = Su();
        $n(f, u, n, l);
      }
      lw(u, n);
    }
  };
  S8 = function () {
    return k;
  };
  B8 = function (u, n) {
    var f = k;
    try {
      return ((k = u), n());
    } finally {
      k = f;
    }
  };
  Ah = function (u, n, f) {
    switch (n) {
      case 'input':
        if ((Sh(u, f), (n = f.name), f.type === 'radio' && n != null)) {
          for (f = u; f.parentNode; ) f = f.parentNode;
          f = f.querySelectorAll(
            'input[name=' + JSON.stringify('' + n) + '][type="radio"]'
          );
          for (n = 0; n < f.length; n++) {
            var l = f[n];
            if (l !== u && l.form === u.form) {
              var t = cr(l);
              if (!t) throw Error(L(90));
              (c8(l), Sh(l, t));
            }
          }
        }
        break;
      case 'textarea':
        w8(u, f);
        break;
      case 'select':
        ((n = f.value), n != null && qf(u, !!f.multiple, n, !1));
    }
  };
  W8 = s2;
  Z8 = o0;
  ((A$ = { usingClientEntryPoint: !1, Events: [Z1, Hf, cr, $8, U8, s2] }),
    (Kl = {
      findFiberByHostInstance: K0,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    }),
    (R$ = {
      bundleType: Kl.bundleType,
      version: Kl.version,
      rendererPackageName: Kl.rendererPackageName,
      rendererConfig: Kl.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: gn.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (u) {
        return ((u = H8(u)), u === null ? null : u.stateNode);
      },
      findFiberByHostInstance: Kl.findFiberByHostInstance || K$,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    }));
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    if (
      (($f = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !$f.isDisabled && $f.supportsFiber)
    )
      try {
        ((fr = $f.inject(R$)), (Hn = $f));
      } catch (u) {}
  }
  ((s5 = A$), (h6 = s2));
});
var $6 = b1((GZ, Q6) => {
  _6();
  function N6() {
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
    )
      return;
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(N6);
    } catch (u) {
      console.error(u);
    }
  }
  (N6(), (Q6.exports = cw));
});
var U6 = b1(g$ => {
  var Y1 = R($6(), 1);
  ((g$.createRoot = Y1.createRoot), (g$.hydrateRoot = Y1.hydrateRoot));
  var k$;
});
var tn = R(g(), 1),
  w_ = R(U6(), 1);
var Yr = R(g(), 1);
var W6 = u => u.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Jr = (...u) =>
    u
      .filter((n, f, l) => {
        return Boolean(n) && l.indexOf(n) === f;
      })
      .join(' ');
var H1 = R(g(), 1);
var Z6 = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
var J6 = H1.forwardRef(
  (
    {
      color: u = 'currentColor',
      size: n = 24,
      strokeWidth: f = 2,
      absoluteStrokeWidth: l,
      className: t = '',
      children: r,
      iconNode: c,
      ...h
    },
    w
  ) => {
    return H1.createElement(
      'svg',
      {
        ref: w,
        ...Z6,
        width: n,
        height: n,
        stroke: u,
        strokeWidth: l ? (Number(f) * 24) / Number(n) : f,
        className: Jr('lucide', t),
        ...h,
      },
      [
        ...c.map(([z, _]) => H1.createElement(z, _)),
        ...(Array.isArray(r) ? r : [r]),
      ]
    );
  }
);
var Xn = (u, n) => {
  let f = Yr.forwardRef(({ className: l, ...t }, r) =>
    Yr.createElement(J6, {
      ref: r,
      iconNode: n,
      className: Jr(`lucide-${W6(u)}`, l),
      ...t,
    })
  );
  return ((f.displayName = `${u}`), f);
};
var I1 = Xn('ChevronLeft', [['path', { d: 'm15 18-6-6 6-6', key: '1wnfg3' }]]);
var X1 = Xn('ChevronRight', [['path', { d: 'm9 18 6-6-6-6', key: 'mthhwq' }]]);
var L1 = Xn('Compass', [
  [
    'path',
    {
      d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
      key: '9ktpf1',
    },
  ],
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
]);
var O1 = Xn('Pause', [
  [
    'rect',
    { x: '14', y: '4', width: '4', height: '16', rx: '1', key: 'zuxfzm' },
  ],
  [
    'rect',
    { x: '6', y: '4', width: '4', height: '16', rx: '1', key: '1okwgv' },
  ],
]);
var F1 = Xn('Play', [
  ['polygon', { points: '6 3 20 12 6 21 6 3', key: '1oa8hb' }],
]);
var Ou = R(g(), 1);
import * as B from 'three';
import { ShaderMaterial as Y6, UniformsUtils as y$ } from 'three';
import {
  OrthographicCamera as j$,
  PlaneGeometry as o$,
  Mesh as x$,
} from 'three';
var T$ = Object.defineProperty,
  d$ = (u, n, f) =>
    n in u
      ? T$(u, n, { enumerable: !0, configurable: !0, writable: !0, value: f })
      : (u[n] = f),
  v0 = (u, n, f) => {
    return (d$(u, typeof n !== 'symbol' ? n + '' : n, f), f);
  };
class Ln {
  constructor() {
    (v0(this, 'enabled', !0),
      v0(this, 'needsSwap', !0),
      v0(this, 'clear', !1),
      v0(this, 'renderToScreen', !1));
  }
  setSize(u, n) {}
  render(u, n, f, l, t) {
    console.error('THREE.Pass: .render() must be implemented in derived pass.');
  }
  dispose() {}
}
class E1 {
  constructor(u) {
    (v0(this, 'camera', new j$(-1, 1, 1, -1, 0, 1)),
      v0(this, 'geometry', new o$(2, 2)),
      v0(this, 'mesh'),
      (this.mesh = new x$(this.geometry, u)));
  }
  get material() {
    return this.mesh.material;
  }
  set material(u) {
    this.mesh.material = u;
  }
  dispose() {
    this.mesh.geometry.dispose();
  }
  render(u) {
    u.render(this.mesh, this.camera);
  }
}
var V$ = Object.defineProperty,
  v$ = (u, n, f) =>
    n in u
      ? V$(u, n, { enumerable: !0, configurable: !0, writable: !0, value: f })
      : (u[n] = f),
  Hr = (u, n, f) => {
    return (v$(u, typeof n !== 'symbol' ? n + '' : n, f), f);
  };
class Ir extends Ln {
  constructor(u, n = 'tDiffuse') {
    super();
    if (
      (Hr(this, 'textureID'),
      Hr(this, 'uniforms'),
      Hr(this, 'material'),
      Hr(this, 'fsQuad'),
      (this.textureID = n),
      u instanceof Y6)
    )
      ((this.uniforms = u.uniforms), (this.material = u));
    else
      ((this.uniforms = y$.clone(u.uniforms)),
        (this.material = new Y6({
          defines: Object.assign({}, u.defines),
          uniforms: this.uniforms,
          vertexShader: u.vertexShader,
          fragmentShader: u.fragmentShader,
        })));
    this.fsQuad = new E1(this.material);
  }
  render(u, n, f) {
    if (this.uniforms[this.textureID])
      this.uniforms[this.textureID].value = f.texture;
    if (((this.fsQuad.material = this.material), this.renderToScreen))
      (u.setRenderTarget(null), this.fsQuad.render(u));
    else {
      if ((u.setRenderTarget(n), this.clear))
        u.clear(u.autoClearColor, u.autoClearDepth, u.autoClearStencil);
      this.fsQuad.render(u);
    }
  }
  dispose() {
    (this.fsQuad.dispose(), this.material.dispose());
  }
}
var q1 = {
  uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
  vertexShader: `
    varying vec2 vUv;

    void main() {

    	vUv = uv;
    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
  fragmentShader: `
    uniform float opacity;

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );
    	gl_FragColor = opacity * texel;

    }
  `,
};
import {
  Vector2 as W0,
  Color as X6,
  WebGLRenderTarget as hw,
  HalfFloatType as ww,
  UniformsUtils as L6,
  ShaderMaterial as Xr,
  Vector3 as M1,
  AdditiveBlending as m$,
  MeshBasicMaterial as e$,
} from 'three';
import { Color as p$ } from 'three';
var H6 = {
  shaderID: 'luminosityHighPass',
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new p$(0) },
    defaultOpacity: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {

    	vUv = uv;

    	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec3 defaultColor;
    uniform float defaultOpacity;
    uniform float luminosityThreshold;
    uniform float smoothWidth;

    varying vec2 vUv;

    void main() {

    	vec4 texel = texture2D( tDiffuse, vUv );

    	vec3 luma = vec3( 0.299, 0.587, 0.114 );

    	float v = dot( texel.xyz, luma );

    	vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

    	float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

    	gl_FragColor = mix( outputColor, texel, alpha );

    }
  `,
};
var i$ = Object.defineProperty,
  b$ = (u, n, f) =>
    n in u
      ? i$(u, n, { enumerable: !0, configurable: !0, writable: !0, value: f })
      : (u[n] = f),
  I6 = (u, n, f) => {
    return (b$(u, typeof n !== 'symbol' ? n + '' : n, f), f);
  },
  zw = (() => {
    let u = class extends Ln {
        constructor(f, l, t, r) {
          super();
          ((this.strength = l !== void 0 ? l : 1),
            (this.radius = t),
            (this.threshold = r),
            (this.resolution =
              f !== void 0 ? new W0(f.x, f.y) : new W0(256, 256)),
            (this.clearColor = new X6(0, 0, 0)),
            (this.renderTargetsHorizontal = []),
            (this.renderTargetsVertical = []),
            (this.nMips = 5));
          let c = Math.round(this.resolution.x / 2),
            h = Math.round(this.resolution.y / 2);
          ((this.renderTargetBright = new hw(c, h, { type: ww })),
            (this.renderTargetBright.texture.name = 'UnrealBloomPass.bright'),
            (this.renderTargetBright.texture.generateMipmaps = !1));
          for (let Q = 0; Q < this.nMips; Q++) {
            let Z = new hw(c, h, { type: ww });
            ((Z.texture.name = 'UnrealBloomPass.h' + Q),
              (Z.texture.generateMipmaps = !1),
              this.renderTargetsHorizontal.push(Z));
            let Y = new hw(c, h, { type: ww });
            ((Y.texture.name = 'UnrealBloomPass.v' + Q),
              (Y.texture.generateMipmaps = !1),
              this.renderTargetsVertical.push(Y),
              (c = Math.round(c / 2)),
              (h = Math.round(h / 2)));
          }
          let w = H6;
          ((this.highPassUniforms = L6.clone(w.uniforms)),
            (this.highPassUniforms.luminosityThreshold.value = r),
            (this.highPassUniforms.smoothWidth.value = 0.01),
            (this.materialHighPassFilter = new Xr({
              uniforms: this.highPassUniforms,
              vertexShader: w.vertexShader,
              fragmentShader: w.fragmentShader,
              defines: {},
            })),
            (this.separableBlurMaterials = []));
          let z = [3, 5, 7, 9, 11];
          ((c = Math.round(this.resolution.x / 2)),
            (h = Math.round(this.resolution.y / 2)));
          for (let Q = 0; Q < this.nMips; Q++)
            (this.separableBlurMaterials.push(
              this.getSeperableBlurMaterial(z[Q])
            ),
              (this.separableBlurMaterials[Q].uniforms.texSize.value = new W0(
                c,
                h
              )),
              (c = Math.round(c / 2)),
              (h = Math.round(h / 2)));
          ((this.compositeMaterial = this.getCompositeMaterial(this.nMips)),
            (this.compositeMaterial.uniforms.blurTexture1.value =
              this.renderTargetsVertical[0].texture),
            (this.compositeMaterial.uniforms.blurTexture2.value =
              this.renderTargetsVertical[1].texture),
            (this.compositeMaterial.uniforms.blurTexture3.value =
              this.renderTargetsVertical[2].texture),
            (this.compositeMaterial.uniforms.blurTexture4.value =
              this.renderTargetsVertical[3].texture),
            (this.compositeMaterial.uniforms.blurTexture5.value =
              this.renderTargetsVertical[4].texture),
            (this.compositeMaterial.uniforms.bloomStrength.value = l),
            (this.compositeMaterial.uniforms.bloomRadius.value = 0.1),
            (this.compositeMaterial.needsUpdate = !0));
          let _ = [1, 0.8, 0.6, 0.4, 0.2];
          ((this.compositeMaterial.uniforms.bloomFactors.value = _),
            (this.bloomTintColors = [
              new M1(1, 1, 1),
              new M1(1, 1, 1),
              new M1(1, 1, 1),
              new M1(1, 1, 1),
              new M1(1, 1, 1),
            ]),
            (this.compositeMaterial.uniforms.bloomTintColors.value =
              this.bloomTintColors));
          let N = q1;
          ((this.copyUniforms = L6.clone(N.uniforms)),
            (this.copyUniforms.opacity.value = 1),
            (this.materialCopy = new Xr({
              uniforms: this.copyUniforms,
              vertexShader: N.vertexShader,
              fragmentShader: N.fragmentShader,
              blending: m$,
              depthTest: !1,
              depthWrite: !1,
              transparent: !0,
            })),
            (this.enabled = !0),
            (this.needsSwap = !1),
            (this._oldClearColor = new X6()),
            (this.oldClearAlpha = 1),
            (this.basic = new e$()),
            (this.fsQuad = new E1(null)));
        }
        dispose() {
          for (let f = 0; f < this.renderTargetsHorizontal.length; f++)
            this.renderTargetsHorizontal[f].dispose();
          for (let f = 0; f < this.renderTargetsVertical.length; f++)
            this.renderTargetsVertical[f].dispose();
          this.renderTargetBright.dispose();
          for (let f = 0; f < this.separableBlurMaterials.length; f++)
            this.separableBlurMaterials[f].dispose();
          (this.compositeMaterial.dispose(),
            this.materialCopy.dispose(),
            this.basic.dispose(),
            this.fsQuad.dispose());
        }
        setSize(f, l) {
          let t = Math.round(f / 2),
            r = Math.round(l / 2);
          this.renderTargetBright.setSize(t, r);
          for (let c = 0; c < this.nMips; c++)
            (this.renderTargetsHorizontal[c].setSize(t, r),
              this.renderTargetsVertical[c].setSize(t, r),
              (this.separableBlurMaterials[c].uniforms.texSize.value = new W0(
                t,
                r
              )),
              (t = Math.round(t / 2)),
              (r = Math.round(r / 2)));
        }
        render(f, l, t, r, c) {
          (f.getClearColor(this._oldClearColor),
            (this.oldClearAlpha = f.getClearAlpha()));
          let h = f.autoClear;
          if (((f.autoClear = !1), f.setClearColor(this.clearColor, 0), c))
            f.state.buffers.stencil.setTest(!1);
          if (this.renderToScreen)
            ((this.fsQuad.material = this.basic),
              (this.basic.map = t.texture),
              f.setRenderTarget(null),
              f.clear(),
              this.fsQuad.render(f));
          ((this.highPassUniforms.tDiffuse.value = t.texture),
            (this.highPassUniforms.luminosityThreshold.value = this.threshold),
            (this.fsQuad.material = this.materialHighPassFilter),
            f.setRenderTarget(this.renderTargetBright),
            f.clear(),
            this.fsQuad.render(f));
          let w = this.renderTargetBright;
          for (let z = 0; z < this.nMips; z++)
            ((this.fsQuad.material = this.separableBlurMaterials[z]),
              (this.separableBlurMaterials[z].uniforms.colorTexture.value =
                w.texture),
              (this.separableBlurMaterials[z].uniforms.direction.value =
                u.BlurDirectionX),
              f.setRenderTarget(this.renderTargetsHorizontal[z]),
              f.clear(),
              this.fsQuad.render(f),
              (this.separableBlurMaterials[z].uniforms.colorTexture.value =
                this.renderTargetsHorizontal[z].texture),
              (this.separableBlurMaterials[z].uniforms.direction.value =
                u.BlurDirectionY),
              f.setRenderTarget(this.renderTargetsVertical[z]),
              f.clear(),
              this.fsQuad.render(f),
              (w = this.renderTargetsVertical[z]));
          if (
            ((this.fsQuad.material = this.compositeMaterial),
            (this.compositeMaterial.uniforms.bloomStrength.value =
              this.strength),
            (this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
            (this.compositeMaterial.uniforms.bloomTintColors.value =
              this.bloomTintColors),
            f.setRenderTarget(this.renderTargetsHorizontal[0]),
            f.clear(),
            this.fsQuad.render(f),
            (this.fsQuad.material = this.materialCopy),
            (this.copyUniforms.tDiffuse.value =
              this.renderTargetsHorizontal[0].texture),
            c)
          )
            f.state.buffers.stencil.setTest(!0);
          if (this.renderToScreen)
            (f.setRenderTarget(null), this.fsQuad.render(f));
          else (f.setRenderTarget(t), this.fsQuad.render(f));
          (f.setClearColor(this._oldClearColor, this.oldClearAlpha),
            (f.autoClear = h));
        }
        getSeperableBlurMaterial(f) {
          return new Xr({
            defines: { KERNEL_RADIUS: f, SIGMA: f },
            uniforms: {
              colorTexture: { value: null },
              texSize: { value: new W0(0.5, 0.5) },
              direction: { value: new W0(0.5, 0.5) },
            },
            vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`,
          });
        }
        getCompositeMaterial(f) {
          return new Xr({
            defines: { NUM_MIPS: f },
            uniforms: {
              blurTexture1: { value: null },
              blurTexture2: { value: null },
              blurTexture3: { value: null },
              blurTexture4: { value: null },
              blurTexture5: { value: null },
              bloomStrength: { value: 1 },
              bloomFactors: { value: null },
              bloomTintColors: { value: null },
              bloomRadius: { value: 0 },
            },
            vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`,
          });
        }
      },
      n = u;
    return (
      I6(n, 'BlurDirectionX', new W0(1, 0)),
      I6(n, 'BlurDirectionY', new W0(0, 1)),
      n
    );
  })();
var s$ = Object.defineProperty,
  a$ = (u, n, f) =>
    n in u
      ? s$(u, n, { enumerable: !0, configurable: !0, writable: !0, value: f })
      : (u[n] = f),
  _w = (u, n, f) => {
    return (a$(u, typeof n !== 'symbol' ? n + '' : n, f), f);
  };
class Lr extends Ln {
  constructor(u, n) {
    super();
    (_w(this, 'scene'),
      _w(this, 'camera'),
      _w(this, 'inverse'),
      (this.scene = u),
      (this.camera = n),
      (this.clear = !0),
      (this.needsSwap = !1),
      (this.inverse = !1));
  }
  render(u, n, f) {
    let l = u.getContext(),
      t = u.state;
    (t.buffers.color.setMask(!1),
      t.buffers.depth.setMask(!1),
      t.buffers.color.setLocked(!0),
      t.buffers.depth.setLocked(!0));
    let r, c;
    if (this.inverse) ((r = 0), (c = 1));
    else ((r = 1), (c = 0));
    if (
      (t.buffers.stencil.setTest(!0),
      t.buffers.stencil.setOp(l.REPLACE, l.REPLACE, l.REPLACE),
      t.buffers.stencil.setFunc(l.ALWAYS, r, 4294967295),
      t.buffers.stencil.setClear(c),
      t.buffers.stencil.setLocked(!0),
      u.setRenderTarget(f),
      this.clear)
    )
      u.clear();
    if ((u.render(this.scene, this.camera), u.setRenderTarget(n), this.clear))
      u.clear();
    (u.render(this.scene, this.camera),
      t.buffers.color.setLocked(!1),
      t.buffers.depth.setLocked(!1),
      t.buffers.stencil.setLocked(!1),
      t.buffers.stencil.setFunc(l.EQUAL, 1, 4294967295),
      t.buffers.stencil.setOp(l.KEEP, l.KEEP, l.KEEP),
      t.buffers.stencil.setLocked(!0));
  }
}
class Nw extends Ln {
  constructor() {
    super();
    this.needsSwap = !1;
  }
  render(u) {
    (u.state.buffers.stencil.setLocked(!1),
      u.state.buffers.stencil.setTest(!1));
  }
}
import {
  Vector2 as O6,
  WebGLRenderTarget as fU,
  NoBlending as lU,
  Clock as tU,
  LinearFilter as F6,
  RGBAFormat as rU,
} from 'three';
var uU = Object.defineProperty,
  nU = (u, n, f) =>
    n in u
      ? uU(u, n, { enumerable: !0, configurable: !0, writable: !0, value: f })
      : (u[n] = f),
  ln = (u, n, f) => {
    return (nU(u, typeof n !== 'symbol' ? n + '' : n, f), f);
  };
class Or {
  constructor(u, n) {
    if (
      (ln(this, 'renderer'),
      ln(this, '_pixelRatio'),
      ln(this, '_width'),
      ln(this, '_height'),
      ln(this, 'renderTarget1'),
      ln(this, 'renderTarget2'),
      ln(this, 'writeBuffer'),
      ln(this, 'readBuffer'),
      ln(this, 'renderToScreen'),
      ln(this, 'passes', []),
      ln(this, 'copyPass'),
      ln(this, 'clock'),
      (this.renderer = u),
      n === void 0)
    ) {
      let f = { minFilter: F6, magFilter: F6, format: rU },
        l = u.getSize(new O6());
      ((this._pixelRatio = u.getPixelRatio()),
        (this._width = l.width),
        (this._height = l.height),
        (n = new fU(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
          f
        )),
        (n.texture.name = 'EffectComposer.rt1'));
    } else
      ((this._pixelRatio = 1),
        (this._width = n.width),
        (this._height = n.height));
    if (
      ((this.renderTarget1 = n),
      (this.renderTarget2 = n.clone()),
      (this.renderTarget2.texture.name = 'EffectComposer.rt2'),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      q1 === void 0)
    )
      console.error('THREE.EffectComposer relies on CopyShader');
    if (Ir === void 0)
      console.error('THREE.EffectComposer relies on ShaderPass');
    ((this.copyPass = new Ir(q1)),
      (this.copyPass.material.blending = lU),
      (this.clock = new tU()));
  }
  swapBuffers() {
    let u = this.readBuffer;
    ((this.readBuffer = this.writeBuffer), (this.writeBuffer = u));
  }
  addPass(u) {
    (this.passes.push(u),
      u.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio
      ));
  }
  insertPass(u, n) {
    (this.passes.splice(n, 0, u),
      u.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio
      ));
  }
  removePass(u) {
    let n = this.passes.indexOf(u);
    if (n !== -1) this.passes.splice(n, 1);
  }
  isLastEnabledPass(u) {
    for (let n = u + 1; n < this.passes.length; n++)
      if (this.passes[n].enabled) return !1;
    return !0;
  }
  render(u) {
    if (u === void 0) u = this.clock.getDelta();
    let n = this.renderer.getRenderTarget(),
      f = !1,
      l = this.passes.length;
    for (let t = 0; t < l; t++) {
      let r = this.passes[t];
      if (r.enabled === !1) continue;
      if (
        ((r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t)),
        r.render(this.renderer, this.writeBuffer, this.readBuffer, u, f),
        r.needsSwap)
      ) {
        if (f) {
          let c = this.renderer.getContext(),
            h = this.renderer.state.buffers.stencil;
          (h.setFunc(c.NOTEQUAL, 1, 4294967295),
            this.copyPass.render(
              this.renderer,
              this.writeBuffer,
              this.readBuffer,
              u
            ),
            h.setFunc(c.EQUAL, 1, 4294967295));
        }
        this.swapBuffers();
      }
      if (Lr !== void 0) {
        if (r instanceof Lr) f = !0;
        else if (r instanceof Nw) f = !1;
      }
    }
    this.renderer.setRenderTarget(n);
  }
  reset(u) {
    if (u === void 0) {
      let n = this.renderer.getSize(new O6());
      ((this._pixelRatio = this.renderer.getPixelRatio()),
        (this._width = n.width),
        (this._height = n.height),
        (u = this.renderTarget1.clone()),
        u.setSize(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio
        ));
    }
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      (this.renderTarget1 = u),
      (this.renderTarget2 = u.clone()),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2));
  }
  setSize(u, n) {
    ((this._width = u), (this._height = n));
    let f = this._width * this._pixelRatio,
      l = this._height * this._pixelRatio;
    (this.renderTarget1.setSize(f, l), this.renderTarget2.setSize(f, l));
    for (let t = 0; t < this.passes.length; t++) this.passes[t].setSize(f, l);
  }
  setPixelRatio(u) {
    ((this._pixelRatio = u), this.setSize(this._width, this._height));
  }
  dispose() {
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      this.copyPass.dispose());
  }
}
import { Color as wU } from 'three';
var cU = Object.defineProperty,
  hU = (u, n, f) =>
    n in u
      ? cU(u, n, { enumerable: !0, configurable: !0, writable: !0, value: f })
      : (u[n] = f),
  y0 = (u, n, f) => {
    return (hU(u, typeof n !== 'symbol' ? n + '' : n, f), f);
  };
class Fr extends Ln {
  constructor(u, n, f, l, t = 0) {
    super();
    (y0(this, 'scene'),
      y0(this, 'camera'),
      y0(this, 'overrideMaterial'),
      y0(this, 'clearColor'),
      y0(this, 'clearAlpha'),
      y0(this, 'clearDepth', !1),
      y0(this, '_oldClearColor', new wU()),
      (this.scene = u),
      (this.camera = n),
      (this.overrideMaterial = f),
      (this.clearColor = l),
      (this.clearAlpha = t),
      (this.clear = !0),
      (this.needsSwap = !1));
  }
  render(u, n, f) {
    let l = u.autoClear;
    u.autoClear = !1;
    let t,
      r = null;
    if (this.overrideMaterial !== void 0)
      ((r = this.scene.overrideMaterial),
        (this.scene.overrideMaterial = this.overrideMaterial));
    if (this.clearColor)
      (u.getClearColor(this._oldClearColor),
        (t = u.getClearAlpha()),
        u.setClearColor(this.clearColor, this.clearAlpha));
    if (this.clearDepth) u.clearDepth();
    if ((u.setRenderTarget(this.renderToScreen ? null : f), this.clear))
      u.clear(u.autoClearColor, u.autoClearDepth, u.autoClearStencil);
    if ((u.render(this.scene, this.camera), this.clearColor))
      u.setClearColor(this._oldClearColor, t);
    if (this.overrideMaterial !== void 0) this.scene.overrideMaterial = r;
    u.autoClear = l;
  }
}
var E6 = (u, n, f = 5.1) => {
    let l = (90 - u) * (Math.PI / 180),
      t = (n + 180) * (Math.PI / 180);
    return {
      x: -f * Math.sin(l) * Math.cos(t),
      y: f * Math.cos(l),
      z: f * Math.sin(l) * Math.sin(t),
    };
  },
  q6 = (u, n) => {
    return {
      y: -(n + 180) * (Math.PI / 180) + Math.PI / 2,
      x: u * (Math.PI / 180),
    };
  };
var M6 = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  S6 = `
uniform sampler2D globeTexture;
uniform vec3 sunPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 viewDirection = normalize(-vPosition); // Camera is at (0,0,0) in view space
    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(sunPosition);

    // Day/Night cycle base
    float intensity = dot(normal, sunDir);
    
    // Texture color
    vec3 color = texture2D(globeTexture, vUv).rgb;
    
    // Atmospheric glow
    float atmosphere = pow(0.6 - dot(normal, viewDirection), 3.0);
    vec3 atmosphereColor = vec3(0.3, 0.6, 1.0) * atmosphere * 1.5;

    // Specular ocean reflection
    vec3 reflection = reflect(-sunDir, normal);
    float specular = pow(max(0.0, dot(viewDirection, reflection)), 32.0) * 0.5;

    // Combine
    vec3 finalColor = color * (max(intensity, 0.1) + 0.2) + atmosphereColor + specular;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`,
  B6 = `
varying vec3 vNormal;

void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  G6 = `
varying vec3 vNormal;

void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 1.5;
}
`;
var C6 = ({
  containerRef: u,
  activeIslands: n,
  selectedVoyage: f,
  onIslandClick: l,
  onIslandHover: t,
}) => {
  let r = Ou.useRef(null),
    c = Ou.useRef(null),
    h = Ou.useRef({}),
    w = Ou.useRef(null),
    z = Ou.useRef(null),
    _ = Ou.useRef(null),
    N = Ou.useRef(null),
    Q = Ou.useRef(null),
    Z = Ou.useRef(!1),
    Y = Ou.useRef(null),
    H = Ou.useRef({ x: 0, y: 0 }),
    F = Ou.useRef({ x: 0, y: 0 });
  return (
    Ou.useEffect(() => {
      if (!u.current) return;
      let $ = new B.Scene();
      r.current = $;
      let W = u.current.clientWidth,
        J = u.current.clientHeight,
        I = new B.PerspectiveCamera(45, W / J, 0.1, 1000);
      ((I.position.z = 18), (w.current = I));
      let X = new B.WebGLRenderer({
        antialias: !0,
        alpha: !0,
        powerPreference: 'high-performance',
      });
      (X.setSize(W, J),
        X.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
        (X.toneMapping = B.ACESFilmicToneMapping),
        (X.toneMappingExposure = 1.2),
        u.current.appendChild(X.domElement),
        (z.current = X));
      let E = new Fr($, I),
        O = new zw(new B.Vector2(W, J), 1.5, 0.4, 0.85);
      ((O.strength = 1.2), (O.radius = 0.5), (O.threshold = 0.7));
      let G = new Or(X);
      (G.addPass(E), G.addPass(O), (_.current = G));
      let M = document.createElement('canvas');
      ((M.width = 2048), (M.height = 1024));
      let K = M.getContext('2d');
      if (K) {
        ((K.fillStyle = '#051a2f'), K.fillRect(0, 0, M.width, M.height));
        let fu = M.height / 2,
          lu = K.createLinearGradient(0, fu - 50, 0, fu + 50);
        (lu.addColorStop(0, 'rgba(30, 144, 255, 0)'),
          lu.addColorStop(0.5, 'rgba(30, 144, 255, 0.3)'),
          lu.addColorStop(1, 'rgba(30, 144, 255, 0)'),
          (K.fillStyle = lu),
          K.fillRect(0, fu - 80, M.width, 160),
          (K.fillStyle = '#ef4444'),
          K.fillRect(M.width / 2 - 5, 0, 10, M.height),
          (K.strokeStyle = 'rgba(255, 255, 255, 0.03)'),
          (K.lineWidth = 2));
        for (let Eu = 0; Eu < 20; Eu++)
          (K.beginPath(),
            K.moveTo(0, Eu * (M.height / 20)),
            K.lineTo(M.width, Eu * (M.height / 20)),
            K.stroke(),
            K.beginPath(),
            K.moveTo(Eu * (M.width / 20), 0),
            K.lineTo(Eu * (M.width / 20), M.height),
            K.stroke());
      }
      let cf = new B.CanvasTexture(M),
        kc = new B.SphereGeometry(5, 64, 64),
        i1 = new B.ShaderMaterial({
          vertexShader: M6,
          fragmentShader: S6,
          uniforms: {
            globeTexture: { value: cf },
            sunPosition: { value: new B.Vector3(10, 5, 10) },
          },
          side: B.FrontSide,
        }),
        gc = new B.Mesh(kc, i1);
      ($.add(gc), (c.current = gc));
      let L3 = new B.SphereGeometry(5.8, 64, 64),
        _u = new B.ShaderMaterial({
          vertexShader: B6,
          fragmentShader: G6,
          side: B.BackSide,
          blending: B.AdditiveBlending,
          transparent: !0,
        }),
        rn = new B.Mesh(L3, _u);
      $.add(rn);
      let hf = new B.BufferGeometry(),
        wf = 2000,
        O3 = new Float32Array(wf * 3);
      for (let fu = 0; fu < wf * 3; fu++) O3[fu] = (Math.random() - 0.5) * 100;
      hf.setAttribute('position', new B.BufferAttribute(O3, 3));
      let __ = new B.PointsMaterial({
          size: 0.15,
          color: 16777215,
          transparent: !0,
          opacity: 0.8,
          blending: B.AdditiveBlending,
        }),
        N_ = new B.Points(hf, __);
      ($.add(N_), (N.current = new B.Raycaster()));
      let F3 = fu => {
          if (!u.current) return;
          let lu = u.current.getBoundingClientRect();
          if (
            ((F.current.x = ((fu.clientX - lu.left) / lu.width) * 2 - 1),
            (F.current.y = -((fu.clientY - lu.top) / lu.height) * 2 + 1),
            Z.current && c.current)
          ) {
            let Eu = fu.movementX * 0.003,
              cn = fu.movementY * 0.003;
            ((c.current.rotation.y += Eu), (c.current.rotation.x += cn));
          }
        },
        E3 = () => {
          Z.current = !0;
        },
        q3 = () => {
          Z.current = !1;
        },
        M3 = fu => {
          if (Z.current) return;
          if (!N.current || !w.current) return;
          N.current.setFromCamera(F.current, w.current);
          let lu = N.current.intersectObjects(
            Object.values(h.current).map(Eu => Eu.children[0]),
            !0
          );
          if (lu.length > 0) {
            let Eu = lu[0].object,
              cn = Object.keys(h.current).find(zf => {
                return h.current[zf].children.includes(Eu);
              });
            if (cn) {
              let zf = n.find(C3 => C3.id === cn);
              if (zf) l?.(zf);
            }
          }
        };
      (u.current.addEventListener('mousemove', F3),
        u.current.addEventListener('mousedown', E3),
        window.addEventListener('mouseup', q3),
        u.current.addEventListener('click', M3));
      let S3 = () => {
        if (!u.current || !w.current || !z.current || !_.current) return;
        let fu = u.current.clientWidth,
          lu = u.current.clientHeight;
        ((w.current.aspect = fu / lu),
          w.current.updateProjectionMatrix(),
          z.current.setSize(fu, lu),
          _.current.setSize(fu, lu));
      };
      window.addEventListener('resize', S3);
      let B3 = 0,
        G3 = () => {
          if (((B3 = requestAnimationFrame(G3)), !Z.current && c.current))
            c.current.rotation.y += 0.0005;
          if (N.current && w.current && !Z.current) {
            N.current.setFromCamera(F.current, w.current);
            let fu = N.current.intersectObjects(
              Object.values(h.current).map(lu => lu.children[0]),
              !0
            );
            if (fu.length > 0) {
              let lu = fu[0].object,
                Eu = Object.keys(h.current).find(cn => {
                  return h.current[cn].children.includes(lu);
                });
              if (Eu) {
                let cn = n.find(zf => zf.id === Eu);
                if (cn && Q.current?.id !== cn.id)
                  ((Q.current = cn),
                    t?.(cn),
                    (document.body.style.cursor = 'pointer'));
              }
            } else if (Q.current)
              ((Q.current = null),
                t?.(null),
                (document.body.style.cursor = 'default'));
          }
          if (_.current) _.current.render();
        };
      return (
        G3(),
        () => {
          if (
            (window.removeEventListener('resize', S3),
            cancelAnimationFrame(B3),
            u.current)
          ) {
            if (
              (u.current.removeEventListener('mousemove', F3),
              u.current.removeEventListener('mousedown', E3),
              window.removeEventListener('mouseup', q3),
              u.current.removeEventListener('click', M3),
              z.current?.domElement)
            )
              u.current.removeChild(z.current.domElement);
          }
        }
      );
    }, [u]),
    Ou.useEffect(() => {
      if (!r.current) return;
      (Object.values(h.current).forEach($ => r.current?.remove($)),
        (h.current = {}),
        n.forEach($ => {
          let W = E6($.lat, $.lon, 5.05),
            J = new B.Group();
          (J.position.set(W.x, W.y, W.z), J.lookAt(0, 0, 0));
          let I = new B.OctahedronGeometry(
              $.importance === 'Legendary' ? 0.15 : 0.1,
              0
            ),
            X = $.hasPoneglyph ? 16766720 : 65535,
            E = new B.MeshBasicMaterial({ color: X, wireframe: !0 }),
            O = new B.Mesh(
              new B.OctahedronGeometry(
                $.importance === 'Legendary' ? 0.08 : 0.05,
                0
              ),
              new B.MeshBasicMaterial({ color: X })
            ),
            G = new B.Mesh(I, E);
          (J.add(G), J.add(O));
          let M = new B.BufferGeometry().setFromPoints([
              new B.Vector3(0, 0, 0),
              new B.Vector3(0, 0.4, 0),
            ]),
            K = new B.Line(
              M,
              new B.LineBasicMaterial({
                color: X,
                transparent: !0,
                opacity: 0.5,
              })
            );
          (J.add(K), r.current?.add(J), (h.current[$.id] = J));
        }));
    }, [n, f]),
    {
      flyToIsland: $ => {
        if (!c.current || !w.current) return;
        let W = q6($.lat, $.lon),
          J = { x: c.current.rotation.x, y: c.current.rotation.y },
          I = Date.now(),
          X = 1500,
          E = () => {
            let O = Date.now(),
              G = Math.min((O - I) / X, 1),
              M = 1 - Math.pow(1 - G, 3);
            if (c.current)
              ((c.current.rotation.x = J.x + (W.x - J.x) * M),
                (c.current.rotation.y = J.y + (W.y - J.y) * M));
            if (G < 1) requestAnimationFrame(E);
          };
        E();
      },
      setLightIntensity: () => {},
      zoomIn: () => {
        if (w.current) w.current.position.z -= 2;
      },
      zoomOut: () => {
        if (w.current) w.current.position.z += 2;
      },
      resetView: () => {},
      globeRef: c,
    }
  );
};
var Gu = R(g(), 1);
var Qw = [
  { name: 'Romance Dawn', startEp: 1, endEp: 3 },
  { name: 'Orange Town', startEp: 4, endEp: 8 },
  { name: 'Syrup Village', startEp: 9, endEp: 18 },
  { name: 'Baratie', startEp: 19, endEp: 30 },
  { name: 'Arlong Park', startEp: 31, endEp: 44 },
  { name: 'Loguetown', startEp: 45, endEp: 53 },
  { name: 'Reverse Mountain', startEp: 61, endEp: 63 },
  { name: 'Whisky Peak', startEp: 64, endEp: 67 },
  { name: 'Little Garden', startEp: 68, endEp: 77 },
  { name: 'Drum Island', startEp: 78, endEp: 91 },
  { name: 'Alabasta', startEp: 92, endEp: 130 },
  { name: 'Jaya', startEp: 144, endEp: 152 },
  { name: 'Skypiea', startEp: 153, endEp: 195 },
  { name: 'Long Ring Long Land', startEp: 207, endEp: 228 },
  { name: 'Water 7', startEp: 229, endEp: 263 },
  { name: 'Enies Lobby', startEp: 264, endEp: 312 },
  { name: 'Post-Enies Lobby', startEp: 313, endEp: 325 },
  { name: 'Thriller Bark', startEp: 337, endEp: 381 },
  { name: 'Sabaody Archipelago', startEp: 385, endEp: 405 },
  { name: 'Amazon Lily', startEp: 408, endEp: 417 },
  { name: 'Impel Down', startEp: 418, endEp: 456 },
  { name: 'Marineford', startEp: 457, endEp: 489 },
  { name: 'Post-War', startEp: 490, endEp: 516 },
  { name: 'Fishman Island', startEp: 517, endEp: 574 },
  { name: 'Punk Hazard', startEp: 579, endEp: 628 },
  { name: 'Dressrosa', startEp: 629, endEp: 746 },
  { name: 'Zou', startEp: 751, endEp: 779 },
  { name: 'Whole Cake Island', startEp: 783, endEp: 877 },
  { name: 'Reverie', startEp: 878, endEp: 889 },
  { name: 'Wano Country', startEp: 892, endEp: 1085 },
  { name: 'Egghead', startEp: 1086, endEp: 1120 },
];
var D6 = u => {
    let n = Qw.find(f => f.name === u);
    return n ? n.startEp : 1;
  },
  $w = (u, n = 1116) => {
    return Math.min(u + 1, n);
  },
  K6 = (u, n = 1) => {
    return Math.max(u - 1, n);
  };
var P6 = ({
  minEpisode: u = 1,
  maxEpisode: n = 1116,
  autoPlaySpeed: f = 1000,
  initialEpisode: l = n,
  onEpisodeChange: t,
} = {}) => {
  let [r, c] = Gu.useState(l),
    [h, w] = Gu.useState(!1),
    [z, _] = Gu.useState(f);
  Gu.useEffect(() => {
    c(l);
  }, [l]);
  let N = Gu.useCallback(
      W => {
        let J = Math.max(u, Math.min(n, W));
        (c(J), t?.(J));
      },
      [u, n, t]
    ),
    Q = l !== void 0 ? l : r;
  Gu.useEffect(() => {
    if (!h) return;
    let W = setInterval(() => {
      let J = l !== void 0 ? l : r,
        I = $w(J, n);
      if (I === J) {
        w(!1);
        return;
      }
      (c(I), t?.(I));
    }, z);
    return () => clearInterval(W);
  }, [h, z, n, t, l, r]);
  let Z = Gu.useCallback(() => {
      let J = $w(l !== void 0 ? l : r, n);
      (c(J), t?.(J));
    }, [n, t, l, r]),
    Y = Gu.useCallback(() => {
      let J = K6(l !== void 0 ? l : r, u);
      (c(J), t?.(J));
    }, [u, t, l, r]),
    H = Gu.useCallback(
      W => {
        N(W);
      },
      [N]
    ),
    F = Gu.useCallback(
      W => {
        let J = D6(W);
        H(J);
      },
      [H]
    ),
    U = Gu.useCallback(() => {
      w(W => !W);
    }, []),
    $ = Gu.useCallback(() => {
      w(!1);
    }, []);
  return {
    currentEpisode: Q,
    setCurrentEpisode: H,
    nextEpisode: Z,
    previousEpisode: Y,
    jumpToEpisode: H,
    jumpToArcName: F,
    isPlaying: h,
    togglePlay: U,
    stop: $,
    playSpeed: z,
    setPlaySpeed: _,
    arcs: Qw,
  };
};
var t_ = R(g(), 1);
var A6 = R(g(), 1),
  zU = Symbol.for('react.element');
var _U = Object.prototype.hasOwnProperty,
  NU = A6.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  QU = { key: !0, ref: !0, __self: !0, __source: !0 };
function R6(u, n, f) {
  var l,
    t = {},
    r = null,
    c = null;
  (f !== void 0 && (r = '' + f),
    n.key !== void 0 && (r = '' + n.key),
    n.ref !== void 0 && (c = n.ref));
  for (l in n) _U.call(n, l) && !QU.hasOwnProperty(l) && (t[l] = n[l]);
  if (u && u.defaultProps)
    for (l in ((n = u.defaultProps), n)) t[l] === void 0 && (t[l] = n[l]);
  return {
    $$typeof: zU,
    type: u,
    key: r,
    ref: c,
    props: t,
    _owner: NU.current,
  };
}
var C = R6,
  V = R6;
var k6 = R(g(), 1),
  Er = k6.createContext({});
var g6 = R(g(), 1);
function T6(u) {
  let n = g6.useRef(null);
  if (n.current === null) n.current = u();
  return n.current;
}
var d6 = R(g(), 1),
  jf = d6.createContext(null);
var j6 = R(g(), 1),
  qr = j6.createContext({
    transformPagePoint: u => u,
    isStatic: !1,
    reducedMotion: 'never',
  });
var Z0 = R(g(), 1);
function o6(u = !0) {
  let n = Z0.useContext(jf);
  if (n === null) return [!0, null];
  let { isPresent: f, onExitComplete: l, register: t } = n,
    r = Z0.useId();
  Z0.useEffect(() => {
    if (u) t(r);
  }, [u]);
  let c = Z0.useCallback(() => u && l && l(r), [r, l, u]);
  return !f && l ? [!1, c] : [!0];
}
var Mr = R(g(), 1);
var of = typeof window !== 'undefined';
var x6 = of ? Mr.useLayoutEffect : Mr.useEffect;
var T = u => u;
var On = T,
  vu = T;
function p0(u) {
  let n;
  return () => {
    if (n === void 0) n = u();
    return n;
  };
}
var yu = (u, n, f) => {
  let l = n - u;
  return l === 0 ? 1 : (f - u) / l;
};
var uu = u => u * 1000,
  Uu = u => u / 1000;
var xf = { skipAnimations: !1, useManualTiming: !1 };
function V6(u) {
  let n = new Set(),
    f = new Set(),
    l = !1,
    t = !1,
    r = new WeakSet(),
    c = { delta: 0, timestamp: 0, isProcessing: !1 };
  function h(z) {
    if (r.has(z)) (w.schedule(z), u());
    z(c);
  }
  let w = {
    schedule: (z, _ = !1, N = !1) => {
      let Z = N && l ? n : f;
      if (_) r.add(z);
      if (!Z.has(z)) Z.add(z);
      return z;
    },
    cancel: z => {
      (f.delete(z), r.delete(z));
    },
    process: z => {
      if (((c = z), l)) {
        t = !0;
        return;
      }
      if (((l = !0), ([n, f] = [f, n]), n.forEach(h), n.clear(), (l = !1), t))
        ((t = !1), w.process(z));
    },
  };
  return w;
}
var Sr = [
    'read',
    'resolveKeyframes',
    'update',
    'preRender',
    'render',
    'postRender',
  ],
  $U = 40;
function Br(u, n) {
  let f = !1,
    l = !0,
    t = { delta: 0, timestamp: 0, isProcessing: !1 },
    r = () => (f = !0),
    c = Sr.reduce((U, $) => {
      return ((U[$] = V6(r)), U);
    }, {}),
    {
      read: h,
      resolveKeyframes: w,
      update: z,
      preRender: _,
      render: N,
      postRender: Q,
    } = c,
    Z = () => {
      let U = xf.useManualTiming ? t.timestamp : performance.now();
      if (
        ((f = !1),
        (t.delta = l
          ? 16.666666666666668
          : Math.max(Math.min(U - t.timestamp, $U), 1)),
        (t.timestamp = U),
        (t.isProcessing = !0),
        h.process(t),
        w.process(t),
        z.process(t),
        _.process(t),
        N.process(t),
        Q.process(t),
        (t.isProcessing = !1),
        f && n)
      )
        ((l = !1), u(Z));
    },
    Y = () => {
      if (((f = !0), (l = !0), !t.isProcessing)) u(Z);
    };
  return {
    schedule: Sr.reduce((U, $) => {
      let W = c[$];
      return (
        (U[$] = (J, I = !1, X = !1) => {
          if (!f) Y();
          return W.schedule(J, I, X);
        }),
        U
      );
    }, {}),
    cancel: U => {
      for (let $ = 0; $ < Sr.length; $++) c[Sr[$]].cancel(U);
    },
    state: t,
    steps: c,
  };
}
var {
  schedule: D,
  cancel: pu,
  state: nu,
  steps: Gr,
} = Br(
  typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : T,
  !0
);
var v6 = R(g(), 1),
  Cr = v6.createContext({ strict: !1 });
var y6 = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  Tn = {};
for (let u in y6) Tn[u] = { isEnabled: n => y6[u].some(f => !!n[f]) };
function p6(u) {
  for (let n in u) Tn[n] = { ...Tn[n], ...u[n] };
}
var UU = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport',
]);
function S1(u) {
  return (
    u.startsWith('while') ||
    (u.startsWith('drag') && u !== 'draggable') ||
    u.startsWith('layout') ||
    u.startsWith('onTap') ||
    u.startsWith('onPan') ||
    u.startsWith('onLayout') ||
    UU.has(u)
  );
}
var i6 = u => !S1(u);
function WU(u) {
  if (!u) return;
  i6 = n => (n.startsWith('on') ? !S1(n) : u(n));
}
try {
  WU(
    (() => {
      throw new Error('Cannot require module ' + '@emotion/is-prop-valid');
    })().default
  );
} catch (u) {}
function b6(u, n, f) {
  let l = {};
  for (let t in u) {
    if (t === 'values' && typeof u.values === 'object') continue;
    if (
      i6(t) ||
      (f === !0 && S1(t)) ||
      (!n && !S1(t)) ||
      (u.draggable && t.startsWith('onDrag'))
    )
      l[t] = u[t];
  }
  return l;
}
function m6(u) {
  if (typeof Proxy === 'undefined') return u;
  let n = new Map();
  return new Proxy(
    (...l) => {
      return u(...l);
    },
    {
      get: (l, t) => {
        if (t === 'create') return u;
        if (!n.has(t)) n.set(t, u(t));
        return n.get(t);
      },
    }
  );
}
var yf = R(g(), 1);
var e6 = R(g(), 1),
  J0 = e6.createContext({});
var Pr = R(g(), 1);
function dn(u) {
  return typeof u === 'string' || Array.isArray(u);
}
function Y0(u) {
  return u !== null && typeof u === 'object' && typeof u.start === 'function';
}
var Dr = [
    'animate',
    'whileInView',
    'whileFocus',
    'whileHover',
    'whileTap',
    'whileDrag',
    'exit',
  ],
  B1 = ['initial', ...Dr];
function i0(u) {
  return Y0(u.animate) || B1.some(n => dn(u[n]));
}
function Kr(u) {
  return Boolean(i0(u) || u.variants);
}
function s6(u, n) {
  if (i0(u)) {
    let { initial: f, animate: l } = u;
    return {
      initial: f === !1 || dn(f) ? f : void 0,
      animate: dn(l) ? l : void 0,
    };
  }
  return u.inherit !== !1 ? n : {};
}
function uz(u) {
  let { initial: n, animate: f } = s6(u, Pr.useContext(J0));
  return Pr.useMemo(() => ({ initial: n, animate: f }), [a6(n), a6(f)]);
}
function a6(u) {
  return Array.isArray(u) ? u.join(' ') : u;
}
var nz = Symbol.for('motionComponentSymbol');
var fz = R(g(), 1);
function jn(u) {
  return (
    u &&
    typeof u === 'object' &&
    Object.prototype.hasOwnProperty.call(u, 'current')
  );
}
function lz(u, n, f) {
  return fz.useCallback(
    l => {
      if (l) u.onMount && u.onMount(l);
      if (n)
        if (l) n.mount(l);
        else n.unmount();
      if (f) {
        if (typeof f === 'function') f(l);
        else if (jn(f)) f.current = l;
      }
    },
    [n]
  );
}
var gu = R(g(), 1);
var Vf = u => u.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase();
var ZU = 'framerAppearId',
  Ar = 'data-' + Vf(ZU);
var { schedule: vf, cancel: mY } = Br(queueMicrotask, !1);
var tz = R(g(), 1),
  Rr = tz.createContext({});
function rz(u, n, f, l, t) {
  var r, c;
  let { visualElement: h } = gu.useContext(J0),
    w = gu.useContext(Cr),
    z = gu.useContext(jf),
    _ = gu.useContext(qr).reducedMotion,
    N = gu.useRef(null);
  if (((l = l || w.renderer), !N.current && l))
    N.current = l(u, {
      visualState: n,
      parent: h,
      props: f,
      presenceContext: z,
      blockInitialAnimation: z ? z.initial === !1 : !1,
      reducedMotionConfig: _,
    });
  let Q = N.current,
    Z = gu.useContext(Rr);
  if (Q && !Q.projection && t && (Q.type === 'html' || Q.type === 'svg'))
    JU(N.current, f, t, Z);
  let Y = gu.useRef(!1);
  gu.useInsertionEffect(() => {
    if (Q && Y.current) Q.update(f, z);
  });
  let H = f[Ar],
    F = gu.useRef(
      Boolean(H) &&
        !((r = window.MotionHandoffIsComplete) === null || r === void 0
          ? void 0
          : r.call(window, H)) &&
        ((c = window.MotionHasOptimisedAnimation) === null || c === void 0
          ? void 0
          : c.call(window, H))
    );
  return (
    x6(() => {
      if (!Q) return;
      if (
        ((Y.current = !0),
        (window.MotionIsMounted = !0),
        Q.updateFeatures(),
        vf.render(Q.render),
        F.current && Q.animationState)
      )
        Q.animationState.animateChanges();
    }),
    gu.useEffect(() => {
      if (!Q) return;
      if (!F.current && Q.animationState) Q.animationState.animateChanges();
      if (F.current)
        (queueMicrotask(() => {
          var U;
          (U = window.MotionHandoffMarkAsComplete) === null ||
            U === void 0 ||
            U.call(window, H);
        }),
          (F.current = !1));
    }),
    Q
  );
}
function JU(u, n, f, l) {
  let {
    layoutId: t,
    layout: r,
    drag: c,
    dragConstraints: h,
    layoutScroll: w,
    layoutRoot: z,
  } = n;
  ((u.projection = new f(
    u.latestValues,
    n['data-framer-portal-id'] ? void 0 : cz(u.parent)
  )),
    u.projection.setOptions({
      layoutId: t,
      layout: r,
      alwaysMeasureLayout: Boolean(c) || (h && jn(h)),
      visualElement: u,
      animationType: typeof r === 'string' ? r : 'both',
      initialPromotionConfig: l,
      layoutScroll: w,
      layoutRoot: z,
    }));
}
function cz(u) {
  if (!u) return;
  return u.options.allowProjection !== !1 ? u.projection : cz(u.parent);
}
function hz({
  preloadedFeatures: u,
  createVisualElement: n,
  useRender: f,
  useVisualState: l,
  Component: t,
}) {
  var r, c;
  u && p6(u);
  function h(z, _) {
    let N,
      Q = { ...yf.useContext(qr), ...z, layoutId: YU(z) },
      { isStatic: Z } = Q,
      Y = uz(z),
      H = l(z, Z);
    if (!Z && of) {
      HU(Q, u);
      let F = IU(Q);
      ((N = F.MeasureLayout),
        (Y.visualElement = rz(t, H, Q, n, F.ProjectionNode)));
    }
    return V(J0.Provider, {
      value: Y,
      children: [
        N && Y.visualElement
          ? C(N, { visualElement: Y.visualElement, ...Q })
          : null,
        f(t, z, lz(H, Y.visualElement, _), H, Z, Y.visualElement),
      ],
    });
  }
  h.displayName = `motion.${typeof t === 'string' ? t : `create(${(c = (r = t.displayName) !== null && r !== void 0 ? r : t.name) !== null && c !== void 0 ? c : ''})`}`;
  let w = yf.forwardRef(h);
  return ((w[nz] = t), w);
}
function YU({ layoutId: u }) {
  let n = yf.useContext(Er).id;
  return n && u !== void 0 ? n + '-' + u : u;
}
function HU(u, n) {
  let f = yf.useContext(Cr).strict;
}
function IU(u) {
  let { drag: n, layout: f } = Tn;
  if (!n && !f) return {};
  let l = { ...n, ...f };
  return {
    MeasureLayout:
      (n === null || n === void 0 ? void 0 : n.isEnabled(u)) ||
      (f === null || f === void 0 ? void 0 : f.isEnabled(u))
        ? l.MeasureLayout
        : void 0,
    ProjectionNode: l.ProjectionNode,
  };
}
var wz = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
];
function pf(u) {
  if (typeof u !== 'string' || u.includes('-')) return !1;
  else if (wz.indexOf(u) > -1 || /[A-Z]/u.test(u)) return !0;
  return !1;
}
var Uw = R(g(), 1);
function zz(u) {
  let n = [{}, {}];
  return (
    u === null ||
      u === void 0 ||
      u.values.forEach((f, l) => {
        ((n[0][l] = f.get()), (n[1][l] = f.getVelocity()));
      }),
    n
  );
}
function bf(u, n, f, l) {
  if (typeof n === 'function') {
    let [t, r] = zz(l);
    n = n(f !== void 0 ? f : u.custom, t, r);
  }
  if (typeof n === 'string') n = u.variants && u.variants[n];
  if (typeof n === 'function') {
    let [t, r] = zz(l);
    n = n(f !== void 0 ? f : u.custom, t, r);
  }
  return n;
}
var G1 = u => {
  return Array.isArray(u);
};
var _z = u => {
    return Boolean(u && typeof u === 'object' && u.mix && u.toValue);
  },
  Nz = u => {
    return G1(u) ? u[u.length - 1] || 0 : u;
  };
var j = u => Boolean(u && u.getVelocity);
function mf(u) {
  let n = j(u) ? u.get() : u;
  return _z(n) ? n.toValue() : n;
}
function XU(
  { scrapeMotionValuesFromProps: u, createRenderState: n, onUpdate: f },
  l,
  t,
  r
) {
  let c = { latestValues: LU(l, t, r, u), renderState: n() };
  if (f)
    ((c.onMount = h => f({ props: l, current: h, ...c })),
      (c.onUpdate = h => f(h)));
  return c;
}
var kr = u => (n, f) => {
  let l = Uw.useContext(J0),
    t = Uw.useContext(jf),
    r = () => XU(u, n, l, t);
  return f ? r() : T6(r);
};
function LU(u, n, f, l) {
  let t = {},
    r = l(u, {});
  for (let Q in r) t[Q] = mf(r[Q]);
  let { initial: c, animate: h } = u,
    w = i0(u),
    z = Kr(u);
  if (n && z && !w && u.inherit !== !1) {
    if (c === void 0) c = n.initial;
    if (h === void 0) h = n.animate;
  }
  let _ = f ? f.initial === !1 : !1;
  _ = _ || c === !1;
  let N = _ ? h : c;
  if (N && typeof N !== 'boolean' && !Y0(N)) {
    let Q = Array.isArray(N) ? N : [N];
    for (let Z = 0; Z < Q.length; Z++) {
      let Y = bf(u, Q[Z]);
      if (Y) {
        let { transitionEnd: H, transition: F, ...U } = Y;
        for (let $ in U) {
          let W = U[$];
          if (Array.isArray(W)) {
            let J = _ ? W.length - 1 : 0;
            W = W[J];
          }
          if (W !== null) t[$] = W;
        }
        for (let $ in H) t[$] = H[$];
      }
    }
  }
  return t;
}
var Fn = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  Tu = new Set(Fn);
var Qz = u => n => typeof n === 'string' && n.startsWith(u),
  gr = Qz('--'),
  OU = Qz('var(--'),
  ef = u => {
    if (!OU(u)) return !1;
    return FU.test(u.split('/*')[0].trim());
  },
  FU =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
var Tr = (u, n) => {
  return n && typeof u === 'number' ? n.transform(u) : u;
};
var Wu = (u, n, f) => {
  if (f > n) return n;
  if (f < u) return u;
  return f;
};
var En = {
    test: u => typeof u === 'number',
    parse: parseFloat,
    transform: u => u,
  },
  on = { ...En, transform: u => Wu(0, 1, u) },
  C1 = { ...En, default: 1 };
var D1 = u => ({
    test: n =>
      typeof n === 'string' && n.endsWith(u) && n.split(' ').length === 1,
    parse: parseFloat,
    transform: n => `${n}${u}`,
  }),
  qn = D1('deg'),
  Cu = D1('%'),
  S = D1('px'),
  $z = D1('vh'),
  Uz = D1('vw'),
  Ww = {
    ...Cu,
    parse: u => Cu.parse(u) / 100,
    transform: u => Cu.transform(u * 100),
  };
var Wz = {
  borderWidth: S,
  borderTopWidth: S,
  borderRightWidth: S,
  borderBottomWidth: S,
  borderLeftWidth: S,
  borderRadius: S,
  radius: S,
  borderTopLeftRadius: S,
  borderTopRightRadius: S,
  borderBottomRightRadius: S,
  borderBottomLeftRadius: S,
  width: S,
  maxWidth: S,
  height: S,
  maxHeight: S,
  top: S,
  right: S,
  bottom: S,
  left: S,
  padding: S,
  paddingTop: S,
  paddingRight: S,
  paddingBottom: S,
  paddingLeft: S,
  margin: S,
  marginTop: S,
  marginRight: S,
  marginBottom: S,
  marginLeft: S,
  backgroundPositionX: S,
  backgroundPositionY: S,
};
var Zz = {
  rotate: qn,
  rotateX: qn,
  rotateY: qn,
  rotateZ: qn,
  scale: C1,
  scaleX: C1,
  scaleY: C1,
  scaleZ: C1,
  skew: qn,
  skewX: qn,
  skewY: qn,
  distance: S,
  translateX: S,
  translateY: S,
  translateZ: S,
  x: S,
  y: S,
  z: S,
  perspective: S,
  transformPerspective: S,
  opacity: on,
  originX: Ww,
  originY: Ww,
  originZ: S,
};
var Zw = { ...En, transform: Math.round };
var sf = {
  ...Wz,
  ...Zz,
  zIndex: Zw,
  size: S,
  fillOpacity: on,
  strokeOpacity: on,
  numOctaves: Zw,
};
var EU = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ',
    transformPerspective: 'perspective',
  },
  qU = Fn.length;
function Jz(u, n, f) {
  let l = '',
    t = !0;
  for (let r = 0; r < qU; r++) {
    let c = Fn[r],
      h = u[c];
    if (h === void 0) continue;
    let w = !0;
    if (typeof h === 'number') w = h === (c.startsWith('scale') ? 1 : 0);
    else w = parseFloat(h) === 0;
    if (!w || f) {
      let z = Tr(h, sf[c]);
      if (!w) {
        t = !1;
        let _ = EU[c] || c;
        l += `${_}(${z}) `;
      }
      if (f) n[c] = z;
    }
  }
  if (((l = l.trim()), f)) l = f(n, t ? '' : l);
  else if (t) l = 'none';
  return l;
}
function af(u, n, f) {
  let { style: l, vars: t, transformOrigin: r } = u,
    c = !1,
    h = !1;
  for (let w in n) {
    let z = n[w];
    if (Tu.has(w)) {
      c = !0;
      continue;
    } else if (gr(w)) {
      t[w] = z;
      continue;
    } else {
      let _ = Tr(z, sf[w]);
      if (w.startsWith('origin')) ((h = !0), (r[w] = _));
      else l[w] = _;
    }
  }
  if (!n.transform) {
    if (c || f) l.transform = Jz(n, u.transform, f);
    else if (l.transform) l.transform = 'none';
  }
  if (h) {
    let { originX: w = '50%', originY: z = '50%', originZ: _ = 0 } = r;
    l.transformOrigin = `${w} ${z} ${_}`;
  }
}
var MU = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  SU = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
function Yz(u, n, f = 1, l = 0, t = !0) {
  u.pathLength = 1;
  let r = t ? MU : SU;
  u[r.offset] = S.transform(-l);
  let c = S.transform(n),
    h = S.transform(f);
  u[r.array] = `${c} ${h}`;
}
function Hz(u, n, f) {
  return typeof u === 'string' ? u : S.transform(n + f * u);
}
function Iz(u, n, f) {
  let l = Hz(n, u.x, u.width),
    t = Hz(f, u.y, u.height);
  return `${l} ${t}`;
}
function ul(
  u,
  {
    attrX: n,
    attrY: f,
    attrScale: l,
    originX: t,
    originY: r,
    pathLength: c,
    pathSpacing: h = 1,
    pathOffset: w = 0,
    ...z
  },
  _,
  N
) {
  if ((af(u, z, N), _)) {
    if (u.style.viewBox) u.attrs.viewBox = u.style.viewBox;
    return;
  }
  ((u.attrs = u.style), (u.style = {}));
  let { attrs: Q, style: Z, dimensions: Y } = u;
  if (Q.transform) {
    if (Y) Z.transform = Q.transform;
    delete Q.transform;
  }
  if (Y && (t !== void 0 || r !== void 0 || Z.transform))
    Z.transformOrigin = Iz(Y, t !== void 0 ? t : 0.5, r !== void 0 ? r : 0.5);
  if (n !== void 0) Q.x = n;
  if (f !== void 0) Q.y = f;
  if (l !== void 0) Q.scale = l;
  if (c !== void 0) Yz(Q, c, h, w, !1);
}
var nl = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
var dr = () => ({ ...nl(), attrs: {} });
var fl = u => typeof u === 'string' && u.toLowerCase() === 'svg';
function jr(u, { style: n, vars: f }, l, t) {
  Object.assign(u.style, n, t && t.getProjectionStyles(l));
  for (let r in f) u.style.setProperty(r, f[r]);
}
var or = new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust',
]);
function xr(u, n, f, l) {
  jr(u, n, void 0, l);
  for (let t in n.attrs) u.setAttribute(!or.has(t) ? Vf(t) : t, n.attrs[t]);
}
var ll = {};
function Xz(u) {
  Object.assign(ll, u);
}
function Vr(u, { layout: n, layoutId: f }) {
  return (
    Tu.has(u) ||
    u.startsWith('origin') ||
    ((n || f !== void 0) && (!!ll[u] || u === 'opacity'))
  );
}
function tl(u, n, f) {
  var l;
  let { style: t } = u,
    r = {};
  for (let c in t)
    if (
      j(t[c]) ||
      (n.style && j(n.style[c])) ||
      Vr(c, u) ||
      ((l = f === null || f === void 0 ? void 0 : f.getValue(c)) === null ||
      l === void 0
        ? void 0
        : l.liveStyle) !== void 0
    )
      r[c] = t[c];
  return r;
}
function vr(u, n, f) {
  let l = tl(u, n, f);
  for (let t in u)
    if (j(u[t]) || j(n[t])) {
      let r =
        Fn.indexOf(t) !== -1
          ? 'attr' + t.charAt(0).toUpperCase() + t.substring(1)
          : t;
      l[r] = u[t];
    }
  return l;
}
function BU(u, n) {
  try {
    n.dimensions =
      typeof u.getBBox === 'function' ? u.getBBox() : u.getBoundingClientRect();
  } catch (f) {
    n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
  }
}
var Lz = ['x', 'y', 'width', 'height', 'cx', 'cy', 'r'],
  Oz = {
    useVisualState: kr({
      scrapeMotionValuesFromProps: vr,
      createRenderState: dr,
      onUpdate: ({
        props: u,
        prevProps: n,
        current: f,
        renderState: l,
        latestValues: t,
      }) => {
        if (!f) return;
        let r = !!u.drag;
        if (!r) {
          for (let h in t)
            if (Tu.has(h)) {
              r = !0;
              break;
            }
        }
        if (!r) return;
        let c = !n;
        if (n)
          for (let h = 0; h < Lz.length; h++) {
            let w = Lz[h];
            if (u[w] !== n[w]) c = !0;
          }
        if (!c) return;
        D.read(() => {
          (BU(f, l),
            D.render(() => {
              (ul(l, t, fl(f.tagName), u.transformTemplate), xr(f, l));
            }));
        });
      },
    }),
  };
var Fz = {
  useVisualState: kr({
    scrapeMotionValuesFromProps: tl,
    createRenderState: nl,
  }),
};
var rl = R(g(), 1);
var Ez = R(g(), 1);
function Jw(u, n, f) {
  for (let l in n) if (!j(n[l]) && !Vr(l, f)) u[l] = n[l];
}
function GU({ transformTemplate: u }, n) {
  return Ez.useMemo(() => {
    let f = nl();
    return (af(f, n, u), Object.assign({}, f.vars, f.style));
  }, [n]);
}
function CU(u, n) {
  let f = u.style || {},
    l = {};
  return (Jw(l, f, u), Object.assign(l, GU(u, n)), l);
}
function qz(u, n) {
  let f = {},
    l = CU(u, n);
  if (u.drag && u.dragListener !== !1)
    ((f.draggable = !1),
      (l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = 'none'),
      (l.touchAction =
        u.drag === !0 ? 'none' : `pan-${u.drag === 'x' ? 'y' : 'x'}`));
  if (u.tabIndex === void 0 && (u.onTap || u.onTapStart || u.whileTap))
    f.tabIndex = 0;
  return ((f.style = l), f);
}
var Mz = R(g(), 1);
function Sz(u, n, f, l) {
  let t = Mz.useMemo(() => {
    let r = dr();
    return (
      ul(r, n, fl(l), u.transformTemplate),
      { ...r.attrs, style: { ...r.style } }
    );
  }, [n]);
  if (u.style) {
    let r = {};
    (Jw(r, u.style, u), (t.style = { ...r, ...t.style }));
  }
  return t;
}
function Bz(u = !1) {
  return (f, l, t, { latestValues: r }, c) => {
    let w = (pf(f) ? Sz : qz)(l, r, c, f),
      z = b6(l, typeof f === 'string', u),
      _ = f !== rl.Fragment ? { ...z, ...w, ref: t } : {},
      { children: N } = l,
      Q = rl.useMemo(() => (j(N) ? N.get() : N), [N]);
    return rl.createElement(f, { ..._, children: Q });
  };
}
function Gz(u, n) {
  return function f(l, { forwardMotionProps: t } = { forwardMotionProps: !1 }) {
    let c = {
      ...(pf(l) ? Oz : Fz),
      preloadedFeatures: u,
      useRender: Bz(t),
      createVisualElement: n,
      Component: l,
    };
    return hz(c);
  };
}
function Yw(u, n) {
  if (!Array.isArray(n)) return !1;
  let f = n.length;
  if (f !== u.length) return !1;
  for (let l = 0; l < f; l++) if (n[l] !== u[l]) return !1;
  return !0;
}
function H0(u, n, f) {
  let l = u.getProps();
  return bf(l, n, f !== void 0 ? f : l.custom, u);
}
var Hw = p0(() => window.ScrollTimeline !== void 0);
class yr {
  constructor(u) {
    ((this.stop = () => this.runAll('stop')),
      (this.animations = u.filter(Boolean)));
  }
  get finished() {
    return Promise.all(
      this.animations.map(u => ('finished' in u ? u.finished : u))
    );
  }
  getAll(u) {
    return this.animations[0][u];
  }
  setAll(u, n) {
    for (let f = 0; f < this.animations.length; f++) this.animations[f][u] = n;
  }
  attachTimeline(u, n) {
    let f = this.animations.map(l => {
      if (Hw() && l.attachTimeline) return l.attachTimeline(u);
      else if (typeof n === 'function') return n(l);
    });
    return () => {
      f.forEach((l, t) => {
        (l && l(), this.animations[t].stop());
      });
    };
  }
  get time() {
    return this.getAll('time');
  }
  set time(u) {
    this.setAll('time', u);
  }
  get speed() {
    return this.getAll('speed');
  }
  set speed(u) {
    this.setAll('speed', u);
  }
  get startTime() {
    return this.getAll('startTime');
  }
  get duration() {
    let u = 0;
    for (let n = 0; n < this.animations.length; n++)
      u = Math.max(u, this.animations[n].duration);
    return u;
  }
  runAll(u) {
    this.animations.forEach(n => n[u]());
  }
  flatten() {
    this.runAll('flatten');
  }
  play() {
    this.runAll('play');
  }
  pause() {
    this.runAll('pause');
  }
  cancel() {
    this.runAll('cancel');
  }
  complete() {
    this.runAll('complete');
  }
}
class pr extends yr {
  then(u, n) {
    return Promise.all(this.animations).then(u).catch(n);
  }
}
function I0(u, n) {
  return u ? u[n] || u.default || u : void 0;
}
var ir = 20000;
function cl(u) {
  let n = 0,
    f = 50,
    l = u.next(n);
  while (!l.done && n < 20000) ((n += f), (l = u.next(n)));
  return n >= 20000 ? 1 / 0 : n;
}
function X0(u) {
  return typeof u === 'function';
}
function K1(u, n) {
  ((u.timeline = n), (u.onfinish = null));
}
var hl = u => Array.isArray(u) && typeof u[0] === 'number';
var Iw = { linearEasing: void 0 };
function Cz(u, n) {
  let f = p0(u);
  return () => {
    var l;
    return (l = Iw[n]) !== null && l !== void 0 ? l : f();
  };
}
var L0 = Cz(() => {
  try {
    document
      .createElement('div')
      .animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
  } catch (u) {
    return !1;
  }
  return !0;
}, 'linearEasing');
var P1 = (u, n, f = 10) => {
  let l = '',
    t = Math.max(Math.round(n / f), 2);
  for (let r = 0; r < t; r++) l += u(yu(0, t - 1, r)) + ', ';
  return `linear(${l.substring(0, l.length - 2)})`;
};
function mr(u) {
  return Boolean(
    (typeof u === 'function' && L0()) ||
    !u ||
    (typeof u === 'string' && (u in br || L0())) ||
    hl(u) ||
    (Array.isArray(u) && u.every(mr))
  );
}
var wl = ([u, n, f, l]) => `cubic-bezier(${u}, ${n}, ${f}, ${l})`,
  br = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: wl([0, 0.65, 0.55, 1]),
    circOut: wl([0.55, 0, 1, 0.45]),
    backIn: wl([0.31, 0.01, 0.66, -0.59]),
    backOut: wl([0.33, 1.53, 0.69, 0.99]),
  };
function zl(u, n) {
  if (!u) return;
  else if (typeof u === 'function' && L0()) return P1(u, n);
  else if (hl(u)) return wl(u);
  else if (Array.isArray(u)) return u.map(f => zl(f, n) || br.easeOut);
  else return br[u];
}
var iu = { x: !1, y: !1 };
function _l() {
  return iu.x || iu.y;
}
function Xw(u, n, f) {
  var l;
  if (u instanceof Element) return [u];
  else if (typeof u === 'string') {
    let t = document;
    if (n) t = n.current;
    let r =
      (l = f === null || f === void 0 ? void 0 : f[u]) !== null && l !== void 0
        ? l
        : t.querySelectorAll(u);
    return r ? Array.from(r) : [];
  }
  return Array.from(u);
}
function er(u, n) {
  let f = Xw(u),
    l = new AbortController(),
    t = { passive: !0, ...n, signal: l.signal };
  return [f, t, () => l.abort()];
}
function Dz(u) {
  return n => {
    if (n.pointerType === 'touch' || _l()) return;
    u(n);
  };
}
function Lw(u, n, f = {}) {
  let [l, t, r] = er(u, f),
    c = Dz(h => {
      let { target: w } = h,
        z = n(h);
      if (typeof z !== 'function' || !w) return;
      let _ = Dz(N => {
        (z(N), w.removeEventListener('pointerleave', _));
      });
      w.addEventListener('pointerleave', _, t);
    });
  return (
    l.forEach(h => {
      h.addEventListener('pointerenter', c, t);
    }),
    r
  );
}
var sr = (u, n) => {
  if (!n) return !1;
  else if (u === n) return !0;
  else return sr(u, n.parentElement);
};
var b0 = u => {
  if (u.pointerType === 'mouse')
    return typeof u.button !== 'number' || u.button <= 0;
  else return u.isPrimary !== !1;
};
var DU = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']);
function Kz(u) {
  return DU.has(u.tagName) || u.tabIndex !== -1;
}
var m0 = new WeakSet();
function Pz(u) {
  return n => {
    if (n.key !== 'Enter') return;
    u(n);
  };
}
function Ow(u, n) {
  u.dispatchEvent(
    new PointerEvent('pointer' + n, { isPrimary: !0, bubbles: !0 })
  );
}
var Az = (u, n) => {
  let f = u.currentTarget;
  if (!f) return;
  let l = Pz(() => {
    if (m0.has(f)) return;
    Ow(f, 'down');
    let t = Pz(() => {
        Ow(f, 'up');
      }),
      r = () => Ow(f, 'cancel');
    (f.addEventListener('keyup', t, n), f.addEventListener('blur', r, n));
  });
  (f.addEventListener('keydown', l, n),
    f.addEventListener('blur', () => f.removeEventListener('keydown', l), n));
};
function Rz(u) {
  return b0(u) && !_l();
}
function Fw(u, n, f = {}) {
  let [l, t, r] = er(u, f),
    c = h => {
      let w = h.currentTarget;
      if (!Rz(h) || m0.has(w)) return;
      m0.add(w);
      let z = n(h),
        _ = (Z, Y) => {
          if (
            (window.removeEventListener('pointerup', N),
            window.removeEventListener('pointercancel', Q),
            !Rz(Z) || !m0.has(w))
          )
            return;
          if ((m0.delete(w), typeof z === 'function')) z(Z, { success: Y });
        },
        N = Z => {
          _(Z, f.useGlobalTarget || sr(w, Z.target));
        },
        Q = Z => {
          _(Z, !1);
        };
      (window.addEventListener('pointerup', N, t),
        window.addEventListener('pointercancel', Q, t));
    };
  return (
    l.forEach(h => {
      if (!Kz(h) && h.getAttribute('tabindex') === null) h.tabIndex = 0;
      ((f.useGlobalTarget ? window : h).addEventListener('pointerdown', c, t),
        h.addEventListener('focus', z => Az(z, t), t));
    }),
    r
  );
}
function Ew(u) {
  if (u === 'x' || u === 'y')
    if (iu[u]) return null;
    else
      return (
        (iu[u] = !0),
        () => {
          iu[u] = !1;
        }
      );
  else if (iu.x || iu.y) return null;
  else
    return (
      (iu.x = iu.y = !0),
      () => {
        iu.x = iu.y = !1;
      }
    );
}
var ar = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...Fn]);
var uc;
function PU() {
  uc = void 0;
}
var Fu = {
  now: () => {
    if (uc === void 0)
      Fu.set(
        nu.isProcessing || xf.useManualTiming ? nu.timestamp : performance.now()
      );
    return uc;
  },
  set: u => {
    ((uc = u), queueMicrotask(PU));
  },
};
function Nl(u, n) {
  if (u.indexOf(n) === -1) u.push(n);
}
function Ql(u, n) {
  let f = u.indexOf(n);
  if (f > -1) u.splice(f, 1);
}
class e0 {
  constructor() {
    this.subscriptions = [];
  }
  add(u) {
    return (Nl(this.subscriptions, u), () => Ql(this.subscriptions, u));
  }
  notify(u, n, f) {
    let l = this.subscriptions.length;
    if (!l) return;
    if (l === 1) this.subscriptions[0](u, n, f);
    else
      for (let t = 0; t < l; t++) {
        let r = this.subscriptions[t];
        r && r(u, n, f);
      }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
function nc(u, n) {
  return n ? u * (1000 / n) : 0;
}
var gz = 30,
  AU = u => {
    return !isNaN(parseFloat(u));
  },
  Tz = { current: void 0 };
class dz {
  constructor(u, n = {}) {
    ((this.version = '11.18.2'),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (f, l = !0) => {
        let t = Fu.now();
        if (this.updatedAt !== t) this.setPrevFrameValue();
        if (
          ((this.prev = this.current),
          this.setCurrent(f),
          this.current !== this.prev && this.events.change)
        )
          this.events.change.notify(this.current);
        if (l && this.events.renderRequest)
          this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(u),
      (this.owner = n.owner));
  }
  setCurrent(u) {
    if (
      ((this.current = u),
      (this.updatedAt = Fu.now()),
      this.canTrackVelocity === null && u !== void 0)
    )
      this.canTrackVelocity = AU(this.current);
  }
  setPrevFrameValue(u = this.current) {
    ((this.prevFrameValue = u), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(u) {
    return this.on('change', u);
  }
  on(u, n) {
    if (!this.events[u]) this.events[u] = new e0();
    let f = this.events[u].add(n);
    if (u === 'change')
      return () => {
        (f(),
          D.read(() => {
            if (!this.events.change.getSize()) this.stop();
          }));
      };
    return f;
  }
  clearListeners() {
    for (let u in this.events) this.events[u].clear();
  }
  attach(u, n) {
    ((this.passiveEffect = u), (this.stopPassiveEffect = n));
  }
  set(u, n = !0) {
    if (!n || !this.passiveEffect) this.updateAndNotify(u, n);
    else this.passiveEffect(u, this.updateAndNotify);
  }
  setWithVelocity(u, n, f) {
    (this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = u),
      (this.prevUpdatedAt = this.updatedAt - f));
  }
  jump(u, n = !0) {
    if (
      (this.updateAndNotify(u),
      (this.prev = u),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect)
    )
      this.stopPassiveEffect();
  }
  get() {
    if (Tz.current) Tz.current.push(this);
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    let u = Fu.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      u - this.updatedAt > gz
    )
      return 0;
    let n = Math.min(this.updatedAt - this.prevUpdatedAt, gz);
    return nc(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(u) {
    return (
      this.stop(),
      new Promise(n => {
        if (
          ((this.hasAnimated = !0),
          (this.animation = u(n)),
          this.events.animationStart)
        )
          this.events.animationStart.notify();
      }).then(() => {
        if (this.events.animationComplete)
          this.events.animationComplete.notify();
        this.clearAnimation();
      })
    );
  }
  stop() {
    if (this.animation) {
      if ((this.animation.stop(), this.events.animationCancel))
        this.events.animationCancel.notify();
    }
    this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    if ((this.clearListeners(), this.stop(), this.stopPassiveEffect))
      this.stopPassiveEffect();
  }
}
function xn(u, n) {
  return new dz(u, n);
}
function RU(u, n, f) {
  if (u.hasValue(n)) u.getValue(n).set(f);
  else u.addValue(n, xn(f));
}
function jz(u, n) {
  let f = H0(u, n),
    { transitionEnd: l = {}, transition: t = {}, ...r } = f || {};
  r = { ...r, ...l };
  for (let c in r) {
    let h = Nz(r[c]);
    RU(u, c, h);
  }
}
function oz(u) {
  return Boolean(j(u) && u.add);
}
function A1(u, n) {
  let f = u.getValue('willChange');
  if (oz(f)) return f.add(n);
}
function fc(u) {
  return u.props[Ar];
}
var lc = { current: !1 };
var xz = (u, n, f) =>
    (((1 - 3 * f + 3 * n) * u + (3 * f - 6 * n)) * u + 3 * n) * u,
  kU = 0.0000001,
  gU = 12;
function TU(u, n, f, l, t) {
  let r,
    c,
    h = 0;
  do
    if (((c = n + (f - n) / 2), (r = xz(c, l, t) - u), r > 0)) f = c;
    else n = c;
  while (Math.abs(r) > kU && ++h < gU);
  return c;
}
function O0(u, n, f, l) {
  if (u === n && f === l) return T;
  let t = r => TU(r, 0, 1, u, f);
  return r => (r === 0 || r === 1 ? r : xz(t(r), n, l));
}
var tc = u => n => (n <= 0.5 ? u(2 * n) / 2 : (2 - u(2 * (1 - n))) / 2);
var rc = u => n => 1 - u(1 - n);
var qw = O0(0.33, 1.53, 0.69, 0.99),
  R1 = rc(qw),
  cc = tc(R1);
var hc = u =>
  (u *= 2) < 1 ? 0.5 * R1(u) : 0.5 * (2 - Math.pow(2, -10 * (u - 1)));
var wc = u => 1 - Math.sin(Math.acos(u)),
  zc = rc(wc),
  _c = tc(wc);
var Nc = u => /^0[^.\s]+$/u.test(u);
function Vz(u) {
  if (typeof u === 'number') return u === 0;
  else if (u !== null) return u === 'none' || u === '0' || Nc(u);
  else return !0;
}
var F0 = u => Math.round(u * 1e5) / 1e5;
var $l = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function vz(u) {
  return u == null;
}
var yz =
  /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
var Ul = (u, n) => f => {
    return Boolean(
      (typeof f === 'string' && yz.test(f) && f.startsWith(u)) ||
      (n && !vz(f) && Object.prototype.hasOwnProperty.call(f, n))
    );
  },
  Qc = (u, n, f) => l => {
    if (typeof l !== 'string') return l;
    let [t, r, c, h] = l.match($l);
    return {
      [u]: parseFloat(t),
      [n]: parseFloat(r),
      [f]: parseFloat(c),
      alpha: h !== void 0 ? parseFloat(h) : 1,
    };
  };
var dU = u => Wu(0, 255, u),
  Mw = { ...En, transform: u => Math.round(dU(u)) },
  Mn = {
    test: Ul('rgb', 'red'),
    parse: Qc('red', 'green', 'blue'),
    transform: ({ red: u, green: n, blue: f, alpha: l = 1 }) =>
      'rgba(' +
      Mw.transform(u) +
      ', ' +
      Mw.transform(n) +
      ', ' +
      Mw.transform(f) +
      ', ' +
      F0(on.transform(l)) +
      ')',
  };
function jU(u) {
  let n = '',
    f = '',
    l = '',
    t = '';
  if (u.length > 5)
    ((n = u.substring(1, 3)),
      (f = u.substring(3, 5)),
      (l = u.substring(5, 7)),
      (t = u.substring(7, 9)));
  else
    ((n = u.substring(1, 2)),
      (f = u.substring(2, 3)),
      (l = u.substring(3, 4)),
      (t = u.substring(4, 5)),
      (n += n),
      (f += f),
      (l += l),
      (t += t));
  return {
    red: parseInt(n, 16),
    green: parseInt(f, 16),
    blue: parseInt(l, 16),
    alpha: t ? parseInt(t, 16) / 255 : 1,
  };
}
var k1 = { test: Ul('#'), parse: jU, transform: Mn.transform };
var E0 = {
  test: Ul('hsl', 'hue'),
  parse: Qc('hue', 'saturation', 'lightness'),
  transform: ({ hue: u, saturation: n, lightness: f, alpha: l = 1 }) => {
    return (
      'hsla(' +
      Math.round(u) +
      ', ' +
      Cu.transform(F0(n)) +
      ', ' +
      Cu.transform(F0(f)) +
      ', ' +
      F0(on.transform(l)) +
      ')'
    );
  },
};
var ru = {
  test: u => Mn.test(u) || k1.test(u) || E0.test(u),
  parse: u => {
    if (Mn.test(u)) return Mn.parse(u);
    else if (E0.test(u)) return E0.parse(u);
    else return k1.parse(u);
  },
  transform: u => {
    return typeof u === 'string'
      ? u
      : u.hasOwnProperty('red')
        ? Mn.transform(u)
        : E0.transform(u);
  },
};
var pz =
  /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function oU(u) {
  var n, f;
  return (
    isNaN(u) &&
    typeof u === 'string' &&
    (((n = u.match($l)) === null || n === void 0 ? void 0 : n.length) || 0) +
      (((f = u.match(pz)) === null || f === void 0 ? void 0 : f.length) || 0) >
      0
  );
}
var bz = 'number',
  mz = 'color',
  xU = 'var',
  VU = 'var(',
  iz = '${}',
  vU =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function s0(u) {
  let n = u.toString(),
    f = [],
    l = { color: [], number: [], var: [] },
    t = [],
    r = 0,
    h = n
      .replace(vU, w => {
        if (ru.test(w)) (l.color.push(r), t.push(mz), f.push(ru.parse(w)));
        else if (w.startsWith(VU)) (l.var.push(r), t.push(xU), f.push(w));
        else (l.number.push(r), t.push(bz), f.push(parseFloat(w)));
        return (++r, iz);
      })
      .split(iz);
  return { values: f, split: h, indexes: l, types: t };
}
function ez(u) {
  return s0(u).values;
}
function sz(u) {
  let { split: n, types: f } = s0(u),
    l = n.length;
  return t => {
    let r = '';
    for (let c = 0; c < l; c++)
      if (((r += n[c]), t[c] !== void 0)) {
        let h = f[c];
        if (h === bz) r += F0(t[c]);
        else if (h === mz) r += ru.transform(t[c]);
        else r += t[c];
      }
    return r;
  };
}
var yU = u => (typeof u === 'number' ? 0 : u);
function pU(u) {
  let n = ez(u);
  return sz(u)(n.map(yU));
}
var Du = { test: oU, parse: ez, createTransformer: sz, getAnimatableNone: pU };
var iU = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function bU(u) {
  let [n, f] = u.slice(0, -1).split('(');
  if (n === 'drop-shadow') return u;
  let [l] = f.match($l) || [];
  if (!l) return u;
  let t = f.replace(l, ''),
    r = iU.has(n) ? 1 : 0;
  if (l !== f) r *= 100;
  return n + '(' + r + t + ')';
}
var mU = /\b([a-z-]*)\(.*?\)/gu,
  g1 = {
    ...Du,
    getAnimatableNone: u => {
      let n = u.match(mU);
      return n ? n.map(bU).join(' ') : u;
    },
  };
var eU = {
    ...sf,
    color: ru,
    backgroundColor: ru,
    outlineColor: ru,
    fill: ru,
    stroke: ru,
    borderColor: ru,
    borderTopColor: ru,
    borderRightColor: ru,
    borderBottomColor: ru,
    borderLeftColor: ru,
    filter: g1,
    WebkitFilter: g1,
  },
  Wl = u => eU[u];
function $c(u, n) {
  let f = Wl(u);
  if (f !== g1) f = Du;
  return f.getAnimatableNone ? f.getAnimatableNone(n) : void 0;
}
var sU = new Set(['auto', 'none', '0']);
function az(u, n, f) {
  let l = 0,
    t = void 0;
  while (l < u.length && !t) {
    let r = u[l];
    if (typeof r === 'string' && !sU.has(r) && s0(r).values.length) t = u[l];
    l++;
  }
  if (t && f) for (let r of n) u[r] = $c(f, t);
}
var Sw = u => u === En || u === S,
  u7 = (u, n) => parseFloat(u.split(', ')[n]),
  n7 =
    (u, n) =>
    (f, { transform: l }) => {
      if (l === 'none' || !l) return 0;
      let t = l.match(/^matrix3d\((.+)\)$/u);
      if (t) return u7(t[1], n);
      else {
        let r = l.match(/^matrix\((.+)\)$/u);
        if (r) return u7(r[1], u);
        else return 0;
      }
    },
  aU = new Set(['x', 'y', 'z']),
  uW = Fn.filter(u => !aU.has(u));
function f7(u) {
  let n = [];
  return (
    uW.forEach(f => {
      let l = u.getValue(f);
      if (l !== void 0)
        (n.push([f, l.get()]), l.set(f.startsWith('scale') ? 1 : 0));
    }),
    n
  );
}
var a0 = {
  width: ({ x: u }, { paddingLeft: n = '0', paddingRight: f = '0' }) =>
    u.max - u.min - parseFloat(n) - parseFloat(f),
  height: ({ y: u }, { paddingTop: n = '0', paddingBottom: f = '0' }) =>
    u.max - u.min - parseFloat(n) - parseFloat(f),
  top: (u, { top: n }) => parseFloat(n),
  left: (u, { left: n }) => parseFloat(n),
  bottom: ({ y: u }, { top: n }) => parseFloat(n) + (u.max - u.min),
  right: ({ x: u }, { left: n }) => parseFloat(n) + (u.max - u.min),
  x: n7(4, 13),
  y: n7(5, 14),
};
a0.translateX = a0.x;
a0.translateY = a0.y;
var uf = new Set(),
  Bw = !1,
  Gw = !1;
function l7() {
  if (Gw) {
    let u = Array.from(uf).filter(l => l.needsMeasurement),
      n = new Set(u.map(l => l.element)),
      f = new Map();
    (n.forEach(l => {
      let t = f7(l);
      if (!t.length) return;
      (f.set(l, t), l.render());
    }),
      u.forEach(l => l.measureInitialState()),
      n.forEach(l => {
        l.render();
        let t = f.get(l);
        if (t)
          t.forEach(([r, c]) => {
            var h;
            (h = l.getValue(r)) === null || h === void 0 || h.set(c);
          });
      }),
      u.forEach(l => l.measureEndState()),
      u.forEach(l => {
        if (l.suspendedScrollY !== void 0)
          window.scrollTo(0, l.suspendedScrollY);
      }));
  }
  ((Gw = !1), (Bw = !1), uf.forEach(u => u.complete()), uf.clear());
}
function t7() {
  uf.forEach(u => {
    if ((u.readKeyframes(), u.needsMeasurement)) Gw = !0;
  });
}
function r7() {
  (t7(), l7());
}
class nf {
  constructor(u, n, f, l, t, r = !1) {
    ((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...u]),
      (this.onComplete = n),
      (this.name = f),
      (this.motionValue = l),
      (this.element = t),
      (this.isAsync = r));
  }
  scheduleResolve() {
    if (((this.isScheduled = !0), this.isAsync)) {
      if ((uf.add(this), !Bw)) ((Bw = !0), D.read(t7), D.resolveKeyframes(l7));
    } else (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    let { unresolvedKeyframes: u, name: n, element: f, motionValue: l } = this;
    for (let t = 0; t < u.length; t++)
      if (u[t] === null)
        if (t === 0) {
          let r = l === null || l === void 0 ? void 0 : l.get(),
            c = u[u.length - 1];
          if (r !== void 0) u[0] = r;
          else if (f && n) {
            let h = f.readValue(n, c);
            if (h !== void 0 && h !== null) u[0] = h;
          }
          if (u[0] === void 0) u[0] = c;
          if (l && r === void 0) l.set(u[0]);
        } else u[t] = u[t - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      uf.delete(this));
  }
  cancel() {
    if (!this.isComplete) ((this.isScheduled = !1), uf.delete(this));
  }
  resume() {
    if (!this.isComplete) this.scheduleResolve();
  }
}
var Uc = u => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(u);
var nW = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function fW(u) {
  let n = nW.exec(u);
  if (!n) return [,];
  let [, f, l, t] = n;
  return [`--${f !== null && f !== void 0 ? f : l}`, t];
}
var lW = 4;
function Cw(u, n, f = 1) {
  vu(
    f <= lW,
    `Max CSS variable fallback depth detected in property "${u}". This may indicate a circular fallback dependency.`
  );
  let [l, t] = fW(u);
  if (!l) return;
  let r = window.getComputedStyle(n).getPropertyValue(l);
  if (r) {
    let c = r.trim();
    return Uc(c) ? parseFloat(c) : c;
  }
  return ef(t) ? Cw(t, n, f + 1) : t;
}
var Wc = u => n => n.test(u);
var c7 = { test: u => u === 'auto', parse: u => u };
var Dw = [En, S, Cu, qn, Uz, $z, c7],
  Kw = u => Dw.find(Wc(u));
class T1 extends nf {
  constructor(u, n, f, l, t) {
    super(u, n, f, l, t, !0);
  }
  readKeyframes() {
    let { unresolvedKeyframes: u, element: n, name: f } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let h = 0; h < u.length; h++) {
      let w = u[h];
      if (typeof w === 'string') {
        if (((w = w.trim()), ef(w))) {
          let z = Cw(w, n.current);
          if (z !== void 0) u[h] = z;
          if (h === u.length - 1) this.finalKeyframe = w;
        }
      }
    }
    if ((this.resolveNoneKeyframes(), !ar.has(f) || u.length !== 2)) return;
    let [l, t] = u,
      r = Kw(l),
      c = Kw(t);
    if (r === c) return;
    if (Sw(r) && Sw(c))
      for (let h = 0; h < u.length; h++) {
        let w = u[h];
        if (typeof w === 'string') u[h] = parseFloat(w);
      }
    else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    let { unresolvedKeyframes: u, name: n } = this,
      f = [];
    for (let l = 0; l < u.length; l++) if (Vz(u[l])) f.push(l);
    if (f.length) az(u, f, n);
  }
  measureInitialState() {
    let { element: u, unresolvedKeyframes: n, name: f } = this;
    if (!u || !u.current) return;
    if (f === 'height') this.suspendedScrollY = window.pageYOffset;
    ((this.measuredOrigin = a0[f](
      u.measureViewportBox(),
      window.getComputedStyle(u.current)
    )),
      (n[0] = this.measuredOrigin));
    let l = n[n.length - 1];
    if (l !== void 0) u.getValue(f, l).jump(l, !1);
  }
  measureEndState() {
    var u;
    let { element: n, name: f, unresolvedKeyframes: l } = this;
    if (!n || !n.current) return;
    let t = n.getValue(f);
    t && t.jump(this.measuredOrigin, !1);
    let r = l.length - 1,
      c = l[r];
    if (
      ((l[r] = a0[f](
        n.measureViewportBox(),
        window.getComputedStyle(n.current)
      )),
      c !== null && this.finalKeyframe === void 0)
    )
      this.finalKeyframe = c;
    if (
      (u = this.removedTransforms) === null || u === void 0 ? void 0 : u.length
    )
      this.removedTransforms.forEach(([h, w]) => {
        n.getValue(h).set(w);
      });
    this.resolveNoneKeyframes();
  }
}
var Pw = (u, n) => {
  if (n === 'zIndex') return !1;
  if (typeof u === 'number' || Array.isArray(u)) return !0;
  if (
    typeof u === 'string' &&
    (Du.test(u) || u === '0') &&
    !u.startsWith('url(')
  )
    return !0;
  return !1;
};
function tW(u) {
  let n = u[0];
  if (u.length === 1) return !0;
  for (let f = 0; f < u.length; f++) if (u[f] !== n) return !0;
}
function h7(u, n, f, l) {
  let t = u[0];
  if (t === null) return !1;
  if (n === 'display' || n === 'visibility') return !0;
  let r = u[u.length - 1],
    c = Pw(t, n),
    h = Pw(r, n);
  if (
    (On(
      c === h,
      `You are trying to animate ${n} from "${t}" to "${r}". ${t} is not an animatable value - to enable this animation set ${t} to a value animatable to ${r} via the \`style\` property.`
    ),
    !c || !h)
  )
    return !1;
  return tW(u) || ((f === 'spring' || X0(f)) && l);
}
var rW = u => u !== null;
function q0(u, { repeat: n, repeatType: f = 'loop' }, l) {
  let t = u.filter(rW),
    r = n && f !== 'loop' && n % 2 === 1 ? 0 : t.length - 1;
  return !r || l === void 0 ? t[r] : l;
}
var cW = 40;
class d1 {
  constructor({
    autoplay: u = !0,
    delay: n = 0,
    type: f = 'keyframes',
    repeat: l = 0,
    repeatDelay: t = 0,
    repeatType: r = 'loop',
    ...c
  }) {
    ((this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = Fu.now()),
      (this.options = {
        autoplay: u,
        delay: n,
        type: f,
        repeat: l,
        repeatDelay: t,
        repeatType: r,
        ...c,
      }),
      this.updateFinishedPromise());
  }
  calcStartTime() {
    if (!this.resolvedAt) return this.createdAt;
    return this.resolvedAt - this.createdAt > cW
      ? this.resolvedAt
      : this.createdAt;
  }
  get resolved() {
    if (!this._resolved && !this.hasAttemptedResolve) r7();
    return this._resolved;
  }
  onKeyframesResolved(u, n) {
    ((this.resolvedAt = Fu.now()), (this.hasAttemptedResolve = !0));
    let {
      name: f,
      type: l,
      velocity: t,
      delay: r,
      onComplete: c,
      onUpdate: h,
      isGenerator: w,
    } = this.options;
    if (!w && !h7(u, f, l, t))
      if (lc.current || !r) {
        (h && h(q0(u, this.options, n)),
          c && c(),
          this.resolveFinishedPromise());
        return;
      } else this.options.duration = 0;
    let z = this.initPlayback(u, n);
    if (z === !1) return;
    ((this._resolved = { keyframes: u, finalKeyframe: n, ...z }),
      this.onPostResolved());
  }
  onPostResolved() {}
  then(u, n) {
    return this.currentFinishedPromise.then(u, n);
  }
  flatten() {
    ((this.options.type = 'keyframes'), (this.options.ease = 'linear'));
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise(u => {
      this.resolveFinishedPromise = u;
    });
  }
}
var P = (u, n, f) => {
  return u + (n - u) * f;
};
function Aw(u, n, f) {
  if (f < 0) f += 1;
  if (f > 1) f -= 1;
  if (f < 0.16666666666666666) return u + (n - u) * 6 * f;
  if (f < 0.5) return n;
  if (f < 0.6666666666666666) return u + (n - u) * (0.6666666666666666 - f) * 6;
  return u;
}
function w7({ hue: u, saturation: n, lightness: f, alpha: l }) {
  ((u /= 360), (n /= 100), (f /= 100));
  let t = 0,
    r = 0,
    c = 0;
  if (!n) t = r = c = f;
  else {
    let h = f < 0.5 ? f * (1 + n) : f + n - f * n,
      w = 2 * f - h;
    ((t = Aw(w, h, u + 0.3333333333333333)),
      (r = Aw(w, h, u)),
      (c = Aw(w, h, u - 0.3333333333333333)));
  }
  return {
    red: Math.round(t * 255),
    green: Math.round(r * 255),
    blue: Math.round(c * 255),
    alpha: l,
  };
}
function Zl(u, n) {
  return f => (f > 0 ? n : u);
}
var Rw = (u, n, f) => {
    let l = u * u,
      t = f * (n * n - l) + l;
    return t < 0 ? 0 : Math.sqrt(t);
  },
  hW = [k1, Mn, E0],
  wW = u => hW.find(n => n.test(u));
function z7(u) {
  let n = wW(u);
  if (
    (On(
      Boolean(n),
      `'${u}' is not an animatable color. Use the equivalent color code instead.`
    ),
    !Boolean(n))
  )
    return !1;
  let f = n.parse(u);
  if (n === E0) f = w7(f);
  return f;
}
var kw = (u, n) => {
  let f = z7(u),
    l = z7(n);
  if (!f || !l) return Zl(u, n);
  let t = { ...f };
  return r => {
    return (
      (t.red = Rw(f.red, l.red, r)),
      (t.green = Rw(f.green, l.green, r)),
      (t.blue = Rw(f.blue, l.blue, r)),
      (t.alpha = P(f.alpha, l.alpha, r)),
      Mn.transform(t)
    );
  };
};
var zW = (u, n) => f => n(u(f)),
  Sn = (...u) => u.reduce(zW);
var Zc = new Set(['none', 'hidden']);
function _7(u, n) {
  if (Zc.has(u)) return f => (f <= 0 ? u : n);
  else return f => (f >= 1 ? n : u);
}
function _W(u, n) {
  return f => P(u, n, f);
}
function Jc(u) {
  if (typeof u === 'number') return _W;
  else if (typeof u === 'string') return ef(u) ? Zl : ru.test(u) ? kw : $W;
  else if (Array.isArray(u)) return N7;
  else if (typeof u === 'object') return ru.test(u) ? kw : NW;
  return Zl;
}
function N7(u, n) {
  let f = [...u],
    l = f.length,
    t = u.map((r, c) => Jc(r)(r, n[c]));
  return r => {
    for (let c = 0; c < l; c++) f[c] = t[c](r);
    return f;
  };
}
function NW(u, n) {
  let f = { ...u, ...n },
    l = {};
  for (let t in f)
    if (u[t] !== void 0 && n[t] !== void 0) l[t] = Jc(u[t])(u[t], n[t]);
  return t => {
    for (let r in l) f[r] = l[r](t);
    return f;
  };
}
function QW(u, n) {
  var f;
  let l = [],
    t = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < n.values.length; r++) {
    let c = n.types[r],
      h = u.indexes[c][t[c]],
      w = (f = u.values[h]) !== null && f !== void 0 ? f : 0;
    ((l[r] = w), t[c]++);
  }
  return l;
}
var $W = (u, n) => {
  let f = Du.createTransformer(n),
    l = s0(u),
    t = s0(n);
  if (
    l.indexes.var.length === t.indexes.var.length &&
    l.indexes.color.length === t.indexes.color.length &&
    l.indexes.number.length >= t.indexes.number.length
  ) {
    if ((Zc.has(u) && !t.values.length) || (Zc.has(n) && !l.values.length))
      return _7(u, n);
    return Sn(N7(QW(l, t), t.values), f);
  } else
    return (
      On(
        !0,
        `Complex values '${u}' and '${n}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
      ),
      Zl(u, n)
    );
};
function Yc(u, n, f) {
  if (typeof u === 'number' && typeof n === 'number' && typeof f === 'number')
    return P(u, n, f);
  return Jc(u)(u, n);
}
var UW = 5;
function Hc(u, n, f) {
  let l = Math.max(n - UW, 0);
  return nc(f - u(l), n - l);
}
var v = {
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  duration: 800,
  bounce: 0.3,
  visualDuration: 0.3,
  restSpeed: { granular: 0.01, default: 2 },
  restDelta: { granular: 0.005, default: 0.5 },
  minDuration: 0.01,
  maxDuration: 10,
  minDamping: 0.05,
  maxDamping: 1,
};
var gw = 0.001;
function Q7({
  duration: u = v.duration,
  bounce: n = v.bounce,
  velocity: f = v.velocity,
  mass: l = v.mass,
}) {
  let t, r;
  On(u <= uu(v.maxDuration), 'Spring duration must be 10 seconds or less');
  let c = 1 - n;
  if (
    ((c = Wu(v.minDamping, v.maxDamping, c)),
    (u = Wu(v.minDuration, v.maxDuration, Uu(u))),
    c < 1)
  )
    ((t = z => {
      let _ = z * c,
        N = _ * u,
        Q = _ - f,
        Z = Ic(z, c),
        Y = Math.exp(-N);
      return gw - (Q / Z) * Y;
    }),
      (r = z => {
        let N = z * c * u,
          Q = N * f + f,
          Z = Math.pow(c, 2) * Math.pow(z, 2) * u,
          Y = Math.exp(-N),
          H = Ic(Math.pow(z, 2), c);
        return ((-t(z) + gw > 0 ? -1 : 1) * ((Q - Z) * Y)) / H;
      }));
  else
    ((t = z => {
      let _ = Math.exp(-z * u),
        N = (z - f) * u + 1;
      return -gw + _ * N;
    }),
      (r = z => {
        let _ = Math.exp(-z * u),
          N = (f - z) * (u * u);
        return _ * N;
      }));
  let h = 5 / u,
    w = ZW(t, r, h);
  if (((u = uu(u)), isNaN(w)))
    return { stiffness: v.stiffness, damping: v.damping, duration: u };
  else {
    let z = Math.pow(w, 2) * l;
    return { stiffness: z, damping: c * 2 * Math.sqrt(l * z), duration: u };
  }
}
var WW = 12;
function ZW(u, n, f) {
  let l = f;
  for (let t = 1; t < WW; t++) l = l - u(l) / n(l);
  return l;
}
function Ic(u, n) {
  return u * Math.sqrt(1 - n * n);
}
var JW = ['duration', 'bounce'],
  YW = ['stiffness', 'damping', 'mass'];
function $7(u, n) {
  return n.some(f => u[f] !== void 0);
}
function HW(u) {
  let n = {
    velocity: v.velocity,
    stiffness: v.stiffness,
    damping: v.damping,
    mass: v.mass,
    isResolvedFromDuration: !1,
    ...u,
  };
  if (!$7(u, YW) && $7(u, JW))
    if (u.visualDuration) {
      let f = u.visualDuration,
        l = (2 * Math.PI) / (f * 1.2),
        t = l * l,
        r = 2 * Wu(0.05, 1, 1 - (u.bounce || 0)) * Math.sqrt(t);
      n = { ...n, mass: v.mass, stiffness: t, damping: r };
    } else {
      let f = Q7(u);
      ((n = { ...n, ...f, mass: v.mass }), (n.isResolvedFromDuration = !0));
    }
  return n;
}
function Xc(u = v.visualDuration, n = v.bounce) {
  let f =
      typeof u !== 'object'
        ? { visualDuration: u, keyframes: [0, 1], bounce: n }
        : u,
    { restSpeed: l, restDelta: t } = f,
    r = f.keyframes[0],
    c = f.keyframes[f.keyframes.length - 1],
    h = { done: !1, value: r },
    {
      stiffness: w,
      damping: z,
      mass: _,
      duration: N,
      velocity: Q,
      isResolvedFromDuration: Z,
    } = HW({ ...f, velocity: -Uu(f.velocity || 0) }),
    Y = Q || 0,
    H = z / (2 * Math.sqrt(w * _)),
    F = c - r,
    U = Uu(Math.sqrt(w / _)),
    $ = Math.abs(F) < 5;
  (l || (l = $ ? v.restSpeed.granular : v.restSpeed.default),
    t || (t = $ ? v.restDelta.granular : v.restDelta.default));
  let W;
  if (H < 1) {
    let I = Ic(U, H);
    W = X => {
      let E = Math.exp(-H * U * X);
      return (
        c - E * (((Y + H * U * F) / I) * Math.sin(I * X) + F * Math.cos(I * X))
      );
    };
  } else if (H === 1) W = I => c - Math.exp(-U * I) * (F + (Y + U * F) * I);
  else {
    let I = U * Math.sqrt(H * H - 1);
    W = X => {
      let E = Math.exp(-H * U * X),
        O = Math.min(I * X, 300);
      return (
        c - (E * ((Y + H * U * F) * Math.sinh(O) + I * F * Math.cosh(O))) / I
      );
    };
  }
  let J = {
    calculatedDuration: Z ? N || null : null,
    next: I => {
      let X = W(I);
      if (!Z) {
        let E = 0;
        if (H < 1) E = I === 0 ? uu(Y) : Hc(W, I, X);
        let O = Math.abs(E) <= l,
          G = Math.abs(c - X) <= t;
        h.done = O && G;
      } else h.done = I >= N;
      return ((h.value = h.done ? c : X), h);
    },
    toString: () => {
      let I = Math.min(cl(J), ir),
        X = P1(E => J.next(I * E).value, I, 30);
      return I + 'ms ' + X;
    },
  };
  return J;
}
function Tw({
  keyframes: u,
  velocity: n = 0,
  power: f = 0.8,
  timeConstant: l = 325,
  bounceDamping: t = 10,
  bounceStiffness: r = 500,
  modifyTarget: c,
  min: h,
  max: w,
  restDelta: z = 0.5,
  restSpeed: _,
}) {
  let N = u[0],
    Q = { done: !1, value: N },
    Z = O => (h !== void 0 && O < h) || (w !== void 0 && O > w),
    Y = O => {
      if (h === void 0) return w;
      if (w === void 0) return h;
      return Math.abs(h - O) < Math.abs(w - O) ? h : w;
    },
    H = f * n,
    F = N + H,
    U = c === void 0 ? F : c(F);
  if (U !== F) H = U - N;
  let $ = O => -H * Math.exp(-O / l),
    W = O => U + $(O),
    J = O => {
      let G = $(O),
        M = W(O);
      ((Q.done = Math.abs(G) <= z), (Q.value = Q.done ? U : M));
    },
    I,
    X,
    E = O => {
      if (!Z(Q.value)) return;
      ((I = O),
        (X = Xc({
          keyframes: [Q.value, Y(Q.value)],
          velocity: Hc(W, O, Q.value),
          damping: t,
          stiffness: r,
          restDelta: z,
          restSpeed: _,
        })));
    };
  return (
    E(0),
    {
      calculatedDuration: null,
      next: O => {
        let G = !1;
        if (!X && I === void 0) ((G = !0), J(O), E(O));
        if (I !== void 0 && O >= I) return X.next(O - I);
        else return (!G && J(O), Q);
      },
    }
  );
}
var U7 = O0(0.42, 0, 1, 1),
  W7 = O0(0, 0, 0.58, 1),
  Lc = O0(0.42, 0, 0.58, 1);
var Z7 = u => {
  return Array.isArray(u) && typeof u[0] !== 'number';
};
var J7 = {
    linear: T,
    easeIn: U7,
    easeInOut: Lc,
    easeOut: W7,
    circIn: wc,
    circInOut: _c,
    circOut: zc,
    backIn: R1,
    backInOut: cc,
    backOut: qw,
    anticipate: hc,
  },
  dw = u => {
    if (hl(u)) {
      vu(
        u.length === 4,
        'Cubic bezier arrays must contain four numerical values.'
      );
      let [n, f, l, t] = u;
      return O0(n, f, l, t);
    } else if (typeof u === 'string')
      return (vu(J7[u] !== void 0, `Invalid easing type '${u}'`), J7[u]);
    return u;
  };
function IW(u, n, f) {
  let l = [],
    t = f || Yc,
    r = u.length - 1;
  for (let c = 0; c < r; c++) {
    let h = t(u[c], u[c + 1]);
    if (n) {
      let w = Array.isArray(n) ? n[c] || T : n;
      h = Sn(w, h);
    }
    l.push(h);
  }
  return l;
}
function Y7(u, n, { clamp: f = !0, ease: l, mixer: t } = {}) {
  let r = u.length;
  if (
    (vu(r === n.length, 'Both input and output ranges must be the same length'),
    r === 1)
  )
    return () => n[0];
  if (r === 2 && n[0] === n[1]) return () => n[1];
  let c = u[0] === u[1];
  if (u[0] > u[r - 1]) ((u = [...u].reverse()), (n = [...n].reverse()));
  let h = IW(n, l, t),
    w = h.length,
    z = _ => {
      if (c && _ < u[0]) return n[0];
      let N = 0;
      if (w > 1) {
        for (; N < u.length - 2; N++) if (_ < u[N + 1]) break;
      }
      let Q = yu(u[N], u[N + 1], _);
      return h[N](Q);
    };
  return f ? _ => z(Wu(u[0], u[r - 1], _)) : z;
}
function H7(u, n) {
  let f = u[u.length - 1];
  for (let l = 1; l <= n; l++) {
    let t = yu(0, n, l);
    u.push(P(f, 1, t));
  }
}
function I7(u) {
  let n = [0];
  return (H7(n, u.length - 1), n);
}
function X7(u, n) {
  return u.map(f => f * n);
}
function XW(u, n) {
  return u.map(() => n || Lc).splice(0, u.length - 1);
}
function j1({
  duration: u = 300,
  keyframes: n,
  times: f,
  ease: l = 'easeInOut',
}) {
  let t = Z7(l) ? l.map(dw) : dw(l),
    r = { done: !1, value: n[0] },
    c = X7(f && f.length === n.length ? f : I7(n), u),
    h = Y7(c, n, { ease: Array.isArray(t) ? t : XW(n, t) });
  return {
    calculatedDuration: u,
    next: w => {
      return ((r.value = h(w)), (r.done = w >= u), r);
    },
  };
}
var L7 = u => {
  let n = ({ timestamp: f }) => u(f);
  return {
    start: () => D.update(n, !0),
    stop: () => pu(n),
    now: () => (nu.isProcessing ? nu.timestamp : Fu.now()),
  };
};
var LW = { decay: Tw, inertia: Tw, tween: j1, keyframes: j1, spring: Xc },
  OW = u => u / 100;
class Jl extends d1 {
  constructor(u) {
    super(u);
    ((this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = 'running'),
      (this.startTime = null),
      (this.state = 'idle'),
      (this.stop = () => {
        if (
          (this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')
        )
          return;
        this.teardown();
        let { onStop: h } = this.options;
        h && h();
      }));
    let { name: n, motionValue: f, element: l, keyframes: t } = this.options,
      r = (l === null || l === void 0 ? void 0 : l.KeyframeResolver) || nf,
      c = (h, w) => this.onKeyframesResolved(h, w);
    ((this.resolver = new r(t, c, n, f, l)), this.resolver.scheduleResolve());
  }
  flatten() {
    if ((super.flatten(), this._resolved))
      Object.assign(
        this._resolved,
        this.initPlayback(this._resolved.keyframes)
      );
  }
  initPlayback(u) {
    let {
        type: n = 'keyframes',
        repeat: f = 0,
        repeatDelay: l = 0,
        repeatType: t,
        velocity: r = 0,
      } = this.options,
      c = X0(n) ? n : LW[n] || j1,
      h,
      w;
    if (c !== j1 && typeof u[0] !== 'number')
      ((h = Sn(OW, Yc(u[0], u[1]))), (u = [0, 100]));
    let z = c({ ...this.options, keyframes: u });
    if (t === 'mirror')
      w = c({ ...this.options, keyframes: [...u].reverse(), velocity: -r });
    if (z.calculatedDuration === null) z.calculatedDuration = cl(z);
    let { calculatedDuration: _ } = z,
      N = _ + l,
      Q = N * (f + 1) - l;
    return {
      generator: z,
      mirroredGenerator: w,
      mapPercentToKeyframes: h,
      calculatedDuration: _,
      resolvedDuration: N,
      totalDuration: Q,
    };
  }
  onPostResolved() {
    let { autoplay: u = !0 } = this.options;
    if ((this.play(), this.pendingPlayState === 'paused' || !u)) this.pause();
    else this.state = this.pendingPlayState;
  }
  tick(u, n = !1) {
    let { resolved: f } = this;
    if (!f) {
      let { keyframes: E } = this.options;
      return { done: !0, value: E[E.length - 1] };
    }
    let {
      finalKeyframe: l,
      generator: t,
      mirroredGenerator: r,
      mapPercentToKeyframes: c,
      keyframes: h,
      calculatedDuration: w,
      totalDuration: z,
      resolvedDuration: _,
    } = f;
    if (this.startTime === null) return t.next(0);
    let {
      delay: N,
      repeat: Q,
      repeatType: Z,
      repeatDelay: Y,
      onUpdate: H,
    } = this.options;
    if (this.speed > 0) this.startTime = Math.min(this.startTime, u);
    else if (this.speed < 0)
      this.startTime = Math.min(u - z / this.speed, this.startTime);
    if (n) this.currentTime = u;
    else if (this.holdTime !== null) this.currentTime = this.holdTime;
    else this.currentTime = Math.round(u - this.startTime) * this.speed;
    let F = this.currentTime - N * (this.speed >= 0 ? 1 : -1),
      U = this.speed >= 0 ? F < 0 : F > z;
    if (
      ((this.currentTime = Math.max(F, 0)),
      this.state === 'finished' && this.holdTime === null)
    )
      this.currentTime = z;
    let $ = this.currentTime,
      W = t;
    if (Q) {
      let E = Math.min(this.currentTime, z) / _,
        O = Math.floor(E),
        G = E % 1;
      if (!G && E >= 1) G = 1;
      if ((G === 1 && O--, (O = Math.min(O, Q + 1)), Boolean(O % 2))) {
        if (Z === 'reverse') {
          if (((G = 1 - G), Y)) G -= Y / _;
        } else if (Z === 'mirror') W = r;
      }
      $ = Wu(0, 1, G) * _;
    }
    let J = U ? { done: !1, value: h[0] } : W.next($);
    if (c) J.value = c(J.value);
    let { done: I } = J;
    if (!U && w !== null)
      I = this.speed >= 0 ? this.currentTime >= z : this.currentTime <= 0;
    let X =
      this.holdTime === null &&
      (this.state === 'finished' || (this.state === 'running' && I));
    if (X && l !== void 0) J.value = q0(h, this.options, l);
    if (H) H(J.value);
    if (X) this.finish();
    return J;
  }
  get duration() {
    let { resolved: u } = this;
    return u ? Uu(u.calculatedDuration) : 0;
  }
  get time() {
    return Uu(this.currentTime);
  }
  set time(u) {
    if (
      ((u = uu(u)),
      (this.currentTime = u),
      this.holdTime !== null || this.speed === 0)
    )
      this.holdTime = u;
    else if (this.driver) this.startTime = this.driver.now() - u / this.speed;
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(u) {
    let n = this.playbackSpeed !== u;
    if (((this.playbackSpeed = u), n)) this.time = Uu(this.currentTime);
  }
  play() {
    if (!this.resolver.isScheduled) this.resolver.resume();
    if (!this._resolved) {
      this.pendingPlayState = 'running';
      return;
    }
    if (this.isStopped) return;
    let { driver: u = L7, onPlay: n, startTime: f } = this.options;
    if (!this.driver) this.driver = u(t => this.tick(t));
    n && n();
    let l = this.driver.now();
    if (this.holdTime !== null) this.startTime = l - this.holdTime;
    else if (!this.startTime)
      this.startTime = f !== null && f !== void 0 ? f : this.calcStartTime();
    else if (this.state === 'finished') this.startTime = l;
    if (this.state === 'finished') this.updateFinishedPromise();
    ((this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start());
  }
  pause() {
    var u;
    if (!this._resolved) {
      this.pendingPlayState = 'paused';
      return;
    }
    ((this.state = 'paused'),
      (this.holdTime =
        (u = this.currentTime) !== null && u !== void 0 ? u : 0));
  }
  complete() {
    if (this.state !== 'running') this.play();
    ((this.pendingPlayState = this.state = 'finished'), (this.holdTime = null));
  }
  finish() {
    (this.teardown(), (this.state = 'finished'));
    let { onComplete: u } = this.options;
    u && u();
  }
  cancel() {
    if (this.cancelTime !== null) this.tick(this.cancelTime);
    (this.teardown(), this.updateFinishedPromise());
  }
  teardown() {
    ((this.state = 'idle'),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel());
  }
  stopDriver() {
    if (!this.driver) return;
    (this.driver.stop(), (this.driver = void 0));
  }
  sample(u) {
    return ((this.startTime = 0), this.tick(u, !0));
  }
}
var O7 = new Set(['opacity', 'clipPath', 'filter', 'transform']);
function F7(
  u,
  n,
  f,
  {
    delay: l = 0,
    duration: t = 300,
    repeat: r = 0,
    repeatType: c = 'loop',
    ease: h = 'easeInOut',
    times: w,
  } = {}
) {
  let z = { [n]: f };
  if (w) z.offset = w;
  let _ = zl(h, t);
  if (Array.isArray(_)) z.easing = _;
  return u.animate(z, {
    delay: l,
    duration: t,
    easing: !Array.isArray(_) ? _ : 'linear',
    fill: 'both',
    iterations: r + 1,
    direction: c === 'reverse' ? 'alternate' : 'normal',
  });
}
var E7 = p0(() => Object.hasOwnProperty.call(Element.prototype, 'animate'));
var Oc = 10,
  FW = 20000;
function EW(u) {
  return X0(u.type) || u.type === 'spring' || !mr(u.ease);
}
function qW(u, n) {
  let f = new Jl({ ...n, keyframes: u, repeat: 0, delay: 0, isGenerator: !0 }),
    l = { done: !1, value: u[0] },
    t = [],
    r = 0;
  while (!l.done && r < FW) ((l = f.sample(r)), t.push(l.value), (r += Oc));
  return { times: void 0, keyframes: t, duration: r - Oc, ease: 'linear' };
}
var q7 = { anticipate: hc, backInOut: cc, circInOut: _c };
function MW(u) {
  return u in q7;
}
class Fc extends d1 {
  constructor(u) {
    super(u);
    let { name: n, motionValue: f, element: l, keyframes: t } = this.options;
    ((this.resolver = new T1(
      t,
      (r, c) => this.onKeyframesResolved(r, c),
      n,
      f,
      l
    )),
      this.resolver.scheduleResolve());
  }
  initPlayback(u, n) {
    let {
      duration: f = 300,
      times: l,
      ease: t,
      type: r,
      motionValue: c,
      name: h,
      startTime: w,
    } = this.options;
    if (!c.owner || !c.owner.current) return !1;
    if (typeof t === 'string' && L0() && MW(t)) t = q7[t];
    if (EW(this.options)) {
      let {
          onComplete: _,
          onUpdate: N,
          motionValue: Q,
          element: Z,
          ...Y
        } = this.options,
        H = qW(u, Y);
      if (((u = H.keyframes), u.length === 1)) u[1] = u[0];
      ((f = H.duration), (l = H.times), (t = H.ease), (r = 'keyframes'));
    }
    let z = F7(c.owner.current, h, u, {
      ...this.options,
      duration: f,
      times: l,
      ease: t,
    });
    if (
      ((z.startTime = w !== null && w !== void 0 ? w : this.calcStartTime()),
      this.pendingTimeline)
    )
      (K1(z, this.pendingTimeline), (this.pendingTimeline = void 0));
    else
      z.onfinish = () => {
        let { onComplete: _ } = this.options;
        (c.set(q0(u, this.options, n)),
          _ && _(),
          this.cancel(),
          this.resolveFinishedPromise());
      };
    return {
      animation: z,
      duration: f,
      times: l,
      type: r,
      ease: t,
      keyframes: u,
    };
  }
  get duration() {
    let { resolved: u } = this;
    if (!u) return 0;
    let { duration: n } = u;
    return Uu(n);
  }
  get time() {
    let { resolved: u } = this;
    if (!u) return 0;
    let { animation: n } = u;
    return Uu(n.currentTime || 0);
  }
  set time(u) {
    let { resolved: n } = this;
    if (!n) return;
    let { animation: f } = n;
    f.currentTime = uu(u);
  }
  get speed() {
    let { resolved: u } = this;
    if (!u) return 1;
    let { animation: n } = u;
    return n.playbackRate;
  }
  set speed(u) {
    let { resolved: n } = this;
    if (!n) return;
    let { animation: f } = n;
    f.playbackRate = u;
  }
  get state() {
    let { resolved: u } = this;
    if (!u) return 'idle';
    let { animation: n } = u;
    return n.playState;
  }
  get startTime() {
    let { resolved: u } = this;
    if (!u) return null;
    let { animation: n } = u;
    return n.startTime;
  }
  attachTimeline(u) {
    if (!this._resolved) this.pendingTimeline = u;
    else {
      let { resolved: n } = this;
      if (!n) return T;
      let { animation: f } = n;
      K1(f, u);
    }
    return T;
  }
  play() {
    if (this.isStopped) return;
    let { resolved: u } = this;
    if (!u) return;
    let { animation: n } = u;
    if (n.playState === 'finished') this.updateFinishedPromise();
    n.play();
  }
  pause() {
    let { resolved: u } = this;
    if (!u) return;
    let { animation: n } = u;
    n.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle'))
      return;
    (this.resolveFinishedPromise(), this.updateFinishedPromise());
    let { resolved: u } = this;
    if (!u) return;
    let {
      animation: n,
      keyframes: f,
      duration: l,
      type: t,
      ease: r,
      times: c,
    } = u;
    if (n.playState === 'idle' || n.playState === 'finished') return;
    if (this.time) {
      let {
          motionValue: w,
          onUpdate: z,
          onComplete: _,
          element: N,
          ...Q
        } = this.options,
        Z = new Jl({
          ...Q,
          keyframes: f,
          duration: l,
          type: t,
          ease: r,
          times: c,
          isGenerator: !0,
        }),
        Y = uu(this.time);
      w.setWithVelocity(Z.sample(Y - Oc).value, Z.sample(Y).value, Oc);
    }
    let { onStop: h } = this.options;
    (h && h(), this.cancel());
  }
  complete() {
    let { resolved: u } = this;
    if (!u) return;
    u.animation.finish();
  }
  cancel() {
    let { resolved: u } = this;
    if (!u) return;
    u.animation.cancel();
  }
  static supports(u) {
    let {
      motionValue: n,
      name: f,
      repeatDelay: l,
      repeatType: t,
      damping: r,
      type: c,
    } = u;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement)) return !1;
    let { onUpdate: h, transformTemplate: w } = n.owner.getProps();
    return (
      E7() &&
      f &&
      O7.has(f) &&
      !h &&
      !w &&
      !l &&
      t !== 'mirror' &&
      r !== 0 &&
      c !== 'inertia'
    );
  }
}
var SW = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  BW = u => ({
    type: 'spring',
    stiffness: 550,
    damping: u === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  GW = { type: 'keyframes', duration: 0.8 },
  CW = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  M7 = (u, { keyframes: n }) => {
    if (n.length > 2) return GW;
    else if (Tu.has(u)) return u.startsWith('scale') ? BW(n[1]) : SW;
    return CW;
  };
function S7({
  when: u,
  delay: n,
  delayChildren: f,
  staggerChildren: l,
  staggerDirection: t,
  repeat: r,
  repeatType: c,
  repeatDelay: h,
  from: w,
  elapsed: z,
  ..._
}) {
  return !!Object.keys(_).length;
}
var Yl =
  (u, n, f, l = {}, t, r) =>
  c => {
    let h = I0(l, u) || {},
      w = h.delay || l.delay || 0,
      { elapsed: z = 0 } = l;
    z = z - uu(w);
    let _ = {
      keyframes: Array.isArray(f) ? f : [null, f],
      ease: 'easeOut',
      velocity: n.getVelocity(),
      ...h,
      delay: -z,
      onUpdate: Q => {
        (n.set(Q), h.onUpdate && h.onUpdate(Q));
      },
      onComplete: () => {
        (c(), h.onComplete && h.onComplete());
      },
      name: u,
      motionValue: n,
      element: r ? void 0 : t,
    };
    if (!S7(h)) _ = { ..._, ...M7(u, _) };
    if (_.duration) _.duration = uu(_.duration);
    if (_.repeatDelay) _.repeatDelay = uu(_.repeatDelay);
    if (_.from !== void 0) _.keyframes[0] = _.from;
    let N = !1;
    if (_.type === !1 || (_.duration === 0 && !_.repeatDelay)) {
      if (((_.duration = 0), _.delay === 0)) N = !0;
    }
    if (lc.current || xf.skipAnimations)
      ((N = !0), (_.duration = 0), (_.delay = 0));
    if (N && !r && n.get() !== void 0) {
      let Q = q0(_.keyframes, h);
      if (Q !== void 0)
        return (
          D.update(() => {
            (_.onUpdate(Q), _.onComplete());
          }),
          new pr([])
        );
    }
    if (!r && Fc.supports(_)) return new Fc(_);
    else return new Jl(_);
  };
function DW({ protectedKeys: u, needsAnimating: n }, f) {
  let l = u.hasOwnProperty(f) && n[f] !== !0;
  return ((n[f] = !1), l);
}
function Ec(u, n, { delay: f = 0, transitionOverride: l, type: t } = {}) {
  var r;
  let { transition: c = u.getDefaultTransition(), transitionEnd: h, ...w } = n;
  if (l) c = l;
  let z = [],
    _ = t && u.animationState && u.animationState.getState()[t];
  for (let N in w) {
    let Q = u.getValue(
        N,
        (r = u.latestValues[N]) !== null && r !== void 0 ? r : null
      ),
      Z = w[N];
    if (Z === void 0 || (_ && DW(_, N))) continue;
    let Y = { delay: f, ...I0(c || {}, N) },
      H = !1;
    if (window.MotionHandoffAnimation) {
      let U = fc(u);
      if (U) {
        let $ = window.MotionHandoffAnimation(U, N, D);
        if ($ !== null) ((Y.startTime = $), (H = !0));
      }
    }
    (A1(u, N),
      Q.start(
        Yl(N, Q, Z, u.shouldReduceMotion && ar.has(N) ? { type: !1 } : Y, u, H)
      ));
    let F = Q.animation;
    if (F) z.push(F);
  }
  if (h)
    Promise.all(z).then(() => {
      D.update(() => {
        h && jz(u, h);
      });
    });
  return z;
}
function qc(u, n, f = {}) {
  var l;
  let t = H0(
      u,
      n,
      f.type === 'exit'
        ? (l = u.presenceContext) === null || l === void 0
          ? void 0
          : l.custom
        : void 0
    ),
    { transition: r = u.getDefaultTransition() || {} } = t || {};
  if (f.transitionOverride) r = f.transitionOverride;
  let c = t ? () => Promise.all(Ec(u, t, f)) : () => Promise.resolve(),
    h =
      u.variantChildren && u.variantChildren.size
        ? (z = 0) => {
            let {
              delayChildren: _ = 0,
              staggerChildren: N,
              staggerDirection: Q,
            } = r;
            return KW(u, n, _ + z, N, Q, f);
          }
        : () => Promise.resolve(),
    { when: w } = r;
  if (w) {
    let [z, _] = w === 'beforeChildren' ? [c, h] : [h, c];
    return z().then(() => _());
  } else return Promise.all([c(), h(f.delay)]);
}
function KW(u, n, f = 0, l = 0, t = 1, r) {
  let c = [],
    h = (u.variantChildren.size - 1) * l,
    w = t === 1 ? (z = 0) => z * l : (z = 0) => h - z * l;
  return (
    Array.from(u.variantChildren)
      .sort(PW)
      .forEach((z, _) => {
        (z.notify('AnimationStart', n),
          c.push(
            qc(z, n, { ...r, delay: f + w(_) }).then(() =>
              z.notify('AnimationComplete', n)
            )
          ));
      }),
    Promise.all(c)
  );
}
function PW(u, n) {
  return u.sortNodePosition(n);
}
function B7(u, n, f = {}) {
  u.notify('AnimationStart', n);
  let l;
  if (Array.isArray(n)) {
    let t = n.map(r => qc(u, r, f));
    l = Promise.all(t);
  } else if (typeof n === 'string') l = qc(u, n, f);
  else {
    let t = typeof n === 'function' ? H0(u, n, f.custom) : n;
    l = Promise.all(Ec(u, t, f));
  }
  return l.then(() => {
    u.notify('AnimationComplete', n);
  });
}
var AW = B1.length;
function jw(u) {
  if (!u) return;
  if (!u.isControllingVariants) {
    let f = u.parent ? jw(u.parent) || {} : {};
    if (u.props.initial !== void 0) f.initial = u.props.initial;
    return f;
  }
  let n = {};
  for (let f = 0; f < AW; f++) {
    let l = B1[f],
      t = u.props[l];
    if (dn(t) || t === !1) n[l] = t;
  }
  return n;
}
var RW = [...Dr].reverse(),
  kW = Dr.length;
function gW(u) {
  return n => Promise.all(n.map(({ animation: f, options: l }) => B7(u, f, l)));
}
function C7(u) {
  let n = gW(u),
    f = G7(),
    l = !0,
    t = w => (z, _) => {
      var N;
      let Q = H0(
        u,
        _,
        w === 'exit'
          ? (N = u.presenceContext) === null || N === void 0
            ? void 0
            : N.custom
          : void 0
      );
      if (Q) {
        let { transition: Z, transitionEnd: Y, ...H } = Q;
        z = { ...z, ...H, ...Y };
      }
      return z;
    };
  function r(w) {
    n = w(u);
  }
  function c(w) {
    let { props: z } = u,
      _ = jw(u.parent) || {},
      N = [],
      Q = new Set(),
      Z = {},
      Y = 1 / 0;
    for (let F = 0; F < kW; F++) {
      let U = RW[F],
        $ = f[U],
        W = z[U] !== void 0 ? z[U] : _[U],
        J = dn(W),
        I = U === w ? $.isActive : null;
      if (I === !1) Y = F;
      let X = W === _[U] && W !== z[U] && J;
      if (X && l && u.manuallyAnimateOnMount) X = !1;
      if (
        (($.protectedKeys = { ...Z }),
        (!$.isActive && I === null) ||
          (!W && !$.prevProp) ||
          Y0(W) ||
          typeof W === 'boolean')
      )
        continue;
      let E = TW($.prevProp, W),
        O = E || (U === w && $.isActive && !X && J) || (F > Y && J),
        G = !1,
        M = Array.isArray(W) ? W : [W],
        K = M.reduce(t(U), {});
      if (I === !1) K = {};
      let { prevResolvedValues: cf = {} } = $,
        kc = { ...cf, ...K },
        i1 = _u => {
          if (((O = !0), Q.has(_u))) ((G = !0), Q.delete(_u));
          $.needsAnimating[_u] = !0;
          let rn = u.getValue(_u);
          if (rn) rn.liveStyle = !1;
        };
      for (let _u in kc) {
        let rn = K[_u],
          hf = cf[_u];
        if (Z.hasOwnProperty(_u)) continue;
        let wf = !1;
        if (G1(rn) && G1(hf)) wf = !Yw(rn, hf);
        else wf = rn !== hf;
        if (wf)
          if (rn !== void 0 && rn !== null) i1(_u);
          else Q.add(_u);
        else if (rn !== void 0 && Q.has(_u)) i1(_u);
        else $.protectedKeys[_u] = !0;
      }
      if ((($.prevProp = W), ($.prevResolvedValues = K), $.isActive))
        Z = { ...Z, ...K };
      if (l && u.blockInitialAnimation) O = !1;
      if (O && (!(X && E) || G))
        N.push(...M.map(_u => ({ animation: _u, options: { type: U } })));
    }
    if (Q.size) {
      let F = {};
      (Q.forEach(U => {
        let $ = u.getBaseTarget(U),
          W = u.getValue(U);
        if (W) W.liveStyle = !0;
        F[U] = $ !== null && $ !== void 0 ? $ : null;
      }),
        N.push({ animation: F }));
    }
    let H = Boolean(N.length);
    if (
      l &&
      (z.initial === !1 || z.initial === z.animate) &&
      !u.manuallyAnimateOnMount
    )
      H = !1;
    return ((l = !1), H ? n(N) : Promise.resolve());
  }
  function h(w, z) {
    var _;
    if (f[w].isActive === z) return Promise.resolve();
    ((_ = u.variantChildren) === null ||
      _ === void 0 ||
      _.forEach(Q => {
        var Z;
        return (Z = Q.animationState) === null || Z === void 0
          ? void 0
          : Z.setActive(w, z);
      }),
      (f[w].isActive = z));
    let N = c(w);
    for (let Q in f) f[Q].protectedKeys = {};
    return N;
  }
  return {
    animateChanges: c,
    setActive: h,
    setAnimateFunction: r,
    getState: () => f,
    reset: () => {
      ((f = G7()), (l = !0));
    },
  };
}
function TW(u, n) {
  if (typeof n === 'string') return n !== u;
  else if (Array.isArray(n)) return !Yw(n, u);
  return !1;
}
function ff(u = !1) {
  return {
    isActive: u,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function G7() {
  return {
    animate: ff(!0),
    whileInView: ff(),
    whileHover: ff(),
    whileTap: ff(),
    whileDrag: ff(),
    whileFocus: ff(),
    exit: ff(),
  };
}
class Zu {
  constructor(u) {
    ((this.isMounted = !1), (this.node = u));
  }
  update() {}
}
class ow extends Zu {
  constructor(u) {
    super(u);
    u.animationState || (u.animationState = C7(u));
  }
  updateAnimationControlsSubscription() {
    let { animate: u } = this.node.getProps();
    if (Y0(u)) this.unmountControls = u.subscribe(this.node);
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    let { animate: u } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    if (u !== n) this.updateAnimationControlsSubscription();
  }
  unmount() {
    var u;
    (this.node.animationState.reset(),
      (u = this.unmountControls) === null || u === void 0 || u.call(this));
  }
}
var dW = 0;
class xw extends Zu {
  constructor() {
    super(...arguments);
    this.id = dW++;
  }
  update() {
    if (!this.node.presenceContext) return;
    let { isPresent: u, onExitComplete: n } = this.node.presenceContext,
      { isPresent: f } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || u === f) return;
    let l = this.node.animationState.setActive('exit', !u);
    if (n && !u) l.then(() => n(this.id));
  }
  mount() {
    let { register: u } = this.node.presenceContext || {};
    if (u) this.unmount = u(this.id);
  }
  unmount() {}
}
var D7 = { animation: { Feature: ow }, exit: { Feature: xw } };
function Vn(u, n, f, l = { passive: !0 }) {
  return (u.addEventListener(n, f, l), () => u.removeEventListener(n, f));
}
function vn(u) {
  return { point: { x: u.pageX, y: u.pageY } };
}
var K7 = u => {
  return n => b0(n) && u(n, vn(n));
};
function M0(u, n, f, l) {
  return Vn(u, n, K7(f), l);
}
var P7 = (u, n) => Math.abs(u - n);
function A7(u, n) {
  let f = P7(u.x, n.x),
    l = P7(u.y, n.y);
  return Math.sqrt(f ** 2 + l ** 2);
}
class o1 {
  constructor(
    u,
    n,
    { transformPagePoint: f, contextWindow: l, dragSnapToOrigin: t = !1 } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        let _ = vw(this.lastMoveEventInfo, this.history),
          N = this.startEvent !== null,
          Q = A7(_.offset, { x: 0, y: 0 }) >= 3;
        if (!N && !Q) return;
        let { point: Z } = _,
          { timestamp: Y } = nu;
        this.history.push({ ...Z, timestamp: Y });
        let { onStart: H, onMove: F } = this.handlers;
        if (!N)
          (H && H(this.lastMoveEvent, _),
            (this.startEvent = this.lastMoveEvent));
        F && F(this.lastMoveEvent, _);
      }),
      (this.handlePointerMove = (_, N) => {
        ((this.lastMoveEvent = _),
          (this.lastMoveEventInfo = Vw(N, this.transformPagePoint)),
          D.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (_, N) => {
        this.end();
        let { onEnd: Q, onSessionEnd: Z, resumeAnimation: Y } = this.handlers;
        if (this.dragSnapToOrigin) Y && Y();
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        let H = vw(
          _.type === 'pointercancel'
            ? this.lastMoveEventInfo
            : Vw(N, this.transformPagePoint),
          this.history
        );
        if (this.startEvent && Q) Q(_, H);
        Z && Z(_, H);
      }),
      !b0(u))
    )
      return;
    ((this.dragSnapToOrigin = t),
      (this.handlers = n),
      (this.transformPagePoint = f),
      (this.contextWindow = l || window));
    let r = vn(u),
      c = Vw(r, this.transformPagePoint),
      { point: h } = c,
      { timestamp: w } = nu;
    this.history = [{ ...h, timestamp: w }];
    let { onSessionStart: z } = n;
    (z && z(u, vw(c, this.history)),
      (this.removeListeners = Sn(
        M0(this.contextWindow, 'pointermove', this.handlePointerMove),
        M0(this.contextWindow, 'pointerup', this.handlePointerUp),
        M0(this.contextWindow, 'pointercancel', this.handlePointerUp)
      )));
  }
  updateHandlers(u) {
    this.handlers = u;
  }
  end() {
    (this.removeListeners && this.removeListeners(), pu(this.updatePoint));
  }
}
function Vw(u, n) {
  return n ? { point: n(u.point) } : u;
}
function R7(u, n) {
  return { x: u.x - n.x, y: u.y - n.y };
}
function vw({ point: u }, n) {
  return {
    point: u,
    delta: R7(u, k7(n)),
    offset: R7(u, jW(n)),
    velocity: oW(n, 0.1),
  };
}
function jW(u) {
  return u[0];
}
function k7(u) {
  return u[u.length - 1];
}
function oW(u, n) {
  if (u.length < 2) return { x: 0, y: 0 };
  let f = u.length - 1,
    l = null,
    t = k7(u);
  while (f >= 0) {
    if (((l = u[f]), t.timestamp - l.timestamp > uu(n))) break;
    f--;
  }
  if (!l) return { x: 0, y: 0 };
  let r = Uu(t.timestamp - l.timestamp);
  if (r === 0) return { x: 0, y: 0 };
  let c = { x: (t.x - l.x) / r, y: (t.y - l.y) / r };
  if (c.x === 1 / 0) c.x = 0;
  if (c.y === 1 / 0) c.y = 0;
  return c;
}
var j7 = 0.0001,
  xW = 1 - j7,
  VW = 1 + j7,
  o7 = 0.01,
  vW = 0 - o7,
  yW = 0 + o7;
function Ju(u) {
  return u.max - u.min;
}
function x7(u, n, f) {
  return Math.abs(u - n) <= f;
}
function g7(u, n, f, l = 0.5) {
  if (
    ((u.origin = l),
    (u.originPoint = P(n.min, n.max, u.origin)),
    (u.scale = Ju(f) / Ju(n)),
    (u.translate = P(f.min, f.max, u.origin) - u.originPoint),
    (u.scale >= xW && u.scale <= VW) || isNaN(u.scale))
  )
    u.scale = 1;
  if ((u.translate >= vW && u.translate <= yW) || isNaN(u.translate))
    u.translate = 0;
}
function Hl(u, n, f, l) {
  (g7(u.x, n.x, f.x, l ? l.originX : void 0),
    g7(u.y, n.y, f.y, l ? l.originY : void 0));
}
function T7(u, n, f) {
  ((u.min = f.min + n.min), (u.max = u.min + Ju(n)));
}
function V7(u, n, f) {
  (T7(u.x, n.x, f.x), T7(u.y, n.y, f.y));
}
function d7(u, n, f) {
  ((u.min = n.min - f.min), (u.max = u.min + Ju(n)));
}
function Il(u, n, f) {
  (d7(u.x, n.x, f.x), d7(u.y, n.y, f.y));
}
function b7(u, { min: n, max: f }, l) {
  if (n !== void 0 && u < n) u = l ? P(n, u, l.min) : Math.max(u, n);
  else if (f !== void 0 && u > f) u = l ? P(f, u, l.max) : Math.min(u, f);
  return u;
}
function v7(u, n, f) {
  return {
    min: n !== void 0 ? u.min + n : void 0,
    max: f !== void 0 ? u.max + f - (u.max - u.min) : void 0,
  };
}
function m7(u, { top: n, left: f, bottom: l, right: t }) {
  return { x: v7(u.x, f, t), y: v7(u.y, n, l) };
}
function y7(u, n) {
  let f = n.min - u.min,
    l = n.max - u.max;
  if (n.max - n.min < u.max - u.min) [f, l] = [l, f];
  return { min: f, max: l };
}
function e7(u, n) {
  return { x: y7(u.x, n.x), y: y7(u.y, n.y) };
}
function s7(u, n) {
  let f = 0.5,
    l = Ju(u),
    t = Ju(n);
  if (t > l) f = yu(n.min, n.max - l, u.min);
  else if (l > t) f = yu(u.min, u.max - t, n.min);
  return Wu(0, 1, f);
}
function a7(u, n) {
  let f = {};
  if (n.min !== void 0) f.min = n.min - u.min;
  if (n.max !== void 0) f.max = n.max - u.min;
  return f;
}
var Mc = 0.35;
function u9(u = Mc) {
  if (u === !1) u = 0;
  else if (u === !0) u = Mc;
  return { x: p7(u, 'left', 'right'), y: p7(u, 'top', 'bottom') };
}
function p7(u, n, f) {
  return { min: i7(u, n), max: i7(u, f) };
}
function i7(u, n) {
  return typeof u === 'number' ? u : u[n] || 0;
}
var n9 = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  lf = () => ({ x: n9(), y: n9() }),
  f9 = () => ({ min: 0, max: 0 }),
  y = () => ({ x: f9(), y: f9() });
function du(u) {
  return [u('x'), u('y')];
}
function Sc({ top: u, left: n, right: f, bottom: l }) {
  return { x: { min: n, max: f }, y: { min: u, max: l } };
}
function l9({ x: u, y: n }) {
  return { top: n.min, right: u.max, bottom: n.max, left: u.min };
}
function t9(u, n) {
  if (!n) return u;
  let f = n({ x: u.left, y: u.top }),
    l = n({ x: u.right, y: u.bottom });
  return { top: f.y, left: f.x, bottom: l.y, right: l.x };
}
function yw(u) {
  return u === void 0 || u === 1;
}
function Bc({ scale: u, scaleX: n, scaleY: f }) {
  return !yw(u) || !yw(n) || !yw(f);
}
function yn(u) {
  return (
    Bc(u) ||
    pw(u) ||
    u.z ||
    u.rotate ||
    u.rotateX ||
    u.rotateY ||
    u.skewX ||
    u.skewY
  );
}
function pw(u) {
  return r9(u.x) || r9(u.y);
}
function r9(u) {
  return u && u !== '0%';
}
function x1(u, n, f) {
  let l = u - f,
    t = n * l;
  return f + t;
}
function c9(u, n, f, l, t) {
  if (t !== void 0) u = x1(u, t, l);
  return x1(u, f, l) + n;
}
function iw(u, n = 0, f = 1, l, t) {
  ((u.min = c9(u.min, n, f, l, t)), (u.max = c9(u.max, n, f, l, t)));
}
function bw(u, { x: n, y: f }) {
  (iw(u.x, n.translate, n.scale, n.originPoint),
    iw(u.y, f.translate, f.scale, f.originPoint));
}
var h9 = 0.999999999999,
  w9 = 1.0000000000001;
function _9(u, n, f, l = !1) {
  let t = f.length;
  if (!t) return;
  n.x = n.y = 1;
  let r, c;
  for (let h = 0; h < t; h++) {
    ((r = f[h]), (c = r.projectionDelta));
    let { visualElement: w } = r.options;
    if (w && w.props.style && w.props.style.display === 'contents') continue;
    if (l && r.options.layoutScroll && r.scroll && r !== r.root)
      tf(u, { x: -r.scroll.offset.x, y: -r.scroll.offset.y });
    if (c) ((n.x *= c.x.scale), (n.y *= c.y.scale), bw(u, c));
    if (l && yn(r.latestValues)) tf(u, r.latestValues);
  }
  if (n.x < w9 && n.x > h9) n.x = 1;
  if (n.y < w9 && n.y > h9) n.y = 1;
}
function S0(u, n) {
  ((u.min = u.min + n), (u.max = u.max + n));
}
function z9(u, n, f, l, t = 0.5) {
  let r = P(u.min, u.max, t);
  iw(u, n, f, r, l);
}
function tf(u, n) {
  (z9(u.x, n.x, n.scaleX, n.scale, n.originX),
    z9(u.y, n.y, n.scaleY, n.scale, n.originY));
}
function mw(u, n) {
  return Sc(t9(u.getBoundingClientRect(), n));
}
function N9(u, n, f) {
  let l = mw(u, f),
    { scroll: t } = n;
  if (t) (S0(l.x, t.offset.x), S0(l.y, t.offset.y));
  return l;
}
var Gc = ({ current: u }) => {
  return u ? u.ownerDocument.defaultView : null;
};
var pW = new WeakMap();
class ew {
  constructor(u) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = y()),
      (this.visualElement = u));
  }
  start(u, { snapToCursor: n = !1 } = {}) {
    let { presenceContext: f } = this.visualElement;
    if (f && f.isPresent === !1) return;
    let l = z => {
        let { dragSnapToOrigin: _ } = this.getProps();
        if ((_ ? this.pauseAnimation() : this.stopAnimation(), n))
          this.snapToCursor(vn(z).point);
      },
      t = (z, _) => {
        let { drag: N, dragPropagation: Q, onDragStart: Z } = this.getProps();
        if (N && !Q) {
          if (this.openDragLock) this.openDragLock();
          if (((this.openDragLock = Ew(N)), !this.openDragLock)) return;
        }
        if (
          ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection)
        )
          ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0));
        if (
          (du(H => {
            let F = this.getAxisMotionValue(H).get() || 0;
            if (Cu.test(F)) {
              let { projection: U } = this.visualElement;
              if (U && U.layout) {
                let $ = U.layout.layoutBox[H];
                if ($) F = Ju($) * (parseFloat(F) / 100);
              }
            }
            this.originPoint[H] = F;
          }),
          Z)
        )
          D.postRender(() => Z(z, _));
        A1(this.visualElement, 'transform');
        let { animationState: Y } = this.visualElement;
        Y && Y.setActive('whileDrag', !0);
      },
      r = (z, _) => {
        let {
          dragPropagation: N,
          dragDirectionLock: Q,
          onDirectionLock: Z,
          onDrag: Y,
        } = this.getProps();
        if (!N && !this.openDragLock) return;
        let { offset: H } = _;
        if (Q && this.currentDirection === null) {
          if (((this.currentDirection = iW(H)), this.currentDirection !== null))
            Z && Z(this.currentDirection);
          return;
        }
        (this.updateAxis('x', _.point, H),
          this.updateAxis('y', _.point, H),
          this.visualElement.render(),
          Y && Y(z, _));
      },
      c = (z, _) => this.stop(z, _),
      h = () =>
        du(z => {
          var _;
          return (
            this.getAnimationState(z) === 'paused' &&
            ((_ = this.getAxisMotionValue(z).animation) === null || _ === void 0
              ? void 0
              : _.play())
          );
        }),
      { dragSnapToOrigin: w } = this.getProps();
    this.panSession = new o1(
      u,
      {
        onSessionStart: l,
        onStart: t,
        onMove: r,
        onSessionEnd: c,
        resumeAnimation: h,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: w,
        contextWindow: Gc(this.visualElement),
      }
    );
  }
  stop(u, n) {
    let f = this.isDragging;
    if ((this.cancel(), !f)) return;
    let { velocity: l } = n;
    this.startAnimation(l);
    let { onDragEnd: t } = this.getProps();
    if (t) D.postRender(() => t(u, n));
  }
  cancel() {
    this.isDragging = !1;
    let { projection: u, animationState: n } = this.visualElement;
    if (u) u.isAnimationBlocked = !1;
    (this.panSession && this.panSession.end(), (this.panSession = void 0));
    let { dragPropagation: f } = this.getProps();
    if (!f && this.openDragLock)
      (this.openDragLock(), (this.openDragLock = null));
    n && n.setActive('whileDrag', !1);
  }
  updateAxis(u, n, f) {
    let { drag: l } = this.getProps();
    if (!f || !Cc(u, l, this.currentDirection)) return;
    let t = this.getAxisMotionValue(u),
      r = this.originPoint[u] + f[u];
    if (this.constraints && this.constraints[u])
      r = b7(r, this.constraints[u], this.elastic[u]);
    t.set(r);
  }
  resolveConstraints() {
    var u;
    let { dragConstraints: n, dragElastic: f } = this.getProps(),
      l =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (u = this.visualElement.projection) === null || u === void 0
            ? void 0
            : u.layout,
      t = this.constraints;
    if (n && jn(n)) {
      if (!this.constraints) this.constraints = this.resolveRefConstraints();
    } else if (n && l) this.constraints = m7(l.layoutBox, n);
    else this.constraints = !1;
    if (
      ((this.elastic = u9(f)),
      t !== this.constraints &&
        l &&
        this.constraints &&
        !this.hasMutatedConstraints)
    )
      du(r => {
        if (this.constraints !== !1 && this.getAxisMotionValue(r))
          this.constraints[r] = a7(l.layoutBox[r], this.constraints[r]);
      });
  }
  resolveRefConstraints() {
    let { dragConstraints: u, onMeasureDragConstraints: n } = this.getProps();
    if (!u || !jn(u)) return !1;
    let f = u.current;
    vu(
      f !== null,
      "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
    );
    let { projection: l } = this.visualElement;
    if (!l || !l.layout) return !1;
    let t = N9(f, l.root, this.visualElement.getTransformPagePoint()),
      r = e7(l.layout.layoutBox, t);
    if (n) {
      let c = n(l9(r));
      if (((this.hasMutatedConstraints = !!c), c)) r = Sc(c);
    }
    return r;
  }
  startAnimation(u) {
    let {
        drag: n,
        dragMomentum: f,
        dragElastic: l,
        dragTransition: t,
        dragSnapToOrigin: r,
        onDragTransitionEnd: c,
      } = this.getProps(),
      h = this.constraints || {},
      w = du(z => {
        if (!Cc(z, n, this.currentDirection)) return;
        let _ = (h && h[z]) || {};
        if (r) _ = { min: 0, max: 0 };
        let N = l ? 200 : 1e6,
          Q = l ? 40 : 1e7,
          Z = {
            type: 'inertia',
            velocity: f ? u[z] : 0,
            bounceStiffness: N,
            bounceDamping: Q,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...t,
            ..._,
          };
        return this.startAxisValueAnimation(z, Z);
      });
    return Promise.all(w).then(c);
  }
  startAxisValueAnimation(u, n) {
    let f = this.getAxisMotionValue(u);
    return (
      A1(this.visualElement, u),
      f.start(Yl(u, f, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    du(u => this.getAxisMotionValue(u).stop());
  }
  pauseAnimation() {
    du(u => {
      var n;
      return (n = this.getAxisMotionValue(u).animation) === null || n === void 0
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(u) {
    var n;
    return (n = this.getAxisMotionValue(u).animation) === null || n === void 0
      ? void 0
      : n.state;
  }
  getAxisMotionValue(u) {
    let n = `_drag${u.toUpperCase()}`,
      f = this.visualElement.getProps(),
      l = f[n];
    return l
      ? l
      : this.visualElement.getValue(
          u,
          (f.initial ? f.initial[u] : void 0) || 0
        );
  }
  snapToCursor(u) {
    du(n => {
      let { drag: f } = this.getProps();
      if (!Cc(n, f, this.currentDirection)) return;
      let { projection: l } = this.visualElement,
        t = this.getAxisMotionValue(n);
      if (l && l.layout) {
        let { min: r, max: c } = l.layout.layoutBox[n];
        t.set(u[n] - P(r, c, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    let { drag: u, dragConstraints: n } = this.getProps(),
      { projection: f } = this.visualElement;
    if (!jn(n) || !f || !this.constraints) return;
    this.stopAnimation();
    let l = { x: 0, y: 0 };
    du(r => {
      let c = this.getAxisMotionValue(r);
      if (c && this.constraints !== !1) {
        let h = c.get();
        l[r] = s7({ min: h, max: h }, this.constraints[r]);
      }
    });
    let { transformTemplate: t } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = t ? t({}, '') : 'none'),
      f.root && f.root.updateScroll(),
      f.updateLayout(),
      this.resolveConstraints(),
      du(r => {
        if (!Cc(r, u, null)) return;
        let c = this.getAxisMotionValue(r),
          { min: h, max: w } = this.constraints[r];
        c.set(P(h, w, l[r]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    pW.set(this.visualElement, this);
    let u = this.visualElement.current,
      n = M0(u, 'pointerdown', h => {
        let { drag: w, dragListener: z = !0 } = this.getProps();
        w && z && this.start(h);
      }),
      f = () => {
        let { dragConstraints: h } = this.getProps();
        if (jn(h) && h.current) this.constraints = this.resolveRefConstraints();
      },
      { projection: l } = this.visualElement,
      t = l.addEventListener('measure', f);
    if (l && !l.layout) (l.root && l.root.updateScroll(), l.updateLayout());
    D.read(f);
    let r = Vn(window, 'resize', () => this.scalePositionWithinConstraints()),
      c = l.addEventListener(
        'didUpdate',
        ({ delta: h, hasLayoutChanged: w }) => {
          if (this.isDragging && w)
            (du(z => {
              let _ = this.getAxisMotionValue(z);
              if (!_) return;
              ((this.originPoint[z] += h[z].translate),
                _.set(_.get() + h[z].translate));
            }),
              this.visualElement.render());
        }
      );
    return () => {
      (r(), n(), t(), c && c());
    };
  }
  getProps() {
    let u = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: f = !1,
        dragPropagation: l = !1,
        dragConstraints: t = !1,
        dragElastic: r = Mc,
        dragMomentum: c = !0,
      } = u;
    return {
      ...u,
      drag: n,
      dragDirectionLock: f,
      dragPropagation: l,
      dragConstraints: t,
      dragElastic: r,
      dragMomentum: c,
    };
  }
}
function Cc(u, n, f) {
  return (n === !0 || n === u) && (f === null || f === u);
}
function iW(u, n = 10) {
  let f = null;
  if (Math.abs(u.y) > n) f = 'y';
  else if (Math.abs(u.x) > n) f = 'x';
  return f;
}
class sw extends Zu {
  constructor(u) {
    super(u);
    ((this.removeGroupControls = T),
      (this.removeListeners = T),
      (this.controls = new ew(u)));
  }
  mount() {
    let { dragControls: u } = this.node.getProps();
    if (u) this.removeGroupControls = u.subscribe(this.controls);
    this.removeListeners = this.controls.addListeners() || T;
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
var Q9 = u => (n, f) => {
  if (u) D.postRender(() => u(n, f));
};
class aw extends Zu {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = T;
  }
  onPointerDown(u) {
    this.session = new o1(u, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Gc(this.node),
    });
  }
  createPanHandlers() {
    let {
      onPanSessionStart: u,
      onPanStart: n,
      onPan: f,
      onPanEnd: l,
    } = this.node.getProps();
    return {
      onSessionStart: Q9(u),
      onStart: Q9(n),
      onMove: f,
      onEnd: (t, r) => {
        if ((delete this.session, l)) D.postRender(() => l(t, r));
      },
    };
  }
  mount() {
    this.removePointerDownListener = M0(this.node.current, 'pointerdown', u =>
      this.onPointerDown(u)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
var V1 = R(g(), 1);
var Xl = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function $9(u, n) {
  if (n.max === n.min) return 0;
  return (u / (n.max - n.min)) * 100;
}
var Ll = {
  correct: (u, n) => {
    if (!n.target) return u;
    if (typeof u === 'string')
      if (S.test(u)) u = parseFloat(u);
      else return u;
    let f = $9(u, n.target.x),
      l = $9(u, n.target.y);
    return `${f}% ${l}%`;
  },
};
var U9 = {
  correct: (u, { treeScale: n, projectionDelta: f }) => {
    let l = u,
      t = Du.parse(u);
    if (t.length > 5) return l;
    let r = Du.createTransformer(u),
      c = typeof t[0] !== 'number' ? 1 : 0,
      h = f.x.scale * n.x,
      w = f.y.scale * n.y;
    ((t[0 + c] /= h), (t[1 + c] /= w));
    let z = P(h, w, 0.5);
    if (typeof t[2 + c] === 'number') t[2 + c] /= z;
    if (typeof t[3 + c] === 'number') t[3 + c] /= z;
    return r(t);
  },
};
class W9 extends V1.Component {
  componentDidMount() {
    let {
        visualElement: u,
        layoutGroup: n,
        switchLayoutGroup: f,
        layoutId: l,
      } = this.props,
      { projection: t } = u;
    if ((Xz(bW), t)) {
      if (n.group) n.group.add(t);
      if (f && f.register && l) f.register(t);
      (t.root.didUpdate(),
        t.addEventListener('animationComplete', () => {
          this.safeToRemove();
        }),
        t.setOptions({
          ...t.options,
          onExitComplete: () => this.safeToRemove(),
        }));
    }
    Xl.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(u) {
    let {
        layoutDependency: n,
        visualElement: f,
        drag: l,
        isPresent: t,
      } = this.props,
      r = f.projection;
    if (!r) return null;
    if (((r.isPresent = t), l || u.layoutDependency !== n || n === void 0))
      r.willUpdate();
    else this.safeToRemove();
    if (u.isPresent !== t) {
      if (t) r.promote();
      else if (!r.relegate())
        D.postRender(() => {
          let c = r.getStack();
          if (!c || !c.members.length) this.safeToRemove();
        });
    }
    return null;
  }
  componentDidUpdate() {
    let { projection: u } = this.props.visualElement;
    if (u)
      (u.root.didUpdate(),
        vf.postRender(() => {
          if (!u.currentAnimation && u.isLead()) this.safeToRemove();
        }));
  }
  componentWillUnmount() {
    let { visualElement: u, layoutGroup: n, switchLayoutGroup: f } = this.props,
      { projection: l } = u;
    if (l) {
      if ((l.scheduleCheckAfterUnmount(), n && n.group)) n.group.remove(l);
      if (f && f.deregister) f.deregister(l);
    }
  }
  safeToRemove() {
    let { safeToRemove: u } = this.props;
    u && u();
  }
  render() {
    return null;
  }
}
function Dc(u) {
  let [n, f] = o6(),
    l = V1.useContext(Er);
  return C(W9, {
    ...u,
    layoutGroup: l,
    switchLayoutGroup: V1.useContext(Rr),
    isPresent: n,
    safeToRemove: f,
  });
}
var bW = {
  borderRadius: {
    ...Ll,
    applyTo: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],
  },
  borderTopLeftRadius: Ll,
  borderTopRightRadius: Ll,
  borderBottomLeftRadius: Ll,
  borderBottomRightRadius: Ll,
  boxShadow: U9,
};
function Z9(u, n, f) {
  let l = j(u) ? u : xn(u);
  return (l.start(Yl('', l, n, f)), l.animation);
}
function J9(u) {
  return u instanceof SVGElement && u.tagName !== 'svg';
}
var Y9 = (u, n) => u.depth - n.depth;
class u3 {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(u) {
    (Nl(this.children, u), (this.isDirty = !0));
  }
  remove(u) {
    (Ql(this.children, u), (this.isDirty = !0));
  }
  forEach(u) {
    (this.isDirty && this.children.sort(Y9),
      (this.isDirty = !1),
      this.children.forEach(u));
  }
}
function H9(u, n) {
  let f = Fu.now(),
    l = ({ timestamp: t }) => {
      let r = t - f;
      if (r >= n) (pu(l), u(r - n));
    };
  return (D.read(l, !0), () => pu(l));
}
var O9 = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  mW = O9.length,
  I9 = u => (typeof u === 'string' ? parseFloat(u) : u),
  X9 = u => typeof u === 'number' || S.test(u);
function F9(u, n, f, l, t, r) {
  if (t)
    ((u.opacity = P(0, f.opacity !== void 0 ? f.opacity : 1, eW(l))),
      (u.opacityExit = P(n.opacity !== void 0 ? n.opacity : 1, 0, sW(l))));
  else if (r)
    u.opacity = P(
      n.opacity !== void 0 ? n.opacity : 1,
      f.opacity !== void 0 ? f.opacity : 1,
      l
    );
  for (let c = 0; c < mW; c++) {
    let h = `border${O9[c]}Radius`,
      w = L9(n, h),
      z = L9(f, h);
    if (w === void 0 && z === void 0) continue;
    if ((w || (w = 0), z || (z = 0), w === 0 || z === 0 || X9(w) === X9(z))) {
      if (((u[h] = Math.max(P(I9(w), I9(z), l), 0)), Cu.test(z) || Cu.test(w)))
        u[h] += '%';
    } else u[h] = z;
  }
  if (n.rotate || f.rotate) u.rotate = P(n.rotate || 0, f.rotate || 0, l);
}
function L9(u, n) {
  return u[n] !== void 0 ? u[n] : u.borderRadius;
}
var eW = E9(0, 0.5, zc),
  sW = E9(0.5, 0.95, T);
function E9(u, n, f) {
  return l => {
    if (l < u) return 0;
    if (l > n) return 1;
    return f(yu(u, n, l));
  };
}
function q9(u, n) {
  ((u.min = n.min), (u.max = n.max));
}
function bu(u, n) {
  (q9(u.x, n.x), q9(u.y, n.y));
}
function n3(u, n) {
  ((u.translate = n.translate),
    (u.scale = n.scale),
    (u.originPoint = n.originPoint),
    (u.origin = n.origin));
}
function M9(u, n, f, l, t) {
  if (((u -= n), (u = x1(u, 1 / f, l)), t !== void 0)) u = x1(u, 1 / t, l);
  return u;
}
function aW(u, n = 0, f = 1, l = 0.5, t, r = u, c = u) {
  if (Cu.test(n)) ((n = parseFloat(n)), (n = P(c.min, c.max, n / 100) - c.min));
  if (typeof n !== 'number') return;
  let h = P(r.min, r.max, l);
  if (u === r) h -= n;
  ((u.min = M9(u.min, n, f, h, t)), (u.max = M9(u.max, n, f, h, t)));
}
function S9(u, n, [f, l, t], r, c) {
  aW(u, n[f], n[l], n[t], n.scale, r, c);
}
var uZ = ['x', 'scaleX', 'originX'],
  nZ = ['y', 'scaleY', 'originY'];
function f3(u, n, f, l) {
  (S9(u.x, n, uZ, f ? f.x : void 0, l ? l.x : void 0),
    S9(u.y, n, nZ, f ? f.y : void 0, l ? l.y : void 0));
}
function B9(u) {
  return u.translate === 0 && u.scale === 1;
}
function l3(u) {
  return B9(u.x) && B9(u.y);
}
function G9(u, n) {
  return u.min === n.min && u.max === n.max;
}
function D9(u, n) {
  return G9(u.x, n.x) && G9(u.y, n.y);
}
function C9(u, n) {
  return (
    Math.round(u.min) === Math.round(n.min) &&
    Math.round(u.max) === Math.round(n.max)
  );
}
function t3(u, n) {
  return C9(u.x, n.x) && C9(u.y, n.y);
}
function r3(u) {
  return Ju(u.x) / Ju(u.y);
}
function c3(u, n) {
  return (
    u.translate === n.translate &&
    u.scale === n.scale &&
    u.originPoint === n.originPoint
  );
}
class h3 {
  constructor() {
    this.members = [];
  }
  add(u) {
    (Nl(this.members, u), u.scheduleRender());
  }
  remove(u) {
    if ((Ql(this.members, u), u === this.prevLead)) this.prevLead = void 0;
    if (u === this.lead) {
      let n = this.members[this.members.length - 1];
      if (n) this.promote(n);
    }
  }
  relegate(u) {
    let n = this.members.findIndex(l => u === l);
    if (n === 0) return !1;
    let f;
    for (let l = n; l >= 0; l--) {
      let t = this.members[l];
      if (t.isPresent !== !1) {
        f = t;
        break;
      }
    }
    if (f) return (this.promote(f), !0);
    else return !1;
  }
  promote(u, n) {
    let f = this.lead;
    if (u === f) return;
    if (((this.prevLead = f), (this.lead = u), u.show(), f)) {
      if (
        (f.instance && f.scheduleRender(),
        u.scheduleRender(),
        (u.resumeFrom = f),
        n)
      )
        u.resumeFrom.preserveOpacity = !0;
      if (f.snapshot)
        ((u.snapshot = f.snapshot),
          (u.snapshot.latestValues = f.animationValues || f.latestValues));
      if (u.root && u.root.isUpdating) u.isLayoutDirty = !0;
      let { crossfade: l } = u.options;
      if (l === !1) f.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach(u => {
      let { options: n, resumingFrom: f } = u;
      if ((n.onExitComplete && n.onExitComplete(), f))
        f.options.onExitComplete && f.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach(u => {
      u.instance && u.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) this.lead.snapshot = void 0;
  }
}
function K9(u, n, f) {
  let l = '',
    t = u.x.translate / n.x,
    r = u.y.translate / n.y,
    c = (f === null || f === void 0 ? void 0 : f.z) || 0;
  if (t || r || c) l = `translate3d(${t}px, ${r}px, ${c}px) `;
  if (n.x !== 1 || n.y !== 1) l += `scale(${1 / n.x}, ${1 / n.y}) `;
  if (f) {
    let {
      transformPerspective: z,
      rotate: _,
      rotateX: N,
      rotateY: Q,
      skewX: Z,
      skewY: Y,
    } = f;
    if (z) l = `perspective(${z}px) ${l}`;
    if (_) l += `rotate(${_}deg) `;
    if (N) l += `rotateX(${N}deg) `;
    if (Q) l += `rotateY(${Q}deg) `;
    if (Z) l += `skewX(${Z}deg) `;
    if (Y) l += `skewY(${Y}deg) `;
  }
  let h = u.x.scale * n.x,
    w = u.y.scale * n.y;
  if (h !== 1 || w !== 1) l += `scale(${h}, ${w})`;
  return l || 'none';
}
var rf = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  v1 = typeof window !== 'undefined' && window.MotionDebug !== void 0,
  w3 = ['', 'X', 'Y', 'Z'],
  fZ = { visibility: 'hidden' },
  P9 = 1000,
  lZ = 0;
function z3(u, n, f, l) {
  let { latestValues: t } = n;
  if (t[u]) {
    if (((f[u] = t[u]), n.setStaticValue(u, 0), l)) l[u] = 0;
  }
}
function o9(u) {
  if (((u.hasCheckedOptimisedAppear = !0), u.root === u)) return;
  let { visualElement: n } = u.options;
  if (!n) return;
  let f = fc(n);
  if (window.MotionHasOptimisedAnimation(f, 'transform')) {
    let { layout: t, layoutId: r } = u.options;
    window.MotionCancelOptimisedAnimation(f, 'transform', D, !(t || r));
  }
  let { parent: l } = u;
  if (l && !l.hasCheckedOptimisedAppear) o9(l);
}
function Kc({
  attachResizeListener: u,
  defaultParent: n,
  measureScroll: f,
  checkIsScrollRoot: l,
  resetTransform: t,
}) {
  return class r {
    constructor(c = {}, h = n === null || n === void 0 ? void 0 : n()) {
      ((this.id = lZ++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          if (this.isUpdating)
            ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          if (((this.projectionUpdateScheduled = !1), v1))
            rf.totalNodes =
              rf.resolvedTargetDeltas =
              rf.recalculatedProjection =
                0;
          if (
            (this.nodes.forEach(cZ),
            this.nodes.forEach(NZ),
            this.nodes.forEach(QZ),
            this.nodes.forEach(hZ),
            v1)
          )
            window.MotionDebug.record(rf);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = c),
        (this.root = h ? h.root || h : this),
        (this.path = h ? [...h.path, h] : []),
        (this.parent = h),
        (this.depth = h ? h.depth + 1 : 0));
      for (let w = 0; w < this.path.length; w++)
        this.path[w].shouldResetTransform = !0;
      if (this.root === this) this.nodes = new u3();
    }
    addEventListener(c, h) {
      if (!this.eventHandlers.has(c)) this.eventHandlers.set(c, new e0());
      return this.eventHandlers.get(c).add(h);
    }
    notifyListeners(c, ...h) {
      let w = this.eventHandlers.get(c);
      w && w.notify(...h);
    }
    hasListeners(c) {
      return this.eventHandlers.has(c);
    }
    mount(c, h = this.root.hasTreeAnimated) {
      if (this.instance) return;
      ((this.isSVG = J9(c)), (this.instance = c));
      let { layoutId: w, layout: z, visualElement: _ } = this.options;
      if (_ && !_.current) _.mount(c);
      if (
        (this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        h && (z || w))
      )
        this.isLayoutDirty = !0;
      if (u) {
        let N,
          Q = () => (this.root.updateBlockedByResize = !1);
        u(c, () => {
          if (
            ((this.root.updateBlockedByResize = !0),
            N && N(),
            (N = H9(Q, 250)),
            Xl.hasAnimatedSinceResize)
          )
            ((Xl.hasAnimatedSinceResize = !1), this.nodes.forEach(R9));
        });
      }
      if (w) this.root.registerSharedNode(w, this);
      if (this.options.animate !== !1 && _ && (w || z))
        this.addEventListener(
          'didUpdate',
          ({
            delta: N,
            hasLayoutChanged: Q,
            hasRelativeTargetChanged: Z,
            layout: Y,
          }) => {
            if (this.isTreeAnimationBlocked()) {
              ((this.target = void 0), (this.relativeTarget = void 0));
              return;
            }
            let H = this.options.transition || _.getDefaultTransition() || JZ,
              { onLayoutAnimationStart: F, onLayoutAnimationComplete: U } =
                _.getProps(),
              $ = !this.targetLayout || !t3(this.targetLayout, Y) || Z,
              W = !Q && Z;
            if (
              this.options.layoutRoot ||
              (this.resumeFrom && this.resumeFrom.instance) ||
              W ||
              (Q && ($ || !this.currentAnimation))
            ) {
              if (this.resumeFrom)
                ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
              this.setAnimationOrigin(N, W);
              let J = { ...I0(H, 'layout'), onPlay: F, onComplete: U };
              if (_.shouldReduceMotion || this.options.layoutRoot)
                ((J.delay = 0), (J.type = !1));
              this.startAnimation(J);
            } else {
              if (!Q) R9(this);
              if (this.isLead() && this.options.onExitComplete)
                this.options.onExitComplete();
            }
            this.targetLayout = Y;
          }
        );
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      let c = this.getStack();
      (c && c.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        pu(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      if (this.isUpdateBlocked()) return;
      ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach($Z),
        this.animationId++);
    }
    getTransformTemplate() {
      let { visualElement: c } = this.options;
      return c && c.getProps().transformTemplate;
    }
    willUpdate(c = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        window.MotionCancelOptimisedAnimation &&
        !this.hasCheckedOptimisedAppear
      )
        o9(this);
      if (
        (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let _ = 0; _ < this.path.length; _++) {
        let N = this.path[_];
        if (
          ((N.shouldResetTransform = !0),
          N.updateScroll('snapshot'),
          N.options.layoutRoot)
        )
          N.willUpdate(!1);
      }
      let { layoutId: h, layout: w } = this.options;
      if (h === void 0 && !w) return;
      let z = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = z
        ? z(this.latestValues, '')
        : void 0),
        this.updateSnapshot(),
        c && this.notifyListeners('willUpdate'));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(A9));
        return;
      }
      if (!this.isUpdating) this.nodes.forEach(zZ);
      ((this.isUpdating = !1),
        this.nodes.forEach(_Z),
        this.nodes.forEach(tZ),
        this.nodes.forEach(rZ),
        this.clearAllSnapshots());
      let h = Fu.now();
      ((nu.delta = Wu(0, 16.666666666666668, h - nu.timestamp)),
        (nu.timestamp = h),
        (nu.isProcessing = !0),
        Gr.update.process(nu),
        Gr.preRender.process(nu),
        Gr.render.process(nu),
        (nu.isProcessing = !1));
    }
    didUpdate() {
      if (!this.updateScheduled)
        ((this.updateScheduled = !0), vf.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(wZ), this.sharedNodes.forEach(UZ));
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled)
        ((this.projectionUpdateScheduled = !0),
          D.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      D.postRender(() => {
        if (this.isLayoutDirty) this.root.didUpdate();
        else this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      if (this.snapshot || !this.instance) return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      if (!this.instance) return;
      if (
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let w = 0; w < this.path.length; w++) this.path[w].updateScroll();
      let c = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = y()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox));
      let { visualElement: h } = this.options;
      h &&
        h.notify(
          'LayoutMeasure',
          this.layout.layoutBox,
          c ? c.layoutBox : void 0
        );
    }
    updateScroll(c = 'measure') {
      let h = Boolean(this.options.layoutScroll && this.instance);
      if (
        this.scroll &&
        this.scroll.animationId === this.root.animationId &&
        this.scroll.phase === c
      )
        h = !1;
      if (h) {
        let w = l(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: c,
          isRoot: w,
          offset: f(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : w,
        };
      }
    }
    resetTransform() {
      if (!t) return;
      let c =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        h = this.projectionDelta && !l3(this.projectionDelta),
        w = this.getTransformTemplate(),
        z = w ? w(this.latestValues, '') : void 0,
        _ = z !== this.prevTransformTemplateValue;
      if (c && (h || yn(this.latestValues) || _))
        (t(this.instance, z),
          (this.shouldResetTransform = !1),
          this.scheduleRender());
    }
    measure(c = !0) {
      let h = this.measurePageBox(),
        w = this.removeElementScroll(h);
      if (c) w = this.removeTransform(w);
      return (
        YZ(w),
        {
          animationId: this.root.animationId,
          measuredBox: h,
          layoutBox: w,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var c;
      let { visualElement: h } = this.options;
      if (!h) return y();
      let w = h.measureViewportBox();
      if (
        !(
          ((c = this.scroll) === null || c === void 0 ? void 0 : c.wasRoot) ||
          this.path.some(HZ)
        )
      ) {
        let { scroll: _ } = this.root;
        if (_) (S0(w.x, _.offset.x), S0(w.y, _.offset.y));
      }
      return w;
    }
    removeElementScroll(c) {
      var h;
      let w = y();
      if (
        (bu(w, c),
        (h = this.scroll) === null || h === void 0 ? void 0 : h.wasRoot)
      )
        return w;
      for (let z = 0; z < this.path.length; z++) {
        let _ = this.path[z],
          { scroll: N, options: Q } = _;
        if (_ !== this.root && N && Q.layoutScroll) {
          if (N.wasRoot) bu(w, c);
          (S0(w.x, N.offset.x), S0(w.y, N.offset.y));
        }
      }
      return w;
    }
    applyTransform(c, h = !1) {
      let w = y();
      bu(w, c);
      for (let z = 0; z < this.path.length; z++) {
        let _ = this.path[z];
        if (!h && _.options.layoutScroll && _.scroll && _ !== _.root)
          tf(w, { x: -_.scroll.offset.x, y: -_.scroll.offset.y });
        if (!yn(_.latestValues)) continue;
        tf(w, _.latestValues);
      }
      if (yn(this.latestValues)) tf(w, this.latestValues);
      return w;
    }
    removeTransform(c) {
      let h = y();
      bu(h, c);
      for (let w = 0; w < this.path.length; w++) {
        let z = this.path[w];
        if (!z.instance) continue;
        if (!yn(z.latestValues)) continue;
        Bc(z.latestValues) && z.updateSnapshot();
        let _ = y(),
          N = z.measurePageBox();
        (bu(_, N),
          f3(h, z.latestValues, z.snapshot ? z.snapshot.layoutBox : void 0, _));
      }
      if (yn(this.latestValues)) f3(h, this.latestValues);
      return h;
    }
    setTargetDelta(c) {
      ((this.targetDelta = c),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(c) {
      this.options = {
        ...this.options,
        ...c,
        crossfade: c.crossfade !== void 0 ? c.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent) return;
      if (this.relativeParent.resolvedRelativeTargetAt !== nu.timestamp)
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(c = !1) {
      var h;
      let w = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = w.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = w.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = w.isSharedProjectionDirty));
      let z = Boolean(this.resumingFrom) || this !== w;
      if (
        !(
          c ||
          (z && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((h = this.parent) === null || h === void 0
            ? void 0
            : h.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      let { layout: N, layoutId: Q } = this.options;
      if (!this.layout || !(N || Q)) return;
      if (
        ((this.resolvedRelativeTargetAt = nu.timestamp),
        !this.targetDelta && !this.relativeTarget)
      ) {
        let Z = this.getClosestProjectingParent();
        if (Z && Z.layout && this.animationProgress !== 1)
          ((this.relativeParent = Z),
            this.forceRelativeParentToResolveTarget(),
            (this.relativeTarget = y()),
            (this.relativeTargetOrigin = y()),
            Il(
              this.relativeTargetOrigin,
              this.layout.layoutBox,
              Z.layout.layoutBox
            ),
            bu(this.relativeTarget, this.relativeTargetOrigin));
        else this.relativeParent = this.relativeTarget = void 0;
      }
      if (!this.relativeTarget && !this.targetDelta) return;
      if (!this.target)
        ((this.target = y()), (this.targetWithTransforms = y()));
      if (
        this.relativeTarget &&
        this.relativeTargetOrigin &&
        this.relativeParent &&
        this.relativeParent.target
      )
        (this.forceRelativeParentToResolveTarget(),
          V7(this.target, this.relativeTarget, this.relativeParent.target));
      else if (this.targetDelta) {
        if (Boolean(this.resumingFrom))
          this.target = this.applyTransform(this.layout.layoutBox);
        else bu(this.target, this.layout.layoutBox);
        bw(this.target, this.targetDelta);
      } else bu(this.target, this.layout.layoutBox);
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = !1;
        let Z = this.getClosestProjectingParent();
        if (
          Z &&
          Boolean(Z.resumingFrom) === Boolean(this.resumingFrom) &&
          !Z.options.layoutScroll &&
          Z.target &&
          this.animationProgress !== 1
        )
          ((this.relativeParent = Z),
            this.forceRelativeParentToResolveTarget(),
            (this.relativeTarget = y()),
            (this.relativeTargetOrigin = y()),
            Il(this.relativeTargetOrigin, this.target, Z.target),
            bu(this.relativeTarget, this.relativeTargetOrigin));
        else this.relativeParent = this.relativeTarget = void 0;
      }
      if (v1) rf.resolvedTargetDeltas++;
    }
    getClosestProjectingParent() {
      if (
        !this.parent ||
        Bc(this.parent.latestValues) ||
        pw(this.parent.latestValues)
      )
        return;
      if (this.parent.isProjecting()) return this.parent;
      else return this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return Boolean(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var c;
      let h = this.getLead(),
        w = Boolean(this.resumingFrom) || this !== h,
        z = !0;
      if (
        this.isProjectionDirty ||
        ((c = this.parent) === null || c === void 0
          ? void 0
          : c.isProjectionDirty)
      )
        z = !1;
      if (w && (this.isSharedProjectionDirty || this.isTransformDirty)) z = !1;
      if (this.resolvedRelativeTargetAt === nu.timestamp) z = !1;
      if (z) return;
      let { layout: _, layoutId: N } = this.options;
      if (
        ((this.isTreeAnimating = Boolean(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        !this.isTreeAnimating)
      )
        this.targetDelta = this.relativeTarget = void 0;
      if (!this.layout || !(_ || N)) return;
      bu(this.layoutCorrected, this.layout.layoutBox);
      let Q = this.treeScale.x,
        Z = this.treeScale.y;
      if (
        (_9(this.layoutCorrected, this.treeScale, this.path, w),
        h.layout &&
          !h.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1))
      )
        ((h.target = h.layout.layoutBox), (h.targetWithTransforms = y()));
      let { target: Y } = h;
      if (!Y) {
        if (this.prevProjectionDelta)
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      if (!this.projectionDelta || !this.prevProjectionDelta)
        this.createProjectionDeltas();
      else
        (n3(this.prevProjectionDelta.x, this.projectionDelta.x),
          n3(this.prevProjectionDelta.y, this.projectionDelta.y));
      if (
        (Hl(this.projectionDelta, this.layoutCorrected, Y, this.latestValues),
        this.treeScale.x !== Q ||
          this.treeScale.y !== Z ||
          !c3(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !c3(this.projectionDelta.y, this.prevProjectionDelta.y))
      )
        ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', Y));
      if (v1) rf.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(c = !0) {
      var h;
      if (
        ((h = this.options.visualElement) === null ||
          h === void 0 ||
          h.scheduleRender(),
        c)
      ) {
        let w = this.getStack();
        w && w.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance)
        this.resumingFrom = void 0;
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = lf()),
        (this.projectionDelta = lf()),
        (this.projectionDeltaWithTransform = lf()));
    }
    setAnimationOrigin(c, h = !1) {
      let w = this.snapshot,
        z = w ? w.latestValues : {},
        _ = { ...this.latestValues },
        N = lf();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot)
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      this.attemptToResolveRelativeTarget = !h;
      let Q = y(),
        Z = w ? w.source : void 0,
        Y = this.layout ? this.layout.source : void 0,
        H = Z !== Y,
        F = this.getStack(),
        U = !F || F.members.length <= 1,
        $ = Boolean(
          H && !U && this.options.crossfade === !0 && !this.path.some(ZZ)
        );
      this.animationProgress = 0;
      let W;
      ((this.mixTargetDelta = J => {
        let I = J / 1000;
        if (
          (k9(N.x, c.x, I),
          k9(N.y, c.y, I),
          this.setTargetDelta(N),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout)
        ) {
          if (
            (Il(Q, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            WZ(this.relativeTarget, this.relativeTargetOrigin, Q, I),
            W && D9(this.relativeTarget, W))
          )
            this.isProjectionDirty = !1;
          if (!W) W = y();
          bu(W, this.relativeTarget);
        }
        if (H)
          ((this.animationValues = _), F9(_, z, this.latestValues, I, $, U));
        (this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = I));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1000 : 0));
    }
    startAnimation(c) {
      if (
        (this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom && this.resumingFrom.currentAnimation)
      )
        this.resumingFrom.currentAnimation.stop();
      if (this.pendingAnimation)
        (pu(this.pendingAnimation), (this.pendingAnimation = void 0));
      this.pendingAnimation = D.update(() => {
        if (
          ((Xl.hasAnimatedSinceResize = !0),
          (this.currentAnimation = Z9(0, P9, {
            ...c,
            onUpdate: h => {
              (this.mixTargetDelta(h), c.onUpdate && c.onUpdate(h));
            },
            onComplete: () => {
              (c.onComplete && c.onComplete(), this.completeAnimation());
            },
          })),
          this.resumingFrom)
        )
          this.resumingFrom.currentAnimation = this.currentAnimation;
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom)
        ((this.resumingFrom.currentAnimation = void 0),
          (this.resumingFrom.preserveOpacity = void 0));
      let c = this.getStack();
      (c && c.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners('animationComplete'));
    }
    finishAnimation() {
      if (this.currentAnimation)
        (this.mixTargetDelta && this.mixTargetDelta(P9),
          this.currentAnimation.stop());
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      let c = this.getLead(),
        { targetWithTransforms: h, target: w, layout: z, latestValues: _ } = c;
      if (!h || !w || !z) return;
      if (
        this !== c &&
        this.layout &&
        z &&
        x9(this.options.animationType, this.layout.layoutBox, z.layoutBox)
      ) {
        w = this.target || y();
        let N = Ju(this.layout.layoutBox.x);
        ((w.x.min = c.target.x.min), (w.x.max = w.x.min + N));
        let Q = Ju(this.layout.layoutBox.y);
        ((w.y.min = c.target.y.min), (w.y.max = w.y.min + Q));
      }
      (bu(h, w),
        tf(h, _),
        Hl(this.projectionDeltaWithTransform, this.layoutCorrected, h, _));
    }
    registerSharedNode(c, h) {
      if (!this.sharedNodes.has(c)) this.sharedNodes.set(c, new h3());
      this.sharedNodes.get(c).add(h);
      let z = h.options.initialPromotionConfig;
      h.promote({
        transition: z ? z.transition : void 0,
        preserveFollowOpacity:
          z && z.shouldPreserveFollowOpacity
            ? z.shouldPreserveFollowOpacity(h)
            : void 0,
      });
    }
    isLead() {
      let c = this.getStack();
      return c ? c.lead === this : !0;
    }
    getLead() {
      var c;
      let { layoutId: h } = this.options;
      return h
        ? ((c = this.getStack()) === null || c === void 0 ? void 0 : c.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var c;
      let { layoutId: h } = this.options;
      return h
        ? (c = this.getStack()) === null || c === void 0
          ? void 0
          : c.prevLead
        : void 0;
    }
    getStack() {
      let { layoutId: c } = this.options;
      if (c) return this.root.sharedNodes.get(c);
    }
    promote({ needsReset: c, transition: h, preserveFollowOpacity: w } = {}) {
      let z = this.getStack();
      if (z) z.promote(this, w);
      if (c) ((this.projectionDelta = void 0), (this.needsReset = !0));
      if (h) this.setOptions({ transition: h });
    }
    relegate() {
      let c = this.getStack();
      if (c) return c.relegate(this);
      else return !1;
    }
    resetSkewAndRotation() {
      let { visualElement: c } = this.options;
      if (!c) return;
      let h = !1,
        { latestValues: w } = c;
      if (
        w.z ||
        w.rotate ||
        w.rotateX ||
        w.rotateY ||
        w.rotateZ ||
        w.skewX ||
        w.skewY
      )
        h = !0;
      if (!h) return;
      let z = {};
      if (w.z) z3('z', c, z, this.animationValues);
      for (let _ = 0; _ < w3.length; _++)
        (z3(`rotate${w3[_]}`, c, z, this.animationValues),
          z3(`skew${w3[_]}`, c, z, this.animationValues));
      c.render();
      for (let _ in z)
        if ((c.setStaticValue(_, z[_]), this.animationValues))
          this.animationValues[_] = z[_];
      c.scheduleRender();
    }
    getProjectionStyles(c) {
      var h, w;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return fZ;
      let z = { visibility: '' },
        _ = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (z.opacity = ''),
          (z.pointerEvents =
            mf(c === null || c === void 0 ? void 0 : c.pointerEvents) || ''),
          (z.transform = _ ? _(this.latestValues, '') : 'none'),
          z
        );
      let N = this.getLead();
      if (!this.projectionDelta || !this.layout || !N.target) {
        let H = {};
        if (this.options.layoutId)
          ((H.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
            (H.pointerEvents =
              mf(c === null || c === void 0 ? void 0 : c.pointerEvents) || ''));
        if (this.hasProjected && !yn(this.latestValues))
          ((H.transform = _ ? _({}, '') : 'none'), (this.hasProjected = !1));
        return H;
      }
      let Q = N.animationValues || N.latestValues;
      if (
        (this.applyTransformsToTarget(),
        (z.transform = K9(
          this.projectionDeltaWithTransform,
          this.treeScale,
          Q
        )),
        _)
      )
        z.transform = _(Q, z.transform);
      let { x: Z, y: Y } = this.projectionDelta;
      if (
        ((z.transformOrigin = `${Z.origin * 100}% ${Y.origin * 100}% 0`),
        N.animationValues)
      )
        z.opacity =
          N === this
            ? (w =
                (h = Q.opacity) !== null && h !== void 0
                  ? h
                  : this.latestValues.opacity) !== null && w !== void 0
              ? w
              : 1
            : this.preserveOpacity
              ? this.latestValues.opacity
              : Q.opacityExit;
      else
        z.opacity =
          N === this
            ? Q.opacity !== void 0
              ? Q.opacity
              : ''
            : Q.opacityExit !== void 0
              ? Q.opacityExit
              : 0;
      for (let H in ll) {
        if (Q[H] === void 0) continue;
        let { correct: F, applyTo: U } = ll[H],
          $ = z.transform === 'none' ? Q[H] : F(Q[H], N);
        if (U) {
          let W = U.length;
          for (let J = 0; J < W; J++) z[U[J]] = $;
        } else z[H] = $;
      }
      if (this.options.layoutId)
        z.pointerEvents =
          N === this
            ? mf(c === null || c === void 0 ? void 0 : c.pointerEvents) || ''
            : 'none';
      return z;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach(c => {
        var h;
        return (h = c.currentAnimation) === null || h === void 0
          ? void 0
          : h.stop();
      }),
        this.root.nodes.forEach(A9),
        this.root.sharedNodes.clear());
    }
  };
}
function tZ(u) {
  u.updateLayout();
}
function rZ(u) {
  var n;
  let f =
    ((n = u.resumeFrom) === null || n === void 0 ? void 0 : n.snapshot) ||
    u.snapshot;
  if (u.isLead() && u.layout && f && u.hasListeners('didUpdate')) {
    let { layoutBox: l, measuredBox: t } = u.layout,
      { animationType: r } = u.options,
      c = f.source !== u.layout.source;
    if (r === 'size')
      du(N => {
        let Q = c ? f.measuredBox[N] : f.layoutBox[N],
          Z = Ju(Q);
        ((Q.min = l[N].min), (Q.max = Q.min + Z));
      });
    else if (x9(r, f.layoutBox, l))
      du(N => {
        let Q = c ? f.measuredBox[N] : f.layoutBox[N],
          Z = Ju(l[N]);
        if (((Q.max = Q.min + Z), u.relativeTarget && !u.currentAnimation))
          ((u.isProjectionDirty = !0),
            (u.relativeTarget[N].max = u.relativeTarget[N].min + Z));
      });
    let h = lf();
    Hl(h, l, f.layoutBox);
    let w = lf();
    if (c) Hl(w, u.applyTransform(t, !0), f.measuredBox);
    else Hl(w, l, f.layoutBox);
    let z = !l3(h),
      _ = !1;
    if (!u.resumeFrom) {
      let N = u.getClosestProjectingParent();
      if (N && !N.resumeFrom) {
        let { snapshot: Q, layout: Z } = N;
        if (Q && Z) {
          let Y = y();
          Il(Y, f.layoutBox, Q.layoutBox);
          let H = y();
          if ((Il(H, l, Z.layoutBox), !t3(Y, H))) _ = !0;
          if (N.options.layoutRoot)
            ((u.relativeTarget = H),
              (u.relativeTargetOrigin = Y),
              (u.relativeParent = N));
        }
      }
    }
    u.notifyListeners('didUpdate', {
      layout: l,
      snapshot: f,
      delta: w,
      layoutDelta: h,
      hasLayoutChanged: z,
      hasRelativeTargetChanged: _,
    });
  } else if (u.isLead()) {
    let { onExitComplete: l } = u.options;
    l && l();
  }
  u.options.transition = void 0;
}
function cZ(u) {
  if (v1) rf.totalNodes++;
  if (!u.parent) return;
  if (!u.isProjecting()) u.isProjectionDirty = u.parent.isProjectionDirty;
  (u.isSharedProjectionDirty ||
    (u.isSharedProjectionDirty = Boolean(
      u.isProjectionDirty ||
      u.parent.isProjectionDirty ||
      u.parent.isSharedProjectionDirty
    )),
    u.isTransformDirty || (u.isTransformDirty = u.parent.isTransformDirty));
}
function hZ(u) {
  u.isProjectionDirty = u.isSharedProjectionDirty = u.isTransformDirty = !1;
}
function wZ(u) {
  u.clearSnapshot();
}
function A9(u) {
  u.clearMeasurements();
}
function zZ(u) {
  u.isLayoutDirty = !1;
}
function _Z(u) {
  let { visualElement: n } = u.options;
  if (n && n.getProps().onBeforeLayoutMeasure) n.notify('BeforeLayoutMeasure');
  u.resetTransform();
}
function R9(u) {
  (u.finishAnimation(),
    (u.targetDelta = u.relativeTarget = u.target = void 0),
    (u.isProjectionDirty = !0));
}
function NZ(u) {
  u.resolveTargetDelta();
}
function QZ(u) {
  u.calcProjection();
}
function $Z(u) {
  u.resetSkewAndRotation();
}
function UZ(u) {
  u.removeLeadSnapshot();
}
function k9(u, n, f) {
  ((u.translate = P(n.translate, 0, f)),
    (u.scale = P(n.scale, 1, f)),
    (u.origin = n.origin),
    (u.originPoint = n.originPoint));
}
function g9(u, n, f, l) {
  ((u.min = P(n.min, f.min, l)), (u.max = P(n.max, f.max, l)));
}
function WZ(u, n, f, l) {
  (g9(u.x, n.x, f.x, l), g9(u.y, n.y, f.y, l));
}
function ZZ(u) {
  return u.animationValues && u.animationValues.opacityExit !== void 0;
}
var JZ = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  T9 = u =>
    typeof navigator !== 'undefined' &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(u),
  d9 = T9('applewebkit/') && !T9('chrome/') ? Math.round : T;
function j9(u) {
  ((u.min = d9(u.min)), (u.max = d9(u.max)));
}
function YZ(u) {
  (j9(u.x), j9(u.y));
}
function x9(u, n, f) {
  return (
    u === 'position' || (u === 'preserve-aspect' && !x7(r3(n), r3(f), 0.2))
  );
}
function HZ(u) {
  var n;
  return (
    u !== u.root &&
    ((n = u.scroll) === null || n === void 0 ? void 0 : n.wasRoot)
  );
}
var V9 = Kc({
  attachResizeListener: (u, n) => Vn(u, 'resize', n),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop,
  }),
  checkIsScrollRoot: () => !0,
});
var _3 = { current: void 0 },
  Pc = Kc({
    measureScroll: u => ({ x: u.scrollLeft, y: u.scrollTop }),
    defaultParent: () => {
      if (!_3.current) {
        let u = new V9({});
        (u.mount(window), u.setOptions({ layoutScroll: !0 }), (_3.current = u));
      }
      return _3.current;
    },
    resetTransform: (u, n) => {
      u.style.transform = n !== void 0 ? n : 'none';
    },
    checkIsScrollRoot: u =>
      Boolean(window.getComputedStyle(u).position === 'fixed'),
  });
var v9 = {
  pan: { Feature: aw },
  drag: { Feature: sw, ProjectionNode: Pc, MeasureLayout: Dc },
};
function y9(u, n, f) {
  let { props: l } = u;
  if (u.animationState && l.whileHover)
    u.animationState.setActive('whileHover', f === 'Start');
  let t = 'onHover' + f,
    r = l[t];
  if (r) D.postRender(() => r(n, vn(n)));
}
class N3 extends Zu {
  mount() {
    let { current: u } = this.node;
    if (!u) return;
    this.unmount = Lw(u, n => {
      return (y9(this.node, n, 'Start'), f => y9(this.node, f, 'End'));
    });
  }
  unmount() {}
}
class Q3 extends Zu {
  constructor() {
    super(...arguments);
    this.isActive = !1;
  }
  onFocus() {
    let u = !1;
    try {
      u = this.node.current.matches(':focus-visible');
    } catch (n) {
      u = !0;
    }
    if (!u || !this.node.animationState) return;
    (this.node.animationState.setActive('whileFocus', !0),
      (this.isActive = !0));
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState) return;
    (this.node.animationState.setActive('whileFocus', !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Sn(
      Vn(this.node.current, 'focus', () => this.onFocus()),
      Vn(this.node.current, 'blur', () => this.onBlur())
    );
  }
  unmount() {}
}
function p9(u, n, f) {
  let { props: l } = u;
  if (u.animationState && l.whileTap)
    u.animationState.setActive('whileTap', f === 'Start');
  let t = 'onTap' + (f === 'End' ? '' : f),
    r = l[t];
  if (r) D.postRender(() => r(n, vn(n)));
}
class $3 extends Zu {
  mount() {
    let { current: u } = this.node;
    if (!u) return;
    this.unmount = Fw(
      u,
      n => {
        return (
          p9(this.node, n, 'Start'),
          (f, { success: l }) => p9(this.node, f, l ? 'End' : 'Cancel')
        );
      },
      { useGlobalTarget: this.node.props.globalTapTarget }
    );
  }
  unmount() {}
}
var W3 = new WeakMap(),
  U3 = new WeakMap(),
  IZ = u => {
    let n = W3.get(u.target);
    n && n(u);
  },
  XZ = u => {
    u.forEach(IZ);
  };
function LZ({ root: u, ...n }) {
  let f = u || document;
  if (!U3.has(f)) U3.set(f, {});
  let l = U3.get(f),
    t = JSON.stringify(n);
  if (!l[t]) l[t] = new IntersectionObserver(XZ, { root: u, ...n });
  return l[t];
}
function i9(u, n, f) {
  let l = LZ(n);
  return (
    W3.set(u, f),
    l.observe(u),
    () => {
      (W3.delete(u), l.unobserve(u));
    }
  );
}
var OZ = { some: 0, all: 1 };
class Z3 extends Zu {
  constructor() {
    super(...arguments);
    ((this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    let { viewport: u = {} } = this.node.getProps(),
      { root: n, margin: f, amount: l = 'some', once: t } = u,
      r = {
        root: n ? n.current : void 0,
        rootMargin: f,
        threshold: typeof l === 'number' ? l : OZ[l],
      },
      c = h => {
        let { isIntersecting: w } = h;
        if (this.isInView === w) return;
        if (((this.isInView = w), t && !w && this.hasEnteredView)) return;
        else if (w) this.hasEnteredView = !0;
        if (this.node.animationState)
          this.node.animationState.setActive('whileInView', w);
        let { onViewportEnter: z, onViewportLeave: _ } = this.node.getProps(),
          N = w ? z : _;
        N && N(h);
      };
    return i9(this.node.current, r, c);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === 'undefined') return;
    let { props: u, prevProps: n } = this.node;
    if (['amount', 'margin', 'root'].some(FZ(u, n))) this.startObserver();
  }
  unmount() {}
}
function FZ({ viewport: u = {} }, { viewport: n = {} } = {}) {
  return f => u[f] !== n[f];
}
var b9 = {
  inView: { Feature: Z3 },
  tap: { Feature: $3 },
  focus: { Feature: Q3 },
  hover: { Feature: N3 },
};
var m9 = { layout: { ProjectionNode: Pc, MeasureLayout: Dc } };
var n_ = R(g(), 1);
var y1 = { current: null },
  Ac = { current: !1 };
function e9() {
  if (((Ac.current = !0), !of)) return;
  if (window.matchMedia) {
    let u = window.matchMedia('(prefers-reduced-motion)'),
      n = () => (y1.current = u.matches);
    (u.addListener(n), n());
  } else y1.current = !1;
}
var EZ = [...Dw, ru, Du],
  s9 = u => EZ.find(Wc(u));
var J3 = new WeakMap();
function a9(u, n, f) {
  for (let l in n) {
    let t = n[l],
      r = f[l];
    if (j(t)) u.addValue(l, t);
    else if (j(r)) u.addValue(l, xn(t, { owner: u }));
    else if (r !== t)
      if (u.hasValue(l)) {
        let c = u.getValue(l);
        if (c.liveStyle === !0) c.jump(t);
        else if (!c.hasAnimated) c.set(t);
      } else {
        let c = u.getStaticValue(l);
        u.addValue(l, xn(c !== void 0 ? c : t, { owner: u }));
      }
  }
  for (let l in f) if (n[l] === void 0) u.removeValue(l);
  return n;
}
var u_ = [
  'AnimationStart',
  'AnimationComplete',
  'Update',
  'BeforeLayoutMeasure',
  'LayoutMeasure',
  'LayoutAnimationStart',
  'LayoutAnimationComplete',
];
class Y3 {
  scrapeMotionValuesFromProps(u, n, f) {
    return {};
  }
  constructor(
    {
      parent: u,
      props: n,
      presenceContext: f,
      reducedMotionConfig: l,
      blockInitialAnimation: t,
      visualState: r,
    },
    c = {}
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = nf),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        if (!this.current) return;
        (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        let Q = Fu.now();
        if (this.renderScheduledAt < Q)
          ((this.renderScheduledAt = Q), D.render(this.render, !1, !0));
      }));
    let { latestValues: h, renderState: w, onUpdate: z } = r;
    if (
      ((this.onUpdate = z),
      (this.latestValues = h),
      (this.baseTarget = { ...h }),
      (this.initialValues = n.initial ? { ...h } : {}),
      (this.renderState = w),
      (this.parent = u),
      (this.props = n),
      (this.presenceContext = f),
      (this.depth = u ? u.depth + 1 : 0),
      (this.reducedMotionConfig = l),
      (this.options = c),
      (this.blockInitialAnimation = Boolean(t)),
      (this.isControllingVariants = i0(n)),
      (this.isVariantNode = Kr(n)),
      this.isVariantNode)
    )
      this.variantChildren = new Set();
    this.manuallyAnimateOnMount = Boolean(u && u.current);
    let { willChange: _, ...N } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (let Q in N) {
      let Z = N[Q];
      if (h[Q] !== void 0 && j(Z)) Z.set(h[Q], !1);
    }
  }
  mount(u) {
    if (
      ((this.current = u),
      J3.set(u, this),
      this.projection && !this.projection.instance)
    )
      this.projection.mount(u);
    if (this.parent && this.isVariantNode && !this.isControllingVariants)
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    if (
      (this.values.forEach((n, f) => this.bindToMotionValue(f, n)), !Ac.current)
    )
      e9();
    if (
      ((this.shouldReduceMotion =
        this.reducedMotionConfig === 'never'
          ? !1
          : this.reducedMotionConfig === 'always'
            ? !0
            : y1.current),
      this.parent)
    )
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    (J3.delete(this.current),
      this.projection && this.projection.unmount(),
      pu(this.notifyUpdate),
      pu(this.render),
      this.valueSubscriptions.forEach(u => u()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this));
    for (let u in this.events) this.events[u].clear();
    for (let u in this.features) {
      let n = this.features[u];
      if (n) (n.unmount(), (n.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(u, n) {
    if (this.valueSubscriptions.has(u)) this.valueSubscriptions.get(u)();
    let f = Tu.has(u),
      l = n.on('change', c => {
        if (
          ((this.latestValues[u] = c),
          this.props.onUpdate && D.preRender(this.notifyUpdate),
          f && this.projection)
        )
          this.projection.isTransformDirty = !0;
      }),
      t = n.on('renderRequest', this.scheduleRender),
      r;
    if (window.MotionCheckAppearSync)
      r = window.MotionCheckAppearSync(this, u, n);
    this.valueSubscriptions.set(u, () => {
      if ((l(), t(), r)) r();
      if (n.owner) n.stop();
    });
  }
  sortNodePosition(u) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== u.type)
      return 0;
    return this.sortInstanceNodePosition(this.current, u.current);
  }
  updateFeatures() {
    let u = 'animation';
    for (u in Tn) {
      let n = Tn[u];
      if (!n) continue;
      let { isEnabled: f, Feature: l } = n;
      if (!this.features[u] && l && f(this.props))
        this.features[u] = new l(this);
      if (this.features[u]) {
        let t = this.features[u];
        if (t.isMounted) t.update();
        else (t.mount(), (t.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : y();
  }
  getStaticValue(u) {
    return this.latestValues[u];
  }
  setStaticValue(u, n) {
    this.latestValues[u] = n;
  }
  update(u, n) {
    if (u.transformTemplate || this.props.transformTemplate)
      this.scheduleRender();
    ((this.prevProps = this.props),
      (this.props = u),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n));
    for (let f = 0; f < u_.length; f++) {
      let l = u_[f];
      if (this.propEventSubscriptions[l])
        (this.propEventSubscriptions[l](),
          delete this.propEventSubscriptions[l]);
      let t = 'on' + l,
        r = u[t];
      if (r) this.propEventSubscriptions[l] = this.on(l, r);
    }
    if (
      ((this.prevMotionValues = a9(
        this,
        this.scrapeMotionValuesFromProps(u, this.prevProps, this),
        this.prevMotionValues
      )),
      this.handleChildMotionValue)
    )
      this.handleChildMotionValue();
    this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  getVariant(u) {
    return this.props.variants ? this.props.variants[u] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(u) {
    let n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(u),
        () => n.variantChildren.delete(u)
      );
  }
  addValue(u, n) {
    let f = this.values.get(u);
    if (n !== f) {
      if (f) this.removeValue(u);
      (this.bindToMotionValue(u, n),
        this.values.set(u, n),
        (this.latestValues[u] = n.get()));
    }
  }
  removeValue(u) {
    this.values.delete(u);
    let n = this.valueSubscriptions.get(u);
    if (n) (n(), this.valueSubscriptions.delete(u));
    (delete this.latestValues[u],
      this.removeValueFromRenderState(u, this.renderState));
  }
  hasValue(u) {
    return this.values.has(u);
  }
  getValue(u, n) {
    if (this.props.values && this.props.values[u]) return this.props.values[u];
    let f = this.values.get(u);
    if (f === void 0 && n !== void 0)
      ((f = xn(n === null ? void 0 : n, { owner: this })), this.addValue(u, f));
    return f;
  }
  readValue(u, n) {
    var f;
    let l =
      this.latestValues[u] !== void 0 || !this.current
        ? this.latestValues[u]
        : (f = this.getBaseTargetFromProps(this.props, u)) !== null &&
            f !== void 0
          ? f
          : this.readValueFromInstance(this.current, u, this.options);
    if (l !== void 0 && l !== null) {
      if (typeof l === 'string' && (Uc(l) || Nc(l))) l = parseFloat(l);
      else if (!s9(l) && Du.test(n)) l = $c(u, n);
      this.setBaseTarget(u, j(l) ? l.get() : l);
    }
    return j(l) ? l.get() : l;
  }
  setBaseTarget(u, n) {
    this.baseTarget[u] = n;
  }
  getBaseTarget(u) {
    var n;
    let { initial: f } = this.props,
      l;
    if (typeof f === 'string' || typeof f === 'object') {
      let r = bf(
        this.props,
        f,
        (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom
      );
      if (r) l = r[u];
    }
    if (f && l !== void 0) return l;
    let t = this.getBaseTargetFromProps(this.props, u);
    if (t !== void 0 && !j(t)) return t;
    return this.initialValues[u] !== void 0 && l === void 0
      ? void 0
      : this.baseTarget[u];
  }
  on(u, n) {
    if (!this.events[u]) this.events[u] = new e0();
    return this.events[u].add(n);
  }
  notify(u, ...n) {
    if (this.events[u]) this.events[u].notify(...n);
  }
}
class p1 extends Y3 {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = T1;
  }
  sortInstanceNodePosition(u, n) {
    return u.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(u, n) {
    return u.style ? u.style[n] : void 0;
  }
  removeValueFromRenderState(u, { vars: n, style: f }) {
    (delete n[u], delete f[u]);
  }
  handleChildMotionValue() {
    if (this.childSubscription)
      (this.childSubscription(), delete this.childSubscription);
    let { children: u } = this.props;
    if (j(u))
      this.childSubscription = u.on('change', n => {
        if (this.current) this.current.textContent = `${n}`;
      });
  }
}
function qZ(u) {
  return window.getComputedStyle(u);
}
class H3 extends p1 {
  constructor() {
    super(...arguments);
    ((this.type = 'html'), (this.renderInstance = jr));
  }
  readValueFromInstance(u, n) {
    if (Tu.has(n)) {
      let f = Wl(n);
      return f ? f.default || 0 : 0;
    } else {
      let f = qZ(u),
        l = (gr(n) ? f.getPropertyValue(n) : f[n]) || 0;
      return typeof l === 'string' ? l.trim() : l;
    }
  }
  measureInstanceViewportBox(u, { transformPagePoint: n }) {
    return mw(u, n);
  }
  build(u, n, f) {
    af(u, n, f.transformTemplate);
  }
  scrapeMotionValuesFromProps(u, n, f) {
    return tl(u, n, f);
  }
}
class I3 extends p1 {
  constructor() {
    super(...arguments);
    ((this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = y));
  }
  getBaseTargetFromProps(u, n) {
    return u[n];
  }
  readValueFromInstance(u, n) {
    if (Tu.has(n)) {
      let f = Wl(n);
      return f ? f.default || 0 : 0;
    }
    return ((n = !or.has(n) ? Vf(n) : n), u.getAttribute(n));
  }
  scrapeMotionValuesFromProps(u, n, f) {
    return vr(u, n, f);
  }
  build(u, n, f) {
    ul(u, n, this.isSVGTag, f.transformTemplate);
  }
  renderInstance(u, n, f, l) {
    xr(u, n, f, l);
  }
  mount(u) {
    ((this.isSVGTag = fl(u.tagName)), super.mount(u));
  }
}
var f_ = (u, n) => {
  return pf(u) ? new I3(n) : new H3(n, { allowProjection: u !== n_.Fragment });
};
var l_ = Gz({ ...D7, ...b9, ...v9, ...m9 }, f_);
var Rc = m6(l_);
var r_ = ({
  currentEpisode: u,
  onEpisodeChange: n,
  nextEpisode: f,
  previousEpisode: l,
  jumpToEpisode: t,
  isPlaying: r,
  togglePlay: c,
  arcs: h,
}) => {
  let [w, z] = t_.useState(!1);
  return V('div', {
    className:
      'absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 flex flex-col gap-4',
    onMouseEnter: () => z(!0),
    onMouseLeave: () => z(!1),
    children: [
      V(Rc.div, {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        className:
          'self-center bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full flex items-center gap-4 shadow-lg',
        children: [
          C('span', {
            className:
              'text-xs font-black text-cyan-400 tracking-widest uppercase',
            children: 'Current Log',
          }),
          C('div', { className: 'h-4 w-px bg-white/20' }),
          V('span', {
            className: 'text-sm font-bold text-white',
            children: ['Episode ', u],
          }),
        ],
      }),
      V('div', {
        className:
          'bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden group',
        children: [
          V('div', {
            className: 'relative h-12 flex items-center gap-4',
            children: [
              C('button', {
                onClick: c,
                className:
                  'w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)]',
                children: r
                  ? C(O1, { size: 18, fill: 'currentColor' })
                  : C(F1, {
                      size: 18,
                      fill: 'currentColor',
                      className: 'ml-0.5',
                    }),
              }),
              V('div', {
                className:
                  'flex-1 relative h-2 bg-white/10 rounded-full cursor-pointer group/slider',
                children: [
                  C('div', {
                    className:
                      'absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full',
                    style: { width: `${(u / 1120) * 100}%` },
                  }),
                  C('input', {
                    type: 'range',
                    min: '1',
                    max: '1120',
                    value: u,
                    onChange: _ => n(parseInt(_.target.value)),
                    className:
                      'absolute inset-0 w-full h-full opacity-0 cursor-pointer',
                  }),
                ],
              }),
              V('div', {
                className: 'flex gap-2 text-white/50',
                children: [
                  C('button', {
                    onClick: l,
                    className: 'hover:text-white transition-colors',
                    children: C(I1, { size: 20 }),
                  }),
                  C('button', {
                    onClick: f,
                    className: 'hover:text-white transition-colors',
                    children: C(X1, { size: 20 }),
                  }),
                ],
              }),
            ],
          }),
          C(Rc.div, {
            className:
              'flex gap-1 overflow-x-auto no-scrollbar mt-2 pt-2 border-t border-white/5',
            initial: { height: 0, opacity: 0 },
            animate: { height: w ? 'auto' : 0, opacity: w ? 1 : 0 },
            children: h.map(_ =>
              C(
                'button',
                {
                  onClick: () => t(_.startEp),
                  className: `flex-shrink-0 px-3 py-1 text-[10px] font-bold uppercase rounded-md border transition-all ${u >= _.startEp && u <= _.endEp ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`,
                  children: _.name,
                },
                _.name
              )
            ),
          }),
        ],
      }),
    ],
  });
};
var X3 = {
  islands: [
    {
      id: 'foosha',
      name: 'Foosha Village',
      sea: 'East Blue',
      lat: -22,
      lon: -155,
      arc: 'Romance Dawn',
      episodes: [1, 3],
      characters: ['Luffy', 'Shanks'],
      importance: 'Major',
      visual: 'village',
    },
    {
      id: 'shells',
      name: 'Shells Town',
      sea: 'East Blue',
      lat: -15,
      lon: -145,
      arc: 'Romance Dawn',
      episodes: [2, 3],
      characters: ['Zoro', 'Morgan'],
      importance: 'Minor',
      visual: 'fort',
    },
    {
      id: 'baratie',
      name: 'Baratie',
      sea: 'East Blue',
      lat: 4,
      lon: -115,
      arc: 'Baratie',
      episodes: [19, 30],
      characters: ['Sanji', 'Mihawk'],
      importance: 'Major',
      visual: 'ship',
    },
    {
      id: 'loguetown',
      name: 'Loguetown',
      sea: 'East Blue',
      lat: 12,
      lon: -95,
      arc: 'Loguetown',
      episodes: [45, 53],
      characters: ['Smoker', 'Dragon'],
      importance: 'Legendary',
      visual: 'city',
    },
    {
      id: 'reverse',
      name: 'Reverse Mountain',
      sea: 'Grand Line',
      lat: 0,
      lon: -90,
      arc: 'Reverse Mountain',
      episodes: [61, 63],
      characters: ['Laboon', 'Crocus'],
      importance: 'Major',
      visual: 'mountain',
    },
    {
      id: 'drum',
      name: 'Drum Island',
      sea: 'Grand Line',
      lat: 4,
      lon: -45,
      arc: 'Drum Island',
      episodes: [78, 91],
      characters: ['Chopper'],
      importance: 'Major',
      visual: 'peaks',
      weather: 'snow',
    },
    {
      id: 'arabasta',
      name: 'Alabasta',
      sea: 'Grand Line',
      lat: -4,
      lon: -30,
      arc: 'Alabasta',
      episodes: [92, 130],
      characters: ['Vivi', 'Crocodile', 'Ace'],
      importance: 'Legendary',
      visual: 'desert_city',
    },
    {
      id: 'skypiea',
      name: 'Skypiea',
      sea: 'Grand Line',
      lat: 0,
      lon: -10,
      arc: 'Skypiea',
      episodes: [153, 195],
      characters: ['Enel'],
      importance: 'Major',
      visual: 'cloud_temple',
      hasPoneglyph: !0,
    },
    {
      id: 'water7',
      name: 'Water 7',
      sea: 'Grand Line',
      lat: 3,
      lon: 15,
      arc: 'Water 7',
      episodes: [229, 263],
      characters: ['Franky'],
      importance: 'Legendary',
      visual: 'water_city',
    },
    {
      id: 'enies',
      name: 'Enies Lobby',
      sea: 'Grand Line',
      lat: -3,
      lon: 30,
      arc: 'Enies Lobby',
      episodes: [264, 312],
      characters: ['Robin', 'Luccy'],
      importance: 'Legendary',
      visual: 'judicial_tower',
    },
    {
      id: 'thriller',
      name: 'Thriller Bark',
      sea: 'Grand Line',
      lat: 0,
      lon: 60,
      arc: 'Thriller Bark',
      episodes: [337, 381],
      characters: ['Brook'],
      importance: 'Major',
      visual: 'ship',
    },
    {
      id: 'sabaody',
      name: 'Sabaody',
      sea: 'Grand Line',
      lat: 0,
      lon: 85,
      arc: 'Sabaody',
      episodes: [385, 405],
      characters: ['Rayleigh', 'Kizaru'],
      importance: 'Legendary',
      visual: 'mangrove',
      weather: 'bubbles',
    },
    {
      id: 'marineford',
      name: 'Marineford',
      sea: 'Grand Line',
      lat: 5,
      lon: 88,
      arc: 'Marineford',
      episodes: [457, 489],
      characters: ['Whitebeard'],
      importance: 'Legendary',
      visual: 'fortress',
    },
    {
      id: 'fishman',
      name: 'Fishman Island',
      sea: 'New World',
      lat: 0,
      lon: 95,
      arc: 'Fishman Island',
      episodes: [517, 574],
      characters: ['Jimbei'],
      importance: 'Major',
      visual: 'mangrove',
      hasPoneglyph: !0,
    },
    {
      id: 'dressrosa',
      name: 'Dressrosa',
      sea: 'New World',
      lat: -5,
      lon: 130,
      arc: 'Dressrosa',
      episodes: [629, 746],
      characters: ['Doflamingo'],
      importance: 'Legendary',
      visual: 'colosseum',
    },
    {
      id: 'zou',
      name: 'Zou',
      sea: 'New World',
      lat: 2,
      lon: 145,
      arc: 'Zou',
      episodes: [751, 779],
      characters: ['Minks'],
      importance: 'Major',
      visual: 'elephant',
      hasPoneglyph: !0,
    },
    {
      id: 'wano',
      name: 'Wano Country',
      sea: 'New World',
      lat: 8,
      lon: 165,
      arc: 'Wano',
      episodes: [892, 1085],
      characters: ['Kaido', 'Yamato'],
      importance: 'Legendary',
      visual: 'pagoda',
      weather: 'sakura',
      hasPoneglyph: !0,
    },
    {
      id: 'egghead',
      name: 'Egghead',
      sea: 'New World',
      lat: 0,
      lon: 178,
      arc: 'Egghead',
      episodes: [1086, 1120],
      characters: ['Vegapunk'],
      importance: 'Major',
      visual: 'lab',
    },
  ],
  paths: {
    strawhats: [
      'foosha',
      'shells',
      'baratie',
      'loguetown',
      'reverse',
      'drum',
      'arabasta',
      'skypiea',
      'water7',
      'enies',
      'thriller',
      'sabaody',
      'marineford',
      'fishman',
      'dressrosa',
      'zou',
      'wano',
      'egghead',
    ],
    law: [
      'sabaody',
      'marineford',
      'punk',
      'dressrosa',
      'zou',
      'wano',
      'egghead',
    ],
    ace: ['foosha', 'arabasta', 'marineford'],
  },
  bounties: [
    { ep: 1, amount: 0 },
    { ep: 45, amount: 30000000 },
    { ep: 130, amount: 1e8 },
    { ep: 312, amount: 300000000 },
    { ep: 489, amount: 400000000 },
    { ep: 746, amount: 500000000 },
    { ep: 890, amount: 1500000000 },
    { ep: 1085, amount: 3000000000 },
  ],
  crew: [
    { name: 'Luffy', joinEp: 1 },
    { name: 'Zoro', joinEp: 3 },
    { name: 'Nami', joinEp: 8 },
    { name: 'Usopp', joinEp: 18 },
    { name: 'Sanji', joinEp: 30 },
    { name: 'Chopper', joinEp: 91 },
    { name: 'Robin', joinEp: 130 },
    { name: 'Franky', joinEp: 312 },
    { name: 'Brook', joinEp: 381 },
    { name: 'Jimbei', joinEp: 890 },
    { name: 'Vivi', joinEp: 67, leaveEp: 130 },
  ],
};
var c_ = (u, n) => {
  if (!n) return null;
  return u.find(f => f.id === n) || null;
};
var z_ = () => {
    let [u, n] = tn.useState(null),
      [f, l] = tn.useState('strawhats'),
      [t, r] = tn.useState(null),
      c = tn.useRef(null),
      [h, w] = tn.useState(1116),
      {
        nextEpisode: z,
        previousEpisode: _,
        jumpToEpisode: N,
        isPlaying: Q,
        togglePlay: Z,
        stop: Y,
        playSpeed: H,
        setPlaySpeed: F,
        arcs: U,
      } = P6({ initialEpisode: h, onEpisodeChange: w }),
      $ = tn.useMemo(() => {
        return X3.islands;
      }, []),
      { flyToIsland: W } = C6({
        containerRef: c,
        activeIslands: $,
        selectedVoyage: f,
        onIslandClick: I => {
          (n(I.id), W(I));
        },
        onIslandHover: I => r(I),
      }),
      J = tn.useMemo(() => c_(X3.islands, u), [u]);
    return V('div', {
      className:
        'relative w-full h-screen bg-[#020617] overflow-hidden font-sans text-white',
      children: [
        C('div', { ref: c, className: 'absolute inset-0 z-0' }),
        V('div', {
          className: 'absolute top-8 left-8 z-10 flex items-center gap-6',
          children: [
            V('div', {
              className: 'relative group',
              children: [
                C('div', {
                  className:
                    'absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity',
                }),
                C('div', {
                  className:
                    'relative w-16 h-16 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center',
                  children: C(L1, {
                    className:
                      'w-8 h-8 text-cyan-400 animate-[spin_10s_linear_infinite]',
                  }),
                }),
              ],
            }),
            V('div', {
              children: [
                C('h1', {
                  className:
                    'text-3xl font-black italic tracking-tighter uppercase leading-none',
                  children: 'Grand Line',
                }),
                C('p', {
                  className:
                    'text-xs font-bold text-cyan-400 tracking-[0.3em] uppercase mt-1',
                  children: 'Atlas System v2.0',
                }),
              ],
            }),
          ],
        }),
        C('div', {
          className:
            'absolute top-8 right-8 z-10 flex flex-col items-end gap-4',
          children: C('div', {
            className:
              'flex gap-2 p-1 bg-black/40 backdrop-blur-xl rounded-full border border-white/10',
            children: ['strawhats', 'law', 'ace'].map(I =>
              C(
                'button',
                {
                  onClick: () => l(I),
                  className: `px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${f === I ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-white/60 hover:bg-white/10'}`,
                  children: I,
                },
                I
              )
            ),
          }),
        }),
        t &&
          C('div', {
            className:
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center',
            style: { transform: 'translate(-50%, -150px)' },
            children: V('div', {
              className: 'flex flex-col items-center gap-1',
              children: [
                C('div', {
                  className:
                    'w-px h-8 bg-gradient-to-b from-transparent to-cyan-400',
                }),
                V('div', {
                  className:
                    'bg-black/80 backdrop-blur-md border border-cyan-500/30 px-6 py-3 rounded-lg flex flex-col items-center shadow-[0_0_30px_rgba(6,182,212,0.2)]',
                  children: [
                    C('h2', {
                      className:
                        'text-xl font-black uppercase italic tracking-wider text-white',
                      children: t.name,
                    }),
                    V('div', {
                      className:
                        'flex gap-3 text-[10px] font-bold text-cyan-300 uppercase tracking-widest mt-1',
                      children: [
                        C('span', { children: t.sea }),
                        C('span', { children: '•' }),
                        C('span', { children: t.visual }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        C(r_, {
          currentEpisode: h,
          onEpisodeChange: w,
          nextEpisode: z,
          previousEpisode: _,
          jumpToEpisode: N,
          isPlaying: Q,
          togglePlay: Z,
          stop: Y,
          playSpeed: H,
          setPlaySpeed: F,
          arcs: U,
        }),
        J &&
          V('div', {
            className:
              'absolute top-1/2 right-8 -translate-y-1/2 w-80 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl z-20',
            children: [
              V('div', {
                className: 'flex justify-between items-start mb-6',
                children: [
                  C('h2', {
                    className:
                      'text-3xl font-black uppercase italic text-white leading-none',
                    children: J.name,
                  }),
                  C('button', {
                    onClick: () => n(null),
                    className:
                      'w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10',
                    children: '✕',
                  }),
                ],
              }),
              V('div', {
                className: 'space-y-6',
                children: [
                  V('div', {
                    className: 'space-y-1',
                    children: [
                      C('p', {
                        className:
                          'text-[10px] uppercase tracking-widest text-white/40 font-bold',
                        children: 'Region',
                      }),
                      C('p', {
                        className: 'text-lg font-bold text-cyan-400',
                        children: J.sea,
                      }),
                    ],
                  }),
                  V('div', {
                    className: 'space-y-1',
                    children: [
                      C('p', {
                        className:
                          'text-[10px] uppercase tracking-widest text-white/40 font-bold',
                        children: 'Arc',
                      }),
                      C('p', {
                        className: 'text-lg font-bold text-white',
                        children: J.arc,
                      }),
                    ],
                  }),
                  J.hasPoneglyph &&
                    V('div', {
                      className:
                        'p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3',
                      children: [
                        C('div', {
                          className:
                            'w-2 h-2 bg-red-500 rounded-full animate-pulse',
                        }),
                        C('span', {
                          className:
                            'text-xs font-bold text-red-200 uppercase tracking-wider',
                          children: 'Poneglyph Detected',
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
        C('div', {
          className:
            'absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80',
        }),
      ],
    });
  },
  sK = z_,
  h_ = document.getElementById('root');
if (h_) w_.createRoot(h_).render(tn.default.createElement(z_));
export { sK as default };

//# debugId=9B8ACA31AB17AE3A64756E2164756E21
