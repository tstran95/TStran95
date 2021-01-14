const { default: TaskSearch } = require("./TaskSearch");
const { default: TaskSort } = require("./TaskSort");

function TaskControl(props) {
  return (
    <div className="row mt-15">
            <TaskSearch onSearch = { props.onSearch }/>
            <TaskSort onSort = { props.onSort }/>
    </div>
  );
}

export default TaskControl;
