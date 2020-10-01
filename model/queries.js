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
  const body = req.body;
  
  client.query(`INSERT INTO Users (default, '${body.email}', '${body.firstname}', '${body.lastname}', crypt('${body.password}', gen_salt('bf')), null);`,
    (err, result) => {
      if (error) {
        throw error;
      }
      res.send(`User added with ID: ${result.insertID}`);
    });
});

module.exports = {
  createUser
};
