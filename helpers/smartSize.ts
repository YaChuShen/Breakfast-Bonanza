
type SmartSizeProps = {
  base: string;
  lg: string;
  isLevel2: boolean;
};

const smartSize = ({ base, lg, isLevel2 }: SmartSizeProps) => {
  return { base: isLevel2 ? base : lg, lg };
};

export default smartSize;
