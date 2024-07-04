const logger = require('../middlewares/logger');
const supabase = require('../utils/supabaseClient');

exports.updatePoints = async (req, res) => {
  logger(req, res, () => {});

  const { name, operationType, points } = req.body;

  if (!name || !operationType || !points) {
    return res.status(400).json({ error: 'Missing required body parameters' });
  }

  // Get the member by name
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('*')
    .eq('name', name)
    .single();

  if (memberError || !member) {
    return res.status(400).json({ error: memberError ? memberError.message : 'Member not found' });
  }

  // Determine points to update based on operation type
  let updatedPoints;
  if (operationType === 'credit') {
    updatedPoints = member.points + parseInt(points);
  } else if (operationType === 'debit') {
    if (member.points < points) {
      return res.status(400).json({ error: 'Insufficient points' });
    }
    updatedPoints = member.points - parseInt(points);
  } else {
    return res.status(400).json({ error: 'Invalid operation type' });
  }

  // Update member points in members table
  const { error: updateError } = await supabase
    .from('members')
    .update({ points: updatedPoints })
    .eq('id', member.id);

  if (updateError) {
    return res.status(400).json({ error: updateError.message });
  }

  // Add the transaction to the transactions table
  const { error: transactionError } = await supabase
    .from('transactions')
    .insert([{
      member_id: member.id,
      name: member.name,
      points_updated: points,
      type: operationType,
      status: 'success',
      description: `${operationType} points` // updated to 'description'
    }]);

  if (transactionError) {
    return res.status(400).json({ error: transactionError.message });
  }

  res.json({ member_id: member.id, total_points: updatedPoints });
};
