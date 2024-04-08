import express from 'express';
import cors from 'cors';
import { RadioBrowserApi, Station } from 'radio-browser-api';

const app = express();
const port = 3002;

app.use(cors());

app.use(express.json());

app.get('/api/servers', async (req, res) => {
  try {
    const genre: string | undefined = req.query.genre as string;
    const api = new RadioBrowserApi('My Radio App');
    const stationsData: Station[] = await api.searchStations({
      language: 'english',
      tag: genre,
      limit: 50,
    });
    res.json(stationsData);
  } catch (error) {
    console.error('Error fetching data from Radio Browser API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
