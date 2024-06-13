"use client"
import React, { useState } from 'react';
import { focusTableList } from './Helper';

const Select = () => {
  const [selected, setSelected] = useState("firstName");
  const [studentInput, setStudentInput] = useState("");
  const [studentList, setStudentList] = useState(focusTableList);
  const [noResults, setNoResults] = useState(false);

  function searchStudentList(e: any) {
    e.preventDefault();
    const filteredStudentList = focusTableList.filter(student => {
      if (selected === "firstName") {
        return student.firstName.toLowerCase().match(studentInput.toLowerCase());
      } else if (selected === "lastName") {
        return student.lastName.toLowerCase().match(studentInput.toLowerCase());
      } else if (selected === "email") {
        return student.email.toLowerCase().match(studentInput.toLowerCase());
      }
      return false;
    });
    setStudentList(filteredStudentList);
    if (filteredStudentList.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }
  return (
    <div className='max-w-[1140px] mx-auto px-4 pt-10'>
      <div className='max-w-[500px] mx-auto relative'>
        <form className='flex items-center gap-4' onSubmit={searchStudentList}>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className='border-2 h-8 px-2'
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
          </select>
          <input
            type="search"
            value={studentInput}
            onChange={(e) => setStudentInput(e.target.value)}
            className='border-2 px-2 h-8'
          />
          <button type='submit' className='bg-gray-400 text-white px-5 h-8 rounded-md'>
            Search
          </button>
        </form>
        {noResults && <p className='font-bold text-xl absolute top-10'>No Result Found</p>}
        <table className="border border-black mt-12 w-full">
          <thead>
            <tr>
              <th className="text-start ps-2 border-r border-r-black">First Name</th>
              <th className="text-start ps-2 border-r border-r-black">Last Name</th>
              <th className="text-start ps-2 border-r border-r-black">Email</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((obj, index) => {
              return (
                <tr key={index} className={`border-t border-t-black`}>
                  <td className="text-start ps-2 border-r border-r-black">{obj.firstName}</td>
                  <td className="text-start ps-2 border-r border-r-black">{obj.lastName}</td>
                  <td className="text-start ps-2 border-r border-r-black">{obj.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Select;
