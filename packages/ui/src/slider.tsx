'use client'

import { Drawer, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type sliderSize = 'small' | 'medium' | 'large';

const sliderWidths: Record<sliderSize, { mobile: number; desktop: number }> = {
  small: { mobile: 280, desktop: 400 },
  medium: { mobile: 320, desktop: 480 },
  large: { mobile: 360, desktop: 560 }
};

type SliderProps = {
  open: boolean;
  onClose: () => void;
  size?: sliderSize;
  anchor?: 'left' | 'right';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onBeforeClose?: () => Promise<boolean> | boolean;
}

export const Slider = ({
  open,
  onClose,
  size = 'large',
  anchor = 'right',
  header,
  footer,
  children,
  onBeforeClose
}: SliderProps) => {
  const handleClose = async () => {
    if (onBeforeClose) {
      const canClose = await onBeforeClose();
      if (!canClose) return;
    }
    onClose();
  };

  const widths = sliderWidths[size];

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            xs: widths.mobile,
            sm: widths.desktop
          }
        }
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Box flex={1}>{header}</Box>
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>{children}</Box>

        {footer && (
          <Box
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: 'divider'
            }}
          >
            {footer}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
