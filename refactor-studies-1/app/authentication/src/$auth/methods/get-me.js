const { $user } = require('micro');
const { Account } = require('#/models');

module.exports = async function getMe ({ token }) {
  const account = await Account.findOne({ token });
  return account ? $user.findOne({ _id: account.userId }) : undefined;
}