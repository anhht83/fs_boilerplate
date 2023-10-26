import React from "react";
import Spinner from "@/components/ui/spinner";


const DefaultLoading = (props: any) => {
  const {
    loading,
    children,
    spinnerClass,
    className,
    asElement: Component,
    customLoader
  } = props;

  return loading ? (
    <Component
      className={`${customLoader && "flex items-center justify-center h-full"} ${className}`}
    >
      {customLoader ? (
        <>{customLoader}</>
      ) : (
        <Spinner className={spinnerClass} size={40} />
      )}
    </Component>
  ) : (
    <>{children}</>
  );
};

const CoveredLoading = (props: any) => {
  const {
    loading,
    children,
    spinnerClass,
    className,
    asElement: Component,
    customLoader
  } = props;

  return (
    <Component className={`${loading ? "relative" : ""} ${className}`}>
      {children}
      {loading && (
        <div className="w-full h-full bg-white dark:bg-gray-800 dark:bg-opacity-60 bg-opacity-50 absolute inset-0" />
      )}
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          {customLoader ? (
            <>{customLoader}</>
          ) : (
            <Spinner className={spinnerClass} size={40} />
          )}
        </div>
      )}
    </Component>
  );
};


const Loading = (props: any) => {
  const { type = "default", loading = false, asElement = "div", ...restProps } = props;
  switch (props.type) {
    case "default":
      return <DefaultLoading type={type} loading={loading} asElement={asElement} {...restProps} />;
    case "cover":
      return <CoveredLoading type={type} loading={loading} asElement={asElement} {...restProps} />;
    default:
      return <DefaultLoading type={type} loading={loading} asElement={asElement} {...restProps} />;
  }
};

export default Loading;
