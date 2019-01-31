

const fs = require('fs');

let listadoPorHacer=[];

const guardarDB=()=>{

	let data=JSON.stringify(listadoPorHacer); //convierte la informacion a formato JSON.

	fs.writeFile(`dataBase/data.json`, data, (err) => {
     if (err) throw new Error('No se pudo grabar',err);
  //Sino existe error:
     console.log('Archivo Actualizado.');
});


}

const cargarDB=()=>{
	try{
		listadoPorHacer=require('../dataBase/data.json');

	}catch(error){
		listadoPorHacer=[];
	};
	

}

const crear=(descripcion)=>{
	cargarDB();

	let porHacer={
		descripcion,
		completado:false
	};

	listadoPorHacer.push(porHacer);
	guardarDB();

	return porHacer;

}

const getListado=()=>{
	cargarDB();
	return listadoPorHacer;
}


const actualizar=(descripcion,completado=true)=>{

	cargarDB();

	let index= listadoPorHacer.findIndex(tarea=>{//busca el indice donde se encuentre el item que coincida con el argumento, en este caso, 'descripcion'.
		return tarea.descripcion===descripcion;

		});

	if(index>=0){
		listadoPorHacer[index].completado=completado;
		guardarDB();
		return true;
	}else{
		return false;
	}
}

const borrar=(descripcion)=>{

	cargarDB();

	let nuevoListado= listadoPorHacer.filter(tarea=>{//busca el indice donde se encuentre el item que coincida con el argumento, en este caso, 'descripcion'.
		return tarea.descripcion !==descripcion;

		});

	if(listadoPorHacer.length===nuevoListado.length){
		return false;
	}else{
		listadoPorHacer=nuevoListado;
		guardarDB();
		return true;
	}

}
module.exports={
	crear,
	getListado,
	actualizar,
	borrar
};