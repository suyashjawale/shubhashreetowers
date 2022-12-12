const mysql = require('serverless-mysql')({
    config: {
        user: 'root',
        password: 'suyash',
        database: 'building',
        port: 3306,
        multipleStatements: true
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