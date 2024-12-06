export default function extract(session) {
  const { user } = session;
  let firstName = user.firstName;
  let lastName = user.lastName;
  let adminName = `${firstName} ${lastName}`;
  return adminName;
}
