import './App.css';
import {useEffect, useState} from "react";
import {Table} from "antd";
const axios = require('axios').default;

function App() {

  const [funds, setFunds] = useState()

useEffect(()=>{
//  axios.get('http://localhost:5001/fund-trends/us-central1/getFunds')
  axios.get('https://us-central1-fund-trends.cloudfunctions.net/getFunds')
  .then(function (response) {
    setFunds(response.data.fundListViews)
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  });},[])

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Currency',
    dataIndex: 'currencyCode',
    key: 'currencyCode',
  },
  {
    title: 'Type',
    dataIndex: 'fundType',
    key: 'fundType',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: 'risk',
    dataIndex: 'risk',
    key: 'risk',
  },
];

  return (
    <div className="App">
      <Table dataSource={funds} columns={columns} />;
    </div>
  );
}

export default App;
