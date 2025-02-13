const empleados = [
    {
        id:1,
        nombre: 'Jorge'
    },
    {
        id:2,
        nombre: 'María'
    },
    {
        id:3,
        nombre: 'Daniela'
    }
]

const salarios = [
    {
        id:1,
        salario: 1000
    },
    {
        id:2,
        salario: 500
    },

]

const getEmpleado = (id) =>{ 
    return new Promise((resolve, reject)=>{
        const empleado = empleados.find(e => e.id === id)?.nombre;
        (empleado)
            ? resolve(empleado)
            : reject(`No existe el empleado con id ${id}`);
    })
}

const getSalario= (id)=>{
    return new Promise((resolve, reject)=>{
        const salario = salarios.find(s => s.id === id)?.salario;
        (salario)
            ?resolve (salario)
            : reject(`No existe el salario con id ${id}`);
    })
}

const id = 2

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch(err => console.log(err))

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch(err => console.log(err))

let nombre;

getEmpleado(id)
    .then(empleado => {
        nombre =empleado;
        return getSalario(id)
    })
    .then(salario => console.log(`El emplado: ${nombre} tiene un salario de: ${salario}`) )
    .catch(err => console.log (err));