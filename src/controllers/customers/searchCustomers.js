import connection from "../../dbsStrategy/postgres.js"

export async function searchCustomers(req, res){

    const {rows: customers} = await connection.query( 'SELECT * FROM customers') 

    console.log(customers)
    return res.send(customers)

}

export async function searchCustomer(req, res){

    
    const idCustomer = req.params.id
    console.log(idCustomer)

    const {rows: customer} = await connection.query(`
        SELECT  * FROM customers  
        WHERE   id = ($1)
    `, [idCustomer])

    console.log(customer[0])
    res.send(customer[0])
}