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
  
  client.query(`INSERT INTO Users VALUES(default, '${info.email}', '${info.firstName}', '${info.lastName}', crypt('${info.password}', gen_salt('bf')), null);`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(`User added with ID: ${result.insertID}`);
    });
});

const loginUser = ((req, res) => {
  const info = req.body;

  client.query(`SELECT * FROM Users WHERE email='${info.email}' AND password=crypt('${info.password}', password);`,
    (err, result) => {
      console.log(result);
      if (err) {
        throw err;
      }

      if (!result.rows.length) {
        res.status(403).send('Incorrect email or password.');
      } else {
        res.send('Logged in!');
      }
    }
  );
});


module.exports = {
  createUser,
  loginUser
};
