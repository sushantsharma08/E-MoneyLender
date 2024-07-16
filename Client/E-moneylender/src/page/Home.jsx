import React, { useState } from 'react';
import axios, { all } from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import { FaUser, FaMoneyBillWaveAlt } from 'react-icons/fa';
import { GiGrowth } from 'react-icons/gi';
import {
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const queryClient1 = new QueryClient()

const Home = () => {
  const LenderId = useGetUserId();
  const [newRate, setnewRate] = useState()
  const [PrincipleSum, setPrincipleSum] = useState()
  const [TotalSum, setTotalSum] = useState()
  const [TotalRemainingAmount, setTotalRemainingAmount] = useState()

  const data = {
    labels: ['Principle ', 'Amount', 'Profit', 'Recovered', 'To Be Recovered'],
    datasets: [
      {
      label: 'Business Stats',
      data: [PrincipleSum, TotalSum, TotalSum - PrincipleSum,TotalSum-TotalRemainingAmount,TotalRemainingAmount],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      // barThickness: 55,
      // maxBarThickness: 100,
    },
    // {
    //   label: 'current Stats  ',
    //   data: [PrincipleSum-90000, TotalSum-200000, TotalSum - PrincipleSum-20000],
    //   backgroundColor: [
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(153, 102, 255, 0.2)',
    //     'rgba(201, 203, 207, 0.2)'
    //   ],
    //   borderColor: [
    //     'rgb(54, 162, 235)',
    //     'rgb(153, 102, 255)',
    //     'rgb(201, 203, 20)'
    //   ],
      
    //   borderWidth: 1,
    //   barThickness: 55,
    //   maxBarThickness: 100,
    // }
  ],
  };

  const options = { }

  const ChangeInterestRate = async () => {
    try {
      const url = `https://e-money-lender-back.vercel.app/auth/changeRate/${LenderId}`
      // const url=`http://localhost:3001/auth/changeRate/${LenderId}`
      const response = await axios.post(url, {
        interestRate: newRate
      })
      if (response.data.status === 400) {
        toast(response.data.message, {
          style: {
            backgroundColor: "rgba(241, 170, 170,1)"
          }
        })
      } else if (response.data.status === 202) {
        toast(response.data.message, {
          style: {
            backgroundColor: "greenyellow"
          }
        })
      }
    } catch (error) {

    }
  }

  const Getsum = async () => {
    // const response = await fetch(`http://localhost:3001/client/getallloans/${LenderId}`);
    const response = await fetch(`https://e-money-lender-back.vercel.app/client/getallloans/${LenderId}`);
    const res = await response.json();
    setPrincipleSum(res?.allLoanAmounts)
    setTotalSum(res?.sumTotal)
    setTotalRemainingAmount(res?.sumTotalremaining)
  }

  const { isLoading, error, data: homedata } = useQuery({
    queryKey: ['userData'],
    queryFn: () =>
      fetch(`https://e-money-lender-back.vercel.app/auth/user/${LenderId}`).then(
        (res) => res.json(),
      ),
  });

  //dynamic UI from useQuery output

  if (isLoading) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: "100px" }}>
      <div className="userdatadiv">
        <div id="wifi-loader">
          <svg className="circle-outer" viewBox="0 0 86 86">
            <circle className="back" cx="43" cy="43" r="40"></circle>
            <circle className="front" cx="43" cy="43" r="40"></circle>
            <circle className="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg className="circle-middle" viewBox="0 0 60 60">
            <circle className="back" cx="30" cy="30" r="27"></circle>
            <circle className="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg className="circle-inner" viewBox="0 0 34 34">
            <circle className="back" cx="17" cy="17" r="14"></circle>
            <circle className="front" cx="17" cy="17" r="14"></circle>
          </svg>
          <div className="text" data-text="Loading..."></div>
        </div>
      </div>
    </div>
  </section>

  if (error) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="userdatadiv">
        <h2>An error has occurred: <b>{error.message}</b></h2>
      </div>
    </div>
  </section>

  Getsum();

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
            ></div>
          </div>
          {/* <div className="mx-auto max-w-2xl pb-32 sm:pb-48 lg:pb-44"> */}
          <div className="slide-in-elliptic-top-fwd slide-out-top sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-8 py-4 leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 sm:text-xl text-base text-center">
              Welcome, <b><i>{homedata?.name}</i></b>
            </div>
          </div>

          {/* main div */}

          <div className='fade-in-fwd'>
            <div className="text-center flex items-center flex-col sm:flex-row">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl pb-14">Data to enrich your online business</h1>
              <a href="https://storyset.com/business"><img src="/images/homelogo.gif" alt="" /></a>
            </div>

            <section className="text-gray-600 body-font border-l container px-5  mx-auto flex flex-wrap justify-center -m-4 card-container">
              {/* <div className="container px-5  mx-auto flex"> */}
              {/* <div className="flex flex-wrap justify-center -m-4 card-container" > */}

              <div className="cards p-4 md:w-1/3 ">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col card"
                // style="background: linear-gradient(rgba(0, 0, 0, 0.1502) , rgba(62, 42, 78, 0.15))"
                >
                  <div className="flex items-center mb-3">
                    <div
                      className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"
                    // style="background-color: #2e2e2e5e;"
                    >
                      {/* <i className="bi card-icon text-lg  bi-search"></i> */}
                      <FaUser className='text-gray-300' />
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium pl-6">{homedata?.name}</h2>
                  </div>
                  <hr className="mb-2 relative -top-2.5 ml-9 border-gray-700" />
                  <div className="flex-grow">

                    <div className=" links flex-col flex justify-center items-center">
                      <tr className='w-full flex justify-between border-b border-gray-300 '><td className='min-w-[30%] b'>Current Rate of Interest:</td> <td className='font-semibold '>{homedata?.interestRate}%</td></tr>

                      <tr className='w-full flex justify-between border-b border-gray-300 '><td className='min-w-[30%] b'>E-mail :</td> <td className='font-semibold text-sm'>{homedata?.email}</td></tr>

                      <tr className='w-full flex justify-between border-b border-gray-300 '><td className='min-w-[30%] b'>Phone no. :</td> <td className='font-semibold '>{homedata?.phone}</td></tr>

                      <tr className='w-full flex justify-between border-b border-gray-300 '><td className='min-w-[30%] b'>Adhaar no. :</td> <td className='font-semibold '>{homedata?.adhaar}</td></tr>

                      <tr className='w-full flex justify-between border-b border-gray-300 '><td className='min-w-[30%] b'>PAN Id :</td> <td className='font-semibold '>{homedata?.panId}</td> </tr>

                    </div>
                  </div>
                </div>
              </div>
              <div className="cards p-4 md:w-1/3 ">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col card"
                // style="background: linear-gradient(rgba(0, 0, 0, 0.1502) , rgba(62, 42, 78, 0.15))"
                >
                  <div className="flex items-center mb-3">
                    <div
                      className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"
                    // style="background-color: #2e2e2e5e;"
                    >
                      <GiGrowth />
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium pl-6">Change Interest Rate</h2>
                  </div>
                  <hr className="mb-2 relative -top-2.5 ml-9 border-gray-700" />
                  <div className="flex-grow">

                    <div className=" links flex flex-col md:flex-row sm:flex-row justify-center items-center">
                      <label htmlFor="interestRate"></label>
                      <input className='px-2 py-1 bg-blue-300/20 outline-0 border rounded border-violet-300' placeholder='Enter new rates' type="number" name="interestRate" id="interestRate" onChange={(e) => setnewRate(e.target.value)} />
                      <button className='btn px-2 py-1 border text-zinc-100 rounded bg-violet-400 font-semibold' onClick={ChangeInterestRate}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cards p-4 md:w-1/3 ">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col card"
                // style="background: linear-gradient(rgba(0, 0, 0, 0.1502) , rgba(62, 42, 78, 0.15))"
                >
                  <div className="flex items-center mb-3">
                    <div
                      className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"
                    // style="background-color: #2e2e2e5e;"
                    >
                      <FaMoneyBillWaveAlt className='text-gray-300' />
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium pl-6">Finance Information</h2>
                  </div>
                  <hr className="mb-2 relative -top-2.5 ml-9 border-gray-700" />
                  <div className="flex-grow">

                    <div className=" links flex-col flex justify-center items-center">
                      <tr className='w-full flex justify-between border-b border-gray-300 '>
                        <td className='min-w-[30%] b'>Capital Input:</td>
                        <td className='font-semibold '>{PrincipleSum} ₹</td>
                      </tr>

                      <tr className='w-full flex justify-between border-b border-gray-300 '>
                        <td className='min-w-[30%] b'>Total To Come:</td>
                        <td className='font-semibold '>{TotalSum} ₹</td>
                      </tr>

                      <tr className='w-full flex justify-between border-b border-gray-300 '>
                        <td className='min-w-[30%] b'>Profit Figure:</td>
                        <td className='font-semibold '>{TotalSum - PrincipleSum} ₹</td>
                      </tr>
                      
                        <tr className='w-full flex justify-between border-b border-gray-300 '>
                          <td className='min-w-[30%] b'>Amount to Recover:</td>
                          <td className='font-semibold whitespace-nowrap'>{TotalRemainingAmount} ₹</td>
                        </tr>

                        <tr className='w-full flex justify-between border-b border-gray-300 '>
                          <td className='min-w-[30%] b'>Amount Recieved:</td>
                          <td className='font-semibold whitespace-nowrap '>{TotalSum-TotalRemainingAmount} ₹</td>
                        </tr> 

                    </div>

                  </div>
                </div>
              </div>

              {/* </div> */}
              {/* </div> */}
            </section>

            <div className=' h-48 border flex justify-center mt-10 sm:h-80'>
              <Bar
                data={data}
                options={options}
              ></Bar>
            </div>
          </div>

          {/* </div> */}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
            ></div>
          </div>
        </div>

      </div>

      <Toaster />
    </>
  )
}

export default Home