import connection from "../dbsStrategy/postgres.js";


export async function getGamesParams(req, res){

    try{

    const name = req.params.name.toLowerCase()
    console.log(name)

        const {rows: games} = await connection.query( 
            ` SELECT games.*, categories.name AS "categoryName" FROM   games JOIN categories ON games."categoryId" = categories.id WHERE LOWER(games.name) LIKE ($1) `, [`${name}%`])
        res.send(games)
    }
    catch(error){
        res.status(401).send(error)
    }
}

export async function getGames(req, res){

    try{


        const {rows: games} = await connection.query( 
            ' SELECT games.*, categories.name AS "categoryName" FROM   games JOIN categories ON games."categoryId" = categories.id ')
        res.send(games)
    }
    catch(error){
        res.status(401).send(error)
    }
}

export async function postGames(req, res){

    try{
        const newGame = req.body 

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',[newGame.name, newGame.image, newGame.stockTotal, newGame.categoryId, newGame.pricePerDay])
        res.send("ta la")
  
    }
    catch(error){
        return res.send(error)

    }
} 