import chart from '/src/shared/images/iconly-glass-chart.svg.png'
import tick from '/src/shared/images/iconly-glass-tick.svg.png'
import discount from '/src/shared/images/iconly-glass-discount.svg.png'
import { LineChart } from '@mui/x-charts/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import muiBox from '/src/shared/images/div.MuiBox-root.png'
import { getProduct } from '../../entities/api/productsApi';
import API from '../../shared/config/api';

const Dashboard = () => {
  const products = useSelector((state) => state.product.products)
  const dispatch = useDispatch() 

  const dataset = [
    { x: 1, y: 2 },
    { x: 2, y: 5.5 },
    { x: 3, y: 2 },
    { x: 5, y: 8.5 },
    { x: 8, y: 1.5 },
    { x: 10, y: 5 },
  ];

  const monthLabels = {
    1: 'Янв',
    2: 'Фев',
    3: 'Мар',
    4: 'Апр',
    5: 'Май',
    6: 'Июн',
    7: 'Июл',
    8: 'Авг',
    9: 'Сен',
    10: 'Окт',
    11: 'Ноя',
    12: 'Дек',
  };

  useEffect(() => {
    dispatch(getProduct())
  }, [])

  return <>
      <section className='flex items-start max-md:m-auto justify-between md:flex-row flex-col'>
        <article className='md:w-[647px] flex flex-col-reverse md:flex-col'>
          <article className='flex items-center gap-[16px] max-md:my-[20px] flex-col md:flex-row justify-between'>
            <article className='flex items-center gap-[16px] w-[207px] bg-[#FEF3F2] rounded-[4px] py-[16px] px-[24px] h-[84px]'>
              <img src={chart} alt="chart" />
              <article>
                <h4 className='text-[#6C737F] text-[14px] font-normal'>Sales</h4>
                <h3 className='text-[#111927] font-extrabold text-[25px]'>$152k</h3>
              </article>
            </article>
            <article className='flex items-center gap-[16px] w-[207px] bg-[#FEF3F2] rounded-[4px] py-[16px] px-[24px] h-[84px]'>
              <img src={discount} alt="discount" />
              <article>
                <h4 className='text-[#6C737F] text-[14px] font-normal'>Cost</h4>
                <h3 className='text-[#111927] font-extrabold text-[25px]'>$99.7k</h3>
              </article>
            </article>
            <article className='flex items-center gap-[16px] w-[207px] bg-[#FEF3F2] rounded-[4px] py-[16px] px-[24px] h-[84px]'>
              <img src={tick} alt="tick" />
              <article>
                <h4 className='text-[#6C737F] text-[14px] font-normal'>Profit</h4>
                <h3 className='text-[#111927] font-extrabold text-[25px]'>$32.1k</h3>
              </article>
            </article>
          </article>
            <LineChart
              dataset={dataset}
              xAxis={[
                {
                  dataKey: 'x',
                  scaleType: 'linear',
                  tickFormatter: (value) => monthLabels[value] || '',
                },
              ]}
              series={[{ dataKey: 'y' }]}
              height={325}
              // width={690}
              className='md:w-[690px] w-full'
              grid={{ vertical: true, horizontal: true }}
            />
        </article>

        <article className='md:w-[33%] max-md:m-auto h-[426px] px-[16px] py-[12px] border-[1px] border-[#00000014] rounded-[4px]'>
            <h2 className='text=[#111927] mb-[16px] text-[16px] font-bold'>Top selling products</h2>
            
            <article className='flex flex-col gap-[18px]'>
              {
                products && products.slice(0, 5).map((e) => {
                  return (
                  <article key={e.id} className='flex items-center justify-between'>
                      <article className='flex items-center gap-[10px]'>
                        <img src={`${API}images/${e.image}`} alt="image" className='rounded-[8px] h-[54px] w-[52px]' />
                        <article>
                          <h3 className='text-[14px]'>{e.productName}</h3>
                          <p className='text-[14px] text-[#6C737F]'>{e.categoryName}</p>
                        </article>
                      </article>
                      <article className='text-end'>
                        <h3 className='text-[#10B981] text-[14px]'>${e.discountPrice}</h3>
                        <p className='text-[#6C737F] text-[14px]'>in sales</p>
                      </article>  
                  </article>
                  ) 
                })
              }
            </article>
        </article>
      </section>
      
      <section className="flex justify-between flex-col md:flex-row mt-[24px] gap-[32px]">
        <table className="md:w-[48%] w-full text-left  rounded-lg shadow p-[5px]">
          <caption className="text-lg font-semibold mb-4 text-start">
            Recent Transactions
          </caption>
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="p-[10px]">Name</th>
              <th className="p-[10px]">Date</th>
              <th className="p-[10px]">Amount</th>
              <th className="p-[10px]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-[5px]">Jagarnath S.</td>
              <td className="px-[5px]">24.05.2023</td>
              <td className="px-[5px]">$124.97</td>
              <td className="px-[5px]">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-[5px]">Anand G.</td>
              <td className="px-[5px]">23.05.2023</td>
              <td className="px-[5px]">$55.42</td>
              <td className="px-[5px]">
                <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Pending
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-[5px]">Kartik S.</td>
              <td className="px-[5px]">23.05.2023</td>
              <td className="px-[5px]">$89.90</td>
              <td className="px-[5px]">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-[5px]">Rakesh S.</td>
              <td className="px-[5px]">22.05.2023</td>
              <td className="px-[5px]">$144.94</td>
              <td className="px-[5px]">
                <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Pending
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-[5px]">Anup S.</td>
              <td className="px-[5px]">22.05.2023</td>
              <td className="px-[5px]">$70.52</td>
              <td className="px-[5px]">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Paid
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-[5px]">Jimmy P.</td>
              <td className="px-[5px]">22.05.2023</td>
              <td className="px-[5px]">$70.52</td>
              <td className="px-[5px]">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      
        <table className="md:w-[48%] w-full text-left rounded-lg shadow">
          <caption className="text-lg font-semibold mb-4 text-start">
            Top Products by Units Sold
          </caption>
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="p-[10px]">Name</th>
              <th className="p-[10px]">Price</th>
              <th className="p-[10px]">units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-[5px] py-3 flex items-center gap-[8px]">
              <img src={muiBox} alt="muiBox" />
              <p>Men Grey Hoodie</p>
              </td>
              <td className="px-[5px] py-3">$49.90</td>
              <td className="px-[5px] py-3">204</td>
            </tr>    
            <tr>
              <td className="px-[5px] py-3 flex items-center gap-[8px]">
              <img src={muiBox} alt="muiBox" />
              <p>Women Striped T-Shirt</p>
              </td>
              <td className="px-[5px] py-3">$34.90</td>
              <td className="px-[5px] py-3">55</td>
            </tr>    
            <tr>
              <td className="px-[5px] py-3 flex items-center gap-[8px]">
              <img src={muiBox} alt="muiBox" />
              <p>Wome White T-Shirt</p>
              </td>
              <td className="px-[5px] py-3">$20.90</td>
              <td className="px-[5px] py-3">120</td>
            </tr>    
            <tr>
              <td className="px-[5px] py-3 flex items-center gap-[8px]">
              <img src={muiBox} alt="muiBox" />
              <p>Men White T-Shirt</p>
              </td>
              <td className="px-[5px] py-3">$49.90</td>
              <td className="px-[5px] py-3">204</td>
            </tr>    
            <tr>
              <td className="px-[5px] py-3 flex items-center gap-[8px]">
              <img src={muiBox} alt="muiBox" />
              <p>Women Red T-Shirt</p>
              </td>
              <td className="px-[5px] py-3">$34.90</td>
              <td className="px-[5px] py-3">55</td>
            </tr>    
          </tbody>
        </table>
      </section>
  </>;
};

export default Dashboard;
