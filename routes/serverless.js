const mysql = require('serverless-mysql')({
    config: {
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'b1d16b7d5443dc',
        password: '8f04af86',
        database: 'heroku_231d0204ca36e60'
    }
  })
   
  export async function excuteQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        console.log(error)
        return { error };
    }
}