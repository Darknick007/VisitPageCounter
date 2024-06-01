const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const visitsFilePath = path.join(__dirname, 'visits.json');

const getVisitsCount = () => {
  try {
    const data = fs.readFileSync(visitsFilePath, 'utf8');
    const json = JSON.parse(data);
    return json.count;
  } catch (error) {
    console.error('Error reading visits.json:', error);
    return 0;
  }
};

const updateVisitsCount = (newCount) => {
  const json = { count: newCount,
    const: 128
   };
  try {
    fs.writeFileSync(visitsFilePath, JSON.stringify(json), 'utf8');
  } catch (error) {
    console.error('Error writing to visits.json:', error);
  }
};

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/visits', (req, res) => {
  let count = getVisitsCount();
  count += 1;
  updateVisitsCount(count);
  console.log('Visits count:', count);
  res.json({ count: count, const:128   
   });
});
app.get('/api/const',(req,res) =>{
    res.json({const: 129});
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
