export const mapListSelect = (data: any, titleField?, valueField?) => {
  return data?.map((item) => {
    return {
      title: titleField ? item[titleField] : item.name,
      value: valueField ? item[valueField] : item.code,
    };
  });
};

export const mapListOption = (
  data: any,
  allValue?,
  titleField?,
  valueField?
) => {
  return data?.map((item) => {
    return {
      label: titleField ? item[titleField] : item.name,
      value: allValue ? item : valueField ? item[valueField] : item.code,
    };
  });
};
