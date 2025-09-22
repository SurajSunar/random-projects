import React from 'react'
import "animate.css"
import { Delete, Download, Trash, Trash2, Upload } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import { useImageStore } from './zustand/useImageStore'

const FIVE_MB = 5 * 1024 * 1024

const App = () => {
  const {images, setImage} = useImageStore();

  const chooseFile = (e) => {
    const file = e.target.files[0]

    if(!(file.type.startsWith('image/')))
      return toast.error("Only image is allowed to be uploaded", {position: "top-center"})

    if(file.size > FIVE_MB)
      return toast.error("Image size more than 5MB", {position: "top-center"})

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = ()=> {
      setImage({
        id: Date.now(),
        name: file.name,
        size: file.size,
        binary: fileReader.result,
        createAt: new Date()
      })

      toast.success("New image added")
    }
  }

  return (
    <div class="bg-gray-100 min-h-screen">
      <div class="w-9/12 mx-auto py-10 space-y-8">
        <h1 className="text-4xl font-bold text-center">Image Storage</h1>
        <div class= "relative cursor-pointer text-white w-8/12 mx-auto border-2 border-white border-dashed flex flex-col items-center py-16 rounded-lg bg-gradient-to-br from-blue-600  to-red-400">
            <Upload className="w-16 h-16" />
            <h1 className="text-lg font-semibold"> Click to add Image</h1>
            <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 rounded-2xl  cursor-pointer"  
            onChange={chooseFile}/>
        </div>
        <div className='grid grid-cols-4 gap-8 '>
            {
              images.map((image, index) => 
              <div key={index} className='hover:scale-105 transition-transform duration-200 hover:shadow-lg'>
                <img src={image.binary} className='w-full h-[150px] object-cover rounded-t-lg' />
                <div className='bg-white p-4 rounded-b-lg space-y-2'>
                  <h1 className="font-semibold">{image.name}</h1>
                  <p>({Math.floor(image.size/1024) + ' KB'})</p>
                  <div className="flex gap-2 justify-between">
                     <Download className='hover:text-2xl cursor-pointer text-green-500' onClick={() => download(image)} />
                     <Trash2 className='text-red-500 hover:text-lg cursor-pointer' onClick={() => deleteImage(image)} />
                  </div>

                </div>
               
                </div>
              )
            }
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App