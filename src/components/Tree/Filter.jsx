import React, { useState } from "react";
import { TreeSelect } from "antd";
const { SHOW_PARENT } = TreeSelect;

// const treeData = [
//   {
//     title: "ประเพณีไทย",
//     value: "0-0",
//     key: "0-0",
//     children: [
//       {
//         title: "ไหว้ศาลตายาย",
//         value: "0-0-0",
//         key: "0-0-0",
//       },
//     ],
//   },

// ];

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
    placeholder: "เลือกเทศกาล",
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
