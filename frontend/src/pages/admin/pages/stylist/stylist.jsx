import React from 'react'
import StylistContextContainer from '../../../../context/stylistContext'
import StylistTable from './stylistTable'

export default function Stylist() {
  return (
      <StylistContextContainer>
      
    <div
      id="manage_product_category"
      className="manage_product_category main_section "
      >
      <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

      <StylistTable />
    </div>
    </StylistContextContainer>
  )
}
