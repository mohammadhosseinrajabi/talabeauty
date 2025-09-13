// import { Children, createContext, useCallback, useContext, useEffect, useState } from "react";
// import AxiosExclusive from "../components/axiosConfig";

// const CaptchaContext = createContext();

// export const CaptchaProvider = ({ children }) => {
//   const [captchaImage, setCaptchaImage] = useState("");
//   const [captchaId, setCaptchaId] = useState("");
//   const [captchaError, setCaptchaError] = useState("");

//   const fetchCaptcha = useCallback(async () => {
//     try {
//       const response = await AxiosExclusive.get("/captcha/generate");
//       if (response.data.success) {
//         setCaptchaImage(response.data.captchaImage);
//         setCaptchaId(response.data.captchaId);
//       } else {
//         throw new Error("خطا در دریافت کپچا");
//       }
//     } catch (err) {
//       setCaptchaError("خطا در دریافت کپچا");
//     }
//   }, []);
//   const verifyCaptcha = async (text) => {
//     try {
//       const captchaResponse = await AxiosExclusive.post("/captcha/verify", {
//         captchaId: captchaId,
//         captchaText: text,
//       });
//       return captchaResponse.data.isValid;
//     } catch (err) {return false}
//   };
//     useEffect(() => {
//     fetchCaptcha();
//   }, []);

//   return(
//     <CaptchaContext.Provider
//     value={{
//         captchaImage,
//         captchaId,
//         captchaError,
//         fetchCaptcha,
//         verifyCaptcha
//     }}
//     >
//         {children}
//     </CaptchaContext.Provider>
//   )
// };

// export const useCaptcha = () => useContext(CaptchaContext);
