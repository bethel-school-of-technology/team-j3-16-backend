const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const credentials = require('./models/user');


// MONGOOSE SIGNUP AUTH
const register = async (req:any, res:any, next:any) => {
    const { username, password, city, country } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 5);

      const user = new credentials({ username, password: hashedPassword, city, country });
      await user.save();
      res.json({ message: 'Registration successful' });
    } catch (error) {
      next(error);
    }
  };

// MONGOOSE LOGIN AUTH
const login = async (req: any, res: any, next: any) => {
  const { username, password } = req.body;

  try {
    const user = await credentials.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_JWT_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};


//MONGOOSE VERIFY TOKENS
const authenticate = async (req:any, res:any, next:any) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
      const user = await credentials.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

module.exports = { register, login, authenticate };