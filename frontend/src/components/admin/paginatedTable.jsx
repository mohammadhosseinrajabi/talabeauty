import React, { useState, useEffect } from 'react'
import Addcategory from '../../pages/admin/pages/category/addcategory';

export default function PaginatedTable({ dataInfo, data = [], additionField , children,searchParams,numberOfPage = 10}) {
  const [initData, setInitData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchChar, setSearchChar] = useState("");

  // تنظیم اولیه داده‌ها
  useEffect(() => {
    setInitData(Array.isArray(data) ? data : []);
  }, [data]);

  // جستجو در داده‌ها
  useEffect(() => {
    if (!searchChar || !searchParams?.searchField) {
      setInitData(Array.isArray(data) ? data : []);
      return;
    }
    
    if (Array.isArray(data)) {
      const filtered = data.filter(item => {
        const fieldValue = item[searchParams?.searchField];
        return fieldValue && fieldValue.toString().toLowerCase().includes(searchChar.toLowerCase());
      });
      setInitData(filtered);
    }
  }, [searchChar, data, searchParams]);

  // محاسبه تعداد صفحات
  useEffect(() => {
    const dataArray = Array.isArray(initData) ? initData : [];
    const pcount = Math.ceil(dataArray.length / numberOfPage);
    setPageCount(pcount);
    let pArr = [];
    for (let i = 1; i <= pcount; i++) pArr.push(i);
    setPages(pArr);
  }, [initData, numberOfPage]);

  // محاسبه داده‌های مربوط به صفحه جاری
  useEffect(() => {
    const dataArray = Array.isArray(initData) ? initData : [];
    let start = (currentPage - 1) * numberOfPage;
    let end = currentPage * numberOfPage;
    setTableData(dataArray.slice(start, end));
  }, [currentPage, initData, numberOfPage]);

  return (
    <div>
       <div className="row justify-content-between">
              <div className="col-10 col-md-6 col-lg-4">
                <div className="input-group mb-3" dir="ltr">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={searchParams.placeholder}
                    onChange={(e)=>setSearchChar(e.target.value)}
                  />
                  <span className="input-group-text">{searchParams.title}</span>
                </div>
              </div>
              <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                {/* <Addcategory /> */}
                {children}
              </div>
            </div>
      <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            {dataInfo.map((i) => (
              <th key={i.field}>{i.title}</th>
            ))}
            {additionField ? <th>{additionField.title}</th> : null}
          </tr>
        </thead>
        <tbody>
      {tableData.length === 0 ?(
        <tr>
        <td colSpan={dataInfo.length + (additionField ? 1 : 0)} className="text-center">هیچ داده ای وجود ندارد</td>
        </tr>  

      ):(
        tableData.map((d) => (
          <tr key={d.id}>
            {dataInfo.map((i) => (
              <td key={i.field + "_" + d.id}>{d[i.field]}</td>
            ))}
            {additionField ? <td>{additionField.elements(d.id)}</td> : null}
          </tr>
        ))
      )

    }
        </tbody>
      </table>
      {
        pages.length > 1 ?(
      <nav aria-label="Page navigation example" className="d-flex justify-content-center">
        <ul className="pagination dir_ltr">
          <li className="page-item">
            <span className="page-link pointer" href="#" aria-label="Previous" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>

          {pages.map((page) => (
            <li className="page-item" key={page}>
              <span className="page-link pointer" href="#" onClick={() => setCurrentPage(page)}>
                {page}
              </span>
            </li>
          ))}

          <li className="page-item ">
            <a className="page-link" href="#" aria-label="Next" onClick={() => currentPage < pageCount && setCurrentPage(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
        ):null
      }

    </div>
  );
}
