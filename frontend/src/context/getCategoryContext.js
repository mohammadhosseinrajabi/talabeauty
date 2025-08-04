import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Alert } from "../utils/alert";

const getCategory = createContext();

const GetCategoryProv = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get("http://localhost:5000/api/categories");
      if (response.status === 200) {
        setCategories(response.data.categories);
      } else {
        Alert("دسته بندی ها یافت نشد ایراد سمت سرور", "error");
      }
    };
    getCategory();
  }, []);
  return (
    <getCategory.Provider value={{ categories, setCategories }}>
      {children}
    </getCategory.Provider>
  );
};
export { getCategory, GetCategoryProv };
