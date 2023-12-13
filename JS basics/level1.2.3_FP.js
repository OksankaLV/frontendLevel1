/*Task: make a function that accepts text in CSV format, 
and returns a function that will accept any text as an input and replace the city names in it with a string of the type
 "city name" (10th place in the TOP-10 largest cities of Ukraine, population UUUUUU person/people/people)".
again:
function1: accepts CSV, returns... function2, into which the data parsed from CSV was closed.
function2: accepts text, returns... rich text.
In the line in CSV format, the coordinates (x, y) are indicated in the first two columns, 
then the name of the city, and then the population of this city, separated by a comma. 
There may also be empty lines or comments (lines starting with #).*/

let textCSV = `
44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,
50.45,30.51,Київ,2967350,
50.00,36.13,Харків,1443207,
48.30,32.16,Кропивницький,225339,
46.29,30.74,Одеса,1017699,
50.44,25.19,Луцьк,215317,

# в цьому файлі три рядки-коментаря :)`;

function insertInfoTown(textformCSV) {
    let infoText = /^(\d\d\.\d\d,){2}.*,\d*/
    let textRes = textformCSV.split("\n")
        .filter(text => text.match(infoText))
        .map(text => {
            let info = text.replace("#", "").split(",");
            info.length=4;
            return { x: info[0], y: info[1], name: info[2], population: info[3] }
            })
        .sort((a,b) => (b.population-a.population))
        .slice(0, 10)
        .reduce((obj, elem, index) => {
            let people;
            switch (elem.population%10) {
                case 1: people = 'людина'
                    break;
                case 2, 3, 4: people = 'людини'
                    break;
                default: people = 'людей'
                    break;
            }          
            return { ...obj, [elem.name]: `${index + 1} місце в ТОП-10 найбільших міст України, населення ${elem.population} ${people}` }
        }, {}
    )
    return (text) => {
        Object.entries(textRes).forEach(([key, value]) => text = text.replace(key, `"${key}" (${value})`))
        return text
    }
}

let textWithCity = insertInfoTown(textCSV);

console.log(textWithCity('Моє рідне місто Кропивницький'))
console.log(textWithCity('Київ - столиця України'))
console.log(textWithCity('Найбільші міста України - Київ, Харків та Одеса'))


