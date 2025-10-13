import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDeleteUser } from "@/hooks/use-user";
import { Delete, Loader, Trash } from "lucide-react";

export default function DeleteDialog({
  triggerComp,
  id,
}: {
  triggerComp: ReactNode;
  id: string;
}) {
  const [open, setOpen] = useState(false);

  const deleteMutation = useDeleteUser(setOpen);

  console.log(id)

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>{triggerComp}</DialogTrigger>
      <DialogContent className="text-center">
        <DialogTitle>Delete User</DialogTitle>
        Are you sure you want to delete this user? This action can not be
        reverse once deleted
        <DialogFooter className="justify-between w-full">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="destructive"
            onClick={() => deleteMutation.mutate(id)}
          >
            {deleteMutation.isPending ? (
              <>
                <Loader className="animate-spin" /> Deleting...
              </>
            ) : (
              <>
                <Trash /> Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
