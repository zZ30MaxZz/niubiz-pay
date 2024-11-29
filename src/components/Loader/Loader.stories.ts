import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
    title: 'Components/Loader',
    component: Loader,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'number',
            description: 'Size of the loader in pixels',
            defaultValue: 24
        },
        color: {
            control: 'color',
            description: 'Color of the loader',
            defaultValue: '#fff'
        }
    },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        size: 24,
        color: '#fff'
    }
};

export const Blue: Story = {
    args: {
        size: 24,
        color: '#007bff'
    }
};