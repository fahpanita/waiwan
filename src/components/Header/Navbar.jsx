import React from "react";
import LineLogin from "../../pages/Home/LineLogin";
import Link from "../Link";
import { Layout, Menu, Button } from "antd";

const { Header } = Layout;

export const Navbar = () => {
  return (
    <Layout className="layout">
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">หน้าหลัก</Menu.Item>
          <Menu.Item key="2">รายการสินค้า</Menu.Item>
          <Menu.Item key="3">ทดลองจัดวาง</Menu.Item>
        </Menu>

        {/* <Link type="primary" to="/stock">
          บัญชี
        </Link> */}
        <Link to="/stock">บัญชี</Link>
        <LineLogin />
      </Header>
    </Layout>
    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //   <div class="container-fluid">
    //     <a class="navbar-brand">ไหว้วาน</a>
    //     <button
    //       class="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarText"
    //       aria-controls="navbarText"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span class="navbar-toggler-icon"></span>
    //     </button>
    //     <div class="collapse navbar-collapse" id="navbarText">
    //       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li class="nav-item">
    //           <a class="nav-link active" aria-current="page" href="#">
    //             หน้าหลัก
    //           </a>
    //         </li>
    //         <li class="nav-item">
    //           <a class="nav-link" href="#">
    //             รายการสินค้า
    //           </a>
    //         </li>
    //         <li class="nav-item">
    //           <a class="nav-link" href="#">
    //             ทดลองจัดวาง
    //           </a>
    //         </li>
    //       </ul>
    //       <a class="nav-link">
    //         <Link to="/stock">บัญชี</Link>
    //       </a>

    //       <LineLogin />
    //     </div>
    //   </div>
    // </nav>
  );
};
export default Navbar;
