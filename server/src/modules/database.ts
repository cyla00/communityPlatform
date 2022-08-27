require('dotenv').config()
const { MongoClient } = require('mongodb')

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/?authSource=${process.env.MONGO_DATABASE}`

const client = new MongoClient(url)

import {default as db_json} from './db_config.json'

const database_collections:string[] = db_json.db_collection_list

export async function run(){
    try{
        await client.connect((err:any, db:any) => {
            if(err) return console.log(err)

            const myDB = db.db(process.env.MONGO_DATABASE)

            database_collections.forEach((collection_name:string) => {
                myDB.listCollections({name: collection_name}).next((err:any, info:any) => {
                    if(info) return console.log(`${collection_name} exists`)
                    myDB.createCollection(collection_name)
                    console.log(`${collection_name} created`)
                })
            })
        })
        console.log('database ok')
    }catch(err){
        console.log(err)
    }
}
