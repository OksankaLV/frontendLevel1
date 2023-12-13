function DataTable(config, data) {
    /*… // вміст цієї функції вам потрібно написати :)*/
    let place = config1.parent;
    const divTable = document.querySelector(place);
    let table = document.createElement('table');
    divTable.appendChild(table);
    let value = [];
    // creation of a table header by config
    let thead = document.createElement('thead');
        table.appendChild(thead);
    let trThead = document.createElement('tr');
        thead.appendChild(trThead);
    let thNumber = document.createElement('th');
        thNumber.innerHTML = "№";
        trThead.appendChild(thNumber);
    for (let i = 0; i < config.columns.length; i++){
        let th = document.createElement('th');
        th.innerHTML = config.columns[i].title;
        let sort = document.createElement('span');
        sort.className = 'sortMin';
        th.appendChild(sort);
        let val = config.columns[i].value
        value.push(val);
        trThead.appendChild(th);
        
    }

    // creating the main part of the table
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    //line first
    for (let i = 0; i < data.length; i++){
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        let number = document.createElement('td');
        number.innerHTML = i + 1 
        tr.appendChild(number);

        // columns in each row
        for (let j = 0; j < value.length; j++){
            let td = document.createElement('td');
            let key = data[i][value[j]];
            key == undefined? td.innerHTML = " ": td.innerHTML = data[i][value[j]];
            tr.appendChild(td);

        }
    
    /*  first way
      let obj = data[i];
        for (let key in obj) {
            let td = document.createElement('td');
            td.innerHTML = obj[key];
            if (key == 'id') { td.innerHTML = i+1 }
            tr.appendChild(td);
        }  */
        

    }
}

const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Ім’я', value: 'name'},
    {title: 'Прізвище', value: 'surname'},
    {title: 'Вік', value: 'age'},
  ]
};

const users = [
  {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
  {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
];

const config2 = {
  parent: '#usersTable',
  columns: [
    {title: 'Name', value: 'name'},
    {title: 'Surname', value: 'surname'},
    {title: 'Age', value: 'age' },
    {title: 'Other data', value: 'other' },
    {title: '...', value: 'last'}
  ]
};

const data2 = [
  {id: 30050, name: 'Вася', surname: 'Петров', age: 12, other:"hjgfd", last: "jfiuyg"},
    { id: 30051, name: 'Вася', surname: 'Васечкін', age: 15, o:"hjgfd", last: "jfiuyg" },
    { id: 30052, name: 'Саша', surname: 'Чудовий', age: 32, other:"hjgfd" },
    { id: 30053, surname: 'Пушинка', age: 7, name: 'Анна', last: "other none"  },
  
];

DataTable(config1, users);
DataTable(config2, data2);

let sort =  document.querySelectorAll('th span');

sort.forEach(function(element) {
  element.addEventListener('click', sorting);

  function sorting() {
    element.classList.toggle('sortMax');
    sortData(element);
  }
});

function sortData(element) {
  let text = element.parentNode.innerHTML
  text = text.replace(/<.*/, '');
  alert(`Функія сотрування по колнці "${text}" ще відсутня`)
}
