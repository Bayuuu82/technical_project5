import "./todolist.css";
import React from "react";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";

const Todolist = () => {
  const [list, setList] = useState([]);
  const [showlist, setShowlist] = useState(false);
  const [select, setSelect] = useState("All");
  const [editid, setEditid] = useState("");
  const [edit, setEdit] = useState("");
  const [todo, setTodo] = useState({
    id: "",
    todo: "",
    status: "Active",
  });

  // untuk menambahkan input task
  const holdadd = () => {
    setList((current) => [...current, todo]);
  };

  //   untuk mendapatkan inputan user
  const holdinput = (e) => {
    setTodo({ ...todo, id: uuid(), [e.target.name]: e.target.value });
  };

  //    fungsi untuk pindah status
  const holdoption = (e) => {
    setSelect(e.target.name);
  };

  // fungsi mengubah status ke completed
  const holdcompleted = (id) => {
    const changelist = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: "Completed" };
      }
      return todo;
    });
    setList(changelist);
  };

  //   fungsi menghapus task
  const deletedtask = (id) => {
    const deltask = list.filter((user) => {
      return id !== user.id;
    });
    setList(deltask);
  };
  //   fungsi edit task
  const edittask = (e) => {
    setEdit(e.target.value);
  };

  //   fungsi ubah hasil edit task
  const holdedit = () => {
    const changetask = list.map((task) => {
      if (task.id === editid) {
        return { ...task, todo: edit };
      }
      return task;
    });
    setShowlist(false);
    setList(changetask);
  };

  //   fungsi menampilkan hasil edit
  const showing = (id) => {
    setShowlist(!showlist);
    setEditid(id);
  };

  useEffect(() => {}, [select]);

  return (
    <>
      <div className="text-center">
        <h1 className="my-5 mb-2 text-4xl font-extrabold leading-none text-gray-900 md:text-5xl lg:text-6xl">To-Do List</h1>
        <p className="m-auto max-w-4xl mb-2 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"> Add and save your To-do list to make it easier for you to remember and see your progress</p>
      </div>

      <div className="boxinputan mb-2.5">
        <div>
          <input
            type="text"
            placeholder="Breakfast at 7:30 "
            name="todo"
            autoComplete="off"
            onChange={holdinput}
            className="inputan m-2 mr-0 w-60 p-2  sm: bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 hover:border-blue-500"
          />
          <button
            onClick={holdadd}
            className="tombol text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <div className="status flex justify-center">
          <button className={`but ${select === "All" ? "butclick" : "but"}`} type="button" name="All" onClick={holdoption}>
            All
          </button>
          <button className={`but ${select === "Actived" ? "butclick" : "but"}`} type="button" name="Actived" onClick={holdoption}>
            Actived
          </button>
          <button className={`but ${select === "Completed" ? "butclick" : "but"}`} type="button" name="Completed" onClick={holdoption}>
            Completed
          </button>
        </div>
        <div className="flex justify-center items-center flex-col mt-3 mx-1">
          {list.length && select === "All" ? (
            list.map((element) => {
              return (
                <div key={element.id} className="listodo mb-2 mx-2 p-1 w-80 bg-white rounded-lg border border-gray-200 shadow-md">
                  <div className="">
                    <div className="m-w-full px-1">
                      <p className="text-md font-bold tracking-tight text-gray-900">{element.todo}</p>
                    </div>
                    <div className="flex justify-between">
                      <button onClick={() => holdcompleted(element.id)} className="ml-1 text-xs rounded-lg bg-blue-50 py-0 px-1">
                        {element.status}
                      </button>
                      <div>
                        <button className="" onClick={() => showing(element.id)}>
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button className="mr-1" onClick={() => deletedtask(element.id)}>
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}

          {list.length && select === "Active" ? (
            list
              .filter((element) => element.status === "Active")
              .map((element) => {
                return (
                  <div key={element.id} className="listodo mb-2 mx-2 p-1 w-80 bg-white rounded-lg border border-gray-200 shadow-md">
                    <div className="">
                      <div className="m-w-full px-1">
                        <p className="text-md font-bold tracking-tight text-gray-900">{element.todo}</p>
                      </div>
                      <div className="flex justify-between">
                        <button onClick={() => holdcompleted(element.id)} className="ml-1 text-xs rounded-lg bg-blue-50 py-0 px-1">
                          {element.status}
                        </button>
                        <div>
                          <button className="" onClick={() => showing(element.id)}>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button className="mr-1" onClick={() => deletedtask(element.id)}>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <></>
          )}

          {list.length && select === "Completed" ? (
            list
              .filter((element) => element.status === "Completed")
              .map((element) => {
                return (
                  <div key={element.id} className="listodo mb-2 mx-2 p-1 w-80 bg-white rounded-lg border border-gray-200 shadow-md">
                    <div className="">
                      <div className="m-w-full px-1">
                        <p className="text-md font-bold tracking-tight text-gray-900">{element.todo}</p>
                      </div>
                      <div className="flex justify-between">
                        <button onClick={() => holdcompleted(element.id)} className="ml-1 text-xs rounded-lg bg-blue-50 py-0 px-1">
                          {element.status}
                        </button>
                        <div>
                          <button className="" onClick={() => showing(element.id)}>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button className="mr-1" onClick={() => deletedtask(element.id)}>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Todolist;
