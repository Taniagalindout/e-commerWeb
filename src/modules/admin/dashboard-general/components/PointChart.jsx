import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { GetOrderItemByYearAndMonth } from "../../../../service/admin-dash/DashUser";;
const PointChart = ({ year, month }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [salesData, setSalesData] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cache = await caches.open("salehub-cache-v1");
        const userDataResponse = await cache.match("userData");
        if (userDataResponse) {
          const userData = await userDataResponse.json();
          const token = userData.accessToken;
          setAccessToken(token);
          console.log("Token de acceso:", token);
        } else {
          console.log("No se encontró 'userData' en caché");
        }
        
      } catch (error) {
        console.error("Error al obtener el token de acceso:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (accessToken) {
    const fetchData = async () => {
      try {
        const response = await GetOrderItemByYearAndMonth(accessToken, year, month);
        if (response && response.status === 201) {
          setSalesData(response.data);
        }
        
        
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
      
    };

    fetchData();
  } else {
    console.log("No access token available");
  }
  }, [accessToken, year, month]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const sales = Array.from({ length: 12 }, (_, i) => {
      const monthName = months[i];
      const salesValue = i === month - 1 ? salesData : 0;
      return { x: monthName, y: salesValue };
    });

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [{
          label: "Número de ventas",
          data: sales,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
        }],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
            },
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Numero de ventas",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [salesData, month]);

  return (
    <div>
      <canvas
        ref={chartRef}
        style={{
          width: "400px",
          height: "400px",
          display: "block",
        }}
      />
    </div>
  );
};

export default PointChart;
