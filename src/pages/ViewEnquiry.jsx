import { Link, useParams } from "react-router-dom";
import {
  getEnquiry,
  updateEnquiry,
} from "../features/enquiries/enquiriesSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-hot-toast";

const ViewEnquiry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { enquiry, isError, message } = useSelector((state) => state.enquiries);
  const [val, setVal] = useState("");

  useEffect(() => {
    dispatch(getEnquiry(id));
  }, [id, dispatch]);

  useEffect(() => {
    setVal(enquiry.status);
  }, [enquiry]);

  const handelUpdateEnq = (status, id) => {
    setVal(status);

    dispatch(updateEnquiry({ id, status }))
      .unwrap()
      .then(() => {
        toast.success("Status updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {id && isError ? (
        <Box>
          <Typography color="error">{message}</Typography>
          <Link style={{ textDecoration: "underline" }} to="/admin/enquiries">
            Go Back
          </Link>
        </Box>
      ) : (
        <>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            gap="16px"
            alignItems="center"
          >
            <Typography
              component="h3"
              fontWeight="bold"
              sx={{ fontSize: "26px", fontWeight: 600 }}
            >
              View Enquiry
            </Typography>
            <Link
              style={{
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              to="/admin/enquiries"
            >
              <ArrowBackIcon />
              Go Back
            </Link>
          </Stack>
          <Box sx={{ overflow: "auto", height: "600px" }}>
            <Box
              sx={{
                width: "100%",
                mt: "64px",
                bgcolor: "#fff",
                p: "16px",
                borderRadius: "8px",
              }}
            >
              <Stack flexDirection="row" alignItems="center" gap="8px" my="8px">
                <Typography component="h3" fontWeight="bold">
                  Name:
                </Typography>
                {enquiry?.name}
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap="8px" my="8px">
                <Typography component="h3" fontWeight="bold">
                  Mobile:
                </Typography>
                <a
                  style={{ textDecoration: "underline" }}
                  href={`tel:${enquiry?.mobile}`}
                >
                  {enquiry?.mobile}
                </a>
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap="8px" my="8px">
                <Typography component="h3" fontWeight="bold">
                  Email:
                </Typography>
                <a
                  style={{ textDecoration: "underline" }}
                  href={`mailto:${enquiry?.email}`}
                >
                  {enquiry?.email}
                </a>
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap="8px" my="8px">
                <Typography component="h3" fontWeight="bold">
                  Comment:
                </Typography>
                {enquiry?.comment}
              </Stack>
              <Stack flexDirection="row" alignItems="center" gap="8px" my="8px">
                <Typography component="h3" fontWeight="bold">
                  Status:
                </Typography>
                {enquiry?.status}
              </Stack>
              {/* Change Status */}
              <Stack flexDirection="row" alignItems="center" gap="8px" my="8px">
                <Typography component="h3" fontWeight="bold">
                  Change Status:
                </Typography>
                <Select
                  value={val}
                  onChange={(e) =>
                    handelUpdateEnq(e.target.value, enquiry?._id)
                  }
                >
                  <MenuItem value="Submitted">Submitted</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
              </Stack>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ViewEnquiry;
