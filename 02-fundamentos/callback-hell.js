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
        id:1,
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

const getEmpleado = (id, callback) =>{
    const empleado = empleados.find((e)=> e.id === id)
    if(empleado){
        callback(null, empleado);
    } else{
        callback(`Empleado con id ${id} no existe`)
    }
}
const getSalario = (id, callback) =>{
    const salario = salarios.find((s)=> s.id ===id)
    if(salario){
        callback(null, salario);
    }else{
        callback(`No existe salario de empleado con id ${id}`)
    }

}

const id = 2;

getEmpleado(id, (err, empleado)=>{
    if(err){
        console.log('ERROR!');
        return console.log(err);
    }

    console.log('Empleado existe')
    console.log(empleado)
})

getSalario(id, (err, salario) =>{
    if(err){
        console.log('ERROR!');
        return console.log(err);
    }

    console.log(salario)
})