const variosTipos = ["Mamona", 10, [1,2]];
console.log(variosTipos[2][1]);
variosTipos[3] = 15;
variosTipos[10] = 100;
console.log(variosTipos);

const array = [1, 2, 3, 4, 5, 6, 7];

//console.log(array.length);
array.push("push");
array.shift();
array.pop();

var localizado = array.indexOf(4);
const valor = array.find(elemento => elemento === 3);
console.log(valor);

var arrayString = array.join('');
console.log(arrayString);



//console.log(localizado);

//console.log(array);

if(10 === '10'){
    console.log('Verdadeiro')
}
else{
    console.log('Falso')
}
