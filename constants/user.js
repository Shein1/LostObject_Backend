export const USER = {
    USERNAME: {
      MIN_LENGTH: 3,
      MIN_LENGTH_MESSAGE: "Please choose a longer username",
      EXIST_MESSAGE: "Username already in use!",
      INCORRECT_MESSAGE: "Incorrect username"
    },
    EMAIL: {
      EXIST_MESSAGE: "Email address already in use!"
    },
    PASSWORD: {
      MIN_LENGTH: 7,
      MIN_LENGTH_MESSAGE: "Please choose a longer password",
      CONFIRMATION_MESSAGE: "Password confirmation doesn't match Password",
      HASH_MESSAGE: "Can't hash password",
      INCORRECT_MESSAGE: "Incorrect password"
    },
    NOT_EXIST: "User doesn't exist"
  };