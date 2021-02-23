import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello, world!',
  });
});

app.post('/', (req, res) => {
  return res.json({
    message: 'Os dados foram salvos com sucesso!',
  });
})

app.listen(3001, () => console.log("Server is running"));