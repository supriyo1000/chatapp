import BootstrapClient from "../../components/bootstrap";
import '../app.css';
export default function ChatLayout({
    children, // will be a page or nested layout
}) {
    return (
        <>
            <BootstrapClient />
            {children}
        </>
    )
}