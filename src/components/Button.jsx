import styled from '@emotion/styled';
import MUIButton from '@mui/material/Button';

const CustomButton = styled(MUIButton)(({ theme }) => ({
  textTransform: 'none',
  '&:disabled': { opacity: 0.6 },
}));

function Button({ children, variant = 'contained', ...props }) {
  return <CustomButton variant={variant} {...props}>{children}</CustomButton>;
}
export default Button;