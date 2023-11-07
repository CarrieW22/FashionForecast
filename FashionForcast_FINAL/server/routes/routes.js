// const express = require('express');
// const router = express.Router();
// const model = require ("server\models\weatherSchema")
// // Example route handler for a GET request
// // router.get('/api/some-route', (req, res) => {
// //     // Handle the GET request here
// //     res.json({ message: 'GET request handled' });
// //   });
  
//   // Example route handler for a POST request

//   //route hand
//   router.post('/api/create-document', (req, res) => {
//     const { field1, field2 } = req.body;
  
//     const newDocument = new model  ({
//       field1,
//       field2,
//     });
  
//     newDocument.save()
//       .then(() => {
//         res.json({ message: 'Document created successfully' });
//       })
//       .catch((error) => {
//         console.error('Error creating document:', error);
//         res.status(500).json({ message: 'Error creating document' });
//       });
//   });