import { ErrorSvg } from "../../icon/icon";
import { ErrorComponentProps } from "./error-component-prop-type";
import "./error-component.scss";

const ErrorComponent = ({ message }: ErrorComponentProps) => {
  return (
    <div className="error-component-ctn">
      <ErrorSvg />
      <p className="error-msg">{message}</p>
    </div>
  );
};

export default ErrorComponent;
