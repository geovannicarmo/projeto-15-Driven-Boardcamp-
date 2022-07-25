import connection from "../dbsStrategy/postgres.js";
import categorySchema from "../schema/schemaCategory.js";

export async function getCategory(req, res){

    try{
    const { rows: categories } = await connection.query( 'SELECT * FROM categories' ) 
    res.send(categories)
    }
    catch(error){
        return res.status(401).send(error)
    }

}

export async function postCategory (req, res){

    try{
    const validation = categorySchema.validate(req.body);

    if(validation.error){
        return res.sendStatus(400)
    }
    const newCategoryName = req.body.name

    const {rows: isCategory} = await connection.query(`
        SELECT * FROM customers
        WHERE name = ($1)
    `,[newCategoryName])


    if(isCategory.length>0){
        return res.sendStatus(409)
    }
    
    
    await connection.query('INSERT INTO categories (name) VALUES ($1)',[newCategoryName])

    res.send("newCategory")

    }
    catch(error){
        return res.status(407).send(error)
    }
}