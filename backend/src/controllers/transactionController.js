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
  logger(req, res, () => {}); 

  const { member_id } = req.query;

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('member_id', member_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};
