interface TodoList {
    taskName: string,
    taskStatus: string
}

class Todo {
    public todo_id: string[];
    public todo_s: string[];

    constructor(todo_id: string[], todo_s: string[]) {
        this.todo_id = todo_id;
        this.todo_s = todo_s;
    }

    add(list : TodoList) {
        this.todo_id.push(list.taskName);
        this.todo_s.push(list.taskStatus);
    }

    display() {
        console.log(`TASKS to be done are ${this.todo_id}`);
    }

}

//      SAMPLE DATA
var list = new Todo(["go for a ride", "swimming", "running", "go to gym", "complete the assignment",
        "learn angular", "study typescript", "prepare for the tes"]
    , ["active", "active", "active", "active", "completed", "completed", "deleted", "deleted"]);

function addItem(taskName: string, taskStatus: string) {
    list.add({
        taskName: taskName,
        taskStatus: taskStatus
    });
}

function toggleTodo(index:number) {
    // var list = JSON.parse(localStorage.getItem("listArray"));
    if(list.todo_s[index] === "active"){
        list.todo_s[index] = "completed";
        refreshTodos();
    }else{
        list.todo_s[index] = "active";
        refreshTodos();
    }
}

function deleteTodo(index:number){
    list.todo_s[index] = "deleted";
    refreshTodos();
}

function refreshTodos() {
    document.getElementById("todos_list_div_active").innerHTML = null;
    document.getElementById("todos_list_div_completed").innerHTML = null;
    document.getElementById("todos_list_div_deleted").innerHTML = "";
    localStorage.clear();
    console.log("list updated");
    localStorage.setItem("listArray", JSON.stringify(list));
    loadActiveTodos();
    loadCompletedTodos();
    loadDeletedTodos();
}

function createTodo(taskName: string) {

    var index = list.todo_id.indexOf(taskName);

    var todo_box = document.createElement("div");
    todo_box.setAttribute("class", "container");
    var todo_box_row = document.createElement("div");
    todo_box_row.setAttribute("class", "row");
    todo_box.appendChild(todo_box_row);
    var todo_box_row_1 = document.createElement("div");
    todo_box_row_1.setAttribute("class", "col-sm-3");
    var todo_box_row_2 = document.createElement("div");
    todo_box_row_2.setAttribute("class", "col-sm-3");
    var todo_box_row_3 = document.createElement("div");
    todo_box_row_3.setAttribute("class", "col-sm-3");
    var todo_box_row_4 = document.createElement("div");
    todo_box_row_4.setAttribute("class", "col-sm-3");

    var complete_checkbox_div = document.createElement("div");
    complete_checkbox_div.setAttribute("class", "checkbox checkbox-primary");
    var complete_checkbox = document.createElement("input");
    complete_checkbox.setAttribute("type", "checkbox");
    complete_checkbox.setAttribute("class", "styled");
    complete_checkbox.setAttribute("value", "");
    complete_checkbox.setAttribute("onclick", "toggleTodo("+index+")");
    var complete_checkbox_label = document.createElement("label");
    complete_checkbox_label.setAttribute("value", "");
    complete_checkbox_label.setAttribute("for", "checkbox" + taskName);
    complete_checkbox_div.appendChild(complete_checkbox);
    complete_checkbox_div.appendChild(complete_checkbox_label);
    todo_box_row_1.appendChild(complete_checkbox_div);

    var todo_element = document.createElement("label");
    todo_element.innerText = taskName;
    todo_element.setAttribute("onclick","editTodos("+index+")");
    todo_box_row_2.appendChild(todo_element);

    if (list.todo_s[index] != "deleted") {
        var delete_button = document.createElement("button");
        delete_button.setAttribute("class", "btn btn-default");
        delete_button.setAttribute("onclick","deleteTodo("+index+")");
        var del_span = document.createElement("span");
        del_span.setAttribute("class", "glyphicon glyphicon-remove");
        del_span.style.color = "red";
        delete_button.appendChild(del_span);
        todo_box_row_3.appendChild(delete_button);
    }
    todo_box_row_1.setAttribute("align", "center");
    todo_box_row_2.setAttribute("align", "left");
    todo_box_row_3.setAttribute("align", "right");
    todo_box_row.appendChild(todo_box_row_1);
    todo_box_row.appendChild(todo_box_row_2);
    todo_box_row.appendChild(todo_box_row_3);
    todo_box_row.appendChild(todo_box_row_4);

    document.getElementById("todos_list_div_active").appendChild(todo_box);
    (<HTMLInputElement>document.getElementById("new_todo_input")).value = "";
    localStorage.clear();
    console.log("list updated");
    localStorage.setItem("listArray", JSON.stringify(list));

}

