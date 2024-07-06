const supabase = require('../utils/supabaseClient');
const logger = require('../middlewares/logger');

exports.createTransaction = async (req, res) => {
  logger(req, res, () => {}); 
  const { member_id, points, description } = req.body;

  const { data, error } = await supabase
    .from('transactions')
    .insert([{ member_id, points, description }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'Transaction created successfully' });
};

exports.getTransactions = async (req, res) => {
  try {
    logger(req, res, async () => {
      const { member_id, name, points_updated, type, status, description } = req.query;

      let query = supabase.from('transactions').select('*');

      if (member_id) query = query.eq('member_id', member_id);
      if (name) query = query.ilike('name', `%${name}%`);
      if (points_updated) query = query.eq('points_updated', points_updated);
      if (type) query = query.eq('type', type);
      if (status) query = query.eq('status', status);
      if (description) query = query.ilike('description', `%${description}%`);

      const { data, error } = await query;

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


