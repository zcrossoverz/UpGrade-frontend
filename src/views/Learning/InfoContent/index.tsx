import React from "react";

function InfoContent() {
  return (
    <div className='relative group'>
      <a className='text-md active:font-bold hover:text-blue-400 text-lg text-center w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1'>
        Dropdown
      </a>
      <div className='absolute z-10 hidden bg-grey-200 group-hover:block'>
        <div className='px-2 pt-2 pb-4 bg-red-200 shadow-lg'>
          <div className='dropdown-menu'>
            <ul>
              <li>
                <a href='/first' className=' dropdown-item'>
                  First{" "}
                </a>
              </li>
              <li>
                <a href='/second' className=' dropdown-item'>
                  Second{" "}
                </a>
              </li>
              <li>
                <a href='/third' className=' dropdown-item'>
                  Third{" "}
                </a>
              </li>
              <li>
                <a href='/fourth' className=' dropdown-item'>
                  Fourth{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContent;