function loadActiveTodos() {
    var list = JSON.parse(localStorage.getItem("listArray"));
    for (var i = 0; i < list.todo_id.length; i++) {
        if(list.todo_s[i] === "active") {
            var taskName = list.todo_id[i];

            var todo_box = document.createElement("div");
            todo_box.setAttribute("class", "container");
            var todo_box_row = document.createElement("div");
            todo_box_row.setAttribute("class", "row");
            todo_box.appendChild(todo_box_row);
            var todo_box_row_1 = document.createElement("div");
            todo_box_row_1.setAttribute("class", "col-sm-3");
            var todo_box_row_2 = document.createElement("div");
            todo_box_row_2.setAttribute("class", "col-sm-3");
            var todo_box_row_3 = document.createElement("div");
            todo_box_row_3.setAttribute("class", "col-sm-3");
            var todo_box_row_4 = document.createElement("div");
            todo_box_row_4.setAttribute("class", "col-sm-3");

            var complete_checkbox_div = document.createElement("div");
            complete_checkbox_div.setAttribute("class", "checkbox checkbox-primary");
            var complete_checkbox = document.createElement("input");
            complete_checkbox.setAttribute("type", "checkbox");
            complete_checkbox.setAttribute("class", "styled");
            complete_checkbox.setAttribute("id", "checkbox"+taskName);
            complete_checkbox.setAttribute("value", "");
            complete_checkbox.setAttribute("onclick", "toggleTodo("+i+")");
            var complete_checkbox_label = document.createElement("label");
            complete_checkbox_label.setAttribute("value", "");
            complete_checkbox_label.setAttribute("for", "checkbox"+taskName);
            complete_checkbox_div.appendChild(complete_checkbox);
            complete_checkbox_div.appendChild(complete_checkbox_label);
            todo_box_row_1.appendChild(complete_checkbox_div);

            var todo_element = document.createElement("label");
            todo_element.innerText = taskName;
            todo_element.setAttribute("onclick","editTodos("+i+")");
            todo_box_row_2.appendChild(todo_element);

            if (list.todo_s[i] != "deleted") {
                var delete_button = document.createElement("button");
                delete_button.setAttribute("class", "btn btn-default");
                delete_button.setAttribute("onclick","deleteTodo("+i+")");
                var del_span = document.createElement("span");
                del_span.setAttribute("class", "glyphicon glyphicon-remove");
                del_span.style.color = "red";
                delete_button.appendChild(del_span);
                todo_box_row_3.appendChild(delete_button);
            }
            todo_box_row_1.setAttribute("align", "center");
            todo_box_row_2.setAttribute("align", "left");
            todo_box_row_3.setAttribute("align", "right");
            todo_box_row.appendChild(todo_box_row_1);
            todo_box_row.appendChild(todo_box_row_2);
            todo_box_row.appendChild(todo_box_row_3);
            todo_box_row.appendChild(todo_box_row_4);

            document.getElementById("todos_list_div_active").appendChild(todo_box);
        }
    }

}

