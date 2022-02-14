const bcrypt = require('bcryptjs');
const AppError = require('../error/AppError');
const validator = require('validator')

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async signUp({ firstName, lastName, email, password, phoneNumber }) {
    const prevUsers = await this.userRepository.findUser({ email });

    if (!validator.isEmail(email))
        throw new AppError('Invalid email provided')
        
    if (prevUsers.length > 0) {
      throw new AppError('User with email already exists', 400);
    }

    const data = await this.userRepository.createUser({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });



    return {
      email,
      firstName,
      lastName,
      phoneNumber,
    };
  }

  async login({ email, password }) {
    try {
      const data = await this.userRepository.findUser({ email });

      const isValidPassword = await bcrypt.compare(password, data[0].password);

      if (!isValidPassword) throw new AppError('Invalid username or password', 401);

      console.log(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.log('an error occured');
      console.log(error);
    }
  }
}

module.exports = AuthService;

