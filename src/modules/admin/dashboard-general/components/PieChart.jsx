import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { getMostSoldCategories } from "../../../../service/admin-dash/DashUser";;

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [mostSoldCategories, setMostSoldCategories] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cache = await caches.open("salehub-cache-v1");
        const userDataResponse = await cache.match("userData");

        if (userDataResponse) {
          const userData = await userDataResponse.json();
          const token = userData.accessToken;
          setAccessToken(token);
          console.log("Token de acceso:", token);
          const response = await getMostSoldCategories(token); // Asegúrate de obtener el token de alguna manera aquí
          setMostSoldCategories(response.data);
        } else {
          console.log("No se encontró 'userData' en caché");
        }
  
      } catch (error) {
        console.error("Error al obtener las categorías más vendidas:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartLabels = mostSoldCategories.map((category) => category.categoryName);
    const chartData = mostSoldCategories.map((category) => category.totalSold);
    const chartColors = [
      'rgba(255, 99, 132)',
      'rgba(54, 162, 235)',
      'rgba(255, 206, 86)',
      // Add more colors if needed for additional categories
    ];

    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Total",
            data: chartData,
            backgroundColor: chartColors.slice(0, chartData.length),
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [mostSoldCategories]);

  return (
    <div>
      <canvas
        ref={chartRef}
        style={{
          width: "250px",
          height: "250px",
          display: "block",
        }}
      />
    </div>
  );
};

export default PieChart;
