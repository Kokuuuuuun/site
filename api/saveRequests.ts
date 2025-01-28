import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { Request } from '../src/App';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const requests = req.body as Request[];
    
    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data');
    mkdirSync(dataDir, { recursive: true });
    
    // Write requests to file
    writeFileSync(
      join(dataDir, 'requests.json'),
      JSON.stringify(requests, null, 2)
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving requests:', error);
    res.status(500).json({ message: 'Failed to save requests' });
  }
}