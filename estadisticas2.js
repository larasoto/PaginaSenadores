let header = new Headers({ "X-API-Key": "FTskuWn5Fuqi8FAY1hOF76cYje9lrCcqT5iHDxB6" });
let headerInit = { headers: header };
let senado = ""
if (document.title.includes(`PartySenate`)) {
     senado = `senate`
} else {
     senado = `house`
}

const url = `https://api.propublica.org/congress/v1/113/${senado}/members.json`

let data;
let members; 
let miembrosFil;

let static = estadisticas
fetch(url, headerInit)
     .then(response => {
          return response.json()
     }).then(data => {
          members = data.results[0].members
         miembrosFil= members.filter(m => m.votes_with_party_pct != null)
        filtrarPorPartido(members)
       porcentajeVotosPartido(members)
       rellenado(members)
       leastLoyalFunction(members)
       mostLoyale(members)
     });


function filtrarPorPartido(v1){
estadisticas.numDemocrates = v1.filter(m => m.party == "D")
estadisticas.numInd = v1.filter(m => m.party == "ID")
estadisticas.numRepres = v1.filter(m => m.party == "R")
 estadisticas.total = estadisticas.numDemocrates.length + estadisticas.numInd.length + estadisticas.numRepres.length;
}


function porcentajeVotosPartido() {
    let votosDemo = 0
    let votosInd = 0
    let votosRepre = 0

estadisticas.numDemocrates.forEach(member => {
     votosDemo = votosDemo + member.votes_with_party_pct;
}
)
  estadisticas.numInd.forEach(member => {
   votosInd = votosInd + member.votes_with_party_pct;
}
)  
  estadisticas.numRepres.forEach(member => {
     votosRepre = votosRepre + member.votes_with_party_pct;
}
)

estadisticas.porcentajeRepre = Math.round(votosRepre / estadisticas.numRepres.length);
estadisticas.porcentajeDemo = Math.round(votosDemo / estadisticas.numDemocrates.length);

if (estadisticas.numInd.length > 0) {
     estadisticas.porcetajeInd = Math.round(votosInd / estadisticas.numInd.length);
}
if(estadisticas.porcetajeInd > 0){
    estadisticas.pct = Math.round((estadisticas.porcetajeInd + estadisticas.porcentajeDemo + estadisticas.porcentajeRepre) / 3);
}else{
 estadisticas.pct = Math.round((estadisticas.porcetajeInd + estadisticas.porcentajeDemo + estadisticas.porcentajeRepre) / 2);
}


estadisticas.miembros = members

} 


let tbody = document.getElementById(`tbody`);
let leastLoyal = document.getElementById("leastLoyal")
let mostLoyal = document.getElementById("mostLoyal")
tbody.innerHTML = ``;
leastLoyal.innerHTML=``;
mostLoyal.innerHTML=``;

function rellenado() {
    tbody.innerHTML += `
     <tr>
     <td>Republicans</td>
     <td>${estadisticas.numRepres.length}</td>
    <td>${estadisticas.porcentajeRepre}</td></tr>
     <tr>
     <td>Democrats</td>
     <td>${estadisticas.numDemocrates.length}</td>
     <td>${estadisticas.porcentajeDemo}</td></tr>
     <tr>
    <td>Independents</td>
     <td>${estadisticas.numInd.length}</td>
     <td>${estadisticas.porcetajeInd}</td></tr>
     <td>Total</td>
     <td>${estadisticas.total}</td>
     <td>${estadisticas.pct}</td></tr>
   
  `
}


function leastLoyalFunction() {
    miembrosFil .sort((a, b) => {
        if (a.votes_with_party_pct < b.votes_with_party_pct) {
            return -1
        }
        if (a.votes_with_party_pct > b.votes_with_party_pct) {
            return 1
        }
        return 0;
    })
       let i = 0
    while (i < miembrosFil.length * 0.10) {
        leastLoyal.innerHTML += `
                 <tr>
                 <td>${miembrosFil[i].first_name} ${miembrosFil[i].last_name} </td>
                 <td>${miembrosFil[i].missed_votes_pct} </td>
               <td>${miembrosFil[i].votes_with_party_pct} </td>
               
                </tr>`
        i++
    }
}




function mostLoyale() {
    miembrosFil.sort((a, b) => {
        if (a.votes_with_party_pct >  b.votes_with_party_pct) {
            return -1
        }
        if (a.votes_with_party_pct < b.votes_with_party_pct) {
            return 1
        }
        return 0;
    })

let i = 0
    while (i < miembrosFil.length * 0.10) {
        mostLoyal.innerHTML += `
                         <tr>
                         <td>${miembrosFil[i].first_name} ${miembrosFil[i].last_name} </td>
                        <td>${miembrosFil[i].missed_votes} </td>
                         <td>${miembrosFil[i].votes_with_party_pct}  </td></tr>`
        i++
    }
}



    

