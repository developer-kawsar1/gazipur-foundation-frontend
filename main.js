

const tbody=document.getElementById('tbody')

fetch('https://gazipur-server.herokuapp.com/donors')
  .then(response => response.json())
  .then(data =>{
    document.getElementById('total').innerHTML=data.length
   // document.getElementById('loading').style.display='none'
     for(one of data.reverse() ){

// try date 

const newDate=new Date(one.date)  //donation date  
const date_2=new Date() //today 
let difference =newDate.getTime() -date_2.getTime() 

let totalDays=Math.ceil(difference/(1000*3600*24))

if(one.date==""){
  one.date='রক্ত দেয়া হয়নি'
}

        const tr=document.createElement('tr')
        tr.innerHTML=`
       
        <td data-label="নাম">${one.name} </td>
        <td id="group-name" data-label="রক্তের গ্রুপ">${one.blood.toUpperCase()}</td>
        <td data-label="ঠিকানা">${one.address} </td>
        <td data-label="মোবাইল"> 
        <a href="tel:${one.phone}">${one.phone}</a>

        
        
        </td>
        <td data-label="সর্বশেষ রক্তদানের তারিখ" >${one.date} ${" "}</td>
        <td data-label="অতিবাহিত হয়েছে">${Math.abs(totalDays)} দিন</td>
        <div id="action"> 
        
        <td>

        
        <img src='images/delete.svg' onclick="deleteBtnClick('${one._id}')" width='20' height='20'/></td>
        
        <div/>
        
        `  
        
        console.log(tr) 
        tbody.appendChild(tr)
     }
    console.log(data)
}); 





  // open modal 
  let modalBtn = document.getElementById("modal-btn")
  let modal = document.querySelector(".modal")
  let closeBtn = document.querySelector(".close-btn")
  modalBtn.onclick = function() {
    modal.style.display = "block"
  }
  closeBtn.onclick = function() {
    modal.style.display = "none"
  }
  window.onclick = function(e) {
    if (e.target == modal) {
      modal.style.display = "none"
    }
  }

  function submitForm() {
    const name = document.getElementById('name').value
    const address = document.getElementById('address').value

    const phone = document.getElementById('phone').value
    
    //select value
    
 var select = document.getElementById('group');
var blood = select.options[select.selectedIndex].value;
//console.log(value); // en
const date=document.getElementById('donation-date').value
    
    
    const donor = {
      name, 
      blood,
      date,
      address, 
      phone }
    
    fetch('https://gazipur-server.herokuapp.com/donors', {
        method: 'POST',
        body: JSON.stringify(donor),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) =>
      {
        console.log(json)
        location.reload()
    
      });
    console.log(donor)
    //   location.reload()
    //  modal.style.display='none'
  } 


  // edit button clicl


  function editBtnClick(){
    alert("edit button click")
  }

  function deleteBtnClick(item){ 
    const proceed=window.confirm('are you sure ?') 
    if(proceed){
    //  const url=`https://gazipur-server.herokuapp.com/donors/${item}`
    //alert(item)
    const url=`https://gazipur-server.herokuapp.com/donors/${item}`
      fetch(url,{
        method:'DELETE'
      }) 
      .then(res=>res.json())
      .then(date=>{
        // console.log(data); 
        //  alert("deleted") 
      window.location.reload()

       
      })  

    }
    // alert(item)
  }
  
  
  
  

  
  (function(document) {
    'use strict';

    var TableFilter = (function(myArray) {
      var search_input;

      function _onInputSearch(e) {
        //alert(7)
        search_input = e.target;
        var tables = document.getElementsByClassName(search_input.getAttribute('data-table'));
        myArray.forEach.call(tables, function(table) {
          myArray.forEach.call(table.tBodies, function(tbody) {
            myArray.forEach.call(tbody.rows, function(row) {
              var text_content = row.textContent.toLowerCase();
              var search_val = search_input.value.toLowerCase();
              row.style.display = text_content.indexOf(search_val) > -1 ? '' : 'none';
            });
          });
        });
      }

      return {
        init: function() {
          var inputs = document.getElementsByClassName('search-input');
          myArray.forEach.call(inputs, function(input) {
            input.oninput = _onInputSearch;
          });
        }
      };
    })(Array.prototype);

    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        TableFilter.init();
      }
    });

  })(document);
