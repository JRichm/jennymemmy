import Image from 'next/image'
import MainHeader from './components/mainHeader'
import Timeline from './components/timeline'


export default function Home() {
  return (
    <main className='flex flex-col'>
      <MainHeader />
      <div>
        <div>
          <p>timeline</p>
          <div className='max-w-[1000px] w-full self-center'>
            <div className='bg-blue-100 p-5'>
              <Timeline />
            </div>
          </div>
        </div>
        <p>memory highlights</p>
        <p>interactive map</p>
        <p>future plans</p>
        <p>games and quizes</p>
      </div>
    </main>
  )
}
