import axios from "axios";

const API = axios.create({
  //   baseURL: "https://emkc.org/api/v2/piston",
  baseURL: "https://api.jdoodle.com/v1/execute",
});

// export const executeCode = async (language: any, sourceCode: any) => {
//   const response = await API.post("/execute", {
//     language: language.name,
//     version: language.version,
//     files: [
//       {
//         content: sourceCode,
//       },
//     ],
//   });
//   return response.data;
// };

export const executeCode = async () => {
  const response = await API.post(
    "/", 
    {
      clientId: "e631078296f2166da496fbc6a441d689",
      clientSecret: "17fc08236d842c3646358637b185380ac3062a5fced1ffc8262537925a10f954",
      script: "print(\"Hello, World!\")",
      stdin: "",
      language: "python3",
      versionIndex: "3",
      compileOnly: false
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};
