import React, {useState} from "react"
import { PageContainer } from "@/components"
import ProductListHeader from "./ProductListHeader"
import ProductListTable from "./ProductListTable"

const ProductsPage = () => {
  const [searchParam, setSearchParam] = useState('');
  const handleSearchData = (value) => {
    setSearchParam(value)
  }
  return (
    <PageContainer>
      <ProductListHeader handleSearchData={handleSearchData} />
      <ProductListTable searchData={searchParam} />
    </PageContainer>
  )
}

export default ProductsPage
