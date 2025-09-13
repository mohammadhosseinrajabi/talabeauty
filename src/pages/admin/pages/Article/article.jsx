import React from 'react'
import ArticleTable from './articleTable'

export default function Article() {
  return (

     <div
       id="manage_product_category"
       className="manage_product_category main_section "
       >
       <h4 className="text-center my-3">مدیریت مطالب</h4>
        <ArticleTable/>
     </div>

  )
}
