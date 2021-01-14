import { useState } from "react";
function TaskSearch(props) {
    const [searchName, setSearchName] = useState(null);

    const onChange = (event) => {
        setSearchName(event.target.value);
    }
    const onSearch = () => {
        props.onSearch(searchName);
    }
    return (
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div className="input-group">
                  <input type="text" 
                         className="form-control" 
                         name = "searchName"
                         onChange = { onChange }   
                         />
                  <span className="input-group-btn">
                              <button className="btn btn-primary" type="button" onClick = { onSearch }>
                                  <span className="fa fa-search mr-5"></span>Tìm
                  </button>
                  </span>
              </div>
          </div>
    );
  }
  
  export default TaskSearch;
  