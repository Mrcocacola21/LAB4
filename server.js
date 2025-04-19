// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Служимо статичні файли з public/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// CORS, якщо клієнт звертатиметься з іншого домену (ngrok URL)
import cors from 'cors';
app.use(cors());

// Обробник POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Проста серверна валідація
  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Ім’я занадто коротке' });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Невірний email' });
  }
  if (!message || message.length < 10) {
    return res.status(400).json({ error: 'Повідомлення занадто коротке' });
  }

  // Тут можна, наприклад, зберегти в базу чи відправити листа
  console.log('Отримано повідомлення від', name, email, message);

  return res.json({ message: 'Дані успішно отримані! Ми відповімо найближчим часом.' });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
