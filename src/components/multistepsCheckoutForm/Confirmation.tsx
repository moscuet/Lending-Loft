import { Button, Container } from 'react-bootstrap';
import '../../styles/checkoutUserDetails.css'
import { useFormikContext } from 'formik';
import { FormValue } from './MultiStepsCheckout';

interface CheckoutProps {
  nextStep: () => void
  prevStep: () => void
  inputValues: { firstName: string, lastName: string, email: string, address: string, city: string, zip: string }
}

const Confirmation = (props: CheckoutProps):JSX.Element=> {
  const { inputValues: { lastName, email, address, city, zip } } = props;
  const { isValid, dirty } = useFormikContext<FormValue>();

  return (
    <Container style={{ marginBottom: '20px', marginTop: '20px', maxWidth: '780px' }}>


      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
        <h5>Confirm your Details</h5>

        <p style={{ marginBottom: '20px' }}>Confirm if the following details are correct.</p>

        <p>First Name: {props.inputValues.firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Email: {email}</p>
        <p>Adress: {address}</p>
        <p>City: {city}</p>
        <p style={{ marginBottom: '50px' }}>Zip: {zip}</p>
      </div>

      <div className='button-container'>
        <Button onClick={props.prevStep} variant="secondary">
          <img src={'/resources/arrowLeft.svg'} alt="Left Arrow" />
          Back
        </Button>
        <Button variant="primary" type='submit' disabled={!(isValid && dirty)} >
          Confirm
        </Button>
      </div>
    </Container>
  )
}

export default Confirmation;