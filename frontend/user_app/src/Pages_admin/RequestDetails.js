import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "../components/SideBar_admin";

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);     
  };


  return (
    <>
    <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          pl: 3,
          pr: 3,
          width: "70vw",
          height: "90vh",
          ml: "22%",
          mb: "5%",
        }}
      >
        <div class="max-w-sm w-full min-w-full lg:max-w-full lg:min-w-full lg:flex mt-5 h-1/3">
          <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:border lg:border-gray-600 lg:rounded-t-none lg:rounded-l text-center overflow-hidden w-full lg:max-w-full" title="Woman holding a mug">
            <img src="/idcheck.jpg"/>
          </div>
          <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mt-8">
              <div class="text-gray-900 font-bold text-xl mb-2">Is the NIC legitimate?</div>
              <p class="text-gray-700 text-base">Is the NIC of the user a registered NIC in the Department for Registration of Persons?</p>
              <div class="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 mt-5 rounded-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                  />
                </svg>
                <p>NIC is legitimate</p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-sm w-full lg:max-w-full lg:flex mt-5 h-1/3">
          <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:border lg:border-gray-600 lg:rounded-t-none lg:rounded-l text-center overflow-hidden " title="Woman holding a mug">
            <img src="/addresscheck.jpg"/>
          </div>
          <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mt-8">
              <div class="text-gray-900 font-bold text-xl mb-2">Is the Address provided legitimate?</div>
              <p class="text-gray-700 text-base">Does the address match with the registered address for the NIC?</p>
              {/* Success icon and Success message */}
              <div class="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 mt-5 rounded-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                  />
                </svg>
                <p>Address is legitimate</p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-sm w-full lg:max-w-full lg:flex mt-5 h-1/3 mb-5">
          <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:border lg:border-gray-600 lg:rounded-t-none lg:rounded-l text-center overflow-hidden " title="Woman holding a mug">
            <img src="/police_check.jpg"/>
          </div>
          <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mt-8">
              <div class="text-gray-900 font-bold text-xl mb-2">Can the police clearance be issued?</div>
              <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              <div class="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 mt-5 rounded-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                  />
                </svg>
                <p>User is eligible for police clearance</p>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Dashboard;
