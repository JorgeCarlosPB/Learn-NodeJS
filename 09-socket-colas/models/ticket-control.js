import path from 'path'
import fs from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import datos from '../db/data.json' assert {type: "json"};

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {

    constructor(){
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []

        this.init()
    }

    get toJson (){
        return {
            ultimo:this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    init(){
        const {hoy, tickets, ultimo, ultimos4} = datos
        if(hoy === this.hoy){
            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimos4 = ultimos4
        }else{
            this.guardarDB()
        }
    }

    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente(){
        this.ultimo += 1
        const ticket = new Ticket (this.ultimo, null)
        this.tickets.push(ticket)

        this.guardarDB()
        return 'Ticket' + ticket.numero
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return null
        }

        const ticket = this.tickets.shift()
        ticket.escritorio = escritorio

        this.ultimos4.unshift(ticket)

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1)
        }

        this.guardarDB()

        return ticket
    }
}

export{
    TicketControl,

}