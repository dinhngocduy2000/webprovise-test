import Skeleton from "@mui/material/Skeleton/Skeleton";
import { WrapingHandlerPropsType } from "./loading-handler-wraper-props-type";

const LoadingHandlerWrapperComponent = ({
  loading,
  children,
  variant,
  height,
  width,
}: WrapingHandlerPropsType) => {
  return (
    <>
      {loading ? (
        <Skeleton
          variant={variant}
          sx={{
            height: height || "20px",
            width: width || "50%",
            margin: "10px",
          }}
        />
      ) : (
        children
      )}
    </>
  );
};

export default LoadingHandlerWrapperComponent;
