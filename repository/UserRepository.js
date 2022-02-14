const Repository = require('./Repository');
const bcrypt = require('bcryptjs');

class UserRepository extends Repository {
  async createUser({ email, password, firstName, lastName, phoneNumber }) {
    password = await bcrypt.hash(password, 10);

    const user = await this.model.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });

    return user;
  }

  async findUser(filter = {}) {
    console.log(filter);
    const data = await this.model.findAll({
      attributes: ['email', 'password', 'firstName', 'lastName', 'createdAt'],
      where: filter,
    });
    return data;
  }
}

module.exports = UserRepository;
