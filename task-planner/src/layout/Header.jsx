import React from 'react'
import { usePlanner } from '../store/usePlanner';
import Timer from '../timer';
import { DatePicker } from 'antd';
import { Plus } from 'lucide-react';

function Header({setOpen}) {
      const { setFilter } = usePlanner()
    
      const filterByDate = function(e) {
        setFilter(e.$d)
      }
    
  return (
     <nav className="bg-gradient-to-r from-orange-600 via-amber-300 to-blue-300 h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8">
        <button className="rounded-full w-12 h-12 bg-blue-600 border-2 border-blue-200 text-white">
          PL
        </button>
        <div className="flex gap-2">
          <Timer />
          <DatePicker placeholder="Select Date" format={"DD MMM YYYY"} onChange={filterByDate} />
          <button
                className="px-2 py-1 rounded flex gap-1 bg-blue-500 text-white cursor-pointer"
                onClick={() => setOpen({value: true})}
              >
                <Plus />
                Add Task
              </button>
        </div>
      </nav>
  )
}

export default Header