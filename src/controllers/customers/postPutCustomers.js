import connection from "../../dbsStrategy/postgres.js";

export async function addCustomers(req,res){

    try{

        const {body: newCustomer} = req
        
       await connection.query (`
        INSERT INTO customers 
        (  name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`,
        [newCustomer.name, newCustomer.phone,  newCustomer.cpf,  newCustomer.birthday]
        )
        
        return res.sendStatus(201)

    }catch{
        return res.sendStatus(400)
    }
}