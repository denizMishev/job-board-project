export const allowedFileTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/msword",
  "application/vnd.ms-powerpoint",
];

export const maxSizeInBytes = 10485760;

export const regexEmail = "[a-z0-9]+@[a-z]+.[a-z]{2,20}";
export const regexSingleName = "^.{1,1000}$";
export const regexPassword = "^.{8,1000}$";

export const regexFirstAndLastName = "^.+ .{1,1999}$";
export const regexCoverLetter = "^.{1,10000}$";
