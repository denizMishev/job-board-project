export const authErrorMessages = {
  firstName: `First name is required`,
  lastName: `Last name is required`,
  names: `Please input your first and last name with a space between them`,
  email: `Please enter a valid email`,
  password: `Password should be at least 8 characters`,
};

export const fileErrorMessages = {
  type: `File type is not supported`,
  size: `File size is too large`,
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
