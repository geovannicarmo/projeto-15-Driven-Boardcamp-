import connection from "../../dbsStrategy/postgres.js";
import customerSchema from "../../schema/schemaCustomers.js";

export async function addCustomers(req,res){

    try{
    
    const {body: newCustomer} = req
    
    const validation = customerSchema.validate(req.body);
    
    if(validation.error){
        console.log(validation.error)
        return res.sendStatus(400)
    }

    const {rows: isCpf} = await connection.query(`
        SELECT * FROM customers
        WHERE cpf = ($1)
        `,[newCustomer.cpf])


        if(isCpf.length>0){
            return res.sendStatus(409)
        }

    
        
       await connection.query (`
        INSERT INTO customers 
        (  name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`,
        [newCustomer.name, newCustomer.phone,  newCustomer.cpf,  newCustomer.birthday])
        
        return res.sendStatus(201)

    }catch{
        return res.sendStatus(400)
    }
}

export async function updateCustomers(req,res){

    try{
    
    const {body: newCustomer} = req
    const id = req.params.id
    
    const validation = customerSchema.validate(req.body);
    
    if(validation.error){
        console.log(validation.error)
        return res.sendStatus(400)
    }

    const {rows: isCpf} = await connection.query(`
        SELECT * FROM customers
        WHERE cpf = ($1)
        `,[newCustomer.cpf])


        if(isCpf.length>1){
            return res.sendStatus(409)
        }

    
        
       await connection.query (`
       UPDATE customers SET name = ($1), phone = ($2), cpf=($3), birthday = ($4)
        WHERE id = ($5);
        `,
        [newCustomer.name, newCustomer.phone,  newCustomer.cpf,  newCustomer.birthday, id])
        
        return res.sendStatus(200)

    }catch{
        return res.sendStatus(400)
    }
}
