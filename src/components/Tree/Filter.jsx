import React, { useState } from "react";
import { TreeSelect } from "antd";
const { SHOW_PARENT } = TreeSelect;

const Filter = (props) => {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    console.log("onChange ", value);
    setValue(newValue);
  };
  const tProps = {
    treeData: props.filterData,
    value,
    onChange,
    treeCheckable: true,
    placeholder: "เลือกหมวดหมู่",
    showSearch: false,
    showCheckedStrategy: TreeSelect.SHOW_PARENT,
    ...props,
    style: {
      width: "100%",
    },
  };
  return <TreeSelect {...tProps} />;
};

export default Filter;
