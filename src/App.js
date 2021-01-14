import React, { useState , useEffect  } from 'react';
import TaskControl from './components/TaskControl';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
function App() {

  // Khai báo State
  // id : duy nhất , name, status
  const [tasks, setTasks] = useState(()=> {
    const parse = JSON.parse(localStorage.getItem('tasks')) || [];
    return parse;
  });
  // State đóng mở FORM
  const [isDisableForm, setIsDisableForm] = useState(false);
  // State EDIT
  const [taskEdit , setTaskEdit] = useState([{}]);
  // STATE FILTER
  const [filter , setFilter] = useState({
    name : '',
    status : -1
  })
  // STATE SORT
  const [sort , setSort] = useState({
      by : 'name',
      value : 1
  })

  // Tạo State khi nhấn nút
  function onGenerateData() {
    const taskList = [
      {
        id: generateID(),
        name: 'Học lập trình',
        status: true
      },
      {
        id: generateID(),
        name: 'Ngủ',
        status: false
      },
      {
        id: generateID(),
        name: 'Học',
        status: false
      },
      {
        id: generateID(),
        name: 'Ăn',
        status: true
      }
    ]
    setTasks(taskList);
    // Lưu vào biến cục bộ trong trình duyệt , chuyển snag dạng String cho dễ xử lí
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }


  // Tạo chuỗi random
  function random() {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
  }

  // Tạo mã ID random
  function generateID() {
    return random() + random() + '-' + random() + '-' + random() + '-' + random() + '-' + random() + random() + random();
  }

  // Tìm vị trí task từ Id sẵn có
  const findIndex = (id) => {
    let x = -1;
    const tasksArr = tasks;
    tasksArr.forEach((task, index) => {
      if (task.id === id) {
        x = index;
      }
    })
    return x;
  }

  //  Hàm đổi giá trị true/false
  const reverse = (x) => {
    return x === true ? false : true;
  }


  // Nhận Submit
  const onSubmit = (data) => {
    const taskList = [...tasks];
    console.log(data.status);
    if(data.id === '') {
          const newTask = {
            id: generateID(),
            name: data.name,
            status: data.status === 'true' ? true : false
          }
          taskList.push(newTask)
    }else {
      const index = taskList.findIndex(x => x.id === data.id);
      taskList[index] = data;
    }
    setTaskEdit([])
    setTasks(taskList)
    if (tasks.length > 0) {
      // Lưu vào biến cục bộ trong trình duyệt , chuyển snag dạng String cho dễ xử lí
      localStorage.setItem('tasks', JSON.stringify(taskList));
    }
  }

  // Đóng Form
  const onCloseForm = () => {
    setTaskEdit([]);
    setIsDisableForm(false);
  }

  // HIỂN THỊ FORM
  // Điều kiện ẩn hiện form:
  var eleForm = isDisableForm ? <TaskForm 
                                          onSubmit={onSubmit} 
                                          onCloseForm={onCloseForm}
                                          task = {taskEdit}
                                           /> : '';
  // Hiện Form
  const onToggleForm = () => {
    setTaskEdit([]);
    setIsDisableForm(!isDisableForm);
  }
  // Update Status
  const onUpdateStatus = (id) => {
    const taskArr = [...tasks];
    const index = findIndex(id);
    if (index !== -1) {
      taskArr[index].status = reverse(taskArr[index].status);
      setTasks(taskArr);
    }
    localStorage.setItem('tasks', JSON.stringify(taskArr));
  };
  //  Xóa Task
  const onRemoveTask = (id)=> {
    const newTasks = [ ...tasks];
    const index = findIndex(id);
    if(index !== -1){
      newTasks.splice(index , 1);
      setTasks(newTasks);
    }
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
  // EDIT FORM
  const onEditTask = (id) => {
    setIsDisableForm(true);
    const taskEditing = tasks.find(x => x.id === id);
    setTaskEdit(taskEditing)
  }

  // ACTION
    // FILTER
    const onFilter = (filterName , filterStatus) => {
      filterStatus = parseInt(filterStatus , 10);
      setFilter({
        name : filterName.toLowerCase(),
        status :  filterStatus
      })
    }
    //  SEARCH
    const onSearch = (searchName) => {
      onFilter (searchName , -1);
    }
    React.useEffect(() => {
        const taskOld = JSON.parse(localStorage.getItem('tasks'));
        let taskList = [...taskOld]
        if(filter.name) {
          taskList = taskOld.filter(task => task.name.toLowerCase().indexOf(filter.name) !== -1);
        }
        if(filter.name === ''){
          taskList = [...taskOld];
        }
        if(filter.status || filter.status === 0) {
          taskList = taskList.filter(task => {
              if(filter.status === -1) {
                  return taskList;
                }else {
                    return task.status === (filter.status === 1 ? true : false)
                  }
                })
          }
        setTasks(taskList)
    }, [filter , filter.name , filter.status]);
    // SORT
    const onSort = (sortBy , sortValue) => {
      setSort({
        by : sortBy,
        value : sortValue
      })
    }
    useEffect(() => {
      const taskOld = JSON.parse(localStorage.getItem('tasks'));
      let taskList = [...taskOld];
      if(sort.by === 'name') {
        taskList =  taskList.sort((a , b) => {
          if(a.name > b.name) return sort.value;
          else if ( a.name < b.name ) return (-sort.value);
          else return 0;
        }) 
      }else {
        taskList =  taskList.sort((a , b) => {
          if(a.status > b.status) return -sort.value;
          else if ( a.status < b.status ) return sort.value;
          else return 0;
        })
      }
      setTasks(taskList);
    }, [sort]);
  //  CÁC HÀM RENDER
  const renderListTask = () => {
    return <>
        <TaskList tasks={tasks} 
                  onRemoveTask = { onRemoveTask }
                  onUpdateStatus={onUpdateStatus} 
                  onEditTask = { onEditTask }
                  onFilter = { onFilter }
                  />
    </>
  }
  const renderTaskControl = () => {
    return <> 
              <TaskControl onSearch = { onSearch } onSort = { onSort }/>
          </>
  }
  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div className={isDisableForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
          {/* FORM */}
          {eleForm}
        </div>
        <div className={isDisableForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <button type="button" className="btn btn-primary" onClick={onToggleForm}>
            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
          <button type="button" className="btn btn-danger ml-5" onClick={onGenerateData}>
            <span className="fa fa-plus mr-5"></span>Thêm Data
                </button>
          {/*  SEARCH AND SORT */}
          { renderTaskControl() }
          {/* LIST TASK */}
          {tasks && renderListTask()}
        </div>
      </div>
    </div>
  );
}

export default App;
