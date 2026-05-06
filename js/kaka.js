let insulto = "BOTATE A LA VERGA";
let insulto2 = "CHINGA TU MADRE";
let insulto3 = "COME KAKA";

let alago = "ERES BASTANTE AGRADABLE";


function insultar() {
    let randomIndex = Math.floor(Math.random() * 3);
    let insultos = [insulto, insulto2, insulto3];
    alert(insultos[randomIndex]);
}

const userName = "Dani";


console.log(insultar() + (userName));
