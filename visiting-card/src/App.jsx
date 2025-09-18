import { Download, Image } from 'lucide-react'
import './App.css'
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import DraggableWithResizableChild from './test';

function App() {
  const [input, setInput] = useState();
  const [type, setType] = useState();
  const divRef = useRef(null);
  const isResizing = useRef(false);
  

  const [card, setCard] = useState({
    image: null,
    title: null,
    subtitle: null,
    small: null
  })

  const uploadImage = (e)=> {
      const input = e.target;
      const file = input.files[0];
      const image = URL.createObjectURL(file)
      setType('image')
      setCard(prev => ({
        ...prev,
        image
      }))
      console.log(card)
  }

  const manageType = (type) => {
    setInput('')
    setType(type)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    setCard(prev => ({
      ...prev,
      [type]: {
        value: input
      }
    }))
  setInput('')
  }

  const download = async () => {

    const div = divRef.current;
    const canvas = await html2canvas(div, 10)
    const url = canvas.toDataURL(canvas, 'image/png')
    const a = document.createElement('a');
    a.href = url
    a.target="_blank"
    a.download = 'test.png'
    a.click();

  }

  const onDragEnd = (e, selectedType) => {
    const dragX = e.clientX
    const dragY = e.clientY

    const div = divRef.current
    const rect = div.getBoundingClientRect()
    const left = Math.max(0, Math.round(dragX - rect.left))
    const top = Math.max(0, Math.round(dragY - rect.top))

    setCard(prev =>(
      {
        ...prev,
        [selectedType]: {
          ...card[selectedType],
          top,
          left
        }
      }
    ))

  }

  const resizeBy = (e) => {
    debugger
    e.stopPropagation()
    const width = e.target.parentNode.clientWidth;
    const height = e.target.parentNode.clientHeight;
    const left = e.clientX;
    const top = e.clientY;
    

    isResizing.current = true;

    function mouseMove(e) {
      if(!isResizing.current) return;

      const newWidth = width + (e.clientX - left)
      const newHeight = height + (e.clientY - top)

       setCard(prev =>(
      {
        ...prev,
        ["title"]: {
          ...card["title"],
          width: newWidth,
          height: newHeight
        }
      }))
    }

    function mouseUp() {
      isResizing.current = false;
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseup", mouseUp)
    }

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  

  }

  const hasSelection = card.image || card.title?.value || card.subtitle?.value || card.small?.value


  return (
    <div className='bg-gray-200 h-screen flex items-center justify-center'>
      <div className='bg-white rounded-xl p-4 grid grid-cols-4 gap-4'>
        { type &&
          <form onSubmit={onSubmit} className='col-span-4 flex gap-2'>
          <input value={input} onChange={(e) => setInput(e.target.value)} className='rounded p-2 border-2 border-gray-200 flex-1'
          placeholder={`Enter ${type} here...`} />
          <button type='submit' className='rounded px-4 py-2 bg-blue-400'>Add</button>
        </form>
        }
        <button className='relative w-24 h-24 border-2 rounded-2xl border-amber-400 flex items-center justify-center hover:scale-110 duration-200'>
          <Image className='w-12 h-12 text-amber-400' />
          <input 
            type='file'
            className='w-full h-full absolute opacity-0'
            onChange={(e) => uploadImage(e)}
          />
        </button>
        <button onClick={() => manageType('title')} className={`text-xl font-bold w-24 h-24 border-2 rounded-2xl border-blue-400 text-blue-400 flex items-center justify-center hover:scale-110 duration-200 ${type === 'title' && 'bg-blue-400 text-white'}`}>
          Title
        </button>
        <button onClick={() => manageType('subtitle')} className={`text-lg w-24 h-24 border-2 rounded-2xl border-cyan-400 text-cyan-400 flex items-center justify-center hover:scale-110 duration-200 ${type === 'subtitle' && 'bg-cyan-400 text-white'}`}>
          Subtitle
        </button>
        <button onClick={() => manageType('small')} className={`text-sm w-24 h-24 border-2 rounded-2xl border-lime-400 text-lime-400 flex items-center justify-center hover:scale-110 duration-200 ${type === 'small' && 'bg-lime-400 text-white'}`}>
          Small
        </button>

        <div ref={divRef} className={`relative overflow-hidden flex items-center justify-center ${!hasSelection && 'border-gray-400 border-2 border-dashed'}  p-4 col-span-4 rounded-lg h-[250px]`}>
          {
            hasSelection ?  
            <>
              <img src={card.image} className='w-full h-full absolute round-lg object-cover' /> 
              <p style={{
                top: card.title?.top || '0', 
                left: card.title?.left || '0',
                width: card.title?.width || 'auto',
                height: card.title?.height || 'auto',
                }} draggable className={`bg-amber-950 cursor-move text-xl font-bold absolute  text-white`} onDragEnd={(e) => onDragEnd(e, 'title')}>
                {card.title?.value}
                <span className='absolute p-2 bottom-0 right-0 bg-amber-300 cursor-se-resize' onMouseDown={(e) => resizeBy(e)}>x</span>
                </p>
              <p style={{top: card.subtitle?.top || '0', left: card.subtitle?.left || '0'}} onDragEnd={(e) => onDragEnd(e, 'subtitle')} draggable className='cursor-move text-lg absolute  text-white'>{card.subtitle?.value}</p>
              <p style={{top: card.small?.top || '0' + 'px', left: card.small?.left || '0'}} onDragEnd={(e) => onDragEnd(e, 'small')} draggable className='cursor-move text-sm absolute text-white'>{card.small?.value}</p>
            </>
            :
            <h1 className='text-gray-400 font-bold'>Visiting Card</h1>
          }
        </div>
        <button onClick={download} className='rounded-lg col-span-4 gap-2 bg-blue-400 text-white px-4 py-2 flex justify-center items-center'>
          <Download /> Download
        </button>
      </div>
    </div>
  )
}

export default App
