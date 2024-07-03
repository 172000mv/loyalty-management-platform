const supabase = require('../utils/supabaseClient');
const logger = require('../middlewares/logger');

exports.getMemberPoints = async (req, res) => {
  logger(req, res, () => {}); 

  const { member_id } = req.query;

  const { data, error } = await supabase
    .from('transactions')
    .select('points')
    .eq('member_id', member_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const totalPoints = data.reduce((sum, transaction) => sum + transaction.points, 0);

  res.json({ member_id, total_points: totalPoints });
};
