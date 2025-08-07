import { pool } from "../db.js";

export const addSchool = async(req, res) => {
    const {name, address, latitude, longitude} = req.body;

    if(!name || !address || !latitude || !longitude)
    {
        return res.status(400).json({error: 'All fields are required'});
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        await pool.query(query, [name, address, latitude, longitude]);
         res.status(201).json({ message: 'School added successfully' });
    } catch (error) {
         res.status(500).json({ error: 'Database error', details: error.message });
        
    }
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.lat);
  const userLng = parseFloat(req.query.lng);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ error: 'Invalid or missing coordinates' });
  }

  try {
    const [schools] = await pool.query('SELECT * FROM schools');

    const sorted = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLng, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};