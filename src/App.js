import './App.css';
import {useEffect, useState} from "react";
import {Progress, Spin, Table, Tag} from "antd";
import { StarTwoTone } from '@ant-design/icons';
import {colorFromString} from "./services/helpers";

const getFunds = (index) => {
  return axios.get(`http://localhost:5001/fund-trends/us-central1/getDBFunds`)
}

const sortByScore = (funds) => funds.sort((a,b)=>(b.developmentOneWeek + b.developmentOneMonth + b.developmentThreeMonths - (a.developmentOneWeek + a.developmentOneMonth + a.developmentThreeMonths))).map((obj, i)=> ({ ...obj, momentumRank: i, momentumScore: obj.developmentOneWeek + obj.developmentOneMonth + obj.developmentThreeMonths }))

const axios = require('axios').default;

function App() {
  const [funds, setFunds] = useState([])

useEffect(()=>{
  getFunds(0)
  .then(function (response) {
    setFunds(response.data.funds)
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
    title: 'Momentum Rank',
    dataIndex: 'momentumRank',
    key: 'momentumRank',
    sorter: (a, b) => a.momentumRank - b.momentumRank,
    render: (rank) => <div>{rank + 1}{' '}{rank < 3 && <Tag color={"green"}>BUY</Tag>}</div>
  },
  {
    title: 'Momentum Score',
    dataIndex: 'momentumScore',
    key: 'momentumScore',
    sorter: (a, b) => a.momentumScore - b.momentumScore,
    render: (score) => <div style={{color: score > 0 ? 'rgb(4, 116, 202)' : '#d0184d'}}>{score.toFixed(2)}</div>
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
    title: 'Morning Star Rating',
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
      {funds?.length > 0 ? < Table dataSource={sortByScore(funds)} columns={columns} rowKey={'name'} pagination={false} />:<Spin size="large" /> }
    </div>
  );
}

export default App;
