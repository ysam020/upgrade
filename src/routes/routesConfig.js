import React from "react";
import Modules from "../components/home/Modules.js";
import Assign from "../components/home/Assign.js";
import Profile from "../components/profile/Profile.js";
import Help from "../components/home/Help.js";
import Dashboard from "../components/dashboard/Dashboard.js";
import Calendar from "../components/home/Calendar.js";
// Employee KYC
import EmployeeKYC from "../components/hrManagement/employeeKyc/EmployeeKYC.js";
import ViewIndividualKyc from "../components/hrManagement/employeeKyc/ViewIndividualKyc.js";
import EditEmployeeKyc from "../components/hrManagement/employeeKyc/EditEmployeeKyc.js";
// Job Openings
import JobOpenings from "../components/hrManagement/job-openings/JobOpenings.js";
import ViewIndividualJob from "../components/hrManagement/job-openings/ViewIndividualJob.js";
// Appraisal
import Appraisal from "../components/hrManagement/appraisal/Appraisal.js";
// Training and Development
import TrainingAndDevelopment from "../components/hrManagement/training/TrainingAndDevelopment.js";
// Announcements
import HrActivities from "../components/hrManagement/hrActivities/HrActivities.js";
// Attendance
import Attendance from "../components/hrManagement/attendance/Attendance.js";
// Resignation
import Resignation from "../components/hrManagement/resignation/Resignation.js";
import WarningMemo from "../components/hrManagement/warningMemo/WarningMemo.js";

const routesConfig = (user) => {
  // Conditionally filter the routes based on the user's rank or other attributes
  return [
    {
      path: "/profile",
      element: <Profile />,
      allowedModules: [],
      name: "Profile",
      category: null,
      canBeAssigned: false,
    },
    {
      path: "/",
      element: <Dashboard />,
      allowedModules: [],
      name: "Dashboard",
      category: null,
      canBeAssigned: false,
    },
    {
      path: "/calendar",
      element: <Calendar />,
      allowedModules: [],
      name: "Calendar",
      category: null,
      canBeAssigned: false,
    },
    {
      path: "/modules",
      element: <Modules />,
      allowedModules: [],
      name: "Modules",
      category: null,
      canBeAssigned: false,
    },
    // Conditionally render the "Assign" route if user.rank <= 2
    ...(user?.rank <= 2
      ? [
          {
            path: "/assign",
            element: <Assign />,
            allowedModules: [],
            name: "Assign",
            category: null,
            canBeAssigned: false,
          },
        ]
      : []),
    {
      path: "/help",
      element: <Help />,
      allowedModules: [],
      name: "Help",
      category: null,
      canBeAssigned: false,
    },
    {
      path: "/hr-activities",
      element: <HrActivities />,
      allowedModules: ["HR Activities"],
      name: "HR Activities",
      category: "HR & Management",
      canBeAssigned: true,
    },
    {
      path: "/warning-memo",
      element: <WarningMemo />,
      allowedModules: ["Warning Memo"],
      name: "Warning Memo",
      category: "HR & Management",
      canBeAssigned: true,
    },
    {
      path: "/kyc",
      element: <EmployeeKYC />,
      allowedModules: ["Basic KYC Details"],
      name: "Basic KYC Details",
      category: "HR & Management",
      canBeAssigned: true,
    },
    {
      path: "/view-kyc/:username",
      element: <ViewIndividualKyc />,
      allowedModules: ["Basic KYC Details"],
      name: "View KYC Details",
      category: "HR & Management",
      canBeAssigned: false,
    },
    {
      path: "/edit-kyc/:username",
      element: <EditEmployeeKyc />,
      allowedModules: ["Basic KYC Details"],
      name: "Edit KYC Details",
      category: "HR & Management",
      canBeAssigned: false,
    },
    {
      path: "/job-openings",
      element: <JobOpenings />,
      allowedModules: ["Job Openings"],
      name: "Job Openings",
      category: "HR & Management",
      canBeAssigned: true,
    },
    {
      path: "/view-job-opening/:_id",
      element: <ViewIndividualJob />,
      allowedModules: ["Job Openings"],
      name: "View Job",
      category: "HR & Management",
      canBeAssigned: false,
    },
    {
      path: "/performance-appraisal",
      element: <Appraisal />,
      allowedModules: ["Performance Appraisal"],
      name: "Performance Appraisal",
      category: "HR & Management",
      canBeAssigned: true,
    },
    {
      path: "/training",
      element: <TrainingAndDevelopment />,
      allowedModules: ["Training And Development"],
      name: "Training And Development",
      category: "HR & Management",
      canBeAssigned: true,
    },
    {
      path: "/attendance",
      element: <Attendance />,
      allowedModules: ["Attendance & Leaves"],
      name: "Attendance & Leaves",
      category: "HR & Management",
      canBeAssigned: true,
    },
    {
      path: "/resignation-process",
      element: <Resignation />,
      allowedModules: ["Resignation Process"],
      name: "Resignation Process",
      category: "HR & Management",
      canBeAssigned: true,
    },
  ];
};

export default routesConfig;
