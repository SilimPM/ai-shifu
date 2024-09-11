import {  Space, Modal } from "antd";
import SearchForm from "./SearchForm";
import CommonListTable from "./CommonListTable";
import { useEffect, useState } from "react";
import EditContactModal from "./Modal/EditContactModal";
import ContactDetailModal from "./Modal/ContactDetailModel";
import { useLocation,useSearchParams } from "react-router-dom";




import { Pagination } from "antd";

import {getViewInfo,queryView} from "../../Api/manager"
import { set } from "store";

const CommonListPage = ({viewName}) => {

  const queryStrings  = new URLSearchParams(useLocation().search)
  console.log('queryStrings', queryStrings)
  const defaultParams = {}
  queryStrings.forEach((value, key) => {
    defaultParams[key] = value
  });
  console.log('defaultParams', defaultParams)
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  /**
   * @description 查询参数
   */
  const [loading, setLoading] = useState(false);
  const [colum, setColum] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [searchDefine,setSearchDefine]=useState({})
  const [operationItems,setOperationItems]=useState([])
  /**
   *@description 点击搜索的方法
   *
   * @param {*} searchParams 搜索表单中的条件
   */
  const onSearch = (searchParams) => {
    setSearchParams(searchParams)
    setCurrentPage(1);
  };

  const onReset = (searchParams) => {
    setCurrentPage(1);
    searchParams(searchParams)
  };

  useEffect(() => {
    getViewInfo(viewName).then((res) => {
      console.log(res);
      const columns = res.data.items.map((item) => {
        return {
          title: item.lable,
          dataIndex: item.name,
          key: item.name,
        };
      });
      setOperationItems(res.data.operation_items)
      setColum(columns);
      setSearchDefine(res.data.queryinput);
      setSearchParams({})
      setCurrentPage(1)
    });
  }, [viewName]);
  const [contactInfoList, setContactInfoList] = useState([]);
  /**
   * @description 联系人数据
   */
  const queryAllContacts = () => {
    setLoading(true);
    const params = {
      ...searchParams,
      ...defaultParams
    }
    console.log(params)
    queryView(viewName,currentPage,pageSize,params)
      .then((res) => {
        setTotal(res.data.total);
        setContactInfoList(res.data.items);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onPaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  }

  useEffect(() => {
    queryAllContacts();
  }, [pageSize,currentPage,searchParams]);
  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <SearchForm onSearch={onSearch} onReset={onReset} inputs={searchDefine}></SearchForm>
      <CommonListTable
        operationItems={operationItems}
        dataColumns={colum}
        dataSource={contactInfoList}
        loading={loading}
      ></CommonListTable>
      <Pagination pageSize={pageSize} onChange={onPaginationChange} current={currentPage} total={total} ></Pagination>
    </Space>
  );
};
export default CommonListPage;
