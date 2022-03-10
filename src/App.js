import './App.css';
import {useEffect, useState} from "react";
import {Progress, Table, Tag} from "antd";
import { StarTwoTone } from '@ant-design/icons';
import {colorFromString} from "./services/helpers";

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
    render: (name, item) => <a href={`https://www.avanza.se/fonder/om-fonden.html/${item.orderbookId}/avanza-zero`}>{name}</a>
  },
  {
    title: 'Momentum score',
    key: 'score',
    sorter: (a, b) => a.developmentOneWeek + a.developmentOneMonth + a.developmentThreeMonths - (b.developmentOneWeek + b.developmentOneMonth + b.developmentThreeMonths),
    render: (item) => <div style={{color: item.developmentOneWeek + item.developmentOneMonth + item.developmentThreeMonths > 0 ? '#007f8f' : '#d0184d'}}>{parseFloat(item.developmentOneWeek?.toFixed(1) + item.developmentOneMonth?.toFixed(1) + item.developmentThreeMonths?.toFixed(1))}%</div>
  },
  {
    title: '1 week',
    dataIndex: 'developmentOneWeek',
    key: 'developmentOneWeek',
    render: (amount) => <div style={{color: amount > 0 ? 'rgb(4, 116, 202)' : '#d0184d'}}>{amount.toFixed(1)*10/10}%</div>
  },
  {
    title: '1 month',
    dataIndex: 'developmentOneMonth',
    key: 'developmentOneMonth',
    render: (amount) => <div style={{color: amount > 0 ? 'rgb(4, 116, 202)' : '#d0184d'}}>{amount.toFixed(1)}%</div>
  },
  {
    title: '3 months',
    dataIndex: 'developmentThreeMonths',
    key: 'developmentThreeMonths',
    render: (amount) => <div style={{color: amount > 0 ? 'rgb(4, 116, 202)' : '#d0184d'}}>{amount.toFixed(1)}%</div>
  },
  {
    title: 'Total fee',
    dataIndex: 'totalFee',
    key: 'totalFee',
    render: (fee) => <div>{fee.toFixed(2)}%</div>
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (categories)=><div>{categories.split(',').map(category=><Tag color={colorFromString(category)}>{category}</Tag>)}</div>
  },
  {
    title: 'Company',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: 'Currency',
    dataIndex: 'currencyCode',
    key: 'currencyCode',
    render: (currency)=><Tag color={colorFromString(currency)}>{currency}</Tag>
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (rate) => <>{[...Array(rate).keys()].map(()=><StarTwoTone twoToneColor='#FFB000' />)}</>
  },
  {
    title: 'Risk',
    dataIndex: 'risk',
    key: 'risk',
    render: (risk) => <Progress percent={risk*100/7} steps={7} showInfo={false} strokeColor="#52c41a" />
  },
];

  return (
    <div className="App" style={{padding: 50}}>
      <Table dataSource={funds} columns={columns} rowKey={'name'} />;
    </div>
  );
}

export default App;
