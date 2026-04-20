let json1 = document.getElementById('json1');
let json2 = document.getElementById('json2');
let compareButton = document.getElementById('compare');
let result = document.getElementById('result');

compareButton.addEventListener('click',()=>{
    let obj1, obj2;
    try {
        obj1 = JSON.parse(json1.value);
        obj2 = JSON.parse(json2.value);
    } catch (e) {
        result.innerHTML = '<p style="color:red;">Invalid JSON format. Please correct it.</p>';
        return;
    }

    let differences = findDifferences(obj1, obj2);
    if (differences.length === 0) {
        result.innerHTML = '<p style="color:green;">The JSON objects are identical.</p>';
    } else {
        result.innerHTML = '<h3>Differences:</h3><ul>' + differences.map(diff => `<li>${diff}</li>`).join('') + '</ul>';
    }
})

function findDifferences(obj1,obj2){
    let differences = [];

    for(let key in obj1){
        if(!(key in obj2)){
            differences.push(`Key "${key}" is missing in JSON 2`);
        } else if((typeof obj1[key] === 'object' && typeof obj2[key] === 'object') || (Array.isArray(obj1[key]) && Array.isArray(obj2[key]))){
            differences = differences.concat(findDifferences(obj1[key], obj2[key]));
        } else if(obj1[key] !== obj2[key]){
            differences.push(`Key "${key}": ${obj1[key]} vs ${obj2[key]}`);
        }
    }

    for(let key in obj2){
        if(!(key in obj1)){
            differences.push(`Key "${key}" is missing in JSON 1`);
        }
    }

    return differences;
}