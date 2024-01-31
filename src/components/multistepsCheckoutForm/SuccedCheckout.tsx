import { useNavigate } from "react-router";
import { BUTTON } from "../ui/StyledComponenet";

export default function SuccedCheckout() {

  const navigate = useNavigate()

  return <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <div style={{ maxWidth: '520px', textAlign: 'center' }}>
      <h5>Success! Request Confirmed</h5>
      <p>Thank you for your borrowing request. It has been successfully processed. You'll receive an email with the details shortly. Your items will be dispatched soon, and we'll notify you once they're on their way. Enjoy your reading!</p>
      <p>For any queries or changes, feel free to reach out to us. Happy reading!</p>
    </div>
    <div >
      <BUTTON onClick={() => navigate('/')}>Home</BUTTON>
      <BUTTON style={{ width: '120px', padding: '10px', marginTop: '40px' }} onClick={() => navigate('/user')}>User board</BUTTON>
    </div>
  </div>
}
