import connection from "../dbsStrategy/postgres.js";

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
    const newCategoryName = req.body.name
    console.log(newCategoryName)
    
    
    await connection.query('INSERT INTO categories (name) VALUES ($1)',[newCategoryName])

    res.send("newCategory")

    }
    catch(error){
        return res.status(407).send(error)
        console.log (error)
    }
}