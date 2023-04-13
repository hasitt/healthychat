// User data
const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password"
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password"
    }
  ];
  
  // Find user by email
  function findByEmail(email) {
    return users.find(user => user.email === email);
  }
  
  // Find user by ID
  function findById(id) {
    return users.find(user => user.id === id);
  }
  
  // Serialize user
  function serializeUser(user, done) {
    done(null, user.id);
  }
  
  // Deserialize user
  function deserializeUser(id, done) {
    const user = findById(id);
    done(null, user);
  }
  
  // Authenticate user
  function authenticate(email, password, done) {
    const user = findByEmail(email);
  
    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }
  
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
  
    return done(null, user);
  }
  
  // Export functions
  module.exports = {
    serializeUser,
    deserializeUser,
    authenticate
  };