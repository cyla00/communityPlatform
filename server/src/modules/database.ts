require('dotenv').config()
const { MongoClient } = require('mongodb')

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?authSource=${process.env.MONGO_DATABASE}`

const client = new MongoClient(url)

import {default as db_json} from './db_config.json'

const database_collections:string[] = db_json.db_collection_list

export function openDbConnection(){
    try{
        return new MongoClient(url)
    }
    catch(err){
        console.error(err)
    }
}


export async function buildDb(){
    try{
        await client.connect(async (err:any, db:any) => {
            if(err) return console.log(err)

            const myDB = db.db(process.env.MONGO_DATABASE)

            for (let i = 0; i < database_collections.length; i++) {
                await myDB.listCollections({ name: database_collections[i] }).next(async (err: any, info: any) => {
                    if (info) return console.log(`${database_collections[i]} exists`)
                    await myDB.createCollection(database_collections[i])
                    console.log(`${database_collections[i]} created`)
                    await client.close().then(console.log('closed'))
                })
            }
        })
    }catch(err){
        console.log(err)
    }
}
