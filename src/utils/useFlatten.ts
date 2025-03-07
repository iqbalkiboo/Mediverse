export const transformResponseFlatArray = (json: any): string[] => {
  let keys: string[] = [];

  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      keys.push(key);

      if (typeof json[key] === 'object') {
        keys = keys.concat(transformResponseFlatArray(json[key]));
      }
    }
  }
  return keys;
};


export const createOptionsFromArrayString = (params: string[]) => {
  let result = [] as any;
  const newSetKey1 = [...new Set(params.filter((prop: any) => isNaN(prop)))];
  const obj1 = newSetKey1.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
  result = Object.entries(obj1).map(([key, value]) => ({label: key, value}));

  return result;
};
