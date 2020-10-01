const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect(() => {
  console.log("Connected to database.");
});

const createUser = ((req, res) => {
  const info = req.body;
  console.log(`${info.email}`);
  console.log(`${info.password}`);
  
  client.query(`INSERT INTO Users values(default, '${info.email}', '${info.firstname}', '${info.lastname}', crypt('${info.password}', gen_salt('bf')), null);`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(`User added with ID: ${result.insertID}`);
    });
});

module.exports = {
  createUser
};
