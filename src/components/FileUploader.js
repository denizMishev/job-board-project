// import { useState } from "react";

// import { storage } from "../firebaseConfig";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// export function FileUploader() {
//   const [data, setData] = useState({});

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();

//     const file = e.dataTransfer.files[0];
//     setData(file);
//     // handleSubmit();
//   };

//   console.log(data);

//   const handleSubmit = (e) => {
//     console.log(data);
//     if (e) {
//       e.preventDefault();
//     }
//     const storageRef = ref(storage, data.name);
//     const uploadTask = uploadBytesResumable(storageRef, data);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("upload is" + progress + "% done");
//       },
//       (error) => {
//         console.log(error.message);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log("file available at", downloadURL);
//         });
//       }
//     );
//   };

//   return (
//     <div>
//       <input type="file" onChange={(event) => setData(event.target.files[0])} />
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         style={{
//           border: "4px dashed #ccc",
//           padding: "20px",
//           textAlign: "center",
//         }}
//       ></div>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }
