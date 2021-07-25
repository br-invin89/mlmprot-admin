import React, { /* useEffect, useState */ } from 'react'
// import { 
//   getSubscribersProcessedTableApi, getSubscribersProcessedStatApi 
// } from '@/services/reports/subscriberReport'
// import SearchForm from './SearchForm'
// import StatView from './StatView'
// import TableView from './TableView'

export default function ProcessedSubPage() {
  // const [searchParam, setSearchParam] = useState({
  //   user_id: '', product_sku: '', date_range: ''
  // })
  // const [paginationParam, setPaginationParam] = useState({
  //   currentPage: 1,
  //   perPage: 15,
  //   total: 0
  // })
  // const [statData, setStatData] = useState({
  //   users: 0, product_types: 0,
  //   products: 0, total_sales: 0
  // })
  // const [tableData, setTableData] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  // const onGetTableData = (data) => {
  //   setTableData(data.data)
  //   setPaginationParam({
  //     ...paginationParam,
  //     total: data.total
  //   })
  // }
  // const onFailTableData = () => {

  // }

  // const loadTableData = (searchParam0, paginationParam0) => {
  //   const params = {
  //     page: paginationParam0.currentPage,
  //     per_page: paginationParam0.perPage,
  //     user_id: searchParam0.user_id,
  //     product_sku: searchParam0.product_sku,
  //     date_range: searchParam0.date_range,
  //   }
  //   getSubscribersProcessedTableApi(params, onGetTableData, onFailTableData)
  // }
  
  // const loadStatData = (searchParam0) => {

  // }
  
  // const handleSearch = () => {
  //   const paginationParam0 = {
  //     ...paginationParam,
  //     currentPage: 1,
  //   }
  //   loadTableData(searchParam, paginationParam0)
  //   loadStatData(searchParam)
  // }

  // const onPageChange = (page0) => {
  //   const paginationParam0 = {
  //     ...paginationParam,
  //     currentPage: page0
  //   }
  //   loadTableData(searchParam, paginationParam0)
  // }

  // useEffect(() => {
  //   loadTableData(searchParam, paginationParam)
  //   loadStatData(searchParam)
  // }, [])

  return (
    <div>
      {/* <SearchForm 
        searchParam={searchParam} setSearchParam={setSearchParam}
        handleSearch={handleSearch}
      />
      <StatView
        statData={statData}
      />
      <TableView 
        tableData={tableData} 
        paginationParam={paginationParam}
        onPageChange={onPageChange}
      /> */}
    </div>
  )
}
