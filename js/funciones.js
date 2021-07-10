var searchP = document.getElementById('inputP');
var table = 0;

function search(){
    if(searchP.value == ""){
        alert('La caja de texto esta vacio');
    }else{
        answer(searchP.value);
    }
}

function answer(searchP){
    var campo = document.getElementById('inputC').value;
    fetch('http://localhost:3000/bebidas/'+campo+'/'+searchP)
    .then(Response => Response.json())
    .then(function content(info){
        console.log(info);
            if(table == 0){
            showTable = document.getElementById('tableP').classList.remove('d-none');
            table = 1;
        }
        for(var n=0;n<info.bebidas_Obj.length;n = n+1){
            document.getElementById('bodyT').innerHTML +=
            '<tr>'+
            '<th scope="row">'+info.bebidas_Obj[n].nombre+'</th>'+
            '<td>'+info.bebidas_Obj[n].precio+'</td>'+
            '<td>'+info.bebidas_Obj[n].stock+'</td>'+
            '<td>'+info.bebidas_Obj[n].sabor+'</td>'+
        '</tr>';
        }
        
    }).catch(function Error(){
        showTable = document.getElementById('tableP').classList.add('d-none');
            table = 0;
        alert('No existe el producto');
    })
}

function show(){

    fetch('http://localhost:3000/bebidas/')
    .then(Response => Response.json())
    .then(function content(info){
        console.log(info);
        for(var n=0;n<info.bebidas.length;n = n+1){
            document.getElementById('bodyT').innerHTML +=
            '<tr>'+
            '<th scope="row">'+info.bebidas[n].nombre+'</th>'+
            '<td>'+info.bebidas[n].precio+'</td>'+
            '<td>'+info.bebidas[n].stock+'</td>'+
            '<td>'+info.bebidas[n].sabor+'</td>'+
        '</tr>';
        }
    }).catch(function Error(){
        alert('Fallo *Search()*');
    })
}   


async function add(){
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var stock = document.getElementById('stock').value;
    var sabor = document.getElementById('sabor').value;
    
    const response = await fetch('http://localhost:3000/bebidas/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({nombre:nombre,precio:precio,stock:stock,sabor:sabor}) // body data type must match "Content-Type" header
      });
      res = response.json()
      return res; // parses JSON response into native JavaScript objects
      alert('Registrado con exito');
      console.log(res);
}