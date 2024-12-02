
import {
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

type MovieDetailProps = {   
  isOpen: boolean;
  onClose: (value: boolean) => void;
}