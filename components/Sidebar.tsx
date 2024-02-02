import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState('/dashboard');
  const router = useRouter();
  useEffect(() => {
    setCurrentPage(router.pathname);
  }, [router.pathname]);

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #2E2E2E 0%, #3A3A3A 99.99%)',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 1
      }}
      className='top-0 left-0 hidden w-24 h-full px-0 py-2 text-white md:flex'>
      <ul className='flex flex-col items-center gap-4 p-1'>
        <li
          onClick={() => router.push('/dashboard')}
          onKeyUp={() => router.push('/dashboard')}
          className='flex flex-col items-center'>
          <Image src='/XMessenger_White 1.png' width={70} height={70} alt='' />
        </li>
        <li
          onClick={() => router.push('/dashboard')}
          onKeyUp={() => router.push('/dashboard')}
          className={`flex flex-col cursor-pointer items-center gap-1 p-1 ${
            currentPage === '/dashboard' ? 'activePage' : ''
          }`}>
          <Image src='/Dashboard.png' width={35} height={35} alt='' />
          <p className='text-xs font-thin text-center '>DASHBOARD</p>
        </li>
        <li
          onClick={() => router.push('/chat')}
          onKeyUp={() => router.push('/chat')}
          className={`flex flex-col cursor-pointer items-center gap-1 p-1 ${
            currentPage === '/chat' ? 'activePage' : ''
          }`}>
          <Image src='/Chat Bubble.png' width={35} height={35} alt='' />

          <p className='text-xs font-thin text-center '>MESSENGER</p>
        </li>
        <li
          onClick={() => router.push('/transfer')}
          onKeyUp={() => router.push('/transfer')}
          className={`flex flex-col cursor-pointer items-center gap-1 p-1  ${
            currentPage === '/transfer' ? 'TactivePage' : ''
          }`}>
          <Image src='/Data Transfer.png' width={35} height={35} alt='' />
          <p className='text-xs font-thin text-center '>
            CRYPRO <br /> TRANSFERS
          </p>
        </li>
        <li
          onClick={() => router.push('/nodes')}
          onKeyUp={() => router.push('/nodes')}
          className={`flex flex-col cursor-pointer items-center gap-1 p-1 ${
            currentPage === '/nodes' ? 'activePage' : ''
          }`}>
          <Image src='/Anchor Nodes.png' width={35} height={35} alt='' />
          <p className='text-xs font-thin text-center '>NODES</p>
        </li>
        <li
          onClick={() => router.push('/validators')}
          onKeyUp={() => router.push('/validators')}
          className={`flex flex-col  cursor-pointer items-center gap-1 p-1 ${
            currentPage === '/validators' ? 'activePage' : ''
          }`}>
          <Image src='/Batch Assign.png' width={35} height={35} alt='' />
          <p className='text-xs font-thin text-center '>VALIDATORS</p>
        </li>
        <li
          onClick={() => router.push('/treasury')}
          onKeyUp={() => router.push('/treasury')}
          className={`flex flex-col cursor-pointer items-center gap-1 p-1 ${
            currentPage === '/treasury' ? 'activePage' : ''
          }`}>
          <Image src='/Sparkling Diamond.png' width={35} height={35} alt='' />

          <p className='text-xs font-thin text-center'>TREASURY</p>
        </li>
      </ul>
    </div>
  );
}
