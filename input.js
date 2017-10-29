window.onload = function() {

    var input = document.getElementById('new_todo_input');
    var btn = document.getElementById('btn');

    // loadActiveTodos(list);
    // loadCompletedTodos(list);
    // loadDeletedTodos(list);

    setItemToLocalStorage(list);

    preLoad();

    btn.onclick = function () {
        var taskName = input.value;
        addItem(taskName, "active");
        createTodo(taskName);
    };


}




