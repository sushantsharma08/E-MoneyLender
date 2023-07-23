import React from 'react';
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient()



const Home = () => {
  const LenderId = useGetUserId();

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`https://e-money-lender-back.vercel.app/auth/user/${LenderId}`).then(
      // fetch(`http://localhost:3001/auth/user/${LenderId}`).then(
        (res) => res.json(),
      ),
  });

  //dynamic UI from useQuery output

  if (isLoading) return <section id='client' style={{ position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: "100px" }}>
      <div className="userdatadiv">
      <div id="wifi-loader">
          <svg class="circle-outer" viewBox="0 0 86 86">
            <circle class="back" cx="43" cy="43" r="40"></circle>
            <circle class="front" cx="43" cy="43" r="40"></circle>
            <circle class="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg class="circle-middle" viewBox="0 0 60 60">
            <circle class="back" cx="30" cy="30" r="27"></circle>
            <circle class="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg class="circle-inner" viewBox="0 0 34 34">
            <circle class="back" cx="17" cy="17" r="14"></circle>
            <circle class="front" cx="17" cy="17" r="14"></circle>
          </svg>
          <div class="text" data-text="Loading..."></div>
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
  console.log(data);


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
            <div className="relative rounded-full px-8 py-4 leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 text-3xl">
              Welcome, <b><i>{data?.name}</i></b>
            </div>
          </div>
          <div className=''>
            <div className="text-center flex items-center flex-col sm:flex-row">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl pb-14">Data to enrich your online business</h1>
              <a href="https://storyset.com/business"><img src="/images/homelogo.gif" alt="" /></a>
            </div>
            <ul role="list" className="divide-y divide-gray-100   rounded-lg border px-4">
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="h-12 w-12 flex-none rounded-full bg-gray-50" alt="" >hello</div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">name</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">mail</p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">checkout</p>
                </div>
              </li>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="h-12 w-12 flex-none rounded-full bg-gray-50" alt="" >hello</div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">name</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">mail</p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">role</p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                </div>
              </li>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="h-12 w-12 flex-none rounded-full bg-gray-50" alt="" >hello</div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">name</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">mail</p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">role</p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                </div>
              </li>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="h-12 w-12 flex-none rounded-full bg-gray-50" alt="" >hello</div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">name</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">mail</p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">role</p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* </div> */}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
            ></div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home