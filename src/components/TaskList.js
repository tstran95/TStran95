import { useEffect, useState } from "react";

const { default: TaskItem } = require("./TaskItem");

function TaskList(props) {
    const [tasks, setTasks] = useState(null);
    // Tạo Filrer 
    const [filter, setFilter] = useState({
        filterName : '',
        filterStatus : -1
    });
    // const [filterName , filterStt] = filter;
    useEffect(() => {
        if(props.tasks) {
            setTasks(props.tasks);
        }
    }, [props.tasks]);
    
    // Hàm lấy giá trị input 
    const onChange = (event)=> {
        const name = event.target.name;
        const value = event.target.value;
        props.onFilter(
            name === 'filterName' ? value : filter.filterName,
            name === 'filterStatus' ? value : filter.filterStatus
        )
        setFilter({
            ...filter,
            [name] : value
        })
    }
    const renderItem = () => {
        return tasks && tasks.map((task, index) => 
            <TaskItem
            key={task.id}
            index={index}
            task={task}
            onUpdateStatus={props.onUpdateStatus}
            onRemoveTask = { props.onRemoveTask }
            onEditTask = { props.onEditTask }
        />
    )
    }
    return (
        <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Trạng Thái</th>
                            <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" 
                                       className="form-control"
                                       name = "filterName"
                                       value = { filter.filterName }
                                       onChange = { onChange } />
                            </td>
                            <td>
                                <select className="form-control" name = "filterStatus" value = { filter.filterStatus } onChange = { onChange }>
                                    <option value= {-1}>Tất Cả</option>
                                    <option value= {0}>Ẩn</option>
                                    <option value= {1}>Kích Hoạt</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {renderItem()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TaskList;
