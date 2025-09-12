/*
 * @Author: 唐宇
 * @Date: 2025-09-02 16:16:15
 * @LastEditors: 唐宇
 * @LastEditTime: 2025-09-11 10:19:05
 * @FilePath: \survey-frontend\src\utils\lodash.ts
 * @Description: 常用lodash工具函数
 *
 * Copyright (c) 2025 by 唐宇, All Rights Reserved.
 */
export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEqual = (a: any, b: any): boolean => {
  // 处理基本类型和相同引用
  if (a === b) {
    // 处理 NaN !== NaN 的情况
    return a === b || (a !== a && b !== b);
  }

  // 处理 null 和 undefined
  if (a == null || b == null) {
    return a === b;
  }

  // 处理类型不同的情况
  if (typeof a !== typeof b) {
    return false;
  }

  // 使用WeakMap处理循环引用
  const cache = new WeakMap<object, object>();
  return _isEqual(a, b, cache);
};

const _isEqual = (a: any, b: any, cache: WeakMap<object, object>): boolean => {
  // 处理基本类型
  if (a === b) {
    return a === b || (a !== a && b !== b);
  }

  // 处理 null 和 undefined
  if (a == null || b == null) {
    return a === b;
  }

  // 处理类型不同的情况
  if (typeof a !== typeof b) {
    return false;
  }

  // 处理数组
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!_isEqual(a[i], b[i], cache)) return false;
    }

    return true;
  }

  // 处理日期对象
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // 处理正则表达式
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // 处理Map
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;

    let isEqual = true;
    a.forEach((value, key) => {
      if (!b.has(key) || !_isEqual(value, b.get(key), cache)) {
        isEqual = false;
      }
    });

    return isEqual;
  }

  // 处理Set
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;

    let isEqual = true;
    a.forEach(value => {
      if (!b.has(value)) {
        isEqual = false;
      }
    });

    return isEqual;
  }

  // 处理普通对象
  if (typeof a === 'object' && typeof b === 'object') {
    // 检查循环引用
    if (cache.has(a) && cache.get(a) === b) {
      return true;
    }
    cache.set(a, b);

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, key) || !_isEqual(a[key], b[key], cache)) {
        return false;
      }
    }

    // 处理Symbol作为键的情况
    const aSymbols = Object.getOwnPropertySymbols(a);
    const bSymbols = Object.getOwnPropertySymbols(b);

    if (aSymbols.length !== bSymbols.length) {
      return false;
    }

    for (const symbol of aSymbols) {
      if (
        !Object.prototype.hasOwnProperty.call(b, symbol) ||
        !_isEqual(a[symbol], b[symbol], cache)
      ) {
        return false;
      }
    }

    return true;
  }

  // 其他情况视为不相等
  return false;
};
