export const authErrorMessages = {
  firstName: `First name can't have special characters`,
  lastName: `Last name can't have special characters`,
  email: `Please enter a valid email`,
  password: `Password should be at least 8 characters`,
};

export const firebaseErrorParser = (errorString) => {
  const startIndex = errorString.indexOf("auth/");
  const endIndex = errorString.indexOf(")");

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const errorMessage = errorString.substring(startIndex + 5, endIndex).trim();
    console.log(errorMessage);

    let formattedErrorMessage = errorMessage.split("-").join(" ");
    formattedErrorMessage =
      formattedErrorMessage.charAt(0).toUpperCase() +
      formattedErrorMessage.slice(1);

    return formattedErrorMessage;
  } else {
    alert(
      "Unhandled error occurred, please reach out to us for further assistance"
    );
    return errorString;
  }
};
