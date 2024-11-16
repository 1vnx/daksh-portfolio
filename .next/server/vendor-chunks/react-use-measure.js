"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-use-measure";
exports.ids = ["vendor-chunks/react-use-measure"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-use-measure/dist/web.js":
/*!****************************************************!*\
  !*** ./node_modules/react-use-measure/dist/web.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ useMeasure)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debounce */ \"(ssr)/./node_modules/debounce/index.js\");\n/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction useMeasure(_temp) {\n  let {\n    debounce,\n    scroll,\n    polyfill,\n    offsetSize\n  } = _temp === void 0 ? {\n    debounce: 0,\n    scroll: false,\n    offsetSize: false\n  } : _temp;\n  const ResizeObserver = polyfill || (typeof window === 'undefined' ? class ResizeObserver {} : window.ResizeObserver);\n\n  if (!ResizeObserver) {\n    throw new Error('This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills');\n  }\n\n  const [bounds, set] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n    left: 0,\n    top: 0,\n    width: 0,\n    height: 0,\n    bottom: 0,\n    right: 0,\n    x: 0,\n    y: 0\n  }); // keep all state in a ref\n\n  const state = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({\n    element: null,\n    scrollContainers: null,\n    resizeObserver: null,\n    lastBounds: bounds\n  }); // set actual debounce values early, so effects know if they should react accordingly\n\n  const scrollDebounce = debounce ? typeof debounce === 'number' ? debounce : debounce.scroll : null;\n  const resizeDebounce = debounce ? typeof debounce === 'number' ? debounce : debounce.resize : null; // make sure to update state only as long as the component is truly mounted\n\n  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    mounted.current = true;\n    return () => void (mounted.current = false);\n  }); // memoize handlers, so event-listeners know when they should update\n\n  const [forceRefresh, resizeChange, scrollChange] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {\n    const callback = () => {\n      if (!state.current.element) return;\n      const {\n        left,\n        top,\n        width,\n        height,\n        bottom,\n        right,\n        x,\n        y\n      } = state.current.element.getBoundingClientRect();\n      const size = {\n        left,\n        top,\n        width,\n        height,\n        bottom,\n        right,\n        x,\n        y\n      };\n\n      if (state.current.element instanceof HTMLElement && offsetSize) {\n        size.height = state.current.element.offsetHeight;\n        size.width = state.current.element.offsetWidth;\n      }\n\n      Object.freeze(size);\n      if (mounted.current && !areBoundsEqual(state.current.lastBounds, size)) set(state.current.lastBounds = size);\n    };\n\n    return [callback, resizeDebounce ? debounce__WEBPACK_IMPORTED_MODULE_1___default()(callback, resizeDebounce) : callback, scrollDebounce ? debounce__WEBPACK_IMPORTED_MODULE_1___default()(callback, scrollDebounce) : callback];\n  }, [set, offsetSize, scrollDebounce, resizeDebounce]); // cleanup current scroll-listeners / observers\n\n  function removeListeners() {\n    if (state.current.scrollContainers) {\n      state.current.scrollContainers.forEach(element => element.removeEventListener('scroll', scrollChange, true));\n      state.current.scrollContainers = null;\n    }\n\n    if (state.current.resizeObserver) {\n      state.current.resizeObserver.disconnect();\n      state.current.resizeObserver = null;\n    }\n  } // add scroll-listeners / observers\n\n\n  function addListeners() {\n    if (!state.current.element) return;\n    state.current.resizeObserver = new ResizeObserver(scrollChange);\n    state.current.resizeObserver.observe(state.current.element);\n\n    if (scroll && state.current.scrollContainers) {\n      state.current.scrollContainers.forEach(scrollContainer => scrollContainer.addEventListener('scroll', scrollChange, {\n        capture: true,\n        passive: true\n      }));\n    }\n  } // the ref we expose to the user\n\n\n  const ref = node => {\n    if (!node || node === state.current.element) return;\n    removeListeners();\n    state.current.element = node;\n    state.current.scrollContainers = findScrollContainers(node);\n    addListeners();\n  }; // add general event listeners\n\n\n  useOnWindowScroll(scrollChange, Boolean(scroll));\n  useOnWindowResize(resizeChange); // respond to changes that are relevant for the listeners\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    removeListeners();\n    addListeners();\n  }, [scroll, scrollChange, resizeChange]); // remove all listeners when the components unmounts\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => removeListeners, []);\n  return [ref, bounds, forceRefresh];\n} // Adds native resize listener to window\n\n\nfunction useOnWindowResize(onWindowResize) {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const cb = onWindowResize;\n    window.addEventListener('resize', cb);\n    return () => void window.removeEventListener('resize', cb);\n  }, [onWindowResize]);\n}\n\nfunction useOnWindowScroll(onScroll, enabled) {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (enabled) {\n      const cb = onScroll;\n      window.addEventListener('scroll', cb, {\n        capture: true,\n        passive: true\n      });\n      return () => void window.removeEventListener('scroll', cb, true);\n    }\n  }, [onScroll, enabled]);\n} // Returns a list of scroll offsets\n\n\nfunction findScrollContainers(element) {\n  const result = [];\n  if (!element || element === document.body) return result;\n  const {\n    overflow,\n    overflowX,\n    overflowY\n  } = window.getComputedStyle(element);\n  if ([overflow, overflowX, overflowY].some(prop => prop === 'auto' || prop === 'scroll')) result.push(element);\n  return [...result, ...findScrollContainers(element.parentElement)];\n} // Checks if element boundaries are equal\n\n\nconst keys = ['x', 'y', 'top', 'bottom', 'left', 'right', 'width', 'height'];\n\nconst areBoundsEqual = (a, b) => keys.every(key => a[key] === b[key]);\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlLW1lYXN1cmUvZGlzdC93ZWIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBNkQ7QUFDdkI7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osOEZBQThGOztBQUU5RjtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLCtDQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLEdBQUc7O0FBRU4sZ0JBQWdCLDZDQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxHQUFHOztBQUVOO0FBQ0Esc0dBQXNHOztBQUV0RyxrQkFBa0IsNkNBQU07QUFDeEIsRUFBRSxnREFBUztBQUNYO0FBQ0E7QUFDQSxHQUFHLEdBQUc7O0FBRU4scURBQXFELDhDQUFPO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVDQUF1QywrQ0FBYyx3REFBd0QsK0NBQWM7QUFDM0gsR0FBRyxzREFBc0Q7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0EsbUNBQW1DOztBQUVuQyxFQUFFLGdEQUFTO0FBQ1g7QUFDQTtBQUNBLEdBQUcseUNBQXlDOztBQUU1QyxFQUFFLGdEQUFTO0FBQ1g7QUFDQSxFQUFFOzs7QUFHRjtBQUNBLEVBQUUsZ0RBQVM7QUFDWDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSxFQUFFLGdEQUFTO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxFQUFFOzs7QUFHRjs7QUFFQTs7QUFFaUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb3J0Zm9saW8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlLW1lYXN1cmUvZGlzdC93ZWIuanM/MjIxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlRGVib3VuY2UgZnJvbSAnZGVib3VuY2UnO1xuXG5mdW5jdGlvbiB1c2VNZWFzdXJlKF90ZW1wKSB7XG4gIGxldCB7XG4gICAgZGVib3VuY2UsXG4gICAgc2Nyb2xsLFxuICAgIHBvbHlmaWxsLFxuICAgIG9mZnNldFNpemVcbiAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7XG4gICAgZGVib3VuY2U6IDAsXG4gICAgc2Nyb2xsOiBmYWxzZSxcbiAgICBvZmZzZXRTaXplOiBmYWxzZVxuICB9IDogX3RlbXA7XG4gIGNvbnN0IFJlc2l6ZU9ic2VydmVyID0gcG9seWZpbGwgfHwgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gY2xhc3MgUmVzaXplT2JzZXJ2ZXIge30gOiB3aW5kb3cuUmVzaXplT2JzZXJ2ZXIpO1xuXG4gIGlmICghUmVzaXplT2JzZXJ2ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFJlc2l6ZU9ic2VydmVyIG91dCBvZiB0aGUgYm94LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdC1zcHJpbmcvcmVhY3QtdXNlLW1lYXN1cmUvI3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbHMnKTtcbiAgfVxuXG4gIGNvbnN0IFtib3VuZHMsIHNldF0gPSB1c2VTdGF0ZSh7XG4gICAgbGVmdDogMCxcbiAgICB0b3A6IDAsXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICByaWdodDogMCxcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfSk7IC8vIGtlZXAgYWxsIHN0YXRlIGluIGEgcmVmXG5cbiAgY29uc3Qgc3RhdGUgPSB1c2VSZWYoe1xuICAgIGVsZW1lbnQ6IG51bGwsXG4gICAgc2Nyb2xsQ29udGFpbmVyczogbnVsbCxcbiAgICByZXNpemVPYnNlcnZlcjogbnVsbCxcbiAgICBsYXN0Qm91bmRzOiBib3VuZHNcbiAgfSk7IC8vIHNldCBhY3R1YWwgZGVib3VuY2UgdmFsdWVzIGVhcmx5LCBzbyBlZmZlY3RzIGtub3cgaWYgdGhleSBzaG91bGQgcmVhY3QgYWNjb3JkaW5nbHlcblxuICBjb25zdCBzY3JvbGxEZWJvdW5jZSA9IGRlYm91bmNlID8gdHlwZW9mIGRlYm91bmNlID09PSAnbnVtYmVyJyA/IGRlYm91bmNlIDogZGVib3VuY2Uuc2Nyb2xsIDogbnVsbDtcbiAgY29uc3QgcmVzaXplRGVib3VuY2UgPSBkZWJvdW5jZSA/IHR5cGVvZiBkZWJvdW5jZSA9PT0gJ251bWJlcicgPyBkZWJvdW5jZSA6IGRlYm91bmNlLnJlc2l6ZSA6IG51bGw7IC8vIG1ha2Ugc3VyZSB0byB1cGRhdGUgc3RhdGUgb25seSBhcyBsb25nIGFzIHRoZSBjb21wb25lbnQgaXMgdHJ1bHkgbW91bnRlZFxuXG4gIGNvbnN0IG1vdW50ZWQgPSB1c2VSZWYoZmFsc2UpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG1vdW50ZWQuY3VycmVudCA9IHRydWU7XG4gICAgcmV0dXJuICgpID0+IHZvaWQgKG1vdW50ZWQuY3VycmVudCA9IGZhbHNlKTtcbiAgfSk7IC8vIG1lbW9pemUgaGFuZGxlcnMsIHNvIGV2ZW50LWxpc3RlbmVycyBrbm93IHdoZW4gdGhleSBzaG91bGQgdXBkYXRlXG5cbiAgY29uc3QgW2ZvcmNlUmVmcmVzaCwgcmVzaXplQ2hhbmdlLCBzY3JvbGxDaGFuZ2VdID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBpZiAoIXN0YXRlLmN1cnJlbnQuZWxlbWVudCkgcmV0dXJuO1xuICAgICAgY29uc3Qge1xuICAgICAgICBsZWZ0LFxuICAgICAgICB0b3AsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIGJvdHRvbSxcbiAgICAgICAgcmlnaHQsXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH0gPSBzdGF0ZS5jdXJyZW50LmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBzaXplID0ge1xuICAgICAgICBsZWZ0LFxuICAgICAgICB0b3AsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIGJvdHRvbSxcbiAgICAgICAgcmlnaHQsXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH07XG5cbiAgICAgIGlmIChzdGF0ZS5jdXJyZW50LmVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBvZmZzZXRTaXplKSB7XG4gICAgICAgIHNpemUuaGVpZ2h0ID0gc3RhdGUuY3VycmVudC5lbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgc2l6ZS53aWR0aCA9IHN0YXRlLmN1cnJlbnQuZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmZyZWV6ZShzaXplKTtcbiAgICAgIGlmIChtb3VudGVkLmN1cnJlbnQgJiYgIWFyZUJvdW5kc0VxdWFsKHN0YXRlLmN1cnJlbnQubGFzdEJvdW5kcywgc2l6ZSkpIHNldChzdGF0ZS5jdXJyZW50Lmxhc3RCb3VuZHMgPSBzaXplKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFtjYWxsYmFjaywgcmVzaXplRGVib3VuY2UgPyBjcmVhdGVEZWJvdW5jZShjYWxsYmFjaywgcmVzaXplRGVib3VuY2UpIDogY2FsbGJhY2ssIHNjcm9sbERlYm91bmNlID8gY3JlYXRlRGVib3VuY2UoY2FsbGJhY2ssIHNjcm9sbERlYm91bmNlKSA6IGNhbGxiYWNrXTtcbiAgfSwgW3NldCwgb2Zmc2V0U2l6ZSwgc2Nyb2xsRGVib3VuY2UsIHJlc2l6ZURlYm91bmNlXSk7IC8vIGNsZWFudXAgY3VycmVudCBzY3JvbGwtbGlzdGVuZXJzIC8gb2JzZXJ2ZXJzXG5cbiAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIGlmIChzdGF0ZS5jdXJyZW50LnNjcm9sbENvbnRhaW5lcnMpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnQuc2Nyb2xsQ29udGFpbmVycy5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxDaGFuZ2UsIHRydWUpKTtcbiAgICAgIHN0YXRlLmN1cnJlbnQuc2Nyb2xsQ29udGFpbmVycyA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmN1cnJlbnQucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHN0YXRlLmN1cnJlbnQucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgc3RhdGUuY3VycmVudC5yZXNpemVPYnNlcnZlciA9IG51bGw7XG4gICAgfVxuICB9IC8vIGFkZCBzY3JvbGwtbGlzdGVuZXJzIC8gb2JzZXJ2ZXJzXG5cblxuICBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFzdGF0ZS5jdXJyZW50LmVsZW1lbnQpIHJldHVybjtcbiAgICBzdGF0ZS5jdXJyZW50LnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHNjcm9sbENoYW5nZSk7XG4gICAgc3RhdGUuY3VycmVudC5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHN0YXRlLmN1cnJlbnQuZWxlbWVudCk7XG5cbiAgICBpZiAoc2Nyb2xsICYmIHN0YXRlLmN1cnJlbnQuc2Nyb2xsQ29udGFpbmVycykge1xuICAgICAgc3RhdGUuY3VycmVudC5zY3JvbGxDb250YWluZXJzLmZvckVhY2goc2Nyb2xsQ29udGFpbmVyID0+IHNjcm9sbENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxDaGFuZ2UsIHtcbiAgICAgICAgY2FwdHVyZTogdHJ1ZSxcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSAvLyB0aGUgcmVmIHdlIGV4cG9zZSB0byB0aGUgdXNlclxuXG5cbiAgY29uc3QgcmVmID0gbm9kZSA9PiB7XG4gICAgaWYgKCFub2RlIHx8IG5vZGUgPT09IHN0YXRlLmN1cnJlbnQuZWxlbWVudCkgcmV0dXJuO1xuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICAgIHN0YXRlLmN1cnJlbnQuZWxlbWVudCA9IG5vZGU7XG4gICAgc3RhdGUuY3VycmVudC5zY3JvbGxDb250YWluZXJzID0gZmluZFNjcm9sbENvbnRhaW5lcnMobm9kZSk7XG4gICAgYWRkTGlzdGVuZXJzKCk7XG4gIH07IC8vIGFkZCBnZW5lcmFsIGV2ZW50IGxpc3RlbmVyc1xuXG5cbiAgdXNlT25XaW5kb3dTY3JvbGwoc2Nyb2xsQ2hhbmdlLCBCb29sZWFuKHNjcm9sbCkpO1xuICB1c2VPbldpbmRvd1Jlc2l6ZShyZXNpemVDaGFuZ2UpOyAvLyByZXNwb25kIHRvIGNoYW5nZXMgdGhhdCBhcmUgcmVsZXZhbnQgZm9yIHRoZSBsaXN0ZW5lcnNcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICAgIGFkZExpc3RlbmVycygpO1xuICB9LCBbc2Nyb2xsLCBzY3JvbGxDaGFuZ2UsIHJlc2l6ZUNoYW5nZV0pOyAvLyByZW1vdmUgYWxsIGxpc3RlbmVycyB3aGVuIHRoZSBjb21wb25lbnRzIHVubW91bnRzXG5cbiAgdXNlRWZmZWN0KCgpID0+IHJlbW92ZUxpc3RlbmVycywgW10pO1xuICByZXR1cm4gW3JlZiwgYm91bmRzLCBmb3JjZVJlZnJlc2hdO1xufSAvLyBBZGRzIG5hdGl2ZSByZXNpemUgbGlzdGVuZXIgdG8gd2luZG93XG5cblxuZnVuY3Rpb24gdXNlT25XaW5kb3dSZXNpemUob25XaW5kb3dSZXNpemUpIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjYiA9IG9uV2luZG93UmVzaXplO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjYik7XG4gICAgcmV0dXJuICgpID0+IHZvaWQgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNiKTtcbiAgfSwgW29uV2luZG93UmVzaXplXSk7XG59XG5cbmZ1bmN0aW9uIHVzZU9uV2luZG93U2Nyb2xsKG9uU2Nyb2xsLCBlbmFibGVkKSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IGNiID0gb25TY3JvbGw7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2IsIHtcbiAgICAgICAgY2FwdHVyZTogdHJ1ZSxcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gKCkgPT4gdm9pZCB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2IsIHRydWUpO1xuICAgIH1cbiAgfSwgW29uU2Nyb2xsLCBlbmFibGVkXSk7XG59IC8vIFJldHVybnMgYSBsaXN0IG9mIHNjcm9sbCBvZmZzZXRzXG5cblxuZnVuY3Rpb24gZmluZFNjcm9sbENvbnRhaW5lcnMoZWxlbWVudCkge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgaWYgKCFlbGVtZW50IHx8IGVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHJldHVybiByZXN1bHQ7XG4gIGNvbnN0IHtcbiAgICBvdmVyZmxvdyxcbiAgICBvdmVyZmxvd1gsXG4gICAgb3ZlcmZsb3dZXG4gIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgaWYgKFtvdmVyZmxvdywgb3ZlcmZsb3dYLCBvdmVyZmxvd1ldLnNvbWUocHJvcCA9PiBwcm9wID09PSAnYXV0bycgfHwgcHJvcCA9PT0gJ3Njcm9sbCcpKSByZXN1bHQucHVzaChlbGVtZW50KTtcbiAgcmV0dXJuIFsuLi5yZXN1bHQsIC4uLmZpbmRTY3JvbGxDb250YWluZXJzKGVsZW1lbnQucGFyZW50RWxlbWVudCldO1xufSAvLyBDaGVja3MgaWYgZWxlbWVudCBib3VuZGFyaWVzIGFyZSBlcXVhbFxuXG5cbmNvbnN0IGtleXMgPSBbJ3gnLCAneScsICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAnd2lkdGgnLCAnaGVpZ2h0J107XG5cbmNvbnN0IGFyZUJvdW5kc0VxdWFsID0gKGEsIGIpID0+IGtleXMuZXZlcnkoa2V5ID0+IGFba2V5XSA9PT0gYltrZXldKTtcblxuZXhwb3J0IHsgdXNlTWVhc3VyZSBhcyBkZWZhdWx0IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use-measure/dist/web.js\n");

/***/ })

};
;