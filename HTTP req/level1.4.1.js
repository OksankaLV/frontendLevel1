
const nsurname = `olashkevych`;

const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Ім’я', value: 'name', input: { type: 'text' }},
    {title: 'Прізвище', value: 'surname', input: { type: 'text' }},
    {title: 'Вік', value: (user) => getAge(user.birthday),  input: { type: 'date', name: 'birthday', label: 'День народження' }}, // функцію getAge вам потрібно створити*/
    { title: 'Фото',  value: (user) => `<img src="${user.avatar}" alt="${user.name} ${user.surname}"/>`, input: {type: 'text', name: 'avatar', label: 'Фото'}}
  ],
  apiUrl: `https://mock-api.shpp.me/${nsurname}/users`
};

const config2 = {
  parent: '#productsTable',
  columns: [
    {title: 'Назва', value: 'title', input: { type: 'text' }},
    {title: 'Ціна', value: (product) => `${product.price} ${product.currency}`,  input: [
        { type: 'number', name: 'price', label: 'Ціна' },
        { type: 'select', name: 'currency', label: 'Валюта', options: ['$', '€', '₴'], required: false }
      ]},
    {title: 'Колір', value: (product) => getColorLabel(product.color),  input: { type: 'color', name: 'color' }}, // функцію getColorLabel вам потрібно створити
  ],
  apiUrl: `https://mock-api.shpp.me/${nsurname}/products`
};

function getAge(birthday) {
  const nowDay = new Date();
  const birthDayDate = new Date(birthday);
  const age = Math.floor((nowDay.getTime()-birthDayDate.getTime())/(365.25*24*60*60*1000));
  return age;
}

function getColorLabel(color) {
  return `<div style="background:${color}; width: 100%;height: 20px;border-radius: 50%"></div>`;
}



