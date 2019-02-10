(function() {

    var toDoCounter = 0, listOfToDo = [], toDoItemId, selectedToDoItem;
    
    var Todo = function(toDoId, toDoText) {
        this.toDoId = toDoId;
        this.toDoText = toDoText;
        this.toDoStatus = false;
        this.toDoChecked = false;
    }

    Todo.prototype.doneBtn = function(selectedToDoItemContent) {      
        switch(this.toDoStatus) {
            case false:
                selectedToDoItemContent.classList.add("completed");
                selectedToDoItemContent.classList.remove("not-completed");
                event.target.textContent = "Not Done";
                event.target.className = "not-done";
                this.toDoStatus = true;
                break;
            case true:
                selectedToDoItemContent.classList.add("not-completed");
                selectedToDoItemContent.classList.remove("completed");
                event.target.textContent = "Done";
                event.target.className = "done-btn";
                this.toDoStatus = false;
                break;
        }
    }

    Todo.prototype.setCheckedStatus = function() {  
        switch(this.toDoChecked) {
            case false:
                        this.toDoChecked = true;
                        break;
            case true:
                        this.toDoChecked = false;
                        break;
        }
    }
    Todo.prototype.update_Btn = function(toDoItemId, selectedToDoItemContent) {
        
        selectedToDoItemContent.setAttribute("contenteditable","true");
        selectedToDoItemContent.classList.add("edit-todo-text");

        selectedToDoItemContent.onkeypress = function(event) {
           if(event.keyCode === 13) {
                updateContent();
            }
         }

        selectedToDoItemContent.onblur = function () {
            updateContent();
        }

        function updateContent(){
            selectedToDoItemContent.classList.remove("edit-todo-text");
            selectedToDoItemContent.removeAttribute("contenteditable");
            listOfToDo[toDoItemId].toDoText = selectedToDoItemContent.textContent;
        }
    }

    Todo.prototype.updateListOfToDoAfterDelete = function(todoItemId) {
        var i;
        for(i = todoItemId; i < listOfToDo.length; i++) {
            document.querySelector(`[toDoId="${listOfToDo[i].toDoId}"]`).setAttribute("toDoId", `${listOfToDo[i].toDoId-1}`);
            listOfToDo[i].toDoId -= 1;
        }
    }

    Todo.prototype.deleteBtn = function(toDoItemId,selectedToDoItem) {
            selectedToDoItem.remove();
            listOfToDo.splice(toDoItemId,1);
            this.updateListOfToDoAfterDelete(toDoItemId);
            toDoCounter--;
    }

    document.getElementById("addBtn").addEventListener('click', addToDoEvent);
     
    function addToDoEvent() {
        var toDoEvent, hiddenTemplate, clone;  
        var toDoInput = document.getElementById("text-Box1");      
        var toDoText = toDoInput.value;
        if(!toDoText) {
           alert("enter some content");
     }else {  
            if(!checkExistanceInList(toDoText)) {
                hiddenTemplate = document.querySelector(`[data-divItem="divItem"]`);
                clone = hiddenTemplate.cloneNode(true);
                clone.querySelector(`[element-type="para"]`).innerHTML = toDoText;
                clone.classList.add("clone");
                clone.classList.remove("todo-item")
                //appending divItem to todo-event
                document.getElementById("todo-event").appendChild(clone);
                clone.setAttribute("toDoId",toDoCounter);

                //clearing the text box
                toDoInput.value = "";

                toDoEvent = new Todo(toDoCounter,toDoText);
                listOfToDo.push(toDoEvent);
                console.log(listOfToDo);
                toDoCounter++;
            }      
        }
    }

    function checkExistanceInList(toDoText) {
        var i, exists;
        toDoInput = document.getElementById("text-Box1");   
        for(i=0; i < listOfToDo.length; i++){
            if(listOfToDo[i].toDoText === toDoText) {
                toDoInput.value = "";
                alert("This already exists in the To Do List at " + (i+1)+ "th position. Please enter another event.");
                exists = 1;
                break;
            }else {
                exists = 0;
            }
        }
        return exists;
    }
     
    document.getElementById("todo-event").addEventListener('click', operations);

    function operations(event) {
        var clickedButton, selectedToDoItemContent  ;
        if(event.target !== event.currentTarget){
            clickedButton = event.target.getAttribute("element-type");
            toDoItemId  = event.target.parentElement.getAttribute("toDoId");
            selectedToDoItem = document.querySelector(`[toDoId="${toDoItemId}"]`);
            selectedToDoItemContent  = selectedToDoItem.querySelector(`[element-type="para"]`);
            switch(clickedButton) {
                case "done": 
                            listOfToDo[toDoItemId].doneBtn(selectedToDoItemContent);
                            break;
                case "delete":
                            listOfToDo[toDoItemId].deleteBtn(toDoItemId,selectedToDoItem);
                            break;
                case "update":
                            listOfToDo[toDoItemId].update_Btn(toDoItemId,selectedToDoItemContent);
                            break;
                case "checkbox":
                            listOfToDo[toDoItemId].setCheckedStatus();
                            break;
            }
    }
    event.stopPropagation();
    };

    document.getElementById("delete-selected-Btn").addEventListener('click', deleteSelected);
    
    function deleteSelected() {
        for(var j = listOfToDo.length-1; j >= 0; j--) {
            selectedToDoItem = document.querySelector(`[toDoId="${j}"]`);
            if(listOfToDo[j].toDoChecked) {
                listOfToDo[j].deleteBtn(j,selectedToDoItem);
            }
        } 
    }

    document.getElementById("delete-completed-Btn").addEventListener('click', deleteCompleted);
    
    function deleteCompleted() {
        for(var j = listOfToDo.length-1; j >= 0; j--) {
            selectedToDoItem = document.querySelector(`[toDoId="${j}"]`);
            if(listOfToDo[j].toDoStatus) {
                listOfToDo[j].deleteBtn(j,selectedToDoItem);
            }
        } 
    }
})();
