// import { useState } from "react";
function TaskSort(props) {

    const onClick = (sortBy , sortValue) => {
        props.onSort(sortBy , sortValue);
    }
    return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> 
                <span>Sắp xếp  <i className="fas fa-angle-double-down"></i></span></button>
                  <ul className="dropdown-menu">
                      <li onClick = {() => { onClick('name' , 1) }}>
                          <a href = "!#" role="button">
                                      <span className="fa fa-sort-alpha-asc pr-5">
                                          Tên A-Z
                                      </span>
                                  </a>
                      </li>
                      <li onClick = {() => { onClick('name' , -1) }}>
                          <a href = "!#" role="button">
                                      <span className="fa fa-sort-alpha-desc pr-5">
                                          Tên Z-A
                                      </span>
                                  </a>
                      </li>
                      <li role="separator" className="divider"></li>
                      <li onClick = {() => { onClick('status' , 1) }}><a href = "!#" role="button">Trạng Thái Kích Hoạt</a></li>
                      <li onClick = {() => { onClick('status' , -1) }}><a href = "!#" role="button">Trạng Thái Ẩn</a></li>
                  </ul>
              </div>
            </div>
    );
  }
  
  export default TaskSort;
  