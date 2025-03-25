import { toast } from "nextjs-toast-notify";
interface ToastProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
}
const showToast = (props: ToastProps) => {
    const { message, type } = props;
    switch (type) {
        case "success":
            toast.success(`✅ ${message}`, {
                duration: 1500,
                position: "top-center",
                transition: "bounceIn",
                sound: true,
            });
            break;
        case "error":
            toast.error(`❌ ${message}`, {
                duration: 1500,
                position: "top-center",
                transition: "bounceIn",
                sound: true,
            });
            break;
        case "warning":
            toast.warning(`⚠️ ${message}`, {
                duration: 1500,
                position: "top-center",
                transition: "bounceIn",
                sound: true,
            });
            break;
        case "info":
            toast.info(`ℹ️ ${message}`, {
                duration: 1500,
                position: "top-center",
                transition: "bounceIn",
                sound: true,
            });
            break;
        default:
            break;
    }
};
export { showToast };

