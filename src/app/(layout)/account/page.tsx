import ButtonAddNew from "@/components/button-add-new";
import { DataTable } from "@/components/data-table";
import { Account } from "@/type/account";
import { AccountColumns } from "./table/account-columns";

const initialAccounts: Account[] = [
  {
    _id: "admin",
    name: "Admin User",
    email: "admin@example.com",
    created_at: new Date("2024-01-01T08:00:00Z"),
    updated_at: new Date("2025-01-01T08:00:00Z"),
  },
  {
    _id: "user1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    created_at: new Date("2024-06-15T10:30:00Z"),
    updated_at: new Date("2025-05-01T12:00:00Z"),
  },
  {
    _id: "user2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    created_at: new Date("2024-08-20T09:00:00Z"),
    updated_at: new Date("2025-04-15T09:45:00Z"),
  },
];

export default function AccountPage() {
  return (
    <div className="">
      <ButtonAddNew linkTo="Account" />
      <div className="   mx-auto py-10">
        <DataTable
          columns={AccountColumns}
          data={[...initialAccounts, ...initialAccounts, ...initialAccounts, ...initialAccounts]}
          filterField="name"
        />
      </div>
    </div>
  );
}
