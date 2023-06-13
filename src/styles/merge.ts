const isPlainObject = (obj: any) =>
  !(obj instanceof Date) && obj === Object(obj) && !Array.isArray(obj);

const keys = (obj: any) => {
  return obj === Object(obj) ? Object.keys(obj) : [];
};

const mergeDeep = (target: any, source: any) => {
  let output = Object.assign({}, target);
  if (isPlainObject(target) && isPlainObject(source)) {
    keys(source).forEach((key: any) => {
      if (isPlainObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

export const merge = (target: any, ...sources: any) => {
  return sources.reduce((t: any, s: any) => {
    return mergeDeep(t, s);
  }, target);
};
