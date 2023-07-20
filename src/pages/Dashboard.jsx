import { Box, Card, Stack, Typography } from "@mui/material";
import MovingIcon from "@mui/icons-material/Moving";
import Chart from "../components/Chart";
import Protected from "../components/ProtectRoute/Protect";

import Orders from "./Orders";

const Compared = [
  {
    id: 1,
    total: 1099,
    month: "Mar 2022",
  },
  {
    id: 2,
    total: 2999,
    month: "May 2022",
  },
  {
    id: 3,
    total: 4500,
    month: "Sep 2022",
  },
];

// Chart Data
const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* Dashboard */}
      <Box>
        <Typography
          component="h3"
          sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
        >
          Dashboard
        </Typography>
        <Stack flexDirection="row" gap={"16px"} flexWrap="wrap">
          {Compared.map(({ id, total, month }) => (
            <Card
              sx={{
                minWidth: "30%",
                // flex: 1,
                p: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: "32px",
              }}
              key={id}
            >
              <Stack gap="22px">
                <span>Total</span>
                <Typography
                  component="h5"
                  sx={{ fontSize: "20px", fontWeight: 600 }}
                >
                  ${total}
                </Typography>
              </Stack>
              <Stack gap="8px">
                <Stack flexDirection={"row"} gap="8px" justifyContent="end">
                  <MovingIcon />
                  <span> 32%</span>
                </Stack>
                <Typography component="h5">Compared To {month}</Typography>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Box>
      {/* Income Statics */}
      <Box>
        <Typography
          component="h3"
          sx={{ fontSize: "26px", fontWeight: 600, mb: "32px" }}
        >
          Income Statics
        </Typography>
        <Chart data={data} />
      </Box>
      <Orders title="Last Orders" />
    </Box>
  );
};

export default Protected(Dashboard);
