import { useState ,useEffect } from "react";
function TaskForm(props) {

    const [newTask, setNewTask] = useState({
        id : '',
        name : '',
        status : false
    });
    useEffect(() => {
        if(props.task) {
            let id = '';
            if(props.task.id !== undefined) {
                id = props.task.id;
            }
            setNewTask({
                id : id,
                name : props.task.name,
                status : props.task.status
            })
        }
    }, [props.task]);

    // Tạo hành động CloseForm gọi tới phương thức của bên cha
    let onCloseForm = () =>{
        props.onCloseForm();
    }
    let onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        setNewTask({
            ...newTask,
            [name] : value
        });
    }
    // Submit Form
    let onSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(newTask);
        //  hủy bỏ và đóng form
        onClear();
        onCloseForm();
    }
    // Hủy bỏ dữ liệu 
    let onClear = () => {
        setNewTask ({
            name : '',
            status : false
        })
    }
    let id = newTask.id;
  return (
    <div className="panel panel-warning">
    <div className="panel-heading">
        <h3 className="panel-title">
         { id !== '' ? "Cập nhật công việc" : "Thêm công việc"}
        <span className = "fa fa-times-circle text-right" onClick = { onCloseForm }></span>
        </h3>
    </div>
    <div className="panel-body">
        <form onSubmit = { onSubmit }>
            <div className="form-group">
                <label>Tên :</label>
                <input 
                        type="text" 
                        className="form-control" 
                        name = "name"
                        value = {newTask.name}
                        onChange = { onChange }
                        />
            </div>
            <label>Trạng Thái :</label>
            <select 
                        className="form-control" 
                        required="required"
                        name = "status"
                        value = {newTask.status}
                        onChange = { onChange }>
                <option value= {true}> Kích Hoạt </option>
                <option value= {false}> Ẩn </option>
            </select>
            <br/>
            <div className="text-center">
                <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick= {  onClear }
                        >Hủy Bỏ</button>
            </div>
        </form>
    </div>
    </div>
  );
}

export default TaskForm;
