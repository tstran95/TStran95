function TaskItem(props) {
    const {index , task} = props;
    
    const onUpdateStatus = () => {
        props.onUpdateStatus (task.id);
    };
    //  Xóa task
    const onRemoveTask = ()=> {
        props.onRemoveTask(task.id);
    };
    // Sửa Task 
    const onEditTask = ()=>{
        props.onEditTask(task.id);
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span className={ task.status === true ? "label label-success text-right" : "label label-danger text-right"}
                        onClick = { onUpdateStatus }>
                            { task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                        </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick = { onEditTask }>
                    <span className="fa fa-pencil mr-5" ></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick = { onRemoveTask }>
                    <span className="fa fa-trash mr-5" ></span>Xóa
                </button>
            </td>
        </tr>
    );
  }
  
  export default TaskItem;
  