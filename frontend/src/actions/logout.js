// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
  console.log("logoutAction called");

  // delete the user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("You’ve deleted your account!");
  // return redirect

  window.location.href = "/";
}
