const express = require('express');
const { Pool } = require('pg');
// Initialize multer for file uploads
const app = express();
const Port = 3000;
const cors = require('cors');
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

app.use(cors());


// Body parsing middleware for JSON data
app.use(express.json());
// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Bad JSON' });
  }
  next();
});

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Rajesh@2002',
    database: 'Project',
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch(err => console.error("Error in connecting to the database", err));

app.post('/signup', (req, res) => {
    const psql = `INSERT INTO public."UserData4"("Name", "Email", "Password", "AdminType") VALUES($1, $2, $3, $4)`;
    const values = [
        req.body.Name,
        req.body.Email,
        req.body.Password,
        req.body.AdminType
    ];

    // Log the values to see if they are correct
    console.log('Values:', values);

    // Assuming 'pool' is your connection pool object
    pool.query(psql, values, (err, data) => {
        if (err) {
            // Log the error for debugging
            console.error('Error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const psql = `SELECT "Email", "Password", "AdminType" FROM "public"."UserData4" WHERE "Email" = $1 AND "Password" = $2 AND "AdminType" = $3`;

    const values = [
        req.body.Email,
        req.body.Password,
        req.body.AdminType
    ];

    console.log('Values:', values);

    // Assuming 'pool' is your connection pool object
    pool.query(psql, values, (err, data) => {
        if (err) {
            // Log the error for debugging
            console.error('Error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log("Email:",req.body.Email);
        console.log("Length:",data.rowCount);
        if( data.rowCount>0){
            return res.json("Success");
        }
        else{
            return res.json("Failed");

        }
    });
});

//This is for personal page

app.post('/personal', (req, res) => {
    const psql = `INSERT INTO public."PersonalData"("Name", "Age", "DOB", "Sex", "Address", "Email", "Phone", "AdharNumber", "PanNumber") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

    const values = [
        req.body.Name,
        req.body.Age,
        req.body.DOB,
        req.body.Sex,
        req.body.Address,
        req.body.Email,
        req.body.Phone,
        req.body.AdharNumber,
        req.body.PanNumber
    ];

    // Log the values to see if they are correct
    console.log('Values:', values);

    // Assuming 'pool' is your connection pool object
    pool.query(psql, values, (err, data) => {
        if (err) {
            // Log the error for debugging
            console.error('Error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
  
});

app.post('/educational', (req, res) => {
    const psql=`INSERT INTO  public."EducationalData"("HEA","NOEI","GPA","Certificate","DOD","Specialization") VALUES ($1,$2,$3,$4,$5,$6)`;
    const values=[
        req.body.HEA,
        req.body.NOEI,
        req.body.GPA,
        req.body.Certificate,
        req.body.DOD,
        req.body.Specialization
    ]
    // Log the values to see if they are correct
    console.log('Values:', values);

    // Assuming 'pool' is your connection pool object
    pool.query(psql, values, (err, data) => {
        if (err) {
            // Log the error for debugging
            console.error('Error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
   
  
});

app.post('/professional', (req, res) => {
    const psql=`INSERT INTO  public."Professional"("CompanyName","StartDate","EndDate","Position","Responsibilities","Domain","CES") VALUES ($1,$2,$3,$4,$5,$6,$7)`;
    const values=[
        req.body.CompanyName,
        req.body.StartDate,
        req.body.EndDate,
        req.body.Position,
        req.body.Responsibilities,
        req.body.Domain,
        req.body.CES

    ]
    // Log the values to see if they are correct
    console.log('Values:', values);

    // Assuming 'pool' is your connection pool object
    pool.query(psql, values, (err, data) => {
        if (err) {
            // Log the error for debugging
            console.error('Error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
   
  
});


// app.post('/documents', (req, res) => {
//     const psql = `INSERT INTO public."Documents1"("IdenticationD", "BOC", "AVD", "EducationalD", "ProfessionalD") VALUES ($1, $2, $3, $4, $5)`;
//     const values = [
//         String(req.body.IdenticationD),
//         req.body.BOC,
//         req.body.AVD,
//         req.body.EducationalD,
//         req.body.ProfessionalD
//     ];

//     // Log the values to see if they are correct
//     console.log('Values:', values);

//     // Assuming 'pool' is your connection pool object
//     pool.query(psql, values, (err, data) => {
//         if (err) {
//             // Log the error for debugging
//             console.error('Error:', err.message);
//             return res.status(500).json({ error: err.message });
//         }
//         return res.json(data);
//     });
// });

app.get('/api', (req, res) => {
    return res.send("This is a GET request to /api");
});

  app.listen(8081, () => {
    console.log("Server connected successfully");
});
  

