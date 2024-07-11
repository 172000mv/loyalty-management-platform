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

exports.getTransactionTrends = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('created_at, points_updated')
      .order('created_at', { ascending: true });

    if (error) {
      throw error;
    }

    // Aggregate data to calculate total points updated
    const totalPointsUpdated = data.reduce((sum, transaction) => sum + transaction.points_updated, 0);
    // Calculate the number of transactions in the current month
    const currentMonth = new Date().getMonth() + 1;
    const transactionsThisMonth = data.filter(transaction => {
      const transactionMonth = new Date(transaction.created_at).getMonth() + 1;
      return transactionMonth === currentMonth;
    }).length;

    res.status(200).json({
      totalPointsUpdated,
      transactionsThisMonth,
      transactionData: data,
    });
  } catch (error) {
    console.error('Error fetching transaction trends:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

