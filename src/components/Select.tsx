"use client";
import React, { useState } from "react";
import { focusTableList } from "./Helper";
const setPage = 4;

const Select = () => {
  const [selected, setSelected] = useState("firstName");
  const [studentInput, setStudentInput] = useState("");
  const [studentList, setStudentList] = useState(focusTableList);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState("")
  const [endPage, setEndPage] = useState("")

  function searchStudentList(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const filteredStudentList = focusTableList.filter((student) => {
      if (selected === "firstName") {
        return student.firstName
          .toLowerCase()
          .includes(studentInput.toLowerCase());
      } else if (selected === "lastName") {
        return student.lastName
          .toLowerCase()
          .includes(studentInput.toLowerCase());
      } else if (selected === "email") {
        return student.email.toLowerCase().includes(studentInput.toLowerCase());
      }
      return false;
    });
    setStudentList(filteredStudentList);
    setCurrentPage(1);
    setNoResults(filteredStudentList.length === 0);
  }

  const totalPages = Math.ceil(studentList.length / setPage);
  const paginatedStudents = studentList.slice(
    (currentPage - 1) * setPage,
    currentPage * setPage
  );

  return (
    <div className="max-w-[1140px] mx-auto px-4 pt-10">
      <div className="max-w-[500px] mx-auto relative">
        <form className="flex items-center gap-4" onSubmit={searchStudentList}>
          <div className="flex flex-col w-full">
            <div className="w-full flex gap-4">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="border-2 h-8 px-2"
              >
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
              </select>
              <input
                placeholder={` Enter ${selected}`}
                type="search"
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                className="border-2 px-2 h-8 w-full"
              />
            </div>
            <div className="w-full flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <p>Rage</p>
                <input type="text" className="border-2 px-2 h-8 w-10" />
                <p>to</p>
                <input type="text" className="border-2 px-2 h-8 w-10" />
              </div>
              <button
                type="submit"
                className="bg-gray-400 text-white px-5 h-8 rounded-md"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {noResults && (
          <p className="font-bold text-xl absolute top-[90px]">No Result Found</p>
        )}
        <div className="h-[140px]">
        <table className="border border-black mt-12 w-full">
          <thead>
            <tr>
              <th className="text-start ps-2 border-r border-r-black">
                First Name
              </th>
              <th className="text-start ps-2 border-r border-r-black">
                Last Name
              </th>
              <th className="text-start ps-2 border-r border-r-black">Email</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((obj, index) => {
              return (
                <tr key={index} className="border-t border-t-black">
                  <td className="text-start ps-2 border-r border-r-black">
                    {obj.firstName}
                  </td>
                  <td className="text-start ps-2 border-r border-r-black">
                    {obj.lastName}
                  </td>
                  <td className="text-start ps-2 border-r border-r-black">
                    {obj.email}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded-l-md"
            >
              Previous
            </button>
            <span className="px-4 py-1 bg-gray-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded-r-md"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
