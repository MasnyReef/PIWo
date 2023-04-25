"use strict"
// var zmienna = "napis"; // niezalecane
// let zmiennaZmienna = 123;
// const zmienna = "pies";  // 90% ta
// const lista = [1,2,3];
// lista = ["a","b"];

// function funkcja(a,b,c){
//     //ciało fcji
// }

// const nazwaFunkcji = function(a,b,c){
//     //ciało fxji
// }

// const funkcjaStrzalkowa = (a,b,c) =>{
//     //najlepsze cialo fcji
// }

const adder = () => {
    console.log("jestem zmija")
    const numberA = document.getElementById("number-a").value;
    const numberB = document.querySelector("#number-b").value;
    console.log({numberA});
    console.log({numberB});

    const numA = Number(numberA);
    const numB = Number(numberB);

    if(isNaN(numA) || isNaN(numB)){
        console.log("nie jest liczba");
        $("#modal").show("slow");
        $("#modal").off("click").click(()=>{
            $('#modal').hide("slow");
        })
        return;
    }

    const sum = numA + numB;
    console.log(`${numA} + ${numB} = ${sum}`);

    const listOfOperations = document.getElementById("operations-list");
    const p = document.createElement("p");
    p.innerHTML = `${numA} + ${numB} = ${numA + numB}`;

    listOfOperations.append(p);

}