import React, { useState } from "react";
import { Tree, Checkbox } from "antd";

const { TreeNode } = Tree;

const FilterProductCategory = (props) => {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck ", checkedKeys, info);
    setCheckedKeys(checkedKeys);
    props?.onCategoryChange(checkedKeys);
  };

  const renderTreeNodes = (data) => {
    return data.map((category) => (
      <TreeNode
        key={category.value}
        title={
          <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "16px" }}>
            {category.title}
          </div>
        }
      >
        {category.children && renderTreeNodes(category.children)}
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

export default FilterProductCategory;
