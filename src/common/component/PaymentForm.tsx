// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   FormControl,
//   FormLabel,
// } from "@mui/material";

// function PaymentDialog({ open, onClose }) {
//   const [fullName, setFullName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [deliveryOption, setDeliveryOption] = useState("delivery"); // 'delivery' or 'pickup'

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     console.log({
//       fullName,
//       address,
//       phoneNumber,
//       email,
//       deliveryOption,
//     });

//     onClose(); // Close the dialog after submission
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Checkout</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Please enter your details for the order.
//         </DialogContentText>
//         <Box
//           component="form"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "1rem",
//             mt: 2,
//           }}
//         >
//           <TextField
//             label="Full Name"
//             variant="outlined"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Phone Number"
//             variant="outlined"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             required
//           />

//           {/* Delivery or Pickup Option */}
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Delivery or Pickup</FormLabel>
//             <RadioGroup
//               row
//               value={deliveryOption}
//               onChange={(e) => setDeliveryOption(e.target.value)}
//             >
//               <FormControlLabel
//                 value="delivery"
//                 control={<Radio />}
//                 label="Delivery"
//               />
//               <FormControlLabel
//                 value="pickup"
//                 control={<Radio />}
//                 label="Pickup"
//               />
//             </RadioGroup>
//           </FormControl>

//           <TextField
//             label="Address"
//             variant="outlined"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             fullWidth
//             disabled={deliveryOption === "pickup"}
//             required={deliveryOption === "delivery"}
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained">
//           Conform Payment
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default PaymentDialog;





// import React, { useState } from "react";
// import axios from "axios"; // Import axios for API calls
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   FormControl,
//   FormLabel,
// } from "@mui/material";

// function PaymentDialog({ open, onClose }) {
//   const [fullName, setFullName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [deliveryOption, setDeliveryOption] = useState("delivery");
//   const [amount, setAmount] = useState(""); // Added state for amount
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

// const handleSubmit = async () => {
//   setLoading(true);
//   setError("");

//   const paymentData = {
//     fullName,
//     address: deliveryOption === "delivery" ? address : "N/A",
//     phoneNumber,
//     email,
//     deliveryOption,
//     amount: parseFloat(amount) * 100, // Convert to cents for Stripe (e.g., $10 becomes 1000 cents)
//   };

//   try {
//     // Make API call to create the payment intent
//     const response = await axios.post(
//       "http://localhost:3000/payment/createPaymentIntent",
//       {
//         amount: paymentData.amount, // Send amount in cents
//       }
//     );

//     // Retrieve client secret from response
//     const clientSecret = response.data.clientSecret;

//     console.log({
//       paymentData,
//       clientSecret,
//     });

//     onClose(); // Close the dialog after successful payment intent creation
//   } catch (err) {
//     setError("Failed to process payment. Please try again.");
//     console.error("Payment Intent Error:", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Checkout</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Please enter your details for the order.
//         </DialogContentText>
//         <Box
//           component="form"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "1rem",
//             mt: 2,
//           }}
//         >
//           <TextField
//             label="Full Name"
//             variant="outlined"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Phone Number"
//             variant="outlined"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Email"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             required
//           />

//           {/* Delivery or Pickup Option */}
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Delivery or Pickup</FormLabel>
//             <RadioGroup
//               row
//               value={deliveryOption}
//               onChange={(e) => setDeliveryOption(e.target.value)}
//             >
//               <FormControlLabel
//                 value="delivery"
//                 control={<Radio />}
//                 label="Delivery"
//               />
//               <FormControlLabel
//                 value="pickup"
//                 control={<Radio />}
//                 label="Pickup"
//               />
//             </RadioGroup>
//           </FormControl>

//           <TextField
//             label="Address"
//             variant="outlined"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             fullWidth
//             disabled={deliveryOption === "pickup"}
//             required={deliveryOption === "delivery"}
//           />

//           {/* Amount Field */}
//           <TextField
//             label="Amount ($)"
//             variant="outlined"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             fullWidth
//             required
//             type="number"
//             inputProps={{ min: "0.01", step: "0.01" }} // Minimum value set to 1 cent
//           />
//         </Box>
//         {error && <DialogContentText color="error">{error}</DialogContentText>}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained" disabled={loading}>
//           {loading ? "Processing..." : "Confirm Payment"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default PaymentDialog;

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import dayjs from "dayjs";

function PaymentDialog({ open, onClose, amount }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

 const handleSubmit = async () => {
   if (!stripe || !elements || !deliveryDate) {
     setError("Please select a valid delivery date.");
     return;
   }

   setLoading(true);

   const paymentData = {
     fullName,
     address: deliveryOption === "delivery" ? address : "N/A",
     phoneNumber,
     email,
     deliveryOption,
     deliveryDate: dayjs(deliveryDate).format("YYYY-MM-DD"),
     amount: parseFloat(amount) * 100, // amount in cents for Stripe
   };

   try {
     // Call your backend to create the PaymentIntent and get clientSecret
     const response = await axios.post(
       "http://localhost:3000/payment/createPaymentIntent",
       paymentData
     );

     const { clientSecret } = response.data;

     const { error: stripeError } = await stripe.confirmPayment({
       elements,
       confirmParams: {
         
         payment_method_data: {
           billing_details: {
             name: paymentData.fullName,
             email: paymentData.email,
           },
         },
       },
       redirect: "if_required", 
       clientSecret,
     });

     if (stripeError) {
       setError(stripeError.message);
       console.error("Stripe error:", stripeError);
     } else {
       setError("");
       onClose();
     }
   } catch (err) {
     setError("Payment failed, please try again.");
     console.error("Error:", err);
   } finally {
     setLoading(false);
   }
 };




  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your details for the order.
        </DialogContentText>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            mt: 2,
          }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Amount ($)"
            variant="outlined"
            type="number"
            value={amount}
            fullWidth
            disabled
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Delivery or Pickup</FormLabel>
            <RadioGroup
              row
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
            >
              <FormControlLabel
                value="delivery"
                control={<Radio />}
                label="Delivery"
              />
              <FormControlLabel
                value="pickup"
                control={<Radio />}
                label="Pickup"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            disabled={deliveryOption === "pickup"}
            required={deliveryOption === "delivery"}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Delivery or Pickup Date"
              value={deliveryDate}
              onAccept={(newValue) => {
                setDeliveryDate(newValue); // Set the selected date
                console.log("Selected date:", deliveryDate);
              }}
              renderInput={(params) => <TextField {...params} />}
              disablePast
              fullWidth
              required
            />
          </LocalizationProvider>

          <CardElement />
        </Box>
        {error && (
          <Box color="error.main" mt={2}>
            {error}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentDialog;
