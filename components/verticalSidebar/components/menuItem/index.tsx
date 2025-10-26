import { JSX, useState, useCallback } from 'react'
import { Tooltip } from "@heroui/tooltip";
import { motion } from 'framer-motion';
import { twMerge } from "tailwind-merge";

import { MenuItemProps } from './types';

function MenuItem(props: MenuItemProps): JSX.Element {
  const { name, isExpanded, icon, tooltip, fullRotate = true } = props;

  const [isVisible, setIsVisible] = useState(false);

  const handleTooltipOpenChange = useCallback((isOpen: boolean) => {
    setIsVisible(isExpanded ? false : isOpen)
  }, [isExpanded]);

  return (
    <motion.div className={twMerge(
      'flex justify-center transition-transform duration-500',
      isExpanded ? 'w-auto' : 'w-full rotate-0',
      isExpanded && (fullRotate ? 'rotate-360' : 'rotate-180')
    )}
    >
      <Tooltip
        content={tooltip || name}
        placement='right-end'
        showArrow
        isOpen={isVisible}
        onOpenChange={handleTooltipOpenChange}
      >
        {icon}
      </Tooltip>
    </motion.div>
  )
}

export default MenuItem