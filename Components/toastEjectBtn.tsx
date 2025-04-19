import { Box } from "@chakra-ui/react";

const ToastEjectBtn = ({onClick}: {onClick: () => void}) => {
  return <Box
  onClick={onClick}
  w="3em"
  h="3em"
  cursor="pointer"
  pos="absolute"
  bottom={'2em'}
  right={-4}
  className="toastEjectButton"
/>;
};

export default ToastEjectBtn;
