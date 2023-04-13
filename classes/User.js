class User {
    constructor(name, googleId, email) {
      this.name = name;
      this.googleId = googleId;
      this.email = email;
      this.isAuthenticated = false;
    }
  
    async verifyGoogleId() {
      // verify the Google ID using the Google API
      // set isAuthenticated to true if successful
      try {
        const googleUser = await googleAPI.verifyUser(this.googleId);
        if (googleUser && googleUser.email === this.email) {
          this.isAuthenticated = true;
          console.log('User is authenticated');
        } else {
          console.log('Google ID verification failed');
        }
      } catch (err) {
        console.log('Error verifying Google ID', err);
      }
    }
  }