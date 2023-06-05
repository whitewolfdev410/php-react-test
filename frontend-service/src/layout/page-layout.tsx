import React from 'react'

const PageLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <div className='bg-[#eaeaea] min-h-screen min-w-screen flex justify-start'>
            {children}
        </div>
    )
}

export default PageLayout