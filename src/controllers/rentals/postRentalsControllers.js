import connection from "../../dbsStrategy/postgres.js";
import dayjs from "dayjs";


export async function addRentals(req,res){

    const dayNow = dayjs().format('YYYY-MM-DD')

    
    const {customerId ,gameId, daysRented} = req.body

    let { rows: pricePerDay} = await connection.query(`
        SELECT "pricePerDay" FROM games  
        WHERE id = ($1);
    `,[gameId])

    pricePerDay = pricePerDay[0].pricePerDay
    const originalPrice = pricePerDay*daysRented

    console.log(pricePerDay)

    await connection.query(`
    INSERT INTO rentals (
        "customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, NULL, NULL)
    `,[customerId, gameId, dayNow, daysRented, originalPrice])

    return res.sendStatus(201)
}


export async function finishRentals(req, res){

    const id =  req.params.id



        const { rows: dataRental} = await connection.query(`
        SELECT "rentDate", "pricePerDay" 
        FROM rentals  
        JOIN games
        ON rentals."gameId" = games.id
        WHERE rentals.id = ($1);
    `,[id])


    const rentDate = dataRental[0].rentDate
    const pricePerDay = dataRental[0].pricePerDay


    const dayNow = dayjs().format('YYYY-MM-DD')
    const formatedDate = dayjs(dayNow);


    const delayDay =  formatedDate.diff(rentDate, 'day');

    console.log(delayDay)
    console.log(pricePerDay)
    const delayFee = delayDay*pricePerDay
    
    
    await connection.query(`
    UPDATE rentals SET "returnDate"  = ($1), "delayFee" = ($2)
 
        `, [dayNow, delayFee] )

    res.sendStatus(200)
}

export async function deleteRentals(req, res){

 const id =  req.params.id

    connection.query(`
        DELETE FROM rentals 
        WHERE id = ($1)
    `,[id])



    return res.sendStatus(200)
}