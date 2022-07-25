import connection from "../../dbsStrategy/postgres.js";

export async function searchRentals(req,res){


    const {rows: rentals} = await connection.query(`
        SELECT rentals.*, 
        customers.name AS "customersName",
        games.id AS "gameId", games.name AS "gameName", games."categoryId", categories.name AS "categoriesName"
         FROM rentals   
        JOIN customers 
        ON rentals."customerId" = customers.id
        JOIN games 
        ON rentals."gameId" = games.id
        JOIN categories
        ON games."categoryId" = categories.id

    `)

    const dataRentals = []

    rentals.map(
        (rental)=>{
            dataRentals.push(
                {id: rental.id, customerId: rental.customerId, gameId: rental.gameId, rentDate: rental.rentDate, daysRented: rental.daysRented, returnDate: rental.returnDate, originalPrice: rental.originalPrice, delayFee: rental.delayFee, customer:{id: rental.customerId, name: rental.customersName}, game:{id: rental.gameId, name: rental.gameName, categoryId: rental.categoryId, categoryName: rental.categoriesName} }
            )
        })

        

    res.send(dataRentals)

}

