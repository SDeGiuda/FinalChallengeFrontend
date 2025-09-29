import { toast, Toaster as SonnerToaster, type ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => <SonnerToaster {...props} />;

export { toast, Toaster };
