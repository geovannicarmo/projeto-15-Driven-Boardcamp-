import connection from "../../dbsStrategy/postgres.js"

export async function searchCustomers(req, res){

    const {rows: customers} = await connection.query( 'SELECT * FROM customers') 

    console.log(customers)
    return res.send(customers)



}