let keys=['fname','lname', 'email','gender','phone', 'birthdate','univ', 'maj','employed'];

let tablee=document.getElementById('table');
if(tablee){

    const storedData=localStorage.getItem('myData');
    displayArray=JSON.parse(storedData);

    function addtr(i){
        let row=document.createElement('tr');
        let column=[];

        for(let j=0;j<keys.length;j++){
            column.push(document.createElement('td'));
            const text=document.createTextNode(displayArray[i][keys[j]]);
            column[j].appendChild(text);
            row.appendChild(column[j]);
        }
        tablee.appendChild(row);
    }

    for(let i=0;i<displayArray.length;i++){
            addtr(i);
    }

    let reset= document.getElementById("resetButton");
    reset.addEventListener('click',()=>{
        window.location.href='display.html';
    })
// }
    

    let searchButton=document.getElementById('searchButton');
    searchButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let searchBy=document.getElementById('searchBy').value;
        let searchKeyIndex=keys.indexOf(searchBy);
        let searchValue=document.getElementById('searchValue').value;

        let container = document.getElementById('table');
        tableRows=container.childNodes;
  
        searchKeyIndex++;
        for(let i=2; i<tableRows.length; i++){
            let actualValue=tableRows[i].querySelector('td:nth-child('+searchKeyIndex+')').innerHTML;
            if(actualValue !==searchValue){
                tableRows[i].remove();
                i--;
            }
         }
    })


    //***************** */
    function displayOptions(object){
        let visible=document.getElementsByClassName('hiddenManage');
        Array.from(visible).forEach((element)=>{
            element.style.display='none';
        })
        object.style.display='block';
    }

    let arraySelect=['filterSelect','sortSelect','searchSelect'];
    let arrayButtons=['filter','sort','search'];
    for(let i=0;i<arraySelect.length; i++){
        let filterSelect=document.getElementById(arraySelect[i]);
        if(filterSelect){
            let filter=document.getElementById(arrayButtons[i]);
            filterSelect.addEventListener('click', ()=>{displayOptions(filter)});
        }
    }
    // let filterSelect=document.getElementById('filterSelect');
    // if(filterSelect){
    //     let filter=document.getElementById('filter');
    //     filterSelect.addEventListener('click', ()=>{displayOptions(filter)});
    // }

    // let sortSelect=document.getElementById('sortSelect');
    // if(sortSelect){
    //     let sort=document.getElementById('sort');
    //     sortSelect.addEventListener('click', ()=>{displayOptions(sort)});
    // }
    // let searchSelect=document.getElementById('searchSelect');
    // if(searchSelect){
    //     let search=document.getElementById('search');
    //     searchSelect.addEventListener('click', ()=>{displayOptions(search)});
    // }

    //***************** */

    let filterButton=document.getElementById('filterButton');
    filterButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let gender=document.getElementById('filterGenderOptions').value;
        let employed=document.getElementById('filterEmployedOptions').value;

        let container = document.getElementById('table');
        let tableRows=container.childNodes;

         for(let i=2; i<tableRows.length; i++){
            let actualGender=tableRows[i].querySelector('td:nth-child(4)').innerHTML;
            let actualEmplyed=tableRows[i].querySelector('td:nth-child(9)').innerHTML;
            if((gender!=='any' && actualGender !==gender) || 
                (employed!='any' && actualEmplyed!==employed)){
                tableRows[i].remove();
                i--;
            }
         }
    })

    let sortButton=document.getElementById('sortButton');
    sortButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let sortBy=document.getElementById('sortBy').value;
        let sortKeyIndex=keys.indexOf(sortBy);
        let order=document.getElementById('order').value;

        let container = document.getElementById('table');
        tableRows=Array.from(container.getElementsByTagName('tr')).slice(1);

        if(sortBy==='fname' || sortBy==='lname'){
            tableRows.sort(function(row1,row2){

                aValue=row1.cells[sortKeyIndex].textContent;
                bvalue=row2.cells[sortKeyIndex].textContent;
                if(order==='ascending'){
                    if(aValue>bvalue)
                        return 1;
                    else
                        return -1;
                }
                else{
                    if(aValue<bvalue)
                        return 1;
                    else
                        return -1;
                }

            })
        }

        else if(sortBy==='birthdate'){
            function compareDates(date1, date2){
                let month1=date1.slice(5,6);
                let day1=date1.slice(8,9);
                let year1=date1.slice(0,3);
                let month2=date2.slice(5,6);
                let day2=date2.slice(8,9);
                let year2=date2.slice(0,3);

                if(year1>year2 || (year1===year2 && month1>month2)||(year1===year2 && month1===month2 && day1>day2)){
                    return 1;
                }
                else
                    return -1;
                
            }
            tableRows.sort(function(row1,row2){

                value1=row1.cells[sortKeyIndex].textContent;
                value2=row2.cells[sortKeyIndex].textContent;
                if(order==='ascending'){
                    return compareDates(value1, value2);
                }
                else{
                    return compareDates(value2, value1);
                }

            })
        }
        let rows=container.childNodes;
        while(rows.length>2){
            rows[2].remove();
        }
        if(sortBy==='regDate'){
            if(order=="ascending")
                window.location.href='display.html';
            else{
                for(let i=displayArray.length-1; i>=0; i--){
                    addtr(i);
                }
        
            }
        }
        else{
            for(let i=0; i<tableRows.length; i++){
                container.appendChild(tableRows[i]);
            }
        }
    })
}

