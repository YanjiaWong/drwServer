const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/addMember', async (req, res) => {
  
  const { userId, role, birthyear, disease, freq } = req.body || {};

  if ( !userId || !role || !birthyear || !disease || !freq ) {
    return res.status(400).json({ message: '尚有欄位未填寫' });
  }

  try {
  
    await db.query(
      'INSERT INTO family (user_id, role, birthyear, disease, freq) VALUES (?, ?, ?, ?, ?)',
      [userId, role, birthyear, disease, freq]
    );

    res.status(201).json({ message: '成員新增成功' });
  } catch (error) {
    console.error('新增錯誤：', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

module.exports = router;