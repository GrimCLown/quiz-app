import './App.css'
import Quiz from './components/Quiz'


function App() {


  return (
    <>
    <div className='h-screen flex flex-col justify-center items-center bg-[#FFFCF2] gap-4'>
        <h1 className="text-5xl font-bold text-[#EB5E28]">
          Quiz Wiz
        </h1>
        <Quiz/>

    </div>
    </>
  )
}

export default App
