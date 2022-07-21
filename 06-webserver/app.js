import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//handlebars

hbs.registerPartials(__dirname + '/views/partials', function (err) {});

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs')


//Servir contenido estatico
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('home', {
        nombre: 'Jorge Carlos Pérez',
        titulo: 'Curso de Node'
    })
})


app.get('/generic', (req, res)=>{
    res.render('generic', {
        nombre: 'Jorge Carlos Pérez',
        titulo: 'Curso de Node'
    })
})

app.get('/elements', (req, res)=>{
    res.render('elements', {
        nombre: 'Jorge Carlos Pérez',
        titulo: 'Curso de Node'
    })
})

app.get('*', (req, res) => {
    res.sendFile(__dirname+'/public/old/404.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})