import React, { useState } from "react";
import { TreeSelect } from "antd";
const { SHOW_PARENT } = TreeSelect;
const treeData = [
  {
    title: "ประเพณีไทย",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "ไหว้ศาลตายาย",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "ประเพณีจีน",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "ตรุษจีน",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "เช็งเม้ง",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "สารทจีน",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];

const Filter = () => {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    console.log("onChange ", value);
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    placeholder: "เลือกเทศกาล",
    showSearch: false,
    showCheckedStrategy: TreeSelect.SHOW_PARENT,

    style: {
      width: "100%",
    },
  };
  return <TreeSelect {...tProps} />;
};

export default Filter;
