import connection from "../../dbsStrategy/postgres.js"

export async function searchCustomers(req, res){

    const partCpf = req.query.cpf;
console.log(partCpf)
    if(partCpf){

    const {rows: customers} = await connection.query( `SELECT * FROM customers WHERE LOWER(customers.cpf) LIKE ($1) `, [`${partCpf}%`]) 
    return res.send(customers)
    } else{
        const {rows: customers} = await connection.query( `SELECT * FROM customers `)
        return res.send(customers)
    }


    

}

export async function searchCustomer(req, res){

    
    const idCustomer = req.params.id
    console.log(idCustomer)

    const {rows: customer} = await connection.query(`
        SELECT  * FROM customers  
        WHERE   id = ($1)
    `, [idCustomer])

    if(customer.length===0){
        return res.sendStatus(404)
    }

    res.send(customer[0])
}