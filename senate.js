

let header = new Headers({"X-API-Key":"FTskuWn5Fuqi8FAY1hOF76cYje9lrCcqT5iHDxB6"});
let headerInit = { headers: header };
let senado=""
if(document.title.includes(`Senate`)){
    senado=`senate`
}else{
    senado=`house`
}

const url=`https://api.propublica.org/congress/v1/113/${senado}/members.json`  

let data;
let miembros;
let states = [];
fetch(url,headerInit)
.then(response=>{
    return response.json()
}).then(data=>{

    miembros= data.results[0].members

    cargarTabla(miembros)
      
   miembros.forEach(m => {
   states.push(m.state)

});
stateRepetidos(states)
    
    state(states)
  
})


// let miembros = data.results[0].members

   function stateRepetidos(array) {
    for (let i = 0; i < array.length; i++) {
      for (let l = i + 1; l < array.length; l++) {
        if (array[i] == array[l]) {
           array.splice(l,1)
        }
  
      }
    }
  }

 


function cargarTabla(array) {

    // let members = data.results[0].members
    let senateData = document.querySelector(`#senate-data`)
    let chDemocratas = document.getElementById("chDemocratas");
    let chRep = document.getElementById("chRep");
    let chInd = document.getElementById("chInd");
    let checkeds = [];
 


    if (chInd.checked) {
        checkeds.push(chInd.value)
    }
    if (chDemocratas.checked) {
        checkeds.push(chDemocratas.value)

    }
    if (chRep.checked) {
        checkeds.push(chRep.value)

    }

    senateData.innerHTML = "";
    let resultados= []
     resultados.push(selec.value)
     console.log(resultados)
    array.forEach(member => {
        if (checkeds.includes(member.party )) {
            if(resultados.includes(member.state) || resultados.includes("state")){
            senateData.innerHTML +=
                `<tr>
 
    <td><a href =" ${member.url}"> ${member.first_name} ${member.middle_name || ""} ${member.last_name} </a> </td>
    <td ${member.first_name}  ${member.middle_name || ""}  </td>
     <td>${member.party} </td>
    <td>${member.state} </td>
    <td>${member.seniority} </td>
    <td> ${member.votes_with_party_pct}%</td>

 </tr>
      
`;
        }
}
    });
}


function state(estado) {

for (let i = 0;i < estado.length; i++) {

     selec.innerHTML +=
            ` <option value="${estado[i]}">${estado[i]}</option>
`;
    }
;

}





























