import express from "express";

const PORT = 5001;
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];


// to add and get the contact info
app.get("/", (req, res) => {
  res.send("<h1>This is my activity homepage!</h1>");
});

app.get("/persons", (req, res) => {
  res.json(persons);
});

app.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  res.json(person);
});

// to delete contact 
app.delete("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});


// to create new contact 
function generateId(){
  const MaxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0 ;
  return MaxId + 1;
}

app.post("/persons", (req, res) => {
  const body = req.body;
  const person = {

    id: generateId(),
    name: body.name,
    number: body.number || false,
  };

  persons = persons.concat(person);
  res.json(person);
});

// To Check Number of persons in the phonebook 
app.get("/info", (req, res) => {
  const numPersons = persons.length;
  res.send(`<p>This phonebook has info of ${numPersons} person(s)</p>`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
