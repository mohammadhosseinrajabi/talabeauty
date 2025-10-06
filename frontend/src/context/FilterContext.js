import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AxiosExclusive from "../components/axiosConfig";

const FilterContext = createContext(null);

// کمکی: آی‌دی دستهٔ محصول را ایمن و یکنواخت (string) استخراج می‌کند
const getCategoryId = (product) => {
  const c = product?.category;
  return String(typeof c === "object" && c?._id ? c._id : c ?? "");
};

export const FilterProvider = ({ children }) => {
  // دیتا
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // وضعیت
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // فیلترها
  const [activeCategoryId, setActiveCategoryId] = useState(null); // از Route میاد
  const [selectedCategories, setSelectedCategories] = useState([]); // چک‌باکس‌های سایدبار

  // خروجی
  const [filteredProducts, setFilteredProducts] = useState([]);

  // رنج قیمت
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [currentPriceRange, setCurrentPriceRange] = useState([0, 0]);

  // فچ محصولات
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await AxiosExclusive.get("/products");
        const list = Array.isArray(res.data?.products) ? res.data.products : [];
        setProducts(list);
        setFilteredProducts(list);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("خطایی در بارگذاری محصولات رخ داد.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // فچ دسته‌ها
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AxiosExclusive.get("/categories");
        setCategories(Array.isArray(res.data?.categories) ? res.data.categories : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // منبع فیلتر: اگر category فعال داریم، فقط همان دسته؛ وگرنه کل محصولات
  const sourceForFiltering = useMemo(() => {
    if (!activeCategoryId) return products;
    const aid = String(activeCategoryId);
    return products.filter((p) => getCategoryId(p) === aid);
  }, [products, activeCategoryId]);

  // با تغییر منبع، رنج قیمت و خروجی پایه ریست شوند
  useEffect(() => {
    if (sourceForFiltering.length === 0) {
      setPriceRange([0, 0]);
      setCurrentPriceRange([0, 0]);
      setFilteredProducts([]);
      return;
    }
    const prices = sourceForFiltering
      .map((p) => Number(p.price) || 0)
      .filter((n) => Number.isFinite(n));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setPriceRange([minPrice, maxPrice]);
    setCurrentPriceRange([minPrice, maxPrice]);
    setFilteredProducts(sourceForFiltering); // پایه بدون فیلترِ اضافه
  }, [sourceForFiltering]);

  // تغییر چک‌باکس دسته‌ها (همه‌جا string)
  const handleCategoryChange = useCallback((categoryId) => {
    const id = String(categoryId);
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  // تغییر اسلایدر (سقف قیمت)
  const handlePriceChange = useCallback((eventOrValue) => {
    const value =
      typeof eventOrValue === "number"
        ? eventOrValue
        : Number(eventOrValue?.target?.value || 0);
    setCurrentPriceRange((prev) => [prev[0], value]);
  }, []);

  // اعمال فیلترها
  const applyFilters = useCallback(() => {
    let out = [...sourceForFiltering];

    if (selectedCategories.length > 0) {
      out = out.filter((p) => selectedCategories.includes(getCategoryId(p)));
    }

    out = out.filter((p) => {
      const price = Number(p.price) || 0;
      return price >= currentPriceRange[0] && price <= currentPriceRange[1];
    });

    setFilteredProducts(out);
  }, [sourceForFiltering, selectedCategories, currentPriceRange]);

  // پاک‌کردن فیلترها نسبت به دامنه فعلی
  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setCurrentPriceRange(priceRange);
    setFilteredProducts(sourceForFiltering);
  }, [priceRange, sourceForFiltering]);

  // ✅ ریست کامل به حالت «همهٔ محصولات»
  const resetFiltersToAll = useCallback(() => {
    setActiveCategoryId(null);
    setSelectedCategories([]);
    // بقیه بر اساس افکت‌های sourceForFiltering خودکار آپدیت می‌شن
  }, []);

  // هر تغییری در ورودی‌های فیلتر → خروجی به‌روز
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const value = {
    // دیتا
    products,
    categories,
    filteredProducts,

    // وضعیت
    loading,
    error,

    // فیلترها
    activeCategoryId,
    setActiveCategoryId,
    selectedCategories,
    handleCategoryChange,

    priceRange,
    currentPriceRange,
    handlePriceChange,

    // اعمال/پاک/ریست
    applyFilters,
    clearFilters,
    resetFiltersToAll,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);
