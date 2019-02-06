var TODOList = {};

TODOList.init = function(){

    var eventText, tb1, selectedPara, i,eventTextArray= [];
    var divArray = [], checkedArray = [],sameEvent=0;

    tb1=document.getElementById("textBox1");

    document.getElementById("addBtn").addEventListener('click', addTODOEvent);
     
    function addTODOEvent(){
        eventText = tb1.value;
        eventTextArray.push(eventText);
        if(eventText == "" || eventText == " "){
            alert("enter some content");
        }else{
            // for(var k=0 ; k<divArray.length; k++){
            //     console.log(eventTextArray);
            //     console.log("et:"+eventText);
            //     //console.log(eventText +" "+divArray[k].querySelector(`[data-para="para"]`).textContent);
            //     if(eventText == eventTextArray[k]){
            //         sameEvent++;
            //         console.log("se:"+sameEvent);
            //         alert("This event already exists in the  To do List as "+ (k+1)+" event. please enter a new event .");
            //         break;
            //     }
            // }
            // if(sameEvent == 0){
            var item = document.querySelector(`[data-divItem="divItem"]`);
            var clone = item.cloneNode(true);
            clone.querySelector(`[data-para="para"]`).innerHTML = eventText;
            clone.classList.add("cloneDiv");
            clone.classList.remove("divItemStyle")
            //appending divItem to listDiv
            document.getElementById("listsDiv").appendChild(clone);
            divArray.push(clone);

            //clearing the text box
            tb1.value = " ";
           // sameEvent=0;
           //}
        }
    }

  
    document.getElementById("listsDiv").addEventListener('click', operations);

    function operations(event){
        if(event.target !== event.currentTarget){
        for(i=0; i<divArray.length; i++){
            selectedPara = divArray[i].querySelector(`[data-para="para"]`);
            if(event.target === divArray[i].querySelector(`[data-finBtn="done"]`)){
                doneBtn();
            }else if(event.target === divArray[i].querySelector(`[data-delBtn="delete"]`)){
                divArray[i].remove();
                divArray.splice(i,1);
            }else if (event.target === divArray[i].querySelector(`[data-updateBtn="update"]`)){
                update_Btn();
            }
        }
    }
    event.stopPropagation();
    };

    function doneBtn(){
        if(event.target.textContent == "Done"){
            selectedPara.classList.remove("notCompleted");
            selectedPara.classList.add("completed");
            event.target.textContent = "Not done";
            event.target.className = "notDone";
        }else{
            selectedPara.classList.remove("completed");
            selectedPara.classList.add("notCompleted");
            event.target.textContent = "Done";
            event.target.className = "finBtn";
        }
    }

    function update_Btn(){
        selectedPara.setAttribute("contenteditable","true");
        selectedPara.classList.add("editPara");
        selectedPara.onkeypress = editParaOnKeyPress;
        selectedPara.onblur = editParaOnBlur;
        function editParaOnKeyPress(event){
            if(event.keyCode === 13){
                selectedPara.classList.remove("editPara");
                selectedPara.removeAttribute("contenteditable");
            }
        }

        function editParaOnBlur(){
            selectedPara.classList.remove("editPara");
            selectedPara.removeAttribute("contenteditable");
        }
    }

    document.getElementById("delAllBtn").addEventListener('click',function(){
       var checkedIndex = 0;
        for(var j=0; j<divArray.length; j++){
            if(divArray[j]){
                if(divArray[j].querySelector(`[data-checkBox="checkbox"]`).checked){
                    divArray[j].remove();
                    checkedArray[checkedIndex++] = j;
                }
            }
        }
        while(checkedIndex){
            divArray.splice(checkedIndex--,1);
        }
    });
};

TODOList.init();
