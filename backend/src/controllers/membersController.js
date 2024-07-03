const supabase = require('../utils/supabaseClient');
const logger = require('../middlewares/logger');

exports.getMembers = async (req, res) => {
  logger(req, res, () => {}); 
  const { data, error } = await supabase
    .from('members')
    .select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};
