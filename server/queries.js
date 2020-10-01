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
  
  client.query(`INSERT INTO Users values(default, '${info.email}', '${info.firstName}', '${info.lastName}', crypt('${info.password}', gen_salt('bf')), null);`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(`User added with ID: ${result.insertID}`);
    });
});

const loginUser = ((req, res) => {
  const info = req.body;

  client.query(`SELECT * FROM Users where email='${info.email}' and password=crypt('${info.password}', password);`,
    (err, result) => {
      if (err) {
        throw err;
      }

      if (!result.length) {
        res.status(403).send('Incorrect email or password.');
      } else {
        res.send('Logged in!');
      }
    }
  );
});


module.exports = {
  createUser
};
