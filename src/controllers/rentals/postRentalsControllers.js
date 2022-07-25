import connection from "../../dbsStrategy/postgres.js";
import dayjs from "dayjs";


export async function addRentals(req,res){

    const dayNow = dayjs().format('YYYY-MM-DD')

    
    const {customerId ,gameId, daysRented} = req.body

    if(daysRented<=0){
        return res.sendStatus(400)
    }

    const { rows: pricePerDay} = await connection.query(`
        SELECT "pricePerDay", "stockTotal" FROM games  
        WHERE id = ($1);
    `,[gameId])

    

    if(pricePerDay.length ===0){
        return res.sendStatus(400)
    }

    let { rows: iscustomers} = await connection.query(`
    SELECT * FROM customers  
    WHERE id = ($1);
`,[customerId])

if(iscustomers.length ===0){
    return res.sendStatus(400)
}

    const pricePerDay1 = pricePerDay[0].pricePerDay
    const originalPrice = pricePerDay1*daysRented

    const {rows: alugado} = await connection.query(`
        SELECT * FROM rentals
        WHERE "gameId" = ($1);

    `,[gameId])

    console.log(alugado.length)
    console.log(pricePerDay[0].stockTotal)

    if(alugado.length>=pricePerDay[0].stockTotal){

        return res.sendStatus(400)
    }

    await connection.query(`
    INSERT INTO rentals (
        "customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, NULL, NULL)
    `,[customerId, gameId, dayNow, daysRented, originalPrice])

    return res.sendStatus(201)
}


export async function finishRentals(req, res){

    const id =  req.params.id

    console.log(id)



        const { rows: dataRental} = await connection.query(`
        SELECT "rentDate", "pricePerDay", "returnDate" 
        FROM rentals  
        JOIN games
        ON rentals."gameId" = games.id
        WHERE rentals.id = ($1);
    `,[id])

    console.log(dataRental[0].returnDate)

    if(dataRental.length===0){
        return res.sendStatus(404)
    }
    if(dataRental[0].returnDate!==null){
        return res.sendStatus(400)
    }




    const rentDate = dataRental[0].rentDate
    const pricePerDay = dataRental[0].pricePerDay

    


    const dayNow = dayjs().format('YYYY-MM-DD')
    const formatedDate = dayjs(dayNow);
    const delayDay =  formatedDate.diff(rentDate, 'day');
    const delayFee = delayDay*pricePerDay
    
    
    await connection.query(`
    UPDATE rentals SET "returnDate" = ($1), "delayFee" = ($2)
    WHERE rentals.id = ($3)
 
        `, [dayNow, delayFee, id] )

    res.sendStatus(200)
}

export async function deleteRentals(req, res){

 const id =  req.params.id


 const { rows: dataRental} = await connection.query(`
 SELECT "returnDate" 
 FROM rentals  
 WHERE rentals.id = ($1);
`,[id])

console.log(dataRental[0].returnDate)

if(dataRental.length===0){
 return res.sendStatus(404)
}
if(dataRental[0].returnDate===null){
 return res.sendStatus(400)
}

    connection.query(`
        DELETE FROM rentals 
        WHERE id = ($1)
    `,[id])



    return res.sendStatus(200)
}