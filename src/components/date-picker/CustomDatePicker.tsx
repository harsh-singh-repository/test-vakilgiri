import { cn } from '@/lib/utils'
import React from 'react'

const CustomDatePicker = ({className}: any) => {
    return (
        <input
            type="date"
            className={cn("w-full text-xs py-2 px-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-500 hover:shadow-lg transition-all duration-200 ease-in-out", className)}
            style={{
                colorScheme: 'light',
            }}
        />
    )
}

export default CustomDatePicker
