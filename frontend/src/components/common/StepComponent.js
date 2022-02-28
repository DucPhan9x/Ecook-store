import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStatusOrder } from "redux/actions/order";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Đang chờ xác nhận",
    "Đang chuẩn bị",
    "Đang giao hàng",
    "Đã giao hàng",
  ];
}

export default function StepComponent({ step, formData }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveStep(step - 1);
  }, [step]);

  const handleStep = (step) => () => {
    setActiveStep(step);
    dispatch(
      updateStatusOrder({
        orderId: formData?._id,
        statusId: step + 1,
        customerId: formData?.customerId,
      })
    );
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepButton disabled={step === 4} onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
