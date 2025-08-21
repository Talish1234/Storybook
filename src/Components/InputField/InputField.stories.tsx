import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    variant: { control: "radio", options: ["filled", "outlined", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "Helper text",
    variant: "outlined",
    size: "md",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    errorMessage: "Invalid email",
    invalid: true,
    variant: "filled",
  },
};

export const Disabled: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    disabled: true,
    variant: "ghost",
  },
};
