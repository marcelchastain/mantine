import React from 'react';
import { Placement } from '@floating-ui/react-dom-interactions';
import { MantineTransition } from '../Transition';
import { usePopover } from './use-popover';
import { PopoverContextProvider } from './Popover.context';
import { PopoverTarget } from './PopoverTarget/PopoverTarget';
import { PopoverDropdown } from './PopoverDropdown/PopoverDropdown';

interface PopoverProps {
  /** Popover.Target and Popover.Dropdown components */
  children: React.ReactNode;

  /** Dropdown position relative to target */
  position?: Placement;

  /** Space between target element and dropdown in px */
  offset?: number;

  /** Called when dropdown position changes */
  onPositionChange?(position: Placement): void;

  /** useEffect dependencies to force update tooltip position */
  positionDependencies?: any[];

  /** Controls dropdown opened state */
  opened: boolean;

  /** One of premade transitions ot transition object */
  transition?: MantineTransition;

  /** Transition duration in ms */
  transitionDuration?: number;
}

export function Popover({
  children,
  position = 'bottom',
  offset = 8,
  onPositionChange,
  positionDependencies = [],
  opened,
  transition = 'fade',
  transitionDuration = 150,
}: PopoverProps) {
  const { x, y, reference, floating } = usePopover({
    position,
    offset,
    onPositionChange,
    positionDependencies,
  });

  return (
    <PopoverContextProvider
      value={{ reference, floating, x, y, opened, transition, transitionDuration }}
    >
      {children}
    </PopoverContextProvider>
  );
}

Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = '@mantine/core/Popover';