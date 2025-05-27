
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../AuthContext";
import { Chart } from 'react-google-charts';
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

import natureImg from '../resource/natureImg.png';

import { handleDownload } from './CarbonFootprint';

export const UserDashBoard = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const userId = user?.userId;
  const userName = user?.userName;

  const [dieselVehiclesData, setDieselVehiclesData] = useState([]);
  const [dieselVehiclesData1, setDieselVehiclesData1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fuel");
  const [selectedFuel, setSelectedFuel] = useState("Quick Download");
  const [selectedDateRange, setSelectedDateRange] = useState("Weekly");
  const [routeWiseEmissionData, setRouteWiseEmissionData] = useState([]);

  const [timeFilter, setTimeFilter] = useState("All");
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    if (!userId) {
      setLoading(true);
      return;
    }

    const fetchCarbonFootprintData = async () => {
      try {
        const [response1, response2, routeResponse] = await Promise.all([
          fetch(`https://pureprakruti.com/api/vehicle/carbonfootprint/dieselvehicles/${userId}`),
          fetch(`https://pureprakruti.com/api/vehicle/carbonfootprint/dieselvehicles1/${userId}`),
          fetch(`https://pureprakruti.com/api/vehicle/routewiseEmission/${userId}`)
        ]);

        if (!response1.ok) throw new Error(`Failed to fetch dieselvehicles data ${error}`);
        if (!response2.ok) throw new Error(`Failed to fetch dieselvehicles1 data ${error}`);
        if (!routeResponse.ok) throw new Error("Failed to fetch route-wise emission data");

        const data1 = await response1.json();
        const data2 = await response2.json();
        const routeData = await routeResponse.json();

        console.log('pdf Data', data2);

        setDieselVehiclesData(data1?.carbonFootprintData || []);
        setFilteredData(data1?.carbonFootprintData || []);
        setDieselVehiclesData1(data2?.carbonFootprintData || []);
        setRouteWiseEmissionData(routeData?.routewiseEmissionData || []);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCarbonFootprintData();
  }, [userId]);

  useEffect(() => {
    if (!dieselVehiclesData.length) return;

    let filtered = [];
    let dateLabels = new Map();
    const now = new Date();

    dieselVehiclesData.forEach((item) => {
      const itemDate = new Date(item.date);
      let label = "";

      if (timeFilter === "All") {
        label = itemDate.toISOString().split("T")[0];
      } else if (timeFilter === "Week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        if (itemDate >= weekAgo) {
          label = itemDate.toLocaleDateString("en-US", { weekday: "short" });
        }
      } else if (timeFilter === "Month") {
        label = `Week ${Math.ceil(itemDate.getDate() / 7)}`;
      } else if (timeFilter === "Year") {
        label = itemDate.toLocaleDateString("en-US", { month: "long" });
      }

      if (label) {
        dateLabels.set(label, (dateLabels.get(label) || 0) + parseFloat(item.carbonFootprint));
      }
    });

    filtered = Array.from(dateLabels.entries()).map(([date, value]) => ({
      date,
      carbonFootprint: value,
    }));

    setFilteredData(filtered);
  }, [timeFilter, dieselVehiclesData]);

  if (loading) return;


  const downloadCSVReport = async () => {
    try {
      // Construct the URL for the API call with selected filters
      const response = await fetch(
        `https://pureprakruti.com/api/vehicle/carbonfootprintbyfueltype?fuelType=${selectedFuel}&${selectedDateRange}=true`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }

      const data = await response.json();

      // Check if data contains carbonFootprintData
      if (!data.carbonFootprintData) {
        throw new Error("No carbon footprint data available");
      }

      // Create CSV content
      const csvContent = [
        ["Date", "Vehicle Number", "Fuel Type", "Carbon Emission (kg CO2)", "Last Updated"],
        ...data.carbonFootprintData.map((item) => [
          item.date,
          item.vehicleNumber,
          item.fuelType,
          item.carbonFootprint,
          new Date(item.updatedAt).toLocaleDateString(),
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      // Create a Blob and trigger the download
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Carbon_Footprint_Report_${selectedFuel}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };


  const topEmittingVehicle =
    dieselVehiclesData.length > 0
      ? dieselVehiclesData.reduce(
        (max, item) =>
          parseFloat(item.carbonFootprint) > parseFloat(max.carbonFootprint) ? item : max,
        dieselVehiclesData[0]
      )
      : null;

  const totalVehicles = dieselVehiclesData1.length;
  const totalEmission = dieselVehiclesData.reduce((total, item) => total + parseFloat(item.carbonFootprint), 0);

  const data = routeWiseEmissionData.length > 0
    ? [
      ["Route", "Emission"],
      ...routeWiseEmissionData.map((route) => [route.route, route.totalEmission]),
    ]
    : [["Route", "Emission"], ["No Data", 1]]; // Placeholder data to avoid errors


  const options = {
    title: "Route-wise Emissions",
    titleTextStyle: {
      fontSize: 18,
      bold: true,
      color: "#FFFFFF",
    },
    backgroundColor: "white",
    pieHole: 0, // Full pie (0) or donut (0.4)
    slices: {
      0: { color: "#007bff" }, // Blue
      1: { color: "#ff9800" }, // Orange
      2: { color: "#e91e63" }, // Red
      3: { color: "#4caf50" }, // Green
      4: { color: "#9c27b0" }, // Purple
      5: { color: "#ffeb3b" }, // Yellow
    },
    legend: {
      position: "labeled",
      textStyle: { fontSize: 12 },
    },
    pieSliceText: "percentage",
    chartArea: { width: "80%", height: "75%" },
  };




  return (
    <div className='w-screen'>
      <div
        style={{ backgroundImage: `url(${natureImg})` }}
        className="w-full min-h-[150px] bg-cover bg-center bg-no-repeat text-white p-6 text-center flex flex-wrap items-center justify-between"
      >
        <div className="text-lg md:text-2xl lg:text-3xl font-bold w-full md:w-[30%] lg:w-[20%] text-center md:text-left">
          Carbon Emission Analysis
        </div>

        <div className="flex items-center justify-center md:justify-end w-full md:w-[70%] lg:w-[80%] mt-4 md:mt-0">
          <div className="bg-green-500 p-3 md:p-4 rounded-full text-white font-bold">
            <span className="text-xl md:text-2xl">🚛</span>
          </div>
          {userName && (
            <div className="ml-3 md:ml-4">
              <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-green-700">
                {userName}
              </h3>
            </div>
          )}
        </div>
      </div>



      <div className="bg-green-100 min-h-full px-24 py-4">


        <motion.div
          className="flex justify-center mt-4 px-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-white w-full">
            {/* Container for Cards */}
            <div className="flex flex-wrap justify-center md:justify-between gap-6">
              {/* Top Emitting Vehicle */}
              {/* {topEmittingVehicle && (
                
              )} */}

              <motion.div
                className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-xl shadow-lg w-full sm:w-[300px] text-center border border-green-500 hover:shadow-xl transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="font-bold text-lg text-white">{`🚛 GreenLine Freight: ${topEmittingVehicle?.vehicleNumber ?? 'N/A'}`}</div>
                <h1 className="text-gray-200 text-sm mt-2">Top Emitting Vehicle</h1>
              </motion.div>

              {/* Total Vehicles */}
              <motion.div
                className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-xl shadow-lg w-full sm:w-[300px] text-center border border-green-500 hover:shadow-xl transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="font-bold text-lg text-white">{`🚗 Total Vehicles: ${totalVehicles}`}</div>
                <h1 className="text-gray-200 text-sm mt-2">Total Vehicles Registered</h1>
              </motion.div>

              {/* Total Carbon Emission */}
              <motion.div
                className="bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-xl shadow-lg w-full sm:w-[300px] text-center border border-green-500 hover:shadow-xl transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="font-bold text-lg text-white">{`🌱 Total Emission: ${totalEmission.toFixed(2)} kg`}</div>
                <h1 className="text-gray-200 text-sm mt-2">Total Carbon Emission</h1>
              </motion.div>
            </div>
          </div>
        </motion.div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full-lg mx-auto mt-12"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-lg font-bold text-white mb-2 bg-green-600 text-center">Emission Over Time</h2>
            <div className="w-full min-h-[300px] flex flex-col items-center justify-center">
              {filteredData.length > 0 ? (
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="300px"
                  options={{
                    colors: ["#004d0d"], // Green color
                    legend: { position: "none" }, // Hide legend if not needed
                    chartArea: { width: "80%" }, // Adjust chart area
                  }}
                  data={[
                    ["Date", "CO2 Emission (kg)"],
                    ...filteredData.map((item) => [
                      item.date, // Convert string to Date object
                      item.carbonFootprint,
                    ]),
                  ]}
                />
              ) : (
                <p className="text-gray-500 text-lg mt-4">No data available for the selected filter.</p>
              )}

              <div className="flex justify-center space-x-2 mt-4">
                {["All", "Week", "Month", "Year"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-2 rounded transition duration-200 ${timeFilter === filter ? "bg-green-600 text-white" : "bg-gray-300"
                      } ${filteredData.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={filteredData.length === 0} // Disable buttons if no data
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <h2 className="text-lg font-bold mb-2 text-white bg-green-600 text-center">
              Route-wise Emissions
            </h2>
            <div className="w-full min-h-[300px] flex justify-center items-center">
              {routeWiseEmissionData.length > 0 ? (
                <Chart chartType="PieChart" width="100%" height="300px" data={data} options={options} />
              ) : (
                <p className="text-gray-500 text-lg">No data available</p>
              )}
            </div>
          </div>

        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-lg shadow-md mt-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-lg font-bold mb-2">Fleet Emission Overview</h2>
          <div className="overflow-auto max-h-96">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Vehicle Number</th>
                  <th className="border p-2">Fuel Type</th>
                  <th className="border p-2">CO2 Emission (kg)</th>
                  <th className="border p-2">Distance (km)</th>
                  <th className="border p-2">Last Updated</th>
                  <th className="border p-2">Download PDF</th>
                </tr>
              </thead>
              <tbody>
                {dieselVehiclesData1.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{item.vehicleNumber}</td>
                    <td className="border p-2">{item.fuelType}</td>
                    <td className="border p-2">{item.carbonFootprint} kg</td>
                    <td className="border p-2">{item.totalDistance} km</td>
                    <td className="border p-2">{new Date(item.updatedAt).toLocaleDateString()}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDownload(item.pdfUrl)}
                        className="text-black px-2 py-1  items-center"
                      >
                        <FileText size={16} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>



        {/* Download Report Button */}
        <div className="text-center mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={() => setIsModalOpen(true)}
          >
            Download Report
          </button>
        </div>

        {/* Modal Component */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <div className="flex border-b pb-2">
                <button
                  className={`w-1/2 text-lg font-bold px-4 py-2 ${activeTab === "fuel" ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"}`}
                  onClick={() => setActiveTab("fuel")}
                >
                  By Fuel Type
                </button>
                <button
                  className={`w-1/2 text-lg font-bold px-4 py-2 ${activeTab === "date" ? "text-green-700 border-b-2 border-green-700" : "text-gray-500"}`}
                  onClick={() => setActiveTab("date")}
                >
                  By Date
                </button>
              </div>

              {activeTab === "fuel" && (
                <div className="mt-4">
                  {["DIESEL", "PETROL", "CNG", "ETHANOL"].map((fuel) => (
                    <label key={fuel} className="block mt-2">
                      <input
                        type="radio"
                        name="fuelType"
                        value={fuel}
                        checked={selectedFuel === fuel}
                        onChange={() => setSelectedFuel(fuel)}
                        className="mr-2"
                      />
                      {fuel}
                    </label>
                  ))}
                </div>
              )}

              {activeTab === "date" && (
                <div className="mt-4">
                  {["Daily", "last7days", "Monthly", "Yearly"].map((dateRange) => (
                    <label key={dateRange} className="block mt-2">
                      <input
                        type="radio"
                        name="dateRange"
                        value={dateRange}
                        checked={selectedDateRange === dateRange}
                        onChange={() => setSelectedDateRange(dateRange)}
                        className="mr-2"
                      />
                      {dateRange}
                    </label>
                  ))}
                </div>
              )}

              <div className="text-center mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  onClick={() => {
                    downloadCSVReport();
                    setIsModalOpen(false);
                  }}
                >
                  Download Report
                </button>
              </div>

              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};