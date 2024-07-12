const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../utils/supabaseClient');
const logger = require('../middlewares/logger');

exports.registerAdmin = async (req, res) => {
  logger(req, res, () => {});
  const { user, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const { data, error } = await supabase
    .from('admin_users')
    .insert([{user, email, password: hashedPassword }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Admin registered successfully' });
};

exports.loginAdmin = async (req, res) => {
  logger(req, res, () => {}); 

  const { user, password  } = req.body;
  console.log("Request Body",req.body);
  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user', user)
    .single();

    console.log('Admin user data:', admin);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Success' });
};
