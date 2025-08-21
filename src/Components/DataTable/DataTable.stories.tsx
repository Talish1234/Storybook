import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
interface User {
  id: number;
  name: string;
  email: string;
}

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    loading: { control: "boolean" },
    selectable: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

const sampleData: User[] = [
  { id: 1, name: "Talish", email: "talish@example.com" },
  { id: 2, name: "Ansh", email: "ansh@example.com" },
];

const columns = [
  { key: "id", title: "ID", dataIndex: "id" as keyof User, sortable: true },
  { key: "name", title: "Name", dataIndex: "name" as keyof User, sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as keyof User },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    loading: false,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    loading: false,
  },
};
