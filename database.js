import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

// testing

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

 export async function get_bsListings() {
    const [rows] = await pool.query("SELECT * from bs_listings;")
    return rows
}

/*     
     export async function getBsListing(id) {
        const [rows] = await pool.query(`
            SELECT * from bs_listings where id = ${id};
        `);
        return rows        
    }  
*/

     export async function get_bsListing(id) {
        const [rows] = await pool.query(`
            SELECT * from bs_listings where id = ?`, [id]);
        return rows[0]
    }

/*
    const bsListing = await getBsListing(3)
    console.log(bsListing) 
*/

     export async function create_bsListing(name,desc,price) {
        const [result] = await pool.query(`
            insert into bs_listings (id,name,description,price,views)
            values (0,?,?,?,0)
            `,[name,desc,price])
        
        const newId = result.insertId
        console.log(newId);
        return get_bsListing(newId);

    }  

    export async function update_bsListing(name,desc,price,id) {

        const [result] = await pool.query (`
            update bs_listings 
            set 
                name = ?, 
                description = ?, 
                price = ? 
            where id = ?`
        ,[name,desc,price,id])

        //return result.info

        return get_bsListing(id);

    }

    export async function delete_bsListing(id) {

        const [result] = await pool.query(`
            delete from bs_listings where id = ?`,[id]);

    }


/*
 ___________________________________
 |  
 |  Store Procedure Call function  |
 ___________________________________

 */

 // _______ bs_listing _________

 export async function sp_listings_get() {

    const [result] = await pool.query (`
        call sp_listings_get()`) 
        
    return result[0];

}

 export async function sp_listing_get(id) {

    const [result] = await pool.query (`
        call sp_listing_get(?)`,[id])
    
    return result[0];

}

 export async function sp_listing_update(id,name,desc,price) {

    const [result] = await pool.query (`
        call sp_listing_update(?,?,?,?)`,[id,name,desc,price])
    
    return sp_listing_get(id);

}

export async function sp_listing_insert(name,desc,price) {

    const [result] = await pool.query (`
        call sp_listing_insert(?,?,?)`,[name,desc,price])

    const newId = result[0][0].newId;

    return sp_listing_get(newId);

}

export async function sp_listing_delete(id) {

    const [result] = await pool.query (`
        call sp_listing_delete(?)`,[id])
    
    return sp_listing_get(id);

}

// _______ bs_mylisting _________


export async function sp_mylistings_get() {

    const [result] = await pool.query (`
        call sp_mylistings_get()`) 
        
    return result[0];

}

 export async function sp_mylisting_get(id) {

    const [result] = await pool.query (`
        call sp_mylisting_get(?)`,[id])
    
    return result[0];

}

 export async function sp_mylisting_update(id,name,desc,price) {

    const [result] = await pool.query (`
        call sp_mylisting_update(?,?,?,?)`,[id,name,desc,price])
    
    return sp_mylisting_get(id);

}

export async function sp_mylisting_insert(name,desc,price) {

    const [result] = await pool.query (`
        call sp_mylisting_insert(?,?,?)`,[name,desc,price])

    const newId = result[0][0].newId;

    return sp_mylisting_get(newId);

}

export async function sp_mylisting_delete(id) {

    const [result] = await pool.query (`
        call sp_mylisting_delete(?)`,[id])
    
    return sp_mylisting_get(id);

}
