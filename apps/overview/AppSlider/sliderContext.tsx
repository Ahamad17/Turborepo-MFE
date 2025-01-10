'use client'
import React, { createContext, useState, useCallback } from 'react';
import { Slider } from '@repo/ui';


export type SliderOptions = {
  size?: 'small' | 'medium' | 'large';
  anchor?: 'left' | 'right';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onBeforeClose?: () => Promise<boolean> | boolean;
};

export type SliderContextType = {
  openSlider: (content: React.ReactNode, options?: SliderOptions) => void;
  closeSlider: () => void;
};

export const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderContent, setSliderContent] = useState<React.ReactNode>(null);
  const [options, setOptions] = useState<SliderOptions>({});

  const openSlider = useCallback((content: React.ReactNode, newOptions?: SliderOptions) => {
    setSliderContent(content);
    setOptions(newOptions || {});
    setIsOpen(true);
  }, []);

  const closeSlider = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setSliderContent(null);
      setOptions({});
    }, 300);
  }, []);

  return (
    <SliderContext.Provider value={{ openSlider, closeSlider }}>
      {children}
      <Slider
        open={isOpen}
        onClose={closeSlider}
        size={options.size}
        anchor={options.anchor}
        header={options.header}
        footer={options.footer}
        onBeforeClose={options.onBeforeClose}
      >
        {sliderContent}
      </Slider>
    </SliderContext.Provider>
  );
};