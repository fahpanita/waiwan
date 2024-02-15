import React, { useState } from "react";
import { Tree, Checkbox } from "antd";

const { TreeNode } = Tree;

const FilterProductEvent = (props) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (checkedKeys, info) => {
    // console.log("onCheckEvent ", checkedKeys, info);
    setCheckedKeys(checkedKeys);
    props?.onEventChange(checkedKeys);
  };

  const renderTreeNodes = (data) => {
    return data.map((event) => (
      <TreeNode
        key={event.value}
        title={
          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>
            {event.title}
          </div>
        }
      >
        {event.children && renderTreeNodes(event.children)}
      </TreeNode>
    ));
  };

  return (
    <Tree
      defaultExpandAll
      checkable={{ showCheckbox: true }}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
    >
      {renderTreeNodes(props.filterData)}
    </Tree>
  );
};

export default FilterProductEvent;
