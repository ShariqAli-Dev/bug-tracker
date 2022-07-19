import type { NextPage } from 'next';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import NavBar from '../components/Navbar';
import DashHeader from '../components/DashHeader';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: NextPage = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['None', 'Low', 'Medium', 'High'],
      datasets: [
        {
          // label: "Whom'st let the dogs out",
          data: [2, 3, 4, 1],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: ['#9C2A4B', '#320311'],
        },
      ],
    });
    setChartOptions({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          display: false,
        },
        title: {
          display: true,
          text: 'Tickets By Priority',
        },
      },
    });
  }, []);
  return (
    <Flex h='100vh' flexDir='row' overflow='hidden' maxW='2000px'>
      {/* Dashboard/Navbar */}
      <Flex w='15%' flexDir='column' alignItems='center'>
        <NavBar />
      </Flex>

      {/* Components */}
      <Flex backgroundColor='blackAlpha.200' w='full' flexDirection='column'>
        {/* DashHeader Component */}
        <DashHeader />
        {/* Components */}
        <Grid h='full' templateColumns='repeat(2, 1fr)'>
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <Bar options={chartOptions} data={chartData} />
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <Bar options={chartOptions} data={chartData} />
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <Bar options={chartOptions} data={chartData} />
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex justifyContent='center' alignItems='center' h='full'>
              <Box h='80%' w='80%'>
                <Bar options={chartOptions} data={chartData} />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