function DataTable(config) {
  // Тут у принципі те саме що й на минулому рівні було
  // тільки якщо не приходить параметр data, то потрібно перевірити,
  // можливо в конфізі є поле apiUrl
  // і тоді дані потрібно брати звідти
  const value = [];
 
  //first add place for table
  const place = config.parent;
  const divTable = document.querySelector(place);
  const table = document.createElement('table');
  table.id = place;
  divTable.appendChild(table);
  
  

  // creation of a table header by config
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const trThead = document.createElement('tr');
  thead.appendChild(trThead);
  const thNumber = document.createElement('th');
  thNumber.innerHTML = "№";
  trThead.appendChild(thNumber);
  for (let i in config.columns) {
    const th = document.createElement('th');
    th.innerHTML = config.columns[i].title;
    const val = config.columns[i].value
    value.push(val);
    trThead.appendChild(th);
  }
  addActionsColumn(trThead);
  addButtonInsert(thead);

  postData(url = config.apiUrl).then(req => addData(req.data)).then(data => addColumnsTable(data));
  
  function addData(obj) {
    let data = [];

    for (let i in obj) {
      const user = obj[i]
      let newObj = { id: i };
      for (let j of value) {
        if (typeof j !== 'function') {
          newObj = { ...newObj, [j]: user[j] }
        } else {
          newObj = { ...newObj, [j]: j(user) }
        }
      }
      data.push(newObj);
    }
    return data;
  }

  // creating the main part of the table
   
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  //line first
  function addColumnsTable(data) {
    
    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement('tr');
      tbody.appendChild(tr);
      const number = document.createElement('td');
      number.innerHTML = i + 1;
      tr.appendChild(number);

      // columns in each row        
      for (let j = 0; j < value.length; j++) {
        let td = document.createElement('td');
        let key = data[i][value[j]];
        key == undefined ? td.innerHTML = " " : td.innerHTML = data[i][value[j]];
        if (value[j] == 'Action') {
          td.innerHTML = `<button class="buttonDel" data-id="${i + 1}" onclick='deleteRow( ${data[i].id}, ${JSON.stringify(config)})'>Delete</button>`
          const buttonRewrite = document.createElement('button')
          buttonRewrite.className = "buttonRewrite";
          buttonRewrite.innerHTML = "Редагувати"
          buttonRewrite['data-id'] = data[i].id;
          buttonRewrite.onclick = rewriteRow;
          td.appendChild(buttonRewrite)
          
        };   
        tr.appendChild(td);
      }
    } return data;
  }



  function addActionsColumn(elemParent) {
    const th = document.createElement('th')
    th.innerHTML = "Action"
    elemParent.appendChild(th);
    value.push("Action");
  }
  function addButtonInsert(elemParent) {
    const tr = document.createElement('tr');
    const th = document.createElement('th')
    const buttonInsert = document.createElement('button');
    buttonInsert.innerHTML = 'Додати'
    buttonInsert.onclick = addInsertRow;
    th.appendChild(buttonInsert)
    tr.appendChild(th)
    elemParent.appendChild(tr)

    function addInsertRow(event) {
      const properties = config.columns.map(el => el);
      console.log(properties)
      for (let i = 0; i < properties.length; i++) {
        const dataInput = properties[i].input;
        console.log(Object.keys(dataInput))
        if (typeof dataInput[0] === 'object') {
          dataInput.forEach(element => {
            addInput(element, i)
          });
        } else { addInput(dataInput, i) }
      }

      function addInput(oneInput, i) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.id = oneInput.name || properties[i].value;
        input.name = oneInput.name || properties[i].value;
        label.innerHTML = oneInput.name || properties[i].title;
        thInput = document.createElement('th');
        if (oneInput.type != 'select') {
          for (let k in oneInput) {
            input[k] = oneInput[k]
            input.className = 'inputData'
            if (oneInput.required !== false) { input.required = true }
            input.onkeydown = verifyOutputCell;
            thInput.appendChild(label);
            label.appendChild(input)
            tr.appendChild(thInput)
          }
        } else {
          const select = document.createElement('select');
          select.id = input.id;
          select.name = input.name;
          select.className = 'inputData'
          if (oneInput.required !== false) { select.required = true }
          thInput.appendChild(label);
          oneInput.options.forEach(el => {
          const option = document.createElement('option');
            option.value = el;
            option.innerHTML = el;
            select.appendChild(option)
          })
          label.appendChild(select)
          tr.appendChild(thInput)
        }

        function verifyOutputCell(event) {
          console.log(event)
          if (event.key === "Enter") {
            document.querySelectorAll(".inputData").forEach(
              el => {
                if (el.value === '') {
                  el.classList.add('.redBorder')
                  el.focus();
                  return error;
                } else {
                  el.classList.remove('.redBorder')
                }
              }
            )
            console.log(document.querySelectorAll('.redBorder'))
            if (document.querySelectorAll('.redBorder').length===0){
              document.querySelector("#inputButton").click()
            }
          }

        }
      }
         
      const input = document.createElement('input')
      input.id = 'inputButton';
      input.type = 'button';
      input.value = "Зберегти";
      input.onclick = addNewData;
      thInput = document.createElement('th');
      thInput.appendChild(input)
      tr.appendChild(thInput)
    }
    
    async function addNewData() {
      //document.querySelector(`${config.parent} table`).remove();
      const url = config.apiUrl;
      console.log(url);
      const res = document.querySelectorAll('.inputData')
      let obj = {};
      for (let i = 0; i < res.length; i++) {
        resKey = res[i].id
        resVal = res[i].value
        console.log(resKey, resVal)
        obj = { ...obj, [resKey]: resVal }
      
    }
     console.log(obj)
    const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(obj), // body data type must match "Content-Type" header*/
  });
      return await response.json().then((res) => {
        document.querySelector(`${config.parent} table`).remove(); return res
      }).then(DataTable(config)); // parses JSON response into native JavaScript objects 
    }
  }
  function rewriteRow() {
    const inputNow = document.querySelector('.inputRewrite');
    if (inputNow != null) { inputNow.remove() };
    const elemParent = event.srcElement;
    const id = elemParent['data-id']
    const tr = document.createElement('tr')
    tr.className = 'inputRewrite'
    elemParent.removeEventListener('click',rewriteRow)
    console.log(event.srcElement)
const properties = config.columns.map(el => el);
      console.log(properties)
      for (let i = 0; i < properties.length; i++) {
        const dataInput = properties[i].input;
        console.log(Object.keys(dataInput))
        if (typeof dataInput[0] === 'object') {
          dataInput.forEach(element => {
            addInput(element, i)
          });
        } else { addInput(dataInput, i) }
    } 
  elemParent.parentNode.appendChild(tr);

      function addInput(oneInput, i) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.id = oneInput.name || properties[i].value;
        input.name = oneInput.name || properties[i].value;
        label.innerHTML = oneInput.name || properties[i].title;
        thInput = document.createElement('th');
        if (oneInput.type != 'select') {
          for (let k in oneInput) {
            input[k] = oneInput[k]
            input.className = 'inputData'
            if (oneInput.required !== false) { input.required = true }
            input.onkeydown = verifyOutputCell;
            thInput.appendChild(label);
            label.appendChild(input)
            tr.appendChild(thInput)
          }
        } else {
          const select = document.createElement('select');
          select.id = input.id;
          select.name = input.name;
          select.className = 'inputData'
          if (oneInput.required !== false) { select.required = true }
          thInput.appendChild(label);
          oneInput.options.forEach(el => {
          const option = document.createElement('option');
            option.value = el;
            option.innerHTML = el;
            select.appendChild(option)
          })
          label.appendChild(select)
          tr.appendChild(thInput)
        }

        function verifyOutputCell(event) {
  
          if (event.key === "Enter") {
            document.querySelectorAll(".inputData").forEach(
              el => {
                if (el.value === '') {
                  el.classList.add('.redBorder')
                  el.focus();
                  return error;
                } else {
                  el.classList.remove('.redBorder')
                }
              }
            )
            console.log(document.querySelectorAll('.redBorder'))
            if (document.querySelectorAll('.redBorder').length===0){
              replaceDate(id,config)
            }
          }
        }
      }
  }
}

DataTable(config1);
DataTable(config2);

async function postData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    /*body: JSON.stringify(data), // body data type must match "Content-Type" header*/
  }).catch(error=>console.log(error));
  return await response.json();
  // parses JSON response into native JavaScript objects
}
async function deleteRow(id, config) {
 
 const urlDel = config.apiUrl + '/' + id;
 
  const response = await fetch(urlDel, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(), // body data type must match "Content-Type" header*/
  });
  return await response.json().then((res) => {
        document.querySelector(`${config.parent} table`).remove(); return res
      }).then(DataTable(config));; // parses JSON response into native JavaScript objects 

}
async function replaceDate(id, config) {
 const urlPut = config.apiUrl + '/' + id;

  const res = document.querySelectorAll('.inputData')
    let obj = {};
    for (let i = 0; i < res.length; i++) {
      resKey = res[i].id
      resVal = res[i].value
    obj = { ...obj, [resKey]: resVal }

  }

  const response = await fetch(urlPut, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(obj), // body data type must match "Content-Type" header*/
  });
  return await response.json().then((res) => {
        document.querySelector(`${config.parent} table`).remove(); return res
      }).then(DataTable(config));; // parses JSON response into native JavaScript objects 
  
}

