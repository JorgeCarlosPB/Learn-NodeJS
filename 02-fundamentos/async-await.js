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

const getEmpleado = (id) => { 
    return new Promise((resolve, reject)=>{
        const empleado = empleados.find(e => e.id === id)?.nombre;
        (empleado)
            ? resolve(empleado)
            : reject(`No existe algún empleado con id ${id}`);
    });
}

const getSalario= (id) => {
    return new Promise((resolve, reject)=>{
        const salario = salarios.find(s => s.id === id)?.salario;
        (salario)
            ?resolve (salario)
            : reject(`No existe el salario con id ${id}`);
    });
}

const getInfoUsuario = async(id)=>{
    try {
        const empleado = await getEmpleado(id)
        const salario = await getSalario(id)
        return `El salario del empleado: ${empleado} es de ${salario}`;
    } catch (error) {
        return error;   
    }
}

const id=2

getInfoUsuario(id)
    .then(msg => {
        console.log('TODO BIEN')
        console.log(msg)
    })
    .catch(err => {
        console.log('TODO MAL')
        console.log (err)
    })

