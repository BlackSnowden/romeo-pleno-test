export default (user: any) => ({
  fullName: `${user.firstName} ${user.lastName}`,
  email: user.email || 'N/A',
  address: user.street || 'N/A',
  addressNumber: user.number?.$t || 'N/A',
  phoneNumber: user.phoneNumber || 'N/A',
})
