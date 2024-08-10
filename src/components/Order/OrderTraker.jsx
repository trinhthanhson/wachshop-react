import PropTypes from 'prop-types'
import { Stepper, Step, StepLabel } from '@mui/material'

const steps = [
  'Chờ xác nhận',
  'Đã xác nhận',
  'Đang vận chuyển',
  'Chờ thanh toán',
  'Đã thanh toán',
  'Đã giao'
]

const OrderTracker = ({ activeStep }) => {
  // Convert activeStep to an integer and handle NaN
  const stepIndex = parseInt(activeStep, 10)
  const validStepIndex = isNaN(stepIndex) ? 0 : stepIndex

  return (
    <div className="w-full">
      <Stepper activeStep={validStepIndex} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel className="" sx={{ color: '#b22830', fontSize: '44px' }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

OrderTracker.propTypes = {
  activeStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
}

export default OrderTracker
