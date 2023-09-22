import React from "react";
import LineLogin from "../../pages/Home/LineLogin";
import Link from "../Link";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          ไหว้วาน
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                หน้าหลัก
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                รายการสินค้า
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                ทดลองจัดวาง
              </a>
            </li>
          </ul>
          <a class="nav-link">
            <Link to="/stock">fghjk</Link>
          </a>

          <LineLogin />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