function loadCompletedTodos() {
    var list = JSON.parse(localStorage.getItem("listArray"));
    for (var j = 0; j < list.todo_id.length; j++) {
        if (list.todo_s[j] === "completed") {

            var taskName = list.todo_id[j];
            var todo_box = document.createElement("div");
            todo_box.setAttribute("class", "container");
            var todo_box_row = document.createElement("div");
            todo_box_row.setAttribute("class", "row");
            todo_box.appendChild(todo_box_row);
            var todo_box_row_1 = document.createElement("div");
            todo_box_row_1.setAttribute("class", "col-sm-3");
            var todo_box_row_2 = document.createElement("div");
            todo_box_row_2.setAttribute("class", "col-sm-3");
            var todo_box_row_3 = document.createElement("div");
            todo_box_row_3.setAttribute("class", "col-sm-3");
            var todo_box_row_4 = document.createElement("div");
            todo_box_row_4.setAttribute("class", "col-sm-3");

            var complete_checkbox_div = document.createElement("div");
            complete_checkbox_div.setAttribute("class", "checkbox checkbox-success");
            var complete_checkbox = document.createElement("input");
            complete_checkbox.setAttribute("type", "checkbox");
            complete_checkbox.setAttribute("class", "styled");
            complete_checkbox.setAttribute("checked", "true");
            complete_checkbox.setAttribute("onclick", "toggleTodo("+j+")");
            var complete_checkbox_label = document.createElement("label");
            complete_checkbox_label.setAttribute("value", "");
            complete_checkbox_label.setAttribute("for", "checkbox" + taskName);
            complete_checkbox_div.appendChild(complete_checkbox);
            complete_checkbox_div.appendChild(complete_checkbox_label);
            todo_box_row_1.appendChild(complete_checkbox_div);


            var todo_element = document.createElement("label");
            todo_element.innerText = taskName;
            todo_element.style.textDecoration = "line-through";
            // todo_element.setAttribute("onclick","editTodos("+j+")");
            todo_box_row_2.appendChild(todo_element);

            if (list.todo_s[j] != "deleted") {
                var delete_button = document.createElement("button");
                delete_button.setAttribute("class", "btn btn-default");
                var del_span = document.createElement("span");
                del_span.setAttribute("class", "glyphicon glyphicon-remove");
                del_span.style.color = "red";
                delete_button.appendChild(del_span);
                delete_button.setAttribute("onclick","deleteTodo("+j+")");
                todo_box_row_3.appendChild(delete_button);
            }
            todo_box_row_1.setAttribute("align", "center");
            todo_box_row_2.setAttribute("align", "left");
            todo_box_row_3.setAttribute("align", "right");
            todo_box_row.appendChild(todo_box_row_1);
            todo_box_row.appendChild(todo_box_row_2);
            todo_box_row.appendChild(todo_box_row_3);
            todo_box_row.appendChild(todo_box_row_4);

            document.getElementById("todos_list_div_completed").appendChild(todo_box);
        }
    }
}

function loadDeletedTodos() {
    var list = JSON.parse(localStorage.getItem("listArray"));
    for (var i = 0; i < list.todo_id.length; i++) {
        if (list.todo_s[i] === "deleted") {
            var taskName = list.todo_id[i];
            var todo_box = document.createElement("div");
            todo_box.setAttribute("class", "container");
            var todo_box_row = document.createElement("div");
            todo_box_row.setAttribute("class", "row");
            todo_box.appendChild(todo_box_row);
            var todo_box_row_1 = document.createElement("div");
            todo_box_row_1.setAttribute("class", "col-sm-3");
            var todo_box_row_2 = document.createElement("div");
            todo_box_row_2.setAttribute("class", "col-sm-3");
            var todo_box_row_3 = document.createElement("div");
            todo_box_row_3.setAttribute("class", "col-sm-3");
            var todo_box_row_4 = document.createElement("div");
            todo_box_row_4.setAttribute("class", "col-sm-3");
            var todo_element = document.createElement("label");
            todo_element.innerText = list.todo_id[i];
            todo_element.style.textDecoration = "line-through";
            todo_box_row_2.appendChild(todo_element);
            todo_box_row_1.setAttribute("align", "center");
            todo_box_row_2.setAttribute("align", "left");
            todo_box_row_3.setAttribute("align", "right");
            todo_box_row.appendChild(todo_box_row_1);
            todo_box_row.appendChild(todo_box_row_2);
            todo_box_row.appendChild(todo_box_row_3);
            todo_box_row.appendChild(todo_box_row_4);

            document.getElementById("todos_list_div_deleted").appendChild(todo_box);

        }
    }
}

function editTodos(index: number) {
    var taskName = list.todo_id[index];
    var edited = window.prompt("Edit Todo, Change the AIM !!", taskName);
    if(edited != null && edited !=""){
        list.todo_id[index] = edited;
        document.getElementById("todos_list_div_active").innerHTML = "";
        refreshTodos();
    }
}

function setItemToLocalStorage(list) {
    console.log("inside storage");
    if(localStorage.length == 0){
        console.log("local storage updated");
        localStorage.setItem("listArray", JSON.stringify(list));
    }
}

function preLoad() {
    console.log("inside preload");
    var tempList = JSON.parse(localStorage.getItem("listArray"));
    loadActiveTodos();
    loadCompletedTodos();
    loadDeletedTodos();
}