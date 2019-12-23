const UserRoles = {
  CUSTOMER: 'customer',
  PRODUCER: 'producer',
};

const isUserRoleValid = role => Object.values(UserRoles).includes(role);

module.exports = {
  isUserRoleValid,
};
