import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import { Meta, Story } from '@storybook/react/types-6-0';
import i18next from 'i18next';
import React from 'react';
import TooltipLight, { TooltipLightProps } from './TooltipLight';

export default {
  title: 'Tooltip/TooltipLight',
  component: TooltipLight,
} as Meta;

const Template: Story<TooltipLightProps> = args => <TooltipLight {...args} />;

export const Add = Template.bind({});
Add.args = {
  title: 'Add',
  children: (
    <IconButton aria-label={i18next.t('frequent|Add')} size="large">
      <Icon color="#adadad" icon="mdi:plus-circle" width="48" />
    </IconButton>
  ),
};
